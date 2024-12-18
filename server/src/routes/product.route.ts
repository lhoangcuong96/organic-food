import ProductController from '@/controllers/product.controller'
import {
  ProductDetailParamsType,
  ProductDetailResponseType,
  ProductDetailSchema,
  ProductListQuerySchema,
  ProductListQueryType,
  ProductListResSchema,
  ProductListResType
} from '@/schemaValidations/product.schema'
import { FastifyInstance, FastifyPluginOptions } from 'fastify'

export default async function productRoutes(fastify: FastifyInstance, options: FastifyPluginOptions) {
  const controller = new ProductController()
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
      console.log(products)
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
}
