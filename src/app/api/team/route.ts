import { connection, NextResponse } from 'next/server';
import { slugifyEventTitle } from '@/lib/events-store';
import {
  deleteTeamMemberRepo,
  listTeamRepo,
  upsertTeamMemberRepo,
} from '@/lib/backend/repository';

export async function GET() {
  await connection();
  const members = await listTeamRepo();
  return NextResponse.json({ members });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const name = String(body.name || '').trim();
    const role = String(body.role || '').trim();
    if (name.length < 2 || role.length < 2) {
      return NextResponse.json(
        { error: 'Member name and role are required.' },
        { status: 400 }
      );
    }

    const existing = await listTeamRepo();
    const slug = slugifyEventTitle(String(body.slug || name));
    const credits = Array.isArray(body.credits)
      ? body.credits.map(String).filter(Boolean)
      : String(body.credits || '')
          .split(/\n|,/)
          .map((c) => c.trim())
          .filter(Boolean);

    const member = await upsertTeamMemberRepo({
      slug,
      name,
      role,
      category:
        body.category === 'Mentorship' || body.category === 'Event Judges'
          ? body.category
          : 'Executive Leadership',
      location: String(body.location || 'Biratnagar, Nepal').trim(),
      image:
        String(body.image || '').trim() || '/images/official/team-jay.png',
      shortBio: String(
        body.shortBio || `${role} at Jay Media Management Pvt. Ltd.`
      ).trim(),
      fullBio: String(
        body.fullBio ||
          body.shortBio ||
          `${name} serves as ${role} at Jay Media Management Pvt. Ltd. in Biratnagar, Nepal.`
      ).trim(),
      credits:
        credits.length > 0
          ? credits
          : [`${role} — Jay Media Management Pvt. Ltd.`],
      order:
        typeof body.order === 'number' ? body.order : existing.length + 1,
      createdAt: new Date().toISOString(),
    });

    return NextResponse.json({ success: true, member }, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: 'Unable to create team member.' },
      { status: 500 }
    );
  }
}

export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const slug = String(body.slug || '').trim();
    const all = await listTeamRepo();
    const existing = all.find((m) => m.slug === slug);
    if (!existing) {
      return NextResponse.json(
        { error: `Team member "${slug}" not found.` },
        { status: 404 }
      );
    }

    const credits =
      body.credits !== undefined
        ? Array.isArray(body.credits)
          ? body.credits.map(String).filter(Boolean)
          : String(body.credits)
              .split(/\n|,/)
              .map((c) => c.trim())
              .filter(Boolean)
        : existing.credits;

    const updated = await upsertTeamMemberRepo({
      ...existing,
      ...(body.name !== undefined && { name: String(body.name).trim() }),
      ...(body.role !== undefined && { role: String(body.role).trim() }),
      ...(body.category !== undefined && { category: body.category }),
      ...(body.location !== undefined && {
        location: String(body.location).trim(),
      }),
      ...(body.image !== undefined && { image: String(body.image).trim() }),
      ...(body.shortBio !== undefined && {
        shortBio: String(body.shortBio).trim(),
      }),
      ...(body.fullBio !== undefined && {
        fullBio: String(body.fullBio).trim(),
      }),
      credits,
      ...(body.order !== undefined && { order: Number(body.order) || 1 }),
    });

    return NextResponse.json({ success: true, member: updated });
  } catch {
    return NextResponse.json(
      { error: 'Unable to update team member.' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get('slug')?.trim();
  if (!slug) {
    return NextResponse.json(
      { error: 'Team member slug is required.' },
      { status: 400 }
    );
  }
  await deleteTeamMemberRepo(slug);
  return NextResponse.json({ success: true, slug });
}

