import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowUpRight, Play } from 'lucide-react';
import PageHero from '@/components/shared/PageHero';
import SectionHeading from '@/components/shared/SectionHeading';
import CtaBand from '@/components/shared/CtaBand';
import Reveal from '@/components/motion/Reveal';
import { EVENTS_DATA } from '@/config/events-data';
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
  const event = EVENTS_DATA.find((e) => e.slug === slug);
  if (!event) return {};

  return generatePageMetadata({
    title: `${event.title} | Events | Jay Media Management`,
    description: event.summary,
  });
}

export default async function EventDetailPage({ params }: Props) {
  const { slug } = await params;
  const event = EVENTS_DATA.find((e) => e.slug === slug);

  if (!event) {
    notFound();
  }

  const currentIndex = EVENTS_DATA.findIndex((e) => e.slug === event.slug);
  const nextEvent = EVENTS_DATA[(currentIndex + 1) % EVENTS_DATA.length];

  return (
    <div className="min-h-screen bg-paper text-ink">
      <PageHero
        breadcrumb={{ label: 'All productions', href: '/events' }}
        eyebrow={`${event.category} / ${event.seasonOrYear}`}
        title={event.title}
        description={event.tagline}
        image={event.image}
        imageAlt={event.title}
        meta={[
          { label: 'Season', value: event.seasonOrYear },
          { label: 'Location', value: event.location },
          { label: 'Organizer', value: 'Jay Media Management' },
          { label: 'Format', value: 'Live + broadcast' },
        ]}
      />

      <section className="py-20 md:py-28">
        <div className="container-ed grid gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-7">
            <span className="eyebrow flex items-center gap-2.5 text-accent">
              <span className="h-px w-6 bg-accent" aria-hidden="true" />
              01 / Production background
            </span>

            <Reveal>
              <h2 className="display mt-5 max-w-[14ch] text-balance text-[clamp(2.2rem,4.5vw,4.7rem)] text-ink">
                A legacy of stagecraft in{' '}
                <span className="serif italic text-accent">Koshi.</span>
              </h2>
            </Reveal>

            <Reveal delay={90}>
              <p className="mt-8 max-w-2xl text-pretty text-sm leading-relaxed text-muted md:text-base">
                {event.overview}
              </p>

              <h3 className="eyebrow mt-10 text-faint">Signature accolades</h3>
              <ul className="mt-4 grid gap-x-8 gap-y-3 sm:grid-cols-2">
                {event.highlights.map((highlight, index) => (
                  <li
                    key={highlight}
                    className="flex items-start gap-3 border-t border-line pt-3 text-sm leading-relaxed text-muted"
                  >
                    <span className="mono pt-0.5 text-[9px] tracking-[0.16em] text-accent">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    {highlight}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          <div className="lg:col-span-4 lg:col-start-9">
            <Reveal delay={120}>
              <div className="border border-line bg-card p-6 md:p-7">
                <span className="eyebrow text-accent">
                  {event.registrationOpen
                    ? 'Active Competition • Register Open'
                    : 'Titleholders & recognition'}
                </span>
                {event.prizes && (
                  <div className="mt-4 grid grid-cols-2 gap-2.5 border-b border-line pb-5">
                    {event.prizes.map((p) => (
                      <div
                        key={p.rank}
                        className="rounded-[6px] border border-line bg-paper p-3"
                      >
                        <span className="block font-mono text-[9px] uppercase tracking-wider text-muted">
                          {p.rank}
                        </span>
                        <span className="mono mt-0.5 block text-sm font-bold text-forest">
                          {p.amount}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
                <div className="mt-5">
                  {event.hallOfFameOrWinners.map((winner) => (
                    <div
                      key={winner.title}
                      className="border-b border-line py-5 first:pt-0 last:border-b-0 last:pb-0"
                    >
                      <h3 className="display text-2xl text-ink">
                        {winner.title}
                      </h3>
                      <p className="mt-2 text-xs leading-relaxed text-muted">
                        {winner.note}
                      </p>
                    </div>
                  ))}
                </div>

                {event.registrationOpen ? (
                  <Link
                    href={`/register/${event.slug}`}
                    className="btn btn-accent mt-6 w-full"
                  >
                    Register Contestant Now
                    <ArrowUpRight className="h-4 w-4" />
                  </Link>
                ) : (
                  <Link href="/contact" className="text-link mt-6 text-ink">
                    Sponsor this production
                    <ArrowUpRight className="h-3.5 w-3.5 text-accent" />
                  </Link>
                )}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="border-y border-line bg-paper-deep py-20 md:py-28">
        <div className="container-ed">
          <SectionHeading
            eyebrow="02 / Stages of competition"
            title={
              <>
                From auditions to the{' '}
                <span className="serif italic text-accent">coronation.</span>
              </>
            }
            description="Each edition is built as a sequence of moments, engineered to build anticipation towards the finale."
          />

          <div className="grid gap-8 md:grid-cols-3 md:gap-10">
            {event.scheduleOrPhases.map((phase, index) => (
              <Reveal key={phase.title} delay={index * 70}>
                <div className="border-t border-line-strong pt-6">
                  <span className="display block text-6xl leading-none text-outline md:text-7xl">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span className="eyebrow mt-6 block text-[8px] text-accent">
                    Stage {String(index + 1).padStart(2, '0')}
                  </span>
                  <h3 className="display mt-3 text-2xl text-ink md:text-3xl">
                    {phase.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted">
                    {phase.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28">
        <div className="container-ed grid gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-7">
            <span className="eyebrow flex items-center gap-2.5 text-accent">
              <span className="h-px w-6 bg-accent" aria-hidden="true" />
              03 / Behind the scenes
            </span>

            <Reveal>
              <h2 className="display mt-5 text-balance text-[clamp(2.1rem,4vw,4.2rem)] text-ink">
                Engineered by{' '}
                <span className="serif italic text-accent">Jay Media.</span>
              </h2>
            </Reveal>

            <Reveal delay={90}>
              <p className="mt-7 max-w-xl text-pretty text-sm leading-relaxed text-muted md:text-base">
                Every edition represents weeks of spatial modelling, lighting
                programming, and broadcast rehearsal in Biratnagar to ensure a
                world-class audience experience.
              </p>

              <ul className="mt-8 border-t border-line">
                {event.productionScope.map((scope, index) => (
                  <li
                    key={scope}
                    className="flex items-start gap-5 border-b border-line py-4"
                  >
                    <span className="mono pt-0.5 text-[9px] tracking-[0.16em] text-faint">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span className="text-sm leading-relaxed text-muted">
                      {scope}
                    </span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          <div className="lg:col-span-4 lg:col-start-9">
            <Reveal delay={120}>
              <div className="relative overflow-hidden rounded-[0.4rem] bg-forest p-7 text-cream md:p-8">
                <div
                  className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-gold/10 blur-[60px]"
                  aria-hidden="true"
                />
                <span className="eyebrow relative text-gold">
                  Official broadcaster
                </span>
                <h3 className="display relative mt-4 text-3xl text-cream">
                  Watch the grand finale archive.
                </h3>
                <p className="relative mt-4 text-sm leading-relaxed text-cream/70">
                  Catch full-event broadcasts, coronation announcements, and
                  backstage interviews on our official YouTube channel.
                </p>

                <a
                  href="https://www.youtube.com/@jaymediamanagement"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-white relative mt-7 w-full"
                >
                  <Play className="h-3.5 w-3.5" />
                  Open broadcasts
                </a>

                <Link
                  href="/contact"
                  className="relative mt-6 inline-flex items-center gap-2 border-b border-cream/35 pb-1 text-[13px] font-semibold text-cream transition-colors hover:border-cream"
                >
                  Partner or sponsor
                  <ArrowUpRight className="h-3.5 w-3.5 text-gold" />
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="border-t border-line py-12 md:py-16">
        <div className="container-ed flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <span className="eyebrow text-faint">Next production</span>
            <Link
              href={`/events/${nextEvent.slug}`}
              className="group mt-4 flex items-center gap-4"
            >
              <span className="display text-[clamp(1.8rem,4vw,3.8rem)] text-ink transition-colors duration-300 group-hover:text-accent">
                {nextEvent.title}
              </span>
              <ArrowUpRight className="h-6 w-6 shrink-0 text-accent transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1 md:h-8 md:w-8" />
            </Link>
          </div>
          <span className="eyebrow text-faint">{nextEvent.seasonOrYear}</span>
        </div>
      </section>

      <CtaBand />
    </div>
  );
}
