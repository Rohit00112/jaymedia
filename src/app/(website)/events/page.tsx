import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import PageHero from '@/components/shared/PageHero';
import CtaBand from '@/components/shared/CtaBand';
import { generatePageMetadata } from '@/lib/seo';
import { EVENTS_DATA } from '@/config/events-data';

export const metadata: Metadata = generatePageMetadata({
  title: 'Events & Productions Portfolio | Jay Media Management',
  description:
    'Explore signature event productions by Jay Media Management in Biratnagar, Nepal: Miss Koshi Grand Pageant, Mr. & Miss Little Koshi, and bespoke corporate galas.',
});

export default function EventsPage() {
  return (
    <div className="min-h-screen bg-surface text-paper">
      <PageHero
        eyebrow="The production archive"
        title={
          <>
            Work worth{' '}
            <span className="serif text-coral">remembering.</span>
          </>
        }
        description="From monumental beauty pageants to celebratory youth showcases, discover the signature productions that have defined Eastern Nepal's cultural stage."
        image="https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=1800&q=85"
        imageAlt="Live concert crowd and stage lighting"
        meta={[
          { label: 'Signature franchises', value: '04 productions' },
          { label: 'Region', value: 'Koshi Province' },
          { label: 'Format', value: 'Live + broadcast' },
          { label: 'Studio', value: 'Biratnagar, Nepal' },
        ]}
      />

      <section className="bg-surface py-16 md:py-24">
        <div className="container-ed">
          <div className="mb-10 flex items-center gap-4">
            <span className="h-px w-10 bg-coral" aria-hidden="true" />
            <span className="eyebrow text-coral">
              Flagship productions / 2020—2026
            </span>
          </div>

          <div className="space-y-8 md:space-y-12">
            {EVENTS_DATA.map((event, index) => (
              <article
                key={event.slug}
                className="group relative flex min-h-[30rem] flex-col justify-end overflow-hidden bg-surface-alt md:min-h-[36rem]"
              >
                <Image
                  src={event.image}
                  alt={event.title}
                  fill
                  sizes="100vw"
                  className="img-zoom object-cover opacity-65 transition-opacity duration-700 group-hover:opacity-80"
                />
                <div
                  className="absolute inset-0 bg-gradient-to-t from-black via-black/55 to-black/25"
                  aria-hidden="true"
                />
                <div
                  className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-transparent"
                  aria-hidden="true"
                />

                <span className="display text-outline-strong pointer-events-none absolute -right-2 top-0 text-[clamp(5rem,14vw,14rem)] leading-none opacity-70">
                  {String(index + 1).padStart(2, '0')}
                </span>

                <div className="relative z-10 p-6 md:p-10 lg:p-12">
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[9px] uppercase tracking-[0.2em] text-paper/65">
                    <span className="text-coral">{event.category}</span>
                    <span aria-hidden="true">/</span>
                    <span>{event.seasonOrYear}</span>
                    <span aria-hidden="true">/</span>
                    <span>{event.location}</span>
                  </div>

                  <h2 className="display mt-4 max-w-3xl text-[clamp(2.2rem,5.4vw,5.4rem)] text-paper">
                    {event.title}
                  </h2>

                  <div className="mt-6 flex flex-col justify-between gap-6 border-t border-line pt-6 md:flex-row md:items-end">
                    <div className="max-w-xl">
                      <p className="text-sm leading-relaxed text-paper/75 md:text-base">
                        {event.summary}
                      </p>
                      <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-2">
                        {event.highlights.slice(0, 3).map((highlight) => (
                          <li
                            key={highlight}
                            className="flex items-center gap-2 text-[9px] uppercase tracking-[0.14em] text-paper/55"
                          >
                            <span
                              className="h-1 w-1 bg-coral"
                              aria-hidden="true"
                            />
                            {highlight}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <Link
                      href={`/events/${event.slug}`}
                      className="btn btn-primary shrink-0"
                    >
                      Explore production
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <CtaBand />
    </div>
  );
}
