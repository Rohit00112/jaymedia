'use client';

import Image from 'next/image';
import { Upload, CheckCircle2 } from 'lucide-react';

const SAMPLES = [
  {
    title: 'Miss Koshi 2024 Season #8 Winners',
    category: 'Miss Koshi',
    dimensions: '1313x1600',
    image: '/images/official/koshi-2024-cover.png',
  },
  {
    title: 'Nepal Kids Idol Audition Banner',
    category: 'Nepal Kids Idol',
    dimensions: '2938x2463',
    image: '/images/official/nki-poster.png',
  },
  {
    title: 'Little Koshi Talent Round Dharan',
    category: 'Mr. & Miss Little Koshi',
    dimensions: '1080x1080',
    image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=400&q=80',
  },
  {
    title: 'Intelligent Beam Rigging Plots',
    category: 'Stagecraft',
    dimensions: '2560x1440',
    image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=400&q=80',
  },
  {
    title: 'Corporate Brand Reveal Stage',
    category: 'Corporate Galas',
    dimensions: '1920x1080',
    image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=400&q=80',
  },
];

export default function AdminGalleryPage() {
  return (
    <div className="space-y-8 font-body text-ink">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-line">
        <div>
          <span className="text-xs uppercase font-body tracking-wider text-coral font-semibold block mb-1">
            MEDIA ASSET VAULT
          </span>
          <h1 className="editorial-headline text-ink text-3xl sm:text-4xl font-body">
            Gallery Archive CMS
          </h1>
          <p className="text-xs sm:text-sm font-body text-muted mt-1">
            Manage high-resolution event photography stored in Firebase Storage (/gallery/).
          </p>
        </div>

        <button className="inline-flex items-center gap-2 px-5 py-3 bg-accent text-cream font-body text-xs uppercase tracking-widest font-semibold hover:bg-coral-hover hover:scale-105 transition-all shadow-md rounded-[0.3rem]">
          <Upload className="w-4 h-4" />
          <span>Batch Upload Images</span>
        </button>
      </div>

      <div className="bg-card border border-line p-6 rounded-[0.5rem] shadow-sm">
        <h3 className="font-body font-bold text-base text-ink mb-4">
          Archived Photographs ({SAMPLES.length})
        </h3>
        <div className="divide-y divide-line">
          {SAMPLES.map((img, i) => (
            <div key={i} className="py-4 flex items-center justify-between text-xs font-body">
              <div className="flex items-center gap-4">
                <div className="relative w-14 h-14 rounded-[0.3rem] overflow-hidden border border-line shrink-0">
                  <Image src={img.image} alt={img.title} fill className="object-cover" />
                </div>
                <div>
                  <h4 className="font-body font-semibold text-ink text-sm">{img.title}</h4>
                  <span className="text-faint font-body">{img.category} • {img.dimensions}</span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="inline-flex items-center gap-1 text-[10px] uppercase font-body px-2.5 py-0.5 bg-forest-soft border border-forest/25 text-ink-soft rounded-[0.3rem] font-medium">
                  <CheckCircle2 className="w-3 h-3 text-ink-soft" /> Live in Vault
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

