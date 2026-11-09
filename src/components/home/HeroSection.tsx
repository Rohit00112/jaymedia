import Image from 'next/image';
import Link from 'next/link';
import { ArrowDown, ArrowUpRight, Play } from 'lucide-react';
import HeroScene from '@/components/three/HeroScene';

const HEADLINE = [
  { text: 'WE CREATE', accent: false },
  { text: 'moments', accent: true },
  { text: 'THAT MOVE', accent: false },
  { text: 'PEOPLE.', accent: false },
];

export default function HeroSection() {
  return (
    <section className="relative flex min-h-[100svh] flex-col overflow-hidden bg-surface">
      {/* ── Background photograph ─────────────────────────── */}
      <Image
        src="https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=1920&q=85"
        alt="A live audience with hands raised in front of a concert stage"
        fill
        priority
        sizes="100vw"
        className="object-cover opacity-45"
      />

      <div
        className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/45 to-surface"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 bg-gradient-to-r from-black/70 via-transparent to-black/30"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_45%,rgba(255,74,54,0.16),transparent_55%)]"
        aria-hidden="true"
      />

      {/* ── Ambient particles ─────────────────────────────── */}
      <div className="absolute inset-0 z-0" aria-hidden="true">
        <HeroScene />
      </div>

      {/* ── Vertical rail ─────────────────────────────────── */}
      <div className="absolute right-4 top-1/2 z-10 hidden -translate-y-1/2 lg:block">
        <span className="vertical-text eyebrow text-paper/60">
          Eastern Nepal&apos;s premier production house
        </span>
      </div>

      <div className="container-ed relative z-10 flex flex-1 flex-col pt-24 md:pt-32">
        {/* Top meta line */}
        <div className="hero-fade flex items-center justify-between gap-4 border-b border-line pb-5 text-[9px] uppercase tracking-[0.2em] text-paper/60 md:text-[10px]">
          <span className="whitespace-nowrap">
            Jay Media Management / Biratnagar
          </span>
          <span className="hidden whitespace-nowrap md:block">
            Stage · Screen · Live
          </span>
          <span className="hidden whitespace-nowrap sm:block">
            26.45° N / 87.27° E
          </span>
        </div>

        {/* Headline */}
        <div className="flex flex-1 items-center py-6 md:py-8">
          <h1 className="display w-full text-[clamp(2.9rem,min(11.2vw,15.5vh),11.4rem)] leading-[0.86] text-paper">
            {HEADLINE.map((line, index) => (
              <span key={line.text} className="hero-line">
                <span
                  className={
                    line.accent
                      ? 'serif text-coral'
                      : undefined
                  }
                  style={{ animationDelay: `${120 + index * 90}ms` }}
                >
                  {line.text}
                </span>
              </span>
            ))}
          </h1>
        </div>

        {/* Bottom strip */}
        <div className="hero-fade delay-5 grid gap-6 border-t border-line py-6 md:grid-cols-12 md:items-end md:gap-8 md:py-7">
          <p className="max-w-xs text-sm leading-relaxed text-muted md:col-span-4">
            From the pageant stage to the brand arena, we produce the nights
            Eastern Nepal remembers.
          </p>

          <div className="flex flex-col items-stretch gap-3 sm:flex-row sm:flex-wrap sm:items-center md:col-span-5">
            <Link href="/events" className="btn btn-primary">
              Explore productions
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
            <Link href="/contact" className="btn btn-outline">
              Start a project
            </Link>
          </div>

          <div className="flex items-center justify-between gap-6 md:col-span-3 md:justify-end">
            <Link
              href="#showreel"
              className="group inline-flex items-center gap-3 text-[10px] uppercase tracking-[0.2em] text-paper/70 transition-colors hover:text-paper"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-full border border-line-strong transition-colors group-hover:border-coral group-hover:bg-coral group-hover:text-ink">
                <Play className="h-3.5 w-3.5 fill-current" />
              </span>
              Watch the reel
            </Link>

            <span className="hidden items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-faint sm:flex">
              Scroll
              <ArrowDown className="h-3.5 w-3.5 animate-bounce" />
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
