# X-DS — de-slop: flat, proper lighting across value.js, keyframes.js and fourier, with the glass root (minted 2026-10-06, COHESION §0ej)

## Authority — the owner, verbatim (2026-10-06)
On a dark frame of a keyframes demo card (a "Reverse" button, a track with a solid violet dot and a dashed ghost dot, and an eye icon floating at the ghost dot's corner; frame `docs/tranches/X/waves/owner-2026-10-06/kf-floating-eye-overlit.png`):
*"visibility icon is just floating meaninglessly. And the cube and other items in ALL of our UIs (value, keyframes, fourier) are OVERLY shaded, lighted and reek of affectation and slop. Do at least 12 critical passes to abrogate this, clean it up, and refine and revive our original styles hereof--this note should be made and done for glass-ui, too. The original keyframes.js ui was flatly lit and proper design and so forth"*

## The canon (what "flat and proper" means here)
- **Lighting is flat.** No specular highlights, gleam sweeps, inner top-light bevels, rim lights, glow halos, coloured drop-glows, bloom, multi-layer shadow stacks or "lit 3D" shading on UI chrome.
- **Elevation is spare:** at most one quiet, neutral shadow, and only where a surface truly floats (a menu or popover over content). Cards and panes sit on the page with a hairline border or a tone step, not a shadow halo.
- **Fills are flat:** solid tokens, no decorative gradients on controls. Gradients survive only where they ARE the content (a colour picker's gradient, a gradient editor, the aurora as the app's declared identity backdrop).
- **3D content** (the keyframes cube, any WebGL or CSS-3D demo object) uses flat or near-flat shading: flat faces with a small tonal step per face, no glossy speculars, no glow or bloom, no heavy ambient occlusion.
- **Motion is purposeful:** no idle shimmer, pulse or breathe on chrome. Motion that carries meaning stays: transitions, the demos' own animated subjects, the scrub.
- **Every glyph has a home:** an icon is anchored to the control it labels (inside it, or in a labelled row), never hovering at a corner with no frame or meaning.
- **Identity is kept:** each app's identity hues, type and its own motion subjects stay (§0dm law: removing identity is an owner DESIGN-RULING, never a cure). Flattening the lighting is not the same as removing colour.
- **Revive the originals:** each app's pre-glass styles are the reference for proportion, density, borders and tone:
  - keyframes.js: the original UI, which the owner names as "flatly lit and proper design"; see the branch `kf-sacred-snapshot-2026-09-17` and the pre-glass history;
  - value.js: the pre-glass color-picker era;
  - fourier: the pre-X.F.W11 chrome (before `53aaa6f`).
  Revive means re-derive their tone, borders and density on today's glass components, not checking out old files.

## Scope
- **Consumers** (this wave): value.js `demo/**` (not `demo/@/components/ui/**`), keyframes.js `demo/**`, fourier `web/src/**`. Every consumer-added shadow, glow, gradient, gleam, specular, text-shadow, filter or affected motion on chrome is removed or flattened at its root (tokens before instances).
- **glass-ui** (the root; READ-ONLY to us): relay **O-87 FLAT-LIGHTING** asks glass to run the same canon and the same ≥12 critical passes on its own surfaces and tokens (elevation, gleam, specular, glow, inset highlights, button press-light, dock plate, card, the glass material's lighting). Consumers never override glass's lighting with local CSS; a glass-owned excess is honest-RED until glass lands it.

## Method — at least 12 critical passes per app
Each pass:
1. Capture served frames (light and dark; 1440 and 390; every route or scene), **headless only (§0ei)**.
2. A fresh critic (one that did not cure in the previous pass) names every violation of the canon with location and cause.
3. A cure seat removes the violations at the root and re-captures.
- Pass 1 is preceded by **archaeology**: recover each app's original styles from git history into a short canon note per app, `docs/tranches/X/execution/DS/<app>-canon.md`, citing the commits and frames.
- The loop runs **≥ 12 passes**. It ends only when a pass's critic finds nothing above trivial, and in any case not before pass 12.

## Gates
- Each app's type-check, unit tests and e2e stay GREEN ×2. A visual-checkpoint golden changes only as a named re-baseline.
- A **lighting census** (a script counting `box-shadow` layers, `text-shadow`, `filter: drop-shadow|blur` on chrome, gradient fills on controls, and `@keyframes` that loop on chrome) falls to the canon's allowance. RED before, GREEN after.
- Before and after frames are committed per pass (force-added) under `docs/tranches/X/evidence/DS/<app>/pass-NN/`.
