/**
 * Site-wide configuration for Jay Media Management Pvt. Ltd.
 * Grounded in verified company details from https://www.jaymediamanagement.com/
 */

export const siteConfig = {
  name: 'Jay Media Management Pvt. Ltd.',
  shortName: 'Jay Media',
  tagline: 'We Make Your Dreams Come True',
  established: 2013,
  registered: 2014,
  description:
    'Premier event execution, movie production, award shows, and broadcast media house established in 2013 in Biratnagar, Nepal. Organizers of Nepal Kids Idol, Miss Koshi, and Mr. & Miss Little Koshi.',
  url: 'https://www.jaymediamanagement.com',
  logo: '/images/official/main-logo.png',
  ogImage: '/images/official/hero-banner.png',
  location: {
    address: 'Central Mall, 1st Floor',
    landmark: 'Near Traffic Chowk, Main Road',
    city: 'Biratnagar',
    province: 'Koshi Province',
    country: 'Nepal',
    coordinates: '26.4623° N / 87.2790° E',
    mapEmbedUrl:
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3571.795282154006!2d87.27903197617337!3d26.46232707691856!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39ef75db2bf28e51%3A0x84fff00de6262dfe!2sJay%20Media%20Management%20Pvt%20Ltd!5e0!3m2!1sen!2snp!4v1737797341641!5m2!1sen!2snp',
  },
  contact: {
    email: 'nepalkidsidol@gmail.com',
    secondaryEmail: 'jaymediamanagement@gmail.com',
    phone: '9851143338',
    secondaryPhone: '9802708000',
    formattedPhone: '+977 985 1143338',
  },
  social: {
    facebook: 'https://www.facebook.com/nepalkidsidol',
    youtube: 'https://www.youtube.com/@JayMediaManagementPvtLtd',
    instagram: '',
    linkedin: '',
  },
  keywords: [
    'Jay Media Management',
    'Nepal Kids Idol',
    'Miss Koshi',
    'Mr and Miss Little Koshi',
    'event management company in Biratnagar',
    'Central Mall Biratnagar',
    'event management in Nepal',
    'media production company in Nepal',
    'Jay Raj Roy',
    'Koshi Province events',
  ],
} as const;

export type SiteConfig = typeof siteConfig;
