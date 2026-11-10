'use client';

import { useRef, useState } from 'react';
import {
  Upload,
  Image as ImageIcon,
  Plus,
  X,
  Check,
  Loader2,
  FolderOpen,
  Trash2,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface MediaAsset {
  name: string;
  url: string;
  group: 'Uploaded' | 'Studio Library';
}

// ============================================================================
// 1. VISUAL IMAGE UPLOADER & STUDIO LIBRARY PICKER (No URL Text Box!)
// ============================================================================
interface ImageUploadFieldProps {
  label: string;
  hint?: string;
  value: string;
  onChange: (url: string) => void;
  aspectClassName?: string;
}

export function ImageUploadField({
  label,
  hint = 'Drag & drop an image here, upload from your device, or pick from the studio library.',
  value,
  onChange,
  aspectClassName = 'aspect-[16/10]',
}: ImageUploadFieldProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [error, setError] = useState('');
  const [libraryOpen, setLibraryOpen] = useState(false);
  const [libraryItems, setLibraryItems] = useState<MediaAsset[]>([]);
  const [loadingLibrary, setLoadingLibrary] = useState(false);

  async function handleFileUpload(file: File) {
    setUploading(true);
    setError('');
    try {
      const formData = new FormData();
      formData.append('file', file);
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (!res.ok || !data.url) {
        throw new Error(data.error || 'Could not upload image.');
      }
      onChange(data.url);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Image upload failed.');
    } finally {
      setUploading(false);
    }
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      handleFileUpload(file);
    }
  }

  async function openLibrary() {
    setLibraryOpen((prev) => !prev);
    if (!libraryOpen && libraryItems.length === 0) {
      setLoadingLibrary(true);
      try {
        const res = await fetch('/api/upload');
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data.media)) {
            setLibraryItems(data.media);
          }
        }
      } finally {
        setLoadingLibrary(false);
      }
    }
  }

  return (
    <div className="space-y-2.5">
      <div className="flex items-center justify-between">
        <label className="block text-xs font-semibold text-ink">{label}</label>
        <button
          type="button"
          onClick={openLibrary}
          className="inline-flex items-center gap-1.5 text-xs font-medium text-forest hover:underline"
        >
          <FolderOpen className="h-3.5 w-3.5" />
          <span>{libraryOpen ? 'Hide Studio Library' : 'Choose from Library'}</span>
        </button>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/avif,image/gif"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleFileUpload(file);
          e.target.value = '';
        }}
        className="hidden"
      />

      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        className={cn(
          'relative overflow-hidden rounded-xl border-2 border-dashed transition-all',
          dragOver
            ? 'border-forest bg-forest-soft/40'
            : 'border-line bg-paper hover:border-line-strong'
        )}
      >
        {value ? (
          <div className="grid grid-cols-1 gap-4 p-3.5 sm:grid-cols-12 sm:items-center">
            <div
              className={cn(
                'relative w-full overflow-hidden rounded-lg border border-line bg-sand sm:col-span-5',
                aspectClassName
              )}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={value}
                alt={label}
                className="h-full w-full object-cover"
              />
            </div>

            <div className="flex flex-col justify-between space-y-3 sm:col-span-7 sm:pl-2">
              <div>
                <span className="inline-flex items-center gap-1 rounded-full bg-forest-soft px-2.5 py-0.5 text-[11px] font-medium text-forest">
                  <Check className="h-3 w-3" />
                  Image Selected
                </span>
                <p className="mt-1.5 text-xs leading-relaxed text-muted">
                  {hint}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  disabled={uploading}
                  onClick={() => fileInputRef.current?.click()}
                  className="btn btn-primary py-2 text-xs"
                >
                  {uploading ? (
                    <>
                      <Loader2 className="h-3.5 w-3.5 animate-spin" />
                      <span>Uploading...</span>
                    </>
                  ) : (
                    <>
                      <Upload className="h-3.5 w-3.5" />
                      <span>Upload New Photo</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={openLibrary}
                  className="btn btn-outline py-2 text-xs"
                >
                  <ImageIcon className="h-3.5 w-3.5" />
                  <span>Studio Library</span>
                </button>
              </div>
            </div>
          </div>
        ) : (
          <button
            type="button"
            disabled={uploading}
            onClick={() => fileInputRef.current?.click()}
            className="flex w-full flex-col items-center justify-center px-6 py-10 text-center"
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-forest-soft text-forest">
              {uploading ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <Upload className="h-5 w-5" />
              )}
            </span>
            <span className="mt-3 text-sm font-semibold text-ink">
              {uploading
                ? 'Uploading photo...'
                : 'Click to upload photo or drag & drop here'}
            </span>
            <span className="mt-1 text-xs text-muted">
              Supports JPG, PNG, WebP • Instant visual preview
            </span>
          </button>
        )}
      </div>

      {error && <p className="text-xs font-medium text-danger">{error}</p>}

      {/* Studio Library Visual Picker Drawer */}
      {libraryOpen && (
        <div className="rounded-xl border border-line bg-white p-4 shadow-sm">
          <div className="mb-3 flex items-center justify-between">
            <span className="text-xs font-semibold text-ink">
              Select an existing photo from Studio Library
            </span>
            <button
              type="button"
              onClick={() => setLibraryOpen(false)}
              className="rounded-md p-1 text-muted hover:bg-paper-deep hover:text-ink"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>

          {loadingLibrary ? (
            <div className="flex items-center justify-center gap-2 py-8 text-xs text-muted">
              <Loader2 className="h-4 w-4 animate-spin text-forest" />
              <span>Loading studio photos...</span>
            </div>
          ) : (
            <div className="grid max-h-60 grid-cols-3 gap-2.5 overflow-y-auto pr-1 sm:grid-cols-5">
              {libraryItems.map((asset) => {
                const selected = value === asset.url;
                return (
                  <button
                    key={asset.url}
                    type="button"
                    onClick={() => {
                      onChange(asset.url);
                      setLibraryOpen(false);
                    }}
                    className={cn(
                      'group relative aspect-square overflow-hidden rounded-lg border-2 text-left transition-all',
                      selected
                        ? 'border-forest ring-2 ring-forest/20'
                        : 'border-line hover:border-forest/60'
                    )}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={asset.url}
                      alt={asset.name}
                      className="h-full w-full object-cover transition-transform duration-200 group-hover:scale-105"
                    />
                    <span className="absolute inset-x-0 bottom-0 truncate bg-ink/75 px-1.5 py-1 text-[10px] text-white">
                      {asset.name}
                    </span>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ============================================================================
// 2. INTERACTIVE LIST / CHIP BUILDER (Replaces multi-line textareas!)
// ============================================================================
interface ListBuilderFieldProps {
  label: string;
  hint?: string;
  items: string[];
  onChange: (items: string[]) => void;
  placeholder?: string;
  suggestions?: string[];
  compactChips?: boolean;
}

export function ListBuilderField({
  label,
  hint,
  items,
  onChange,
  placeholder = 'Type an item and press Enter...',
  suggestions = [],
  compactChips = false,
}: ListBuilderFieldProps) {
  const [draft, setDraft] = useState('');

  function addItem(text: string) {
    const cleaned = text.trim();
    if (!cleaned) return;
    if (!items.includes(cleaned)) {
      onChange([...items, cleaned]);
    }
    setDraft('');
  }

  function removeItem(index: number) {
    onChange(items.filter((_, idx) => idx !== index));
  }

  const unusedSuggestions = suggestions.filter((s) => !items.includes(s));

  return (
    <div className="space-y-2.5">
      <div>
        <label className="block text-xs font-semibold text-ink">{label}</label>
        {hint && <p className="mt-0.5 text-[11px] text-muted">{hint}</p>}
      </div>

      {/* Add Input Row */}
      <div className="flex gap-2">
        <input
          type="text"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              addItem(draft);
            }
          }}
          placeholder={placeholder}
          className="flex-1 rounded-lg border border-line bg-paper px-3.5 py-2 text-xs text-ink placeholder:text-faint focus:border-forest focus:outline-none"
        />
        <button
          type="button"
          onClick={() => addItem(draft)}
          className="inline-flex shrink-0 items-center gap-1 rounded-lg bg-forest px-3.5 py-2 text-xs font-medium text-white transition-colors hover:bg-forest/90"
        >
          <Plus className="h-3.5 w-3.5" />
          <span>Add</span>
        </button>
      </div>

      {/* Quick Suggestions */}
      {unusedSuggestions.length > 0 && (
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-[10px] font-medium text-muted">
            Quick add:
          </span>
          {unusedSuggestions.slice(0, 5).map((sug) => (
            <button
              key={sug}
              type="button"
              onClick={() => addItem(sug)}
              className="inline-flex items-center gap-1 rounded-full border border-line bg-paper-deep/60 px-2.5 py-0.5 text-[11px] text-ink-soft transition-colors hover:border-forest hover:bg-forest-soft hover:text-forest"
            >
              <Plus className="h-2.5 w-2.5" />
              <span>{sug}</span>
            </button>
          ))}
        </div>
      )}

      {/* Current Items */}
      {items.length === 0 ? (
        <p className="rounded-lg border border-dashed border-line bg-paper/50 px-3.5 py-3 text-center text-xs text-muted">
          No items added yet. Use the box above or click a quick-add pill.
        </p>
      ) : compactChips ? (
        <div className="flex flex-wrap gap-2 pt-1">
          {items.map((item, idx) => (
            <span
              key={`${item}-${idx}`}
              className="inline-flex items-center gap-1.5 rounded-full border border-forest/25 bg-forest-soft px-3 py-1 text-xs font-medium text-forest"
            >
              <span>{item}</span>
              <button
                type="button"
                onClick={() => removeItem(idx)}
                aria-label={`Remove ${item}`}
                className="rounded-full p-0.5 hover:bg-forest/15"
              >
                <X className="h-3 w-3" />
              </button>
            </span>
          ))}
        </div>
      ) : (
        <ul className="space-y-1.5 pt-1">
          {items.map((item, idx) => (
            <li
              key={`${item}-${idx}`}
              className="flex items-center justify-between gap-3 rounded-lg border border-line bg-paper px-3.5 py-2 text-xs text-ink"
            >
              <div className="flex items-center gap-2.5">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-forest-soft text-[10px] font-semibold text-forest">
                  {idx + 1}
                </span>
                <span>{item}</span>
              </div>
              <button
                type="button"
                onClick={() => removeItem(idx)}
                aria-label={`Remove ${item}`}
                className="rounded-md p-1 text-muted transition-colors hover:bg-red-50 hover:text-danger"
              >
                <Trash2 className="h-3.5 w-3.5" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

// ============================================================================
// 3. SEGMENTED PILL TOGGLE (Replaces raw dropdowns/checkboxes)
// ============================================================================
interface SegmentedOption<T extends string> {
  value: T;
  label: string;
  description?: string;
}

interface SegmentedToggleProps<T extends string> {
  label: string;
  value: T;
  options: readonly SegmentedOption<T>[];
  onChange: (value: T) => void;
}

export function SegmentedToggle<T extends string>({
  label,
  value,
  options,
  onChange,
}: SegmentedToggleProps<T>) {
  return (
    <div className="space-y-1.5">
      <label className="block text-xs font-semibold text-ink">{label}</label>
      <div className="grid grid-cols-2 gap-2 rounded-xl border border-line bg-paper p-1">
        {options.map((opt) => {
          const active = value === opt.value;
          return (
            <button
              key={opt.value}
              type="button"
              onClick={() => onChange(opt.value)}
              className={cn(
                'flex flex-col items-center justify-center rounded-lg px-3 py-2 text-center transition-all',
                active
                  ? 'bg-forest text-white shadow-2xs'
                  : 'text-muted hover:text-ink'
              )}
            >
              <span className="text-xs font-semibold">{opt.label}</span>
              {opt.description && (
                <span
                  className={cn(
                    'mt-0.5 text-[10px]',
                    active ? 'text-white/80' : 'text-muted'
                  )}
                >
                  {opt.description}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ============================================================================
// 4. PRESET INPUT FIELD (Click a chip to fill or type custom value)
// ============================================================================
interface PresetInputFieldProps {
  label: string;
  value: string;
  onChange: (val: string) => void;
  presets: readonly string[];
  placeholder?: string;
  required?: boolean;
}

export function PresetInputField({
  label,
  value,
  onChange,
  presets,
  placeholder,
  required,
}: PresetInputFieldProps) {
  return (
    <div className="space-y-2">
      <label className="block text-xs font-semibold text-ink">
        {label} {required && '*'}
      </label>
      <input
        type="text"
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-lg border border-line bg-paper px-3.5 py-2 text-sm text-ink placeholder:text-faint focus:border-forest focus:outline-none"
      />
      <div className="flex flex-wrap gap-1.5">
        {presets.map((preset) => {
          const active = value === preset;
          return (
            <button
              key={preset}
              type="button"
              onClick={() => onChange(preset)}
              className={cn(
                'rounded-full px-2.5 py-0.5 text-[11px] font-medium transition-colors',
                active
                  ? 'bg-forest text-white'
                  : 'border border-line bg-paper-deep/60 text-muted hover:border-forest hover:text-ink'
              )}
            >
              {preset}
            </button>
          );
        })}
      </div>
    </div>
  );
}

