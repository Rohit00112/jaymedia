'use client';

import { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import {
  Plus,
  Edit2,
  Trash2,
  X,
  Save,
  Loader2,
  RefreshCw,
  ExternalLink,
  Play,
  Star,
  Video as VideoIcon,
  CheckCircle2,
} from 'lucide-react';
import type { VideoDocument } from '@/lib/backend/schemas';
import { useAuth } from '@/lib/firebase/auth-context';
import { cn } from '@/lib/utils';
import {
  extractYouTubeId,
  getYouTubeThumbnail,
  getYouTubeWatchUrl,
  getYouTubeEmbedUrl,
} from '@/lib/youtube';

const CATEGORY_PRESETS = [
  'Brand Film',
  'Showreel',
  'Miss Koshi',
  'Youth Platform',
  'Studio Archive',
  'Concerts & Mega Shows',
] as const;

export default function AdminVideosPage() {
  const { user } = useAuth();
  const [videos, setVideos] = useState<VideoDocument[]>([]);
  const [loading, setLoading] = useState(true);
  const [categoryFilter, setCategoryFilter] = useState<string>('All');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Form state
  const [title, setTitle] = useState('');
  const [youtubeInput, setYoutubeInput] = useState('');
  const [category, setCategory] = useState<string>('Showreel');
  const [subtitle, setSubtitle] = useState('');
  const [order, setOrder] = useState<number>(0);
  const [featured, setFeatured] = useState<boolean>(false);
  const [formError, setFormError] = useState('');

  // Active extracted YouTube ID for live preview
  const previewYouTubeId = extractYouTubeId(youtubeInput);
  const previewThumbnail = getYouTubeThumbnail(previewYouTubeId);

  const getAuthHeaders = useCallback(async () => {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };
    if (user) {
      try {
        const token = await user.getIdToken();
        if (token) {
          headers['Authorization'] = `Bearer ${token}`;
        }
      } catch {}
    }
    return headers;
  }, [user]);

  const loadVideos = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/videos');
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data.videos)) {
          setVideos(data.videos);
        }
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    let active = true;
    fetch('/api/videos')
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (active && Array.isArray(data?.videos)) {
          setVideos(data.videos);
        }
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, []);

  function showToast(msg: string) {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  }

  function openNewModal() {
    setEditingId(null);
    setTitle('');
    setYoutubeInput('');
    setCategory('Showreel');
    setSubtitle('');
    setOrder(videos.length + 1);
    setFeatured(false);
    setFormError('');
    setModalOpen(true);
  }

  function openEditModal(v: VideoDocument) {
    setEditingId(v.id);
    setTitle(v.title);
    setYoutubeInput(v.youtubeId);
    setCategory(v.category);
    setSubtitle(v.subtitle);
    setOrder(v.order || 0);
    setFeatured(Boolean(v.featured));
    setFormError('');
    setModalOpen(true);
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setFormError('');

    const cleanTitle = title.trim();
    const cleanId = extractYouTubeId(youtubeInput);
    const cleanSubtitle = subtitle.trim();
    const cleanCategory = category.trim();

    if (!cleanTitle) {
      setFormError('Please enter a video title.');
      return;
    }
    if (!cleanId) {
      setFormError('Please provide a valid YouTube URL or 11-character video ID.');
      return;
    }
    if (!cleanSubtitle) {
      setFormError('Please enter a brief description/subtitle.');
      return;
    }

    setSaving(true);
    try {
      const headers = await getAuthHeaders();
      const method = editingId ? 'PATCH' : 'POST';
      const res = await fetch('/api/videos', {
        method,
        headers,
        body: JSON.stringify({
          ...(editingId && { id: editingId }),
          title: cleanTitle,
          youtubeId: cleanId,
          category: cleanCategory || 'Showreel',
          subtitle: cleanSubtitle,
          order: Number(order) || 0,
          featured,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.video) {
        throw new Error(data.error || 'Failed to save video.');
      }

      const saved: VideoDocument = data.video;
      if (editingId) {
        setVideos((prev) => prev.map((v) => (v.id === saved.id ? saved : v)));
        showToast('Video updated successfully.');
      } else {
        setVideos((prev) => [...prev, saved]);
        showToast('New video added to showreel.');
      }
      setModalOpen(false);
    } catch (err: unknown) {
      setFormError(
        err instanceof Error ? err.message : 'Error while saving video.'
      );
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: string, videoTitle: string) {
    if (!window.confirm(`Are you sure you want to delete "${videoTitle}"?`)) {
      return;
    }

    try {
      const headers = await getAuthHeaders();
      const res = await fetch(`/api/videos?id=${encodeURIComponent(id)}`, {
        method: 'DELETE',
        headers,
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || 'Failed to delete video.');
      }

      setVideos((prev) => prev.filter((v) => v.id !== id));
      showToast('Video removed.');
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : 'Failed to delete video.');
    }
  }

  // Derive all distinct categories for filtering
  const allCategories = [
    'All',
    ...Array.from(new Set(videos.map((v) => v.category))),
  ];

  const filteredVideos =
    categoryFilter === 'All'
      ? videos
      : videos.filter((v) => v.category === categoryFilter);

  return (
    <div className="space-y-6">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-xl bg-forest px-4 py-3 text-xs font-semibold text-white shadow-lg animate-in fade-in slide-in-from-bottom-2 duration-200">
          <CheckCircle2 className="h-4 w-4" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col justify-between gap-4 border-b border-line pb-6 sm:flex-row sm:items-end">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-forest">
            Studio Broadcast &amp; Archive
          </span>
          <h1 className="mt-1 text-2xl font-semibold text-ink sm:text-3xl">
            YouTube &amp; Video Showreel
          </h1>
          <p className="mt-1 text-sm text-muted">
            Manage videos shown on the homepage showreel, YouTube embeds, and production highlights.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            type="button"
            onClick={loadVideos}
            disabled={loading}
            className="btn btn-outline py-2 text-xs"
          >
            <RefreshCw
              className={cn('h-3.5 w-3.5', loading && 'animate-spin')}
            />
            <span>Refresh</span>
          </button>

          <button
            type="button"
            onClick={openNewModal}
            className="btn btn-primary py-2 text-xs"
          >
            <Plus className="h-3.5 w-3.5" />
            <span>Add New Video</span>
          </button>
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="flex flex-wrap gap-2">
        {allCategories.map((cat) => (
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

      {/* Video Content Grid */}
      {loading ? (
        <div className="flex items-center justify-center gap-2 py-16 text-sm text-muted">
          <Loader2 className="h-4 w-4 animate-spin text-forest" />
          <span>Loading videos from Cloud Firestore...</span>
        </div>
      ) : filteredVideos.length === 0 ? (
        <div className="rounded-xl border border-line bg-white p-12 text-center">
          <VideoIcon className="mx-auto h-8 w-8 text-muted" />
          <h3 className="mt-3 text-sm font-semibold text-ink">
            No videos in this view
          </h3>
          <p className="mt-1 text-xs text-muted">
            Click &ldquo;Add New Video&rdquo; to add a YouTube video to the homepage showreel.
          </p>
          <button
            type="button"
            onClick={openNewModal}
            className="btn btn-primary mt-4 py-1.5 text-xs"
          >
            Add First Video
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filteredVideos.map((video) => {
            const thumb = getYouTubeThumbnail(video.youtubeId);
            const watchUrl = getYouTubeWatchUrl(video.youtubeId);

            return (
              <div
                key={video.id}
                className="group flex flex-col overflow-hidden rounded-xl border border-line bg-white shadow-2xs transition-all duration-200 hover:border-line-strong hover:shadow-xs"
              >
                {/* 16:9 Thumbnail Box */}
                <div className="relative aspect-video w-full overflow-hidden bg-ink">
                  {thumb ? (
                    <Image
                      src={thumb}
                      alt={video.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-paper-deep text-muted">
                      <VideoIcon className="h-8 w-8 text-muted" />
                    </div>
                  )}

                  <div className="absolute inset-0 bg-ink/25 opacity-0 transition-opacity duration-200 group-hover:opacity-100 flex items-center justify-center">
                    <a
                      href={watchUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex h-11 w-11 items-center justify-center rounded-full bg-white/95 text-ink shadow-md transition-transform hover:scale-110"
                      title="Preview on YouTube"
                    >
                      <Play className="ml-0.5 h-4 w-4 fill-ink" />
                    </a>
                  </div>

                  {/* Top Badges */}
                  <div className="absolute left-2.5 top-2.5 flex items-center gap-1.5">
                    <span className="rounded-md bg-ink/75 px-2 py-0.5 text-[10px] font-semibold text-white backdrop-blur-xs">
                      {video.category}
                    </span>
                    {video.featured && (
                      <span className="inline-flex items-center gap-1 rounded-md bg-amber-500 px-1.5 py-0.5 text-[10px] font-semibold text-white shadow-xs">
                        <Star className="h-2.5 w-2.5 fill-white" />
                        Featured
                      </span>
                    )}
                  </div>

                  <span className="absolute bottom-2 right-2 rounded-md bg-ink/80 px-2 py-0.5 text-[10px] font-mono font-medium text-white">
                    #{video.order || 0}
                  </span>
                </div>

                {/* Info & Description */}
                <div className="flex flex-1 flex-col justify-between p-4">
                  <div>
                    <h3 className="line-clamp-1 text-sm font-semibold text-ink group-hover:text-forest">
                      {video.title}
                    </h3>
                    <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-muted">
                      {video.subtitle}
                    </p>
                  </div>

                  {/* Bottom Action Footer */}
                  <div className="mt-4 flex items-center justify-between border-t border-line pt-3 text-xs">
                    <a
                      href={watchUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 font-mono text-[11px] text-muted hover:text-forest"
                    >
                      <span>{video.youtubeId}</span>
                      <ExternalLink className="h-3 w-3" />
                    </a>

                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => openEditModal(video)}
                        className="rounded-lg p-1.5 text-muted transition-colors hover:bg-forest-soft hover:text-forest"
                        title="Edit video"
                      >
                        <Edit2 className="h-3.5 w-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(video.id, video.title)}
                        className="rounded-lg p-1.5 text-muted transition-colors hover:bg-red-50 hover:text-danger"
                        title="Delete video"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Add / Edit Video Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/50 p-4 backdrop-blur-xs">
          <div className="w-full max-w-xl rounded-2xl border border-line bg-white shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-line px-6 py-4">
              <div>
                <h2 className="text-base font-semibold text-ink">
                  {editingId ? 'Edit Video Item' : 'Add New Video to Showreel'}
                </h2>
                <p className="mt-0.5 text-xs text-muted">
                  Paste any YouTube link; ID and thumbnail are resolved automatically.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="rounded-lg p-1.5 text-muted transition-colors hover:bg-paper hover:text-ink"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 p-6">
              {formError && (
                <div className="rounded-lg border border-danger/30 bg-red-50 p-3 text-xs font-medium text-danger">
                  {formError}
                </div>
              )}

              {/* YouTube Link / ID Input */}
              <div>
                <label className="mb-1 block text-xs font-semibold text-ink">
                  YouTube Video Link or ID <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={youtubeInput}
                  onChange={(e) => setYoutubeInput(e.target.value)}
                  placeholder="e.g. https://www.youtube.com/watch?v=RJ0daU4Uh8c or RJ0daU4Uh8c"
                  className="w-full rounded-lg border border-line-strong bg-paper/30 px-3.5 py-2.5 text-xs text-ink placeholder:text-faint focus:border-forest focus:bg-white focus:outline-none"
                />
                <p className="mt-1 text-[11px] text-muted">
                  Supports standard watch links, share links (`youtu.be`), shorts, or 11-char IDs.
                </p>
              </div>

              {/* Live Preview Box */}
              {previewYouTubeId && (
                <div className="rounded-xl border border-line bg-paper-deep/50 p-3">
                  <span className="block text-[11px] font-semibold uppercase tracking-wider text-muted">
                    Detected YouTube ID: <span className="font-mono text-forest">{previewYouTubeId}</span>
                  </span>
                  <div className="mt-2 flex gap-3 items-center">
                    {previewThumbnail && (
                      <div className="relative aspect-video w-32 shrink-0 overflow-hidden rounded-lg bg-ink">
                        <Image
                          src={previewThumbnail}
                          alt="Preview"
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}
                    <div className="text-xs text-muted">
                      <p className="font-medium text-ink">Thumbnail Preview</p>
                      <a
                        href={getYouTubeWatchUrl(previewYouTubeId)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-1 inline-flex items-center gap-1 text-[11px] text-forest hover:underline"
                      >
                        <span>Open in YouTube</span>
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    </div>
                  </div>
                </div>
              )}

              {/* Video Title */}
              <div>
                <label className="mb-1 block text-xs font-semibold text-ink">
                  Video Title <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Jay Media Management — Studio Reveal"
                  className="w-full rounded-lg border border-line-strong bg-paper/30 px-3.5 py-2.5 text-xs text-ink placeholder:text-faint focus:border-forest focus:bg-white focus:outline-none"
                />
              </div>

              {/* Category */}
              <div>
                <label className="mb-1 block text-xs font-semibold text-ink">
                  Category <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  placeholder="e.g. Brand Film, Miss Koshi, Live Concerts"
                  className="w-full rounded-lg border border-line-strong bg-paper/30 px-3.5 py-2.5 text-xs text-ink placeholder:text-faint focus:border-forest focus:bg-white focus:outline-none"
                />
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {CATEGORY_PRESETS.map((preset) => (
                    <button
                      key={preset}
                      type="button"
                      onClick={() => setCategory(preset)}
                      className={cn(
                        'rounded-md px-2 py-0.5 text-[10px] font-medium transition-colors',
                        category === preset
                          ? 'bg-forest text-white'
                          : 'border border-line bg-paper text-muted hover:text-ink'
                      )}
                    >
                      {preset}
                    </button>
                  ))}
                </div>
              </div>

              {/* Subtitle / Description */}
              <div>
                <label className="mb-1 block text-xs font-semibold text-ink">
                  Subtitle / Description <span className="text-danger">*</span>
                </label>
                <textarea
                  required
                  rows={2}
                  value={subtitle}
                  onChange={(e) => setSubtitle(e.target.value)}
                  placeholder="Brief context or highlights shown beneath the title..."
                  className="w-full resize-none rounded-lg border border-line-strong bg-paper/30 px-3.5 py-2.5 text-xs text-ink placeholder:text-faint focus:border-forest focus:bg-white focus:outline-none"
                />
              </div>

              {/* Order & Featured Toggles */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-1 block text-xs font-semibold text-ink">
                    Display Order
                  </label>
                  <input
                    type="number"
                    value={order}
                    onChange={(e) => setOrder(parseInt(e.target.value, 10) || 0)}
                    className="w-full rounded-lg border border-line-strong bg-paper/30 px-3.5 py-2 text-xs text-ink focus:border-forest focus:bg-white focus:outline-none"
                  />
                </div>

                <div className="flex items-center pt-5">
                  <label className="flex items-center gap-2 cursor-pointer text-xs font-medium text-ink select-none">
                    <input
                      type="checkbox"
                      checked={featured}
                      onChange={(e) => setFeatured(e.target.checked)}
                      className="h-4 w-4 rounded border-line-strong text-forest focus:ring-forest"
                    />
                    <span>Featured on Home</span>
                  </label>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-end gap-2 border-t border-line pt-4">
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
                  className="btn btn-primary py-2 text-xs disabled:opacity-60"
                >
                  {saving ? (
                    <>
                      <Loader2 className="h-3.5 w-3.5 animate-spin" />
                      <span>Saving...</span>
                    </>
                  ) : (
                    <>
                      <Save className="h-3.5 w-3.5" />
                      <span>{editingId ? 'Update Video' : 'Save Video'}</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

