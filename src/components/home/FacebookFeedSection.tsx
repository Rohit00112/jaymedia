import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import SectionHeading from '@/components/shared/SectionHeading';
import FacebookFeedEmbed from '@/components/shared/FacebookFeedEmbed';
import { siteConfig } from '@/config/site';

export default function FacebookFeedSection() {
  return (
    <section
      id="facebook-feed"
      className="border-b border-line bg-paper-deep/50 py-16 md:py-20"
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

        <div className="grid items-start gap-8 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-6 xl:col-span-7">
            <div className="rounded-xl border border-line bg-white p-6 sm:p-8">
              <p className="text-xs font-semibold uppercase tracking-wider text-forest">
                Jay Media Management Pvt. Ltd.
              </p>

              <h3 className="mt-2.5 text-xl font-semibold leading-snug text-ink sm:text-2xl">
                Stay connected with our upcoming shows and auditions.
              </h3>

              <p className="mt-3 text-sm leading-relaxed text-muted sm:text-base">
                We share official announcements for Atif Aslam Live in Nepal,
                Miss Koshi, and Nepal Kids Idol directly on our verified
                Facebook page.
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-3">
                <a
                  href={siteConfig.social.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary"
                >
                  <span>Follow on Facebook</span>
                  <ArrowUpRight className="h-4 w-4" />
                </a>

                <Link href="/events" className="btn btn-outline">
                  Explore Events
                </Link>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 xl:col-span-5">
            <FacebookFeedEmbed
              pageUrl={siteConfig.social.facebook}
              height={480}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
