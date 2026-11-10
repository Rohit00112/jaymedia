import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, CheckCircle2, MapPin } from 'lucide-react';
import SectionHeading from '@/components/shared/SectionHeading';
import Reveal from '@/components/motion/Reveal';
import { AnimeStaggerContainer } from '@/components/motion';
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

        {/* 5/7 Asymmetric Showcase Pairing Poster Ratio with Deep Overview */}
        <div className="grid items-stretch gap-8 lg:grid-cols-12 lg:gap-10">
          <Reveal className="lg:col-span-5">
            <Link
              href={`/events/${missKoshi.slug}`}
              className="group relative block aspect-[1313/1600] overflow-hidden rounded-[6px] border border-line bg-sand shadow-xs transition-all hover:border-forest hover:shadow-md"
            >
              <Image
                src={missKoshi.image}
                alt={missKoshi.title}
                fill
                sizes="(max-width: 1024px) 100vw, 42vw"
                className="img-zoom object-cover"
              />
            </Link>
          </Reveal>

          <div className="lg:col-span-7">
            <Reveal
              delay={80}
              className="flex h-full flex-col justify-between rounded-[6px] border border-line bg-paper p-7 md:p-10"
            >
              <div>
                <div className="flex flex-wrap items-center gap-3 font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-forest">
                  <span>{missKoshi.seasonOrYear}</span>
                  <span className="text-line-strong" aria-hidden="true">
                    /
                  </span>
                  <span className="text-muted">{missKoshi.category}</span>
                </div>

                <h3 className="display mt-4 text-[clamp(2rem,3.4vw,3.1rem)] font-bold text-ink">
                  {missKoshi.title}
                </h3>

                <p className="mt-4 text-sm leading-relaxed text-ink-soft md:text-base">
                  {missKoshi.summary}
                </p>

                <ul className="mt-7 grid gap-2.5 border-t border-line pt-6 sm:grid-cols-2">
                  {missKoshi.highlights.slice(0, 4).map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2.5 text-xs leading-relaxed text-muted"
                    >
                      <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-forest" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-8 border-t border-line pt-6">
                <dl className="grid grid-cols-2 gap-x-5 gap-y-4">
                  <div>
                    <dt className="eyebrow text-[9px] text-faint">Location</dt>
                    <dd className="mt-1.5 flex items-start gap-1.5 text-xs font-medium leading-snug text-ink-soft">
                      <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-forest" />
                      {missKoshi.location}
                    </dd>
                  </div>
                  <div>
                    <dt className="eyebrow text-[9px] text-faint">
                      Season #8 Winner
                    </dt>
                    <dd className="mt-1.5 text-xs font-semibold leading-snug text-forest">
                      Subha Laxmi Rai (Itahari)
                    </dd>
                  </div>
                </dl>

                <div className="mt-7 flex flex-wrap gap-3">
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
              </div>
            </Reveal>
          </div>
        </div>

        {/* Illustrated 3-Column Franchise Roster */}
        <AnimeStaggerContainer
          stagger={90}
          distance={20}
          className="mt-12 grid gap-6 border-t border-line pt-10 md:grid-cols-3"
        >
          {rest.map((event) => (
            <Link
              key={event.slug}
              href={`/events/${event.slug}`}
              className="group flex flex-col overflow-hidden rounded-[6px] border border-line bg-paper transition-all duration-300 hover:-translate-y-0.5 hover:border-forest hover:shadow-md"
            >
              <div className="relative aspect-[16/10] w-full overflow-hidden border-b border-line bg-sand">
                <Image
                  src={event.image}
                  alt={event.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="img-zoom object-cover"
                />
              </div>

              <div className="flex flex-1 flex-col justify-between p-5">
                <div>
                  <span className="font-mono text-[9.5px] font-bold uppercase tracking-[0.14em] text-forest">
                    {event.seasonOrYear}
                  </span>
                  <h4 className="display mt-1.5 text-xl font-bold text-ink transition-colors group-hover:text-forest">
                    {event.title}
                  </h4>
                  <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-muted">
                    {event.summary}
                  </p>
                </div>

                <div className="mt-4 flex items-center justify-between border-t border-line pt-3 text-xs font-semibold text-ink-soft">
                  <span className="truncate pr-2">{event.location}</span>
                  <ArrowUpRight className="h-4 w-4 shrink-0 text-forest transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </div>
              </div>
            </Link>
          ))}
        </AnimeStaggerContainer>
      </div>
    </section>
  );
}
