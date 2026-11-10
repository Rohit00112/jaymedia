import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import SectionHeading from '@/components/shared/SectionHeading';
import AnimeStaggerContainer from '@/components/motion/AnimeStaggerContainer';
import { listNewsRepo } from '@/lib/backend/repository';
import { formatDate } from '@/lib/utils';

export default async function JournalSection() {
  const allNews = await listNewsRepo();
  const articles = allNews.slice(0, 3);

  return (
    <section className="border-b border-line bg-white py-16 md:py-20">
      <div className="container-ed">
        <SectionHeading
          eyebrow="News & Announcements"
          title="Latest updates from Jay Media."
          description="Official concert announcements, audition schedules, and grand finale reports."
          link={{ href: '/news', label: 'View all news' }}
        />

        <AnimeStaggerContainer className="grid gap-6 md:grid-cols-3">
          {articles.map((article) => (
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

              <div className="border-t border-line px-5 py-3.5 text-xs font-medium text-forest">
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
