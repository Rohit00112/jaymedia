'use client';

import { Suspense } from 'react';
import { usePathname } from 'next/navigation';
import { AuthProvider } from '@/lib/firebase/auth-context';
import AdminSidebar from '@/components/admin/AdminSidebar';

function AdminLayoutInner({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isLoginPage = pathname === '/admin/login';

  return isLoginPage ? (
    <main className="min-h-screen bg-black text-white font-body">{children}</main>
  ) : (
    <div className="flex min-h-screen bg-black text-white font-body">
      <AdminSidebar />
      <main className="flex-1 overflow-y-auto p-6 sm:p-10 lg:p-12 bg-black">
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
          <div className="min-h-screen bg-black flex items-center justify-center font-body text-sm text-[#eef9ff]/70">
            Initializing Studio CMS...
          </div>
        }
      >
        <AdminLayoutInner>{children}</AdminLayoutInner>
      </Suspense>
    </AuthProvider>
  );
}
