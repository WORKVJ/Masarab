'use client';

import { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, ExternalLink, ImagePlus, Loader2, Trash2, X } from 'lucide-react';
import { api, ApiError, blogState, uploadImage, type BlogPostData, type BlogStatus } from '@/lib/panelApi';
import { useSession } from './AdminApp';
import { btn, Card, cx, ErrorNote, Field, formatDate, inputCls, Spinner, StatusBadge, SuccessNote } from './ui';

// the editor is browser-only and fairly large, so it loads separately
const RichTextEditor = dynamic(() => import('./RichTextEditor'), {
  ssr: false,
  loading: () => <div className="h-[470px] animate-pulse rounded-2xl border border-slate-200 bg-slate-50" />,
});

type Form = {
  title: string;
  slug: string;
  excerpt: string;
  body: string;
  cover: string;
  cover_alt: string;
  category: string;
  author: string;
  status: BlogStatus;
  published_at: string; // datetime-local value (browser time), '' = when published
  seo_title: string;
  seo_description: string;
};

const EMPTY: Form = {
  title: '',
  slug: '',
  excerpt: '',
  body: '',
  cover: '',
  cover_alt: '',
  category: '',
  author: 'Masar Arabia',
  status: 'draft',
  published_at: '',
  seo_title: '',
  seo_description: '',
};

const slugify = (s: string) =>
  s
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/[\s-]+/g, '-')
    .slice(0, 200);

const toLocalInput = (iso: string | null) => {
  if (!iso) return '';
  const d = new Date(iso);
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
};

const fromPost = (p: BlogPostData): Form => ({
  title: p.title,
  slug: p.slug,
  excerpt: p.excerpt,
  body: p.body,
  cover: p.cover,
  cover_alt: p.cover_alt,
  category: p.category,
  author: p.author,
  status: p.status,
  published_at: toLocalInput(p.published_at),
  seo_title: p.seo_title,
  seo_description: p.seo_description,
});

const savedNote = (p: BlogPostData) => {
  const st = blogState(p).value;
  if (st === 'draft') return 'Draft saved. It is not visible on the website.';
  if (st === 'scheduled') return `Scheduled — it appears on the website on ${formatDate(p.published_at, true)}.`;
  return 'Published — the article is live on the website.';
};

/** Write / edit one blog post. `id` undefined = new post. */
export default function BlogEditor({ id }: { id?: number }) {
  const { onAuthError } = useSession();
  const router = useRouter();
  const [post, setPost] = useState<BlogPostData | null>(null);
  const [form, setForm] = useState<Form>(EMPTY);
  const [saved, setSaved] = useState<Form>(EMPTY);
  const [loading, setLoading] = useState(Boolean(id));
  const [busy, setBusy] = useState<'' | 'save' | 'delete' | 'cover'>('');
  const [error, setError] = useState('');
  const [note, setNote] = useState('');
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [slugTouched, setSlugTouched] = useState(Boolean(id));
  const [categories, setCategories] = useState<string[]>([]);
  const coverRef = useRef<HTMLInputElement>(null);
  const [openedAt] = useState(() => Date.now()); // "now" for the schedule hint

  useEffect(() => {
    api<string[]>('blog/categories').then(setCategories).catch(() => {});
    if (!id) return;
    api<BlogPostData>(`blog/${id}`)
      .then((p) => {
        setPost(p);
        setForm(fromPost(p));
        setSaved(fromPost(p));
        // just created on /admin/blog/new
        if (new URLSearchParams(window.location.search).get('saved')) {
          setNote(savedNote(p));
          router.replace(`/admin/blog/${p.id}`, { scroll: false });
        }
      })
      .catch((e) => !onAuthError(e) && setError(e.message))
      .finally(() => setLoading(false));
  }, [id, onAuthError, router]);

  const dirty = JSON.stringify(form) !== JSON.stringify(saved);

  // warn before leaving with unsaved changes
  useEffect(() => {
    if (!dirty) return;
    const warn = (e: BeforeUnloadEvent) => e.preventDefault();
    window.addEventListener('beforeunload', warn);
    return () => window.removeEventListener('beforeunload', warn);
  }, [dirty]);

  const set = <K extends keyof Form>(k: K, v: Form[K]) =>
    setForm((f) => {
      const next = { ...f, [k]: v };
      if (k === 'title' && !slugTouched) next.slug = slugify(v as string);
      return next;
    });

  const save = async (status: BlogStatus) => {
    if (!form.title.trim()) {
      setFieldErrors({ title: 'Give the post a title.' });
      return;
    }
    setBusy('save');
    setError('');
    setNote('');
    setFieldErrors({});
    const body = {
      ...form,
      title: form.title.trim(),
      status,
      published_at: form.published_at ? new Date(form.published_at).toISOString() : null,
    };
    try {
      const p = id ? await api<BlogPostData>(`blog/${id}`, { method: 'PATCH', body }) : await api<BlogPostData>('blog', { method: 'POST', body });
      const f = fromPost(p);
      setPost(p);
      setForm(f);
      setSaved(f);
      setSlugTouched(true);
      setNote(savedNote(p));
      if (!id) router.replace(`/admin/blog/${p.id}?saved=1`);
    } catch (e) {
      if (!onAuthError(e)) {
        if (e instanceof ApiError) setFieldErrors(e.fields);
        setError(e instanceof Error ? e.message : 'Could not save the post.');
      }
    } finally {
      setBusy('');
    }
  };

  const remove = async () => {
    if (!id || !window.confirm(`Delete “${form.title || 'this post'}”? This cannot be undone.`)) return;
    setBusy('delete');
    try {
      await api(`blog/${id}`, { method: 'DELETE' });
      setSaved(form); // nothing left to warn about
      router.replace('/admin/blog');
    } catch (e) {
      if (!onAuthError(e)) setError(e instanceof Error ? e.message : 'Could not delete the post.');
      setBusy('');
    }
  };

  const uploadCover = async (file: File | undefined) => {
    if (!file) return;
    setBusy('cover');
    setError('');
    try {
      const url = await uploadImage(file);
      setForm((f) => ({ ...f, cover: url, cover_alt: f.cover_alt || f.title }));
    } catch (e) {
      if (!onAuthError(e)) setError(e instanceof Error ? e.message : 'Could not upload the image.');
    } finally {
      setBusy('');
      if (coverRef.current) coverRef.current.value = '';
    }
  };

  if (loading) return <Spinner />;
  if (id && !post) return <ErrorNote>{error || 'This post could not be found.'}</ErrorNote>;

  const state = post ? blogState(post) : { value: 'draft', label: 'Not saved yet' };
  const isPublished = post?.status === 'published';
  const future = Boolean(form.published_at) && new Date(form.published_at).getTime() > openedAt;
  const seoTitle = form.seo_title || form.title || 'Article title';
  const seoDesc = form.seo_description || form.excerpt || 'The summary appears here in Google results.';

  return (
    <div className="space-y-5 pb-24">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Link href="/admin/blog" className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-600 hover:text-slate-900">
          <ArrowLeft className="h-4 w-4" /> All posts
        </Link>
        <div className="flex items-center gap-2">
          <StatusBadge status={state.value} label={state.label} />
          {post?.live && (
            <a href={`/blog/${post.slug}`} target="_blank" rel="noopener" className={btn.ghost}>
              <ExternalLink className="h-4 w-4" /> View on website
            </a>
          )}
        </div>
      </div>

      {error && <ErrorNote>{error}</ErrorNote>}
      {note && <SuccessNote>{note}</SuccessNote>}

      <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_340px]">
        {/* main column */}
        <div className="min-w-0 space-y-5">
          <Card className="space-y-4 p-5 sm:p-6">
            <label className="block">
              <span className="sr-only">Title</span>
              <textarea
                rows={1}
                value={form.title}
                onChange={(e) => set('title', e.target.value.replace(/\n/g, ' '))}
                placeholder="Article title"
                maxLength={200}
                className="field-sizing-content w-full resize-none border-0 p-0 text-2xl font-bold tracking-tight text-slate-950 placeholder:text-slate-300 focus:outline-none focus:ring-0 sm:text-3xl"
              />
              {fieldErrors.title && <span className="mt-1 block text-xs text-rose-600">{fieldErrors.title}</span>}
            </label>
            <Field label="Summary" hint="One or two sentences, shown on the blog page and under the title." error={fieldErrors.excerpt}>
              <textarea className={cx(inputCls, 'min-h-[76px]')} value={form.excerpt} onChange={(e) => set('excerpt', e.target.value)} maxLength={400} />
            </Field>
          </Card>

          <RichTextEditor value={form.body} onChange={(html) => set('body', html)} onError={setError} />
        </div>

        {/* sidebar */}
        <div className="space-y-5">
          <Card className="space-y-4 p-5">
            <h2 className="text-sm font-semibold text-slate-900">Publishing</h2>
            <Field
              label={isPublished ? 'Publish date' : 'Publish date (optional)'}
              hint={future ? 'A future date schedules the post — it goes live automatically then.' : 'Leave empty to use the moment you publish.'}
              error={fieldErrors.published_at}
            >
              <input type="datetime-local" className={inputCls} value={form.published_at} onChange={(e) => set('published_at', e.target.value)} />
            </Field>
            <div className="flex flex-col gap-2">
              {isPublished ? (
                <>
                  <button type="button" className={btn.primary} disabled={!!busy} onClick={() => save('published')}>
                    {busy === 'save' && <Loader2 className="h-4 w-4 animate-spin" />} Update post
                  </button>
                  <button type="button" className={btn.secondary} disabled={!!busy} onClick={() => save('draft')}>
                    Unpublish (move to drafts)
                  </button>
                </>
              ) : (
                <>
                  <button type="button" className={btn.primary} disabled={!!busy} onClick={() => save('published')}>
                    {busy === 'save' && <Loader2 className="h-4 w-4 animate-spin" />} {future ? 'Schedule' : 'Publish'}
                  </button>
                  <button type="button" className={btn.secondary} disabled={!!busy} onClick={() => save('draft')}>
                    Save draft
                  </button>
                </>
              )}
            </div>
            {post && (
              <p className="text-xs text-slate-500">
                Last saved {formatDate(post.updated_at, true)}
                {post.updated_by && ` by ${post.updated_by}`} · {post.reading_minutes} min read
              </p>
            )}
          </Card>

          <Card className="space-y-3 p-5">
            <h2 className="text-sm font-semibold text-slate-900">Cover image</h2>
            {form.cover ? (
              <div className="relative overflow-hidden rounded-xl bg-slate-100">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={form.cover} alt="" className="aspect-[16/10] w-full object-cover" />
                <button
                  type="button"
                  onClick={() => setForm((f) => ({ ...f, cover: '' }))}
                  className="absolute right-2 top-2 grid h-8 w-8 place-items-center rounded-full bg-white/90 text-slate-700 shadow hover:bg-white"
                  aria-label="Remove cover image"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => coverRef.current?.click()}
                disabled={busy === 'cover'}
                className="grid aspect-[16/10] w-full place-items-center rounded-xl border-2 border-dashed border-slate-200 text-sm text-slate-500 hover:border-amber-400 hover:text-amber-700"
              >
                <span className="flex flex-col items-center gap-2">
                  {busy === 'cover' ? <Loader2 className="h-6 w-6 animate-spin" /> : <ImagePlus className="h-6 w-6" />}
                  {busy === 'cover' ? 'Uploading…' : 'Upload cover image'}
                </span>
              </button>
            )}
            {form.cover && (
              <button type="button" className={cx(btn.secondary, 'w-full')} onClick={() => coverRef.current?.click()} disabled={busy === 'cover'}>
                {busy === 'cover' && <Loader2 className="h-4 w-4 animate-spin" />} Replace image
              </button>
            )}
            <input ref={coverRef} type="file" accept="image/jpeg,image/png,image/webp" className="hidden" onChange={(e) => uploadCover(e.target.files?.[0])} />
            <p className="text-xs text-slate-500">JPG, PNG or WebP up to 10 MB; landscape works best (e.g. 1600 × 1000).</p>
            {form.cover && (
              <Field label="Image description" hint="For Google and screen readers." error={fieldErrors.cover}>
                <input className={inputCls} value={form.cover_alt} onChange={(e) => set('cover_alt', e.target.value)} maxLength={200} />
              </Field>
            )}
          </Card>

          <Card className="space-y-4 p-5">
            <h2 className="text-sm font-semibold text-slate-900">Details</h2>
            <Field label="Category" hint="Pick one used before or type a new one." error={fieldErrors.category}>
              <input className={inputCls} list="blog-categories" value={form.category} onChange={(e) => set('category', e.target.value)} maxLength={80} placeholder="e.g. Water Treatment" />
              <datalist id="blog-categories">
                {categories.map((c) => (
                  <option key={c} value={c} />
                ))}
              </datalist>
            </Field>
            <Field label="Author" error={fieldErrors.author}>
              <input className={inputCls} value={form.author} onChange={(e) => set('author', e.target.value)} maxLength={120} />
            </Field>
            <Field label="Web address" hint={`masararabia.com/blog/${form.slug || '…'}`} error={fieldErrors.slug}>
              <input
                className={inputCls}
                value={form.slug}
                onChange={(e) => {
                  setSlugTouched(true);
                  set('slug', slugify(e.target.value));
                }}
                placeholder="made from the title"
              />
            </Field>
            {isPublished && saved.slug !== form.slug && <p className="text-xs text-amber-700">Changing the address of a published post breaks links people already shared.</p>}
          </Card>

          <Card className="space-y-4 p-5">
            <h2 className="text-sm font-semibold text-slate-900">Google search</h2>
            <div className="rounded-xl bg-slate-50 p-3.5">
              <p className="truncate text-xs text-slate-500">masararabia.com › blog › {form.slug || '…'}</p>
              <p className="mt-0.5 line-clamp-1 text-[15px] text-[#1a0dab]">{seoTitle} | Masar Arabia</p>
              <p className="mt-0.5 line-clamp-2 text-xs text-slate-600">{seoDesc}</p>
            </div>
            <Field label={`Search title (${form.seo_title.length}/60)`} hint="Optional — the article title is used if empty." error={fieldErrors.seo_title}>
              <input className={inputCls} value={form.seo_title} onChange={(e) => set('seo_title', e.target.value)} maxLength={70} />
            </Field>
            <Field label={`Search description (${form.seo_description.length}/160)`} hint="Optional — the summary is used if empty." error={fieldErrors.seo_description}>
              <textarea className={cx(inputCls, 'min-h-[76px]')} value={form.seo_description} onChange={(e) => set('seo_description', e.target.value)} maxLength={170} />
            </Field>
          </Card>

          {id && (
            <button type="button" className={cx(btn.danger, 'w-full')} disabled={!!busy} onClick={remove}>
              {busy === 'delete' ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />} Delete post
            </button>
          )}
        </div>
      </div>

      {dirty && (
        <div className="fixed inset-x-0 bottom-0 z-30 border-t border-slate-200 bg-white/95 px-4 py-3 backdrop-blur lg:left-64">
          <div className="mx-auto flex max-w-6xl items-center justify-between gap-3">
            <span className="text-sm text-slate-600">You have unsaved changes.</span>
            <button type="button" className={btn.primary} disabled={!!busy} onClick={() => save(isPublished ? 'published' : 'draft')}>
              {busy === 'save' && <Loader2 className="h-4 w-4 animate-spin" />} {isPublished ? 'Update post' : 'Save draft'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
