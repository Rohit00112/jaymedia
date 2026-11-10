'use client';

import { use, useEffect, useState, Suspense } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Save, CheckCircle2, Trash2 } from 'lucide-react';
import { EVENTS_DATA, type EventDetailData } from '@/config/events-data';

interface Props {
  params: Promise<{ id: string }>;
}

function EditEventForm({ id }: { id: string }) {
  const router = useRouter();
  const initialEvent =
    EVENTS_DATA.find((e) => e.slug === id) || EVENTS_DATA[0];

  const [activeSlug, setActiveSlug] = useState(id || initialEvent.slug);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const [title, setTitle] = useState(initialEvent.title);
  const [category, setCategory] = useState(initialEvent.category);
  const [season, setSeason] = useState(initialEvent.seasonOrYear);
  const [location, setLocation] = useState(initialEvent.location);
  const [eligibility, setEligibility] = useState(initialEvent.eligibility);
  const [prizePoolLabel, setPrizePoolLabel] = useState(
    initialEvent.prizePoolLabel
  );
  const [image, setImage] = useState(initialEvent.image);
  const [ticketUrl, setTicketUrl] = useState(initialEvent.ticketUrl || '');
  const [tagline, setTagline] = useState(initialEvent.tagline);
  const [summary, setSummary] = useState(initialEvent.summary);
  const [overview, setOverview] = useState(initialEvent.overview);
  const [status, setStatus] = useState<'published' | 'draft'>(
    initialEvent.status || 'published'
  );
  const [registrationOpen, setRegistrationOpen] = useState(
    initialEvent.registrationOpen
  );
  const [highlightsText, setHighlightsText] = useState(
    initialEvent.highlights.join('\n')
  );
  const [scopeText, setScopeText] = useState(
    initialEvent.productionScope.join('\n')
  );

  useEffect(() => {
    let active = true;
    fetch(`/api/events?slug=${encodeURIComponent(id)}`)
      .then((res) => (res.ok ? res.json() : null))
      .then((data: { event?: EventDetailData } | null) => {
        if (!active || !data?.event) return;
        const ev = data.event;
        setActiveSlug(ev.slug);
        setTitle(ev.title);
        setCategory(ev.category);
        setSeason(ev.seasonOrYear);
        setLocation(ev.location);
        setEligibility(ev.eligibility);
        setPrizePoolLabel(ev.prizePoolLabel);
        setImage(ev.image);
        setTicketUrl(ev.ticketUrl || '');
        setTagline(ev.tagline);
        setSummary(ev.summary);
        setOverview(ev.overview);
        setStatus(ev.status || 'published');
        setRegistrationOpen(ev.registrationOpen);
        setHighlightsText((ev.highlights || []).join('\n'));
        setScopeText((ev.productionScope || []).join('\n'));
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
          location,
          eligibility,
          prizePoolLabel,
          image,
          ticketUrl,
          tagline,
          summary,
          overview,
          status,
          registrationOpen,
          highlights: highlightsText
            .split('\n')
            .map((s) => s.trim())
            .filter(Boolean),
          productionScope: scopeText
            .split('\n')
            .map((s) => s.trim())
            .filter(Boolean),
        }),
      });
      if (res.ok) {
        setSaved(true);
        setTimeout(() => {
          router.push('/admin/events');
        }, 800);
      }
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (
      !window.confirm(
        `Delete "${title}" permanently from Firestore?`
      )
    ) {
      return;
    }
    const res = await fetch(
      `/api/events?slug=${encodeURIComponent(activeSlug)}`,
      { method: 'DELETE' }
    );
    if (res.ok) {
      router.push('/admin/events');
    }
  };

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div className="flex flex-col justify-between gap-4 border-b border-line pb-5 sm:flex-row sm:items-center">
        <div>
          <Link
            href="/admin/events"
            className="inline-flex items-center gap-1.5 text-xs font-medium text-muted transition-colors hover:text-ink"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Back to Events Catalog</span>
          </Link>
          <h1 className="mt-1.5 text-2xl font-semibold text-ink sm:text-3xl">
            Edit: {title}
          </h1>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={handleDelete}
            className="inline-flex items-center gap-1.5 rounded-lg border border-danger/30 bg-red-50 px-3.5 py-2 text-xs font-medium text-danger transition-colors hover:bg-red-100"
          >
            <Trash2 className="h-3.5 w-3.5" />
            <span>Delete</span>
          </button>
          <button
            type="submit"
            form="edit-event-form"
            disabled={saving}
            className="btn btn-primary py-2 text-xs disabled:opacity-60"
          >
            <Save className="h-4 w-4" />
            <span>{saving ? 'Saving...' : 'Save Changes'}</span>
          </button>
        </div>
      </div>

      {saved && (
        <div className="flex items-center gap-2 rounded-xl border border-forest/25 bg-forest-soft p-4 text-xs font-medium text-forest">
          <CheckCircle2 className="h-4 w-4" />
          <span>Changes saved to Cloud Firestore! Redirecting...</span>
        </div>
      )}

      <form
        id="edit-event-form"
        onSubmit={handleUpdate}
        className="space-y-6 rounded-xl border border-line bg-white p-6 sm:p-8"
      >
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div>
            <label className="mb-1.5 block text-xs font-medium text-ink">
              Production Title
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full rounded-lg border border-line bg-paper px-3.5 py-2.5 text-sm text-ink focus:border-forest focus:outline-none"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-medium text-ink">
              Category
            </label>
            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full rounded-lg border border-line bg-paper px-3.5 py-2.5 text-sm text-ink focus:border-forest focus:outline-none"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
          <div>
            <label className="mb-1.5 block text-xs font-medium text-ink">
              Season / Date
            </label>
            <input
              type="text"
              value={season}
              onChange={(e) => setSeason(e.target.value)}
              className="w-full rounded-lg border border-line bg-paper px-3.5 py-2.5 text-sm text-ink focus:border-forest focus:outline-none"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-medium text-ink">
              Venue / Location
            </label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full rounded-lg border border-line bg-paper px-3.5 py-2.5 text-sm text-ink focus:border-forest focus:outline-none"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-medium text-ink">
              Status
            </label>
            <select
              value={status}
              onChange={(e) =>
                setStatus(e.target.value as 'published' | 'draft')
              }
              className="w-full rounded-lg border border-line bg-paper px-3.5 py-2.5 text-sm text-ink focus:border-forest focus:outline-none"
            >
              <option value="published">Published</option>
              <option value="draft">Draft</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
          <div>
            <label className="mb-1.5 block text-xs font-medium text-ink">
              Eligibility
            </label>
            <input
              type="text"
              value={eligibility}
              onChange={(e) => setEligibility(e.target.value)}
              className="w-full rounded-lg border border-line bg-paper px-3.5 py-2.5 text-sm text-ink focus:border-forest focus:outline-none"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-medium text-ink">
              Awards / Recognition Label
            </label>
            <input
              type="text"
              value={prizePoolLabel}
              onChange={(e) => setPrizePoolLabel(e.target.value)}
              className="w-full rounded-lg border border-line bg-paper px-3.5 py-2.5 text-sm text-ink focus:border-forest focus:outline-none"
            />
          </div>

          <div className="flex items-end pb-2">
            <label className="inline-flex cursor-pointer items-center gap-2.5 text-xs font-medium text-ink">
              <input
                type="checkbox"
                checked={registrationOpen}
                onChange={(e) => setRegistrationOpen(e.target.checked)}
                className="h-4 w-4 rounded border-line text-forest focus:ring-forest"
              />
              <span>Contestant Auditions Open</span>
            </label>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div>
            <label className="mb-1.5 block text-xs font-medium text-ink">
              Cover / Poster Image URL
            </label>
            <input
              type="text"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              className="w-full rounded-lg border border-line bg-paper px-3.5 py-2.5 text-sm text-ink focus:border-forest focus:outline-none"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-medium text-ink">
              Official Ticket URL (Optional)
            </label>
            <input
              type="text"
              value={ticketUrl}
              onChange={(e) => setTicketUrl(e.target.value)}
              placeholder="https://events.khalti.com/..."
              className="w-full rounded-lg border border-line bg-paper px-3.5 py-2.5 text-sm text-ink focus:border-forest focus:outline-none"
            />
          </div>
        </div>

        <div>
          <label className="mb-1.5 block text-xs font-medium text-ink">
            Tagline
          </label>
          <input
            type="text"
            value={tagline}
            onChange={(e) => setTagline(e.target.value)}
            className="w-full rounded-lg border border-line bg-paper px-3.5 py-2.5 text-sm text-ink focus:border-forest focus:outline-none"
          />
        </div>

        <div>
          <label className="mb-1.5 block text-xs font-medium text-ink">
            Short Summary
          </label>
          <textarea
            rows={2}
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            className="w-full rounded-lg border border-line bg-paper px-3.5 py-2.5 text-sm text-ink focus:border-forest focus:outline-none"
          />
        </div>

        <div>
          <label className="mb-1.5 block text-xs font-medium text-ink">
            Detailed Overview
          </label>
          <textarea
            rows={5}
            value={overview}
            onChange={(e) => setOverview(e.target.value)}
            className="w-full rounded-lg border border-line bg-paper px-3.5 py-2.5 text-sm text-ink focus:border-forest focus:outline-none"
          />
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div>
            <label className="mb-1.5 block text-xs font-medium text-ink">
              Key Highlights (One per line)
            </label>
            <textarea
              rows={4}
              value={highlightsText}
              onChange={(e) => setHighlightsText(e.target.value)}
              className="w-full rounded-lg border border-line bg-paper px-3.5 py-2.5 text-xs text-ink focus:border-forest focus:outline-none"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-medium text-ink">
              Production Scope (One per line)
            </label>
            <textarea
              rows={4}
              value={scopeText}
              onChange={(e) => setScopeText(e.target.value)}
              className="w-full rounded-lg border border-line bg-paper px-3.5 py-2.5 text-xs text-ink focus:border-forest focus:outline-none"
            />
          </div>
        </div>
      </form>
    </div>
  );
}

export default function AdminEditEventPage({ params }: Props) {
  const { id } = use(params);
  return (
    <Suspense
      fallback={
        <div className="p-8 text-center text-sm text-muted">
          Loading event editor...
        </div>
      }
    >
      <EditEventForm id={id} />
    </Suspense>
  );
}
