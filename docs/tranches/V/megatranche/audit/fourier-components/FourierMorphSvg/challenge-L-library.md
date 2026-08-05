claude-opus-5[1m]

# CHALLENGE — `FourierMorphSvg` · axis L (LIBRARY)

**Target** `fourier-analysis/web/src/components/decorative/FourierMorphSvg.vue` (41 lines, read whole)
**Imports** — **none**. The SFC has zero `import` statements. Its entire defect surface is therefore
(a) its own props contract and (b) the path-production chain it terminates. Both were read whole:
`composables/useFourierMorph.ts` (230) · `composables/useMorphConfig.ts` (97) · `lib/svg-fourier.ts` (154) ·
consumers `layout/DarkModeToggle.vue` (109) + `morph/MorphShapePreview.vue` (175) + their driver
`morph/FourierMorphDemo.vue` · sibling `morph/HarmonicLevelGrid.vue` · `lib/scheduler.ts` ·
`node_modules/@mkbabb/keyframes.js@4.3.0/dist/keyframes.d.ts` · the 7 shipped `assets/fourier-paths/*.json`.

**Posture** — assumed DEFECTIVE at open. Static + source-derived only; no browser tooling. Every row
carries severity, `file:line`, and its own falsifier. §D records the claims whose falsifiers **fired**
and were withdrawn — L-18 runs both ways, and so does the falsifier.

**Verdict** — the component itself is close to clean and is *not* the defect site; the machinery that
produces its one required prop is where the bodies are. **1 BLOCKER · 14 defects · 4 superlatives.**

---

## §A — The component itself

### L-07 · MINOR · two of four prop defaults are dead at every call site
`FourierMorphSvg.vue:28-32` declares defaults for `viewBox` and `strokeWidth`. There are exactly two
importers in the tree (`grep -rn FourierMorphSvg src/` → `DarkModeToggle.vue:19,7` and
`MorphShapePreview.vue:48,5`), and **both pass both explicitly**:

| prop | default | `DarkModeToggle.vue` | `MorphShapePreview.vue` | default reachable? |
|---|---|---|---|---|
| `viewBox` | `"0 0 200 200"` (:29) | `view-box="0 0 200 200"` (:11) | `view-box="0 0 200 200"` (:8) | **no — 0/2** |
| `strokeWidth` | `3` (:31) | `:stroke-width="14"` (:9) | `:stroke-width="4.5"` (:8) | **no — 0/2** |
| `strokeColor` | `"var(--accent-red)"` (:30) | `:stroke-color="strokeColor"` (:10) | *(omitted)* | yes — 1/2 |

Dead code by enumeration. Worse, both sites restate the *same literal* `"0 0 200 200"` that the default
already carries, so the string exists in three places for two consumers (a fourth and fifth copy live at
`HarmonicLevelGrid.vue:66` and `FourierShapeExtractor.vue:12,75`).
**Falsifier** — a third importer that omits `view-box` or `stroke-width`. A whole-tree grep for
`FourierMorphSvg` returns 4 lines: 2 imports, 2 callsites. None omits either. Claim stands.

### L-08 · MINOR · `strokeWidth` is user-space, so the same prop value renders at different device widths
`:stroke-width` (`FourierMorphSvg.vue:12`) is emitted into a `viewBox`-scaled coordinate system, so the
prop is a *ratio*, not a width. `MorphShapePreview` passes the single value `4.5` (`:8`) into a button
that is `120px` below the 640px breakpoint and `180px` above it (`MorphShapePreview.vue:92-93, 100-106`)
— a **1.5× swing in painted stroke width from one unchanged prop**. Across consumers the divergence is
larger still: `14` (toggle, into a `5rem` box, `DarkModeToggle.vue:78-79`) vs `4.5` — two authors
hand-tuned magic numbers to land in the same optical range because the unit is unstated. A default of
`3` cannot mean anything without a render size. The platform answer the component declines to use is
`vector-effect="non-scaling-stroke"`, which would make the prop mean px and make the default meaningful.
**Falsifier** — if the SVG had a fixed intrinsic size, user-space units would be stable. It has none
(no `width`/`height` attribute, no width/height in the scoped block, `:36-40`), so the used size is the
container's and the two breakpoints differ. Claim stands. *(Exact device-px values are UNPROVEN-NEEDS-LIVE
for SS-13; the 1.5× ratio is arithmetic from the two CSS rules and needs no browser.)*

### L-09 · MINOR · the inline `color` style is unconditional and permanently outranks the cascade
`:style="{ color: strokeColor }"` (`:6`) combined with `withDefaults` (`:20-33`) means `strokeColor` is
**never** `undefined`, so Vue always emits an inline `style` attribute. Inline styles beat every author
stylesheet rule, therefore `.fourier-morph-svg { color: … }`, a parent `:hover`, a `.dark` rule, or a
`@media` override can never take effect without `!important`. The consequence is visible one file over:
`DarkModeToggle.vue:39-56` hand-rolls an integer RGB lerp (`lerpColor`) and recomputes it on every
`morphProgress` tick because the CSS route is closed to it — re-implementing colour mixing the app
already depends on (`value.js ^0.13.0`, `package.json`, which exports `mixColorsN`/`sampleColorRamp`).
The sibling `HarmonicLevelGrid.vue:70` proves the `color` indirection is unnecessary: it paints the same
path with `stroke="var(--accent-red)"` directly.
**Falsifier** — if `strokeColor` were optional-without-default, Vue would omit the property and the
cascade would work. `withDefaults` at `:28-32` forecloses that. Claim stands.

### L-10 · MINOR · a fallback-less `var()` on a *third-party* token, as a JS string default
`strokeColor: "var(--accent-red)"` (`:30`). `--accent-red` is defined **nowhere in `web/src`**
(`grep -rnE -- "--accent-red[[:space:]]*:" src/` → empty); it is owned by glass-ui and arrives only via
`style.css:3`'s `@import "@mkbabb/glass-ui/styles"` (defined at
`node_modules/@mkbabb/glass-ui/dist/styles/tokens/light-dark.css:142`). The `var()` carries **no
fallback**, so the degradation path is undefined-by-omission: an unresolved custom property makes the
declaration invalid-at-computed-value-time and `color` — an inherited property — silently falls back to
the ambient text colour rather than to any chosen stroke. `color: var(--accent-red, currentColor)` is
the one-token fix. Nothing gates this: vitest is ABSENT (§C).
**Falsifier (partially FIRED — severity reduced, see §D-1)** — I predicted the glass 4→7 uplift would
drop the token and break the default. It does not: `glass-ui/src/styles/tokens/color-radius.css:321`,
`dark-arm.css:154` and `light-dark.css:169` all still define `--accent-red` at 7.x. The uplift-risk half
of this claim is **withdrawn**; the missing-fallback posture stands on its own.

### L-12 · INFO · a component in `decorative/` never declares itself decorative
No `aria-hidden="true"`, no `role`, no `<title>`, no `focusable="false"` (`:2-16`). In `DarkModeToggle`
the SVG is the sole child of a button whose name comes from `aria-label` (`DarkModeToggle.vue:5`), so
there is no name *conflict* — but a nameless `<svg>` element is still exposed by some engines, which
would inject an unnamed node inside the control.
**Falsifier** — the AX-tree outcome is engine-specific and I ran no browser: **UNPROVEN-NEEDS-LIVE
(SS-13)**. The source-level claim (a `decorative/` primitive that carries no decorative semantics, and
whose two consumers therefore cannot state intent) needs no browser and stands. Properly this row is the
A-axis's; recorded here only so it is not lost between axes.

### L-14 · INFO · `overflow: visible` un-clips a stroke that is also hit-testable
`.fourier-morph-svg { overflow: visible }` (`:39`) disables the UA's `overflow:hidden` on the SVG root,
so any geometry outside the `viewBox` paints outside the element's box — and painted stroke geometry
receives pointer events by default (`pointer-events: visiblePainted`), while neither consumer sets
`pointer-events: none`. In `DarkModeToggle` the parent is a `border-radius: 50%` button with no
`overflow: hidden` (`DarkModeToggle.vue:83`), so overflow escapes the control's visual bounds.
**Falsifier — largely FIRED.** I measured every shipped asset: the widest excursion in the two shapes
this component actually renders is `moon.json` at `y ∈ [36.48, 183.04]` and `sun.json` at
`x ∈ [13.32, 177.75]`; with the toggle's `stroke-width: 14` the half-width adds 7 user units → 190.04
max, still inside the 0–200 box. **Nothing overflows today**, so this is a latent property of the rule,
not a live defect — INFO, not MINOR. Retained because the rule is undocumented and the margin is 10
user units: `paper.json` (`y` to 182.29) plus a wider stroke would consume it.

---

## §B — The render path that produces the one required prop

Provenance for the architecture claims: `CENSUS-2026-08-03.md §3a` and `lane-frontend.md §6`
("**Canvas2D throughout. WebGL/WebGPU: ABSENT**… Three independent canvases + a 12-file SVG surface";
`decorative/FourierMorphSvg.vue` is named in the **SVG surfaces (12 files)** list). FourierMorphSvg sits
entirely **outside** canvas Paths A/B/C — it is SVG, driven by a keyframes `Animation` inside
`useFourierMorph.ts`. That clock is not enumerated in §6.

### L-01 · **BLOCKER** · `stopAnim()` is a fast-forward, not a cancel — teardown provably starts new work after unmount
The producer's own contract, `keyframes.js@4.3.0/dist/keyframes.d.ts:522-529`:

> *"Halt playback where it stands: cancel the loop AND the WAAPI compositor animations, settle state, and
> **resolve any pending `play()` promise**."*

`useFourierMorph.ts:115-120` implements cancellation as `currentAnim.stop()`. But every phase of
`morphTo` is awaited **through** that promise (`:178`, `:192`, `:207`):

```ts
await new Promise<void>((resolve) => {
    currentAnim = createTweenAnimation(Animation, settleOutMs, …);
    currentAnim.play().then(() => resolve());     // ← stop() RESOLVES this
});
```

So `stop()` does not abort the chain — it **advances** it. There is no generation token, no aborted flag,
no mounted check anywhere in the file (`grep -nE "cancel|abort|generation|token|isMounted|unmount"
useFourierMorph.ts` → only the `onUnmounted` line itself). Two proven manifestations:

**(a) The teardown hook does the opposite of tearing down.** `onUnmounted(() => stopAnim())` (`:215`)
resolves the in-flight phase, whereupon `morphTo` proceeds to Phase 2 and **constructs and plays a brand
new `Animation`** (`:187`), then Phase 3 (`:200`) — both *after* the component is gone and after the only
cleanup hook has already fired. Nothing can stop them; they hold the `from`/`to` `FourierShape` closures
(10 levels × 512 points each, from ~225 KB JSON) until the chain drains. Reachable: `/morph` is a lazy
route, and phase durations are user-tunable to **800 ms each** (`MorphPhaseConfig.vue:14-15,24-25`), so
the orphan window is up to 1.6 s of post-unmount animation, not one frame.

**(b) A live, unguarded race that silently discards a user action.** `handleReset` (`FourierMorphDemo.vue:176-178`)
calls `morph.setShape(currentShape.value)` → `setShape` calls `stopAnim()` (`useFourierMorph.ts:90`) →
the in-flight phase resolves → Phases 2 and 3 resume against the **stale** `from`/`to` captured in the
closure and overwrite `currentPoints` (`:189`, `:204`), i.e. overwrite the reset. The Reset `<Button>`
carries **no `:disabled`** (`FourierMorphDemo.vue:75-78`) — note that its siblings *are* guarded
(`:disabled="isAnimating"` at `:18`; `isAnimating` early-returns in `handleToggle` `:127` and
`handlePreviewClick` `:135`), which is what makes this an omission rather than a design. Net observable
at `FourierMorphSvg.vue:9`: the pre-reset shape wins, and the composable then reports `phase: "idle"`,
`morphProgress: 1` — a *successful-looking* terminal state for a discarded action.

**Falsifier** — this collapses if `stop()` left the `play()` promise pending (chain would stall, not
advance) or if the composable held any cancellation state. The first is refuted by the producer's d.ts
quoted above; the second by the empty grep. I also checked the inverse hypothesis (that a pending promise
would hang `morphTo` forever and permanently freeze the toggle, since both `handleToggle`s early-return
on `phase !== "idle"`) — that is the *other* branch of the same missing-cancellation defect, and the d.ts
tells us which branch we are on. Claim stands.
**Why BLOCKER** — a teardown hook whose documented job is cancellation and which demonstrably schedules
new work after unmount is a false guarantee at the library layer; it is the shared root of (a) and (b);
and no gate in the repo can observe it (§C, L-11).

### L-02 · MAJOR · the engine promise caches its own rejection forever
`useFourierMorph.ts:38-43`:

```ts
let enginePromise: Promise<AnimationCtor> | null = null;
function getAnimationCtor() {
    if (!enginePromise) enginePromise = loadAnimationEngine().then((e) => e.Animation);
    return enginePromise;
}
```

A **rejected** promise is still truthy, so `if (!enginePromise)` never retries. One transient failure of
this lazy dynamic import — the classic post-deploy stale-chunk 404, and the census records fourier's
deploy chronic (`CENSUS §5 item 8`: host 44 commits behind, every push builds/fails/rolls back) —
poisons the module for the entire session: every subsequent `morphTo` awaits the same rejection. The
throw lands at `:149` *before* `phase.value = "settle-out"` (`:169`), so `phase` stays `"idle"`, the
button stays enabled and clickable, and it silently does nothing forever. Neither call site catches:
`DarkModeToggle.vue:71` and `FourierMorphDemo.vue:134` are both bare `await morph.morphTo(from, to)` in
an `async` handler (`grep -n "\.catch"` across both files → no hits), so each failed click also raises an
unhandled rejection. The module comment at `:33-36` reasons only about the success path ("the browser
caches the engine module after the first resolve").
**Falsifier** — a `.catch` that nulls `enginePromise`, or a retry at any call site, would refute it.
There is none in the file, and none at either consumer. Claim stands. *(Whether a chunk 404 occurs in a
given deploy is UNPROVEN-NEEDS-LIVE; the sticky-cache mechanism is static.)*

### L-06 · MAJOR · the silent-blank chain: bad data ⇒ an invisible control, no warning, no error
`FourierMorphSvg.vue:9` renders `:d="path"` with zero validation and no empty state, and `path: string`
(`:23`) cannot express "nothing to draw". The producing chain funnels every failure into that same empty
string:

1. `DarkModeToggle.vue:26-27` and `FourierMorphDemo.vue:99-100` — `prepareFourierShape(sunData as any)`.
   The `as any` severs the `FourierPathData` contract (`svg-fourier.ts:15-28`) at **every** entry point,
   so JSON drift is invisible to `vue-tsc`, the repo's primary gate.
2. `svg-fourier.ts:79-85` — `if (ps) pointsByLevel.set(…)`. A missing `partial_sums` key is **skipped
   silently**; no `else`, no throw, no warn.
3. `svg-fourier.ts:144-147` — `if (!loPoints || !hiPoints) return loPoints ?? hiPoints ?? []`. An empty
   map yields `[]`.
4. `svg-fourier.ts:51` — `if (points.length < 2) return ""`.
5. `FourierMorphSvg.vue:9` — `<path d="">`.
6. `DarkModeToggle.vue:82-83` — the host button is `border: 0; background: transparent` with the SVG as
   its **only** child. An empty `d` therefore paints an entirely **invisible interactive control**.

Five links, five silent degradations, one invisible button, zero diagnostics. The same posture is
defensible for genuinely decorative use and wrong for the control use, and the component has no way to
tell them apart (cf. L-12).
**Falsifier** — this needs malformed data to fire, so I measured all 7 shipped assets: `levels` and
`partial_sums` keys align in every one (sun/moon `[1,2,3,5,8,12,18,25,35,50]`, 512 points/level), so the
chain is **latent, not live today** — that is why this is MAJOR and not BLOCKER. It is also why the
`as any` at step 1 matters: it is the one link that would otherwise catch the drift at build time.

### L-04 · MAJOR · the morph ignores `prefers-reduced-motion`, and the PRM block that exists gates the wrong thing
`createTweenAnimation` (`useFourierMorph.ts:127-133`) passes `duration`, `iterationCount`,
`timingFunction`, `fillMode`, `useWAAPI` — and **not** `respectReducedMotion`, which keyframes ships as
an opt-in (`keyframes.d.ts:2227`, `:2472`, setter at `:332`) defaulting to **false** (dist:
`respectReducedMotion: !1`, 3 occurrences across the defaults objects). So the 350 ms default morph — up
to 2400 ms when the user raises all three sliders (`MorphPhaseConfig.vue:14-15`) — runs at full motion
under `reduce`. `DarkModeToggle.vue:104-107` makes this legible as an oversight rather than a decision:
the file *does* carry a `@media (prefers-reduced-motion: reduce)` block, and it disables only the 200 ms
hover `transform` while the shape animation beneath it is untouched.
**Falsifier** — a PRM gate anywhere in the chain would refute it. `grep -rn "prefers-reduced-motion\|
useReducedMotion" useFourierMorph.ts useMorphConfig.ts svg-fourier.ts FourierMorphSvg.vue` → the only
hit in the whole chain is the hover-transform block above. Claim stands. This confirms by independent
re-derivation the M-audit row at `docs/audits/runs/2026-06-16-M-deep-audit/raw-findings.json:1393` and
adds the mechanism (the producer already ships the opt-in; the caller declines it).

### L-05 · MAJOR · a documented invariant that the tree contradicts — the morph loop is **not** off-screen-gated
`lib/scheduler.ts:13-15` states as fact:

> *"NOT applied to the epicycle/**morph** RENDER loop: that is already rAF-paced AND **off-screen-gated
> (I.γ, `stores/animation.ts`)**"*

The off-screen gate is real — for the *canvas* path: `stores/animation.ts:48-53` plus `BasisCanvas.vue`'s
`IntersectionObserver` (`lane-frontend.md §6` Path A). The **morph** clock is a different clock in a
different file: the keyframes `Animation` inside `useFourierMorph.ts`, which imports only `vue`,
`@mkbabb/keyframes.js`, `svg-fourier` and `easings` (`:13-27`) — no store, no observer, no visibility
gate. So the second half of the sentence is false, and the morph is a **third ungated clock**, joining
`ConvergencePlot`'s (which `lane-frontend.md §6` Path B does flag: *"Not gated … a second, ungated
clock"*).
**Contradiction with the corpus, explicit** — `lane-frontend.md §6` closes the INP subsection with
*"Good hygiene, correctly scoped."* That verdict is correct about `processInChunks` and the yield floor,
but it takes `scheduler.ts`'s self-description at its word on the morph loop. The tree disagrees: the
census's own §6 enumerates exactly three canvases and never places the morph among the gated surfaces.
Impact is bounded (the toggle lives in the persistent header; a `/morph` scroll-away wastes ≤2.4 s of
rAF), so the severity is for the **false documented invariant**, which is what a future wave would rely on.
**Falsifier** — an `IntersectionObserver`, `document.visibilitychange`, or `stores/animation.ts` import
inside the morph chain would refute it. None exists in `useFourierMorph.ts`. Claim stands.

### L-03 · MAJOR · the decorative primitive is bypassed by its nearest neighbour
`HarmonicLevelGrid.vue:66-75` re-implements `FourierMorphSvg`'s template inline — same `viewBox="0 0 200
200"`, same `<path :d fill="none" stroke-width stroke-linecap="round" stroke-linejoin="round">` — and
imports the same producers (`interpolateAtHarmonicLevel`, `pointsToSvgPath`, `:93`). It differs in
exactly one way, and the difference is an indictment: it uses `stroke="var(--accent-red)"` **directly**
(`:70`) rather than routing through `color`/`currentColor`, demonstrating that L-09's indirection buys
nothing. Both files are rendered by the same parent (`FourierMorphDemo.vue:12,58`), so the duplication is
not across a module boundary — it is two siblings in one screen. A 41-line primitive whose immediate
neighbour re-hand-rolls it is failing its only job.
**Falsifier** — if the grid's needs diverged (different element, different attributes, an incompatible
data shape) the duplication would be justified. Diffing the two templates: identical element tree,
identical attribute set modulo the stroke source; same `FourierShape` input; same helper functions.
Claim stands.

### L-11 · MINOR · nothing anywhere asserts anything about this component's output
- **vitest is ABSENT** — corroborated by `CENSUS §3a` (*"vitest ABSENT — the only frontend gates are
  `vue-tsc` + 29 Playwright tests on a single chromium project"*) and `§5 item 10`; re-verified against
  the tree (`web/package.json` scripts: `dev`, `build`, `preview`, `test:e2e`, `test:e2e:ui` — no unit
  runner, no vitest in devDependencies).
- The only `/morph` e2e is `e2e/visual-baseline.spec.ts` — a **capture harness**, not an assertion gate:
  it screenshots to disk, and its sole `expect` is a horizontal-overflow check (`:65-68`, `overflow ≤ 2`).
  A blank path, a wrong stroke colour, or L-01(b)'s discarded reset all pass it.
- `e2e/paper-performance.spec.ts:328` clicks the toggle by accessible name but asserts nothing about the
  SVG; the click is a means to a theme change.

So L-01, L-02, L-04 and L-06 are all invisible to CI by construction.
**Falsifier** — any unit test or `toHaveScreenshot` baseline touching this component would refute it.
`grep -rln "FourierMorphSvg|MorphShapePreview|svg-fourier|pointsToSvgPath"` across `src/` and `e2e/`
returns no test file. Claim stands.

---

## §C — The R5-7 template-loop invisibility class, applied

Cited row: `audit/codex-provenance/intakes/lane-fourier-r3-r6.md:125` (**R5-7**, ADOPT-AS-FACT +
CARRY→F.W4) — *"template-loop evidence keyed to **component** callsites is blind to native HTML element
loops"* — and its cure, **R6-5**'s `NATIVE_TEMPLATE_LOOP` family (`:140`).

**Does the original form bite this component?** No. `FourierMorphSvg.vue` contains zero `v-for` and zero
native loops; it renders one `<svg>` and one `<path>`. Stated so the negative is on the record.

### L-13 · INFO · the same blindness at the *component* tier: a 2-vs-14 instance gap on `/morph`
R5-7's mechanism generalises one tier up. An instance derivation keyed to `FourierMorphSvg` callsites
counts **2** (`DarkModeToggle.vue:7`, `MorphShapePreview.vue:5`). The `/morph` route actually paints
**14** instances of that exact svg+path gestalt:

| source | mechanism | instances |
|---|---|---|
| `MorphShapePreview.vue:5` | component callsite | 1 |
| `DarkModeToggle.vue:7` (persistent header) | component callsite | 1 |
| `HarmonicLevelGrid.vue:66-75` | **native** `<svg>`/`<path>` inside `v-for="level in levels"` (`:55`) | **12** |

The 12 is exact, not estimated: `levels` is `morphConfig.previewLevels` (`FourierMorphDemo.vue:60`) =
`computePreviewLevels` (`useMorphConfig.ts:27-39`), whose candidate set is the 12 literals
`{1,2,3,5,8,12,18,25,35,50,75,100}`; the defaults `lowLevel: 5`, `highLevel: 50`
(`useFourierMorph.ts:63-64`) are already members, so the `Set` stays at 12.

R6-5's cure does **not** close this one. The loop at `:55` is on a `<Button>` — a *component* callsite, so
the loop itself was always visible; what is invisible is that its body emits a native SVG that is
semantically an instance of `FourierMorphSvg`. Component-keyed and native-loop-keyed evidence both miss it.
This also refines, without contradicting, `lane-frontend.md §6`'s **"SVG surfaces (12 files)"** — that
figure is explicitly *file*-keyed and correct as such; the painted-instance count on a single route is
larger, and a per-component D/L/C audit that reasons about render cost or theming reach from the file
count will undercount `/morph` by ~7×.
**Falsifier** — if `HarmonicLevelGrid` imported `FourierMorphSvg`, the 12 would be counted. It does not
(`:87-93` imports `Button`, `Slider`, `VIZ_COLORS`, and the two svg-fourier helpers — no component
import). Claim stands. *(Whether all 12 grid cells are simultaneously in the viewport is
UNPROVEN-NEEDS-LIVE; they are all mounted and patched regardless, which is what the count is about.)*

### L-15 · MINOR · the *unrolled* loop — a gap R6-5's cure cannot reach
`MorphShapePreview.vue:13-43` renders the four info-chips **twice**, byte-identical, as eight hand-written
`<div>`s toggled by `display:none` media queries (`.desktop-info` `:124-127`, `.mobile-info` `:128-133`,
flipped at `:135-145`). This is the inverse of R5-7: a native `v-for` is now countable under
`NATIVE_TEMPLATE_LOOP`, but a *manually unrolled* loop presents as N independent static leaves with **no
loop evidence at all**, so the cure passes over it. Cost: double DOM and double the interpolation
bindings for `phase`/`harmonicLevel`/`shapeName`/`totalMs`, all four of which update on **every morph
tick** — eight text nodes patched per frame where four would do, plus a duplicated `:class="phase"`.
**Falsifier** — if the two blocks differed (different content, order, or markup) the duplication would be
required. Diffing `:13-26` against `:30-43`: identical modulo the wrapper class. A single block with
responsive flex-direction, or one `v-for` over a 4-tuple, covers both. Claim stands. Properly this row
belongs to `MorphShapePreview`'s own challenge; recorded here because it is the R5-7 class's second face
and was found while reading this component's contract.

---

## §D — Claims withdrawn (falsifiers that fired)

Recorded because a challenge that only reports survivors is not a challenge.

- **D-1 · "`--accent-red` is undefined ⇒ the default stroke colour is dead on arrival."** My opening
  headline. `grep -rnE -- "--accent-red[[:space:]]*:" web/src/` is empty and the token appears in **zero**
  app CSS files — but the falsifier found it in the dependency:
  `node_modules/@mkbabb/glass-ui/dist/styles/tokens/light-dark.css:142`, reached via `style.css:3`.
  **Withdrawn.** Residue kept as L-10 (missing `var()` fallback), severity reduced from MAJOR to MINOR.
- **D-2 · "The glass 4→7 uplift will drop the token."** Checked the producer source directly:
  `glass-ui/src/styles/tokens/color-radius.css:321`, `dark-arm.css:154`, `light-dark.css:169` — all still
  define `--accent-red` at 7.x. **Withdrawn**; the uplift transaction (`CENSUS §5 item 1`) does not
  threaten this default.
- **D-3 · "`viewBox="0 0 200 200"` is a magic constant that clips the shipped data."** Measured all 7
  assets: max excursions are `sun.json` `x ∈ [13.32, 177.75]`, `moon.json` `y ∈ [36.48, 183.04]`,
  `paper.json` `y` to 182.29 — every one inside 0–200. **Withdrawn.** The residue (the literal is
  restated in five places and `FourierPathData` carries no bounds field to derive it from, so the
  coupling is convention-only) is folded into L-07.
- **D-4 · "`onUnmounted` leaks a permanently pending promise."** `keyframes.d.ts:526-529` says `stop()`
  *resolves* the pending `play()`. **Withdrawn** — and inverted: the truth is worse and became L-01(a),
  because resolving is what lets the chain start new animations after unmount.
- **D-5 · "The first paint shows a blank path."** `currentPoints` starts `[]` (`useFourierMorph.ts:80`)
  ⇒ `currentPath === ""`, and `DarkModeToggle` only calls `setShape` in `onMounted` (`:58-60`). But
  `onMounted` runs before paint and the reactive DOM update flushes on the same microtask checkpoint, so
  there is no observable flash. **Withdrawn** as a rendering claim; the underlying type gap (`path: string`
  cannot express "nothing to draw") survives inside L-06.

---

## §E — Superlatives (L-18, the other direction)

Each carries a falsifier on the same terms as the defects.

### S-1 · The component is leak-free *by construction*, and the teardown burden is correctly located
Zero imports, zero lifecycle hooks, zero refs, zero listeners, zero timers, zero DOM access across all
41 lines. There is literally nothing to tear down, and the animation ownership sits one layer up where
`onUnmounted` can see it (`useFourierMorph.ts:215`). That L-01 shows the composable's teardown to be
broken does not diminish this: the *placement* is right, which is why the fix is one file and not two,
and why the leaf needs no change at all.
**Falsifier** — any import, hook, listener, observer or timer in the SFC. Read whole: none.

### S-2 · A genuinely tight per-frame render surface
Only four attributes are bound (`:viewBox` `:2`, `:style` `:6`, `:d` `:9`, `:stroke-width` `:12`), and of
those only `:d` and the `color` style change during a morph. `fill`, `stroke`, `stroke-linecap` and
`stroke-linejoin` are **static** attributes (`:10-14`), so Vue hoists them and the per-tick patch touches
one attribute plus one style property — for a 512-point Catmull-Rom `d` string regenerated every frame
(`svg-fourier.ts:56-72`). Nothing in the leaf amplifies the cost of the frame.
**Falsifier** — a bound attribute that doesn't need to be, or a computed/watcher in the SFC, would show
as avoidable patch work per tick. There are none.

### S-3 · Correctly sized: it owns no clock, which is exactly why one leaf serves two unrelated consumers
The Goldilocks verdict is *pass*, and provably so rather than by taste: `DarkModeToggle` (a 60 fps
morphing interactive control with JS-interpolated colour) and `MorphShapePreview` (a static preview
inside a disabled-able button) share **zero** state, zero configuration, and different composable
instances — possible only because the component is a pure function of props with no internal clock or
lifecycle. Splitting it further would leave nothing; folding the animation in would have made the second
consumer impossible.
**Falsifier** — if the two consumers had to share or coordinate any state through the component, or if
either needed a variant/branch inside it, the abstraction would be wrong. Neither does; the SFC contains
no conditional of any kind.

### S-4 · The only file in its chain with zero `any`
Typed `defineProps` + `withDefaults`, no runtime validators, no casts (`:20-33`). Counted across the
chain: **6 `any` sites in the surrounding files, 0 here** — `DarkModeToggle.vue:26,27`,
`FourierMorphDemo.vue:99,100` (`as any` on the JSON imports), `useMorphConfig.ts:66`
(`(config as any)[field]`), `useFourierMorph.ts:135` (`(_vars: any, …)`). The leaf is the one place in
the morph feature where `vue-tsc` — the repo's primary gate, given vitest's absence — retains full
information.
**Falsifier** — one `any`, one `as`, one `@ts-expect-error`, or one untyped prop in the file. Grep over
the SFC for `\bany\b`: no hits.

---

## §F — Tally

| severity | ids |
|---|---|
| **BLOCKER** (1) | L-01 |
| MAJOR (5) | L-02, L-03, L-04, L-05, L-06 |
| MINOR (6) | L-07, L-08, L-09, L-10, L-11, L-15 |
| INFO (3) | L-12, L-13, L-14 |

**defects = 15** (L-01…L-15) · **blockers = 1** · **superlatives = 4** · **withdrawn = 5** (§D)

The one-line judgement: *`FourierMorphSvg` is a well-made 41-line leaf whose props contract has four
small flaws (two dead defaults, a unitless stroke, an inline style that locks the cascade) — and whose
single required prop is produced by a composable that mistakes "resolve the promise" for "cancel the
animation", which is the blocker.*
