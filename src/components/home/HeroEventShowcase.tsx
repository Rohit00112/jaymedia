import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, Calendar, MapPin } from 'lucide-react';
import type { EventDetailData } from '@/config/events-data';

interface HeroEventShowcaseProps {
  event: EventDetailData;
}

export default function HeroEventShowcase({ event }: HeroEventShowcaseProps) {
  const heroImage = event.heroStageImage || event.image;

  return (
    <div className="container-ed">
      <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-12">
        {/* Left Column */}
        <div className="lg:col-span-6">
          <span className="inline-flex items-center rounded-full bg-forest-soft px-3 py-1 text-xs font-medium text-forest">
            Jay Media Management Presents
          </span>

          <h1 className="mt-4 text-3xl font-semibold tracking-tight text-ink sm:text-4xl lg:text-5xl">
            {event.title}
          </h1>

          <p className="mt-2 text-base font-medium text-forest sm:text-lg">
            Subah Aye Na Tour &mdash; Eastern Echoes
          </p>

          <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted sm:text-base">
            {event.summary}
          </p>

          {/* Event Facts */}
          <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2.5 text-sm text-ink-soft">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 shrink-0 text-forest" />
              <span>{event.seasonOrYear}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 shrink-0 text-forest" />
              <span>{event.coverageLabel}</span>
            </div>
          </div>

          {/* Primary Actions */}
          <div className="mt-7 flex flex-wrap items-center gap-3">
            {event.ticketUrl && (
              <a
                href={event.ticketUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
              >
                <span>Buy Tickets on {event.ticketPartner || 'Khalti'}</span>
                <ArrowUpRight className="h-4 w-4" />
              </a>
            )}

            <Link href={`/events/${event.slug}`} className="btn btn-outline">
              Event Details
            </Link>
          </div>

          {/* Early Bird Tiers */}
          {event.prizes && event.prizes.length > 0 && (
            <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {event.prizes.map((tier) => (
                <div
                  key={tier.rank}
                  className="rounded-lg border border-line bg-paper-deep/60 p-3"
                >
                  <span className="block text-xs text-muted">
                    {tier.rank.replace('Early Bird ', '')}
                  </span>
                  <span className="mt-0.5 block text-sm font-semibold text-ink">
                    {tier.amount}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right Column */}
        <div className="lg:col-span-6">
          <Link
            href={`/events/${event.slug}`}
            className="group block overflow-hidden rounded-xl border border-line bg-paper-deep"
          >
            <div className="relative aspect-[5/4] w-full overflow-hidden">
              <Image
                src={heroImage}
                alt={event.title}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="img-zoom object-cover"
              />
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
