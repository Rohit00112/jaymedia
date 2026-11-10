import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import SectionHeading from '@/components/shared/SectionHeading';
import Reveal from '@/components/motion/Reveal';
import { AnimeStaggerContainer } from '@/components/motion';
import { NEWS_DATA } from '@/config/news-data';
import { formatDate } from '@/lib/utils';

export default function JournalSection() {
  const [featured, ...rest] = NEWS_DATA.slice(0, 4);

  return (
    <section className="border-b border-line bg-paper-deep py-20 md:py-24">
      <div className="container-ed">
        <SectionHeading
          eyebrow="07 / Press & Dispatches"
          title={
            <>
              Notes from the{' '}
              <span className="text-forest">Biratnagar desk.</span>
            </>
          }
          description="Official finale reports, stage announcements, and production dispatches."
          link={{ href: '/news', label: 'All dispatches' }}
        />

        {/* Broadsheet Dispatch Matrix: Featured Frame Left (4 Cols) + Ruled Index Right (8 Cols) */}
        <div className="grid items-start gap-8 lg:grid-cols-12 lg:gap-10">
          <Reveal className="lg:col-span-4">
            <Link
              href={`/news/${featured.slug}`}
              className="group block border border-line bg-white p-4 transition-colors hover:border-forest"
            >
              <div className="relative aspect-[1313/1550] overflow-hidden rounded-[2px] border border-line bg-sand">
                <Image
                  src={featured.image}
                  alt={featured.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 33vw"
                  className="img-zoom object-cover"
                />
              </div>

              <div className="mt-4">
                <div className="flex items-center justify-between font-mono text-[9.5px] font-semibold uppercase tracking-[0.14em] text-forest">
                  <span>Lead Dispatch</span>
                  <time dateTime={featured.date} className="text-faint">
                    {formatDate(featured.date)}
                  </time>
                </div>
                <h3 className="display mt-2 text-xl font-bold leading-snug text-ink transition-colors group-hover:text-forest">
                  {featured.title}
                </h3>
                <p className="mt-2 line-clamp-3 text-xs leading-relaxed text-muted">
                  {featured.excerpt}
                </p>
              </div>
            </Link>
          </Reveal>

          <div className="lg:col-span-8">
            <div className="border border-line bg-white">
              <div className="flex items-center justify-between border-b border-line px-6 py-4">
                <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-forest">
                  Press Archive Ledger
                </span>
                <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-faint">
                  {String(rest.length).padStart(2, '0')} Dispatches
                </span>
              </div>

              <AnimeStaggerContainer
                stagger={75}
                distance={16}
                className="divide-y divide-line"
              >
                {rest.map((article) => (
                  <Link
                    key={article.slug}
                    href={`/news/${article.slug}`}
                    className="group grid items-center gap-5 p-5 transition-colors hover:bg-paper-deep/50 sm:grid-cols-12 sm:p-6"
                  >
                    <div className="sm:col-span-3">
                      <span className="block font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-forest">
                        {article.category}
                      </span>
                      <time
                        dateTime={article.date}
                        className="mt-1 block font-mono text-[10px] text-faint"
                      >
                        {formatDate(article.date)}
                      </time>
                    </div>

                    <div className="sm:col-span-6">
                      <h3 className="display text-lg font-bold leading-snug text-ink transition-colors group-hover:text-forest sm:text-xl">
                        {article.title}
                      </h3>
                      <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-muted">
                        {article.excerpt}
                      </p>
                    </div>

                    <div className="flex items-center justify-between gap-3 sm:col-span-3 sm:justify-end">
                      <div className="relative aspect-[4/3] w-20 shrink-0 overflow-hidden rounded-[2px] border border-line bg-sand">
                        <Image
                          src={article.image}
                          alt={article.title}
                          fill
                          sizes="80px"
                          className="object-cover"
                        />
                      </div>
                      <ArrowUpRight className="h-4 w-4 shrink-0 text-faint transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-forest" />
                    </div>
                  </Link>
                ))}
              </AnimeStaggerContainer>

              <Link
                href="/news"
                className="group flex items-center justify-between border-t border-line bg-paper-deep/40 px-6 py-4 transition-colors hover:bg-forest hover:text-white"
              >
                <span className="font-mono text-[10.5px] font-semibold uppercase tracking-[0.16em]">
                  Browse All Studio Dispatches
                </span>
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
