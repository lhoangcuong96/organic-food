import { PrismaErrorCode } from '@/constants/error-reference'
import prisma from '@/database'
import { LoginBodyType, RegisterBodyType } from '@/schemaValidations/auth.schema'
import { comparePassword, hashPassword } from '@/utils/crypto'
import { EntityError, isPrismaClientKnownRequestError, StatusError } from '@/utils/errors'
import { createPairTokens } from '@/utils/jwt'

export const registerController = async (body: RegisterBodyType) => {
  try {
    const existingUser = await prisma.account.findFirst({
      where: {
        OR: [
          {
            email: body.email
          },
          {
            phoneNumber: body.phoneNumber
          }
        ]
      }
    })

    if (existingUser) {
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

    const { accessToken, refreshToken } = createPairTokens({
      userId: account.id
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
export const logoutController = async (accessToken: string) => {
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

export const loginController = async (body: LoginBodyType) => {
  const account = await prisma.account.findUnique({
    where: {
      email: body.email
    }
  })
  if (!account) {
    throw new EntityError([{ field: 'email', message: 'Email không tồn tại' }])
  }
  const isPasswordMatch = await comparePassword(body.password, account.password)
  if (!isPasswordMatch) {
    throw new EntityError([{ field: 'password', message: 'Email hoặc mật khẩu không đúng' }])
  }
  const { accessToken, refreshToken } = createPairTokens({
    userId: account.id
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

export const refreshTokenController = async (accessToken: string, refreshToken: string) => {
  const session = await prisma.session.findFirst({
    where: {
      refreshToken,
      accessToken
    }
  })
  if (!session) {
    throw new StatusError({ message: 'Refresh token không tồn tại', status: 404 })
  }
  const { accessToken: newAccessToken, refreshToken: newRefreshToken } = createPairTokens({
    userId: session.accountId
  })
  await prisma.session.update({
    where: {
      id: session.id
    },
    data: {
      accessToken: newAccessToken,
      refreshToken: newRefreshToken
    }
  })
  return {
    session
  }
}
