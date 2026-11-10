import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import SectionHeading from '@/components/shared/SectionHeading';
import Reveal from '@/components/motion/Reveal';
import { AnimeStaggerContainer } from '@/components/motion';
import { NEWS_DATA } from '@/config/news-data';
import { formatDate } from '@/lib/utils';

export default function JournalSection() {
  const [featured, ...rest] = NEWS_DATA.slice(0, 3);

  return (
    <section className="border-b border-line bg-paper py-20 md:py-28">
      <div className="container-ed">
        <SectionHeading
          eyebrow="07 / Journal"
          title={
            <>
              Notes from the{' '}
              <span className="serif italic text-accent">newsroom.</span>
            </>
          }
          description="Official dispatches, finale reports, and production notes from the Jay Media desk."
          link={{ href: '/news', label: 'All dispatches' }}
        />

        {/* Lead Dispatch Asymmetric 5 / 7 Spread (Matches Vertical Miss Koshi Ratio Cleanly) */}
        <div className="grid items-start gap-10 lg:grid-cols-12 lg:gap-12">
          <Reveal className="lg:col-span-5">
            <Link href={`/news/${featured.slug}`} className="group block">
              <div className="relative aspect-[1313/1550] overflow-hidden rounded-[6px] border border-line bg-sand shadow-xs transition-all group-hover:border-forest group-hover:shadow-md">
                <Image
                  src={featured.image}
                  alt={featured.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 42vw"
                  className="img-zoom object-cover"
                />
              </div>
              <div className="mt-3 flex items-center justify-between gap-4 border-t border-line pt-2.5">
                <span className="eyebrow text-faint">{featured.author}</span>
                <time
                  dateTime={featured.date}
                  className="font-mono text-[9.5px] uppercase tracking-[0.15em] text-faint"
                >
                  {formatDate(featured.date)}
                </time>
              </div>
            </Link>
          </Reveal>

          <div className="lg:col-span-7">
            <Reveal delay={60}>
              <div className="border-b border-line-strong pb-8">
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[10px] font-bold uppercase tracking-[0.14em]">
                  <span className="text-forest">Latest Dispatch</span>
                  <span className="text-line-strong" aria-hidden="true">
                    /
                  </span>
                  <span className="text-muted">{featured.category}</span>
                  <span className="text-line-strong" aria-hidden="true">
                    /
                  </span>
                  <span className="text-faint">{featured.readTime}</span>
                </div>

                <h3 className="display mt-4 text-balance text-[clamp(1.8rem,3.4vw,2.9rem)] font-bold text-ink">
                  <Link
                    href={`/news/${featured.slug}`}
                    className="transition-colors duration-300 hover:text-forest"
                  >
                    {featured.title}
                  </Link>
                </h3>

                <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted md:text-base">
                  {featured.excerpt}
                </p>

                <Link
                  href={`/news/${featured.slug}`}
                  className="btn btn-accent mt-6 rounded-[3px]"
                >
                  Read dispatch
                  <ArrowUpRight className="h-4 w-4 text-gold" />
                </Link>
              </div>
            </Reveal>

            <div className="mt-8">
              <div className="flex items-center justify-between border-b border-line pb-3">
                <span className="eyebrow text-faint">More from the desk</span>
                <span className="mono text-[10px] text-faint">
                  {String(rest.length).padStart(2, '0')} articles
                </span>
              </div>

              <AnimeStaggerContainer stagger={80} distance={18}>
                {rest.map((article) => (
                  <Link
                    key={article.slug}
                    href={`/news/${article.slug}`}
                    className="group flex gap-5 border-b border-line py-5 last:border-b-0"
                  >
                    <div className="relative aspect-[4/3] w-28 shrink-0 overflow-hidden rounded-[4px] border border-line bg-sand sm:w-36">
                      <Image
                        src={article.image}
                        alt={article.title}
                        fill
                        sizes="144px"
                        className="img-zoom object-cover"
                      />
                    </div>

                    <div className="min-w-0 flex-1">
                      <span className="font-mono text-[9.5px] font-bold uppercase tracking-[0.14em] text-forest">
                        {article.category}
                      </span>
                      <h3 className="display mt-1.5 text-lg font-bold leading-snug text-ink transition-colors duration-300 group-hover:text-forest sm:text-xl">
                        {article.title}
                      </h3>
                      <time
                        dateTime={article.date}
                        className="mt-2 block font-mono text-[9px] uppercase tracking-[0.13em] text-faint"
                      >
                        {formatDate(article.date)} / {article.readTime}
                      </time>
                    </div>
                  </Link>
                ))}
              </AnimeStaggerContainer>

              <Link
                href="/news"
                className="group mt-5 flex items-center justify-between gap-4 rounded-[6px] border border-line bg-white px-5 py-4 transition-colors duration-300 hover:border-forest"
              >
                <span className="text-sm font-medium text-ink-soft transition-colors duration-300 group-hover:text-forest">
                  Browse the full newsroom
                </span>
                <ArrowUpRight className="h-4 w-4 text-forest transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
