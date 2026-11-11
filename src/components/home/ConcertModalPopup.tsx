'use client';

import { useEffect, useState, useSyncExternalStore } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';
import Link from 'next/link';
import { X, Calendar, MapPin, ArrowUpRight, Ticket } from 'lucide-react';
import ConcertCountdown from '@/components/shared/ConcertCountdown';

const emptySubscribe = () => () => {};

// Module-level flag: persists across client-side page transitions in Next.js,
// so switching from another page back to Home will NOT re-trigger the popup.
// Resets on full page reload or initial website visit.
let hasShownInSession = false;

export default function ConcertModalPopup() {
  const isClient = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = () => {
    hasShownInSession = true;
    setIsOpen(false);
  };

  useEffect(() => {
    // Only open on the first time opening the home screen; do not re-open when switching pages
    if (hasShownInSession) return;

    const timer = setTimeout(() => {
      hasShownInSession = true;
      setIsOpen(true);
    }, 500);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // Lock body scroll while modal is visible in viewport
  useEffect(() => {
    if (isOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [isOpen]);

  if (!isClient || !isOpen) return null;

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="concert-popup-title"
      className="fixed inset-0 z-[99999] flex items-center justify-center p-4 sm:p-6"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-ink/75 backdrop-blur-md transition-opacity duration-300"
        onClick={handleClose}
        aria-hidden="true"
      />

      {/* Modal Container */}
      <div className="relative z-10 w-full max-w-3xl overflow-hidden rounded-2xl border border-line bg-white shadow-2xl transition-all duration-300 max-h-[92vh] flex flex-col md:flex-row animate-in fade-in zoom-in-95 duration-200">
        {/* Close Button */}
        <button
          type="button"
          onClick={handleClose}
          className="absolute right-3.5 top-3.5 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-ink/65 text-white backdrop-blur-md transition-colors hover:bg-ink focus:outline-none"
          aria-label="Close announcement"
        >
          <X className="h-4 w-4" />
        </button>

        {/* Visual Column / Poster */}
        <div className="relative h-60 w-full shrink-0 overflow-hidden bg-ink sm:h-64 md:h-auto md:w-5/12">
          <Image
            src="/images/official/atif-aslam-poster.jpg"
            alt="Atif Aslam Live at Eastern Echoes — Jay Media Management"
            fill
            sizes="(max-width: 768px) 100vw, 380px"
            className="poster-mobile-focus"
            priority
          />
        </div>

        {/* Content Column */}
        <div className="flex flex-1 flex-col justify-between overflow-y-auto p-5 sm:p-7 text-ink">
          <div>
            <h2
              id="concert-popup-title"
              className="text-xl font-bold tracking-tight text-ink sm:text-3xl"
            >
              Atif Aslam Live in Nepal
            </h2>
            <p className="mt-1 text-[11px] font-semibold uppercase tracking-wider text-forest sm:text-xs">
              Eastern Echoes &bull; Live in Concert
            </p>

            <p className="mt-2.5 text-xs leading-relaxed text-muted sm:text-sm">
              Global vocal maestro Atif Aslam performs his legendary romantic,
              Sufi, and Bollywood anthems live with his international touring
              band at Itahari Stadium.
            </p>

            <div className="mt-4 space-y-2 rounded-xl border border-line bg-paper-deep p-3.5 text-xs text-ink-soft">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 shrink-0 text-forest" />
                <span className="font-semibold text-ink">
                  Saturday, Dec 19, 2026 (Poush 4) • 6:00 PM Onwards
                </span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 shrink-0 text-forest" />
                <span>Itahari Stadium (Itahari Rangasala), Koshi Province</span>
              </div>
            </div>

            {/* Live Countdown */}
            <div className="mt-4">
              <ConcertCountdown
                targetDate="2026-12-19T18:00:00+05:45"
                label="Countdown to Showtime"
                compact
              />
            </div>
          </div>

          <div className="mt-6 border-t border-line pt-4">
            <div className="flex flex-col gap-2.5 sm:flex-row">
              <a
                href="https://events.khalti.com/events/ET26BJD3F93W"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary flex-1 justify-center py-2.5 text-xs font-semibold shadow-sm"
              >
                <Ticket className="h-4 w-4" />
                <span>Buy Tickets on Khalti</span>
                <ArrowUpRight className="h-3.5 w-3.5" />
              </a>

              <Link
                href="/events/atif-aslam-live-in-nepal"
                onClick={handleClose}
                className="btn btn-outline justify-center py-2.5 text-xs font-semibold"
              >
                <span>Concert Details</span>
              </Link>
            </div>

            <div className="mt-3.5 flex items-center justify-between text-[11px] text-muted">
              <span>
                Official Ticketing: <strong className="text-ink">Khalti</strong>
              </span>
              <Link
                href="/contact?topic=concert-sponsorship"
                onClick={handleClose}
                className="inline-flex items-center gap-1 rounded-md border border-forest/25 bg-forest-soft px-2.5 py-1 text-[11px] font-semibold text-forest transition-colors hover:bg-forest hover:text-white"
              >
                <span>Call for Sponsors</span>
                <span>&rarr;</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}

