'use client';

import React, { Suspense, useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { ALLOWED_EMPLOYEE_EMAIL_SUFFIX } from '@/lib/constants';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { Input } from '@/components/Input';
import { Button } from '@/components/Button';

function SignInForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get('redirect') ?? '/inspirations/upload';
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
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
      setError(err instanceof Error ? err.message : 'Sign in failed');
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
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={`you${ALLOWED_EMPLOYEE_EMAIL_SUFFIX}`}
            required
            fullWidth
          />
          <Input
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            fullWidth
          />
          {error && (
            <p className="text-sm text-red-600" role="alert">
              {error}
            </p>
          )}
          <Button type="submit" theme="primary" width="fill-container" disabled={loading}>
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
