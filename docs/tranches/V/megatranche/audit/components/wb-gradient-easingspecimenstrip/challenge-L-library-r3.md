# CHALLENGE-L (r3) — library structure · `EasingSpecimenStrip.vue`

## Model receipt

I observe myself to be **Opus 5 (1M context)**, exact model id `claude-opus-5[1m]` — the tier this
seat was spawned with, declared explicitly in the spawn. Not inherited, not undeclared.

---

## Provenance — why this file is `-r3`, not `challenge-L-library.md`

The brief names `challenge-L-library.md`. That path was **already occupied** when this seat opened:

```
$ ls -la docs/tranches/V/megatranche/audit/components/wb-gradient-easingspecimenstrip/
-rw-r--r--  46102  Jul 28 11:06  challenge-L-library.md      ← an r2 pass, 13 findings
```

`challenge-L-library.md` is itself an r2 that rewrote an r1 in place; unlike the C and D seats in
this same directory (which preserved `*.pass-1-2026-07-27.md`), **no r1 copy of L survives** — that
evidence is already lost once. Overwriting it a second time would destroy 46 KB of standing
evidence, which no reading of the brief requires. The sibling corpus
`components/wb-gradient-easingeditor/` establishes the house form for exactly this case
(`challenge-L-library.md` + `-r2.md` + `-r3.md` + `-r4.md` side by side). This report follows it.

**This pass was run blind first.** The corpus was re-derived from source and from live probes before
r2 was opened; r2 was read only at write time, to separate corroboration from novelty. That
separation is stated honestly below — I claim novelty for eight findings and corroboration (with my
own independently measured numbers) for four.

---

## Subject and corpus

| file | role |
|---|---|
| `demo/workbenches/gradient/GradientVisualizer/easing/EasingSpecimenStrip.vue` | the strip (subject), 215 lines |
| `demo/workbenches/gradient/GradientVisualizer/easing/easingCatalogue.ts` | tile catalogue + literal mint + glyph painter + interval identity |
| `demo/workbenches/gradient/GradientVisualizer/easing/useSpecimenRows.ts` | per-interval row derivation |
| `demo/workbenches/gradient/GradientVisualizer/easing/EasingAuthoringStage.vue` | the `<EasingPicker>` seat |
| `demo/workbenches/gradient/GradientVisualizer/GradientEasingEditor.vue` | the host (owns every radius in the corpus) |
| `demo/workbenches/gradient/composables/useGradientModel.ts` | the interval **model** — the boundary this pass indicts |

Repo `/Users/mkbabb/Programming/value.js`, branch `tranche-u`. HEAD at probe time `f36f780c`
(the brief cites `c654824e`; the delta is docs-only — `git log --oneline -1 -- demo/workbenches/gradient/GradientVisualizer/`
returns `f2c8f565 feat(v-w44)!: adopt @mkbabb/glass-ui 7.0.0`, i.e. the component tree is unchanged
between the two).

---

## Verdict

**DEFECTIVE.** Eight new findings (two MAJOR), on top of four independently corroborated ones.

The r2 pass named the dominant mechanism as *published surfaces under-specify what they already
know*. This pass finds a second, orthogonal mechanism that r2 did not reach:

> **The dependency between the gradient's persisted MODEL and the design system's view payload runs
> backwards.** `GradientInterval` — the thing that is parsed from CSS, serialized to CSS, held in
> app state, and asserted on by the library's own test tree — *is literally typed as*
> `@mkbabb/glass-ui/easing`'s `EasingPickerValue`, a widget's `v-model` payload. Every downstream
> contrivance in this corpus (fabricated `steps`/`term`/`points` fields, a non-serializable callable
> in persisted state, a catalogue that must know what a gradient is) is a consequence of that one
> inverted edge.

---

## Corroboration — findings I re-derived independently, with this seat's own numbers

I record these because independent reproduction is worth more than a citation, and because two of
them are the marks the brief demands I judge (M3 and MT-F030).

| r2 id | claim | this seat's independent evidence |
|---|---|---|
| L-1 | the catalogue silently drops 6 of value.js's 30 presets | **reproduced end-to-end in the live app** — see §Reproduction below |
| L-5 | glass 7's Chip CSS is orphaned (the M3 mark) | `walk()` over every loaded stylesheet: **0 `.glass-chip*` selectors in 5 352 rules**; and `dist/styles/glass.css` imports 18 glass partials, `glass-chip.css` is **not** one of them |
| L-4 | the 27-tile strip is mounted per interval row | measured before/after adding one stop: **27 → 54 tiles, 18 541 → 37 082 path chars, 511 → 711 elements, 0 → 27 duplicate `data-specimen` ids** |
| L-12 | MT-F030 radius incoherence | measured registers **4 / 6 / 16 / 9999 px** in one 462 × 197 card; `--radius-input` measures `0.25rem` |

### Reproduction of the strongest defect (r2 L-1), executed live

`easingCatalogue.ts:174` declares an *ordering* constant and `:191` uses it as a **whitelist**:

```ts
const FAMILY_ORDER = ["css", "sine", "quad", "cubic", "expo", "circ", "back", "steps"];
…
return FAMILY_ORDER.filter((f) => byFamily.has(f)).map(…)
```

Offline, replaying the module's own `familyLabelFor` against the published `bezierPresets`:

```
$ node --input-type=module -e "import { bezierPresets } from '@mkbabb/value.js/easing'; …"
library presets: 30
families built: css,cubic,sine,quad,quart,quint,expo,circ,back
families kept:  css,sine,quad,cubic,expo,circ,back
families DROPPED: quart,quint
tiles dropped: ease-in-quart, ease-out-quart, ease-in-out-quart,
               ease-in-quint, ease-out-quint, ease-in-out-quint
bezier tiles kept: 24  +3 steps = 27
```

Live DOM agrees exactly: `document.querySelectorAll(".specimen-tile").length === 27`.

The producer's preset menu is **not** narrowed — glass builds it as `Object.keys(bezierPresets)`
(`node_modules/@mkbabb/glass-ui/dist/easing.js`: `H = Object.keys(P)`). So the two catalogues
disagree by six entries, and the disagreement is user-reachable in three clicks:

```
$ node scratchpad/probe4.mjs        # chromium, http://localhost:9000/#/gradient
INIT  {"head":"1 → 2 linear","literal":"cubic-bezier(0, 0, 1, 1)","pressed":["linear"]}
options 30 ["linear","ease",…,"ease-in-quart","ease-out-quart",…,"ease-in-out-back"]
AFTER ease-in-quart {"head":"1 → 2 custom",
                     "literal":"cubic-bezier(0.895, 0.03, 0.685, 0.22)",
                     "pressed":[]}
```

Selecting a **named library preset** through the design system's own control makes the row read
`custom` and un-presses every tile. This is not a hypothesis; it is the app's behaviour today.

---

# New findings

### L3-1 — MAJOR · the persisted gradient model is typed by a widget's `v-model` payload

**Evidence.** `demo/workbenches/gradient/composables/useGradientModel.ts:12,49`

```ts
import type { EasingPickerValue } from "@mkbabb/glass-ui/easing";
…
export type GradientInterval = EasingPickerValue;
```

`GradientInterval` is not a view prop. It is model truth: it is an element of
`GradientModelState.intervals` (`useGradientModel.ts:57`), it is what `gradientParse.ts` produces
from a CSS string, it is what `serializeCoalescedGradient` consumes, and it is what the **library's**
test tree asserts on (`test/gradient-v4-consume.test.ts:20-24` builds a `GradientModelState`
literal). Its type is owned by a UI package, in a file whose own docblock calls the picker payload
"the persisted TRUTH".

**Mechanism.** Direction of dependency inverted: `model → design-system view contract`. A domain
model must be owned by the layer that persists and serializes it; a widget payload is a
*presentation* contract that the view layer should adapt *to* the model, never the reverse.

**The fabrications this forces are visible in the corpus** — each is a field the domain does not
have, invented to satisfy the widget's type:

| site | fabrication |
|---|---|
| `easingCatalogue.ts:124-125` | every **bezier** tile carries `steps: 4, term: "jump-end"` — meaningless for a bezier |
| `easingCatalogue.ts:150-151` | every **steps** tile carries `points: [0, 0, 1, 1]`, commented *"Neutral transient cache — steps mode never reads points"* |
| `useGradientCSS.ts:53-62` | `linearInterval()` fills all six fields to seed one linear interval |
| model state | `fn: (t) => number` — a **live callable inside persisted state**; `useGradientCSS.ts:119-123` then has to treat it as "only a live cache" and re-derive from `css` when absent |

A comment that says a field is a "neutral transient cache" is the type telling you it is the wrong
type.

**Cure (architectural transposition).** The gradient owns its own interval:

```ts
// demo/workbenches/gradient/composables/useGradientModel.ts
export type GradientInterval = { readonly css: string };   // the persisted truth, entire
```

`css` is already the declared truth and already round-trips through `@mkbabb/value.js/css`
+ `/easing` (`easingFnOf`, `useGradientCSS.ts:120-131`, with its own memo cache at `:69`). Authoring
parameters (`mode`, `points`, `steps`, `term`) and the live `fn` are **view state of the open row**,
derived at the `EasingAuthoringStage` boundary by one adapter:

```ts
// easing/pickerAdapter.ts — the ONLY module that knows EasingPickerValue exists
export const toPickerValue = (i: GradientInterval): EasingPickerValue => …
export const fromPickerValue = (v: EasingPickerValue): GradientInterval => ({ css: v.css });
```

Consequences: the model becomes JSON-serializable (URL/share/persist for free), the catalogue stops
minting five fields to press one tile, `SpecimenTile.payload` collapses to its `css`, and a glass 8
change to `EasingPickerValue` reaches exactly one 6-line file instead of the model, the parser, the
serializer and the library's test tree.

---

### L3-2 — MAJOR · the **library's** test tree imports **demo feature internals**

**Evidence.** `test/gradient-v4-consume.test.ts:6-11`

```ts
import { easingFnOf, linearInterval, … } from "../demo/workbenches/gradient/composables/useGradientCSS";
import { interpolateStopColors }        from "../demo/workbenches/gradient/composables/useGradientInterpolation";
import type { GradientModelState }      from "../demo/workbenches/gradient/composables/useGradientModel";
import { SPECIMEN_TILES }               from "../demo/workbenches/gradient/GradientVisualizer/easing/easingCatalogue";
```

Against the declared law, `vitest.config.ts:19-22`:

> *"T.W1-src §5: **the test tree mirrors the src shape** (test/units/color/…, test/parsing/…,
> test/transform/, test/quantize/)"*

and against the demo's own test home, which exists and is already wired
(`vitest.config.ts:23-25` includes `demo/test/**/*.ts`; the tree holds `demo/test/export/`,
`demo/test/glass/`, `demo/test/palettes/`).

**Mechanism.** Wrong home ⇒ wrong direction. `test/**` is the *library's* gate. Four edges now run
`library-gate → demo/workbenches/gradient/<four levels deep>`. A demo-side rename (exactly what
findings L3-1, r2 L-1 and r2 L-8 all prescribe) reds `npm test`, the publish gate for
`@mkbabb/value.js`, for a reason that has nothing to do with the library. It also hides four demo
assertions from the demo's own suite, where a reader would look for them.

**Reproduction.** `git mv demo/workbenches/gradient/GradientVisualizer/easing/easingCatalogue.ts …`
→ `npm test` fails on an unresolved import in `test/`, with `src/` untouched.

**Cure.** Move the file to `demo/test/gradient/v4-consume.test.ts` — zero config change (the glob
already covers it), and the four relative paths shorten. If the *library* wants a gate on "Value 4
capabilities the gradient consumes", that gate belongs in `test/` phrased against `src/` alone —
never against a demo module.

---

### L3-3 — MINOR · the strip's row derivation reaches the **boot** layer through a bang-asserted inject, and the injection has two disciplines

**Evidence.** The chain from this component:

```
easing/useSpecimenRows.ts:13,40   useSafeAccentFn("resting")
  → demo/color-session/useContrastSafeColor.ts:345-348
        const ambient = inject(INK_AMBIENT_KEY)!;     ← non-null assertion
  → provided by demo/color-picker/composables/boot/useAtmosphereBoot.ts:54,82
```

Two disciplines for one key, live in the tree simultaneously:

| site | form |
|---|---|
| `color-session/useContrastSafeColor.ts:347` | `inject(INK_AMBIENT_KEY)!` |
| `scenes/about/markdown/composables/useMarkdownColors.ts:25` | `inject(INK_AMBIENT_KEY)!` |
| `picker/controls/ComponentSliders/ConsoleRail.vue:128` | `inject(INK_AMBIENT_KEY, null)` |
| `picker/visual/HeroBlob.vue:95` | `inject(INK_AMBIENT_KEY, null)` |

**Mechanism.** A *pure derivation* composable (`useSpecimenRows` computes rows from stops and
intervals) transitively requires a **boot-layer** provide. Feature → shell/boot is the edge this
seat is chartered to find. The `!` converts a missing provider into a `TypeError` at
`useContrastSafeColor.ts:356` (`ambient.value` on `undefined`) rather than a degraded ink.

**Reproduction.** NONE — hypothesis at the runtime level (no standalone mount harness exists for the
gradient workbench, which is itself the point). The *dual discipline* is confirmed by the four
citations above.

**Cure.** One discipline, at the key's home: `demo/color-session/keys.ts` publishes the key, so it
should publish the accessor too — `useInkAmbient()` returning a documented fallback (the
`inject(K, null)` sites already prove a fallback is meaningful). Then `useSpecimenRows` depends on
`color-session`, not on whether `useAtmosphereBoot` ran.

---

### L3-4 — MAJOR · a single-select group is hand-built from 27 independent toggles while the design system publishes `ToggleGroup`

**Evidence.** glass-ui 7.0.0 exports the exact component type
(`node_modules/@mkbabb/glass-ui/dist/components/toggle-group/index.d.ts`):

```ts
export { default as ToggleGroup, type ToggleGroupValue, … } from "./ToggleGroup.vue";
export { default as ToggleGroupItem, type ToggleGroupItemProps, } from "./ToggleGroupItem.vue";
```

published at `exports["./toggle-group"]`. The strip instead composes 27 independent
`Chip mode="selectable"` buttons (`EasingSpecimenStrip.vue:98-117`) inside a bare
`role="group"` (`:88`), and re-implements single-select semantics by hand:

```ts
function onTileToggle(tile: SpecimenTile, on: boolean) {
    if (on) emit("select", tile);          // EasingSpecimenStrip.vue:33-35
}
```

The dead `else` branch **is** the tell: a selectable chip is a boolean toggle, so "you cannot
un-select" has to be enforced by dropping an event on the floor.

**Measured consequence.** 27 `<button>` elements per strip, none carrying `tabindex="-1"` ⇒ 27 tab
stops per strip. With two intervals the page carries 54 (measured: `.specimen-tile` count 27 → 54
after adding one stop). A `ToggleGroup` is a roving-tabindex composite: one tab stop, arrow-key
traversal — which is also the correct keyboard model for a horizontal specimen gallery.

**Standing edict.** *"Reuse existing component-type names"* — this is the canonical case: the type
exists, is published, and is named after the concept.

**Cure.** `<ToggleGroup type="single" v-model="selectedId">` + `<ToggleGroupItem :value="tile.id">`,
with the glyph/label as item content. Deletes `onTileToggle`, deletes the `role="group"` hand-rig,
and moves "an interval always has a curve" from a dropped event to the component contract.

---

### L3-5 — MINOR · "unwrap a value.js `Result` or throw" has three copies, because value.js publishes no unwrap

**Evidence.** Three byte-similar copies of one helper:

| site | body |
|---|---|
| `demo/.../easing/easingCatalogue.ts:98-104` | `if (result.ok) return result.value; throw new Error(\`Invalid easing catalogue entry "${source}": ${result.error.code}\`)` |
| `demo/workbenches/gradient/composables/useGradientCSS.ts:71-77` | `if (result.ok) return result.value; throw new Error(\`Invalid gradient easing "${source}": ${result.error.code}\`)` |
| `@mkbabb/glass-ui/dist/easing.js` (minified) | `function U(e,t){ if(!t.ok) throw Error(\`${e}: ${t.error.code}\`); return t.value }` |

Both demo copies are `function easingValue(result: ReturnType<typeof CubicBezier>, source: string)`
— note the signature is typed by *one particular producer function's return*, so it does not even
generalize across `CubicBezier` / `steppedEase` / `linearEasing` without the structural-typing
accident that they share a `Result` shape.

**Mechanism.** Same shape as r2's L-2 (missing serializer): value.js exports `Result`-returning
constructors and no `unwrap`/`expect`. Every consumer therefore writes the same four lines, and the
error *prose* — the only thing that differs — becomes the de-facto provenance channel.

**Cure.** value.js publishes it once beside the Result type:
`export function expect<T, E extends { code: string }>(r: Result<T, E>, ctx: string): T`. Three
copies die; the message format becomes uniform, which is what a diagnostics channel needs.

---

### L3-6 — MINOR · one concept, two exported type names across the boundary, paid for with a no-op cast

**Evidence.** `easingCatalogue.ts:136`

```ts
const position = term as JumpPosition;      // term: JumpTerm
```

where the two types are provably identical:

- value.js `src/easing.ts:13` — `export type JumpPosition = "jump-start" | "jump-end" | "jump-none" | "jump-both";`
- value.js `src/easing.ts:68` — `export const jumpTerms = ["jump-start", …] as const;`
- glass-ui `dist/components/easing/composables/useEasingPicker.d.ts` — `import { jumpTerms } from "@mkbabb/value.js/easing"; export type JumpTerm = (typeof jumpTerms)[number];`

Glass re-mints value.js's own union under a second name, from value.js's own const. The demo imports
`JumpPosition` from one package and `JumpTerm` from the other (`easingCatalogue.ts:27-35`) and casts
between them.

**Mechanism.** Unique-semantic-ownership violation at the type level. The cast is a no-op that
compiles either way, which makes it *worse* than a real cast: it silently ratifies the duplication
and will keep compiling if the two unions ever diverge in one direction.

**Cure.** glass re-exports the value.js type rather than re-minting it
(`export type { JumpPosition } from "@mkbabb/value.js/easing"`); the demo imports one name and
deletes the cast. Filed on the same M3/P7 glass packet.

---

### L3-7 — MINOR · glass's easing defaults exist as constants but are not on the published surface, so the demo hardcodes them three times

**Evidence.** `node_modules/@mkbabb/glass-ui/dist/components/easing/constants.d.ts`

```ts
export declare const DEFAULT_BEZIER_PRESET: "ease-out-back";
export declare const DEFAULT_STEP_COUNT = 4;
export declare const DEFAULT_STEP_TERM: "jump-end";
export declare const CUSTOM_PRESET: "custom";
```

but `dist/components/easing/index.d.ts` — the whole of `exports["./easing"]` — re-exports only
`EasingPicker`, `EasingConfigurator`, `useEasingPicker` and five types. The constants are
unreachable from `@mkbabb/glass-ui/easing`.

The demo therefore restates them by hand:

| site | restated |
|---|---|
| `easingCatalogue.ts:124-125` | `steps: 4, term: "jump-end"` |
| `easingCatalogue.ts:152` | `steps: n, term` seeded from `stepsTile("steps", "n = 4", 4, "jump-end")` at `:187` |
| `useGradientCSS.ts:59-60` | `steps: 4, term: "jump-end"` |

**Mechanism.** A published-surface hole: the package models the constant, then hides it. Consumers
re-declare, and the demo's tile now silently encodes a producer default it cannot observe.

**Cure.** `export * from "./constants"` on the easing barrel (they are already `declare const`
literals — zero runtime cost); the demo imports `DEFAULT_STEP_COUNT` / `DEFAULT_STEP_TERM`. Same
packet as L3-6.

---

### L3-8 — MINOR · the strip's event payload is a catalogue object carrying a factory

**Evidence.**

```ts
// easingCatalogue.ts:88-91
    /** Mint the full authored-curve payload a press selects. */
    payload: () => EasingPickerValue;

// EasingSpecimenStrip.vue:26-28
const emit = defineEmits<{ select: [tile: SpecimenTile] }>();

// GradientEasingEditor.vue:73-76
function onTileSelect(index: number, tile: SpecimenTile) {
    emit("update-interval", index, tile.payload());
}
```

**Mechanism.** The child hands the parent a *closure*, and the parent's contract is therefore typed
by the catalogue module (`GradientEasingEditor.vue:34` imports `type SpecimenTile` for no other
reason). The strip's public surface should be the selection, not the catalogue's internal shape.
Secondarily, the factory is contrivance: every field of `EasingPickerValue` is `readonly`
(`useEasingPicker.d.ts`), so a frozen constant conveys the same guarantee without a call.

**Cure (composes with L3-1).** `emit("select", tile.css)` — a string. `payload` and `SpecimenTile`
stop crossing the component boundary entirely, and the parent's import at
`GradientEasingEditor.vue:34` disappears.

---

## The Safari captures — what is visually wrong, and who owns it

Read: `audit/visual/shots/safari-desktop-light/gradient.png`,
`…/safari-desktop-dark/gradient.png`, and the owner witness
`audit/visual/owner-marked/OM-4-easing-radius-incoherence.png`.

**What the capture shows.** The open interval row is a 16 px card containing, top to bottom: a 6 px
ramp bar; a scrolling strip of **perfect circles**, each bearing a sparkline and a mono label,
grouped under `css` / `sine` eyebrows with hairline dividers; then a 6 px readout well holding
`cubic-bezier(0, 0, 1, 1)` and two nearly-square (4 px) ghost buttons. In **both** schemes the
pressed tile (`linear`) is distinguishable from its neighbours **only** by ink colour — its fill,
border and elevation are identical to the unpressed tiles.

**Measured, live** (`scratchpad/radius-probe.mjs`, chromium, `/#/gradient`, desktop 1440×1000):

```
rowCard       radius 16px    462.0 x 197.0    --radius-card
rampStrip     radius  6px    436.0 x  20.0    rounded-md
readoutRail   radius  6px    436.0 x  32.0    rounded-md
railBtn       radius  4px     24.0 x  24.0    var(--radius-input)  [token measures 0.25rem]
specimenTile  radius 9999px   45.2 x  43.8    .glass-capsule
specimenDot   radius 9999px   10.0 x  10.0    hand-rolled literal
pressed tile bg  oklab(0.925644 0.0094459 0.0291917 / 0.83872)
rest    tile bg  oklab(0.925644 0.0094459 0.0291917 / 0.83872)   ← byte-identical
pressed border   rgb(198, 180, 159)  ==  rest border
```

Every radius declaration in the corpus (exhaustive):

```
$ grep -rn "rounded\|radius" demo/workbenches/gradient/GradientVisualizer/easing/ \
                             demo/workbenches/gradient/GradientVisualizer/GradientEasingEditor.vue
GradientEasingEditor.vue:114  class="rounded-card …"              → 16px   row shell
GradientEasingEditor.vue:153  class="h-5 rounded-md …"            →  6px   ramp
GradientEasingEditor.vue:176  class="… rounded-md bg-well …"      →  6px   readout rail
GradientEasingEditor.vue:242  border-radius: 9999px;              → 9999   .specimen-dot (literal, not token)
GradientEasingEditor.vue:274  border-radius: var(--radius-input); →  4px   .rail-btn
EasingSpecimenStrip.vue       (none — the tile radius is glass's)
EasingAuthoringStage.vue      (none — the producer .glass-card, 16px)
```

**The split the brief demands.**

*Glass-owned (M3 / I-9 / D58 — FOLD-bank, do not patch locally).* The circles and the dead pressed
state are one defect with one cause. Glass 7.0.0 ships `.glass-chip--cell { border-radius:
var(--radius-card) }` and `.glass-chip[data-mode="selectable"][data-state="on"] { background-color:
var(--accent-band); border-color: var(--accent-edge); color: var(--accent-ink) }` in
`dist/styles/glass/glass-chip.css`, and **nothing imports that file**:

```
$ cd node_modules/@mkbabb/glass-ui/dist && grep -rl "glass-chip.css" .
   (no output)
$ tr ';' '\n' < styles/glass.css | grep -c "@import"      # 18 glass partials imported
18                                                        # glass-chip.css is not among them
$ grep -c "glass-chip--cell" glass-ui.css                 # the compiled SFC bundle
0
```

Live confirmation from inside the running app: a walk over **5 352** rules in every loaded
stylesheet finds `cellRule: null`, `onRule: null`, `chipBase: null` — while the element still
carries the class (`classList` includes `glass-chip`, `glass-capsule`, `glass-chip--cell`). The
class is applied and styled by nothing. So the tile falls back to `.glass-capsule`
(`border-radius: var(--radius-pill)` → 9999 px, plus the *floating* rung's rim/shadow) inside a row
the house design declares flat. **A local `.specimen-tile { border-radius }` rule would satisfy the
owner's eye and commit MT-F014 — the masking fallback the standing edict forbids.** Banked on M3.

Two further consequences of the same orphan, worth carrying on the M3 packet:
- the pressed wash is dead (measured above: pressed fill ≡ rest fill), so the seat's docblock claim
  at `EasingSpecimenStrip.vue:160-162` — *"The producer Chip cell recipe … carries press/hover
  semantics **+ the pressed wash**"* — is false in the shipped build;
- glass's coarse-pointer floor `@media (pointer: coarse) { .glass-chip--interactive { min-inline-size:
  var(--touch-target, 2.75rem); min-block-size: … } }` is orphaned too. Measured under
  `hasTouch: true, isMobile: true, 390×844`: the tile is still **45.2 × 43.8 px** — 0.2 px under the
  44 px floor that glass itself specifies and that `--touch-target: 2.75rem` still resolves to.

*Ours (MT-F030).* Four registers, only one of them role-bearing: `rounded-md` is a raw Tailwind
scale step used on the two widest elements in the row; `9999px` is hand-rolled where
`var(--radius-pill)` exists; and `--radius-input` silently measures **4 px**, not the 10 px glass's
own theme declares — two `:root` declarations of `--radius` are live in the document
(`0.625rem` from glass's `@theme`, `0.25rem` from the Tailwind stock block inside
`dist/styles/components.css`, which is `@import`ed `layer(components)` and therefore **wins** over
the theme layer). The house register is real but nothing in this corpus derives from it.

Read together: the owner's *"too rounded in some areas"* is glass's (9999 px tiles), and *"not
rounded enough in others"* is ours (6 px rails, 4 px buttons in a 16 px card) — and the second half
is partly a *token* defect, not a styling choice, because `--radius-input` never had the value the
design authority documents.

---

## Greenfield lattice — what this would be with no legacy

Stated concretely, as five modules and one rule per edge.

```
@mkbabb/value.js                     — owns easing MATH and CSS TEXT
  /easing   : bezierPresets, CubicBezier, steppedEase, JumpPosition, Result
            + NEW  presetFamily(name)          the taxonomy the names already encode  (kills r2 L-1)
            + NEW  samplePath(fn, n)           fn → unit-box polyline                  (kills 3 copies)
            + NEW  expect(result, ctx)         the one unwrap                          (kills L3-5)
  /css      : parseTimingFunction
            + NEW  serializeTimingFunction     the round-trip partner of the parser    (kills r2 L-2)
                                               precedent: serializeCssColor, src/css/grammar.ts:289

@mkbabb/glass-ui                     — owns MATERIAL and INTERACTION
  /easing        : EasingPicker, useEasingPicker, + re-export the constants           (kills L3-7)
                   readout ≡ serializeTimingFunction, JumpTerm ≡ JumpPosition          (kills L3-6)
  /chip          : Chip — cell shape + a size rung that reaches specimen scale         (kills r2 L-6)
  /toggle-group  : the single-select composite the strip should be                     (kills L3-4)
  /fading-scroll : FadingScroll — exposing its port element                            (kills r2 L-7)
  /motion        : useReducedMotion, published                                         (kills r2 L-3)

demo/workbenches/gradient/model/     — owns the DOMAIN
  interval.ts    : type GradientInterval = { readonly css: string }                    (kills L3-1)
  gradient.ts    : stops, intervals, serialize/parse — no glass import anywhere

demo/workbenches/gradient/easing/    — owns this FEATURE's view
  pickerAdapter.ts : the ONLY module that names EasingPickerValue        (~6 lines)
  specimens.ts     : SPECIMEN_TILES = presets sorted by presetFamily(),  no whitelist
                     glyph = samplePath(fn), css = serializeTimingFunction(ast)
  EasingSpecimenStrip.vue : ONE instance in the pane, bound to the open interval,
                            emits a css string                          (kills r2 L-4, L3-8)

demo/test/gradient/                  — the demo's assertions live in the demo's suite  (kills L3-2)
```

Two structural moves carry most of the value:

1. **Sink the shared knowledge one level.** Taxonomy, serializer, sampler and unwrap are all pure
   functions over types value.js already owns. Each one currently lives in 2–3 consumer copies
   *because it has no home*. Give it the home and the copies delete themselves — no shim, no alias,
   no dual path.
2. **Make the strip a singleton.** It is a constant catalogue rendered as furniture on every row;
   only one row can ever be open. One instance bound to the open interval removes the `visible`
   prop, the scoped `rowEl.querySelector` (needed only because 27 `data-specimen` ids are duplicated
   per extra interval — measured), and the O(rows) DOM mass (measured: +200 elements and +18.5 KB of
   path strings per added stop).

---

## Negative proofs — hypotheses this seat killed

| hypothesis | verdict | proof |
|---|---|---|
| the demo reaches into `src/` internals or a deep `dist/` path | **FALSE** | `grep -rn "@src/" demo` → no hits outside `.md` reference pages; every `@mkbabb/value.js/*` and `@mkbabb/glass-ui/*` specifier in `demo/` is a real key in the respective `exports` map (18 glass subpaths, 5 value subpaths, all present). A real npm consumer could write every import in this corpus verbatim. |
| the strip's glass imports are unpublished paths | **FALSE** | `exports["./chip"]` and `exports["./fading-scroll"]` both exist in `@mkbabb/glass-ui@7.0.0`. |
| the "three parallel `useDark` stores" defect is still alive here | **FALSE** | every `useGlobalDark` site in `demo/` imports it from `@mkbabb/glass-ui/dark` (6 call sites checked); `grep -rn "useDark(" demo` → no hits. The historical suspect is cured. |
| `verbatimModuleSyntax` violations in the corpus | **NONE** | every type-only import in the four easing files uses `import type` (`EasingSpecimenStrip.vue:16`, `easingCatalogue.ts:27,31,36`, `useSpecimenRows.ts:12,17`, `EasingAuthoringStage.vue:30`). |
| the `/#/gradient` route has console errors, page errors or horizontal overflow | **NONE** | `REPORT.json` for all four matrices: `pageErrors: []`, `consoleErrors: []`, `overflowX: 0`. The `bleeding` list on that route is entirely this component's subtree (`div.strip-row`, `button.glass-chip.glass-capsule`, …) but it is **benign**: `capture.mjs:107-111` records any element whose right edge passes the viewport, and the strip is a horizontal scroll port (`scrollWidth 1482 / clientWidth 436, overflow-x: auto`). It is correctly clipped — no page-level overflow. |
| the strip is a god module | **FALSE** | 215 lines, one concern (present a catalogue, emit a selection), no store, no fetch. The god-module smell in this corpus is `easingCatalogue.ts` (r2 L-8), not the SFC. |

---

## Standing-edict compliance

| edict | status in this corpus |
|---|---|
| 1 · no god modules | strip clean; catalogue holds four concerns (r2 L-8) |
| 2 · no legacy / dual paths | **violated** — three literal minters, two `easingValue` copies, two `--radius` roots; and the OM-4 cure must not become a local masking rule |
| 3 · KISS, no contrivance | **violated** — `payload()` factory (L3-8), `visible` prop, fabricated `steps`/`term`/`points` (L3-1) |
| 4 · glass-ui is the design system | **violated** — `ToggleGroup` exists and is unused (L3-4) |
| 5 · root-level styling | **violated** — `.specimen-tile` re-declares the producer's cell geometry per instance (r2 L-6); `:deep()` overrides with `!important` in the authoring seat |
| 6 · animations never deleted | respected — the `aspect-ratio` transition is tokenized and PRM-carved (`EasingAuthoringStage.vue:114`) |
| 7 · idiomatic Vue 3.5 | respected — `useTemplateRef`, reactive props destructure, no stale `defineModel` read |
| 8 · `verbatimModuleSyntax` | respected — see negative proofs |

---

## Commands run (reproduce)

```bash
# orphaned glass CSS — the M3 mark, three independent proofs
cd node_modules/@mkbabb/glass-ui/dist
grep -rl "glass-chip.css" .                      # → (empty): nothing imports it
tr ';' '\n' < styles/glass.css | grep -c @import # → 18 partials; glass-chip.css absent
grep -c "glass-chip--cell" glass-ui.css          # → 0

# live radius + material census (chromium, dev server :9000)
node probe-L3-radius-material.mjs     # rules scanned 5352; cellRule/onRule/chipBase = null
node probe-L3-tokens-coarse.mjs       # token set + two :root --radius decls + coarse-pointer box

# DOM mass, per-interval instantiation
node probe-L3-dom-mass.mjs
# BEFORE {"tiles":27,"strips":1,"paths":27,"pathChars":18541,"rows":1,"all":511,"dupIds":0}
# AFTER  {"tiles":54,"strips":2,"paths":54,"pathChars":37082,"rows":2,"all":711,"dupIds":27}

# the dropped-preset reproduction, offline and live
node --input-type=module -e "import { bezierPresets } from '@mkbabb/value.js/easing'; …"
node probe-L3-preset-drop.mjs         # AFTER ease-in-quart → head "custom", pressed []

# structure
grep -rn "@src/" demo | grep -v '\.md'                     # → (empty)
grep -rhn 'from "@mkbabb/glass-ui[^"]*"' demo | grep -o '@mkbabb/glass-ui[^"]*' | sort -u
grep -rn "rounded\|radius" demo/workbenches/gradient/GradientVisualizer/easing/ \
                           demo/workbenches/gradient/GradientVisualizer/GradientEasingEditor.vue
```

All four probe scripts are preserved beside this report
(`probe-L3-radius-material.mjs`, `probe-L3-tokens-coarse.mjs`, `probe-L3-dom-mass.mjs`,
`probe-L3-preset-drop.mjs`); each is self-contained and re-runnable against the live dev server.
**No source edits landed from this seat** — the only files written are this report and its four
probes, all under
`docs/tranches/V/megatranche/audit/components/wb-gradient-easingspecimenstrip/`.
