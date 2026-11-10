import Image from 'next/image';
import Link from 'next/link';
import { AnimeStaggerContainer } from '@/components/motion';
import SectionHeading from '@/components/shared/SectionHeading';
import { TEAM_PROFILES } from '@/config/team-data';

export default function TeamSection() {
  return (
    <section
      id="team"
      className="border-b border-line bg-paper-deep py-20 md:py-24"
    >
      <div className="container-ed">
        <SectionHeading
          eyebrow="Leadership"
          title="The team behind every production."
          description="Executive producers and creative leads guiding Jay Media Management across Biratnagar and Koshi Province."
          link={{ href: '/team', label: 'Meet the team' }}
        />

        <AnimeStaggerContainer
          stagger={80}
          distance={18}
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {TEAM_PROFILES.map((member) => (
            <Link
              key={member.slug}
              href={`/team/${member.slug}`}
              className="group flex flex-col overflow-hidden rounded-lg border border-line bg-white transition-colors hover:border-forest"
            >
              <div className="relative aspect-[4/4.4] overflow-hidden bg-sand">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              <div className="p-5">
                <h3 className="display text-xl font-bold text-ink transition-colors group-hover:text-forest">
                  {member.name}
                </h3>
                <p className="mt-1 text-sm text-muted">{member.role}</p>
              </div>
            </Link>
          ))}
        </AnimeStaggerContainer>
      </div>
    </section>
  );
}
