'use client';

import { use, useEffect, useState, Suspense } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Save, CheckCircle2, Trash2 } from 'lucide-react';
import { EVENTS_DATA, type EventDetailData } from '@/config/events-data';
import {
  ImageUploadField,
  ListBuilderField,
  PresetInputField,
  SegmentedToggle,
} from '@/components/admin/FormControls';

const CATEGORY_PRESETS = [
  'Beauty Pageant & Youth Empowerment',
  'National Television Singing Reality Show',
  "Children's Talent & Personality Showcase",
  'Youth Dance Championship',
  'International Live Concert • Atif Aslam Live',
  'Corporate & Experiential',
] as const;

const SEASON_PRESETS = [
  '2026 Edition',
  'Season One • 2025',
  'Seasons 1–8 • Annual Flagship',
  '19 Dec 2026 (Poush 4) • 6:00 PM',
] as const;

const LOCATION_PRESETS = [
  'Biratnagar, Koshi Province',
  'Itahari Stadium (Itahari Rangasala), Koshi Province',
  'Biratnagar • Itahari • Dharan',
  'All 77 Districts of Nepal',
] as const;

const ELIGIBILITY_PRESETS = [
  'Open Audition',
  'Ages 5–15',
  'Ages 16–25',
  'Ages 4–14 (Solo & Duo)',
  'Dec 19, 2026 • 6:00 PM',
] as const;

const PRIZE_PRESETS = [
  'Crowns & Cash Awards',
  'Rs. 2,000,000',
  'Crowns & Scholarships',
  'Trophies & Cash Awards',
  'Tickets via Khalti',
] as const;

const HIGHLIGHT_SUGGESTIONS = [
  'Regional & Live Auditions across Koshi Province',
  'Full 4K Multicam Broadcast & YouTube Coverage',
  'Celebrity Jury & Professional Mentorship Camp',
  'Concert-Grade Line-Array Sound & DMX Lighting',
];

const SCOPE_SUGGESTIONS = [
  'Complete stage design and DMX lighting choreography',
  'Multicam HD/4K recording and live broadcast coverage',
  'Contestant grooming, choreography, and backstage management',
  'VIP hospitality lounges and multi-zone crowd security',
];

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
  const [highlights, setHighlights] = useState<string[]>(
    initialEvent.highlights
  );
  const [productionScope, setProductionScope] = useState<string[]>(
    initialEvent.productionScope
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
        setHighlights(ev.highlights || []);
        setProductionScope(ev.productionScope || []);
      })
      .catch(() => { });
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
          heroStageImage: image,
          ticketUrl,
          tagline,
          summary,
          overview,
          status,
          highlights,
          productionScope,
        }),
      });
      if (res.ok) {
        setSaved(true);
        setTimeout(() => {
          router.push('/admin/events');
        }, 700);
      }
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm(`Delete "${title}" permanently from Firestore?`)) {
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
        className="space-y-7 rounded-xl border border-line bg-white p-6 sm:p-8"
      >
        {/* 1. Visual Image Uploader */}
        <ImageUploadField
          label="1. Production Poster / Cover Photo"
          value={image}
          onChange={setImage}
        />

        {/* 2. Title & Category */}
        <div className="grid grid-cols-1 gap-6 border-t border-line pt-6 sm:grid-cols-2">
          <div>
            <label className="mb-2 block text-xs font-semibold text-ink">
              Production Title *
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full rounded-lg border border-line bg-paper px-3.5 py-2.5 text-sm text-ink focus:border-forest focus:outline-none"
            />
          </div>

          <PresetInputField
            label="Category"
            value={category}
            onChange={setCategory}
            presets={CATEGORY_PRESETS}
          />
        </div>

        {/* 3. Quick Preset Fields */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <PresetInputField
            label="Season / Event Date"
            value={season}
            onChange={setSeason}
            presets={SEASON_PRESETS}
          />

          <PresetInputField
            label="Venue / Location"
            value={location}
            onChange={setLocation}
            presets={LOCATION_PRESETS}
          />

          <PresetInputField
            label="Eligibility"
            value={eligibility}
            onChange={setEligibility}
            presets={ELIGIBILITY_PRESETS}
          />

          <PresetInputField
            label="Awards / Recognition"
            value={prizePoolLabel}
            onChange={setPrizePoolLabel}
            presets={PRIZE_PRESETS}
          />
        </div>

        {/* 4. Segmented Toggles */}
        <div className="grid grid-cols-1 gap-6 border-t border-line pt-6 sm:grid-cols-2">
          <SegmentedToggle
            label="Publication Status"
            value={status}
            onChange={setStatus}
            options={[
              {
                value: 'published',
                label: 'Published (Live)',
                description: 'Visible on website',
              },
              {
                value: 'draft',
                label: 'Draft',
                description: 'Hidden from public',
              },
            ]}
          />
        </div>

        {/* 5. Editorial Copy */}
        <div className="space-y-4 border-t border-line pt-6">
          <div>
            <label className="mb-1.5 block text-xs font-semibold text-ink">
              Tagline
            </label>
            <input
              type="text"
              value={tagline}
              onChange={(e) => setTagline(e.target.value)}
              className="w-full rounded-lg border border-line bg-paper px-3.5 py-2 text-sm text-ink focus:border-forest focus:outline-none"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-semibold text-ink">
              Card Summary
            </label>
            <textarea
              rows={2}
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              className="w-full rounded-lg border border-line bg-paper px-3.5 py-2 text-sm text-ink focus:border-forest focus:outline-none"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-semibold text-ink">
              Detailed Overview
            </label>
            <textarea
              rows={4}
              value={overview}
              onChange={(e) => setOverview(e.target.value)}
              className="w-full rounded-lg border border-line bg-paper px-3.5 py-2 text-sm text-ink focus:border-forest focus:outline-none"
            />
          </div>
        </div>

        {/* 6. Interactive List Builders */}
        <div className="grid grid-cols-1 gap-6 border-t border-line pt-6 sm:grid-cols-2">
          <ListBuilderField
            label="Key Highlights"
            items={highlights}
            onChange={setHighlights}
            suggestions={HIGHLIGHT_SUGGESTIONS}
            placeholder="Add a highlight..."
          />

          <ListBuilderField
            label="Production & Technical Scope"
            items={productionScope}
            onChange={setProductionScope}
            suggestions={SCOPE_SUGGESTIONS}
            placeholder="Add a scope item..."
          />
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
