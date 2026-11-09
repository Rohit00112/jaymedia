import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import PageHero from '@/components/shared/PageHero';
import SectionHeading from '@/components/shared/SectionHeading';
import CtaBand from '@/components/shared/CtaBand';
import { generatePageMetadata } from '@/lib/seo';
import { cn } from '@/lib/utils';

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
    image:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80',
    bio: 'The founding creative force behind Jay Media Management. With years of experience steering eastern Nepal’s largest stage productions and pageants, Jay Raj Rai brings unparalleled vision to creative direction, stagecraft, and youth development.',
    highlights: [
      'Founder of Miss Koshi',
      'Pioneer of Mr. and Miss Little Koshi',
      'Senior Creative Director',
    ],
  },
  {
    name: 'Nisha Khatiwada Rai',
    role: 'Chief Executive Officer',
    status: 'Executive Leadership',
    location: 'Biratnagar, Nepal',
    image:
      'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80',
    bio: 'Guiding executive operations, corporate partnerships, and production logistics. Nisha Khatiwada Rai ensures that every Jay Media production runs with seamless precision, high ethical governance, and premier hospitality.',
    highlights: [
      'Corporate Operations',
      'Talent Grooming Supervision',
      'Sponsorship Relations',
    ],
  },
  {
    name: 'Rishav Dev Ghimire',
    role: 'Production Mentor & Artistic Advisor',
    status: 'Advisory & Mentorship',
    location: 'Biratnagar, Nepal',
    image:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80',
    bio: 'Provides vital mentorship in theatrical performance, stage vocalization, and artistic presence for pageant contestants and production staff during intensive grooming camps.',
    highlights: [
      'Performance Arts Mentor',
      'Pageant Bootcamp Director',
      'Vocal Poise Coaching',
    ],
  },
  {
    name: 'Rajendra KC',
    role: 'Senior Advisor & Pageant Mentor',
    status: 'Advisory & Mentorship',
    location: 'Biratnagar, Nepal',
    image:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=800&q=80',
    bio: 'Brings veteran acumen to pageant evaluation criteria, jury coordination, and youth confidence development across Eastern Nepal’s multi-city audition rounds.',
    highlights: [
      'Jury Coordination',
      'Youth Development',
      'Ethics & Compliance',
    ],
  },
];

export default function TeamPage() {
  return (
    <div className="min-h-screen bg-surface text-paper">
      <PageHero
        eyebrow="Our people"
        title={
          <>
            The minds behind
            <br />
            <span className="serif text-coral">the moments.</span>
          </>
        }
        description="Our leadership, mentors, and technical directors collaborate to deliver production excellence and transform regional talent across Eastern Nepal."
        image="https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1800&q=85"
        imageAlt="Production audience at a live Jay Media event"
        meta={[
          { label: 'Leadership', value: '4 verified profiles' },
          { label: 'Crew network', value: '50+ technicians' },
          { label: 'Base', value: 'Biratnagar, Nepal' },
          { label: 'Focus', value: 'Production & mentorship' },
        ]}
      />

      <section className="border-b border-line bg-surface py-20 md:py-28 lg:py-32">
        <div className="container-ed">
          <SectionHeading
            eyebrow="Leadership roster"
            title={
              <>
                Verified{' '}
                <span className="serif text-coral">leadership.</span>
              </>
            }
            description="The people accountable for the creative, operational, and ethical standards of every production."
          />

          <div>
            {MEMBERS.map((member, index) => {
              const reversed = index % 2 === 1;

              return (
                <article
                  key={member.name}
                  className="grid items-center gap-8 border-t border-line py-12 last:border-b md:py-16 lg:grid-cols-12 lg:gap-14"
                >
                  <div
                    className={cn(
                      'group relative aspect-[4/5] overflow-hidden bg-surface-alt lg:col-span-4',
                      reversed && 'lg:order-2 lg:col-start-9'
                    )}
                  >
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      sizes="(max-width: 1024px) 100vw, 32vw"
                      className="img-zoom object-cover opacity-80 grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:opacity-100"
                    />
                    <div
                      className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"
                      aria-hidden="true"
                    />
                    <span className="eyebrow absolute left-4 top-4 text-paper/60">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span className="eyebrow absolute bottom-4 left-4 text-[8px] text-coral">
                      {member.status}
                    </span>
                  </div>

                  <div
                    className={cn(
                      'lg:col-span-7',
                      reversed ? 'lg:order-1 lg:col-start-1' : 'lg:col-start-6'
                    )}
                  >
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[9px] uppercase tracking-[0.18em] text-faint">
                      <span className="text-coral">{member.role}</span>
                      <span aria-hidden="true">/</span>
                      <span>{member.location}</span>
                    </div>

                    <h2 className="display mt-4 text-[clamp(2.2rem,4.6vw,4.6rem)]">
                      {member.name}
                    </h2>

                    <p className="mt-5 max-w-2xl text-sm leading-relaxed text-muted md:text-base">
                      {member.bio}
                    </p>

                    <div className="mt-7 border-t border-line pt-4">
                      <span className="eyebrow text-faint">Core focus</span>
                      <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2">
                        {member.highlights.map((highlight) => (
                          <span
                            key={highlight}
                            className="flex items-center gap-2 text-[9px] uppercase tracking-[0.14em] text-muted"
                          >
                            <span
                              className="h-1 w-1 bg-coral"
                              aria-hidden="true"
                            />
                            {highlight}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Crew note */}
      <section className="relative overflow-hidden border-b border-line bg-surface-alt py-20 md:py-24">
        <div className="container-ed grid items-center gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <span className="display block text-[clamp(5rem,12vw,12rem)] leading-none text-outline-strong">
              50+
            </span>
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            <span className="eyebrow text-coral">The crew</span>
            <h2 className="display mt-4 text-[clamp(2rem,3.8vw,3.8rem)]">
              A dedicated network behind every cue.
            </h2>
            <p className="mt-5 max-w-xl text-sm leading-relaxed text-muted md:text-base">
              Behind every spotlight and broadcast cue is our trusted network of
              local stage riggers, audio engineers, video switchers,
              choreographers, and security personnel based in Koshi Province.
            </p>
            <div className="mt-7 flex flex-wrap gap-4">
              <Link href="/contact" className="btn btn-primary">
                Join the crew
                <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
              <Link href="/contact" className="btn btn-outline">
                Partner with us
              </Link>
            </div>
          </div>
        </div>
      </section>

      <CtaBand />
    </div>
  );
}
