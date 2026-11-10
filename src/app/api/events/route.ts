import { NextResponse } from 'next/server';
import type { EventDetailData } from '@/config/events-data';
import {
  getEventBySlug,
  getEventsRegistry,
  listEvents,
  slugifyEventTitle,
} from '@/lib/events-store';

/**
 * Dynamic Events Catalog API backed by in-memory store seeded with EVENTS_DATA.
 * Swap reads/writes to Firebase Firestore `events` collection when configured.
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get('slug')?.trim();
  const includeDrafts = searchParams.get('all') === '1';

  if (slug) {
    const event = getEventBySlug(slug);
    if (!event) {
      return NextResponse.json({ error: `Event "${slug}" not found.` }, { status: 404 });
    }
    return NextResponse.json({ event });
  }

  return NextResponse.json({
    events: listEvents({ includeDrafts }),
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const title = String(body.title || '').trim();
    if (title.length < 2) {
      return NextResponse.json(
        { error: 'Event title is required (minimum 2 characters).' },
        { status: 400 }
      );
    }

    const baseSlug = slugifyEventTitle(String(body.slug || title));
    const registry = getEventsRegistry();
    const slug = registry.has(baseSlug) ? `${baseSlug}-${Date.now().toString().slice(-4)}` : baseSlug;

    const rawPrefix =
      String(body.codePrefix || '')
        .replace(/[^a-zA-Z0-9]/g, '')
        .toUpperCase() ||
      title
        .replace(/[^a-zA-Z0-9\s]/g, ' ')
        .trim()
        .split(/\s+/)
        .map((w) => w[0] || '')
        .join('')
        .slice(0, 4)
        .toUpperCase();
    const codePrefix = rawPrefix || 'JMM';

    const newEvent: EventDetailData = {
      slug,
      title,
      shortLabel: String(body.shortLabel || title).trim(),
      category: String(body.category || 'Stage & Broadcast Production').trim(),
      seasonOrYear: String(body.seasonOrYear || body.season || '2025 Edition').trim(),
      location: String(body.location || 'Biratnagar, Koshi Province').trim(),
      tagline: String(body.tagline || `${title} — Produced by Jay Media Management Pvt. Ltd.`).trim(),
      summary: String(
        body.summary ||
          `${title} organized by Jay Media Management Pvt. Ltd. across Koshi Province and Nepal.`
      ).trim(),
      overview: String(
        body.overview ||
          body.description ||
          `${title} brings full broadcast production, live stage direction, and regional audition coordination from Jay Media Management's Biratnagar studio.`
      ).trim(),
      image:
        String(body.image || '').trim() ||
        'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=1200&q=85',
      heroStageImage:
        String(body.heroStageImage || body.image || '').trim() ||
        'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=1200&q=85',
      registrationOpen: body.registrationOpen !== false,
      status: body.status === 'draft' ? 'draft' : 'published',
      eligibility: String(body.eligibility || 'Open Audition').trim(),
      coverageLabel: String(body.coverageLabel || body.location || 'Koshi Province').trim(),
      prizePoolLabel: String(body.prizePoolLabel || 'Crowns & Cash Awards').trim(),
      codePrefix,
      highlights: Array.isArray(body.highlights) && body.highlights.length > 0
        ? body.highlights
        : [
            `Regional & Live Auditions (${String(body.location || 'Biratnagar')})`,
            'Broadcast Stage Production by Jay Media',
            'Mentorship & Jury Evaluation Panels',
            'Title Honours & Official Press Coverage',
          ],
      scheduleOrPhases: Array.isArray(body.scheduleOrPhases) && body.scheduleOrPhases.length > 0
        ? body.scheduleOrPhases
        : [
            {
              title: 'Auditions & Registration',
              description: 'Open entries across regional desks and digital registration.',
            },
            {
              title: 'Grooming & Studio Mentorship',
              description: 'Stage rehearsals, technical sound checks, and grooming camps.',
            },
            {
              title: 'Grand Finale Showcase',
              description: 'Main arena production recorded for live and digital broadcast.',
            },
          ],
      hallOfFameOrWinners: Array.isArray(body.hallOfFameOrWinners) && body.hallOfFameOrWinners.length > 0
        ? body.hallOfFameOrWinners
        : [
            {
              title: 'Title & Category Honours',
              description: 'Trophies, certificates, and regional media recognition.',
              note: 'Honoring top performers on the Jay Media stage.',
            },
          ].map(({ title: t, note }) => ({ title: t, note })),
      productionScope: Array.isArray(body.productionScope) && body.productionScope.length > 0
        ? body.productionScope
        : [
            'Complete stage design and DMX lighting choreography',
            'Multicam HD/4K recording and live broadcast coverage',
            'Contestant coordination and backstage management',
          ],
    };

    registry.set(slug, newEvent);
    return NextResponse.json({ success: true, event: newEvent }, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Unable to create event.' }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const slug = String(body.slug || '').trim();
    const existing = slug ? getEventBySlug(slug) : undefined;
    if (!existing) {
      return NextResponse.json({ error: `Event "${slug}" not found.` }, { status: 404 });
    }

    const updated: EventDetailData = {
      ...existing,
      ...(body.title !== undefined && { title: String(body.title).trim() }),
      ...(body.category !== undefined && { category: String(body.category).trim() }),
      ...(body.seasonOrYear !== undefined && { seasonOrYear: String(body.seasonOrYear).trim() }),
      ...(body.location !== undefined && { location: String(body.location).trim() }),
      ...(body.tagline !== undefined && { tagline: String(body.tagline).trim() }),
      ...(body.summary !== undefined && { summary: String(body.summary).trim() }),
      ...(body.overview !== undefined && { overview: String(body.overview).trim() }),
      ...(body.eligibility !== undefined && { eligibility: String(body.eligibility).trim() }),
      ...(body.prizePoolLabel !== undefined && { prizePoolLabel: String(body.prizePoolLabel).trim() }),
      ...(body.registrationOpen !== undefined && { registrationOpen: Boolean(body.registrationOpen) }),
      ...(body.status !== undefined && {
        status: body.status === 'draft' ? 'draft' : 'published',
      }),
    };

    getEventsRegistry().set(slug, updated);
    return NextResponse.json({ success: true, event: updated });
  } catch {
    return NextResponse.json({ error: 'Unable to update event.' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get('slug')?.trim();
  const registry = getEventsRegistry();
  if (!slug || !registry.has(slug)) {
    return NextResponse.json({ error: `Event "${slug || ''}" not found.` }, { status: 404 });
  }
  registry.delete(slug);
  return NextResponse.json({ success: true, slug });
}

