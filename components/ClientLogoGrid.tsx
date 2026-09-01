import { ArrowUpRight } from 'lucide-react';
import type { Client, Sector } from '@/data/clients';

/**
 * Shared customer wall: compact logo tiles on the home page, full cards on
 * /customers.
 *
 * Constraints the supplied assets imposed:
 *
 *  - Every mark sits on a white tile. Most are transparent PNGs, but MediJini
 *    ships a white matte and Orevia a dark brown one, so no single dark
 *    background renders them all — a light tile is the only surface that does.
 *  - Aspect ratios run from 1:1 to 6:1 and sources from 110px to 4200px wide,
 *    so the tile is a fixed box and each logo is `object-contain`ed to fill it.
 *    That equalises optical weight instead of letting the square, high-res
 *    logos dwarf the small or very wide ones.
 *  - Some customers have no logo, no site, or no description yet. Every one of
 *    those is optional and the card stays whole without it.
 *
 * The sector palette lives here rather than in data/clients.ts because Tailwind
 * only scans ./app, ./components and ./pages — class names in the data
 * directory would be purged from the build.
 *
 * No framer-motion: this renders fifteen cards on pages that are already heavy,
 * and every bit of this polish is cheaper as plain CSS.
 */

const SECTOR_STYLES: Record<Sector, { label: string; gradient: string }> = {
  education: { label: 'Education', gradient: 'from-violet-500 to-indigo-500' },
  healthcare: { label: 'Healthcare', gradient: 'from-teal-500 to-emerald-500' },
  logistics: { label: 'Logistics', gradient: 'from-amber-500 to-orange-500' },
  infrastructure: { label: 'Infrastructure', gradient: 'from-blue-500 to-cyan-500' },
  hospitality: { label: 'Hospitality', gradient: 'from-rose-500 to-pink-500' },
};

const NEUTRAL_GRADIENT = 'from-blue-500 to-purple-500';

/** Renders as a link only when we actually have a site for the customer. */
function CardShell({
  client,
  className,
  children,
}: {
  client: Client;
  className: string;
  children: React.ReactNode;
}) {
  if (!client.url) return <div className={className}>{children}</div>;
  return (
    <a
      href={client.url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${client.name} — opens ${client.label} in a new tab`}
      className={className}
    >
      {children}
    </a>
  );
}

function LogoMark({ client, className }: { client: Client; className: string }) {
  return (
    <div className={`flex items-center justify-center rounded-2xl bg-white ${className}`}>
      {client.logo ? (
        <img
          src={client.logo}
          alt={`${client.name} logo`}
          width={client.width}
          height={client.height}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-105"
        />
      ) : (
        <span className="flex flex-col items-center text-center leading-tight transition-transform duration-300 group-hover:scale-105">
          <span className="text-[0.6rem] font-semibold uppercase tracking-[0.2em] text-gray-500">
            {client.wordmark?.kicker}
          </span>
          <span className="mt-1 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-lg font-bold text-transparent">
            {client.wordmark?.title}
          </span>
        </span>
      )}
    </div>
  );
}

function DetailedCard({ client }: { client: Client }) {
  const sector = client.sector ? SECTOR_STYLES[client.sector] : null;
  const gradient = sector?.gradient ?? NEUTRAL_GRADIENT;

  return (
    <li className="group relative h-full">
      {/* Sector-tinted bloom behind the card, revealed on hover */}
      <div
        aria-hidden
        className={`pointer-events-none absolute -inset-0.5 rounded-3xl bg-gradient-to-b ${gradient} opacity-0 blur-md transition-opacity duration-500 group-hover:opacity-30`}
      />

      <CardShell
        client={client}
        className="relative flex h-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.08] to-white/[0.02] transition-all duration-300 group-hover:-translate-y-1.5 group-hover:border-white/25 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-400"
      >
        <span
          aria-hidden
          className={`h-1 w-full shrink-0 bg-gradient-to-r ${gradient} opacity-70 transition-opacity duration-300 group-hover:opacity-100`}
        />

        <div className="p-5">
          <LogoMark client={client} className="h-32 px-6 py-5" />

          <div className="mt-5">
            {sector && (
              <span className="mb-3 inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[0.65rem] font-semibold uppercase tracking-wider">
                <span className={`h-1.5 w-1.5 rounded-full bg-gradient-to-r ${gradient}`} />
                <span className={`bg-gradient-to-r ${gradient} bg-clip-text text-transparent`}>
                  {sector.label}
                </span>
              </span>
            )}

            <h3 className="text-lg font-semibold leading-snug text-white transition-colors group-hover:text-blue-200">
              {client.name}
            </h3>

            {/* Height is reserved so cards align whether or not copy exists yet */}
            <p className="mt-2 line-clamp-2 min-h-[2.5rem] text-sm leading-relaxed text-gray-400">
              {client.description}
            </p>
          </div>
        </div>

        <div className="mt-auto flex items-center justify-between gap-3 border-t border-white/10 px-5 py-3.5">
          <span className="truncate text-xs text-gray-500">{client.label}</span>
          {client.url && (
            <span className="inline-flex shrink-0 items-center gap-1 text-xs font-semibold text-blue-400 transition-transform duration-300 group-hover:translate-x-0.5">
              Visit
              <ArrowUpRight className="h-3.5 w-3.5" />
            </span>
          )}
        </div>
      </CardShell>
    </li>
  );
}

function CompactTile({ client }: { client: Client }) {
  return (
    <li className="w-[calc(50%-0.5rem)] sm:w-44 lg:w-48">
      <CardShell
        client={client}
        className="group flex h-full flex-col rounded-2xl border border-white/10 bg-white/5 p-3 transition-all duration-300 hover:-translate-y-1 hover:border-blue-400/50 hover:bg-white/10 hover:shadow-xl hover:shadow-blue-500/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-400"
      >
        <LogoMark client={client} className="h-24 px-5 py-4 sm:h-28" />
      </CardShell>
    </li>
  );
}

type Props = {
  clients: Client[];
  /** Full cards with sector, name and description, instead of bare logo tiles. */
  detailed?: boolean;
};

export default function ClientLogoGrid({ clients, detailed = false }: Props) {
  if (detailed) {
    return (
      <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {clients.map((client) => (
          <DetailedCard key={client.slug} client={client} />
        ))}
      </ul>
    );
  }

  return (
    <ul className="flex flex-wrap justify-center gap-4 sm:gap-5">
      {clients.map((client) => (
        <CompactTile key={client.slug} client={client} />
      ))}
    </ul>
  );
}
