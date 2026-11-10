import { connection, NextResponse } from 'next/server';
import { getSettingsRepo, updateSettingsRepo } from '@/lib/backend/repository';

export async function GET() {
  await connection();
  const settings = await getSettingsRepo();
  return NextResponse.json({ settings });
}

export async function PUT(request: Request) {
  try {
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

