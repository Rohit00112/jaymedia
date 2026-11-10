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

export const MAX_DROPDOWN_EVENTS = 3;

export const navLinks: readonly NavItem[] = [
  { label: 'Home', href: '/' },
  {
    label: 'Events',
    href: '/events',
    children: [
      ...EVENTS_DATA.slice(0, MAX_DROPDOWN_EVENTS).map((event) => ({
        label: event.title,
        href: `/events/${event.slug}`,
        note: event.seasonOrYear,
      })),
      {
        label: 'All Productions',
        href: '/events',
        note: 'View full portfolio',
      },
    ],
  },
  { label: 'About Us', href: '/about' },
  { label: 'News', href: '/news' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Team', href: '/team' },
  { label: 'Contact Us', href: '/contact' },
] as const;

export const cta = {
  label: 'Get in Touch',
  href: '/contact',
} as const;

export const secondaryCta = {
  label: 'Start a Project',
  href: '/contact',
} as const;

export const socials = [
  { label: 'Facebook', href: 'https://www.facebook.com/JayMediaManagement' },
  { label: 'Instagram', href: 'https://www.instagram.com/jaymediamanagement/' },
  { label: 'YouTube', href: 'https://www.youtube.com/@JayMediaManagementPvtLtd' },
] as const;

const navigationObj = Object.assign([...navLinks], {
  links: navLinks,
  cta,
  secondaryCta,
  socials,
});

export const navigation = navigationObj;
