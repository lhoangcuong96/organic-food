import { Metadata } from "next";
import { OpenGraph } from "next/dist/lib/metadata/types/opengraph-types";

export const sharedMetadata: Metadata = {
  authors: [{ name: "Hoàng Mạnh Cường" }],
  publisher: "Hoàng Mạnh Cường",
  creator: "Hoàng Mạnh Cường",
  generator: "Next.js",
  applicationName: "Dolar Organic",
};

export const sharedOpenGraph: OpenGraph = {
  type: "website",
  locale: "vi_VN",
  siteName: "Dolar Organic",
};
