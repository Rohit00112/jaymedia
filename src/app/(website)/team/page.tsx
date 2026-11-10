import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import PageHero from '@/components/shared/PageHero';
import SectionHeading from '@/components/shared/SectionHeading';
import CtaBand from '@/components/shared/CtaBand';
import Reveal from '@/components/motion/Reveal';
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
        title={
          <>
            The minds behind
            <br />
            <span className="serif italic text-accent">the moments.</span>
          </>
        }
        description="Meet the executives, mentors, and celebrated judges steering Jay Media Management and Nepal Kids Idol across Nepal."
        image="https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1800&q=85"
        imageAlt="Jay Media Management Leadership and Live Stage Production"
        meta={[
          { label: 'Leadership', value: '4 Core Members' },
          { label: 'Celebrity Jury', value: 'Lochan Bhattarai & Ananda Karki' },
          { label: 'Headquarters', value: 'Central Mall, Biratnagar' },
          { label: 'Founded', value: '2013 (Reg. 2014)' },
        ]}
      />

      {/* Executive Leadership & Mentors */}
      <section className="py-20 md:py-28">
        <div className="container-ed">
          <SectionHeading
            eyebrow="01 / Executive Roster"
            title={
              <>
                Verified{' '}
                <span className="serif italic text-accent">leadership.</span>
              </>
            }
            description="The producers, mentors, and directors responsible for every stage production, film project, and youth competition."
          />

          <div className="grid gap-8 md:grid-cols-2 lg:gap-10">
            {TEAM_PROFILES.map((member, index) => (
              <Reveal key={member.slug} delay={(index % 2) * 70}>
                <Link
                  href={`/team/${member.slug}`}
                  className="group flex flex-col overflow-hidden rounded-[12px] border border-line bg-white shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-forest hover:shadow-lg sm:flex-row"
                >
                  <div className="relative aspect-square w-full shrink-0 overflow-hidden bg-sand sm:w-56">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      sizes="(max-width: 640px) 100vw, 224px"
                      className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                    />
                    <span className="absolute left-3 top-3 rounded-full bg-white/95 px-2.5 py-1 font-mono text-[9px] font-bold uppercase tracking-wider text-forest shadow-xs">
                      {member.category}
                    </span>
                  </div>

                  <div className="flex flex-1 flex-col justify-between p-6">
                    <div>
                      <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-forest">
                        {member.role}
                      </span>
                      <h2 className="display mt-1 text-2xl font-bold text-ink transition-colors group-hover:text-forest">
                        {member.name}
                      </h2>
                      <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-muted">
                        {member.shortBio}
                      </p>
                    </div>

                    <div className="mt-5 flex items-center justify-between border-t border-line pt-4">
                      <span className="font-mono text-[10px] text-faint">
                        {member.location}
                      </span>
                      <span className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-forest">
                        <span>Full Profile</span>
                        <ArrowUpRight className="h-3.5 w-3.5" />
                      </span>
                    </div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Event Judges */}
      <section className="border-y border-line bg-sand py-20 md:py-24">
        <div className="container-ed">
          <SectionHeading
            eyebrow="02 / Nepal Kids Idol Jury"
            title={
              <>
                Esteemed event{' '}
                <span className="serif italic text-accent">judges.</span>
              </>
            }
            description="Celebrity music maestros guiding contestants across our televised national competition."
          />

          <div className="grid gap-8 md:grid-cols-2">
            {EVENT_JUDGES.map((judge) => (
              <Link
                key={judge.slug}
                href={`/team/${judge.slug}`}
                className="group flex flex-col items-center gap-6 rounded-[12px] border border-line bg-white p-6 shadow-xs transition-all hover:border-forest hover:shadow-md sm:flex-row"
              >
                <div className="relative h-36 w-36 shrink-0 overflow-hidden rounded-[10px] bg-paper">
                  <Image
                    src={judge.image}
                    alt={judge.name}
                    fill
                    sizes="144px"
                    className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div>
                  <span className="inline-block rounded-full bg-forest-soft px-3 py-1 font-mono text-[9px] font-bold uppercase tracking-wider text-forest">
                    Official Judge • {judge.eventTitle}
                  </span>
                  <h3 className="display mt-2 text-2xl font-bold text-forest group-hover:text-ink">
                    {judge.name}
                  </h3>
                  <p className="mt-1 text-xs font-semibold text-muted">
                    {judge.title}
                  </p>
                  <p className="mt-2.5 line-clamp-2 text-sm text-ink-soft">
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
