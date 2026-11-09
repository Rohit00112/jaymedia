import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowUpRight, Plus } from 'lucide-react';
import PageHero from '@/components/shared/PageHero';
import SectionHeading from '@/components/shared/SectionHeading';
import { SERVICES_DATA } from '@/config/services-data';
import { generatePageMetadata } from '@/lib/seo';

interface Props {
  params: Promise<{ slug: string }>;
}

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

  return (
    <div className="min-h-screen bg-surface text-paper">
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

      {/* Overview */}
      <section className="border-b border-line bg-surface py-20 md:py-28 lg:py-32">
        <div className="container-ed grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <div className="flex items-center gap-4">
              <span className="h-px w-10 bg-coral" aria-hidden="true" />
              <span className="eyebrow text-coral">Production scope</span>
            </div>

            <h2 className="display mt-5 text-[clamp(2.4rem,5.2vw,5.2rem)]">
              Crafted for{' '}
              <span className="serif text-coral">flawless</span> execution.
            </h2>

            <p className="mt-8 text-base leading-relaxed text-muted md:text-lg">
              {service.description}
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-4">
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
          </div>

          <div className="lg:col-span-4 lg:col-start-9">
            <div className="border-t border-coral pt-5">
              <span className="eyebrow text-paper">Key capabilities</span>
              <ul className="mt-4">
                {service.capabilities.map((capability, index) => (
                  <li
                    key={capability}
                    className="flex gap-4 border-b border-line py-3.5"
                  >
                    <span className="eyebrow pt-1 text-[8px] text-coral">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span className="text-sm leading-relaxed text-muted">
                      {capability}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Approach */}
      <section className="border-b border-line bg-surface-alt py-20 md:py-28 lg:py-32">
        <div className="container-ed">
          <SectionHeading
            eyebrow="Methodology"
            title={
              <>
                How we bring it{' '}
                <span className="serif text-coral">to life.</span>
              </>
            }
            description="A phased production process that keeps creative ambition and operational risk in balance."
          />

          <div className="grid gap-10 md:grid-cols-3 md:gap-8">
            {service.approach.map((step, index) => (
              <div key={step.title} className="border-t border-line pt-6">
                <span className="display block text-6xl leading-none text-outline md:text-7xl">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span className="eyebrow mt-6 block text-[8px] text-coral">
                  {step.phase}
                </span>
                <h3 className="display mt-3 text-2xl text-paper md:text-3xl">
                  {step.title}
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-muted">
                  {step.detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Deliverables */}
      <section className="bg-surface py-20 md:py-28">
        <div className="container-ed">
          <SectionHeading
            eyebrow="Deliverables"
            title={
              <>
                What you{' '}
                <span className="serif text-coral">receive.</span>
              </>
            }
            description="Every engagement closes with documentation your team can use long after the lights go down."
          />

          <div className="grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
            {service.deliverables.map((deliverable, index) => (
              <div key={deliverable} className="border-t border-line pt-5">
                <span className="eyebrow text-coral">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <p className="mt-5 text-base leading-snug text-paper">
                  {deliverable}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-16 flex flex-col justify-between gap-6 border-t border-line pt-8 sm:flex-row sm:items-center">
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
    </div>
  );
}
