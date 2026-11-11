'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { ChevronDown, Menu, Handshake } from 'lucide-react';
import {
  navigation,
  MAX_DROPDOWN_EVENTS,
  type NavChild,
} from '@/config/navigation';
import type { EventDetailData } from '@/config/events-data';
import { siteConfig } from '@/config/site';
import { cn } from '@/lib/utils';
import { useEscapeKey } from '@/hooks';
import { MobileMenu } from './MobileMenu';
import { ConcertAnnouncementBar } from './ConcertAnnouncementBar';

export function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [eventsDropdownOpen, setEventsDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [dynamicEventLinks, setDynamicEventLinks] = useState<NavChild[] | null>(
    null
  );
  const dropdownRef = useRef<HTMLLIElement>(null);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 12);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    let active = true;
    fetch('/api/events')
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (active && Array.isArray(data?.events) && data.events.length > 0) {
          setDynamicEventLinks([
            ...data.events.slice(0, MAX_DROPDOWN_EVENTS).map((ev: EventDetailData) => ({
              label: ev.title,
              href: `/events/${ev.slug}`,
              note: ev.seasonOrYear,
            })),
            {
              label: 'All Productions',
              href: '/events',
              note: 'View full portfolio',
            },
          ]);
        }
      })
      .catch(() => {});
    return () => {
      active = false;
    };
  }, []);

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
      <header
        className={cn(
          'sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur-md transition-all duration-300',
          scrolled ? 'border-line shadow-xs' : 'border-line'
        )}
      >
        <ConcertAnnouncementBar />
        <nav
          aria-label="Primary Navigation"
          className="container-ed flex h-16 items-center justify-between gap-6"
        >
          {/* Brand Logo */}
          <Link
            href="/"
            aria-label="Jay Media Management Pvt. Ltd. — Home"
            className="flex shrink-0 items-center transition-transform duration-200 hover:scale-[1.02]"
          >
            <Image
              src={siteConfig.logo}
              alt="Jay Media Management Pvt. Ltd."
              width={124}
              height={48}
              priority
              className="h-8 w-auto object-contain"
            />
          </Link>

          {/* Primary Navigation Links */}
          <ul className="hidden items-center gap-6 lg:flex">
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
                        ' relative inline-flex items-center gap-1 py-2 text-sm transition-colors after:absolute after:bottom-0.5 after:left-0 after:h-[2px] after:w-full after:origin-left after:rounded-full after:bg-forest after:transition-transform after:duration-200',
                        isActive
                          ? 'font-semibold text-ink after:scale-x-100'
                          : 'font-medium text-muted after:scale-x-0 hover:text-ink hover:after:scale-x-100'
                      )}
                    >
                      <span>{link.label}</span>
                      <ChevronDown
                        className={cn(
                          'h-3.5 w-3.5 transition-transform duration-200',
                          eventsDropdownOpen && 'rotate-180 text-ink'
                        )}
                      />
                    </button>

                    {eventsDropdownOpen && (
                      <div className="animate-dropdown absolute left-0 top-full pt-1.5">
                        <div className="w-64 rounded-xl border border-line bg-white p-1.5 shadow-lg">
                          {(dynamicEventLinks || link.children).map((child) => {
                            const isAllLink = child.href === '/events';
                            return (
                              <div
                                key={child.href}
                                className={cn(
                                  isAllLink && 'mt-1 border-t border-line pt-1'
                                )}
                              >
                                <Link
                                  href={child.href}
                                  onClick={() => setEventsDropdownOpen(false)}
                                  className="group block rounded-lg px-3 py-2 transition-all duration-150 hover:bg-paper-deep hover:pl-3.5"
                                >
                                  <span
                                    className={cn(
                                      'block text-sm font-medium transition-colors group-hover:text-forest',
                                      isAllLink ? 'text-forest' : 'text-ink'
                                    )}
                                  >
                                    {child.label}
                                  </span>
                                  {child.note && (
                                    <span className="mt-0.5 block text-xs text-muted">
                                      {child.note}
                                    </span>
                                  )}
                                </Link>
                              </div>
                            );
                          })}
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
                      'relative inline-block py-2 text-sm transition-colors after:absolute after:bottom-0.5 after:left-0 after:h-[2px] after:w-full after:origin-left after:rounded-full after:bg-forest after:transition-transform after:duration-200',
                      isActive
                        ? 'font-semibold text-ink after:scale-x-100'
                        : 'font-medium text-muted after:scale-x-0 hover:text-ink hover:after:scale-x-100'
                    )}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Right Action */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            <Link
              href="/contact?topic=concert-sponsorship"
              className="btn btn-outline border-forest/35 py-1.5 px-2.5 text-xs font-semibold text-forest hover:border-forest hover:bg-forest-soft hover:text-forest inline-flex items-center gap-1.5 transition-colors sm:px-3 sm:py-2"
            >
              <Handshake className="h-3.5 w-3.5 shrink-0 text-forest" />
              <span className="hidden sm:inline">Call for Sponsors</span>
              <span className="sm:hidden">Sponsors</span>
            </Link>

            <Link
              href={navigation.cta.href}
              className="btn btn-primary hidden py-2 text-sm sm:inline-flex"
            >
              {navigation.cta.label}
            </Link>

            <button
              type="button"
              onClick={toggleMobileMenu}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-menu"
              aria-label="Open navigation menu"
              className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-line text-ink transition-colors hover:bg-paper-deep lg:hidden"
            >
              <Menu className="h-4 w-4" />
            </button>
          </div>
        </nav>
      </header>

      <MobileMenu isOpen={mobileMenuOpen} onClose={closeMobileMenu} />
    </>
  );
}
