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
  title: 'Jay Media Management Pvt. Ltd. | Nepal Kids Idol & Event Production in Biratnagar',
  description:
    'Jay Media Management Pvt. Ltd. (Est. 2013, Biratnagar) — Organizers of Nepal Kids Idol, Miss Koshi Seasons 1–8, Mr. & Miss Little Koshi, feature films, and broadcast media productions.',
});

const FRANCHISES_MARQUEE = [
  'Nepal Kids Idol',
  'Miss Koshi (Seasons 1–8)',
  'Mr. & Miss Little Koshi',
  'The Karma (Feature Film)',
  'Tantra',
  'MEOW (Bilingual Cinema)',
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
