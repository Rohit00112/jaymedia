/**
 * Firebase Client Configuration
 * Uses environment variables with official client project fallbacks
 * to ensure client SDK features and admin authentication remain functional across deployments.
 */

export const firebaseConfig = {
  apiKey:
    process.env.NEXT_PUBLIC_FIREBASE_API_KEY ||
    'AIzaSyA0XGJ5cb10W67NhbtZ6mOLSD_LmWAzgbk',
  authDomain:
    process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN ||
    'jay-media-management.firebaseapp.com',
  projectId:
    process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID ||
    'jay-media-management',
  storageBucket:
    process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET ||
    'jay-media-management.firebasestorage.app',
  messagingSenderId:
    process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID ||
    '558674697616',
  appId:
    process.env.NEXT_PUBLIC_FIREBASE_APP_ID ||
    '1:558674697616:web:733f583ed9f000c94f2715',
};

export const isFirebaseClientConfigured = Boolean(
  firebaseConfig.apiKey &&
    firebaseConfig.authDomain &&
    firebaseConfig.projectId &&
    firebaseConfig.appId
);

