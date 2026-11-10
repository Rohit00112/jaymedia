import Image from 'next/image';
import Link from 'next/link';
import SectionHeading from '@/components/shared/SectionHeading';
import { TEAM_PROFILES } from '@/config/team-data';

export default function TeamSection() {
  return (
    <section
      id="team"
      className="border-b border-line bg-paper-deep/50 py-16 md:py-20"
    >
      <div className="container-ed">
        <SectionHeading
          eyebrow="Leadership"
          title="The team behind every production."
          description="Executive producers and creative leads guiding Jay Media Management across Biratnagar and Koshi Province."
          link={{ href: '/team', label: 'Meet the team' }}
        />

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {TEAM_PROFILES.map((member) => (
            <Link
              key={member.slug}
              href={`/team/${member.slug}`}
              className="group flex flex-col overflow-hidden rounded-xl border border-line bg-white transition-colors hover:border-line-strong"
            >
              <div className="relative aspect-[4/4.2] overflow-hidden bg-sand">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="img-zoom object-cover object-top"
                />
              </div>

              <div className="p-4">
                <h3 className="text-base font-semibold text-ink transition-colors group-hover:text-forest">
                  {member.name}
                </h3>
                <p className="mt-0.5 text-xs text-muted">{member.role}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
