import { categoryApiRequests } from "@/api-request/category";
import productRequestApi from "@/api-request/product";
import AppBreadcrumb from "@/components/customer/layout/breadcrumb";
import { routePath } from "@/constants/routes";
import { ProductListQueryType } from "@/validation-schema/product";
import { Metadata } from "next";
import ProductGrid from "./product-grid";
import { Sidebar } from "./sidebar";
import Promotions from "@/components/ui/promotions";

export const metadata: Metadata = {
  title: "Danh sách sản phẩm",
  description: "Danh sách sản phẩm",
};
export default async function Products({
  searchParams,
}: {
  searchParams: Promise<ProductListQueryType>;
}) {
  const params = await searchParams;
  const initialProducts = [];
  let getProductsErrorMessage = "";
  let getCategoriesErrorMessage = "";
  const categories = [];

  async function getProducts() {
    const res = await productRequestApi.getProducts(params);
    if (res.payload?.data) {
      return res.payload.data;
    } else {
      throw new Error("Không tim thấy sản phẩm nào");
    }
  }

  async function getCategories() {
    const res = await categoryApiRequests.getListCategory();
    if (!res.payload?.data) throw new Error("Không thể lấy danh sách danh mục");
    return res.payload.data;
  }
  const [getProductsResponse, getCategoriesResponse] = await Promise.allSettled(
    [getProducts(), getCategories()]
  );
  if (getProductsResponse.status === "rejected") {
    getProductsErrorMessage = "Lỗi khi lấy dữ liệu sản phẩm";
    console.error(getProductsResponse.reason);
  } else {
    initialProducts.push(...getProductsResponse.value);
  }
  if (getCategoriesResponse.status === "rejected") {
    getCategoriesErrorMessage = "Lỗi khi lấy dữ liệu danh mục";
    console.error(getCategoriesResponse.reason);
  } else {
    categories.push(...getCategoriesResponse.value);
  }

  return (
    <div className="flex flex-col w-full items-center justify-center h-full text-sm font-medium">
      <AppBreadcrumb
        pageTitle="Danh sách sản phẩm"
        breadcrumbItems={[
          {
            title: "Trang chủ",
            href: routePath.customer.home,
          },
          {
            title: "Danh sách sản phẩm",
          },
        ]}
      ></AppBreadcrumb>
      <div className="w-screen sm:p-8 flex items-center justify-center h-full">
        <div className="max-w-screen-xl w-full">
          <div className="mx-auto">
            <div className="container mx-auto px-4 py-8 font-medium">
              <Promotions />
              <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-8">
                <aside>
                  <Sidebar
                    categories={categories}
                    errorMessage={getCategoriesErrorMessage}
                    params={params}
                  />
                </aside>
                <main>
                  {/* <ProductSort /> */}
                  <ProductGrid
                    initialProducts={initialProducts}
                    errorMessage={getProductsErrorMessage}
                  />
                </main>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
