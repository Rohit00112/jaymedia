import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import PageHero from '@/components/shared/PageHero';
import CtaBand from '@/components/shared/CtaBand';
import Reveal from '@/components/motion/Reveal';
import AnimeStaggerContainer from '@/components/motion/AnimeStaggerContainer';
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
        eyebrow="News & Announcements"
        title="Official press releases & event updates."
        description="Verified concert announcements, grand finale reports, and audition updates from Jay Media Management."
        meta={[
          { label: 'Newsroom', value: 'Biratnagar Desk' },
          { label: 'Latest', value: formatDate(featuredArticle.date) },
          { label: 'Coverage', value: 'Concerts & Pageants' },
          { label: 'Inquiries', value: 'Press & Media' },
        ]}
      />

      <section className="py-16 md:py-20">
        <div className="container-ed space-y-12">
          {/* Featured Article */}
          <Reveal>
            <Link
              href={`/news/${featuredArticle.slug}`}
              className="card-hover group grid items-center overflow-hidden rounded-xl border border-line bg-white lg:grid-cols-12"
            >
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-sand lg:col-span-7">
                <Image
                  src={featuredArticle.image}
                  alt={featuredArticle.title}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 58vw"
                  className="img-zoom object-cover"
                />
              </div>

              <div className="flex flex-col justify-center p-6 sm:p-8 lg:col-span-5">
                <div className="flex items-center gap-2 text-xs text-muted">
                  <span className="font-medium text-forest">
                    {featuredArticle.category}
                  </span>
                  <span>&bull;</span>
                  <time dateTime={featuredArticle.date}>
                    {formatDate(featuredArticle.date)}
                  </time>
                </div>

                <h2 className="mt-2.5 text-2xl font-semibold leading-snug text-ink transition-colors group-hover:text-forest">
                  {featuredArticle.title}
                </h2>

                <p className="mt-3 text-sm leading-relaxed text-muted">
                  {featuredArticle.excerpt}
                </p>

                <div className="mt-6">
                  <span className="btn btn-primary">
                    <span>Read Article</span>
                    <ArrowUpRight className="h-4 w-4" />
                  </span>
                </div>
              </div>
            </Link>
          </Reveal>

          {/* Archive Grid */}
          <div>
            <Reveal>
              <h2 className="mb-6 text-lg font-semibold text-ink">
                Recent Updates
              </h2>
            </Reveal>
            <AnimeStaggerContainer className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {regularArticles.map((article) => (
                <Link
                  key={article.slug}
                  href={`/news/${article.slug}`}
                  className="card-hover group flex flex-col justify-between overflow-hidden rounded-xl border border-line bg-white"
                >
                  <div>
                    <div className="relative aspect-[16/10] overflow-hidden bg-sand">
                      <Image
                        src={article.image}
                        alt={article.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="img-zoom object-cover"
                      />
                    </div>

                    <div className="p-5">
                      <div className="flex items-center justify-between text-xs text-muted">
                        <span className="font-medium text-forest">
                          {article.category}
                        </span>
                        <time dateTime={article.date}>
                          {formatDate(article.date)}
                        </time>
                      </div>
                      <h3 className="mt-2 text-lg font-semibold leading-snug text-ink transition-colors group-hover:text-forest">
                        {article.title}
                      </h3>
                      <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted">
                        {article.excerpt}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between border-t border-line px-5 py-3.5 text-xs text-muted">
                    <span>{article.readTime}</span>
                    <span className="inline-flex items-center gap-1 font-medium text-forest">
                      Read
                      <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </span>
                  </div>
                </Link>
              ))}
            </AnimeStaggerContainer>
          </div>
        </div>
      </section>

      <CtaBand />
    </div>
  );
}
