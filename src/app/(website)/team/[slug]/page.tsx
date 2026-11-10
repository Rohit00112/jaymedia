import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import PageHero from '@/components/shared/PageHero';
import CtaBand from '@/components/shared/CtaBand';
import { TEAM_PROFILES, EVENT_JUDGES } from '@/config/team-data';
import { generatePageMetadata } from '@/lib/seo';

interface Props {
  params: Promise<{ slug: string }>;
}

const ALL_PEOPLE = [
  ...TEAM_PROFILES.map((m) => ({
    slug: m.slug,
    name: m.name,
    role: m.role,
    category: m.category,
    location: m.location,
    image: m.image,
    bio: m.fullBio,
    credits: m.credits,
  })),
  ...EVENT_JUDGES.map((j) => ({
    slug: j.slug,
    name: j.name,
    role: j.title,
    category: 'Event Judges' as const,
    location: 'Kathmandu & Biratnagar, Nepal',
    image: j.image,
    bio: j.bio,
    credits: j.highlights,
  })),
];

export async function generateStaticParams() {
  return ALL_PEOPLE.map((person) => ({
    slug: person.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const person = ALL_PEOPLE.find((p) => p.slug === slug);
  if (!person) return {};

  return generatePageMetadata({
    title: `${person.name} — ${person.role} | Jay Media Management`,
    description: person.bio,
  });
}

export default async function TeamProfileDetailPage({ params }: Props) {
  const { slug } = await params;
  const person = ALL_PEOPLE.find((p) => p.slug === slug);

  if (!person) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-paper text-ink">
      <PageHero
        breadcrumb={{ label: 'Meet the Team', href: '/team' }}
        eyebrow={person.category}
        title={person.name}
        description={`${person.role} • ${person.location}`}
        compact
      />

      <section className="py-16 md:py-24">
        <div className="container-ed">
          <div className="grid items-start gap-12 lg:grid-cols-12">
            {/* Sticky Portrait */}
            <div className="lg:col-span-4">
              <div className="overflow-hidden rounded-[12px] border border-line bg-white p-2.5 shadow-md lg:sticky lg:top-28">
                <div className="relative aspect-[4/4.4] w-full overflow-hidden rounded-[8px] bg-sand">
                  <Image
                    src={person.image}
                    alt={person.name}
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 33vw"
                    className="object-cover object-top"
                  />
                </div>
                <div className="p-4 text-center">
                  <h2 className="display text-2xl font-bold text-forest">
                    {person.name}
                  </h2>
                  <p className="mt-1 font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-muted">
                    Designation: {person.role}
                  </p>
                </div>
              </div>
            </div>

            {/* Bio & Credits */}
            <div className="space-y-8 lg:col-span-8">
              <div className="rounded-[12px] border border-line bg-white p-8 shadow-xs sm:p-10">
                <span className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-forest">
                  Verified Profile
                </span>
                <h2 className="display mt-2 text-3xl font-bold text-ink">
                  Leadership &amp; Creative Portfolio
                </h2>

                <p className="mt-6 text-base leading-relaxed text-ink-soft sm:text-lg">
                  {person.bio}
                </p>

                <div className="mt-8 border-t border-line pt-7">
                  <h3 className="font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-forest">
                    Notable Credits &amp; Responsibilities
                  </h3>
                  <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                    {person.credits.map((credit) => (
                      <li
                        key={credit}
                        className="flex items-start gap-2.5 rounded-[8px] border border-line bg-paper px-4 py-3 text-sm font-medium text-ink"
                      >
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-forest" />
                        <span>{credit}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-8 flex flex-wrap gap-4 border-t border-line pt-6">
                  <Link
                    href="/team"
                    className="btn btn-outline rounded-[3px]"
                  >
                    <ArrowLeft className="h-3.5 w-3.5" />
                    <span>All Team Members</span>
                  </Link>
                  <Link
                    href="/contact"
                    className="btn btn-accent rounded-[3px]"
                  >
                    <span>Connect With Studio</span>
                    <ArrowUpRight className="h-3.5 w-3.5 text-gold" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CtaBand />
    </div>
  );
}

