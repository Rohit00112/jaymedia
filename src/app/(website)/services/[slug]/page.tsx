import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, ArrowUpRight, CheckCircle2, ShieldCheck, Sparkles } from 'lucide-react';
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
    <div className="bg-warm-ivory text-ink min-h-screen">
      {/* ─── Hero ─────────────────────────────────────────────── */}
      <section className="relative bg-ink text-white pt-40 pb-20 sm:pt-48 sm:pb-28 px-6 sm:px-10 lg:px-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-ink via-dark-surface to-ink opacity-90" />
        <div className="absolute top-1/2 -right-20 w-80 h-80 bg-coral/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-xs uppercase font-display tracking-widest text-muted-grey hover:text-coral transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Services
          </Link>

          <div className="flex items-center gap-3 mb-4">
            <span className="text-coral font-display font-bold text-lg">
              {service.number}
            </span>
            <span className="text-xs uppercase font-display tracking-widest text-white/50">
              {service.category}
            </span>
          </div>

          <h1 className="editorial-headline text-white text-4xl sm:text-6xl lg:text-7xl max-w-5xl leading-[0.95] mb-6">
            {service.title}
          </h1>

          <p className="text-muted-grey text-lg sm:text-xl max-w-3xl font-body leading-relaxed">
            {service.shortDescription}
          </p>
        </div>
      </section>

      {/* ─── Narrative Overview ──────────────────────────────── */}
      <section className="py-20 lg:py-28 px-6 sm:px-10 lg:px-16 border-b border-divider">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-7 space-y-6 text-base sm:text-lg font-body text-ink/80 leading-relaxed">
              <span className="section-label text-coral font-medium tracking-[0.25em] mb-2 block">
                PRODUCTION SCOPE
              </span>
              <h2 className="editorial-headline text-ink text-3xl sm:text-4xl leading-tight">
                Crafted for Flawless Execution.
              </h2>
              <p>{service.description}</p>
            </div>

            <div className="lg:col-span-5 bg-white border border-ink/10 p-8 shadow-sm">
              <h3 className="font-display text-sm uppercase tracking-widest text-ink font-semibold mb-6 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-coral" /> Key Capabilities
              </h3>
              <ul className="space-y-4">
                {service.capabilities.map((cap, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-coral shrink-0 mt-0.5" />
                    <span className="text-sm font-body text-ink/80">{cap}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Phased Approach ─────────────────────────────────── */}
      <section className="bg-ink text-white py-24 lg:py-36 px-6 sm:px-10 lg:px-16 border-b border-divider">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <span className="section-label text-coral font-medium tracking-[0.25em] mb-3 block">
              OUR METHODOLOGY
            </span>
            <h2 className="editorial-headline text-white text-3xl sm:text-5xl">
              HOW WE BRING IT TO LIFE.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {service.approach.map((step, idx) => (
              <div
                key={idx}
                className="bg-dark-surface p-8 border border-white/10 relative flex flex-col justify-between"
              >
                <div>
                  <span className="text-coral font-display text-xs uppercase tracking-widest block mb-4">
                    {step.phase}
                  </span>
                  <h3 className="font-display text-2xl font-bold mb-3">{step.title}</h3>
                  <p className="text-muted-grey text-sm font-body leading-relaxed">
                    {step.detail}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Deliverables & Inquiry CTA ──────────────────────── */}
      <section className="py-24 lg:py-36 px-6 sm:px-10 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white border border-ink/10 p-8 sm:p-14 lg:p-20 shadow-md">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-8">
                <span className="text-xs uppercase font-display tracking-widest text-coral font-semibold mb-2 block">
                  READY TO ENGAGE
                </span>
                <h3 className="editorial-headline text-ink text-3xl sm:text-5xl mb-4">
                  Request a Dedicated {service.title} Proposal.
                </h3>
                <p className="text-ink/70 font-body text-base max-w-2xl leading-relaxed mb-6">
                  Contact our Biratnagar production office to discuss dates, venue logistics, and budget parameters.
                </p>

                <div className="space-y-2">
                  <span className="text-xs uppercase font-display tracking-widest text-ink/50 block">
                    What You Receive:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {service.deliverables.map((deliv, idx) => (
                      <span
                        key={idx}
                        className="text-xs font-body px-3 py-1 bg-warm-ivory border border-ink/10 text-ink/80"
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
                  className="inline-flex items-center gap-3 px-8 py-5 bg-coral text-white font-display text-xs uppercase tracking-widest font-semibold hover:bg-coral-hover transition-colors shadow-lg"
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

