import { connection, NextResponse } from 'next/server';
import { slugifyEventTitle } from '@/lib/events-store';
import { verifyAdminRequest } from '@/lib/backend/auth';
import { extractYouTubeId } from '@/lib/youtube';
import {
  deleteVideoRepo,
  listVideosRepo,
  upsertVideoRepo,
} from '@/lib/backend/repository';

export async function GET(request: Request) {
  await connection();
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category')?.trim();
    const videos = await listVideosRepo({ category });
    return NextResponse.json({ videos });
  } catch (err) {
    console.error('[API Videos GET Error]:', err);
    return NextResponse.json({ videos: [] });
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
    const rawYoutube = String(body.youtubeId || body.url || '').trim();
    const youtubeId = extractYouTubeId(rawYoutube);
    const category = String(body.category || 'Showreel').trim();
    const subtitle = String(body.subtitle || '').trim();

    if (!title || !youtubeId) {
      return NextResponse.json(
        { error: 'Video title and valid YouTube URL/ID are required.' },
        { status: 400 }
      );
    }

    const existingId = body.id ? String(body.id).trim() : null;
    const id =
      existingId ||
      `${slugifyEventTitle(title).slice(0, 24)}-${Date.now().toString(36).slice(-4)}`;

    const order = typeof body.order === 'number' ? body.order : 0;
    const featured = Boolean(body.featured);

    const video = await upsertVideoRepo({
      id,
      youtubeId,
      title,
      category,
      subtitle: subtitle || title,
      order,
      featured,
      createdAt: body.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });

    return NextResponse.json({ success: true, video }, { status: 201 });
  } catch (err) {
    console.error('[API Videos POST Error]:', err);
    return NextResponse.json(
      { error: 'Internal server error while creating video.' },
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
    if (!id) {
      return NextResponse.json(
        { error: 'Video ID is required.' },
        { status: 400 }
      );
    }

    const title = String(body.title || '').trim();
    const rawYoutube = String(body.youtubeId || body.url || '').trim();
    const youtubeId = extractYouTubeId(rawYoutube);
    const category = String(body.category || 'Showreel').trim();
    const subtitle = String(body.subtitle || '').trim();

    if (!title || !youtubeId) {
      return NextResponse.json(
        { error: 'Video title and valid YouTube URL/ID are required.' },
        { status: 400 }
      );
    }

    const order = typeof body.order === 'number' ? body.order : 0;
    const featured = Boolean(body.featured);

    const video = await upsertVideoRepo({
      id,
      youtubeId,
      title,
      category,
      subtitle: subtitle || title,
      order,
      featured,
      createdAt: body.createdAt,
      updatedAt: new Date().toISOString(),
    });

    return NextResponse.json({ success: true, video });
  } catch (err) {
    console.error('[API Videos PATCH Error]:', err);
    return NextResponse.json(
      { error: 'Internal server error while updating video.' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
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
        { error: 'Video ID is required.' },
        { status: 400 }
      );
    }

    await deleteVideoRepo(id);
    return NextResponse.json({ success: true, id });
  } catch (err) {
    console.error('[API Videos DELETE Error]:', err);
    return NextResponse.json(
      { error: 'Internal server error while deleting video.' },
      { status: 500 }
    );
  }
}

