import { changePasswordController, updateMeController } from '@/controllers/account.controller'
import { requireLoggedHook } from '@/hooks/auth.hooks'
import {
  AccountRes,
  AccountResType,
  ChangePasswordBody,
  ChangePasswordBodyType,
  UpdateProfileBodyType
} from '@/schemaValidations/account.schema'
import { MessageRes, MessageResType } from '@/schemaValidations/common.schema'
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

  fastify.post<{ Rely: MessageResType; Body: ChangePasswordBodyType }>(
    '/change-password',
    {
      schema: {
        body: ChangePasswordBody,
        response: {
          200: MessageRes
        }
      }
    },
    async (request, reply) => {
      await changePasswordController(request.account!.id, request.body.oldPassword, request.body.newPassword)
      reply.send({
        message: 'Đổi mật khẩu thành công'
      })
    }
  )
}
