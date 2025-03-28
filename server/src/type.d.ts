import { TokenPayload } from '@/types/jwt.types'
import { Account } from '@prisma/client'
import { type FastifyRequest, FastifyInstance, FastifyReply } from 'fastify'

declare global {
  interface BigInt {
    toJSON(): string
  }
}

declare module 'fastify' {
  interface FastifyInstance {}
  interface FastifyRequest<T = unknown> {
    account?: Account
    cookies: {
      accessToken?: string
      refreshToken?: string
    }
    body?: T
  }
}
