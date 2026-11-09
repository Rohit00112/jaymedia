'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Save, Upload, CheckCircle2 } from 'lucide-react';

export default function AdminNewEventPage() {
  const router = useRouter();
  const [saved, setSaved] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    category: 'Beauty Pageant & Youth Empowerment',
    season: '2025 Edition',
    location: 'Biratnagar, Koshi Province',
    tagline: '',
    summary: '',
    description: '',
    status: 'published',
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => {
      router.push('/admin/events');
    }, 1500);
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      {/* Top Bar */}
      <div className="flex items-center justify-between pb-6 border-b border-ink/10">
        <div>
          <Link
            href="/admin/events"
            className="inline-flex items-center gap-2 text-xs uppercase font-display tracking-widest text-ink/60 hover:text-coral transition-colors mb-2"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Events Catalog
          </Link>
          <h1 className="editorial-headline text-ink text-3xl">Create New Production</h1>
        </div>

        <button
          type="submit"
          form="event-form"
          className="inline-flex items-center gap-2 px-6 py-3 bg-coral text-white font-display text-xs uppercase tracking-widest font-semibold hover:bg-coral-hover transition-colors shadow-sm"
        >
          <Save className="w-4 h-4" />
          <span>Publish Event</span>
        </button>
      </div>

      {saved && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-body flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>Event successfully created and queued for publication! Redirecting...</span>
        </div>
      )}

      {/* Form */}
      <form id="event-form" onSubmit={handleSave} className="bg-white border border-ink/10 p-8 shadow-sm space-y-6 text-sm font-body">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs uppercase font-display tracking-widest text-ink/70 mb-2 font-semibold">
              Event Title *
            </label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="e.g. Miss Koshi 2025"
              className="w-full px-4 py-3 bg-warm-ivory/50 border border-ink/15 text-ink focus:outline-none focus:border-coral"
            />
          </div>

          <div>
            <label className="block text-xs uppercase font-display tracking-widest text-ink/70 mb-2 font-semibold">
              Category *
            </label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full px-4 py-3 bg-warm-ivory/50 border border-ink/15 text-ink focus:outline-none focus:border-coral"
            >
              <option value="Beauty Pageant & Youth Empowerment">Beauty Pageant &amp; Youth Empowerment</option>
              <option value="Children's Talent & Personality Showcase">Children&apos;s Talent &amp; Personality Showcase</option>
              <option value="Corporate & Experiential">Corporate &amp; Experiential</option>
              <option value="Musical Arena Concert">Musical Arena Concert</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs uppercase font-display tracking-widest text-ink/70 mb-2 font-semibold">
              Season / Year
            </label>
            <input
              type="text"
              value={formData.season}
              onChange={(e) => setFormData({ ...formData, season: e.target.value })}
              className="w-full px-4 py-3 bg-warm-ivory/50 border border-ink/15 text-ink focus:outline-none focus:border-coral"
            />
          </div>

          <div>
            <label className="block text-xs uppercase font-display tracking-widest text-ink/70 mb-2 font-semibold">
              Location Hub
            </label>
            <input
              type="text"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              className="w-full px-4 py-3 bg-warm-ivory/50 border border-ink/15 text-ink focus:outline-none focus:border-coral"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs uppercase font-display tracking-widest text-ink/70 mb-2 font-semibold">
            Tagline / Punchline
          </label>
          <input
            type="text"
            value={formData.tagline}
            onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
            placeholder="e.g. Empowering the next generation of provincial leaders."
            className="w-full px-4 py-3 bg-warm-ivory/50 border border-ink/15 text-ink focus:outline-none focus:border-coral"
          />
        </div>

        <div>
          <label className="block text-xs uppercase font-display tracking-widest text-ink/70 mb-2 font-semibold">
            Short Summary
          </label>
          <textarea
            rows={3}
            value={formData.summary}
            onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
            placeholder="Brief editorial summary shown on cards..."
            className="w-full px-4 py-3 bg-warm-ivory/50 border border-ink/15 text-ink focus:outline-none focus:border-coral"
          />
        </div>

        <div>
          <label className="block text-xs uppercase font-display tracking-widest text-ink/70 mb-2 font-semibold">
            Detailed Overview &amp; Production Background
          </label>
          <textarea
            rows={6}
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            placeholder="Comprehensive description of stagecraft, judges, contestants, and schedule..."
            className="w-full px-4 py-3 bg-warm-ivory/50 border border-ink/15 text-ink focus:outline-none focus:border-coral"
          />
        </div>

        {/* Cover Photo Upload Simulation */}
        <div className="p-6 border-2 border-dashed border-ink/20 text-center bg-warm-ivory/30">
          <Upload className="w-8 h-8 text-coral mx-auto mb-2" />
          <span className="text-xs font-display uppercase tracking-widest text-ink/70 block font-semibold">
            Upload Key Stage Visual or Poster
          </span>
          <span className="text-[11px] text-ink/50 block mt-1">
            Accepts WebP, JPG, PNG up to 10MB (stored in Firebase Storage /events/)
          </span>
        </div>
      </form>
    </div>
  );
}

