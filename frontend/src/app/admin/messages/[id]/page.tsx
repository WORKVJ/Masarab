'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { api, ApiError, MESSAGE_STATUSES, type Message } from '@/lib/panelApi';
import { useSession } from '@/components/admin/AdminApp';
import { DetailShell, Facts, TextBlock } from '@/components/admin/DetailShell';
import EnquiryActions from '@/components/admin/EnquiryActions';
import { ErrorNote, formatDate, Spinner, StatusBadge } from '@/components/admin/ui';

export default function MessageDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { onAuthError, refresh } = useSession();
  const [m, setM] = useState<Message | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    api<Message>(`messages/${id}`)
      .then((d) => {
        setM(d);
        refresh(); // opening it marked it as read
      })
      .catch((e) => !onAuthError(e) && setError(e instanceof ApiError && e.status === 404 ? 'This message no longer exists.' : e.message));
  }, [id, onAuthError, refresh]);

  if (error) return <ErrorNote>{error}</ErrorNote>;
  if (!m) return <Spinner />;

  return (
    <DetailShell
      back="/admin/messages"
      backLabel="All messages"
      eyebrow={<StatusBadge status={m.status} label={m.status_label} />}
      title={m.subject || '(no subject)'}
      meta={`From ${m.name} · ${formatDate(m.created_at, true)}`}
      main={
        <>
          <TextBlock title="Message" text={m.message} />
          <Facts
            title="Sender"
            rows={[
              { label: 'Name', value: m.name },
              { label: 'Email', value: m.email, href: `mailto:${m.email}` },
              { label: 'Phone', value: m.phone, href: m.phone ? `tel:${m.phone.replace(/[^\d+]/g, '')}` : undefined },
            ]}
          />
        </>
      }
      side={
        <EnquiryActions
          kind="messages"
          id={m.id}
          item={m}
          onChange={setM}
          statuses={MESSAGE_STATUSES}
          email={m.email}
          emailSubject={`Re: ${m.subject}`}
          phone={m.phone}
        />
      }
    />
  );
}
