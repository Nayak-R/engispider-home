'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Check } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import { Reveal, MaskText } from '@/components/motion/Reveal';
import SectionBackdrop from '@/components/SectionBackdrop';
import { SERVICES, type Service } from '@/data/services';

/**
 * Services, as a specification table.
 *
 * Two behaviours on top of the table itself:
 *
 *  1. The heading block is sticky, matching the catalogue section — it holds
 *     at the top of the viewport while the rows travel underneath.
 *
 *  2. The active-row highlight is a SINGLE element shared across all rows via
 *     framer-motion's `layoutId`. Because only one is ever mounted, moving it
 *     between rows animates its position rather than cross-fading two boxes —
 *     the band physically slides down the table, dragging its orange edge
 *     with it. A per-row fade (the obvious implementation) reads as six
 *     unrelated blinks; this reads as one indicator tracking the reader.
 *
 * ── Why the final row sits outside the sticky wrapper ──────────────────────
 * A pinned heading is an opaque band roughly 310px tall, and rows scroll
 * BEHIND it. CSS releases a sticky element only when its containing block's
 * bottom reaches it — so if the block ended with the list, the last row was
 * already tucked under the heading by the time the heading let go, and was
 * never fully readable at the end of the section in either direction.
 *
 * Ending the containing block one row early releases the heading exactly as
 * the final row clears it: the freeze stops, the last item sits fully visible
 * below, and the page scrolls on. The split is only a scroll boundary — the
 * rows render identically either side of it.
 */
export default function Services() {
  const rowRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [active, setActive] = useState(-1);
  const reduced = useReducedMotion();

  const lead = SERVICES.slice(0, -1);
  const last = SERVICES[SERVICES.length - 1];

  useEffect(() => {
    const els = rowRefs.current.filter(Boolean) as HTMLDivElement[];
    if (!els.length) return;

    // Band sits below the sticky heading rather than on the midline, which
    // the heading covers.
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            const i = els.indexOf(e.target as HTMLDivElement);
            if (i !== -1) setActive(i);
          }
        }
      },
      { rootMargin: '-62% 0px -30% 0px', threshold: 0 }
    );

    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  const row = (s: Service, i: number) => {
    const isActive = i === active;
    return (
      <Reveal key={s.slug} delay={Math.min(i, 4) * 50}>
        <div
          ref={(el) => {
            rowRefs.current[i] = el;
          }}
          className="relative -mx-4 px-4 md:-mx-6 md:px-6"
        >
          {/* The travelling indicator. One instance, shared layout. */}
          {isActive && (
            <motion.div
              layoutId="service-highlight"
              aria-hidden
              className="absolute inset-0 z-0 border-l-2 border-accent-500 bg-accent-50"
              transition={
                reduced
                  ? { duration: 0 }
                  : { type: 'spring', stiffness: 340, damping: 32, mass: 0.7 }
              }
            />
          )}

          <div className="relative z-10 grid gap-y-3 border-b border-hairline py-6 lg:grid-cols-12 lg:gap-x-8">
            <div className="lg:col-span-1">
              <span
                className={`mono inline-block origin-left transition-all duration-300 ${
                  isActive ? 'scale-110 text-accent-700' : 'scale-100 text-faint'
                }`}
              >
                {String(i + 1).padStart(2, '0')}
              </span>
            </div>

            <h3
              className={`font-display text-f-lg font-bold text-ink transition-transform duration-300 lg:col-span-4 ${
                isActive ? 'lg:translate-x-1' : 'lg:translate-x-0'
              }`}
            >
              {s.title}
            </h3>

            <p className="text-f-xs leading-relaxed text-body lg:col-span-4">
              {s.description}
            </p>

            <ul className="space-y-1.5 lg:col-span-3">
              {s.deliverables.slice(0, 3).map((d) => (
                <li key={d} className="flex items-start gap-2 text-f-xs text-muted">
                  <Check
                    className={`mt-0.5 h-3 w-3 shrink-0 transition-colors duration-300 ${
                      isActive ? 'text-accent-600' : 'text-hairline-strong'
                    }`}
                    aria-hidden
                  />
                  {d}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Reveal>
    );
  };

  return (
    <section className="section relative">
      <SectionBackdrop side="left" tone="cool" />
      <div className="container-page">
        {/* Sticky containing block: heading + every row but the last. */}
        <div className="relative">
          {/*
            Sticky only from lg. On a phone this block is ~39% of the screen,
            so pinning it leaves barely half a viewport for the list it is
            meant to be framing. Below lg it scrolls away like any heading.
          */}
          {/*
            The opaque background is scoped to lg, where this block is
            actually sticky and rows scroll behind it. Below lg it is a
            normal heading, so an opaque panel just painted a white box
            over the section's shading.
          */}
          <div className="pb-8 pt-4 lg:sticky lg:top-[4.25rem] lg:bg-canvas lg:z-20">
            <div className="grid gap-8 lg:grid-cols-12">
              <div className="lg:col-span-6">
                <p className="marker mono">Services</p>
                <MaskText as="h2" className="display mt-5 text-f-6xl">
                  <>When no product</>
                  <>fits, we build it.</>
                </MaskText>
              </div>
              <div className="flex items-end lg:col-span-5 lg:col-start-8">
                <Reveal delay={120}>
                  <p className="text-body">
                    The same engineers who build our products build yours — one
                    stack, one set of conventions, no hand-off to a junior bench.
                  </p>
                </Reveal>
              </div>
            </div>
          </div>

          <div className="border-t border-hairline">{lead.map(row)}</div>
        </div>

        {/* Final row, outside the sticky block — the heading has released by
            the time it arrives, so it is never covered. */}
        {row(last, SERVICES.length - 1)}

        <Reveal className="mt-10">
          <Link href="/services" className="link-arrow">
            Full service detail <ArrowRight className="h-4 w-4" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
