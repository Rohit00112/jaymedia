'use client';

import Link from 'next/link';
import { Layers, Plus, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { SERVICES_DATA } from '@/config/services-data';

export default function AdminServicesPage() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-ink/10">
        <div>
          <span className="text-xs uppercase font-display tracking-widest text-coral font-semibold block mb-1">
            CAPABILITIES CATALOG
          </span>
          <h1 className="editorial-headline text-ink text-3xl sm:text-4xl">
            Production Services CMS
          </h1>
          <p className="text-xs sm:text-sm font-body text-ink/60 mt-1">
            Configure stagecraft, brand activations, broadcasting, and commercial capabilities.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {SERVICES_DATA.map((service) => (
          <div
            key={service.slug}
            className="bg-white border border-ink/10 p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="space-y-2 max-w-2xl">
              <div className="flex items-center gap-3">
                <span className="text-coral font-display font-bold text-lg">{service.number}</span>
                <span className="text-xs uppercase font-display tracking-widest text-ink/50">{service.category}</span>
                <span className="inline-flex items-center gap-1 text-[10px] uppercase font-display px-2 py-0.5 bg-emerald-100 text-emerald-800">
                  <CheckCircle2 className="w-3 h-3" /> Live
                </span>
              </div>
              <h3 className="font-display text-xl font-bold text-ink">{service.title}</h3>
              <p className="text-xs sm:text-sm font-body text-ink/70 leading-relaxed">
                {service.shortDescription}
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <Link
                href={`/services/${service.slug}`}
                target="_blank"
                className="px-4 py-2 border border-ink/15 text-xs font-display uppercase tracking-wider text-ink hover:text-coral hover:border-coral transition-colors"
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

