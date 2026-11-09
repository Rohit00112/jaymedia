import Link from 'next/link';
import { ArrowUpRight, Mail, MapPin, Phone } from 'lucide-react';
import { navigation } from '@/config/navigation';
import { siteConfig } from '@/config/site';

const services = [
  { label: 'Event Management', href: '/services/event-management' },
  { label: 'Brand Experiences', href: '/services/brand-experiences' },
  { label: 'Media Production', href: '/services/media-production' },
  { label: 'Product Launches', href: '/services/product-launches' },
  { label: 'Press Events', href: '/services/press-events' },
] as const;

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  );
}

function YouTubeIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  );
}

const socialLinks = [
  { label: 'Facebook', href: siteConfig.social.facebook, icon: FacebookIcon },
  { label: 'Instagram', href: siteConfig.social.instagram, icon: InstagramIcon },
  { label: 'YouTube', href: siteConfig.social.youtube, icon: YouTubeIcon },
] as const;

export function Footer() {
  const { location, contact } = siteConfig;
  const fullAddress = `${location.address}, ${location.city}, ${location.province}, ${location.country}`;

  return (
    <footer className="border-t border-line bg-surface font-body text-paper">
      <div className="container-ed pt-16 md:pt-24">
        <div className="grid gap-14 lg:grid-cols-12">
          {/* Brand */}
          <div className="lg:col-span-5">
            <Link href="/" className="inline-flex items-center gap-3">
              <span className="display flex h-9 w-9 items-center justify-center bg-coral text-sm leading-none text-ink">
                JM
              </span>
              <span className="display text-xl tracking-[0.04em]">JAY MEDIA</span>
            </Link>

            <p className="mt-7 max-w-sm text-sm leading-relaxed text-muted">
              A Biratnagar-born production house creating pageants, brand
              experiences, and live moments that define Eastern Nepal.
            </p>

            <div className="mt-8 flex items-start gap-3 text-sm text-muted">
              <MapPin className="mt-1 h-4 w-4 shrink-0 text-coral" />
              <a
                href={`https://maps.google.com/?q=${encodeURIComponent(fullAddress)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="max-w-xs transition-colors hover:text-paper"
              >
                {fullAddress}
              </a>
            </div>

            <div className="mt-7 flex items-center gap-3">
              {socialLinks
                .filter((social) => social.href)
                .map((social) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                      className="flex h-10 w-10 items-center justify-center border border-line text-paper/70 transition-colors hover:border-coral hover:text-coral"
                    >
                      <Icon className="h-4 w-4" />
                    </a>
                  );
                })}
            </div>
          </div>

          {/* Link columns */}
          <div className="grid grid-cols-2 gap-10 sm:grid-cols-[0.9fr_1.1fr_1.4fr] lg:col-span-7">
            <div>
              <h3 className="eyebrow text-coral">Explore</h3>
              <ul className="mt-6 space-y-3">
                {navigation.links.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-sm text-muted transition-colors hover:text-paper"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="eyebrow text-coral">Services</h3>
              <ul className="mt-6 space-y-3">
                {services.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-sm text-muted transition-colors hover:text-paper"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="col-span-2 sm:col-span-1">
              <h3 className="eyebrow text-coral">Studio</h3>
              <ul className="mt-6 space-y-4 text-sm text-muted">
                <li>
                  <a
                    href={`mailto:${contact.email}`}
                    className="inline-flex items-start gap-3 transition-colors hover:text-paper"
                  >
                    <Mail className="mt-0.5 h-4 w-4 shrink-0 text-coral" />
                    <span className="break-words">{contact.email}</span>
                  </a>
                </li>
                <li>
                  <a
                    href={`tel:${contact.phone}`}
                    className="inline-flex items-start gap-3 transition-colors hover:text-paper"
                  >
                    <Phone className="mt-0.5 h-4 w-4 shrink-0 text-coral" />
                    {contact.phone}
                  </a>
                </li>
              </ul>

              <Link href="/contact" className="text-link mt-8 text-paper">
                Start a project
                <ArrowUpRight className="h-3.5 w-3.5 text-coral" />
              </Link>
            </div>
          </div>
        </div>

        {/* Giant wordmark */}
        <div className="mt-20 overflow-hidden border-t border-line pt-10 md:mt-24">
          <Link href="/" aria-label="Jay Media Management — Home" className="block">
            <span className="display flex items-baseline text-[clamp(3.4rem,13.6vw,13.6rem)] leading-[0.78] text-paper">
              JAY MEDIA
              <span className="ml-2 text-coral md:ml-4">.</span>
            </span>
          </Link>
        </div>

        <div className="mt-8 flex flex-col justify-between gap-3 border-t border-line py-8 text-[10px] uppercase tracking-[0.18em] text-faint sm:flex-row">
          <p>&copy; 2026 Jay Media Management Pvt. Ltd.</p>
          <p>Biratnagar · Koshi Province · Nepal</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
