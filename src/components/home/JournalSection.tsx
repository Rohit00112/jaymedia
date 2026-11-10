import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import SectionHeading from '@/components/shared/SectionHeading';
import { AnimeStaggerContainer } from '@/components/motion';
import { NEWS_DATA } from '@/config/news-data';
import { formatDate } from '@/lib/utils';

export default function JournalSection() {
  const articles = NEWS_DATA.slice(0, 3);

  return (
    <section className="border-b border-line bg-white py-20 md:py-24">
      <div className="container-ed">
        <SectionHeading
          eyebrow="News & Announcements"
          title="Latest updates from Jay Media."
          description="Official concert announcements, audition schedules, and grand finale reports."
          link={{ href: '/news', label: 'View all news' }}
        />

        <AnimeStaggerContainer
          stagger={80}
          distance={18}
          className="grid gap-6 md:grid-cols-3"
        >
          {articles.map((article) => (
            <Link
              key={article.slug}
              href={`/news/${article.slug}`}
              className="group flex flex-col justify-between overflow-hidden rounded-lg border border-line bg-paper-deep/30 transition-colors hover:border-forest hover:bg-white"
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

                <div className="p-6">
                  <div className="flex items-center justify-between text-xs font-medium text-muted">
                    <span className="text-forest">{article.category}</span>
                    <time dateTime={article.date}>{formatDate(article.date)}</time>
                  </div>
                  <h3 className="display mt-2 text-xl font-bold leading-snug text-ink transition-colors group-hover:text-forest">
                    {article.title}
                  </h3>
                  <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted">
                    {article.excerpt}
                  </p>
                </div>
              </div>

              <div className="border-t border-line px-6 py-4 text-xs font-semibold text-forest">
                <span className="inline-flex items-center gap-1">
                  Read article
                  <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </div>
            </Link>
          ))}
        </AnimeStaggerContainer>
      </div>
    </section>
  );
}
