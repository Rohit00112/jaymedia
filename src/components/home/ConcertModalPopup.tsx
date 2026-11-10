'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { X, Calendar, MapPin, ArrowUpRight, Ticket } from 'lucide-react';
import ConcertCountdown from '@/components/shared/ConcertCountdown';

export default function ConcertModalPopup() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Open popup shortly after page load / reload
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 600);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="concert-popup-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-ink/75 backdrop-blur-sm transition-opacity duration-300"
        onClick={() => setIsOpen(false)}
        aria-hidden="true"
      />

      {/* Modal Container */}
      <div className="relative z-10 w-full max-w-3xl overflow-hidden rounded-2xl border border-line bg-white shadow-2xl transition-all duration-300 max-h-[92vh] flex flex-col md:flex-row">
        {/* Close Button */}
        <button
          type="button"
          onClick={() => setIsOpen(false)}
          className="absolute right-3.5 top-3.5 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-ink/60 text-white backdrop-blur-md transition-colors hover:bg-ink focus:outline-none"
          aria-label="Close announcement"
        >
          <X className="h-4 w-4" />
        </button>

        {/* Visual Column / Poster */}
        <div className="relative h-56 w-full shrink-0 overflow-hidden bg-ink md:h-auto md:w-5/12">
          <Image
            src="/images/official/atif-aslam-poster.jpg"
            alt="Atif Aslam Live at Eastern Echoes — Jay Media Management"
            fill
            sizes="(max-width: 768px) 100vw, 360px"
            className="object-cover object-top"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-transparent md:hidden" />
          <div className="absolute bottom-3 left-3 right-3 text-white md:hidden">
            <span className="inline-block rounded bg-forest px-2 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-wider text-white">
              Headliner
            </span>
            <p className="mt-1 text-sm font-bold">Atif Aslam Live in Nepal</p>
          </div>
        </div>

        {/* Content Column */}
        <div className="flex flex-1 flex-col justify-between overflow-y-auto p-5 sm:p-7 text-ink">
          <div>
            <div className="flex items-center gap-2 text-forest">
              <span className="h-2 w-2 rounded-full bg-forest animate-pulse" />
              <span className="font-mono text-xs font-semibold uppercase tracking-wider">
                Flagship Concert • Eastern Echoes
              </span>
            </div>

            <h2
              id="concert-popup-title"
              className="mt-2 text-2xl font-bold tracking-tight text-ink sm:text-3xl"
            >
              Atif Aslam Live in Nepal
            </h2>

            <p className="mt-2 text-xs text-muted leading-relaxed sm:text-sm">
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
                onClick={() => setIsOpen(false)}
                className="btn btn-outline justify-center py-2.5 text-xs font-semibold"
              >
                <span>Concert Details</span>
              </Link>
            </div>

            <p className="mt-3 text-center text-[10px] text-muted">
              Official Digital Ticketing Partner: <strong className="text-ink">Khalti by IME</strong>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
