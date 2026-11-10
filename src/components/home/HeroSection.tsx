import HeroEventShowcase from '@/components/home/HeroEventShowcase';
import { EVENTS_DATA } from '@/config/events-data';

export default function HeroSection() {
  const headlineEvent =
    EVENTS_DATA.find((e) => e.slug === 'atif-aslam-live-in-nepal') ||
    EVENTS_DATA[0];

  return (
    <section className="relative overflow-hidden border-b border-line bg-paper py-12 md:py-20">
      <HeroEventShowcase event={headlineEvent} />
    </section>
  );
}
