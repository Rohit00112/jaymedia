'use client';

import { siteConfig } from '@/config/site';
import { WhatsAppIcon } from '@/components/shared/BrandIcons';
import { phoneWhatsAppNumber } from '@/lib/utils';

export default function WhatsAppFloat() {
  const whatsappUrl = `https://wa.me/${phoneWhatsAppNumber(siteConfig.contact.phone)}?text=${encodeURIComponent(
    'Hello Jay Media Management, I have an inquiry regarding your upcoming events and sponsorships.'
  )}`;

  return (
    <aside aria-label="Direct WhatsApp contact">
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="group fixed bottom-20 right-4 z-40 flex items-center gap-2.5 rounded-full border border-emerald-300 bg-emerald-600 px-3.5 py-2.5 text-white shadow-lg transition-all duration-300 hover:bg-emerald-700 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 sm:bottom-6 sm:right-6 sm:px-4 sm:py-3"
      >
        <WhatsAppIcon className="h-5 w-5 shrink-0" />
        <span className="hidden text-xs font-semibold sm:inline">
          Chat on WhatsApp
        </span>
      </a>
    </aside>
  );
}

