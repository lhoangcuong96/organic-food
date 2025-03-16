import AppProvider from "@/provider/app-provider";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import type { Metadata } from "next";
import { Quicksand } from "next/font/google";

import { accountApiRequest } from "@/api-request/account";
import { cartRequestApis } from "@/api-request/cart";
import { TooltipProvider } from "@/components/ui/tooltip";
import ReactQueryProvider from "@/provider/react-query-provider";
import { AccountType } from "@/validation-schema/account";
import { CartType } from "@/validation-schema/cart";
import { cookies, headers } from "next/headers";
import "swiper/css";
import "./globals.css";
import FacebookMessengerChat from "@/components/ui/facebook-message-chat";
import { redirect } from "next/navigation";
import { routePath } from "@/constants/routes";

const quicksand = Quicksand({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  // display swap để font không load được sẽ load 1 phông dự phòng
  display: "swap",
  adjustFontFallback: false,
});

export const metadata: Metadata = {
  title: {
    template: "%s | Heo sạch nhà Thoa", // luôn luôn thêm suffix " | Dolar Organic" vào title
    default: "Heo sạch nhà Thoa", // Mặc định nếu trang không có title
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  let cart: CartType | undefined;
  let account: AccountType | undefined;

  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;
  const headersList = await headers();
  const pathname = headersList.get("pathname") || "/";
  try {
    if (accessToken) {
      const getMeResponse = await accountApiRequest.getMe();
      account = getMeResponse.payload?.data;
      if (account) {
        const getUserCartResp = await cartRequestApis.getCart();
        cart = getUserCartResp.payload?.data;
      }
    }
  } catch (error) {
    console.error("Something went wrong", error);
    console.error("pathname", pathname);
    // if (pathname !== routePath.signOut) redirect(routePath.signOut);
  }

  return (
    <html lang="vi">
      <head>
        <link rel="icon" href="/favicon.webp" />
      </head>
      <body
        className={`${quicksand.className} antialiased bg-white text-gray-700`}
      >
        <AppProvider initialAccount={account} initialCart={cart}>
          <ReactQueryProvider>
            <TooltipProvider>
              <AntdRegistry>{children}</AntdRegistry>
            </TooltipProvider>
          </ReactQueryProvider>
        </AppProvider>
        <FacebookMessengerChat />
      </body>
    </html>
  );
}
