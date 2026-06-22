/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://engispider.com',
  // Static export lands in ./out, and this postbuild step runs after the export —
  // write the sitemap/robots straight into the deployed folder so they're fresh.
  outDir: 'out',
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  // Keep redirect stubs and the (noindex) search page out of the sitemap.
  exclude: ['/server-sitemap.xml', '/search', '/contacts', '/book-demo', '/inquery'],
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
    else if (['/about', '/services', '/solutions', '/contact'].includes(path)) {
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
    policies: [
      {
        userAgent: '*',
        allow: '/',
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
      },
      {
        userAgent: 'Bingbot',
        allow: '/',
      },
    ],
    additionalSitemaps: [],
  },
}
