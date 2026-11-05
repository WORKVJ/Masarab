import React from 'react';

/**
 * Line illustrations for the 16 Product Range lines.
 * Inline SVG: zero network requests, crisp at any size, brand-coloured via currentColor.
 * Parts marked `mx-ico-spin` / `mx-ico-lift` / `mx-ico-drip` animate when the card is hovered.
 */

const S = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2.2,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
};
const TINT = '#e0f2fe';
const ACCENT = '#f97316';

const ICONS: Record<string, React.ReactNode> = {
  // straight pipe + 90° elbow
  'pvc-cpvc': (
    <g {...S}>
      {/* one continuous tube: outer stroke = outline, inner stroke = pipe colour */}
      <path d="M6 44h24q16 0 16-16V10" strokeWidth="14" />
      <path d="M6 44h24q16 0 16-16V10" strokeWidth="9.5" stroke={TINT} />
      <path d="M22 36v16M38 26h16" />
      <g className="mx-ico-lift">
        <path d="M40 8h12" strokeWidth="2.6" />
      </g>
    </g>
  ),
  // pipe with flange and tee
  'pph-hdpe': (
    <g {...S}>
      <rect x="6" y="26" width="52" height="12" rx="2" fill={TINT} />
      <path d="M18 22v20M22 22v20M42 22v20M46 22v20" />
      <path className="mx-ico-lift" d="M28 26V12h8v14" fill={TINT} />
      <path className="mx-ico-lift" d="M26 12h12" />
    </g>
  ),
  // green PPR pipe + elbow
  ppr: (
    <g {...S}>
      <rect x="6" y="38" width="28" height="10" rx="5" fill="#dcfce7" stroke="#16a34a" />
      <path className="mx-ico-lift" d="M34 36h8a10 10 0 0 1 10 10v8h-10v-8h-8z" fill="#dcfce7" stroke="#16a34a" />
      <path className="mx-ico-lift" d="M40 12h14v14H40z" fill="#dcfce7" stroke="#16a34a" />
      <path className="mx-ico-lift" d="M47 26v6" stroke="#16a34a" />
    </g>
  ),
  // round manhole cover with grid
  manhole: (
    <g {...S}>
      <circle cx="32" cy="32" r="24" fill={TINT} />
      <circle cx="32" cy="32" r="18" />
      <g className="mx-ico-spin">
        <path d="M20 26h24M18 32h28M20 38h24M26 20v24M32 14v36M38 20v24" strokeWidth="1.6" />
      </g>
    </g>
  ),
  // Y (wye) drainage fitting
  'pvc-drainage': (
    <g {...S}>
      <path d="M26 6h12v52H26z" fill={TINT} />
      <path className="mx-ico-lift" d="M38 30l12-12 7 7-12 12" fill={TINT} />
      <path d="M24 6h16M24 58h16" />
      <path className="mx-ico-lift" d="M48 16l10 10" />
    </g>
  ),
  // two pipes joined by a coupling
  abs: (
    <g {...S}>
      <rect x="4" y="27" width="22" height="10" rx="2" fill="#f1f5f9" />
      <rect x="38" y="27" width="22" height="10" rx="2" fill="#f1f5f9" />
      <rect className="mx-ico-lift" x="22" y="23" width="20" height="18" rx="3" fill={TINT} />
      <path d="M28 23v18M36 23v18" strokeWidth="1.6" />
    </g>
  ),
  // solvent cement can with brush
  adhesives: (
    <g {...S}>
      <path d="M16 20h28v34a4 4 0 0 1-4 4H20a4 4 0 0 1-4-4z" fill={TINT} />
      <path d="M14 20h32M22 14h16v6H22z" />
      <path d="M22 32h16M22 40h10" stroke={ACCENT} />
      <g className="mx-ico-lift">
        <path d="M48 6v20" />
        <path d="M45 26h6l-1 8h-4z" fill={ACCENT} stroke={ACCENT} />
      </g>
    </g>
  ),
  // mechanical test plug with wing nut
  'test-plugs': (
    <g {...S}>
      <rect x="8" y="24" width="30" height="16" rx="8" fill={TINT} />
      <path d="M38 32h10" />
      <g className="mx-ico-spin" style={{ transformOrigin: '52px 32px' }}>
        <path d="M52 22v20M46 26l12 12M58 26L46 38" />
        <circle cx="52" cy="32" r="3" fill="currentColor" />
      </g>
    </g>
  ),
  // cast iron pipe with hub (bell end)
  'cast-iron': (
    <g {...S}>
      <rect x="6" y="26" width="38" height="12" fill="#e2e8f0" stroke="#334155" />
      <path className="mx-ico-lift" d="M44 22h12v20H44z" fill="#cbd5e1" stroke="#334155" />
      <path d="M14 26v12M24 26v12M34 26v12" stroke="#334155" strokeWidth="1.4" />
    </g>
  ),
  // tee fitting
  pvdf: (
    <g {...S}>
      <rect x="6" y="30" width="52" height="12" rx="2" fill="#f8fafc" />
      <rect className="mx-ico-lift" x="26" y="10" width="12" height="22" rx="2" fill="#f8fafc" />
      <path d="M22 28v16M42 28v16M24 10h16" />
    </g>
  ),
  // coupling sleeve with bolts
  couplings: (
    <g {...S}>
      <rect x="4" y="27" width="56" height="10" rx="2" fill="#f1f5f9" />
      <rect x="18" y="18" width="28" height="28" rx="6" fill={TINT} />
      <g className="mx-ico-lift">
        <circle cx="24" cy="14" r="3" fill="currentColor" />
        <circle cx="40" cy="14" r="3" fill="currentColor" />
        <path d="M24 17v4M40 17v4" />
      </g>
      <circle cx="24" cy="50" r="3" fill="currentColor" />
      <circle cx="40" cy="50" r="3" fill="currentColor" />
    </g>
  ),
  // valve body with pressure gauge
  pressure: (
    <g {...S}>
      <path d="M6 40h12l6-8h16l6 8h12" />
      <path d="M18 34v12h28V34" fill={TINT} />
      <path d="M32 32V22" />
      <circle cx="32" cy="14" r="9" fill="#fff" />
      <path className="mx-ico-spin" style={{ transformOrigin: '32px 14px' }} d="M32 14l4-4" stroke={ACCENT} />
    </g>
  ),
  // square floor drain with grate and water drops
  drains: (
    <g {...S}>
      <rect x="10" y="22" width="44" height="30" rx="4" fill={TINT} />
      <path d="M18 30h28M18 37h28M18 44h28" strokeWidth="1.8" />
      <path className="mx-ico-drip" d="M24 8c0 3-3 4-3 7a3 3 0 0 0 6 0c0-3-3-4-3-7zM40 6c0 3-3 4-3 7a3 3 0 0 0 6 0c0-3-3-4-3-7z" fill="#bae6fd" />
    </g>
  ),
  // copper pipes + elbow
  copper: (
    <g {...S} stroke="#c2410c">
      <rect x="6" y="40" width="30" height="8" rx="4" fill="#ffedd5" />
      <rect x="6" y="26" width="22" height="8" rx="4" fill="#ffedd5" />
      <path className="mx-ico-lift" d="M36 40h6a10 10 0 0 1 10 10v6h-8v-6a2 2 0 0 0-2-2h-6z" fill="#fed7aa" />
    </g>
  ),
  // gate valve with handwheel
  'metal-valves': (
    <g {...S}>
      <path d="M4 44h10v-8h36v8h10" />
      <path d="M14 36h36v16H14z" fill={TINT} />
      <path d="M32 36V22" />
      <g className="mx-ico-spin" style={{ transformOrigin: '32px 16px' }}>
        <circle cx="32" cy="16" r="10" />
        <path d="M22 16h20M32 6v20" strokeWidth="1.8" />
      </g>
    </g>
  ),
  // red fire hydrant
  'fire-fighting': (
    <g {...S} stroke="#b91c1c">
      <path d="M22 22h20v30H22z" fill="#fee2e2" />
      <path d="M20 22a12 12 0 0 1 24 0" fill="#fecaca" />
      <path d="M32 6v4M18 56h28" />
      <path className="mx-ico-lift" d="M14 32h8v8h-8zM42 32h8v8h-8z" fill="#fecaca" />
    </g>
  ),
};

export default function ProductIcon({ id, className = '' }: { id: string; className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
      {ICONS[id] ?? ICONS['pvc-cpvc']}
    </svg>
  );
}
