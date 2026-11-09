/**
 * Site-wide configuration for Jay Media Management Pvt. Ltd.
 * All verified company information and design tokens.
 */

export const siteConfig = {
  name: 'Jay Media Management Pvt. Ltd.',
  shortName: 'Jay Media',
  description:
    'Premier event management and media production company based in Biratnagar, Nepal. Creating extraordinary experiences through creativity, innovation, and production excellence.',
  url: 'https://www.jaymediamanagement.com',
  ogImage: '/images/branding/og-image.svg',
  location: {
    address: 'Near Traffic Chowk, Main Road',
    city: 'Biratnagar',
    province: 'Koshi Province',
    country: 'Nepal',
  },
  // Placeholder contact — replace with verified details
  contact: {
    email: 'info@jaymediamanagement.com', // PLACEHOLDER
    phone: '+977-XXXXXXXXXX', // PLACEHOLDER — replace with verified number
  },
  social: {
    facebook: 'https://www.facebook.com/jaymediamanagement', // PLACEHOLDER
    youtube: 'https://www.youtube.com/@jaymediamanagement', // PLACEHOLDER
    instagram: '', // PLACEHOLDER
    tiktok: '', // PLACEHOLDER
  },
  keywords: [
    'Jay Media Management',
    'event management company in Biratnagar',
    'event management in Nepal',
    'media production company in Nepal',
    'event production company in Nepal',
    'Miss Koshi',
    'Mr and Miss Little Koshi',
    'Koshi Province events',
  ],
} as const;

export type SiteConfig = typeof siteConfig;

