import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, Plus } from 'lucide-react';
import PageHero from '@/components/shared/PageHero';
import SectionHeading from '@/components/shared/SectionHeading';
import CtaBand from '@/components/shared/CtaBand';
import { generatePageMetadata } from '@/lib/seo';
import { SERVICES_DATA } from '@/config/services-data';
import { cn } from '@/lib/utils';

export const metadata: Metadata = generatePageMetadata({
  title: 'Our Services & Capabilities | Jay Media Management',
  description:
    'Comprehensive event production and media services by Jay Media Management in Biratnagar, Nepal: Event Management, Brand Experiences, Media Production, Product Launches, and Press Conferences.',
});

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-surface text-paper">
      <PageHero
        eyebrow="What we do"
        title={
          <>
            Ideas into{' '}
            <span className="serif text-coral">extraordinary</span>{' '}
            experiences.
          </>
        }
        description="From technical stagecraft and pageant choreography to commercial brand activations, explore our complete suite of production capabilities."
        image="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1800&q=85"
        imageAlt="Concert production lights and stage atmosphere"
        meta={[
          { label: 'Disciplines', value: '05 core services' },
          { label: 'Model', value: 'End-to-end production' },
          { label: 'Based in', value: 'Biratnagar, Nepal' },
          { label: 'Coverage', value: 'Koshi Province & beyond' },
        ]}
      />

      <section className="border-b border-line bg-surface py-20 md:py-28 lg:py-32">
        <div className="container-ed">
          <SectionHeading
            eyebrow="Capability index"
            title={
              <>
                Built for the{' '}
                <span className="serif text-coral">live moment.</span>
              </>
            }
            description="Five disciplines, one production standard. Every service is led by a dedicated producer and technical director."
          />

          <div>
            {SERVICES_DATA.map((service, index) => {
              const reversed = index % 2 === 1;

              return (
                <article
                  key={service.slug}
                  id={service.slug}
                  className="grid scroll-mt-28 gap-10 border-t border-line py-12 last:border-b md:py-16 lg:grid-cols-12 lg:gap-14"
                >
                  {/* Image */}
                  <div
                    className={cn(
                      'group relative aspect-[4/3] overflow-hidden bg-surface-alt lg:col-span-6',
                      reversed && 'lg:order-2 lg:col-start-7'
                    )}
                  >
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="img-zoom object-cover opacity-80"
                    />
                    <div
                      className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"
                      aria-hidden="true"
                    />
                    <span className="display absolute bottom-4 right-5 text-[clamp(3rem,6vw,6rem)] leading-none text-outline-strong">
                      {service.number}
                    </span>
                    <span className="eyebrow absolute left-5 top-5 text-paper/70">
                      {service.category}
                    </span>
                  </div>

                  {/* Copy */}
                  <div
                    className={cn(
                      'flex flex-col justify-center lg:col-span-5',
                      reversed ? 'lg:order-1 lg:col-start-1' : 'lg:col-start-8'
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <span className="eyebrow text-coral">{service.number}</span>
                      <span className="h-px w-8 bg-line-strong" aria-hidden="true" />
                      <span className="eyebrow text-faint">
                        {service.category}
                      </span>
                    </div>

                    <h2 className="display mt-4 text-[clamp(2rem,3.8vw,3.6rem)]">
                      {service.title}
                    </h2>

                    <p className="mt-5 text-sm leading-relaxed text-muted md:text-base">
                      {service.shortDescription}
                    </p>

                    <ul className="mt-7 grid gap-x-6 gap-y-3 sm:grid-cols-2">
                      {service.capabilities.slice(0, 4).map((capability) => (
                        <li
                          key={capability}
                          className="flex items-start gap-2 text-xs leading-relaxed text-muted"
                        >
                          <Plus className="mt-0.5 h-3 w-3 shrink-0 text-coral" />
                          {capability}
                        </li>
                      ))}
                    </ul>

                    <div className="mt-7 flex flex-wrap gap-x-3 gap-y-2 border-t border-line pt-4">
                      {service.deliverables.map((deliverable) => (
                        <span
                          key={deliverable}
                          className="text-[9px] uppercase tracking-[0.14em] text-faint"
                        >
                          {deliverable}
                          <span className="ml-3 text-coral" aria-hidden="true">
                            /
                          </span>
                        </span>
                      ))}
                    </div>

                    <Link
                      href={`/services/${service.slug}`}
                      className="text-link mt-8 self-start text-paper"
                    >
                      Deep dive &amp; approach
                      <ArrowUpRight className="h-3.5 w-3.5 text-coral" />
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <CtaBand />
    </div>
  );
}
