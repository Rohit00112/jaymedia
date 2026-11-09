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
    <div className="space-y-8 max-w-4xl mx-auto font-body text-white">
      {/* Top Bar */}
      <div className="flex items-center justify-between pb-6 border-b border-white/10">
        <div>
          <Link
            href="/admin/events"
            className="inline-flex items-center gap-2 text-xs uppercase font-body tracking-wider text-[#eef9ff]/60 hover:text-white transition-colors mb-2"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Events Catalog
          </Link>
          <h1 className="editorial-headline text-white text-3xl font-body">Create New Production</h1>
        </div>

        <button
          type="submit"
          form="event-form"
          className="inline-flex items-center gap-2 px-6 py-3 bg-coral text-white font-body text-xs uppercase tracking-widest font-semibold hover:bg-coral-hover hover:scale-105 transition-all shadow-md rounded-[50px]"
        >
          <Save className="w-4 h-4" />
          <span>Publish Event</span>
        </button>
      </div>

      {saved && (
        <div className="p-4 bg-[#01402b]/90 border border-[#01402b] text-[#eef9ff] text-xs font-body flex items-center gap-2 rounded-[10px] shadow-lg">
          <CheckCircle2 className="w-4 h-4 text-coral" />
          <span>Event successfully created and queued for publication! Redirecting...</span>
        </div>
      )}

      {/* Form */}
      <form id="event-form" onSubmit={handleSave} className="bg-[#0c0c11] border border-white/10 p-8 rounded-[10px] shadow-2xl space-y-6 text-sm font-body">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs uppercase font-body tracking-wider text-[#eef9ff]/70 mb-2 font-medium">
              Event Title *
            </label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="e.g. Miss Koshi 2025"
              className="w-full px-4 py-3 bg-black/60 border border-white/15 text-white font-body rounded-[2px] focus:outline-none focus:border-coral focus:ring-1 focus:ring-coral placeholder-[#eef9ff]/30"
            />
          </div>

          <div>
            <label className="block text-xs uppercase font-body tracking-wider text-[#eef9ff]/70 mb-2 font-medium">
              Category *
            </label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full px-4 py-3 bg-black/60 border border-white/15 text-white font-body rounded-[2px] focus:outline-none focus:border-coral focus:ring-1 focus:ring-coral"
            >
              <option value="Beauty Pageant & Youth Empowerment" className="bg-[#0c0c11]">Beauty Pageant &amp; Youth Empowerment</option>
              <option value="Children's Talent & Personality Showcase" className="bg-[#0c0c11]">Children&apos;s Talent &amp; Personality Showcase</option>
              <option value="Corporate & Experiential" className="bg-[#0c0c11]">Corporate &amp; Experiential</option>
              <option value="Musical Arena Concert" className="bg-[#0c0c11]">Musical Arena Concert</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs uppercase font-body tracking-wider text-[#eef9ff]/70 mb-2 font-medium">
              Season / Year
            </label>
            <input
              type="text"
              value={formData.season}
              onChange={(e) => setFormData({ ...formData, season: e.target.value })}
              className="w-full px-4 py-3 bg-black/60 border border-white/15 text-white font-body rounded-[2px] focus:outline-none focus:border-coral focus:ring-1 focus:ring-coral"
            />
          </div>

          <div>
            <label className="block text-xs uppercase font-body tracking-wider text-[#eef9ff]/70 mb-2 font-medium">
              Location Hub
            </label>
            <input
              type="text"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              className="w-full px-4 py-3 bg-black/60 border border-white/15 text-white font-body rounded-[2px] focus:outline-none focus:border-coral focus:ring-1 focus:ring-coral"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs uppercase font-body tracking-wider text-[#eef9ff]/70 mb-2 font-medium">
            Tagline / Punchline
          </label>
          <input
            type="text"
            value={formData.tagline}
            onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
            placeholder="e.g. Empowering the next generation of provincial leaders."
            className="w-full px-4 py-3 bg-black/60 border border-white/15 text-white font-body rounded-[2px] focus:outline-none focus:border-coral focus:ring-1 focus:ring-coral placeholder-[#eef9ff]/30"
          />
        </div>

        <div>
          <label className="block text-xs uppercase font-body tracking-wider text-[#eef9ff]/70 mb-2 font-medium">
            Short Summary
          </label>
          <textarea
            rows={3}
            value={formData.summary}
            onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
            placeholder="Brief editorial summary shown on cards..."
            className="w-full px-4 py-3 bg-black/60 border border-white/15 text-white font-body rounded-[2px] focus:outline-none focus:border-coral focus:ring-1 focus:ring-coral placeholder-[#eef9ff]/30"
          />
        </div>

        <div>
          <label className="block text-xs uppercase font-body tracking-wider text-[#eef9ff]/70 mb-2 font-medium">
            Detailed Overview &amp; Production Background
          </label>
          <textarea
            rows={6}
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            placeholder="Comprehensive description of stagecraft, judges, contestants, and schedule..."
            className="w-full px-4 py-3 bg-black/60 border border-white/15 text-white font-body rounded-[2px] focus:outline-none focus:border-coral focus:ring-1 focus:ring-coral placeholder-[#eef9ff]/30"
          />
        </div>

        {/* Cover Photo Upload Simulation */}
        <div className="p-6 border-2 border-dashed border-white/20 text-center bg-black/40 rounded-[10px]">
          <Upload className="w-8 h-8 text-coral mx-auto mb-2" />
          <span className="text-xs font-body uppercase tracking-wider text-[#eef9ff]/80 block font-semibold">
            Upload Key Stage Visual or Poster
          </span>
          <span className="text-[11px] text-[#eef9ff]/50 block mt-1 font-body">
            Accepts WebP, JPG, PNG up to 10MB (stored in Firebase Storage /events/)
          </span>
        </div>
      </form>
    </div>
  );
}

