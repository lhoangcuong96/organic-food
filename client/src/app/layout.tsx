import AppProvider from "@/provider/app-provider";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import type { Metadata } from "next";
import { Quicksand } from "next/font/google";
import { cookies } from "next/headers";

import "swiper/css";
import "./globals.css";
import { jwtDecode } from "jwt-decode";
import { Account } from "@prisma/client";
import { TooltipProvider } from "@/components/ui/tooltip";

const quicksand = Quicksand({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  // display swap để font không load được sẽ load 1 phông dự phòng
  display: "swap",
  adjustFontFallback: false,
});

export const metadata: Metadata = {
  title: {
    template: "%s | Dolar Organic", // luôn luôn thêm suffix " | Dolar Organic" vào title
    default: "Dolar Organic", // Mặc định nếu trang không có title
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;
  let account;
  if (accessToken) {
    const tokenPayload = jwtDecode<{ account: Partial<Account> }>(accessToken);
    account = tokenPayload?.account;
  }
  return (
    <html lang="vi">
      <head>
        <link rel="icon" href="/favicon.webp" />
      </head>
      <body
        className={`${quicksand.className} antialiased bg-white text-gray-700`}
      >
        <AppProvider initialAccount={account}>
          <TooltipProvider>
            <AntdRegistry>{children}</AntdRegistry>
          </TooltipProvider>
        </AppProvider>
      </body>
    </html>
  );
}
