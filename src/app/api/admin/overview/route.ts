import { connection, NextResponse } from 'next/server';
import { verifyAdminRequest } from '@/lib/backend/auth';
import { getAdminOverviewRepo } from '@/lib/backend/repository';

export async function GET(request: Request) {
  await connection();
  try {
    const auth = await verifyAdminRequest(request);
    if (!auth.authenticated) {
      return NextResponse.json(
        { error: 'Unauthorized. Administrator access required.' },
        { status: 401 }
      );
    }

    const overview = await getAdminOverviewRepo();
    return NextResponse.json(overview);
  } catch (err) {
    console.error('[Admin Overview Error]:', err);
    return NextResponse.json(
      { error: 'Unable to load admin overview.' },
      { status: 500 }
    );
  }
}

