'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  AlertCircle,
  ArrowUpRight,
  Camera,
  CheckCircle2,
  FileImage,
  Loader2,
  MapPin,
  QrCode,
  ShieldCheck,
  UserCheck,
  Video,
} from 'lucide-react';
import { EVENTS_DATA, type EventDetailData } from '@/config/events-data';
import type { RegistrationRecord } from '@/lib/validations/registration';
import { cn } from '@/lib/utils';

interface EventRegistrationFormProps {
  eventSlug: string;
  eventTitle: string;
  availableEvents?: EventDetailData[];
}

const fieldClass =
  'w-full rounded-[8px] border border-line-strong bg-white px-4 py-3 text-sm text-ink placeholder:text-faint focus:border-forest focus:outline-none focus:ring-2 focus:ring-forest/15';

const labelClass =
  'mb-1.5 block font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-ink-soft';

export default function EventRegistrationForm({
  eventSlug,
  eventTitle,
  availableEvents,
}: EventRegistrationFormProps) {
  const [eventsList, setEventsList] = useState<EventDetailData[]>(
    availableEvents || EVENTS_DATA.filter((e) => e.registrationOpen)
  );
  const [selectedEventSlug, setSelectedEventSlug] = useState(eventSlug);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [gender, setGender] = useState<'Male' | 'Female' | 'Others'>('Female');
  const [age, setAge] = useState('');
  const [address, setAddress] = useState('');
  const [school, setSchool] = useState('');
  const [hobbies, setHobbies] = useState('');
  const [auditionMode, setAuditionMode] = useState<
    'In-Person District Audition' | 'Online Video Audition'
  >('In-Person District Audition');
  const [auditionVideoUrl, setAuditionVideoUrl] = useState('');
  const [photoFilename, setPhotoFilename] = useState('');
  const [photoPreviewUrl, setPhotoPreviewUrl] = useState<string | null>(null);

  const [parentName, setParentName] = useState('');
  const [parentEmail, setParentEmail] = useState('');
  const [parentPhone, setParentPhone] = useState('');
  const [paymentTransactionId, setPaymentTransactionId] = useState('');
  const [paymentReceiptFilename, setPaymentReceiptFilename] = useState('');
  const [receiptPreviewUrl, setReceiptPreviewUrl] = useState<string | null>(null);

  const [termsAccepted, setTermsAccepted] = useState(false);
  const [guardianAgreementAccepted, setGuardianAgreementAccepted] = useState(false);

  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [issuedRecord, setIssuedRecord] = useState<RegistrationRecord | null>(null);

  useEffect(() => {
    let active = true;
    fetch('/api/events')
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (active && Array.isArray(data?.events) && data.events.length > 0) {
          setEventsList(
            data.events.filter((e: EventDetailData) => e.registrationOpen !== false)
          );
        }
      })
      .catch(() => {});
    return () => {
      active = false;
    };
  }, []);

  const currentEvent =
    eventsList.find((e) => e.slug === selectedEventSlug) || eventsList[0];
  const activeEventTitle = currentEvent?.title || eventTitle;
  const ageRange = currentEvent?.ageRange || { min: 4, max: 40, placeholder: 'Age' };

  function handlePhotoSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setPhotoFilename(file.name);
    setPhotoPreviewUrl(URL.createObjectURL(file));
  }

  function handleReceiptSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setPaymentReceiptFilename(file.name);
    setReceiptPreviewUrl(URL.createObjectURL(file));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setErrorMsg('');

    try {
      // Note: Upload contestantPhoto & paymentReceipt files to Firebase Storage here
      // before saving their downloadURL to Firestore alongside these metadata fields.
      const res = await fetch('/api/registrations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          eventSlug: selectedEventSlug,
          name,
          phone,
          gender,
          age: Number(age),
          address,
          school,
          hobbies,
          auditionMode,
          auditionVideoUrl,
          photoFilename,
          parentName,
          parentEmail,
          parentPhone,
          paymentTransactionId,
          paymentReceiptFilename,
          termsAccepted,
          guardianAgreementAccepted,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(
          data.error || 'Please review required fields and accept both agreements.'
        );
      }

      setIssuedRecord(data.record);
    } catch (err: unknown) {
      setErrorMsg(
        err instanceof Error ? err.message : 'Unable to submit registration.'
      );
    } finally {
      setSubmitting(false);
    }
  }

  if (issuedRecord) {
    return (
      <div className="overflow-hidden rounded-[6px] border-2 border-forest bg-white p-8 shadow-xl sm:p-10">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-line pb-6">
          <div className="flex items-center gap-3">
            <span className="flex h-12 w-12 items-center justify-center rounded-[4px] bg-forest text-gold">
              <CheckCircle2 className="h-6 w-6" />
            </span>
            <div>
              <span className="font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-forest">
                Registration Confirmed
              </span>
              <h2 className="display text-2xl font-bold text-ink sm:text-3xl">
                Official Contestant Slip
              </h2>
            </div>
          </div>

          <div className="rounded-[8px] bg-sand px-5 py-3 text-center">
            <span className="block font-mono text-[9px] uppercase tracking-wider text-muted">
              Contestant User Code
            </span>
            <span className="mono text-xl font-bold tracking-tight text-forest">
              {issuedRecord.userCode}
            </span>
          </div>
        </div>

        <dl className="mt-6 grid gap-5 sm:grid-cols-2 md:grid-cols-3">
          <div>
            <dt className="font-mono text-[10px] uppercase tracking-wider text-faint">
              Contestant Name
            </dt>
            <dd className="mt-1 text-base font-bold text-ink">
              {issuedRecord.name}
            </dd>
          </div>
          <div>
            <dt className="font-mono text-[10px] uppercase tracking-wider text-faint">
              Audition Mode
            </dt>
            <dd className="mt-1 text-sm font-semibold text-forest">
              {issuedRecord.auditionMode}
            </dd>
          </div>
          <div>
            <dt className="font-mono text-[10px] uppercase tracking-wider text-faint">
              Application Status
            </dt>
            <dd className="mt-1 text-sm font-semibold text-ink-soft">
              {issuedRecord.status}
            </dd>
          </div>
          <div>
            <dt className="font-mono text-[10px] uppercase tracking-wider text-faint">
              Age &amp; Gender
            </dt>
            <dd className="mt-1 text-sm text-ink-soft">
              {issuedRecord.age} Years ({issuedRecord.gender})
            </dd>
          </div>
          <div>
            <dt className="font-mono text-[10px] uppercase tracking-wider text-faint">
              School / Academy
            </dt>
            <dd className="mt-1 text-sm text-ink-soft">{issuedRecord.school}</dd>
          </div>
          <div>
            <dt className="font-mono text-[10px] uppercase tracking-wider text-faint">
              Guardian Name
            </dt>
            <dd className="mt-1 text-sm text-ink-soft">
              {issuedRecord.parentName}
            </dd>
          </div>
        </dl>

        <div className="mt-8 rounded-[8px] bg-forest-soft p-4 text-sm text-forest">
          Save your User Code <strong>{issuedRecord.userCode}</strong>. Track
          QR verification and audition hub scheduling anytime in the{' '}
          <Link
            href="/#application-status"
            className="font-bold underline underline-offset-4"
          >
            Application Status Tracker
          </Link>
          .
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/#application-status"
            className="btn btn-accent rounded-[3px] px-6 py-3 text-xs font-bold uppercase tracking-wider"
          >
            <UserCheck className="h-4 w-4 text-gold" />
            <span>Check Application Status</span>
          </Link>
          <button
            type="button"
            onClick={() => setIssuedRecord(null)}
            className="btn btn-outline rounded-[3px] bg-white px-6 py-3 text-xs font-bold uppercase tracking-wider"
          >
            Register Another Contestant
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="flex items-center gap-3 rounded-[8px] border border-amber-500/30 bg-amber-50 px-5 py-3.5 text-sm text-amber-950">
        <AlertCircle className="h-4 w-4 shrink-0 text-amber-700" />
        <span>
          <strong>Note:</strong> Fields marked with{' '}
          <span className="font-bold text-red-600">*</span> are mandatory for{' '}
          {activeEventTitle} audition processing.
        </span>
      </div>

      {errorMsg && (
        <div
          role="alert"
          className="rounded-[2px] border border-danger/40 bg-red-50 px-5 py-4 text-sm font-medium text-danger"
        >
          {errorMsg}
        </div>
      )}

      {/* ─── Card 1: Personal Details & Photo ────────────────────── */}
      <div className="overflow-hidden rounded-[2px] border border-line bg-white shadow-xs">
        <div className="bg-forest px-6 py-4 text-white">
          <h2 className="display text-lg font-bold tracking-wide">
            1. Production Selection &amp; Contestant Details
          </h2>
        </div>

        <div className="grid gap-5 p-6 sm:grid-cols-2 sm:p-8">
          <div className="sm:col-span-2">
            <label htmlFor="reg-event" className={labelClass}>
              Applying For Production / Event <span className="text-red-600">*</span>
            </label>
            <select
              id="reg-event"
              value={selectedEventSlug}
              onChange={(e) => setSelectedEventSlug(e.target.value)}
              className={fieldClass}
            >
              {eventsList.map((ev) => (
                <option key={ev.slug} value={ev.slug}>
                  {ev.title} ({ev.eligibility} &bull; {ev.seasonOrYear})
                </option>
              ))}
            </select>
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="reg-name" className={labelClass}>
              Contestant Full Name <span className="text-red-600">*</span>
            </label>
            <input
              id="reg-name"
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter contestant's full name"
              className={fieldClass}
            />
          </div>

          <div>
            <label htmlFor="reg-phone" className={labelClass}>
              Contact Phone <span className="text-red-600">*</span>
            </label>
            <input
              id="reg-phone"
              type="tel"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="e.g. 9851143338"
              className={fieldClass}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="reg-gender" className={labelClass}>
                Gender <span className="text-red-600">*</span>
              </label>
              <select
                id="reg-gender"
                value={gender}
                onChange={(e) =>
                  setGender(e.target.value as 'Male' | 'Female' | 'Others')
                }
                className={fieldClass}
              >
                <option value="Female">Female</option>
                <option value="Male">Male</option>
                <option value="Others">Others</option>
              </select>
            </div>

            <div>
              <label htmlFor="reg-age" className={labelClass}>
                Age <span className="text-red-600">*</span>
              </label>
              <input
                id="reg-age"
                type="number"
                min={ageRange.min}
                max={ageRange.max}
                required
                value={age}
                onChange={(e) => setAge(e.target.value)}
                placeholder={ageRange.placeholder}
                className={fieldClass}
              />
            </div>
          </div>

          <div>
            <label htmlFor="reg-address" className={labelClass}>
              Address (City / District / Country){' '}
              <span className="text-red-600">*</span>
            </label>
            <input
              id="reg-address"
              type="text"
              required
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="e.g. Biratnagar-09, Morang"
              className={fieldClass}
            />
          </div>

          <div>
            <label htmlFor="reg-school" className={labelClass}>
              School / Academy Name <span className="text-red-600">*</span>
            </label>
            <input
              id="reg-school"
              type="text"
              required
              value={school}
              onChange={(e) => setSchool(e.target.value)}
              placeholder="Enter school name"
              className={fieldClass}
            />
          </div>

          {/* Audition Mode Selector */}
          <div className="sm:col-span-2">
            <span className={labelClass}>Preferred Audition Format</span>
            <div className="mt-1 grid gap-3 sm:grid-cols-2">
              {(
                [
                  {
                    value: 'In-Person District Audition',
                    icon: MapPin,
                    note: '77 Districts of Nepal & Regional Centers',
                  },
                  {
                    value: 'Online Video Audition',
                    icon: Video,
                    note: 'India, USA, Canada, Australia & Digital Entry',
                  },
                ] as const
              ).map((mode) => {
                const Icon = mode.icon;
                const selected = auditionMode === mode.value;
                return (
                  <button
                    key={mode.value}
                    type="button"
                    onClick={() => setAuditionMode(mode.value)}
                    className={cn(
                      'flex items-start gap-3 rounded-[8px] border p-4 text-left transition-all',
                      selected
                        ? 'border-forest bg-forest-soft text-forest shadow-2xs'
                        : 'border-line-strong bg-white text-ink hover:border-forest/50'
                    )}
                  >
                    <Icon className="mt-0.5 h-4 w-4 shrink-0 text-forest" />
                    <div>
                      <span className="block text-sm font-bold">{mode.value}</span>
                      <span className="mt-0.5 block text-xs text-muted">
                        {mode.note}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {auditionMode === 'Online Video Audition' && (
            <div className="sm:col-span-2">
              <label htmlFor="reg-video-url" className={labelClass}>
                Unlisted Audition Video URL (YouTube / Google Drive Link)
              </label>
              <input
                id="reg-video-url"
                type="url"
                value={auditionVideoUrl}
                onChange={(e) => setAuditionVideoUrl(e.target.value)}
                placeholder="https://youtube.com/... (Optional now; can submit later)"
                className={fieldClass}
              />
            </div>
          )}

          {/* Contestant Photo Upload Ready for Firebase Storage */}
          <div className="sm:col-span-2">
            <label htmlFor="reg-photo" className={labelClass}>
              Contestant Headshot / Portrait (Firebase Storage Ready)
            </label>
            <div className="flex flex-wrap items-center gap-4 rounded-[8px] border border-dashed border-line-strong bg-paper p-4">
              {photoPreviewUrl ? (
                <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-[8px] border border-forest/30 bg-white">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={photoPreviewUrl}
                    alt="Contestant portrait preview"
                    className="h-full w-full object-cover"
                  />
                </div>
              ) : (
                <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-[8px] bg-sand text-forest">
                  <Camera className="h-6 w-6" />
                </span>
              )}
              <div className="min-w-0 flex-1">
                <input
                  id="reg-photo"
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoSelect}
                  className="block w-full text-xs text-muted file:mr-4 file:rounded-[3px] file:border-0 file:bg-forest file:px-4 file:py-2 file:text-xs file:font-bold file:text-white hover:file:bg-ink"
                />
                <p className="mt-1.5 text-[11px] text-muted">
                  {photoFilename
                    ? `Selected portrait: ${photoFilename}`
                    : 'Clear front-facing portrait JPG/PNG (max 5MB).'}
                </p>
              </div>
            </div>
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="reg-hobbies" className={labelClass}>
              Hobbies &amp; Musical Interests{' '}
              <span className="font-normal lowercase text-muted">
                (Optional — comma separated)
              </span>
            </label>
            <textarea
              id="reg-hobbies"
              rows={3}
              value={hobbies}
              onChange={(e) => setHobbies(e.target.value)}
              placeholder="e.g. Classical singing, folk music, stage performance"
              className={fieldClass}
            />
          </div>
        </div>
      </div>

      {/* ─── Card 2: Parent / Guardian Information ────────────────── */}
      <div className="overflow-hidden rounded-[14px] border border-line bg-white shadow-xs">
        <div className="bg-forest px-6 py-4 text-white">
          <h2 className="display text-lg font-bold tracking-wide">
            2. Parent / Guardian Information
          </h2>
        </div>

        <div className="grid gap-5 p-6 sm:grid-cols-2 sm:p-8">
          <div className="sm:col-span-2">
            <label htmlFor="reg-parent-name" className={labelClass}>
              Parent / Guardian Full Name <span className="text-red-600">*</span>
            </label>
            <input
              id="reg-parent-name"
              type="text"
              required
              value={parentName}
              onChange={(e) => setParentName(e.target.value)}
              placeholder="Enter parent or legal guardian name"
              className={fieldClass}
            />
          </div>

          <div>
            <label htmlFor="reg-parent-email" className={labelClass}>
              Parent Email (Optional)
            </label>
            <input
              id="reg-parent-email"
              type="email"
              value={parentEmail}
              onChange={(e) => setParentEmail(e.target.value)}
              placeholder="parent@example.com"
              className={fieldClass}
            />
          </div>

          <div>
            <label htmlFor="reg-parent-phone" className={labelClass}>
              Parent Contact Number
            </label>
            <input
              id="reg-parent-phone"
              type="tel"
              value={parentPhone}
              onChange={(e) => setParentPhone(e.target.value)}
              placeholder="Guardian phone number"
              className={fieldClass}
            />
          </div>
        </div>
      </div>

      {/* ─── Card 3: Payment QR & Proof Upload ────────────────────── */}
      <div className="overflow-hidden rounded-[14px] border border-line bg-white shadow-xs">
        <div className="flex items-center justify-between bg-forest px-6 py-4 text-white">
          <h2 className="display text-lg font-bold tracking-wide">
            3. Payment Information &amp; Receipt Proof
          </h2>
          <QrCode className="h-5 w-5 text-gold" />
        </div>

        <div className="grid items-start gap-8 p-6 sm:grid-cols-12 sm:p-8">
          <div className="sm:col-span-5">
            <div className="relative aspect-[1280/1164] w-full max-w-xs overflow-hidden rounded-[8px] border border-line bg-paper p-2 shadow-sm">
              <Image
                src="/images/official/payment-qr.jpeg"
                alt="Official Jay Media Management Payment QR Code"
                fill
                sizes="320px"
                className="object-contain"
              />
            </div>
            <p className="mt-3 text-xs text-muted">
              Scan via eSewa, Khalti, or Fonepay. Desk helpline:{' '}
              <strong className="text-forest">9851143338 | 9802708000</strong>
            </p>
          </div>

          <div className="space-y-4 sm:col-span-7">
            <div>
              <label htmlFor="reg-tx-id" className={labelClass}>
                Payment Transaction Reference / Code
              </label>
              <input
                id="reg-tx-id"
                type="text"
                value={paymentTransactionId}
                onChange={(e) => setPaymentTransactionId(e.target.value)}
                placeholder="e.g. ESEWA-991042 or Fonepay Ref"
                className={fieldClass}
              />
            </div>

            <div>
              <label htmlFor="reg-receipt" className={labelClass}>
                Upload Payment Receipt Screenshot
              </label>
              <div className="flex items-center gap-4 rounded-[8px] border border-dashed border-line-strong bg-paper p-4">
                {receiptPreviewUrl ? (
                  <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-[6px] border border-forest/30 bg-white">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={receiptPreviewUrl}
                      alt="Payment receipt preview"
                      className="h-full w-full object-cover"
                    />
                  </div>
                ) : (
                  <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-[6px] bg-sand text-forest">
                    <FileImage className="h-5 w-5" />
                  </span>
                )}
                <div className="min-w-0 flex-1">
                  <input
                    id="reg-receipt"
                    type="file"
                    accept="image/*"
                    onChange={handleReceiptSelect}
                    className="block w-full text-xs text-muted file:mr-4 file:rounded-[3px] file:border-0 file:bg-forest file:px-4 file:py-2 file:text-xs file:font-bold file:text-white hover:file:bg-ink"
                  />
                  <p className="mt-1.5 text-[11px] text-muted">
                    {paymentReceiptFilename
                      ? `Attached: ${paymentReceiptFilename}`
                      : 'Attach your eSewa/Fonepay receipt for faster verification.'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ─── Card 4: Terms and Conditions ─────────────────────────── */}
      <div className="overflow-hidden rounded-[14px] border border-line bg-white shadow-xs">
        <div className="flex items-center gap-2 border-b border-line bg-sand px-6 py-4 text-ink">
          <ShieldCheck className="h-5 w-5 text-forest" />
          <h2 className="display text-lg font-bold">4. Terms and Conditions</h2>
        </div>

        <div className="space-y-4 p-6 sm:p-8">
          <label className="flex cursor-pointer items-start gap-3">
            <input
              type="checkbox"
              required
              checked={termsAccepted}
              onChange={(e) => setTermsAccepted(e.target.checked)}
              className="mt-1 h-4 w-4 accent-forest"
            />
            <span className="text-sm font-medium text-ink">
              I agree to the competition terms and conditions.{' '}
              <span className="text-red-600">*</span>
            </span>
          </label>

          <label className="flex cursor-pointer items-start gap-3">
            <input
              type="checkbox"
              required
              checked={guardianAgreementAccepted}
              onChange={(e) => setGuardianAgreementAccepted(e.target.checked)}
              className="mt-1 h-4 w-4 accent-forest"
            />
            <span className="text-xs leading-relaxed text-muted">
              I and/or my Guardian certify to the validity and accuracy of the
              information provided in this entry form. We agree to abide by all
              competition rules and understand that photographs and broadcast
              footage may be published or televised in connection with{' '}
              {activeEventTitle}. The decision of Jay Media Management Pvt. Ltd. is
              final and binding. <span className="text-red-600">*</span>
            </span>
          </label>

          <div className="rounded-[8px] border border-amber-500/30 bg-amber-50 px-4 py-3 text-xs text-amber-950">
            After registering, you will immediately receive your{' '}
            <strong>Contestant User Code</strong> for status tracking and
            audition scheduling.
          </div>
        </div>

        <div className="border-t border-line bg-paper px-6 py-5 sm:px-8">
          <button
            type="submit"
            disabled={submitting}
            className="btn btn-accent rounded-[3px] px-8 py-4 text-sm font-bold uppercase tracking-[0.12em] shadow-sm disabled:opacity-60"
          >
            {submitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Submitting Registration...</span>
              </>
            ) : (
              <>
                <span>Complete Registration</span>
                <ArrowUpRight className="h-4 w-4 text-gold" />
              </>
            )}
          </button>
        </div>
      </div>
    </form>
  );
}
