'use client';

import { useState } from 'react';
import { ArrowUpRight, CheckCircle2, Loader2 } from 'lucide-react';
import { PavilionScene } from '@/components/three';
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

const fieldLabelClass =
  'mb-2 block font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-muted';

const fieldInputClass =
  'w-full rounded-[4px] border border-line-strong bg-white px-3.5 py-3 text-sm text-ink transition-colors placeholder:text-faint/80 focus:border-forest focus:outline-none focus:ring-2 focus:ring-forest/15';

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
      className="relative overflow-hidden border-b border-line bg-white py-20 md:py-28"
    >
      {/* Subtle Architectural Floor Grid in Deep Emerald Tint */}
      <PavilionScene />

      <div className="container-ed relative z-10">
        <div className="grid items-start gap-12 lg:grid-cols-12 lg:gap-14">
          {/* Left: Open Editorial Studio Brief Desk */}
          <Reveal className="lg:col-span-5">
            <span className="eyebrow flex items-center gap-2.5 text-forest">
              <span className="h-px w-6 bg-forest" aria-hidden="true" />
              05 / Production Desk
            </span>

            <h2 className="display mt-5 text-[clamp(2.2rem,4.2vw,3.8rem)] leading-[0.98] text-ink">
              Commission a show,{' '}
              <span className="serif italic font-normal text-forest">
                launch, or sponsorship.
              </span>
            </h2>

            <p className="mt-5 max-w-md text-sm leading-relaxed text-ink-soft md:text-base">
              From live stage architecture and brand activations to flagship
              talent broadcasts, share your venue timeline and objectives with
              our producers in Biratnagar.
            </p>

            {/* Studio Directory Ledger (Clean Hairline Rows, Zero Pill Boxes) */}
            <dl className="mt-9 divide-y divide-line border-y border-line">
              <div className="flex flex-col gap-1 py-4 sm:flex-row sm:items-baseline sm:justify-between">
                <dt className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-muted">
                  Headquarters
                </dt>
                <dd className="text-sm font-medium text-ink">
                  {siteConfig.location.address}, {siteConfig.location.city}
                </dd>
              </div>

              <div className="flex flex-col gap-1 py-4 sm:flex-row sm:items-baseline sm:justify-between">
                <dt className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-muted">
                  Direct Telephone
                </dt>
                <dd className="mono text-sm font-bold text-forest">
                  <a
                    href={`tel:${siteConfig.contact.phone}`}
                    className="transition-colors hover:text-ink"
                  >
                    {siteConfig.contact.formattedPhone}
                  </a>
                  <span className="mx-2 text-line-strong">/</span>
                  <a
                    href={`tel:${siteConfig.contact.secondaryPhone}`}
                    className="transition-colors hover:text-ink"
                  >
                    {siteConfig.contact.secondaryPhone}
                  </a>
                </dd>
              </div>

              <div className="flex flex-col gap-1 py-4 sm:flex-row sm:items-baseline sm:justify-between">
                <dt className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-muted">
                  Desk Email
                </dt>
                <dd className="text-sm font-medium text-ink">
                  <a
                    href={`mailto:${siteConfig.contact.email}`}
                    className="link-sweep text-ink"
                  >
                    {siteConfig.contact.email}
                  </a>
                </dd>
              </div>

              <div className="flex flex-col gap-1 py-4 sm:flex-row sm:items-baseline sm:justify-between">
                <dt className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-muted">
                  Proposal Turnaround
                </dt>
                <dd className="text-sm text-ink-soft">
                  Within 1 business day
                </dd>
              </div>
            </dl>
          </Reveal>

          {/* Right: Warm Paper Architectural Brief Sheet */}
          <Reveal delay={80} className="lg:col-span-7">
            <div className="rounded-[6px] border border-line bg-paper p-6 shadow-xs sm:p-9">
              {status === 'success' ? (
                <div
                  role="status"
                  className="flex flex-col items-start py-6 text-left"
                >
                  <span className="flex h-11 w-11 items-center justify-center rounded-[4px] bg-forest text-gold">
                    <CheckCircle2 className="h-5 w-5" />
                  </span>
                  <h3 className="display mt-5 text-2xl font-bold text-ink">
                    Project brief logged with our producers.
                  </h3>
                  <p className="mt-2 max-w-md text-sm leading-relaxed text-muted">
                    Thank you for writing to Jay Media Management. Our team at
                    Central Mall, Biratnagar will review your schedule and reply
                    within 1 business day.
                  </p>
                  <button
                    type="button"
                    onClick={() => setStatus('idle')}
                    className="btn btn-accent mt-6 rounded-[4px] px-6 py-3"
                  >
                    <span>Submit another inquiry</span>
                    <ArrowUpRight className="h-4 w-4 text-gold" />
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-5">
                  <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-line pb-4">
                    <div>
                      <span className="font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-forest">
                        Project Brief Sheet
                      </span>
                      <h3 className="display mt-1 text-2xl font-bold text-ink">
                        Share event scope &amp; dates
                      </h3>
                    </div>
                    <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-faint">
                      Biratnagar Studio Desk
                    </span>
                  </div>

                  {status === 'error' && (
                    <div
                      role="alert"
                      className="rounded-[4px] border border-danger/30 bg-red-50 px-4 py-3 text-xs font-medium text-danger"
                    >
                      {errorMsg}
                    </div>
                  )}

                  <div className="grid gap-5 sm:grid-cols-2">
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
                        placeholder="e.g. Rajesh Limbu"
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
                        placeholder="name@company.com"
                        className={fieldInputClass}
                      />
                    </div>
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">
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
                        Production Discipline
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
                      Project Brief, City &amp; Tentative Dates
                    </label>
                    <textarea
                      id="quote-message"
                      required
                      minLength={10}
                      rows={4}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Outline venue location, expected audience capacity, target month, or sponsorship goals..."
                      className={fieldInputClass}
                    />
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-4 border-t border-line pt-5">
                    <span className="text-xs text-muted">
                      Or call directly at{' '}
                      <strong className="mono font-semibold text-ink">
                        {siteConfig.contact.phone}
                      </strong>
                    </span>

                    <button
                      type="submit"
                      disabled={submitting}
                      className="btn btn-accent rounded-[4px] px-7 py-3.5 disabled:opacity-60"
                    >
                      {submitting ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" />
                          <span>Dispatching...</span>
                        </>
                      ) : (
                        <>
                          <span>Submit Project Brief</span>
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
      </div>
    </section>
  );
}
