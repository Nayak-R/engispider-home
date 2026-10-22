/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://engispider.com',
  // Static export lands in ./out, and this postbuild step runs after the export —
  // write the sitemap/robots straight into the deployed folder so they're fresh.
  outDir: 'out',
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  /*
   * Keep out of the sitemap: redirect stubs, the noindex search page, and
   * the llms.txt family.
   *
   * The llms files are plain-text resources, not pages — and next-sitemap
   * appends the configured trailing slash, so they were being listed as
   * `/llms.txt/`, which does not exist and would hand every crawler a 404.
   * They are discoverable from /robots.txt and a <link rel="alternate">
   * in the document head instead.
   */
  exclude: [
    '/server-sitemap.xml',
    '/search',
    '/contacts',
    '/inquery',
    '/llms.txt',
    '/llms-full.txt',
    '/solutions/*/llms.txt',
  ],
  changefreq: 'weekly',
  priority: 0.7,
  sitemapSize: 5000,
  transform: async (config, path) => {
    // Custom priority based on page importance
    let priority = 0.7;
    let changefreq = 'weekly';

    // Homepage - highest priority
    if (path === '/') {
      priority = 1.0;
      changefreq = 'daily';
    }
    // Main navigation pages
    else if (['/about', '/services', '/solutions', '/contact', '/customers'].includes(path)) {
      priority = 0.9;
      changefreq = 'weekly';
    }
    // Solution detail pages
    else if (path.startsWith('/solutions/')) {
      priority = 0.8;
      changefreq = 'weekly';
    }

    return {
      loc: path,
      changefreq,
      priority,
      lastmod: new Date().toISOString(),
    };
  },
  robotsTxtOptions: {
    /*
     * AI crawlers are named explicitly.
     *
     * `User-agent: *` already permits them, so this changes nothing
     * technically — but a crawler operator auditing access, and anyone
     * reading this file to see whether the site welcomes AI indexing,
     * both get an unambiguous answer instead of an inference. Several
     * of these agents are also commonly blocked by default in hosting
     * panel rulesets, and an explicit Allow is what gets overridden
     * first when that happens.
     *
     * Two are deliberately NOT listed: CCBot (Common Crawl, which
     * redistributes scraped content wholesale) and Bytespider, which
     * has a record of ignoring robots.txt. Omitting them leaves them
     * on the wildcard rather than endorsing them.
     */
    policies: [
      { userAgent: '*', allow: '/' },

      // Search
      { userAgent: 'Googlebot', allow: '/' },
      { userAgent: 'Bingbot', allow: '/' },

      // AI answer engines and training crawlers
      { userAgent: 'GPTBot', allow: '/' },              // OpenAI — training
      { userAgent: 'OAI-SearchBot', allow: '/' },       // OpenAI — ChatGPT search
      { userAgent: 'ChatGPT-User', allow: '/' },        // OpenAI — user-initiated fetch
      { userAgent: 'ClaudeBot', allow: '/' },           // Anthropic — training
      { userAgent: 'Claude-User', allow: '/' },         // Anthropic — user-initiated fetch
      { userAgent: 'Claude-SearchBot', allow: '/' },    // Anthropic — search index
      { userAgent: 'PerplexityBot', allow: '/' },       // Perplexity — index
      { userAgent: 'Perplexity-User', allow: '/' },     // Perplexity — user-initiated fetch
      { userAgent: 'Google-Extended', allow: '/' },     // Gemini / Vertex grounding
      { userAgent: 'Applebot', allow: '/' },            // Siri / Spotlight
      { userAgent: 'Applebot-Extended', allow: '/' },   // Apple Intelligence
      { userAgent: 'Amazonbot', allow: '/' },           // Alexa
      { userAgent: 'meta-externalagent', allow: '/' },  // Meta AI
      { userAgent: 'cohere-ai', allow: '/' },
      { userAgent: 'YouBot', allow: '/' },
      { userAgent: 'DuckAssistBot', allow: '/' },
      { userAgent: 'MistralAI-User', allow: '/' },
    ],
    additionalSitemaps: [],
  },
}
