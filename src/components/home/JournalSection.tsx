import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import SectionHeading from '@/components/shared/SectionHeading';
import Reveal from '@/components/motion/Reveal';
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

        <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
          <Reveal className="lg:col-span-7">
            <Link href={`/news/${featured.slug}`} className="group block">
              <div className="relative aspect-[16/10] overflow-hidden rounded-[0.5rem] border border-line bg-sand">
                <Image
                  src={featured.image}
                  alt={featured.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 58vw"
                  className="img-zoom object-cover"
                />
                <span className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-[0.2rem] bg-cream px-3 py-1.5 font-mono text-[8px] uppercase tracking-[0.16em] text-ink">
                  <span className="h-1 w-1 rounded-full bg-accent" />
                  Latest dispatch
                </span>
              </div>

              <div className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[9px] uppercase tracking-[0.13em]">
                <span className="text-accent">{featured.category}</span>
                <span className="text-faint" aria-hidden="true">
                  /
                </span>
                <time dateTime={featured.date} className="text-faint">
                  {formatDate(featured.date)}
                </time>
              </div>

              <h3 className="display mt-3 max-w-[24ch] text-balance text-[clamp(1.7rem,3vw,2.7rem)] text-ink transition-colors duration-300 group-hover:text-accent">
                {featured.title}
              </h3>
              <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted">
                {featured.excerpt}
              </p>

              <span className="mt-5 inline-flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.15em] text-ink">
                Read dispatch
                <ArrowUpRight className="h-3.5 w-3.5 text-accent transition-transform duration-500 group-hover:-translate-y-1 group-hover:translate-x-1" />
              </span>
            </Link>
          </Reveal>

          <div className="lg:col-span-5">
            <div className="flex items-center justify-between border-b border-line pb-3">
              <span className="eyebrow text-faint">More from the desk</span>
              <span className="mono text-[10px] text-faint">
                {String(rest.length).padStart(2, '0')}
              </span>
            </div>

            {rest.map((article, index) => (
              <Reveal key={article.slug} delay={index * 70}>
                <Link
                  href={`/news/${article.slug}`}
                  className="group flex gap-4 border-b border-line py-5 last:border-b-0 sm:gap-5"
                >
                  <div className="relative aspect-square w-20 shrink-0 overflow-hidden rounded-[0.3rem] bg-sand sm:w-24">
                    <Image
                      src={article.image}
                      alt={article.title}
                      fill
                      sizes="96px"
                      className="img-zoom object-cover"
                    />
                  </div>

                  <div className="min-w-0 flex-1">
                    <span className="eyebrow text-[8px] text-accent">
                      {article.category}
                    </span>
                    <h3 className="display mt-2 text-lg leading-snug text-ink transition-colors duration-300 group-hover:text-accent sm:text-xl">
                      {article.title}
                    </h3>
                    <time
                      dateTime={article.date}
                      className="mt-2 block font-mono text-[8px] uppercase tracking-[0.13em] text-faint"
                    >
                      {formatDate(article.date)} · {article.readTime}
                    </time>
                  </div>
                </Link>
              </Reveal>
            ))}

            <Reveal delay={160}>
              <Link
                href="/news"
                className="group mt-5 flex items-center justify-between gap-4 border border-line bg-card px-5 py-4 transition-colors duration-400 hover:border-line-strong"
              >
                <span className="text-sm text-muted transition-colors duration-300 group-hover:text-ink">
                  Browse the full newsroom
                </span>
                <ArrowUpRight className="h-4 w-4 text-accent transition-transform duration-500 group-hover:-translate-y-1 group-hover:translate-x-1" />
              </Link>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
