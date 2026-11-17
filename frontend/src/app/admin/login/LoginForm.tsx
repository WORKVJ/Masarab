'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { Loader2, LockKeyhole } from 'lucide-react';
import { api, ApiError } from '@/lib/panelApi';
import { btn, ErrorNote, Field, inputCls } from '@/components/admin/ui';

export default function LoginForm() {
  const router = useRouter();
  const params = useSearchParams();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  // only ever return to a page inside the panel
  const next = params.get('next') ?? '';
  const target = next.startsWith('/admin') && !next.startsWith('/admin/login') ? next : '/admin';

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setError('');
    try {
      await api('auth/login', { method: 'POST', body: { username, password } });
      router.replace(target);
    } catch (err) {
      setError(
        err instanceof ApiError && err.status === 429
          ? 'Too many attempts. Wait a minute and try again.'
          : err instanceof Error
            ? err.message
            : 'Sign-in failed.',
      );
      setBusy(false);
    }
  };

  return (
    <div className="grid min-h-screen place-items-center bg-[#04121f] px-4 py-12">
      <div className="w-full max-w-sm">
        <div className="mb-8 flex justify-center">
          <Image src="/images/logo-white.png" alt="Masar Arabia" width={170} height={74} className="h-12 w-auto" priority />
        </div>
        <form onSubmit={submit} className="rounded-2xl bg-white p-6 shadow-xl sm:p-8">
          <div className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-amber-50 text-amber-700">
              <LockKeyhole className="h-5 w-5" />
            </span>
            <div>
              <h1 className="text-lg font-bold text-slate-900">Admin panel</h1>
              <p className="text-sm text-slate-500">Sign in with your team account</p>
            </div>
          </div>
          <div className="mt-6 space-y-4">
            <Field label="Username">
              <input className={inputCls} value={username} onChange={(e) => setUsername(e.target.value)} autoComplete="username" autoFocus required />
            </Field>
            <Field label="Password">
              <input className={inputCls} type="password" value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="current-password" required />
            </Field>
            {error && <ErrorNote>{error}</ErrorNote>}
            <button type="submit" disabled={busy} className={`${btn.primary} w-full h-11`}>
              {busy && <Loader2 className="h-4 w-4 animate-spin" />} Sign in
            </button>
          </div>
        </form>
        <p className="mt-6 text-center text-xs text-white/40">Masar Arabia First Trading Company</p>
      </div>
    </div>
  );
}
