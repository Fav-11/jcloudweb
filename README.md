# J-Cloud — Official Website

Public-facing website for J-Cloud, personal cloud storage and remote file access
that lets users access and manage files stored on their own Windows computers
through a Flutter Android application.

Built with [Astro](https://astro.build) and the
[@astrojs/cloudflare](https://docs.astro.build/en/guides/deploy/cloudflare/)
adapter for deployment to Cloudflare Workers.

## Tech stack

- Astro (static/server output, Cloudflare adapter)
- JavaScript, HTML5, modern CSS (Tailwind via `@tailwindcss/vite`)
- [Lucide](https://lucide.dev) icons (`@lucide/astro`)
- Cloudflare Workers deployment via Wrangler

## Project structure

```
src/
  pages/            # Astro pages (route-based)
  layouts/          # MainLayout.astro, LegalLayout.astro
  components/       # Header, Footer, FeatureCard, PricingCard, FAQ,
                    # DownloadButton, ArchitectureDiagram
  config/           # site.js, downloads.js, legal.js
  styles/           # global.css (design tokens)
  worker/           # index.ts  (optional Worker API routes)
public/
  images/           # j-cloud-logo.png (project logo)
  icons/
  favicon.svg
  robots.txt
astro.config.mjs    # Astro + Cloudflare adapter config
wrangler.jsonc      # Wrangler / Cloudflare Workers config
package.json        # Scripts and dependencies
```

## Scripts

```sh
# Install dependencies
npm install

# Dev server (http://localhost:4321)
npm run dev

# Production build (outputs to dist/)
npm run build

# Preview the production build locally
npm run preview

# Type check
npm run check

# Build + deploy to Cloudflare Workers
npm run deploy:cloudflare
```

## Configuration you must complete before publication

### 1. GitHub Releases download integration (`src/config/downloads.js`)

The Windows Server installer must remain hosted on GitHub Releases. The website
never hosts a copy of the installer. Populate `src/config/downloads.js` with a
verified public GitHub repository and release asset:

```js
export const downloads = {
  verificationStatus: 'verified',
  repository: {
    owner: 'YOUR_GITHUB_OWNER',
    name: 'YOUR_GITHUB_REPO',
    url: 'https://github.com/YOUR_GITHUB_OWNER/YOUR_GITHUB_REPO',
    releasesUrl: 'https://github.com/YOUR_GITHUB_OWNER/YOUR_GITHUB_REPO/releases',
  },
  latestReleaseUrl: 'https://github.com/YOUR_GITHUB_OWNER/YOUR_GITHUB_REPO/releases/latest',
  directInstallerUrl: 'https://github.com/YOUR_GITHUB_OWNER/YOUR_GITHUB_REPO/releases/download/v1.0.0/J-Cloud-Setup.exe',
  installerFilename: 'J-Cloud-Setup.exe',
  displayVersion: '1.0.0',
  releaseDate: '2026-11-01',
  sha256: '...',
  checksumAssetUrl: 'https://github.com/.../J-Cloud-Setup.exe.sha256',
  supportedWindows: 'Windows 10 and Windows 11 (64-bit)',
  installerRequirements: [
    'A Windows computer on which J-Cloud will run',
    'Administrator permission when prompted by Windows',
    'An internet connection for installation, pairing, and remote access',
    'Sufficient local storage for the files you intend to access',
  ],
  releaseNotes: ['Initial release.'],
};
```

Until this is configured, the download button shows
"Installer awaiting verification" and no download link is active — this is
intentional and prevents distribution of an unverified installer.

### 2. Legal operator details (`src/config/legal.js`)

Complete the placeholder values in `src/config/legal.js` before publication:

- `operatorName` — legal operator name
- `cacRegistrationNumber` — CAC registration number (Nigerian)
- `registeredAddress` — registered/business address
- `supportEmail`, `privacyEmail`, `securityEmail`, `complaintsEmail`
- `effectiveDate` — publication date

The draft legal documents live in `src/pages/legal/` and require qualified
Nigerian legal review before production publication.

### 3. Site URL (`astro.config.mjs` / `src/config/site.js`)

Set `siteUrl` to your production domain (currently
`https://j-cloud.example`, a placeholder). This is used for canonical URLs,
sitemap, and Open Graph tags.

## Cloudflare Workers deployment

The project is configured for Cloudflare Workers via
`@astrojs/cloudflare` and `wrangler.jsonc`.

### Wrangler configuration (`wrangler.jsonc`)

```jsonc
{
  "$schema": "node_modules/wrangler/config-schema.json",
  "name": "j-cloud-website",
  "compatibility_date": "2026-09-29",
  "assets": {
    "binding": "ASSETS",
    "not_found_handling": "single-page-application",
    "run_worker_first": true
  },
  "observability": { "enabled": true }
}
```

### Deploy

```sh
# Build and deploy to Cloudflare Workers
npm run deploy:cloudflare
```

This runs `astro build` then `wrangler deploy`. You must be logged into
Wrangler (`wrangler login`) before deploying.

### Environments

`wrangler.jsonc` above is the default (production) environment. To add a
preview environment, create `wrangler.prod.jsonc` / `wrangler.dev.jsonc` or
use environment-specific wrangler config files and pass `--env` to
`wrangler deploy`.

### Environment variables

No build-time secrets are required for the static site. If you add Worker API
routes in `src/worker/index.ts` that need secrets, set them with:

```sh
wrangler secret put <NAME>
```

### Custom domain

1. Deploy the site to Cloudflare Workers first.
2. In the Cloudflare dashboard, go to Workers → Domains and add your custom
   domain, or add a CNAME/A record pointing at your Workers route.
3. Update `siteUrl` in `src/config/site.js` and rebuild/redeploy so canonical
   URLs and sitemap use the custom domain.

### GitHub repository integration

Keep this website repository separate from the J-Cloud Flutter app, Python
laptop server, and online FastAPI backend repositories unless an existing
repository has been specifically designated for the website.

To connect GitHub for automated deploys, configure a GitHub Action that:
1. Installs Node.js (>=22.23.4)
2. Runs `npm install`
3. Runs `npm run build`
4. Runs `wrangler deploy` using a Cloudflare API token

### Deployment notes

- `output: 'server'` is used so the site works on Cloudflare Workers.
- `not_found_handling: "single-page-application"` serves the 404 page for
  unknown routes.
- Public assets (`public/`) are copied to the build output and served at root.
- Do not modify the Flutter app, Python laptop server, online FastAPI backend,
  or relay implementation — this website is informational only.

## Accessibility

- Skip-to-content link
- Semantic landmarks (`<header>`, `<nav>`, `<main>`, `<footer>`)
- Focus-visible indicators
- Reduced-motion support (`prefers-reduced-motion` disables animations)
