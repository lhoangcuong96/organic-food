import { PrismaErrorCode } from '@/constants/error-reference'
import prisma from '@/database'
import { BloomFilterService } from '@/lb/bloom-filter'
import { redisInstance } from '@/provider/redis'
import { LoginBodyType, RegisterBodyType } from '@/schemaValidations/auth.schema'
import { comparePassword, hashPassword } from '@/utils/crypto'
import { EntityError, isPrismaClientKnownRequestError, StatusError } from '@/utils/errors'
import { createPairTokens } from '@/utils/jwt'
import { Account, Session, SocialEnum } from '@prisma/client'
import { OAuth2Client } from 'google-auth-library'

export default class AuthService {
  async createSession(account: Account) {
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
    return session
  }

  async register(data: RegisterBodyType) {
    try {
      /* 
        - Thay vì phải kiểm tra trong db thì chỉ cần kiểm tra trong redis 
        - Sử dụng bloom filter để kiểm tra email và phoneNumber đã tồn tại hay chưa(xem trong docs)
      */
      const bloomFilter = BloomFilterService.getInstance()
      const emailExist = await bloomFilter.check({ filterName: 'email', value: data.email })
      const phoneExist = await bloomFilter.check({ filterName: 'phoneNumber', value: data.phoneNumber })

      if (emailExist || phoneExist) {
        throw new Error('Email hoặc số điện thoại đã tồn tại!')
      }
      const hashedPassword = await hashPassword(data.password)
      const account = await prisma.account.create({
        data: {
          fullname: data.fullname,
          phoneNumber: data.phoneNumber,
          email: data.email,
          password: hashedPassword
        }
      })

      /*
         - Thêm account vào để khi kiểm tra email đã tồn tại hay chưa thì chỉ cần lấy từ redis ra
         - Giảm thời gian truy cập nếu có lượng đồng thời cao
         - Sử dụng bloom filter để tối ưu bộ nhớ sử dụng cho redis
     */
      bloomFilter.add({ filterName: 'email', value: data.email })
      bloomFilter.add({ filterName: 'phoneNumber', value: data.phoneNumber })
      redisInstance!.set(account.email, 1)

      const session = await this.createSession(account)
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

  async login(data: LoginBodyType) {
    const account = await prisma.account.findUnique({
      where: {
        email: data.email
      }
    })
    if (!account) {
      throw new EntityError([{ field: 'email', message: 'Email không tồn tại' }])
    }
    const isPasswordMatch = await comparePassword(data.password, account.password || '')
    if (!isPasswordMatch) {
      throw new EntityError([{ field: 'password', message: 'Email hoặc mật khẩu không đúng' }])
    }
    const session = await this.createSession(account)
    return {
      account,
      session
    }
  }

  async logout(accessToken: string) {
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

  async refreshToken(accessToken: string, refreshToken: string) {
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