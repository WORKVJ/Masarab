import React from 'react';

/**
 * Masar Arabia mark as crisp vector shapes (traced from the official logo artwork).
 * Each piece carries a class so it can be animated on its own (see .mx-pl-* in globals.css).
 */
export default function LogoMark({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 90 100" className={className} role="img" aria-label="Masar Arabia">
      {/* blue base triangle */}
      <polygon className="lm-blue" points="4.5,99.6 88.9,33.6 89.6,99.8" fill="#0c7bad" />
      {/* red side triangle */}
      <polygon className="lm-red" points="0.1,37.8 36.6,60.6 1.2,89.2 0,88" fill="#c8412b" />
      {/* rising sun dome */}
      <path className="lm-sun" d="M35.7 48.1 Q45.2 37.6 54.7 47.7 L46 54.7 Z" fill="#e78a21" />
      {/* five sun rays (left → right) */}
      <polygon className="lm-ray lm-ray-1" points="0.2,5.1 27,42.3 0.6,25.7" fill="#e78a21" />
      <polygon className="lm-ray lm-ray-2" points="10,0 26.8,0.4 35.3,35.6 9.8,1.7" fill="#e78a21" />
      <polygon className="lm-ray lm-ray-3" points="37.4,0 49.6,0 45.3,33.8 43.6,30.9 36.8,2.1" fill="#e78a21" />
      <polygon className="lm-ray lm-ray-4" points="60.9,0 78.3,0 54.9,36.8 54.5,34.9 58.5,9.4" fill="#e78a21" />
      <polygon className="lm-ray lm-ray-5" points="89.1,2.1 89.6,21.7 64.7,40.6 65.3,38.5" fill="#e87d22" />
    </svg>
  );
}
