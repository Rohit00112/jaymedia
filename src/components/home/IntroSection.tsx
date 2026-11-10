import Link from 'next/link';
import { ArrowUpRight, Phone } from 'lucide-react';
import { AnimeCounter, AnimeStaggerContainer } from '@/components/motion';
import Reveal from '@/components/motion/Reveal';
import RevealImage from '@/components/motion/RevealImage';
import { siteConfig } from '@/config/site';

const CAPABILITIES = [
  {
    index: '01',
    slug: 'event-management',
    tag: 'Stagecraft & Direction',
    title: 'Event Management',
    note: 'Turnkey stage architecture, lighting plots, & live cue execution.',
  },
  {
    index: '02',
    slug: 'product-launches',
    tag: 'Retail & Openings',
    title: 'Store & Product Launch',
    note: 'High-visibility commercial reveals and VIP inaugural ceremonies.',
  },
  {
    index: '03',
    slug: 'brand-experiences',
    tag: 'Activations',
    title: 'Brand Experiences',
    note: 'Regional mall activations and audience engagement across Koshi.',
  },
  {
    index: '04',
    slug: 'press-events',
    tag: 'Broadcast & PR',
    title: 'Press Events & Media',
    note: 'Red-carpet media scrums, 4K streaming, and broadcast coordination.',
  },
] as const;

export default function IntroSection() {
  return (
    <section className="border-b border-line bg-paper-deep py-20 md:py-24">
      <div className="container-ed">
        {/* Top Monumental Studio Chronicle Header */}
        <div className="grid items-end gap-8 border-b border-ink/15 pb-10 lg:grid-cols-12">
          <div className="lg:col-span-3">
            <span className="eyebrow inline-flex items-center gap-2 text-forest">
              <span className="h-2.5 w-1 bg-forest" aria-hidden="true" />
              01 / The Production House
            </span>
            <span
              className="display mt-3 block text-[4.25rem] font-extrabold leading-none text-forest md:text-[5.5rem]"
              aria-hidden="true"
            >
              <AnimeCounter target={2013} formatLocale={false} duration={1100} />
            </span>
          </div>

          <div className="lg:col-span-6">
            <Reveal>
              <h2 className="display text-3xl font-bold leading-tight text-ink sm:text-4xl">
                About Jay Media Management Pvt. Ltd.
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-ink-soft md:text-base">
                Established in 2013 and registered in 2014 in{' '}
                <strong className="font-semibold text-ink">
                  Central Mall, Biratnagar
                </strong>
                . Over a decade crafting feature films (<em>The Karma</em>,{' '}
                <em>Tantra</em>, bilingual <em>MEOW</em>), sports properties (
                <em>Women&apos;s T20 Cricket League</em>), and flagship youth
                broadcasts.
              </p>
            </Reveal>
          </div>

          <div className="lg:col-span-3 lg:text-right">
            <a
              href={`tel:${siteConfig.contact.phone}`}
              className="inline-flex items-center gap-3 border border-line-strong bg-white px-4 py-3 text-left transition-colors hover:border-forest"
            >
              <Phone className="h-4 w-4 shrink-0 text-forest" />
              <div>
                <span className="block font-mono text-[9px] uppercase tracking-[0.14em] text-muted">
                  Direct Studio Line
                </span>
                <span className="mono text-sm font-bold text-ink">
                  {siteConfig.contact.phone} | {siteConfig.contact.secondaryPhone}
                </span>
              </div>
            </a>

            <div className="mt-4 flex flex-wrap gap-5 lg:justify-end">
              <Link href="/about" className="text-link text-ink">
                Our Story
                <ArrowUpRight className="h-3.5 w-3.5 text-forest" />
              </Link>
              <Link href="/services" className="text-link text-forest">
                All 5 Services
                <ArrowUpRight className="h-3.5 w-3.5 text-forest" />
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom 7 / 5 Visual Frame + Ruled Disciplines Stack */}
        <div className="mt-10 grid items-stretch gap-8 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <RevealImage
              src="https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?auto=format&fit=crop&w=1800&q=85"
              alt="Concert stage lighting and production engineered by Jay Media Management"
              aspect="aspect-[16/10]"
              sizes="(max-width: 1024px) 100vw, 58vw"
              className="rounded-[2px] border border-ink/15"
              parallax
            />
          </div>

          <div className="flex flex-col justify-between bg-white p-6 border border-line lg:col-span-5">
            <div className="border-b border-line pb-3">
              <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-forest">
                Four Core Production Disciplines
              </span>
            </div>

            <AnimeStaggerContainer
              stagger={75}
              distance={16}
              className="flex-1 divide-y divide-line"
            >
              {CAPABILITIES.map((cap) => (
                <Link
                  key={cap.slug}
                  href={`/services/${cap.slug}`}
                  className="group flex items-start justify-between gap-4 py-4 transition-colors hover:bg-paper-deep/50"
                >
                  <div className="flex items-start gap-3.5">
                    <span className="mono pt-0.5 text-xs font-semibold text-forest">
                      {cap.index}
                    </span>
                    <div>
                      <h3 className="display text-lg font-bold text-ink transition-colors group-hover:text-forest">
                        {cap.title}
                      </h3>
                      <p className="mt-0.5 text-xs leading-relaxed text-muted">
                        {cap.note}
                      </p>
                    </div>
                  </div>
                  <ArrowUpRight className="mt-1 h-4 w-4 shrink-0 text-faint transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-forest" />
                </Link>
              ))}
            </AnimeStaggerContainer>
          </div>
        </div>
      </div>
    </section>
  );
}
