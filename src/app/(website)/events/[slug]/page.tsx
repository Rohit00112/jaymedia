import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowUpRight, Play } from 'lucide-react';
import PageHero from '@/components/shared/PageHero';
import SectionHeading from '@/components/shared/SectionHeading';
import CtaBand from '@/components/shared/CtaBand';
import { EVENTS_DATA } from '@/config/events-data';
import { generatePageMetadata } from '@/lib/seo';

interface Props {
  params: Promise<{ slug: string }>;
}

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

  return (
    <div className="min-h-screen bg-surface text-paper">
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

      {/* Overview + hall of fame */}
      <section className="border-b border-line bg-surface py-20 md:py-28 lg:py-32">
        <div className="container-ed grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <div className="flex items-center gap-4">
              <span className="h-px w-10 bg-coral" aria-hidden="true" />
              <span className="eyebrow text-coral">Production background</span>
            </div>

            <h2 className="display mt-5 text-[clamp(2.4rem,5vw,5rem)]">
              A legacy of stagecraft in{' '}
              <span className="serif text-coral">Koshi.</span>
            </h2>

            <p className="mt-8 text-base leading-relaxed text-muted md:text-lg">
              {event.overview}
            </p>

            <h3 className="eyebrow mt-10 text-faint">Signature accolades</h3>
            <ul className="mt-4 grid gap-x-8 gap-y-3 sm:grid-cols-2">
              {event.highlights.map((highlight, index) => (
                <li
                  key={highlight}
                  className="flex items-start gap-3 border-t border-line pt-3 text-sm leading-relaxed text-muted"
                >
                  <span className="eyebrow pt-1 text-[8px] text-coral">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  {highlight}
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-4 lg:col-start-9">
            <div className="border-t border-coral pt-5">
              <span className="eyebrow text-paper">
                Titleholders &amp; recognition
              </span>
              <div className="mt-6 space-y-6">
                {event.hallOfFameOrWinners.map((winner) => (
                  <div
                    key={winner.title}
                    className="border-b border-line pb-5"
                  >
                    <h3 className="display text-2xl text-paper">
                      {winner.title}
                    </h3>
                    <p className="mt-2 text-xs leading-relaxed text-muted">
                      {winner.note}
                    </p>
                  </div>
                ))}
              </div>

              <Link
                href="/contact"
                className="text-link mt-8 text-paper"
              >
                Sponsor this production
                <ArrowUpRight className="h-3.5 w-3.5 text-coral" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Phases */}
      <section className="border-b border-line bg-surface-alt py-20 md:py-28 lg:py-32">
        <div className="container-ed">
          <SectionHeading
            eyebrow="Stages of competition"
            title={
              <>
                From auditions to the{' '}
                <span className="serif text-coral">coronation.</span>
              </>
            }
            description="Each edition is built as a sequence of moments, engineered to build anticipation towards the finale."
          />

          <div className="grid gap-10 md:grid-cols-3 md:gap-8">
            {event.scheduleOrPhases.map((phase, index) => (
              <div key={phase.title} className="border-t border-line pt-6">
                <span className="display block text-6xl leading-none text-outline md:text-7xl">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span className="eyebrow mt-6 block text-[8px] text-coral">
                  Stage {String(index + 1).padStart(2, '0')}
                </span>
                <h3 className="display mt-3 text-2xl text-paper md:text-3xl">
                  {phase.title}
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-muted">
                  {phase.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Production scope */}
      <section className="bg-surface py-20 md:py-28">
        <div className="container-ed grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <div className="flex items-center gap-4">
              <span className="h-px w-10 bg-coral" aria-hidden="true" />
              <span className="eyebrow text-coral">Behind the scenes</span>
            </div>

            <h2 className="display mt-5 text-[clamp(2.2rem,4.4vw,4.4rem)]">
              Engineered by{' '}
              <span className="serif text-coral">Jay Media.</span>
            </h2>

            <p className="mt-7 max-w-xl text-base leading-relaxed text-muted">
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
                  <span className="eyebrow pt-1 text-[8px] text-coral">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span className="text-sm leading-relaxed text-muted">
                    {scope}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-4 lg:col-start-9">
            <div className="border border-line p-7 md:p-8">
              <span className="eyebrow text-coral">Official broadcaster</span>
              <h3 className="display mt-4 text-3xl text-paper">
                Watch the grand finale archive.
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-muted">
                Catch full-event broadcasts, coronation announcements, and
                backstage interviews on our official YouTube channel.
              </p>

              <a
                href="https://www.youtube.com/@jaymediamanagement"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline mt-7 w-full"
              >
                <Play className="h-3.5 w-3.5" />
                Open broadcasts
              </a>

              <Link
                href="/contact"
                className="text-link mt-6 text-paper"
              >
                Partner or sponsor
                <ArrowUpRight className="h-3.5 w-3.5 text-coral" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <CtaBand />
    </div>
  );
}
