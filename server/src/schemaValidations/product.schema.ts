import z from 'zod'
import { CommonQuery } from './common.schema'

export const ProductImageSchema = z.object({
  thumbnail: z.string().nullable().optional(),
  banner: z.string().nullable().optional(),
  featured: z.string().nullable().optional(),
  gallery: z.array(z.string()).nullable().optional()
})

/*----------------List---------------------*/
export const ProductListQuerySchema = z.object({
  ...CommonQuery.shape,
  category: z.string().optional()
})

export const ProductListSchema = z.object({
  id: z.string(),
  name: z.string(),
  price: z.number(),
  slug: z.string(),
  description: z.string().optional().nullable(),
  title: z.string().optional().nullable(),
  stock: z.number(),
  image: ProductImageSchema
})

export const ProductListResSchema = z.object({
  data: z.array(ProductListSchema),
  message: z.string()
})
export type ProductListQueryType = z.TypeOf<typeof ProductListQuerySchema>
export type ProductListResType = z.TypeOf<typeof ProductListResSchema>
export type ProductListType = z.TypeOf<typeof ProductListSchema>[]

/*----------------End List---------------------*/

/*----------------Detail---------------------*/
export const ProductDetailParamsSchema = z.object({
  slug: z.coerce.string()
})
export const ProductDetailSchema = z.object({
  id: z.string(),
  name: z.string(),
  price: z.number(),
  slug: z.string(),
  description: z.string().optional().nullable(),
  title: z.string().optional().nullable(),
  stock: z.number(),
  image: ProductImageSchema
})
export const ProductDetailResponseSchema = z.object({
  data: ProductDetailSchema,
  message: z.string()
})

export type ProductDetailParamsType = z.TypeOf<typeof ProductDetailParamsSchema>
export type ProductDetailType = z.TypeOf<typeof ProductDetailSchema>
export type ProductDetailResponseType = z.TypeOf<typeof ProductDetailResponseSchema>
/*----------------End Detail---------------------*/
