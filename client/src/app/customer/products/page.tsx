import AppBreadcrumb from "@/components/customer/layout/breadcrumb";
import { routePath } from "@/constants/routes";
import { SidebarFilter } from "./sidebar-filter";
import { ProductSort } from "./product-sort";
import { Promotions } from "./promotions";
import ProductGrid from "./product-grid";
import productRequestApi from "@/api-request/product";
import { ProductQueryType } from "@/validation-schema/product";
import { HttpError } from "@/lib/http";
import { ErrorMessage } from "@/components/customer/UI/error-massage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Danh sách sản phẩm",
  description: "Danh sách sản phẩm",
};
export default async function Products({
  searchParams,
}: {
  searchParams: Promise<ProductQueryType>;
}) {
  const params = await searchParams;
  const initialProducts = [];
  let errorMessage = "";
  try {
    const res = await productRequestApi.getProducts(params);
    if (res.payload.data) {
      initialProducts.push(...res.payload.data);
    } else {
      errorMessage = "Không tim thấy sản phẩm nào";
    }
  } catch (error) {
    errorMessage = (error as HttpError).message;
  }
  console.log(initialProducts);
  return (
    <div className="flex flex-col w-full items-center justify-center h-full text-sm font-medium">
      <AppBreadcrumb
        src="/images/breadcrumb.webp"
        pageTitle="Rau củ"
        breadcrumbItems={[
          {
            title: "Trang chủ",
            href: routePath.customer.home,
          },
          {
            title: "Rau củ",
          },
        ]}
      ></AppBreadcrumb>
      <div className="w-screen p-8 flex items-center justify-center h-full">
        <div className="max-w-screen-xl w-full">
          <div className="mx-auto">
            <div className="container mx-auto px-4 py-8 font-medium">
              <Promotions />
              <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-8">
                <aside>
                  <SidebarFilter />
                </aside>
                <main>
                  <ProductSort />
                  {initialProducts.length === 0 ? (
                    <ErrorMessage className="text-center">
                      {errorMessage}
                    </ErrorMessage>
                  ) : (
                    <ProductGrid initialProducts={initialProducts} />
                  )}
                </main>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
