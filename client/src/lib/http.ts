import { routePath } from "@/constants/routes";
import envConfig from "@/envConfig";

export type HTTPPayload = {
  message: string;
  [key: string]: any;
};
export class HttpError extends Error {
  status: number;
  payload: HTTPPayload;
  constructor({ status, payload }: { status: number; payload: HTTPPayload }) {
    super("Http Error");
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

type CustomOption = RequestInit & {
  baseUrl?: string;
};

export const request = async <T>(
  method: "GET" | "POST" | "PUT" | "DELETE",
  url: string,
  option?: CustomOption | undefined
) => {
  const body = option?.body ? JSON.stringify(option.body) : undefined;
  const baseHeader = {
    "Content-Type": "application/json",
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
      /*
        Nếu là lỗi không có quyền truy cập thì logout(trên client)
        Vì là session đã hết hạn(xoá trên server nodejs) => chỉ gọi lên trên nextjs server để xoá cookie thôi
      */
      if (typeof window !== "undefined") {
        await fetch("/api/auth/logout", {
          method: "POST",
          body: JSON.stringify({
            forceLogout: true,
          }),
          headers: {
            ...baseHeader,
          },
        });
        location.href = routePath.customer.signIn;
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
