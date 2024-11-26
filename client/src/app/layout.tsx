import type { Metadata } from "next";
import { Quicksand } from "next/font/google";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import "./globals.css";
import "swiper/css";

const quicksand = Quicksand({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});
export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.webp" />
      </head>
      <body
        className={`${quicksand.className} antialiased bg-white text-gray-700`}
      >
        <AntdRegistry>{children}</AntdRegistry>
      </body>
    </html>
  );
}
