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
import { generatePageMetadata } from '@/lib/seo';

export const metadata = generatePageMetadata({
  title: 'Jay Media Management | Premier Event & Media Production in Biratnagar, Nepal',
  description:
    'Jay Media Management Pvt. Ltd. is Eastern Nepal’s premier creative event management and media production company. Organizers of Miss Koshi, Mr. & Miss Little Koshi, and bespoke brand experiences.',
});

export default function HomePage() {
  return (
    <>
      {/* 1. Cinematic Hero */}
      <HeroSection />

      {/* 2. Company Introduction */}
      <IntroSection />

      {/* 3. Services Spectrum */}
      <ServicesSection />

      {/* 4. Flagship Productions Showcase */}
      <FeaturedEventsSection />

      {/* 5. Mr. & Miss Little Koshi Dedicated Spotlight */}
      <LittleKoshiFeature />

      {/* 6. Cinematic Showreel & Broadcast Vault */}
      <ShowreelSection />

      {/* 7. Verified Leadership & Mentors */}
      <TeamSection />

      {/* 8. Contact & Proposal Call-to-Action */}
      <ContactCTA />
    </>
  );
}
