import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    // Don't fail build on ESLint errors
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Don't fail build on TypeScript errors (env vars not set yet)
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
