import { NextResponse } from 'next/server';
import { slugifyEventTitle } from '@/lib/events-store';
import {
  deleteServiceRepo,
  listServicesRepo,
  upsertServiceRepo,
} from '@/lib/backend/repository';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const includeDrafts = searchParams.get('all') === '1';
  const services = await listServicesRepo({ includeDrafts });
  return NextResponse.json({ services });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const title = String(body.title || '').trim();
    if (title.length < 2) {
      return NextResponse.json(
        { error: 'Service title is required.' },
        { status: 400 }
      );
    }

    const all = await listServicesRepo({ includeDrafts: true });
    const slug = slugifyEventTitle(String(body.slug || title));
    const nextNumber =
      String(body.number || '').trim() ||
      String(all.length + 1).padStart(2, '0');

    const capabilities = Array.isArray(body.capabilities)
      ? body.capabilities.map(String).filter(Boolean)
      : String(body.capabilities || '')
          .split(/\n|,/)
          .map((s) => s.trim())
          .filter(Boolean);

    const deliverables = Array.isArray(body.deliverables)
      ? body.deliverables.map(String).filter(Boolean)
      : String(body.deliverables || '')
          .split(/\n|,/)
          .map((s) => s.trim())
          .filter(Boolean);

    const service = await upsertServiceRepo({
      slug,
      number: nextNumber,
      title,
      category: String(body.category || 'Stagecraft & Production').trim(),
      shortDescription: String(
        body.shortDescription || body.description || title
      ).trim(),
      description: String(
        body.description || body.shortDescription || title
      ).trim(),
      image:
        String(body.image || '').trim() ||
        'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1200&q=80',
      capabilities:
        capabilities.length > 0
          ? capabilities
          : [
              'Full Stage & Technical Architecture',
              'Sound, Lighting & Broadcast Integration',
              'On-Ground Execution & Protocol Management',
            ],
      approach: Array.isArray(body.approach)
        ? body.approach
        : [
            {
              phase: 'Phase 01',
              title: 'Concept & Technical Blueprint',
              detail:
                'Spatial planning, technical specifications, and venue logistics.',
            },
            {
              phase: 'Phase 02',
              title: 'Production & Synchronization',
              detail:
                'Rigging, audio-visual calibration, and run-sheet rehearsals.',
            },
            {
              phase: 'Phase 03',
              title: 'Live Execution & Delivery',
              detail:
                'Full stage direction, live broadcast, and post-event reporting.',
            },
          ],
      deliverables:
        deliverables.length > 0
          ? deliverables
          : [
              'Technical Run-Sheet & Stage Plot',
              'Live Production & Broadcast Feed',
              'Post-Event Documentation',
            ],
      status: body.status === 'draft' ? 'draft' : 'active',
      createdAt: new Date().toISOString(),
    });

    return NextResponse.json({ success: true, service }, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: 'Unable to create service.' },
      { status: 500 }
    );
  }
}

export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const slug = String(body.slug || '').trim();
    const all = await listServicesRepo({ includeDrafts: true });
    const existing = all.find((s) => s.slug === slug);
    if (!existing) {
      return NextResponse.json(
        { error: `Service "${slug}" not found.` },
        { status: 404 }
      );
    }

    const capabilities =
      body.capabilities !== undefined
        ? Array.isArray(body.capabilities)
          ? body.capabilities.map(String).filter(Boolean)
          : String(body.capabilities)
              .split(/\n/)
              .map((s) => s.trim())
              .filter(Boolean)
        : existing.capabilities;

    const deliverables =
      body.deliverables !== undefined
        ? Array.isArray(body.deliverables)
          ? body.deliverables.map(String).filter(Boolean)
          : String(body.deliverables)
              .split(/\n/)
              .map((s) => s.trim())
              .filter(Boolean)
        : existing.deliverables;

    const updated = await upsertServiceRepo({
      ...existing,
      ...(body.number !== undefined && { number: String(body.number).trim() }),
      ...(body.title !== undefined && { title: String(body.title).trim() }),
      ...(body.category !== undefined && {
        category: String(body.category).trim(),
      }),
      ...(body.shortDescription !== undefined && {
        shortDescription: String(body.shortDescription).trim(),
      }),
      ...(body.description !== undefined && {
        description: String(body.description).trim(),
      }),
      ...(body.image !== undefined && { image: String(body.image).trim() }),
      capabilities,
      deliverables,
      ...(body.status !== undefined && {
        status: body.status === 'draft' ? 'draft' : 'active',
      }),
    });

    return NextResponse.json({ success: true, service: updated });
  } catch {
    return NextResponse.json(
      { error: 'Unable to update service.' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get('slug')?.trim();
  if (!slug) {
    return NextResponse.json(
      { error: 'Service slug is required.' },
      { status: 400 }
    );
  }
  await deleteServiceRepo(slug);
  return NextResponse.json({ success: true, slug });
}

