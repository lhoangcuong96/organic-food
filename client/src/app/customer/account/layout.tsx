import { ReactNode } from "react";
import AppBreadcrumb from "@/components/customer/layout/breadcrumb";

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
      <div className="bg-gray-100 w-screen p-8 flex items-center justify-center h-full">
        <div className="max-w-screen-xl w-full">{children}</div>
      </div>
    </div>
  );
}
