/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: "https",
          hostname: "ellis.0.capacedev.se",
        },
      ],
    },
    async redirects() {
      return [
        {
          source: '/projects',
          destination: '/#projects',
          permanent: false,
        },
        {
          source: '/posts',
          destination: '/#projects',
          permanent: false,
        },
      ];
    },
    async rewrites() {
      return [
        {
          source: '/home',
          destination: '/',
        },
      ];
    },
    // ...other Next.js config options
  }
  
  module.exports = nextConfig;
  