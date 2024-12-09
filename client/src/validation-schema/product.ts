import { z } from "zod";

export const ProductImageSchema = z.object({
  thumbnail: z.string().url().nullable().optional(),
  banner: z.string().url().nullable().optional(),
  featured: z.string().url().nullable().optional(),
  gallery: z.array(z.string().url()),
});

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
