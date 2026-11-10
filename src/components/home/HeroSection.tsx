import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowUpRight,
  Award,
  Globe2,
  Medal,
  Star,
  Trophy,
} from 'lucide-react';
import { HeroScene } from '@/components/three';
import { AnimeCounter, AnimeStaggerContainer } from '@/components/motion';
import { EVENTS_DATA } from '@/config/events-data';
import { cn } from '@/lib/utils';

const PRIZE_STYLES = {
  gold: {
    card: 'border-gold/70 bg-gradient-to-br from-[#FFFDF7] via-[#FBF6E8] to-[#F3E9CB]',
    badge: 'border border-gold-deep/30 bg-gold/20 text-[#7A5610]',
    rank: 'text-[#6A4A0B]',
    amount: 'text-ink',
    icon: Trophy,
  },
  silver: {
    card: 'border-forest/25 bg-white',
    badge: 'border border-forest/20 bg-forest-soft text-forest',
    rank: 'text-forest',
    amount: 'text-ink',
    icon: Medal,
  },
  bronze: {
    card: 'border-line bg-white',
    badge: 'border border-line bg-sand text-ink-soft',
    rank: 'text-ink-soft',
    amount: 'text-ink',
    icon: Award,
  },
  ruby: {
    card: 'border-line bg-white',
    badge: 'border border-line bg-paper-deep text-muted',
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
      {/* Three.js Harmonic Stage Wave & Emerald/Gold Particle Depth */}
      <HeroScene />

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

      <div className="container-ed relative z-10">
        {/* Two-Column Editorial Hero Spread */}
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-12">
          {/* Left Narrative Column */}
          <div className="lg:col-span-7">
            <div className="hero-fade flex flex-wrap items-center gap-4 font-mono text-[10.5px] font-semibold uppercase tracking-[0.18em] text-forest">
              <span className="flex items-center gap-2.5">
                <span className="h-px w-6 bg-forest" aria-hidden="true" />
                Season One — Auditions Open
              </span>
              <span className="text-line-strong" aria-hidden="true">
                /
              </span>
              <span className="text-muted">30 National TV Episodes</span>
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

            {/* Official Nepal Kids Idol Identity Strip */}
            <div
              className="hero-fade mt-8 flex items-center gap-4 border-y border-line bg-white/80 py-4 pl-3 pr-4 sm:max-w-xl"
              style={{ animationDelay: '340ms' }}
            >
              {nki.logoImage && (
                <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-[6px] border border-gold/60 bg-white sm:h-16 sm:w-16">
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
                  Flagship Production — Jay Media Management
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

            {/* Sharp Architectural Action Buttons */}
            <div
              className="hero-fade mt-8 flex flex-wrap items-center gap-3.5"
              style={{ animationDelay: '460ms' }}
            >
              <Link
                href="/register/nepal-kids-idol"
                className="btn btn-accent rounded-[3px] px-7 shadow-sm"
              >
                <span>Register Contestant</span>
                <ArrowUpRight className="h-4 w-4 text-gold" />
              </Link>

              <Link
                href="/events/nepal-kids-idol"
                className="btn btn-outline rounded-[3px] bg-white px-6"
              >
                <span>Event Prospectus</span>
              </Link>

              <Link
                href="/#quote"
                className="text-link ml-2 text-ink-soft hover:text-forest"
              >
                Sponsor or book studio
                <ArrowUpRight className="h-3.5 w-3.5 text-forest" />
              </Link>
            </div>

            {/* Editorial Studio Metrics with Anime.js Counters */}
            <dl
              className="hero-fade mt-10 grid grid-cols-3 gap-6 border-t border-line pt-6 sm:max-w-lg"
              style={{ animationDelay: '560ms' }}
            >
              <div>
                <dt className="font-mono text-[9.5px] uppercase tracking-[0.16em] text-faint">
                  Audition Reach
                </dt>
                <dd className="display mt-1.5 text-2xl font-bold text-ink sm:text-3xl">
                  <AnimeCounter target={77} />{' '}
                  <span className="text-base font-normal text-muted">Districts</span>
                </dd>
              </div>
              <div>
                <dt className="font-mono text-[9.5px] uppercase tracking-[0.16em] text-faint">
                  Total Prize Pool
                </dt>
                <dd className="display mt-1.5 text-2xl font-bold text-forest sm:text-3xl">
                  <AnimeCounter target={20} prefix="Rs. " suffix="L" />
                </dd>
              </div>
              <div>
                <dt className="font-mono text-[9.5px] uppercase tracking-[0.16em] text-faint">
                  Global Hubs
                </dt>
                <dd className="display mt-1.5 flex items-center gap-1.5 text-2xl font-bold text-ink sm:text-3xl">
                  <Globe2 className="h-5 w-5 text-forest" />
                  <AnimeCounter target={5} suffix="+" />
                </dd>
              </div>
            </dl>
          </div>

          {/* Right Uncluttered Editorial Stage Frame */}
          <div className="hero-media lg:col-span-5">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              <div className="relative aspect-[4/4.6] overflow-hidden rounded-[6px] border border-line bg-sand shadow-[0_32px_64px_-28px_rgba(1,64,43,0.22)]">
                <Image
                  src="https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=1200&q=85"
                  alt="Live singing performance on the Jay Media production stage"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 42vw"
                  className="object-cover"
                />
                <div
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/35 via-transparent to-transparent"
                  aria-hidden="true"
                />
              </div>

              <div className="mt-3.5 flex items-center justify-between gap-4 border-t border-line pt-3 text-xs">
                <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-forest">
                  Biratnagar Broadcast HQ
                </span>
                <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted">
                  Season One • Ages 5–15
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ─── Unified Architectural Championship Awards Ledger ───── */}
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
                Awards &amp; National Television Contracts
              </span>
            </div>

            <AnimeStaggerContainer
              stagger={85}
              delay={90}
              distance={20}
              className="grid grid-cols-1 divide-y divide-line overflow-hidden rounded-[6px] border border-line bg-white shadow-2xs sm:grid-cols-2 sm:divide-y-0 lg:grid-cols-4 lg:divide-x"
            >
              {nki.prizes.map((prize, idx) => {
                const style = PRIZE_STYLES[prize.tier];
                const Icon = style.icon;
                const isFirst = idx === 0;
                return (
                  <div
                    key={prize.rank}
                    className={cn(
                      'group flex flex-col justify-between p-6 transition-colors duration-300 hover:bg-paper/80 sm:border-b sm:border-line lg:border-b-0',
                      isFirst && 'bg-gradient-to-b from-[#FCF7E6] to-white'
                    )}
                  >
                    <div className="flex items-center justify-between">
                      <span
                        className={cn(
                          'inline-flex h-9 w-9 items-center justify-center rounded-[4px]',
                          style.badge
                        )}
                      >
                        <Icon className="h-4 w-4" />
                      </span>
                      <span className="font-mono text-[9.5px] font-medium uppercase tracking-[0.14em] text-faint">
                        {isFirst ? 'Grand Titleholder' : 'Laureate'}
                      </span>
                    </div>

                    <div className="mt-7">
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
            </AnimeStaggerContainer>
          </div>
        )}
      </div>
    </section>
  );
}
