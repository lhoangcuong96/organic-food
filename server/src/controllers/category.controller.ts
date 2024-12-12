import prisma from '@/database'

export const getCategoryBySlug = (slug: string) => {
  return prisma.category.findUniqueOrThrow({
    where: {
      slug
    },
    select: {
      id: true,
      name: true,
      description: true,
      slug: true,
      image: true
    }
  })
}
