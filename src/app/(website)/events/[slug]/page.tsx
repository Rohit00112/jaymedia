import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, ArrowUpRight, Calendar, MapPin, Award, CheckCircle2, Trophy, Video } from 'lucide-react';
import { EVENTS_DATA } from '@/config/events-data';
import { generatePageMetadata } from '@/lib/seo';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return EVENTS_DATA.map((event) => ({
    slug: event.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const event = EVENTS_DATA.find((e) => e.slug === slug);
  if (!event) return {};

  return generatePageMetadata({
    title: `${event.title} | Events | Jay Media Management`,
    description: event.summary,
  });
}

export default async function EventDetailPage({ params }: Props) {
  const { slug } = await params;
  const event = EVENTS_DATA.find((e) => e.slug === slug);

  if (!event) {
    notFound();
  }

  return (
    <div className="bg-warm-ivory text-ink min-h-screen">
      {/* ─── Hero ─────────────────────────────────────────────── */}
      <section className="relative bg-ink text-white pt-40 pb-20 sm:pt-48 sm:pb-28 px-6 sm:px-10 lg:px-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-ink via-dark-surface to-ink opacity-90" />
        <div className="absolute top-1/2 -right-20 w-80 h-80 bg-coral/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto">
          <Link
            href="/events"
            className="inline-flex items-center gap-2 text-xs uppercase font-display tracking-widest text-muted-grey hover:text-coral transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" /> Back to All Events
          </Link>

          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-coral/20 border border-coral/40 text-coral text-xs uppercase font-display tracking-wider">
              <Award className="w-3.5 h-3.5" />
              {event.category}
            </span>
            <span className="text-xs uppercase font-display text-white/60 flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-coral" />
              {event.seasonOrYear}
            </span>
            <span className="text-xs uppercase font-display text-white/60 flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-coral" />
              {event.location}
            </span>
          </div>

          <h1 className="editorial-headline text-white text-4xl sm:text-6xl lg:text-7xl max-w-5xl leading-[0.95] mb-6">
            {event.title}
          </h1>

          <p className="text-muted-grey text-lg sm:text-xl max-w-3xl font-body leading-relaxed">
            {event.tagline}
          </p>
        </div>
      </section>

      {/* ─── Narrative Overview ──────────────────────────────── */}
      <section className="py-20 lg:py-28 px-6 sm:px-10 lg:px-16 border-b border-divider">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-7 space-y-6 text-base sm:text-lg font-body text-ink/80 leading-relaxed">
              <span className="section-label text-coral font-medium tracking-[0.25em] mb-2 block">
                PRODUCTION BACKGROUND
              </span>
              <h2 className="editorial-headline text-ink text-3xl sm:text-4xl leading-tight">
                A Legacy of Stagecraft in Koshi Province.
              </h2>
              <p>{event.overview}</p>

              <div className="pt-4">
                <span className="text-xs uppercase font-display tracking-widest text-ink/60 font-semibold block mb-3">
                  Signature Accolades:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {event.highlights.map((h, i) => (
                    <div key={i} className="flex items-start gap-2 text-sm font-body text-ink/80">
                      <CheckCircle2 className="w-4 h-4 text-coral shrink-0 mt-0.5" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 bg-white border border-ink/10 p-8 shadow-sm">
              <h3 className="font-display text-sm uppercase tracking-widest text-ink font-semibold mb-6 flex items-center gap-2">
                <Trophy className="w-4 h-4 text-coral" /> Verified Titleholders &amp; Recognition
              </h3>
              <div className="space-y-6">
                {event.hallOfFameOrWinners.map((winner, idx) => (
                  <div key={idx} className="border-l-2 border-coral pl-4">
                    <h4 className="font-display text-lg font-bold text-ink">{winner.title}</h4>
                    <p className="text-xs sm:text-sm font-body text-ink/70 mt-1">{winner.note}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Phased Schedule & Progression ────────────────────── */}
      <section className="bg-ink text-white py-24 lg:py-36 px-6 sm:px-10 lg:px-16 border-b border-divider">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <span className="section-label text-coral font-medium tracking-[0.25em] mb-3 block">
              STAGES OF COMPETITION
            </span>
            <h2 className="editorial-headline text-white text-3xl sm:text-5xl">
              FROM AUDITIONS TO THE CORONATION.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {event.scheduleOrPhases.map((phase, idx) => (
              <div
                key={idx}
                className="bg-dark-surface p-8 border border-white/10 relative flex flex-col justify-between"
              >
                <div>
                  <span className="text-coral font-display text-xs uppercase tracking-widest block mb-4">
                    Stage 0{idx + 1}
                  </span>
                  <h3 className="font-display text-2xl font-bold mb-3">{phase.title}</h3>
                  <p className="text-muted-grey text-sm font-body leading-relaxed">
                    {phase.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Production Scope & Broadcast Vault ───────────────── */}
      <section className="py-24 lg:py-36 px-6 sm:px-10 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center bg-white border border-ink/10 p-8 sm:p-14 lg:p-16 shadow-md">
            <div className="lg:col-span-7">
              <span className="text-xs uppercase font-display tracking-widest text-coral font-semibold mb-2 block">
                BEHIND THE SCENES
              </span>
              <h3 className="editorial-headline text-ink text-3xl sm:text-4xl mb-4">
                Engineered by Jay Media Management.
              </h3>
              <p className="text-ink/70 font-body text-base leading-relaxed mb-6">
                Every edition represents weeks of spatial modeling, lighting programming, and broadcast rehearsal in
                Biratnagar to ensure a world-class audience experience.
              </p>
              <ul className="space-y-3">
                {event.productionScope.map((scope, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm font-body text-ink/80">
                    <span className="text-coral font-bold">•</span>
                    <span>{scope}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="lg:col-span-5 bg-dark-surface p-8 text-white flex flex-col justify-between">
              <div>
                <span className="text-xs uppercase font-display tracking-widest text-coral block mb-2">
                  Official Broadcaster
                </span>
                <h4 className="font-display text-xl font-bold mb-3">Watch Grand Finale Archives</h4>
                <p className="text-muted-grey text-xs sm:text-sm font-body mb-6">
                  Catch full-event broadcasts, coronation announcements, and backstage interviews on our official
                  YouTube channel.
                </p>
              </div>

              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-coral text-white font-display text-xs uppercase tracking-widest hover:bg-coral-hover transition-colors text-center"
              >
                <span>Partner or Sponsor This Event</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
