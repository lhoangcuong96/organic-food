import prisma from '@/database'
import { Order } from '@/schemaValidations/common.schema'
import {
  CreateProductBodyType,
  ProductListQueryType,
  ProductListType,
  UpdateProductBodyType
} from '@/schemaValidations/product/product.schema'
import { InventoryService } from '../inventory.service'

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

  async create(data: CreateProductBodyType): Promise<void> {
    const { category, stock, ...rest } = data
    const product = await prisma.product.create({
      data: {
        ...rest,
        category: {
          connect: {
            id: category
          }
        }
      }
    })

    // insert inventory
    await InventoryService.createInventory({
      productId: product.id,
      quantity: stock
    })
  }

  async update(id: string, data: any): Promise<any> {
    const { stock, category } = data
    const product = await prisma.product.update({
      where: {
        id
      },
      data: {
        category: {
          connect: {
            id: category
          }
        }
      }
    })
    if (stock && product.inventoryId) {
      const inventory = await InventoryService.getInventory(product.inventoryId)
      await InventoryService.updateInventory(inventory.id, { quantity: stock })
    }
  }

  async delete(id: string) {
    await prisma.product.delete({
      where: {
        id
      }
    })
  }

  async detail(slug: string) {
    return prisma.product.findFirst({
      where: {
        slug
      },
      include: {
        category: true,
        promotions: true
      }
    })
  }
}
