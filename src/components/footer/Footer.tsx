import Link from 'next/link';
import Image from 'next/image';
import { Mail, MapPin, Phone } from 'lucide-react';
import { EVENTS_DATA } from '@/config/events-data';
import { siteConfig } from '@/config/site';
import { cn } from '@/lib/utils';

function YouTubeIcon({ className }: { className?: string }) {
  return (
    <svg
      role="img"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  );
}

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg
      role="img"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg
      role="img"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

const quickLinks = [
  { label: 'Home', href: '/' },
  { label: 'Events', href: '/events' },
  { label: 'About Us', href: '/about' },
  { label: 'Team', href: '/team' },
  { label: 'News', href: '/news' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Contact', href: '/contact' },
] as const;

const eventLinks = [
  ...EVENTS_DATA.map((event) => ({
    label: event.title,
    href: `/events/${event.slug}`,
  })),
  { label: 'All Productions', href: '/events' },
] as const;

const socialLinks = [
  {
    label: 'YouTube',
    href: siteConfig.social.youtube,
    icon: YouTubeIcon,
    hoverClass: 'hover:text-[#FF0000] hover:border-[#FF0000]/30',
  },
  {
    label: 'Facebook',
    href: siteConfig.social.facebook,
    icon: FacebookIcon,
    hoverClass: 'hover:text-[#1877F2] hover:border-[#1877F2]/30',
  },
  {
    label: 'Instagram',
    href: siteConfig.social.instagram,
    icon: InstagramIcon,
    hoverClass: 'hover:text-[#E4405F] hover:border-[#E4405F]/30',
  },
].filter((social) => Boolean(social.href));

export function Footer() {
  const { location, contact } = siteConfig;
  const fullAddress = `${location.address}, ${location.city}, ${location.country}`;

  return (
    <footer className="border-t border-line bg-paper-deep text-ink">
      <div className="container-ed grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-12">
        {/* Column 1: Brand */}
        <div className="lg:col-span-4">
          <Link
            href="/"
            aria-label="Jay Media Management Pvt. Ltd."
            className="inline-block"
          >
            <Image
              src={siteConfig.logo}
              alt="Jay Media Management Pvt. Ltd."
              width={132}
              height={52}
              className="h-8 w-auto object-contain"
            />
          </Link>

          <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted">
            Established in 2013 in Biratnagar, Koshi Province. Live concerts,
            national reality television shows, pageants, and feature film
            production across Nepal.
          </p>

          <div className="mt-5 flex flex-wrap gap-2">
            {socialLinks.map((social) => {
              const Icon = social.icon;
              return (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Jay Media Management on ${social.label}`}
                  className={cn(
                    'inline-flex items-center gap-2 rounded-lg border border-line bg-white px-3 py-1.5 text-xs font-medium text-ink transition-all duration-200 hover:border-line-strong hover:bg-sand',
                    social.hoverClass
                  )}
                >
                  <Icon className="h-3.5 w-3.5 shrink-0" />
                  <span>{social.label}</span>
                </a>
              );
            })}
          </div>
        </div>

        {/* Column 2: Navigation */}
        <div className="lg:col-span-2">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-ink">
            Navigation
          </h3>
          <ul className="mt-4 space-y-2.5">
            {quickLinks.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-sm text-muted transition-colors hover:text-ink"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 3: Productions */}
        <div className="lg:col-span-3">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-ink">
            Productions
          </h3>
          <ul className="mt-4 space-y-2.5">
            {eventLinks.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-sm text-muted transition-colors hover:text-ink"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 4: Contact */}
        <div className="lg:col-span-3">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-ink">
            Contact
          </h3>
          <ul className="mt-4 space-y-3.5 text-sm text-muted">
            <li className="flex items-start gap-2.5">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-forest" />
              <a
                href={`https://maps.google.com/?q=${encodeURIComponent(
                  fullAddress
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="leading-relaxed transition-colors hover:text-ink"
              >
                {location.address}, {location.city}, {location.country}
              </a>
            </li>

            <li className="flex items-start gap-2.5">
              <Mail className="mt-0.5 h-4 w-4 shrink-0 text-forest" />
              <a
                href={`mailto:${contact.email}`}
                className="break-all transition-colors hover:text-ink"
              >
                {contact.email}
              </a>
            </li>

            <li className="flex items-start gap-2.5">
              <Phone className="mt-0.5 h-4 w-4 shrink-0 text-forest" />
              <div className="flex flex-wrap items-center gap-x-2">
                <a
                  href={`tel:${contact.phone}`}
                  className="transition-colors hover:text-ink"
                >
                  {contact.phone}
                </a>
                <span className="text-line-strong">/</span>
                <a
                  href={`tel:${contact.secondaryPhone}`}
                  className="transition-colors hover:text-ink"
                >
                  {contact.secondaryPhone}
                </a>
              </div>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-line py-5">
        <div className="container-ed flex flex-col justify-between gap-2 text-xs text-muted sm:flex-row sm:items-center">
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
            <p>&copy; 2026 Jay Media Management Pvt. Ltd. All rights reserved.</p>
            <span className="hidden text-line-strong sm:inline">&bull;</span>
            <p className="text-ink-soft">
              Managed by Astra Technology Horizon Pvt. Ltd.
            </p>
          </div>
          <a href="#top" className="font-medium text-ink hover:text-forest">
            Back to top &uarr;
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
