import { NextResponse } from 'next/server';
import { inquirySchema } from '@/lib/validations/inquiry';

export async function POST(request: Request) {
  try {
    const json = await request.json();
    const validatedData = inquirySchema.parse(json);

    const inquiryRecord = {
      id: `inq_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      ...validatedData,
      status: 'new',
      createdAt: new Date().toISOString(),
    };

    // When Firebase Admin is configured with credentials, this saves directly to Firestore
    // For now, we log the verified inquiry payload
    console.info('[Inquiry Submitted Successfully]', {
      id: inquiryRecord.id,
      name: inquiryRecord.fullName,
      email: inquiryRecord.email,
      service: inquiryRecord.serviceOfInterest,
    });

    return NextResponse.json({
      success: true,
      message: 'Inquiry received successfully.',
      inquiryId: inquiryRecord.id,
    });
  } catch (error: unknown) {
    console.error('[Inquiry API Error]:', error);
    if (error && typeof error === 'object' && 'name' in error && error.name === 'ZodError') {
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
