'use client';

import { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import {
  Calendar,
  Inbox,
  Newspaper,
  ArrowUpRight,
  Plus,
  RefreshCw,
  Database,
  Image as ImageIcon,
  Users,
  Settings,
} from 'lucide-react';
import type { EventDetailData } from '@/config/events-data';
import type { InquiryDocument } from '@/lib/backend/schemas';
import { cn } from '@/lib/utils';
import { useAuth } from '@/lib/firebase/auth-context';
import { formatTopicLabel } from '@/components/forms/ContactForm';

interface OverviewResponse {
  counts: {
    eventsTotal: number;
    eventsPublished: number;
    inquiriesTotal: number;
    inquiriesNew: number;
    newsTotal: number;
    teamTotal: number;
    galleryTotal: number;
  };
  recentInquiries: InquiryDocument[];
  events: EventDetailData[];
  firebaseConnected: boolean;
  projectId: string;
}

export default function AdminDashboardPage() {
  const { user } = useAuth();
  const [data, setData] = useState<OverviewResponse | null>(null);
  const [loading, setLoading] = useState(true);

  const loadOverview = useCallback(async () => {
    setLoading(true);
    try {
      const token = user ? await user.getIdToken() : undefined;
      const headers: HeadersInit = token
        ? { Authorization: `Bearer ${token}` }
        : {};
      const res = await fetch('/api/admin/overview', { headers });
      if (res.ok) {
        const json = await res.json();
        setData(json);
      }
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    let active = true;
    (async () => {
      try {
        const token = user ? await user.getIdToken() : undefined;
        const headers: HeadersInit = token
          ? { Authorization: `Bearer ${token}` }
          : {};
        const res = await fetch('/api/admin/overview', { headers });
        if (res.ok) {
          const json = await res.json();
          if (active) setData(json);
        }
      } finally {
        if (active) setLoading(false);
      }
    })();
    return () => {
      active = false;
    };
  }, [user]);

  const counts = data?.counts;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 border-b border-line pb-6 sm:flex-row sm:items-end">
        <div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-forest-soft px-2.5 py-0.5 text-[11px] font-semibold text-forest">
              <Database className="h-3 w-3" />
              {data?.projectId || 'jay-media-management'}
            </span>
            <span className="text-xs text-muted">
              {data?.firebaseConnected
                ? 'Cloud Firestore Synced'
                : 'Local Store'}
            </span>
          </div>
          <h1 className="mt-2 text-2xl font-semibold text-ink sm:text-3xl">
            Studio Control Center
          </h1>
          <p className="mt-1 text-sm text-muted">
            Manage live productions, client inquiries, and studio media archives.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            type="button"
            onClick={loadOverview}
            disabled={loading}
            className="btn btn-outline py-2 text-xs"
          >
            <RefreshCw
              className={cn('h-3.5 w-3.5', loading && 'animate-spin')}
            />
            <span>Refresh</span>
          </button>
          <Link href="/admin/events/new" className="btn btn-primary py-2 text-xs">
            <Plus className="h-4 w-4" />
            <span>New Production</span>
          </Link>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Link
          href="/admin/events"
          className="group rounded-xl border border-line bg-white p-5 transition-all hover:border-line-strong hover:shadow-xs"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-muted">
              Events &amp; Franchises
            </span>
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-forest-soft text-forest">
              <Calendar className="h-4 w-4" />
            </span>
          </div>
          <p className="mt-4 text-3xl font-semibold text-ink">
            {counts ? counts.eventsTotal : '—'}
          </p>
          <p className="mt-1 text-xs text-muted">
            {counts
              ? `${counts.eventsPublished} published productions`
              : 'Loading catalog...'}
          </p>
        </Link>

        <Link
          href="/admin/inquiries"
          className="group rounded-xl border border-line bg-white p-5 transition-all hover:border-line-strong hover:shadow-xs"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-muted">
              Client Inquiries
            </span>
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-forest-soft text-forest">
              <Inbox className="h-4 w-4" />
            </span>
          </div>
          <p className="mt-4 text-3xl font-semibold text-ink">
            {counts ? counts.inquiriesTotal : '—'}
          </p>
          <p className="mt-1 text-xs text-muted">
            {counts
              ? `${counts.inquiriesNew} unread leads awaiting follow-up`
              : 'Loading leads...'}
          </p>
        </Link>

        <Link
          href="/admin/team"
          className="group rounded-xl border border-line bg-white p-5 transition-all hover:border-line-strong hover:shadow-xs"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-muted">
              Team &amp; Leadership
            </span>
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-forest-soft text-forest">
              <Users className="h-4 w-4" />
            </span>
          </div>
          <p className="mt-4 text-3xl font-semibold text-ink">
            {counts ? counts.teamTotal : '—'}
          </p>
          <p className="mt-1 text-xs text-muted">
            {counts
              ? `${counts.teamTotal} executive & creative leaders`
              : 'Loading team...'}
          </p>
        </Link>

        <Link
          href="/admin/gallery"
          className="group rounded-xl border border-line bg-white p-5 transition-all hover:border-line-strong hover:shadow-xs"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-muted">
              Content &amp; Vault
            </span>
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-forest-soft text-forest">
              <ImageIcon className="h-4 w-4" />
            </span>
          </div>
          <p className="mt-4 text-3xl font-semibold text-ink">
            {counts ? counts.galleryTotal + counts.newsTotal : '—'}
          </p>
          <p className="mt-1 text-xs text-muted">
            {counts
              ? `${counts.galleryTotal} gallery photos • ${counts.newsTotal} press articles`
              : 'Loading media...'}
          </p>
        </Link>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* Production Roster */}
        <div className="rounded-xl border border-line bg-white p-6 lg:col-span-7">
          <div className="mb-4 flex items-center justify-between border-b border-line pb-3.5">
            <div>
              <h2 className="text-base font-semibold text-ink">
                Production Roster
              </h2>
              <p className="text-xs text-muted">
                Active productions &amp; event catalog
              </p>
            </div>
            <Link
              href="/admin/events"
              className="inline-flex items-center gap-1 text-xs font-medium text-forest hover:underline"
            >
              <span>Manage all</span>
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="divide-y divide-line">
            {(data?.events || []).map((event) => (
              <div
                key={event.slug}
                className="flex flex-col justify-between gap-3 py-3.5 first:pt-0 last:pb-0 sm:flex-row sm:items-center"
              >
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <Link
                      href={`/admin/events/${event.slug}`}
                      className="truncate text-sm font-semibold text-ink hover:text-forest"
                    >
                      {event.title}
                    </Link>
                    <span
                      className={cn(
                        'rounded-full px-2 py-0.5 text-[10px] font-medium',
                        event.status === 'draft'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-forest-soft text-forest'
                      )}
                    >
                      {event.status === 'draft' ? 'Draft' : 'Published'}
                    </span>
                  </div>
                  <p className="mt-0.5 truncate text-xs text-muted">
                    {event.seasonOrYear} • {event.location}
                  </p>
                </div>

                <div className="flex shrink-0 items-center gap-2">
                  {event.ticketUrl && (
                    <span className="rounded-lg bg-forest-soft px-2.5 py-1 text-[11px] font-medium text-forest">
                      Khalti Tickets
                    </span>
                  )}
                  <Link
                    href={`/admin/events/${event.slug}`}
                    className="rounded-lg border border-line px-2.5 py-1 text-xs font-medium text-ink transition-colors hover:bg-paper-deep"
                  >
                    Edit
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Client Inquiries Section */}
        <div className="rounded-xl border border-line bg-white p-6 lg:col-span-5">
          <div className="mb-4 flex items-center justify-between border-b border-line pb-3.5">
            <div>
              <h2 className="text-base font-semibold text-ink">
                Client Inquiries
              </h2>
              <p className="text-xs text-muted">
                Recent project &amp; sponsorship briefs
              </p>
            </div>
            <Link
              href="/admin/inquiries"
              className="inline-flex items-center gap-1 text-xs font-medium text-forest hover:underline"
            >
              <span>Open CRM</span>
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="divide-y divide-line">
            {(data?.recentInquiries || []).length === 0 ? (
              <p className="py-6 text-center text-xs text-muted">
                No client inquiries in the database yet.
              </p>
            ) : (
              (data?.recentInquiries || []).slice(0, 5).map((inq) => (
                <div
                  key={inq.id}
                  className="py-3 first:pt-0 last:pb-0"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-sm font-semibold text-ink">
                      {inq.fullName}
                    </span>
                    <span
                      className={cn(
                        'rounded-full px-2 py-0.5 text-[10px] font-medium uppercase',
                        inq.status === 'new'
                          ? 'bg-amber-100 text-amber-900'
                          : 'bg-forest-soft text-forest'
                      )}
                    >
                      {inq.status.replace('_', ' ')}
                    </span>
                  </div>
                  <p className="mt-0.5 text-xs text-muted">
                    {inq.organization || inq.email} • {formatTopicLabel(inq.serviceOfInterest)}
                  </p>
                  <p className="mt-1 line-clamp-2 text-xs text-ink-soft">
                    {inq.message}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Quick CMS Links */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Link
          href="/admin/news"
          className="flex items-center justify-between rounded-xl border border-line bg-white p-4 transition-colors hover:bg-paper-deep"
        >
          <div className="flex items-center gap-3">
            <Newspaper className="h-5 w-5 text-forest" />
            <div>
              <p className="text-sm font-semibold text-ink">News &amp; Press</p>
              <p className="text-xs text-muted">
                Publish announcements &amp; articles
              </p>
            </div>
          </div>
          <ArrowUpRight className="h-4 w-4 text-muted" />
        </Link>

        <Link
          href="/admin/settings"
          className="flex items-center justify-between rounded-xl border border-line bg-white p-4 transition-colors hover:bg-paper-deep"
        >
          <div className="flex items-center gap-3">
            <Settings className="h-5 w-5 text-forest" />
            <div>
              <p className="text-sm font-semibold text-ink">
                Concert &amp; Settings
              </p>
              <p className="text-xs text-muted">
                Eastern Echoes timer &amp; studio contact
              </p>
            </div>
          </div>
          <ArrowUpRight className="h-4 w-4 text-muted" />
        </Link>

        <Link
          href="/admin/team"
          className="flex items-center justify-between rounded-xl border border-line bg-white p-4 transition-colors hover:bg-paper-deep"
        >
          <div className="flex items-center gap-3">
            <Users className="h-5 w-5 text-forest" />
            <div>
              <p className="text-sm font-semibold text-ink">
                Team &amp; Leadership
              </p>
              <p className="text-xs text-muted">
                Manage directors &amp; specialists
              </p>
            </div>
          </div>
          <ArrowUpRight className="h-4 w-4 text-muted" />
        </Link>
      </div>
    </div>
  );
}
