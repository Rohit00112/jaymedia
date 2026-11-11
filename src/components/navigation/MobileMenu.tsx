'use client';

import { useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { X, Mail, Phone, Ticket, ArrowUpRight } from 'lucide-react';
import { navigation } from '@/config/navigation';
import { siteConfig } from '@/config/site';
import { cn, formatPhoneIntl, phoneTelHref } from '@/lib/utils';
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
      role="dialog"
      aria-modal="true"
      aria-label="Mobile navigation"
      onKeyDown={handleKeyDown}
      className="animate-fade-up fixed inset-0 z-[70] flex flex-col overflow-y-auto bg-white text-ink"
    >
      <div className="container-ed flex h-16 shrink-0 items-center justify-between border-b border-line">
        <Link href="/" onClick={onClose} className="flex items-center">
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
          className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-line text-ink transition-colors hover:bg-paper-deep"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      <div className="container-ed flex flex-1 flex-col justify-between py-6">
        <div>
          {/* Flagship Concert Card */}
          <div className="mb-6 rounded-xl border border-forest/20 bg-forest-soft/70 p-4">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-forest">
              Flagship Concert • Itahari Stadium
            </p>
            <h3 className="mt-1 text-base font-bold text-ink">
              Eastern Echoes • Atif Aslam Live
            </h3>
            <p className="mt-0.5 text-xs text-muted">
              Saturday, Dec 19, 2026 (Poush 4) • 6:00 PM Onwards
            </p>

            <div className="mt-3 flex items-center gap-2.5">
              <a
                href="https://events.khalti.com/events/ET26BJD3F93W"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary flex-1 justify-center py-2 text-xs font-semibold shadow-xs"
              >
                <Ticket className="h-3.5 w-3.5" />
                <span>Buy on Khalti</span>
                <ArrowUpRight className="h-3 w-3" />
              </a>

              <Link
                href="/events/atif-aslam-live-in-nepal"
                onClick={onClose}
                className="btn btn-outline flex-1 justify-center py-2 text-xs font-semibold"
              >
                Event Details
              </Link>
            </div>
          </div>

          <ul className="divide-y divide-line">
          {navigation.links.map((link) => {
            const isActive =
              pathname === link.href ||
              (link.href !== '/' && pathname.startsWith(`${link.href}/`));

            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={onClose}
                  aria-current={isActive ? 'page' : undefined}
                  className={cn(
                    'block py-3.5 text-base transition-all duration-150 hover:pl-1.5',
                    isActive
                      ? 'font-semibold text-forest'
                      : 'font-medium text-ink hover:text-forest'
                  )}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="mt-8 space-y-6 border-t border-line pt-6">
          <Link
            href={navigation.cta.href}
            onClick={onClose}
            className="btn btn-primary w-full"
          >
            {navigation.cta.label}
          </Link>

          <div className="space-y-2 text-xs text-muted">
            <p className="font-medium text-ink">
              {siteConfig.location.address}, {siteConfig.location.city}
            </p>
            <div className="flex flex-wrap items-center gap-4 pt-1">
              <a
                href={phoneTelHref(siteConfig.contact.phone)}
                className="inline-flex items-center gap-1.5 hover:text-ink"
              >
                <Phone className="h-3.5 w-3.5" />
                {formatPhoneIntl(siteConfig.contact.phone)}
              </a>
              <a
                href={`mailto:${siteConfig.contact.email}`}
                className="inline-flex items-center gap-1.5 hover:text-ink"
              >
                <Mail className="h-3.5 w-3.5" />
                {siteConfig.contact.email}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
