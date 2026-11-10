import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import PageHero from '@/components/shared/PageHero';
import SectionHeading from '@/components/shared/SectionHeading';
import CtaBand from '@/components/shared/CtaBand';
import { generatePageMetadata } from '@/lib/seo';
import { TEAM_PROFILES, EVENT_JUDGES } from '@/config/team-data';

export const metadata: Metadata = generatePageMetadata({
  title: 'Our Team, Leadership & Judges | Jay Media Management',
  description:
    'Meet the Chairman, CEO, Mentors, and Celebrity Judges behind Jay Media Management Pvt. Ltd. in Biratnagar, Nepal.',
});

export default function TeamPage() {
  return (
    <div className="min-h-screen bg-paper text-ink">
      <PageHero
        eyebrow="Leadership & Jury"
        title="The people behind every production."
        description="Meet the executives, mentors, and celebrated judges steering Jay Media Management and Nepal Kids Idol across Nepal."
        meta={[
          { label: 'Leadership', value: '4 Core Members' },
          { label: 'Celebrity Jury', value: 'Lochan Bhattarai & Ananda Karki' },
          { label: 'Headquarters', value: 'Central Mall, Biratnagar' },
          { label: 'Founded', value: '2013 (Reg. 2014)' },
        ]}
      />

      {/* Executive Leadership & Mentors */}
      <section className="border-b border-line py-16 md:py-20">
        <div className="container-ed">
          <SectionHeading
            eyebrow="Executive Roster"
            title="Leadership & mentors."
            description="The producers, mentors, and directors responsible for every stage production, film project, and youth competition."
          />

          <div className="grid gap-6 md:grid-cols-2">
            {TEAM_PROFILES.map((member) => (
              <Link
                key={member.slug}
                href={`/team/${member.slug}`}
                className="group flex flex-col gap-5 rounded-xl border border-line bg-white p-5 transition-colors hover:border-line-strong sm:flex-row"
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
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Event Judges */}
      <section className="bg-paper-deep/50 py-16 md:py-20">
        <div className="container-ed">
          <SectionHeading
            eyebrow="Nepal Kids Idol Jury"
            title="Event judges."
            description="Celebrity music maestros guiding contestants across our televised national competition."
          />

          <div className="grid gap-6 md:grid-cols-2">
            {EVENT_JUDGES.map((judge) => (
              <Link
                key={judge.slug}
                href={`/team/${judge.slug}`}
                className="group flex flex-col gap-5 rounded-xl border border-line bg-white p-5 transition-colors hover:border-line-strong sm:flex-row sm:items-center"
              >
                <div className="relative aspect-[4/4.2] w-full shrink-0 overflow-hidden rounded-lg bg-paper-deep sm:w-40">
                  <Image
                    src={judge.image}
                    alt={judge.name}
                    fill
                    sizes="(max-width: 640px) 100vw, 160px"
                    className="img-zoom object-cover object-top"
                  />
                </div>
                <div>
                  <span className="text-xs font-medium text-forest">
                    Official Judge &bull; {judge.eventTitle}
                  </span>
                  <h3 className="mt-1 text-xl font-semibold text-ink group-hover:text-forest">
                    {judge.name}
                  </h3>
                  <p className="mt-0.5 text-xs font-medium text-muted">
                    {judge.title}
                  </p>
                  <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted">
                    {judge.bio}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CtaBand />
    </div>
  );
}
