'use client';

/**
 * MotionEngine — lightweight site-wide animation layer.
 *
 *  • Native scrolling (no smooth-scroll layer — it was measured to cause scroll lag)
 *  • Hero intro timeline + gentle hero scroll-out (the part of the page the client loves)
 *  • Word-by-word reveal for every section <h2>
 *  • [data-anim="up"] batched fade-up reveals
 *  • [data-speed] parallax, [data-velocity] scroll-velocity skew, [data-magnetic] buttons
 *  • Top scroll-progress bar
 *
 * Performance rules: only transform/opacity are animated, no filters, no clip-paths,
 * no full-screen overlays, and no React state updates on scroll.
 * Everything is skipped for prefers-reduced-motion.
 */

import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { heroIntroDelay, shouldShowPreloader } from '@/lib/preloader';

function splitWords(el: HTMLElement) {
  if (el.dataset.split) return;
  el.dataset.split = '1';
  const walk = (node: Node) => {
    Array.from(node.childNodes).forEach((child) => {
      if (child.nodeType === Node.TEXT_NODE) {
        const text = child.textContent ?? '';
        if (!text.trim()) return;
        const frag = document.createDocumentFragment();
        text.split(/(\s+)/).forEach((part) => {
          if (!part) return;
          if (/^\s+$/.test(part)) {
            frag.appendChild(document.createTextNode(' '));
            return;
          }
          const outer = document.createElement('span');
          outer.className = 'mx-word';
          const inner = document.createElement('span');
          inner.className = 'mx-word-inner';
          inner.textContent = part;
          outer.appendChild(inner);
          frag.appendChild(outer);
        });
        child.parentNode?.replaceChild(frag, child);
      } else if (child.nodeType === Node.ELEMENT_NODE) {
        walk(child);
      }
    });
  };
  walk(el);
}

/** True once the engine has run on this document — later runs are client-side page navigations. */
let booted = false;

export default function MotionEngine() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    // Set asynchronously so React's dev double-run of effects still counts as the first boot
    const firstBoot = !booted;
    const bootTimer = setTimeout(() => {
      booted = true;
    }, 0);
    const notPageHero = (el: Element) => !el.closest('#page-hero');

    const cleanups: Array<() => void> = [() => clearTimeout(bootTimer)];

    // ── 1. Scrolling ───────────────────────────────────────────────────
    // Native browser scrolling everywhere (wheel, trackpad, touch). The Lenis smooth-scroll layer
    // kept the page gliding for up to ~2 s after each wheel flick (≈0.3 s native) and dropped far
    // more frames — visitors felt it as lag — so it is not used. Animated jumps (scroll-to-top,
    // section links) use the browser's own smooth scrolling via lib/motion scrollToTarget().
    // Mobile address-bar show/hide resizes the viewport constantly — don't recalculate triggers for it
    ScrollTrigger.config({ ignoreMobileResize: true });
    document.documentElement.classList.add('mx-motion');

    // Hero intro waits for the branded loader only when it is actually showing
    const introDelay = heroIntroDelay();
    // Signal for CSS one-shot hero effects (.mx-intro-go …) — timed from the real intro start
    const go = setTimeout(() => document.documentElement.classList.add('mx-intro-go'), introDelay * 1000);
    cleanups.push(() => clearTimeout(go));
    if (shouldShowPreloader()) {
      // keep the page still while the branded loader covers it
      const html = document.documentElement;
      const prev = html.style.overflow;
      html.style.overflow = 'hidden';
      const unlock = setTimeout(() => (html.style.overflow = prev), Math.max(0, introDelay - 0.2) * 1000);
      cleanups.push(() => {
        clearTimeout(unlock);
        html.style.overflow = prev;
      });
    }
    cleanups.push(() => document.documentElement.classList.remove('mx-motion'));

    const ctx = gsap.context(() => {
      // ── 3. Hero intro + scroll-out ───────────────────────────────────
      const hero = document.getElementById('hero');
      if (hero) {
        const h1 = hero.querySelector('h1');
        const lines = h1 ? Array.from(h1.children) : [];
        const leftRest = h1?.parentElement ? Array.from(h1.parentElement.children).filter((c) => c !== h1) : [];
        const rightCol = hero.querySelector<HTMLElement>('.lg\\:col-span-5');
        const rightItems = rightCol ? Array.from(rightCol.children) : [];
        const watermark = hero.querySelector<HTMLElement>(':scope > [aria-hidden="true"]');

        const intro = gsap.timeline({ delay: introDelay, defaults: { ease: 'expo.out' } });
        if (lines.length) {
          intro.fromTo(lines, { yPercent: 105, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 1.2, stagger: 0.12 });
        }
        if (leftRest.length) {
          intro.fromTo(leftRest, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 1, stagger: 0.08 }, '-=0.85');
        }
        if (rightItems.length) {
          intro.fromTo(
            rightItems,
            { y: 50, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 1.2,
              stagger: 0.1,
              // hand transform back to CSS so the person card's mouse tilt (.mx-tilt) takes over
              onComplete: () => {
                gsap.set(rightItems, { clearProps: 'transform,opacity' });
              },
            },
            '-=0.95'
          );
        }
        if (watermark) {
          intro.fromTo(watermark, { opacity: 0 }, { opacity: 1, duration: 1.6 }, 0);
          gsap.to(watermark, {
            yPercent: 80,
            ease: 'none',
            scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: true },
          });
        }
        const heroGrid = hero.querySelector<HTMLElement>('.grid');
        if (heroGrid) {
          gsap.to(heroGrid, {
            yPercent: -8,
            ease: 'none',
            scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: true },
          });
        }
      }

      // ── 3b. Inner-page header (PageHero) intro ───────────────────────
      // Above the fold, so it plays as a timed intro rather than on scroll. On a hard load where the
      // content has already been on screen (no loader covering it), it is left as-is: hiding it now
      // would flash. On client-side navigation the page-enter fade covers the brief hidden state.
      const pageHero = document.getElementById('page-hero');
      if (pageHero && !(firstBoot && introDelay <= 0.15)) {
        const tl = gsap.timeline({ delay: introDelay, defaults: { ease: 'expo.out' } });
        const heading = pageHero.querySelector<HTMLElement>('[data-split-heading]');
        if (heading) {
          splitWords(heading);
          const words = heading.querySelectorAll('.mx-word-inner');
          if (words.length) tl.fromTo(words, { yPercent: 110 }, { yPercent: 0, duration: 1, stagger: 0.05 }, 0);
        }
        const items = Array.from(pageHero.querySelectorAll<HTMLElement>('[data-anim]'));
        if (items.length) {
          tl.fromTo(
            items,
            { opacity: 0, y: (_i: number, el: HTMLElement) => (el.dataset.anim === 'up' ? 30 : 0), x: (_i: number, el: HTMLElement) => (el.dataset.anim === 'right' ? 60 : el.dataset.anim === 'left' ? -60 : 0) },
            {
              opacity: 1,
              y: 0,
              x: 0,
              duration: 1,
              stagger: 0.08,
              onComplete: () => {
                gsap.set(items, { clearProps: 'transform,opacity' });
              },
            },
            0.1
          );
        }
      }

      // ── 4. Split-word headings ───────────────────────────────────────
      gsap.utils.toArray<HTMLElement>('section:not(#hero) h2, [data-split-heading]').filter(notPageHero).forEach((heading) => {
        if (heading.closest('[data-no-split]')) return;
        splitWords(heading);
        const words = heading.querySelectorAll('.mx-word-inner');
        if (!words.length) return;

        // Highlighted (coloured) words get an extra letter-flip after the line rises
        const accentChars: HTMLElement[] = [];
        heading.querySelectorAll<HTMLElement>('span:not(.mx-word):not(.mx-word-inner) .mx-word-inner').forEach((w) => {
          if (w.dataset.chars) return;
          w.dataset.chars = '1';
          const text = w.textContent ?? '';
          w.textContent = '';
          for (const ch of text) {
            const c = document.createElement('span');
            c.className = 'mx-char';
            c.textContent = ch;
            w.appendChild(c);
          }
        });
        heading.querySelectorAll<HTMLElement>('.mx-char').forEach((c) => accentChars.push(c));

        const tl = gsap.timeline({ scrollTrigger: { trigger: heading, start: 'top 90%', toggleActions: 'play none none none' } });
        tl.fromTo(words, { yPercent: 110 }, { yPercent: 0, duration: 0.9, ease: 'power4.out', stagger: 0.04 });
        // once finished, drop every inline transform so the words don't stay on GPU layers
        tl.eventCallback('onComplete', () => {
          gsap.set(words, { clearProps: 'transform' });
          if (accentChars.length) gsap.set(accentChars, { clearProps: 'transform,opacity' });
        });
        if (accentChars.length) {
          tl.fromTo(
            accentChars,
            { rotateX: -90, yPercent: 40, opacity: 0, transformOrigin: '50% 100%' },
            { rotateX: 0, yPercent: 0, opacity: 1, duration: 0.7, ease: 'back.out(2)', stagger: 0.025 },
            0.25
          );
        }
      });

      // ── 4b. Parallax photos inside framed cards ─────────────────────
      gsap.utils.toArray<HTMLElement>('[data-parallax-img]').forEach((el) => {
        gsap.fromTo(
          el,
          { yPercent: -8 },
          {
            yPercent: 8,
            ease: 'none',
            scrollTrigger: { trigger: el.parentElement ?? el, start: 'top bottom', end: 'bottom top', scrub: true },
          }
        );
      });

      // ── 4c. Decorative wordmarks: letters rise one by one (aria-hidden, no SEO impact) ──
      gsap.utils.toArray<HTMLElement>('[data-letters]').forEach((el) => {
        if (!el.dataset.lettersDone) {
          el.dataset.lettersDone = '1';
          const text = el.textContent ?? '';
          el.textContent = '';
          for (const ch of text) {
            const c = document.createElement('span');
            c.className = 'mx-letter';
            c.textContent = ch === ' ' ? ' ' : ch;
            el.appendChild(c);
          }
        }
        gsap.fromTo(
          el.querySelectorAll('.mx-letter'),
          { yPercent: 100 },
          {
            yPercent: 0,
            ease: 'none',
            stagger: 0.05,
            scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom 85%', scrub: 0.6 },
          }
        );
      });

      // ── 5. Batched fade-up reveals ───────────────────────────────────
      const revealEls = gsap.utils.toArray<HTMLElement>('[data-anim="up"]').filter(notPageHero);
      gsap.set(revealEls, { y: 36, opacity: 0 });
      ScrollTrigger.batch(revealEls, {
        start: 'top 98%', // anything visible on screen reveals, even near the bottom edge
        // no once:true — a self-killing trigger can corrupt ScrollTrigger's list mid-refresh (crash on reload mid-page)
        onEnter: (batch) =>
          gsap.to(batch, {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power3.out',
            stagger: 0.06,
            overwrite: true,
            onComplete: () => {
              gsap.set(batch, { clearProps: 'transform,opacity' });
            },
          }),
      });

      // ── 5a. Side reveals with a small overshoot (slide in 70px, pass 5px, settle) ──
      (['left', 'right'] as const).forEach((side) => {
        const els = gsap.utils.toArray<HTMLElement>(`[data-anim="${side}"]`).filter(notPageHero);
        if (!els.length) return;
        const from = side === 'left' ? -70 : 70;
        gsap.set(els, { x: from, opacity: 0, scale: 0.96 });
        ScrollTrigger.batch(els, {
          start: 'top 98%',
          // (see note above: no once:true)
          onEnter: (batch) =>
            gsap.to(batch, {
              x: 0,
              opacity: 1,
              scale: 1,
              duration: 1,
              ease: 'back.out(1.4)',
              stagger: 0.08,
              overwrite: true,
              onComplete: () => {
                gsap.set(batch, { clearProps: 'transform' });
              },
            }),
        });
      });

      // ── 5b. 3D wave entrance + line-drawn illustrations (Product Range cards) ──
      const flipEls = gsap.utils.toArray<HTMLElement>('[data-anim="flip"]').filter(notPageHero);
      if (flipEls.length) {
        // Prepare each illustration: every stroke starts "undrawn", fills start transparent
        const prepDraw = (root: Element) => {
          const shapes = Array.from(root.querySelectorAll<SVGGeometryElement>('.mx-ico path, .mx-ico rect, .mx-ico circle'));
          shapes.forEach((s) => {
            let len = 0;
            try {
              len = s.getTotalLength();
            } catch {
              len = 0;
            }
            if (!len) return;
            s.style.strokeDasharray = `${len}`;
            s.style.strokeDashoffset = `${len}`;
            s.style.fillOpacity = '0';
          });
          return shapes;
        };
        const shapeMap = new Map(flipEls.map((el) => [el, prepDraw(el)]));

        // Photo tiles: hidden behind their shutter until the card scrolls in (transform/opacity only)
        const photoMap = new Map<HTMLElement, { photo: HTMLElement; shutter: HTMLElement }>();
        flipEls.forEach((el) => {
          const photo = el.querySelector<HTMLElement>('.mx-tile-photo');
          const shutter = el.querySelector<HTMLElement>('.mx-tile-shutter');
          if (!photo || !shutter) return;
          photoMap.set(el, { photo, shutter });
          gsap.set(photo, { opacity: 0, scale: 1.3 });
        });
        const revealed = new WeakSet<Element>();
        const revealPhoto = (el: HTMLElement, i: number) => {
          const tile = photoMap.get(el);
          if (!tile || revealed.has(el)) return; // once per card: scrolling back past it never replays the wipe
          revealed.add(el);
          const { photo, shutter } = tile;
          gsap
            .timeline({ delay: 0.15 + i * 0.08 })
            .fromTo(shutter, { scaleX: 0, transformOrigin: '0% 50%' }, { scaleX: 1, duration: 0.45, ease: 'power3.in' })
            .set(photo, { opacity: 1 })
            .set(shutter, { transformOrigin: '100% 50%' })
            .to(shutter, { scaleX: 0, duration: 0.65, ease: 'expo.out' })
            .to(
              photo,
              {
                scale: 1,
                duration: 1.5,
                ease: 'expo.out',
                onComplete: () => {
                  gsap.set(photo, { clearProps: 'transform,opacity' });
                  gsap.set(shutter, { clearProps: 'transform' });
                },
              },
              '<'
            );
        };
        cleanups.push(() => photoMap.forEach(({ photo, shutter }) => gsap.set([photo, shutter], { clearProps: 'all' })));

        gsap.set(flipEls, { opacity: 0, y: 50, rotateX: -28, transformOrigin: '50% 100%' });
        ScrollTrigger.batch(flipEls, {
          start: 'top 98%', // anything visible on screen reveals, even near the bottom edge
          // (see note above: no once:true)
          onEnter: (batch) => {
            gsap.to(batch, {
              opacity: 1,
              y: 0,
              rotateX: 0,
              duration: 1,
              ease: 'expo.out',
              stagger: 0.08,
              overwrite: true,
              onComplete: () => {
                gsap.set(batch, { clearProps: 'transform' });
              },
            });
            batch.forEach((el, i) => {
              revealPhoto(el as HTMLElement, i);
              const shapes = shapeMap.get(el as HTMLElement) ?? [];
              if (!shapes.length) return;
              gsap.to(shapes, {
                strokeDashoffset: 0,
                duration: 1.1,
                ease: 'power2.inOut',
                stagger: 0.05,
                delay: 0.25 + i * 0.08,
              });
              gsap.to(shapes, {
                fillOpacity: 1,
                duration: 0.6,
                delay: 0.9 + i * 0.08,
                onComplete: () => {
                  shapes.forEach((s) => {
                    s.style.strokeDasharray = '';
                    s.style.strokeDashoffset = '';
                    s.style.fillOpacity = '';
                  });
                },
              });
            });
          },
        });
      }

      // ── 5c. Shutter photo reveals ([data-shutter], e.g. About bento) ──
      // A brand-blue panel rises over the frame, the photo appears behind it, then the panel lifts
      // away while the photo settles from a slow zoom. Transform/opacity only; the panel is
      // collapsed in CSS, so without JavaScript the photo is simply visible.
      gsap.utils.toArray<HTMLElement>('[data-shutter]').filter(notPageHero).forEach((el) => {
        const photo = el.querySelector<HTMLElement>('.mx-shutter-photo');
        const panel = el.querySelector<HTMLElement>('.mx-shutter-panel');
        if (!photo || !panel) return;
        gsap.set(photo, { opacity: 0, scale: 1.25 });
        const tl = gsap
          .timeline({ paused: true })
          .fromTo(panel, { scaleY: 0, transformOrigin: '50% 100%' }, { scaleY: 1, duration: 0.55, ease: 'power3.in' })
          .set(photo, { opacity: 1 })
          .set(panel, { transformOrigin: '50% 0%' })
          .to(panel, { scaleY: 0, duration: 0.8, ease: 'expo.out' })
          .to(photo, { scale: 1, duration: 1.6, ease: 'expo.out' }, '<');
        const delay = parseFloat(el.dataset.shutterDelay || '0');
        let started = false;
        ScrollTrigger.create({
          trigger: el,
          start: 'top 92%',
          onEnter: () => {
            if (started) return;
            started = true;
            gsap.delayedCall(delay, () => tl.play());
          },
        });
      });

      // ── 6. Parallax layers ───────────────────────────────────────────
      gsap.utils.toArray<HTMLElement>('[data-speed]').forEach((el) => {
        const speed = parseFloat(el.dataset.speed || '0.2');
        gsap.fromTo(
          el,
          { y: speed * 120 },
          {
            y: -speed * 120,
            ease: 'none',
            scrollTrigger: { trigger: el.parentElement ?? el, start: 'top bottom', end: 'bottom top', scrub: true },
          }
        );
      });

      // ── 7. Velocity skew (marquee band) ──────────────────────────────
      const skewTargets = gsap.utils.toArray<HTMLElement>('[data-velocity]');
      if (skewTargets.length) {
        const setters = skewTargets.map((el) => gsap.quickTo(el, 'skewY', { duration: 0.5, ease: 'power3.out' }));
        ScrollTrigger.create({
          start: 0,
          end: 'max',
          onUpdate: (self) => {
            const skew = gsap.utils.clamp(-4, 4, self.getVelocity() / -400);
            setters.forEach((set) => set(skew));
          },
        });
      }
    });
    cleanups.push(() => ctx.revert());

    // ── 8. Magnetic buttons (hero CTAs + [data-magnetic]) ──────────────
    if (window.matchMedia('(pointer: fine)').matches) {
      const magnets = gsap.utils.toArray<HTMLElement>('[data-magnetic], #hero button.rounded-full');
      magnets.forEach((el) => {
        const xTo = gsap.quickTo(el, 'x', { duration: 0.5, ease: 'power3.out' });
        const yTo = gsap.quickTo(el, 'y', { duration: 0.5, ease: 'power3.out' });
        const move = (e: PointerEvent) => {
          const r = el.getBoundingClientRect();
          xTo((e.clientX - (r.left + r.width / 2)) * 0.25);
          yTo((e.clientY - (r.top + r.height / 2)) * 0.35);
        };
        const leave = () => {
          xTo(0);
          yTo(0);
        };
        el.addEventListener('pointermove', move);
        el.addEventListener('pointerleave', leave);
        cleanups.push(() => {
          el.removeEventListener('pointermove', move);
          el.removeEventListener('pointerleave', leave);
        });
      });
    }

    // ── 8b. Pause every CSS animation inside off-screen sections ───────
    // Infinite decorative loops (spinners, floats, orbs, marquees) otherwise keep ticking
    // the main thread even when nobody can see them.
    const offscreenIO = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.target.classList.toggle('mx-offscreen', !e.isIntersecting)),
      { rootMargin: '100px 0px' }
    );
    document.querySelectorAll('[data-page] > section, [data-page] > .mx-marquee, footer').forEach((el) => offscreenIO.observe(el));
    cleanups.push(() => offscreenIO.disconnect());

    // ── 9. Keep trigger positions fresh as images/data load ────────────
    let refreshTimer: ReturnType<typeof setTimeout> | undefined;
    let lastHeight = document.body.scrollHeight;
    const scheduleRefresh = () => {
      clearTimeout(refreshTimer);
      refreshTimer = setTimeout(() => {
        const h = document.body.scrollHeight;
        if (h !== lastHeight) {
          lastHeight = h;
          ScrollTrigger.refresh();
        }
      }, 250);
    };
    const resizeObserver = new ResizeObserver(scheduleRefresh);
    resizeObserver.observe(document.body);
    const onLoad = () => ScrollTrigger.refresh();
    window.addEventListener('load', onLoad);
    cleanups.push(() => {
      clearTimeout(refreshTimer);
      resizeObserver.disconnect();
      window.removeEventListener('load', onLoad);
    });

    return () => cleanups.reverse().forEach((fn) => fn());
  }, []);

  return null;
}
