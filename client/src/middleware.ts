// Middleware phải nằm cùng cấp với /app và trong /src

import { cookies } from "next/headers";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const privatePaths = ["/customer/me"];
const publicPaths = ["/customer/sign-up", "/customer/sign-in"];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken");
  if (!accessToken && privatePaths.some((path) => pathname.startsWith(path))) {
    return NextResponse.redirect(new URL("/customer/sign-in", request.url));
  }

  if (
    accessToken &&
    accessToken.value &&
    publicPaths.some((path) => pathname.startsWith(path))
  ) {
    return NextResponse.redirect(new URL("/customer/home", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [...privatePaths, ...publicPaths],
};
