import AdminCategoryController from '@/controllers/admin/admin-category-controller'
import {
  CreateCategoryBodySchema,
  CreateCategoryBodyType,
  ListCategoryResponseSchema
} from '@/schemaValidations/category.schema'
import { MessageRes, MessageResType } from '@/schemaValidations/common.schema'
import { FastifyInstance, FastifyPluginOptions } from 'fastify'

export function AdminCategoryRoutes(fastify: FastifyInstance, options: FastifyPluginOptions) {
  fastify.get(
    '/',
    {
      schema: {
        response: {
          200: ListCategoryResponseSchema
        }
      }
    },
    async (request, reply) => {
      const categories = await AdminCategoryController.list()
      reply.send({
        data: categories,
        message: 'Lấy danh sách ngành hàng thành công!'
      })
    }
  )

  fastify.post<{
    Rely: MessageResType
    Body: CreateCategoryBodyType
  }>(
    '/',
    {
      schema: {
        body: CreateCategoryBodySchema,
        response: {
          200: MessageRes
        }
      }
    },
    async (request, reply) => {
      const body = request.body
      await AdminCategoryController.create(body)
      reply.send({
        message: 'Tạo ngành hàng thành công!'
      })
    }
  )

  fastify.post<{
    Body: {
      ids: string[]
    }
  }>('/delete/', async (request, reply) => {
    const ids = request.body.ids
    await AdminCategoryController.delete(ids)
    reply.send({
      message: 'Xoá ngành hàng thành công!'
    })
  })
}
