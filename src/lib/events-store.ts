import { EVENTS_DATA, type EventDetailData } from '@/config/events-data';

const globalForEvents = globalThis as typeof globalThis & {
  __jayMediaEvents?: Map<string, EventDetailData>;
};

export function getEventsRegistry(): Map<string, EventDetailData> {
  if (!globalForEvents.__jayMediaEvents) {
    const map = new Map<string, EventDetailData>();
    for (const ev of EVENTS_DATA) {
      map.set(ev.slug, ev);
    }
    globalForEvents.__jayMediaEvents = map;
  }
  return globalForEvents.__jayMediaEvents;
}

export function listEvents(options?: { includeDrafts?: boolean }): EventDetailData[] {
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

