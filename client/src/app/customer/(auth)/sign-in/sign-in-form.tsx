"use client";

import DefaultButton from "@/components/customer/UI/button/default-button";
import FormInput from "@/components/customer/UI/input/form/input";
import { routePath } from "@/constants/routes";
import envConfig from "@/envConfig";
import { useAppContext } from "@/provider/app-provider";
import { Divider, Form, FormProps } from "antd";
import useMessage from "antd/es/message/useMessage";
import Link from "next/link";

type FieldType = {
  email?: string;
  password?: string;
  remember?: string;
};

export function SignInForm() {
  const [messageAPI, contextHolder] = useMessage();
  const { setSessionToken } = useAppContext();
  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    delete values.remember;
    try {
      const response = await fetch(
        `${envConfig?.NEXT_PUBLIC_API_URL}/auth/login`,
        {
          body: JSON.stringify(values),
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const responseData = await response.json();
      if (!response.ok) {
        throw new Error(responseData.message);
      }
      const token = responseData.data.token;

      // gửi token lên để client server set cookie về => mỗi lần request thì client server có thể lấy dc token
      const resultFromNextServer = await fetch("/api/auth", {
        method: "POST",
        body: JSON.stringify({ token: token }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const resultFromNextServerData = await resultFromNextServer.json();
      if (!resultFromNextServer.ok) {
        throw new Error(resultFromNextServerData.message);
      }

      messageAPI.success("Đăng nhập thành công");
      setSessionToken(token);
    } catch (error) {
      messageAPI.error((error as Error).message);
    }
  };

  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Form
      name="basic"
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
      className="flex flex-col max-w-[500px] w-full"
    >
      {contextHolder}
      <Form.Item<FieldType>
        name="email"
        rules={[{ required: true, message: "Xin vui lòng nhập email!" }]}
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
