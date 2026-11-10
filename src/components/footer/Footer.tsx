import Link from 'next/link';
import Image from 'next/image';
import { Mail, MapPin, Phone } from 'lucide-react';
import { EVENTS_DATA } from '@/config/events-data';
import { siteConfig } from '@/config/site';

const quickLinks = [
  { label: 'Home', href: '/' },
  { label: 'Events', href: '/events' },
  { label: 'About Us', href: '/about' },
  { label: 'Services', href: '/services' },
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
  { label: 'YouTube', href: siteConfig.social.youtube },
  { label: 'Facebook', href: siteConfig.social.facebook },
  { label: 'Instagram', href: siteConfig.social.instagram },
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
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-lg border border-line bg-white px-3 py-1.5 text-xs font-medium text-ink transition-colors hover:border-line-strong hover:bg-sand"
              >
                {social.label}
              </a>
            ))}
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
          <p>&copy; 2026 Jay Media Management Pvt. Ltd. All rights reserved.</p>
          <a href="#top" className="font-medium text-ink hover:text-forest">
            Back to top &uarr;
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
