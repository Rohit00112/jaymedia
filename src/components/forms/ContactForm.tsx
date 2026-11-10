'use client';

import { Suspense, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { inquirySchema, type InquiryFormData } from '@/lib/validations/inquiry';
import { cn } from '@/lib/utils';

const inputClass =
  'w-full rounded-lg border border-line-strong bg-white px-3.5 py-2.5 text-sm text-ink transition-colors placeholder:text-faint focus:border-forest focus:outline-none';

const labelClass = 'mb-1.5 block text-xs font-medium text-ink';

function ContactFormInner() {
  const searchParams = useSearchParams();
  const initialService =
    searchParams.get('topic') ||
    searchParams.get('service') ||
    'concert-sponsorship';

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    'idle' | 'success' | 'error'
  >('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const isSponsorship =
    searchParams.get('topic') === 'concert-sponsorship' ||
    searchParams.get('service') === 'concert-sponsorship';

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
        throw new Error(
          errorData.error || 'Failed to submit inquiry. Please try again.'
        );
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
    <div>
      {submitStatus === 'success' && (
        <div
          role="status"
          aria-live="polite"
          className="mb-6 flex items-start gap-3 rounded-lg border border-forest/25 bg-forest-soft p-4"
        >
          <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-forest" />
          <div>
            <h3 className="text-sm font-semibold text-ink">
              Inquiry received.
            </h3>
            <p className="mt-1 text-xs leading-relaxed text-muted">
              Thank you for contacting Jay Media Management. Our team will
              respond within 1 business day.
            </p>
          </div>
        </div>
      )}

      {submitStatus === 'error' && (
        <div
          role="alert"
          className="mb-6 flex items-start gap-3 rounded-lg border border-danger/30 bg-red-50 p-4"
        >
          <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-danger" />
          <div>
            <h3 className="text-sm font-semibold text-danger">
              Could not submit inquiry
            </h3>
            <p className="mt-1 text-xs leading-relaxed text-danger">
              {errorMessage}
            </p>
          </div>
        </div>
      )}

      {isSponsorship && submitStatus !== 'success' && (
        <div className="mb-6 rounded-xl border border-forest/25 bg-forest-soft/70 p-4">
          <p className="text-xs font-semibold text-forest">
            Inquiring for Brand Sponsorship?
          </p>
          <p className="mt-1 text-xs leading-relaxed text-ink-soft">
            Title, associate, beverage, and hospitality partnership decks for
            Itahari Stadium (25,000+ capacity) are provided upon request. Please
            share your brand name, category, and target marketing objectives below.
          </p>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="fullName" className={labelClass}>
              Full Name *
            </label>
            <input
              id="fullName"
              type="text"
              {...register('fullName')}
              placeholder="Your name"
              aria-required="true"
              aria-invalid={errors.fullName ? 'true' : undefined}
              className={cn(inputClass, errors.fullName && 'border-danger')}
            />
            {errors.fullName && (
              <span className="mt-1 block text-xs text-danger">
                {errors.fullName.message}
              </span>
            )}
          </div>

          <div>
            <label htmlFor="email" className={labelClass}>
              Email Address *
            </label>
            <input
              id="email"
              type="email"
              {...register('email')}
              placeholder="name@example.com"
              aria-required="true"
              aria-invalid={errors.email ? 'true' : undefined}
              className={cn(inputClass, errors.email && 'border-danger')}
            />
            {errors.email && (
              <span className="mt-1 block text-xs text-danger">
                {errors.email.message}
              </span>
            )}
          </div>

          <div>
            <label htmlFor="phone" className={labelClass}>
              Phone Number *
            </label>
            <input
              id="phone"
              type="tel"
              {...register('phone')}
              placeholder="+977 9851143338"
              aria-required="true"
              aria-invalid={errors.phone ? 'true' : undefined}
              className={cn(inputClass, errors.phone && 'border-danger')}
            />
            {errors.phone && (
              <span className="mt-1 block text-xs text-danger">
                {errors.phone.message}
              </span>
            )}
          </div>

          <div>
            <label htmlFor="organization" className={labelClass}>
              Organization / Brand
            </label>
            <input
              id="organization"
              type="text"
              {...register('organization')}
              placeholder="Optional"
              className={inputClass}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div>
            <label htmlFor="serviceOfInterest" className={labelClass}>
              Topic / Inquiry Type *
            </label>
            <select
              id="serviceOfInterest"
              {...register('serviceOfInterest')}
              aria-required="true"
              className={inputClass}
            >
              <option value="concert-sponsorship">Concert Sponsorship &amp; Tickets</option>
              <option value="event-production">Live Event &amp; Stage Production</option>
              <option value="pageant-partnership">Pageant Franchise &amp; Partnership</option>
              <option value="film-media">Film &amp; Broadcast Collaboration</option>
              <option value="brand-launches">Store &amp; Product Launches</option>
              <option value="other">General Studio Inquiry</option>
            </select>
          </div>

          <div>
            <label htmlFor="eventDate" className={labelClass}>
              Target Date
            </label>
            <input
              id="eventDate"
              type="date"
              {...register('eventDate')}
              className={cn(inputClass, '[color-scheme:light]')}
            />
          </div>

          <div>
            <label htmlFor="budget" className={labelClass}>
              Estimated Budget
            </label>
            <select id="budget" {...register('budget')} className={inputClass}>
              <option value="">Select range...</option>
              <option value="under-200k">Under NPR 2 Lakhs</option>
              <option value="200k-500k">NPR 2 Lakhs – 5 Lakhs</option>
              <option value="500k-1m">NPR 5 Lakhs – 10 Lakhs</option>
              <option value="1m-plus">NPR 10 Lakhs+</option>
              <option value="custom">Custom scale</option>
            </select>
          </div>
        </div>

        <div>
          <label htmlFor="message" className={labelClass}>
            Project Details *
          </label>
          <textarea
            id="message"
            rows={4}
            {...register('message')}
            placeholder="Tell us about your event scope, venue preferences, or sponsorship goals..."
            aria-required="true"
            aria-invalid={errors.message ? 'true' : undefined}
            className={cn(
              inputClass,
              'resize-none',
              errors.message && 'border-danger'
            )}
          />
          {errors.message && (
            <span className="mt-1 block text-xs text-danger">
              {errors.message.message}
            </span>
          )}
        </div>

        <div className="flex flex-col gap-3 border-t border-line pt-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-muted">* Required fields</p>

          <button
            type="submit"
            disabled={isSubmitting}
            className="btn btn-primary w-full disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Submitting...</span>
              </>
            ) : (
              <span>Submit Inquiry</span>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

export default function ContactForm() {
  return (
    <Suspense
      fallback={
        <div className="rounded-lg border border-line bg-paper-deep p-8 text-center text-sm text-muted">
          Loading form...
        </div>
      }
    >
      <ContactFormInner />
    </Suspense>
  );
}
