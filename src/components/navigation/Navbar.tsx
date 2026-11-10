'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { ArrowUpRight, ChevronDown } from 'lucide-react';
import { navigation, type NavChild } from '@/config/navigation';
import type { EventDetailData } from '@/config/events-data';
import { siteConfig } from '@/config/site';
import { cn } from '@/lib/utils';
import { useScrollPosition, useEscapeKey } from '@/hooks';
import { MobileMenu } from './MobileMenu';

export function Navbar() {
  const pathname = usePathname();
  const scrollY = useScrollPosition();
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
              note: `${ev.seasonOrYear} • ${ev.eligibility}`,
            })),
            {
              label: 'All Productions',
              href: '/events',
              note: 'Full Event Archive',
            },
          ]);
        }
      })
      .catch(() => {});
    return () => {
      active = false;
    };
  }, []);

  const scrolled = scrollY > 24;

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
      <header className="sticky top-0 z-50 w-full">
        <nav
          aria-label="Primary Navigation"
          className={cn(
            'border-b transition-all duration-300',
            scrolled
              ? 'border-line bg-white/95 shadow-xs backdrop-blur-lg'
              : 'border-line bg-white'
          )}
        >
          <div className="container-ed flex h-[4.5rem] items-center justify-between gap-6">
            {/* Brand Logo */}
            <Link
              href="/"
              aria-label="Jay Media Management Pvt. Ltd. — Home"
              className="flex shrink-0 items-center transition-opacity hover:opacity-85"
            >
              <Image
                src={siteConfig.logo}
                alt="Jay Media Management Pvt. Ltd."
                width={132}
                height={52}
                priority
                className="h-9 w-auto object-contain"
              />
            </Link>

            {/* Primary Navigation Links */}
            <ul className="hidden items-center gap-7 lg:flex">
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
                          'relative inline-flex items-center gap-1 py-2 text-sm transition-colors',
                          isActive
                            ? 'font-semibold text-forest'
                            : 'font-medium text-ink-soft hover:text-forest'
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
                          <div className="w-72 overflow-hidden rounded-lg border border-line bg-white p-1.5 text-ink shadow-lg">
                            {(dynamicEventLinks || link.children).map(
                              (child) => (
                                <Link
                                  key={child.href}
                                  href={child.href}
                                  onClick={() => setEventsDropdownOpen(false)}
                                  className="group flex flex-col rounded-md px-3.5 py-2.5 transition-colors hover:bg-paper-deep"
                                >
                                  <span className="flex items-center justify-between text-sm font-semibold text-ink group-hover:text-forest">
                                    {child.label}
                                    <ArrowUpRight className="h-3.5 w-3.5 text-forest opacity-60 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100" />
                                  </span>
                                  {child.note && (
                                    <span className="mt-0.5 text-xs text-muted">
                                      {child.note}
                                    </span>
                                  )}
                                </Link>
                              )
                            )}
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
                        'relative inline-block py-2 text-sm transition-colors',
                        isActive
                          ? 'font-semibold text-forest'
                          : 'font-medium text-ink-soft hover:text-forest'
                      )}
                    >
                      {link.label}
                    </Link>
                  </li>
                );
              })}
            </ul>

            {/* Right Action */}
            <div className="flex items-center gap-3">
              <Link
                href={navigation.cta.href}
                className="hidden items-center gap-2 rounded-md bg-forest px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.08em] text-white transition-colors hover:bg-ink sm:inline-flex"
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
                className="inline-flex items-center gap-2 rounded-md border border-line-strong bg-paper-deep px-4 py-2 text-xs font-semibold uppercase tracking-[0.08em] text-ink transition-colors hover:bg-forest hover:text-white lg:hidden"
              >
                <span>Menu</span>
                <span className="flex flex-col gap-1">
                  <span className="h-[1.5px] w-4 bg-current" />
                  <span className="h-[1.5px] w-3 bg-current" />
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
