claude-opus-5[1m]

# CHALLENGE · `SpringTrace.vue` · axis C — CONSUMPTION

**Target:** `/Users/mkbabb/Programming/keyframes.js/demo/scenes/spring/SpringTrace.vue` (129 L)
**Axis:** how this component consumes keyframes.js (the library) and glass-ui (the design system) — subpath choice, shadow components, value.js transitive exposure, props/emits contract, sibling seams.
**Mode:** static, read-only, source-derived. No browser tooling. Two numeric probes executed in a scratchpad sandbox (pure JS reimplementations of in-tree algorithms — no product source touched, no installs).
**Date:** 2026-08-06. Corpus folded: `formation/keyframes/lane-frontend.md` (F-1, F-6, S-1..S-8), `formation/keyframes/lane-library.md` (§4.1–§4.7 parse seams, DUAL-2).

**Tally: 10 defects · 0 blockers · 5 superlatives.**

---

## 0. Headline

| # | Finding | Severity |
|---|---|---|
| **C-1** | The hand-rolled `linear()` position-fill **diverges from the library's own canonical resolver**: the first stop plots at **x = 2** and the last at **x = 98** where CSS (and `resolveLinearStops`) say 0 and 100. The `?? 0` / `?? 100` anchors are **dead code**. Numerically proven. | **MAJOR** |
| **C-2** | The parser is re-invented against **two** already-consumed seams: value.js's `parseTimingFunction` (already a demo import, at the `linear-function` branch) and kf's own `resolveEasing` emit→re-parse round-trip. A **demo-tier Tier-C regex** invisible to lane-library §4.3 and absent from its §4.6 demo-consumer list. | **MAJOR** |
| **C-3** | Library gap that *enables* C-1: kf exports the `linear()` **emitter** but neither the resolved stops, `resolveLinearStops`, nor `sampleNormalizedSpring`. Every plotting consumer must re-derive the CSS rule by hand. | MINOR |
| **C-4** | Silent-wrong parse failure (`if (!m) return { v: 0, pct: null }`) violates the engine's own stated fail-explicit law; the regex cannot express the 2-position stop form that value.js's `CssLinearStop` models. | MINOR |
| **C-5** | `text-mono-caption` carries `text-transform: uppercase`; applied to `&zeta;` it renders **Ζ** (reads as "Z"). The **sibling** using the same utility with the same glyph explicitly cancels it. | MINOR |
| **C-6** | Stale scene-identity comment — "the scene's **red** identity"; `--color-progress` was re-pointed to the violet `--accent-kf` precisely so "red exits the chrome entirely". | MINOR |
| **C-7** | The consumed composable's docblock cites a **deleted file** (`SpringSidebar.vue:130`) and asserts a call-site census that the tree contradicts. | MINOR |
| **C-8** | The component's whole raison d'être — "the curve drawn, **beside its string**" — is **architecturally impossible**: the string readout lives in the `v-else` branch and is never co-mounted with the trace. | MINOR |
| **C-9** | `aria-hidden="true"` on the component's only graphical reading, with no `role="img"`/label alternative — against the design system's own `label`-the-canvas idiom. | INFO |
| **C-10** | Re-enters the Vue render graph on the exact `(response, ζ)` axis the parent explicitly moved off it: full 24-step spring integration + regex parse + path rebuild + filtered SVG repaint per slider frame. | INFO |

Superlatives S-A..S-E in §3. Four candidate defects were **checked and killed** by the tree (§4) — recorded so a later lane does not re-raise them.

---

## 1. The import surface, exactly

```
SpringTrace.vue:33   import { computed } from "vue";
SpringTrace.vue:35   import { useSpringLinearStops } from "./useSpringLinearStops";
   └─ useSpringLinearStops.ts:1  vue { computed, toValue, ComputedRef, MaybeRefOrGetter }
   └─ useSpringLinearStops.ts:3  import { springLinearStops } from "@mkbabb/keyframes.js";
```

That is the **entire** transitive import closure: `vue`, one colocated composable, one library symbol. Zero glass-ui imports, zero value.js imports, zero deep paths.

**Subpath facts.** keyframes.js publishes exactly **two** subpaths — `.` and `./engine` (`package.json` `exports`). The composable takes the root barrel, which is the **LIGHT** surface; `./engine` is the heavy value.js-bearing half (lane-library DUAL-2). That is the correct choice and it is verified below (S-A).

**Resolution caveat (INFO, not a defect).** `vite.config.ts:39-42` self-aliases `"@mkbabb/keyframes.js"` → `path.resolve(import.meta.dirname, "src/animation/index.ts")`. So this component never exercises the published `exports` map or `dist/keyframes.js`; a broken `.` condition or a dropped re-export would not surface here. Risk only — `springLinearStops` **is** present in `dist/keyframes.d.ts` (`grep -c` → 5), so the source alias and the published barrel currently agree.

---

## 2. Defects

### C-1 · The fill loop diverges from the library's own `linear()` resolver — **MAJOR**

**Claim.** `SpringTrace.vue:59-79` mis-anchors the two implicit endpoint stops. On the exact string `springLinearStops()` emits, the first stop is plotted at **x = 2** and the last at **x = 98**, against 0 and 100. The guard at `:76-79` that is *supposed* to fix this is unreachable.

**Provenance.**

- The emitter frames the curve with two **bare** stops: `linear-stops.ts:62` `const stops: string[] = ["0"];` and `:69` `stops.push("1");` — neither carries a percent. Interior stops carry `pct = (i/(sampleCount+1))*100` for `i = 1..24` (`:63-67`). Total 26 tokens.
- `SpringTrace.vue:47-49` states the intended rule verbatim: *"Stops without an explicit % are distributed evenly (the CSS linear() rule); the FIRST/LAST implicit stops anchor 0% / 100%."*
- The loop at `:62-75` runs **first**, and for the leading run (`i = 0`, one missing stop, `lastPct` initialised to `0` at `:61`) computes
  `pts[0].pct = 0 + ((4 − 0) × 1) / 2 = 2`.
  For the trailing run (`i = 25`, `nextPct` defaulted to `100` at `:66`, `lastPct = 96`) it computes
  `pts[25].pct = 96 + ((100 − 96) × 1) / 2 = 98`.
- The anchors at `:76-79` are `pts[0].pct = pts[0].pct ?? 0` and `pts[n-1].pct = pts[n-1].pct ?? 100`. Both operands are now `2` and `98` — non-null — so `??` short-circuits. **Dead code.**

**The library's own resolver gets it right.** `src/animation/compile/easing/easing-registry.ts:57-94` `resolveLinearStops` is kf's canonical implementation of the same CSS rule, and it orders the two phases correctly:

```ts
expanded[0]!.input ??= 0;                        // :69  anchor FIRST
expanded[expanded.length - 1]!.input ??= 1;      // :70  anchor LAST
...                                              // :81-91  THEN distribute interior runs
```

**Probe (executed).** Both algorithms transcribed verbatim and run against the emitted 26-token pattern:

```
emitted stop count: 26
SpringTrace  first/last pct: 2  / 98
library      first/last pct: 0  / 100
max |delta| over all stops: 2
divergent indices: [ 0, 25 ]
first 3 SpringTrace: [ 2, 4, 8 ]   library: [ 0, 4, 8 ]
last  3 SpringTrace: [ 92, 96, 98 ] library: [ 92, 96, 100 ]
```

Only the endpoints diverge; the 24 interior stops agree exactly. Visually the trace begins 2% inside the left edge and stops 2% short of the right, against a `plot-baseline` and `plot-target-line` that both span `x1="0" … x2="100"` (`:23`, `:25`) — the graticule reaches the edges, the curve does not.

**Severity.** MAJOR on this axis, not on pixels. The magnitude is 2 viewBox units (≈2% of width); the *defect* is that a component whose stated job is "the two readings of **one** curve" (`:5-7`) plots a curve that is not the one the string encodes, and disagrees with the resolver shipping two directories away in the same repo.

**Falsifier.** Run the `:50-79` computed on the literal `springLinearStops({response: 0.5, dampingFraction: 0.45})` output and read `linearPlot[0].x` and `linearPlot.at(-1).x`. If they are `0` and `100`, this claim is dead. The probe says 2 and 98. It would also die if `springLinearStops` emitted `0 0%` / `1 100%` — `linear-stops.ts:62,69` shows it does not.

---

### C-2 · The parser is re-invented against two already-consumed seams — **MAJOR**

**Claim.** `SpringTrace.vue:50-58` hand-rolls a `linear()` tokenizer (strip wrapper, `split(",")`, per-token regex) that two in-tree surfaces already provide — one of which is **already an import in this same demo tree**.

**Seam 1 — value.js `parseTimingFunction`, already a demo dependency.**

- `/Users/mkbabb/Programming/value.js/src/css/grammar.ts:466-478` parses `linear(...)` into `{ kind: "linear-function", stops: CssLinearStop[] }`, with positions normalised to 0..1 and the 2-position form typed (`src/css/types.ts:28-31`).
- The demo **already imports it**: `demo/utils/reference-data/animationDescriptions.ts:128` `import { parseTimingFunction, type ParseIssue } from "@mkbabb/value.js/css";` and `:76-85` explicitly branches on `parsed.value.kind === "linear-function"`.
- `@mkbabb/value.js` is a **declared, locked** dependency (`keyframes.js/package.json` `dependencies` → `"@mkbabb/value.js": "4.0.0"`; lockfile line 611 per lane-frontend §2) — unlike glass-ui, which is the phantom **F-1**. So this seam costs nothing in dependency risk.

**Seam 2 — kf's own emit→re-parse round-trip.** `src/animation/easing.ts:32-36` documents `linear(...)` support in `CSS_FUNCTION_EASING` with this exact use case as its rationale:

> *"including it lets the engine's OWN spring `linear()` emission **round-trip** (emit → re-parse preserves the curve, not collapse to the bare `linear` keyword)"*

and `resolveEasing` is publicly exported (`src/animation/index.ts:151`; present in `dist/keyframes.d.ts`) — `resolveEasing(css)` → `resolveTimingFunction` (`easing-registry.ts:124-136`) → `parseTimingFunction` → `linearEasing(resolveLinearStops(stops))` → a `(t) => number` callable of exactly this curve. **SpringTrace is the canonical consumer of a round-trip the library built for it, and does not use it.**

**Census position.** lane-library §4.3 inventories kf's ad-hoc CSS-ish regexes (6 sites, "all candidates for deletion") but is scoped to `src/`; §4.6 lists the demo's parse consumers (`useSquareTumble.ts:22`, `useSquareDemo.ts:82`, `keyframeSelector.ts:15`, `animationDescriptions.ts:76`, `KeyframesEditor.vue:186`) — **SpringTrace.vue:52,55 appears in neither.** I contradict the completeness of §4.6 explicitly: it enumerates demo sites that *call value.js*, and therefore structurally cannot see a demo site that **avoids** value.js by hand-rolling the same grammar. Recommend §4.6 gain a companion row-set: *demo-tier ad-hoc CSS regexes*, seeded with `SpringTrace.vue:52,55` and `demo/scenes/amiga/utils.ts:15` (`/^var\(\s*(--[\w-]+)\s*(?:,\s*([^)]+))?\)$/`).

**Honest counterweight (do not over-read this finding).** The parse splits into two halves and only one is fully replaceable:

| half | replaceable? | by what |
|---|---|---|
| tokenize `linear(…)` → `{output, input[]}` | **yes, today** | `parseTimingFunction` (`@mkbabb/value.js/css`), already imported in-tree |
| resolve implicit positions | **no public seam** | `resolveLinearStops` is module-private — see C-3 |

And `springTimingFunction(...).fn` is *not* a drop-in substitute for the plot: it samples at 64 over `maxDuration/64` (`timing-function.ts:68,81`) while `springLinearStops` samples 24 over `maxDuration/25` (`linear-stops.ts:47,59`). The two describe one analytic curve at **different discretisations**, so plotting `.fn` would not be "the 26 stops plotted". The dogfood intent at `:2-8` is legitimate; the *implementation* of the parse half is not.

**Falsifier.** Show that `parseTimingFunction` is not exported from `@mkbabb/value.js/css`, or not already resolvable in the demo's graph. `value.js/package.json` exports `./css`; `animationDescriptions.ts:128` imports from it. Both disproven.

---

### C-3 · Library gap: kf exports the emitter, never the resolved stops — MINOR

**Claim.** keyframes.js gives a consumer that wants to **draw** its own `linear()` emission no seam but the string.

**Provenance.** `dist/keyframes.d.ts` contains `springLinearStops`, `springTimingFunction`, `resolveEasing`; `grep -c "sampleNormalizedSpring\|resolveLinearStops" dist/keyframes.d.ts` → **0**. Both are module-private (`src/animation/physics/spring/solver/sample.ts:47`, `src/animation/compile/easing/easing-registry.ts:57`), and neither appears in `src/animation/index.ts` / `physics/index.ts` / `physics/spring/index.ts`.

`sampleNormalizedSpring` returns exactly the `number[]` this plot wants (`sample.ts:47-66`) and is already the shared setup both serializers drive (`sample.ts:40-45`). A public `springLinearStopsPoints(opts): {input: number; output: number}[]` — or simply exporting `resolveLinearStops` — would have made C-1 unwritable.

**Severity.** MINOR, because it is a *missing convenience*, not a break — but it is the proximate cause of C-1 and it is the reusable finding: any downstream consumer plotting kf's `linear()` output re-derives the CSS rule by hand, unassisted and untested.

**Falsifier.** Find either symbol in `src/animation/index.ts`, `src/animation/public.ts`, or `dist/keyframes.d.ts`. Greps above return zero.

---

### C-4 · Silent-wrong on parse failure, against the engine's own fail-explicit law — MINOR

**Claim.** `SpringTrace.vue:56` `if (!m) return { v: 0, pct: null };` converts an unparseable token into a **real plotted vertex at value 0**, and `:11` then counts it in the user-facing "N stops plotted".

**Reachability.** The regex `^(-?[\d.]+)\s*(?:([\d.]+)%)?$` (`:55`) admits at most one percent. CSS `linear()` permits two (`linear(0, 0.5 20% 60%, 1)`), and value.js models it — `CssLinearStop.input: readonly [] | readonly [number] | readonly [number, number]` (`value.js/src/css/types.ts:28-31`), expanded to two coincident stops by `resolveLinearStops` (`easing-registry.ts:60-67`). Feed that string: `"0.5 20% 60%"` fails `$`, yields `{v: 0, pct: null}`, and the fill loop interpolates a position for it — a spurious vertex dropped to the baseline, silently, mid-curve.

`springLinearStops` never emits the 2-position form, so **there is no live break today**. The defect is (a) the comment at `:47-49` claims "the CSS `linear()` rule" while implementing a strict subset, and (b) the failure posture. The library states the opposite law for exactly this seam:

> `src/animation/easing.ts:13-16` — *"a dev-only warning coupled to the bundler's console-drop, and a silent-permanent-identity degradation on an unresolvable name — the fail-explicit violation"*

kf deleted that pattern from its own easing resolution; the demo re-introduced it in its plot. lane-library §7.5 already names "failure-posture inconsistency on the parse seam" as cross-cutting — this is its demo-tier instance.

**Falsifier.** Feed `linear(0, 0.5 20% 60%, 1)` to `:50` and observe whether a vertex lands at `y = 56` (value 0) between the two real stops. If the regex matched, or the component threw / rendered empty, the claim dies.

---

### C-5 · `text-mono-caption` uppercases ζ into Ζ; the sibling cancels it and this one does not — MINOR

**Claim.** `SpringTrace.vue:12-14` renders the damping ratio as `&zeta;` (U+03B6, ζ) inside `class="text-mono-caption tabular-nums"`. glass-ui's utility declares:

```
node_modules/@mkbabb/glass-ui/dist/styles/typography/utilities.css:1
@utility text-mono-caption { font-family: var(--font-mono); font-size: var(--type-caption);
                             letter-spacing: var(--type-tracking-caps); text-transform: uppercase; }
```

`text-transform: uppercase` maps U+03B6 → **U+0396 (Ζ)**, which is glyphically indistinguishable from Latin "Z". The physics convention is lowercase; the tooltip in the control that drives it says "damping (ζ)" (`SpringPhysicsFacet.vue:39`).

**The control in-tree.** The sibling component uses the *same utility* with the *same glyph* and explicitly neutralises it:

```
SpringTarget.vue:120-121   <span class="derby-lane-tag text-mono-caption tabular-nums">
                               {{ lane.name }} · ζ{{ lane.zeta.toFixed(2) }}
SpringTarget.vue:448-455   .derby-lane-tag { … text-transform: none; }
```

`grep -rn "text-transform" demo/scenes/spring/ demo/styles/` returns **exactly one hit** across the whole spring scene and the demo stylesheet root: `SpringTarget.vue:454`. So the parent knew; the colocated child did not inherit the knowledge.

**Severity.** MINOR — the cascade is proven statically; the rendered pixel is UNPROVEN-NEEDS-LIVE and belongs in the SS-13 visual audit. Note the mono-contract file (`demo/styles/font-roles.json:82`) blesses `text-mono-caption` for "a tabular numeric readout (`tabular-nums`)" — the *utility* choice is correct; only the un-cancelled `uppercase` on a case-significant glyph is the defect.

**Falsifier.** A `text-transform` override reaching `SpringTrace.vue:12` from the demo cascade, glass-ui's reset, or a scoped rule. The grep above found none; SpringTrace's own `<style scoped>` (`:97-128`) declares no text rules at all.

---

### C-6 · Stale scene-identity comment: "red" — MINOR

**Claim.** `SpringTrace.vue:100-101`: *"The trace wears the scene's **red** identity (the curve drawn against the paper graticule)."* It does not.

**Provenance.** `demo/styles/style.css:155-163` re-points the token and says so in the same breath:

> *"Every motion surface … reads `--color-progress`, which points at the accent the brand owns — **so red exits the chrome entirely**."*
> `--color-progress: var(--accent-kf);`

and `demo/styles/style.css:130` `--accent-kf: light-dark(oklch(0.56 0.17 295), oklch(0.74 0.13 305))` — hue 295/305, **violet**. The trace stroke (`:122`) and its target line (`:109`) and its glow (`:127`) all read `--color-progress`.

**Falsifier.** Resolve `--color-progress` in the spring scene and find a red hue. It resolves through `--accent-kf` to oklch hue 295/305.

---

### C-7 · The consumed composable's docblock cites a deleted file — MINOR

**Claim.** `useSpringLinearStops.ts:8-14` is the contract SpringTrace consumes, and its census is false:

> *"`springLinearStops(` was DOUBLE-surfaced in `demo/spring/` (WV-W5-HIGH-1: exactly 2 call-sites — the live-solver rail at **`SpringSidebar.vue:130`** and the discrete-transition view at `StartingStyleTarget.vue:95`; **`SpringTarget` did NOT call it**)."*

**Provenance.** `find demo -name "SpringSidebar*"` → **no results**; the file does not exist anywhere in the demo tree. The live call sites are `SpringTrace.vue:42` and `StartingStyleTarget.vue:116` (`grep -rn "useSpringLinearStops" demo`). And `SpringTrace` is a colocated **child of `SpringTarget`** (`SpringTarget.vue:152-155,167`) — so the parenthetical "SpringTarget did NOT call it" is true only by the narrowest reading while the subtree it names is now the primary consumer.

**Falsifier.** Locate `SpringSidebar.vue` at any path, or a third live call site. Neither exists.

---

### C-8 · "Beside its string" is architecturally impossible — MINOR

**Claim.** The component's entire premise is stated four times in its own header:

> `:2-8` — *"the linear() 26-stop PLOT (the curve drawn, **beside its string**) … The two readings of one curve — numeral (sidebar) + trace (here)"*
> `:39-41` — *"drawn as an SVG trace **BESIDE its string**"*

The string is never on screen with the trace.

**Provenance.** The `linear()` string is rendered at exactly one place in the spring scene:

```
StartingStyleTarget.vue:61  <code class="artifact …">{{ compiledEntryCss || springCss }}</code>
```

and the scene mounts the two branches **mutually exclusively**:

```
SpringScene.vue:10   <SpringTarget v-if="demo.view.value === 'solver'" />
SpringScene.vue:11   <StartingStyleTarget v-else />
```

`SpringTrace` is a child of `SpringTarget` (`SpringTarget.vue:152`). So trace and string live on opposite sides of a `v-if`/`v-else` and can never be co-mounted. Even in the `v-else` branch the `<code>` shows `compiledEntryCss || springCss` — the compiled entry preferentially, not the raw stops.

**Consequence on this axis.** The sibling seam the component was designed around no longer exists; what remains is an unlabelled curve with a stop count. It also removes the only textual reading that would have mitigated C-9.

**Falsifier.** Find a `linear()` string readout inside the `SpringTarget` subtree, or a scene state where both branches mount. `grep -n "linear(\|springCss\|Fira\|Monaco\|CodeBlock\|copyable" SpringTarget.vue SpringPhysicsFacet.vue` returns only the comment at `SpringTarget.vue:148`.

---

### C-9 · `aria-hidden` on the only graphical reading, against the DS idiom — INFO

**Claim.** `SpringTrace.vue:20` `aria-hidden="true"` removes the plot from the accessibility tree, and the component ships no `role="img"` + `aria-label`, no `<title>`/`<desc>`, and no textual shape description. What survives is `:11` — "linear() — 26 stops plotted" — a count, not a curve; and per C-8 the numeric string that was meant to be the alternative reading is in the other branch.

**Design-system contrast.** glass-ui's own curve canvas takes a label rather than hiding itself: `dist/components/easing/EasingPicker.vue.d.ts` — `label?: string;` documented as *"A11y label for the canvas."* The DS idiom for "an SVG that is the data" is to name it.

**Severity.** INFO — `aria-hidden` on a decorative graticule is defensible, and the ζ readout at `:12-14` is announced. Marked **UNPROVEN-NEEDS-LIVE**: an SR pass in the SS-13 visual audit settles whether the surrounding view supplies an equivalent.

**Falsifier.** A textual equivalent of the curve inside the `SpringTarget` subtree. C-8's grep found none.

---

### C-10 · Re-enters the render graph on the axis the parent left it for — INFO

**Claim.** Every `(response, ζ)` change drives, inside Vue's reactive graph: a fresh 24-step `SpringProgress` construct/step/dispose (`sample.ts:50-65` via `linear-stops.ts:54`), a 26-token `split`+`regex` parse and fill (`SpringTrace.vue:50-86`), a 26-vertex path-string rebuild (`:88-94`), and a repaint of a `filter: drop-shadow(...)`-ed path (`:127`).

The parent states the opposing law in its own comments:

```
SpringTarget.vue:72-76  "the spring painters: DIRECT non-reactive `style` writes …
                         The hot positional path leaves the Vue render graph (the former
                         17-refs/frame reactive storm is gone …)"
```

The driver is pointer-rate, not rAF: `SpringPhysicsFacet.vue:27-46` binds two `LabeledSlider`s straight to `demo.response.value` / `demo.dampingFraction.value` via `@update:model-value`, and `SpringHeatmap` cell clicks write the same refs (`SpringPhysicsFacet.vue:166-171`). A slider drag is a ~60–120 Hz write stream into this chain.

**Severity.** INFO, deliberately low. The work is small in absolute terms and only runs during interaction — the trace is *not* animated by the spring. Recorded because the axis is integration seams, and this is a stated-law asymmetry between a parent and its colocated child, not a measured regression. **UNPROVEN-NEEDS-LIVE** for any frame-cost claim.

**Falsifier.** A profile showing the chain is memoised, throttled, or below noise during a drag; or evidence that `response`/`dampingFraction` are committed only on `change`, not `input`. `SpringPhysicsFacet.vue:35,45` write on every `update:model-value`.

---

## 3. Superlatives (L-18 runs both ways)

### S-A · The light/heavy boundary is honoured, and R1 is provably unreachable — **strong**

`springLinearStops` sits on the LIGHT static barrel (`src/animation/index.ts:52`) and its whole dependency chain is value.js-free by construction: `linear-stops.ts` → `sample.ts` → `SpringProgress`, with `sample.ts:16` asserting *"value.js-free (LIGHT) — plain Math."* SpringTrace never touches `loadAnimationEngine()`, never imports `@kf-engine`, never reaches `./engine`.

**Therefore the R1 crash class (`parseCssColor("oklch()")`) is unreachable from this component** — no value.js color path exists in its closure. The contrast is in-tree and one directory over: `demo/scenes/square/useSquareTumble.ts:2` imports `parseCssColor` from `@mkbabb/value.js/css` and *is* on that surface (lane-library §4.6, "the known R1 crash surface"). SpringTrace's CSS does read `--accent-kf`, which resolves to `light-dark(oklch(…), oklch(…))` (`style.css:130`) — but it consumes it through `var()`/`color-mix()` in the browser's own cascade, never through a JS parse.

*Falsifier:* any value.js import, direct or transitive, in the closure `{SpringTrace.vue, useSpringLinearStops.ts, animation/index.ts→physics/spring/css/linear-stops.ts→solver/sample.ts→progress.ts}`. None.

### S-B · Zero shadow components, zero hardcoded literals — and it is genuinely *not* an S-1..S-8 case

Every paint reads a design-system token and every text role is a real glass-ui `@utility`:

| site | token / utility | defined at |
|---|---|---|
| `:109`, `:122`, `:127` | `--color-progress` | `demo/styles/style.css:163` → `--accent-kf` `:130` |
| `:115` | `--border` | glass-ui `dist/styles/tokens/color-radius.css:1` |
| `:11`, `:126` (`text-small`) | `@utility text-small` | glass-ui `dist/styles/typography/semantic.css:1` |
| `:12` (`text-mono-caption`) | `@utility text-mono-caption` | glass-ui `dist/styles/typography/utilities.css:1` |

No hex, no `rgba()`, no local `ui/` copy, no `reka-ui` import — consistent with lane-frontend **F-6** ("the glass-ui boundary is otherwise clean").

And I checked the shadow-component hypothesis seriously before rejecting it. glass-ui's **`/axes`** is *not* chart axes — it is the design-axis vocabulary (`SURFACES`, `SIZES`, `TONES`, `ORIENTATIONS`; `dist/components/_shared/axes.d.ts`). glass-ui's **`/easing`** ships `EasingPicker` / `EasingConfigurator`, a **bezier/steps authoring editor** whose model is `BezierPoints` + `JumpTerm` with `bezierPathD` / `stepPathD` outputs (`dist/components/easing/composables/useEasingPicker.d.ts`) — it has no input for a `linear()` stop array and cannot render a spring trace. Of the 52 glass-ui subpaths the demo does not reach (lane-frontend §3.1), **none is a curve-plot primitive**. This SVG is justified bespoke, in the S-8 sense.

*Falsifier:* a glass-ui subpath exposing a polyline/sparkline/curve-plot component that accepts stops or points. Enumerated all 73 exports; none does.

### S-C · The viewBox is numerically calibrated to the exact slider domain

`Y_TARGET = 20` / `Y_ZERO = 56` (`:82-83`) is not arbitrary. Probe: the sampled overshoot of the normalised spring depends on ζ **alone** (response cancels — ω₀ = 2π/response at `progress.ts:157`, and `dt = 4·response/25` at `linear-stops.ts:59`, so ω₀·tᵢ = 2π·(4/25)·i). Over the slider domain ζ ∈ [0.2, 1.5] (`SpringPhysicsFacet.vue:41-42`):

```
max SAMPLED position: 1.5169  at ζ = 0.200   → plotted y = 1.393
viewBox top (y = 0) corresponds to value      = 1.5556
```

The worst case in the reachable domain lands **1.39 units below the top edge** and stays inside the box. `overflow: visible` (`:106`) is the deliberate belt-and-braces for anything beyond. And `vector-effect: non-scaling-stroke` is applied to **all three** stroked elements (`:112`, `:117`, `:126`), correctly neutralising `preserveAspectRatio="none"` (`:19`) so the 100×60 → 100%×4.5rem non-uniform scale does not smear stroke widths. This is careful work.

*Falsifier (and the standing risk):* headroom is only **2.6%** in value, and the coupling between `SpringPhysicsFacet.vue:41`'s `:min="0.2"` and `SpringTrace.vue:82-83`'s literals is undeclared in both files. Lower the ζ floor to 0.15 and the peak leaves the box — caught silently by `overflow: visible` rather than by any check. Worth a pinned comment.

### S-D · A pure prop-driven leaf, with a domain that is actually safe

`:37` `defineProps<{ response: number; dampingFraction: number }>()` — no injection, no context coupling, no emits. Its siblings all `inject(SPRING_DEMO_KEY)!` (`SpringTarget.vue:50`, `StartingStyleTarget.vue`), and the parent prop-drills two scalars (`SpringTarget.vue:152-155`). For a pure render leaf that is the better contract: independently testable, no hidden provider requirement, no non-null assertion.

The absent runtime guard is a non-issue in fact, not just in hope: both props are slider-bounded strictly positive — `response ∈ [0.1, 1.2]`, `ζ ∈ [0.2, 1.5]` (`SpringPhysicsFacet.vue:32-33, 41-42`) — and the only other writer is the preset/heatmap path (`SpringPhysicsFacet.vue:166-171` off `springPresets.ts`). So `response = 0` (which would make `maxDuration = 0`, `dt = 0`, and flatten the emitter) is unreachable.

*Falsifier:* a writer to `demo.response` outside the slider/preset paths admitting ≤ 0. `grep -n "demo.response.value ="` across the scene finds only `SpringPhysicsFacet.vue:35` and `:170`.

### S-E · The composable's "ONE surface" fold is honest — a DRY challenge here would be a false defect

`useSpringLinearStops` has two live call sites (`SpringTrace.vue:42`, `StartingStyleTarget.vue:116`), each constructing an **independent** `computed`. That looks like duplicated spring integration on every `(response, ζ)` change. It is not: `SpringScene.vue:10-11` mounts `SpringTarget` (which owns SpringTrace) and `StartingStyleTarget` under `v-if`/`v-else`. **They are never simultaneously alive**, so at most one computed exists at any time and the emitter runs once per change. The docblock's "the artifact emission folds 2→1" claim (`:11-15`) survives, even though its call-site census does not (C-7).

Recorded so the next lane does not raise the phantom.

---

## 4. Checked and killed — do not re-raise

| hypothesis | why it dies |
|---|---|
| `stroke: var(--border)` is undefined → invisible baseline | `--border: var(--neutral-4)` is defined in glass-ui `dist/styles/tokens/color-radius.css:1` (`:root`), imported via `demo/styles/style.css:3` `@import "@mkbabb/glass-ui/styles"`. |
| `text-small` / `text-mono-caption` are invented demo classes | Both are real glass-ui `@utility` declarations (`typography/semantic.css:1`, `typography/utilities.css:1`). |
| duplicate `springLinearStops` computation across two call sites | Mutually exclusive by `v-if`/`v-else` — see S-E. |
| `springTimingFunction(...).fn` is the obvious drop-in fix for C-1/C-2 | Different discretisation (64 samples over `maxDuration/64` vs 24 over `maxDuration/25`; `timing-function.ts:68,81` vs `linear-stops.ts:47,59`). Plotting `.fn` would not be "the 26 stops plotted". |
| unguarded `response` prop admits a divide-by-zero in the emitter | Slider floor `:min="0.1"` (`SpringPhysicsFacet.vue:32`) — see S-D. |
| glass-ui `/axes` or `/easing` should own this plot (a 9th shadow component) | `/axes` is the design-axis vocabulary; `/easing` is a bezier/steps authoring editor with no stops input — see S-B. |

---

## 5. Remediation order (smallest cut first)

1. **C-1** — move the two anchors above the fill loop, exactly as `resolveLinearStops` does (`easing-registry.ts:69-70` before `:81-91`). Two lines, no new dependency, kills the divergence outright.
2. **C-5 / C-6 / C-7** — one-line `text-transform: none` mirroring `SpringTarget.vue:454`; correct the two stale comments. Zero risk.
3. **C-2 + C-4** — replace `:52-58` with `parseTimingFunction` from `@mkbabb/value.js/css` (already a demo import at `animationDescriptions.ts:128`) and fail explicitly on `!parsed.ok`. The resolve half stays local **until C-3 lands**.
4. **C-3** — the library-side ask, and the one worth landing in the parser wave: export `resolveLinearStops` (or a `springLinearStopsPoints()` returning resolved `{input, output}[]`) from `src/animation/index.ts`. Then step 3 becomes a pure delete and C-1 becomes structurally unwritable for every future consumer. This is the row lane-library §4.3/§4.6 should carry.
5. **C-8** — a scene-composition question, not a component fix: either re-home the `linear()` string into the `SpringTarget` subtree, or retire the "beside its string" premise from the header. Owner call.
6. **C-9 / C-10** — defer to the SS-13 visual/live audit.
