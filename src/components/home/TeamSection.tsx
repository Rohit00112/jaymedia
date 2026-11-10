import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import SectionHeading from '@/components/shared/SectionHeading';
import Reveal from '@/components/motion/Reveal';
import { TEAM_PROFILES } from '@/config/team-data';
import { cn } from '@/lib/utils';

export default function TeamSection() {
  return (
    <section
      id="team"
      className="border-y border-line bg-sand py-20 md:py-28"
    >
      <div className="container-ed">
        <SectionHeading
          eyebrow="06 / Leadership & Mentorship"
          title={
            <>
              The minds behind{' '}
              <span className="serif italic text-accent">the moments.</span>
            </>
          }
          description="Executive producers and veteran mentors steering Jay Media Management across Biratnagar and Koshi Province."
          link={{ href: '/team', label: 'Meet full team' }}
        />

        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {TEAM_PROFILES.map((member, index) => (
            <Reveal
              key={member.slug}
              delay={index * 70}
              className={cn(index % 2 === 1 && 'lg:mt-8')}
            >
              <Link href={`/team/${member.slug}`} className="group block">
                <div className="relative aspect-[4/4.5] overflow-hidden rounded-[6px] border border-line bg-gradient-to-b from-paper via-paper-deep to-sand shadow-2xs ring-1 ring-inset ring-forest/10 transition-all duration-500 group-hover:border-forest group-hover:shadow-md">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  />
                </div>

                <div className="mt-4 flex items-center justify-between border-t border-line-strong pt-3.5">
                  <div>
                    <h3 className="display text-xl font-bold text-ink transition-colors group-hover:text-forest">
                      {member.name}
                    </h3>
                    <p className="mt-1 font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-forest">
                      {member.role}
                    </p>
                  </div>
                  <ArrowUpRight className="h-4 w-4 text-faint transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-forest" />
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
