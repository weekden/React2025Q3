/** @type {import('next').NextConfig} */
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

const nextConfig = {
  reactStrictMode: true,
  output: 'standalone',
  distDir: './dist',
  images: {
    unoptimized: true,
  },
};

export default withNextIntl(nextConfig);
