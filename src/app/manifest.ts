import type { MetadataRoute } from 'next';
import { siteConfig } from '@/config/site';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteConfig.name,
    short_name: siteConfig.shortName,
    description: siteConfig.description,
    start_url: '/',
    display: 'standalone',
    background_color: '#FAFAF8',
    theme_color: '#01402B',
    icons: [
      {
        src: '/icon.svg',
        sizes: 'any',
        type: 'image/svg+xml',
      },
      {
        src: '/images/official/main-logo.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/images/official/main-logo.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  };
}
