import Link from 'next/link';
import { siteConfig } from '@/config/site';

export default function CtaBand() {
  return (
    <section className="border-t border-line bg-white py-14 md:py-16">
      <div className="container-ed">
        <div className="flex flex-col justify-between gap-6 rounded-xl border border-line bg-paper-deep p-6 sm:p-8 lg:flex-row lg:items-center">
          <div className="max-w-xl">
            <h2 className="text-xl font-semibold text-ink sm:text-2xl">
              Plan your next concert, launch, or live event.
            </h2>
            <p className="mt-1.5 text-sm leading-relaxed text-muted">
              Connect with our team in Biratnagar ({siteConfig.contact.phone} /{' '}
              {siteConfig.contact.secondaryPhone}) for stage production, event
              management, and sponsorship partnerships.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link href="/contact" className="btn btn-primary">
              Get in Touch
            </Link>
            <Link href="/services" className="btn btn-outline">
              Our Services
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
