import { contactFromApi, DEFAULT_CONTACT, type SiteContact } from './contact';

/** Cache tag the backend asks us to refresh (POST /revalidate-cache) after Contact Details are saved. */
export const SITE_SETTINGS_TAG = 'site-settings';

/**
 * Server-side address of the Django API. On the Droplet the website talks to it directly
 * (INTERNAL_API_URL=http://127.0.0.1:8000/api); without it (e.g. Vercel) the built-in details are used.
 */
export const SERVER_API = process.env.INTERNAL_API_URL || (process.env.NODE_ENV === 'development' ? 'http://127.0.0.1:8000/api' : '');

/** Server components only. Cached for an hour, and refreshed immediately when the panel saves. */
export async function getSiteContact(): Promise<SiteContact> {
  if (!SERVER_API) return DEFAULT_CONTACT;
  try {
    const res = await fetch(`${SERVER_API}/site-settings/`, { next: { tags: [SITE_SETTINGS_TAG], revalidate: 3600 } });
    if (!res.ok) return DEFAULT_CONTACT;
    return contactFromApi(await res.json());
  } catch {
    return DEFAULT_CONTACT; // backend down: the site keeps working with the built-in details
  }
}
