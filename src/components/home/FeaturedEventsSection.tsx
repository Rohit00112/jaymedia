import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, MapPin } from 'lucide-react';
import SectionHeading from '@/components/shared/SectionHeading';
import Reveal from '@/components/motion/Reveal';
import { EVENTS_DATA } from '@/config/events-data';

export default function FeaturedEventsSection() {
  const missKoshi =
    EVENTS_DATA.find((e) => e.slug === 'miss-koshi') || EVENTS_DATA[1];
  const rest = EVENTS_DATA.filter((e) => e.slug !== 'miss-koshi');

  return (
    <section className="border-b border-line bg-white py-20 md:py-28">
      <div className="container-ed">
        <SectionHeading
          eyebrow="03 / Selected Work"
          title={
            <>
              Nights that became{' '}
              <span className="serif italic text-accent">the standard.</span>
            </>
          }
          description="Signature pageants, reality franchises, and youth talent showcases engineered by Jay Media Management."
          link={{ href: '/events', label: 'All productions' }}
        />

        <div className="grid gap-8 lg:grid-cols-12 lg:gap-10">
          {/* Unobstructed Official Photo Showcase */}
          <Reveal className="lg:col-span-6">
            <Link
              href={`/events/${missKoshi.slug}`}
              className="group relative block aspect-[1313/1450] overflow-hidden rounded-[6px] border border-line bg-sand shadow-2xs transition-all hover:border-forest hover:shadow-md"
            >
              <Image
                src={missKoshi.image}
                alt={missKoshi.title}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="img-zoom object-cover"
              />
            </Link>
          </Reveal>

          <div className="lg:col-span-6">
            <Reveal
              delay={80}
              className="flex h-full flex-col justify-center rounded-[6px] border border-line bg-paper p-7 md:p-10"
            >
              <div className="flex flex-wrap items-center gap-3 font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-forest">
                <span>{missKoshi.seasonOrYear}</span>
                <span className="text-line-strong" aria-hidden="true">
                  /
                </span>
                <span className="text-muted">{missKoshi.category}</span>
              </div>

              <h3 className="display mt-4 text-[clamp(1.9rem,3vw,2.8rem)] font-bold text-ink">
                {missKoshi.title}
              </h3>

              <p className="mt-4 text-sm leading-relaxed text-muted md:text-base">
                {missKoshi.summary}
              </p>

              <dl className="mt-7 grid grid-cols-2 gap-x-5 gap-y-4 border-t border-line pt-5">
                <div>
                  <dt className="eyebrow text-[9px] text-faint">Location</dt>
                  <dd className="mt-1.5 flex items-start gap-1.5 text-xs font-medium leading-snug text-ink-soft">
                    <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-forest" />
                    {missKoshi.location}
                  </dd>
                </div>
                <div>
                  <dt className="eyebrow text-[9px] text-faint">Season #8 Winner</dt>
                  <dd className="mt-1.5 text-xs font-semibold leading-snug text-forest">
                    Subha Laxmi Rai (Itahari)
                  </dd>
                </div>
              </dl>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href={`/events/${missKoshi.slug}`}
                  className="btn btn-accent rounded-[3px]"
                >
                  Explore production
                  <ArrowUpRight className="h-4 w-4 text-gold" />
                </Link>
                <Link
                  href="/gallery"
                  className="btn btn-outline rounded-[3px] bg-white"
                >
                  Miss Koshi Gallery
                </Link>
              </div>
            </Reveal>
          </div>
        </div>

        {/* Remaining Franchise Roster */}
        <div className="mt-12 border-t border-line">
          {rest.map((event, index) => (
            <Reveal key={event.slug} delay={index * 60}>
              <Link
                href={`/events/${event.slug}`}
                className="group flex flex-col justify-between gap-4 border-b border-line py-6 transition-colors hover:bg-paper/60 sm:flex-row sm:items-center sm:px-3"
              >
                <div>
                  <h4 className="display text-xl font-bold text-ink transition-colors group-hover:text-forest sm:text-2xl">
                    {event.title}
                  </h4>
                  <p className="mt-1 text-xs text-muted">
                    {event.category} — {event.location}
                  </p>
                </div>

                <div className="flex items-center gap-4">
                  <span className="font-mono text-[10px] font-semibold uppercase tracking-wider text-forest">
                    {event.seasonOrYear}
                  </span>
                  <ArrowUpRight className="h-4 w-4 text-forest transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
