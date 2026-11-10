'use client';

import { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import {
  CheckCircle2,
  Plus,
  Edit,
  Trash2,
  X,
  Save,
  Loader2,
  ArrowUpRight,
} from 'lucide-react';
import type { ServiceDocument } from '@/lib/backend/schemas';

export default function AdminServicesPage() {
  const [services, setServices] = useState<ServiceDocument[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingSlug, setEditingSlug] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState({
    number: '01',
    title: '',
    category: 'Flagship Stagecraft',
    shortDescription: '',
    description: '',
    image:
      'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1200&q=80',
    capabilitiesText: '',
    deliverablesText: '',
  });

  const loadServices = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/services?all=1');
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data.services)) {
          setServices(data.services);
        }
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    let active = true;
    fetch('/api/services?all=1')
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (active && Array.isArray(data?.services)) {
          setServices(data.services);
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
      number: String(services.length + 1).padStart(2, '0'),
      title: '',
      category: 'Flagship Stagecraft',
      shortDescription: '',
      description: '',
      image:
        'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1200&q=80',
      capabilitiesText:
        'Monumental Stage Architecture & Rigging\nIntelligent DMX Lighting & Atmospheric FX\nLine-Array Sound Engineering',
      deliverablesText:
        'Full Technical Run-Sheet & Schedule\nCAD Stage Layout\nPost-Event Debrief Report',
    });
    setModalOpen(true);
  }

  function openEditModal(service: ServiceDocument) {
    setEditingSlug(service.slug);
    setForm({
      number: service.number,
      title: service.title,
      category: service.category,
      shortDescription: service.shortDescription,
      description: service.description,
      image: service.image,
      capabilitiesText: (service.capabilities || []).join('\n'),
      deliverablesText: (service.deliverables || []).join('\n'),
    });
    setModalOpen(true);
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    try {
      const method = editingSlug ? 'PATCH' : 'POST';
      const res = await fetch('/api/services', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...(editingSlug && { slug: editingSlug }),
          number: form.number,
          title: form.title,
          category: form.category,
          shortDescription: form.shortDescription,
          description: form.description,
          image: form.image,
          capabilities: form.capabilitiesText
            .split('\n')
            .map((s) => s.trim())
            .filter(Boolean),
          deliverables: form.deliverablesText
            .split('\n')
            .map((s) => s.trim())
            .filter(Boolean),
        }),
      });
      if (res.ok) {
        setModalOpen(false);
        await loadServices();
      }
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(slug: string, title: string) {
    if (!window.confirm(`Delete "${title}" from Firestore?`)) return;
    const res = await fetch(`/api/services?slug=${encodeURIComponent(slug)}`, {
      method: 'DELETE',
    });
    if (res.ok) {
      setServices((prev) => prev.filter((s) => s.slug !== slug));
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 border-b border-line pb-6 sm:flex-row sm:items-end">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-forest">
            Capabilities Catalog
          </span>
          <h1 className="mt-1 text-2xl font-semibold text-ink sm:text-3xl">
            Production Services
          </h1>
          <p className="mt-1 text-sm text-muted">
            Configure stagecraft, brand activations, broadcasting, and
            commercial capabilities in Cloud Firestore.
          </p>
        </div>

        <button
          type="button"
          onClick={openNewModal}
          className="btn btn-primary py-2 text-xs"
        >
          <Plus className="h-4 w-4" />
          <span>Add Service</span>
        </button>
      </div>

      {loading ? (
        <div className="flex items-center justify-center gap-2 py-16 text-sm text-muted">
          <Loader2 className="h-4 w-4 animate-spin text-forest" />
          <span>Loading services from Firestore...</span>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {services.map((service) => (
            <div
              key={service.slug}
              className="flex flex-col justify-between gap-5 rounded-xl border border-line bg-white p-6 transition-colors hover:border-line-strong md:flex-row md:items-center"
            >
              <div className="max-w-2xl space-y-1.5">
                <div className="flex flex-wrap items-center gap-2.5">
                  <span className="font-mono text-sm font-bold text-forest">
                    {service.number}
                  </span>
                  <span className="text-xs font-medium text-muted">
                    {service.category}
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-full bg-forest-soft px-2.5 py-0.5 text-[10px] font-medium text-forest">
                    <CheckCircle2 className="h-3 w-3" />
                    Active
                  </span>
                </div>
                <h2 className="text-lg font-semibold text-ink">
                  {service.title}
                </h2>
                <p className="text-xs leading-relaxed text-muted">
                  {service.shortDescription}
                </p>
              </div>

              <div className="flex shrink-0 items-center gap-2">
                <Link
                  href={`/services/${service.slug}`}
                  target="_blank"
                  className="btn btn-outline py-2 text-xs"
                >
                  <span>View</span>
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </Link>
                <button
                  type="button"
                  onClick={() => openEditModal(service)}
                  className="btn btn-outline py-2 text-xs"
                >
                  <Edit className="h-3.5 w-3.5" />
                  <span>Edit</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(service.slug, service.title)}
                  className="rounded-lg border border-line p-2 text-muted transition-colors hover:border-danger/30 hover:bg-red-50 hover:text-danger"
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
          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-xl border border-line bg-white p-6 shadow-xl">
            <div className="flex items-center justify-between border-b border-line pb-4">
              <h2 className="text-lg font-semibold text-ink">
                {editingSlug ? 'Edit Service' : 'Add Production Service'}
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
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
                <div>
                  <label className="mb-1 block font-medium text-ink">
                    Number
                  </label>
                  <input
                    type="text"
                    value={form.number}
                    onChange={(e) =>
                      setForm({ ...form, number: e.target.value })
                    }
                    className="w-full rounded-lg border border-line bg-paper px-3.5 py-2 font-mono text-ink focus:border-forest focus:outline-none"
                  />
                </div>
                <div className="sm:col-span-3">
                  <label className="mb-1 block font-medium text-ink">
                    Service Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={form.title}
                    onChange={(e) =>
                      setForm({ ...form, title: e.target.value })
                    }
                    className="w-full rounded-lg border border-line bg-paper px-3.5 py-2 text-ink focus:border-forest focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block font-medium text-ink">
                    Category
                  </label>
                  <input
                    type="text"
                    value={form.category}
                    onChange={(e) =>
                      setForm({ ...form, category: e.target.value })
                    }
                    className="w-full rounded-lg border border-line bg-paper px-3.5 py-2 text-ink focus:border-forest focus:outline-none"
                  />
                </div>
                <div>
                  <label className="mb-1 block font-medium text-ink">
                    Image URL
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
              </div>

              <div>
                <label className="mb-1 block font-medium text-ink">
                  Short Summary *
                </label>
                <textarea
                  rows={2}
                  required
                  value={form.shortDescription}
                  onChange={(e) =>
                    setForm({ ...form, shortDescription: e.target.value })
                  }
                  className="w-full rounded-lg border border-line bg-paper px-3.5 py-2 text-ink focus:border-forest focus:outline-none"
                />
              </div>

              <div>
                <label className="mb-1 block font-medium text-ink">
                  Detailed Description
                </label>
                <textarea
                  rows={3}
                  value={form.description}
                  onChange={(e) =>
                    setForm({ ...form, description: e.target.value })
                  }
                  className="w-full rounded-lg border border-line bg-paper px-3.5 py-2 text-ink focus:border-forest focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block font-medium text-ink">
                    Capabilities (One per line)
                  </label>
                  <textarea
                    rows={4}
                    value={form.capabilitiesText}
                    onChange={(e) =>
                      setForm({ ...form, capabilitiesText: e.target.value })
                    }
                    className="w-full rounded-lg border border-line bg-paper px-3.5 py-2 text-ink focus:border-forest focus:outline-none"
                  />
                </div>
                <div>
                  <label className="mb-1 block font-medium text-ink">
                    Deliverables (One per line)
                  </label>
                  <textarea
                    rows={4}
                    value={form.deliverablesText}
                    onChange={(e) =>
                      setForm({ ...form, deliverablesText: e.target.value })
                    }
                    className="w-full rounded-lg border border-line bg-paper px-3.5 py-2 text-ink focus:border-forest focus:outline-none"
                  />
                </div>
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
                  <span>{saving ? 'Saving...' : 'Save Service'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
