'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { api, ApiError, QUOTE_STATUSES, type Quote } from '@/lib/panelApi';
import { useSession } from '@/components/admin/AdminApp';
import { DetailShell, Facts, TextBlock } from '@/components/admin/DetailShell';
import EnquiryActions from '@/components/admin/EnquiryActions';
import { ErrorNote, formatDate, Spinner, StatusBadge } from '@/components/admin/ui';

export default function QuoteDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { onAuthError, refresh } = useSession();
  const [q, setQ] = useState<Quote | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    api<Quote>(`quotes/${id}`)
      .then((d) => {
        setQ(d);
        refresh(); // opening it marked it as read
      })
      .catch((e) => !onAuthError(e) && setError(e instanceof ApiError && e.status === 404 ? 'This quote request no longer exists.' : e.message));
  }, [id, onAuthError, refresh]);

  if (error) return <ErrorNote>{error}</ErrorNote>;
  if (!q) return <Spinner />;

  return (
    <DetailShell
      back="/admin/quotes"
      backLabel="All quote requests"
      eyebrow={
        <>
          <span className="font-mono font-semibold text-amber-700">{q.rfq_number}</span>
          <StatusBadge status={q.status} label={q.status_label} />
        </>
      }
      title={q.company_name || q.full_name}
      meta={`Received ${formatDate(q.created_at, true)}`}
      main={
        <>
          <Facts
            title="Customer"
            rows={[
              { label: 'Name', value: q.full_name },
              { label: 'Company', value: q.company_name },
              { label: 'Email', value: q.email, href: `mailto:${q.email}` },
              { label: 'Phone', value: q.phone, href: `tel:${q.phone.replace(/[^\d+]/g, '')}` },
              { label: 'Project location', value: q.project_location },
            ]}
          />
          <Facts
            title="Request"
            rows={[
              { label: 'Product', value: q.product_category },
              { label: 'Estimated quantity', value: q.estimated_quantity },
            ]}
          />
          <TextBlock title="Requirements" text={q.specifications_notes} />
        </>
      }
      side={
        <EnquiryActions
          kind="quotes"
          id={q.id}
          item={q}
          onChange={setQ}
          statuses={QUOTE_STATUSES}
          email={q.email}
          emailSubject={`Your quote request ${q.rfq_number} — ${q.product_category}`}
          phone={q.phone}
        />
      }
    />
  );
}
