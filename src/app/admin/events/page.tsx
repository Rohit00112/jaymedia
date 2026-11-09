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
    <div className="space-y-8 font-rubik text-white">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <span className="text-xs uppercase font-rubik tracking-wider text-coral font-semibold block mb-1">
            PRODUCTION CATALOG
          </span>
          <h1 className="editorial-headline text-white text-3xl sm:text-4xl font-rubik">
            Events &amp; Pageants Management
          </h1>
          <p className="text-xs sm:text-sm font-rubik text-[#eef9ff]/60 mt-1">
            Manage flagship franchises, auditions, dates, and stagecraft metadata.
          </p>
        </div>

        <Link
          href="/admin/events/new"
          className="inline-flex items-center gap-2 px-5 py-3 bg-coral text-white font-rubik text-xs uppercase tracking-widest font-semibold hover:bg-coral-hover hover:scale-105 transition-all shadow-md rounded-[50px]"
        >
          <Plus className="w-4 h-4" />
          <span>New Event</span>
        </Link>
      </div>

      {/* Filter / Search Bar */}
      <div className="bg-[#0c0c11] border border-white/10 p-4 rounded-[10px] shadow-lg flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-[#eef9ff]/40 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search events by title or category..."
            className="w-full pl-9 pr-4 py-2 bg-black/60 border border-white/15 text-xs font-rubik text-white rounded-[2px] focus:outline-none focus:border-coral focus:ring-1 focus:ring-coral placeholder-[#eef9ff]/40"
          />
        </div>

        <div className="flex items-center gap-2 text-xs font-rubik">
          <button
            onClick={() => setFilter('all')}
            className={`px-3.5 py-1.5 uppercase tracking-wider rounded-[50px] transition-all ${
              filter === 'all' ? 'bg-coral text-white font-semibold' : 'bg-white/5 text-[#eef9ff]/70 hover:text-white'
            }`}
          >
            All ({EVENTS_DATA.length})
          </button>
          <button
            onClick={() => setFilter('published')}
            className={`px-3.5 py-1.5 uppercase tracking-wider rounded-[50px] transition-all ${
              filter === 'published' ? 'bg-coral text-white font-semibold' : 'bg-white/5 text-[#eef9ff]/70 hover:text-white'
            }`}
          >
            Published ({EVENTS_DATA.length})
          </button>
          <button
            onClick={() => setFilter('draft')}
            className={`px-3.5 py-1.5 uppercase tracking-wider rounded-[50px] transition-all ${
              filter === 'draft' ? 'bg-coral text-white font-semibold' : 'bg-white/5 text-[#eef9ff]/70 hover:text-white'
            }`}
          >
            Drafts (0)
          </button>
        </div>
      </div>

      {/* Events Table / Card list */}
      <div className="bg-[#0c0c11] border border-white/10 rounded-[10px] overflow-hidden shadow-xl">
        <table className="w-full text-left text-xs font-rubik">
          <thead className="bg-black/60 border-b border-white/10 text-[#eef9ff]/60 uppercase tracking-wider text-[10px]">
            <tr>
              <th className="py-4 px-6">Event Title &amp; Category</th>
              <th className="py-4 px-6 hidden sm:table-cell">Season / Year</th>
              <th className="py-4 px-6 hidden md:table-cell">Location</th>
              <th className="py-4 px-6">Status</th>
              <th className="py-4 px-6 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {filteredEvents.map((event) => (
              <tr key={event.slug} className="hover:bg-white/5 transition-colors">
                <td className="py-4 px-6">
                  <div className="font-rubik font-bold text-sm text-white">{event.title}</div>
                  <div className="text-[11px] text-coral font-rubik mt-0.5">{event.category}</div>
                </td>
                <td className="py-4 px-6 hidden sm:table-cell text-[#eef9ff]/70">
                  {event.seasonOrYear}
                </td>
                <td className="py-4 px-6 hidden md:table-cell text-[#eef9ff]/70">
                  {event.location}
                </td>
                <td className="py-4 px-6">
                  <span className="inline-flex items-center gap-1 text-[10px] uppercase font-rubik px-2.5 py-0.5 bg-[#01402b]/90 border border-[#01402b] text-[#eef9ff] rounded-[50px] font-medium">
                    <CheckCircle2 className="w-3 h-3 text-[#eef9ff]" /> Published
                  </span>
                </td>
                <td className="py-4 px-6 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Link
                      href={`/events/${event.slug}`}
                      target="_blank"
                      title="View Public Page"
                      className="p-1.5 text-[#eef9ff]/60 hover:text-coral transition-colors"
                    >
                      <ArrowUpRight className="w-4 h-4" />
                    </Link>
                    <Link
                      href={`/admin/events/${event.slug}`}
                      title="Edit Event"
                      className="p-1.5 text-[#eef9ff]/60 hover:text-coral transition-colors"
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

