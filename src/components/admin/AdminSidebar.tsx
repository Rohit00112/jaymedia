'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Calendar,
  Layers,
  Users,
  Image as ImageIcon,
  Newspaper,
  Inbox,
  Settings,
  ExternalLink,
  LogOut,
} from 'lucide-react';
import { useAuth } from '@/lib/firebase/auth-context';
import { cn } from '@/lib/utils';

const ADMIN_NAV = [
  { label: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { label: 'Events & Pageants', href: '/admin/events', icon: Calendar },
  { label: 'Services', href: '/admin/services', icon: Layers },
  { label: 'Team & Mentors', href: '/admin/team', icon: Users },
  { label: 'Gallery Archive', href: '/admin/gallery', icon: ImageIcon },
  { label: 'News & Releases', href: '/admin/news', icon: Newspaper },
  { label: 'Inquiries', href: '/admin/inquiries', icon: Inbox },
  { label: 'Site Settings', href: '/admin/settings', icon: Settings },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const { user, logout } = useAuth();

  return (
    <aside className="w-64 bg-black text-white flex flex-col justify-between shrink-0 min-h-screen border-r border-white/10 font-rubik">
      <div>
        {/* Brand header */}
        <div className="p-6 border-b border-white/10">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-coral animate-pulse" />
            <span className="font-rubik font-bold text-lg tracking-wider text-white">
              JAY MEDIA
            </span>
          </div>
          <span className="text-[11px] uppercase font-rubik tracking-wider text-[#eef9ff]/60 mt-1 block">
            Studio CMS • Biratnagar
          </span>
        </div>

        {/* Nav Items */}
        <nav className="p-4 space-y-1.5">
          {ADMIN_NAV.map((item) => {
            const Icon = item.icon;
            const isActive =
              item.href === '/admin'
                ? pathname === '/admin'
                : pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'flex items-center gap-3 px-4 py-3 text-xs uppercase font-rubik tracking-wider transition-all duration-200 rounded-[50px]',
                  isActive
                    ? 'bg-coral text-white font-semibold shadow-md'
                    : 'text-[#eef9ff]/75 hover:bg-white/10 hover:text-white'
                )}
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Footer & User info */}
      <div className="p-4 border-t border-white/10 space-y-3">
        <Link
          href="/"
          target="_blank"
          className="flex items-center justify-between px-4 py-2.5 text-xs font-rubik text-[#eef9ff]/75 hover:text-white bg-white/5 hover:border-coral/50 border border-white/10 transition-colors rounded-[50px]"
        >
          <span>View Live Website</span>
          <ExternalLink className="w-3.5 h-3.5 text-coral" />
        </Link>

        <div className="pt-2 flex items-center justify-between px-2">
          <div className="truncate pr-2">
            <span className="text-xs font-rubik text-white font-medium block truncate">
              {user?.email || 'Admin Operator'}
            </span>
            <span className="text-[10px] text-[#eef9ff]/50 font-rubik block">Biratnagar Control</span>
          </div>
          <button
            onClick={() => logout()}
            title="Log Out"
            className="p-2 text-[#eef9ff]/60 hover:text-coral transition-colors rounded-[50px]"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </aside>
  );
}
