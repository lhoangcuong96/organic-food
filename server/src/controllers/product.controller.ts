import { ProductListQueryType } from '@/schemaValidations/product.schema'
import { ProductService } from '@/services/product.service'

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
}
