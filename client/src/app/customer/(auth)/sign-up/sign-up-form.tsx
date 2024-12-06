"use client";

import { authApiRequest } from "@/api-request/auth";
import DefaultButton from "@/components/customer/UI/button/default-button";
import { FormError } from "@/components/customer/UI/input/form/form-error";
import FormInput from "@/components/customer/UI/input/form/input";
import { routePath } from "@/constants/routes";
import sessionStore from "@/helper/session";
import { useHandleMessage } from "@/utils/hooks";
import { SignUpRequestDataType, signUpSchema } from "@/validation-schema/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { Divider, Form } from "antd";
import useMessage from "antd/es/message/useMessage";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";

export function SignUpForm() {
  const [messageAPI, contextHolder] = useMessage();
  const { handleError } = useHandleMessage();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const { control, handleSubmit, setError } = useForm<SignUpRequestDataType>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      fullname: "",
      phoneNumber: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: SignUpRequestDataType) => {
    setIsSubmitting(true);
    try {
      const response = await authApiRequest.register(data);
      const accessToken = response.payload.data.accessToken;
      const refreshToken = response.payload.data.refreshToken;
      // Send token to client server to set cookie
      await authApiRequest.setToken(accessToken, refreshToken);

      messageAPI.success("Đăng kí thành công");
      sessionStore.setTokens(accessToken, refreshToken);
      router.push(routePath.customer.home);
    } catch (error) {
      console.error(error);
      handleError({ error, setError });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form
      onFinish={handleSubmit(onSubmit)}
      className="flex flex-col max-w-[500px] w-full"
    >
      {contextHolder}
      <div className="mb-4">
        <Controller
          control={control}
          name="fullname"
          render={({ field, fieldState: { error } }) => (
            <>
              <FormInput
                {...field}
                placeholder="Họ và tên"
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
          name="phoneNumber"
          render={({ field, fieldState: { error } }) => (
            <>
              <FormInput
                {...field}
                placeholder="Số điện thoại"
                className="w-full"
                type="tel"
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

      <div className="mb-4">
        <Controller
          control={control}
          name="confirmPassword"
          render={({ field, fieldState: { error } }) => (
            <>
              <FormInput.Password
                {...field}
                placeholder="Nhập lại mật khẩu"
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
        href={routePath.customer.signIn}
        className="text-green-600 underline hover:text-green-600 hover:underline block m-auto font-semibold"
      >
        Đăng nhập
      </Link>
      <Divider />
      <p className="text-center">Hoặc đăng kí bằng</p>
    </Form>
  );
}
