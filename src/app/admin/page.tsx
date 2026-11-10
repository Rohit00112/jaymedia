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
      label: 'Flagship events',
      value: EVENTS_DATA.length.toString(),
      subtext: 'Miss Koshi & Little Koshi',
      icon: Calendar,
      href: '/admin/events',
    },
    {
      label: 'Production services',
      value: SERVICES_DATA.length.toString(),
      subtext: 'Active stage & media scopes',
      icon: Layers,
      href: '/admin/services',
    },
    {
      label: 'News releases',
      value: NEWS_DATA.length.toString(),
      subtext: 'Published announcements',
      icon: Newspaper,
      href: '/admin/news',
    },
    {
      label: 'New inquiries',
      value: '3',
      subtext: 'Pending production review',
      icon: Inbox,
      href: '/admin/inquiries',
    },
  ];

  return (
    <div className="space-y-8 font-sans">
      <div className="flex flex-col justify-between gap-5 border-b border-line pb-6 sm:flex-row sm:items-end">
        <div>
          <span className="eyebrow flex items-center gap-2.5 text-accent">
            <span className="h-px w-6 bg-accent" aria-hidden="true" />
            Control center
          </span>
          <h1 className="display mt-4 text-3xl text-ink sm:text-4xl">
            Studio dashboard
          </h1>
          <p className="mt-2 text-xs text-muted sm:text-sm">
            Jay Media Management Pvt. Ltd. · Near Traffic Chowk, Main Road,
            Biratnagar
          </p>
        </div>

        <Link href="/admin/events/new" className="btn btn-primary self-start sm:self-auto">
          <Plus className="h-4 w-4" />
          Create new event
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Link
              key={stat.label}
              href={stat.href}
              className="group flex flex-col justify-between rounded-[0.5rem] border border-line bg-card p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-line-strong hover:shadow-sm"
            >
              <div className="mb-6 flex items-start justify-between gap-3">
                <span className="eyebrow text-[8px] text-muted">
                  {stat.label}
                </span>
                <span className="flex h-8 w-8 items-center justify-center rounded-[0.3rem] bg-accent-soft text-accent">
                  <Icon className="h-4 w-4" />
                </span>
              </div>

              <div>
                <span className="display block text-4xl text-ink">
                  {stat.value}
                </span>
                <span className="mt-1 block text-xs text-muted">
                  {stat.subtext}
                </span>
              </div>
            </Link>
          );
        })}
      </div>

      <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-12">
        <div className="rounded-[0.5rem] border border-line bg-card p-6 lg:col-span-7">
          <div className="mb-5 flex items-center justify-between border-b border-line pb-4">
            <h2 className="display text-lg text-ink">Current production roster</h2>
            <Link
              href="/admin/events"
              className="inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-[0.1em] text-accent transition-colors hover:text-ink"
            >
              Manage all
              <ArrowUpRight className="h-3 w-3" />
            </Link>
          </div>

          <div className="space-y-3">
            {EVENTS_DATA.map((event) => (
              <div
                key={event.slug}
                className="flex items-center justify-between gap-4 rounded-[0.3rem] border border-line px-4 py-3 transition-colors hover:bg-paper"
              >
                <div className="min-w-0">
                  <h3 className="truncate text-sm font-semibold text-ink">
                    {event.title}
                  </h3>
                  <span className="mt-0.5 block truncate text-[11px] text-muted">
                    {event.seasonOrYear} • {event.location}
                  </span>
                </div>
                <div className="flex shrink-0 items-center gap-3">
                  <span className="hidden items-center gap-1 rounded-[0.2rem] bg-forest-soft px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.08em] text-forest sm:inline-flex">
                    <CheckCircle2 className="h-3 w-3" />
                    Published
                  </span>
                  <Link
                    href={`/admin/events/${event.slug}`}
                    aria-label={`Edit ${event.title}`}
                    className="rounded p-1.5 text-faint transition-colors hover:text-accent"
                  >
                    <ArrowUpRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[0.5rem] border border-line bg-card p-6 lg:col-span-5">
          <div className="mb-5 flex items-center justify-between border-b border-line pb-4">
            <h2 className="display text-lg text-ink">Recent inquiries</h2>
            <Link
              href="/admin/inquiries"
              className="inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-[0.1em] text-accent transition-colors hover:text-ink"
            >
              View queue
              <ArrowUpRight className="h-3 w-3" />
            </Link>
          </div>

          <div className="space-y-3 text-xs">
            <div className="rounded-[0.3rem] border border-line border-l-2 border-l-accent bg-paper p-4">
              <div className="mb-1 flex items-center justify-between gap-3">
                <span className="font-semibold text-ink">Koshi Trade Conclave</span>
                <span className="text-[10px] text-faint">2h ago</span>
              </div>
              <p className="text-muted">
                Stage AV &amp; lighting quotation request for Biratnagar Arena.
              </p>
              <span className="mt-2 block text-[10px] font-semibold uppercase tracking-[0.08em] text-accent">
                Status: new submission
              </span>
            </div>

            <div className="rounded-[0.3rem] border border-line border-l-2 border-l-forest bg-paper p-4">
              <div className="mb-1 flex items-center justify-between gap-3">
                <span className="font-semibold text-ink">
                  Miss Koshi 2025 title sponsor
                </span>
                <span className="text-[10px] text-faint">1d ago</span>
              </div>
              <p className="text-muted">
                Beverage group requesting title sponsorship deck and television
                slots.
              </p>
              <span className="mt-2 block text-[10px] font-semibold uppercase tracking-[0.08em] text-forest">
                Status: in progress
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
