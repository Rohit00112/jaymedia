import { connection, NextResponse } from 'next/server';
import { slugifyEventTitle } from '@/lib/events-store';
import { NEWS_DATA } from '@/config/news-data';
import {
  deleteNewsRepo,
  getNewsRepo,
  listNewsRepo,
  upsertNewsRepo,
} from '@/lib/backend/repository';

export async function GET(request: Request) {
  await connection();
  try {
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get('slug')?.trim();
    const includeDrafts = searchParams.get('all') === '1';

    if (slug) {
      const article = await getNewsRepo(slug);
      if (!article) {
        const fallback = NEWS_DATA.find((n) => n.slug === slug);
        if (!fallback) {
          return NextResponse.json(
            { error: `Article "${slug}" not found.` },
            { status: 404 }
          );
        }
        return NextResponse.json({ article: fallback });
      }
      return NextResponse.json({ article });
    }

    const articles = await listNewsRepo({ includeDrafts });
    return NextResponse.json({ articles });
  } catch (err) {
    console.error('[API News GET Error]:', err);
    return NextResponse.json({ articles: NEWS_DATA });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const title = String(body.title || '').trim();
    if (title.length < 3) {
      return NextResponse.json(
        { error: 'Headline is required (min 3 characters).' },
        { status: 400 }
      );
    }

    const baseSlug = slugifyEventTitle(String(body.slug || title));
    const existing = await getNewsRepo(baseSlug);
    const slug = existing
      ? `${baseSlug}-${Date.now().toString().slice(-4)}`
      : baseSlug;

    const rawContent = body.content;
    const paragraphs: string[] = Array.isArray(rawContent)
      ? rawContent.map(String).filter(Boolean)
      : String(rawContent || body.excerpt || title)
          .split(/\n+/)
          .map((p) => p.trim())
          .filter(Boolean);

    const rawTags = body.tags;
    const tags: string[] = Array.isArray(rawTags)
      ? rawTags.map(String).filter(Boolean)
      : String(rawTags || 'Jay Media, Koshi Province')
          .split(',')
          .map((t) => t.trim())
          .filter(Boolean);

    const article = await upsertNewsRepo({
      slug,
      title,
      category: String(body.category || 'Press Release').trim(),
      date:
        String(body.date || '').trim() ||
        new Date().toISOString().split('T')[0],
      author: String(body.author || 'Jay Media Editorial Board').trim(),
      readTime: String(body.readTime || '4 min read').trim(),
      image:
        String(body.image || '').trim() ||
        'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1200&q=80',
      excerpt: String(body.excerpt || paragraphs[0] || title).trim(),
      content: paragraphs,
      tags,
      featured: Boolean(body.featured),
      status: body.status === 'draft' ? 'draft' : 'published',
      createdAt: new Date().toISOString(),
    });

    return NextResponse.json({ success: true, article }, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: 'Unable to publish news article.' },
      { status: 500 }
    );
  }
}

export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const slug = String(body.slug || '').trim();
    const existing = slug ? await getNewsRepo(slug) : undefined;
    if (!existing) {
      return NextResponse.json(
        { error: `Article "${slug}" not found.` },
        { status: 404 }
      );
    }

    const paragraphs =
      body.content !== undefined
        ? Array.isArray(body.content)
          ? body.content.map(String).filter(Boolean)
          : String(body.content)
              .split(/\n+/)
              .map((p) => p.trim())
              .filter(Boolean)
        : existing.content;

    const tags =
      body.tags !== undefined
        ? Array.isArray(body.tags)
          ? body.tags.map(String).filter(Boolean)
          : String(body.tags)
              .split(',')
              .map((t) => t.trim())
              .filter(Boolean)
        : existing.tags;

    const updated = await upsertNewsRepo({
      ...existing,
      ...(body.title !== undefined && { title: String(body.title).trim() }),
      ...(body.category !== undefined && {
        category: String(body.category).trim(),
      }),
      ...(body.date !== undefined && { date: String(body.date).trim() }),
      ...(body.author !== undefined && { author: String(body.author).trim() }),
      ...(body.readTime !== undefined && {
        readTime: String(body.readTime).trim(),
      }),
      ...(body.image !== undefined && { image: String(body.image).trim() }),
      ...(body.excerpt !== undefined && {
        excerpt: String(body.excerpt).trim(),
      }),
      content: paragraphs,
      tags,
      ...(body.featured !== undefined && { featured: Boolean(body.featured) }),
      ...(body.status !== undefined && {
        status: body.status === 'draft' ? 'draft' : 'published',
      }),
    });

    return NextResponse.json({ success: true, article: updated });
  } catch {
    return NextResponse.json(
      { error: 'Unable to update news article.' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get('slug')?.trim();
  if (!slug) {
    return NextResponse.json(
      { error: 'Article slug is required.' },
      { status: 400 }
    );
  }
  await deleteNewsRepo(slug);
  return NextResponse.json({ success: true, slug });
}

