# Feedback Log

This log records public-safe feedback signals with timestamps so design intent can be tracked over time.

## Timestamp standard

Use local project time in `America/New_York` and include both date and time.

Format:

```txt
YYYY-MM-DD HH:mm ET
```

## FEEDBACK-026 — Raw unstyled Pages deployment after repository rename

Timestamp: 2026-08-30 18:34 ET
Status: resolved in implementation
Source: Live GitHub Pages screenshot and repository path inspection

### Public-safe summary

The renamed `/Angels-Website/` deployment loaded HTML while CSS, scripts, images, and links still targeted `/Website/`. The deployment prefix must be updated as one shared runtime contract; this failure is independent of the paper shader.

## FEEDBACK-001 — Reduce static structure and add animated atmosphere

Timestamp: 2026-06-23 23:09 ET  
Status: converted to active lessons  
Source: Homepage visual feedback

### Public-safe summary

The homepage currently feels too static, too bordered, and too empty. Future visual work should reduce hard outlines, keep the style flat, and add subtle animated atmosphere through gradients, fade-offs, CSS shading, and intentional motion.

### Extracted signal

Move from static bordered UI toward a living flat studio atmosphere.

### Affected semantic items

- PAGE-001 Homepage
- COMP-001 Floating Header
- COMP-003 Scroll Title Sequence
- COMP-004 Studio Page Cards
- DESIGN-001 Warm Cream Background
- DESIGN-002 Large Editorial Type
- DESIGN-003 Rounded Minimal Cards

### Created lessons

- LESSON-005 Reduce static bordered structure
- LESSON-006 Add animated atmosphere
- LESSON-007 Keep everything graphically flat
- LESSON-008 Prefer gradients over borders
- LESSON-009 Animation should have intent

### Implementation ideas to evaluate

- anime.js for intentional motion choreography
- mouse-reactive background particles
- CSS-based cel-shaded atmosphere
- gradient fade-offs instead of hard bordered panels
- reduced or removed border radius where gradients can carry the shape

## FEEDBACK-002 — Add tactile polaroid-like depth

Timestamp: 2026-06-23 23:10 ET  
Status: converted to active lesson  
Source: Follow-up homepage visual feedback

### Public-safe summary

The visual direction should not be empty-flat. It should keep a graphic/flat art language while adding tactile depth, like a polaroid/photo surface with gloss, subtle scratches, and transparent distortion over the content behind it.

### Extracted signal

Use 2.5D material illusion: flat graphic surfaces with photo-like depth, gloss overlays, scratches, and refraction-style distortion, without becoming heavy realistic 3D.

### Affected semantic items

- PAGE-001 Homepage
- COMP-003 Scroll Title Sequence
- COMP-004 Studio Page Cards
- DESIGN-007 Gradient Fade-Off Structure
- DESIGN-008 Flat Cel-Shaded Atmosphere
- DESIGN-010 Tactile Polaroid Depth

### Created lesson

- LESSON-010 Add tactile 2.5D depth without losing flat art direction

### Implementation ideas to evaluate

- glossy overlay layers
- subtle scratch/noise textures
- translucent polaroid/photo-panel surfaces
- CSS gradients and blend modes
- light distortion over background content
- flat cel-shaded highlights instead of realistic 3D rendering

## FEEDBACK-003 — Header should emerge from offscreen top

Timestamp: 2026-06-23 23:30 ET  
Status: converted to active lesson  
Source: Screenshot review of current Website header

### Public-safe summary

The current floating header reads as a complete rounded pill placed inside the viewport. Future header work should make the bar feel like it is entering from the top edge or partially tucked beyond the visible screen.

### Extracted signal

Use the viewport edge as an active design surface. The header can feel clipped, tucked, or pulled in from above while staying usable.

### Affected semantic items

- COMP-001 Floating Header
- COMP-002 Folder Pages Menu
- DESIGN-004 Floating Header
- DESIGN-011 Offscreen Top Emergence
- INT-008 Top Edge Entry

### Created lesson

- LESSON-011 Make the header emerge from offscreen top

### Reference image

- `.agent/references/2026-06-23-header-offscreen-top-reference.md`
- `.agent/references/2026-06-23-header-offscreen-top-reference.jpg.base64`

### Implementation ideas to evaluate

- negative top offset
- mask or clip the top edge of the header surface
- retain readable identity text and a fully reachable Pages button
- keep keyboard focus rings visible
- avoid hiding controls purely for style

## FEEDBACK-004 — Pages menu should expand left, stay open, and be unboxed

Timestamp: 2026-06-23 23:40 ET  
Status: converted to active lesson  
Source: Screenshot review of current Website Pages menu

### Public-safe summary

The current Pages menu opens downward into a large bordered/background panel. Future menu work should make it open by default, expand left from the Pages control, and remove the separate panel border/background treatment.

### Extracted signal

Use horizontal, edge-aware navigation reveal instead of a dropdown card. The Pages links should feel integrated into the header line rather than placed in a separate overlay.

### Affected semantic items

- COMP-002 Folder Pages Menu
- DESIGN-012 Unboxed Left-Expanding Menu
- INT-010 Leftward Default-Open Menu Reveal

### Created lesson

- LESSON-013 Make the Pages menu open left and stay visually unboxed

### Reference image

- `.agent/references/2026-06-23-menu-left-open-transparent-reference.md`
- `.agent/references/2026-06-23-menu-left-open-transparent-reference.jpg.base64`

### Implementation ideas to evaluate

- keep the Pages menu open by default on desktop
- render links to the left of the Pages button
- remove the dropdown panel background and border
- keep focus states visible even without a panel surface
- add a mobile fallback if horizontal space is too limited

## FEEDBACK-005 — Direct nav should not have numbers, extra text, or a Pages button

Timestamp: 2026-06-23 23:50 ET  
Status: converted to active lesson  
Source: Screenshot review of current Website header navigation

### Public-safe summary

The current direct navigation still includes small edge numbers, extra text treatment, and a separate `Pages` button. The desired direction is direct navigation only: destination labels without numbering or redundant controls. The current visual treatment also feels too soft overall and needs more contrast and definition.

### Extracted signal

Do not keep the old `Pages` trigger once the links are visible. The nav should be simpler, sharper, and less padded with decorative metadata.

### Affected semantic items

- COMP-002 Folder Pages Menu
- DESIGN-012 Unboxed Left-Expanding Menu
- DESIGN-013 Direct Unnumbered Navigation
- DESIGN-014 Soft/Sharp Balance
- INT-010 Leftward Default-Open Menu Reveal

### Created lesson

- LESSON-014 Use direct nav labels without extra markers

### Reference image

- `.agent/references/2026-06-23-nav-direct-unboxed-reference.md`
- `.agent/references/2026-06-23-nav-direct-unboxed-reference.jpg.base64`

### Implementation ideas to evaluate

- remove the `01`, `02`, `03`, `04` markers from nav links
- remove the separate `Pages` button in desktop direct-nav mode
- keep only direct destination labels such as Notes, Sample, Source, Home
- reduce excess softness by increasing contrast, using firmer text weight/spacing, or sharpening the material edge
- keep mobile behavior simple and accessible

## FEEDBACK-006 — Validate feedback against the actual Website before acting

Timestamp: 2026-06-24 19:17 ET  
Status: converted to active lesson  
Source: Workflow feedback about screenshots and current-site validation

### Public-safe summary

Future feedback intake should check whether screenshots and visible-site comments belong to the actual Website before creating lessons or implementation targets. Feedback storage should update `.agent/` only unless implementation is explicitly requested.

### Extracted signal

Source validation is part of feedback intake, not an optional later step.

### Affected semantic items

- PROC-001 Live Website Validation Protocol
- LESSON-017 Validate feedback against the actual Website
- METRIC-016 Feedback Source Validated

### Created lesson

- LESSON-017 Validate feedback against the actual Website

### Implementation boundary

Store feedback in `.agent/` first. Let a later implementation run apply it unless Angel explicitly asks for the Website to change now.

## FEEDBACK-007 — About page needs stronger paper material

Timestamp: 2026-06-24 19:38 ET  
Status: converted to active lesson  
Source: Screenshot review of current Website About page

### Validation source

The screenshot maps to the active `/Website/about/` route and current repo source. It shows the shared Website header, About page hero copy, shared detail cards, and the polaroid stack from `app/site-chrome.jsx` and `app/about/page.jsx`.

### Public-safe summary

The page is warm, soft, and layered, but it does not feel papery enough yet. Future visual work should make the full page system read more like handmade paper/collage rather than soft translucent UI with a separate polaroid motif.

### Extracted signal

Paper should be the primary material read. Use visible fiber, torn or uneven edges, cutout/scanned imperfections, layered sheet shadows, collage overlaps, and tactile paper depth across backgrounds, cards, hero stacks, and shared page sections.

### Affected semantic items

- PAGE-001 Homepage
- PAGE-002 About
- COMP-004 Studio Page Cards
- COMP-005 Shared Site Chrome
- COMP-008 Filled Page Sections
- DESIGN-010 Tactile Polaroid Depth
- DESIGN-017 Polaroid Frame Core Motif
- DESIGN-019 Paper Material Authenticity
- METRIC-018 Paper Material Reads First

### Created lesson

- LESSON-019 Make paper material feel primary

### Reference note

- `.agent/references/2026-06-24-about-paper-material-reference.md`

### Implementation boundary

Feedback-only pass: public Website source files should stay unchanged until a later implementation run applies the lesson.

## FEEDBACK-008 — Top bar should feel like paper over the page

Timestamp: 2026-06-24 19:41 ET  
Status: converted to active lesson  
Source: Screenshot review of current Website About page top header

### Validation

- Validation source used: screenshot plus current repo source for the shared header component and CSS.
- Screenshot status: current Website screenshot of `/Website/about/`.
- Matched semantic items: PAGE-002, COMP-001, COMP-002, DESIGN-004, DESIGN-011, DESIGN-015, DESIGN-019, ASSET-001, ASSET-005, ASSET-006, METRIC-019.

### Public-safe summary

The shared top bar is the right navigation structure, but its surface should feel more like a paper strip laid over the top of the page. It needs stronger tactile paper material, a clearer drop shadow, and either existing asset-based texture or shader-like CSS treatment.

### Extracted signal

The top header should read as layered paper, not generic soft glass. Use texture assets, paper-mask/torn-edge cues, subtle grain or scratches, and a visible soft shadow to make it feel physically placed over the page while preserving readable direct nav links.

### Affected semantic items

- PAGE-002 About
- COMP-001 Floating Header
- COMP-002 Direct Studio Navigation
- DESIGN-004 Floating Header
- DESIGN-011 Offscreen Top Emergence
- DESIGN-015 Direct Unnumbered Navigation
- DESIGN-019 Paper Material Authenticity
- DESIGN-020 Paper Header Surface
- ASSET-001 Grain Noise
- ASSET-005 Gloss Sweep
- ASSET-006 Torn Polaroid Frame
- METRIC-019 Paper Header Surface

### Created or updated lessons

- LESSON-020 Make the top bar feel like layered paper

### Reference note

- `.agent/references/2026-06-24-paper-header-surface-reference.md`

### Implementation boundary

Feedback stored in `.agent/` only. Public Website source should not change until an implementation run is requested.

## FEEDBACK-021 — Homepage should stay stacked, but become image-led

Timestamp: 2026-07-01 04:07 ET  
Status: converted to active lesson  
Source: Live homepage screenshot review

### Public-safe summary

The homepage is close in structure, but it still reads too much like a text-first front room. The stacked-card shape is good; the missing piece is a stronger image-led composition with a clearer hero photo/banner and more obvious lifted paper depth at screenshot scale.

### Extracted signal

Keep the stacked editorial layout, but let the image surfaces lead the page. The homepage should feel like a layered studio spread with a clear visual hero, stronger contrast, and more physically separated paper pieces.

### Affected semantic items

- PAGE-001 Homepage
- COMP-001 Floating Header
- COMP-004 Studio Page Cards
- COMP-005 Shared Site Chrome
- DESIGN-001 Warm Cream Background
- DESIGN-002 Large Editorial Type
- DESIGN-003 Rounded Minimal Cards

### Created lessons

- LESSON-024 Keep the homepage stacked but image-led

### Implementation ideas to evaluate

- add a dominant hero image or banner surface above the intro text
- keep the stacked card language, but make each card feel more like a paper piece over a page
- strengthen visible shadow separation so the hierarchy reads instantly
- reduce the amount of first-screen text so the hero image can carry the page
- keep the top nav and tabs, but let the content cards do more visual work

## FEEDBACK-022 — Homepage hero needs a dominant visual anchor

Timestamp: 2026-07-01 04:10 ET  
Status: converted to active lesson  
Source: Live homepage screenshot review

### Public-safe summary

The homepage hero still lacks a dominant visual anchor. The layout has the right stacked structure and strong header, but the large empty right side makes the first screen feel unfinished compared with the reference image.

### Extracted signal

Use the top hero area as a real composition, not just a text block with empty space beside it. A large image or collage-style anchor should balance the title, set the room’s material tone, and make the homepage feel intentionally designed at first glance.

### Affected semantic items

- PAGE-001 Homepage
- COMP-004 Studio Page Cards
- COMP-005 Shared Site Chrome
- DESIGN-001 Warm Cream Background
- DESIGN-002 Large Editorial Type
- DESIGN-003 Rounded Minimal Cards

### Created lessons

- LESSON-025 Give the homepage hero a dominant visual anchor

### Implementation ideas to evaluate

- place a wide hero image or collage panel to the right of the title
- reduce the empty cream field above the cards by using it as visual composition space
- keep the stacked cards below, but make the first fold of the page feel complete
- use image-led material to balance the oversized type and prevent the hero from reading as a text-only intro

## FEEDBACK-023 — Homepage lower cards need stronger lift and separation

Timestamp: 2026-07-01 04:12 ET  
Status: converted to active lesson  
Source: Live homepage screenshot review

### Public-safe summary

The lower room cards are useful, but they sit too flat against the page. They need stronger lift, clearer boundary contrast, and a little more separation so the page reads as stacked paper pieces instead of a single pale panel.

### Extracted signal

Keep the lower cards in the stack, but make their edges and shadows more readable. The homepage should separate the hero field from the room cards more aggressively so the structure is visible at a glance.

### Affected semantic items

- PAGE-001 Homepage
- COMP-004 Studio Page Cards
- COMP-005 Shared Site Chrome
- DESIGN-001 Warm Cream Background
- DESIGN-003 Rounded Minimal Cards
- DESIGN-014 Soft/Sharp Balance

### Created lessons

- LESSON-026 Give the lower homepage cards stronger lift

### Implementation ideas to evaluate

- deepen the drop shadow on the open-room cards
- give the card row a slightly firmer edge so it reads as a distinct layer
- increase the gap between the hero block and the cards
- keep the cards soft, but make the stacked paper separation obvious at screenshot scale

## FEEDBACK-024 — Top tabs need more stagger and fold

Timestamp: 2026-07-01 04:14 ET  
Status: converted to active lesson  
Source: Live homepage screenshot review

### Public-safe summary

The top navigation is in the right place, but the tabs still read too uniform. They need a stronger stagger, more visible torn-paper edges, and a clearer folded/pinned feel so they resemble separate pieces of paper rather than a flat nav row.

### Extracted signal

Keep the paper-tab concept, but make each tab feel individually cut and placed. The top bar should look more like a strip of layered paper pieces with slight offsets and depth, not a single aligned menu line.

### Affected semantic items

- COMP-001 Floating Header
- COMP-002 Direct Studio Navigation
- COMP-005 Shared Site Chrome
- DESIGN-004 Floating Header
- DESIGN-019 Paper Material Authenticity
- DESIGN-020 Paper Header Surface

### Created lessons

- LESSON-027 Make the header tabs feel more staggered and folded

### Implementation ideas to evaluate

- offset the tabs a little more vertically so each one reads as a separate cut piece
- increase the lower-edge irregularity on the tabs
- add a clearer fold or curl treatment to the tab surfaces
- keep the dark header strip, but make the tabs feel less mechanically aligned

## FEEDBACK-025 — Homepage needs more vertical breathing room

Timestamp: 2026-07-01 04:16 ET  
Status: converted to active lesson  
Source: Live homepage screenshot review

### Public-safe summary

The page needs more vertical breathing room. The hero field is too tall and empty, while the lower cards feel compressed toward the bottom, so the composition does not yet feel like a balanced stacked spread.

### Extracted signal

Balance the vertical rhythm of the homepage. The hero area should not dominate with empty space, and the lower cards should have more separation from the bottom edge so the whole page feels composed rather than stretched.

### Affected semantic items

- PAGE-001 Homepage
- COMP-004 Studio Page Cards
- COMP-005 Shared Site Chrome
- DESIGN-001 Warm Cream Background
- DESIGN-014 Soft/Sharp Balance

### Created lessons

- LESSON-028 Balance the homepage vertical rhythm

### Implementation ideas to evaluate

- reduce the height of the empty hero field
- give the lower card row more bottom padding or margin
- tighten the vertical gap between the intro area and the cards
- keep the stacked look, but let the page breathe more evenly from top to bottom

## FEEDBACK-009 — Polaroid frames should become content cards

Timestamp: 2026-06-24 19:41 ET  
Status: converted to active lesson  
Source: Screenshot review of current Website homepage polaroid/card treatment

### Validation

- Validation source used: screenshot plus current repo source for the homepage hero, page cards, and polaroid frame assets. Live fetch was unavailable during this pass, so repo source and screenshot matching were used.
- Screenshot status: appears to be a current Website homepage screenshot showing the hero polaroid stack and surrounding card/content layers.
- Matched semantic items: PAGE-001, COMP-003, COMP-004, DESIGN-010, DESIGN-017, ASSET-006, ASSET-007, METRIC-020.

### Public-safe summary

The polaroid picture motif should not only sit behind content as decorative atmosphere. When the frame appears in the page/card system, the middle should be filled with meaningful content and the polaroid should function as a card surface.

### Extracted signal

Turn polaroid frames into content-bearing cards: fill the inner photo area with readable page text, preview art, route cues, or portfolio/store material so the material motif becomes useful structure instead of background decoration.

### Affected semantic items

- PAGE-001 Homepage
- COMP-003 Scroll Title Sequence
- COMP-004 Studio Page Cards
- COMP-008 Filled Page Sections
- DESIGN-010 Tactile Polaroid Depth
- DESIGN-017 Polaroid Frame Core Motif
- DESIGN-021 Content-Bearing Polaroid Cards
- ASSET-006 Torn Polaroid Frame
- ASSET-007 Dark Polaroid Backing
- METRIC-020 Content-Bearing Polaroids

### Created or updated lessons

- LESSON-021 Make polaroid frames carry content

### Reference note

- `.agent/references/2026-06-24-polaroid-content-card-reference.md`

### Implementation boundary

Feedback stored in `.agent/` only. Public Website source should not change until an implementation run is requested.

## FEEDBACK-010 — Shared cards should feel like paper pieces

Timestamp: 2026-06-24 19:44 ET  
Status: converted to active lesson  
Source: Screenshot review of current Website About page card section

### Validation

- Validation source used: screenshot plus current repo source for `/Website/about/`, `app/page-continuity.js`, `app/next-step-band.jsx`, and shared card CSS in `app/globals.css`.
- Screenshot status: current Website screenshot of `/Website/about/` showing the About continuity band and link rows.
- Matched semantic items: PAGE-002, COMP-004, COMP-005, COMP-008, COMP-009, DESIGN-003, DESIGN-017, DESIGN-019, DESIGN-022, METRIC-018, METRIC-021.

### Public-safe summary

Several shared Website card surfaces currently feel too rounded and card-like. Future visual passes should make these surfaces feel like paper pieces using the same polaroid/collage language rather than generic rounded panels.

### Extracted signal

Shared cards, wide cards, pathway rows, detail cards, reader cards, and continuity bands should read as cut paper or polaroid surfaces: less uniformly rounded, more uneven/torn/cut edges, layered sheet construction, visible paper texture, slight rotation or offset where appropriate, and shadows that make them feel physically placed on the page.

### Affected semantic items

- PAGE-001 Homepage
- PAGE-002 About
- PAGE-003 Notes
- PAGE-003A Notes Post Reader
- PAGE-003B Blog Compatibility Routes
- PAGE-004 Portfolio
- PAGE-005 Store
- COMP-004 Studio Page Cards
- COMP-005 Shared Site Chrome
- COMP-006 Notes Reader Client
- COMP-007 Post Reader Client
- COMP-008 Filled Page Sections
- COMP-009 Next Step Band
- DESIGN-003 Rounded Minimal Cards
- DESIGN-017 Polaroid Frame Core Motif
- DESIGN-019 Paper Material Authenticity
- DESIGN-022 Paper Piece Card Surfaces
- METRIC-018 Paper Material Reads First
- METRIC-021 Paper Cards Not UI Cards

### Created or updated lessons

- LESSON-022 Make shared cards read as paper pieces

### Reference note

- `.agent/references/2026-06-24-paper-piece-cards-reference.md`

### Implementation boundary

Feedback stored in `.agent/` only. Public Website source should not change until an implementation run is requested.

## FEEDBACK-011 — Header still needs a stronger paper read

Timestamp: 2026-06-24 23:47 ET  
Status: logged; updates active lesson  
Source: Screenshot review of current live Website About page header

### Validation

- Validation source used: screenshot showing `/Website/about/` plus current repo source for `app/site-chrome.jsx` and `app/paper-header-pass.css`.
- Screenshot status: current Website screenshot of `/Website/about/` showing the shared top header and direct navigation.
- Matched semantic items: PAGE-002, COMP-001, COMP-002, DESIGN-004, DESIGN-011, DESIGN-015, DESIGN-019, DESIGN-020, ASSET-001, ASSET-002, ASSET-003, METRIC-019.

### Public-safe summary

The shared header should feel papery too. The current direction is right, but the top strip and navigation chips still read too smooth, soft, and UI-like at screenshot scale.

### Extracted signal

The whole header system should visibly read as paper, not only have a subtle paper texture. Future header refinements should make the strip, identity area, and navigation labels feel like layered paper tabs or cut paper pieces with more visible grain, uneven/cut lower edges, tactile shadow, and non-pill silhouettes while preserving direct nav clarity.

### Affected semantic items

- PAGE-002 About
- COMP-001 Floating Header
- COMP-002 Direct Studio Navigation
- COMP-005 Shared Site Chrome
- DESIGN-004 Floating Header
- DESIGN-011 Offscreen Top Emergence
- DESIGN-015 Direct Unnumbered Navigation
- DESIGN-019 Paper Material Authenticity
- DESIGN-020 Paper Header Surface
- METRIC-019 Paper Header Surface

### Created or updated lessons

- LESSON-020 Make the top bar feel like layered paper

### Reference note

- `.agent/references/2026-06-24-header-paper-refinement-reference.md`

### Implementation boundary

Feedback stored in `.agent/` only. Public Website source should not change until an implementation run is requested.
