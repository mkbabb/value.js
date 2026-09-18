# CHALLENGE-L (round 3) — library structure · `GradientEasingEditor.vue`

## Model receipt

I observe myself to be **Opus 5** (`claude-opus-5[1m]`, 1M-context variant) — the tier this seat was
explicitly spawned with. Declared, not inherited.

- **Axis:** library structure — module boundaries, ownership, dependency direction, public surface.
- **Subject:** `demo/workbenches/gradient/GradientVisualizer/GradientEasingEditor.vue` (295 lines).
- **Repo:** `/Users/mkbabb/Programming/value.js`, branch `tranche-u`, HEAD `c654824e`.
- **Verdict: DEFECTIVE.** 1 BLOCKER, 4 MAJOR, 3 MINOR, 2 INFO — counting only what is **new or
  corrected** against r1/r2.

## Why this file is `-r3`

`challenge-L-library.md` (r1, 32 KB, 2026-07-27 13:47) and `challenge-L-library-r2.md` (38 KB,
18:08) already exist in this directory. My instruction names the r1 path. Overwriting a completed
audit artifact destroys evidence, and the r2 seat set the precedent for exactly this situation. I
read both in full before writing. This file carries **only** what they missed or got wrong; I do
not restate their correct findings, and I say so where I merely corroborate.

**New here, found by neither round:** L-1 (BLOCKER), L-2, L-3, L-5, L-8, L-9.
**Corrected here:** r1's headline BLOCKER — right conclusion, wrong evidence (§ *Corrections*).
**Confirmed, not restated:** r2's L-r2-2 (domain type = widget payload), L-r2-4 (`:deep` patching),
L-r2-5/12 (name duplication + casts), L-r2-7 (dead barrels), L-r2-9 (root barrel), L-r2-10 (three
props), L-r2-11 (type cycle), L-r2-13 (per-instance variant override). All independently
re-verified by me and all still true at `c654824e`.

---

## 0. The negative result, stated first

The seat's premise is that this component reaches across a boundary it should not. **On the axis
where that would be most damning — the value.js public surface — it does not.** Every import in the
transitive tree, traced to its home:

| specifier | reached from | published? |
|---|---|---|
| `@mkbabb/value.js/easing` | `easing/easingCatalogue.ts:22,27` | YES — `package.json#exports["./easing"]` |
| `@mkbabb/value.js/css` | `composables/useGradientCSS.ts:25,26` | YES — `exports["./css"]` |
| `@mkbabb/value.js/color` | `composables/useGradientCSS.ts:12,13` | YES — `exports["./color"]` |
| `@mkbabb/glass-ui/easing` | subject `:30`; `EasingAuthoringStage.vue:29,30` | YES |
| `@mkbabb/glass-ui/chip`, `/fading-scroll` | `EasingSpecimenStrip.vue:13,14` | YES |
| `@mkbabb/glass-ui` (root) | subject `:29` | YES — but see r2's L-r2-9 |

Zero `@src/*`, zero `dist/` deep paths, zero cross-package internals. Every specifier a real
external consumer could write verbatim. The **T.W1 demo-dogfood keystone HOLDS for this component.**
I tried to falsify it and could not.

Dependency *direction* is likewise sound. The `workbenches/* → color-session/*` edges are uniform
across all four workbenches — feature → shared domain, downward:

```
$ grep -rn "color-session/" demo/workbenches/ | wc -l
28
```
`useSpecimenRows.ts:13`'s four-level `../../../../color-session/useContrastSafeColor` is a depth
smell, not a direction violation.

**So every defect below is about ownership and mint, not reach.** That is the sharper disease: the
component imports correctly from a library that does not publish what it needs, so the missing
thing gets re-minted in `demo/` — and one of those re-mints is silently wrong.

---

## L-1 — BLOCKER · Six published presets are unreachable; selecting one makes the component call it `custom`

**Neither r1 nor r2 found this.** (`grep -n "quart\|quint\|FAMILY_ORDER" challenge-L-library.md
challenge-L-library-r2.md` → no matches in either.)

`easingCatalogue.ts:174` hardcodes a family order and then uses it as a **filter**, not a sort:

```ts
const FAMILY_ORDER = ["css", "sine", "quad", "cubic", "expo", "circ", "back", "steps"];
…
return FAMILY_ORDER.filter((f) => byFamily.has(f)).map((family) => ({ … }));   // :191
```

value.js publishes **ten** bezier families. `FAMILY_ORDER` names eight. `quart` and `quint` are
absent, so `buildFamilies()` drops them — silently, no diagnostic, no type error.

**Reproduction** (`familyLabelFor` + the filter transcribed verbatim from `easingCatalogue.ts`, run
against this repo's own `dist/subpaths/easing.js`):

```
$ node -e "…transcribed buildFamilies()…"
all families: css, cubic, sine, quad, quart, quint, expo, circ, back
FAMILY_ORDER kept: css, sine, quad, cubic, expo, circ, back
DROPPED families: quart, quint
dropped presets: ease-in-quart ease-out-quart ease-in-out-quart ease-in-quint ease-out-quint ease-in-out-quint
bezier tiles rendered: 24 + 3 steps = 27
bezier presets published: 30 => unreachable: 6
```

**Live confirmation.** Playwright against `http://localhost:9000/#/gradient`:

```
document.querySelectorAll('[data-specimen]').length  →  27
Object.keys(bezierPresets).length                    →  30
```
27 measured in the DOM; 27 computed. The arithmetic is closed.

**The second-order failure — the component lies about the curve's name.** `EasingPicker`, which
this component mounts at `EasingAuthoringStage.vue:76`, renders its own preset `Select` over
`presetNames = Object.keys(bezierPresets)` — all **thirty** (`glass-ui/dist/easing.js`:
`"Easing preset"`, `placeholder: "Pick a curve"`, two `presetNames` references). So the user *can*
author `ease-out-quart`. Then:

- `specimenNameFor()` (`easingCatalogue.ts:228`) → `tileIdFor()` (`:219`)
- `tileIdFor` searches `SPECIMEN_TILES` — the **filtered** list — misses
- falls through `isStepsInterval` → `null`
- head prints **`custom`** for a first-class named CSS preset.

**Mechanism.** A hand-maintained ordering array doing partition duty: a second, drifting mint of a
partition the library already implies. The preset keys *are* structured (`ease-(in|out|in-out)-
<family>`) and `familyLabelFor` already parses that structure at `:168` — the order array then
discards what the parse found.

**Cure — rank, never filter:**

```ts
const RANK = new Map(
    ["css","sine","quad","cubic","quart","quint","expo","circ","back","steps"].map((f, i) => [f, i]),
);
return [...byFamily.keys()]
    .sort((a, b) => (RANK.get(a) ?? 99) - (RANK.get(b) ?? 99) || a.localeCompare(b))
    .map((family) => ({ family, tiles: byFamily.get(family)! }));
```
Unknown families sort last and **still render** — a new value.js preset can never again go
invisible. The gestalt cure is upstream: `/easing` publishes `bezierPresetFamilies` so no consumer
re-derives the partition at all, and this file's 40 lines of family plumbing delete.

---

## L-2 — MAJOR · The CSS-AST → callable bridge is spec-work living in `demo/`

r1's L-3 and r2's L-r2-6 both note the *serialize* gap. Neither notes that the **parse→callable**
gap is worse, or that the demo carries a W3C algorithm to close it.

`useGradientCSS.ts:64-133` is ~70 lines of pure library logic — no Vue, no gradient, no demo:

- **`:79-104 linearStops()`** — the CSS Easing Functions L2 algorithm for `linear()`'s omitted and
  doubled input positions: clamp to monotone, then linearly interpolate across each run of missing
  values. A **spec algorithm**, hand-transcribed into a demo file.
- `:106-117 timingFunctionValue()` — the four-arm dispatch from `CssTimingFunction` to the matching
  `/easing` constructor.
- `:69 resolvedEasingCache` — an **unbounded** module-scope `Map<string, EasingFunction>`, keyed by
  arbitrary user-typed CSS from the gradient code editor.

value.js publishes `parseTimingFunction` on `/css` (→ AST) and `CubicBezier`/`steppedEase`/
`linearEasing`/`easing` on `/easing`. **It publishes nothing that joins them.** No consumer of the
AST exists anywhere inside `src/`:

```
$ grep -rn "CssTimingFunction" src/
src/css/stylesheet.ts:23,138 · src/css/index.ts:12 · src/css/grammar.ts:26,436
src/css/types.ts:32,48,73 · src/subpaths/css.ts:12
```
Every hit is a declaration or a re-export. The only code in the constellation that turns the AST
into a function is this demo file.

**Why structural, not convenient:** every external consumer wanting "CSS timing string →
`(t)=>number`" — the single most obvious thing to want from a library shipping both halves — must
re-derive `linearStops` from the spec. glass-ui hit the wall and retreated: it calls
`parseTimingFunction` only for a boolean `reparseOk` (`dist/easing.js`: `let e = M(u.value); if
(!e.ok) return !1; …`), never to obtain a function. Two independent consumers, two workarounds, one
missing export.

**Cure.** `/easing` gains the join; the memo becomes the library's (bounded, or absent):

```ts
export function timingFunction(source: string): Result<EasingFunction, EasingIssue | ParseIssue>;
export function fromTimingFunction(ast: CssTimingFunction): Result<EasingFunction, EasingIssue>;
```
`useGradientCSS.ts:64-133` collapses to a re-export, and `easingFnOf`'s
`Pick<…,"css"> & Partial<Pick<…,"fn">>` contortion (`:120-122`) disappears with r2's L-r2-2.

---

## L-3 — MAJOR · Two selection surfaces over one catalogue; the stated division is prose, not structure

The component's doc comment (`:7-12`) states the architecture — *"the strip selects, the picker
authors"*, the kf BG-8 division. The code does not implement it.

`EasingPicker`'s prop surface (`EasingPicker.vue.d.ts:2-18`) is
`mode | preset | steps | term | readout | playback | label`. The seat correctly switches off the two
surfaces it does not want, because props exist for them:

```html
<EasingPicker :model-value="value" :readout="false" :playback="false" … />   <!-- :76-82 -->
```
**There is no prop for the preset Select.** glass-ui renders it unconditionally over all 30
`presetNames`. The seat's `grid-template-columns: 1fr` override (`EasingAuthoringStage.vue:88-90`)
only *restacks* that chrome below the canvas — it does not remove it, and nothing else in the seat's
CSS hides it.

So opening the tune disclosure puts a 27-tile specimen strip and a 30-item preset dropdown over the
**same catalogue** in the same ~430 px column — and per **L-1** they disagree about six entries.

**Cure.** Choose one owner. Either glass-ui gains `:presets="false"` (matching the `readout` /
`playback` precedent it already set — this is a one-line producer change), or the demo drops its
strip and consumes the producer's gallery. A division asserted in a comment and contradicted by the
DOM is the worst of the three states.

---

## L-4 — MAJOR · `shape="cell"` is bought from glass-ui and then fought locally — the owner already marked it

r2's L-r2-13 flags the per-instance override. It does not connect it to the owner's mark or to the
measured rendered class, which is what makes it decidable.

`EasingSpecimenStrip.vue:98-108` asks for the producer's cell recipe. glass-ui defines it
(`chipVariants.d.ts`):

```ts
readonly cell: "glass-chip--cell flex-col gap-1.5 px-2 py-2.5 text-micro";
```
`EasingSpecimenStrip.vue:163-170` then re-declares that recipe's own axes at the instance:

```css
.specimen-tile { display: flex; flex-direction: column; align-items: center;
                 gap: 0.125rem; padding: 0.3125rem 0.375rem 0.25rem; min-width: 2.75rem; }
```
`flex-col`, `gap`, `px`, `py` — all specified by `cell`, all overridden here. The variant is paid
for and discarded.

And `cell` does not carry radius. The live audit recorded the rendered element in this exact strip
as **`button.glass-chip.glass-capsule`** (`visual/STATES.json`, matrix `zoom-200-desktop`, route
`#/gradient`, `clipped[]` — alongside `div.strip-row`, `span.family-eyebrow`, `div.family-tiles`).
Capsule radius survives `shape="cell"`. That is visible in the owner's own mark,
`visual/shots/owner-marked/OM-4-easing-radius-incoherence.png`: the specimen tiles render as
**circles**, cramping the sparkline portraits, inside a `rounded-card` row that also holds a
`rounded-md` ramp and a `rounded-md` rail. Four radius registers in one ~400 px column — precisely
what "radius incoherence" names.

**Cure (producer-side, per the design-system edict).** glass-ui's `cell` shape owns its own radius
token instead of inheriting the capsule. The six geometry declarations in `.specimen-tile` delete;
only genuine sizing (`min-width`, portrait dimensions) survives. Styling stays at the root of the
component that owns the concept.

---

## L-5 — MAJOR · The readout rail hand-rolls a control glass-ui owns — the owner marked this one too

r1's L-8 asserts two re-implemented primitives generically. The specific, owner-confirmed one:

Subject `:176-198` builds a read-only literal field from raw primitives — `div.readout-rail` +
`<code>` + two bespoke `.rail-btn` — backed by **28 lines** of scoped CSS (`:268-294`) re-minting
hover wash, focus ring, radius and icon tone that glass-ui's button and input primitives already
carry. The owner marked exactly this surface:
`visual/shots/owner-marked/OM-13-easing-readout-not-glass-input.png` — *easing readout **not glass
input***. The mark is a crop of this rail, `cubic-bezier(0, 0, 1, 1)` and its two ghost buttons.

The comment at `:167-175` argues the `bg-well` backing is a contrast necessity (~2.7:1 → floored to
the certified ink-on-well ratio). That is a real constraint and the right *reason*; it is the wrong
*home*. A contrast-floored read-only literal field with a trailing copy affordance is a design-system
component, and the identical shape recurs at `MixResultDisplay.vue:31` and `App.vue:362` — both also
driving a copy tick from `useClipboard`.

**Cure.** glass-ui gains the variant under an existing component-type name — `Input` with
`readonly` + mono + a trailing-adornment slot. The subject's `.readout-rail`, `.rail-btn`,
`.rail-btn--on`, `.rail-tick` blocks all delete.

---

## L-6 — MINOR · Stale, redundant, partly-dead `paths` block — a second resolution mechanism beside the exports map

Neither round examined the demo's TypeScript resolution. `tsconfig.demo.json` hand-lists an 8-key
`paths` map for value.js. **It is not needed** — TypeScript resolves these by *package self-name*
through this repo's own `exports`. Measured:

```
$ npx tsc -p tsconfig.demo.json --noEmit --traceResolution | grep -A14 "Resolving module '@mkbabb/value.js/css'"
'paths' option is specified, looking for a pattern to match module name '@mkbabb/value.js/css'.
Found 'package.json' at '/Users/mkbabb/Programming/value.js/package.json'.
Entering conditional exports.
Using 'exports' subpath './css' with target './dist/subpaths/css.d.ts'.
======== … successfully resolved to '…/dist/subpaths/css.d.ts' with Package ID … ========
```
`./css` has **no** `paths` entry and resolves correctly regardless — the exports map is sufficient
and authoritative. Meanwhile the hand-rolled twin has drifted from it three ways:

```
$ for p in dist/index.d.ts dist/subpaths/parsing.d.ts dist/subpaths/units.d.ts; do [ -e "$p" ] && echo "EXISTS $p" || echo "MISSING $p"; done
MISSING dist/index.d.ts
MISSING dist/subpaths/parsing.d.ts
MISSING dist/subpaths/units.d.ts
```
1. Three of eight targets do not exist (`@mkbabb/value.js` bare, `/parsing`, `/units`), and
   `package.json#exports` carries no `"."` key at all — the bare specifier is unpublished.
2. Two real subpaths (`/value`, `/css`) are **absent** from `paths`.
3. Its own comment asserts a *"CLOSED 8-key set"*; the real set is 7 keys and different.

`vite.config.ts:37-50` gets the same job right — it **generates** the alias set from
`package.json#exports` so it cannot drift, and argues at length why. The tsconfig is the hand-rolled
twin that did drift. Edict 2 (no dual paths).

**Cure.** Delete the seven value.js `paths` entries. One door, both resolvers — exactly what
vite.config already reasons its way to.

---

## L-7 — MINOR · `useGradientCSS.ts` is a 334-line mixed module wearing a `use*` name

13 of its 334 lines are the composable (`:322-334`). The rest is pure serialization plus L-2's
bridge. The subject imports a **pure function** from it (`:31 serializeIntervalRamp`); so do
`useSpecimenRows.ts:14` and `GradientVisualizer.vue:24` (`easingFnOf`). The `use*` prefix promises a
reactive scope the module mostly does not have.

Corroborating r2's L-r2-11 with the honest qualification that round left implicit: the
`useGradientCSS ↔ useGradientModel` and `useGradientModel ↔ gradientParse` cycles are **both
type-only** (`useGradientCSS.ts:31`, `gradientParse.ts:23` are `import type`), so they are **erased
at runtime**. Graph hygiene, not a TDZ hazard. It should still be said plainly rather than left as
an unqualified "cycle".

**Cure**, folding L-2: `model.ts` (types only, zero imports) ← `serialize.ts` (pure) ←
`parse.ts` (pure) ← `useGradientModel.ts` (the one composable). The bridge leaves for the library
and the cycle dissolves because the types land on a leaf.

---

## L-8 — MINOR · The seat scrapes the DOM for a value glass-ui publishes as a ref

r2's L-r2-4 covers the `:deep()` patching. The specific waste it names but does not source:

`EasingAuthoringStage.vue:47-53`:
```ts
const vb = rootEl.value?.querySelector<SVGSVGElement>("svg[role='img']")?.viewBox.baseVal;
```
re-run through `requestAnimationFrame` on every emission and every `value.css` change (`:57-67`).
`useEasingPicker` already returns it:
```ts
viewBox: ComputedRef<{ minY: number; height: number }>;   // useEasingPicker.d.ts:64-67
```
The demo scrapes from rendered DOM a number the producer holds in a computed ref — because the SFC
does not forward it. Compounding: `:88` selects on `[data-testid="easing-picker"]`, a **test hook
used as a styling selector**, so the demo's layout now depends on glass-ui's test attributes.

**Cure.** The producer exposes `viewBox` (slot prop, or writes `--vb-ratio` itself) and gains a
`surface`/`density` axis. `syncVbRatio` and the entire `<style scoped>` block delete.

---

## L-9 — INFO · value.js's `css` + `easing` load twice in the dev module graph

Two physical copies of the same local build are live on `/#/gradient` in dev — one inlined into the
optimizer chunk serving glass-ui, one served unbundled to the demo:

```
$ node -e "…sources of node_modules/.vite/deps/css-CwYd9pBf.js.map…"
../../../dist/result-CZJK1CwL.js
../../../dist/anchors-C_wdoOYd.js
../../../dist/subpaths/css.js          ← the local checkout build, inlined into the dep chunk

$ curl -s "http://localhost:9000/@fs/…/demo/workbenches/gradient/composables/useGradientCSS.ts" | grep "^import"
import { parseTimingFunction } from "/@fs/…/dist/subpaths/css.js?t=1785167569503";   ← second instance
```

The alias *does* work — the optimizer honoured it, so both copies are the checkout. **No behavioural
consequence:** `src/css/*` and `src/easing.ts` carry only frozen constant `Set`s and pure functions,
no mutable module state, so two instances cannot desynchronise. Dev-only byte cost. Recorded so the
next reader need not re-derive it.

---

## L-10 — INFO · A registry copy of value.js shadows the checkout in `node_modules` (hypothesis)

`node_modules/@mkbabb/value.js` is a **real directory at 4.0.0, not a self-link**, and value.js is
not in its own `dependencies` — npm auto-installed it from glass-ui's `peerDependencies`. The only
thing binding glass-ui's bare `@mkbabb/value.js/*` imports to *this checkout* rather than that
tarball is the generated alias at `vite.config.ts:41-50`.

Honest measurement — **no divergence today**:

```
easing SAME · color SAME · math SAME · quantize SAME · value SAME · transform SAME
css   local=43973/6dfbff9f  installed=43972/0cd5611e  DIFFER
$ diff <(tr ',' '\n' < dist/subpaths/css.js) <(tr ',' '\n' < node_modules/@mkbabb/value.js/dist/subpaths/css.js)
<  r as ee / s as f / v as p        >  r as f / s as p / v as m        ← minifier mangling only
```
Semantically identical builds of the same source. **Labelled a hypothesis, no reproduction:** the
shadow becomes real the moment `src/` advances past published 4.0.0 while any specifier escapes the
alias set.

---

## Corrections to round 1

**r1's L-1 (BLOCKER) — "The published library runtime-depends on its own demo's design system."**
The conclusion is right; the evidence cited for it is not. r1 offers
`grep -rn "@mkbabb/glass-ui" dist/subpaths/*.js dist/value.js | wc -l`. Run at `c654824e`:

```
$ grep -c "@mkbabb/glass-ui" dist/subpaths/*.js
math.js:0  easing.js:0  color.js:0  css.js:0  value.js:0  quantize.js:0  transform.js:0
$ grep -oh 'from"[^".][^"]*"\|from "[^".][^"]*"' dist/subpaths/*.js dist/*.js | sort -u
(no bare specifiers — the published dist has ZERO external runtime imports)
$ grep -rn "glass-ui" dist/subpaths/*.d.ts
(empty)
```
The published runtime and its declarations are **glass-ui-free**; inv-K-1 holds structurally. `dist/`
is clean. The defect is in the **manifest**, not the bundle — `package.json:82-85`:

```json
"dependencies": { "@mkbabb/glass-ui": "^7.0.0", "@mkbabb/keyframes.js": "^6.0.0" }
```
Two packages declared as **runtime** dependencies that the published surface never imports:

```
$ du -sh node_modules/@mkbabb/glass-ui node_modules/@mkbabb/keyframes.js dist/subpaths
5.2M  node_modules/@mkbabb/glass-ui
608K  node_modules/@mkbabb/keyframes.js
132K  dist/subpaths
```
Every consumer of a 132 KB library installs **5.8 MB** it can never load — a 44× install-weight tax
on a false dependency edge. Both are demo-only (`src/` references keyframes.js in three prose
comments and zero imports; the demo tree is excluded from `files`). **Correct cure: move both to
`devDependencies`.** I record the corrected proof so the arbiter does not discard a true finding
over a bad grep.

---

## The lattice, greenfield

**value.js `/easing`** — owns curve math *and* the CSS round trip.
`timingFunction(source) → Result<EasingFunction>` · `fromTimingFunction(ast)` ·
`bezierPresetFamilies` (the partition, so **L-1** cannot recur) · `sampleCurve(fn, n) → path` (the
one glyph painter — today three: `easingCatalogue.glyphPath`, glass-ui `bezierPathD`, glass-ui
`stepPathD`). `JumpPosition` derived from `jumpTerms`; `BezierQuad` published.

**value.js `/css`** — symmetric. `parseTimingFunction` ⟷ `serializeTimingFunction`, beside the
color pair that already is.

**value.js `package.json`** — `dependencies: {}`; glass-ui and keyframes.js move to `devDependencies`.

**glass-ui `easing`** — the authoring instrument only. Imports `EasingFunction`/`JumpPosition`
rather than re-declaring `EasingFn`/`JumpTerm`; gains `presets`, `surface`, `density` props and
exposes `viewBox`, so no consumer reaches through `:deep`. Its `cell` chip shape owns its radius.
Gains a `./clipboard` subpath and a read-only mono `Input` variant with a trailing adornment.

**demo `workbenches/gradient/`** — four leaves, acyclic:
`model.ts` (types, zero imports; `GradientInterval = { css }`) ← `serialize.ts` (pure) ←
`parse.ts` (pure) ← `useGradientModel.ts` (the single composable).

**demo `…/GradientVisualizer/easing/`** — three files, no catalogue of its own:
`EasingSpecimenStrip.vue` (renders `bezierPresetFamilies`; geometry deleted in favour of glass-ui's
`cell`) · `EasingAuthoringStage.vue` (a props adapter, `<style scoped>` empty) ·
`GradientEasingEditor.vue` (one `modelState` prop; accordion + rail; the rail is a glass-ui
component).

`easingCatalogue.ts` — 230 lines — does not survive: `bezierLiteral`/`stepsLiteral` → the library
serializer, `glyphPath` → `/easing`, `FAMILY_ORDER` → `bezierPresetFamilies`, the tile `payload()`
transients → r2's L-r2-2. `useGradientCSS.ts` sheds 70 lines to **L-2** and splits under **L-7**.
Net: roughly **300 demo lines delete** into four library exports and four producer props.

---

## Findings index (this round only)

| id | sev | one line | new? |
|---|---|---|---|
| L-1 | BLOCKER | `FAMILY_ORDER` filters instead of sorts — 6 of 30 published presets unreachable; one renders as `custom` | NEW |
| L-2 | MAJOR | the CSS-AST → callable bridge, incl. the `linear()` spec algorithm, lives in `demo/` | NEW |
| L-3 | MAJOR | two selection surfaces over one catalogue; `EasingPicker` has no `presets` prop | NEW |
| L-4 | MAJOR | `shape="cell"` bought then fought; capsule radius survives — owner mark OM-4 | sharpened |
| L-5 | MAJOR | the readout rail hand-rolls a glass-ui control — owner mark OM-13 | sharpened |
| L-6 | MINOR | `tsconfig.demo.json` `paths` redundant with self-name resolution; 3 dead targets, 2 omissions | NEW |
| L-7 | MINOR | `useGradientCSS.ts` — 334-line mixed module named a composable; cycles are type-only | qualified |
| L-8 | MINOR | `viewBox` scraped from producer DOM though published as a ref; `data-testid` used for styling | sharpened |
| L-9 | INFO | value.js `css`+`easing` load twice in the dev graph (no behavioural consequence) | NEW |
| L-10 | INFO | registry copy of value.js shadows the checkout — hypothesis, no divergence today | NEW |
| — | — | **Correction:** r1's L-1 is true of `package.json#dependencies`, false of `dist/` | correction |

### Probe log
- Static: full read of the subject + `easing/{EasingAuthoringStage,EasingSpecimenStrip}.vue`,
  `easingCatalogue.ts`, `useSpecimenRows.ts`, `composables/{useGradientCSS,useGradientModel,gradientParse}.ts`,
  `GradientVisualizer.vue`, `package.json`, `vite.config.ts`, `tsconfig.{base,demo}.json`,
  `src/easing.ts`, `src/subpaths/{css,easing,color}.ts`, glass-ui `dist/easing.js` +
  `components/easing/**/*.d.ts` + `components/chip/{types,chipVariants}.d.ts`.
- Commands: `tsc --traceResolution` (L-6), the transcribed `buildFamilies()` run (L-1),
  `shasum`/`diff` over `dist/subpaths` vs the installed copy (L-10), `du -sh` (correction),
  sourcemap `sources` read + `curl` of the dev-server-transformed module (L-9).
- Browser: 1 navigation + 3 `evaluate` against `http://localhost:9000/#/gradient` — used only to
  confirm the 27-tile count (L-1). The shared browser drifted route mid-probe (a concurrent driver);
  I stopped rather than spend more, and closed L-3 statically from glass-ui's shipped source instead.
- Images read: `visual/shots/safari-desktop-light/gradient.png`,
  `visual/shots/owner-marked/OM-4-easing-radius-incoherence.png`,
  `visual/shots/owner-marked/OM-13-easing-readout-not-glass-input.png`.

**No source edits land from this seat.** Findings only. Prior rounds r1 and r2 left intact.
