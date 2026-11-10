import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import SectionHeading from '@/components/shared/SectionHeading';
import FacebookFeedEmbed from '@/components/shared/FacebookFeedEmbed';
import Reveal from '@/components/motion/Reveal';
import { siteConfig } from '@/config/site';

export default function FacebookFeedSection() {
  return (
    <section
      id="facebook-feed"
      className="border-b border-line bg-paper-deep py-20 md:py-24"
    >
      <div className="container-ed">
        <SectionHeading
          eyebrow="Social Updates"
          title="Follow us on Facebook."
          description="Live event updates, concert ticket announcements, and behind-the-scenes photos."
          link={{
            href: siteConfig.social.facebook,
            label: 'Open Facebook Page',
          }}
        />

        <div className="grid items-start gap-10 lg:grid-cols-12 lg:gap-12">
          <Reveal className="lg:col-span-6 xl:col-span-7">
            <div className="rounded-lg border border-line bg-white p-7 sm:p-9">
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-forest">
                Jay Media Management Pvt. Ltd.
              </p>

              <h3 className="display mt-3 text-2xl font-bold leading-snug text-ink sm:text-3xl">
                Stay connected with our upcoming shows and auditions.
              </h3>

              <p className="mt-4 text-base leading-relaxed text-muted">
                We share official announcements for Atif Aslam Live in Nepal,
                Miss Koshi, and Nepal Kids Idol directly on our verified
                Facebook page.
              </p>

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

                <Link href="/events" className="btn btn-outline bg-white">
                  <span>Explore Events</span>
                </Link>
              </div>
            </div>
          </Reveal>

          <Reveal delay={80} className="lg:col-span-6 xl:col-span-5">
            <FacebookFeedEmbed
              pageUrl={siteConfig.social.facebook}
              height={540}
            />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
