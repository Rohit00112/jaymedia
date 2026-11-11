/**
 * Utility functions for extracting YouTube IDs and generating URLs.
 */

export function extractYouTubeId(urlOrId: string): string {
  if (!urlOrId) return '';
  const trimmed = urlOrId.trim();
  // If it's already an 11-char ID
  if (/^[a-zA-Z0-9_-]{11}$/.test(trimmed)) {
    return trimmed;
  }
  // Matches youtu.be/ID, youtube.com/watch?v=ID, youtube.com/shorts/ID, youtube.com/embed/ID
  const match = trimmed.match(
    /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=|shorts\/))([\w-]{11})/
  );
  if (match && match[1]) {
    return match[1];
  }
  return trimmed;
}

export function getYouTubeThumbnail(urlOrId: string): string {
  const id = extractYouTubeId(urlOrId);
  return id ? `https://i.ytimg.com/vi/${id}/hqdefault.jpg` : '';
}

export function getYouTubeEmbedUrl(urlOrId: string, autoplay = false): string {
  const id = extractYouTubeId(urlOrId);
  return id
    ? `https://www.youtube.com/embed/${id}${autoplay ? '?autoplay=1&rel=0' : '?rel=0'}`
    : '';
}

export function getYouTubeWatchUrl(urlOrId: string): string {
  const id = extractYouTubeId(urlOrId);
  return id ? `https://www.youtube.com/watch?v=${id}` : '';
}

