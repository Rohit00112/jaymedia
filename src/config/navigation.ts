import { EVENTS_DATA } from '@/config/events-data';

export interface NavChild {
  readonly label: string;
  readonly href: string;
  readonly note?: string;
}

export interface NavItem {
  readonly label: string;
  readonly href: string;
  readonly children?: readonly NavChild[];
}

export const navLinks: readonly NavItem[] = [
  { label: 'Home', href: '/' },
  {
    label: 'Events',
    href: '/events',
    children: [
      ...EVENTS_DATA.map((event) => ({
        label: event.title,
        href: `/events/${event.slug}`,
        note: `${event.seasonOrYear} • ${event.eligibility}`,
      })),
      {
        label: 'All Productions',
        href: '/events',
        note: 'Full Event Archive',
      },
    ],
  },
  { label: 'About Us', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'News', href: '/news' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Team', href: '/team' },
  { label: 'Contact Us', href: '/contact' },
] as const;

export const cta = {
  label: 'Register Now',
  href: '/register',
} as const;

export const secondaryCta = {
  label: 'Start a Project',
  href: '/contact',
} as const;

export const socials = [
  { label: 'Facebook', href: 'https://www.facebook.com/JayMediaManagement' },
  { label: 'YouTube', href: 'https://www.youtube.com/@JayMediaManagementPvtLtd' },
] as const;

const navigationObj = Object.assign([...navLinks], {
  links: navLinks,
  cta,
  secondaryCta,
  socials,
});

export const navigation = navigationObj;
