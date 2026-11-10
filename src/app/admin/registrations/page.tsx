'use client';

import { useCallback, useEffect, useState } from 'react';
import {
  CheckCircle2,
  Clock,
  Download,
  FileImage,
  Loader2,
  RefreshCw,
  Search,
  Star,
  Trash2,
  UserCheck,
  XCircle,
} from 'lucide-react';
import {
  REGISTRATION_STATUSES,
  type RegistrationRecord,
  type RegistrationStatus,
} from '@/lib/validations/registration';
import { cn } from '@/lib/utils';

export default function AdminRegistrationsPage() {
  const [records, setRecords] = useState<RegistrationRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [eventFilter, setEventFilter] = useState<string>('all');
  const [updatingCode, setUpdatingCode] = useState<string | null>(null);
  const [notesDraft, setNotesDraft] = useState<Record<string, string>>({});

  const refreshRegistrations = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/registrations');
      const data = await res.json();
      if (res.ok && Array.isArray(data.records)) {
        setRecords(data.records);
        const map: Record<string, string> = {};
        for (const r of data.records) {
          map[r.userCode] = r.adminNotes || '';
        }
        setNotesDraft(map);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    let active = true;
    fetch('/api/registrations')
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (active && Array.isArray(data?.records)) {
          setRecords(data.records);
          const map: Record<string, string> = {};
          for (const r of data.records) {
            map[r.userCode] = r.adminNotes || '';
          }
          setNotesDraft(map);
        }
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, []);

  async function updateRegistration(
    userCode: string,
    payload: { status?: RegistrationStatus; adminNotes?: string }
  ) {
    setUpdatingCode(userCode);
    try {
      const res = await fetch('/api/registrations', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userCode, ...payload }),
      });
      const data = await res.json();
      if (res.ok && data.record) {
        setRecords((prev) =>
          prev.map((item) => (item.userCode === userCode ? data.record : item))
        );
      }
    } finally {
      setUpdatingCode(null);
    }
  }

  async function handleDelete(userCode: string, name: string) {
    if (
      !window.confirm(
        `Delete registration ${userCode} (${name}) from Firestore?`
      )
    ) {
      return;
    }
    setUpdatingCode(userCode);
    try {
      const res = await fetch(
        `/api/registrations?code=${encodeURIComponent(userCode)}`,
        { method: 'DELETE' }
      );
      if (res.ok) {
        setRecords((prev) => prev.filter((r) => r.userCode !== userCode));
      }
    } finally {
      setUpdatingCode(null);
    }
  }

  function exportCsv() {
    const headers = [
      'Code',
      'Event',
      'Name',
      'Age',
      'Gender',
      'Phone',
      'Guardian',
      'Address',
      'School',
      'Mode',
      'Transaction ID',
      'Status',
      'Submitted At',
    ];
    const rows = filtered.map((r) => [
      r.userCode,
      r.eventTitle,
      r.name,
      String(r.age),
      r.gender,
      r.phone,
      r.parentName,
      r.address,
      r.school,
      r.auditionMode,
      r.paymentTransactionId || '',
      r.status,
      r.submittedAt,
    ]);
    const csvContent = [headers, ...rows]
      .map((row) =>
        row.map((val) => `"${String(val).replace(/"/g, '""')}"`).join(',')
      )
      .join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `jaymedia-registrations-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  const uniqueEvents = Array.from(
    new Map(records.map((r) => [r.eventSlug, r.eventTitle])).entries()
  );

  const filtered = records.filter((rec) => {
    const matchesStatus =
      statusFilter === 'All' || rec.status === statusFilter;
    const matchesEvent =
      eventFilter === 'all' || rec.eventSlug === eventFilter;
    const query = searchTerm.toLowerCase();
    const matchesQuery =
      !query ||
      rec.userCode.toLowerCase().includes(query) ||
      rec.name.toLowerCase().includes(query) ||
      rec.phone.toLowerCase().includes(query) ||
      rec.address.toLowerCase().includes(query) ||
      rec.school.toLowerCase().includes(query);
    return matchesStatus && matchesEvent && matchesQuery;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 border-b border-line pb-6 sm:flex-row sm:items-end">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-forest">
            Contestant Governance
          </span>
          <h1 className="mt-1 text-2xl font-semibold text-ink sm:text-3xl">
            Audition Registrations
          </h1>
          <p className="mt-1 text-sm text-muted">
            Verify payment receipts, shortlist contestants, and manage audition
            slots in Cloud Firestore.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            type="button"
            onClick={exportCsv}
            disabled={filtered.length === 0}
            className="btn btn-outline py-2 text-xs disabled:opacity-50"
          >
            <Download className="h-3.5 w-3.5" />
            <span>Export CSV</span>
          </button>
          <button
            type="button"
            onClick={refreshRegistrations}
            disabled={loading}
            className="btn btn-primary py-2 text-xs"
          >
            <RefreshCw
              className={cn('h-3.5 w-3.5', loading && 'animate-spin')}
            />
            <span>Refresh Queue</span>
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="space-y-3 rounded-xl border border-line bg-white p-4">
        <div className="flex flex-col gap-3 sm:flex-row">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by code, contestant name, phone, school, or district..."
              className="w-full rounded-lg border border-line bg-paper py-2 pl-9 pr-4 text-sm text-ink placeholder:text-faint focus:border-forest focus:outline-none"
            />
          </div>

          <select
            value={eventFilter}
            onChange={(e) => setEventFilter(e.target.value)}
            className="rounded-lg border border-line bg-paper px-3.5 py-2 text-xs font-medium text-ink focus:border-forest focus:outline-none"
          >
            <option value="all">All Productions ({records.length})</option>
            {uniqueEvents.map(([slug, title]) => (
              <option key={slug} value={slug}>
                {title}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-wrap gap-2">
          {(['All', ...REGISTRATION_STATUSES] as const).map((status) => (
            <button
              key={status}
              type="button"
              onClick={() => setStatusFilter(status)}
              className={cn(
                'rounded-full px-3 py-1 text-xs font-medium transition-colors',
                statusFilter === status
                  ? 'bg-forest text-white'
                  : 'bg-paper-deep text-muted hover:text-ink'
              )}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Contestant Queue */}
      {loading ? (
        <div className="flex items-center justify-center gap-2 py-16 text-sm text-muted">
          <Loader2 className="h-4 w-4 animate-spin text-forest" />
          <span>Loading contestant registrations from Firestore...</span>
        </div>
      ) : filtered.length === 0 ? (
        <div className="rounded-xl border border-line bg-white p-12 text-center text-sm text-muted">
          No contestant registrations match the current filter.
        </div>
      ) : (
        <div className="grid gap-4">
          {filtered.map((rec) => {
            const isUpdating = updatingCode === rec.userCode;
            return (
              <div
                key={rec.userCode}
                className="rounded-xl border border-line bg-white p-5 transition-colors hover:border-line-strong"
              >
                <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-start">
                  <div className="space-y-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="rounded-md bg-forest-soft px-2.5 py-1 font-mono text-xs font-bold text-forest">
                        {rec.userCode}
                      </span>
                      <span className="rounded-md bg-paper-deep px-2.5 py-1 text-xs font-medium text-ink">
                        {rec.eventTitle}
                      </span>
                      <span
                        className={cn(
                          'inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[11px] font-medium',
                          rec.status === 'Shortlisted'
                            ? 'bg-emerald-100 text-emerald-900'
                            : rec.status === 'Verified — Audition Scheduled'
                              ? 'bg-forest text-white'
                              : rec.status === 'Rejected'
                                ? 'bg-red-100 text-danger'
                                : 'bg-amber-100 text-amber-900'
                        )}
                      >
                        {rec.status === 'Shortlisted' ? (
                          <Star className="h-3 w-3" />
                        ) : rec.status === 'Verified — Audition Scheduled' ? (
                          <CheckCircle2 className="h-3 w-3" />
                        ) : rec.status === 'Rejected' ? (
                          <XCircle className="h-3 w-3" />
                        ) : (
                          <Clock className="h-3 w-3" />
                        )}
                        {rec.status}
                      </span>
                      <span className="text-xs text-muted">
                        • {rec.auditionMode}
                      </span>
                    </div>

                    <h2 className="text-lg font-semibold text-ink">
                      {rec.name}{' '}
                      <span className="text-sm font-normal text-muted">
                        ({rec.age} yrs • {rec.gender})
                      </span>
                    </h2>

                    <div className="flex flex-wrap gap-x-5 gap-y-1 text-xs text-muted">
                      <span>
                        <strong className="text-ink">Location:</strong>{' '}
                        {rec.address}
                      </span>
                      <span>
                        <strong className="text-ink">School:</strong>{' '}
                        {rec.school}
                      </span>
                      <span>
                        <strong className="text-ink">Guardian:</strong>{' '}
                        {rec.parentName} ({rec.phone})
                      </span>
                    </div>

                    {(rec.paymentTransactionId ||
                      rec.paymentReceiptFilename ||
                      rec.photoFilename) && (
                      <div className="flex flex-wrap gap-2 pt-1 text-[11px] text-forest">
                        {rec.paymentTransactionId && (
                          <span className="rounded-md bg-forest-soft px-2.5 py-0.5 font-mono">
                            Tx: {rec.paymentTransactionId}
                          </span>
                        )}
                        {rec.paymentReceiptFilename && (
                          <span className="inline-flex items-center gap-1 rounded-md bg-forest-soft px-2.5 py-0.5">
                            <FileImage className="h-3 w-3" />
                            Receipt: {rec.paymentReceiptFilename}
                          </span>
                        )}
                        {rec.photoFilename && (
                          <span className="inline-flex items-center gap-1 rounded-md bg-forest-soft px-2.5 py-0.5">
                            <UserCheck className="h-3 w-3" />
                            Photo: {rec.photoFilename}
                          </span>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Status Actions */}
                  <div className="flex flex-wrap items-center gap-2">
                    {REGISTRATION_STATUSES.map((targetStatus) => (
                      <button
                        key={targetStatus}
                        type="button"
                        disabled={isUpdating || rec.status === targetStatus}
                        onClick={() =>
                          updateRegistration(rec.userCode, {
                            status: targetStatus,
                          })
                        }
                        className={cn(
                          'rounded-lg px-3 py-1.5 text-xs font-medium transition-colors disabled:opacity-50',
                          rec.status === targetStatus
                            ? 'bg-forest text-white'
                            : 'border border-line bg-paper text-ink hover:border-forest hover:text-forest'
                        )}
                      >
                        {targetStatus === 'Verified — Audition Scheduled'
                          ? 'Verify & Schedule'
                          : targetStatus === 'Shortlisted'
                            ? 'Shortlist'
                            : targetStatus === 'Rejected'
                              ? 'Reject'
                              : 'Mark Pending'}
                      </button>
                    ))}
                    <button
                      type="button"
                      disabled={isUpdating}
                      onClick={() => handleDelete(rec.userCode, rec.name)}
                      title="Delete Registration"
                      className="rounded-lg border border-line p-1.5 text-muted transition-colors hover:border-danger/40 hover:bg-red-50 hover:text-danger"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                {/* Admin Notes Row */}
                <div className="mt-4 flex flex-col gap-2 border-t border-line pt-3 sm:flex-row sm:items-center">
                  <input
                    type="text"
                    value={notesDraft[rec.userCode] ?? ''}
                    onChange={(e) =>
                      setNotesDraft((prev) => ({
                        ...prev,
                        [rec.userCode]: e.target.value,
                      }))
                    }
                    placeholder="Add audition slot or verification note..."
                    className="flex-1 rounded-lg border border-line bg-paper px-3 py-1.5 text-xs text-ink placeholder:text-faint focus:border-forest focus:outline-none"
                  />
                  <button
                    type="button"
                    disabled={isUpdating}
                    onClick={() =>
                      updateRegistration(rec.userCode, {
                        adminNotes: notesDraft[rec.userCode] || '',
                      })
                    }
                    className="rounded-lg border border-line bg-white px-3 py-1.5 text-xs font-medium text-forest transition-colors hover:bg-forest-soft"
                  >
                    Save Note
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
