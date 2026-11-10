import { HeroScene } from '@/components/three';
import HeroEventShowcase from '@/components/home/HeroEventShowcase';
import { EVENTS_DATA } from '@/config/events-data';

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden border-b border-line bg-paper-deep">
      {/* Three.js Acoustic Horizon Grid & Spatial Parallax */}
      <HeroScene />
      <HeroEventShowcase
        initialEvents={EVENTS_DATA.filter((e) => e.status !== 'draft')}
      />
    </section>
  );
}
