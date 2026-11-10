import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import {
  Award,
  Compass,
  Eye,
  HeartHandshake,
  ShieldCheck,
} from 'lucide-react';
import PageHero from '@/components/shared/PageHero';
import SectionHeading from '@/components/shared/SectionHeading';
import CtaBand from '@/components/shared/CtaBand';
import { TEAM_PROFILES } from '@/config/team-data';
import { generatePageMetadata } from '@/lib/seo';

export const metadata: Metadata = generatePageMetadata({
  title: 'About Us | Jay Media Management Pvt. Ltd.',
  description:
    'Established in 2013 and registered in 2014 in Biratnagar, Nepal — learn about Jay Media Management Pvt. Ltd., leadership team, films, and flagship pageants.',
});

const VALUES = [
  {
    icon: Award,
    title: 'Production Excellence',
    description:
      'Every lighting cue, acoustic line array, and televised broadcast sequence is engineered for uncompromised international caliber.',
  },
  {
    icon: HeartHandshake,
    title: 'Youth & Cultural Elevation',
    description:
      'From Nepal Kids Idol to Miss Koshi, our platforms empower young dreamers across Nepal and the global diaspora with poise and purpose.',
  },
  {
    icon: ShieldCheck,
    title: 'Ethical Integrity',
    description:
      'Transparent judging protocols, supportive family orientation, and long-standing commitments to regional and corporate partners.',
  },
  {
    icon: Compass,
    title: 'Multidiscipline Innovation',
    description:
      'Expanding seamlessly across theatrical feature films, sports leagues, live award shows, and experiential corporate brand activations.',
  },
];

const MILESTONES = [
  {
    year: '2013–2014',
    title: 'Foundation & Registration',
    description:
      'Established in 2013 and registered in 2014 at Biratnagar, Nepal to elevate live entertainment, cinema production, and regional event craft.',
  },
  {
    year: 'Seasons 1–8',
    title: 'Miss Koshi, Mrs. Koshi & Little Koshi',
    description:
      'Built Koshi Province’s longest-running pageant and youth confidence franchises across Biratnagar, Itahari, and Dharan.',
  },
  {
    year: 'Cinema & Sports',
    title: 'Feature Films & Cricket League',
    description:
      'Produced feature movies The Karma and Tantra, Women’s T20 Cricket League, JMM Runway Fashion Show, and upcoming bilingual film MEOW.',
  },
  {
    year: '2025 Onward',
    title: 'Nepal Kids Idol',
    description:
      'Launched a 30-episode national television singing championship reaching all 77 districts of Nepal alongside India, USA, Canada, and Australia.',
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-paper text-ink">
      <PageHero
        eyebrow="About Jay Media Management"
        title={
          <>
            Orchestrating moments since{' '}
            <span className="serif italic text-accent">2013.</span>
          </>
        }
        description="Registered in Biratnagar, Nepal — uniting cinema production, award shows, national television talent competitions, and corporate brand experiences."
        image="https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1800&q=85"
        imageAlt="Live arena audience and event stage production by Jay Media Management"
        meta={[
          { label: 'Established', value: '2013 (Reg. 2014)' },
          { label: 'Headquarters', value: 'Central Mall, Biratnagar' },
          { label: 'Leadership', value: 'Jay Raj Roy & Neesha Khatiwada' },
          { label: 'Phone', value: '9851143338 | 9802708000' },
        ]}
      />

      {/* Story & Heritage */}
      <section className="py-20 md:py-28">
        <div className="container-ed grid items-start gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <span className="eyebrow flex items-center gap-2.5 text-accent">
              <span className="h-px w-6 bg-accent" aria-hidden="true" />
              01 / Company Chronicle
            </span>
            <h2 className="display mt-4 text-3xl font-bold text-ink sm:text-4xl">
              Rooted in Biratnagar. Respected nationwide.
            </h2>

            <div className="mt-7 rounded-[10px] border border-line border-l-4 border-l-forest bg-sand/70 p-6">
              <p className="text-sm italic leading-relaxed text-ink-soft">
                &ldquo;From day one, our purpose has been straightforward:
                deliver stagecraft, television broadcasting, and artistic talent
                platforms in Biratnagar that inspire an entire generation.&rdquo;
              </p>
              <span className="mt-3 block font-mono text-[10px] font-bold uppercase tracking-widest text-forest">
                — Jay Raj Roy, Chairman
              </span>
            </div>
          </div>

          <div className="space-y-6 text-base leading-relaxed text-ink-soft lg:col-span-7">
            <p>
              <strong className="font-bold text-ink">
                Jay Media Management Pvt. Ltd.
              </strong>{' '}
              was established in <strong className="text-ink">2013</strong> and
              formally registered in <strong className="text-ink">2014</strong>,
              operating from its head office on the{' '}
              <strong className="text-ink">
                1st Floor of Central Mall, Biratnagar, Koshi Province, Nepal
              </strong>
              .
            </p>
            <p>
              Under the guidance of Chairman <strong className="text-ink">Jay Raj Roy</strong>{' '}
              and CEO <strong className="text-ink">Neesha Khatiwada</strong>,
              the organization has continuously upgraded its capabilities across
              four pillars: Movie Production, Event Execution, Award Shows, and
              Turnkey Event Management.
            </p>
            <p>
              Our portfolio includes feature cinema (<em>The Karma</em>,{' '}
              <em>Tantra</em>, and the upcoming bilingual movie <em>MEOW</em>),
              sports franchise execution (<em>Women&apos;s T20 Cricket League</em>
              ), iconic regional pageants (<em>Miss Koshi Seasons 1–8</em>,{' '}
              <em>Mrs. Koshi</em>, <em>Mr. &amp; Miss Purwanchal</em>,{' '}
              <em>Mr. &amp; Miss Little Koshi</em>, <em>Mr. &amp; Miss SEE</em>,
              and <em>JMM Runway Fashion Show</em>), and our flagship televised
              competition <em>Nepal Kids Idol</em>.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="border-y border-line bg-sand py-16 md:py-24">
        <div className="container-ed grid gap-8 md:grid-cols-2">
          <div className="rounded-[6px] border border-line bg-white p-8 shadow-2xs sm:p-10">
            <span className="inline-flex h-11 w-11 items-center justify-center rounded-[4px] border border-forest/20 bg-forest-soft text-forest">
              <Compass className="h-5 w-5" />
            </span>
            <h3 className="display mt-5 text-2xl font-bold text-ink">
              Our Mission
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-muted sm:text-base">
              To engineer unforgettable live events, films, and televised
              talent competitions that uplift emerging Nepali talent, elevate
              brands, and uphold ethical production excellence.
            </p>
          </div>

          <div className="rounded-[6px] border border-line bg-white p-8 shadow-2xs sm:p-10">
            <span className="inline-flex h-11 w-11 items-center justify-center rounded-[4px] border border-forest/20 bg-forest-soft text-forest">
              <Eye className="h-5 w-5" />
            </span>
            <h3 className="display mt-5 text-2xl font-bold text-ink">
              Our Vision
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-muted sm:text-base">
              To remain Eastern Nepal&apos;s trusted creative powerhouse and set
              national benchmarks in youth talent discovery, cinema storytelling,
              and corporate brand activation.
            </p>
          </div>
        </div>
      </section>

      {/* Guiding Values */}
      <section className="py-20 md:py-28">
        <div className="container-ed">
          <SectionHeading
            eyebrow="02 / Guiding Principles"
            title={
              <>
                Built on values that{' '}
                <span className="serif italic text-accent">endure.</span>
              </>
            }
          />

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {VALUES.map((val) => {
              const Icon = val.icon;
              return (
                <div
                  key={val.title}
                  className="rounded-[10px] border border-line bg-white p-7 shadow-xs transition-all hover:border-forest"
                >
                  <Icon className="h-7 w-7 text-forest" />
                  <h4 className="display mt-5 text-xl font-bold text-ink">
                    {val.title}
                  </h4>
                  <p className="mt-2.5 text-sm leading-relaxed text-muted">
                    {val.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Milestones */}
      <section className="border-y border-line bg-white py-20 md:py-28">
        <div className="container-ed">
          <SectionHeading
            eyebrow="03 / Chronicle"
            title={
              <>
                Our decade of{' '}
                <span className="serif italic text-accent">milestones.</span>
              </>
            }
          />

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {MILESTONES.map((item) => (
              <div
                key={item.year}
                className="rounded-[10px] border border-line border-t-4 border-t-forest bg-paper p-6"
              >
                <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-forest">
                  {item.year}
                </span>
                <h4 className="display mt-2 text-xl font-bold text-ink">
                  {item.title}
                </h4>
                <p className="mt-2.5 text-sm leading-relaxed text-muted">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership Teaser */}
      <section className="bg-sand py-20 md:py-24">
        <div className="container-ed">
          <SectionHeading
            eyebrow="04 / Leadership"
            title={
              <>
                Meet the{' '}
                <span className="serif italic text-accent">team.</span>
              </>
            }
            link={{ href: '/team', label: 'View full profiles' }}
          />

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {TEAM_PROFILES.map((member) => (
              <Link
                key={member.slug}
                href={`/team/${member.slug}`}
                className="group overflow-hidden rounded-[10px] border border-line bg-white shadow-xs transition-all hover:border-forest"
              >
                <div className="relative aspect-[4/4.2] w-full overflow-hidden bg-paper">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    sizes="(max-width: 640px) 100vw, 25vw"
                    className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-5 text-center">
                  <h3 className="display text-lg font-bold text-forest">
                    {member.name}
                  </h3>
                  <p className="mt-1 font-mono text-[10px] uppercase tracking-wider text-muted">
                    {member.role}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CtaBand />
    </div>
  );
}
