import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import SectionHeading from '@/components/shared/SectionHeading';
import Reveal from '@/components/motion/Reveal';
import { AnimeStaggerContainer, Tilt3D } from '@/components/motion';
import { EVENTS_DATA } from '@/config/events-data';

export default function FeaturedEventsSection() {
  const featured =
    EVENTS_DATA.find((e) => e.slug === 'atif-aslam-live-in-nepal') ||
    EVENTS_DATA[0];
  const rest = EVENTS_DATA.filter((e) => e.slug !== featured.slug);

  return (
    <section className="border-b border-line bg-sand py-20 md:py-24">
      <div className="container-ed">
        <SectionHeading
          eyebrow="03 / Highlight Concert & Productions"
          title={
            <>
              Nights that set{' '}
              <span className="text-forest">the regional standard.</span>
            </>
          }
          description="Headlined by Atif Aslam Live in Nepal (Subah Aye Na Tour) at Itahari Stadium alongside our flagship pageants and televised talent franchises."
          link={{ href: '/events', label: 'All productions' }}
        />

        {/* Asymmetric 7 / 5 Minimal Swiss Dossier Split */}
        <div className="grid items-stretch gap-8 lg:grid-cols-12 lg:gap-10">
          <div className="order-2 lg:order-1 lg:col-span-7">
            <Reveal
              delay={60}
              className="flex h-full flex-col justify-between rounded-[2px] border border-ink/15 bg-white p-7 sm:p-9"
            >
              <div>
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-line pb-4">
                  <span className="eyebrow inline-flex items-center gap-2 text-forest">
                    <span className="h-2.5 w-1 bg-forest" aria-hidden="true" />
                    01 / {featured.category}
                  </span>
                  <span className="eyebrow text-muted">
                    {featured.seasonOrYear}
                  </span>
                </div>

                <h3 className="display mt-6 text-[clamp(2rem,3.4vw,3.1rem)] font-bold text-ink">
                  {featured.title}
                </h3>

                <p className="mt-3 text-sm leading-relaxed text-muted md:text-base">
                  {featured.summary}
                </p>

                {/* Minimal 4-Column Khalti Ticket Tier Row */}
                {featured.prizes && (
                  <div className="mt-6 grid grid-cols-2 gap-4 border-y border-line py-4 sm:grid-cols-4">
                    {featured.prizes.map((tier) => (
                      <div key={tier.rank}>
                        <span className="eyebrow block text-[8.5px] text-faint">
                          {tier.rank.replace('Early Bird ', '')}
                        </span>
                        <span className="display mt-1 block text-base font-bold text-ink">
                          {tier.amount}
                        </span>
                      </div>
                    ))}
                  </div>
                )}

                <ul className="mt-5 grid gap-2 sm:grid-cols-2">
                  {featured.highlights.slice(0, 4).map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2.5 text-xs leading-relaxed text-muted"
                    >
                      <span
                        className="mt-1.5 h-1 w-1 shrink-0 bg-forest"
                        aria-hidden="true"
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-8 border-t border-line pt-6">
                <dl className="grid grid-cols-2 gap-6">
                  <div>
                    <dt className="eyebrow text-[9px] text-faint">
                      Venue / Coverage
                    </dt>
                    <dd className="mt-1.5 text-xs font-medium leading-snug text-ink">
                      {featured.location}
                    </dd>
                  </div>
                  <div>
                    <dt className="eyebrow text-[9px] text-faint">
                      Ticketing Partner
                    </dt>
                    <dd className="mt-1.5 text-xs font-semibold leading-snug text-forest">
                      {featured.ticketPartner || 'Khalti by IME'} &bull;{' '}
                      {featured.prizePoolLabel}
                    </dd>
                  </div>
                </dl>

                <div className="mt-6 flex flex-wrap gap-3">
                  {featured.ticketUrl ? (
                    <a
                      href={featured.ticketUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-accent"
                    >
                      <span>
                        Buy Tickets ({featured.ticketPartner || 'Khalti'})
                      </span>
                      <ArrowUpRight className="h-4 w-4 text-gold" />
                    </a>
                  ) : (
                    <Link
                      href={`/register?event=${featured.slug}`}
                      className="btn btn-accent"
                    >
                      <span>Register Now</span>
                      <ArrowUpRight className="h-4 w-4 text-gold" />
                    </Link>
                  )}
                  <Link
                    href={`/events/${featured.slug}`}
                    className="btn btn-outline bg-white"
                  >
                    <span>Explore Production</span>
                  </Link>
                </div>
              </div>
            </Reveal>
          </div>

          <Reveal className="order-1 lg:order-2 lg:col-span-5">
            <Tilt3D maxTilt={6} scale={1.015} className="h-full">
              <Link
                href={`/events/${featured.slug}`}
                className="group relative flex h-full flex-col rounded-[2px] border-2 border-ink bg-white p-3 shadow-[10px_10px_0px_0px_rgba(12,20,16,0.08)]"
              >
                <div className="relative aspect-[4/4.8] w-full flex-1 overflow-hidden bg-[#020816]">
                  <Image
                    src={featured.image}
                    alt={featured.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 42vw"
                    className="img-zoom object-cover"
                  />
                </div>
                <div className="mt-3 flex items-center justify-between px-1 font-mono text-[9.5px] uppercase tracking-[0.14em] text-muted">
                  <span>{featured.seasonOrYear}</span>
                  <span className="inline-flex items-center gap-1 text-forest">
                    View Dossier
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </span>
                </div>
              </Link>
            </Tilt3D>
          </Reveal>
        </div>

        {/* 4-Column Minimal Architectural Plates with 3D Tilt */}
        <AnimeStaggerContainer
          stagger={85}
          distance={18}
          className="mt-10 grid gap-6 border-t border-ink/15 pt-10 sm:grid-cols-2 lg:grid-cols-4"
        >
          {rest.map((event, idx) => (
            <Tilt3D
              key={event.slug}
              maxTilt={4.5}
              scale={1.01}
              glare={false}
              className="h-full"
            >
              <Link
                href={`/events/${event.slug}`}
                className="group flex h-full flex-col justify-between rounded-[2px] border border-line bg-white p-5 transition-colors duration-300 hover:border-forest"
              >
                <div>
                  <div className="flex items-center justify-between border-b border-line pb-3 font-mono text-[9.5px] uppercase tracking-[0.14em] text-muted">
                    <span className="text-forest">
                      0{idx + 2} / {event.shortLabel || event.codePrefix}
                    </span>
                    <ArrowUpRight className="h-3.5 w-3.5 text-faint transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-forest" />
                  </div>

                  <div className="relative mt-4 aspect-[16/10] w-full overflow-hidden border border-line bg-paper-deep">
                    <Image
                      src={event.heroStageImage || event.image}
                      alt={event.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 25vw"
                      className="img-zoom object-cover"
                    />
                  </div>

                  <h4 className="display mt-4 text-xl font-bold text-ink transition-colors group-hover:text-forest">
                    {event.title}
                  </h4>
                  <p className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-muted">
                    {event.summary}
                  </p>
                </div>

                <div className="mt-4 flex items-center justify-between border-t border-line pt-3 font-mono text-[9.5px] uppercase tracking-[0.12em] text-ink-soft">
                  <span>{event.seasonOrYear}</span>
                  <span className="text-forest">{event.prizePoolLabel}</span>
                </div>
              </Link>
            </Tilt3D>
          ))}
        </AnimeStaggerContainer>
      </div>
    </section>
  );
}
