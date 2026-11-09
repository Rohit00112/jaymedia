'use client';

import { useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import anime from 'animejs';
import { X, ArrowUpRight } from 'lucide-react';
import { navigation } from '@/config/navigation';
import { siteConfig } from '@/config/site';
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
  const footerRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  useEscapeKey(onClose);
  useBodyLock(isOpen);

  useEffect(() => {
    onClose();
  }, [pathname, onClose]);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (!overlayRef.current) return;

    if (isOpen) {
      previousFocusRef.current = document.activeElement as HTMLElement;
      overlayRef.current.style.display = 'flex';

      if (prefersReduced) {
        overlayRef.current.style.opacity = '1';
        linksRef.current?.querySelectorAll('li').forEach((li) => {
          (li as HTMLElement).style.opacity = '1';
          (li as HTMLElement).style.transform = 'none';
        });
        if (footerRef.current) footerRef.current.style.opacity = '1';
        closeButtonRef.current?.focus();
        return;
      }

      anime({
        targets: overlayRef.current,
        opacity: [0, 1],
        duration: 350,
        easing: 'easeOutCubic',
      });

      if (linksRef.current) {
        anime({
          targets: linksRef.current.querySelectorAll('li'),
          translateY: [36, 0],
          opacity: [0, 1],
          delay: anime.stagger(55, { start: 120 }),
          duration: 650,
          easing: 'easeOutCubic',
        });
      }

      if (footerRef.current) {
        anime({
          targets: footerRef.current,
          opacity: [0, 1],
          translateY: [20, 0],
          delay: 420,
          duration: 500,
          easing: 'easeOutCubic',
        });
      }

      setTimeout(() => closeButtonRef.current?.focus(), 80);
    } else {
      if (prefersReduced) {
        overlayRef.current.style.display = 'none';
        overlayRef.current.style.opacity = '0';
        previousFocusRef.current?.focus();
        return;
      }

      anime({
        targets: overlayRef.current,
        opacity: [1, 0],
        duration: 250,
        easing: 'easeInCubic',
        complete: () => {
          if (overlayRef.current) overlayRef.current.style.display = 'none';
          previousFocusRef.current?.focus();
        },
      });
    }
  }, [isOpen]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
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
  }, []);

  return (
    <div
      ref={overlayRef}
      role="dialog"
      aria-modal="true"
      aria-label="Mobile navigation"
      onKeyDown={handleKeyDown}
      className="fixed inset-0 z-[60] hidden flex-col bg-surface font-body text-paper"
      style={{ display: 'none', opacity: 0 }}
    >
      <div className="container-ed flex h-20 shrink-0 items-center justify-between border-b border-line">
        <Link href="/" onClick={onClose} className="flex items-center gap-3">
          <span className="display flex h-9 w-9 items-center justify-center bg-coral text-sm leading-none text-ink">
            JM
          </span>
          <span className="flex flex-col leading-none">
            <span className="display text-lg tracking-[0.04em]">JAY MEDIA</span>
            <span className="eyebrow mt-1.5 text-[8px] tracking-[0.28em] text-muted">
              Management Pvt. Ltd.
            </span>
          </span>
        </Link>

        <button
          ref={closeButtonRef}
          type="button"
          onClick={onClose}
          aria-label="Close menu"
          className="flex h-11 w-11 items-center justify-center border border-line text-paper transition-colors hover:border-coral hover:text-coral"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      <div className="container-ed flex flex-1 flex-col overflow-y-auto py-8">
        <ul ref={linksRef} className="my-auto divide-y divide-line border-y border-line">
          {navigation.links.map((link, index) => {
            const isActive =
              pathname === link.href ||
              (link.href !== '/' && pathname.startsWith(`${link.href}/`));

            return (
              <li key={link.href} className="opacity-0">
                <Link
                  href={link.href}
                  onClick={onClose}
                  aria-current={isActive ? 'page' : undefined}
                  className="group flex items-center justify-between py-4"
                >
                  <span className="flex items-baseline gap-4">
                    <span className="eyebrow text-faint">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span
                      className={cn(
                        'display text-[clamp(2rem,8vw,3.5rem)] transition-colors',
                        isActive
                          ? 'text-coral'
                          : 'text-paper group-hover:text-coral'
                      )}
                    >
                      {link.label}
                    </span>
                  </span>
                  <ArrowUpRight className="h-5 w-5 text-faint transition-colors group-hover:text-coral" />
                </Link>
              </li>
            );
          })}
        </ul>
      </div>

      <div
        ref={footerRef}
        className="container-ed shrink-0 border-t border-line py-6 opacity-0"
      >
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="text-xs leading-relaxed text-muted">
            <p>{siteConfig.location.address}</p>
            <p>
              {siteConfig.location.city}, {siteConfig.location.province}
            </p>
          </div>
          <div className="flex items-center gap-5 text-[10px] uppercase tracking-[0.2em] text-muted">
            <a
              href={siteConfig.social.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-paper"
            >
              Facebook
            </a>
            <a
              href={siteConfig.social.youtube}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-paper"
            >
              YouTube
            </a>
            <Link
              href={navigation.cta.href}
              onClick={onClose}
              className="text-coral"
            >
              {navigation.cta.label}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
