import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

const METRICS = [
  { value: '7+', label: 'Seasons staged' },
  { value: '3', label: 'Hub cities' },
  { value: '100s', label: 'Young alumni' },
];

export default function LittleKoshiFeature() {
  return (
    <section className="border-b border-line-dark bg-bone py-20 text-ink md:py-28 lg:py-32">
      <div className="container-ed">
        <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-16">
          {/* Image */}
          <div className="lg:col-span-5">
            <div className="relative">
              <div
                className="absolute -bottom-4 -right-4 h-full w-full border border-ink/20"
                aria-hidden="true"
              />

              <div className="group relative aspect-[4/5] overflow-hidden bg-ink">
                <Image
                  src="https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=1200&q=85"
                  alt="Young performers on stage at Mr. and Miss Little Koshi"
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="img-zoom object-cover opacity-90"
                />
                <div
                  className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent"
                  aria-hidden="true"
                />
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-6">
                  <span className="eyebrow max-w-[12ch] text-paper/80">
                    Mr. &amp; Miss Little Koshi
                  </span>
                  <span className="display text-[clamp(2.4rem,4.5vw,4rem)] leading-none text-paper">
                    7+
                    <span className="ml-1 text-xs uppercase tracking-widest text-paper/60">
                      seasons
                    </span>
                  </span>
                </div>
              </div>

              <span className="eyebrow absolute -top-3 left-4 bg-coral px-3 py-1.5 text-ink">
                Youth stage
              </span>
            </div>
          </div>

          {/* Copy */}
          <div className="lg:col-span-6 lg:col-start-7">
            <div className="flex items-center gap-4">
              <span className="h-px w-10 bg-ink/30" aria-hidden="true" />
              <span className="eyebrow text-ink/65">
                04 / Children&apos;s showcase
              </span>
            </div>

            <h2 className="display mt-5 text-[clamp(2.4rem,5.6vw,5.5rem)]">
              Every star begins with{' '}
              <span className="serif text-coral-deep">a stage.</span>
            </h2>

            <p className="mt-7 max-w-lg text-base leading-relaxed text-ink/65">
              Mr. and Miss Little Koshi is Eastern Nepal&apos;s celebrated
              youth pageant — a platform built to nurture confidence, stage
              presence, and self-expression in children across Biratnagar,
              Itahari, and Dharan.
            </p>

            <blockquote className="serif mt-8 border-l-2 border-coral pl-5 text-2xl leading-tight text-ink/80">
              &ldquo;A platform where young talent discovers courage, poise,
              and unshakeable confidence.&rdquo;
            </blockquote>

            <div className="mt-10 grid grid-cols-3 divide-x divide-line-dark border-t border-line-dark">
              {METRICS.map((metric) => (
                <div key={metric.label} className="pt-6 pr-4 first:pl-0 [&:not(:first-child)]:pl-5">
                  <span className="display block text-[clamp(2rem,3.4vw,3.4rem)] leading-none">
                    {metric.value}
                  </span>
                  <span className="eyebrow mt-2 block text-[9px] text-ink/60">
                    {metric.label}
                  </span>
                </div>
              ))}
            </div>

            <Link
              href="/events/mr-and-miss-little-koshi"
              className="text-link mt-8 text-ink"
            >
              Explore seasons &amp; winners
              <ArrowUpRight className="h-3.5 w-3.5 text-coral" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
