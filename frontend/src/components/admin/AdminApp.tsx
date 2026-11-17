'use client';

import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  ArrowUpRight,
  ContactRound,
  ExternalLink,
  FileText,
  LayoutDashboard,
  LogOut,
  Mail,
  Menu,
  Newspaper,
  UserCog,
  Users,
  X,
} from 'lucide-react';
import { api, AuthError, type PanelUser } from '@/lib/panelApi';
import { cx, SectionTitleContext, Spinner } from './ui';

interface Session {
  user: PanelUser;
  /** re-fetch the user + unread counts (after opening or changing an enquiry) */
  refresh: () => void;
  /** call from a page when an API call says the session ended */
  onAuthError: (e: unknown) => boolean;
}

const SessionCtx = createContext<Session | null>(null);

export function useSession() {
  const s = useContext(SessionCtx);
  if (!s) throw new Error('useSession outside AdminApp');
  return s;
}

const NAV = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/quotes', label: 'Quote Requests', icon: FileText, badge: 'quotes' as const },
  { href: '/admin/messages', label: 'Contact Messages', icon: Mail, badge: 'messages' as const },
  { href: '/admin/blog', label: 'Blog', icon: Newspaper },
  { href: '/admin/contact-details', label: 'Contact Details', icon: ContactRound },
  { href: '/admin/team', label: 'Team', icon: Users, superuser: true },
  { href: '/admin/account', label: 'My Account', icon: UserCog },
];

/** Signs the visitor in (or sends them to /admin/login) and frames every panel page. */
export default function AdminApp({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const isLogin = pathname === '/admin/login';
  const [user, setUser] = useState<PanelUser | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  const toLogin = useCallback(() => {
    setUser(null);
    router.replace(`/admin/login?next=${encodeURIComponent(pathname)}`);
  }, [router, pathname]);

  const refresh = useCallback(() => {
    api<PanelUser>('auth/me')
      .then(setUser)
      .catch((e) => {
        if (e instanceof AuthError) toLogin();
      });
  }, [toLogin]);

  useEffect(() => {
    if (!isLogin) refresh();
  }, [isLogin, refresh]);

  const onAuthError = useCallback(
    (e: unknown) => {
      if (e instanceof AuthError) {
        toLogin();
        return true;
      }
      return false;
    },
    [toLogin],
  );

  if (isLogin) return <>{children}</>;
  if (!user) {
    return (
      <div className="min-h-screen bg-slate-50">
        <Spinner label="Checking your sign-in…" />
      </div>
    );
  }

  const logout = async () => {
    try {
      await api('auth/logout', { method: 'POST' });
    } finally {
      router.replace('/admin/login');
    }
  };

  const active = (href: string) => (href === '/admin' ? pathname === '/admin' : pathname.startsWith(href));
  const current = NAV.find((n) => active(n.href));
  const sectionTitle = current?.href === '/admin' ? 'Dashboard Overview' : current?.label ?? 'Admin';

  const sidebar = (
    <nav aria-label="Admin" className="flex h-full flex-col">
      <div className="flex items-center justify-between gap-3 px-6 pt-6 pb-6">
        <Link href="/admin" className="flex items-center">
          <Image src="/images/logo-dark.png" alt="Masar Arabia" width={170} height={74} className="h-9 w-auto" />
        </Link>
        <span className="rounded-md border border-amber-300 bg-amber-50 px-2 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wider text-amber-800">Portal</span>
        <button type="button" onClick={() => setMenuOpen(false)} className="lg:hidden rounded-lg p-1.5 text-slate-500 hover:bg-slate-100" aria-label="Close menu">
          <X className="h-5 w-5" />
        </button>
      </div>
      <div className="mx-6 border-t border-slate-200" />
      <p className="px-6 pt-6 pb-3 text-[11px] font-bold uppercase tracking-[0.14em] text-slate-400">Navigation</p>
      <ul className="flex-1 space-y-1.5 overflow-y-auto px-4">
        {NAV.filter((n) => !n.superuser || user.is_superuser).map(({ href, label, icon: Icon, badge }) => {
          const count = badge ? user.unread?.[badge] ?? 0 : 0;
          const on = active(href);
          return (
            <li key={href}>
              <Link
                href={href}
                onClick={() => setMenuOpen(false)}
                aria-current={on ? 'page' : undefined}
                className={cx(
                  'flex items-center gap-3 rounded-xl px-4 py-3 text-[15px] transition-colors',
                  on ? 'bg-amber-50 font-semibold text-slate-900 ring-1 ring-inset ring-amber-200' : 'font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-900',
                )}
              >
                <Icon className={cx('h-[18px] w-[18px] shrink-0', on ? 'text-amber-600' : 'text-slate-400')} />
                <span className="flex-1">{label}</span>
                {count > 0 && (
                  <span className="min-w-5 rounded-full bg-amber-500 px-1.5 py-0.5 text-center text-[11px] font-bold leading-none text-white" aria-label={`${count} unread`}>
                    {count}
                  </span>
                )}
              </Link>
            </li>
          );
        })}
      </ul>
      <div className="mx-4 border-t border-slate-200 py-4 space-y-3">
        <a
          href="/"
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-3 rounded-xl border border-slate-200 px-4 py-3 text-[15px] font-medium text-slate-700 hover:border-slate-300 hover:bg-slate-50"
        >
          <ExternalLink className="h-[18px] w-[18px] text-slate-500" />
          <span className="flex-1">View Live Website</span>
          <ArrowUpRight className="h-3.5 w-3.5 text-slate-400" />
        </a>
        <div className="flex items-center gap-3 rounded-xl border border-slate-200 p-3">
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-amber-200 bg-amber-50 text-sm font-bold text-amber-800">
            {user.name.charAt(0).toUpperCase()}
          </span>
          <span className="min-w-0 flex-1">
            <span className="block truncate text-sm font-bold text-slate-900">{user.name}</span>
            <span className="block text-xs text-slate-500">{user.is_superuser ? 'Administrator' : 'Staff'}</span>
          </span>
          <button type="button" onClick={logout} className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700" aria-label="Sign out" title="Sign out">
            <LogOut className="h-4 w-4" />
          </button>
        </div>
      </div>
    </nav>
  );

  return (
    <SessionCtx.Provider value={{ user, refresh, onAuthError }}>
      <SectionTitleContext.Provider value={sectionTitle}>
        <div className="min-h-screen bg-slate-50 text-slate-900">
          {/* desktop sidebar */}
          <aside className="fixed inset-y-0 left-0 z-30 hidden w-72 border-r border-slate-200 bg-white lg:block">{sidebar}</aside>

          {/* mobile drawer */}
          {menuOpen && (
            <div className="fixed inset-0 z-40 lg:hidden">
              <button type="button" aria-label="Close menu" className="absolute inset-0 bg-slate-900/40" onClick={() => setMenuOpen(false)} />
              <aside className="absolute inset-y-0 left-0 w-80 max-w-[85vw] bg-white">{sidebar}</aside>
            </div>
          )}

          <div className="lg:pl-72">
            {/* top bar: section name + system status */}
            <header className="sticky top-0 z-20 flex min-h-[72px] items-center gap-3 border-b border-slate-200 bg-white/95 px-4 backdrop-blur sm:px-6 lg:px-10">
              <button type="button" onClick={() => setMenuOpen(true)} className="rounded-lg p-2 text-slate-700 hover:bg-slate-100 lg:hidden" aria-label="Open menu">
                <Menu className="h-5 w-5" />
              </button>
              <div className="min-w-0 flex-1 py-3">
                <p className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.14em] text-amber-700">Masar Arabia Admin</p>
                <p className="truncate text-lg sm:text-xl font-bold tracking-tight text-slate-900">{sectionTitle}</p>
              </div>
              <span className="hidden sm:inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3.5 py-1.5 text-sm font-semibold text-emerald-700 ring-1 ring-inset ring-emerald-200">
                <span className="h-2 w-2 rounded-full bg-emerald-500" /> System Active
              </span>
              <a
                href="/"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3.5 sm:px-4 py-1.5 text-sm font-semibold text-slate-700 hover:bg-slate-100"
              >
                Live Site <ExternalLink className="h-4 w-4" />
              </a>
            </header>
            <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8 lg:px-10">{children}</main>
          </div>
        </div>
      </SectionTitleContext.Provider>
    </SessionCtx.Provider>
  );
}
