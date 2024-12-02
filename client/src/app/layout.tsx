import type { Metadata } from "next";
import { Quicksand } from "next/font/google";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import "./globals.css";
import "swiper/css";
import AppProvider from "@/provider/app-provider";
import { cookies } from "next/headers";
import envConfig from "@/envConfig";

const quicksand = Quicksand({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});
export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken");
  const refreshToken = cookieStore.get("refreshToken");
  let user = null;
  if (accessToken?.value) {
    const response = await fetch(`${envConfig?.NEXT_PUBLIC_API_URL}/auth/me`);
    if (!response.ok) {
      const responseJson = await response.json();
      user = responseJson.data;
    }
  }
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.webp" />
      </head>
      <body
        className={`${quicksand.className} antialiased bg-white text-gray-700`}
      >
        <AppProvider
          initialAccessToken={accessToken?.value}
          initialRefreshToken={refreshToken?.value}
          user={user}
        >
          <AntdRegistry>{children}</AntdRegistry>
        </AppProvider>
      </body>
    </html>
  );
}
