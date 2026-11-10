'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  CheckCircle2,
  FileSearch,
  Loader2,
  MapPin,
  Search,
  UserCheck,
  XCircle,
} from 'lucide-react';
import type { RegistrationRecord } from '@/lib/validations/registration';

const DEMO_CODES = ['NKI-2025-101', 'NKI-2025-102', 'NKI-2025-103'] as const;

export default function ApplicationStatusSection() {
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
            `No applicant record found for "${clean}". Please verify your code.`,
        });
      }
    } catch {
      setResult({
        searched: true,
        found: false,
        message: 'Unable to check status right now. Please try again.',
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
      className="border-b border-line bg-white py-12 md:py-16"
    >
      <div className="container-ed">
        <div className="rounded-[12px] border border-line bg-paper p-6 shadow-xs sm:p-8 md:p-10">
          <div className="grid items-center gap-8 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <span className="inline-flex items-center gap-2 font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-forest">
                <FileSearch className="h-3.5 w-3.5" />
                Contestant Status Tracker
              </span>
              <h2 className="display mt-2 text-2xl font-bold text-ink sm:text-3xl">
                Filter Application Status
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                Enter your official Contestant User Code to check form
                verification and audition hub scheduling for Nepal Kids Idol.
              </p>

              <div className="mt-4 flex flex-wrap items-center gap-2">
                <span className="font-mono text-[10px] uppercase tracking-wider text-faint">
                  Sample codes:
                </span>
                {DEMO_CODES.map((sample) => (
                  <button
                    key={sample}
                    type="button"
                    onClick={() => lookupCode(sample)}
                    className="rounded-full border border-line-strong bg-white px-2.5 py-1 font-mono text-[10px] font-medium text-forest transition-colors hover:bg-forest hover:text-white"
                  >
                    {sample}
                  </button>
                ))}
              </div>
            </div>

            <div className="lg:col-span-7">
              <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-3 sm:flex-row"
              >
                <div className="relative flex-1">
                  <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
                  <input
                    type="text"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    placeholder="Enter contestant user code (e.g. NKI-2025-101)"
                    aria-label="Contestant user code"
                    required
                    className="w-full rounded-[8px] border border-line-strong bg-white py-3.5 pl-11 pr-4 text-sm font-semibold uppercase tracking-wide text-ink placeholder:font-normal placeholder:normal-case placeholder:text-faint focus:border-forest focus:outline-none focus:ring-2 focus:ring-forest/15"
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex shrink-0 items-center justify-center gap-2 rounded-[8px] bg-forest px-7 py-3.5 text-sm font-bold uppercase tracking-[0.1em] text-white transition-all hover:bg-accent-hover disabled:opacity-60"
                >
                  {loading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span>Checking...</span>
                    </>
                  ) : (
                    <span>Search Status</span>
                  )}
                </button>
              </form>

              {/* Result Feedback */}
              {result.searched && result.found && result.record && (
                <div
                  role="status"
                  className="mt-5 rounded-[8px] border border-forest/30 bg-white p-5 shadow-sm"
                >
                  <div className="flex flex-wrap items-start justify-between gap-4 border-b border-line pb-4">
                    <div className="flex items-center gap-3">
                      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-forest-soft text-forest">
                        <UserCheck className="h-5 w-5" />
                      </span>
                      <div>
                        <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-forest">
                          {result.record.userCode}
                        </span>
                        <h3 className="display text-lg font-bold text-ink">
                          {result.record.name}
                        </h3>
                      </div>
                    </div>

                    <span className="inline-flex items-center gap-1.5 rounded-full bg-forest px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-wider text-white">
                      <CheckCircle2 className="h-3.5 w-3.5 text-gold" />
                      {result.record.status}
                    </span>
                  </div>

                  <dl className="mt-4 grid gap-3 text-xs sm:grid-cols-3">
                    <div>
                      <dt className="font-mono text-[10px] uppercase tracking-wider text-faint">
                        Event &amp; Age
                      </dt>
                      <dd className="mt-1 font-semibold text-ink">
                        {result.record.eventTitle} ({result.record.age} yrs)
                      </dd>
                    </div>
                    <div>
                      <dt className="font-mono text-[10px] uppercase tracking-wider text-faint">
                        School / Guardian
                      </dt>
                      <dd className="mt-1 font-medium text-ink-soft">
                        {result.record.school} • {result.record.parentName}
                      </dd>
                    </div>
                    <div>
                      <dt className="font-mono text-[10px] uppercase tracking-wider text-faint">
                        Audition Center
                      </dt>
                      <dd className="mt-1 flex items-center gap-1 font-medium text-forest">
                        <MapPin className="h-3 w-3 shrink-0" />
                        {result.record.auditionHub}
                      </dd>
                    </div>
                  </dl>
                </div>
              )}

              {result.searched && !result.found && (
                <div
                  role="alert"
                  className="mt-5 flex flex-wrap items-center justify-between gap-4 rounded-[8px] border border-danger/30 bg-white p-4 text-sm"
                >
                  <div className="flex items-center gap-3 text-danger">
                    <XCircle className="h-5 w-5 shrink-0" />
                    <span>{result.message}</span>
                  </div>
                  <Link
                    href="/register/nepal-kids-idol"
                    className="rounded-full bg-forest px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-white"
                  >
                    Register New Contestant
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

