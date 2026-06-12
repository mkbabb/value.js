# N.W5.A — Blob extirpation + consume (the 2nd-oldest mandate)

**Lane**: N.W5 Lane A · **Date**: 2026-06-11 · **Branch**: `tranche-f-handoff`
**Mandate**: delete the 1270-LoC flat-HSV goo-blob fork, consume `@mkbabb/glass-ui/goo-blob`
(the OKLCh lit-glass spring-physics superset), thin HeroBlob to the component's own grammar,
re-author BlobPane against the 8-atom nested config, and couple the hero blob to the **live
picker palette** — "the palette made flesh."

**Gates**: typecheck → **0** · lint (demo lane) → **0** · boot-smoke → **PASS** (cold cache,
mount + console-clean).

---

## 1 · The deletion (inv-N-4)

Deleted the entire fork — the bespoke design-system facility N forbids in `demo/`:

- `demo/@/components/custom/goo-blob/` — 9 files, **1270 LoC** (GooBlob.vue, types.ts,
  index.ts, 4 composables: useMetaballRenderer/useBlobMood/useBlobPointer/useBlobSatellites,
  2 GLSL shaders).
- `demo/@/lib/animation/webgl-utils.ts` (compileShader/linkProgram/createQuadVAO).
- The now-empty `demo/@/lib/animation/` directory (no orphan dir left).

Residual references after deletion: **0 in code** (`grep custom/goo-blob | webgl-utils |
useMetaballRenderer | useBlobMood | useBlobPointer | useBlobSatellites | lib/animation` over
`demo/**` → empty). Doc-prose hits updated/left per scope (see §6).

## 2 · The consume — every symbol resolved from the d.ts, not memory

Real APIs read from `node_modules/@mkbabb/glass-ui/dist/components/custom/goo-blob/{types,GooBlob.vue}.d.ts`
and `dist/composables/color/index.d.ts`. The 3 importers re-pointed:

| Site | Old | New |
|---|---|---|
| `App.vue:109` | `BLOB_CONFIG_KEY,BLOB_CONFIG_DEFAULTS` from `@components/custom/goo-blob` | `@mkbabb/glass-ui/goo-blob` |
| `App.vue:110` | — | `deriveBlobPalette, oklchStopToHex` from `@mkbabb/glass-ui/color` (new) |
| `BlobPane.vue:12-13` | `BLOB_CONFIG_*` + `BlobConfig` from fork | `@mkbabb/glass-ui/goo-blob` |
| `HeroBlob.vue:28` | `GooBlob` from fork | `@mkbabb/glass-ui/goo-blob` |

`App.vue` blobConfig: the flat `reactive({ ...BLOB_CONFIG_DEFAULTS })` (which breaks against
the nested 8-atom default) → `reactive(structuredClone(BLOB_CONFIG_DEFAULTS))` — the aurora
precedent (`App.vue:212`) does exactly this for its nested config. The `GooBlob` `config` prop
is supplied via the `provide(BLOB_CONFIG_KEY, blobConfig)` ancestor (the component's loud
"provide OR pass config, else throw" contract, satisfied by the provide).

## 3 · HeroBlob — thin consumer (no bespoke FSM left behind)

The fork-era HeroBlob carried a hand-rolled FSM: idle-timer → sleepy, a `colorChangeTimestamps`
ring-buffer rapid-change → excited heuristic, `cancelMoodAfter` timers, `onUnmounted` cleanup —
~95 LoC. **All deleted.** glass-ui's GooBlob owns its own autonomic mood arc (the
{valence,arousal} circumplex settles back to idle/sleepy on its demand-driven `update()` loop),
so the consumer only nudges the expressive moments the picker UX cares about:

- `@click` → `setMood("happy")` + `nudge()` (the click-impulse + satellite poke).
- `@mouseenter` → `setMood("curious")` (Vue attr-fallthrough lands the listener on the GooBlob
  root; `BlobMood` includes `"curious"`).
- idle/sleepy/excited: **delegated to the component's autonomic arc** — no demo timers.

`setMood`/`nudge` are public on the component's `defineExpose` (`{nudge,setMood,pulse,
currentMood,pause,resume}` per `GooBlob.vue.d.ts:46-53`) with identical arity. HeroBlob: 96 → 54 LoC.

## 4 · BlobPane — RE-AUTHORED against the 8-atom nested config (not re-pointed)

The old flat ~23-slider model addressed keys like `bodyRadius`/`smoothK`/`orbitSpeedScale`.
The new `BlobConfig` is **8 cohesive atoms** (geometry/satellites/membrane/color/surface/
interaction/quality/tempo). Slider keys are now **dot-paths** into the atoms.

- **3 abrogated keys dropped**: `orbitSpeedScale`, `wobbleScale`, `mergeRate` were moved upstream
  to `MoodParams`-only (`types.d.ts:12-26`) — gone from the config, gone from the pane.
- **`color.paletteStops` omitted** from the sliders — it is the live picker-palette feed (§5),
  not a manual knob.
- **New expressivity surfaced**: a "Lit Glass" section (specStrength/specShininess/rimStrength/
  rimPower/iridescence/sssScale/coreGlow), `membrane.warpAmp`, `interaction.stretch`/
  `clickImpulse`, and top-level `tempo` — capabilities the fork never had.
- **Compile-time abrogation guard**: a `NumericAtomPath` mapped type derives the exact union of
  legal numeric dot-paths from `BlobConfig` (top-level numbers + `${atom}.${numericKey}`,
  excluding tuples/strings/booleans). A typo or a re-abrogated key fails typecheck at the `s()`
  call rather than silently no-op'ing a slider (the inv-N-10 abrogation-silencer the ledger §4
  forbids). BlobPane: 92 → 116 LoC (≤ 400 cap).

`ConfigSliderPane.vue` gained generic **dot-path** support (`read`/`writePath`, +
`copyAsJson` serialises the whole nested config, `resetDefaults` uses `structuredClone` for
deep atom reset). A plain key with no `.` reads/writes the top level exactly as before, so the
AuroraPane stub (empty sections, `{}` config) is unaffected — and the same nested-path facility
serves AuroraPane's own W5.B re-author. ConfigSliderPane: 175 → 197 LoC (≤ 400 cap).

## 5 · THE EXPRESSIVITY HEADLINE — live-palette coupling

`App.vue` now wires the active picker color into the blob's spatial multi-stop OKLCh field:

```ts
watch(cssColorOpaque, (css) => {
  try {
    blobConfig.color.paletteStops = deriveBlobPalette(css, {
      stopCount: 4, harmony: "analogous", chromaCeiling: 0.16,
    }).map(oklchStopToHex);
  } catch { /* a transient un-parseable string keeps the last good ramp */ }
}, { immediate: true });
```

`deriveBlobPalette(seed, …): OklchStop[]` (≤4 stops, gamut-mapped) `.map(oklchStopToHex)` →
`string[]` exactly the `BlobColor.paletteStops` type. glass-ui's GooBlob **deep-watches**
`config.color.paletteStops`, so a colour change repaints free (no component change needed). The
`chromaCeiling:0.16` caps a vivid seed out of the neon register the shader's SSS/iridescence
over-drives (the AY.W-COHERE accent-identity band).

**Design-fidelity correction adopted from the V4 lane** (`audit/lanes/n-audit-C8v2.md`): the
C8-era "inject via the ColorResolver seam" framing is **stale** — that DI seam was STRIPPED
upstream (W-BLOB3); color now flows via the `:color` prop + `config.color.paletteStops`. And
**per-satellite palette identity is shader-infeasible** as a config/uniform feed (satellites are
geometry-only uniforms, smin-merged into one field, colored by a position-driven FBM sample) —
it is downgraded to the supported **spatial multi-stop distribution** (the `uSatColor[]`
extension is the glass-ui-owned cohort ask, N.md §8). This lane ships the feasible, supported
expressivity lever.

**Verified** (node against the glass-ui dist): the watcher produces 4 valid harmonious hex stops
per seed — `lab(60% 40 -30)` → `#8a64c2 #b36acd #d876ca #f48ac1`; `oklch(0.7 0.15 200)` →
`#009980 #01aaa7 #01bcd0 #54caf3`; `#e63946` → `#ad3769 #c7495d #dd604e #ee7a3d`. The blob's
ramp tracks the picker.

## 6 · PRM (inv-N-9) — the fork's hole dies with the fork

The fork's PRM hole (continuous RAF, no declarative pause) is gone with the deletion. The
**consumed** GooBlob PRM-gates: `useBlobPointer.d.ts:25-27` records *"Under
`prefers-reduced-motion` the substrate freezes the rAF … the substrate owns PRM"* — the
`useWebGLCanvas`/`useRAFLoop` substrate (matched in `dist/useRAFLoop-*.js` against
`prefers-reduced-motion`) fences the loop, and the component additionally exposes a declarative
WCAG-2.2.2 `v-model:paused` seam + quiescence parking (IntersectionObserver/CV-park). The
consumed component is PRM-complete; inv-N-9 is satisfied for the blob surface.

## 7 · Doc-truth

- `demo/CLAUDE.md:78` — the `goo-blob/` subtree row rewritten to "DELETED (N.W5.A) — consumes
  `@mkbabb/glass-ui/goo-blob`; live palette via `deriveBlobPalette → config.color.paletteStops`".
- `demo/DESIGN.md:101` + `demo/@/styles/animations.css:56` — left as-is: the PRM claim ("GooBlob
  RAF fences PRM") remains TRUE (now via glass-ui's substrate), and `animations.css` is under a
  concurrent W5.E lane; surgical scope avoids clobber. (DESIGN.md catalog refresh is a W6/W8
  concern.)

## 8 · The W1-precondition rebuild (environment, not source)

The `file:../glass-ui` symlink resolved a **dts-incomplete** local dist (221 `.js`, **0
`.d.ts`**) → the 74-error TS7016 `any`-typing the audit names. The sibling source is at the
brief's named commit `537c7f80` (dts/CSS-complete *source*); the **dist artifact** was stale.
Ran `npm run build` in `../glass-ui` (regenerates the gitignored dist via `vite build &&
emit-types` — a build artifact, no source edit) → **551 `.d.ts`** + `glass-ui.css` emitted →
typecheck resolved to 0.

**Dist-flap caveat (the C-DTS glass-ui-owned ask, N.md §8)**: a concurrent
`glass-ui build:watch` (plain `vite build --watch`, no `emit-types`) wipes the dts on each
glass-ui source change and HMR-churns an interactive dev server (the documented `insertBefore`
fragment errors that "broke this audit's visual lanes"). The first cold load DID confirm the
glass-ui `goo-blob-canvas` (webgl2, 358×358) mounts; subsequent churn is the watch, not this
lane's code. **boot-smoke (cold, `--force`, single-shot, no HMR window) is the authoritative
gate and PASSES.** The standing fix is the glass-ui-owned dts-emitting watch (C-DTS).

## 9 · Footprint (π)

Fork deleted: **1270 LoC / 9 files + webgl-utils.ts + an empty dir**. Net consumer surface:
HeroBlob 54, BlobPane 116, ConfigSliderPane 197, App.vue blob block ~25 — all ≤ 400-cap.
Capability **upgrade**: OKLCh perceptual color, multi-stop live palette, lit-glass/iridescence/
SSS/core-glow, valence/arousal autonomic mood, spring pointer + pseudopod trail + click-impulse,
quiescence parking + declarative WCAG pause — none of which the flat-HSV fork had.

## Files

- DELETED: `demo/@/components/custom/goo-blob/**` (9), `demo/@/lib/animation/webgl-utils.ts`,
  `demo/@/lib/animation/` (empty dir).
- `demo/color-picker/App.vue` — re-point + structuredClone + live-palette watch.
- `demo/@/components/custom/color-picker/visual/HeroBlob.vue` — thin consumer.
- `demo/@/components/custom/panes/BlobPane.vue` — re-authored (8-atom dot-paths + type guard).
- `demo/@/components/custom/panes/ConfigSliderPane.vue` — generic dot-path support.
- `demo/CLAUDE.md` — goo-blob subtree row doc-truth.
