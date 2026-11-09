'use client';

import { Image as ImageIcon, Upload, CheckCircle2, Trash2 } from 'lucide-react';

const SAMPLES = [
  { title: 'Miss Koshi Coronation Ceremony', category: 'Miss Koshi', dimensions: '1920x1080' },
  { title: 'Little Koshi Talent Round Dharan', category: 'Mr. & Miss Little Koshi', dimensions: '1080x1080' },
  { title: 'Intelligent Beam Rigging Plots', category: 'Stagecraft', dimensions: '2560x1440' },
  { title: 'Corporate Brand Reveal Stage', category: 'Corporate Galas', dimensions: '1920x1080' },
  { title: 'Traditional Cultural Round', category: 'Miss Koshi', dimensions: '1080x1080' },
];

export default function AdminGalleryPage() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-ink/10">
        <div>
          <span className="text-xs uppercase font-display tracking-widest text-coral font-semibold block mb-1">
            MEDIA ASSET VAULT
          </span>
          <h1 className="editorial-headline text-ink text-3xl sm:text-4xl">
            Gallery Archive CMS
          </h1>
          <p className="text-xs sm:text-sm font-body text-ink/60 mt-1">
            Manage high-resolution event photography stored in Firebase Storage (/gallery/).
          </p>
        </div>

        <button className="inline-flex items-center gap-2 px-5 py-3 bg-coral text-white font-display text-xs uppercase tracking-widest font-semibold hover:bg-coral-hover transition-colors shadow-sm">
          <Upload className="w-4 h-4" />
          <span>Batch Upload Images</span>
        </button>
      </div>

      <div className="bg-white border border-ink/10 p-6 shadow-sm">
        <h3 className="font-display font-bold text-base text-ink mb-4">
          Archived Photographs ({SAMPLES.length})
        </h3>
        <div className="divide-y divide-ink/10">
          {SAMPLES.map((img, i) => (
            <div key={i} className="py-4 flex items-center justify-between text-xs font-body">
              <div>
                <h4 className="font-display font-semibold text-ink text-sm">{img.title}</h4>
                <span className="text-ink/50">{img.category} • {img.dimensions}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="inline-flex items-center gap-1 text-[10px] uppercase font-display px-2 py-0.5 bg-emerald-100 text-emerald-800">
                  <CheckCircle2 className="w-3 h-3" /> Live in Vault
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
