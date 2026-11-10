import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { AnimeStaggerContainer } from '@/components/motion';
import SectionHeading from '@/components/shared/SectionHeading';
import { TEAM_PROFILES } from '@/config/team-data';

export default function TeamSection() {
  return (
    <section
      id="team"
      className="border-b border-line bg-white py-20 md:py-24"
    >
      <div className="container-ed">
        <SectionHeading
          eyebrow="06 / Leadership & Mentorship"
          title={
            <>
              The minds behind{' '}
              <span className="text-forest">every production.</span>
            </>
          }
          description="Executive producers and creative leads guiding Jay Media Management across Biratnagar and Koshi Province."
          link={{ href: '/team', label: 'Meet full team' }}
        />

        {/* Even Architectural 4-Column Portrait Strip */}
        <AnimeStaggerContainer
          stagger={90}
          distance={20}
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {TEAM_PROFILES.map((member, index) => (
            <Link
              key={member.slug}
              href={`/team/${member.slug}`}
              className="group flex flex-col border border-line bg-paper-deep/40 transition-colors hover:border-forest hover:bg-white"
            >
              <div className="flex items-center justify-between border-b border-line px-4 py-2.5 font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-forest">
                <span>0{index + 1} / Executive</span>
                <ArrowUpRight className="h-3.5 w-3.5 text-faint transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-forest" />
              </div>

              <div className="relative aspect-[4/4.4] overflow-hidden bg-paper-deep">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                />
              </div>

              <div className="border-t border-line p-4">
                <h3 className="display text-xl font-bold text-ink transition-colors group-hover:text-forest">
                  {member.name}
                </h3>
                <p className="mt-1 font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-muted">
                  {member.role}
                </p>
              </div>
            </Link>
          ))}
        </AnimeStaggerContainer>
      </div>
    </section>
  );
}
