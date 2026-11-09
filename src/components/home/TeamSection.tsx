'use client';

import { useEffect, useRef } from 'react';
import anime from 'animejs';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight, ShieldCheck } from 'lucide-react';
import { useInView, useReducedMotion } from '@/hooks';

interface TeamMemberData {
  name: string;
  role: string;
  status: 'Verified Leadership' | 'Verified Advisory';
  bio: string;
  image: string;
}

const TEAM_MEMBERS: TeamMemberData[] = [
  {
    name: 'Jay Raj Rai',
    role: 'Chairperson & Founder',
    status: 'Verified Leadership',
    bio: 'Visionary creative director and founder behind Jay Media Management. Spearheaded major Koshi Province beauty pageants and youth talent platforms.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'Nisha Khatiwada Rai',
    role: 'Chief Executive Officer',
    status: 'Verified Leadership',
    bio: 'Leads executive operations, institutional partnerships, talent management, and production standards for the agency.',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'Rishav Dev Ghimire',
    role: 'Mentor & Production Advisor',
    status: 'Verified Advisory',
    bio: 'Advises contestants and stage crews on performance arts, stage presence, and voice projection during pageant bootcamps.',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'Rajendra KC',
    role: 'Senior Advisor & Mentor',
    status: 'Verified Advisory',
    bio: 'Guides youth personality grooming, jury coordination, and ethical pageant governance across regional installments.',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=800&q=80',
  },
];

export default function TeamSection() {
  const { ref: containerRef, isInView } = useInView({ threshold: 0.15, once: true });
  const reducedMotion = useReducedMotion();
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isInView) return;

    if (reducedMotion) {
      if (headerRef.current) headerRef.current.style.opacity = '1';
      if (gridRef.current) {
        Array.from(gridRef.current.children).forEach((child) => {
          (child as HTMLElement).style.opacity = '1';
          (child as HTMLElement).style.transform = 'none';
        });
      }
      return;
    }

    const tl = anime.timeline({ easing: 'easeOutCubic' });

    tl.add({
      targets: headerRef.current,
      opacity: [0, 1],
      translateY: [25, 0],
      duration: 600,
    }).add(
      {
        targets: gridRef.current?.children,
        opacity: [0, 1],
        translateY: [35, 0],
        duration: 700,
        delay: anime.stagger(120),
      },
      '-=300'
    );
  }, [isInView, reducedMotion]);

  return (
    <section
      ref={containerRef as React.RefObject<HTMLElement>}
      className="relative bg-white text-[#101014] py-28 lg:py-40 px-6 sm:px-10 lg:px-16 overflow-hidden border-b border-black/10 font-rubik"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div ref={headerRef} className="mb-16 lg:mb-24" style={{ opacity: 0 }}>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <span className="section-label text-coral font-medium tracking-[0.2em] mb-4 block">
                LEADERSHIP &amp; MENTORS
              </span>
              <h2 className="editorial-headline text-[#101014] text-4xl sm:text-5xl lg:text-7xl font-rubik">
                THE PEOPLE BEHIND THE MOMENTS.
              </h2>
            </div>
            <Link
              href="/team"
              className="group inline-flex items-center gap-2 text-sm font-rubik font-semibold uppercase tracking-widest text-[#101014]/75 hover:text-[#101014] transition-colors duration-300"
            >
              <span>Meet The Entire Team</span>
              <ArrowUpRight className="w-4 h-4 text-coral transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </Link>
          </div>
        </div>

        {/* Team Grid */}
        <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {TEAM_MEMBERS.map((member, index) => (
            <div
              key={index}
              className="group flex flex-col bg-[#FAFAF8] border border-black/10 hover:border-coral/40 p-6 rounded-[10px] shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              style={{ opacity: 0 }}
            >
              {/* Portrait with genuine executive stock photo & badge */}
              <div className="relative aspect-square w-full bg-white rounded-[10px] overflow-hidden mb-6 border border-black/5 shadow-inner">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-[1]" />

                <div className="absolute top-3 right-3 z-10">
                  <span className="inline-flex items-center gap-1 text-[10px] uppercase font-rubik px-2.5 py-0.5 bg-[#01402b] border border-[#01402b] text-white font-medium rounded-[50px] backdrop-blur-sm">
                    <ShieldCheck className="w-3 h-3 text-coral" />
                    {member.status === 'Verified Leadership' ? 'Leadership' : 'Advisor'}
                  </span>
                </div>
              </div>

              {/* Information */}
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-rubik text-xl font-bold text-[#101014] group-hover:text-coral transition-colors">
                    {member.name}
                  </h3>
                  <span className="text-xs uppercase font-rubik tracking-wider text-coral font-medium block mt-1 mb-3">
                    {member.role}
                  </span>
                  <p className="text-xs sm:text-sm font-rubik text-[#4A4A52] leading-relaxed">
                    {member.bio}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-black/10 flex items-center justify-between text-[11px] text-[#6E6D7A] font-rubik">
                  <span>Biratnagar Hub</span>
                  <span className="text-coral font-medium group-hover:underline">Profile &rarr;</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

