import { connection, NextResponse } from 'next/server';
import { verifyAdminRequest } from '@/lib/backend/auth';
import {
  DEFAULT_SETTINGS,
  getSettingsRepo,
  updateSettingsRepo,
} from '@/lib/backend/repository';

export async function GET() {
  await connection();
  try {
    const settings = await getSettingsRepo();
    return NextResponse.json({ settings });
  } catch (err) {
    console.error('[API Settings GET Error]:', err);
    return NextResponse.json({ settings: DEFAULT_SETTINGS });
  }
}

export async function PUT(request: Request) {
  try {
    const auth = await verifyAdminRequest(request);
    if (!auth.authenticated) {
      return NextResponse.json(
        { error: 'Unauthorized. Administrator access required.' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const settings = await updateSettingsRepo(body);
    return NextResponse.json({ success: true, settings });
  } catch {
    return NextResponse.json(
      { error: 'Unable to save site settings.' },
      { status: 500 }
    );
  }
}

