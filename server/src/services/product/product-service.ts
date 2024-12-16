import prisma from '@/database'
import { Order } from '@/schemaValidations/common.schema'
import {
  CreateProductBodyType,
  ProductListQueryType,
  ProductListType
} from '@/schemaValidations/product/product.schema'
import { InventoryService } from '../inventory.service'
import { CreateVegetableProductBodySchema } from '@/schemaValidations/product/vegetable-product.schema'
import { CategoryService } from '../categorySerice'

const ProductValidationSchema: { [key: string]: any } = {
  vegetable: CreateVegetableProductBodySchema
}

export class ProductService {
  async validateProductData(product: CreateProductBodyType): Promise<CreateProductBodyType> {
    const { categoryId, ...data } = product
    const category = await CategoryService.getCategoryById({ id: categoryId, select: ['name'] })
    if (!category) {
      throw new Error('Category not found')
    }
    const schema = ProductValidationSchema[category.name]
    if (!schema) {
      throw new Error('Invalid category')
    }
    const result = ProductValidationSchema.safeParse(data)
    if (result.success === false) {
      throw new Error(result.error.message)
    }
    return result.data
  }

  async create(data: CreateProductBodyType): Promise<void> {
    const validatedData = await this.validateProductData(data)
    const { categoryId, ...rest } = validatedData
    const product = await prisma.product.create({
      data: {
        ...rest,
        category: {
          connect: {
            id: categoryId
          }
        }
      }
    })

    // insert inventory
    await InventoryService.createInventory({
      productId: product.id,
      quantity: rest.stock
    })
  }

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

  async update(id: string, data: any): Promise<void> {
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

  async getDetailBySlug(slug: string) {
    return prisma.product.findFirstOrThrow({
      where: {
        slug
      }
    })
  }
  async getDetailById(id: string) {
    return prisma.product.findFirstOrThrow({
      where: {
        id
      },
      include: {
        category: true,
        promotions: true
      }
    })
  }
}
