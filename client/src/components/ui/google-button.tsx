"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { FaGoogle } from "react-icons/fa6";
import envConfig from "@/envConfig";
import { authApiRequest } from "@/api-request/auth";
import { useHandleMessage } from "@/utils/hooks";
import sessionStore from "@/helper/store/session-store";
import { useRouter } from "next/navigation";
import { routePath } from "@/constants/routes";

declare global {
  interface Window {
    google: any;
  }
}

export default function GoogleLoginButton() {
  const { messageApi } = useHandleMessage();
  const router = useRouter();

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handleGoogleLogin = () => {
    if (window.google) {
      window.google.accounts.id.initialize({
        client_id: envConfig?.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
        callback: handleGoogleResponse,
        ux_mode: "popup",
      });

      window.google.accounts.id.prompt((notification: any) => {
        if (notification.isNotDisplayed() || notification.isSkippedMoment()) {
          // The Google Sign-In popup was closed or skipped
          console.log("Google Sign-In was closed or skipped");
        }
      });
    }
  };

  const handleGoogleResponse = async (response: any) => {
    const { credential } = response;

    try {
      const res = await authApiRequest.authenticateWithGoogle(credential);
      const accessToken = res.payload.data.accessToken;
      const refreshToken = res.payload.data.refreshToken;
      await authApiRequest.setToken(accessToken, refreshToken);
      sessionStore.setTokens(accessToken, refreshToken);
      messageApi.success("Đăng nhập thành công");
      router.push(routePath.customer.home);
    } catch (_error) {
      console.error(_error);
      messageApi.error("Đăng nhập thất bại");
    }
  };

  return (
    <Button
      className="w-16 h-16 rounded-3xl bg-red-100 text-red-600 hover:bg-red-200"
      type="button"
      onClick={handleGoogleLogin}
    >
      <FaGoogle />
    </Button>
  );
}
