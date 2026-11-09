import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import SectionHeading from '@/components/shared/SectionHeading';

interface TeamMemberData {
  name: string;
  role: string;
  status: 'Leadership' | 'Advisory';
  bio: string;
  image: string;
}

const TEAM_MEMBERS: TeamMemberData[] = [
  {
    name: 'Jay Raj Rai',
    role: 'Chairperson & Founder',
    status: 'Leadership',
    bio: 'The founding creative force behind Jay Media Management, steering Eastern Nepal’s largest pageants and stage productions.',
    image:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'Nisha Khatiwada Rai',
    role: 'Chief Executive Officer',
    status: 'Leadership',
    bio: 'Leads executive operations, partnerships, talent management, and production standards across the agency.',
    image:
      'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'Rishav Dev Ghimire',
    role: 'Production Mentor & Advisor',
    status: 'Advisory',
    bio: 'Guides performance craft, stage presence, and voice projection for contestants and production crews.',
    image:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'Rajendra KC',
    role: 'Senior Advisor & Pageant Mentor',
    status: 'Advisory',
    bio: 'Brings veteran perspective to jury coordination, youth development, and pageant governance across the region.',
    image:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=800&q=80',
  },
];

export default function TeamSection() {
  return (
    <section className="border-b border-line bg-surface-alt py-20 md:py-28 lg:py-32">
      <div className="container-ed">
        <SectionHeading
          eyebrow="06 / The people"
          title={
            <>
              Minds behind{' '}
              <span className="serif text-coral">the moments.</span>
            </>
          }
          description="A compact leadership team backed by a trusted crew of technicians, choreographers, and stage managers."
          link={{ href: '/team', label: 'Full leadership' }}
        />

        <div className="grid grid-cols-2 gap-x-5 gap-y-12 lg:grid-cols-4 lg:gap-8">
          {TEAM_MEMBERS.map((member, index) => (
            <article key={member.name} className="group">
              <div className="relative aspect-[3/4] overflow-hidden bg-surface">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  sizes="(max-width: 640px) 50vw, 25vw"
                  className="object-cover opacity-75 grayscale transition-all duration-700 group-hover:scale-[1.03] group-hover:opacity-100 group-hover:grayscale-0"
                />
                <div
                  className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"
                  aria-hidden="true"
                />
                <span className="eyebrow absolute left-3 top-3 text-paper/60">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span className="eyebrow absolute bottom-3 left-3 text-[8px] text-coral">
                  {member.status}
                </span>
              </div>

              <div className="mt-4 border-t border-line pt-4">
                <h3 className="display text-xl text-paper transition-colors group-hover:text-coral md:text-2xl">
                  {member.name}
                </h3>
                <p className="eyebrow mt-2 text-[8px] text-coral">
                  {member.role}
                </p>
                <p className="mt-3 line-clamp-3 text-xs leading-relaxed text-muted">
                  {member.bio}
                </p>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-12 flex justify-end">
          <Link href="/team" className="text-link text-paper">
            Meet the entire team
            <ArrowUpRight className="h-3.5 w-3.5 text-coral" />
          </Link>
        </div>
      </div>
    </section>
  );
}
