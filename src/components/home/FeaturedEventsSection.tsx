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
    <section className="border-b border-line bg-sand py-20 md:py-24">
      <div className="container-ed">
        <SectionHeading
          eyebrow="03 / Selected Productions"
          title={
            <>
              Nights that set{' '}
              <span className="text-forest">the regional standard.</span>
            </>
          }
          description="Signature pageants, reality franchises, and youth talent showcases engineered by Jay Media Management."
          link={{ href: '/events', label: 'All productions' }}
        />

        {/* Flipped Asymmetric 7 / 5 Showcase: Specification Dossier Left, Framed Poster Right */}
        <div className="grid items-stretch gap-8 lg:grid-cols-12 lg:gap-10">
          <div className="order-2 lg:order-1 lg:col-span-7">
            <Reveal
              delay={60}
              className="flex h-full flex-col justify-between border border-ink/15 bg-white p-7 md:p-10"
            >
              <div>
                <div className="flex flex-wrap items-center gap-3 font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-forest">
                  <span>{missKoshi.seasonOrYear}</span>
                  <span className="text-line-strong">/</span>
                  <span className="text-muted">{missKoshi.category}</span>
                </div>

                <h3 className="display mt-4 text-[clamp(2rem,3.4vw,3rem)] font-bold text-ink">
                  {missKoshi.title}
                </h3>

                <p className="mt-4 text-sm leading-relaxed text-ink-soft md:text-base">
                  {missKoshi.summary}
                </p>

                <ul className="mt-7 grid gap-2.5 border-t border-line pt-6 sm:grid-cols-2">
                  {missKoshi.highlights.slice(0, 4).map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2 text-xs leading-relaxed text-muted"
                    >
                      <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-forest" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-8 border-t border-line pt-6">
                <dl className="grid grid-cols-2 gap-5">
                  <div>
                    <dt className="eyebrow text-[9px] text-faint">Location</dt>
                    <dd className="mt-1.5 flex items-start gap-1.5 text-xs font-medium leading-snug text-ink">
                      <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-forest" />
                      {missKoshi.location}
                    </dd>
                  </div>
                  <div>
                    <dt className="eyebrow text-[9px] text-faint">
                      Season #8 Winner
                    </dt>
                    <dd className="mt-1.5 text-xs font-bold leading-snug text-forest">
                      Subha Laxmi Rai (Itahari)
                    </dd>
                  </div>
                </dl>

                <div className="mt-7 flex flex-wrap gap-3">
                  <Link
                    href={`/events/${missKoshi.slug}`}
                    className="btn btn-accent"
                  >
                    <span>Explore Production</span>
                    <ArrowUpRight className="h-4 w-4 text-gold" />
                  </Link>
                  <Link href="/gallery" className="btn btn-outline bg-white">
                    <span>Miss Koshi Gallery</span>
                  </Link>
                </div>
              </div>
            </Reveal>
          </div>

          <Reveal className="order-1 lg:order-2 lg:col-span-5">
            <Link
              href={`/events/${missKoshi.slug}`}
              className="group relative block aspect-[1313/1600] overflow-hidden rounded-[2px] border-2 border-ink bg-white transition-shadow hover:shadow-[10px_10px_0px_0px_rgba(1,64,43,0.16)]"
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
        </div>

        {/* 3-Column Indexed Franchise Plates */}
        <AnimeStaggerContainer
          stagger={85}
          distance={18}
          className="mt-12 grid gap-6 border-t border-ink/15 pt-10 md:grid-cols-3"
        >
          {rest.map((event, idx) => (
            <Link
              key={event.slug}
              href={`/events/${event.slug}`}
              className="group flex flex-col border border-line bg-white transition-all duration-300 hover:border-forest"
            >
              <div className="flex items-center justify-between border-b border-line px-5 py-3 font-mono text-[10px] font-semibold uppercase tracking-[0.14em]">
                <span className="text-forest">
                  0{idx + 1} / {event.seasonOrYear}
                </span>
                <ArrowUpRight className="h-3.5 w-3.5 text-faint transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-forest" />
              </div>

              <div className="relative aspect-[16/10] w-full overflow-hidden border-b border-line bg-paper-deep">
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
                  <h4 className="display text-xl font-bold text-ink transition-colors group-hover:text-forest">
                    {event.title}
                  </h4>
                  <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-muted">
                    {event.summary}
                  </p>
                </div>

                <div className="mt-4 border-t border-line pt-3 font-mono text-[10px] uppercase tracking-[0.12em] text-ink-soft">
                  {event.location}
                </div>
              </div>
            </Link>
          ))}
        </AnimeStaggerContainer>
      </div>
    </section>
  );
}
