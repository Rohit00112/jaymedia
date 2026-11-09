import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowUpRight, Calendar, Clock } from 'lucide-react';
import { generatePageMetadata } from '@/lib/seo';
import { NEWS_DATA } from '@/config/news-data';
import { formatDate } from '@/lib/utils';

export const metadata: Metadata = generatePageMetadata({
  title: 'News & Press Releases | Jay Media Management',
  description:
    'Latest official announcements, pageant updates, and press releases from Jay Media Management Pvt. Ltd. in Biratnagar, Nepal.',
});

export default function NewsPage() {
  const featuredArticle = NEWS_DATA.find((a) => a.featured) || NEWS_DATA[0];
  const regularArticles = NEWS_DATA.filter((a) => a.slug !== featuredArticle.slug);

  return (
    <div className="bg-warm-ivory text-ink min-h-screen">
      {/* ─── Hero ─────────────────────────────────────────────── */}
      <section className="relative bg-ink text-white pt-40 pb-20 sm:pt-48 sm:pb-28 px-6 sm:px-10 lg:px-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-ink via-dark-surface to-ink opacity-90" />
        <div className="absolute top-1/2 -right-20 w-80 h-80 bg-coral/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto">
          <span className="section-label text-coral font-medium tracking-[0.25em] mb-4 block">
            OFFICIAL DISPATCHES
          </span>
          <h1 className="editorial-headline text-white text-5xl sm:text-6xl lg:text-8xl max-w-5xl leading-[0.95] mb-6">
            NEWS &amp; CHRONICLES.
          </h1>
          <p className="text-muted-grey text-lg sm:text-xl max-w-2xl font-body leading-relaxed">
            Stay informed with verified press releases, grand finale reports, and audition announcements from Jay
            Media Management.
          </p>
        </div>
      </section>

      {/* ─── Featured Article ─────────────────────────────────── */}
      <section className="py-16 lg:py-24 px-6 sm:px-10 lg:px-16 border-b border-divider">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white border border-ink/10 p-8 sm:p-12 lg:p-16 shadow-md">
            <span className="text-xs font-display uppercase tracking-widest text-coral font-semibold mb-4 block">
              ★ Spotlight Announcement
            </span>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              <div className="lg:col-span-8">
                <div className="flex flex-wrap items-center gap-4 text-xs font-body text-ink/60 mb-4">
                  <span className="px-2.5 py-1 bg-warm-ivory border border-ink/10 text-ink/80 font-medium">
                    {featuredArticle.category}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-coral" />
                    {formatDate(featuredArticle.date)}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-coral" />
                    {featuredArticle.readTime}
                  </span>
                </div>

                <h2 className="editorial-headline text-ink text-3xl sm:text-4xl lg:text-5xl leading-tight mb-4">
                  {featuredArticle.title}
                </h2>

                <p className="text-ink/80 font-body text-base sm:text-lg leading-relaxed mb-6">
                  {featuredArticle.excerpt}
                </p>

                <Link
                  href={`/news/${featuredArticle.slug}`}
                  className="inline-flex items-center gap-2 px-6 py-3.5 bg-ink text-white font-display text-xs uppercase tracking-widest hover:bg-coral transition-colors"
                >
                  <span>Read Full Press Release</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>

              <div className="lg:col-span-4 bg-dark-surface p-8 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-coral/10 rounded-full blur-2xl" />
                <span className="text-xs uppercase font-display tracking-widest text-coral block mb-2">
                  Official Record
                </span>
                <h3 className="font-display text-xl font-bold mb-3">Biratnagar Broadcast</h3>
                <p className="text-muted-grey text-xs sm:text-sm font-body mb-4">
                  Verified announcement published by Jay Media Management Communications Desk.
                </p>
                <div className="text-[11px] font-display text-white/50">
                  By {featuredArticle.author}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Regular Articles Grid ───────────────────────────── */}
      <section className="py-20 lg:py-28 px-6 sm:px-10 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <h3 className="editorial-headline text-ink text-3xl sm:text-4xl">
              Archived Reports &amp; Releases
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {regularArticles.map((article) => (
              <div
                key={article.slug}
                className="bg-white border border-ink/10 p-8 flex flex-col justify-between shadow-sm hover:shadow-lg transition-shadow"
              >
                <div>
                  <div className="flex items-center gap-3 text-xs font-body text-ink/60 mb-3">
                    <span className="px-2.5 py-0.5 bg-warm-ivory border border-ink/10 text-coral font-medium">
                      {article.category}
                    </span>
                    <span>{formatDate(article.date)}</span>
                  </div>

                  <h4 className="font-display text-2xl font-bold text-ink mb-3 leading-snug">
                    {article.title}
                  </h4>

                  <p className="text-ink/70 font-body text-sm leading-relaxed mb-6">
                    {article.excerpt}
                  </p>
                </div>

                <div className="pt-4 border-t border-ink/10 flex items-center justify-between">
                  <div className="flex flex-wrap gap-1.5">
                    {article.tags.slice(0, 2).map((t, idx) => (
                      <span key={idx} className="text-[11px] text-ink/50 font-body">
                        #{t}
                      </span>
                    ))}
                  </div>

                  <Link
                    href={`/news/${article.slug}`}
                    className="text-xs uppercase font-display tracking-widest text-ink hover:text-coral font-semibold flex items-center gap-1 transition-colors"
                  >
                    <span>Read Release</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

