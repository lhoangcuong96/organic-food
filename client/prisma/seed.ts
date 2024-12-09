// prisma/seed.js
import { Prisma, PrismaClient } from "@prisma/client";
import { addMonths, getMonth } from "date-fns";

const prisma = new PrismaClient();

const createSampleProducts = async () => {
  await prisma.product.deleteMany();
  const categories = await prisma.category.findMany({
    select: { id: true },
  });
  const activePromotion = await prisma.promotion.findMany({
    select: { id: true },
  });

  const sampleProducts: Prisma.ProductCreateInput[] = [
    {
      name: "Kim chi cải thảo cắt lát Bibigo Ông Kim's gói",
      slug: "kim-chi-cai-thao-cat-lat-bibigo-ong-kims-goi",
      description: "Kim chi cải thảo cắt lát Bibigo Ông Kim's gói",
      price: 1000,
      stock: 200,
      sold: 10,
      image: {
        thumbnail:
          "/images/product/kim-chi-cai-thao-cat-lat-bibigo-ong-kims-goi-100g-202002031131554036.webp",
      },
      categories: {
        connect: categories,
      },
      promotion: {
        connect: activePromotion,
      },
      rating: 4,
      isActive: true,
      reviewCount: 0,
      seller: null,
      sellerId: null,
      tags: [],
    },
    {
      name: "Xà lách búp mỡ",
      slug: "xa-lach-bup-mo",
      description: "Xà lách búp mỡ",
      price: 1000,
      stock: 200,
      sold: 10,
      image: {
        thumbnail:
          "/images/product/xa-lach-bup-mo-goi-500g-202205181604086388.webp",
      },
      categories: {
        connect: categories,
      },
      promotion: {
        connect: activePromotion,
      },
      rating: 4,
      isActive: true,
      reviewCount: 0,
      seller: null,
      sellerId: null,
      tags: [],
    },
    {
      name: "Xà lách xoong Đà Lạt",
      slug: "xa-lach-xoong-da-lat",
      description: "Xà lách xoong Đà Lạt",
      price: 1000,
      stock: 200,
      sold: 10,
      image: {
        thumbnail:
          "/images/product/xa-lach-xoong-da-lat-300g-202304070914101670.webp",
      },
      categories: {
        connect: categories,
      },
      promotion: {
        connect: activePromotion,
      },
      rating: 4,
      isActive: true,
      reviewCount: 0,
      seller: null,
      sellerId: null,
      tags: [],
    },
    {
      name: "Bột mì đa dụng Meizan gói 1kg",
      slug: "bot-mi-da-dung-meizan-goi-1kg",
      description: "Bột mì đa dụng Meizan gói 1kg",
      price: 1000,
      stock: 200,
      sold: 10,
      image: {
        thumbnail:
          "/images/product/bot-mi-da-dung-meizan-goi-1kg-201903221403092427.webp",
      },
      categories: {
        connect: categories,
      },
      promotion: {
        connect: activePromotion,
      },
      rating: 4,
      isActive: true,
      reviewCount: 0,
      seller: null,
      sellerId: null,
      tags: [],
    },
    {
      name: "Rong biển nấu canh Ottogi gói 20g",
      slug: "rong-bien-nau-canh-ottogi-goi-20g",
      description: "Rong biển nấu canh Ottogi gói 20g",
      price: 1000,
      stock: 200,
      sold: 10,
      image: {
        thumbnail:
          "/images/product/rong-bien-nau-canh-ottogi-goi-20g-202304140929362247.webp",
      },
      categories: {
        connect: categories,
      },
      promotion: {
        connect: activePromotion,
      },
      rating: 4,
      isActive: true,
      reviewCount: 0,
      seller: null,
      sellerId: null,
      tags: [],
    },
    {
      name: "Bưởi da xanh trái 1.7kg trở lên",
      slug: "buoi-da-xanh-trai-17kg-tro-len",
      description: "Bưởi da xanh trái 1.7kg trở lên",
      price: 1000,
      stock: 200,
      sold: 10,
      image: {
        thumbnail:
          "/images/product/buoi-da-xanh-trai-tu-17kg-tro-len-202205111921599930.webp",
      },
      categories: {
        connect: categories,
      },
      promotion: {
        connect: activePromotion,
      },
      rating: 4,
      isActive: true,
      reviewCount: 0,
      seller: null,
      sellerId: null,
      tags: [],
    },
  ];
  sampleProducts.forEach(async (sample) => {
    await prisma.product.create({
      data: sample,
    });
  });
};
const createSampleCategory = async () => {
  await prisma.category.deleteMany();
  const data: Prisma.CategoryCreateInput[] = [
    {
      name: "Rau củ",
      description: "Thực phẩm rau củ",
      image: {
        thumbnail: "/images/category/danhmuc_1.webp",
        banner: "/images/category/category_1_banner.jpg",
        featured: "/images/category/category_1_featured.webp",
        icon: "/images/category/danhmuc_1.webp",
      },
    },
    {
      name: "Trái Cây",
      description: "Thực phẩm trái cây",
      image: {
        thumbnail: "/images/category/danhmuc_2.webp",
        banner: "/images/category/category_2_banner.jpg",
        featured: "/images/category/category_2_featured.jpg",
        icon: "/images/category/danhmuc_2.webp",
        gallery: [
          "/images/category/category_2_gallery_1.webp",
          "/images/category/category_2_gallery_2.webp",
          "/images/category/category_2_gallery_3.webp",
        ],
      },
    },
    {
      name: "Đồ Khô",
      description: "Thực phẩm đồ khô",
      image: {
        thumbnail: "/images/category/danhmuc_3.webp",
        banner: "/images/category/category_3_banner.png",
        featured: "/images/category/category_3_featured.jpg",
        icon: "/images/category/danhmuc_3.webp",
        gallery: [],
      },
    },
    {
      name: "Nước Ép",
      description: "Thực phẩm nước ép",
      image: {
        thumbnail: "/images/category/danhmuc_4.webp",
        banner: "/images/category/category_4_banner.png",
        featured: "/images/category/category_4_featured.png",
        icon: "/images/category/danhmuc_4.webp",
        gallery: [],
      },
    },
    {
      name: "Salad",
      description: "Thực phẩm salad",
      image: {
        thumbnail: "/images/category/danhmuc_1.webp",
        banner: "/images/category/category_1_banner.jpg",
        featured: "/images/category/category_1_featured.webp",
        icon: "/images/category/danhmuc_1.webp",
        gallery: [],
      },
    },
    {
      name: "Thực phẩm khác",
      description: "Thực phẩm khác",
      image: {
        thumbnail: "/images/category/danhmuc_1.webp",
        banner: "/images/category/category_1_banner.jpg",
        featured: "/images/category/category_1_featured.webp",
        icon: "/images/category/danhmuc_1.webp",
        gallery: [],
      },
    },
  ];
  const record = await prisma.category.createMany({
    data: data,
  });
  return record;
};

const createSamplePromotion = async () => {
  await prisma.promotion.deleteMany();
  await prisma.promotion.create({
    data: {
      title: "Flash sale",
      description: `Flash sale tháng ${getMonth(new Date())}`,
      startDate: new Date(),
      endDate: addMonths(new Date(), 1),
      discountType: "PERCENTAGE",
      discountValue: 20,
    },
  });
};

const main = async () => {
  await createSampleCategory();
  await createSamplePromotion();
  createSampleProducts();
};

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
