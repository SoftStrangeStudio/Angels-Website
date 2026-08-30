# Interactions Matrix

| Interaction ID | Name | Trigger | Expected Result | Accessibility Notes | Lesson | Status |
|---|---|---|---|---|---|---|
| INT-012 | Downward Paper Continuation | Scroll below homepage content | One transition viewport passes, then the procedural paper advances only with downward deltas while the native page can still scroll upward | No wheel/touch/key handlers; pointer-transparent shader; reduced motion keeps a stationary paper frame | LESSON-041 | active |
| INT-001 | Open Pages Menu | Click or focus the `Pages` summary | Folder panel opens with four destination links | Native `details` behavior; keep focus states visible | LESSON-003 | active |
| INT-002 | Back to Top | Click `Angel Berger` in header | Page scrolls to top | Anchor target is `#top` | LESSON-002 | active |
| INT-003 | Scroll Title Sequence | User scrolls down homepage | User sees Welcome, To, Soft Strange Studio | No required animation; readable as normal content | LESSON-001 | active |
| INT-004 | Open Page Card | Click a destination card | Opens public Blog page/feed/sample | Link text and descriptions should stay human-readable | LESSON-002 | active |
| INT-005 | Future Embedded Reader | Select a post inside Website | Render markdown from Blog feed | Needs keyboard and reduced-motion review | LESSON-004 | planned |
| INT-006 | Mouse-Reactive Background | Pointer moves across homepage | Atmospheric layer responds subtly to pointer location | Must not block content; should respect reduced motion | LESSON-006, LESSON-009 | proposed |
| INT-007 | Gloss/Scratch Overlay Response | Scroll or hover over tactile surface | Gloss/scratch layer creates subtle physical depth | Should remain readable and not impair contrast | LESSON-010 | proposed |
| INT-008 | Top Edge Entry | Page load and scroll | Header feels attached to the top viewport edge | Header controls must remain reachable and readable | LESSON-011 | active |
| INT-009 | Scroll-Rotating Hero Lockup | User scrolls through hero | Left-docked title rotates subtly while staying readable | Reduced-motion users should receive the static lockup | LESSON-012 | active |
| INT-010 | Direct Default-Open Navigation | Desktop header load and focus | Direct page links are already visible with no separate Pages trigger | Keep focus states visible; provide mobile fallback if a compact trigger is required | LESSON-013, LESSON-015 | proposed |
