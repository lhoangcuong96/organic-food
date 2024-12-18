import prisma from '@/database'
import { CategoryService } from '@/services/category-service'

export class CategoryController {
  static async getCategoryBySlug(slug: string) {
    return CategoryService.getCategoryBySlug({ slug })
  }

  static async getCategoryById(id: string) {
    return CategoryService.getCategoryById({ id })
  }
}
