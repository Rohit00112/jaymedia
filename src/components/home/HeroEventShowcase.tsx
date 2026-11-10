import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, Calendar, MapPin } from 'lucide-react';
import Reveal from '@/components/motion/Reveal';
import ConcertCountdown from '@/components/shared/ConcertCountdown';
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
          <Reveal y={14}>
            <span className="inline-flex items-center gap-2 rounded-full bg-forest-soft px-3 py-1 text-xs font-medium text-forest">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-forest opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-forest" />
              </span>
              Jay Media Management Presents
            </span>

            <h1 className="mt-4 text-3xl font-semibold tracking-tight text-ink sm:text-4xl lg:text-5xl">
              {event.title}
            </h1>

            <p className="mt-2 text-base font-medium text-forest sm:text-lg">
              Atif Aslam Live in Concert &mdash; Itahari Stadium
            </p>

            <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted sm:text-base">
              {event.summary}
            </p>
          </Reveal>

          {/* Event Facts */}
          <Reveal
            y={14}
            delay={0.06}
            className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2.5 text-sm text-ink-soft"
          >
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 shrink-0 text-forest" />
              <span>{event.seasonOrYear}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 shrink-0 text-forest" />
              <span>{event.coverageLabel}</span>
            </div>
          </Reveal>

          {/* Live Concert Countdown */}
          <Reveal y={14} delay={0.11} className="mt-6 max-w-lg">
            <ConcertCountdown />
          </Reveal>

          {/* Primary Actions */}
          <Reveal
            y={14}
            delay={0.16}
            className="mt-6 flex flex-wrap items-center gap-3"
          >
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
          </Reveal>
        </div>

        {/* Right Column */}
        <Reveal y={18} delay={0.1} className="lg:col-span-6">
          <Link
            href={`/events/${event.slug}`}
            className="card-hover group block overflow-hidden rounded-xl border border-line bg-paper-deep"
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
        </Reveal>
      </div>
    </div>
  );
}
