import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, ArrowUpRight, Calendar, MapPin, Award, CheckCircle2, Trophy } from 'lucide-react';
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
    <div className="bg-black text-white min-h-screen font-rubik">
      {/* ─── Hero ─────────────────────────────────────────────── */}
      <section className="relative bg-black text-white pt-40 pb-20 sm:pt-48 sm:pb-28 px-6 sm:px-10 lg:px-16 overflow-hidden border-b border-white/10">
        <Image
          src={event.image}
          alt={event.title}
          fill
          priority
          className="object-cover opacity-20"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/85 to-black z-[1]" />
        <div className="absolute top-1/2 -right-20 w-80 h-80 bg-coral/10 rounded-full blur-[120px] pointer-events-none z-[1]" />

        <div className="relative z-10 max-w-7xl mx-auto">
          <Link
            href="/events"
            className="inline-flex items-center gap-2 text-xs uppercase font-rubik tracking-wider text-[#eef9ff]/70 hover:text-white transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" /> Back to All Events
          </Link>

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

          <h1 className="editorial-headline text-white text-4xl sm:text-6xl lg:text-7xl max-w-5xl leading-[0.95] mb-6 font-rubik">
            {event.title}
          </h1>

          <p className="text-[#eef9ff]/80 text-lg sm:text-xl max-w-3xl font-rubik leading-relaxed">
            {event.tagline}
          </p>
        </div>
      </section>

      {/* ─── Narrative Overview ──────────────────────────────── */}
      <section className="py-20 lg:py-28 px-6 sm:px-10 lg:px-16 border-b border-white/10 bg-[#0c0c11]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-7 space-y-6 text-base sm:text-lg font-rubik text-[#eef9ff]/80 leading-relaxed">
              <span className="section-label text-coral font-medium tracking-[0.2em] mb-2 block">
                PRODUCTION BACKGROUND
              </span>
              <h2 className="editorial-headline text-white text-3xl sm:text-4xl leading-tight font-rubik">
                A Legacy of Stagecraft in Koshi Province.
              </h2>
              <p>{event.overview}</p>

              <div className="pt-4">
                <span className="text-xs uppercase font-rubik tracking-wider text-[#eef9ff]/60 font-semibold block mb-3">
                  Signature Accolades:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {event.highlights.map((h, i) => (
                    <div key={i} className="flex items-start gap-2 text-sm font-rubik text-[#eef9ff]/80">
                      <CheckCircle2 className="w-4 h-4 text-coral shrink-0 mt-0.5" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 bg-black border border-white/10 p-8 rounded-[10px] shadow-xl">
              <h3 className="font-rubik text-sm uppercase tracking-wider text-white font-semibold mb-6 flex items-center gap-2">
                <Trophy className="w-4 h-4 text-coral" /> Verified Titleholders &amp; Recognition
              </h3>
              <div className="space-y-6">
                {event.hallOfFameOrWinners.map((winner, idx) => (
                  <div key={idx} className="border-l-2 border-coral pl-4">
                    <h4 className="font-rubik text-lg font-bold text-white">{winner.title}</h4>
                    <p className="text-xs sm:text-sm font-rubik text-[#eef9ff]/70 mt-1">{winner.note}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Phased Schedule & Progression ────────────────────── */}
      <section className="bg-black text-white py-24 lg:py-36 px-6 sm:px-10 lg:px-16 border-b border-white/10">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <span className="section-label text-coral font-medium tracking-[0.2em] mb-3 block">
              STAGES OF COMPETITION
            </span>
            <h2 className="editorial-headline text-white text-3xl sm:text-5xl font-rubik">
              FROM AUDITIONS TO THE CORONATION.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {event.scheduleOrPhases.map((phase, idx) => (
              <div
                key={idx}
                className="bg-[#0c0c11] p-8 border border-white/10 rounded-[10px] shadow-xl relative flex flex-col justify-between"
              >
                <div>
                  <span className="text-coral font-rubik text-xs uppercase tracking-wider block mb-4 font-semibold">
                    Stage 0{idx + 1}
                  </span>
                  <h3 className="font-rubik text-2xl font-bold mb-3 text-white">{phase.title}</h3>
                  <p className="text-[#eef9ff]/75 text-sm font-rubik leading-relaxed">
                    {phase.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Production Scope & Broadcast Vault ───────────────── */}
      <section className="py-24 lg:py-36 px-6 sm:px-10 lg:px-16 bg-[#0c0c11]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center bg-black border border-white/10 p-8 sm:p-14 lg:p-16 rounded-[10px] shadow-2xl">
            <div className="lg:col-span-7">
              <span className="text-xs uppercase font-rubik tracking-wider text-coral font-semibold mb-2 block">
                BEHIND THE SCENES
              </span>
              <h3 className="editorial-headline text-white text-3xl sm:text-4xl mb-4 font-rubik">
                Engineered by Jay Media Management.
              </h3>
              <p className="text-[#eef9ff]/75 font-rubik text-base leading-relaxed mb-6">
                Every edition represents weeks of spatial modeling, lighting programming, and broadcast rehearsal in
                Biratnagar to ensure a world-class audience experience.
              </p>
              <ul className="space-y-3">
                {event.productionScope.map((scope, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm font-rubik text-[#eef9ff]/80">
                    <span className="text-coral font-bold">•</span>
                    <span>{scope}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="lg:col-span-5 bg-[#0c0c11] border border-white/10 p-8 rounded-[10px] text-white flex flex-col justify-between shadow-xl">
              <div>
                <span className="text-xs uppercase font-rubik tracking-wider text-coral block mb-2 font-semibold">
                  Official Broadcaster
                </span>
                <h4 className="font-rubik text-xl font-bold mb-3 text-white">Watch Grand Finale Archives</h4>
                <p className="text-[#eef9ff]/70 text-xs sm:text-sm font-rubik mb-6 leading-relaxed">
                  Catch full-event broadcasts, coronation announcements, and backstage interviews on our official
                  YouTube channel.
                </p>
              </div>

              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-coral text-white font-rubik text-xs uppercase tracking-widest font-semibold rounded-[50px] hover:bg-coral-hover hover:scale-105 transition-all text-center shadow-md"
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

