// prisma/seed.js
import { Prisma, PrismaClient } from '@prisma/client'
import { addMonths, getMonth } from 'date-fns'

const prisma = new PrismaClient()

const createSampleProducts = async () => {
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
        thumbnail:
          'http://localhost:4000/static/kim-chi-cai-thao-cat-lat-bibigo-ong-kims-goi-100g-202002031131554036.webp'
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
        thumbnail: 'http://localhost:4000/static/xa-lach-bup-mo-goi-500g-202205181604086388.webp'
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
        thumbnail: 'http://localhost:4000/static/xa-lach-xoong-da-lat-300g-202304070914101670.webp'
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
        thumbnail: 'http://localhost:4000/static/bot-mi-da-dung-meizan-goi-1kg-201903221403092427.webp'
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
        thumbnail: 'http://localhost:4000/static/rong-bien-nau-canh-ottogi-goi-20g-202304140929362247.webp'
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
        thumbnail: 'http://localhost:4000/static/buoi-da-xanh-trai-tu-17kg-tro-len-202205111921599930.webp'
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
  sampleProducts.forEach(async (sample) => {
    await prisma.product.create({
      data: sample
    })
  })
}
const createSampleCategory = async () => {
  await prisma.category.deleteMany()
  const data: Prisma.CategoryCreateInput[] = [
    {
      name: 'Rau củ',
      description: 'Thực phẩm rau củ',
      slug: 'rau-cu',
      attribute: [
        {
          price: {
            label: 'Chọn mức giá',
            range: [
              {
                label: 'Dưới 10.000đ',
                max: 10000
              },
              {
                label: 'Từ 10.000đ - 50.000đ',
                min: 10000,
                max: 50000
              },
              {
                label: 'Từ 50.000đ - 100.000đ',
                min: 50000,
                max: 100000
              },
              {
                label: 'Từ 100.000đ - 200.000đ',
                min: 100000,
                max: 200000
              },
              {
                label: 'Từ 200.000đ - 300.000đ',
                min: 200000,
                max: 300000
              },
              {
                label: 'Từ 300.000đ - 500.000đ',
                min: 300000,
                max: 500000
              },
              {
                label: 'Trên 500.000đ',
                min: 500000
              }
            ]
          },
          weight: {
            label: 'Trọng lượng',
            range: [
              {
                label: '90g',
                min: 90,
                max: 90
              },
              {
                label: '100g',
                min: 100,
                max: 100
              },
              {
                label: '120g',
                min: 120,
                max: 120
              },
              {
                label: '200g',
                min: 200,
                max: 200
              }
            ]
          }
        }
      ],
      image: {
        thumbnail: 'http://localhost:4000/static/danhmuc_1.webp',
        banner: 'http://localhost:4000/static/category_1_banner.jpg',
        featured: 'http://localhost:4000/static/category_1_featured.webp',
        icon: 'http://localhost:4000/static/danhmuc_1.webp'
      }
    },
    {
      name: 'Trái Cây',
      description: 'Thực phẩm trái cây',
      slug: 'trai-cay',
      attribute: [
        {
          price: {
            label: 'Chọn mức giá',
            range: [
              {
                label: 'Dưới 10.000đ',
                max: 10000
              },
              {
                label: 'Từ 10.000đ - 50.000đ',
                min: 10000,
                max: 50000
              },
              {
                label: 'Từ 50.000đ - 100.000đ',
                min: 50000,
                max: 100000
              },
              {
                label: 'Từ 100.000đ - 200.000đ',
                min: 100000,
                max: 200000
              },
              {
                label: 'Từ 200.000đ - 300.000đ',
                min: 200000,
                max: 300000
              },
              {
                label: 'Từ 300.000đ - 500.000đ',
                min: 300000,
                max: 500000
              },
              {
                label: 'Trên 500.000đ',
                min: 500000
              }
            ]
          },
          weight: {
            label: 'Trọng lượng',
            range: [
              {
                label: '90g',
                min: 90,
                max: 90
              },
              {
                label: '100g',
                min: 100,
                max: 100
              },
              {
                label: '120g',
                min: 120,
                max: 120
              },
              {
                label: '200g',
                min: 200,
                max: 200
              }
            ]
          }
        }
      ],
      image: {
        thumbnail: 'http://localhost:4000/static/danhmuc_2.webp',
        banner: 'http://localhost:4000/static/category_2_banner.jpg',
        featured: 'http://localhost:4000/static/category_2_featured.jpg',
        icon: 'http://localhost:4000/static/danhmuc_2.webp',
        gallery: [
          'http://localhost:4000/static/category_2_gallery_1.webp',
          'http://localhost:4000/static/category_2_gallery_2.webp',
          'http://localhost:4000/static/category_2_gallery_3.webp'
        ]
      }
    },
    {
      name: 'Đồ Khô',
      description: 'Thực phẩm đồ khô',
      slug: 'do-kho',
      image: {
        thumbnail: 'http://localhost:4000/static/danhmuc_3.webp',
        banner: 'http://localhost:4000/static/category_3_banner.png',
        featured: 'http://localhost:4000/static/category_3_featured.jpg',
        icon: 'http://localhost:4000/static/danhmuc_3.webp',
        gallery: []
      }
    },
    {
      name: 'Nước Ép',
      description: 'Thực phẩm nước ép',
      slug: 'nuoc-ep',
      image: {
        thumbnail: 'http://localhost:4000/static/danhmuc_4.webp',
        banner: 'http://localhost:4000/static/category_4_banner.png',
        featured: 'http://localhost:4000/static/category_4_featured.png',
        icon: 'http://localhost:4000/static/danhmuc_4.webp',
        gallery: []
      }
    },
    {
      name: 'Salad',
      description: 'Thực phẩm salad',
      slug: 'salad',
      image: {
        thumbnail: 'http://localhost:4000/static/danhmuc_1.webp',
        banner: 'http://localhost:4000/static/category_1_banner.jpg',
        featured: 'http://localhost:4000/static/category_1_featured.webp',
        icon: 'http://localhost:4000/static/danhmuc_1.webp',
        gallery: []
      }
    },
    {
      name: 'Thực phẩm khác',
      description: 'Thực phẩm khác',
      slug: 'thuc-pham-khac',
      image: {
        thumbnail: 'http://localhost:4000/static/danhmuc_1.webp',
        banner: 'http://localhost:4000/static/category_1_banner.jpg',
        featured: 'http://localhost:4000/static/category_1_featured.webp',
        icon: 'http://localhost:4000/static/danhmuc_1.webp',
        gallery: []
      }
    }
  ]
  const record = await prisma.category.createMany({
    data: data
  })
  return record
}

const createSamplePromotion = async () => {
  await prisma.promotion.deleteMany()
  await prisma.promotion.create({
    data: {
      title: 'Flash sale',
      description: `Flash sale tháng ${getMonth(new Date())}`,
      startDate: new Date(),
      endDate: addMonths(new Date(), 1),
      discountType: 'PERCENTAGE',
      discountValue: 20
    }
  })
}

const main = async () => {
  await createSampleCategory()
  await createSamplePromotion()
  createSampleProducts()
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
