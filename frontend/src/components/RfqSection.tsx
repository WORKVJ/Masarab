'use client';

import React, { useState } from 'react';
import { submitRfq } from '@/lib/api';
import { CATEGORIES, CONTACT, PRODUCT_RANGE } from '@/lib/masarContent';

const RANGE_CATEGORY = 'Pipes, Fittings & Valves';
import { Send, CheckCircle2, PhoneCall, AlertCircle, Mail, MapPin, ArrowUpRight } from 'lucide-react';
import SectionHeader from './sections/SectionHeader';
import RollText from './motion/RollText';

interface RfqSectionProps {
  prefilledProduct?: string;
  onClearPrefill?: () => void;
}

const inputCls =
  'w-full px-4 py-3 rounded-xl bg-white border border-slate-200 text-slate-900 text-base sm:text-sm placeholder:text-slate-400 focus:outline-none focus:border-[#0d7cae] focus:ring-4 focus:ring-[#0d7cae]/10 transition';
const labelCls = 'block text-xs font-bold text-slate-700 mb-1.5';

export default function RfqSection({ prefilledProduct, onClearPrefill }: RfqSectionProps) {
  const [fullName, setFullName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [projectLocation, setProjectLocation] = useState('');
  const [productCategory, setProductCategory] = useState(CATEGORIES[0].name);
  const [estimatedQuantity, setEstimatedQuantity] = useState('');
  const [specificationsNotes, setSpecificationsNotes] = useState('');

  const [loading, setLoading] = useState(false);
  const [submittedRfqNumber, setSubmittedRfqNumber] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // When a product/category is clicked elsewhere on the page, pre-fill the form
  // (state adjusted during render — React's recommended alternative to a syncing effect)
  const [appliedPrefill, setAppliedPrefill] = useState('');
  if (prefilledProduct && prefilledProduct !== appliedPrefill) {
    setAppliedPrefill(prefilledProduct);
    const cat = CATEGORIES.find(
      (c) => c.name === prefilledProduct || c.products.some((p) => p.name === prefilledProduct)
    );
    if (cat) setProductCategory(cat.name);
    else if (PRODUCT_RANGE.some((p) => p.name === prefilledProduct)) setProductCategory(RANGE_CATEGORY);
    const text = `Requesting a quotation for: ${prefilledProduct}.`;
    if (!specificationsNotes.includes(text)) {
      setSpecificationsNotes(specificationsNotes ? `${text}\n${specificationsNotes}` : text);
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);
    try {
      const response = await submitRfq({
        full_name: fullName,
        company_name: companyName,
        email,
        phone,
        project_location: projectLocation,
        product_category: productCategory,
        estimated_quantity: estimatedQuantity,
        specifications_notes: specificationsNotes,
      });
      setSubmittedRfqNumber(response.rfq_number);
    } catch {
      setErrorMsg(
        `We couldn't send your request online right now. Tap below to send it by email instead — everything you typed is already filled in — or call ${CONTACT.phoneDisplay}.`
      );
    } finally {
      setLoading(false);
    }
  };

  // Pre-filled email used when the online RFQ backend is unavailable (e.g. frontend-only Vercel deploy)
  const mailtoHref = `mailto:${CONTACT.email}?subject=${encodeURIComponent(
    `Quote request — ${productCategory}${companyName ? ` — ${companyName}` : ''}`
  )}&body=${encodeURIComponent(
    [
      `Name: ${fullName}`,
      `Company: ${companyName}`,
      `Email: ${email}`,
      `Phone: ${phone}`,
      `Product category: ${productCategory}`,
      `Project location: ${projectLocation}`,
      `Estimated quantity: ${estimatedQuantity}`,
      '',
      'Requirements:',
      specificationsNotes,
    ].join('\n')
  )}`;

  const handleReset = () => {
    setSubmittedRfqNumber(null);
    setFullName('');
    setCompanyName('');
    setEmail('');
    setPhone('');
    setProjectLocation('');
    setEstimatedQuantity('');
    setSpecificationsNotes('');
    setAppliedPrefill('');
    onClearPrefill?.();
  };

  const contactItems = [
    { icon: MapPin, label: 'Head Office', value: [CONTACT.company, ...CONTACT.addressLines].join(', '), href: CONTACT.mapUrl },
    { icon: PhoneCall, label: 'Call Us', value: CONTACT.phoneDisplay, href: CONTACT.phoneHref },
    { icon: Mail, label: 'Email Us', value: CONTACT.email, href: `mailto:${CONTACT.email}` },
  ];

  return (
    <section id="rfq" className="relative py-20 sm:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-12 gap-12">
        {/* Left: contact */}
        <div className="lg:col-span-5">
          <SectionHeader
            eyebrow="Contact Us"
            title={
              <>
                Get In Touch for a <span className="text-[#0d7cae]">Quotation</span>
              </>
            }
            intro="Tell us what you need — product names, quantities or drawings — and our team will get back to you with pricing and availability."
          />

          <div className="mt-10 space-y-3">
            {contactItems.map(({ icon: Icon, label, value, href }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith('http') ? '_blank' : undefined}
                rel="noreferrer"
                data-anim="left"
                className="group flex items-start gap-4 rounded-2xl border border-slate-200/80 bg-[#f6f9fc] p-5 hover:border-sky-300 hover:bg-white transition-colors"
              >
                <div className="w-11 h-11 rounded-xl bg-[#0d7cae] text-white flex items-center justify-center shrink-0 transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-12">
                  <Icon className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs text-slate-500">{label}</p>
                  <p className="mt-0.5 text-sm font-bold text-slate-900 leading-snug">{value}</p>
                </div>
                <ArrowUpRight className="ml-auto w-4 h-4 text-slate-300 group-hover:text-[#0d7cae] group-hover:rotate-45 transition-[color,rotate] duration-300 shrink-0" />
              </a>
            ))}
          </div>
        </div>

        {/* Right: form */}
        <div className="lg:col-span-7" data-anim="right">
          <div className="rounded-[32px] bg-gradient-to-br from-[#f0f9ff] to-[#e0f2fe]/60 border border-sky-100 p-6 sm:p-10">
            {submittedRfqNumber ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 rounded-full bg-white text-emerald-600 flex items-center justify-center mx-auto shadow-md">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="mt-5 text-2xl font-black uppercase text-slate-950">Request Received</h3>
                <p className="mt-2 text-sm text-slate-600 max-w-md mx-auto">
                  Thank you. Our team will contact you shortly. Please keep your reference number:
                </p>
                <p className="mt-5 inline-block rounded-2xl bg-white px-6 py-3 font-mono text-xl font-black text-[#0d7cae] shadow-sm">
                  {submittedRfqNumber}
                </p>
                <div>
                  <button
                    onClick={handleReset}
                    className="mt-8 rounded-full bg-slate-950 hover:bg-[#0d7cae] text-white px-6 py-3 text-sm font-bold transition-colors cursor-pointer"
                  >
                    Send Another Request
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <h3 className="text-lg font-black uppercase text-slate-950">Request a Quote</h3>

                {errorMsg && (
                  <div className="p-3.5 bg-amber-50 border border-amber-200 rounded-xl text-amber-900 text-sm space-y-3">
                    <p className="flex items-start gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                      <span>{errorMsg}</span>
                    </p>
                    <a
                      href={mailtoHref}
                      className="inline-flex items-center gap-2 h-11 px-5 rounded-full bg-[#0d7cae] hover:bg-[#0b6a95] text-white text-sm font-bold transition-colors"
                    >
                      <Mail className="w-4 h-4" /> Send by email instead
                    </a>
                  </div>
                )}

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className={labelCls} htmlFor="rfq-name">Full Name *</label>
                    <input id="rfq-name" required value={fullName} onChange={(e) => setFullName(e.target.value)} className={inputCls} placeholder="Your name" />
                  </div>
                  <div>
                    <label className={labelCls} htmlFor="rfq-company">Company *</label>
                    <input id="rfq-company" required value={companyName} onChange={(e) => setCompanyName(e.target.value)} className={inputCls} placeholder="Company name" />
                  </div>
                  <div>
                    <label className={labelCls} htmlFor="rfq-email">Email *</label>
                    <input id="rfq-email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className={inputCls} placeholder="name@company.com" />
                  </div>
                  <div>
                    <label className={labelCls} htmlFor="rfq-phone">Phone *</label>
                    <input id="rfq-phone" type="tel" required value={phone} onChange={(e) => setPhone(e.target.value)} className={inputCls} placeholder="+966 5X XXX XXXX" />
                  </div>
                  <div>
                    <label className={labelCls} htmlFor="rfq-category">Product Category</label>
                    <select id="rfq-category" value={productCategory} onChange={(e) => setProductCategory(e.target.value)} className={inputCls}>
                      <option value={RANGE_CATEGORY}>{RANGE_CATEGORY}</option>
                      {CATEGORIES.map((c) => (
                        <option key={c.id} value={c.name}>{c.name}</option>
                      ))}
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className={labelCls} htmlFor="rfq-location">Project Location</label>
                    <input id="rfq-location" value={projectLocation} onChange={(e) => setProjectLocation(e.target.value)} className={inputCls} placeholder="Jeddah, Riyadh, Dammam…" />
                  </div>
                </div>
                <div>
                  <label className={labelCls} htmlFor="rfq-qty">Estimated Quantity</label>
                  <input id="rfq-qty" value={estimatedQuantity} onChange={(e) => setEstimatedQuantity(e.target.value)} className={inputCls} placeholder="e.g. 200 units, 500 m²" />
                </div>
                <div>
                  <label className={labelCls} htmlFor="rfq-notes">Requirements *</label>
                  <textarea id="rfq-notes" required rows={4} value={specificationsNotes} onChange={(e) => setSpecificationsNotes(e.target.value)} className={`${inputCls} resize-none`} placeholder="Product names, sizes, specifications or anything else we should know" />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="group w-full py-3.5 rounded-full bg-[#0d7cae] hover:bg-[#0b6a95] text-white font-bold text-sm transition-colors flex items-center justify-center gap-2 shadow-[0_10px_30px_-10px_rgba(13,124,174,0.7)] cursor-pointer disabled:opacity-60"
                >
                  {loading ? (
                    'Sending…'
                  ) : (
                    <>
                      <RollText>Send Request</RollText>
                      <Send className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
