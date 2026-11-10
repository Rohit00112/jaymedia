import { NextResponse } from 'next/server';
import {
  registrationSchema,
  type RegistrationRecord,
} from '@/lib/validations/registration';

/**
 * In-memory registry seeded with sample Nepal Kids Idol contestant pass codes
 * so parents, guardians, and reviewers can test the Filter Application status lookup
 * immediately alongside newly submitted registrations.
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
      age: 11,
      gender: 'Male',
      address: 'Biratnagar-09, Morang, Koshi Province',
      school: 'Budhanilkantha Heritage Academy',
      parentName: 'Prakash Adhikari',
      status: 'Verified — Audition Scheduled',
      auditionHub: 'Biratnagar Central Hub (Province 1)',
      submittedAt: '2025-11-02T09:15:00.000Z',
    });
    seeded.set('NKI-2025-102', {
      userCode: 'NKI-2025-102',
      eventSlug: 'nepal-kids-idol',
      eventTitle: 'Nepal Kids Idol',
      name: 'Prisha Sharma',
      age: 9,
      gender: 'Female',
      address: 'Itahari-04, Sunsari, Koshi Province',
      school: 'Sunsari Public English School',
      parentName: 'Kalpana Sharma',
      status: 'Shortlisted',
      auditionHub: 'Itahari / Koshi Online Selection',
      submittedAt: '2025-11-05T11:30:00.000Z',
    });
    seeded.set('NKI-2025-103', {
      userCode: 'NKI-2025-103',
      eventSlug: 'nepal-kids-idol',
      eventTitle: 'Nepal Kids Idol',
      name: 'Riyan Pradhan',
      age: 13,
      gender: 'Male',
      address: 'Gangtok, Sikkim (International Division)',
      school: 'Himalayan Public Academy',
      parentName: 'Bikram Pradhan',
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

  if (!rawCode) {
    return NextResponse.json(
      { error: 'Please provide a contestant user code.' },
      { status: 400 }
    );
  }

  const registry = getRegistry();
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
      age: parsed.age,
      gender: parsed.gender,
      address: parsed.address,
      school: parsed.school,
      parentName: parsed.parentName,
      status: 'Pending QR Verification',
      auditionHub: `Assigned Regional Desk (${parsed.address.split(',')[0]})`,
      submittedAt: new Date().toISOString(),
    };

    const registry = getRegistry();
    registry.set(userCode, record);

    console.info('[Contestant Registration Stored]', {
      userCode: record.userCode,
      name: record.name,
      eventSlug: record.eventSlug,
    });

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

