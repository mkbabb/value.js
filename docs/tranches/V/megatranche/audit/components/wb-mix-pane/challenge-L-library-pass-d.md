# CHALLENGE-L — library structure under `demo/workbenches/mix/MixPane.vue`

> **This file is the consolidated CHALLENGE-L record (pass D).**
> Three prior CHALLENGE-L seats ran this component. All three are **preserved verbatim,
> byte-identical**:
> - pass A — `challenge-L-library-pass-a.md` (sha1 `7e422be6…`, 39 471 B; read at `32b4040e`; F-1…F-17)
> - pass B — `challenge-L-library-pass-b.md` (sha1 `aee5d9d2…`, 30 860 B; read at `c654824e`; B-1…B-5)
> - pass C — `challenge-L-library-pass-c.md` (sha1 `e5ae388e…`, 28 306 B; read at `c654824e`; C-1…C-6)
>   — copied from this file's prior contents at pass D open; nothing altered or discarded.
>
> This file carries **pass D**: an independent fourth audit at `c654824e` under standing edict E-1,
> recording only what A, B and C did not have. Pass D contributes **one new MAJOR at the library's
> own public surface**, **one upgrade of pass C's C-3 from HYPOTHESIS to CONFIRMED by direct
> measurement**, two new MINORs, two census corrections, and — importantly — **one withdrawn
> finding**, recorded in full with the evidence that killed it.
>
> Read pass A for F-1…F-17, pass B for B-1…B-5, pass C for C-1…C-6, this file for D-1…D-6 and the
> merged index.

## Model receipt

I observe myself to be **Opus 5 (1M context)** — exact model id `claude-opus-5[1m]`, the tier
explicitly declared at spawn. The seat is declared, not inherited.

## Scope + method

Subject: `demo/workbenches/mix/MixPane.vue` (123 lines) and the module lattice beneath it.
Repository `/Users/mkbabb/Programming/value.js`, branch `tranche-u`, HEAD `c654824e`.

Method, chosen to be disjoint from all three priors. A and B read the **source**; C read the
**rendered DOM** against glass-ui's published `.d.ts`. Pass D read the **live Vue component
instances** — I walked `document.querySelector('[data-v-app]').__vue_app__._instance` down to
`App.vue` and read `setupState` directly at both breakpoints, which is the one place where the
shell↔feature channel's *actual runtime value* is observable without pressing a button. That is the
technique that closes C-3's open hypothesis. Supporting work: a `node --input-type=module` execution
of the published `dist/` to compare the two `Result` shapes the library ships, `tsc
--traceResolution` on a real demo file, and grep censuses re-derived at HEAD.

**No source was edited. No file outside `…/wb-mix-pane/` was written.**

---

## Verdict

**DEFECTIVE.** Pass C's C-1 remains the ceiling and pass D does not displace it. Pass D's own
strongest contribution is **D-2**: the value.js library publishes **two mutually incompatible
failure algebras** across two of its seven subpaths, which is the root cause sitting underneath pass
A's F-4 — F-4 described the demo *erasing* the library's failure-explicitness, D-2 shows the demo had
to write **two different unwrap adapters eight lines apart in one file** because the library could
not decide what a failure looks like. That is the library-structure defect proper: one concept, two
homes, inside the published surface.

---

# Pass D findings — the delta

## D-1 · MAJOR · **CONFIRMS and closes pass C's C-3** — the mobile Mix dock actions are dead, measured directly, not inferred

Pass C established the mechanism (mobile `PaneSlot` omits `:on-mount`; `mixPaneRef` has no
assignment path in the mobile layout) and correctly filed the *consequence* as **HYPOTHESIS**:

> *"The end-to-end button-press reproduction is HYPOTHESIS: I could not populate the pane to observe
> the no-op because C-1 kills both colors-mode add paths… The blocker blocks its own downstream
> verification."*

The button press is not the only observable. **The receiver is.** Pass D read it.

**Measurement — mobile.** Clean load, viewport 390 × 844, `http://localhost:9000/#/mix`, 4 s settle
(the pane rendered fully: `.pane-header-title` = `"Mix"`, both segmented tabs, both selects, the Mix
button — so this is not a boundary/crash artifact):

```json
{ "layout": "mobile", "currentView": "mix",
  "mixPaneRef": "null",
  "generatePaneRef": "null", "gradientPaneRef": "null", "colorPickerRef": "null",
  "actionBar": "BAR:Tools",
  "dockLabels": ["Clear", "Mix", "Copy result"] }
```

`actionBar` is live and the three Tools controls are in the DOM and visible
(`button.action-button-wrapper`, `getClientRects().length > 0` measured separately). `mixPaneRef` is
`null`. Therefore `usePaneRouter.ts:220-222` —

```ts
handler: () => paneRefs.mix.value?.clearSelection?.()
handler: () => paneRefs.mix.value?.startMix?.()
handler: () => paneRefs.mix.value?.copyResult?.()
```

— evaluate `null?.…?.()` on every press. No throw, no feedback, no effect. The `?.` is the masking
fallback pass A filed as F-9 doing exactly the work edict 2 forbids: converting a structural
miswiring into silence.

**Measurement — desktop, the control.** Same session, viewport 1440 × 900, same route, 2.5 s settle:

```json
{ "layout": "desktop", "mixPaneRef": ["clearSelection", "startMix", "copyResult"],
  "exposedOk": true, "canvases": 3 }
```

The identical `MixPane` instance, mounted through the *other* slot, publishes its `defineExpose`
surface (`MixPane.vue:57`) and the same three handlers work. **The asymmetry is the finding**: one
component, two mount paths, one of which silently fails to bind — and only the layout decides which.
`canvases: 3` also corroborates `REPORT.md:123` (`/#/mix` desktop, canvas = 3).

**Verdict change.** C-3: `HYPOTHESIS` → **CONFIRMED**. Severity stays MAJOR, not BLOCKER: `Clear`
and `Copy result` have working in-pane twins in `MixResultDisplay.vue:121-142` and `Mix` has one in
`MixConfigBar`, so the mobile user is not stranded — which is itself pass A's F-2 (duplicate paths)
accidentally providing the redundancy that keeps this out of blocker territory. A dead control that
is invisible *because a duplicate of it works* is the sharpest possible argument for F-2's cure.

**What pass D adds beyond confirmation.** The other three refs are null in the same read. The
channel is not mix-shaped — it is `PaneActionRefs`-shaped (`usePaneRouter.ts:107-111`, three
`Ref<any>`), and the mobile layout binds none of it. Pass C's cure (invert to `provide`/`inject`, so
the publisher is the mounted component and binding cannot be layout-conditional) is therefore
correct at a wider radius than C-3 claimed. **But see N-D1: I attempted to generalise this to the
picker and had to withdraw it.** The generalisation that survives is exactly: *for the three panes
`usePaneRouter` names (`generate`, `gradient`, `mix`), the imperative channel is bound only by the
desktop slots.*

---

## D-2 · MAJOR · NEW — the library publishes **two mutually incompatible failure algebras** across two subpaths; the consumer pays with two unwrap adapters in one file

This is the root cause beneath pass A's F-4. F-4 found the demo throwing away
failure-explicitness at `picker-color.ts:104`. It did not ask **why there are two adapters**.

**The two shapes, both published.**

`@mkbabb/value.js/color` re-exports `Result` (`src/subpaths/color.ts:9`), whose failure arm carries
`.error`:

```ts
// src/color/model.ts — the foundation Result
{ ok: true; value: T } | { ok: false; error: E }        // E = ColorIssue = { code: … }
```

`@mkbabb/value.js/css` re-exports `ParseResult` (`src/subpaths/css.ts:21`), whose failure arm
carries `.diagnostics` and has **no `.error` at all** — `src/css/types.ts:26-27`:

```ts
| { readonly ok: true;  readonly value: T; readonly diagnostics: readonly [] }
| { readonly ok: false; readonly diagnostics: readonly [ParseIssue, ...ParseIssue[]] }
```

**Measured against the built artifact** (`node --input-type=module`, importing `./dist/subpaths/css.js`):

```
$ node --input-type=module -e "import {parseCssColor} from './dist/subpaths/css.js';
    const r = parseCssColor('color-mix(in oklab, red, blue)'); console.log(r);
    try { r.error.code } catch (e) { console.log('DEREF THROWS:', e.constructor.name+': '+e.message) }"

{ ok: false,
  diagnostics: [ { code: 'css_syntax', start: 0, end: 30, expected: [Array],
                   actual: 'color-mix(in oklab, red, blue)' } ] }
keys: [ 'ok', 'diagnostics' ]
DEREF THROWS: TypeError: Cannot read properties of undefined (reading 'code')
```

**The price, in one demo file, eight lines apart** — `demo/color-session/picker-color.ts`:

```ts
:104  function valueOrThrow<T, E extends Readonly<{ code: string }>>(result: Result<T, E>): T {
:105      if (result.ok) return result.value;
:106      throw new PickerColorError(result.error.code);          // ← algebra #1: .error
:107  }
:110  export function parsePickerColor(source: string): CssColor {
:111      const result = parseCssColor(source.trim());
:112      if (result.ok) return result.value;
:113      throw new PickerColorError("Invalid CSS color", result.diagnostics);   // ← algebra #2
:114  }
```

Two adapters, two error vocabularies, one file, one concept. `MixPane`'s whole chain runs through
both: `useMixingState.ts:88` → `parseColorIn` → `parsePickerColor` (algebra #2) and
`convertPickerColor` → `valueOrThrow` (algebra #1); `demo/palettes/mix.ts:36` writes a **third**
hand-rolled unwrap for `mixColors` (algebra #1 again, inline).

**Why this is a library-structure defect and not a demo defect.** The package description is
*"Immutable, **failure-explicit** CSS color, value, easing, transform, math, and quantization
capabilities."* Failure-explicitness is the library's headline property, and it is the one property
the published surface fails to give a single shape. A downstream consumer cannot write one generic
`unwrap<T>()`; it must branch on which subpath the value came from. That is the definition of a
missing unique semantic owner.

**Evidence:** `src/css/types.ts:26-27`; `src/color/model.ts:38-43`; `src/subpaths/color.ts:9`;
`src/subpaths/css.ts:21`; `demo/color-session/picker-color.ts:104-114`; `demo/palettes/mix.ts:36`;
the `node` transcript above.
**Reproduction:** the `node` command above, verbatim, against the committed `dist/`.

**Cure — one algebra.** `ParseResult<T>` becomes `Result<T, readonly [ParseIssue, ...ParseIssue[]]>`
(the foundation `Result` already generalises over `E`; only the failure arm's field name changes).
Then `valueOrThrow` is the *single* adapter, `parsePickerColor`'s bespoke throw deletes,
`demo/palettes/mix.ts:36`'s third unwrap deletes, and pass A's F-4 cure (surface failure instead of
throwing) becomes a one-place change rather than a three-place one. The migration is mechanical: no
call site reads `.diagnostics` structurally except the two shown.

---

## D-3 · MINOR · NEW — `MixConfigBar` names glass-ui's headless peer directly, bypassing the design system

`demo/workbenches/mix/MixConfigBar.vue:15`:

```ts
import type { AcceptableValue } from "reka-ui";
```

glass-ui declares `reka-ui` a peer and owns every `Select` the demo renders
(`demo/ui/select/index.ts` → `@mkbabb/glass-ui`). The demo naming the headless library directly is
the last structural trace of the pre-glass primitive layer — edict 4. Four sites fleet-wide
(`grep -rn 'from "reka-ui"' demo src` → `GradientVisualizer.vue:28`, **`MixConfigBar.vue:15`**,
`GenerateControls.vue:33`, `AuroraPane.vue:25`), all four the same `AcceptableValue` type import.
The shadcn census filed this repo-wide as A-12; this is its instance in the Mix cone, which the
merged L index did not carry.

**Checked before claiming, and it is *not* an undeclared dependency:** `reka-ui` is in
`package.json#devDependencies` (`npm ls reka-ui` → `reka-ui@2.9.9` at top level, `deduped` under
glass-ui). So this is a layering defect, not a resolution one — unlike pass A's F-8, which is a
resolution defect.

**Cure.** glass-ui's `./select` re-exports the value type its own `Select` accepts; the demo imports
it from glass-ui. The demo never names `reka-ui`, and `reka-ui` leaves the demo's devDependencies.

---

## D-4 · MINOR · NEW — dead published surface on the mix algebra, and a word owning two concepts

`demo/palettes/mix.ts:21-26` publishes:

```ts
export interface PaletteMixOptions {
    space?: PickerSpace;
    hueMethod?: HueInterpolationMethod;
    leftoverStrategy?: LeftoverStrategy;
    weights?: number[];          // ← zero callers
}
```

```
$ grep -rn "weights" demo/ test/ | grep -v node_modules
demo/palettes/browser/card/PaletteColorStrip.vue:34,38,44,55,56   ← a DIFFERENT concept
demo/palettes/mix.ts:25,44,47,50,51,53,58,60,115,141              ← definition + internal plumbing
test/mix-v4.test.ts:9,45                                          ← test-only
```

No production call site ever passes `weights`. `useMixingState.ts:92-96` builds the options object
with `space`/`hueMethod`/`leftoverStrategy` only, so `mixPalettes` always forwards `undefined` into
`mixColorSequence`'s default. The parameter, its three validation branches
(`mix.ts:47-55` — length mismatch, non-finite/negative, all-zero) and their three error strings are
reachable only from `test/mix-v4.test.ts`. Under edict 2 that is surface kept alive by its own test.

Compounding it: **`weight` names two different things one directory apart.** `PaletteColor.weight`
(`demo/palettes/types.ts:11`) is the quantizer's *population share* for a swatch;
`PaletteMixOptions.weights` is a *per-palette blend ratio*. Nothing relates them.

**Cure.** Under pass A's F-1, `mixColorSequence` ascends into the library with its weighted fold
intact (weights are genuinely part of an N-ary mix's contract and belong in `src/color/`);
`PaletteMixOptions.weights` — the demo-side pass-through nobody calls — deletes. One concept keeps
the word.

---

## D-5 · CENSUS CORRECTION to pass B's B-2 — the module has **zero** consumers in its own home, and **three** importers overall

Pass B's B-2 reads *"`demo/palettes/mix.ts` has 1 consumer, in another feature."* Re-derived at HEAD:

```
$ grep -rn "palettes/mix" demo/ src/ test/ e2e/ | grep -v node_modules
demo/workbenches/mix/MixConfigBar.vue:14:import type { LeftoverStrategy } from "../../palettes/mix";
demo/workbenches/mix/composables/useMixingState.ts:21:import { mixColorSequence, mixPalettes, type LeftoverStrategy } from "../../../palettes/mix";
test/mix-v4.test.ts:4:import { mixColorSequence } from "../demo/palettes/mix";
demo/shell/viewSchema.ts:92:   ← prose in a comment, not an import
```

**Three** importers: two in `demo/workbenches/mix/`, one in `test/`. **Zero** in `demo/palettes/`.
The correction matters for the cure's shape: B-2 as written invites "move it closer to its one
consumer"; the true census says the module has *no* consumer in the feature it is named after and is
wholly owned by another — which is pass A's F-1 split (`mixColorSequence` → `src/color/`,
`mixPalettes` + `LeftoverStrategy` → `demo/workbenches/mix/`) with no remaining ambiguity, and it is
simultaneously the reason pass A's F-14 exists at all (`test/` had to reach into `demo/` because a
library-grade algebra was homed in a feature).

---

## D-6 · CENSUS EXTENSION to pass A's F-12 — the pane chrome recurs more widely than filed, and MixPane's own outer wrapper is inert

F-12 filed *"4× duplicated pane chrome, 3 drifted variants"*. Measured at HEAD, each layer separately:

```
$ grep -rn 'class="relative w-full mx-auto h-full min-w-0"' demo --include='*.vue'      → 5 files
    GradientPane:19 · MixPane:61 · GeneratePane:30 · ExtractPane:2 · ConfigSliderPane:98
$ grep -rn 'flex flex-col gap-4 pb-4 px-4 sm:px-6 pt-2' demo --include='*.vue'          → 3 files
    GradientPane:24 · MixPane:78 · GeneratePane:35
$ grep -rn "pane-scroll-fade" demo --include='*.vue'                                    → 11 host sites
$ grep -rln "PaneHeader" demo --include='*.vue'                                         → 9 panes + the SFC
```

Four independently-duplicated layers, not one. And the outermost is **inert in this component**:
`MixPane.vue:61`'s wrapper carries `relative`, but `MixPane.vue:62`'s `<Card>` carries `relative`
too, and the only absolutely-positioned descendant — `MixAnimationCanvas`'s
`class="absolute inset-0 …"` at `MixAnimationCanvas.vue:32` — is the Card's child, so the Card is
already its containing block. The wrapper also repeats `w-full`, `h-full` and `min-w-0`, all of which
the Card carries. It contributes nothing that its own child does not.

**Cure** (adopts F-12's, sharpened): the shell is `Card` + `CardHeader` variants in **glass-ui**, not
a demo wrapper component (edict 3 forbids minting one here, edict 4 says the design system owns it).
`PaneHeader.vue`'s own comment already names the producer successor — *"until P3's `ScrollCardHeader`
knobs land (BOOKED)"* — and its unscoped `.pane-scroll-fade` rule (pass A's F-10) is exactly the
producer concern it says it is. When it lands, all four duplicated layers collapse at once and
`MixPane.vue` loses its outer `<div>` and its Card class bag with it.

---

## Negatives — pass D's own

Pass A's negatives stand as amended by B and C. Pass D adds three, the first of which is a
**withdrawal**.

### N-D1 · **WITHDRAWN FINDING** — I measured `colorPickerRef === null` at both layouts and did *not* file it, because the picker had crashed

I attempted to generalise D-1 from the three workbench panes to the picker. `App.vue:38,41,42` route
the dock's own controls through the same imperative channel —
`:action-bar="colorPickerRef?.actionBarContext ?? null"`, `@commit-edit="colorPickerRef?.commitEdit()"`,
`@cancel-edit="colorPickerRef?.cancelEdit()"` — and `colorPickerRef` is assigned at exactly one site,
`:325`, inside `onDesktopLeftMount`. I measured, on a clean **desktop** load of `/#/` after 5 s:

```json
{ "layout": "desktop", "view": "picker", "colorPickerRef": "NULL",
  "hasActionBarContext": false, "toolsToggleVisible": false, "actionBarLayerPresent": false }
```

and it stayed `NULL` across a `#/gradient` → `#/` round trip. That reads as a devastating
generalisation — the picker's entire `ActionBarContext` (`ColorPicker.vue:315-343`) never reaching
the dock. **It is not one.** Two checks killed it:

1. `document.querySelector('.picker-shell')` → **absent**; `<main class="pane-main">` was rendering
   the **U-F58 error boundary** (its own comment: *"a pane render throw surfaces the focus-managed,
   SR-announced boundary IN PLACE of the grid"*) with a `Try again` button. The ColorPicker never
   mounted, so of course nothing bound its ref.
2. The shipped Safari capture `shots/safari-desktop-light/picker.png` shows a **healthy picker and a
   live `Tools →` control in the dock** — i.e. `hasAnyActionBar` was true when that matrix ran.

The console error behind the boundary, for whoever owns the shell seat:

```
[ERROR] Failed to load resource: the server responded with a status of 404 (Not Found)
        @ http://localhost:9000/demo/color-session/color-utils.ts:0
```

— a dev-server module-graph 404 on the very file `MixPane`'s chain depends on, almost certainly a
stale-server artifact of my own session (a full `vue-tsc` run raced it) rather than a code defect. I
record it as an **environment observation**, not a finding, and I explicitly withdraw the
`colorPickerRef` generalisation.

**Why this is worth a paragraph.** Pass C's lesson was *a screenshot proves layout, never
reachability*. The mirror-image discipline is: **a measured `null` proves nothing until you have
ruled out an upstream crash.** D-1 survives this test — the Mix pane rendered completely in both
layouts (header, both tabs, both selects, Mix button), the boundary was nowhere on `/#/mix`, and the
desktop read of the *same* expression returned a live instance — which is precisely why D-1 is
CONFIRMED and this is not.

### N-D2 · `./value` and `./transform` are unused by the demo but **are** proven by a real downstream — do not file them as dead

Demo subpath census at HEAD:

```
$ grep -rho '@mkbabb/value\.js/[a-z]*' demo | sort | uniq -c | sort -rn
  25 @mkbabb/value.js/color      10 @mkbabb/value.js/css       6 @mkbabb/value.js/math
   5 @mkbabb/value.js/easing      4 @mkbabb/value.js/quantize
```

Five of seven published keys. The other two are consumed by a genuine downstream package:

```
node_modules/@mkbabb/keyframes.js/dist/engine/index.js:7  import … from "@mkbabb/value.js/value"
node_modules/@mkbabb/keyframes.js/dist/engine/index.js:8  import { PathGeometry } from "@mkbabb/value.js/transform"
```

So the exports map has no dead key. Recorded so no later seat files "2 unproven subpaths" — the
correct statement is narrower: *the demo's consumer-truth proof covers 5 of 7; `./value` and
`./transform` are proven by keyframes.js instead.*

### N-D3 · third confirmation that the value.js consumption is structurally clean, with the trace redone

```
$ grep -rn 'from "@mkbabb/value\.js"' demo src   → 0     (no bare-root import; there is no "." export)
$ grep -rn 'from "@src'  demo --include='*.vue' --include='*.ts'   → 0     (no source-tree reach)
```

and the resolution trace re-run on a real demo file rather than a synthetic probe
(`tsc -p <scratch> --traceResolution`, `include` = `demo/color-session/picker-color.ts`):

```
Module name '@mkbabb/value.js/color', matched pattern '@mkbabb/value.js/color'.
Module name '@mkbabb/value.js/color' … resolved to '…/dist/subpaths/color.d.ts'.
Module name '@mkbabb/value.js/css'   … resolved to '…/dist/subpaths/css.d.ts'
                                          with Package ID '@mkbabb/value.js/dist/subpaths/css.d.ts@4.0.0'.
```

Note the asymmetry, which corroborates pass A's F-6 / pass B's C-1 from a third angle: `/color`
resolves through the **hand-maintained `paths` mirror**, `/css` finds no pattern and falls through to
the repo's **own `package.json#exports` self-reference** — two mechanisms, one concern, and the
`exports` route is the one that cannot drift. Every import in MixPane's closure is one a real
consumer could write. Third confirmation of the T.W1 keystone.

---

## The greenfield lattice — merged

Pass A's lattice as amended by B and C is correct and pass D adopts it whole. Pass D amends one line
and adds one law.

**`@mkbabb/value.js`** — amended: **one failure algebra across the whole published surface** (D-2).
`Result<T, E>` is the only shape; `ParseResult<T>` is `Result<T, readonly [ParseIssue, …]>`. A
consumer writes one `unwrap`, not one per subpath. This is the precondition that makes pass A's F-4
cure (surface failures instead of throwing) a single change rather than three.

**New cross-cutting law pass D adds — *a runtime channel between two modules must be observable
before it is trusted, and a measured null must be traced to its cause before it is filed*.** D-1 and
N-D1 are the same measurement (`setupState.<ref> === null`) with opposite verdicts, separated only by
checking whether the publisher had mounted. Both prior live-probing passes (C, D) found their
strongest result by reading runtime state rather than source — and pass D found its one false
positive the same way. The rule that makes the technique safe: **read the publisher's presence in the
same breath as the subscriber's value.**

---

## Merged findings index — pass A (F-*) + B (B-*) + C (C-*) + D (D-*)

| id | sev | family | finding | anchor | pass |
|---|---|---|---|---|---|
| **C-1** | BLOCKER | D | `WatercolorDot` prop contract is fiction at glass-ui 7.0.0; both colors-mode add paths dead | `MixSourceSelector.vue:166,215` | C |
| F-1 | MAJOR | A | N-ary mix order-dependent — measured 120° hue divergence | `demo/palettes/mix.ts:39` | A |
| F-2 | MAJOR | B | Two clipboard impls + two serializers, divergent UX | `MixPane.vue:49` / `MixResultDisplay.vue:42` | A |
| F-3 | MAJOR | B | `MixResult` not a discriminated union → 11 masking guards | `useMixingState.ts:32` | A |
| F-4 | MAJOR | A | `Result` erased by throwing adapter; no failure surface | `picker-color.ts:104` | A |
| **D-2** | **MAJOR** | **A** | **Library publishes TWO incompatible failure algebras (`.error` vs `.diagnostics`); consumer writes 2 adapters 8 lines apart — the root cause under F-4** | **`src/css/types.ts:26` / `picker-color.ts:104,113`** | **D** |
| B-1 | MAJOR | D | Pigment travels through the DOM as JSON + silent `catch` | `mixStage.ts:140,150` | B |
| C-2 | MAJOR | D | `[data-mix-target]` never exists → B-1's invented-geometry fallback is the ONLY branch taken | `MixResultDisplay.vue:68` / `mixStage.ts:121` | C |
| F-6 | MAJOR | C | `paths` forked from `exports`; 3 dead keys, 2 missing | `tsconfig.demo.json:42` | A (B·C-1, C·N-C1, D·N-D3) |
| F-7 | MAJOR | C | Two resolution mechanisms in one file | `picker-color.ts:1,28` | A (B·C-1, D·N-D3) |
| F-8 | MAJOR | C | Undeclared frozen `value.js@4.0.0`; `css.d.ts` 382 vs 350 lines | `node_modules/@mkbabb/value.js` | A (B·C-2) |
| F-9 | MAJOR | D | Shell→feature `Ref<any>` + `?.()` masks | `usePaneRouter.ts:107,220` | A (B·C-4) |
| C-3 | MAJOR | D | F-9's channel never bound in the mobile layout — **CONFIRMED by D-1** | `App.vue:83,319,331` | C (D-1) |
| **D-1** | **MAJOR** | **D** | **C-3 closed by direct instance read: mobile `mixPaneRef` = null with all three dock actions rendered; desktop = live instance. All 4 pane refs null in that layout** | **live `App.setupState`** | **D** |
| F-14 | MAJOR | D | `test/` imports `demo/`; `test/` in no tsconfig program | `test/mix-v4.test.ts:3` | A (D-5) |
| B-4 | MAJOR | B | `PickerColorIn<S>` forces 6 casts, 2 `as unknown as`, on library returns | `picker-color.ts:36` | B |
| F-5 | MINOR | A | Space type 17-wide, UI offers 9 | `useMixingState.ts:44` | A |
| F-10 | MINOR | D | Child defines parent's scroll host, unscoped | `PaneHeader.vue:40` | A (D-6) |
| F-11 | MINOR | B | `export/` (11 modules) test-only; `export.ts` is live | `demo/palettes/export*` | A |
| F-12 | MINOR | D | Duplicated pane chrome | `MixPane.vue:61` | A (D-6) |
| **D-6** | **MINOR** | **D** | **F-12 re-censused: 4 independently-duplicated layers (5 / 3 / 11 / 9), and MixPane's outer wrapper is inert — the Card is already the containing block** | **`MixPane.vue:61-62`** | **D** |
| F-13 | MINOR | D | `demo/ui/` = 19 pure aliases; 48 importers, 24 straddle | `demo/ui/card/index.ts` | A (B·C-3, C-6) |
| F-16 | MINOR | D | Dead `computed` import; lint structurally blind | `MixPane.vue:2` | A (B-5) |
| B-2 | MINOR | A | `demo/palettes/mix.ts` consumed from another feature | `useMixingState.ts:24` | B (D-5) |
| **D-5** | **MINOR** | **A** | **B-2 re-censused: 3 importers (2 demo + 1 test), ZERO in `demo/palettes/` — the module has no consumer in its own home** | **`demo/palettes/mix.ts`** | **D** |
| B-3 | MINOR | B | `INTERPOLATION_SPACES` re-exported by the vacated path | `useGradientInterpolation.ts:17` | B |
| B-5 | MINOR | D | Lint relaxation's rationale false at HEAD | `eslint.config.js:8` | B |
| C-4 | MINOR | D | Three parallel homes for demo tests (10 / 1 / 3) | `vitest.config.ts:20` | C |
| C-5 | MINOR | D | `test/dist/` workaround outlives the deleted directory | `vitest.config.ts:25` | C |
| **D-3** | **MINOR** | **D** | **`MixConfigBar` type-imports `reka-ui` directly, bypassing glass-ui (declared, so layering not resolution); 4 sites fleet-wide** | **`MixConfigBar.vue:15`** | **D** |
| **D-4** | **MINOR** | **A** | **`PaletteMixOptions.weights` is dead surface kept alive by its own test; `weight`/`weights` name two unrelated concepts one dir apart** | **`demo/palettes/mix.ts:25`** | **D** |
| F-15 | — | B | superseded by B-4 (INFO → MAJOR) | `picker-color.ts:35` | A→B |
| F-17 | INFO | D | 19-member port injected for one member | `MixPane.vue:16` | A |

**Totals: 29 live findings — 1 BLOCKER, 13 MAJOR, 14 MINOR, 1 INFO, 1 superseded.** Pass D
contributes 5 (1 MAJOR new, 1 MAJOR closing C-3, 3 MINOR), two census corrections (to B-2 and F-12),
one verdict change (C-3 HYPOTHESIS → CONFIRMED), and one **withdrawn** finding recorded in full with
its disproof (N-D1).

**Strongest defect overall (all four passes): C-1** — unchanged. Pass D's C-1 is not displaced: a
feature with no working entry point outranks a library API that forces two adapters.

**Strongest defect pass D contributes: D-2.** It is the only pass-D finding at the **library's own
published surface**, which is this seat's subject. Every other finding across four passes is about
how the demo *uses* the library or the shell; D-2 is about what the library *is*. One package,
seven subpaths, two irreconcilable answers to "what does failure look like" — and the consumer file
that has to speak both dialects eight lines apart is the proof.
