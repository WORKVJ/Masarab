'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ChevronLeft, ChevronRight, ExternalLink, ImageOff, Plus, Search } from 'lucide-react';
import { api, blogState, type BlogPostData, type Page } from '@/lib/panelApi';
import { useSession } from '@/components/admin/AdminApp';
import { btn, Card, cx, ErrorNote, formatDate, inputCls, PageHeader, Spinner, StatusBadge } from '@/components/admin/ui';

const FILTERS = [
  { value: '', label: 'All' },
  { value: 'published', label: 'Published' },
  { value: 'scheduled', label: 'Scheduled' },
  { value: 'draft', label: 'Drafts' },
];
const PAGE_SIZE = 20;

export default function BlogListPage() {
  const { onAuthError } = useSession();
  const router = useRouter();
  const [status, setStatus] = useState('');
  const [search, setSearch] = useState('');
  const [q, setQ] = useState('');
  const [page, setPage] = useState(1);
  const [data, setData] = useState<Page<BlogPostData> | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const t = setTimeout(() => {
      setQ(search.trim());
      setPage(1);
    }, 350);
    return () => clearTimeout(t);
  }, [search]);

  useEffect(() => {
    let live = true;
    const p = new URLSearchParams({ page: String(page), page_size: String(PAGE_SIZE) });
    if (status) p.set('status', status);
    if (q) p.set('q', q);
    api<Page<BlogPostData>>(`blog?${p}`)
      .then((d) => {
        if (!live) return;
        setData(d);
        setError('');
      })
      .catch((e) => {
        if (live && !onAuthError(e)) setError(e.message);
      });
    return () => {
      live = false;
    };
  }, [status, q, page, onAuthError]);

  const pages = data ? Math.max(1, Math.ceil(data.count / PAGE_SIZE)) : 1;

  return (
    <div className="space-y-5">
      <PageHeader
        title="Blog"
        intro="Articles shown on the website at /blog. Drafts stay private until you publish them."
        actions={
          <>
            <a href="/blog" target="_blank" rel="noopener" className={btn.secondary}>
              <ExternalLink className="h-4 w-4" /> View blog
            </a>
            <Link href="/admin/blog/new" className={btn.primary}>
              <Plus className="h-4 w-4" /> New post
            </Link>
          </>
        }
      />

      <Card className="p-3 sm:p-4">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
          <div className="relative lg:w-80">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input type="search" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search title, summary, category…" className={cx(inputCls, 'pl-9')} aria-label="Search" />
          </div>
          <div className="flex flex-wrap gap-1.5" role="group" aria-label="Filter by status">
            {FILTERS.map((f) => (
              <button
                key={f.value}
                type="button"
                aria-pressed={status === f.value}
                onClick={() => {
                  setStatus(f.value);
                  setPage(1);
                }}
                className={cx(
                  'rounded-full px-3 py-1.5 text-xs font-semibold transition-colors',
                  status === f.value ? 'bg-[#0d7cae] text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200',
                )}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>
      </Card>

      {error && <ErrorNote>{error}</ErrorNote>}

      <Card className="overflow-hidden">
        {!data && !error ? (
          <Spinner />
        ) : !data || data.results.length === 0 ? (
          <div className="px-6 py-16 text-center">
            <p className="text-sm text-slate-500">{q || status ? 'No posts match these filters.' : 'No posts yet. Write the first one — it stays a draft until you publish it.'}</p>
            {!q && !status && (
              <Link href="/admin/blog/new" className={cx(btn.primary, 'mt-4')}>
                <Plus className="h-4 w-4" /> New post
              </Link>
            )}
          </div>
        ) : (
          <ul className="divide-y divide-slate-100">
            {data.results.map((p) => {
              const st = blogState(p);
              return (
                <li key={p.id}>
                  <button type="button" onClick={() => router.push(`/admin/blog/${p.id}`)} className="flex w-full items-center gap-4 px-4 py-3.5 text-left hover:bg-slate-50 sm:px-5">
                    <span className="h-14 w-20 shrink-0 overflow-hidden rounded-lg bg-slate-100">
                      {p.cover ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={p.cover} alt="" className="h-full w-full object-cover" />
                      ) : (
                        <span className="grid h-full w-full place-items-center text-slate-400">
                          <ImageOff className="h-4 w-4" />
                        </span>
                      )}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-sm font-semibold text-slate-900">{p.title}</span>
                      <span className="mt-0.5 block truncate text-xs text-slate-500">
                        {[p.category, p.status === 'draft' ? `Edited ${formatDate(p.updated_at)}` : formatDate(p.published_at), `${p.reading_minutes} min read`].filter(Boolean).join(' · ')}
                      </span>
                    </span>
                    <StatusBadge status={st.value} label={st.label} />
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </Card>

      {data && data.count > PAGE_SIZE && (
        <div className="flex items-center justify-between text-sm text-slate-600">
          <span>
            {(page - 1) * PAGE_SIZE + 1}–{Math.min(page * PAGE_SIZE, data.count)} of {data.count}
          </span>
          <div className="flex gap-2">
            <button type="button" className={btn.secondary} disabled={page <= 1} onClick={() => setPage(page - 1)}>
              <ChevronLeft className="h-4 w-4" /> Previous
            </button>
            <button type="button" className={btn.secondary} disabled={page >= pages} onClick={() => setPage(page + 1)}>
              Next <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
