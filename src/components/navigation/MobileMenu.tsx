'use client';

import { useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { X, ArrowUpRight, Mail, Phone } from 'lucide-react';
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
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  useEscapeKey(onClose, isOpen);
  useBodyLock(isOpen);

  useEffect(() => {
    if (!isOpen) return;

    previousFocusRef.current = document.activeElement as HTMLElement;
    closeButtonRef.current?.focus();

    return () => {
      previousFocusRef.current?.focus();
    };
  }, [isOpen]);

  const handleKeyDown = useCallback((event: React.KeyboardEvent) => {
    if (event.key !== 'Tab' || !overlayRef.current) return;

    const focusable = overlayRef.current.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
    );

    if (focusable.length === 0) return;

    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }, []);

  if (!isOpen) return null;

  return (
    <div
      id="mobile-menu"
      ref={overlayRef}
      data-lenis-prevent
      role="dialog"
      aria-modal="true"
      aria-label="Mobile navigation"
      onKeyDown={handleKeyDown}
      className="fixed inset-0 z-[70] flex min-h-[100svh] flex-col overflow-y-auto overscroll-contain bg-paper text-ink"
    >
      <div className="container-ed flex h-[4.5rem] shrink-0 items-center justify-between border-b border-line bg-white">
        <Link
          href="/"
          onClick={onClose}
          className="flex items-center gap-3"
        >
          <Image
            src={siteConfig.logo}
            alt="Jay Media Management"
            width={118}
            height={48}
            className="h-8 w-auto object-contain"
          />
        </Link>

        <button
          ref={closeButtonRef}
          type="button"
          onClick={onClose}
          aria-label="Close menu"
          className="group flex items-center gap-2 rounded-[2px] border border-line-strong bg-paper-deep px-3.5 py-2 text-ink transition-colors hover:bg-forest hover:text-white"
        >
          <span className="font-mono text-[10px] uppercase tracking-[0.16em]">
            Close
          </span>
          <X className="h-4 w-4 transition-transform duration-300 group-hover:rotate-90" />
        </button>
      </div>

      <div className="container-ed flex flex-1 flex-col py-6">
        <div className="mb-4 flex items-center justify-between border-b border-line pb-3">
          <span className="eyebrow text-accent">Directory</span>
          <Link
            href={navigation.cta.href}
            onClick={onClose}
            className="inline-flex items-center gap-1.5 rounded-[2px] bg-forest px-4 py-1.5 font-mono text-[11px] font-semibold uppercase tracking-wider text-white"
          >
            <span>{navigation.cta.label}</span>
            <ArrowUpRight className="h-3.5 w-3.5 text-gold" />
          </Link>
        </div>

        <ul className="my-auto divide-y divide-line">
          {navigation.links.map((link, index) => {
            const isActive =
              pathname === link.href ||
              (link.href !== '/' && pathname.startsWith(`${link.href}/`));

            return (
              <li
                key={link.href}
                className="menu-item"
                style={{ animationDelay: `${60 + index * 35}ms` }}
              >
                <Link
                  href={link.href}
                  onClick={onClose}
                  aria-current={isActive ? 'page' : undefined}
                  className="group flex items-center justify-between gap-5 py-3.5"
                >
                  <span className="flex items-baseline gap-4">
                    <span className="font-mono text-[10px] tracking-[0.16em] text-faint">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span
                      className={cn(
                        'display text-[clamp(1.75rem,7vw,3rem)] leading-[1.05] transition-colors duration-300',
                        isActive
                          ? 'text-accent'
                          : 'text-ink group-hover:text-accent'
                      )}
                    >
                      {link.label}
                    </span>
                  </span>
                  <ArrowUpRight className="h-5 w-5 shrink-0 text-faint transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" />
                </Link>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="container-ed shrink-0 border-t border-line bg-sand/70 py-5">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="eyebrow text-accent">Biratnagar Office</span>
            <p className="mt-1.5 max-w-xs text-sm leading-relaxed text-ink-soft">
              {siteConfig.location.address}, {siteConfig.location.city},{' '}
              {siteConfig.location.province}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-[10px] uppercase tracking-[0.14em] text-ink-soft">
            <a
              href={`tel:${siteConfig.contact.phone}`}
              className="inline-flex items-center gap-1.5 transition-colors hover:text-accent"
            >
              <Phone className="h-3.5 w-3.5 text-accent" />
              {siteConfig.contact.phone}
            </a>
            <a
              href={`mailto:${siteConfig.contact.email}`}
              className="inline-flex items-center gap-1.5 transition-colors hover:text-accent"
            >
              <Mail className="h-3.5 w-3.5 text-accent" />
              Email
            </a>
            <a
              href={siteConfig.social.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-accent"
            >
              Facebook
            </a>
            <a
              href={siteConfig.social.youtube}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-accent"
            >
              YouTube
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
