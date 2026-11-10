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
      {
        label: 'Nepal Kids Idol',
        href: '/events/nepal-kids-idol',
        note: 'Registrations Open • Ages 5–15',
      },
      {
        label: 'Miss Koshi Grand Pageant',
        href: '/events/miss-koshi',
        note: 'Annual Flagship • Season #8',
      },
      {
        label: 'Mr. & Miss Little Koshi',
        href: '/events/mr-and-miss-little-koshi',
        note: 'Youth Confidence Showcase',
      },
      {
        label: 'Nepal Kids Dancing Champion',
        href: '/events/nepal-kids-dancing-champion',
        note: 'Televised Dance Championship',
      },
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
  href: '/register/nepal-kids-idol',
} as const;

export const secondaryCta = {
  label: 'Start a Project',
  href: '/contact',
} as const;

export const socials = [
  { label: 'Facebook', href: 'https://www.facebook.com/nepalkidsidol' },
  { label: 'YouTube', href: 'https://www.youtube.com/@JayMediaManagementPvtLtd' },
] as const;

const navigationObj = Object.assign([...navLinks], {
  links: navLinks,
  cta,
  secondaryCta,
  socials,
});

export const navigation = navigationObj;

export default navigation;
