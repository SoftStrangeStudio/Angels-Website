# Website Memory

## Purpose

Soft Strange Studio is a public Next.js site for honest notes, selected work, future shop paths, and studio context.

## Architecture

- Next.js App Router source lives in `app/`.
- `app/editorial-page.jsx` owns the reusable page view layer: hero, section, image-led card, paper note, and next-room views.
- Route files provide content and image roles; they do not define separate visual systems.
- `app/site-chrome.jsx` owns the shared sage header, active navigation, and compact footer.
- Global visual CSS lives in `app/globals.css` and `app/home-gemini-reference-pass.css`; the homepage background also uses `app/paper-scroll-experience.module.css`. Legacy pass files remain unloaded history.
- `app/notes/NotesPageClient.jsx` and `app/notes/post/PostReaderClient.jsx` keep the live Blog feed and note-reading behavior.
- Static GitHub Pages output is produced by `npm run build` into `out/` and copied to `dist/`.

## Design Convention

- The top banner uses `public/atmosphere/header-torn-paper.svg`: irregular tears, fine grain, edge fibers, and a soft drop shadow. Its paper layer stays separate from navigation so the mobile foldout is not clipped. Avoid a repeating zigzag edge.

- Page backgrounds use light dot-grid notebook paper instead of tan fiber texture. The homepage shader uses 20px dots in CSS coordinates and scrolls them with the paper; secondary pages use the matching CSS grid and the shader fallback uses SVG dots.

- Main reading text and headings use Arial with comfortable line spacing and no compressed letter spacing. The wordmark uses custom SVG pen paths; locally bundled Kalam provides loose handwriting for brief flavor text. Welcome copy is short, gentle, and inviting rather than a large manifesto.

- The shared footer is a fixed sage torn-paper banner matching the header. A 12px paper edge peeks above the viewport bottom until reaching the document end, when the footer slides up. Its dock reserves exactly the measured footer height; tucked links are inert and reduced motion removes the slide.

- The header wordmark uses custom single-line SVG lettering, with strokes drawing in sequence on arrival. Reduced motion shows the full lettering immediately; the home link retains an accessible text label.

- Navigation uses a full banner above 720px and a native Menu foldout on mobile, with readable 48px links, active-route cues, and Escape or selection to close.

- Homepage scroll length comes from real content, a viewport-sized minimum home layout, and the shared footer. The fixed paper shader follows native scroll in both directions; spacer growth and scroll rebasing are removed.
- Homepage cards use smaller images, four desktop columns and two mobile columns (one below 360px), gentle reveals and hover lifts. Reduced motion keeps the paper stationary and removes transitions.

- The whole site follows the approved Gemini reference: sage torn-paper header, relaxed handwritten wordmark, light dot-grid notebook paper, clear Arial reading text with handwritten accents, taped editorial images, and soft physical shadows.
- Secondary pages use one portrait editorial column with vertically stacked cards.
- Generated watercolor assets live in `public/images/editorial/` and map consistently to Notes, Art, Shop, and About.
- Visible copy stays human-facing. Internal feed contracts, readiness machinery, and source implementation details stay offstage.
- Store content must remain honest about availability; do not invent inventory or buying links.
- Blog compatibility routes remain available but render the same Notes and reader views.

## Validation

- Run `npm run build` for the production static export.
- Run `node scripts/audit-website.mjs --base=http://localhost:<port>/Angels-Website/ --routes=/,/about/,/notes/,/portfolio/,/store/,/blog/ --out=logs/<run-name> --no-trace` for desktop and mobile proof.
- Open at least one `/notes/post/?slug=<published-slug>` route during reader validation.
- Keep `design-qa.md` current when a visual reference drives implementation.
