import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // 本地 DNS 被污染，图片域名会解析到特殊网段，触发 Next.js 16 的 SSRF 防护；仅开发环境放行
    dangerouslyAllowLocalIP: process.env.NODE_ENV === "development",
    remotePatterns: [
      {
        protocol: "https",
        hostname: "coin-images.coingecko.com",
      },
    ],
  },
};

export default nextConfig;