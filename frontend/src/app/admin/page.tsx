'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Inbox, Mail, Newspaper, Trophy } from 'lucide-react';
import { api, QUOTE_STATUSES, type Dashboard, type Page } from '@/lib/panelApi';
import { useSession } from '@/components/admin/AdminApp';
import ActivityChart from '@/components/admin/ActivityChart';
import { Card, cx, ErrorNote, formatDate, PageHeader, Spinner, StatusBadge } from '@/components/admin/ui';

export default function DashboardPage() {
  const { user, onAuthError } = useSession();
  const [data, setData] = useState<Dashboard | null>(null);
  const [blog, setBlog] = useState<{ total: number; live: number } | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    api<Dashboard>('dashboard')
      .then(setData)
      .catch((e) => !onAuthError(e) && setError(e.message));
    Promise.all([api<Page<unknown>>('blog?page_size=1'), api<Page<unknown>>('blog?status=published&page_size=1')])
      .then(([all, live]) => setBlog({ total: all.count, live: live.count }))
      .catch(() => {});
  }, [onAuthError]);

  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';

  // quote requests and contact messages together, newest first
  const latest = data
    ? [
        ...data.recent_quotes.map((q) => ({
          key: `q${q.id}`,
          href: `/admin/quotes/${q.id}`,
          kind: 'Quote request',
          name: q.full_name,
          email: q.email,
          company: q.company_name,
          snippet: q.specifications_notes || q.product_category,
          at: q.created_at,
          status: q.status,
          statusLabel: q.status_label,
          unread: !q.read_at,
        })),
        ...data.recent_messages.map((m) => ({
          key: `m${m.id}`,
          href: `/admin/messages/${m.id}`,
          kind: 'Contact message',
          name: m.name,
          email: m.email,
          company: m.subject,
          snippet: m.message,
          at: m.created_at,
          status: m.status,
          statusLabel: m.status_label,
          unread: !m.read_at,
        })),
      ]
        .sort((a, b) => b.at.localeCompare(a.at))
        .slice(0, 6)
    : [];

  return (
    <div className="space-y-6 sm:space-y-8">
      <PageHeader title="Dashboard Overview" intro={`${greeting}, ${user.name.split(' ')[0]} — here is what came in through the website.`} />
      {error && <ErrorNote>{error}</ErrorNote>}
      {!data && !error && <Spinner />}
      {data && (
        <>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4 sm:gap-5">
            <Stat icon={Inbox} label="Quote Requests" value={data.quotes.total} badge={`${data.quotes.new} New`} tone="amber" href="/admin/quotes" />
            <Stat icon={Mail} label="Contact Messages" value={data.messages.total} badge={`${data.messages.new} New`} tone="amber" href="/admin/messages" />
            <Stat icon={Newspaper} label="Blog Articles" value={blog?.total ?? 0} badge={`${blog?.live ?? 0} Live`} tone="green" href="/admin/blog" />
            <Stat icon={Trophy} label="Quotes Won" value={data.quotes.by_status.closed ?? 0} badge={`of ${data.quotes.total}`} tone="slate" href="/admin/quotes?status=closed" />
          </div>

          <Card className="overflow-hidden">
            <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-5 sm:px-7 sm:py-6">
              <div>
                <h2 className="text-lg font-bold text-slate-900">Latest Incoming Inquiries</h2>
                <p className="mt-0.5 text-sm text-slate-500">Recent quote requests and messages submitted via the website</p>
              </div>
              <Link
                href="/admin/quotes"
                className="inline-flex items-center gap-2 rounded-full bg-amber-50 px-4 py-2 text-sm font-semibold text-amber-800 ring-1 ring-inset ring-amber-300 hover:bg-amber-100"
              >
                View All Leads <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            {latest.length === 0 ? (
              <p className="border-t border-slate-100 px-7 py-12 text-center text-sm text-slate-500">
                No enquiries yet — they appear here as soon as someone uses the website forms.
              </p>
            ) : (
              <>
                {/* desktop table */}
                <table className="hidden w-full text-left text-sm md:table">
                  <thead className="border-y border-slate-200 bg-slate-50/70 text-xs uppercase tracking-wide text-slate-500">
                    <tr>
                      <th className="px-7 py-3.5 font-semibold">Contact</th>
                      <th className="px-4 py-3.5 font-semibold">Company / Subject</th>
                      <th className="px-4 py-3.5 font-semibold">Message Snippet</th>
                      <th className="px-4 py-3.5 font-semibold">Date</th>
                      <th className="px-4 py-3.5 font-semibold">Status</th>
                      <th className="px-7 py-3.5 text-right font-semibold">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {latest.map((it) => (
                      <tr key={it.key} className="hover:bg-slate-50/60">
                        <td className="w-[22%] max-w-0 px-7 py-4">
                          <span className={cx('block truncate', it.unread ? 'font-bold text-slate-900' : 'font-semibold text-slate-800')}>{it.name}</span>
                          <span className="block truncate text-xs text-slate-500">{it.email}</span>
                        </td>
                        <td className="w-[22%] max-w-0 px-4 py-4">
                          <span className="block truncate text-slate-800">{it.company || '—'}</span>
                          <span className="block text-xs text-slate-400">{it.kind}</span>
                        </td>
                        <td className="max-w-0 px-4 py-4 text-slate-600">
                          <span className="block truncate">{it.snippet}</span>
                        </td>
                        <td className="whitespace-nowrap px-4 py-4 text-slate-500">{formatDate(it.at)}</td>
                        <td className="px-4 py-4">
                          <StatusBadge status={it.status} label={it.statusLabel} />
                        </td>
                        <td className="px-7 py-4 text-right">
                          <Link href={it.href} className="font-semibold text-amber-700 hover:text-amber-800 hover:underline">
                            Details
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {/* mobile cards */}
                <ul className="divide-y divide-slate-100 border-t border-slate-100 md:hidden">
                  {latest.map((it) => (
                    <li key={it.key}>
                      <Link href={it.href} className="block px-5 py-4 active:bg-slate-50">
                        <div className="flex items-center justify-between gap-3">
                          <span className={cx('min-w-0 truncate text-sm', it.unread ? 'font-bold text-slate-900' : 'font-semibold text-slate-800')}>{it.name}</span>
                          <StatusBadge status={it.status} label={it.statusLabel} />
                        </div>
                        <p className="mt-0.5 truncate text-xs text-slate-500">
                          {it.kind} · {it.company || it.email} · {formatDate(it.at)}
                        </p>
                        <p className="mt-1.5 line-clamp-2 text-sm text-slate-600">{it.snippet}</p>
                      </Link>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </Card>

          <Card className="p-5 sm:p-7">
            <h2 className="text-lg font-bold text-slate-900">Enquiries, last 30 days</h2>
            <ActivityChart days={data.last_30_days} />
          </Card>

          <div className="grid gap-6 lg:grid-cols-2">
            <Card className="p-5 sm:p-7">
              <h2 className="text-lg font-bold text-slate-900">Quote pipeline</h2>
              <ul className="mt-4 space-y-3">
                {QUOTE_STATUSES.map((s) => {
                  const n = data.quotes.by_status[s.value] ?? 0;
                  const pct = data.quotes.total ? (n / data.quotes.total) * 100 : 0;
                  return (
                    <li key={s.value}>
                      <Link href={`/admin/quotes?status=${s.value}`} className="group block">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-slate-700 group-hover:text-amber-700">{s.label}</span>
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

            <Card className="p-5 sm:p-7">
              <h2 className="text-lg font-bold text-slate-900">Most requested products</h2>
              {data.top_products.length === 0 ? (
                <p className="mt-4 text-sm text-slate-500">No quote requests yet.</p>
              ) : (
                <ol className="mt-4 divide-y divide-slate-100">
                  {data.top_products.map((p, i) => (
                    <li key={p.product_category} className="flex items-center gap-3 py-2.5 text-sm">
                      <span className="w-5 text-right font-mono text-xs text-slate-400">{i + 1}</span>
                      <Link href={`/admin/quotes?q=${encodeURIComponent(p.product_category)}`} className="min-w-0 flex-1 truncate text-slate-700 hover:text-amber-700">
                        {p.product_category || '—'}
                      </Link>
                      <span className="font-semibold tabular-nums text-slate-900">{p.n}</span>
                    </li>
                  ))}
                </ol>
              )}
            </Card>
          </div>
        </>
      )}
    </div>
  );
}

const TONES = {
  amber: 'bg-amber-50 text-amber-800 ring-amber-300',
  green: 'bg-emerald-50 text-emerald-800 ring-emerald-200',
  slate: 'bg-slate-100 text-slate-700 ring-slate-200',
};

/** Stat card: uppercase label, icon box, big number and a small coloured badge. */
function Stat({
  icon: Icon,
  label,
  value,
  badge,
  tone,
  href,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: number;
  badge: string;
  tone: keyof typeof TONES;
  href: string;
}) {
  return (
    <Link href={href} className="block">
      <Card className="h-full p-5 sm:p-6 transition-[border-color,box-shadow] hover:border-amber-200 hover:shadow-[0_12px_30px_-20px_rgba(180,83,9,0.45)]">
        <div className="flex items-start justify-between gap-3">
          <span className="pt-2 text-xs font-bold uppercase tracking-[0.12em] text-slate-500">{label}</span>
          <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-slate-200 text-slate-600">
            <Icon className="h-5 w-5" />
          </span>
        </div>
        <div className="mt-4 flex items-end justify-between gap-3">
          <span className="text-4xl font-black tabular-nums tracking-tight text-slate-950">{value}</span>
          <span className={cx('mb-1 rounded-md px-2 py-0.5 text-xs font-bold ring-1 ring-inset', TONES[tone])}>{badge}</span>
        </div>
      </Card>
    </Link>
  );
}
