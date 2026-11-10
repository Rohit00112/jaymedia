import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import PageHero from '@/components/shared/PageHero';
import SectionHeading from '@/components/shared/SectionHeading';
import CtaBand from '@/components/shared/CtaBand';
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
        meta={[
          { label: 'Published', value: formatDate(article.date) },
          { label: 'Reading time', value: article.readTime },
          { label: 'Author', value: article.author },
          { label: 'Location', value: 'Biratnagar, Nepal' },
        ]}
      />

      <section className="border-b border-line py-16 md:py-20">
        <div className="container-ed grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <div className="space-y-5 text-base leading-relaxed text-ink-soft">
              {article.content.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap gap-2">
              {article.tags.map((tag) => (
                <span key={tag} className="tag">
                  #{tag}
                </span>
              ))}
            </div>

            <div className="mt-10 border-t border-line pt-6">
              <Link href="/news" className="btn btn-outline">
                <ArrowLeft className="h-3.5 w-3.5" />
                <span>Back to News</span>
              </Link>
            </div>
          </div>

          <aside className="lg:col-span-4">
            <div className="rounded-xl border border-line bg-paper-deep/60 p-6">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-ink">
                Article Details
              </h3>
              <dl className="mt-4 divide-y divide-line text-sm">
                <div className="flex justify-between py-2.5">
                  <dt className="text-muted">Author</dt>
                  <dd className="font-medium text-ink">{article.author}</dd>
                </div>
                <div className="flex justify-between py-2.5">
                  <dt className="text-muted">Date</dt>
                  <dd className="font-medium text-ink">
                    {formatDate(article.date)}
                  </dd>
                </div>
                <div className="flex justify-between py-2.5">
                  <dt className="text-muted">Category</dt>
                  <dd className="font-medium text-forest">
                    {article.category}
                  </dd>
                </div>
              </dl>
            </div>
          </aside>
        </div>
      </section>

      <section className="bg-paper-deep/50 py-16 md:py-20">
        <div className="container-ed">
          <SectionHeading
            eyebrow="More News"
            title="Related announcements."
            link={{ href: '/news', label: 'View all news' }}
          />

          <div className="grid gap-6 md:grid-cols-2">
            {otherArticles.slice(0, 2).map((other) => (
              <Link
                key={other.slug}
                href={`/news/${other.slug}`}
                className="group flex flex-col justify-between overflow-hidden rounded-xl border border-line bg-white transition-colors hover:border-line-strong"
              >
                <div>
                  <div className="relative aspect-[16/9] overflow-hidden bg-sand">
                    <Image
                      src={other.image}
                      alt={other.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="img-zoom object-cover"
                    />
                  </div>
                  <div className="p-5">
                    <div className="flex items-center justify-between text-xs text-muted">
                      <span className="font-medium text-forest">
                        {other.category}
                      </span>
                      <span>{formatDate(other.date)}</span>
                    </div>
                    <h3 className="mt-2 text-lg font-semibold text-ink group-hover:text-forest">
                      {other.title}
                    </h3>
                    <p className="mt-1.5 line-clamp-2 text-sm text-muted">
                      {other.excerpt}
                    </p>
                  </div>
                </div>
                <div className="border-t border-line px-5 py-3.5 text-xs font-medium text-forest">
                  <span className="inline-flex items-center gap-1">
                    Read article
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </span>
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
