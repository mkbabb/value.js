# N.W10 — FUNCTIONAL TRUTH + THE SUBSTRATE KILL (the gate-opener · the desktop renders · the first gesture preserves data · the oracle reads the COMPUTED layout, not the emitted class)

**Name**: W10 — Functional truth + the substrate kill (the gate-opener)
**Opens after**: N.W0 (charter ratified) + the WAVES-2 second-block ratification — **LEADS the second block**
(`EXECUTION-ORCHESTRATION.md §2 R1`: "MUST land first so the desktop renders and every later
design gate is honest").
**Agents**: 5 parallel-capable lanes (A reset · B aurora · C save-P0/kC/degraded · D cascade-kill/single-mount · E data-hygiene); B+D are file-disjoint from A/C/E; D owns the `style.css` import + the `App.vue` mount + the boot-smoke CI artifact (the one shared-write hazard — see §Hand-off Disjointness).
**Hard gate**: the desktop dual-pane renders (COMPUTED `display ≠ none` on both `.pane-wrapper`s @1440, not merely the emitted utility); save with the backend down still creates the local palette (zero data loss); the kC slider perturbs the quantization; aurora drifts spatially over time; exactly **1** live `goo-blob-canvas` in the DOM at any viewport; console clean (no CORS noise).
**Status**: RATIFIED (WAVES-2 second block ratified 2026-06-15; this wave dispatches on the run-plan's R1).

---

## §Goal criterion

W10 succeeds when the value.js demo, served from its real built artifact, **tells the truth on first
contact**: the desktop two-pane layout actually paints (it does not today — a foreign unlayered
stylesheet annihilates it); the first destructive thing a user can do — saving a palette while the
backend is unreachable — **keeps their data** (it silently destroys it today); the controls a user
turns actually change the output (the kC chroma slider is a placebo today); the background atmosphere
moves (it is frozen today); and the CI gate that is supposed to catch a blank desktop reads the
**computed layout**, not the mere presence of a CSS class (the emission probe greens on a blank
desktop today — the P9 no-op-utility failure mode in its second life).

This is the **gate-opener**: until the desktop renders, every later design wave's "console-clean /
in-viewport on all 14 routes" gate is structurally blind — the same cold-axis blind-spot class that
kf-K.W0 names and leads against (`EXECUTION-ORCHESTRATION.md §1`). W10 leads exactly as kf-K.W0 leads.

Paired with the §Hard gate below (the completion criterion). A wave whose gates pass but whose goal —
"the desktop renders and the first gesture preserves data" — is unmet closes `complete_with_misses`.

---

## §Provenance (the audit lanes + the file:line roots this wave consumes)

The canon is `audit/user-audit-2026-06-12/LEDGER.md` (U1–U33, OUTRANKS all prior claims) → the
lanes2 corpus (D1–D8 · U-* · L-* · X-*) → `WAVES-2.md §N.W10` (lanes A–E) → `N.md`. Every lane below
is a row on the WAVES-2 §N.W10 board.

- **U9 — "Resetting the current color DOES NOT WORK"** (LEDGER §I, `LEDGER.md:85`). Refined by
  `U-FIXES §1` (carried in `WAVES-2.md §3` REFUTED list): the LEDGER's "DOES NOT WORK" is an
  **overstatement** — the reset chain *fires*; the real defect is a **store/model desync** (the full
  default is not atomically written to the persisted store) plus the contenteditable input not
  repainting, plus the already-default no-op (a reset from the default color produces no visible
  change). Roots: `useAppColorModel.ts:43` (`resetToDefaults`), `:62-68` (the debounced store sync),
  `ColorInput.vue` (the contenteditable repaint). **WAVES-2 §N.W10 Lane A.**
- **U33 — "Background aurora completely broken: does not move, no shade variation"** (LEDGER §A,
  `LEDGER.md:16`). The PRIME-SUSPECT software-GL probe (X15) is **REFUTED** (`U-AURORA §1`,
  `WAVES-2.md §3`: webgl mode runs on the real GPU, 44 fps, `uTime` advancing). The TRUE root is the
  demo's default `motion:"breathing"` (the low-drift register; the spatial-drift register is
  `"drifting"`). Root: `keys.ts:24-28` (`DEFAULT_AURORA_ATOMS`). The W5 screenshot pass was
  structurally blind to motion (a single still frame cannot see a frozen field). **WAVES-2 §N.W10
  Lane B.**
- **The save-data-loss P0 — `D7 §3.4`** ("the save flow silently destroys data"). The local-first
  inversion: `createPalette` must be unconditional, `ensureUser()` deferred to publish. Root:
  `usePaletteActions.ts:59-63` (`onCurrentPaletteSaved`). Net-new lanes2-born P0, mapped to W10.C
  (`WAVES-2.md §5` net-new table: "D7 §3.4 save data-loss P0 → W10.C"). **WAVES-2 §N.W10 Lane C.**
- **The kC placebo — `D3 §4a`** ("the kC slider is a placebo"). The chroma-weight slider's value is
  never threaded to the quantize worker. Roots: `useImageQuantize.ts:91-99` (`quantizeFromFile`
  drops `chromaWeight`), `ImagePaletteExtractor.vue:160-162` (the call site). **WAVES-2 §N.W10
  Lane C.**
- **The CSS-cascade substrate kill — `D8-1 / U-DOCK §2`, the TRUE ROOT of U11** ("Desktop missing the
  second right-most pane?", LEDGER §C, `LEDGER.md:33`). glass-ui's dist CSS ships **unlayered**
  `.flex/.block/.grid/.hidden` rules; per CSS Cascade Level 5 an unlayered declaration beats ALL
  layered declarations → the demo's layered `lg:flex`/`lg:block` responsive utilities are dead → the
  desktop dual-pane never renders. **NOT the router, NOT `@source`** (those were the prior
  hypotheses; the LEDGER hypothesis at `:33` — "the R1 pane-router hydration residual" — is
  superseded). Roots: `style.css:52-53` (the unlayered `@import`), the built artifact
  `dist/gh-pages/assets/index-*.css`. **WAVES-2 §N.W10 Lane D.**
- **The single-mount — `X6 / L-PERF1-1 / L-PERF3-1a`** (the dual breakpoint mounts keep a hidden but
  LIVE WebGL2 context alive and double the picker reactive subtree). Root: `App.vue:34-69` (three
  sibling `PaneSlot` mounts). Fixed in the SAME files as Lane D, and MUST land before the desktop
  render becomes visible (else the dual blob doubles on screen). **WAVES-2 §N.W10 Lane D.**
- **The degraded-backend type — `K-INV5`** (delete the `VITE_API_URL` hack → typed degraded-backend;
  it masks the save P0 and pollutes every console-clean gate with CORS noise). Root: `client.ts:29`.
  **WAVES-2 §N.W10 Lane C** (mapped `WAVES-2.md §5`: "K-INV5 VITE_API_URL → W10.C").
- **Data hygiene — `L-COLOR §3.3` (inputColor lab() corruption)** + **`X9` (availableTags
  Object→Array warn)**. Roots: `useAppColorModel.ts` (the normalize-on-space-switch path),
  `BrowsePane.vue` (the tag-catalog computed). **WAVES-2 §N.W10 Lane E** (mapped `WAVES-2.md §5`:
  "L-COLOR §3 inputColor → W10.E"; "D8 / X9 tags warn → W10.E").
- **The invariant roots** (`WAVES-2.md §4`): **inv-N-11 (cascade-truth, NEW)** — "no foreign
  stylesheet may beat the demo's layered utilities; the glass-ui import rides `layer(glass-ui)` and
  the boot-smoke asserts COMPUTED desktop layout; the emission probe alone is insufficient — proven
  twice." **inv-N-12 (perf floor, NEW)** — "single-mount per logical pane; no offscreen live WebGL
  context." Both are codified here and asserted by this wave's gate.

---

## §The state, verified (the absence/defect proven TODAY by command + output — born-RED)

Every claim below was confirmed on `tranche-f-handoff` against the working tree AND the live built
demo (`dist/gh-pages/`, built 2026-06-12) on 2026-06-15.

### The cascade kill (Lane D) — born-RED on the LIVE BUILT demo (the P0)

The built demo CSS (`dist/gh-pages/assets/index-OigTVKLL.css`, 351 661 bytes, minified to 2 lines)
was walked by brace-depth to classify every bare-utility rule as layered (inside a `@layer{…}` block)
or unlayered (outside). The result:

```
.hidden: total=2 unlayered=1 firstUnlayeredAt=288210
.flex:   total=2 unlayered=1 firstUnlayeredAt=288172
.block:  total=2 unlayered=1 firstUnlayeredAt=288151
.grid:   total=2 unlayered=1 firstUnlayeredAt=288191
num @layer blocks: 5  ranges: 12509..15064 | 15065..20972 | 20973..24667 | 24668..109056 | 109057..173543
```

The five `@layer` blocks are Tailwind's `properties · theme · base · components · utilities`; the
LAST one (`@layer utilities`) ends at char **173543**. The unlayered `.flex/.block/.grid/.hidden`
rules sit at char **~288172** — **114 629 bytes past** the last layer. The verbatim unlayered text:

```css
…}.block{display:block}.flex{display:flex}.grid{display:grid}.hidden{display:none}.inline-block{…
```

and the demo's layered desktop utility, for contrast, lives INSIDE `@layer utilities`:

```
lg:grid-cols first at char: 172359  (inside @layer utilities 109057..173543: true)
…}.lg\:flex-1{flex:1}.lg\:grid-cols-…{grid-template-columns:…}.lg\:overflow-visible{overflow:visible}…
```

Per [CSS Cascade Level 5 §6.4.4](https://www.w3.org/TR/css-cascade-5/#layer-ordering), **unlayered
normal declarations have higher precedence than layered normal declarations** regardless of
specificity or source order. So the unlayered `.hidden{display:none}` defeats the layered
`.lg\:flex{display:flex}` / `.lg\:block{display:block}` at EVERY viewport. The desktop panes are
hidden unconditionally. **This is U11's true root.**

The built CSS confirms there is **no `glass-ui` layer**:

```
$ grep -oE "@layer[^{;]*" dist/gh-pages/assets/index-OigTVKLL.css | sort -u
@layer base
@layer components
@layer properties
@layer theme
@layer utilities
$ grep -c "glass-ui" dist/gh-pages/assets/index-OigTVKLL.css
0
```

The import that leaks the unlayered rules (`demo/@/styles/style.css:52-53`):

```css
@import "@mkbabb/glass-ui/styles";       /* :52 — resolves dist/styles/index.css */
@import "@mkbabb/glass-ui/styles.css";   /* :53 — resolves dist/glass-ui.css (SFC scoped, folded) */
```

Both ride the consumer's default layer (= unlayered) because neither carries `layer(glass-ui)`.
glass-ui's own resolution (`node_modules/@mkbabb/glass-ui/package.json`): `"./styles" →
"./dist/styles/index.css"`, `"./styles.css" → "./dist/glass-ui.css"`. The dist bundle is folded
(44 distinct `data-v-*` scopes present in the built demo CSS), proving the SFC surface is in scope.

### The dual mount (Lane D) — born-RED on the tree

`App.vue:34-69` mounts three sibling `PaneSlot` containers, all permanently in the DOM, visibility
toggled by CSS:

```
:34   <div class="lg:hidden …">          <PaneSlot mobile … />        ← mobile single slot
:45   <div class="pane-wrapper hidden lg:flex …">   <PaneSlot desktopLeft … />
:58   <div class="pane-wrapper hidden lg:block …">  <PaneSlot desktopRight … />  ← "always in DOM"
```

The picker pane (which mounts `HeroBlob` → glass-ui `GooBlob`, a live WebGL2 context) is rendered in
BOTH the mobile and a desktop slot — so a hidden-but-LIVE `goo-blob-canvas` runs offscreen. The blob
consumer chain confirmed live: `ColorPicker.vue` → `HeroBlob.vue` (`visual/HeroBlob.vue`);
`BLOB_CONFIG_KEY` imported at `App.vue:115`, `provide`d at `:286`.

### The save-data-loss P0 (Lane C) — born-RED on the tree

`usePaletteActions.ts:59-63`:

```js
async function onCurrentPaletteSaved(name: string, colors: PaletteColor[]) {
    await ensureUser();                         // :60 — THROWS if the backend is down
    const palette = deps.createPalette(name, colors);   // :61 — NEVER REACHED on throw
    expandedId.value = palette.id;
}
```

`ensureUser()` (`useUserAuth.ts:109-112`) calls `register()`, which does a network fetch and **throws**
on a non-200 / missing slug (`:76`, `:85`: `throw new Error("Server did not return a user slug")`).
The default backend is `https://api.color.babb.dev` (`client.ts:29` — `BASE_URL =
import.meta.env.VITE_API_URL ?? DEFAULT_REMOTE_API_URL`). When that host is unreachable or CORS-blocked,
`await ensureUser()` rejects, the `await` throws, and `createPalette` never runs — **the palette is
silently destroyed**, with no try/catch (contrast `onPublish` at `:35-41`, which DOES guard
`ensureUser` in a try/catch). The local-first contract is inverted.

### The kC placebo (Lane C) — born-RED on the tree

The slider's value reaches a ref but never the worker:

```
ImagePaletteExtractor.vue:116   const chromaWeight = ref(0.5);
ImagePaletteExtractor.vue:184   chromaWeight.value = v;            (onChromaChange — sets ref, then debouncedReQuantize)
ImagePaletteExtractor.vue:162   quantizeFromFile(lastFile.value, colorCount.value);   ← chromaWeight NOT passed
useImageQuantize.ts:91-93       quantizeFromFile(file, k) → runQuantize(pixels, w, h, { k });   ← only { k }
```

The plumbing it SHOULD use exists end-to-end in the library: `QuantizeOptions`
(`src/quantize/types.ts:10,23`) declares `chromaWeight: number` (default `0.5`, `:48`); the kmeans
consumes it (`src/quantize/index.ts:141,149`: `kmeansPlusPlusInit(mmcqResult, k, opts.chromaWeight)`);
and the worker accepts `Partial<QuantizeOptions>` (`quantize-worker.ts:13`). So the library is wired;
the demo drops the value. **That is the precise placebo** — the control turns, the output never moves.

### The aurora freeze (Lane B) — born-RED on the tree

`keys.ts:22-28`:

```js
export const DEFAULT_AURORA_ATOMS: AuroraAtoms = {
    harmony: "analogous",
    colorEnergy: 0.55,    // :24
    zones: { count: 4, arrangement: "composed" },   // :25
    noise: 0.5,
    medium: { kind: "smooth" },
    motion: "breathing",  // :28 — the low-drift register
};
```

glass-ui's dist ships both registers (`node_modules/@mkbabb/glass-ui/dist/aurora.js` grep):
`breathing: {` and `drifting: {` are distinct `MOTION_FIELDS` entries (the dist even derives the
label by `breathDepth > .001 ? "breathing" : "still"`). The demo selects `"breathing"`, the register
that zeroes spatial drift — so the field pulses in place at most, never drifts. The X15 software-GL
suspect is REFUTED (the renderer runs; the *atoms* are the defect).

### The emission probe is insufficient (Lane D, the gate evolution) — born-RED structurally

The existing gate `scripts/css-emission-probe.mjs` asserts the `lg:flex`/`lg:block`/`lg:hidden`
utilities are **EMITTED** in the built CSS (`:48-50` witness table). They ARE emitted — yet the
desktop is blank, because the unlayered glass-ui `.hidden` BEATS them at runtime. **Emission ≠
effect.** This is "the P9 class's second life": the gate proves a class exists, never that it WINS.
`scripts/boot-smoke.mjs` today asserts only `role="main"` exists (mount, `:115-126`) + console-clean
(`:130-136`) — it never reads a computed desktop layout. So both gates GREEN on a blank desktop.

### Reset desync (Lane A) — born-RED on the tree

`resetToDefaults` (`useAppColorModel.ts:43-45`) sets `model.value = createDefaultColorModel()`. The
persisted store is `useStorage("color-picker", defaultColorModel)` (`:16`). The store's `inputColor`
is written only by the **debounced** `syncColorToStorage` (`:62-68`, 200 ms, watching
`model.value.color`, `:68`); `savedColors` syncs via a separate watch (`:77-81`). So a reset does NOT
atomically write the full default into the persisted store — the store lags by the debounce window
and the `savedColors`/other fields are not part of the same write. The contenteditable input field is
not repainted unconditionally on reset.

---

## §Scope (the five lanes, each at the gestalt seam)

- **A — U9 reset (the round-trip made total; `useAppColorModel.ts:43,62-68`, `ColorInput.vue`).**
  `resetToDefaults` writes the FULL default into the persisted `useStorage("color-picker")` store
  **synchronously** (not via the 200 ms debounce — the reset is an explicit user act, not a typing
  cadence), so model + URL + store + the contenteditable input field all round-trip to the default in
  one beat. The contenteditable is repainted unconditionally. The already-default no-op gets a NAMED
  design call (per `U-FIXES §1`: a random-seed reset, OR a confirmation pulse — decided, not assumed).
  **WHY here:** the reset desync is a functional-truth defect (a control whose effect doesn't fully
  land) — the gate-opener wave owns functional truth.

- **B — U33 aurora (the motion-fields root + the temporal gate; `keys.ts:24-28`).** Flip the demo
  default `motion:"breathing"` → `"drifting"` (the TRUE root — `breathing` zeroes spatial drift);
  `colorEnergy 0.55 → 0.7`; `zones.count 4 → 5` (per `D5-8 / D6 §5.1`). Add the **temporal e2e gate**
  (two samples 3 s apart, mean |Δ| ≥ 3/255 on ≥ 25 % of a 16-pt grid; inverted under PRM). The X-GU
  `breathing`-register amplitude ask is FILED (`X-GU A-4`) and CONSUMED at W18 — this wave does NOT
  re-author glass-ui's register. **The thresholds are S1-authored and CALIBRATE-AT-IMPLEMENTATION**
  (per `WAVES-2.md §6 K1-F5`: U-AURORA measured only the dead `breathing` baseline ±1–2/255; nothing
  was measured under `drifting`). **WHY here:** the W5 screenshot pass was blind to motion — the
  gate-opener installs the temporal oracle the design waves' visual gates depend on.

- **C — Save P0 + kC + degraded-backend (`usePaletteActions.ts:59-63`, `useImageQuantize.ts:91-99`,
  `client.ts:29`).**
  - **Save P0:** invert `onCurrentPaletteSaved` to local-first — `createPalette` is called
    UNCONDITIONALLY; `ensureUser()` is deferred to publish (where `onPublish:35-41` already guards
    it). A save with the backend down creates the local palette with zero data loss.
  - **kC:** thread `chromaWeight` through `quantizeFromFile(file, k, chromaWeight)` →
    `runQuantize(..., { k, chromaWeight })` into the worker options (the library already consumes it,
    `src/quantize/index.ts:141`); add a **divergence vitest** (a quantize at `chromaWeight=0` vs `=1`
    on the same fixture yields a measurably different palette).
  - **Degraded-backend:** delete the `VITE_API_URL` hack at `client.ts:29` → a typed degraded-backend
    state (the backend's reachability is a typed signal the UI reads, not a build-time env toggle).
    This removes the CORS-noise pollution of every console-clean gate.
  **WHY here:** these are the functional-truth P0/placebo rows — the gate-opener owns "the first
  destructive gesture preserves data" and "controls actually change output."

- **D — The cascade kill + single-mount + the COMPUTED boot-smoke (`style.css:52-53`, `App.vue:34-69`,
  `scripts/boot-smoke.mjs`).**
  - **Cascade kill (the demo-side one-liner NOW):** wrap the glass-ui imports in a layer —
    `@import "@mkbabb/glass-ui/styles" layer(glass-ui)` (+ the `styles.css` twin) — so the foreign
    bare utilities land in a named layer that the demo's `@layer utilities` outranks. The producer-side
    fix (glass-ui layers-or-namespaces its own dist + an emission gate) is the FILED `X-GU Register-B`
    ask, consumed at W18 — this wave does the demo-side seam, not the producer's.
  - **Single-mount:** collapse the dual breakpoint mounts (`App.vue:34-69`) to a **`v-if`-gated single
    mount** — kills the hidden live WebGL2 context and halves the picker reactive subtree. MUST land
    before the desktop render becomes visible (else the dual blob doubles on screen the moment the
    cascade kill un-blanks it).
  - **Boot-smoke COMPUTED assert:** extend `scripts/boot-smoke.mjs` to assert `getComputedStyle` of
    BOTH `.pane-wrapper`s reports `display ≠ none` at 1440px width (the dual route) — emission probes
    proved insufficient (the P9 second life). The existing `css-emission-probe.mjs` is RETAINED as a
    necessary-but-insufficient corroborator (the utility must still be emitted); the COMPUTED assert
    is the new load-bearer.
  **WHY here:** this is the substrate — until the desktop renders, every later wave's gate is blind.

- **E — Data hygiene (`useAppColorModel.ts`, `BrowsePane.vue`).** Fix the `inputColor`
  normalized-values-stamped-as-raw-`lab()` corruption on space-switch (`L-COLOR §3.3` — the
  normalize-on-switch path stamps normalized values as a raw `lab()` literal); coerce the
  `availableTags` Object→Array warn (`X9`, `BrowsePane.vue`). **WHY here:** these are the small
  data-correctness rows the functional-truth wave sweeps so they do not pollute the design waves'
  console-clean gates.

### Triumvirate dispatch

A triumvirate (research + plan augment + redress) is mandatory, not optional, on:
- **File-bound expansion that would invalidate the wave:** if the cascade kill cannot be cured by the
  demo-side `layer(glass-ui)` import alone (e.g. glass-ui's dist proves to carry `!important` or
  inline-style escapes that beat a layer), the scope expands into the producer's dist shape — that is
  a cross-repo expansion and triggers the triumvirate (the X-GU Register-B ask is re-scoped, not the
  demo patched harder).
- **Hard-gate failures not local-edit-recoverable:** if the COMPUTED `display ≠ none @1440` assert
  stays RED after the layer import + single-mount (a third cascade source exists), halt and triumvirate
  — do NOT add `!important` to the demo's `lg:flex` (the forbidden workaround).
- **The third iteration of a diagnostic loop:** if calibrating the aurora temporal threshold
  oscillates (the `drifting` register's |Δ| straddles the 3/255 floor across three measurement passes),
  halt and triumvirate the threshold against the measured `drifting` distribution.

---

## §Hard gate (FALSIFIABLE · born-RED on the named defect tree TODAY · P6 posture per clause)

The oracle drives the **real built demo** (`dist/gh-pages/`) and reads the **computed** truth, never
the emitted class. The wave's GREEN depends on the CORRECTNESS clauses (a)–(f); the appearance/taste
verdicts (the aurora's *beauty*, the reset's no-op *affordance choice*) close on the user's review
packet (the TASTE boundary), never on green.

- **clause (a) — the desktop dual-pane RENDERS (the cascade kill; CORRECTNESS, device-independent).**
  At 1440px viewport on the built demo, `getComputedStyle(el).display` of BOTH `.pane-wrapper`
  elements (`App.vue:45,58`) is **`!== "none"`** (`flex` for the left, `block` for the right), and
  both pane shells measure `> 0×0`. **BORN-RED WITNESS:** on today's tree the built CSS carries
  unlayered `.hidden{display:none}` at char 288210 that defeats the layered `lg:flex`/`lg:block`
  (proven above by the brace-depth walk; `@layer utilities` ends at 173543) → both panes compute
  `display:none` → the clause reds. **BITE:** reds on the pre-cure tree (the unlayered rule wins);
  greens on the `layer(glass-ui)` import (the foreign rule is now layered and outranked by the demo's
  `@layer utilities`). **NO escape:** the assert is on `getComputedStyle().display`, NOT on the
  presence of the `lg:flex` class in the CSS text (the emission probe's vacuity — the class is present
  TODAY and the desktop is still blank). **P6:** computed-CSS + DOM-membership facts are
  device-independent → hard-gates on the Linux runner. *Closes U11 / inv-N-11.*

- **clause (b) — exactly ONE live `goo-blob-canvas` (the single-mount; CORRECTNESS).** At any viewport
  on the built demo, the DOM contains exactly **1** `goo-blob-canvas` element (the picker's), and no
  offscreen/hidden live WebGL2 context. **BORN-RED WITNESS:** today the dual mount (`App.vue:34-69`)
  renders the picker in both the `lg:hidden` mobile slot and a desktop slot → two `goo-blob-canvas`,
  one hidden-but-live. **BITE:** reds on the pre-cure tree (count = 2); greens on the `v-if`-gated
  single mount (count = 1). **NO escape:** a `display:none` parent is NOT a kill — the assert counts
  canvases in the DOM and probes for a running RAF/context, not for visibility. **P6:**
  device-independent (DOM count + context liveness). *Closes inv-N-12 (single-mount half).*

- **clause (c) — save with the backend DOWN creates the local palette (the P0; CORRECTNESS).** With
  the backend unreachable (the typed degraded-backend state, the `VITE_API_URL` hack deleted), invoking
  the save flow (`onCurrentPaletteSaved`) creates the local palette — `deps.createPalette` is called,
  the palette is present in the store, **zero data loss** — and the console carries NO unhandled
  rejection and NO CORS error. **BORN-RED WITNESS:** today `await ensureUser()` (`:60`) throws on the
  unreachable backend before `createPalette` (`:61`) runs → the palette is destroyed and an unhandled
  rejection + CORS error hit the console. **BITE:** reds on the pre-cure tree (no palette created, CORS
  noise present); greens on the local-first inversion (`createPalette` unconditional). **NO escape:**
  the assert reads the store for the created palette under a forced-down backend, NOT a happy-path save.
  **P6:** the assert injects the backend-down state deterministically (the typed degraded signal) — no
  network flake → device-independent, hard-gates on the runner.

- **clause (d) — the kC slider PERTURBS the quantization (the placebo death; CORRECTNESS).** A
  divergence vitest: quantizing the same fixture image at `chromaWeight = 0` vs `chromaWeight = 1`
  yields a **measurably different** palette (≥1 swatch differs beyond a deltaE floor). **BORN-RED
  WITNESS:** today `quantizeFromFile(file, k)` (`:91-93`) forwards only `{ k }` → the two runs are
  IDENTICAL → the test reds (zero divergence). **BITE:** reds on the pre-cure tree (placebo: identical
  output); greens once `chromaWeight` is threaded into `runQuantize`'s options (the library already
  consumes it at `index.ts:141`). **NO escape:** the assert compares two real quantize runs, not the
  UI's reactive ref. **P6:** a pure-function library test → fully device-independent.

- **clause (e) — the aurora DRIFTS spatially over time (U33; CORRECTNESS via the temporal oracle).**
  Two samples of the aurora canvas 3 s apart show a spatial change: mean |Δ| ≥ 3/255 on ≥ 25 % of a
  16-pt grid (inverted under PRM: a PRM run shows NO drift). **BORN-RED WITNESS:** today the demo's
  `motion:"breathing"` (`keys.ts:28`) zeroes spatial drift → the two samples are within ±1–2/255
  (U-AURORA's measured dead baseline) → the clause reds. **BITE:** reds on the pre-cure tree (frozen
  field); greens on `motion:"drifting"`. **THRESHOLD CAUTION (`WAVES-2.md §6 K1-F5`):** the 3/255 and
  25 % figures are S1-authored against the `breathing` baseline only — **CALIBRATE AT IMPLEMENTATION**
  against the measured `drifting` distribution; the clause's SHAPE (a temporal Δ floor, PRM-inverted)
  is binding, the exact numbers are a calibration. **P6:** the temporal sample uses a per-sample
  predicate (the Δ floor between two real frames), NOT a fixed `settleMs`, so it is load-independent;
  the renderer-presence dependency (a GPU is required to paint the field) is the one device-coupling —
  on a headless SwiftShader runner the clause runs in its PRM-inverted form (assert NO drift under a
  PRM emulation) as the device-independent floor, with the positive drift assert gated on a real-GPU
  capture in the π lane (the W5 screenshot-blindness lesson: a still frame cannot see motion).

- **clause (f) — console CLEAN, no CORS noise (the degraded-backend type; CORRECTNESS).** The built
  demo boots with a console clean of value.js-origin errors AND clean of CORS errors from the
  `api.color.babb.dev` default (the `VITE_API_URL` hack deleted, the degraded state typed). **BORN-RED
  WITNESS:** today the unconditional `ensureUser()`/`register()` fetch against an unreachable backend
  emits CORS errors into every cold boot. **BITE:** reds on the pre-cure tree (CORS noise present);
  greens once the backend reachability is a typed signal the UI handles gracefully. **NO escape:** the
  filter stays NARROW (the existing `boot-smoke.mjs:isEnvNoise` allow-list is not widened to swallow
  the CORS class — the cure is to not make the doomed request, not to filter its error). **P6:**
  device-independent (console capture under a forced-down backend).

**The §spine bar — MUST bite.** Clauses (a)–(f) are the functional-truth + substrate oracle. Revert
the `layer(glass-ui)` import → (a) reds (the unlayered rule wins again). Revert the single-mount →
(b) reds (two canvases). Revert the local-first inversion → (c) reds (data lost). Revert the
`chromaWeight` thread → (d) reds (placebo). Revert `motion:"drifting"` → (e) reds (frozen). Revert the
typed degraded-backend → (f) reds (CORS noise). The born-RED witnesses are CONCRETE and were captured
TODAY (the brace-depth char positions, the `@import` lines, the `await ensureUser()` ordering, the
`{ k }`-only forward, the `motion:"breathing"` atom). **P6 posture (declared):** clauses (a),(b),(c),
(d),(f) are device-independent and hard-gate on the Linux runner; clause (e) hard-gates in its
PRM-inverted (no-drift) form on the runner and carries its positive-drift assert in the π lane on a
real-GPU capture (the renderer-coupling named). **For this gate-opener wave the born-RED is the
DEFECT-PRESENT sense** (not capability-absent): every clause reds on a live defect in the current
tree/built artifact, witnessed by command + output above.

---

## §No-workaround prohibitions (BINDING — the named forbidden shortcuts for THIS wave)

- **NO `!important` / specificity-hack on the demo's `lg:flex`/`lg:block` to out-shout the unlayered
  rule.** The cascade kill dies at the ROOT — the foreign import rides `layer(glass-ui)` so the
  demo's `@layer utilities` outranks it by the cascade-layer ordering. Bumping the demo's
  specificity (or adding `!important`) papers over the unlayered-leak without curing it and re-rots
  the instant glass-ui ships another unlayered rule. (inv-N-11: "no foreign stylesheet may beat the
  demo's layered utilities.")
- **NO widening the boot-smoke `isEnvNoise` allow-list to swallow CORS errors.** The console-clean
  gate (f) is cured by NOT making the doomed `register()` request against an unreachable backend (the
  typed degraded-backend state), NOT by filtering the CORS error out of the gate. Filtering the symptom
  re-creates the blind-spot the gate exists to close.
- **NO keeping the emission probe as the LOAD-BEARING desktop-layout gate.** The emission probe greens
  on a blank desktop (the class is emitted, the layout still dies) — "the P9 class's second life." The
  load-bearer is the COMPUTED `display ≠ none @1440` assert (clause a); the emission probe is retained
  only as a necessary-but-insufficient corroborator. (inv-N-11: "the emission probe alone is
  insufficient — proven twice.")
- **NO re-authoring glass-ui's aurora register in the demo.** The `motion:"drifting"` flip + the
  `colorEnergy`/`zones` retune are DEMO atoms (`keys.ts`); the `breathing`-register amplitude refinement
  is a glass-ui producer change, FILED as `X-GU A-4` and consumed at W18 — not patched into the demo's
  consume edge (no vendored copy, no demo-side shader fork).
- **NO `VITE_API_URL` env toggle as the degraded-backend mechanism.** The backend reachability is a
  TYPED runtime signal the UI reads (`K-INV5`), not a build-time env var that masks the save P0 and
  diverges dev from prod. Delete the hack; do not re-introduce it under another name.
- **NO deferring the kC thread to the worker as "future work."** The library already consumes
  `chromaWeight` (`src/quantize/index.ts:141`) — the placebo is purely the demo dropping the value on
  the call. The cure is the one-arg thread + the divergence test, not a stub or a TODO.
- **NO per-pane patch where the single-mount seam carries the family.** The dual blob, the doubled
  picker subtree, and the hidden-live WebGL2 context are ONE root (the dual breakpoint mount,
  `App.vue:34-69`) — cured by the ONE `v-if`-gated single mount, not three per-slot hides.

---

## §Folds (the rows this wave discharges — each citing its audit lane + finding-id)

| Row | Finding-id / lane | Disposition in this wave |
|---|---|---|
| **U9** | LEDGER §I `:85`; `U-FIXES §1` | Lane A — the reset round-trip made total (model+URL+store+input); the no-op design call NAMED. The LEDGER's "DOES NOT WORK" is the REFUTED overstatement (`WAVES-2.md §3`); the real triad is W10.A. |
| **U33** | LEDGER §A `:16`; `U-AURORA §1` | Lane B — `motion:"breathing"→"drifting"` (the TRUE root); X15 software-GL suspect REFUTED. The temporal e2e gate installed (clause e). CH-2 re-opened-by-U33 discharged here (`WAVES-2.md §5`: "CH-2 → via U33 → W10.B"). |
| **Save data-loss P0** | `D7 §3.4` (net-new lanes2) | Lane C — local-first inversion at `usePaletteActions.ts:59-63`. `WAVES-2.md §5`: "D7 §3.4 save data-loss P0 → W10.C". |
| **kC placebo** | `D3 §4a` (net-new lanes2) | Lane C — `chromaWeight` threaded + divergence vitest. `WAVES-2.md §5`: "D3 §4a kC placebo → W10.C". |
| **K-INV5 (VITE_API_URL)** | R3 fold-ledger | Lane C — deleted → typed degraded-backend. `WAVES-2.md §5`: "K-INV5 VITE_API_URL → W10.C". |
| **U11** | LEDGER §C `:33`; `D8-1 / U-DOCK §2` | Lane D — the unlayered-dist cascade kill (TRUE root, NOT the router, NOT `@source`). `WAVES-2.md §5`: "U11 → W10.D"; "D8-1 unlayered-dist cascade P0 → W10.D". |
| **X6 dual-mount** | `L-PERF1-1 / L-PERF3-1a` | Lane D — collapsed to a `v-if`-gated single mount. `WAVES-2.md §5`: "X6 dual-mount → W10.D". |
| **L-PERF1/2/3 (substrate half)** | L-PERF ledgers | Lane D — the dual-mount kill lands here; the rest is W15 (`WAVES-2.md §5`: "L-PERF1/2/3 ledgers → W10.D + W15"). |
| **D2-S2 ghost CTA (cascade class)** | net-new lanes2 | Lane D — the cascade-class structural half lands here; the design half is W16.C (`WAVES-2.md §5`). |
| **L-COLOR §3.3 (inputColor)** | `L-COLOR §3` | Lane E — the normalized-as-raw-`lab()` corruption fixed. `WAVES-2.md §5`: "inputColor → W10.E". |
| **X9 (availableTags warn)** | R3 fold-ledger | Lane E — Object→Array coercion. `WAVES-2.md §5`: "X9 tags warn → W10.E". |
| **inv-N-11 (cascade-truth, NEW)** | `WAVES-2.md §4` | Codified + gated here (clause a + the COMPUTED boot-smoke). |
| **inv-N-12 (perf floor, NEW)** | `WAVES-2.md §4` | The single-mount + no-offscreen-live-WebGL halves codified + gated here (clause b); the rest is W15.D. |

Every row above appears EXACTLY ONCE in the `WAVES-2.md §5` coverage map under W10. Zero drops.

---

## §Hand-off (the BINDING cross-wave + cross-repo boundaries)

### Cross-wave (within N)

- **W10.D is the gate-opener for ALL desktop-visible work.** The COMPUTED `display ≠ none @1440`
  assert (clause a) is the substrate every later design wave's gate stands on. **W12.C re-points (does
  NOT re-land)** this boot-smoke gate under its new clamp/container-query layout — W10.D owns the CI
  artifact; W12.C verifies against it (`WAVES-2.md §N.W12 Lane C`: "re-point the W10.D boot-smoke gate
  … verify, not re-land"). The DAG (`WAVES-2.md §2`): `W10 → W12 → {W13,W14,W16,W17}`; `W15` runs
  beside the design waves after W10.
- **W10.C (the save P0) precedes W17.D's save-celebration beat.** `WAVES-2.md §N.W17 Hard gate`: "the
  save beat lands ONLY on a successful local save (W10.C first)." The celebration cannot be authored
  until the save actually succeeds locally.
- **W10.C (the mix/RAF is NOT here).** The mix-canvas PRM gate (T16/inv-N-9) is W16.C, not W10 — W10.C
  owns the IMAGE-quantize kC placebo, a different RAF. Do not conflate.
- **W15 (perf) consumes W10.D's single-mount.** `WAVES-2.md §N.W15`: "The dual-mount kill landed at
  W10.D; this wave does the rest." The idle-floor / reflow / GL-hygiene work assumes the single mount.

### Cross-repo (the acyclic spine: glass-ui → value.js → keyframes; PUBLISHED-consume, born-RED downstream)

- **The cascade kill's PRODUCER fix is glass-ui's, FILED as `X-GU Register-B`** (layer-or-namespace
  the dist + an emission gate), consumed at **W18** against the BA cut. W10.D does the **demo-side
  one-liner** (`layer(glass-ui)`) NOW — it is the consumer's correct seam under the cross-repo
  contract, NOT a vendored copy or a `file:` patch of glass-ui's dist. When BA ships the producer fix,
  W18 re-verifies and the demo-side layer wrapper stays (a layer wrapper is idiomatic, not an interim
  shim that must die — but if BA's dist self-layers, the demo wrapper becomes redundant and W18 decides
  its retirement). **BINDING:** W10 NEVER edits `node_modules/@mkbabb/glass-ui` and NEVER vendors its
  dist CSS (the cross-repo-dev-resolution contract: consumers resolve the PUBLISHED `dist/`, one
  tranche behind).
- **The aurora amplitude refinement is glass-ui's, FILED as `X-GU A-4`** (`breathing`-register
  amplitude), consumed at W18. W10.B flips the demo's MOTION atom to `"drifting"` — the demo's own
  consume edge — and does NOT touch glass-ui's `atoms.ts:164-168` (the ask target).
- **Per the cross-repo-dev-resolution contract (v2):** value.js holds `file:../glass-ui` against a
  clean rebuilt local dist through the design waves; the registry pin migrates to the BA cut at W18.A
  / W9′ (`inv-N-6` amended 3.13.0 → the BA cut). W10 neither pins nor re-pins — it consumes the
  current resolved `dist/`.
- **kf-K is downstream of value.js and unaffected by W10** (W10 is demo/functional, not library —
  kf-K consumes value.js 0.12.0 / 0.13.0, not the demo). No kf hand-off owed by this wave.

### Disjointness + worktree

Lanes A, C, E touch composables (`useAppColorModel.ts`, `usePaletteActions.ts`, `useImageQuantize.ts`,
`BrowsePane.vue`) — A and E both touch `useAppColorModel.ts`, so **A and E sequence** (A's reset write
+ E's inputColor-normalize fix are in the same file; fold into one unit or sub-wave them — do NOT run
A and E in parallel). Lane B is `keys.ts`-only (disjoint). Lane D owns `style.css` + `App.vue` +
`scripts/boot-smoke.mjs` (disjoint from A/B/C/E). The orchestrator runs `git worktree add` per parallel
unit with a per-agent target dir before dispatch; or commits before parallelizing so all units share a
clean main. No two units share a `modify` path except the A/E pairing, which is sequenced.

---

## §Design-decisions (trade-offs RESOLVED)

- **The cascade kill: a demo-side `layer(glass-ui)` import NOW vs waiting for the producer fix.**
  RESOLVED: the demo-side one-liner lands NOW (W10.D). RATIONALE: the desktop is BLANK on the live
  site today — waiting for BA's producer fix (W18) leaves the gate-opener un-opened and every design
  wave blind for the whole second block. The `layer(glass-ui)` import is the consumer's CORRECT seam
  (idiomatic, not a workaround), and it is forward-compatible with BA's self-layering. The producer
  fix is still FILED (`X-GU Register-B`) so the foreign stylesheet ships layer-clean at the source.
- **The boot-smoke gate: COMPUTED-display assert vs the existing emission probe.** RESOLVED: the
  COMPUTED `display ≠ none @1440` assert is the load-bearer; the emission probe is RETAINED as a
  necessary-but-insufficient corroborator. RATIONALE: the emission probe greens on a blank desktop
  (the P9 second life) — it proves a class exists, never that it WINS the cascade. Only a computed
  read can catch the unlayered-leak class. Retaining the emission probe costs nothing and catches the
  ORTHOGONAL regression (the `@source` scan dropping the utility entirely).
- **The single-mount: `v-if`-gate vs keeping the right pane "always in DOM."** RESOLVED: a `v-if`-gated
  single mount. RATIONALE: the comment at `App.vue:58` ("always in DOM to preserve KeepAlive scroll
  position") is the reason the dual mount exists — but the cost (a hidden-but-live WebGL2 context + a
  doubled reactive subtree) outweighs the scroll-position benefit, which `KeepAlive` + a state-hoist
  can preserve without a second live mount. The single mount is the KISS root; the scroll-position
  preservation is solved at the state layer, not by a second canvas.
- **The save P0: local-first (createPalette unconditional) vs a try/catch around `ensureUser`.**
  RESOLVED: local-first — `createPalette` is UNCONDITIONAL, `ensureUser` deferred to publish.
  RATIONALE: a try/catch that swallows the `ensureUser` rejection and THEN calls `createPalette` would
  also preserve data, but it keeps the doomed network request in the save path (CORS noise, latency)
  and couples local save to remote auth. Local-first decouples them: a save is a local act; auth is a
  publish-time concern (exactly the shape `onPublish:35-41` already has). This is the idiomatic gestalt,
  not a defensive patch.
- **The aurora: flip the demo MOTION atom vs wait for the glass-ui amplitude refinement.** RESOLVED:
  flip `motion:"drifting"` NOW (the TRUE root); the amplitude refinement is the FILED `X-GU A-4`,
  consumed at W18. RATIONALE: the freeze is the DEMO's atom choice (`"breathing"` zeroes drift), not a
  glass-ui defect — the demo fixes its own consume edge immediately. The amplitude is a producer
  polish that can ride the BA cut without blocking the gate-opener.
- **The aurora temporal thresholds: hard numbers vs CALIBRATE-AT-IMPLEMENTATION.** RESOLVED: the
  clause SHAPE (a temporal Δ floor, PRM-inverted) is binding; the 3/255 + 25 % numbers are
  CALIBRATE-AT-IMPLEMENTATION (`WAVES-2.md §6 K1-F5`). RATIONALE: U-AURORA measured only the dead
  `breathing` baseline (±1–2/255); nothing was measured under `drifting`. Hard-coding an un-measured
  threshold risks a flaky gate; the shape is what is provable, the numbers are a calibration against
  the real `drifting` distribution at implementation.
- **The degraded-backend: typed signal vs the `VITE_API_URL` env hack.** RESOLVED: a typed runtime
  signal (`K-INV5`); delete the env hack. RATIONALE: the env var is a build-time toggle that masks the
  save P0 (it lets a dev point at a working backend so the P0 never surfaces) and diverges dev from
  prod resolution. A typed degraded-backend state makes "the backend is down" a first-class UI fact the
  components handle — the KISS, no-legacy move.
