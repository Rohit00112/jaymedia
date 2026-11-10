import Link from 'next/link';
import { ArrowUpRight, Phone } from 'lucide-react';
import Reveal from '@/components/motion/Reveal';
import RevealImage from '@/components/motion/RevealImage';
import { siteConfig } from '@/config/site';

const CAPABILITIES = [
  {
    code: '01',
    title: 'Event Management',
    note: 'End-to-end stage architecture, lighting plots, & cue discipline.',
  },
  {
    code: '02',
    title: 'Store & Product Launch',
    note: 'Turnkey retail openings and high-visibility reveals.',
  },
  {
    code: '03',
    title: 'Brand Experiences',
    note: 'Regional mall activations and audience engagement.',
  },
  {
    code: '04',
    title: 'Press Events',
    note: 'Red-carpet media scrums and broadcast press briefings.',
  },
] as const;

export default function IntroSection() {
  return (
    <section className="relative overflow-hidden border-y border-line bg-sand py-20 md:py-28">
      <div className="container-ed">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-12">
          {/* Left Sticky Index Column */}
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-28">
              <span className="eyebrow flex items-center gap-2.5 text-forest">
                <span className="h-px w-6 bg-forest" aria-hidden="true" />
                01 / The House
              </span>

              <span
                className="display mt-6 block text-[4.5rem] leading-none text-outline md:text-[6rem]"
                aria-hidden="true"
              >
                2013
              </span>

              <h2 className="display mt-4 text-3xl font-bold leading-tight text-ink sm:text-4xl">
                About Jay Media Management{' '}
                <span className="serif italic font-normal text-forest">
                  Pvt. Ltd.
                </span>
              </h2>

              <p className="mt-4 text-pretty text-sm leading-relaxed text-ink-soft md:text-base">
                Established in 2013 and registered in 2014 in{' '}
                <strong className="font-semibold text-ink">
                  Biratnagar, Nepal
                </strong>
                . Over a decade of crafting feature movies, live pageants,
                award shows, and national television formats.
              </p>

              {/* Call Strip */}
              <a
                href={`tel:${siteConfig.contact.phone}`}
                className="mt-7 flex items-center gap-3.5 rounded-[10px] border border-line-strong bg-white p-3.5 shadow-2xs transition-all hover:border-forest hover:shadow-md"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[8px] bg-forest text-gold">
                  <Phone className="h-4 w-4" />
                </span>
                <div>
                  <span className="block font-mono text-[9.5px] uppercase tracking-[0.14em] text-muted">
                    Direct Studio Line
                  </span>
                  <span className="mono text-base font-bold text-forest">
                    {siteConfig.contact.phone} | {siteConfig.contact.secondaryPhone}
                  </span>
                </div>
              </a>

              <Link href="/about" className="text-link mt-7 text-ink">
                Read full chronicle
                <ArrowUpRight className="h-3.5 w-3.5 text-forest" />
              </Link>
            </div>
          </div>

          {/* Right Narrative + Visual + Capability Tiles */}
          <div className="space-y-10 lg:col-span-8">
            <Reveal>
              <div className="rounded-[12px] border border-line bg-white p-7 shadow-2xs md:p-9">
                <p className="text-pretty text-base leading-relaxed text-ink-soft md:text-lg">
                  From our headquarters at{' '}
                  <strong className="font-semibold text-ink">
                    Central Mall, Biratnagar
                  </strong>
                  , Jay Media Management has continually expanded its artistic
                  footprint across four production disciplines: Movie Production,
                  Event Execution, Award Shows, and Commercial Event Management.
                </p>
                <p className="mt-4 text-pretty text-sm leading-relaxed text-muted md:text-base">
                  Our house credits span feature cinema (<em>The Karma</em>,{' '}
                  <em>Tantra</em>, and upcoming bilingual movie <em>MEOW</em>),
                  sports franchises (<em>Women&apos;s T20 Cricket League</em>),
                  and Nepal&apos;s iconic regional and national youth platforms
                  including <em>Miss Koshi (Seasons 1–8)</em>,{' '}
                  <em>Mrs. Koshi</em>, <em>Mr. &amp; Miss Purwanchal</em>,{' '}
                  <em>Mr. &amp; Miss Little Koshi</em>,{' '}
                  <em>Mr. &amp; Miss SEE</em>, and{' '}
                  <em>JMM Runway Fashion Show</em>.
                </p>
              </div>
            </Reveal>

            <RevealImage
              src="https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?auto=format&fit=crop&w=1800&q=85"
              alt="Concert stage lighting and production engineered by Jay Media Management"
              aspect="aspect-[16/9]"
              sizes="(max-width: 1024px) 100vw, 66vw"
              className="rounded-[12px] border border-line shadow-md"
              parallax
            />

            <div className="grid gap-4 sm:grid-cols-2">
              {CAPABILITIES.map((cap, idx) => (
                <Reveal key={cap.code} delay={idx * 60}>
                  <Link
                    href="/services"
                    className="group flex h-full flex-col justify-between rounded-[10px] border border-line bg-white p-5 transition-all hover:-translate-y-0.5 hover:border-forest hover:shadow-md"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[10px] font-bold tracking-[0.16em] text-forest">
                        {cap.code}
                      </span>
                      <ArrowUpRight className="h-4 w-4 text-faint transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-forest" />
                    </div>
                    <div className="mt-5">
                      <h3 className="display text-xl font-bold text-ink group-hover:text-forest">
                        {cap.title}
                      </h3>
                      <p className="mt-1.5 text-xs leading-relaxed text-muted">
                        {cap.note}
                      </p>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
