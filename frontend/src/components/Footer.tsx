'use client';

import React from 'react';
import Image from 'next/image';
import { MapPin, PhoneCall, Mail, ArrowUpRight, ArrowUp } from 'lucide-react';
import { CATEGORIES, CONTACT } from '@/lib/masarContent';
import { scrollToTarget } from '@/lib/motion';
import RollText from '@/components/motion/RollText';

const QUICK_LINKS = [
  { label: 'Home', href: '#hero' },
  { label: 'Product Range', href: '#product-range' },
  { label: 'About Us', href: '#about' },
  { label: 'Products', href: '#solutions' },
  { label: 'Industries', href: '#industries' },
  { label: 'Why Choose Us', href: '#why-us' },
  { label: 'Clients', href: '#clients' },
  { label: 'Contact', href: '#rfq' },
];

const linkCls =
  'group inline-flex items-center gap-1 py-1.5 text-white/65 hover:text-white transition-colors duration-300';

function LinkLabel({ children }: { children: React.ReactNode }) {
  return (
    <>
      <span className="transition-transform duration-300 group-hover:translate-x-1">{children}</span>
      <ArrowUpRight className="w-3.5 h-3.5 text-sky-300 opacity-0 -translate-x-1 transition-[opacity,translate] duration-300 group-hover:opacity-100 group-hover:translate-x-1" />
    </>
  );
}

function SocialIcon({ href, label, children }: { href: string; label: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={label}
      className="w-10 h-10 rounded-full border border-white/15 flex items-center justify-center text-white/70 hover:bg-[#0d7cae] hover:border-[#0d7cae] hover:text-white hover:-translate-y-0.5 transition-[background-color,border-color,color,translate] duration-300"
    >
      {children}
    </a>
  );
}

export default function Footer() {
  const openCategory = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    window.dispatchEvent(new CustomEvent('masar:category', { detail: id }));
    scrollToTarget('solutions');
  };

  return (
    <footer id="contact" className="relative bg-[#04121f] text-white overflow-hidden">
      <div className="mx-orb-drift absolute -top-40 -left-40 w-[480px] h-[480px] rounded-full bg-[#0d7cae]/15 blur-[120px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20">
        <div className="grid gap-12 lg:gap-10 grid-cols-2 lg:grid-cols-12">
          {/* Brand */}
          <div className="col-span-2 lg:col-span-4">
            <Image src="/images/logo-white.png" alt="Masar Arabia" width={170} height={74} className="h-11 w-auto" />
            <p className="mt-5 text-sm text-white/60 leading-relaxed max-w-sm">
              Masar Arabia, a division of Masar Arabia First Trading Company, is a leading supplier of industrial
              products in Saudi Arabia — guaranteeing high-quality products, excellent service, and timely delivery at
              competitive rates.
            </p>
            <div className="mt-6 flex gap-2">
              <SocialIcon href={CONTACT.facebook} label="Facebook">
                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" aria-hidden="true">
                  <path d="M13.5 21v-7.5h2.5l.4-3h-2.9V8.6c0-.9.3-1.5 1.5-1.5h1.5V4.4c-.3 0-1.2-.1-2.2-.1-2.2 0-3.7 1.3-3.7 3.8v2.4H8v3h2.6V21h2.9z" />
                </svg>
              </SocialIcon>
              <SocialIcon href={CONTACT.instagram} label="Instagram">
                <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <rect x="3" y="3" width="18" height="18" rx="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" />
                </svg>
              </SocialIcon>
              <SocialIcon href={CONTACT.mapUrl} label="Google Maps">
                <MapPin className="w-4 h-4" />
              </SocialIcon>
            </div>
          </div>

          {/* Quick links */}
          <nav className="lg:col-span-2" aria-label="Footer">
            <h4 className="text-xs font-mono uppercase tracking-[0.18em] text-sky-300">Quick Links</h4>
            <ul className="mt-4 space-y-1 text-sm">
              {QUICK_LINKS.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className={linkCls}>
                    <LinkLabel>{l.label}</LinkLabel>
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Products */}
          <div className="lg:col-span-3">
            <h4 className="text-xs font-mono uppercase tracking-[0.18em] text-sky-300">Products</h4>
            <ul className="mt-4 space-y-1 text-sm">
              {CATEGORIES.map((c) => (
                <li key={c.id}>
                  <a href="#solutions" onClick={(e) => openCategory(e, c.id)} className={linkCls}>
                    <LinkLabel>{c.name}</LinkLabel>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="col-span-2 lg:col-span-3">
            <h4 className="text-xs font-mono uppercase tracking-[0.18em] text-sky-300">Get In Touch</h4>
            <ul className="mt-5 space-y-4 text-sm text-white/70">
              <li>
                <a href={CONTACT.mapUrl} target="_blank" rel="noreferrer" className="group flex gap-3 hover:text-white transition-colors">
                  <MapPin className="w-4 h-4 mt-0.5 text-sky-300 shrink-0 transition-transform group-hover:-translate-y-0.5" />
                  <span>
                    {CONTACT.company}
                    <br />
                    {CONTACT.addressLines.join(', ')}
                  </span>
                </a>
              </li>
              <li>
                <a href={CONTACT.phoneHref} className="group flex gap-3 py-1.5 -my-1.5 hover:text-white transition-colors">
                  <PhoneCall className="w-4 h-4 mt-0.5 text-sky-300 shrink-0 group-hover:animate-[mxRing_0.6s_ease-in-out]" />
                  {CONTACT.phoneDisplay}
                </a>
              </li>
              <li>
                <a href={`mailto:${CONTACT.email}`} className="group flex gap-3 py-1.5 -my-1.5 hover:text-white transition-colors">
                  <Mail className="w-4 h-4 mt-0.5 text-sky-300 shrink-0 transition-transform group-hover:-translate-y-0.5" />
                  {CONTACT.email}
                </a>
              </li>
            </ul>
            <a
              href="#rfq"
              className="group mt-7 inline-flex items-center gap-2 rounded-full bg-[#0d7cae] hover:bg-[#0b6a95] px-5 py-2.5 text-sm font-bold shadow-[0_10px_30px_-10px_rgba(13,124,174,0.8)] transition-colors"
            >
              <RollText>Request a Quote</RollText>
              <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:rotate-45" />
            </a>
          </div>
        </div>

        {/* Giant wordmark — SVG text stretched to exactly the container width, so it never clips */}
        <div className="mt-16 sm:mt-20 select-none pointer-events-none" aria-hidden="true">
          <svg viewBox="0 0 1000 142" className="w-full h-auto block" preserveAspectRatio="xMidYMax meet">
            <defs>
              <linearGradient id="ftWordmark" x1="0" y1="0" x2="1" y2="1">
                <stop className="ft-wm-a" offset="0%" stopColor="#ffffff" />
                <stop className="ft-wm-b" offset="55%" stopColor="#38bdf8" />
                <stop className="ft-wm-c" offset="100%" stopColor="#e78a21" />
              </linearGradient>
            </defs>
            <text
              x="500"
              y="130"
              textAnchor="middle"
              textLength="996"
              lengthAdjust="spacingAndGlyphs"
              fill="url(#ftWordmark)"
              style={{ font: '900 150px/1 var(--font-sans, ui-sans-serif, system-ui, sans-serif)', letterSpacing: '-0.02em' }}
            >
              MASAR ARABIA
            </text>
          </svg>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="relative border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/45">
          <span>© {new Date().getFullYear()} Masar Arabia First Trading Company. All rights reserved.</span>
          <button
            onClick={() => scrollToTarget(0)}
            className="group inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-white/70 hover:text-white hover:border-sky-300/60 transition-colors cursor-pointer"
          >
            <RollText>Back to top</RollText>
            <ArrowUp className="w-3.5 h-3.5 transition-transform duration-300 group-hover:-translate-y-0.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
