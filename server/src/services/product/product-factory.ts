import { CreateProductBodyType, UpdateProductBodyType } from '@/schemaValidations/product/product.schema'
import { VegetableProductService } from './vegetable-product-service'
import { ProductService } from './product-service'

export const ProductServiceType = {
  vegetable: VegetableProductService
}

export class ProductFactory {
  service: ProductService

  constructor(type: keyof typeof ProductServiceType) {
    if (!ProductServiceType[type]) {
      throw new Error('Invalid product type')
    }
    this.service = new ProductServiceType[type]()
    if (this.service === undefined) {
      throw new Error('Invalid product type')
    }
  }

  create<T extends CreateProductBodyType>(data: T) {
    return this.service.create(data)
  }

  update<T extends UpdateProductBodyType>(id: string, data: T) {
    return this.service.update(id, data)
  }

  detail(slug: string) {
    return this.service.detail(slug)
  }

  delete(id: string) {
    return this.service.delete(id)
  }
}
