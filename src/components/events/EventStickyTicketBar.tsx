'use client';

import { ArrowUpRight, Ticket } from 'lucide-react';

interface EventStickyTicketBarProps {
  title: string;
  dateLabel: string;
  ticketUrl: string;
  ticketPartner?: string;
}

export default function EventStickyTicketBar({
  title,
  dateLabel,
  ticketUrl,
  ticketPartner = 'Khalti',
}: EventStickyTicketBarProps) {
  return (
    <aside
      aria-label="Quick ticket purchase"
      className="fixed bottom-0 left-0 right-0 z-40 border-t border-line bg-white/95 px-4 py-3 shadow-[0_-8px_24px_rgba(0,0,0,0.08)] backdrop-blur-md lg:hidden"
    >
      <div className="container-ed flex items-center justify-between gap-3">
        <div className="min-w-0 flex-1">
          <p className="truncate text-xs font-semibold text-ink">{title}</p>
          <p className="truncate text-[11px] text-muted">{dateLabel}</p>
        </div>

        <a
          href={ticketUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-primary shrink-0 py-2 text-xs font-semibold shadow-sm"
        >
          <Ticket className="h-3.5 w-3.5" />
          <span>Tickets on {ticketPartner}</span>
          <ArrowUpRight className="h-3.5 w-3.5" />
        </a>
      </div>
    </aside>
  );
}
