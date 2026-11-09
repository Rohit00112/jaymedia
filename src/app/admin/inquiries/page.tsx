'use client';

import { useState } from 'react';
import { Mail, Phone, Building } from 'lucide-react';

interface InquiryItem {
  id: string;
  name: string;
  email: string;
  phone: string;
  organization: string;
  service: string;
  budget: string;
  message: string;
  status: 'new' | 'contacted' | 'in_progress' | 'completed';
  receivedAt: string;
}

const INITIAL_INQUIRIES: InquiryItem[] = [
  {
    id: 'inq_01',
    name: 'Ramesh Karki',
    email: 'ramesh.karki@koshitrade.np',
    phone: '+977 9801234567',
    organization: 'Koshi Trade & Export Conclave',
    service: 'event-management',
    budget: 'NPR 10 Lakhs+',
    message:
      'We are planning the annual Koshi province industrial trade summit at Biratnagar and require full stage architecture, 3D line array sound, and executive seating protocol.',
    status: 'new',
    receivedAt: '2025-11-08 14:30',
  },
  {
    id: 'inq_02',
    name: 'Sunita Sharma',
    email: 'sunita@beveragenepal.com',
    phone: '+977 9851098765',
    organization: 'Apex Beverages Ltd.',
    service: 'brand-experiences',
    budget: 'NPR 5 Lakhs - 10 Lakhs',
    message:
      'Interested in sponsoring Miss Koshi 2025 as the exclusive beverage partner with on-ground mall activations in Biratnagar, Itahari, and Dharan.',
    status: 'in_progress',
    receivedAt: '2025-11-07 10:15',
  },
  {
    id: 'inq_03',
    name: 'Anil Shrestha',
    email: 'anil@motorgroup.com',
    phone: '+977 9812345678',
    organization: 'Eastern Auto Ventures',
    service: 'product-launches',
    budget: 'NPR 2 Lakhs - 5 Lakhs',
    message:
      'Looking for a dramatic unveiling ceremony (kabuki drop, cold pyrotechnics) for our new SUV showroom opening near Main Road, Biratnagar.',
    status: 'contacted',
    receivedAt: '2025-11-05 16:45',
  },
];

export default function AdminInquiriesPage() {
  const [inquiries, setInquiries] = useState<InquiryItem[]>(INITIAL_INQUIRIES);
  const [selectedInquiry, setSelectedInquiry] = useState<InquiryItem | null>(INITIAL_INQUIRIES[0]);

  const updateStatus = (id: string, newStatus: InquiryItem['status']) => {
    setInquiries((prev) =>
      prev.map((inq) => (inq.id === id ? { ...inq, status: newStatus } : inq))
    );
    if (selectedInquiry?.id === id) {
      setSelectedInquiry((prev) => (prev ? { ...prev, status: newStatus } : null));
    }
  };

  return (
    <div className="space-y-8 font-body text-white">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <span className="text-xs uppercase tracking-widest text-coral font-semibold block mb-1">
            CLIENT LEADS &amp; PROPOSALS
          </span>
          <h1 className="editorial-headline text-white text-3xl sm:text-4xl">
            Inquiries Management CMS
          </h1>
          <p className="text-xs sm:text-sm text-[#eef9ff]/70 mt-1">
            Review incoming project briefs, contact prospects, and record production notes.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left List */}
        <div className="lg:col-span-5 bg-[#0c0c11] border border-white/10 shadow-2xl divide-y divide-white/10 overflow-hidden rounded-[10px]">
          {inquiries.map((inq) => {
            const isSelected = selectedInquiry?.id === inq.id;
            return (
              <div
                key={inq.id}
                onClick={() => setSelectedInquiry(inq)}
                className={`p-5 cursor-pointer transition-colors ${
                  isSelected ? 'bg-white/10 border-l-4 border-coral' : 'hover:bg-white/5'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <h4 className="font-bold text-sm text-white">{inq.name}</h4>
                  <span className="text-[10px] text-white/40">{inq.receivedAt}</span>
                </div>
                <span className="text-xs text-[#eef9ff]/70 block mb-2">{inq.organization}</span>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-coral uppercase tracking-wider text-[11px] font-semibold">
                    {inq.service}
                  </span>
                  <span
                    className={`px-2.5 py-0.5 text-[10px] uppercase tracking-wider rounded-[50px] font-semibold ${
                      inq.status === 'new'
                        ? 'bg-coral/20 text-coral border border-coral/30'
                        : inq.status === 'in_progress'
                        ? 'bg-[#01402b] text-[#eef9ff]'
                        : inq.status === 'contacted'
                        ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                        : 'bg-emerald-950 text-emerald-300 border border-emerald-500/30'
                    }`}
                  >
                    {inq.status.replace('_', ' ')}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Detail Pane */}
        <div className="lg:col-span-7 bg-[#0c0c11] border border-white/10 p-8 shadow-2xl rounded-[10px]">
          {selectedInquiry ? (
            <div className="space-y-6 text-sm">
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <div>
                  <h3 className="font-bold text-2xl text-white">
                    {selectedInquiry.name}
                  </h3>
                  <span className="text-xs text-[#eef9ff]/70 flex items-center gap-1.5 mt-1">
                    <Building className="w-3.5 h-3.5 text-coral" /> {selectedInquiry.organization}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs text-white/50 uppercase">Update:</span>
                  <select
                    value={selectedInquiry.status}
                    onChange={(e) => updateStatus(selectedInquiry.id, e.target.value as InquiryItem['status'])}
                    className="px-3 py-1.5 bg-black/60 border border-white/15 text-white text-xs uppercase focus:outline-none focus:border-coral rounded-[2px]"
                  >
                    <option value="new" className="bg-[#0c0c11] text-white">New</option>
                    <option value="contacted" className="bg-[#0c0c11] text-white">Contacted</option>
                    <option value="in_progress" className="bg-[#0c0c11] text-white">In Progress</option>
                    <option value="completed" className="bg-[#0c0c11] text-white">Completed</option>
                  </select>
                </div>
              </div>

              {/* Direct Communication Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 bg-black/40 border border-white/10 text-xs rounded-[10px]">
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-coral shrink-0" />
                  <a href={`mailto:${selectedInquiry.email}`} className="text-[#eef9ff] hover:text-coral font-medium">
                    {selectedInquiry.email}
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-coral shrink-0" />
                  <a href={`tel:${selectedInquiry.phone}`} className="text-[#eef9ff] hover:text-coral font-medium">
                    {selectedInquiry.phone}
                  </a>
                </div>
                <div>
                  <span className="text-white/50 block">Scope:</span>
                  <span className="font-semibold text-white">{selectedInquiry.service}</span>
                </div>
                <div>
                  <span className="text-white/50 block">Budget Indicator:</span>
                  <span className="font-semibold text-white">{selectedInquiry.budget}</span>
                </div>
              </div>

              {/* Message */}
              <div>
                <span className="text-xs uppercase tracking-widest text-white/50 block mb-2 font-semibold">
                  Client Project Scope &amp; Notes
                </span>
                <p className="p-4 bg-black/40 border border-white/10 text-[#eef9ff] leading-relaxed rounded-[10px]">
                  {selectedInquiry.message}
                </p>
              </div>

              {/* Internal Production Notes */}
              <div>
                <span className="text-xs uppercase tracking-widest text-white/50 block mb-2 font-semibold">
                  Biratnagar Desk Internal Notes
                </span>
                <textarea
                  rows={3}
                  placeholder="Record call summary, quotation milestones, or assigned stage manager..."
                  className="w-full p-3 bg-black/60 border border-white/15 text-xs text-white placeholder:text-white/30 focus:outline-none focus:border-coral rounded-[2px]"
                />
              </div>
            </div>
          ) : (
            <p className="text-white/50 text-sm text-center py-12">Select an inquiry to view details.</p>
          )}
        </div>
      </div>
    </div>
  );
}
