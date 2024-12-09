import prisma from '@/database'
import { CreateProductBodyType, ProductSchema, UpdateProductBodyType } from '@/schemaValidations/product.schema'
import { Product } from '@prisma/client'

export const getProductList = () => {
  return prisma.product.findMany({
    orderBy: {
      createdAt: 'desc'
    }
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
