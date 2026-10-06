# Design QA

Source visual truth: `.agent/references/2026-07-08-gemini-home-reference.png`

Implementation screenshot: `logs/final-home-qa/2026-07-09T22-42-39-566Z/routes/desktop/screenshots/initial.png`

Combined comparison: `.agent/references/2026-07-09-home-design-comparison.png`

Viewport: 1440 x 1000 desktop reference check; 390 x 844 mobile responsive check.

State: public home, top-level routes, notes feed ready, and one published note open.

## Full-view comparison evidence

- The implementation preserves the reference composition: fixed sage header, centered script wordmark, direct uppercase navigation, torn cream edge, centered welcome copy, four taped cards, warm paper field, and restrained footer line.
- The generated watercolor images intentionally replace the reference's simplified placeholder illustrations while preserving the same card proportions, palette, hierarchy, and content roles.
- About, Notes, Portfolio, Store, Blog, and both post-reader routes use the same visual tokens and stacked paper rhythm.

## Focused region comparison evidence

- Header: title scale, navigation position, active underline, sage tone, and torn separator match the source hierarchy.
- Card row: four equal paper cards, centered headings, muted descriptions, tape accents, image crops, and soft shadows align with the source.
- Mobile: the cards become one portrait column, all six navigation labels remain visible, and no horizontal overflow occurs.

## Findings

- No actionable P0, P1, or P2 fidelity issues remain.
- P3: generated images are richer and more detailed than the flat source illustrations. This is an intentional quality upgrade and stays within the source palette and editorial mood.

## Comparison history

1. Initial full-route capture found the mobile Contact navigation label partially clipped.
2. Reduced mobile navigation gap, font size, and letter spacing; centered all six labels.
3. Post-fix evidence: `logs/final-home-qa/2026-07-09T22-42-39-566Z/routes/mobile/screenshots/initial.png` shows the complete navigation with no overflow.
4. Initial Notes and Blog audit exposed a local CORS console error before the fallback source loaded.
5. Made feed and post source order environment-aware.
6. Post-fix evidence: `logs/final-notes-console-qa/2026-07-09T22-48-20-653Z` and `logs/final-reader-qa/2026-07-09T22-51-26-198Z` pass with no console errors.

## Validation

- Production static export passed.
- Home, About, Notes, Portfolio, Store, and Blog returned 200 at desktop and mobile.
- Notes and Blog post readers returned 200 with live published content at desktop and mobile.
- No horizontal overflow was detected.
- Browser console errors were checked and cleared.
- Primary route navigation and note-reader destinations were verified.

final result: passed


## 2026-10-05 — Finite homepage scroll review

- Kept the sage, cream torn paper, taped watercolor cards, serif hierarchy, and existing studio copy.
- Reviewed current in-app browser renders at 1440×900, 390×844, and the default panel width. The first pass prompted smaller mobile images and a footer aligned with the paper column.
- All four studio doors fit together on desktop; mobile uses two compact columns. Intro, cards, and footer reveal gently; cards lift and images zoom slightly on hover/focus.
- Mobile page height stayed at 1190px during repeated bottom scrolling; paper offset changed with native scroll and no runway elements remain. No horizontal overflow was observed on Home or About.
- Reduced-motion emulation yielded paper offset 0, 0s card transitions, and no hidden reveal content. Media and viewport overrides were restored after review.
- The shared footer appears on Home and About; homepage copyright appears once.
- `npm run build` passed, including type/lint checks and the static export. `git diff --check` passed after whitespace cleanup.
- Current review screenshots are in `logs/home-scroll-review/`. This is local verification; no deployment was performed.

## 2026-10-05 — Responsive navigation review

- Mobile at 720px and below uses a native Menu foldout; desktop and widescreen retain all six banner links.
- Reviewed 320×640, 390×844, 1440×900 and 1920×1080 layouts; no horizontal overflow, clipped links or mobile brand/menu overlap was observed.
- Mobile Menu has a 44px target and links have 48px minimum height. Escape closes and restores summary focus; selecting About navigates and closes the foldout.
- Foldout reveal respects reduced-motion CSS. The mobile header is shorter so the first screen shows more content.
- `npm run build` passed, including lint/type validation and static export.
- Screenshots: `logs/navigation-review/mobile-closed.png`, `mobile-open.png`, `desktop-banner.png`, `widescreen-banner.png`. Changes remain local on main.

## 2026-10-05 — Handwritten wordmark

- Replaced the flourished cursive header name with Patrick Hand, bundled locally with its license for consistent rendering.
- Inspected About at the default viewport and 1440px, confirmed the font loaded, and checked 320px for horizontal overflow and menu overlap (both absent).
- Screenshot: `logs/wordmark-review/desktop.png`. `npm run build` passed, including lint/type checks and static export.

## 2026-10-05 — Bottom-only footer

- Reviewed Home at 1440px and About at the default mobile panel: footer is hidden and inert at scroll position zero, slides up at the document bottom, and hides again when scrolling up.
- Footer bottom aligned with viewport bottom (0px desktop, subpixel rounding on mobile); no horizontal overflow on Home. Removed bottom margin and delegated footer reveal to the shared chrome.
- Reduced-motion CSS disables the slide. Build, lint/type validation, static export, and `git diff --check` passed.
- Screenshots in `logs/footer-review/`. Changes remain local on main.

## 2026-10-05 — Clear reading type and gentle welcome

- Main text and headings use Arial. Patrick Hand is reserved for short home flavor text, ornaments, and the studio wordmark.
- The homepage now opens with “Welcome to the studio.” and a short invitation; door descriptions are shorter. Hero headings have more line space, normal tracking, and smaller sizing.
- Reviewed Home desktop and 390px mobile, plus About mobile. Browser inspection confirmed Arial on h1, Studio Hand on the flavor line, and no horizontal overflow.
- `npm run build` passed, including lint/type validation and static export; `git diff --check` passed. Screenshots live in `logs/welcome-review/`.

## 2026-10-05 — Complete all three treatments

- Current user preview shows loose Kalam flavor lettering, Arial reading text, lighter card titles, and a shorter welcome. Shared decorative labels and the footer tagline also use Kalam.
- Browser confirmed Studio Flavor loaded and Arial on the main heading, with no horizontal overflow at the default mobile panel width.
- `npm run build` passed with lint/type checks and static export; `git diff --check` passed. Screenshot: `logs/three-changes-review/current.png`.

## 2026-10-05 — Dot-ruled background

- Light dot-grid paper replaces the tan fiber background. Dots stay at 20px CSS spacing across viewport sizes and move with homepage paper scroll. Sage exterior and torn edges remain.
- Reviewed mobile and 1440px desktop Home; shader-ready state confirmed and scroll offset changed to 100.75 at the desktop bottom. No horizontal overflow was observed.
- Updated CSS page background and SVG fallback to matching dot ruling. Production build, lint/type validation, static export, and `git diff --check` passed.
- Screenshots: `logs/dot-grid-review/mobile.png`, `desktop.png`.

## 2026-10-05 — Pen wordmark

- Shared wordmark is now custom SVG pen lettering with sequential stroke drawing. Captured completed mobile and desktop lettering in `logs/pen-wordmark-review/`.
- Verified live dash offsets at different writing stages; reduced motion returned animation none and every path fully visible. Restored emulated media and viewport settings afterward.
- At 320px, no horizontal overflow or Menu overlap was observed. Home link keeps an accessible name.
- Production build, lint/type validation, static export, and `git diff --check` passed. Changes remain local on main.

## 2026-10-05 — Ripped-paper top banner

- Added `public/atmosphere/header-torn-paper.svg` with uneven tearing, paper grain, and edge fibers. The CSS paper layer has a soft shadow and no repeating cream zigzag.
- Reviewed mobile and 1440px desktop. Increased minimum texture width after the first mobile render to keep tears broad and irregular.
- Mobile Menu remains unclipped, opens normally, and closes with Escape. Desktop navigation and pen wordmark remain visible. No desktop horizontal overflow was observed.
- `npm run build` passed with lint/type validation and static export; `git diff --check` passed. Screenshots: `logs/torn-banner-review/mobile.png`, `desktop.png`.

## 2026-10-05 — Matching footer edge peek

- Full-width footer matches the top sage paper, using the same asset flipped vertically, the pen wordmark, light text, and handwritten tagline.
- Mobile reviewed with only the 12px torn edge showing at the top of the page, fully open at the bottom, and tucked again on upward scrolling. Desktop and About also reach the open bottom state.
- Dock and footer both measured 165px on desktop, with 0px bottom gap and no horizontal overflow. Discarded an early shader-loading capture and saved the settled page instead.
- Build, lint/type validation, static export, and `git diff --check` passed. Screenshots are in `logs/footer-peek-review/`.
