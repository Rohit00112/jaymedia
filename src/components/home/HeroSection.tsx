import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowUpRight,
  Award,
  Globe2,
  Medal,
  Sparkles,
  Star,
  Trophy,
  Tv,
} from 'lucide-react';
import { EVENTS_DATA } from '@/config/events-data';
import { cn } from '@/lib/utils';

const PRIZE_STYLES = {
  gold: {
    card: 'border-gold/70 bg-gradient-to-br from-[#FFFDF7] via-[#FBF6E8] to-[#F3E9CB]',
    badge: 'bg-gold/25 text-[#7A5610]',
    rank: 'text-[#6A4A0B]',
    amount: 'text-ink',
    icon: Trophy,
  },
  silver: {
    card: 'border-forest/25 bg-white',
    badge: 'bg-forest-soft text-forest',
    rank: 'text-forest',
    amount: 'text-ink',
    icon: Medal,
  },
  bronze: {
    card: 'border-line bg-white',
    badge: 'bg-sand text-ink-soft',
    rank: 'text-ink-soft',
    amount: 'text-ink',
    icon: Award,
  },
  ruby: {
    card: 'border-line bg-white',
    badge: 'bg-paper-deep text-muted',
    rank: 'text-muted',
    amount: 'text-ink',
    icon: Star,
  },
} as const;

export default function HeroSection() {
  const nki =
    EVENTS_DATA.find((e) => e.slug === 'nepal-kids-idol') || EVENTS_DATA[0];

  return (
    <section className="relative overflow-hidden bg-paper pb-16 pt-12 md:pb-24 md:pt-16">
      {/* Subtle architectural guide lines */}
      <div
        className="pointer-events-none absolute inset-0 hidden lg:block"
        aria-hidden="true"
      >
        <div className="container-ed relative h-full">
          {[25, 50, 75].map((left) => (
            <span
              key={left}
              className="absolute inset-y-0 w-px bg-line-soft"
              style={{ left: `${left}%` }}
            />
          ))}
        </div>
      </div>

      {/* Soft ambient paper illumination */}
      <div
        className="bloom pointer-events-none absolute -right-24 top-0 h-[34rem] w-[34rem] rounded-full bg-forest-soft/90 blur-[120px]"
        aria-hidden="true"
      />
      <div
        className="bloom-slow pointer-events-none absolute -left-24 bottom-12 h-[26rem] w-[26rem] rounded-full bg-gold/15 blur-[110px]"
        aria-hidden="true"
      />

      <div className="container-ed relative">
        {/* Two-Column Editorial Hero Spread */}
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-12">
          {/* Left Narrative Column */}
          <div className="lg:col-span-7">
            <div className="hero-fade flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-2 rounded-full border border-forest/20 bg-forest-soft px-3.5 py-1.5 font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-forest">
                <span className="relative flex h-2 w-2 rounded-full bg-forest">
                  <span className="absolute inset-0 animate-ping rounded-full bg-forest/60" />
                </span>
                Season One • Auditions Open
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-line bg-white px-3.5 py-1.5 font-mono text-[10px] font-medium uppercase tracking-[0.14em] text-muted">
                <Tv className="h-3 w-3 text-forest" />
                30 National TV Episodes
              </span>
            </div>

            <h1 className="display mt-7 text-[clamp(2.8rem,5.7vw,5.4rem)] leading-[0.95] text-ink">
              <span className="hero-line">
                <span style={{ animationDelay: '120ms' }}>
                  Where young stars
                </span>
              </span>
              <span className="hero-line">
                <span style={{ animationDelay: '220ms' }}>
                  find their{' '}
                  <span className="serif italic text-forest">voice.</span>
                </span>
              </span>
            </h1>

            {/* Official Nepal Kids Idol Identity Bar */}
            <div
              className="hero-fade mt-7 flex items-center gap-4 rounded-[12px] border border-line bg-white/85 p-3.5 shadow-2xs backdrop-blur-xs sm:max-w-xl sm:p-4"
              style={{ animationDelay: '340ms' }}
            >
              {nki.logoImage && (
                <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full border border-gold bg-white shadow-xs sm:h-16 sm:w-16">
                  <Image
                    src={nki.logoImage}
                    alt="Nepal Kids Idol Crest"
                    fill
                    priority
                    sizes="64px"
                    className="object-cover"
                  />
                </div>
              )}
              <div className="min-w-0 flex-1">
                <span className="block font-mono text-[9.5px] font-bold uppercase tracking-[0.18em] text-forest">
                  Flagship Production • Jay Media Management
                </span>
                <p className="mt-1 text-sm leading-snug text-ink-soft">
                  <strong className="font-semibold text-ink">
                    Nepal Kids Idol 2025
                  </strong>{' '}
                  — Open to vocalists aged <strong>5–15</strong> across all{' '}
                  <strong>77 districts of Nepal</strong>, India, USA, Canada, and
                  Australia.
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div
              className="hero-fade mt-8 flex flex-wrap items-center gap-3.5"
              style={{ animationDelay: '460ms' }}
            >
              <Link
                href="/register/nepal-kids-idol"
                className="btn btn-accent rounded-full px-7 shadow-md"
              >
                <Sparkles className="h-4 w-4 text-gold" />
                <span>Register Contestant</span>
                <ArrowUpRight className="h-4 w-4" />
              </Link>

              <Link
                href="/events/nepal-kids-idol"
                className="btn btn-outline rounded-full bg-white px-6"
              >
                <span>Event Prospectus</span>
              </Link>

              <Link
                href="/#quote"
                className="text-link ml-1 text-ink-soft hover:text-forest"
              >
                Sponsor or book our studio
                <ArrowUpRight className="h-3.5 w-3.5 text-forest" />
              </Link>
            </div>

            {/* Editorial Studio Metrics */}
            <dl
              className="hero-fade mt-10 grid grid-cols-3 gap-6 border-t border-line pt-6 sm:max-w-lg"
              style={{ animationDelay: '560ms' }}
            >
              <div>
                <dt className="font-mono text-[9.5px] uppercase tracking-[0.16em] text-faint">
                  Audition Reach
                </dt>
                <dd className="display mt-1.5 text-2xl font-bold text-ink sm:text-3xl">
                  77 <span className="text-base font-normal text-muted">Districts</span>
                </dd>
              </div>
              <div>
                <dt className="font-mono text-[9.5px] uppercase tracking-[0.16em] text-faint">
                  Total Prize Pool
                </dt>
                <dd className="display mt-1.5 text-2xl font-bold text-forest sm:text-3xl">
                  Rs. 20L
                </dd>
              </div>
              <div>
                <dt className="font-mono text-[9.5px] uppercase tracking-[0.16em] text-faint">
                  Global Hubs
                </dt>
                <dd className="display mt-1.5 flex items-center gap-1.5 text-2xl font-bold text-ink sm:text-3xl">
                  <Globe2 className="h-5 w-5 text-forest" />
                  5+
                </dd>
              </div>
            </dl>
          </div>

          {/* Right Atmospheric Stage Frame */}
          <div className="hero-media lg:col-span-5">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              <div className="relative aspect-[4/4.8] overflow-hidden rounded-[14px] border border-line bg-sand shadow-[0_32px_64px_-28px_rgba(1,64,43,0.24)]">
                <Image
                  src="https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=1200&q=85"
                  alt="Live singing performance on the Jay Media production stage"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 42vw"
                  className="object-cover"
                />
                <div
                  className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/10 to-transparent"
                  aria-hidden="true"
                />

                {/* Top Floating Badge */}
                <span className="absolute right-4 top-4 rounded-full bg-white/95 px-3.5 py-1.5 font-mono text-[9.5px] font-bold uppercase tracking-[0.16em] text-forest shadow-sm backdrop-blur-md">
                  Biratnagar • Broadcast HQ
                </span>

                {/* Bottom Overlay Showcase Card */}
                <div className="absolute inset-x-4 bottom-4 rounded-[8px] border border-white/25 bg-white/94 p-4 text-ink shadow-lg backdrop-blur-md">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <span className="block font-mono text-[9px] font-bold uppercase tracking-[0.16em] text-forest">
                        National Television Broadcast
                      </span>
                      <h2 className="display mt-0.5 text-lg font-bold text-ink">
                        Online &amp; District Auditions Live
                      </h2>
                    </div>
                    <Link
                      href="/register/nepal-kids-idol"
                      className="shrink-0 rounded-full bg-forest px-4 py-2 text-[11px] font-bold uppercase tracking-[0.1em] text-white transition-colors hover:bg-ink"
                    >
                      Apply Now
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ─── Refined Architectural Award Plaques ─────────────────── */}
        {nki.prizes && (
          <div className="mt-16 border-t border-line pt-10 md:mt-20">
            <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
              <div>
                <span className="eyebrow flex items-center gap-2 text-forest">
                  <span className="h-px w-6 bg-forest" aria-hidden="true" />
                  Official Awards Ledger
                </span>
                <h2 className="display mt-2 text-2xl font-bold text-ink sm:text-3xl">
                  Rs. 2,000,000 Championship Prize Pool
                </h2>
              </div>
              <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted">
                Awards + National TV Recording Contracts
              </span>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {nki.prizes.map((prize) => {
                const style = PRIZE_STYLES[prize.tier];
                const Icon = style.icon;
                return (
                  <div
                    key={prize.rank}
                    className={cn(
                      'group relative flex flex-col justify-between overflow-hidden rounded-[14px] border p-6 shadow-2xs transition-all duration-300 hover:-translate-y-1 hover:shadow-md',
                      style.card
                    )}
                  >
                    <div className="flex items-center justify-between">
                      <span
                        className={cn(
                          'inline-flex h-10 w-10 items-center justify-center rounded-full',
                          style.badge
                        )}
                      >
                        <Icon className="h-5 w-5" />
                      </span>
                      <span className="font-mono text-[9.5px] font-medium uppercase tracking-[0.14em] text-faint">
                        Official Award
                      </span>
                    </div>

                    <div className="mt-6 border-t border-line/70 pt-4">
                      <h3
                        className={cn(
                          'font-mono text-[11px] font-bold uppercase tracking-[0.14em]',
                          style.rank
                        )}
                      >
                        {prize.rank}
                      </h3>
                      <p
                        className={cn(
                          'mono mt-1.5 text-2xl font-bold tracking-tight',
                          style.amount
                        )}
                      >
                        {prize.amount}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
