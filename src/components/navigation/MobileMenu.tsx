'use client';

import { useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import anime from 'animejs';
import { X } from 'lucide-react';
import { navigation } from '@/config/navigation';
import { cn } from '@/lib/utils';
import { useEscapeKey, useBodyLock } from '@/hooks';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const pathname = usePathname();
  const overlayRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<HTMLUListElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  // Close on escape
  useEscapeKey(onClose);

  // Lock body scroll when open
  useBodyLock(isOpen);

  // Close on route change
  useEffect(() => {
    onClose();
  }, [pathname, onClose]);

  // Entrance / exit animations
  useEffect(() => {
    const prefersReduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (!overlayRef.current) return;

    if (isOpen) {
      // Save previous focus for trap restoration
      previousFocusRef.current = document.activeElement as HTMLElement;

      overlayRef.current.style.display = 'flex';

      if (prefersReduced) {
        overlayRef.current.style.opacity = '1';
        if (linksRef.current) {
          Array.from(linksRef.current.children).forEach((child) => {
            (child as HTMLElement).style.opacity = '1';
          });
        }
        if (ctaRef.current) ctaRef.current.style.opacity = '1';
        closeButtonRef.current?.focus();
        return;
      }

      // Overlay slides in from right
      anime({
        targets: overlayRef.current,
        translateX: ['100%', '0%'],
        opacity: [0, 1],
        duration: 400,
        easing: 'easeOutCubic',
      });

      // Links stagger in
      if (linksRef.current) {
        anime({
          targets: linksRef.current.children,
          translateX: [40, 0],
          opacity: [0, 1],
          delay: anime.stagger(60, { start: 200 }),
          duration: 400,
          easing: 'easeOutCubic',
        });
      }

      // CTA fades in
      if (ctaRef.current) {
        anime({
          targets: ctaRef.current,
          opacity: [0, 1],
          translateY: [20, 0],
          delay: 500,
          duration: 400,
          easing: 'easeOutCubic',
        });
      }

      // Focus the close button after animation starts
      setTimeout(() => closeButtonRef.current?.focus(), 100);
    } else {
      if (prefersReduced) {
        overlayRef.current.style.display = 'none';
        overlayRef.current.style.opacity = '0';
        previousFocusRef.current?.focus();
        return;
      }

      // Reverse exit animation
      anime({
        targets: overlayRef.current,
        translateX: ['0%', '100%'],
        opacity: [1, 0],
        duration: 300,
        easing: 'easeInCubic',
        complete: () => {
          if (overlayRef.current) {
            overlayRef.current.style.display = 'none';
          }
          previousFocusRef.current?.focus();
        },
      });
    }
  }, [isOpen]);

  // Basic focus trap
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key !== 'Tab' || !overlayRef.current) return;

      const focusable = overlayRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
      );

      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    },
    []
  );

  return (
    <div
      ref={overlayRef}
      role="dialog"
      aria-modal="true"
      aria-label="Mobile navigation"
      onKeyDown={handleKeyDown}
      className="fixed inset-0 z-[60] hidden flex-col bg-white text-[#101014] font-rubik lg:hidden"
      style={{ display: 'none', opacity: 0 }}
    >
      {/* Header with close button */}
      <div className="flex h-20 items-center justify-between px-6 border-b border-black/10">
        <span className="font-rubik text-xl font-bold tracking-tight text-[#101014] flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-coral animate-pulse" />
          JAY MEDIA
        </span>
        <button
          ref={closeButtonRef}
          type="button"
          onClick={onClose}
          aria-label="Close menu"
          className="rounded-[2px] p-2 text-[#101014] transition-colors hover:text-coral"
        >
          <X className="h-6 w-6" />
        </button>
      </div>

      {/* Nav links */}
      <ul
        ref={linksRef}
        className="flex flex-1 flex-col items-center justify-center gap-6"
      >
        {navigation.links.map((link) => {
          const isActive = pathname === link.href;
          return (
            <li key={link.href} className="opacity-0">
              <Link
                href={link.href}
                onClick={onClose}
                className={cn(
                  'font-rubik text-2xl font-bold uppercase tracking-wider transition-colors duration-200',
                  isActive
                    ? 'text-coral'
                    : 'text-[#101014] hover:text-coral'
                )}
              >
                {link.label}
              </Link>
            </li>
          );
        })}
      </ul>

      {/* Bottom section: CTA + socials */}
      <div ref={ctaRef} className="flex flex-col items-center gap-6 px-6 pb-12 opacity-0">
        <Link
          href={navigation.cta.href}
          onClick={onClose}
          className="inline-flex w-full max-w-xs items-center justify-center rounded-[50px] bg-coral px-8 py-4 font-rubik text-sm uppercase tracking-widest font-semibold text-white transition-all duration-200 hover:scale-105 hover:bg-coral-hover"
        >
          {navigation.cta.label}
        </Link>

        {/* Social links */}
        {navigation.socials && navigation.socials.length > 0 && (
          <div className="flex items-center gap-6">
            {navigation.socials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-rubik uppercase tracking-wider text-[#4A4A52] transition-colors hover:text-[#101014]"
              >
                {social.label}
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
