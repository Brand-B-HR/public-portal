import type { NextConfig } from "next";

const basePath = process.env.VERCEL ? "" : "/public-portal";
const assetPrefix = basePath ? `${basePath}/` : "";

const nextConfig: NextConfig = {
  output: "export",
  // Emits every route as a directory with an index.html, so "/apply/" resolves on any static
  // host rather than relying on the host preferring "apply.html" for an extensionless path. These
  // URLs end up on posters and in newspaper advertisements, where being wrong is permanent.
  trailingSlash: true,
  basePath,
  assetPrefix,
  images: {
    unoptimized: true,
  },
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
};

export default nextConfig;
