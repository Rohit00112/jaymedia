import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import SectionHeading from '@/components/shared/SectionHeading';
import AnimeStaggerContainer from '@/components/motion/AnimeStaggerContainer';
import { listTeamRepo } from '@/lib/backend/repository';

export default async function TeamSection() {
  const members = await listTeamRepo();

  return (
    <section
      id="team"
      className="border-b border-line bg-paper-deep/50 py-16 md:py-20"
    >
      <div className="container-ed">
        <SectionHeading
          eyebrow="Leadership"
          title="The team behind every production."
          description="Executive leadership guiding Jay Media Management across Biratnagar and Koshi Province."
          link={{ href: '/team', label: 'Meet the team' }}
        />

        <AnimeStaggerContainer className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {members.map((member) => (
            <Link
              key={member.slug}
              href={`/team/${member.slug}`}
              className="card-hover group flex flex-col gap-5 overflow-hidden rounded-xl border border-line bg-white p-5 sm:flex-row sm:items-center"
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
                  <h3 className="mt-1 text-xl font-semibold text-ink transition-colors group-hover:text-forest">
                    {member.name}
                  </h3>
                  <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-muted">
                    {member.shortBio}
                  </p>
                </div>

                <div className="mt-4 inline-flex items-center gap-1 text-xs font-medium text-forest">
                  <span>View profile</span>
                  <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </div>
            </Link>
          ))}
        </AnimeStaggerContainer>
      </div>
    </section>
  );
}
