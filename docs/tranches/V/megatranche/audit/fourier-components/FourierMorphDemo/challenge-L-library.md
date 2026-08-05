claude-opus-5[1m]

# CHALLENGE — `FourierMorphDemo.vue` · axis **L (LIBRARY)**

**Target** `/Users/mkbabb/Programming/fourier-analysis/web/src/components/morph/FourierMorphDemo.vue` (330 lines)
**Posture** Assumed DEFECTIVE until the tree proved otherwise. Static + source-derived only; no browser
tooling. Every claim carries severity · `file:line` · a falsifier. Superlatives carry falsifiers too (L-18
runs both ways).
**Read whole (read-only)**: the target; `MorphShapePreview.vue`, `MorphPhaseConfig.vue`,
`HarmonicLevelGrid.vue`, `decorative/FourierMorphSvg.vue`; `composables/useFourierMorph.ts`,
`composables/useMorphConfig.ts`; `lib/svg-fourier.ts`, `lib/easings.ts`, `lib/types.ts`, `lib/colors.ts`,
`lib/scheduler.ts`; `assets/fourier-paths/{sun,moon}.json`; `router/index.ts`; the sibling consumer
`layout/DarkModeToggle.vue`; and the installed producer typings
`node_modules/@mkbabb/keyframes.js/dist/keyframes.d.ts`,
`node_modules/@mkbabb/value.js/dist/easing.d.ts`,
`node_modules/@mkbabb/glass-ui/dist/composables/dom/useClipboard.d.ts`.

**Tally** — 22 defects (2 BLOCKER · 7 MAJOR · 13 MINOR) · 5 superlatives · 4 corpus reconciliations.

---

## §0 · Measured substrate (the numbers every claim below leans on)

Derived by executing the tree's own algorithms (`xyToPoints` → `interpolateAtHarmonicLevel` →
`pointsToSvgPath`, transcribed verbatim from `lib/svg-fourier.ts:38-153`) over the shipped JSON. Node,
no browser.

| Fact | Value | Source |
|---|---|---|
| `sun.json` / `moon.json` on disk | 225 687 B / 224 944 B (450 631 B total) | `assets/fourier-paths/` |
| `levels` (both files, identical) | `[1,2,3,5,8,12,18,25,35,50]` | JSON `levels` |
| `n_harmonics` / `n_samples` / `n_eval` | 50 / 512 / 512 | JSON |
| points per level | **512** | `partial_sums["<n>"].x.length` |
| one `pointsToSvgPath` output | **55.7 KB** (57 029 chars, 512 `C` segments, unrounded floats) | measured |
| `pointsToSvgPath` build cost | 0.145 ms (Node, warm) | measured, 100 iters |
| default `previewLevels` | `[1,2,3,5,8,12,18,25,35,50,75,100]` — **12** cells | `useMorphConfig.ts:30-38` with `(5,50)` |
| total `d`-attribute text in the grid | **667.6 KB** (683 574 chars) | measured, 12 cells |
| full 12-cell grid rebuild | **2.56 ms** (Node; a browser adds reactivity + 667.6 KB of `setAttribute`) | measured, 20 iters |
| paths at n=50 / n=75 / n=100 | **byte-identical** (`===` true, both pairs) | measured |

---

## §1 · BLOCKERS

### B-1 · `stopAnim()` cannot cancel `morphTo` — it *advances* it; teardown therefore leaks

**BLOCKER** · `composables/useFourierMorph.ts:115-120, 145-213, 215` · reached from
`FourierMorphDemo.vue:108, 124, 172, 177`

`morphTo` is a three-phase coroutine, each phase `await`ing a promise that resolves from
`currentAnim.play().then(resolve)` (`:178, :192, :207`). `stopAnim()` (`:115-120`) calls
`currentAnim.stop()`. The installed producer contract is explicit:

> `keyframes.d.ts:526-529` — "Halt playback where it stands: cancel the loop AND the WAAPI compositor
> animations, settle state, **and resolve any pending `play()` promise**."

So `stop()` **resolves** the awaited promise. Every caller of `stopAnim()` — `setShape` (`:90`),
`setLevel` (`:99`), and the `onUnmounted` teardown (`:215`) — therefore does not end the morph; it
fast-forwards it to the next phase, which then constructs a *new* `Animation` (`:187`, `:200`) and plays
it. There is no generation token, no `cancelled` flag, no re-check after any `await`.

Consequences, in order of severity:

1. **Unmount leak.** Navigating off `/morph` mid-morph runs `onUnmounted → stopAnim()` → phase 1
   resolves → phase 2 allocates `fromLowPoints`/`toLowPoints` (2 × 512 points, `:183-184`), builds a new
   Animation and rAF-plays it for `morphMs`; on its heels phase 3 plays for `settleInMs`. Up to
   `morphMs + settleInMs` of rAF work **after unmount** — 200 ms at defaults, **1 600 ms** at the
   sliders' maxima (`MorphPhaseConfig.vue:24-25`, `max="800"` each). Each tick writes
   `currentPoints.value`, and `currentPath` (`:81`) is a live `computed` — so a 55.7 KB path string is
   rebuilt per frame for a component that no longer renders. The closure retains both `FourierShape`
   Maps for the duration.
2. **`currentAnim = null` at `:212` can orphan a live animation.** If a second `morphTo` is in flight
   (see B-2), the first run's terminal `currentAnim = null` discards the *second* run's handle. From
   that moment `stopAnim()` is a no-op and the `onUnmounted` teardown cannot reach the running rAF loop
   at all — an unbounded leak, not merely a delayed one.
3. **Reset does not reset** (see M-1): `handleReset` → `setShape` → `stopAnim` → the morph resumes and
   overwrites the idle state that `setShape` just installed.

**Falsifier** — dead if `stop()` left the `play()` promise pending or rejected it (then the coroutine
would park), or if `morphTo` re-checked a generation counter after each `await`. Neither holds: the
producer d.ts states resolution as the contract (`:526-529`) and echoes it for the sibling handles
(`:2195` "The play promise resolves immediately"); `useFourierMorph.ts:145-213` contains no token, flag,
or post-await guard.

### B-2 · The `isAnimating` guard is open for the entire engine dynamic import — double-click races two `morphTo` runs

**BLOCKER** · `FourierMorphDemo.vue:113, 127-135` × `composables/useFourierMorph.ts:145-169`

`isAnimating` is `phase.value !== "idle"` (`:113`) and it gates the toggle (`:128`) and disables the
button (`:18` → `MorphShapePreview.vue:4`). But `morphTo` sets `phase.value = "settle-out"` at
`useFourierMorph.ts:169` — **after** `await getAnimationCtor()` at `:149`. Between the click and the
engine resolving, `phase` is still `"idle"`, `isAnimating` is `false`, and the button is **not**
disabled.

That window is not incidental — it is the largest deliberate latency in the app. `getAnimationCtor()`
(`:39-44`) resolves `loadAnimationEngine()`, the dynamic boundary the file's own comment (`:33-36`)
introduced specifically so the value.js-bearing engine stays out of the eager bundle. First morph on a
cold cache = a network chunk fetch.

Two clicks in that window ⇒ two concurrent `morphTo` closures. They share one `currentAnim` field; run B's
`stopAnim()` resolves run A's pending `play()` (B-1), both proceed, both write `phase`, `harmonicLevel`,
`currentPoints`, `morphProgress`. Independently, `isMoon` has been toggled twice back to its original
value (`:132`) while the settled geometry is whichever run finished last — so the `shapeName` chip
("Sun"/"Moon", `:103`) and `currentShape` (`:104`, feeding `HarmonicLevelGrid`'s thumbnails and
`nearestActiveLevel`) can both disagree with the rendered path until the next successful morph.

**Falsifier** — dead if `morphTo` set `phase` before its first `await`, or if `handleToggle` set a
synchronous local latch before awaiting, or if the engine promise were already resolved on the first
click. The first two are absent from the source; the third is false by construction for the first morph
(`enginePromise` starts `null`, `:38`) — and the comment at `:33-36` documents the deferral as
intentional.

---

## §2 · MAJOR

### M-1 · `handleReset` is the one unguarded mutator — and it is reachable mid-morph

**MAJOR** · `FourierMorphDemo.vue:75-78, 175-178`

`handleToggle` (`:128`) and `handlePreviewClick` (`:138`) both open with `if (isAnimating.value) return;`.
`handleReset` (`:175-178`) does not. The Reset `Button` (`:75`) carries no `:disabled` binding either
(contrast `MorphShapePreview :disabled="isAnimating"`, `:18`). So Reset is the live path that reaches
`morph.setShape()` during a morph — and via B-1 that does not reset; it fast-forwards the animation,
which then overwrites the state `setShape` installed one line earlier.

**Falsifier** — dead if `isAnimating` were false only when nothing is running (it is: `phase` is set for
all three phases, `:169/:182/:196`), or if the Reset button were disabled during animation (it is not —
grep for `disabled` in `FourierMorphDemo.vue` returns only line 18).

### M-2 · Two sources of truth for `MorphConfig`, bridged by a *pre-flush* watcher — `handleReset` reads stale state

**MAJOR** · `FourierMorphDemo.vue:107-111, 175-178` × `useMorphConfig.ts:78-84` × `useFourierMorph.ts:77, 92`

`useMorphConfig` owns a `reactive` config (`useMorphConfig.ts:42`); `useFourierMorph` **copies** it into
its own private `ref` (`useFourierMorph.ts:77`, seeded by the demo's spread at `FourierMorphDemo.vue:108`)
and is reconciled one-way by `syncWith` (`useMorphConfig.ts:78-84`). That watcher uses Vue's default
`flush: 'pre'` — it runs in the pre-render job queue, i.e. **asynchronously** with respect to the
mutation.

`handleReset` mutates then reads in the same tick:

```
morphConfig.reset();                       // FourierMorphDemo.vue:176 — config → DEFAULT (highLevel 50)
morph.setShape(currentShape.value);        // :177 — reads morph's OWN config.value.highLevel — STALE
```

`setShape` (`useFourierMorph.ts:89-95`) sets `harmonicLevel.value = config.value.highLevel` from the
un-synced copy. Concrete failure: set High to 90 → click Reset → the number input and both sliders read
50 (`HarmonicLevelGrid.vue:33-49` are bound to `morphConfig.config`), the info chip reads **`n=90`**
(`FourierMorphDemo.vue:15` → `MorphShapePreview.vue:21`), and the grid highlights the **n=50** cell
(`nearestActiveLevel`, `:115-120`, snaps 90 → 50). Three widgets, three different answers, from one
click.

**Falsifier** — dead if `syncWith` passed `{ flush: 'sync' }` (it passes only `{ deep: true }`,
`useMorphConfig.ts:82`), or if `setShape` read the shared reactive rather than the private copy (it reads
`config.value`, `useFourierMorph.ts:92-93`). The root cause is the duplicated config, not the watcher.

### M-3 · The High control's range (1–100) exceeds the data's harmonic ceiling (50) — silently clamped, and the readout lies

**MAJOR** · `HarmonicLevelGrid.vue:33-49` (`max="100"`, `:max="100"`) × `svg-fourier.ts:129-131` ×
`useFourierMorph.ts:92` × `FourierMorphDemo.vue:15, 63`

Both JSONs stop at `levels[-1] = 50` and `n_harmonics = 50` (§0). `interpolateAtHarmonicLevel` clamps to
`maxLevel` (`svg-fourier.ts:130-131`) — silently, no warning, no return signal. So the entire upper half
of the High slider and number input is inert: every value in `(50, 100]` renders exactly the n=50 shape,
while `setShape` sets `harmonicLevel` to the raw request (`useFourierMorph.ts:92`) and the chip prints it
(`FourierMorphDemo.vue:15`). The user is told the shape has 100 harmonics; it has 50.

The demo is the seat of the defect: it is the component that holds both the shape (`:104`, so it knows
`data.levels`) and the bound (`:63`), and it never clamps one by the other.

**Falsifier** — dead if `interpolateAtHarmonicLevel` extrapolated beyond the last level, or if any shipped
shape carried levels above 50. Neither: the clamp is `Math.min(maxLevel, harmonicLevel)`
(`svg-fourier.ts:131`), and both JSONs' `levels` arrays are identical and end at 50 (§0).

### M-4 · Three of the twelve grid thumbnails are byte-identical — 167 KB of duplicate path text

**MAJOR** · `useMorphConfig.ts:30` × `HarmonicLevelGrid.vue:54-82, 129-132`

`computePreviewLevels`' candidate list (`useMorphConfig.ts:30`) is a hard-coded
`[1,2,3,5,8,12,18,25,35,50,75,100]` — a constant with no relation to the loaded shape. 75 and 100 exceed
the ceiling of 50, so `getPath(75)` and `getPath(100)` both clamp to level 50 (M-3) and produce strings
`===` to `getPath(50)` (**verified**, §0). The user sees three consecutive cells labelled `n=50`,
`n=75`, `n=100` drawing pixel-identical curves, at a cost of 2 × 55.7 KB = 111 KB of redundant `d` text
plus 2 redundant `interpolateAtHarmonicLevel` calls per grid render.

**Falsifier** — dead if the candidate list were derived from `shape.data.levels`, or if the shapes carried
75/100 levels. Neither: the array is a literal (`:30`), and §0's identity check returned `true` for both
pairs.

### M-5 · 55.7 KB unrounded path strings — 667.6 KB of `d` text for 48 px thumbnails, rebuilt uncached on every `activeLevel` change

**MAJOR** · `svg-fourier.ts:47-73` × `HarmonicLevelGrid.vue:54-82, 129-132, 261-272` ×
`FourierMorphDemo.vue:15, 61, 115-120` × `useFourierMorph.ts:81`

Three compounding facts:

1. **No coordinate rounding anywhere.** `pointsToSvgPath` (`svg-fourier.ts:56-72`) interpolates raw f64
   into the string — six ~17-char numbers per segment × 512 segments ⇒ **55.7 KB per path** (§0). The
   census's own hygiene rows document `scheduler.yield()` INP discipline elsewhere in this tree
   (`lib/scheduler.ts:1-19`); this path emits half a megabyte of attribute text with no such thought.
2. **`getPath` is an uncached template method** (`HarmonicLevelGrid.vue:129-132`, called at `:68`). Vue
   re-invokes it for **all** twelve cells on every render of that component — measured **2.56 ms** of
   pure JS plus 667.6 KB of `setAttribute` (§0). Nothing memoises by `(shape, level)`, though the inputs
   are immutable per shape.
3. **The demo drives that render at animation frequency.** `activeLevel` ← `nearestActiveLevel`
   (`FourierMorphDemo.vue:61, 115-120`) is a function of `morph.harmonicLevel`, which is written every
   rAF tick during a morph (`useFourierMorph.ts:174, 203`). Vue's `computed` identity check spares the
   per-frame case (`nearestLevel` returns one of ten discrete values), but a 50→5 settle-out crosses
   **eight** of those boundaries, so a single toggle triggers ~8 full-grid rebuilds mid-animation, plus
   one more at the click frame (M-10). Separately `currentPath` (`useFourierMorph.ts:81`) rebuilds its
   own 55.7 KB string **every tick**, ~21 ticks per default 350 ms morph ⇒ ~1.2 MB of transient string
   allocation per toggle.

The thumbnails are 48×48 px (`HarmonicLevelGrid.vue:261-265`); each of the 512 segments spans ≈0.4 px.
Coordinate precision beyond ~2 decimals is unobservable there by construction.

**Falsifier** — dead if `pointsToSvgPath` rounded, if `getPath` were a memo/`computed` map, or if the
`activeLevel` prop were animation-invariant. All three are false in the tree. The wall-clock browser cost
is **UNPROVEN-NEEDS-LIVE (SS-13)**; the byte counts, the identity of the strings, the absence of memo,
and the Node-measured 2.56 ms are static facts.

### M-6 · The morph animation ignores `prefers-reduced-motion` — and `scheduler.ts` claims otherwise

**MAJOR** · `useFourierMorph.ts:122-143` × `keyframes.d.ts:689-694` × `lib/scheduler.ts:13-15`

`createTweenAnimation` (`useFourierMorph.ts:127-133`) passes `duration`, `iterationCount`,
`timingFunction`, `fillMode`, `useWAAPI` — and never `respectReducedMotion`. The producer:

> `keyframes.d.ts:689-694` — "When true, `play()` honors `prefers-reduced-motion: reduce` … **Default
> false.**"

`grep -rn "prefers-reduced-motion\|respectReducedMotion" components/morph/ composables/` returns
**nothing**. The CSS is equally ungated: `FourierMorphDemo.vue:299, 323` (`transition: transform…`),
`MorphShapePreview.vue:97, 112, 116` (hover/active `scale`), `HarmonicLevelGrid.vue:239, 245, 249`
(`scale(1.04)` / `scale(0.96)`) — no reduced-motion media query in any of the five files.

This also **contradicts the tree's own documentation**: `lib/scheduler.ts:13-15` asserts the
"epicycle/**morph** RENDER loop … is already rAF-paced AND off-screen-gated (I.γ, `stores/animation.ts`)".
The morph render loop does not live in `stores/animation.ts` — `grep -rn "morph" src/stores/` returns
nothing — it lives in `useFourierMorph.ts`, ungated in both senses. Fold with the census row: "the two rAF
clocks themselves are **ungated under `prefers-reduced-motion: reduce`**" [CENSUS §3a / FE §8] — this is
a **third** ungated animation the census's clock inventory did not enumerate, and it is the one a header
toggle (`DarkModeToggle.vue`) fires on every theme change on every route.

**Falsifier** — dead if `respectReducedMotion` defaulted true (the d.ts says false), or if any file in the
subtree queried the media (grep says none), or if `stores/animation.ts` gated the morph (grep says it does
not mention morph).

### M-7 · No error posture on the engine boundary: unhandled rejection, permanent poisoning, and `isMoon` desync

**MAJOR** · `useFourierMorph.ts:38-44, 149` × `FourierMorphDemo.vue:127-135, 19`

Three distinct failures on one path:

1. **The rejected promise is cached forever.** `getAnimationCtor` (`:39-44`) memoises `enginePromise`
   with no `.catch(() => { enginePromise = null; })`. A chunk-load failure (stale deploy, offline, CDN
   blip) poisons *every* subsequent morph in the session — including `DarkModeToggle`'s, which shares
   the module-level singleton. The comment at `:33-36` reasons only about the success path ("the browser
   caches the engine module after the first resolve") and is silent on failure.
2. **The rejection is unhandled.** `handleToggle` is `async` (`FourierMorphDemo.vue:127`) and is wired as
   a template listener (`:19 @toggle="handleToggle"`); Vue does not await it. A rejected `morphTo`
   surfaces as an `unhandledrejection`, not as any user-visible state.
3. **State corrupts before the failure point.** `isMoon.value = !isMoon.value` executes at `:132`,
   *before* `await morph.morphTo(...)` at `:134`. If the await rejects, `isMoon` has flipped while the
   rendered path has not — so `currentShapeName` (`:103`), `currentShape` (`:104`), the grid thumbnails
   (`:59`) and the next `from`/`to` derivation (`:130-131`) are all inverted relative to what is on
   screen. The next click then morphs *from* the shape that is not displayed.

**Falsifier** — dead if `loadAnimationEngine()` could not reject (it is a dynamic `import()`,
`keyframes.d.ts:2028`), or if a `try/catch` existed at either seat (neither file contains `catch`), or if
`isMoon` were flipped after the await (it is not, `:132` precedes `:134`).

---

## §3 · MINOR

| # | Severity | Claim | Provenance | Falsifier |
|---|---|---|---|---|
| m-1 | MINOR | `prepareFourierShape(sunData as any)` ×2 — `as any` discards the whole shape check. The *actual* incompatibility is only tuple-vs-array widening: JSON modules infer `coefficient`/`domain` as `number[]`, while `BasisComponent.coefficient` and `BasisDecomposition.domain` are `[number, number]`. `as unknown as FourierPathData` would keep every other field checked. | `FourierMorphDemo.vue:99-100`; `lib/types.ts:3, 11`; verified JSON keys = the 8 `FourierPathData` fields exactly | Dead if some field genuinely mismatched — checked: both files' top-level keys are exactly `{original, decomposition, partial_sums, eval_points, levels, n_harmonics, n_samples, n_eval}` and `decomposition` = `{basis, components, domain}`. Only the tuples widen. |
| m-2 | MINOR | The shape-load + toggle block is **copy-pasted** into `DarkModeToggle.vue` — same two JSON imports, same `prepareFourierShape(x as any)` pair, same `onMounted(setShape)`, same guard-then-await `handleToggle`. `prepareFourierShape` runs **per instance**, so on `/morph` two independent copies of the same 2 shapes × 10 levels × 512 points (20 480 boxed pairs) are retained. And the route's lazy win is already spent: `DarkModeToggle` is eager (`App.vue:6,25` → `AppHeader.vue:6,141`), so 450 631 B of JSON is in the eager graph regardless. | `FourierMorphDemo.vue:95-100, 123-135` vs `DarkModeToggle.vue:22-26, 57-70`; `router/index.ts:104` | Dead if a shared module-level singleton existed (it does not — both files call `prepareFourierShape` in their own `<script setup>` body, which runs per instance) or if `DarkModeToggle` were lazy (`AppHeader.vue:6` is a static import). |
| m-3 | MINOR | Root-barrel import breaks the repo's subpath discipline: `import { useClipboard } from "@mkbabb/glass-ui"` pulls a 50-line `export *` barrel over the whole component library. Every other glass-ui import in this component tree uses a subpath (`/button`, `/slider`, `/select`). | `useMorphConfig.ts:9`; barrel at `glass-ui/dist/index.d.ts:1-50`; the real symbol lives at `dist/composables/dom/useClipboard.d.ts` | Graded MINOR precisely because `glass-ui` declares `sideEffects: ["*.css"]`, so Rollup tree-shakes it in prod and `manualChunks` already routes glass-ui to `vendor-ui` — the cost is dev-server transform time and discipline, not shipped bytes. Corroborates the corpus row `lane-frontend.md:351`, which flags this exact line as the lone root import against 21 subpaths. |
| m-4 | MINOR | Dead public API on both composables the demo instantiates: `getIdlePoints` (`useFourierMorph.ts:110-113, 227`) and `updateField` (`useMorphConfig.ts:64-67, 92`) have **zero call sites repo-wide**. `updateField` is also wrong-typed: `(config as any)[field] = Number(target.value)` would write `NaN` into the three `string` easing fields. | grep over `web/src` returns only the definitions and the return-object entries | Dead if any consumer called them — the grep enumerated every occurrence of both identifiers. |
| m-5 | MINOR | `syncWith`'s `{ deep: true }` is dead configuration: the getter `() => ({ ...config })` already returns a fresh object each run, and every `MorphConfig` field is a primitive, so a shallow compare already fires on any change. `deep: true` only adds a full traversal of the throwaway object per run. | `useMorphConfig.ts:79-83`; `MorphConfig` fields all `number`/`string`, `useFourierMorph.ts:48-57` | Dead if any field were an object/array (none is) or if the getter returned `config` itself (it spreads). |
| m-6 | MINOR | `copyToClipboard` discards the producer's typed failure channel. `copy()` returns `Promise<CopyResult>` with a named `reason` and the options accept `onCopyError` — the d.ts says the failure is "REPORTED, never silently swallowed". The consumer passes only `{ resetMs: 2000 }` and does not await or inspect the result, so an `no-api` / permission failure degrades to "the label just didn't change". | `useMorphConfig.ts:58, 73-75`; `FourierMorphDemo.vue:71`; producer contract `glass-ui/dist/composables/dom/useClipboard.d.ts:9-36` | Dead if the producer had no error channel — it has both `onCopyError` and `CopyResult.reason`, and documents non-swallowing as the design intent. |
| m-7 | MINOR | `handlePreviewClick` (37 lines) is misplaced and internally duplicated: its two branches (`:156-160` and `:164-168`) have structurally identical bodies differing only in the comparison that selects them, and the entire snapping heuristic reads and writes only `morphConfig` state — it belongs in `useMorphConfig` beside `computePreviewLevels`, leaving the component the one line it actually owns (`morph.setLevel`, `:172`). | `FourierMorphDemo.vue:137-173` | Dead if the branches used different state (they assign the same two fields) or if the heuristic needed `morph` (only `:172` does). |
| m-8 | MINOR | `Math.round(morph.harmonicLevel.value)` is duplicated between the template (`:15`) and `nearestActiveLevel` (`:118`); one `computed` would serve both and would make the chip and the grid highlight provably consistent (see M-2, where they diverge). | `FourierMorphDemo.vue:15, 118` | Dead if the two roundings could differ by design — they cannot; both denote "the displayed harmonic count". |
| m-9 | MINOR | First paint renders an empty shape. `setShape` runs in `onMounted` (`:123-125`), so the initial render has `currentPoints = []` (`useFourierMorph.ts:80`) and `pointsToSvgPath` returns `""` for `length < 2` (`svg-fourier.ts:51`) — `<path d="">`. The data is a static import; nothing prevents calling `setShape` during setup. | `FourierMorphDemo.vue:123-125`; `useFourierMorph.ts:80`; `svg-fourier.ts:51` | Dead if `setShape` needed the DOM (it does not — it is pure array math) — the same pattern is copy-pasted in `DarkModeToggle.vue:57-59`. The *visible* blank frame is **UNPROVEN-NEEDS-LIVE (SS-13)**; the empty-string code path is static. |
| m-10 | MINOR | `isMoon` flips *before* the morph runs (`:132` before `:134`), so `currentShape` (`:104`) becomes the destination at click time. `HarmonicLevelGrid :shape` (`:59`) therefore swaps to the destination's twelve thumbnails at the *start* of settle-out, while the preview still shows the source degrading — and it pays the full 2.56 ms / 667.6 KB rebuild (M-5) on the click frame, the worst possible moment. | `FourierMorphDemo.vue:59, 104, 130-134`; `HarmonicLevelGrid.vue:129-132` | Dead if the grid were memoised (it is not, M-5) or if the swap were deferred (the prop change renders immediately). |
| m-11 | MINOR | Inconsistent memoisation between twins in one file: `getEasingSVGPath` caches into `_svgCache` (`easings.ts:98-107`), while `easingCurvePath` — the one this component tree actually uses, re-exported through `useMorphConfig` — recomputes 25 easing samples per item per render (`easings.ts:113-127`, called at `MorphPhaseConfig.vue:50` inside a 22-item `v-for`, across 3 instances ⇒ 1 650 evals per full open). | `easings.ts:98-107` vs `113-127`; `MorphPhaseConfig.vue:42-50` | Dead if `easingCurvePath`'s inputs varied per call (they do not — pure function of `name`) — the sibling's cache proves the pattern was already known in this file. |
| m-12 | MINOR | The morph toggle has **no accessible name**: the `<button>` wraps only an `<svg>` (`MorphShapePreview.vue:4-10`), and `FourierMorphSvg.vue` emits no `<title>`, `role`, or `aria-label` — `grep -n "aria\|title\|role"` over both files returns nothing. The parent has the label (`currentShapeName`, `:103`) and does not pass it. Contrast the sibling `DarkModeToggle.vue:5`, which does bind `:aria-label`. | `MorphShapePreview.vue:4-10`; `FourierMorphSvg.vue` (whole); `FourierMorphDemo.vue:12-20` | Dead if `Button`/`glass-ui` supplied a name — this is a native `<button>` (`MorphShapePreview.vue:4`), not the glass primitive. |
| m-13 | MINOR | The morph rests on an **unasserted cross-file invariant**: `lerpPoints` silently truncates to `Math.min(a.length, b.length)` (`svg-fourier.ts:99`), so a sun/moon pair with unequal `n_eval` would produce a silently truncated path with no error anywhere. Today both files are 512/512 (§0) — by luck of a shared Python export, not by any check in `prepareFourierShape` or the demo. | `svg-fourier.ts:94-106`; `FourierMorphDemo.vue:99-100, 134`; JSON `n_eval` both 512 | Dead if `prepareFourierShape` or `morphTo` validated the pair (neither does) or if the counts were structurally guaranteed (they are two independently generated files). |

---

## §4 · Superlatives (L-18 both ways)

| # | Claim | Provenance | Falsifier |
|---|---|---|---|
| S-1 | **The lazy engine boundary is a genuinely good call, correctly implemented at the seam.** `loadAnimationEngine()` behind a module-level memo (`useFourierMorph.ts:33-44`) keeps the value.js-bearing engine out of the eager bundle and off `DarkModeToggle`'s header critical path, and the reasoning is written down at the call site. It is the single best perf decision in this subtree. | `useFourierMorph.ts:33-44, 149` | Would be void if the promise were reconstructed per call (it is memoised) or if the engine were also statically imported elsewhere (`grep` shows `loadAnimationEngine` only here). Its *failure* handling is still B/M-7 — the design is right, the error posture is not. |
| S-2 | **Teardown is declared, and one hand-rolled timer was already retired for a producer composable.** `onUnmounted(() => stopAnim())` exists (`useFourierMorph.ts:215`) — most rAF composables in this class ship without one. And `useMorphConfig.ts:55-58` documents replacing a manual `copied` ref + 2 s timeout + `onUnmounted` with glass-ui's `useClipboard`, which owns the timer discipline: a real KISS win, with the receipt in the comment. | `useFourierMorph.ts:215`; `useMorphConfig.ts:55-58` | Sharply qualified: the teardown is *declared* but ineffective against an in-flight `morphTo` (B-1). Void as a claim about correctness; it stands only as a claim about intent and about the clipboard swap, which is complete. |
| S-3 | **The geometry core is careful and allocation-lean.** `pointsToSvgPath` uses modular indexing so Catmull-Rom tangents wrap correctly at the closed-path seam (`svg-fourier.ts:54-72`) — the seam artefact this class of code almost always ships. `xyToPoints`/`lerpPoints`/`interpolateAtHarmonicLevel` preallocate (`new Array(n)`), hoist `t1 = 1 - t`, and allocate no closures in the hot loop (`:38-44, 94-106, 125-154`). | `svg-fourier.ts:38-154` | Void if the seam were handled by duplicating endpoints or if the loops allocated per iteration — neither. Orthogonal to M-5: the *math* is lean; the *serialisation* is not. |
| S-4 | **A verified negative: the easing catalog is complete — no dud options.** All 22 keys in `EASING_LABELS` (`easings.ts:29-52`) resolve against the installed `value.js@0.13.0` `timingFunctions` — checked key-by-key against `value.js/dist/easing.d.ts:105-161`. So the `as EasingFn` cast at `easings.ts:56` never yields `undefined`, `getEasingFn`'s `?? linear` fallback (`:63-65`) never fires, and no `Select` option in `MorphPhaseConfig` (`:42-57`) can throw "easeOut is not a function" mid-phase. The obvious defect here is genuinely absent. | `easings.ts:29-56, 63-65`; `value.js/dist/easing.d.ts:105-161` | Falsifiable and falsified-negative by enumeration. Latent, not live: the cast at `:56` is unchecked, so a *future* label without a twin would produce a preset whose `fn` is `undefined` — and `getEasingFn`'s `?.` guards only a missing preset, not a present preset with a missing `fn`. Flagged, not counted as a defect. |
| S-5 | **Clean seam discipline: the three children are pure.** `MorphShapePreview`, `MorphPhaseConfig`, `HarmonicLevelGrid` and `FourierMorphSvg` are props-in / events-out with **zero** store, router, or provide/inject reach (`grep -n "useStore\|stores/\|useRouter\|useRoute\|pinia"` over all four → none). `FourierMorphDemo` is the only stateful seat, which is why every defect above localises here rather than smearing across five files — and why every one of them is fixable at one seat. | all four child SFCs (grep, whole-file) | Void if any child reached global state — none does. Note this cuts both ways: the purity means the parent owns *all* the wiring defects (M-1, M-2, M-3, m-10). |

---

## §5 · Corpus reconciliation (fold, don't re-invent)

| Row | Corpus claim | This tree | Verdict |
|---|---|---|---|
| **R5-7 / R6-5** (native template-loop invisibility) — `lane-fourier-r3-r6.md:125, 139` | Loop evidence keyed to *component* callsites is blind to native element `v-for`; cured by the `NATIVE_TEMPLATE_LOOP` family, 3 rows at `PaperSidebar.vue:65/87/105`. | **DOES NOT APPLY to this subtree.** `grep -rn "v-for" components/morph/ components/decorative/FourierMorphSvg.vue` → exactly **two** hits, both on *components*: `HarmonicLevelGrid.vue:55` (`Button v-for="level in levels"`) and `MorphPhaseConfig.vue:42` (`SelectItem v-for="name in easingNames"`). Zero native-element loops; `FourierMorphDemo.vue` itself has none. | A **negative finding, stated so the next auditor need not re-derive it.** The adjacent hazard is different in kind and worth naming: the 12 `Button` iterations each host native `<svg>`/`<path>`/`<span>` descendants (`HarmonicLevelGrid.vue:66-81`), so an instance denominator counts 12 and the DOM carries ~48 nodes plus 667.6 KB of attribute text (M-5). Component-callsite counting is *complete* here and still a poor proxy for weight. |
| **R3-10** (six dynamic `:is` families, four registered) — `lane-fourier-r3-r6.md:84` | Cites `FourierMorphDemo:72` as one of the four registered dynamic-`:is` callsites. | **CONFIRMED LIVE, line-exact.** `FourierMorphDemo.vue:72` = `<component :is="morphConfig.copied.value ? Check : ClipboardCopy" class="btn-icon" />`. | ADOPT. The site is benign on the L axis (two lucide icons, no leak); it is the *census* that must budget all six, per R3-10's carry to F.W4. |
| **R3-12** (35 open-family records → 28 unique; `MorphPhaseConfig` easingNames among the 7 duplicates) — `lane-fourier-r3-r6.md:86` | The `MorphPhaseConfig` `easingNames` loop is a duplicated open-family row. | **CONFIRMED, and this component is the multiplier**: `FourierMorphDemo.vue:26-54` instantiates `MorphPhaseConfig` **three times**, each rendering the same 22-item `SelectItem v-for` (`MorphPhaseConfig.vue:42`) ⇒ 66 records collapsing to 22. | ADOPT, with a live-tree qualifier the corpus row does not carry: reka-ui `SelectContent` is teleported and unmounted while closed, so the 66 are **not** DOM-resident at rest — the over-count is in the *derivation*, not in the page. m-11 is the live cost (1 650 easing evals per full open). |
| **CENSUS §3a / FE §6, §8** (viz architecture) — `CENSUS-2026-08-03.md:84-86`, `lane-frontend.md:568` | "Canvas2D throughout, **WebGL/WebGPU ABSENT**; three independent canvases … + 12 SVG surfaces"; rAF clocks "ungated under `prefers-reduced-motion`". `scheduler.ts:13-15` claims the "epicycle/**morph** RENDER loop … is already rAF-paced AND off-screen-gated (I.γ, `stores/animation.ts`)". | **This component touches only the SVG lane** — `FourierMorphSvg` + `HarmonicLevelGrid`'s inline `<svg>` + `MorphPhaseConfig`'s easing previews. Zero canvas, zero WebGL, confirmed by whole-file read. But `scheduler.ts`'s morph claim is **wrong**: the morph render loop is `useFourierMorph.ts`'s keyframes rAF, not `stores/animation.ts` (`grep -rn "morph" src/stores/` → nothing), and it is gated neither off-screen nor by reduced motion. | **CONTRADICT the source comment; EXTEND the census.** The census's "two ungated rAF clocks" is an undercount: there is a **third**, and it is the one the header's `DarkModeToggle` fires on every theme change on every route. → M-6. |

---

## §6 · Verdict

Not a one-liner component and not an innocent one. The template/style two-thirds are unremarkable and
responsive; the 95-line script is where it breaks. Two failures are structural rather than cosmetic:
`morphTo` is an uncancellable three-phase coroutine whose only "cancel" primitive **advances** it
(**B-1**, leaking rAF work past unmount and defeating the declared teardown), and its `isAnimating` guard
is open for the whole duration of the deliberately-deferred engine import (**B-2**). Both trace to one
missing idea — a generation token checked after each `await`. Everything in §2 is a second-order
consequence of two duplications the component chose and never reconciled: config duplicated between
`useMorphConfig` and `useFourierMorph` (M-2), and the harmonic *domain* duplicated between a hard-coded
candidate list, a `max="100"` control, and a JSON that stops at 50 (M-3, M-4). The 667.6 KB of unrounded
path text (M-5) is the one defect that is purely mechanical and purely fixable — round the coordinates,
memoise `getPath`, and the viz path cost drops by an order of magnitude without touching a single
semantic.

The component is **DEFECTIVE** on the L axis. Every claim above survived its own falsifier; the two
live-only claims are marked **UNPROVEN-NEEDS-LIVE (SS-13)** and are not counted among the 22.
