# S-15 — Aliasing / dithering around component edges, palettes, watercolor dots

**Lane:** aliasing-dithering · **Mode:** AUDIT ONLY · **Repo:** value.js @ c5aa091 (tranche-q)
**Live probe:** http://localhost:9000 (Playwright/Chromium, **DPR 1** — see §Caveat; user is Retina DPR 2)
**User shots:** `~/Downloads/Screenshot 2026-07-04 at 16.13.52.png` (palette-card rounded corner over warm-pink field — stair-stepped curve) · `16.14.00` (WatercolorDot at card corner — banded pink + banded cream body + clipped overflow)
**Own capture:** `docs/tranches/S/audit/lanes/../../../../.playwright-mcp/s15-picker-dpr1.png` (dpr1 reference)

## TL;DR — S-15 is THREE distinct mechanisms, not one

"Aliasing/dithering" is a percept bucket. Forensics decompose it into: **(A)** non-antialiased
border-radius corner clips on self-compositing surfaces (the stair-step in 16.13.52); **(B)** 8-bit
gradient **banding** on large low-contrast washes — which reads as "dithering" but is actually the
*absence* of dither since glass-ui retired the universal grain plane (the cream-body + aurora banding
in 16.14.00); **(C)** the WatercolorDot's SVG `feDisplacementMap` wet edge degrading to a coarse sRGB
raster on Safari (the dot-edge fuzz in 16.14.00). The user's own hypotheses **grain-tiling-at-wrong-DPR**
and **canvas-DPR-mismatch-on-dots** are **RULED OUT** (evidence below).

---

## P1 · S-15-A — Composited-layer corner aliasing: border-radius clip is not antialiased

**Mechanism.** Chrome (Metal/ANGLE) and WebKit do **not** antialias a `border-radius` clip when the
element is promoted to its own compositing layer (by `transform`, `backdrop-filter`, `filter`, or
`will-change`). The rounded corner is rasterized at layer bounds with a hard 1-bit clip → visible
stair-stepping on the curve. This is the 16.13.52 palette-card corner.

**Measured (live probe, `getComputedStyle` sweep of all rounded surfaces):**
- Picker card: `.rounded-card` **br 16px + `transform` SET + `backdrop-filter: blur(8px) saturate(1.3) brightness(1.14)`** — self-composited by BOTH a transform and a backdrop-filter.
- A second `.rounded-card`: **br 16px + `overflow: hidden auto` + backdrop-filter** — the overflow clip + backdrop-filter recipe.
- **12** rounded surfaces carry `backdrop-filter` + `border-radius`: `glass-dock` (pill 9999px), `segmented-tabs`/`segmented-indicator`, `space-capsule veil-surface`, 4× `slider-range glass-liquid-fill`, the `rounded-card` glass tiers. Every one is a composited rounded box.
- PaletteCard (`demo/@/components/custom/palette-browser/PaletteCard.vue:11`): `rounded-card border border-card-edge bg-card overflow-hidden shadow-cartoon-sm ... hover:shadow-cartoon-md`. The `overflow-hidden` clips `PaletteColorStrip` (itself `overflow-hidden`, `PaletteColorStrip.vue:5`) — the color band fills to the corner. A plain `overflow:hidden`+radius clip is normally AA'd, **but** the moment an ancestor composites the subtree (the S-9 route-transition `transform`, or a scroll-shrink) the whole card rasterizes into a layer and the strip's rounded clip loses AA → the 16.13.52 stair-step.

**Root routing.**
- Glass surfaces (backdrop-filter + radius): the clip belongs to glass-ui's material/capsule/dock/liquid-fill recipes (`../glass-ui/src/styles/glass/*.css`). Cure at the producer: clip the glass corner with `-webkit-mask`/`mask` (mask IS antialiased on composited layers) instead of `overflow:hidden`+`border-radius`, or keep the rounded box off its own layer where the blur permits. → **glass-ui producer** (per S-21 root discipline).
- PaletteCard's own `overflow-hidden rounded-card` clip of the color strip: → **value.js demo** (mask the strip's corners, or radius-inherit the strip and drop the card `overflow-hidden`).

**Candidate wave-items:** (1) glass-ui: mask-based corner clip for glass surfaces (one primitive rule, not per-recipe). (2) demo: PaletteCard color-strip corner via `mask`/radius-inherit, drop card-level `overflow-hidden`. (3) audit the S-9 route-transition to ensure the pane subtree is not left on a permanent compositing `transform` at rest (a lingering `matrix(1,…)` — cf. glass-ui BG.W-CORNER-ALIAS-KILL, which fixed exactly a `route-enter { fill: both }` permanent-transform trap in the sibling).

## P1 · S-15-B — 8-bit gradient banding (the real "dithering"): the universal grain/dither plane was retired

**Mechanism.** Large, low-contrast smooth gradients rendered in 8-bit sRGB **band** (visible contour
steps). A dither/grain overlay masks it. glass-ui's `BG.W-PAPER-GRAIN-OPTIN` (see
`../glass-ui/docs/tranches/BG/audit/visual/BG.W-PAPER-GRAIN-OPTIN-DELTA.md`) **RETIRED the universal
`<PaperBackdrop class="fixed inset-0">` grain plane** and made grain **per-surface opt-in**. The demo's
big washes now carry **no** grain → the banding that grain used to hide is exposed. The user's "dithering"
is the *absence* of dither, not a texture artifact.

**Measured (live probe):**
- Picker-card wash: `radial-gradient(60% 55% at 80% 16%, oklch(0.96 0.04 78 / 0.5) …)` — a very-low-contrast, large radial → textbook banding.
- Aurora atmosphere CSS-fallback (`demo/@/composables/color/useAtmosphere.ts:72`): on `renderMode:"css"` devices (SwiftShader / low-power / Safari-blocklisted GPU, resolved at `useAtmosphere.ts:58`) the full-viewport atmosphere is `paletteToCssGradient(resolveAtoms(...).palette)` — a **plain linear gradient with no dither**. Full-viewport smooth gradient = worst-case banding. (The WebGL2 `useAurora` path should dither in-shader — **verify** the producer does; if it does, the banding is confined to the CSS-fallback + card washes.)
- WatercolorDot inset `box-shadow` falloffs (`../glass-ui/src/components/custom/watercolor-dot/WatercolorDot.vue:232-235`) band on the low-contrast pink — the banded cream/pink in 16.14.00.

**Root routing.**
- CSS-aurora fallback should emit a **dithered** gradient (add a tiled alpha-noise mask): → **glass-ui/aurora producer** (`paletteToCssGradient`).
- Verify the WebGL aurora shader applies ordered/blue-noise dither before 8-bit output: → **glass-ui/aurora producer**.
- The demo's big card/pane washes re-opt-in glass-ui's `--paper-grain-tooth` register (`../glass-ui/src/styles/paper.css:59`, `grain-overlay.css`) as a dither: → **value.js demo** (consume the producer register on the wash surfaces — this is the S-21-correct "opt back in per surface" after the universal retirement).

**Candidate wave-items:** (1) glass-ui: dither the `paletteToCssGradient` fallback + confirm shader-side dither on the WebGL path. (2) demo: opt the atmosphere/card/pane washes into a low-α grain-overlay dither. (3) prefer `oklch`/`oklab` gradient interpolation with more mid-stops on the biggest washes to shrink per-step Δ.

## P2 · S-15-C — WatercolorDot wet edge aliases on Safari (sRGB filter fallback)

**Mechanism.** `WatercolorDot.vue:170-192` sets `color-interpolation-filters="linearRGB"` on the
`feTurbulence`+`feDisplacementMap`. The component's OWN source comment (`WatercolorDot.vue:150-160`)
documents: *"Safari renders SVG filters in sRGB regardless of `color-interpolation-filters` (a known
WebKit limitation), so the smooth-AA edge is a Chrome/FF nicety only."* → on Safari (the S-22 mandate)
the wet displaced edge is a coarser, aliased raster — the dot-edge fuzz in 16.14.00. At Retina DPR 2 the
`feTurbulence` userspace noise (`baseFrequency="0.05"`, `scale="1.3"`) is upsampled, coarsening further.

**Root routing.** → **glass-ui producer** (`WatercolorDot.vue`). Same component S-4/S-8 touch. Tune
`baseFrequency`/`numOctaves`/`scale` for the sRGB-Safari path, or device-resolve the wet-edge raster.
Fully producer-side; the demo consumes the dot unmodified (per `demo/CLAUDE.md` — the fork was extirpated
at N.W5.C, all consumers import from `@mkbabb/glass-ui/watercolor-dot`).

**Candidate wave-item:** glass-ui: Safari-path wet-edge recalibration for WatercolorDot (coordinate with the S-4 blob + S-8 dock-dot waves — same primitive).

---

## Caveat + ruled-out hypotheses (measured, not assumed)

- **DPR:** the live probe ran at `window.devicePixelRatio === 1`; the user sees Retina **DPR 2**. Corner-AA (A) and banding (B) both change at 2×. Findings A/B/C are DPR-independent in *kind* (they reproduce at 1×); severity is worse at 2×. Any implementation wave must re-verify at DPR 2 on real Chrome + Safari (S-22).
- **RULED OUT — "grain/noise texture tiling at wrong DPR":** there is no universal grain plane to mistile — glass-ui *retired* it (`BG.W-PAPER-GRAIN-OPTIN`). The banding is the *absence* of grain (S-15-B), not misregistration.
- **RULED OUT — "canvas DPR mismatch on dots":** the watercolor dots are **SVG/CSS**, no canvas context (`WatercolorDot.vue` header: *"NO drawing context — no WebGL/WebGPU/Canvas2D"*). Dot aliasing is the SVG filter (S-15-C). The demo's real canvases (`gamutOverlayPaint.ts:198` caps DPR; `useMixingAnimation.ts:95-99` scales by DPR) handle DPR correctly — canvas DPR is not an S-15 root.
- **PARTIAL — "backdrop-filter banding":** backdrop-filter's dominant S-15 contribution is the composited-corner clip (S-15-A), not band; the blurred backdrop can band mildly but the load-bearing banding is the low-contrast gradient washes (S-15-B).
- **CONFIRMED — "border-radius + transform subpixel snapping":** this IS S-15-A (composited-layer corner clip).
- **CONFIRMED — "SVG watercolor filter feTurbulence raster edges":** this IS S-15-C (Safari sRGB path).

## Adjacent (not this lane, noted): S-11 API
Console shows **CORS failure** hitting **prod** `https://api.color.babb.dev/colors/approved` from
`http://localhost:9000` (ACAO = `https://color.babb.dev` ≠ origin) — the local demo is not pointed at
the local API. Corroborates S-11; route to the api/config lane.

## Ranked routing summary
| Finding | Sev | Mechanism | Root |
|---|---|---|---|
| S-15-A | P1 | border-radius clip not AA'd on composited (transform/backdrop-filter) layers | glass-ui producer (glass surfaces) + value.js demo (PaletteCard strip) |
| S-15-B | P1 | 8-bit banding on low-contrast washes; universal grain/dither retired | glass-ui/aurora producer (CSS+WebGL dither) + value.js demo (opt washes into grain) |
| S-15-C | P2 | WatercolorDot `feDisplacementMap` → coarse sRGB raster on Safari | glass-ui producer (WatercolorDot.vue) |
