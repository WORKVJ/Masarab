'use client';

import { Suspense } from 'react';
import EnquiryList from '@/components/admin/EnquiryList';
import { MESSAGE_STATUSES, type Message } from '@/lib/panelApi';

export default function MessagesPage() {
  return (
    <Suspense>
      <EnquiryList<Message>
        kind="messages"
        title="Contact Messages"
        intro="Messages sent from the website's contact form."
        statuses={MESSAGE_STATUSES}
        columns={['From', 'Subject', 'Received']}
        toRow={(m) => ({
          id: m.id,
          title: m.name,
          sub: m.email,
          detail: m.subject,
          status: m.status,
          statusLabel: m.status_label,
          unread: !m.read_at,
          at: m.created_at,
        })}
      />
    </Suspense>
  );
}
