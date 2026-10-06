# Change Log

This log uses local project time in `America/New_York`.

## 2026-10-05 — Matching footer with paper-edge peek

- Made the footer a fixed full-width sage banner using the header's paper asset flipped vertically, white pen wordmark, and handwritten tagline.
- Kept a 12px torn edge visible before the page end; the full footer slides up at the document bottom and tucks back down on upward scrolling.
- The dock reserves exactly the measured footer height so final content remains reachable. Tucked footer links remain inert; reduced motion disables the slide.
- Reviewed mobile peek/open, desktop open, and About at the bottom. Desktop footer and dock both measured 165px, bottom gap was 0px, and no horizontal overflow was observed. Build, lint/type checks, export, and diff whitespace checks passed.
- Screenshots: `logs/footer-peek-review/`.

## 2026-10-05 — Design DNA reference

- Added `.agent/design-dna.md` as a concise home for durable visual principles and conversation-confirmed direction.
- Added `.agent/images/` for incoming design reference images and linked-reference notes.
- Added 11 photos as design references and documented the captions and provided craft-pattern credits in the Design DNA. Converted the birch-tree HEIC to JPEG for easier preview.
- Captured the existing project baseline from `.agent/project/intent.md`, `.agent/project/current-state.md`, and `design-qa.md`. No public site files changed.

## 2026-10-05 — Ripped-paper banner

- Replaced the repeating cream zigzag and flat banner background with a textured sage SVG paper layer, irregular tears, fine edge fibers, and a soft drop shadow.
- Kept a minimum texture width on mobile to avoid compressing the tear into tiny teeth. The separate paper layer preserves unclipped mobile foldouts and the existing pen animation.
- Reviewed mobile and desktop, opened and closed Menu, and checked desktop overflow (none). Build with lint/type checks and static export passed; diff whitespace checks passed.
- Screenshots: `logs/torn-banner-review/`.

## 2026-10-05 — Pen-drawn wordmark animation

- Replaced the generic font wordmark with custom single-line SVG pen paths and subtle differences in stroke width and baseline.
- Animated normalized stroke dash offsets in writing order over roughly 2.6 seconds on arrival. Undrawn paths remain invisible until their turn.
- Kept the home link's accessible name and immediate finished lettering for reduced motion.
- Reviewed mobile and desktop, checked 320px for overlap/overflow (none), verified changing stroke offsets and reduced-motion animation suppression. Build, lint/type validation, static export, and diff whitespace checks passed.
- Screenshots: `logs/pen-wordmark-review/`.

## 2026-10-05 — Dot-ruled notebook background

- Replaced tan procedural fibers with light dot-grid paper and 20px ruling in CSS coordinates; kept torn edges and native scroll movement.
- Added matching CSS dots on page backgrounds and an SVG dot-grid shader fallback. Versioned shader asset URLs for preview refresh.
- Reviewed Home mobile and desktop; shader loaded, scroll offset changed, and no horizontal overflow was observed. Build with lint/type checks and static export passed; diff whitespace checks passed.
- Screenshots: `logs/dot-grid-review/`.

## 2026-10-05 — Complete the three typography changes

- Bundled Kalam with its license for loose handwriting on flavor text, ornaments, editorial labels, and footer tagline; Patrick Hand remains the wordmark font.
- Kept main text in Arial and reduced homepage card-heading weight.
- Trimmed the welcome to “Make yourself at home.” and “A little art, a few notes, and small comforts.”
- Verified the current user preview, loaded fonts, and no horizontal overflow. Production build, lint/type checks, static export, and diff whitespace checks passed.
- Screenshot: `logs/three-changes-review/current.png`.

## 2026-10-05 — Clear reading type and gentler welcome

- Set shared reading text and headings to Arial, with comfortable line spacing and smaller, uncompressed editorial hero headings.
- Added a brief Patrick Hand flavor line and handwritten ornaments; kept the main welcome in clear reading type.
- Shortened the homepage heading, intro, and card descriptions to a welcoming invitation. Corrected the home heading to h1.
- Reviewed desktop and 390px Home plus mobile About; confirmed the font split and no observed overflow. Build with lint/type validation and static export passed.
- Screenshots: `logs/welcome-review/`.

## 2026-10-05 — Bottom-only footer reveal

- Removed the shared footer bottom margin and added a clipped footer dock that slides up only at the document bottom, then hides when scrolling up.
- Hidden footer links are inert; reduced motion removes the transition. Contact anchors target the dock.
- The homepage has a one-viewport minimum layout so the footer stays below the initial view; no growing runway is added. The paper shader still follows native scroll.
- Reviewed Home desktop and About mobile: footer hidden at top, visible at bottom, no gap underneath. Build with lint/type validation and static export passed.
- Evidence: `logs/footer-review/home-bottom.png` and `about-bottom.png`.

## 2026-10-05 — Handwritten studio wordmark

- Replaced ornate system cursive with locally bundled Patrick Hand in the shared header; retained the font's SIL Open Font License.
- Adjusted letter spacing for simpler, readable hand lettering; preserved responsive navigation.
- Verified loaded font, no 320px overflow or menu overlap, and desktop rendering. Production build and lint/type checks passed.
- Screenshot: `logs/wordmark-review/desktop.png`.

## 2026-10-05 21:52 ET — Responsive studio navigation

- Added a native mobile Menu foldout at 720px and below with six readable links, visible focus, and Escape or selection to close.
- Preserved the full navigation banner on desktop and widescreen; reduced mobile header height to keep content visible.
- Reviewed Home and About, 320px and 390px mobile, and 1440px and 1920px banner layouts. No horizontal overflow or brand/menu overlap was observed.
- `npm run build` passed with lint/type checks and static export; screenshots live in `logs/navigation-review/`.


## 2026-10-05 16:32 ET — Finite homepage scroll and compact studio doors

- Removed the 100vh transition, 600vh runway, automatic runway growth, and scroll rebasing.
- Bound the existing torn-paper shader to native document scroll in both directions, retaining reduced-motion support.
- Enabled the shared homepage footer and removed duplicate in-page copyright.
- Reduced homepage image size; show four cards in a desktop row and two columns at mobile widths, with calm reveals and hover/focus motion.
- Reviewed screenshots in the in-app browser, refined footer alignment and image sizing, and verified stable page height, no horizontal overflow, the About footer, and reduced-motion behavior.
- Validation evidence: `logs/home-scroll-review/` screenshots; production build verification recorded in `design-qa.md`.

## 2026-08-30 18:34 EDT — Pages path repair and vertical paper runway

### Changed

- Migrated the production base path, navigation, and active asset URLs from `/Website/` to `/Angels-Website/`.
- Added a homepage-only, scroll-driven vertical torn-paper shader with one viewport of transition space and an expandable native-scroll runway.
- Extended `<shader-canvas>` with cached external uniforms and manual rendering while preserving its existing default behavior.
- Kept the shared header, secondary routes, Notes data flow, card dimensions, and deploy workflow unchanged.
- Migrated the separate audit and visual-tour workflow targets after their live runs proved they still requested `/Website/`.

### Related items

- PAGE-001
- COMP-010
- INT-012
- METRIC-033
- LESSON-041
- FEEDBACK-026

## 2026-07-09 18:54 EDT — Whole-site editorial reference overhaul

### Changed

- Replaced route-specific collage markup with shared editorial page views.
- Reduced the active CSS runtime to two stylesheets.
- Extended the approved Gemini homepage header, typography, paper depth, and stacked-card language to every public route.
- Added four generated watercolor image assets for Notes, Art, Shop, and About.
- Preserved the live Notes feed and both post-reader compatibility paths.
- Added passing desktop/mobile design QA and browser proof.

### Related items

- PAGE-001 through PAGE-005
- COMP-001
- COMP-004
- DESIGN-002
- DESIGN-003

## 2026-06-29 07:05 ET — Homepage front door reset

### Changed

- Updated `app/page.jsx` so the homepage starts with a clear `home-front-door` hero board.
- Added `app/home-front-door-reset-pass.css` for a readable first screen, stronger route links, a calmer reading path map, and reduced early-page spacing.
- Imported the new homepage reset stylesheet last in `app/layout.jsx`.

### Why

The homepage first screen had become too small, washed out, clipped, and process-like. The reset restores the page as a public studio front door with visible title, orientation copy, and clear room choices.

### Related items

- LESSON-029
- LESSON-030
- LESSON-033
- LESSON-034
- PAGE-001

## 2026-06-29 06:50 ET — Shared route chapter notebook pass

See `.agent/changes/2026-06-29-shared-route-chapter-notebook.md` and `.agent/matrices/shared-route-chapter-notebook.matrix.md`.

## 2026-06-29 06:40 ET — Shared site shell room spine

See `.agent/changes/2026-06-29-shared-site-shell-room-spine.md` and `.agent/matrices/shared-site-shell-room-spine.matrix.md`.

## 2026-06-29 06:31 ET — Homepage room spine continuity pass

See `.agent/changes/2026-06-29-home-room-spine-continuity.md` and `.agent/matrices/home-room-spine-continuity.matrix.md`.

## 2026-06-29 06:18 ET — PageIntro room path label refinement

See `.agent/changes/2026-06-29-page-intro-room-path-label-refinement.md` and `.agent/matrices/page-intro-room-path-label-refinement.matrix.md`.

## 2026-06-29 06:10 ET — Header contact shadow refinement

See `.agent/changes/2026-06-29-header-contact-shadow-refinement.md` and `.agent/matrices/header-contact-shadow-refinement.matrix.md`.

## 2026-06-29 05:50 ET — Homepage door room ledger binding

See `.agent/changes/2026-06-29-home-door-room-ledger-binding.md` and `.agent/matrices/home-door-room-ledger-binding.matrix.md`.

## 2026-06-29 05:38 ET — Detail card corner stitch pass

See `.agent/changes/2026-06-29-detail-card-corner-stitch.md` and `.agent/matrices/detail-card-corner-stitch.matrix.md`.

## 2026-06-29 05:31 ET — Notes post bound sheet pass

See `.agent/changes/2026-06-29-notes-post-bound-sheet.md` and `.agent/matrices/notes-post-bound-sheet.matrix.md`.

## 2026-06-29 05:20 ET — Notes post markdown ruled body pass

See `.agent/changes/2026-06-29-notes-post-markdown-ruled-body.md` and `.agent/matrices/notes-post-markdown-paper.matrix.md`.

## 2026-06-29 05:10 ET — Homepage house rules receipt binding refinement

See `.agent/changes/2026-06-29-home-house-rules-receipt-binding-refinement.md` and `.agent/matrices/home-house-rules-receipt-binding-refinement.matrix.md`.

## 2026-06-29 04:49 ET — Detail card binding thread load

See `.agent/changes/2026-06-29-detail-card-binding-thread-load.md` and `.agent/matrices/detail-card-binding-thread-load.matrix.md`.

## 2026-06-29 04:40 ET — Detail card title ticket pass

See `.agent/changes/2026-06-29-detail-card-title-tickets.md` and `.agent/matrices/detail-card-title-tickets.matrix.md`.

## 2026-06-29 04:30 ET — Detail card copy slip pass

See `.agent/changes/2026-06-29-detail-card-copy-slips.md` and `.agent/matrices/detail-card-copy-slips.matrix.md`.

## 2026-06-29 04:20 ET — Detail card status tape pass

See `.agent/changes/2026-06-29-detail-card-status-tape.md` and `.agent/matrices/detail-card-status-tape.md`.
