import { z } from "zod";
import { CommonQuery } from "./common";

export const ProductImageSchema = z.object({
  thumbnail: z.string().url().nullable().optional(),
  banner: z.string().url().nullable().optional(),
  featured: z.string().url().nullable().optional(),
  gallery: z.array(z.string().url()),
});

/*-----------------Product detail----------------------*/
export const productDetailSchema = z.object({
  id: z.string(),
  name: z.string(),
  price: z.number(),
  slug: z.string(),
  description: z.string(),
  stock: z.number(),
  image: ProductImageSchema,
});

export const productResponseSchema = z.object({
  data: productDetailSchema,
  message: z.string(),
});

export type ProductDetailType = z.infer<typeof productDetailSchema>;
export type ProductDetailResponseType = z.infer<typeof productResponseSchema>;

/*-----------------Product detail----------------------*/

/*-----------------Product list----------------------*/
export const ProductListQuerySchema = z.object({
  ...CommonQuery.shape,
  category: z.string().optional(),
});
export const ProductListSchema = z.object({
  id: z.string(),
  name: z.string(),
  price: z.number(),
  slug: z.string(),
  image: ProductImageSchema.pick({ thumbnail: true }),
});

export const ProductListResponseSchema = z.object({
  data: z.array(ProductListSchema),
  message: z.string(),
});

export type ProductQueryType = z.infer<typeof ProductListQuerySchema>;
export type ProductListType = z.infer<typeof ProductListSchema>[];
export type ProductListResponseType = z.infer<typeof ProductListResponseSchema>;
/*-----------------Product list----------------------*/
