import PinnedScroller from '@/components/motion/PinnedScroller';
import { PROCESS } from '@/data/services';

/**
 * The delivery method as a pinned horizontal scroller.
 *
 * Five stages read better travelling sideways than stacked in a five-column
 * grid: the grid squeezed each stage into a column too narrow for its own
 * description, and the sequence — the actual point — was lost because all
 * five arrived at once. Scrolling through them one at a time restores the
 * ordering, and the cards get room to state what each stage produces.
 *
 * Cards are deliberately wide (380–420px) so there is enough overflow for
 * pinning to be worth doing; below PinnedScroller's travel threshold it
 * degrades to a swipeable row on its own.
 */
export default function MethodScroll() {
  return (
    <PinnedScroller
      ariaLabel="How we work"
      highlight
      className="border-y border-hairline bg-band"
      itemClassName="w-[320px] sm:w-[380px] lg:w-[420px]"
      header={
        <div className="max-w-3xl">
          <p className="marker mono">Method</p>
          <h2 className="display mt-4 text-f-5xl">
            Five stages. Each ends with something you can{' '}
            <span className="accent-word">actually hold</span>.
          </h2>
        </div>
      }
    >
      {PROCESS.map((s, i) => (
        <article
          key={s.step}
          className="group relative flex h-[320px] flex-col overflow-hidden rounded-lg border border-hairline bg-white p-7 transition-all hover:border-accent-300 hover:shadow-lg"
        >
          {/* Oversized ghosted stage number — gives each card a distinct
              silhouette so the sequence is legible at a glance while
              scrolling, without competing with the heading for contrast. */}
          <span
            aria-hidden
            /* Sits fully inside the card. Bleeding it off the corner sliced
               the digits mid-stroke, which read as a clipping fault rather
               than a deliberate crop. */
            className="pointer-events-none absolute right-5 top-3 select-none font-display text-[6rem] font-extrabold leading-none text-well transition-colors group-hover:text-accent-50"
          >
            {s.step}
          </span>

          <div className="relative">
            <span className="mono text-accent-700">Stage {s.step}</span>
            <h3 className="mt-4 font-display text-f-2xl font-bold leading-tight text-ink">
              {s.title}
            </h3>
            <p className="mt-3 text-f-xs leading-relaxed text-body">{s.description}</p>
          </div>

          <div className="relative mt-auto border-t border-hairline pt-4">
            <span className="mono text-faint">You get</span>
            <p className="mt-1.5 text-f-xs font-semibold leading-snug text-ink">{s.output}</p>
          </div>

          {/* Connector tick, echoing the rule that threads the stages. */}
          {i < PROCESS.length - 1 && (
            <span
              aria-hidden
              className="absolute -right-4 top-1/2 z-10 hidden h-px w-4 bg-hairline-mid lg:block"
            />
          )}
        </article>
      ))}
    </PinnedScroller>
  );
}
