import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowUpRight, CheckCircle2 } from 'lucide-react';
import PageHero from '@/components/shared/PageHero';
import SectionHeading from '@/components/shared/SectionHeading';
import CtaBand from '@/components/shared/CtaBand';
import Reveal from '@/components/motion/Reveal';
import AnimeStaggerContainer from '@/components/motion/AnimeStaggerContainer';
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
        eyebrow={service.category}
        title={service.title}
        description={service.shortDescription}
        image={service.image}
        imageAlt={service.title}
        meta={[
          { label: 'Discipline', value: service.category },
          { label: 'Studio', value: 'Biratnagar, Nepal' },
          { label: 'Engagement', value: 'Project or Retained' },
          { label: 'Coverage', value: 'Koshi Province & Nationwide' },
        ]}
      />

      {/* Overview & Capabilities */}
      <section className="border-b border-line py-16 md:py-20">
        <div className="container-ed grid gap-10 lg:grid-cols-12">
          <Reveal className="lg:col-span-7">
            <p className="text-xs font-semibold uppercase tracking-wider text-forest">
              Production Scope
            </p>
            <h2 className="mt-2 text-2xl font-semibold text-ink sm:text-3xl">
              Reliable execution from concept to wrap.
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-muted sm:text-base">
              {service.description}
            </p>

            <div className="mt-7 flex flex-wrap items-center gap-3">
              <Link
                href={`/contact?service=${service.slug}`}
                className="btn btn-primary"
              >
                <span>Request This Service</span>
                <ArrowUpRight className="h-4 w-4" />
              </Link>
              <Link href="/services" className="btn btn-outline">
                All Capabilities
              </Link>
            </div>
          </Reveal>

          <Reveal delay={0.08} className="lg:col-span-5">
            <div className="rounded-xl border border-line bg-paper-deep/50 p-6">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-ink">
                Key Capabilities
              </h3>
              <ul className="mt-4 divide-y divide-line">
                {service.capabilities.map((capability) => (
                  <li
                    key={capability}
                    className="flex items-start gap-2.5 py-3 first:pt-0 last:pb-0 text-sm text-ink-soft"
                  >
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-forest" />
                    <span>{capability}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Methodology */}
      <section className="border-b border-line bg-paper-deep/50 py-16 md:py-20">
        <div className="container-ed">
          <SectionHeading
            eyebrow="Methodology"
            title="How we bring it to life."
            description="A structured production workflow that keeps creative goals and event logistics aligned."
          />

          <AnimeStaggerContainer className="grid gap-6 md:grid-cols-3">
            {service.approach.map((step, index) => (
              <div
                key={step.title}
                className="card-hover rounded-xl border border-line bg-white p-6"
              >
                <span className="inline-flex rounded-md bg-forest-soft px-2.5 py-1 text-xs font-semibold text-forest">
                  0{index + 1} &bull; {step.phase}
                </span>
                <h3 className="mt-3 text-lg font-semibold text-ink">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {step.detail}
                </p>
              </div>
            ))}
          </AnimeStaggerContainer>
        </div>
      </section>

      {/* Deliverables */}
      <section className="border-b border-line py-16 md:py-20">
        <div className="container-ed">
          <SectionHeading
            eyebrow="Deliverables"
            title="What you receive."
            description="Clear production assets and post-event documentation."
          />

          <AnimeStaggerContainer className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {service.deliverables.map((deliverable, index) => (
              <div
                key={deliverable}
                className="card-hover rounded-xl border border-line bg-white p-5"
              >
                <span className="text-xs font-semibold text-forest">
                  0{index + 1}
                </span>
                <p className="mt-2 text-sm font-medium text-ink">
                  {deliverable}
                </p>
              </div>
            ))}
          </AnimeStaggerContainer>
        </div>
      </section>

      {/* Next Service */}
      <section className="py-10">
        <div className="container-ed flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <span className="text-xs text-muted">Next capability</span>
            <Link
              href={`/services/${nextService.slug}`}
              className="group mt-1 flex items-center gap-2 text-lg font-semibold text-ink transition-colors hover:text-forest"
            >
              <span>{nextService.title}</span>
              <ArrowUpRight className="h-4 w-4 text-forest transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>
          <span className="text-xs text-muted">{nextService.category}</span>
        </div>
      </section>

      <CtaBand />
    </div>
  );
}
