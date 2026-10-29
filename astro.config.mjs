import { defineConfig } from 'astro/config';

// Static site served by GitHub Pages at the apex domain. `site` makes
// canonical and Open Graph URLs absolute; nothing else is needed for Pages.
export default defineConfig({
  site: 'https://studiobdy.com',
  trailingSlash: 'ignore',
});
