import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import SectionHeading from '@/components/shared/SectionHeading';
import { EVENT_JUDGES } from '@/config/team-data';

export default function JudgesSection() {
  return (
    <section id="judges" className="border-b border-line bg-white py-16 md:py-20">
      <div className="container-ed">
        <SectionHeading
          eyebrow="Nepal Kids Idol"
          title="Celebrity jury panel."
          description="Renowned Nepali playback vocalists evaluating tone, technique, and stage presence across our national singing competition."
          link={{
            href: '/events/nepal-kids-idol',
            label: 'About Nepal Kids Idol',
          }}
        />

        <div className="grid gap-6 md:grid-cols-2">
          {EVENT_JUDGES.map((judge) => (
            <Link
              key={judge.slug}
              href={`/team/${judge.slug}`}
              className="group flex flex-col gap-5 rounded-xl border border-line bg-white p-5 transition-colors hover:border-line-strong sm:flex-row sm:items-center"
            >
              <div className="relative aspect-[4/4.2] w-full shrink-0 overflow-hidden rounded-lg bg-paper-deep sm:w-44">
                <Image
                  src={judge.image}
                  alt={judge.name}
                  fill
                  sizes="(max-width: 640px) 100vw, 180px"
                  className="img-zoom object-cover object-top"
                />
              </div>

              <div className="flex flex-1 flex-col justify-between">
                <div>
                  <p className="text-xs font-medium text-forest">
                    Official Judge &bull; {judge.eventTitle}
                  </p>
                  <h3 className="mt-1 text-xl font-semibold text-ink transition-colors group-hover:text-forest">
                    {judge.name}
                  </h3>
                  <p className="mt-0.5 text-xs font-medium text-muted">
                    {judge.title}
                  </p>
                  <p className="mt-2.5 line-clamp-3 text-sm leading-relaxed text-muted">
                    {judge.bio}
                  </p>
                </div>

                <div className="mt-4 inline-flex items-center gap-1 text-xs font-medium text-forest">
                  <span>View profile</span>
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
