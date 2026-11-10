export type GalleryCategory =
  | 'Eastern Echoes'
  | 'Miss Koshi 2024'
  | 'Nepal Kids Idol'
  | 'Mr. & Miss Little Koshi'
  | 'Stagecraft'
  | 'Corporate Galas';

export interface GalleryPhoto {
  id: string;
  title: string;
  badge?: string;
  category: GalleryCategory;
  aspect: string;
  image: string;
  caption: string;
  featured?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface GallerySectionMeta {
  category: GalleryCategory;
  eyebrow: string;
  title: string;
  description: string;
  href?: string;
  linkLabel?: string;
  ticketUrl?: string;
}

export const GALLERY_CATEGORIES: readonly GalleryCategory[] = [
  'Eastern Echoes',
  'Miss Koshi 2024',
  'Nepal Kids Idol',
  'Mr. & Miss Little Koshi',
  'Stagecraft',
  'Corporate Galas',
] as const;

export const GALLERY_SECTIONS: GallerySectionMeta[] = [
  {
    category: 'Eastern Echoes',
    eyebrow: 'International Stadium Concert • 19 Dec 2026',
    title: 'Eastern Echoes — Atif Aslam Live',
    description:
      'Official concert poster, stage showcase, and Itahari Stadium (Rangasala) venue frames for Eastern Echoes on December 19, 2026 organized by Jay Media Management.',
    href: '/events/atif-aslam-live-in-nepal',
    linkLabel: 'Concert Details',
    ticketUrl: 'https://events.khalti.com/events/ET26BJD3F93W',
  },
  {
    category: 'Miss Koshi 2024',
    eyebrow: 'Annual Flagship Pageant • Season #8',
    title: 'Miss Koshi 2024 — Grand Finale & Titleholders',
    description:
      'Official coronation cover and individual winner and runner-up portraits from the Miss Koshi 2024 Season #8 Grand Finale in Biratnagar.',
    href: '/events/miss-koshi',
    linkLabel: 'View Miss Koshi',
  },
  {
    category: 'Nepal Kids Idol',
    eyebrow: 'National Television Reality Show • Season One',
    title: 'Nepal Kids Idol — Nationwide Auditions',
    description:
      'Official nationwide audition campaign spanning all 77 districts of Nepal and international diaspora hubs.',
    href: '/events/nepal-kids-idol',
    linkLabel: 'View Nepal Kids Idol',
  },
  {
    category: 'Mr. & Miss Little Koshi',
    eyebrow: "Children's Talent & Confidence Platform • 7+ Seasons",
    title: 'Mr. & Miss Little Koshi',
    description:
      'Stage showcases and talent rounds celebrating young participants across Biratnagar, Itahari, and Dharan.',
    href: '/events/mr-and-miss-little-koshi',
    linkLabel: 'View Little Koshi',
  },
  {
    category: 'Stagecraft',
    eyebrow: 'Technical Production & Acoustics',
    title: 'Concert Rigging & Stagecraft',
    description:
      'Intelligent DMX beam choreography, line-array sound engineering, and modular stage trussing across Koshi Province.',
    href: '/contact',
    linkLabel: 'Inquire Stagecraft',
  },
  {
    category: 'Corporate Galas',
    eyebrow: 'Brand Launches & Executive Events',
    title: 'Corporate Galas & Commercial Unveils',
    description:
      'Turnkey commercial reveals, VIP hospitality protocols, and live broadcast execution.',
    href: '/contact',
    linkLabel: 'Inquire for Events',
  },
];

export const GALLERY_PHOTOS: GalleryPhoto[] = [
  {
    id: 'atif-aslam-poster',
    title: 'Eastern Echoes — Atif Aslam Live Concert Poster',
    badge: 'Official Concert Poster',
    category: 'Eastern Echoes',
    aspect: 'aspect-[4/4.5]',
    image: '/images/official/atif-aslam-poster.jpg',
    caption:
      'Jay Media Management presents Eastern Echoes featuring Atif Aslam live at Itahari Stadium (Itahari Rangasala) on December 19, 2026. Official digital ticketing via Khalti by IME.',
    featured: true,
  },
  {
    id: 'atif-aslam-banner',
    title: 'Eastern Echoes — Official Concert Showcase',
    badge: 'Headline Showcase',
    category: 'Eastern Echoes',
    aspect: 'aspect-[4/4.5]',
    image: '/images/official/atif-aslam-stage.jpg',
    caption:
      'Official showcase artwork for Eastern Echoes featuring Atif Aslam on Saturday, December 19, 2026 at Itahari Stadium.',
    featured: true,
  },
  {
    id: 'atif-aslam-venue',
    title: 'Itahari Stadium (Itahari Rangasala) — Concert Arena',
    badge: 'Host Stadium Venue',
    category: 'Eastern Echoes',
    aspect: 'aspect-[4/4.5]',
    image: '/images/official/itahari-stadium.jpg',
    caption:
      'Itahari Stadium in Sunsari, Koshi Province — host arena for Eastern Echoes on December 19, 2026 (6:00 PM onwards).',
    featured: true,
  },
  {
    id: 'koshi-2024-all',
    title: 'Miss Koshi 2024 Season #8 — Grand Titleholders Roster',
    badge: 'Season #8 Laureates',
    category: 'Miss Koshi 2024',
    aspect: 'aspect-[4/4.5]',
    image: '/images/official/koshi-2024-cover.png',
    caption:
      'Complete winners and runners-up roster of Miss Koshi 2024 Season #8 crowned by Jay Media Management Pvt. Ltd. in Biratnagar.',
    featured: true,
  },
  {
    id: 'koshi-2024-winner',
    title: 'Subha Laxmi Rai — Miss Koshi 2024 Winner',
    badge: 'Grand Winner • #16',
    category: 'Miss Koshi 2024',
    aspect: 'aspect-[4/4.5]',
    image: '/images/official/koshi-winner.png',
    caption:
      'Contestant No. 16 from Itahari crowned Miss Koshi 2024 Season #8 Grand Winner.',
    featured: true,
  },
  {
    id: 'koshi-2024-choice',
    title: "Organizer's Choice Winner — Miss Koshi 2024",
    badge: "Organizer's Choice",
    category: 'Miss Koshi 2024',
    aspect: 'aspect-[4/4.5]',
    image: '/images/official/koshi-organizers-choice.png',
    caption:
      "Honoring the Organizer's Choice titleholder of Miss Koshi Season #8.",
    featured: false,
  },
  {
    id: 'koshi-2024-r1',
    title: 'Nishahangma Limbu — 1st Runner Up',
    badge: '1st Runner Up • #09',
    category: 'Miss Koshi 2024',
    aspect: 'aspect-[4/4.5]',
    image: '/images/official/koshi-runner-1.png',
    caption:
      'Contestant No. 09 (Dharan) honored as 1st Runner Up at Miss Koshi 2024 Season #8.',
    featured: false,
  },
  {
    id: 'koshi-2024-r2',
    title: '2nd Runner Up — Miss Koshi 2024',
    badge: '2nd Runner Up',
    category: 'Miss Koshi 2024',
    aspect: 'aspect-[4/4.5]',
    image: '/images/official/koshi-runner-2.png',
    caption: 'Official 2nd Runner Up presentation of Miss Koshi 2024 Season #8.',
    featured: false,
  },
  {
    id: 'koshi-2024-r3',
    title: '3rd Runner Up — Miss Koshi 2024',
    badge: '3rd Runner Up',
    category: 'Miss Koshi 2024',
    aspect: 'aspect-[4/4.5]',
    image: '/images/official/koshi-runner-3.png',
    caption: 'Official 3rd Runner Up presentation of Miss Koshi 2024 Season #8.',
    featured: false,
  },
  {
    id: 'koshi-2024-r4',
    title: '4th Runner Up — Miss Koshi 2024',
    badge: '4th Runner Up',
    category: 'Miss Koshi 2024',
    aspect: 'aspect-[4/4.5]',
    image: '/images/official/koshi-runner-4.png',
    caption: 'Official 4th Runner Up presentation of Miss Koshi 2024 Season #8.',
    featured: false,
  },
  {
    id: 'nki-poster-2',
    title: 'Nepal Kids Idol — Auditions Open Nationwide',
    badge: '77 Districts + Global',
    category: 'Nepal Kids Idol',
    aspect: 'aspect-[4/4.5]',
    image: '/images/official/nki-poster.png',
    caption:
      'National & international audition call spanning all 77 districts of Nepal plus global diaspora centers with Rs. 20 Lakhs prize pool.',
    featured: true,
  },
  {
    id: 'little-koshi-showcase',
    title: 'Little Koshi Talent Round Showcase',
    badge: 'Youth Showcase',
    category: 'Mr. & Miss Little Koshi',
    aspect: 'aspect-[16/10]',
    image:
      'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=1200&q=80',
    caption:
      'Young participants performing vocal recitations, traditional attire walks, and creative talent showcases.',
    featured: false,
  },
  {
    id: 'stagecraft-rigging',
    title: 'Intelligent DMX Beam Rigging & Acoustics',
    badge: 'Arena Stagecraft',
    category: 'Stagecraft',
    aspect: 'aspect-[16/10]',
    image:
      'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1200&q=80',
    caption:
      'Calibrating dynamic DMX moving heads, LED video backdrops, and atmospheric haze for arena productions.',
    featured: false,
  },
  {
    id: 'corporate-gala-stage',
    title: 'Corporate Brand Reveal & VIP Gala Stage',
    badge: 'Executive Gala',
    category: 'Corporate Galas',
    aspect: 'aspect-[16/10]',
    image:
      'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=80',
    caption:
      'High-profile commercial unveiling with VIP executive seating protocol in Eastern Nepal.',
    featured: false,
  },
];

