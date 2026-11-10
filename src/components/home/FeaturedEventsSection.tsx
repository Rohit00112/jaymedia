import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import SectionHeading from '@/components/shared/SectionHeading';
import { AnimeStaggerContainer, Tilt3D } from '@/components/motion';
import { EVENTS_DATA } from '@/config/events-data';

export default function FeaturedEventsSection() {
  const productions = EVENTS_DATA.filter(
    (e) => e.slug !== 'atif-aslam-live-in-nepal'
  );

  return (
    <section className="border-b border-line bg-paper-deep py-20 md:py-24">
      <div className="container-ed">
        <SectionHeading
          eyebrow="Signature Productions"
          title="Live pageants, talent shows & regional franchises."
          description="Alongside international concerts, Jay Media Management produces Eastern Nepal's most recognized stage and television properties."
          link={{ href: '/events', label: 'View all productions' }}
        />

        <AnimeStaggerContainer
          stagger={80}
          distance={18}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {productions.map((event) => (
            <Tilt3D
              key={event.slug}
              maxTilt={3.5}
              scale={1.01}
              glare={false}
              className="h-full"
            >
              <Link
                href={`/events/${event.slug}`}
                className="group flex h-full flex-col overflow-hidden rounded-lg border border-line bg-white transition-colors duration-200 hover:border-forest"
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
                    <h3 className="display mt-1.5 text-xl font-bold text-ink transition-colors group-hover:text-forest">
                      {event.title}
                    </h3>
                    <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted">
                      {event.summary}
                    </p>
                  </div>

                  <div className="mt-5 flex items-center justify-between border-t border-line pt-3.5 text-xs font-semibold text-ink">
                    <span>{event.prizePoolLabel}</span>
                    <span className="inline-flex items-center gap-1 text-forest">
                      Explore
                      <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </span>
                  </div>
                </div>
              </Link>
            </Tilt3D>
          ))}
        </AnimeStaggerContainer>
      </div>
    </section>
  );
}
