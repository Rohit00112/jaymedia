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
    <div className="bg-[#0c0c11] border border-white/10 p-8 sm:p-12 rounded-[10px] shadow-2xl font-rubik">
      {submitStatus === 'success' && (
        <div className="mb-8 p-6 bg-[#01402b]/90 border border-[#01402b] text-[#eef9ff] rounded-[10px] flex items-start gap-3 shadow-lg">
          <CheckCircle2 className="w-5 h-5 text-coral shrink-0 mt-0.5" />
          <div>
            <h4 className="font-rubik font-bold text-base text-white">Inquiry Successfully Received</h4>
            <p className="text-sm font-rubik mt-1 text-[#eef9ff]/90 leading-relaxed">
              Thank you for contacting Jay Media Management Pvt. Ltd. Our production desk in Biratnagar will review
              your requirements and respond within 24 hours.
            </p>
          </div>
        </div>
      )}

      {submitStatus === 'error' && (
        <div className="mb-8 p-6 bg-red-950/80 border border-red-800 text-red-200 rounded-[10px] flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
          <div>
            <h4 className="font-rubik font-bold text-base text-white">Submission Notice</h4>
            <p className="text-sm font-rubik mt-1 text-red-300">{errorMessage}</p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Full Name */}
          <div>
            <label className="block text-xs font-rubik uppercase tracking-wider text-[#eef9ff]/70 mb-2 font-medium">
              Full Name *
            </label>
            <input
              type="text"
              {...register('fullName')}
              placeholder="e.g. Ramesh Karki"
              className={cn(
                'w-full px-4 py-3.5 bg-black/60 border border-white/15 text-sm font-rubik text-white rounded-[2px]',
                'focus:outline-none focus:border-coral focus:ring-1 focus:ring-coral transition-colors placeholder-[#eef9ff]/30',
                errors.fullName && 'border-red-500'
              )}
            />
            {errors.fullName && (
              <span className="text-xs text-red-400 font-rubik mt-1 block">
                {errors.fullName.message}
              </span>
            )}
          </div>

          {/* Email Address */}
          <div>
            <label className="block text-xs font-rubik uppercase tracking-wider text-[#eef9ff]/70 mb-2 font-medium">
              Email Address *
            </label>
            <input
              type="email"
              {...register('email')}
              placeholder="e.g. ramesh@example.com"
              className={cn(
                'w-full px-4 py-3.5 bg-black/60 border border-white/15 text-sm font-rubik text-white rounded-[2px]',
                'focus:outline-none focus:border-coral focus:ring-1 focus:ring-coral transition-colors placeholder-[#eef9ff]/30',
                errors.email && 'border-red-500'
              )}
            />
            {errors.email && (
              <span className="text-xs text-red-400 font-rubik mt-1 block">
                {errors.email.message}
              </span>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Phone Number */}
          <div>
            <label className="block text-xs font-rubik uppercase tracking-wider text-[#eef9ff]/70 mb-2 font-medium">
              Phone Number *
            </label>
            <input
              type="tel"
              {...register('phone')}
              placeholder="e.g. +977 98XXXXXXXX"
              className={cn(
                'w-full px-4 py-3.5 bg-black/60 border border-white/15 text-sm font-rubik text-white rounded-[2px]',
                'focus:outline-none focus:border-coral focus:ring-1 focus:ring-coral transition-colors placeholder-[#eef9ff]/30',
                errors.phone && 'border-red-500'
              )}
            />
            {errors.phone && (
              <span className="text-xs text-red-400 font-rubik mt-1 block">
                {errors.phone.message}
              </span>
            )}
          </div>

          {/* Organization */}
          <div>
            <label className="block text-xs font-rubik uppercase tracking-wider text-[#eef9ff]/70 mb-2 font-medium">
              Organization / Brand (Optional)
            </label>
            <input
              type="text"
              {...register('organization')}
              placeholder="e.g. Koshi Enterprise Ltd."
              className="w-full px-4 py-3.5 bg-black/60 border border-white/15 text-sm font-rubik text-white rounded-[2px] focus:outline-none focus:border-coral focus:ring-1 focus:ring-coral transition-colors placeholder-[#eef9ff]/30"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {/* Service of Interest */}
          <div>
            <label className="block text-xs font-rubik uppercase tracking-wider text-[#eef9ff]/70 mb-2 font-medium">
              Service *
            </label>
            <select
              {...register('serviceOfInterest')}
              className="w-full px-4 py-3.5 bg-black/60 border border-white/15 text-sm font-rubik text-white rounded-[2px] focus:outline-none focus:border-coral focus:ring-1 focus:ring-coral transition-colors"
            >
              <option value="event-management" className="bg-[#0c0c11] text-white">Event Management</option>
              <option value="brand-experiences" className="bg-[#0c0c11] text-white">Brand Experiences</option>
              <option value="media-production" className="bg-[#0c0c11] text-white">Media Production</option>
              <option value="product-launches" className="bg-[#0c0c11] text-white">Product Launches</option>
              <option value="press-events" className="bg-[#0c0c11] text-white">Press Events</option>
              <option value="pageant-sponsorship" className="bg-[#0c0c11] text-white">Pageant Sponsorship</option>
              <option value="other" className="bg-[#0c0c11] text-white">Other Inquiry</option>
            </select>
          </div>

          {/* Target Event Date */}
          <div>
            <label className="block text-xs font-rubik uppercase tracking-wider text-[#eef9ff]/70 mb-2 font-medium">
              Target Date (Optional)
            </label>
            <input
              type="date"
              {...register('eventDate')}
              className="w-full px-4 py-3.5 bg-black/60 border border-white/15 text-sm font-rubik text-white rounded-[2px] focus:outline-none focus:border-coral focus:ring-1 focus:ring-coral transition-colors"
            />
          </div>

          {/* Estimated Budget */}
          <div>
            <label className="block text-xs font-rubik uppercase tracking-wider text-[#eef9ff]/70 mb-2 font-medium">
              Estimated Budget (Optional)
            </label>
            <select
              {...register('budget')}
              className="w-full px-4 py-3.5 bg-black/60 border border-white/15 text-sm font-rubik text-white rounded-[2px] focus:outline-none focus:border-coral focus:ring-1 focus:ring-coral transition-colors"
            >
              <option value="" className="bg-[#0c0c11] text-white">Select range...</option>
              <option value="under-200k" className="bg-[#0c0c11] text-white">Under NPR 2 Lakhs</option>
              <option value="200k-500k" className="bg-[#0c0c11] text-white">NPR 2 Lakhs - 5 Lakhs</option>
              <option value="500k-1m" className="bg-[#0c0c11] text-white">NPR 5 Lakhs - 10 Lakhs</option>
              <option value="1m-plus" className="bg-[#0c0c11] text-white">NPR 10 Lakhs+</option>
              <option value="custom" className="bg-[#0c0c11] text-white">Custom Scale</option>
            </select>
          </div>
        </div>

        {/* Project Description */}
        <div>
          <label className="block text-xs font-rubik uppercase tracking-wider text-[#eef9ff]/70 mb-2 font-medium">
            Project Description &amp; Requirements *
          </label>
          <textarea
            rows={5}
            {...register('message')}
            placeholder="Tell us about the scope, anticipated audience size, venue preferences in Biratnagar or Eastern Nepal, and specific production needs..."
            className={cn(
              'w-full px-4 py-3.5 bg-black/60 border border-white/15 text-sm font-rubik text-white rounded-[2px]',
              'focus:outline-none focus:border-coral focus:ring-1 focus:ring-coral transition-colors placeholder-[#eef9ff]/30',
              errors.message && 'border-red-500'
            )}
          />
          {errors.message && (
            <span className="text-xs text-red-400 font-rubik mt-1 block">
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
              'w-full sm:w-auto inline-flex items-center justify-center gap-3 px-10 py-5 rounded-[50px]',
              'bg-coral text-white font-rubik text-xs uppercase tracking-widest font-semibold',
              'hover:bg-coral-hover hover:scale-105 transition-all duration-300 shadow-lg',
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
    <Suspense fallback={<div className="bg-[#0c0c11] border border-white/10 p-12 text-center text-sm font-rubik text-[#eef9ff]/60 rounded-[10px]">Loading production form...</div>}>
      <ContactFormInner />
    </Suspense>
  );
}
