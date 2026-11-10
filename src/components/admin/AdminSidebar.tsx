'use client';

import Image from 'next/image';
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
  Database,
} from 'lucide-react';
import { useAuth } from '@/lib/firebase/auth-context';
import { siteConfig } from '@/config/site';
import { cn } from '@/lib/utils';

const ADMIN_NAV = [
  { label: 'Overview', href: '/admin', icon: LayoutDashboard },
  { label: 'Events & Pageants', href: '/admin/events', icon: Calendar },
  { label: 'Client Inquiries', href: '/admin/inquiries', icon: Inbox },
  { label: 'News & Press', href: '/admin/news', icon: Newspaper },
  { label: 'Services', href: '/admin/services', icon: Layers },
  { label: 'Team & Leadership', href: '/admin/team', icon: Users },
  { label: 'Gallery Vault', href: '/admin/gallery', icon: ImageIcon },
  { label: 'Site Settings', href: '/admin/settings', icon: Settings },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const { user, logout } = useAuth();

  return (
    <aside className="flex w-full shrink-0 flex-col border-b border-line bg-white lg:min-h-screen lg:w-64 lg:border-b-0 lg:border-r">
      {/* Brand Header */}
      <div className="flex items-center justify-between border-b border-line px-5 py-4 lg:px-6 lg:py-5">
        <Link href="/admin" className="flex items-center gap-3">
          <Image
            src={siteConfig.logo}
            alt="Jay Media Management"
            width={110}
            height={40}
            className="h-7 w-auto object-contain"
          />
          <span className="rounded-md bg-forest-soft px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-forest">
            Admin
          </span>
        </Link>

        <Link
          href="/"
          target="_blank"
          className="inline-flex items-center gap-1 rounded-lg border border-line px-2.5 py-1 text-xs font-medium text-muted transition-colors hover:text-ink lg:hidden"
        >
          <span>Live Site</span>
          <ExternalLink className="h-3 w-3" />
        </Link>
      </div>

      {/* Database Status Pill */}
      <div className="hidden border-b border-line bg-paper-deep/60 px-6 py-2.5 lg:flex lg:items-center lg:justify-between">
        <span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-ink-soft">
          <span className="h-2 w-2 rounded-full bg-emerald-600" />
          Firestore Live
        </span>
        <Database className="h-3.5 w-3.5 text-forest" />
      </div>

      {/* Navigation */}
      <nav
        aria-label="Admin Navigation"
        className="flex gap-1 overflow-x-auto px-3 py-2.5 no-scrollbar lg:flex-1 lg:flex-col lg:gap-1 lg:overflow-visible lg:px-3.5 lg:py-4"
      >
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
                'flex shrink-0 items-center gap-2.5 whitespace-nowrap rounded-lg px-3 py-2.5 text-xs font-medium transition-all duration-150',
                isActive
                  ? 'bg-forest text-white shadow-2xs'
                  : 'text-muted hover:bg-paper-deep hover:text-ink'
              )}
            >
              <Icon
                className={cn(
                  'h-4 w-4 shrink-0',
                  isActive ? 'text-white' : 'text-muted'
                )}
              />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Footer / User Session */}
      <div className="hidden border-t border-line p-4 lg:block">
        <Link
          href="/"
          target="_blank"
          className="flex items-center justify-between rounded-lg border border-line bg-paper px-3.5 py-2 text-xs font-medium text-ink transition-colors hover:border-line-strong hover:bg-paper-deep"
        >
          <span>Open Live Website</span>
          <ExternalLink className="h-3.5 w-3.5 text-forest" />
        </Link>

        <div className="mt-3 flex items-center justify-between rounded-lg bg-paper-deep/60 px-3 py-2.5">
          <div className="min-w-0 pr-2">
            <span className="block truncate text-xs font-semibold text-ink">
              {user?.email || 'admin@jaymedia.com'}
            </span>
            <span className="mt-0.5 block text-[10px] text-muted">
              Administrator
            </span>
          </div>
          <button
            type="button"
            onClick={() => logout()}
            title="Sign out"
            aria-label="Sign out"
            className="rounded-lg p-1.5 text-muted transition-colors hover:bg-white hover:text-danger"
          >
            <LogOut className="h-4 w-4" />
          </button>
        </div>
      </div>
    </aside>
  );
}
