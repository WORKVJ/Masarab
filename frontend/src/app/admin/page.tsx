'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, FileText, Inbox, Mail, Trophy } from 'lucide-react';
import { api, QUOTE_STATUSES, type Dashboard } from '@/lib/panelApi';
import { useSession } from '@/components/admin/AdminApp';
import ActivityChart from '@/components/admin/ActivityChart';
import { Card, ErrorNote, PageHeader, Spinner, StatusBadge, timeAgo } from '@/components/admin/ui';

export default function DashboardPage() {
  const { user, onAuthError } = useSession();
  const [data, setData] = useState<Dashboard | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    api<Dashboard>('dashboard')
      .then(setData)
      .catch((e) => !onAuthError(e) && setError(e.message));
  }, [onAuthError]);

  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';

  return (
    <div className="space-y-6">
      <PageHeader title={`${greeting}, ${user.name.split(' ')[0]}`} intro="Here is what came in through the website." />
      {error && <ErrorNote>{error}</ErrorNote>}
      {!data && !error && <Spinner />}
      {data && (
        <>
          <div className="grid grid-cols-2 gap-3 lg:grid-cols-4 sm:gap-4">
            <Stat icon={Inbox} label="New quote requests" value={data.quotes.new} href="/admin/quotes?status=pending" note={`${data.quotes.unread} unread`} />
            <Stat icon={Mail} label="New messages" value={data.messages.new} href="/admin/messages?status=new" note={`${data.messages.unread} unread`} />
            <Stat icon={FileText} label="Enquiries this month" value={data.quotes.this_month + data.messages.this_month} note={`${data.quotes.this_month} quotes · ${data.messages.this_month} messages`} />
            <Stat icon={Trophy} label="Quotes won" value={data.quotes.by_status.closed ?? 0} note={`of ${data.quotes.total} quote requests`} />
          </div>

          <Card className="p-5 sm:p-6">
            <h2 className="text-base font-semibold text-slate-900">Enquiries, last 30 days</h2>
            <ActivityChart days={data.last_30_days} />
          </Card>

          <div className="grid gap-6 lg:grid-cols-2">
            <Card className="p-5 sm:p-6">
              <h2 className="text-base font-semibold text-slate-900">Quote pipeline</h2>
              <ul className="mt-4 space-y-3">
                {QUOTE_STATUSES.map((s) => {
                  const n = data.quotes.by_status[s.value] ?? 0;
                  const pct = data.quotes.total ? (n / data.quotes.total) * 100 : 0;
                  return (
                    <li key={s.value}>
                      <Link href={`/admin/quotes?status=${s.value}`} className="group block">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-slate-700 group-hover:text-[#0d7cae]">{s.label}</span>
                          <span className="font-semibold tabular-nums text-slate-900">{n}</span>
                        </div>
                        <div className="mt-1.5 h-2 rounded-full bg-slate-100">
                          <div className="h-2 rounded-full bg-[#2a78d6]" style={{ width: `${Math.max(pct, n ? 2 : 0)}%` }} />
                        </div>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </Card>

            <Card className="p-5 sm:p-6">
              <h2 className="text-base font-semibold text-slate-900">Most requested products</h2>
              {data.top_products.length === 0 ? (
                <p className="mt-4 text-sm text-slate-500">No quote requests yet.</p>
              ) : (
                <ol className="mt-4 divide-y divide-slate-100">
                  {data.top_products.map((p, i) => (
                    <li key={p.product_category} className="flex items-center gap-3 py-2.5 text-sm">
                      <span className="w-5 text-right font-mono text-xs text-slate-400">{i + 1}</span>
                      <Link href={`/admin/quotes?q=${encodeURIComponent(p.product_category)}`} className="min-w-0 flex-1 truncate text-slate-700 hover:text-[#0d7cae]">
                        {p.product_category || '—'}
                      </Link>
                      <span className="font-semibold tabular-nums text-slate-900">{p.n}</span>
                    </li>
                  ))}
                </ol>
              )}
            </Card>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <Recent
              title="Latest quote requests"
              href="/admin/quotes"
              empty="No quote requests yet."
              items={data.recent_quotes.map((q) => ({
                id: q.id,
                href: `/admin/quotes/${q.id}`,
                title: q.company_name || q.full_name,
                sub: `${q.product_category} · ${q.rfq_number}`,
                status: q.status,
                statusLabel: q.status_label,
                unread: !q.read_at,
                at: q.created_at,
              }))}
            />
            <Recent
              title="Latest messages"
              href="/admin/messages"
              empty="No messages yet."
              items={data.recent_messages.map((m) => ({
                id: m.id,
                href: `/admin/messages/${m.id}`,
                title: m.name,
                sub: m.subject,
                status: m.status,
                statusLabel: m.status_label,
                unread: !m.read_at,
                at: m.created_at,
              }))}
            />
          </div>
        </>
      )}
    </div>
  );
}

function Stat({
  icon: Icon,
  label,
  value,
  note,
  href,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: number;
  note: string;
  href?: string;
}) {
  const body = (
    <Card className="h-full p-4 sm:p-5 transition-colors hover:border-slate-300">
      <div className="flex items-center gap-2 text-sm text-slate-500">
        <Icon className="h-4 w-4 text-[#0d7cae]" />
        <span className="truncate">{label}</span>
      </div>
      <p className="mt-2 text-3xl font-bold tabular-nums tracking-tight text-slate-900">{value}</p>
      <p className="mt-1 truncate text-xs text-slate-500">{note}</p>
    </Card>
  );
  return href ? (
    <Link href={href} className="block">
      {body}
    </Link>
  ) : (
    body
  );
}

function Recent({
  title,
  href,
  empty,
  items,
}: {
  title: string;
  href: string;
  empty: string;
  items: { id: number; href: string; title: string; sub: string; status: string; statusLabel: string; unread: boolean; at: string }[];
}) {
  return (
    <Card>
      <div className="flex items-center justify-between px-5 pt-5 sm:px-6">
        <h2 className="text-base font-semibold text-slate-900">{title}</h2>
        <Link href={href} className="inline-flex items-center gap-1 text-sm font-semibold text-[#0d7cae] hover:underline">
          View all <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
      {items.length === 0 ? (
        <p className="px-5 py-8 text-sm text-slate-500 sm:px-6">{empty}</p>
      ) : (
        <ul className="mt-3 divide-y divide-slate-100">
          {items.map((it) => (
            <li key={it.id}>
              <Link href={it.href} className="flex items-center gap-3 px-5 py-3 hover:bg-slate-50 sm:px-6">
                <span className={`h-2 w-2 shrink-0 rounded-full ${it.unread ? 'bg-sky-500' : 'bg-transparent'}`} aria-label={it.unread ? 'Unread' : undefined} />
                <span className="min-w-0 flex-1">
                  <span className={`block truncate text-sm ${it.unread ? 'font-semibold text-slate-900' : 'text-slate-700'}`}>{it.title}</span>
                  <span className="block truncate text-xs text-slate-500">{it.sub}</span>
                </span>
                <span className="hidden sm:block">
                  <StatusBadge status={it.status} label={it.statusLabel} />
                </span>
                <span className="w-20 shrink-0 text-right text-xs text-slate-500">{timeAgo(it.at)}</span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </Card>
  );
}
