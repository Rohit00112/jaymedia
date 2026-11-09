'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Plus, Search, CheckCircle2, ArrowUpRight, Edit } from 'lucide-react';
import { EVENTS_DATA } from '@/config/events-data';

export default function AdminEventsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState<'all' | 'published' | 'draft'>('all');

  const filteredEvents = EVENTS_DATA.filter((e) =>
    e.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    e.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-ink/10">
        <div>
          <span className="text-xs uppercase font-display tracking-widest text-coral font-semibold block mb-1">
            PRODUCTION CATALOG
          </span>
          <h1 className="editorial-headline text-ink text-3xl sm:text-4xl">
            Events &amp; Pageants Management
          </h1>
          <p className="text-xs sm:text-sm font-body text-ink/60 mt-1">
            Manage flagship franchises, auditions, dates, and stagecraft metadata.
          </p>
        </div>

        <Link
          href="/admin/events/new"
          className="inline-flex items-center gap-2 px-5 py-3 bg-coral text-white font-display text-xs uppercase tracking-widest font-semibold hover:bg-coral-hover transition-colors shadow-sm"
        >
          <Plus className="w-4 h-4" />
          <span>New Event</span>
        </Link>
      </div>

      {/* Filter / Search Bar */}
      <div className="bg-white border border-ink/10 p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-ink/40 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search events by title or category..."
            className="w-full pl-9 pr-4 py-2 bg-warm-ivory/50 border border-ink/10 text-xs font-body text-ink focus:outline-none focus:border-coral"
          />
        </div>

        <div className="flex items-center gap-2 text-xs font-display">
          <button
            onClick={() => setFilter('all')}
            className={`px-3 py-1.5 uppercase tracking-wider ${
              filter === 'all' ? 'bg-ink text-white' : 'text-ink/60 hover:text-ink'
            }`}
          >
            All ({EVENTS_DATA.length})
          </button>
          <button
            onClick={() => setFilter('published')}
            className={`px-3 py-1.5 uppercase tracking-wider ${
              filter === 'published' ? 'bg-ink text-white' : 'text-ink/60 hover:text-ink'
            }`}
          >
            Published ({EVENTS_DATA.length})
          </button>
          <button
            onClick={() => setFilter('draft')}
            className={`px-3 py-1.5 uppercase tracking-wider ${
              filter === 'draft' ? 'bg-ink text-white' : 'text-ink/60 hover:text-ink'
            }`}
          >
            Drafts (0)
          </button>
        </div>
      </div>

      {/* Events Table / Card list */}
      <div className="bg-white border border-ink/10 overflow-hidden shadow-sm">
        <table className="w-full text-left text-xs font-body">
          <thead className="bg-warm-ivory border-b border-ink/10 text-ink/60 uppercase font-display tracking-widest text-[10px]">
            <tr>
              <th className="py-4 px-6">Event Title &amp; Category</th>
              <th className="py-4 px-6 hidden sm:table-cell">Season / Year</th>
              <th className="py-4 px-6 hidden md:table-cell">Location</th>
              <th className="py-4 px-6">Status</th>
              <th className="py-4 px-6 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-ink/5">
            {filteredEvents.map((event) => (
              <tr key={event.slug} className="hover:bg-warm-ivory/30 transition-colors">
                <td className="py-4 px-6">
                  <div className="font-display font-bold text-sm text-ink">{event.title}</div>
                  <div className="text-[11px] text-coral font-display mt-0.5">{event.category}</div>
                </td>
                <td className="py-4 px-6 hidden sm:table-cell text-ink/70">
                  {event.seasonOrYear}
                </td>
                <td className="py-4 px-6 hidden md:table-cell text-ink/70">
                  {event.location}
                </td>
                <td className="py-4 px-6">
                  <span className="inline-flex items-center gap-1 text-[10px] uppercase font-display px-2 py-0.5 bg-emerald-100 text-emerald-800">
                    <CheckCircle2 className="w-3 h-3" /> Published
                  </span>
                </td>
                <td className="py-4 px-6 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Link
                      href={`/events/${event.slug}`}
                      target="_blank"
                      title="View Public Page"
                      className="p-1.5 text-ink/60 hover:text-coral transition-colors"
                    >
                      <ArrowUpRight className="w-4 h-4" />
                    </Link>
                    <Link
                      href={`/admin/events/${event.slug}`}
                      title="Edit Event"
                      className="p-1.5 text-ink/60 hover:text-coral transition-colors"
                    >
                      <Edit className="w-4 h-4" />
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

