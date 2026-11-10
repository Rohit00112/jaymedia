import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight, CheckCircle2 } from 'lucide-react';
import PageHero from '@/components/shared/PageHero';
import CtaBand from '@/components/shared/CtaBand';
import Reveal from '@/components/motion/Reveal';
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
        title={
          <>
            Ideas into{' '}
            <span className="serif italic text-accent">experiences.</span>
          </>
        }
        description="From full-scale concert stagecraft and televised pageantry to corporate brand launches and feature media production."
        meta={[
          { label: 'Core Divisions', value: '05 Capabilities' },
          { label: 'Studio Base', value: 'Biratnagar, Nepal' },
          { label: 'Since', value: '2013' },
          { label: 'Support', value: 'Turnkey Execution' },
        ]}
      />

      <section className="py-20 md:py-28">
        <div className="container-ed space-y-12">
          {SERVICES_DATA.map((service) => (
            <Reveal key={service.slug}>
              <article
                id={service.slug}
                className="overflow-hidden rounded-[12px] border border-line bg-white p-7 shadow-xs transition-all hover:border-forest sm:p-10 lg:p-12"
              >
                <div className="grid items-start gap-8 lg:grid-cols-12 lg:gap-12">
                  <div className="border-b border-line pb-8 lg:col-span-5 lg:border-b-0 lg:border-r lg:pb-0 lg:pr-10">
                    <div className="relative mb-6 aspect-[16/10] w-full overflow-hidden rounded-[8px] border border-line bg-sand">
                      <Image
                        src={service.image}
                        alt={service.title}
                        fill
                        sizes="(max-width: 1024px) 100vw, 35vw"
                        className="object-cover"
                      />
                      <span className="absolute bottom-3 left-3 rounded-full bg-forest px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-wider text-white">
                        {service.number} • {service.category}
                      </span>
                    </div>

                    <h2 className="display text-2xl font-bold text-ink sm:text-3xl">
                      {service.title}
                    </h2>
                    <p className="mt-3 text-sm leading-relaxed text-muted sm:text-base">
                      {service.shortDescription}
                    </p>

                    <Link
                      href={`/services/${service.slug}`}
                      className="btn btn-accent mt-6"
                    >
                      <span>Explore Scope &amp; Approach</span>
                      <ArrowUpRight className="h-4 w-4" />
                    </Link>
                  </div>

                  <div className="flex h-full flex-col justify-between lg:col-span-7">
                    <div>
                      <span className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-forest">
                        Core Technical Capabilities
                      </span>
                      <div className="mt-5 grid gap-3.5 sm:grid-cols-2">
                        {service.capabilities.map((cap) => (
                          <div key={cap} className="flex items-start gap-2.5">
                            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-forest" />
                            <span className="text-sm text-ink-soft">{cap}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="mt-8 rounded-[8px] border border-line bg-sand/60 p-5">
                      <span className="block font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-forest">
                        Standard Client Deliverables
                      </span>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {service.deliverables.map((deliv) => (
                          <span
                            key={deliv}
                            className="rounded-[4px] border border-line bg-white px-3 py-1 text-xs font-medium text-ink"
                          >
                            {deliv}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <CtaBand />
    </div>
  );
}
