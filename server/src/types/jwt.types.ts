import { TokenType } from '@/constants/type'
import { Account } from '@prisma/client'

export type TokenTypeValue = (typeof TokenType)[keyof typeof TokenType]

export interface TokenPayload {
  account: Partial<Account>
  tokenType: TokenTypeValue
  exp: number
  iat: number
}
