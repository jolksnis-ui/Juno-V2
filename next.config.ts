import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  experimental: {
    scrollRestoration: true,
  },
  images: {
    // We serve controlled local SVG wrappers for stepper phones
    dangerouslyAllowSVG: true,
  },
};

export default nextConfig;
