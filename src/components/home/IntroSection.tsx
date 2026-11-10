import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import SectionHeading from '@/components/shared/SectionHeading';
import Reveal from '@/components/motion/Reveal';

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
    <section className="border-b border-line bg-white py-16 md:py-20">
      <div className="container-ed">
        <SectionHeading
          eyebrow="About Jay Media"
          title="Over a decade of live events, film, and television in Nepal."
          description="Established in 2013 in Central Mall, Biratnagar — producing concerts, national reality shows, feature films, and corporate events."
          link={{ href: '/about', label: 'More about us' }}
        />

        <div className="grid items-start gap-8 lg:grid-cols-12 lg:gap-12">
          <Reveal className="lg:col-span-6">
            <div className="group relative aspect-[16/10] w-full overflow-hidden rounded-xl border border-line bg-paper-deep">
              <Image
                src="https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?auto=format&fit=crop&w=1800&q=85"
                alt="Concert stage lighting and production engineered by Jay Media Management"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="img-zoom object-cover"
              />
            </div>
          </Reveal>

          <Reveal delay={0.08} className="lg:col-span-6">
            <div className="divide-y divide-line border-y border-line">
              {CAPABILITIES.map((cap) => (
                <Link
                  key={cap.slug}
                  href={`/services/${cap.slug}`}
                  className="group flex items-start justify-between gap-4 py-4 transition-all duration-200 hover:pl-2"
                >
                  <div>
                    <h3 className="text-base font-semibold text-ink transition-colors group-hover:text-forest">
                      {cap.title}
                    </h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted">
                      {cap.note}
                    </p>
                  </div>
                  <ArrowUpRight className="mt-1 h-4 w-4 shrink-0 text-muted transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-forest" />
                </Link>
              ))}
            </div>

            <div className="mt-5">
              <Link href="/services" className="text-link">
                <span>Explore all services</span>
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
