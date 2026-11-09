import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, ArrowUpRight, CheckCircle2, Sparkles } from 'lucide-react';
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
    <div className="bg-black text-white min-h-screen font-rubik">
      {/* ─── Hero ─────────────────────────────────────────────── */}
      <section className="relative bg-black text-white pt-40 pb-20 sm:pt-48 sm:pb-28 px-6 sm:px-10 lg:px-16 overflow-hidden border-b border-white/10">
        <Image
          src={service.image}
          alt={service.title}
          fill
          priority
          className="object-cover opacity-20"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/85 to-black z-[1]" />
        <div className="absolute top-1/2 -right-20 w-80 h-80 bg-coral/10 rounded-full blur-[120px] pointer-events-none z-[1]" />

        <div className="relative z-10 max-w-7xl mx-auto">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-xs uppercase font-rubik tracking-wider text-[#eef9ff]/70 hover:text-white transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Services
          </Link>

          <div className="flex items-center gap-3 mb-4">
            <span className="text-coral font-rubik font-bold text-lg">
              {service.number}
            </span>
            <span className="text-xs uppercase font-rubik px-3 py-1 bg-[#01402b]/80 border border-[#01402b] text-[#eef9ff] font-medium rounded-[50px]">
              {service.category}
            </span>
          </div>

          <h1 className="editorial-headline text-white text-4xl sm:text-6xl lg:text-7xl max-w-5xl leading-[0.95] mb-6 font-rubik">
            {service.title}
          </h1>

          <p className="text-[#eef9ff]/80 text-lg sm:text-xl max-w-3xl font-rubik leading-relaxed">
            {service.shortDescription}
          </p>
        </div>
      </section>

      {/* ─── Narrative Overview ──────────────────────────────── */}
      <section className="py-20 lg:py-28 px-6 sm:px-10 lg:px-16 border-b border-white/10 bg-[#0c0c11]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-7 space-y-6 text-base sm:text-lg font-rubik text-[#eef9ff]/80 leading-relaxed">
              <span className="section-label text-coral font-medium tracking-[0.2em] mb-2 block">
                PRODUCTION SCOPE
              </span>
              <h2 className="editorial-headline text-white text-3xl sm:text-4xl leading-tight font-rubik">
                Crafted for Flawless Execution.
              </h2>
              <p>{service.description}</p>
            </div>

            <div className="lg:col-span-5 bg-black border border-white/10 p-8 rounded-[10px] shadow-xl">
              <h3 className="font-rubik text-sm uppercase tracking-wider text-white font-semibold mb-6 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-coral" /> Key Capabilities
              </h3>
              <ul className="space-y-4">
                {service.capabilities.map((cap, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-coral shrink-0 mt-0.5" />
                    <span className="text-sm font-rubik text-[#eef9ff]/80">{cap}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Phased Approach ─────────────────────────────────── */}
      <section className="bg-black text-white py-24 lg:py-36 px-6 sm:px-10 lg:px-16 border-b border-white/10">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <span className="section-label text-coral font-medium tracking-[0.2em] mb-3 block">
              OUR METHODOLOGY
            </span>
            <h2 className="editorial-headline text-white text-3xl sm:text-5xl font-rubik">
              HOW WE BRING IT TO LIFE.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {service.approach.map((step, idx) => (
              <div
                key={idx}
                className="bg-[#0c0c11] p-8 border border-white/10 rounded-[10px] shadow-xl relative flex flex-col justify-between"
              >
                <div>
                  <span className="text-coral font-rubik text-xs uppercase tracking-wider block mb-4 font-semibold">
                    {step.phase}
                  </span>
                  <h3 className="font-rubik text-2xl font-bold mb-3 text-white">{step.title}</h3>
                  <p className="text-[#eef9ff]/75 text-sm font-rubik leading-relaxed">
                    {step.detail}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Deliverables & Inquiry CTA ──────────────────────── */}
      <section className="py-24 lg:py-36 px-6 sm:px-10 lg:px-16 bg-[#0c0c11]">
        <div className="max-w-7xl mx-auto">
          <div className="bg-black border border-white/10 p-8 sm:p-14 lg:p-20 rounded-[10px] shadow-2xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-8">
                <span className="text-xs uppercase font-rubik tracking-wider text-coral font-semibold mb-2 block">
                  READY TO ENGAGE
                </span>
                <h3 className="editorial-headline text-white text-3xl sm:text-5xl mb-4 font-rubik">
                  Request a Dedicated {service.title} Proposal.
                </h3>
                <p className="text-[#eef9ff]/75 font-rubik text-base max-w-2xl leading-relaxed mb-6">
                  Contact our Biratnagar production office to discuss dates, venue logistics, and budget parameters.
                </p>

                <div className="space-y-2">
                  <span className="text-xs uppercase font-rubik tracking-wider text-[#eef9ff]/50 block">
                    What You Receive:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {service.deliverables.map((deliv, idx) => (
                      <span
                        key={idx}
                        className="text-xs font-rubik px-3 py-1 bg-white/5 border border-white/10 text-[#eef9ff] rounded-[2px]"
                      >
                        ✓ {deliv}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="lg:col-span-4 flex justify-start lg:justify-end">
                <Link
                  href={`/contact?service=${service.slug}`}
                  className="inline-flex items-center gap-3 px-8 py-5 bg-coral text-white font-rubik text-xs uppercase tracking-widest font-semibold hover:bg-coral-hover hover:scale-105 transition-all shadow-lg rounded-[50px]"
                >
                  <span>Book This Service</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

