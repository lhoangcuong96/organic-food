// Middleware phải nằm cùng cấp với /app và trong /src

import { cookies } from "next/headers";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { isTokenExpired } from "./utils/auth";
import { authApiRequest } from "./api-request/auth";
import { routePath } from "./constants/routes";
import { RoleType } from "@prisma/client";

// const privatePaths = [Object.values(routePath.customer.account)].flat();
const privateRoutes = ["account", "admin", "cart", "checkout"];
const authRoutes = ["sign-in", "sign-up"];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken");
  const refreshToken = cookieStore.get("refreshToken");
  const role = cookieStore.get("role");

  if (accessToken) {
    const previousUrl = request.headers.get("referer") || "/"; // Get the previous page or fallback to "/"
    if (authRoutes.some((route) => pathname.includes(route))) {
      return NextResponse.redirect(new URL(previousUrl));
    }
    if (
      pathname.includes("admin") &&
      (!role || RoleType.ADMIN !== role.value)
    ) {
      return NextResponse.redirect(
        new URL(routePath.customer.home, request.url)
      );
    }

    /*
      - Kiểm tra accessToken có hết hạn không
      - Nếu hết hạn thì refresh lại và update request header và tiếp tục
  */
    const isExpired = isTokenExpired(accessToken.value);
    if (isExpired && refreshToken?.value) {
      const resp = await authApiRequest.refreshTokenFromNextServerToApiServer(
        accessToken.value,
        refreshToken.value
      );
      if (resp && resp.payload?.data.accessToken) {
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
        return NextResponse.redirect(new URL(routePath.signOut, request.url));
      }
    }
    if (isExpired && !refreshToken?.value) {
      return NextResponse.redirect(new URL(routePath.signOut, request.url));
    }
  } else {
    if (privateRoutes.some((path) => pathname.includes(path))) {
      return NextResponse.redirect(new URL(routePath.signIn, request.url));
    }
  }
  return NextResponse.next();
}

export const config = {
  // bắt buộc phải rõ ra chứ không sử dụng spread operator được
  // matcher: [...privatePaths, ...publicPaths],
  matcher: ["/account", "/admin", "/cart", "/checkout"],
};
