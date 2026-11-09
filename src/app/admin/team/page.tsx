'use client';

import { ShieldCheck } from 'lucide-react';

const TEAM = [
  { name: 'Jay Raj Rai', role: 'Chairperson & Founder', status: 'Executive Leadership' },
  { name: 'Nisha Khatiwada Rai', role: 'Chief Executive Officer', status: 'Executive Leadership' },
  { name: 'Rishav Dev Ghimire', role: 'Mentor & Production Advisor', status: 'Advisory Board' },
  { name: 'Rajendra KC', role: 'Senior Advisor & Mentor', status: 'Advisory Board' },
];

export default function AdminTeamPage() {
  return (
    <div className="space-y-8 font-body text-white">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <span className="text-xs uppercase font-body tracking-wider text-coral font-semibold block mb-1">
            ROSTER GOVERNANCE
          </span>
          <h1 className="editorial-headline text-white text-3xl sm:text-4xl font-body">
            Team &amp; Mentors CMS
          </h1>
          <p className="text-xs sm:text-sm font-body text-[#eef9ff]/60 mt-1">
            Verified leadership and advisory profiles displayed publicly on the website.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {TEAM.map((member, idx) => (
          <div key={idx} className="bg-[#0c0c11] border border-white/10 p-6 rounded-[10px] shadow-xl flex items-start gap-4 hover:border-coral/40 transition-all">
            <div className="w-14 h-14 bg-black text-white font-body text-xl font-bold flex items-center justify-center shrink-0 border border-coral rounded-[10px]">
              {member.name.split(' ').map((n) => n[0]).join('')}
            </div>
            <div>
              <span className="inline-flex items-center gap-1 text-[10px] uppercase font-body px-2.5 py-0.5 bg-[#01402b]/90 border border-[#01402b] text-[#eef9ff] font-medium rounded-[50px] mb-1.5">
                <ShieldCheck className="w-3 h-3 text-coral" /> {member.status}
              </span>
              <h3 className="font-body font-bold text-lg text-white">{member.name}</h3>
              <p className="text-xs text-[#eef9ff]/70 font-body mt-0.5">{member.role}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

