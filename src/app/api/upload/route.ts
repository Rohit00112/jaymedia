import { connection, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import crypto from 'crypto';
import { verifyAdminRequest } from '@/lib/backend/auth';
import {
  getAdminStorage,
  isFirebaseAdminConfigured,
} from '@/lib/firebase/admin';

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

const MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024; // 10 MB ceiling for high-res posters

const HIDDEN_OFFICIAL = new Set([
  'judge-ananda.png',
  'judge-lochan.png',
  'team-rajendra.png',
  'team-rishav.png',
]);

function getStorageBucket() {
  if (!isFirebaseAdminConfigured()) return null;
  try {
    const storage = getAdminStorage();
    const bucketName =
      process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET ||
      `${process.env.FIREBASE_PROJECT_ID}.firebasestorage.app`;
    return storage.bucket(bucketName);
  } catch (err) {
    console.error('[Firebase Storage Init Error]:', err);
    return null;
  }
}

export async function GET() {
  await connection();
  try {
    const officialFiles = await fs.readdir(OFFICIAL_DIR).catch(() => []);
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

    let firebaseUploads: { name: string; url: string; group: 'Uploaded' }[] = [];

    if (isFirebaseAdminConfigured()) {
      try {
        const bucket = getStorageBucket();
        if (bucket) {
          const [exists] = await bucket.exists().catch(() => [false]);
          if (exists) {
            const [files] = await bucket.getFiles({ prefix: 'uploads/' });
            firebaseUploads = files
              .filter((f) => {
                const ext = path.extname(f.name).toLowerCase();
                return ALLOWED_EXTENSIONS.has(ext);
              })
              .map((f) => {
                const metadata = f.metadata?.metadata as
                  | { firebaseStorageDownloadTokens?: string }
                  | undefined;
                const token = metadata?.firebaseStorageDownloadTokens;
                const url = token
                  ? `https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/${encodeURIComponent(f.name)}?alt=media&token=${token}`
                  : `https://storage.googleapis.com/${bucket.name}/${f.name}`;
                return {
                  name: path.basename(f.name),
                  url,
                  group: 'Uploaded' as const,
                };
              })
              .reverse();
          }
        }
      } catch (err) {
        console.error('[Firebase Storage List Error]:', err);
      }
    }

    // Also include local uploads for legacy/existing content
    const localFiles = await fs.readdir(UPLOADS_DIR).catch(() => []);
    const localUploads = localFiles
      .filter((f) => ALLOWED_EXTENSIONS.has(path.extname(f).toLowerCase()))
      .map((f) => ({
        name: f,
        url: `/uploads/${f}`,
        group: 'Uploaded' as const,
      }))
      .reverse();

    // Deduplicate uploads
    const seen = new Set<string>();
    const combinedUploads: { name: string; url: string; group: 'Uploaded' }[] = [];
    for (const item of [...firebaseUploads, ...localUploads]) {
      if (!seen.has(item.url)) {
        seen.add(item.url);
        combinedUploads.push(item);
      }
    }

    return NextResponse.json({
      media: [...combinedUploads, ...official],
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
        { error: 'File size exceeds maximum permitted limit (10 MB).' },
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
    const destination = `uploads/${fileName}`;
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const contentType = file.type || 'image/jpeg';

    // 1. Primary destination: Firebase Cloud Storage
    if (isFirebaseAdminConfigured()) {
      let bucket = getStorageBucket();

      if (bucket) {
        let [exists] = await bucket.exists().catch(() => [false]);

        // If default firebasestorage.app bucket is not found, test legacy appspot.com bucket
        if (!exists && process.env.FIREBASE_PROJECT_ID) {
          const storage = getAdminStorage();
          const legacyBucket = storage.bucket(
            `${process.env.FIREBASE_PROJECT_ID}.appspot.com`
          );
          const [legacyExists] = await legacyBucket.exists().catch(() => [false]);
          if (legacyExists) {
            bucket = legacyBucket;
            exists = true;
          }
        }

        if (exists) {
          const downloadToken = crypto.randomUUID();
          const fileRef = bucket.file(destination);

          await fileRef.save(buffer, {
            contentType,
            metadata: {
              contentType,
              metadata: {
                firebaseStorageDownloadTokens: downloadToken,
              },
            },
          });

          const url = `https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/${encodeURIComponent(destination)}?alt=media&token=${downloadToken}`;

          return NextResponse.json({
            success: true,
            url,
            name: file.name,
            storage: 'firebase',
          });
        }

        // Firebase bucket not initialized in console yet
        return NextResponse.json(
          {
            error:
              `Firebase Storage is not enabled yet in project "${process.env.FIREBASE_PROJECT_ID}". ` +
              `Please open Firebase Console (https://console.firebase.google.com/project/${process.env.FIREBASE_PROJECT_ID}/storage) ` +
              `and click "Get started" to activate your free cloud storage bucket.`,
          },
          { status: 503 }
        );
      }
    }

    // 2. Offline local development fallback (only when Firebase is not configured)
    await fs.mkdir(UPLOADS_DIR, { recursive: true });
    await fs.writeFile(path.join(UPLOADS_DIR, fileName), buffer);

    const url = `/uploads/${fileName}`;
    return NextResponse.json({
      success: true,
      url,
      name: file.name,
      storage: 'local',
    });
  } catch (err) {
    console.error('[Image Upload Error]:', err);
    return NextResponse.json(
      {
        error:
          err instanceof Error
            ? err.message
            : 'Failed to upload image file to storage.',
      },
      { status: 500 }
    );
  }
}
