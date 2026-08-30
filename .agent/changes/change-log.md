# Change Log

This log uses local project time in `America/New_York`.

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
