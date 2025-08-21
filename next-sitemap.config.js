// qr-generator/next-sitemap.config.js
/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://qr-generator-bice-nu.vercel.app', // ← 公開URLに変更
  generateRobotsTxt: true, // robots.txt も自動生成
  sitemapSize: 7000,       // デフォルトでOK
};
