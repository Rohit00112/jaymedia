import { connection, NextResponse } from 'next/server';
import { slugifyEventTitle } from '@/lib/events-store';
import { GALLERY_PHOTOS } from '@/config/gallery-data';
import { verifyAdminRequest } from '@/lib/backend/auth';
import type { GalleryDocument } from '@/lib/backend/schemas';
import {
  deleteGalleryPhotoRepo,
  listGalleryRepo,
  upsertGalleryPhotoRepo,
} from '@/lib/backend/repository';

export async function GET(request: Request) {
  await connection();
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category')?.trim();
    const photos = await listGalleryRepo({ category });
    return NextResponse.json({ photos });
  } catch (err) {
    console.error('[API Gallery GET Error]:', err);
    return NextResponse.json({ photos: GALLERY_PHOTOS });
  }
}

export async function POST(request: Request) {
  try {
    const auth = await verifyAdminRequest(request);
    if (!auth.authenticated) {
      return NextResponse.json(
        { error: 'Unauthorized. Administrator access required.' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const title = String(body.title || '').trim();
    const image = String(body.image || '').trim();
    if (!title || !image) {
      return NextResponse.json(
        { error: 'Photo title and image URL are required.' },
        { status: 400 }
      );
    }

    const id = `${slugifyEventTitle(title).slice(0, 28)}-${Date.now().toString().slice(-4)}`;
    const validCategories: GalleryDocument['category'][] = [
      'Eastern Echoes',
      'Miss Koshi 2024',
      'Nepal Kids Idol',
      'Mr. & Miss Little Koshi',
      'Stagecraft',
      'Corporate Galas',
    ];
    const category: GalleryDocument['category'] = validCategories.includes(
      body.category
    )
      ? body.category
      : 'Eastern Echoes';

    const photo = await upsertGalleryPhotoRepo({
      id,
      title,
      badge: String(body.badge || category).trim(),
      category,
      aspect: String(body.aspect || 'aspect-[4/4.5]').trim(),
      image,
      caption: String(body.caption || title).trim(),
      featured: Boolean(body.featured),
      createdAt: new Date().toISOString(),
    });

    return NextResponse.json({ success: true, photo }, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: 'Unable to add gallery photo.' },
      { status: 500 }
    );
  }
}

export async function PATCH(request: Request) {
  try {
    const auth = await verifyAdminRequest(request);
    if (!auth.authenticated) {
      return NextResponse.json(
        { error: 'Unauthorized. Administrator access required.' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const id = String(body.id || '').trim();
    const all = await listGalleryRepo();
    const existing = all.find((p) => p.id === id);
    if (!existing) {
      return NextResponse.json(
        { error: `Photo "${id}" not found.` },
        { status: 404 }
      );
    }

    const updated = await upsertGalleryPhotoRepo({
      ...existing,
      ...(body.title !== undefined && { title: String(body.title).trim() }),
      ...(body.badge !== undefined && { badge: String(body.badge).trim() }),
      ...(body.category !== undefined && { category: body.category }),
      ...(body.image !== undefined && { image: String(body.image).trim() }),
      ...(body.caption !== undefined && {
        caption: String(body.caption).trim(),
      }),
      ...(body.featured !== undefined && { featured: Boolean(body.featured) }),
    });

    return NextResponse.json({ success: true, photo: updated });
  } catch {
    return NextResponse.json(
      { error: 'Unable to update gallery photo.' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  const auth = await verifyAdminRequest(request);
  if (!auth.authenticated) {
    return NextResponse.json(
      { error: 'Unauthorized. Administrator access required.' },
      { status: 401 }
    );
  }

  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id')?.trim();
  if (!id) {
    return NextResponse.json(
      { error: 'Photo ID is required.' },
      { status: 400 }
    );
  }
  await deleteGalleryPhotoRepo(id);
  return NextResponse.json({ success: true, id });
}

