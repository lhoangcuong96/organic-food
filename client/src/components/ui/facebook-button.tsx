"use client";

import { useHandleMessage } from "@/utils/hooks";
import { useGoogleLogin } from "@react-oauth/google";
import { FaFacebookF } from "react-icons/fa";
import { Button } from "./button";

const FacebookButton = () => {
  const { messageApi } = useHandleMessage();

  const login = useGoogleLogin({
    onSuccess: (codeResponse) => console.log(codeResponse),
    onError: () => {
      messageApi.error("Đăng nhập thất bại");
    },
    flow: "auth-code",
  });

  return (
    <Button
      className="w-16 h-16 rounded-3xl bg-slate-100 text-slate-600 hover:bg-slate-200"
      type="button"
      onClick={login}
    >
      <FaFacebookF className="!w-5 !h-5" />
    </Button>
  );
};

export default FacebookButton;
