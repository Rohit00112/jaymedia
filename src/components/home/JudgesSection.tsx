import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import SectionHeading from '@/components/shared/SectionHeading';
import Reveal from '@/components/motion/Reveal';
import { EVENT_JUDGES } from '@/config/team-data';

export default function JudgesSection() {
  return (
    <section id="judges" className="border-b border-line bg-paper py-20 md:py-28">
      <div className="container-ed">
        <SectionHeading
          eyebrow="02 / Nepal Kids Idol Jury"
          title={
            <>
              Voices of authority{' '}
              <span className="serif italic text-accent">on the panel.</span>
            </>
          }
          description="Nepali playback legends and vocal authorities evaluating tone, technique, expression, and television stage readiness."
          link={{ href: '/team', label: 'All jury & leaders' }}
        />

        <div className="grid gap-8 lg:grid-cols-12 lg:items-stretch">
          {/* Two Celebrity Judge Portrait Cards */}
          {EVENT_JUDGES.map((judge, idx) => (
            <Reveal key={judge.slug} delay={idx * 80} className="lg:col-span-4">
              <Link
                href={`/team/${judge.slug}`}
                className="group flex h-full flex-col overflow-hidden rounded-[12px] border border-line bg-white shadow-2xs transition-all duration-300 hover:-translate-y-1 hover:border-forest hover:shadow-lg"
              >
                <div className="relative aspect-[4/4.3] w-full overflow-hidden bg-gradient-to-b from-paper to-sand">
                  <Image
                    src={judge.image}
                    alt={judge.name}
                    fill
                    sizes="(max-width: 1024px) 100vw, 33vw"
                    className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  />
                  <span className="absolute left-4 top-4 rounded-full bg-white/92 px-3 py-1 font-mono text-[9px] font-bold uppercase tracking-[0.16em] text-forest backdrop-blur-xs">
                    {String(idx + 1).padStart(2, '0')} • Jury Panel
                  </span>
                </div>

                <div className="flex flex-1 flex-col justify-between p-6">
                  <div>
                    <h3 className="display text-2xl font-bold text-ink transition-colors group-hover:text-forest">
                      {judge.name}
                    </h3>
                    <p className="mt-1 font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-forest">
                      {judge.title}
                    </p>
                    <p className="mt-3 line-clamp-3 text-xs leading-relaxed text-muted">
                      {judge.bio}
                    </p>
                  </div>

                  <span className="mt-5 inline-flex items-center gap-1.5 border-t border-line pt-4 font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-ink group-hover:text-forest">
                    <span>Read Jury Profile</span>
                    <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}

          {/* Balanced Right Editorial Dossier Card */}
          <Reveal delay={160} className="lg:col-span-4">
            <div className="flex h-full flex-col justify-between rounded-[12px] border border-line bg-sand p-7 md:p-8">
              <div>
                <span className="inline-block rounded-full bg-forest px-3.5 py-1.5 font-mono text-[9.5px] font-bold uppercase tracking-[0.16em] text-gold">
                  Selection Governance
                </span>

                <h3 className="display mt-5 text-2xl font-bold leading-snug text-ink sm:text-3xl">
                  30 Televised Episodes.{' '}
                  <span className="serif italic font-normal text-forest">
                    Fair Evaluation.
                  </span>
                </h3>

                <p className="mt-4 text-sm leading-relaxed text-ink-soft">
                  Every young singer auditioning across Nepal&apos;s 77
                  districts—or submitting from Sikkim, Darjeeling, Assam,
                  Dehradun, Siliguri, USA, Canada, and Australia—performs under
                  transparent scoring and live mentorship.
                </p>

                <dl className="mt-6 space-y-3 border-t border-line-strong pt-5 text-xs">
                  <div className="flex justify-between gap-4">
                    <dt className="font-mono uppercase tracking-wider text-muted">
                      Age Category
                    </dt>
                    <dd className="font-bold text-ink">5 – 15 Years</dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt className="font-mono uppercase tracking-wider text-muted">
                      Broadcast Format
                    </dt>
                    <dd className="font-bold text-ink">National TV</dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt className="font-mono uppercase tracking-wider text-muted">
                      Online Auditions
                    </dt>
                    <dd className="font-bold text-forest">Active Worldwide</dd>
                  </div>
                </dl>
              </div>

              <div className="mt-8 space-y-3 border-t border-line-strong pt-6">
                <Link
                  href="/register/nepal-kids-idol"
                  className="btn btn-accent w-full rounded-full"
                >
                  Register Contestant
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/events/nepal-kids-idol"
                  className="btn btn-outline w-full rounded-full bg-white"
                >
                  Competition Guidelines
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
