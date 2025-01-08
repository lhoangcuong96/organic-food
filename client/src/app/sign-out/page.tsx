"use client";

import { authApiRequest } from "@/api-request/auth";
import Spinner from "@/components/ui/page-spinner";
import { routePath } from "@/constants/routes";
import { useHandleMessage } from "@/utils/hooks";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
export default function Page() {
  const { messageApi } = useHandleMessage();
  const router = useRouter();
  const pathName = usePathname();
  const signOut = async () => {
    try {
      await authApiRequest.logoutFromClientToNextServer({ forceLogout: true });
      sessionStorage.clear();
    } catch (error) {
      messageApi.error({ error: error as Error });
    } finally {
      router.replace(`${routePath.signIn}?redirect=${pathName}`);
      router.refresh();
    }
  };
  useEffect(() => {
    signOut();
  }, []);
  return (
    <div className="fixed top-0 left-0 w-screen h-screen z-50 bg-slate-700 flex items-center justify-center">
      <Spinner />
    </div>
  );
}
