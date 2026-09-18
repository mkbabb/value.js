# CHALLENGE-L (round 4) — library structure · `GradientEasingEditor.vue`

## Model receipt

I observe myself to be **Opus 5** — exact model id `claude-opus-5[1m]`, the 1M-context variant this
seat was explicitly spawned with. Declared, not inherited.

- **Axis:** library structure — module boundaries, ownership, dependency direction, public surface.
- **Subject:** `demo/workbenches/gradient/GradientVisualizer/GradientEasingEditor.vue` (295 lines).
- **Repo:** `/Users/mkbabb/Programming/value.js`, branch `tranche-u`, HEAD `c654824e`.
- **Verdict: DEFECTIVE.** 2 BLOCKER, 2 MAJOR, 2 corrections — counting only what is **new or wrong**
  in r1/r2/r3.

## Why this file is `-r4`

`challenge-L-library.md` (r1, 2026-07-27 13:47), `-r2.md` (18:08) and `-r3.md` (07-28 10:03) already
exist here. My instruction names the r1 path; r2 and r3 each set the precedent of not destroying a
completed audit artifact, and r3 stated the reasoning explicitly. I read all three in full before
writing. This file carries **only** the delta.

**New here, found by no prior round:** N-1 (BLOCKER), N-2 (BLOCKER), N-3 (MAJOR), N-4 (MAJOR).
**Corrections:** r2's L-r2-4 and r3's L-8 both treat a *live, already-broken* coupling as a
hypothetical future one; r3's L-6 proves the wrong half of its own claim; r1's L-5 reproduction is
unreachable past step 2.
**Confirmed, not restated:** r3's L-1 (`FAMILY_ORDER` drops quart/quint — I independently reproduced
27 rendered tiles vs 30 published presets), r3's L-6 (tsconfig `paths` drift), r2's L-r2-1 (dead
eslint globs — independently re-measured `no-restricted-imports => undefined` on the subject *and*
on `easingCatalogue.ts`), r1's L-3 (byte-identity mint), r2's L-r2-2/9/10/13. All still true at
`c654824e`.

**Negative proof I re-ran and can affirm:** the demo-dogfood keystone holds *at the source level* —
zero `@src/*`, zero `dist/` deep paths, every value.js specifier in the subject's transitive closure
(`/easing`, `/color`, `/css`) is a real key in `package.json#exports`. `verbatimModuleSyntax` is
clean across all five files. Reactive props destructure and `useTemplateRef` are used correctly. No
document-level horizontal overflow (measured `docOverflowX: 0`). I tried to falsify the keystone and
could not — but see the correction to r3's L-6 for why the *proof mechanism* behind it is false.

---

## N-1 — BLOCKER · Three of the twenty-seven tiles this component renders destroy the Gradient pane

No prior round found this. r1 mentions `ease-out-back` **once**, as step 2 of its L-5 interval-identity
reproduction (`challenge-L-library.md:315`) — a step that cannot execute, because performing it
unmounts the pane. r1's L-5 is therefore unreachable past step 2 as written (see *Corrections*).

`easingCatalogue.ts` mints a selectable tile for every key of value.js `bezierPresets`. The `back`
family overshoots `[0,1]` — that is what a back ease *is*, and this repo's own CSS celebrates it
(`EasingSpecimenStrip.vue:174`: *"overshoot curves (the back family) draw past the box — visible,
never clipped"*). Measured against the live build:

```
$ node -e "…CubicBezier(...quad) sampled at 201 points over each of the 30 bezierPresets…"
OUT-OF-RANGE presets (mixColors will reject):
   ease-in-back      range [-0.0969, 1.0000]
   ease-out-back     range [ 0.0000, 1.0869]
   ease-in-out-back  range [-0.0927, 1.0927]
  steps tile steps      range [0.0000, 1.0000] ok
  steps tile step-start range [1.0000, 1.0000] ok
  steps tile step-end   range [0.0000, 1.0000] ok
```

value.js `/color` is total and honest: `mixColors` guards its own domain
(`src/color/operations.ts:65`) —

```ts
if (progress < 0 || progress > 1) return err({ code: "color_progress_out_of_range" });
```

— and returns a `Result`, never throwing. **The demo converts that `Result` back into a thrown
`Error`, inside a Vue `computed`** (`useGradientCSS.ts:199-208`):

```ts
const easedT = easing(t);
…
const mixed = mixColors(c0, c1, easedT, { space: interpolationSpace, hue: hueMethod });
if (!mixed.ok) {
    throw new Error(`Gradient color mix failed: ${mixed.error.code}`);
}
```

A `computed` has no error channel. The exception escapes the reactive graph, reaches
`demo/color-picker/ErrorBoundary.vue`, and the pane is replaced.

**Reproduction — live, headless Chromium, dev server `http://localhost:9000/#/gradient`, one click
on the `ease-out-back` specimen tile (visible on the strip at desktop width):**

```
BEFORE: {"rows":1,"tiles":27,"stage":1,
         "bodyText":"… Gradient  Build gradients with per-interval easing and CSS output.
                      Interpolation TYPE Linear SPACE OKLCh HUE Sh…"}
AFTER : {"rows":0,"tiles":0,"stage":0,
         "bodyText":"… This panel hit an unexpected error.
                      Gradient color mix failed: color_progress_out_of_range   Try again"}
```

The identical `Result → throw` conversion is duplicated verbatim, message string and all, at
`useGradientInterpolation.ts:37` — which `useSpecimenRows.ts:53` calls with `fn(0.5)`. The `back`
presets happen to be in-range at the midpoint, so the row-ink path survives today; any authored curve
overshooting at t = 0.5 (trivially reachable by dragging a handle in the authoring stage) kills the
pane through that second door instead.

**Mechanism — the library-structure reading, which is the point of this seat.** The library owns
"mix two colours at progress p ∈ [0,1]" and is correct. The demo owns "an eased ramp may overshoot"
and is correct. **Nobody owns the seam.** The concept *"what does an overshooting timing function
mean for a colour ramp"* has no home in any of the three packages, so the mismatch crosses the
package boundary as an unhandled exception. Secondarily: the module that decides **which curves are
offered** (`easingCatalogue.ts`) and the module that decides **which curves are consumable**
(`useGradientCSS.ts`) were authored as separate owners with no shared contract — two homes for one
invariant, which is the same disease r3's L-1 diagnoses from the opposite side (that one drops
presets the sampler *could* have taken; this one offers presets it cannot).

**Cure — architectural, not a guard clause.**
1. Give the seam an owner inside the feature that has the domain knowledge:
   `composables/rampDomain.ts` exporting `clampProgress(t: number): number`. Route *every* eased-t →
   colour call through it (`sampleCoalescedStops`, `interpolateStopColors`). Clamping is not a
   fallback — it is what CSS itself does when interpolating a gradient, so this makes overshoot
   curves render exactly as `linear-gradient` renders them. Overshoot survives where it is meaningful
   (the glyph portraits, the picker canvas) and clamps where it is not (colour space position).
2. Delete the duplicated `Result → throw` conversion. The demo already has the right idiom one file
   away — `applyCSS` returns an explicit `{ok:false, reason}` verdict (`useGradientModel.ts:158-168`)
   precisely so a bad parse cannot vanish the section. Sampling failures deserve the same door. **No
   exception may be raised from a render-tracked `computed`**; that is the structural rule this
   component violates, and it is worth stating as a repo invariant.

---

## N-2 — BLOCKER · The zero-letterbox law is not *fragile*, it is **already dead** — glass-ui 7.0.0 ships no `role="img"`

This corrects r2 and r3. **r2's L-r2-4** (`challenge-L-library-r2.md:348`) frames the coupling as a
future hazard: *"Reproduction (deterministic from source): rename the `data-testid` or drop
`role="img"` from …"*. **r3's L-8** (`-r3.md:326-334`) calls the scrape wasteful and says it is
*"re-run through `requestAnimationFrame` on every emission"*. Both assume it currently works. It has
never worked against glass-ui 7.0.0.

`EasingAuthoringStage.vue:48` (the JS probe) and `:104` (the `:deep()` rule) both target
`svg[role="img"]`. The shipped producer renders `role="group"`:

```
$ grep -o "role[\"']\{0,2\}: *[\"'][a-z]*[\"']" node_modules/@mkbabb/glass-ui/dist/easing.js | sort | uniq -c
   1 role: "group"
   1 role: "slider"
   2 role: "status"
$ grep -c 'role:"img"' node_modules/@mkbabb/glass-ui/dist/easing.js
0
```

Live measurement of the mounted stage (`#easing-authoring-0`, headless Chromium 1280×720, tune
disclosure open):

```json
{ "specHit": 0,                        // count of the demo's own `svg[role='img']` selector
  "role": "group",                     // what glass-ui 7.0.0 actually renders
  "viewBox": "0 -0.1 1 1.2000000000000002",
  "elemBox": { "w": 410, "h": 200 },
  "dLeft": 121.67, "dTop": 0, "dRight": 121.67, "dBottom": 0,
  "maxDelta": 121.67,                  // O-17 clause 1 requires <= 1
  "elemAspect": 2.05, "vbAspect": 0.8333, "aspectErr": 1.2167, "tol": 0.0049,
  "vbRatioVar": "1.2", "liveVbRatio": 1.2 }
```

And the DOM dump of the stage's subtree confirms it — the canvas is
`svg.block.w-full.touch-none[role=group]` with `aria-label="Easing curve 1 → 2"`, wrapped in
`div.glass-card…`, containing two `circle[role=slider]` handles.

Four measured consequences:

1. **`syncVbRatio()` returns early on every invocation.** `querySelector("svg[role='img']")` → `null`
   → the guard at `:51` bails. `--vb-ratio` is frozen at its `ref(1.2)` seed forever. It coincides
   with the live ratio *for linear only*; it is wrong for every overshoot and steps regime — exactly
   the cases the law exists for. The entire 21-line `rootEl` / `vbRatio` / `syncVbRatio` / rAF /
   `watch` apparatus is dead code that reads as live.
2. **All four declarations in the `:deep(svg[role="img"])` block are inert.** Computed
   `inline-size: 410px` (not `min(100%, 19rem)` = 304px); computed `aspect-ratio: 1 / 1` (not
   `calc(1 / 1.2)`); `block-size: auto !important` never applied.
3. **The stated law is violated by 121.67 px per side** — a 2.46× aspect mismatch (element 2.05 vs
   viewBox 0.833). The doc comment's *"Zero letterbox (O-17) … The drawn plot IS the element box"* is
   false on the live page in every regime.
4. **Edict 6 violation — an animation has been deleted, not moved.** The T-48 liquid-morph
   `transition: aspect-ratio var(--duration-normal) var(--ease-standard)`
   (`EasingAuthoringStage.vue:114`, with a 5-line comment explaining its purpose) rides a selector
   that matches nothing. It is gone from the product while remaining in the source — the worst
   failure mode for the never-delete-animations rule, because nothing reads as missing.

The sibling laws survive only by luck of selector: measured `grid-template-columns: 436px` (Law 1
lands via `[data-testid="easing-picker"]`) and `box-shadow: none; backdrop-filter: none` (Law 2 lands
via `.glass-card`). r2 and r3 are right that `data-testid` is a **test** contract being used as a
**styling** contract; N-2 is the proof that this class of coupling does not merely risk silent death,
it has already suffered one, undetected, across at least one glass-ui major.

**Cure.** Confirms r3's L-8 direction and makes it urgent. `useEasingPicker` already publishes
`viewBox: ComputedRef<{minY, height}>` — the number the demo is scraping out of the DOM is *already a
first-class published value the SFC declines to forward*. Producer-side: `EasingPicker` gains
`layout` / `surface` / `fit` props (matching the `readout` / `playback` precedent it already set) and
either forwards `viewBox` as a slot prop or writes `--vb-ratio` itself. Consumer-side:
`EasingAuthoringStage.vue` loses its entire `<script>` body and its entire `<style scoped>` block —
116 lines collapse to a props adapter. A consumer that can only express its need through the
producer's internal selectors has found a producer gap, and the gap is the deliverable.

---

## N-3 — MAJOR · The O-17 oracle reds on that same dead selector and therefore never reaches N-1

Zero mentions of the O-17 oracle in r1, r2 or r3 (`grep -ni "o17\|o-17\|oracle"` over all three →
no matches). It is the single gate written to certify exactly the two things that are broken.

`e2e/smoke/oracles/o17-easing-composition.spec.ts:52-54`, `discloseAuthoring()`:

```ts
const svg = row.locator("#easing-authoring-0 svg[role='img']");
await expect(svg).toBeVisible();
return svg;
```

That locator matches **0** elements (`specHit: 0`, N-2). Every one of the three O-17 tests calls
`discloseAuthoring` before doing anything else, so all three die there — and the tile clicks at
`:118-123`:

```ts
await row.locator("[data-specimen='ease-out-back']").click();
await expectZeroLetterbox(svg);
```

are never executed. **That single line reproduces N-1 in one action.** The gate that would have
caught a pane-destroying blocker is red for an unrelated stale-selector reason, so the blocker has
been invisible for the life of the gate.

```
$ VJS_E2E_PORT=9000 npx playwright test --project=smoke \
    e2e/smoke/oracles/o17-easing-composition.spec.ts --reporter=line
  3 failed
    O-17 zero letterbox across curve regimes — desktop
    O-17 zero letterbox across curve regimes — 390
    O-17 composition: stamps, dot rest, one-literal, mint law
```

*(Honest qualification: run against the shared dev server, that run also hit dock-navigation
instability from a concurrent driver, so the pasted failure text is corroboration, not proof. The
deterministic proof is `specHit: 0` measured in-page plus the grep showing glass-ui ships zero
`role:"img"` — neither depends on the harness.)*

The only unit coverage of the catalogue is `test/gradient-v4-consume.test.ts:56-57`:

```ts
expect(SPECIMEN_TILES.length).toBeGreaterThan(20);
expect(SPECIMEN_TILES.every((tile) => !tile.glyph.includes("NaN"))).toBe(true);
```

A glyph-shape proxy. Nothing anywhere asserts that a tile is **consumable by the sampler that renders
the row it selects**. Note also that this test file imports the demo tree from the library suite
(`test/gradient-v4-consume.test.ts:11` → `../demo/workbenches/…/easingCatalogue`) — one of twelve
`test/` files reaching into `demo/`, which is a direction worth a ruling in its own right.

**Cure.** (a) Re-anchor `discloseAuthoring` on the producer's *published* test hook —
`[data-testid="easing-picker"] svg[viewBox]` — so the oracle measures the real canvas. (b) Add the
missing invariant as a **unit** test, where it belongs and where it is three lines: for every tile in
`SPECIMEN_TILES`, `sampleCoalescedStops` over a two-stop model must not throw. That is the test that
should have existed instead of the NaN-in-glyph proxy, and it turns N-1 from an e2e-only catch into a
`vitest` one.

---

## N-4 — MAJOR · The missing seam, stated as a module

This is N-1's mechanism promoted to a structural finding, because the cure is a module and not a
patch, and because the same shape recurs.

value.js publishes **total, Result-returning** functions across `/color`, `/css` and `/easing`. That
is the right discipline and the audit history shows it was chosen deliberately. But at four sites the
demo converts a `Result` error straight back into a `throw`:

| site | converts | reachable from a render? |
|---|---|---|
| `useGradientCSS.ts:206-208` | `mixColors` err | **yes** — `computed` → N-1 |
| `useGradientInterpolation.ts:37` | `mixColors` err | **yes** — `computed` → N-1's second door |
| `useGradientCSS.ts:76`, `:128` | `CubicBezier` / `parseTimingFunction` err | yes — `easingFnOf` |
| `easingCatalogue.ts:103` | `CubicBezier` err | **at module evaluation** — r1's L-4 |

Each conversion is locally reasonable and collectively they undo the library's central design
decision: the whole point of returning `Result` is that the failure is a *value* the consumer routes,
not an exception that unwinds an unknown amount of UI. In a Vue `computed` there is no unwinding
target short of the app error boundary, so every one of these is a pane-killer waiting for the right
input. Two of them already have it.

**Cure.** One module owns the conversion policy for the gradient feature, and its output is a
*diagnostic value*, not an exception:

```ts
// composables/rampDomain.ts — the ONE home for ramp-domain policy
export function clampProgress(t: number): number;              // the N-1 seam
export type RampIssue = { code: string; at: number };
export function sampleCoalescedStops(m): Result<CoalescedSample[], RampIssue>;
```

`serializeCoalescedGradient` / `serializeRailRamp` / `serializeIntervalRamp` then thread the verdict
the way `applyCSS` already does, and the component renders a degraded strip with a visible reason
instead of vanishing. Repo invariant worth codifying: **`src/` returns `Result`; `demo/` may only
`throw` from an event handler, never from a `computed`, a `watch` callback, or module top-level.**

---

## Corrections

**C-1 — to r2's L-r2-4 and r3's L-8.** Both treat the `svg[role="img"]` coupling as a live mechanism
with future risk. It is a dead selector *today*: 0 matches in-page, 0 `role:"img"` in
`glass-ui@7.0.0/dist/easing.js`. r3's phrase *"re-run through `requestAnimationFrame` on every
emission"* describes a loop that returns early every time. The finding survives and strengthens — the
correction is that the damage is realised, not latent, and it silently deleted an animation (N-2).

**C-2 — to r3's L-6 (`tsconfig.demo.json` paths).** r3 proves self-name resolution *suffices* by
tracing `/css`, which has no `paths` entry. It does not trace a subpath that *does* have one, so it
misses the sharper half: **`paths` entries win over the exports map, and five subpaths have them.**
Adjacent imports in one file, same `--traceResolution` run:

```
Resolving module '@mkbabb/value.js/color' …
  'paths' option is specified, looking for a pattern to match module name '@mkbabb/value.js/color'.
  Module name '@mkbabb/value.js/color', matched pattern '@mkbabb/value.js/color'.
  Trying substitution './dist/subpaths/color.d.ts' …            <-- exports map NOT consulted

Resolving module '@mkbabb/value.js/css' …
  Found 'package.json' at '/Users/mkbabb/Programming/value.js/package.json'.
  Entering conditional exports. Matched 'exports' condition 'types'.
  Using 'exports' subpath './css' with target './dist/subpaths/css.d.ts'.   <-- exports map IS the gate
```

Consequence r3 did not draw: deleting `"./color"` from `package.json#exports` would break every real
consumer and leave `npm run typecheck` **green**. The T.W1 demo-dogfood keystone is a *false proof*
for `/color`, `/easing`, `/math`, `/transform`, `/quantize`, and a true one for `/css` and `/value`
only by accident of omission. r3's cure (delete the entries) is right; its severity is understated —
this is not tidying, it is restoring the gate. Programmatic diff of the two lists:

```
exports : /color /css /easing /math /quantize /transform /value
tspaths : (bare) /color /easing /math /parsing /quantize /transform /units
IN EXPORTS, MISSING FROM tsconfig.demo paths: @mkbabb/value.js/css  @mkbabb/value.js/value
IN tsconfig.demo paths, NOT IN EXPORTS      : @mkbabb/value.js  /parsing  /units
$ ls dist/index.d.ts  ->  No such file or directory
```

**C-3 — to r1's L-5 (positional interval identity).** The finding is real and the source reading is
correct, but its reproduction is unreachable as written: step 2 is *"Press `ease-out-back` on row
`1 → 2`"*, which per N-1 destroys the pane before step 3 can run. Restate the repro with an in-range
preset (`ease-out-expo`, `ease-in-out-circ` — both measured within `[0,1]`) so it survives to the
stop-insertion step. r1 also labelled it source-derived after abandoning a live probe; with the
substitution it is live-reproducible.

**C-4 — corroboration, not correction.** I independently re-measured r2's L-r2-1 and can confirm the
demo boundary guards are wholly inert, now also for the catalogue module:

```
$ npx eslint --print-config demo/.../GradientEasingEditor.vue     -> no-restricted-imports: undefined
$ npx eslint --print-config demo/.../easing/easingCatalogue.ts    -> no-restricted-imports: undefined
$ npx eslint --print-config demo/color-picker/App.vue             -> [2,{patterns:[{group:["@components/custom/palette-browser/**/*.vue"],…}]}]
$ ls -d demo/@                                                    -> No such file or directory
```

Four of the six demo globs point at `demo/@/`, deleted at W43; the one surviving rule bans a
`@components/…` alias W43 also deleted. Net: **zero live import-boundary enforcement anywhere in
`demo/`**, which is the reason N-1's two-owner split and `useSpecimenRows.ts:13`'s depth-4 reach could
accumulate unremarked.

---

## Delta to the greenfield lattice

r3's lattice is sound and I adopt it. Two additions it does not carry, both forced by N-1/N-2:

```
demo/workbenches/gradient/
  model/rampDomain.ts        NEW — clampProgress(t). The single owner of "an eased t may leave
                             [0,1]; a colour ramp clamps". Consumed by serialize.ts and by the
                             specimen row derivation. Makes N-1 unrepresentable.
  serialize.ts               returns Result<…, RampIssue> — no throw reachable from a computed.

glass-ui easing (adds to r3's list)
  EasingPicker: fit="viewbox" | forwards `viewBox` as a slot prop
                             — so no consumer ever writes `svg[role=…]` again. N-2's whole
                             failure class deletes at the producer.

repo invariant (new, enforceable)
  src/ returns Result. demo/ may throw only from an event handler — never from a computed,
  a watch callback, or module top-level. Lint-enforceable; would have caught N-1 and r1's L-4.
```

Net at this seat, on top of r3's ≈300 deleted demo lines: `EasingAuthoringStage.vue` loses its entire
script body and style block (≈70 more lines), and the two invariants presently enforced by *comment* —
"byte identity with the picker" and "zero letterbox" — become enforced by *construction*, because in
each case only one implementation is left to be identical to.

---

## Findings index (this round only)

| id | sev | one line | new? |
|---|---|---|---|
| N-1 | BLOCKER | `back`-family tiles (3 of 27) destroy the Gradient pane; `Result`→`throw` inside a `computed` | NEW |
| N-2 | BLOCKER | zero-letterbox law already dead — glass-ui 7 ships no `role="img"`; 121.67px letterbox; T-48 animation silently deleted | NEW (corrects r2 L-r2-4, r3 L-8) |
| N-3 | MAJOR | the O-17 oracle reds on that dead selector and never reaches the click that reproduces N-1 | NEW |
| N-4 | MAJOR | four `Result`→`throw` conversions undo the library's totality at the render boundary; the seam has no owner | NEW |
| C-1 | — | r2/r3 frame a realised breakage as latent | correction |
| C-2 | — | r3 proves self-name sufficiency but misses that `paths` *bypasses* `exports` for 5 subpaths — the keystone is a false proof | correction |
| C-3 | — | r1's L-5 reproduction is unreachable past step 2 (its step-2 preset kills the pane) | correction |
| C-4 | — | r2's L-r2-1 re-measured and confirmed; zero live import-boundary enforcement in `demo/` | corroboration |

### Probe log

- **Static:** full read of the subject + `easing/{EasingAuthoringStage,EasingSpecimenStrip}.vue`,
  `easingCatalogue.ts`, `useSpecimenRows.ts`,
  `composables/{useGradientCSS,useGradientModel,useGradientInterpolation}.ts`,
  `GradientVisualizer.vue`, `package.json`, `vite.config.ts`, `tsconfig.{demo,lib}.json`,
  `vitest.config.ts`, `playwright.config.ts`, `eslint.config.js`, `src/easing.ts`,
  `src/color/operations.ts`, `src/subpaths/easing.ts`,
  `e2e/smoke/oracles/o17-easing-composition.spec.ts`, `test/gradient-v4-consume.test.ts`,
  glass-ui `dist/easing.js` + `components/easing/composables/useEasingPicker.d.ts` +
  `components/chip/{types,chipVariants}.d.ts`. Full read of r1, r2, r3.
- **Commands:** `tsc --traceResolution -p tsconfig.demo.json` (C-2) · `eslint --print-config` ×3
  (C-4) · preset range sampling over `dist/subpaths/easing.js` (N-1) · transcribed `buildFamilies()`
  replay (r3 L-1 corroboration) · `tsc` probe proving the `JumpTerm → JumpPosition` cast is a no-op
  (r2 corroboration) · `grep -c 'role:"img"'` over glass-ui dist (N-2) · `playwright test --project=smoke`
  on the O-17 oracle (N-3).
- **Browser:** 4 headless-Chromium navigations against `http://localhost:9000/#/gradient`, each one
  decisive — computed-style + tap-target measurement, the stage DOM dump, the O-17 letterbox geometry
  replay, and the N-1 crash capture. I launched my own browser rather than share the MCP session
  (which was already held by another seat), which is also why these probes are reproducible.
- **Images read:** `visual/shots/safari-desktop-light/gradient.png`; `visual/REPORT.md` §smallTapTargets
  / §namelessButtons / per-capture table and the four `/#/gradient` rows of `visual/REPORT.json`
  (`pageErrors: []`, `consoleErrors: []`, `overflowX: 0`, `bleeding[]` = the strip subtree — sound,
  the strip bleeds only inside its own `FadingScroll` port, `scrollWidth 1482` vs `clientWidth 436`).

**No source edits land from this seat.** Findings only. r1, r2 and r3 left intact.
