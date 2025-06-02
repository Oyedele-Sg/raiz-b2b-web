import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "raiz-dev-assets.s3.us-east-1.amazonaws.com",
      },
      {
        protocol: "https",
        hostname: "raiz-dev-assets.s3.amazonaws.com",
      },
      {
        protocol: "https",
        hostname: "www.google.com",
      },
      {
        protocol: "https",
        hostname: "images.app.goo.gl",
      },
    ],
  },
};

export default nextConfig;
