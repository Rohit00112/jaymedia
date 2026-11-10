'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Save, CheckCircle2, AlertCircle } from 'lucide-react';

export default function AdminNewEventPage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    shortLabel: '',
    category: 'Beauty Pageant & Youth Empowerment',
    season: '2026 Edition',
    location: 'Biratnagar, Koshi Province',
    eligibility: 'Open Audition',
    prizePoolLabel: 'Crowns & Cash Awards',
    codePrefix: 'JMM',
    image:
      'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=1200&q=85',
    ticketUrl: '',
    ticketPartner: '',
    tagline: '',
    summary: '',
    description: '',
    highlightsText:
      'Regional & Live Auditions\nBroadcast Stage Production by Jay Media\nMentorship & Jury Evaluation Panels\nTitle Honours & Official Press Coverage',
    scopeText:
      'Complete stage design and DMX lighting choreography\nMulticam HD/4K recording and live broadcast coverage\nContestant coordination and backstage management',
    registrationOpen: true,
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
          shortLabel: formData.shortLabel || formData.title,
          category: formData.category,
          seasonOrYear: formData.season,
          location: formData.location,
          eligibility: formData.eligibility,
          prizePoolLabel: formData.prizePoolLabel,
          codePrefix: formData.codePrefix,
          image: formData.image,
          heroStageImage: formData.image,
          ticketUrl: formData.ticketUrl || undefined,
          ticketPartner: formData.ticketPartner || undefined,
          tagline: formData.tagline,
          summary: formData.summary,
          overview: formData.description,
          highlights: formData.highlightsText
            .split('\n')
            .map((s) => s.trim())
            .filter(Boolean),
          productionScope: formData.scopeText
            .split('\n')
            .map((s) => s.trim())
            .filter(Boolean),
          status: formData.status,
          registrationOpen: formData.registrationOpen,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Could not publish production.');
      }

      setSaved(true);
      setTimeout(() => {
        router.push('/admin/events');
      }, 800);
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
          <span>{saving ? 'Saving to Firestore...' : 'Publish Production'}</span>
        </button>
      </div>

      {saved && (
        <div className="flex items-center gap-2 rounded-xl border border-forest/25 bg-forest-soft p-4 text-xs font-medium text-forest">
          <CheckCircle2 className="h-4 w-4" />
          <span>
            Production created in Cloud Firestore! Redirecting to catalog...
          </span>
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
        className="space-y-6 rounded-xl border border-line bg-white p-6 sm:p-8"
      >
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div>
            <label className="mb-1.5 block text-xs font-medium text-ink">
              Production Title *
            </label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              placeholder="e.g. Mr. & Miss Purwanchal"
              className="w-full rounded-lg border border-line bg-paper px-3.5 py-2.5 text-sm text-ink placeholder:text-faint focus:border-forest focus:outline-none"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-medium text-ink">
              Category *
            </label>
            <select
              value={formData.category}
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value })
              }
              className="w-full rounded-lg border border-line bg-paper px-3.5 py-2.5 text-sm text-ink focus:border-forest focus:outline-none"
            >
              <option value="Beauty Pageant & Youth Empowerment">
                Beauty Pageant &amp; Youth Empowerment
              </option>
              <option value="National Television Singing Reality Show">
                National Television Singing Reality Show
              </option>
              <option value="Children's Talent & Personality Showcase">
                Children&apos;s Talent &amp; Personality Showcase
              </option>
              <option value="Youth Dance Championship">
                Youth Dance Championship
              </option>
              <option value="International Live Concert">
                International Live Concert
              </option>
              <option value="Corporate & Experiential">
                Corporate &amp; Experiential
              </option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
          <div>
            <label className="mb-1.5 block text-xs font-medium text-ink">
              Season / Date Label
            </label>
            <input
              type="text"
              value={formData.season}
              onChange={(e) =>
                setFormData({ ...formData, season: e.target.value })
              }
              className="w-full rounded-lg border border-line bg-paper px-3.5 py-2.5 text-sm text-ink focus:border-forest focus:outline-none"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-medium text-ink">
              Venue / Location
            </label>
            <input
              type="text"
              value={formData.location}
              onChange={(e) =>
                setFormData({ ...formData, location: e.target.value })
              }
              className="w-full rounded-lg border border-line bg-paper px-3.5 py-2.5 text-sm text-ink focus:border-forest focus:outline-none"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-medium text-ink">
              Registration Code Prefix
            </label>
            <input
              type="text"
              maxLength={5}
              value={formData.codePrefix}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  codePrefix: e.target.value.toUpperCase(),
                })
              }
              placeholder="JMM"
              className="w-full rounded-lg border border-line bg-paper px-3.5 py-2.5 font-mono text-sm uppercase text-ink focus:border-forest focus:outline-none"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
          <div>
            <label className="mb-1.5 block text-xs font-medium text-ink">
              Eligibility
            </label>
            <input
              type="text"
              value={formData.eligibility}
              onChange={(e) =>
                setFormData({ ...formData, eligibility: e.target.value })
              }
              placeholder="e.g. Ages 16–25"
              className="w-full rounded-lg border border-line bg-paper px-3.5 py-2.5 text-sm text-ink focus:border-forest focus:outline-none"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-medium text-ink">
              Awards / Recognition Label
            </label>
            <input
              type="text"
              value={formData.prizePoolLabel}
              onChange={(e) =>
                setFormData({ ...formData, prizePoolLabel: e.target.value })
              }
              className="w-full rounded-lg border border-line bg-paper px-3.5 py-2.5 text-sm text-ink focus:border-forest focus:outline-none"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-medium text-ink">
              Publication Status
            </label>
            <select
              value={formData.status}
              onChange={(e) =>
                setFormData({ ...formData, status: e.target.value })
              }
              className="w-full rounded-lg border border-line bg-paper px-3.5 py-2.5 text-sm text-ink focus:border-forest focus:outline-none"
            >
              <option value="published">Published (Live)</option>
              <option value="draft">Draft (Hidden)</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div>
            <label className="mb-1.5 block text-xs font-medium text-ink">
              Cover / Poster Image URL
            </label>
            <input
              type="text"
              value={formData.image}
              onChange={(e) =>
                setFormData({ ...formData, image: e.target.value })
              }
              placeholder="/images/official/... or https://..."
              className="w-full rounded-lg border border-line bg-paper px-3.5 py-2.5 text-sm text-ink focus:border-forest focus:outline-none"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-medium text-ink">
              External Ticket URL (Optional, for Concerts)
            </label>
            <input
              type="text"
              value={formData.ticketUrl}
              onChange={(e) =>
                setFormData({ ...formData, ticketUrl: e.target.value })
              }
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
            value={formData.tagline}
            onChange={(e) =>
              setFormData({ ...formData, tagline: e.target.value })
            }
            placeholder="Short one-line subtitle for the event hero..."
            className="w-full rounded-lg border border-line bg-paper px-3.5 py-2.5 text-sm text-ink focus:border-forest focus:outline-none"
          />
        </div>

        <div>
          <label className="mb-1.5 block text-xs font-medium text-ink">
            Card Summary
          </label>
          <textarea
            rows={2}
            value={formData.summary}
            onChange={(e) =>
              setFormData({ ...formData, summary: e.target.value })
            }
            placeholder="2-sentence summary displayed on portfolio cards..."
            className="w-full rounded-lg border border-line bg-paper px-3.5 py-2.5 text-sm text-ink focus:border-forest focus:outline-none"
          />
        </div>

        <div>
          <label className="mb-1.5 block text-xs font-medium text-ink">
            Full Production Overview
          </label>
          <textarea
            rows={4}
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            placeholder="Detailed description of the production, stagecraft, and format..."
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
              value={formData.highlightsText}
              onChange={(e) =>
                setFormData({ ...formData, highlightsText: e.target.value })
              }
              className="w-full rounded-lg border border-line bg-paper px-3.5 py-2.5 text-xs text-ink focus:border-forest focus:outline-none"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-medium text-ink">
              Production Scope (One per line)
            </label>
            <textarea
              rows={4}
              value={formData.scopeText}
              onChange={(e) =>
                setFormData({ ...formData, scopeText: e.target.value })
              }
              className="w-full rounded-lg border border-line bg-paper px-3.5 py-2.5 text-xs text-ink focus:border-forest focus:outline-none"
            />
          </div>
        </div>
      </form>
    </div>
  );
}
