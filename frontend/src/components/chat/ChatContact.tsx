'use client';

import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { MessageCircle } from 'lucide-react';

// The conversation UI is fetched on first hover / tap, so it adds nothing to the initial page load.
const loadPanel = () => import('./ChatPanel');
const ChatPanel = dynamic(loadPanel, {
  ssr: false,
  loading: () => <div className="h-full rounded-[26px] bg-white shadow-2xl animate-pulse" />,
});

const NUDGE_KEY = 'masar-chat-nudged';

/**
 * Floating "chat with us" contact form (bottom-right, stacked above the scroll dial).
 * The panel stays mounted after the first open, so the conversation survives closing it
 * and moving between pages (the component lives in the root layout).
 */
export default function ChatContact() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [nudge, setNudge] = useState(false);

  // One gentle "Need a quote?" hint per browser session, a few seconds after arriving
  useEffect(() => {
    let seen = false;
    try {
      seen = sessionStorage.getItem(NUDGE_KEY) === '1';
    } catch {
      /* storage blocked — just show it */
    }
    if (seen) return;
    const show = window.setTimeout(() => {
      setNudge(true);
      try {
        sessionStorage.setItem(NUDGE_KEY, '1');
      } catch {
        /* ignore */
      }
    }, 9000);
    const hide = window.setTimeout(() => setNudge(false), 17000);
    return () => {
      clearTimeout(show);
      clearTimeout(hide);
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  const openChat = () => {
    setMounted(true);
    setOpen(true);
    setNudge(false);
  };

  return (
    <>
      {mounted && (
        <div
          inert={!open}
          className={`fixed z-[60] inset-x-3 bottom-3 h-[min(620px,calc(100svh-24px))] sm:inset-x-auto sm:right-6 sm:bottom-6 sm:w-[380px] origin-bottom-right transition-[opacity,scale,translate] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
            open ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-3 pointer-events-none'
          }`}
        >
          <ChatPanel onClose={() => setOpen(false)} />
        </div>
      )}

      <div
        className={`fixed z-50 right-4 bottom-[84px] sm:right-6 sm:bottom-[100px] flex items-center gap-3 transition-[opacity,scale] duration-300 ${
          open ? 'opacity-0 scale-75 pointer-events-none' : 'opacity-100 scale-100'
        }`}
      >
        <button
          onClick={openChat}
          tabIndex={-1}
          aria-hidden="true"
          className={`hidden sm:block rounded-full bg-white px-4 py-2 text-xs font-bold text-slate-800 shadow-[0_10px_30px_-10px_rgba(4,18,31,0.45)] border border-slate-200/80 transition-[opacity,translate] duration-500 cursor-pointer ${
            nudge ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-3 pointer-events-none'
          }`}
        >
          Need a quote? Chat with us
        </button>
        <button
          onClick={openChat}
          onPointerEnter={() => void loadPanel()}
          onFocus={() => void loadPanel()}
          aria-label="Chat with us — send Masar Arabia a message"
          aria-expanded={open}
          className="mx-chat-launch relative w-14 h-14 rounded-full bg-gradient-to-br from-[#0d7cae] to-[#06486a] text-white flex items-center justify-center shadow-[0_14px_30px_-10px_rgba(13,124,174,0.9)] hover:scale-105 active:scale-95 transition-transform cursor-pointer"
        >
          <MessageCircle className="w-6 h-6" />
          <span aria-hidden="true" className="absolute top-1 right-1 w-3 h-3 rounded-full border-2 border-white bg-emerald-400" />
        </button>
      </div>
    </>
  );
}
