import envConfig from '@/config'
import prisma from '@/database'
import { AuthError } from '@/utils/errors'
import { verifyToken } from '@/utils/jwt'
import { FastifyRequest } from 'fastify'

export const requireLoggedHook = async (request: FastifyRequest) => {
  const accessToken = envConfig.COOKIE_MODE ? request.cookies.accessToken : request.headers.authorization

  if (!accessToken) throw new AuthError('Không nhận được session token')
  const token = accessToken.split(' ')[1] // Tách "Bearer" ra khỏi token
  const session = await prisma.session.findFirst({
    where: {
      accessToken: token
    },
    include: {
      account: true
    }
  })
  if (!session) throw new AuthError('Token không tồn tại')

  // kiểm tra xem access token đã hết hạn chưa
  await verifyToken(token)
  request.account = session.account
}
