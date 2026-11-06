'use client';

import { useRouter } from 'next/navigation';
import { useCallback } from 'react';
import { quoteHref } from './routes';

/**
 * Returns a function that opens the Contact page, with the quote form pre-filled
 * for the given product or category name.
 */
export function useRequestQuote() {
  const router = useRouter();
  return useCallback((product?: string) => router.push(quoteHref(product)), [router]);
}
