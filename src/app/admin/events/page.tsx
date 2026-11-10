'use client';

import { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import {
  Plus,
  Search,
  CheckCircle2,
  ArrowUpRight,
  Edit,
  Trash2,
  Loader2,
  RefreshCw,
} from 'lucide-react';
import { EVENTS_DATA, type EventDetailData } from '@/config/events-data';
import { cn } from '@/lib/utils';

export default function AdminEventsPage() {
  const [events, setEvents] = useState<EventDetailData[]>(EVENTS_DATA);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState<'all' | 'published' | 'draft'>('all');
  const [busySlug, setBusySlug] = useState<string | null>(null);

  const loadEvents = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/events?all=1');
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data?.events)) {
          setEvents(data.events);
        }
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    let active = true;
    fetch('/api/events?all=1')
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (active && Array.isArray(data?.events)) {
          setEvents(data.events);
        }
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, []);

  async function toggleStatus(event: EventDetailData) {
    setBusySlug(event.slug);
    const nextStatus = event.status === 'draft' ? 'published' : 'draft';
    try {
      const res = await fetch('/api/events', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slug: event.slug, status: nextStatus }),
      });
      if (res.ok) {
        const data = await res.json();
        if (data.event) {
          setEvents((prev) =>
            prev.map((e) => (e.slug === event.slug ? data.event : e))
          );
        }
      }
    } finally {
      setBusySlug(null);
    }
  }

  async function handleDelete(event: EventDetailData) {
    if (
      !window.confirm(
        `Delete "${event.title}" from the production catalog? This action removes it from Firestore.`
      )
    ) {
      return;
    }
    setBusySlug(event.slug);
    try {
      const res = await fetch(
        `/api/events?slug=${encodeURIComponent(event.slug)}`,
        { method: 'DELETE' }
      );
      if (res.ok) {
        setEvents((prev) => prev.filter((e) => e.slug !== event.slug));
      }
    } finally {
      setBusySlug(null);
    }
  }

  const filteredEvents = events.filter((e) => {
    const matchesSearch =
      e.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      e.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      e.location.toLowerCase().includes(searchTerm.toLowerCase());
    if (!matchesSearch) return false;
    if (filter === 'published') return e.status !== 'draft';
    if (filter === 'draft') return e.status === 'draft';
    return true;
  });

  const publishedCount = events.filter((e) => e.status !== 'draft').length;
  const draftCount = events.filter((e) => e.status === 'draft').length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 border-b border-line pb-6 sm:flex-row sm:items-end">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-forest">
            Production Catalog
          </span>
          <h1 className="mt-1 text-2xl font-semibold text-ink sm:text-3xl">
            Events &amp; Pageants
          </h1>
          <p className="mt-1 text-sm text-muted">
            Create, edit, publish, or remove live concerts, pageants, and talent
            franchises in Cloud Firestore.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={loadEvents}
            disabled={loading}
            className="btn btn-outline py-2 text-xs"
          >
            <RefreshCw
              className={cn('h-3.5 w-3.5', loading && 'animate-spin')}
            />
            <span>Sync</span>
          </button>
          <Link href="/admin/events/new" className="btn btn-primary py-2 text-xs">
            <Plus className="h-4 w-4" />
            <span>New Production</span>
          </Link>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col justify-between gap-4 rounded-xl border border-line bg-white p-4 sm:flex-row sm:items-center">
        <div className="relative flex-1 sm:max-w-sm">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by title, category, or city..."
            className="w-full rounded-lg border border-line bg-paper py-2 pl-9 pr-4 text-sm text-ink placeholder:text-faint focus:border-forest focus:outline-none"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2 text-xs">
          <button
            type="button"
            onClick={() => setFilter('all')}
            className={cn(
              'rounded-full px-3.5 py-1.5 font-medium transition-colors',
              filter === 'all'
                ? 'bg-forest text-white'
                : 'bg-paper-deep text-muted hover:text-ink'
            )}
          >
            All ({events.length})
          </button>
          <button
            type="button"
            onClick={() => setFilter('published')}
            className={cn(
              'rounded-full px-3.5 py-1.5 font-medium transition-colors',
              filter === 'published'
                ? 'bg-forest text-white'
                : 'bg-paper-deep text-muted hover:text-ink'
            )}
          >
            Published ({publishedCount})
          </button>
          <button
            type="button"
            onClick={() => setFilter('draft')}
            className={cn(
              'rounded-full px-3.5 py-1.5 font-medium transition-colors',
              filter === 'draft'
                ? 'bg-forest text-white'
                : 'bg-paper-deep text-muted hover:text-ink'
            )}
          >
            Drafts ({draftCount})
          </button>
        </div>
      </div>

      {/* Events Table */}
      <div className="overflow-hidden rounded-xl border border-line bg-white">
        {loading ? (
          <div className="flex items-center justify-center gap-2 py-16 text-sm text-muted">
            <Loader2 className="h-4 w-4 animate-spin text-forest" />
            <span>Loading productions from Firestore...</span>
          </div>
        ) : filteredEvents.length === 0 ? (
          <div className="p-12 text-center text-sm text-muted">
            No productions match your filter.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-line bg-paper-deep/60 text-[11px] font-semibold uppercase tracking-wider text-muted">
                <tr>
                  <th className="px-5 py-3.5">Production &amp; Category</th>
                  <th className="hidden px-5 py-3.5 sm:table-cell">
                    Season / Date
                  </th>
                  <th className="hidden px-5 py-3.5 md:table-cell">Venue</th>
                  <th className="px-5 py-3.5">Ticketing / Format</th>
                  <th className="px-5 py-3.5">Status</th>
                  <th className="px-5 py-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {filteredEvents.map((event) => {
                  const isBusy = busySlug === event.slug;
                  return (
                    <tr
                      key={event.slug}
                      className="transition-colors hover:bg-paper-deep/40"
                    >
                      <td className="px-5 py-4">
                        <div className="text-sm font-semibold text-ink">
                          {event.title}
                        </div>
                        <div className="mt-0.5 text-xs text-forest">
                          {event.category}
                        </div>
                      </td>
                      <td className="hidden px-5 py-4 text-muted sm:table-cell">
                        {event.seasonOrYear}
                      </td>
                      <td className="hidden px-5 py-4 text-muted md:table-cell">
                        {event.location}
                      </td>
                      <td className="px-5 py-4">
                        {event.ticketUrl ? (
                          <span className="inline-flex items-center rounded-full bg-forest-soft px-2.5 py-0.5 text-[11px] font-medium text-forest">
                            Ticketing ({event.ticketPartner || 'Khalti'})
                          </span>
                        ) : (
                          <span className="inline-flex items-center rounded-full bg-paper-deep px-2.5 py-0.5 text-[11px] font-medium text-muted">
                            Flagship Production
                          </span>
                        )}
                      </td>
                      <td className="px-5 py-4">
                        <button
                          type="button"
                          disabled={isBusy}
                          onClick={() => toggleStatus(event)}
                          className={cn(
                            'inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[11px] font-medium transition-colors',
                            event.status === 'draft'
                              ? 'bg-amber-100 text-amber-800 hover:bg-amber-200'
                              : 'bg-forest-soft text-forest hover:bg-forest hover:text-white'
                          )}
                        >
                          <CheckCircle2 className="h-3 w-3" />
                          {event.status === 'draft' ? 'Draft' : 'Published'}
                        </button>
                      </td>
                      <td className="px-5 py-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <Link
                            href={`/events/${event.slug}`}
                            target="_blank"
                            title="View Public Page"
                            className="rounded-lg p-1.5 text-muted transition-colors hover:bg-paper-deep hover:text-ink"
                          >
                            <ArrowUpRight className="h-4 w-4" />
                          </Link>
                          <Link
                            href={`/admin/events/${event.slug}`}
                            title="Edit Production"
                            className="rounded-lg p-1.5 text-muted transition-colors hover:bg-paper-deep hover:text-forest"
                          >
                            <Edit className="h-4 w-4" />
                          </Link>
                          <button
                            type="button"
                            disabled={isBusy}
                            onClick={() => handleDelete(event)}
                            title="Delete Production"
                            className="rounded-lg p-1.5 text-muted transition-colors hover:bg-red-50 hover:text-danger"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
