import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack: (config) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      pg: false,
      "pg-hstore": false,
    };
    return config;
  },
};

export default nextConfig;
