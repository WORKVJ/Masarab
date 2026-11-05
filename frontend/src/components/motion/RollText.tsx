import React from 'react';

/**
 * Hover "roll" for link/button labels: the label slides up and an identical copy rolls in.
 * The copy is aria-hidden so screen readers and crawlers read the label once.
 * Pure CSS (transform only) — triggers on hover of the nearest `.group` ancestor.
 */
export default function RollText({ children }: { children: string }) {
  return (
    <span className="mx-roll">
      <span className="mx-roll-a">{children}</span>
      <span className="mx-roll-b" aria-hidden="true">
        {children}
      </span>
    </span>
  );
}
