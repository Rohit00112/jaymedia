'use client';

import Link from 'next/link';
import {
  Calendar,
  Layers,
  Newspaper,
  Inbox,
  ArrowUpRight,
  Plus,
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
    <div className="space-y-8 font-rubik">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-black/10">
        <div>
          <span className="text-xs uppercase font-display tracking-widest text-coral font-semibold block mb-1">
            CONTROL CENTER
          </span>
          <h1 className="editorial-headline text-black text-3xl sm:text-4xl">
            Studio CMS Dashboard
          </h1>
          <p className="text-xs sm:text-sm font-body text-black/60 mt-1">
            Jay Media Management Pvt. Ltd. • Near Traffic Chowk, Main Road, Biratnagar
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/admin/events/new"
            className="inline-flex items-center gap-2 px-6 py-3.5 bg-coral text-white font-display text-xs uppercase tracking-widest font-semibold hover:bg-coral-hover transition-colors shadow-sm rounded-[2px]"
          >
            <Plus className="w-4 h-4" />
            <span>Create New Event</span>
          </Link>
        </div>
      </div>

      {/* Stats Cards (Density: 4 Cards) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <Link
              key={idx}
              href={stat.href}
              className="bg-black text-white border border-white/10 p-6 shadow-sm hover:border-coral/50 transition-all flex flex-col justify-between rounded-[2px]"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs uppercase font-display tracking-widest text-[#eef9ff]/70 font-semibold">
                  {stat.label}
                </span>
                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-coral">
                  <Icon className="w-4 h-4" />
                </div>
              </div>

              <div>
                <span className="font-display text-4xl font-bold text-white block mb-1">
                  {stat.value}
                </span>
                <span className="text-xs font-body text-[#eef9ff]/60">{stat.subtext}</span>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Active Productions & Inquiries Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Flagship Productions status */}
        <div className="lg:col-span-7 bg-white border border-black/10 p-8 shadow-sm rounded-[2px]">
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-black/10">
            <h3 className="font-display text-lg font-bold text-black">
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
                className="flex items-center justify-between p-4 bg-[#e3e3e1]/40 border border-black/5 hover:border-coral/30 transition-all rounded-[2px]"
              >
                <div>
                  <h4 className="font-display font-bold text-sm text-black">{event.title}</h4>
                  <span className="text-xs text-black/60 font-body">{event.seasonOrYear} • {event.location}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="inline-flex items-center gap-1 text-[11px] uppercase font-display px-2.5 py-0.5 bg-[#01402b] text-[#eef9ff] rounded-[2px] font-medium">
                    <CheckCircle2 className="w-3 h-3 text-[#eef9ff]" /> Published
                  </span>
                  <Link
                    href={`/admin/events/${event.slug}`}
                    className="p-1.5 text-black/60 hover:text-coral transition-colors"
                  >
                    <ArrowUpRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Inquiries preview */}
        <div className="lg:col-span-5 bg-white border border-black/10 p-8 shadow-sm rounded-[2px]">
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-black/10">
            <h3 className="font-display text-lg font-bold text-black">
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
            <div className="p-4 border-l-4 border-coral bg-[#e3e3e1]/40 rounded-[2px]">
              <div className="flex justify-between items-center mb-1">
                <span className="font-display font-semibold text-black">Koshi Trade Conclave</span>
                <span className="text-[10px] text-black/50">2h ago</span>
              </div>
              <p className="text-black/70">Stage AV & Lighting quotation request for Biratnagar Arena.</p>
              <span className="text-coral font-display font-semibold block mt-2 text-[11px]">
                Status: New Submission
              </span>
            </div>

            <div className="p-4 border-l-4 border-[#01402b] bg-[#e3e3e1]/40 rounded-[2px]">
              <div className="flex justify-between items-center mb-1">
                <span className="font-display font-semibold text-black">Miss Koshi 2025 Title Sponsor</span>
                <span className="text-[10px] text-black/50">1d ago</span>
              </div>
              <p className="text-black/70">Beverage group requesting title sponsorship deck and television slots.</p>
              <span className="text-[#01402b] font-display font-semibold block mt-2 text-[11px]">
                Status: In Progress
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
