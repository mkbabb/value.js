# CHALLENGE-L — library structure · `GradientEasingEditor.vue`

## Model receipt

I observe myself to be **Opus 5 (1M context)**, exact model id `claude-opus-5[1m]` — the tier
this seat was spawned with. Declared, not inherited.

---

- **Axis**: L — the library structure underneath the component is wrong (module boundaries,
  ownership, direction of dependency, public surface).
- **Subject**: `demo/workbenches/gradient/GradientVisualizer/GradientEasingEditor.vue` (296 lines)
- **Repo/HEAD**: `/Users/mkbabb/Programming/value.js`, branch `tranche-u`, `c654824e`
- **Verdict**: **DEFECTIVE** — 2 BLOCKER, 6 MAJOR, 3 MINOR, 1 INFO.

The premise held. The component's own file is disciplined; what is underneath it is not. The
single sentence that names the whole shape:

> **The published library `@mkbabb/value.js` declares its own design system as a runtime
> dependency, and in return the design system owns the library demo's domain types.** The arrow
> points the wrong way at the package level *and* at the type level, and the subject component
> is the site where both are consumed.

---

## The import graph as it actually is

Traced from the subject outward. Every edge below is a real `from "…"` in the tree.

```
GradientEasingEditor.vue
├─ vue                                                       ok
├─ @lucide/vue                          (Check/ChevronDown/Copy/SlidersHorizontal)  ok
├─ @mkbabb/glass-ui            ← useClipboard      ROOT BARREL, leaf lives at ./dom   [L-7]
├─ @mkbabb/glass-ui/easing     ← type EasingPickerValue                              [L-2]
├─ ../composables/useGradientCSS        serializeIntervalRamp  (sole consumer)
├─ ../composables/useGradientModel      type Gradient{Stop,Interval,ModelState}      [L-2]
└─ ./easing/
   ├─ EasingAuthoringStage.vue → @mkbabb/glass-ui/easing (EasingPicker)
   ├─ EasingSpecimenStrip.vue  → @mkbabb/glass-ui/{fading-scroll,chip}
   ├─ easingCatalogue.ts       → @mkbabb/value.js/easing   ✅ published subpath
   │                           → @mkbabb/glass-ui/easing   (BezierPoints/JumpTerm)   [L-4]
   └─ useSpecimenRows.ts       → ../../../../color-session/useContrastSafeColor      [L-10]
```

### Negative proof, stated first

The premise's most obvious predicted defect is **absent**, and I want that on the record before
the findings:

- **The demo consumes value.js only through the published `exports` map.** `grep -rn "@src"
  demo/workbenches/gradient/ | wc -l` → **0**. Every library import in this component's chain is
  `@mkbabb/value.js/easing`, `/color`, `/css` — specifiers a real consumer can write. The T.W1
  dogfood keystone held here.
- `package.json#exports` has no `"."` entry (`node -e "'.' in require('./package.json').exports"`
  → `false`) and nothing in `src/ demo/ test/ e2e/` imports bare `@mkbabb/value.js`. Consistent,
  not a gap.
- `verbatimModuleSyntax`: all three type-only imports in the subject (lines 30, 34, 36–40) are
  `import type`. Compliant.
- Visual audit `/#/gradient`, all four Safari matrices: `pageErrors 0`, `consoleErrors 0`,
  `overflowX 0`, `main 1`, `darkClassMissing` absent
  (`docs/tranches/V/megatranche/audit/visual/REPORT.md:125,140,155,170`). The 12 `bleeding` rows
  on that route are the `FadingScroll axis="x"` strip's intended `width: max-content` subtree —
  by design, not a defect. The 6 `smallTapTargets` and 1 `namelessButton` belong to the slug bar,
  the stop handles and the shell, **not** this component: its `.rail-btn` renders exactly
  24×24 CSS px (`padding: .3125rem` ×2 + `w-3.5` icon), which clears the probe's `< 24` filter
  and sits exactly on the WCAG 2.5.8 target-size floor.

Everything below is what the trace *did* find.

---

## L-1 — BLOCKER · The published library runtime-depends on its own demo's design system

`package.json:82-85`:

```json
"dependencies": {
    "@mkbabb/glass-ui": "^7.0.0",
    "@mkbabb/keyframes.js": "^6.0.0"
},
```

These are the **only** two entries in `dependencies`. Measured:

```
$ grep -rn "@mkbabb/glass-ui\|@mkbabb/keyframes" src/ | wc -l
       0
$ grep -rn "@mkbabb/glass-ui" dist/subpaths/*.js dist/value.js | wc -l
       0
$ grep -rn "@mkbabb/keyframes" demo/ --include="*.ts" --include="*.vue" | wc -l
       0
$ grep -rn "@mkbabb/glass-ui" demo/ --include="*.ts" --include="*.vue" | wc -l
     122
```

So: the library source references glass-ui **zero** times, the shipped `dist/` references it
**zero** times, and `@mkbabb/keyframes.js` is referenced by **nothing in this repository at all**.
Every other demo-only tool — `vue`, `reka-ui`, `@lucide/vue`, `@vueuse/core`, `highlight.js`,
`tailwindcss` — is correctly in `devDependencies` (34 entries). The two packages that are *not*
in devDependencies are precisely the two that must be.

The direction is circular, declared:

```
$ node -e "console.log(require('./node_modules/@mkbabb/glass-ui/package.json').peerDependencies)"
{ …, '@mkbabb/value.js': '^4.0.0', … }
```

`@mkbabb/value.js@4.0.0` → depends → `@mkbabb/glass-ui@^7.0.0` → peer-depends → `@mkbabb/value.js@^4.0.0`.

Measured install weight forced on every consumer of a colour/easing library:

```
$ du -sh node_modules/@mkbabb/glass-ui node_modules/@mkbabb/keyframes.js
5.2M    node_modules/@mkbabb/glass-ui
608K    node_modules/@mkbabb/keyframes.js
```

**5.8 MB** — against `dist/subpaths` at **132K** — plus glass-ui's own peer set (`vue`,
`reka-ui`, `embla-carousel`, `tailwindcss`, `@mkbabb/pencil-boil`, …), to `npm i` a package whose
seven emitted entrypoints import none of it.

**Reproduction**: `npm pack` / `npm i @mkbabb/value.js@4.0.0` in an empty non-Vue project. The
install pulls a Vue design system and a keyframes engine. `import { CubicBezier } from
"@mkbabb/value.js/easing"` uses none of them.

**Why the subject is the site**: `GradientEasingEditor.vue:29,30` and its children import
`@mkbabb/glass-ui` and `@mkbabb/glass-ui/easing`. Those specifiers resolve today *because* glass-ui
is a runtime dep. Move it to `devDependencies` (where it belongs) and nothing breaks — the demo is
not published (`"files": ["dist", "!dist/gh-pages", "!dist/gh-pages/**"]`, `package.json:49-53`).

**Cure**: move both to `devDependencies`. `dependencies` becomes `{}` — the honest shape for a
zero-runtime-dependency value library. This is a one-line move with a measured 5.8 MB payoff and
it dissolves the declared package cycle.

---

## L-2 — BLOCKER · The gradient domain model is typed by a Vue component's v-model payload

`demo/workbenches/gradient/composables/useGradientModel.ts:49`:

```ts
export type GradientInterval = EasingPickerValue;   // ← @mkbabb/glass-ui/easing (line 12)
```

`EasingPickerValue` is declared in
`node_modules/@mkbabb/glass-ui/dist/components/easing/composables/useEasingPicker.d.ts` and its
own doc-comment says what it is: *"The picker's v-model payload"*. It is a **UI control's emit
shape**.

That shape is now the type of the gradient model's persisted state, and it propagates into code
with no UI in it whatsoever:

- `demo/workbenches/gradient/composables/gradientParse.ts:41` —
  `interface ParsedGradientModel { …; intervals: GradientInterval[] }`. This module is a
  **headless strict CSS-gradient parser**: zero Vue imports, zero DOM, its own header (lines 1–19)
  describes it as the model-or-reject parsing boundary. Its output contract is a Vue picker's
  v-model payload.
- `demo/workbenches/gradient/composables/useGradientCSS.ts:53-62,120-133,232-254` — the
  serializers and the timing resolver, all pure functions, all typed by it.
- `easingCatalogue.ts:90,119-126,145-153` — every tile mints one.
- The subject's own public contract, `GradientEasingEditor.vue:48-50`:
  `"update-interval": [index: number, value: EasingPickerValue]`.

The concept "an authored easing curve = mode + re-parseable CSS literal + resolved callable +
raw parameters" is a **value.js concept**. value.js owns `CubicBezier`, `steppedEase`,
`linearEasing`, `bezierPresets`, `EasingFunction`, `parseTimingFunction`. It does not own a record
that binds a literal to its callable — so its own demo had to borrow one from a package that
depends on it. Unique semantic ownership is inverted.

**Failure scenario (not hypothetical in kind)**: glass-ui 8 renames `term` → `jump` or makes
`points` optional for steps mode. That is a *component* API change, semver-legal for a design
system. It silently breaks value.js's headless gradient CSS parser, its serializers, and its
persisted model shape — none of which have anything to do with a picker.

**Cure (architectural transposition)**: value.js `/easing` mints the record.

```ts
// src/easing.ts — the library owns the concept
export interface AuthoredEasing {
    readonly mode: "bezier" | "steps";
    readonly css: string;              // the re-parseable literal, the persisted truth
    readonly fn: EasingFunction;       // the resolved callable
    readonly points: readonly [number, number, number, number];
    readonly steps: number;
    readonly term: JumpPosition;
}
```

Then `GradientInterval = AuthoredEasing` (no glass-ui import in the model at all), and glass-ui
narrows to `export type EasingPickerValue = AuthoredEasing` — the design system consumes the
library's vocabulary, which is the direction it already declares in its peerDeps. The demo's
`@mkbabb/glass-ui/easing` type imports at `useGradientModel.ts:12`, `easingCatalogue.ts:31-35`
and `GradientEasingEditor.vue:30` all collapse to `@mkbabb/value.js/easing`.

---

## L-3 — MAJOR · The public surface parses timing functions but cannot serialize one

`src/subpaths/css.ts` exports `parseTimingFunction`, `serializeCssColor`,
`serializeTimelineOptions` — and no timing-function serializer. Exhaustive check:

```
$ grep -rn "export function serialize\|export const serialize" src/css/ src/easing.ts
src/css/grammar.ts:289:export function serializeCssColor(…)
src/css/grammar.ts:429:export function serializeKeyframeSelector(…)
src/css/stylesheet.ts:81:export function serializeCssValue(…)
src/css/timeline.ts:108:export function serializeTimelineOptions(…)
```

The asymmetry has a direct, documented cost in the demo. `easingCatalogue.ts:38-56`:

```ts
// glass-ui `useEasingPicker.readout` mints `cubic-bezier(…)` by mapping each
// coordinate through `+n.toFixed(3)` and joining with `", "`, and `steps(…)`
// as `steps(${n}, ${term})`. […] a tile-minted payload and a picker-emitted
// payload for the same curve MUST be byte-identical

export function bezierLiteral(quad: readonly number[]): string {
    const [x1, y1, x2, y2] = quad.map((n) => +n.toFixed(3));
    return `cubic-bezier(${x1}, ${y1}, ${x2}, ${y2})`;
}
export function stepsLiteral(n: number, term: JumpTerm): string {
    return `steps(${n}, ${term})`;
}
```

Two independent implementations of one CSS serialization law — one private inside glass-ui's
`useEasingPicker`, one private inside a demo leaf — held in agreement by **a comment**. The
comment is the load-bearing structure. The identity match at `easingCatalogue.ts:220`
(`SPECIMEN_TILES.find((t) => t.css === interval.css)`) is a *string* comparison, so the moment
the two minters disagree by one character the pressed-tile state silently goes to `null` →
`specimenNameFor` returns `"custom"` (line 229) → every specimen row's head reads `custom` for a
named preset, with no error anywhere.

**Reproduction (deterministic from source)**: change glass-ui's `readout` join from `", "` to
`","`. `bezierLiteral` still emits `", "`. `tileIdFor` matches nothing. All 30 bezier tiles show
unpressed and every closed row's name reads `custom`.

**Cure**: `serializeTimingFunction(ast: CssTimingFunction): string` in `src/css/`, exported from
`/css` — the exact inverse of `parseTimingFunction`, round-trip tested in the existing
`test/bbnf-equivalence` idiom. `bezierLiteral`/`stepsLiteral` delete; glass-ui's private minter
deletes; one law, one home, provable by round-trip instead of by comment.

---

## L-4 — MAJOR · Two names for one enum, bridged by a cast, guarding a module-scope throw

`src/easing.ts` declares the union and the array **independently**:

```
13: export type JumpPosition = "jump-start" | "jump-end" | "jump-none" | "jump-both";
68: export const jumpTerms = ["jump-start", "jump-end", "jump-none", "jump-both"] as const;
```

glass-ui derives its name from the array
(`useEasingPicker.d.ts`: `export type JumpTerm = (typeof jumpTerms)[number];`). The demo must
therefore cast across what is structurally one type — `easingCatalogue.ts:130-137`:

```ts
function stepsTile(id: string, label: string, n: number, term: JumpTerm): SpecimenTile {
    const position = term as JumpPosition;
    const fn = easingValue(steppedEase(n, position), id);
```

Nothing ties line 13 to line 68. `steppedEase` re-checks at runtime
(`src/easing.ts:136`: `if (!(jumpTerms as readonly string[]).includes(position)) return err(…)`) —
so a divergence is not a type error, it is an `err` Result, which `easingValue`
(`easingCatalogue.ts:98-104`) converts to a **throw**.

The blast radius is maximal because the catalogue is built at **module scope**:

```
easingCatalogue.ts:198  export const SPECIMEN_FAMILIES: SpecimenFamily[] = buildFamilies();
```

**Failure scenario**: add `"jump-middle"` to `jumpTerms` (line 68) and forget `JumpPosition`
(line 13). glass-ui's `JumpTerm` widens automatically, the picker offers the term, a `stepsTile`
receives it, `steppedEase` returns `err`, `easingValue` throws — at *import evaluation* of
`easingCatalogue.ts`, which is a static import of `GradientEasingEditor.vue` → of
`GradientVisualizer.vue` → of the async `GradientPane` chunk
(`demo/shell/usePaneRouter.ts:74`). The entire gradient workbench fails to load, from a
one-line library edit, with a stack trace pointing at a demo file.

**Cure**: delete the hand-written union. `export type JumpPosition = (typeof jumpTerms)[number];`
One declaration, mechanically derived, cast deleted, divergence impossible.

---

## L-5 — MAJOR · Interval identity is positional; stop identity is not; the split spans modules

Stops carry a stable id (`useGradientModel.ts:33-37`). Intervals carry none. They are a shadow
array kept in size by a **length** watcher (`useGradientModel.ts:89-100`):

```ts
watch(() => stops.value.length, (len) => {
    const needed = Math.max(0, len - 1);
    while (intervals.value.length < needed) intervals.value.push(linearInterval());
    if (intervals.value.length > needed) intervals.value.length = needed;
});
```

It appends and truncates **at the end**, having been told only that the length changed — never
*where*. Meanwhile `removeStop` (line 122-125) removes **by id**, from anywhere.

The subject cements the positional model in its public contract
(`GradientEasingEditor.vue:48-50, 73-81`): `"update-interval": [index: number, …]`, dispatched to
`updateInterval(index, value)` (`useGradientModel.ts:134-140`), which addresses
`intervals.value[i]` by ordinal.

**Reproduction (source-derived; the three sites are quoted above)**
1. Initial state: `stops = [A@0%, B@100%]`, `intervals = [linear]`
   (`useGradientModel.ts:79-83`).
2. Press `ease-out-back` on row `1 → 2` → `updateInterval(0, …)` → `intervals = [back]`.
3. Click the rail near 0% → `GradientStopEditor` emits `add` →
   `GradientVisualizer.vue:91 addStop(colorAtPosition(p), p)` → `addStop` sorts by position
   (`useGradientModel.ts:118`) so the new stop lands **first**: `stops = [N@2%, A@0%… ]` — i.e.
   the new stop is inserted ahead of the pair that owned the curve.
4. The watcher sees `len 2 → 3`, pushes `linearInterval()` at the **end**:
   `intervals = [back, linear]`.
5. `back` — authored for `A → B` — is now interval 0, i.e. `N → A`. `A → B` is linear.

Symmetrically, `removeStop(firstStopId)` drops the **last** interval, shifting every curve one
pair to the left. The subject's specimen rows re-label themselves `1 → 2`, `2 → 3`
(`useSpecimenRows.ts:61`) and re-derive names from the shifted literals, so the UI reports the
new (wrong) assignment as truth with no error path.

*(Runtime confirmation was attempted against the live dev server at :9000 and abandoned: the
shared browser is being driven concurrently by other seats — the page navigated itself from
`/#/gradient` to `/#/extract` and then `/#/atmosphere` mid-probe, twice. Per the probe-parsimony
edict I stopped rather than fight for the session. This finding is source-derived, and every
line it depends on is quoted.)*

**Cure (architectural transposition)**: the easing belongs to the *leading stop*, not to a
parallel array.

```ts
export interface GradientStop {
    id: string;
    cssColor: string;
    position: number;
    easing: AuthoredEasing;   // the curve from THIS stop to the next
}
```

The last stop's `easing` is simply unused. Consequences: the length watcher **deletes**;
`addStop`/`removeStop` become identity-correct by construction; `updateInterval(index, …)`
becomes `updateStop(id, { easing })` — the same id-addressed door every other mutation already
uses; and the subject's emit becomes `"update-easing": [stopId: string, value: AuthoredEasing]`.
`useSpecimenRows` derives rows by pairwise walk over one array instead of zipping two.

---

## L-6 — MAJOR · Dead re-export shims, measured dead (edict 2: no aliases, no dual paths)

`useGradientModel.ts:19-29`, verbatim header **"Re-exports (preserve public API surface)"**,
re-exports nine names. Measured consumers, outside the `composables/` dir that owns them:

```
$ grep -rn "serializeCoalescedGradient\|serializeRailRamp\|linearInterval\|parseGradientCSS\|serializeGradient" \
    demo/ --include="*.ts" --include="*.vue" | grep -v "^demo/workbenches/gradient/composables/"
demo/…/GradientStopEditor.vue:9:     * The rail-normalized 90° projection (`serializeRailRamp`, …   ← a COMMENT
demo/…/easing/easingCatalogue.ts:44: // … the `linearInterval()` precedent …                        ← a COMMENT

$ grep -rn "GradientParseResult\|ParsedGradientModel" demo/ --include="*.ts" --include="*.vue" \
    | grep -v "^demo/workbenches/gradient/composables/"
(no output)
```

**Seven of the nine re-exports have zero consumers anywhere.** They preserve a public API surface
that nothing consumes.

The remaining two are worse — they are a three-hop alias chain. `useGradientInterpolation.ts:13-17`:

```ts
// Shared interpolation vocabulary — moved to its neutral `@lib/` home
// (S.W5-6 · F16 …). Re-exported here so the gradient tree's own consumers
// keep their import path.
export { INTERPOLATION_SPACES, HUE_INTERPOLATION_METHODS } from "../../../color-session/color-space-meta";
```

"so the … consumers keep their import path" is the definition of a back-compat alias. The chain
is `color-session/color-space-meta` → `useGradientInterpolation` → `useGradientModel` →
`GradientVisualizer.vue:17-21`. The sibling workbench reaches the same constants in **one** hop:
`demo/workbenches/mix/MixConfigBar.vue:18` imports them straight from
`../../color-session/color-space-meta`. One concept, two live paths, three hops on the long one.

**Cure**: delete `useGradientModel.ts:19-29` and `useGradientInterpolation.ts:17` entirely; point
`GradientVisualizer.vue` at `../../../color-session/color-space-meta` like `MixConfigBar` already
does. Net: −11 lines, one path per concept.

---

## L-7 — MAJOR · Root-barrel import of a leaf composable, and two clipboard idioms in one workbench

`GradientEasingEditor.vue:29`:

```ts
import { useClipboard } from "@mkbabb/glass-ui";
```

`useClipboard` lives at `node_modules/@mkbabb/glass-ui/dist/composables/dom/useClipboard.d.ts`
and is published behind a dedicated subpath: `"./dom": { … "import": "./dist/dom.js" }`. Measured
first-hop module weight:

```
$ grep -oE 'from *"\./[^"]+"' glass-ui.js | sort -u | wc -l   →  43 chunks
$ … summed byte size                                          →  168,303 bytes
$ grep -oE 'from *"\./[^"]+"' dom.js      | sort -u | wc -l   →   6 chunks
$ … summed byte size                                          →    7,876 bytes
```

**21× more graph** entered to reach one composable. This is systemic, not local: 37 root-barrel
imports vs 82 subpath imports across `demo/`, and **all 15** clipboard import sites go through
the barrel, **0** through `./dom`:

```
$ grep -rn "import {[^}]*\(useClipboard\|writeClipboard\)[^}]*} from \"@mkbabb/glass-ui" demo/ … | wc -l
      15
$ grep -rn "\(useClipboard\|writeClipboard\).*@mkbabb/glass-ui/" demo/ … | wc -l
       0
```

— including `demo/ui/button/index.ts`, which is literally
`export { Button } from "@mkbabb/glass-ui";` while `"./button"` exists.

Within this one workbench there are **two idioms for one concept** (and a third elsewhere in the
demo):

| site | idiom |
|---|---|
| `GradientEasingEditor.vue:94` | `const { status, copy } = useClipboard({ resetMs: 1400 })` |
| `GradientVisualizer.vue:12,128` | `await writeClipboard(coalescedCSS.value)` — `CopyResult` discarded |
| `demo/picker/visual/PointerDebugOverlay.vue:112` | `await navigator.clipboard.writeText(json)` — raw platform API, bypassing the design system entirely |

Same feature, same pane, two different feedback disciplines — the subject tracks confirmation
state, its parent discards the `CopyResult` entirely.

**Cure**: `import { useClipboard } from "@mkbabb/glass-ui/dom";` here, and one idiom per repo —
`useClipboard` wherever a tick is shown, `writeClipboard` only where nothing is shown. Retire the
37 barrel imports to their subpaths.

---

## L-8 — MAJOR · The component re-implements two glass-ui primitives the demo already uses

Edict 4 (*glass-ui is the design system*) and edict 5 (*root-level styling, never per-instance*).

**(a) The accordion.** `GradientEasingEditor.vue:61-71` + `117-147`: a `ref<number|null>`, a
`toggleInterval`, hand-wired `:aria-expanded` / `:aria-controls` / `:id`, a `v-show` panel, and a
manually rotated `ChevronDown`. glass-ui 7.0.0 ships the primitive
(`dist/components/collapsible/index.d.ts`: `Collapsible`, `CollapsibleTrigger`,
`CollapsibleContent`) — and the demo **already uses it**, in a sibling workbench:
`demo/workbenches/mix/MixSourceSelector.vue:181-226`, complete with the tokenized
`data-[state=open]:animate-collapsible-down` transition this component has no equivalent of.

**(b) The ghost icon buttons.** `GradientEasingEditor.vue:269-291` — 23 lines of scoped CSS
minting hover wash, focus ring, radius, padding and colour for `.rail-btn`. glass-ui ships
`Button` with exactly this axis (`dist/components/button/Button.vue.d.ts:4-16`):
`emphasis?: "primary" | "secondary" | "quiet" | "text"`, `iconOnly?: boolean`, `size`, `tone`.
It is reachable at `demo/ui/button` and used by **22** demo files. This component hand-rolls it.

The same pattern recurs in the subject's child: `EasingSpecimenStrip.vue:163-170` re-declares
`display:flex; flex-direction:column; align-items:center; gap; padding` on `.specimen-tile` — the
exact geometry `shape="cell"` already applies (`chipVariants.d.ts` SHAPE.cell =
`"glass-chip--cell flex-col gap-1.5 px-2 py-2.5 text-micro"`). A per-instance override of a
root-level variant the component is simultaneously requesting.

**Cure**: `<Collapsible v-model:open>` per row; `<Button emphasis="quiet" icon-only size="xs">`
for the two rail controls; delete `.rail-btn`, `.rail-btn--on` and the accordion state. If the
`--motion-accent` tinted "on" state has no `tone` that expresses it, that is a glass-ui `Button`
variant request (edict 4: it belongs there, not in demo scoped CSS).

---

## L-9 — MINOR · `easingValue` exists twice, byte-identical but for its error string

```
easingCatalogue.ts:98-104          useGradientCSS.ts:71-77
function easingValue(              function easingValue(
    result: ReturnType<typeof CubicBezier>,   ← identical
    source: string,                            ← identical
): EasingFunction {                            ← identical
    if (result.ok) return result.value;        ← identical
    throw new Error(`Invalid easing catalogue entry "${source}": …`)
                                   throw new Error(`Invalid gradient easing "${source}": …`)
}
```

One concept — *unwrap a `Result<EasingFunction, EasingIssue>` or throw* — two private homes, in
two modules already inside one import tree. Note also the signature is typed
`ReturnType<typeof CubicBezier>` yet both call sites also pass `steppedEase(…)` results
(`easingCatalogue.ts:137`, `useGradientCSS.ts:113`); it only type-checks because the two Result
shapes coincide.

**Cure**: one `unwrapEasing(result, source)` beside the model, or better —
`src/easing.ts` exports `unwrapOrThrow` as part of its Result idiom, since the throw-on-`err`
convenience is a library ergonomic, not a gradient fact.

---

## L-10 — MINOR · Two placement conventions for composables inside one workbench

```
demo/workbenches/gradient/
├── composables/                 ← gradientParse, useGradientCSS, useGradientInterpolation, useGradientModel
└── GradientVisualizer/          ← a directory named for a COMPONENT
    ├── GradientEasingEditor.vue
    └── easing/                  ← EasingAuthoringStage.vue, EasingSpecimenStrip.vue,
                                    easingCatalogue.ts, useSpecimenRows.ts
```

Feature composables live at `gradient/composables/*`; the easing feature's composable and
catalogue live three levels deeper, under a component-named directory. The consequence is the
reach at `useSpecimenRows.ts:13`:

```ts
import { useSafeAccentFn } from "../../../../color-session/useContrastSafeColor";
```

Four levels up to a cross-feature service. That edge is legitimate in *direction*
(feature → `color-session`, the shared colour kernel that `mix`, `generate` and `extract` also
consume) but its length is an artifact of the nesting, and `useSpecimenRows` is the only file in
the workbench that needs `../../../../`.

**Cure** — the greenfield lattice, stated concretely:

```
demo/workbenches/gradient/
├── model/          gradientModel.ts · gradientParse.ts · gradientSerialize.ts   (headless, no Vue SFCs)
├── easing/         easingCatalogue.ts · useSpecimenRows.ts
│                   EasingSpecimenStrip.vue · EasingAuthoringStage.vue · GradientEasingEditor.vue
├── stops/          GradientStopEditor.vue
├── code/           GradientCodeEditor.vue
├── GradientVisualizer.vue
└── GradientPane.vue
```

One rule — *a feature directory owns its components **and** its composables at the same depth* —
which is the rule `extract/` already follows (`ImageEyedropper/{ImageEyedropper.vue,composables/}`).
`GradientVisualizer/` as a container directory disappears; the deepest cross-feature reach becomes
`../../color-session/…`, matching `MixConfigBar.vue:18`.

---

## L-11 — MINOR · `demo/ui/` is 18 one-line pass-through alias dirs (edicts 2 + 3)

```
$ for d in demo/ui/*/; do … done
       1 lines, 1 glass-ui lines : demo/ui/avatar/index.ts
       1 lines, 1 glass-ui lines : demo/ui/button/index.ts
       … 18 such …
$ cat demo/ui/button/index.ts
export { Button } from "@mkbabb/glass-ui";
$ cat demo/ui/collapsible/index.ts
export { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@mkbabb/glass-ui";
```

Each is an alias directory (edict 3: no contrivance dirs) re-exporting from the **root barrel**
(L-7) of a package that publishes a dedicated subpath for each one. And the paths are genuinely
dual — `dialog` is imported through `demo/ui/dialog` by 3 files and through
`@mkbabb/glass-ui/dialog` by 2.

The subject's own parent straddles both conventions in one import block
(`GradientVisualizer.vue:9-13`):

```ts
import { Select, … } from "../../../ui/select";     // alias dir → root barrel
import { Slider }    from "../../../ui/slider";     // alias dir → root barrel
import { DockControl } from "@mkbabb/glass-ui/dock"; // direct subpath
```

**Cure**: delete `demo/ui/*/index.ts`; import every glass-ui component from its own subpath. The
memory note "shadcn-vue components in `demo/@/components/ui/` — DO NOT modify" is stale for these
18: they hold no shadcn source at all, only a re-export line.

---

## L-12 — INFO · A module-scope catalogue build, paid on gradient-pane open

`easingCatalogue.ts:198`: `export const SPECIMEN_FAMILIES = buildFamilies();` — top-level, so it
evaluates when the module is first imported, which is when the async `GradientPane` chunk loads
(`demo/shell/usePaneRouter.ts:74`), whether or not any easing row is ever expanded.

Measured (the exact catalogue arithmetic, run against this repo's own `dist/subpaths/easing.js`):

```
$ node scratchpad/cat-bench.mjs
tiles: 33
build ms (cold): 3.02
path-string bytes retained: 22651
avg ms over 10 warm builds: 1.77
```

30 `bezierPresets` + 3 steps tiles; each `glyphPath` samples the curve **49** times
(`samples = 48`, `i <= samples`) and formats two `toFixed(3)` strings per sample — 1,617 curve
evaluations and ~3,234 string formats, retained forever as 22.6 KB of SVG path text.

Not a blocker; noted because the transposition is free. `SPECIMEN_FAMILIES` is a pure function of
a frozen library constant (`bezierPresets`), so it is either (a) a lazily-built module singleton,
or (b) genuinely static data that could be generated at build time — but it is neither today, it
is eager work in the pane's critical path.

---

## Verdict

**DEFECTIVE.**

The strongest defect is **L-1 + L-2 read together**, because they are one mechanism seen from two
altitudes: *value.js has ceded ownership of its own easing vocabulary to its design system.*
At the package level that shows up as glass-ui sitting in `dependencies` of a library that
imports it zero times, in a declared cycle, costing 5.8 MB. At the type level it shows up as
`GradientInterval = EasingPickerValue` — a headless CSS parser (`gradientParse.ts`) whose data
contract is a Vue picker's v-model payload. Both cures are the same edit made in two places:
value.js mints `AuthoredEasing` and `serializeTimingFunction`, glass-ui narrows to them, and
`dependencies` empties. Everything downstream — the byte-identity comment (L-3), the
`JumpTerm as JumpPosition` cast (L-4), the duplicated literal minters — dissolves rather than
gets patched.

**Not found, and worth saying**: no deep `@src/` reach, no fabricated public surface, no
`verbatimModuleSyntax` violation, no runtime error on the route in any of the four Safari
matrices.

---

### Probe log

- Static: `grep`/`node` over `package.json`, `src/`, `dist/`, `demo/`, `node_modules/@mkbabb/glass-ui/dist/` — all commands and outputs pasted inline above.
- Measurement: `scratchpad/cat-bench.mjs` against `dist/subpaths/easing.js` (L-12), byte-size sums over glass-ui's emitted chunks (L-7), `du -sh` on installed packages (L-1).
- Visual: `docs/tranches/V/megatranche/audit/visual/REPORT.{md,json}` rows for `/#/gradient` ×4 matrices; `shots/safari-desktop-light/gradient.png` read directly (component renders correctly — strip, ramp, readout rail and disclosure all present and legible).
- Live: 3 Playwright navigations to `http://localhost:9000/#/gradient`. **Abandoned** — the shared browser session is under concurrent control by other seats (the page self-navigated to `/#/extract`, then `/#/atmosphere`, mid-evaluate, and query params `?probe=4` / `?probe=6` from other seats were observed). L-5 is therefore source-derived; every line it rests on is quoted.
- Note: production chunk composition could not be measured — `dist/gh-pages/assets/index-*.js` is **698 bytes**, the known gh-pages prod-preview empty-mount carried in `docs/tranches/V/reformation/CARRY-LEDGER.md` §F. Not claimed as a finding of this seat.
