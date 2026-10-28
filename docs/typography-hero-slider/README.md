# Typography refinement and editorial hero slider

Branch: `feat/typography-hero-slider`, based on merged `origin/main` at `24b67d8`. Changes are limited to shared typography, the homepage hero, their verification and documentation.

## Implementation

- Shared semantic typography tokens replace scattered font sizes: body/input/price 16px, controls 14px, secondary 13px, labels 12px, fluid product titles 22–28px, section headings 40–68px and hero headings 48–92px. Cormorant Garamond, Manrope, brand colours and ornaments are retained.
- Header/footer, collection cards, product previews, craftsmanship, reviews, campaign and newsletter all use the shared scale. Mobile labels no longer shrink below 12px. Responsive spacing accommodates the larger type; natural wrapping replaces forced single-line hero emphasis.
- `src/data/hero-slides.ts` provides a strongly typed slide interface and the three requested editorial stories, CTA targets, individual local images/alt text and captions.
- `src/components/home/hero-slider.tsx` handles 6.5-second autoplay, wraparound arrows, direct indicators, explicit pause, hover/focus pause, document visibility, and timer/listener cleanup. A hydration-safe `useSyncExternalStore` subscription applies motion preferences after a matching server/client render. No slider library or new dependency.
- Inactive slides use `inert` and `aria-hidden`; labeled buttons remain keyboard accessible, selection is indicated with `aria-current`, and manual selections use a polite announcement. Automatic changes do not create repeated live announcements.
- Text panels share a grid track sized by the tallest story, preventing height changes when the active story changes. The first hero image is preloaded; subsequent local images use lazy loading. No initial entrance animation, APIs, Server Actions or static-export changes.

## Executed verification

- `npm run lint`: passed with no warnings/errors.
- `npm run typecheck`: passed.
- `npm run build`: passed; generates `out/index.html` and static assets using the existing `output: "export"` configuration.
- Playwright Chromium: **20 passed in 17.4 seconds**, against the exported files.
- All three slides checked at **360, 390, 768, 1024, 1440 and 1920px**: stable hero height, text within bounds, controls within viewport and no horizontal overflow.
- Computed visible UI text: no font size below 12px at all six widths.
- Manual arrows, indicator selection, Enter/Space keyboard operation, focus retention and story CTA navigation: passed.
- Autoplay: 6.5-second interval, hover/focus pause, full-interval resume, explicit pause/resume and document visibility lifecycle: passed with Playwright's controlled clock.
- Reduced motion: no autoplay or crossfades, with manual controls still functional.
- Axe WCAG 2 A/AA and 2.1 AA: zero reported homepage violations at all six widths, plus an additional scan with the second slide and normal-motion controls active.
- No browser page errors in normal-motion manual navigation or reduced-motion responsive scans. No missing asset responses; all page images decoded successfully.
- Existing header/mobile navigation, focus containment, newsletter validation/reset, skip link and decorative reduced-motion checks: passed.
- Extra normal-motion check at 360px: no browser errors or horizontal overflow; complete control bar right edge 349px within the 360px viewport.
- Desktop/mobile screenshots inspected, including all three stories and the complete homepage.
- `git diff --check`: passed.

Local browser invocation uses the existing user-local Linux library cache:

```bash
LD_LIBRARY_PATH=/home/arun/.cache/raajsi-browser-libs/usr/lib/x86_64-linux-gnu npm run test:e2e
```

A first QA pass exposed a reduced-motion hydration mismatch from reading the browser preference on the first render. This was fixed, and the responsive suite now checks browser errors to prevent recurrence. The final 20-test run passed.

## Before and after

Existing Milestone 1 screenshots are retained as the baseline. New captures are kept separately so historical verification artifacts are not overwritten. Slide screenshots use reduced motion for deterministic capture.

| View                   | Before                             | After                                                   |
| ---------------------- | ---------------------------------- | ------------------------------------------------------- |
| Desktop first viewport | [Before](../homepage-1440-top.png) | [After](after-1440-top.png)                             |
| Mobile first viewport  | [Before](../homepage-390-top.png)  | [After](after-390-top.png)                              |
| Desktop full page      | [Before](../homepage-1440.png)     | [After](after-1440.png)                                 |
| Mobile full page       | [Before](../homepage-390.png)      | [After](after-390.png)                                  |
| Craftsmanship story    | —                                  | [Desktop](slide-2-1440.png) · [Mobile](slide-2-390.png) |
| Elegance story         | —                                  | [Desktop](slide-3-1440.png) · [Mobile](slide-3-390.png) |

## Files changed

- `src/styles/globals.css`: shared type roles, responsive typography/spacing, slider presentation.
- `src/app/page.tsx`: replaces the single hero with the client island; remains a Server Component.
- `src/components/home/hero-slider.tsx`: focused interactive carousel.
- `src/data/hero-slides.ts`: typed reusable local slide content.
- `tests/hero-slider.spec.ts`: ten slider, typography and responsive tests.
- `tests/home.spec.ts`: existing regression suite now checks browser errors and retains new screenshots separately.
- `.github/workflows/verify.yml`: includes refinement screenshots in existing CI artifacts.
- `README.md`, this report and accompanying screenshots.

## Limits

Chromium was exercised; Firefox, WebKit and real devices were not tested. Tab visibility is simulated deterministically through the document visibility event, not real operating-system tab throttling. Automated axe checks are not a full manual accessibility audit. Hero height stability was asserted, but no Lighthouse, field Core Web Vitals or network-throttled performance score is claimed. Existing illustrative product content and generated campaign imagery remain demonstrations. No deployment or automatic PR merge is performed.
