'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';

/**
 * Damped scrolling.
 *
 * The page is built around scroll-driven sections — a pinned card gallery, a
 * stacking deck, a rail that fills as you read. A fast wheel flick covers
 * several hundred pixels in one event, so those sequences were being jumped
 * straight past: the motion was technically running, but nobody could see it.
 *
 * Lenis intercepts wheel input and eases the scroll position towards the
 * target instead of snapping to it. Nothing about the page's layout changes —
 * it still drives the real `window.scrollY`, so `position: sticky`,
 * IntersectionObserver and framer-motion's `useScroll` all keep working
 * exactly as before.
 *
 * Deliberately NOT touched:
 *   · touch input — `syncTouch` stays off. Hijacking a native touch scroll is
 *     the fastest way to make a phone feel broken.
 *   · reduced motion — the whole thing is skipped, leaving native scrolling.
 */

/** Live instance, so programmatic jumps can go through the same easing. */
let lenis: Lenis | null = null;

/**
 * Scroll to an absolute page position.
 *
 * Routed through Lenis where it is running, otherwise native. Without this a
 * `window.scrollTo({ behavior: 'smooth' })` fights the rAF loop — both try to
 * own the scroll position on the same frame and the result stutters.
 */
export function scrollToY(top: number) {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (lenis && !reduced) {
    lenis.scrollTo(top);
    return;
  }
  window.scrollTo({ top, behavior: reduced ? 'auto' : 'smooth' });
}

export default function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const instance = new Lenis({
      /**
       * How quickly the real scroll position catches the target each frame.
       * Lower is smoother and heavier. 0.09 takes the edge off a flick
       * without the laggy, swimming feel that sets in below about 0.06.
       */
      lerp: 0.09,
      /** Slightly less distance per wheel notch, so a hard flick travels less. */
      wheelMultiplier: 0.85,
      smoothWheel: true,
      /** Never intercept touch — see the note above. */
      syncTouch: false,
    });

    lenis = instance;

    let frame = 0;
    const loop = (time: number) => {
      instance.raf(time);
      frame = requestAnimationFrame(loop);
    };
    frame = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(frame);
      instance.destroy();
      lenis = null;
    };
  }, []);

  return null;
}
