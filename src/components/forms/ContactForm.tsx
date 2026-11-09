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
  'w-full border-b border-line bg-transparent py-3.5 text-sm text-paper transition-colors placeholder:text-faint focus:border-coral focus:outline-none';

const labelClass =
  'mb-2 block text-[9px] font-medium uppercase tracking-[0.18em] text-faint';

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
    <div className="font-body">
      {submitStatus === 'success' && (
        <div className="mb-8 flex items-start gap-4 border border-coral/50 p-6">
          <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-coral" />
          <div>
            <h3 className="display text-xl text-paper">
              Inquiry successfully received.
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              Thank you for contacting Jay Media Management. Our production desk
              will review your requirements and respond within 24 hours.
            </p>
          </div>
        </div>
      )}

      {submitStatus === 'error' && (
        <div className="mb-8 flex items-start gap-4 border border-coral bg-coral/10 p-6">
          <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-coral" />
          <div>
            <h3 className="display text-xl text-paper">Submission notice</h3>
            <p className="mt-2 text-sm leading-relaxed text-paper/75">
              {errorMessage}
            </p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-7" noValidate>
        <div className="grid grid-cols-1 gap-x-8 gap-y-7 sm:grid-cols-2">
          <div>
            <label htmlFor="fullName" className={labelClass}>
              Full name *
            </label>
            <input
              id="fullName"
              type="text"
              {...register('fullName')}
              placeholder="e.g. Ramesh Karki"
              aria-invalid={errors.fullName ? 'true' : undefined}
              aria-describedby={errors.fullName ? 'fullName-error' : undefined}
              className={cn(inputClass, errors.fullName && 'border-coral')}
            />
            {errors.fullName && (
              <span id="fullName-error" className="mt-2 block text-xs text-coral">
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
              aria-invalid={errors.email ? 'true' : undefined}
              aria-describedby={errors.email ? 'email-error' : undefined}
              className={cn(inputClass, errors.email && 'border-coral')}
            />
            {errors.email && (
              <span id="email-error" className="mt-2 block text-xs text-coral">
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
              placeholder="e.g. +977 98XXXXXXXX"
              aria-invalid={errors.phone ? 'true' : undefined}
              aria-describedby={errors.phone ? 'phone-error' : undefined}
              className={cn(inputClass, errors.phone && 'border-coral')}
            />
            {errors.phone && (
              <span id="phone-error" className="mt-2 block text-xs text-coral">
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

        <div className="grid grid-cols-1 gap-x-8 gap-y-7 sm:grid-cols-3">
          <div>
            <label htmlFor="serviceOfInterest" className={labelClass}>
              Service *
            </label>
            <div className="relative">
              <select
                id="serviceOfInterest"
                {...register('serviceOfInterest')}
                className={cn(
                  inputClass,
                  'appearance-none pr-8 [&>option]:bg-surface [&>option]:text-paper'
                )}
              >
                <option value="event-management">Event Management</option>
                <option value="brand-experiences">Brand Experiences</option>
                <option value="media-production">Media Production</option>
                <option value="product-launches">Product Launches</option>
                <option value="press-events">Press Events</option>
                <option value="pageant-sponsorship">Pageant Sponsorship</option>
                <option value="other">Other Inquiry</option>
              </select>
              <ArrowDown
                className="pointer-events-none absolute right-0 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-faint"
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
              className={cn(inputClass, '[color-scheme:dark]')}
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
                  'appearance-none pr-8 [&>option]:bg-surface [&>option]:text-paper'
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
                className="pointer-events-none absolute right-0 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-faint"
                aria-hidden="true"
              />
            </div>
          </div>
        </div>

        <div>
          <label htmlFor="message" className={labelClass}>
            Project description &amp; requirements *
          </label>
          <textarea
            id="message"
            rows={5}
            {...register('message')}
            placeholder="Tell us about the scope, anticipated audience size, venue preferences, and specific production needs..."
            aria-invalid={errors.message ? 'true' : undefined}
            aria-describedby={errors.message ? 'message-error' : undefined}
            className={cn(inputClass, 'resize-none', errors.message && 'border-coral')}
          />
          {errors.message && (
            <span id="message-error" className="mt-2 block text-xs text-coral">
              {errors.message.message}
            </span>
          )}
        </div>

        <div className="flex flex-col gap-4 pt-2 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[10px] uppercase tracking-[0.16em] text-faint">
            * Required fields
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
        <div className="border border-line p-10 text-center text-sm text-faint">
          Loading production form...
        </div>
      }
    >
      <ContactFormInner />
    </Suspense>
  );
}
