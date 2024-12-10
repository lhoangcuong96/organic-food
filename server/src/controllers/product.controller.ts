import prisma from '@/database'
import { Order } from '@/schemaValidations/common.schema'
import { CreateProductBodyType, ProductListQueryType, UpdateProductBodyType } from '@/schemaValidations/product.schema'

export const getProductList = ({
  page = 1,
  limit = 20,
  category,
  sort = 'createdAt',
  order = Order.Desc,
  search
}: ProductListQueryType) => {
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
      search ? { name: { contains: search } } : {}
    ]
  }
  const select = {
    id: true,
    name: true,
    price: true,
    slug: true,
    description: true,
    stock: true,
    image: {
      select: {
        thumbnail: true
      }
    }
  }
  const orderBy = {
    [sort]: order === Order.Asc ? 'asc' : 'desc'
  }
  return prisma.product.findMany({
    where,
    skip,
    take,
    orderBy,
    select
  })
}

export const getProductDetail = (slug: string) => {
  return prisma.product.findUniqueOrThrow({
    where: {
      slug
    },
    select: {
      id: true,
      name: true,
      price: true,
      slug: true,
      description: true,
      stock: true,
      image: true,
      createdAt: true,
      updatedAt: true
    }
  })
}

export const createProduct = (data: CreateProductBodyType) => {
  return prisma.product.create({
    data
  })
}

export const updateProduct = (id: number, data: UpdateProductBodyType) => {
  return prisma.product.update({
    where: {
      id
    },
    data
  })
}

export const deleteProduct = (id: number) => {
  return prisma.product.delete({
    where: {
      id
    }
  })
}
