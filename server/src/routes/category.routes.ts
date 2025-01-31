import { CreateCategoryBodySchema, CreateCategoryBodyType } from '@/schemaValidations/category.schema'
import { MessageRes, MessageResType } from '@/schemaValidations/common.schema'
import { FastifyInstance, FastifyPluginOptions } from 'fastify'

export function CategoryRoutes(fastify: FastifyInstance, options: FastifyPluginOptions) {
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
    async (request, reply) => {}
  )
}
