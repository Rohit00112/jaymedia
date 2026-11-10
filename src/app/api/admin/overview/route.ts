import { connection, NextResponse } from 'next/server';
import { getAdminOverviewRepo } from '@/lib/backend/repository';

export async function GET() {
  await connection();
  try {
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

