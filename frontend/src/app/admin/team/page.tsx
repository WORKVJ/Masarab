'use client';

import { useCallback, useEffect, useState } from 'react';
import { KeyRound, Loader2, Plus, ShieldCheck, Trash2, UserX, UserCheck } from 'lucide-react';
import { api, ApiError, type TeamMember } from '@/lib/panelApi';
import { useSession } from '@/components/admin/AdminApp';
import { btn, Card, cx, ErrorNote, Field, formatDate, inputCls, PageHeader, Spinner, SuccessNote } from '@/components/admin/ui';

const NEW = { username: '', first_name: '', last_name: '', email: '', password: '', is_superuser: false };

/** Who can sign in to the panel. Administrators manage the team; staff see enquiries and contact details. */
export default function TeamPage() {
  const { user, onAuthError } = useSession();
  const [team, setTeam] = useState<TeamMember[] | null>(null);
  const [error, setError] = useState('');
  const [note, setNote] = useState('');
  const [adding, setAdding] = useState(false);
  const [form, setForm] = useState(NEW);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [busy, setBusy] = useState<number | 'new' | null>(null);

  const load = useCallback(() => {
    api<TeamMember[]>('team')
      .then(setTeam)
      .catch((e) => !onAuthError(e) && setError(e.message));
  }, [onAuthError]);

  useEffect(load, [load]);

  if (!user.is_superuser) return <ErrorNote>Only administrators can manage the team.</ErrorNote>;

  const act = async (id: number | 'new', fn: () => Promise<unknown>, success: string) => {
    setBusy(id);
    setError('');
    setNote('');
    try {
      await fn();
      setNote(success);
      load();
      return true;
    } catch (e) {
      if (!onAuthError(e)) {
        if (e instanceof ApiError) setFieldErrors(e.fields);
        setError(e instanceof Error ? e.message : 'Something went wrong.');
      }
      return false;
    } finally {
      setBusy(null);
    }
  };

  const create = async (e: React.FormEvent) => {
    e.preventDefault();
    setFieldErrors({});
    const ok = await act('new', () => api('team', { method: 'POST', body: form }), `Account “${form.username}” created. Share the password with them privately.`);
    if (ok) {
      setForm(NEW);
      setAdding(false);
    }
  };

  const update = (m: TeamMember, body: Partial<TeamMember> & { password?: string }, success: string) =>
    act(m.id, () => api(`team/${m.id}`, { method: 'PATCH', body }), success);

  const resetPassword = (m: TeamMember) => {
    const pw = window.prompt(`New password for ${m.username} (at least 8 characters, not too common):`);
    if (pw) update(m, { password: pw }, `Password changed for ${m.username}.`);
  };

  const remove = (m: TeamMember) => {
    if (window.confirm(`Delete the account “${m.username}”? They will no longer be able to sign in.`)) {
      act(m.id, () => api(`team/${m.id}`, { method: 'DELETE' }), `Account “${m.username}” deleted.`);
    }
  };

  const name = (m: TeamMember) => [m.first_name, m.last_name].filter(Boolean).join(' ') || m.username;

  return (
    <div className="space-y-5">
      <PageHeader
        title="Team"
        intro="Everyone who can sign in to this panel. Administrators can also manage the team."
        actions={
          !adding && (
            <button type="button" className={btn.primary} onClick={() => setAdding(true)}>
              <Plus className="h-4 w-4" /> Add member
            </button>
          )
        }
      />
      {note && <SuccessNote>{note}</SuccessNote>}
      {error && <ErrorNote>{error}</ErrorNote>}

      {adding && (
        <Card className="p-5 sm:p-6">
          <form onSubmit={create} className="space-y-4">
            <h2 className="text-base font-semibold text-slate-900">New team member</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Username" error={fieldErrors.username}>
                <input className={inputCls} value={form.username} onChange={(e) => setForm({ ...form, username: e.target.value })} required autoComplete="off" />
              </Field>
              <Field label="Email" error={fieldErrors.email}>
                <input className={inputCls} type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
              </Field>
              <Field label="First name">
                <input className={inputCls} value={form.first_name} onChange={(e) => setForm({ ...form, first_name: e.target.value })} />
              </Field>
              <Field label="Last name">
                <input className={inputCls} value={form.last_name} onChange={(e) => setForm({ ...form, last_name: e.target.value })} />
              </Field>
              <Field label="Password" hint="At least 8 characters. They can change it under My Account." error={fieldErrors.password}>
                <input className={inputCls} type="text" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required autoComplete="new-password" />
              </Field>
              <label className="flex items-start gap-3 self-center rounded-xl border border-slate-200 p-3">
                <input type="checkbox" className="mt-0.5 h-4 w-4 accent-[#0d7cae]" checked={form.is_superuser} onChange={(e) => setForm({ ...form, is_superuser: e.target.checked })} />
                <span className="text-sm">
                  <span className="font-semibold text-slate-800">Administrator</span>
                  <span className="block text-xs text-slate-500">Can add and remove team members.</span>
                </span>
              </label>
            </div>
            <div className="flex gap-2">
              <button type="submit" className={btn.primary} disabled={busy === 'new'}>
                {busy === 'new' && <Loader2 className="h-4 w-4 animate-spin" />} Create account
              </button>
              <button type="button" className={btn.ghost} onClick={() => { setAdding(false); setFieldErrors({}); }}>
                Cancel
              </button>
            </div>
          </form>
        </Card>
      )}

      <Card className="overflow-hidden">
        {!team ? (
          <Spinner />
        ) : (
          <ul className="divide-y divide-slate-100">
            {team.map((m) => {
              const self = m.id === user.id;
              return (
                <li key={m.id} className={cx('flex flex-col gap-3 px-5 py-4 sm:flex-row sm:items-center', !m.is_active && 'bg-slate-50')}>
                  <div className="flex min-w-0 flex-1 items-center gap-3">
                    <span className={cx('grid h-9 w-9 shrink-0 place-items-center rounded-full text-sm font-bold', m.is_active ? 'bg-sky-100 text-sky-800' : 'bg-slate-200 text-slate-500')}>
                      {name(m).charAt(0).toUpperCase()}
                    </span>
                    <div className="min-w-0">
                      <p className="flex flex-wrap items-center gap-2 text-sm font-semibold text-slate-900">
                        {name(m)}
                        {self && <span className="text-xs font-normal text-slate-500">(you)</span>}
                        {m.is_superuser && (
                          <span className="inline-flex items-center gap-1 rounded-full bg-violet-50 px-2 py-0.5 text-xs font-semibold text-violet-800 ring-1 ring-inset ring-violet-200">
                            <ShieldCheck className="h-3 w-3" /> Administrator
                          </span>
                        )}
                        {!m.is_active && <span className="rounded-full bg-slate-200 px-2 py-0.5 text-xs font-semibold text-slate-600">Disabled</span>}
                      </p>
                      <p className="truncate text-xs text-slate-500">
                        {m.username}
                        {m.email && ` · ${m.email}`} · last sign-in {m.last_login ? formatDate(m.last_login, true) : 'never'}
                      </p>
                    </div>
                  </div>
                  {!self && (
                    <div className="flex flex-wrap gap-1.5">
                      <button type="button" className={btn.ghost} disabled={busy === m.id} onClick={() => resetPassword(m)} title="Set a new password">
                        <KeyRound className="h-4 w-4" /> Password
                      </button>
                      <button
                        type="button"
                        className={btn.ghost}
                        disabled={busy === m.id}
                        onClick={() => update(m, { is_superuser: !m.is_superuser }, m.is_superuser ? `${m.username} is now staff.` : `${m.username} is now an administrator.`)}
                      >
                        <ShieldCheck className="h-4 w-4" /> {m.is_superuser ? 'Make staff' : 'Make admin'}
                      </button>
                      <button
                        type="button"
                        className={btn.ghost}
                        disabled={busy === m.id}
                        onClick={() => update(m, { is_active: !m.is_active }, m.is_active ? `${m.username} can no longer sign in.` : `${m.username} can sign in again.`)}
                      >
                        {m.is_active ? <UserX className="h-4 w-4" /> : <UserCheck className="h-4 w-4" />} {m.is_active ? 'Disable' : 'Enable'}
                      </button>
                      <button type="button" className={cx(btn.ghost, 'text-rose-600 hover:bg-rose-50')} disabled={busy === m.id} onClick={() => remove(m)} aria-label={`Delete ${m.username}`}>
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        )}
      </Card>
    </div>
  );
}
