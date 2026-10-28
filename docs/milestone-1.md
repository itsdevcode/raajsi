# Milestone 1 verification

Milestone: design system, shared layout and homepage. Branch: `feat/design-system`.

## Delivered

Next.js 16.4.3 / React 19.3.1 / Tailwind CSS 4.3.3 with strict TypeScript and static export. Shared brand tokens, self-hosted fonts, floral and architectural SVG components, sticky header, collection mega menu, mobile modal navigation, footer and full editorial homepage. Local WebP imagery, reduced-motion-aware animation, truthful demo labels and validated demo newsletter form.

## Actual final checks

| Check                                     | Result                                                                                                                               |
| ----------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| `npm run lint`                            | Passed; no errors or warnings                                                                                                        |
| `npm run typecheck`                       | Passed                                                                                                                               |
| `npm run build`                           | Passed; generated `out/index.html` and static assets                                                                                 |
| Playwright Chromium                       | 10 passed in 10.6 seconds against the exported files                                                                                 |
| Responsive viewports                      | 360, 390, 768, 1024, 1440, 1920 pixels passed overflow, image decoding, anchor target, font and heading bounds checks                |
| Axe WCAG 2 A/AA + 2.1 AA                  | Zero reported violations in the homepage scan at each of the six widths                                                              |
| Navigation                                | Desktop menu selection, Escape/focus return, mobile focus containment, Escape, section navigation and body scroll restoration passed |
| Newsletter                                | Invalid email rejected; valid email produces a truthful demo confirmation; reset passed                                              |
| Reduced motion and keyboard               | Decorative CSS animations disabled; skip link keyboard navigation passed                                                             |
| Browser errors / missing assets           | No page errors in the desktop interaction test; no HTTP errors in responsive asset checks                                            |
| `npm audit --omit=dev --audit-level=high` | Zero vulnerabilities                                                                                                                 |
| `git diff --check`                        | Passed                                                                                                                               |
| Visual review                             | Desktop 1440px and mobile 390px screenshots inspected; corrected font fallback and hero clipping                                     |

The first browser attempt was blocked by missing Linux libraries. System installation required unavailable sudo access. Browser execution was enabled by downloading the distribution's `libnspr4`, `libnss3`, and `libasound2t64` packages and extracting them outside the repository into a user-local cache. The passing local test command was:

```bash
LD_LIBRARY_PATH=/home/arun/.cache/raajsi-browser-libs/usr/lib/x86_64-linux-gnu npm run test:e2e
```

This is a host-specific prerequisite, not an application dependency. CI uses `npx playwright install --with-deps chromium` on the GitHub-hosted runner. The workflow is added but remote CI results must be checked on the PR; local success does not imply CI success.

## Screenshots

- [Desktop first viewport](homepage-1440-top.png)
- [Mobile first viewport](homepage-390-top.png)
- [Desktop full page](homepage-1440.png)
- [Mobile full page](homepage-390.png)

## Changed files

- Foundation: `package.json`, `package-lock.json`, `tsconfig.json`, `next-env.d.ts`, `next.config.ts`, `postcss.config.mjs`, `eslint.config.mjs`, `.gitignore`.
- App: `src/app/layout.tsx`, `src/app/page.tsx`, `src/app/icon.svg`.
- Shared components: `src/components/layout/header.tsx`, `footer.tsx`, `src/components/patterns/ornaments.tsx`, `src/components/ui/reveal.tsx`.
- Homepage: `src/components/home/newsletter.tsx`, `src/data/home.ts`, `src/styles/globals.css`.
- Imagery: eight local WebP assets in `public/images/`, retained original in `design/campaign-original.png`, asset derivative script in `scripts/prepare-campaign.mjs`.
- Verification: `playwright.config.ts`, `tests/home.spec.ts`, `scripts/serve-static.mjs`, `.github/workflows/verify.yml`.
- Documentation: `README.md`, `docs/assets.md`, this report and four screenshot files.

## Known limits and next milestone

No known failing Milestone 1 checks remain. Chromium was tested; Firefox, WebKit and real-device checks have not been run. Automated axe checks are not a full manual accessibility audit. Core Web Vitals/Lighthouse targets have not been measured. No deployment was requested or performed.

The complete five-page storefront is not finished: catalog/listing/detail pages, wishlist, cart and checkout belong to Milestones 2–4. Newsletter is a local demo and does not subscribe anyone. Product previews/prices and testimonials are illustrative; generated campaign derivatives must be replaced with actual product photos before live selling.

Recommended next: Milestone 2, the typed mock catalog, replaceable data access, reusable product cards, filtering/sorting and statically generated product details. Do not merge the foundation PR without the user's explicit approval.
