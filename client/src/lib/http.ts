import { routePath } from "@/constants/routes";
import { TokenType } from "@/constants/types";
import envConfig from "@/envConfig";
import SessionStore from "@/helper/store/session-store";
import { Account } from "@prisma/client";
import { jwtDecode } from "jwt-decode";
import { redirect } from "next/navigation";

export type HTTPPayload = {
  message: string;
  [key: string]: any;
};
export class HttpError extends Error {
  status: number;
  payload: HTTPPayload;
  constructor({ status, payload }: { status: number; payload: HTTPPayload }) {
    super(payload.message || "http error");
    this.status = status;
    this.payload = payload;
  }
}

export type EntityErrorPayload = {
  message: string;
  errors: {
    field: string;
    message: string;
  }[];
};
// Lỗi validate dữ liệu
export class EntityError extends HttpError {
  status = 422;
  payload: EntityErrorPayload;
  constructor({ status, payload }: { status: number; payload: any }) {
    if (status !== 422) {
      throw new Error("EntityError must have status 422");
    }
    super({ status, payload });
    this.payload = payload;
    this.status = status;
  }
}

export class AuthError extends HttpError {
  constructor(message: string) {
    super({
      status: 401,
      payload: {
        message,
      },
    });
  }
}

export class ForbiddenError extends HttpError {
  constructor(message: string) {
    super({
      status: 403,
      payload: {
        message,
      },
    });
  }
}

type CustomOption = RequestInit & {
  baseUrl?: string;
  isPrivate?: boolean;
  isAdminRequest?: boolean;
};

export const request = async <T>(
  method: "GET" | "POST" | "PUT" | "DELETE",
  url: string,
  option?: CustomOption | undefined
) => {
  // Kiểm tra token còn hạn không nếu không thì sẽ refresh token
  // Chỉ trên server side
  // if (!window) {
  //   const isExpired = await isTokenExpired();
  //   if (isExpired) {
  //     handleLogout();
  //   }
  // }

  const isFormData = option?.body instanceof FormData;
  const body = option?.body
    ? isFormData
      ? option.body // nếu là form data thì không cần parse
      : JSON.stringify(option.body)
    : undefined;

  let accessToken = null;

  if (option?.isPrivate || option?.isAdminRequest) {
    if (typeof window === "undefined") {
      console.log("server side");
      const { cookies } = await import("next/headers");
      const cookieStore = await cookies();
      accessToken = cookieStore.get(TokenType.AccessToken)?.value;
    } else {
      accessToken = SessionStore.getAccessToken();
    }
    if (!accessToken) {
      throw new AuthError("Bạn cần đăng nhập để thực hiện hành động này");
    }
  }
  if (option?.isAdminRequest) {
    if (!accessToken) {
      throw new AuthError("Bạn cần đăng nhập để thực hiện hành động này");
    }
    const tokenPayload = jwtDecode<{ account: Partial<Account> }>(accessToken);
    const account = tokenPayload?.account;
    if (!account || account.role !== "ADMIN") {
      throw new ForbiddenError("Bạn không có quyền truy cập");
    }
  }

  const baseHeader = {
    ...(isFormData ? {} : { "Content-Type": "application/json" }),
    Authorization: accessToken ? `Bearer ${accessToken}` : "",
  };
  const baseUrl = option?.baseUrl ?? envConfig?.NEXT_PUBLIC_API_URL;

  const fullUrl = url.startsWith("/")
    ? `${baseUrl}${url}`
    : `${baseUrl}/${url}`;

  const res = await fetch(fullUrl, {
    ...option,
    headers: { ...baseHeader, ...option?.headers },
    body,
    method,
  });

  const payload: T = await res.json();
  const data = {
    status: res.status,
    payload,
  };
  if (!res.ok) {
    // nếu là lỗi validate dữ liệu thì ném ra
    if (res.status === 422) {
      throw new EntityError(data);
    } else if (res.status === 401) {
      console.log(401);
      /*
        Nếu là lỗi không có quyền truy cập thì logout(trên client)
        Vì là session đã hết hạn(xoá trên server nodejs) => chỉ gọi lên trên nextjs server để xoá cookie thôi
      */
      if (typeof window !== "undefined") {
        try {
          await fetch("/api/auth/sign-out", {
            method: "POST",
            body: JSON.stringify({
              forceLogout: true,
            }),
            headers: {
              "Content-Type": "application/json",
            },
          });
        } catch (error) {
          throw error;
        } finally {
          // SessionStore.clearTokens();
          // location.href = routePath.signIn;
        }
      } else {
        await redirect(routePath.signOut);
      }
    } else {
      throw new HttpError(
        data as {
          status: number;
          payload: HTTPPayload;
        }
      );
    }
  }
  return data;
};

export const http = {
  get: <T>(url: string, option?: Omit<CustomOption, "body">) =>
    request<T>("GET", url, option),
  post: <T>(url: string, body: any, option?: Omit<CustomOption, "body">) =>
    request<T>("POST", url, { body, ...option }),
  put: <T>(url: string, body: any, option?: Omit<CustomOption, "body">) =>
    request<T>("PUT", url, { body, ...option }),
  delete: <T>(url: string, body: any, option?: Omit<CustomOption, "body">) =>
    request<T>("DELETE", url, { body, ...option }),
};
