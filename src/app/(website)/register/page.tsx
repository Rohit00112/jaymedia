import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight, MapPin } from 'lucide-react';
import PageHero from '@/components/shared/PageHero';
import EventRegistrationForm from '@/components/forms/EventRegistrationForm';
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
        title={
          <>
            Register across <span className="text-forest">all Jay Media events.</span>
          </>
        }
        description="Choose an open Jay Media production below to open its dedicated brief or submit your entry directly in the unified form."
        compact
        meta={[
          { label: 'Open Events', value: `${String(openEvents.length).padStart(2, '0')} active` },
          { label: 'Base Studio', value: 'Biratnagar HQ' },
          { label: 'Audition Access', value: 'In-Person & Online' },
          { label: 'Pass Tracking', value: 'Instant User Code' },
        ]}
      />

      {/* Active Event Cards Selector */}
      <section className="border-b border-line bg-paper-deep py-14">
        <div className="container-ed">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4 border-b border-ink/15 pb-4">
            <div>
              <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-forest">
                01 / Active Productions
              </span>
              <h2 className="display mt-1.5 text-2xl font-bold text-ink sm:text-3xl">
                Select Your Production &amp; Audition Division
              </h2>
            </div>

            <Link href="/#application-status" className="btn btn-outline bg-white">
              <span>Already Registered? Verify Pass</span>
            </Link>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {openEvents.map((event, idx) => (
              <div
                key={event.slug}
                className="flex flex-col justify-between border border-line bg-white transition-colors hover:border-forest"
              >
                <div>
                  <div className="flex items-center justify-between border-b border-line px-4 py-2.5 font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-forest">
                    <span>0{idx + 1} &bull; {event.codePrefix}</span>
                    <span className="text-muted">{event.eligibility}</span>
                  </div>

                  <div className="relative aspect-[16/10] w-full overflow-hidden border-b border-line bg-sand">
                    <Image
                      src={event.heroStageImage || event.image}
                      alt={event.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 25vw"
                      className="object-cover"
                    />
                  </div>

                  <div className="p-4">
                    <h3 className="display text-lg font-bold text-ink">
                      {event.title}
                    </h3>
                    <p className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-muted">
                      {event.tagline}
                    </p>
                    <p className="mt-3 flex items-center gap-1.5 font-mono text-[10px] text-ink-soft">
                      <MapPin className="h-3 w-3 shrink-0 text-forest" />
                      <span className="truncate">{event.coverageLabel}</span>
                    </p>
                  </div>
                </div>

                <div className="border-t border-line p-4">
                  <Link
                    href={`/register/${event.slug}`}
                    className="btn btn-accent w-full"
                  >
                    <span>Register Here</span>
                    <ArrowUpRight className="h-3.5 w-3.5 text-gold" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Unified Form with Live Event Selector */}
      <section className="py-14 md:py-20">
        <div className="container-ed max-w-4xl">
          <div className="mb-8 border-b border-line pb-4">
            <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-forest">
              02 / Direct Entry Sheet
            </span>
            <h2 className="display mt-1.5 text-2xl font-bold text-ink">
              Submit Registration Online
            </h2>
          </div>

          <EventRegistrationForm
            eventSlug={openEvents[0]?.slug || 'nepal-kids-idol'}
            eventTitle={openEvents[0]?.title || 'Jay Media Production'}
            availableEvents={openEvents}
          />
        </div>
      </section>
    </div>
  );
}
