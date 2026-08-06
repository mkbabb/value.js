claude-opus-5[1m]

# CHALLENGE · `SpringTrace.vue` · axis **L (LIBRARY)**

**Target** `/Users/mkbabb/Programming/keyframes.js/demo/scenes/spring/SpringTrace.vue` (129 lines)
**Mode** static, read-only. No installs, no dev server, no browser tooling. Every numeric claim below is either a file:line read or an offline `node -e` recomputation of the component's own arithmetic against the engine's own emitter shape.
**Posture** the component was assumed DEFECTIVE until the tree proved otherwise. Two hypotheses were **killed by the tree** and are recorded as such in §4 so the reader can see the falsifiers doing work.

**Read whole:** the component; its one import `./useSpringLinearStops.ts`; the engine it dogfoods (`src/animation/physics/spring/css/linear-stops.ts`, `css/timing-function.ts`, the barrel `src/animation/index.ts`); its parent `SpringTarget.vue` and grandparent `SpringScene.vue`; its sibling consumer `StartingStyleTarget.vue`; the param owner `SpringPhysicsFacet.vue` + `springPresets.ts`; `demo/styles/style.css`; the installed `@mkbabb/glass-ui@7.0.0` and `@mkbabb/value.js@4.0.0` type/style surfaces; `test/physics/springLinearStops.test.ts`.

**Tally — defects 14 (0 BLOCKER / 4 MAJOR / 5 MINOR / 5 INFO) · superlatives 5.**

> **On the zero-blocker call.** Nothing here crashes, throws, leaks, or fails a build *in the current working tree*. The worst finding (L-1) is a deterministic geometric error on every render; the sharpest (L-2) is a silent degradation that only fires on a clean `npm ci`. Both are MAJOR. Inflating either to BLOCKER would be the false-defect the brief warns against.

---

## 1. What the component is

A 129-line SFC that takes `(response, dampingFraction)`, asks the keyframes engine for a CSS `linear()` string, regex-parses that string back into points, and draws them as an SVG path over a target line and a baseline. Template 1–30, script 32–95, style 97–129. One concern, colocated beside its parent and its composable.

The engine's emitter is fully determined (`src/animation/physics/spring/css/linear-stops.ts:62–70`):

```ts
const stops: string[] = ["0"];
for (let i = 1; i <= sampleCount; i++) {
    const pct = (i / (sampleCount + 1)) * 100;
    stops.push(`${v.toFixed(5)} ${pct.toFixed(3)}%`);
}
stops.push("1");
return `linear(${stops.join(", ")})`;
```

So the **only** string this component will ever see is: a bare `0` head, 24 interior stops each carrying an explicit percent, a bare `1` tail — 26 stops. That determinism is what makes L-1 provable without a browser.

---

## 2. DEFECTS

### L-1 · MAJOR · the implicit-position fill clobbers the CSS anchors — every plot is drawn on `[2%, 98%]`, never `[0%, 100%]`

**Provenance** `SpringTrace.vue:59–79` (the fill loop + the anchors), against emitter `src/animation/physics/spring/css/linear-stops.ts:62–70`.

The component states the CSS rule correctly in prose at `:48–49`:

> `// Stops without an explicit % are distributed evenly (the CSS linear() rule);`
> `// the FIRST/LAST implicit stops anchor 0% / 100%.`

…and then does not implement it. The fill loop at `:62–75` treats a leading/trailing run of implicit stops as if it were an *interior* run bounded by real neighbours — seeding `lastPct = 0` (`:61`) and defaulting `nextPct = 100` (`:66`) as though those were explicit stops that must be interpolated *toward*, rather than anchors the endpoint must *be*. The span at `:67` therefore counts one sub-interval that does not exist:

```ts
const span = j - i + 1;                                   // :67
pts[k]!.pct = lastPct + ((nextPct - lastPct) * (k - i + 1)) / span;   // :69
```

**Head** (`i=0`, `j=1`, `nextPct = 4`, `span = 2`) → `pts[0].pct = 0 + 4·1/2 = 2`.
**Tail** (`i=25`, `j=26`, `lastPct = 96`, `nextPct = 100`, `span = 2`) → `pts[25].pct = 96 + 4·1/2 = 98`.

The guard written to prevent exactly this is **unreachable dead code**, because the fill has already written a non-null value into both slots:

```ts
pts[0]!.pct = pts[0]!.pct ?? 0;          // :77 — never fires
pts[n - 1]!.pct = pts[n - 1]!.pct ?? 100; // :78 — never fires
```

**Verified offline** by replaying `linear-stops.ts:62–70`'s exact output shape through `SpringTrace.vue:50–79` verbatim:

```
n stops        = 26
FIRST stop pct = 2    (CSS-correct: 0)
stop[1]  pct   = 4
stop[24] pct   = 96
LAST  stop pct = 98   (CSS-correct: 100)
anchors fired? first: false   last: false
```

The interior arithmetic **is** correct — for a run of nulls between explicit `A` (index `a`) and `B` (index `b`), `:69` yields `A + (B−A)·(k−a)/(b−a)`, which is the CSS even-distribution rule exactly. Only the two edge cases are wrong, and the sole producer emits *both* of them on *every* call. The defect fires on 100% of real inputs.

**Consequence.** The trace begins 2% in from the left and stops 2% short of the right edge. In a `viewBox="0 0 100 60"` with `preserveAspectRatio="none"` at `width: 100%` (`:106`), inside `max-w-3xl` (`:9` — 48rem/768px), that is ≈15px of missing curve at each end. The terminal stop — value `1`, the settle, the pedagogical payoff of "rings back and lands on the target" — hangs in mid-air at `x=98` instead of meeting the right edge, while the target line and baseline (`:23`, `:25`) both span the full `x1="0" x2="100"`. The curve visibly fails to reach the graticule it is drawn against.

**Falsifier.** Any of: (a) a rendered screenshot showing the path's first and last vertices flush with the SVG's left/right edges; (b) an emitter change that makes `springLinearStops` write explicit `0%` / `100%` on the head/tail stops (kills the trigger, not the logic bug); (c) a reading of `:67` showing `span` should be `j − i + 1` for the edge runs too. (c) is refuted by the CSS Easing L1 spec text the component itself quotes at `:48–49`.

**Note on double-counting:** the dead-code facet (`:77–78`) is *the same finding*, not a second one. It is filed here rather than as a separate row.

---

### L-2 · MAJOR · the phantom-dep bite — a component the census scores "glass-clean" carries five hard, SILENT glass-ui dependencies

**Provenance** `SpringTrace.vue:11, 12, 115` + `demo/styles/` (absence) + `node_modules/@mkbabb/glass-ui/dist/styles/`.

`lane-frontend.md §4` classifies this file `129 | spring/SpringTrace.vue | b` — *no glass-ui import*, one of the 21 `.vue` files on the clean side of the boundary (§9: "`.vue` NOT importing glass-ui | 21"). That classification is **import-graph-true and consequence-false**. Five of the component's rendering primitives are owned by the undeclared package (F-1):

| site | symbol | demo definitions | glass-ui owner |
|---|---|---|---|
| `:11` | `.text-small` | **0** | `dist/styles/components.css` → `font-size: var(--type-small)` |
| `:12` | `.text-mono-caption` | **0** | `dist/styles/typography/utilities.css` → `@utility text-mono-caption { font-family: var(--font-mono); … }` |
| `:11` | `--foreground` | **0** | `dist/styles/glass/ladder.css` |
| `:12` | `--muted-foreground` | **0** | `dist/styles/glass/ladder.css` |
| `:115` | `--border` | **0** | `dist/styles/tokens/color-radius.css` |

Probe: `grep -rn -- "--border:" demo/styles/` → **0**; same for `--foreground`, `--muted-foreground`. `grep -rn "text-mono-caption\|text-small" demo/styles/` → **0**.

**Why this is worse than a normal missing dep.** Both failure modes are *silent*:

1. `.text-mono-caption` is a **Tailwind v4 `@utility` registration** living inside glass-ui's shipped CSS. It is compiled by the *consumer's* Tailwind pass over the glass cascade (`demo/styles/style.css:3`). Remove glass-ui and Tailwind emits nothing for the class and **does not error** — the caption silently loses its mono family, caption size, and tracking.
2. `.plot-baseline { stroke: var(--border); }` (`:115`) has **no fallback**. An undefined custom property makes the declaration invalid-at-computed-value-time; `stroke` is an inherited property, so it resolves to the parent `<svg>`'s value, which is unset → initial `none`. **The baseline line disappears entirely** — no console error, no build error, just a missing graticule.

So F-1's blast radius is undercounted by the import census: `npm ci` currently reconstructs `node_modules` from a lockfile with **zero** glass-ui entries (`lane-frontend.md §2`, `grep -c "glass-ui" package-lock.json` → 0), and the damage reaches components that never import it. **Extends F-1; does not contradict it.**

**Falsifier.** Any of: a `--border` / `--foreground` / `--muted-foreground` definition in `demo/styles/**` or in the demo's Tailwind theme layer; a `.text-mono-caption` / `.text-small` definition outside `node_modules/@mkbabb/glass-ui/`; a glass-ui entry appearing in `package.json` or `package-lock.json`.

---

### L-3 · MAJOR · engine-consumption misuse — a serialize→regex-reparse round trip the barrel makes unnecessary

**Provenance** `SpringTrace.vue:42–86` vs `src/animation/index.ts:52–56`, `src/animation/physics/spring/css/timing-function.ts:65–116`.

The component **already holds the numbers**. It converts them to a CSS *string* via `springLinearStops` (`useSpringLinearStops.ts:29`), then spends 37 lines (`:50–86`) regex-parsing that string back into numbers in order to draw them. The engine never left the room.

The same barrel exports the direct route on the line beside it:

```ts
// src/animation/index.ts:52-56
export { springLinearStops } from "./physics/spring";
export { springTimingFunction } from "./physics/spring";
```

`springTimingFunction(opts): Easing` returns `.fn: (t: number) => number` sampled from the **same solver, same `(response, dampingFraction)` surface, same default `maxDuration = response * 4`** — its own docblock says so verbatim (`timing-function.ts:48–52`: *"This is the JS-easing sibling of `springLinearStops`: same solver, same (response, dampingFraction) surface"*), and both call the one shared `sampleNormalizedSpring` (`linear-stops.ts:54`, `timing-function.ts:76`). A plot built from `fn(i/N)` needs **no parser at all**, has no head/tail anchor problem (L-1 evaporates: `fn(0)=0`, `fn(1)=1` are pinned at `timing-function.ts:89, 92–93`), and gets 64 samples instead of 26 for free.

**This is the anti-pattern the library census already named as a defect class.** `lane-library.md §4.3 Tier C` flags `src/animation/compile/emit/view-transition.ts:146` as *"re-parses **kf's own emitted** declaration body with a regex to recover `{prop, value}` pairs — a serialize→regex-reparse round trip inside the library."* `SpringTrace.vue:50–86` is the identical shape, one repo layer out. **`lane-library.md §4.6`'s demo blast-radius roster does not list it** — that roster enumerates demo callers of *value.js parse APIs*, and SpringTrace calls none; it hand-rolls instead. **Extension of §4.6, not a contradiction of it.**

**Secondary route, if the string form must be honoured.** The demo's own dependency graph already ships a canonical `linear()` parser: `parseTimingFunction(source): ParseResult<CssTimingFunction>` with `{ kind: "linear-function", stops: readonly CssLinearStop[] }` (`node_modules/@mkbabb/value.js/dist/subpaths/css.d.ts:252, 150–166`) — **and the demo already imports it**, at `demo/utils/reference-data/animationDescriptions.ts:76, 128`. No weight objection applies here: the barrel's light/heavy split (`src/animation/index.ts:1–26`) exists to keep value.js's parser out of a *light-only* consumer's graph, and the demo is not one — 7 demo files already import `@mkbabb/value.js/css`.

**Honest caveat on that route:** `CssLinearStop = { output: number; input: readonly [] | readonly [number] | readonly [number, number] }` (`css.d.ts:111–114`) — the parser **tokenizes but does not resolve** implicit positions (`input: []`). The fill rule would still be demo-side. Only the tokenizer is duplicated. `springTimingFunction().fn` remains the KISS answer; `parseTimingFunction` is the fallback.

**Falsifier.** A demonstration that `springTimingFunction`'s curve differs materially from `springLinearStops`' at the same preset (both docblocks and the shared `sampleNormalizedSpring` call refute this); or a requirement that the plot render the *string's* rounding artefacts (`toFixed(5)`) rather than the curve — which no comment in the file claims.

---

### L-4 · MAJOR · the component's stated reason for existing is false against the tree

**Provenance** `SpringTrace.vue:2–8, 39–41` vs `SpringScene.vue:10–11`, `StartingStyleTarget.vue:61`.

The header comment is the component's rationale, and it makes a co-visibility claim three times:

> `:2–4` — *"the linear() 26-stop PLOT (the curve drawn, **beside its string**) — the springLinearStops() output the Fira block **in the sidebar** emits, finally PLOTTED"*
> `:6–7` — *"The two readings of one curve — numeral (**sidebar**) + trace (here) — the math made beautifully visible."*
> `:39–41` — *"The same `linear(0, …)` string the copy-pasteable Fira block emits … drawn as an SVG trace **BESIDE its string**"*

The tree says the two readings **can never be on screen together**. `SpringScene.vue:10–11` forks them into mutually exclusive branches:

```vue
<SpringTarget v-if="demo.view.value === 'solver'" />
<StartingStyleTarget v-else />
```

`demo.view` is `ref<"solver" | "discrete">` (`useSpringDemo.ts:65`). `SpringTrace` renders **only** inside `SpringTarget` (`SpringTarget.vue:152, 167`) → the `solver` branch. The `linear()` string artifact block renders **only** inside `StartingStyleTarget` (`:61`, `<code class="artifact …">{{ compiledEntryCss || springCss }}</code>`) → the `discrete` branch. Exhaustive probe for a co-visible string: `grep -rn "springCss\|linearStops" demo/scenes/spring/*.vue` returns hits in exactly those two files, and `grep -rn "linear(" SpringTarget.vue SpringPhysicsFacet.vue SpringHeatmap.vue SpringScene.vue` returns only `SpringTarget.vue:148` — a comment.

And there is no sidebar: `find demo -name "SpringSidebar*"` → **empty**. (Repo-wide context, so this is scoped and not over-claimed: `SpringSidebar` is referenced in prose across **8** live demo files including `SpringScene.vue:5`. The stale-prose condition is systemic; only the co-visibility consequence is SpringTrace's own.)

This matters on the L axis because the rationale is what a future maintainer will read before deciding whether the component may be deleted, moved, or merged. It currently argues for a layout that does not exist.

**Falsifier.** Any component rendered simultaneously with `SpringTarget` that displays the `linear()` string — e.g. an addition to `SpringPhysicsFacet` (the tabs content, `SpringScene.vue:67`) or the dock. None exists at HEAD.

---

### L-5 · MINOR · plot geometry has two sources of truth across the template/script boundary

**Provenance** `SpringTrace.vue:23, 25` vs `:82–83`.

```
:82   const Y_TARGET = 20; // y px of the value=1 line
:83   const Y_ZERO = 56;   // y px of value=0
```
```
:23   <line x1="0" y1="20" x2="100" y2="20" class="plot-target-line" />
:25   <line x1="0" y1="56" x2="100" y2="56" class="plot-baseline" />
```

The same two magic numbers are declared once as script constants and once as literal SVG attributes. Changing `Y_TARGET` moves the curve and leaves the target line behind — a silent, plausible regression with no type or lint to catch it. `:y1="Y_TARGET"` / `:y2="Y_TARGET"` makes the drift impossible for the cost of four bindings.

**Falsifier.** A binding of `:23`/`:25` to the script constants (absent), or a comment establishing the literals as an intentional independent graticule (absent — `:22`, `:24` describe them as *"the y=1 target line"* and *"baseline (value 0)"*, i.e. the same quantities).

---

### L-6 · MINOR · silent-swallow error posture; the readout counts swallowed stops as plotted

**Provenance** `SpringTrace.vue:55–57`, `:11`.

```ts
const m = p.match(/^(-?[\d.]+)\s*(?:([\d.]+)%)?$/);
if (!m) return { v: 0, pct: null };   // :56
```

A stop that fails the regex becomes **indistinguishable from a legitimate `0` stop** — the spring's own start value. A malformed emission does not produce a gap, a warning, or an empty path; it bends the curve toward the baseline and looks like physics. The header then reports it as successfully rendered:

```
:11   {{ linearPlot.length }} stops plotted
```

`linearPlot.length` counts *entries*, not *parses*. A string that fails wholesale (say, `sampleCount` raised so a value serializes unexpectedly) still reads "26 stops plotted" beside a flat line. `lane-library.md §4.1` catalogues three deliberate, distinct failure postures in the library proper (A1 diagnostics-not-throw, A3/A4 throw, A12 `try{}catch{return []}`) — each *chosen*. This one is a fourth posture arrived at by default: swallow-and-misreport.

Minimum honest fix: return `null` from the mapper and either drop the point or set `linearPlot` to `[]`, so `:11` and the empty-path guard at `:90` tell the truth.

**Falsifier.** A comment establishing `{v:0, pct:null}` as a deliberate degradation contract (absent), or a proof that the regex is total over `springLinearStops`' output — which is *true today* (`toFixed(5)` never emits exponent notation) but is precisely the assumption the fallback exists to survive, and is unenforced by any test.

---

### L-7 · MINOR · the style header names a palette the project explicitly retired

**Provenance** `SpringTrace.vue:100–101` vs `demo/styles/style.css:130, 159–163`.

> `:100–101` — *"The trace wears the scene's **red** identity (the curve drawn against the paper graticule)."*

```css
/* demo/styles/style.css:130 */
--accent-kf: light-dark(oklch(0.56 0.17 295), oklch(0.74 0.13 305));
/* demo/styles/style.css:163 */
--color-progress: var(--accent-kf);
```

`.plot-trace { stroke: var(--color-progress); }` (`:122`) therefore resolves to hue **295–305°** — violet. The ruling that made it so is documented two lines above the alias (`style.css:159–161`): *"…reads `--color-progress`, which points at the accent the brand owns — **so red exits the chrome entirely**."* The comment describes the pre-ruling palette.

**Falsifier.** An `--accent-kf` or `--color-progress` override in a scope that reaches `.plot-trace` and resolves red (grep finds exactly one definition of each, both in `style.css`), or a reading of oklch hue 295–305° as red.

---

### L-8 · MINOR · the glow and the stroke reason about scale in opposite directions

**Provenance** `SpringTrace.vue:126` and `:127` — adjacent declarations in one rule.

```css
:126    vector-effect: non-scaling-stroke;
:127    filter: drop-shadow(0 0 3px color-mix(in srgb, var(--color-progress) 45%, transparent));
```

`preserveAspectRatio="none"` (`:19`) with `viewBox="0 0 100 60"` at `width: 100%; height: 4.5rem` (`:104–105`) gives a **non-uniform** scale — ≈7.7× horizontal against 1.2× vertical inside `max-w-3xl`. `vector-effect: non-scaling-stroke` is the correct, non-obvious answer to that (see S-1). But CSS `filter` lengths on an SVG element resolve in the **current user coordinate system**, so the `3px` blur is subject to the same anisotropy the line above was written to defeat — a glow stretched ≈6:1 horizontally around a stroke of uniform width. Two adjacent lines apply opposite scale models to the same path.

The internal inconsistency is **static and provable from the file**. The visual magnitude is **UNPROVEN-NEEDS-LIVE** (SS-13): a browser resolving the filter in device px rather than user units would make the glow uniform and reduce this to a stylistic note.

**Falsifier.** A rendered screenshot showing a radially symmetric glow around the trace; or spec/UA evidence that CSS shorthand-filter lengths on SVG children are resolved outside the local user space.

---

### L-9 · MINOR · no `var()` fallbacks, against the demo's own sibling idiom

**Provenance** `SpringTrace.vue:109, 115, 122, 127` vs `demo/scenes/sequence/SequencePlayhead.vue:47, 50, 62`.

Every custom-property read in this component is bare: `var(--color-progress)` (`:109, 122, 127`), `var(--border)` (`:115`). The demo's sibling scene writes the defensive form as house style:

```css
/* SequencePlayhead.vue:47 */
background: var(--ball-tone, var(--color-progress));
```

This is what turns L-2 from *degraded* into *invisible*: `stroke: var(--border)` with no fallback is the difference between a faint baseline and no baseline. `stroke: var(--border, currentColor)` costs nothing and bounds the phantom-dep failure.

**Falsifier.** A stated project rule forbidding `var()` fallbacks (none found in `demo/DESIGN.md` or `styles/style.css`'s cascade contract), or evidence that `--border` is guaranteed present at this scope independently of glass-ui (refuted by L-2's probe).

---

### L-10 · INFO · the parser is untestable by construction — and is the *third* hand-rolled `linear()` tokenizer in the repo

**Provenance** `SpringTrace.vue:50–86`; `test/physics/springLinearStops.test.ts:8–17`; `demo/scenes/spring/useSpringLinearStops.ts`.

37 lines of pure, side-effect-free, entirely-testable string arithmetic are sealed inside an SFC `computed`. `grep -rln "SpringTrace\|linearPlot" test/` → **no output**: zero coverage. Extracting `parseLinearStops(s: string): { x: number; y: number }[]` into a module beside `useSpringLinearStops.ts` (the demo's own colocation idiom, `lane-frontend.md §7.2` — 63 of 71 composables are colocated) would make **L-1 a one-line unit test**: `expect(parseLinearStops(springLinearStops({…}))[0].x).toBe(0)`.

The repo now hand-rolls this grammar three times: here (`:50–58`), in the library's own test helper (`test/physics/springLinearStops.test.ts:8–17`, `parseStops`), and — canonically and correctly — in `@mkbabb/value.js`'s `parseTimingFunction` (L-3).

**Falsifier.** A test file exercising this parse (none), or a rule against extracting logic from SFCs (contradicted by the tree's 71 colocated composables).

---

### L-11 · INFO · the two-position stop form is unparseable; latent, not live

**Provenance** `SpringTrace.vue:55` vs `node_modules/@mkbabb/value.js/dist/subpaths/css.d.ts:111–114`.

CSS `<linear-stop>` admits `<number> <percentage>{1,2}` — value.js models it exactly: `input: readonly [] | readonly [number] | readonly [number, number]`. The regex `/^(-?[\d.]+)\s*(?:([\d.]+)%)?$/` accepts at most **one** percent, so `0.5 25% 75%` falls through to the L-6 silent zero.

**Not currently reachable** — `springLinearStops` never emits the two-position form, and it is the component's sole input (`:42–45`). Filed as a bounded-contract note, explicitly **not** as a live defect. Naive `split(",")` at `:53` is likewise **correct** for this grammar (a `<linear-stop>` contains no comma) and is *not* flagged.

**Falsifier.** Trivially killed by any emitter change; equally, killed as a *defect* by the observation that the input is closed — which is why it is INFO.

---

### L-12 · INFO · the plot's unique information is `aria-hidden` with no textual mirror in its own view

**Provenance** `SpringTrace.vue:20`, `:11–14`.

`aria-hidden="true"` on the `<svg>` (`:20`) is defensible for a decorative redraw of data available as text. But the header exposes only **stop count** and **ζ** (`:11`, `:13`) — not the quantity the plot exists to show. The header comment itself (`:4–6`) names that quantity: *"the position trace crests OVER the y=1 target line (the overshoot is `y > 1`, right there in the data)"*.

Probe: `grep -rn "overshoot" SpringTarget.vue SpringPhysicsFacet.vue` returns only comments and a slider tooltip — **no overshoot numeral is rendered anywhere in the solver view**. The analytic value is trivially available (`exp(-ζπ/√(1-ζ²))`, already implemented for the heatmap per `SpringPhysicsFacet.vue:52`); adding it to `:13` beside ζ would make the aria-hidden honest.

**Falsifier.** A rendered overshoot readout co-visible with `SpringTrace` (none at HEAD), or a ruling that ζ alone is a sufficient text mirror since overshoot is derivable from it.

---

### L-13 · INFO · the imported composable's docblock names a consumer roster that no longer exists

**Provenance** `useSpringLinearStops.ts:8–14` vs the tree.

> *"`springLinearStops(` was DOUBLE-surfaced … the live-solver rail at `SpringSidebar.vue:130` and the discrete-transition view at `StartingStyleTarget.vue:95` … BOTH the rail's Monaco readout AND the discrete card's `--spring-ease` / copy-paste artifact **read this single composable**."*

The historical clause is past-tense and defensible even though `SpringSidebar.vue` is deleted. The **present-tense** clause is false: there is no rail and no Monaco readout of this string. `grep -rn "useSpringLinearStops" demo/` gives the actual roster — `StartingStyleTarget.vue:116` and `SpringTrace.vue:42`. The composable's own "ONE surface" invariant **holds**; only its census of who consumes it is stale.

Worth one line because that docblock is the first thing a reader of `SpringTrace.vue:35` follows, and it will send them to a deleted file.

**Falsifier.** A `SpringSidebar.vue` or any Monaco/Fira readout of `springLinearStops` output outside `StartingStyleTarget` (`find` → empty; `grep` → two files).

---

### L-14 · INFO · undeclared geometry contract on the props

**Provenance** `SpringTrace.vue:37`, `:82–84` vs `SpringPhysicsFacet.vue:41–44`.

`defineProps<{ response: number; dampingFraction: number }>()` (`:37`) accepts any finite numbers. The fixed geometry (`Y_TARGET = 20`, `Y_ZERO = 56`) admits values up to `56/36 = 1.5556` before the path leaves the top of the box. Analytic peak `1 + exp(-ζπ/√(1-ζ²))` crosses that at **ζ ≈ 0.1839**.

The live slider floor is **ζ = 0.2** (`SpringPhysicsFacet.vue:43`, `:min="0.2"`) → peak ≈ **1.5266** → `y ≈ 1.04` in a 0–60 box. **One viewBox unit of headroom**, and nothing but the slider's `min` enforces it. Presets bottom out far safer at ζ = 0.45 (`springPresets.ts`, "bouncy" → peak ≈ 1.205 → y ≈ 12.6).

This reads as deliberate rather than lucky — and `overflow: visible` (`:106`) is the correct belt-and-braces (see S-2). But the coupling between a slider bound in one file and a magic number in another is unexpressed, untested, and one `:min` edit from a trace that paints over the header row above it.

**Falsifier.** A prop validator, clamp, or comment binding the geometry to a ζ floor (none); or a demonstration that no reachable path (slider, preset, heatmap click at `SpringPhysicsFacet.vue:52+`, hash-share state) can drive ζ below 0.2.

---

## 3. SUPERLATIVES (L-18, the other way)

### S-1 · `vector-effect: non-scaling-stroke` under `preserveAspectRatio="none"` — the correct, non-obvious call

`:112, :117, :126` — applied to **all three** strokes, not just the trace. `preserveAspectRatio="none"` (`:19`) stretches a 100×60 viewBox to ≈768×72: a 7.7:1 anisotropy that would render a nominal `stroke-width: 2` as a 15px-wide horizontal smear and a 2.4px vertical one, varying with container width. `non-scaling-stroke` pins stroke to device space and makes the line weight width-independent. This is the right answer and it is the answer most implementations miss. Consistency across all three rules is what earns the superlative — a partial application would have produced mismatched weights between the trace and its graticule.

*Falsifier (L-18 runs both ways):* a demonstration that the SVG is only ever rendered at its natural aspect (refuted by `width: 100%` + `max-w-3xl` at `:104`, `:9`), which would make `non-scaling-stroke` inert ceremony.

### S-2 · `overflow: visible` — deliberate headroom for the phenomenon being plotted

`:106`. SVG's UA default is `overflow: hidden`; overriding it here means the overshoot crest is never clipped by the viewport even if a caller pushes ζ below the geometry's `1.5556` ceiling (L-14). The author reasoned about the *tail* of the value distribution, not just the common case. The header comment at `:80–81` shows the same reasoning applied to the layout — *"the y=1 target line at 1/3 from the top **so overshoot has room to cross above it**"* — placing `Y_TARGET` at 20/60 rather than the naive 0 or 30. Both choices are the physics driving the geometry.

*Falsifier:* evidence that `overflow: visible` on `<svg>` is ignored by target browsers, making it dead ceremony rather than a guard.

### S-3 · zero teardown surface — correct by construction, not by discipline

The entire script is two `computed`s (`:50`, `:88`) and one composable call (`:42`) that returns a third (`useSpringLinearStops.ts:28`). No `onMounted`, no listener, no `ResizeObserver`, no RAF, no timer, no manual DOM handle, no `onScopeDispose` — **because there is nothing to dispose**. Vue's scope collects all three computeds with the component.

This is the sharpest kind of leak-safety: the contrast is its own parent, `SpringTarget.vue:184–186`, which must register a frame painter and hold an `unregisterPainter` across `onMounted`/`onScopeDispose`. SpringTrace deliberately stayed on the reactive side of that seam — appropriate, since it re-renders at slider cadence, not frame cadence — and thereby has no teardown obligation at all. Extracting the plot out of `SpringTarget` (`:148–155`) was the right cut: it put the cheap reactive concern in a component with no lifecycle and left the hot painter path in the one that needs it.

*Falsifier:* any leak — none possible; the `<svg>` is fully declarative, the props are primitives, and no reference escapes the setup scope.

### S-4 · `useSpringLinearStops` is a textbook Vue 3.5 composable contract

`useSpringLinearStops.ts:24–33`:

```ts
export function useSpringLinearStops(
    response: MaybeRefOrGetter<number>,
    dampingFraction: MaybeRefOrGetter<number>,
): ComputedRef<string> {
    return computed(() => springLinearStops({
        response: toValue(response),
        dampingFraction: toValue(dampingFraction),
    }));
}
```

`MaybeRefOrGetter` + `toValue` is the canonical input contract; the return type is explicitly annotated `ComputedRef<string>` rather than inferred; and **both** call sites correctly pass *getters* rather than dereferenced values — `SpringTrace.vue:43–44` (`() => props.response`) and `StartingStyleTarget.vue:117–118` (`() => demo.response.value`). Passing `props.response` directly would have silently frozen the plot at mount; the getter keeps reactivity alive across the props boundary. That is the exact trap this idiom exists to prevent, and it is avoided at both sites.

The docblock also draws a real distinction worth keeping (`:16–18`): `springTimingFunction` is *intentionally* 6×-surfaced and explicitly **not** collapsed, because it is a different shape (typed `Easing` for engine seams) — a DRY judgement made deliberately rather than mechanically.

*Falsifier:* a call site passing a bare value (neither does).

### S-5 · Goldilocks size, exact concern seam, correct colocation

129 lines: template 30, script 64, style 33. One concern — *parse the emitted string, draw it*. The header states the seam and it is the right one (`:7–8`): *"Colocated sub-unit of SpringTarget (the natural concern seam: the plot parse + draw)."* It sits beside its parent (`SpringTarget.vue:167`), beside its composable (`./useSpringLinearStops`), and beside its scene keys — matching the demo's colocation idiom (`lane-frontend.md §7.2`). Against a scene folder whose siblings run 216–470 lines and whose `useSpringDemo.ts` is 22KB, this file resisted absorption into `SpringTarget` and did not over-fragment into three files either.

The extraction is also what makes L-1 cheap to fix: the defect is confined to one 37-line computed with a single caller.

*Falsifier:* evidence the file is too small to justify its own module — refuted by the parent's size (470 lines) and by the fact that the extracted logic is independently testable (L-10).

---

## 4. HYPOTHESES KILLED BY THE TREE (falsifiers doing their job)

Recorded so the reader can audit the audit. Neither is counted in the tally.

**K-1 — "`--color-progress` is undefined; the trace renders invisible."** Predicted from the same reasoning that proved L-2 (`stroke: var(--undefined)` → IACVT → inherited → initial `none`). **Killed:** `demo/styles/style.css:163` defines `--color-progress: var(--accent-kf)` and `:130` defines `--accent-kf` — both **demo-owned**, so the trace stroke survives even a total glass-ui absence. This is why L-2 lists `--border` and *not* `--color-progress`: the phantom-dep bite reaches the baseline and the typography, not the curve.

**K-2 — "`text-mono-caption` is an undefined utility; the caption is unstyled everywhere."** A first grep for `\.text-mono-caption` across glass-ui's minified `components.css`, `theme/bridges.css`, and `typography/semantic.css` returned nothing. **Killed:** it is a Tailwind v4 `@utility`, not a plain class — `node_modules/@mkbabb/glass-ui/dist/styles/typography/utilities.css`: `@utility text-mono-caption { font-family: var(--font-mono); font-size: var(--type-caption); letter-spacing: var(--type-tracking-caps); text-transform… }`. The class is real and correctly used (`demo/styles/font-roles.json:82` clause (b) — *"a tabular numeric readout (`tabular-nums`)"* — which `:12` satisfies exactly, `text-mono-caption … tabular-nums`). It survives into L-2 only as evidence of *where* the dependency lives, not as a dead class.

---

## 5. Fix order (dependency-respecting)

1. **L-3 first.** Replace the parse with `springTimingFunction({response, dampingFraction}).fn` sampled at N points. This **deletes L-1, L-6, L-10, L-11 outright** (no parser → no anchor bug, no swallow, no untestable block, no grammar gap) and shrinks the file by ~35 lines. If the string form is contractually required, do L-1 instead — a two-line fix: hoist `:77–78` above the loop, or special-case `i === 0` / `j === n`.
2. **L-2 / L-9** — add `var(--border, currentColor)` now (one line, bounds the silent failure); the real fix is F-1 at the package level and is not this component's to make.
3. **L-4, L-7, L-13** — prose. Cheap, and they are what a maintainer reads first.
4. **L-5** — bind `:23`/`:25` to the script constants.
5. **L-12, L-14** — render the overshoot numeral (kills L-12, documents L-14's contract in the UI itself).

Items 1–5 preserve all five superlatives; none of S-1..S-5 is touched by any fix above.

---

## Provenance note

Every claim is sourced from a read of the tree at `/Users/mkbabb/Programming/keyframes.js` (READ-ONLY) or from its `node_modules/@mkbabb/{glass-ui,value.js}` type and style surfaces. The L-1 arithmetic was reproduced offline with `node -e` by replaying `linear-stops.ts:62–70`'s emitted shape through `SpringTrace.vue:50–79` verbatim — no file was written to, executed in, or mutated in either repo. No installs, no dev servers, no browser tooling. The single write performed by this lane is this file. Livable-only claims (L-8 visual magnitude) are marked **UNPROVEN-NEEDS-LIVE** for the SS-13 visual audit.
