/**
 * Browser client for the admin panel API (Django, /api/panel/*).
 * Auth is Django's session cookie; every write sends the csrftoken cookie back as X-CSRFToken.
 */

const BASE = '/api/panel';

export class AuthError extends Error {}

export class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
    public fields: Record<string, string> = {},
  ) {
    super(message);
  }
}

function csrfToken() {
  const m = document.cookie.match(/(?:^|;\s*)csrftoken=([^;]+)/);
  return m ? decodeURIComponent(m[1]) : '';
}

async function ensureCsrf() {
  if (!csrfToken()) await fetch(`${BASE}/auth/csrf/`, { credentials: 'same-origin' });
}

/** DRF error bodies → one readable sentence + per-field messages. */
function parseError(body: unknown, status: number): ApiError {
  if (body && typeof body === 'object') {
    const b = body as Record<string, unknown>;
    const fields: Record<string, string> = {};
    for (const [k, v] of Object.entries(b)) {
      if (k === 'detail') continue;
      fields[k] = Array.isArray(v) ? v.join(' ') : String(v);
    }
    const detail = typeof b.detail === 'string' ? b.detail : Object.values(fields)[0];
    return new ApiError(detail || `Request failed (${status})`, status, fields);
  }
  return new ApiError(`Request failed (${status})`, status);
}

export async function api<T = unknown>(path: string, init: { method?: string; body?: unknown } = {}): Promise<T> {
  const method = init.method ?? 'GET';
  if (method !== 'GET') await ensureCsrf();
  let res: Response;
  try {
    res = await fetch(`${BASE}/${path.replace(/^\//, '')}`, {
      method,
      credentials: 'same-origin',
      headers: {
        Accept: 'application/json',
        ...(init.body !== undefined ? { 'Content-Type': 'application/json' } : {}),
        ...(method !== 'GET' ? { 'X-CSRFToken': csrfToken() } : {}),
      },
      body: init.body !== undefined ? JSON.stringify(init.body) : undefined,
    });
  } catch {
    throw new ApiError('Could not reach the server. Check your connection and try again.', 0);
  }
  if (res.status === 401 || (res.status === 403 && !path.startsWith('team'))) throw new AuthError('Signed out');
  if (res.status === 204) return undefined as T;
  const body = await res.json().catch(() => null);
  if (!res.ok) throw parseError(body, res.status);
  return body as T;
}

/** Uploads an image (multipart) and returns its /media URL; the backend resizes it and stores WebP. */
export async function uploadImage(file: File): Promise<string> {
  await ensureCsrf();
  const form = new FormData();
  form.append('file', file);
  let res: Response;
  try {
    res = await fetch(`${BASE}/blog/upload`, {
      method: 'POST',
      credentials: 'same-origin',
      headers: { Accept: 'application/json', 'X-CSRFToken': csrfToken() },
      body: form,
    });
  } catch {
    throw new ApiError('Could not upload the image. Check your connection and try again.', 0);
  }
  if (res.status === 401 || res.status === 403) throw new AuthError('Signed out');
  if (res.status === 413) throw new ApiError('The image is too large (10 MB maximum).', 413);
  const body = await res.json().catch(() => null);
  if (!res.ok) throw parseError(body, res.status);
  return (body as { url: string }).url;
}

/** Same filters as the list, as a file download. */
export function exportUrl(kind: 'quotes' | 'messages', params: URLSearchParams) {
  const qs = params.toString();
  return `${BASE}/${kind}/export/${qs ? `?${qs}` : ''}`;
}

// ── types ────────────────────────────────────────────────────────────────────

export interface PanelUser {
  id: number;
  username: string;
  name: string;
  email: string;
  is_superuser: boolean;
  unread?: { quotes: number; messages: number };
}

export interface Page<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

export interface Quote {
  id: number;
  rfq_number: string;
  full_name: string;
  company_name: string;
  email: string;
  phone: string;
  project_location: string;
  product_category: string;
  estimated_quantity: string;
  specifications_notes: string;
  status: QuoteStatus;
  status_label: string;
  notes: string;
  read_at: string | null;
  created_at: string;
  updated_at: string | null;
}

export interface Message {
  id: number;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  status: MessageStatus;
  status_label: string;
  notes: string;
  read_at: string | null;
  created_at: string;
  updated_at: string | null;
}

export type QuoteStatus = 'pending' | 'pricing' | 'sent' | 'closed' | 'lost';
export type MessageStatus = 'new' | 'in_progress' | 'replied' | 'closed';

export const QUOTE_STATUSES: { value: QuoteStatus; label: string }[] = [
  { value: 'pending', label: 'New' },
  { value: 'pricing', label: 'Pricing in Progress' },
  { value: 'sent', label: 'Quote Sent' },
  { value: 'closed', label: 'Won' },
  { value: 'lost', label: 'Lost' },
];

export const MESSAGE_STATUSES: { value: MessageStatus; label: string }[] = [
  { value: 'new', label: 'New' },
  { value: 'in_progress', label: 'In Progress' },
  { value: 'replied', label: 'Replied' },
  { value: 'closed', label: 'Closed' },
];

export interface Dashboard {
  quotes: Summary;
  messages: Summary;
  last_30_days: { date: string; quotes: number; messages: number }[];
  top_products: { product_category: string; n: number }[];
  recent_quotes: Quote[];
  recent_messages: Message[];
}

interface Summary {
  total: number;
  new: number;
  unread: number;
  this_month: number;
  by_status: Record<string, number>;
}

export interface SiteSettings {
  company: string;
  phone_display: string;
  email: string;
  address: string;
  map_url: string;
  whatsapp: string;
  working_hours: string;
  facebook: string;
  instagram: string;
  linkedin: string;
  contact_intro: string;
  notify_emails: string;
  updated_at: string;
  updated_by: string;
  email_configured: boolean;
}

export interface TeamMember {
  id: number;
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  is_superuser: boolean;
  is_active: boolean;
  last_login: string | null;
  date_joined: string;
}

export type BlogStatus = 'draft' | 'published';

export interface BlogPostData {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  body: string;
  cover: string;
  cover_alt: string;
  category: string;
  author: string;
  status: BlogStatus;
  published_at: string | null;
  seo_title: string;
  seo_description: string;
  created_at: string;
  updated_at: string;
  updated_by: string;
  live: boolean;
  reading_minutes: number;
}

/** Draft / Scheduled (published with a future date) / Published, as shown in the panel. */
export function blogState(p: Pick<BlogPostData, 'status' | 'live'>): { value: string; label: string } {
  if (p.status === 'draft') return { value: 'draft', label: 'Draft' };
  return p.live ? { value: 'published', label: 'Published' } : { value: 'scheduled', label: 'Scheduled' };
}
