# Pages path repair and vertical paper runway

Timestamp: 2026-08-30 18:34 EDT

## Intent

Restore the complete styled GitHub Pages export at the renamed repository path and add the approved vertical paper-only continuation without trapping native input or changing existing content dimensions.

## Implementation

- Set Next.js `basePath` and `assetPrefix` to `/Angels-Website`.
- Migrated active route, image, audit, and chrome paths to the same prefix.
- Added `PaperScrollExperience`, `paper-scroll.frag`, and an SVG fallback only to PAGE-001.
- Added external float/vector uniforms and manual rendering to the existing dependency-free custom element.
- Left `.github/workflows/deploy.yml` byte-unchanged.
- Updated only the stale URLs in the separate audit and visual-tour workflows after their first runs failed on `/Website/`.

## Validation boundary

- `npm ci` and `npm run build` pass.
- The export includes the shader runtime, fragment shader, fallback, route HTML, CSS, scripts, and editorial images under the correct Pages prefix.
- Browser/WebGL evidence is completed against the deployed revision after the single push.
