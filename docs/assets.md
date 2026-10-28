# Asset provenance

All browser assets are committed under `public/images/`. Runtime requests to external image services are not needed.

## Generated campaign

`design/campaign-original.png` was created for this project with the built-in imagegen tool. It depicts fictional styled products, not actual inventory or an actual brand workshop. The homepage identifies product previews and pricing as illustrative. Production commerce will require actual product photography.

Derivatives: `campaign.webp`, `campaign-wide.webp`, `urli.webp`, `vase.webp`, `textile.webp`, `diya.webp`. Run `node scripts/prepare-campaign.mjs` to recreate these resized/cropped WebP files. The original is retained outside the public directory and is not included in the static export.

Generation prompt:

> Use case: product-mockup. Asset type: wide editorial campaign photograph for RAAJSI, a luxury Indian heritage homeware demonstration website. Create an exquisite photorealistic still life in a sunlit Rajasthani palace alcove. Main subject: a large elegant antique brass urli bowl with floating ivory flowers, small aged brass oil lamps (no deity figures), maroon hand-block-printed textile draped over a sandstone plinth, small hammered copper vase with delicate branches. Warm lime-plaster walls, a softly shadowed scalloped arch behind, afternoon slanting sunlight, richly tactile aged brass and natural linen. Balanced refined composition: objects centered and to right, enough visual breathing room, architectural depth. Cinematic luxury magazine photograph, warm muted ochre ivory and maroon palette, realistic scale, exceptionally tasteful, no text, no watermark, no people. Landscape 1536x1024. This is an original concept photo, no logos.

## Photography

Locally saved and converted to WebP from Unsplash standard photo CDN assets. The [Unsplash license](https://unsplash.com/license) allows download, modification and commercial/noncommercial use; assets are used as editorial context, not sold as standalone images.

| Local file      | Source                                                       | Use                                                    |
| --------------- | ------------------------------------------------------------ | ------------------------------------------------------ |
| `palace.webp`   | https://images.unsplash.com/photo-1599661046289-e31897846e41 | Amer Fort, Jaipur; heritage story                      |
| `interior.webp` | https://images.unsplash.com/photo-1600210492486-724fe5c67fb0 | Representative living room; heritage living collection |

## Fonts and vectors

Cormorant Garamond and Manrope come from Fontsource npm packages and use the SIL Open Font License. Their package license files are retained in their dependencies. `next/font/local` serves only Latin WOFF2 assets with swap and preload. No Google Fonts request is needed to build or use the app.

Lotus, rangoli, palace skyline and favicon are original project SVG code. Utility icons are Lucide React (ISC license). Cultural ornament is architectural/floral, with no deity images used as UI decoration.
