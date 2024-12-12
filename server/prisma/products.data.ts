import { Prisma, PrismaClient, Product } from '@prisma/client'

const prisma = new PrismaClient()
export const getProductSampleData = async () => {
  await prisma.product.deleteMany()
  const categories = await prisma.category.findMany({
    select: { id: true }
  })
  const activePromotion = await prisma.promotion.findMany({
    select: { id: true }
  })

  const sampleProducts: Prisma.ProductCreateInput[] = [
    {
      name: "Kim chi cải thảo cắt lát Bibigo Ông Kim's gói",
      slug: 'kim-chi-cai-thao-cat-lat-bibigo-ong-kims-goi',
      description: "Kim chi cải thảo cắt lát Bibigo Ông Kim's gói",
      price: 1000,
      stock: 200,
      sold: 10,
      image: {
        thumbnail: '/images/product/kim-chi-cai-thao-cat-lat-bibigo-ong-kims-goi-100g-202002031131554036.webp'
      },
      categories: {
        connect: categories
      },
      promotion: {
        connect: activePromotion
      },
      rating: 4,
      isActive: true,
      reviewCount: 0,
      seller: null,
      sellerId: null,
      tags: []
    },
    {
      name: 'Xà lách búp mỡ',
      slug: 'xa-lach-bup-mo',
      description: 'Xà lách búp mỡ',
      price: 1000,
      stock: 200,
      sold: 10,
      image: {
        thumbnail: '/images/product/xa-lach-bup-mo-goi-500g-202205181604086388.webp'
      },
      categories: {
        connect: categories
      },
      promotion: {
        connect: activePromotion
      },
      rating: 4,
      isActive: true,
      reviewCount: 0,
      seller: null,
      sellerId: null,
      tags: []
    },
    {
      name: 'Xà lách xoong Đà Lạt',
      slug: 'xa-lach-xoong-da-lat',
      description: 'Xà lách xoong Đà Lạt',
      price: 1000,
      stock: 200,
      sold: 10,
      image: {
        thumbnail: '/images/product/xa-lach-xoong-da-lat-300g-202304070914101670.webp'
      },
      categories: {
        connect: categories
      },
      promotion: {
        connect: activePromotion
      },
      rating: 4,
      isActive: true,
      reviewCount: 0,
      seller: null,
      sellerId: null,
      tags: []
    },
    {
      name: 'Bột mì đa dụng Meizan gói 1kg',
      slug: 'bot-mi-da-dung-meizan-goi-1kg',
      description: 'Bột mì đa dụng Meizan gói 1kg',
      price: 1000,
      stock: 200,
      sold: 10,
      image: {
        thumbnail: '/images/product/bot-mi-da-dung-meizan-goi-1kg-201903221403092427.webp'
      },
      categories: {
        connect: categories
      },
      promotion: {
        connect: activePromotion
      },
      rating: 4,
      isActive: true,
      reviewCount: 0,
      seller: null,
      sellerId: null,
      tags: []
    },
    {
      name: 'Rong biển nấu canh Ottogi gói 20g',
      slug: 'rong-bien-nau-canh-ottogi-goi-20g',
      description: 'Rong biển nấu canh Ottogi gói 20g',
      price: 1000,
      stock: 200,
      sold: 10,
      image: {
        thumbnail: '/images/product/rong-bien-nau-canh-ottogi-goi-20g-202304140929362247.webp'
      },
      categories: {
        connect: categories
      },
      promotion: {
        connect: activePromotion
      },
      rating: 4,
      isActive: true,
      reviewCount: 0,
      seller: null,
      sellerId: null,
      tags: []
    },
    {
      name: 'Bưởi da xanh trái 1.7kg trở lên',
      slug: 'buoi-da-xanh-trai-17kg-tro-len',
      description: 'Bưởi da xanh trái 1.7kg trở lên',
      price: 1000,
      stock: 200,
      sold: 10,
      image: {
        thumbnail: '/images/product/buoi-da-xanh-trai-tu-17kg-tro-len-202205111921599930.webp'
      },
      categories: {
        connect: categories
      },
      promotion: {
        connect: activePromotion
      },
      rating: 4,
      isActive: true,
      reviewCount: 0,
      seller: null,
      sellerId: null,
      tags: []
    }
  ]
  return sampleProducts
}
