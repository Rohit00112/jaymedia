'use client';

import { Suspense, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { inquirySchema, type InquiryFormData } from '@/lib/validations/inquiry';
import { cn } from '@/lib/utils';
import PhoneInput from '@/components/forms/PhoneInput';

const inputClass =
  'w-full rounded-lg border border-line-strong bg-white px-3.5 py-2.5 text-sm text-ink transition-colors placeholder:text-faint focus:border-forest focus:outline-none';

const labelClass = 'mb-1.5 block text-xs font-medium text-ink';

export interface TopicConfig {
  id: string;
  label: string;
  showBudget: boolean;
  showDate: boolean;
  badge?: string;
  dateLabel: string;
  orgLabel: string;
  orgPlaceholder: string;
  messageLabel: string;
  messagePlaceholder: string;
}

export const TOPIC_CONFIGS: Record<string, TopicConfig> = {
  'concert-sponsorship': {
    id: 'concert-sponsorship',
    label: 'Concert Sponsorship & Brand Deals',
    showBudget: true,
    showDate: true,
    badge: 'Sponsorship tiers & custom brand visibility',
    dateLabel: 'Event / Campaign Date',
    orgLabel: 'Company / Brand Name',
    orgPlaceholder: 'e.g. Yeti Airlines, Nabil Bank',
    messageLabel: 'Sponsorship Goals & Scope *',
    messagePlaceholder:
      'Tell us about your brand goals, preferred sponsorship tier (Title, Powered By, Co-Sponsor), or activation ideas...',
  },
  'event-production': {
    id: 'event-production',
    label: 'Live Event & Stage Production',
    showBudget: true,
    showDate: true,
    badge: 'Turnkey stage, line-array audio & LED production',
    dateLabel: 'Target Event Date',
    orgLabel: 'Organization / Host',
    orgPlaceholder: 'e.g. College, Association, Corporate Host',
    messageLabel: 'Production Scope & Venue Requirements *',
    messagePlaceholder:
      'Describe the venue, expected audience size, sound & line-array needs, LED walls, or stage setup...',
  },
  'corporate-events': {
    id: 'corporate-events',
    label: 'Corporate Galas & Brand Launches',
    showBudget: true,
    showDate: true,
    badge: 'Showroom launches, galas & brand activations',
    dateLabel: 'Target Launch Date',
    orgLabel: 'Company / Brand Name',
    orgPlaceholder: 'e.g. Retail Brand, Tech Enterprise',
    messageLabel: 'Event Brief & Turnkey Scope *',
    messagePlaceholder:
      'Tell us about your showroom launch, corporate anniversary, venue preferences, or turnkey requirements...',
  },
  'pageant-partnership': {
    id: 'pageant-partnership',
    label: 'Pageant Franchise & Partnership',
    showBudget: true,
    showDate: true,
    badge: 'Miss Koshi, Mr & Miss Little Koshi regional franchises',
    dateLabel: 'Target Season / Year',
    orgLabel: 'Organization / Regional Partner',
    orgPlaceholder: 'e.g. District Event Co., Modeling Agency',
    messageLabel: 'Franchise & Collaboration Brief *',
    messagePlaceholder:
      'Tell us about your district franchise interest (Miss Koshi / Mr & Miss Little Koshi), venue, or regional audition plans...',
  },
  'film-media': {
    id: 'film-media',
    label: 'Film, Broadcast & PR Production',
    showBudget: true,
    showDate: true,
    badge: 'Commercial films, music videos & broadcast coverage',
    dateLabel: 'Production Timeline / Date',
    orgLabel: 'Production House / Client',
    orgPlaceholder: 'e.g. Media House, Studio, Creative Agency',
    messageLabel: 'Production Brief & Timeline *',
    messagePlaceholder:
      'Describe your film, TV broadcast, music video, shooting location, or post-production needs...',
  },
  'tickets': {
    id: 'tickets',
    label: 'Concert Tickets & Pass Inquiries',
    showBudget: false,
    showDate: true,
    badge: 'Direct box office desk • No budget estimate needed',
    dateLabel: 'Concert / Show Date',
    orgLabel: 'Company / Group (Optional)',
    orgPlaceholder: 'Optional corporate or group name',
    messageLabel: 'Ticket Requirements & Seating Preference *',
    messagePlaceholder:
      'Which concert or event are you attending? Tell us the number of tickets and zone preference (VIP, Fan Pit, General)...',
  },
  'press-media': {
    id: 'press-media',
    label: 'Press, Media & Interview Requests',
    showBudget: false,
    showDate: true,
    badge: 'Press relations & official statements desk • No budget needed',
    dateLabel: 'Interview / Coverage Date',
    orgLabel: 'Media Outlet / Publication',
    orgPlaceholder: 'e.g. Kantipur, OnlineKhabar, Republica',
    messageLabel: 'Press Inquiry & Topics to Cover *',
    messagePlaceholder:
      'Describe your media publication, interview questions, or press coverage schedule for Jay Media...',
  },
  'artist-auditions': {
    id: 'artist-auditions',
    label: 'Auditions & Artist Booking',
    showBudget: false,
    showDate: false,
    badge: 'Talent casting & representation • Only profile details needed',
    dateLabel: 'Availability / Audition Date',
    orgLabel: 'Talent Agency / Artist Stage Name',
    orgPlaceholder: 'Optional stage name or talent agency',
    messageLabel: 'Talent Profile & Background *',
    messagePlaceholder:
      'Share your performance discipline (singer, musician, dancer, model, emcee), portfolio / YouTube / social links, or audition question...',
  },
  'other': {
    id: 'other',
    label: 'General Studio Inquiry',
    showBudget: false,
    showDate: false,
    badge: 'Direct studio assistance • Only essential details needed',
    dateLabel: 'Target Date',
    orgLabel: 'Organization / Brand (Optional)',
    orgPlaceholder: 'Optional',
    messageLabel: 'Your Message *',
    messagePlaceholder:
      'How can our team help you? Ask any general question or arrange an appointment at our Biratnagar headquarters...',
  },
};

export function formatTopicLabel(topic: string): string {
  const cfg = TOPIC_CONFIGS[topic];
  if (cfg) return cfg.label;
  return topic.replace(/[-_]/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
}

function normalizeTopic(raw: string | null): string {
  if (!raw) return 'concert-sponsorship';
  const lower = raw.toLowerCase().trim();
  if (TOPIC_CONFIGS[lower]) return lower;
  if (lower.includes('sponsor')) return 'concert-sponsorship';
  if (lower.includes('ticket') || lower.includes('pass')) return 'tickets';
  if (
    lower.includes('pageant') ||
    lower.includes('koshi') ||
    lower.includes('franchise')
  )
    return 'pageant-partnership';
  if (
    lower.includes('product') ||
    lower.includes('stage') ||
    lower.includes('sound')
  )
    return 'event-production';
  if (
    lower.includes('corp') ||
    lower.includes('launch') ||
    lower.includes('gala')
  )
    return 'corporate-events';
  if (
    lower.includes('film') ||
    lower.includes('video') ||
    lower.includes('broadcast')
  )
    return 'film-media';
  if (
    lower.includes('press') ||
    lower.includes('media') ||
    lower.includes('interview')
  )
    return 'press-media';
  if (
    lower.includes('audition') ||
    lower.includes('artist') ||
    lower.includes('talent')
  )
    return 'artist-auditions';
  if (lower.includes('general') || lower.includes('other')) return 'other';
  return 'concert-sponsorship';
}

function ContactFormInner() {
  const searchParams = useSearchParams();
  const rawTopic =
    searchParams.get('topic') || searchParams.get('service') || '';
  const initialService = normalizeTopic(rawTopic);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    'idle' | 'success' | 'error'
  >('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const {
    register,
    control,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm<InquiryFormData>({
    resolver: zodResolver(inquirySchema),
    defaultValues: {
      phone: '',
      serviceOfInterest: initialService,
      budget: '',
      eventDate: '',
      organization: '',
      fullName: '',
      email: '',
      message: '',
    },
  });

  const selectedTopic = watch('serviceOfInterest') || initialService;
  const currentConfig = TOPIC_CONFIGS[selectedTopic] || TOPIC_CONFIGS['other'];

  // Handle dynamic field changes when switching topic
  const handleTopicChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const nextTopic = e.target.value;
    setValue('serviceOfInterest', nextTopic);
    const cfg = TOPIC_CONFIGS[nextTopic] || TOPIC_CONFIGS['other'];
    if (!cfg.showBudget) {
      setValue('budget', '');
    }
    if (!cfg.showDate) {
      setValue('eventDate', '');
    }
  };

  const onSubmit = async (data: InquiryFormData) => {
    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    // Sanitize conditional fields based on topic config
    const sanitizedData: InquiryFormData = {
      ...data,
      budget: currentConfig.showBudget ? (data.budget || '') : '',
      eventDate: currentConfig.showDate ? (data.eventDate || '') : '',
    };

    try {
      const response = await fetch('/api/inquiries', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(sanitizedData),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.error || 'Failed to submit inquiry. Please try again.'
        );
      }

      setSubmitStatus('success');
      reset({
        phone: '',
        serviceOfInterest: selectedTopic,
        budget: '',
        eventDate: '',
        organization: '',
        fullName: '',
        email: '',
        message: '',
      });
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

  const visibleFieldsCount =
    1 + (currentConfig.showDate ? 1 : 0) + (currentConfig.showBudget ? 1 : 0);

  const dynamicGridCols =
    visibleFieldsCount === 3
      ? 'sm:grid-cols-3'
      : visibleFieldsCount === 2
        ? 'sm:grid-cols-2'
        : 'sm:grid-cols-1';

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

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
        {/* Row 1 & 2: Contact Info */}
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
            <Controller
              name="phone"
              control={control}
              render={({ field }) => (
                <PhoneInput
                  id="phone"
                  name={field.name}
                  value={field.value ?? ''}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                  required
                  invalid={!!errors.phone}
                />
              )}
            />
            {errors.phone && (
              <span className="mt-1 block text-xs text-danger">
                {errors.phone.message}
              </span>
            )}
          </div>

          <div>
            <label htmlFor="organization" className={labelClass}>
              {currentConfig.orgLabel}
            </label>
            <input
              id="organization"
              type="text"
              {...register('organization')}
              placeholder={currentConfig.orgPlaceholder}
              className={inputClass}
            />
          </div>
        </div>

        {/* Row 3: Dynamic Topic & Contextual Fields */}
        <div className={cn('grid grid-cols-1 gap-4', dynamicGridCols)}>
          <div>
            <div className="mb-1.5 flex items-center justify-between">
              <label htmlFor="serviceOfInterest" className={labelClass}>
                Topic / Inquiry Type *
              </label>
            </div>
            <select
              id="serviceOfInterest"
              {...register('serviceOfInterest', {
                onChange: handleTopicChange,
              })}
              aria-required="true"
              className={inputClass}
            >
              <optgroup label="Sponsorships & Production">
                <option value="concert-sponsorship">
                  Concert Sponsorship &amp; Brand Deals
                </option>
                <option value="event-production">
                  Live Event &amp; Stage Production
                </option>
                <option value="corporate-events">
                  Corporate Galas &amp; Brand Launches
                </option>
                <option value="pageant-partnership">
                  Pageant Franchise &amp; Partnership
                </option>
                <option value="film-media">
                  Film, Broadcast &amp; PR Production
                </option>
              </optgroup>
              <optgroup label="Audience, Press & General">
                <option value="tickets">Concert Tickets &amp; Passes</option>
                <option value="press-media">
                  Press, Media &amp; Interview Requests
                </option>
                <option value="artist-auditions">
                  Auditions &amp; Artist Booking
                </option>
                <option value="other">General Studio Inquiry</option>
              </optgroup>
            </select>
            {currentConfig.badge && (
              <p className="mt-1.5 flex items-center gap-1.5 text-[11px] text-muted">
                <span className="inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-forest" />
                <span>{currentConfig.badge}</span>
              </p>
            )}
          </div>

          {/* Conditional Target Date */}
          {currentConfig.showDate && (
            <div className="animate-in fade-in duration-200">
              <label htmlFor="eventDate" className={labelClass}>
                {currentConfig.dateLabel}
              </label>
              <input
                id="eventDate"
                type="date"
                {...register('eventDate')}
                className={cn(inputClass, '[color-scheme:light]')}
              />
            </div>
          )}

          {/* Conditional Estimated Budget */}
          {currentConfig.showBudget && (
            <div className="animate-in fade-in duration-200">
              <label htmlFor="budget" className={labelClass}>
                Estimated Budget
              </label>
              <select
                id="budget"
                {...register('budget')}
                className={inputClass}
              >
                <option value="">Select range...</option>
                <option value="under-200k">Under NPR 2 Lakhs</option>
                <option value="200k-500k">NPR 2 Lakhs – 5 Lakhs</option>
                <option value="500k-1.5m">NPR 5 Lakhs – 15 Lakhs</option>
                <option value="1.5m-3.5m">NPR 15 Lakhs – 35 Lakhs</option>
                <option value="3.5m-plus">NPR 35 Lakhs+ (Title / Mega)</option>
                <option value="custom">Custom scale / Discussion</option>
              </select>
            </div>
          )}
        </div>

        {/* Row 4: Dynamic Message / Brief */}
        <div>
          <label htmlFor="message" className={labelClass}>
            {currentConfig.messageLabel}
          </label>
          <textarea
            id="message"
            rows={4}
            {...register('message')}
            placeholder={currentConfig.messagePlaceholder}
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
