import prisma from '@/database'
import { Order } from '@/schemaValidations/common.schema'
import {
  CreateProductBodyType,
  ProductListQueryType,
  UpdateProductBodyType
} from '@/schemaValidations/product/product.schema'
import { ProductService } from '@/services/product.service'

export const getProductList = (params: ProductListQueryType) => {
  return ProductService.getProductList(params)
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
  return ProductService.createProduct(data)
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
