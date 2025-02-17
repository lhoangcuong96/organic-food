import AdminProductController from '@/controllers/admin/admin-product-controller'
import { requireLoggedHook } from '@/hooks/auth.hooks'
import {
  CreateProductBodyType,
  DeleteProductParamsSchema,
  DeleteProductParamsType,
  ProductDetailParamsType,
  ProductDetailResponseType,
  ProductDetailSchema,
  ProductListQuerySchema,
  ProductListQueryType,
  ProductListResSchema,
  ProductListResType,
  UpdateProductBodySchema,
  UpdateProductBodyType,
  UpdateProductParamsSchema,
  UpdateProductParamsType
} from '@/schemaValidations/admin/product/admin-product-schema'
import { MessageResponseSchema, MessageResponseSchemaType } from '@/schemaValidations/common.schema'
import { FastifyInstance, FastifyPluginOptions } from 'fastify'

export default async function AdminProductRoutes(fastify: FastifyInstance, options: FastifyPluginOptions) {
  const controller = new AdminProductController()
  fastify.get<{
    Reply: ProductListResType
    Request: {
      Querystring: ProductListQueryType
    }
  }>(
    '/',
    {
      schema: {
        response: {
          200: ProductListResSchema
        },
        querystring: ProductListQuerySchema
      }
    },
    async (request, reply) => {
      const queryParams = request.query as ProductListQueryType
      const products = await controller.getProductList({
        ...queryParams
      })
      reply.send({
        data: products,
        message: 'Lấy danh sách sản phẩm thành công!'
      })
    }
  )

  fastify.get<{
    Params: ProductDetailParamsType
    Reply: ProductDetailResponseType
  }>(
    '/:slug',
    {
      schema: {
        params: ProductDetailSchema,
        response: {
          200: ProductDetailSchema
        }
      }
    },
    async (request, reply) => {
      const product = await controller.getProductDetail(request.params.slug)
      reply.send({
        data: product,
        message: 'Lấy thông tin sản phẩm thành công!'
      })
    }
  )

  fastify.post<{
    Body: CreateProductBodyType
    Reply: ProductDetailResponseType
  }>(
    '',
    {
      schema: {
        body: UpdateProductBodySchema,
        response: {
          200: ProductDetailSchema
        }
      }
    },
    async (request, reply) => {
      const product = await controller.createProduct(request.body)
      reply.send({
        data: product as any,
        message: 'Tạo sản phẩm thành công!'
      })
    }
  )

  fastify.put<{
    Params: UpdateProductParamsType
    Body: UpdateProductBodyType
    Reply: MessageResponseSchemaType
  }>(
    '/:id',
    {
      schema: {
        params: UpdateProductParamsSchema,
        body: UpdateProductBodySchema,
        response: {
          200: MessageResponseSchema
        }
      },
      preValidation: fastify.auth([requireLoggedHook])
    },
    async (request, reply) => {
      await controller.updateProduct(request.params.id, request.body)
      reply.send({
        message: 'Cập nhật sản phẩm thành công!'
      })
    }
  )

  fastify.delete<{
    Params: DeleteProductParamsType
    Reply: MessageResponseSchemaType
  }>(
    '/:id',
    {
      schema: {
        params: DeleteProductParamsSchema,
        response: {
          200: MessageResponseSchema
        }
      },
      preValidation: fastify.auth([requireLoggedHook])
    },
    async (request, reply) => {
      await controller.deleteProduct(request.params.id)
      reply.send({
        message: 'Xóa sản phẩm thành công!'
      })
    }
  )
}
