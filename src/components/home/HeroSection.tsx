import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, Award, Medal, Star, Trophy } from 'lucide-react';
import { HeroScene } from '@/components/three';
import { AnimeCounter, AnimeStaggerContainer } from '@/components/motion';
import { EVENTS_DATA } from '@/config/events-data';
import { cn } from '@/lib/utils';

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

export default function HeroSection() {
  const nki =
    EVENTS_DATA.find((e) => e.slug === 'nepal-kids-idol') || EVENTS_DATA[0];

  return (
    <section className="relative overflow-hidden border-b border-line bg-paper-deep">
      {/* Three.js Acoustic Horizon Grid & Spatial Parallax */}
      <HeroScene />

      <div className="container-ed relative z-10 pb-14 pt-10 md:pb-20 md:pt-14">
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Left Architectural Poster Copy Column */}
          <div className="lg:col-span-6">
            <div className="hero-fade inline-flex items-center gap-3 border-l-2 border-forest pl-3 font-mono text-[10.5px] font-semibold uppercase tracking-[0.16em] text-forest">
              <span>Season One &bull; Open Worldwide</span>
              <span className="text-line-strong">/</span>
              <span className="text-muted">30 National TV Episodes</span>
            </div>

            <h1 className="display mt-6 text-[clamp(2.85rem,5.5vw,5.1rem)] font-extrabold leading-[0.94] tracking-[-0.038em] text-ink">
              <span className="hero-line">
                <span style={{ animationDelay: '100ms' }}>
                  Where young stars
                </span>
              </span>
              <span className="hero-line">
                <span style={{ animationDelay: '200ms' }}>
                  claim the{' '}
                  <span className="text-forest">national stage.</span>
                </span>
              </span>
            </h1>

            {/* Compact Flagship Program Lockup */}
            <div
              className="hero-fade mt-7 flex items-center gap-4 border-y border-ink/15 bg-white px-4 py-3.5"
              style={{ animationDelay: '320ms' }}
            >
              {nki.logoImage && (
                <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-[2px] border border-line bg-white">
                  <Image
                    src={nki.logoImage}
                    alt="Nepal Kids Idol Crest"
                    fill
                    priority
                    sizes="56px"
                    className="object-cover"
                  />
                </div>
              )}
              <div className="min-w-0 flex-1">
                <span className="block font-mono text-[9.5px] font-semibold uppercase tracking-[0.16em] text-forest">
                  Flagship Broadcast — Jay Media Management
                </span>
                <p className="mt-0.5 text-sm leading-snug text-ink-soft">
                  <strong className="font-bold text-ink">
                    Nepal Kids Idol 2025
                  </strong>{' '}
                  &mdash; Open to vocalists aged <strong>5&ndash;15</strong> across all
                  77 districts of Nepal, India, USA, Canada, and Australia.
                </p>
              </div>
            </div>

            {/* Crisp Sharp Action Buttons */}
            <div
              className="hero-fade mt-7 flex flex-wrap items-center gap-3"
              style={{ animationDelay: '440ms' }}
            >
              <Link href="/register/nepal-kids-idol" className="btn btn-accent">
                <span>Register Contestant</span>
                <ArrowUpRight className="h-4 w-4 text-gold" />
              </Link>

              <Link
                href="/events/nepal-kids-idol"
                className="btn btn-outline bg-white"
              >
                <span>Event Prospectus</span>
              </Link>

              <Link
                href="/#quote"
                className="text-link ml-2 text-ink-soft hover:text-forest"
              >
                <span>Sponsor Studio</span>
                <ArrowUpRight className="h-3.5 w-3.5 text-forest" />
              </Link>
            </div>

            {/* 3-Metric Baseline */}
            <dl
              className="hero-fade mt-9 grid grid-cols-3 gap-6 border-t border-ink/15 pt-6"
              style={{ animationDelay: '520ms' }}
            >
              <div>
                <dt className="font-mono text-[9.5px] font-semibold uppercase tracking-[0.14em] text-muted">
                  Nepal Districts
                </dt>
                <dd className="display mt-1 text-2xl font-extrabold text-ink sm:text-3xl">
                  <AnimeCounter target={77} />
                </dd>
              </div>
              <div>
                <dt className="font-mono text-[9.5px] font-semibold uppercase tracking-[0.14em] text-muted">
                  Prize Pool
                </dt>
                <dd className="display mt-1 text-2xl font-extrabold text-forest sm:text-3xl">
                  <AnimeCounter target={20} prefix="Rs. " suffix="L" />
                </dd>
              </div>
              <div>
                <dt className="font-mono text-[9.5px] font-semibold uppercase tracking-[0.14em] text-muted">
                  Global Countries
                </dt>
                <dd className="display mt-1 text-2xl font-extrabold text-ink sm:text-3xl">
                  <AnimeCounter target={5} suffix="+" />
                </dd>
              </div>
            </dl>
          </div>

          {/* Right Heavy-Framed Broadcast Showcase */}
          <div className="hero-media lg:col-span-6">
            <div className="border-2 border-ink bg-white p-2.5 shadow-[12px_12px_0px_0px_rgba(1,64,43,0.12)]">
              <div className="relative aspect-[16/11] w-full overflow-hidden bg-sand lg:aspect-[5/4.2]">
                <Image
                  src="https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=1200&q=85"
                  alt="Live singing performance on the Jay Media production stage"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
              <div className="mt-2.5 flex items-center justify-between gap-4 border-t border-line px-1 pt-2.5 font-mono text-[10px] uppercase tracking-[0.14em]">
                <span className="font-semibold text-forest">
                  Central Mall Stage &bull; Biratnagar
                </span>
                <span className="text-muted">Ages 5&ndash;15 Vocal Division</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Flush Architectural Prize Table */}
      {nki.prizes && (
        <div className="relative z-10 border-t border-ink/15 bg-white">
          <div className="container-ed">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line py-4">
              <span className="font-mono text-[10.5px] font-semibold uppercase tracking-[0.16em] text-forest">
                Official Championship Awards Ledger &bull; Total Pool Rs. 2,000,000
              </span>
              <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted">
                Awards &amp; National Broadcast Contracts
              </span>
            </div>

            <AnimeStaggerContainer
              stagger={80}
              distance={16}
              className="grid grid-cols-1 divide-y divide-line sm:grid-cols-2 sm:divide-y-0 lg:grid-cols-4 lg:divide-x"
            >
              {nki.prizes.map((prize, idx) => {
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
                      <h2
                        className={cn(
                          'font-mono text-[10.5px] font-semibold uppercase tracking-[0.14em]',
                          style.rank
                        )}
                      >
                        {prize.rank}
                      </h2>
                      <p className="display mt-1 text-2xl font-extrabold text-ink">
                        {prize.amount}
                      </p>
                    </div>
                  </div>
                );
              })}
            </AnimeStaggerContainer>
          </div>
        </div>
      )}
    </section>
  );
}
