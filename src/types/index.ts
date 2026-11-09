/**
 * Core type definitions for Jay Media Management.
 */

// ─── Timestamps ────────────────────────────────────────────
export interface Timestamps {
  createdAt: Date;
  updatedAt: Date;
}

// ─── Publication Status ────────────────────────────────────
export type PublicationStatus = 'draft' | 'published' | 'archived';

// ─── Base Document ─────────────────────────────────────────
export interface BaseDocument extends Timestamps {
  id: string;
  status: PublicationStatus;
  order?: number;
}

// ─── SEO Metadata ──────────────────────────────────────────
export interface SEOMetadata {
  metaTitle?: string;
  metaDescription?: string;
  ogImage?: string;
  canonicalUrl?: string;
}

// ─── Service ───────────────────────────────────────────────
export interface Service extends BaseDocument, SEOMetadata {
  title: string;
  slug: string;
  shortDescription: string;
  description: string;
  coverImage: string;
  images: string[];
  capabilities: string[];
  featured: boolean;
}

// ─── Event Category ────────────────────────────────────────
export interface EventCategory extends BaseDocument {
  name: string;
  slug: string;
  description: string;
}

// ─── Event ─────────────────────────────────────────────────
export interface EventItem extends BaseDocument, SEOMetadata {
  title: string;
  slug: string;
  category: string; // category ID
  categoryName?: string;
  shortDescription: string;
  description: string;
  coverImage: string;
  gallery: string[];
  videoUrl?: string;
  year?: string;
  season?: string;
  location?: string;
  highlights: string[];
  featured: boolean;
}

// ─── Team Member ───────────────────────────────────────────
export interface TeamMember extends BaseDocument {
  name: string;
  designation: string;
  biography: string;
  portrait: string;
  socialLinks: {
    facebook?: string;
    instagram?: string;
    linkedin?: string;
    twitter?: string;
  };
  featured: boolean;
}

// ─── Gallery Item ──────────────────────────────────────────
export interface GalleryItem extends BaseDocument {
  imageUrl: string;
  caption?: string;
  category?: string;
  eventId?: string;
  eventName?: string;
  width?: number;
  height?: number;
}

// ─── News Article ──────────────────────────────────────────
export interface NewsArticle extends BaseDocument, SEOMetadata {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string;
  category: string;
  author: string;
  publishedAt?: Date;
  featured: boolean;
  tags: string[];
}

// ─── Inquiry ───────────────────────────────────────────────
export type InquiryStatus = 'new' | 'contacted' | 'in_progress' | 'completed';

export interface Inquiry extends Timestamps {
  id: string;
  fullName: string;
  email: string;
  phone?: string;
  organization?: string;
  serviceOfInterest?: string;
  eventDate?: string;
  budget?: string;
  message: string;
  status: InquiryStatus;
  internalNotes?: string;
}

// ─── Site Settings ─────────────────────────────────────────
export interface SiteSettings {
  companyName: string;
  logo: string;
  logoLight: string;
  tagline: string;
  introduction: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  province: string;
  country: string;
  socialLinks: {
    facebook?: string;
    instagram?: string;
    youtube?: string;
    tiktok?: string;
    linkedin?: string;
  };
  seoDefaults: SEOMetadata;
}

// ─── Video ─────────────────────────────────────────────────
export interface Video extends BaseDocument {
  title: string;
  description: string;
  thumbnailUrl: string;
  videoUrl: string;
  embedUrl?: string;
  eventId?: string;
  featured: boolean;
}

