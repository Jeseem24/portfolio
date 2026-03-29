import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
  allowedDevOrigins: [
    'preview-chat-1b92bafb-7ec2-4b0c-b6d0-793cd0045434.space.z.ai',
    '.space.z.ai',
    'localhost',
  ],
};

export default nextConfig;
