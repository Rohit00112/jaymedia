'use client';

import { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import SectionHeading from '@/components/shared/SectionHeading';

interface FaqItem {
  question: string;
  answer: string;
}

const CONCERT_FAQS: FaqItem[] = [
  {
    question: 'How do I purchase and receive my concert tickets?',
    answer:
      'Official digital passes are sold exclusively through Khalti by IME. Upon completing your payment on Khalti, your digital pass featuring a verified entry QR code is instantly issued in your Khalti app and sent to your registered email/phone. No physical printing is required—simply present the QR on your phone at the stadium gates.',
  },
  {
    question: 'What time do gates open at Itahari Stadium?',
    answer:
      'Gates open at 4:00 PM on Saturday, December 19, 2026 for security screenings and arena entry. The opening acts and pre-show begin at 5:00 PM, and Atif Aslam and his full international touring band take the stage from 6:00 PM onwards. Arriving early ensures smooth entry and prime positioning.',
  },
  {
    question: 'What ticket tiers and enclosures are available?',
    answer:
      'Eastern Echoes offers General Admission (stadium seating and arena grounds), Fanpit (dedicated front-stage enclosure closest to Atif Aslam), VIP Lounges, and VVIP Hospitality Enclosures with premium sightlines, expedited entry lanes, and hospitality service.',
  },
  {
    question: 'Is parking available at Itahari Rangasala?',
    answer:
      'Yes. Dedicated two-wheeler and four-wheeler parking zones are coordinated by Jay Media Management alongside local municipal and traffic authorities around the Itahari Stadium perimeter. Traffic marshals and directional signs will assist attendees upon arrival.',
  },
  {
    question: 'How can brands inquire about corporate sponsorships or VVIP boxes?',
    answer:
      'Title, associate, beverage, and hospitality brand partnerships are managed directly by Jay Media Management Pvt. Ltd. Corporate brand teams can use the "Call for Sponsors" form or contact our Biratnagar headquarters directly at 9851143338 / 9802708000.',
  },
];

export default function ConcertFaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex((prev) => (prev === idx ? null : idx));
  };

  return (
    <section className="border-b border-line bg-paper-deep/30 py-16 md:py-20">
      <div className="container-ed">
        <SectionHeading
          eyebrow="Attendee Guide &amp; FAQs"
          title="Everything you need to know."
          description="Key information regarding tickets, stadium gates, timings, and corporate hospitality for Eastern Echoes at Itahari Stadium."
        />

        <div className="mx-auto mt-8 max-w-3xl divide-y divide-line rounded-xl border border-line bg-white">
          {CONCERT_FAQS.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div key={faq.question} className="overflow-hidden">
                <button
                  type="button"
                  onClick={() => toggle(index)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-4 p-5 text-left transition-colors hover:bg-paper-deep/50 focus:outline-none"
                >
                  <span className="flex items-center gap-3 text-sm font-semibold text-ink sm:text-base">
                    <HelpCircle className="h-4 w-4 shrink-0 text-forest" />
                    <span>{faq.question}</span>
                  </span>
                  <ChevronDown
                    className={cn(
                      'h-4 w-4 shrink-0 text-muted transition-transform duration-200',
                      isOpen && 'rotate-180 text-forest'
                    )}
                  />
                </button>

                {isOpen && (
                  <div className="border-t border-line/60 bg-paper-deep/20 px-5 pb-5 pt-3">
                    <p className="text-xs leading-relaxed text-muted sm:text-sm">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
