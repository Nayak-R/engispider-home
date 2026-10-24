import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import PinnedScroller from '@/components/motion/PinnedScroller';
import { CLIENTS, type Client } from '@/data/clients';
import { COMPANY } from '@/data/company';

/**
 * The customer wall as a pinned horizontal gallery.
 *
 * Every named customer gets a real card — logo, name, domain, sector —
 * rather than a logo strip, because the names and sectors are the part
 * that reads as evidence.
 *
 * The heading states the total served; these cards are the subset that
 * agreed to be named. Keeping both visible in one place is what stops
 * the short list reading as a contradiction of the larger figure.
 *
 * Two rows below `lg`. Fifteen cards end to end is ~3,600px of travel, which
 * is far too much to pin to a phone's scroll; wrapped into two rows the track
 * halves to ~1,750px and the section animates on mobile like the others
 * instead of degrading to a static swipe.
 */
export default function CustomerScroll() {
  return (
    <PinnedScroller
      ariaLabel="Our customers"
      smallRows={2}
      highlight
      className="border-y border-hairline bg-band"
      itemClassName="w-[248px] sm:w-[268px]"
      header={
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="marker mono">Customers</p>
            <h2 className="display mt-4 text-f-5xl">
              Running in production at
              <br />
              <span className="accent-word">
                {COMPANY.organisations.servedDisplay} organisations
              </span>
              .
            </h2>
          </div>
          <Link href="/customers" className="link-arrow mono pb-1">
            See all customers <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      }
    >
      {CLIENTS.map((c) => (
        <CustomerCard key={c.slug} client={c} />
      ))}
    </PinnedScroller>
  );
}

function CustomerCard({ client }: { client: Client }) {
  const inner = (
    <>
      {/* Logos arrive at wildly different aspect ratios and some ship a white
          or dark matte, so each sits object-contained in an equal white box.
          That equalises optical weight instead of letting the square,
          high-resolution marks dwarf the small or very wide ones. */}
      {/*
        Shorter on phones. Two rows of cards plus a three-line heading came
        to ~818px inside a pinned viewport that only has ~776px once the
        fixed header is cleared — and the overflow was clipped off the TOP,
        taking the heading with it. 24px off each row's logo tile is the
        least damaging 48px to find.
      */}
      <div className="flex h-[76px] items-center justify-center rounded border border-hairline bg-white p-3 sm:h-[84px] sm:p-4 lg:h-[108px] lg:p-5">
        {client.logo ? (
          <img
            src={client.logo}
            alt={`${client.name} logo`}
            width={client.width}
            height={client.height}
            loading="lazy"
            className="max-h-full w-auto max-w-full object-contain"
          />
        ) : (
          <span className="text-center">
            <span className="mono block text-faint">{client.wordmark?.kicker}</span>
            <span className="mt-1 block font-display text-[0.95rem] font-bold leading-tight text-ink">
              {client.wordmark?.title}
            </span>
          </span>
        )}
      </div>

      <div className="mt-4 flex flex-1 flex-col">
        {/* Same nesting, same reason — "Shreem Institute of Health
            Sciences" runs to three lines on a phone. */}
        <div>
          <h3 className="line-clamp-2 font-display text-[0.98rem] font-bold leading-snug text-ink">
            {client.name}
          </h3>
        </div>
        <p className="mono mt-1.5 text-faint">{client.label}</p>

        {/*
          The clamp lives on a nested element on purpose. A direct child of
          a flex container has its display blockified, which turns the
          `-webkit-box` that line-clamp depends on into `flow-root` and
          makes the utility silently do nothing. The card is a fixed
          height, so that safety net has to actually hold.
        */}
        {client.description && (
          <div className="mt-3">
            <p className="line-clamp-2 text-f-xs leading-relaxed text-muted sm:line-clamp-3">
              {client.description}
            </p>
          </div>
        )}

        {client.url && (
          <span className="mt-auto inline-flex items-center gap-1 pt-4 text-f-xs font-semibold text-ink transition-all group-hover:gap-2 group-hover:text-accent-ink">
            Visit site <ArrowUpRight className="h-3.5 w-3.5" />
          </span>
        )}
      </div>
    </>
  );

  const shell =
    /*
     * Shorter on phones. Two rows of these sit inside a pinned viewport
     * that has ~776px once the fixed header is cleared; at 320px each the
     * content came to ~818px and the overflow was clipped off the TOP,
     * cutting the heading in half. Three steps because a 360x780 handset
     * has ~712px of pinned box, not 776px.
     */
    'group flex h-[272px] flex-col rounded-lg border border-hairline bg-white p-4 transition-all sm:h-[292px] lg:h-[320px]';

  // A link only where we actually hold a site for the customer.
  return client.url ? (
    <a
      href={client.url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${client.name} — opens ${client.label} in a new tab`}
      className={`${shell} hover:-translate-y-1 hover:border-accent-300 hover:shadow-lg`}
    >
      {inner}
    </a>
  ) : (
    <div className={shell}>{inner}</div>
  );
}
