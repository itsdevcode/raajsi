# RAAJSI — The Art of Indian Elegance

An Indian heritage inspired storefront built with Next.js 16 App Router, React 19, strict TypeScript and Tailwind CSS 4. The first milestone establishes the design system, shared layout and complete editorial homepage. Commerce features follow in separate milestones.

## Run locally

Requires Node.js 20.9 or newer and npm. The lockfile records exact dependency versions.

```bash
npm ci
npm run dev
```

## Verify the static export

```bash
npm run lint
npm run typecheck
npm run build
npx playwright install chromium
npm run test:e2e
```

Playwright starts the included static server and tests `out/`, so build before running tests. Linux machines may require `npx playwright install --with-deps chromium`. View the generated report using `npx playwright show-report`. `npm run preview` manually serves the exported app on http://127.0.0.1:4173. This server is a development utility, not a production hosting service.

Deploy the contents of `out/` to a static host. The configuration uses `output: "export"`, `trailingSlash: true`, and unoptimized Next Image. There are no runtime APIs, Server Actions, authentication, payment services or server dependencies.

## Milestone 1

- Reusable palette, typography, spacing, interaction and responsive styles.
- Local Cormorant Garamond and variable Manrope fonts, served by `next/font/local`.
- Original SVG lotus, rangoli and architectural line artwork.
- Sticky translucent-to-solid header, keyboard-accessible desktop collection menu, native modal mobile navigation, footer and skip link.
- Editorial hero, asymmetric collection previews, heritage story, illustrative bestseller previews, craft showcase, festive campaign, fictional reviews clearly labeled as demo content, and email-validated demo newsletter UI.
- Local WebP imagery, below-fold lazy loading, known aspect ratios, hero preload, modest Motion reveals and reduced-motion support.
- Playwright checks for navigation, dialog focus, newsletter validation, images, broken anchors, overflow, reduced motion and axe accessibility at 360, 390, 768, 1024, 1440 and 1920 pixels.

All current navigation leads to implemented homepage sections. There are no links to unimplemented catalog/cart/checkout routes. Product previews are deliberately editorial and do not offer shopping interactions. Newsletter submission is in memory only: it stores and sends nothing.

## Structure

```text
src/app/                 Server-rendered App Router layout and homepage
src/components/layout/   Shared header and footer
src/components/home/     Homepage interactions
src/components/patterns/ Reusable cultural SVG ornament
src/components/ui/       Small shared animation wrapper
src/data/                Typed-by-inference editorial preview data
src/styles/              Tailwind theme and shared component styles
public/images/           Local browser-ready WebP images
design/                  Retained generated campaign source
tests/                   Static-export Playwright checks
scripts/                 Static preview server and asset preparation
```

Server Components are the default; only navigation, newsletter state and Motion reveal wrappers are client components. Styling uses a single palette and common component classes so future pages can reuse the visual system. See [asset provenance](docs/assets.md) for the image-generation prompt, sources and font licensing.

## Typography and hero refinement

The homepage retains its original split composition and now cycles through three editorial stories. A focused client component receives typed local slide data while the page remains a Server Component. No carousel dependency or backend is added.

The slider advances every 6.5 seconds, with previous/next controls, direct indicators and an explicit pause button. Hover, keyboard focus and document visibility suspend rotation; resuming starts a fresh interval. Reduced-motion preference disables autoplay and crossfades. Manual controls announce the selected story, while inactive slides are hidden from assistive technology and keyboard navigation. Motion preference uses a hydration-safe browser subscription.

Typography uses shared role tokens: 16px body/input/price text, 14px navigation and buttons, 13px secondary text, 12px labels, fluid 22–28px product titles, 40–68px section headings and 48–92px hero headings. Breakpoint-specific tiny fonts have been removed. Text wraps naturally, with adjusted header spacing, mobile announcement wrapping and reserved hero height.

See [refinement verification and before/after screenshots](docs/typography-hero-slider/README.md). The extended suite includes autoplay, pause conditions, keyboard controls, reduced motion, font minimums and all-slide layout stability.

## Next milestones

1. **Design system and homepage** — current PR.
2. **Catalog** — 16–24 typed mock products; replaceable data-access functions; listing, filters, sorting, reusable cards and generated product detail routes.
3. **Wishlist and cart** — Zustand, quantity management and hydration-safe browser persistence.
4. **Demo checkout** — React Hook Form/Zod validation, Indian addresses and mock confirmation without payment credentials.
5. **Final polish** — cross-page responsive and interaction checks, accessibility, performance measurement and optimization.

Dependencies are added when their feature needs them. Radix/shadcn components will be introduced only where useful; native dialog semantics are sufficient for the current menu. Zustand and checkout libraries are reserved for their milestones.

## Git workflow

Keep `main` stable. Implement reviewable milestones on feature branches, use Conventional Commits, run lint/typecheck/tests/build, and open PRs against `main`. Never merge without explicit approval. Later milestones can proceed once their dependencies have been integrated; do not duplicate pending foundational changes in unrelated PRs.

## Limits

This is a demonstration, not a live merchant. Products, prices and testimonials are illustrative. Generated campaign crops are visual previews, not faithful inventory photography. The remaining four page types and all commerce behavior are scheduled for subsequent milestones. Automated axe checks do not replace a manual accessibility audit. Local checks do not establish field Core Web Vitals or a Lighthouse score.
