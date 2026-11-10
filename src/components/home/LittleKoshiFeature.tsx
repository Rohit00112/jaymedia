import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import Reveal from '@/components/motion/Reveal';
import RevealImage from '@/components/motion/RevealImage';

const METRICS = [
  { value: '07', label: 'Seasons staged' },
  { value: '03', label: 'Hub cities' },
  { value: '100s', label: 'Young alumni' },
];

export default function LittleKoshiFeature() {
  return (
    <section className="relative overflow-hidden border-b border-line bg-paper-deep py-20 md:py-24">
      <span
        className="pointer-events-none absolute -right-10 top-10 display text-[clamp(10rem,28vw,28rem)] leading-none text-ink/[0.035]"
        aria-hidden="true"
      >
        07
      </span>

      <div className="container-ed relative">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line pb-4">
          <span className="eyebrow flex items-center gap-2.5 text-accent">
            <span className="h-px w-6 bg-accent" aria-hidden="true" />
            04 / Youth platform
          </span>
          <span className="eyebrow text-faint">
            Mr. &amp; Miss Little Koshi — 7 seasons
          </span>
        </div>

        <div className="relative mt-8">
          <RevealImage
            src="https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=2400&q=85"
            alt="Young performers on stage at Mr. and Miss Little Koshi"
            aspect="aspect-[4/3] sm:aspect-[16/9] md:aspect-[21/9]"
            sizes="100vw"
            className="rounded-[0.5rem]"
            parallax
          />
          <div
            className="pointer-events-none absolute inset-0 rounded-[0.5rem] bg-gradient-to-t from-ink/35 via-transparent to-transparent"
            aria-hidden="true"
          />

          <Reveal
            delay={80}
            className="relative z-10 mx-4 -mt-16 border border-line bg-cream p-6 shadow-[0_24px_60px_-40px_rgba(22,33,27,0.5)] sm:mx-8 md:absolute md:-bottom-4 md:left-8 md:mx-0 md:mt-0 md:max-w-md md:p-8"
          >
            <span className="eyebrow text-accent">A stage for the very first time</span>
            <h2 className="display mt-4 text-[clamp(1.9rem,3.2vw,2.8rem)] leading-[1.02] text-ink">
              Every star begins with{' '}
              <span className="serif italic text-accent">a stage.</span>
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-muted">
              Eastern Nepal&apos;s celebrated youth pageant — built to nurture
              confidence, stage presence, and self-expression in children across
              Biratnagar, Itahari, and Dharan.
            </p>

            <Link
              href="/events/mr-and-miss-little-koshi"
              className="text-link mt-6 text-ink"
            >
              Explore the platform
              <ArrowUpRight className="h-3.5 w-3.5 text-accent" />
            </Link>
          </Reveal>
        </div>

        <div className="mt-20 grid gap-6 border-t border-line pt-6 md:mt-24 md:grid-cols-3">
          {METRICS.map((metric) => (
            <div key={metric.label} className="flex items-baseline gap-4">
              <span className="display text-4xl text-ink md:text-5xl">
                {metric.value}
              </span>
              <span className="eyebrow text-[8px] text-faint">{metric.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
