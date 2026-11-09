import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
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
  image: string;
  bio: string;
  highlights: string[];
}

const MEMBERS: Member[] = [
  {
    name: 'Jay Raj Rai',
    role: 'Chairperson & Founder',
    status: 'Executive Leadership',
    location: 'Biratnagar, Nepal',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80',
    bio: 'The founding creative force behind Jay Media Management. With years of experience steering eastern Nepal’s largest stage productions and pageants, Jay Raj Rai brings unparalleled vision to creative direction, stagecraft, and youth development.',
    highlights: ['Founder of Miss Koshi', 'Pioneer of Mr. and Miss Little Koshi', 'Senior Creative Director'],
  },
  {
    name: 'Nisha Khatiwada Rai',
    role: 'Chief Executive Officer',
    status: 'Executive Leadership',
    location: 'Biratnagar, Nepal',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80',
    bio: 'Guiding executive operations, corporate partnerships, and production logistics. Nisha Khatiwada Rai ensures that every Jay Media production runs with seamless precision, high ethical governance, and premier hospitality.',
    highlights: ['Corporate Operations', 'Talent Grooming Supervision', 'Sponsorship Relations'],
  },
  {
    name: 'Rishav Dev Ghimire',
    role: 'Production Mentor & Artistic Advisor',
    status: 'Advisory & Mentorship',
    location: 'Biratnagar, Nepal',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80',
    bio: 'Provides vital mentorship in theatrical performance, stage vocalization, and artistic presence for pageant contestants and production staff during intensive grooming camps.',
    highlights: ['Performance Arts Mentor', 'Pageant Bootcamp Director', 'Vocal Poise Coaching'],
  },
  {
    name: 'Rajendra KC',
    role: 'Senior Advisor & Pageant Mentor',
    status: 'Advisory & Mentorship',
    location: 'Biratnagar, Nepal',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=800&q=80',
    bio: 'Brings veteran acumen to pageant evaluation criteria, jury coordination, and youth confidence development across Eastern Nepal’s multi-city audition rounds.',
    highlights: ['Jury Coordination', 'Youth Development', 'Ethics & Compliance'],
  },
];

export default function TeamPage() {
  return (
    <div className="bg-black text-white min-h-screen font-rubik">
      {/* ─── Hero ─────────────────────────────────────────────── */}
      <section className="relative bg-black text-white pt-40 pb-24 sm:pt-48 sm:pb-32 px-6 sm:px-10 lg:px-16 overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-[#0c0c11] to-black opacity-90" />
        <div className="absolute top-1/2 -right-20 w-80 h-80 bg-coral/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <span className="px-3.5 py-1 bg-[#01402b]/80 border border-[#01402b] text-[#eef9ff] text-xs font-rubik font-medium tracking-widest uppercase rounded-[50px]">
              Verified Leadership
            </span>
            <span className="section-label text-coral font-medium tracking-[0.2em]">
              OUR PEOPLE
            </span>
          </div>
          <h1 className="editorial-headline text-white text-5xl sm:text-6xl lg:text-8xl max-w-5xl leading-[0.95] mb-8 font-rubik">
            THE MINDS BEHIND THE MOMENTS.
          </h1>
          <p className="text-[#eef9ff]/80 text-lg sm:text-xl max-w-2xl font-rubik leading-relaxed">
            Our certified leadership, mentors, and technical directors collaborate to deliver production excellence
            and transform regional talent across eastern Nepal.
          </p>
        </div>
      </section>

      {/* ─── Leadership Roster ───────────────────────────────── */}
      <section className="py-24 lg:py-36 px-6 sm:px-10 lg:px-16 bg-black border-b border-white/10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
            {MEMBERS.map((member, index) => (
              <div
                key={index}
                className="bg-[#0c0c11] border border-white/10 p-8 sm:p-12 rounded-[10px] shadow-xl hover:border-coral/40 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/10">
                    <span className="inline-flex items-center gap-1.5 text-xs uppercase font-rubik tracking-wider px-3 py-1 bg-[#01402b]/90 border border-[#01402b] text-[#eef9ff] font-medium rounded-[50px]">
                      <ShieldCheck className="w-3.5 h-3.5 text-coral" />
                      {member.status}
                    </span>
                    <span className="text-xs uppercase font-rubik text-[#eef9ff]/50">
                      {member.location}
                    </span>
                  </div>

                  {/* Portrait with genuine executive stock photo */}
                  <div className="relative aspect-[4/3] w-full bg-black rounded-[10px] overflow-hidden mb-6 border border-white/10 group">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-[1]" />
                  </div>

                  <h2 className="editorial-headline text-white text-3xl sm:text-4xl mb-2 font-rubik">
                    {member.name}
                  </h2>
                  <span className="text-sm uppercase font-rubik tracking-wider text-coral font-medium block mb-6">
                    {member.role}
                  </span>

                  <p className="text-[#eef9ff]/80 font-rubik text-base sm:text-lg leading-relaxed mb-6">
                    {member.bio}
                  </p>
                </div>

                <div className="border-t border-white/10 pt-4">
                  <span className="text-xs uppercase font-rubik tracking-wider text-[#eef9ff]/50 block mb-2 font-semibold">
                    Core Focus:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {member.highlights.map((h, hIdx) => (
                      <span
                        key={hIdx}
                        className="text-xs font-rubik px-3 py-1 bg-white/5 border border-white/10 text-[#eef9ff] rounded-[2px]"
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
      <section className="py-24 px-6 sm:px-10 lg:px-16 bg-[#0c0c11]">
        <div className="max-w-3xl mx-auto text-center">
          <HeartHandshake className="w-10 h-10 text-coral mx-auto mb-6" />
          <h3 className="editorial-headline text-white text-3xl sm:text-4xl mb-4 font-rubik">
            Backed by a Dedicated Crew of 50+ Technicians.
          </h3>
          <p className="text-[#eef9ff]/75 font-rubik text-base sm:text-lg leading-relaxed mb-8">
            Behind every stage spotlight and broadcast cue is our trusted network of local stage riggers, audio
            engineers, video switchers, choreographers, and security personnel based in Koshi Province.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 bg-coral text-white font-rubik text-xs uppercase tracking-widest font-semibold hover:bg-coral-hover hover:scale-105 transition-all rounded-[50px] shadow-lg"
          >
            <span>Join Our Crew or Partner</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}

