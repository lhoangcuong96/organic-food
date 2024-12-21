"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Divider } from "antd";
import Link from "next/link";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";

import { authApiRequest } from "@/api-request/auth";
import DefaultButton from "@/components/customer/UI/button/default-button";
import { FormError } from "@/components/customer/UI/input/form/form-error";
import FormInput from "@/components/customer/UI/input/form/input";
import { routePath } from "@/constants/routes";
import { useHandleMessage } from "@/utils/hooks";
import { SignInRequestDataType, signInSchema } from "@/validation-schema/auth";
import useMessage from "antd/es/message/useMessage";
import { useRouter } from "next/navigation";
import SessionStore from "@/helper/store/session-store";
import GoogleButton from "@/components/ui/google-button";
import FacebookButton from "@/components/ui/facebook-button";
import XButton from "@/components/ui/x-button";

export function SignInForm() {
  const [messageAPI, contextHolder] = useMessage();
  const { handleError } = useHandleMessage();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const { control, handleSubmit, setError } = useForm<SignInRequestDataType>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: SignInRequestDataType) => {
    setIsSubmitting(true);
    try {
      const response = await authApiRequest.login(data);
      const accessToken = response.payload.data.accessToken;
      const refreshToken = response.payload.data.refreshToken;

      // Send token to client server to set cookie
      await authApiRequest.setToken(accessToken, refreshToken);
      messageAPI.success("Đăng nhập thành công");
      SessionStore.setTokens(accessToken, refreshToken);
      router.push(routePath.customer.home);
      router.refresh();
    } catch (error) {
      console.error(error);
      handleError({
        error,
        setError,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col max-w-[500px] w-full"
    >
      {contextHolder}
      <div className="mb-4">
        <Controller
          control={control}
          name="email"
          render={({ field, fieldState: { error } }) => (
            <>
              <FormInput
                {...field}
                placeholder="Email"
                className="w-full"
                type="email"
                formNoValidate
                error={error?.message}
              />
              {error?.message && <FormError error={error.message} />}
            </>
          )}
        />
      </div>

      <div className="mb-4">
        <Controller
          control={control}
          name="password"
          render={({ field, fieldState: { error } }) => (
            <>
              <FormInput.Password
                {...field}
                placeholder="Mật khẩu"
                className="w-full"
                formNoValidate
                error={error?.message}
              />
              {error?.message && <FormError error={error.message} />}
            </>
          )}
        />
      </div>

      <div className="self-center w-fit mb-4">
        <DefaultButton
          type="submit"
          disabled={isSubmitting}
          className="uppercase"
        >
          {isSubmitting ? (
            <p className="loading-animation">Đang xử lý</p>
          ) : (
            "Đăng Nhập"
          )}
        </DefaultButton>
      </div>

      <Link
        href={routePath.signUp}
        className="text-green-600 underline hover:text-green-600 hover:underline block m-auto font-semibold"
      >
        Quên mật khẩu
      </Link>
      <Link
        href={routePath.signUp}
        className="text-green-600 underline hover:text-green-600 hover:underline block m-auto font-semibold"
      >
        Đăng kí
      </Link>
      <Divider />
      <p className="text-center">Hoặc đăng nhập bằng</p>
      <div className="w-full flex justify-center space-x-4 my-4">
        <GoogleButton></GoogleButton>
        <FacebookButton></FacebookButton>
        <XButton></XButton>
      </div>
    </form>
  );
}
