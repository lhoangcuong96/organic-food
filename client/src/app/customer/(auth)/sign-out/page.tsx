"use client";

import { authApiRequest } from "@/api-request/auth";
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
      router.replace(`${routePath.customer.signIn}?redirect=${pathName}`);
    } catch (error) {
      handleError({ error });
    }
  };
  useEffect(() => {
    signOut();
  }, []);
  return (
    <div className={`min-h-[600px] flex items-center font-semibold `}>
      <p className="loading-animation font-lg">Đang xử lý</p>
    </div>
  );
}
