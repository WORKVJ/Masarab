'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Check, Loader2, Mail, MailQuestion, MessageCircle, PhoneCall, Trash2 } from 'lucide-react';
import { api } from '@/lib/panelApi';
import { useSession } from './AdminApp';
import { btn, Card, ErrorNote, Field, formatDate, inputCls } from './ui';

/** Right-hand column of an enquiry: quick replies, status + internal notes, mark unread, delete. */
export default function EnquiryActions<T extends { status: string; notes: string; updated_at: string | null }>({
  kind,
  id,
  item,
  onChange,
  statuses,
  email,
  emailSubject,
  phone,
}: {
  kind: 'quotes' | 'messages';
  id: number;
  item: T;
  onChange: (item: T) => void;
  statuses: { value: string; label: string }[];
  email: string;
  emailSubject: string;
  phone: string;
}) {
  const router = useRouter();
  const { onAuthError, refresh } = useSession();
  const [status, setStatus] = useState(item.status);
  const [notes, setNotes] = useState(item.notes);
  const [busy, setBusy] = useState<'' | 'save' | 'unread' | 'delete'>('');
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState('');
  const dirty = status !== item.status || notes !== item.notes;
  const tel = phone.replace(/[^\d+]/g, '');
  const wa = tel.replace(/^\+/, '').replace(/^00/, '');

  const run = async (what: typeof busy, fn: () => Promise<void>) => {
    setBusy(what);
    setError('');
    try {
      await fn();
    } catch (e) {
      if (!onAuthError(e)) setError(e instanceof Error ? e.message : 'Something went wrong.');
    } finally {
      setBusy('');
    }
  };

  const save = () =>
    run('save', async () => {
      const updated = await api<T>(`${kind}/${id}`, { method: 'PATCH', body: { status, notes } });
      onChange(updated);
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
      refresh();
    });

  const markUnread = () =>
    run('unread', async () => {
      await api(`${kind}/${id}/unread`, { method: 'POST' });
      refresh();
      router.push(`/admin/${kind}`);
    });

  const remove = () => {
    if (!window.confirm('Delete this enquiry permanently? This cannot be undone.')) return;
    run('delete', async () => {
      await api(`${kind}/${id}`, { method: 'DELETE' });
      refresh();
      router.replace(`/admin/${kind}`);
    });
  };

  return (
    <div className="space-y-4">
      <Card className="p-5">
        <h2 className="text-sm font-semibold text-slate-900">Reply</h2>
        <div className="mt-3 grid gap-2">
          <a className={btn.primary} href={`mailto:${email}?subject=${encodeURIComponent(emailSubject)}`}>
            <Mail className="h-4 w-4" /> Reply by email
          </a>
          {tel && (
            <div className="grid grid-cols-2 gap-2">
              <a className={btn.secondary} href={`tel:${tel}`}>
                <PhoneCall className="h-4 w-4" /> Call
              </a>
              <a className={btn.secondary} href={`https://wa.me/${wa}`} target="_blank" rel="noreferrer">
                <MessageCircle className="h-4 w-4" /> WhatsApp
              </a>
            </div>
          )}
        </div>
      </Card>

      <Card className="p-5">
        <div className="space-y-4">
          <Field label="Status">
            <select className={inputCls} value={status} onChange={(e) => setStatus(e.target.value)}>
              {statuses.map((s) => (
                <option key={s.value} value={s.value}>
                  {s.label}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Internal notes" hint="Only your team sees these.">
            <textarea className={`${inputCls} min-h-32`} value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="e.g. Sent price on 12 Nov, follow up next week" />
          </Field>
          {error && <ErrorNote>{error}</ErrorNote>}
          <button type="button" className={`${btn.primary} w-full`} disabled={!dirty || busy !== ''} onClick={save}>
            {busy === 'save' ? <Loader2 className="h-4 w-4 animate-spin" /> : saved ? <Check className="h-4 w-4" /> : null}
            {saved ? 'Saved' : 'Save changes'}
          </button>
          {item.updated_at && <p className="text-center text-xs text-slate-400">Last updated {formatDate(item.updated_at, true)}</p>}
        </div>
      </Card>

      <div className="grid grid-cols-2 gap-2">
        <button type="button" className={btn.secondary} onClick={markUnread} disabled={busy !== ''}>
          <MailQuestion className="h-4 w-4" /> Mark unread
        </button>
        <button type="button" className={btn.danger} onClick={remove} disabled={busy !== ''}>
          {busy === 'delete' ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />} Delete
        </button>
      </div>
    </div>
  );
}
