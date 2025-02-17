import { initOpenNextCloudflareForDev } from '@opennextjs/cloudflare';
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;

if (process.env.NODE_ENV === 'development') {
  // added by create cloudflare to enable calling `getCloudflareContext()` in `next dev`
  initOpenNextCloudflareForDev();
}
