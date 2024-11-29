import type { NextConfig } from "next";
import bundleAnalyzer from "@next/bundle-analyzer";

// Analyze khi build
const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE == "true",
});

const nextConfig: NextConfig = {
  /* config options here */
};

export default withBundleAnalyzer(nextConfig);
