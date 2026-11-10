'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import anime from 'animejs';
import {
  CheckCircle2,
  Loader2,
  MapPin,
  Search,
  UserCheck,
  Video,
  XCircle,
} from 'lucide-react';
import type { RegistrationRecord } from '@/lib/validations/registration';
import { cn, prefersReducedMotion } from '@/lib/utils';

type HubKey = 'nepal' | 'india' | 'global';

const AUDITION_HUBS: Record<
  HubKey,
  {
    label: string;
    subtitle: string;
    cities: string[];
    highlight: string;
  }
> = {
  nepal: {
    label: 'All 77 Districts (Nepal)',
    subtitle: 'Provincial auditions anchored in Koshi Province and nationwide.',
    cities: [
      'Biratnagar (HQ)',
      'Itahari & Dharan',
      'Jhapa (Birtamode)',
      'Kathmandu Valley',
      'Pokhara',
      'Chitwan & Butwal',
    ],
    highlight: 'In-person regional desks with Central Mall Biratnagar HQ support.',
  },
  india: {
    label: 'India Regional Centers',
    subtitle: 'Dedicated outreach across Nepali-speaking heritage hubs in India.',
    cities: ['Sikkim (Gangtok)', 'Darjeeling', 'Assam', 'Dehradun', 'Siliguri'],
    highlight: 'Supported via both regional partners and direct digital video entry.',
  },
  global: {
    label: 'Global & Online Auditions',
    subtitle: 'Open to young Nepali & international vocalists worldwide.',
    cities: ['United States (USA)', 'Canada', 'Australia', 'Online Worldwide'],
    highlight: 'Submit studio-free singing videos online from any timezone.',
  },
};

const DEMO_CODES = ['NKI-2025-101', 'NKI-2025-102', 'NKI-2025-103'] as const;

export default function AuditionHubSection() {
  const [activeHub, setActiveHub] = useState<HubKey>('nepal');
  const hubGridRef = useRef<HTMLDivElement>(null);
  const [code, setCode] = useState('');

  useEffect(() => {
    if (!hubGridRef.current || prefersReducedMotion()) return;
    anime({
      targets: hubGridRef.current.children,
      opacity: [0, 1],
      translateY: [10, 0],
      delay: anime.stagger(40),
      duration: 420,
      easing: 'cubicBezier(0.16, 1, 0.3, 1)',
    });
  }, [activeHub]);
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

  const currentHub = AUDITION_HUBS[activeHub];

  return (
    <section
      id="application-status"
      className="border-b border-line bg-white py-16 md:py-20"
    >
      <div className="container-ed">
        <div className="grid items-start gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Left: Open Editorial Audition Network */}
          <div className="lg:col-span-7">
            <span className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-forest">
              Nepal Kids Idol — Audition Network
            </span>
            <h2 className="display mt-2.5 text-3xl font-bold text-ink sm:text-4xl">
              Audition Regions &amp;{' '}
              <span className="serif italic font-normal text-forest">
                Digital Entry
              </span>
            </h2>

            {/* Underline Segmented Tabs */}
            <div className="mt-6 flex flex-wrap gap-7 border-b border-line">
              {(
                [
                  { key: 'nepal', label: 'Nepal (77 Districts)' },
                  { key: 'india', label: 'India Regional' },
                  { key: 'global', label: 'Global / Online' },
                ] as const
              ).map((tab) => (
                <button
                  key={tab.key}
                  type="button"
                  onClick={() => setActiveHub(tab.key)}
                  className={cn(
                    '-mb-px border-b-2 pb-3 text-xs font-semibold uppercase tracking-[0.1em] transition-colors',
                    activeHub === tab.key
                      ? 'border-forest text-forest'
                      : 'border-transparent text-muted hover:text-ink'
                  )}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="mt-6">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="display text-xl font-bold text-ink">
                  {currentHub.label}
                </h3>
                <p className="text-xs text-muted">{currentHub.subtitle}</p>
              </div>

              <div
                ref={hubGridRef}
                className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3"
              >
                {currentHub.cities.map((city) => (
                  <span
                    key={city}
                    className="inline-flex items-center gap-2 rounded-[4px] border border-line bg-paper px-3.5 py-3 text-xs font-semibold text-ink transition-colors hover:border-forest"
                  >
                    {activeHub === 'global' ? (
                      <Video className="h-3.5 w-3.5 shrink-0 text-forest" />
                    ) : (
                      <MapPin className="h-3.5 w-3.5 shrink-0 text-forest" />
                    )}
                    <span className="truncate">{city}</span>
                  </span>
                ))}
              </div>

              <p className="mt-5 border-t border-line pt-4 text-xs font-medium text-forest">
                {currentHub.highlight}
              </p>
            </div>
          </div>

          {/* Right: Warm Stone Status Desk Card With Emerald Top Accent */}
          <div className="flex flex-col justify-between rounded-[6px] border border-line border-t-[3px] border-t-forest bg-sand p-6 shadow-xs sm:p-8 lg:col-span-5">
            <div>
              <span className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-forest">
                Contestant Verification Desk
              </span>
              <h2 className="display mt-2 text-2xl font-bold text-ink sm:text-3xl">
                Filter Application Status
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                Enter your official Contestant User Code to verify registration
                approval and assigned audition center.
              </p>

              <form
                onSubmit={handleSubmit}
                className="mt-5 flex flex-col gap-3 sm:flex-row"
              >
                <div className="relative flex-1">
                  <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
                  <input
                    type="text"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    placeholder="Enter user code (e.g. NKI-2025-101)"
                    aria-label="Contestant user code"
                    required
                    className="w-full rounded-[4px] border border-line-strong bg-white py-3.5 pl-11 pr-4 text-sm font-semibold uppercase tracking-wide text-ink placeholder:font-normal placeholder:normal-case placeholder:text-faint focus:border-forest focus:outline-none focus:ring-2 focus:ring-forest/15"
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex shrink-0 items-center justify-center gap-2 rounded-[3px] bg-forest px-7 py-3.5 text-xs font-bold uppercase tracking-[0.12em] text-white transition-colors hover:bg-ink disabled:opacity-60"
                >
                  {loading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span>Checking...</span>
                    </>
                  ) : (
                    <span>Check Status</span>
                  )}
                </button>
              </form>

              <div className="mt-4 flex flex-wrap items-center gap-2">
                <span className="font-mono text-[10px] uppercase tracking-wider text-faint">
                  Sample codes:
                </span>
                {DEMO_CODES.map((sample) => (
                  <button
                    key={sample}
                    type="button"
                    onClick={() => lookupCode(sample)}
                    className="rounded-[3px] border border-line-strong bg-white px-2.5 py-1 font-mono text-[10px] font-semibold text-forest transition-colors hover:border-forest hover:bg-forest hover:text-white"
                  >
                    {sample}
                  </button>
                ))}
              </div>
            </div>

            {/* Result Stamp Card */}
            {result.searched && result.found && result.record && (
              <div
                role="status"
                className="mt-6 rounded-[4px] border border-line border-l-4 border-l-forest bg-white p-5 shadow-xs"
              >
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line pb-3.5">
                  <div className="flex items-center gap-3">
                    <span className="flex h-9 w-9 items-center justify-center rounded-[4px] bg-forest-soft text-forest">
                      <UserCheck className="h-4 w-4" />
                    </span>
                    <div>
                      <span className="block font-mono text-[10px] font-bold uppercase tracking-wider text-forest">
                        {result.record.userCode}
                      </span>
                      <h3 className="display text-lg font-bold text-ink">
                        {result.record.name}
                      </h3>
                    </div>
                  </div>
                  <span className="inline-flex items-center gap-1.5 rounded-[3px] bg-forest px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
                    <CheckCircle2 className="h-3 w-3 text-gold" />
                    {result.record.status}
                  </span>
                </div>

                <div className="mt-3.5 grid gap-2 text-xs text-muted sm:grid-cols-2">
                  <div>
                    <span className="font-mono text-[9px] uppercase text-faint">
                      School &amp; Guardian
                    </span>
                    <p className="font-medium text-ink">
                      {result.record.school} — {result.record.parentName}
                    </p>
                  </div>
                  <div>
                    <span className="font-mono text-[9px] uppercase text-faint">
                      Assigned Desk
                    </span>
                    <p className="font-medium text-forest">
                      {result.record.auditionHub}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {result.searched && !result.found && (
              <div
                role="alert"
                className="mt-6 flex flex-wrap items-center justify-between gap-3 rounded-[4px] border border-danger/30 bg-white p-4 text-xs"
              >
                <div className="flex items-center gap-2.5 text-danger">
                  <XCircle className="h-4 w-4 shrink-0" />
                  <span>{result.message}</span>
                </div>
                <Link
                  href="/register/nepal-kids-idol"
                  className="rounded-[3px] bg-forest px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-wider text-white"
                >
                  Register Online
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
