'use client';

import {
  Fragment,
  useEffect,
  useRef,
  useState,
  type ElementType,
  type ReactNode,
} from 'react';

/**
 * Reveal primitives.
 *
 * All of these share one rule: the server-rendered state is VISIBLE. A
 * blocking inline script in <head> puts `.js` on <html> before first paint,
 * and only the `.js` variants of these CSS classes hide anything. So a
 * crawler, or a browser with JS off, reads the finished page — while a real
 * browser gets the animation with no flash.
 *
 * The previous build used framer-motion's `whileInView`, which server-renders
 * its `initial` state as inline CSS. That shipped 116 nodes at opacity:0 on
 * the homepage, including the <h1>'s parent, putting Largest Contentful Paint
 * behind ~1.5MB of JS.
 *
 * Only opacity, transform and clip are animated, so frames come off the
 * compositor. prefers-reduced-motion is handled centrally in globals.css.
 */

/**
 * Resolves once the first-load overlay has cleared, so entrance animations
 * are not spent behind it. Already-booted navigations resolve immediately,
 * and a timeout means a missing loader can never strand the page unrevealed.
 */
function whenBooted(run: () => void) {
  if (typeof document === 'undefined' || document.documentElement.dataset.booted) {
    run();
    return () => {};
  }
  let done = false;
  const go = () => {
    if (done) return;
    done = true;
    run();
  };
  window.addEventListener('engispider:booted', go, { once: true });
  const safety = window.setTimeout(go, 2500);
  return () => {
    window.removeEventListener('engispider:booted', go);
    window.clearTimeout(safety);
  };
}

function useInViewClass<T extends HTMLElement>(once = true) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      el.classList.add('is-visible');
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add('is-visible');
            if (once) io.unobserve(e.target);
          } else if (!once) {
            e.target.classList.remove('is-visible');
          }
        }
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.01 }
    );

    const cancel = whenBooted(() => io.observe(el));
    return () => {
      cancel();
      io.disconnect();
    };
  }, [once]);

  return ref;
}

type Direction = 'up' | 'left' | 'right' | 'scale';

const DIR: Record<Direction, string> = {
  up: '',
  left: 'reveal--left',
  right: 'reveal--right',
  scale: 'reveal--scale',
};

export function Reveal({
  children,
  direction = 'up',
  delay = 0,
  distance,
  as: Tag = 'div',
  className = '',
}: {
  children: ReactNode;
  direction?: Direction;
  delay?: number;
  distance?: number;
  as?: ElementType;
  className?: string;
}) {
  const ref = useInViewClass<HTMLElement>();

  const style: React.CSSProperties & Record<string, string | number> = {};
  if (delay) style['--rv-delay'] = `${delay}ms`;
  if (distance !== undefined) style['--rv-y'] = `${distance}px`;

  return (
    <Tag
      ref={ref}
      className={`reveal ${DIR[direction]} ${className}`.trim()}
      style={Object.keys(style).length ? style : undefined}
    >
      {children}
    </Tag>
  );
}

/**
 * Display type that slides up from beneath its own baseline, one line at a
 * time, inside an overflow-hidden mask.
 *
 * Pass each line as a separate child. The mask is per-line, which is the
 * whole point — a single mask around a wrapped paragraph slides the block,
 * which reads as a generic transition rather than typesetting.
 */
export function MaskText({
  children,
  as: Tag = 'h2',
  className = '',
  delay = 0,
  step = 90,
}: {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  delay?: number;
  step?: number;
}) {
  /*
   * The raw children array is used deliberately — NOT Children.toArray.
   *
   * toArray flattens fragments, so a line written as
   *   <>to the <span className="accent-word">final ledger</span>.</>
   * was exploded into three separate entries and masked onto three separate
   * lines, splitting the phrase mid-sentence. Reading props.children
   * directly keeps each fragment as one line, which is what the caller
   * wrote.
   */
  const lines: ReactNode[] = Array.isArray(children) ? children : [children];
  return (
    <Tag className={className}>
      {lines.map((line, i) => (
        // Index keys are correct here: the lines are literal JSX siblings
        // written at the call site, so their order never changes.
        <Fragment key={i}>
          <MaskLine delay={delay + i * step}>{line}</MaskLine>
          {/*
            A real space between the lines.

            Each mask is a block, so visually this collapses to nothing —
            but without it the heading has no word boundary in its text
            content, and every h2 on the site was extracting as
            "Claims you canactually check." That is what a screen reader
            announces, what a search engine indexes, and what an AI engine
            quotes.
          */}
          {i < lines.length - 1 ? ' ' : ''}
        </Fragment>
      ))}
    </Tag>
  );
}

export function MaskLine({
  children,
  delay = 0,
  className = '',
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useInViewClass<HTMLSpanElement>();
  return (
    <span
      ref={ref}
      className={`mask-line ${className}`.trim()}
      style={delay ? ({ ['--rv-delay']: `${delay}ms` } as React.CSSProperties) : undefined}
    >
      <span>{children}</span>
    </span>
  );
}

/**
 * A line of display type revealed word by word.
 *
 * Each word gets its own mask and its own delay, so the line assembles left
 * to right instead of arriving in one piece. Used on the hero, where the
 * headline is the first thing read and worth the extra beat.
 *
 * The spaces between words are plain text nodes OUTSIDE the masks. That
 * matters: non-breaking spaces inside them would stop the headline wrapping,
 * and at display size it has to be free to break.
 */
export function MaskWords({
  children,
  as: Tag = 'span',
  className = '',
  delay = 0,
  step = 70,
}: {
  children: string;
  as?: ElementType;
  className?: string;
  delay?: number;
  step?: number;
}) {
  const words = children.split(' ');
  return (
    <Tag className={className}>
      {words.map((word, i) => (
        <span key={`${word}-${i}`}>
          <MaskWord delay={delay + i * step}>{word}</MaskWord>
          {i < words.length - 1 ? ' ' : ''}
        </span>
      ))}
    </Tag>
  );
}

function MaskWord({ children, delay }: { children: ReactNode; delay: number }) {
  const ref = useInViewClass<HTMLSpanElement>();
  return (
    <span
      ref={ref}
      className="mask-word"
      style={delay ? ({ ['--rv-delay']: `${delay}ms` } as React.CSSProperties) : undefined}
    >
      <span>{children}</span>
    </span>
  );
}

/** A hairline that draws itself left-to-right when scrolled into view. */
export function RuleDraw({
  className = '',
  delay = 0,
}: {
  className?: string;
  delay?: number;
}) {
  const ref = useInViewClass<HTMLDivElement>();
  return (
    <div
      ref={ref}
      aria-hidden
      className={`rule-draw h-px w-full bg-hairline ${className}`.trim()}
      style={delay ? ({ ['--rv-delay']: `${delay}ms` } as React.CSSProperties) : undefined}
    />
  );
}

/**
 * Counts up when scrolled into view.
 *
 * The final value is what renders on the server, so the static HTML always
 * states the real figure. It only drops to zero at the instant the animation
 * starts, after hydration. The old implementation emitted `0` into the HTML
 * and animated up, publishing eight machine-readable assertions of zero.
 */
export function CountUp({
  value,
  decimals = 0,
  suffix = '',
  prefix = '',
  duration = 1500,
  className = '',
}: {
  value: number;
  decimals?: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let raf = 0;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();

        let start: number | null = null;
        setDisplay(0);

        const tick = (now: number) => {
          if (start === null) start = now;
          const t = Math.min((now - start) / duration, 1);
          const eased = t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
          setDisplay(eased * value);
          if (t < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.4 }
    );

    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [value, duration]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {display.toLocaleString('en-IN', {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      })}
      {suffix}
    </span>
  );
}
