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
- The active visual CSS is limited to `app/globals.css` and `app/home-gemini-reference-pass.css`.
- The homepage mounts a fixed, pointer-transparent WebGL2 torn-paper layer through `PaperScrollExperience`; all other routes remain on the shared editorial system.
- The GitHub Pages base path is `/Angels-Website`; runtime links and public assets must use that exact prefix.
- Older pass styles remain as historical artifacts but are not imported at runtime.
- Editorial image assets live in `public/images/editorial/`.

## Active direction

- Match the approved Gemini reference across the whole site: sage torn-paper header, centered script identity, warm cream paper, serif editorial hierarchy, taped images, and visible soft shadows.
- Secondary pages use one portrait editorial column made of vertically stacked paper cards.
- Use real source or generated imagery instead of CSS-drawn placeholder scenes.
- Keep public copy warm and visitor-facing; internal publishing contracts and implementation details stay offstage.
- Preserve direct top navigation and a visible active-route cue.
- Store pages must use honest availability language and never imply fake inventory.
- Blog compatibility routes should feel identical to the Notes room rather than forming a second design system.

## Validation rules

- A production build is necessary but not sufficient.
- Capture desktop and 390px mobile screenshots for every top-level route.
- Verify no horizontal overflow, clipped primary navigation, or console errors.
- Open at least one published note through both Notes and Blog post paths.
- Compare Home against `.agent/references/2026-07-08-gemini-home-reference.png` when changing the shared visual system.
