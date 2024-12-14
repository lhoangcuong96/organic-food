import {
  createProduct,
  deleteProduct,
  getProductDetail,
  getProductList,
  updateProduct
} from '@/controllers/product.controller'
import { requireLoggedHook } from '@/hooks/auth.hooks'
import { MessageRes, MessageResType } from '@/schemaValidations/common.schema'
import {
  CreateProductBody,
  CreateProductBodyType,
  ProductListQuery,
  ProductListQueryType,
  ProductListRes,
  ProductListResType,
  ProductParams,
  ProductParamsType,
  ProductRes,
  ProductResType,
  UpdateProductBody,
  UpdateProductBodyType
} from '@/schemaValidations/product/product.schema'
import { FastifyInstance, FastifyPluginOptions } from 'fastify'

export default async function productRoutes(fastify: FastifyInstance, options: FastifyPluginOptions) {
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
          200: ProductListRes
        },
        querystring: ProductListQuery
      }
    },
    async (request, reply) => {
      const queryParams = request.query as ProductListQueryType
      const products = await getProductList({
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
    Params: ProductParamsType
    Reply: ProductResType
  }>(
    '/:slug',
    {
      schema: {
        params: ProductParams,
        response: {
          200: ProductRes
        }
      }
    },
    async (request, reply) => {
      const product = await getProductDetail(request.params.slug)
      console.log(product)
      reply.send({
        data: product,
        message: 'Lấy thông tin sản phẩm thành công!'
      })
    }
  )

  fastify.post<{
    Body: CreateProductBodyType
    Reply: ProductResType
  }>(
    '',
    {
      schema: {
        body: CreateProductBody,
        response: {
          200: ProductRes
        }
      },
      preValidation: fastify.auth([requireLoggedHook])
    },
    async (request, reply) => {
      const product = await createProduct(request.body)
      reply.send({
        data: product as any,
        message: 'Tạo sản phẩm thành công!'
      })
    }
  )

  fastify.put<{
    Params: ProductParamsType
    Body: UpdateProductBodyType
    Reply: ProductResType
  }>(
    '/:id',
    {
      schema: {
        params: ProductParams,
        body: UpdateProductBody,
        response: {
          200: ProductRes
        }
      },
      preValidation: fastify.auth([requireLoggedHook])
    },
    async (request, reply) => {
      const product = await updateProduct(request.params.id, request.body)
      reply.send({
        data: product,
        message: 'Cập nhật sản phẩm thành công!'
      })
    }
  )

  fastify.delete<{
    Params: ProductParamsType
    Reply: MessageResType
  }>(
    '/:id',
    {
      schema: {
        params: ProductParams,
        response: {
          200: MessageRes
        }
      },
      preValidation: fastify.auth([requireLoggedHook])
    },
    async (request, reply) => {
      await deleteProduct(request.params.id)
      reply.send({
        message: 'Xóa sản phẩm thành công!'
      })
    }
  )
}
