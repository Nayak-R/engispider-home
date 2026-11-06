import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { CLIENTS, type Client } from '@/data/clients';
import { COMPANY } from '@/data/company';

/**
 * The customer wall as an auto-scrolling logo strip.
 *
 * The heading states the total served; the strip is the subset that agreed
 * to be named. Keeping both in one place is what stops the short list
 * reading as a contradiction of the larger figure.
 *
 * The list is rendered TWICE. The track animates to exactly -50%, which
 * lands copy two precisely where copy one began, so the loop is seamless
 * and needs no measurement or JS. Copy two is aria-hidden — it is the same
 * fifteen customers, and announcing them a second time is noise.
 *
 * Nothing here is a link. The wall is evidence, not navigation: these are
 * customers, not partners we are sending traffic to, and a moving target
 * that opens someone else's site is a trap rather than a feature. The one
 * link in the section is `See all customers`, which goes to our own page.
 *
 * This is a server component. The whole thing is one CSS animation; there
 * is no scroll listener, no observer and no client bundle.
 */
export default function CustomerScroll() {
  return (
    <section
      aria-label="Our customers"
      /* Bottom padding is short by exactly the 24px of headroom each strip
         item carries, so the band still breathes the same 56/64px under the
         logos as every other section does under its content. */
      className="border-y border-hairline bg-band pb-8 pt-14 sm:pb-10 sm:pt-16"
    >
      <div className="container-page">
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
      </div>

      {/* Full-bleed on purpose: the strip runs edge to edge and is faded out
          at both ends by the mask on `.marquee`, so it reads as continuous
          rather than as a box that happens to contain moving logos. */}
      <div className="marquee mt-4 sm:mt-6">
        <ul className="marquee-track animate-marquee">
          {CLIENTS.map((c) => (
            <LogoTile key={c.slug} client={c} />
          ))}
          {CLIENTS.map((c) => (
            <LogoTile key={`echo-${c.slug}`} client={c} echo />
          ))}
        </ul>
      </div>
    </section>
  );
}

/**
 * One customer in the strip. Logo plus name, and nothing clickable.
 *
 * `echo` marks the second, duplicate pass of the list — presentational only.
 */
function LogoTile({ client, echo = false }: { client: Client; echo?: boolean }) {
  const inner = client.logo ? (
    <>
      {/* Logos arrive at wildly different aspect ratios and some ship a white
          or dark matte, so each sits object-contained in an equal box. That
          equalises optical weight instead of letting the square,
          high-resolution marks dwarf the small or very wide ones. */}
      <div className="flex min-h-0 flex-1 items-center justify-center">
        <img
          src={client.logo}
          alt={echo ? '' : `${client.name} logo`}
          width={client.width}
          height={client.height}
          loading="lazy"
          className="max-h-full w-auto max-w-full object-contain"
        />
      </div>
      <p className="mt-3 line-clamp-2 text-center text-f-2xs font-semibold leading-snug text-muted transition-colors group-hover:text-ink">
        {client.name}
      </p>
    </>
  ) : (
    /* No mark supplied, so the name itself becomes the mark, set in the
       display face. A second name line underneath would only repeat it. */
    <div className="flex flex-1 items-center justify-center">
      <span className="text-center font-display text-[0.95rem] font-bold leading-tight text-ink">
        {client.name}
      </span>
    </div>
  );

  return (
    /*
     * The horizontal gutter is PADDING on each item, never `gap`. Thirty
     * items have twenty-nine gaps, so half the track would be one copy plus
     * half a gap — which is not one copy's width, and the loop would jump by
     * half a gap on every pass. Padding belongs to the item, so each copy is
     * exactly half the track and -50% is exact.
     *
     * The vertical padding is headroom. `.marquee` has to clip horizontally,
     * which clips vertically too, so without it the hover lift and its
     * shadow are sheared off against the top and bottom edges.
     */
    <li className="shrink-0 px-3 py-6 sm:px-4" {...(echo ? { 'aria-hidden': true } : {})}>
      {/* Every mark keeps its own colours. These are fifteen real brands and
          a desaturated wall flattened all of them to the same grey; the hover
          state is carried by the border instead, which singles one out
          without touching how any of them look. */}
      <div className="logo-tile group h-[132px] w-[196px] sm:h-[144px] sm:w-[220px]">
        <span className="logo-tile__ring" aria-hidden />
        {/* Inset by the 2px that the ring shows through, and opaque, so the
            ring is only ever visible as a border. */}
        <div className="absolute inset-[2px] flex flex-col rounded-[8px] bg-white px-3 py-4 sm:px-4">
          {inner}
        </div>
      </div>
    </li>
  );
}
