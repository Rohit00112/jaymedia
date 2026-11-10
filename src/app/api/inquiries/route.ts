import { connection, NextResponse } from 'next/server';
import { inquirySchema } from '@/lib/validations/inquiry';
import {
  INQUIRY_STATUS_OPTIONS,
  type InquiryStatusOption,
} from '@/lib/backend/schemas';
import {
  deleteInquiryRepo,
  listInquiriesRepo,
  upsertInquiryRepo,
} from '@/lib/backend/repository';

export async function GET(request: Request) {
  await connection();
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status')?.trim();
    const inquiries = await listInquiriesRepo({ status });
    return NextResponse.json({ inquiries });
  } catch (err) {
    console.error('[API Inquiries GET Error]:', err);
    return NextResponse.json({ inquiries: [] });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = inquirySchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          error: 'Validation failed',
          details: parsed.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const id = `inq_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 6)}`;
    const now = new Date().toISOString();

    const inquiry = await upsertInquiryRepo({
      id,
      fullName: parsed.data.fullName.trim(),
      email: parsed.data.email.trim(),
      phone: parsed.data.phone.trim(),
      organization: parsed.data.organization?.trim() || '',
      serviceOfInterest: parsed.data.serviceOfInterest.trim(),
      eventDate: parsed.data.eventDate?.trim() || '',
      budget: parsed.data.budget?.trim() || '',
      message: parsed.data.message.trim(),
      status: 'new',
      priority: 'medium',
      adminNotes: '',
      createdAt: now,
      updatedAt: now,
    });

    return NextResponse.json(
      {
        success: true,
        id: inquiry.id,
        inquiry,
        message:
          'Your inquiry has been received by our Biratnagar production desk.',
      },
      { status: 201 }
    );
  } catch (err) {
    console.error('[API Inquiries POST Error]:', err);
    return NextResponse.json(
      { error: 'Internal server error while processing inquiry.' },
      { status: 500 }
    );
  }
}

export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const id = String(body.id || '').trim();
    if (!id) {
      return NextResponse.json(
        { error: 'Inquiry ID is required.' },
        { status: 400 }
      );
    }

    const all = await listInquiriesRepo();
    const existing = all.find((i) => i.id === id);
    if (!existing) {
      return NextResponse.json(
        { error: `Inquiry "${id}" not found.` },
        { status: 404 }
      );
    }

    const nextStatus = body.status as InquiryStatusOption | undefined;
    if (
      nextStatus !== undefined &&
      !INQUIRY_STATUS_OPTIONS.includes(nextStatus)
    ) {
      return NextResponse.json(
        { error: 'Invalid inquiry status.' },
        { status: 400 }
      );
    }

    const updated = await upsertInquiryRepo({
      ...existing,
      ...(nextStatus !== undefined && { status: nextStatus }),
      ...(body.priority !== undefined && { priority: body.priority }),
      ...(body.adminNotes !== undefined && {
        adminNotes: String(body.adminNotes),
      }),
    });

    return NextResponse.json({ success: true, inquiry: updated });
  } catch {
    return NextResponse.json(
      { error: 'Unable to update inquiry.' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id')?.trim();
  if (!id) {
    return NextResponse.json(
      { error: 'Inquiry ID is required.' },
      { status: 400 }
    );
  }
  await deleteInquiryRepo(id);
  return NextResponse.json({ success: true, id });
}
