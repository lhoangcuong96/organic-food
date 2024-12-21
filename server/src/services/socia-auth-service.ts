import { PrismaErrorCode } from '@/constants/error-reference'
import prisma from '@/database'
import { BloomFilterService } from '@/lb/bloom-filter'
import { redisInstance } from '@/provider/redis'
import { LoginBodyType, RegisterBodyType } from '@/schemaValidations/auth.schema'
import { comparePassword, hashPassword } from '@/utils/crypto'
import { EntityError, isPrismaClientKnownRequestError, StatusError } from '@/utils/errors'
import { createPairTokens } from '@/utils/jwt'
import { Account, Session, SocialEnum } from '@prisma/client'
import { th } from 'date-fns/locale'
import { OAuth2Client } from 'google-auth-library'

export class SocialAuthServiceFactory {
  static registry: Record<string, any> = {}
  service
  constructor(type: SocialEnum) {
    console.log(type, SocialAuthServiceFactory.registry)
    const serviceType = SocialAuthServiceFactory.registry[type]
    if (!serviceType) {
      throw new Error('Invalid social type')
    }
    this.service = new serviceType()
  }

  static registerSocialType({ type, service }: { type: SocialEnum; service: any }) {
    SocialAuthServiceFactory.registry[type] = service
  }

  async authenticate(token: string): Promise<{ account: Account; session: Session }> {
    return this.service.authenticate(token)
  }
}

export abstract class SocialAuthService {
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

  async checkEmailExist(email: string): Promise<boolean> {
    const bloomFilter = BloomFilterService.getInstance()
    const emailExist = await bloomFilter.check({ filterName: 'email', value: email })
    return emailExist
  }

  async authenticate(token: string): Promise<{ account: Account; session: Session }> {
    throw new Error('Method not implemented')
  }
}

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)

export class GoogleAuthService extends SocialAuthService {
  async authenticate(token: string) {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID
    })
    const payload = ticket.getPayload()
    const email = payload?.email
    const name = payload?.name
    const avatar = payload?.picture

    const emailExist = !email ? false : await this.checkEmailExist(email)
    let account
    if (emailExist) {
      // nếu user chưa có google provider thì thêm vào
      account = await prisma.account.update({
        where: { email: email },
        data: {
          providers: {
            push: {
              provider: SocialEnum.GOOGLE,
              providerId: payload!.sub!
            }
          }
        }
      })
    } else {
      // tạo mới account
      account = await prisma.account.create({
        data: {
          email: email!,
          fullname: name!,
          avatar: avatar!,
          providers: {
            set: [
              {
                provider: SocialEnum.GOOGLE,
                providerId: payload!.sub!
              }
            ]
          }
        }
      })
    }
    const session = await this.createSession(account)
    return {
      account,
      session
    }
  }
}

export class FacebookAuthService extends SocialAuthService {}
export class XAuthService extends SocialAuthService {}

SocialAuthServiceFactory.registerSocialType({ type: SocialEnum.GOOGLE, service: GoogleAuthService })
