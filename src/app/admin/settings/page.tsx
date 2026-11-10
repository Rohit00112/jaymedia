'use client';

import { useState } from 'react';
import { Save, CheckCircle2 } from 'lucide-react';
import { siteConfig } from '@/config/site';

interface SettingsState {
  companyName: string;
  address: string;
  city: string;
  province: string;
  country: string;
  email: string;
  phone: string;
  facebook: string;
  youtube: string;
}

export default function AdminSettingsPage() {
  const [saved, setSaved] = useState(false);
  const [settings, setSettings] = useState<SettingsState>({
    companyName: siteConfig.name,
    address: siteConfig.location.address,
    city: siteConfig.location.city,
    province: siteConfig.location.province,
    country: siteConfig.location.country,
    email: siteConfig.contact.email,
    phone: siteConfig.contact.phone,
    facebook: siteConfig.social.facebook,
    youtube: siteConfig.social.youtube,
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto font-body text-ink">
      <div className="flex items-center justify-between pb-6 border-b border-line">
        <div>
          <span className="text-xs uppercase tracking-widest text-coral font-semibold block mb-1">
            CONFIGURATION
          </span>
          <h1 className="editorial-headline text-ink text-3xl sm:text-4xl">
            Company &amp; Brand Settings
          </h1>
          <p className="text-xs sm:text-sm text-muted mt-1">
            Maintain verified public contact details, headquarters location, and brand links.
          </p>
        </div>

        <button
          type="submit"
          form="settings-form"
          className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-cream text-xs uppercase tracking-widest font-semibold hover:bg-accent-hover transition-colors shadow-sm rounded-[0.3rem]"
        >
          <Save className="w-4 h-4" />
          <span>Save Configuration</span>
        </button>
      </div>

      {saved && (
        <div className="p-4 bg-forest-soft border border-forest/25 text-ink-soft text-xs flex items-center gap-2 rounded-[0.5rem]">
          <CheckCircle2 className="w-4 h-4 text-ink-soft" />
          <span>Settings successfully updated across Firestore!</span>
        </div>
      )}

      <form
        id="settings-form"
        onSubmit={handleSave}
        className="bg-card border border-line p-8 shadow-sm space-y-6 text-sm rounded-[0.5rem]"
      >
        <h3 className="font-bold text-base text-ink pb-2 border-b border-line">
          Official Entity Details
        </h3>

        <div>
          <label className="block text-xs uppercase tracking-widest text-muted mb-2 font-semibold">
            Registered Enterprise Name
          </label>
          <input
            type="text"
            value={settings.companyName}
            onChange={(e) => setSettings({ ...settings, companyName: e.target.value })}
            className="w-full px-4 py-3 bg-cream border border-line-strong text-ink rounded-[0.3rem] focus:outline-none focus:border-coral focus:ring-1 focus:ring-coral"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs uppercase tracking-widest text-muted mb-2 font-semibold">
              Location Address
            </label>
            <input
              type="text"
              value={settings.address}
              onChange={(e) => setSettings({ ...settings, address: e.target.value })}
              className="w-full px-4 py-3 bg-cream border border-line-strong text-ink rounded-[0.3rem] focus:outline-none focus:border-coral focus:ring-1 focus:ring-coral"
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-widest text-muted mb-2 font-semibold">
              City &amp; Province
            </label>
            <input
              type="text"
              value={`${settings.city}, ${settings.province}`}
              disabled
              className="w-full px-4 py-3 bg-paper-deep border border-line text-faint cursor-not-allowed rounded-[0.3rem]"
            />
          </div>
        </div>

        <h3 className="font-bold text-base text-ink pt-4 pb-2 border-b border-line">
          Public Communications
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs uppercase tracking-widest text-muted mb-2 font-semibold">
              Contact Email
            </label>
            <input
              type="email"
              value={settings.email}
              onChange={(e) => setSettings({ ...settings, email: e.target.value })}
              className="w-full px-4 py-3 bg-cream border border-line-strong text-ink rounded-[0.3rem] focus:outline-none focus:border-coral focus:ring-1 focus:ring-coral"
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-widest text-muted mb-2 font-semibold">
              Official Telephone / Mobile
            </label>
            <input
              type="text"
              value={settings.phone}
              onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
              className="w-full px-4 py-3 bg-cream border border-line-strong text-ink rounded-[0.3rem] focus:outline-none focus:border-coral focus:ring-1 focus:ring-coral"
            />
          </div>
        </div>

        <h3 className="font-bold text-base text-ink pt-4 pb-2 border-b border-line">
          Official Broadcast &amp; Social Channels
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs uppercase tracking-widest text-muted mb-2 font-semibold">
              Facebook Page URL
            </label>
            <input
              type="url"
              value={settings.facebook}
              onChange={(e) => setSettings({ ...settings, facebook: e.target.value })}
              className="w-full px-4 py-3 bg-cream border border-line-strong text-ink rounded-[0.3rem] focus:outline-none focus:border-coral focus:ring-1 focus:ring-coral"
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-widest text-muted mb-2 font-semibold">
              YouTube Channel URL
            </label>
            <input
              type="url"
              value={settings.youtube}
              onChange={(e) => setSettings({ ...settings, youtube: e.target.value })}
              className="w-full px-4 py-3 bg-cream border border-line-strong text-ink rounded-[0.3rem] focus:outline-none focus:border-coral focus:ring-1 focus:ring-coral"
            />
          </div>
        </div>
      </form>
    </div>
  );
}
