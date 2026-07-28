# CHALLENGE-L — library structure under `demo/picker/visual/HeroBlob.vue`

## Model receipt

I observe myself to be **Opus 5 (`claude-opus-5[1m]`)**, the model this seat was explicitly
spawned with. The declaration is present and matches the served tier; the seat is not inherited.

---

## Scope, method, and the environment the numbers came from

- Subject: `/Users/mkbabb/Programming/value.js/demo/picker/visual/HeroBlob.vue` (317 lines total;
  **133 non-comment, non-blank script lines** — `sed -n '23,317p' … | grep -vE '^\s*(//|/\*|\*|$)' | wc -l`).
- Repo `/Users/mkbabb/Programming/value.js`, branch `tranche-u`, HEAD `c654824e`. No file under
  `src/ demo/ api/ test/ e2e/ docs/tranches/V/vnext/` was modified. All probes are read-only.
- Runtime measurements: Chromium (Playwright `chromium`, the repo's own devDependency), 1440×900,
  `Emulation.setCPUThrottlingRate rate:4`, against the LIVE dev server `http://localhost:9000`,
  n=3 per arm, medians reported. Probe scripts live in the session scratchpad
  (`…/scratchpad/blobperf.mjs`, `…/scratchpad/blobgraph.mjs`) — outside the repo, as required.
  (The Chrome DevTools MCP browser was held by another seat: `The browser is already running for
  /Users/mkbabb/.cache/chrome-devtools-mcp/chrome-profile`. Playwright+CDP gives the same
  LCP/long-task instrumentation, so the measurement was not skipped.)
- Static measurements: `node_modules/@mkbabb/glass-ui@7.0.0` published `dist/` (the surface the demo
  actually resolves, per `tsconfig.demo.json` / `vite.config.ts` dist-resolution posture).
- Pixel measurements: the mega-tranche visual-audit capture
  `docs/tranches/V/megatranche/audit/visual/shots/safari-mobile-light/picker.png` (1170×1992),
  sRGB → OKLab L via the standard M1/M2 matrices.

**Verdict: DEFECTIVE.** Fifteen findings; two BLOCKER. The strongest is not a style complaint — it
is a measured, reproducible falsification of this component's central design claim.

---

## The measured boot cost (the Q14 row, re-measured)

`ColorPicker.vue:157` splits HeroBlob with `defineAsyncComponent` and states the intent at
`ColorPicker.vue:150-156`:

> "That graph bundles into the demo's eager `index` chunk (ColorPicker is the SOLE eager importer of
> the blob COMPONENT surface). **Loading it async splits the whole metaball graph out of the
> cold-load JS**"

Measured request timeline (`blobgraph.mjs`, ms after navigationStart, dev server, CPU 4×):

```
   175 /composables/boot/useAtmosphereBoot.ts
   202 /composables/boot/useAtmosphere.ts
   229 /@fs/…/node_modules/.vite/deps/@mkbabb_glass-ui_blob.js?v=0b67085d     ← the ENGINE, eager
  3271 /@fs/…/demo/picker/visual/HeroBlob.vue                                 ← the "async" SFC
```

Boot vitals, HeroBlob's SFC allowed vs its module request aborted (engine chunk downloaded in
**both** arms, so this isolates mount+run, not download):

| arm | FCP | LCP | TBT | long tasks | longest task | canvases |
|---|---:|---:|---:|---:|---:|---|
| HeroBlob mounted (median of 3) | 1108 ms | **1108 ms** | **1663 ms** | 7 | 857 ms | atmosphere + `goo-blob-canvas:180x180` |
| HeroBlob module aborted (median of 3) | 968 ms | **968 ms** | **866 ms** | 6 | 728 ms | atmosphere only |
| **Δ attributable to the blob mount** | +140 ms | **+140 ms** | **+797 ms** | +1 | +129 ms | — |

Second independent run of the same rig: LCP median 1056 ms, TBT median 1450 ms, longest task 819 ms.

**The Q14 escalation's LCP 5141 ms does not reproduce in this environment; LCP is ~1.06–1.11 s and
the blob moves it by ~140 ms.** The disease is real but it is on the **TBT / main-thread** axis
(+797 ms, ~92% over the blob-absent baseline) and on **eager bytes**, not on LCP. CH-4 as written
("p75 LCP ≤2.5s on the named matrix — the ~5s boot dies or V′ does not close") therefore gates the
wrong quantity for this component: **a wave could close CH-4 without touching a single millisecond
of the actual defect.** See L-15.

---

## Findings

### L-1 · BLOCKER · The async split is defeated: the 103 KB blob engine is in the eager boot graph

**Defect.** `ColorPicker.vue` lazy-loads HeroBlob to keep the metaball graph out of the cold-load
JS. It does not work, because an *eager boot composable* already imports the same barrel:

```
demo/color-picker/composables/boot/useAtmosphere.ts:36
    import { BLOB_CONFIG_KEY, BLOB_CONFIG_DEFAULTS } from "@mkbabb/glass-ui/blob";
```

`@mkbabb/glass-ui/blob` is one module containing the entire engine, component, and FSMs:

```
$ wc -c node_modules/@mkbabb/glass-ui/dist/blob.js node_modules/@mkbabb/glass-ui/dist/blob-config.js
  103031 node_modules/@mkbabb/glass-ui/dist/blob.js
     245 node_modules/@mkbabb/glass-ui/dist/blob-config.js
```

glass-ui 7.0.0 ships a **dedicated 245-byte config subpath** for exactly this edge:

```
node_modules/@mkbabb/glass-ui/dist/blob-config.js   (whole file, 2 lines)
  import { a as e, i as t, n, o as r, r as i, t as a } from "./presets-5myqNv59.js";
  export { e as BLOB_CONFIG_DEFAULTS, r as BLOB_CONFIG_KEY, a as BLOB_HERO,
           n as LIGHTNESS_FLOOR_BRACKET, i as LIGHTNESS_FLOOR_DEFAULT, t as clampLightnessFloor };
```

Both symbols `useAtmosphere` wants are in it. The demo imports them from the 103 KB barrel instead —
**420× the bytes for the identical two symbols.**

**Evidence.** Request timeline above: `@mkbabb_glass-ui_blob.js` at **229 ms**, `HeroBlob.vue` at
**3271 ms**. Byte counts above. `package.json#exports` of glass-ui carries `"./blob-config"`.

**Reproduction.** `node …/scratchpad/blobgraph.mjs` against the live dev server. Second,
independent proof: aborting every request matching `/blob\.js|components\/blob/` blanks the whole
page (`fcp 0, lcp 0, canvases []`, exactly 1 request blocked) — if the engine were genuinely
deferred, blocking it could not kill first paint.

**Mechanism.** Barrel-import over-reach at an eager boundary: a boot module reaches into a
component barrel for two constants, so a leaf's lazy boundary cannot hold.

**Cure (transposition, not patch).** `useAtmosphere.ts` and `BlobPane.vue` import from
`@mkbabb/glass-ui/blob-config`; only `HeroBlob.vue` (which genuinely needs the component) may import
`@mkbabb/glass-ui/blob`, and it should take `BLOB_CONFIG_KEY` from `/blob-config` too so the heavy
edge has exactly one owner. Then add a lint rule: `@mkbabb/glass-ui/blob` is importable from
`demo/picker/visual/HeroBlob.vue` and `demo/scenes/blob/**` only.

---

### L-2 · BLOCKER · The ink floor is not achieved — measured |ΔL| = 0.0174 against a stated contract of 0.15

**Defect.** `HeroBlob.vue:81-93` states the contract:

> `// |ΔL(bead body, card plate)| ≥ INK_FLOOR — the figure-ground collapse cure` … `const INK_FLOOR = 0.15;`

Measured from the shipped visual-audit capture (`safari-mobile-light/picker.png`, seed
`lab(92% 88.8 20 / 82.7%)`), bead-body disc (r≤55 in 1152-space, n=593 samples) against the plate
annulus immediately around it (115≤d≤155, n=2016):

```
bead body  mean OKLab L = 0.8565
plate ring mean OKLab L = 0.8392
|ΔL| = 0.0174     required 0.15     shortfall 0.1326   →  FAIL
```

Point samples corroborate: bead-core `rgb(234,197,205)` L=0.8574 vs plate at the same row
`rgb(239,204,200)` L=0.8738 → |ΔL| = 0.0164. **The achieved separation is 11.6% of the contract.**
The screenshot shows exactly what those numbers predict: a near-white lilac bead dissolving into a
near-white pink plate.

**Mechanism — the floor is applied to the wrong quantity.** `floorStops` (`HeroBlob.vue:97-111`)
shifts the OKLab L of the **palette stops**. The rendered pixel is not a palette stop: it is the
shaded output of a lit-glass surface — `lit:true`, `specStrength .16`, `rimStrength .32`,
`iridescence .09`, `sssScale .1`, `coreGlow .06` (glass-ui `presets-5myqNv59.js:39-60`, inherited
through `...appBlobConfig.surface` at `HeroBlob.vue:170`). Shading dominates body luminance at hero
scale, so a guarantee on the stops guarantees nothing about the quantity the comment names. The
component is measuring its own promise in a unit the user never sees.

**Reproduction.** The Python OKLab sampler above, run against the committed capture; or load
`/#/?space=lab&color=lab(92%25+88.8+20+/+82.7%25)` and sample the bead vs the plate.

**Cure.** Delete `floorStops` and `INK_FLOOR` from the demo. The guarantee must be made where the
pixel is made: glass-ui already owns the vocabulary (`clampLightnessFloor`,
`LIGHTNESS_FLOOR_BRACKET [0.12,0.20]`, `BlobColor.lightnessFloor`,
`deriveBlobPalette(seed, { lightnessFloor })`). Extend the producer contract to a *relative* floor
against a caller-supplied reference L applied **post-shading** (a BH relay row), and have the demo
pass `resolveSurfaceLightnessLive("resting", …)` as that reference. A demo-side pre-shift can never
close this.

---

### L-3 · MAJOR · The ink floor never re-derives on scheme or ambient change

**Defect.** `floorStops` reads `isDark.value` (`HeroBlob.vue:99`) and `inkAmbient?.value`
(`:98`) — both reactive — but it is invoked **only** from `reseedHeroStops`, which is called
from exactly two places: `watch(cssColorOpaqueFrame, …)` (`:132`) and `onActivated` (`:246-250`).
Neither `isDark` nor `inkAmbient` is a watch source anywhere in the file.

**Failure scenario.** User loads `/#/` in light mode → the ramp is floored against a light plate
(L≈0.87). User toggles dark mode via the dock. `--saved-bg` and the resting-plate tint flip
(plate L → ≈0.2), `isDark` flips, `inkAmbient` republishes — **`heroStops` does not change.** The
bead keeps a ramp floored against a plate that no longer exists until the user happens to move a
slider. The stated invariant is silently void for the entire interval.

**Reproduction.** Load the picker, do not touch the colour, toggle the scheme, observe the bead
palette unchanged. (Structurally certain from the two call sites; no browser needed to see it.)

**Cure.** The ramp is a *derived value*, not an imperative side effect. It should be a `computed`
over `(cssColorOpaqueFrame, isDark, inkAmbient, appBlobConfig.color)`. That also deletes
`reseedHeroStops`, the `shallowRef`, and the `onActivated` re-seed branch (L-5) in one stroke.

---

### L-4 · MAJOR · Three homes for one concept — the closed-form lightness-separation kernel

The same algorithm exists twice in the demo, character-for-character apart from one constant and the
container type:

| `demo/picker/visual/HeroBlob.vue:105-110` | `demo/color-picker/composables/boot/useAtmosphere.ts:~103-111` |
|---|---|
| `let dir = delta >= 0 ? 1 : -1;` | `let dir = delta >= 0 ? 1 : -1;` |
| `const need = INK_FLOOR - Math.abs(delta);` | `const need = DERIVE_SEAM_FLOOR - Math.abs(delta);` |
| `const headroom = dir === 1 ? 0.98 - meanL : meanL - 0.02;` | `const headroom = dir === 1 ? 0.98 - meanL : meanL - 0.02;` |
| `if (headroom < need) dir = -dir;` | `if (headroom < need) dir = -dir;` |
| `const push = dir * (INK_FLOOR - dir * delta);` | `const push = dir * (DERIVE_SEAM_FLOOR - dir * delta);` |
| `stops.map(s => ({...s, L: clamp(s.L + push, 0.02, 0.98)}))` | `palette.map(stop => ({...stop, L: clamp(stop.L + push, 0.02, 0.98)}))` |

`useAtmosphere.ts:67` even names the copy: *"The same closed-form floor idiom the HeroBlob ink-floor
uses (bead↔plate) applied to the field↔wax seam."* A third, semantically different floor
(absolute, not relative) lives in glass-ui as `clampLightnessFloor`.

**Second defect inside the duplicate.** Both copies claim *"applied uniformly so the ramp's internal
spread survives"* (`HeroBlob.vue:87-88`). The per-stop `clamp(…, 0.02, 0.98)` falsifies it: with
stops `[0.10, 0.30, 0.50, 0.70]` and `push = +0.30` the result is `[0.40, 0.60, 0.80, 0.98]` — the
top stop is clipped, spread compressed from 0.60 to 0.58, and the achieved mean ΔL falls below the
"floor". Pure arithmetic; no runtime needed.

**Cure.** One primitive, one home, in the library the demo exists to dogfood:
`separateLightness(stops: readonly OklchStop[], referenceL: number, floor: number): OklchStop[]`
in `src/color/` exported from `@mkbabb/value.js/color`. It is pure, DOM-free, deterministic OKLab
algebra — exactly what `src/subpaths/color.ts` already carries (`mixColors`, `safeAccentColor`,
`mapColorToGamut`). glass-ui already depends on `@mkbabb/value.js/color`
(`node_modules/@mkbabb/glass-ui/dist/color.js:3`), so the producer can consume it too and the third
copy collapses as well. This also repairs the stated demo invariant quoted at
`demo/color-session/useContrastSafeColor.ts:33-35` — *"sourced ENTIRELY from the library (S.W2-2 ⊣
W1-6: **the demo carries NO norm/denorm color math**)"* — which `floorStops` violates outright.

---

### L-5 · MAJOR · Five producer seams shipped in glass-ui 7.0.0 and none were adopted at the W44 whole-adopt

W44 adopted glass-ui 7.0.0 "whole". The blob's public surface at 7.0.0
(`node_modules/@mkbabb/glass-ui/dist/blob.js:1648`) is:

```
export { BLOB_CONFIG_DEFAULTS, BLOB_CONFIG_KEY, BLOB_HERO, Blob,
         LIGHTNESS_FLOOR_BRACKET, LIGHTNESS_FLOOR_DEFAULT, clampLightnessFloor,
         useBlobMood, useBlobPointer, useBlobSatellites }
```

and the component exposes (`dist/components/blob/Blob.vue.d.ts:56-70`):
`nudge, setMood, pulse, currentMood, pause, resume, settled, settledFrame, rendererStatus`
plus the emits `click, rendererStatus, update:paused`.

`HeroBlob.vue:34` imports **two** of those symbols (`Blob`, `BLOB_CONFIG_KEY`) and hand-rolls
replacements for the rest:

| shipped producer seam | HeroBlob's local duplicate | the file's own booking |
|---|---|---|
| `settled` / `settledFrame` (`Blob.vue.d.ts:63-64`; `constants.d.ts:43` "the park gate") | wall-clock `BLOB_IDLE_MS 2000` + `SLEEPY_POSE_MS 3300` timer pair, `:211-230` | `:207-210` "the producer `settled`/park-from-quiescence seam (GAP-L5, **booked at the 5.0.0 adopt**)" — glass-ui is at **7.0.0** |
| `BLOB_HERO: BlobConfig` (`presets.d.ts`, exported) | hand-rolled `heroConfig` register, `:152-178` | `:148-149` "the exported HERO preset stays PRODUCER" |
| `color.lightnessFloor` + `clampLightnessFloor` + `LIGHTNESS_FLOOR_BRACKET [0.12,0.20]` | `INK_FLOOR = 0.15` + `floorStops`, `:93-111` | `:90-92` "The producer F9.R1 `lightnessFloor` knob replaces this at the W7 adopt (BOOKED)" |
| `rendererStatus` (expose + emit) | nothing — see L-6 | not booked at all |
| `nudge()` | nothing | not booked |

**The `BLOB_HERO` divergence is measurable.** The producer's HERO preset
(`presets-5myqNv59.js:73-87`, spread over `BLOB_CONFIG_DEFAULTS`) versus the demo's hand-rolled one
(`HeroBlob.vue:160-177`) disagree on **seven atoms**:

| atom | glass-ui `BLOB_HERO` | `HeroBlob.vue` |
|---|---:|---:|
| `geometry.bodyRadius` | 0.22 | **0.325** |
| `geometry.orbitRadius` | 0.30 | **0.40** |
| `geometry.satelliteRadius` | 0.10 | **0.09** |
| `geometry.eccentricity` | 0.04 | **0.03** |
| `geometry.satelliteCount` | 4 | 3 (inherited default) |
| `membrane.smoothK` | 0.06 | 0.05 (inherited default) |
| `surface.fissionAmp` | 0 | **0.6** |

Two objects named "the hero register", neither authoritative. `LIGHTNESS_FLOOR_DEFAULT` is 0.15 and
`INK_FLOOR` is 0.15 — the coincidence of the number is what has kept this invisible; the two are
**not the same quantity** (absolute stop floor vs. bead↔plate separation), so the booking at
`HeroBlob.vue:90-92` is not merely undischarged, **it is undischargeable as written**. That is a
false carry riding the ledger and must be re-specified, not rolled forward.

**Cure.** `heroConfig = computed(() => ({ ...BLOB_HERO, …only the atoms the picker genuinely
overrides }))`, the register's owner-ruled deltas relayed to glass-ui as a `BLOB_HERO` amendment
(the BH/BI relay fond), and the wall-clock park replaced by `watch(() => blobRef.value?.settled, …)`.

---

### L-6 · MAJOR · Renderer health is unhandled — the hero silently vanished in the shipped capture

**Defect.** `docs/tranches/V/megatranche/audit/visual/REPORT.json`, row
`safari-desktop-light /#/`:

```
"counts": { …, "canvas": 1, … }        ← every other picker capture has canvas: 2
"consoleErrors": ["WebGL: context lost."]   ← the ONLY console error in all 60 captures
"settleMs": 18905                            ← every other capture: 3277–3606 ms
```

`docs/…/shots/safari-desktop-light/picker.png` confirms it visually: **no bead**. The card renders
"Lab", the numerals, the spectrum and the sliders — the ornament is simply gone, with no fallback,
no placeholder, and no telemetry.

The producer ships the exact contract for this
(`dist/composables/glass/webgpu/rendererStatus.d.ts`):

```ts
export interface RendererStatus { phase: "initializing" | "ready" | "error";
                                  engine: RendererEngine; adapter: string; error?: string; }
```

exposed as a ref **and** emitted as an event by `Blob`. Demo consumers:

```
$ grep -rn "rendererStatus\|renderer-status" demo/     →  (no output)
```

Zero. Not in HeroBlob, not anywhere.

**Mechanism.** The component's whole design assumes the GL context survives for the page's life. A
lost context is a normal WebGL event (tab backgrounding, GPU process recycle, driver reset), and on
this route it is *observed*, not hypothetical.

**Reproduction.** The committed capture is the reproduction. Synthetically:
`canvas.getContext("webgl2").getExtension("WEBGL_lose_context").loseContext()` on `/#/`.

**Cure.** `@renderer-status` handler on `<Blob>`; on `phase === "error"` render the settled-frame
still or the plate-toned ornament placeholder (no layout change — the footprint is already reserved
by `--blob-fp`), and surface it to the debug rail. This is *consuming* a shipped seam, not adding a
mechanism.

---

### L-7 · MAJOR · The demo's TypeScript view of the library does not match `package.json#exports`

`package.json#exports` (7 keys, no `"."`):
`./color ./value ./css ./easing ./math ./transform ./quantize`

`tsconfig.demo.json` `paths` (8 keys):
`@mkbabb/value.js` (root) `/color /parsing /math /easing /units /transform /quantize`

Three of those are **phantom**: there is no `"."` export, and

```
$ ls dist/subpaths/
color.d.ts color.js css.d.ts css.js easing.d.ts easing.js math.d.ts math.js
quantize.d.ts quantize.js transform.d.ts transform.js value.d.ts value.js
```

`dist/subpaths/parsing.d.ts` and `dist/subpaths/units.d.ts` **do not exist**. Two real keys —
`/css` and `/value` — are **missing** from the map. `/css` is live: 10 demo imports, including
HeroBlob's own transitive graph (`HeroBlob.vue:42` → `color-session/useContrastSafeColor.ts:14` →
`color-session/ink.ts:8-11` `import { parseCssColor, serializeCssColor } from "@mkbabb/value.js/css"`).

**Consequence.** `vite.config.ts` generates its runtime aliases *from the exports map*, so at
runtime `/css` resolves to this checkout's freshly built `dist/subpaths/css.js`. TypeScript, having
no `paths` entry, falls through to `node_modules/@mkbabb/value.js` — a **registry tarball**
(`package-lock.json`: `https://registry.npmjs.org/@mkbabb/value.js/-/value.js-4.0.0.tgz`, installed
2026-07-17). The two are already different files:

```
$ diff -q node_modules/@mkbabb/value.js/dist/subpaths/css.d.ts dist/subpaths/css.d.ts
Files … differ                       (10910 B vs 12490 B)
```

So the demo **typechecks the `/css` surface against a published tarball while running the local
build** — precisely the split the tsconfig header claims to have abolished ("the `dist/*.d.ts` trust
boundary … the demo speaks only the 8 public keys"). Today's delta is a benign rollup
duplicate-symbol artifact (`Color` vs `Color_2`); the defect is that nothing prevents it from being
an API break, and no gate would catch it.

**Cure.** Generate the `paths` block from `package.json#exports` the way `vite.config.ts` already
generates the alias block (`valueJsSelfAlias`), or fail the typecheck when the two key sets differ.
One source of truth for the published surface; both consumers derive from it.

---

### L-8 · MAJOR · The e2e fixture built to end hand-duplication has itself skewed

`e2e/smoke/fixtures/blob-timing.ts` exists explicitly to kill hand-synced constants (its header:
*"the park-latency contract was independently duplicated across three specs, each with a 'keep in
lock-step' comment and no shared constant — a three-file hand-sync waiting to skew"*).

```
e2e/smoke/fixtures/blob-timing.ts:56   /** Visible bead = 2·bodyRadius·fp (bodyRadius 0.26 — the HERO register). */
e2e/smoke/fixtures/blob-timing.ts:57   export const BEAD_RATIO = 0.52;

demo/picker/visual/HeroBlob.vue:163        bodyRadius: 0.325,
demo/picker/seat.css:10        * nominal body px = 2·bodyRadius·footprint (bodyRadius 0.325 via HeroBlob's
```

Two of the three mirrors were updated to 0.325; the fixture still carries the retired **0.26**
(the value pinned by tag `v-blob-b0-26-ref-w40`). True ratio is 0.65, fixture says 0.52 — a **20%
understatement**.

**Failure scenario.** `e2e/smoke/oracles/o12-blob-seat.spec.ts:113` computes
`const r = (BEAD_RATIO / 2) * wrapper.width` and probes `[cx, cy±r]`, `[cx±0.7r, cy−0.7r]` for dock
occlusion. With `r` 20% small, every probe lands well inside the true bead: **the outer annulus of
the bead — the only part that can reach the chrome band — is never probed.** The oracle passes by
construction. Its own comment claims it probes "corners of the visible bead box"; it does not.

**Cure.** The fixture must not restate a component constant. Export the hero geometry once
(`BLOB_HERO` after L-5, or a named export from a `demo/picker/` constants module the SFC and the
spec both import) and derive `BEAD_RATIO` from it, so the value cannot be typed twice.

---

### L-9 · MINOR · Masking fallback on a key whose own contract forbids it

```
demo/picker/visual/HeroBlob.vue:95    const inkAmbient = inject(INK_AMBIENT_KEY, null);
demo/picker/visual/HeroBlob.vue:98        const ambient = inkAmbient?.value ?? 0.5;
```

vs. the key's law at `demo/color-session/keys.ts:9-13` and the sibling consumer at
`demo/color-session/useContrastSafeColor.ts:366` — `const ambient = inject(INK_AMBIENT_KEY)!;`
with the doc *"a missing provider is a wiring defect, surfaced loudly."*

A missing provider here yields a silent `0.5`, i.e. the ink floor computed against a plate that
exists nowhere in the app. That is the "masking fallback" edict-2 names. Note `0.5` is also the
worst possible guess: it is the mid-lightness the whole D6 ink-on-tier design was created to stop
using (`useContrastSafeColor.ts:24-31`).

**Cure.** `inject(INK_AMBIENT_KEY)!`, same as every sibling. (Moot if L-2's cure lands and the demo
stops computing a floor at all — which is the preferred order.)

---

### L-10 · MINOR · HeroBlob is the only live-probe consumer that skips the documented mount bump

`demo/color-session/useContrastSafeColor.ts:69-79` states the contract for anyone who folds
`resolveSurfaceLightnessLive` into their own computation:

> "**it must register the mount bump from its setup**, or its first (possibly detached/pre-style)
> probe result caches until some OTHER consumer happens to bump the epoch."

Call sites:

```
$ grep -rn "bumpProbeEpochOnMount" demo/
demo/picker/controls/ComponentSliders/ConsoleRail.vue:133      ✓
demo/color-picker/composables/boot/useViewAccents.ts:89        ✓
demo/color-session/useContrastSafeColor.ts:300, :348           ✓ (internal)
```

`HeroBlob.vue` calls `resolveSurfaceLightnessLive` at `:99` and never bumps. Its first probe (fired
from `watch(…, {immediate:true})` during **setup**, before mount) is written into the module-level
`liveTintCache` keyed on the then-current epoch (`useContrastSafeColor.ts:240-251`), where every
later reader can pick it up. HeroBlob is not merely under-reading — it can **poison the shared cache
for other consumers** with a pre-mount value.

(`demo/scenes/about/markdown/composables/useMarkdownColors.ts:44` has the same omission — a family,
not a one-off. The cure below fixes both.)

**Cure.** The epoch is a *reactive* signal and this API forces every caller to remember a ritual —
that is a design smell, not a caller bug. Replace the exported `resolveSurfaceLightnessLive` +
`bumpProbeEpochOnMount` pair with one composable, `useSurfaceLightness(surface)`, returning a
`ComputedRef<number>` that registers the bump itself. The ritual becomes unforgettable because it no
longer exists.

---

### L-11 · MINOR · One-way `:paused` on a two-way seam — a shadow state the producer cannot correct

`HeroBlob.vue:17` binds `:paused="blobPaused"` with **no** `@update:paused` listener, while the
producer declares (`Blob.vue.d.ts:35-43`):

> "Declarative WCAG 2.2.2 pause seam. **`v-model:paused`** parks the render loop … wire its
> `@update:paused` to this `v-model` … The imperative `pause()`/`resume()` defineExpose handles bind
> the SAME renderer seam (no parallel pause path); the prop owns the default."

HeroBlob then *also* drives the imperative half (`:249 resume()`, `:314-315 pause(); resume()`).
Any producer-originated `update:paused` (a WCAG pause control, a self-park) is dropped on the floor
and `blobPaused` keeps asserting the demo's stale opinion. The producer's "no parallel pause path"
guarantee is void the moment the consumer refuses the return channel.

**Cure.** `v-model:paused="blobPaused"`. One line; it makes the demo's state a mirror of the
engine's rather than a competing opinion.

---

### L-12 · MINOR · A string-literal contract across the feature→boot boundary, and a misplaced global keyframe

`HeroBlob.vue:311-312`:

```ts
function onEmergeEnd(e: AnimationEvent) {
    if (e.animationName !== "blob-emerge") return;
```

The keyframe is defined in the **boot/shell** tree: `demo/color-picker/composables/boot/overture.css:167`.
That file documents the hazard itself at `:163-166` — *"renaming … separately in HeroBlob.vue"*.
A rename in either file disables the T.W4.5-R2 backing-store re-measure **silently** (the guard is a
bare `return`, no warn, no test).

Second issue, edict 6: global keyframes live in `demo/styles/`. `overture.css` is the **only** CSS
file outside `demo/styles/` that defines `@keyframes`:

```
$ grep -rl "@keyframes" demo/ | grep "\.css$"
demo/color-picker/composables/boot/overture.css
demo/styles/animations.css
```

`blob-emerge` is a global, unscoped keyframe living in a `composables/boot/` directory.

**Cure.** Move the keyframe to `demo/styles/animations.css` (moved, never deleted — edict 6) and
export its name as a `const BLOB_EMERGE = "blob-emerge"` from one TS module both the CSS-adjacent
code and the SFC import, so the string exists once.

---

### L-13 · MINOR · The blob canvas is the only element bleeding past the mobile viewport

`REPORT.json`, `safari-mobile-light /#/` and `safari-mobile-dark /#/`:

```
"bleeding": ["canvas.goo-blob-canvas"]      (both mobile matrices; overflowX: 0)
```

`bleeding` is defined at `capture.mjs:107-111` as `getBoundingClientRect().right >
documentElement.clientWidth + 1`. The 1.6× overscan canvas crosses the **viewport** right edge, not
merely the card edge. `seat.css:2-6` legislates *"only the transparent 1.6× canvas overscan crosses
the card edge, clipped by `.app-layout`"* — the card contract holds, the viewport one is unstated
and unasserted. The mobile presence spec (`e2e/smoke/mobile/blob-presence-mobile.spec.ts:80`)
asserts canvas size against `CANVAS_OVERSCAN * seatFootprintPx(paneWidth)` and never checks the
viewport edge, so nothing gates it. Currently cosmetic (the overscan is transparent), but it is an
unowned invariant on the one element that is 1.6× its own box.

---

### L-14 · INFO · The `Blob` import shadows the DOM `Blob` global inside this SFC

`HeroBlob.vue:34` imports a component named `Blob`; `:58` writes
`useTemplateRef<InstanceType<typeof Blob>>("blobRef")`. Inside this module `Blob` no longer means
`window.Blob`. If the import is ever renamed or removed, `typeof Blob` resolves to the DOM
constructor and `InstanceType<…>` silently becomes `Blob` (the file type) — a type error that reads
as nonsense, or worse, no error at all. Producer-side naming; worth one line in the BH relay
(`BlobOrnament` would be unambiguous). No action required in the demo beyond awareness.

---

### L-15 · INFO (gate-directing) · CH-4 gates LCP; the measured defect is TBT and eager bytes

Section "The measured boot cost" above. LCP median **1056–1108 ms** with the blob mounted; the blob
contributes **+140 ms LCP** and **+797 ms TBT**. The Q14/CH-4 framing ("p75 LCP ≤2.5s … the ~5s boot
dies") is already satisfied in this environment while the actual disease — 103 KB of engine in the
eager graph (L-1) and ~0.8 s of post-paint main-thread blocking — is untouched by that gate. A wave
born against CH-4 as written can close GREEN without curing anything. **Re-specify the gate on the
axis that is actually sick** (see the born-RED block below). Caveat, stated plainly: this is
Chromium/dev-server/4×-CPU/desktop; the real-Safari signal in the visual audit is much worse
(`settleMs 18905` on `safari-desktop-light /#/`, with the lost context of L-6), so the production
Safari matrix must be re-measured before the numbers below are frozen.

---

## The greenfield module lattice

If I were structuring this today with no legacy, the picker's hero ornament would be **four modules
and one line of template**, not one 317-line SFC holding eight concerns (palette derivation, ink
floor, hero register, viewport quality ladder, idle-park FSM, scrub detector, save celebration,
KeepAlive wake cure, emerge re-measure).

```
@mkbabb/value.js          ./color   +  separateLightness(stops, referenceL, floor)
                                       — pure OKLab algebra; the ONE home for the kernel
                                         currently copied in HeroBlob + useAtmosphere and
                                         approximated a third time in glass-ui  (kills L-4)

@mkbabb/glass-ui          /blob-config   BLOB_CONFIG_KEY · BLOB_CONFIG_DEFAULTS · BLOB_HERO
                                         (245 B — the ONLY blob import an eager module may
                                          make)                                (kills L-1)
                          /blob          Blob + engine (lazy consumers only)
                          Blob exposes:  settled · settledFrame · rendererStatus
                                         → the park trigger, the fallback frame, and the
                                           health signal are all PRODUCER            (L-5, L-6)
                          deriveBlobPalette({ lightnessFloor, contrastAgainstL })
                                         → the floor is applied where the pixel is made (L-2)

demo/picker/visual/
  heroBlobRegister.ts     the picker's DELTA over BLOB_HERO — geometry + quality ladder,
                          nothing else; exported so seat.css's comment and the e2e fixture
                          derive from it instead of restating it            (kills L-8)
  useHeroBlobMoods.ts     the app-moment → mood binding ONLY: scrub detector, save drip.
                          ~35 lines, unit-testable without a GL context, no timers.
  HeroBlob.vue            template + `heroStops` computed + the mood composable + the
                          rendererStatus fallback.  ~60 lines.

demo/color-session/
  useSurfaceLightness.ts  ComputedRef<number>, self-registering epoch bump — replaces the
                          resolveSurfaceLightnessLive + bumpProbeEpochOnMount ritual pair
                                                                            (kills L-10)
```

Four structural moves, each of which *deletes* code:

1. **The park is a subscription, not a stopwatch.** `watch(() => blobRef.value?.settled, s => …)`
   replaces `BLOB_IDLE_MS`, `SLEEPY_POSE_MS`, two `setTimeout` handles, `onScopeDispose`, and
   `noteBlobActivity`'s five call sites. It also removes the wall-clock/engine skew that forced the
   5.3 s runway and the matching e2e fixture constants.
2. **The ramp is a `computed`, not a side effect.** Deletes `reseedHeroStops`, the `shallowRef`, the
   `try/catch`, and the entire `onActivated` wake-gray branch (a `computed` re-evaluates on wake by
   construction). Kills L-3 outright.
3. **The floor moves to the producer, past the shader.** Deletes `INK_FLOOR`, `floorStops`, the
   `useContrastSafeColor` import, the `INK_AMBIENT_KEY` inject, the `useGlobalDark` import, and the
   `clamp` import — i.e. HeroBlob stops importing `@mkbabb/value.js` at all, which is the honest
   answer: **this component is not a value.js consumer, it is a glass-ui consumer.** Its one
   value.js import today exists only to serve a demo-side reimplementation of a producer concern.
4. **The hero register becomes a delta over `BLOB_HERO`.** One object, one home, relayed upstream.

Net: ~133 script lines → ~60, eight concerns → two (bind app moments; render with a fallback),
three copies of the floor kernel → one, two hero registers → one, 103 KB off the critical path.

---

## Negative proofs (suspects that do NOT survive contact with this component)

- **`useDark` triplication — CURED, not present.** `grep -rn "useGlobalDark\|useDark\b" demo/`
  returns `useGlobalDark` (the glass-ui singleton) at all 11 sites and zero vueuse `useDark`
  instances. `useMarkdownHighlighting.ts:76-80` documents the kill. HeroBlob.vue:39 uses the
  correct store.
- **Deep-import into `src/` — none.** HeroBlob's only value.js import is
  `@mkbabb/value.js/math` (`:40`), a real key in `package.json#exports`, correctly aliased by
  `vite.config.ts`'s generated `valueJsSelfAlias` **and** mapped in `tsconfig.demo.json`. A real
  consumer could write this line verbatim. No `@src/*`, no `../../src/…`, no `dist/` path anywhere
  in the file.
- **Dependency direction — correct.** `demo → glass-ui → value.js`
  (`node_modules/@mkbabb/glass-ui/dist/color.js:3` imports `@mkbabb/value.js/color`). HeroBlob
  taking `cssToOklch`/`deriveBlobPalette`/`oklchStopToHex` from glass-ui rather than value.js is
  **not** an inversion — glass-ui owns blob-palette derivation and delegates the primitives
  downward. No finding.
- **Undeclared producer internals — none.** Every method HeroBlob calls (`setMood`, `pulse`,
  `pause`, `resume`) is in `Blob.vue.d.ts`'s declared expose surface.
- **`verbatimModuleSyntax` — clean.** Both type-only imports (`:35 BlobConfig`, `:37 OklchStop`)
  use `import type`.
- **Vue 3.5 idioms — clean.** `useTemplateRef` (`:58`), `shallowRef` for the stop array (`:79`),
  `onScopeDispose` for timer teardown (`:227`). No props, so reactive-destructure does not apply.
- **Decorative-a11y ownership — correct.** `aria-hidden="true"` + `pointer-events-none` on the root
  (`:10`) and `pressLabel` deliberately omitted, which keeps the producer on its listener-free
  canvas path exactly as `Blob.vue.d.ts:45-50` specifies. The 8 small-tap-target defects on `/#/`
  belong to the sliders and the slug controls, not to this component.
- **`ActionBarLayer`/`useLayerTransition` and `palettes/export.ts` duplications** — not reachable
  from this component's import graph. Out of scope, no finding here.

---

## Proposed born-RED wave: **W-HB · the hero ornament, transposed**

Every gate below is RED at HEAD `c654824e` against a number measured in this report.

| gate | measured now | born-RED bar |
|---|---|---|
| **HB-1** eager-graph purity | `@mkbabb_glass-ui_blob.js` requested at **229 ms** (before HeroBlob.vue at 3271 ms) | no request matching `glass-ui_blob\.js` before the HeroBlob module request; `useAtmosphere.ts` + `BlobPane.vue` import `/blob-config` only |
| **HB-2** post-paint main thread | TBT **1663 ms** with blob / 866 ms without → **Δ +797 ms** | Δ(TBT with blob − without) **≤ 250 ms**, same rig (Chromium, CPU 4×, n≥5, median) |
| **HB-3** the ink floor, measured on pixels | \|ΔL(bead, plate)\| = **0.0174** (required 0.15) | ≥ 0.12 measured from a capture, light **and** dark, at ≥3 seeds incl. `lab(92% 88.8 20)` |
| **HB-4** scheme reactivity | ramp does not re-derive on dark toggle (two call sites, `:132` `:246`) | toggling the scheme re-derives within one frame; asserted by a unit test on the `computed` |
| **HB-5** renderer health | `canvas: 1` + `"WebGL: context lost."` on `safari-desktop-light /#/`; **0** demo consumers of `rendererStatus` | context-loss injection leaves a visible ornament (settled frame or placeholder) and emits a debug-rail row |
| **HB-6** one hero register | 7 atoms diverge between `BLOB_HERO` and `HeroBlob.vue` | `heroConfig` spreads `BLOB_HERO`; the delta is ≤3 atoms and is a named export the e2e fixture imports |
| **HB-7** one floor kernel | 2 identical copies in `demo/` + 1 in glass-ui | 0 copies in `demo/`; the kernel is a `@mkbabb/value.js/color` export with property tests |
| **HB-8** published-surface truth | `tsconfig.demo.json` has 3 phantom keys, 2 missing; `/css` types resolve to the npm tarball, which **already differs** from the local build | `paths` generated from `package.json#exports`; a check fails when the key sets diverge |
| **HB-9** fixture-source truth | `BEAD_RATIO 0.52` vs `bodyRadius 0.325` (20% skew) | the fixture imports the register; no bead/park constant is typed twice |

Dispositions requiring an owner ruling before HB-3 and HB-6 can be executed:

- **RULING-1.** The `lightnessFloor` booking at `HeroBlob.vue:90-92` is *undischargeable as
  written* — the producer knob is an absolute stop floor, `INK_FLOOR` is a bead↔plate separation.
  Rule: (a) re-specify as a producer `contrastAgainstL` option applied post-shading (BH relay), or
  (b) abrogate the bead↔plate floor entirely and accept the shaded read. Rolling the booking forward
  unchanged is not an option.
- **RULING-2.** `BLOB_HERO` vs the demo's hand-rolled register: which is canonical? If the demo's, it
  must be relayed to glass-ui as a `BLOB_HERO` amendment (the standing BH/BI fond) and consumed
  back; the two-registers state cannot survive the wave.

**Mail:** L-2, L-5, L-6, L-14, RULING-1 and RULING-2 are glass-ui-facing and must ride the standing
BH relay to the active glass-ui inbox at root before HB-3/HB-5/HB-6 execute.

---

*Report: `docs/tranches/V/megatranche/audit/components/picker-heroblob/challenge-L-library.md`.
No source file was modified by this seat.*
