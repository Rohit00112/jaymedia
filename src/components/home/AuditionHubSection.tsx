'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  CheckCircle2,
  Loader2,
  Search,
  UserCheck,
  XCircle,
} from 'lucide-react';
import type { RegistrationRecord } from '@/lib/validations/registration';

export default function AuditionHubSection() {
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{
    searched: boolean;
    found: boolean;
    record?: RegistrationRecord;
    message?: string;
  }>({ searched: false, found: false });

  async function lookupCode(targetCode: string) {
    const clean = targetCode.trim().toUpperCase();
    if (!clean) return;

    setCode(clean);
    setLoading(true);

    try {
      const res = await fetch(
        `/api/registrations?code=${encodeURIComponent(clean)}`
      );
      const data = await res.json();

      if (res.ok && data.found) {
        setResult({ searched: true, found: true, record: data.record });
      } else {
        setResult({
          searched: true,
          found: false,
          message:
            data.message ||
            `No contestant registration found matching code "${clean}".`,
        });
      }
    } catch {
      setResult({
        searched: true,
        found: false,
        message: 'Unable to check registration right now. Please try again.',
      });
    } finally {
      setLoading(false);
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    lookupCode(code);
  }

  return (
    <section
      id="application-status"
      className="border-b border-line bg-white py-12 md:py-14"
    >
      <div className="container-ed">
        <div className="rounded-xl border border-line bg-paper-deep p-6 sm:p-8">
          <div className="grid items-center gap-6 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <p className="text-xs font-semibold uppercase tracking-wider text-forest">
                Contestant Auditions
              </p>
              <h2 className="mt-1 text-xl font-semibold text-ink">
                Check Application Status
              </h2>
              <p className="mt-1 text-sm leading-relaxed text-muted">
                Registered for Nepal Kids Idol, Miss Koshi, or Little Koshi?
                Enter your registration code to check your status.
              </p>
            </div>

            <div className="lg:col-span-7">
              <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-2.5 sm:flex-row"
              >
                <div className="relative flex-1">
                  <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
                  <input
                    type="text"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    placeholder="Enter registration code"
                    aria-label="Contestant registration code"
                    required
                    className="w-full rounded-lg border border-line-strong bg-white py-2.5 pl-10 pr-4 text-sm font-medium uppercase text-ink placeholder:normal-case placeholder:text-faint focus:border-forest focus:outline-none"
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="btn btn-primary shrink-0 px-6 disabled:opacity-60"
                >
                  {loading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span>Checking</span>
                    </>
                  ) : (
                    <span>Check Status</span>
                  )}
                </button>
              </form>
            </div>
          </div>

          {result.searched && result.found && result.record && (
            <div
              role="status"
              className="mt-5 grid items-center gap-4 rounded-lg border border-line bg-white p-4 sm:grid-cols-3"
            >
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-forest-soft text-forest">
                  <UserCheck className="h-4 w-4" />
                </span>
                <div>
                  <span className="block text-xs font-medium text-forest">
                    {result.record.userCode} &bull; {result.record.eventTitle}
                  </span>
                  <h4 className="text-base font-semibold text-ink">
                    {result.record.name}
                  </h4>
                </div>
              </div>

              <div className="text-xs text-muted">
                <span className="block text-faint">Audition Center</span>
                <p className="mt-0.5 font-medium text-ink">
                  {result.record.auditionHub}
                </p>
                <p>{result.record.school}</p>
              </div>

              <div className="sm:text-right">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-forest-soft px-3 py-1 text-xs font-medium text-forest">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  {result.record.status}
                </span>
              </div>
            </div>
          )}

          {result.searched && !result.found && (
            <div
              role="alert"
              className="mt-5 flex flex-wrap items-center justify-between gap-3 rounded-lg border border-danger/25 bg-white p-4 text-xs"
            >
              <div className="flex items-center gap-2 font-medium text-danger">
                <XCircle className="h-4 w-4 shrink-0" />
                <span>{result.message}</span>
              </div>
              <Link href="/register" className="btn btn-primary py-1.5 text-xs">
                Register Online
              </Link>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
