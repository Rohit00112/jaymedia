'use client';

import { useEffect, useState } from 'react';
import { Save, CheckCircle2, Loader2 } from 'lucide-react';
import { siteConfig } from '@/config/site';
import type { SettingsDocument } from '@/lib/backend/schemas';

export default function AdminSettingsPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [settings, setSettings] = useState<SettingsDocument>({
    companyName: siteConfig.name,
    shortName: siteConfig.shortName,
    tagline: siteConfig.tagline,
    description: siteConfig.description,
    address: siteConfig.location.address,
    city: siteConfig.location.city,
    province: siteConfig.location.province,
    country: siteConfig.location.country,
    email: siteConfig.contact.email,
    phone: siteConfig.contact.phone,
    secondaryPhone: siteConfig.contact.secondaryPhone,
    officeHours: 'Sun – Fri: 10:00 AM – 6:00 PM NPT',
    facebook: siteConfig.social.facebook,
    instagram: siteConfig.social.instagram,
    youtube: siteConfig.social.youtube,
    concertName: 'Eastern Echoes',
    concertDateIso: '2026-12-19T18:00:00+05:45',
    concertVenue: 'Itahari Stadium (Rangasala), Sunsari',
    concertTicketUrl: 'https://events.khalti.com/events/ET26BJD3F93W',
  });

  useEffect(() => {
    let active = true;
    fetch('/api/settings')
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (active && data?.settings) {
          setSettings(data.settings);
        }
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch('/api/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings),
      });
      if (res.ok) {
        const data = await res.json();
        if (data.settings) setSettings(data.settings);
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
      }
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center gap-2 py-20 text-sm text-muted">
        <Loader2 className="h-4 w-4 animate-spin text-forest" />
        <span>Loading configuration from Firestore...</span>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div className="flex flex-col justify-between gap-4 border-b border-line pb-6 sm:flex-row sm:items-end">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-forest">
            Global Configuration
          </span>
          <h1 className="mt-1 text-2xl font-semibold text-ink sm:text-3xl">
            Company &amp; Concert Settings
          </h1>
          <p className="mt-1 text-sm text-muted">
            Manage verified company contact details, social links, and Eastern
            Echoes concert configuration in Cloud Firestore (`settings/site`).
          </p>
        </div>

        <button
          type="submit"
          form="settings-form"
          disabled={saving}
          className="btn btn-primary py-2.5 text-xs disabled:opacity-60"
        >
          <Save className="h-4 w-4" />
          <span>{saving ? 'Saving...' : 'Save Configuration'}</span>
        </button>
      </div>

      {saved && (
        <div className="flex items-center gap-2 rounded-xl border border-forest/25 bg-forest-soft p-4 text-xs font-medium text-forest">
          <CheckCircle2 className="h-4 w-4" />
          <span>Configuration saved to Cloud Firestore (`settings/site`)!</span>
        </div>
      )}

      <form
        id="settings-form"
        onSubmit={handleSave}
        className="space-y-6 rounded-xl border border-line bg-white p-6 sm:p-8"
      >
        <h2 className="border-b border-line pb-2.5 text-base font-semibold text-ink">
          1. Official Enterprise Identity
        </h2>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div>
            <label className="mb-1.5 block text-xs font-medium text-ink">
              Registered Company Name
            </label>
            <input
              type="text"
              value={settings.companyName}
              onChange={(e) =>
                setSettings({ ...settings, companyName: e.target.value })
              }
              className="w-full rounded-lg border border-line bg-paper px-3.5 py-2.5 text-sm text-ink focus:border-forest focus:outline-none"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-medium text-ink">
              Headquarters Address
            </label>
            <input
              type="text"
              value={settings.address}
              onChange={(e) =>
                setSettings({ ...settings, address: e.target.value })
              }
              className="w-full rounded-lg border border-line bg-paper px-3.5 py-2.5 text-sm text-ink focus:border-forest focus:outline-none"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
          <div>
            <label className="mb-1.5 block text-xs font-medium text-ink">
              City
            </label>
            <input
              type="text"
              value={settings.city}
              onChange={(e) =>
                setSettings({ ...settings, city: e.target.value })
              }
              className="w-full rounded-lg border border-line bg-paper px-3.5 py-2.5 text-sm text-ink focus:border-forest focus:outline-none"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-medium text-ink">
              Province
            </label>
            <input
              type="text"
              value={settings.province}
              onChange={(e) =>
                setSettings({ ...settings, province: e.target.value })
              }
              className="w-full rounded-lg border border-line bg-paper px-3.5 py-2.5 text-sm text-ink focus:border-forest focus:outline-none"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-medium text-ink">
              Office Hours
            </label>
            <input
              type="text"
              value={settings.officeHours}
              onChange={(e) =>
                setSettings({ ...settings, officeHours: e.target.value })
              }
              className="w-full rounded-lg border border-line bg-paper px-3.5 py-2.5 text-sm text-ink focus:border-forest focus:outline-none"
            />
          </div>
        </div>

        <h2 className="border-b border-line pt-2 pb-2.5 text-base font-semibold text-ink">
          2. Public Contact &amp; Social Channels
        </h2>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div>
            <label className="mb-1.5 block text-xs font-medium text-ink">
              Official Email
            </label>
            <input
              type="email"
              value={settings.email}
              onChange={(e) =>
                setSettings({ ...settings, email: e.target.value })
              }
              className="w-full rounded-lg border border-line bg-paper px-3.5 py-2.5 text-sm text-ink focus:border-forest focus:outline-none"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-medium text-ink">
              Primary Phone / WhatsApp
            </label>
            <input
              type="text"
              value={settings.phone}
              onChange={(e) =>
                setSettings({ ...settings, phone: e.target.value })
              }
              className="w-full rounded-lg border border-line bg-paper px-3.5 py-2.5 text-sm text-ink focus:border-forest focus:outline-none"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
          <div>
            <label className="mb-1.5 block text-xs font-medium text-ink">
              Facebook URL
            </label>
            <input
              type="url"
              value={settings.facebook}
              onChange={(e) =>
                setSettings({ ...settings, facebook: e.target.value })
              }
              className="w-full rounded-lg border border-line bg-paper px-3.5 py-2.5 text-sm text-ink focus:border-forest focus:outline-none"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-medium text-ink">
              Instagram URL
            </label>
            <input
              type="url"
              value={settings.instagram}
              onChange={(e) =>
                setSettings({ ...settings, instagram: e.target.value })
              }
              className="w-full rounded-lg border border-line bg-paper px-3.5 py-2.5 text-sm text-ink focus:border-forest focus:outline-none"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-medium text-ink">
              YouTube URL
            </label>
            <input
              type="url"
              value={settings.youtube}
              onChange={(e) =>
                setSettings({ ...settings, youtube: e.target.value })
              }
              className="w-full rounded-lg border border-line bg-paper px-3.5 py-2.5 text-sm text-ink focus:border-forest focus:outline-none"
            />
          </div>
        </div>

        <h2 className="border-b border-line pt-2 pb-2.5 text-base font-semibold text-ink">
          3. Headline Concert Spotlight (Eastern Echoes)
        </h2>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div>
            <label className="mb-1.5 block text-xs font-medium text-ink">
              Concert Title
            </label>
            <input
              type="text"
              value={settings.concertName}
              onChange={(e) =>
                setSettings({ ...settings, concertName: e.target.value })
              }
              className="w-full rounded-lg border border-line bg-paper px-3.5 py-2.5 text-sm text-ink focus:border-forest focus:outline-none"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-medium text-ink">
              Concert Countdown Target ISO Date
            </label>
            <input
              type="text"
              value={settings.concertDateIso}
              onChange={(e) =>
                setSettings({ ...settings, concertDateIso: e.target.value })
              }
              className="w-full rounded-lg border border-line bg-paper px-3.5 py-2.5 font-mono text-sm text-ink focus:border-forest focus:outline-none"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-medium text-ink">
              Concert Stadium Venue
            </label>
            <input
              type="text"
              value={settings.concertVenue}
              onChange={(e) =>
                setSettings({ ...settings, concertVenue: e.target.value })
              }
              className="w-full rounded-lg border border-line bg-paper px-3.5 py-2.5 text-sm text-ink focus:border-forest focus:outline-none"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-medium text-ink">
              Official Khalti Ticket URL
            </label>
            <input
              type="url"
              value={settings.concertTicketUrl}
              onChange={(e) =>
                setSettings({ ...settings, concertTicketUrl: e.target.value })
              }
              className="w-full rounded-lg border border-line bg-paper px-3.5 py-2.5 text-sm text-ink focus:border-forest focus:outline-none"
            />
          </div>
        </div>
      </form>
    </div>
  );
}
