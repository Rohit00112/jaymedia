'use client';

import Link from 'next/link';
import { CheckCircle2 } from 'lucide-react';
import { SERVICES_DATA } from '@/config/services-data';

export default function AdminServicesPage() {
  return (
    <div className="space-y-8 font-rubik text-white">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <span className="text-xs uppercase font-rubik tracking-wider text-coral font-semibold block mb-1">
            CAPABILITIES CATALOG
          </span>
          <h1 className="editorial-headline text-white text-3xl sm:text-4xl font-rubik">
            Production Services CMS
          </h1>
          <p className="text-xs sm:text-sm font-rubik text-[#eef9ff]/60 mt-1">
            Configure stagecraft, brand activations, broadcasting, and commercial capabilities.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {SERVICES_DATA.map((service) => (
          <div
            key={service.slug}
            className="bg-[#0c0c11] border border-white/10 p-6 sm:p-8 rounded-[10px] flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-xl hover:border-coral/40 transition-all"
          >
            <div className="space-y-2 max-w-2xl">
              <div className="flex items-center gap-3">
                <span className="text-coral font-rubik font-bold text-lg">{service.number}</span>
                <span className="text-xs uppercase font-rubik text-[#eef9ff]/60">{service.category}</span>
                <span className="inline-flex items-center gap-1 text-[10px] uppercase font-rubik px-2.5 py-0.5 bg-[#01402b]/90 border border-[#01402b] text-[#eef9ff] rounded-[50px] font-medium">
                  <CheckCircle2 className="w-3 h-3 text-[#eef9ff]" /> Live
                </span>
              </div>
              <h3 className="font-rubik text-xl font-bold text-white">{service.title}</h3>
              <p className="text-xs sm:text-sm font-rubik text-[#eef9ff]/70 leading-relaxed">
                {service.shortDescription}
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <Link
                href={`/services/${service.slug}`}
                target="_blank"
                className="px-4 py-2 border border-white/20 text-xs font-rubik uppercase tracking-wider text-[#eef9ff] hover:text-coral hover:border-coral transition-colors rounded-[50px]"
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

