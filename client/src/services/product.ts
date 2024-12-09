import prisma from "@/lib/prisma";

export class ProductService {
  static getProducts = () => {
    return prisma.product.findMany({
      select: {
        name: true,
        description: true,
        image: true,
        price: true,
        slug: true,
      },
      where: {
        isActive: true,
      },
    });
  };
}
