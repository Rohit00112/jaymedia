'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import anime from 'animejs';
import {
  ArrowUpRight,
  Award,
  Calendar,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Clock,
  MapPin,
  Medal,
  Sparkles,
  Star,
  Ticket,
  Trophy,
} from 'lucide-react';
import type { EventDetailData } from '@/config/events-data';
import { cn, prefersReducedMotion } from '@/lib/utils';

const PRIZE_STYLES = {
  gold: {
    bar: 'border-t-[3px] border-t-forest bg-gradient-to-b from-forest/[0.04] to-white',
    badge: 'bg-forest text-gold shadow-sm',
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

const CONCERT_TIER_NOTES: Record<string, string> = {
  'Early Bird VVIP':
    'Premier front-stage enclosure, VVIP hospitality lounge & priority stadium gate lane.',
  'Early Bird VIP':
    'Dedicated VIP viewing deck with fast-track QR entry and refreshment access.',
  'Early Bird Fanpit':
    'High-energy standing pit directly in front of the main Itahari Rangasala stage.',
  'Early Bird General':
    'Full stadium arena access with tour-grade line-array sound and LED sightlines.',
};

interface HeroEventShowcaseProps {
  initialEvents: EventDetailData[];
}

function useConcertCountdown(targetIso: string) {
  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  } | null>(null);

  useEffect(() => {
    const target = new Date(targetIso).getTime();
    function update() {
      const diff = Math.max(0, target - Date.now());
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);
      setTimeLeft({ days, hours, minutes, seconds });
    }
    update();
    const timer = setInterval(update, 1000);
    return () => clearInterval(timer);
  }, [targetIso]);

  return timeLeft;
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
  const countdown = useConcertCountdown('2026-12-19T18:00:00+05:45');

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

  const isConcert = Boolean(activeEvent.ticketUrl);
  const hasPrizes = Boolean(activeEvent.prizes && activeEvent.prizes.length > 0);
  const stageImage = activeEvent.heroStageImage || activeEvent.image;

  const stepEvent = (delta: number) => {
    if (events.length === 0) return;
    const nextIdx = (activeIndex + delta + events.length) % events.length;
    setSelectedSlug(events[nextIdx].slug);
  };

  return (
    <>
      <div className="container-ed relative z-10 pb-12 pt-6 md:pb-16 md:pt-10">
        {/* Dynamic Production Switcher Bar */}
        <div className="mb-8 flex flex-col justify-between gap-4 border-b border-ink/15 pb-4 lg:flex-row lg:items-center">
          <div className="inline-flex flex-wrap items-center gap-3 border-l-2 border-forest pl-3 font-mono text-[10.5px] font-semibold uppercase tracking-[0.16em] text-forest">
            <span className="inline-flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-gold animate-pulse" />
              Jay Media Production Slate
            </span>
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
              const isHeadlineConcert = Boolean(ev.ticketUrl);
              return (
                <button
                  key={ev.slug}
                  role="tab"
                  aria-selected={active}
                  type="button"
                  onClick={() => setSelectedSlug(ev.slug)}
                  className={cn(
                    'inline-flex items-center gap-2 rounded-[3px] border px-3.5 py-2 font-mono text-[10px] font-semibold uppercase tracking-[0.12em] transition-all duration-200',
                    active
                      ? 'border-forest bg-forest text-white shadow-[0_6px_16px_-6px_rgba(1,64,43,0.45)]'
                      : 'border-line-strong bg-white text-ink-soft hover:border-forest hover:text-forest'
                  )}
                >
                  <span className={active ? 'text-gold' : 'text-faint'}>
                    0{idx + 1}
                  </span>
                  <span>{ev.shortLabel || ev.title}</span>
                  {isHeadlineConcert && (
                    <span
                      className={cn(
                        'rounded-[2px] px-1.5 py-0.5 text-[8px] font-bold tracking-[0.1em]',
                        active
                          ? 'bg-gold text-ink'
                          : 'bg-forest/10 text-forest'
                      )}
                    >
                      LIVE
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Left Architectural Multi-Event Narrative Column */}
          <div className="lg:col-span-6">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-forest/20 bg-forest/[0.06] px-3.5 py-1.5 font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-forest">
              <Sparkles className="h-3 w-3 text-gold-deep" />
              <span>
                {isConcert
                  ? 'Headline Stadium Tour • December 19, 2026'
                  : `Featured Production • ${activeEvent.seasonOrYear}`}
              </span>
            </div>

            <h1 className="display text-[clamp(2.45rem,4.7vw,4.35rem)] font-extrabold leading-[0.95] tracking-[-0.036em] text-ink">
              {isConcert ? (
                <>
                  Atif Aslam{' '}
                  <span className="text-forest">Live in Nepal.</span>
                </>
              ) : (
                <>
                  Stages built for{' '}
                  <span className="text-forest">star talent &amp; cinema.</span>
                </>
              )}
            </h1>

            {/* Dynamic Active Production Dossier Card */}
            <div
              ref={panelRef}
              className="mt-6 overflow-hidden rounded-[4px] border border-ink/15 border-l-4 border-l-forest bg-white shadow-[0_18px_40px_-24px_rgba(12,20,16,0.16)]"
            >
              {/* Top Dossier Header Strip */}
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-line bg-paper-deep/70 px-5 py-2.5 font-mono text-[9.5px] font-semibold uppercase tracking-[0.14em]">
                <span className="text-forest">{activeEvent.category}</span>
                <span className="inline-flex items-center gap-1.5 text-ink-soft">
                  <Calendar className="h-3 w-3 text-forest" />
                  {activeEvent.seasonOrYear}
                </span>
              </div>

              <div className="p-5 sm:p-6">
                <div className="flex items-start gap-4">
                  {activeEvent.logoImage && (
                    <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-[3px] border border-line bg-white p-1">
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
                    <h2 className="display text-2xl font-bold text-ink sm:text-[1.65rem]">
                      {activeEvent.title}
                    </h2>
                    <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">
                      {activeEvent.tagline}
                    </p>
                  </div>
                </div>

                {/* Live Countdown Strip for Atif Aslam Concert */}
                {isConcert && countdown && (
                  <div className="mt-5 rounded-[3px] border border-forest/20 bg-gradient-to-r from-[#031527] via-[#042338] to-forest p-4 text-white">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div>
                        <span className="inline-flex items-center gap-1.5 font-mono text-[9px] font-semibold uppercase tracking-[0.16em] text-gold">
                          <Clock className="h-3 w-3" />
                          Countdown to Itahari Rangasala Gates
                        </span>
                        <p className="mt-0.5 text-xs text-white/80">
                          Subah Aye Na Tour (Eastern Echoes) &bull; Poush 4, 2083
                        </p>
                      </div>

                      <div className="grid grid-cols-4 gap-2 text-center">
                        {[
                          { label: 'Days', value: countdown.days },
                          { label: 'Hrs', value: countdown.hours },
                          { label: 'Min', value: countdown.minutes },
                          { label: 'Sec', value: countdown.seconds },
                        ].map((unit) => (
                          <div
                            key={unit.label}
                            className="min-w-[3.1rem] rounded-[2px] border border-white/15 bg-white/10 px-2 py-1.5 backdrop-blur-xs"
                          >
                            <span className="mono block text-base font-extrabold leading-none text-white sm:text-lg">
                              {String(unit.value).padStart(2, '0')}
                            </span>
                            <span className="mt-1 block font-mono text-[8px] uppercase tracking-[0.14em] text-gold">
                              {unit.label}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                <div className="mt-5 flex flex-wrap items-center gap-3 border-t border-line pt-4">
                  {activeEvent.ticketUrl && (
                    <a
                      href={activeEvent.ticketUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-accent"
                    >
                      <Ticket className="h-4 w-4 text-gold" />
                      <span>
                        Buy Tickets on {activeEvent.ticketPartner || 'Khalti'}
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
                        ? 'Concert Dossier'
                        : 'Event Prospectus'}
                    </span>
                  </Link>

                  <Link
                    href="/events"
                    className="text-link ml-auto text-ink-soft hover:text-forest"
                  >
                    <span>All Productions</span>
                    <ArrowUpRight className="h-3.5 w-3.5 text-forest" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Dynamic 3-Metric Baseline for Active Production */}
            <dl className="mt-6 grid grid-cols-3 gap-3 sm:gap-4">
              <div className="rounded-[3px] border border-line bg-white p-3.5">
                <dt className="font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-muted">
                  {activeEvent.ticketUrl ? 'Date & Time' : 'Eligibility'}
                </dt>
                <dd className="display mt-1 text-base font-extrabold text-ink sm:text-lg">
                  {activeEvent.eligibility}
                </dd>
              </div>
              <div className="rounded-[3px] border border-line bg-white p-3.5">
                <dt className="font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-muted">
                  {activeEvent.ticketUrl ? 'Stadium Venue' : 'Coverage'}
                </dt>
                <dd className="display mt-1 text-base font-extrabold text-ink sm:text-lg">
                  {activeEvent.coverageLabel}
                </dd>
              </div>
              <div className="rounded-[3px] border border-forest/25 bg-forest/[0.04] p-3.5">
                <dt className="font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-forest">
                  {activeEvent.ticketUrl
                    ? 'Tickets (Khalti)'
                    : 'Awards / Format'}
                </dt>
                <dd className="display mt-1 text-base font-extrabold text-forest sm:text-lg">
                  {activeEvent.prizePoolLabel}
                </dd>
              </div>
            </dl>
          </div>

          {/* Right Framed Production Showcase */}
          <div ref={frameRef} className="lg:col-span-6">
            <div className="group relative rounded-[4px] border-2 border-ink bg-white p-2.5 shadow-[14px_14px_0px_0px_rgba(1,64,43,0.14)]">
              <div className="relative aspect-[16/11] w-full overflow-hidden rounded-[2px] bg-[#020816] lg:aspect-[5/4.1]">
                <Image
                  src={stageImage}
                  alt={activeEvent.title}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="img-zoom object-cover"
                />

                {/* Top Floating Status Badge */}
                <div className="pointer-events-none absolute inset-x-3 top-3 flex items-center justify-between gap-2">
                  <span className="inline-flex items-center gap-2 rounded-[2px] border border-white/15 bg-ink/80 px-3 py-1.5 font-mono text-[9.5px] font-semibold uppercase tracking-[0.14em] text-white backdrop-blur-md">
                    <span className="h-1.5 w-1.5 rounded-full bg-gold" />
                    {isConcert
                      ? 'Subah Aye Na Tour • Eastern Echoes'
                      : `0${activeIndex + 1} / Official Production`}
                  </span>

                  {isConcert && (
                    <span className="rounded-[2px] bg-gold px-2.5 py-1 font-mono text-[9px] font-bold uppercase tracking-[0.14em] text-ink shadow-sm">
                      Early Bird Live
                    </span>
                  )}
                </div>
              </div>

              {/* Bottom Caption & Quick Switch Controls */}
              <div className="mt-2.5 flex flex-wrap items-center justify-between gap-2 border-t border-line px-1.5 pt-2.5">
                <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.13em]">
                  <MapPin className="h-3.5 w-3.5 shrink-0 text-forest" />
                  <span className="font-semibold text-forest">
                    {activeEvent.location}
                  </span>
                </div>

                <div className="flex items-center gap-1.5">
                  <span className="mr-1 font-mono text-[9.5px] text-muted">
                    0{activeIndex + 1} / 0{events.length}
                  </span>
                  <button
                    type="button"
                    onClick={() => stepEvent(-1)}
                    aria-label="Previous production"
                    className="flex h-7 w-7 items-center justify-center rounded-[2px] border border-line-strong bg-paper-deep text-ink transition-colors hover:border-forest hover:bg-forest hover:text-white"
                  >
                    <ChevronLeft className="h-3.5 w-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => stepEvent(1)}
                    aria-label="Next production"
                    className="flex h-7 w-7 items-center justify-center rounded-[2px] border border-line-strong bg-paper-deep text-ink transition-colors hover:border-forest hover:bg-forest hover:text-white"
                  >
                    <ChevronRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Flush Architectural Ticket Tiers / Awards OR Production Highlights Ledger */}
      <div className="relative z-10 border-t border-ink/15 bg-white">
        <div className="container-ed">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line py-3.5">
            <span className="inline-flex items-center gap-2 font-mono text-[10.5px] font-semibold uppercase tracking-[0.16em] text-forest">
              {isConcert ? (
                <Ticket className="h-3.5 w-3.5 text-gold-deep" />
              ) : (
                <Trophy className="h-3.5 w-3.5 text-gold-deep" />
              )}
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
                className="inline-flex items-center gap-1 font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-forest hover:underline"
              >
                <span>
                  Book Digital Passes on {activeEvent.ticketPartner || 'Khalti'}
                </span>
                <ArrowUpRight className="h-3.5 w-3.5" />
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
                const Icon = isConcert ? Ticket : style.icon;
                const tierNote = CONCERT_TIER_NOTES[prize.rank];
                const CardTag = activeEvent.ticketUrl ? 'a' : 'div';
                const cardProps = activeEvent.ticketUrl
                  ? {
                      href: activeEvent.ticketUrl,
                      target: '_blank',
                      rel: 'noopener noreferrer',
                    }
                  : {};

                return (
                  <CardTag
                    key={prize.rank}
                    {...cardProps}
                    className={cn(
                      'group flex flex-col justify-between p-5 transition-colors hover:bg-paper-deep/70',
                      style.bar
                    )}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-semibold text-faint">
                        0{idx + 1} / {isConcert ? 'TIER' : 'AWARD'}
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

                    <div className="mt-4">
                      <h3
                        className={cn(
                          'font-mono text-[10.5px] font-semibold uppercase tracking-[0.14em]',
                          style.rank
                        )}
                      >
                        {prize.rank}
                      </h3>
                      <div className="mt-1 flex items-baseline justify-between gap-2">
                        <p className="display text-2xl font-extrabold text-ink">
                          {prize.amount}
                        </p>
                        {activeEvent.ticketUrl && (
                          <span className="inline-flex items-center gap-0.5 font-mono text-[9.5px] font-semibold uppercase tracking-[0.12em] text-forest opacity-75 transition-opacity group-hover:opacity-100">
                            Book
                            <ArrowUpRight className="h-3 w-3" />
                          </span>
                        )}
                      </div>
                      {tierNote && (
                        <p className="mt-2 text-xs leading-relaxed text-muted">
                          {tierNote}
                        </p>
                      )}
                    </div>
                  </CardTag>
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
