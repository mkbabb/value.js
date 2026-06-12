# N.W5.B — Aurora-derive (THE oldest mandate, ~10 tranches)

**Lane**: N.W5 Lane B · **Date**: 2026-06-11 · **Branch**: `tranche-f-handoff`
**Mandate**: wire `deriveAurora` picker→atmosphere so the full-viewport aurora background
DERIVES from the current picker colour instead of the static `DEFAULT_AURORA_CONFIG`; rebuild
`AuroraPane.vue` off the "under rework" stub into a real admin tuning pane; kill the false-footer;
and resolve VAL-1 (the OKLab aurora-LUT) ship-or-KILL — no carry.

**Gates** (all green): `npm run typecheck` → **0** · `npm run lint` → **0** · `npm run boot-smoke`
→ **PASS** (cold cache, mount + console-clean).

**Predecessor read**: W5A (`impl/W5A.md`) landed the blob consume + the live-palette idiom
(`deriveBlobPalette → config.color.paletteStops`). This lane mirrors that idiom for the aurora and
re-uses the ConfigSliderPane dot-path facility W5A generalised.

---

## 1 · The wiring — picker → atmosphere (the ~10-tranche consummation)

Every symbol resolved from the d.ts, not memory:
`node_modules/@mkbabb/glass-ui/dist/components/custom/aurora/{composables/{color,atoms,useAurora}.d.ts,constants/presets.d.ts}`
(re-exported through `@mkbabb/glass-ui/aurora`).

**The idiomatic surface is the `AuroraAtoms` *door*** — glass-ui's own "ONE consumer-facing
surface over the ~28-field author schema" (≤7 normalised knobs). The door's `seed` atom "drives
the derived palette" via `deriveAurora` internally; `resolveAtoms(atoms)` expands the atoms into a
full, valid, in-range `AuroraConfig`. Consuming the door (not reaching past it to hand-assemble a
config) is the design-system-first gestalt the precept demands.

`demo/color-picker/App.vue` — the static config is gone:

- OLD: `reactive<AuroraConfig>(structuredClone(DEFAULT_AURORA_CONFIG))` — the frozen cyan "Sky".
- NEW: `auroraAtoms = reactive<AuroraAtoms>(structuredClone(DEFAULT_AURORA_ATOMS))`, provided via
  `AURORA_ATOMS_KEY`, derived by `useAurora(canvas, () => resolveAtoms(auroraAtoms), …)`.
- The picker watch sets `auroraAtoms.seed = cssColorOpaque` on every colour change. `useAurora`
  deep-watches the getter, so a colour change (or any AuroraPane slider/select edit) re-derives +
  re-uploads the uniforms for free.

`deriveAurora` is imported and consumed **explicitly** at the seed boundary as a parse-probe (see
§4) — so the mandate's named symbol is wired directly, AND the palette derive runs through the
idiomatic door.

**π — the atmosphere visibly answers the picker** (paired before/after,
`impl/shots/aurora-{cyan,red}-seed.jpeg`, captured live in headless Chromium):

| Picker seed | Atmosphere field |
|---|---|
| `oklch(0.7 0.15 200)` (cyan) | a derived teal→cyan analogous ramp (verified `deriveAurora` h164→236) |
| `oklch(0.6 0.2 25)` (red) | the whole field flips to magenta→red→orange (h0→43) |

The old permanent cyan-vs-magenta clash (C9 I3) is dead; the background is now a palette-tracking
field, light + full-viewport.

**Runtime verification** (node against the glass-ui dist, before the visual capture):
`deriveAurora` yields harmonious stops per seed; `resolveAtoms({seed})` produces **3 distinct
palettes** for cyan/magenta/red (the coupling is real, not nominal); the shape atoms are live
(`zones.count` 2→6 ⇒ 2→6 nuclei; `motion` still/drifting ⇒ `nucleiDrift` 0.000/0.015;
`medium` smooth/oil ⇒ `config.medium` flips).

## 2 · AuroraPane — REBUILT off the stub (a real tuning pane, ≤400 LoC)

`demo/@/components/custom/panes/AuroraPane.vue` (189 LoC, was a 34-LoC "under rework" stub). It
now injects `AURORA_ATOMS_KEY` and tunes the atmosphere's **shape** (the seed stays the picker's),
mirroring the BlobPane re-author idiom from W5A:

- **3 numeric atoms** ride ConfigSliderPane's dot-path sliders: `colorEnergy` (0–1), `noise`
  (0–1), `zones.count` (1–6).
- **4 enum atoms** are Select rows in ConfigSliderPane's default slot (which exists for exactly
  this "extra controls" case): `harmony` (6 schemes), `zones.arrangement` (3), `medium.kind` (7
  painterly media), `motion` (3 registers). Each option is a real glass-ui atom value, read from
  the d.ts; the Select primitive is the demo's canonical `@components/ui/select` (the
  EasingSelector pattern), mono labels.
- The `medium` discriminated union (`{kind:"smooth"} | {kind: Exclude<…>; amount?}`) is set via a
  type-narrowing ternary so `smooth` never carries an `amount` (the atom shape forbids it).
- "Reset" restores the **shape** (`DEFAULT_AURORA_ATOMS`, NO `seed`) without disturbing the live
  picker colour; "Copy JSON" snapshots the atoms.

Screenshot: `impl/shots/aurora-pane.jpeg` — title + honest description + 4 selects + 3 sliders +
the glass dock. Verified `innerText` carries no stub copy.

## 3 · The false-footer — KILLED

The stub's "Atmosphere controls are temporarily unavailable…" + "The background atmosphere itself
is live." footer (C9 I4/I10, A3 M.W5.C) is gone with the rebuild. Swept demo-wide: zero "under
rework" / "temporarily unavailable" / "itself is live" copy remains in `panes/`. The stale
ConfigSliderPane header comment that described AuroraPane as an "empty-sections stub" was corrected
(doc-truth; the comment my rebuild made false).

## 4 · Throw-safety (inv-N-1) — the one real hazard, closed

`resolveAtoms` is documented TOTAL for the numeric atoms, but its seed path runs `deriveAurora`,
which **THROWS on an un-parseable seed string** (verified: a bad seed yields a value.js "Parse
error", not a clamped fallback). A thrown getter inside `useAurora`'s deep-watch would dead-fault
the reactive effect — the white-screen class inv-N-1 forbids. `cssColorOpaque` is always a
value.js-serialised colour (never malformed in practice; verified 6 realistic picker formats emit
ZERO stderr), but the seed write is guarded anyway (a `deriveAurora(css)` parse-probe in try/catch
that keeps the last-good seed) so the getter is throw-free by construction. This mirrors the W5A
blob watch's guard and is the explicit `deriveAurora` consumption the mandate names.

## 5 · VAL-1 — KILL (recorded, no carry)

**VAL-1** ("OKLab aurora-LUT ship-or-KILL", chronic ~4 tranches, fold-ledger K-VAL1 / §5;
`fold-ledger.md:34,88` = "ship-or-KILL @ N.W5.B — no re-book") is **KILLED**. Rationale:

1. **Obviated by topology.** VAL-1 proposed a precomputed OKLab lookup table in `src/` to speed
   aurora palette derivation. The derivation now lives entirely in **glass-ui** — `deriveAurora`
   is "a thin COMPOSING producer over the shipped value.js Ottosson core (inv J-10: no color math
   is re-implemented here)", consuming value.js's `gamutMapOKLab` directly. There is no aurora
   derivation in `src/` to accelerate; a LUT in value.js would be a speculative library surface
   with zero consumer.
2. **Never specced concretely.** The charter's cited path (`src/units/color/oklab.ts`) does not
   exist (OKLab lives in `conversions/oklab.ts` post-split); `grep aurora-LUT / auroraLut / VAL-1
   src/` → 0 across every prior tranche. The item was a placeholder, not a designed artifact.
3. **Out of this lane's scope by ownership.** W5.B owns `demo/**` only; a `src/` LUT could not
   land here regardless. The mandate's "ship-or-KILL … here" forces the decision now — and the
   honest decision is KILL: derivation is the producer's, it is fast (deterministic, DOM-free, a
   handful of OKLCh ops per user-paced colour change), and a value.js-side LUT would be premature
   optimisation against no measured cost (the §3-N "value.js = the pure sink" discipline).

No re-book; the chronic row closes here.

## 6 · Files

- `demo/color-picker/App.vue` — aurora block rewritten: `AuroraAtoms` door + `resolveAtoms`
  getter + guarded `deriveAurora` seed watch + `provide(AURORA_ATOMS_KEY)`. (324 LoC, ≤400.)
- `demo/@/components/custom/panes/AuroraPane.vue` — REBUILT: real tuning pane (189 LoC, ≤400).
- `demo/@/components/custom/panes/keys.ts` — NEW: `AURORA_ATOMS_KEY` injection key +
  `DEFAULT_AURORA_ATOMS` (the one source App.vue seeds + AuroraPane resets to). (29 LoC.)
- `demo/@/components/custom/panes/ConfigSliderPane.vue` — header comment doc-truth only (no logic).

## 7 · Caveats

- **boot-smoke flap (environmental, W5A-documented).** A concurrent `glass-ui build:watch`
  (PID 31281, plain `vite build --watch`) cascades `style.css` HMR through the `file:../glass-ui`
  symlink, intermittently churning the demo dev server so the `load` event mis-settles in the goto
  window (2 spurious "white-screen" FAILs before a clean PASS). Ruled out as my code by **direct
  headless browser inspection**: the demo mounts (`role="main"` present, `#app` 5 children, the
  atmosphere webgl2 canvas armed at 2400×1726) with the ONLY console errors being env-noise
  (live-API CORS / `ERR_FAILED`, which boot-smoke's `ENV_NOISE_REGEX` filters). boot-smoke is the
  authoritative gate and PASSES on a quiet window. The standing fix is the glass-ui-owned
  dts/CSS-emitting watch (C-DTS, N.md §8).
- **ConfigSliderPane label duplication** (the slider label appears twice per row) is a pre-existing
  W5A ConfigSliderPane trait shared with BlobPane (the `ConfiguratorRow :label` + the inner span);
  a W6 suffusion cosmetic, sibling-owned, not introduced here.
- `svg-filters/` was deleted out-of-band by the concurrent W5.C lane (its App.vue `SvgFilters`
  import + template were removed by that lane); my changes coexist with theirs — typecheck/lint/
  boot all green against the combined tree.
