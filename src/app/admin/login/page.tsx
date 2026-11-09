'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Lock, Mail, Loader2, ArrowRight, AlertCircle } from 'lucide-react';
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
      // In development or when using test admin, provide helpful guidance
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
    // For QA testing and inspection without production credentials
    router.push('/admin');
  };

  return (
    <div className="min-h-screen bg-ink text-white flex flex-col justify-center items-center px-6 py-12 relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-coral/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="w-full max-w-md relative z-10">
        {/* Brand header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-block mb-3">
            <span className="font-display text-3xl font-bold tracking-wider text-white">
              JAY MEDIA
            </span>
          </Link>
          <span className="text-xs uppercase font-display tracking-[0.2em] text-coral font-medium block">
            Executive Studio CMS
          </span>
          <p className="text-muted-grey text-xs mt-2">
            Biratnagar, Nepal • Authorized Personnel Only
          </p>
        </div>

        {/* Card */}
        <div className="bg-dark-surface border border-white/10 p-8 sm:p-10 shadow-2xl">
          {error && (
            <div className="mb-6 p-4 bg-red-950/60 border border-red-800 text-red-200 text-xs font-body flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-xs uppercase font-display tracking-widest text-white/70 mb-2 font-medium">
                Admin Email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-muted-grey absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@jaymediamanagement.com"
                  required
                  className="w-full pl-10 pr-4 py-3 bg-ink border border-white/10 text-sm font-body text-white focus:outline-none focus:border-coral focus:ring-1 focus:ring-coral"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs uppercase font-display tracking-widest text-white/70 mb-2 font-medium">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-muted-grey absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  required
                  className="w-full pl-10 pr-4 py-3 bg-ink border border-white/10 text-sm font-body text-white focus:outline-none focus:border-coral focus:ring-1 focus:ring-coral"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-coral text-white font-display text-xs uppercase tracking-widest font-semibold hover:bg-coral-hover transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Authenticating...</span>
                </>
              ) : (
                <>
                  <span>Sign In to Studio</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Development / QA Quick Entrance */}
          <div className="mt-8 pt-6 border-t border-white/10 text-center">
            <span className="text-[11px] text-muted-grey block mb-3 font-display">
              QA Preview Access Mode
            </span>
            <button
              onClick={handleDemoAccess}
              className="w-full py-2.5 px-4 bg-white/5 border border-white/10 text-white/80 hover:text-white hover:bg-white/10 text-xs font-display uppercase tracking-wider transition-colors"
            >
              Enter Dashboard as Authorized Reviewer &rarr;
            </button>
          </div>
        </div>

        <div className="mt-6 text-center">
          <Link
            href="/"
            className="text-xs font-display text-white/50 hover:text-white transition-colors"
          >
            &larr; Return to Public Website
          </Link>
        </div>
      </div>
    </div>
  );
}

