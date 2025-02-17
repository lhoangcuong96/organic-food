import z from 'zod'

export const CreateOrderBodySchema = z.object({
  items: z.array(
    z.object({
      productId: z.string(),
      quantity: z.number()
    })
  ),
  shippingAddress: z.object({
    fullname: z.string(),
    phoneNumber: z.string(),
    email: z.string().email().optional().nullable(),
    address: z.string(),
    ward: z.string(),
    district: z.string(),
    province: z.string()
  })
})

export type CreateOrderBodyType = z.TypeOf<typeof CreateOrderBodySchema>
