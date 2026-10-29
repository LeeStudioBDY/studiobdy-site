# studiobdy.com

The company website of Studio BDY Ltd. A static site built with [Astro](https://astro.build), no client-side JavaScript, deployed to GitHub Pages by the workflow in `.github/workflows/deploy.yml` on every push to `main`.

## Editing

- Pages live in `src/pages/` — one `.astro` file per page, plain HTML inside the `<Base>` layout.
- The header, footer and page shell are in `src/components/` and `src/layouts/Base.astro`.
- Styles are one file, `src/styles/global.css`. Colours are custom properties at the top; dark mode is the `prefers-color-scheme` block.
- Images go in `public/images/`.

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # writes dist/
```

## Hosting

GitHub Pages serves the `dist/` folder the workflow uploads. The custom domain `studiobdy.com` is set in the repository's Pages settings; the DNS records that point it at GitHub are in [docs/HOVER-DNS.md](docs/HOVER-DNS.md). Email for the domain stays on Hover's mail service and is not touched by any of this.
