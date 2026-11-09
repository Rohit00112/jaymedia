import {
  HeroSection,
  IntroSection,
  ServicesSection,
  FeaturedEventsSection,
  LittleKoshiFeature,
  ShowreelSection,
  TeamSection,
  ContactCTA,
} from '@/components/home';
import Marquee from '@/components/shared/Marquee';
import { generatePageMetadata } from '@/lib/seo';

export const metadata = generatePageMetadata({
  title: 'Jay Media Management | Premier Event & Media Production in Biratnagar, Nepal',
  description:
    'Jay Media Management Pvt. Ltd. is Eastern Nepal’s premier creative event management and media production company. Organizers of Miss Koshi, Mr. & Miss Little Koshi, and bespoke brand experiences.',
});

const MARQUEE_ITEMS = [
  'Miss Koshi',
  'Mr. & Miss Little Koshi',
  'Nepal Kids Dancing Champion',
  'Corporate Galas',
  'Brand Experiences',
];

export default function HomePage() {
  return (
    <>
      {/* 1. Cinematic hero */}
      <HeroSection />

      {/* 2. Studio introduction */}
      <IntroSection />

      {/* 3. Production marquee */}
      <Marquee items={MARQUEE_ITEMS} />

      {/* 4. Capabilities index */}
      <ServicesSection />

      {/* 5. Flagship productions */}
      <FeaturedEventsSection />

      {/* 6. Little Koshi spotlight */}
      <LittleKoshiFeature />

      {/* 7. Showreel */}
      <ShowreelSection />

      {/* 8. Leadership */}
      <TeamSection />

      {/* 9. Contact call-to-action */}
      <ContactCTA />
    </>
  );
}
