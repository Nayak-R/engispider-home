/**
 * Soft colour fields behind a long body section.
 *
 * The hero has its own treatment; the problem is everything after it —
 * five pillar rows, a twenty-nine item grid, a fourteen-row catalogue, an
 * FAQ — all on flat white, which is a lot of page with nothing behind it.
 *
 * Four overlapping radial washes, heavily blurred, drifting against each
 * other on long cycles. No line work: drawn curves across a section of
 * body copy compete with the text for the eye, where a wash sits
 * underneath it and simply gives the white somewhere to go.
 *
 * ── Keeping it under the content ─────────────────────────────────────────
 * Fields peak at 0.34 alpha before a 3xl blur. Measured on the rendered
 * page, the most saturated pixel behind any text is about #FDEFE3, which
 * leaves body copy above 7:1 — comfortably past AA with room to spare.
 * Dense card grids set their cells on opaque white, so the wash shows
 * only in the gutters there; the open sections are where it does its
 * work.
 *
 * Costs four divs. No image request, no JavaScript, nothing that can shift
 * layout, and every animation is a compositor transform that the global
 * prefers-reduced-motion rule stops dead.
 *
 * The parent must be `relative`.
 */

type Tone = 'warm' | 'cool' | 'mixed';

/** Hue sets, so consecutive sections do not repeat the same wash. */
const FIELDS: Record<Tone, string[]> = {
  warm: [
    'rgba(251,124,31,0.34)',
    'rgba(244,114,182,0.24)',
    'rgba(251,191,36,0.26)',
    'rgba(99,102,241,0.20)',
  ],
  cool: [
    'rgba(99,102,241,0.30)',
    'rgba(56,189,248,0.26)',
    'rgba(167,139,250,0.24)',
    'rgba(251,124,31,0.20)',
  ],
  mixed: [
    'rgba(251,124,31,0.30)',
    'rgba(56,189,248,0.24)',
    'rgba(244,114,182,0.22)',
    'rgba(129,140,248,0.18)',
  ],
};

export default function SectionBackdrop({
  side = 'right',
  tone = 'warm',
}: {
  /** Which edge the heaviest wash sits against. */
  side?: 'left' | 'right';
  tone?: Tone;
}) {
  const c = FIELDS[tone];
  const near = side === 'right' ? '-right-[14%]' : '-left-[14%]';
  const far = side === 'right' ? '-left-[10%]' : '-right-[10%]';

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      {/* The anchor wash, hard against one edge. */}
      <div
        className={`absolute -top-[14%] h-[680px] w-[680px] rounded-full blur-3xl animate-aurora-a ${near}`}
        style={{ background: `radial-gradient(circle, ${c[0]}, transparent 70%)` }}
      />
      {/* Counterweight on the opposite edge, lower down, so the section
          has a diagonal rather than one bright corner. */}
      <div
        className={`absolute bottom-[-20%] h-[600px] w-[600px] rounded-full blur-3xl animate-aurora-b ${far}`}
        style={{
          background: `radial-gradient(circle, ${c[1]}, transparent 72%)`,
          animationDelay: '-9s',
        }}
      />
      {/* Two smaller fields drifting through the middle, which is what
          stops the pair above reading as two static blobs. */}
      <div
        className="absolute left-[32%] top-[22%] h-[460px] w-[460px] rounded-full blur-3xl animate-aurora-b"
        style={{
          background: `radial-gradient(circle, ${c[2]}, transparent 70%)`,
          animationDelay: '-4s',
        }}
      />
      <div
        className="absolute right-[26%] bottom-[8%] h-[420px] w-[420px] rounded-full blur-3xl animate-aurora-a"
        style={{
          background: `radial-gradient(circle, ${c[3]}, transparent 72%)`,
          animationDelay: '-14s',
        }}
      />
    </div>
  );
}
