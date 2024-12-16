import z from 'zod'
import { CommonQuery } from '../common.schema'

/*----------------Create---------------------*/
export const ProductImageSchema = z.object({
  thumbnail: z.string().nullable().optional(),
  banner: z.string().nullable().optional(),
  featured: z.string().nullable().optional(),
  gallery: z.array(z.string()).nullable().optional()
})

export const CreateProductBodySchema = z.object({
  name: z.string().min(1).max(256),
  title: z.string().min(1).max(256),
  price: z.number().positive(),
  description: z.string().max(10000),
  slug: z.string().min(1).max(256),
  stock: z.number().positive(),
  image: z.object({
    thumbnail: z.string(),
    banner: z.string().nullable().optional(),
    featured: z.string().nullable().optional(),
    gallery: z.array(z.string())
  }),
  categoryId: z.string(),
  tags: z.array(z.string()).optional(),
  attributes: z.array(z.any())
})

export type CreateProductBodyType = z.TypeOf<typeof CreateProductBodySchema>
/*----------------End Create---------------------*/

/*----------------Update---------------------*/
export const UpdateProductParamsSchema = z.object({
  id: z.string()
})
export const UpdateProductBodySchema = CreateProductBodySchema

export type UpdateProductParamsType = z.TypeOf<typeof UpdateProductParamsSchema>
export type UpdateProductBodyType = CreateProductBodyType
/*----------------End Update---------------------*/

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

/*----------------Delete---------------------*/
export const DeleteProductParamsSchema = z.object({
  id: z.string()
})
export type DeleteProductParamsType = z.TypeOf<typeof DeleteProductParamsSchema>
/*----------------End Delete---------------------*/
