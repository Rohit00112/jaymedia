import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import PageHero from '@/components/shared/PageHero';
import CtaBand from '@/components/shared/CtaBand';
import { generatePageMetadata } from '@/lib/seo';
import { NEWS_DATA } from '@/config/news-data';
import { formatDate } from '@/lib/utils';

export const metadata: Metadata = generatePageMetadata({
  title: 'News & Press Releases | Jay Media Management',
  description:
    'Latest official announcements, pageant updates, and press releases from Jay Media Management Pvt. Ltd. in Biratnagar, Nepal.',
});

export default function NewsPage() {
  const featuredArticle = NEWS_DATA.find((article) => article.featured) || NEWS_DATA[0];
  const regularArticles = NEWS_DATA.filter(
    (article) => article.slug !== featuredArticle.slug
  );

  return (
    <div className="min-h-screen bg-surface text-paper">
      <PageHero
        eyebrow="Official dispatches"
        title={
          <>
            News &amp;{' '}
            <span className="serif text-coral">chronicles.</span>
          </>
        }
        description="Verified press releases, grand finale reports, and audition announcements from Jay Media Management."
        image="https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=1800&q=85"
        imageAlt="Stage lights and live production atmosphere"
        compact
        meta={[
          { label: 'Newsroom', value: 'Biratnagar desk' },
          { label: 'Latest', value: formatDate(featuredArticle.date) },
          { label: 'Coverage', value: 'Pageants & productions' },
          { label: 'Contact', value: 'Press & media' },
        ]}
      />

      {/* Featured */}
      <section className="border-b border-line bg-surface py-16 md:py-24">
        <div className="container-ed">
          <div className="mb-8 flex items-center gap-4">
            <span className="h-px w-10 bg-coral" aria-hidden="true" />
            <span className="eyebrow text-coral">Spotlight dispatch</span>
          </div>

          <article className="group grid gap-8 lg:grid-cols-12 lg:gap-14">
            <Link
              href={`/news/${featuredArticle.slug}`}
              className="relative aspect-[16/11] overflow-hidden bg-surface-alt lg:col-span-7"
            >
              <Image
                src={featuredArticle.image}
                alt={featuredArticle.title}
                fill
                sizes="(max-width: 1024px) 100vw, 58vw"
                className="img-zoom object-cover opacity-80 transition-opacity duration-700 group-hover:opacity-100"
              />
              <div
                className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"
                aria-hidden="true"
              />
              <span className="eyebrow absolute left-5 top-5 bg-coral px-3 py-1.5 text-[8px] text-ink">
                Featured
              </span>
            </Link>

            <div className="flex flex-col justify-center lg:col-span-5">
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[9px] uppercase tracking-[0.18em] text-faint">
                <span className="text-coral">{featuredArticle.category}</span>
                <span aria-hidden="true">/</span>
                <span>{formatDate(featuredArticle.date)}</span>
                <span aria-hidden="true">/</span>
                <span>{featuredArticle.readTime}</span>
              </div>

              <h2 className="display mt-4 text-[clamp(2rem,4.2vw,4.2rem)]">
                {featuredArticle.title}
              </h2>

              <p className="mt-5 text-sm leading-relaxed text-muted md:text-base">
                {featuredArticle.excerpt}
              </p>

              <div className="mt-7 flex items-center gap-4">
                <Link
                  href={`/news/${featuredArticle.slug}`}
                  className="btn btn-primary"
                >
                  Read the release
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </Link>
                <span className="text-[10px] uppercase tracking-[0.16em] text-faint">
                  By {featuredArticle.author}
                </span>
              </div>
            </div>
          </article>
        </div>
      </section>

      {/* Archive */}
      <section className="bg-surface py-16 md:py-24">
        <div className="container-ed">
          <div className="mb-10 flex items-end justify-between gap-6 border-b border-line pb-6">
            <h2 className="display text-3xl md:text-4xl">Archive</h2>
            <span className="eyebrow text-faint">
              {String(regularArticles.length).padStart(2, '0')} dispatches
            </span>
          </div>

          <div>
            {regularArticles.map((article, index) => (
              <article
                key={article.slug}
                className="group grid gap-5 border-b border-line py-8 md:grid-cols-12 md:items-start md:gap-8"
              >
                <div className="flex items-center gap-4 md:col-span-2 md:block">
                  <span className="eyebrow block text-coral">
                    {String(index + 2).padStart(2, '0')}
                  </span>
                  <span className="eyebrow mt-0 text-[8px] text-faint md:mt-2 md:block">
                    {formatDate(article.date)}
                  </span>
                </div>

                <div className="md:col-span-8">
                  <span className="eyebrow text-[8px] text-coral">
                    {article.category}
                  </span>
                  <h3 className="display mt-2 text-2xl transition-colors group-hover:text-coral md:text-4xl">
                    <Link href={`/news/${article.slug}`}>{article.title}</Link>
                  </h3>
                  <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">
                    {article.excerpt}
                  </p>
                </div>

                <div className="flex items-center justify-between gap-4 md:col-span-2 md:flex-col md:items-end">
                  <span className="text-[10px] uppercase tracking-[0.16em] text-faint">
                    {article.readTime}
                  </span>
                  <Link
                    href={`/news/${article.slug}`}
                    aria-label={`Read ${article.title}`}
                    className="flex h-11 w-11 items-center justify-center border border-line text-paper transition-colors group-hover:border-coral group-hover:bg-coral group-hover:text-ink"
                  >
                    <ArrowUpRight className="h-4 w-4" />
                  </Link>
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
