import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  experimental: {
    scrollRestoration: true,
  },
  images: {
    // We serve controlled local SVG wrappers for stepper phones.
    // Security: force attachment + CSP to prevent SVG script execution (XSS).
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
};

export default nextConfig;
