/**
 * Conversion event boundary.
 *
 * There is no analytics package in this project — no GA, no GTM container,
 * no Plausible, nothing. Rather than add a dependency and a third-party
 * script to a statically-exported site, this is the seam: every CTA click
 * and every successful demo submission calls `track()`, and `track()`
 * forwards to whatever is on `window` at the time.
 *
 * Today that is nothing, so it is a no-op costing one property lookup. The
 * day a GTM snippet or gtag is added to app/layout.tsx, every event on the
 * education page starts reporting with no further change here.
 *
 * ── What a backend/marketing owner has to do ─────────────────────────────
 *  1. Add the GTM or gtag snippet to app/layout.tsx.
 *  2. The events below arrive automatically. Names are stable:
 *       campus_cta_click      — any demo/contact CTA. params: { location }
 *       campus_tab_view       — product explorer tab opened. params: { tab }
 *       campus_demo_submit    — form submitted (attempt). params: {}
 *       campus_demo_success   — CRM accepted the enquiry. params: { institutionType }
 *       campus_demo_error     — CRM rejected or the network failed. params: { reason }
 *
 * Never fired speculatively: `campus_demo_success` only fires after the CRM
 * endpoint returns a success, so the funnel cannot report demos that were
 * never actually received.
 */

type Params = Record<string, string | number | boolean | undefined>;

type DataLayerWindow = Window & {
  dataLayer?: unknown[];
  gtag?: (command: 'event', name: string, params?: Params) => void;
};

export function track(event: string, params: Params = {}) {
  if (typeof window === 'undefined') return;

  const w = window as DataLayerWindow;

  try {
    // GTM: the container decides what to do with it.
    w.dataLayer?.push({ event, ...params });
    // gtag, where it is installed directly rather than through GTM.
    w.gtag?.('event', event, params);
  } catch {
    // Analytics must never break a form submission.
  }
}
