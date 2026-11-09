'use client';

import { Suspense } from 'react';
import { usePathname } from 'next/navigation';
import { AuthProvider } from '@/lib/firebase/auth-context';
import AdminSidebar from '@/components/admin/AdminSidebar';

function AdminLayoutInner({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isLoginPage = pathname === '/admin/login';

  return isLoginPage ? (
    <main className="min-h-screen bg-ink text-white">{children}</main>
  ) : (
    <div className="flex min-h-screen bg-warm-ivory text-ink">
      <AdminSidebar />
      <main className="flex-1 overflow-y-auto p-6 sm:p-10 lg:p-12">
        <div className="max-w-6xl mx-auto">{children}</div>
      </main>
    </div>
  );
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <Suspense
        fallback={
          <div className="min-h-screen bg-warm-ivory flex items-center justify-center font-display text-sm text-ink/70">
            Initializing Studio CMS...
          </div>
        }
      >
        <AdminLayoutInner>{children}</AdminLayoutInner>
      </Suspense>
    </AuthProvider>
  );
}
