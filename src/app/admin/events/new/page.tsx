'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Save, CheckCircle2, AlertCircle } from 'lucide-react';
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
  'International Live Concert',
  'Corporate & Experiential',
] as const;

const SEASON_PRESETS = [
  '2026 Edition',
  'Season One • 2026',
  'Annual Flagship',
  '19 Dec 2026 • 6:00 PM',
] as const;

const LOCATION_PRESETS = [
  'Biratnagar, Koshi Province',
  'Itahari Stadium, Sunsari',
  'Biratnagar • Itahari • Dharan',
  'All 77 Districts of Nepal',
] as const;

const ELIGIBILITY_PRESETS = [
  'Open Audition',
  'Ages 5–15',
  'Ages 16–25',
  'Ages 4–14 (Solo & Duo)',
  'All Ages (Ticketed)',
] as const;

const PRIZE_PRESETS = [
  'Crowns & Cash Awards',
  'Rs. 2,000,000 Prize Pool',
  'Crowns & Scholarships',
  'Trophies & Cash Awards',
  'Tickets via Khalti',
] as const;

const HIGHLIGHT_SUGGESTIONS = [
  'Regional & Live Auditions across Koshi Province',
  'Full 4K Multicam Broadcast & YouTube Coverage',
  'Celebrity Jury & Professional Mentorship Camp',
  'Concert-Grade Line-Array Sound & DMX Lighting',
  'Title Crowns, Cash Awards & Media Recognition',
];

const SCOPE_SUGGESTIONS = [
  'Complete stage design and DMX lighting choreography',
  'Multicam HD/4K recording and live broadcast coverage',
  'Contestant grooming, choreography, and backstage management',
  'VIP hospitality lounges and multi-zone crowd security',
];

export default function AdminNewEventPage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<string>(CATEGORY_PRESETS[0]);
  const [season, setSeason] = useState<string>(SEASON_PRESETS[0]);
  const [location, setLocation] = useState<string>(LOCATION_PRESETS[0]);
  const [eligibility, setEligibility] = useState<string>(
    ELIGIBILITY_PRESETS[0]
  );
  const [prizePoolLabel, setPrizePoolLabel] = useState<string>(
    PRIZE_PRESETS[0]
  );
  const [image, setImage] = useState('/images/official/koshi-2024-cover.png');
  const [status, setStatus] = useState<'published' | 'draft'>('published');
  const [entryMode, setEntryMode] = useState<'open' | 'closed' | 'ticketed'>(
    'open'
  );
  const [ticketUrl, setTicketUrl] = useState('');
  const [tagline, setTagline] = useState('');
  const [summary, setSummary] = useState('');
  const [description, setDescription] = useState('');
  const [highlights, setHighlights] = useState<string[]>([
    'Regional & Live Auditions across Koshi Province',
    'Broadcast Stage Production by Jay Media',
    'Mentorship & Jury Evaluation Panels',
    'Title Honours & Official Press Coverage',
  ]);
  const [productionScope, setProductionScope] = useState<string[]>([
    'Complete stage design and DMX lighting choreography',
    'Multicam HD/4K recording and live broadcast coverage',
    'Contestant coordination and backstage management',
  ]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setErrorMsg('');

    try {
      const res = await fetch('/api/events', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          shortLabel: title,
          category,
          seasonOrYear: season,
          location,
          eligibility,
          prizePoolLabel,
          image,
          heroStageImage: image,
          ticketUrl: entryMode === 'ticketed' ? ticketUrl : undefined,
          ticketPartner: entryMode === 'ticketed' ? 'Khalti by IME' : undefined,
          tagline:
            tagline || `${title} — Produced by Jay Media Management Pvt. Ltd.`,
          summary:
            summary ||
            `${title} organized by Jay Media Management Pvt. Ltd. across Koshi Province and Nepal.`,
          overview:
            description ||
            summary ||
            `${title} brings full broadcast production, live stage direction, and regional audition coordination from Jay Media Management's Biratnagar studio.`,
          highlights,
          productionScope,
          status,
          registrationOpen: entryMode === 'open',
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Could not publish production.');
      }

      setSaved(true);
      setTimeout(() => {
        router.push('/admin/events');
      }, 700);
    } catch (err: unknown) {
      setErrorMsg(
        err instanceof Error ? err.message : 'Unable to save new event.'
      );
    } finally {
      setSaving(false);
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
            Create New Production
          </h1>
        </div>

        <button
          type="submit"
          form="event-form"
          disabled={saving}
          className="btn btn-primary py-2.5 text-xs disabled:opacity-60"
        >
          <Save className="h-4 w-4" />
          <span>{saving ? 'Saving...' : 'Publish Production'}</span>
        </button>
      </div>

      {saved && (
        <div className="flex items-center gap-2 rounded-xl border border-forest/25 bg-forest-soft p-4 text-xs font-medium text-forest">
          <CheckCircle2 className="h-4 w-4" />
          <span>Production saved to Cloud Firestore! Redirecting...</span>
        </div>
      )}

      {errorMsg && (
        <div className="flex items-center gap-2 rounded-xl border border-danger/30 bg-red-50 p-4 text-xs font-medium text-danger">
          <AlertCircle className="h-4 w-4" />
          <span>{errorMsg}</span>
        </div>
      )}

      <form
        id="event-form"
        onSubmit={handleSave}
        className="space-y-7 rounded-xl border border-line bg-white p-6 sm:p-8"
      >
        {/* 1. Poster / Cover Photo */}
        <ImageUploadField
          label="1. Production Poster / Cover Photo"
          value={image}
          onChange={setImage}
        />

        {/* 2. Core Identity */}
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
              placeholder="e.g. Mr. & Miss Purwanchal"
              className="w-full rounded-lg border border-line bg-paper px-3.5 py-2.5 text-sm text-ink placeholder:text-faint focus:border-forest focus:outline-none"
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
            label="Participant Eligibility"
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

        {/* 4. Visual Toggles */}
        <div className="grid grid-cols-1 gap-6 border-t border-line pt-6 sm:grid-cols-2">
          <SegmentedToggle
            label="Visibility Status"
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
                label: 'Save as Draft',
                description: 'Hidden until ready',
              },
            ]}
          />

          <SegmentedToggle
            label="Registration / Entry Mode"
            value={entryMode === 'ticketed' ? 'closed' : entryMode}
            onChange={(val) => setEntryMode(val)}
            options={[
              {
                value: 'open',
                label: 'Auditions Open',
                description: 'Accepts online forms',
              },
              {
                value: 'closed',
                label: 'Auditions Closed',
                description: 'Showcase / Ticketed',
              },
            ]}
          />
        </div>

        {/* 5. Descriptions */}
        <div className="space-y-4 border-t border-line pt-6">
          <div>
            <label className="mb-1.5 block text-xs font-semibold text-ink">
              Short Tagline
            </label>
            <input
              type="text"
              value={tagline}
              onChange={(e) => setTagline(e.target.value)}
              placeholder="One-line subtitle shown under the event title..."
              className="w-full rounded-lg border border-line bg-paper px-3.5 py-2 text-sm text-ink placeholder:text-faint focus:border-forest focus:outline-none"
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
              placeholder="Brief 1–2 sentence summary shown on event cards..."
              className="w-full rounded-lg border border-line bg-paper px-3.5 py-2 text-sm text-ink placeholder:text-faint focus:border-forest focus:outline-none"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-semibold text-ink">
              Detailed Overview
            </label>
            <textarea
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Full background on the production, format, and finale..."
              className="w-full rounded-lg border border-line bg-paper px-3.5 py-2 text-sm text-ink placeholder:text-faint focus:border-forest focus:outline-none"
            />
          </div>
        </div>

        {/* 6. Interactive List Builders */}
        <div className="grid grid-cols-1 gap-6 border-t border-line pt-6 sm:grid-cols-2">
          <ListBuilderField
            label="Key Highlights"
            hint="Click a suggestion or add your own bullet points"
            items={highlights}
            onChange={setHighlights}
            suggestions={HIGHLIGHT_SUGGESTIONS}
            placeholder="Add a highlight..."
          />

          <ListBuilderField
            label="Technical & Production Scope"
            hint="Stage, lighting, sound, and broadcast deliverables"
            items={productionScope}
            onChange={setProductionScope}
            suggestions={SCOPE_SUGGESTIONS}
            placeholder="Add a production scope item..."
          />
        </div>

        {entryMode === 'closed' && (
          <div className="border-t border-line pt-5">
            <label className="mb-1.5 block text-xs font-semibold text-ink">
              External Ticket Link (Optional — e.g. Khalti Events)
            </label>
            <input
              type="url"
              value={ticketUrl}
              onChange={(e) => setTicketUrl(e.target.value)}
              placeholder="https://events.khalti.com/..."
              className="w-full rounded-lg border border-line bg-paper px-3.5 py-2 text-sm text-ink placeholder:text-faint focus:border-forest focus:outline-none"
            />
          </div>
        )}
      </form>
    </div>
  );
}
