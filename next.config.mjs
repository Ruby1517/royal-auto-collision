import { createRequire } from 'module';
const require = createRequire(import.meta.url);

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'encrypted-tbn0.gstatic.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'img.freepik.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'firebasestorage.googleapis.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
    ],
    
  },
  webpack: (config) => {
    // Workaround for environments where Next's internal flight loaders
    // are not auto-resolvable by name.
    try {
      config.resolve = config.resolve || {};
      config.resolve.alias = config.resolve.alias || {};
      config.resolve.alias['next-flight-client-entry-loader'] = require.resolve(
        'next/dist/build/webpack/loaders/next-flight-client-entry-loader'
      );
      config.resolve.alias['next-flight-action-entry-loader'] = require.resolve(
        'next/dist/build/webpack/loaders/next-flight-action-entry-loader'
      );
    } catch (e) {
      // no-op: keep build proceeding even if paths change across Next versions
    }
    return config;
  },
  
};
export default nextConfig;
