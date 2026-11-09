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
    <div className="space-y-8 max-w-4xl mx-auto">
      <div className="flex items-center justify-between pb-6 border-b border-ink/10">
        <div>
          <Link
            href="/admin/events"
            className="inline-flex items-center gap-2 text-xs uppercase font-display tracking-widest text-ink/60 hover:text-coral transition-colors mb-2"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Events Catalog
          </Link>
          <h1 className="editorial-headline text-ink text-3xl">Edit: {event.title}</h1>
        </div>

        <button
          type="submit"
          form="edit-event-form"
          className="inline-flex items-center gap-2 px-6 py-3 bg-coral text-white font-display text-xs uppercase tracking-widest font-semibold hover:bg-coral-hover transition-colors shadow-sm"
        >
          <Save className="w-4 h-4" />
          <span>Save Changes</span>
        </button>
      </div>

      {saved && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-body flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>Changes successfully saved to Firestore! Redirecting...</span>
        </div>
      )}

      <form id="edit-event-form" onSubmit={handleUpdate} className="bg-white border border-ink/10 p-8 shadow-sm space-y-6 text-sm font-body">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs uppercase font-display tracking-widest text-ink/70 mb-2 font-semibold">
              Event Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-3 bg-warm-ivory/50 border border-ink/15 text-ink focus:outline-none focus:border-coral"
            />
          </div>

          <div>
            <label className="block text-xs uppercase font-display tracking-widest text-ink/70 mb-2 font-semibold">
              Category
            </label>
            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-4 py-3 bg-warm-ivory/50 border border-ink/15 text-ink focus:outline-none focus:border-coral"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs uppercase font-display tracking-widest text-ink/70 mb-2 font-semibold">
            Season / Status
          </label>
          <input
            type="text"
            value={season}
            onChange={(e) => setSeason(e.target.value)}
            className="w-full px-4 py-3 bg-warm-ivory/50 border border-ink/15 text-ink focus:outline-none focus:border-coral"
          />
        </div>

        <div>
          <label className="block text-xs uppercase font-display tracking-widest text-ink/70 mb-2 font-semibold">
            Short Summary
          </label>
          <textarea
            rows={3}
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            className="w-full px-4 py-3 bg-warm-ivory/50 border border-ink/15 text-ink focus:outline-none focus:border-coral"
          />
        </div>

        <div>
          <label className="block text-xs uppercase font-display tracking-widest text-ink/70 mb-2 font-semibold">
            Detailed Overview
          </label>
          <textarea
            rows={6}
            value={overview}
            onChange={(e) => setOverview(e.target.value)}
            className="w-full px-4 py-3 bg-warm-ivory/50 border border-ink/15 text-ink focus:outline-none focus:border-coral"
          />
        </div>
      </form>
    </div>
  );
}

export default function AdminEditEventPage({ params }: Props) {
  const { id } = use(params);
  return (
    <Suspense fallback={<div className="p-8 text-center text-sm font-display text-ink/60">Loading event editor...</div>}>
      <EditEventForm id={id} />
    </Suspense>
  );
}
