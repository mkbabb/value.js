# T.W6.5 · Lane P — the console + readout re-seat (T-34 · T-33a · T-33b)

**Lane**: P (rows 4–6 of `waves/T.W6.5.md §Scope`). **Spec of record**:
`MANDATE-2026-07-06.md §0.6` (verbatim kernels t33-audit-01 / t33-audit-02) ·
`audit/t33-research.md §6.1/§6.2`. **Status**: LANDED — per-row gates green.
**Commits**: `veil re-seat` → `clamp law` → `seam` (per the wave's commit plan;
hashes in the wave ledger / below).

---

## Row 4 — T-34: the console re-seats onto the veil (owner: "use a glass-ui veil card, too")

- `ComponentSliders.vue`: the Q4 rung-2 WELL yields to the producer
  `<Card surface="veil" tier="quiet" :shadow="false" :grain="false">` (the
  `veil-surface` @utility — quiet-rung glass, border/rim stripped by design;
  verified emitted in the production CSS). Radius stays the in-plate panel
  rung (`rounded-panel` over the Card's `rounded-card` stamp). **The owner's
  own word re-opens the RATIFIED Q4 on the MATERIAL axis — encoded here +
  MANDATE §0.6, never silent.** `.console-well` remains ConfigSliderPane's
  home (Q4's sibling assignments stand as ratified).
- **AIR recalibration** (t33-audit-02 "a bit too tight … more spaced out"):
  padding 0.5/0.625rem → 0.75/0.875rem; rows `gap-y-1` → `gap-y-1.5`; the
  rail seam `gap-x-2` → `gap-x-2.5`. The O-10 height gate @1440×900 stays
  green (no console scroll).
- **THE D6 INK REFERENT MOVED WITH THE MATERIAL**: `ink.ts` gains the
  `"veil"` rung — an IN-PLATE composite whose backdrop is the RESTING plate,
  never the bare page ambient. The live instrument
  (`useContrastSafeColor.resolveLiveTint`) probes the **mounted
  `[data-surface="veil"]` element** (the `chrome`/`.glass-dock` precedent) —
  the W55 adaptive `--glass-tint-*` axis makes recipes SUBTREE-LOCAL, so a
  body-level probe reads the wrong cascade (probed live: root-context veil
  L 0.34/α 0.60 vs card-context 0.41/0.63) — and composites veil-over-plate
  **A-over-B in sRGB, the O-18 census's own model**, into ONE effective
  tint. A per-layer OKLab-L linear mix diverges past the certification
  headroom at two stacked layers (probed: dark letters 4.30:1 measured vs
  the 5.75 walked target — the first red run's forensics).
- **Two live-instrument defects cured en route** (pre-existing, exposed by
  the veil's class/context probing):
  1. the shared probe element retained a leftover inline `background-color`
     from prior token reads, shadowing any class-based read;
  2. the `resolveSurfaceLightnessLive` consumer class never registered the
     mount-truth epoch bump — a first (detached/pre-style) probe result
     cached indefinitely. `bumpProbeEpochOnMount` is now exported and
     ConsoleRail registers it (the documented consumer contract).
- **Gates**: O-18 16/16 both schemes on the veil ground (the W4
  channel-letter row re-certified against the REAL composited ground);
  O-10 6/6; `test/ink.test.ts` +2 veil-rung probes (in-plate convex-mix +
  ambient damping; the O-18 channel-letter row's static twin at ≥4.5:1).

## Row 5 — T-33a: the dynamic-max value-domain law (owner: "a maximal value that's possible (dynamically within that color space's ranges hereof)")

- New pure colocated module `composables/color/valueDomain.ts` (the `ink.ts`
  shape — no Vue, no DOM): `clampColorToSpaceDomain` — linear channels clamp
  to the `COLOR_SPACE_RANGES` bound in the normalized domain; **hue channels
  WRAP, never clamp** (`hsl(540)` IS `hsl(180)` per CSS — a clamp would
  repaint the color); CSS `none`/NaN propagates untouched; **THE KELVIN
  EXCEPTION encoded, not sniffed** — the library stores kelvin PHYSICAL
  (`rgb2kelvin` emits 1000..40000 K; `kelvin2rgb` clamps physical at entry),
  so its clamp runs in the space's number bounds. A naive [0,1] clamp would
  have repainted every kelvin pick to 40000 K — **caught by the oracle's
  fidelity row before it ever shipped**.
- Bound at the pipeline's **three model-entry seams** (`useColorPipeline`):
  the ONE write gate (`updateModel`); the BORN hydrated value
  (`boot/hydrate.ts` seeds URL/storage/default before the pipeline exists —
  the W2-1 ordering law; clamped before the first derivation); and the
  external-write watch (the App's `patchModelExternal` URL live-sync
  bypasses `updateModel` BY DESIGN for stableHue semantics, and
  `parseAndSetColor`'s idempotence guard skips the re-commit — the gate
  alone never sees the deep-link; discovered by driving the owner's exact
  URL live).
- **NO SRC WRITE** (research §6.1 + the wave law): the parser keeps parsing
  out-of-range CSS lab() legitimately. The reservation table's static worst
  case is now TRUE BY CONSTRUCTION.
- **Gates**: the clamp oracle `test/value-domain-clamp.test.ts` (6 rows:
  999→bound / −999→min per space·channel · hue wrap · NaN · fidelity floor ·
  the owner's exact `lab(40% 999 47)` case) green; live probe: the 999
  deep-link inks **125.0**; `url-color-precedence` + `reactivity-instant`
  e2e green.

## Row 6 — T-33b: the readout↔rail seam (owner: "too large of a gap between the numbers and the gradient selector")

- The §6.1 disease reproduced at this head before the cure: lab's 2-line
  lock reserved 122.4px, painted 61.2px — **61.2px dead band below the
  figures, 0 air above** (both schemes, measured).
- **The in-lock cure**: the tuple bottom-anchors inside its locked box
  (`.readout { align-content: flex-end }`) — the reserved-minus-painted
  delta renders ABOVE the numbers as the title band's display air; the
  figures sit flush on the field. Measured after: **deadBandBelow 0px,
  airAbove 61.2px**, both schemes. The LOCK holds bit-for-bit (min-height
  unchanged; card rect never moves; a 1↔2-line digit-count crossing grows
  the tuple UPWARD into its own reservation — nothing below the header ever
  shifts mid-drag).
- The blank-band measure minted as a standing oracle
  (`e2e/smoke/oracles/readout-seam.spec.ts`, 3 legs: lab one-line · lab
  in-domain worst case fills the reservation upward · rgb one-line no-op).
- **The W8 bracket** (per the wave's §BOOKS): only the TASTE residual rides
  — whether the air reads best as the title band's breath (this landing) or
  re-apportioned (§6.1's other arm as the second pole). The FUNCTIONAL gap
  cure landed here.

## Evidence

- Frames (gitignored on-disk, the standing convention):
  `docs/tranches/T/audit/w65-lane-p-frames/{before,after}-picker-{light,dark}.png`
  + seam metrics inline above (the before/after `deadBandBelow`/`airAbove`
  numbers).
- Oracles: O-18 (16), O-10 (6), O-7 (4 — re-aimed with the NAMED veil
  fixture row: positive identity assertions, presence on Home; the rung-1
  sweep exempts exactly the surface the new row asserts — re-aimed, never
  weakened), readout-seam (3), ink probes (17), the clamp oracle (6),
  vitest full 2230, lint 0, all at the lane head.
- The lane-close ALL-PROJECT run (VJS_E2E_PORT=8213/PERF 8214, the built
  bundle rebuilt at the lane head): **145 passed / 2 skipped / 4 failed in
  10.1m**; the 4 = dual-pane-1440 (worktree-env ENOENT — the spec
  `readFileSync`s `node_modules/@mkbabb/glass-ui/...`, absent in a lane
  worktree; cured by the gitignored `node_modules/@mkbabb` symlink shim,
  no repo change) + O-7 ×3 (pre-re-aim spec). Targeted re-runs after the
  shim + re-aim: dual-pane + O-7 (4/4) ALL GREEN. O-11/O-16-R1/O-26
  artifact dirs were attachments/standing born-RED (`test.fail()` legs per
  the T.W6 close record), not failures.
- Typecheck: the worktree environment carries **9 pre-existing errors**
  (dual `@vue/*` type identity through the walk-up `node_modules` — the lane
  worktree has no local install; byte-identical WITH the lane's changes
  stashed, i.e. **lane delta 0**). Files: HeroBlob.vue ×5,
  ActionBarLayer.vue ×2, useAtmosphere.ts ×1, PaletteSlugBar.vue ×1 — none
  in this lane's set; expected 0 at the properly-installed merged tree.

## Bounds notes (honest, for the wave close)

- The D6 referent move required touching `composables/color/ink.ts` (the
  `veil` rung) and `useContrastSafeColor.ts` (the veil live probe + the
  epoch-bump export) — the ONE-place ink contract (D6) forbids re-minting
  referent math in a component, and the lane order names the
  `resolveSurfaceLightness` move explicitly. `ink.ts` is ALSO Lane I's file
  (its certifyAccentInk cure): the hunks here are ADDITIVE and disjoint from
  the certification walk (type union + one rung arm + one RUNG_ALPHA row);
  if the merge collides on an anchor, the M-20 device re-homes the hunk to
  one lane.
- `vitest.config.ts` was left untouched (an `@components` alias was tried
  and reverted; the pure `valueDomain.ts` module made it unnecessary).
