import z from 'zod'
import { CommonQuery } from '../common.schema'

/*----------------Create---------------------*/
export const ProductImageSchema = z.object({
  thumbnail: z.string().nullable().optional(),
  banner: z.string().nullable().optional(),
  featured: z.string().nullable().optional(),
  gallery: z.array(z.string()).nullable().optional()
})

export const CreateProductBody = z.object({
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
  category: z.string(),
  tags: z.array(z.string()).optional()
})

export type CreateProductBodyType = z.TypeOf<typeof CreateProductBody>
/*----------------End Create---------------------*/

/*----------------Update---------------------*/
export const UpdateProductBody = CreateProductBody
export type UpdateProductBodyType = CreateProductBodyType
/*----------------End Update---------------------*/

/*----------------List---------------------*/
export const ProductListQuery = z.object({
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

export const ProductListRes = z.object({
  data: z.array(ProductListSchema),
  message: z.string()
})
export type ProductListQueryType = z.TypeOf<typeof ProductListQuery>
export type ProductListResType = z.TypeOf<typeof ProductListRes>
export type ProductListType = z.TypeOf<typeof ProductListSchema>[]

/*----------------End List---------------------*/

/*----------------Detail---------------------*/
export const ProductDetailParams = z.object({
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

export type ProductDetailParamsType = z.TypeOf<typeof ProductDetailParams>
/*----------------End Detail---------------------*/
