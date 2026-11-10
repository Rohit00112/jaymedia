import { z } from 'zod';

/**
 * Firestore Collection Names for Jay Media Management (`jay-media-management`).
 */
export const COLLECTIONS = {
  EVENTS: 'events',
  REGISTRATIONS: 'registrations',
  INQUIRIES: 'inquiries',
  NEWS: 'news',
  SERVICES: 'services',
  TEAM: 'team',
  GALLERY: 'gallery',
  SETTINGS: 'settings',
} as const;

// ---------------------------------------------------------------------------
// 1. EVENTS (`events/{slug}`)
// ---------------------------------------------------------------------------
export const eventPhaseSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
});

export const eventWinnerSchema = z.object({
  title: z.string().min(1),
  note: z.string().min(1),
});

export const eventPrizeSchema = z.object({
  rank: z.string().min(1),
  amount: z.string().min(1),
  perks: z.string().optional(),
});

export const eventDocumentSchema = z.object({
  slug: z.string().min(1),
  title: z.string().min(2, 'Event title must be at least 2 characters.'),
  shortLabel: z.string().min(1),
  category: z.string().min(2),
  seasonOrYear: z.string().min(1),
  location: z.string().min(2),
  tagline: z.string().min(2),
  summary: z.string().min(2),
  overview: z.string().min(2),
  image: z.string().min(1),
  heroStageImage: z.string().optional(),
  coverBanner: z.string().optional(),
  registrationOpen: z.boolean().default(true),
  status: z.enum(['published', 'draft']).default('published'),
  eligibility: z.string().default('Open Audition'),
  coverageLabel: z.string().default('Koshi Province & Nationwide'),
  prizePoolLabel: z.string().default('Crowns & Cash Awards'),
  codePrefix: z.string().min(1).max(6).default('JMM'),
  ticketUrl: z.string().optional(),
  ticketPartner: z.string().optional(),
  prizes: z.array(eventPrizeSchema).optional(),
  highlights: z.array(z.string()).default([]),
  scheduleOrPhases: z.array(eventPhaseSchema).default([]),
  hallOfFameOrWinners: z.array(eventWinnerSchema).default([]),
  productionScope: z.array(z.string()).default([]),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
});

export type EventDocument = z.infer<typeof eventDocumentSchema>;

// ---------------------------------------------------------------------------
// 2. REGISTRATIONS (`registrations/{userCode}`)
// ---------------------------------------------------------------------------
export const REGISTRATION_STATUS_OPTIONS = [
  'Pending QR Verification',
  'Verified — Audition Scheduled',
  'Shortlisted',
  'Rejected',
] as const;

export type RegistrationStatusOption = (typeof REGISTRATION_STATUS_OPTIONS)[number];

export const registrationDocumentSchema = z.object({
  userCode: z.string().min(3),
  eventSlug: z.string().min(1),
  eventTitle: z.string().min(1),
  name: z.string().min(2).max(100),
  phone: z.string().min(7).max(20),
  age: z.coerce.number().int().min(4).max(40),
  gender: z.string().min(1),
  address: z.string().min(2).max(160),
  school: z.string().min(2).max(160),
  hobbies: z.string().max(300).optional().default(''),
  auditionMode: z
    .enum(['In-Person District Audition', 'Online Video Audition'])
    .default('In-Person District Audition'),
  auditionVideoUrl: z.string().max(300).optional().default(''),
  photoFilename: z.string().max(200).optional().default(''),
  parentName: z.string().min(2).max(100),
  parentEmail: z.string().optional().default(''),
  parentPhone: z.string().max(20).optional().default(''),
  paymentTransactionId: z.string().max(120).optional().default(''),
  paymentReceiptFilename: z.string().max(200).optional().default(''),
  status: z.enum(REGISTRATION_STATUS_OPTIONS).default('Pending QR Verification'),
  auditionHub: z.string().default('Central Mall, Main Road, Biratnagar'),
  adminNotes: z.string().max(1000).optional().default(''),
  submittedAt: z.string(),
  updatedAt: z.string().optional(),
});

export type RegistrationDocument = z.infer<typeof registrationDocumentSchema>;

// ---------------------------------------------------------------------------
// 3. INQUIRIES (`inquiries/{id}`)
// ---------------------------------------------------------------------------
export const INQUIRY_STATUS_OPTIONS = [
  'new',
  'contacted',
  'in_progress',
  'completed',
  'archived',
] as const;

export type InquiryStatusOption = (typeof INQUIRY_STATUS_OPTIONS)[number];

export const inquiryDocumentSchema = z.object({
  id: z.string().min(1),
  fullName: z.string().min(2).max(100),
  email: z.string().email(),
  phone: z.string().min(7).max(20),
  organization: z.string().max(100).optional().default(''),
  serviceOfInterest: z.string().min(1),
  eventDate: z.string().optional().default(''),
  budget: z.string().optional().default(''),
  message: z.string().min(5).max(2000),
  status: z.enum(INQUIRY_STATUS_OPTIONS).default('new'),
  priority: z.enum(['low', 'medium', 'high']).default('medium'),
  adminNotes: z.string().max(2000).optional().default(''),
  createdAt: z.string(),
  updatedAt: z.string().optional(),
});

export type InquiryDocument = z.infer<typeof inquiryDocumentSchema>;

// ---------------------------------------------------------------------------
// 4. NEWS (`news/{slug}`)
// ---------------------------------------------------------------------------
export const newsDocumentSchema = z.object({
  slug: z.string().min(1),
  title: z.string().min(3),
  category: z.string().min(2),
  date: z.string().min(4),
  author: z.string().default('Jay Media Editorial Board'),
  readTime: z.string().default('4 min read'),
  image: z.string().min(1),
  excerpt: z.string().min(5),
  content: z.array(z.string()).default([]),
  tags: z.array(z.string()).default([]),
  featured: z.boolean().default(false),
  status: z.enum(['published', 'draft']).default('published'),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
});

export type NewsDocument = z.infer<typeof newsDocumentSchema>;

// ---------------------------------------------------------------------------
// 5. SERVICES (`services/{slug}`)
// ---------------------------------------------------------------------------
export const serviceApproachSchema = z.object({
  phase: z.string().min(1),
  title: z.string().min(1),
  detail: z.string().min(1),
});

export const serviceDocumentSchema = z.object({
  slug: z.string().min(1),
  number: z.string().min(1),
  title: z.string().min(2),
  category: z.string().min(2),
  shortDescription: z.string().min(5),
  description: z.string().min(5),
  image: z.string().min(1),
  capabilities: z.array(z.string()).default([]),
  approach: z.array(serviceApproachSchema).default([]),
  deliverables: z.array(z.string()).default([]),
  status: z.enum(['active', 'draft']).default('active'),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
});

export type ServiceDocument = z.infer<typeof serviceDocumentSchema>;

// ---------------------------------------------------------------------------
// 6. TEAM (`team/{slug}`)
// ---------------------------------------------------------------------------
export const teamDocumentSchema = z.object({
  slug: z.string().min(1),
  name: z.string().min(2),
  role: z.string().min(2),
  category: z
    .enum(['Executive Leadership', 'Mentorship', 'Event Judges'])
    .default('Executive Leadership'),
  location: z.string().default('Biratnagar, Nepal'),
  image: z.string().min(1),
  shortBio: z.string().min(5),
  fullBio: z.string().min(5),
  credits: z.array(z.string()).default([]),
  order: z.number().int().default(1),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
});

export type TeamDocument = z.infer<typeof teamDocumentSchema>;

// ---------------------------------------------------------------------------
// 7. GALLERY (`gallery/{id}`)
// ---------------------------------------------------------------------------
export const galleryDocumentSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(2),
  badge: z.string().optional().default('Official Frame'),
  category: z.enum([
    'Eastern Echoes',
    'Miss Koshi 2024',
    'Nepal Kids Idol',
    'Mr. & Miss Little Koshi',
    'Stagecraft',
    'Corporate Galas',
  ]),
  aspect: z.string().default('aspect-[4/4.5]'),
  image: z.string().min(1),
  caption: z.string().min(2),
  featured: z.boolean().default(false),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
});

export type GalleryDocument = z.infer<typeof galleryDocumentSchema>;

// ---------------------------------------------------------------------------
// 8. SITE SETTINGS (`settings/site`)
// ---------------------------------------------------------------------------
export const settingsDocumentSchema = z.object({
  companyName: z.string().min(2),
  shortName: z.string().min(2),
  tagline: z.string().min(2),
  description: z.string().min(5),
  address: z.string().min(2),
  city: z.string().min(2),
  province: z.string().min(2),
  country: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(5),
  secondaryPhone: z.string().optional().default(''),
  officeHours: z.string().default('Sun – Fri: 10:00 AM – 6:00 PM NPT'),
  facebook: z.string().url(),
  instagram: z.string().url(),
  youtube: z.string().url(),
  concertName: z.string().default('Eastern Echoes'),
  concertDateIso: z.string().default('2026-12-19T18:00:00+05:45'),
  concertVenue: z.string().default('Itahari Stadium (Rangasala), Sunsari'),
  concertTicketUrl: z
    .string()
    .default('https://events.khalti.com/events/ET26BJD3F93W'),
  updatedAt: z.string().optional(),
});

export type SettingsDocument = z.infer<typeof settingsDocumentSchema>;

