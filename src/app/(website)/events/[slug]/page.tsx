import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowUpRight, CheckCircle2, Play } from 'lucide-react';
import PageHero from '@/components/shared/PageHero';
import SectionHeading from '@/components/shared/SectionHeading';
import CtaBand from '@/components/shared/CtaBand';
import Reveal from '@/components/motion/Reveal';
import AnimeStaggerContainer from '@/components/motion/AnimeStaggerContainer';
import { EVENTS_DATA } from '@/config/events-data';
import { getEventBySlug, listEvents } from '@/lib/events-store';
import { generatePageMetadata } from '@/lib/seo';

interface Props {
  params: Promise<{ slug: string }>;
}

export const instant = false;

export async function generateStaticParams() {
  return EVENTS_DATA.map((event) => ({
    slug: event.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const event =
    getEventBySlug(slug) || EVENTS_DATA.find((e) => e.slug === slug);
  if (!event) return {};

  return generatePageMetadata({
    title: `${event.title} | Events | Jay Media Management`,
    description: event.summary,
  });
}

export default async function EventDetailPage({ params }: Props) {
  const { slug } = await params;
  const allEvents = listEvents();
  const event =
    getEventBySlug(slug) || EVENTS_DATA.find((e) => e.slug === slug);

  if (!event) {
    notFound();
  }

  const currentIndex = allEvents.findIndex((e) => e.slug === event.slug);
  const nextEvent =
    allEvents[(Math.max(0, currentIndex) + 1) % Math.max(1, allEvents.length)];

  return (
    <div className="min-h-screen bg-paper text-ink">
      <PageHero
        breadcrumb={{ label: 'All productions', href: '/events' }}
        eyebrow={`${event.category} • ${event.seasonOrYear}`}
        title={event.title}
        description={event.tagline}
        image={event.coverBanner || event.heroStageImage || event.image}
        imageAlt={event.title}
        meta={[
          { label: 'Date / Season', value: event.seasonOrYear },
          { label: 'Venue / Scope', value: event.location },
          { label: 'Organizer', value: 'Jay Media Management' },
          {
            label: event.ticketUrl ? 'Ticketing Partner' : 'Format',
            value: event.ticketPartner || 'Live & Broadcast',
          },
        ]}
      />

      {/* Overview & Key Details */}
      <section className="border-b border-line py-16 md:py-20">
        <div className="container-ed grid gap-10 lg:grid-cols-12">
          <Reveal className="lg:col-span-7">
            <p className="text-xs font-semibold uppercase tracking-wider text-forest">
              Overview
            </p>
            <h2 className="mt-2 text-2xl font-semibold text-ink sm:text-3xl">
              About {event.title}
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-muted sm:text-base">
              {event.overview}
            </p>

            <h3 className="mt-8 text-xs font-semibold uppercase tracking-wider text-ink">
              Key Highlights
            </h3>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
              {event.highlights.map((highlight) => (
                <li
                  key={highlight}
                  className="flex items-start gap-2.5 rounded-lg border border-line bg-paper-deep/60 p-3.5 text-sm text-ink-soft transition-colors hover:border-line-strong"
                >
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-forest" />
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.08} className="lg:col-span-5">
            <div className="rounded-xl border border-line bg-paper-deep/50 p-6">
              <span className="text-xs font-semibold uppercase tracking-wider text-forest">
                {event.ticketUrl
                  ? `Official Tickets • ${event.ticketPartner || 'Khalti'}`
                  : event.registrationOpen
                    ? 'Active Competition • Registration Open'
                    : 'Titleholders & Recognition'}
              </span>

              {!event.ticketUrl && event.prizes && (
                <div className="mt-4 grid grid-cols-2 gap-2.5 border-b border-line pb-5">
                  {event.prizes.map((p) => (
                    <div
                      key={p.rank}
                      className="rounded-lg border border-line bg-white p-3"
                    >
                      <span className="block text-xs text-muted">{p.rank}</span>
                      <span className="mt-0.5 block text-sm font-semibold text-ink">
                        {p.amount}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              <div className="mt-4 divide-y divide-line">
                {event.hallOfFameOrWinners.map((winner) => (
                  <div
                    key={winner.title}
                    className="py-4 first:pt-0 last:pb-0"
                  >
                    <h3 className="text-base font-semibold text-ink">
                      {winner.title}
                    </h3>
                    <p className="mt-1 text-xs leading-relaxed text-muted">
                      {winner.note}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-6">
                {event.ticketUrl ? (
                  <a
                    href={event.ticketUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary w-full"
                  >
                    <span>Buy Tickets on {event.ticketPartner || 'Khalti'}</span>
                    <ArrowUpRight className="h-4 w-4" />
                  </a>
                ) : event.registrationOpen ? (
                  <Link
                    href={`/register/${event.slug}`}
                    className="btn btn-primary w-full"
                  >
                    <span>Register Contestant Now</span>
                    <ArrowUpRight className="h-4 w-4" />
                  </Link>
                ) : (
                  <Link href="/contact" className="btn btn-outline w-full">
                    <span>Sponsor This Production</span>
                    <ArrowUpRight className="h-4 w-4" />
                  </Link>
                )}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Schedule / Stages */}
      <section className="border-b border-line bg-paper-deep/50 py-16 md:py-20">
        <div className="container-ed">
          <SectionHeading
            eyebrow="Format & Schedule"
            title="Stages of the production."
            description="Each edition is structured as a clear progression from initial access to the main arena event."
          />

          <AnimeStaggerContainer className="grid gap-6 md:grid-cols-3">
            {event.scheduleOrPhases.map((phase, index) => (
              <div
                key={phase.title}
                className="card-hover rounded-xl border border-line bg-white p-6"
              >
                <span className="inline-flex rounded-md bg-forest-soft px-2.5 py-1 text-xs font-semibold text-forest">
                  Stage 0{index + 1}
                </span>
                <h3 className="mt-3 text-lg font-semibold text-ink">
                  {phase.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {phase.description}
                </p>
              </div>
            ))}
          </AnimeStaggerContainer>
        </div>
      </section>

      {/* Production Scope */}
      <section className="border-b border-line py-16 md:py-20">
        <div className="container-ed grid gap-10 lg:grid-cols-12">
          <Reveal className="lg:col-span-7">
            <p className="text-xs font-semibold uppercase tracking-wider text-forest">
              Behind the Scenes
            </p>
            <h2 className="mt-2 text-2xl font-semibold text-ink sm:text-3xl">
              Production &amp; Technical Scope
            </h2>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted sm:text-base">
              Every edition combines spatial planning, lighting and sound
              engineering, and broadcast management from our Biratnagar team.
            </p>

            <ul className="mt-6 divide-y divide-line border-y border-line">
              {event.productionScope.map((scope) => (
                <li
                  key={scope}
                  className="flex items-start gap-3 py-3.5 text-sm text-ink-soft"
                >
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-forest" />
                  <span>{scope}</span>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.08} className="lg:col-span-5">
            <div className="rounded-xl border border-line bg-paper-deep p-6 sm:p-7">
              <span className="text-xs font-semibold uppercase tracking-wider text-forest">
                Official Archive
              </span>
              <h3 className="mt-2 text-xl font-semibold text-ink">
                Watch highlights &amp; broadcasts.
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                Catch full-event broadcasts, coronation announcements, and
                backstage interviews on our official YouTube channel.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href="https://www.youtube.com/@JayMediaManagementPvtLtd"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary"
                >
                  <Play className="h-3.5 w-3.5" />
                  <span>YouTube Channel</span>
                </a>
                <Link href="/contact" className="btn btn-outline">
                  Partner or Sponsor
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Next Production */}
      <section className="py-10">
        <div className="container-ed flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <span className="text-xs text-muted">Next production</span>
            <Link
              href={`/events/${nextEvent.slug}`}
              className="group mt-1 flex items-center gap-2 text-lg font-semibold text-ink transition-colors hover:text-forest"
            >
              <span>{nextEvent.title}</span>
              <ArrowUpRight className="h-4 w-4 text-forest transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>
          <span className="text-xs text-muted">{nextEvent.seasonOrYear}</span>
        </div>
      </section>

      <CtaBand />
    </div>
  );
}
