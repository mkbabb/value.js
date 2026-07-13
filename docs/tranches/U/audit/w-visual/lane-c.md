# U.W-VISUAL — Wave-Open Census — LANE C (Ramp + Generate/Palettes surface)

Re-judges owner-uncertified still-reds inherited from T.W8's terminal state
against the LIVE served build. Verdict vocabulary: CENSUS-GREEN (cure holds,
retire) / CENSUS-RED (still-red reproduces) / ANNEX-OWNER-ATTEST (U-F54:
requires a real-GPU / owner-attested frame a headless read cannot honestly
finalize).

## Serve provenance (HEAD-faithfulness)

- Worktree HEAD `e97a9d1` (`docs(T · FINAL)` — T.W8-terminal), served on port
  8593 via `e2e/smoke/perf/serve-built.mjs` → `dist/gh-pages`.
- **Build was blocked at HEAD** by the un-adopted producer rename (glass-ui
  5.0.0): the demo imports `@mkbabb/glass-ui/goo-blob` (component `GooBlob`) +
  `useLayerTransition` from `@mkbabb/glass-ui/dock`, both dropped/renamed in the
  sibling 5.0.0 dist (`./blob`, component `Blob`; `useLayerTransition`
  internalised). **These are U.W-ADOPT scope, wholly orthogonal to both census
  surfaces** (goo-blob → HeroBlob/BlobPane; useLayerTransition → dock sub-layer
  crossfade). Served via the wave-open census scaffold already present in the
  worktree (UNCOMMITTED): `vite.config.ts` alias `goo-blob → demo/shims/glass-ui-goo-blob.ts`
  (re-exports `Blob as GooBlob`) + `ActionBarLayer.vue` inline stub of
  `useLayerTransition`. `npm run gh-pages` then builds clean (EXIT 0).
- **Faithfulness verified**: fresh build's `GeneratePane` chunk carries the HEAD
  swatch markup (`generate-swatch … shrink-0 … transition-transform`, NO
  `rounded-md`/`backgroundColor`); `feTurbulence`/`feDisplacementMap` present in
  the index chunk; the stale scratchpad `ghp/` build (pre-WR-6, `rounded-md` +
  `backgroundColor` rects) was REJECTED as not-HEAD.
- Both probes ran with **zero page/console errors** on both surfaces.
- Navigation: `?view=` param is inert on this build (lands "Home"); both rows
  driven through the dock (`combobox "Select view"` → option), confirmed by
  `comboLabel: "Palettes"` after selection.

---

## [u-f6-ramp] Q5-RAMP-REGISTER (T-10 · T-43 · T-56) — **CENSUS-GREEN**

**Gate BR-3** — min per-letter ramp L ≥ card-surface feasibility floor (NOT the
0.02 clamp bound) AND per-glyph contrast ≥ carve-out vs the LIVE card rung.
Two Q5 sites split by the WCAG large-text carve-out: display title 3:1
(`--palettes-ramp-title-{0,1,2}`) vs ~16px menu entry 4.5:1 (`--palettes-ramp-{0,1,2}`).

The ramp is DOM `background-clip:text` over 3 certified stops (NOT GPU) — the
L-floor + contrast legs are honestly judgeable headless. The `certifyAccentInk`
feasibility-walk (`ink.ts` → `ink-walk.walkToFloor`, ancestor `ecb15c3`)
REPLACED the fixed near-black walk; `ink-walk.ts:117,134`'s `clamp(…,0.02,0.98)`
is now only the walk BOUND, never where inks land. **BR-3 is born-GREEN at HEAD.**

### Measured (live served build, per-stop token L + WCAG contrast vs the actual composited card rung)

| scheme | site | floor | card-rung L | stop Ls | min L | min contrast | floor pass | near-black sink |
|---|---|---|---|---|---|---|---|---|
| light | menu (4.5) | 4.5 | 0.906 | 0.427 / 0.427 / 0.434 | **0.4273** | **6.29** | ✅ | **false** |
| light | title (3)  | 3   | 0.846 | 0.427 / 0.427 / 0.434 | **0.4273** | **5.21** | ✅ | **false** |
| dark  | menu (4.5) | 4.5 | 0.459 | 0.926 / 0.898 / 0.902 | **0.8975** | **5.19** | ✅ | **false** |
| dark  | title (3)  | 3   | 0.474 | 0.846 / 0.818 / 0.822 | **0.8175** | **3.67** | ✅ | **false** |

Stop CSS (dark menu, richest): `oklch(0.9255 0.062 329.8)` / `oklch(0.8975 0.0547 9.8)`
/ `oklch(0.9019 0.0569 49.8)` — analogous pastel fan. Light: `oklch(0.4273 0.1709 329.8)`
/ `oklch(0.4273 0.1709 9.8)` / `oklch(0.4339 0.115 49.8)` — deep-chalk fan.

### DELTA (RED → GREEN)

- **min per-letter L**: RED ≈ 0.02 (near-black clamp) → **GREEN 0.427 (light) / 0.818–0.898 (dark)** — feasibility-driven (deep chalk on the light card, pastel on the dark card), never the 0.02 bound. `nearBlackSink=false` on all 4 legs.
- **min per-glyph contrast vs card rung**: RED < carve-out (A-class defect: monochrome light / 1.24:1 dark) → **GREEN** menu ≥ 4.5 (min 5.19), title ≥ 3 (min 3.67). Measured against the REAL rendered surface, not merely the resolver's assumed surface.
- The per-site floor split lands as designed (t49-research §8): light both sites share the deep rung (both floors satisfiable there); dark diverges (menu pastel L 0.90 @ 4.5, title slightly deeper/chromatic L 0.82 @ 3).

### π-frames

- `frames/ramp-title-light.png` — "Palettes" deep purple→maroon→rust band on the light card (chromatically distinct — the old "monochrome light" defect does NOT reproduce).
- `frames/ramp-title-dark.png` — "Palettes" pink→rose→peach pastel band on the dark card (perceptible — the old near-black/1.24:1 sink does NOT reproduce).
- `frames/ramp-menu-light.png`, `frames/ramp-menu-dark.png` + `frames/ramp-menu-full-{light,dark}.png` — the dock view dropdown: "Palettes" is the SOLE chromatic entry (Q5 RULED "only palettes rainbow"); all other entries monochrome ink.

**Verdict: CENSUS-GREEN.** The A-class resolver defect (near-black sink) is
retired; BR-3's measurable predicate is dispositively green headless (CSS-text,
not GPU). **Residual routed to OA-4** (owner-attested perceptual read: "the ramp
reads perceptible / beautiful") — the aesthetic call is the owner's; the
measurable floors and the near-black-sink retirement are certified here.

---

## [u-f8] GENERATE-PLATE-SPECIES-CHROME (T-54 · T-55) — **ANNEX-OWNER-ATTEST**

**Gate OA-2** (owner-attested by construction): the Generate swatch reads as a
WatercolorDot species + ONE verb instrument; producer-register attested —
organic-edge material perception + producer-primitive adoption. The species +
verb-register COUNT are countable (reported GREEN below); the organic-edge
MATERIAL read + the "one instrument" register aesthetic are owner-attested
(U-F54: SVG-filter organic-edge perceptibility a headless read cannot finalize).

### Countable legs (live served build — reported GREEN)

- **Swatch species: WatercolorDot — confirmed.** Each `.generate-swatch` is
  `<button class="watercolor-swatch generate-swatch">` with an `<svg>` child,
  `hasTurbulence: true` (feTurbulence/feDisplacementMap), and an organic
  multi-value `border-radius` (blob silhouette, e.g.
  `26.1% 79.2% 58.0% 64.7% / 39.2% 32.7% 70.5% 61.7%`) — NOT a `rounded-md`
  rect. All 5 swatches render as organic blobs in every frame; the old flat
  rounded-rect (`rounded-md` + `backgroundColor`) is GONE. DELTA: **rect → WatercolorDot ✅**.
- **Verb register collapse — landed.** The plate chrome carries 3 discrete
  controls: ONE prominent primary verb (Regenerate, `variant="primary-audacious"`
  — the filled cartoon pill in-frame) + TWO demoted quiet ghost icon-buttons
  (Save, Copy — `icon-only variant="ghost" size="sm"`). DELTA: **3 co-equal
  registers → 1 prominent primary + 2 quiet icon affordances** (the WR-7
  register-collapse the demo could land; NOT yet a single unified glass-ui
  instrument capsule).

### π-frames

- `frames/pane-generate-{light,dark}-1440.png`, `frames/pane-generate-{light,dark}-390.png` — organic WatercolorDot blobs + Regenerate primary pill + quiet Save/Copy icons; at 390 the verb cluster wraps gracefully onto its own line (no clip).

### RELAY → U.W-ADOPT (producer material)

- The WatercolorDot register (`@mkbabb/glass-ui/watercolor-dot`, the 9-consumer
  species) — demo CONSUMES it (species leg GREEN).
- The unified verb instrument (a dock-set capsule vs the 3 discrete `ui/button`
  controls) is PRODUCER material — the demo did the achievable register collapse
  (WR-7); the single-instrument capsule remains producer-gated.

**Verdict: ANNEX-OWNER-ATTEST.** Countable species + verb-register-collapse are
GREEN and reported as fact; the gate OA-2 (organic-edge material perception +
"one verb instrument" + producer-primitive adoption) is owner-attested by
construction and cannot be finalized headless (U-F54). Frames presented for the
owner's material/register attestation.
