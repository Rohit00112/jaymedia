'use client';

import { useCallback, useEffect, useState } from 'react';
import {
  Mail,
  Phone,
  Building,
  Calendar,
  Trash2,
  Save,
  RefreshCw,
  Loader2,
  CheckCircle2,
} from 'lucide-react';
import {
  INQUIRY_STATUS_OPTIONS,
  type InquiryDocument,
  type InquiryStatusOption,
} from '@/lib/backend/schemas';
import { cn } from '@/lib/utils';
import { formatTopicLabel } from '@/components/forms/ContactForm';

export default function AdminInquiriesPage() {
  const [inquiries, setInquiries] = useState<InquiryDocument[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [savedToast, setSavedToast] = useState(false);
  const [notesDraft, setNotesDraft] = useState('');

  const loadInquiries = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/inquiries');
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data.inquiries)) {
          setInquiries(data.inquiries);
          if (data.inquiries.length > 0 && !selectedId) {
            setSelectedId(data.inquiries[0].id);
            setNotesDraft(data.inquiries[0].adminNotes || '');
          }
        }
      }
    } finally {
      setLoading(false);
    }
  }, [selectedId]);

  useEffect(() => {
    let active = true;
    fetch('/api/inquiries')
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (active && Array.isArray(data?.inquiries)) {
          setInquiries(data.inquiries);
          if (data.inquiries.length > 0) {
            setSelectedId((prev) => prev || data.inquiries[0].id);
            setNotesDraft((prev) => prev || data.inquiries[0].adminNotes || '');
          }
        }
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, []);

  const selectedInquiry =
    inquiries.find((i) => i.id === selectedId) || inquiries[0] || null;

  function selectInquiry(inq: InquiryDocument) {
    setSelectedId(inq.id);
    setNotesDraft(inq.adminNotes || '');
  }

  async function handleUpdateInquiry(updates: {
    status?: InquiryStatusOption;
    priority?: 'low' | 'medium' | 'high';
    adminNotes?: string;
  }) {
    if (!selectedInquiry) return;
    setSaving(true);
    try {
      const res = await fetch('/api/inquiries', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: selectedInquiry.id,
          ...updates,
        }),
      });
      if (res.ok) {
        const data = await res.json();
        if (data.inquiry) {
          setInquiries((prev) =>
            prev.map((i) => (i.id === data.inquiry.id ? data.inquiry : i))
          );
          setSavedToast(true);
          setTimeout(() => setSavedToast(false), 2000);
        }
      }
    } finally {
      setSaving(false);
    }
  }

  async function handleDeleteInquiry(id: string) {
    if (!window.confirm('Delete this inquiry permanently from Firestore?')) {
      return;
    }
    const res = await fetch(`/api/inquiries?id=${encodeURIComponent(id)}`, {
      method: 'DELETE',
    });
    if (res.ok) {
      const remaining = inquiries.filter((i) => i.id !== id);
      setInquiries(remaining);
      setSelectedId(remaining[0]?.id || null);
      setNotesDraft(remaining[0]?.adminNotes || '');
    }
  }

  const filtered =
    statusFilter === 'all'
      ? inquiries
      : inquiries.filter((i) => i.status === statusFilter);

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 border-b border-line pb-6 sm:flex-row sm:items-end">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-forest">
            Client Leads &amp; Proposals
          </span>
          <h1 className="mt-1 text-2xl font-semibold text-ink sm:text-3xl">
            Project Inquiries CRM
          </h1>
          <p className="mt-1 text-sm text-muted">
            Review incoming event production briefs, sponsorship requests, and
            internal follow-up notes.
          </p>
        </div>

        <button
          type="button"
          onClick={loadInquiries}
          disabled={loading}
          className="btn btn-outline py-2 text-xs"
        >
          <RefreshCw
            className={cn('h-3.5 w-3.5', loading && 'animate-spin')}
          />
          <span>Refresh Inbox</span>
        </button>
      </div>

      {/* Status Filter Pills */}
      <div className="flex flex-wrap gap-2">
        {(['all', ...INQUIRY_STATUS_OPTIONS] as const).map((st) => (
          <button
            key={st}
            type="button"
            onClick={() => setStatusFilter(st)}
            className={cn(
              'rounded-full px-3.5 py-1.5 text-xs font-medium capitalize transition-colors',
              statusFilter === st
                ? 'bg-forest text-white'
                : 'border border-line bg-white text-muted hover:text-ink'
            )}
          >
            {st.replace('_', ' ')}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="flex items-center justify-center gap-2 py-16 text-sm text-muted">
          <Loader2 className="h-4 w-4 animate-spin text-forest" />
          <span>Loading inquiries from Cloud Firestore...</span>
        </div>
      ) : (
        <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-12">
          {/* Left Inbox List */}
          <div className="divide-y divide-line overflow-hidden rounded-xl border border-line bg-white lg:col-span-5">
            {filtered.length === 0 ? (
              <div className="p-8 text-center text-sm text-muted">
                No inquiries in this view.
              </div>
            ) : (
              filtered.map((inq) => {
                const isSelected = selectedInquiry?.id === inq.id;
                return (
                  <button
                    key={inq.id}
                    type="button"
                    onClick={() => selectInquiry(inq)}
                    className={cn(
                      'block w-full p-4 text-left transition-colors',
                      isSelected
                        ? 'border-l-4 border-l-forest bg-forest-soft/50'
                        : 'hover:bg-paper-deep/60'
                    )}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="text-sm font-semibold text-ink">
                        {inq.fullName}
                      </h3>
                      <span className="text-[11px] text-muted">
                        {new Date(inq.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="mt-0.5 truncate text-xs text-muted">
                      {inq.organization || inq.email}
                    </p>
                    <div className="mt-2.5 flex items-center justify-between gap-2">
                      <span className="truncate text-xs font-medium text-forest">
                        {formatTopicLabel(inq.serviceOfInterest)}
                      </span>
                      <span
                        className={cn(
                          'shrink-0 rounded-full px-2 py-0.5 text-[10px] font-medium uppercase',
                          inq.status === 'new'
                            ? 'bg-amber-100 text-amber-900'
                            : inq.status === 'completed'
                              ? 'bg-forest text-white'
                              : 'bg-paper-deep text-ink-soft'
                        )}
                      >
                        {inq.status.replace('_', ' ')}
                      </span>
                    </div>
                  </button>
                );
              })
            )}
          </div>

          {/* Right Detail Panel */}
          <div className="rounded-xl border border-line bg-white p-6 lg:col-span-7">
            {selectedInquiry ? (
              <div className="space-y-6">
                <div className="flex flex-col justify-between gap-4 border-b border-line pb-4 sm:flex-row sm:items-start">
                  <div>
                    <h2 className="text-xl font-semibold text-ink">
                      {selectedInquiry.fullName}
                    </h2>
                    {selectedInquiry.organization && (
                      <p className="mt-1 flex items-center gap-1.5 text-xs text-muted">
                        <Building className="h-3.5 w-3.5 text-forest" />
                        <span>{selectedInquiry.organization}</span>
                      </p>
                    )}
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    <select
                      value={selectedInquiry.status}
                      onChange={(e) =>
                        handleUpdateInquiry({
                          status: e.target.value as InquiryStatusOption,
                        })
                      }
                      className="rounded-lg border border-line bg-paper px-3 py-1.5 text-xs font-medium capitalize text-ink focus:border-forest focus:outline-none"
                    >
                      {INQUIRY_STATUS_OPTIONS.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt.replace('_', ' ')}
                        </option>
                      ))}
                    </select>

                    <select
                      value={selectedInquiry.priority || 'medium'}
                      onChange={(e) =>
                        handleUpdateInquiry({
                          priority: e.target.value as 'low' | 'medium' | 'high',
                        })
                      }
                      className="rounded-lg border border-line bg-paper px-3 py-1.5 text-xs font-medium capitalize text-ink focus:border-forest focus:outline-none"
                    >
                      <option value="low">Low Priority</option>
                      <option value="medium">Medium Priority</option>
                      <option value="high">High Priority</option>
                    </select>

                    <button
                      type="button"
                      onClick={() => handleDeleteInquiry(selectedInquiry.id)}
                      title="Delete Inquiry"
                      className="rounded-lg border border-line p-1.5 text-muted transition-colors hover:border-danger/30 hover:bg-red-50 hover:text-danger"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                {savedToast && (
                  <div className="flex items-center gap-2 rounded-lg bg-forest-soft px-3.5 py-2 text-xs font-medium text-forest">
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    <span>Updated in Cloud Firestore.</span>
                  </div>
                )}

                {/* Contact Metadata */}
                <div className="grid grid-cols-1 gap-3 rounded-xl border border-line bg-paper p-4 text-xs sm:grid-cols-2">
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 shrink-0 text-forest" />
                    <a
                      href={`mailto:${selectedInquiry.email}`}
                      className="truncate font-medium text-ink hover:text-forest"
                    >
                      {selectedInquiry.email}
                    </a>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 shrink-0 text-forest" />
                    <a
                      href={`tel:${selectedInquiry.phone}`}
                      className="font-medium text-ink hover:text-forest"
                    >
                      {selectedInquiry.phone}
                    </a>
                  </div>
                  <div>
                    <span className="text-muted">Inquiry Topic: </span>
                    <span className="font-semibold text-ink">
                      {formatTopicLabel(selectedInquiry.serviceOfInterest)}
                    </span>
                  </div>
                  <div>
                    <span className="text-muted">Budget / Target Date: </span>
                    <span className="font-semibold text-ink">
                      {selectedInquiry.budget || selectedInquiry.eventDate
                        ? `${selectedInquiry.budget ? `Budget: ${selectedInquiry.budget}` : 'No budget set'}${
                            selectedInquiry.eventDate
                              ? ` • Date: ${selectedInquiry.eventDate}`
                              : ''
                          }`
                        : 'Not applicable (General inquiry)'}
                    </span>
                  </div>
                </div>

                {/* Client Message */}
                <div>
                  <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted">
                    Project Brief
                  </span>
                  <div className="rounded-xl border border-line bg-paper p-4 text-sm leading-relaxed text-ink-soft">
                    {selectedInquiry.message}
                  </div>
                </div>

                {/* Internal Notes */}
                <div>
                  <div className="mb-1.5 flex items-center justify-between">
                    <span className="text-xs font-semibold uppercase tracking-wider text-muted">
                      Internal Production Notes
                    </span>
                    <span className="inline-flex items-center gap-1 text-[11px] text-muted">
                      <Calendar className="h-3 w-3" />
                      Received{' '}
                      {new Date(selectedInquiry.createdAt).toLocaleString()}
                    </span>
                  </div>
                  <textarea
                    rows={3}
                    value={notesDraft}
                    onChange={(e) => setNotesDraft(e.target.value)}
                    placeholder="Record call outcomes, quotation milestones, or assigned producer..."
                    className="w-full rounded-lg border border-line bg-paper p-3 text-xs text-ink placeholder:text-faint focus:border-forest focus:outline-none"
                  />
                  <div className="mt-2.5 flex justify-end">
                    <button
                      type="button"
                      disabled={saving}
                      onClick={() =>
                        handleUpdateInquiry({ adminNotes: notesDraft })
                      }
                      className="btn btn-primary py-2 text-xs disabled:opacity-60"
                    >
                      <Save className="h-3.5 w-3.5" />
                      <span>{saving ? 'Saving...' : 'Save Notes'}</span>
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="py-12 text-center text-sm text-muted">
                Select an inquiry from the inbox to inspect details.
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
