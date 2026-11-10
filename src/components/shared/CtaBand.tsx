import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import Reveal from '@/components/motion/Reveal';
import { siteConfig } from '@/config/site';

export default function CtaBand() {
  return (
    <section className="border-t border-line bg-paper-deep py-16 md:py-20">
      <div className="container-ed">
        <div className="border-2 border-ink bg-white p-8 md:p-12">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-line pb-4">
            <span className="eyebrow inline-flex items-center gap-2.5 text-forest">
              <span className="h-2.5 w-1 bg-forest" aria-hidden="true" />
              Production Inquiry
            </span>
            <span className="eyebrow text-faint">
              Biratnagar &bull; Est. {siteConfig.established}
            </span>
          </div>

          <div className="mt-8 grid items-end gap-8 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <Reveal>
                <h2 className="display max-w-[16ch] text-balance text-[clamp(2.1rem,4.5vw,4rem)] font-bold text-ink">
                  Commission a show, launch, or live event.
                </h2>
              </Reveal>
            </div>

            <div className="lg:col-span-5">
              <Reveal delay={90}>
                <p className="text-sm leading-relaxed text-muted md:text-[0.95rem]">
                  Speak directly with our Biratnagar production desk for stage
                  architecture, sponsorship packages, and execution timelines.
                </p>

                <div className="mt-6 flex flex-wrap items-center gap-3.5">
                  <Link href="/contact" className="btn btn-accent">
                    <span>Start Project Brief</span>
                    <ArrowUpRight className="h-4 w-4 text-gold" />
                  </Link>
                  <Link href="/services" className="btn btn-outline bg-white">
                    <span>View Services</span>
                  </Link>
                </div>
              </Reveal>
            </div>
          </div>

          <dl className="mt-10 grid gap-6 border-t border-line pt-6 sm:grid-cols-3">
            <div>
              <dt className="eyebrow text-faint">Headquarters</dt>
              <dd className="mt-1.5 text-sm font-medium text-ink">
                {siteConfig.location.address}, {siteConfig.location.city}
              </dd>
            </div>
            <div>
              <dt className="eyebrow text-faint">Direct Telephone</dt>
              <dd className="mono mt-1.5 text-sm font-bold text-forest">
                {siteConfig.contact.phone} / {siteConfig.contact.secondaryPhone}
              </dd>
            </div>
            <div>
              <dt className="eyebrow text-faint">Email Desk</dt>
              <dd className="mt-1.5 text-sm font-medium text-ink">
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="link-sweep text-ink"
                >
                  {siteConfig.contact.email}
                </a>
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  );
}
