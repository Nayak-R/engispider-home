'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { PRODUCTS } from '@/data/products';

/**
 * Global route-transition loader.
 *
 * Two deliberate choices, both about the fact that a route change here mounts a
 * very large client page and blocks the main thread while it does:
 *
 *  1. It is shown imperatively, from a capture-phase `click` listener that just
 *     flips `data-state`. No React re-render has to be scheduled first, so the
 *     bar paints on the very next frame and the click always feels registered.
 *  2. Every animation is a pure `transform` / `opacity` CSS animation (see
 *     globals.css), so frames come from the compositor and keep coming while JS
 *     is busy. A JS-driven animation would stall during exactly the wait this
 *     covers. The full-screen veil is even delayed in CSS rather than with a
 *     timer, for the same reason.
 */

/**
 * Friendly destination names, so the wait tells you where you're going.
 *
 * Every product route is derived from data/products.ts rather than listed.
 * Hand-maintained, this map held three product names that were already a
 * rename behind the rest of the site, and had no entry at all for the seven
 * products added later — so those routes fell back to a bare label.
 */
const ROUTE_LABELS: Record<string, string> = {
  ...Object.fromEntries(PRODUCTS.map((p) => [p.href, p.name])),
  '/': 'Home',
  '/about': 'About Us',
  '/services': 'Services',
  '/solutions': 'Products',
  '/solutions/restaurant/guide': 'Training Guide',
  '/faq': 'FAQ',
  '/customers': 'Our Customers',
  '/contact': 'Contact',
  '/contacts': 'Contact',
  '/inquery': 'Contact',
  '/search': 'Search',
  '/privacy': 'Privacy Policy',
  '/terms': 'Terms of Service',
};

/** Give up and drop the overlay rather than trapping the user behind it. */
const SAFETY_TIMEOUT_MS = 15000;

/**
 * Minimum time the first-load overlay stays up.
 *
 * Without a floor, a warm cache dismisses it within a frame or two and the
 * result is a flicker — worse than showing nothing. Holding it briefly makes
 * the entry deliberate.
 */
const BOOT_MIN_MS = 750;

/** Length of the fade-out, matched to the CSS. */
const LEAVE_MS = 340;

// trailingSlash is enabled, so pathnames arrive as "/solutions/hrms/".
const normalise = (path: string) => path.replace(/\/+$/, '') || '/';

/**
 * Shown on first load, and for any route without an entry above. The brand
 * reads better than a generic "Page" — on a direct load this is the first
 * word a visitor sees.
 */
const DEFAULT_LABEL = 'Engispider';

const labelFor = (path: string) => ROUTE_LABELS[normalise(path)] ?? DEFAULT_LABEL;

export default function RouteTransitionLoader() {
  const pathname = usePathname();
  const rootRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLSpanElement>(null);
  /**
   * The navigation effect below dismisses the overlay whenever it runs, which
   * includes its own first run on mount. That would kill the first-load
   * overlay instantly, so the first pass is skipped and the boot effect owns
   * the initial dismissal instead.
   */
  const booted = useRef(false);

  /*
   * First load.
   *
   * The markup ships as `data-state="boot"`, which CSS keeps hidden unless
   * `.js` is on <html> — so a crawler or a JS-less visitor never sees a
   * fixed overlay they cannot dismiss. With JS it is visible from the first
   * paint, then released once the page has actually finished loading.
   */
  useEffect(() => {
    const root = rootRef.current;
    if (!root || root.dataset.state !== 'boot') return;

    let leaveTimer = 0;
    let holdTimer = 0;
    const started = performance.now();

    const release = () => {
      const remaining = Math.max(0, BOOT_MIN_MS - (performance.now() - started));
      holdTimer = window.setTimeout(() => {
        root.dataset.state = 'leaving';
        leaveTimer = window.setTimeout(() => {
          root.dataset.state = 'idle';
          booted.current = true;
          /*
           * Tell the page the floor is clear. Entrance animations wait for
           * this: without it they play underneath the overlay and are over
           * before anyone sees them. On a slow dev build hydration happens
           * to land after the veil, which hides the problem — on a fast
           * static build it would not.
           */
          document.documentElement.dataset.booted = 'true';
          window.dispatchEvent(new Event('engispider:booted'));
        }, LEAVE_MS);
      }, remaining);
    };

    if (document.readyState === 'complete') {
      release();
    } else {
      window.addEventListener('load', release, { once: true });
    }

    return () => {
      window.removeEventListener('load', release);
      window.clearTimeout(holdTimer);
      window.clearTimeout(leaveTimer);
    };
  }, []);

  // Re-runs on every committed navigation, which is also how the loader is
  // dismissed: reaching this point means the new page has rendered.
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    let safetyTimer = 0;

    const hide = () => {
      window.clearTimeout(safetyTimer);
      root.dataset.state = 'idle';
    };

    const show = (targetPath: string) => {
      if (nameRef.current) nameRef.current.textContent = labelFor(targetPath);
      if (root.dataset.state === 'busy') return; // don't restart a running animation
      booted.current = true;
      root.dataset.state = 'busy';
      safetyTimer = window.setTimeout(hide, SAFETY_TIMEOUT_MS);
    };

    // Skip the dismissal on the very first run — the boot overlay is still
    // showing and owns its own exit.
    if (booted.current) {
      hide();
    } else if (root.dataset.state !== 'boot' && root.dataset.state !== 'leaving') {
      hide();
    }

    const onClick = (event: MouseEvent) => {
      // Let the browser keep its own meanings for modified / non-primary clicks.
      if (event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

      const node = event.target as Element | null;
      const anchor = node && typeof node.closest === 'function' ? node.closest('a') : null;
      if (!(anchor instanceof HTMLAnchorElement)) return;
      if (anchor.hasAttribute('download')) return;
      if (anchor.target && anchor.target !== '_self') return;

      const href = anchor.getAttribute('href');
      if (!href || href.startsWith('#')) return;

      let url: URL;
      try {
        url = new URL(anchor.href, window.location.href);
      } catch {
        return;
      }
      // Filters external links as well as mailto: / tel:, whose origin is "null".
      if (url.origin !== window.location.origin) return;
      // Same page, or an in-page hash jump: nothing is going to load.
      if (normalise(url.pathname) === normalise(window.location.pathname)) return;

      show(url.pathname);
    };

    // Back / forward is just as slow, and location is already updated here.
    const onPopState = () => {
      if (normalise(window.location.pathname) === normalise(pathname)) return;
      show(window.location.pathname);
    };

    document.addEventListener('click', onClick, true);
    window.addEventListener('popstate', onPopState);
    return () => {
      window.clearTimeout(safetyTimer);
      document.removeEventListener('click', onClick, true);
      window.removeEventListener('popstate', onPopState);
    };
  }, [pathname]);

  return (
    <div ref={rootRef} className="route-loader" data-state="boot" aria-live="polite">
      {/* Paints immediately, so the click never feels ignored. */}
      <div className="route-loader__bar" />

      {/* Fades in ~150ms later, so fast/prefetched routes don't flash an overlay. */}
      <div className="route-loader__veil">
        <div className="route-loader__stage">
          <span className="route-loader__ring route-loader__ring--outer" />
          <span className="route-loader__ring route-loader__ring--mid" />
          <span className="route-loader__ring route-loader__ring--inner" />
          <span className="route-loader__core">
            <img src="/images/icon-logo.png" alt="" className="route-loader__mark" />
          </span>
        </div>

        <p className="route-loader__label">
          <span className="route-loader__kicker">Loading</span>
          <span className="route-loader__name" ref={nameRef}>
            {DEFAULT_LABEL}
          </span>
        </p>

        <div className="route-loader__track">
          <span />
        </div>
      </div>
    </div>
  );
}
