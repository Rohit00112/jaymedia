'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Plus, Search, CheckCircle2, ArrowUpRight, Edit } from 'lucide-react';
import { EVENTS_DATA, type EventDetailData } from '@/config/events-data';

export default function AdminEventsPage() {
  const [events, setEvents] = useState<EventDetailData[]>(EVENTS_DATA);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState<'all' | 'published' | 'draft'>('all');

  useEffect(() => {
    let active = true;
    fetch('/api/events?all=1')
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (active && Array.isArray(data?.events)) {
          setEvents(data.events);
        }
      })
      .catch(() => {});
    return () => {
      active = false;
    };
  }, []);

  const filteredEvents = events.filter((e) => {
    const matchesSearch =
      e.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      e.category.toLowerCase().includes(searchTerm.toLowerCase());
    if (!matchesSearch) return false;
    if (filter === 'published') return e.status !== 'draft';
    if (filter === 'draft') return e.status === 'draft';
    return true;
  });

  const publishedCount = events.filter((e) => e.status !== 'draft').length;
  const draftCount = events.filter((e) => e.status === 'draft').length;

  return (
    <div className="space-y-8 font-body text-ink">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 border-b border-line pb-6 sm:flex-row sm:items-center">
        <div>
          <span className="mb-1 block font-body text-xs font-semibold uppercase tracking-wider text-coral">
            PRODUCTION CATALOG
          </span>
          <h1 className="editorial-headline font-body text-3xl text-ink sm:text-4xl">
            Events &amp; Pageants Management
          </h1>
          <p className="mt-1 font-body text-xs text-muted sm:text-sm">
            Manage all Jay Media Management productions, registrations, and
            hero showcase slate.
          </p>
        </div>

        <Link
          href="/admin/events/new"
          className="inline-flex items-center gap-2 rounded-[0.3rem] bg-accent px-5 py-3 font-body text-xs font-semibold uppercase tracking-widest text-cream shadow-md transition-all hover:scale-105 hover:bg-coral-hover"
        >
          <Plus className="h-4 w-4" />
          <span>New Event</span>
        </Link>
      </div>

      {/* Filter / Search Bar */}
      <div className="flex flex-col items-center justify-between gap-4 rounded-[0.5rem] border border-line bg-card p-4 shadow-sm sm:flex-row">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-faint" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search events by title or category..."
            className="w-full rounded-[0.3rem] border border-line-strong bg-cream py-2 pl-9 pr-4 font-body text-xs text-ink placeholder:text-faint focus:border-coral focus:outline-none focus:ring-1 focus:ring-coral"
          />
        </div>

        <div className="flex items-center gap-2 font-body text-xs">
          <button
            type="button"
            onClick={() => setFilter('all')}
            className={`rounded-[0.3rem] px-3.5 py-1.5 uppercase tracking-wider transition-all ${
              filter === 'all'
                ? 'bg-accent font-semibold text-cream'
                : 'bg-paper-deep text-muted hover:text-ink'
            }`}
          >
            All ({events.length})
          </button>
          <button
            type="button"
            onClick={() => setFilter('published')}
            className={`rounded-[0.3rem] px-3.5 py-1.5 uppercase tracking-wider transition-all ${
              filter === 'published'
                ? 'bg-accent font-semibold text-cream'
                : 'bg-paper-deep text-muted hover:text-ink'
            }`}
          >
            Published ({publishedCount})
          </button>
          <button
            type="button"
            onClick={() => setFilter('draft')}
            className={`rounded-[0.3rem] px-3.5 py-1.5 uppercase tracking-wider transition-all ${
              filter === 'draft'
                ? 'bg-accent font-semibold text-cream'
                : 'bg-paper-deep text-muted hover:text-ink'
            }`}
          >
            Drafts ({draftCount})
          </button>
        </div>
      </div>

      {/* Events Table */}
      <div className="overflow-hidden rounded-[0.5rem] border border-line bg-card shadow-sm">
        <table className="w-full text-left font-body text-xs">
          <thead className="border-b border-line bg-cream text-[10px] uppercase tracking-wider text-muted">
            <tr>
              <th className="px-6 py-4">Event Title &amp; Category</th>
              <th className="hidden px-6 py-4 sm:table-cell">Season / Year</th>
              <th className="hidden px-6 py-4 md:table-cell">Location</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {filteredEvents.map((event) => (
              <tr key={event.slug} className="transition-colors hover:bg-paper-deep">
                <td className="px-6 py-4">
                  <div className="font-body text-sm font-bold text-ink">
                    {event.title}
                  </div>
                  <div className="mt-0.5 font-body text-[11px] text-coral">
                    {event.category}
                  </div>
                </td>
                <td className="hidden px-6 py-4 text-muted sm:table-cell">
                  {event.seasonOrYear}
                </td>
                <td className="hidden px-6 py-4 text-muted md:table-cell">
                  {event.location}
                </td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center gap-1 rounded-[0.3rem] border border-forest/25 bg-forest-soft px-2.5 py-0.5 font-body text-[10px] font-medium uppercase text-ink-soft">
                    <CheckCircle2 className="h-3 w-3 text-ink-soft" />{' '}
                    {event.status === 'draft' ? 'Draft' : 'Published'}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Link
                      href={`/events/${event.slug}`}
                      target="_blank"
                      title="View Public Page"
                      className="p-1.5 text-muted transition-colors hover:text-coral"
                    >
                      <ArrowUpRight className="h-4 w-4" />
                    </Link>
                    <Link
                      href={`/admin/events/${event.slug}`}
                      title="Edit Event"
                      className="p-1.5 text-muted transition-colors hover:text-coral"
                    >
                      <Edit className="h-4 w-4" />
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
