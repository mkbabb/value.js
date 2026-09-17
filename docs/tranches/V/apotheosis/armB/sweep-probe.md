# armB — LIVE PROBE sweep (value + kf demos)

Model serving this seat: `claude-opus-4-8[1m]` (Opus, NOT Fable — declaration≠execution,
P0.1 law; reported per C17). Written 2026-07-19.

## Probe status — what ran, what was blocked

- **New browser captures this pass: 0.** The sole playwright-MCP Chrome profile
  (`.../ms-playwright-mcp/mcp-chrome-83447af`) was **held by a live concurrent arm**
  (Chrome pid 43346, `SingletonLock -> MacBook-Pro-43346`) for the entire window. Every
  `browser_navigate`/`browser_resize`/`browser_close` returned
  *"Browser is already in use … use --isolated"*; the MCP exposes no `--isolated` flag.
  A bounded 300 s wait for the lock to release **timed out still-locked**. Per the task's
  fallback clause I ground the kf-desktop gap in source (file:line) and union the
  **evidence set A** annotations (prior captures at `fable-era/probe/`).
- **Evidence set A is sufficient for the value marks (C2/C3/C10) and for kf-mobile C4.**
  The one genuine gap left unshot is **kf DESKTOP** (single-screen layout + cube) and a
  *playing* kf animation on mobile; those are code-grounded below, flagged as prediction.

## Evidence set A — annotated union (prior captures, `fable-era/probe/`)

Value desktop (1440×900):
- `01-value-desktop-main-1440.png` / `value-desktop-1440-main.png` — value demo main
  screen, glass-ui dock + color-picker canvas. Baseline (no mark; "extant UI is quite
  good", C10).
- `02-value-desktop-toolsbar-open-1440.png` / `value-desktop-1440-toolsbar.png` — the
  desktop **tools bar OPEN**. This is the affordance that is **LOST on mobile (C3)** —
  contrast against mobile below.
- `03-value-desktop-gradient-1440.png` — gradient screen; easing/interpolation surface
  present at desktop scale (C2 desktop reference).

Value mobile (390×844):
- `04-value-mobile-home-390.png` / `value-mobile-390-main.png` — mobile home. The
  desktop tools bar is **absent**; tooling is collapsed behind a kebab. **C3 evidence.**
- `05-value-mobile-kebab-menu-390.png` / `value-mobile-390-kebab-menu.png` — the kebab
  menu is where the toolbar migrated on mobile: a dropdown list, **not** a first-class
  bar. **C3 evidence (the "lost toolbar" is a kebab).**
- `06-value-mobile-gradient-easing-390.png` / `value-mobile-390-gradient-top.png` —
  gradient + easing entry point at mobile width.
- `value-mobile-390-easing-editor.png` (close-up) — the **easing-curve selector on
  mobile**: a header row (`1 → 2 · linear`), a full-width gradient bar, then a row of
  **large, heavily-rounded pill chips** (`linear / ease / in / out / in-out / sine…`)
  each holding a **low-resolution curve thumbnail**, over a `cubic-bezier(0,0,1,1)`
  readout. This is exactly the owner's **C2** complaint: "far too rounded, too large,
  low-res." **C2 primary evidence.**
- `value-mobile-390-easing-strip.png` — the collapsed easing strip (secondary C2).
- `value-mobile-390-sliders-closeup.png` — the **L/a/b/α slider stack**: gradient-filled
  tracks (dark-red→pink L; green→pink a; pink→orange b; checker→pink α) with numeric
  readouts (92.0 / 88.8 / 20.0 / 82.7%). This is the **slider area C10 targets** for
  BREATH-OF-LIFE watercolor-dot backgrounds + refined curves. **C10 evidence.**

kf mobile (390×844) — I re-viewed these two to confirm before spending budget:
- `kf-mobile-390-landing.png` — kf demo landing on mobile. **Concrete C4 brokenness:**
  the 3-color cube **overflows the viewport bottom-right (clipped)**; the hero copy
  "Select an animation… from the list below, then press Play. or drag M. cubert 😖"
  **overlaps the cube body** (text over geometry, no z/layout separation); the colored
  axis lines sprawl edge-to-edge across the whole screen with no framing. A glass dock
  (home / share / keyboard / settings top; play / list / reset bottom) floats but the
  **stage subject and hero text collide**. **C4 primary evidence.**
- `kf-mobile-390-animation-list.png` — the animation picker open (Rotations / Matrix /
  Hover) as a bottom-sheet popover; it opens **over** the already-overlapping hero+cube,
  compounding the collision. **C4 evidence.**

## kf desktop / playing-state gap — code-grounded (probe blocked)

kf demo source at `keyframes-v-exec@` (pin: `package.json:3` version `6.0.0`;
`package.json:70` `"@mkbabb/value.js": "4.0.0"` EXACT — confirms the co-land wedge,
L1 §6 / P4.2). Scene set = `demo/scenes/{easing,square,cube,amiga,sequence,spring}`.

- **Multi-touch IS partially implemented, not absent** (tempers C4's "mostly broken"):
  `demo/scenes/cube/orbital-drag/composables/useOrbitalPointer.ts` tracks
  `activeTouchPointers` (a `Set<number>`, :68), adds/deletes by `event.pointerId`
  (:70,:80), detects pinch (`wasPinching = activeTouchPointers.size >= 2`, :81),
  carries a `justExitedPinch` reset flag (:55) and a separate `touchSensitivity`
  (:9,:26). So the **quaternion orbital-drag already has a 2-pointer/pinch path**; C4's
  "cube must fully support multi-touch" is a *refinement/completion* target, not a
  from-zero build. The pointer reader dispatches to `updateRotation`/`applyRotation`/
  `updateTranslation`/`updateScale` appliers owned by `OrbitalDrag` (:11-19).
- **Mobile layout is substantially engineered**, which sharpens the mark to "still
  renders broken despite effort": `demo/styles/layout.css:180` `@media (max-width:1023px)`
  builds a **full-bleed fixed stage** with `--work-area-max-width:100dvw`, dvh-based
  height caps, `env(safe-area-inset-top)` handling, and a STABLE band-reserve to stop
  the stage rect breathing when the bottom sheet toggles (comment: the live chain
  "oscillates ±8px with the dock reflow"). `demo/styles/style.css:289` steps dock label
  font down one rung < lg so the pill fits. Yet the set-A capture shows the **cube+hero
  overlap persists** — i.e. the stage/subject sizing does not reconcile the cube's 3D
  bounding box with the hero copy at 390 px. **This is the C4 defect, live on disk.**
- Desktop single-screen layout: `demo/styles/layout.css:155` + anchor-positioning
  (`@supports (anchor-name)`, min-width:1024px) tethers the two dock bands to the stage
  cell (`[data-dock-tether="top"|"bottom"]`). Desktop is the *reference* the owner wants
  the mobile app to reach (C4: "optimized for desktop affordances too"). **Not shot** —
  prediction only; recommend a follow-up desktop capture when the browser frees.

## Load-bearing conclusions for the formation

- **C2 / C3 / C10 are fully evidenced on value** (set A). C2 = oversized/rounded/low-res
  easing chips; C3 = toolbar demoted to a kebab on mobile; C10 = the L/a/b/α slider
  stack is the watercolor-suffusion surface.
- **C4 is evidenced on kf mobile** (set A) as a real render defect (cube overflow +
  hero/geometry overlap), and the code shows it is a *refinement* of an already-built
  multi-touch + mobile-layout system, not a greenfield.
- **kf desktop remains un-photographed** this program; if a desktop capture is required
  as π/DELTA evidence it must be re-attempted once the shared browser profile releases.
