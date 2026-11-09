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
    <div className="bg-black text-white min-h-screen font-rubik">
      {/* ─── Hero ─────────────────────────────────────────────── */}
      <section className="relative bg-black text-white pt-40 pb-20 sm:pt-48 sm:pb-28 px-6 sm:px-10 lg:px-16 overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-[#0c0c11] to-black opacity-90" />
        <div className="absolute top-1/2 -right-20 w-80 h-80 bg-coral/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <span className="px-3.5 py-1 bg-[#01402b]/80 border border-[#01402b] text-[#eef9ff] text-xs font-rubik font-medium tracking-widest uppercase rounded-[50px]">
              Media Room
            </span>
            <span className="section-label text-coral font-medium tracking-[0.2em]">
              OFFICIAL DISPATCHES
            </span>
          </div>
          <h1 className="editorial-headline text-white text-5xl sm:text-6xl lg:text-8xl max-w-5xl leading-[0.95] mb-6 font-rubik">
            NEWS &amp; CHRONICLES.
          </h1>
          <p className="text-[#eef9ff]/80 text-lg sm:text-xl max-w-2xl font-rubik leading-relaxed">
            Stay informed with verified press releases, grand finale reports, and audition announcements from Jay
            Media Management.
          </p>
        </div>
      </section>

      {/* ─── Featured Article ─────────────────────────────────── */}
      <section className="py-16 lg:py-24 px-6 sm:px-10 lg:px-16 border-b border-white/10 bg-black">
        <div className="max-w-7xl mx-auto">
          <div className="bg-[#0c0c11] border border-white/10 p-8 sm:p-12 lg:p-16 rounded-[10px] shadow-2xl">
            <span className="text-xs font-rubik uppercase tracking-wider text-coral font-semibold mb-4 block">
              ★ Spotlight Announcement
            </span>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              <div className="lg:col-span-8">
                <div className="flex flex-wrap items-center gap-4 text-xs font-rubik text-[#eef9ff]/70 mb-4">
                  <span className="px-3 py-1 bg-[#01402b]/80 border border-[#01402b] text-[#eef9ff] font-medium rounded-[50px]">
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

                <h2 className="editorial-headline text-white text-3xl sm:text-4xl lg:text-5xl leading-tight mb-4 font-rubik">
                  {featuredArticle.title}
                </h2>

                <p className="text-[#eef9ff]/80 font-rubik text-base sm:text-lg leading-relaxed mb-6">
                  {featuredArticle.excerpt}
                </p>

                <Link
                  href={`/news/${featuredArticle.slug}`}
                  className="inline-flex items-center gap-2 px-6 py-3.5 bg-coral text-white font-rubik text-xs uppercase tracking-widest font-semibold rounded-[50px] hover:bg-coral-hover hover:scale-105 transition-all shadow-md"
                >
                  <span>Read Full Press Release</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>

              <div className="lg:col-span-4 bg-black border border-white/10 p-8 rounded-[10px] text-white relative overflow-hidden shadow-xl">
                <div className="absolute top-0 right-0 w-32 h-32 bg-coral/10 rounded-full blur-2xl" />
                <span className="text-xs uppercase font-rubik tracking-wider text-coral block mb-2 font-semibold">
                  Official Record
                </span>
                <h3 className="font-rubik text-xl font-bold mb-3 text-white">Biratnagar Broadcast</h3>
                <p className="text-[#eef9ff]/70 text-xs sm:text-sm font-rubik mb-4 leading-relaxed">
                  Verified announcement published by Jay Media Management Communications Desk.
                </p>
                <div className="text-[11px] font-rubik text-[#eef9ff]/50">
                  By {featuredArticle.author}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Regular Articles Grid ───────────────────────────── */}
      <section className="py-20 lg:py-28 px-6 sm:px-10 lg:px-16 bg-black">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <h3 className="editorial-headline text-white text-3xl sm:text-4xl font-rubik">
              Archived Reports &amp; Releases
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {regularArticles.map((article) => (
              <div
                key={article.slug}
                className="bg-[#0c0c11] border border-white/10 p-8 rounded-[10px] flex flex-col justify-between shadow-xl hover:border-coral/40 transition-all"
              >
                <div>
                  <div className="flex items-center gap-3 text-xs font-rubik text-[#eef9ff]/70 mb-3">
                    <span className="px-3 py-0.5 bg-[#01402b]/80 border border-[#01402b] text-[#eef9ff] font-medium rounded-[50px]">
                      {article.category}
                    </span>
                    <span>{formatDate(article.date)}</span>
                  </div>

                  <h4 className="font-rubik text-2xl font-bold text-white mb-3 leading-snug">
                    {article.title}
                  </h4>

                  <p className="text-[#eef9ff]/75 font-rubik text-sm leading-relaxed mb-6">
                    {article.excerpt}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                  <div className="flex flex-wrap gap-1.5">
                    {article.tags.slice(0, 2).map((t, idx) => (
                      <span key={idx} className="text-[11px] text-[#eef9ff]/50 font-rubik">
                        #{t}
                      </span>
                    ))}
                  </div>

                  <Link
                    href={`/news/${article.slug}`}
                    className="text-xs uppercase font-rubik tracking-wider text-coral hover:text-white font-semibold flex items-center gap-1 transition-colors"
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

