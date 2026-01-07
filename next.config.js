/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['figma.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.figma.com',
      },
    ],
  },
}

module.exports = nextConfig

