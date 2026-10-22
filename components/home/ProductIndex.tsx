'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { Reveal, MaskText } from '@/components/motion/Reveal';
import SectionBackdrop from '@/components/SectionBackdrop';
import { PRODUCTS, PRODUCT_COUNT_WORD_CAP, type Product } from '@/data/products';

/** Progress-ring geometry, in the SVG's 100x100 user space. */
const RADIUS = 45;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

/**
 * The full catalogue, as a typeset index.
 *
 * Fourteen products in a card grid is a wall. As a numbered index it reads
 * like the contents page of a technical manual — scannable in one pass, with
 * room for each name to carry real weight.
 *
 * The heading block is sticky: it holds at the top of the viewport while the
 * rows travel underneath, so the framing stays on screen for the whole list.
 *
 * ── Why the final row sits outside the sticky wrapper ──────────────────────
 * A pinned heading is an opaque band roughly 310px tall, and rows scroll
 * BEHIND it. CSS releases a sticky element only when its containing block's
 * bottom reaches it — so if the block ended with the list, the last row would
 * already be tucked under the heading by the time the heading let go, and it
 * was never fully readable at the end of the section in either direction.
 *
 * Ending the containing block one row early releases the heading exactly as
 * the final row clears it: the freeze stops, the last item sits fully visible
 * below, and the page scrolls on to the next section. The split is only a
 * scroll boundary — the rows render identically either side of it.
 */
export default function ProductIndex() {
  const rowRefs = useRef<(HTMLLIElement | null)[]>([]);
  const [active, setActive] = useState(0);

  const lead = PRODUCTS.slice(0, -1);
  const last = PRODUCTS[PRODUCTS.length - 1];

  useEffect(() => {
    const els = rowRefs.current.filter(Boolean) as HTMLLIElement[];
    if (!els.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            const i = els.indexOf(e.target as HTMLLIElement);
            if (i !== -1) setActive(i);
          }
        }
      },
      // Reading band sits low in the viewport rather than at the midline,
      // because the sticky heading occupies the top third — a midline band
      // would report a row still hidden behind it.
      { rootMargin: '-68% 0px -27% 0px', threshold: 0 }
    );

    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  const row = (p: Product, i: number) => (
    <li
      key={p.slug}
      ref={(el) => {
        rowRefs.current[i] = el;
      }}
    >
      <Link
        href={p.href}
        className="group grid grid-cols-[2.5rem_1fr_auto] items-baseline gap-x-4 border-b border-hairline py-4 transition-colors hover:bg-accent-50 md:grid-cols-[4rem_minmax(0,22rem)_minmax(0,1fr)_2rem] md:gap-x-6 md:py-5"
      >
        <span className="mono text-faint transition-colors group-hover:text-accent-700">
          {String(i + 1).padStart(2, '0')}
        </span>
        <span className="font-display text-f-lg font-bold tracking-tight text-ink transition-colors group-hover:text-accent-ink md:text-f-xl">
          {p.name}
        </span>
        <span className="col-start-2 text-f-xs text-muted md:col-start-3">
          {p.category}
        </span>
        <ArrowUpRight
          className="col-start-3 row-start-1 h-5 w-5 self-center text-hairline-strong transition-colors group-hover:text-accent-700 md:col-start-4"
          aria-hidden
        />
      </Link>
    </li>
  );

  return (
    <section className="section relative">
      <SectionBackdrop side="right" tone="warm" />
      <div className="container-page">
        {/* Sticky containing block: heading + every row but the last. */}
        <div className="relative">
          {/*
            Sticky only from lg. On a phone this block is ~39% of the screen,
            so pinning it leaves barely half a viewport for the list it is
            meant to be framing. Below lg it scrolls away like any heading.
          */}
          <div className="bg-canvas pb-8 pt-4 lg:sticky lg:top-[4.25rem] lg:z-10">
            <div className="grid gap-8 lg:grid-cols-12">
              <div className="lg:col-span-6">
                <p className="marker mono">Full catalogue</p>
                <MaskText as="h2" className="display mt-5 text-f-6xl">
                  <>{PRODUCT_COUNT_WORD_CAP} systems,</>
                  <>already built.</>
                </MaskText>
              </div>
              <div className="flex flex-col justify-between gap-8 lg:col-span-5 lg:col-start-8">
                {/* Position in the list. Desktop only — on mobile this column
                    stacks under the heading and the counter would just be
                    noise above the rows it describes. */}
                <div className="hidden lg:flex lg:items-center lg:gap-4">
                  <div className="relative h-[104px] w-[104px]">
                    {/* Ring closes as the list advances. Rotated -90deg so the
                        arc starts at twelve o'clock, and the dash offset is
                        transitioned rather than snapped so it sweeps between
                        rows instead of jumping. */}
                    <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90">
                      <circle
                        cx="50"
                        cy="50"
                        r={RADIUS}
                        fill="none"
                        stroke="var(--hairline)"
                        strokeWidth="5"
                      />
                      <circle
                        cx="50"
                        cy="50"
                        r={RADIUS}
                        fill="none"
                        stroke="var(--accent-500)"
                        strokeWidth="5"
                        strokeLinecap="round"
                        strokeDasharray={CIRCUMFERENCE}
                        strokeDashoffset={
                          CIRCUMFERENCE * (1 - (active + 1) / PRODUCTS.length)
                        }
                        className="transition-[stroke-dashoffset] duration-500 ease-out"
                      />
                    </svg>
                    <span className="mono-num absolute inset-0 grid place-items-center font-display text-f-3xl font-extrabold leading-none text-ink">
                      {String(active + 1).padStart(2, '0')}
                    </span>
                  </div>
                  <span className="mono-num text-f-lg text-faint">
                    / {PRODUCTS.length}
                  </span>
                </div>

                <Reveal delay={120}>
                  <p className="text-body">
                    Run one, or several on a single login. Each is configured to
                    your process rather than rebuilt from scratch.
                  </p>
                </Reveal>
              </div>
            </div>
          </div>

          <ul className="border-t border-hairline">{lead.map(row)}</ul>
        </div>

        {/* Final row, outside the sticky block — the heading has released by
            the time it arrives, so it is never covered. */}
        <ul>{row(last, PRODUCTS.length - 1)}</ul>
      </div>
    </section>
  );
}
