'use client';

import { Suspense, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { AuthProvider, useAuth } from '@/lib/firebase/auth-context';
import AdminSidebar from '@/components/admin/AdminSidebar';

function AdminLayoutInner({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, loading } = useAuth();
  const isLoginPage = pathname === '/admin/login';

  useEffect(() => {
    if (!loading && !user && !isLoginPage) {
      router.replace('/admin/login');
    }
  }, [loading, user, isLoginPage, router]);

  if (isLoginPage) {
    return <main className="min-h-screen bg-paper text-ink">{children}</main>;
  }

  if (loading || !user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-paper font-sans text-sm text-muted">
        Verifying administrator session...
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-paper text-ink lg:flex-row">
      <AdminSidebar />
      <main className="flex-1 overflow-y-auto bg-paper px-5 py-8 sm:px-8 lg:px-10 lg:py-10">
        <div className="mx-auto max-w-6xl">{children}</div>
      </main>
    </div>
  );
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <Suspense
        fallback={
          <div className="flex min-h-screen items-center justify-center bg-paper font-sans text-sm text-muted">
            Initializing Studio CMS...
          </div>
        }
      >
        <AdminLayoutInner>{children}</AdminLayoutInner>
      </Suspense>
    </AuthProvider>
  );
}
