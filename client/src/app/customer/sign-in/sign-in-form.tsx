"use client";

import DefaultButton from "@/components/customer/UI/button/default-button";
import FormInput from "@/components/customer/UI/input/form/input";
import { routePath } from "@/constants/routes";
import { Divider, Form, FormProps } from "antd";
import Link from "next/link";

type FieldType = {
  username?: string;
  password?: string;
  remember?: string;
};

const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
  console.log("Success:", values);
};

const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (errorInfo) => {
  console.log("Failed:", errorInfo);
};

export function SignInForm() {
  return (
    <Form
      name="basic"
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
      className="flex flex-col max-w-[500px] w-full"
    >
      <Form.Item<FieldType>
        name="username"
        rules={[{ required: true, message: "Please input your username!" }]}
      >
        <FormInput placeholder="Email" className="w-full" />
      </Form.Item>

      <Form.Item<FieldType>
        name="password"
        rules={[{ required: true, message: "Please input your password!" }]}
      >
        <FormInput.Password placeholder="Password" className="w-full" />
      </Form.Item>

      <Form.Item label={null} className="self-center w-fit">
        <DefaultButton htmlType="submit" className="uppercase">
          Đăng Nhập
        </DefaultButton>
      </Form.Item>
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
      <Divider></Divider>
      <p className="text-center">Hoặc đăng nhập bằng</p>
    </Form>
  );
}
