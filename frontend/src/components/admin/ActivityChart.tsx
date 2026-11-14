'use client';

import { useState } from 'react';

/** Validated categorical pair (light surface): quote requests, contact messages. */
const COLORS = { quotes: '#2a78d6', messages: '#eb6834' };

type Day = { date: string; quotes: number; messages: number };

const dayFmt = new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'short' });
const longFmt = new Intl.DateTimeFormat('en-GB', { weekday: 'short', day: 'numeric', month: 'short' });
const asDate = (d: string) => new Date(`${d}T00:00:00`);

/** Daily enquiries as stacked bars (quotes below, messages above), with hover details and a table view. */
export default function ActivityChart({ days }: { days: Day[] }) {
  const [hover, setHover] = useState<number | null>(null);
  const max = Math.max(1, ...days.map((d) => d.quotes + d.messages));
  const top = niceMax(max);
  const totals = days.reduce((a, d) => ({ q: a.q + d.quotes, m: a.m + d.messages }), { q: 0, m: 0 });
  const h = hover !== null ? days[hover] : null;

  return (
    <div className="mt-3">
      <div className="flex flex-wrap items-center gap-x-5 gap-y-1 text-sm text-slate-600">
        <Legend color={COLORS.quotes} label={`Quote requests (${totals.q})`} />
        <Legend color={COLORS.messages} label={`Contact messages (${totals.m})`} />
      </div>

      <div className="relative mt-4 flex gap-2">
        {/* y axis */}
        <div className="flex h-44 w-6 shrink-0 flex-col justify-between text-right text-[11px] tabular-nums text-slate-400" aria-hidden="true">
          <span className="-translate-y-1/2">{top}</span>
          <span>{top / 2}</span>
          <span className="translate-y-1/2">0</span>
        </div>

        <div className="relative min-w-0 flex-1">
          {/* recessive grid */}
          <div className="pointer-events-none absolute inset-x-0 top-0 h-44" aria-hidden="true">
            <div className="absolute inset-x-0 top-0 border-t border-dashed border-slate-200" />
            <div className="absolute inset-x-0 top-1/2 border-t border-dashed border-slate-200" />
            <div className="absolute inset-x-0 bottom-0 border-t border-slate-300" />
          </div>

          <div className="relative flex h-44 items-end" role="img" aria-label={`Enquiries per day over the last 30 days: ${totals.q} quote requests and ${totals.m} messages`}>
            {days.map((d, i) => {
              const qh = (d.quotes / top) * 100;
              const mh = (d.messages / top) * 100;
              return (
                <div
                  key={d.date}
                  className="group relative flex h-full flex-1 flex-col justify-end px-[1px] sm:px-0.5"
                  onMouseEnter={() => setHover(i)}
                  onMouseLeave={() => setHover(null)}
                >
                  {hover === i && <div className="absolute inset-0 rounded-md bg-slate-100/70" aria-hidden="true" />}
                  <div className="relative flex flex-col justify-end gap-[2px]" style={{ height: `${qh + mh}%` }}>
                    {d.messages > 0 && <div className="w-full rounded-t-[4px]" style={{ height: `${(mh / (qh + mh)) * 100}%`, background: COLORS.messages }} />}
                    {d.quotes > 0 && <div className={`w-full ${d.messages > 0 ? '' : 'rounded-t-[4px]'}`} style={{ height: `${(qh / (qh + mh)) * 100}%`, background: COLORS.quotes }} />}
                  </div>
                </div>
              );
            })}
          </div>

          {h && hover !== null && (
            <div
              className="pointer-events-none absolute -top-2 z-10 w-44 -translate-y-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs shadow-lg"
              style={{ left: `clamp(0px, calc(${((hover + 0.5) / days.length) * 100}% - 88px), calc(100% - 176px))` }}
            >
              <p className="font-semibold text-slate-900">{longFmt.format(asDate(h.date))}</p>
              <TipRow color={COLORS.quotes} label="Quote requests" value={h.quotes} />
              <TipRow color={COLORS.messages} label="Messages" value={h.messages} />
            </div>
          )}

          {/* x axis: first, middle, last day */}
          <div className="mt-2 flex justify-between text-[11px] text-slate-400" aria-hidden="true">
            <span>{dayFmt.format(asDate(days[0].date))}</span>
            <span>{dayFmt.format(asDate(days[Math.floor(days.length / 2)].date))}</span>
            <span>{dayFmt.format(asDate(days[days.length - 1].date))}</span>
          </div>
        </div>
      </div>

      <details className="mt-4 text-sm">
        <summary className="cursor-pointer text-slate-500 hover:text-slate-700">View as table</summary>
        <div className="mt-2 max-h-64 overflow-auto rounded-xl border border-slate-200">
          <table className="w-full text-left text-sm">
            <thead className="sticky top-0 bg-slate-50 text-xs text-slate-500">
              <tr>
                <th className="px-3 py-2 font-medium">Date</th>
                <th className="px-3 py-2 text-right font-medium">Quote requests</th>
                <th className="px-3 py-2 text-right font-medium">Messages</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {[...days].reverse().map((d) => (
                <tr key={d.date}>
                  <td className="px-3 py-1.5 text-slate-700">{longFmt.format(asDate(d.date))}</td>
                  <td className="px-3 py-1.5 text-right tabular-nums">{d.quotes}</td>
                  <td className="px-3 py-1.5 text-right tabular-nums">{d.messages}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </details>
    </div>
  );
}

/** Round the axis top up to 2, 4, 6, 10, 20, 40 … so the midline label is a whole number. */
function niceMax(n: number) {
  if (n <= 2) return 2;
  const pow = 10 ** Math.floor(Math.log10(n));
  for (const m of [1, 2, 4, 6, 10]) if (m * pow >= n) return m * pow;
  return 10 * pow;
}

function Legend({ color, label }: { color: string; label: string }) {
  return (
    <span className="inline-flex items-center gap-2">
      <span className="h-2.5 w-2.5 rounded-[3px]" style={{ background: color }} aria-hidden="true" />
      {label}
    </span>
  );
}

function TipRow({ color, label, value }: { color: string; label: string; value: number }) {
  return (
    <p className="mt-1 flex items-center gap-2 text-slate-600">
      <span className="h-2 w-2 rounded-[2px]" style={{ background: color }} aria-hidden="true" />
      <span className="flex-1">{label}</span>
      <span className="font-semibold tabular-nums text-slate-900">{value}</span>
    </p>
  );
}
