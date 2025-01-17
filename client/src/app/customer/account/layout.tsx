import AppBreadcrumb from "@/components/customer/layout/breadcrumb";
import { ReactNode } from "react";
import { LeftSidebar } from "./left-sidebar";

export default function layout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col w-full items-center justify-center h-full">
      <AppBreadcrumb
        src="/images/breadcrumb.webp"
        pageTitle="Trang khách hàng"
        breadcrumbItems={[
          {
            title: "Trang chủ",
          },
          {
            title: "Trang khách hàng",
          },
        ]}
      ></AppBreadcrumb>
      <div className="w-screen p-8 flex items-center justify-center h-full">
        <div className="max-w-screen-xl w-full">
          <div className="mx-auto">
            <div className="flex min-h-[600px] h-full font-medium">
              <LeftSidebar />
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
