'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';
import { Navbar } from '@/components/navigation';
import { Footer } from '@/components/footer';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log unexpected runtime errors to browser console
    console.error('[Application Runtime Error]:', error);
  }, [error]);

  return (
    <>
      <Navbar />
      <main className="flex min-h-[70vh] items-center justify-center bg-paper px-4 py-16 text-ink">
        <div className="w-full max-w-lg rounded-2xl border border-line bg-paper-deep p-8 text-center shadow-sm sm:p-10">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-500/10 text-amber-700">
            <AlertTriangle className="h-7 w-7" />
          </div>

          <span className="mt-5 inline-block font-mono text-[11px] font-semibold uppercase tracking-wider text-muted">
            500 • Production Exception
          </span>

          <h1 className="mt-2 text-2xl font-bold tracking-tight text-ink sm:text-3xl">
            An unexpected error occurred.
          </h1>

          <p className="mt-3 text-sm text-muted leading-relaxed">
            We encountered an unexpected issue while rendering this page. Our
            technical team has been notified.
          </p>

          {error?.digest && (
            <div className="mt-4 inline-block rounded-md bg-sand/70 px-3 py-1 font-mono text-[11px] text-muted">
              Reference: <span className="font-semibold text-ink">{error.digest}</span>
            </div>
          )}

          <div className="mt-8 flex flex-col gap-2.5 sm:flex-row sm:justify-center">
            <button
              type="button"
              onClick={() => reset()}
              className="btn btn-primary justify-center"
            >
              <RefreshCw className="h-4 w-4" />
              <span>Try Again</span>
            </button>
            <Link href="/" className="btn btn-outline justify-center">
              <Home className="h-4 w-4" />
              <span>Return Home</span>
            </Link>
          </div>

          <div className="mt-6 border-t border-line pt-4 text-xs text-muted">
            Need immediate assistance?{' '}
            <Link
              href="/contact"
              className="font-medium text-forest underline hover:text-ink"
            >
              Contact our team
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
