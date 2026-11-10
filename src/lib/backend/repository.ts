import { EVENTS_DATA, type EventDetailData } from '@/config/events-data';
import { NEWS_DATA } from '@/config/news-data';
import { SERVICES_DATA } from '@/config/services-data';
import { TEAM_PROFILES } from '@/config/team-data';
import { GALLERY_PHOTOS } from '@/config/gallery-data';
import { siteConfig } from '@/config/site';
import { getAdminFirestore, isFirebaseAdminConfigured } from '@/lib/firebase/admin';
import {
  COLLECTIONS,
  type RegistrationDocument,
  type InquiryDocument,
  type NewsDocument,
  type ServiceDocument,
  type TeamDocument,
  type GalleryDocument,
  type SettingsDocument,
} from './schemas';
import { getEventsRegistry } from '@/lib/events-store';

const DEFAULT_SETTINGS: SettingsDocument = {
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
  updatedAt: new Date().toISOString(),
};

const SEED_INQUIRIES: InquiryDocument[] = [
  {
    id: 'inq-koshi-conclave',
    fullName: 'Ramesh Karki',
    email: 'ramesh.karki@koshitrade.np',
    phone: '+977 9801234567',
    organization: 'Koshi Trade & Export Conclave',
    serviceOfInterest: 'Event Management & Execution',
    eventDate: '2026-11-28',
    budget: 'NPR 10 Lakhs+',
    message:
      'We are planning the annual Koshi Province industrial trade summit in Biratnagar and require full stage architecture, line-array sound engineering, and executive seating protocol.',
    status: 'new',
    priority: 'high',
    adminNotes: 'Follow up with technical rider and 3D stage layout.',
    createdAt: '2026-11-08T14:30:00.000Z',
    updatedAt: '2026-11-08T14:30:00.000Z',
  },
  {
    id: 'inq-eastern-echoes-sponsor',
    fullName: 'Sunita Sharma',
    email: 'sunita@beveragenepal.com',
    phone: '+977 9851098765',
    organization: 'Apex Beverages Ltd.',
    serviceOfInterest: 'Brand Experiences & Activations',
    eventDate: '2026-12-19',
    budget: 'NPR 15 Lakhs+',
    message:
      'Interested in co-sponsoring Eastern Echoes (Atif Aslam Live at Itahari Stadium) with exclusive beverage stalls and VIP enclosure branding.',
    status: 'in_progress',
    priority: 'high',
    adminNotes: 'Sent sponsorship deck and stadium enclosure map.',
    createdAt: '2026-11-07T10:15:00.000Z',
    updatedAt: '2026-11-09T09:00:00.000Z',
  },
  {
    id: 'inq-suv-launch',
    fullName: 'Anil Shrestha',
    email: 'anil@motorgroup.com',
    phone: '+977 9812345678',
    organization: 'Eastern Auto Ventures',
    serviceOfInterest: 'Product & Store Launches',
    eventDate: '2026-12-05',
    budget: 'NPR 5 Lakhs - 10 Lakhs',
    message:
      'Looking for an unveiling ceremony (kabuki drop, cold pyrotechnics, and press conference setup) for our new EV showroom opening on Main Road, Biratnagar.',
    status: 'contacted',
    priority: 'medium',
    adminNotes: 'Site visit scheduled at Main Road showroom.',
    createdAt: '2026-11-05T16:45:00.000Z',
    updatedAt: '2026-11-06T11:20:00.000Z',
  },
];

const SEED_REGISTRATIONS: RegistrationDocument[] = [
  {
    userCode: 'NKI-104829',
    eventSlug: 'nepal-kids-idol',
    eventTitle: 'Nepal Kids Idol',
    name: 'Aarav Adhikari',
    phone: '+977 9842011223',
    age: 12,
    gender: 'Male',
    address: 'Biratnagar-09, Morang',
    school: 'St. Joseph Secondary School',
    hobbies: 'Classical & modern Nepali vocals, harmonium',
    auditionMode: 'In-Person District Audition',
    auditionVideoUrl: '',
    photoFilename: 'aarav-passport.jpg',
    parentName: 'Deepak Adhikari',
    parentEmail: 'deepak.adhikari@gmail.com',
    parentPhone: '+977 9842011223',
    paymentTransactionId: 'KHL-9928341',
    paymentReceiptFilename: 'khalti-receipt-9928341.png',
    status: 'Verified — Audition Scheduled',
    auditionHub: 'Central Mall, Main Road, Biratnagar',
    adminNotes: 'Payment verified via Khalti. Assigned Morning Slot A.',
    submittedAt: '2026-11-06T08:15:00.000Z',
    updatedAt: '2026-11-06T11:00:00.000Z',
  },
  {
    userCode: 'MK-202501',
    eventSlug: 'miss-koshi',
    eventTitle: 'Miss Koshi Grand Pageant',
    name: 'Pratiksha Rai',
    phone: '+977 9814322110',
    age: 20,
    gender: 'Female',
    address: 'Itahari-04, Sunsari',
    school: 'Koshi St. James College',
    hobbies: 'Public speaking, cultural dance, community volunteering',
    auditionMode: 'In-Person District Audition',
    auditionVideoUrl: '',
    photoFilename: 'pratiksha-portrait.jpg',
    parentName: 'Harka Bahadur Rai',
    parentEmail: 'pratiksha.rai@outlook.com',
    parentPhone: '+977 9842199887',
    paymentTransactionId: 'ESW-7741209',
    paymentReceiptFilename: 'esewa-mk-7741209.jpg',
    status: 'Shortlisted',
    auditionHub: 'Central Mall, Main Road, Biratnagar',
    adminNotes: 'Strong stage presence during preliminary orientation.',
    submittedAt: '2026-11-07T13:40:00.000Z',
    updatedAt: '2026-11-08T16:20:00.000Z',
  },
  {
    userCode: 'NKI-389104',
    eventSlug: 'nepal-kids-idol',
    eventTitle: 'Nepal Kids Idol',
    name: 'Sneha Limbu',
    phone: '+977 9807055441',
    age: 10,
    gender: 'Female',
    address: 'Dharan-12, Sunsari',
    school: 'Delhi Public School, Dharan',
    hobbies: 'Singing, acoustic guitar',
    auditionMode: 'Online Video Audition',
    auditionVideoUrl: 'https://youtu.be/dQw4w9WgXcQ',
    photoFilename: 'sneha-photo.png',
    parentName: 'Meena Limbu',
    parentEmail: 'meena.limbu@gmail.com',
    parentPhone: '+977 9807055441',
    paymentTransactionId: 'FNP-552019',
    paymentReceiptFilename: 'fonepay-552019.jpg',
    status: 'Pending QR Verification',
    auditionHub: 'Online Global Desk — Jay Media Digital Portal',
    adminNotes: '',
    submittedAt: '2026-11-09T09:25:00.000Z',
    updatedAt: '2026-11-09T09:25:00.000Z',
  },
];

// Global in-memory cache so SSR & dev hot-reloads remain fast and consistent
const globalStore = globalThis as typeof globalThis & {
  __jmmSeededFirestore?: boolean;
  __jmmNews?: Map<string, NewsDocument>;
  __jmmServices?: Map<string, ServiceDocument>;
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

function getMemoryServices(): Map<string, ServiceDocument> {
  if (!globalStore.__jmmServices) {
    globalStore.__jmmServices = new Map(
      SERVICES_DATA.map((s) => [
        s.slug,
        {
          ...s,
          status: 'active' as const,
          createdAt: '2026-01-01T00:00:00.000Z',
          updatedAt: '2026-01-01T00:00:00.000Z',
        },
      ])
    );
  }
  return globalStore.__jmmServices;
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
    globalStore.__jmmInquiries = new Map(SEED_INQUIRIES.map((i) => [i.id, i]));
  }
  return globalStore.__jmmInquiries;
}

function getMemoryRegistrations(): Map<string, RegistrationDocument> {
  if (!globalStore.__jmmRegistrations) {
    globalStore.__jmmRegistrations = new Map(
      SEED_REGISTRATIONS.map((r) => [r.userCode, r])
    );
  }
  return globalStore.__jmmRegistrations;
}

function getMemorySettings(): SettingsDocument {
  if (!globalStore.__jmmSettings) {
    globalStore.__jmmSettings = { ...DEFAULT_SETTINGS };
  }
  return globalStore.__jmmSettings;
}

/**
 * Strip `undefined` fields recursively before writing to Firestore.
 */
function stripUndefined<T>(obj: T): T {
  return JSON.parse(JSON.stringify(obj)) as T;
}

/**
 * Ensure initial seed documents exist in Firestore on first run.
 */
export async function ensureFirestoreSeeded(): Promise<void> {
  if (globalStore.__jmmSeededFirestore || !isFirebaseAdminConfigured()) {
    return;
  }
  globalStore.__jmmSeededFirestore = true;

  try {
    const db = getAdminFirestore();

    // 1. Events
    const eventsSnap = await db.collection(COLLECTIONS.EVENTS).get();
    const existingEventSlugs = new Set(eventsSnap.docs.map((d) => d.id));
    const eventsBatch = db.batch();
    let eventsBatchCount = 0;

    for (const ev of EVENTS_DATA) {
      if (!existingEventSlugs.has(ev.slug)) {
        eventsBatch.set(
          db.collection(COLLECTIONS.EVENTS).doc(ev.slug),
          stripUndefined({
            ...ev,
            status: ev.status || 'published',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          })
        );
        eventsBatchCount++;
      }
    }
    if (eventsBatchCount > 0) {
      await eventsBatch.commit();
    }

    // 2. News
    const newsSnap = await db.collection(COLLECTIONS.NEWS).limit(1).get();
    if (newsSnap.empty) {
      const batch = db.batch();
      for (const item of getMemoryNews().values()) {
        batch.set(
          db.collection(COLLECTIONS.NEWS).doc(item.slug),
          stripUndefined(item)
        );
      }
      await batch.commit();
    }

    // 3. Services
    const servicesSnap = await db.collection(COLLECTIONS.SERVICES).limit(1).get();
    if (servicesSnap.empty) {
      const batch = db.batch();
      for (const item of getMemoryServices().values()) {
        batch.set(
          db.collection(COLLECTIONS.SERVICES).doc(item.slug),
          stripUndefined(item)
        );
      }
      await batch.commit();
    }

    // 4. Team
    const teamSnap = await db.collection(COLLECTIONS.TEAM).limit(1).get();
    if (teamSnap.empty) {
      const batch = db.batch();
      for (const item of getMemoryTeam().values()) {
        batch.set(
          db.collection(COLLECTIONS.TEAM).doc(item.slug),
          stripUndefined(item)
        );
      }
      await batch.commit();
    }

    // 5. Gallery
    const gallerySnap = await db.collection(COLLECTIONS.GALLERY).limit(1).get();
    if (gallerySnap.empty) {
      const batch = db.batch();
      for (const item of getMemoryGallery().values()) {
        batch.set(
          db.collection(COLLECTIONS.GALLERY).doc(item.id),
          stripUndefined(item)
        );
      }
      await batch.commit();
    }

    // 6. Inquiries
    const inqSnap = await db.collection(COLLECTIONS.INQUIRIES).limit(1).get();
    if (inqSnap.empty) {
      const batch = db.batch();
      for (const item of getMemoryInquiries().values()) {
        batch.set(
          db.collection(COLLECTIONS.INQUIRIES).doc(item.id),
          stripUndefined(item)
        );
      }
      await batch.commit();
    }

    // 7. Registrations
    const regSnap = await db.collection(COLLECTIONS.REGISTRATIONS).limit(1).get();
    if (regSnap.empty) {
      const batch = db.batch();
      for (const item of getMemoryRegistrations().values()) {
        batch.set(
          db.collection(COLLECTIONS.REGISTRATIONS).doc(item.userCode),
          stripUndefined(item)
        );
      }
      await batch.commit();
    }

    // 8. Settings
    const settingsDoc = await db
      .collection(COLLECTIONS.SETTINGS)
      .doc('site')
      .get();
    if (!settingsDoc.exists) {
      await db
        .collection(COLLECTIONS.SETTINGS)
        .doc('site')
        .set(stripUndefined(DEFAULT_SETTINGS));
    }
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
  await ensureFirestoreSeeded();
  const registry = getEventsRegistry();

  if (isFirebaseAdminConfigured()) {
    try {
      const snap = await getAdminFirestore()
        .collection(COLLECTIONS.EVENTS)
        .get();
      if (!snap.empty) {
        const docs = snap.docs.map((d) => d.data() as EventDetailData);
        // Keep flagship order first, followed by newly created events
        const flagshipOrder = new Map(
          EVENTS_DATA.map((e, idx) => [e.slug, idx])
        );
        docs.sort((a, b) => {
          const ia = flagshipOrder.has(a.slug)
            ? flagshipOrder.get(a.slug)!
            : 999;
          const ib = flagshipOrder.has(b.slug)
            ? flagshipOrder.get(b.slug)!
            : 999;
          return ia - ib;
        });

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
  return getEventsRegistry().delete(slug);
}

// ============================================================================
// 2. REGISTRATIONS REPOSITORY
// ============================================================================
export async function listRegistrationsRepo(options?: {
  eventSlug?: string;
  status?: string;
}): Promise<RegistrationDocument[]> {
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
  return getMemoryRegistrations().delete(code);
}

// ============================================================================
// 3. INQUIRIES REPOSITORY
// ============================================================================
export async function listInquiriesRepo(options?: {
  status?: string;
}): Promise<InquiryDocument[]> {
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
            createdAt: data.createdAt || new Date().toISOString(),
            updatedAt: data.updatedAt || data.createdAt || new Date().toISOString(),
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
  return getMemoryInquiries().delete(id);
}

// ============================================================================
// 4. NEWS REPOSITORY
// ============================================================================
export async function listNewsRepo(options?: {
  includeDrafts?: boolean;
}): Promise<NewsDocument[]> {
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
  return payload;
}

export async function deleteNewsRepo(slug: string): Promise<boolean> {
  await ensureFirestoreSeeded();
  if (isFirebaseAdminConfigured()) {
    await getAdminFirestore().collection(COLLECTIONS.NEWS).doc(slug).delete();
  }
  return getMemoryNews().delete(slug);
}

// ============================================================================
// 5. SERVICES REPOSITORY
// ============================================================================
export async function listServicesRepo(options?: {
  includeDrafts?: boolean;
}): Promise<ServiceDocument[]> {
  await ensureFirestoreSeeded();
  const mem = getMemoryServices();

  if (isFirebaseAdminConfigured()) {
    try {
      const snap = await getAdminFirestore()
        .collection(COLLECTIONS.SERVICES)
        .get();
      if (!snap.empty) {
        mem.clear();
        for (const doc of snap.docs) {
          const item = doc.data() as ServiceDocument;
          mem.set(item.slug || doc.id, {
            ...item,
            slug: item.slug || doc.id,
            status: item.status || 'active',
          });
        }
      }
    } catch (err) {
      console.error('[listServicesRepo Error]:', err);
    }
  }

  const all = Array.from(mem.values()).sort((a, b) =>
    (a.number || '').localeCompare(b.number || '')
  );
  if (options?.includeDrafts) return all;
  return all.filter((s) => s.status !== 'draft');
}

export async function upsertServiceRepo(
  doc: ServiceDocument
): Promise<ServiceDocument> {
  await ensureFirestoreSeeded();
  const payload = stripUndefined({
    ...doc,
    updatedAt: new Date().toISOString(),
  });

  if (isFirebaseAdminConfigured()) {
    await getAdminFirestore()
      .collection(COLLECTIONS.SERVICES)
      .doc(doc.slug)
      .set(payload, { merge: true });
  }

  getMemoryServices().set(doc.slug, payload);
  return payload;
}

export async function deleteServiceRepo(slug: string): Promise<boolean> {
  await ensureFirestoreSeeded();
  if (isFirebaseAdminConfigured()) {
    await getAdminFirestore()
      .collection(COLLECTIONS.SERVICES)
      .doc(slug)
      .delete();
  }
  return getMemoryServices().delete(slug);
}

// ============================================================================
// 6. TEAM REPOSITORY
// ============================================================================
export async function listTeamRepo(): Promise<TeamDocument[]> {
  await ensureFirestoreSeeded();
  const mem = getMemoryTeam();

  if (isFirebaseAdminConfigured()) {
    try {
      const snap = await getAdminFirestore().collection(COLLECTIONS.TEAM).get();
      if (!snap.empty) {
        mem.clear();
        for (const doc of snap.docs) {
          const item = doc.data() as TeamDocument;
          mem.set(item.slug || doc.id, {
            ...item,
            slug: item.slug || doc.id,
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

export async function upsertTeamMemberRepo(
  doc: TeamDocument
): Promise<TeamDocument> {
  await ensureFirestoreSeeded();
  const payload = stripUndefined({
    ...doc,
    updatedAt: new Date().toISOString(),
  });

  if (isFirebaseAdminConfigured()) {
    await getAdminFirestore()
      .collection(COLLECTIONS.TEAM)
      .doc(doc.slug)
      .set(payload, { merge: true });
  }

  getMemoryTeam().set(doc.slug, payload);
  return payload;
}

export async function deleteTeamMemberRepo(slug: string): Promise<boolean> {
  await ensureFirestoreSeeded();
  if (isFirebaseAdminConfigured()) {
    await getAdminFirestore().collection(COLLECTIONS.TEAM).doc(slug).delete();
  }
  return getMemoryTeam().delete(slug);
}

// ============================================================================
// 7. GALLERY REPOSITORY
// ============================================================================
export async function listGalleryRepo(options?: {
  category?: string;
}): Promise<GalleryDocument[]> {
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
  return payload;
}

export async function deleteGalleryPhotoRepo(id: string): Promise<boolean> {
  await ensureFirestoreSeeded();
  if (isFirebaseAdminConfigured()) {
    await getAdminFirestore().collection(COLLECTIONS.GALLERY).doc(id).delete();
  }
  return getMemoryGallery().delete(id);
}

// ============================================================================
// 8. SETTINGS REPOSITORY
// ============================================================================
export async function getSettingsRepo(): Promise<SettingsDocument> {
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
  return updated;
}

// ============================================================================
// 9. ADMIN OVERVIEW AGGREGATOR
// ============================================================================
export async function getAdminOverviewRepo() {
  const [events, registrations, inquiries, news, services, team, gallery] =
    await Promise.all([
      listEventsRepo({ includeDrafts: true }),
      listRegistrationsRepo(),
      listInquiriesRepo(),
      listNewsRepo({ includeDrafts: true }),
      listServicesRepo({ includeDrafts: true }),
      listTeamRepo(),
      listGalleryRepo(),
    ]);

  return {
    counts: {
      eventsTotal: events.length,
      eventsPublished: events.filter((e) => e.status !== 'draft').length,
      eventsOpenRegistration: events.filter((e) => e.registrationOpen).length,
      registrationsTotal: registrations.length,
      registrationsPending: registrations.filter(
        (r) => r.status === 'Pending QR Verification'
      ).length,
      registrationsVerified: registrations.filter(
        (r) =>
          r.status === 'Verified — Audition Scheduled' ||
          r.status === 'Shortlisted'
      ).length,
      inquiriesTotal: inquiries.length,
      inquiriesNew: inquiries.filter((i) => i.status === 'new').length,
      newsTotal: news.length,
      servicesTotal: services.length,
      teamTotal: team.length,
      galleryTotal: gallery.length,
    },
    recentRegistrations: registrations.slice(0, 5),
    recentInquiries: inquiries.slice(0, 5),
    events: events.slice(0, 6),
    firebaseConnected: isFirebaseAdminConfigured(),
    projectId: process.env.FIREBASE_PROJECT_ID || 'jay-media-management',
  };
}
