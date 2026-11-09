import { Metadata } from 'next';
import Link from 'next/link';
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
    <div className="bg-black text-white min-h-screen font-rubik">
      {/* ─── Hero ─────────────────────────────────────────────── */}
      <section className="relative bg-black text-white pt-40 pb-24 sm:pt-48 sm:pb-32 px-6 sm:px-10 lg:px-16 overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-[#0c0c11] to-black opacity-90" />
        <div className="absolute top-1/2 -left-20 w-80 h-80 bg-coral/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <span className="px-3.5 py-1 bg-[#01402b]/80 border border-[#01402b] text-[#eef9ff] text-xs font-rubik font-medium tracking-widest uppercase rounded-[50px]">
              Koshi Province • Biratnagar
            </span>
            <span className="section-label text-coral font-medium tracking-[0.2em]">
              WHAT WE DO
            </span>
          </div>
          <h1 className="editorial-headline text-white text-5xl sm:text-6xl lg:text-8xl max-w-5xl leading-[0.95] mb-8 font-rubik">
            IDEAS INTO EXTRAORDINARY EXPERIENCES.
          </h1>
          <p className="text-[#eef9ff]/80 text-lg sm:text-xl max-w-2xl font-rubik leading-relaxed">
            From technical stagecraft and pageant choreography to commercial brand activations, explore our complete
            suite of production capabilities.
          </p>
        </div>
      </section>

      {/* ─── Services Catalogue ──────────────────────────────── */}
      <section className="py-24 lg:py-36 px-6 sm:px-10 lg:px-16 bg-black">
        <div className="max-w-7xl mx-auto space-y-16">
          {SERVICES_DATA.map((service) => (
            <div
              key={service.slug}
              id={service.slug}
              className="bg-[#0c0c11] border border-white/10 p-8 sm:p-12 lg:p-16 rounded-[10px] shadow-xl hover:border-coral/40 transition-all"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
                {/* Left metadata */}
                <div className="lg:col-span-4 border-b lg:border-b-0 lg:border-r border-white/10 pb-8 lg:pb-0 lg:pr-8">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-coral font-rubik font-bold text-2xl">
                      {service.number}
                    </span>
                    <span className="text-xs uppercase font-rubik px-3 py-1 bg-[#01402b]/80 border border-[#01402b] text-[#eef9ff] font-medium rounded-[50px]">
                      {service.category}
                    </span>
                  </div>
                  <h2 className="editorial-headline text-white text-3xl sm:text-4xl mb-4 leading-tight font-rubik">
                    {service.title}
                  </h2>
                  <p className="text-[#eef9ff]/75 font-rubik text-base leading-relaxed mb-8">
                    {service.shortDescription}
                  </p>

                  <Link
                    href={`/services/${service.slug}`}
                    className="inline-flex items-center gap-2 px-6 py-3.5 bg-coral text-white font-rubik text-xs uppercase tracking-widest font-semibold rounded-[50px] hover:bg-coral-hover hover:scale-105 transition-all shadow-md"
                  >
                    <span>Deep Dive & Approach</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </Link>
                </div>

                {/* Right capabilities */}
                <div className="lg:col-span-8 flex flex-col justify-between h-full">
                  <div>
                    <h3 className="font-rubik text-xs uppercase tracking-widest text-coral font-semibold mb-6 block">
                      Core Technical Capabilities
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                      {service.capabilities.map((cap, capIdx) => (
                        <div key={capIdx} className="flex items-start gap-3">
                          <CheckCircle2 className="w-4 h-4 text-coral shrink-0 mt-1" />
                          <span className="text-sm font-rubik text-[#eef9ff]/80">{cap}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Deliverables snippet */}
                  <div className="p-4 bg-black/60 border border-white/10 rounded-[10px]">
                    <span className="text-xs uppercase font-rubik tracking-widest text-[#eef9ff]/60 block mb-2 font-semibold">
                      Standard Client Deliverables:
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {service.deliverables.map((deliv, dIdx) => (
                        <span
                          key={dIdx}
                          className="text-xs font-rubik bg-white/5 px-2.5 py-1 border border-white/10 text-[#eef9ff] rounded-[2px]"
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
      <section className="py-20 px-6 sm:px-10 lg:px-16 bg-[#0c0c11] text-white border-t border-white/10">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-8">
          <div>
            <h3 className="font-rubik text-3xl sm:text-4xl font-bold text-white mb-2">
              Need a Custom Production Package?
            </h3>
            <p className="text-[#eef9ff]/75 text-base font-rubik">
              We engineer bespoke technical and logistical scopes to meet your budget and timeline.
            </p>
          </div>
          <Link
            href="/contact"
            className="inline-flex items-center gap-3 px-8 py-4 bg-coral text-white font-rubik text-xs uppercase tracking-widest font-semibold hover:bg-coral-hover hover:scale-105 transition-all rounded-[50px] shadow-lg"
          >
            <span>Discuss Requirements</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}

