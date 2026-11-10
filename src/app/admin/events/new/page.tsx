'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Save, Upload, CheckCircle2, AlertCircle } from 'lucide-react';

export default function AdminNewEventPage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    category: 'Beauty Pageant & Youth Empowerment',
    season: '2025 Edition',
    location: 'Biratnagar, Koshi Province',
    eligibility: 'Open Audition',
    prizePoolLabel: 'Crowns & Cash Awards',
    tagline: '',
    summary: '',
    description: '',
    status: 'published',
  });

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setErrorMsg('');

    try {
      const res = await fetch('/api/events', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: formData.title,
          category: formData.category,
          seasonOrYear: formData.season,
          location: formData.location,
          eligibility: formData.eligibility,
          prizePoolLabel: formData.prizePoolLabel,
          tagline: formData.tagline,
          summary: formData.summary,
          overview: formData.description,
          status: formData.status,
          registrationOpen: true,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Could not publish production.');
      }

      setSaved(true);
      setTimeout(() => {
        router.push('/admin/events');
      }, 900);
    } catch (err: unknown) {
      setErrorMsg(
        err instanceof Error ? err.message : 'Unable to save new event.'
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="mx-auto max-w-4xl space-y-8 font-body text-ink">
      {/* Top Bar */}
      <div className="flex items-center justify-between border-b border-line pb-6">
        <div>
          <Link
            href="/admin/events"
            className="mb-2 inline-flex items-center gap-2 font-body text-xs uppercase tracking-wider text-muted transition-colors hover:text-ink"
          >
            <ArrowLeft className="h-4 w-4" /> Back to Events Catalog
          </Link>
          <h1 className="editorial-headline font-body text-3xl text-ink">
            Create New Production
          </h1>
        </div>

        <button
          type="submit"
          form="event-form"
          disabled={saving}
          className="inline-flex items-center gap-2 rounded-[0.3rem] bg-accent px-6 py-3 font-body text-xs font-semibold uppercase tracking-widest text-cream shadow-md transition-all hover:scale-105 hover:bg-coral-hover disabled:opacity-60"
        >
          <Save className="h-4 w-4" />
          <span>{saving ? 'Publishing...' : 'Publish Event'}</span>
        </button>
      </div>

      {saved && (
        <div className="flex items-center gap-2 rounded-[0.5rem] border border-forest/25 bg-forest-soft p-4 font-body text-xs text-ink-soft shadow-sm">
          <CheckCircle2 className="h-4 w-4 text-coral" />
          <span>
            Event successfully created and added to the live Jay Media slate!
            Redirecting...
          </span>
        </div>
      )}

      {errorMsg && (
        <div className="flex items-center gap-2 rounded-[0.5rem] border border-danger/30 bg-red-50 p-4 font-body text-xs text-danger">
          <AlertCircle className="h-4 w-4" />
          <span>{errorMsg}</span>
        </div>
      )}

      <form
        id="event-form"
        onSubmit={handleSave}
        className="space-y-6 rounded-[0.5rem] border border-line bg-card p-8 font-body text-sm shadow-sm"
      >
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <label className="mb-2 block font-body text-xs font-medium uppercase tracking-wider text-muted">
              Event Title *
            </label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              placeholder="e.g. Mr. & Miss Purwanchal"
              className="w-full rounded-[0.3rem] border border-line-strong bg-cream px-4 py-3 font-body text-ink placeholder:text-faint focus:border-coral focus:outline-none focus:ring-1 focus:ring-coral"
            />
          </div>

          <div>
            <label className="mb-2 block font-body text-xs font-medium uppercase tracking-wider text-muted">
              Category *
            </label>
            <select
              value={formData.category}
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value })
              }
              className="w-full rounded-[0.3rem] border border-line-strong bg-cream px-4 py-3 font-body text-ink focus:border-coral focus:outline-none focus:ring-1 focus:ring-coral"
            >
              <option value="Beauty Pageant & Youth Empowerment" className="bg-card">
                Beauty Pageant &amp; Youth Empowerment
              </option>
              <option value="National Television Singing Reality Show" className="bg-card">
                National Television Singing Reality Show
              </option>
              <option value="Children's Talent & Personality Showcase" className="bg-card">
                Children&apos;s Talent &amp; Personality Showcase
              </option>
              <option value="Youth Dance Championship" className="bg-card">
                Youth Dance Championship
              </option>
              <option value="Corporate & Experiential" className="bg-card">
                Corporate &amp; Experiential
              </option>
              <option value="Musical Arena Concert" className="bg-card">
                Musical Arena Concert
              </option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <label className="mb-2 block font-body text-xs font-medium uppercase tracking-wider text-muted">
              Season / Year
            </label>
            <input
              type="text"
              value={formData.season}
              onChange={(e) =>
                setFormData({ ...formData, season: e.target.value })
              }
              className="w-full rounded-[0.3rem] border border-line-strong bg-cream px-4 py-3 font-body text-ink focus:border-coral focus:outline-none focus:ring-1 focus:ring-coral"
            />
          </div>

          <div>
            <label className="mb-2 block font-body text-xs font-medium uppercase tracking-wider text-muted">
              Location Hub
            </label>
            <input
              type="text"
              value={formData.location}
              onChange={(e) =>
                setFormData({ ...formData, location: e.target.value })
              }
              className="w-full rounded-[0.3rem] border border-line-strong bg-cream px-4 py-3 font-body text-ink focus:border-coral focus:outline-none focus:ring-1 focus:ring-coral"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <label className="mb-2 block font-body text-xs font-medium uppercase tracking-wider text-muted">
              Eligibility
            </label>
            <input
              type="text"
              value={formData.eligibility}
              onChange={(e) =>
                setFormData({ ...formData, eligibility: e.target.value })
              }
              placeholder="e.g. Ages 16–25"
              className="w-full rounded-[0.3rem] border border-line-strong bg-cream px-4 py-3 font-body text-ink placeholder:text-faint focus:border-coral focus:outline-none focus:ring-1 focus:ring-coral"
            />
          </div>

          <div>
            <label className="mb-2 block font-body text-xs font-medium uppercase tracking-wider text-muted">
              Awards / Pool Label
            </label>
            <input
              type="text"
              value={formData.prizePoolLabel}
              onChange={(e) =>
                setFormData({ ...formData, prizePoolLabel: e.target.value })
              }
              placeholder="e.g. Crowns & Cash Awards"
              className="w-full rounded-[0.3rem] border border-line-strong bg-cream px-4 py-3 font-body text-ink placeholder:text-faint focus:border-coral focus:outline-none focus:ring-1 focus:ring-coral"
            />
          </div>
        </div>

        <div>
          <label className="mb-2 block font-body text-xs font-medium uppercase tracking-wider text-muted">
            Tagline / Punchline
          </label>
          <input
            type="text"
            value={formData.tagline}
            onChange={(e) =>
              setFormData({ ...formData, tagline: e.target.value })
            }
            placeholder="e.g. Empowering the next generation of provincial leaders."
            className="w-full rounded-[0.3rem] border border-line-strong bg-cream px-4 py-3 font-body text-ink placeholder:text-faint focus:border-coral focus:outline-none focus:ring-1 focus:ring-coral"
          />
        </div>

        <div>
          <label className="mb-2 block font-body text-xs font-medium uppercase tracking-wider text-muted">
            Short Summary
          </label>
          <textarea
            rows={3}
            value={formData.summary}
            onChange={(e) =>
              setFormData({ ...formData, summary: e.target.value })
            }
            placeholder="Brief editorial summary shown on cards..."
            className="w-full rounded-[0.3rem] border border-line-strong bg-cream px-4 py-3 font-body text-ink placeholder:text-faint focus:border-coral focus:outline-none focus:ring-1 focus:ring-coral"
          />
        </div>

        <div>
          <label className="mb-2 block font-body text-xs font-medium uppercase tracking-wider text-muted">
            Detailed Overview &amp; Production Background
          </label>
          <textarea
            rows={5}
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            placeholder="Comprehensive description of stagecraft, judges, contestants, and schedule..."
            className="w-full rounded-[0.3rem] border border-line-strong bg-cream px-4 py-3 font-body text-ink placeholder:text-faint focus:border-coral focus:outline-none focus:ring-1 focus:ring-coral"
          />
        </div>

        <div className="rounded-[0.5rem] border-2 border-dashed border-line-strong bg-paper-deep p-6 text-center">
          <Upload className="mx-auto mb-2 h-8 w-8 text-coral" />
          <span className="block font-body text-xs font-semibold uppercase tracking-wider text-ink-soft/80">
            Upload Key Stage Visual or Poster
          </span>
          <span className="mt-1 block font-body text-[11px] text-faint">
            Accepts WebP, JPG, PNG up to 10MB (wire Firebase Storage /events/)
          </span>
        </div>
      </form>
    </div>
  );
}
