import { EVENTS_DATA, type EventDetailData } from '@/config/events-data';

const STATIC_SLUGS = new Set(EVENTS_DATA.map((e) => e.slug));

const globalForEvents = globalThis as typeof globalThis & {
  __jayMediaEvents?: Map<string, EventDetailData>;
  __jayMediaEventsSignature?: string;
};

export function getEventsRegistry(): Map<string, EventDetailData> {
  const signature = JSON.stringify(EVENTS_DATA);

  if (
    !globalForEvents.__jayMediaEvents ||
    globalForEvents.__jayMediaEventsSignature !== signature
  ) {
    const previous = globalForEvents.__jayMediaEvents;
    const map = new Map<string, EventDetailData>();

    for (const ev of EVENTS_DATA) {
      map.set(ev.slug, ev);
    }

    if (previous) {
      for (const [slug, ev] of previous.entries()) {
        if (!STATIC_SLUGS.has(slug)) {
          map.set(slug, ev);
        }
      }
    }

    globalForEvents.__jayMediaEvents = map;
    globalForEvents.__jayMediaEventsSignature = signature;
  }

  return globalForEvents.__jayMediaEvents;
}

export function listEvents(options?: {
  includeDrafts?: boolean;
}): EventDetailData[] {
  const all = Array.from(getEventsRegistry().values());
  if (options?.includeDrafts) return all;
  return all.filter((ev) => ev.status !== 'draft');
}

export function getEventBySlug(slug: string): EventDetailData | undefined {
  return getEventsRegistry().get(slug);
}

export function slugifyEventTitle(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}
