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
  trailingSlash: true, // Use trailing slashes for all routes
  generateBuildId: async () => {
    // Use a fixed build ID to prevent hydration mismatches
    return 'postman-oils-build'
  },
  exportPathMap: async function () {
    return {
      '/': { page: '/' },
      '/about-us': { page: '/about-us' },
      '/contact-us': { page: '/contact-us' },
      '/certifications': { page: '/certifications' },
      '/connect-for-dealership': { page: '/connect-for-dealership' },
      '/groundnut-oil': { page: '/groundnut-oil' },
      '/mustard-oil': { page: '/mustard-oil' },
      '/refined-groundnut-oil': { page: '/refined-groundnut-oil' },
      '/postman-recipes': { page: '/postman-recipes' },
      '/postman-supplements': { page: '/postman-supplements' },
      '/privacy-policy': { page: '/privacy-policy' },
      '/terms-and-conditions': { page: '/terms-and-conditions' },
      '/how-postman-oil-is-made': { page: '/how-postman-oil-is-made' },
    }
  },
}

module.exports = nextConfig
