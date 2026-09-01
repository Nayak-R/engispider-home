import { SITE_URL } from '@/lib/seo';

/**
 * Emits BreadcrumbList structured data.
 *
 * Google uses this to replace the bare URL in a search result with a clickable
 * trail (engispider.com › Solutions › HRMS Software), which is both more
 * legible and a clearer signal of how the site is organised. "Home" is prepended
 * automatically, so callers pass only the trail below it.
 *
 * URLs are built with a trailing slash to match next.config.ts and the
 * canonicals emitted by lib/seo.ts — a breadcrumb pointing at a URL that
 * redirects is a wasted signal.
 */

type Crumb = { name: string; path: string };

export default function BreadcrumbJsonLd({ trail }: { trail: Crumb[] }) {
  const items = [{ name: 'Home', path: '/' }, ...trail];

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: items.map((crumb, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: crumb.name,
            item: `${SITE_URL}${crumb.path === '/' ? '/' : `${crumb.path}/`}`,
          })),
        }),
      }}
    />
  );
}
