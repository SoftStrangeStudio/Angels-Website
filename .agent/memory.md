# Public Project Memory

This file stores distilled, public-safe memory for the Website repo.

## Current facts

- The public Website is the main Soft Strange Studio front door.
- The public URL is `https://softstrangestudio.github.io/Angels-Website/`.
- The site uses Next.js App Router with static export for GitHub Pages.
- Home, About, Notes, Portfolio, Store, Blog compatibility, and post-reader routes are active.
- Notes and post readers consume published public Blog data with public-path and raw-GitHub fallbacks.
- The shared route view layer lives in `app/editorial-page.jsx`.
- The shared chrome lives in `app/site-chrome.jsx`.
- Global visual CSS uses `app/globals.css` and `app/home-gemini-reference-pass.css`; the homepage background uses `app/paper-scroll-experience.module.css`.
- The homepage mounts a fixed, pointer-transparent WebGL2 torn-paper layer through `PaperScrollExperience`, driven by real native scroll in both directions with no runway or rebasing. The shared fixed footer matches the header, peeks by 12px until the document bottom, and then slides fully up, with no margin underneath; all other routes remain on the editorial system.
- The GitHub Pages base path is `/Angels-Website`; runtime links and public assets must use that exact prefix.
- Older pass styles remain as historical artifacts but are not imported at runtime.
- Editorial image assets live in `public/images/editorial/`.

## Active direction

- Match the approved Gemini reference across the whole site: sage torn-paper header, relaxed handwritten identity, light dot-grid notebook paper, Arial reading text with handwritten accents, taped images, and visible soft shadows.
- Secondary pages use one portrait editorial column made of vertically stacked paper cards.
- Use real source or generated imagery instead of CSS-drawn placeholder scenes.
- The header paper layer uses an irregular textured SVG tear with edge fibers and a soft shadow; avoid repeating zigzag cuts and keep the mobile foldout unclipped.
- The studio wordmark uses custom SVG pen paths that write themselves on arrival, with immediate complete lettering for reduced motion.
- Use loose Kalam handwriting on short flavor text, Arial for main reading, and short welcoming copy with lighter headings.
- Keep public copy warm and visitor-facing; internal publishing contracts and implementation details stay offstage.
- Use a full navigation banner above 720px and a native Menu foldout on mobile; keep visible active-route cues and readable 48px mobile links.
- Store pages must use honest availability language and never imply fake inventory.
- Blog compatibility routes should feel identical to the Notes room rather than forming a second design system.

## Validation rules

- A production build is necessary but not sufficient.
- Capture desktop and 390px mobile screenshots for every top-level route.
- Verify no horizontal overflow, clipped primary navigation, or console errors.
- Open at least one published note through both Notes and Blog post paths.
- Compare Home against `.agent/references/2026-07-08-gemini-home-reference.png` when changing the shared visual system.
