import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Compass, Eye, HeartHandshake, ShieldCheck, Sparkles, ArrowRight } from 'lucide-react';
import { generatePageMetadata } from '@/lib/seo';

export const metadata: Metadata = generatePageMetadata({
  title: 'About Us | Jay Media Management Pvt. Ltd.',
  description:
    'Discover the journey, leadership, and creative mission of Jay Media Management Pvt. Ltd. — Eastern Nepal’s premier event production agency based in Biratnagar.',
});

const VALUES = [
  {
    icon: Sparkles,
    title: 'Production Excellence',
    description:
      'We never settle for ordinary. Every stage lighting cue, sound acoustic balance, and visual sequence is calibrated to international broadcast quality.',
  },
  {
    icon: HeartHandshake,
    title: 'Youth & Cultural Elevation',
    description:
      'Our pageants and youth events empower Eastern Nepal’s next generation with authentic confidence, public speaking eloquence, and career visibility.',
  },
  {
    icon: ShieldCheck,
    title: 'Ethical Integrity',
    description:
      'Transparent judging processes, professional contestant grooming, and unwavering commitments to our partners and brand sponsors.',
  },
  {
    icon: Compass,
    title: 'Continuous Innovation',
    description:
      'Pioneering modern multicam live streaming, experiential brand architecture, and interactive entertainment experiences in Biratnagar and beyond.',
  },
];

const MILESTONES = [
  {
    year: 'Foundation',
    title: 'Vision Born in Biratnagar',
    description:
      'Founded by Jay Raj Rai to bridge the gap between regional Nepali talent and world-class live entertainment production.',
  },
  {
    year: 'Milestone',
    title: 'Launch of Mr. & Miss Little Koshi',
    description:
      'Pioneered eastern Nepal’s largest youth grooming and talent pageant across Biratnagar, Itahari, and Dharan.',
  },
  {
    year: 'Growth',
    title: 'Inauguration of Miss Koshi',
    description:
      'Elevated regional pageantry into an empowering annual leadership platform for aspiring young women in Province 1.',
  },
  {
    year: 'Present',
    title: 'Comprehensive Media & Event Production',
    description:
      'Expanded into turnkey corporate galas, high-profile product unveilings, and full-spectrum digital media production.',
  },
];

export default function AboutPage() {
  return (
    <div className="bg-[#FAFAF8] text-[#101014] min-h-screen font-rubik">
      {/* ─── Hero Section ────────────────────────────────────────── */}
      <section className="relative bg-[#FBF9F5] text-[#101014] pt-40 pb-24 sm:pt-48 sm:pb-32 px-6 sm:px-10 lg:px-16 overflow-hidden border-b border-black/10">
        <Image
          src="https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1600&q=80"
          alt="Jay Media live stagecraft and lighting"
          fill
          priority
          className="object-cover opacity-10"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#FBF9F5]/70 via-[#FBF9F5]/90 to-[#FAFAF8] z-[1]" />
        <div className="absolute top-1/3 -right-24 w-96 h-96 bg-coral/10 rounded-full blur-[130px] pointer-events-none z-[1]" />

        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="badge-prestige">
              Biratnagar, Nepal
            </span>
            <span className="section-label">
              ABOUT JAY MEDIA MANAGEMENT
            </span>
          </div>
          <h1 className="editorial-headline text-[#101014] text-5xl sm:text-6xl lg:text-8xl max-w-5xl leading-[0.95] mb-8 font-rubik">
            ORCHESTRATING EXTRAORDINARY MOMENTS.
          </h1>
          <p className="text-[#4A4A52] text-lg sm:text-xl max-w-2xl font-rubik leading-relaxed">
            From the bustling heart of Biratnagar across all of eastern Nepal, we blend stagecraft, storytelling, and
            rigorous production logistics to create cultural milestones.
          </p>
        </div>
      </section>

      {/* ─── Story & Mission Section ─────────────────────────────── */}
      <section className="py-24 lg:py-36 px-6 sm:px-10 lg:px-16 border-b border-black/10 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            <div className="lg:col-span-5">
              <span className="section-label mb-3 block">
                WHO WE ARE
              </span>
              <h2 className="editorial-headline text-[#101014] text-3xl sm:text-4xl lg:text-5xl leading-tight mb-6 font-rubik">
                Rooted in Biratnagar. Respected Nationwide.
              </h2>
              <div className="p-6 bg-[#F5F2EC] border-l-4 border-coral rounded-[10px] border border-black/10 shadow-sm">
                <p className="text-sm font-rubik text-[#101014] italic leading-relaxed">
                  &ldquo;Our vision from day one was clear: deliver entertainment and stage experiences in eastern Nepal
                  that match the sophistication of major national and international arenas.&rdquo;
                </p>
                <span className="block mt-3 text-xs uppercase font-rubik tracking-widest text-coral font-semibold">
                  — Jay Raj Rai, Chairperson
                </span>
              </div>

              {/* Editorial Production Photo */}
              <div className="mt-8 relative aspect-[16/10] w-full rounded-[10px] overflow-hidden border border-black/10 shadow-lg group">
                <Image
                  src="https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=1200&q=80"
                  alt="Jay Media grand event production"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-[1]" />
                <div className="absolute bottom-3 left-3 z-10">
                  <span className="text-[11px] uppercase font-rubik tracking-wider text-white bg-black/70 px-3 py-1 rounded-[50px] border border-white/20">
                    Biratnagar Grand Gala Production
                  </span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 space-y-6 text-base sm:text-lg font-rubik text-[#4A4A52] leading-relaxed">
              <p>
                <strong className="text-[#101014] font-semibold">Jay Media Management Pvt. Ltd.</strong> is a duly
                registered entertainment and event production enterprise situated near Traffic Chowk, Main Road,
                Biratnagar, Koshi Province.
              </p>
              <p>
                Under the strategic stewardship of Chairperson Jay Raj Rai and Chief Executive Officer Nisha Khatiwada
                Rai, the organization has evolved from a boutique event organizer into Eastern Nepal&apos;s most trusted
                production house for monumental youth pageants, commercial launches, and creative media broadcasting.
              </p>
              <p>
                Our signature franchises — including the acclaimed <em>Miss Koshi</em> pageant, the multi-city{' '}
                <em>Mr. and Miss Little Koshi</em> talent search, and the <em>Nepal Kids Dancing Champion</em> — have discovered and mentored hundreds of young talents,
                fostering career pathways in modeling, broadcasting, and leadership.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Mission & Vision ────────────────────────────────────── */}
      <section className="bg-[#FAFAF8] text-[#101014] py-24 lg:py-36 px-6 sm:px-10 lg:px-16 border-b border-black/10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
          <div className="bg-white p-8 sm:p-12 border border-black/10 rounded-[10px] relative overflow-hidden shadow-sm">
            <div className="w-12 h-12 rounded-[50px] bg-coral/10 flex items-center justify-center text-coral mb-6">
              <Compass className="w-6 h-6" />
            </div>
            <h3 className="font-rubik text-2xl sm:text-3xl font-bold mb-4 text-[#101014]">Our Mission</h3>
            <p className="text-[#4A4A52] font-rubik text-base leading-relaxed">
              To engineer immersive live experiences and media productions that elevate regional talent, empower brands,
              and set uncompromised standards for creative execution and transparency in Nepal’s entertainment industry.
            </p>
          </div>

          <div className="bg-white p-8 sm:p-12 border border-black/10 rounded-[10px] relative overflow-hidden shadow-sm">
            <div className="w-12 h-12 rounded-[50px] bg-coral/10 flex items-center justify-center text-coral mb-6">
              <Eye className="w-6 h-6" />
            </div>
            <h3 className="font-rubik text-2xl sm:text-3xl font-bold mb-4 text-[#101014]">Our Vision</h3>
            <p className="text-[#4A4A52] font-rubik text-base leading-relaxed">
              To be the internationally recognized benchmark for cinematic stagecraft, creative talent development, and
              brand storytelling originating from Nepal.
            </p>
          </div>
        </div>
      </section>

      {/* ─── Core Values ─────────────────────────────────────────── */}
      <section className="py-24 lg:py-36 px-6 sm:px-10 lg:px-16 border-b border-black/10 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="section-label mb-3 block">
              OUR GUIDING PRINCIPLES
            </span>
            <h2 className="editorial-headline text-[#101014] text-4xl sm:text-5xl font-rubik">
              BUILT ON VALUES THAT LAST.
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {VALUES.map((val, idx) => {
              const Icon = val.icon;
              return (
                <div
                  key={idx}
                  className="bg-[#FAFAF8] p-8 border border-black/10 rounded-[10px] shadow-sm hover:border-coral transition-all"
                >
                  <Icon className="w-8 h-8 text-coral mb-6" />
                  <h4 className="font-rubik text-xl font-bold text-[#101014] mb-3">{val.title}</h4>
                  <p className="text-[#4A4A52] text-sm font-rubik leading-relaxed">{val.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── Historical Trajectory ───────────────────────────────── */}
      <section className="py-24 lg:py-36 px-6 sm:px-10 lg:px-16 border-b border-black/10 bg-[#FAFAF8]">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <span className="section-label mb-3 block">
              OUR CHRONICLE
            </span>
            <h2 className="editorial-headline text-[#101014] text-4xl sm:text-5xl font-rubik">
              THE JOURNEY SO FAR.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {MILESTONES.map((item, index) => (
              <div key={index} className="relative border-t-4 border-coral pt-6 bg-white p-6 rounded-[10px] border border-black/10 shadow-sm">
                <span className="font-rubik text-xs uppercase tracking-widest text-coral font-semibold block mb-2">
                  {item.year}
                </span>
                <h4 className="font-rubik text-xl font-bold text-[#101014] mb-3">{item.title}</h4>
                <p className="text-[#4A4A52] text-sm font-rubik leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Bottom CTA ──────────────────────────────────────────── */}
      <section className="py-20 px-6 sm:px-10 lg:px-16 bg-[#ECE9E2] text-[#101014] border-t border-black/10">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-8">
          <div>
            <h3 className="font-rubik text-3xl sm:text-4xl font-bold text-[#101014] mb-2">
              Ready to Collaborate with Jay Media?
            </h3>
            <p className="text-[#4A4A52] text-base font-rubik">
              Visit our Biratnagar headquarters or talk to our creative directors today.
            </p>
          </div>
          <Link
            href="/contact"
            className="inline-flex items-center gap-3 px-8 py-4 bg-coral text-white font-rubik text-xs uppercase tracking-widest font-semibold hover:bg-coral-hover hover:scale-105 transition-all rounded-[50px] shadow-md"
          >
            <span>Connect With Us</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
