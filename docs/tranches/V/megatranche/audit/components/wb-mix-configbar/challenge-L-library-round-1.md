# CHALLENGE-L — library structure · `demo/workbenches/mix/MixConfigBar.vue`

## Model receipt

I observe myself to be **Opus 5** (exact model id `claude-opus-5[1m]`), the tier declared
at spawn. Declaration honoured, not inherited.

- Repo `/Users/mkbabb/Programming/value.js`, branch `tranche-u`, HEAD `c654824e`.
- Subject: `demo/workbenches/mix/MixConfigBar.vue` (173 lines).
- Axis: library structure — module boundaries, ownership, direction of dependency,
  public surface.
- Write scope honoured: this file is the only artifact. No source edited.

---

## §0 · Method + the import lattice as found

Every one of the component's nine import edges traced to its physical home:

| # | line | specifier | resolves to | verdict |
|---|---|---|---|---|
| 1 | 2 | `vue` | runtime | SOUND |
| 2 | 3–9 | `../../ui/select` | `demo/ui/select/index.ts` → `@mkbabb/glass-ui` | **L-4** alias barrel |
| 3 | 10 | `../../ui/button` | `demo/ui/button/index.ts` → `@mkbabb/glass-ui` | **L-4** alias barrel |
| 4 | 11 | `@lucide/vue` | glass-ui peer dep | SOUND |
| 5 | 12 | `@mkbabb/value.js/color` | published subpath (`src/subpaths/color.ts:8`) | **SOUND — see §Negative proof** |
| 6 | 13 | `../../color-session/picker-color` | demo lib leaf | SOUND |
| 7 | 14 | `../../palettes/mix` | **sibling FEATURE tree** | **L-2** |
| 8 | 15 | `reka-ui` | glass-ui's own peer, reached *around* glass-ui | **L-6** |
| 9 | 18, 23 | `../../color-session/color-space-meta`, `../../color-session/color-chips` | demo lib leaves | SOUND home, **L-5** dual path |

Probes run: source trace; `node_modules/@mkbabb/glass-ui@7.0.0` published `.d.ts` +
`exports` map; the live dev server at `:9000` (Playwright, read-only); one targeted
Playwright e2e run; the megatranche visual audit `REPORT.json` + both `/#/mix` shots.

---

## §1 · L-1 — BLOCKER · the component's entire preview-ramp feature is unreachable, because the demo passes a prop the design system does not have

**Mechanism.** `demo/workbenches/mix/MixSourceSelector.vue:164–176` renders the mix
workbench's add-a-color affordance as

```vue
<WatercolorDot
    variant="ghost"
    tag="button"                                   <!-- :168 -->
    aria-label="Add current color to the mix"      <!-- :171 -->
    :disabled="!canAddColor || undefined"
    @click="addCurrentColor"
>
```

glass-ui 7.0.0's `WatercolorDot` **has no `tag` prop.** Its published prop set
(`node_modules/@mkbabb/glass-ui/dist/components/watercolor-dot/WatercolorDot.vue.d.ts`)
is exactly `{ color, variant?, animate?, cycleDuration?, range?, seed? }`. The component
is a *decorative* primitive: it renders a `<span>`, force-stamps `aria-hidden="true"`,
and sets **inline `pointer-events: none`** (verified: not from any stylesheet — matched
CSS rules with `pointer-events:none` = `[]`; the declaration is in the element's own
`style` attribute alongside the seeded `border-radius`).

`tag` / `aria-label` / `@click` are therefore fallthrough attrs that glass-ui discards.
Vue never type-errors on an extra attr passed to a component, so `vue-tsc` is silent by
construction. This is a **legacy prop from glass-ui ≤ 6 left behind by the 7.0.0
adoption (W44)**.

**Measured, live at `http://localhost:9000/#/mix` (fresh load):**

```
{ pointerEvents: "none", display: "flex", opacity: "1",
  rect: { w: 48, h: 48 },
  ariaHidden: "true", hasAriaLabel: false, tabIndex: -1,
  swatchesBefore: 5, swatchesAfter: 5 }     // el.click() → state unchanged
```

Playwright's own click times out: `<html> intercepts pointer events`.

After opening the "From palettes" collapsible (the *only* other add path in colors mode):

```
{ totalSwatches: 13, pointerDeadSwatches: 13, realAddColorButtons: 0 }
```

**13 of 13** add affordances are pointer-dead, keyboard-dead and AT-invisible. There is
no route to `selectedColors.length ≥ 1` in colors mode.

**Consequence for the subject component — this is why it is a *library* finding.**
`MixPane.vue:112` passes `:operand-colors="mode === 'colors' ? selectedColors.map(...) : []"`.
Colors mode can never reach ≥ 2 operands; palettes mode passes `[]` by design. So
`operandColors` is **permanently `[]`**, `sampleInterpolationRamp` returns `null` for
every row (`sample.ts:60` — `if (operandsCss.length < 2) return null`), and every
`<PreviewRamp v-if>` in the subject is false. The whole T-17 apparatus —
`MixConfigBar.vue:19–23` (the module import + its 5-line rationale), `:47–74` (both
`computed` ramp maps), `:104–115` and `:127–137` (both chip lanes) — roughly **45 % of
the file** — is dead code in the shipped app.

Measured with the subject's own Color-space menu open, live:

```
{ options: 9, dataStops: 0, previewRamps: 0,
  firstOptionHTML: "…<span id=…>OKLCh </span><span class=\"flex items-center gap-2\">
                    <!--v-if--><span class=\"text-micro …\">Perceptual, hue-preserving</span>…" }
```

`<!--v-if-->` — the `PreviewRamp` branch, never taken.

**The oracle built to catch this is broken by the same defect.**
`e2e/smoke/oracles/o14-preview-truth.spec.ts:353` seeds operands through
`getByRole("button", { name: "Add current color to the mix" })` — a role+name that
no longer exists in the DOM. Run against this tree:

```
$ npx playwright test e2e/smoke/oracles/o14-preview-truth.spec.ts --project=smoke -g "T-17"

  Error: locator.click: Test timeout of 30000ms exceeded.
    - waiting for getByRole('button', { name: 'Add current color to the mix' })
  > 355 |         await addSlot.click();

  2 failed
    › o14-preview-truth.spec.ts:346 › every open-menu chip's painted gradient carries exactly its stamped stops
    › o14-preview-truth.spec.ts:404 › the chip feasibility leg …
  1 passed                                                    (43.6s)
```

The **one passing leg** is `:334` *"honest absence: with <2 operands the rows carry NO
chip"* — which now passes **vacuously and permanently**. And `test/preview-chips.test.ts`
is green because it calls `sampleInterpolationRamp` directly: it proves the sampler, never
the consume path. A green unit suite over a dead feature.

**Blast radius — repo-wide, same mechanism.** 7 `tag="button"` sites across 4 files, every
one a dead interactive affordance:

```
demo/workbenches/mix/MixSourceSelector.vue:168, :215
demo/workbenches/generate/GenerateControls.vue:203
demo/palettes/browser/card/SwatchHoverMenu.vue:17, :32
demo/palettes/browser/card/CurrentPaletteEditor.vue:98
```

plus ~14 `tag="div"` sites (cosmetically inert, equally dead props) in `MixResultDisplay`,
`Dock`, `EmptyState`, `ColorSpaceSelector`, `ConsoleRail`, `ImageEyedropper`.

**Reproduction.** `http://localhost:9000/#/mix` → devtools →
`getComputedStyle(document.querySelector('.add-slot-ghost')).pointerEvents` → `"none"`;
`document.querySelectorAll('button[aria-label^="Add color"]').length` → `0`.

**Cure — architectural, not a patch.** The interactive seat is not the dot's job. Wrap,
do not polymorph: the affordance is a real `<button>` (or glass-ui's existing `Chip` /
`Button` primitive) that *contains* a decorative `<WatercolorDot aria-hidden>`. Semantics
and focus live on the wrapper the demo owns; paint lives on the glass-ui primitive. Then
delete all 21 `tag=` props. If a `tag`-polymorphic swatch is genuinely wanted, that is a
glass-ui change (a `SwatchButton` variant, edict 4) — **relay to the glass-ui BH inbox
either way**, because a primitive that silently swallows `@click` + `aria-label` while
stamping `aria-hidden` is a footgun for every consumer.

---

## §2 · L-2 — MAJOR · the mix domain module is homed in a sibling feature tree, and half of it is library code

`MixConfigBar.vue:14` imports `LeftoverStrategy` from `../../palettes/mix`. Consumers of
that module, complete:

```
$ grep -rn 'palettes/mix"' demo --include='*.vue' --include='*.ts'
demo/workbenches/mix/MixConfigBar.vue:14
demo/workbenches/mix/composables/useMixingState.ts:21
```

**Zero consumers inside `demo/palettes/`.** `demo/palettes/` is a *feature* tree — it
holds `PalettesPane.vue`, `BrowsePane.vue`, `admin/`, `api/`, `browser/`. The mix
workbench's own domain module lives inside a sibling feature and every consumer reaches
across the boundary to get it. This is the exact pathology the subject's own header
comment claims was cured for the *other* vocabulary:

> `MixConfigBar.vue:16–17` — *"S.W5-6 · F16: the interpolation vocabulary lives in its
> neutral @lib/ home (color-space facts, not gradient facts) — no more cross-feature reach."*

The cure was applied to one of the two cross-feature reaches in the same file and not the
other.

**Sharper half.** `demo/palettes/mix.ts:40–67` exports `mixColorSequence` — N-ary,
weighted color mixing over `readonly AnyColor[]` with a `SpaceId` and a
`HueInterpolationMethod`. It has **zero** demo, DOM, Vue or palette coupling. The
published library's only mixing primitive is *binary*:

```
$ grep -rn "export function mixColors" src/
src/color/operations.ts:83:export function mixColors<S extends SpaceId>(from, to, progress, options)
```

So the demo — the dogfood proof of the public API — is the only place in the constellation
that knows how to mix more than two colors, and the color library cannot. Same argument
applies to `color-chips/sample.ts:52–88`: *"sample the interpolation of N operands at k
points"* is a library operation, not a chip concern; its only non-library dependencies are
`parseColorIn`/`colorToCss`, which are 3-line wrappers (`color-utils.ts:11–13, 23–25`).

**Cure.** Promote both to `src/color/operations.ts` beside `mixColors` and out through
`src/subpaths/color.ts` — `mixColorSequence(colors, {space, hue, weights})` and
`sampleColorRamp(colors, {space, hue, k})`. Then `demo/palettes/mix.ts` collapses to the
palette-shaped remainder (`LeftoverStrategy`, `getColorAtIndex`, `mixPalettes`) and moves
to `demo/workbenches/mix/mix.ts` beside its only consumers. Net: the library gains two
genuinely reusable operations, the demo loses a cross-feature edge, and `sample.ts`
becomes a ~10-line serialization shim.

---

## §3 · L-3 — MAJOR · a second, diverged implementation of this exact component

`GradientVisualizer.vue:179–210` is the same block as `MixConfigBar.vue:97–140`: the same
Space `Select` + Hue `Select` pair, over the same `INTERPOLATION_SPACES` /
`HUE_INTERPOLATION_METHODS`, with the same `h-9` trigger, the same `#description` lane,
the same `text-micro text-muted-foreground` caption, the same
`(v: AcceptableValue) => … as PickerSpace` cast idiom.

The two homes have **diverged**: the T-17 preview-chip grammar landed in the Mix copy and
never in the Gradient copy. Measured, live — `/#/gradient`, Space menu open (gradient
always carries ≥ 2 stops, so the sampler would return non-null):

```
{ openItems: 9,
  labels: ["OKLCh Perceptual, hue-preserving", "OKLab Perceptual, smooth", … "XYZ CIE absolute"],
  dataStopsInDoc: 0 }
```

The divergence is *documented as pending and never landed*:
`demo/color-session/color-chips/index.ts` — *"Lane D wires MixConfigBar + AuroraPane; …
the GradientVisualizer consume through Lane G's queue."* Lane G's queue never drained.
Two homes for one concept, disagreeing, with a handoff note standing in for the invariant.

**Cure.** One component owns the interpolation-config pair. Extract
`demo/color-session/InterpolationConfig.vue` beside `ColorSpaceSelector.vue` (the existing
precedent for a shared color-vocabulary control) with
`v-model:space` / `v-model:hue` / `:operands`, chips included by construction. Mix and
Gradient both consume it; `MixConfigBar` shrinks to the leftover-strategy row + the Mix
verb — roughly 60 lines. That also fixes L-3 in one move rather than porting chips into
the second copy.

---

## §4 · L-4 — MAJOR · `demo/ui/` is 19 alias barrels and a live dual path

Every file under `demo/ui/` is a pure re-export of `@mkbabb/glass-ui` with no added
surface. Measured — non-comment line counts:

```
2 demo/ui/alert/index.ts        1 demo/ui/button/index.ts     1 demo/ui/select/index.ts
1 demo/ui/avatar/index.ts       1 demo/ui/card/index.ts        …
TOTAL barrel files: 19          TOTAL non-comment lines: 20
```

`demo/ui/select/index.ts` in full:

```ts
export { Select, SelectTrigger, SelectItem, SelectValue, SelectContent, SelectGroup, SelectLabel, SelectSeparator } from "@mkbabb/glass-ui";
```

The subject reaches the design system through this indirection at lines 3–10. Meanwhile
the rest of the demo reaches it directly:

```
barrel-import sites:      90
direct @mkbabb/glass-ui:  119
```

Two live routes to one design system, split ~43/57 with no rule — `Select`, `Button`,
`Card` go through a barrel; `WatercolorDot`, `DockControl`, `SearchBar`, `SegmentedTabs`,
`GlassDock`, `Chip`, `FadingScroll` do not (`MixSourceSelector.vue:7` imports
`WatercolorDot` direct from `@mkbabb/glass-ui/watercolor-dot`, five lines from where
`MixPane.vue:12` imports `writeClipboard` direct and `MixPane.vue:3` imports `Card`
through a barrel). `demo/ui/alert/index.ts:1–9` even carries the migration note explaining
that the barrel *once* held a local implementation and was converted — i.e. it is
self-documented as a back-compat shim that outlived its migration.

This violates edict 2 (no aliases, no dual paths) and edict 3 (no wrapper layers that add
nothing) directly.

**Cure.** Delete `demo/ui/` entirely; rewrite the 90 import sites to the glass-ui
specifier they already resolve to (`@mkbabb/glass-ui`, or the subpath where one exists —
`demo/ui/input/index.ts` is the only barrel hiding a subpath, `@mkbabb/glass-ui/forms`).
Mechanical, one commit, and it removes the last place in the tree where "which import
path is correct?" has two answers.

---

## §5 · L-5 — MAJOR · a three-hop re-export chain kept alive to preserve import paths

The same two constants are reachable by three distinct specifiers:

```
demo/color-session/color-space-meta.ts:26,38                       ← the canonical home
  └─ re-exported: workbenches/gradient/composables/useGradientInterpolation.ts:17
       └─ re-exported: workbenches/gradient/composables/useGradientModel.ts:21
            └─ consumed: workbenches/gradient/GradientVisualizer/GradientVisualizer.vue:19-20
```

The subject imports the canonical home (`MixConfigBar.vue:18`); Gradient imports the end
of the chain. The reason is stated in the source:

> `useGradientInterpolation.ts:14–16` — *"Re-exported here so the gradient tree's own
> consumers (`useGradientModel` → visualizer) **keep their import path**."*

That is a back-compat shim in the exact words edict 2 prohibits. It also makes
`useGradientModel` — a *model* composable — a re-export hub for color-space *metadata*
it never touches.

**Cure.** Delete both `export { … } from` lines; point `GradientVisualizer.vue:19–20` at
`color-session/color-space-meta` — the same one-line import the subject already writes.
Subsumed entirely if §3's cure lands.

---

## §6 · L-6 — MAJOR · reaching *around* the design system for a type, because glass-ui does not publish it

`MixConfigBar.vue:15` — `import type { AcceptableValue } from "reka-ui";` — used to type
glass-ui `Select`'s emit at lines 99, 122, 146.

glass-ui 7.0.0's `Select` does **not** emit that type
(`dist/components/select/Select.vue.d.ts`):

```ts
export interface SelectEmits {
    "update:modelValue": [value: SelectionValue];
    "update:open": [value: boolean];
}
```

and `dist/components/_shared/selection.d.ts`:

```ts
/** Stable scalar identity used by Glass selection controls. */
export type SelectionValue = string | number;
```

reka-ui's type is strictly wider — `string | number | bigint | Record<string, any> | null`
(`node_modules/reka-ui/dist/index3.d.ts:231`). So the handler advertises a contract glass-ui
never offers (`bigint`, objects, `null`), and then launders the whole thing with an
unguarded `v as PickerSpace`. It compiles only because a wider handler param is
contravariantly assignable — the type system is agreeing with a false statement.

**Root cause is a glass-ui public-surface hole, and it is measurable:**

```
$ grep -ln "SelectionValue" node_modules/@mkbabb/glass-ui/dist/*.d.ts
(no output)
```

`SelectionValue` is named in no published entrypoint. `dist/select.d.ts` is
`export * from "./components/select"`, and `components/select/index.d.ts` re-exports
`SelectProps`/`SelectEmits`/`SelectItemProps` but not the alias itself. glass-ui's
`exports` map (69 subpaths) has no `./components/*` wildcard, so the deep path is blocked.
**A consumer cannot name the model-value type of glass-ui's own Select through glass-ui's
public API.** That is why four demo files reached for reka-ui instead:

```
demo/workbenches/mix/MixConfigBar.vue:15
demo/workbenches/gradient/GradientVisualizer/GradientVisualizer.vue:28
demo/workbenches/generate/GenerateControls.vue:33
demo/scenes/atmosphere/AuroraPane.vue:25
```

**Cure, two-sided.** (a) **BH relay to glass-ui**: export `SelectionValue` /
`isSelectionValue` from the root barrel and from `./select` — a one-line
`export type { SelectionValue }` in `components/select/index.ts`. (b) In the demo, type
the handlers `(v: SelectionValue)` and delete all four `reka-ui` imports; the demo then
touches the design system's transitive deps in exactly zero places. Interim, if the relay
is slow: `SelectProps["modelValue"]` is nameable *today* through the published surface and
is honest — no new dependency edge, no wider lie.

---

## §7 · L-7 — MINOR · the leftover-strategy vocabulary is split, and half of it is drift-prone by construction

The subject models the *same kind of thing* two different ways in 173 lines. Space and hue
get a proper meta module with `{ value, label, description }`
(`color-space-meta.ts:26,38`). Leftover strategy gets its type in one tree and its
vocabulary hand-inlined in the SFC:

```ts
// MixConfigBar.vue:83-89
const STRATEGIES: LeftoverStrategy[] = ["discard", "repeat", "distribute"];
const strategyLabels: Record<LeftoverStrategy, string> = { … };
```

`strategyLabels` is exhaustive-checked (a `Record` over a union requires every key).
`STRATEGIES` is **not** — it is a hand-restatement of the union's members that TypeScript
cannot police. Add a fourth strategy to `palettes/mix.ts:19` and `strategyLabels` errors
loudly while `STRATEGIES` silently drops the new option from the UI: type and vocabulary
in two trees, one of the two links unenforced.

**Cure.** One `LEFTOVER_STRATEGIES: { value; label; description }[]` beside the type in
the (relocated, §2) mix module; derive the union from it
(`type LeftoverStrategy = typeof LEFTOVER_STRATEGIES[number]["value"]`) so the list is the
single source and drift is impossible. The SFC then holds zero vocabulary — matching how
it already treats spaces and hues.

---

## §8 · L-8 — MAJOR · nobody owns portal teardown across a route change; one open `Select` bricks the app

Reproduced end-to-end, live:

1. `http://localhost:9000/#/gradient`
2. click `[aria-label="Interpolation space"]` (opens a glass-ui `Select`)
3. navigate to `http://localhost:9000/#/mix` — hash route change, no reload

```
document.body.getAttribute('style')
  → "pointer-events: none; overflow: hidden;"

// hit-test at the centre of a pane control (add-slot rect x687 y344 48×48):
document.elementFromPoint(711, 368).tagName  → "HTML"
```

Nothing inside the pane is hit-testable — the guard is on `<body>`, so the subject's two
`Select`s and the Mix verb are dead alongside everything else. A hard reload of `/#/mix`
clears it (`document.body.getAttribute('style')` → `null`, the same hit-test →
`DIV.swatch-row`), which isolates the cause to the cross-route overlay: reka-ui's body scroll-lock/pointer guard is applied on open and its teardown never
runs when the route change unmounts the portal.

This is an **ownership hole**, and it is the reason it belongs on the library axis: no
module in `demo/shell/` owns *"dismiss every portalled overlay on route change."* Each pane
mounts overlays; nobody unmounts them as a class. The subject is not the victim here so
much as a future perpetrator — its two `Select`s can strand any route the user navigates to
next by the identical path *(that direction is a **hypothesis** — I measured
gradient → mix only)*.

**Cure.** One shell-level guard, not a per-pane fix: a `router.beforeEach` (or a single
`watch(route)` in the app shell) that closes all open overlay state and, defensively,
clears the body lock — one writer, one place. Relay the underlying teardown miss to
glass-ui, since the guard is glass-ui's `Select`/reka's to release.

---

## §9 · L-9 — INFO · a per-frame cost that goes live the moment L-1 is fixed

`MixConfigBar.vue:57–74` builds two `Map`s over 9 spaces + 4 hue methods; each entry is a
16-sample ramp (`RAMP_SAMPLE_COUNT = 16`), i.e. **13 × 16 ≈ 208 `mixColors` calls per
re-evaluation** of the pair.

The file's own claim at lines 19–22 — *"The chips render only while `SelectContent` is
mounted … so the sampling costs nothing at rest"* — is **correct**: Vue `computed`s are
lazy, the only readers are inside the unmounted `SelectContent` subtree, so nothing runs
while closed. I verified this rather than assuming it, and it is not a finding.

It *becomes* one once L-1 is cured: with the menu open and the picker driving
`operandColors`, every pointer-move re-runs all 208 mixes. Fold the guard into §2's cure —
`sampleColorRamp` in the library, memoised on `(operands, space, hue)`, and only the
candidate axis re-sampled per row rather than the full cross-product.

---

## §10 · The greenfield lattice

Stated concretely, no legacy. Three strata, edges only ever downward.

```
LIBRARY   @mkbabb/value.js/color        mixColors · mixColorSequence · sampleColorRamp
              ↑ (published subpaths only — never src/)
DEMO LIB  demo/color-session/           picker-color · color-utils · color-space-meta
              │                          color-chips/{PreviewRamp,PreviewStrip}
              │                          InterpolationConfig.vue      ← §3
              ↑
FEATURES  demo/workbenches/mix/         MixPane · MixSourceSelector · MixConfigBar
                                        MixResultDisplay · mix.ts     ← §2
          demo/workbenches/gradient/    (consumes InterpolationConfig — no second copy)
          demo/palettes/                (no longer exports mix math)
DESIGN    @mkbabb/glass-ui              imported by ONE specifier, everywhere  ← §4
SHELL     demo/shell/                   owns route↔overlay lifecycle           ← §8
```

Four rules the current tree breaks, and what each buys:

1. **One specifier per dependency.** `demo/ui/` deleted (§4); the three-hop re-export
   chain deleted (§5); `reka-ui` unreferenced (§6). Net −19 files, −2 re-export lines,
   −4 dependency edges, and no import question with two right answers.
2. **A module lives with its consumers.** `mix.ts` moves into `workbenches/mix/` and
   loses its library half upward (§2). `demo/palettes/` becomes purely the palettes
   feature.
3. **One home per concept.** `InterpolationConfig.vue` in `color-session/` is the sole
   space+hue control; Mix and Gradient consume it (§3). `MixConfigBar` shrinks 173 → ~60
   lines and stops being two things.
4. **Semantics on elements the demo owns; paint on glass-ui primitives.** No `tag=`
   polymorphism across the design-system boundary (§1). Every interactive affordance is a
   real `<button>` the type system and the a11y tree can both see.

The strongest single move is (4): it is the only one that changes what a user can
actually do today.

---

## §11 · Negative proof — what I checked and found genuinely sound

Recorded so the absences are evidence, not silence.

- **The published-surface consume is correct.** `MixConfigBar.vue:12` imports
  `HueInterpolationMethod` from `@mkbabb/value.js/color` — a real key in
  `package.json#exports`, backed by `src/subpaths/color.ts:8`. The demo resolves it
  through an alias set **generated from `package.json#exports`** at
  `vite.config.ts:37–50`, so it cannot drift from the published map. Zero `@src/*` and
  zero deep-`src/` imports anywhere in the subject's transitive demo graph — a real
  consumer could write every value.js import in this file verbatim. This half of the
  library boundary is the cleanest thing in the audit, and L-2's cure extends it rather
  than repairing it.
- **`verbatimModuleSyntax` is honoured.** All four type-only imports (lines 12, 13, 14,
  15) carry `import type`; the six value imports do not. No violation.
- **Vue 3.5 idioms are correct.** Reactive props destructure with a default at lines
  25–45 (`operandColors = []`); typed `defineEmits` at 76–81; no `defineModel`
  stale-read hazard (the component is emit-based, not model-based); no template refs
  needed. Nothing to report under edict 7.
- **The "costs nothing at rest" claim is true**, verified rather than assumed — see §9.
- **The component renders correctly and accessibly in the shipped matrices.**
  `docs/tranches/V/megatranche/audit/visual/REPORT.md:123,138,153,168` — `/#/mix` scores
  `overflowX 0 · pageErr 0 · consoleErr 0` across all four Safari matrices. I read both
  `shots/safari-desktop-light/mix.png` and `shots/safari-mobile-dark/mix.png`: the
  `grid-cols-2` pair holds at 390 px without wrap or clip, labels and triggers legible in
  both schemes. The route's 8 small tap targets are all dock/picker chrome — from
  `REPORT.json` `probe.a11y.smallTapTargets`: `"Switch to slug"`, `"Generate new slug"`,
  `"Cancel"`, `"L/A/B/ALPHA channel"` — **none** belong to `MixConfigBar`. Its own
  `SelectTrigger`s carry `aria-label="Color space"` / `"Hue method"` / `"Size mismatch
  strategy"` and appear in the live a11y tree. The single `namelessButtons: 1` on the
  route is not this component's.
- The disabled, low-contrast Mix verb visible in both screenshots is **not** a styling
  defect — it is L-1's symptom. `canMix` is structurally unreachable, so the button is
  correctly disabled, forever.

---

## §12 · Verdict

**DEFECTIVE.** One BLOCKER, five MAJOR, one MINOR, one INFO.

The strongest defect is **L-1**: the subject's headline feature — the T-17 library-sampled
preview ramps, ~45 % of the file and the reason three of its nine imports exist — has never
rendered once in the shipped application, because a sibling component passes `tag="button"`
to a glass-ui 7.0.0 primitive that has no `tag` prop and renders an `aria-hidden`,
`pointer-events: none` `<span>`. The type system cannot see it (a fallthrough attr is never
an error), the unit oracle cannot see it (it tests the sampler, not the consume path), the
e2e oracle built to see it is broken by the same defect and its surviving leg passes
vacuously, and the visual audit cannot see it because the ramps live behind a closed
dropdown. Six independent gates, all green, over a dead feature.

Every other finding is a boundary that should not exist: a domain module in the wrong tree
with library math trapped inside it (L-2), a second diverged copy of this exact component
(L-3), nineteen alias barrels and a 90-vs-119 dual path (L-4), a three-hop re-export chain
kept alive to preserve import paths (L-5), a type borrowed from the design system's own
dependency because the design system will not publish it (L-6), and an unowned
route↔overlay lifecycle that lets one open `Select` brick the page (L-8).
