import { ArrowUpRight } from 'lucide-react';
import SectionHeading from '@/components/shared/SectionHeading';
import FacebookFeedEmbed from '@/components/shared/FacebookFeedEmbed';
import InstagramFeedEmbed from '@/components/shared/InstagramFeedEmbed';
import Reveal from '@/components/motion/Reveal';
import { FacebookIcon, InstagramIcon } from '@/components/shared/BrandIcons';
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
          <Reveal>
            <FacebookFeedEmbed
              pageUrl={siteConfig.social.facebook}
              height={500}
            />
          </Reveal>

          <Reveal delay={0.08}>
            <InstagramFeedEmbed
              profileUrl={siteConfig.social.instagram}
              height={500}
            />
          </Reveal>
        </div>

        <Reveal delay={0.14} className="mt-6 flex flex-wrap items-center gap-3">
          <a
            href={siteConfig.social.facebook}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-outline hover:border-[#1877F2]/40 hover:bg-[#1877F2]/5"
          >
            <FacebookIcon className="h-4 w-4 shrink-0" />
            <span>Facebook Page</span>
            <ArrowUpRight className="h-3.5 w-3.5" />
          </a>

          <a
            href={siteConfig.social.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-outline hover:border-[#E4405F]/40 hover:bg-[#E4405F]/5"
          >
            <InstagramIcon className="h-4 w-4 shrink-0" />
            <span>Instagram Profile</span>
            <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
        </Reveal>
      </div>
    </section>
  );
}
