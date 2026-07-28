# CHALLENGE-L — library structure · `demo/workbenches/mix/MixResultDisplay.vue`

## Model receipt

I observe myself to be **Opus 5**, exact model id `claude-opus-5[1m]` (the 1M-context
variant) — the tier this seat was explicitly spawned with. Declared, not inherited.

---

## Provenance of this run

This is an **independent second run** of the CHALLENGE-L seat on this component. A prior
run's report existed at this path; I preserved it verbatim at
`challenge-L-library.prior-run.md` (same directory) before writing this file, and I read
it only **after** completing my own trace, so the convergence below is independent.

Seven of my findings reproduce the prior run's (L-1/L-2/L-3/L-5/L-6/L-7/L-8 there ↔
L-1/L-2/L-4/L-5/L-6/L-8/L-9 here) from different evidence. Five findings are **new to
this run** and are marked **[NEW]**: the pasted e2e RED, the dropped `:title`, the exact
`touch-floor.css` exclusion mechanism (which changes L-6's cure), the measured
barrel-vs-subpath byte delta, and the `--dock-compact-control-padding` per-instance
override precedent.

---

## Verdict

**DEFECTIVE.** The component's central library dependency — glass-ui 7.0.0's
`WatercolorDot` — is consumed against a prop/attribute contract that does not exist.
The consequence is not cosmetic: the `[data-mix-target]` anchor that this component's
own docstring calls "the anchor the canvas convergence lands on" **is never rendered**,
and the sibling that consumes it silently falls back to an invented coordinate. The
feature's stated architecture is dead in HEAD, and the e2e gate that would have caught
it fails one assertion earlier, so nothing reports it.

Strongest defect: **L-1**.

---

## 1. The import trace

Every import in `MixResultDisplay.vue:1-7`, traced to its home and judged:

| # | line | specifier | home | verdict |
|---|---|---|---|---|
| 1 | 2 | `@lucide/vue` → `Copy, Check, Save, RotateCcw` | devDependency `@lucide/vue@^1.16.0` | OK — value imports, correct form |
| 2 | 3 | `@mkbabb/glass-ui/dock` → `DockControl, DockSeparator` | published subpath (`exports["./dock"]`) | resolves, but **dock-scoped primitives used outside a dock** — see L-6 |
| 3 | 4 | `vue` → `computed, TransitionGroup` | peer | `TransitionGroup` import is redundant — see L-9 |
| 4 | 5 | `@mkbabb/glass-ui` → `useClipboard` | **root barrel** | the same symbol is published on `./dom`; a sibling in this very feature already uses `/dom` — see L-8 |
| 5 | 6 | `@mkbabb/glass-ui/watercolor-dot` → `WatercolorDot` | published subpath | resolves; **consumed against a non-existent contract** — L-1, L-2, L-3 |
| 6 | 7 | `import type { MixResult }` from `./composables/useMixingState` | sibling composable | correct `import type` (`verbatimModuleSyntax` ✓); the *type* is defective — see L-5 |

**No boundary is crossed the wrong way** in the feature→shell→boot sense: nothing here
reaches into `shell/`, `platform/`, or `src/` internals. Zero `@src/*` imports; zero
deep `dist/` paths.

**`@mkbabb/value.js` is imported correctly** where the feature touches it at all. This
component imports nothing from the library; its composable at
`composables/useMixingState.ts:19` does:

```ts
import type { HueInterpolationMethod } from "@mkbabb/value.js/color";
```

`"./color"` is a real entry in `package.json#exports`, `src/subpaths/color.ts` re-exports
`HueInterpolationMethod`, and `vite.config.ts:37-50` *generates* the demo's self-alias set
from `package.json#exports` so it cannot drift. A real consumer could write this import.
That half of the seam is sound. (The TypeScript half is not — L-8b.)

Repo-wide check, run:

```
$ grep -rn 'from "@mkbabb/value.js"' demo/ src/ test/
(no output)
```

Nothing imports the bare root specifier — which is fortunate, because
`package.json` declares **no `"."` export and no `main`/`module`/`types`**:

```
$ python3 -c "import json;d=json.load(open('package.json'));print([d.get(k) for k in ['main','module','types']], list(d['exports']))"
[None, None, None] ['./color', './value', './css', './easing', './math', './transform', './quantize']
```

---

## 2. Defects

### L-1 · BLOCKER — the convergence anchor is never rendered; the sibling animation silently converges on an invented point

**Defect.** `MixResultDisplay.vue:69` stamps `data-mix-target` on `<WatercolorDot>`.
glass-ui 7.0.0's `WatercolorDot` declares `inheritAttrs: false` and re-applies **only**
`attrs.class` and `attrs.style`. Every other fallthrough attribute is discarded. The
anchor never reaches the DOM. `mixStage.ts:121` therefore always gets `null` from its
`querySelector` and always takes the masking fallback at `:122-124`.

**Producer evidence** — `node_modules/@mkbabb/glass-ui/dist/watercolor-dot.js`:

```js
inheritAttrs: !1,
__name: "WatercolorDot",
props: { color:{}, variant:{default:"solid"}, animate:{...}, cycleDuration:{...}, range:{...}, seed:{default:""} },
setup(e) { let t = e, n = h(), c = i(() => n.class), f = i(() => n.style), ...
  return (t, n) => (d(), o("span", { "aria-hidden": "true", class: l([c.value, "watercolor-swatch", ...]),
    "data-testid": "watercolor-swatch", "data-variant": e.variant,
    style: u([f.value, { backgroundColor: ..., borderRadius: m(b), pointerEvents: "none", ... }]) }, [ ... ]))
```

Hard-coded `<span>`; `aria-hidden="true"`; `pointer-events: none`; only `class`/`style`
survive; **no default slot**.

**Consumer evidence** — `demo/workbenches/mix/MixAnimationCanvas/composables/mixStage.ts:121-124`:

```ts
const targetEl = root.querySelector<HTMLElement>("[data-mix-target]");
const target = targetEl
    ? layoutCenter(targetEl, root)
    : { x: root.clientWidth / 2, y: root.scrollHeight * 0.7, r: 28 };
```

**Reproduction (direct SFC mount — deterministic, no browser).** I mounted the real SFC
with `@vue/test-utils` under a scratch vitest config (`@vitejs/plugin-vue`, jsdom) and
asserted on the rendered DOM:

```
$ npx vitest run --config <scratch>/vitest.config.mts
GHOST_HTML>>> <div class="mix-plate ... mix-plate--ghost"> ... <span data-v-292b9032 aria-hidden="true"
  class="shrink-0 w-14 h-14 watercolor-swatch" data-testid="watercolor-swatch" data-variant="ghost"
  style="border-radius: 28.93…%; pointer-events: none; --watercolor-color: oklch(70% 0.15 30); …"> … </span>
ANCHOR_COUNT>>> 0
✓ 2 tests  Duration 1.46s
```

Props passed: `{ result: { type:"color", css:"oklch(70% 0.15 30)" }, ghost: true }`.
`ANCHOR_COUNT` is `wrapper.findAll("[data-mix-target]").length`. **Zero.** Note the
rendered attribute list: `data-v-*`, `aria-hidden`, `class`, `data-testid`,
`data-variant`, `style` — `data-mix-target` is simply gone.

**[NEW] The gate that should catch this is RED, and it fails one assertion earlier.**
Two e2e specs assert the anchor (`e2e/smoke/views/mix.spec.ts:52`,
`e2e/smoke/safari/mix-flow.spec.ts:40`). I ran the Chromium one against HEAD:

```
$ npx playwright test --project=smoke e2e/smoke/views/mix.spec.ts --reporter=line
Running 1 test using 1 worker
  1) [smoke] › e2e/smoke/views/mix.spec.ts:28:1 › mix flow: convergence lands at the result plate within budget

    Error: expect(locator).toBeVisible() failed
    Locator: getByRole('main', { name: 'Color tool panes' }).getByRole('button', { name: 'Add current color to the mix' })
    Expected: visible
    Timeout: 8000ms
    Error: element(s) not found

      40 |         name: "Add current color to the mix",
      41 |     });
    > 42 |     await expect(addSlot).toBeVisible();
  1 failed
```

The mix flow is unreachable *before* the anchor assertion is ever evaluated, by the same
`inheritAttrs` mechanism one component over (`MixSourceSelector.vue:164-174` sends
`tag="button"`, `aria-label`, `:disabled`, `@click` and a `<Plus>` child to
`WatercolorDot`; the live DOM at `http://localhost:9000/#/mix` is
`<span aria-hidden="true" class="add-slot-ghost … watercolor-swatch" style="…; pointer-events: none; …">`
— measured with WebKit/iPhone-14 via Playwright). So both anchor assertions are
**vacuous**: they have never run against a rendered plate.

**Mechanism.** Cross-package identity handshake published as a DOM attribute on a
third-party component whose fallthrough contract was assumed, not read — combined with a
**masking fallback** in the consumer that manufactures a plausible wrong geometry instead
of failing. Two independent edict-2 violations compounding.

**Proposed cure (transposition, not patch).** Identity belongs to markup the component
owns. The ghost branch already has a wrapper — `MixResultDisplay.vue:63`:

```html
<div v-if="ghost" key="well" class="flex items-center gap-3">
```

Move `data-mix-target` onto that wrapper and size it to the dot so `layoutCenter`'s box
is the well's box. **Then delete the fallback**: `collectStage` returns `null` when the
anchor is absent, and `useMixingAnimation`'s PRM path already settles honestly on a null
stage — a missing anchor becomes an instant, correct settle instead of a lie. The
architectural version of the cure is L-3: stop using DOM attributes as the cross-sibling
seam at all.

---

### L-2 · MAJOR — `tag` is not a prop of `WatercolorDot`; three dead call sites here, 21 repo-wide, and no gate sees any of them

**Defect.** `MixResultDisplay.vue:67, 81, 101` pass `tag="div"`. glass-ui 7.0.0's
`WatercolorDot` prop set is exactly `{ color, variant, animate, cycleDuration, range, seed }`
(`node_modules/@mkbabb/glass-ui/dist/components/watercolor-dot/WatercolorDot.vue.d.ts`).
`tag` is not among them, so it degrades to a fallthrough attribute — which
`inheritAttrs: false` then discards. It is a no-op in all three places.

**Reproduction.** Same mount as L-1, second case (`type:"palette"`, two colors):

```
TAGATTR_COUNT>>> 1
```

Exactly one `[tag]` in the whole rendered tree — `<transition-group-stub tag="div">`,
i.e. `TransitionGroup`'s *real* prop at `:94`. All three `WatercolorDot` `tag="div"`
are gone.

**Blast radius, measured:**

```
$ grep -rn -A6 "<WatercolorDot" demo/ | grep "tag=" | wc -l
      21
```

`MixResultDisplay.vue:67,81,101` · `MixSourceSelector.vue:148,168,215` ·
`GenerateControls.vue:203` · `ImageEyedropper.vue:30` · `ConsoleRail.vue:58` ·
`ColorSpaceSelector.vue:82` · `Dock.vue:136,138,271` · `EmptyState.vue:45,46,47` ·
`CurrentPaletteEditor.vue:62,64,98` · `SwatchHoverMenu.vue:17,32`.

**Why it survived.** The W44 glass-7 adoption migrated the *dock* family and the
*clipboard* primitive in this file and stopped there:

```
$ git show f2c8f565 -- demo/workbenches/mix/MixResultDisplay.vue
-import { DockIconButton, DockSeparator } from "@mkbabb/glass-ui/dock";
+import { DockControl, DockSeparator } from "@mkbabb/glass-ui/dock";
-import { copyToClipboard } from "@mkbabb/glass-ui";
+import { useClipboard } from "@mkbabb/glass-ui";
```

13 insertions / 13 deletions — not one `WatercolorDot` line touched. The migration was
driven by *removed exports* (which `vue-tsc` catches) and was blind to *removed props*
(which it does not: `vue-tsc` does not error on unknown attrs passed to a component, it
treats them as fallthrough).

**Mechanism.** A producer breaking change absorbed silently because the gate is
export-shaped and the break is prop-shaped.

**Proposed cure.** Delete all three `tag="div"` here (they are decorative dots; a `<span>`
is correct). Repo-wide, the seven `tag="button"` sites are the dangerous class and need a
real `<button>` wrapping the decorative dot. The edict-4 gestalt cure is a glass-ui
`WatercolorSwatchButton` primitive so the pattern has one home; relay to the glass-ui BH
inbox with L-3 and L-6.

---

### L-3 · MAJOR **[NEW]** — the palette swatches' only descriptive text is also dropped

**Defect.** `MixResultDisplay.vue:103` sets `:title="color.css"` on each palette swatch —
the sole affordance telling a user which color a dot is. Same mechanism as L-1/L-2: it is
a fallthrough attribute on `WatercolorDot`, discarded. Even had it survived, the
primitive's inline `pointer-events: none` makes the hover that would surface a `title`
impossible.

**Reproduction.** Same mount, palette case:

```
TITLE_COUNT>>> 0        // wrapper.findAll(".swatch-row [title]").length
```

Rendered swatch, verbatim from the mount:

```html
<span aria-hidden="true" class="w-10 h-10 shrink-0 watercolor-swatch" data-testid="watercolor-swatch"
      data-variant="solid" style="background-color: oklch(0.7 0.15 30); …; pointer-events: none; …">
```

`aria-hidden="true"` and no `title`: a palette mix result is **an unlabelled row of
colored blobs with no text equivalent of any kind**. The single-color branch is fine
(`:85-87` renders the CSS string as real text); the palette branch renders nothing
readable. This is a data-loss defect in the component's primary output, not a polish item.

**Mechanism.** Same as L-1 — semantics asserted on a primitive that discards them.

**Proposed cure.** The palette branch should render the color's text next to (or under)
its dot the way the single-color branch does, rather than hiding it in a `title` that a
touch device could never surface anyway. Structurally this is the same cure as L-5:
once `MixResult` is a real discriminated union, both branches can render through one
`<ResultSwatch :color>` that owns "dot + its CSS text" once.

---

### L-4 · MAJOR — one concept, three implementations, inside one feature directory

Three separate pieces of logic in this feature answer the *same two questions*, each with
its own spelling.

**(a) "What is this result's landing pigment?"**

| site | code |
|---|---|
| `MixResultDisplay.vue:36-40` | `result.type === "color" ? result.css ?? "var(--muted-foreground)" : result.colors?.[0]?.css ?? "var(--muted-foreground)"` |
| `useMixingAnimation.ts:75-82` | `res.type === "color" ? res.css ?? null : res.colors?.[0]?.css ?? null` |

Identical predicate, different null sentinel. These two **must** agree — the animation's
pool color and the well's ghost color are supposed to be the same pigment ("the
silhouette the pigment poured into is the silhouette the result wears",
`MixResultDisplay.vue:16-17`). Nothing enforces it; the agreement is a coincidence of two
hand-copied expressions.

**(b) "Serialize this result to clipboard text."**

| site | primitive | feedback |
|---|---|---|
| `MixResultDisplay.vue:42-47` (`onCopy`) | `useClipboard({resetMs:1500})` from the **root barrel** | check-mark swap |
| `MixPane.vue:49-55` (`copyResult`) | `writeClipboard` from the **root barrel** | none |

Byte-identical serialization body:

```ts
const text = result.type === "color" ? result.css ?? ""
    : result.colors?.map((c) => c.css).join(", ") ?? "";
```

Both are live. `MixPane.copyResult` is wired into the dock command palette at
`demo/shell/usePaneRouter.ts:222` (`"Copy result"`), so a user can copy the same result
through two code paths with two different confirmation semantics.

**(c) `onSave`** at `MixPane.vue:41-46` re-derives the same union narrowing a third time.

**Mechanism.** No unique semantic home for "a mix result". The type carries no behaviour,
so behaviour scatters to every consumer.

**Proposed cure.** `MixResult` becomes an object with the two derived properties on it —
`landingCss` and `toText()` — computed once where the result is produced
(`useMixingState.startMix`). The display renders; the pane commands; the animation reads.
Zero re-derivation, and (a)'s agreement becomes structural. `MixResultDisplay` should
then **emit `copy`** like it emits `save`/`reset`, instead of performing a clipboard
side-effect: a component named `…Display` owning a platform write is the ownership
inversion that produced (b).

---

### L-5 · MAJOR — `MixResult` is a union that is not discriminated, so every consumer pays a masking fallback

**Defect.** `composables/useMixingState.ts:30-36`:

```ts
export type MixResultType = "color" | "palette";
export interface MixResult {
    type: MixResultType;
    css?: string;
    colors?: PaletteColor[];
}
```

A tagged discriminant with both payloads optional on one interface. TypeScript cannot
narrow `type === "color"` to "`css` is present", so every read must re-check and
substitute. Count in this file alone:

- `:37-39` — `result.css ?? "var(--muted-foreground)"` **and** `result.colors?.[0]?.css ?? "var(--muted-foreground)"`
- `:43-45` — `result.css ?? ""` **and** `result.colors?.map(…) ?? ""`
- `:78` — `v-if="result.type === 'color' && result.css"` — the `&& result.css` is pure compensation
- `:91` — `v-if="result.type === 'palette' && result.colors"` — likewise

Plus `MixPane.vue:41,44,52,53` and `useMixingAnimation.ts:79,81`. Ten masking fallbacks
across three files, all downstream of one type. Each `?? ""` is a silent
copy-empty-string; each `?? "var(--muted-foreground)"` paints grey where a color failed.

**Mechanism.** A union modelled as an optional-bag. Edict 2 forbids masking fallbacks;
this type *manufactures* them.

**Proposed cure.**

```ts
export type MixResult =
    | { readonly type: "color";   readonly css: string }
    | { readonly type: "palette"; readonly colors: readonly PaletteColor[] };
```

Every `??` above deletes itself, `v-if` conditions shorten to the discriminant, and the
compiler starts enforcing what the ten fallbacks were guessing at.

---

### L-6 · MAJOR — dock-scoped primitives in a plate with no dock, and `compact` opts out of the one out-of-dock guarantee glass-ui ships

**Defect.** `MixResultDisplay.vue:120-143` builds its action row from three
`<DockControl compact>` plus `<DockSeparator>`, inside `.mix-plate` — a card fixture with
no `.glass-dock` ancestor anywhere in `MixPane.vue`.

Rendered markup (from the L-1 mount):

```html
<button type="button" class="dock-icon-button glass-specular-track glass-capsule-hover dock-icon-button--compact"
        style="--dock-press-t: 0.0000; --flex-vel: 0.0000;" data-press-armed="" title="Copy color"> …
```

**[NEW] The precise mechanism — glass-ui *does* ship an out-of-dock touch floor, and
`compact` is written as its exclusion.**
`node_modules/@mkbabb/glass-ui/dist/components/dock/styles/controls/touch-floor.css`:

```css
@media (pointer: coarse) {
  .dock-icon-button:not(.dock-icon-button--compact):not(:where(.glass-dock *)) {
    min-block-size: var(--dock-touch-target, 2.75rem);
    min-inline-size: var(--dock-touch-target, 2.75rem);
  }
}
```

Read the selector: *non-compact*, *outside a dock* → 44 px floor. Inside a dock, the
dock's own coarse block does it (`overflow.css`: `.glass-dock[data-size] { --size-icon-btn: var(--dock-touch-target) }`).
**Compact + outside a dock is the one uncovered quadrant, and it is exactly what this
component instantiates.** Geometry then falls to
`controls/icon-button.css`:

```css
.dock-icon-button--compact { width: var(--dock-compact-control-size, auto);
  height: var(--dock-compact-control-size, auto); min-width: var(--dock-compact-control-min-width, 0);
  padding: var(--dock-compact-control-padding, 0.25rem); }
```

None of those tokens is defined anywhere in `demo/` or in glass-ui's
`styles/tokens/sizing.css` (verified by grep), so: 20 px glyph (`w-5 h-5`) + 2 × 4 px
padding = **28 × 28 px**, in every matrix, coarse or fine. That is 40 % of the 44 px bar.
Corroborated by the live real-Safari measurement of the *same* primitive on the same
route: the three compact `DockControl`s in `SlugEditLayer.vue` measure **23 × 23**
(`REPORT.json`, `safari-mobile-light /#/mix` → `smallTapTargets`:
`{"w":23,"h":23,"tag":"button","label":"Switch to slug"}` ×3), which is `w-3.5` (14 px)
+ 8 px padding — the identical arithmetic.

**[NEW] The demo has already discovered this and papered it per-instance.**
`demo/shell/dock/ActionBarToggle.vue:149-155`:

```
   rides the producer's OWN token hook (`--dock-compact-control-padding`, …
    --dock-compact-control-padding: 0.5rem 0.75rem;
```

A per-instance token override to fix out-of-dock compact geometry — an edict-5 violation
(style at the root component level, never per-instance) that exists *because* the
primitive's guarantee does not travel with it.

**Secondary.** These three buttons carry `title=` and **no `aria-label`** — the mount's
rendered HTML shows `title="Copy color"`, `title="Save to palettes"`, `title="Reset"` and
no accessible name. The demo's own dock-wide law, stated at `SlugEditLayer.vue:88-90`:

> "native `title` retired dock-wide — icon-only controls carry aria-label (the UA tooltip
> slab is a foreign register on the liquid-glass dock)."

This component still uses the retired register. That is legacy code by edict 2 and a real
a11y gap: an icon-only button named only by `title` is nameless to most AT.

**Proposed cure.** glass-ui publishes `./button` with exactly the right primitive:

```ts
/** Square geometry for an accessibly named icon command. */
iconOnly?: boolean;
emphasis?: "primary" | "secondary" | "quiet" | "text";
```

Use `<Button icon-only emphasis="quiet" :aria-label>` for an in-plate action row and drop
the dock import entirely — the dock family belongs to the dock. The producer-side half
(edict 4, relay to the glass-ui BH inbox): either extend `touch-floor.css` to cover
`--compact` outside a dock, or make `compact` an explicitly dock-only modifier that
`DockControl` refuses outside `useOptionalDockContext()`. A guarantee that silently
evaporates based on an ancestor is not a guarantee.

---

### L-7 · MAJOR — glass-ui hands back a named failure channel; the component discards it

**Defect.** `useClipboard`'s published return is deliberately non-lossy
(`composables/dom/useClipboard.d.ts`):

```ts
export type CopyResult = { ok: true } | { ok: false; reason: CopyFailureReason };
copy: (text: string) => Promise<CopyResult>;
onCopyError?: (reason: CopyFailureReason) => void;
```

The doc comment says why: *"returning a named failure … rather than a lossy boolean"*.
`MixResultDisplay.vue:42-47`:

```ts
async function onCopy() {
    const text = …;
    await copy(text);          // return value dropped; no onCopyError
}
```

`status` only ever reaches `"success"` on success, so `copied` (`:32`) stays `false` on
failure and the UI shows **nothing at all** — the button silently does not change. On a
platform where `navigator.clipboard` is unavailable or the write is rejected (WebKit
without a user-gesture-adjacent call, an insecure origin), the user gets no signal.

**Mechanism.** The producer moved from a lossy boolean to a discriminated result
specifically so consumers could report failure; the consumer kept the fire-and-forget
call shape from the retired `copyToClipboard` API. That is exactly the "no legacy
call-site shape" the W44 commit message claims to have retired
(*"No local adapter, no preserved boolean signature"*) — it retired the *symbol* but kept
the *shape*.

**Reproduction.** NONE — hypothesis at the failure branch. The API misuse itself is
confirmed by the signature above vs. `:46`; the user-visible consequence is inferred from
`status` never leaving `"idle"`/`"failure"`, both of which render `copied === false`.

**Proposed cure.** Once L-4's cure lands and the copy is a `@copy` emit, `MixPane` owns
one clipboard path and can surface `{ ok: false, reason }` once, in one place, for both
entry points (in-plate button + dock command).

---

### L-8 · MINOR — three spellings of one package, one of them the god-barrel; and the TS half of the value.js seam has drifted

**(a) [NEW, measured] glass-ui is imported at three different depths in one file.**

```
demo/workbenches/mix/MixResultDisplay.vue:3  @mkbabb/glass-ui/dock            (subpath)
demo/workbenches/mix/MixResultDisplay.vue:5  @mkbabb/glass-ui                 (ROOT BARREL)
demo/workbenches/mix/MixResultDisplay.vue:6  @mkbabb/glass-ui/watercolor-dot  (subpath)
```

`useClipboard` is published on `./dom` (`dist/dom.d.ts` → `export * from "./composables/dom"`),
and the *sibling composable in this same feature* already uses it:
`MixAnimationCanvas/composables/useMixingAnimation.ts:43` →
`import { useBreakpoint } from "@mkbabb/glass-ui/dom"`. So the correct spelling is
established in-tree and this file does not use it. Repo-wide the root barrel is imported
37 times.

Measured cost, so this is sized honestly rather than asserted:

```
$ printf 'import { useClipboard } from "@mkbabb/glass-ui";\nconsole.log(useClipboard);\n' > barrel.js
$ printf 'import { useClipboard } from "@mkbabb/glass-ui/dom";\nconsole.log(useClipboard);\n' > subpath.js
$ npx esbuild {barrel,subpath}.js --bundle --format=esm --external:vue --external:reka-ui --minify …
barrel bytes:  1895
subpath bytes: 1077
```

**+818 bytes minified, +76 %** for one symbol. glass-ui declares
`"sideEffects": ["*.css"]`, so tree-shaking does most of the work — this is a **naming and
consistency** defect first, a weight defect second. Sized as MINOR on the measurement,
not talked up.

**(b) `tsconfig.demo.json` `paths` has drifted from `package.json#exports`.**
`vite.config.ts:37-50` *generates* the runtime alias set from `package.json#exports`
precisely so it cannot drift, with a long comment saying so. The TypeScript half was left
hand-rolled and rotted:

| declared in `tsconfig.demo.json` | in `exports`? | file exists? |
|---|---|---|
| `@mkbabb/value.js` → `dist/index.d.ts` | **no** | **no** (`dist/index.d.ts` ABSENT) |
| `@mkbabb/value.js/parsing` | **no** | **no** |
| `@mkbabb/value.js/units` | **no** | **no** |
| `@mkbabb/value.js/color` | yes | yes |
| `@mkbabb/value.js/math`, `/easing`, `/transform`, `/quantize` | yes | yes |

and **omits** two real exports: `./css` and `./value`. Three phantom mappings (dead
config = edict 2) and two blind spots — a demo file importing `@mkbabb/value.js/css`
would run fine through Vite and resolve through a *different* path under `tsc`.

**Proposed cure.** Do to `tsconfig.demo.json` what `vite.config.ts` already does: generate
`paths` from `package.json#exports` at config time (`tsconfig` cannot compute, so this is
a tiny prebuild step writing `tsconfig.paths.generated.json` that both demo and vitest
configs `extends`). One source of truth for the package's own surface, in both halves of
the toolchain. Separately: pick the subpath spelling for glass-ui everywhere and let
`demo/ui/*` — nineteen barrels that are pure `export … from "@mkbabb/glass-ui"`
re-exports, including the one `MixPane.vue:3` uses for `Card` — die with it.

---

### L-9 · MINOR — one Vue built-in imported, its sibling not

`MixResultDisplay.vue:4` — `import { computed, TransitionGroup } from "vue"`. The template
uses **both** `<Transition>` (`:60`) and `<TransitionGroup>` (`:92`); only the latter is
imported. Both are SFC-compiler built-ins resolved without an import — proven by the L-1
mount, where `<Transition>` rendered as `<transition-stub>` with no import present. The
`TransitionGroup` import is dead. Delete it; `import { computed } from "vue"` is the whole
need.

---

## 3. The lattice I would build greenfield

Concretely, with no legacy. The mix feature has **four** real concepts and currently
smears them across seven files.

```
demo/workbenches/mix/
├── mix-result.ts              ← THE MODEL. Owns the concept "a mix result".
│     export type MixResult =
│         | { readonly type: "color";   readonly css: string }
│         | { readonly type: "palette"; readonly colors: readonly PaletteColor[] };
│     export const landingCss = (r: MixResult) => …     // ONE definition (kills L-4a)
│     export const resultText = (r: MixResult) => …     // ONE definition (kills L-4b)
│
├── useMix.ts                  ← THE MACHINE. selection + space/hue config + phase.
│     Produces MixResult; owns no timers (the current one-clock law is right, keep it).
│
├── MixPane.vue                ← THE SEAT. Owns every side-effect: clipboard, save,
│     the dock command surface. Provides the anchor element for the canvas.
│
├── MixResultPlate.vue         ← PURE PRESENTATION. props: { result, ghost };
│     emits: { copy, save, reset }. No clipboard, no serialization, no `??`.
│     Renders <ResultSwatch> for both branches — one home for "dot + its CSS text".
│
└── MixAnimationCanvas/        ← THE NARRATION. Unchanged in spirit.
```

Two structural moves beyond file layout:

**1. Kill the DOM-attribute seam.** `[data-mix-target]` / `[data-mix-source]` are a
cross-sibling contract expressed as a global `querySelector`, unenforced by any type and
— as L-1 proves — silently satisfiable by an unrelated component's rendering decisions.
Replace with an explicit registry: `MixPane` `provide()`s a `MixStage` handle
(`registerTarget(el)`, `registerSource(el, css)`); the plate and the selector call it from
`useTemplateRef`. Now the contract is typed, the anchor cannot vanish without a compile
error, and `collectStage` has no fallback to mask anything with.

**2. Decoration is never a control.** Every `WatercolorDot` in the tree is an
`aria-hidden`, `pointer-events: none` `<span>` — that is *correct* for a pigment face and
*fatal* when a call site pretends it is a button or an anchor. The rule: `WatercolorDot`
is only ever a child of the element that carries the semantics. Interactivity, identity
and naming live on a real `<button>`/`<div>` the consumer owns. That one rule kills L-1,
L-2, L-3 and the seven `tag="button"` sites repo-wide simultaneously — and if
dot-shaped buttons are wanted as a *thing*, that primitive belongs in glass-ui (edict 4),
not in a `tag=` string the producer ignores.

**3. Actions come from `./button`, not `./dock`.** An in-plate action row is not a dock.
`<Button icon-only emphasis="quiet" :aria-label>` gets correct geometry, a real
accessible name, and no dependence on an ancestor that does not exist.

---

## 4. Evidence index

| # | artefact |
|---|---|
| E1 | Direct SFC mount, `@vue/test-utils` + `@vitejs/plugin-vue` + jsdom. `ANCHOR_COUNT=0`, `TITLE_COUNT=0`, `TAGATTR_COUNT=1`. Scratch config + spec: `/private/tmp/claude-504/-Users-mkbabb-Programming-value-js/6614e90c-8bd6-434f-b017-5ad4277c6e5e/scratchpad/Lprobe/` |
| E2 | `npx playwright test --project=smoke e2e/smoke/views/mix.spec.ts` → **1 failed** at `:42`, `element(s) not found` for `Add current color to the mix` (pasted in L-1) |
| E3 | Live WebKit/iPhone-14 DOM of the add-slot: `<span aria-hidden="true" class="add-slot-ghost … watercolor-swatch" style="…; pointer-events: none; …">` — probe `scratchpad/L-dump.mjs` against `http://localhost:9000/#/mix` |
| E4 | `node_modules/@mkbabb/glass-ui/dist/watercolor-dot.js` — `inheritAttrs: !1`, six props, hard-coded `<span>`, only `class`/`style` re-applied, no slot |
| E5 | `node_modules/@mkbabb/glass-ui/dist/components/dock/styles/controls/touch-floor.css` — `.dock-icon-button:not(.dock-icon-button--compact):not(:where(.glass-dock *))` 44 px floor |
| E6 | `node_modules/@mkbabb/glass-ui/dist/components/dock/styles/controls/icon-button.css` — `--compact` geometry: `padding: var(--dock-compact-control-padding, 0.25rem)`, tokens undefined repo-wide |
| E7 | `REPORT.json` `safari-mobile-light /#/mix` → three 23×23 compact `DockControl`s; no `MixResultDisplay` row in any matrix (the audit never mixed anything — the component is uncaptured across all 60 shots, and `shots/*/mix.png` show the empty pane) |
| E8 | esbuild bundle: root barrel 1895 B vs `/dom` subpath 1077 B, minified, `vue`+`reka-ui` external |
| E9 | `git show f2c8f565 -- demo/workbenches/mix/MixResultDisplay.vue` — the W44 glass-7 adoption: 13+/13−, dock + clipboard only, no `WatercolorDot` line touched |
| E10 | `tsconfig.demo.json` `compilerOptions.paths` vs `package.json#exports` vs `ls dist/` — 3 phantom, 2 missing, `dist/index.d.ts` absent |

Prior run of this seat preserved at
`docs/tranches/V/megatranche/audit/components/wb-mix-resultdisplay/challenge-L-library.prior-run.md`.
Related banked ledger entries (independent seats, same L-1 family):
`docs/tranches/V/megatranche/registry/DEFECT-LEDGER.md:4552, 5326, 5866, 20414`.
