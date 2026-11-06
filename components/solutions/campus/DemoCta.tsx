'use client';

import { scrollToY } from '@/components/motion/SmoothScroll';
import { track } from '@/lib/analytics';

/**
 * Every "book a demo" control on the education page.
 *
 * It is a real anchor to a real fragment, so it works with JavaScript off,
 * opens in a new tab on a middle click, and shows a URL on hover like any
 * other link. The click handler only adds two things on top of that: the
 * conversion event, and a scroll routed through Lenis.
 *
 * The Lenis detour matters. `scroll-behavior: smooth` is forced to `auto`
 * while Lenis is running (see app/globals.css), so a plain fragment jump
 * teleports — and on a page this long, a teleport past nine sections leaves
 * the reader with no idea where they landed. `scrollToY` eases through the
 * same rAF loop that owns the scroll position, and falls back to the native
 * behaviour under prefers-reduced-motion.
 *
 * The header is fixed, so the target is offset by its height plus a little
 * air. `scroll-padding-top` would do this for a native jump but has no
 * effect on a programmatic scroll.
 */

/** --header-h (4.25rem) plus breathing room, in pixels at a 16px root. */
const HEADER_OFFSET = 96;

export default function DemoCta({
  children,
  location,
  target = 'demo',
  className = 'btn btn-primary',
}: {
  children: React.ReactNode;
  /** Where on the page this CTA sits — reported with the event. */
  location: string;
  /** Element id to scroll to. */
  target?: string;
  className?: string;
}) {
  return (
    <a
      href={`#${target}`}
      className={className}
      onClick={(e) => {
        track('campus_cta_click', { location });

        const el = document.getElementById(target);
        if (!el || e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;

        e.preventDefault();
        scrollToY(window.scrollY + el.getBoundingClientRect().top - HEADER_OFFSET);

        /*
         * Move focus to the panel as well as the viewport. A sighted mouse
         * user gets the scroll; a keyboard or screen-reader user needs the
         * caret to arrive there too, or the next Tab continues from the
         * button they just left, nine sections up the page.
         */
        el.focus({ preventScroll: true });
      }}
    >
      {children}
    </a>
  );
}
