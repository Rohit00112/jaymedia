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
    <div className="bg-black text-white min-h-screen font-rubik">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      {/* ─── Hero ─────────────────────────────────────────────── */}
      <section className="relative bg-black text-white pt-40 pb-20 sm:pt-48 sm:pb-28 px-6 sm:px-10 lg:px-16 overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-[#0c0c11] to-black opacity-90" />
        <div className="absolute top-1/2 -right-20 w-80 h-80 bg-coral/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto">
          <Link
            href="/news"
            className="inline-flex items-center gap-2 text-xs uppercase font-rubik tracking-wider text-[#eef9ff]/70 hover:text-white transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" /> Back to News &amp; Releases
          </Link>

          <div className="flex flex-wrap items-center gap-4 text-xs font-rubik text-[#eef9ff]/70 mb-6">
            <span className="px-3.5 py-1 bg-[#01402b]/80 border border-[#01402b] text-[#eef9ff] font-medium uppercase font-rubik rounded-[50px]">
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

          <h1 className="editorial-headline text-white text-3xl sm:text-5xl lg:text-6xl leading-[1.05] mb-6 font-rubik">
            {article.title}
          </h1>

          <p className="text-[#eef9ff]/80 text-lg sm:text-xl font-rubik leading-relaxed">
            {article.excerpt}
          </p>
        </div>
      </section>

      {/* ─── Article Body ────────────────────────────────────── */}
      <section className="py-20 lg:py-28 px-6 sm:px-10 lg:px-16 border-b border-white/10 bg-[#0c0c11]">
        <div className="max-w-3xl mx-auto">
          <div className="space-y-6 text-base sm:text-lg font-rubik text-[#eef9ff]/85 leading-relaxed">
            {article.content.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>

          {/* Tags */}
          <div className="mt-12 pt-8 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2 flex-wrap">
              <Tag className="w-4 h-4 text-coral" />
              {article.tags.map((t, idx) => (
                <span
                  key={idx}
                  className="text-xs font-rubik px-3 py-1 bg-white/5 border border-white/10 text-[#eef9ff] rounded-[2px]"
                >
                  #{t}
                </span>
              ))}
            </div>

            <span className="text-xs font-rubik uppercase tracking-wider text-[#eef9ff]/50">
              Published from Biratnagar, Nepal
            </span>
          </div>
        </div>
      </section>

      {/* ─── Related Articles ────────────────────────────────── */}
      <section className="py-20 lg:py-28 px-6 sm:px-10 lg:px-16 bg-black">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-12">
            <h3 className="editorial-headline text-white text-2xl sm:text-3xl font-rubik">
              Other Recent Dispatches
            </h3>
            <Link
              href="/news"
              className="text-xs uppercase font-rubik tracking-wider text-coral font-semibold hover:underline"
            >
              View All &rarr;
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {otherArticles.slice(0, 2).map((other) => (
              <div
                key={other.slug}
                className="bg-[#0c0c11] border border-white/10 p-6 rounded-[10px] flex flex-col justify-between shadow-xl hover:border-coral/40 transition-all"
              >
                <div>
                  <span className="text-xs font-rubik text-coral font-medium uppercase mb-2 block">
                    {other.category}
                  </span>
                  <h4 className="font-rubik text-xl font-bold text-white mb-2">
                    {other.title}
                  </h4>
                  <p className="text-[#eef9ff]/75 text-sm font-rubik line-clamp-2">
                    {other.excerpt}
                  </p>
                </div>
                <Link
                  href={`/news/${other.slug}`}
                  className="mt-4 text-xs uppercase font-rubik tracking-wider text-coral hover:text-white font-semibold flex items-center gap-1 transition-colors"
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

