'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import anime from 'animejs';
import {
  ArrowUpRight,
  Award,
  CheckCircle2,
  Medal,
  Star,
  Trophy,
} from 'lucide-react';
import type { EventDetailData } from '@/config/events-data';
import { cn, prefersReducedMotion } from '@/lib/utils';

const PRIZE_STYLES = {
  gold: {
    bar: 'border-t-[3px] border-t-forest bg-white',
    badge: 'bg-forest text-gold',
    rank: 'text-forest',
    icon: Trophy,
  },
  silver: {
    bar: 'border-t-[3px] border-t-gold bg-white',
    badge: 'bg-paper-deep text-forest border border-line',
    rank: 'text-ink-soft',
    icon: Medal,
  },
  bronze: {
    bar: 'border-t-[3px] border-t-line-strong bg-white',
    badge: 'bg-paper-deep text-ink-soft border border-line',
    rank: 'text-muted',
    icon: Award,
  },
  ruby: {
    bar: 'border-t-[3px] border-t-line bg-white',
    badge: 'bg-paper-deep text-muted border border-line',
    rank: 'text-muted',
    icon: Star,
  },
} as const;

interface HeroEventShowcaseProps {
  initialEvents: EventDetailData[];
}

export default function HeroEventShowcase({
  initialEvents,
}: HeroEventShowcaseProps) {
  const [events, setEvents] = useState<EventDetailData[]>(initialEvents);
  const [selectedSlug, setSelectedSlug] = useState<string>(
    initialEvents[0]?.slug || 'nepal-kids-idol'
  );
  const panelRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let active = true;
    fetch('/api/events')
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (active && Array.isArray(data?.events) && data.events.length > 0) {
          setEvents(data.events);
        }
      })
      .catch(() => {});
    return () => {
      active = false;
    };
  }, []);

  const activeEvent =
    events.find((e) => e.slug === selectedSlug) || events[0] || initialEvents[0];

  useEffect(() => {
    if (prefersReducedMotion()) return;
    if (panelRef.current) {
      anime({
        targets: panelRef.current,
        opacity: [0.35, 1],
        translateY: [8, 0],
        duration: 420,
        easing: 'cubicBezier(0.16, 1, 0.3, 1)',
      });
    }
    if (frameRef.current) {
      anime({
        targets: frameRef.current,
        opacity: [0.45, 1],
        scale: [0.985, 1],
        duration: 460,
        easing: 'cubicBezier(0.16, 1, 0.3, 1)',
      });
    }
  }, [activeEvent?.slug]);

  if (!activeEvent) return null;

  const hasPrizes = Boolean(activeEvent.prizes && activeEvent.prizes.length > 0);
  const stageImage = activeEvent.heroStageImage || activeEvent.image;

  return (
    <>
      <div className="container-ed relative z-10 pb-12 pt-8 md:pb-16 md:pt-12">
        {/* Dynamic Production Switcher Bar */}
        <div className="mb-8 flex flex-col justify-between gap-4 border-b border-ink/15 pb-4 lg:flex-row lg:items-center">
          <div className="inline-flex items-center gap-3 border-l-2 border-forest pl-3 font-mono text-[10.5px] font-semibold uppercase tracking-[0.16em] text-forest">
            <span>Jay Media Production Slate</span>
            <span className="text-line-strong">/</span>
            <span className="text-muted">
              {String(events.length).padStart(2, '0')} Live Franchises
            </span>
          </div>

          <div
            role="tablist"
            aria-label="Featured Jay Media productions"
            className="flex flex-wrap gap-1.5"
          >
            {events.map((ev, idx) => {
              const active = ev.slug === activeEvent.slug;
              return (
                <button
                  key={ev.slug}
                  role="tab"
                  aria-selected={active}
                  type="button"
                  onClick={() => setSelectedSlug(ev.slug)}
                  className={cn(
                    'inline-flex items-center gap-2 rounded-[2px] border px-3 py-1.5 font-mono text-[10px] font-semibold uppercase tracking-[0.12em] transition-colors',
                    active
                      ? 'border-forest bg-forest text-white'
                      : 'border-line-strong bg-white text-ink-soft hover:border-forest hover:text-forest'
                  )}
                >
                  <span className={active ? 'text-gold' : 'text-faint'}>
                    0{idx + 1}
                  </span>
                  <span>{ev.shortLabel || ev.title}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Left Architectural Multi-Event Narrative Column */}
          <div className="lg:col-span-6">
            <h1 className="display text-[clamp(2.55rem,5vw,4.6rem)] font-extrabold leading-[0.94] tracking-[-0.038em] text-ink">
              Stages built for{' '}
              <span className="text-forest">star talent &amp; cinema.</span>
            </h1>

            {/* Dynamic Active Production Dossier Strip */}
            <div
              ref={panelRef}
              className="mt-7 border border-ink/15 border-l-4 border-l-forest bg-white p-5"
            >
              <div className="flex items-start gap-4">
                {activeEvent.logoImage && (
                  <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-[2px] border border-line bg-white">
                    <Image
                      src={activeEvent.logoImage}
                      alt={activeEvent.title}
                      fill
                      sizes="56px"
                      className="object-cover"
                    />
                  </div>
                )}
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2 font-mono text-[9.5px] font-semibold uppercase tracking-[0.14em] text-forest">
                    <span>{activeEvent.category}</span>
                    <span className="text-line-strong">/</span>
                    <span className="text-muted">{activeEvent.seasonOrYear}</span>
                  </div>
                  <h2 className="display mt-1.5 text-2xl font-bold text-ink">
                    {activeEvent.title}
                  </h2>
                  <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">
                    {activeEvent.tagline}
                  </p>
                </div>
              </div>

              <div className="mt-5 flex flex-wrap items-center gap-3 border-t border-line pt-4">
                {activeEvent.registrationOpen && (
                  <Link
                    href={`/register/${activeEvent.slug}`}
                    className="btn btn-accent"
                  >
                    <span>Register: {activeEvent.shortLabel || activeEvent.title}</span>
                    <ArrowUpRight className="h-4 w-4 text-gold" />
                  </Link>
                )}

                <Link
                  href={`/events/${activeEvent.slug}`}
                  className="btn btn-outline bg-white"
                >
                  <span>Event Prospectus</span>
                </Link>

                <Link
                  href="/register"
                  className="text-link ml-1 text-ink-soft hover:text-forest"
                >
                  <span>All Open Registrations</span>
                  <ArrowUpRight className="h-3.5 w-3.5 text-forest" />
                </Link>
              </div>
            </div>

            {/* Dynamic 3-Metric Baseline for Active Production */}
            <dl className="mt-7 grid grid-cols-3 gap-5 border-t border-ink/15 pt-5">
              <div>
                <dt className="font-mono text-[9.5px] font-semibold uppercase tracking-[0.14em] text-muted">
                  Eligibility
                </dt>
                <dd className="display mt-1 text-lg font-extrabold text-ink sm:text-xl">
                  {activeEvent.eligibility}
                </dd>
              </div>
              <div>
                <dt className="font-mono text-[9.5px] font-semibold uppercase tracking-[0.14em] text-muted">
                  Coverage
                </dt>
                <dd className="display mt-1 text-lg font-extrabold text-ink sm:text-xl">
                  {activeEvent.coverageLabel}
                </dd>
              </div>
              <div>
                <dt className="font-mono text-[9.5px] font-semibold uppercase tracking-[0.14em] text-muted">
                  Awards / Format
                </dt>
                <dd className="display mt-1 text-lg font-extrabold text-forest sm:text-xl">
                  {activeEvent.prizePoolLabel}
                </dd>
              </div>
            </dl>
          </div>

          {/* Right Framed Production Showcase */}
          <div ref={frameRef} className="lg:col-span-6">
            <div className="border-2 border-ink bg-white p-2.5 shadow-[12px_12px_0px_0px_rgba(1,64,43,0.12)]">
              <div className="relative aspect-[16/11] w-full overflow-hidden bg-sand lg:aspect-[5/4.1]">
                <Image
                  src={stageImage}
                  alt={activeEvent.title}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
              <div className="mt-2.5 flex flex-wrap items-center justify-between gap-2 border-t border-line px-1 pt-2.5 font-mono text-[10px] uppercase tracking-[0.14em]">
                <span className="font-semibold text-forest">
                  {activeEvent.location}
                </span>
                <span className="text-muted">{activeEvent.seasonOrYear}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Flush Architectural Awards OR Production Highlights Ledger */}
      <div className="relative z-10 border-t border-ink/15 bg-white">
        <div className="container-ed">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line py-3.5">
            <span className="font-mono text-[10.5px] font-semibold uppercase tracking-[0.16em] text-forest">
              {hasPrizes
                ? `${activeEvent.title} — Official Awards Ledger`
                : `${activeEvent.title} — Production Highlights`}
            </span>
            <Link
              href="/events"
              className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-ink-soft hover:text-forest"
            >
              Browse All Jay Media Events &rarr;
            </Link>
          </div>

          {hasPrizes && activeEvent.prizes ? (
            <div className="grid grid-cols-1 divide-y divide-line sm:grid-cols-2 sm:divide-y-0 lg:grid-cols-4 lg:divide-x">
              {activeEvent.prizes.map((prize, idx) => {
                const style = PRIZE_STYLES[prize.tier];
                const Icon = style.icon;
                return (
                  <div
                    key={prize.rank}
                    className={cn(
                      'flex flex-col justify-between p-5 transition-colors hover:bg-paper-deep/60',
                      style.bar
                    )}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-semibold text-faint">
                        0{idx + 1}
                      </span>
                      <span
                        className={cn(
                          'inline-flex h-8 w-8 items-center justify-center rounded-[2px]',
                          style.badge
                        )}
                      >
                        <Icon className="h-4 w-4" />
                      </span>
                    </div>

                    <div className="mt-5">
                      <h3
                        className={cn(
                          'font-mono text-[10.5px] font-semibold uppercase tracking-[0.14em]',
                          style.rank
                        )}
                      >
                        {prize.rank}
                      </h3>
                      <p className="display mt-1 text-2xl font-extrabold text-ink">
                        {prize.amount}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="grid grid-cols-1 divide-y divide-line sm:grid-cols-2 sm:divide-y-0 lg:grid-cols-4 lg:divide-x">
              {activeEvent.highlights.slice(0, 4).map((item, idx) => (
                <div
                  key={item}
                  className={cn(
                    'flex flex-col justify-between p-5 transition-colors hover:bg-paper-deep/60',
                    idx === 0 && 'border-t-[3px] border-t-forest'
                  )}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-semibold text-faint">
                      0{idx + 1}
                    </span>
                    <CheckCircle2 className="h-4 w-4 text-forest" />
                  </div>
                  <p className="mt-4 text-sm font-semibold leading-snug text-ink">
                    {item}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

