import { NextResponse } from 'next/server';
import {
  REGISTRATION_STATUSES,
  registrationSchema,
  type RegistrationRecord,
  type RegistrationStatus,
} from '@/lib/validations/registration';

/**
 * In-memory registry seeded with sample Nepal Kids Idol contestant pass codes.
 * Swap reads/writes cleanly to Firebase Firestore & Storage when ready.
 */
const globalForRegistrations = globalThis as typeof globalThis & {
  __jayMediaRegistrations?: Map<string, RegistrationRecord>;
};

function getRegistry(): Map<string, RegistrationRecord> {
  if (!globalForRegistrations.__jayMediaRegistrations) {
    const seeded = new Map<string, RegistrationRecord>();
    seeded.set('NKI-2025-101', {
      userCode: 'NKI-2025-101',
      eventSlug: 'nepal-kids-idol',
      eventTitle: 'Nepal Kids Idol',
      name: 'Aarav Adhikari',
      phone: '9842011223',
      age: 11,
      gender: 'Male',
      address: 'Biratnagar-09, Morang, Koshi Province',
      school: 'Budhanilkantha Heritage Academy',
      hobbies: 'Classical vocal, harmonium',
      auditionMode: 'In-Person District Audition',
      photoFilename: 'aarav_headshot.jpg',
      parentName: 'Prakash Adhikari',
      parentPhone: '9852011223',
      paymentTransactionId: 'ESEWA-8829104',
      paymentReceiptFilename: 'esewa_receipt_101.png',
      status: 'Verified — Audition Scheduled',
      auditionHub: 'Biratnagar Central Hub (Province 1)',
      submittedAt: '2025-11-02T09:15:00.000Z',
    });
    seeded.set('NKI-2025-102', {
      userCode: 'NKI-2025-102',
      eventSlug: 'nepal-kids-idol',
      eventTitle: 'Nepal Kids Idol',
      name: 'Prisha Sharma',
      phone: '9812345678',
      age: 9,
      gender: 'Female',
      address: 'Itahari-04, Sunsari, Koshi Province',
      school: 'Sunsari Public English School',
      hobbies: 'Modern Nepali singing, acoustic stage',
      auditionMode: 'In-Person District Audition',
      photoFilename: 'prisha_portrait.jpg',
      parentName: 'Kalpana Sharma',
      parentPhone: '9842345678',
      paymentTransactionId: 'FONEPAY-449182',
      paymentReceiptFilename: 'fonepay_receipt_102.png',
      status: 'Shortlisted',
      auditionHub: 'Itahari / Koshi Online Selection',
      submittedAt: '2025-11-05T11:30:00.000Z',
    });
    seeded.set('NKI-2025-103', {
      userCode: 'NKI-2025-103',
      eventSlug: 'nepal-kids-idol',
      eventTitle: 'Nepal Kids Idol',
      name: 'Riyan Pradhan',
      phone: '+91 9832012345',
      age: 13,
      gender: 'Male',
      address: 'Gangtok, Sikkim (International Division)',
      school: 'Himalayan Public Academy',
      hobbies: 'Acoustic guitar, folk vocals',
      auditionMode: 'Online Video Audition',
      auditionVideoUrl: 'https://youtu.be/example-audition',
      photoFilename: 'riyan_photo.jpg',
      parentName: 'Bikram Pradhan',
      paymentTransactionId: 'INTL-QR-9012',
      status: 'Verified — Audition Scheduled',
      auditionHub: 'India International Desk (Sikkim & Darjeeling)',
      submittedAt: '2025-11-08T14:20:00.000Z',
    });
    globalForRegistrations.__jayMediaRegistrations = seeded;
  }
  return globalForRegistrations.__jayMediaRegistrations;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const rawCode = searchParams.get('code')?.trim().toUpperCase();
  const registry = getRegistry();

  if (!rawCode) {
    // Return list of all registrations sorted newest first for /admin/registrations
    const records = Array.from(registry.values()).sort((a, b) =>
      b.submittedAt.localeCompare(a.submittedAt)
    );
    return NextResponse.json({ records });
  }

  const match = registry.get(rawCode);

  if (!match) {
    return NextResponse.json(
      {
        found: false,
        code: rawCode,
        message: `No contestant registration found matching User Code "${rawCode}". Verify your code or register below.`,
      },
      { status: 404 }
    );
  }

  return NextResponse.json({
    found: true,
    record: match,
  });
}

export async function POST(request: Request) {
  try {
    const json = await request.json();
    const parsed = registrationSchema.parse(json);

    const randomDigits = Math.floor(200 + Math.random() * 799);
    const suffix = Date.now().toString().slice(-3);
    const userCode = `NKI-2025-${randomDigits}${suffix}`;

    const record: RegistrationRecord = {
      userCode,
      eventSlug: parsed.eventSlug,
      eventTitle:
        parsed.eventSlug === 'nepal-kids-idol'
          ? 'Nepal Kids Idol'
          : 'Jay Media Production',
      name: parsed.name,
      phone: parsed.phone,
      age: parsed.age,
      gender: parsed.gender,
      address: parsed.address,
      school: parsed.school,
      hobbies: parsed.hobbies,
      auditionMode: parsed.auditionMode,
      auditionVideoUrl: parsed.auditionVideoUrl,
      photoFilename: parsed.photoFilename,
      parentName: parsed.parentName,
      parentEmail: parsed.parentEmail,
      parentPhone: parsed.parentPhone,
      paymentTransactionId: parsed.paymentTransactionId,
      paymentReceiptFilename: parsed.paymentReceiptFilename,
      status: 'Pending QR Verification',
      auditionHub:
        parsed.auditionMode === 'Online Video Audition'
          ? 'Digital / Online Evaluation Desk'
          : `Assigned Regional Desk (${parsed.address.split(',')[0]})`,
      submittedAt: new Date().toISOString(),
    };

    const registry = getRegistry();
    registry.set(userCode, record);

    return NextResponse.json(
      {
        success: true,
        userCode,
        record,
      },
      { status: 201 }
    );
  } catch (error: unknown) {
    if (error && typeof error === 'object' && 'name' in error && error.name === 'ZodError') {
      return NextResponse.json(
        { error: 'Please complete all required contestant and guardian fields.', details: error },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: 'Server error processing registration.' },
      { status: 500 }
    );
  }
}

export async function PATCH(request: Request) {
  try {
    const json = await request.json();
    const userCode = String(json.userCode || '').trim().toUpperCase();
    const status = String(json.status || '') as RegistrationStatus;

    if (!userCode || !REGISTRATION_STATUSES.includes(status)) {
      return NextResponse.json(
        { error: 'Invalid userCode or registration status value.' },
        { status: 400 }
      );
    }

    const registry = getRegistry();
    const existing = registry.get(userCode);

    if (!existing) {
      return NextResponse.json(
        { error: `Registration "${userCode}" not found.` },
        { status: 404 }
      );
    }

    const updated: RegistrationRecord = {
      ...existing,
      status,
    };

    registry.set(userCode, updated);

    return NextResponse.json({
      success: true,
      record: updated,
    });
  } catch {
    return NextResponse.json(
      { error: 'Unable to update registration status.' },
      { status: 500 }
    );
  }
}
