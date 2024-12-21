import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['salt.tikicdn.com'], // Thêm domain của hình ảnh
  },
};

export default nextConfig;
