import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { AnimeStaggerContainer } from '@/components/motion';
import Reveal from '@/components/motion/Reveal';
import RevealImage from '@/components/motion/RevealImage';
import SectionHeading from '@/components/shared/SectionHeading';

const CAPABILITIES = [
  {
    slug: 'event-management',
    title: 'Event Management & Stagecraft',
    note: 'Turnkey stage design, sound & lighting engineering, and live concert production.',
  },
  {
    slug: 'product-launches',
    title: 'Store & Product Launches',
    note: 'Commercial reveals, corporate galas, and inaugural ceremonies.',
  },
  {
    slug: 'brand-experiences',
    title: 'Brand Experiences & Activations',
    note: 'Regional campaigns and audience engagement across Koshi Province.',
  },
  {
    slug: 'press-events',
    title: 'Film & Broadcast Production',
    note: 'Feature films, television reality formats, and multi-camera live streaming.',
  },
] as const;

export default function IntroSection() {
  return (
    <section className="border-b border-line bg-white py-20 md:py-24">
      <div className="container-ed">
        <SectionHeading
          eyebrow="About Jay Media"
          title="Over a decade of live events, film, and television in Nepal."
          description="Established in 2013 in Central Mall, Biratnagar — producing concerts, national reality shows, feature films, and corporate events."
          link={{ href: '/about', label: 'More about us' }}
        />

        <div className="grid items-stretch gap-8 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-7">
            <RevealImage
              src="https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?auto=format&fit=crop&w=1800&q=85"
              alt="Concert stage lighting and production engineered by Jay Media Management"
              aspect="aspect-[16/10]"
              sizes="(max-width: 1024px) 100vw, 58vw"
              className="rounded-lg border border-line"
              parallax={false}
            />
          </div>

          <div className="flex flex-col justify-between rounded-lg border border-line bg-paper-deep/50 p-6 sm:p-8 lg:col-span-5">
            <div>
              <h3 className="display text-xl font-bold text-ink">
                What We Do
              </h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted">
                Full-service event production and media management from our
                headquarters in Biratnagar.
              </p>
            </div>

            <AnimeStaggerContainer
              stagger={70}
              distance={14}
              className="mt-6 flex-1 divide-y divide-line border-t border-line"
            >
              {CAPABILITIES.map((cap) => (
                <Link
                  key={cap.slug}
                  href={`/services/${cap.slug}`}
                  className="group flex items-start justify-between gap-4 py-4 transition-colors"
                >
                  <div>
                    <h4 className="display text-base font-bold text-ink transition-colors group-hover:text-forest sm:text-lg">
                      {cap.title}
                    </h4>
                    <p className="mt-1 text-sm leading-relaxed text-muted">
                      {cap.note}
                    </p>
                  </div>
                  <ArrowUpRight className="mt-1 h-4 w-4 shrink-0 text-muted transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-forest" />
                </Link>
              ))}
            </AnimeStaggerContainer>

            <Reveal delay={100} className="mt-4 border-t border-line pt-4">
              <Link
                href="/services"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-forest hover:text-ink"
              >
                <span>Explore all services</span>
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
