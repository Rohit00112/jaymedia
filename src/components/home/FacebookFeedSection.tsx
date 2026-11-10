import { ArrowUpRight } from 'lucide-react';
import SectionHeading from '@/components/shared/SectionHeading';
import FacebookFeedEmbed from '@/components/shared/FacebookFeedEmbed';
import InstagramFeedEmbed from '@/components/shared/InstagramFeedEmbed';
import { siteConfig } from '@/config/site';

export default function FacebookFeedSection() {
  return (
    <section
      id="social-feeds"
      className="border-b border-line bg-paper-deep/50 py-16 md:py-20"
    >
      <div className="container-ed">
        <SectionHeading
          eyebrow="Social Updates"
          title="Follow us on Facebook & Instagram."
          description="Live event updates, concert ticket announcements, and behind-the-scenes highlights from our official social feeds."
        />

        <div className="grid items-start gap-6 lg:grid-cols-2">
          <div>
            <FacebookFeedEmbed
              pageUrl={siteConfig.social.facebook}
              height={500}
            />
          </div>

          <div>
            <InstagramFeedEmbed
              profileUrl={siteConfig.social.instagram}
              height={500}
            />
          </div>
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-3">
          <a
            href={siteConfig.social.facebook}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-outline"
          >
            <span>Facebook Page</span>
            <ArrowUpRight className="h-4 w-4" />
          </a>

          <a
            href={siteConfig.social.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-outline"
          >
            <span>Instagram Profile</span>
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
