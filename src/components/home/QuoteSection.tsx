'use client';

import { useState } from 'react';
import {
  CheckCircle2,
  Clock,
  Loader2,
  Phone,
  Reply,
  Send,
} from 'lucide-react';
import { PavilionScene } from '@/components/three';
import { siteConfig } from '@/config/site';

export default function QuoteSection() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setStatus('idle');
    setErrorMsg('');

    try {
      const res = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: name,
          email,
          phone: phone || '9851143338',
          serviceOfInterest: subject || 'Event Management & Production',
          message:
            message.length >= 10
              ? `${subject ? `[${subject}] ` : ''}${message}`
              : `${subject ? `[${subject}] ` : ''}${message} — Free quote inquiry submitted via homepage.`,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Could not submit quote request.');
      }

      setStatus('success');
      setName('');
      setEmail('');
      setPhone('');
      setSubject('');
      setMessage('');
    } catch (err: unknown) {
      setStatus('error');
      setErrorMsg(
        err instanceof Error
          ? err.message
          : 'Something went wrong. Please call us directly.'
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section id="quote" className="bg-paper py-16 md:py-24">
      <div className="container-ed">
        <div className="relative overflow-hidden rounded-[6px] bg-forest px-6 py-12 text-white shadow-[0_32px_70px_-28px_rgba(1,64,43,0.45)] sm:px-10 md:px-14 md:py-16">
          {/* Three.js Ambient Gold Stage Embers & Subtle Torus Depth */}
          <PavilionScene />

          {/* Subtle top gold reflection hairline */}
          <div
            className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/55 to-transparent"
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute -right-24 -top-24 h-[28rem] w-[28rem] rounded-full bg-gold/10 blur-[110px]"
            aria-hidden="true"
          />

          <div className="relative z-10 grid items-center gap-12 lg:grid-cols-12">
            {/* Left Copy */}
            <div className="lg:col-span-6">
              <span className="eyebrow inline-flex items-center gap-2.5 text-gold">
                <span className="h-px w-6 bg-gold" aria-hidden="true" />
                05 / Request A Quote
              </span>

              <h2 className="display mt-4 text-[clamp(2.1rem,4.1vw,3.5rem)] leading-tight text-white">
                Need a tailored proposal for your{' '}
                <span className="serif italic font-normal text-gold">
                  next production?
                </span>
              </h2>

              <div className="mt-7 grid gap-3.5 sm:grid-cols-2">
                <div className="flex items-center gap-3 rounded-[10px] border border-white/15 bg-white/8 px-4 py-3.5">
                  <Reply className="h-4 w-4 shrink-0 text-gold" />
                  <span className="text-xs font-semibold tracking-wide text-sand sm:text-sm">
                    Reply within 24 hours
                  </span>
                </div>
                <div className="flex items-center gap-3 rounded-[10px] border border-white/15 bg-white/8 px-4 py-3.5">
                  <Clock className="h-4 w-4 shrink-0 text-gold" />
                  <span className="text-xs font-semibold tracking-wide text-sand sm:text-sm">
                    Direct phone consultation
                  </span>
                </div>
              </div>

              <p className="mt-6 max-w-lg text-sm leading-relaxed text-white/80 md:text-base">
                Share the scope of your corporate launch, brand sponsorship,
                award show, or stage event. Our Biratnagar desk responds with a
                structured budget and execution schedule.
              </p>

              <a
                href={`tel:${siteConfig.contact.phone}`}
                className="mt-8 inline-flex items-center gap-4 rounded-[12px] border border-white/20 bg-white/10 pr-6 transition-colors hover:bg-white/15"
              >
                <span className="flex h-14 w-14 items-center justify-center rounded-l-[11px] bg-sand text-forest">
                  <Phone className="h-5 w-5" />
                </span>
                <div>
                  <span className="block text-[11px] uppercase tracking-wider text-white/75">
                    Call to ask any question
                  </span>
                  <span className="mono text-lg font-bold tracking-tight text-gold">
                    {siteConfig.contact.formattedPhone}
                  </span>
                </div>
              </a>
            </div>

            {/* Right Porcelain White Form Card */}
            <div className="lg:col-span-6">
              <div className="rounded-[14px] bg-white p-7 text-ink shadow-2xl sm:p-9">
                {status === 'success' ? (
                  <div
                    role="status"
                    className="flex flex-col items-center py-8 text-center"
                  >
                    <span className="flex h-14 w-14 items-center justify-center rounded-[4px] bg-forest text-gold">
                      <CheckCircle2 className="h-7 w-7" />
                    </span>
                    <h3 className="display mt-4 text-2xl font-bold text-forest">
                      Quote Request Received
                    </h3>
                    <p className="mt-2 max-w-sm text-sm text-muted">
                      Thank you for contacting Jay Media Management. Our
                      production team in Biratnagar will follow up within 24
                      hours.
                    </p>
                    <button
                      type="button"
                      onClick={() => setStatus('idle')}
                      className="btn btn-accent mt-6 rounded-[3px] px-6 py-2.5 text-xs font-bold uppercase tracking-wider"
                    >
                      Send Another Request
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="mb-2 border-b border-line pb-4">
                      <h3 className="display text-2xl font-bold text-ink">
                        Request a Free Quote
                      </h3>
                      <p className="mt-1 text-xs text-muted">
                        Tell us about your event date, venue, and creative vision.
                      </p>
                    </div>

                    {status === 'error' && (
                      <div
                        role="alert"
                        className="rounded-[6px] border border-danger/30 bg-red-50 px-4 py-3 text-xs font-medium text-danger"
                      >
                        {errorMsg}
                      </div>
                    )}

                    <div className="grid gap-4 sm:grid-cols-2">
                      <input
                        type="text"
                        required
                        minLength={2}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Your Name *"
                        aria-label="Your Name"
                        className="w-full rounded-[8px] border border-line-strong bg-paper px-4 py-3 text-sm text-ink placeholder:text-faint focus:border-forest focus:bg-white focus:outline-none"
                      />
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Your Email *"
                        aria-label="Your Email"
                        className="w-full rounded-[8px] border border-line-strong bg-paper px-4 py-3 text-sm text-ink placeholder:text-faint focus:border-forest focus:bg-white focus:outline-none"
                      />
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <input
                        type="tel"
                        required
                        minLength={7}
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="Phone Number *"
                        aria-label="Phone Number"
                        className="w-full rounded-[8px] border border-line-strong bg-paper px-4 py-3 text-sm text-ink placeholder:text-faint focus:border-forest focus:bg-white focus:outline-none"
                      />
                      <input
                        type="text"
                        required
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        placeholder="Subject / Service *"
                        aria-label="Subject"
                        className="w-full rounded-[8px] border border-line-strong bg-paper px-4 py-3 text-sm text-ink placeholder:text-faint focus:border-forest focus:bg-white focus:outline-none"
                      />
                    </div>

                    <textarea
                      required
                      minLength={10}
                      rows={4}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Project brief, event details, or sponsorship inquiry *"
                      aria-label="Message"
                      className="w-full rounded-[8px] border border-line-strong bg-paper px-4 py-3 text-sm text-ink placeholder:text-faint focus:border-forest focus:bg-white focus:outline-none"
                    />

                    <button
                      type="submit"
                      disabled={submitting}
                      className="btn btn-accent w-full rounded-[3px] py-3.5 text-sm font-bold uppercase tracking-[0.12em] shadow-sm disabled:opacity-60"
                    >
                      {submitting ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" />
                          <span>Sending Proposal Request...</span>
                        </>
                      ) : (
                        <>
                          <Send className="h-4 w-4 text-gold" />
                          <span>Request A Quote</span>
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
