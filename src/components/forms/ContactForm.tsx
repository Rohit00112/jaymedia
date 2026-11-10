'use client';

import { Suspense, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  CheckCircle2,
  AlertCircle,
  Loader2,
  ArrowUpRight,
  ArrowDown,
} from 'lucide-react';
import { inquirySchema, type InquiryFormData } from '@/lib/validations/inquiry';
import { cn } from '@/lib/utils';

const inputClass =
  'w-full rounded-[0.3rem] border border-line bg-paper/60 px-3.5 py-3 text-sm text-ink transition-colors placeholder:text-faint/70 focus:border-accent focus:bg-card focus:outline-none focus:ring-2 focus:ring-accent/15';

const labelClass =
  'mb-2 block font-mono text-[9px] uppercase tracking-[0.16em] text-muted';

const groupLabelClass =
  'mb-7 flex items-center gap-3 border-b border-line pb-3 font-mono text-[9px] uppercase tracking-[0.18em] text-accent';

function ContactFormInner() {
  const searchParams = useSearchParams();
  const initialService = searchParams.get('service') || 'event-management';

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    'idle' | 'success' | 'error'
  >('idle');
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
          className="mb-9 flex items-start gap-4 rounded-[0.3rem] border border-forest/25 bg-forest-soft p-5"
        >
          <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-forest" />
          <div>
            <h3 className="text-base font-semibold text-ink">
              Inquiry successfully received.
            </h3>
            <p className="mt-1.5 text-sm leading-relaxed text-muted">
              Thank you for contacting Jay Media Management. Our production desk
              will review your requirements and respond within 24 hours.
            </p>
          </div>
        </div>
      )}

      {submitStatus === 'error' && (
        <div
          role="alert"
          className="mb-9 flex items-start gap-4 rounded-[0.3rem] border border-accent/35 bg-accent-soft p-5"
        >
          <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
          <div>
            <h3 className="text-base font-semibold text-ink">
              Submission notice
            </h3>
            <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">
              {errorMessage}
            </p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-10" noValidate>
        <div>
          <p className={groupLabelClass}>
            <span aria-hidden="true">01</span>
            About you
          </p>

          <div className="grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-2">
            <div>
              <label htmlFor="fullName" className={labelClass}>
                Full name *
              </label>
              <input
                id="fullName"
                type="text"
                {...register('fullName')}
                placeholder="e.g. Ramesh Karki"
                aria-required="true"
                aria-invalid={errors.fullName ? 'true' : undefined}
                aria-describedby={
                  errors.fullName ? 'fullName-error' : undefined
                }
                className={cn(inputClass, errors.fullName && 'border-accent')}
              />
              {errors.fullName && (
                <span
                  id="fullName-error"
                  className="mt-2 block text-xs text-accent"
                >
                  {errors.fullName.message}
                </span>
              )}
            </div>

            <div>
              <label htmlFor="email" className={labelClass}>
                Email address *
              </label>
              <input
                id="email"
                type="email"
                {...register('email')}
                placeholder="e.g. ramesh@example.com"
                aria-required="true"
                aria-invalid={errors.email ? 'true' : undefined}
                aria-describedby={errors.email ? 'email-error' : undefined}
                className={cn(inputClass, errors.email && 'border-accent')}
              />
              {errors.email && (
                <span id="email-error" className="mt-2 block text-xs text-accent">
                  {errors.email.message}
                </span>
              )}
            </div>

            <div>
              <label htmlFor="phone" className={labelClass}>
                Phone number *
              </label>
              <input
                id="phone"
                type="tel"
                {...register('phone')}
                placeholder="e.g. +977 9851143338"
                aria-required="true"
                aria-invalid={errors.phone ? 'true' : undefined}
                aria-describedby={errors.phone ? 'phone-error' : undefined}
                className={cn(inputClass, errors.phone && 'border-accent')}
              />
              {errors.phone && (
                <span id="phone-error" className="mt-2 block text-xs text-accent">
                  {errors.phone.message}
                </span>
              )}
            </div>

            <div>
              <label htmlFor="organization" className={labelClass}>
                Organization / brand
              </label>
              <input
                id="organization"
                type="text"
                {...register('organization')}
                placeholder="e.g. Koshi Enterprise Ltd."
                className={inputClass}
              />
            </div>
          </div>
        </div>

        <div className="border-t border-line pt-8">
          <p className={groupLabelClass}>
            <span aria-hidden="true">02</span>
            The brief
          </p>

          <div className="grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-3">
            <div>
              <label htmlFor="serviceOfInterest" className={labelClass}>
                Service *
              </label>
              <div className="relative">
                <select
                  id="serviceOfInterest"
                  {...register('serviceOfInterest')}
                  aria-required="true"
                  className={cn(
                    inputClass,
                    'appearance-none pr-9 [&>option]:bg-card [&>option]:text-ink'
                  )}
                >
                  <option value="event-management">Event Management</option>
                  <option value="brand-experiences">Brand Experiences</option>
                  <option value="media-production">Media Production</option>
                  <option value="product-launches">Product Launches</option>
                  <option value="press-events">Press Events</option>
                  <option value="pageant-sponsorship">
                    Pageant Sponsorship
                  </option>
                  <option value="other">Other Inquiry</option>
                </select>
                <ArrowDown
                  className="pointer-events-none absolute right-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-faint"
                  aria-hidden="true"
                />
              </div>
            </div>

            <div>
              <label htmlFor="eventDate" className={labelClass}>
                Target date
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
                Estimated budget
              </label>
              <div className="relative">
                <select
                  id="budget"
                  {...register('budget')}
                  className={cn(
                    inputClass,
                    'appearance-none pr-9 [&>option]:bg-card [&>option]:text-ink'
                  )}
                >
                  <option value="">Select range...</option>
                  <option value="under-200k">Under NPR 2 Lakhs</option>
                  <option value="200k-500k">NPR 2 Lakhs – 5 Lakhs</option>
                  <option value="500k-1m">NPR 5 Lakhs – 10 Lakhs</option>
                  <option value="1m-plus">NPR 10 Lakhs+</option>
                  <option value="custom">Custom scale</option>
                </select>
                <ArrowDown
                  className="pointer-events-none absolute right-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-faint"
                  aria-hidden="true"
                />
              </div>
            </div>
          </div>

          <div className="mt-6">
            <label htmlFor="message" className={labelClass}>
              Project description &amp; requirements *
            </label>
            <textarea
              id="message"
              rows={5}
              {...register('message')}
              placeholder="Tell us about the scope, anticipated audience size, venue preferences, and specific production needs..."
              aria-required="true"
              aria-invalid={errors.message ? 'true' : undefined}
              aria-describedby={errors.message ? 'message-error' : undefined}
              className={cn(
                inputClass,
                'resize-none',
                errors.message && 'border-accent'
              )}
            />
            {errors.message && (
              <span
                id="message-error"
                className="mt-2 block text-xs text-accent"
              >
                {errors.message.message}
              </span>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-5 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-[8px] uppercase leading-relaxed tracking-[0.14em] text-faint">
            * Required fields / Replies within one business day
          </p>

          <button
            type="submit"
            disabled={isSubmitting}
            className="btn btn-primary w-full disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Submitting
              </>
            ) : (
              <>
                Submit inquiry
                <ArrowUpRight className="h-3.5 w-3.5" />
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
    <Suspense
      fallback={
        <div className="rounded-[0.3rem] border border-line bg-paper-deep p-10 text-center text-sm text-muted">
          Loading production form...
        </div>
      }
    >
      <ContactFormInner />
    </Suspense>
  );
}
