import AppBreadcrumb from "@/components/customer/layout/breadcrumb";
import { routePath } from "@/constants/routes";
import { SidebarFilter } from "./sidebar-filter";
import { ProductSort } from "./product-sort";
import { Promotions } from "./promotions";

export default async function Products() {
  return (
    <div className="flex flex-col w-full items-center justify-center h-full text-sm">
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
                  {/* <ProductGrid /> */}
                </main>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
