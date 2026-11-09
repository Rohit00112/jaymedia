import { Metadata } from 'next';
import Link from 'next/link';
import { Award, Compass, Eye, HeartHandshake, ShieldCheck, Sparkles, MapPin, ArrowRight } from 'lucide-react';
import { generatePageMetadata } from '@/lib/seo';
import { siteConfig } from '@/config/site';

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
    <div className="bg-warm-ivory text-ink min-h-screen">
      {/* ─── Hero Section ────────────────────────────────────────── */}
      <section className="relative bg-ink text-white pt-40 pb-24 sm:pt-48 sm:pb-32 px-6 sm:px-10 lg:px-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-ink via-dark-surface to-ink opacity-90" />
        <div className="absolute top-1/3 -right-24 w-96 h-96 bg-coral/10 rounded-full blur-[130px] pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto">
          <span className="section-label text-coral font-medium tracking-[0.25em] mb-4 block">
            ABOUT JAY MEDIA MANAGEMENT
          </span>
          <h1 className="editorial-headline text-white text-5xl sm:text-6xl lg:text-8xl max-w-5xl leading-[0.95] mb-8">
            ORCHESTRATING EXTRAORDINARY MOMENTS.
          </h1>
          <p className="text-muted-grey text-lg sm:text-xl max-w-2xl font-body leading-relaxed">
            From the bustling heart of Biratnagar across all of eastern Nepal, we blend stagecraft, storytelling, and
            rigorous production logistics to create cultural milestones.
          </p>
        </div>
      </section>

      {/* ─── Story & Mission Section ─────────────────────────────── */}
      <section className="py-24 lg:py-36 px-6 sm:px-10 lg:px-16 border-b border-divider">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            <div className="lg:col-span-5">
              <span className="section-label text-coral font-medium tracking-[0.25em] mb-3 block">
                WHO WE ARE
              </span>
              <h2 className="editorial-headline text-ink text-3xl sm:text-4xl lg:text-5xl leading-tight mb-6">
                Rooted in Biratnagar. Respected Nationwide.
              </h2>
              <div className="p-6 bg-white border-l-4 border-coral shadow-sm">
                <p className="text-sm font-body text-ink/80 italic leading-relaxed">
                  &ldquo;Our vision from day one was clear: deliver entertainment and stage experiences in eastern Nepal
                  that match the sophistication of major national and international arenas.&rdquo;
                </p>
                <span className="block mt-3 text-xs uppercase font-display tracking-widest text-coral font-semibold">
                  — Jay Raj Rai, Chairperson
                </span>
              </div>
            </div>

            <div className="lg:col-span-7 space-y-6 text-base sm:text-lg font-body text-ink/80 leading-relaxed">
              <p>
                <strong className="text-ink font-semibold">Jay Media Management Pvt. Ltd.</strong> is a duly
                registered entertainment and event production enterprise situated near Traffic Chowk, Main Road,
                Biratnagar, Koshi Province.
              </p>
              <p>
                Under the strategic stewardship of Chairperson Jay Raj Rai and Chief Executive Officer Nisha Khatiwada
                Rai, the organization has evolved from a boutique event organizer into Eastern Nepal&apos;s most trusted
                production house for monumental youth pageants, commercial launches, and creative media broadcasting.
              </p>
              <p>
                Our signature franchises — including the acclaimed <em>Miss Koshi</em> pageant and the multi-city{' '}
                <em>Mr. and Miss Little Koshi</em> talent search — have discovered and mentored hundreds of young talents,
                fostering career pathways in modeling, broadcasting, and leadership.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Mission & Vision ────────────────────────────────────── */}
      <section className="bg-ink text-white py-24 lg:py-36 px-6 sm:px-10 lg:px-16 border-b border-divider">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
          <div className="bg-dark-surface p-8 sm:p-12 border border-white/10 relative overflow-hidden">
            <div className="w-12 h-12 rounded-full bg-coral/20 flex items-center justify-center text-coral mb-6">
              <Compass className="w-6 h-6" />
            </div>
            <h3 className="font-display text-2xl sm:text-3xl font-bold mb-4">Our Mission</h3>
            <p className="text-muted-grey font-body text-base leading-relaxed">
              To engineer immersive live experiences and media productions that elevate regional talent, empower brands,
              and set uncompromised standards for creative execution and transparency in Nepal’s entertainment industry.
            </p>
          </div>

          <div className="bg-dark-surface p-8 sm:p-12 border border-white/10 relative overflow-hidden">
            <div className="w-12 h-12 rounded-full bg-coral/20 flex items-center justify-center text-coral mb-6">
              <Eye className="w-6 h-6" />
            </div>
            <h3 className="font-display text-2xl sm:text-3xl font-bold mb-4">Our Vision</h3>
            <p className="text-muted-grey font-body text-base leading-relaxed">
              To be the internationally recognized benchmark for cinematic stagecraft, creative talent development, and
              brand storytelling originating from Nepal.
            </p>
          </div>
        </div>
      </section>

      {/* ─── Core Values ─────────────────────────────────────────── */}
      <section className="py-24 lg:py-36 px-6 sm:px-10 lg:px-16 border-b border-divider">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="section-label text-coral font-medium tracking-[0.25em] mb-3 block">
              OUR GUIDING PRINCIPLES
            </span>
            <h2 className="editorial-headline text-ink text-4xl sm:text-5xl">
              BUILT ON VALUES THAT LAST.
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {VALUES.map((val, idx) => {
              const Icon = val.icon;
              return (
                <div
                  key={idx}
                  className="bg-white p-8 border border-ink/10 shadow-sm hover:shadow-md transition-shadow"
                >
                  <Icon className="w-8 h-8 text-coral mb-6" />
                  <h4 className="font-display text-xl font-bold text-ink mb-3">{val.title}</h4>
                  <p className="text-ink/70 text-sm font-body leading-relaxed">{val.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── Historical Trajectory ───────────────────────────────── */}
      <section className="py-24 lg:py-36 px-6 sm:px-10 lg:px-16 border-b border-divider">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <span className="section-label text-coral font-medium tracking-[0.25em] mb-3 block">
              OUR CHRONICLE
            </span>
            <h2 className="editorial-headline text-ink text-4xl sm:text-5xl">
              THE JOURNEY SO FAR.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {MILESTONES.map((item, index) => (
              <div key={index} className="relative border-t-2 border-coral pt-6">
                <span className="font-display text-xs uppercase tracking-widest text-coral font-semibold block mb-2">
                  {item.year}
                </span>
                <h4 className="font-display text-xl font-bold text-ink mb-3">{item.title}</h4>
                <p className="text-ink/70 text-sm font-body leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Bottom CTA ──────────────────────────────────────────── */}
      <section className="py-20 px-6 sm:px-10 lg:px-16 bg-ink text-white">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-8">
          <div>
            <h3 className="font-display text-3xl sm:text-4xl font-bold text-white mb-2">
              Ready to Collaborate with Jay Media?
            </h3>
            <p className="text-muted-grey text-base font-body">
              Visit our Biratnagar headquarters or talk to our creative directors today.
            </p>
          </div>
          <Link
            href="/contact"
            className="inline-flex items-center gap-3 px-8 py-4 bg-coral text-white font-display text-xs uppercase tracking-widest font-semibold hover:bg-coral-hover transition-colors"
          >
            <span>Connect With Us</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}

