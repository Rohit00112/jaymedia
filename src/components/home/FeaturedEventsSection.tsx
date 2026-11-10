import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowUpRight,
  Calendar,
  CheckCircle2,
  MapPin,
  Sparkles,
  Ticket,
} from 'lucide-react';
import SectionHeading from '@/components/shared/SectionHeading';
import Reveal from '@/components/motion/Reveal';
import { AnimeStaggerContainer } from '@/components/motion';
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

        {/* Asymmetric 7 / 5 Concert Arena Spotlight */}
        <div className="grid items-stretch gap-8 lg:grid-cols-12 lg:gap-10">
          <div className="order-2 lg:order-1 lg:col-span-7">
            <Reveal
              delay={60}
              className="flex h-full flex-col justify-between overflow-hidden rounded-[6px] border border-ink/15 bg-white shadow-[0_22px_48px_-28px_rgba(12,20,16,0.18)]"
            >
              {/* Dark Luxury Concert Header Strip */}
              <div className="flex flex-wrap items-center justify-between gap-3 bg-gradient-to-r from-[#031426] via-[#052138] to-forest px-6 py-4 text-white sm:px-8">
                <span className="inline-flex items-center gap-2 font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-gold">
                  <Sparkles className="h-3.5 w-3.5" />
                  Headline Concert &bull; Subah Aye Na Tour
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-[2px] bg-white/10 px-2.5 py-1 font-mono text-[9.5px] font-semibold uppercase tracking-[0.14em] text-white">
                  <Calendar className="h-3 w-3 text-gold" />
                  {featured.seasonOrYear}
                </span>
              </div>

              <div className="flex flex-1 flex-col justify-between p-6 sm:p-8 md:p-9">
                <div>
                  <h3 className="display text-[clamp(2rem,3.4vw,3.1rem)] font-extrabold text-ink">
                    {featured.title}
                  </h3>

                  <p className="mt-3 text-sm leading-relaxed text-ink-soft md:text-base">
                    {featured.summary}
                  </p>

                  {/* 4-Tier Khalti Pricing Grid */}
                  {featured.prizes && (
                    <div className="mt-6">
                      <div className="mb-2.5 flex items-center justify-between font-mono text-[9.5px] font-semibold uppercase tracking-[0.14em] text-forest">
                        <span>Official Khalti Early Bird Ticket Tiers</span>
                        <span className="text-muted">Code: ET26BJD3F93W</span>
                      </div>
                      <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
                        {featured.prizes.map((tier, idx) => (
                          <div
                            key={tier.rank}
                            className={
                              idx === 0
                                ? 'rounded-[3px] border border-forest bg-forest/[0.05] p-3'
                                : 'rounded-[3px] border border-line bg-paper-deep/60 p-3'
                            }
                          >
                            <span className="block font-mono text-[8.5px] font-semibold uppercase tracking-[0.12em] text-muted">
                              {tier.rank.replace('Early Bird ', '')}
                            </span>
                            <span className="display mt-1 block text-base font-extrabold text-ink">
                              {tier.amount}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <ul className="mt-6 grid gap-2.5 border-t border-line pt-5 sm:grid-cols-2">
                    {featured.highlights.slice(0, 4).map((item) => (
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

                <div className="mt-7 border-t border-line pt-6">
                  <dl className="grid grid-cols-2 gap-5">
                    <div>
                      <dt className="eyebrow text-[9px] text-faint">
                        Stadium Venue
                      </dt>
                      <dd className="mt-1.5 flex items-start gap-1.5 text-xs font-semibold leading-snug text-ink">
                        <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-forest" />
                        {featured.location}
                      </dd>
                    </div>
                    <div>
                      <dt className="eyebrow text-[9px] text-faint">
                        Digital Ticketing Partner
                      </dt>
                      <dd className="mt-1.5 text-xs font-bold leading-snug text-forest">
                        {featured.ticketPartner || 'Khalti by IME'} &bull;{' '}
                        {featured.prizePoolLabel}
                      </dd>
                    </div>
                  </dl>

                  <div className="mt-6 flex flex-wrap gap-3">
                    {featured.ticketUrl && (
                      <a
                        href={featured.ticketUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-accent"
                      >
                        <Ticket className="h-4 w-4 text-gold" />
                        <span>
                          Buy Tickets on {featured.ticketPartner || 'Khalti'}
                        </span>
                        <ArrowUpRight className="h-4 w-4 text-gold" />
                      </a>
                    )}
                    <Link
                      href={`/events/${featured.slug}`}
                      className="btn btn-outline bg-white"
                    >
                      <span>Explore Concert Dossier</span>
                    </Link>
                    <Link
                      href="/gallery"
                      className="btn btn-outline bg-white"
                    >
                      <span>Concert Gallery</span>
                    </Link>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

          <Reveal className="order-1 lg:order-2 lg:col-span-5">
            <Link
              href={`/events/${featured.slug}`}
              className="group relative flex h-full flex-col overflow-hidden rounded-[6px] border-2 border-ink bg-[#020816] p-2.5 shadow-[12px_12px_0px_0px_rgba(1,64,43,0.16)] transition-transform duration-300 hover:-translate-y-1"
            >
              <div className="relative aspect-[4/4.8] w-full flex-1 overflow-hidden rounded-[3px]">
                <Image
                  src={featured.image}
                  alt={featured.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 42vw"
                  className="img-zoom object-cover"
                />
                <span className="absolute right-3 top-3 rounded-[2px] bg-gold px-2.5 py-1 font-mono text-[9px] font-bold uppercase tracking-[0.14em] text-ink shadow-sm">
                  19 Dec 2026
                </span>
              </div>

              <div className="mt-2.5 flex items-center justify-between px-1.5 py-1 font-mono text-[9.5px] uppercase tracking-[0.14em] text-white/85">
                <span className="text-gold">Itahari Stadium, Nepal</span>
                <span className="inline-flex items-center gap-1 text-white group-hover:text-gold">
                  View Production
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </span>
              </div>
            </Link>
          </Reveal>
        </div>

        {/* 4-Column Indexed Franchise Plates */}
        <AnimeStaggerContainer
          stagger={85}
          distance={18}
          className="mt-12 grid gap-6 border-t border-ink/15 pt-10 sm:grid-cols-2 lg:grid-cols-4"
        >
          {rest.map((event, idx) => (
            <Link
              key={event.slug}
              href={`/events/${event.slug}`}
              className="group flex flex-col overflow-hidden rounded-[5px] border border-line bg-white transition-all duration-300 hover:-translate-y-1 hover:border-forest hover:shadow-[0_18px_36px_-22px_rgba(1,64,43,0.22)]"
            >
              <div className="flex items-center justify-between border-b border-line bg-paper-deep/50 px-4 py-3 font-mono text-[9.5px] font-semibold uppercase tracking-[0.14em]">
                <span className="text-forest">
                  0{idx + 1} / {event.shortLabel || event.codePrefix}
                </span>
                {event.registrationOpen && (
                  <span className="rounded-[2px] bg-forest/10 px-2 py-0.5 text-[8.5px] font-bold text-forest">
                    Auditions Open
                  </span>
                )}
              </div>

              <div className="relative aspect-[16/10] w-full overflow-hidden border-b border-line bg-paper-deep">
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
                  <span className="font-mono text-[9px] font-semibold uppercase tracking-[0.12em] text-muted">
                    {event.seasonOrYear}
                  </span>
                  <h4 className="display mt-1 text-xl font-bold text-ink transition-colors group-hover:text-forest">
                    {event.title}
                  </h4>
                  <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-muted">
                    {event.summary}
                  </p>
                </div>

                <div className="mt-4 flex items-center justify-between border-t border-line pt-3 font-mono text-[9.5px] uppercase tracking-[0.12em] text-ink-soft">
                  <span className="truncate font-semibold text-forest">
                    {event.prizePoolLabel}
                  </span>
                  <ArrowUpRight className="h-3.5 w-3.5 shrink-0 text-faint transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-forest" />
                </div>
              </div>
            </Link>
          ))}
        </AnimeStaggerContainer>
      </div>
    </section>
  );
}
