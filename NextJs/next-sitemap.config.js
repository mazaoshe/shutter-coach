module.exports = {
  siteUrl: 'https://your-site-url.com',
  generateRobotsTxt: true,
  sitemapSize: 5000,
  exclude: ['/404'],
  changefreq: 'daily',
  priority: 0.7,
  apiKey: process.env.SITEMAP_API_KEY,
  transform: async (config, path) => {
    return {
      loc: path,
      changefreq: config.changefreq,
      priority: config.priority,
      lastmod: new Date().toISOString(),
    };
  },
};