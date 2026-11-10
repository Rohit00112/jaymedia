import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import PageHero from '@/components/shared/PageHero';
import SectionHeading from '@/components/shared/SectionHeading';
import CtaBand from '@/components/shared/CtaBand';
import Reveal from '@/components/motion/Reveal';
import { NEWS_DATA } from '@/config/news-data';
import { generatePageMetadata, generateArticleSchema } from '@/lib/seo';
import { formatDate } from '@/lib/utils';
import { siteConfig } from '@/config/site';

interface Props {
  params: Promise<{ slug: string }>;
}

export const instant = false;

export async function generateStaticParams() {
  return NEWS_DATA.map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = NEWS_DATA.find((a) => a.slug === slug);
  if (!article) return {};

  return generatePageMetadata({
    title: `${article.title} | News | Jay Media Management`,
    description: article.excerpt,
    type: 'article',
    publishedTime: article.date,
  });
}

export default async function NewsDetailPage({ params }: Props) {
  const { slug } = await params;
  const article = NEWS_DATA.find((a) => a.slug === slug);

  if (!article) {
    notFound();
  }

  const articleSchema = generateArticleSchema({
    title: article.title,
    description: article.excerpt,
    author: article.author,
    publishedAt: article.date,
    url: `${siteConfig.url}/news/${article.slug}`,
  });

  const otherArticles = NEWS_DATA.filter((a) => a.slug !== article.slug);

  return (
    <div className="min-h-screen bg-paper text-ink">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      <PageHero
        breadcrumb={{ label: 'All news', href: '/news' }}
        eyebrow={article.category}
        title={article.title}
        description={article.excerpt}
        image={article.image}
        imageAlt={article.title}
        compact
        meta={[
          { label: 'Published', value: formatDate(article.date) },
          { label: 'Reading time', value: article.readTime },
          { label: 'Author', value: article.author },
          { label: 'Desk', value: 'Biratnagar, Nepal' },
        ]}
      />

      <section className="py-20 md:py-28">
        <div className="container-ed grid gap-12 lg:grid-cols-12 lg:gap-10">
          <aside className="lg:col-span-3">
            <div className="lg:sticky lg:top-28">
              <span className="eyebrow flex items-center gap-2.5 text-accent">
                <span className="h-px w-6 bg-accent" aria-hidden="true" />
                The dispatch
              </span>

              <dl className="mt-6 border-t border-line">
                <div className="flex items-baseline justify-between gap-4 border-b border-line py-3.5">
                  <dt className="eyebrow text-faint">Written by</dt>
                  <dd className="text-right text-xs leading-snug text-ink-soft">
                    {article.author}
                  </dd>
                </div>
                <div className="flex items-baseline justify-between gap-4 border-b border-line py-3.5">
                  <dt className="eyebrow text-faint">Published</dt>
                  <dd className="text-right text-xs text-ink-soft">
                    <time dateTime={article.date}>
                      {formatDate(article.date)}
                    </time>
                  </dd>
                </div>
                <div className="flex items-baseline justify-between gap-4 border-b border-line py-3.5">
                  <dt className="eyebrow text-faint">Reading</dt>
                  <dd className="text-right text-xs text-ink-soft">
                    {article.readTime}
                  </dd>
                </div>
                <div className="flex items-baseline justify-between gap-4 py-3.5">
                  <dt className="eyebrow text-faint">Filed from</dt>
                  <dd className="text-right text-xs text-ink-soft">Biratnagar</dd>
                </div>
              </dl>

              <div className="mt-6 flex flex-wrap gap-2">
                {article.tags.map((tag) => (
                  <span key={tag} className="tag">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </aside>

          <div className="lg:col-span-7 lg:col-start-6">
            <Reveal>
              <div className="space-y-6 text-pretty text-base leading-[1.85] text-ink-soft md:text-[1.075rem]">
                {article.content.map((paragraph, index) => (
                  <p
                    key={index}
                    className={
                      index === 0
                        ? 'first-letter:float-left first-letter:mr-3 first-letter:mt-1.5 first-letter:font-serif first-letter:text-[5rem] first-letter:italic first-letter:leading-[0.6] first-letter:text-accent md:first-letter:text-[5.75rem]'
                        : undefined
                    }
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </Reveal>

            <Reveal delay={70}>
              <div className="mt-12 flex flex-col justify-between gap-6 border-t border-line pt-6 sm:flex-row sm:items-center">
                <p className="max-w-md text-xs leading-relaxed text-faint">
                  Official communication from Jay Media Management Pvt. Ltd.,
                  Biratnagar, Nepal.
                </p>
                <Link href="/news" className="text-link text-ink">
                  Back to the newsroom
                  <ArrowUpRight className="h-3.5 w-3.5 text-accent" />
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="border-y border-line bg-paper-deep py-20 md:py-28">
        <div className="container-ed">
          <SectionHeading
            eyebrow="03 / Continue reading"
            title={
              <>
                More from the{' '}
                <span className="serif italic text-accent">desk.</span>
              </>
            }
            link={{ href: '/news', label: 'All dispatches' }}
          />

          <div className="grid gap-8 md:grid-cols-2 md:gap-10">
            {otherArticles.slice(0, 2).map((other, index) => (
              <Reveal key={other.slug} delay={index * 70}>
                <article className="group">
                  <Link
                    href={`/news/${other.slug}`}
                    className="relative block aspect-[16/9] overflow-hidden rounded-[0.4rem] border border-line bg-sand"
                  >
                    <Image
                      src={other.image}
                      alt={other.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="img-zoom object-cover"
                    />
                    <span className="eyebrow absolute left-4 top-4 rounded-[0.2rem] bg-cream px-2.5 py-1.5 text-[7px] text-accent">
                      {other.category}
                    </span>
                  </Link>

                  <div className="mt-4 border-t border-line pt-4">
                    <div className="flex items-center justify-between gap-4">
                      <span className="eyebrow text-faint">
                        {formatDate(other.date)}
                      </span>
                      <span className="eyebrow text-faint">{other.readTime}</span>
                    </div>
                    <h3 className="display mt-3 text-balance text-2xl text-ink transition-colors duration-300 group-hover:text-accent md:text-3xl">
                      <Link href={`/news/${other.slug}`}>{other.title}</Link>
                    </h3>
                    <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-muted">
                      {other.excerpt}
                    </p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaBand />
    </div>
  );
}
