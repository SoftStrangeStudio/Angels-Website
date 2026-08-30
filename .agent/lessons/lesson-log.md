# Lesson Log

## LESSON-041 — Treat the deployment prefix as one runtime contract

Timestamp: 2026-08-30 18:34 ET
Context: Repository ownership/path migration
Status: active

### Lesson

Changing the GitHub Pages repository path requires one coordinated update across Next.js configuration, active navigation, public assets, shader URLs, and audit tooling. A partial migration can leave semantic HTML visible while every visual and interactive asset fails.

### Future rule

After any Pages repository rename, build the export and prove representative CSS, script, image, and route URLs beneath the exact deployed prefix before pushing.

## LESSON-001 — Make homepage feel authored

Timestamp: 2026-06-23 22:40 ET  
Context: Homepage design feedback  
Status: active

### Feedback

The homepage felt like a demo shell with large outlined cards.

### Lesson

The homepage should feel like a real personal studio site, not a technical testing page.

### Future rule

Lead with authored studio identity, strong visual hierarchy, and human-facing copy before technical explanation.

## LESSON-002 — Use human-facing copy

Timestamp: 2026-06-23 22:40 ET  
Context: Header and page copy feedback  
Status: active

### Lesson

Translate technical structure into readable destinations. Use `Angel Berger` as the personal header identity.

## LESSON-003 — Keep navigation minimal

Timestamp: 2026-06-23 22:40 ET  
Context: Folder menu and four page destinations  
Status: active

### Lesson

For this phase, navigation should stay compact and limited to the four current destinations.

## LESSON-004 — Public memory must be safe

Timestamp: 2026-06-23 22:55 ET  
Context: Adding `.agent/` public project memory  
Status: active

### Lesson

Store only public-safe distilled lessons and project facts. Do not store raw private conversation details.

## LESSON-005 — Reduce static bordered structure

Timestamp: 2026-06-23 23:09 ET  
Context: Homepage visual atmosphere feedback  
Status: active

### Lesson

The site should rely less on hard borders, static boxes, and visible UI framing. Use gradients, fade-offs, spacing, contrast, and material layers to create structure.

### Future rule

Borders should be optional accents, not the main structure system.

## LESSON-006 — Add animated atmosphere

Timestamp: 2026-06-23 23:09 ET  
Context: Homepage felt too empty and static  
Status: active

### Lesson

The homepage should feel subtly alive. Use intentional motion, background particles, mouse response, or scroll-aware atmospheric movement to add studio energy.

### Future rule

Motion should be calm, performant, and optional for reduced-motion users.

## LESSON-007 — Keep everything graphically flat

Timestamp: 2026-06-23 23:09 ET  
Context: Visual direction feedback  
Status: active

### Lesson

The site can have atmosphere and depth, but it should remain graphically flat and illustrative rather than heavy realistic 3D.

### Future rule

Use flat color fields, cel-shaded highlights, gradients, and graphic overlays before realistic rendering.

## LESSON-008 — Prefer gradients over borders

Timestamp: 2026-06-23 23:09 ET  
Context: Border reduction feedback  
Status: active

### Lesson

Use gradients, soft fades, and layered color fields to separate content instead of relying on outlines and hard bordered cards.

### Future rule

Test gradient fade-offs before adding a border.

## LESSON-009 — Animation should have intent

Timestamp: 2026-06-23 23:09 ET  
Context: Animator intent feedback  
Status: active

### Lesson

Motion should not be random decoration. Each animation should guide attention, respond to interaction, support the studio mood, or clarify structure.

### Future rule

Every animation should be explainable in one sentence.

## LESSON-010 — Add tactile 2.5D depth without losing flat art direction

Timestamp: 2026-06-23 23:10 ET  
Context: Polaroid/photo-gloss depth feedback  
Status: active

### Lesson

The visual language should feel flat and graphic, but not empty. Add tactile depth through polaroid-like surfaces, gloss overlays, tiny scratches, subtle distortion, and photo-layer material cues.

### Future rule

Use 2.5D material illusion: glossy, layered, slightly imperfect surfaces that still read as designed flat art rather than realistic 3D.

## LESSON-011 — Make the header emerge from offscreen top

Timestamp: 2026-06-23 23:30 ET  
Context: Screenshot review of current floating header  
Status: active

### Lesson

The floating header should feel edge-attached, as if it is entering from above the viewport, instead of sitting fully inside the page as a complete centered pill.

### Future rule

Use top-edge attachment, clipping, negative offset, or a tucked surface effect to create the offscreen-entry feeling, while keeping the identity text, Pages button, focus states, and click targets fully usable.

## LESSON-013 — Make the Pages menu open left and stay visually unboxed

Timestamp: 2026-06-23 23:40 ET  
Context: Screenshot review of the current Pages menu dropdown  
Status: active

### Lesson

The Pages menu should be default-open on desktop, expand left from the Pages control, and avoid a separate dropdown card treatment.

### Future rule

Render the Pages links as part of the header line rather than a panel below it. Remove the separate menu background and border, preserve readable labels and visible focus states, and add a mobile fallback if horizontal space is limited.

## LESSON-014 — Use direct nav labels without extra markers

Timestamp: 2026-06-23 23:50 ET  
Context: Screenshot review of direct header navigation  
Status: active

### Lesson

The direct header nav should not include decorative edge numbers, extra helper text, or a separate `Pages` button when links are already visible. The visual language also needs more contrast and definition because the current pass feels too soft.

### Future rule

Use direct destination labels only. Remove numeric markers, redundant trigger buttons, and extra visible metadata from the desktop nav. Balance softness with sharper hierarchy, firmer contrast, and clearer structure.

## LESSON-017 — Validate feedback against the actual Website

Timestamp: 2026-06-24 19:17 ET  
Context: Feedback workflow correction for screenshots and current-site notes  
Status: active

### Lesson

Screenshot, visual, and current-site feedback should be checked against the live/current Website before the assistant decides what page, component, design pattern, interaction, asset, or lesson it applies to.

### Future rule

Source-check the visible site first, store the reusable public-safe lesson second, and keep feedback-only passes inside `.agent/` unless implementation is explicitly requested.

## LESSON-019 — Make paper material feel primary

Timestamp: 2026-06-24 19:38 ET  
Context: Screenshot review of current About page material treatment  
Status: active

### Lesson

The Website should read as handmade paper/collage before it reads as soft translucent UI. Tactile depth should come from paper fiber, torn or uneven edges, layered sheet shadows, scanned imperfections, and cutout overlaps across the shared page system.

### Future rule

When adding or refining atmosphere, cards, hero stacks, or page sections, make the paper material visible enough that the page feels papery without sacrificing readability, contrast, or calm structure. Gloss and gradients should support the paper feeling instead of replacing it.

## LESSON-020 — Make the top bar feel like layered paper

Timestamp: 2026-06-24 19:41 ET  
Context: Screenshot review of current top header bar on the About page  
Status: active

### Lesson

The shared top bar should feel like a tactile paper strip or paper tab laid over the top of the page, not a smooth glassy UI capsule. Its material treatment should use existing texture assets or shader-like CSS to create paper grain, slight edge irregularity, and a visible soft drop shadow.

### Future rule

When refining the shared header, preserve direct navigation readability and top-edge attachment, but make the surface read as paper first: textured cream layer, subtle uneven edge or paper mask, tactile shadow below, and restrained material effects that do not hide focus states or reduce contrast.

## LESSON-021 — Make polaroid frames carry content

Timestamp: 2026-06-24 19:41 ET  
Context: Screenshot review of homepage polaroid/card treatment  
Status: active

### Lesson

Polaroid/photo frames should not stay as empty decorative layers behind the page. When the polaroid motif appears in the content system, the inner photo area should be filled with useful page content, artwork, preview material, or route information so the frame becomes a real card surface.

### Future rule

When refining homepage doors, detail cards, or portfolio/store previews, use the cream frame and dark backing as a readable content container: fill the center, preserve hierarchy and contrast, and avoid leaving polaroid assets as background-only decoration unless they are clearly secondary atmosphere.

## LESSON-022 — Make shared cards read as paper pieces

Timestamp: 2026-06-24 19:44 ET  
Context: Screenshot review of current About page card and next-step surfaces  
Status: active

### Lesson

Shared card surfaces should not feel like generic rounded UI panels. They should read as individual handmade paper or polaroid pieces placed on the page, with content inside the material surface instead of a soft translucent card shell.

### Future rule

When refining `.page-card`, `.detail-card`, `.source-link`, `.link-card`, `.reader-card`, `.pathway-link`, or continuity bands, reduce the uniform rounded-card feeling and use paper-piece cues: cut or torn edges, uneven shapes, layered backing shadows, subtle texture, content-bearing centers, and restrained polaroid framing while preserving readability and accessible focus states.

## LESSON-023 — Keep page intro titles supportive

Timestamp: 2026-06-24 21:48 ET  
Context: Internal alignment for PageIntro subtitle feedback  
Status: active

### Lesson

Major page intro titles should behave as supportive subtitles, not as competing hero headlines.

### Future rule

Keep major `PageIntro` titles 2–5 words, thinner, slightly smaller, and on one line where possible. They should orient visitors beneath the true homepage hero language instead of creating a second hero system on every route.

## LESSON-024 — Use torn-edge card silhouettes instead of rounded corners

Timestamp: 2026-06-24 22:45 ET  
Context: Shared card edge feedback  
Status: active

### Lesson

Shared card surfaces should use squared, cut, or slightly uneven torn-paper silhouettes instead of rounded card corners. Edge shadows should make the card feel like lifted paper, not a rounded digital panel.

### Future rule

When refining shared card-like surfaces, remove rounded-corner card language and use cut-paper `clip-path` shapes, edge shadows, layered paper offsets, and texture. Preserve readable content, visible focus states, and calm hierarchy while making the card edge feel physical.

## LESSON-025 — Render photo centers instead of background decals

Timestamp: 2026-06-24 23:49 ET  
Context: Screenshot feedback on polaroid/photo centers and placeholder shot areas  
Status: active

### Lesson

Photo and polaroid centers should not remain blank, dark, or decal-like when they are part of the content layout. They should render authored placeholder images, staged shot backgrounds, page previews, or route-specific visual material so the paper/photo system feels finished and professional.

### Future rule

When refining hero polaroids, page cards, gallery tiles, Portfolio previews, or Store previews, fill the image center with composed visual material. Placeholder imagery is allowed when live assets do not exist yet, but it must be honest, route-relevant, brand-aligned, and not imply fake products or completed case studies.

## LESSON-026 — Use alternating scrollable image galleries

Timestamp: 2026-06-24 23:49 ET  
Context: Screenshot feedback requesting a new gallery direction with internal scrollable images  
Status: active

### Lesson

The Website should use gallery experiences that feel like a sequence of placed paper/photo pieces, not one static decorative background image. Galleries should alternate image-forward cards with short text/context cards so the visual rhythm feels authored, useful, and alive.

### Future rule

When adding a gallery, prefer accessible native scrolling, visible overflow hints, keyboard/focus support, paper/photo frames, route-specific placeholder imagery, and short captions. Avoid dense carousel chrome, hidden controls, image-only clutter, or background decals pretending to be gallery content.
