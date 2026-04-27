'use client';

import { Suspense, useState, type FormEvent } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button, Input } from '@secureloop/ui';
import { useAuth } from '../../lib/auth';
import { ApiError } from '../../lib/api';
import * as s from './page.css';

function LoginForm() {
  const router = useRouter();
  const params = useSearchParams();
  const next = params.get('next') ?? '/admin/tenants';
  const { login } = useAuth();
  const [email, setEmail] = useState('admin@secureloop.dev');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      await login(email, password);
      router.replace(next);
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err.status === 401 ? 'Invalid email or password' : err.message);
      } else if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Login failed');
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form className={s.card} onSubmit={onSubmit} aria-label="Sign in to SecureLoop">
      <div className={s.brandRow}>
        <span className={s.brandGlyph}>SL</span>
        <span className={s.brandWord}>SecureLoop</span>
      </div>
      <h1 className={s.title}>Sign in</h1>
      <p className={s.subtitle}>PTOps Suite — platform admin and operations</p>

      <label className={s.fieldLabel}>
        <span>Email</span>
        <Input
          type="email"
          autoComplete="username"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </label>

      <label className={s.fieldLabel}>
        <span>Password</span>
        <Input
          type="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </label>

      {error && (
        <div className={s.error} role="alert">
          {error}
        </div>
      )}

      <Button type="submit" variant="primary" size="md" disabled={submitting}>
        {submitting ? 'Signing in…' : 'Sign in'}
      </Button>

      <p className={s.hint}>SSO and SAML pending IdP configuration (ADMIN-04).</p>
    </form>
  );
}

export default function LoginPage() {
  return (
    <main className={s.page}>
      <Suspense fallback={<div className={s.card}>Loading…</div>}>
        <LoginForm />
      </Suspense>
    </main>
  );
}
