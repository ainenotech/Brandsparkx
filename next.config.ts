import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async redirects() {
    // These two solutions have dedicated pages; keep one URL per topic for SEO.
    return [
      { source: "/solutions/ai-voice-calling", destination: "/ai-voice-calling", permanent: true },
      { source: "/solutions/ai-engineers", destination: "/ai-engineers", permanent: true },
    ];
  },
};

export default nextConfig;
