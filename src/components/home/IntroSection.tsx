import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

const STATS = [
  { value: '10+', label: 'Years producing' },
  { value: '500+', label: 'Live productions' },
  { value: '3', label: 'Hub cities' },
  { value: '50+', label: 'Crew & crew partners' },
];

export default function IntroSection() {
  return (
    <section className="border-b border-line bg-surface py-20 md:py-28 lg:py-32">
      <div className="container-ed">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Rail */}
          <div className="lg:col-span-3">
            <div className="lg:sticky lg:top-28">
              <div className="flex items-center gap-4">
                <span className="h-px w-10 bg-coral" aria-hidden="true" />
                <span className="eyebrow text-coral">01 / The studio</span>
              </div>
              <p className="mt-6 max-w-xs text-sm leading-relaxed text-muted">
                A production house built on stagecraft, storytelling, and the
                discipline of live execution.
              </p>
              <Link href="/about" className="text-link mt-8 text-paper">
                Our story
                <ArrowUpRight className="h-3.5 w-3.5 text-coral" />
              </Link>
            </div>
          </div>

          {/* Statement */}
          <div className="lg:col-span-9">
            <h2 className="display text-[clamp(2.5rem,6.2vw,6.2rem)] text-paper">
              We don&apos;t just plan events.
              <br />
              We engineer{' '}
              <span className="serif text-coral">the moments</span>
              <br />
              people remember.
            </h2>

            <div className="mt-14 grid grid-cols-2 gap-x-6 gap-y-10 border-t border-line pt-8 md:grid-cols-4">
              {STATS.map((stat) => (
                <div key={stat.label}>
                  <span className="display block text-[clamp(2.4rem,4vw,4rem)] text-paper">
                    {stat.value}
                  </span>
                  <span className="eyebrow mt-3 block text-[9px] text-faint">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Image + note */}
        <div className="mt-16 grid gap-6 lg:mt-24 lg:grid-cols-12">
          <div className="group relative aspect-[16/10] overflow-hidden bg-surface-alt lg:col-span-8">
            <Image
              src="https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?auto=format&fit=crop&w=1600&q=85"
              alt="Concert stage lighting and production at a live Jay Media event"
              fill
              sizes="(max-width: 1024px) 100vw, 66vw"
              className="img-zoom object-cover opacity-85"
            />
            <div
              className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent"
              aria-hidden="true"
            />
            <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-6 md:p-8">
              <div>
                <span className="eyebrow text-paper/60">Live production</span>
                <p className="display mt-2 text-xl text-paper md:text-3xl">
                  The stage is our canvas.
                </p>
              </div>
              <span className="eyebrow hidden text-paper/60 sm:block">
                Biratnagar / Koshi
              </span>
            </div>
          </div>

          <div className="flex flex-col justify-between border border-line p-6 md:p-8 lg:col-span-4">
            <span className="eyebrow text-coral">Note from the studio</span>
            <blockquote className="serif mt-8 text-2xl leading-tight text-paper md:text-3xl">
              &ldquo;Our vision was clear from day one: bring national-standard
              production home to Eastern Nepal.&rdquo;
            </blockquote>
            <div className="mt-8 border-t border-line pt-4">
              <p className="text-sm text-paper">Jay Raj Rai</p>
              <p className="eyebrow mt-1 text-[9px] text-faint">
                Chairperson &amp; Founder
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
