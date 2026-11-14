'use client';

import { useEffect, useState } from 'react';
import { Check, ExternalLink, Loader2 } from 'lucide-react';
import { api, ApiError, type SiteSettings } from '@/lib/panelApi';
import { useSession } from '@/components/admin/AdminApp';
import { btn, Card, ErrorNote, Field, formatDate, inputCls, PageHeader, Spinner } from '@/components/admin/ui';

type Form = Omit<SiteSettings, 'updated_at' | 'updated_by' | 'email_configured'>;

const EMPTY: Form = {
  company: '',
  phone_display: '',
  email: '',
  address: '',
  map_url: '',
  whatsapp: '',
  working_hours: '',
  facebook: '',
  instagram: '',
  linkedin: '',
  contact_intro: '',
  notify_emails: '',
};

/** The company details shown in the website's header, footer, contact page and buttons. */
export default function ContactDetailsPage() {
  const { onAuthError } = useSession();
  const [saved, setSaved] = useState<SiteSettings | null>(null);
  const [form, setForm] = useState<Form>(EMPTY);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    api<SiteSettings>('settings')
      .then((d) => {
        setSaved(d);
        setForm(pick(d));
      })
      .catch((e) => !onAuthError(e) && setError(e.message));
  }, [onAuthError]);

  const set = (k: keyof Form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((f) => ({ ...f, [k]: e.target.value }));
    setDone(false);
  };

  const dirty = saved !== null && JSON.stringify(form) !== JSON.stringify(pick(saved));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setErrors({});
    setError('');
    try {
      const d = await api<SiteSettings>('settings', { method: 'PUT', body: form });
      setSaved(d);
      setForm(pick(d));
      setDone(true);
    } catch (err) {
      if (onAuthError(err)) return;
      if (err instanceof ApiError) setErrors(err.fields);
      setError(err instanceof Error ? err.message : 'Could not save.');
    } finally {
      setBusy(false);
    }
  };

  if (!saved) return error ? <ErrorNote>{error}</ErrorNote> : <Spinner />;

  const text = (k: keyof Form, label: string, hint?: string, type = 'text', placeholder?: string) => (
    <Field label={label} hint={hint} error={errors[k]}>
      <input className={inputCls} type={type} value={form[k]} onChange={set(k)} placeholder={placeholder} />
    </Field>
  );

  return (
    <form onSubmit={submit} className="space-y-5">
      <PageHeader
        title="Contact Details"
        intro="Shown in the website's header, footer, contact page and call / email buttons. Changes go live within a few seconds."
        actions={
          <a href="/contact" target="_blank" rel="noreferrer" className={btn.secondary}>
            <ExternalLink className="h-4 w-4" /> View contact page
          </a>
        }
      />

      <Section title="Company & address">
        {text('company', 'Company name')}
        <Field label="Address" hint="One line per row, as it should appear on the website." error={errors.address}>
          <textarea className={`${inputCls} min-h-24`} value={form.address} onChange={set('address')} />
        </Field>
        {text('map_url', 'Google Maps link', 'Opened by the "Find us" and address links.', 'url', 'https://maps.app.goo.gl/…')}
      </Section>

      <Section title="Phone, email & hours">
        <div className="grid gap-4 sm:grid-cols-2">
          {text('phone_display', 'Phone number', 'Shown on every "Call" button.', 'text', '+966 12 657 6896')}
          {text('email', 'Email address', 'Used by every "Email us" link.', 'email')}
          {text('whatsapp', 'WhatsApp number', 'Leave empty to hide WhatsApp.', 'text', '+966 55 123 4567')}
          {text('working_hours', 'Working hours', 'Leave empty to hide.', 'text', 'Sun – Thu, 8:00 AM – 5:00 PM')}
        </div>
      </Section>

      <Section title="Social media" intro="Leave a link empty to hide its icon in the footer.">
        <div className="grid gap-4 sm:grid-cols-3">
          {text('facebook', 'Facebook', undefined, 'url')}
          {text('instagram', 'Instagram', undefined, 'url')}
          {text('linkedin', 'LinkedIn', undefined, 'url')}
        </div>
      </Section>

      <Section title="Contact page">
        <Field label="Introduction" hint="The text under the “Contact Us” heading." error={errors.contact_intro}>
          <textarea className={`${inputCls} min-h-24`} value={form.contact_intro} onChange={set('contact_intro')} />
        </Field>
      </Section>

      <Section title="Email alerts" intro="Who gets an email for each new quote request or contact message.">
        <Field label="Send alerts to" hint="Separate several addresses with commas." error={errors.notify_emails}>
          <input className={inputCls} value={form.notify_emails} onChange={set('notify_emails')} placeholder="sales@masararabia.com, info@masararabia.com" />
        </Field>
        {!saved.email_configured && (
          <p className="rounded-xl bg-amber-50 px-4 py-3 text-sm text-amber-800 ring-1 ring-inset ring-amber-200">
            Email sending isn&apos;t set up on the server yet, so alerts are not sent. New enquiries still appear in this panel.
          </p>
        )}
      </Section>

      <div className="sticky bottom-0 -mx-4 border-t border-slate-200 bg-slate-50/95 px-4 py-3 backdrop-blur sm:mx-0 sm:rounded-2xl sm:border">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="text-xs text-slate-500">
            Last saved {formatDate(saved.updated_at, true)}
            {saved.updated_by && ` by ${saved.updated_by}`}
          </p>
          <div className="flex items-center gap-3">
            {done && !dirty && (
              <span className="inline-flex items-center gap-1 text-sm font-medium text-emerald-700">
                <Check className="h-4 w-4" /> Saved — live on the website
              </span>
            )}
            <button type="submit" className={btn.primary} disabled={!dirty || busy}>
              {busy && <Loader2 className="h-4 w-4 animate-spin" />} Save changes
            </button>
          </div>
        </div>
        {error && Object.keys(errors).length === 0 && (
          <div className="mt-3">
            <ErrorNote>{error}</ErrorNote>
          </div>
        )}
        {error && Object.keys(errors).length > 0 && (
          <p className="mt-2 text-sm text-rose-600">Please fix the highlighted fields.</p>
        )}
      </div>
    </form>
  );
}

function pick(d: SiteSettings): Form {
  const out = { ...EMPTY };
  for (const k of Object.keys(EMPTY) as (keyof Form)[]) out[k] = d[k] ?? '';
  return out;
}

function Section({ title, intro, children }: { title: string; intro?: string; children: React.ReactNode }) {
  return (
    <Card className="p-5 sm:p-6">
      <h2 className="text-base font-semibold text-slate-900">{title}</h2>
      {intro && <p className="mt-0.5 text-sm text-slate-500">{intro}</p>}
      <div className="mt-4 space-y-4">{children}</div>
    </Card>
  );
}
