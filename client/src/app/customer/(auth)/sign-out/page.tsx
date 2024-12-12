"use client";

import { authApiRequest } from "@/api-request/auth";
import AppBreadcrumb from "@/components/customer/layout/breadcrumb";
import { routePath } from "@/constants/routes";
import { useHandleMessage } from "@/utils/hooks";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
export default function Page() {
  const { handleError } = useHandleMessage();
  const router = useRouter();
  const pathName = usePathname();
  const signOut = async () => {
    try {
      await authApiRequest.logoutFromClientToNextServer({ forceLogout: true });
      sessionStorage.clear();
    } catch (error) {
      handleError({ error });
    } finally {
      router.replace(`${routePath.customer.signIn}?redirect=${pathName}`);
      router.refresh();
    }
  };
  useEffect(() => {
    signOut();
  }, []);
  return (
    <div className="flex flex-col w-full items-center justify-center">
      <AppBreadcrumb
        src="/images/breadcrumb.webp"
        pageTitle="Đăng xuất tài khoản"
        breadcrumbItems={[
          {
            title: "Trang chủ",
          },
          {
            title: "Đăng xuất",
          },
        ]}
      ></AppBreadcrumb>
      <div className="max-w-[500px] w-screen p-8">
        <div className={`min-h-[400px] flex items-center font-semibold `}>
          <p className="loading-animation font-lg w-full text-center">
            Đang xử lý
          </p>
        </div>
      </div>
    </div>
  );
}
