'use client';

import Link from 'next/link';
import { CheckCircle2 } from 'lucide-react';
import { SERVICES_DATA } from '@/config/services-data';

export default function AdminServicesPage() {
  return (
    <div className="space-y-8 font-body text-ink">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-line">
        <div>
          <span className="text-xs uppercase font-body tracking-wider text-coral font-semibold block mb-1">
            CAPABILITIES CATALOG
          </span>
          <h1 className="editorial-headline text-ink text-3xl sm:text-4xl font-body">
            Production Services CMS
          </h1>
          <p className="text-xs sm:text-sm font-body text-muted mt-1">
            Configure stagecraft, brand activations, broadcasting, and commercial capabilities.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {SERVICES_DATA.map((service) => (
          <div
            key={service.slug}
            className="bg-card border border-line p-6 sm:p-8 rounded-[0.5rem] flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-sm hover:border-coral/40 transition-all"
          >
            <div className="space-y-2 max-w-2xl">
              <div className="flex items-center gap-3">
                <span className="text-coral font-body font-bold text-lg">{service.number}</span>
                <span className="text-xs uppercase font-body text-muted">{service.category}</span>
                <span className="inline-flex items-center gap-1 text-[10px] uppercase font-body px-2.5 py-0.5 bg-forest-soft border border-forest/25 text-ink-soft rounded-[0.3rem] font-medium">
                  <CheckCircle2 className="w-3 h-3 text-ink-soft" /> Live
                </span>
              </div>
              <h3 className="font-body text-xl font-bold text-ink">{service.title}</h3>
              <p className="text-xs sm:text-sm font-body text-muted leading-relaxed">
                {service.shortDescription}
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <Link
                href={`/services/${service.slug}`}
                target="_blank"
                className="px-4 py-2 border border-line-strong text-xs font-body uppercase tracking-wider text-ink-soft hover:text-coral hover:border-coral transition-colors rounded-[0.3rem]"
              >
                View Public
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

