import type { Client, Sector } from '@/data/clients';

/**
 * The customer wall on /customers: one card per named customer.
 *
 * This component was written for the old black theme and was left behind
 * when the site went light — `text-white` names, `border-white/10` edges and
 * `bg-white/5` fills meant most of each card was white-on-white and simply
 * could not be read. Everything here is now on the light tokens.
 *
 * Constraints the supplied assets impose:
 *
 *  - Every mark sits on a white tile. Most are transparent PNGs, but MediJini
 *    ships a white matte and Orevia a dark brown one, so no single dark
 *    background renders them all — a light tile is the only surface that does.
 *  - Aspect ratios run from 1:1 to 6:1 and sources from 110px to 4200px wide,
 *    so the tile is a fixed box and each logo is `object-contain`ed inside it.
 *    That equalises optical weight instead of letting the square, high-res
 *    logos dwarf the small or very wide ones.
 *  - Some customers have no logo and some no description. Both are optional
 *    and the card stays whole without either.
 *
 * Nothing here is a link. These are customers, not partners we are sending
 * traffic to, and the page's job is to let you read who they are.
 *
 * The sector palette lives here rather than in data/clients.ts because
 * Tailwind only scans ./app, ./components and ./pages — class names in the
 * data directory would be purged from the build.
 */

/**
 * One quiet hue per sector: a rule across the top of the card and a tinted
 * pill above the name.
 *
 * Solid colours, not the gradient-clipped text this used to carry. Gradient
 * text has no single contrast ratio to answer for, and against a light card
 * the old violet-to-indigo fill failed badly at pill size. Every pairing
 * below is a 700 weight on a 50 tint, which clears AA comfortably.
 */
const SECTOR_STYLES: Record<Sector, { label: string; rule: string; pill: string; dot: string }> = {
  education:      { label: 'Education',      rule: 'bg-indigo-400', pill: 'bg-indigo-50 text-indigo-700', dot: 'bg-indigo-500' },
  healthcare:     { label: 'Healthcare',     rule: 'bg-teal-400',   pill: 'bg-teal-50 text-teal-700',     dot: 'bg-teal-500'   },
  logistics:      { label: 'Logistics',      rule: 'bg-amber-400',  pill: 'bg-amber-50 text-amber-700',   dot: 'bg-amber-500'  },
  infrastructure: { label: 'Infrastructure', rule: 'bg-sky-400',    pill: 'bg-sky-50 text-sky-700',       dot: 'bg-sky-500'    },
  hospitality:    { label: 'Hospitality',    rule: 'bg-rose-400',   pill: 'bg-rose-50 text-rose-700',     dot: 'bg-rose-500'   },
};

function LogoMark({ client }: { client: Client }) {
  return (
    <div className="flex h-28 shrink-0 items-center justify-center rounded-lg border border-hairline bg-white px-5 py-4">
      {client.logo ? (
        <img
          src={client.logo}
          alt={`${client.name} logo`}
          width={client.width}
          height={client.height}
          loading="lazy"
          decoding="async"
          className="max-h-full w-auto max-w-full object-contain transition-transform duration-300 group-hover:scale-105"
        />
      ) : (
        <span className="flex flex-col items-center text-center leading-tight transition-transform duration-300 group-hover:scale-105">
          <span className="mono text-muted">{client.wordmark?.kicker}</span>
          <span className="mt-1 font-display text-f-lg font-bold text-ink">
            {client.wordmark?.title}
          </span>
        </span>
      )}
    </div>
  );
}

function CustomerCard({ client }: { client: Client }) {
  const sector = client.sector ? SECTOR_STYLES[client.sector] : null;

  return (
    <li className="group h-full">
      <div className="flex h-full flex-col overflow-hidden rounded-xl border border-hairline bg-white shadow-sm transition duration-300 ease-out group-hover:-translate-y-1 group-hover:border-accent-300 group-hover:shadow-lg">
        {/* Sector rule. Hairline where the sector is not recorded, so an
            unclassified customer reads as neutral rather than mislabelled. */}
        <span
          aria-hidden
          className={`h-1 w-full shrink-0 ${sector ? sector.rule : 'bg-hairline-mid'}`}
        />

        <div className="flex flex-1 flex-col p-5">
          <LogoMark client={client} />

          <div className="mt-5 flex flex-1 flex-col">
            {sector && (
              <span
                className={`mono mb-3 inline-flex w-fit items-center gap-1.5 rounded-full px-2.5 py-1 ${sector.pill}`}
              >
                <span aria-hidden className={`h-1.5 w-1.5 rounded-full ${sector.dot}`} />
                {sector.label}
              </span>
            )}

            <h3 className="font-display text-f-lg font-bold leading-snug tracking-tight text-ink">
              {client.name}
            </h3>

            {/* Left out entirely rather than reserved as blank space: seven of
                these customers have no description recorded, and an empty slot
                under the name reads as a card that failed to load. */}
            {client.description && (
              <p className="mt-2 text-f-xs leading-relaxed text-muted">
                {client.description}
              </p>
            )}
          </div>
        </div>
      </div>
    </li>
  );
}

export default function ClientLogoGrid({ clients }: { clients: Client[] }) {
  return (
    <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {clients.map((client) => (
        <CustomerCard key={client.slug} client={client} />
      ))}
    </ul>
  );
}
