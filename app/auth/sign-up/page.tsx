'use client';

import React, { Suspense, useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { isAllowedEmployeeEmail, ALLOWED_EMPLOYEE_EMAIL_SUFFIX } from '@/lib/constants';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { Input } from '@/components/Input';
import { Button } from '@/components/Button';

function SignUpForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get('redirect') ?? '/inspirations/upload';
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e?: React.FormEvent, isRetry = false) => {
    e?.preventDefault();
    setError(null);
    if (!isAllowedEmployeeEmail(email)) {
      setError(`Only HighLevel employee emails (${ALLOWED_EMPLOYEE_EMAIL_SUFFIX}) can sign up.`);
      return;
    }
    setLoading(true);
    try {
      const supabase = createClient();
      const { error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            username: username.trim() || undefined,
            display_name: displayName.trim() || undefined,
          },
        },
      });
      if (signUpError) {
        setError(signUpError.message);
        setLoading(false);
        return;
      }
      setSuccess(true);
      setLoading(false);
      // If email confirmation is disabled, they're already signed in
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        router.push(redirectTo);
        router.refresh();
      }
    } catch (err) {
      const isLockError = err instanceof Error && err.name === 'AbortError' && err.message.includes('steal');
      if (isLockError && !isRetry) {
        setLoading(false);
        await new Promise((r) => setTimeout(r, 300));
        handleSubmit(undefined, true);
        return;
      }
      setError(err instanceof Error ? err.message : 'Sign up failed');
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="max-w-md mx-auto px-6 py-12">
        <Breadcrumbs
          items={[
            { label: 'Home', href: '/' },
            { label: 'Auth', href: '/auth/sign-in' },
            { label: 'Sign up' },
          ]}
        />
        <div className="mt-8 bg-white border border-neutral-200 rounded-lg p-6">
          <h1 className="text-2xl font-bold text-neutral-900 mb-2">Check your email</h1>
          <p className="text-neutral-600 mb-4">
            We sent a confirmation link to <strong>{email}</strong>. Click the link to confirm your account, then sign in.
          </p>
          <Link href="/auth/sign-in">
            <Button theme="primary">Go to sign in</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto px-6 py-12">
      <Breadcrumbs
        items={[
          { label: 'Home', href: '/' },
          { label: 'Auth', href: '/auth/sign-in' },
          { label: 'Sign up' },
        ]}
      />
      <div className="mt-8 bg-white border border-neutral-200 rounded-lg p-6">
        <h1 className="text-2xl font-bold text-neutral-900 mb-2">Create an account</h1>
        <p className="text-neutral-600 mb-6">
          Sign up to upload inspirations. Your username will be your primary identifier on the leaderboard.
        </p>
        <form onSubmit={(e) => handleSubmit(e)} className="space-y-4">
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
            minLength={6}
            fullWidth
          />
          <Input
            label="Username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="johndoe"
            helperText="Unique username (used on leaderboard)"
            fullWidth
          />
          <Input
            label="Display name"
            type="text"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            placeholder="John Doe"
            helperText="Shown on your posts and leaderboard"
            fullWidth
          />
          {error && (
            <p className="text-sm text-red-600" role="alert">
              {error}
            </p>
          )}
          <Button type="submit" theme="primary" width="fill-container" disabled={loading}>
            {loading ? 'Creating account…' : 'Sign up'}
          </Button>
        </form>
        <p className="mt-4 text-sm text-neutral-600">
          Already have an account?{' '}
          <Link href={`/auth/sign-in?redirect=${encodeURIComponent(redirectTo)}`} className="text-primary-600 hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}

export default function SignUpPage() {
  return (
    <Suspense fallback={<div className="max-w-md mx-auto px-6 py-12 text-neutral-600">Loading…</div>}>
      <SignUpForm />
    </Suspense>
  );
}
