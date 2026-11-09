import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Calendar, Clock, User, Tag } from 'lucide-react';
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
    <div className="bg-warm-ivory text-ink min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      {/* ─── Hero ─────────────────────────────────────────────── */}
      <section className="relative bg-ink text-white pt-40 pb-20 sm:pt-48 sm:pb-28 px-6 sm:px-10 lg:px-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-ink via-dark-surface to-ink opacity-90" />
        <div className="absolute top-1/2 -right-20 w-80 h-80 bg-coral/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto">
          <Link
            href="/news"
            className="inline-flex items-center gap-2 text-xs uppercase font-display tracking-widest text-muted-grey hover:text-coral transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" /> Back to News &amp; Releases
          </Link>

          <div className="flex flex-wrap items-center gap-4 text-xs font-body text-white/60 mb-6">
            <span className="px-2.5 py-1 bg-coral/20 border border-coral/40 text-coral font-medium uppercase font-display">
              {article.category}
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-coral" />
              {formatDate(article.date)}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-coral" />
              {article.readTime}
            </span>
            <span className="flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-coral" />
              {article.author}
            </span>
          </div>

          <h1 className="editorial-headline text-white text-3xl sm:text-5xl lg:text-6xl leading-[1.05] mb-6">
            {article.title}
          </h1>

          <p className="text-muted-grey text-lg sm:text-xl font-body leading-relaxed">
            {article.excerpt}
          </p>
        </div>
      </section>

      {/* ─── Article Body ────────────────────────────────────── */}
      <section className="py-20 lg:py-28 px-6 sm:px-10 lg:px-16 border-b border-divider">
        <div className="max-w-3xl mx-auto">
          <div className="space-y-6 text-base sm:text-lg font-body text-ink/85 leading-relaxed">
            {article.content.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>

          {/* Tags */}
          <div className="mt-12 pt-8 border-t border-ink/10 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2 flex-wrap">
              <Tag className="w-4 h-4 text-coral" />
              {article.tags.map((t, idx) => (
                <span
                  key={idx}
                  className="text-xs font-body px-3 py-1 bg-white border border-ink/10 text-ink/70"
                >
                  #{t}
                </span>
              ))}
            </div>

            <span className="text-xs font-display uppercase tracking-widest text-ink/50">
              Published from Biratnagar, Nepal
            </span>
          </div>
        </div>
      </section>

      {/* ─── Related Articles ────────────────────────────────── */}
      <section className="py-20 lg:py-28 px-6 sm:px-10 lg:px-16 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-12">
            <h3 className="editorial-headline text-ink text-2xl sm:text-3xl">
              Other Recent Dispatches
            </h3>
            <Link
              href="/news"
              className="text-xs uppercase font-display tracking-widest text-coral font-semibold hover:underline"
            >
              View All &rarr;
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {otherArticles.slice(0, 2).map((other) => (
              <div
                key={other.slug}
                className="bg-warm-ivory border border-ink/10 p-6 flex flex-col justify-between"
              >
                <div>
                  <span className="text-xs font-body text-coral font-medium uppercase font-display mb-2 block">
                    {other.category}
                  </span>
                  <h4 className="font-display text-xl font-bold text-ink mb-2">
                    {other.title}
                  </h4>
                  <p className="text-ink/70 text-sm font-body line-clamp-2">
                    {other.excerpt}
                  </p>
                </div>
                <Link
                  href={`/news/${other.slug}`}
                  className="mt-4 text-xs uppercase font-display tracking-widest text-ink hover:text-coral font-semibold flex items-center gap-1"
                >
                  Read &rarr;
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

