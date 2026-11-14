'use client';

import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
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
import { cx, Spinner } from './ui';

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

  const sidebar = (
    <nav aria-label="Admin" className="flex h-full flex-col">
      <div className="flex items-center justify-between px-5 pt-6 pb-8">
        <Link href="/admin" className="flex items-center gap-3">
          <Image src="/images/logo-white.png" alt="Masar Arabia" width={170} height={74} className="h-9 w-auto" />
        </Link>
        <button type="button" onClick={() => setMenuOpen(false)} className="lg:hidden rounded-lg p-1.5 text-white/70 hover:bg-white/10" aria-label="Close menu">
          <X className="h-5 w-5" />
        </button>
      </div>
      <ul className="flex-1 space-y-1 px-3">
        {NAV.filter((n) => !n.superuser || user.is_superuser).map(({ href, label, icon: Icon, badge }) => {
          const count = badge ? user.unread?.[badge] ?? 0 : 0;
          return (
            <li key={href}>
              <Link
                href={href}
                onClick={() => setMenuOpen(false)}
                aria-current={active(href) ? 'page' : undefined}
                className={cx(
                  'flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors',
                  active(href) ? 'bg-white/10 text-white' : 'text-white/65 hover:bg-white/5 hover:text-white',
                )}
              >
                <Icon className="h-[18px] w-[18px] shrink-0" />
                <span className="flex-1">{label}</span>
                {count > 0 && (
                  <span className="min-w-5 rounded-full bg-sky-400 px-1.5 py-0.5 text-center text-[11px] font-bold leading-none text-[#04121f]" aria-label={`${count} unread`}>
                    {count}
                  </span>
                )}
              </Link>
            </li>
          );
        })}
      </ul>
      <div className="border-t border-white/10 p-3">
        <a href="/" target="_blank" rel="noreferrer" className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-white/65 hover:bg-white/5 hover:text-white">
          <ExternalLink className="h-[18px] w-[18px]" /> View website
        </a>
        <div className="mt-2 flex items-center gap-3 rounded-xl px-3 py-2.5">
          <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-sky-400/20 text-sm font-bold text-sky-200">
            {user.name.charAt(0).toUpperCase()}
          </span>
          <span className="min-w-0 flex-1">
            <span className="block truncate text-sm font-semibold text-white">{user.name}</span>
            <span className="block text-xs text-white/50">{user.is_superuser ? 'Administrator' : 'Staff'}</span>
          </span>
          <button type="button" onClick={logout} className="rounded-lg p-2 text-white/60 hover:bg-white/10 hover:text-white" aria-label="Sign out" title="Sign out">
            <LogOut className="h-4 w-4" />
          </button>
        </div>
      </div>
    </nav>
  );

  return (
    <SessionCtx.Provider value={{ user, refresh, onAuthError }}>
      <div className="min-h-screen bg-slate-50 text-slate-900">
        {/* desktop sidebar */}
        <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 bg-[#04121f] lg:block">{sidebar}</aside>

        {/* mobile drawer */}
        {menuOpen && (
          <div className="fixed inset-0 z-40 lg:hidden">
            <button type="button" aria-label="Close menu" className="absolute inset-0 bg-slate-900/50" onClick={() => setMenuOpen(false)} />
            <aside className="absolute inset-y-0 left-0 w-72 max-w-[85vw] bg-[#04121f]">{sidebar}</aside>
          </div>
        )}

        <div className="lg:pl-64">
          <header className="sticky top-0 z-20 flex h-14 items-center gap-3 border-b border-slate-200 bg-white/90 px-4 backdrop-blur lg:hidden">
            <button type="button" onClick={() => setMenuOpen(true)} className="rounded-lg p-2 text-slate-700 hover:bg-slate-100" aria-label="Open menu">
              <Menu className="h-5 w-5" />
            </button>
            <span className="font-semibold">Masar Arabia Admin</span>
          </header>
          <main className="mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8">{children}</main>
        </div>
      </div>
    </SessionCtx.Provider>
  );
}
