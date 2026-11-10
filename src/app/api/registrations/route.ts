import { connection, NextResponse } from 'next/server';
import {
  REGISTRATION_STATUSES,
  registrationSchema,
  type RegistrationStatus,
} from '@/lib/validations/registration';
import {
  deleteRegistrationRepo,
  getEventRepo,
  getRegistrationRepo,
  listRegistrationsRepo,
  upsertRegistrationRepo,
} from '@/lib/backend/repository';

export async function GET(request: Request) {
  await connection();
  try {
    const { searchParams } = new URL(request.url);
    const codeParam = searchParams.get('code')?.trim().toUpperCase();
    const eventSlug = searchParams.get('eventSlug')?.trim();
    const status = searchParams.get('status')?.trim();

    if (codeParam) {
      const found = await getRegistrationRepo(codeParam);
      if (!found) {
        return NextResponse.json(
          {
            error: `No registration found for code "${codeParam}". Please verify your code or contact our Biratnagar desk.`,
          },
          { status: 404 }
        );
      }
      return NextResponse.json({ record: found });
    }

    const records = await listRegistrationsRepo({ eventSlug, status });
    return NextResponse.json({ records });
  } catch (err) {
    console.error('[API Registrations GET Error]:', err);
    return NextResponse.json({ records: [] });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = registrationSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          error: 'Validation failed. Please review all required fields.',
          details: parsed.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const d = parsed.data;
    const eventMeta = await getEventRepo(d.eventSlug);
    const prefix = eventMeta?.codePrefix || 'NKI';
    const eventTitle = eventMeta?.title || 'Nepal Kids Idol';

    let userCode = `${prefix}-${Math.floor(100000 + Math.random() * 900000)}`;
    while (await getRegistrationRepo(userCode)) {
      userCode = `${prefix}-${Math.floor(100000 + Math.random() * 900000)}`;
    }

    const record = await upsertRegistrationRepo({
      userCode,
      eventSlug: d.eventSlug,
      eventTitle,
      name: d.name.trim(),
      phone: d.phone.trim(),
      age: d.age,
      gender: d.gender,
      address: d.address.trim(),
      school: d.school.trim(),
      hobbies: d.hobbies?.trim() || '',
      auditionMode: d.auditionMode,
      auditionVideoUrl: d.auditionVideoUrl?.trim() || '',
      photoFilename: d.photoFilename?.trim() || '',
      parentName: d.parentName.trim(),
      parentEmail: d.parentEmail?.trim() || '',
      parentPhone: d.parentPhone?.trim() || d.phone.trim(),
      paymentTransactionId: d.paymentTransactionId?.trim() || '',
      paymentReceiptFilename: d.paymentReceiptFilename?.trim() || '',
      status: 'Pending QR Verification',
      auditionHub:
        d.auditionMode === 'Online Video Audition'
          ? 'Online Global Desk — Jay Media Digital Portal'
          : 'Central Mall, Main Road, Biratnagar',
      adminNotes: '',
      submittedAt: new Date().toISOString(),
    });

    return NextResponse.json(
      {
        success: true,
        userCode,
        record,
      },
      { status: 201 }
    );
  } catch {
    return NextResponse.json(
      { error: 'Unable to process registration request.' },
      { status: 500 }
    );
  }
}

export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const userCode = String(body.userCode || '')
      .trim()
      .toUpperCase();
    const existing = userCode ? await getRegistrationRepo(userCode) : undefined;

    if (!existing) {
      return NextResponse.json(
        { error: `Registration "${userCode}" not found.` },
        { status: 404 }
      );
    }

    const nextStatus = body.status as RegistrationStatus | undefined;
    if (
      nextStatus !== undefined &&
      !REGISTRATION_STATUSES.includes(nextStatus)
    ) {
      return NextResponse.json(
        { error: 'Invalid registration status.' },
        { status: 400 }
      );
    }

    const updated = await upsertRegistrationRepo({
      ...existing,
      ...(nextStatus !== undefined && { status: nextStatus }),
      ...(body.adminNotes !== undefined && {
        adminNotes: String(body.adminNotes).trim(),
      }),
      ...(body.auditionHub !== undefined && {
        auditionHub: String(body.auditionHub).trim(),
      }),
    });

    return NextResponse.json({
      success: true,
      record: updated,
    });
  } catch {
    return NextResponse.json(
      { error: 'Unable to update registration.' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code')?.trim().toUpperCase();
  if (!code) {
    return NextResponse.json(
      { error: 'Registration userCode is required.' },
      { status: 400 }
    );
  }
  await deleteRegistrationRepo(code);
  return NextResponse.json({ success: true, userCode: code });
}
