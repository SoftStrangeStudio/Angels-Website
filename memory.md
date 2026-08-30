# Website Memory

## Purpose

Soft Strange Studio is a public Next.js site for honest notes, selected work, future shop paths, and studio context.

## Architecture

- Next.js App Router source lives in `app/`.
- `app/editorial-page.jsx` owns the reusable page view layer: hero, section, image-led card, paper note, and next-room views.
- Route files provide content and image roles; they do not define separate visual systems.
- `app/site-chrome.jsx` owns the shared sage header, active navigation, and compact footer.
- Only `app/globals.css` and `app/home-gemini-reference-pass.css` are active. Legacy pass files remain as history but are not loaded.
- `app/notes/NotesPageClient.jsx` and `app/notes/post/PostReaderClient.jsx` keep the live Blog feed and note-reading behavior.
- Static GitHub Pages output is produced by `npm run build` into `out/` and copied to `dist/`.

## Design Convention

- The whole site follows the approved Gemini reference: sage torn-paper header, centered script wordmark, warm cream paper, clear serif hierarchy, taped editorial images, and soft physical shadows.
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
