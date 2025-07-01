/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export', // For static site generation
  images: {
    unoptimized: true, // Disable next/image optimization for static build
    domains: ['postmanoil.com'],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
}

module.exports = nextConfig
