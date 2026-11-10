import { Metadata } from 'next';
import { notFound, redirect } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import PageHero from '@/components/shared/PageHero';
import CtaBand from '@/components/shared/CtaBand';
import Reveal from '@/components/motion/Reveal';
import { TEAM_PROFILES } from '@/config/team-data';
import { getTeamMemberRepo } from '@/lib/backend/repository';
import { generatePageMetadata, generateBreadcrumbSchema } from '@/lib/seo';

interface Props {
  params: Promise<{ slug: string }>;
}

export const instant = false;

export async function generateStaticParams() {
  return TEAM_PROFILES.map((person) => ({
    slug: person.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const person =
    (await getTeamMemberRepo(slug)) ||
    TEAM_PROFILES.find((p) => p.slug === slug);
  if (!person) return {};

  return generatePageMetadata({
    title: `${person.name} — ${person.role} | Jay Media Management`,
    description: person.fullBio,
  });
}

export default async function TeamProfileDetailPage({ params }: Props) {
  const { slug } = await params;
  if (slug === 'jay-raj-roy') {
    redirect('/team/jayrajroy');
  }

  const person =
    (await getTeamMemberRepo(slug)) ||
    TEAM_PROFILES.find((p) => p.slug === slug);

  if (!person) {
    notFound();
  }

  const breadcrumbJsonLd = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Team', url: '/team' },
    { name: person.name, url: `/team/${person.slug}` },
  ]);

  return (
    <div className="min-h-screen bg-paper text-ink">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
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
            <Reveal className="lg:col-span-4">
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
            </Reveal>

            {/* Bio & Credits */}
            <Reveal delay={0.08} className="lg:col-span-8">
              <div className="rounded-xl border border-line bg-white p-6 sm:p-8">
                <span className="text-xs font-semibold uppercase tracking-wider text-forest">
                  Profile
                </span>
                <h2 className="mt-1.5 text-2xl font-semibold text-ink">
                  Leadership &amp; Creative Portfolio
                </h2>

                <p className="mt-4 text-sm leading-relaxed text-muted sm:text-base">
                  {person.fullBio}
                </p>

                <div className="mt-8 border-t border-line pt-6">
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-ink">
                    Notable Credits &amp; Responsibilities
                  </h3>
                  <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                    {person.credits.map((credit) => (
                      <li
                        key={credit}
                        className="rounded-lg border border-line bg-paper-deep/60 px-3.5 py-2.5 text-sm text-ink-soft transition-colors hover:border-line-strong"
                      >
                        {credit}
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
            </Reveal>
          </div>
        </div>
      </section>

      <CtaBand />
    </div>
  );
}
