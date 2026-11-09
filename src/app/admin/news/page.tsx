'use client';

import Link from 'next/link';
import { Newspaper, Plus, CheckCircle2, ArrowUpRight } from 'lucide-react';
import { NEWS_DATA } from '@/config/news-data';
import { formatDate } from '@/lib/utils';

export default function AdminNewsPage() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-ink/10">
        <div>
          <span className="text-xs uppercase font-display tracking-widest text-coral font-semibold block mb-1">
            PRESS &amp; BROADCAST
          </span>
          <h1 className="editorial-headline text-ink text-3xl sm:text-4xl">
            News &amp; Press Releases CMS
          </h1>
          <p className="text-xs sm:text-sm font-body text-ink/60 mt-1">
            Publish official announcements, coronation reports, and audition updates.
          </p>
        </div>
      </div>

      <div className="bg-white border border-ink/10 overflow-hidden shadow-sm">
        <table className="w-full text-left text-xs font-body">
          <thead className="bg-warm-ivory border-b border-ink/10 text-ink/60 uppercase font-display tracking-widest text-[10px]">
            <tr>
              <th className="py-4 px-6">Headline</th>
              <th className="py-4 px-6">Category</th>
              <th className="py-4 px-6">Date</th>
              <th className="py-4 px-6">Status</th>
              <th className="py-4 px-6 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-ink/5">
            {NEWS_DATA.map((article) => (
              <tr key={article.slug} className="hover:bg-warm-ivory/30 transition-colors">
                <td className="py-4 px-6 font-display font-semibold text-ink text-sm">
                  {article.title}
                </td>
                <td className="py-4 px-6 text-coral font-display">{article.category}</td>
                <td className="py-4 px-6 text-ink/60">{formatDate(article.date)}</td>
                <td className="py-4 px-6">
                  <span className="inline-flex items-center gap-1 text-[10px] uppercase font-display px-2 py-0.5 bg-emerald-100 text-emerald-800">
                    <CheckCircle2 className="w-3 h-3" /> Published
                  </span>
                </td>
                <td className="py-4 px-6 text-right">
                  <Link
                    href={`/news/${article.slug}`}
                    target="_blank"
                    className="p-1.5 text-ink/60 hover:text-coral transition-colors inline-block"
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
