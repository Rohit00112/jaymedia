import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
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
    <div className="bg-black text-white min-h-screen font-rubik">
      {/* ─── Hero ─────────────────────────────────────────────── */}
      <section className="relative bg-black text-white pt-40 pb-24 sm:pt-48 sm:pb-32 px-6 sm:px-10 lg:px-16 overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-[#0c0c11] to-black opacity-90" />
        <div className="absolute top-1/2 -right-20 w-80 h-80 bg-coral/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <span className="px-3.5 py-1 bg-[#01402b]/80 border border-[#01402b] text-[#eef9ff] text-xs font-rubik font-medium tracking-widest uppercase rounded-[50px]">
              Signature Franchises
            </span>
            <span className="section-label text-coral font-medium tracking-[0.2em]">
              OUR EVENT PORTFOLIO
            </span>
          </div>
          <h1 className="editorial-headline text-white text-5xl sm:text-6xl lg:text-8xl max-w-5xl leading-[0.95] mb-8 font-rubik">
            WORK WORTH REMEMBERING.
          </h1>
          <p className="text-[#eef9ff]/80 text-lg sm:text-xl max-w-2xl font-rubik leading-relaxed">
            From monumental beauty pageants to celebratory youth showcases, discover the signature productions that
            have defined eastern Nepal&apos;s cultural stage.
          </p>
        </div>
      </section>

      {/* ─── Events Catalogue ────────────────────────────────── */}
      <section className="py-24 lg:py-36 px-6 sm:px-10 lg:px-16 bg-black">
        <div className="max-w-7xl mx-auto space-y-16">
          {EVENTS_DATA.map((event) => (
            <div
              key={event.slug}
              className="bg-[#0c0c11] border border-white/10 p-8 sm:p-12 lg:p-16 rounded-[10px] shadow-xl hover:border-coral/40 transition-all"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
                <div className="lg:col-span-7">
                  <div className="flex flex-wrap items-center gap-3 mb-4">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#01402b]/80 border border-[#01402b] text-[#eef9ff] text-xs uppercase font-rubik tracking-wider rounded-[50px] font-medium">
                      <Award className="w-3.5 h-3.5 text-coral" />
                      {event.category}
                    </span>
                    <span className="text-xs uppercase font-rubik text-[#eef9ff]/70 flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-coral" />
                      {event.seasonOrYear}
                    </span>
                    <span className="text-xs uppercase font-rubik text-[#eef9ff]/70 flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-coral" />
                      {event.location}
                    </span>
                  </div>

                  <h2 className="editorial-headline text-white text-3xl sm:text-4xl lg:text-5xl mb-4 leading-tight font-rubik">
                    {event.title}
                  </h2>
                  <p className="text-[#eef9ff]/80 font-rubik text-base sm:text-lg leading-relaxed mb-6">
                    {event.summary}
                  </p>

                  <div className="space-y-2 mb-8">
                    <span className="text-xs uppercase font-rubik tracking-wider text-[#eef9ff]/50 block">
                      Hallmarks:
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {event.highlights.map((h, hIdx) => (
                        <span
                          key={hIdx}
                          className="text-xs font-rubik px-3 py-1 bg-white/5 border border-white/10 text-[#eef9ff] rounded-[2px]"
                        >
                          ✓ {h}
                        </span>
                      ))}
                    </div>
                  </div>

                  <Link
                    href={`/events/${event.slug}`}
                    className="inline-flex items-center gap-3 px-7 py-4 bg-coral text-white font-rubik text-xs uppercase tracking-widest font-semibold rounded-[50px] hover:bg-coral-hover hover:scale-105 transition-all shadow-md"
                  >
                    <span>Explore Full Production Archive</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </Link>
                </div>

                <div className="lg:col-span-5 relative min-h-[300px] p-8 sm:p-12 text-white border border-white/10 rounded-[10px] overflow-hidden shadow-xl flex flex-col justify-between group">
                  <Image
                    src={event.image}
                    alt={event.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 1024px) 100vw, 40vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-black/60 z-[1]" />
                  <div className="absolute top-0 right-0 w-32 h-32 bg-coral/10 rounded-full blur-2xl z-[2]" />
                  
                  <div className="relative z-10">
                    <span className="text-coral font-rubik text-xs uppercase tracking-wider block mb-3 font-semibold">
                      Production Highlight
                    </span>
                    <h3 className="font-rubik text-2xl font-bold mb-4 text-white drop-shadow-md">
                      {event.title}
                    </h3>
                    <p className="text-[#eef9ff]/85 text-sm font-rubik leading-relaxed mb-6">
                      {event.tagline}
                    </p>
                  </div>

                  <div className="relative z-10 border-t border-white/15 pt-4">
                    <span className="text-[11px] uppercase tracking-wider font-rubik text-[#eef9ff]/70 block mb-1">
                      Official Organizer
                    </span>
                    <span className="text-xs text-[#eef9ff] font-rubik font-medium">
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
      <section className="py-20 px-6 sm:px-10 lg:px-16 bg-[#0c0c11] text-white border-t border-white/10">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-8">
          <div>
            <h3 className="font-rubik text-3xl sm:text-4xl font-bold text-white mb-2">
              Have an Event Concept in Mind?
            </h3>
            <p className="text-[#eef9ff]/75 text-base font-rubik">
              Let&apos;s build an extraordinary stage experience together.
            </p>
          </div>
          <Link
            href="/contact"
            className="inline-flex items-center gap-3 px-8 py-4 bg-coral text-white font-rubik text-xs uppercase tracking-widest font-semibold hover:bg-coral-hover hover:scale-105 transition-all rounded-[50px] shadow-lg"
          >
            <span>Initiate An Inquiry</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}

