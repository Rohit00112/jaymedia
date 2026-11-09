import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { generatePageMetadata } from '@/lib/seo';
import { SERVICES_DATA } from '@/config/services-data';

export const metadata: Metadata = generatePageMetadata({
  title: 'Our Services & Capabilities | Jay Media Management',
  description:
    'Comprehensive event production and media services by Jay Media Management in Biratnagar, Nepal: Event Management, Brand Experiences, Media Production, Product Launches, and Press Conferences.',
});

export default function ServicesPage() {
  return (
    <div className="bg-[#FAFAF8] text-[#101014] min-h-screen font-rubik">
      {/* ─── Hero ─────────────────────────────────────────────── */}
      <section className="relative bg-[#FBF9F5] text-[#101014] pt-40 pb-24 sm:pt-48 sm:pb-32 px-6 sm:px-10 lg:px-16 overflow-hidden border-b border-black/10">
        <div className="absolute inset-0 bg-gradient-to-b from-[#FBF9F5]/80 via-[#FBF9F5]/95 to-[#FAFAF8]" />
        <div className="absolute top-1/2 -left-20 w-80 h-80 bg-coral/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="badge-prestige">
              Koshi Province • Biratnagar
            </span>
            <span className="section-label">
              WHAT WE DO
            </span>
          </div>
          <h1 className="editorial-headline text-[#101014] text-5xl sm:text-6xl lg:text-8xl max-w-5xl leading-[0.95] mb-8 font-rubik">
            IDEAS INTO EXTRAORDINARY EXPERIENCES.
          </h1>
          <p className="text-[#4A4A52] text-lg sm:text-xl max-w-2xl font-rubik leading-relaxed">
            From technical stagecraft and pageant choreography to commercial brand activations, explore our complete
            suite of production capabilities.
          </p>
        </div>
      </section>

      {/* ─── Services Catalogue ──────────────────────────────── */}
      <section className="py-24 lg:py-36 px-6 sm:px-10 lg:px-16 bg-[#FAFAF8]">
        <div className="max-w-7xl mx-auto space-y-16">
          {SERVICES_DATA.map((service) => (
            <div
              key={service.slug}
              id={service.slug}
              className="bg-white border border-black/10 p-8 sm:p-12 lg:p-16 rounded-[10px] shadow-sm hover:border-coral transition-all"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
                {/* Left metadata */}
                <div className="lg:col-span-5 border-b lg:border-b-0 lg:border-r border-black/10 pb-8 lg:pb-0 lg:pr-8">
                  {/* Photo Preview */}
                  <div className="relative aspect-[16/10] w-full rounded-[10px] overflow-hidden mb-6 border border-black/10 group shadow-sm">
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 1024px) 100vw, 35vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-[1]" />
                    <div className="absolute bottom-3 left-3 z-10">
                      <span className="text-xs uppercase font-rubik tracking-wider font-semibold text-white bg-black/70 px-3 py-1 rounded-[50px] border border-white/20">
                        {service.number} • {service.category}
                      </span>
                    </div>
                  </div>

                  <h2 className="editorial-headline text-[#101014] text-3xl sm:text-4xl mb-4 leading-tight font-rubik">
                    {service.title}
                  </h2>
                  <p className="text-[#4A4A52] font-rubik text-base leading-relaxed mb-8">
                    {service.shortDescription}
                  </p>

                  <Link
                    href={`/services/${service.slug}`}
                    className="inline-flex items-center gap-2 px-6 py-3.5 bg-coral text-white font-rubik text-xs uppercase tracking-widest font-semibold rounded-[50px] hover:bg-coral-hover hover:scale-105 transition-all shadow-sm"
                  >
                    <span>Deep Dive & Approach</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </Link>
                </div>

                {/* Right capabilities */}
                <div className="lg:col-span-7 flex flex-col justify-between h-full">
                  <div>
                    <h3 className="font-rubik text-xs uppercase tracking-widest text-coral font-semibold mb-6 block">
                      Core Technical Capabilities
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                      {service.capabilities.map((cap, capIdx) => (
                        <div key={capIdx} className="flex items-start gap-3">
                          <CheckCircle2 className="w-4 h-4 text-coral shrink-0 mt-1" />
                          <span className="text-sm font-rubik text-[#4A4A52]">{cap}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Deliverables snippet */}
                  <div className="p-5 bg-[#F5F2EC] border border-black/10 rounded-[10px]">
                    <span className="text-xs uppercase font-rubik tracking-widest text-[#101014] block mb-3 font-semibold">
                      Standard Client Deliverables:
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {service.deliverables.map((deliv, dIdx) => (
                        <span
                          key={dIdx}
                          className="text-xs font-rubik bg-white px-3 py-1 border border-black/10 text-[#101014] rounded-[2px] shadow-2xs"
                        >
                          {deliv}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── Bottom CTA ──────────────────────────────────────── */}
      <section className="py-20 px-6 sm:px-10 lg:px-16 bg-[#ECE9E2] text-[#101014] border-t border-black/10">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-8">
          <div>
            <h3 className="font-rubik text-3xl sm:text-4xl font-bold text-[#101014] mb-2">
              Need a Custom Production Package?
            </h3>
            <p className="text-[#4A4A52] text-base font-rubik">
              We engineer bespoke technical and logistical scopes to meet your budget and timeline.
            </p>
          </div>
          <Link
            href="/contact"
            className="inline-flex items-center gap-3 px-8 py-4 bg-coral text-white font-rubik text-xs uppercase tracking-widest font-semibold hover:bg-coral-hover hover:scale-105 transition-all rounded-[50px] shadow-md"
          >
            <span>Discuss Requirements</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
