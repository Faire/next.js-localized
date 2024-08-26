/** @type {import('next').NextConfig} */
const nextConfig = {
  compress: false,
  webpack: (config, context) => {
    if (!context.isServer) {
      config.resolve.alias.fs = false;
    }
    return config;
  },
};

export default nextConfig;
