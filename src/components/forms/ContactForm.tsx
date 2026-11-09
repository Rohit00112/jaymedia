'use client';

import { Suspense, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CheckCircle2, AlertCircle, Loader2, Send } from 'lucide-react';
import { inquirySchema, type InquiryFormData } from '@/lib/validations/inquiry';
import { cn } from '@/lib/utils';

function ContactFormInner() {
  const searchParams = useSearchParams();
  const initialService = searchParams.get('service') || 'event-management';

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<InquiryFormData>({
    resolver: zodResolver(inquirySchema),
    defaultValues: {
      serviceOfInterest: initialService,
    },
  });

  const onSubmit = async (data: InquiryFormData) => {
    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    try {
      const response = await fetch('/api/inquiries', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || 'Failed to submit inquiry. Please try again.');
      }

      setSubmitStatus('success');
      reset();
    } catch (err: unknown) {
      setSubmitStatus('error');
      setErrorMessage(
        err instanceof Error
          ? err.message
          : 'An unexpected error occurred. Please contact us directly via email.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white border border-ink/10 p-8 sm:p-12 shadow-md">
      {submitStatus === 'success' && (
        <div className="mb-8 p-6 bg-emerald-50 border border-emerald-200 text-emerald-900 flex items-start gap-3">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
          <div>
            <h4 className="font-display font-bold text-base">Inquiry Successfully Received</h4>
            <p className="text-sm font-body mt-1 text-emerald-800">
              Thank you for contacting Jay Media Management Pvt. Ltd. Our production desk in Biratnagar will review
              your requirements and respond within 24 hours.
            </p>
          </div>
        </div>
      )}

      {submitStatus === 'error' && (
        <div className="mb-8 p-6 bg-red-50 border border-red-200 text-red-900 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
          <div>
            <h4 className="font-display font-bold text-base">Submission Notice</h4>
            <p className="text-sm font-body mt-1 text-red-800">{errorMessage}</p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Full Name */}
          <div>
            <label className="block text-xs font-display uppercase tracking-widest text-ink/70 mb-2 font-semibold">
              Full Name *
            </label>
            <input
              type="text"
              {...register('fullName')}
              placeholder="e.g. Ramesh Karki"
              className={cn(
                'w-full px-4 py-3.5 bg-warm-ivory/50 border border-ink/15 text-sm font-body text-ink',
                'focus:outline-none focus:border-coral focus:ring-1 focus:ring-coral',
                errors.fullName && 'border-red-500'
              )}
            />
            {errors.fullName && (
              <span className="text-xs text-red-600 font-body mt-1 block">
                {errors.fullName.message}
              </span>
            )}
          </div>

          {/* Email Address */}
          <div>
            <label className="block text-xs font-display uppercase tracking-widest text-ink/70 mb-2 font-semibold">
              Email Address *
            </label>
            <input
              type="email"
              {...register('email')}
              placeholder="e.g. ramesh@example.com"
              className={cn(
                'w-full px-4 py-3.5 bg-warm-ivory/50 border border-ink/15 text-sm font-body text-ink',
                'focus:outline-none focus:border-coral focus:ring-1 focus:ring-coral',
                errors.email && 'border-red-500'
              )}
            />
            {errors.email && (
              <span className="text-xs text-red-600 font-body mt-1 block">
                {errors.email.message}
              </span>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Phone Number */}
          <div>
            <label className="block text-xs font-display uppercase tracking-widest text-ink/70 mb-2 font-semibold">
              Phone Number *
            </label>
            <input
              type="tel"
              {...register('phone')}
              placeholder="e.g. +977 98XXXXXXXX"
              className={cn(
                'w-full px-4 py-3.5 bg-warm-ivory/50 border border-ink/15 text-sm font-body text-ink',
                'focus:outline-none focus:border-coral focus:ring-1 focus:ring-coral',
                errors.phone && 'border-red-500'
              )}
            />
            {errors.phone && (
              <span className="text-xs text-red-600 font-body mt-1 block">
                {errors.phone.message}
              </span>
            )}
          </div>

          {/* Organization */}
          <div>
            <label className="block text-xs font-display uppercase tracking-widest text-ink/70 mb-2 font-semibold">
              Organization / Brand (Optional)
            </label>
            <input
              type="text"
              {...register('organization')}
              placeholder="e.g. Koshi Enterprise Ltd."
              className="w-full px-4 py-3.5 bg-warm-ivory/50 border border-ink/15 text-sm font-body text-ink focus:outline-none focus:border-coral focus:ring-1 focus:ring-coral"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {/* Service of Interest */}
          <div>
            <label className="block text-xs font-display uppercase tracking-widest text-ink/70 mb-2 font-semibold">
              Service *
            </label>
            <select
              {...register('serviceOfInterest')}
              className="w-full px-4 py-3.5 bg-warm-ivory/50 border border-ink/15 text-sm font-body text-ink focus:outline-none focus:border-coral focus:ring-1 focus:ring-coral"
            >
              <option value="event-management">Event Management</option>
              <option value="brand-experiences">Brand Experiences</option>
              <option value="media-production">Media Production</option>
              <option value="product-launches">Product Launches</option>
              <option value="press-events">Press Events</option>
              <option value="pageant-sponsorship">Pageant Sponsorship</option>
              <option value="other">Other Inquiry</option>
            </select>
          </div>

          {/* Target Event Date */}
          <div>
            <label className="block text-xs font-display uppercase tracking-widest text-ink/70 mb-2 font-semibold">
              Target Date (Optional)
            </label>
            <input
              type="date"
              {...register('eventDate')}
              className="w-full px-4 py-3.5 bg-warm-ivory/50 border border-ink/15 text-sm font-body text-ink focus:outline-none focus:border-coral focus:ring-1 focus:ring-coral"
            />
          </div>

          {/* Estimated Budget */}
          <div>
            <label className="block text-xs font-display uppercase tracking-widest text-ink/70 mb-2 font-semibold">
              Estimated Budget (Optional)
            </label>
            <select
              {...register('budget')}
              className="w-full px-4 py-3.5 bg-warm-ivory/50 border border-ink/15 text-sm font-body text-ink focus:outline-none focus:border-coral focus:ring-1 focus:ring-coral"
            >
              <option value="">Select range...</option>
              <option value="under-200k">Under NPR 2 Lakhs</option>
              <option value="200k-500k">NPR 2 Lakhs - 5 Lakhs</option>
              <option value="500k-1m">NPR 5 Lakhs - 10 Lakhs</option>
              <option value="1m-plus">NPR 10 Lakhs+</option>
              <option value="custom">Custom Scale</option>
            </select>
          </div>
        </div>

        {/* Project Description */}
        <div>
          <label className="block text-xs font-display uppercase tracking-widest text-ink/70 mb-2 font-semibold">
            Project Description &amp; Requirements *
          </label>
          <textarea
            rows={5}
            {...register('message')}
            placeholder="Tell us about the scope, anticipated audience size, venue preferences in Biratnagar or Eastern Nepal, and specific production needs..."
            className={cn(
              'w-full px-4 py-3.5 bg-warm-ivory/50 border border-ink/15 text-sm font-body text-ink',
              'focus:outline-none focus:border-coral focus:ring-1 focus:ring-coral',
              errors.message && 'border-red-500'
            )}
          />
          {errors.message && (
            <span className="text-xs text-red-600 font-body mt-1 block">
              {errors.message.message}
            </span>
          )}
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            disabled={isSubmitting}
            className={cn(
              'w-full sm:w-auto inline-flex items-center justify-center gap-3 px-10 py-5',
              'bg-coral text-white font-display text-xs uppercase tracking-widest font-semibold',
              'hover:bg-coral-hover hover:scale-[1.01] transition-all duration-300 shadow-lg',
              'disabled:opacity-60 disabled:cursor-not-allowed'
            )}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Submitting to Biratnagar Desk...</span>
              </>
            ) : (
              <>
                <span>Submit Production Inquiry</span>
                <Send className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

export default function ContactForm() {
  return (
    <Suspense fallback={<div className="bg-white border border-ink/10 p-12 text-center text-sm font-display text-ink/60">Loading production form...</div>}>
      <ContactFormInner />
    </Suspense>
  );
}
