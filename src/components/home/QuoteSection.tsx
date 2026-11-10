'use client';

import { useState } from 'react';
import {
  User,
  Mail,
  Phone,
  Briefcase,
  MessageSquare,
  Send,
  CheckCircle2,
  Loader2,
} from 'lucide-react';
import SectionHeading from '@/components/shared/SectionHeading';
import Reveal from '@/components/motion/Reveal';
import { WhatsAppIcon } from '@/components/shared/BrandIcons';
import { siteConfig } from '@/config/site';

const PRODUCTION_DISCIPLINES = [
  'Concert Sponsorship & Brand Partnerships',
  'International Concert Production & Ticketing',
  'Stage, Sound & Line-Array Production',
  'Miss Koshi & Pageant Franchises',
  'Corporate Galas & Brand Launches',
  'Broadcast, PR & Film Production',
  'General Inquiry',
] as const;

export default function QuoteSection() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [discipline, setDiscipline] = useState<string>(
    PRODUCTION_DISCIPLINES[0]
  );
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const phoneRaw = siteConfig.contact.phone.replace(/\D/g, '');
  const whatsappUrl = `https://wa.me/977${phoneRaw}?text=${encodeURIComponent(
    'Hello Jay Media Management, I have an inquiry regarding your upcoming events and sponsorships.'
  )}`;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrorMsg('');

    const cleanName = name.trim();
    const cleanEmail = email.trim();
    const cleanPhone = phone.trim();
    const cleanMessage = message.trim();

    if (cleanName.length < 2) {
      setStatus('error');
      setErrorMsg('Please enter your full name (at least 2 characters).');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) {
      setStatus('error');
      setErrorMsg('Please provide a valid email address.');
      return;
    }
    if (cleanPhone.length < 7) {
      setStatus('error');
      setErrorMsg('Please provide a reachable phone number.');
      return;
    }
    if (cleanMessage.length < 10) {
      setStatus('error');
      setErrorMsg(
        'Please share at least a brief sentence about your event dates, venue, or sponsorship goals.'
      );
      return;
    }

    setSubmitting(true);
    setStatus('idle');

    try {
      const res = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: cleanName,
          email: cleanEmail,
          phone: cleanPhone,
          serviceOfInterest: discipline,
          message: `[${discipline}] ${cleanMessage}`,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Could not submit inquiry.');
      }

      setStatus('success');
      setName('');
      setEmail('');
      setPhone('');
      setDiscipline(PRODUCTION_DISCIPLINES[0]);
      setMessage('');
    } catch (err: unknown) {
      setStatus('error');
      setErrorMsg(
        err instanceof Error
          ? err.message
          : 'Unable to send brief right now. Please contact our Biratnagar desk directly.'
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section
      id="inquire"
      className="border-b border-line bg-paper-deep/40 py-16 md:py-24"
    >
      <div className="container-ed max-w-5xl">
        <SectionHeading
          eyebrow="Contact Us"
          title="Work with Jay Media Management."
          description="Reach out for concert sponsorships, arena production, pageantry franchises, or brand activations."
          link={{ href: '/contact', label: 'Full contact details' }}
        />

        <Reveal className="mt-8 overflow-hidden rounded-2xl border border-line bg-white shadow-xs">
          {status === 'success' ? (
            <div role="status" className="p-8 sm:p-12 text-center animate-in fade-in zoom-in-95 duration-200">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-forest-soft text-forest">
                <CheckCircle2 className="h-8 w-8" />
              </div>
              <h3 className="mt-4 text-2xl font-bold text-ink">
                Inquiry Received
              </h3>
              <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-muted">
                Thank you for reaching out. An executive from our Biratnagar headquarters
                will review your requirements and respond within 1 business day.
              </p>
              <button
                type="button"
                onClick={() => setStatus('idle')}
                className="btn btn-outline mt-6"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="p-6 sm:p-8 lg:p-10">
              {status === 'error' && (
                <div
                  role="alert"
                  className="mb-6 rounded-lg border border-danger/30 bg-red-50/80 px-4 py-3 text-xs font-medium text-danger"
                >
                  {errorMsg}
                </div>
              )}

              {/* Form Grid */}
              <div className="grid gap-5 sm:grid-cols-2">
                {/* Full Name */}
                <div>
                  <label
                    htmlFor="quote-name"
                    className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-ink-soft"
                  >
                    Full Name <span className="text-danger">*</span>
                  </label>
                  <div className="relative">
                    <User className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
                    <input
                      id="quote-name"
                      type="text"
                      required
                      minLength={2}
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Aayush Sharma"
                      className="w-full rounded-lg border border-line-strong bg-paper/30 py-2.5 pl-10 pr-3.5 text-sm text-ink transition-colors placeholder:text-muted/60 focus:border-forest focus:bg-white focus:outline-none"
                    />
                  </div>
                </div>

                {/* Email Address */}
                <div>
                  <label
                    htmlFor="quote-email"
                    className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-ink-soft"
                  >
                    Email Address <span className="text-danger">*</span>
                  </label>
                  <div className="relative">
                    <Mail className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
                    <input
                      id="quote-email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. name@company.com"
                      className="w-full rounded-lg border border-line-strong bg-paper/30 py-2.5 pl-10 pr-3.5 text-sm text-ink transition-colors placeholder:text-muted/60 focus:border-forest focus:bg-white focus:outline-none"
                    />
                  </div>
                </div>

                {/* Phone Number */}
                <div>
                  <label
                    htmlFor="quote-phone"
                    className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-ink-soft"
                  >
                    Phone / Mobile <span className="text-danger">*</span>
                  </label>
                  <div className="relative">
                    <Phone className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
                    <input
                      id="quote-phone"
                      type="tel"
                      required
                      minLength={7}
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+977 98XXXXXXXX"
                      className="w-full rounded-lg border border-line-strong bg-paper/30 py-2.5 pl-10 pr-3.5 text-sm text-ink transition-colors placeholder:text-muted/60 focus:border-forest focus:bg-white focus:outline-none"
                    />
                  </div>
                </div>

                {/* Service Dropdown */}
                <div>
                  <label
                    htmlFor="quote-discipline"
                    className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-ink-soft"
                  >
                    Area of Interest
                  </label>
                  <div className="relative">
                    <Briefcase className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
                    <select
                      id="quote-discipline"
                      value={discipline}
                      onChange={(e) => setDiscipline(e.target.value)}
                      className="w-full appearance-none rounded-lg border border-line-strong bg-paper/30 py-2.5 pl-10 pr-8 text-sm text-ink transition-colors focus:border-forest focus:bg-white focus:outline-none"
                    >
                      {PRODUCTION_DISCIPLINES.map((item) => (
                        <option key={item} value={item}>
                          {item}
                        </option>
                      ))}
                    </select>
                    <div className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-muted">
                      ▼
                    </div>
                  </div>
                </div>

                {/* Event Details Textarea (Full Width) */}
                <div className="sm:col-span-2">
                  <label
                    htmlFor="quote-message"
                    className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-ink-soft"
                  >
                    Event &amp; Brief Details <span className="text-danger">*</span>
                  </label>
                  <div className="relative">
                    <MessageSquare className="pointer-events-none absolute left-3.5 top-3.5 h-4 w-4 text-muted" />
                    <textarea
                      id="quote-message"
                      required
                      minLength={10}
                      rows={4}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Share your target dates, venue preferences, sponsorship scope, or event expectations..."
                      className="w-full rounded-lg border border-line-strong bg-paper/30 py-2.5 pl-10 pr-3.5 text-sm leading-relaxed text-ink transition-colors placeholder:text-muted/60 focus:border-forest focus:bg-white focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Bottom Action Row */}
              <div className="mt-8 flex flex-col gap-4 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex flex-wrap items-center gap-3 text-xs text-muted">
                  <span>
                    Direct hotline:{' '}
                    <a
                      href={`tel:${siteConfig.contact.phone}`}
                      className="font-semibold text-ink hover:text-forest"
                    >
                      {siteConfig.contact.phone}
                    </a>
                    {' / '}
                    <a
                      href={`tel:${siteConfig.contact.secondaryPhone}`}
                      className="font-semibold text-ink hover:text-forest"
                    >
                      {siteConfig.contact.secondaryPhone}
                    </a>
                  </span>

                  <span className="text-line-strong">•</span>

                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 font-medium text-emerald-700 hover:underline"
                  >
                    <WhatsAppIcon className="h-3.5 w-3.5" />
                    <span>Chat on WhatsApp</span>
                  </a>
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="btn btn-primary px-7 py-2.5 text-xs font-semibold shadow-xs hover:shadow-md disabled:opacity-60"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <Send className="h-3.5 w-3.5" />
                      <span>Send Inquiry</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </Reveal>
      </div>
    </section>
  );
}
