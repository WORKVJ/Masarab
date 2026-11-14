import type { Metadata } from 'next';
import AdminApp from '@/components/admin/AdminApp';

export const metadata: Metadata = {
  title: { default: 'Admin', template: '%s | Masar Arabia Admin' },
  robots: { index: false, follow: false },
};

/** The team's admin panel — signed-in staff only (checked by the API on every request). */
export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <AdminApp>{children}</AdminApp>;
}
