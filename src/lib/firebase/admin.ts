import { initializeApp, getApps, cert, type App } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { getAuth } from 'firebase-admin/auth';
import { getStorage } from 'firebase-admin/storage';

let adminApp: App | undefined;

function cleanPrivateKey(key?: string): string | undefined {
  if (!key) return undefined;
  let cleaned = key.trim();
  // Strip outer quotes if pasted with quotes into Vercel/Netlify dashboard
  if (
    (cleaned.startsWith('"') && cleaned.endsWith('"')) ||
    (cleaned.startsWith("'") && cleaned.endsWith("'"))
  ) {
    cleaned = cleaned.slice(1, -1);
  }
  return cleaned.replace(/\\n/g, '\n').trim();
}

export function getAdminApp(): App | undefined {
  if (!adminApp) {
    const apps = getApps();
    if (apps.length > 0) {
      adminApp = apps[0];
    } else {
      const projectId = process.env.FIREBASE_PROJECT_ID;
      const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
      const privateKey = cleanPrivateKey(process.env.FIREBASE_PRIVATE_KEY);

      if (!projectId || !clientEmail || !privateKey) {
        return undefined;
      }

      try {
        adminApp = initializeApp({
          credential: cert({
            projectId,
            clientEmail,
            privateKey,
          }),
          storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
        });
      } catch (err) {
        console.error('[Firebase Admin Init Error]:', err);
        return undefined;
      }
    }
  }
  return adminApp;
}

export function isFirebaseAdminConfigured(): boolean {
  if (
    !process.env.FIREBASE_PROJECT_ID ||
    !process.env.FIREBASE_CLIENT_EMAIL ||
    !process.env.FIREBASE_PRIVATE_KEY
  ) {
    return false;
  }
  try {
    return Boolean(getAdminApp());
  } catch {
    return false;
  }
}

export function getAdminFirestore() {
  const app = getAdminApp();
  if (!app) {
    throw new Error('Firebase Admin App not available');
  }
  return getFirestore(app);
}

export function getAdminAuth() {
  const app = getAdminApp();
  if (!app) {
    throw new Error('Firebase Admin App not available');
  }
  return getAuth(app);
}

export function getAdminStorage() {
  const app = getAdminApp();
  if (!app) {
    throw new Error('Firebase Admin App not available');
  }
  return getStorage(app);
}
