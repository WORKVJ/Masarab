import { CONTACT, CONTACT_PAGE } from './masarContent';

/** Company contact details as the website uses them — edited in the admin panel (Contact Details). */
export interface SiteContact {
  company: string;
  addressLines: string[];
  phoneDisplay: string;
  phoneHref: string;
  email: string;
  mapUrl: string;
  whatsapp: string;
  whatsappHref: string;
  workingHours: string;
  facebook: string;
  instagram: string;
  linkedin: string;
  contactIntro: string;
}

/** Built-in values: used when the backend can't be reached, and for any required field left empty. */
export const DEFAULT_CONTACT: SiteContact = {
  ...CONTACT,
  whatsapp: '',
  whatsappHref: '',
  workingHours: '',
  linkedin: '',
  contactIntro: CONTACT_PAGE.text,
};

const digits = (s: string) => s.replace(/[^\d+]/g, '');

/** Shape of GET /api/site-settings/ */
export interface SiteSettingsApi {
  company?: string;
  phone_display?: string;
  email?: string;
  address_lines?: string[];
  map_url?: string;
  whatsapp?: string;
  working_hours?: string;
  facebook?: string;
  instagram?: string;
  linkedin?: string;
  contact_intro?: string;
}

export function contactFromApi(d: SiteSettingsApi): SiteContact {
  const D = DEFAULT_CONTACT;
  const phone = d.phone_display?.trim() || D.phoneDisplay;
  const wa = d.whatsapp?.trim() ?? '';
  return {
    company: d.company?.trim() || D.company,
    addressLines: d.address_lines?.length ? d.address_lines : D.addressLines,
    phoneDisplay: phone,
    phoneHref: `tel:${digits(phone)}`,
    email: d.email?.trim() || D.email,
    mapUrl: d.map_url?.trim() ?? D.mapUrl,
    whatsapp: wa,
    whatsappHref: wa ? `https://wa.me/${digits(wa).replace(/^\+/, '')}` : '',
    workingHours: d.working_hours?.trim() ?? '',
    facebook: d.facebook?.trim() ?? '',
    instagram: d.instagram?.trim() ?? '',
    linkedin: d.linkedin?.trim() ?? '',
    contactIntro: d.contact_intro?.trim() || D.contactIntro,
  };
}
