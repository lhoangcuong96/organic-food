import z from 'zod'
import { CreateProductBodySchema, ProductDetailSchema } from './admin-product-schema'

/*---------------------Create-------------------------- */
export const CreateVegetableProductBodySchema = z.object({
  ...CreateProductBodySchema.shape,
  attributes: z.object({
    origin: z.string(),
    weight: z.number().positive(),
    unit: z.enum(['kg', 'g']),
    ingredient: z.string().optional(),
    expiry: z.string().optional(),
    storageType: z.enum(['room', 'fridge', 'freezer']).optional(),
    diet: z.string().optional(),
    quantity: z.number().int().positive()
  })
})
export type CreateVegetableProductBodyType = z.TypeOf<typeof CreateVegetableProductBodySchema>
/*---------------------End Create-------------------------- */

/*---------------------Update-------------------------- */
export const UpdateVegetableProductBodySchema = CreateVegetableProductBodySchema
export type UpdateVegetableProductBodyType = CreateVegetableProductBodyType
/*---------------------End Update-------------------------- */

/*---------------------Detail-------------------------- */
export const VegetableProductDetailSchema = z.object({
  ...ProductDetailSchema.shape,
  attributes: z.object({
    brandId: z.string().optional(),
    origin: z.string(),
    weight: z.number().positive(),
    unit: z.enum(['kg', 'g']),
    ingredient: z.string().optional(),
    expiry: z.string().optional(),
    storageType: z.enum(['room', 'fridge', 'freezer']).optional(),
    diet: z.string().optional(),
    quantity: z.number().int().positive()
  })
})
export type VegetableProductDetailType = z.TypeOf<typeof VegetableProductDetailSchema>
