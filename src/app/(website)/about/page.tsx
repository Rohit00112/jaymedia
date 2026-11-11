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
import Reveal from '@/components/motion/Reveal';
import AnimeStaggerContainer from '@/components/motion/AnimeStaggerContainer';
import { TEAM_PROFILES } from '@/config/team-data';
import { generatePageMetadata, generateBreadcrumbSchema } from '@/lib/seo';

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
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'About', url: '/about' },
  ]);

  return (
    <div className="min-h-screen bg-paper text-ink">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <PageHero
        eyebrow="About Jay Media Management"
        title="Orchestrating live events, television, and cinema since 2013."
        description="Registered in Biratnagar, Nepal — uniting cinema production, award shows, national television talent competitions, and corporate brand experiences."
        meta={[
          { label: 'Established', value: '2013 (Reg. 2014)' },
          { label: 'Headquarters', value: 'Central Mall, Biratnagar' },
          { label: 'Leadership', value: 'Jay Raj Roy & Neesha Khatiwada' },
          { label: 'Phone', value: '+977 9851143338 / +977 9802708000' },
        ]}
      />

      {/* Story & Heritage */}
      <section className="border-b border-line py-16 md:py-20">
        <div className="container-ed grid items-start gap-10 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <p className="text-xs font-semibold uppercase tracking-wider text-forest">
              Our Story
            </p>
            <h2 className="mt-2 text-2xl font-semibold text-ink sm:text-3xl">
              Rooted in Biratnagar. Respected nationwide.
            </h2>

            <blockquote className="mt-6 rounded-xl border border-line bg-paper-deep p-5">
              <p className="text-sm leading-relaxed text-ink-soft">
                &ldquo;From day one, our purpose has been straightforward:
                deliver stagecraft, television broadcasting, and artistic talent
                platforms in Biratnagar that inspire an entire generation.&rdquo;
              </p>
              <footer className="mt-3 text-xs font-medium text-forest">
                &mdash; Jay Raj Roy, Chairman
              </footer>
            </blockquote>
          </Reveal>

          <Reveal
            delay={0.08}
            className="space-y-4 text-sm leading-relaxed text-muted sm:text-base lg:col-span-7"
          >
            <p>
              <strong className="font-semibold text-ink">
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
              Under the guidance of Chairman{' '}
              <strong className="text-ink">Jay Raj Roy</strong> and CEO{' '}
              <strong className="text-ink">Neesha Khatiwada</strong>, the
              organization has continuously upgraded its capabilities across
              four pillars: Movie Production, Event Execution, Award Shows, and
              Turnkey Event Management.
            </p>
            <p>
              Our portfolio includes feature cinema (<em>The Karma</em>,{' '}
              <em>Tantra</em>, and the upcoming bilingual movie <em>MEOW</em>),
              sports franchise execution (
              <em>Women&apos;s T20 Cricket League</em>), iconic regional
              pageants (<em>Miss Koshi Seasons 1–8</em>, <em>Mrs. Koshi</em>,{' '}
              <em>Mr. &amp; Miss Purwanchal</em>,{' '}
              <em>Mr. &amp; Miss Little Koshi</em>, <em>Mr. &amp; Miss SEE</em>,
              and <em>JMM Runway Fashion Show</em>), and our flagship televised
              competition <em>Nepal Kids Idol</em>.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="border-b border-line bg-paper-deep/50 py-16 md:py-20">
        <AnimeStaggerContainer className="container-ed grid gap-6 md:grid-cols-2">
          <div className="card-hover rounded-xl border border-line bg-white p-6 sm:p-8">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-forest-soft text-forest">
              <Compass className="h-5 w-5" />
            </span>
            <h3 className="mt-4 text-xl font-semibold text-ink">Our Mission</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              To engineer unforgettable live events, films, and televised talent
              competitions that uplift emerging Nepali talent, elevate brands,
              and uphold ethical production excellence.
            </p>
          </div>

          <div className="card-hover rounded-xl border border-line bg-white p-6 sm:p-8">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-forest-soft text-forest">
              <Eye className="h-5 w-5" />
            </span>
            <h3 className="mt-4 text-xl font-semibold text-ink">Our Vision</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              To remain Eastern Nepal&apos;s trusted creative powerhouse and set
              national benchmarks in youth talent discovery, cinema
              storytelling, and corporate brand activation.
            </p>
          </div>
        </AnimeStaggerContainer>
      </section>

      {/* Guiding Values */}
      <section className="border-b border-line py-16 md:py-20">
        <div className="container-ed">
          <SectionHeading
            eyebrow="Guiding Principles"
            title="Built on values that endure."
          />

          <AnimeStaggerContainer className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {VALUES.map((val) => {
              const Icon = val.icon;
              return (
                <div
                  key={val.title}
                  className="card-hover rounded-xl border border-line bg-white p-6"
                >
                  <Icon className="h-5 w-5 text-forest" />
                  <h4 className="mt-4 text-base font-semibold text-ink">
                    {val.title}
                  </h4>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    {val.description}
                  </p>
                </div>
              );
            })}
          </AnimeStaggerContainer>
        </div>
      </section>

      {/* Milestones */}
      <section className="border-b border-line bg-paper-deep/50 py-16 md:py-20">
        <div className="container-ed">
          <SectionHeading
            eyebrow="Chronicle"
            title="Over a decade of milestones."
          />

          <AnimeStaggerContainer className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {MILESTONES.map((item) => (
              <div
                key={item.year}
                className="card-hover rounded-xl border border-line bg-white p-6"
              >
                <span className="text-xs font-semibold text-forest">
                  {item.year}
                </span>
                <h4 className="mt-1.5 text-base font-semibold text-ink">
                  {item.title}
                </h4>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {item.description}
                </p>
              </div>
            ))}
          </AnimeStaggerContainer>
        </div>
      </section>

      {/* Leadership Teaser */}
      <section className="py-16 md:py-20">
        <div className="container-ed">
          <SectionHeading
            eyebrow="Leadership"
            title="Meet the team."
            link={{ href: '/team', label: 'View full profiles' }}
          />

          <AnimeStaggerContainer className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {TEAM_PROFILES.map((member) => (
              <Link
                key={member.slug}
                href={`/team/${member.slug}`}
                className="card-hover group flex flex-col gap-5 overflow-hidden rounded-xl border border-line bg-white p-5 sm:flex-row sm:items-center"
              >
                <div className="relative aspect-[4/4.2] w-full shrink-0 overflow-hidden rounded-lg bg-sand sm:w-40">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    sizes="(max-width: 640px) 100vw, 160px"
                    className="img-zoom object-cover object-top"
                  />
                </div>
                <div>
                  <span className="text-xs font-medium text-forest">
                    {member.role}
                  </span>
                  <h3 className="mt-1 text-xl font-semibold text-ink transition-colors group-hover:text-forest">
                    {member.name}
                  </h3>
                  <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted">
                    {member.shortBio}
                  </p>
                </div>
              </Link>
            ))}
          </AnimeStaggerContainer>
        </div>
      </section>

      <CtaBand />
    </div>
  );
}
