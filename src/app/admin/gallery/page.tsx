'use client';

import { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import {
  Plus,
  Edit,
  Trash2,
  X,
  Save,
  Loader2,
  Star,
} from 'lucide-react';
import { GALLERY_CATEGORIES, type GalleryCategory } from '@/config/gallery-data';
import type { GalleryDocument } from '@/lib/backend/schemas';
import { cn } from '@/lib/utils';

export default function AdminGalleryPage() {
  const [photos, setPhotos] = useState<GalleryDocument[]>([]);
  const [loading, setLoading] = useState(true);
  const [categoryFilter, setCategoryFilter] = useState<string>('All');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState({
    title: '',
    badge: 'Official Frame',
    category: 'Eastern Echoes' as GalleryCategory,
    image: '/images/official/atif-aslam-poster.jpg',
    caption: '',
    featured: false,
  });

  const loadGallery = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/gallery');
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data.photos)) {
          setPhotos(data.photos);
        }
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    let active = true;
    fetch('/api/gallery')
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (active && Array.isArray(data?.photos)) {
          setPhotos(data.photos);
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
    setEditingId(null);
    setForm({
      title: '',
      badge: 'Official Frame',
      category: 'Eastern Echoes',
      image: '/images/official/atif-aslam-poster.jpg',
      caption: '',
      featured: false,
    });
    setModalOpen(true);
  }

  function openEditModal(photo: GalleryDocument) {
    setEditingId(photo.id);
    setForm({
      title: photo.title,
      badge: photo.badge || 'Official Frame',
      category: photo.category,
      image: photo.image,
      caption: photo.caption,
      featured: Boolean(photo.featured),
    });
    setModalOpen(true);
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    try {
      const method = editingId ? 'PATCH' : 'POST';
      const res = await fetch('/api/gallery', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...(editingId && { id: editingId }),
          ...form,
        }),
      });
      if (res.ok) {
        setModalOpen(false);
        await loadGallery();
      }
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: string, title: string) {
    if (!window.confirm(`Delete "${title}" from Gallery Vault in Firestore?`)) {
      return;
    }
    const res = await fetch(`/api/gallery?id=${encodeURIComponent(id)}`, {
      method: 'DELETE',
    });
    if (res.ok) {
      setPhotos((prev) => prev.filter((p) => p.id !== id));
    }
  }

  const filtered =
    categoryFilter === 'All'
      ? photos
      : photos.filter((p) => p.category === categoryFilter);

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 border-b border-line pb-6 sm:flex-row sm:items-end">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-forest">
            Media Asset Vault
          </span>
          <h1 className="mt-1 text-2xl font-semibold text-ink sm:text-3xl">
            Photo Gallery CMS
          </h1>
          <p className="mt-1 text-sm text-muted">
            Manage concert posters, pageant coronation portraits, and stage
            frames stored in Cloud Firestore.
          </p>
        </div>

        <button
          type="button"
          onClick={openNewModal}
          className="btn btn-primary py-2 text-xs"
        >
          <Plus className="h-4 w-4" />
          <span>Add Photo</span>
        </button>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2">
        {(['All', ...GALLERY_CATEGORIES] as const).map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setCategoryFilter(cat)}
            className={cn(
              'rounded-full px-3.5 py-1.5 text-xs font-medium transition-colors',
              categoryFilter === cat
                ? 'bg-forest text-white'
                : 'border border-line bg-white text-muted hover:text-ink'
            )}
          >
            {cat}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="flex items-center justify-center gap-2 py-16 text-sm text-muted">
          <Loader2 className="h-4 w-4 animate-spin text-forest" />
          <span>Loading gallery archive from Firestore...</span>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((photo) => (
            <div
              key={photo.id}
              className="flex flex-col justify-between overflow-hidden rounded-xl border border-line bg-white"
            >
              <div>
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-sand">
                  <Image
                    src={photo.image}
                    alt={photo.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover"
                  />
                  {photo.featured && (
                    <span className="absolute right-2.5 top-2.5 inline-flex items-center gap-1 rounded-full bg-white/95 px-2.5 py-0.5 text-[10px] font-semibold text-forest shadow-xs">
                      <Star className="h-2.5 w-2.5" />
                      Featured
                    </span>
                  )}
                </div>
                <div className="p-4">
                  <span className="text-[11px] font-medium text-forest">
                    {photo.category} • {photo.badge}
                  </span>
                  <h2 className="mt-1 text-sm font-semibold text-ink">
                    {photo.title}
                  </h2>
                  <p className="mt-1 line-clamp-2 text-xs text-muted">
                    {photo.caption}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 border-t border-line px-4 py-3">
                <button
                  type="button"
                  onClick={() => openEditModal(photo)}
                  className="btn btn-outline py-1 text-xs"
                >
                  <Edit className="h-3.5 w-3.5" />
                  <span>Edit</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(photo.id, photo.title)}
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
          <div className="w-full max-w-lg rounded-xl border border-line bg-white p-6 shadow-xl">
            <div className="flex items-center justify-between border-b border-line pb-4">
              <h2 className="text-lg font-semibold text-ink">
                {editingId ? 'Edit Gallery Frame' : 'Add Gallery Frame'}
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
              <div>
                <label className="mb-1 block font-medium text-ink">
                  Frame Title *
                </label>
                <input
                  type="text"
                  required
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className="w-full rounded-lg border border-line bg-paper px-3.5 py-2 text-ink focus:border-forest focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block font-medium text-ink">
                    Collection Category *
                  </label>
                  <select
                    value={form.category}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        category: e.target.value as GalleryCategory,
                      })
                    }
                    className="w-full rounded-lg border border-line bg-paper px-3.5 py-2 text-ink focus:border-forest focus:outline-none"
                  >
                    {GALLERY_CATEGORIES.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="mb-1 block font-medium text-ink">
                    Badge Label
                  </label>
                  <input
                    type="text"
                    value={form.badge}
                    onChange={(e) =>
                      setForm({ ...form, badge: e.target.value })
                    }
                    className="w-full rounded-lg border border-line bg-paper px-3.5 py-2 text-ink focus:border-forest focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="mb-1 block font-medium text-ink">
                  Image URL *
                </label>
                <input
                  type="text"
                  required
                  value={form.image}
                  onChange={(e) => setForm({ ...form, image: e.target.value })}
                  placeholder="/images/official/... or https://..."
                  className="w-full rounded-lg border border-line bg-paper px-3.5 py-2 text-ink focus:border-forest focus:outline-none"
                />
              </div>

              <div>
                <label className="mb-1 block font-medium text-ink">
                  Caption
                </label>
                <textarea
                  rows={3}
                  value={form.caption}
                  onChange={(e) =>
                    setForm({ ...form, caption: e.target.value })
                  }
                  className="w-full rounded-lg border border-line bg-paper px-3.5 py-2 text-ink focus:border-forest focus:outline-none"
                />
              </div>

              <div className="flex items-center justify-between border-t border-line pt-4">
                <label className="inline-flex cursor-pointer items-center gap-2 font-medium text-ink">
                  <input
                    type="checkbox"
                    checked={form.featured}
                    onChange={(e) =>
                      setForm({ ...form, featured: e.target.checked })
                    }
                    className="h-4 w-4 rounded border-line text-forest focus:ring-forest"
                  />
                  <span>Featured Frame</span>
                </label>

                <div className="flex items-center gap-2">
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
                    <span>{saving ? 'Saving...' : 'Save Frame'}</span>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
