/**
 * Form submissions to the optional Django backend (quote requests + contact enquiries).
 * Site content is built in (lib/masarContent.ts); this module only POSTs.
 *
 * NEXT_PUBLIC_API_URL (e.g. https://api.masararabia.com/api) is set in Vercel → Project → Settings →
 * Environment Variables. Without it (and outside local development) every call fails fast and the
 * forms offer their pre-filled "send by email" fallback instead.
 */
const API_BASE =
  process.env.NEXT_PUBLIC_API_URL || (process.env.NODE_ENV === 'development' ? 'http://127.0.0.1:8000/api' : '');

export interface RfqPayload {
  full_name: string;
  company_name: string;
  email: string;
  phone: string;
  project_location?: string;
  product_category: string;
  estimated_quantity?: string;
  specifications_notes: string;
}

export interface RfqResponse {
  id: number;
  rfq_number: string;
  full_name: string;
  company_name: string;
  email: string;
  phone: string;
  status: string;
  created_at: string;
}

export interface ContactPayload {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}

export async function submitRfq(data: RfqPayload): Promise<RfqResponse> {
  if (!API_BASE) throw new Error('No backend configured');
  const res = await fetch(`${API_BASE}/rfq/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData?.detail || 'Failed to submit RFQ');
  }
  return await res.json();
}

export async function submitContact(data: ContactPayload): Promise<{ status: string }> {
  if (!API_BASE) throw new Error('No backend configured');
  const res = await fetch(`${API_BASE}/contact/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    throw new Error('Failed to submit inquiry');
  }
  return await res.json();
}
