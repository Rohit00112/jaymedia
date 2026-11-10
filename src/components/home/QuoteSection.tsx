'use client';

import { useState } from 'react';
import { ArrowUpRight, CheckCircle2, Loader2 } from 'lucide-react';
import SectionHeading from '@/components/shared/SectionHeading';
import Reveal from '@/components/motion/Reveal';
import { siteConfig } from '@/config/site';

const PRODUCTION_DISCIPLINES = [
  'Event Management & Stagecraft',
  'Store & Product Launch',
  'Brand Activation & Sponsorship',
  'Film & Media Production',
  'Award Show & Pageantry',
  'Press & Broadcast Coverage',
] as const;

const fieldLabelClass = 'mb-1.5 block text-xs font-semibold text-ink';

const fieldInputClass =
  'w-full rounded-md border border-line-strong bg-white px-3.5 py-3 text-sm text-ink transition-colors placeholder:text-faint/80 focus:border-forest focus:outline-none focus:ring-2 focus:ring-forest/15';

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
        'Please share at least a brief sentence about your event dates, venue, or scope.'
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
          : 'Unable to send brief right now. Please call our Biratnagar desk directly.'
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section
      id="quote"
      className="border-b border-line bg-white py-20 md:py-24"
    >
      <div className="container-ed">
        <SectionHeading
          eyebrow="Contact Us"
          title="Work with Jay Media Management."
          description="Reach out for concert sponsorships, stage production, or corporate event management."
          link={{ href: '/contact', label: 'Full contact details' }}
        />

        <Reveal delay={50}>
          <div className="rounded-lg border border-line bg-paper-deep/50 p-6 sm:p-9">
            {status === 'success' ? (
              <div
                role="status"
                className="flex flex-col items-start py-6 text-left"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-md bg-forest text-gold">
                  <CheckCircle2 className="h-5 w-5" />
                </span>
                <h3 className="display mt-5 text-2xl font-bold text-ink">
                  Message received.
                </h3>
                <p className="mt-2 max-w-md text-sm leading-relaxed text-muted">
                  Thank you for contacting Jay Media Management. Our team in
                  Biratnagar will respond within 1 business day.
                </p>
                <button
                  type="button"
                  onClick={() => setStatus('idle')}
                  className="btn btn-accent mt-6"
                >
                  <span>Send another message</span>
                  <ArrowUpRight className="h-4 w-4 text-gold" />
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-6">
                {status === 'error' && (
                  <div
                    role="alert"
                    className="rounded-md border border-danger/30 bg-red-50 px-4 py-3 text-xs font-medium text-danger"
                  >
                    {errorMsg}
                  </div>
                )}

                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                  <div>
                    <label htmlFor="quote-name" className={fieldLabelClass}>
                      Full Name
                    </label>
                    <input
                      id="quote-name"
                      type="text"
                      required
                      minLength={2}
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Your name"
                      className={fieldInputClass}
                    />
                  </div>

                  <div>
                    <label htmlFor="quote-email" className={fieldLabelClass}>
                      Email Address
                    </label>
                    <input
                      id="quote-email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@example.com"
                      className={fieldInputClass}
                    />
                  </div>

                  <div>
                    <label htmlFor="quote-phone" className={fieldLabelClass}>
                      Phone Number
                    </label>
                    <input
                      id="quote-phone"
                      type="tel"
                      required
                      minLength={7}
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+977 98XXXXXXXX"
                      className={fieldInputClass}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="quote-discipline"
                      className={fieldLabelClass}
                    >
                      Service
                    </label>
                    <select
                      id="quote-discipline"
                      value={discipline}
                      onChange={(e) => setDiscipline(e.target.value)}
                      className={fieldInputClass}
                    >
                      {PRODUCTION_DISCIPLINES.map((item) => (
                        <option key={item} value={item}>
                          {item}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="quote-message" className={fieldLabelClass}>
                    Event Details
                  </label>
                  <textarea
                    id="quote-message"
                    required
                    minLength={10}
                    rows={3}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tell us about your event, dates, or sponsorship inquiry..."
                    className={fieldInputClass}
                  />
                </div>

                <div className="flex flex-wrap items-center justify-between gap-4 border-t border-line pt-5">
                  <span className="text-sm text-muted">
                    Direct line:{' '}
                    <strong className="font-semibold text-ink">
                      {siteConfig.contact.phone} /{' '}
                      {siteConfig.contact.secondaryPhone}
                    </strong>
                  </span>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="btn btn-accent px-8 disabled:opacity-60"
                  >
                    {submitting ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <span>Send Inquiry</span>
                        <ArrowUpRight className="h-4 w-4 text-gold" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
