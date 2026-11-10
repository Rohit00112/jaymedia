'use client';

import { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { GoogleIcon, AppleIcon, WhatsAppIcon } from '@/components/shared/BrandIcons';

interface EventShareAndCalendarProps {
  title: string;
  startDateIso?: string;
  endDateIso?: string;
  location: string;
  description: string;
  ticketUrl?: string;
}

export default function EventShareAndCalendar({
  title,
  startDateIso = '2026-12-19T18:00:00+05:45',
  endDateIso = '2026-12-19T23:00:00+05:45',
  location,
  description,
  ticketUrl,
}: EventShareAndCalendarProps) {
  const [copied, setCopied] = useState(false);

  // Format ISO strings to UTC (YYYYMMDDTHHMMSSZ) for Google Calendar and iCal
  const formatIsoToUtc = (iso: string) => {
    try {
      const date = new Date(iso);
      return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
    } catch {
      return '20261219T121500Z';
    }
  };

  const startUtc = formatIsoToUtc(startDateIso);
  const endUtc = formatIsoToUtc(endDateIso);
  const googleDates = `${startUtc}/${endUtc}`;

  const eventDetails = `${description}\n\nOfficial Digital Tickets: ${ticketUrl || 'Available on Khalti'}\nOrganizer: Jay Media Management Pvt. Ltd.`;

  const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
    title
  )}&dates=${googleDates}&details=${encodeURIComponent(
    eventDetails
  )}&location=${encodeURIComponent(location)}`;

  const shareText = `Join me at ${title} on Saturday, Dec 19, 2026 at ${location}! Get official tickets on Khalti: ${ticketUrl || 'https://events.khalti.com'}`;
  const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(shareText)}`;

  const handleDownloadIcs = () => {
    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Jay Media Management//Eastern Echoes//EN',
      'CALSCALE:GREGORIAN',
      'METHOD:PUBLISH',
      'BEGIN:VEVENT',
      'UID:eastern-echoes-atif-aslam-2026@jaymediamanagement.com',
      'DTSTAMP:20260101T000000Z',
      `DTSTART:${startUtc}`,
      `DTEND:${endUtc}`,
      `SUMMARY:${title}`,
      `DESCRIPTION:${eventDetails.replace(/\n/g, '\\n')}`,
      `LOCATION:${location}`,
      'STATUS:CONFIRMED',
      'END:VEVENT',
      'END:VCALENDAR',
    ].join('\r\n');

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', 'atif-aslam-live-nepal-2026.ics');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
    }
  };

  return (
    <div className="rounded-xl border border-line bg-paper-deep/60 p-5">
      <h3 className="text-xs font-semibold uppercase tracking-wider text-ink">
        Save the Date &amp; Share
      </h3>

      <div className="mt-3 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
        <a
          href={googleCalendarUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 rounded-lg border border-line bg-white px-3 py-2 text-xs font-medium text-ink transition-colors hover:border-line-strong hover:bg-paper-deep"
        >
          <GoogleIcon className="h-3.5 w-3.5 shrink-0" />
          <span>Add to Google Calendar</span>
        </a>

        <button
          type="button"
          onClick={handleDownloadIcs}
          className="inline-flex items-center justify-center gap-2 rounded-lg border border-line bg-white px-3 py-2 text-xs font-medium text-ink transition-colors hover:border-line-strong hover:bg-paper-deep"
        >
          <AppleIcon className="h-3.5 w-3.5 shrink-0 text-ink" />
          <span>Apple / iCal (.ics)</span>
        </button>

        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 rounded-lg border border-emerald-200 bg-emerald-50/70 px-3 py-2 text-xs font-medium text-emerald-950 transition-colors hover:bg-emerald-100"
        >
          <WhatsAppIcon className="h-3.5 w-3.5 shrink-0" />
          <span>Share via WhatsApp</span>
        </a>

        <button
          type="button"
          onClick={handleCopy}
          className="inline-flex items-center justify-center gap-2 rounded-lg border border-line bg-white px-3 py-2 text-xs font-medium text-ink transition-colors hover:border-line-strong hover:bg-paper-deep"
        >
          {copied ? (
            <>
              <Check className="h-3.5 w-3.5 text-forest" />
              <span>Link Copied!</span>
            </>
          ) : (
            <>
              <Copy className="h-3.5 w-3.5 text-muted" />
              <span>Copy Concert Link</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
