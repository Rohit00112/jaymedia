import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import SectionHeading from '@/components/shared/SectionHeading';
import Reveal from '@/components/motion/Reveal';
import { EVENT_JUDGES } from '@/config/team-data';

export default function JudgesSection() {
  return (
    <section id="judges" className="border-b border-line bg-white py-20 md:py-24">
      <div className="container-ed">
        <SectionHeading
          eyebrow="02 / Nepal Kids Idol Jury"
          title={
            <>
              Voices of authority{' '}
              <span className="text-forest">on the panel.</span>
            </>
          }
          description="Nepali playback legends and vocal authorities evaluating tone, technique, expression, and live television stage readiness."
          link={{ href: '/team', label: 'All jury & leadership' }}
        />

        {/* Asymmetrical 4 / 8 Architectural Split */}
        <div className="grid gap-8 lg:grid-cols-12">
          {/* Left Governance Dossier */}
          <Reveal className="lg:col-span-4">
            <div className="flex h-full flex-col justify-between border border-line border-t-2 border-t-forest bg-paper-deep p-7">
              <div>
                <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-forest">
                  Selection Governance
                </span>

                <h3 className="display mt-3 text-2xl font-bold leading-snug text-ink sm:text-3xl">
                  30 Televised Episodes. Fair Evaluation.
                </h3>

                <p className="mt-4 text-sm leading-relaxed text-ink-soft">
                  Every young singer auditioning across Nepal&apos;s 77
                  districts&mdash;or submitting from Sikkim, Darjeeling, Assam,
                  Dehradun, Siliguri, USA, Canada, and Australia&mdash;performs
                  under structured vocal scoring and live mentoring.
                </p>

                <dl className="mt-6 divide-y divide-line border-y border-line text-xs">
                  <div className="flex justify-between gap-4 py-3">
                    <dt className="font-mono uppercase tracking-wider text-muted">
                      Age Category
                    </dt>
                    <dd className="font-bold text-ink">5 &ndash; 15 Years</dd>
                  </div>
                  <div className="flex justify-between gap-4 py-3">
                    <dt className="font-mono uppercase tracking-wider text-muted">
                      Broadcast Format
                    </dt>
                    <dd className="font-bold text-ink">National TV</dd>
                  </div>
                  <div className="flex justify-between gap-4 py-3">
                    <dt className="font-mono uppercase tracking-wider text-muted">
                      Online Auditions
                    </dt>
                    <dd className="font-bold text-forest">Active Worldwide</dd>
                  </div>
                </dl>
              </div>

              <div className="mt-7 space-y-2.5">
                <Link
                  href="/register/nepal-kids-idol"
                  className="btn btn-accent w-full"
                >
                  <span>Register Contestant</span>
                  <ArrowUpRight className="h-4 w-4 text-gold" />
                </Link>
                <Link
                  href="/events/nepal-kids-idol"
                  className="btn btn-outline w-full bg-white"
                >
                  <span>Competition Guidelines</span>
                </Link>
              </div>
            </div>
          </Reveal>

          {/* Right Landscape Jury Cards Stack */}
          <div className="flex flex-col justify-between gap-6 lg:col-span-8">
            {EVENT_JUDGES.map((judge, idx) => (
              <Reveal key={judge.slug} delay={idx * 90}>
                <Link
                  href={`/team/${judge.slug}`}
                  className="group grid items-center gap-6 border border-line bg-paper-deep/40 p-5 transition-colors hover:border-forest hover:bg-white sm:grid-cols-12"
                >
                  <div className="sm:col-span-4">
                    <div className="relative aspect-[4/4.2] w-full overflow-hidden rounded-[2px] border border-line bg-white">
                      <Image
                        src={judge.image}
                        alt={judge.name}
                        fill
                        sizes="(max-width: 640px) 100vw, 240px"
                        className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col justify-between sm:col-span-8">
                    <div>
                      <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-forest">
                        0{idx + 1} &bull; Official Jury Panel
                      </span>
                      <h3 className="display mt-2 text-2xl font-bold text-ink transition-colors group-hover:text-forest sm:text-3xl">
                        {judge.name}
                      </h3>
                      <p className="mt-1 text-xs font-semibold uppercase tracking-[0.06em] text-ink-soft">
                        {judge.title}
                      </p>
                      <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-muted">
                        {judge.bio}
                      </p>
                    </div>

                    <div className="mt-5 flex items-center justify-between border-t border-line pt-4 font-mono text-[10.5px] font-semibold uppercase tracking-[0.14em] text-ink group-hover:text-forest">
                      <span>Read Jury Profile</span>
                      <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
