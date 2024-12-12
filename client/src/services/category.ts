import prisma from "@/lib/prisma";
import { Product } from "@prisma/client";

export interface CategoriesWithProductsResponse extends Partial<Product> {
  products?: Partial<Product>[];
}

export class CategoryService {
  static getCategories() {
    return prisma.category.findMany({
      select: {
        name: true,
        image: {
          select: {
            thumbnail: true,
          },
        },
        slug: true,
      },
    });
  }

  static getCategoriesWithProducts(): Promise<
    CategoriesWithProductsResponse[]
  > {
    return prisma.category.findMany({
      select: {
        id: true,
        name: true,
        image: true,
        products: {
          take: 10,
          select: {
            id: true,
            image: true,
            name: true,
            description: true,
            price: true,
            slug: true,
          },
        },
      },
    });
  }
}
