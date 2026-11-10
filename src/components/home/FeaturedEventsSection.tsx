import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import SectionHeading from '@/components/shared/SectionHeading';
import AnimeStaggerContainer from '@/components/motion/AnimeStaggerContainer';
import { EVENTS_DATA } from '@/config/events-data';

export default function FeaturedEventsSection() {
  const productions = EVENTS_DATA.filter(
    (e) => e.slug !== 'atif-aslam-live-in-nepal'
  );

  return (
    <section className="border-b border-line bg-paper-deep/50 py-16 md:py-20">
      <div className="container-ed">
        <SectionHeading
          eyebrow="Signature Productions"
          title="Live pageants, talent shows & regional franchises."
          description="Alongside international concerts, Jay Media Management produces Eastern Nepal's most recognized stage and television properties."
          link={{ href: '/events', label: 'View all productions' }}
        />

        <AnimeStaggerContainer className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {productions.map((event) => (
            <Link
              key={event.slug}
              href={`/events/${event.slug}`}
              className="card-hover group flex flex-col overflow-hidden rounded-xl border border-line bg-white"
            >
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-sand">
                <Image
                  src={event.heroStageImage || event.image}
                  alt={event.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 25vw"
                  className="img-zoom object-cover"
                />
              </div>

              <div className="flex flex-1 flex-col justify-between p-5">
                <div>
                  <p className="text-xs font-medium text-forest">
                    {event.seasonOrYear}
                  </p>
                  <h3 className="mt-1.5 text-lg font-semibold text-ink transition-colors group-hover:text-forest">
                    {event.title}
                  </h3>
                  <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted">
                    {event.summary}
                  </p>
                </div>

                <div className="mt-5 flex items-center justify-between border-t border-line pt-3.5 text-xs font-medium text-muted">
                  <span>{event.prizePoolLabel}</span>
                  <span className="inline-flex items-center gap-1 font-medium text-forest">
                    Details
                    <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </AnimeStaggerContainer>
      </div>
    </section>
  );
}
