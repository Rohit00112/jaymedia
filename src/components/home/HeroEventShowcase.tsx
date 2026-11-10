'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, Calendar, MapPin } from 'lucide-react';
import type { EventDetailData } from '@/config/events-data';
import Tilt3D from '@/components/motion/Tilt3D';
import Reveal from '@/components/motion/Reveal';

interface HeroEventShowcaseProps {
  event: EventDetailData;
}

export default function HeroEventShowcase({ event }: HeroEventShowcaseProps) {
  const heroImage = event.heroStageImage || event.image;

  return (
    <div className="container-ed">
      <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-14">
        {/* Left Column: Clean, Single-Focus Typography */}
        <Reveal className="lg:col-span-6">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-forest">
            Jay Media Management Presents
          </p>

          <h1 className="display mt-4 text-[clamp(2.6rem,5.2vw,4.5rem)] font-bold leading-[1.02] tracking-tight text-ink">
            {event.title}
          </h1>

          <p className="mt-3 text-lg font-medium text-forest sm:text-xl">
            Subah Aye Na Tour &mdash; Eastern Echoes
          </p>

          <p className="mt-4 max-w-xl text-base leading-relaxed text-muted">
            {event.summary}
          </p>

          {/* Clean Event Facts */}
          <div className="mt-7 flex flex-col gap-3 border-y border-line py-5 sm:flex-row sm:flex-wrap sm:items-center sm:gap-8">
            <div className="flex items-center gap-2.5 text-sm font-medium text-ink">
              <Calendar className="h-4 w-4 shrink-0 text-forest" />
              <span>{event.seasonOrYear} &bull; 6:00 PM Onwards</span>
            </div>
            <div className="flex items-center gap-2.5 text-sm font-medium text-ink">
              <MapPin className="h-4 w-4 shrink-0 text-forest" />
              <span>{event.coverageLabel}</span>
            </div>
          </div>

          {/* Primary Actions */}
          <div className="mt-8 flex flex-wrap items-center gap-4">
            {event.ticketUrl && (
              <a
                href={event.ticketUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-accent"
              >
                <span>Buy Tickets on {event.ticketPartner || 'Khalti'}</span>
                <ArrowUpRight className="h-4 w-4 text-gold" />
              </a>
            )}

            <Link
              href={`/events/${event.slug}`}
              className="btn btn-outline bg-white"
            >
              <span>Event Details</span>
            </Link>
          </div>

          {/* Simple Early Bird Price Note */}
          {event.prizes && event.prizes.length > 0 && (
            <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {event.prizes.map((tier) => (
                <div key={tier.rank}>
                  <span className="block text-xs text-muted">
                    {tier.rank.replace('Early Bird ', '')}
                  </span>
                  <span className="mt-0.5 block text-sm font-bold text-ink">
                    {tier.amount}
                  </span>
                </div>
              ))}
            </div>
          )}
        </Reveal>

        {/* Right Column: Clean Visual Artwork */}
        <Reveal delay={80} className="lg:col-span-6">
          <Tilt3D maxTilt={4} scale={1.01}>
            <Link
              href={`/events/${event.slug}`}
              className="group block overflow-hidden rounded-lg border border-line bg-[#020816] shadow-sm"
            >
              <div className="relative aspect-[5/4.1] w-full overflow-hidden">
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
          </Tilt3D>
        </Reveal>
      </div>
    </div>
  );
}
