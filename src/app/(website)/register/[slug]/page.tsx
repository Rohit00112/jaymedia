import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import PageHero from '@/components/shared/PageHero';
import EventRegistrationForm from '@/components/forms/EventRegistrationForm';
import { EVENTS_DATA } from '@/config/events-data';
import { getEventBySlug } from '@/lib/events-store';
import { TEAM_PROFILES } from '@/config/team-data';
import { generatePageMetadata } from '@/lib/seo';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return EVENTS_DATA.map((event) => ({ slug: event.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const event =
    getEventBySlug(slug) || EVENTS_DATA.find((e) => e.slug === slug);
  const title = event ? `Register for ${event.title}` : 'Event Registration';
  return generatePageMetadata({
    title: `${title} | Jay Media Management`,
    description:
      event?.tagline ||
      'Official online contestant registration for Jay Media Management productions in Biratnagar, Nepal.',
  });
}

export default async function EventRegisterPage({ params }: Props) {
  const { slug } = await params;
  const event =
    getEventBySlug(slug) ||
    EVENTS_DATA.find((e) => e.slug === slug) ||
    EVENTS_DATA[0];

  const peopleStrip = TEAM_PROFILES.slice(0, 2);

  return (
    <div className="min-h-screen bg-paper text-ink">
      <PageHero
        breadcrumb={{ label: 'All open registrations', href: '/register' }}
        eyebrow="Contestant Registration"
        title={`Register for ${event.title}`}
        description={event.tagline}
        meta={[
          { label: 'Season', value: event.seasonOrYear },
          { label: 'Eligibility', value: event.eligibility },
          { label: 'Coverage', value: event.coverageLabel },
          { label: 'Awards / Pool', value: event.prizePoolLabel },
        ]}
      />

      {/* Event Panel Strip */}
      <section className="border-b border-line bg-white py-10">
        <div className="container-ed">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-forest">
                Production Leadership
              </span>
              <h2 className="mt-1 text-xl font-semibold text-ink">
                Producers &amp; Direction
              </h2>
            </div>
            <div className="flex flex-wrap gap-2.5">
              <Link href="/register" className="btn btn-outline py-2 text-xs">
                Switch Production
              </Link>
              <Link
                href="/#application-status"
                className="btn btn-outline py-2 text-xs"
              >
                Check Application Status
              </Link>
            </div>
          </div>

          <div className="grid max-w-2xl grid-cols-1 gap-4 sm:grid-cols-2">
            {peopleStrip.map((person) => (
              <Link
                key={person.slug}
                href={`/team/${person.slug}`}
                className="group flex items-center gap-3.5 rounded-xl border border-line bg-paper-deep/50 p-3 transition-colors hover:border-line-strong hover:bg-white"
              >
                <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg bg-sand">
                  <Image
                    src={person.image}
                    alt={person.name}
                    fill
                    sizes="56px"
                    className="object-cover object-top"
                  />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-ink group-hover:text-forest">
                    {person.name}
                  </h3>
                  <p className="text-xs text-muted">{person.role}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Registration Form */}
      <section className="py-14 md:py-18">
        <div className="container-ed max-w-4xl">
          <EventRegistrationForm
            eventSlug={event.slug}
            eventTitle={event.title}
            availableEvents={EVENTS_DATA.filter((e) => e.registrationOpen)}
          />
        </div>
      </section>
    </div>
  );
}
