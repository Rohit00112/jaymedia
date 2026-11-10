'use client';

import { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import {
  CheckCircle2,
  ArrowUpRight,
  Plus,
  Edit,
  Trash2,
  X,
  Save,
  Loader2,
  Star,
} from 'lucide-react';
import type { NewsDocument } from '@/lib/backend/schemas';
import { formatDate, cn } from '@/lib/utils';

export default function AdminNewsPage() {
  const [articles, setArticles] = useState<NewsDocument[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingSlug, setEditingSlug] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState({
    title: '',
    category: 'Concert Announcement',
    date: new Date().toISOString().slice(0, 10),
    author: 'Jay Media Editorial Board',
    readTime: '4 min read',
    image: '/images/official/atif-aslam-poster.jpg',
    excerpt: '',
    contentText: '',
    tagsText: 'Eastern Echoes, Koshi Province, Jay Media',
    featured: false,
    status: 'published' as 'published' | 'draft',
  });

  const loadArticles = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/news?all=1');
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data.articles)) {
          setArticles(data.articles);
        }
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    let active = true;
    fetch('/api/news?all=1')
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (active && Array.isArray(data?.articles)) {
          setArticles(data.articles);
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
      title: '',
      category: 'Concert Announcement',
      date: new Date().toISOString().slice(0, 10),
      author: 'Jay Media Editorial Board',
      readTime: '4 min read',
      image: '/images/official/atif-aslam-poster.jpg',
      excerpt: '',
      contentText: '',
      tagsText: 'Jay Media, Koshi Province',
      featured: false,
      status: 'published',
    });
    setModalOpen(true);
  }

  function openEditModal(article: NewsDocument) {
    setEditingSlug(article.slug);
    setForm({
      title: article.title,
      category: article.category,
      date: article.date,
      author: article.author,
      readTime: article.readTime,
      image: article.image,
      excerpt: article.excerpt,
      contentText: (article.content || []).join('\n\n'),
      tagsText: (article.tags || []).join(', '),
      featured: Boolean(article.featured),
      status: article.status || 'published',
    });
    setModalOpen(true);
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    try {
      const method = editingSlug ? 'PATCH' : 'POST';
      const res = await fetch('/api/news', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...(editingSlug && { slug: editingSlug }),
          title: form.title,
          category: form.category,
          date: form.date,
          author: form.author,
          readTime: form.readTime,
          image: form.image,
          excerpt: form.excerpt,
          content: form.contentText
            .split(/\n+/)
            .map((p) => p.trim())
            .filter(Boolean),
          tags: form.tagsText
            .split(',')
            .map((t) => t.trim())
            .filter(Boolean),
          featured: form.featured,
          status: form.status,
        }),
      });
      if (res.ok) {
        setModalOpen(false);
        await loadArticles();
      }
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(slug: string, title: string) {
    if (!window.confirm(`Delete "${title}" from Firestore?`)) return;
    const res = await fetch(`/api/news?slug=${encodeURIComponent(slug)}`, {
      method: 'DELETE',
    });
    if (res.ok) {
      setArticles((prev) => prev.filter((a) => a.slug !== slug));
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 border-b border-line pb-6 sm:flex-row sm:items-end">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-forest">
            Press &amp; Broadcast
          </span>
          <h1 className="mt-1 text-2xl font-semibold text-ink sm:text-3xl">
            News &amp; Press Releases
          </h1>
          <p className="mt-1 text-sm text-muted">
            Publish official announcements, concert updates, and coronation
            reports to Cloud Firestore.
          </p>
        </div>

        <button
          type="button"
          onClick={openNewModal}
          className="btn btn-primary py-2 text-xs"
        >
          <Plus className="h-4 w-4" />
          <span>New Article</span>
        </button>
      </div>

      <div className="overflow-hidden rounded-xl border border-line bg-white">
        {loading ? (
          <div className="flex items-center justify-center gap-2 py-16 text-sm text-muted">
            <Loader2 className="h-4 w-4 animate-spin text-forest" />
            <span>Loading press releases...</span>
          </div>
        ) : articles.length === 0 ? (
          <div className="p-12 text-center text-sm text-muted">
            No news articles published yet.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-line bg-paper-deep/60 text-[11px] font-semibold uppercase tracking-wider text-muted">
                <tr>
                  <th className="px-5 py-3.5">Headline</th>
                  <th className="px-5 py-3.5">Category</th>
                  <th className="px-5 py-3.5">Date</th>
                  <th className="px-5 py-3.5">Status</th>
                  <th className="px-5 py-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {articles.map((article) => (
                  <tr
                    key={article.slug}
                    className="transition-colors hover:bg-paper-deep/40"
                  >
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold text-ink">
                          {article.title}
                        </span>
                        {article.featured && (
                          <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-medium text-amber-800">
                            <Star className="h-2.5 w-2.5" />
                            Featured
                          </span>
                        )}
                      </div>
                      <p className="mt-0.5 line-clamp-1 text-xs text-muted">
                        {article.excerpt}
                      </p>
                    </td>
                    <td className="px-5 py-4 font-medium text-forest">
                      {article.category}
                    </td>
                    <td className="px-5 py-4 text-muted">
                      {formatDate(article.date)}
                    </td>
                    <td className="px-5 py-4">
                      <span
                        className={cn(
                          'inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[11px] font-medium',
                          article.status === 'draft'
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-forest-soft text-forest'
                        )}
                      >
                        <CheckCircle2 className="h-3 w-3" />
                        {article.status === 'draft' ? 'Draft' : 'Published'}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <Link
                          href={`/news/${article.slug}`}
                          target="_blank"
                          title="View Public Article"
                          className="rounded-lg p-1.5 text-muted transition-colors hover:bg-paper-deep hover:text-ink"
                        >
                          <ArrowUpRight className="h-4 w-4" />
                        </Link>
                        <button
                          type="button"
                          onClick={() => openEditModal(article)}
                          title="Edit Article"
                          className="rounded-lg p-1.5 text-muted transition-colors hover:bg-paper-deep hover:text-forest"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() =>
                            handleDelete(article.slug, article.title)
                          }
                          title="Delete Article"
                          className="rounded-lg p-1.5 text-muted transition-colors hover:bg-red-50 hover:text-danger"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Create / Edit Modal */}
      {modalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-ink/50 p-4 backdrop-blur-xs"
        >
          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-xl border border-line bg-white p-6 shadow-xl">
            <div className="flex items-center justify-between border-b border-line pb-4">
              <h2 className="text-lg font-semibold text-ink">
                {editingSlug ? 'Edit Press Release' : 'New Press Release'}
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
                  Headline *
                </label>
                <input
                  type="text"
                  required
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className="w-full rounded-lg border border-line bg-paper px-3.5 py-2 text-sm text-ink focus:border-forest focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
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
                    Publish Date
                  </label>
                  <input
                    type="date"
                    value={form.date}
                    onChange={(e) => setForm({ ...form, date: e.target.value })}
                    className="w-full rounded-lg border border-line bg-paper px-3.5 py-2 text-ink focus:border-forest focus:outline-none"
                  />
                </div>
                <div>
                  <label className="mb-1 block font-medium text-ink">
                    Status
                  </label>
                  <select
                    value={form.status}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        status: e.target.value as 'published' | 'draft',
                      })
                    }
                    className="w-full rounded-lg border border-line bg-paper px-3.5 py-2 text-ink focus:border-forest focus:outline-none"
                  >
                    <option value="published">Published</option>
                    <option value="draft">Draft</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block font-medium text-ink">
                    Cover Image URL
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
                    Tags (comma separated)
                  </label>
                  <input
                    type="text"
                    value={form.tagsText}
                    onChange={(e) =>
                      setForm({ ...form, tagsText: e.target.value })
                    }
                    className="w-full rounded-lg border border-line bg-paper px-3.5 py-2 text-ink focus:border-forest focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="mb-1 block font-medium text-ink">
                  Short Excerpt *
                </label>
                <textarea
                  rows={2}
                  required
                  value={form.excerpt}
                  onChange={(e) =>
                    setForm({ ...form, excerpt: e.target.value })
                  }
                  className="w-full rounded-lg border border-line bg-paper px-3.5 py-2 text-ink focus:border-forest focus:outline-none"
                />
              </div>

              <div>
                <label className="mb-1 block font-medium text-ink">
                  Article Body (Separate paragraphs with a new line)
                </label>
                <textarea
                  rows={6}
                  value={form.contentText}
                  onChange={(e) =>
                    setForm({ ...form, contentText: e.target.value })
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
                  <span>Highlight as Featured Release</span>
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
                    <span>{saving ? 'Saving...' : 'Save Article'}</span>
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
