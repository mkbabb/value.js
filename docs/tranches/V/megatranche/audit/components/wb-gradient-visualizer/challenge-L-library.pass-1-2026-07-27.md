# CHALLENGE-L — library structure under `GradientVisualizer`

> **ROUND 2 ADDENDUM — read `challenge-L-library-r2.md` alongside this file.**
> A second independent Opus 5 seat re-ran this axis and found a **BLOCKER this report misses**:
> one click on the `ease-in-back` easing tile, from the landing state of `/#/gradient`, throws
> `color_progress_out_of_range` inside a Vue computed and — because the single `ErrorBoundary` sits
> outside the whole pane grid — **erases the entire application** (verified live in WebKit; body
> text 611 → 141). value.js ships three `ease-*-back` presets whose eased output leaves `[0,1]`
> (`src/easing.ts:62-64`) and a `mixColors` that rejects progress outside `[0,1]`; the adapter
> between them has no owner, so this tree implements it **three** times (r2 adds a third copy at
> `easing/useSpecimenRows.ts:52`, beyond the two in L-5 below) and all three crash.
> r2 also **corrects N-1** of this report: the *import* half of the published-surface question is
> sound as stated, but `tsconfig.demo.json` `paths` has drifted **five rows** from
> `package.json#exports` — three dead entries (one pointing at a non-existent `dist/index.d.ts`)
> and two missing, including `@mkbabb/value.js/css`, the subpath this component depends on most.
> This file is **not superseded** (E-3, addenda-not-patch); L-1..L-17 stand and r2 confirms six of
> them independently.

## Model receipt

I observe myself to be **Opus 5** — exact model id `claude-opus-5[1m]`, the 1M-context
Opus 5 seat, matching the explicit declaration this seat was spawned with. Not an
inherited or undeclared seat.

---

- **Axis**: CHALLENGE-L — the library structure underneath the component is wrong
  (module boundaries / ownership / dependency direction / public surface).
- **Subject**: `demo/workbenches/gradient/GradientVisualizer/GradientVisualizer.vue` (279 L)
  and its owned tree (`GradientStopEditor` 392 L, `GradientEasingEditor` 295 L,
  `GradientCodeEditor` 116 L, `easing/` 635 L, `../composables/` 884 L).
- **Repo**: `/Users/mkbabb/Programming/value.js`, branch `tranche-u`, HEAD `c654824e`.
- **Verdict**: **DEFECTIVE.**

The premise is correct, and the reason is structural rather than local: **the demo has
no enforced module lattice at all.** Every `no-restricted-imports` boundary in
`eslint.config.js` targets the pre-W43 `demo/@/**` tree, which no longer exists. With
the guard rail gone, this component has grown three separate boundary violations that
lint, typecheck, and CI all pass in silence. Underneath that, the value.js `/css` ↔
`/easing` seam is missing both halves of its round-trip, and this component's tree is
where those halves were re-implemented — twice over, once dead.

---

## Negative proof first (what is genuinely sound)

Two things this axis expects to be broken are **not** broken, and the proof is
positive, not an absence of evidence.

**N-1 — value.js is consumed through the published subpath export map, exclusively.**

```
$ grep -rn "@mkbabb/value.js" demo --include="*.vue" --include="*.ts" -h \
    | sed 's/.*from "//; s/".*//' | sort | uniq -c | sort -rn
  24 @mkbabb/value.js/color
  10 @mkbabb/value.js/css
   6 @mkbabb/value.js/math
   5 @mkbabb/value.js/easing
   4 @mkbabb/value.js/quantize
```

Five of the seven `package.json#exports` subpaths, zero deep paths, zero bare-root
imports (there is no `"."` export — verified: `node -e "…'.' in p.exports"` → `false`).

```
$ grep -rn "@src/" demo --include="*.vue" --include="*.ts" --include="*.md"
(no output)
```

The demo tree carries **no** `@src/*` reach. Every import this component makes of the
library is one a real npm consumer could write verbatim. `vite.config.ts:38-51`
generates the self-alias set *from* the exports map, so the alias set cannot drift from
the published surface. This half of the axis is clean and should be recorded as an
invariant worth keeping.

**N-2 — `verbatimModuleSyntax` is fully satisfied across the cluster.**

```
$ grep -n "^import\|^} from" <all 9 files of the cluster> \
    | grep -v "import type" | grep -iE "type |Type\b"
(no output)
```

Every type-only import in `GradientVisualizer.vue`, its three siblings, `easing/*`,
and `composables/*` is `import type`. No violations.

---

## The defects

### L-1 · BLOCKER — every demo-side import boundary is dead lint

This is the enabling defect; everything below is downstream of it.

`eslint.config.js:230-300` declares three structural invariants — **G-DEMO-1** (the
shared composable layer must not reach app-root boot), **G-DEMO-3a** (shared must not
reach feature internals), **G-DEMO-3b** (palette-browser only through its barrel seam).
Each is scoped to file globs `demo/@/components/**`, `demo/@/lib/**`,
`demo/@/composables/**`, and each bans specifiers of the form `@components/custom/…`.

W43 / RF-15 restructured the demo tree and deleted both. `vite.config.ts:66-71` states
it plainly: *"W43 (RF-15) killed the demo `@…` path aliases: every demo import is now
relative to its physical home."*

```
$ ls -d demo/@
ls: demo/@: No such file or directory

$ npx eslint --print-config demo/workbenches/gradient/GradientVisualizer/GradientVisualizer.vue \
    | node -e "…console.log(c.rules['no-restricted-imports'])"
no-restricted-imports for GradientVisualizer.vue = undefined
```

The globs match **zero** files. The banned specifier shape no longer exists in the
codebase. The effective import-restriction rule set for the subject component is
`undefined`. The one surviving boundary is `inv-K-1` (`files: ["src/**/*.ts"]`, banning
`src/` → glass-ui) — that one is live and correct.

- **Reproduction**: the two commands above, verbatim.
- **Mechanism**: boundary invariants encoded as *path-shaped* lint globs; a tree
  rename silently un-scopes them. Nothing fails when a rule stops matching anything.
- **Cure (transposition, not patch)**: stop encoding boundaries as path globs that a
  rename can orphan. Re-express the demo lattice as **layer tags** with a rule that
  fails on an *unclassified* file, so a new or moved directory is a lint error until it
  is placed in the lattice. Concretely: four layers —
  `platform` (transport/auth/storage) → `session` (`color-session`, the color spine) →
  `feature` (`palettes`, `workbenches/*`, `scenes/*`, `picker`) → `shell` (`shell`,
  `color-picker`), with `shared`/`ui` as a zero-dependency leaf. Edges point *down*
  only; sibling `feature → feature` is banned outright. Add a lint assertion that the
  union of the layer globs covers `demo/**` — that assertion is what a rename trips.

### L-2 · BLOCKER — one `Symbol` import drags 72 modules across the feature boundary

`GradientVisualizer.vue:27`

```ts
import { LIBRARY_PORT_KEY } from "../../../palettes/usePalettePorts";
```

`LIBRARY_PORT_KEY` is one line — `usePalettePorts.ts:272`,
`export const LIBRARY_PORT_KEY: InjectionKey<LibraryPort> = Symbol("palette.library")`.
It is co-located with the **provider**, a 272-line wiring module that composes fifteen
sub-composables plus auth, admin, and the API client. ES module semantics mean
importing the `Symbol` evaluates the whole graph.

Measured (static relative-import closure, script at
`…/scratchpad/graph2.mjs`):

```
full: 107   without palettes edge: 35   delta: 72
```

The 72 modules that one import pulls in include the entire admin surface and transport
stack:

```
demo/palettes/browser/admin/AdminAuditPanel.vue      demo/palettes/api/admin-users.ts
demo/palettes/browser/admin/AdminUsersPanel.vue      demo/palettes/api/versions.ts
demo/palettes/browser/admin/AdminFlaggedPanel.vue    demo/platform/auth/sessionToken.ts
demo/palettes/browser/admin/AdminTagsPanel.vue       demo/platform/auth/useAdminAuth.ts
demo/palettes/browser/card/PaletteCardGrid.vue       demo/platform/transport/useApiClient.ts
demo/palettes/useSlugMigration.ts                    demo/shell/useViewManager.ts
…72 total
```

This is not academic: `demo/shell/usePaneRouter.ts:74` code-splits the pane —
`defineAsyncComponent(() => import("../workbenches/gradient/GradientPane.vue"))`. The
route is a real chunk boundary, and this edge erases its independence. It is also a
**direction** violation: a workbench feature statically depends on another feature's
admin internals.

The gradient's *own* domain closure is 7 modules
(`useGradientModel.ts` → `local modules: 7`). The palettes edge is 10× the feature.

- **Reproduction**: `node /private/tmp/.../scratchpad/graph2.mjs` (closure diff over
  relative imports from `GradientVisualizer.vue`).
- **Mechanism**: injection keys co-located with their providers. The key is a
  zero-dependency contract; the provider is a god-wiring module. Importing the contract
  should not import the implementation. Note that `demo/color-session/keys.ts` already
  does this correctly — `GradientPane.vue:6` imports `CSS_COLOR_KEY` from a keys-only
  module. The palettes feature simply never got the same treatment.
- **Cure**: `demo/palettes/keys.ts` holding the five port symbols + their port
  interface types and nothing else; `usePalettePorts.ts` imports *from* it and
  `provide()`s. Zero new directories (`keys.ts` is an existing, proven idiom here), and
  the gradient closure drops 107 → 35. Then, per L-1's lattice, the sibling
  `feature → feature` edge itself should be re-expressed: the gradient's
  `seedFromPalette` wants *"a list of colors"*, not *"the palette library port"* — it
  should receive `savedColorStrings` from the shell that already owns it
  (`usePalettePorts.ts` deps take `savedColorStrings: Ref<string[]>` — the shell has it).

### L-3 · MAJOR — the value.js `/css` ↔ `/easing` seam is missing both halves, and this tree owns both

The library publishes an asymmetric round-trip:

| capability | parse | serialize |
|---|---|---|
| CSS color | `parseCssColor` ✓ | `serializeCssColor` ✓ |
| CSS timing function | `parseTimingFunction` ✓ | **absent** |

```
$ grep -rn "serializeTimingFunction\|serializeEasing\|timingFunctionToCss" src/
(no output)
```

And `/css` produces a `CssTimingFunction` AST that `/easing` cannot consume — there is
no published `CssTimingFunction → EasingFunction` evaluator. Both missing halves are
re-implemented **outside** the library:

**Missing half A (AST → callable)** lives at
`demo/workbenches/gradient/composables/useGradientCSS.ts:106-117`:

```ts
function timingFunctionValue(ast: CssTimingFunction, source: string): EasingFunction {
    switch (ast.kind) {
        case "keyword":         return easingValue(easing(ast.name), source);
        case "cubic-bezier":    return easingValue(CubicBezier(ast.x1, ast.y1, ast.x2, ast.y2), source);
        case "steps":           return easingValue(steppedEase(ast.count, ast.position), source);
        case "linear-function": return easingValue(linearEasing(linearStops(ast.stops)), source);
    }
}
```

Both the input type and the output type are value.js types. The demo owns the only
adapter between two of the library's own published capabilities. Alongside it,
`linearStops()` (`useGradientCSS.ts:80-104`) re-implements the CSS Easing Functions L2
`linear()` optional/double-position filling algorithm — because the library ships
`CssLinearStop` (`input: number[]`, `src/css/types.ts:28`) and `LinearEasingStop`
(`{output, input}` both required, `src/easing.ts:14`) with no conversion between them.

**Missing half B (value → literal)** is hand-mirrored in *two independent packages*.
`demo/workbenches/gradient/GradientVisualizer/easing/easingCatalogue.ts:41-58` says so
in its own prose:

```
// ── The literal mint law (byte-identity with the picker) ───────────────
// glass-ui `useEasingPicker.readout` mints `cubic-bezier(…)` by mapping each
// coordinate through `+n.toFixed(3)` and joining with `", "`, and `steps(…)`
// as `steps(${n}, ${term})`. … a tile-minted payload and a picker-emitted
// payload for the same curve MUST be byte-identical
export function bezierLiteral(quad: readonly number[]): string { … }
export function stepsLiteral(n: number, term: JumpTerm): string { … }
```

The canonical serializer is private inside `@mkbabb/glass-ui@7.0.0`
(`dist/easing.js:33-35`, unexported). The demo mirrors it byte-for-byte across a
package boundary, with **no test binding the two**. A formatting change in a future
glass-ui minor silently desynchronises persisted gradient literals from
picker-authored ones — `useGradientCSS.ts:44-50` explicitly relies on that byte
identity for `linearInterval()`.

- **Reproduction**: the `grep` above (absent inverse) + the three cited file:line
  blocks + `node_modules/@mkbabb/glass-ui/dist/easing.js:33-35`. NONE for the
  desynchronisation itself — that is a **hypothesis** about future releases; the
  duplication is a fact.
- **Mechanism**: a published capability seam with one direction implemented. Every
  consumer that needs the other direction mints it, so N consumers → N implementations
  and the "one home per concept" invariant is broken *by the library's shape*, not by
  consumer carelessness.
- **Cure**: value.js `/css` gains `serializeTimingFunction(ast: CssTimingFunction):
  string` (the exact inverse of the `parseTimingFunction` it already ships, and the
  exact sibling of the `parseCssColor`/`serializeCssColor` pair), and `/easing` gains
  `easingOf(ast: CssTimingFunction): Result<EasingFunction, EasingIssue>` — the
  round-trip closes inside the library. `linearStops` moves into `/css` as part of
  `parseTimingFunction`'s own normalisation, so `CssLinearStop.input` is already
  resolved when it crosses the API. glass-ui's `useEasingPicker.readout` and the demo's
  `bezierLiteral`/`stepsLiteral` both then call one published function, and byte
  identity becomes structural rather than aspirational. Net deletion: ~65 demo lines,
  ~10 glass-ui lines, one comment-enforced invariant.

### L-4 · MAJOR — that bridge is unreachable at runtime; it ships to satisfy one test

`GradientInterval = EasingPickerValue` (`useGradientModel.ts:49`), and glass-ui declares
`readonly fn: EasingFn;` — **required**, not optional
(`node_modules/@mkbabb/glass-ui/dist/components/easing/composables/useEasingPicker.d.ts`).
So every `GradientInterval` carries `fn` by type.

`useGradientCSS.ts:120-133` nevertheless *weakens* the parameter to create a branch the
type system says cannot be taken:

```ts
export function easingFnOf(
    interval: Pick<GradientInterval, "css"> & Partial<Pick<GradientInterval, "fn">>,
): EasingFunction {
    if (interval.fn) return interval.fn;          // ← always taken in the app
    const cached = resolvedEasingCache.get(interval.css);
    …
```

Call-site census:

```
$ grep -rn "easingFnOf" demo test
demo/…/composables/useGradientCSS.ts:190       easingFnOf(interval)          // GradientInterval
demo/…/GradientVisualizer.vue:78               easingFnOf(interval)(t)       // GradientInterval
demo/…/easing/useSpecimenRows.ts:52            easingFnOf(interval)          // GradientInterval
test/gradient-v4-consume.test.ts:49            easingFnOf({ css: "linear(0, 0.25 50%, 1)" })
test/gradient-v4-consume.test.ts:50            easingFnOf({ css: "not-an-easing" })
```

All three production sites pass a full `GradientInterval`. Only the **test** passes an
`fn`-less object. Consequently `resolvedEasingCache` (`:69`), `easingValue` (`:71-77`),
`linearStops` (`:80-104`), `timingFunctionValue` (`:106-117`), the `easingFnOf`
fallback body (`:124-132`) — ~65 lines — plus the imports of `CubicBezier`, `easing`,
`linearEasing`, `steppedEase`, `parseTimingFunction` are **dead in the browser**. They
ship anyway.

This is also a **false proof of the public API**: `parseTimingFunction` looks
dogfooded by the demo. It is not exercised on any user path.

- **Reproduction**: the grep above + the glass-ui `.d.ts` line declaring `fn` required.
- **Mechanism**: a type deliberately weakened at the boundary so a test can reach an
  otherwise-unreachable branch. The test's convenience became production surface.
- **Cure**: with L-3 landed, `easingFnOf` collapses to `interval.fn` and disappears;
  the CSS-literal → callable path becomes `easingOf(parseTimingFunction(css))` — a
  *library* function with *library* tests, in `test/` where it belongs. Delete the
  module-level `Map` with it (it is also unbounded and never cleared).

### L-5 · MAJOR — two sampling laws, measured to disagree by 107/255

`useGradientCSS.ts:2-4` claims the module *"owns the ONE sampling law
(`sampleCoalescedStops`)"*. There is a second one, in the component's `<script setup>`:
`GradientVisualizer.vue:64-88` `colorAtPosition(position)`. It re-walks the stops,
re-finds the interval, re-applies `easingFnOf`, and mixes — the same law, expressed
`position → color` instead of `model → samples[]`, and untestable where it sits.

They are not equivalent, because the rail paints **Law B discretised to 33 stops that
the browser then blends linearly**, while the add-ghost and the minted stop colour come
from **Law A, exact**. Measured (`…/scratchpad/sampling.mjs`, run against
`dist/subpaths/*` — the published surface):

```
easing = steps(4, jump-end), stops = oklch(0.75 0.15 145) -> oklch(0.65 0.18 265)
worst disagreement between the two sampling laws:
{"pos":24.99,"d":107,"A":[107,198,112],"B":[0,197,160]}
```

At 24.99 % the ghost previews `rgb(107,198,112)`; the rail under the cursor is
`rgb(0,197,160)`. **107/255 = 42 % of the red channel range.** Click there and the stop
you get is not the colour you clicked on.

- **Reproduction**: `node /private/tmp/.../scratchpad/sampling.mjs`. In the app: set an
  interval to `steps(4, jump-end)`, hover the rail near 25 %.
- **Mechanism**: the composable exposed only `model → samples[]`. The component needed
  `position → colour`, found no seam, and grew one. A stated invariant with no single
  callable to enforce it is a comment, not an invariant.
- **Cure**: make `rampColorAt(model, position): AnyColor` the primitive and define
  `sampleCoalescedStops` as `positions.map(p => rampColorAt(model, p))`. One law,
  literally. Then L-17 removes the discretisation entirely and the divergence cannot
  exist.

### L-6 · MAJOR — `demo/ui/*` is nineteen pure alias barrels over glass-ui

`GradientVisualizer.vue:9-10` imports `Select…` and `Slider` from `../../../ui/select`
and `../../../ui/slider`. Those files are, in full:

```ts
// demo/ui/select/index.ts
export { Select, SelectTrigger, SelectItem, SelectValue, SelectContent,
         SelectGroup, SelectLabel, SelectSeparator } from "@mkbabb/glass-ui";
// demo/ui/slider/index.ts
export { Slider } from "@mkbabb/glass-ui";
```

All nineteen `demo/ui/*/index.ts` are the same shape. `demo/ui/alert/index.ts` states
the history outright:

> *"This barrel previously held a local shadcn-vue re-implementation … B.W2 converted it
> to a re-export: glass-ui is the design system … The two consumers … import from this
> barrel unchanged."*

That is the definition of a migration shim: the implementation moved, the import path
was preserved so consumers would not have to change. The standing law
(`feedback_no_backwards_compat`) is *"migrate the consumer to the new API at the root"*.
Ninety demo import sites still route through the shim.

It is not cost-free. glass-ui publishes 70 granular subpaths (`./select`, `./slider`,
`./card`, …); the barrels re-export from the **root** entry, `dist/glass-ui.js`, which
opens with 46 chunk imports:

```
$ grep -c "^import" node_modules/@mkbabb/glass-ui/dist/glass-ui.js
46
$ ls -la node_modules/@mkbabb/glass-ui/dist/{glass-ui,select,slider}.js
25239  glass-ui.js      260  select.js       71  slider.js
```

This component *already knows better* — line 13 imports `DockControl` from
`@mkbabb/glass-ui/dock`. Two adjacent lines, two disciplines.

- **Reproduction**: `cat demo/ui/*/index.ts`; `ls -d demo/ui/*` → 19 directories, each
  containing only `index.ts`.
- **Mechanism**: a completed migration whose final step (retiring the compatibility
  path) was never taken.
- **Cure**: delete `demo/ui/` entirely; rewrite the 90 import sites to the glass-ui
  subpath that owns each primitive (`@mkbabb/glass-ui/select`, `/slider`, `/card`, …).
  Mechanical, one commit, and it re-establishes "one home per concept" for the whole
  design-system boundary. Add a `no-restricted-imports` ban on `**/ui/**` under the
  L-1 lattice so the layer cannot come back.

### L-7 · MAJOR — a three-hop re-export chain that exists for exactly one consumer: this component

```
GradientVisualizer.vue:17-21          from "../composables/useGradientModel"
  → useGradientModel.ts:21            export { INTERPOLATION_SPACES, HUE_INTERPOLATION_METHODS }
                                        from "./useGradientInterpolation"
    → useGradientInterpolation.ts:17  export { … } from "../../../color-session/color-space-meta"
      → color-space-meta.ts:26,38     the definitions
```

Both intermediate hops confess their purpose. `useGradientModel.ts:19` —
`// ── Re-exports (preserve public API surface) ──`. `useGradientInterpolation.ts:13-17`
— *"Re-exported here so the gradient tree's own consumers … keep their import path."*

The census shows the chain has exactly one remaining user:

```
$ grep -rn "INTERPOLATION_SPACES" demo | grep -v color-space-meta
demo/workbenches/gradient/composables/useGradientModel.ts:21        (the shim)
demo/workbenches/gradient/GradientVisualizer/GradientVisualizer.vue:19,186
demo/workbenches/mix/MixConfigBar.vue:60,107                        (direct)
```

`MixConfigBar.vue:16-18` already migrated, with a comment saying so: *"the interpolation
vocabulary lives in its neutral @lib/ home … no more cross-feature reach."* Gradient did
not. The shim's entire remaining job is to spare **one file** a one-line edit — and in
doing so it couples a pure data constant to a stateful composable module.

- **Reproduction**: the grep above.
- **Mechanism**: a half-finished migration; the barrel that was supposed to be
  scaffolding became permanent.
- **Cure**: `GradientVisualizer.vue` imports from `../../../color-session/color-space-meta`
  directly (matching Mix); delete both re-export blocks. Two deletions, one edit.

### L-8 · MAJOR — the interpolation-controls widget exists twice, and the copies have diverged

`GradientVisualizer.vue:179-211` and `MixConfigBar.vue:98-140` render the *same* pair of
Selects over the *same* two constants with the *same* `#description` slot. They differ
in one respect: Mix renders live `<PreviewRamp>` chips in the description lane
(`MixConfigBar.vue:111,133`); Gradient renders text only.

```
$ grep -rn "PreviewRamp" demo
demo/color-session/color-chips/PreviewRamp.vue          ← already in the neutral home
demo/color-session/color-chips/index.ts:25
demo/workbenches/mix/MixConfigBar.vue:23,111,133        ← only consumer
```

The improvement (T-17) landed on one copy. The Gradient pane — where interpolation
space has the most visible consequence — is the one without the preview. This is the
characteristic failure mode of duplication, caught in the act.

- **Reproduction**: open `/#/mix` and `/#/gradient`, open the "Space" dropdown on each.
- **Mechanism**: two features each hand-assembled the same control pair from
  primitives, because no component owns the concept.
- **Cure**: `demo/color-session/color-chips/` already hosts `PreviewRamp` and
  `sampleInterpolationRamp` — the neutral home exists. Add
  `InterpolationSelect.vue` (space + hue, chips included) beside them; both workbenches
  consume it. **No new `shared/` directory** — the home is the one the vocabulary
  already lives in, so this satisfies KISS rather than straining it.

### L-9 · MAJOR — three parallel clipboard idioms, with the split running through this directory

```
$ grep -rn "writeClipboard" demo | wc -l    → 14 call sites / 12 files
$ grep -rn "useClipboard"  demo | wc -l     →  4 call sites /  4 files
$ grep -rn "navigator.clipboard" demo       →  1 (picker/visual/PointerDebugOverlay.vue:112)
```

`GradientVisualizer.vue:12,127-129` uses `writeClipboard` — fire-and-forget, **no
confirmation state**. Its sibling in the same folder, `GradientEasingEditor.vue:29,94-103`,
uses `useClipboard({ resetMs: 1400 })` and renders a check-mark tick. Same concept, same
directory, two implementations, divergent user-visible behaviour: the per-interval copy
buttons confirm; the main **Copy CSS** button does not.

- **Reproduction**: on `/#/gradient`, click the copy icon in an Easing row (tick
  appears) then the copy icon in the CSS header (nothing happens visibly).
- **Mechanism**: glass-ui publishes both a stateless helper and a stateful composable
  for one concept; the demo picked per-site.
- **Cure**: `useClipboard` is the strictly-richer surface (it *is* `writeClipboard`
  plus status). Standardise on it demo-wide and ask glass-ui to retire the bare
  `writeClipboard` export — a BH relay item under the standing glass-ui relay edict.

### L-10 · MAJOR — a dock-scoped primitive used outside the dock, measured to degrade

`GradientVisualizer.vue:13,254`

```html
<DockControl compact title="Copy CSS" @click="copyCSS">
```

`DockControl`'s own contract (`dist/components/dock/DockControl.vue.d.ts`) states:
*"the painted plate insets via the dock-scoped `--dock-control-safe-inset` fold, while
the HIT CELL stays the full `--dock-control-size` (≥44px on coarse via the density
clamp)."* Those custom properties are **dock-owned**. Measured live on
`http://localhost:9000/#/gradient` (Playwright `evaluate`, ancestor walk):

| | `--dock-control-size` | `--dock-control-safe-inset` | rendered |
|---|---|---|---|
| in the real dock | `max( calc( 2.5rem * 1 ), 0px )` | `calc(… * 0.1)` | **40 × 40** |
| this call site | `""` (undefined at the button **and every ancestor**) | `""` | **28 × 28** |

The safe-inset fold and the coarse-pointer ≥44 px floor simply do not apply. It is also
the sole nameless button on the route — `aria-label` absent, only `title="Copy CSS"` —
matching `audit/visual/REPORT.md:100-113`, `namelessButtons: 1` on
`safari-desktop-light/dark` and `safari-mobile-light/dark` for `/#/gradient`.

The pattern is systemic — `DockControl` appears at 6 non-dock sites (gradient ×1, mix
×3, extract ×3) — but this component is one of them.

- **Reproduction**: the Playwright `evaluate` recorded above; and
  `docs/tranches/V/megatranche/audit/visual/REPORT.json`, `/#/gradient` row,
  `a11y.namelessButtons: 1`.
- **Mechanism**: a primitive whose geometry contract is satisfied by a *scope* it does
  not itself establish. Exported from `/dock` and usable anywhere, it fails open.
- **Cure**: this is a glass-ui structural defect, not a demo one, and belongs in the BH
  relay: either `DockControl` self-establishes its token defaults (`--dock-control-size`
  falls back to its own `:where()` default so it is correct standalone), **or** glass-ui
  publishes the non-dock sibling — `IconButton` under `@mkbabb/glass-ui/button` — and
  the six non-dock sites migrate. The latter is the honest fix: "a quiet square icon
  button" is a design-system primitive, not a dock part. Meanwhile the call site needs
  `aria-label="Copy CSS"`.

### L-11 · MAJOR — the shell reaches the gradient model through a three-hop `Ref<any>` chain

```
demo/shell/usePaneRouter.ts:107-111
    export interface PaneActionRefs { generate: Ref<any>; gradient: Ref<any>; mix: Ref<any>; }
demo/shell/usePaneRouter.ts:208-210
    handler: () => paneRefs.gradient.value?.copyCSS?.()
demo/workbenches/gradient/GradientPane.vue:11-15
    copyCSS: () => visualizerRef.value?.copyCSS?.(),
demo/workbenches/gradient/GradientVisualizer.vue:131
    defineExpose({ resetGradient, copyCSS, seedFromPalette });
```

Three hops, `any` at the top, optional-call masking at every hop
(`?.copyCSS?.()`). `@typescript-eslint/no-explicit-any` is `"off"` globally
(`eslint.config.js:70,184`), so nothing objects. Rename `copyCSS` in the leaf and the
dock button becomes a silent no-op with a green typecheck and a green lint.

The `?.` after the method name is a **masking fallback** in the sense the standing law
forbids: it converts a broken contract into silence.

- **Reproduction**: read the four cited lines; `Ref<any>` propagates `any` through
  `.value?.copyCSS?.()` by definition.
- **Mechanism**: the gradient model is *component-local state*
  (`useGradientModel()` called inside `GradientVisualizer.vue:32`), so the only way for
  the shell to act on it is to drill an instance-ref chain.
- **Cure**: the codebase already has the right idiom and this component already
  consumes it. Provide the gradient model as a **port** at `GradientPane` —
  `GRADIENT_PORT_KEY` in `demo/workbenches/gradient/keys.ts`, exactly parallel to
  `LIBRARY_PORT_KEY`/`CSS_COLOR_KEY` — and let the action bar `inject` it. All three
  `defineExpose` blocks and the `Ref<any>` triple delete themselves, and the actions
  become type-checked. This is the same cure as L-2 seen from the other side: keys are
  the demo's real cross-boundary contract, and `defineExpose` is the untyped shadow of
  it.

### L-12 · MINOR — `railRampCSS` recomputes on `direction`, which it provably ignores

`useGradientModel.ts:102-109` builds one monolithic `modelState` computed carrying all
six fields. `useGradientCSS.ts:325-327` derives three computeds from it, each
re-executing whenever *any* field changes.

`serializeRailRamp` (`:266-275`) reads only `stops` and, via `sampleCoalescedStops`,
`intervals`/`interpolationSpace`/`hueMethod`. It never reads `type` or `direction` — by
construction, the rail is always `linear-gradient(90deg, …)`. Yet dragging the
direction slider (`min 0, max 360, step 1` — up to 360 emissions per sweep) re-runs the
full 33-sample colour pipeline for the rail every tick.

Measured cost of one `sampleCoalescedStops` + serialize at the default 2-stop model
(`…/scratchpad/perf.mjs`, node, published `dist/subpaths`):

```
sampleCoalescedStops + serialize, 2-stop default model: 0.044 ms per call
per direction-slider tick the tree runs it TWICE (coalescedCSS + railRampCSS): 0.089 ms
sample count: 33, serialized bytes: 787
```

Small in absolute terms; it scales with stop count and it is entirely avoidable.

- **Reproduction**: read `useGradientCSS.ts:266-275` (no `type`/`direction` access)
  against `useGradientModel.ts:102-109` (both in the dependency). Vue does not
  deep-compare a computed returning a fresh object literal.
- **Mechanism**: one god-shaped state object as the sole dependency surface.
- **Cure**: split the state at its real seam — `rampState` (`stops`, `intervals`,
  `interpolationSpace`, `hueMethod`) and `geometry` (`type`, `direction`).
  `railRampCSS` depends on `rampState` alone; `coalescedCSS` composes both. The two
  serializers stop computing the same sample array twice, and the rail stops
  recomputing for a value it discards.

### L-13 · MINOR — a hand-rolled ghost icon button with per-instance styling

`GradientEasingEditor.vue:178-197` renders bare `<button class="rail-btn">` elements and
`:269-294` defines `.rail-btn`, `.rail-btn:hover`, `.rail-btn:focus-visible`,
`.rail-btn--on` locally. Same visual concept as L-10's `DockControl`, third
implementation in the tree (`DockControl` / `.rail-btn` / the specimen-tile
`glass-chip`). Violates both the glass-ui-first edict and the root-level-styling edict.

- **Reproduction**: `grep -rn "rail-btn" demo` → 7 hits, all in this one file.
- **Cure**: folds into L-10 — one glass-ui `IconButton` primitive, consumed at all
  three sites.

### L-14 · MINOR (out of axis, blocks measurement) — the gh-pages build emits no application

```
$ npx vite build --mode gh-pages
✓ built in 3.44s
$ find dist/gh-pages -name "*.js"
dist/gh-pages/assets/index-Dezn_h7o.js       ← 698 bytes, the modulepreload polyfill ONLY
dist/gh-pages/assets/quantize-worker-…js
```

The build reports success and emits no app chunks. This matches the carried
`gh-pages prod-preview empty-mount` item in `CARRY-LEDGER.md §F`. Recorded here because
it **prevented** the decisive measurement for L-2 (actual route-chunk sizes); the static
closure diff is the substitute.

### L-15 · MINOR — a stale rationale comment describing a library that no longer exists

`demo/shared/utils.ts:9-21` justifies the demo's forked `debounce`:

> *"`debounce` was the last symbol holding 7 demo files on the BARE `@mkbabb/value.js`
> specifier … the library's root-barrel export stands for external consumers."*

Both claims are now false:

```
$ node -e "const p=require('./package.json'); console.log('.' in p.exports)"   → false
$ grep -rn "export function debounce" src/                                    → (no output)
```

There is no root export in the map, and `debounce` no longer exists in `src/` at all.
A comment that describes a boundary that has moved is a false map, and this one is load-
bearing — it is the stated reason the fork is allowed to stand.

- **Cure**: delete the paragraph; `debounce` is simply the demo's utility now.

### L-16 · MINOR — non-idiomatic template ref in the pane, idiomatic in its children

`GradientPane.vue:9` uses `ref<InstanceType<typeof GradientVisualizer> | null>(null)`
with a string `ref="visualizerRef"`. `GradientCodeEditor.vue:31` and
`GradientStopEditor.vue` both use `useTemplateRef` correctly. Edict 7 (idiomatic Vue
3.5) — and the inconsistency is inside one feature. Dissolves entirely under L-11's
port cure, which removes the ref.

### L-17 · MINOR → the largest single simplification available

`rampGradient` (`useGradientCSS.ts:219-224`) and `serializeCoalescedGradient` (`:281-305`)
emit gradients with **no `<color-interpolation-method>`**, so the browser blends the
oklch sub-stops in **sRGB**. The 33-stop coalescing exists precisely to make that sRGB
blend imperceptible. Measured live on the running app:

```js
CSS.supports('background-image', 'linear-gradient(in oklch, red, blue)')              → true
CSS.supports('background-image', 'linear-gradient(in oklch longer hue, red, blue)')   → true
CSS.supports('background-image', 'conic-gradient(in oklab from 90deg, red, blue)')    → true

.gradient-rail                → { subStops: 33, hasInterpMethod: false, bytes: 1478 }
[data-testid=gradient-render-tile] → { subStops: 33, hasInterpMethod: false, bytes: 1471 }
```

The browser has supported the native form for years. The entire coalescing apparatus —
`COALESCE_RESOLUTION`, `sampleCoalescedStops`, `rampGradient`, `serializeRailRamp`,
`serializeCoalescedGradient`, ~1.5 KB of generated CSS per surface per keystroke — is
compensating for a serializer the *library* does not publish.

Note the compensation is not complete: easing genuinely cannot be expressed natively,
so per-interval easing must still be baked. But the **space** and **hue-method** halves
can and should be native, and the sub-stop density then only has to resolve the easing
curve, not the colour space — a far weaker requirement, and L-5's divergence collapses
with it.

- **Cure**: `serializeGradient` moves into value.js `/css` as
  `serializeGradient(model): string`, emitting
  `linear-gradient(in oklch longer hue, <stops>)` natively and baking sub-stops **only**
  where an interval carries a non-linear easing. Pairs with the gradient **parser**
  (below).

---

## The greenfield lattice

Stated concretely, as asked, with no hedging.

### value.js — `@mkbabb/value.js/css` gains the gradient capability

`demo/workbenches/gradient/composables/gradientParse.ts` is **301 lines of CSS
`<gradient>` parser living in a demo**. The library has none:

```
$ grep -rn "gradient" src/ -i
(no output)
```

A package whose description is *"Immutable, failure-explicit CSS color, value, easing,
transform, math, and quantization capabilities"*, which publishes `parseCssColor`,
`parseCssScalar`, `parseTimingFunction`, `parseStylesheet`, and `serializeCssColor`, has
no opinion on `<gradient>` — the single most common CSS value that is *made of* colors,
angles, and positions. The demo's own module header names the gap as the reason it
exists:

> *"Segmentation is textual … because the library's flat `FunctionValue` token stream
> loses the comma grouping — `red 30%, blue` and `red, 30%, blue` (an interpolation
> hint) parse to identical flat streams."* — `gradientParse.ts:12-16`

That is a demo working around a library defect and documenting it in place of fixing
it. The comma-grouping loss is a real bug in the library's value tokeniser, and the
fix belongs there.

```
@mkbabb/value.js/css
  parseCssColor / serializeCssColor                     (exists)
  parseTimingFunction / serializeTimingFunction         (+ the inverse — L-3)
  parseGradient / serializeGradient                     (+ new — absorbs gradientParse.ts
                                                          301 L and the serializers, and
                                                          emits `in <space>` natively — L-17)
@mkbabb/value.js/easing
  easingOf(ast: CssTimingFunction): Result<EasingFunction, EasingIssue>
                                                        (+ the AST→callable bridge — L-3/L-4)
```

The demo's parser is *good* — model-or-reject, library-oracle validation, no silent
drops, authored literals preserved. It is a better parser than most published ones. It
is in the wrong package. Moving it up is the single highest-value transposition
available in this tree, and it turns 635 lines of demo composable into roughly 80.

### glass-ui — one relay, two items

- Export the picker's literal mint so `easingCatalogue.bezierLiteral` /
  `stepsLiteral` can be deleted rather than mirrored (L-3) — or, better, have
  `useEasingPicker` consume value.js `serializeTimingFunction` once it exists, at which
  point both copies vanish.
- Publish `IconButton` under `@mkbabb/glass-ui/button` and make `DockControl` a
  dock-scoped *composition* of it, so the six non-dock call sites stop borrowing a
  primitive whose contract they cannot satisfy (L-10, L-13).

### demo — four layers, keys as the only cross-boundary contract

```
shell/          shell, color-picker            — routing, dock, panes
  ↓
feature/        workbenches/*, palettes, scenes, picker
  ↓                 ·  sibling feature→feature edges BANNED
session/        color-session                  — the color spine + color-chips + keys
  ↓
platform/       transport, auth, storage
leaf/           shared                         — zero-dependency utilities
                (ui/ DELETED — consume glass-ui subpaths directly)
```

with, for this feature specifically:

```
demo/workbenches/gradient/
  keys.ts                     GRADIENT_PORT_KEY  (the shell's typed contract — L-11)
  GradientPane.vue            provides the port; no defineExpose, no InstanceType ref
  model/
    state.ts                  rampState + geometry, split at the invalidation seam (L-12)
    ports.ts                  useGradientModel → the provided port
  GradientVisualizer/
    GradientVisualizer.vue    layout + wiring only; colorAtPosition GONE (L-5)
    GradientStopEditor.vue
    GradientCodeEditor.vue
    GradientEasingEditor.vue
    easing/                   specimen gallery only; easingCatalogue's literal
                              minting GONE (L-3)
```

`composables/gradientParse.ts` → value.js. `composables/useGradientCSS.ts` → value.js
(serializers) + `model/state.ts` (the two reactive derivations). The interpolation
Select pair → `demo/color-session/color-chips/InterpolationSelect.vue`, shared with Mix
(L-8). No new `shared/` directory anywhere; every destination is a home that already
exists.

---

## Strongest defect

**L-1.** Not because it is the largest — L-2 and L-3 cost more — but because it is the
one that made the others possible and will make them recur. Nineteen alias barrels, a
three-hop re-export chain, a 72-module cross-feature edge, and a `Ref<any>` shell
handle all survive in a repository that believes it enforces its module lattice. It
does not: `no-restricted-imports` is `undefined` for the file under audit, and the three
demo boundary rules point at a directory (`demo/@`) that has not existed since W43.
Every other finding in this report is a thing that lint was supposed to catch and
silently stopped catching.
