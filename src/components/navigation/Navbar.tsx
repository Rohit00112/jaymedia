'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { ChevronDown, Menu } from 'lucide-react';
import { navigation, type NavChild } from '@/config/navigation';
import type { EventDetailData } from '@/config/events-data';
import { siteConfig } from '@/config/site';
import { cn } from '@/lib/utils';
import { useEscapeKey } from '@/hooks';
import { MobileMenu } from './MobileMenu';

export function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [eventsDropdownOpen, setEventsDropdownOpen] = useState(false);
  const [dynamicEventLinks, setDynamicEventLinks] = useState<NavChild[] | null>(
    null
  );
  const dropdownRef = useRef<HTMLLIElement>(null);

  useEffect(() => {
    let active = true;
    fetch('/api/events')
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (active && Array.isArray(data?.events) && data.events.length > 0) {
          setDynamicEventLinks([
            ...data.events.map((ev: EventDetailData) => ({
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
      <header className="sticky top-0 z-50 w-full border-b border-line bg-white/95 backdrop-blur-md">
        <nav
          aria-label="Primary Navigation"
          className="container-ed flex h-16 items-center justify-between gap-6"
        >
          {/* Brand Logo */}
          <Link
            href="/"
            aria-label="Jay Media Management Pvt. Ltd. — Home"
            className="flex shrink-0 items-center transition-opacity hover:opacity-80"
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
                        'inline-flex items-center gap-1 py-2 text-sm transition-colors',
                        isActive
                          ? 'font-semibold text-ink'
                          : 'font-medium text-muted hover:text-ink'
                      )}
                    >
                      <span>{link.label}</span>
                      <ChevronDown
                        className={cn(
                          'h-3.5 w-3.5 transition-transform duration-150',
                          eventsDropdownOpen && 'rotate-180 text-ink'
                        )}
                      />
                    </button>

                    {eventsDropdownOpen && (
                      <div className="absolute left-0 top-full pt-1.5">
                        <div className="w-64 rounded-xl border border-line bg-white p-1.5 shadow-lg">
                          {(dynamicEventLinks || link.children).map((child) => (
                            <Link
                              key={child.href}
                              href={child.href}
                              onClick={() => setEventsDropdownOpen(false)}
                              className="block rounded-lg px-3 py-2 transition-colors hover:bg-paper-deep"
                            >
                              <span className="block text-sm font-medium text-ink">
                                {child.label}
                              </span>
                              {child.note && (
                                <span className="mt-0.5 block text-xs text-muted">
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
                      'inline-block py-2 text-sm transition-colors',
                      isActive
                        ? 'font-semibold text-ink'
                        : 'font-medium text-muted hover:text-ink'
                    )}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Right Action */}
          <div className="flex items-center gap-2.5">
            <Link
              href={navigation.cta.href}
              className="hidden rounded-lg bg-forest px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-accent-hover sm:inline-flex"
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
