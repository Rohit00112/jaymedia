'use client';

import { useState, useCallback } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu } from 'lucide-react';
import { navigation } from '@/config/navigation';
import { cn } from '@/lib/utils';
import { useScrollPosition } from '@/hooks';
import { MobileMenu } from './MobileMenu';

export function Navbar() {
  const pathname = usePathname();
  const scrollY = useScrollPosition();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrolled = scrollY > 40;

  const toggleMobileMenu = useCallback(() => {
    setMobileMenuOpen((prev) => !prev);
  }, []);

  const closeMobileMenu = useCallback(() => {
    setMobileMenuOpen(false);
  }, []);

  return (
    <>
      <nav
        className={cn(
          'nav-enter fixed inset-x-0 top-0 z-50 font-body transition-[background-color,box-shadow,border-color,backdrop-filter] duration-500',
          scrolled
            ? 'border-b border-line bg-surface/90 shadow-[0_18px_50px_rgba(0,0,0,0.45)] backdrop-blur-xl'
            : 'border-b border-transparent bg-gradient-to-b from-black/60 to-transparent'
        )}
      >
        <div className="container-ed flex h-20 items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            aria-label="Jay Media Management — Home"
            className="group flex items-center gap-3"
          >
            <span className="display flex h-9 w-9 items-center justify-center bg-coral text-sm leading-none text-ink transition-colors duration-300 group-hover:bg-bone">
              JM
            </span>
            <span className="flex flex-col leading-none">
              <span className="display text-lg tracking-[0.04em] text-paper">
                JAY MEDIA
              </span>
              <span className="eyebrow mt-1.5 text-[8px] tracking-[0.28em] text-muted">
                Management Pvt. Ltd.
              </span>
            </span>
          </Link>

          {/* Desktop nav links */}
          <ul className="hidden items-center gap-7 xl:flex">
            {navigation.links
              .filter((link) => link.href !== '/contact')
              .map((link, index) => {
                const isActive =
                  pathname === link.href ||
                  (link.href !== '/' && pathname.startsWith(`${link.href}/`));

                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      aria-current={isActive ? 'page' : undefined}
                      className={cn(
                        'group relative flex items-baseline gap-1.5 py-2 text-[11px] font-medium uppercase tracking-[0.18em] transition-colors duration-200',
                        isActive
                          ? 'text-paper'
                          : 'text-paper/60 hover:text-paper'
                      )}
                    >
                      <span
                        className={cn(
                          'text-[8px] tabular-nums transition-colors',
                          isActive ? 'text-coral' : 'text-faint'
                        )}
                      >
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      {link.label}
                      <span
                        className={cn(
                          'absolute -bottom-0.5 left-0 h-px bg-coral transition-all duration-300',
                          isActive ? 'w-full' : 'w-0 group-hover:w-full'
                        )}
                      />
                    </Link>
                  </li>
                );
              })}
          </ul>

          {/* CTA + Mobile hamburger */}
          <div className="flex items-center gap-3">
            <Link
              href={navigation.cta.href}
              className="btn btn-outline hidden min-h-10 px-5 py-3 text-[10px] xl:inline-flex"
            >
              {navigation.cta.label}
            </Link>

            <button
              type="button"
              onClick={toggleMobileMenu}
              aria-label="Open menu"
              aria-expanded={mobileMenuOpen}
              className="inline-flex h-11 w-11 items-center justify-center border border-line text-paper transition-colors hover:border-coral hover:text-coral xl:hidden"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </nav>

      <MobileMenu isOpen={mobileMenuOpen} onClose={closeMobileMenu} />
    </>
  );
}
