import Link from 'next/link';
import { ArrowUpRight, Radio } from 'lucide-react';
import SectionHeading from '@/components/shared/SectionHeading';
import FacebookFeedEmbed from '@/components/shared/FacebookFeedEmbed';
import Reveal from '@/components/motion/Reveal';
import { siteConfig } from '@/config/site';

const STREAM_TOPICS = [
  {
    code: '01',
    title: 'Atif Aslam Concert & Ticket Notices',
    note: 'Official announcements for Atif Aslam Live in Nepal (Subah Aye Na Tour) at Itahari Stadium on Dec 19, 2026 and Khalti ticket drops.',
  },
  {
    code: '02',
    title: 'Grand Finale & Stage Coverage',
    note: 'Live stage photography and coronation moments from Miss Koshi, Little Koshi, and Nepal Kids Idol.',
  },
  {
    code: '03',
    title: 'Auditions & Production Notes',
    note: 'District-level audition schedules, studio rehearsal clips, and Central Mall Biratnagar updates.',
  },
] as const;

export default function FacebookFeedSection() {
  return (
    <section
      id="facebook-feed"
      className="border-b border-line bg-white py-20 md:py-24"
    >
      <div className="container-ed">
        <SectionHeading
          eyebrow="08 / Official Social Stream"
          title={
            <>
              Live updates from{' '}
              <span className="text-forest">Jay Media Management.</span>
            </>
          }
          description="Follow studio dispatches, event notices, and photo coverage directly from the official Jay Media Management Facebook page."
          link={{
            href: siteConfig.social.facebook,
            label: 'Visit Facebook Page',
          }}
        />

        <div className="grid items-start gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Left Studio Social Context & Stream Topics */}
          <Reveal className="lg:col-span-6 xl:col-span-7">
            <div className="border-t-2 border-ink pt-6">
              <div className="flex items-center gap-3 font-mono text-[10.5px] font-semibold uppercase tracking-[0.16em] text-forest">
                <Radio className="h-3.5 w-3.5" />
                <span>Jay Media Management Pvt. Ltd.</span>
              </div>

              <h3 className="display mt-4 text-2xl font-bold leading-snug text-ink sm:text-3xl">
                Direct social dispatches from our Biratnagar desk.
              </h3>

              <p className="mt-4 max-w-xl text-sm leading-relaxed text-ink-soft md:text-base">
                Browse recent announcements, audition gallery drops, and live
                production updates straight from{' '}
                <strong className="font-semibold text-ink">
                  facebook.com/JayMediaManagement
                </strong>{' '}
                in the scrollable timeline alongside.
              </p>

              <dl className="mt-8 divide-y divide-line border-y border-line">
                {STREAM_TOPICS.map((topic) => (
                  <div key={topic.code} className="grid gap-3 py-4 sm:grid-cols-12">
                    <dt className="font-mono text-[10.5px] font-semibold uppercase tracking-[0.14em] text-forest sm:col-span-4">
                      {topic.code} / {topic.title}
                    </dt>
                    <dd className="text-xs leading-relaxed text-muted sm:col-span-8 sm:text-sm">
                      {topic.note}
                    </dd>
                  </div>
                ))}
              </dl>

              <div className="mt-8 flex flex-wrap items-center gap-3.5">
                <a
                  href={siteConfig.social.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-accent"
                >
                  <span>Follow on Facebook</span>
                  <ArrowUpRight className="h-4 w-4 text-gold" />
                </a>

                <Link
                  href="/register"
                  className="btn btn-outline bg-white"
                >
                  <span>Open Event Registrations</span>
                </Link>
              </div>
            </div>
          </Reveal>

          {/* Right Scrollable Jay Media Management Facebook Timeline Frame */}
          <Reveal delay={90} className="lg:col-span-6 xl:col-span-5">
            <FacebookFeedEmbed
              pageUrl={siteConfig.social.facebook}
              height={580}
            />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

