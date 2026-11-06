'use client';

import dynamic from 'next/dynamic';
import { usePathname } from 'next/navigation';

// Client-only: these touch window/document and never render server HTML
const MotionEngine = dynamic(() => import('./MotionEngine'), { ssr: false });
const ScrollController = dynamic(() => import('../ScrollController'), { ssr: false });

/**
 * Mounted once in the root layout. Keyed by the pathname so that every page navigation
 * tears down the previous page's scroll triggers and re-creates smooth scrolling + all
 * reveal/parallax animations for the new page's DOM.
 */
export default function MotionRoot() {
  const pathname = usePathname() || '/';
  return (
    <>
      <MotionEngine key={`engine-${pathname}`} />
      <ScrollController key={`dial-${pathname}`} />
    </>
  );
}
