import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import PageHero from '@/components/shared/PageHero';
import CtaBand from '@/components/shared/CtaBand';
import Reveal from '@/components/motion/Reveal';
import { generatePageMetadata } from '@/lib/seo';
import { NEWS_DATA } from '@/config/news-data';
import { formatDate } from '@/lib/utils';

export const metadata: Metadata = generatePageMetadata({
  title: 'News & Press Releases | Jay Media Management',
  description:
    'Latest official announcements, pageant updates, and press releases from Jay Media Management Pvt. Ltd. in Biratnagar, Nepal.',
});

export default function NewsPage() {
  const featuredArticle =
    NEWS_DATA.find((article) => article.featured) || NEWS_DATA[0];
  const regularArticles = NEWS_DATA.filter(
    (article) => article.slug !== featuredArticle.slug
  );

  return (
    <div className="min-h-screen bg-paper text-ink">
      <PageHero
        eyebrow="Official dispatches"
        title={
          <>
            News &amp;{' '}
            <span className="serif italic text-accent">chronicles.</span>
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

      <section className="py-20 md:py-28">
        <div className="container-ed">
          <div className="mb-10 flex items-end justify-between gap-6 border-b border-line pb-4 md:mb-12">
            <span className="eyebrow flex items-center gap-2.5 text-accent">
              <span className="h-px w-6 bg-accent" aria-hidden="true" />
              01 / Spotlight
            </span>
            <span className="eyebrow text-faint">Latest dispatch</span>
          </div>

          <article className="grid gap-10 lg:grid-cols-12 lg:gap-12">
            <Reveal className="lg:col-span-7">
              <Link
                href={`/news/${featuredArticle.slug}`}
                className="group block"
              >
                <div className="relative aspect-[16/11] overflow-hidden rounded-[0.5rem] border border-line bg-sand">
                  <Image
                    src={featuredArticle.image}
                    alt={featuredArticle.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 58vw"
                    className="img-zoom object-cover"
                  />
                  <span className="eyebrow absolute left-4 top-4 rounded-[0.2rem] bg-cream px-3 py-1.5 text-[8px] text-accent">
                    Featured
                  </span>
                </div>
                <div className="mt-3 flex items-center justify-between gap-4">
                  <span className="eyebrow text-faint">
                    {featuredArticle.author}
                  </span>
                  <time
                    dateTime={featuredArticle.date}
                    className="font-mono text-[9px] uppercase tracking-[0.15em] text-faint"
                  >
                    {formatDate(featuredArticle.date)}
                  </time>
                </div>
              </Link>
            </Reveal>

            <div className="flex flex-col justify-center lg:col-span-5">
              <Reveal delay={70}>
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[9px] uppercase tracking-[0.16em]">
                  <span className="text-accent">{featuredArticle.category}</span>
                  <span className="text-faint" aria-hidden="true">
                    /
                  </span>
                  <span className="text-faint">{featuredArticle.readTime}</span>
                </div>

                <h2 className="display mt-4 text-balance text-[clamp(2rem,3.8vw,3.6rem)] text-ink">
                  {featuredArticle.title}
                </h2>

                <p className="mt-5 max-w-lg text-pretty text-sm leading-relaxed text-muted md:text-base">
                  {featuredArticle.excerpt}
                </p>

                <Link
                  href={`/news/${featuredArticle.slug}`}
                  className="btn btn-primary mt-7"
                >
                  Read the release
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </Link>
              </Reveal>
            </div>
          </article>
        </div>
      </section>

      <section className="border-y border-line bg-paper-deep py-20 md:py-28">
        <div className="container-ed">
          <div className="mb-8 flex items-end justify-between gap-6 border-b border-line pb-4 md:mb-10">
            <span className="eyebrow flex items-center gap-2.5 text-accent">
              <span className="h-px w-6 bg-accent" aria-hidden="true" />
              02 / Archive
            </span>
            <span className="eyebrow text-faint">
              {String(regularArticles.length).padStart(2, '0')} dispatches
            </span>
          </div>

          <div>
            {regularArticles.map((article, index) => (
              <Reveal key={article.slug}>
                <article className="group grid gap-4 border-b border-line py-7 last:border-b-0 md:grid-cols-12 md:items-start md:gap-8 md:py-9">
                  <div className="flex items-center gap-4 md:col-span-2 md:block">
                    <span className="mono block text-[10px] tracking-[0.16em] text-accent">
                      {String(index + 2).padStart(2, '0')}
                    </span>
                    <span className="eyebrow mt-0 text-[8px] text-faint md:mt-2 md:block">
                      {formatDate(article.date)}
                    </span>
                  </div>

                  <div className="md:col-span-7">
                    <span className="eyebrow text-[8px] text-accent">
                      {article.category}
                    </span>
                    <h3 className="display mt-2 text-balance text-2xl text-ink transition-colors duration-300 group-hover:text-accent md:text-3xl">
                      <Link href={`/news/${article.slug}`}>{article.title}</Link>
                    </h3>
                    <p className="mt-3 line-clamp-2 max-w-2xl text-sm leading-relaxed text-muted">
                      {article.excerpt}
                    </p>
                  </div>

                  <div className="flex items-center justify-between gap-4 md:col-span-3 md:flex-col md:items-end md:justify-between md:self-stretch">
                    <span className="eyebrow text-faint">
                      {article.readTime}
                    </span>
                    <Link
                      href={`/news/${article.slug}`}
                      aria-label={`Read ${article.title}`}
                      className="flex h-10 w-10 items-center justify-center rounded-full border border-line-strong text-ink transition-all duration-500 group-hover:border-accent group-hover:bg-accent group-hover:text-cream"
                    >
                      <ArrowUpRight className="h-4 w-4" />
                    </Link>
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
