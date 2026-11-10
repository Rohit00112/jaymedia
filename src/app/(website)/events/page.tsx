import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, MapPin } from 'lucide-react';
import PageHero from '@/components/shared/PageHero';
import CtaBand from '@/components/shared/CtaBand';
import Reveal from '@/components/motion/Reveal';
import { generatePageMetadata } from '@/lib/seo';
import { EVENTS_DATA } from '@/config/events-data';
import { listEvents } from '@/lib/events-store';
import { cn } from '@/lib/utils';

export const metadata: Metadata = generatePageMetadata({
  title: 'Events & Productions Portfolio | Jay Media Management',
  description:
    'Explore signature event productions by Jay Media Management in Biratnagar, Nepal: Nepal Kids Idol, Miss Koshi Grand Pageant, Mr. & Miss Little Koshi, and bespoke corporate galas.',
});

export default function EventsPage() {
  const events = listEvents();
  const [featured, ...rest] = events.length > 0 ? events : EVENTS_DATA;

  return (
    <div className="min-h-screen bg-paper text-ink">
      <PageHero
        eyebrow="The production archive"
        title={
          <>
            Work worth{' '}
            <span className="serif italic text-accent">remembering.</span>
          </>
        }
        description="From monumental beauty pageants to celebratory youth showcases, discover the signature productions that have defined Eastern Nepal's cultural stage."
        image="https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=1800&q=85"
        imageAlt="Live concert crowd and stage lighting"
        meta={[
          { label: 'Signature franchises', value: `${String(events.length).padStart(2, '0')} productions` },
          { label: 'Region', value: 'Koshi Province' },
          { label: 'Format', value: 'Live + broadcast' },
          { label: 'Studio', value: 'Biratnagar, Nepal' },
        ]}
      />

      <section className="py-20 md:py-28">
        <div className="container-ed">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4 border-b border-line pb-4 md:mb-10">
            <span className="eyebrow flex items-center gap-2.5 text-accent">
              <span className="h-px w-6 bg-accent" aria-hidden="true" />
              Flagship productions / 2020—2026
            </span>
            <span className="eyebrow text-faint">
              {String(events.length).padStart(2, '0')} works
            </span>
          </div>

          <Reveal>
            <Link
              href={`/events/${featured.slug}`}
              className="group grid overflow-hidden rounded-[0.5rem] border border-line transition-colors duration-400 hover:border-line-strong lg:grid-cols-12"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-sand lg:col-span-7 lg:aspect-auto lg:min-h-[28rem]">
                <Image
                  src={featured.image}
                  alt={featured.title}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 58vw"
                  className="img-zoom object-cover"
                />
                <span className="absolute left-5 top-5 inline-flex items-center gap-2 rounded-[0.2rem] bg-cream px-3 py-1.5 font-mono text-[8px] uppercase tracking-[0.16em] text-ink">
                  <span className="h-1 w-1 rounded-full bg-accent" />
                  Featured production
                </span>
              </div>

              <div className="flex flex-col justify-center bg-card p-7 md:p-9 lg:col-span-5">
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[9px] uppercase tracking-[0.14em]">
                  <span className="text-accent">{featured.category}</span>
                  <span className="text-faint" aria-hidden="true">
                    /
                  </span>
                  <span className="text-faint">{featured.seasonOrYear}</span>
                </div>
                <h2 className="display mt-4 text-[clamp(1.9rem,3.2vw,2.8rem)] text-ink">
                  {featured.title}
                </h2>
                <p className="mt-4 text-sm leading-relaxed text-muted">
                  {featured.summary}
                </p>
                <p className="mt-6 flex items-center gap-2 border-t border-line pt-4 text-xs text-ink-soft">
                  <MapPin className="h-3.5 w-3.5 text-accent" />
                  {featured.location}
                </p>
                <span className="btn btn-primary mt-6 self-start">
                  View production
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </span>
              </div>
            </Link>
          </Reveal>

          <div className="mt-8">
            {rest.map((event, index) => (
              <Reveal key={event.slug}>
                <Link
                  href={`/events/${event.slug}`}
                  className="group grid items-center gap-6 border-b border-line py-7 first:border-t md:grid-cols-12 md:gap-8 md:py-9"
                >
                  <div
                    className={cn(
                      'relative aspect-[16/10] overflow-hidden rounded-[0.3rem] bg-sand md:col-span-4',
                      index % 2 === 1 && 'md:order-2'
                    )}
                  >
                    <Image
                      src={event.image}
                      alt={event.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="img-zoom object-cover"
                    />
                  </div>

                  <div
                    className={cn(
                      'md:col-span-7',
                      index % 2 === 1 ? 'md:order-1' : 'md:col-start-5'
                    )}
                  >
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[9px] uppercase tracking-[0.13em]">
                      <span className="text-accent">{event.category}</span>
                      <span className="text-faint" aria-hidden="true">
                        /
                      </span>
                      <span className="text-faint">{event.seasonOrYear}</span>
                    </div>
                    <h2 className="display mt-2 text-[clamp(1.8rem,3.4vw,3.2rem)] text-ink transition-colors duration-300 group-hover:text-accent">
                      {event.title}
                    </h2>
                    <p className="mt-2 line-clamp-2 max-w-xl text-sm leading-relaxed text-muted">
                      {event.summary}
                    </p>
                    <span className="mt-4 inline-flex items-center gap-2 text-xs text-ink-soft">
                      <MapPin className="h-3.5 w-3.5 text-accent" />
                      {event.location}
                    </span>
                  </div>

                  <div className="flex items-center justify-end md:col-span-1 md:order-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-full border border-line-strong text-ink transition-all duration-500 group-hover:border-accent group-hover:bg-accent group-hover:text-cream">
                      <ArrowUpRight className="h-4 w-4" />
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaBand />
    </div>
  );
}
