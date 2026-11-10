'use client';

import Link from 'next/link';
import { CheckCircle2, ArrowUpRight } from 'lucide-react';
import { NEWS_DATA } from '@/config/news-data';
import { formatDate } from '@/lib/utils';

export default function AdminNewsPage() {
  return (
    <div className="space-y-8 font-body text-ink">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-line">
        <div>
          <span className="text-xs uppercase tracking-widest text-coral font-semibold block mb-1">
            PRESS &amp; BROADCAST
          </span>
          <h1 className="editorial-headline text-ink text-3xl sm:text-4xl">
            News &amp; Press Releases CMS
          </h1>
          <p className="text-xs sm:text-sm text-muted mt-1">
            Publish official announcements, coronation reports, and audition updates.
          </p>
        </div>
      </div>

      <div className="bg-card border border-line rounded-[0.5rem] overflow-hidden shadow-sm">
        <table className="w-full text-left text-xs">
          <thead className="bg-paper-deep border-b border-line text-faint uppercase tracking-widest text-[10px]">
            <tr>
              <th className="py-4 px-6">Headline</th>
              <th className="py-4 px-6">Category</th>
              <th className="py-4 px-6">Date</th>
              <th className="py-4 px-6">Status</th>
              <th className="py-4 px-6 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {NEWS_DATA.map((article) => (
              <tr key={article.slug} className="hover:bg-paper-deep transition-colors">
                <td className="py-4 px-6 font-bold text-ink text-sm">
                  {article.title}
                </td>
                <td className="py-4 px-6 text-coral font-medium">{article.category}</td>
                <td className="py-4 px-6 text-muted">{formatDate(article.date)}</td>
                <td className="py-4 px-6">
                  <span className="inline-flex items-center gap-1 text-[10px] uppercase font-semibold px-2.5 py-1 bg-forest-soft text-ink-soft rounded-[0.3rem]">
                    <CheckCircle2 className="w-3 h-3 text-ink-soft" /> Published
                  </span>
                </td>
                <td className="py-4 px-6 text-right">
                  <Link
                    href={`/news/${article.slug}`}
                    target="_blank"
                    className="p-1.5 text-muted hover:text-coral transition-colors inline-block"
                  >
                    <ArrowUpRight className="w-4 h-4" />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

