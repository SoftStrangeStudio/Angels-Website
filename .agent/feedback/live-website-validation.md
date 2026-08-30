# Live Website Validation Protocol

Use this protocol before turning screenshot feedback, visual notes, or goal corrections into Website lessons.

## Purpose

Feedback should be anchored to the actual Website whenever the feedback is about something visible, interactive, or already implemented.

This prevents the assistant from guessing what a screenshot shows, applying feedback to the wrong component, or changing the public site when Angel only wanted the feedback stored for the next run.

## Source order

Use these sources in this order:

1. **Live Website** — `https://softstrangestudio.github.io/Angels-Website/`
2. **Current Website source** — `app/page.jsx`, `app/site-chrome.jsx`, `app/site-data.js`, route files, CSS, and `public/` assets
3. **Project memory** — `.agent/matrices/semantic-index.md`, `.agent/lessons/active-lessons.md`, and the matching matrix files
4. **Feedback history** — `.agent/feedback/feedback-log.md`, `.agent/lessons/lesson-log.md`, and `.agent/references/`

If the live Website cannot be loaded, validate against the current repo source and say that live visual validation was unavailable.

## Screenshot validation checklist

When Angel pastes a screenshot, check whether it appears to be part of the Website before storing or applying feedback.

Ask:

- Does the screenshot show known Website routes, copy, page structure, assets, or navigation?
- Does it show the current header identity, direct page labels, hero lockup, page cards, notes reader, portfolio page, store page, or known atmosphere assets?
- Which semantic item does it map to: page, component, design pattern, interaction, asset, content source, metric, or lesson?
- Is it a screenshot of the current live site, an older pass, a generated reference, or an external inspiration image?
- Does the feedback describe a reusable project rule, a one-time fix, or an unclear note?

## Feedback-only rule

When Angel gives feedback and asks to add/store/save it as feedback, do **not** edit the public Website in the same pass unless Angel explicitly asks to implement the change now.

Feedback-only passes should update `.agent/` files only, such as:

- `.agent/feedback/feedback-log.md`
- `.agent/feedback/feedback-inbox.md`
- `.agent/lessons/lesson-log.md`
- `.agent/lessons/active-lessons.md`
- `.agent/matrices/*`
- `.agent/references/*`
- `.agent/changes/change-log.md`

The next implementation run can read `.agent/` and apply the feedback to the site.

## How to write the feedback record

Every screenshot-driven feedback record should include:

- the validation source used: live site, repo source, or both
- the matched semantic item IDs when known
- whether the screenshot appears current, older, external, or unclear
- the extracted public-safe signal
- whether the record is feedback-only or approved for implementation

## When not to create a lesson

Do not create a new lesson if the screenshot cannot be connected to the Website and Angel did not clearly frame it as a direction for the site.

Instead, add a short public-safe note to `.agent/feedback/feedback-inbox.md` with status `needs validation` or `needs clarification`.

## Rule of thumb

Validate the source first. Store the reusable lesson second. Change the live site only when implementation is explicitly requested.
