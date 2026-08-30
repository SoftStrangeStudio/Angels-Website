# Relationship Map

- PAGE-001 owns COMP-010, which uses the shared `<shader-canvas>` runtime and remains isolated from secondary routes.
- METRIC-033 binds `next.config.mjs`, active navigation, public assets, shaders, and audit commands to the `/Angels-Website/` deployment prefix.

## Active Website routes

- PAGE-001 Home uses `app/page.jsx` and now pulls homepage highlights from `app/site-data.js`.
- PAGE-002 About uses `app/about/page.jsx` and now pulls studio principles and pathways from `app/site-data.js`.
- PAGE-003 Notes uses `app/notes/page.jsx` and `app/notes/NotesPageClient.jsx`, including reader-state support cards from `app/site-data.js`, newest-first published sorting, a latest-note starting point, and source-readiness rules from `app/source-readiness.js`.
- PAGE-003A Notes Post Reader uses `app/notes/post/page.jsx` and `app/notes/post/PostReaderClient.jsx` with loading, missing-slug, unavailable-source, public-status, support-card, and continuity states.
- PAGE-003B Blog compatibility uses `app/blog/page.jsx` and `app/blog/post/page.jsx`, reusing the upgraded Notes index and Post Reader clients.
- PAGE-004 Portfolio uses `app/portfolio/page.jsx`, pulls project details, archive readiness, archive lanes, and publishing rhythm from `app/site-data.js`, and pulls future Portfolio feed contract fields plus staged record states from `app/portfolio-feed-contract.js`.
- PAGE-005 Store uses `app/store/page.jsx`, pulls lane details plus readiness promises from `app/site-data.js`, and pulls launch checklist, staged availability states, and future Store feed contract fields from `app/store-readiness.js`.

## Shared components

- COMP-005 Shared Site Chrome uses `app/site-chrome.jsx` and `app/layout.jsx`.
- COMP-001 Floating Header and COMP-002 Direct Studio Navigation appear on each page.
- COMP-006 Notes Reader Client loads the Blog index, filters to public posts, sorts newest first, points readers toward the latest note, and renders Blog source-readiness/fallback guidance.
- COMP-007 Post Reader Client loads public note profiles and Markdown while providing clear reader states and page continuity.
- COMP-008 Filled Page Sections use `app/site-data.js`, `app/store-readiness.js`, `app/source-readiness.js`, `app/portfolio-feed-contract.js`, and `app/globals.css` to make each route feel complete, including Portfolio archive readiness lanes, Portfolio feed contract guidance, Portfolio record states, Store launch readiness gates, Store feed contract guidance, and Notes source-readiness guidance.
- COMP-009 Next Step Band uses `app/next-step-band.jsx` with `app/page-continuity.js`, now including the individual note reader route.

## Data and design

- DATA-003 powers the Notes, Post Reader, and Blog compatibility routes.
- DATA-005 powers the next-step bands for Home, About, Notes, Portfolio, Store, and the note reader path.
- DATA-006 powers Portfolio readiness language until a future Portfolio feed can provide deeper public records.
- DATA-007 powers Store readiness language until a future Store feed can provide public product records.
- DATA-008 defines the public-safe shape a future Store feed should expose before PAGE-005 renders live product records.
- DATA-009 defines the Blog feed, published-record, reader-file, and fallback expectations before PAGE-003 depends on deeper source automation.
- DATA-010 defines the public-safe shape a future Portfolio feed should expose before PAGE-004 renders live project records.
- DESIGN-015 removes the old Pages trigger and numbered nav treatment.
- DESIGN-017 keeps the polaroid frame/backing motif available across the site.
- DESIGN-018 treats each top-level route as a filled public room with useful content and honest readiness states.
- DESIGN-019 pushes the shared visual language toward paper/collage material authenticity across page heroes, cards, backgrounds, and filled sections.
- DESIGN-020 focuses the paper/collage material language onto the shared floating header so the top bar reads as paper over the page, not glass UI.

## Next board signal

The Portfolio page now explains the future Portfolio feed contract and staged record states before deeper archive automation depends on it. A future run should choose between live Blog feed validation, checking the paper-card pass on the live site, or adding a lightweight public validation checklist for connected feed readiness.
