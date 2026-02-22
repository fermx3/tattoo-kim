import type { NextConfig } from 'next';
import createMDX from '@next/mdx';

const withMDX = createMDX({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
  },
});

const nextConfig: NextConfig = {
  // Allow .mdx as page extension
  pageExtensions: ['ts', 'tsx', 'md', 'mdx'],

  // Image optimization — allow only local images (no external domains in MVP)
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  // TypeScript errors fail the build (strict mode)
  typescript: {
    ignoreBuildErrors: false,
  },
};

export default withMDX(nextConfig);
