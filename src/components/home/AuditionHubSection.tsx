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

const DEMO_CODES = ['NKI-2025-101', 'MK-2025-102', 'LKS-2025-103'] as const;

export default function AuditionHubSection() {
  const [activeHub, setActiveHub] = useState<HubKey>('nepal');
  const hubGridRef = useRef<HTMLDivElement>(null);
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{
    searched: boolean;
    found: boolean;
    record?: RegistrationRecord;
    message?: string;
  }>({ searched: false, found: false });

  useEffect(() => {
    if (!hubGridRef.current || prefersReducedMotion()) return;
    anime({
      targets: hubGridRef.current.children,
      opacity: [0, 1],
      translateY: [8, 0],
      delay: anime.stagger(35),
      duration: 380,
      easing: 'cubicBezier(0.16, 1, 0.3, 1)',
    });
  }, [activeHub]);

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

  const currentHub = AUDITION_HUBS[activeHub];

  return (
    <section
      id="application-status"
      className="border-b border-line bg-white py-14 md:py-20"
    >
      <div className="container-ed space-y-12">
        {/* Top Band: Full-Width Audition Regions Matrix */}
        <div>
          <div className="flex flex-col justify-between gap-5 border-b border-line pb-5 lg:flex-row lg:items-end">
            <div>
              <span className="eyebrow inline-flex items-center gap-2.5 text-forest">
                <span className="h-2.5 w-1 bg-forest" aria-hidden="true" />
                Audition Network
              </span>
              <h2 className="display mt-2 text-2xl font-bold text-ink sm:text-3xl">
                Regional Hubs &amp; Digital Audition Entry
              </h2>
            </div>

            {/* Sharp Rectangular Switch Tabs */}
            <div className="flex flex-wrap border border-ink/20 bg-paper-deep p-1">
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
                    'rounded-[2px] px-4 py-2 font-mono text-[10.5px] font-semibold uppercase tracking-[0.12em] transition-colors',
                    activeHub === tab.key
                      ? 'bg-forest text-white'
                      : 'text-ink-soft hover:text-forest'
                  )}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-6">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <p className="text-sm font-semibold text-ink">
                {currentHub.label}{' '}
                <span className="ml-2 font-normal text-muted">
                  &mdash; {currentHub.subtitle}
                </span>
              </p>
              <span className="font-mono text-[10px] font-medium uppercase tracking-[0.12em] text-forest">
                {currentHub.highlight}
              </span>
            </div>

            <div
              ref={hubGridRef}
              className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6"
            >
              {currentHub.cities.map((city) => (
                <span
                  key={city}
                  className="inline-flex items-center gap-2 rounded-[2px] border border-line bg-paper-deep px-3.5 py-3 text-xs font-semibold text-ink transition-colors hover:border-forest"
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
          </div>
        </div>

        {/* Bottom Band: Horizontal Contestant Pass Lookup Console */}
        <div className="border border-line border-l-4 border-l-forest bg-paper-deep p-6 sm:p-8">
          <div className="grid items-center gap-6 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-forest">
                Contestant Pass Desk
              </span>
              <h3 className="display mt-1.5 text-2xl font-bold text-ink">
                Filter Application Status
              </h3>
              <p className="mt-1 text-xs leading-relaxed text-muted">
                Verify your official Contestant User Code or test sample pass
                records immediately.
              </p>
            </div>

            <div className="lg:col-span-7">
              <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-3 sm:flex-row"
              >
                <div className="relative flex-1">
                  <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
                  <input
                    type="text"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    placeholder="Enter User Code (e.g. NKI-2025-101)"
                    aria-label="Contestant user code"
                    required
                    className="w-full rounded-[2px] border border-line-strong bg-white py-3.5 pl-10 pr-4 font-mono text-sm font-semibold uppercase tracking-wide text-ink placeholder:font-sans placeholder:font-normal placeholder:normal-case placeholder:text-faint focus:border-forest focus:outline-none focus:ring-2 focus:ring-forest/15"
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="btn btn-accent shrink-0 px-7 disabled:opacity-60"
                >
                  {loading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span>Checking</span>
                    </>
                  ) : (
                    <span>Verify Pass</span>
                  )}
                </button>
              </form>

              <div className="mt-3 flex flex-wrap items-center gap-2">
                <span className="font-mono text-[10px] uppercase tracking-wider text-faint">
                  Quick test:
                </span>
                {DEMO_CODES.map((sample) => (
                  <button
                    key={sample}
                    type="button"
                    onClick={() => lookupCode(sample)}
                    className="rounded-[2px] border border-line-strong bg-white px-2.5 py-1 font-mono text-[10px] font-semibold text-forest transition-colors hover:border-forest hover:bg-forest hover:text-white"
                  >
                    {sample}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Inline Result Strip */}
          {result.searched && result.found && result.record && (
            <div
              role="status"
              className="mt-6 grid items-center gap-4 border border-forest/25 bg-white p-5 sm:grid-cols-3"
            >
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[2px] bg-forest text-gold">
                  <UserCheck className="h-4 w-4" />
                </span>
                <div>
                  <span className="block font-mono text-[10px] font-semibold uppercase tracking-wider text-forest">
                    {result.record.userCode} &bull; {result.record.eventTitle}
                  </span>
                  <h4 className="display text-lg font-bold text-ink">
                    {result.record.name}
                  </h4>
                </div>
              </div>

              <div className="text-xs text-muted">
                <span className="block font-mono text-[9.5px] uppercase text-faint">
                  Assigned Desk &amp; School
                </span>
                <p className="mt-0.5 font-semibold text-ink">
                  {result.record.auditionHub}
                </p>
                <p>{result.record.school}</p>
              </div>

              <div className="sm:text-right">
                <span className="inline-flex items-center gap-1.5 rounded-[2px] bg-forest px-3.5 py-1.5 font-mono text-[10px] font-semibold uppercase tracking-wider text-white">
                  <CheckCircle2 className="h-3.5 w-3.5 text-gold" />
                  {result.record.status}
                </span>
              </div>
            </div>
          )}

          {result.searched && !result.found && (
            <div
              role="alert"
              className="mt-6 flex flex-wrap items-center justify-between gap-3 border border-danger/30 bg-white p-4 text-xs"
            >
              <div className="flex items-center gap-2.5 font-medium text-danger">
                <XCircle className="h-4 w-4 shrink-0" />
                <span>{result.message}</span>
              </div>
              <Link
                href="/register/nepal-kids-idol"
                className="rounded-[2px] bg-forest px-4 py-2 font-mono text-[10px] font-semibold uppercase tracking-wider text-white"
              >
                Register Online
              </Link>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
