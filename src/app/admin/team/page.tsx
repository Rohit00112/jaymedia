'use client';

import { ShieldCheck } from 'lucide-react';

const TEAM = [
  { name: 'Jay Raj Roy', role: 'Chairman & Founder', status: 'Executive Leadership' },
  { name: 'Neesha Khatiwada', role: 'Chief Executive Officer', status: 'Executive Leadership' },
];

export default function AdminTeamPage() {
  return (
    <div className="space-y-8 font-body text-ink">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-line">
        <div>
          <span className="text-xs uppercase font-body tracking-wider text-coral font-semibold block mb-1">
            ROSTER GOVERNANCE
          </span>
          <h1 className="editorial-headline text-ink text-3xl sm:text-4xl font-body">
            Team &amp; Mentors CMS
          </h1>
          <p className="text-xs sm:text-sm font-body text-muted mt-1">
            Verified leadership and advisory profiles displayed publicly on the website.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {TEAM.map((member, idx) => (
          <div key={idx} className="bg-card border border-line p-6 rounded-[0.5rem] shadow-sm flex items-start gap-4 hover:border-coral/40 transition-all">
            <div className="w-14 h-14 bg-paper text-ink font-body text-xl font-bold flex items-center justify-center shrink-0 border border-coral rounded-[0.5rem]">
              {member.name.split(' ').map((n) => n[0]).join('')}
            </div>
            <div>
              <span className="inline-flex items-center gap-1 text-[10px] uppercase font-body px-2.5 py-0.5 bg-forest-soft border border-forest/25 text-ink-soft font-medium rounded-[0.3rem] mb-1.5">
                <ShieldCheck className="w-3 h-3 text-coral" /> {member.status}
              </span>
              <h3 className="font-body font-bold text-lg text-ink">{member.name}</h3>
              <p className="text-xs text-muted font-body mt-0.5">{member.role}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

