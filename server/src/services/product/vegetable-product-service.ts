import prisma from '@/database'
import { Order } from '@/schemaValidations/common.schema'
import {
  ProductListQueryType,
  ProductListType,
  UpdateProductBodyType
} from '@/schemaValidations/product/product.schema'
import {
  CreateVegetableProductBodySchema,
  CreateVegetableProductBodyType,
  UpdateVegetableProductBodyType
} from '@/schemaValidations/product/vegetable-product.schema'
import { InventoryService } from '../inventory.service'
import { ProductService } from './product-service'
import { EntityError } from '@/utils/errors'

export class VegetableProductService extends ProductService {
  async create(data: CreateVegetableProductBodyType) {
    const result = CreateVegetableProductBodySchema.safeParse(data)
    if (!result.success) {
      throw new Error(result.error.message)
    }
    const product = await super.create(data)
    return product
  }

  async update(id: string, data: UpdateVegetableProductBodyType) {
    const result = CreateVegetableProductBodySchema.safeParse(data)
    if (!result.success) {
      throw new Error(result.error.message)
    }
    const product = await super.update(id, data)
    return product
  }
}
