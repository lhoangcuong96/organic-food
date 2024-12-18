import prisma from '@/database'
import { Category } from '@prisma/client/'

export class CategoryService {
  static getCategoryBySlug = ({ slug, select }: { slug: string; select?: Array<keyof Category> }) => {
    const defaultFields: Array<keyof Category> = ['id', 'name', 'description', 'slug', 'image']
    const selectObject: Partial<Record<keyof Category, boolean>> = (select || defaultFields).reduce(
      (acc, field) => {
        acc[field] = true
        return acc
      },
      {} as Partial<Record<keyof Category, boolean>>
    )

    return prisma.category.findUniqueOrThrow({
      where: {
        slug
      },
      select: selectObject
    })
  }

  static getCategoryById = ({ id, select }: { id: string; select?: Array<keyof Category> }) => {
    const defaultFields: Array<keyof Category> = ['id', 'name', 'description', 'slug', 'image']
    const selectObject: Partial<Record<keyof Category, boolean>> = (select || defaultFields).reduce(
      (acc, field) => {
        acc[field] = true
        return acc
      },
      {} as Partial<Record<keyof Category, boolean>>
    )

    return prisma.category.findUniqueOrThrow({
      where: {
        id
      },
      select: selectObject
    })
  }
}
