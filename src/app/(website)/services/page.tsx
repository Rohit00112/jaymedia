import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight, CheckCircle2 } from 'lucide-react';
import PageHero from '@/components/shared/PageHero';
import CtaBand from '@/components/shared/CtaBand';
import { generatePageMetadata } from '@/lib/seo';
import { SERVICES_DATA } from '@/config/services-data';

export const metadata: Metadata = generatePageMetadata({
  title: 'Our Services & Capabilities | Jay Media Management',
  description:
    'Turnkey Event Management, Brand Experiences, Store and Product Launches, Media Production, and Press Events in Biratnagar, Nepal.',
});

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-paper text-ink">
      <PageHero
        eyebrow="Production Capabilities"
        title="Full-service event management & media production."
        description="From full-scale concert stagecraft and televised pageantry to corporate brand launches and feature media production."
        meta={[
          { label: 'Core Divisions', value: '5 Capabilities' },
          { label: 'Studio Base', value: 'Biratnagar, Nepal' },
          { label: 'Since', value: '2013' },
          { label: 'Support', value: 'Turnkey Execution' },
        ]}
      />

      <section className="py-16 md:py-20">
        <div className="container-ed space-y-8">
          {SERVICES_DATA.map((service) => (
            <article
              key={service.slug}
              id={service.slug}
              className="rounded-xl border border-line bg-white p-6 sm:p-8"
            >
              <div className="grid items-start gap-8 lg:grid-cols-12">
                <div className="lg:col-span-5">
                  <div className="relative mb-5 aspect-[16/10] w-full overflow-hidden rounded-lg border border-line bg-sand">
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      sizes="(max-width: 1024px) 100vw, 35vw"
                      className="object-cover"
                    />
                  </div>

                  <span className="text-xs font-medium text-forest">
                    {service.category}
                  </span>
                  <h2 className="mt-1 text-xl font-semibold text-ink sm:text-2xl">
                    {service.title}
                  </h2>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    {service.shortDescription}
                  </p>

                  <Link
                    href={`/services/${service.slug}`}
                    className="btn btn-primary mt-5"
                  >
                    <span>Explore Scope &amp; Approach</span>
                    <ArrowUpRight className="h-4 w-4" />
                  </Link>
                </div>

                <div className="flex h-full flex-col justify-between lg:col-span-7 lg:border-l lg:border-line lg:pl-8">
                  <div>
                    <h3 className="text-xs font-semibold uppercase tracking-wider text-ink">
                      Core Capabilities
                    </h3>
                    <div className="mt-4 grid gap-3 sm:grid-cols-2">
                      {service.capabilities.map((cap) => (
                        <div key={cap} className="flex items-start gap-2.5">
                          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-forest" />
                          <span className="text-sm text-ink-soft">{cap}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-6 rounded-lg border border-line bg-paper-deep/60 p-4">
                    <span className="block text-xs font-semibold text-ink">
                      Deliverables
                    </span>
                    <div className="mt-2.5 flex flex-wrap gap-2">
                      {service.deliverables.map((deliv) => (
                        <span
                          key={deliv}
                          className="rounded-md border border-line bg-white px-2.5 py-1 text-xs text-ink-soft"
                        >
                          {deliv}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <CtaBand />
    </div>
  );
}
