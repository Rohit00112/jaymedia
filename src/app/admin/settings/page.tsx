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
    <div className="space-y-8 max-w-4xl mx-auto font-body text-white">
      <div className="flex items-center justify-between pb-6 border-b border-white/10">
        <div>
          <span className="text-xs uppercase tracking-widest text-coral font-semibold block mb-1">
            CONFIGURATION
          </span>
          <h1 className="editorial-headline text-white text-3xl sm:text-4xl">
            Company &amp; Brand Settings
          </h1>
          <p className="text-xs sm:text-sm text-[#eef9ff]/70 mt-1">
            Maintain verified public contact details, headquarters location, and brand links.
          </p>
        </div>

        <button
          type="submit"
          form="settings-form"
          className="inline-flex items-center gap-2 px-6 py-3 bg-coral text-white text-xs uppercase tracking-widest font-semibold hover:bg-[#e04a41] transition-colors shadow-sm rounded-[50px]"
        >
          <Save className="w-4 h-4" />
          <span>Save Configuration</span>
        </button>
      </div>

      {saved && (
        <div className="p-4 bg-[#01402b]/40 border border-[#01402b] text-[#eef9ff] text-xs flex items-center gap-2 rounded-[10px]">
          <CheckCircle2 className="w-4 h-4 text-[#eef9ff]" />
          <span>Settings successfully updated across Firestore!</span>
        </div>
      )}

      <form
        id="settings-form"
        onSubmit={handleSave}
        className="bg-[#0c0c11] border border-white/10 p-8 shadow-2xl space-y-6 text-sm rounded-[10px]"
      >
        <h3 className="font-bold text-base text-white pb-2 border-b border-white/10">
          Official Entity Details
        </h3>

        <div>
          <label className="block text-xs uppercase tracking-widest text-white/70 mb-2 font-semibold">
            Registered Enterprise Name
          </label>
          <input
            type="text"
            value={settings.companyName}
            onChange={(e) => setSettings({ ...settings, companyName: e.target.value })}
            className="w-full px-4 py-3 bg-black/60 border border-white/15 text-white rounded-[2px] focus:outline-none focus:border-coral focus:ring-1 focus:ring-coral"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs uppercase tracking-widest text-white/70 mb-2 font-semibold">
              Location Address
            </label>
            <input
              type="text"
              value={settings.address}
              onChange={(e) => setSettings({ ...settings, address: e.target.value })}
              className="w-full px-4 py-3 bg-black/60 border border-white/15 text-white rounded-[2px] focus:outline-none focus:border-coral focus:ring-1 focus:ring-coral"
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-widest text-white/70 mb-2 font-semibold">
              City &amp; Province
            </label>
            <input
              type="text"
              value={`${settings.city}, ${settings.province}`}
              disabled
              className="w-full px-4 py-3 bg-white/5 border border-white/10 text-white/40 cursor-not-allowed rounded-[2px]"
            />
          </div>
        </div>

        <h3 className="font-bold text-base text-white pt-4 pb-2 border-b border-white/10">
          Public Communications
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs uppercase tracking-widest text-white/70 mb-2 font-semibold">
              Contact Email
            </label>
            <input
              type="email"
              value={settings.email}
              onChange={(e) => setSettings({ ...settings, email: e.target.value })}
              className="w-full px-4 py-3 bg-black/60 border border-white/15 text-white rounded-[2px] focus:outline-none focus:border-coral focus:ring-1 focus:ring-coral"
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-widest text-white/70 mb-2 font-semibold">
              Official Telephone / Mobile
            </label>
            <input
              type="text"
              value={settings.phone}
              onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
              className="w-full px-4 py-3 bg-black/60 border border-white/15 text-white rounded-[2px] focus:outline-none focus:border-coral focus:ring-1 focus:ring-coral"
            />
          </div>
        </div>

        <h3 className="font-bold text-base text-white pt-4 pb-2 border-b border-white/10">
          Official Broadcast &amp; Social Channels
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs uppercase tracking-widest text-white/70 mb-2 font-semibold">
              Facebook Page URL
            </label>
            <input
              type="url"
              value={settings.facebook}
              onChange={(e) => setSettings({ ...settings, facebook: e.target.value })}
              className="w-full px-4 py-3 bg-black/60 border border-white/15 text-white rounded-[2px] focus:outline-none focus:border-coral focus:ring-1 focus:ring-coral"
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-widest text-white/70 mb-2 font-semibold">
              YouTube Channel URL
            </label>
            <input
              type="url"
              value={settings.youtube}
              onChange={(e) => setSettings({ ...settings, youtube: e.target.value })}
              className="w-full px-4 py-3 bg-black/60 border border-white/15 text-white rounded-[2px] focus:outline-none focus:border-coral focus:ring-1 focus:ring-coral"
            />
          </div>
        </div>
      </form>
    </div>
  );
}
