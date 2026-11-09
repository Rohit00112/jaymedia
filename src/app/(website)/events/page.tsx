import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowUpRight, Calendar, MapPin, Award } from 'lucide-react';
import { generatePageMetadata } from '@/lib/seo';
import { EVENTS_DATA } from '@/config/events-data';

export const metadata: Metadata = generatePageMetadata({
  title: 'Events & Productions Portfolio | Jay Media Management',
  description:
    'Explore signature event productions by Jay Media Management in Biratnagar, Nepal: Miss Koshi Grand Pageant, Mr. & Miss Little Koshi, and bespoke corporate galas.',
});

export default function EventsPage() {
  return (
    <div className="bg-warm-ivory text-ink min-h-screen">
      {/* ─── Hero ─────────────────────────────────────────────── */}
      <section className="relative bg-ink text-white pt-40 pb-24 sm:pt-48 sm:pb-32 px-6 sm:px-10 lg:px-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-ink via-dark-surface to-ink opacity-90" />
        <div className="absolute top-1/2 -right-20 w-80 h-80 bg-coral/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto">
          <span className="section-label text-coral font-medium tracking-[0.25em] mb-4 block">
            OUR EVENT PORTFOLIO
          </span>
          <h1 className="editorial-headline text-white text-5xl sm:text-6xl lg:text-8xl max-w-5xl leading-[0.95] mb-8">
            WORK WORTH REMEMBERING.
          </h1>
          <p className="text-muted-grey text-lg sm:text-xl max-w-2xl font-body leading-relaxed">
            From monumental beauty pageants to celebratory youth showcases, discover the signature productions that
            have defined eastern Nepal&apos;s cultural stage.
          </p>
        </div>
      </section>

      {/* ─── Events Catalogue ────────────────────────────────── */}
      <section className="py-24 lg:py-36 px-6 sm:px-10 lg:px-16">
        <div className="max-w-7xl mx-auto space-y-16">
          {EVENTS_DATA.map((event, index) => (
            <div
              key={event.slug}
              className="bg-white border border-ink/10 p-8 sm:p-12 lg:p-16 shadow-sm hover:shadow-xl transition-shadow"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
                <div className="lg:col-span-7">
                  <div className="flex flex-wrap items-center gap-3 mb-4">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-coral/10 border border-coral/30 text-coral text-xs uppercase font-display tracking-wider">
                      <Award className="w-3.5 h-3.5" />
                      {event.category}
                    </span>
                    <span className="text-xs uppercase font-display text-ink/60 flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-coral" />
                      {event.seasonOrYear}
                    </span>
                    <span className="text-xs uppercase font-display text-ink/60 flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-coral" />
                      {event.location}
                    </span>
                  </div>

                  <h2 className="editorial-headline text-ink text-3xl sm:text-4xl lg:text-5xl mb-4 leading-tight">
                    {event.title}
                  </h2>
                  <p className="text-ink/80 font-body text-base sm:text-lg leading-relaxed mb-6">
                    {event.summary}
                  </p>

                  <div className="space-y-2 mb-8">
                    <span className="text-xs uppercase font-display tracking-widest text-ink/50 block">
                      Hallmarks:
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {event.highlights.map((h, hIdx) => (
                        <span
                          key={hIdx}
                          className="text-xs font-body px-3 py-1 bg-warm-ivory border border-ink/10 text-ink/80"
                        >
                          ✓ {h}
                        </span>
                      ))}
                    </div>
                  </div>

                  <Link
                    href={`/events/${event.slug}`}
                    className="inline-flex items-center gap-3 px-7 py-4 bg-ink text-white font-display text-xs uppercase tracking-widest hover:bg-coral transition-colors"
                  >
                    <span>Explore Full Production Archive</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </Link>
                </div>

                <div className="lg:col-span-5 bg-dark-surface p-8 sm:p-12 text-white border border-white/10 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-coral/10 rounded-full blur-2xl" />
                  <span className="text-coral font-display text-xs uppercase tracking-widest block mb-3">
                    Production Highlight
                  </span>
                  <h3 className="font-display text-2xl font-bold mb-4">
                    {event.title}
                  </h3>
                  <p className="text-muted-grey text-sm font-body leading-relaxed mb-6">
                    {event.tagline}
                  </p>
                  <div className="border-t border-white/10 pt-4">
                    <span className="text-[11px] uppercase tracking-widest font-display text-white/50 block mb-2">
                      Official Organizer
                    </span>
                    <span className="text-xs text-white/80 font-display">
                      Jay Media Management Pvt. Ltd. • Biratnagar
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── Bottom CTA ──────────────────────────────────────── */}
      <section className="py-20 px-6 sm:px-10 lg:px-16 bg-ink text-white">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-8">
          <div>
            <h3 className="font-display text-3xl sm:text-4xl font-bold text-white mb-2">
              Have an Event Concept in Mind?
            </h3>
            <p className="text-muted-grey text-base font-body">
              Let&apos;s build an extraordinary stage experience together.
            </p>
          </div>
          <Link
            href="/contact"
            className="inline-flex items-center gap-3 px-8 py-4 bg-coral text-white font-display text-xs uppercase tracking-widest font-semibold hover:bg-coral-hover transition-colors"
          >
            <span>Initiate An Inquiry</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}

