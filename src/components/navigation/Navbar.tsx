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
      {/* ─── Official Top Utility Strip ───────────────────────────────── */}
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

          <div className="flex items-center gap-4 text-[11px] font-semibold uppercase tracking-[0.12em] text-muted">
            <span>Est. {siteConfig.established}</span>
            <span className="h-3 w-px bg-line-strong" aria-hidden="true" />
            {navigation.socials.map((soc, idx) => (
              <span key={soc.label} className="inline-flex items-center gap-4">
                <a
                  href={soc.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-ink-soft transition-colors hover:text-forest"
                >
                  {soc.label}
                </a>
                {idx === 0 && (
                  <span className="text-line-strong" aria-hidden="true">
                    /
                  </span>
                )}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ─── Sticky Porcelain Navigation Header ──────────────────────── */}
      <header className="sticky top-0 z-50 w-full border-t-[3px] border-t-forest">
        <nav
          aria-label="Primary Navigation"
          className={cn(
            'border-b transition-all duration-300',
            scrolled
              ? 'border-line bg-white/95 shadow-[0_10px_30px_-18px_rgba(1,64,43,0.16)] backdrop-blur-xl'
              : 'border-line bg-white'
          )}
        >
          <div className="container-ed flex h-[var(--nav-height)] items-center justify-between gap-6">
            {/* Unboxed Brand Logo */}
            <Link
              href="/"
              aria-label="Jay Media Management Pvt. Ltd. — Home"
              className="flex shrink-0 items-center transition-opacity hover:opacity-85"
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

            {/* Desktop Text Links With Architectural Underline Sweep */}
            <ul className="hidden items-center gap-6 lg:flex xl:gap-7">
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
                          'relative inline-flex items-center gap-1 py-2 text-[13.5px] font-medium tracking-[0.01em] transition-colors',
                          isActive
                            ? 'font-semibold text-forest'
                            : 'text-ink-soft hover:text-forest'
                        )}
                      >
                        <span>{link.label}</span>
                        <ChevronDown
                          className={cn(
                            'h-3.5 w-3.5 transition-transform duration-200',
                            eventsDropdownOpen && 'rotate-180 text-forest'
                          )}
                        />
                        {isActive && (
                          <span
                            className="absolute inset-x-0 bottom-0 h-[2px] bg-forest"
                            aria-hidden="true"
                          />
                        )}
                      </button>

                      {eventsDropdownOpen && (
                        <div className="absolute left-0 top-full pt-2">
                          <div className="w-76 overflow-hidden rounded-[6px] border border-line bg-white p-1.5 text-ink shadow-[0_24px_48px_-16px_rgba(1,64,43,0.18)]">
                            {link.children.map((child) => (
                              <Link
                                key={child.href}
                                href={child.href}
                                onClick={() => setEventsDropdownOpen(false)}
                                className="group flex flex-col border-b border-line-soft px-3.5 py-2.5 last:border-b-0 transition-colors hover:bg-paper"
                              >
                                <span className="flex items-center justify-between text-[13px] font-semibold text-ink group-hover:text-forest">
                                  {child.label}
                                  <ArrowUpRight className="h-3.5 w-3.5 text-forest opacity-50 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100" />
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
                        'link-sweep relative inline-block py-2 text-[13.5px] font-medium tracking-[0.01em] transition-colors',
                        isActive
                          ? 'font-semibold text-forest'
                          : 'text-ink-soft hover:text-forest'
                      )}
                      data-active={isActive ? 'true' : undefined}
                    >
                      {link.label}
                    </Link>
                  </li>
                );
              })}
            </ul>

            {/* Sharp Rectangular Editorial CTA + Mobile Button */}
            <div className="flex items-center gap-3">
              <Link
                href={navigation.cta.href}
                className="hidden items-center gap-2 rounded-[3px] bg-forest px-5 py-2.5 text-[12px] font-bold uppercase tracking-[0.1em] text-white transition-colors hover:bg-ink sm:inline-flex"
              >
                <span>{navigation.cta.label}</span>
                <ArrowUpRight className="h-3.5 w-3.5 text-gold" />
              </Link>

              <button
                type="button"
                onClick={toggleMobileMenu}
                aria-expanded={mobileMenuOpen}
                aria-controls="mobile-menu"
                aria-label="Open navigation menu"
                className="inline-flex items-center gap-2 rounded-[3px] border border-line-strong bg-paper px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-forest transition-colors hover:bg-forest hover:text-white lg:hidden"
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
