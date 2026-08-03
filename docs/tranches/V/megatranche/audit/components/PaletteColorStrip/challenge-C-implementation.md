# CHALLENGE-C — PaletteColorStrip: implementation

## Model receipt

I observe myself to be **Opus 5 (1M context)** — exact model id `claude-opus-5[1m]`. The seat was
spawned with an explicit Opus 5 declaration and the declaration is the model I am running as. Not
inherited, not undeclared.

---

**Subject** `demo/palettes/browser/card/PaletteColorStrip.vue` (72 lines)
**Repo** `/Users/mkbabb/Programming/value.js` · branch `tranche-u` · HEAD at spawn `c654824e`
(working tree at report time `06377848`; the subject file is untouched by either)
**Verdict** **DEFECTIVE** — 6 MAJOR, 4 MINOR, 5 INFO.
**Strongest defect** C-1: the component's one documented invariant — an "8% legibility floor" —
is **not a floor**, and I measured it failing in the live app at 6.25%.

---

## 0. What the component is

72 lines, no `<style>`, no lifecycle, no listeners, no async, no `defineModel`, no rAF, no WebGL.
One `computed`. It renders a row (or column) of `<div>`s whose width (or height) percentages come
from `segmentPcts`. Three consumers:

| consumer | line | props passed |
|---|---|---|
| `PaletteCard.vue` | 33–37 | `:colors`, `:orientation`, `:class` (radius) |
| `GenerateControls.vue` | 135 | `:colors`, `class="rounded-t-card"` |
| `MixSourceSelector.vue` | 203 | `:colors` only |

Because the surface is this small, most of the usual hazard classes are vacuously clean. I say so
explicitly in §3 (negative proof) so the DEFECTIVE verdict is not read as a shotgun.

---

## 1. Findings

### C-1 · MAJOR · The "8% legibility floor" is not a floor — renormalise-after-floor destroys it

**Evidence — source.** `PaletteColorStrip.vue:47-48`

```
/** The 8% legibility floor for weighted segments. */
const WEIGHT_FLOOR = 0.08;
```

and the prop doc it enforces, `PaletteColorStrip.vue:38-40`:

```
/** Optional per-segment weights (e.g. quantizer populations — T19).
 *  Segments size proportionally with an 8% floor so small clusters stay
 *  legible; …
```

The algorithm, `PaletteColorStrip.vue:63-67`:

```js
const floored = effective.map((w) =>
    Math.max(Math.max(w, 0) / total, WEIGHT_FLOOR),
);
const flooredTotal = floored.reduce((sum, x) => sum + x, 0);
return floored.map((x) => (x / flooredTotal) * 100);
```

The floor is applied, then everything is divided by `flooredTotal`. Whenever any segment was raised
to the floor, `flooredTotal > 1`, so the renormalisation **pushes every floored segment back below
8%**. The floor is undone by the very next line. This is the classic broken-floor idiom; the correct
shape is water-filling (reserve `k × floor`, distribute the remaining `1 − k × floor`
proportionally among the unfloored), which is exact and idempotent.

**Evidence — live measurement.** I synthesised a 200×200 PNG with exactly known populations
(96% green / 1% each of red, blue, yellow, magenta), dropped it on `/#/extract` at
`http://localhost:9000`, and read the rendered strip out of the DOM:

```
$ node scratchpad/mkpng.mjs
wrote 710 bytes; expected populations 0.96,0.01,0.01,0.01,0.01

# after setInputFiles on the extract dropzone, page.evaluate on the strip:
{"stripW":458,"n":5,
 "pcts":["75%","6.25%","6.25%","6.25%","6.25%"],
 "px":[343.5,28.625,28.625,28.625,28.625]}
```

**6.25%, not 8%.** 28.625 px where the documented floor promises 36.64 px — a 22% relative shortfall
on the shipped path, at the default k.

**Evidence — how bad it gets.** The computed is pure, so it is exactly simulable. Running the
function body verbatim:

```
n=2  [0.99,0.01]      92.523,  7.477      → floor missed by  6.5% rel
n=5  one dominant     75.000,  6.250 ×4   → floor missed by 21.9% rel   (MEASURED LIVE ✓)
n=8  one dominant     62.416,  5.369 ×7   → floor missed by 32.9% rel
n=16 one dominant     41.463,  3.902 ×15  → floor missed by 51.2% rel
n=20 one dominant     34.764,  3.433 ×19  → floor missed by 57.1% rel
```

`k` reaches **16** on the extract slider (`ExtractControls.vue:29` — `:max="16"`), so the 3.902%
row is a reachable production state: the "legible" minimum is **less than half** what the code
claims, ~17 px on a 458 px card.

**Reproduction.** `node` the pure function above; or the live path: `/#/extract` → drop any image
with one dominant colour → read `document.querySelector('div[aria-hidden="true"][role="presentation"]')`
children's `style.width`.

**Mechanism.** Normalisation applied *after* a clamp, undoing the clamp.

**Cure.** Water-fill instead of clamp-then-renormalise. Sort ascending; while the smallest share is
below `floor`, pin it to `floor`, remove it from the pool, and re-proportion the remainder over the
residual mass `1 − pinned·floor`. Terminates in ≤ n passes, exact by construction, and it also makes
the `n > 1/floor` case (n ≥ 13, where a floor is arithmetically impossible) fail *loudly* instead of
silently — which is the honest behaviour. If a real floor is not wanted, delete `WEIGHT_FLOOR` and
the prose; a documented invariant the code does not hold is worse than no invariant.

---

### C-2 · MAJOR · `orientation="vertical"` renders a **0-pixel-tall**, invisible strip

**Evidence — source.** `PaletteColorStrip.vue:8-9,17,20-21`:

```
orientation === 'vertical' ? 'flex flex-col w-10 h-full' : 'flex h-10 w-full'
…
:class="orientation === 'vertical' ? 'w-full' : 'h-full'"
[orientation === 'vertical' ? 'height' : 'width']: `${segmentPcts[i] ?? 0}%`
```

The vertical branch asks for `height: 100%` on the container and `height: X%` on each child. The
only consumer that can pass `vertical` is `PaletteCard.vue:35`, and it does so exactly when the
card root becomes `flex` (`PaletteCard.vue:20`) — i.e. a flex **row** whose height is
content-determined. `height:100%` against an indefinite-height parent does not resolve, and because
an explicit height is specified, `align-self: stretch` never gets to rescue it.

**Evidence — live measurement.** I injected the component's exact emitted markup into the running
app (so the real Tailwind build resolves the classes) inside a 200 px-tall flex row:

```
{"cardH":200,"bodyH":200,
 "stripH":0,"stripW":40,
 "computed":{"height":"0px","alignSelf":"auto","flexDirection":"column","width":"40px"},
 "kidH":[0,0,0],"kidComputedH":["0px","0px","0px"]}
```

Card 200 px tall. Strip **0 px tall**. Every segment 0 px. `w-10` resolved (40 px), proving the
Tailwind classes were live and it is `h-full` specifically that collapses.

**Reproduction.** Paste the probe markup (`<div class="flex"><div class="overflow-hidden flex
flex-col w-10 h-full">…3 children with style="height:75%|12.5%|12.5%"…</div><div style="height:200px">`)
into any page of the running demo and read `getBoundingClientRect().height`.

**Why nobody has seen it.** The vertical branch is **currently unreachable**: `PaletteCard`
receives `layout="aside"` only from `ExtractWorkbench.vue:148` under `layout === 'split'`, and the
sole mounting site hardcodes the opposite — `ExtractPane.vue:14` — `layout="column"`. So half this
component's rendering surface is *dead **and** broken*: it ships, it type-checks, it has never
rendered a visible pixel, and the day anyone re-enables split layout the aside card loses its strip
with no error.

**Cure.** Delete the vertical branch (it is dead per C-5's sibling argument), or make it correct by
construction: drop `h-full` and let flex stretch supply the cross size (`self-stretch`), and give
the segments `flex: <weight> 0 0` instead of percentage heights — flex-grow ratios need no definite
parent size and are the idiomatic way to express "proportional segments" in both orientations. That
one change fixes horizontal and vertical with a single code path and removes the
`orientation`-conditioned style key entirely.

---

### C-3 · MAJOR · A single non-finite weight blanks the **entire** strip, silently — and the repo's own sibling module already guards this

**Evidence — source.** `PaletteColorStrip.vue:61-67` has no finiteness guard. With `Infinity`
present: `total = Infinity`; the Infinity entry gives `Infinity/Infinity = NaN`;
`Math.max(NaN, 0.08) = NaN`; `flooredTotal = NaN`; **every** returned percentage is `NaN`.

```
Infinity present       NaN, NaN, NaN  sum=NaN
NaN present            FALLBACK-TO-EQUAL          (masked, see C-8)
negative               7.407, 46.296, 46.296      (a negative weight still gets 7.4% of the bar)
```

**Evidence — what the DOM does with `NaN%`.** Measured in the live page, driving the CSSOM exactly
as Vue's `:style` binding does:

```
a.style.width = 'NaN%'      → {"w":0,"cssW":"","computedW":"0px"}   attribute: "background-color: …;"
c.style.width = 'Infinity%' → {"w":0,"cssW":"","computedW":"0px"}   attribute: null
```

CSSOM rejects the declaration outright — no console warning, no exception. The strip renders as a
40 px band of nothing. On a `PaletteCard` the strip is the card's primary identity; the failure mode
is a card that looks empty with zero diagnostics.

**Evidence — the asymmetry.** Forty lines away, in the same feature area, the repo already writes
the correct guard: `demo/palettes/mix.ts:50-51`

```js
if (weights.some((weight) => !Number.isFinite(weight) || weight < 0)) {
    throw new Error("Color weights must be finite and nonnegative");
}
```

`mix.ts` validates the same quantity; the strip does not. That is the finding: not "an unguarded
input exists" but "this codebase's own idiom for this exact input was not applied here".

**Reproduction.** `<PaletteColorStrip :colors="c" :weights="[Infinity, 1, 1]" />` — or the pure
function above. Reachability today is through the `weights` prop only (the extract producer,
`useExtractSession.ts:88`, divides integer populations by a positive total, so it cannot emit
non-finite). That prop is public API and dead (C-5), so this is latent-by-luck, not
correct-by-construction.

**Cure.** Sanitise once at the boundary — a single `toShares(raw: readonly number[]): number[]`
that rejects/zeroes non-finite and negative entries and returns a normalised share vector — and let
`segmentPcts` consume only shares. Same helper `mix.ts` wants; it belongs beside the `PaletteColor`
type, not inside a card sub-component.

---

### C-4 · MAJOR · Vacuous gate — the component has **zero** tests, and the exact green-keeping mutation is trivial to name

**Evidence.**

```
$ grep -rln "ColorStrip\|WEIGHT_FLOOR\|segmentPct" test/ e2e/
$ echo $?
1
```

Nothing. `test/demo/` contains exactly one directory (`palettes/api/admin-palettes.test.ts`) — an
API test. The nine e2e specs that touch the card cluster assert on `ShadowPalette`'s ghost
(`o9-shadow-palette.spec.ts:74,138`), card census tiers, voting and deletion — none reads a segment
width, a weight, or `aria-hidden` on the strip.

**The mutation that keeps every gate green:** replace lines 50–71 wholesale with

```js
const segmentPcts = computed<number[]>(() => colors.map(() => 100 / colors.length));
```

That deletes `WEIGHT_FLOOR`, the `weights` prop's entire reason to exist, and the population story
this component was built for (S.W5-6 · F7 / T19). `vitest`, `playwright`, `vue-tsc` and `eslint`
all stay green. The population-proportional strip is the *only* deliverable of that whole workstream
and nothing in the repo proves it still works.

**Cure.** `segmentPcts` is a pure function of `(colors, weights)` and should be *extracted* as one —
`segmentShares(colors, weights)` in a plain `.ts` beside `demo/palettes/types.ts` — at which point
it is unit-testable without a mount: floor honoured for k ∈ [2,12]; sum ≡ 100 ± 1e-9; non-finite
rejected; n = 0 → `[]`; negative → 0. Five assertions, no DOM. Plus one e2e oracle that drops a
fixture image with a known dominant colour and asserts the widest segment's ratio — the same probe I
ran by hand for C-1.

---

### C-5 · MAJOR · The `weights` prop is dead public surface, and its documented 3-tier precedence has an unreachable tier

**Evidence.**

```
$ grep -rn "weights" --include="*.vue" demo/ | grep -v "PaletteColorStrip.vue"
(no output)
```

Zero consumers pass `weights`. Yet `PaletteColorStrip.vue:38-44` documents a three-tier precedence
chain — explicit `weights` → the colours' own `weight` → equal — of which tier 1 is unreachable,
and `:55` (`weights && weights.length === n`) branches on it every recompute.

Combined with C-2's dead `vertical` branch, roughly 40% of this component's behavioural surface has
never executed in the shipped app. That is three standing edicts at once: **no legacy code** (a
dual path kept alive for nobody), **KISS/no contrivance** (a precedence chain invented ahead of a
caller), and it is precisely why C-2 and C-3 could sit undetected.

**Reproduction.** The grep above.

**Cure.** Delete `weights` and the `orientation` vertical branch. The component then takes one
prop, `colors`, and reads `weight` off it — which is what the type contract at
`demo/palettes/types.ts:5-11` already says is the single source of the population story. If a caller
ever needs an override, that is the day to add it back.

---

### C-6 · MAJOR · The weight contract dies at the API boundary — a saved extracted palette silently loses its population story

**Evidence — the wire schema.** `api/src/modules/palette/schema.ts:27-33`

```js
export const colorEntrySchema = z.object({
    css: z.string().min(1).max(200),
    name: z.string().max(64).optional(),
    position: z.number().finite(),
});
export const colorsArraySchema = z.array(colorEntrySchema).min(1).max(50);
```

No `weight`. zod 4 (`api/node_modules/zod` → `4.4.3`) strips unknown keys by default, so the field
is dropped on write without a 400 and without a log line.

**Evidence — the claim it falsifies.** `demo/palettes/types.ts:6-9`:

> "the quantizer's population share … Present only on extracted palettes; `PaletteColorStrip` sizes
> its segments from it, so the ONE card strip tells the population story"

and `PaletteColorStrip.vue:40-42`:

> "an extracted palette carries its population story ON the palette, so the card's own strip is
> proportional by construction"

Both are false the moment the user presses Save.

**Evidence — live.** `/#/browse` renders a persisted palette; I read its card strip:

```
{"label":"Palette: Audit Seed","n":6,
 "pcts":["16.6667%","16.6667%","16.6667%","16.6667%","16.6667%","16.6667%"]}
```

Exactly equal. Extract → save → reload silently downgrades a weighted strip to an unweighted one,
and the UI gives no signal that information was lost.

**Reproduction.** `/#/extract` → drop the fixture PNG (weighted 75/6.25×4 strip, C-1) → save →
reload → the card's strip is equal-width.

**Cure.** One of two honest choices, not both: (a) add `weight: z.number().min(0).max(1).optional()`
to `colorEntrySchema` so the contract the client type asserts is the contract the server keeps; or
(b) delete `weight` from `PaletteColor`, make it a transient of the extract session only, and stop
claiming it "rides ON the palette". Today the type says (a) and the wire does (b) — a type-lie of
exactly the species `Palette.id` was already cured for (`types.ts:18-26`).

---

### C-7 · MINOR · The strip's markup is triplicated inside its own directory, with three different geometries

**Evidence.** Same 40 px strip, three implementations, one folder:

| file:line | geometry |
|---|---|
| `PaletteColorStrip.vue:13-23` | `flex h-10 w-full`, no gap, `width: <pct>%` |
| `PaletteCardSkeleton.vue:39-52` | `flex h-10 w-full`, no gap, `width: ${100/count}%` |
| `ShadowPalette.vue:51-57` | `flex h-10 w-full **gap-px**`, `flex-1` |

`ShadowPalette` adds `gap-px` and uses `flex-1`; the real strip has neither. So the loading ghost
and the loaded strip do not have the same geometry — segments shift by 1 px per boundary and
re-proportion at the moment data arrives. `PaletteCardSkeleton` also omits the
`aria-hidden`/`role="presentation"` the real strip carries (`:4-5`), so the three siblings do not
even agree on whether a colour strip is decorative.

**Reproduction.** Read the three files; or watch `/#/browse` on a cold load — the ghost's hairlines
vanish when the real strip mounts.

**Cure.** One strip. `PaletteColorStrip` should take an optional `pending` state and render the
shimmer itself (it already owns the segment geometry); `PaletteCardSkeleton`/`ShadowPalette` consume
it. Geometry then cannot desync because there is only one copy of it.

---

### C-8 · MINOR · Three separate silent-degradation fallbacks that mask malformed input instead of surfacing it

**Evidence.**

1. `:55` — `weights && weights.length === n`. A caller who passes a wrong-length `weights` array has
   it **silently ignored**; the strip falls through to `own`, then to equal. No warning. Contrast
   `mix.ts:47-48`, which throws `"Each color requires a weight"` for the identical mistake.
2. `:62` — `if (total > 0)`. `NaN > 0` is false, so **one NaN weight silently reverts the whole
   strip to equal widths** (measured: `NaN present → FALLBACK-TO-EQUAL`). The population story
   disappears and looks like a palette that simply has no weights.
3. `:19` — `backgroundColor: color.css` with no validation, against an API field typed
   `z.string().min(1).max(200)` (schema.ts:28) that is never checked for being a colour. Measured in
   the live CSSOM:

```
b.style.backgroundColor = 'not-a-color'
→ {"computedW":"133.328px","bg":"rgba(0, 0, 0, 0)"}
```

   A 133 px fully transparent segment: the card shows a hole with no console error.

**Reproduction.** The pure-function runs above for (1)(2); the CSSOM probe for (3).

**Mechanism.** Guard-then-swallow — the standing "no masking fallbacks" edict.

**Cure.** The single `toShares()` boundary from C-3 throws (dev) / reports once (prod) on
length mismatch and non-finite input, exactly as `mix.ts` already does. For (3) the honest fix is at
the wire: `colorEntrySchema.css` should be validated as a CSS colour, and the strip should render a
visible "unparseable" treatment rather than a transparent hole — this is the same class as the
recorded live `parseCssColor("oklch()")` crash: the app trusts an unvalidated colour string.

---

### C-9 · MINOR · Parent-side radius derivation duplicates the child's own orientation switch; three consumers, three conventions

**Evidence.** `PaletteCard.vue:35-36`

```
:orientation="layout === 'aside' ? 'vertical' : 'horizontal'"
:class="layout === 'aside' ? 'rounded-l-card' : 'rounded-t-card'"
```

The parent computes the corner treatment from `layout`, re-deriving the same boolean the child
already switches on internally (`:8`). `GenerateControls.vue:135` hardcodes `rounded-t-card`;
`MixSourceSelector.vue:203` passes no radius at all and relies on its wrapper's `overflow-hidden`
to clip. Three call sites, three conventions for the same visual property.

Measured concentric-radius error on the shipped `/#/generate` plate:

```
{"plateRadius":"16px","plateBorder":"1px","stripRadius":"16px","stripInsetFromPlate":1}
```

Outer radius 16 px with a 1 px border demands an inner radius of **15 px**; the strip uses 16 px at
a 1 px inset, so its corner arc sits ~0.4 px proud of the border's inner curve — a sub-pixel sliver
of `bg-well` in each top corner.

**Reproduction.** `getComputedStyle` on `[data-generate-plate]` and its strip child, as above.

**Mechanism.** Styling authored per-instance at the call site rather than at the component root —
the standing root-level-styling edict.

**Cure.** The strip owns its corners: it already knows its orientation, so it should emit
`rounded-t-card` / `rounded-l-card` itself and expose no radius seam to callers. `MixSourceSelector`
then stops needing its wrapper's clip.

---

### C-10 · MINOR · `Math.max(100 / n, 0.5)` is dead for every reachable `n`, and wrong when it is not

**Evidence.** `PaletteColorStrip.vue:70`

```js
return colors.map(() => Math.max(100 / n, 0.5));
```

`100/n < 0.5` requires `n > 200`. The API caps a palette at 50 colours
(`schema.ts:33` — `.max(50)`), extract at 16, generate at 12. So the `Math.max` never fires on any
reachable input — dead defensive code. And when it *does* fire, it is wrong: the segments then sum
to `n × 0.5 > 100%`, and because the children are `shrink-0` (`:16`) inside `overflow-hidden`
(`:7`), the surplus is **clipped** — trailing colours vanish with no indication. A guard that is
unreachable, and incorrect where reachable, is strictly worse than its absence.

**Reproduction.** NONE for the firing branch (`n > 200` is not constructible through any shipped
path) — the deadness itself is proven by the caps above. Labelled accordingly.

**Cure.** `return colors.map(() => 100 / n);`. Or, per C-2's cure, `flex: 1` and delete the
arithmetic entirely.

---

### C-11 · INFO · `n === 0` renders a 40 px band of nothing rather than nothing

`:52` — `if (n === 0) return []` — returns early from the *computed*, but the template's root div
still renders with `h-10 w-full` (`:10`), so an empty palette produces a 40 px transparent stripe
inside the card. Remote palettes cannot be empty (`colorsArraySchema` is `.min(1)`), so this is
reachable only through a local palette; I did not construct one, so **this is a hypothesis as to
reachability** — the code path itself is explicit at `:52`. Cure: `v-if="colors.length"` on the
root, which is also what makes the skeleton/real handoff (C-7) well-defined.

### C-12 · INFO · `role="presentation"` alongside `aria-hidden="true"` is redundant

`:4-5`. A bare `<div>` has no implicit role, so `role="presentation"` is a no-op; `aria-hidden`
already removes the subtree from the accessibility tree. Two attributes, one of them inert, and the
inconsistency with `PaletteCardSkeleton:39` (which carries neither) suggests neither was chosen
deliberately. Cure: keep `aria-hidden="true"`, drop `role="presentation"`.

### C-13 · INFO · `:key="i"` index keys on a list that is user-reorderable

`:14-15`. `PaletteCard` supports `draggable` (`:44` GripVertical). Index keys mean a reorder patches
every segment's inline style in place rather than moving nodes, which forecloses any future
`<TransitionGroup>` on the strip and repaints all `n` segments on any reorder. Functionally benign
today (the segments hold no state). Cure: key on `color.css + i` if the strip ever animates.

### C-14 · INFO · The population story has no non-visual equivalent

The strip is the **only** surface that expresses `weight` anywhere in the app, and it is
`aria-hidden`. The host card's accessible name is `Palette: ${palette.name}`
(`PaletteCard.vue:23`) plus a colour *count* (`:73`); dominance is unavailable to assistive tech
with no textual alternative. Hiding a decorative strip is right; hiding the app's sole rendering of
a data dimension is a data-loss decision that was never stated. Cure: when weights are present, put
the dominant share on the card's `aria-label` (e.g. `…, 5 colors, dominant 75%`) — the strip stays
`aria-hidden`, the information does not.

### C-15 · INFO · `weights = undefined` destructure default is a no-op

`:34`. `weights?: number[]` is already `undefined` when absent; the default adds a
`mergeDefaults` entry that changes nothing. Noise. Moot under C-5's cure.

---

## 2. Family grouping

| family | findings | one root |
|---|---|---|
| **Share arithmetic is unsound** | C-1, C-3, C-8(1)(2), C-10 | there is no `toShares()` boundary; normalisation, flooring, validation and fallback are smeared across one 21-line `computed` |
| **Dead surface, never exercised** | C-2, C-5, C-10, C-15 | props and branches shipped ahead of callers, then never removed |
| **Contract not kept end to end** | C-6, C-8(3) | `weight` and `css` are asserted by the client type and unvalidated/undropped on the wire |
| **Geometry duplicated** | C-7, C-9 | the 40 px strip exists in three places and its corners are authored at three call sites |
| **No proof of anything** | C-4 | the one deliverable is a pure function that was never extracted, so it was never tested |

The gestalt cure is one transposition, not ten patches: **extract the arithmetic and delete the dead
surface.** `segmentShares(colors: PaletteColor[]): number[]` becomes a pure, tested module beside
`demo/palettes/types.ts` — water-filled floor, finite-and-nonnegative validation matching
`mix.ts:50`, `[]` for empty. The SFC drops to `colors` in, `flex: <share>` out, one orientation-free
code path, its own corner radius, no `weights`, no `Math.max` guards, no percentage heights. That
single move kills C-1, C-2, C-3, C-4, C-5, C-8(1)(2), C-9, C-10, C-11, C-15 — and it is *smaller*
than what is there now.

---

## 3. Negative proof — hazards checked and found clean

I checked each standing local hazard and the general async/lifecycle classes. These are clean, and
I record them so the DEFECTIVE verdict is not read as indiscriminate:

- **`defineModel` stale-read** — not applicable. No `defineModel`, no emit, no writable state. The
  component is pure props-in.
- **oklch→HSV hue drift / `stableHue`** — not applicable. No colour maths; `color.css` is passed
  through verbatim to `backgroundColor` (measured live: `background-color: oklch(0.678143 0.243841
  353.752)` reaches the DOM unchanged).
- **`ValueUnit` nesting accumulation** — not applicable. No `ValueUnit`, no wrapping.
- **reka-ui pointer-capture leaks** — not applicable. Zero pointer handlers; the strip is inert.
- **PRM-RAF epidemic** — clean. No `requestAnimationFrame`, no timers, no `Transition`.
- **WebGL** — clean. No canvas, no context.
- **Listener / observer / subscription leaks** — clean. No `onMounted`, `onUnmounted`,
  `addEventListener`, `ResizeObserver`, or watcher. Nothing to leak.
- **Reactivity that will not fire** — clean, and load-bearing: Vue is `3.5.35`
  (`node_modules/vue/package.json`), so reactive props destructure at `:31-35` is the stable 3.5
  behaviour and `colors` inside the computed tracks correctly. On Vue 3.4 this file would be a
  frozen strip; it is not.
- **`verbatimModuleSyntax`** — compliant. `:28` `import { computed } from "vue"` (value),
  `:29` `import type { PaletteColor }` (type-only).
- **Sub-pixel seams between segments** — clean, measured. At 460 px / n=5 and again after resizing
  the viewport to 1237 px: `gaps: [0,0,0,0]`, `sum: 460`, `residual: 0`. No hairline bleed-through.
- **Per-frame / per-tick work** — clean. One `computed` over ≤ 50 elements, recomputed only when
  `colors` or `weights` change. Nothing measurable.
- **Visual-audit a11y contribution — zero.** The REPORT's 18 nameless buttons and 60 small tap
  targets: this component contributes **none**. It renders no interactive element, and the
  `/#/palettes` rows I inspected in `REPORT.json` attribute all eight small targets to the slug
  editor and the L/A/B/ALPHA channel spans, and the single nameless button elsewhere. The strip is
  a non-interactive `aria-hidden` div — it cannot appear in either count. Confirmed against
  `docs/tranches/V/megatranche/audit/visual/REPORT.json` (`/#/palettes`, all four matrices).
- **Console / page errors on the strip's routes** — clean. `/#/palettes`, `/#/browse`, `/#/generate`,
  `/#/mix`, `/#/extract` all show `pageErrors: 0`, `consoleErrors: 0`, `horizontalOverflow: 0` in
  the Safari matrix. The one console error in the whole run (`WebGL: context lost`) is on `/#/`.

---

## 4. Commands run (reproducible)

```bash
# component + consumers
grep -rn "PaletteColorStrip" --include="*.vue" --include="*.ts" . | grep -v node_modules

# dead prop
grep -rn "weights" --include="*.vue" demo/ | grep -v "PaletteColorStrip.vue"     # → empty

# vacuous gate
grep -rln "ColorStrip\|WEIGHT_FLOOR\|segmentPct" test/ e2e/                       # → exit 1

# versions
node -e 'console.log(require("./node_modules/vue/package.json").version)'          # 3.5.35
node -e 'console.log(require("./api/node_modules/zod/package.json").version)'      # 4.4.3

# the pure-function simulation (C-1, C-3, C-8)
node -e '<segmentPcts body verbatim over the case table in §C-1>'

# the live fixture (C-1, C-6)
node scratchpad/mkpng.mjs        # 200x200 PNG, populations 0.96/0.01/0.01/0.01/0.01
# → drop on /#/extract at localhost:9000, read the strip children's style.width
```

Browser probes used: 8 Playwright calls total against the live dev server on `localhost:9000`
(navigate ×2, resize ×1, evaluate ×3, run_code ×3), all read-only. No source file was modified;
the only artefacts written are this report and a throwaway PNG in the session scratchpad.

---

## 5. Verdict

**DEFECTIVE.** The component's single stated invariant is measurably false on the shipped path
(C-1, 6.25% where 8% is promised, live-measured); half its rendering surface renders zero pixels
(C-2, measured 0 px in a 200 px card); one bad input blanks it entirely with no diagnostic while the
correct guard sits 40 lines away in a sibling (C-3); the wire silently discards the very field the
component exists to visualise (C-6); and nothing anywhere in the repo would notice any of it (C-4).
