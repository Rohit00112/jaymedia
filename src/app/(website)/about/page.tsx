import { Metadata } from 'next';
import Image from 'next/image';
import PageHero from '@/components/shared/PageHero';
import SectionHeading from '@/components/shared/SectionHeading';
import CtaBand from '@/components/shared/CtaBand';
import { generatePageMetadata } from '@/lib/seo';

export const metadata: Metadata = generatePageMetadata({
  title: 'About Us | Jay Media Management Pvt. Ltd.',
  description:
    'Discover the journey, leadership, and creative mission of Jay Media Management Pvt. Ltd. — Eastern Nepal’s premier event production agency based in Biratnagar.',
});

const VALUES = [
  {
    number: '01',
    title: 'Production excellence',
    description:
      'Every lighting cue, acoustic balance, and visual sequence is calibrated to international broadcast quality. We never settle for ordinary.',
  },
  {
    number: '02',
    title: 'Youth & cultural elevation',
    description:
      'Our pageants and youth platforms empower Eastern Nepal’s next generation with confidence, public speaking eloquence, and career visibility.',
  },
  {
    number: '03',
    title: 'Ethical integrity',
    description:
      'Transparent judging, professional contestant grooming, and unwavering commitments to our partners and brand sponsors.',
  },
  {
    number: '04',
    title: 'Continuous innovation',
    description:
      'Pioneering multicam live streaming, experiential brand architecture, and interactive entertainment across Biratnagar and beyond.',
  },
];

const MILESTONES = [
  {
    year: 'Foundation',
    title: 'A vision born in Biratnagar',
    description:
      'Founded by Jay Raj Rai to bridge regional Nepali talent and world-class live entertainment production.',
  },
  {
    year: 'Milestone',
    title: 'Little Koshi takes the stage',
    description:
      'Pioneered Eastern Nepal’s largest youth grooming and talent pageant across Biratnagar, Itahari, and Dharan.',
  },
  {
    year: 'Growth',
    title: 'Miss Koshi is inaugurated',
    description:
      'Elevated regional pageantry into an annual leadership platform for aspiring young women in Koshi Province.',
  },
  {
    year: 'Present',
    title: 'Full-spectrum production',
    description:
      'Expanded into turnkey corporate galas, product unveilings, and complete digital media production.',
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-surface text-paper">
      <PageHero
        eyebrow="About the studio"
        title={
          <>
            Orchestrating{' '}
            <span className="serif text-coral">extraordinary</span> moments.
          </>
        }
        description="From the heart of Biratnagar across Eastern Nepal, we blend stagecraft, storytelling, and rigorous production logistics to create cultural milestones."
        image="https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1800&q=85"
        imageAlt="Live stage lighting at a Jay Media production"
        meta={[
          { label: 'Based in', value: 'Biratnagar, Nepal' },
          { label: 'Founded by', value: 'Jay Raj Rai' },
          { label: 'Productions', value: '500+ live events' },
          { label: 'Reach', value: 'Koshi Province & beyond' },
        ]}
      />

      {/* Story */}
      <section className="border-b border-line bg-surface py-20 md:py-28 lg:py-32">
        <div className="container-ed grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <div className="flex items-center gap-4">
              <span className="h-px w-10 bg-coral" aria-hidden="true" />
              <span className="eyebrow text-coral">01 / Our story</span>
            </div>

            <div className="group relative mt-8 aspect-[4/5] overflow-hidden bg-surface-alt">
              <Image
                src="https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=1200&q=85"
                alt="Jay Media grand event production in Biratnagar"
                fill
                sizes="(max-width: 1024px) 100vw, 33vw"
                className="img-zoom object-cover opacity-85"
              />
              <div
                className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"
                aria-hidden="true"
              />
              <span className="eyebrow absolute bottom-4 left-4 text-paper/70">
                Biratnagar / Grand gala
              </span>
            </div>
          </div>

          <div className="lg:col-span-7 lg:col-start-6">
            <h2 className="display text-[clamp(2.4rem,5.4vw,5.4rem)]">
              Rooted in Biratnagar.
              <br />
              Respected{' '}
              <span className="serif text-coral">nationwide.</span>
            </h2>

            <div className="mt-8 space-y-5 text-base leading-relaxed text-muted md:text-lg">
              <p>
                <strong className="font-medium text-paper">
                  Jay Media Management Pvt. Ltd.
                </strong>{' '}
                is a registered entertainment and event production enterprise
                situated near Traffic Chowk, Main Road, Biratnagar, Koshi
                Province.
              </p>
              <p>
                Under the stewardship of Chairperson Jay Raj Rai and Chief
                Executive Officer Nisha Khatiwada Rai, the organization has
                evolved from a boutique event organizer into Eastern Nepal&apos;s
                most trusted production house for monumental youth pageants,
                commercial launches, and creative media broadcasting.
              </p>
              <p>
                Our signature franchises — the acclaimed{' '}
                <em className="text-paper">Miss Koshi</em> pageant, the
                multi-city <em className="text-paper">Mr. and Miss Little Koshi</em>{' '}
                talent search, and the{' '}
                <em className="text-paper">Nepal Kids Dancing Champion</em> —
                have discovered and mentored hundreds of young talents.
              </p>
            </div>

            <blockquote className="serif mt-10 border-l-2 border-coral pl-6 text-2xl leading-tight text-paper md:text-3xl">
              &ldquo;Our vision was clear from day one: deliver entertainment
              and stage experiences in Eastern Nepal that match the
              sophistication of major national arenas.&rdquo;
            </blockquote>
            <p className="eyebrow mt-4 text-coral">
              Jay Raj Rai / Chairperson
            </p>
          </div>
        </div>
      </section>

      {/* Mission & vision */}
      <section className="border-b border-line bg-surface-alt py-20 md:py-28 lg:py-32">
        <div className="container-ed">
          <SectionHeading
            eyebrow="02 / Direction"
            title={
              <>
                Why we do{' '}
                <span className="serif text-coral">what we do.</span>
              </>
            }
            description="Two commitments anchor every production we take on."
          />

          <div className="grid gap-12 md:grid-cols-2 md:gap-16">
            <div className="border-t border-line pt-8">
              <span className="display text-6xl text-outline md:text-8xl">01</span>
              <h3 className="display mt-6 text-3xl text-paper md:text-4xl">
                Our mission
              </h3>
              <p className="mt-5 max-w-md text-base leading-relaxed text-muted">
                To engineer immersive live experiences and media productions
                that elevate regional talent, empower brands, and set
                uncompromised standards for creative execution and transparency
                in Nepal&apos;s entertainment industry.
              </p>
            </div>

            <div className="border-t border-line pt-8">
              <span className="display text-6xl text-outline md:text-8xl">02</span>
              <h3 className="display mt-6 text-3xl text-paper md:text-4xl">
                Our vision
              </h3>
              <p className="mt-5 max-w-md text-base leading-relaxed text-muted">
                To be the internationally recognized benchmark for cinematic
                stagecraft, creative talent development, and brand storytelling
                originating from Nepal.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="border-b border-line bg-surface py-20 md:py-28 lg:py-32">
        <div className="container-ed">
          <SectionHeading
            eyebrow="03 / Principles"
            title={
              <>
                Built on values{' '}
                <span className="serif text-coral">that last.</span>
              </>
            }
            description="The standards our clients, contestants, and crews can expect every time."
          />

          <div className="border-t border-line">
            {VALUES.map((value) => (
              <div
                key={value.number}
                className="group grid gap-4 border-b border-line py-8 md:grid-cols-12 md:items-baseline md:gap-8"
              >
                <span className="eyebrow text-faint md:col-span-1">
                  {value.number}
                </span>
                <h3 className="display text-2xl text-paper transition-colors group-hover:text-coral md:col-span-4 md:text-3xl">
                  {value.title}
                </h3>
                <p className="max-w-xl text-sm leading-relaxed text-muted md:col-span-6 md:col-start-7 md:text-base">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="border-b border-line-dark bg-bone py-20 text-ink md:py-28 lg:py-32">
        <div className="container-ed">
          <SectionHeading
            tone="light"
            eyebrow="04 / Chronicle"
            title={
              <>
                The journey{' '}
                <span className="serif text-coral-deep">so far.</span>
              </>
            }
            description="A decade of building stages, platforms, and careers in Eastern Nepal."
          />

          <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
            {MILESTONES.map((item, index) => (
              <div
                key={item.year}
                className="border-t-2 border-ink/80 pt-5"
              >
                <span className="eyebrow flex items-center justify-between text-ink/65">
                  {item.year}
                  <span className="text-coral-deep">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </span>
                <h3 className="display mt-6 text-2xl leading-none">
                  {item.title}
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-ink/60">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaBand />
    </div>
  );
}
