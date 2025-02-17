import {
  CreateProductBodyType,
  ProductListQueryType,
  UpdateProductBodyType
} from '@/schemaValidations/admin/product/admin-product-schema'
import { AdminProductService } from '@/services/admin/admin-product.service'

export default class AdminProductController {
  service: AdminProductService
  constructor() {
    this.service = new AdminProductService()
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
