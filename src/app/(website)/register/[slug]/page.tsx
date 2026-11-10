import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import PageHero from '@/components/shared/PageHero';
import EventRegistrationForm from '@/components/forms/EventRegistrationForm';
import { EVENTS_DATA } from '@/config/events-data';
import { EVENT_JUDGES } from '@/config/team-data';
import { generatePageMetadata } from '@/lib/seo';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return [{ slug: 'nepal-kids-idol' }, { slug: 'miss-koshi' }, { slug: 'mr-and-miss-little-koshi' }];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const event = EVENTS_DATA.find((e) => e.slug === slug);
  const title = event ? `Register for ${event.title}` : 'Event Registration';
  return generatePageMetadata({
    title: `${title} | Jay Media Management`,
    description:
      'Official online contestant registration for Nepal Kids Idol and Jay Media Management events in Biratnagar, Nepal.',
  });
}

export default async function EventRegisterPage({ params }: Props) {
  const { slug } = await params;
  const event =
    EVENTS_DATA.find((e) => e.slug === slug) ||
    EVENTS_DATA.find((e) => e.slug === 'nepal-kids-idol') ||
    EVENTS_DATA[0];

  return (
    <div className="min-h-screen bg-paper text-ink">
      <PageHero
        breadcrumb={{ label: 'Event details', href: `/events/${event.slug}` }}
        eyebrow="Official Contestant Entry"
        title={
          <>
            Register for{' '}
            <span className="serif italic text-accent">{event.title}</span>
          </>
        }
        description={event.tagline}
        compact
        meta={[
          { label: 'Season', value: event.seasonOrYear },
          { label: 'Eligibility', value: 'Ages 5–15' },
          { label: 'Coverage', value: 'All 77 Districts + Intl' },
          { label: 'Prize Pool', value: 'Rs. 2,000,000' },
        ]}
      />

      {/* Event Judges Strip */}
      <section className="border-b border-line bg-white py-12">
        <div className="container-ed">
          <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
            <div>
              <span className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-forest">
                Jury Panel
              </span>
              <h2 className="display mt-1 text-2xl font-bold text-ink">
                Official Event Judges
              </h2>
            </div>
            <Link
              href="/#application-status"
              className="rounded-full border border-forest/25 px-4 py-2 text-xs font-bold uppercase tracking-wider text-forest hover:bg-forest hover:text-white"
            >
              Already Registered? Check Status
            </Link>
          </div>

          <div className="grid max-w-2xl grid-cols-1 gap-6 sm:grid-cols-2">
            {EVENT_JUDGES.map((judge) => (
              <Link
                key={judge.slug}
                href={`/team/${judge.slug}`}
                className="group flex items-center gap-4 rounded-[10px] border border-line bg-paper p-3 transition-colors hover:border-forest"
              >
                <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-[8px] bg-sand">
                  <Image
                    src={judge.image}
                    alt={judge.name}
                    fill
                    sizes="80px"
                    className="object-cover object-top"
                  />
                </div>
                <div>
                  <h3 className="display text-lg font-bold text-forest group-hover:text-ink">
                    {judge.name}
                  </h3>
                  <p className="text-xs text-muted">{judge.title}</p>
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
          />
        </div>
      </section>
    </div>
  );
}

