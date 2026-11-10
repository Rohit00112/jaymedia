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
  UserCheck,
  Settings,
  ExternalLink,
  LogOut,
} from 'lucide-react';
import { useAuth } from '@/lib/firebase/auth-context';
import { cn } from '@/lib/utils';

const ADMIN_NAV = [
  { label: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { label: 'Registrations', href: '/admin/registrations', icon: UserCheck },
  { label: 'Events', href: '/admin/events', icon: Calendar },
  { label: 'Services', href: '/admin/services', icon: Layers },
  { label: 'Team', href: '/admin/team', icon: Users },
  { label: 'Gallery', href: '/admin/gallery', icon: ImageIcon },
  { label: 'News', href: '/admin/news', icon: Newspaper },
  { label: 'Inquiries', href: '/admin/inquiries', icon: Inbox },
  { label: 'Settings', href: '/admin/settings', icon: Settings },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const { user, logout } = useAuth();

  return (
    <aside className="flex w-full shrink-0 flex-col border-b border-line bg-card lg:min-h-screen lg:w-64 lg:border-b-0 lg:border-r">
      <div className="flex items-center justify-between border-b border-line px-5 py-4 lg:block lg:px-6 lg:py-6">
        <Link href="/admin" className="flex items-center gap-3">
          <span className="flex h-8 w-8 items-center justify-center rounded-[0.18rem] bg-ink text-paper">
            <span className="display text-[1.05rem] leading-none">J</span>
          </span>
          <span className="flex flex-col">
            <span className="display text-[1.1rem] leading-none tracking-[-0.03em]">
              Jay Media
            </span>
            <span className="mt-1 font-mono text-[7px] uppercase leading-none tracking-[0.22em] text-faint">
              Studio CMS
            </span>
          </span>
        </Link>

        <Link
          href="/"
          target="_blank"
          className="inline-flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-[0.12em] text-muted transition-colors hover:text-ink lg:hidden"
        >
          Site
          <ExternalLink className="h-3 w-3" />
        </Link>
      </div>

      <nav className="flex gap-1 overflow-x-auto px-3 py-3 no-scrollbar lg:flex-1 lg:flex-col lg:gap-0.5 lg:overflow-visible lg:px-4 lg:py-5">
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
              aria-current={isActive ? 'page' : undefined}
              className={cn(
                'flex shrink-0 items-center gap-2.5 whitespace-nowrap rounded-[0.3rem] px-3 py-2.5 text-[11px] font-semibold uppercase tracking-[0.08em] transition-colors duration-200',
                isActive
                  ? 'bg-accent-soft text-accent'
                  : 'text-muted hover:bg-paper-deep hover:text-ink'
              )}
            >
              <Icon className="h-4 w-4 shrink-0" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="hidden border-t border-line p-4 lg:block">
        <Link
          href="/"
          target="_blank"
          className="flex items-center justify-between rounded-[0.3rem] border border-line bg-paper px-3.5 py-2.5 text-xs font-medium text-ink transition-colors hover:border-line-strong"
        >
          <span>View live website</span>
          <ExternalLink className="h-3.5 w-3.5 text-accent" />
        </Link>

        <div className="mt-3 flex items-center justify-between px-1 pt-2">
          <div className="min-w-0 pr-2">
            <span className="block truncate text-xs font-semibold text-ink">
              {user?.email || 'Admin operator'}
            </span>
            <span className="mt-0.5 block font-mono text-[8px] uppercase tracking-[0.12em] text-faint">
              Biratnagar control
            </span>
          </div>
          <button
            onClick={() => logout()}
            title="Log out"
            aria-label="Log out"
            className="rounded-[0.25rem] p-2 text-muted transition-colors hover:bg-paper-deep hover:text-accent"
          >
            <LogOut className="h-4 w-4" />
          </button>
        </div>
      </div>
    </aside>
  );
}
