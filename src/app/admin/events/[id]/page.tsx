'use client';

import { use, useEffect, useState, Suspense } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Save, CheckCircle2 } from 'lucide-react';
import { EVENTS_DATA, type EventDetailData } from '@/config/events-data';

interface Props {
  params: Promise<{ id: string }>;
}

function EditEventForm({ id }: { id: string }) {
  const router = useRouter();
  const initialEvent = EVENTS_DATA.find((e) => e.slug === id) || EVENTS_DATA[0];
  const [activeSlug, setActiveSlug] = useState(id || initialEvent.slug);

  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [title, setTitle] = useState(initialEvent.title);
  const [category, setCategory] = useState(initialEvent.category);
  const [season, setSeason] = useState(initialEvent.seasonOrYear);
  const [summary, setSummary] = useState(initialEvent.summary);
  const [overview, setOverview] = useState(initialEvent.overview);

  useEffect(() => {
    let active = true;
    fetch(`/api/events?slug=${encodeURIComponent(id)}`)
      .then((res) => (res.ok ? res.json() : null))
      .then((data: { event?: EventDetailData } | null) => {
        if (!active || !data?.event) return;
        setActiveSlug(data.event.slug);
        setTitle(data.event.title);
        setCategory(data.event.category);
        setSeason(data.event.seasonOrYear);
        setSummary(data.event.summary);
        setOverview(data.event.overview);
      })
      .catch(() => {});
    return () => {
      active = false;
    };
  }, [id]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch('/api/events', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          slug: activeSlug,
          title,
          category,
          seasonOrYear: season,
          summary,
          overview,
        }),
      });
      if (res.ok) {
        setSaved(true);
        setTimeout(() => {
          router.push('/admin/events');
        }, 900);
      }
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto font-body text-ink">
      <div className="flex items-center justify-between pb-6 border-b border-line">
        <div>
          <Link
            href="/admin/events"
            className="inline-flex items-center gap-2 text-xs uppercase font-body tracking-wider text-muted hover:text-ink transition-colors mb-2"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Events Catalog
          </Link>
          <h1 className="editorial-headline text-ink text-3xl font-body">Edit: {title}</h1>
        </div>

        <button
          type="submit"
          form="edit-event-form"
          disabled={saving}
          className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-cream font-body text-xs uppercase tracking-widest font-semibold hover:bg-coral-hover hover:scale-105 transition-all shadow-md rounded-[0.3rem] disabled:opacity-60"
        >
          <Save className="w-4 h-4" />
          <span>{saving ? 'Saving...' : 'Save Changes'}</span>
        </button>
      </div>

      {saved && (
        <div className="p-4 bg-forest-soft border border-forest/25 text-ink-soft text-xs font-body flex items-center gap-2 rounded-[0.5rem] shadow-sm">
          <CheckCircle2 className="w-4 h-4 text-coral" />
          <span>Changes successfully saved to Firestore! Redirecting...</span>
        </div>
      )}

      <form id="edit-event-form" onSubmit={handleUpdate} className="bg-card border border-line p-8 rounded-[0.5rem] shadow-sm space-y-6 text-sm font-body">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs uppercase font-body tracking-wider text-muted mb-2 font-medium">
              Event Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-3 bg-cream border border-line-strong text-ink font-body rounded-[0.3rem] focus:outline-none focus:border-coral focus:ring-1 focus:ring-coral"
            />
          </div>

          <div>
            <label className="block text-xs uppercase font-body tracking-wider text-muted mb-2 font-medium">
              Category
            </label>
            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-4 py-3 bg-cream border border-line-strong text-ink font-body rounded-[0.3rem] focus:outline-none focus:border-coral focus:ring-1 focus:ring-coral"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs uppercase font-body tracking-wider text-muted mb-2 font-medium">
            Season / Status
          </label>
          <input
            type="text"
            value={season}
            onChange={(e) => setSeason(e.target.value)}
            className="w-full px-4 py-3 bg-cream border border-line-strong text-ink font-body rounded-[0.3rem] focus:outline-none focus:border-coral focus:ring-1 focus:ring-coral"
          />
        </div>

        <div>
          <label className="block text-xs uppercase font-body tracking-wider text-muted mb-2 font-medium">
            Short Summary
          </label>
          <textarea
            rows={3}
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            className="w-full px-4 py-3 bg-cream border border-line-strong text-ink font-body rounded-[0.3rem] focus:outline-none focus:border-coral focus:ring-1 focus:ring-coral"
          />
        </div>

        <div>
          <label className="block text-xs uppercase font-body tracking-wider text-muted mb-2 font-medium">
            Detailed Overview
          </label>
          <textarea
            rows={6}
            value={overview}
            onChange={(e) => setOverview(e.target.value)}
            className="w-full px-4 py-3 bg-cream border border-line-strong text-ink font-body rounded-[0.3rem] focus:outline-none focus:border-coral focus:ring-1 focus:ring-coral"
          />
        </div>
      </form>
    </div>
  );
}

export default function AdminEditEventPage({ params }: Props) {
  const { id } = use(params);
  return (
    <Suspense fallback={<div className="p-8 text-center text-sm font-body text-muted">Loading event editor...</div>}>
      <EditEventForm id={id} />
    </Suspense>
  );
}
