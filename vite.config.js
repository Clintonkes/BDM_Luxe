import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'node:url';
import { site, routes } from './src/config/site.js';

/**
 * Canonical origin for SEO files and meta tags. The deploy workflow sets
 * SITE_URL to the custom domain once one is configured; otherwise the
 * GitHub Pages project URL is used.
 */
const SITE_URL = (process.env.SITE_URL || site.deploy.githubUrl).replace(/\/+$/, '');

/** Emits sitemap.xml and robots.txt from the route list in src/config/site.js. */
function seoFiles() {
  return {
    name: 'bdm-seo-files',
    apply: 'build',
    generateBundle() {
      const today = new Date().toISOString().slice(0, 10);
      const urls = routes
        .map((path) => {
          const priority = path === '/' ? '1.0' : path.split('/').length > 2 ? '0.6' : '0.8';
          return `  <url><loc>${SITE_URL}${path === '/' ? '/' : path}</loc><lastmod>${today}</lastmod><priority>${priority}</priority></url>`;
        })
        .join('\n');
      this.emitFile({
        type: 'asset',
        fileName: 'sitemap.xml',
        source: `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
      });
      this.emitFile({
        type: 'asset',
        fileName: 'robots.txt',
        source: `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n`,
      });
    },
  };
}

/**
 * The build uses relative URLs (base './') so one artifact runs both at a
 * domain root and under /BDM_Luxe/ on github.io. Relative URLs alone break
 * when a host serves index.html directly at a nested path, so this rewrites
 * index.html's asset tags to be resolved at runtime from the same base the
 * router detects (src/lib/paths.js). Parser-inserted via document.write so
 * the stylesheet stays render-blocking (no flash of unstyled content).
 */
function runtimeBase() {
  const repo = site.deploy.repoBase.toLowerCase();
  return {
    name: 'bdm-runtime-base',
    apply: 'build',
    transformIndexHtml: {
      order: 'post',
      handler(html) {
        const writes = [];
        const out = html.replace(/<(script|link)\b[^>]*?(?:src|href)="\.\/([^"]+)"[^>]*>(?:<\/script>)?\s*/g, (tag) => {
          const [pre, post] = tag.trim().split(/(?<==")\.\//);
          // JSON-encode each half; escape "</" so </script> cannot end the inline script.
          const js = (str) => JSON.stringify(str).replace(/<\//g, '<\\/');
          writes.push(`document.write(${js(pre)}+B+${js(post)});`);
          return '';
        });
        if (!writes.length) return html;
        const loader =
          `<script>(function(){var s=location.pathname.split('/')[1]||'';` +
          `var B=s.toLowerCase()===${JSON.stringify(repo)}?'/'+s+'/':'/';${writes.join('')}})();</script>\n`;
        return out.replace('</head>', `${loader}  </head>`);
      },
    },
  };
}

export default defineConfig({
  // Relative asset paths: the same build works at the domain root and under
  // /BDM_Luxe/ on github.io. public/404.html always lands visitors on the
  // base index.html, so relative URLs resolve correctly on deep links.
  base: './',
  plugins: [react(), seoFiles(), runtimeBase()],
  define: {
    'import.meta.env.VITE_SITE_URL': JSON.stringify(SITE_URL),
  },
  resolve: {
    alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) },
  },
});
