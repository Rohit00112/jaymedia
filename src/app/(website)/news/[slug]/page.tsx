import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import PageHero from '@/components/shared/PageHero';
import CtaBand from '@/components/shared/CtaBand';
import { NEWS_DATA } from '@/config/news-data';
import { generatePageMetadata, generateArticleSchema } from '@/lib/seo';
import { formatDate } from '@/lib/utils';
import { siteConfig } from '@/config/site';

interface Props {
  params: Promise<{ slug: string }>;
}

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
    <div className="min-h-screen bg-surface text-paper">
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

      {/* Article body */}
      <section className="border-b border-line-dark bg-bone py-16 text-ink md:py-24">
        <div className="container-ed">
          <div className="mx-auto max-w-3xl">
            <div className="space-y-6 text-base leading-[1.85] text-ink/75 md:text-lg">
              {article.content.map((paragraph, index) => (
                <p
                  key={index}
                  className={
                    index === 0
                      ? 'first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:font-serif first-letter:text-6xl first-letter:leading-[0.72] first-letter:text-coral-deep md:first-letter:text-7xl'
                      : undefined
                  }
                >
                  {paragraph}
                </p>
              ))}
            </div>

            <div className="mt-12 flex flex-wrap items-center justify-between gap-5 border-t border-line-dark pt-6">
              <div className="flex flex-wrap items-center gap-3">
                {article.tags.map((tag) => (
                  <span
                    key={tag}
                    className="border border-ink/15 px-3 py-1 text-[9px] uppercase tracking-[0.14em] text-ink/60"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              <span className="eyebrow text-ink/60">
                Published from Biratnagar
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Related */}
      <section className="bg-surface py-16 md:py-24">
        <div className="container-ed">
          <div className="mb-10 flex items-end justify-between gap-6 border-b border-line pb-6">
            <h2 className="display text-3xl md:text-4xl">
              Other recent dispatches
            </h2>
            <Link href="/news" className="text-link text-paper">
              View all
              <ArrowUpRight className="h-3.5 w-3.5 text-coral" />
            </Link>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            {otherArticles.slice(0, 2).map((other) => (
              <article key={other.slug} className="group">
                <Link
                  href={`/news/${other.slug}`}
                  className="relative block aspect-[16/9] overflow-hidden bg-surface-alt"
                >
                  <Image
                    src={other.image}
                    alt={other.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="img-zoom object-cover opacity-75 transition-opacity duration-700 group-hover:opacity-95"
                  />
                  <div
                    className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"
                    aria-hidden="true"
                  />
                  <span className="eyebrow absolute left-4 top-4 text-[8px] text-coral">
                    {other.category}
                  </span>
                </Link>

                <div className="mt-4 border-t border-line pt-4">
                  <span className="eyebrow text-[8px] text-faint">
                    {formatDate(other.date)}
                  </span>
                  <h3 className="display mt-2 text-2xl transition-colors group-hover:text-coral md:text-3xl">
                    <Link href={`/news/${other.slug}`}>{other.title}</Link>
                  </h3>
                  <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-muted">
                    {other.excerpt}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <CtaBand />
    </div>
  );
}
