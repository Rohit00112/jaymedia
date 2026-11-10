import { isFirebaseAdminConfigured, getAdminAuth } from '@/lib/firebase/admin';

export interface AdminAuthResult {
  authenticated: boolean;
  uid?: string;
  email?: string;
  error?: string;
}

export async function verifyAdminRequest(
  request: Request
): Promise<AdminAuthResult> {
  // 1. Check Authorization header: Bearer <token>
  const authHeader = request.headers.get('authorization');
  let token: string | undefined;
  if (authHeader && authHeader.toLowerCase().startsWith('bearer ')) {
    token = authHeader.slice(7).trim();
  }

  // 2. Check Cookie fallback: jmm_admin_token
  if (!token) {
    const cookieHeader = request.headers.get('cookie') || '';
    const match = cookieHeader.match(/jmm_admin_token=([^;]+)/);
    if (match) {
      token = decodeURIComponent(match[1]).trim();
    }
  }

  // If Firebase Admin is configured, perform full cryptographic JWT verification
  if (isFirebaseAdminConfigured()) {
    if (!token) {
      return {
        authenticated: false,
        error: 'Missing administrator authentication token. Please sign in to the studio.',
      };
    }

    try {
      const decoded = await getAdminAuth().verifyIdToken(token);
      return {
        authenticated: true,
        uid: decoded.uid,
        email: decoded.email,
      };
    } catch (err) {
      console.warn('[Admin Token Verification Failed]:', err);
      return {
        authenticated: false,
        error: 'Invalid or expired administrator credentials.',
      };
    }
  }

  // In non-production without Firebase Admin keys configured, allow local dev mode
  if (process.env.NODE_ENV !== 'production') {
    return {
      authenticated: true,
      uid: 'dev-admin',
      email: 'admin@jaymediamanagement.com',
    };
  }

  return {
    authenticated: false,
    error: 'Administrator authentication service is not configured.',
  };
}
