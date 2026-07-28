# CHALLENGE-L — library structure under `demo/workbenches/mix/MixPane.vue`

> **This file is the consolidated CHALLENGE-L record (pass B).**
> A prior CHALLENGE-L seat ran this component at HEAD `32b4040e` and produced 17 findings.
> That report is **preserved verbatim, byte-identical**, at
> `docs/tranches/V/megatranche/audit/components/wb-mix-pane/challenge-L-library-pass-a.md`
> (sha1 `7e422be6…`, 39 471 bytes, committed at `37ee17dd`). Nothing in it was altered or discarded.
> This file carries pass B: an **independent** re-audit at `c654824e` under standing edict E-1
> (twice-audit), recording only what pass A did not have — new findings, one severity dissent, two
> corrections to pass-A negatives, one census correction, and the confirmations I re-derived
> myself. Read pass A first for F-1…F-17 in full; read this for the delta and the merged index.

## Model receipt

I observe myself to be **Opus 5 (1M context)** — exact model id `claude-opus-5[1m]`, the tier
explicitly declared at spawn. The seat is declared, not inherited.

## Scope + method

Subject: `demo/workbenches/mix/MixPane.vue` (58 script lines + 66 template lines = 124), and the
module lattice beneath it. Repository `/Users/mkbabb/Programming/value.js`, branch `tranche-u`,
**HEAD `c654824e`** as named in the brief. Pass A read at `32b4040e`; I re-verified every pass-A
line number I cite against `c654824e` and found no drift in the mix subtree.

Method, deliberately not a re-run of pass A's: full import-closure trace of MixPane's 12 imports to
their homes; an independent 8 300-line `tsc --traceResolution` capture of the demo program; a
consumer-enumeration census of every module MixPane's closure touches; a `demo/ui` barrel census
with importer cross-tabulation; static chunk-graph measurement of the glass-ui root barrel; an
`any`-density census of `src/` vs `demo/`; eslint run over the subject subtree with JSON output; and
the mega-tranche visual-audit rows plus `shots/safari-desktop-light/mix.png` read directly. **No
source was edited. No file outside `…/wb-mix-pane/` was written.**

I began from the premise that the lattice is wrong and tried to break each hypothesis. Two of my own
hypotheses failed and are recorded as negatives (N-B1, N-B2).

---

## Verdict

**DEFECTIVE** — concurring with pass A on the disposition, and adding five findings it did not have,
of which one is MAJOR and one is a direct correction of a pass-A "sound" certification.

The single most important thing pass B adds: **pass A certified `mixStage.ts` as "exemplary
dogfooding" (pass A, Negatives §2). It is not.** Its library *imports* are exemplary — that half of
the certification holds. But its *inbound data boundary* is the worst in the feature: the animation
reads its pigments out of the DOM as a JSON string written by a sibling component, behind a silent
`catch`. Pass A searched the file for library imports and found them clean; it did not audit the
direction of the file's own dependencies. That is finding **B-1** below.

---

## Pass B findings — the delta

### B-1 · MAJOR · NEW — and a correction to pass A's Negatives §2

**The convergence animation takes its pigment inputs out of the DOM as a JSON string, guarded by a
silent `catch` that can drop an entire palette from the animation while the math still includes it.**

`MixSourceSelector.vue:252–255` serialises palette colors into an HTML attribute:

```html
:data-mix-source="isPaletteSelected(palette.slug) ? '' : undefined"
:data-mix-colors="isPaletteSelected(palette.slug)
    ? JSON.stringify(palette.colors.slice(0, 4).map((c) => c.css))
    : undefined"
```

`mixStage.ts:126–153` reads them back out of the rendered markup:

```ts
const one = el.dataset.mixColor;
if (one) { origins.push({ ...at, css: one }); continue; }
try {
    const many = JSON.parse(el.dataset.mixColors ?? "[]") as string[];
    many.forEach((css, i) => { … });
} catch {
    /* unstamped source — skip */
}
```

`useMixingState` already owns `selectedColors` and `selectedPalettes` as reactive arrays
(`useMixingState.ts:42–43`), and `MixPane.vue:66–72` already hands the canvas `mixResult`,
`colorSpace` and `hueMethod` as props. The pigments are the **one** input that detours through
`innerHTML`, gets `JSON.stringify`'d on every render and `JSON.parse`'d on every mix. DOM
measurement is legitimate for **geometry** — `layoutCenter` at `mixStage.ts:121` reads positions,
and positions genuinely are a DOM fact. Color is not a DOM fact; it is state both modules already
share.

Two masking fallbacks ride along, both forbidden by standing edict 2 and neither counted in pass A's
F-3 tally (F-3 enumerates eleven guards in `MixPane.vue` and `MixResultDisplay.vue`; these two are in
`mixStage.ts` and are a different mechanism — not optionality, but I/O failure suppression):

- `mixStage.ts:150–152` — `catch {}` swallows a malformed `data-mix-colors` and **silently drops that
  palette's entire drop set** from the convergence. No warning, no phase change. The mix result still
  includes the palette; the animation no longer shows it.
- `mixStage.ts:122–124` — a missing `[data-mix-target]` falls back to invented coordinates
  (`root.clientWidth / 2`, `root.scrollHeight * 0.7`, `r: 28`) rather than returning `null`. The
  drops land on a guessed point with nothing there.

**Failure scenario.** Rename the attribute, change the `.slice(0, 4)` cap, or let any palette color
string break the attribute round-trip: that palette vanishes from the convergence while
`mixPalettes` still folds it into the result. The animation asserts a set of inputs that is not the
set that was mixed, and no diagnostic is emitted at any layer. The `catch` makes the failure
structurally undetectable — there is no test that can observe it and no console line that reports it.

**Reproduction.** Mechanism: the two files above at `c654824e`, file:line. End-to-end UI: **NONE** —
I did not find a UI affordance that writes a JSON-breaking string into `PaletteColor.css`, so the
ingest half is a **hypothesis**; the coupling, the `catch`, and the invented-geometry fallback are
read directly from source and are not hypotheses.

**Mechanism family.** Family D (inverted ownership) in pass A's taxonomy: a composable reaching into
another component's rendered output for data, rather than both reading the state module that already
owns it. Wrong direction of dependency, with the resulting fragility papered over.

**Cure (transposition).** Change the collector's signature so pigment arrives as an argument and only
geometry is measured:

```ts
export function collectStage(
    canvas: HTMLCanvasElement,
    sources: readonly { el: HTMLElement; css: string }[],   // pigment + its element, from state
    pool: { css: string; el: HTMLElement },
    space: SpaceId,
    hue: HueInterpolationMethod,
): Stage        // never null-by-fallback; null only when the canvas has no parent
```

`MixAnimationCanvas` assembles `sources` from `useMixingState`'s own arrays paired with a
`useTemplateRef`-registered element list. `data-mix-source` / `data-mix-target` survive as
**geometry-only** marker attributes; `dataset.mixColor`, `dataset.mixColors`, the `JSON.stringify`,
the `JSON.parse`, the `catch {}` and the invented-coordinates fallback all delete. A missing target
becomes a programming error that fails loudly, not a guess.

**Correction to pass A.** Pass A, Negatives §2 reads: *"`mixStage.ts` is exemplary dogfooding… This
is what the rest of the tree should look like."* The **import** claim is true and I re-verified it
(`mixStage.ts:15–17` pulls `lerp`/`clamp` from `/math`, three easings from `/easing`, `mixColors`
from `/color`; no hand-rolled curve, no local lerp). The **certification** is too broad: pass A
searched the file for what it imports and did not audit what it reaches for. Pass A's report contains
zero occurrences of `data-mix`, `JSON.parse` or `catch`
(`grep -n "data-mix\|JSON.parse\|catch" challenge-L-library-pass-a.md` → no hits outside a
`mixStage`-adjacent mention of the `space` type at line 165). The negative should be narrowed to:
*"mixStage's library consumption is exemplary; its inbound data boundary is B-1."*

---

### B-2 · MINOR · NEW — `demo/palettes/mix.ts` has exactly one consumer, and it lives in another feature

Pass A's F-1 correctly identifies `mixColorSequence` as a library capability homed in the demo, and
its cure — promote to `src/color/operations.ts` with a weighted circular mean — is right and better
argued than anything I would have written. Its cure then leaves the remainder in place:
*"`demo/palettes/mix.ts` shrinks to what is genuinely demo-shaped: `mixPalettes`."* That leaves the
second half of the homing error standing.

```
$ grep -rn 'palettes/mix"' demo --include='*.ts' --include='*.vue' | grep -v workbenches/mix/
(no output)
```

The module has **exactly one importer in the entire tree** —
`demo/workbenches/mix/composables/useMixingState.ts:24` — and it is in a *different feature*. So
after F-1's promotion, `demo/palettes/` would still own the mix workbench's only remaining algorithm,
and the workbench that owns the concept "mix" would still reach sideways into a data domain to
borrow it. `demo/palettes/` should own palette identity, persistence and transport; the
`LIBRARY_PORT_KEY` seam `MixPane.vue:16` uses is the correct and sufficient edge between them.

**Evidence:** the enumeration above; `useMixingState.ts:24`.
**Reproduction:** the grep, at `c654824e`.
**Cure:** `mixPalettes` and `LeftoverStrategy` move to
`demo/workbenches/mix/composables/mixPalettes.ts`. `demo/palettes/mix.ts` is deleted, not re-exported.
Combined with F-1 this leaves zero cross-feature edge for the mix algorithm: the library owns the
math, the workbench owns the orchestration, the palettes domain owns the data.

---

### B-3 · MINOR · NEW — and a partial correction to pass A's Negatives §4

**`INTERPOLATION_SPACES` is correctly homed *and* still reachable by its old path.** Pass A,
Negatives §4 certifies `color-space-meta.ts` sound because S.W5-6 · F16 moved it out of the gradient
tree to a neutral home — *"That is the exact cure this report proposes elsewhere, already applied."*
The move happened; the old path was never closed:

```ts
// demo/workbenches/gradient/composables/useGradientInterpolation.ts:17
export { INTERPOLATION_SPACES, HUE_INTERPOLATION_METHODS } from "../../../color-session/color-space-meta";
```

One binding, two import paths. `MixConfigBar.vue:18` takes the neutral one; the gradient tree keeps
its own. `color-space-meta.ts:8` documents the pass-through openly (*"the gradient composable
re-exports for its own tree"*), which makes it deliberate rather than accidental — and deliberate is
worse: it is the same pure-alias mechanism as F-13's `demo/ui/`, one file smaller, blessed by a
comment. Edict 2 forbids aliases; a re-export that adds nothing is one.

Two smaller residues in the same file: `color-space-meta.ts:7` still cites `@lib/`, an alias killed
at W43/RF-15, and the metadata array is typed `InterpolationSpaceMeta[]` — see pass A's F-5, which I
concur with and which B-3's cure should land alongside.

**Cure:** delete `useGradientInterpolation.ts:17`; the gradient tree imports
`../../../color-session/color-space-meta` directly, as Mix already does. Fix the stale `@lib/`
reference. Pass A's Negatives §4 should be narrowed to: *"correctly homed; the vacated path survives
as a re-export alias — B-3."*

---

### B-4 · SEVERITY DISSENT · pass A's F-15 is INFO; the evidence makes it MAJOR

Pass A files `PickerSpace`/`PickerColorIn<S>` as **INFO** with the note "→ double casts". The double
casts are not a stylistic consequence; they are **structurally forced**, and they sit on the exact
line where the library's guarantee is supposed to arrive.

`demo/color-session/picker-color.ts:36–37`:

```ts
export type PickerSpace = SpaceId;
export type PickerColorIn<S extends SpaceId> = Extract<AnyColor, { readonly space: S }>;
```

The library already exports `Color` (`src/subpaths/color.ts:7`), and `AnyColor` is built from it —
`dist/subpaths/color.d.ts:5–7`:

```ts
export declare type AnyColor = { [S in SpaceId]: Color<S> }[SpaceId];
```

So `PickerColorIn<S>` re-derives, as a **deferred conditional type**, a type the library hands over
**directly** as `Color<S>`. `Extract<…>` over an unresolved generic `S` cannot be reduced by the
checker, so it is not assignable from `Color<S>` — which is why the code has to launder it. Full
census at `c654824e`:

| site | cast |
|---|---|
| `demo/palettes/mix.ts:37` | `result.value **as unknown as** PickerColorIn<S>` |
| `demo/color-session/picker-color.ts:116` | `valueOrThrow(convertColor(color, space)) **as unknown as** PickerColorIn<S>` |
| `demo/workbenches/mix/MixAnimationCanvas/composables/mixStage.ts:107` | `result.value as PickerColorIn<typeof space>` |
| `demo/color-session/picker-color.ts:175` | `… as PickerColorIn<S>` |
| `demo/color-session/picker-color.ts:192` | `… as PickerColorIn<S>` |
| `demo/color-session/color-chips/sample.ts:82` | `result.value as PickerColorIn<typeof space>` |

Six sites. **Two are `as unknown as`** — TypeScript's explicit statement that the two types are not
even related — and both sit on the return value of `mixColors`/`convertColor`, i.e. precisely the
library boundary. `mixColors<S extends SpaceId>(…): Result<Color<S>, ColorIssue>`
(`dist/subpaths/color.d.ts:71`) is a fully-typed generic contract, and the demo discards it at the
moment of consumption. Two of those six (`mix.ts:37`, `mixStage.ts:107`) are inside MixPane's own
closure. The alias appears 67 times across `demo/`.

Density context, which also feeds B-5:

```
$ grep -rnE ':[[:space:]]*any\b|<any>|as any' demo --include='*.ts' --include='*.vue' | wc -l
      52
$ grep -rnE ':[[:space:]]*any\b|<any>|as any' src  --include='*.ts' | wc -l
       0
```

**Why MAJOR, not INFO.** An unused alias would be INFO. An alias that (a) is strictly weaker than the
type it renames, (b) forces two `as unknown as` casts to bridge back to that type, and (c) places
both of them on the library's own return values, is a type-safety hole at the boundary the whole
dogfood exists to validate. If `mixColors`' return shape changed tomorrow, `mix.ts:37` and
`picker-color.ts:116` would compile clean.

**Cure** (unchanged from pass A, only the severity moves): delete all three aliases; the tree speaks
`SpaceId`, `AnyColor`, `Color<S>`. All six casts delete with them — none is load-bearing; each exists
solely to bridge the alias back to the type it was derived from.

---

### B-5 · MINOR · NEW EVIDENCE for pass A's F-16 — the lint relaxation's stated rationale is false at HEAD

Pass A's F-16 establishes that no gate in the repo can see a dead import in a `.vue` file, and lists
the five scopes where unused-vars is disabled. I confirm all of it independently:

```
$ npx eslint demo/workbenches/mix/ -f json | …
files linted: 8 — every one 0 errors, 0 warnings
$ grep -c "computed" demo/workbenches/mix/MixPane.vue
1                       # the import at line 2; never used
$ grep -n "noUnused" tsconfig.base.json
(no match)              # noUnusedLocals was never set either
```

What pass B adds is that the **justification for the relaxation no longer describes this repository**.
`eslint.config.js:8–9`:

> `@typescript-eslint/no-explicit-any` — codebase has ~hundreds of intentional `any` usages
> (parser combinators, dynamic CSS values). Tightening is a separate epic.

The parser combinators live in `src/`, and **`src/` contains zero `any`** (census above). All 52 are
in `demo/`, and they are not parser combinators — they are the shell's `Ref<any>` handles (pass A's
F-9), the `PickerColorIn` bridges (B-4), and worker casts. The relaxation was written for debt that
has since been paid off in the library, and now shields only the demo-side debt it was never
argued for. That converts F-16's cure from "re-enable with `varsIgnorePattern`" into something
cheaper than pass A assumed: the rule can be re-enabled for `src/` at **zero** fallout today, and the
demo-side fallout is a bounded 52 sites, not "hundreds".

---

## Independent confirmations (pass B re-derived these; no dissent)

**C-1 · F-6 / F-7 — two resolution mechanisms, confirmed from different importers.** My own
`tsc -p tsconfig.demo.json --noEmit --traceResolution` capture:

```
======== Resolving module '@mkbabb/value.js/color' from '…/demo/color-session/picker-color.ts'. ========
'paths' option is specified, looking for a pattern to match module name '@mkbabb/value.js/color'.
Module name '@mkbabb/value.js/color', matched pattern '@mkbabb/value.js/color'.
Trying substitution './dist/subpaths/color.d.ts', candidate module location: './dist/subpaths/color.d.ts'.
File '…/dist/subpaths/color.d.ts' exists - use it as a name resolution result.

======== Resolving module '@mkbabb/value.js/css' from '…/demo/color-session/picker-color.ts'. ========
Found 'package.json' at '…/package.json'.
Entering conditional exports.
Matched 'exports' condition 'types'.
Using 'exports' subpath './css' with target './dist/subpaths/css.d.ts'.
```

Confirmed exactly as F-7 states. My cross-tabulation of the two maps, independently built:

| specifier | in `exports`? | in `paths`? | target exists? | demo uses |
|---|---|---|---|---|
| `@mkbabb/value.js` (bare) | no | yes → `./dist/index.d.ts` | **no** | 0 |
| `…/parsing` | no | yes | **no** | 0 |
| `…/units` | no | yes | **no** | 0 |
| `…/color` | yes | yes | yes | 25 |
| `…/math` | yes | yes | yes | 6 |
| `…/easing` | yes | yes | yes | 5 |
| `…/quantize` | yes | yes | yes | 4 |
| `…/transform` | yes | yes | yes | 0 |
| `…/css` | yes | **no** | yes | 10 |
| `…/value` | yes | **no** | yes | 0 |

```
$ ls dist/index*   → no matches      $ ls src/index.ts → No such file or directory
```

One item pass B adds to F-6: the dead bare entry's **stated justification is also dead**.
`tsconfig.demo.json`'s header claims *"glass-ui's published `dist/` imports the value.js core by the
bare `@mkbabb/value.js` specifier"*. Over my full 8 300-line trace,
`grep -n "Resolving module '@mkbabb/value.js' from"` returns **zero hits** — glass-ui 7.0.0 speaks
subpaths. The comment documents a world two majors gone, and it is the only argument on record for
keeping the phantom entry.

I also independently reach F-6's cure and state it more strongly: **delete the whole
`@mkbabb/value.js*` block from `paths`.** `/css` already proves self-reference through the genuine
`exports` map works with zero configuration. With `paths` gone there is one authority, the dogfood
stops being simulated, and the three phantom subpaths become compile errors instead of standing
permissions. Today, deleting `"./color"` from `package.json#exports` leaves the demo typechecking
green while the generated Vite alias (`vite.config.ts:37–48`) silently disappears and the dev server
404s on boot — the gate cannot see the break it exists to guard.

**C-2 · F-8 — the undeclared frozen install, confirmed with the diff quantified.**
`node_modules/@mkbabb/value.js` is a real 4.0.0 tarball (not a symlink; `readlink` empty), hoisted as
glass-ui's peer, absent from this package's own `dependencies`. Of its seven subpath `.d.ts` files,
**six are byte-identical to the local build and `css.d.ts` differs**: 382 local lines vs 350
installed, the delta being an entire duplicated `Alpha_2`/`Channel_2`/`ChannelsBySpace_2`/`Color_2`/
`SpaceId_2` shadow-type family in the local build that the published one does not have. The demo
program never reads the installed copy today (C-1's trace shows every specifier landing on the local
`dist/`), so F-8 is latent rather than live — but it is one `paths` deletion away from becoming the
resolution target, which makes fixing F-8 a **precondition** of C-1's cure, not an independent item.
Sequencing note for the mega-tranche: rebuild-and-align `dist/` before deleting `paths`.

**C-3 · F-13 — `demo/ui/` census, confirmed with one correction.** Pass A says twenty barrels; there
are **nineteen**:

```
$ ls -d demo/ui/*/ | wc -l
      19
$ ls -p demo/ui/ | grep -v /          # loose files at demo/ui root
(none)
```

alert, avatar, badge, button, card, checkbox, collapsible, dialog, dropdown-menu, input, label,
popover, radio-group, select, separator, skeleton, slider, switch, tooltip. Every one is a single
`index.ts` containing only re-exports; not one contains a component file. Pass A's importer numbers I
confirm **exactly**: 48 files import a barrel, 24 import both a barrel and glass-ui directly.
Eighteen of the nineteen re-export from the glass-ui **root**; only `input` uses a subpath
(`/forms`), so the alias layer is internally inconsistent as pass A notes. Inside MixPane's own
feature there are three idioms in 334 lines: `MixPane.vue:3` (barrel), `MixPane.vue:12` (root,
direct), `MixSourceSelector.vue:4,7` / `MixResultDisplay.vue:3,6` (subpath, direct).

**C-4 · F-9 — the `Ref<any>` shell channel, confirmed.** `usePaneRouter.ts:106–110` types all three
pane handles `Ref<any>`; `:220–222` dispatch through `paneRefs.mix.value?.clearSelection?.()` etc.
The `?.` **after the method name** is the tell — the shell cannot know the method exists. Verified
consequence: renaming `copyResult` at `MixPane.vue:49,57` leaves `npx eslint demo/shell/usePaneRouter.ts`
at 0 errors 0 warnings and `vue-tsc` green, with the dock's Copy control silently dead. I concur with
F-9's severity and its provide/inject cure, and note it is also the structural reason F-2's second
clipboard implementation exists: `writeClipboard` is there because the imperative channel could not
reach `MixResultDisplay`'s `useClipboard` scope.

---

## Negatives — pass B's own, including two failed hypotheses

Pass A's eight negatives stand except §2 (corrected by B-1) and §4 (narrowed by B-3). Pass B adds:

**N-B1 · The glass-ui root-barrel bundle-cost claim is DISPROVEN for this route.** F-13 asserts the
barrels "cost bundle granularity". I tried to measure it and the measurement refutes it *here*:

```
$ grep -oE 'from ?"\.[^"]*"' node_modules/@mkbabb/glass-ui/dist/glass-ui.js | sort -u | wc -l
      43                                   # root barrel → 43 static chunk edges
$ cat node_modules/@mkbabb/glass-ui/dist/card.js
import { … } from "./card-Bk96VI2R.js";    # ./card subpath → 1 chunk, 5 299 bytes
```

43 edges versus 1 for the same `Card` — but `demo/color-picker/App.vue` and
`demo/picker/ColorPicker.vue`, both **eager** and both in the boot graph, already import the glass-ui
root barrel. So `MixPane`'s lazy chunk (`usePaneRouter.ts:75`, `defineAsyncComponent`) adds **zero
marginal bytes** on `/#/mix`. F-13 stands in full as a *structure* defect — 19 modules whose only
function is to give the design system a second name — but the granularity clause should not be cited
as a cost on this route. It would become a real cost only after the eager root-barrel imports are
themselves removed.

**N-B2 · The "typecheck reads a different value.js than the runtime" hypothesis is DISPROVEN.** Given
F-8's frozen install and the missing `/css` `paths` entry, I predicted vue-tsc would read the
published tarball's `css.d.ts` (350 lines) while Vite served the local build (382 lines) — a live
type/runtime split on `picker-color.ts`. The trace in C-1 refutes it: `/css` self-references through
the local `package.json#exports` and lands on the **local** `dist/subpaths/css.d.ts`. Both halves read
the same file. The split is latent (C-2), not live. Recorded so the absence is evidence.

**N-B3 · No `src/` internal is reachable from MixPane's closure.** Re-verified independently of pass
A's §1: `grep -rn 'from "@mkbabb/value\.js"' demo/` → 0 hits; the demo's entire library vocabulary is
`/color` ×25, `/css` ×10, `/math` ×6, `/easing` ×5, `/quantize` ×4. Every specifier in MixPane's
closure is one a real consumer could write. The T.W1 dogfood keystone holds at the specifier level;
the defect (C-1) is one layer down in resolution.

**N-B4 · `verbatimModuleSyntax` is clean across the subtree.** Eleven type-only imports checked in
the eight files of MixPane's closure; all use `import type`. Zero violations.

**N-B5 · The `/#/mix` render is correct, read directly.** I opened
`docs/tranches/V/megatranche/audit/visual/shots/safari-desktop-light/mix.png`. The pane composes
correctly at idle: Colors/Palettes segmented tabs, the "Selected" well showing its dashed ghost drop
target, Color Space / Hue Method reading OKLab / Shorter, the leftover-strategy select correctly
absent in Colors mode (`MixPane.vue:88`), and a correctly-disabled Mix button at zero selection. All
four Safari matrices report `overflowX 0`, `main 1`, `pageErr 0`, `consoleErr 0`, `darkClassMissing 0`
for `/#/mix` (`REPORT.md:123,138,153,168`). I concur with pass A's attribution of the tap-target and
nameless-button counts to the dock and the left-hand picker rather than to MixPane.

---

## The greenfield lattice — merged

Pass A's lattice (pass A, §"What the greenfield lattice looks like") is correct and I adopt it. Pass
B amends three lines:

**`@mkbabb/value.js/color`** — owns all color mathematics and all color type names.
`mixColorSequence` is promoted here with a weighted **circular** mean for hue and a `Result` return
(pass A F-1, unchanged — the strongest cure in either pass). `Color<S>`, `SpaceId`, `AnyColor` are the
only color type names in the constellation; the six `PickerColorIn` casts delete (B-4). The set of
interpolable spaces ships from here, so the demo cannot silently lag the library (F-5 + B-3).

**`demo/color-session/`** — owns the session: current color, parse/serialize round-trip, persistence,
URL sync. Defines **no alias of a library type** (B-4) and re-exports nothing to other features
(B-3). Exactly one place where `Result` becomes an exception, if one is kept at all (F-4).

**`demo/workbenches/mix/`** — owns the mix end to end:

```
mix/
  MixPane.vue                      — composition + layout only
  MixSourceSelector.vue            — selection UI; stamps geometry markers, never pigment (B-1)
  MixConfigBar.vue                 — space / hue / strategy UI
  MixResultDisplay.vue             — the result plate
  MixAnimationCanvas/
    MixAnimationCanvas.vue         — assembles {el, css} pigment sources from state (B-1)
    composables/useMixingAnimation.ts  — the ONE clock; correct today, unchanged
    composables/mixStage.ts        — geometry + draw; pigment arrives as an argument (B-1)
  composables/
    useMixingState.ts              — state machine + the feature's single clipboard scope (F-2)
    mixPalettes.ts                 — relocated from demo/palettes/mix.ts (B-2)
    resultToText.ts                — one serializer, one home (F-2)
```

`demo/palettes/` reverts to palette identity, persistence and transport, reached only through
`LIBRARY_PORT_KEY` — the seam `MixPane.vue:16` already uses correctly.

Cross-cutting, unchanged from pass A and re-derived here: **one module-resolution authority** (delete
the `paths` block, after C-2's rebuild), and **actions flow up, not commands down**
(`providePaneActions()` replaces `defineExpose` + `Ref<any>` + `?.()`, which also removes the reason
F-2's second clipboard exists).

---

## Merged findings index — pass A (F-*) + pass B (B-*)

| id | sev | family | finding | anchor | pass |
|---|---|---|---|---|---|
| F-1 | MAJOR | A | N-ary mix is order-dependent — measured 120° hue divergence | `demo/palettes/mix.ts:39` | A |
| F-2 | MAJOR | B | Two clipboard impls + two serializers, divergent UX | `MixPane.vue:49` / `MixResultDisplay.vue:42` | A |
| F-3 | MAJOR | B | `MixResult` not a discriminated union → 11 masking guards | `useMixingState.ts:32` | A |
| F-4 | MAJOR | A | `Result` erased by throwing adapter; no failure surface | `picker-color.ts:104` | A |
| **B-1** | **MAJOR** | **D** | **Pigment travels through the DOM as JSON + silent `catch`; corrects pass-A Negatives §2** | **`mixStage.ts:140,150`** | **B** |
| F-6 | MAJOR | C | `paths` forked from `exports`; 3 dead keys, 2 missing | `tsconfig.demo.json` | A (C-1) |
| F-7 | MAJOR | C | Two resolution mechanisms in one file | `picker-color.ts:1,28` | A (C-1) |
| F-8 | MAJOR | C | Undeclared frozen `value.js@4.0.0`; `css.d.ts` differs 382 vs 350 lines | `node_modules/@mkbabb/value.js` | A (C-2) |
| F-9 | MAJOR | D | Shell→feature `Ref<any>` + `?.()` masks | `usePaneRouter.ts:107,220` | A (C-4) |
| F-14 | MAJOR | D | `test/` imports `demo/`; `test/` in no tsconfig program | `test/mix-v4.test.ts:3` | A |
| **B-4** | **MAJOR** | **B** | **`PickerColorIn<S>` forces 6 casts, 2 `as unknown as`, on library returns — dissent: pass A filed INFO** | **`picker-color.ts:36`** | **B** |
| F-5 | MINOR | A | Space type 17-wide, UI offers 9 | `useMixingState.ts:44` | A |
| F-10 | MINOR | D | Child defines parent's scroll host, unscoped | `PaneHeader.vue:40` | A |
| F-11 | MINOR | B | `export/` (11 modules) test-only; `export.ts` is live | `demo/palettes/export*` | A |
| F-12 | MINOR | D | 4× duplicated pane chrome, 3 drifted variants | `MixPane.vue:61` | A |
| F-13 | MINOR | D | `demo/ui/` = **19** (not 20) pure aliases; 48 importers, 24 straddle | `demo/ui/card/index.ts` | A (C-3) |
| F-16 | MINOR | D | Dead `computed` import; lint structurally blind | `MixPane.vue:2` | A (B-5) |
| **B-2** | **MINOR** | **A** | **`demo/palettes/mix.ts` has 1 consumer, in another feature — wrong home survives F-1's cure** | **`useMixingState.ts:24`** | **B** |
| **B-3** | **MINOR** | **B** | **`INTERPOLATION_SPACES` re-exported by the vacated path; narrows pass-A Negatives §4** | **`useGradientInterpolation.ts:17`** | **B** |
| **B-5** | **MINOR** | **D** | **Lint relaxation's rationale false at HEAD: `src/` has 0 `any`, `demo/` has 52** | **`eslint.config.js:8`** | **B** |
| F-15 | — | B | superseded by B-4 (severity INFO → MAJOR) | `picker-color.ts:35` | A→B |
| F-17 | INFO | D | 19-member port injected for one member | `MixPane.vue:16` | A |

**Totals: 21 live findings — 11 MAJOR, 8 MINOR, 1 INFO, 1 superseded.** Pass B contributes 5 (1
MAJOR, 4 MINOR), one severity dissent, two corrections to pass-A negatives, one census correction,
and two disproven hypotheses of its own.

**Strongest defect overall (both passes): F-1** — a measured, user-visible wrong answer (120° of hue
from click order) whose root cause is a homing error. Pass B does not displace it.

**Strongest defect pass B adds: B-1** — the animation's pigment inputs travel through the DOM as a
JSON string behind a silent `catch`, in the one file pass A certified as exemplary.
