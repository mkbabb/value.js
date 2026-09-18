# CHALLENGE-L — library structure · `demo/workbenches/mix/MixResultDisplay.vue`

## Model receipt

I observe myself to be **Opus 5**, exact model id `claude-opus-5[1m]` — the tier this seat was
explicitly spawned with. Declared, not inherited.

- Repo `/Users/mkbabb/Programming/value.js`, branch `tranche-u`, HEAD `c654824e`
- Subject `demo/workbenches/mix/MixResultDisplay.vue` (159 lines), area `demo/workbenches`
- Axis: **library structure** — module boundaries, ownership, direction of dependency, public surface

---

## Provenance — this is run **r6**

Five prior runs existed at this path. All preserved, none overwritten:

| file | run |
|---|---|
| `challenge-L-library.r5-prior.md` | r5 (the run that occupied this filename until now) |
| `challenge-L-library.r4-prior.md` | r4 |
| `challenge-L-library.r3-prior.md` | r3 |
| `challenge-L-library.r2-prior.md` | r2 |
| `challenge-L-library.prior-run.md`  | r1 |

**I traced every import and ran every probe in §5 before opening any prior run.** Where my result
matches a prior's, I record it as convergence at a sixth independent seat — not as discovery — and I
do not re-litigate a cure a prior states well.

**New at r6** — four things no prior run contains, three of them with fresh measurement:

| | |
|---|---|
| **N-1** | **[NEW · MAJOR]** `<DockSeparator />` (`:135`) renders **1 px × 0 px** here. `--dock-separator-height` is declared **only** on `.glass-dock`, and `.dock-separator { height: var(--dock-separator-height) }` carries **no fallback**. Measured live in the app's own cascade: 1×0 outside a dock, 1×27.5 inside one. It still stamps `role="separator"` — a phantom node in the a11y tree with no visual referent. Priors named `DockSeparator`; none measured it. The 44 px coarse touch floor (`--dock-control-floor`) is scoped `@media (pointer: coarse) { .glass-dock[data-size] }` — the mechanism behind r4's measured 28×28. |
| **N-2** | **[NEW · MAJOR, corrects r4 F-6b]** The hand-rolled gradient strip (`:109-116`) has an **existing home that the sibling file in the same folder already imports**: `PaletteColorStrip` (`demo/palettes/browser/card/PaletteColorStrip.vue`), taking `PaletteColor[]`, already `aria-hidden`/`role="presentation"`, already weight-aware, already on the `card` barrel and already imported at `MixSourceSelector.vue:8`. r4's cure (*"widen `PreviewRamp`, mount at all four sites"*) invents work; the KISS cure is one import of a component already in scope. `PaletteColorStrip` appears **0 times** across all five priors. |
| **N-3** | **[NEW · MAJOR]** The `useClipboard` contract is **half-consumed**. `invalidate()` — the primitive's own stale-payload escape — is never called and there is no watcher on `result`; `copy()`'s discriminated `CopyResult` is discarded at `:46`; `onCopyError` is not passed; and `status === "failure"` has **no reset timer** (proved from the compiled source), so a failed copy is a permanent state rendered identically to idle. `invalidate` appears **0 times** across all five priors. |
| **N-4** | **[NEW · cure precision]** glass-ui declares the home for this action row: `Button` with `iconOnly` — *"Square geometry for an accessibly named icon command"* (`dist/components/button/Button.vue.d.ts:15`), reachable at `@mkbabb/glass-ui/button`. `iconOnly` appears **0 times** across all five priors, which is why five runs diagnosed the dock-primitive misplacement without naming its replacement. |

---

## Verdict — **DEFECTIVE (BLOCKER)**

The seat's premise holds, and the strongest defect is not in this file's own logic but in the
**shape of the surface it consumes**.

`MixResultDisplay.vue` reaches for its dependencies through **three different kinds of contract that
its dependencies do not actually offer**:

1. **An attribute surface that does not exist.** `@mkbabb/glass-ui@7.0.0`'s `<WatercolorDot>`
   declares `inheritAttrs: false` and re-forwards only `$attrs.class` and `$attrs.style`. Every
   other attribute this file hands it is discarded — including `data-mix-target` (`:69`), the
   anchor this file's own docblock (`:14`) calls *"the anchor the canvas convergence lands on."*
   (Convergent with r1–r5 F-1; re-measured live at §5.2.)
2. **A token surface scoped to a container this file is not inside.** `DockControl` and
   `DockSeparator` are `.glass-dock`-scoped primitives mounted inside a `Card`. Their geometry
   tokens — `--dock-control-size`, `--dock-separator-height`, and the coarse-pointer
   `--dock-control-floor` (44 px) — are declared only under `.glass-dock`. Measured here: separator
   **1×0**, compact controls **28×28**. (N-1; the 28×28 half convergent with r4/r5.)
3. **A behavioural contract it consumes half of.** `useClipboard` returns a discriminated
   `CopyResult`, a `"failure"` status and an `invalidate()`; this file uses none of the three. (N-3.)

Underneath all three sits the same structural fact: **`demo/workbenches/**` is governed by nothing.**
`npx eslint --print-config` on this exact file returns `no-restricted-imports: undefined`, because
100 % of the demo import-boundary rules glob `demo/@/**` — a tree that was deleted at W43/RF-15 and
does not exist on disk (§5.1). The guards that would have caught a demo file reaching into a
dock-scoped primitive, or importing a root barrel while importing two subpaths in the same file,
are aimed at nothing. (Convergent with r2–r5 F-2; re-measured because it is the enabling condition
for every other finding here and it is still true at HEAD `c654824e`.)

---

## 1 · The import trace — every edge, and whether it should exist

`MixResultDisplay.vue:1-7`:

| line | specifier | home | verdict |
|---|---|---|---|
| `:2` | `@lucide/vue` | devDependency, icon values | **OK** |
| `:3` | `@mkbabb/glass-ui/dock` → `DockControl`, `DockSeparator` | glass-ui dock subpath | **WRONG SCOPE** — dock primitives outside a `.glass-dock` (N-1) |
| `:4` | `vue` → `computed`, `TransitionGroup` | — | `TransitionGroup` **unnecessary** (§3.4; convergent r4 F-9 / r5 F-9′) |
| `:5` | `@mkbabb/glass-ui` (**root barrel**) → `useClipboard` | declared home is `@mkbabb/glass-ui/dom` | **INCONSISTENT** — one file, three depths (convergent r4 F-8) |
| `:6` | `@mkbabb/glass-ui/watercolor-dot` | glass-ui subpath | **OK specifier, fictional attribute surface** (§5.2) |
| `:7` | `import type { MixResult } from "./composables/useMixingState"` | a composable | **`import type` correct** (edict 8 satisfied); **the type is homed in a composable** — see §4 |

**The published-surface question the brief asks — cleanly negative.** This component imports
`@mkbabb/value.js` **zero** times, directly or transitively through a deep path. Every value.js
import in the mix workbench goes through a bare published subpath:

```
$ grep -rn "@mkbabb/value.js" demo/workbenches/mix/
composables/useMixingState.ts:19    type HueInterpolationMethod  from "@mkbabb/value.js/color"
MixConfigBar.vue                                                 from "@mkbabb/value.js/color"
MixAnimationCanvas/MixAnimationCanvas.vue                        from "@mkbabb/value.js/color"
MixAnimationCanvas/composables/useMixingAnimation.ts             from "@mkbabb/value.js/color"
MixAnimationCanvas/composables/mixStage.ts                       from "@mkbabb/value.js/{color,math,easing}"
```

`@src/*` reaches: **0** in `demo/workbenches/`. All seven specifiers are anchored-regex self-aliased
from `package.json#exports` in `vite.config.ts:39-50` — generated, so the alias set cannot drift
from the export map. **A real consumer could write every one of these imports.** This is the one
axis on which the subject is unambiguously sound, and it is worth saying plainly: the T.W1
demo-dogfood keystone held.

---

## 2 · N-1 — dock-scoped primitives outside their dock (**MAJOR**, measured)

### The declaration sites

```
$ grep -o "…--dock-separator-height…" node_modules/@mkbabb/glass-ui/dist/components/dock/styles/shell.css
@layer components { .glass-dock { … --dock-separator-height: calc(var(--dock-h, var(--size-icon-btn)) * 0.5); … }
```

```
components/dock/styles/layer-group.css:1
  .dock-separator { @apply flex-shrink-0; width: 1px; height: var(--dock-separator-height); margin: 0 0.375rem; … }
                                                  ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ no fallback
```

```
components/dock/styles/overflow.css:1
  @media (pointer: coarse) { .glass-dock[data-size] { … --dock-control-floor: var(--dock-touch-target, 2.75rem); … } }
```

`--dock-control-size` is declared only on `.glass-dock[data-size="sm|md|lg|xl"]` and
`.glass-dock[data-preset="cockpit"]` (`components/dock/styles/density.css`).

### The measurement (live, the app's own cascade, `:9000`)

A transient probe mounting the exact class pair this file produces, outside any `.glass-dock`, then
the same separator inside the shell's real dock:

```json
{
  "hasGlassDockAncestor": false,
  "dockControlSize_outsideDock": "(unset)",
  "dockSeparatorHeight_outsideDock": "(unset)",
  "separator":     { "w": 1, "h": 0,  "cssHeight": "0px" },
  "compactButton": { "w": 28, "h": 28 },
  "insideDock": {
    "dockControlSize":     "max( calc( 2.5rem * 1 ), 0px )",
    "dockSeparatorHeight": "calc(calc(2.5rem + 0.75rem + 3px) * 0.5)",
    "separatorRect":       { "w": 1, "h": 27.5 }
  }
}
```

### What that means at `:120-143`

- `<DockSeparator />` (`:135`) is a **1 px × 0 px** box carrying `role="separator"` (confirmed in
  the compiled render: `j("div", { class: L(["dock-separator", …]), role: "separator", … })`,
  `dist/dock.js`). It contributes `0.375rem` of margin either side — so the *only* observable
  effect of the design-system separator here is 12 px of extra gap, plus a phantom separator node
  in the accessibility tree with nothing to separate visually.
- The three `<DockControl compact>` buttons are **28×28**. `.dock-icon-button--compact` falls back
  to `padding: 0.25rem` and `width/height: auto`, so the 1.25 rem glyph plus 0.5 rem padding is the
  whole box. The 44 px coarse floor that would have saved them is inside the media query above,
  behind `.glass-dock`. That is 17 px short of the 44 px the design system itself specifies for
  touch, on the component the mobile matrices reach last.
- `DockSeparator`'s JS half is defensive (`let t = p(), n = O(() => t?.orientation.value ?? "horizontal")`
  — it tolerates a missing dock context); its **CSS half is not**. That asymmetry is the defect
  mechanism in one line: a primitive that guards its injection but not its custom properties will
  fail silently and only visually.

### Cure (N-4)

glass-ui already declares the right primitive:

```
dist/components/button/Button.vue.d.ts
  export interface ButtonProps extends PrimitiveProps {
      emphasis?: "primary" | "secondary" | "quiet" | "text";
      /** Square geometry for an accessibly named icon command. */
      iconOnly?: boolean;
      …
  }
```

Replace the three `DockControl compact` with `<Button iconOnly emphasis="quiet">` from
`@mkbabb/glass-ui/button`, give each a real `aria-label` (the current `title` is the weakest
accessible-name source and invisible to touch), and **delete** `DockSeparator` — a 1×0 element is
not a design decision. This is edict 4 satisfied *properly*: the variant already exists in the
design system, under the reused component-type name, and nothing new is minted in `demo/ui/`.

---

## 3 · Ownership duplication — one concept, several homes

### 3.1 `MixResult` → clipboard text: two implementations, two contracts (N-3)

The identical expression, verbatim, in two files:

```
demo/workbenches/mix/MixResultDisplay.vue:43-46      demo/workbenches/mix/MixPane.vue:51-53
  const text = result.type === "color"                 const text = mixResult.value.type === "color"
      ? result.css ?? ""                                    ? mixResult.value.css ?? ""
      : result.colors?.map(c => c.css).join(", ") ?? "";    : mixResult.value.colors?.map(c => c.css).join(", ") ?? "";
  await copy(text);            // useClipboard         await writeClipboard(text);   // one-shot
```

Neither lives in `useMixingState.ts`, which owns the `MixResult` type. Neither lives in
`demo/palettes/export/serializers.ts`, the V.W51 byte-exact serializer set. The concept has **no
home and two call sites** — the textbook shape of the unique-semantic-ownership violation.

**The two homes have different observable contracts**, which is what makes this a defect rather than
a tidiness note. `demo/shell/usePaneRouter.ts:222` routes the dock's *Copy result* action to
`MixPane.copyResult` — the path with **no confirmation state at all**. The in-plate button routes to
the path with a 1500 ms checkmark. Same command, two answers, decided by which chrome the user
reached for.

**N-3 proper — the primitive's contract, half-consumed.** From glass-ui's compiled
`useClipboard-D36OTaeT.js`:

```js
n.ok ? (a.value = "success",
        l = setTimeout(() => { … a.value = "idle" … }, i.resetMs ?? 1500), n)   // success resets
     : (a.value = "failure", i.onCopyError?.(n.reason), n)                       // failure does NOT
…
return { status: o, copy: p, invalidate: d };
```

- `:31` passes no `onCopyError`. `:46` discards `copy()`'s `CopyResult`. `:32` maps only `"success"`.
  A failure — `navigator.clipboard` absent, e.g. the LAN-IP `http://` origin that
  `vite.config.ts`'s `server.host: true` exists to serve for mobile testing — leaves `status` at
  `"failure"` **permanently**, rendered pixel-identically to never having clicked. glass-ui warns to
  the console; the demo says nothing; the e2e `setupEnvNoise` collects `console.error`, not warns.
- `invalidate()` — documented *"Invalidate pending or settled feedback because its payload is no
  longer current"* — is never called, and there is no watcher on `result`. If the result changes
  inside the 1500 ms window, the checkmark asserts that the **current** result is on the clipboard
  while the **previous** one is.
- *Reproduction status:* the failure-silence path is reachable **today** through `MixPane.copyResult`
  (dock action, `usePaneRouter.ts:222`) — that one is not gated. The stale-confirmation path is
  proved mechanically from the source above but its live reproduction is **BLOCKED-BY-F-1**: this
  component has never rendered (§5.2). Labelled a hypothesis on that half, per evidence law.

### 3.2 The palette strip already has a home in the same folder's imports (N-2)

`:109-116` builds a decorative strip inline:

```html
<div class="h-4 rounded-full overflow-hidden"
     :style="{ background: `linear-gradient(to right, ${result.colors.map(c => c.css).join(', ')})` }"
     aria-hidden="true" role="presentation" />
```

`demo/palettes/browser/card/PaletteColorStrip.vue` is that component:

```
<div aria-hidden="true" role="presentation" :class="[…orientation…]">      ← same a11y semantics
  <div v-for="(color, i) in colors" :style="{ backgroundColor: color.css, … }">
props: { colors: PaletteColor[]; orientation?: "horizontal" | "vertical"; weights?: number[] }
```

It is on the barrel (`demo/palettes/browser/card/index.ts:9`, a named re-export) and the **sibling
file in the same directory already imports it**:

```
demo/workbenches/mix/MixSourceSelector.vue:8
  import { PaletteCard, PaletteColorStrip } from "../../palettes/browser/card";
```

So the mix workbench simultaneously imports the shared strip and hand-rolls a second one, seven
lines apart in the module graph. r4's F-6b prescribed widening a *different* component
(`PreviewRamp`) and mounting it at four sites; that is contrivance where a one-line import of an
in-scope component does the job (edict 3). The two are not pixel-identical — hard segments vs. a
gradient — and that is the point: **the divergence is the duplication's only content.** If a
gradient register is genuinely wanted, it belongs as an `orientation`-sibling prop on
`PaletteColorStrip`: one home, both registers.

The `≤1`-colour invalid-CSS case r4 records (`linear-gradient` requires two stops) disappears for
free: the strip renders N segments for any N.

### 3.3 The section eyebrow — third recipe for one concept

`:58` `class="font-display text-caption font-bold text-muted-foreground uppercase tracking-wide"` —
five utilities re-minting a design-system recipe that exists:

```
node_modules/@mkbabb/glass-ui/dist/styles/typography/utilities.css
  .section-label { @apply text-mono-caption; color: var(--muted-foreground); }
```

…and that the sibling uses (`MixSourceSelector.vue:183 class="section-label"`), against a third
variant one row up (`MixSourceSelector.vue:119 class="text-small font-display font-semibold text-muted-foreground"`).
Three recipes, one role, one folder — a per-instance override of a root-level style (edict 5).
Convergent with r5 F-16, which additionally measured the Fraunces-italic-700 violation of
`demo/DESIGN.md`'s three-voice law; I do not re-litigate it.

### 3.4 `TransitionGroup` — the in-file asymmetry

`:4` imports `TransitionGroup`; `:60` uses `<Transition>` **without** importing it. The compiler
resolves both as built-ins regardless of the setup binding — proved by compiling this exact file:

```
$ node -e "…compileTemplate(MixResultDisplay.vue, bindingMetadata:{TransitionGroup:'setup-const'})…"
import { …, TransitionGroup as _TransitionGroup, …, Transition as _Transition } from "vue"
      _createVNode(_Transition,      { … })
                      _createVNode(_TransitionGroup, { … })
```

Both come from the compiler's own auto-import; the setup binding is not consulted. So the import is
**unnecessary and unreferenced by the emitted render**, yet no unused-import lint can fire, because
the template does name the identifier. r5's F-9′ bound is correct and I confirm it independently:
the cure is verified by the in-file asymmetry with `<Transition>`, not by a lint run.

---

## 4 · Modularization — the lattice I would build greenfield

Stated concretely, as the brief asks, with no hedge.

```
demo/workbenches/mix/
├── mix-result.ts                 ← NEW. The concept's one home.
│     export type MixResult =
│         | { readonly kind: "color";   readonly color: PaletteColor }
│         | { readonly kind: "palette"; readonly colors: readonly PaletteColor[] };
│     export function mixResultText(r: MixResult): string
│     export const MIX_TARGET = Symbol("mix-target") as InjectionKey<Ref<HTMLElement | null>>
│
├── composables/useMixingState.ts ← state machine ONLY; imports the type, does not define it
├── MixPane.vue                   ← owns the target ref, provides MIX_TARGET, owns NO clipboard code
├── MixResultDisplay.vue          ← presentation only; ~95 lines
├── MixSourceSelector.vue
├── MixConfigBar.vue
└── MixAnimationCanvas/           ← consumes MIX_TARGET; mixStage.ts loses its querySelector + fallback
```

Four moves, each deleting more than it adds:

1. **`MixResult` becomes a true discriminated union in `mix-result.ts`.** It is a data type consumed
   by four modules across two directory levels; homing it in a composable makes every consumer
   import a *behaviour* module to obtain a *shape*. As a real union, `:36-40`'s
   `?? "var(--muted-foreground)"`, `:44-45`'s two `?? ""`, `:78`'s `&& result.css` and `:91`'s
   `&& result.colors` all delete themselves — five masking fallbacks in a 159-line file, gone by
   typing. (Convergent with r4 F-5's ten-across-three-files count.)
2. **`mixResultText()` moves next to the type it serializes.** `MixPane.copyResult` and
   `MixResultDisplay.onCopy` collapse into one call site — and the command gets **one** contract.
   Concretely: keep the `useClipboard` seat in the plate (it owns the confirmation), delete
   `MixPane.copyResult` + its `writeClipboard` import, and point `usePaneRouter.ts:222` at the
   plate's exposed `copy`. Pass `onCopyError`, honour `CopyResult`, call `invalidate()` on
   `result` change (N-3).
3. **`[data-mix-target]` becomes a typed `InjectionKey<Ref<HTMLElement|null>>` provided by
   `MixPane`.** The current contract is an untyped DOM string shared by two modules with no constant
   between them, consumed through `mixStage.ts:121`'s `querySelector` and papered over by
   `:122-124`'s synthetic `{x: clientWidth/2, y: scrollHeight*0.7, r: 28}` fallback — a masking
   fallback (edict 2) whose only job is to hide the fact that the anchor is never there. With a ref,
   the anchor is a compile-time edge, the fallback is deleted, and the `inheritAttrs` trap is
   structurally unreachable because a ref does not travel through `$attrs`. (Convergent with r3–r5.)
4. **The action row becomes `<Button iconOnly>` from `@mkbabb/glass-ui/button`** with real
   `aria-label`s, and `DockSeparator` is deleted (N-1/N-4). The strip becomes
   `<PaletteColorStrip :colors="result.colors" />` (N-2). The eyebrow becomes `.section-label` (3.3).
   `TransitionGroup` leaves `:4` (3.4). `useClipboard` moves to `@mkbabb/glass-ui/dom` (`:5`).

And the enabling repair, outside the folder but the reason the folder drifted: **re-aim the demo
import-boundary eslint objects at the live tree** (`demo/workbenches/**`, `demo/palettes/**`,
`demo/shell/**`, `demo/picker/**`, `demo/scenes/**`, `demo/color-session/**`) and add a CI assertion
that every glob matches ≥ 1 file. A structural guard that silently matches nothing is worse than no
guard: it reads green in review.

---

## 5 · Evidence — commands run, output pasted

### 5.1 The demo boundary guards glob a deleted tree

```
$ ls -d demo/@
ls: demo/@: No such file or directory

$ npx eslint --print-config demo/workbenches/mix/MixResultDisplay.vue | jq '.rules["no-restricted-imports"]'
no-restricted-imports: undefined
```

`eslint.config.js:232-238` and `:277-279` glob `demo/@/components/**`, `demo/@/lib/**`,
`demo/@/composables/**`. The subject file — and all 36 files under `demo/workbenches/` — carry **no
import restriction of any kind**. (`inv-K-1`, which forbids `src/` → glass-ui, is live and correct;
it is the *demo* half that is dead.)

### 5.2 The `WatercolorDot` attribute surface — re-measured at r6

Producer, `node_modules/@mkbabb/glass-ui/dist/watercolor-dot.js` (7.0.0):

```js
E = e(c({
  inheritAttrs: !1,
  __name: "WatercolorDot",
  props: { color:{}, variant:{default:"solid"}, animate:{…}, cycleDuration:{…}, range:{…}, seed:{…} },
  setup(e) { … let n = h(),               // useAttrs()
                 c = i(() => n.class),    // ONLY class
                 f = i(() => n.style);    // ONLY style
    return (t,n) => (d(), o("span", { "aria-hidden":"true", class: l([c.value, "watercolor-swatch", …]),
                                      "data-testid":"watercolor-swatch", "data-variant": e.variant,
                                      style: u([f.value, { … pointerEvents:"none" … }]) }, […]));
```

No `tag` prop. No `as`. **No `renderSlot` anywhere in the module** (`grep renderSlot → -1`). Live
DOM, `/#/mix`, the "From palettes" collapsible open — every dot on the page:

```json
{ "total": 6, "paletteSwatchCount": 2,
  "sample": "<span data-v-292b9032 data-v-a3e86846 aria-hidden=\"true\" class=\"w-8 h-8 shrink-0 cursor-pointer watercolor-swatch\" data-testid=\"watercolor-swatch\" data-variant=\"solid\" style=\"background-color: rgb(255,0,0); …\">",
  "anyTitleAttr": 0, "anyAriaLabel": 0, "anyTagAttr": 0,
  "allAreSpans": true, "allAriaHidden": true, "computedPointerEvents": "none" }
```

Those two swatches are `MixSourceSelector.vue:211-220`, which passes `tag="button"`, `:title`,
`:aria-label` and `@click`. **All four are gone.** The same four attribute kinds this file passes at
`:66-72`, `:81`, `:100-104`. Class is the only survivor — which is why `add-slot-ghost` and `w-8 h-8`
made it through and `data-mix-target` did not.

Consequences measured on the same page:

```json
{ "mixSourceCount": 0, "mixTargetCount": 0, "addSlotByAriaLabel": 0, "addSlotGhostClass": 1 }
```

and in the shipped screenshot `visual/shots/safari-desktop-light/mix.png`: the "Selected" well shows
the dashed ghost with **no Plus glyph** (the slot child is dropped — the component has no slots) and
the **Mix** button `[disabled]`. `canMix` can never become true, so `mixResult` is never non-null,
so `<MixResultDisplay>` (`MixPane.vue:112`, `v-if="mixResult"`) **never mounts**. The component under
audit has never rendered in the shipped app. Convergent with r1–r5 F-1; re-derived, not inherited.

### 5.3 The dock-token measurement (N-1)

Full probe output in §2. Selector scopes, verbatim from the shipped CSS:

| token | declaring selector | file |
|---|---|---|
| `--dock-separator-height` | `.glass-dock` | `dock/styles/shell.css` |
| `--dock-control-size` | `.glass-dock[data-size=…]`, `.glass-dock[data-preset="cockpit"]` | `dock/styles/density.css` |
| `--dock-control-floor` (44 px) | `@media (pointer: coarse) { .glass-dock[data-size] }` | `dock/styles/overflow.css` |

`.dock-separator`'s `height: var(--dock-separator-height)` has no fallback → invalid at
computed-value time outside a dock → `height: auto` → **0 px** in an `align-items: center` row.

### 5.4 The root-barrel closure (`:5`)

```
$ node -e "…transitive ESM closure over node_modules/@mkbabb/glass-ui/dist…"
glass-ui.js        66 modules  224184 bytes   ← the root barrel  (:5's specifier)
dom.js              8 modules   12599 bytes   ← useClipboard's declared home
dock.js            32 modules  101223 bytes
watercolor-dot.js   6 modules    9503 bytes
```

17.8× the module graph for one symbol. Both packages declare `sideEffects: ["*.css"]`, so Rollup
prunes the unused half in a production build — this is a **graph** figure, not a shipped-bytes
figure, and I publish it as such (matching r4's honest framing). It stands as a *consistency*
defect: one file, three specifier depths, and the demo already wrote the doctrine against exactly
this in `demo/shared/utils.ts:8-18` (*"the full-barrel import that drags the scroll-timeline grammar
chunk (~36 KiB gz) into the eager graph for a 40-line timer utility"*). 37 demo files import the
glass-ui root barrel against 82 on subpaths.

### 5.5 Command index

| command | result |
|---|---|
| `npx eslint --print-config demo/workbenches/mix/MixResultDisplay.vue` | `no-restricted-imports: undefined` |
| `ls -d demo/@` | No such file or directory |
| `grep -rn "@mkbabb/value.js" demo/workbenches/mix/` | 7 hits, all bare published subpaths; `@src` = 0 |
| `grep -rn '\.css)\.join(", ")' demo` | 3 — `MixResultDisplay:45`, `MixResultDisplay:112`, `MixPane:53` (+ `PaletteCard:294`) |
| `node -e "…compileTemplate…"` | `Transition` **and** `TransitionGroup` auto-imported from `vue`; setup binding unused |
| `node -e "…closure over dist…"` | barrel 66 / 224 184 B vs `dom` 8 / 12 599 B |
| playwright evaluate, `/#/mix`, live `:9000` | `anyTitleAttr 0`, `anyAriaLabel 0`, `anyTagAttr 0`, `mixTargetCount 0`, `addSlotByAriaLabel 0` |
| playwright evaluate, transient dock-primitive probe | separator 1×0 (`cssHeight "0px"`) outside; 1×27.5 inside; compact control 28×28 |
| `grep -rn "\[data-mix-target\]" e2e/` | `smoke/views/mix.spec.ts:52`, `smoke/safari/mix-flow.spec.ts:40` — both assert `toBeVisible()` against an attribute that cannot reach the DOM |
| `Read visual/shots/safari-desktop-light/mix.png` | ghost well with no Plus glyph; **Mix** disabled; no result plate in any of the 60 captures |

---

## 6 · Findings

Convergent findings keep the prior runs' identifiers so the ledger does not fork. New at r6: N-1…N-4.

| id | sev | defect | cure | owner |
|---|---|---|---|---|
| **F-1** | **BLOCKER** | `WatercolorDot`'s attribute surface is fiction: `inheritAttrs:false` + class/style only. `data-mix-target` (`:69`), `tag=` (`:66,:81,:100`), `:title` (`:103`) all dropped; the same mechanism kills the add slot one file over, so this component has never rendered. `vue-tsc` is green — the `.d.ts` certifies props, not attributes. | glass-ui: `as`/`asChild` + drop `inheritAttrs:false` (BH relay, per the standing glass-ui relay edict). demo: delete every `tag=`, move semantics onto a real wrapper the demo owns, replace `[data-mix-target]` with a typed `InjectionKey<Ref<HTMLElement\|null>>` from `MixPane`, delete `mixStage.ts:122-124`'s synthetic-target fallback. | glass-ui + demo |
| **N-1** | **MAJOR** | `DockControl`/`DockSeparator` mounted outside `.glass-dock`: separator **1×0** with a phantom `role="separator"`; compact controls **28×28**, 17 px under the design system's own 44 px coarse floor, because `--dock-separator-height` / `--dock-control-size` / `--dock-control-floor` are all `.glass-dock`-scoped and `.dock-separator`'s height has no fallback. | `<Button iconOnly emphasis="quiet">` from `@mkbabb/glass-ui/button` (**N-4** — glass-ui's declared home for *"an accessibly named icon command"*) + real `aria-label`s; delete `DockSeparator`. Producer rider: give `.dock-separator` a fallback or `@container`-guard the dock primitives. | demo (+ glass-ui rider) |
| **N-3** | **MAJOR** | `useClipboard` half-consumed: `CopyResult` discarded (`:46`), no `onCopyError`, `"failure"` never resets, `invalidate()` never called and no watcher on `result`. A failed copy is permanently indistinguishable from no click; a stale checkmark can outlive its payload. The dock's *Copy result* (`usePaneRouter.ts:222`) hits the **other** implementation, which has no feedback at all. | One `mixResultText()` + one clipboard seat; honour `CopyResult`, pass `onCopyError`, `invalidate()` on result change; point `usePaneRouter` at it. | `mix/` |
| **F-5** | MAJOR | `MixResult` is an optional bag, not a discriminated union → five masking `??`/`&&` guards in this file alone (`:37,:39,:44,:45,:78,:91`). | true union in `mix/mix-result.ts`; every guard deletes itself. | `mix/mix-result.ts` |
| **F-2** | MAJOR | 100 % of demo import-boundary eslint rules glob the deleted `demo/@` tree; this file resolves to `no-restricted-imports: undefined`. The enabling condition for every other finding. | re-aim globs at the live tree; CI-assert every glob matches ≥ 1 file. | `eslint.config.js` |
| **N-2** | MAJOR | 4th hand-rolled `palette → strip`, while `PaletteColorStrip` — same a11y semantics, weight-aware, on the barrel — **is already imported by the sibling in this folder** (`MixSourceSelector.vue:8`). ≤1-colour case emits invalid CSS. *(Supersedes r4 F-6b's `PreviewRamp` cure as contrivance.)* | `<PaletteColorStrip :colors="result.colors" />`; if the gradient register is wanted, add it as a prop there — one home, both registers. | `mix/` + `palettes/browser/card/` |
| **F-16** | MAJOR | eyebrow (`:58`) is a five-utility per-instance override of glass-ui's `.section-label`, against two other recipes in the sibling file. *(r5; re-confirmed, not re-litigated.)* | `class="section-label"`. | `mix/` |
| **F-3** | MAJOR (typecheck-only) | `tsconfig.demo.json#paths` shadows `package.json#exports` and invents a bare-root entry the package refuses. *(r4/r5.)* | delete the `@mkbabb/value.js*` `paths` block. | `tsconfig.demo.json` |
| **F-17** | MAJOR | `demo/palettes/export/` (the byte-exact V.W51 set) has exactly one importer and it is a test; the app runs the legacy `demo/palettes/export.ts`. *(r5; the two-home export path is live.)* | route the app at the certified set; delete the legacy module. | `palettes/` |
| **F-8** | MINOR | root-barrel `@mkbabb/glass-ui` for `useClipboard` (`:5`) while the same file uses two subpaths; 66-module vs 8-module graph. | `@mkbabb/glass-ui/dom`. | demo (10 files) |
| **F-9′** | MINOR | `TransitionGroup` import (`:4`) is unnecessary — the compiler auto-imports both built-ins; no lint can fire. | delete `:4`'s `TransitionGroup`. | `MixResultDisplay.vue:4` |
| **F-7** | MINOR *(hypothesis)* | weighted N-ary `mixColorSequence` homed in `demo/palettes/mix.ts`, forcing `as unknown as` at `mix.ts:37` — pure colour maths outside the colour library. | promote behind `@mkbabb/value.js/color`, typed on the space id. | `src/color/` |
| **F-10** | INFO | 19 pass-through `demo/ui/*` barrels — e.g. `demo/ui/card/index.ts` is a bare re-export of glass-ui's `Card`, and `MixPane.vue:3` imports through it while `:3` of this file imports glass-ui directly. Two conventions inside one folder; a pure alias shim (edict 2) shadowing the design system (edict 4). | delete the barrels; import glass-ui subpaths directly. | `demo/ui/` |
| **F-15** | INFO | the component appears in **0 of 60** visual captures; `/#/mix`'s 8 tap-target rows and 1 nameless button all belong to the shell and the add slot, not to this file. | a `STATES.json` entry driving the mix flow, once F-1 is cured. | visual audit |

### Cleared — negatives worth recording so no seat re-spends the probe

- **Published-surface consumption is CLEAN.** Zero `@src/*` and zero deep-path value.js imports in
  `demo/workbenches/`; all seven specifiers are the bare published subpaths, self-aliased from
  `package.json#exports` by generation (`vite.config.ts:39-50`). A real consumer could write every
  import in this workbench. The T.W1 dogfood keystone holds.
- **`verbatimModuleSyntax` (edict 8) — clean.** `:7` is the file's only type-only import and it is
  `import type`.
- **Vue 3.5 idiom (edict 7) — clean.** Reactive props destructure with a default at `:20-23`; no
  `defineModel` round-trip to stale-read.
- **Animations (edict 6) — clean.** `vj-morph` / `vj-enter` are registered globally in
  `demo/styles/animations.css:67-94`; the two scoped rules at `:149-157` are legitimately scoped.
  Nothing deleted.
- **Three parallel `useDark` stores** — the brief's third named suspect is **already dead**: zero
  live `useDark(` call sites in `demo/`. *(r5 F-18; re-confirmed.)*
