import productRequestApi from "@/api-request/product";
import { HeroImage } from "@/components/customer/layout/hero-image";
import Spinner from "@/components/ui/spinner";
import { CategoriesWithProductsResponse } from "@/services/category";
import { ProductListType } from "@/validation-schema/product";
import { Category } from "@prisma/client";
import { Metadata } from "next";
import { Suspense } from "react";
import { FeaturedCategories } from "./featured-categories";
import FoodSection from "./food-section";
import { OurSpecialServices } from "./our-special-services";
import { PromotionalProducts } from "./promotional-products";

// type Props = {
//   params: Promise<{ id: string }>;
//   searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
//   products: Product[];
// };

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Tìm kiếm những sản phẩm nổi bật tại Heo sạch nhà Thoa",
    description: "",
  };
}

export default async function CustomerHomePage() {
  let products: ProductListType[] = [];
  let error;

  try {
    const response = await productRequestApi.getProducts({
      page: 1,
      limit: 10,
      search: "",
    });

    console.log(response);

    if (!response || !response.payload) {
      throw new Error("Có lỗi xảy ra khi lấy dữ liệu sản phẩm!");
    }
    products = response.payload.data;
    console.log("products", products);
  } catch (err) {
    console.error("Error fetching products:", err);
    error = "Failed to load products. Please try again later.";
  }

  let categories: Partial<Category>[] = [];
  try {
    // categories = (await CategoryService.getCategories()) as Partial<Category>[];
    categories = [];
  } catch (err) {
    console.error("Error fetching products:", err);
    error = "Failed to load featured categories. Please try again later.";
  }

  let categoriesWithProducts: CategoriesWithProductsResponse[] = [];
  let getCategoriesWithProductsError = "";
  try {
    // categoriesWithProducts = await CategoryService.getCategoriesWithProducts();
    categoriesWithProducts = [];
  } catch (error) {
    console.error("Error fetching products:", error);
    getCategoriesWithProductsError =
      "Failed to load categories Please try again later.";
  }

  return (
    <div>
      <HeroImage src="/images/banner.webp"></HeroImage>
      <div className="flex flex-col items-center gap-8">
        <Suspense fallback={<Spinner />}>
          <FeaturedCategories
            categories={categories}
            error={error}
          ></FeaturedCategories>
        </Suspense>
        <Suspense fallback={<Spinner />}>
          <PromotionalProducts
            products={products}
            error={error}
          ></PromotionalProducts>
        </Suspense>

        <OurSpecialServices></OurSpecialServices>
        <Suspense fallback={<Spinner />}>
          <FoodSection
            categories={categoriesWithProducts}
            error={getCategoriesWithProductsError}
          ></FoodSection>
        </Suspense>
      </div>
    </div>
  );
}
