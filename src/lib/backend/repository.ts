import { cacheLife, cacheTag, revalidatePath, revalidateTag } from 'next/cache';
import { EVENTS_DATA, type EventDetailData } from '@/config/events-data';
import { NEWS_DATA } from '@/config/news-data';
import { TEAM_PROFILES } from '@/config/team-data';
import { GALLERY_PHOTOS } from '@/config/gallery-data';
import { siteConfig } from '@/config/site';
import { getAdminFirestore, isFirebaseAdminConfigured } from '@/lib/firebase/admin';
import {
  COLLECTIONS,
  type RegistrationDocument,
  type InquiryDocument,
  type NewsDocument,
  type TeamDocument,
  type GalleryDocument,
  type SettingsDocument,
} from './schemas';
import { getEventsRegistry } from '@/lib/events-store';

function invalidateCache(tag: string) {
  try {
    revalidateTag(tag, { expire: 0 });
    revalidateTag('overview', { expire: 0 });
    revalidatePath('/', 'layout');
  } catch {
    // Safe fallback when invoked outside a Next.js request/action context
  }
}

export const DEFAULT_SETTINGS: SettingsDocument = {
  companyName: siteConfig.name,
  shortName: siteConfig.shortName,
  tagline: siteConfig.tagline,
  description: siteConfig.description,
  address: siteConfig.location.address,
  city: siteConfig.location.city,
  province: siteConfig.location.province,
  country: siteConfig.location.country,
  email: siteConfig.contact.email,
  phone: siteConfig.contact.phone,
  secondaryPhone: siteConfig.contact.secondaryPhone,
  officeHours: 'Sun – Fri: 10:00 AM – 6:00 PM NPT',
  facebook: siteConfig.social.facebook,
  instagram: siteConfig.social.instagram,
  youtube: siteConfig.social.youtube,
  concertName: 'Eastern Echoes',
  concertDateIso: '2026-12-19T18:00:00+05:45',
  concertVenue: 'Itahari Stadium (Rangasala), Sunsari',
  concertTicketUrl: 'https://events.khalti.com/events/ET26BJD3F93W',
  updatedAt: '2026-01-01T00:00:00.000Z',
};

const globalStore = globalThis as typeof globalThis & {
  __jmmSeededFirestore?: boolean;
  __jmmNews?: Map<string, NewsDocument>;
  __jmmTeam?: Map<string, TeamDocument>;
  __jmmGallery?: Map<string, GalleryDocument>;
  __jmmInquiries?: Map<string, InquiryDocument>;
  __jmmRegistrations?: Map<string, RegistrationDocument>;
  __jmmSettings?: SettingsDocument;
};

function getMemoryNews(): Map<string, NewsDocument> {
  if (!globalStore.__jmmNews) {
    globalStore.__jmmNews = new Map(
      NEWS_DATA.map((n) => [
        n.slug,
        {
          ...n,
          status: 'published' as const,
          createdAt: n.date,
          updatedAt: n.date,
        },
      ])
    );
  }
  return globalStore.__jmmNews;
}

function getMemoryTeam(): Map<string, TeamDocument> {
  if (!globalStore.__jmmTeam) {
    globalStore.__jmmTeam = new Map(
      TEAM_PROFILES.map((t, index) => [
        t.slug,
        {
          ...t,
          order: index + 1,
          createdAt: '2026-01-01T00:00:00.000Z',
          updatedAt: '2026-01-01T00:00:00.000Z',
        },
      ])
    );
  }
  return globalStore.__jmmTeam;
}

function getMemoryGallery(): Map<string, GalleryDocument> {
  if (!globalStore.__jmmGallery) {
    globalStore.__jmmGallery = new Map(
      GALLERY_PHOTOS.map((g) => [
        g.id,
        {
          ...g,
          badge: g.badge || 'Official Frame',
          featured: Boolean(g.featured),
          createdAt: '2026-01-01T00:00:00.000Z',
          updatedAt: '2026-01-01T00:00:00.000Z',
        },
      ])
    );
  }
  return globalStore.__jmmGallery;
}

function getMemoryInquiries(): Map<string, InquiryDocument> {
  if (!globalStore.__jmmInquiries) {
    globalStore.__jmmInquiries = new Map();
  }
  return globalStore.__jmmInquiries;
}

function getMemoryRegistrations(): Map<string, RegistrationDocument> {
  if (!globalStore.__jmmRegistrations) {
    globalStore.__jmmRegistrations = new Map();
  }
  return globalStore.__jmmRegistrations;
}

function getMemorySettings(): SettingsDocument {
  if (!globalStore.__jmmSettings) {
    globalStore.__jmmSettings = { ...DEFAULT_SETTINGS };
  }
  return globalStore.__jmmSettings;
}

function stripUndefined<T>(obj: T): T {
  return JSON.parse(JSON.stringify(obj)) as T;
}

/**
 * Seeds initial catalog collections into Firestore once per project (`settings/seed_meta`).
 * Does NOT seed fake registrations or fake inquiries.
 */
export async function ensureFirestoreSeeded(): Promise<void> {
  if (globalStore.__jmmSeededFirestore || !isFirebaseAdminConfigured()) {
    return;
  }
  globalStore.__jmmSeededFirestore = true;

  try {
    const db = getAdminFirestore();
    const seedMetaRef = db.collection(COLLECTIONS.SETTINGS).doc('seed_meta');
    const seedMetaSnap = await seedMetaRef.get();
    if (seedMetaSnap.exists) {
      return;
    }

    const batch = db.batch();
    for (const ev of EVENTS_DATA) {
      batch.set(
        db.collection(COLLECTIONS.EVENTS).doc(ev.slug),
        stripUndefined({
          ...ev,
          status: ev.status || 'published',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        })
      );
    }
    for (const item of getMemoryNews().values()) {
      batch.set(
        db.collection(COLLECTIONS.NEWS).doc(item.slug),
        stripUndefined(item)
      );
    }
    for (const item of getMemoryTeam().values()) {
      batch.set(
        db.collection(COLLECTIONS.TEAM).doc(item.slug),
        stripUndefined(item)
      );
    }
    for (const item of getMemoryGallery().values()) {
      batch.set(
        db.collection(COLLECTIONS.GALLERY).doc(item.id),
        stripUndefined(item)
      );
    }
    batch.set(
      db.collection(COLLECTIONS.SETTINGS).doc('site'),
      stripUndefined(DEFAULT_SETTINGS)
    );
    batch.set(seedMetaRef, {
      seededAt: new Date().toISOString(),
      version: 2,
    });

    await batch.commit();
  } catch (err) {
    console.error('[Firestore Seed Warning]:', err);
  }
}

// ============================================================================
// 1. EVENTS REPOSITORY
// ============================================================================
export async function listEventsRepo(options?: {
  includeDrafts?: boolean;
}): Promise<EventDetailData[]> {
  'use cache';
  cacheLife('minutes');
  cacheTag('events');

  await ensureFirestoreSeeded();
  const registry = getEventsRegistry();

  if (isFirebaseAdminConfigured()) {
    try {
      const snap = await getAdminFirestore()
        .collection(COLLECTIONS.EVENTS)
        .get();
      const docs = snap.docs.map((d) => d.data() as EventDetailData);
      const flagshipOrder = new Map(EVENTS_DATA.map((e, idx) => [e.slug, idx]));
      docs.sort((a, b) => {
        const ia = flagshipOrder.has(a.slug) ? flagshipOrder.get(a.slug)! : 999;
        const ib = flagshipOrder.has(b.slug) ? flagshipOrder.get(b.slug)! : 999;
        return ia - ib;
      });

      if (docs.length > 0) {
        registry.clear();
        for (const ev of docs) {
          registry.set(ev.slug, ev);
        }
      }
    } catch (err) {
      console.error('[listEventsRepo Firestore Error]:', err);
    }
  }

  const all = Array.from(registry.values());
  if (options?.includeDrafts) return all;
  return all.filter((ev) => ev.status !== 'draft');
}

export async function getEventRepo(
  slug: string
): Promise<EventDetailData | undefined> {
  'use cache';
  cacheLife('minutes');
  cacheTag('events');

  await ensureFirestoreSeeded();
  const registry = getEventsRegistry();

  if (isFirebaseAdminConfigured()) {
    try {
      const doc = await getAdminFirestore()
        .collection(COLLECTIONS.EVENTS)
        .doc(slug)
        .get();
      if (doc.exists) {
        const data = doc.data() as EventDetailData;
        registry.set(slug, data);
        return data;
      }
      registry.delete(slug);
      return undefined;
    } catch (err) {
      console.error('[getEventRepo Firestore Error]:', err);
    }
  }

  return registry.get(slug);
}

export async function upsertEventRepo(
  event: EventDetailData
): Promise<EventDetailData> {
  await ensureFirestoreSeeded();
  const payload = stripUndefined({
    ...event,
    updatedAt: new Date().toISOString(),
  });

  if (isFirebaseAdminConfigured()) {
    await getAdminFirestore()
      .collection(COLLECTIONS.EVENTS)
      .doc(event.slug)
      .set(payload, { merge: true });
  }

  getEventsRegistry().set(event.slug, payload);
  invalidateCache('events');
  return payload;
}

export async function deleteEventRepo(slug: string): Promise<boolean> {
  await ensureFirestoreSeeded();
  if (isFirebaseAdminConfigured()) {
    await getAdminFirestore()
      .collection(COLLECTIONS.EVENTS)
      .doc(slug)
      .delete();
  }
  const deleted = getEventsRegistry().delete(slug);
  invalidateCache('events');
  return deleted;
}

// ============================================================================
// 2. REGISTRATIONS REPOSITORY
// ============================================================================
export async function listRegistrationsRepo(options?: {
  eventSlug?: string;
  status?: string;
}): Promise<RegistrationDocument[]> {
  'use cache';
  cacheLife('minutes');
  cacheTag('registrations');

  await ensureFirestoreSeeded();
  const mem = getMemoryRegistrations();

  if (isFirebaseAdminConfigured()) {
    try {
      const snap = await getAdminFirestore()
        .collection(COLLECTIONS.REGISTRATIONS)
        .get();
      if (!snap.empty) {
        mem.clear();
        for (const doc of snap.docs) {
          const rec = doc.data() as RegistrationDocument;
          mem.set(rec.userCode || doc.id, rec);
        }
      }
    } catch (err) {
      console.error('[listRegistrationsRepo Error]:', err);
    }
  }

  let list = Array.from(mem.values()).sort((a, b) =>
    (b.submittedAt || '').localeCompare(a.submittedAt || '')
  );

  if (options?.eventSlug && options.eventSlug !== 'all') {
    list = list.filter((r) => r.eventSlug === options.eventSlug);
  }
  if (options?.status && options.status !== 'All') {
    list = list.filter((r) => r.status === options.status);
  }
  return list;
}

export async function getRegistrationRepo(
  userCode: string
): Promise<RegistrationDocument | undefined> {
  'use cache';
  cacheLife('minutes');
  cacheTag('registrations');

  await ensureFirestoreSeeded();
  const normalized = userCode.trim().toUpperCase();
  const mem = getMemoryRegistrations();

  if (isFirebaseAdminConfigured()) {
    try {
      const doc = await getAdminFirestore()
        .collection(COLLECTIONS.REGISTRATIONS)
        .doc(normalized)
        .get();
      if (doc.exists) {
        const data = doc.data() as RegistrationDocument;
        mem.set(normalized, data);
        return data;
      }
      mem.delete(normalized);
      return undefined;
    } catch (err) {
      console.error('[getRegistrationRepo Error]:', err);
    }
  }

  return mem.get(normalized);
}

export async function upsertRegistrationRepo(
  record: RegistrationDocument
): Promise<RegistrationDocument> {
  await ensureFirestoreSeeded();
  const code = record.userCode.trim().toUpperCase();
  const payload = stripUndefined({
    ...record,
    userCode: code,
    updatedAt: new Date().toISOString(),
  });

  if (isFirebaseAdminConfigured()) {
    await getAdminFirestore()
      .collection(COLLECTIONS.REGISTRATIONS)
      .doc(code)
      .set(payload, { merge: true });
  }

  getMemoryRegistrations().set(code, payload);
  invalidateCache('registrations');
  return payload;
}

export async function deleteRegistrationRepo(userCode: string): Promise<boolean> {
  await ensureFirestoreSeeded();
  const code = userCode.trim().toUpperCase();
  if (isFirebaseAdminConfigured()) {
    await getAdminFirestore()
      .collection(COLLECTIONS.REGISTRATIONS)
      .doc(code)
      .delete();
  }
  const deleted = getMemoryRegistrations().delete(code);
  invalidateCache('registrations');
  return deleted;
}

// ============================================================================
// 3. INQUIRIES REPOSITORY
// ============================================================================
export async function listInquiriesRepo(options?: {
  status?: string;
}): Promise<InquiryDocument[]> {
  'use cache';
  cacheLife('minutes');
  cacheTag('inquiries');

  await ensureFirestoreSeeded();
  const mem = getMemoryInquiries();

  if (isFirebaseAdminConfigured()) {
    try {
      const snap = await getAdminFirestore()
        .collection(COLLECTIONS.INQUIRIES)
        .get();
      if (!snap.empty) {
        mem.clear();
        for (const doc of snap.docs) {
        const data = doc.data() as Partial<InquiryDocument> & {
          name?: string;
          service?: string;
        };
        const normalized: InquiryDocument = {
          id: doc.id,
          fullName: data.fullName || data.name || 'Client Inquiry',
          email: data.email || 'info@jaymedia.com',
          phone: data.phone || '',
          organization: data.organization || '',
          serviceOfInterest:
            data.serviceOfInterest || data.service || 'General Production',
          eventDate: data.eventDate || '',
          budget: data.budget || '',
          message: data.message || '',
          status: data.status || 'new',
          priority: data.priority || 'medium',
          adminNotes: data.adminNotes || '',
          createdAt: data.createdAt || '2026-01-01T00:00:00.000Z',
          updatedAt:
            data.updatedAt || data.createdAt || '2026-01-01T00:00:00.000Z',
        };
        mem.set(doc.id, normalized);
      }
    }
    } catch (err) {
      console.error('[listInquiriesRepo Error]:', err);
    }
  }

  let list = Array.from(mem.values()).sort((a, b) =>
    (b.createdAt || '').localeCompare(a.createdAt || '')
  );
  if (options?.status && options.status !== 'all') {
    list = list.filter((i) => i.status === options.status);
  }
  return list;
}

export async function upsertInquiryRepo(
  inquiry: InquiryDocument
): Promise<InquiryDocument> {
  await ensureFirestoreSeeded();
  const payload = stripUndefined({
    ...inquiry,
    updatedAt: new Date().toISOString(),
  });

  if (isFirebaseAdminConfigured()) {
    await getAdminFirestore()
      .collection(COLLECTIONS.INQUIRIES)
      .doc(inquiry.id)
      .set(payload, { merge: true });
  }

  getMemoryInquiries().set(inquiry.id, payload);
  invalidateCache('inquiries');
  return payload;
}

export async function deleteInquiryRepo(id: string): Promise<boolean> {
  await ensureFirestoreSeeded();
  if (isFirebaseAdminConfigured()) {
    await getAdminFirestore()
      .collection(COLLECTIONS.INQUIRIES)
      .doc(id)
      .delete();
  }
  const deleted = getMemoryInquiries().delete(id);
  invalidateCache('inquiries');
  return deleted;
}

// ============================================================================
// 4. NEWS REPOSITORY
// ============================================================================
export async function listNewsRepo(options?: {
  includeDrafts?: boolean;
}): Promise<NewsDocument[]> {
  'use cache';
  cacheLife('minutes');
  cacheTag('news');

  await ensureFirestoreSeeded();
  const mem = getMemoryNews();

  if (isFirebaseAdminConfigured()) {
    try {
      const snap = await getAdminFirestore().collection(COLLECTIONS.NEWS).get();
      if (!snap.empty) {
        mem.clear();
        for (const doc of snap.docs) {
          const item = doc.data() as NewsDocument;
          mem.set(item.slug || doc.id, {
            ...item,
            slug: item.slug || doc.id,
            status: item.status || 'published',
          });
        }
      }
    } catch (err) {
      console.error('[listNewsRepo Error]:', err);
    }
  }

  const all = Array.from(mem.values()).sort((a, b) =>
    (b.date || '').localeCompare(a.date || '')
  );
  if (options?.includeDrafts) return all;
  return all.filter((n) => n.status !== 'draft');
}

export async function getNewsRepo(
  slug: string
): Promise<NewsDocument | undefined> {
  'use cache';
  cacheLife('minutes');
  cacheTag('news');

  const all = await listNewsRepo({ includeDrafts: true });
  return all.find((n) => n.slug === slug);
}

export async function upsertNewsRepo(doc: NewsDocument): Promise<NewsDocument> {
  await ensureFirestoreSeeded();
  const payload = stripUndefined({
    ...doc,
    updatedAt: new Date().toISOString(),
  });

  if (isFirebaseAdminConfigured()) {
    await getAdminFirestore()
      .collection(COLLECTIONS.NEWS)
      .doc(doc.slug)
      .set(payload, { merge: true });
  }

  getMemoryNews().set(doc.slug, payload);
  invalidateCache('news');
  return payload;
}

export async function deleteNewsRepo(slug: string): Promise<boolean> {
  await ensureFirestoreSeeded();
  if (isFirebaseAdminConfigured()) {
    await getAdminFirestore().collection(COLLECTIONS.NEWS).doc(slug).delete();
  }
  const deleted = getMemoryNews().delete(slug);
  invalidateCache('news');
  return deleted;
}

// ============================================================================
// 5. TEAM REPOSITORY
// ============================================================================
export async function listTeamRepo(): Promise<TeamDocument[]> {
  'use cache';
  cacheLife('minutes');
  cacheTag('team');

  await ensureFirestoreSeeded();
  const mem = getMemoryTeam();

  // Normalize legacy in-memory entry if present
  if (mem.has('jay-raj-roy')) {
    const legacy = mem.get('jay-raj-roy')!;
    mem.delete('jay-raj-roy');
    mem.set('jayrajroy', { ...legacy, slug: 'jayrajroy' });
  }

  if (isFirebaseAdminConfigured()) {
    try {
      const snap = await getAdminFirestore().collection(COLLECTIONS.TEAM).get();
      if (!snap.empty) {
        mem.clear();
        for (const doc of snap.docs) {
        const item = doc.data() as TeamDocument;
        let slug = item.slug || doc.id;
        if (slug === 'jay-raj-roy' || doc.id === 'jay-raj-roy') {
          slug = 'jayrajroy';
          const migrated: TeamDocument = {
            ...item,
            slug: 'jayrajroy',
            updatedAt: new Date().toISOString(),
          };
          const db = getAdminFirestore();
          db.collection(COLLECTIONS.TEAM)
            .doc('jayrajroy')
            .set(stripUndefined(migrated), { merge: true })
            .catch(() => {});
          if (doc.id === 'jay-raj-roy') {
            db.collection(COLLECTIONS.TEAM)
              .doc('jay-raj-roy')
              .delete()
              .catch(() => {});
          }
          mem.set('jayrajroy', migrated);
          continue;
        }
        mem.set(slug, {
          ...item,
          slug,
        });
      }
    }
    } catch (err) {
      console.error('[listTeamRepo Error]:', err);
    }
  }

  return Array.from(mem.values()).sort(
    (a, b) => (a.order ?? 99) - (b.order ?? 99)
  );
}

export async function getTeamMemberRepo(
  slug: string
): Promise<TeamDocument | undefined> {
  'use cache';
  cacheLife('minutes');
  cacheTag('team');

  const normalized = slug === 'jay-raj-roy' ? 'jayrajroy' : slug;
  const all = await listTeamRepo();
  return all.find((m) => m.slug === normalized);
}

export async function upsertTeamMemberRepo(
  doc: TeamDocument
): Promise<TeamDocument> {
  await ensureFirestoreSeeded();
  const normalizedSlug = doc.slug === 'jay-raj-roy' ? 'jayrajroy' : doc.slug;
  const payload = stripUndefined({
    ...doc,
    slug: normalizedSlug,
    updatedAt: new Date().toISOString(),
  });

  if (isFirebaseAdminConfigured()) {
    const db = getAdminFirestore();
    await db
      .collection(COLLECTIONS.TEAM)
      .doc(normalizedSlug)
      .set(payload, { merge: true });
    if (doc.slug === 'jay-raj-roy') {
      await db.collection(COLLECTIONS.TEAM).doc('jay-raj-roy').delete().catch(() => {});
    }
  }

  getMemoryTeam().delete('jay-raj-roy');
  getMemoryTeam().set(normalizedSlug, payload);
  invalidateCache('team');
  return payload;
}

export async function deleteTeamMemberRepo(slug: string): Promise<boolean> {
  await ensureFirestoreSeeded();
  const normalized = slug === 'jay-raj-roy' ? 'jayrajroy' : slug;
  if (isFirebaseAdminConfigured()) {
    const db = getAdminFirestore();
    await db.collection(COLLECTIONS.TEAM).doc(normalized).delete();
    if (slug === 'jay-raj-roy') {
      await db.collection(COLLECTIONS.TEAM).doc('jay-raj-roy').delete().catch(() => {});
    }
  }
  getMemoryTeam().delete('jay-raj-roy');
  const deleted = getMemoryTeam().delete(normalized);
  invalidateCache('team');
  return deleted;
}

// ============================================================================
// 7. GALLERY REPOSITORY
// ============================================================================
export async function listGalleryRepo(options?: {
  category?: string;
}): Promise<GalleryDocument[]> {
  'use cache';
  cacheLife('minutes');
  cacheTag('gallery');

  await ensureFirestoreSeeded();
  const mem = getMemoryGallery();

  if (isFirebaseAdminConfigured()) {
    try {
      const snap = await getAdminFirestore()
        .collection(COLLECTIONS.GALLERY)
        .get();
      if (!snap.empty) {
        mem.clear();
        for (const doc of snap.docs) {
        const item = doc.data() as GalleryDocument;
        mem.set(item.id || doc.id, {
          ...item,
          id: item.id || doc.id,
        });
      }
    }
    } catch (err) {
      console.error('[listGalleryRepo Error]:', err);
    }
  }

  const all = Array.from(mem.values());
  if (options?.category && options.category !== 'All') {
    return all.filter((g) => g.category === options.category);
  }
  return all;
}

export async function upsertGalleryPhotoRepo(
  doc: GalleryDocument
): Promise<GalleryDocument> {
  await ensureFirestoreSeeded();
  const payload = stripUndefined({
    ...doc,
    updatedAt: new Date().toISOString(),
  });

  if (isFirebaseAdminConfigured()) {
    await getAdminFirestore()
      .collection(COLLECTIONS.GALLERY)
      .doc(doc.id)
      .set(payload, { merge: true });
  }

  getMemoryGallery().set(doc.id, payload);
  invalidateCache('gallery');
  return payload;
}

export async function deleteGalleryPhotoRepo(id: string): Promise<boolean> {
  await ensureFirestoreSeeded();
  if (isFirebaseAdminConfigured()) {
    await getAdminFirestore().collection(COLLECTIONS.GALLERY).doc(id).delete();
  }
  const deleted = getMemoryGallery().delete(id);
  invalidateCache('gallery');
  return deleted;
}

// ============================================================================
// 8. SETTINGS REPOSITORY
// ============================================================================
export async function getSettingsRepo(): Promise<SettingsDocument> {
  'use cache';
  cacheLife('minutes');
  cacheTag('settings');

  await ensureFirestoreSeeded();
  const mem = getMemorySettings();

  if (isFirebaseAdminConfigured()) {
    try {
      const doc = await getAdminFirestore()
        .collection(COLLECTIONS.SETTINGS)
        .doc('site')
        .get();
      if (doc.exists) {
        const data = {
          ...DEFAULT_SETTINGS,
          ...(doc.data() as Partial<SettingsDocument>),
        };
        globalStore.__jmmSettings = data;
        return data;
      }
    } catch (err) {
      console.error('[getSettingsRepo Error]:', err);
    }
  }

  return mem;
}

export async function updateSettingsRepo(
  updates: Partial<SettingsDocument>
): Promise<SettingsDocument> {
  const current = await getSettingsRepo();
  const updated: SettingsDocument = stripUndefined({
    ...current,
    ...updates,
    updatedAt: new Date().toISOString(),
  });

  if (isFirebaseAdminConfigured()) {
    await getAdminFirestore()
      .collection(COLLECTIONS.SETTINGS)
      .doc('site')
      .set(updated, { merge: true });
  }

  globalStore.__jmmSettings = updated;
  invalidateCache('settings');
  return updated;
}

// ============================================================================
// 9. ADMIN OVERVIEW AGGREGATOR
// ============================================================================
export async function getAdminOverviewRepo() {
  'use cache';
  cacheLife('minutes');
  cacheTag('overview', 'events', 'inquiries', 'news', 'team', 'gallery', 'settings');

  const [events, inquiries, news, team, gallery] =
    await Promise.all([
      listEventsRepo({ includeDrafts: true }),
      listInquiriesRepo(),
      listNewsRepo({ includeDrafts: true }),
      listTeamRepo(),
      listGalleryRepo(),
    ]);

  return {
    counts: {
      eventsTotal: events.length,
      eventsPublished: events.filter((e) => e.status !== 'draft').length,
      inquiriesTotal: inquiries.length,
      inquiriesNew: inquiries.filter((i) => i.status === 'new').length,
      newsTotal: news.length,
      teamTotal: team.length,
      galleryTotal: gallery.length,
    },
    recentInquiries: inquiries.slice(0, 5),
    events: events.slice(0, 6),
    firebaseConnected: isFirebaseAdminConfigured(),
    projectId: process.env.FIREBASE_PROJECT_ID || 'jay-media-management',
  };
}
