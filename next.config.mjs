/** @type {import('next').NextConfig} */
const nextConfig = {
  // We don't want to let Next.js compress its output, as we need to modify them in withLocalization.ts.
  // We then compress it ourselves afterwards in the express server.
  compress: false,
  webpack: (config, context) => {
    if (!context.isServer) {
      // This allows us to import "fs" in client compoennts without throwing an error, which is useful
      // For IntlProvider where we want to read the translations from the file system when doing SSR.
      config.resolve.alias.fs = false;
    }
    return config;
  },
};

export default nextConfig;
