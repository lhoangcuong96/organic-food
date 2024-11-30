"use client";

import { authApiRequest } from "@/api-request/auth";
import { useHandleMessage } from "@/utils/hooks";
import { ButtonProps } from "antd";
import DefaultButton from "./default-button";

export function ButtonLogout(
  props: ButtonProps & {
    className?: string;
  }
) {
  const { className, ...rest } = props;
  const { messageApi, handleError } = useHandleMessage();
  const handleLogOut = async () => {
    try {
      await authApiRequest.logoutFromClientToNextServer();
      messageApi.success("Đăng xuất thành công");
    } catch (error) {
      handleError({ error });
    }
  };
  return (
    <DefaultButton {...rest} className={`${className}`} onClick={handleLogOut}>
      Đăng Xuất
    </DefaultButton>
  );
}
