'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Lock, Mail, Loader2, ArrowRight, AlertCircle, ArrowLeft } from 'lucide-react';
import { useAuth } from '@/lib/firebase/auth-context';

export default function AdminLoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await login(email, password);
      router.push('/admin');
    } catch (err: unknown) {
      setError(
        err instanceof Error
          ? err.message
          : 'Invalid credentials. Only authorized Jay Media administrators may sign in.'
      );
    } finally {
      setLoading(false);
    }
  };

  const handleDemoAccess = () => {
    router.push('/admin');
  };

  return (
    <div className="grid min-h-screen bg-paper lg:grid-cols-2">
      {/* Editorial panel */}
      <div className="relative hidden flex-col justify-between overflow-hidden bg-forest p-12 text-cream lg:flex">
        <div
          className="pointer-events-none absolute -right-24 -top-24 h-[26rem] w-[26rem] rounded-full bg-gold/10 blur-[100px]"
          aria-hidden="true"
        />
        <span
          className="pointer-events-none absolute -bottom-16 -left-6 display text-[15rem] leading-none text-cream/[0.045]"
          aria-hidden="true"
        >
          JM
        </span>

        <Link href="/" className="relative inline-flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-[0.18rem] bg-cream text-ink">
            <span className="display text-[1.3rem] leading-none">J</span>
          </span>
          <span className="flex flex-col">
            <span className="display text-[1.4rem] leading-none tracking-[-0.03em]">
              Jay Media
            </span>
            <span className="mt-1 font-mono text-[7px] uppercase leading-none tracking-[0.24em] text-cream/50">
              Management Pvt. Ltd.
            </span>
          </span>
        </Link>

        <div className="relative max-w-md">
          <span className="eyebrow text-gold">Studio operations</span>
          <p className="display mt-5 text-[clamp(2.2rem,3.5vw,3.2rem)] leading-[1.02] text-cream">
            The work behind{' '}
            <span className="serif italic text-gold">the moments.</span>
          </p>
          <p className="mt-5 text-sm leading-relaxed text-cream/65">
            Publish productions, manage the archive, and keep every client
            inquiry moving from one calm control room.
          </p>
        </div>

        <div className="relative flex items-center justify-between border-t border-cream/15 pt-5 font-mono text-[9px] uppercase tracking-[0.16em] text-cream/45">
          <span>Biratnagar, Nepal</span>
          <span>26.45° N / 87.27° E</span>
        </div>
      </div>

      {/* Form panel */}
      <div className="flex flex-col justify-center px-6 py-12 sm:px-12">
        <div className="mx-auto w-full max-w-sm">
          <div className="mb-10 flex items-center justify-between lg:hidden">
            <Link href="/" className="flex items-center gap-2.5">
              <span className="flex h-8 w-8 items-center justify-center rounded-[0.18rem] bg-ink text-paper">
                <span className="display text-[1.05rem] leading-none">J</span>
              </span>
              <span className="display text-[1.15rem] leading-none tracking-[-0.03em]">
                Jay Media
              </span>
            </Link>
            <span className="font-mono text-[8px] uppercase tracking-[0.16em] text-faint">
              Studio CMS
            </span>
          </div>

          <span className="eyebrow flex items-center gap-2.5 text-accent">
            <span className="h-px w-6 bg-accent" aria-hidden="true" />
            Authorized personnel
          </span>
          <h1 className="display mt-5 text-[clamp(2.2rem,4vw,3rem)] text-ink">
            Sign in to the studio.
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-muted">
            Use your Jay Media administrator credentials to open the control
            center.
          </p>

          {error && (
            <div
              role="alert"
              className="mt-6 flex items-start gap-3 rounded-[0.3rem] border border-accent/35 bg-accent-soft p-4 text-xs text-ink-soft"
            >
              <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            <div>
              <label
                htmlFor="admin-email"
                className="mb-2 block font-mono text-[9px] uppercase tracking-[0.16em] text-muted"
              >
                Admin email
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-faint" />
                <input
                  id="admin-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@jaymediamanagement.com"
                  required
                  className="w-full rounded-[0.3rem] border border-line bg-card py-3 pl-10 pr-4 text-sm text-ink transition-colors placeholder:text-faint focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/15"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="admin-password"
                className="mb-2 block font-mono text-[9px] uppercase tracking-[0.16em] text-muted"
              >
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-faint" />
                <input
                  id="admin-password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  required
                  className="w-full rounded-[0.3rem] border border-line bg-card py-3 pl-10 pr-4 text-sm text-ink transition-colors placeholder:text-faint focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/15"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary w-full disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Authenticating
                </>
              ) : (
                <>
                  Sign in to studio
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>
          </form>

          <div className="mt-8 border-t border-line pt-6 text-center">
            <span className="font-mono text-[8px] uppercase tracking-[0.14em] text-faint">
              QA preview access
            </span>
            <button
              onClick={handleDemoAccess}
              className="mt-3 w-full rounded-[0.3rem] border border-line-strong px-4 py-2.5 text-[11px] font-semibold uppercase tracking-[0.1em] text-ink transition-colors hover:border-ink hover:bg-paper-deep"
            >
              Enter as authorized reviewer
            </button>
          </div>

          <Link
            href="/"
            className="mt-7 inline-flex items-center gap-2 text-xs text-muted transition-colors hover:text-ink"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Return to public website
          </Link>
        </div>
      </div>
    </div>
  );
}
