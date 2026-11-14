'use client';

import { usePathname } from 'next/navigation';

/**
 * The public site's frame (loader, navbar, footer, motion engine, chat). The admin panel at /admin
 * renders without any of it.
 */
export default function SiteShell({
  before,
  footer,
  after,
  children,
}: {
  before: React.ReactNode;
  footer: React.ReactNode;
  after: React.ReactNode;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  if (pathname === '/admin' || pathname?.startsWith('/admin/')) return <>{children}</>;
  return (
    <>
      {before}
      <main
        id="main"
        className="min-h-screen flex flex-col overflow-x-clip bg-white text-slate-900 selection:bg-[#0d7cae] selection:text-white relative"
      >
        {children}
        {footer}
      </main>
      {after}
    </>
  );
}
