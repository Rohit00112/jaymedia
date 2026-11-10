import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import SectionHeading from '@/components/shared/SectionHeading';
import Reveal from '@/components/motion/Reveal';
import { EVENT_JUDGES } from '@/config/team-data';

export default function JudgesSection() {
  return (
    <section
      id="judges"
      className="border-b border-line bg-paper-deep py-20 md:py-24"
    >
      <div className="container-ed">
        <SectionHeading
          eyebrow="Nepal Kids Idol"
          title="Celebrity jury panel."
          description="Renowned Nepali playback vocalists evaluating tone, technique, and stage presence across our national singing competition."
          link={{ href: '/events/nepal-kids-idol', label: 'About Nepal Kids Idol' }}
        />

        <div className="grid gap-8 md:grid-cols-2">
          {EVENT_JUDGES.map((judge, idx) => (
            <Reveal key={judge.slug} delay={idx * 80}>
              <Link
                href={`/team/${judge.slug}`}
                className="group grid items-center gap-6 rounded-lg border border-line bg-white p-6 transition-colors hover:border-forest sm:grid-cols-12"
              >
                <div className="sm:col-span-5">
                  <div className="relative aspect-[4/4.4] w-full overflow-hidden rounded-md bg-paper-deep">
                    <Image
                      src={judge.image}
                      alt={judge.name}
                      fill
                      sizes="(max-width: 640px) 100vw, 260px"
                      className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                  </div>
                </div>

                <div className="flex flex-col justify-between sm:col-span-7">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.12em] text-forest">
                      {judge.role}
                    </p>
                    <h3 className="display mt-2 text-2xl font-bold text-ink transition-colors group-hover:text-forest">
                      {judge.name}
                    </h3>
                    <p className="mt-1 text-sm font-medium text-ink-soft">
                      {judge.title}
                    </p>
                    <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-muted">
                      {judge.bio}
                    </p>
                  </div>

                  <div className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-forest">
                    <span>View profile</span>
                    <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
