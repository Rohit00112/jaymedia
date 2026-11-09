import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowUpRight, ShieldCheck, HeartHandshake } from 'lucide-react';
import { generatePageMetadata } from '@/lib/seo';

export const metadata: Metadata = generatePageMetadata({
  title: 'Our Team & Leadership | Jay Media Management',
  description:
    'Meet the leadership, mentors, and production visionaries behind Jay Media Management Pvt. Ltd. in Biratnagar, Nepal.',
});

interface Member {
  name: string;
  role: string;
  status: 'Executive Leadership' | 'Advisory & Mentorship';
  location: string;
  bio: string;
  highlights: string[];
}

const MEMBERS: Member[] = [
  {
    name: 'Jay Raj Rai',
    role: 'Chairperson & Founder',
    status: 'Executive Leadership',
    location: 'Biratnagar, Nepal',
    bio: 'The founding creative force behind Jay Media Management. With years of experience steering eastern Nepal’s largest stage productions and pageants, Jay Raj Rai brings unparalleled vision to creative direction, stagecraft, and youth development.',
    highlights: ['Founder of Miss Koshi', 'Pioneer of Mr. and Miss Little Koshi', 'Senior Creative Director'],
  },
  {
    name: 'Nisha Khatiwada Rai',
    role: 'Chief Executive Officer',
    status: 'Executive Leadership',
    location: 'Biratnagar, Nepal',
    bio: 'Guiding executive operations, corporate partnerships, and production logistics. Nisha Khatiwada Rai ensures that every Jay Media production runs with seamless precision, high ethical governance, and premier hospitality.',
    highlights: ['Corporate Operations', 'Talent Grooming Supervision', 'Sponsorship Relations'],
  },
  {
    name: 'Rishav Dev Ghimire',
    role: 'Production Mentor & Artistic Advisor',
    status: 'Advisory & Mentorship',
    location: 'Biratnagar, Nepal',
    bio: 'Provides vital mentorship in theatrical performance, stage vocalization, and artistic presence for pageant contestants and production staff during intensive grooming camps.',
    highlights: ['Performance Arts Mentor', 'Pageant Bootcamp Director', 'Vocal Poise Coaching'],
  },
  {
    name: 'Rajendra KC',
    role: 'Senior Advisor & Pageant Mentor',
    status: 'Advisory & Mentorship',
    location: 'Biratnagar, Nepal',
    bio: 'Brings veteran acumen to pageant evaluation criteria, jury coordination, and youth confidence development across Eastern Nepal’s multi-city audition rounds.',
    highlights: ['Jury Coordination', 'Youth Development', 'Ethics & Compliance'],
  },
];

export default function TeamPage() {
  return (
    <div className="bg-warm-ivory text-ink min-h-screen">
      {/* ─── Hero ─────────────────────────────────────────────── */}
      <section className="relative bg-ink text-white pt-40 pb-24 sm:pt-48 sm:pb-32 px-6 sm:px-10 lg:px-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-ink via-dark-surface to-ink opacity-90" />
        <div className="absolute top-1/2 -right-20 w-80 h-80 bg-coral/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto">
          <span className="section-label text-coral font-medium tracking-[0.25em] mb-4 block">
            OUR PEOPLE
          </span>
          <h1 className="editorial-headline text-white text-5xl sm:text-6xl lg:text-8xl max-w-5xl leading-[0.95] mb-8">
            THE MINDS BEHIND THE MOMENTS.
          </h1>
          <p className="text-muted-grey text-lg sm:text-xl max-w-2xl font-body leading-relaxed">
            Our certified leadership, mentors, and technical directors collaborate to deliver production excellence
            and transform regional talent across eastern Nepal.
          </p>
        </div>
      </section>

      {/* ─── Leadership Roster ───────────────────────────────── */}
      <section className="py-24 lg:py-36 px-6 sm:px-10 lg:px-16 border-b border-divider">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
            {MEMBERS.map((member, index) => (
              <div
                key={index}
                className="bg-white border border-ink/10 p-8 sm:p-12 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-6 pb-4 border-b border-ink/10">
                    <span className="inline-flex items-center gap-1.5 text-xs uppercase font-display tracking-widest text-coral font-semibold">
                      <ShieldCheck className="w-4 h-4" />
                      {member.status}
                    </span>
                    <span className="text-xs uppercase font-display text-ink/50">
                      {member.location}
                    </span>
                  </div>

                  {/* Editorial Initial Avatar */}
                  <div className="w-20 h-20 bg-dark-surface text-white font-display text-3xl font-bold flex items-center justify-center mb-6 border-2 border-coral">
                    {member.name
                      .split(' ')
                      .map((n) => n[0])
                      .join('')}
                  </div>

                  <h2 className="editorial-headline text-ink text-3xl sm:text-4xl mb-2">
                    {member.name}
                  </h2>
                  <span className="text-sm uppercase font-display tracking-wider text-coral font-semibold block mb-6">
                    {member.role}
                  </span>

                  <p className="text-ink/80 font-body text-base sm:text-lg leading-relaxed mb-6">
                    {member.bio}
                  </p>
                </div>

                <div className="border-t border-ink/10 pt-4">
                  <span className="text-xs uppercase font-display tracking-widest text-ink/50 block mb-2 font-semibold">
                    Core Focus:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {member.highlights.map((h, hIdx) => (
                      <span
                        key={hIdx}
                        className="text-xs font-body px-3 py-1 bg-warm-ivory border border-ink/10 text-ink/80"
                      >
                        ✓ {h}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Production Crew Note ────────────────────────────── */}
      <section className="py-24 px-6 sm:px-10 lg:px-16 bg-white">
        <div className="max-w-7xl mx-auto text-center max-w-3xl">
          <HeartHandshake className="w-10 h-10 text-coral mx-auto mb-6" />
          <h3 className="editorial-headline text-ink text-3xl sm:text-4xl mb-4">
            Backed by a Dedicated Crew of 50+ Technicians.
          </h3>
          <p className="text-ink/70 font-body text-base sm:text-lg leading-relaxed mb-8">
            Behind every stage spotlight and broadcast cue is our trusted network of local stage riggers, audio
            engineers, video switchers, choreographers, and security personnel based in Koshi Province.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 bg-ink text-white font-display text-xs uppercase tracking-widest hover:bg-coral transition-colors"
          >
            <span>Join Our Crew or Partner</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}

