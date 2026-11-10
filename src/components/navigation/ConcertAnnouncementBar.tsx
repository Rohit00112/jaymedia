'use client';

import { useState, useSyncExternalStore } from 'react';
import { X, ArrowRight, Ticket } from 'lucide-react';

const DISMISS_KEY = 'jmm_concert_banner_dismissed';
const emptySubscribe = () => () => {};

export function ConcertAnnouncementBar() {
  const isServerDismissed = useSyncExternalStore(
    emptySubscribe,
    () => {
      try {
        return sessionStorage.getItem(DISMISS_KEY) === 'true';
      } catch {
        return false;
      }
    },
    () => true // SSR fallback to prevent layout shift before client checks
  );

  const [manuallyDismissed, setManuallyDismissed] = useState(false);

  const handleDismiss = () => {
    setManuallyDismissed(true);
    try {
      sessionStorage.setItem(DISMISS_KEY, 'true');
    } catch {
      // Ignore storage errors
    }
  };

  if (isServerDismissed || manuallyDismissed) return null;

  return (
    <div className="relative border-b border-emerald-900/20 bg-forest text-white">
      <div className="container-ed flex items-center justify-between py-2 text-xs">
        <div className="flex flex-1 items-center justify-center gap-2 pr-6 text-center sm:pr-0">
          <Ticket className="hidden h-3.5 w-3.5 text-emerald-300 sm:inline" />
          <p className="font-medium text-white/95">
            <strong className="font-semibold text-white">Atif Aslam Live in Nepal</strong>
            <span className="mx-1.5 hidden sm:inline">&mdash;</span>
            <span className="hidden sm:inline">Saturday, Dec 19, 2026 at Itahari Stadium</span>
            <span className="mx-1.5 text-white/60">•</span>
            <span>Official Digital Tickets on Khalti</span>
          </p>
          <a
            href="https://events.khalti.com/events/ET26BJD3F93W"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 font-semibold text-white underline decoration-white/60 underline-offset-2 transition-colors hover:decoration-white"
          >
            <span>Book Now</span>
            <ArrowRight className="h-3 w-3" />
          </a>
        </div>

        <button
          type="button"
          onClick={handleDismiss}
          aria-label="Dismiss banner"
          className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-white/70 transition-colors hover:text-white"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}
