import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: 'export',
  basePath: "/brandb",
  assetPrefix: "/brandb/",
  images: {
    unoptimized: true
  }
};

export default nextConfig;
