import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight, MapPin } from 'lucide-react';
import PageHero from '@/components/shared/PageHero';
import EventRegistrationForm from '@/components/forms/EventRegistrationForm';
import Reveal from '@/components/motion/Reveal';
import AnimeStaggerContainer from '@/components/motion/AnimeStaggerContainer';
import { EVENTS_DATA } from '@/config/events-data';
import { generatePageMetadata } from '@/lib/seo';

export const metadata = generatePageMetadata({
  title: 'Event Registrations | Jay Media Management',
  description:
    'Register online across open Jay Media Management productions: Nepal Kids Idol, Miss Koshi, Mr. & Miss Little Koshi, and Nepal Kids Dancing Champion.',
});

export default function RegisterHubPage() {
  const openEvents = EVENTS_DATA.filter((e) => e.registrationOpen);

  return (
    <div className="min-h-screen bg-paper text-ink">
      <PageHero
        eyebrow="Audition & Contestant Portal"
        title="Register for Jay Media events."
        description="Select an open production below or complete your entry directly in the online registration form."
        meta={[
          { label: 'Open Events', value: `${openEvents.length} active` },
          { label: 'Studio', value: 'Biratnagar HQ' },
          { label: 'Auditions', value: 'In-Person & Online' },
          { label: 'Tracking', value: 'Instant User Code' },
        ]}
      />

      {/* Active Event Cards Selector */}
      <section className="border-b border-line bg-paper-deep/50 py-14">
        <div className="container-ed">
          <Reveal className="mb-8">
            <span className="text-xs font-semibold uppercase tracking-wider text-forest">
              Open Productions
            </span>
            <h2 className="mt-1 text-2xl font-semibold text-ink">
              Choose a production
            </h2>
          </Reveal>

          <AnimeStaggerContainer className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {openEvents.map((event) => (
              <div
                key={event.slug}
                className="card-hover group flex flex-col justify-between overflow-hidden rounded-xl border border-line bg-white"
              >
                <div>
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-sand">
                    <Image
                      src={event.heroStageImage || event.image}
                      alt={event.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 25vw"
                      className="img-zoom object-cover"
                    />
                  </div>

                  <div className="p-4">
                    <span className="text-xs font-medium text-forest">
                      {event.eligibility}
                    </span>
                    <h3 className="mt-1 text-base font-semibold text-ink transition-colors group-hover:text-forest">
                      {event.title}
                    </h3>
                    <p className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-muted">
                      {event.tagline}
                    </p>
                    <p className="mt-3 flex items-center gap-1.5 text-xs text-muted">
                      <MapPin className="h-3.5 w-3.5 shrink-0 text-forest" />
                      <span className="truncate">{event.coverageLabel}</span>
                    </p>
                  </div>
                </div>

                <div className="border-t border-line p-4">
                  <Link
                    href={`/register/${event.slug}`}
                    className="btn btn-primary w-full py-2 text-xs"
                  >
                    <span>Register</span>
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </AnimeStaggerContainer>
        </div>
      </section>

      {/* Unified Form */}
      <section className="py-14 md:py-18">
        <Reveal className="container-ed max-w-4xl">
          <div className="mb-8">
            <span className="text-xs font-semibold uppercase tracking-wider text-forest">
              Online Entry
            </span>
            <h2 className="mt-1 text-2xl font-semibold text-ink">
              Submit Registration Form
            </h2>
          </div>

          <EventRegistrationForm
            eventSlug={openEvents[0]?.slug || 'nepal-kids-idol'}
            eventTitle={openEvents[0]?.title || 'Jay Media Production'}
            availableEvents={openEvents}
          />
        </Reveal>
      </section>
    </div>
  );
}
