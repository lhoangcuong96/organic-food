import { http } from "@/lib/http";
import {
  SignInRequestDataType,
  SignInResponseType,
  SignUpRequestDataType,
  SignUpResponseDataType,
} from "@/validation-schema/auth";
import { MessageResponseType } from "@/validation-schema/common";

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
  logoutFromClientToNextServer: ({ forceLogout }: { forceLogout?: boolean }) =>
    http.post<MessageResponseType>(
      "/api/auth/sign-out",
      { forceLogout },
      {
        baseUrl: "",
      }
    ),
  logoutFromNextServerToApiServer: (sessionToken: string) =>
    http.post<MessageResponseType>(
      "/auth/logout",
      {},
      {
        headers: {
          Authorization: `Bearer ${sessionToken}`,
        },
      }
    ),
};
