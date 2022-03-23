/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

module.exports = nextConfig;

module.exports = {
  images: {
    domains: ["images.unsplash.com"],
  },
  webpack: (config) => {
    config.experiments = { topLevelAwait: true };
    return config;
  },
};
