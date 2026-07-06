# SEED w6-blob-redress — the blob consumer-half redress (S.W6 W6-4 / S-4)

**Lane** S / prototype-seed · **Worktree** `wf_01c28a82-3c2-5` cut from tranche-q HEAD ·
**Installed producer** glass-ui `tranche/BG` @ 4.2.0, dist built 2026-07-04 16:02 ·
**Verdict: VIABLE_WITH_AMENDMENTS** (consumer half proven live; two spec clauses refuted by
measurement; the L5 boundary list is grounded and longer than the wave doc's by one item).

---

## §Intent

SYNTHESIS §3.8 item **W6-4** (transcribed at `waves/S.W6.md` §Scope): "Blob hero redress, demo
half (S-4 anchor — REDRESS, not reinvent): footprint `clamp(9rem,18cqi,13rem)`, visible bead
≥96px; corner-break placement LAW owned by the pane slot (bead center on the radius origin,
≥40% overflow, nothing paints over it); mobile all-or-nothing per Q7 [ABSENT at <lg, S.md §12];
ramp ceiling tracks the picked C; mood FSM KEPT…; PRM = static single-frame render. Producer
halves (satellites-at-rest, scale-aware deformation, single-GPU-surface policy, HERO preset,
chord-dent, DPR, `uSatColor[]`) = letter L5 + the W8 consume." Anti-pattern guard: §0.6 NO blob
reinvention; consume/config/placement only. This seed proves what the consumer can do TODAY
against the installed tranche/BG dist, and hardens the L5 boundary.

## §What was built (worktree file:line map)

| File | Change |
|---|---|
| `demo/@/components/custom/color-picker/visual/HeroBlob.vue:8-22` | GooBlob width consumes the caller-owned `--blob-fp` custom property (`w-(--blob-fp)`); the mobile `w-24` variant DELETED (Q7 absence is a mount decision upstream, so no <lg width exists) |
| `demo/@/components/custom/color-picker/ColorPicker.vue:66-98` | HeroBlob moved OUT of the Card to the `.pane-shell` layer as a LATER sibling (the slot's topmost ornament — paints above the z-10 CardHeader by source order, ZERO z classes); corner-break placement math: `--blob-fp: clamp(11rem,26cqi,13rem)`; `top/right: calc(var(--radius-card) − var(--blob-fp)/2)` puts the bead CENTER on the corner-radius origin; `v-if="blobPresent"` Q7 gate |
| `demo/@/components/custom/color-picker/ColorPicker.vue:157-165` | `blobPresent` = `useBreakpoint("(min-width:1024px) and (min-aspect-ratio:1.1)")` — the SAME compound query as App.vue's X6 pane-grammar gate (a mount gate, never display-toggle: a hidden-but-mounted GooBlob still holds a live GL context) |
| `demo/@/components/custom/color-picker/ColorPicker.vue:100-104` | mobile header reclaims the dead `pr-24` blob reservation (`px-[clamp(…)]`), lg keeps `pr-36` |
| `demo/@/styles/style.css:339-348` | `.pane-wrapper--left { z-index: 1 }` — the SLOT assigns the hero's cross-card layer (kills the About-card burial; grid items take z-index without positioning; portaled overlays unaffected) |
| `demo/@/composables/color/useAtmosphere.ts:100-124` | HERO geometry register at the ONE config site: `bodyRadius 0.26, orbitRadius 0.40, satelliteRadius 0.09, eccentricity 0.03` (retires to the producer HERO preset at W8) |
| `demo/@/composables/color/useAtmosphere.ts:126-149` | ramp ceiling TRACKS the picked C: `chromaCeiling: Math.max(0.16, cssToOklch(css).C)` (the 0.16 non-neon floor kept for muted seeds; gamut-map still bounds the top) |

Probe scripts (scratchpad, not in the patch): `blob-probe.mjs` / `blob-probe2.mjs` — owned
headless Chromium (the shared MCP browser was contended by a sibling lane), pixel classification
+ hit-testing + time-sampled satellite measurement. Screens: `blob-desktop.png`,
`blob-satellites.png`, `blob-mobile.png` in the scratchpad.

## §Verdict — VIABLE_WITH_AMENDMENTS, per-item evidence

**Evidence bar met**: baseline typecheck clean pre-change; `vue-tsc -p tsconfig.demo.json` exit 0
post-change; eslint exit 0 on the 3 changed code files; live worktree dev server (`:5199`,
library dist built first — the K.W2.5 mechanism-C resolution requires `npm run build` in a fresh
worktree); WebGL boots with ZERO blob/aurora console errors (only the 2 known S-11 CORS errors on
every localhost load).

**(a) Placement + footprint — PROVEN, with one amendment forced by measurement.**
- Bead center vs corner-radius origin: **[695, 136.90625] ≡ [695, 136.90625]** — exact.
- Q7 mobile: at 390×844 goo-blob canvas count **0**, no blob element, `scrollWidth 390 ==
  viewport` (the clipped-smudge overflow is CURED), header reservation reclaimed (pr 14.32px).
- Burial: the bead paints ABOVE the About card (screenshot; slot z, zero per-instance z).
- **REFUTED — the specced clamp shrinks the hero**: at the real dual-grid pane (695px measured,
  `--pane-max`-bound), `18cqi = 125px` < the 9rem floor ⇒ W = 144px, SMALLER than the pre-seed
  176px (11rem); the 13rem cap needs a 1156px pane that never exists. Prototyped
  `clamp(11rem,26cqi,13rem)` ⇒ 180.7px live.
- **REFUTED — the ≥40%-overflow clause is jointly unsatisfiable with center-on-radius-origin**:
  per-edge overflow fraction = (R−r)/2R with r = `--radius-card` 16px; ≥0.4 forces bead radius
  ≥ 5r = 80px+ ⇒ bead diameter > the 13rem wrapper itself. Measured live: 25-27%.

**(b) Config/uniform surface — ENUMERATED; GAP-1 CONFIRMED.**
- Installed dist type surface (`dist/components/custom/goo-blob/{index,types,GooBlob.vue}.d.ts`):
  `BlobConfig` = 8 atoms (`geometry, satellites, membrane, color, surface, interaction` +
  `variant, quality, tempo` + optional `morphT`); props `color, config?, variant?, seed?,
  paused?` (the WCAG pause seam); exposes `nudge, setMood, pulse, currentMood, pause, resume`;
  emits `click, update:paused`.
- Full uniform set (grep over `dist/goo-blob.js` + `dist/uniformBridgeWGPU-B15_j0z_.js`):
  color-bearing = `uBaseColor, uPalette[+uStopCount], uHueRange, uSatShift, uBrightnessShift,
  uColorNoiseFreq, uColorNoiseSpeed, uRimColor, uIridHue`; per-satellite arrays =
  `uSatPos, uSatRadius, uSatOpacity, uSatCount` — POSITION/RADIUS/OPACITY ONLY.
- **GAP-1 CONFIRMED at 4.2.0/tranche-BG: `uSatColor` is ABSENT** (zero hits across dist).
  Per-satellite ink is impossible consumer-side → stays on L5 exactly as W6-4 books it.

**(c) Accent-live wiring — PROVEN against the uniforms that DO exist.** The picked color already
flows `cssColorOpaque → color prop` + `deriveBlobPalette → paletteStops → uPalette`; the seed
makes the ceiling track the picked C (`Math.max(0.16, seed.C)`), so a C 0.23 pick now derives a
C 0.23 ramp (was flat-capped 0.16 — "the hero literally cannot show the advertised ink" cured
consumer-side). `cssToOklch` throws on un-parseable inside the existing last-good-ramp guard.

**(d) The honest boundary — what the consumer CANNOT do (= the L5 letter input, grounded):**
1. **Satellites-at-rest**: REPRODUCED at the widened orbit — 5 time-samples over ~9s show the
   body + at most a mid-merge bump (screenshot: one bead merging at the upper-left limb; alive,
   but never ≥2 DETACHED beads at rest). The quiescence park + smin bridging hold the show
   under the skin. The W6-4 gate's "post-producer-cut, else the demo-geometry half's own gate"
   hedge is exactly right.
2. **The ≥96px visible bead is JUST out of consumer reach**: bead px = 2·bodyRadius·W (the 1.6×
   canvas overscan × POS_SCALE 0.625 cancel). At W=180.7: bodyRadius 0.26 ⇒ 94px. Growing the
   body further starves the satellites: orbit reach 0.40+0.09 = 0.49 is at the canvas edge and
   skin clearance 0.40−0.35 = 0.05 ≈ smoothK already. ≥96px + distinct satellites need producer
   headroom (overscan/POS_SCALE/HERO preset) — ADD to L5's HERO-preset item.
3. **Pointer shaping**: the GooBlob ROOT square (canvas is `pointer-events:none`, root `auto`)
   eats About-card clicks in the 56px overlap strip (hit-test at (770,150) → goo-blob root) and
   offers a ghost copy-affordance on its dead corners over the header. No clean consumer cure
   (clip-path would clip the satellite overscan paint). L5 NET-NEW ask: hit-test shaped to the
   silhouette (SDF distance is already in-shader) or a root pointer-events seam.
4. **Chord-dent**: visible in the live screenshots at the lower-left limb (P1-5) — producer.
5. **PRM**: NO consumer wiring needed — the substrate honors reduced-motion itself ("one static
   frame then park. Default true", `dist/composables/glass/webgpu/useGpuSubstrate.d.ts:11`);
   the `paused` prop exists as the declarative seam if app-level control is ever wanted.
6. `uSatColor[]`, scale-aware deformation, single-GPU-surface policy, DPR — unchanged L5 items
   (this seed adds evidence, not scope, to them).

**Mood FSM**: not prototyped (outside this seed's a-d mandate); the exposed `setMood/nudge/pulse`
handles are sufficient for W6-4's scrub→excited / save→happy / idle→sleepy bindings — pure
consumer wiring at wave time, no producer dependency.

## §Learnings

1. A fresh worktree CANNOT boot the demo without `npm run build` first — the K.W2.5 mechanism-C
   dist-resolution makes glass-ui's dist import `@mkbabb/value.js` from the repo's OWN `dist/`.
2. The GooBlob canvas is 1.6× its wrapper with world POS_SCALE 0.625 — so bead px =
   2·bodyRadius·wrapper exactly (the two factors cancel). All size-law arithmetic reduces to
   this one identity.
3. The pre-seed `z-20` on HeroBlob was load-bearing INSIDE the card (the z-10 CardHeader
   otherwise wins hit-testing over the bead's on-card half). Killing the z hack demands the
   slot-ornament move (blob OUT of the Card, later sibling) — the law's own statement, and it
   works with zero z classes on the instance.
4. The boot color arrived corrupted to pink lab() despite a green URL color even on a FRESH
   headless profile (no storage) — corroborates W2-1/W6-1's URL-clobber half from a second
   vehicle; this seed rode on top without interference.
5. The shared MCP browser is contended across parallel seed lanes (navigated out from under the
   probe twice); an owned headless Playwright instance via the repo's own install is the
   reliable probe vehicle.
6. `components:4` from a naive canvas-square pixel count was POLLUTED by the About card's pink
   text behind the transparent canvas — a windowed, time-sampled classifier (and eyes on the
   screenshot) was needed for the satellite truth.

## §Risks retired

- The consumer half of W6-4 is mechanically real TODAY: placement law (exact), Q7 absence
  (mount-gated, overflow cured), slot-owned layering, C-tracking ramp, HERO-register geometry —
  all against the INSTALLED dist, typecheck+lint clean, WebGL console-clean.
- GAP-1 is no longer a guess: `uSatColor[]` absent at 4.2.0 — the L5 ask is grounded.
- PRM static-frame is producer-solved; no demo work exists in that clause.
- The satellite-gate hedge ("post-producer-cut, else demo-geometry gate") is VALIDATED as
  necessary — consumer geometry alone cannot produce ≥2 detached beads at rest.

## §Spec amendments suggested (exact clause edits)

1. **W6-4 footprint clause** (SYNTHESIS §3.8 row W6-4 + design-blob-atmosphere §2 size law):
   `clamp(9rem,18cqi,13rem)` → **`clamp(11rem,26cqi,13rem)`**. Measured: 18cqi of the real
   695px pane = 125px → the 9rem floor binds → 144px, a SHRINK from the shipped 176px.
2. **§2 placement law, overflow clause**: "≥ 40 % of the bead's diameter overflows OUTSIDE the
   card" → **"≥ 25 % of the bead's diameter overflows outside each broken edge (the
   geometric maximum ≈ (R−r)/2R at center-on-radius-origin; measured 25-27% live)"** — or move
   the center to the card corner POINT if 40%+ is the wanted look (that reads as a different,
   more detached composition; design call).
3. **W6-4 visible-bead clause**: "visible bead ≥96px" → **"visible bead ≥96px once the L5 HERO
   preset lands (producer overscan/POS_SCALE headroom); consumer ceiling is ~94px at the 26cqi
   footprint without starving the satellite ring — record as a producer-gap row if L5 misses
   the window"** (the same hedge shape the satellite gate already carries).
4. **Letter L5, HERO-preset item**: append "+ pointer-events shaped to the silhouette (the root
   square intercepts sibling-card clicks in the corner-break composition; SDF hit-test or a
   pointer seam)" — net-new, evidenced by the (770,150) hit-test.

## §Replay

```sh
cd /Users/mkbabb/Programming/value.js   # or any tranche-q checkout
git apply docs/tranches/S/audit/seeds/w6-blob-redress.patch
npm run build                            # REQUIRED: mechanism-C resolves @mkbabb/value.js from ./dist
npm run typecheck                        # expect exit 0
npx vite --port 5199 --strictPort        # then open http://localhost:5199/?color=oklch(0.65%200.23%20145)
```
Expected at ≥1024px landscape: the pink/derived bead (~94px) centered exactly on the picker
card's top-right corner-radius origin, breaking the corner, painting ABOVE the About card, a
satellite bump breathing at its limb; click-to-copy works on the bead; About card text remains
clickable outside the blob's 181px square (inside the square's dead corner is the KNOWN L5
interception). At <1024px or portrait: no blob at all, no horizontal overflow. Console: only
the 2 known S-11 CORS errors.
