import z from 'zod'

/*----------------------Create------------------------*/

export const MAX_CATEGORY_SAMPLE_IMAGES = 5

export const CategoryImageSchema = z.object({
  thumbnail: z.string().url().nullable().optional(),
  banner: z.string().url().nullable().optional(),
  featured: z.string().url(),
  sample: z.array(z.string().url()).max(MAX_CATEGORY_SAMPLE_IMAGES).min(1)
})

export const CreateCategoryBodySchema = z
  .object({
    name: z.string(),
    description: z.string().optional().nullable(),
    parent: z.string().optional().nullable(),
    image: z.object(CategoryImageSchema.shape),
    attributes: z.array(z.string())
  })
  .strict()

export type CreateCategoryBodyType = z.infer<typeof CreateCategoryBodySchema>
/*----------------------End Create------------------------*/

/*----------------------List------------------------*/
export const ListCategorySchema: z.ZodSchema = z.lazy(() =>
  z.object({
    id: z.string(),
    name: z.string(),
    image: CategoryImageSchema,
    attributes: z.array(z.string()),
    subCategories: z.array(ListCategorySchema).default([])
  })
)

export const ListCategoryResponseSchema = z.object({
  data: z.array(ListCategorySchema),
  message: z.string()
})

export type ListCategoryResponseType = z.infer<typeof ListCategoryResponseSchema>
/*----------------------End list------------------------*/

/*----------------------Delete-----------------------*/
export const DeleteCategoryBodySchema = z.object({
  ids: z.array(z.string())
})

export type DeleteCategoryBodyType = z.infer<typeof DeleteCategoryBodySchema>
/*----------------------End Delete------------------------*/
