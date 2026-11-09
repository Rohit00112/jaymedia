'use client';

import Link from 'next/link';
import { CheckCircle2, ArrowUpRight } from 'lucide-react';
import { NEWS_DATA } from '@/config/news-data';
import { formatDate } from '@/lib/utils';

export default function AdminNewsPage() {
  return (
    <div className="space-y-8 font-body text-white">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <span className="text-xs uppercase tracking-widest text-coral font-semibold block mb-1">
            PRESS &amp; BROADCAST
          </span>
          <h1 className="editorial-headline text-white text-3xl sm:text-4xl">
            News &amp; Press Releases CMS
          </h1>
          <p className="text-xs sm:text-sm text-[#eef9ff]/70 mt-1">
            Publish official announcements, coronation reports, and audition updates.
          </p>
        </div>
      </div>

      <div className="bg-[#0c0c11] border border-white/10 rounded-[10px] overflow-hidden shadow-2xl">
        <table className="w-full text-left text-xs">
          <thead className="bg-white/5 border-b border-white/10 text-white/50 uppercase tracking-widest text-[10px]">
            <tr>
              <th className="py-4 px-6">Headline</th>
              <th className="py-4 px-6">Category</th>
              <th className="py-4 px-6">Date</th>
              <th className="py-4 px-6">Status</th>
              <th className="py-4 px-6 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {NEWS_DATA.map((article) => (
              <tr key={article.slug} className="hover:bg-white/5 transition-colors">
                <td className="py-4 px-6 font-bold text-white text-sm">
                  {article.title}
                </td>
                <td className="py-4 px-6 text-coral font-medium">{article.category}</td>
                <td className="py-4 px-6 text-[#eef9ff]/70">{formatDate(article.date)}</td>
                <td className="py-4 px-6">
                  <span className="inline-flex items-center gap-1 text-[10px] uppercase font-semibold px-2.5 py-1 bg-[#01402b] text-[#eef9ff] rounded-[50px]">
                    <CheckCircle2 className="w-3 h-3 text-[#eef9ff]" /> Published
                  </span>
                </td>
                <td className="py-4 px-6 text-right">
                  <Link
                    href={`/news/${article.slug}`}
                    target="_blank"
                    className="p-1.5 text-white/60 hover:text-coral transition-colors inline-block"
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

