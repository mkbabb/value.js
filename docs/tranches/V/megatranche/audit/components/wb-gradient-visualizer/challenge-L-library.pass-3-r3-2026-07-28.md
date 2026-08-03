# CHALLENGE-L — library structure under `GradientVisualizer` · ROUND 3

> **This file does not supersede anything (E-3, addenda-not-patch).**
> Two prior seats ran this axis. Both are preserved verbatim beside this file:
>
> - `challenge-L-library.pass-1-2026-07-27.md` — r1, findings **L-1 … L-17**
> - `challenge-L-library.pass-2-r2-2026-07-28.md` — r2, findings **R2-1 … R2-11**, including the
>   **BLOCKER** (`ease-*-back` → `color_progress_out_of_range` → whole-app erasure) that r1 missed
>
> Read them first. Round 3 was run **blind** — the closure trace, probes and benchmarks below were
> produced before either prior report was opened — and is reported here as an *independent
> replication plus delta*. §2 states exactly which prior findings replicate and which of my
> findings are new; §3 carries only what is new; §4 carries corrections to r1/r2.

## Model receipt

I observe myself to be **Opus 5** — exact model id `claude-opus-5[1m]`, the 1M-context Opus 5
seat, matching the explicit declaration this seat was spawned with. Not inherited, not undeclared.

---

## 0 · Substrate and method

- **Subject**: `demo/workbenches/gradient/GradientVisualizer/GradientVisualizer.vue` (279 L).
- **Substrate**: branch `tranche-u`. The brief pins HEAD `c654824e`; the tree had already advanced
  to **`f36f780c`** (`docs(V·mega): STATE — three OM censuses complete`) when this seat opened.
  r1 reports against `c654824e`. All line numbers below are read at `f36f780c`.
- **Method**: full import-closure trace; `package.json#exports` vs `tsconfig.demo.json#paths` vs a
  real `npx tsc -p tsconfig.demo.json --traceResolution` run; a per-symbol consumer census;
  three live browser probes (WebKit + Chromium) against the dev server on `:9000`; one in-page
  micro-benchmark that imports the **shipped** composables through Vite's `/@fs/` dev graph, so the
  numbers are the real modules and not a re-implementation; the four `/#/gradient` rows of
  `docs/tranches/V/megatranche/audit/visual/REPORT.json` and the desktop-light screenshot.
- **Verdict**: **DEFECTIVE** — concurring with r1 and r2, on independently derived evidence.

---

## 1 · The import closure, edge by edge

`GradientVisualizer.vue:1–28`. Every edge traced to its home. This is the on-axis spine; the
cross-references say which report owns each defect.

| # | Line | Specifier | Resolves to | Verdict |
|---|------|-----------|-------------|---------|
| 1 | 2 | `vue` | host `vue@3.5` | ✅ |
| 2 | 3–9 | `../../../ui/select` | `demo/ui/select/index.ts` → **1-line re-export of `@mkbabb/glass-ui`** | ❌ r1 L-6 |
| 3 | 10 | `../../../ui/slider` | `demo/ui/slider/index.ts` → **1-line re-export of `@mkbabb/glass-ui`** | ❌ r1 L-6 |
| 4 | 11 | `@lucide/vue` | glass-ui peer, declared devDep | ✅ |
| 5 | 12 | `@mkbabb/glass-ui` (`writeClipboard`) | root barrel; also reachable at `./dom` | ⚠️ r1 L-9 / R2-11 |
| 6 | 13 | `@mkbabb/glass-ui/dock` (`DockControl`) | dock **chrome** primitive rendered in a pane **body** | ❌ r1 L-10 / R2-9 |
| 7 | 14–16 | `./Gradient{Stop,Code,Easing}Editor.vue` | siblings | ✅ |
| 8 | 17–22 | `../composables/useGradientModel` | own tree; 2 of 10 named imports arrive via a 3-hop shim | ❌ r1 L-7 / R2-6 |
| 9 | 23 | `../composables/useGradientInterpolation` | own tree | ⚠️ **L3-1** |
| 10 | 24 | `../composables/useGradientCSS` (`easingFnOf`) | own tree | ❌ r1 L-4 (+ **L3-2** below) |
| 11 | 25 | `@mkbabb/value.js/color` (type `HueInterpolationMethod`) | **published subpath** → `dist/subpaths/color.d.ts` | ✅ **correct** |
| 12 | 26 | `../../../color-session/picker-color` (type `PickerSpace`) | cross-feature reach for `export type PickerSpace = SpaceId` (`picker-color.ts:37`) — a **rename of a library type whose sibling this same file imports from the published surface on line 25** | ❌ **L3-3** |
| 13 | 27 | `../../../palettes/usePalettePorts` (`LIBRARY_PORT_KEY`) | cross-feature **value** import: workbench → palettes DI | ❌ r1 L-2 (72 modules) |
| 14 | 28 | `reka-ui` (type `AcceptableValue`) | reach **past** the design system into its peer | ❌ R2-5 |

The one edge this component gets right is **#11**. `@mkbabb/value.js/color` is a real key of
`package.json#exports:12`, resolves through `dist/subpaths/color.d.ts`, and a published consumer
could write it verbatim. No deep `src/` path appears in the component or in any of its three
composables. That half of the T.W1 demo-dogfood keystone **holds** — but see **L3-4**, which shows
the *test* half does not.

---

## 2 · Replication ledger

Round 3 was blind. Where it lands on the same defect from a different starting point, that is an
independent replication and should raise confidence; where it lands somewhere new, §3 has it.

**Independently replicated (evidence re-derived, no cross-reading):**

| Prior finding | R3 evidence |
|---|---|
| r1 **L-4** — the CSS→easing bridge is unreachable, ships for one test | Re-derived from the *type side*: `EasingPickerValue.fn` is `readonly fn: EasingFn` — **required** — at `glass-ui/dist/components/easing/composables/useEasingPicker.d.ts:17`, and all three interval producers set it (`useGradientCSS.ts:53–62`, `useGradientModel.ts:134–140`, `gradientParse.ts:297`). Live confirmation: `{"intervalHasFn": true, "intervalKeys":["mode","css","fn","points","steps","term"]}`. **Extension in L3-2.** |
| r1 **L-6** — `demo/ui/*` is 19 alias barrels | Dumped all 19; every one a bare re-export, zero add value. Measured 48 demo files import through them; **0** import `Select`/`Slider` directly — so it is uniform indirection, deletable mechanically rather than migratable. |
| r1 **L-7** — 3-hop re-export chain | `color-space-meta.ts:26` → `useGradientInterpolation.ts:17` → `useGradientModel.ts:21` → `GradientVisualizer.vue:19–20`, while `MixConfigBar.vue:18` takes the same constant in **one** hop. |
| r1 **L-10** / R2-9 — `DockControl` outside a dock | Chromium probe: `--dock-control-size` and `--dock-control-safe-inset` both resolve **`""`**, box **28×28**, versus `max(calc(2.5rem*1),0px)` / `calc(…*0.1)` and **40×40** for a control inside the dock. Then, using `capture.mjs:102–105`'s *exact* filter under WebKit, the route's `"namelessButtons": 1` resolves **uniquely** to this control (`title="Copy CSS"`, `x:658 y:791 28×28`). |
| r1 **L-12** — `railRampCSS` recomputes on `direction` | Benchmarked in-page against the shipped module, N=500 warmed: `serializeRailRamp` **0.041 ms/call**, `serializeCoalescedGradient` 0.038, `serializeGradient` 0.0004, 33 sub-stops, `COALESCE_RESOLUTION = 32`. A measured 60-step drag (90°→150°, 60 tile style-writes, 800 ms wall) discards ≈ **2.5 ms**. Small — I record it MINOR, as r1 did. |
| R2-4 — `tsconfig.demo.json#paths` drift | Independently enumerated: 3 dead targets (`dist/index.d.ts`, `dist/subpaths/parsing.d.ts`, `dist/subpaths/units.d.ts` — all confirmed absent by `ls`), 2 live subpaths missing (`/css`, `/value`). `--traceResolution` shows `/css` landing correctly **only** via Node package self-reference (`with Package ID '…@4.0.0'`), not via the declared `paths`. |
| R2-5 — reka-ui reach because glass-ui hides its type | `glass-ui/dist/components/_shared/selection.d.ts:2` declares `export type SelectionValue = string \| number`; `components/select/index.d.ts` exports `SelectEmits`/`SelectProps` and **not** `SelectionValue`. Four demo files took the escape hatch: `GradientVisualizer.vue:28`, `MixConfigBar.vue:15`, `GenerateControls.vue:33`, `AuroraPane.vue:25`. |
| R2-6 — the barrel's re-exports are dead | Per-symbol census: `serializeGradient`, `serializeCoalescedGradient`, `serializeRailRamp`, `linearInterval`, `parseGradientCSS`, `GradientParseResult`, `ParsedGradientModel` — **zero** consumers through `useGradientModel`; every real importer names the owning module directly. |
| R2-8 — phantom `defineModel("selectedStopId")` | No binder anywhere in `demo/`, `e2e/`, `test/`; `GradientPane.vue:25` renders `<GradientVisualizer ref="visualizerRef" />` with no props. |
| R2-10 — dead cross-boundary DI at the mount point | `GradientPane.vue:8` — `const cssColorOpaque = inject(CSS_COLOR_KEY)!;` never referenced in that file. |

**New in round 3** — five findings, carried in §3:

- **L3-1** — one library `Result`, **six** demo unwrap sites, **two contradictory failure policies**;
  and the census *bounds* r2's BLOCKER.
- **L3-2** — the mechanism under r1 L-4, plus its full blast radius on the library imports.
- **L3-3** — `PickerSpace` is a rename of a library type the same file already imports properly.
- **L3-4** — `npm test` has no `pretest`, and the gradient consume test straddles `src/` and `dist/`
  in one process.
- **L3-5** — one paint recipe, two scoped homes, plus three inline assemblies the tree's own
  comments forbid; and three raw `<hr>` where the design system ships `Separator`.

---

## 3 · New findings

### L3-1 · MAJOR — one `Result`, six unwrap sites, two contradictory policies — and it bounds the r2 BLOCKER

`@mkbabb/value.js/color`'s `mixColors` returns a `Result`. The demo has no owner for unwrapping it,
so six independent sites re-write the unwrap, with **five different message prefixes and two
incompatible failure policies**:

| # | Site | Progress argument | Policy |
|---|---|---|---|
| 1 | `workbenches/gradient/composables/useGradientInterpolation.ts:36–38` | **eased `t`** | `throw` — `"Gradient color mix failed"` |
| 2 | `workbenches/gradient/composables/useGradientCSS.ts:202–208` | **eased `t`** | `throw` — `"Gradient color mix failed"` |
| 3 | `workbenches/mix/MixAnimationCanvas/composables/mixStage.ts:102–106` | `index/(RAMP_STOPS-1)` | `throw` — `"Pigment mix failed"` |
| 4 | `color-session/ink.ts:147–152` | literal `0.382` | `throw` — `"Muted ink mix failed"` |
| 5 | `palettes/mix.ts:35` (`mixedOrThrow`) | `weight/total` (`:63`), `t` (`:102`) | `throw` — `"Color mix failed"` |
| 6 | `color-session/color-chips/sample.ts:75–79` | `j/(perSegment-1)` | **`return null`** — silent |

Site 6 is a masking fallback (edict 2): the same failure that halts five call sites silently yields
`null` at the sixth. `palettes/mix.ts:27–37` already *named* the concept — `mixedOrThrow` — but
parked it inside the palettes feature, so nobody else can reach it.

**And the census bounds r2's BLOCKER.** r2 established that value.js's own `ease-*-back` presets
emit eased output outside `[0,1]` (`src/easing.ts:62–64`) while `mixColors` rejects progress outside
`[0,1]`, and that the three gradient sites feeding *eased* `t` therefore all crash. Auditing the
progress argument at every one of the six sites shows sites 3–6 always pass a clean fraction —
`index/(RAMP_STOPS-1)`, a literal, `weight/total`, `fracPos-lo`, `j/(perSegment-1)`, each in
`[0,1]` by construction. **No additional crash site exists outside the gradient tree.** That is a
negative worth recording: it confines the blast radius r2 measured, and it means the cure is a
single adapter, not a sweep.

- **Reproduction (policy split)**: `grep -rn "mixColors" demo --include='*.ts' --include='*.vue'` →
  the six sites above; read the four lines after each.
- **Mechanism**: a library that returns `Result` and a consumer tree with no boundary module to
  absorb it. Every caller invents a policy.
- **Cure**: `color-session/color-utils.ts` — 25 lines, already the demo's colour boundary, already
  the home of `parseColorIn`/`colorToCss` — gains **one** pair:
  `mixOrThrow(c0, c1, t, space, hue)` and `mixCssColors(css0, css1, t, space, hue): string`, the
  latter carrying r2's clamp/rejection ruling in exactly one place. All six sites become one-liners.
  Note that `interpolateStopColors` (`useGradientInterpolation.ts:27–39`) *is* `mixCssColors` with a
  gradient-flavoured name and zero gradient semantics — it should not live in a gradient composable
  at all.

### L3-2 · MAJOR — the mechanism under r1 L-4, and its full blast radius

r1 established that the CSS→easing bridge is unreachable. The **mechanism** is a signature that
widens a field the domain type declares required:

```ts
// useGradientCSS.ts:120-133
export function easingFnOf(
    interval: Pick<GradientInterval, "css"> & Partial<Pick<GradientInterval, "fn">>,
                                            // ^^^^^^^ invents an optional `fn`
): EasingFunction {
    if (interval.fn) return interval.fn;              // always taken
    ...
    const parsed = parseTimingFunction(interval.css); // never reached
```

`GradientInterval = EasingPickerValue` (`useGradientModel.ts:49`), and `EasingPickerValue.fn` is
`readonly fn: EasingFn` — **required** (`useEasingPicker.d.ts:17`). The `Partial<>` fabricates a
caller shape the model cannot produce; the dead branch is downstream of that one word.

**Blast radius, not previously enumerated.** Deleting the fabricated branch removes:

- `useGradientCSS.ts:69–118` — `resolvedEasingCache`, `easingValue`, `linearStops`,
  `timingFunctionValue` — **50 lines**, plus the cache/parse tail of `easingFnOf`.
- The module's **entire** `@mkbabb/value.js/css` import (lines 25–29: `parseTimingFunction`,
  `CssLinearStop`, `CssTimingFunction`) — this component tree's only `/css` consume.
- **Four of five** `/easing` value imports (lines 14–20): `CubicBezier`, `easing`, `linearEasing`,
  `steppedEase`. Only `linear` is live, at line 58.

So the component tree's advertised consume of two library subpaths collapses to a single symbol.

- **Cure**: `easingFnOf(interval: GradientInterval) => interval.fn` — one expression. The CSS→callable
  direction, if wanted, is **the library's** job: `@mkbabb/value.js/easing` should expose
  `easingFromCss(css): Result<EasingFunction, EasingIssue>` and own `linearStops`' position-filling
  algorithm (`useGradientCSS.ts:80–104`), which is a CSS `linear()` *spec* concern with no business
  in a demo gradient module. Then `test/gradient-v4-consume.test.ts`'s second case becomes a
  **library** test that proves something true.

### L3-3 · MINOR — `PickerSpace` is a rename of a library type the same file already imports properly

`GradientVisualizer.vue` line 25 imports `HueInterpolationMethod` from `@mkbabb/value.js/color` —
correct. Line 26 then crosses into another feature for its sibling:

```ts
// demo/color-session/picker-color.ts:37
export type PickerSpace = SpaceId;      // SpaceId is imported from @mkbabb/value.js/color
```

A cross-feature edge, in a component, to obtain a re-branded copy of a library type that is one hop
away on the line above. `PickerSpace` adds no constraint, no branding, no narrowing.

- **Cure**: `import type { HueInterpolationMethod, SpaceId } from "@mkbabb/value.js/color";` — one
  line, one edge removed. Retire the alias wherever it constrains nothing. (Where the picker really
  does mean "a space the picker supports", that is a *subset* and should be a real subset type, not
  an identity alias.)

### L3-4 · MAJOR — `npm test` has no `pretest`, and the gradient consume test straddles `src/` and `dist/` in one process

r1's N-1 proved the *demo* tree carries no `@src/*` reach. True — but the grep was scoped to `demo`.
The test that certifies this component's library consume does:

```ts
// test/gradient-v4-consume.test.ts
1  import { describe, expect, it } from "vitest";
2  import { parseCssColor } from "@src/subpaths/css";                       ← SOURCE
3  import { easingFnOf, linearInterval, sampleCoalescedStops,
7          serializeCoalescedGradient } from "…/composables/useGradientCSS"; ← which imports
                                                                            ← @mkbabb/value.js/css
                                                                            ← = dist/
```

`vitest.config.ts` aliases **only** `@src`. The demo module's own `@mkbabb/value.js/css` therefore
resolves by package self-reference to `dist/subpaths/css.js`. **Both copies of the library are live
in one test process**: line 2's `parseCssColor` comes from `src/`, and the assertion
`expect(parseCssColor(css).ok).toBe(true)` (line 30) validates a string produced by a `dist/`-backed
pipeline against a `src/`-backed parser.

The scripts make this unpinned:

```
"pretypecheck": "npm run build",   ← typecheck rebuilds dist
"prepare":      "rm -rf dist && npm run build",
"test":         "vitest run"       ← NO pretest hook
```

- **Current state (honest)**: not diverged right now. `find src -name '*.ts' -newer dist/subpaths/css.js`
  → **0 files**; `dist/subpaths/css.js` built `2026-07-27 11:52`. So this is a live *hazard* with a
  confirmed mechanism, not a live *failure*. A registry copy of `@mkbabb/value.js@4.0.0` is also
  installed at `node_modules/@mkbabb/value.js/dist/subpaths/css.d.ts` (10 910 B) and **differs**
  from the local build (12 490 B, different inode) — a third copy on disk.
- **Reproduction**: edit any `src/css/**` behaviour, run `npm test` without building. The demo half
  of the suite exercises the stale `dist/`; the `@src` half exercises the edit. Green means nothing.
- **Cure**: pick one surface per program and enforce it. Either add `"pretest": "npm run build"` and
  let the demo-facing suites speak `dist/` exclusively (retiring `@src` from any test that also
  imports a demo module), or alias `@mkbabb/value.js/*` → `src/subpaths/*` in `vitest.config.ts` so
  the whole suite is source-resolved. Straddling is the defect. Related: **R2-4** — the same
  single-source discipline `vite.config.ts:24–36` already applies by *generating* its alias set from
  `package.json#exports` is what `tsconfig.demo.json` and `vitest.config.ts` both lack.

### L3-5 · MINOR — one paint recipe, two scoped homes; three inline assemblies the tree forbids; three raw `<hr>`

`demo/DESIGN.md:338` (S owner-ruling 2026-07-05): *"ONE recipe, one home."* There are two, in two
SFCs of the same feature:

```css
/* GradientVisualizer.vue:271-278 */            /* GradientStopEditor.vue:319-327 */
.gradient-render-tile {                         .gradient-rail {
    background: var(--tile-render),                 border-radius: var(--radius-pill, 9999px);
                var(--alpha-checker);               border: 1px solid var(--card-edge);
    background-origin: border-box;                  background: var(--rail-ramp), var(--alpha-checker);
    background-clip: border-box;                    background-origin: border-box;
    background-repeat: no-repeat, repeat;           background-clip: border-box;
    background-size: 100% 100%, 16px 16px;          background-repeat: no-repeat, repeat;
    box-shadow: var(--shadow-sm);                   background-size: 100% 100%, 16px 16px;
}                                                   box-shadow: var(--shadow-sm);
                                                }
```

Five of six declarations byte-identical; `GradientVisualizer.vue:267–268` concedes it in prose —
*"the rail's material contract, same shape"*. That same comment ends *"Never a per-callsite
`background` shorthand assembly"*, and the feature does exactly that three times:
`GradientStopEditor.vue:220–221`, `:247`, `GradientEasingEditor.vue:154`.

Also confirmed live (`"hrs": ["border-border","border-border","border-border"]`): three raw
`<hr class="border-border" />` at lines 148, 240, 251, where glass-ui ships `Separator` — already
barrelled at `demo/ui/separator/index.ts` — and three repeated
`<h3 class="font-display text-subheading text-muted-foreground">` at 149, 241, 253, a per-instance
typographic recipe where `.section-label` (`demo/styles/utils.css:13`) shows the house already knows
how to do this at root level. Edicts 4 and 5.

- **Cure**: one `demo/styles/` utility (`.paint-over-checker`, parameterised by `--paint-layer`)
  consumed by both SFCs and the three inline sites; `Separator` for the rules; a
  `.section-heading` register beside `.section-label`.

---

## 4 · Corrections and refinements to the prior passes

1. **r1 N-1 is correctly scoped but incompletely titled.** *"value.js is consumed through the
   published subpath export map, exclusively"* is true of `demo/`. It is **not** true of the test
   that certifies this component's consume — see **L3-4**. r2 already corrected N-1's `paths` half;
   this is the second half.
2. **r1 L-2's blast radius survives, its bundle consequence does not follow automatically.** The
   72-module drag across the feature boundary is a real architectural defect. But
   `demo/shell/usePaneRouter.ts:69–77` code-splits every pane via
   `defineAsyncComponent(() => import(...))`, and `App.vue` calls `providePalettePorts` in the main
   chunk regardless — so `usePalettePorts` is retained by the root entry with or without this edge.
   The *coupling* finding stands unchanged; a *chunk-weight* claim would need a build-stats
   measurement I did not run and therefore do not assert.
3. **r1 L-12's cost, measured.** r1 established the invalidation coupling; the number is
   **0.041 ms/call**, ≈ 2.5 ms over a 60-step drag (§2). Materially small — the finding's value is
   the mechanism (one invalidation cell for two domains), not the millisecond.
4. **A detail not in either report**, offered as INFO: the **CSS** section's copy control copies
   `coalescedCSS` while the editor directly beneath displays `simpleCSS`. Measured on the default
   model: `simpleLen` **74**, `coalLen` **1363** — **18.4×**. Both readings are defensible
   (`useGradientCSS.ts:277–280` calls coalesced "the CSS that actually renders"); shipping both
   under one unqualified label is not. Also: `useGradientCSS.ts:190` declares
   `const easing = easingFnOf(interval)`, **shadowing** the module import `easing` from
   `@mkbabb/value.js/easing` on line 16, in the same file; and `resolvedEasingCache`
   (`useGradientCSS.ts:69`) and `nextId` (`useGradientModel.ts:66`) are module-global mutable state
   inside modules named as composables.

---

## 5 · Negative results (checked at round 3, sound)

Stated explicitly so the absence is evidence rather than silence.

1. **No deep-`src/` import in the component or its composables.** All library imports go through
   published subpaths a real consumer could write. (The *test* does not — L3-4.)
2. **`verbatimModuleSyntax` honoured.** Every type-only import in the component is `import type`
   (lines 22, 25, 26, 28). Edict 8 satisfied. Replicates r1 N-2.
3. **The brief's named historical suspects are not in this closure.**
   `grep -rn "useLayerTransition\|ActionBarLayer\|useDark" demo/workbenches/gradient/ demo/color-session/{color-utils,picker-color,color-space-meta}.ts`
   → **no matches**. The `ActionBarLayer` reimplementation, the
   `palettes/export.ts` + `usePaletteExport.ts` vs `export/serializers` triple, and the three
   parallel `useDark` stores (`useMarkdownHighlighting.ts:76`) are all real and all belong to other
   seats.
4. **No console errors, no page errors, no failed requests, `overflowX: 0`** on `/#/gradient` across
   all four Safari matrices (`REPORT.json`). The route's only reported a11y defects are the
   `namelessButtons: 1` resolved in §2 and two 20×20 stop handles owned by `GradientStopEditor`.
5. **No god module.** Largest file in the closure is `GradientStopEditor.vue` at 392 L; the subject
   is 279 L; the composables are 301/334/193/56 L. The R.W4 / S.W5 decompositions held. Every defect
   on this axis is a **boundary or ownership** defect, not a size defect.
6. **The r2 BLOCKER's crash class does not extend beyond the gradient tree** — the four non-gradient
   `mixColors` sites all pass clean fractions (**L3-1**).

---

## 6 · The greenfield lattice

Concurring with r1 §"The greenfield lattice" and r2's `R2-1` cure; stated here in the shape round 3
would build, with the deltas marked.

```
@mkbabb/value.js                    — published library, seven subpaths
  /color   mixColors, convertColor, …
  /css     parseCssColor, serializeCssColor, parseTimingFunction
  /easing  CubicBezier, linear, steppedEase, linearEasing
           + easingFromCss(css): Result<EasingFunction, EasingIssue>       ← absorbs L3-2 / r1 L-4
             (also owns CSS linear() position-filling — today it is
              useGradientCSS.ts:80-104, stranded in a demo module)
           + the [0,1] range contract stated ONCE, where ease-*-back        ← r2 R2-1
             and mixColors are both defined

@mkbabb/glass-ui                    — the design system, consumed BY SUBPATH, never renamed
  /select  Select… + export type SelectionValue                            ← closes R2-5
  /slider  Slider
  /button  Button   ← the Copy control's real home                         ← closes r1 L-10 / R2-9
  /easing  EasingPicker, EasingPickerValue
  (demo/ui/ DOES NOT EXIST)                                                ← closes r1 L-6

demo/color-session/                 — the colour BOUNDARY (correct today, under-used)
  color-utils.ts      parseColorIn · colorToCss · mixOrThrow · mixCssColors ← closes L3-1
  color-space-meta.ts INTERPOLATION_SPACES · HUE_INTERPOLATION_METHODS
                      ← the ONE home; Gradient and Mix both one hop         ← closes r1 L-7

demo/workbenches/gradient/
  model/
    gradientModel.ts     GradientStop · GradientInterval · GradientType
                         rampState = { stops, intervals, space, hue }
                         geometry  = { type, direction }                    ← closes r1 L-12
    gradientSample.ts    sampleRamp(rampState): CoalescedSample[]           ← THE one sampling law
                         sampleAt(rampState, position): AnyColor            ← closes r1 L-5 / R2-7
    gradientSerialize.ts serializeSimple · serializeCoalesced · serializeRail
                         (take (geometry, samples) — pure, never re-sample)
    gradientParse.ts     parseGradientCSS  (already correct)
    NO re-export barrel anywhere                                            ← closes R2-6
  GradientPane.vue       composition seam: owns useGradientModel(), owns
                         seedFromPalette — the ONLY file that may know a
                         palettes port; passes colours down                 ← closes r1 L-2
  GradientVisualizer.vue PRESENTATION ONLY — no interval search, no eased
                         mixing, no unbound defineModel, no function props
```

Four moves carry the value, in dependency order:

1. **r2's `R2-1` cure first** — it is the only user-visible outage. One `mixCssColors` owner in
   `color-utils.ts` carries the range ruling; three gradient sites collapse onto it (**L3-1** shows
   the other three demo sites need only the *policy* unification, not a crash fix).
2. **Push `easingFromCss` into `@mkbabb/value.js/easing`**, delete the `Partial<>` (**L3-2**). The
   demo stops owning a CSS-spec algorithm; the test that today certifies a fiction becomes a real
   library test — which also removes the reason `test/gradient-v4-consume.test.ts` straddles two
   library copies (**L3-4**).
3. **Delete the three shim layers** — `demo/ui/` (19 files), `useGradientModel`'s re-export block
   (8 symbols), `useGradientInterpolation`'s re-export line (2 symbols). Net −20 files, −11
   re-exported names, zero behaviour change. Pure subtraction.
4. **Split `modelState` into `rampState × geometry`** and make the serializers take samples rather
   than re-derive them. "The ONE sampling law" becomes true rather than asserted.

---

## 7 · Strongest defect

Round 3's strongest **new** contribution is **L3-4**: `npm test` has no `pretest`, and
`test/gradient-v4-consume.test.ts` runs `src/` and `dist/` copies of the library side by side in one
process — so the suite that certifies this component's library consume is not pinned to the surface
the component actually consumes. Combined with r1 L-4 / **L3-2** (the consume it certifies is
unreachable in the app), the position is: *the component's declared relationship to
`@mkbabb/value.js/css` is fictional in the application and unpinned in the test that vouches for
it.* That is exactly the "false proof of the public API" this axis exists to find.

Across all three passes, the strongest defect on this axis remains **r2's `R2-1`** — the unowned
eased-ramp adapter, which crashes on the library's own shipped presets and erases the whole
application. Round 3 concurs, and **L3-1** bounds it: six demo sites unwrap `mixColors`, but only
the three in this tree feed it *eased* progress, so a single adapter in `color-session/color-utils.ts`
closes the whole class.

| ID | Severity | One line | Status |
|---|---|---|---|
| R2-1 | **BLOCKER** | eased-ramp adapter unowned; `ease-*-back` erases the app | r2 · R3 concurs, bounds it (L3-1) |
| r1 L-1 | BLOCKER | every demo import boundary is dead lint | r1 |
| r1 L-2 | BLOCKER | one `Symbol` drags 72 modules across the feature boundary | r1 · R3 refines (§4.2) |
| L3-4 | MAJOR | `npm test` unpinned; the consume test straddles `src/` and `dist/` | **NEW** |
| L3-2 | MAJOR | `Partial<>` fabricates the dead branch; kills the whole `/css` consume + 4/5 `/easing` imports | **NEW** (extends r1 L-4) |
| L3-1 | MAJOR | six unwrap sites, two contradictory policies; bounds the BLOCKER | **NEW** |
| r1 L-6 | MAJOR | `demo/ui/*` = 19 alias barrels | r1 · R3 replicates |
| r1 L-7 | MAJOR | 3-hop re-export chain for one consumer | r1 · R3 replicates |
| r1 L-10 / R2-9 | MAJOR | `DockControl` outside the dock: tokens empty, 28×28 vs 40×40, the route's nameless button | r1+r2 · R3 replicates + measures |
| R2-4 | MAJOR | `tsconfig.demo.json#paths` drifted five rows | r2 · R3 replicates via `--traceResolution` |
| R2-5 | MAJOR | reka-ui typed because glass-ui hides `SelectionValue` | r2 · R3 replicates |
| R2-6 | MAJOR | 7 of the barrel's re-exports have zero consumers | r2 · R3 replicates |
| L3-3 | MINOR | `PickerSpace` renames a library type imported correctly one line above | **NEW** |
| L3-5 | MINOR | one paint recipe two homes; 3 forbidden inline assemblies; 3 raw `<hr>` | **NEW** |
| r1 L-12 | MINOR | `railRampCSS` recomputes on `direction` — 0.041 ms/tick | r1 · R3 measures |

---

*No source edits were made by this seat. The only writes were under*
`docs/tranches/V/megatranche/audit/components/wb-gradient-visualizer/`*: this file, plus verbatim
archive copies of the two prior passes (`challenge-L-library.pass-1-2026-07-27.md`,
`challenge-L-library.pass-2-r2-2026-07-28.md`) made before this file replaced the base name, so that
r1's L-1…L-17 and r2's R2-1…R2-11 remain readable and citable. Probe scripts live in the session
scratchpad.*
