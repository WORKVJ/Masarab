'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { ChevronLeft, ChevronRight, Download, Search } from 'lucide-react';
import { api, exportUrl, type Page } from '@/lib/panelApi';
import { useSession } from './AdminApp';
import { btn, Card, cx, ErrorNote, inputCls, PageHeader, Spinner, StatusBadge, timeAgo } from './ui';

export interface Row {
  id: number;
  title: string;
  sub: string;
  detail: string;
  status: string;
  statusLabel: string;
  unread: boolean;
  at: string;
}

const PAGE_SIZE = 20;

/** Search + status filter + pages + CSV export; the filters live in the URL so links and Back work. */
export default function EnquiryList<T>({
  kind,
  title,
  intro,
  statuses,
  columns,
  toRow,
}: {
  kind: 'quotes' | 'messages';
  title: string;
  intro: string;
  statuses: { value: string; label: string }[];
  columns: [string, string, string];
  toRow: (item: T) => Row;
}) {
  const { onAuthError, refresh } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const status = params.get('status') ?? '';
  const q = params.get('q') ?? '';
  const unread = params.get('unread') === '1';
  const page = Math.max(1, Number(params.get('page') ?? '1') || 1);

  const [search, setSearch] = useState(q);
  const [data, setData] = useState<Page<T> | null>(null);
  const [error, setError] = useState('');

  const setParams = (next: Record<string, string>) => {
    const p = new URLSearchParams(params.toString());
    for (const [k, v] of Object.entries(next)) {
      if (v) p.set(k, v);
      else p.delete(k);
    }
    if (!('page' in next)) p.delete('page');
    router.replace(`${pathname}${p.size ? `?${p}` : ''}`, { scroll: false });
  };

  // search as you type (after a short pause)
  useEffect(() => {
    if (search === q) return;
    const t = setTimeout(() => setParams({ q: search.trim() }), 350);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  const query = useMemo(() => {
    const p = new URLSearchParams();
    if (status) p.set('status', status);
    if (q) p.set('q', q);
    if (unread) p.set('unread', '1');
    return p;
  }, [status, q, unread]);

  useEffect(() => {
    let live = true;
    const p = new URLSearchParams(query);
    p.set('page', String(page));
    p.set('page_size', String(PAGE_SIZE));
    api<Page<T>>(`${kind}?${p}`)
      .then((d) => {
        if (!live) return;
        setData(d);
        setError('');
        refresh();
      })
      .catch((e) => {
        if (live && !onAuthError(e)) setError(e.message);
      });
    return () => {
      live = false;
    };
  }, [kind, query, page, onAuthError, refresh]);

  const pages = data ? Math.max(1, Math.ceil(data.count / PAGE_SIZE)) : 1;
  const rows = data?.results.map(toRow) ?? [];

  return (
    <div className="space-y-5">
      <PageHeader
        title={title}
        intro={intro}
        actions={
          <a href={exportUrl(kind, query)} className={btn.secondary}>
            <Download className="h-4 w-4" /> Export CSV
          </a>
        }
      />

      <Card className="p-3 sm:p-4">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
          <div className="relative lg:w-80">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search name, company, email, phone…"
              className={cx(inputCls, 'pl-9')}
              aria-label="Search"
            />
          </div>
          <div className="flex flex-wrap items-center gap-1.5" role="group" aria-label="Filter by status">
            <Chip on={!status} onClick={() => setParams({ status: '' })}>
              All
            </Chip>
            {statuses.map((s) => (
              <Chip key={s.value} on={status === s.value} onClick={() => setParams({ status: s.value })}>
                {s.label}
              </Chip>
            ))}
            <span className="mx-1 hidden h-5 w-px bg-slate-200 sm:block" />
            <Chip on={unread} onClick={() => setParams({ unread: unread ? '' : '1' })}>
              Unread only
            </Chip>
          </div>
        </div>
      </Card>

      {error && <ErrorNote>{error}</ErrorNote>}

      <Card className="overflow-hidden">
        {!data && !error ? (
          <Spinner />
        ) : rows.length === 0 ? (
          <p className="px-6 py-16 text-center text-sm text-slate-500">
            {q || status || unread ? 'Nothing matches these filters.' : 'Nothing here yet — enquiries from the website will appear here.'}
          </p>
        ) : (
          <>
            {/* desktop table */}
            <table className="hidden w-full text-left text-sm md:table">
              <thead className="border-b border-slate-200 bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                <tr>
                  <th className="w-6 px-4 py-3" />
                  <th className="px-2 py-3 font-medium">{columns[0]}</th>
                  <th className="px-4 py-3 font-medium">{columns[1]}</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                  <th className="px-4 py-3 text-right font-medium">{columns[2]}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {rows.map((r) => (
                  <tr key={r.id} className="cursor-pointer hover:bg-slate-50" onClick={() => router.push(`${pathname}/${r.id}`)}>
                    <td className="px-4 py-3">
                      {r.unread && <span className="block h-2 w-2 rounded-full bg-sky-500" aria-label="Unread" />}
                    </td>
                    <td className="max-w-0 px-2 py-3">
                      <Link href={`${pathname}/${r.id}`} className={cx('block truncate', r.unread ? 'font-semibold text-slate-900' : 'text-slate-800')} onClick={(e) => e.stopPropagation()}>
                        {r.title}
                      </Link>
                      <span className="block truncate text-xs text-slate-500">{r.sub}</span>
                    </td>
                    <td className="max-w-0 px-4 py-3 text-slate-600">
                      <span className="block truncate">{r.detail}</span>
                    </td>
                    <td className="px-4 py-3">
                      <StatusBadge status={r.status} label={r.statusLabel} />
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 text-right text-slate-500">{timeAgo(r.at)}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* mobile cards */}
            <ul className="divide-y divide-slate-100 md:hidden">
              {rows.map((r) => (
                <li key={r.id}>
                  <Link href={`${pathname}/${r.id}`} className="block px-4 py-3.5 active:bg-slate-50">
                    <div className="flex items-center gap-2">
                      {r.unread && <span className="h-2 w-2 shrink-0 rounded-full bg-sky-500" aria-label="Unread" />}
                      <span className={cx('min-w-0 flex-1 truncate text-sm', r.unread ? 'font-semibold text-slate-900' : 'text-slate-800')}>{r.title}</span>
                      <span className="shrink-0 text-xs text-slate-500">{timeAgo(r.at)}</span>
                    </div>
                    <p className="mt-0.5 truncate text-xs text-slate-500">{r.sub}</p>
                    <div className="mt-2 flex items-center justify-between gap-2">
                      <span className="min-w-0 truncate text-xs text-slate-600">{r.detail}</span>
                      <StatusBadge status={r.status} label={r.statusLabel} />
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </>
        )}
      </Card>

      {data && data.count > PAGE_SIZE && (
        <div className="flex items-center justify-between text-sm text-slate-600">
          <span>
            {(page - 1) * PAGE_SIZE + 1}–{Math.min(page * PAGE_SIZE, data.count)} of {data.count}
          </span>
          <div className="flex gap-2">
            <button type="button" className={btn.secondary} disabled={page <= 1} onClick={() => setParams({ page: String(page - 1) })}>
              <ChevronLeft className="h-4 w-4" /> Previous
            </button>
            <button type="button" className={btn.secondary} disabled={page >= pages} onClick={() => setParams({ page: String(page + 1) })}>
              Next <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function Chip({ on, onClick, children }: { on: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={on}
      className={cx(
        'rounded-full px-3 py-1.5 text-xs font-semibold transition-colors',
        on ? 'bg-[#0d7cae] text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200',
      )}
    >
      {children}
    </button>
  );
}
