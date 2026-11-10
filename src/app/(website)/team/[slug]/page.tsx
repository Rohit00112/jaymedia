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
      />

      <section className="py-16 md:py-20">
        <div className="container-ed">
          <div className="grid items-start gap-10 lg:grid-cols-12">
            {/* Portrait */}
            <div className="lg:col-span-4">
              <div className="overflow-hidden rounded-xl border border-line bg-white p-3">
                <div className="relative aspect-[4/4.4] w-full overflow-hidden rounded-lg bg-sand">
                  <Image
                    src={person.image}
                    alt={person.name}
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 33vw"
                    className="object-cover object-top"
                  />
                </div>
                <div className="p-3 text-center">
                  <h2 className="text-lg font-semibold text-ink">
                    {person.name}
                  </h2>
                  <p className="mt-0.5 text-xs text-muted">{person.role}</p>
                </div>
              </div>
            </div>

            {/* Bio & Credits */}
            <div className="lg:col-span-8">
              <div className="rounded-xl border border-line bg-white p-6 sm:p-8">
                <span className="text-xs font-semibold uppercase tracking-wider text-forest">
                  Profile
                </span>
                <h2 className="mt-1.5 text-2xl font-semibold text-ink">
                  Leadership &amp; Creative Portfolio
                </h2>

                <p className="mt-4 text-sm leading-relaxed text-muted sm:text-base">
                  {person.bio}
                </p>

                <div className="mt-8 border-t border-line pt-6">
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-ink">
                    Notable Credits &amp; Responsibilities
                  </h3>
                  <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                    {person.credits.map((credit) => (
                      <li
                        key={credit}
                        className="flex items-start gap-2.5 rounded-lg border border-line bg-paper-deep/60 px-3.5 py-2.5 text-sm text-ink-soft"
                      >
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-forest" />
                        <span>{credit}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-8 flex flex-wrap gap-3 border-t border-line pt-6">
                  <Link href="/team" className="btn btn-outline">
                    <ArrowLeft className="h-3.5 w-3.5" />
                    <span>All Team Members</span>
                  </Link>
                  <Link href="/contact" className="btn btn-primary">
                    <span>Connect With Studio</span>
                    <ArrowUpRight className="h-3.5 w-3.5" />
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
