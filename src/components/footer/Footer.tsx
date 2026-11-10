import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
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
  { label: 'Instagram', href: siteConfig.social.instagram },
  { label: 'LinkedIn', href: siteConfig.social.linkedin },
];

export function Footer() {
  const { location, contact } = siteConfig;
  const fullAddress = `${location.address}, ${location.city}, ${location.country}`;

  return (
    <footer className="bg-forest font-sans text-white">
      <div className="container-ed">
        <div className="grid gap-10 lg:grid-cols-12">
          {/* ─── Left Warm Stone Spotlight Card (#E3E3E1) ───────────── */}
          <div className="lg:col-span-4">
            <div className="flex h-full flex-col justify-between bg-sand px-7 py-9 text-ink sm:px-8 sm:py-10">
              <div>
                <Link
                  href="/"
                  aria-label="Jay Media Management Pvt. Ltd."
                  className="inline-block"
                >
                  <Image
                    src={siteConfig.logo}
                    alt="Jay Media Management Pvt. Ltd."
                    width={145}
                    height={58}
                    className="h-10 w-auto object-contain"
                  />
                </Link>

                <h2 className="display mt-6 text-xl font-bold leading-snug text-forest">
                  Nepal Kids Idol 2025: A Stage for Young Stars!
                </h2>
                <p className="mt-1.5 text-sm font-medium text-ink-soft">
                  Showcase your talent and shine across the nation.
                </p>

                <ul className="mt-5 space-y-2.5 text-sm text-ink-soft">
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-forest" />
                    <span>
                      <strong className="text-forest">Auditions:</strong> All 77
                      districts of Nepal
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-forest" />
                    <span>
                      <strong className="text-forest">International:</strong>{' '}
                      Sikkim, Darjeeling, Assam, Dehradun, Siliguri, USA, Canada,
                      Australia
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-forest" />
                    <span>
                      <strong className="text-forest">Online:</strong> Audition
                      from anywhere
                    </span>
                  </li>
                </ul>
              </div>

              <div className="mt-8 border-t border-line-strong pt-6">
                <p className="font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-forest">
                  We make your dreams come true
                </p>
                <Link
                  href="/register/nepal-kids-idol"
                  className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full bg-forest px-6 py-3 text-xs font-bold uppercase tracking-[0.14em] text-white transition-all hover:bg-ink"
                >
                  <span>Register Now</span>
                  <ArrowUpRight className="h-4 w-4 text-gold" />
                </Link>
              </div>
            </div>
          </div>

          {/* ─── Right Deep Forest Emerald Directory Columns ──────────── */}
          <div className="grid gap-10 py-12 sm:grid-cols-2 lg:col-span-8 lg:grid-cols-3 lg:py-14">
            {/* Column 1: Get In Touch */}
            <div>
              <h3 className="font-sans text-lg font-bold tracking-tight text-white">
                Get In Touch
              </h3>
              <div className="mt-2 h-[2px] w-10 bg-gold" aria-hidden="true" />

              <ul className="mt-6 space-y-4 text-sm text-white/85">
                <li className="flex items-start gap-3">
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

                <li className="flex items-start gap-3">
                  <Mail className="mt-1 h-4 w-4 shrink-0 text-gold" />
                  <a
                    href={`mailto:${contact.email}`}
                    className="break-all transition-colors hover:text-gold"
                  >
                    {contact.email}
                  </a>
                </li>

                <li className="flex items-start gap-3">
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

              <div className="mt-7 flex flex-wrap gap-2">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center rounded-full bg-white/10 px-3 py-1.5 text-[10.5px] font-bold uppercase tracking-[0.1em] text-white transition-colors hover:bg-gold hover:text-ink"
                  >
                    {social.label}
                  </a>
                ))}
              </div>
            </div>

            {/* Column 2: Quick Links */}
            <div>
              <h3 className="font-sans text-lg font-bold tracking-tight text-white">
                Quick Links
              </h3>
              <div className="mt-2 h-[2px] w-10 bg-gold" aria-hidden="true" />

              <ul className="mt-6 space-y-2.5">
                {quickLinks.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="group inline-flex items-center gap-2 text-sm text-white/85 transition-colors hover:text-gold"
                    >
                      <ArrowRight className="h-3.5 w-3.5 text-gold transition-transform group-hover:translate-x-1" />
                      <span>{item.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: Event Links */}
            <div>
              <h3 className="font-sans text-lg font-bold tracking-tight text-white">
                Event Links
              </h3>
              <div className="mt-2 h-[2px] w-10 bg-gold" aria-hidden="true" />

              <ul className="mt-6 space-y-2.5">
                {eventLinks.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="group inline-flex items-center gap-2 text-sm text-white/85 transition-colors hover:text-gold"
                    >
                      <ArrowRight className="h-3.5 w-3.5 text-gold transition-transform group-hover:translate-x-1" />
                      <span>{item.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>

              <div className="mt-7 rounded-[8px] border border-white/15 bg-white/5 p-4">
                <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-gold">
                  Studio Desk
                </span>
                <p className="mt-1 text-xs leading-relaxed text-white/75">
                  Sunday – Friday: 10:00 AM – 6:00 PM NST
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Legal Bar */}
      <div className="border-t border-white/10 bg-[#012E1F] py-5">
        <div className="container-ed flex flex-col justify-between gap-3 text-xs text-white/75 sm:flex-row sm:items-center">
          <p>
            &copy; 2026 Jay Media Management Pvt. Ltd. All Rights Reserved.
          </p>
          <div className="flex items-center gap-5">
            <Link href="/admin" className="transition-colors hover:text-gold">
              Studio CMS
            </Link>
            <a
              href="#top"
              className="inline-flex items-center gap-1.5 font-semibold text-white transition-colors hover:text-gold"
            >
              <span>Back to Top</span>
              <ArrowUpRight className="h-3.5 w-3.5 text-gold" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
