'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
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
  'w-full rounded-lg border border-line-strong bg-white px-3.5 py-2.5 text-sm text-ink placeholder:text-faint focus:border-forest focus:outline-none';

const labelClass = 'mb-1.5 block text-xs font-medium text-ink';

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
  const [receiptPreviewUrl, setReceiptPreviewUrl] = useState<string | null>(
    null
  );

  const [termsAccepted, setTermsAccepted] = useState(false);
  const [guardianAgreementAccepted, setGuardianAgreementAccepted] =
    useState(false);

  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [issuedRecord, setIssuedRecord] = useState<RegistrationRecord | null>(
    null
  );

  useEffect(() => {
    let active = true;
    fetch('/api/events')
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (active && Array.isArray(data?.events) && data.events.length > 0) {
          setEventsList(
            data.events.filter(
              (e: EventDetailData) => e.registrationOpen !== false
            )
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
  const ageRange = currentEvent?.ageRange || {
    min: 4,
    max: 40,
    placeholder: 'Age',
  };

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
          data.error ||
            'Please review required fields and accept both agreements.'
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
      <div className="rounded-xl border border-line bg-white p-6 sm:p-8">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-line pb-5">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-forest-soft text-forest">
              <CheckCircle2 className="h-5 w-5" />
            </span>
            <div>
              <span className="text-xs font-medium text-forest">
                Registration Confirmed
              </span>
              <h2 className="text-xl font-semibold text-ink">
                Official Contestant Slip
              </h2>
            </div>
          </div>

          <div className="rounded-lg border border-line bg-paper-deep px-4 py-2.5 text-center">
            <span className="block text-[11px] text-muted">
              Contestant Code
            </span>
            <span className="mono text-lg font-semibold text-forest">
              {issuedRecord.userCode}
            </span>
          </div>
        </div>

        <dl className="mt-6 grid gap-4 sm:grid-cols-2 md:grid-cols-3">
          <div>
            <dt className="text-xs text-muted">Contestant Name</dt>
            <dd className="mt-0.5 text-sm font-semibold text-ink">
              {issuedRecord.name}
            </dd>
          </div>
          <div>
            <dt className="text-xs text-muted">Audition Mode</dt>
            <dd className="mt-0.5 text-sm font-medium text-forest">
              {issuedRecord.auditionMode}
            </dd>
          </div>
          <div>
            <dt className="text-xs text-muted">Application Status</dt>
            <dd className="mt-0.5 text-sm font-medium text-ink">
              {issuedRecord.status}
            </dd>
          </div>
          <div>
            <dt className="text-xs text-muted">Age &amp; Gender</dt>
            <dd className="mt-0.5 text-sm text-ink-soft">
              {issuedRecord.age} Years ({issuedRecord.gender})
            </dd>
          </div>
          <div>
            <dt className="text-xs text-muted">School / Academy</dt>
            <dd className="mt-0.5 text-sm text-ink-soft">
              {issuedRecord.school}
            </dd>
          </div>
          <div>
            <dt className="text-xs text-muted">Guardian Name</dt>
            <dd className="mt-0.5 text-sm text-ink-soft">
              {issuedRecord.parentName}
            </dd>
          </div>
        </dl>

        <div className="mt-6 rounded-lg bg-forest-soft p-4 text-xs leading-relaxed text-forest">
          Save your User Code <strong>{issuedRecord.userCode}</strong> to track
          your application status anytime on our homepage.
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <Link href="/#application-status" className="btn btn-primary">
            <UserCheck className="h-4 w-4" />
            <span>Check Application Status</span>
          </Link>
          <button
            type="button"
            onClick={() => setIssuedRecord(null)}
            className="btn btn-outline"
          >
            Register Another Contestant
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {errorMsg && (
        <div
          role="alert"
          className="rounded-lg border border-danger/30 bg-red-50 px-4 py-3 text-sm font-medium text-danger"
        >
          {errorMsg}
        </div>
      )}

      {/* Section 1: Contestant Details */}
      <div className="rounded-xl border border-line bg-white p-6 sm:p-8">
        <h2 className="border-b border-line pb-4 text-lg font-semibold text-ink">
          1. Contestant Details
        </h2>

        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label htmlFor="reg-event" className={labelClass}>
              Production / Event *
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
              Contestant Full Name *
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
              Contact Phone *
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

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label htmlFor="reg-gender" className={labelClass}>
                Gender *
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
                Age *
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
              Address (City / District) *
            </label>
            <input
              id="reg-address"
              type="text"
              required
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="e.g. Biratnagar, Morang"
              className={fieldClass}
            />
          </div>

          <div>
            <label htmlFor="reg-school" className={labelClass}>
              School / Academy Name *
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
                      'flex items-start gap-3 rounded-lg border p-3.5 text-left transition-colors',
                      selected
                        ? 'border-forest bg-forest-soft/60 text-ink'
                        : 'border-line bg-white text-ink hover:border-line-strong'
                    )}
                  >
                    <Icon className="mt-0.5 h-4 w-4 shrink-0 text-forest" />
                    <div>
                      <span className="block text-sm font-medium">
                        {mode.value}
                      </span>
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
                Audition Video URL (YouTube / Google Drive Link)
              </label>
              <input
                id="reg-video-url"
                type="url"
                value={auditionVideoUrl}
                onChange={(e) => setAuditionVideoUrl(e.target.value)}
                placeholder="https://youtube.com/... (Optional)"
                className={fieldClass}
              />
            </div>
          )}

          {/* Contestant Photo Upload */}
          <div className="sm:col-span-2">
            <label htmlFor="reg-photo" className={labelClass}>
              Contestant Portrait Photo
            </label>
            <div className="flex flex-wrap items-center gap-4 rounded-lg border border-dashed border-line-strong bg-paper-deep/50 p-4">
              {photoPreviewUrl ? (
                <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg border border-line bg-white">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={photoPreviewUrl}
                    alt="Contestant portrait preview"
                    className="h-full w-full object-cover"
                  />
                </div>
              ) : (
                <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-lg bg-sand text-forest">
                  <Camera className="h-5 w-5" />
                </span>
              )}
              <div className="min-w-0 flex-1">
                <input
                  id="reg-photo"
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoSelect}
                  className="block w-full text-xs text-muted file:mr-3 file:rounded-md file:border-0 file:bg-forest file:px-3.5 file:py-1.5 file:text-xs file:font-medium file:text-white hover:file:bg-accent-hover"
                />
                <p className="mt-1 text-xs text-muted">
                  {photoFilename
                    ? `Selected: ${photoFilename}`
                    : 'Clear front-facing portrait JPG/PNG (max 5MB).'}
                </p>
              </div>
            </div>
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="reg-hobbies" className={labelClass}>
              Hobbies &amp; Interests (Optional)
            </label>
            <textarea
              id="reg-hobbies"
              rows={2}
              value={hobbies}
              onChange={(e) => setHobbies(e.target.value)}
              placeholder="e.g. Singing, dancing, stage performance"
              className={fieldClass}
            />
          </div>
        </div>
      </div>

      {/* Section 2: Parent / Guardian Information */}
      <div className="rounded-xl border border-line bg-white p-6 sm:p-8">
        <h2 className="border-b border-line pb-4 text-lg font-semibold text-ink">
          2. Parent / Guardian Information
        </h2>

        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label htmlFor="reg-parent-name" className={labelClass}>
              Parent / Guardian Full Name *
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

      {/* Section 3: Payment QR & Proof Upload */}
      <div className="rounded-xl border border-line bg-white p-6 sm:p-8">
        <div className="flex items-center justify-between border-b border-line pb-4">
          <h2 className="text-lg font-semibold text-ink">
            3. Payment &amp; Receipt Proof
          </h2>
          <QrCode className="h-5 w-5 text-forest" />
        </div>

        <div className="mt-5 grid items-start gap-6 sm:grid-cols-12">
          <div className="sm:col-span-5">
            <div className="relative aspect-[1280/1164] w-full max-w-[260px] overflow-hidden rounded-lg border border-line bg-paper-deep p-2">
              <Image
                src="/images/official/payment-qr.jpeg"
                alt="Official Jay Media Management Payment QR Code"
                fill
                sizes="260px"
                className="object-contain"
              />
            </div>
            <p className="mt-2.5 text-xs text-muted">
              Scan via eSewa, Khalti, or Fonepay. Helpline:{' '}
              <strong className="text-ink">9851143338 / 9802708000</strong>
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
                placeholder="e.g. eSewa or Fonepay Reference"
                className={fieldClass}
              />
            </div>

            <div>
              <label htmlFor="reg-receipt" className={labelClass}>
                Upload Payment Receipt Screenshot
              </label>
              <div className="flex items-center gap-4 rounded-lg border border-dashed border-line-strong bg-paper-deep/50 p-4">
                {receiptPreviewUrl ? (
                  <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg border border-line bg-white">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={receiptPreviewUrl}
                      alt="Payment receipt preview"
                      className="h-full w-full object-cover"
                    />
                  </div>
                ) : (
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-sand text-forest">
                    <FileImage className="h-5 w-5" />
                  </span>
                )}
                <div className="min-w-0 flex-1">
                  <input
                    id="reg-receipt"
                    type="file"
                    accept="image/*"
                    onChange={handleReceiptSelect}
                    className="block w-full text-xs text-muted file:mr-3 file:rounded-md file:border-0 file:bg-forest file:px-3.5 file:py-1.5 file:text-xs file:font-medium file:text-white hover:file:bg-accent-hover"
                  />
                  <p className="mt-1 text-xs text-muted">
                    {paymentReceiptFilename
                      ? `Attached: ${paymentReceiptFilename}`
                      : 'Attach your payment screenshot for verification.'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Section 4: Terms and Conditions */}
      <div className="rounded-xl border border-line bg-white p-6 sm:p-8">
        <div className="flex items-center gap-2 border-b border-line pb-4">
          <ShieldCheck className="h-5 w-5 text-forest" />
          <h2 className="text-lg font-semibold text-ink">
            4. Terms and Conditions
          </h2>
        </div>

        <div className="mt-5 space-y-3.5">
          <label className="flex cursor-pointer items-start gap-3">
            <input
              type="checkbox"
              required
              checked={termsAccepted}
              onChange={(e) => setTermsAccepted(e.target.checked)}
              className="mt-1 h-4 w-4 accent-forest"
            />
            <span className="text-sm font-medium text-ink">
              I agree to the competition terms and conditions. *
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
              {activeEventTitle}. *
            </span>
          </label>
        </div>

        <div className="mt-6 border-t border-line pt-5">
          <button
            type="submit"
            disabled={submitting}
            className="btn btn-primary px-6 py-3 disabled:opacity-60"
          >
            {submitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Submitting Registration...</span>
              </>
            ) : (
              <span>Complete Registration</span>
            )}
          </button>
        </div>
      </div>
    </form>
  );
}
