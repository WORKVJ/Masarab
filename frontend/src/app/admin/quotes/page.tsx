'use client';

import { Suspense } from 'react';
import EnquiryList from '@/components/admin/EnquiryList';
import { QUOTE_STATUSES, type Quote } from '@/lib/panelApi';

export default function QuotesPage() {
  return (
    <Suspense>
      <EnquiryList<Quote>
        kind="quotes"
        title="Quote Requests"
        intro="Requests from the website's quote form."
        statuses={QUOTE_STATUSES}
        columns={['Customer', 'Product', 'Received']}
        toRow={(q) => ({
          id: q.id,
          title: q.company_name || q.full_name,
          sub: `${q.full_name} · ${q.rfq_number}`,
          detail: q.product_category,
          status: q.status,
          statusLabel: q.status_label,
          unread: !q.read_at,
          at: q.created_at,
        })}
      />
    </Suspense>
  );
}
