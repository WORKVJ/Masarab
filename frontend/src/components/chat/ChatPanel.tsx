'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { ArrowUp, Mail, PhoneCall, RotateCcw, X } from 'lucide-react';
import { CATEGORIES, CONTACT } from '@/lib/masarContent';
import { submitContact } from '@/lib/api';

/**
 * Chat-style contact form. A short guided conversation collects the enquiry
 * (topic → category → name → email → phone → message), shows a summary, then posts it to the
 * backend's /contact/ endpoint. If sending fails, the visitor gets a pre-filled email + call option.
 * Loaded on demand by ChatContact, so none of this ships with the initial page.
 */

type Step = 'topic' | 'category' | 'name' | 'email' | 'phone' | 'message' | 'review' | 'sending' | 'done' | 'error';
interface Msg {
  id: number;
  from: 'bot' | 'user';
  text: string;
}

const TOPICS = ['Request a quote', 'Product information', 'General enquiry'];
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_RE = /^\+?[\d\s()-]{7,20}$/;

const EMPTY = { topic: '', category: '', name: '', email: '', phone: '', message: '' };

const PROMPTS: Partial<Record<Step, { placeholder: string; type: string; max: number }>> = {
  name: { placeholder: 'Your full name', type: 'text', max: 120 },
  email: { placeholder: 'name@company.com', type: 'email', max: 254 },
  phone: { placeholder: '+966 5x xxx xxxx', type: 'tel', max: 40 },
  message: { placeholder: 'Product names, quantities, sizes…', type: 'text', max: 2000 },
};

export default function ChatPanel({ onClose }: { onClose: () => void }) {
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [step, setStep] = useState<Step>('topic');
  const [typing, setTyping] = useState(false);
  const [input, setInput] = useState('');
  const [error, setError] = useState('');
  const [form, setForm] = useState(EMPTY);
  const update = (patch: Partial<typeof EMPTY>) => setForm((f) => ({ ...f, ...patch }));
  const nextId = useRef(0);
  const timers = useRef<number[]>([]);
  const listRef = useRef<HTMLDivElement>(null);
  const fieldRef = useRef<HTMLInputElement & HTMLTextAreaElement>(null);

  const push = (from: Msg['from'], text: string) => setMsgs((m) => [...m, { id: ++nextId.current, from, text }]);

  /** Bot "types" each line with a short, length-based pause, then moves to the next step. */
  const say = (lines: string[], next: Step) => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    setTyping(true);
    let delay = 0;
    lines.forEach((line, i) => {
      delay += reduced ? 0 : 450 + Math.min(line.length * 7, 550);
      timers.current.push(
        window.setTimeout(() => {
          push('bot', line);
          if (i === lines.length - 1) {
            setTyping(false);
            setStep(next);
          }
        }, delay)
      );
    });
  };

  const greet = () =>
    say(
      ['Hello! Welcome to Masar Arabia.', 'I can pass your enquiry straight to our team. What can we help you with?'],
      'topic'
    );

  useEffect(() => {
    const t = window.setTimeout(greet, 0);
    const pending = timers.current;
    return () => {
      clearTimeout(t);
      pending.forEach(clearTimeout);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // keep the newest message in view
  useEffect(() => {
    const el = listRef.current;
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: 'smooth' });
  }, [msgs, typing, step]);

  // focus the text field whenever the conversation is waiting for typed input
  useEffect(() => {
    if (!typing && PROMPTS[step]) fieldRef.current?.focus({ preventScroll: true });
  }, [step, typing]);

  const chooseTopic = (topic: string) => {
    update({ topic });
    push('user', topic);
    if (topic === 'General enquiry') say(["Sure. What's your name?"], 'name');
    else say(['Which product category is it about?'], 'category');
  };

  const chooseCategory = (category: string) => {
    update({ category });
    push('user', category);
    say(["Got it. What's your name?"], 'name');
  };

  const answer = (raw: string) => {
    const value = raw.trim();
    setError('');
    if (step === 'name') {
      if (value.length < 2) return setError('Please enter your name.');
      update({ name: value });
      push('user', value);
      setInput('');
      say([`Thanks, ${value.split(/\s+/)[0]}. What's your email address?`], 'email');
    } else if (step === 'email') {
      if (!EMAIL_RE.test(value)) return setError('Please enter a valid email address.');
      update({ email: value });
      push('user', value);
      setInput('');
      say(['And a phone number, so we can call you back? (optional)'], 'phone');
    } else if (step === 'phone') {
      if (value && !PHONE_RE.test(value)) return setError('Please enter a valid phone number, or skip.');
      update({ phone: value });
      push('user', value || 'Skip');
      setInput('');
      say(['Please describe your requirement — product names, quantities, sizes or any other details.'], 'message');
    } else if (step === 'message') {
      if (value.length < 5) return setError('Please add a few words about what you need.');
      update({ message: value });
      push('user', value);
      setInput('');
      say(['Here is a summary of your message. Shall I send it to our team?'], 'review');
    }
  };

  const subject = (form.category ? `${form.topic} — ${form.category}` : form.topic) || 'Website enquiry';

  const send = async () => {
    setStep('sending');
    const { name, email, phone, message } = form;
    try {
      await submitContact({ name, email, phone, subject, message });
      say(['Thank you! Your message has been sent to the Masar Arabia team.', `We'll reply to ${email} shortly.`], 'done');
    } catch {
      say(["Sorry — I couldn't send your message just now.", 'You can email it to us instead (it’s already written for you), or give us a call.'], 'error');
    }
  };

  const restart = () => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
    setForm(EMPTY);
    setMsgs([]);
    setInput('');
    setError('');
    setStep('topic');
    greet();
  };

  const mailBody = `Name: ${form.name}
Email: ${form.email}${form.phone ? `
Phone: ${form.phone}` : ''}

${form.message}`;
  const mailto = `mailto:${CONTACT.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(mailBody)}`;

  const prompt = PROMPTS[step];
  const waiting = typing || step === 'sending';

  return (
    <div role="dialog" aria-label="Chat with Masar Arabia" className="flex h-full flex-col overflow-hidden rounded-[26px] border border-slate-200/80 bg-white shadow-[0_30px_80px_-20px_rgba(4,18,31,0.45)]">
      {/* header */}
      <div className="relative flex items-center gap-3 bg-gradient-to-br from-[#0d7cae] to-[#06486a] px-4 py-3.5 text-white">
        <span className="relative w-10 h-10 shrink-0 rounded-full bg-white flex items-center justify-center">
          <Image src="/images/logo-icon.png" alt="" width={24} height={25} />
          <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-[#0b6a95] bg-emerald-400" />
        </span>
        <span className="min-w-0 flex-1 leading-tight">
          <span className="block text-sm font-bold">Masar Arabia</span>
          <span className="block text-[11px] text-sky-100/80">Send us a message — we reply by email</span>
        </span>
        <button
          onClick={onClose}
          aria-label="Close chat"
          className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-white/15 transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* conversation */}
      <div ref={listRef} className="flex-1 overflow-y-auto overscroll-contain bg-[#f6f9fc] px-4 py-4 space-y-2.5" aria-live="polite">
        {msgs.map((m) => (
          <div key={m.id} className={`mx-chat-in flex ${m.from === 'user' ? 'justify-end' : 'justify-start'}`}>
            <p
              className={`max-w-[82%] whitespace-pre-line break-words rounded-2xl px-3.5 py-2.5 text-[13px] leading-relaxed ${
                m.from === 'user'
                  ? 'rounded-br-md bg-[#0d7cae] text-white'
                  : 'rounded-bl-md bg-white text-slate-700 border border-slate-200/70 shadow-[0_2px_6px_-3px_rgba(15,23,42,0.15)]'
              }`}
            >
              {m.text}
            </p>
          </div>
        ))}

        {typing && (
          <div className="mx-chat-in flex justify-start" aria-label="Masar Arabia is typing">
            <span className="flex gap-1 rounded-2xl rounded-bl-md border border-slate-200/70 bg-white px-3.5 py-3">
              <span className="mx-chat-dot" />
              <span className="mx-chat-dot" style={{ animationDelay: '0.15s' }} />
              <span className="mx-chat-dot" style={{ animationDelay: '0.3s' }} />
            </span>
          </div>
        )}

        {/* quick replies */}
        {!waiting && step === 'topic' && (
          <div className="mx-chat-in flex flex-wrap gap-2 pt-1">
            {TOPICS.map((t) => (
              <button key={t} onClick={() => chooseTopic(t)} className="mx-chat-chip">
                {t}
              </button>
            ))}
          </div>
        )}
        {!waiting && step === 'category' && (
          <div className="mx-chat-in flex flex-wrap gap-2 pt-1">
            {[...CATEGORIES.map((c) => c.name), 'Other'].map((c) => (
              <button key={c} onClick={() => chooseCategory(c)} className="mx-chat-chip">
                {c}
              </button>
            ))}
          </div>
        )}

        {/* summary */}
        {(step === 'review' || step === 'sending') && !typing && (
          <div className="mx-chat-in rounded-2xl border border-sky-200 bg-white p-3.5 text-[12.5px] text-slate-700 space-y-1">
            <p><span className="text-slate-400">Subject:</span> {subject}</p>
            <p><span className="text-slate-400">Name:</span> {form.name}</p>
            <p className="break-all"><span className="text-slate-400">Email:</span> {form.email}</p>
            {form.phone && <p><span className="text-slate-400">Phone:</span> {form.phone}</p>}
            <p className="whitespace-pre-line break-words"><span className="text-slate-400">Message:</span> {form.message}</p>
          </div>
        )}
      </div>

      {/* footer: input / actions for the current step */}
      <div className="border-t border-slate-200/80 bg-white p-3">
        {prompt && (
          <form
            noValidate
            onSubmit={(e) => {
              e.preventDefault();
              if (!waiting) answer(input);
            }}
          >
            <div className="flex items-end gap-2">
              {step === 'message' ? (
                <textarea
                  ref={fieldRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      if (!waiting) answer(input);
                    }
                  }}
                  rows={2}
                  maxLength={prompt.max}
                  placeholder={prompt.placeholder}
                  aria-label="Your message"
                  disabled={waiting}
                  className="mx-chat-field resize-none"
                />
              ) : (
                <input
                  ref={fieldRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  type={prompt.type}
                  inputMode={step === 'phone' ? 'tel' : step === 'email' ? 'email' : undefined}
                  autoComplete={step === 'name' ? 'name' : step === 'email' ? 'email' : step === 'phone' ? 'tel' : 'off'}
                  maxLength={prompt.max}
                  placeholder={prompt.placeholder}
                  aria-label={prompt.placeholder}
                  disabled={waiting}
                  className="mx-chat-field"
                />
              )}
              <button
                type="submit"
                disabled={waiting || (!input.trim() && step !== 'phone')}
                aria-label="Send"
                className="w-10 h-10 shrink-0 rounded-full bg-[#0d7cae] text-white flex items-center justify-center transition-[background-color,opacity] hover:bg-[#0b6a95] disabled:opacity-40 cursor-pointer"
              >
                <ArrowUp className="w-4 h-4" />
              </button>
            </div>
            {step === 'phone' && !waiting && (
              <button type="button" onClick={() => answer('')} className="mt-2 text-xs font-bold text-[#0d7cae] cursor-pointer">
                Skip
              </button>
            )}
            {error && <p className="mt-2 text-xs text-red-600" role="alert">{error}</p>}
          </form>
        )}

        {(step === 'review' || step === 'sending') && (
          <div className="flex gap-2">
            <button
              onClick={send}
              disabled={waiting}
              className="flex-1 h-11 rounded-full bg-[#0d7cae] text-sm font-bold text-white hover:bg-[#0b6a95] disabled:opacity-60 transition-colors cursor-pointer"
            >
              {step === 'sending' ? 'Sending…' : 'Send Message'}
            </button>
            <button
              onClick={restart}
              disabled={waiting}
              className="h-11 px-4 rounded-full border border-slate-200 text-sm font-bold text-slate-700 hover:border-sky-300 transition-colors cursor-pointer"
            >
              Start over
            </button>
          </div>
        )}

        {(step === 'done' || step === 'error') && !typing && (
          <div className="flex flex-wrap gap-2">
            {step === 'error' && (
              <a href={mailto} className="flex-1 h-11 inline-flex items-center justify-center gap-2 rounded-full bg-[#0d7cae] text-sm font-bold text-white hover:bg-[#0b6a95] transition-colors">
                <Mail className="w-4 h-4" /> Email it to us
              </a>
            )}
            <a href={CONTACT.phoneHref} className="h-11 px-4 inline-flex items-center justify-center gap-2 rounded-full border border-slate-200 text-sm font-bold text-slate-700 hover:border-sky-300 transition-colors">
              <PhoneCall className="w-4 h-4 text-[#0d7cae]" /> Call
            </a>
            <button onClick={restart} className="h-11 px-4 inline-flex items-center justify-center gap-2 rounded-full border border-slate-200 text-sm font-bold text-slate-700 hover:border-sky-300 transition-colors cursor-pointer">
              <RotateCcw className="w-4 h-4 text-[#0d7cae]" /> New message
            </button>
          </div>
        )}

        {(step === 'topic' || step === 'category') && !typing && (
          <p className="text-center text-[11px] text-slate-400">
            Or email <a href={`mailto:${CONTACT.email}`} className="text-[#0d7cae] font-semibold">{CONTACT.email}</a>
          </p>
        )}
      </div>
    </div>
  );
}
