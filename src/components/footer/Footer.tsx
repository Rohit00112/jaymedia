import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight, Mail, MapPin, Phone } from 'lucide-react';
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
  { label: 'Open Registrations', href: '/register' },
] as const;

const socialLinks = [
  { label: 'YouTube', href: siteConfig.social.youtube },
  { label: 'Facebook', href: siteConfig.social.facebook },
].filter((social) => Boolean(social.href));

export function Footer() {
  const { location, contact } = siteConfig;
  const fullAddress = `${location.address}, ${location.city}, ${location.country}`;

  return (
    <footer className="bg-forest font-sans text-white">
      <div className="container-ed grid gap-10 py-16 sm:grid-cols-2 lg:grid-cols-12">
        {/* Column 1: Brand */}
        <div className="lg:col-span-4">
          <Link
            href="/"
            aria-label="Jay Media Management Pvt. Ltd."
            className="inline-block rounded-md bg-white px-3.5 py-2.5"
          >
            <Image
              src={siteConfig.logo}
              alt="Jay Media Management Pvt. Ltd."
              width={136}
              height={54}
              className="h-8 w-auto object-contain"
            />
          </Link>

          <p className="mt-5 max-w-xs text-sm leading-relaxed text-white/80">
            Established in 2013 in Biratnagar, Koshi Province. Live concerts,
            national reality television shows, pageants, and feature film
            production across Nepal.
          </p>

          <div className="mt-6 flex flex-wrap gap-2.5">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-md border border-white/25 px-3.5 py-1.5 text-xs font-semibold text-white transition-colors hover:border-gold hover:bg-gold hover:text-ink"
              >
                {social.label}
              </a>
            ))}
          </div>
        </div>

        {/* Column 2: Contact */}
        <div className="lg:col-span-3">
          <h3 className="text-xs font-semibold uppercase tracking-[0.14em] text-gold">
            Contact
          </h3>
          <ul className="mt-5 space-y-4 text-sm text-white/85">
            <li className="flex items-start gap-2.5">
              <MapPin className="mt-1 h-4 w-4 shrink-0 text-gold" />
              <a
                href={`https://maps.google.com/?q=${encodeURIComponent(
                  fullAddress
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="leading-relaxed transition-colors hover:text-gold"
              >
                {location.address},
                <br />
                {location.city}, {location.country}
              </a>
            </li>

            <li className="flex items-start gap-2.5">
              <Mail className="mt-1 h-4 w-4 shrink-0 text-gold" />
              <a
                href={`mailto:${contact.email}`}
                className="break-all transition-colors hover:text-gold"
              >
                {contact.email}
              </a>
            </li>

            <li className="flex items-start gap-2.5">
              <Phone className="mt-1 h-4 w-4 shrink-0 text-gold" />
              <div className="flex flex-wrap items-center gap-x-2">
                <a
                  href={`tel:${contact.phone}`}
                  className="transition-colors hover:text-gold"
                >
                  {contact.phone}
                </a>
                <span className="text-white/40">|</span>
                <a
                  href={`tel:${contact.secondaryPhone}`}
                  className="transition-colors hover:text-gold"
                >
                  {contact.secondaryPhone}
                </a>
              </div>
            </li>
          </ul>
        </div>

        {/* Column 3: Quick Links */}
        <div className="lg:col-span-2">
          <h3 className="text-xs font-semibold uppercase tracking-[0.14em] text-gold">
            Navigation
          </h3>
          <ul className="mt-5 space-y-2.5">
            {quickLinks.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-sm text-white/85 transition-colors hover:text-gold"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 4: Productions */}
        <div className="lg:col-span-3">
          <h3 className="text-xs font-semibold uppercase tracking-[0.14em] text-gold">
            Productions
          </h3>
          <ul className="mt-5 space-y-2.5">
            {eventLinks.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-sm text-white/85 transition-colors hover:text-gold"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10 bg-[#012E1F] py-5">
        <div className="container-ed flex flex-col justify-between gap-3 text-xs text-white/75 sm:flex-row sm:items-center">
          <p>&copy; 2026 Jay Media Management Pvt. Ltd. All Rights Reserved.</p>
          <a
            href="#top"
            className="inline-flex items-center gap-1 font-semibold text-white transition-colors hover:text-gold"
          >
            <span>Back to top</span>
            <ArrowUpRight className="h-3.5 w-3.5 text-gold" />
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
