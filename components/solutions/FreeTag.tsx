import { Reveal } from '@/components/motion/Reveal';

/**
 * The "free" mark.
 *
 * Something being included at no extra cost is one of the strongest things
 * this site has to say, and it was being said in a 10px monospace chip that
 * read like a form label. It needs to look like a price sticker, because
 * that is what it is.
 *
 * Ink on accent, never white: #FB7C1F against white measures 2.62:1 and
 * fails, ink on #FB7C1F measures 6.80:1 and passes AA. The whole palette is
 * built around that one fact (see app/globals.css).
 *
 * The halo is decorative and aria-hidden; the word FREE carries the meaning
 * and sits in normal document order next to the sentence it qualifies.
 */
export function FreeTag({ className = '' }: { className?: string }) {
  return (
    <span className={`relative inline-grid shrink-0 place-items-center ${className}`}>
      {/* Soft pulse behind the sticker — motion-safe, so it stops dead
          under prefers-reduced-motion rather than nagging. */}
      <span
        aria-hidden
        className="absolute inset-0 rounded-full bg-accent-500/30 motion-safe:animate-pulse-ring"
      />
      <span
        className="relative grid h-[4.25rem] w-[4.25rem] -rotate-[9deg] place-items-center rounded-full bg-accent-500 shadow-[0_12px_30px_-10px_rgba(251,124,31,0.9)] ring-4 ring-canvas"
      >
        <span className="font-display text-[1.05rem] font-extrabold uppercase leading-none tracking-tight text-ink">
          Free
        </span>
      </span>
    </span>
  );
}

/**
 * The sticker plus the sentence it is stamped on.
 *
 * `kicker` is the claim in display type — short enough to read at a glance
 * while scrolling. `children` is the qualifier nobody reads until they are
 * interested, which is the correct order for this kind of statement.
 */
export function FreeCallout({
  kicker,
  children,
  delay = 0,
}: {
  kicker: string;
  children: React.ReactNode;
  delay?: number;
}) {
  return (
    <Reveal delay={delay}>
      <div className="relative overflow-hidden rounded-xl border border-accent-300 bg-accent-50">
        {/* A wash from the sticker side, so the block has a direction and
            does not read as a flat alert box. */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-y-0 left-0 w-64"
          style={{
            background:
              'radial-gradient(70% 120% at 0% 50%, rgba(251,124,31,0.22), transparent 70%)',
          }}
        />
        <div className="relative flex flex-col items-start gap-5 p-6 sm:flex-row sm:items-center sm:gap-7 sm:p-7">
          <FreeTag />
          <div className="min-w-0">
            <p className="font-display text-f-lg font-extrabold leading-tight text-ink">
              {kicker}
            </p>
            <p className="mt-2 text-f-xs leading-relaxed text-body">{children}</p>
          </div>
        </div>
      </div>
    </Reveal>
  );
}
