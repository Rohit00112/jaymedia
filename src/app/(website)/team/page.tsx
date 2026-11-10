import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import PageHero from '@/components/shared/PageHero';
import SectionHeading from '@/components/shared/SectionHeading';
import CtaBand from '@/components/shared/CtaBand';
import AnimeStaggerContainer from '@/components/motion/AnimeStaggerContainer';
import { generatePageMetadata } from '@/lib/seo';
import { TEAM_PROFILES } from '@/config/team-data';

export const metadata: Metadata = generatePageMetadata({
  title: 'Our Leadership Team | Jay Media Management',
  description:
    'Meet Chairman Jay Raj Roy and CEO Neesha Khatiwada leading Jay Media Management Pvt. Ltd. in Biratnagar, Nepal.',
});

export default function TeamPage() {
  return (
    <div className="min-h-screen bg-paper text-ink">
      <PageHero
        eyebrow="Leadership"
        title="The leadership behind every production."
        description="Meet the executive team steering Jay Media Management across live concerts, reality television, feature cinema, and regional pageants."
        meta={[
          { label: 'Chairman', value: 'Jay Raj Roy' },
          { label: 'CEO', value: 'Neesha Khatiwada' },
          { label: 'Headquarters', value: 'Central Mall, Biratnagar' },
          { label: 'Founded', value: '2013 (Reg. 2014)' },
        ]}
      />

      {/* Executive Leadership */}
      <section className="py-16 md:py-20">
        <div className="container-ed">
          <SectionHeading
            eyebrow="Executive Roster"
            title="Executive leadership."
            description="Guiding every stage production, film project, and national talent competition from Biratnagar."
          />

          <AnimeStaggerContainer className="grid gap-6 md:grid-cols-2">
            {TEAM_PROFILES.map((member) => (
              <Link
                key={member.slug}
                href={`/team/${member.slug}`}
                className="card-hover group flex flex-col gap-5 rounded-xl border border-line bg-white p-5 sm:flex-row"
              >
                <div className="relative aspect-[4/4.2] w-full shrink-0 overflow-hidden rounded-lg bg-sand sm:w-44">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    sizes="(max-width: 640px) 100vw, 180px"
                    className="img-zoom object-cover object-top"
                  />
                </div>

                <div className="flex flex-1 flex-col justify-between">
                  <div>
                    <span className="text-xs font-medium text-forest">
                      {member.role}
                    </span>
                    <h2 className="mt-1 text-xl font-semibold text-ink transition-colors group-hover:text-forest">
                      {member.name}
                    </h2>
                    <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-muted">
                      {member.shortBio}
                    </p>
                  </div>

                  <div className="mt-4 flex items-center justify-between border-t border-line pt-3.5 text-xs">
                    <span className="text-muted">{member.location}</span>
                    <span className="inline-flex items-center gap-1 font-medium text-forest">
                      <span>Full Profile</span>
                      <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </AnimeStaggerContainer>
        </div>
      </section>

      <CtaBand />
    </div>
  );
}
