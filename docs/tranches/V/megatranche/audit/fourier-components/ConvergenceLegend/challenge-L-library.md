served model id: `claude-opus-5[1m]`

# CHALLENGE — `ConvergenceLegend.vue` · axis **L (LIBRARY)**

**Subject** `/Users/mkbabb/Programming/fourier-analysis/web/src/components/equation/convergence/ConvergenceLegend.vue` (97 LOC)
**Axis** LIBRARY — correctness · leaks/teardown · wrong types · duplication · colocation · module size · composable contracts · error postures · dead code · the viz render path · the R5-7 native-template-loop invisibility class
**Posture** Component assumed DEFECTIVE until the tree proved otherwise. Every row below carries severity + `file:line` + its own falsifier. Four rows survived as superlatives (L-18 runs both ways). Two rows were KILLED BY THEIR OWN FALSIFIER and are recorded as such rather than deleted.
**Method** Static + source-derived only. No browser tooling. Livable-only magnitudes marked `UNPROVEN-NEEDS-LIVE` for SS-13.

**Tally — 14 defects · 0 blockers · 4 superlatives.** No BLOCKER survived: the component has no crash path, no leak, no data loss, and no unguarded I/O. The sharpest row (D-L1) *escalates* to BLOCKER only on a live ordering measurement I am not permitted to take.

---

## §0 — Read closure (every file the subject imports, read whole)

| File | Why in closure | Lines read |
|---|---|---|
| `web/src/components/equation/convergence/ConvergenceLegend.vue` | subject | 1–97 (whole) |
| `web/src/components/equation/lib/harmonics.ts` | `import type { TrigHarmonic }` + `import { spectrumColor }` (:2-3) | 1–88 (whole) |
| `web/src/lib/equation/types.ts` (`FourierTermDTO`) | transitive via `harmonics.ts:6` | consulted |
| `@mkbabb/value.js` `easeInOutSine` | transitive via `harmonics.ts:5` | version pin only (0.13.0 installed) |
| `web/src/components/equation/ConvergencePlot.vue` | **sole consumer** (:13, :357-362) — the other half of every contract below | 1–410 (whole) |
| `web/src/components/equation/convergence/ConvergenceTimeline.vue` | sibling, same folder — the comparison baseline | 1–146 (whole) |
| `web/src/components/equation/lib/hit-test.ts` | owns the key space the subject emits into | 1–36 (whole) |
| `web/src/components/equation/composables/useCurveTransition.ts` | second `TrigHarmonic` declaration (D-L7) | 1–87 (whole) |
| `web/src/components/equation/EquationView.vue` | supplies `nHarmonics`/`coefficients` upstream | 1–469 (whole) |
| `web/src/style.css` :105-127 · `web/src/lib/colors.ts` :70-95 | `--viz-amber` + the `VIZ_COLORS` token registry | regions |
| `node_modules/@mkbabb/glass-ui@4.0.0/dist/styles/glass/{ladder,material}.css` | `.glass-wash` material definition (D-L10) | regions |
| `src/fourier_analysis/symbolic/simplification.py` :68-93 | `compute_effective_n` floor — reachability proof for D-L2 | region |

**Not in closure, checked anyway:** `web/package.json` (no vitest), `web/e2e/*` (coverage), `web/src/components/equation/lib/grid.ts` (parent-only).

---

## §1 — Hitherto corpus: what I fold, and where I contradict

| Corpus row | Fold |
|---|---|
| **R5-7** (`intakes/lane-fourier-r3-r6.md:125`) — template-loop evidence keyed to *component* callsites is blind to native element loops; carried to F.W4 | **APPLIED, second independent instance.** See D-L5. `PaperSidebar.vue` is not the only site; `ConvergenceLegend` is a stronger case because its native loop is its *entire* variable surface and it renders zero component instances. |
| **R6-5 / R6-6** (`:139`, `:140`) — the `NATIVE_TEMPLATE_LOOP` family cures R5's empty leaf | **ADOPTED.** Under the cure this file books exactly 1 loop row (line 30, `(h, i) in harmonics`). I re-derived the count directly: `grep -n "v-for"` → line 30, one hit. |
| **census §5 #10** (`CENSUS-2026-08-03.md:249`) — "Uplift lands with no unit-test net… vitest is ABSENT" | **CORROBORATED at this file.** D-L13. |
| **census §5 #8 / lane-frontend.md:604, :643** — the `--viz-amber` WCAG darken is a held upstream carry | **EXTENDED, not duplicated.** D-L11 shows the carry's own denominator (`against --background`) does not hold at this one site. Fold into the existing carry; do not open a second. |
| **lane-frontend.md:382** — live glass tier classes are `glass-wash` (4) / `glass-resting` (3) / `glass-floating` (3), the post-4.0.0 names | **CORROBORATED + used as a superlative** (S-3): I verified `.glass-wash` is a real rule at the installed 4.0.0 (`ladder.css:36`), so the class is not a no-op. |
| **lane-frontend.md:136** — `ConvergenceLegend.vue | 97 | Harmonic legend overlay` | **AGREE** — 97 LOC exact. |
| **lane-frontend.md:270-271** — glass-ui import inventory lists `ConvergenceTimeline.vue:19,20` and **no** `ConvergenceLegend` row | **AGREE and load-bearing** — independent corroboration of S-3 / D-L5 (zero component imports). |
| **lane-frontend.md:558-559** — "ConvergencePlot… own loop at `:67-69`… **Not** gated by `stores/animation.ts` — a second, ungated clock" | **AGREE.** D-L6 quantifies what the legend feeds into that clock. |
| **lane-frontend.md:514** — "Canvas2D throughout. **WebGL/WebGPU: ABSENT**" | **AGREE, re-verified in closure.** The subject touches the Canvas2D path only, through the parent's `hoveredCurve` → `draw()` edge. No GPU surface is reachable from this component. |
| **lane-crud.md** (whole lane) | **NO OVERLAP — stated explicitly.** This component has zero network, zero store, zero persistence, zero provenance surface. None of R-2…R-7 touch it. |

**No contradiction of the corpus was required.** Every corpus figure I could re-derive against the live tree matched.

---

## §2 — Defects

### D-L1 · MAJOR · cross-family hover protocol; the two halves race
**`ConvergenceLegend.vue:19, :24, :33, :34`** ↔ **`ConvergencePlot.vue:342, :249-253`**

The legend publishes hover on `@pointerenter` / `@pointerleave`. Its sole consumer clears the *same* state from the canvas's `@mouseleave`:

```
ConvergenceLegend.vue:19   @pointerenter="emit('hover', 'sum')" @pointerleave="emit('leave')"
ConvergencePlot.vue:295    function onLegendEnter(key: string) { hoveredCurve.value = key; … }
ConvergencePlot.vue:342    @mouseleave="onCanvasLeave"
ConvergencePlot.vue:249    function onCanvasLeave() { hoveredCurve.value = null; … }
```

The legend is an absolutely-positioned sibling painted **over** the canvas (`:46` `absolute top-2 right-2` + `pointer-events-auto`), so every canvas→legend crossing dispatches *both* a legend `pointerenter` (sets `hoveredCurve = key`) and a canvas `mouseleave` (nulls it). Which write survives is decided entirely by the UA's pointer→mouse compatibility ordering, which nothing in this tree pins. If the compatibility mouse-boundary events trail the pointer-boundary events for a single crossing, `onCanvasLeave` runs last and **legend hover is dead on arrival for mouse users** — the row highlights itself via CSS `:hover` (`:61-64`) while the curve it names never lights up.

This is not stylistic drift. It is the **only** `pointerenter`/`pointerleave` site in the entire `web/src` tree:

```
pointer family:  ConvergenceLegend.vue:19, :24, :33, :34   ← 4 sites, all in this file
mouse family:    ConvergencePlot.vue:342 · FrequencyGraph.vue:181 · BasisCanvas.vue:523
                 EquationView.vue:253 · PaperSearchDropdown.vue:48 · PaperSearchModal.vue:90
```

Six mouse-family hover surfaces, including this component's own parent and its Canvas2D siblings. The legend is the outlier, and it is the outlier *inside a shared state protocol*.

**Falsifier.** Instrument both handlers at `/equation` and log dispatch order for one canvas→legend crossing. If `mouseleave` fires **before** `pointerenter`, the surviving write is the legend's and this row downgrades to **MINOR** (latent cross-family inconsistency, no live symptom). If `mouseleave` fires **after**, this row escalates to **BLOCKER** — the component's primary interaction is non-functional. `UNPROVEN-NEEDS-LIVE` (SS-13). *Order-independent residue that survives either way:* under pen/touch the canvas's compatibility `mousemove` may not be synthesised at all, so the two halves of one protocol have different device support — that part needs no measurement.

**Why it is filed MAJOR and not BLOCKER:** the escalating branch is exactly the branch I cannot prove without a browser. Filing it as BLOCKER on an unmeasured ordering would fail the axis's own discipline.

---

### D-L2 · MAJOR · the guard hides two entries it has no business gating
**`ConvergenceLegend.vue:17`**

```vue
<div v-if="harmonics.length" class="legend-overlay glass-wash">
```

The `Sum` (`:18-22`) and `f(x)` (`:23-27`) entries are **unconditional** — they do not read `harmonics` at all. Yet the whole overlay is gated on the harmonic list being non-empty. When zero trig harmonics survive, the canvas still strokes both of those curves:

- `ConvergencePlot.vue:192-199` — the dashed original is drawn over `oxClosed`, ungated on `totalH`.
- `ConvergencePlot.vue:224-231` — the golden sum is drawn over `nPts=500` samples of `sumY`, ungated on `totalH` (with `totalH === 0` it degenerates to the flat DC line, `:148-156`).

So the plot shows two named curves with **no legend at all**, and their hover keys (`"sum"`, `"original"`) become unreachable from the legend while remaining live in the canvas hit-test (`ConvergencePlot.vue:235`).

**Reachability, proven from source (not hypothesised):** `groupTrigHarmonics` drops every `|n|` whose amplitude falls at or below `1e-14` — `harmonics.ts:44` `if (amp > 1e-14) out.push(...)`. A constant function (`f(x) = 1`, typed straight into `FunctionInput`) has only a DC term; every non-DC coefficient is either pruned server-side or arrives at ~1e-17 and is pruned here. Meanwhile the harmonic count never reaches zero from the *other* direction — `compute_effective_n` returns a floor of `minimum: int = 3` (`src/fourier_analysis/symbolic/simplification.py:71`, and `:80-81` returns that floor outright when `total_energy <= 0`), and the slider min is 1 (`FunctionInput.vue:184`), so `vizHarmonics ≥ 1` and `ConvergencePlot` mounts and draws normally. The empty legend is therefore reachable through the amplitude filter alone, on the most trivial input a user can type.

**Falsifier.** If either curve were gated on `totalH > 0`, the legend's absence would be correct. Neither is: `draw()` early-returns only on `!canvas || !container` (`:82`), zero-size rect (`:85`), and `!ox.length` (`:100`). Grep for `totalH` in the draw body → `:106, :141, :150, :204` only, all inside the *harmonic* loops.

**Correct shape:** gate only the divider (`:28`) and the loop; keep the two fixed rows whenever the plot mounts.

---

### D-L3 · MAJOR · the legend occludes the plot's only hit-test surface, and grows with N
**`ConvergenceLegend.vue:45-55`** ↔ **`ConvergencePlot.vue:240-247`**

```css
.legend-overlay {
    @apply absolute top-2 right-2 flex flex-col gap-0.5 pointer-events-auto;   /* :46 */
    max-height: calc(100% - 16px);                                             /* :47 */
    min-width: 100px;                                                          /* :54 */
}
```

Curve hover exists **only** on the canvas's `@mousemove` → `hitTestCurves` (`ConvergencePlot.vue:240-247`). The legend claims `pointer-events-auto` over that surface, so any curve passing beneath it is unhittable. The claim scales with the harmonic count, and `max-height: calc(100% - 16px)` explicitly authorises the overlay to consume the entire plot height.

Row height, derived entirely from this file: `.legend-entry` is `py-1` (8px total) + `max(10px dot, 13px × 1.3 line-height ≈ 17px)` ≈ **25px**, plus the container's `gap-0.5` (2px) ≈ **27px/row**. At the *default* N = 20 (`EquationView.vue:28` `nHarmonics = ref(cached?.nHarmonics ?? 20)`) the legend renders 2 fixed rows + 1 divider + 20 harmonic rows ≈ **594px + 16px padding**, against a plot whose container declares only `min-height: 200px` (`ConvergencePlot.vue:382-385`). The legend is therefore pinned at `max-height` **in the default configuration**, occupying a ~125px-wide near-full-height strip of the plot in which no curve can be picked — and it is exactly the many-harmonic case, where picking matters most, that makes it worst. At the slider ceiling (N = 100, `FunctionInput.vue:184`) the strip is 102 rows deep and permanently scrolled.

**Falsifier.** Measure the rendered `.legend-overlay` bounding box against the canvas at 1280×800 (a viewport the repo already screenshots — `e2e/visual-baseline.spec.ts:34,42`). If the overlay covers less than ~30% of the plot height at default settings, downgrade to MINOR. Row arithmetic above is source-derived and stands on its own; **the plot's rendered height is `UNPROVEN-NEEDS-LIVE`** (SS-13).

---

### D-L4 · MAJOR · the curve-key protocol is stringly typed across three modules
**`ConvergenceLegend.vue:7, :19, :24, :32-33`**

```ts
defineProps<{ harmonics: TrigHarmonic[]; hoveredCurve: string | null }>();   // :5-8
const emit = defineEmits<{ hover: [key: string]; leave: [] }>();             // :10-13
```

The key space is `"sum" | "original" | \`h-${number}\``. It has four producers and three consumers, and not one of them is typed:

| Role | Site |
|---|---|
| produce | `ConvergenceLegend.vue:19` `'sum'` · `:24` `'original'` · `:33` `` `h-${i}` `` |
| produce | `ConvergencePlot.vue:218` `` key: `h-${hi}` `` · `:235` `key: "sum"` / `key: "original"` |
| consume | `ConvergencePlot.vue:188` `=== "original"` · `:206` `` === `h-${hi}` `` · `:223` `=== "sum"` |
| consume | `ConvergencePlot.vue:265-266` `h.startsWith("h-")` + `parseInt(h.slice(2))` — a hand-rolled parser |
| carry | `hit-test.ts:5-6` `interface CurveHitRegion { key: string; … }` |
| carry | this file, `:7` `hoveredCurve: string | null` — the widest possible type |

**Falsifier (static, needs no run).** Change `:33` to `` `harm-${i}` ``. Both the producer and every consumer are typed `string`; TypeScript has no relation to break, so `vue-tsc` cannot fail — and the highlight silently dies on 100% of harmonic rows. The failure is *invisible to the only gate the repo has* (census §5 #10: `vue-tsc` + 29 Playwright tests, no vitest). That is the defect: a protocol with six edges and zero type.

`lib/harmonics.ts` is the natural home — it already owns `TrigHarmonic` and `spectrumColor`, i.e. the *other* two facts keyed by the same index. A `type CurveKey = "sum" | "original" | \`h-${number}\`` plus a `harmonicKey(i)` builder collapses all six edges into one declaration and makes the rename above a compile error.

---

### D-L5 · MAJOR · R5-7 class: the entire variable surface is a native-element loop, and the component renders zero instances
**`ConvergenceLegend.vue:30`**

```vue
<div v-for="(h, i) in harmonics" :key="h.k" class="legend-entry" …>
```

Two measurements against the live tree:

```
grep -n "v-for"  ConvergenceLegend.vue   →  30           (exactly one loop)
grep -n "<[A-Z]" ConvergenceLegend.vue   →  (empty)      (zero component instances)
```

Corroborated independently by the corpus: `lane-frontend.md:270-271` enumerates glass-ui imports for `ConvergenceTimeline.vue:19,20` and lists **no** row for `ConvergenceLegend` — the component's markup is 100% native `div`/`span`.

This is R5-7 (`intakes/lane-fourier-r3-r6.md:125`) in a second, independent subtree — and a sharper instance than `PaperSidebar`. There, three native `<li v-for>` rows dropped a TOC subtree. Here the native loop **is the component's whole variable render surface**, and the component contributes zero component-callsite evidence of any kind. A derivation keyed to component callsites (the pre-R6 model) books this file as a leaf with **0 loop rows and 0 mounted subjects**; under R6's `NATIVE_TEMPLATE_LOOP` cure (`:139`, `NATIVE-LOOP-GATE-VERDICT.json` GREEN 11/11) it books exactly **1** row, expression `(h, i) in harmonics`.

**Why it is a MAJOR and not bookkeeping:** the invisible cardinality is the input to D-L3's severity. An instance-derived budget reads 0 DOM rows for this component; the true worst case is **102** (2 fixed + 1 divider + N ≤ 100) inside a `max-height`-pinned scroll box overlaying the interactive plot. F.W4's per-component D/L/C audit inherits exactly this blind spot unless it counts native element loops — which is the carry R5-7 already booked to F.W4 and which this row now shows is not `PaperSidebar`-specific.

**Falsifier.** If `PaperSidebar` were the only member of the class, R5-7 would be a one-off worth no generalisation. It is not: here is a second member, in a different subtree, found by the same two greps, with a *larger* blind cardinality. To kill this row you would have to show the deriver counts native loops today — which R5's own leaf (`leafValues["instance.loop.paper-sidebar"] = []`) refutes for the pre-cure model.

---

### D-L6 · MAJOR · every legend boundary event forces a full canvas bitmap reallocation
**`ConvergenceLegend.vue:19, :24, :33-34`** → **`ConvergencePlot.vue:295-296, :88-96`**

The legend emits unconditionally and uncoalesced — three `@pointerenter` bindings and three `@pointerleave` bindings, no `key === current` check, no debounce. The parent's handlers have **no guard either**:

```ts
ConvergencePlot.vue:295   function onLegendEnter(key: string) { hoveredCurve.value = key; if (!playing.value) draw(); }
ConvergencePlot.vue:296   function onLegendLeave()            { hoveredCurve.value = null; if (!playing.value) draw(); }
```

Compare the canvas's own hover path in the same file, which **does** guard:

```ts
ConvergencePlot.vue:246   if (hit !== hoveredCurve.value) { hoveredCurve.value = hit; if (!playing.value) draw(); }
```

The guard is the house convention; the legend path is the one place it is missing. And `draw()` is not cheap — it reassigns the canvas dimensions on **every** call:

```ts
ConvergencePlot.vue:88-89   canvas.width  = Math.round(rect.width  * dpr);
                            canvas.height = Math.round(rect.height * dpr);
```

Assigning `canvas.width` resets the backing bitmap and all 2D context state even when the value is unchanged (this is the canonical `canvas.width = canvas.width` clear idiom). The tell is three lines below: `:94-96` re-establishes `setTransform` / `lineCap` / `lineJoin` every frame precisely because the reset wipes them.

Per-`draw()` compute, counted from source: `:144` harmonic curves = `totalH × nPts`; `:159-163` `fullSum` = another `totalH × nPts`; `:148-156` `sumY` = `nPts × totalH` weighted accumulation — with `nPts = 500` (`:108`) and the default `totalH = 20` that is ~30 000 trig evaluations plus two `Math.min/max(...spread)` calls over 1 000-element arrays (`:164`). Sweeping the pointer down the default 22-row legend crosses 22 boundaries = **44 emits → 44 bitmap reallocations → ~1.3M trig evaluations**, while paused. (Under autoplay the `draw()` calls are suppressed by the `!playing` check and the rAF absorbs it — so this is the *paused-inspection* path, i.e. exactly the workflow the legend exists to serve.)

**Falsifier.** Two independent kills: (a) if the parent guarded like `:246`, the leave→enter pair collapses to one draw; (b) if `draw()` resized only on an actual dimension change, the reallocation vanishes. Neither holds at HEAD — `:88-89` are unconditional, `:295-296` are unguarded. Livable frame-time magnitude is `UNPROVEN-NEEDS-LIVE` (SS-13); the call counts above are source-derived and stand.

**Killed sub-claim (recorded, not deleted):** I initially extended this to touch-scrolling the legend (`overflow-y: auto`, `:48`) firing enter/leave per row traversed. **Refuted by its own falsifier:** touch pointers receive implicit pointer capture at `pointerdown`, so a finger-scroll dispatches exactly one `pointerenter` and one `pointerleave` on the capture target, not one per row. The mouse-sweep case above survives; the touch case does not.

---

### D-L7 · MINOR · `TrigHarmonic` is declared twice in the same feature folder
**`ConvergenceLegend.vue:2, :6`** → **`lib/harmonics.ts:10-15`** vs **`composables/useCurveTransition.ts:10-15`**

```
lib/harmonics.ts:10             export interface TrigHarmonic { k; a_n; b_n; amplitude }
composables/useCurveTransition.ts:10  export interface TrigHarmonic { k; a_n; b_n; amplitude }
```

The subject's prop type (`:6`) resolves to the first. The parent imports the first (`ConvergencePlot.vue:10`) and passes it into `snapshotForTransition` (`:311`), whose signature declares the **second** (`useCurveTransition.ts:60`). The call compiles only because the two are structurally identical — nominally they are unrelated types, two directories apart, with no import between them.

**Falsifier.** If either declaration gained or renamed a field, the mismatch would surface at `ConvergencePlot.vue:311` and the drift would be caught. Today neither has — which is precisely why the duplication is invisible and why it is worth booking now rather than after the drift. Filed MINOR, not MAJOR: there is no live symptom, only an unguarded seam on the component's own public prop type.

---

### D-L8 · MINOR · the legend swatch publishes a colour the plot never draws
**`ConvergenceLegend.vue:36`** ↔ **`ConvergencePlot.vue:207`** ↔ **`harmonics.ts:81-88`**

```vue
ConvergenceLegend.vue:36  :style="{ background: spectrumColor(i, harmonics.length) }"      /* alpha defaults to 1 */
ConvergencePlot.vue:207   ctx.strokeStyle = spectrumColor(hi, totalH, isHov ? 1.0 : 0.55);  /* 0.55 unless hovered */
harmonics.ts:84           alpha: number = 1,
```

The legend's whole contract is the swatch↔curve identity map, and it publishes each harmonic at α=1 while the plot strokes it at α=0.55 over a variable backdrop. Hue is preserved, so identification degrades rather than breaks — hence MINOR, not MAJOR. The third call-site alpha (`isHov ? 1.0`) means the swatch happens to match *only* while that curve is already hovered, i.e. exactly when the map is least needed.

**Falsifier.** If the canvas drew non-hovered harmonics at 1.0, or the dot at 0.55, the claim dies. Neither does — `:207` is the only harmonic stroke in `draw()`, and `:36` passes no third argument.

Adjacent, same shape, same file: the `Sum` swatch is `var(--viz-amber)` + a `box-shadow` glow (`:77-80`), while the plot's sum curve is painted by `applyGoldenShimmer` (`ConvergencePlot.vue:223`), a shimmer whose colour law lives in `@/lib/golden-shimmer` and is *not* `--viz-amber` by construction. The legend approximates a shimmer with a static amber dot; that is a design decision, not a library defect, and is not counted here.

---

### D-L9 · MINOR · three hand-written literal greys for one curve identity; a token exists and is not used
**`ConvergenceLegend.vue:83`**

```css
.legend-dot--dashed { background: transparent; border: 2px dashed rgba(180, 180, 180, 0.6); }
```

This is the third spelling of "the f(x) curve's identity colour" in the pair, and none of the three agree:

```
ConvergenceLegend.vue:83   rgba(180, 180, 180, 0.6)     ← the legend swatch
ConvergencePlot.vue:189    rgba(180, 180, 180, 0.55)    ← the resting stroke
ConvergencePlot.vue:189    rgba(220, 220, 220, 0.85)    ← the hovered stroke
```

The repo maintains a viz-colour registry for exactly this — `lib/colors.ts:77-88` `VIZ_COLORS` (reactive), re-resolved from `--viz-*` CSS custom properties on mount and on theme toggle (`:90-95` `resolveVizColors()`; corroborated at `lane-frontend.md:554`). The literal is also **theme-blind**: it is byte-identical in light and dark, unlike every token beside it in this stylesheet (`--foreground`, `--muted-foreground`, `--viz-amber` at `:63, :69, :78, :89`).

**Falsifier.** `grep -n "\-\-viz\-" ConvergenceLegend.vue` → `:78, :79, :94` only, all `--viz-amber`. There is no `--viz-muted` / `--viz-grid` token to reach for, so the fix requires minting one upstream. That is why this is MINOR (a token *gap*, correctly identified) rather than MAJOR (a token *misuse*).

---

### D-L10 · MINOR · glass tier and scroll container on the same box: the material layers scroll off the plate
**`ConvergenceLegend.vue:17, :48-49`** ↔ **glass-ui 4.0.0 `dist/styles/glass/{material,ladder}.css`**

`.glass-wash` is not a flat background. At the installed 4.0.0 it is painted by two pseudo-element layers, both absolutely positioned:

```
dist/styles/glass/ladder.css:36     .glass-wash { position: relative; background: …; backdrop-filter: …; }
dist/styles/glass/material.css:66   .glass-wash::before { content:""; position:absolute; inset:0; … }   /* moving specular */
dist/styles/glass/ladder.css:336    .glass-wash::after  { content:""; position:absolute; inset:0; … }   /* grain overlay */
```

The local rule makes that same element a scroll container:

```css
ConvergenceLegend.vue:48-49   overflow-y: auto;  overflow-x: hidden;
```

An absolutely positioned box whose containing block is a scroll container translates with the scrolled content. Both material layers therefore ride the scroll and detach from the plate the moment the list overflows — which D-L3 shows is the **default** state at N = 20, not an edge case.

**Falsifier.** If the pseudo-elements were `position: fixed`, or the tier painted purely via `background` with `background-attachment: local`, the claim would die. Only the *first* half survives: `.glass-wash`'s own `background` and `backdrop-filter` (`ladder.css:38-40`) are on the element itself and stay put. So the plate persists and the grain + specular detach — a partial, not total, material failure. Hence MINOR. `UNPROVEN-NEEDS-LIVE` for the rendered result (SS-13); the mechanism is fully static.

The clean fix is the standard one: move the scroll to an inner wrapper and leave the tier on a non-scrolling shell.

---

### D-L11 · MINOR · the `--viz-amber` contrast carry was measured against a denominator that does not hold here
**`ConvergenceLegend.vue:93-96`** ↔ **`web/src/style.css:112-127`**

```css
ConvergenceLegend.vue:86-96   .legend-label { font-size: 13px; line-height: 1.3; … }
                              .legend-label--golden { color: var(--viz-amber); font-weight: 600; }
```

The repo's own carry states the measurement basis explicitly:

```
style.css:112-118  "glass-ui ships light --viz-amber at hsl(35 70% 42%) ≈ 3.54:1 against --background
                    — fails WCAG AA for normal text. The override darkens to hsl(35 76% 35%) ≈ 4.6:1"
```

At this site the backdrop is **not** `--background`. It is `--glass-bg-wash` (a translucent plate, `ladder.css:38`) composited over a `<canvas>` that has just stroked up to 100 saturated `hsla(…, 85%, 55%)` harmonic curves (`harmonics.ts:87`) and a golden shimmer. 13px at weight 600 is *normal* text under WCAG (large = ≥18.66px bold or ≥24px), so the 4.5:1 floor applies against whatever is actually behind it.

**Falsifier.** Re-measure `--viz-amber` over the plate with a bright harmonic beneath it. If it clears 4.5:1 in the worst backdrop, the row dies. `UNPROVEN-NEEDS-LIVE` (SS-13). **Cross-lane discipline:** this folds into the already-held glass-ui carry (`lane-frontend.md:604`, census §5 #8) as an additional *denominator* note — do not open a second carry.

---

### D-L12 · INFO · `:key` and identity disagree — and the falsifier KILLS the defect
**`ConvergenceLegend.vue:30`**

```vue
v-for="(h, i) in harmonics" :key="h.k"
```

The list is keyed by the harmonic number `k`, while every other identity in the component and its parent is the **positional index** `i`: the colour (`:36`), the hover key (`:32-33`), the parent's stroke colour and hit key (`ConvergencePlot.vue:206-207, :218`), and the tooltip's index parse (`:266`).

**I attempted to construct a case where k-order ≠ i-order and could not.** `groupTrigHarmonics` dedupes by `k` through a `Set` (`harmonics.ts:30-32`), sorts ascending (`:47`), and only then slices (`:48`) — so the key sequence is always strictly monotone in the index, and keyed patching can never reorder a node relative to its index. **The falsifier fails; there is no defect at HEAD.** Recorded as INFO, and only as a latent hazard for any future `<TransitionGroup>` or per-node DOM state, which would make the disagreement observable.

This row is included deliberately: L-18 requires that a claim which does not survive its falsifier be reported as *not surviving*, not quietly dropped.

---

### D-L13 · INFO · zero behavioural coverage; the one gate that reaches this file only pins its pixels
**`web/package.json`** · **`web/e2e/visual-baseline.spec.ts:34`**

```
grep -rn "vitest" web/package.json      →  (no match)          — corroborates census §5 #10
grep -rln "equation" web/e2e/           →  visual-baseline.spec.ts  (only)
grep -rn  "legend"   web/e2e/           →  0 hits in any equation spec
```

The sole e2e reaching `/equation` is a 3-viewport screenshot sweep (`:31-44`). It pins the legend's *rendering* — and would therefore lock in D-L3's occlusion as a baseline — while asserting nothing about D-L1 (hover protocol), D-L2 (empty-harmonic guard), or D-L6 (redraw cost). Every defect above is invisible to every gate the repo owns.

**Falsifier.** Point at one test that exercises a legend hover or an empty-harmonic input. There is none.

---

### D-L14 · INFO · template triplication, correctly *not* worth extracting
**`ConvergenceLegend.vue:18-19, :23-24, :31-34`**

The `:class="{ 'is-hovered': … }"` + `@pointerenter` + `@pointerleave` triple is written three times for one row concept with three variants, and the `<span class="legend-dot">` + `<span class="legend-label">` pair three times more.

**Falsifier applied, and it argues against the obvious fix.** At 97 LOC the module sits squarely in the Goldilocks band (the sibling `ConvergenceTimeline` is 146; the parent is 410). The repo's own standing law — `feedback_kiss_no_contrivance` ("don't create wrapper components that don't exist yet") and `feedback_no_god_modules` — argues against minting a `LegendEntry.vue`. A local `computed` rows array (`{ key, label, dotClass, dotStyle }[]`) would collapse the triplication *and* fix D-L4's literal-key spread without a new file. Filed INFO because a reviewer could reasonably decline it; noted because it is the cheapest carrier for the D-L4 fix.

---

## §3 — Superlatives (L-18, running the other way)

### S-1 · The teardown/leak class is structurally absent
**`ConvergenceLegend.vue:1-14`** — the entire `<script setup>` is fourteen lines containing exactly two statements: `defineProps` and `defineEmits`.

```
grep -n "onMounted|onUnmounted|addEventListener|setInterval|setTimeout|requestAnimationFrame|Observer|watch(|ref(" ConvergenceLegend.vue  →  0 hits
```

No lifecycle hook, no listener registration, no observer, no timer, no rAF, no local reactive state. The axis's leaks/teardown class cannot exist here — not because it was handled, but because nothing was acquired. Contrast the two files it sits between: the parent holds a `ResizeObserver`, two rAF loops, a cancel closure and a mutable `cachedScreenCurves` array, and must dismantle four things on unmount (`ConvergencePlot.vue:44-51, :323-333`); the sibling holds a `scrubbing` ref (`ConvergenceTimeline.vue:36`).

**Falsifier.** Any acquired resource in the file. There is none.

### S-2 · Fully controlled: one source of truth for hover, no local mirror
**`ConvergenceLegend.vue:5-13`** — `hoveredCurve` comes in as a prop and `hover`/`leave` go out as events; the component stores no copy of the state it renders. The dual-source-of-truth class (this constellation's recorded `defineModel`/`shallowRef` stale-read caveat) is impossible here by construction. Note that the sibling `ConvergenceTimeline` does mirror parent state locally (`scrubbing`, `:36`, with an explicit re-entrancy guard at `:47`) — the legend needed no such guard.

**Falsifier.** Find one writable local binding. There is none.

### S-3 · Upgrade-clean against the glass-ui 4→7 break wave
The component imports **zero** components (`grep '<[A-Z]'` → empty; corroborated by the absence of any `ConvergenceLegend` row in `lane-frontend.md:270-306`'s glass-ui import inventory). Its only glass-ui coupling is the `glass-wash` *class name*, and I verified that class is a real, live rule at the installed 4.0.0 (`ladder.css:36`) — not a dangling string. `lane-frontend.md:382` independently measures `glass-wash` as one of the three live post-4.0.0 tier names, so it survives the uplift.

Consequence: none of census §5 #1/#10's break surface reaches this file — not the `./hover-popover` removal (2 sites, `lane-frontend.md:474`), not `DockIconButton`'s member-level removal (2 sites, `:475`), not the 11 removed subpaths, not `ToastVariant`. In a tri-package resolution deadlock (census §5 #1) this is a component that costs the migration nothing.

**Falsifier.** If `glass-wash` had been renamed at 5.0.0, the plate would silently vanish with no typecheck error — the exact failure mode this superlative claims immunity from. `lane-frontend.md:382` measures it as live; the claim survives.

### S-4 · Motion law observed without remediation
**`ConvergenceLegend.vue:59`** — `transition: background 0.1s`, a **named** property. Both neighbours carry explicit A.W3.d remediation comments for having previously used `transition: all` (`ConvergenceTimeline.vue:114-118` "named properties + canonical token, no `transition: all`"; `ConvergencePlot.vue:400-402`). The legend required no such pass.

```
grep -n "transition: all" ConvergenceLegend.vue  →  0 hits
```

**Honest limit on this superlative:** the file ships no `prefers-reduced-motion` block, unlike its parent (`ConvergencePlot.vue:405-409`). That is *not* a defect — a 100ms background fade on hover is not a vestibular trigger, and the census's reduced-motion gap is booked against the two ungated **rAF clocks** (`lane-frontend.md:624`), neither of which lives here. The superlative is scoped to the named-property law only.

---

## §4 — What I could not prove (SS-13 queue)

| Row | Live probe required | Escalation if confirmed |
|---|---|---|
| **D-L1** | Log dispatch order of `pointerenter`(legend) vs `mouseleave`(canvas) for one canvas→legend crossing at `/equation` | MAJOR → **BLOCKER** (primary interaction dead) — or → MINOR if mouse fires first |
| **D-L3** | `.legend-overlay` bounding box vs canvas box at 1280×800, N=20 default | MAJOR stands / → MINOR if <30% of plot height |
| **D-L6** | Frame time + `draw()` call count across one 22-row legend sweep while paused | MAJOR stands / magnitude only |
| **D-L10** | Scroll the legend at N=20 and observe whether grain + specular translate | MINOR stands / dies if layers hold |
| **D-L11** | Contrast readback of `--viz-amber` over `glass-bg-wash` + a bright harmonic | MINOR → MAJOR if <4.5:1 in the worst backdrop |

Everything else in §2 and §3 is source-derived and needs no browser.

---

## §5 — Ledger

| id | severity | class | one line |
|---|---|---|---|
| D-L1 | MAJOR | error posture / composable contract | pointer-family emit races the consumer's mouse-family clear; sole `pointerenter` site in the tree |
| D-L2 | MAJOR | correctness | `v-if="harmonics.length"` hides the two unconditional entries while the canvas still draws both curves |
| D-L3 | MAJOR | viz render path | `pointer-events-auto` overlay pinned at `max-height` occludes the plot's only hit-test surface at default N |
| D-L4 | MAJOR | wrong types | 6-edge curve-key protocol typed `string` end to end; a rename cannot fail the only gate |
| D-L5 | MAJOR | R5-7 class | whole variable surface is one native `v-for`; zero component instances ⇒ instance derivations read 0 of 102 rows |
| D-L6 | MAJOR | viz render path / efficiency | unguarded emits drive an unguarded `draw()` that reallocates the canvas bitmap every call |
| D-L7 | MINOR | duplication / wrong types | `TrigHarmonic` declared twice, two dirs apart; the call compiles on structural luck |
| D-L8 | MINOR | correctness | swatch α=1 vs stroke α=0.55 — the legend publishes a colour the plot never draws |
| D-L9 | MINOR | duplication / colocation | three literal greys for one curve identity beside a live `--viz-*` token registry |
| D-L10 | MINOR | viz render path | glass tier's abspos material layers scroll off the plate because the tier box is also the scroller |
| D-L11 | MINOR | correctness | the WCAG carry's `against --background` denominator does not hold over a glass plate on a canvas |
| D-L12 | INFO | *falsifier failed* | `:key="h.k"` vs index identity — provably benign at HEAD; latent only |
| D-L13 | INFO | test coverage | no vitest; the only spec reaching `/equation` pins pixels, asserts no behaviour |
| D-L14 | INFO | duplication | 3× template triplication; extraction correctly declined under the repo's KISS law |
| S-1 | — | superlative | zero acquired resources ⇒ the teardown/leak class cannot exist |
| S-2 | — | superlative | fully controlled; no local mirror of hover state |
| S-3 | — | superlative | zero component imports ⇒ immune to the whole glass-ui 4→7 break surface |
| S-4 | — | superlative | named-property transition; needed no A.W3.d remediation pass |

**14 defects · 0 blockers · 4 superlatives.**
