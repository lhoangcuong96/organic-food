import envConfig from "@/envConfig";

/* eslint-disable @typescript-eslint/no-explicit-any */
export class HttpError extends Error {
  status: number;
  payload: any;
  constructor({ status, payload }: { status: number; payload: any }) {
    super("Http Error");
    this.status = status;
    this.payload = payload;
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
    throw new HttpError(data);
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
