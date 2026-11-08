import type { CSSProperties } from 'react';
import {
  Activity, Atom, BadgeCheck, Beaker, Clock, Cog, Cylinder, Droplet, Droplets, Factory, Fan, Flame,
  FlaskConical, Gauge, Grid3x3, HardHat, Layers, Leaf, PlugZap, Recycle, Ruler, Settings, ShieldCheck,
  Snowflake, Thermometer, Truck, Wind, Wrench, Zap, type LucideIcon,
} from 'lucide-react';

/**
 * Visual identity for each division page (/products/<slug>), keyed by Category.id.
 * Each division gets its own colour, icon, background pattern and four highlights,
 * so opening "Cooling Solutions" feels like cooling and "Safety Equipment" feels like safety.
 * Highlight wording is taken from the client's own copy for that division.
 */
export interface DivisionTheme {
  /** main colour on light backgrounds (icons, links, buttons) */
  accent: string;
  /** light tint of the accent, readable on the dark hero */
  light: string;
  /** pale background tint */
  soft: string;
  /** "r,g,b" of a very dark shade, for the hero photo overlay */
  deep: string;
  icon: LucideIcon;
  /** CSS background-image for the hero pattern (white strokes; opacity is applied by the hero) */
  pattern: string;
  patternSize: string;
  /** hazard-tape band at the bottom of the hero instead of the usual accent line */
  hazard?: boolean;
  highlights: { icon: LucideIcon; title: string; text: string }[];
}

const svg = (w: number, h: number, body: string) =>
  `url("data:image/svg+xml,${encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='${w}' height='${h}' fill='none' stroke='white' stroke-width='1.2' stroke-linecap='round'>${body}</svg>`
  )}")`;

const PATTERNS = {
  // little six-armed frost crystals
  frost: svg(56, 56, `<path d='M28 18v20M19.3 23l17.4 10M19.3 33l17.4-10M28 18l-3 3M28 18l3 3M28 38l-3-3M28 38l3-3'/>`),
  // rolling water
  waves: svg(64, 24, `<path d='M0 12c8 0 8-8 16-8s8 8 16 8 8-8 16-8 8 8 16 8'/>`),
  // hexagonal molecule lattice
  molecules: svg(52, 60, `<path d='M26 4l20 11.5v23L26 50 6 38.5v-23z'/><circle cx='26' cy='4' r='2.2' fill='white'/><circle cx='46' cy='38.5' r='2.2' fill='white'/><path d='M26 50v10'/>`),
  // printed-circuit traces
  circuit: svg(72, 72, `<path d='M0 20h22l8 8h18M48 28v20l8 8h16M20 72V52l-8-8H0'/><circle cx='48' cy='28' r='2.5' fill='white'/><circle cx='12' cy='44' r='2.5' fill='white'/><circle cx='56' cy='56' r='2.5' fill='white'/>`),
  // gauge dial with ticks and needle
  gauge: svg(80, 80, `<path d='M18 52a24 24 0 1 1 44 0'/><path d='M40 30v4M25 36l3 3M55 36l-3 3M20 48h4M56 48h4'/><path d='M40 50l9-11'/><circle cx='40' cy='50' r='2.5' fill='white'/>`),
  // gear wheels
  gears: svg(70, 70, `<circle cx='35' cy='35' r='13' stroke-width='5' stroke-dasharray='4.2 3'/><circle cx='35' cy='35' r='6'/>`),
  // pipe runs with flanged joints
  pipes: svg(80, 48, `<path d='M0 14h80M0 34h80'/><path d='M30 9v10M34 9v10M64 29v10M68 29v10'/>`),
  // diagonal hazard tape
  hazard: 'repeating-linear-gradient(-45deg, rgba(255,255,255,0.9) 0 10px, transparent 10px 28px)',
} as const;

export const DIVISION_THEMES: Record<string, DivisionTheme> = {
  cooling: {
    accent: '#0891b2', light: '#67e8f9', soft: '#ecfeff', deep: '8,51,68',
    icon: Snowflake, pattern: PATTERNS.frost, patternSize: '56px 56px',
    highlights: [
      { icon: Fan, title: 'Effective Heat Dissipation', text: 'Cooling towers, FRP fans and heat exchangers for optimal heat exchange.' },
      { icon: Leaf, title: 'Energy Efficiency', text: 'Designed for peak performance with lower energy costs.' },
      { icon: Wind, title: 'Clean, Controlled Air', text: 'AHUs, FAHUs, FCUs and VRF for precise climate control.' },
      { icon: Clock, title: 'Less Downtime', text: 'Reliable equipment that keeps your processes running.' },
    ],
  },
  water: {
    accent: '#2563eb', light: '#93c5fd', soft: '#eff6ff', deep: '23,37,84',
    icon: Droplets, pattern: PATTERNS.waves, patternSize: '64px 24px',
    highlights: [
      { icon: Atom, title: 'Chemical-Free EDI', text: 'Continuous high-purity water without hazardous chemicals.' },
      { icon: Recycle, title: 'EDR Desalination', text: 'Efficient desalination and wastewater recovery.' },
      { icon: Droplet, title: 'High & Ultra Pure Water', text: 'For pharmaceuticals, hemodialysis and critical uses.' },
      { icon: BadgeCheck, title: 'With Pure Water Group', text: 'State-of-the-art systems, modules and parts.' },
    ],
  },
  chemical: {
    accent: '#7c3aed', light: '#c4b5fd', soft: '#f5f3ff', deep: '46,16,101',
    icon: FlaskConical, pattern: PATTERNS.molecules, patternSize: '52px 60px',
    highlights: [
      { icon: Beaker, title: 'Alcohols & Aromatics', text: 'High-quality base chemicals for diverse industries.' },
      { icon: FlaskConical, title: 'Ketones & Solvents', text: 'Including chlorinated solvents, esters and glycols.' },
      { icon: Leaf, title: 'Oleo Chemicals', text: 'Plus plasticizers and specialty grades.' },
      { icon: Truck, title: 'Supplied Across KSA', text: 'A reliable chemical supplier and distributor in Saudi Arabia.' },
    ],
  },
  electrical: {
    accent: '#ca8a04', light: '#fde047', soft: '#fefce8', deep: '66,32,6',
    icon: Zap, pattern: PATTERNS.circuit, patternSize: '72px 72px',
    highlights: [
      { icon: PlugZap, title: 'Power & Control', text: 'Battery chargers, relays, breakers, VFDs and MCBs.' },
      { icon: Grid3x3, title: 'Industrial Gratings', text: 'FRP, steel and stainless steel gratings, handrails and ladders.' },
      { icon: Factory, title: 'Every Plant Sector', text: 'Power, oil & gas, desalination, cement, steel, mining and more.' },
      { icon: Truck, title: 'Timely Delivery', text: 'Competitive rates and on-time supply for plant needs.' },
    ],
  },
  instrumentation: {
    accent: '#059669', light: '#6ee7b7', soft: '#ecfdf5', deep: '2,44,34',
    icon: Gauge, pattern: PATTERNS.gauge, patternSize: '80px 80px',
    highlights: [
      { icon: Thermometer, title: 'Moisture, Temp & Humidity', text: 'Moisture meters, thermometers, hygrometers and data loggers.' },
      { icon: Wind, title: 'Air Quality & HVAC', text: 'Indoor air quality and environmental instruments.' },
      { icon: Activity, title: 'Condition Monitoring', text: 'Plus non-destructive testing instruments.' },
      { icon: Ruler, title: 'Calibration & Lab', text: 'Calibrators and laboratory scientific equipment.' },
    ],
  },
  mechanical: {
    accent: '#4f46e5', light: '#a5b4fc', soft: '#eef2ff', deep: '30,27,75',
    icon: Cog, pattern: PATTERNS.gears, patternSize: '70px 70px',
    highlights: [
      { icon: Settings, title: 'Ball & Expansion Joints', text: 'Smooth movement and absorbed thermal expansion.' },
      { icon: Cylinder, title: 'Pumps', text: 'High-performance pumps for efficient fluid transfer.' },
      { icon: Gauge, title: 'Valves & Actuators', text: 'Precise flow control and automation.' },
      { icon: ShieldCheck, title: 'Built to Last', text: 'Precision-engineered for durability and seamless operation.' },
    ],
  },
  'pipe-fittings': {
    accent: '#475569', light: '#cbd5e1', soft: '#f1f5f9', deep: '15,23,42',
    icon: Wrench, pattern: PATTERNS.pipes, patternSize: '80px 48px',
    highlights: [
      { icon: Layers, title: 'Plates & Sheets', text: 'Premium alloys for industrial piping systems.' },
      { icon: Wrench, title: 'Special Fittings', text: 'Tailored to your unique requirements.' },
      { icon: Settings, title: 'Nuts & Bolts', text: 'Everything needed to complete the line.' },
      { icon: BadgeCheck, title: 'Seamless Integration', text: 'Quality and precision for optimal performance.' },
    ],
  },
  safety: {
    accent: '#ea580c', light: '#fdba74', soft: '#fff7ed', deep: '67,20,7',
    icon: HardHat, pattern: PATTERNS.hazard, patternSize: 'auto', hazard: true,
    highlights: [
      { icon: ShieldCheck, title: 'Rigorously Tested', text: 'Reliable protection that meets workplace safety needs.' },
      { icon: HardHat, title: 'Head-to-Toe PPE', text: 'Helmets, gloves, respirators, SCBA and coveralls.' },
      { icon: Flame, title: 'Fire & Arc Flash', text: 'Fire-retardant coveralls, fire suits and arc flash suits.' },
      { icon: Activity, title: 'Fall Protection & Lifting', text: 'Fall protection equipment and lifting equipment.' },
    ],
  },
};

/** Just the colours — plain data, safe to pass from a server page into a client component. */
export type DivisionColors = Pick<DivisionTheme, 'accent' | 'light' | 'soft' | 'deep'>;

export const themeColors = (t?: DivisionTheme): DivisionColors | undefined =>
  t ? { accent: t.accent, light: t.light, soft: t.soft, deep: t.deep } : undefined;

/**
 * CSS custom properties that themed sections read: `var(--accent)`, `var(--accent-light)`,
 * `var(--accent-soft)` and `rgb(var(--accent-deep))` / `rgba(var(--accent-deep), .5)`.
 */
export const themeVars = (t?: DivisionColors): CSSProperties | undefined =>
  t
    ? ({ '--accent': t.accent, '--accent-light': t.light, '--accent-soft': t.soft, '--accent-deep': t.deep } as CSSProperties)
    : undefined;
