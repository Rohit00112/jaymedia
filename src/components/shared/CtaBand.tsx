import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import Reveal from '@/components/motion/Reveal';
import { siteConfig } from '@/config/site';

export default function CtaBand() {
  return (
    <section className="border-t border-line bg-paper-deep py-16 md:py-20">
      <div className="container-ed">
        <div className="rounded-lg border border-line bg-white p-8 md:p-12">
          <div className="grid items-end gap-8 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <Reveal>
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-forest">
                  Work With Us
                </p>
                <h2 className="display mt-3 max-w-[16ch] text-balance text-[clamp(2rem,4vw,3.4rem)] font-bold tracking-tight text-ink">
                  Plan your next concert, launch, or live event.
                </h2>
              </Reveal>
            </div>

            <div className="lg:col-span-5">
              <Reveal delay={80}>
                <p className="text-base leading-relaxed text-muted">
                  Connect with our production team in Biratnagar for stage
                  production, event management, and sponsorship partnerships.
                </p>

                <div className="mt-6 flex flex-wrap items-center gap-3.5">
                  <Link href="/contact" className="btn btn-accent">
                    <span>Get in Touch</span>
                    <ArrowUpRight className="h-4 w-4 text-gold" />
                  </Link>
                  <Link href="/services" className="btn btn-outline bg-white">
                    <span>Our Services</span>
                  </Link>
                </div>
              </Reveal>
            </div>
          </div>

          <dl className="mt-10 grid gap-6 border-t border-line pt-6 sm:grid-cols-3">
            <div>
              <dt className="text-xs text-muted">Office</dt>
              <dd className="mt-1 text-sm font-semibold text-ink">
                {siteConfig.location.address}, {siteConfig.location.city}
              </dd>
            </div>
            <div>
              <dt className="text-xs text-muted">Phone</dt>
              <dd className="mt-1 text-sm font-semibold text-forest">
                {siteConfig.contact.phone} / {siteConfig.contact.secondaryPhone}
              </dd>
            </div>
            <div>
              <dt className="text-xs text-muted">Email</dt>
              <dd className="mt-1 text-sm font-semibold text-ink">
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="hover:text-forest"
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
