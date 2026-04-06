import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: 'export',
 basePath: "/public-portal",
 assetPrefix: "/public-portal/",
  images: {
    unoptimized: true
  }
};

export default nextConfig;
