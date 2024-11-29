import { TokenType } from '@/constants/type'

export type TokenTypeValue = (typeof TokenType)[keyof typeof TokenType]

export interface TokenPayload {
  userId: string
  tokenType: TokenTypeValue
  exp: number
  iat: number
}
