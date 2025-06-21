/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    appDir: true, // keep this enabled for App Router
  },
  images: {
    domains: ['res.cloudinary.com'],
  },
};

export default nextConfig;