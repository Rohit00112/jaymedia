import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowRight,
  ArrowUpRight,
  Mail,
  MapPin,
  Phone,
} from 'lucide-react';
import { siteConfig } from '@/config/site';

const quickLinks = [
  { label: 'Home', href: '/' },
  { label: 'Nepal Kids Idol', href: '/events/nepal-kids-idol' },
  { label: 'About Us', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Meet The Team', href: '/team' },
  { label: 'News & Updates', href: '/news' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Contact Us', href: '/contact' },
] as const;

const eventLinks = [
  { label: 'Register — Nepal Kids Idol', href: '/register/nepal-kids-idol' },
  { label: 'Event Judges Panel', href: '/#judges' },
  { label: 'Application Status Tracker', href: '/#application-status' },
  { label: 'Miss Koshi Season #8', href: '/events/miss-koshi' },
  { label: 'Mr. & Miss Little Koshi', href: '/events/mr-and-miss-little-koshi' },
  { label: 'Official Video Reels', href: '/#showreel' },
] as const;

const socialLinks = [
  { label: 'YouTube', href: siteConfig.social.youtube },
  { label: 'Facebook', href: siteConfig.social.facebook },
].filter((social) => Boolean(social.href));

export function Footer() {
  const { location, contact } = siteConfig;
  const fullAddress = `${location.address}, ${location.city}, ${location.country}`;

  return (
    <footer className="font-sans">
      {/* ─── Upper Bright Registration Pre-Footer Band ───────────── */}
      <div className="border-t-2 border-ink/85 bg-paper-deep py-10 text-ink">
        <div className="container-ed flex flex-col justify-between gap-6 lg:flex-row lg:items-center">
          <div className="max-w-2xl">
            <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-forest">
              Nepal Kids Idol 2025 &bull; Nationwide &amp; Global Auditions
            </span>
            <h2 className="display mt-2 text-2xl font-bold text-ink sm:text-3xl">
              Nepal Kids Idol 2025: A Stage for Young Stars
            </h2>
            <p className="mt-2 text-sm text-ink-soft">
              All 77 districts of Nepal, India (Sikkim, Darjeeling, Assam,
              Dehradun, Siliguri), USA, Canada, Australia, and online entry.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link href="/register/nepal-kids-idol" className="btn btn-accent">
              <span>Register Contestant</span>
              <ArrowUpRight className="h-4 w-4 text-gold" />
            </Link>
            <a
              href={`tel:${contact.phone}`}
              className="btn btn-outline bg-white"
            >
              <span>Call {contact.phone}</span>
            </a>
          </div>
        </div>
      </div>

      {/* ─── Lower Architectural Heritage Emerald Directory ────────── */}
      <div className="bg-forest text-white">
        <div className="container-ed grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-12">
          {/* Column 1: House Identity */}
          <div className="lg:col-span-4">
            <Link
              href="/"
              aria-label="Jay Media Management Pvt. Ltd."
              className="inline-block rounded-[2px] bg-white px-3.5 py-2.5"
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
              Established in 2013 in Biratnagar, Koshi Province. Feature film
              production, national reality television formats, live pageants,
              and turnkey event execution across Nepal.
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-[2px] border border-white/25 px-3.5 py-1.5 font-mono text-[10.5px] font-semibold uppercase tracking-[0.12em] text-white transition-colors hover:border-gold hover:bg-gold hover:text-ink"
                >
                  {social.label}
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Studio Desk Contact */}
          <div className="lg:col-span-3">
            <h3 className="font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-gold">
              Studio Desk
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

          {/* Column 3: Navigation */}
          <div className="lg:col-span-2">
            <h3 className="font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-gold">
              Directory
            </h3>
            <ul className="mt-5 space-y-2.5">
              {quickLinks.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="group inline-flex items-center gap-1.5 text-sm text-white/85 transition-colors hover:text-gold"
                  >
                    <ArrowRight className="h-3 w-3 text-gold transition-transform group-hover:translate-x-1" />
                    <span>{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Productions */}
          <div className="lg:col-span-3">
            <h3 className="font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-gold">
              Productions &amp; Desk
            </h3>
            <ul className="mt-5 space-y-2.5">
              {eventLinks.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="group inline-flex items-center gap-1.5 text-sm text-white/85 transition-colors hover:text-gold"
                  >
                    <ArrowRight className="h-3 w-3 text-gold transition-transform group-hover:translate-x-1" />
                    <span>{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>

            <p className="mt-6 border-t border-white/15 pt-4 font-mono text-[10px] uppercase tracking-[0.12em] text-white/70">
              Sunday – Friday &bull; 10:00 AM – 6:00 PM NST
            </p>
          </div>
        </div>

        <div className="border-t border-white/10 bg-[#012E1F] py-5">
          <div className="container-ed flex flex-col justify-between gap-3 text-xs text-white/75 sm:flex-row sm:items-center">
            <p>
              &copy; 2026 Jay Media Management Pvt. Ltd. All Rights Reserved.
            </p>
            <div className="flex items-center gap-6">
              <span className="text-white/60">
                Biratnagar, Koshi Province, Nepal
              </span>
              <a
                href="#top"
                className="inline-flex items-center gap-1.5 font-mono text-[10.5px] font-semibold uppercase tracking-[0.12em] text-white transition-colors hover:text-gold"
              >
                <span>Top</span>
                <ArrowUpRight className="h-3.5 w-3.5 text-gold" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
