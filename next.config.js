/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['cdn.shopify.com', 'placehold.co'],
    formats: ['image/avif', 'image/webp'],
  },
};

module.exports = nextConfig;