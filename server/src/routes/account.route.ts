import { updateMeController } from '@/controllers/account.controller'
import { requireLoggedHook } from '@/hooks/auth.hooks'
import { AccountRes, AccountResType, UpdateProfileBodyType } from '@/schemaValidations/account.schema'
import { FastifyInstance, FastifyPluginOptions } from 'fastify'

export default async function accountRoutes(fastify: FastifyInstance, options: FastifyPluginOptions) {
  fastify.addHook('preValidation', fastify.auth([requireLoggedHook]))
  fastify.get<{ Reply: AccountResType }>(
    '/me',
    {
      schema: {
        response: {
          200: AccountRes
        }
      }
    },
    async (request, reply) => {
      reply.send({
        data: request.account!,
        message: 'Lấy thông tin thành công'
      })
    }
  )

  fastify.put<{
    Reply: AccountResType
    Body: UpdateProfileBodyType
  }>(
    '/me',
    {
      schema: {
        response: {
          200: AccountRes
        }
      }
    },
    async (request, reply) => {
      const result = await updateMeController(request.account!.id, request.body)
      reply.send({
        data: result,
        message: 'Cập nhật thông tin thành công'
      })
    }
  )
}
