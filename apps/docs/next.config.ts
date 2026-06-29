import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@cybercom/api", "@cybercom/config"],
  pageExtensions: ["ts", "tsx", "md", "mdx"],
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "api.cy-com.com" },
      { protocol: "https", hostname: "cdn.cy-com.com" },
    ],
    formats: ["image/avif", "image/webp"],
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "X-XSS-Protection", value: "1; mode=block" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
