'use client';

import { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  ShieldCheck,
  Plus,
  Edit,
  Trash2,
  X,
  Save,
  Loader2,
  ArrowUpRight,
} from 'lucide-react';
import type { TeamDocument } from '@/lib/backend/schemas';

export default function AdminTeamPage() {
  const [members, setMembers] = useState<TeamDocument[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingSlug, setEditingSlug] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState({
    name: '',
    role: '',
    category: 'Executive Leadership' as
      | 'Executive Leadership'
      | 'Mentorship'
      | 'Event Judges',
    location: 'Biratnagar, Nepal',
    image: '/images/official/team-jay.png',
    shortBio: '',
    fullBio: '',
    creditsText: '',
    order: 1,
  });

  const loadTeam = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/team');
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data.members)) {
          setMembers(data.members);
        }
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    let active = true;
    fetch('/api/team')
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (active && Array.isArray(data?.members)) {
          setMembers(data.members);
        }
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, []);

  function openNewModal() {
    setEditingSlug(null);
    setForm({
      name: '',
      role: '',
      category: 'Executive Leadership',
      location: 'Biratnagar, Nepal',
      image: '/images/official/team-jay.png',
      shortBio: '',
      fullBio: '',
      creditsText: '',
      order: members.length + 1,
    });
    setModalOpen(true);
  }

  function openEditModal(member: TeamDocument) {
    setEditingSlug(member.slug);
    setForm({
      name: member.name,
      role: member.role,
      category: member.category,
      location: member.location,
      image: member.image,
      shortBio: member.shortBio,
      fullBio: member.fullBio,
      creditsText: (member.credits || []).join('\n'),
      order: member.order || 1,
    });
    setModalOpen(true);
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    try {
      const method = editingSlug ? 'PATCH' : 'POST';
      const res = await fetch('/api/team', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...(editingSlug && { slug: editingSlug }),
          name: form.name,
          role: form.role,
          category: form.category,
          location: form.location,
          image: form.image,
          shortBio: form.shortBio,
          fullBio: form.fullBio,
          credits: form.creditsText
            .split('\n')
            .map((s) => s.trim())
            .filter(Boolean),
          order: Number(form.order) || 1,
        }),
      });
      if (res.ok) {
        setModalOpen(false);
        await loadTeam();
      }
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(slug: string, name: string) {
    if (!window.confirm(`Remove "${name}" from Team Roster in Firestore?`)) {
      return;
    }
    const res = await fetch(`/api/team?slug=${encodeURIComponent(slug)}`, {
      method: 'DELETE',
    });
    if (res.ok) {
      setMembers((prev) => prev.filter((m) => m.slug !== slug));
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 border-b border-line pb-6 sm:flex-row sm:items-end">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-forest">
            Roster Governance
          </span>
          <h1 className="mt-1 text-2xl font-semibold text-ink sm:text-3xl">
            Leadership &amp; Team
          </h1>
          <p className="mt-1 text-sm text-muted">
            Manage executive profiles, bios, and leadership credits stored in
            Cloud Firestore.
          </p>
        </div>

        <button
          type="button"
          onClick={openNewModal}
          className="btn btn-primary py-2 text-xs"
        >
          <Plus className="h-4 w-4" />
          <span>Add Profile</span>
        </button>
      </div>

      {loading ? (
        <div className="flex items-center justify-center gap-2 py-16 text-sm text-muted">
          <Loader2 className="h-4 w-4 animate-spin text-forest" />
          <span>Loading team profiles from Firestore...</span>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {members.map((member) => (
            <div
              key={member.slug}
              className="flex flex-col justify-between gap-4 rounded-xl border border-line bg-white p-6"
            >
              <div className="flex items-start gap-4">
                <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl border border-line bg-sand">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    sizes="64px"
                    className="object-cover"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <span className="inline-flex items-center gap-1 rounded-full bg-forest-soft px-2.5 py-0.5 text-[10px] font-medium text-forest">
                    <ShieldCheck className="h-3 w-3" />
                    {member.category}
                  </span>
                  <h2 className="mt-1.5 text-lg font-semibold text-ink">
                    {member.name}
                  </h2>
                  <p className="text-xs font-medium text-forest">
                    {member.role} • {member.location}
                  </p>
                  <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-muted">
                    {member.shortBio}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 border-t border-line pt-3.5">
                <Link
                  href={`/team/${member.slug}`}
                  target="_blank"
                  className="btn btn-outline py-1.5 text-xs"
                >
                  <span>Profile</span>
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </Link>
                <button
                  type="button"
                  onClick={() => openEditModal(member)}
                  className="btn btn-outline py-1.5 text-xs"
                >
                  <Edit className="h-3.5 w-3.5" />
                  <span>Edit</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(member.slug, member.name)}
                  className="rounded-lg border border-line p-1.5 text-muted transition-colors hover:border-danger/30 hover:bg-red-50 hover:text-danger"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {modalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-ink/50 p-4 backdrop-blur-xs"
        >
          <div className="max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-xl border border-line bg-white p-6 shadow-xl">
            <div className="flex items-center justify-between border-b border-line pb-4">
              <h2 className="text-lg font-semibold text-ink">
                {editingSlug ? 'Edit Profile' : 'Add Team Member'}
              </h2>
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="rounded-lg p-1.5 text-muted hover:bg-paper-deep hover:text-ink"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <form onSubmit={handleSave} className="mt-5 space-y-4 text-xs">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block font-medium text-ink">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full rounded-lg border border-line bg-paper px-3.5 py-2 text-ink focus:border-forest focus:outline-none"
                  />
                </div>
                <div>
                  <label className="mb-1 block font-medium text-ink">
                    Title / Role *
                  </label>
                  <input
                    type="text"
                    required
                    value={form.role}
                    onChange={(e) => setForm({ ...form, role: e.target.value })}
                    className="w-full rounded-lg border border-line bg-paper px-3.5 py-2 text-ink focus:border-forest focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block font-medium text-ink">
                    Portrait Image URL
                  </label>
                  <input
                    type="text"
                    value={form.image}
                    onChange={(e) =>
                      setForm({ ...form, image: e.target.value })
                    }
                    className="w-full rounded-lg border border-line bg-paper px-3.5 py-2 text-ink focus:border-forest focus:outline-none"
                  />
                </div>
                <div>
                  <label className="mb-1 block font-medium text-ink">
                    Location
                  </label>
                  <input
                    type="text"
                    value={form.location}
                    onChange={(e) =>
                      setForm({ ...form, location: e.target.value })
                    }
                    className="w-full rounded-lg border border-line bg-paper px-3.5 py-2 text-ink focus:border-forest focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="mb-1 block font-medium text-ink">
                  Short Summary Bio *
                </label>
                <textarea
                  rows={2}
                  required
                  value={form.shortBio}
                  onChange={(e) =>
                    setForm({ ...form, shortBio: e.target.value })
                  }
                  className="w-full rounded-lg border border-line bg-paper px-3.5 py-2 text-ink focus:border-forest focus:outline-none"
                />
              </div>

              <div>
                <label className="mb-1 block font-medium text-ink">
                  Full Biography
                </label>
                <textarea
                  rows={4}
                  value={form.fullBio}
                  onChange={(e) =>
                    setForm({ ...form, fullBio: e.target.value })
                  }
                  className="w-full rounded-lg border border-line bg-paper px-3.5 py-2 text-ink focus:border-forest focus:outline-none"
                />
              </div>

              <div>
                <label className="mb-1 block font-medium text-ink">
                  Key Credits (One per line)
                </label>
                <textarea
                  rows={3}
                  value={form.creditsText}
                  onChange={(e) =>
                    setForm({ ...form, creditsText: e.target.value })
                  }
                  className="w-full rounded-lg border border-line bg-paper px-3.5 py-2 text-ink focus:border-forest focus:outline-none"
                />
              </div>

              <div className="flex justify-end gap-2 border-t border-line pt-4">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="btn btn-outline py-2 text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="btn btn-primary py-2 text-xs"
                >
                  <Save className="h-3.5 w-3.5" />
                  <span>{saving ? 'Saving...' : 'Save Profile'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
