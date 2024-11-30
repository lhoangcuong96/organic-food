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
import { useAppContext } from "@/provider/app-provider";
import { useErrorHandler } from "@/utils/hooks";
import { SignInRequestDataType, signInSchema } from "@/validation-schema/auth";
import useMessage from "antd/es/message/useMessage";
import { useRouter } from "next/navigation";
import { HttpError } from "@/lib/http";

export function SignInForm() {
  const [messageAPI, contextHolder] = useMessage();
  const { handleError } = useErrorHandler();
  const { setSessionToken } = useAppContext();
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
      const token = response.payload.data.token;

      // Send token to client server to set cookie
      await authApiRequest.setToken(token);

      messageAPI.success("Đăng nhập thành công");
      setSessionToken(token);
      router.push(routePath.customer.home);
    } catch (error) {
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
          htmlType="submit"
          disabled={isSubmitting}
          className="uppercase"
        >
          {isSubmitting ? "Đang xử lý..." : "Đăng Nhập"}
        </DefaultButton>
      </div>

      <Link
        href={routePath.customer.signUp}
        className="text-green-600 underline hover:text-green-600 hover:underline block m-auto font-semibold"
      >
        Quên mật khẩu
      </Link>
      <Link
        href={routePath.customer.signUp}
        className="text-green-600 underline hover:text-green-600 hover:underline block m-auto font-semibold"
      >
        Đăng kí
      </Link>
      <Divider />
      <p className="text-center">Hoặc đăng nhập bằng</p>
    </form>
  );
}
