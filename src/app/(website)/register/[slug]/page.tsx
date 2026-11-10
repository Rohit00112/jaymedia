import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import PageHero from '@/components/shared/PageHero';
import EventRegistrationForm from '@/components/forms/EventRegistrationForm';
import { EVENTS_DATA } from '@/config/events-data';
import { getEventBySlug } from '@/lib/events-store';
import { EVENT_JUDGES, TEAM_PROFILES } from '@/config/team-data';
import { generatePageMetadata } from '@/lib/seo';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return EVENTS_DATA.map((event) => ({ slug: event.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const event = getEventBySlug(slug) || EVENTS_DATA.find((e) => e.slug === slug);
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

  const isKidsIdol = event.slug === 'nepal-kids-idol';
  const peopleStrip = isKidsIdol ? EVENT_JUDGES : TEAM_PROFILES.slice(0, 2);

  return (
    <div className="min-h-screen bg-paper text-ink">
      <PageHero
        breadcrumb={{ label: 'All open registrations', href: '/register' }}
        eyebrow="Official Contestant Entry"
        title={
          <>
            Register for <span className="text-forest">{event.title}</span>
          </>
        }
        description={event.tagline}
        compact
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
          <div className="mb-7 flex flex-wrap items-center justify-between gap-4">
            <div>
              <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-forest">
                {isKidsIdol ? 'Jury Panel' : 'Production Leadership'}
              </span>
              <h2 className="display mt-1 text-2xl font-bold text-ink">
                {isKidsIdol
                  ? 'Official Event Judges'
                  : 'Jay Media Producers & Direction'}
              </h2>
            </div>
            <div className="flex flex-wrap gap-2.5">
              <Link href="/register" className="btn btn-outline bg-white">
                <span>Switch Production</span>
              </Link>
              <Link href="/#application-status" className="btn btn-outline bg-white">
                <span>Already Registered? Check Pass</span>
              </Link>
            </div>
          </div>

          <div className="grid max-w-3xl grid-cols-1 gap-5 sm:grid-cols-2">
            {peopleStrip.map((person) => (
              <Link
                key={person.slug}
                href={`/team/${person.slug}`}
                className="group flex items-center gap-4 rounded-[2px] border border-line bg-paper-deep/50 p-3 transition-colors hover:border-forest hover:bg-white"
              >
                <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-[2px] bg-sand">
                  <Image
                    src={person.image}
                    alt={person.name}
                    fill
                    sizes="80px"
                    className="object-cover object-top"
                  />
                </div>
                <div>
                  <h3 className="display text-lg font-bold text-ink group-hover:text-forest">
                    {person.name}
                  </h3>
                  <p className="text-xs text-muted">
                    {'title' in person ? person.title : person.role}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Registration Form */}
      <section className="py-14 md:py-20">
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
