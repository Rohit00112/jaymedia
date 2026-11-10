'use client';

import { useEffect, useState } from 'react';
import {
  CheckCircle2,
  Clock,
  FileImage,
  Loader2,
  Search,
  Star,
  UserCheck,
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
  const [updatingCode, setUpdatingCode] = useState<string | null>(null);

  async function refreshRegistrations() {
    setLoading(true);
    try {
      const res = await fetch('/api/registrations');
      const data = await res.json();
      if (res.ok && Array.isArray(data.records)) {
        setRecords(data.records);
      }
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    let active = true;
    fetch('/api/registrations')
      .then((res) => res.json())
      .then((data) => {
        if (active && Array.isArray(data.records)) {
          setRecords(data.records);
        }
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, []);

  async function updateStatus(userCode: string, status: RegistrationStatus) {
    setUpdatingCode(userCode);
    try {
      const res = await fetch('/api/registrations', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userCode, status }),
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

  const filtered = records.filter((rec) => {
    const matchesStatus =
      statusFilter === 'All' || rec.status === statusFilter;
    const query = searchTerm.toLowerCase();
    const matchesQuery =
      !query ||
      rec.userCode.toLowerCase().includes(query) ||
      rec.name.toLowerCase().includes(query) ||
      rec.address.toLowerCase().includes(query) ||
      rec.school.toLowerCase().includes(query);
    return matchesStatus && matchesQuery;
  });

  return (
    <div className="space-y-8 font-sans text-ink">
      <div className="flex flex-col justify-between gap-4 border-b border-line pb-6 sm:flex-row sm:items-end">
        <div>
          <span className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-forest">
            Contestant Governance
          </span>
          <h1 className="display mt-1 text-3xl font-bold text-ink sm:text-4xl">
            Event Registrations
          </h1>
          <p className="mt-1 text-sm text-muted">
            Verify QR receipts and approve contestant audition scheduling. Syncs
            directly with the public Status Tracker.
          </p>
        </div>

        <button
          type="button"
          onClick={refreshRegistrations}
          className="inline-flex items-center gap-2 rounded-full border border-line-strong bg-white px-4 py-2 text-xs font-bold uppercase tracking-wider text-forest hover:bg-sand/50"
        >
          Refresh Queue
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col justify-between gap-4 rounded-[12px] border border-line bg-white p-4 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by User Code, name, school, or district..."
            className="w-full rounded-[8px] border border-line bg-paper py-2.5 pl-10 pr-4 text-sm text-ink placeholder:text-faint focus:border-forest focus:outline-none"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          {(['All', ...REGISTRATION_STATUSES] as const).map((status) => (
            <button
              key={status}
              type="button"
              onClick={() => setStatusFilter(status)}
              className={cn(
                'rounded-full px-3.5 py-1.5 text-[11px] font-semibold transition-colors',
                statusFilter === status
                  ? 'bg-forest text-white'
                  : 'border border-line bg-paper text-muted hover:text-ink'
              )}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Contestant Queue */}
      {loading ? (
        <div className="flex items-center justify-center gap-2 py-20 text-sm text-muted">
          <Loader2 className="h-5 w-5 animate-spin text-forest" />
          <span>Loading contestant submissions...</span>
        </div>
      ) : filtered.length === 0 ? (
        <div className="rounded-[12px] border border-line bg-white p-12 text-center text-sm text-muted">
          No contestant registrations match the current filter.
        </div>
      ) : (
        <div className="grid gap-4">
          {filtered.map((rec) => {
            const isUpdating = updatingCode === rec.userCode;
            return (
              <div
                key={rec.userCode}
                className="flex flex-col justify-between gap-5 rounded-[12px] border border-line bg-white p-6 shadow-2xs lg:flex-row lg:items-center"
              >
                <div className="space-y-2">
                  <div className="flex flex-wrap items-center gap-2.5">
                    <span className="rounded-full bg-sand px-3 py-1 font-mono text-xs font-bold text-forest">
                      {rec.userCode}
                    </span>
                    <span
                      className={cn(
                        'inline-flex items-center gap-1 rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-wider',
                        rec.status === 'Shortlisted'
                          ? 'bg-gold/25 text-[#7A5610]'
                          : rec.status === 'Verified — Audition Scheduled'
                            ? 'bg-forest text-white'
                            : 'bg-amber-100 text-amber-900'
                      )}
                    >
                      {rec.status === 'Shortlisted' ? (
                        <Star className="h-3 w-3" />
                      ) : rec.status === 'Verified — Audition Scheduled' ? (
                        <CheckCircle2 className="h-3 w-3 text-gold" />
                      ) : (
                        <Clock className="h-3 w-3" />
                      )}
                      {rec.status}
                    </span>
                    <span className="font-mono text-[10px] uppercase tracking-wider text-faint">
                      {rec.auditionMode}
                    </span>
                  </div>

                  <h2 className="display text-xl font-bold text-ink">
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
                      <strong className="text-ink">School:</strong> {rec.school}
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
                        <span className="rounded-[4px] bg-forest-soft px-2.5 py-0.5 font-mono">
                          Tx: {rec.paymentTransactionId}
                        </span>
                      )}
                      {rec.paymentReceiptFilename && (
                        <span className="inline-flex items-center gap-1 rounded-[4px] bg-forest-soft px-2.5 py-0.5">
                          <FileImage className="h-3 w-3" />
                          Receipt: {rec.paymentReceiptFilename}
                        </span>
                      )}
                      {rec.photoFilename && (
                        <span className="inline-flex items-center gap-1 rounded-[4px] bg-forest-soft px-2.5 py-0.5">
                          <UserCheck className="h-3 w-3" />
                          Photo: {rec.photoFilename}
                        </span>
                      )}
                    </div>
                  )}
                </div>

                <div className="flex flex-wrap gap-2 border-t border-line pt-4 lg:border-t-0 lg:pt-0">
                  {REGISTRATION_STATUSES.map((targetStatus) => (
                    <button
                      key={targetStatus}
                      type="button"
                      disabled={isUpdating || rec.status === targetStatus}
                      onClick={() => updateStatus(rec.userCode, targetStatus)}
                      className={cn(
                        'rounded-full px-3.5 py-2 text-[11px] font-bold uppercase tracking-wider transition-colors disabled:opacity-50',
                        rec.status === targetStatus
                          ? 'bg-sand text-forest'
                          : 'border border-line-strong bg-white text-ink hover:border-forest hover:bg-forest hover:text-white'
                      )}
                    >
                      {targetStatus === 'Verified — Audition Scheduled'
                        ? 'Verify & Schedule'
                        : targetStatus === 'Shortlisted'
                          ? 'Shortlist'
                          : 'Mark Pending'}
                    </button>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
