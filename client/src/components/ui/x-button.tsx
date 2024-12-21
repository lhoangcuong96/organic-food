"use client";

import { useGoogleLogin } from "@react-oauth/google";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "./button";
import { FaGoogle } from "react-icons/fa";
import { useHandleMessage } from "@/utils/hooks";
import { FaXTwitter } from "react-icons/fa6";

const XButton = () => {
  const router = useRouter();
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
      className="w-16 h-16 rounded-3xl bg-stone-100 text-stone-600 hover:bg-stone-200"
      type="button"
      onClick={login}
    >
      <FaXTwitter className="!w-5 !h-5" />
    </Button>
  );
};

export default XButton;
