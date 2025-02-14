import { categoryApiRequests } from "@/api-request/category";
import productRequestApi from "@/api-request/product";
import { HeroImage } from "@/components/customer/layout/hero-image";
import Spinner from "@/components/ui/spinner";
import { CategoriesWithProductsResponse } from "@/services/category";
import { CategoryInListType } from "@/validation-schema/category";
import { ProductListType } from "@/validation-schema/product";
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
  let getProductError;

  try {
    const response = await productRequestApi.getProducts({
      page: 1,
      limit: 10,
      search: "",
    });
    if (!response || !response.payload) {
      throw new Error("Có lỗi xảy ra khi lấy dữ liệu sản phẩm!");
    }
    products = response.payload.data;
  } catch (err) {
    console.error("Error fetching products:", err);
    getProductError = "Failed to load products. Please try again later.";
  }

  let categories: CategoryInListType[] = [];
  let getCategoryError;
  try {
    const resp = await categoryApiRequests.getListCategory();
    const payload = resp.payload as unknown as { data: CategoryInListType[] };
    if (payload && payload.data.length > 0) {
      categories = payload.data;
    } else {
      throw new Error("Có lỗi xảy ra khi lấy dữ liệu danh mục!");
    }
  } catch (err) {
    console.error("Error fetching products:", err);
    getCategoryError =
      "Failed to load featured categories. Please try again later.";
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
    <div className="flex flex-col items-center w-full">
      <HeroImage src="/images/banner.webp"></HeroImage>
      <div className="flex flex-col items-center gap-8 px-5 w-full max-w-screen-xl">
        <Suspense fallback={<Spinner />}>
          <FeaturedCategories
            categories={categories}
            error={getCategoryError}
          ></FeaturedCategories>
        </Suspense>
        <Suspense fallback={<Spinner />}>
          <PromotionalProducts
            products={products}
            error={getProductError}
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
