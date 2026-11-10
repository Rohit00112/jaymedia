import {
  HeroSection,
  FeaturedEventsSection,
  IntroSection,
  ShowreelSection,
  TeamSection,
  JournalSection,
  FacebookFeedSection,
  AuditionHubSection,
  QuoteSection,
} from '@/components/home';
import { generatePageMetadata } from '@/lib/seo';

export const metadata = generatePageMetadata({
  title:
    'Jay Media Management Pvt. Ltd. | Atif Aslam Live in Nepal & Event Production in Biratnagar',
  description:
    'Jay Media Management Pvt. Ltd. (Est. 2013, Biratnagar) — Organizers of Atif Aslam Live in Nepal: Subah Aye Na Tour (Dec 19, 2026 at Itahari Stadium), Miss Koshi Seasons 1–8, Nepal Kids Idol, feature films, and broadcast media productions.',
});

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <FeaturedEventsSection />
      <IntroSection />
      <ShowreelSection />
      <TeamSection />
      <JournalSection />
      <FacebookFeedSection />
      <AuditionHubSection />
      <QuoteSection />
    </>
  );
}
