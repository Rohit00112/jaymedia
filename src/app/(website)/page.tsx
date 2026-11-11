import {
  HeroSection,
  FeaturedEventsSection,
  IntroSection,
  ShowreelSection,
  TeamSection,
  JournalSection,
  FacebookFeedSection,
  QuoteSection,
  ConcertModalPopup,
} from '@/components/home';
import { generatePageMetadata } from '@/lib/seo';
import { listVideosRepo } from '@/lib/backend/repository';

export const instant = false;

export const metadata = generatePageMetadata({
  title:
    'Jay Media Management Pvt. Ltd. | Eastern Echoes (Atif Aslam Live) & Event Production in Biratnagar',
  description:
    'Jay Media Management Pvt. Ltd. (Est. 2013, Biratnagar) — Organizers of Eastern Echoes featuring Atif Aslam Live (Dec 19, 2026 at Itahari Stadium), Miss Koshi Seasons 1–8, Nepal Kids Idol, feature films, and broadcast media productions.',
});

export default async function HomePage() {
  const videos = await listVideosRepo();

  return (
    <>
      <ConcertModalPopup />
      <HeroSection />
      <FeaturedEventsSection />
      <IntroSection />
      <ShowreelSection initialVideos={videos} />
      <TeamSection />
      <JournalSection />
      <FacebookFeedSection />
      <QuoteSection />
    </>
  );
}
