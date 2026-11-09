'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import anime from 'animejs';
import { Menu } from 'lucide-react';
import { navigation } from '@/config/navigation';
import { cn } from '@/lib/utils';
import { useScrollPosition } from '@/hooks';
import { MobileMenu } from './MobileMenu';

export function Navbar() {
  const pathname = usePathname();
  const scrollY = useScrollPosition();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const hasAnimated = useRef(false);

  const scrolled = scrollY > 50;

  // Entrance animation
  useEffect(() => {
    if (hasAnimated.current) return;
    hasAnimated.current = true;

    const prefersReduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (prefersReduced || !navRef.current) return;

    anime({
      targets: navRef.current,
      opacity: [0, 1],
      translateY: [-16, 0],
      duration: 600,
      delay: 300,
      easing: 'easeOutCubic',
    });
  }, []);

  const toggleMobileMenu = useCallback(() => {
    setMobileMenuOpen((prev) => !prev);
  }, []);

  const closeMobileMenu = useCallback(() => {
    setMobileMenuOpen(false);
  }, []);

  return (
    <>
      <nav
        ref={navRef}
        className={cn(
          'fixed inset-x-0 top-0 z-50 opacity-0 transition-[background-color,box-shadow,border-color] duration-300 font-rubik',
          scrolled
            ? 'bg-white/95 shadow-md backdrop-blur-md border-b border-black/10'
            : 'bg-white/80 backdrop-blur-sm border-b border-black/5'
        )}
      >
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-8">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2.5 font-rubik text-xl font-bold tracking-tight text-[#101014] transition-opacity hover:opacity-90"
          >
            <span className="w-2.5 h-2.5 rounded-full bg-coral animate-pulse" />
            <span>JAY MEDIA</span>
          </Link>

          {/* Desktop nav links */}
          <ul className="hidden items-center gap-8 lg:flex">
            {navigation.links.map((link) => {
              const isActive = pathname === link.href;
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={cn(
                      'group relative font-rubik text-sm font-medium tracking-wide transition-colors duration-200',
                      isActive
                        ? 'text-coral font-semibold'
                        : 'text-[#101014]/75 hover:text-[#101014]'
                    )}
                  >
                    {link.label}
                    {/* Underline effect */}
                    <span
                      className={cn(
                        'absolute -bottom-1 left-0 h-0.5 bg-coral transition-all duration-300',
                        isActive
                          ? 'w-full'
                          : 'w-0 group-hover:w-full'
                      )}
                    />
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Desktop CTA + Mobile hamburger */}
          <div className="flex items-center gap-4">
            <Link
              href={navigation.cta.href}
              className="hidden rounded-[50px] bg-coral px-6 py-2.5 font-rubik text-sm font-medium text-white transition-all duration-300 hover:scale-105 hover:bg-coral-hover shadow-sm lg:inline-flex"
            >
              {navigation.cta.label}
            </Link>

            {/* Hamburger */}
            <button
              type="button"
              onClick={toggleMobileMenu}
              aria-label="Open menu"
              aria-expanded={mobileMenuOpen}
              className="inline-flex items-center justify-center rounded-[2px] p-2 text-[#101014] transition-colors hover:text-coral lg:hidden"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={closeMobileMenu}
      />
    </>
  );
}
