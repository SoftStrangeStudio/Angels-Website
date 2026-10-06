# Interactions Matrix

| Interaction ID | Name | Trigger | Expected Result | Accessibility Notes | Lesson | Status |
|---|---|---|---|---|---|---|
| INT-012 | Native Paper Scroll | Scroll the homepage toward the footer or back up | Procedural paper offset follows native scroll at 0.65 speed; document ends at real content and footer | No wheel/touch/key interception; pointer-transparent shader; reduced motion freezes the paper and disables reveals | LESSON-041 | active |
| INT-001 | Mobile Studio Menu | Activate Menu at widths up to 720px | Foldout shows six links; selection or Escape closes it | Native details keyboard behavior, visible focus, Escape returns focus to summary, reduced motion disables reveal | LESSON-003 | active |
| INT-002 | Back to Top | Click `Angel Berger` in header | Page scrolls to top | Anchor target is `#top` | LESSON-002 | active |
| INT-003 | Scroll Title Sequence | User scrolls down homepage | User sees Welcome, To, Soft Strange Studio | No required animation; readable as normal content | LESSON-001 | active |
| INT-004 | Open Page Card | Click a destination card | Opens public Blog page/feed/sample | Link text and descriptions should stay human-readable | LESSON-002 | active |
| INT-005 | Future Embedded Reader | Select a post inside Website | Render markdown from Blog feed | Needs keyboard and reduced-motion review | LESSON-004 | planned |
| INT-006 | Mouse-Reactive Background | Pointer moves across homepage | Atmospheric layer responds subtly to pointer location | Must not block content; should respect reduced motion | LESSON-006, LESSON-009 | proposed |
| INT-007 | Gloss/Scratch Overlay Response | Scroll or hover over tactile surface | Gloss/scratch layer creates subtle physical depth | Should remain readable and not impair contrast | LESSON-010 | proposed |
| INT-008 | Top Edge Entry | Page load and scroll | Header feels attached to the top viewport edge | Header controls must remain reachable and readable | LESSON-011 | active |
| INT-009 | Scroll-Rotating Hero Lockup | User scrolls through hero | Left-docked title rotates subtly while staying readable | Reduced-motion users should receive the static lockup | LESSON-012 | active |
| INT-010 | Desktop Navigation Banner | Header loads above 720px | All six destinations remain visible in the banner | Visible keyboard focus and active-route cue | LESSON-013, LESSON-015 | active |
| INT-013 | Bottom Footer Reveal | Reach the document bottom, or follow Contact | Matching paper footer slides upward and sits flush with the bottom; scrolling up leaves a 12px edge peek | Hidden footer is inert; reduced motion removes transitions | LESSON-041 | active |
