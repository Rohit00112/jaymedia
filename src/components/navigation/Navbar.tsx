'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import {
  ArrowUpRight,
  ChevronDown,
  Mail,
  MapPin,
  Phone,
  Sparkles,
} from 'lucide-react';
import { navigation } from '@/config/navigation';
import { siteConfig } from '@/config/site';
import { cn } from '@/lib/utils';
import { useScrollPosition, useEscapeKey } from '@/hooks';
import { MobileMenu } from './MobileMenu';

export function Navbar() {
  const pathname = usePathname();
  const scrollY = useScrollPosition();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [eventsDropdownOpen, setEventsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLLIElement>(null);

  const scrolled = scrollY > 40;

  const toggleMobileMenu = useCallback(() => {
    setMobileMenuOpen((prev) => !prev);
  }, []);

  const closeMobileMenu = useCallback(() => {
    setMobileMenuOpen(false);
  }, []);

  useEscapeKey(() => setEventsDropdownOpen(false), eventsDropdownOpen);

  useEffect(() => {
    function handleOutsideClick(e: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setEventsDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  return (
    <>
      {/* ─── Official Top Utility Bar (#E3E3E1 Subtle Warm Stone) ─── */}
      <div className="hidden border-b border-line bg-sand/75 text-ink lg:block">
        <div className="container-ed flex h-9 items-center justify-between text-[11.5px]">
          <div className="flex items-center gap-5 text-ink-soft">
            <a
              href={`https://maps.google.com/?q=${encodeURIComponent(
                `${siteConfig.location.address}, ${siteConfig.location.city}, ${siteConfig.location.country}`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 transition-colors hover:text-forest"
            >
              <MapPin className="h-3 w-3 text-forest" />
              <span>Central Mall, 1st Floor, Biratnagar</span>
            </a>

            <span className="h-3 w-px bg-line-strong" aria-hidden="true" />

            <a
              href={`tel:${siteConfig.contact.phone}`}
              className="inline-flex items-center gap-1.5 font-medium transition-colors hover:text-forest"
            >
              <Phone className="h-3 w-3 text-forest" />
              <span>{siteConfig.contact.phone}</span>
              <span className="text-muted">/</span>
              <span>{siteConfig.contact.secondaryPhone}</span>
            </a>

            <span className="h-3 w-px bg-line-strong" aria-hidden="true" />

            <a
              href={`mailto:${siteConfig.contact.email}`}
              className="inline-flex items-center gap-1.5 transition-colors hover:text-forest"
            >
              <Mail className="h-3 w-3 text-forest" />
              <span>{siteConfig.contact.email}</span>
            </a>
          </div>

          <div className="flex items-center gap-2">
            <span className="mr-2 font-mono text-[9.5px] uppercase tracking-[0.18em] text-muted">
              Est. {siteConfig.established} • Nepal
            </span>
            {navigation.socials.map((soc) => (
              <a
                key={soc.label}
                href={soc.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={soc.label}
                className="inline-flex h-5 items-center rounded-full border border-line-strong bg-white/60 px-2 font-mono text-[9px] font-semibold uppercase tracking-[0.1em] text-ink transition-colors hover:border-forest hover:bg-forest hover:text-white"
              >
                {soc.label === 'Facebook' ? 'FB' : 'YT'}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* ─── Sticky Airy Porcelain Header + Emerald Brand Accent ──── */}
      <header className="sticky top-0 z-50 w-full border-t-[3px] border-t-forest">
        <nav
          aria-label="Primary Navigation"
          className={cn(
            'border-b transition-all duration-300',
            scrolled
              ? 'border-line bg-white/94 shadow-[0_12px_36px_-18px_rgba(1,64,43,0.18)] backdrop-blur-xl'
              : 'border-line bg-white/98 backdrop-blur-md'
          )}
        >
          <div className="container-ed flex h-[var(--nav-height)] items-center justify-between gap-4">
            {/* Clean Unboxed Official Logo */}
            <Link
              href="/"
              aria-label="Jay Media Management Pvt. Ltd. — Home"
              className="group flex shrink-0 items-center transition-opacity hover:opacity-90"
            >
              <Image
                src={siteConfig.logo}
                alt="Jay Media Management Pvt. Ltd."
                width={136}
                height={56}
                priority
                className="h-9 w-auto object-contain sm:h-10"
              />
            </Link>

            {/* Desktop Nav Links */}
            <ul className="hidden items-center gap-1 lg:flex xl:gap-3">
              {navigation.links.map((link) => {
                const isActive =
                  pathname === link.href ||
                  (link.href !== '/' && pathname.startsWith(`${link.href}/`));

                if (link.children) {
                  return (
                    <li
                      key={link.href}
                      ref={dropdownRef}
                      className="relative"
                      onMouseEnter={() => setEventsDropdownOpen(true)}
                      onMouseLeave={() => setEventsDropdownOpen(false)}
                    >
                      <button
                        type="button"
                        aria-expanded={eventsDropdownOpen}
                        aria-haspopup="true"
                        onClick={() => setEventsDropdownOpen((prev) => !prev)}
                        className={cn(
                          'inline-flex items-center gap-1.5 rounded-full px-3.5 py-2 text-[13.5px] font-medium transition-colors duration-200',
                          isActive
                            ? 'bg-forest-soft font-semibold text-forest'
                            : 'text-ink-soft hover:bg-paper-deep/60 hover:text-forest'
                        )}
                      >
                        <span>{link.label}</span>
                        <ChevronDown
                          className={cn(
                            'h-3.5 w-3.5 transition-transform duration-200',
                            eventsDropdownOpen && 'rotate-180 text-forest'
                          )}
                        />
                      </button>

                      {eventsDropdownOpen && (
                        <div className="absolute left-0 top-full pt-2">
                          <div className="w-76 overflow-hidden rounded-[12px] border border-line bg-white p-2 text-ink shadow-[0_24px_48px_-16px_rgba(1,64,43,0.2)]">
                            {link.children.map((child) => (
                              <Link
                                key={child.href}
                                href={child.href}
                                onClick={() => setEventsDropdownOpen(false)}
                                className="group flex flex-col rounded-[8px] px-3.5 py-2.5 transition-colors hover:bg-forest-soft/60"
                              >
                                <span className="flex items-center justify-between text-[13px] font-semibold text-ink group-hover:text-forest">
                                  {child.label}
                                  <ArrowUpRight className="h-3.5 w-3.5 text-forest opacity-60 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100" />
                                </span>
                                {child.note && (
                                  <span className="mt-0.5 text-[11px] text-muted">
                                    {child.note}
                                  </span>
                                )}
                              </Link>
                            ))}
                          </div>
                        </div>
                      )}
                    </li>
                  );
                }

                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      aria-current={isActive ? 'page' : undefined}
                      className={cn(
                        'relative inline-block rounded-full px-3.5 py-2 text-[13.5px] font-medium transition-colors duration-200',
                        isActive
                          ? 'bg-forest-soft font-semibold text-forest'
                          : 'text-ink-soft hover:bg-paper-deep/60 hover:text-forest'
                      )}
                    >
                      {link.label}
                    </Link>
                  </li>
                );
              })}
            </ul>

            {/* Desktop CTA + Mobile Trigger */}
            <div className="flex items-center gap-3">
              <Link
                href={navigation.cta.href}
                className="hidden items-center gap-2 rounded-full bg-forest px-5 py-2.5 text-[12px] font-bold uppercase tracking-[0.1em] text-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-ink hover:shadow-md sm:inline-flex"
              >
                <Sparkles className="h-3.5 w-3.5 text-gold" />
                <span>{navigation.cta.label}</span>
              </Link>

              <button
                type="button"
                onClick={toggleMobileMenu}
                aria-expanded={mobileMenuOpen}
                aria-controls="mobile-menu"
                aria-label="Open navigation menu"
                className="inline-flex items-center gap-2 rounded-full border border-line-strong bg-paper px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-forest transition-colors hover:bg-forest hover:text-white lg:hidden"
              >
                <span>Menu</span>
                <span className="flex flex-col gap-1">
                  <span className="h-[1.5px] w-4 bg-current" />
                  <span className="h-[1.5px] w-3 bg-gold-deep" />
                </span>
              </button>
            </div>
          </div>
        </nav>
      </header>

      <MobileMenu isOpen={mobileMenuOpen} onClose={closeMobileMenu} />
    </>
  );
}
