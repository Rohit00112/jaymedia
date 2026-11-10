'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, Plus } from 'lucide-react';
import SectionHeading from '@/components/shared/SectionHeading';
import { SERVICES_DATA } from '@/config/services-data';
import { cn } from '@/lib/utils';

export default function ServicesSection() {
  const [active, setActive] = useState(0);
  const activeService = SERVICES_DATA[active];

  return (
    <section className="border-b border-line bg-paper py-20 md:py-28">
      <div className="container-ed">
        <SectionHeading
          eyebrow="04 / Capabilities"
          title={
            <>
              Everything the{' '}
              <span className="serif italic text-accent">moment</span> asks for.
            </>
          }
          description="Concept, stagecraft, broadcast, and guest experience — delivered end to end from our Biratnagar studio."
          link={{ href: '/services', label: 'All capabilities' }}
        />

        <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-7">
            {SERVICES_DATA.map((service, index) => {
              const isActive = active === index;

              return (
                <div
                  key={service.slug}
                  className="border-t border-line last:border-b"
                >
                  <button
                    type="button"
                    id={`service-trigger-${service.slug}`}
                    aria-expanded={isActive}
                    aria-controls={`service-panel-${service.slug}`}
                    onClick={() => setActive(index)}
                    className="group flex w-full items-start justify-between gap-5 py-5 text-left md:py-6"
                  >
                    <span
                      className={cn(
                        'mono mt-2 text-[9px] tracking-[0.16em] transition-colors duration-300',
                        isActive ? 'text-accent' : 'text-faint group-hover:text-accent'
                      )}
                    >
                      {service.number}
                    </span>

                    <span className="flex-1">
                      <span
                        className={cn(
                          'display block text-[clamp(1.5rem,2.9vw,2.5rem)] transition-colors duration-400',
                          isActive
                            ? 'text-ink'
                            : 'text-ink/60 group-hover:text-ink'
                        )}
                      >
                        {service.title}
                      </span>
                      <span className="eyebrow mt-2 block text-[9px] text-accent">
                        {service.category}
                      </span>
                    </span>

                    <Plus
                      className={cn(
                        'mt-2 h-5 w-5 shrink-0 transition-all duration-500',
                        isActive
                          ? 'rotate-45 text-accent'
                          : 'text-faint group-hover:text-ink'
                      )}
                    />
                  </button>

                  <div
                    id={`service-panel-${service.slug}`}
                    role="region"
                    aria-labelledby={`service-trigger-${service.slug}`}
                    aria-hidden={!isActive}
                    inert={!isActive}
                    className={cn(
                      'grid transition-[grid-template-rows] duration-600 ease-[cubic-bezier(0.16,1,0.3,1)]',
                      isActive ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                    )}
                  >
                    <div className="min-h-0 overflow-hidden">
                      <div className="pb-8 pl-0 md:pl-8">
                        <p className="max-w-lg text-sm leading-relaxed text-muted">
                          {service.shortDescription}
                        </p>

                        <ul className="mt-5 grid gap-x-6 gap-y-2 sm:grid-cols-2">
                          {service.capabilities.slice(0, 4).map((capability) => (
                            <li
                              key={capability}
                              className="flex items-start gap-2.5 text-xs leading-relaxed text-muted"
                            >
                              <span
                                className="mt-1.5 h-1 w-1 shrink-0 bg-accent"
                                aria-hidden="true"
                              />
                              {capability}
                            </li>
                          ))}
                        </ul>

                        <div className="mt-6 overflow-hidden rounded-[0.4rem] border border-line lg:hidden">
                          <div className="relative aspect-[16/9]">
                            <Image
                              src={service.image}
                              alt={service.title}
                              fill
                              sizes="100vw"
                              className="object-cover"
                            />
                          </div>
                        </div>

                        <Link
                          href={`/services/${service.slug}`}
                          className="text-link mt-7 text-ink"
                        >
                          Explore service
                          <ArrowUpRight className="h-3.5 w-3.5 text-accent" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}

            <p className="mt-8 max-w-lg text-xs leading-relaxed text-faint">
              Every capability is led by a dedicated producer and technical
              director, with one production standard across the board.
            </p>
          </div>

          <div className="hidden lg:col-span-5 lg:block">
            <div className="sticky top-28">
              <div className="relative aspect-[4/5] overflow-hidden rounded-[0.5rem] border border-line bg-sand">
                {SERVICES_DATA.map((service, index) => (
                  <Image
                    key={service.slug}
                    src={service.image}
                    alt={service.title}
                    fill
                    sizes="(max-width: 1024px) 0px, 38vw"
                    className={cn(
                      'object-cover transition-all duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)]',
                      index === active
                        ? 'scale-100 opacity-100'
                        : 'scale-105 opacity-0'
                    )}
                  />
                ))}

                <div
                  className="absolute inset-0 bg-gradient-to-t from-ink/75 via-transparent to-transparent"
                  aria-hidden="true"
                />

                <div className="absolute inset-x-0 top-0 flex items-center justify-between p-6">
                  <span className="eyebrow text-cream/80">
                    Selected capability
                  </span>
                  <span className="mono text-[10px] tracking-[0.16em] text-cream/70">
                    {String(active + 1).padStart(2, '0')} /{' '}
                    {String(SERVICES_DATA.length).padStart(2, '0')}
                  </span>
                </div>

                <div className="absolute inset-x-0 bottom-0 p-6">
                  <p className="display max-w-[16ch] text-[1.55rem] leading-tight text-cream">
                    {activeService.title}
                  </p>
                  <p className="mt-3 max-w-xs text-xs leading-relaxed text-cream/70">
                    {activeService.shortDescription}
                  </p>
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between gap-4 border-t border-line pt-4">
                <span className="eyebrow text-faint">
                  {activeService.category}
                </span>
                <Link
                  href={`/services/${activeService.slug}`}
                  className="link-sweep font-mono text-[10px] uppercase tracking-[0.16em] text-ink"
                >
                  View service
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
