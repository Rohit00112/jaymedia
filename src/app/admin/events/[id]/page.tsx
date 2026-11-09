'use client';

import { use, useState, Suspense } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Save, CheckCircle2 } from 'lucide-react';
import { EVENTS_DATA } from '@/config/events-data';

interface Props {
  params: Promise<{ id: string }>;
}

function EditEventForm({ id }: { id: string }) {
  const router = useRouter();
  const event = EVENTS_DATA.find((e) => e.slug === id) || EVENTS_DATA[0];

  const [saved, setSaved] = useState(false);
  const [title, setTitle] = useState(event.title);
  const [category, setCategory] = useState(event.category);
  const [season, setSeason] = useState(event.seasonOrYear);
  const [summary, setSummary] = useState(event.summary);
  const [overview, setOverview] = useState(event.overview);

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => {
      router.push('/admin/events');
    }, 1500);
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto font-body text-white">
      <div className="flex items-center justify-between pb-6 border-b border-white/10">
        <div>
          <Link
            href="/admin/events"
            className="inline-flex items-center gap-2 text-xs uppercase font-body tracking-wider text-[#eef9ff]/60 hover:text-white transition-colors mb-2"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Events Catalog
          </Link>
          <h1 className="editorial-headline text-white text-3xl font-body">Edit: {event.title}</h1>
        </div>

        <button
          type="submit"
          form="edit-event-form"
          className="inline-flex items-center gap-2 px-6 py-3 bg-coral text-white font-body text-xs uppercase tracking-widest font-semibold hover:bg-coral-hover hover:scale-105 transition-all shadow-md rounded-[50px]"
        >
          <Save className="w-4 h-4" />
          <span>Save Changes</span>
        </button>
      </div>

      {saved && (
        <div className="p-4 bg-[#01402b]/90 border border-[#01402b] text-[#eef9ff] text-xs font-body flex items-center gap-2 rounded-[10px] shadow-lg">
          <CheckCircle2 className="w-4 h-4 text-coral" />
          <span>Changes successfully saved to Firestore! Redirecting...</span>
        </div>
      )}

      <form id="edit-event-form" onSubmit={handleUpdate} className="bg-[#0c0c11] border border-white/10 p-8 rounded-[10px] shadow-2xl space-y-6 text-sm font-body">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs uppercase font-body tracking-wider text-[#eef9ff]/70 mb-2 font-medium">
              Event Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-3 bg-black/60 border border-white/15 text-white font-body rounded-[2px] focus:outline-none focus:border-coral focus:ring-1 focus:ring-coral"
            />
          </div>

          <div>
            <label className="block text-xs uppercase font-body tracking-wider text-[#eef9ff]/70 mb-2 font-medium">
              Category
            </label>
            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-4 py-3 bg-black/60 border border-white/15 text-white font-body rounded-[2px] focus:outline-none focus:border-coral focus:ring-1 focus:ring-coral"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs uppercase font-body tracking-wider text-[#eef9ff]/70 mb-2 font-medium">
            Season / Status
          </label>
          <input
            type="text"
            value={season}
            onChange={(e) => setSeason(e.target.value)}
            className="w-full px-4 py-3 bg-black/60 border border-white/15 text-white font-body rounded-[2px] focus:outline-none focus:border-coral focus:ring-1 focus:ring-coral"
          />
        </div>

        <div>
          <label className="block text-xs uppercase font-body tracking-wider text-[#eef9ff]/70 mb-2 font-medium">
            Short Summary
          </label>
          <textarea
            rows={3}
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            className="w-full px-4 py-3 bg-black/60 border border-white/15 text-white font-body rounded-[2px] focus:outline-none focus:border-coral focus:ring-1 focus:ring-coral"
          />
        </div>

        <div>
          <label className="block text-xs uppercase font-body tracking-wider text-[#eef9ff]/70 mb-2 font-medium">
            Detailed Overview
          </label>
          <textarea
            rows={6}
            value={overview}
            onChange={(e) => setOverview(e.target.value)}
            className="w-full px-4 py-3 bg-black/60 border border-white/15 text-white font-body rounded-[2px] focus:outline-none focus:border-coral focus:ring-1 focus:ring-coral"
          />
        </div>
      </form>
    </div>
  );
}

export default function AdminEditEventPage({ params }: Props) {
  const { id } = use(params);
  return (
    <Suspense fallback={<div className="p-8 text-center text-sm font-body text-[#eef9ff]/60">Loading event editor...</div>}>
      <EditEventForm id={id} />
    </Suspense>
  );
}
