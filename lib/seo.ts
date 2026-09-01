import type { Metadata } from 'next';

/**
 * Per-page metadata builder.
 *
 * This exists because of a specific trap: the root layout sets
 * `alternates.canonical`, and Next.js inherits that into every page that does
 * not set its own. The result was thirteen pages all declaring the homepage as
 * their canonical URL — telling Google to drop them from the index in favour of
 * "/". The same inheritance silently pinned `og:url` to the homepage too.
 *
 * Building every page's metadata through one function means a page cannot be
 * added without a canonical again.
 *
 * `path` is passed relative ('/solutions/hrms'). Next resolves it against
 * `metadataBase` and applies the trailing slash from next.config.ts, so the
 * emitted canonical matches the real URL exactly.
 */

export const SITE_URL = 'https://engispider.com';
export const SITE_NAME = 'Engispider Infotech';

/** 1200x630 social card. Overridable per page once page-specific art exists. */
const DEFAULT_OG_IMAGE = '/images/EngiSpider-fnl.png';

type PageSeo = {
  /** Page title WITHOUT the brand suffix — the root template appends it. */
  title: string;
  /** Aim for 150-160 characters; Google truncates beyond that. */
  description: string;
  /** Route path, leading slash, no trailing slash. */
  path: string;
  keywords?: string[];
  /** Defaults to `title` / `description` when a distinct social angle isn't needed. */
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  /** Set for pages that should be crawled but kept out of the index. */
  noindex?: boolean;
  /**
   * Supply on a section layout that has child routes. A segment setting a plain
   * `title` string consumes the parent's template and passes none down, so
   * without this every page under it silently loses the brand suffix.
   */
  childTitleTemplate?: string;
};

export function pageMetadata({
  title,
  description,
  path,
  keywords,
  ogTitle,
  ogDescription,
  ogImage = DEFAULT_OG_IMAGE,
  noindex = false,
  childTitleTemplate,
}: PageSeo): Metadata {
  const socialTitle = ogTitle ?? `${title} | ${SITE_NAME}`;
  const socialDescription = ogDescription ?? description;

  return {
    title: childTitleTemplate
      ? { default: title, template: childTitleTemplate }
      : title,
    description,
    ...(keywords ? { keywords } : {}),
    alternates: { canonical: path },
    ...(noindex ? { robots: { index: false, follow: true } } : {}),
    openGraph: {
      type: 'website',
      siteName: SITE_NAME,
      locale: 'en_IN',
      title: socialTitle,
      description: socialDescription,
      url: path,
      images: [{ url: ogImage, width: 1200, height: 630, alt: SITE_NAME }],
    },
    twitter: {
      card: 'summary_large_image',
      title: socialTitle,
      description: socialDescription,
      images: [ogImage],
    },
  };
}
