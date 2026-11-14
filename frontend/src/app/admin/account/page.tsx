'use client';

import { useState } from 'react';
import { Loader2 } from 'lucide-react';
import { api } from '@/lib/panelApi';
import { useSession } from '@/components/admin/AdminApp';
import { btn, Card, ErrorNote, Field, inputCls, PageHeader, SuccessNote } from '@/components/admin/ui';

export default function AccountPage() {
  const { user, onAuthError } = useSession();
  const [current, setCurrent] = useState('');
  const [next, setNext] = useState('');
  const [repeat, setRepeat] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [done, setDone] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setDone(false);
    if (next !== repeat) {
      setError('The two new passwords are not the same.');
      return;
    }
    setBusy(true);
    try {
      await api('auth/password', { method: 'POST', body: { current_password: current, new_password: next } });
      setDone(true);
      setCurrent('');
      setNext('');
      setRepeat('');
    } catch (err) {
      if (!onAuthError(err)) setError(err instanceof Error ? err.message : 'Could not change the password.');
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="max-w-xl space-y-5">
      <PageHeader title="My Account" />
      <Card className="p-5 sm:p-6">
        <dl className="grid gap-4 sm:grid-cols-2">
          <div>
            <dt className="text-xs text-slate-500">Name</dt>
            <dd className="mt-0.5 text-sm font-semibold text-slate-900">{user.name}</dd>
          </div>
          <div>
            <dt className="text-xs text-slate-500">Username</dt>
            <dd className="mt-0.5 text-sm text-slate-900">{user.username}</dd>
          </div>
          <div>
            <dt className="text-xs text-slate-500">Email</dt>
            <dd className="mt-0.5 text-sm text-slate-900">{user.email || '—'}</dd>
          </div>
          <div>
            <dt className="text-xs text-slate-500">Role</dt>
            <dd className="mt-0.5 text-sm text-slate-900">{user.is_superuser ? 'Administrator' : 'Staff'}</dd>
          </div>
        </dl>
      </Card>

      <Card className="p-5 sm:p-6">
        <form onSubmit={submit} className="space-y-4">
          <h2 className="text-base font-semibold text-slate-900">Change password</h2>
          <Field label="Current password">
            <input className={inputCls} type="password" value={current} onChange={(e) => setCurrent(e.target.value)} autoComplete="current-password" required />
          </Field>
          <Field label="New password" hint="At least 8 characters; avoid common words and only numbers.">
            <input className={inputCls} type="password" value={next} onChange={(e) => setNext(e.target.value)} autoComplete="new-password" required />
          </Field>
          <Field label="Repeat new password">
            <input className={inputCls} type="password" value={repeat} onChange={(e) => setRepeat(e.target.value)} autoComplete="new-password" required />
          </Field>
          {error && <ErrorNote>{error}</ErrorNote>}
          {done && <SuccessNote>Password changed. You stay signed in on this device.</SuccessNote>}
          <button type="submit" className={btn.primary} disabled={busy}>
            {busy && <Loader2 className="h-4 w-4 animate-spin" />} Change password
          </button>
        </form>
      </Card>
    </div>
  );
}
