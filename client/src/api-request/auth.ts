import { http } from "@/lib/http";
import {
  SignInRequestDataType,
  SignInResponseType,
  SignUpRequestDataType,
  SignUpResponseDataType,
} from "@/validation-schema/auth";

export const authApiRequest = {
  login: (data: SignInRequestDataType) =>
    http.post<SignInResponseType>("/auth/login", data),
  register: (data: SignUpRequestDataType) =>
    http.post<SignUpResponseDataType>("/auth/register", data),
  // lấy token từ server nodejs gửi lên server nextjs để set cookie
  setToken: (token: string) =>
    http.post(
      "/api/auth",
      {
        token,
      },
      {
        baseUrl: "",
      }
    ),
};
