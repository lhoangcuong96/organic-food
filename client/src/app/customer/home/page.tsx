import { HeroImage } from "@/components/customer/layout/hero-image";
import {
  CategoriesWithProductsResponse,
  CategoryService,
} from "@/services/category";
import { ProductService } from "@/services/product";
import { Category, Product } from "@prisma/client";
import { Metadata } from "next";
import { FeaturedCategories } from "./featured-categories";
import FoodSection from "./food-section";
import { OurSpecialServices } from "./our-special-services";
import { PromotionalProducts } from "./promotional-products";
import { Suspense } from "react";

// type Props = {
//   params: Promise<{ id: string }>;
//   searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
//   products: Product[];
// };

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Discover Hot Products | Top Trending Items for Customers",
    description:
      "Explore our collection of hot products that are trending right now! Find the best deals on top-selling items tailored for customers. Shop now and discover what everyone is talking about!",
  };
}

export default async function CustomerHomePage() {
  let products: Partial<Product>[] = [];
  let error;

  try {
    products = await ProductService.getProducts();
  } catch (err) {
    console.error("Error fetching products:", err);
    error = "Failed to load products. Please try again later.";
  }

  let categories: Category[] = [];
  try {
    categories = await CategoryService.getCategories();
  } catch (err) {
    console.error("Error fetching products:", err);
    error = "Failed to load featured categories. Please try again later.";
  }

  let categoriesWithProducts: CategoriesWithProductsResponse[] = [];
  let getCategoriesWithProductsError = "";
  try {
    categoriesWithProducts = await CategoryService.getCategoriesWithProducts();
    console.log(categoriesWithProducts);
  } catch (error) {
    console.error("Error fetching products:", error);
    getCategoriesWithProductsError =
      "Failed to load categories Please try again later.";
  }

  return (
    <div>
      <HeroImage src="/images/slider_1.webp"></HeroImage>
      <div className="flex flex-col items-center gap-8">
        <Suspense fallback={<p>...Loading</p>}>
          <FeaturedCategories
            categories={categories}
            error={error}
          ></FeaturedCategories>
        </Suspense>
        <Suspense fallback={<p>...Loading</p>}>
          <PromotionalProducts
            products={products}
            error={error}
          ></PromotionalProducts>
        </Suspense>

        <OurSpecialServices></OurSpecialServices>
        <Suspense fallback={<p>...Loading</p>}>
          <FoodSection
            categories={categoriesWithProducts}
            error={getCategoriesWithProductsError}
          ></FoodSection>
        </Suspense>
      </div>
    </div>
  );
}
