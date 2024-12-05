"use client";

import { authApiRequest } from "@/api-request/auth";
import { ButtonProps } from "@/components/ui/button";
import { useHandleMessage } from "@/utils/hooks";
import { useRouter } from "next/navigation";
import DefaultButton from "./default-button";

export function ButtonLogout(
  props: ButtonProps & {
    className?: string;
  }
) {
  const { className, ...rest } = props;
  const { messageApi, handleError } = useHandleMessage();
  const router = useRouter();
  const handleLogOut = async () => {
    try {
      await authApiRequest.logoutFromClientToNextServer({ forceLogout: false });
      messageApi.success("Đăng xuất thành công");
    } catch (error) {
      handleError({ error });
    } finally {
      router.refresh();
    }
  };
  return (
    <DefaultButton {...rest} className={`${className}`} onClick={handleLogOut}>
      Đăng Xuất
    </DefaultButton>
  );
}
