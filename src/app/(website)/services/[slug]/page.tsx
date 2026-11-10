import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowUpRight, Plus } from 'lucide-react';
import PageHero from '@/components/shared/PageHero';
import SectionHeading from '@/components/shared/SectionHeading';
import CtaBand from '@/components/shared/CtaBand';
import Reveal from '@/components/motion/Reveal';
import { SERVICES_DATA } from '@/config/services-data';
import { generatePageMetadata } from '@/lib/seo';

interface Props {
  params: Promise<{ slug: string }>;
}

export const instant = false;

export async function generateStaticParams() {
  return SERVICES_DATA.map((service) => ({
    slug: service.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = SERVICES_DATA.find((s) => s.slug === slug);
  if (!service) return {};

  return generatePageMetadata({
    title: `${service.title} | Services | Jay Media Management`,
    description: service.shortDescription,
  });
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;
  const service = SERVICES_DATA.find((s) => s.slug === slug);

  if (!service) {
    notFound();
  }

  const currentIndex = SERVICES_DATA.findIndex((s) => s.slug === service.slug);
  const nextService = SERVICES_DATA[(currentIndex + 1) % SERVICES_DATA.length];

  return (
    <div className="min-h-screen bg-paper text-ink">
      <PageHero
        breadcrumb={{ label: 'All services', href: '/services' }}
        eyebrow={`${service.number} / ${service.category}`}
        title={service.title}
        description={service.shortDescription}
        image={service.image}
        imageAlt={service.title}
        meta={[
          { label: 'Discipline', value: service.category },
          { label: 'Studio', value: 'Biratnagar, Nepal' },
          { label: 'Engagement', value: 'Project or retained' },
          { label: 'Coverage', value: 'Koshi Province & beyond' },
        ]}
      />

      <section className="py-20 md:py-28">
        <div className="container-ed grid gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-7">
            <span className="eyebrow flex items-center gap-2.5 text-accent">
              <span className="h-px w-6 bg-accent" aria-hidden="true" />
              01 / Production scope
            </span>

            <Reveal>
              <h2 className="display mt-5 max-w-[14ch] text-balance text-[clamp(2.2rem,4.6vw,4.8rem)] text-ink">
                Crafted for{' '}
                <span className="serif italic text-accent">flawless</span>{' '}
                execution.
              </h2>
            </Reveal>

            <Reveal delay={90}>
              <p className="mt-8 max-w-2xl text-pretty text-sm leading-relaxed text-muted md:text-base">
                {service.description}
              </p>

              <div className="mt-9 flex flex-wrap items-center gap-4">
                <Link
                  href={`/contact?service=${service.slug}`}
                  className="btn btn-primary"
                >
                  Request this service
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </Link>
                <Link href="/services" className="btn btn-outline">
                  All capabilities
                </Link>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-4 lg:col-start-9">
            <Reveal delay={120}>
              <div className="border border-line bg-card p-6 md:p-7">
                <span className="eyebrow text-accent">Key capabilities</span>
                <ul className="mt-4">
                  {service.capabilities.map((capability, index) => (
                    <li
                      key={capability}
                      className="flex gap-4 border-b border-line py-3.5 last:border-b-0"
                    >
                      <span className="mono pt-0.5 text-[9px] tracking-[0.16em] text-faint">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <span className="text-sm leading-relaxed text-muted">
                        {capability}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="border-y border-line bg-paper-deep py-20 md:py-28">
        <div className="container-ed">
          <SectionHeading
            eyebrow="02 / Methodology"
            title={
              <>
                How we bring it{' '}
                <span className="serif italic text-accent">to life.</span>
              </>
            }
            description="A phased production process that keeps creative ambition and operational risk in balance."
          />

          <div className="grid gap-8 md:grid-cols-3 md:gap-10">
            {service.approach.map((step, index) => (
              <Reveal key={step.title} delay={index * 70}>
                <div className="border-t border-line-strong pt-6">
                  <span className="display block text-6xl leading-none text-outline md:text-7xl">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span className="eyebrow mt-6 block text-[8px] text-accent">
                    {step.phase}
                  </span>
                  <h3 className="display mt-3 text-2xl text-ink md:text-3xl">
                    {step.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted">
                    {step.detail}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28">
        <div className="container-ed">
          <SectionHeading
            eyebrow="03 / Deliverables"
            title={
              <>
                What you{' '}
                <span className="serif italic text-accent">receive.</span>
              </>
            }
            description="Every engagement closes with documentation your team can use long after the lights go down."
          />

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {service.deliverables.map((deliverable, index) => (
              <Reveal key={deliverable} delay={index * 60}>
                <div className="flex h-full flex-col border-t-2 border-accent bg-card px-5 pb-6 pt-5">
                  <span className="mono text-[9px] tracking-[0.16em] text-accent">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <p className="mt-6 text-base leading-snug text-ink">
                    {deliverable}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

          <div className="mt-14 flex flex-col justify-between gap-6 border-t border-line pt-8 sm:flex-row sm:items-center">
            <p className="max-w-xl text-sm leading-relaxed text-muted">
              Ready to scope this for your venue, date, and budget? Our
              Biratnagar production desk responds within one business day.
            </p>
            <Link
              href={`/contact?service=${service.slug}`}
              className="btn btn-primary shrink-0"
            >
              Start the brief
              <Plus className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </section>

      <section className="border-t border-line py-12 md:py-16">
        <div className="container-ed flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <span className="eyebrow text-faint">Next capability</span>
            <Link
              href={`/services/${nextService.slug}`}
              className="group mt-4 flex items-center gap-4"
            >
              <span className="display text-[clamp(1.8rem,4vw,3.8rem)] text-ink transition-colors duration-300 group-hover:text-accent">
                {nextService.title}
              </span>
              <ArrowUpRight className="h-6 w-6 shrink-0 text-accent transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1 md:h-8 md:w-8" />
            </Link>
          </div>
          <span className="eyebrow text-faint">
            {nextService.number} / {nextService.category}
          </span>
        </div>
      </section>

      <CtaBand />
    </div>
  );
}
