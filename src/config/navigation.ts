export interface NavItem {
  readonly label: string;
  readonly href: string;
}

export const navLinks: readonly NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Events', href: '/events' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'News', href: '/news' },
  { label: 'Contact', href: '/contact' },
] as const;

export const cta = {
  label: "Let's Talk",
  href: '/contact',
} as const;

export const socials = [
  { label: 'Facebook', href: 'https://www.facebook.com/jaymediamanagement' },
  { label: 'YouTube', href: 'https://www.youtube.com/@jaymediamanagement' },
  { label: 'Instagram', href: '' },
] as const;

export type NavigationConfig = typeof navLinks & {
  links: typeof navLinks;
  cta: typeof cta;
  socials: typeof socials;
};

const navigationObj = Object.assign([...navLinks], {
  links: navLinks,
  cta,
  socials,
});

export const navigation = navigationObj;

export default navigation;
