import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: [
    "ayodoya.local",
    "myshop.local",
    "demo.local",
    "*.local",
    "localhost",
    "127.0.0.1",
  ],
};

export default nextConfig;