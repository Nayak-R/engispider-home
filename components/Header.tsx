'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X, ChevronDown, ArrowUpRight } from 'lucide-react';
import { PRODUCTS } from '@/data/products';

/**
 * Site header.
 *
 * Squared, hairline-bounded, monospace labels — the same technical-editorial
 * language as the page. The catalogue is too long for one dropdown
 * column, so the panel groups them the way buyers search: by the industry
 * they are in, then by the business function they need.
 */
const BY_INDUSTRY = ['restro360', 'campus360', 'retail360', 'lims', 'pharmacy', 'clinic', 'site-manager'];
const BY_FUNCTION = ['hrms', 'face-recognition', 'crm', 'inventory', 'whatsapp', 'monitoring', 'business'];

const pick = (slugs: string[]) =>
  slugs.map((s) => PRODUCTS.find((p) => p.slug === s)!).filter(Boolean);

type NavItem = { href: string; label: string; mega?: boolean };

const NAV: NavItem[] = [
  { href: '/solutions', label: 'Products', mega: true },
  { href: '/services', label: 'Services' },
  { href: '/customers', label: 'Customers' },
  { href: '/about', label: 'About' },
];

/**
 * Home is in the nav everywhere EXCEPT home.
 *
 * The logo already goes home, but that is a convention people have to know
 * rather than see — and on a deep page like /solutions/restaurant it is the
 * only way back to the top of the site. On the homepage itself the link
 * would point at the page you are already reading, so it is dropped there
 * instead of sitting permanently greyed out.
 */
const HOME_ITEM: NavItem = { href: '/', label: 'Home' };

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileProductsOpen, setMobileProductsOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pathname = usePathname();

  // trailingSlash is on, so usePathname() yields '/solutions/restaurant/'.
  const path = (pathname || '/').replace(/\/+$/, '') || '/';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /*
   * Close every menu when the route changes. This is a reset driven by an
   * external event (navigation), not state derived from a prop — the user
   * opened these, and arriving somewhere new has to shut them. Costs one
   * extra render per navigation.
   */
  useEffect(() => {
    /* eslint-disable react-hooks/set-state-in-effect */
    setMobileOpen(false);
    setMegaOpen(false);
    setMobileProductsOpen(false);
    /* eslint-enable react-hooks/set-state-in-effect */
  }, [pathname]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMegaOpen(false);
        setMobileOpen(false);
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  const isActive = (href: string) =>
    href === '/' ? path === '/' : path === href || path.startsWith(href + '/');
  const productsActive = path.startsWith('/solutions');

  const navItems = path === '/' ? NAV : [HOME_ITEM, ...NAV];

  const openMega = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setMegaOpen(true);
  };
  const scheduleClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setMegaOpen(false), 140);
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300 ${
        scrolled || megaOpen || mobileOpen
          ? 'border-hairline bg-white/90 backdrop-blur-xl'
          : 'border-transparent bg-white/0'
      }`}
    >
      <div className="container-page">
        <div className="flex h-[var(--header-h)] items-center justify-between gap-8">
          <Link href="/" aria-label="Engispider Infotech — home" className="shrink-0">
            <Image
              src="/images/EngiSpider-fnl.png"
              alt="Engispider Infotech"
              width={742}
              height={404}
              priority
              /* 40/48px inside a 68px bar — 10px of breathing room top and
                 bottom at the larger size, which is as big as the mark can go
                 before it crowds the rule beneath it. */
              className="h-10 w-auto md:h-12"
            />
          </Link>

          <nav className="hidden items-center gap-7 lg:flex" aria-label="Main">
            {navItems.map((item) =>
              item.mega ? (
                <div key={item.href} onMouseEnter={openMega} onMouseLeave={scheduleClose}>
                  <Link
                    href={item.href}
                    aria-expanded={megaOpen}
                    aria-haspopup="true"
                    onFocus={openMega}
                    aria-current={productsActive ? 'page' : undefined}
                    className={`relative flex items-center gap-1 py-2 text-[0.9rem] font-medium transition-colors ${
                      productsActive ? 'text-accent-ink' : 'text-body hover:text-ink'
                    }`}
                  >
                    {item.label}
                    <ChevronDown
                      className={`h-3.5 w-3.5 transition-transform duration-200 ${megaOpen ? 'rotate-180' : ''}`}
                      aria-hidden
                    />
                    {/* A rule under the active item. Colour alone was doing
                        the work, and #C2520A against slate grey is not a
                        difference anyone notices in a nav bar. */}
                    {productsActive && (
                      <span
                        aria-hidden
                        className="absolute inset-x-0 -bottom-0.5 h-0.5 rounded-full bg-accent-500"
                      />
                    )}
                  </Link>
                </div>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={isActive(item.href) ? 'page' : undefined}
                  className={`relative py-2 text-[0.9rem] font-medium transition-colors ${
                    isActive(item.href) ? 'text-accent-ink' : 'text-body hover:text-ink'
                  }`}
                >
                  {item.label}
                  {isActive(item.href) && (
                    <span
                      aria-hidden
                      className="absolute inset-x-0 -bottom-0.5 h-0.5 rounded-full bg-accent-500"
                    />
                  )}
                </Link>
              )
            )}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <Link href="/contact" className="btn btn-primary h-10 px-5 text-[0.9rem]">
              Book a demo
            </Link>
          </div>

          <button
            type="button"
            onClick={() => setMobileOpen((v) => !v)}
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            className="-mr-2 inline-flex h-11 w-11 items-center justify-center text-ink lg:hidden"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* --------------------------------------------------- mega panel */}
      <AnimatePresence>
        {megaOpen && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.16, ease: [0.16, 1, 0.3, 1] }}
            onMouseEnter={openMega}
            onMouseLeave={scheduleClose}
            className="absolute inset-x-0 top-full hidden border-b border-hairline bg-white lg:block"
          >
            <div className="container-page grid grid-cols-12 gap-10 py-10">
              <MegaColumn label="By industry" items={pick(BY_INDUSTRY)} path={path} className="col-span-4" />
              <MegaColumn label="By function" items={pick(BY_FUNCTION)} path={path} className="col-span-4" />

              <div className="col-span-3 col-start-10 border-l border-hairline pl-8">
                <p className="mono text-faint">Certified</p>
                <Image
                  src="/images/iso-9001-2015.webp"
                  alt=""
                  width={256}
                  height={256}
                  className="mt-4 h-20 w-20"
                />
                <p className="mt-3 font-display text-[0.95rem] font-bold text-ink">
                  ISO certified
                </p>
                <p className="mt-1 text-f-xs leading-relaxed text-muted">
                  Independently audited against an international standard.
                </p>
                <Link href="/about" className="link-arrow mono mt-4">
                  About us <ArrowUpRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ------------------------------------------------- mobile sheet */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-nav"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="border-t border-hairline bg-white lg:hidden"
          >
            <div className="mobile-nav-panel container-page py-4" data-lenis-prevent>
              <ul>
                {navItems.map((item) =>
                  item.mega ? (
                    <li key={item.href} className="border-b border-hairline">
                      <button
                        type="button"
                        onClick={() => setMobileProductsOpen((v) => !v)}
                        aria-expanded={mobileProductsOpen}
                        className={`flex w-full items-center justify-between py-4 text-left text-f-lg font-semibold ${
                          productsActive ? 'text-accent-ink' : 'text-ink'
                        }`}
                      >
                        <span className="flex items-center gap-2.5">
                          {productsActive && (
                            <span aria-hidden className="h-4 w-0.5 rounded-full bg-accent-500" />
                          )}
                          Products
                        </span>
                        <ChevronDown
                          className={`h-4 w-4 text-muted transition-transform ${
                            mobileProductsOpen ? 'rotate-180' : ''
                          }`}
                        />
                      </button>

                      <AnimatePresence initial={false}>
                        {mobileProductsOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                            className="overflow-hidden"
                          >
                            <ul className="pb-3">
                              {PRODUCTS.map((p, i) => {
                                const here = path === p.href;
                                return (
                                <li key={p.slug}>
                                  <Link
                                    href={p.href}
                                    aria-current={here ? 'page' : undefined}
                                    className={`grid grid-cols-[2rem_1fr] gap-x-3 border-t border-hairline py-3 ${
                                      here ? 'bg-accent-50' : ''
                                    }`}
                                  >
                                    <span
                                      className={`mono pt-1 ${here ? 'text-accent-700' : 'text-faint'}`}
                                    >
                                      {String(i + 1).padStart(2, '0')}
                                    </span>
                                    <span>
                                      <span
                                        className={`block font-semibold ${
                                          here ? 'text-accent-ink' : 'text-ink'
                                        }`}
                                      >
                                        {p.name}
                                      </span>
                                      <span className="block text-f-xs text-muted">{p.category}</span>
                                    </span>
                                  </Link>
                                </li>
                                );
                              })}
                            </ul>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </li>
                  ) : (
                    <li key={item.href} className="border-b border-hairline">
                      <Link
                        href={item.href}
                        aria-current={isActive(item.href) ? 'page' : undefined}
                        className={`flex items-center gap-2.5 py-4 text-f-lg font-semibold ${
                          isActive(item.href) ? 'text-accent-ink' : 'text-ink'
                        }`}
                      >
                        {isActive(item.href) && (
                          <span aria-hidden className="h-4 w-0.5 rounded-full bg-accent-500" />
                        )}
                        {item.label}
                      </Link>
                    </li>
                  )
                )}
              </ul>

              <div className="mt-5">
                <Link href="/contact" className="btn btn-primary w-full">
                  Book a demo
                </Link>
                <div className="mt-4 flex items-center gap-3">
                  <Image
                    src="/images/iso-9001-2015.webp"
                    alt=""
                    width={256}
                    height={256}
                    className="h-12 w-12 shrink-0"
                  />
                  <p className="mono text-muted">ISO certified</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function MegaColumn({
  label,
  items,
  path,
  className = '',
}: {
  label: string;
  items: typeof PRODUCTS;
  /** Current route, trailing slash already stripped. */
  path: string;
  className?: string;
}) {
  return (
    <div className={className}>
      <p className="mono mb-4 text-faint">{label}</p>
      <ul className="border-t border-hairline">
        {items.map((p, i) => {
          /*
           * The product you are already reading is marked.
           *
           * Highlighting the "Products" button told you which SECTION you
           * were in but not which of the fourteen — so opening the menu
           * from /solutions/restaurant gave no clue where you were
           * standing, and the row you wanted to avoid clicking looked like
           * every other row.
           */
          const here = path === p.href;
          return (
          /*
           * Rows arrive one after another rather than all at once.
           *
           * The panel holds fourteen products; appearing as a single block
           * gives the eye nowhere to start. 22ms apart is quick enough
           * that the whole column is settled in under a third of a second
           * — a sense of order, not a wait.
           *
           * Safe to animate from opacity:0 here: the panel only mounts on
           * open, so none of this is ever in the static HTML.
           */
          <motion.li
            key={p.slug}
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.22, delay: i * 0.022, ease: [0.16, 1, 0.3, 1] }}
          >
            {/*
              Name over category, not beside it.

              Side by side worked while names were short and varied.
              Now that all fourteen begin "Engispider ",
              the name column needs ~170px before the distinguishing word
              even starts, and the two halves no longer share a line: fixing
              the category column broke names across three lines mid-brand,
              and fixing the name truncated eight of the fourteen categories
              to an ellipsis. Stacked, both read in full at every width.
            */}
            <Link
              href={p.href}
              aria-current={here ? 'page' : undefined}
              className={`group relative block border-b border-hairline py-2.5 pl-3 transition-colors hover:text-accent-ink ${
                here ? 'bg-accent-50' : ''
              }`}
            >
              {here && (
                <span
                  aria-hidden
                  className="absolute inset-y-1.5 left-0 w-0.5 rounded-full bg-accent-500"
                />
              )}
              <span
                className={`block text-[0.9rem] font-semibold transition-colors group-hover:text-accent-ink ${
                  here ? 'text-accent-ink' : 'text-ink'
                }`}
              >
                {p.name}
              </span>
              <span className="mt-0.5 block text-f-2xs text-muted">{p.category}</span>
            </Link>
          </motion.li>
          );
        })}
      </ul>
    </div>
  );
}
