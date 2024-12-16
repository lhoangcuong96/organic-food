import { PrismaErrorCode } from '@/constants/error-reference'
import prisma from '@/database'
import { BloomFilterService } from '@/lb/bloom-filter'
import { LoginBodyType, RegisterBodyType } from '@/schemaValidations/auth.schema'
import { comparePassword, hashPassword } from '@/utils/crypto'
import { EntityError, isPrismaClientKnownRequestError, StatusError } from '@/utils/errors'
import { createPairTokens } from '@/utils/jwt'
import { FastifyRedis } from '@fastify/redis'
import { FastifyInstance } from 'fastify'

export default class AuthController {
  redis: FastifyRedis
  constructor(fastify: FastifyInstance) {
    this.redis = fastify.redis
  }
  registerController = async (body: RegisterBodyType) => {
    try {
      // const existingUser = await prisma.account.findFirst({
      //   where: {
      //     OR: [
      //       {
      //         email: body.email
      //       },
      //       {
      //         phoneNumber: body.phoneNumber
      //       }
      //     ]
      //   }
      // })

      /* 
        - Thay vì phải kiểm tra trong db thì chỉ cần kiểm tra trong redis 
        - Sử dụng bloom filter để kiểm tra email và phoneNumber đã tồn tại hay chưa(xem trong docs)
      */
      const bloomFilter = BloomFilterService.getInstance()
      const emailExist = await bloomFilter.check({ filterName: 'email', value: body.email })
      const phoneExist = await bloomFilter.check({ filterName: 'phoneNumber', value: body.phoneNumber })

      if (emailExist || phoneExist) {
        throw new Error('Email hoặc số điện thoại đã tồn tại!')
      }
      const hashedPassword = await hashPassword(body.password)
      const account = await prisma.account.create({
        data: {
          fullname: body.fullname,
          phoneNumber: body.phoneNumber,
          email: body.email,
          password: hashedPassword
        }
      })

      /*
        - Thêm account vào để khi kiểm tra email đã tồn tại hay chưa thì chỉ cần lấy từ redis ra
        - Giảm thời gian truy cập nếu có lượng đồng thời cao
        - Sử dụng bloom filter để tối ưu bộ nhớ sử dụng cho redis
      */
      bloomFilter.add({ filterName: 'email', value: body.email })
      bloomFilter.add({ filterName: 'phoneNumber', value: body.phoneNumber })
      this.redis.set(account.email, 1)

      const { accessToken, refreshToken } = createPairTokens({
        account: {
          id: account.id,
          email: account.email,
          phoneNumber: account.phoneNumber,
          fullname: account.fullname,
          avatar: account.avatar
        }
      })

      const session = await prisma.session.create({
        data: {
          accountId: account.id,
          accessToken,
          refreshToken
        }
      })
      return {
        account,
        session
      }
    } catch (error: any) {
      if (isPrismaClientKnownRequestError(error)) {
        if (error.code === PrismaErrorCode.UniqueConstraintViolation) {
          throw new EntityError([{ field: 'email', message: 'Email đã tồn tại' }])
        }
      }
      throw error
    }
  }
  logoutController = async (accessToken: string) => {
    const session = await prisma.session.findFirst({
      where: {
        accessToken
      }
    })
    if (session === null) {
      throw new StatusError({ message: 'Session không tồn tại', status: 404 })
    }
    await prisma.session.delete({
      where: { id: session.id }
    })
    return 'Đăng xuất thành công'
  }

  loginController = async (body: LoginBodyType) => {
    const account = await prisma.account.findUnique({
      where: {
        email: body.email
      }
    })
    console.log(account)
    if (!account) {
      throw new EntityError([{ field: 'email', message: 'Email không tồn tại' }])
    }
    const isPasswordMatch = await comparePassword(body.password, account.password)
    if (!isPasswordMatch) {
      throw new EntityError([{ field: 'password', message: 'Email hoặc mật khẩu không đúng' }])
    }
    const { accessToken, refreshToken } = createPairTokens({
      account: {
        id: account.id,
        email: account.email,
        phoneNumber: account.phoneNumber,
        fullname: account.fullname,
        avatar: account.avatar,
        role: account.role
      }
    })
    const session = await prisma.session.create({
      data: {
        accountId: account.id,
        accessToken,
        refreshToken
      }
    })
    return {
      account,
      session
    }
  }

  refreshTokenController = async (accessToken: string, refreshToken: string) => {
    const session = await prisma.session.findFirst({
      where: {
        refreshToken,
        accessToken
      },
      include: {
        account: true
      }
    })
    if (!session) {
      throw new StatusError({ message: 'Session không tồn tại', status: 404 })
    }
    const { accessToken: newAccessToken, refreshToken: newRefreshToken } = createPairTokens({
      account: {
        id: session.account.id,
        email: session.account.email,
        phoneNumber: session.account.phoneNumber,
        fullname: session.account.fullname,
        avatar: session.account.avatar
      }
    })
    const newSession = await prisma.session.update({
      where: {
        id: session.id
      },
      data: {
        accessToken: newAccessToken,
        refreshToken: newRefreshToken
      }
    })
    return {
      session: newSession
    }
  }
}
