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
  'w-full rounded-[2px] border border-line-strong bg-white px-3.5 py-3 text-sm text-ink transition-colors placeholder:text-faint/80 focus:border-forest focus:outline-none focus:ring-2 focus:ring-forest/15';

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
      className="relative overflow-hidden border-b border-line bg-paper-deep py-20 md:py-24"
    >
      {/* Calm Daylight Wireframe Horizon Grid */}
      <PavilionScene />

      <div className="container-ed relative z-10">
        {/* Top Wide Studio Headline + 4-Cell Directory Ribbon */}
        <Reveal>
          <div className="grid items-end gap-6 border-b border-ink/15 pb-8 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <span className="eyebrow inline-flex items-center gap-2.5 text-forest">
                <span className="h-2.5 w-1 bg-forest" aria-hidden="true" />
                05 / Studio Desk
              </span>
              <h2 className="display mt-4 text-[clamp(2.1rem,4vw,3.6rem)] font-bold text-ink">
                Commission a show,{' '}
                <span className="text-forest">launch, or sponsorship.</span>
              </h2>
            </div>

            <div className="lg:col-span-5">
              <p className="text-sm leading-relaxed text-ink-soft md:text-base">
                Share venue timelines, expected capacity, or sponsorship
                objectives with our Biratnagar producers for stage schematics
                and itemized execution schedules.
              </p>
            </div>
          </div>

          <dl className="grid gap-6 border-b border-line py-6 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <dt className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-muted">
                Headquarters
              </dt>
              <dd className="mt-1.5 text-sm font-medium text-ink">
                {siteConfig.location.address}, {siteConfig.location.city}
              </dd>
            </div>
            <div>
              <dt className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-muted">
                Direct Telephone
              </dt>
              <dd className="mono mt-1.5 text-sm font-bold text-forest">
                <a href={`tel:${siteConfig.contact.phone}`}>
                  {siteConfig.contact.formattedPhone}
                </a>
                <span className="mx-1.5 text-line-strong">/</span>
                <a href={`tel:${siteConfig.contact.secondaryPhone}`}>
                  {siteConfig.contact.secondaryPhone}
                </a>
              </dd>
            </div>
            <div>
              <dt className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-muted">
                Desk Email
              </dt>
              <dd className="mt-1.5 text-sm font-medium text-ink">
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="link-sweep text-ink"
                >
                  {siteConfig.contact.email}
                </a>
              </dd>
            </div>
            <div>
              <dt className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-muted">
                Proposal Turnaround
              </dt>
              <dd className="mt-1.5 text-sm font-medium text-ink">
                Within 1 business day
              </dd>
            </div>
          </dl>
        </Reveal>

        {/* Full-Width Clean Architectural Brief Sheet */}
        <Reveal delay={70}>
          <div className="mt-8 border border-line bg-white p-6 shadow-xs sm:p-9">
            {status === 'success' ? (
              <div
                role="status"
                className="flex flex-col items-start py-6 text-left"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-[2px] bg-forest text-gold">
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
                  className="btn btn-accent mt-6"
                >
                  <span>Submit another inquiry</span>
                  <ArrowUpRight className="h-4 w-4 text-gold" />
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-6">
                <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-line pb-4">
                  <div>
                    <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-forest">
                      Project Brief Sheet
                    </span>
                    <h3 className="display mt-1 text-xl font-bold text-ink sm:text-2xl">
                      Direct Dispatch to Producers
                    </h3>
                  </div>
                  <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-faint">
                    Biratnagar Studio Desk
                  </span>
                </div>

                {status === 'error' && (
                  <div
                    role="alert"
                    className="border border-danger/30 bg-red-50 px-4 py-3 text-xs font-medium text-danger"
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
                    rows={3}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Outline venue location, expected audience capacity, target month, or sponsorship goals..."
                    className={fieldInputClass}
                  />
                </div>

                <div className="flex flex-wrap items-center justify-between gap-4 border-t border-line pt-5">
                  <span className="text-xs text-muted">
                    Prefer a direct briefing call? Reach{' '}
                    <strong className="mono font-semibold text-ink">
                      {siteConfig.contact.phone}
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
    </section>
  );
}
