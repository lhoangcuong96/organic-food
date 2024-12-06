// Middleware phải nằm cùng cấp với /app và trong /src

import { cookies } from "next/headers";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { isTokenExpired } from "./utils/auth";
import { authApiRequest } from "./api-request/auth";
import { routePath } from "./constants/routes";

const privatePaths = ["/customer/account/profile"];
const publicPaths = ["/customer/sign-up", "/customer/sign-in"];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken");
  const refreshToken = cookieStore.get("refreshToken");
  if (!accessToken && privatePaths.some((path) => pathname.startsWith(path))) {
    return NextResponse.redirect(new URL("/customer/sign-in", request.url));
  }

  if (
    accessToken &&
    accessToken.value &&
    publicPaths.some((path) => pathname.startsWith(path))
  ) {
    /*
      - Kiểm tra accessToken có hết hạn không
      - Nếu hết hạn thì refresh lại và update request header và tiếp tục
    */
    const isExpired = await isTokenExpired(accessToken.value);
    if (isExpired && refreshToken?.value) {
      const resp = await authApiRequest.refreshTokenFromNextServerToApiServer(
        accessToken.value,
        refreshToken.value
      );
      if (resp && resp.payload.data.accessToken) {
        // set lại request header với accessToken mới
        const response = NextResponse.next();
        response.cookies.set("accessToken", resp.payload.data.accessToken, {
          path: "/",
          httpOnly: true,
          sameSite: "strict",
        });
        response.cookies.set("refreshToken", resp.payload.data.refreshToken, {
          path: "/",
          httpOnly: true,
          sameSite: "strict",
        });
        return response;
      } else {
        return NextResponse.redirect(
          new URL(routePath.customer.signOut, request.url)
        );
      }
    }
    if (isExpired && !refreshToken?.value) {
      return NextResponse.redirect(
        new URL(routePath.customer.signOut, request.url)
      );
    }
    return NextResponse.redirect(new URL(routePath.customer.home, request.url));
  }

  return NextResponse.next();
}

export const config = {
  // bắt buộc phải rõ ra chứ không sử dụng spread operator được
  // matcher: [...privatePaths, ...publicPaths],
  matcher: ["/customer/sign-up", "/customer/sign-in", "/customer/me"],
};
