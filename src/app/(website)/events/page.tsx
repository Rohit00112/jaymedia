import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, MapPin } from 'lucide-react';
import PageHero from '@/components/shared/PageHero';
import CtaBand from '@/components/shared/CtaBand';
import { generatePageMetadata } from '@/lib/seo';
import { EVENTS_DATA } from '@/config/events-data';
import { listEvents } from '@/lib/events-store';

export const metadata: Metadata = generatePageMetadata({
  title: 'Events & Productions Portfolio | Jay Media Management',
  description:
    'Explore signature event productions by Jay Media Management in Biratnagar, Nepal: Atif Aslam Live in Nepal (Subah Aye Na Tour), Miss Koshi Grand Pageant, Nepal Kids Idol, Mr. & Miss Little Koshi, and bespoke corporate galas.',
});

export default function EventsPage() {
  const events = listEvents();
  const [featured, ...rest] = events.length > 0 ? events : EVENTS_DATA;

  return (
    <div className="min-h-screen bg-paper text-ink">
      <PageHero
        eyebrow="Productions & Franchises"
        title="Live concerts, pageants, and national talent shows."
        description="From international stadium concerts like Atif Aslam Live in Nepal to regional beauty pageants and televised youth showcases across Koshi Province."
        meta={[
          {
            label: 'Productions',
            value: `${events.length} active franchises`,
          },
          { label: 'Region', value: 'Koshi Province & Nationwide' },
          { label: 'Format', value: 'Live Arena & Broadcast' },
          { label: 'Studio', value: 'Biratnagar, Nepal' },
        ]}
      />

      <section className="py-16 md:py-20">
        <div className="container-ed space-y-10">
          {/* Featured Production */}
          <Link
            href={`/events/${featured.slug}`}
            className="group grid items-center overflow-hidden rounded-xl border border-line bg-white transition-colors hover:border-line-strong lg:grid-cols-12"
          >
            <div className="relative aspect-[16/10] w-full overflow-hidden bg-sand lg:col-span-7">
              <Image
                src={
                  featured.heroStageImage ||
                  featured.coverBanner ||
                  featured.image
                }
                alt={featured.title}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 58vw"
                className="img-zoom object-cover"
              />
            </div>

            <div className="flex flex-col justify-center p-6 sm:p-8 lg:col-span-5">
              <div className="flex flex-wrap items-center gap-2 text-xs text-muted">
                <span className="font-medium text-forest">
                  {featured.category}
                </span>
                <span>&bull;</span>
                <span>{featured.seasonOrYear}</span>
              </div>
              <h2 className="mt-2.5 text-2xl font-semibold text-ink group-hover:text-forest sm:text-3xl">
                {featured.title}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                {featured.summary}
              </p>
              <p className="mt-5 flex items-center gap-2 border-t border-line pt-4 text-xs text-ink-soft">
                <MapPin className="h-3.5 w-3.5 text-forest" />
                {featured.location}
              </p>
              <div className="mt-5">
                <span className="btn btn-primary">
                  <span>View Production</span>
                  <ArrowUpRight className="h-4 w-4" />
                </span>
              </div>
            </div>
          </Link>

          {/* Other Productions Grid */}
          <div className="grid gap-6 md:grid-cols-2">
            {rest.map((event) => (
              <Link
                key={event.slug}
                href={`/events/${event.slug}`}
                className="group flex flex-col justify-between overflow-hidden rounded-xl border border-line bg-white transition-colors hover:border-line-strong"
              >
                <div>
                  <div className="relative aspect-[16/9] overflow-hidden bg-sand">
                    <Image
                      src={
                        event.coverBanner || event.heroStageImage || event.image
                      }
                      alt={event.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="img-zoom object-cover"
                    />
                  </div>

                  <div className="p-6">
                    <div className="flex flex-wrap items-center gap-2 text-xs text-muted">
                      <span className="font-medium text-forest">
                        {event.category}
                      </span>
                      <span>&bull;</span>
                      <span>{event.seasonOrYear}</span>
                    </div>
                    <h2 className="mt-2 text-xl font-semibold text-ink transition-colors group-hover:text-forest">
                      {event.title}
                    </h2>
                    <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted">
                      {event.summary}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between border-t border-line px-6 py-4 text-xs text-muted">
                  <span className="inline-flex items-center gap-1.5">
                    <MapPin className="h-3.5 w-3.5 text-forest" />
                    {event.location}
                  </span>
                  <span className="inline-flex items-center gap-1 font-medium text-forest">
                    Explore
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CtaBand />
    </div>
  );
}
