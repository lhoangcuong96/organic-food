/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import DefaultButton from "@/components/customer/UI/button/default-button";
import FormInput from "@/components/customer/UI/input/form/input";
import { routePath } from "@/constants/routes";
import envConfig from "@/envConfig";
import { SignUpFormData, signUpSchema } from "@/validation-schema/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { Divider, Form, message } from "antd";
import Link from "next/link";
import { useForm } from "react-hook-form";

export function SignUpForm() {
  const [messageApi, contextHolder] = message.useMessage();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      fullname: "",
      phoneNumber: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (values: SignUpFormData) => {
    try {
      const result = await fetch(
        `${envConfig?.NEXT_PUBLIC_API_URL}/auth/register`,
        {
          body: JSON.stringify(values),
          headers: {
            "Content-Type": "application/json",
          },
          method: "POST",
        }
      );
      if (!result.ok) {
        const errorData = await result.json();
        throw new Error(
          errorData.errors?.map((error: any) => error.message).join(",") ||
            errorData.message
        );
      }
      messageApi.success("Đăng kí thành công.");
    } catch (errors) {
      (errors as Error).message.split(",").forEach((error) => {
        messageApi.error(error);
      });
    }
  };

  console.log(errors);

  return (
    <Form
      onFinish={handleSubmit(onSubmit)}
      className="flex flex-col max-w-[500px] w-full"
    >
      {contextHolder}
      <div className="mb-4">
        <FormInput
          {...register("fullname")}
          placeholder="Họ và tên"
          className="w-full"
        />
        {errors.fullname && (
          <p className="text-red-500">{errors.fullname.message}</p>
        )}
      </div>

      <div className="mb-4">
        <FormInput
          {...register("phoneNumber")}
          placeholder="Số điện thoại"
          className="w-full"
          type="tel"
        />
        {errors.phoneNumber && (
          <p className="text-red-500">{errors.phoneNumber.message}</p>
        )}
      </div>

      <div className="mb-4">
        <FormInput
          {...register("email")}
          placeholder="Email"
          className="w-full"
          type="email"
        />
        {errors.email && (
          <p className="text-red-500 text-sm">{errors.email.message}</p>
        )}
      </div>

      <div className="mb-4">
        <FormInput.Password
          {...register("password")}
          placeholder="Mật khẩu"
          className="w-full"
        />
        {errors.password && (
          <p className="text-red-500">{errors.password.message}</p>
        )}
      </div>

      <div className="mb-4">
        <FormInput.Password
          {...register("confirmPassword")}
          placeholder="Nhập lại mật khẩu"
          className="w-full"
        />
        {errors.confirmPassword && (
          <p className="text-red-500">{errors.confirmPassword.message}</p>
        )}
      </div>

      <div className="self-center w-fit mb-4">
        <DefaultButton htmlType="submit" className="uppercase">
          Đăng ký
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
