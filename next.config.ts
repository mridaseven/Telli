import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: "/phonem", destination: "/", permanent: true },
      { source: "/phonem/select", destination: "/select", permanent: true },
      { source: "/telli", destination: "/", permanent: true },
      { source: "/telli/select", destination: "/select", permanent: true },
    ];
  },
};

export default nextConfig;
