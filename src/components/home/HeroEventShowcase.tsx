'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import anime from 'animejs';
import {
  ArrowUpRight,
  Award,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Medal,
  Star,
  Trophy,
} from 'lucide-react';
import type { EventDetailData } from '@/config/events-data';
import Tilt3D from '@/components/motion/Tilt3D';
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
    initialEvents[0]?.slug || 'atif-aslam-live-in-nepal'
  );
  const panelRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setEvents(initialEvents);
    if (initialEvents[0]?.slug) {
      setSelectedSlug(initialEvents[0].slug);
    }
  }, [initialEvents]);

  useEffect(() => {
    let active = true;
    fetch('/api/events', { cache: 'no-store' })
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (active && Array.isArray(data?.events) && data.events.length > 0) {
          setEvents(data.events);
          setSelectedSlug((prev) =>
            data.events.some((e: EventDetailData) => e.slug === prev)
              ? prev
              : data.events[0].slug
          );
        }
      })
      .catch(() => {});
    return () => {
      active = false;
    };
  }, []);

  const activeIndex = Math.max(
    0,
    events.findIndex((e) => e.slug === selectedSlug)
  );
  const activeEvent = events[activeIndex] || events[0] || initialEvents[0];

  // 3D Spatial Transition when switching active production
  useEffect(() => {
    if (prefersReducedMotion()) return;
    if (panelRef.current) {
      anime({
        targets: panelRef.current,
        opacity: [0, 1],
        translateY: [14, 0],
        rotateX: [6, 0],
        duration: 560,
        easing: 'cubicBezier(0.16, 1, 0.3, 1)',
      });
    }
    if (frameRef.current) {
      anime({
        targets: frameRef.current,
        opacity: [0.3, 1],
        rotateY: [-9, 0],
        rotateX: [4, 0],
        scale: [0.96, 1],
        duration: 680,
        easing: 'cubicBezier(0.16, 1, 0.3, 1)',
      });
    }
  }, [activeEvent?.slug]);

  if (!activeEvent) return null;

  const hasPrizes = Boolean(activeEvent.prizes && activeEvent.prizes.length > 0);
  const stageImage = activeEvent.heroStageImage || activeEvent.image;

  const stepEvent = (delta: number) => {
    if (events.length === 0) return;
    const nextIdx = (activeIndex + delta + events.length) % events.length;
    setSelectedSlug(events[nextIdx].slug);
  };

  return (
    <>
      <div className="container-ed relative z-10 pb-12 pt-8 md:pb-16 md:pt-12">
        {/* Minimal Production Switcher Bar */}
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

        <div
          className="grid items-center gap-10 lg:grid-cols-12 lg:gap-12"
          style={{ perspective: '1200px' }}
        >
          {/* Left Architectural Multi-Event Narrative Column */}
          <div className="lg:col-span-6">
            <h1 className="display text-[clamp(2.55rem,5vw,4.6rem)] font-extrabold leading-[0.94] tracking-[-0.038em] text-ink">
              Stages built for{' '}
              <span className="text-forest">star talent &amp; cinema.</span>
            </h1>

            {/* Minimal Active Production Dossier Strip */}
            <div
              ref={panelRef}
              style={{ transformOrigin: 'top center' }}
              className="mt-7 border border-ink/15 border-l-4 border-l-forest bg-white p-5 sm:p-6"
            >
              <div className="flex items-start gap-4">
                {activeEvent.logoImage && (
                  <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-[2px] border border-line bg-white">
                    <Image
                      src={activeEvent.logoImage}
                      alt={activeEvent.title}
                      fill
                      sizes="56px"
                      className="object-contain p-1"
                    />
                  </div>
                )}
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2 font-mono text-[9.5px] font-semibold uppercase tracking-[0.14em] text-forest">
                    <span>{activeEvent.category}</span>
                    <span className="text-line-strong">/</span>
                    <span className="text-muted">
                      {activeEvent.seasonOrYear}
                    </span>
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
                {activeEvent.ticketUrl && (
                  <a
                    href={activeEvent.ticketUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-accent"
                  >
                    <span>
                      Buy Tickets: {activeEvent.ticketPartner || 'Khalti'}
                    </span>
                    <ArrowUpRight className="h-4 w-4 text-gold" />
                  </a>
                )}

                {activeEvent.registrationOpen && (
                  <Link
                    href={`/register/${activeEvent.slug}`}
                    className="btn btn-accent"
                  >
                    <span>
                      Register: {activeEvent.shortLabel || activeEvent.title}
                    </span>
                    <ArrowUpRight className="h-4 w-4 text-gold" />
                  </Link>
                )}

                <Link
                  href={`/events/${activeEvent.slug}`}
                  className="btn btn-outline bg-white"
                >
                  <span>
                    {activeEvent.ticketUrl
                      ? 'Concert Details'
                      : 'Event Prospectus'}
                  </span>
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

            {/* Minimal 3-Metric Baseline */}
            <dl className="mt-7 grid grid-cols-3 gap-5 border-t border-ink/15 pt-5">
              <div>
                <dt className="font-mono text-[9.5px] font-semibold uppercase tracking-[0.14em] text-muted">
                  {activeEvent.ticketUrl ? 'Date & Time' : 'Eligibility'}
                </dt>
                <dd className="display mt-1 text-lg font-extrabold text-ink sm:text-xl">
                  {activeEvent.eligibility}
                </dd>
              </div>
              <div>
                <dt className="font-mono text-[9.5px] font-semibold uppercase tracking-[0.14em] text-muted">
                  {activeEvent.ticketUrl ? 'Venue' : 'Coverage'}
                </dt>
                <dd className="display mt-1 text-lg font-extrabold text-ink sm:text-xl">
                  {activeEvent.coverageLabel}
                </dd>
              </div>
              <div>
                <dt className="font-mono text-[9.5px] font-semibold uppercase tracking-[0.14em] text-muted">
                  {activeEvent.ticketUrl
                    ? 'Tickets (Khalti)'
                    : 'Awards / Format'}
                </dt>
                <dd className="display mt-1 text-lg font-extrabold text-forest sm:text-xl">
                  {activeEvent.prizePoolLabel}
                </dd>
              </div>
            </dl>
          </div>

          {/* Right 3D Interactive Framed Production Showcase */}
          <div ref={frameRef} className="lg:col-span-6">
            <Tilt3D maxTilt={5.5} scale={1.01}>
              <div className="border-2 border-ink bg-white p-2.5 shadow-[12px_12px_0px_0px_rgba(1,64,43,0.12)]">
                <div className="relative aspect-[16/11] w-full overflow-hidden bg-[#020816] lg:aspect-[5/4.1]">
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
                  <div className="flex items-center gap-2">
                    <span className="text-muted">
                      {activeEvent.seasonOrYear}
                    </span>
                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => stepEvent(-1)}
                        aria-label="Previous production"
                        className="flex h-6 w-6 items-center justify-center border border-line text-ink-soft transition-colors hover:border-forest hover:text-forest"
                      >
                        <ChevronLeft className="h-3 w-3" />
                      </button>
                      <button
                        type="button"
                        onClick={() => stepEvent(1)}
                        aria-label="Next production"
                        className="flex h-6 w-6 items-center justify-center border border-line text-ink-soft transition-colors hover:border-forest hover:text-forest"
                      >
                        <ChevronRight className="h-3 w-3" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </Tilt3D>
          </div>
        </div>
      </div>

      {/* Bottom Flush Architectural Ledger */}
      <div className="relative z-10 border-t border-ink/15 bg-white">
        <div className="container-ed">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line py-3.5">
            <span className="font-mono text-[10.5px] font-semibold uppercase tracking-[0.16em] text-forest">
              {activeEvent.ledgerTitle
                ? activeEvent.ledgerTitle
                : hasPrizes
                  ? `${activeEvent.title} — Official Awards Ledger`
                  : `${activeEvent.title} — Production Highlights`}
            </span>
            {activeEvent.ticketUrl ? (
              <a
                href={activeEvent.ticketUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-forest hover:underline"
              >
                Book Official Tickets on {activeEvent.ticketPartner || 'Khalti'}{' '}
                &rarr;
              </a>
            ) : (
              <Link
                href="/events"
                className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-ink-soft hover:text-forest"
              >
                Browse All Jay Media Events &rarr;
              </Link>
            )}
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
