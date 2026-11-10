import { NextResponse } from 'next/server';
import { getAdminFirestore, isFirebaseAdminConfigured } from '@/lib/firebase/admin';
import { inquirySchema } from '@/lib/validations/inquiry';

interface InquiryRecord {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  company?: string;
  serviceOfInterest: string;
  eventDate?: string;
  budgetRange?: string;
  message: string;
  status: string;
  createdAt: string;
}

const globalForInquiries = globalThis as typeof globalThis & {
  __jayMediaInquiries?: InquiryRecord[];
};

function getInquiriesMemoryStore(): InquiryRecord[] {
  if (!globalForInquiries.__jayMediaInquiries) {
    globalForInquiries.__jayMediaInquiries = [];
  }
  return globalForInquiries.__jayMediaInquiries;
}

export async function GET() {
  try {
    if (isFirebaseAdminConfigured()) {
      const db = getAdminFirestore();
      const snap = await db
        .collection('inquiries')
        .orderBy('createdAt', 'desc')
        .limit(100)
        .get();
      const inquiries = snap.docs.map((doc) => doc.data() as InquiryRecord);
      return NextResponse.json({ inquiries });
    }

    return NextResponse.json({ inquiries: getInquiriesMemoryStore() });
  } catch (error) {
    console.error('[Inquiry GET Error]:', error);
    return NextResponse.json({ inquiries: getInquiriesMemoryStore() });
  }
}

export async function POST(request: Request) {
  try {
    const json = await request.json();
    const validatedData = inquirySchema.parse(json);

    const inquiryRecord: InquiryRecord = {
      id: `inq_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      ...validatedData,
      status: 'new',
      createdAt: new Date().toISOString(),
    };

    if (isFirebaseAdminConfigured()) {
      const db = getAdminFirestore();
      await db
        .collection('inquiries')
        .doc(inquiryRecord.id)
        .set(inquiryRecord);
    }

    getInquiriesMemoryStore().unshift(inquiryRecord);

    return NextResponse.json({
      success: true,
      message: 'Inquiry received successfully.',
      inquiryId: inquiryRecord.id,
    });
  } catch (error: unknown) {
    console.error('[Inquiry API Error]:', error);
    if (
      error &&
      typeof error === 'object' &&
      'name' in error &&
      error.name === 'ZodError'
    ) {
      return NextResponse.json(
        { error: 'Invalid form submission.', details: error },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: 'Server error processing inquiry.' },
      { status: 500 }
    );
  }
}
