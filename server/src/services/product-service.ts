import prisma from '@/database'
import { Order } from '@/schemaValidations/common.schema'
import { ProductListQueryType, ProductListType } from '@/schemaValidations/product.schema'

export class ProductService {
  async list(queryParams: ProductListQueryType): Promise<ProductListType> {
    const { page = 1, limit = 20, category, sort = 'createdAt', order = Order.Desc, search } = queryParams
    const skip = (page - 1) * limit
    const take = limit
    const where = {
      AND: [
        category
          ? {
              categories: {
                some: {
                  name: {
                    equals: category
                  }
                }
              }
            }
          : {},
        search ? { name: { contains: search }, mode: 'insensitive' } : {}
      ]
    }
    const select = {
      id: true,
      name: true,
      price: true,
      slug: true,
      description: true,
      title: true,
      stock: true,
      image: {
        select: {
          thumbnail: true,
          banner: true,
          featured: true,
          gallery: true
        }
      }
    }
    let orderBy: { [x: string]: string } = {
      createdAt: 'desc'
    }
    if (sort) {
      orderBy = {
        [sort]: order === Order.Asc ? 'asc' : 'desc'
      }
    }

    return prisma.product.findMany({
      where,
      skip,
      take,
      orderBy,
      select
    })
  }
  async getDetailBySlug(slug: string) {
    return prisma.product.findFirstOrThrow({
      where: {
        slug
      }
    })
  }
}
