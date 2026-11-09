'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import SectionHeading from '@/components/shared/SectionHeading';
import { SERVICES_DATA } from '@/config/services-data';
import { cn } from '@/lib/utils';

export default function ServicesSection() {
  const [active, setActive] = useState(0);
  const activeService = SERVICES_DATA[active];

  return (
    <section className="border-b border-line bg-surface-alt py-20 md:py-28 lg:py-32">
      <div className="container-ed">
        <SectionHeading
          eyebrow="02 / What we do"
          title={
            <>
              Full-spectrum{' '}
              <span className="serif text-coral">production.</span>
            </>
          }
          description="Concept, stagecraft, broadcast, and guest experience — delivered end to end from our Biratnagar studio."
          link={{ href: '/services', label: 'All capabilities' }}
        />

        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Index */}
          <div className="lg:col-span-7">
            {SERVICES_DATA.map((service, index) => (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                onMouseEnter={() => setActive(index)}
                onFocus={() => setActive(index)}
                className="group block border-t border-line py-5 last:border-b md:py-7"
              >
                <div className="grid grid-cols-[2.25rem_1fr_auto] items-baseline gap-4 md:grid-cols-[3.5rem_1fr_auto] md:gap-6">
                  <span
                    className={cn(
                      'eyebrow tabular-nums transition-colors',
                      active === index ? 'text-coral' : 'text-faint'
                    )}
                  >
                    {service.number}
                  </span>

                  <div>
                    <h3 className="display text-[clamp(1.55rem,2.9vw,2.9rem)] text-paper transition-colors duration-300 group-hover:text-coral">
                      {service.title}
                    </h3>
                    <p className="eyebrow mt-2 text-[9px] text-faint">
                      {service.category}
                    </p>
                    <p className="mt-3 max-w-md text-sm leading-relaxed text-muted lg:hidden">
                      {service.shortDescription}
                    </p>
                  </div>

                  <ArrowUpRight className="h-5 w-5 shrink-0 text-faint transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-coral" />
                </div>
              </Link>
            ))}
          </div>

          {/* Preview */}
          <div className="hidden lg:col-span-5 lg:block">
            <div className="sticky top-28">
              <div className="relative aspect-[4/5] overflow-hidden bg-surface">
                {SERVICES_DATA.map((service, index) => (
                  <Image
                    key={service.slug}
                    src={service.image}
                    alt={service.title}
                    fill
                    sizes="(max-width: 1024px) 0px, 38vw"
                    className={cn(
                      'object-cover transition-all duration-700',
                      index === active
                        ? 'scale-100 opacity-85'
                        : 'scale-105 opacity-0'
                    )}
                  />
                ))}

                <div
                  className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent"
                  aria-hidden="true"
                />

                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-6 p-7">
                  <div>
                    <span className="eyebrow text-paper/60">
                      Selected capability
                    </span>
                    <p className="display mt-2 max-w-[12ch] text-2xl text-paper">
                      {activeService.category}
                    </p>
                  </div>
                  <span className="display text-5xl leading-none text-coral">
                    {activeService.number}
                  </span>
                </div>
              </div>

              <p className="mt-4 text-xs leading-relaxed text-faint">
                {activeService.shortDescription}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
