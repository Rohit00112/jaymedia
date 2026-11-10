'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { AlertCircle, RefreshCw, LayoutDashboard, ArrowLeft } from 'lucide-react';

export default function AdminError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('[Admin Console Error]:', error);
  }, [error]);

  return (
    <div className="flex min-h-[60vh] items-center justify-center py-12">
      <div className="w-full max-w-md rounded-2xl border border-line bg-paper-deep p-8 text-center shadow-sm">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-accent-soft text-accent">
          <AlertCircle className="h-6 w-6" />
        </div>

        <span className="mt-4 inline-block font-mono text-[10px] font-semibold uppercase tracking-wider text-muted">
          Studio CMS Exception
        </span>

        <h1 className="mt-2 text-xl font-semibold text-ink">
          Failed to load admin module
        </h1>

        <p className="mt-2 text-xs leading-relaxed text-muted">
          An error occurred while fetching or processing studio records.
          Verify your network and Firebase connection.
        </p>

        {error?.digest && (
          <div className="mt-3 inline-block rounded border border-line bg-card px-2.5 py-1 font-mono text-[10px] text-muted">
            Digest: {error.digest}
          </div>
        )}

        <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:justify-center">
          <button
            type="button"
            onClick={() => reset()}
            className="btn btn-primary justify-center text-xs"
          >
            <RefreshCw className="h-3.5 w-3.5" />
            <span>Retry Action</span>
          </button>
          <Link
            href="/admin"
            className="btn btn-outline justify-center text-xs"
          >
            <LayoutDashboard className="h-3.5 w-3.5" />
            <span>Overview</span>
          </Link>
        </div>

        <div className="mt-6 border-t border-line pt-4">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs text-muted hover:text-ink"
          >
            <ArrowLeft className="h-3 w-3" />
            <span>Return to public website</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

