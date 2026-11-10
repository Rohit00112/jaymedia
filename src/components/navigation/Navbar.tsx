'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { ArrowUpRight, ChevronDown } from 'lucide-react';
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
              ? 'border-ink/20 bg-white/95 shadow-[0_12px_28px_-20px_rgba(12,20,16,0.2)] backdrop-blur-lg'
              : 'border-ink/15 bg-white'
          )}
        >
          <div className="container-ed flex h-[4.5rem] items-center justify-between gap-6">
            {/* Left Brand + Minimalist Location Anchor */}
            <div className="flex shrink-0 items-center gap-4">
              <Link
                href="/"
                aria-label="Jay Media Management Pvt. Ltd. — Home"
                className="flex shrink-0 items-center transition-opacity hover:opacity-80"
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

              <span
                className="hidden h-6 w-px bg-line-strong xl:block"
                aria-hidden="true"
              />

              <span className="hidden font-mono text-[10px] font-medium uppercase tracking-[0.16em] text-muted xl:block">
                Biratnagar &bull; Est. {siteConfig.established}
              </span>
            </div>

            {/* Center Crisp Architectural Navigation */}
            <ul className="hidden items-center gap-5 lg:flex xl:gap-7">
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
                          'relative inline-flex items-center gap-1 py-2 font-mono text-[11px] uppercase tracking-[0.12em] transition-colors',
                          isActive
                            ? 'font-semibold text-forest'
                            : 'font-medium text-ink-soft hover:text-forest'
                        )}
                      >
                        <span>{link.label}</span>
                        <ChevronDown
                          className={cn(
                            'h-3 w-3 transition-transform duration-200',
                            eventsDropdownOpen && 'rotate-180 text-forest'
                          )}
                        />
                        {isActive && (
                          <span
                            className="absolute inset-x-0 -bottom-px h-[2px] bg-forest"
                            aria-hidden="true"
                          />
                        )}
                      </button>

                      {eventsDropdownOpen && (
                        <div className="absolute left-0 top-full pt-2">
                          <div className="w-72 border border-ink/15 bg-white p-1 text-ink shadow-[0_24px_48px_-16px_rgba(12,20,16,0.18)]">
                            {link.children.map((child) => (
                              <Link
                                key={child.href}
                                href={child.href}
                                onClick={() => setEventsDropdownOpen(false)}
                                className="group flex flex-col border-b border-line px-3.5 py-2.5 last:border-b-0 transition-colors hover:bg-paper-deep"
                              >
                                <span className="flex items-center justify-between text-[12.5px] font-semibold text-ink group-hover:text-forest">
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
                        'link-sweep relative inline-block py-2 font-mono text-[11px] uppercase tracking-[0.12em] transition-colors',
                        isActive
                          ? 'font-semibold text-forest'
                          : 'font-medium text-ink-soft hover:text-forest'
                      )}
                      data-active={isActive ? 'true' : undefined}
                    >
                      {link.label}
                    </Link>
                  </li>
                );
              })}
            </ul>

            {/* Right Dual Architectural Actions */}
            <div className="flex items-center gap-3">
              <Link
                href="/#application-status"
                className="hidden font-mono text-[10.5px] font-semibold uppercase tracking-[0.14em] text-muted transition-colors hover:text-forest xl:inline-block"
              >
                Verify Pass
              </Link>

              <Link
                href={navigation.cta.href}
                className="hidden items-center gap-2 rounded-[2px] bg-forest px-5 py-2.5 font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-white transition-colors hover:bg-ink sm:inline-flex"
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
                className="inline-flex items-center gap-2 rounded-[2px] border border-ink/25 bg-paper-deep px-4 py-2 font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-ink transition-colors hover:bg-forest hover:text-white lg:hidden"
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
