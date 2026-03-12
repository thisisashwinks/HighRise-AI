'use client';

import React, { Suspense, useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { createClient, isAuthConfigured } from '@/lib/supabase/client';
import { ALLOWED_EMPLOYEE_EMAIL_SUFFIX } from '@/lib/constants';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { Input } from '@/components/Input';
import { Button } from '@/components/Button';

const AUTH_NOT_CONFIGURED_MESSAGE = 'Sign-in is not configured. Add Supabase URL and anon key to your environment (see docs/SUPABASE_AUTH_SETUP.md) to enable sign-in.';

function SignInForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get('redirect') ?? '/inspirations/upload';
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const authConfigured = isAuthConfigured();

  const handleSubmit = async (e?: React.FormEvent, isRetry = false) => {
    e?.preventDefault();
    setError(null);
    if (!authConfigured) {
      setError(AUTH_NOT_CONFIGURED_MESSAGE);
      return;
    }
    setLoading(true);
    try {
      const supabase = createClient();
      const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });
      if (signInError) {
        setError(signInError.message);
        setLoading(false);
        return;
      }
      router.push(redirectTo);
      router.refresh();
    } catch (err) {
      const isLockError = err instanceof Error && err.name === 'AbortError' && err.message.includes('steal');
      if (isLockError && !isRetry) {
        setLoading(false);
        await new Promise((r) => setTimeout(r, 300));
        handleSubmit(undefined, true);
        return;
      }
      const message = err instanceof Error ? err.message : 'Sign in failed';
      setError(message.includes('NEXT_PUBLIC_SUPABASE') ? AUTH_NOT_CONFIGURED_MESSAGE : message);
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto px-6 py-12">
      <Breadcrumbs
        items={[
          { label: 'Home', href: '/' },
          { label: 'Inspirations', href: '/inspirations' },
          { label: 'Sign in' },
        ]}
      />
      <div className="mt-8 bg-white border border-neutral-200 rounded-lg p-6">
        <h1 className="text-2xl font-bold text-neutral-900 mb-2">Sign in</h1>
        <p className="text-neutral-600 mb-6">
          Sign in to upload inspirations and appear on the leaderboard.
        </p>
        {!authConfigured && (
          <div className="mb-4 p-3 rounded-lg bg-amber-50 border border-amber-200">
            <p className="text-sm text-amber-800" role="alert">
              {AUTH_NOT_CONFIGURED_MESSAGE}
            </p>
            <p className="text-xs text-amber-700 mt-1">
              See <code className="bg-amber-100 px-1 rounded">docs/SUPABASE_AUTH_SETUP.md</code> for setup steps.
            </p>
          </div>
        )}
        <form onSubmit={(e) => handleSubmit(e)} className="space-y-4">
          <Input
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={`you${ALLOWED_EMPLOYEE_EMAIL_SUFFIX}`}
            required
            fullWidth
            disabled={!authConfigured}
          />
          <Input
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            fullWidth
            disabled={!authConfigured}
          />
          {error && authConfigured && (
            <p className="text-sm text-red-600" role="alert">
              {error}
            </p>
          )}
          <Button type="submit" theme="primary" width="fill-container" disabled={loading || !authConfigured}>
            {loading ? 'Signing in…' : 'Sign in'}
          </Button>
        </form>
        <p className="mt-4 text-sm text-neutral-600">
          Don&apos;t have an account?{' '}
          <Link href={`/auth/sign-up?redirect=${encodeURIComponent(redirectTo)}`} className="text-primary-600 hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}

export default function SignInPage() {
  return (
    <Suspense fallback={<div className="max-w-md mx-auto px-6 py-12 text-neutral-600">Loading…</div>}>
      <SignInForm />
    </Suspense>
  );
}
