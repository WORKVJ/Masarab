'use client';

import { createContext, useContext } from 'react';
import { DEFAULT_CONTACT, type SiteContact } from '@/lib/contact';

const Ctx = createContext<SiteContact>(DEFAULT_CONTACT);

/** Hands the contact details (fetched once in the root layout) to every client component. */
export function SiteContactProvider({ value, children }: { value: SiteContact; children: React.ReactNode }) {
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export const useContact = () => useContext(Ctx);
