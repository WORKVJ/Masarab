/**
 * The branded loader is server-rendered and animated purely by CSS, so it shows from the
 * very first paint and always lifts away on time — even if JavaScript is slow or fails.
 *
 * It plays once per browser session: PRELOADER_HEAD_SCRIPT (inlined in <head>) adds
 * `mx-pl-skip` to <html> before first paint when the intro was already seen, which hides it.
 */
export const PRELOADER_KEY = 'masar-intro-seen';

/** Seconds from navigation start until the loader's curtain has lifted (matches the CSS timeline). */
const LOADER_TOTAL_S = 1.75;

export const PRELOADER_HEAD_SCRIPT = `try{if(sessionStorage.getItem('${PRELOADER_KEY}')==='1'||matchMedia('(prefers-reduced-motion: reduce)').matches){document.documentElement.classList.add('mx-pl-skip')}}catch(e){}`;

export function shouldShowPreloader(): boolean {
  if (typeof document === 'undefined') return false;
  return !document.documentElement.classList.contains('mx-pl-skip');
}

export function markPreloaderSeen() {
  try {
    sessionStorage.setItem(PRELOADER_KEY, '1');
  } catch {
    /* private mode — it simply shows again next time */
  }
}

/**
 * Seconds until the hero intro should start. The CSS loader timeline runs from first paint,
 * so subtract the time the page has already been open (hydration can take a while).
 */
export function heroIntroDelay() {
  if (!shouldShowPreloader()) return 0.15;
  const elapsed = typeof performance !== 'undefined' ? performance.now() / 1000 : 0;
  return Math.max(0.15, LOADER_TOTAL_S - elapsed);
}
