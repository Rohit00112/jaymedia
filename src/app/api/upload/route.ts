import { connection, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import { verifyAdminRequest } from '@/lib/backend/auth';

const UPLOADS_DIR = path.join(process.cwd(), 'public', 'uploads');
const OFFICIAL_DIR = path.join(process.cwd(), 'public', 'images', 'official');

// Restrict uploads strictly to safe raster image formats
const ALLOWED_EXTENSIONS = new Set([
  '.jpg',
  '.jpeg',
  '.png',
  '.webp',
  '.avif',
]);

const ALLOWED_MIME_TYPES = new Set([
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/avif',
]);

const MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024; // 5 MB ceiling

const HIDDEN_OFFICIAL = new Set([
  'judge-ananda.png',
  'judge-lochan.png',
  'team-rajendra.png',
  'team-rishav.png',
]);

export async function GET() {
  await connection();
  try {
    await fs.mkdir(UPLOADS_DIR, { recursive: true });
    const uploadedFiles = await fs.readdir(UPLOADS_DIR).catch(() => []);
    const officialFiles = await fs.readdir(OFFICIAL_DIR).catch(() => []);

    const uploads = uploadedFiles
      .filter((f) => ALLOWED_EXTENSIONS.has(path.extname(f).toLowerCase()))
      .map((f) => ({
        name: f,
        url: `/uploads/${f}`,
        group: 'Uploaded' as const,
      }))
      .reverse();

    const official = officialFiles
      .filter(
        (f) =>
          ALLOWED_EXTENSIONS.has(path.extname(f).toLowerCase()) &&
          !HIDDEN_OFFICIAL.has(f)
      )
      .map((f) => ({
        name: f.replace(/[-_]/g, ' ').replace(/\.[^.]+$/, ''),
        url: `/images/official/${f}`,
        group: 'Studio Library' as const,
      }));

    return NextResponse.json({
      media: [...uploads, ...official],
    });
  } catch {
    return NextResponse.json({ media: [] });
  }
}

export async function POST(request: Request) {
  try {
    const auth = await verifyAdminRequest(request);
    if (!auth.authenticated) {
      return NextResponse.json(
        { error: auth.error || 'Unauthorized. Administrator access required.' },
        { status: 401 }
      );
    }

    const formData = await request.formData();
    const file = formData.get('file');

    if (!file || !(file instanceof File)) {
      return NextResponse.json(
        { error: 'Please select an image file to upload.' },
        { status: 400 }
      );
    }

    if (file.size > MAX_FILE_SIZE_BYTES) {
      return NextResponse.json(
        { error: 'File size exceeds maximum permitted limit (5 MB).' },
        { status: 400 }
      );
    }

    const ext = path.extname(file.name || '').toLowerCase();
    if (!ALLOWED_EXTENSIONS.has(ext)) {
      return NextResponse.json(
        { error: 'Unsupported format. Permitted formats: JPG, PNG, WebP, AVIF.' },
        { status: 400 }
      );
    }

    if (file.type && !ALLOWED_MIME_TYPES.has(file.type.toLowerCase())) {
      return NextResponse.json(
        { error: 'Invalid file MIME type detected.' },
        { status: 400 }
      );
    }

    const baseName = path
      .basename(file.name, path.extname(file.name))
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')
      .slice(0, 40);

    const fileName = `${Date.now()}-${baseName || 'image'}${ext}`;
    await fs.mkdir(UPLOADS_DIR, { recursive: true });

    const arrayBuffer = await file.arrayBuffer();
    await fs.writeFile(
      path.join(UPLOADS_DIR, fileName),
      Buffer.from(arrayBuffer)
    );

    const url = `/uploads/${fileName}`;
    return NextResponse.json({
      success: true,
      url,
      name: file.name,
    });
  } catch (err) {
    console.error('[Image Upload Error]:', err);
    return NextResponse.json(
      { error: 'Failed to upload image file.' },
      { status: 500 }
    );
  }
}

