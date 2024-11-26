"use client";

import DefaultButton from "@/components/customer/UI/button/default-button";
import FormInput from "@/components/customer/UI/input/form/input";
import { routePath } from "@/constants/routes";
import { Divider, Form, FormProps } from "antd";
import Link from "next/link";

type FieldType = {
  fullname: string;
  phoneNumber: number;
  email: string;
  password: string;
  confirmPassword: string;
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
        name="fullname"
        rules={[{ required: true, message: "Xin vui lòng nhập họ và tên!" }]}
      >
        <FormInput placeholder="Họ và tên" className="w-full" />
      </Form.Item>
      <Form.Item<FieldType>
        name="phoneNumber"
        rules={[
          { required: true, message: "Xin vui lòng nhập số điện thoại!" },
        ]}
      >
        <FormInput
          placeholder="Số điện thoại"
          className="w-full"
          type="number"
        />
      </Form.Item>
      <Form.Item<FieldType>
        name="email"
        rules={[{ required: true, message: "Xin vui lòng nhập email!" }]}
      >
        <FormInput placeholder="Email" className="w-full" />
      </Form.Item>

      <Form.Item<FieldType>
        name="password"
        rules={[
          { required: true, message: "Xin vui lòng nhập mật khẩu!" },
          {
            min: 6,
            message: "Mật khẩu phải có ít nhất 6 kí tự!",
          },
        ]}
      >
        <FormInput.Password placeholder="Mật khẩu" className="w-full" />
      </Form.Item>
      <Form.Item<FieldType>
        name="confirmPassword"
        rules={[
          { required: true, message: "Xin vui lòng nhập lại mật khẩu!" },
          ({ getFieldValue }) => ({
            validator(rule, value) {
              if (!value || getFieldValue("password") === value) {
                return Promise.resolve();
              }
              return Promise.reject("Mật khẩu không trùng khớp!");
            },
          }),
        ]}
      >
        <FormInput.Password
          placeholder="Nhập lại mật khẩu"
          className="w-full"
        />
      </Form.Item>

      <Form.Item label={null} className="self-center w-fit">
        <DefaultButton htmlType="submit" className="uppercase">
          Đăng ký
        </DefaultButton>
      </Form.Item>
      <Link
        href={routePath.customer.signIn}
        className="text-green-600 underline hover:text-green-600 hover:underline block m-auto font-semibold"
      >
        Đăng nhập
      </Link>
      <Divider></Divider>
      <p className="text-center">Hoặc đăng kí bằng</p>
    </Form>
  );
}
