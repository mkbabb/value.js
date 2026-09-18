# CHALLENGE-L — library structure under `GradientVisualizer` · ROUND 4

> **This file supersedes nothing (E-3, addenda-not-patch).** Three prior seats ran this axis; all
> three are preserved verbatim beside this file:
>
> - `challenge-L-library.pass-1-2026-07-27.md` — r1, **L-1 … L-17**
> - `challenge-L-library.pass-2-r2-2026-07-28.md` — r2, **R2-1 … R2-11**, incl. the BLOCKER
>   (`ease-*-back` → `color_progress_out_of_range` → whole-app erasure)
> - `challenge-L-library.pass-3-r3-2026-07-28.md` — r3, **L3-1 … L3-5** + a replication ledger
>
> Round 4 was run **blind**: the closure trace, the four browser probes, the node measurements and
> the cycle enumeration below were all produced *before* any prior report was opened. It is reported
> as an independent replication plus delta. §2 is the replication ledger. §3 carries **only** what is
> new. §4 carries two corrections **to my own blind draft** and one **material correction to r1 L-3**.
> §5 states what r4 failed to find that the priors did — recorded as a miss, not omitted.

## Model receipt

I observe myself to be **Opus 5** — exact model id `claude-opus-5[1m]`, the 1M-context Opus 5 seat,
matching the explicit declaration this seat was spawned with. Declared, not inherited.

---

## 0 · Substrate and method

- **Subject**: `demo/workbenches/gradient/GradientVisualizer/GradientVisualizer.vue` (279 L), area
  `demo/workbenches`.
- **Substrate**: branch `tranche-u`. The brief pins HEAD `c654824e`; r3 read at `f36f780c`; the tree
  had advanced again to **`06377848`** (`docs(V·mega): workbenches 5th deploy harvested — 18/19 on
  disk, wb-gradient-pane sole gap`) when this seat opened. All line numbers read at `06377848`.
- **Method**: a `python3` import-graph resolver over real `import`/`export … from` edges across
  `.ts`/`.vue` (script in the session scratchpad), run twice — once whole, once with a single edge
  severed — plus a Tarjan-style cycle enumeration over the feature; a multi-line-aware
  import-statement parser for the per-symbol consumer census; module-closure byte measurement inside
  `node_modules/@mkbabb/glass-ui/dist`; **four** `node` executions of the *built* `dist/subpaths/*.js`
  to measure serializer formats and round-trip error; **four** Playwright `evaluate` probes against
  the live dev server on `:9000` at 390×844; the `/#/gradient` rows of `audit/visual/REPORT.json` and
  the `safari-mobile-light` screenshot.
- **Verdict**: **DEFECTIVE** — concurring with r1, r2 and r3 on independently derived evidence.

A method note that mattered: my first consumer census used line-grep and reported the
`useGradientModel` facade as *entirely* dead. It is not — `GradientVisualizer.vue:17` imports two
symbols through it in a **multi-line** import statement that `grep -E 'import|from "'` cannot see.
Re-run with a statement parser. Recorded in §4.1 because r2's R2-6 census is the one that was right.

---

## 1 · The import closure, edge by edge

`GradientVisualizer.vue:2–28`, every edge traced to its home. Cross-references name the owning
report; only rows marked **L4-** are new.

| # | Line | Specifier | Resolves to | Verdict |
|---|---|---|---|---|
| 1 | 2 | `vue` | host `vue@3.5` | OK |
| 2 | 3–9 | `../../../ui/select` | `demo/ui/select/index.ts` — a 1-line re-export of `@mkbabb/glass-ui` | r1 **L-6** (+ **L4-3**) |
| 3 | 10 | `../../../ui/slider` | same | r1 **L-6** |
| 4 | 11 | `@lucide/vue` | icons, declared devDep | OK |
| 5 | 12 | `writeClipboard` from `@mkbabb/glass-ui` | root barrel; sibling uses `useClipboard` | r1 **L-9** / **R2-11** |
| 6 | 13 | `DockControl` from `@mkbabb/glass-ui/dock` | dock **chrome** primitive in a pane **body** | r1 **L-10** / **R2-9** (+ **L4-2**) |
| 7 | 14–16 | 3 sibling `.vue` | same dir | OK |
| 8 | 17–22 | `../composables/useGradientModel` | 2 of 10 names via a 3-hop shim; 4 modules take types from here | r1 **L-7** / **R2-6** (+ **L4-4**) |
| 9 | 23 | `interpolateStopColors` from `../composables/useGradientInterpolation` | own tree | **L3-1** |
| 10 | 24 | `easingFnOf` from `../composables/useGradientCSS` | own tree; the fn is a one-line identity in practice | r1 **L-4** / **L3-2** |
| 11 | 25 | `@mkbabb/value.js/color` (type) | **published subpath** → `dist/subpaths/color.d.ts` | **OK — correct** |
| 12 | 26 | `PickerSpace` from `../../../color-session/picker-color` | identity alias of `SpaceId`, imported properly on the line above | **L3-3** |
| 13 | 27 | `LIBRARY_PORT_KEY` from `../../../palettes/usePalettePorts` | cross-feature **value** import into a provider | r1 **L-2** (+ **L4-1** trace) |
| 14 | 28 | `AcceptableValue` from `reka-ui` | reach past the design system into its peer | **R2-5** |

Row 11 is the one edge this component gets right, and it is worth stating positively: see §6.

---

## 2 · Replication ledger

Round 4 was blind, so a landing on the same defect from a different starting point is independent
replication and should raise confidence.

| Prior finding | R4 evidence, independently derived |
|---|---|
| r1 **L-2** — one `Symbol` drags 72 modules across a feature boundary | Two closure runs of my resolver: **107 modules → 35** with the single `usePalettePorts` edge severed. **Delta = 72**, matching r1 exactly from a different tool. R4 adds the printed chain — `demo/shell/viewSchema.ts ← demo/shell/useViewManager.ts ← demo/palettes/usePalettePorts.ts ← GradientVisualizer.vue` — and the enumerated payload: `platform/auth/{sessionToken,sessions,useSession,useAdminAuth,useUserAuth}`, `platform/transport/{client,useApiClient,api-problem,availability}`. A gradient ramp editor transitively imports session tokens and the HTTP client. |
| r1 **L-2 cure** — `demo/palettes/keys.ts` | Reached the identical cure blind, from the identical precedent (`demo/color-session/keys.ts` is a leaf: `vue` types + 2 local type modules, zero fan-out; `GradientPane.vue:6` consumes `CSS_COLOR_KEY` from it). r1 got there first. |
| r1 **L-6** — `demo/ui/*` alias barrels | Classified all of `demo/ui/`: **19** directories, **19** pure re-exports, zero local components (18 from the root barrel, `input` from `/forms`). `alert/index.ts` carries its own epitaph: *"This barrel previously held a local shadcn-vue re-imple…"*. 11 files import `ui/select`/`ui/slider`; **0** import `@mkbabb/glass-ui/select` or `/slider`. |
| r1 **L-7** — 3-hop re-export chain | `color-space-meta.ts:26` → `useGradientInterpolation.ts:17` → `useGradientModel.ts:21` → `GradientVisualizer.vue:17`, while `MixConfigBar.vue:18` takes the same constant in **one** hop. `useGradientInterpolation.ts:13–16` states the motive in prose: *"Re-exported here so the gradient tree's own consumers … keep their import path."* |
| r1 **L-10** / **R2-9** — `DockControl` outside a dock | Chromium probe: `--dock-control-size` and `--dock-control-safe-inset` both resolve **`(EMPTY/undefined)`**, box **28×28**; a real dock control on the same page resolves `max(calc(2.5rem*1),0px)` → **40×40**. DOM path proves the seat: `main.pane-main > … > div.glass-resting > … > button.dock-icon-button`. Nameless-button probe returns exactly one, uniquely this control: `{"cls":"dock-icon-button … --compact","title":"Copy CSS","ariaLabel":null,"rect":{"w":28,"h":28}}` — matching `REPORT.md`'s `namelessButtons: 1` on `/#/gradient` in all four Safari matrices. |
| r1 **L-11** — the shell↔feature contract is `Ref<any>` + `?.m?.()` | `usePaneRouter.ts:109` `gradient: Ref<any>;` and `:208–210` `paneRefs.gradient.value?.reset?.()` etc., against a two-hop `defineExpose` chain that already renames across hops (`GradientVisualizer.vue:131` exposes `resetGradient`; `GradientPane.vue:12` re-exposes it as `reset`). R4 adds that the repo already owns the right shape — `ActionBarContext` at `demo/color-session/keys.ts:17–27` declares `reset(): void; copy(): void; random(): void`. The workbench panes bypass it for `any`. |
| r1 **L-4** / **L3-2** — the CSS→easing bridge is unreachable | Verified from the type side, blind: `EasingPickerValue.fn` is `readonly fn: EasingFn` — **required** (`glass-ui/dist/components/easing/composables/useEasingPicker.d.ts`, quoted in §4.2), so `easingFnOf`'s `Partial<Pick<…,"fn">>` fabricates an optionality the model cannot produce and `if (interval.fn) return interval.fn` is always taken. **This retracts my own blind L-8 — see §4.2.** |
| r1 **L-5** / **R2-7** — a second sampling law | `GradientVisualizer.vue:64–88` `colorAtPosition` re-walks the intervals, re-eases, re-mixes — against `useGradientCSS.ts:1–8`'s claim to own *"the ONE sampling law"* and its own `:185–213`. R4 adds two measured policy divergences: on an empty stop list `colorAtPosition:66` **throws** while `serializeRailRamp:268–270` returns a transparent gradient; at a stop `colorAtPosition:67,69` returns the **authored literal** while `sampleCoalescedStops` returns the space-converted `colorToCss` form. And it is handed down as a **function prop** (`:139` → `GradientStopEditor.vue:16`), so a child that needs domain math receives a closure. |
| **R2-6** — 7 of the barrel's re-exports have zero consumers | Per-symbol census with a statement parser: `serializeGradient`, `serializeCoalescedGradient`, `serializeRailRamp`, `linearInterval`, `parseGradientCSS`, `GradientParseResult`, `ParsedGradientModel` — **zero** consumers through `useGradientModel`; every real importer names the owning module. `serializeRailRamp` and `ParsedGradientModel` have **no importers at all**, by any path. |
| **R2-5** — reka-ui reached because glass-ui hides the type | `GradientVisualizer.vue:28`, `MixConfigBar.vue:15`, `GenerateControls.vue:33`, `AuroraPane.vue:25` — 4 files, and `reka-ui` is a **devDependency**. r2 found the deeper mechanism (`SelectionValue` declared but unexported); credited, not re-derived. |
| **R2-8** — phantom `defineModel("selectedStopId")` | `grep -rn 'selectedStopId\|selected-stop-id' demo/` returns **only** `GradientVisualizer.vue:51, 140, 144` — all inside the declaring file. R4 extends it: **L4-5**. |
| **R2-10** — dead cross-boundary DI at the mount point | `grep -n cssColorOpaque demo/workbenches/gradient/GradientPane.vue` → **only line 8**. |
| **L3-3** — `PickerSpace` is an identity alias | My blind draft graded row 12 "acceptable (shared vocabulary)". r3 is right and I was wrong: `picker-color.ts:37` is `export type PickerSpace = SpaceId` with no narrowing, obtained by a cross-feature edge one line below a correct import of its sibling from the published surface. Conceded in §4.3. |

**New in round 4** — six findings, in §3. Nothing else below is claimed as novel.

---

## 3 · New findings

### L4-1 · MAJOR — the library **already publishes** a bezier→CSS serializer; it is unused, lossy, in a fourth format, and a test pins the wrong law

This is a **material correction to r1 L-3**, not a new instance of it. r1 wrote:

> *"The canonical serializer is private inside `@mkbabb/glass-ui@7.0.0` (`dist/easing.js:33-35`,
> unexported)."* … *"**Cure**: value.js `/css` **gains** `serializeTimingFunction(…)`"*

Both prior passes searched `/css` and concluded the library has no serializer. It has one, and it is
**published**:

```
src/foundation/math.ts:113   export function cubicBezierToString(x1, y1, x2, y2)
src/subpaths/math.ts:16      cubicBezierToString          ← exported at @mkbabb/value.js/math
package.json#exports         "./math": { "types": "./dist/subpaths/math.d.ts", … }
```

Executed against the built `dist/`:

```
$ node --input-type=module -e "import {cubicBezierToString} from './dist/subpaths/math.js'; …"
library  @mkbabb/value.js/math -> "cubic-bezier(0.00, 0.00, 1.00, 1.00)"
demo/glass-ui mint            -> "cubic-bezier(0, 0, 1, 1)"
byte-identical? false
both parse ok? true true
ease-in-out via library:                   "cubic-bezier(0.42, 0.00, 0.58, 1.00)"
ease-in-out via glass-ui law (toFixed(3)): cubic-bezier(0.42, 0, 0.58, 1)
```

So the concept has **four** homes in **three** formats, one of which is on the public API:

1. `@mkbabb/value.js/math#cubicBezierToString` — **published**, `toFixed(2)`, **zero non-test callers**
   (`grep -rn cubicBezierToString demo/ src/ test/ e2e/` → only `test/math.test.ts` and the
   `v4-c1` export-surface list).
2. glass-ui `useEasingPicker.readout` — `toFixed(3)`, private (r1's find).
3. `demo/…/easing/easingCatalogue.ts:48–51, 56–58` — `bezierLiteral`/`stepsLiteral`, hand-mirroring #2
   *"byte-for-byte"* across a package boundary (r1's find).
4. `demo/…/composables/useGradientCSS.ts:56` — the hardcoded string `"cubic-bezier(0, 0, 1, 1)"`.

Two consequences neither prior pass could have drawn, because both believed #1 did not exist:

**(a) The published serializer is lossy and cannot round-trip an authored curve.** Measured:

```
authored              : 0.345678, 0.789012, 0.123456, 0.901234
published /math mint  : cubic-bezier(0.35, 0.79, 0.12, 0.90)
reparsed              : 0.35, 0.79, 0.12, 0.9
max abs round-trip err: 4.322e-3
glass-ui 3dp mint     : cubic-bezier(0.346, 0.789, 0.123, 0.901) -> err 4.560e-4
```

The published function loses **9.5×** more precision than the private one the demo copies. It
therefore cannot serve the byte-identity invariant `easingCatalogue.ts:44–45` and
`useGradientCSS.ts:44–50` depend on — which is *why* the demo re-mints, and the demo's own comments
never mention that a published alternative exists.

**(b) `test/math.test.ts` pins the wrong law as a named requirement**, so r1's additive cure
collides with a green test:

```ts
// test/math.test.ts:413-416
it("should format numbers to two decimal places", () => {
    const result = cubicBezierToString(0, 0, 1, 1);
    expect(result).toBe("cubic-bezier(0.00, 0.00, 1.00, 1.00)");
});
// :432  cubicBezierToString(0.123456, …) → "cubic-bezier(0.12, 0.79, 0.35, 0.90)"
```

Seven assertions lock `toFixed(2)`. The test does not assert a *CSS* property; it asserts a
formatting accident, and names it a rule.

- **Reproduction**: the two `node` invocations above, verbatim, against `dist/` built at
  `2026-07-27 11:52`; plus `sed -n '405,445p' test/math.test.ts`.
- **Mechanism**: a published function nobody consumes, whose format was fixed by its test rather
  than by the spec it serializes into. Because no consumer ever exercised it, the drift was
  invisible; because a test pins it, fixing it is a **semver decision**, not a patch.
- **Cure**: r1's `serializeTimingFunction(ast: CssTimingFunction): string` in `/css` remains right —
  it is the true inverse of the `parseTimingFunction` already shipped and the exact sibling of the
  `parseCssColor`/`serializeCssColor` pair. R4's addition is what must happen to #1 at the same
  time: **retire `cubicBezierToString` from `/math`** (it is a CSS concern misfiled under math, with
  zero consumers — retiring it costs nothing but the export line and its test block), and rewrite
  those seven assertions against the canonical serializer, minimal-digits, with a **round-trip
  property test** `parseTimingFunction(serializeTimingFunction(ast)) ≅ ast` in place of pinned
  strings. Then #2/#3/#4 collapse onto one published call and byte-identity becomes structural.
  Not doing this leaves two published serializers for one concept — a dual path on the public API
  itself (edict 2 at library scope).

### L4-2 · MINOR — the mechanism under r1 L-10: `DockControl` has no `title` prop, so the label is an attribute fallthrough; and the demo has three conventions for the same control

r1 and r2 established that `DockControl` is misplaced and nameless. The **mechanism** is one word
missing from a prop list. `glass-ui/dist/components/dock/DockControl.vue.d.ts` declares exactly:
`shape`, `compact`, `active`, `type`, `disabled`, `as`, `asChild`, `class`. **There is no `title`
prop.** So `GradientVisualizer.vue:254`'s `title="Copy CSS"` is not consumed by the component at all
— it falls through to the host `<button>` as the HTML attribute, which is why the audit's scanner and
mine both see a nameless control. The component's own `.d.ts` even promises the geometry that then
does not hold:

> "the HIT CELL stays the full `--dock-control-size` (≥44px on coarse via the density clamp)"

`compact` opts out of the fixed square, and both dock tokens resolve empty at this seat, so the
promise is void twice over.

Census — `DockControl` is used outside `demo/shell/dock/` in **five** files
(`extract/ExtractControls.vue`, `extract/ExtractWorkbench.vue`,
`extract/ImageEyedropper/ImageEyedropper.vue`, `gradient/…/GradientVisualizer.vue`,
`mix/MixResultDisplay.vue`) — and the demo has **three conventions for naming the same copy
control**:

| site | mechanism | result |
|---|---|---|
| `GradientVisualizer.vue:254` | `title="Copy CSS"` | **nameless** (probe + 4/4 matrices) |
| `MixResultDisplay.vue:123` | `:title="copied ? … : 'Copy color'"` | **nameless** (`/#/mix` `namelessButtons` = 1) |
| `GenerateControls.vue:179` | `aria-label="Copy all colors"` | correct |

- **Reproduction**: `cat node_modules/@mkbabb/glass-ui/dist/components/dock/DockControl.vue.d.ts`
  (no `title` in `__VLS_Props`); the nameless-button probe in §2; `REPORT.md` `namelessButtons` rows
  for `/#/gradient` and `/#/mix`.
- **Cure**: the pane-body affordance belongs to glass-ui `./button` as an icon variant (edict 4 —
  the variant lives in glass-ui; edict 3 — reuse the existing component-type name). glass-ui BH
  relay: `DockControl` should accept a `label` prop that becomes `aria-label`, and should not render
  an icon-only control without an accessible name — a prop list that silently accepts `title` as a
  passthrough is a trap three demo sites already fell into.

### L4-3 · MINOR — the alias layer defeats glass-ui's subpath surface: 66 modules declared where 11 suffice

r1 L-6 established the 19 barrels. R4 measures what routing through them *declares*. All 19 (bar
`input`) re-export from the glass-ui **root** barrel, never a subpath, although glass-ui 7.0.0
publishes 60+ per-component subpaths. Closure measurement inside
`node_modules/@mkbabb/glass-ui/dist`:

```
glass-ui.js    modules= 66  bytes=  224193
select.js      modules= 11  bytes=   18628
slider.js      modules= 12  bytes=   14952
dock.js        modules= 32  bytes=  101223
```

`demo/ui/select/index.ts` therefore declares a **66-module / 219 KiB** graph for a component whose
own subpath declares **11 modules / 18 KiB** — 12× the bytes, 6× the modules.

- **Honest bound (concurring with r3 §4.2's discipline)**: this is the **declared** graph.
  `sideEffects: false` is set on glass-ui, 37 other demo files already import the root barrel, and
  Rollup prunes; a *shipped-bytes* claim needs a build-stats run I did not perform and therefore do
  not assert. **HYPOTHESIS**, labelled. The measured module-graph figures and the structural defect
  stand regardless.
- **Cure**: as r1 — delete `demo/ui/`. R4's addition is the target: the call-sites must go to the
  **subpaths** (`@mkbabb/glass-ui/select`, `/slider`), not to the root barrel, or the deletion trades
  19 files for the same 66-module declaration.

### L4-4 · MAJOR — the dependency direction is inverted: four modules import the orchestrator to get leaf domain types; seven import cycles

Neither prior pass enumerated cycles (`grep -n cycle` over r1+r2+r3 → no matches). DFS over resolved
local edges in `demo/workbenches/gradient/**`:

```
gradientParse.ts    -> useGradientCSS.ts -> useGradientModel.ts -> gradientParse.ts
gradientParse.ts    -> useGradientModel.ts -> gradientParse.ts
useGradientCSS.ts   -> useGradientModel.ts -> gradientParse.ts -> useGradientCSS.ts
useGradientCSS.ts   -> useGradientModel.ts -> useGradientCSS.ts
useGradientModel.ts -> gradientParse.ts -> useGradientCSS.ts -> useGradientModel.ts
useGradientModel.ts -> gradientParse.ts -> useGradientModel.ts
useGradientModel.ts -> useGradientCSS.ts -> useGradientModel.ts
```

Every back-edge into `useGradientModel` is `import type`, so **nothing cycles at runtime** — that
negative is part of the finding. The defect is the **direction**:

- `useGradientCSS.ts:31–34` — `import type { GradientModelState, GradientInterval } from "./useGradientModel"`
- `gradientParse.ts:23–27` — `import type { GradientType, GradientStop, GradientInterval } from "./useGradientModel"`
- `GradientEasingEditor.vue:36–40` — the same three from the same place
- `easing/easingCatalogue.ts:36` — `import type { GradientInterval } from "../../composables/useGradientModel"`

The **types are the leaf of the domain** and the **composable is its root**, yet four modules point
*up* at the root to fetch the leaf. `useGradientModel.ts` is at once the type registry, the
re-export facade (r1 L-7 / R2-6), the reactive state owner and the action surface — four jobs.

- **Reproduction**: the four cited import statements; the DFS script in the scratchpad.
- **Mechanism**: types declared inside the composable that consumes them, so the only way to name a
  `GradientStop` is to import the orchestrator. The `import type` erasure hides the cycle from every
  runtime signal, which is why it survived three audits.
- **Cure**: `gradient/model/types.ts` — a leaf holding `GradientStop`, `GradientInterval`,
  `GradientType`, `GradientModelState`, importing only value.js/glass-ui types. All seven cycles
  become impossible by construction. This is the type-side twin of r1 L-2's key-side cure: **a
  vocabulary module is a leaf, or it is a coupling**.

### L4-5 · MINOR — two stop-ID minters, and a double-write of the selection on every click

Two mechanisms, one root cause: identity and selection each have two homes.

**(a) Two ID minters.** Identical format, independent counters:

```ts
// useGradientModel.ts:66-69                  // gradientParse.ts:30-33
let nextId = 0;                               let nextParseId = 0;
function uid() {                              function uid() {
  return `stop-${++nextId}-${Date.now().toString(36)}`;   return `stop-${++nextParseId}-${Date.now().toString(36)}`;
}                                             }
```

`applyCSS` (`useGradientModel.ts:158–168`) installs parse-minted IDs into the same `stops` ref that
`addStop` (`:116–120`) appends model-minted IDs to. Stop identity is the `v-for :key` at
`GradientStopEditor.vue:237` and the referent of `selectedStopId`.

**Duplicate ownership: CONFIRMED** (file:line above). **Collision: HYPOTHESIS — no reproduction.** A
clash needs equal counter values *and* the same millisecond across two independent counters; I could
not force it. The ownership defect is the finding; the collision is its latent consequence.

**(b) The selection is written twice per click.** `GradientStopEditor.vue:129–130`:

```ts
selectedId.value = id;      // → propagates via v-model:selected-id (GradientVisualizer.vue:140)
emit("select", id);         // → GradientVisualizer.vue:144 assigns the identical value again
```

The child carries **both** a `defineModel("selectedId")` (`:26`) and a `select` emit (`:23`) for one
concept, and the parent wires both. Every stop click assigns the same value to the same ref twice.
This compounds R2-8: the ref being double-written is the `defineModel` nobody binds.

- **Cure**: `gradient/model/identity.ts` — one `nextStopId()`, imported by both. Delete either the
  `select` emit or the model from `GradientStopEditor`, not both; and per R2-8 make the parent's
  `selectedStopId` a plain `ref`.

### L4-6 · MAJOR — measured on a phone: all three Selects render clipped stubs, and every interactive control is under the coarse-pointer minimum

No prior pass measured layout (`grep -n 'scrollWidth\|clipped\|truncat'` over r1+r2+r3 → no matches).
Probe at 390×844 on `/#/gradient`:

```json
{ "viewport": 390,
  "selects": [
    {"label":"Gradient type",       "triggerW":69,"triggerH":36,"text":"Linear", "spanClientW":27,"spanScrollW":41,"clipped":true},
    {"label":"Interpolation space", "triggerW":69,"triggerH":36,"text":"OKLCh",  "spanClientW":27,"spanScrollW":48,"clipped":true},
    {"label":"Hue interpolation",   "triggerW":69,"triggerH":36,"text":"Shorter","spanClientW":27,"spanScrollW":48,"clipped":true}],
  "tile":        {"w":80,"h":122},
  "copyBtn":     {"w":28,"h":28,"aria":null},
  "stopHandles": [{"aria":"Gradient stop at 0%","w":20,"h":20},
                  {"aria":"Gradient stop at 100%","w":20,"h":20}],
  "docScrollW":  390 }
```

The three values need 41/48/48 px and get **27** — clipped **34 %, 44 %, 44 %**. Confirmed visually
in the formation's own capture, `audit/visual/shots/safari-mobile-light/gradient.png`: the triggers
read **"Lin"**, **"Ok"**, **"Sh"**. Heights: selects **36** (the per-instance `class="h-9"` at `:165`,
`:182`, `:199` — edict 5 forbids per-instance overrides of root sizing), copy **28**, handles **20**.
All four control classes are below 44. `overflowX` stays 0, so nothing in the audit's existing metric
set catches it.

The cause is in this component's own template: `:158` `class="grid grid-cols-3 gap-3 min-w-0"` — three
columns at every viewport, inside `:157`'s `minmax(0,1fr)` track, sharing the row with an 80 px render
tile. `:159–161` records that the per-select *subtitle* rows were excised because *"they truncated at
every viewport"*; the excision removed a symptom and left the cause.

**And the library-structure half**: these four fields are hand-composed
`<span class="section-label">` + control pairs, ×3 in this file and again in `MixConfigBar.vue`,
`GenerateControls.vue`, `AuroraPane.vue`, `ColorSpaceSelector.vue`. glass-ui **already ships the
primitive** — `@mkbabb/glass-ui/labeled-field` exports `LabeledField`, `LabeledInput`,
`LabeledSelect`, `LabeledSlider` (`dist/components/labeled-field/types.d.ts`), and
`LabeledFieldProps` carries `label` + `description` and threads
`controlId`/`labelledBy`/`describedBy` to the slot — which also retires the three hand-written
`aria-label`s. No prior pass names it.

- **Cure**: `LabeledField`/`LabeledSlider` for the four fields; reflow `grid-cols-1 sm:grid-cols-3`
  (or `auto-fit` with a real minimum); drop `h-9`. glass-ui BH relay: `LabeledSelectProps.items` is
  `readonly string[]`, which **cannot carry per-item descriptions** — that gap is exactly why five
  demo files hand-roll `<template #description>`; it should be
  `readonly { value: string; label: string; description?: string }[]`.

### L4-7 · MINOR — three masking fallbacks on one dock button's path, and the same DI port treated as optional here and guaranteed everywhere else

`GradientVisualizer.vue:30` injects without assertion and `:111` guards:

```ts
const pm = inject(LIBRARY_PORT_KEY);        // :30
function seedFromPalette() {
    if (!pm) return;                         // :111  — silent
    const colors = pm.savedPalettes.value[0]?.colors.map((c) => c.css);
    if (colors && colors.length >= 2) {      // :113  — silent ×2
```

The same port is injected with `!` — *guaranteed* — by `MixPane.vue:16`, `GeneratePane.vue:11` and
`PalettesPane.vue:164`, and is `provide()`d unconditionally at `usePalettePorts.ts:243`. This
component is the sole outlier, and its guard turns the dock's "Seed from palette" button into a
**silent no-op in three distinct states**: no port, no saved palette, or a palette with fewer than 2
colors. Zero user feedback in all three. Combined with r1 L-11, the button's whole path is unchecked
and unreporting end to end.

Two more on the same axis, not previously cited: `GradientStopEditor.vue:6,16,72` —
`colorAt = undefined` / `colorAt?:` / `colorAt?.(…) ?? null`, where the **sole** call-site
(`GradientVisualizer.vue:139`) always passes it; and `GradientPane.vue:12` `?.resetGradient?.()`,
whose inner `?.` guards a name `defineExpose` guarantees.

- **Cure**: `inject(LIBRARY_PORT_KEY)!`, or better — per r3's lattice, `seedFromPalette` moves to
  `GradientPane`, the only file entitled to know a palettes port, which also discharges r1 L-2 at
  this component. Make `colorAt` required. Delete the inner `?.`.

---

## 4 · Corrections

### 4.1 · To my own blind draft — the facade is not *entirely* dead

My first census reported all 9 of `useGradientModel.ts:19–29`'s re-exports as unconsumed. That was a
tooling artefact: `GradientVisualizer.vue:17` imports `INTERPOLATION_SPACES` and
`HUE_INTERPOLATION_METHODS` through the facade in a **multi-line** import statement, invisible to a
line-oriented grep. Corrected count: **7 of 9 dead, 2 of 9 a three-hop dual path** — which is exactly
r2's R2-6 plus r1's L-7. Recorded because the naive-grep failure mode would understate the fix
(deleting the block requires redirecting `:17`, not just deleting lines).

### 4.2 · To my own blind draft — retracting a wrong cure for the CSS→easing bridge

My blind draft filed a MAJOR arguing that `useGradientCSS.ts:69–133` (`resolvedEasingCache`,
`easingValue`, `linearStops`, `timingFunctionValue`, `easingFnOf`) should **move into
`@mkbabb/value.js/easing`** as `easingFromCss`. The migration direction is right and is r1 L-3's; the
premise that the demo code is *live* is **wrong**, and r1 L-4 / r3 L3-2 had it first:

```ts
// glass-ui/dist/components/easing/composables/useEasingPicker.d.ts
export interface EasingPickerValue {
    readonly css: string;
    /** The live value.js easing callable the literal evaluates to. */
    readonly fn: EasingFn;        // ← REQUIRED
```

`GradientInterval = EasingPickerValue` (`useGradientModel.ts:49`), so `interval.fn` is always
present and `easingFnOf`'s `if (interval.fn) return interval.fn` is always taken. The 50-line parse
tail is **dead code**, not code to relocate. **Retracted.** The correct disposition is r1 L-4's:
delete the `Partial<>` and the tail; then, separately and on the library's own merits, publish
`easingFromCss` so the CSS→callable direction exists for consumers who genuinely lack an `fn` — with
`linearStops`' CSS `linear()` position-filling algorithm owned by `/css`, per r1 L-3.

### 4.3 · Conceding L3-3

My row 12 graded `PickerSpace` "acceptable (shared vocabulary)". r3 is right: `picker-color.ts:37` is
`export type PickerSpace = SpaceId`, an identity alias with no narrowing, fetched by a cross-feature
edge on the line *below* a correct import of its sibling `HueInterpolationMethod` from the published
surface. Grade corrected to a defect; cure is r3's.

---

## 5 · What round 4 missed

Stated so the ledger is not flattered by a fourth pass finding only what is easy.

1. **R2-1, the BLOCKER** — `ease-*-back` presets emit eased output outside `[0,1]` while `mixColors`
   rejects progress outside `[0,1]`, erasing the app. I did not find it. It remains the strongest
   defect on this axis. My probes exercised only the default `linear` interval; selecting a `back`
   preset was the one interaction I did not perform, and a fourth pass with four probes to spend
   should have spent one there.
2. **r1 L-1** — the demo-side eslint import boundaries are dead lint (globs match `demo/@/**`, a tree
   deleted by W43/RF-15; effective `no-restricted-imports` for the subject is `undefined`). I did not
   check the lint config at all. This is the *enabling* defect for L4-4 and r1 L-2 alike: every
   boundary finding in all four passes exists because nothing mechanically forbids the edge.
3. **L3-4** — `npm test` has no `pretest`, and `test/gradient-v4-consume.test.ts` runs `src/` and
   `dist/` library copies in one process. I verified `package.json#scripts` and saw the missing hook
   without drawing the inference.
4. **L3-1** — six `mixColors` unwrap sites, two contradictory failure policies.
5. **R2-4** — `tsconfig.demo.json#paths` drift (3 dead targets, 2 live subpaths missing).
6. **r1 L-12** — `railRampCSS` recomputes on `direction`; **L3-5** — one paint recipe in two scoped
   homes, three forbidden inline `background` assemblies, three raw `<hr>`.

---

## 6 · Negative results (re-checked at round 4)

Stated explicitly so absence reads as evidence.

1. **The value.js consume is honest.** `grep -rn '@src\|value.js/src' demo/workbenches/gradient/` →
   **no matches**. Every bare specifier in the feature:
   `@mkbabb/value.js/color` ×6, `/easing` ×4, `/css` ×3 — each a real key of `package.json#exports`,
   each backed by a `src/subpaths/*.ts` barrel; `HueInterpolationMethod` is genuinely exported by
   `src/subpaths/color.ts`. Resolution is by **generated** anchored-regex self-alias
   (`vite.config.ts:38–52`) derived from the exports map itself, so the demo's specifiers cannot
   drift from the published surface. **A real npm consumer could write every value.js import in this
   component verbatim.** Replicates r1 N-1 — with r3's L3-4 caveat that the *test* half does not hold.
2. **Package hygiene is sound.** `type: module`, `sideEffects: false`,
   `files: ["dist","!dist/gh-pages","!dist/gh-pages/**"]`, seven subpaths, no `.` root export and no
   `main`/`module`/`types` — a deliberate subpath-only surface, and `grep -rn 'from "@mkbabb/value.js"'
   demo/` → zero root-barrel imports anywhere. The absence of a root export is a *design*, not a gap.
3. **`verbatimModuleSyntax` honoured.** Every type-only import in the subject is `import type`
   (lines 22, 25, 26, 28). Edict 8 satisfied. Replicates r1 N-2.
4. **No runtime import cycle.** All seven cycles in L4-4 close through `import type` only; the erased
   edges mean no TDZ or partial-module hazard exists today. The finding is direction, not breakage.
5. **The brief's named historical suspects are not in this closure.**
   `grep -rn 'useLayerTransition\|ActionBarLayer\|useDark' demo/workbenches/gradient/` → **no
   matches**. `ActionBarLayer`'s local reimplementation, the `palettes/export.ts` +
   `usePaletteExport.ts` vs `export/serializers` triple, and the three parallel `useDark` stores
   (`useMarkdownHighlighting.ts:76`) are all real and all belong to other seats.
6. **No console errors, no page errors, no failed requests, `overflowX: 0`** on `/#/gradient` across
   all four Safari matrices (`REPORT.json`), and `docScrollW == 390` at phone width in my own probe.
7. **No god module.** Largest file in the closure is `GradientStopEditor.vue` at 392 L; the subject
   is 279 L; the composables are 301/334/193/56 L. Every defect on this axis is a **boundary or
   ownership** defect, not a size defect. Replicates r3 §5.5.

---

## 7 · The greenfield lattice

Concurring with r1's and r3's lattices; restated with r4's deltas marked.

```
@mkbabb/value.js                     — published library, seven subpaths
  /css     parseCssColor · serializeCssColor · parseTimingFunction
           + serializeTimingFunction(ast): string      ← r1 L-3, the true inverse
             (owns CSS linear() position-filling)
  /easing  CubicBezier · linear · steppedEase · linearEasing
           + easingFromCss(css): Result<EasingFunction, EasingIssue>   ← r1 L-3
           + the [0,1] range contract stated ONCE                      ← r2 R2-1
  /math    cubicBezierToString  ← RETIRED (0 consumers, lossy 2dp,
           a CSS concern misfiled under math; its 7 pinned-string
           tests become one round-trip property test)                  ← L4-1 NEW

@mkbabb/glass-ui                     — the design system, consumed BY SUBPATH
  /select        Select… + export type SelectionValue                  ← R2-5
  /button        Button — the Copy control's real home                 ← r1 L-10 / L4-2
  /labeled-field LabeledField · LabeledSelect · LabeledSlider
                 + items as {value,label,description?}[]               ← L4-6 NEW
  /dock          DockControl + a `label` prop; refuses nameless icons   ← L4-2 NEW
  (demo/ui/ DOES NOT EXIST — call-sites use subpaths, not the root barrel) ← r1 L-6 + L4-3

demo/palettes/keys.ts                — leaf: the 5 port keys + port types      ← r1 L-2
demo/color-session/
  color-utils.ts   parseColorIn · colorToCss · mixOrThrow · mixCssColors       ← L3-1
  color-space-meta.ts  INTERPOLATION_SPACES · HUE_INTERPOLATION_METHODS
                       — the ONE home; Gradient and Mix both one hop           ← r1 L-7

demo/workbenches/gradient/
  model/
    types.ts       GradientStop · GradientInterval · GradientType ·
                   GradientModelState — LEAF, kills all 7 cycles              ← L4-4 NEW
    identity.ts    nextStopId() — the ONE minter                              ← L4-5 NEW
    sample.ts      sampleRamp(state) · sampleAt(state, position)
                   — THE one sampling law, made true                          ← r1 L-5 / R2-7
    serialize.ts   simple · coalesced · rail  (take samples, never re-derive)
    parse.ts       parseGradientCSS  (already correct)
    NO re-export barrel anywhere                                              ← R2-6
  keys.ts          GRADIENT_SESSION_KEY — leaf; the shell's TYPED contract     ← r1 L-11
  useGradientSession.ts  state + derived CSS + actions
  GradientPane.vue       the only file that may know a palettes port;
                         provides the session; no defineExpose;
                         no dead inject                                        ← r1 L-2 / R2-10
  GradientVisualizer.vue PRESENTATION ONLY — no interval search, no eased
                         mixing, no function props, no unbound defineModel,
                         LabeledField for the four fields                      ← L4-6
```

Ordered by dependency, the moves that carry the value:

1. **R2-1 first** — the only user-visible outage.
2. **r1 L-1 second** — restore the import-boundary lint to globs that match the post-W43 tree.
   Without it, every boundary cure below is convention and will re-rot. This is the move that makes
   the others durable, and r4 missed it entirely (§5.2).
3. **Serializer reconciliation (L4-1)** — retire `/math`'s `cubicBezierToString`, publish
   `serializeTimingFunction`, replace pinned strings with a round-trip property. Four homes → one.
4. **Two leaf extractions** — `demo/palettes/keys.ts` (r1 L-2; 107→35) and
   `gradient/model/types.ts` (L4-4; 7 cycles → 0). Same shape, different axis: **a vocabulary module
   is a leaf, or it is a coupling.**
5. **Pure subtraction** — `demo/ui/` (19 files), the two re-export blocks (11 names), the
   `Partial<>` and its 50 dead lines, the double-write, the second minter. Zero behaviour change.

---

## 8 · Strongest defect

Round 4's strongest **new** contribution is **L4-1**: `@mkbabb/value.js/math` already publishes a
bezier→CSS serializer, it has zero non-test consumers, it is 9.5× lossier than the private glass-ui
mint the demo hand-copies, its format is `cubic-bezier(0.00, 0.00, 1.00, 1.00)` where every live
consumer needs `cubic-bezier(0, 0, 1, 1)`, and `test/math.test.ts:413` names that accident a rule.
Both prior passes searched for this capability, concluded the library lacked it, and proposed adding
it. The library has it — published, wrong, and tested wrong. That is the sharpest form of this
axis's question: not a missing public surface but a **published one that is a false proof**, which no
amount of consumer discipline can fix and which now costs a semver decision to correct.

Across all four passes the strongest defect on this axis remains **r2's R2-1** — the unowned
eased-ramp adapter that crashes on the library's own shipped presets and erases the application.
R4 concurs and did not find it (§5.1).

| ID | Severity | One line | Status |
|---|---|---|---|
| R2-1 | **BLOCKER** | eased-ramp adapter unowned; `ease-*-back` erases the app | r2 · r3 bounds · **r4 MISSED** |
| r1 L-1 | **BLOCKER** | every demo import boundary is dead lint | r1 · **r4 MISSED** |
| r1 L-2 | **BLOCKER** | one `Symbol` drags 72 modules across a feature boundary | r1 · r3 refines · r4 replicates (107→35) |
| **L4-1** | MAJOR | `/math` publishes a lossy, unused, wrongly-tested bezier serializer | **NEW** — corrects r1 L-3 |
| **L4-4** | MAJOR | 7 import cycles; 4 modules import the orchestrator for leaf types | **NEW** |
| **L4-6** | MAJOR | 3 Selects clipped 34–44 % at 390px; 4 control classes < 44px; `labeled-field` unused | **NEW** |
| L3-4 | MAJOR | `npm test` unpinned; consume test straddles `src/` and `dist/` | r3 · r4 missed |
| L3-2 | MAJOR | `Partial<>` fabricates the dead branch | r3 · r4 replicates, retracts own cure (§4.2) |
| L3-1 | MAJOR | six `mixColors` unwrap sites, two policies | r3 · r4 missed |
| r1 L-4 | MAJOR | the CSS→easing bridge is unreachable | r1 · r4 replicates from the type side |
| r1 L-5 / R2-7 | MAJOR | second sampling law in `<script setup>` | r1+r2 · r4 replicates + 2 policy splits |
| r1 L-6 | MAJOR | `demo/ui/*` = 19 alias barrels | r1 · r4 replicates |
| r1 L-7 / R2-6 | MAJOR | 3-hop chain; 7 re-exports with zero consumers | r1+r2 · r4 replicates |
| r1 L-10 / R2-9 | MAJOR | `DockControl` outside the dock; tokens empty, 28×28, nameless | r1+r2 · r4 replicates + mechanism (L4-2) |
| r1 L-11 | MAJOR | `Ref<any>` + `?.m?.()` shell chain | r1 · r4 replicates + names `ActionBarContext` |
| R2-4 | MAJOR | `tsconfig.demo.json#paths` drift | r2 · r4 missed |
| R2-5 | MAJOR | reka-ui typed because glass-ui hides `SelectionValue` | r2 · r4 replicates |
| **L4-3** | MINOR | the alias layer declares 66 modules where 11 suffice (bytes = hypothesis) | **NEW** |
| **L4-5** | MINOR | two stop-ID minters; selection written twice per click | **NEW** |
| **L4-7** | MINOR | 3 masking fallbacks on one dock button; port optional here, `!` in 3 siblings | **NEW** |
| **L4-2** | MINOR | `DockControl` has no `title` prop — the label is attribute fallthrough; 3 conventions | **NEW** mechanism under r1 L-10 |
| L3-3 | MINOR | `PickerSpace` renames a library type imported correctly one line above | r3 · r4 conceded (§4.3) |
| L3-5 | MINOR | one paint recipe two homes; 3 forbidden inline assemblies; 3 raw `<hr>` | r3 · r4 missed |
| R2-8 / R2-10 | MINOR | phantom `defineModel`; dead `inject(CSS_COLOR_KEY)` | r2 · r4 replicates + extends (L4-5b) |
| r1 L-12 | MINOR | `railRampCSS` recomputes on `direction` — 0.041 ms/tick | r1 · r3 measures |

---

*No source edits were made by this seat. The only write outside*
`docs/tranches/V/megatranche/audit/components/wb-gradient-visualizer/` *was none. Within it: this
file, plus a verbatim archive copy of the previous primary as*
`challenge-L-library.pass-3-r3-2026-07-28.md` *made before this file took the base name, so r1's
L-1…L-17, r2's R2-1…R2-11 and r3's L3-1…L3-5 all remain readable and citable. Probe and graph
scripts live in the session scratchpad.*
