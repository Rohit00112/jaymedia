'use client';

import { Users, ShieldCheck, Plus, CheckCircle2 } from 'lucide-react';

const TEAM = [
  { name: 'Jay Raj Rai', role: 'Chairperson & Founder', status: 'Executive Leadership' },
  { name: 'Nisha Khatiwada Rai', role: 'Chief Executive Officer', status: 'Executive Leadership' },
  { name: 'Rishav Dev Ghimire', role: 'Mentor & Production Advisor', status: 'Advisory Board' },
  { name: 'Rajendra KC', role: 'Senior Advisor & Mentor', status: 'Advisory Board' },
];

export default function AdminTeamPage() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-ink/10">
        <div>
          <span className="text-xs uppercase font-display tracking-widest text-coral font-semibold block mb-1">
            ROSTER GOVERNANCE
          </span>
          <h1 className="editorial-headline text-ink text-3xl sm:text-4xl">
            Team &amp; Mentors CMS
          </h1>
          <p className="text-xs sm:text-sm font-body text-ink/60 mt-1">
            Verified leadership and advisory profiles displayed publicly on the website.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {TEAM.map((member, idx) => (
          <div key={idx} className="bg-white border border-ink/10 p-6 shadow-sm flex items-start gap-4">
            <div className="w-14 h-14 bg-dark-surface text-white font-display text-xl font-bold flex items-center justify-center shrink-0 border border-coral">
              {member.name.split(' ').map((n) => n[0]).join('')}
            </div>
            <div>
              <span className="inline-flex items-center gap-1 text-[10px] uppercase font-display text-coral font-semibold mb-1">
                <ShieldCheck className="w-3 h-3" /> {member.status}
              </span>
              <h3 className="font-display font-bold text-lg text-ink">{member.name}</h3>
              <p className="text-xs text-ink/60 font-body">{member.role}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
