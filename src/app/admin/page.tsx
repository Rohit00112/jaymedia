'use client';

import Link from 'next/link';
import {
  Calendar,
  Layers,
  Newspaper,
  Inbox,
  ArrowUpRight,
  Plus,
  Clock,
  Sparkles,
  CheckCircle2,
} from 'lucide-react';
import { EVENTS_DATA } from '@/config/events-data';
import { SERVICES_DATA } from '@/config/services-data';
import { NEWS_DATA } from '@/config/news-data';

export default function AdminDashboardPage() {
  const stats = [
    {
      label: 'Flagship Events',
      value: EVENTS_DATA.length.toString(),
      subtext: 'Miss Koshi & Little Koshi',
      icon: Calendar,
      href: '/admin/events',
    },
    {
      label: 'Production Services',
      value: SERVICES_DATA.length.toString(),
      subtext: 'Active stage & media scopes',
      icon: Layers,
      href: '/admin/services',
    },
    {
      label: 'News Releases',
      value: NEWS_DATA.length.toString(),
      subtext: 'Published announcements',
      icon: Newspaper,
      href: '/admin/news',
    },
    {
      label: 'New Inquiries',
      value: '3',
      subtext: 'Pending production review',
      icon: Inbox,
      href: '/admin/inquiries',
    },
  ];

  return (
    <div className="space-y-10">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-ink/10">
        <div>
          <span className="text-xs uppercase font-display tracking-widest text-coral font-semibold block mb-1">
            CONTROL CENTER
          </span>
          <h1 className="editorial-headline text-ink text-3xl sm:text-4xl">
            Studio CMS Dashboard
          </h1>
          <p className="text-xs sm:text-sm font-body text-ink/60 mt-1">
            Jay Media Management Pvt. Ltd. • Near Traffic Chowk, Main Road, Biratnagar
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/admin/events/new"
            className="inline-flex items-center gap-2 px-5 py-3 bg-coral text-white font-display text-xs uppercase tracking-widest font-semibold hover:bg-coral-hover transition-colors shadow-sm"
          >
            <Plus className="w-4 h-4" />
            <span>Create New Event</span>
          </Link>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <Link
              key={idx}
              href={stat.href}
              className="bg-white border border-ink/10 p-6 shadow-sm hover:shadow-md hover:border-coral/40 transition-all flex flex-col justify-between"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs uppercase font-display tracking-widest text-ink/50 font-semibold">
                  {stat.label}
                </span>
                <div className="w-8 h-8 rounded-full bg-warm-ivory flex items-center justify-center text-coral">
                  <Icon className="w-4 h-4" />
                </div>
              </div>

              <div>
                <span className="font-display text-4xl font-bold text-ink block mb-1">
                  {stat.value}
                </span>
                <span className="text-xs font-body text-ink/60">{stat.subtext}</span>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Active Productions & Quick Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Flagship Productions status */}
        <div className="lg:col-span-7 bg-white border border-ink/10 p-8 shadow-sm">
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-ink/10">
            <h3 className="font-display text-lg font-bold text-ink">
              Current Production Roster
            </h3>
            <Link
              href="/admin/events"
              className="text-xs uppercase font-display tracking-widest text-coral font-semibold hover:underline"
            >
              Manage All &rarr;
            </Link>
          </div>

          <div className="space-y-4">
            {EVENTS_DATA.map((event) => (
              <div
                key={event.slug}
                className="flex items-center justify-between p-4 bg-warm-ivory/50 border border-ink/5 hover:border-coral/30 transition-all"
              >
                <div>
                  <h4 className="font-display font-bold text-sm text-ink">{event.title}</h4>
                  <span className="text-xs text-ink/60 font-body">{event.seasonOrYear} • {event.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1 text-[10px] uppercase font-display px-2 py-0.5 bg-emerald-100 text-emerald-800">
                    <CheckCircle2 className="w-3 h-3" /> Published
                  </span>
                  <Link
                    href={`/admin/events/${event.slug}`}
                    className="p-1.5 text-ink/60 hover:text-coral transition-colors"
                  >
                    <ArrowUpRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Inquiries preview */}
        <div className="lg:col-span-5 bg-white border border-ink/10 p-8 shadow-sm">
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-ink/10">
            <h3 className="font-display text-lg font-bold text-ink">
              Recent Client Inquiries
            </h3>
            <Link
              href="/admin/inquiries"
              className="text-xs uppercase font-display tracking-widest text-coral font-semibold hover:underline"
            >
              View Queue &rarr;
            </Link>
          </div>

          <div className="space-y-4 text-xs font-body">
            <div className="p-4 border-l-2 border-coral bg-warm-ivory/50">
              <div className="flex justify-between items-center mb-1">
                <span className="font-display font-semibold text-ink">Koshi Trade Conclave</span>
                <span className="text-[10px] text-ink/50">2h ago</span>
              </div>
              <p className="text-ink/70">Stage AV & Lighting quotation request for Biratnagar Arena.</p>
              <span className="text-coral font-display font-medium block mt-2">Status: New Submission</span>
            </div>

            <div className="p-4 border-l-2 border-blue-500 bg-warm-ivory/50">
              <div className="flex justify-between items-center mb-1">
                <span className="font-display font-semibold text-ink">Miss Koshi 2025 Title Sponsor</span>
                <span className="text-[10px] text-ink/50">1d ago</span>
              </div>
              <p className="text-ink/70">Beverage group requesting title sponsorship deck and television slots.</p>
              <span className="text-blue-700 font-display font-medium block mt-2">Status: In Progress</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
