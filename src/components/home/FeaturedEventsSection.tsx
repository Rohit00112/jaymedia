import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import SectionHeading from '@/components/shared/SectionHeading';
import { EVENTS_DATA } from '@/config/events-data';
import { cn } from '@/lib/utils';

export default function FeaturedEventsSection() {
  return (
    <section className="border-b border-line bg-surface py-20 md:py-28 lg:py-32">
      <div className="container-ed">
        <SectionHeading
          eyebrow="03 / Signature productions"
          title={
            <>
              Work worth{' '}
              <span className="serif text-coral">remembering.</span>
            </>
          }
          description="Flagship pageants and youth platforms that have become part of Eastern Nepal's cultural calendar."
          link={{ href: '/events', label: 'All productions' }}
        />

        <div>
          {EVENTS_DATA.map((event, index) => {
            const reversed = index % 2 === 1;

            return (
              <article
                key={event.slug}
                className="group grid items-center gap-8 border-t border-line py-10 last:border-b md:py-14 lg:grid-cols-12 lg:gap-14"
              >
                {/* Image */}
                <div
                  className={cn(
                    'relative aspect-[16/11] overflow-hidden bg-surface-alt lg:col-span-7',
                    reversed && 'lg:order-2'
                  )}
                >
                  <Image
                    src={event.image}
                    alt={event.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 58vw"
                    className="img-zoom object-cover opacity-75 transition-opacity duration-700 group-hover:opacity-95"
                  />
                  <div
                    className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20"
                    aria-hidden="true"
                  />

                  <span className="eyebrow absolute left-5 top-5 text-paper/70 md:left-6 md:top-6">
                    {event.category}
                  </span>
                  <span className="display text-outline-strong absolute bottom-3 right-5 text-[clamp(3.5rem,7vw,7rem)] leading-none md:bottom-4 md:right-6">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </div>

                {/* Copy */}
                <div
                  className={cn(
                    'lg:col-span-5',
                    reversed && 'lg:order-1'
                  )}
                >
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[9px] uppercase tracking-[0.2em] text-faint">
                    <span className="text-coral">{event.seasonOrYear}</span>
                    <span aria-hidden="true">/</span>
                    <span>{event.location}</span>
                  </div>

                  <h3 className="display mt-4 text-[clamp(1.9rem,4vw,3.8rem)] text-paper transition-colors duration-300 group-hover:text-coral">
                    {event.title}
                  </h3>

                  <p className="mt-5 max-w-lg text-sm leading-relaxed text-muted md:text-base">
                    {event.summary}
                  </p>

                  <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2">
                    {event.highlights.slice(0, 3).map((highlight) => (
                      <li
                        key={highlight}
                        className="flex items-center gap-2 text-[9px] uppercase tracking-[0.16em] text-faint"
                      >
                        <span className="h-1 w-1 bg-coral" aria-hidden="true" />
                        {highlight}
                      </li>
                    ))}
                  </ul>

                  <Link
                    href={`/events/${event.slug}`}
                    className="text-link mt-8 text-paper"
                  >
                    Explore production
                    <ArrowUpRight className="h-3.5 w-3.5 text-coral" />
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
