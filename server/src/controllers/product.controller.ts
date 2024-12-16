import {
  CreateProductBodyType,
  ProductListQueryType,
  UpdateProductBodyType
} from '@/schemaValidations/product/product.schema'
import { ProductService } from '@/services/product/product-service'

export default class ProductController {
  service: ProductService
  constructor() {
    this.service = new ProductService()
  }

  getProductList = (params: ProductListQueryType) => {
    return this.service.list(params)
  }

  getProductDetail = (slug: string) => {
    return this.service.getDetailBySlug(slug)
  }

  createProduct = (data: CreateProductBodyType) => {
    return this.service.create(data)
  }
  updateProduct = (id: string, data: UpdateProductBodyType) => {
    return this.service.update(id, data)
  }

  deleteProduct = (id: string) => {
    return this.service.delete(id)
  }
}
