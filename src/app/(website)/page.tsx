import Marquee from '@/components/shared/Marquee';
import {
  HeroSection,
  AuditionHubSection,
  IntroSection,
  JudgesSection,
  FeaturedEventsSection,
  ShowreelSection,
  QuoteSection,
  TeamSection,
  JournalSection,
  FacebookFeedSection,
} from '@/components/home';
import { generatePageMetadata } from '@/lib/seo';

export const metadata = generatePageMetadata({
  title: 'Jay Media Management Pvt. Ltd. | Atif Aslam Live in Nepal & Event Production in Biratnagar',
  description:
    'Jay Media Management Pvt. Ltd. (Est. 2013, Biratnagar) — Organizers of Atif Aslam Live in Nepal: Subah Aye Na Tour (Dec 19, 2026 at Itahari Stadium), Miss Koshi Seasons 1–8, Nepal Kids Idol, feature films, and broadcast media productions.',
});

const FRANCHISES_MARQUEE = [
  'Atif Aslam Live in Nepal • Dec 19, 2026',
  'Subah Aye Na Tour • Itahari Stadium',
  'Official Tickets on Khalti by IME',
  'Miss Koshi (Seasons 1–8)',
  'Nepal Kids Idol',
  'Mr. & Miss Little Koshi',
  'The Karma (Feature Film)',
  "Women's T20 Cricket League",
  'JMM Runway Fashion Show',
];

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <Marquee items={FRANCHISES_MARQUEE} />
      <AuditionHubSection />
      <IntroSection />
      <JudgesSection />
      <FeaturedEventsSection />
      <ShowreelSection />
      <QuoteSection />
      <TeamSection />
      <JournalSection />
      <FacebookFeedSection />
    </>
  );
}
