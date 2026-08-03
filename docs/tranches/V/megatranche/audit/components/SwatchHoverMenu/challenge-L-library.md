# CHALLENGE-L — library structure · `SwatchHoverMenu.vue`

## Model receipt

I observe myself to be **Opus 5** (`claude-opus-5[1m]`, 1M-context variant) — the tier this seat
was spawned with. Declared, not inherited.

- **Seat**: CHALLENGE-L (library is improperly structured)
- **Subject**: `demo/palettes/browser/card/SwatchHoverMenu.vue` (93 lines, area `palettes`)
- **Repo/HEAD**: `/Users/mkbabb/Programming/value.js`, branch `tranche-u`, `c654824e`
- **Date**: 2026-07-29
- **Live probes**: dev server `http://localhost:9000` (WebKit via Playwright), read-only
- **Writes**: this file only

---

## Verdict

**DEFECTIVE — two BLOCKERs.**

The component's whole reason to exist is that it renders a swatch and a floating action menu.
Measured on the running app, **neither works**:

1. The hover-path panel is styled and positioned by the bare CSS class `floating-panel`.
   **Zero rules match that selector across all 42 loaded stylesheets.** The panel therefore
   computes `position: static` — its `top`/`left` are inert — and renders as a transparent,
   shadowless, z-index-less **1440 × 40 block at the bottom of `<body>`, 593 px below its anchor
   swatch and entirely below the fold**.
2. The swatch itself is a `WatercolorDot` with `tag="button"`, an `aria-label` and a `@click`.
   **glass-ui 7.0.0's `WatercolorDot` has no `tag` prop, declares `inheritAttrs: false`, re-applies
   only `class` and `style`, renders no slot, and hardcodes `aria-hidden="true"` +
   `pointer-events: none` on a `<span>`.** Every one of those three bindings is silently discarded.
   The "swatch button" is an aria-hidden, pointer-inert span; the `click` emit at `:35` is
   unreachable code; and on the touch path `PopoverTrigger as-child` cannot bind its trigger props,
   so the Popover cannot open either.

Both are the same *structural* disease, which is what this seat is for: **this component holds two
load-bearing contracts with the producer package that live outside the export map and outside the
type system** — a CSS class name, and HTML attribute fall-through. Neither `vue-tsc` nor `eslint`
can see either one (both gates are green on this file today: `npx eslint …SwatchHoverMenu.vue
--max-warnings=0` exits clean). A producer major bump silently voided both, and every gate stayed
green for two glass-ui majors.

---

## The import graph, traced

`SwatchHoverMenu.vue` has exactly three import edges (`:60–62`):

| # | Specifier | Resolves to | Verdict |
|---|-----------|-------------|---------|
| 1 | `import type { CSSProperties } from "vue"` | vue | OK — `import type` satisfies `verbatimModuleSyntax` (edict 8) |
| 2 | `from "../../../ui/popover"` | `demo/ui/popover/index.ts` → `export { Popover, PopoverTrigger, PopoverContent } from "@mkbabb/glass-ui"` (the **root barrel**) | **VIOLATING** — see L-3 |
| 3 | `from "@mkbabb/glass-ui/watercolor-dot"` | glass-ui subpath export | correct channel — and it is the *other* channel from #2, in the same file |

It imports **nothing** from `@mkbabb/value.js`. That is worth stating plainly, because the seat is
asked whether the component consumes the published surface correctly: **the flagship demo's colour
swatch menu exercises none of the library's public API.** Its colour contract is a bare
`color: string` (`:70`), passed through to a producer component. As a proof of `@mkbabb/value.js`'s
public surface, this component proves nothing.

The demo tree as a whole *does* consume value.js only through bare subpaths — verified:

```
$ grep -rhno 'from "@mkbabb/value.js[^"]*"' demo/ --include="*.ts" --include="*.vue" | sed 's/.*from //' | sort | uniq -c | sort -rn
  24 "@mkbabb/value.js/color"
  10 "@mkbabb/value.js/css"
   6 "@mkbabb/value.js/math"
   5 "@mkbabb/value.js/easing"
   4 "@mkbabb/value.js/quantize"

$ grep -rn 'from "[./]*\.\./src/' demo/ --include="*.ts" --include="*.vue" | wc -l
0
```

Zero `src/` deep reaches. The T.W1 dogfood keystone holds at the specifier level. It does **not**
hold at the resolution level — see **L-6**.

---

## Findings

### L-1 · BLOCKER · The hover panel's surface + positioning is a dead CSS-class contract

**Evidence — static.** `SwatchHoverMenu.vue:42` `class="floating-panel"`. No CSS rule for that
selector exists anywhere in the tree or in the producer:

```
$ grep -rn "floating-panel" --include="*.css" demo/
demo/styles/animations.css:2: * Shared keyframes (dialog, floating-panel, card-menu, shimmer, etc.)   ← a comment

$ grep -rc "floating-panel" node_modules/@mkbabb/glass-ui/dist/glass-ui.css
node_modules/@mkbabb/glass-ui/dist/glass-ui.css:0
```

**Evidence — live, on `http://localhost:9000`.** Injected a probe element and walked every loaded
stylesheet:

```json
{ "computed": { "position": "static", "zIndex": "auto",
                "backgroundColor": "rgba(0, 0, 0, 0)", "backdropFilter": "none",
                "borderRadius": "0px", "boxShadow": "none", "animationName": "none" },
  "ruleHits": 0, "sheetsRead": 42, "sheetsBlocked": 0 }
```

**Reproduction — real mouse hover, `/#/palettes`, 1440×900:**

```js
await page.locator('.swatch-row > div:nth-child(3)').hover();
```
```json
{ "panelCount": 1,
  "panelInline": ["top: 307.18px; left: 907.5px;"],
  "panelPosition": ["static"],
  "panelRects":  [{ "x": 0, "y": 900, "w": 1440, "h": 40 }],
  "anchor":       { "x": 884, "y": 349 },
  "viewportH": 900 }
```

`useHoverPopover.positionPanel` computes the correct anchor coordinates and writes them
(`top: 307.18px; left: 907.5px`) — and they are **inert**, because a `position: static` box ignores
`top`/`left`. The panel lays out in normal flow as the last child of `<body>`: full viewport width,
40 px tall, top edge at y = 900 — i.e. exactly at the fold, 593 px below the swatch it belongs to,
and it grows the document from 900 px to 940 px.

**Mechanism.** The rule used to be local. Commit `c84504d3` (*"refactor(demo): migrate dock, styles,
and composables to glass-ui"*, 2026-03-25) deleted `demo/@/styles/floating-panel.css` on the premise
recorded in its own message: *"Delete dock.css, **floating-panel.css**, glass.css, transitions.css;
now provided by `@import "@mkbabb/glass-ui/styles"`"*. What was deleted:

```css
.floating-panel {
    position: fixed;                      /* ← the entire positioning contract */
    z-index: var(--z-overlay);
    border-radius: var(--radius-xl);
    border: 1px solid hsl(var(--border) / 0.6);
    background: hsl(var(--card) / 0.75);
    backdrop-filter: blur(12px) saturate(1.3);
    box-shadow: var(--glass-shadow-elevated);
    animation: floating-panel-in var(--duration-fast) var(--ease-decelerate);
}
```

glass-ui 7.0.0 ships no such rule. The consumer→producer dependency was expressed as a **string in a
`class` attribute** — invisible to the export map, to `vue-tsc`, and to `eslint`. It broke on a
producer bump with no diagnostic. The A-era audit even certified it as sound —
`docs/tranches/A/research/Ad-interactive-states.md:158-166` asserts *"The `floating-panel` class is
the glass-ui utility (good — same surface tokens), so the visual result matches"*. That assertion is
now false and the ledger has carried it forward unchallenged since.

**Proposed cure (transposition, not patch).** Do not re-add the class. The floating surface is a
design-system concept and glass-ui already publishes it as a component (`./popover` →
`PopoverContent`, and `./surface`). Delete the hand-rolled `<Teleport>` branch entirely and let one
producer primitive own surface, elevation, positioning and dismissal — see **L-4** for the collapsed
shape. A component contract is typed; a class name is not.

---

### L-2 · BLOCKER · The component codes against a `WatercolorDot` API glass-ui 7.0.0 does not have

**Evidence — the producer's real surface.** `node_modules/@mkbabb/glass-ui/dist/components/
watercolor-dot/WatercolorDot.vue.d.ts`:

```ts
type __VLS_Props = {
    color: string;
    variant?: "solid" | "ghost";
    animate?: boolean;
    cycleDuration?: number;
    range?: [number, number];
    seed?: string;
};
```

No `tag`. And the compiled component (`node_modules/@mkbabb/glass-ui/dist/watercolor-dot.js`):

```js
E = e(c({
  inheritAttrs: !1,                                   // ← fall-through disabled
  __name: "WatercolorDot",
  props: { color:{}, variant:{default:"solid"}, animate:{...}, cycleDuration:{...},
           range:{...}, seed:{default:""} },
  setup(e) {
    let t = e, n = h(),                               // useAttrs()
        c = i(() => n.class),                         // ← ONLY class
        f = i(() => n.style);                         //   and style are re-applied
    return (t, n) => (d(), o("span", {                // ← always a <span>
      "aria-hidden": "true",                          // ← hardcoded
      class: l([c.value, "watercolor-swatch", ...]),
      "data-testid": "watercolor-swatch",
      "data-variant": e.variant,
      style: u([f.value, { backgroundColor: …, borderRadius: m(b),
                           pointerEvents: "none", … }])   // ← hardcoded
    }, [ /* svg filter host */, /* ghost stroke or comment */ ]));  // ← no renderSlot
  }
}), [["__scopeId","data-v-292b9032"]]);
```

**What `SwatchHoverMenu.vue` sends it** (`:14-20` touch path, `:29-36` hover path):

```
:14  <WatercolorDot :color …  tag="button"                    → not a prop → attr → DISCARDED
:18                           :aria-label="`Color swatch …`"  → attr        → DISCARDED
:35                           @click.stop="$emit('click')"    → listener    → DISCARDED
:19/:34                       :class="[sizeClass, …]"         → the ONLY binding that lands
```

**Reproduction — live, `/#/browse`, first expanded palette card's swatch:**

```json
{ "dotTag": "SPAN",
  "dotAttrs": ["data-v-292b9032","aria-hidden","class","data-testid","data-variant","style"],
  "dotAriaHidden": "true", "dotAriaLabel": null, "dotTagAttr": null,
  "dotPointerEvents": "none", "dotTabIndex": -1 }
```

`aria-label` is absent. `tag` is absent. The element is a `<span>`, `aria-hidden`, `tabIndex -1`,
`pointer-events: none`.

**Consequences, each structural:**

- **The `click` emit at `:35` is dead code.** The listener never attaches; and even a click landing
  on the span's box passes through (`pointer-events: none`) to the wrapper `div.relative`, which
  carries no click handler (`:2-6` binds only `pointerenter`/`pointerleave`). `PaletteCardSwatches`
  `@click="$emit('swatchClick', i)"` (`:36`) and `CurrentPaletteEditor` `@click="onCurrentSwatchClick(i)"`
  (`:41`) are therefore both unreachable, as is `useHoverPopover.onSwatchClick` (`:51-54`).
- **The touch path cannot open.** `<PopoverTrigger as-child>` (`:13`) works by merging the trigger's
  props — `onClick`, `aria-expanded`, `aria-controls`, `id`, `data-state`, `type` — into the child
  vnode as fall-through attrs. `inheritAttrs: false` + a class/style-only re-application discards all
  of them. Same mechanism, proven live on the hover path.
- **No accessible name, no role, no focusability** on either path, which is precisely the
  `smallTapTargets` / accessible-name family the visual audit keeps re-reporting.
- **Default slots are dropped repo-wide.** The compiled render function has no `renderSlot` call at
  all. `CurrentPaletteEditor.vue:104` puts `<Plus>` inside a `WatercolorDot` — it is never rendered.
  This is **visible in the captured audit shot**
  `docs/tranches/V/megatranche/audit/visual/shots/safari-desktop-light/browse.png`: the "Start a new
  palette" well shows a bare dashed blob with no `+` glyph in it.

**Why no gate caught it.** Vue's template typecheck treats an unknown attribute on a component as a
legal fall-through attr, so `tag="button"` and `aria-label` are *valid TypeScript*. There is no
compile-time expression of "this component honours fall-through". The seam between demo and
glass-ui is typed for props and **untyped for everything else** — and this component's correctness
rests entirely on the untyped half.

**Proposed cure.** `WatercolorDot`'s own docstring says it is a face: *"an organic pastel blob
swatch… the blob shape is a deterministic `border-radius` silhouette"*. It is correctly
`aria-hidden` and correctly pointer-inert — a **paint**, not a seat. The defect is the demo asking a
paint to be a control by smuggling attributes. Unique semantic ownership says: the *seat* is a
design-system concept too. Add `Swatch` to glass-ui — a real `<button>` (or `as`-polymorphic root)
that renders `WatercolorDot` as its face and owns focus ring, accessible name, press state and
attr/listener fall-through. Then `SwatchHoverMenu` binds `:color`, `:label`, `@click` to a typed
prop surface, and a producer bump that changes it is a **type error**, not a silent visual death.
Interim, if glass-ui cannot take it this wave: the demo owns a plain `<button class="…">` wrapping
`<WatercolorDot aria-hidden>` — never `tag="button"`, which is a phantom.

---

### L-3 · MAJOR · `demo/ui/popover` is a pure alias layer; two channels to one producer in one file

`demo/ui/popover/index.ts`, in its entirety:

```ts
export { Popover, PopoverTrigger, PopoverContent } from "@mkbabb/glass-ui";
```

It is one of **19 identical shadcn-era shim directories**:

```
$ for d in demo/ui/*/; do f="$d/index.ts"; [ -f "$f" ] && echo "$(wc -l < $f) lines, $(grep -c '@mkbabb/glass-ui' $f) glass-ui : $f"; done
      11 lines, 2 glass-ui lines : demo/ui/alert//index.ts
       1 lines, 1 glass-ui lines : demo/ui/avatar//index.ts
       … 17 more, every one a 1-line pass-through …
       1 lines, 1 glass-ui lines : demo/ui/popover//index.ts
```

Three distinct violations, in one line of code:

1. **Edict 2 (no legacy code, no aliases, no dual paths).** A re-export whose only content is a
   rename of a package specifier is an alias. Nothing is added, adapted, or defended.
2. **Edict 4 (glass-ui *is* the design system; not `demo/ui/`).** `demo/ui/` survives purely as the
   fossil of the shadcn import path. It confers a false ownership signal: a reader sees
   `../../../ui/popover` and reasonably believes the demo owns a Popover.
3. **Wrong channel.** glass-ui **publishes `./popover`**:
   ```
   $ node -p "JSON.stringify(require('@mkbabb/glass-ui/package.json').exports['./popover'])"
   {"types":"./dist/popover.d.ts","import":"./dist/popover.js"}
   ```
   The shim reaches the **root barrel** instead (`"." → dist/glass-ui.js`, 25 239 bytes, statically
   importing 43 sibling chunks:
   `grep -oE 'from *"\./[^"]+"' dist/glass-ui.js | sort -u | wc -l` → **43**).

Measured cost, honestly reported — it is **not** primarily a byte problem:

```
$ esbuild via-shim.js    --bundle --format=esm --minify … --outfile=out-shim.js      →  11.3 kb
$ esbuild via-subpath.js --bundle --format=esm --minify … --outfile=out-subpath.js   →  10.4 kb
```

**+969 bytes (+9.3 %)** minified. Tree-shaking does most of the work (glass-ui declares
`sideEffects: ["*.css"]`). The real cost is ownership and legibility, not weight — and it is
contradicted by this repo's own doctrine, stated three directories away in
`demo/palettes/browser/card/index.ts:2-3`: *"NAMED re-exports only (PI-6: never a star re-export —
SFC scoped `<style>` is a side-effecting import…)"*. The card cluster reasons carefully about barrel
side-effects; `demo/ui/` does the opposite by reflex.

The sharpest form of the finding: **`SwatchHoverMenu.vue` reaches the same package by two different
channels in 2 adjacent lines** —

```ts
:61  import { Popover, PopoverContent, PopoverTrigger } from "../../../ui/popover";   // shim → root barrel
:62  import { WatercolorDot } from "@mkbabb/glass-ui/watercolor-dot";                 // published subpath
```

**Proposed cure.** Delete `demo/ui/` wholesale (19 dirs, 19 alias files). Every consumer imports the
producer subpath directly: `import { Popover, PopoverContent, PopoverTrigger } from
"@mkbabb/glass-ui/popover"`. One channel, one home, no fossil. This is a mechanical codemod and it
makes edict 4 structurally true instead of aspirational.

---

### L-4 · MAJOR · Two parallel implementations of one floating menu — the god-composable relay

The component renders the same menu twice, by two different systems:

| | Touch path (`:8-25`) | Hover path (`:28-52`) |
|---|---|---|
| Positioning | reka-ui / floating-ui (`:side-offset="8"`) | `getBoundingClientRect()` + a `reactive({top,left})` (`useHoverPopover.ts:20-24`) |
| Surface | `PopoverContent` (producer) | `class="floating-panel"` — **dead** (L-1) |
| Layer | producer z-token | none (`z-index: auto`, measured) |
| Dismissal | producer (outside-click, Esc, scroll) | a 250 ms `setTimeout` (`useLeaveTimer.ts`) |
| A11y | producer roles/focus trap | `aria-hidden="true"` — deliberately excluded (`:45`) |
| Open state | `open` prop + `update:open` | `open` prop + `hover`/`leave`/`cancelLeave` |

The consequence is that the component's *public surface exists to relay the hand-rolled path*:
**7 props and 5 emits** for a 93-line leaf, of which `open`, `canHover`, `floatingStyle`, `hover`,
`leave`, `cancelLeave` and `update:open` are all pure plumbing for state the producer primitive
would own. That plumbing is then hand-carried through a second hop —
`PaletteCard.vue:139-157` passes 8 props and receives 8 emits from `PaletteCardSwatches`, which
declares 8 props and 8 emits (`PaletteCardSwatches.vue:75-95`) to forward them again.

And the state owner is instantiated **twice, independently**:

```
demo/palettes/browser/card/composables/useSwatchActions.ts:40  } = useHoverPopover();
demo/palettes/browser/card/PaletteCard/PaletteCard.vue:255     } = useHoverPopover();
```

Two live copies of the same hover-intent machine, wired by two different relay chains, feeding two
instances of the same leaf.

This was **already found and not fixed**. `docs/tranches/A/research/Ad-interactive-states.md:158-176`
(Ad-9) names it exactly — *"it doubles the maintenance surface and the touch/hover paths can drift"*
— and the applied remedy (`docs/tranches/A/audit/W4-states-b.md:78-100`) was to hoist the shared
Tailwind padding into `const PANEL_LAYOUT`. The *string* was deduplicated; the *architecture* was
explicitly preserved (*"The two paths are structurally preserved"*). L-1 is what the un-deduplicated
half then did when the producer moved.

`useHoverPopover.ts:8` still documents consumers that no longer exist: *"Used by PaletteDialog
(current swatches) and PaletteCard (expanded swatches)"* — `find demo -name 'PaletteDialog*' | wc -l`
→ **0**.

**Proposed cure — the collapse.** reka-ui (already a dependency, `^2.9`) ships `HoverCard` with
`:open-delay` / `:close-delay`, which is exactly the hover-intent timing the two-path fork was
justified by; glass-ui already publishes the popover family. One path:

```vue
<Popover>                     <!-- or HoverCard, from @mkbabb/glass-ui/popover -->
  <PopoverTrigger as-child><Swatch :color :label :ghost @click="…" /></PopoverTrigger>
  <PopoverContent class="w-auto p-1.5 flex items-center gap-1" :side-offset="8">
    <slot name="actions" />
  </PopoverContent>
</Popover>
<slot name="overlay" />
```

That deletes: the `<Teleport>` branch, `floating-panel`, `PANEL_LAYOUT`, `useHoverPopover.ts` (67
lines), `useLeaveTimer.ts` (17 lines), the `canHover` breakpoint query, and the `open` /
`floatingStyle` / `hover` / `leave` / `cancelLeave` / `update:open` plumbing at all three levels of
the relay. `SwatchHoverMenu` drops to ~35 lines with **2 props** (`color`, `ghost`) and **1 emit**
(`click`) plus two slots; `PaletteCardSwatches` sheds 5 props and 5 emits; `PaletteCard` sheds its
`useHoverPopover` call. Both paths become one, so neither can rot silently again.

---

### L-5 · MAJOR · The a11y fork is a boundary decision made in a leaf component

`SwatchHoverMenu.vue:38-45`:

```
<!-- W5-a11y: hover-only panel is keyboard-inaccessible — hidden from
     AT. The reka-ui Popover (touch path) is the accessible route. -->
… aria-hidden="true"
```

The component ships an action menu (Add / Edit / Copy / Remove — the only route to those verbs for a
saved colour) that is, **on the desktop hover path, unreachable by keyboard and hidden from assistive
technology by design**, and it documents this as acceptable because a *different code path* on a
*different input modality* is accessible. That is not a mitigation; it is a statement that the
desktop product has no accessible path to those actions. Combined with L-2 (the trigger is
`aria-hidden`, `tabIndex -1`), there is currently no keyboard route to the swatch menu **on either
path**.

A design system makes this decision once, in one primitive, for every consumer. Making it in a
93-line demo leaf is the ownership defect; the a11y outcome is its symptom. The L-4 collapse
dissolves it — one `Popover` is keyboard-operable by construction.

---

### L-6 · MAJOR · `tsconfig.demo.json` `paths` has drifted from `package.json#exports` — typecheck and runtime read different declaration files

The seat asks whether the demo consumes the published surface correctly. At the *specifier* level,
yes (0 `src/` reaches, measured above). At the *resolution* level, no.

`package.json#exports` — 7 keys, no root:
```
./color  ./value  ./css  ./easing  ./math  ./transform  ./quantize
```
`tsconfig.demo.json#paths` — 8 keys:
```
@mkbabb/value.js         @mkbabb/value.js/color    @mkbabb/value.js/parsing
@mkbabb/value.js/math    @mkbabb/value.js/easing   @mkbabb/value.js/units
@mkbabb/value.js/transform  @mkbabb/value.js/quantize
```

- Declared in `paths`, **absent from `exports`**: `.` (root), `/parsing`, `/units` → three dead path
  entries mapping specifiers no consumer could ever write.
- Present in `exports`, **absent from `paths`**: `/value`, `/css`.

`/css` has **10 live demo importers**. With no `paths` entry, `vue-tsc -p tsconfig.demo.json`
falls through to node resolution and reads the self-installed copy at
`node_modules/@mkbabb/value.js` (which exists — the repo installs itself). Vite does **not**: its
alias set is generated from `package.json#exports` (`vite.config.ts:41-50`), so at runtime `/css`
resolves to the local `dist/subpaths/css.js`. Two different files for one specifier — and **they
differ today**:

```
$ diff dist/subpaths/css.d.ts node_modules/@mkbabb/value.js/dist/subpaths/css.d.ts
3,4d2
< declare type Alpha_2 = number | "none";
39,40d36
< declare type Channel_2 = number | "none";
```

(`/value` and `/color` are byte-identical at this instant — the hazard is live for `/css` only right
now, but the *mechanism* covers both un-pathed keys and will bite whichever drifts next.)

The `vite.config.ts` alias set is generated *precisely so it can never drift from the exports map*
(`:28-29`, *"GENERATED (not hand-rolled) so the alias set can never drift"*). The TypeScript half was
left hand-rolled, so it drifted. **Proposed cure**: generate `tsconfig.demo.json`'s `paths` from
`package.json#exports` too — or delete `paths` for value.js entirely and let the self-install be the
single resolution channel for both tools. One generator, one map, both toolchains.

---

### L-7 · MINOR · `swatchExtraClass` is dead public surface

Declared `:75`, consumed `:19` and `:34`, and passed by **neither** consumer:

```
$ grep -rn "swatch-extra-class\|swatchExtraClass" demo/
demo/palettes/browser/card/SwatchHoverMenu.vue:19   (use)
demo/palettes/browser/card/SwatchHoverMenu.vue:34   (use)
demo/palettes/browser/card/SwatchHoverMenu.vue:75   (declaration)
```

An escape hatch nobody uses, on a component whose two consumers are both in the same directory
tree. Edict 3 (KISS, no contrivance). Delete it — and note that per-instance class injection is
what edict 5 (root-level styling) forbids anyway, so the hatch is one that should never be taken.

---

### L-8 · MINOR · One object, three type spellings, no owner

The floating-position object crosses three boundaries and is typed differently at each:

```
useHoverPopover.ts:17            reactive({ top: "0px", left: "0px" })   → { top: string; left: string }
PaletteCardSwatches.vue:82       floatingStyle: Record<string, string | number>
SwatchHoverMenu.vue:73           floatingStyle?: CSSProperties | undefined
```

Three names for one concept and no module owns it, so no compiler check binds producer to consumer —
`PaletteCardSwatches.vue:31` even spreads in an extra `transform: 'translateX(-50%)'` that the
`{top,left}` producer knows nothing about. The L-4 collapse deletes the object entirely; if any
positioned surface survives, its type must live with its producer.

---

### L-9 · MINOR · Ambiguous home: outside the cluster barrel, reached from two levels

`card/index.ts` is documented as *"palette-browser · card cluster — hardened public surface (T.W1
F7)"* and exports 6 components. `SwatchHoverMenu` is not one of them, yet is imported from two
different depths by relative reach around the barrel:

```
demo/palettes/browser/card/CurrentPaletteEditor.vue:192        import … from "./SwatchHoverMenu.vue";
demo/palettes/browser/card/PaletteCard/PaletteCardSwatches.vue:73  import … from "../SwatchHoverMenu.vue";
```

The second edge climbs out of the `PaletteCard/` sub-cluster to a file sitting beside
`PaletteCard/`'s *parent-level* siblings. Either the file is cluster-internal (then it belongs in a
shared child dir, not at the level of the barrel's own exports), or it is cluster-public (then the
barrel must name it). Today it is neither, and "hardened public surface" is a claim the tree does
not honour.

---

### L-10 · MINOR · A design contract encoded as a JavaScript string of utilities

```ts
:64-66  /** Shared panel layout — applied to both PopoverContent and the hover Teleport
         *  panel so the two paths cannot drift. */
        const PANEL_LAYOUT = "p-1.5 flex items-center gap-1";
```

This is the Ad-9 remedy (L-4) and it is honest about what it is: a splint for a fork that should not
exist. It also inverts edict 5 — the padding of a popover surface is the *producer's* root-level
concern; a consumer const that both paths must remember to spell is per-instance override with
extra ceremony. When the fork collapses, the const goes with it and the padding moves to
`PopoverContent`'s own definition in glass-ui.

---

### L-11 · INFO · An animation was deleted by migration, not moved or tokenized

`@keyframes floating-panel-in` (`opacity`/`blur`/`scale`, `var(--duration-fast)
var(--ease-decelerate)`) was removed with `floating-panel.css` at `c84504d3`; `demo/styles/
animations.css:1-3` records the assumption that glass-ui now supplies it. Measured live:
`"animationName": "none"`. Edict 6 says animations are never deleted, only moved or tokenized — this
one was deleted by a migration that assumed a destination it never verified. The L-4 collapse
inherits `PopoverContent`'s producer-owned entrance, which is the correct "moved" outcome.

---

### L-12 · INFO · The visual audit matrix never rendered this component

All four Safari matrices captured `/#/browse` in a state where no swatch exists —
`docs/tranches/V/megatranche/audit/visual/shots/safari-desktop-light/browse.png` shows *"The commons
is unreachable / Failed to load palettes"* on the left pane and *"No saved palettes yet"* on the
right. `REPORT.md:121` records `smallTapTargets: 4` for that route — the search and menu buttons,
not swatches. **No capture in the 60-shot matrix contains a `SwatchHoverMenu`**, so the matrix's
silence about this component is absence of evidence, not evidence of absence, and L-1/L-2 slipped
past it for that reason. The same shot does, however, visually confirm L-2's slot-drop: the
"Start a new palette" add-slot is a bare dashed blob with no `+` glyph.

Any future matrix run must seed a saved palette *and* expand a card, or this component stays
invisible to the visual gate.

---

## Greenfield module lattice

Structuring this today with no legacy, the lattice has four layers and each concept has exactly one
home:

```
@mkbabb/glass-ui                     ← the design system; owns every seat, surface and overlay
  /watercolor-dot   WatercolorDot    — the FACE. aria-hidden, pointer-inert. (already correct)
  /swatch           Swatch           — NEW. the SEAT: <button>, typed `label`, focus ring,
                                       press state, real fall-through; renders WatercolorDot
                                       as its face. `variant: solid | ghost`.
  /popover          Popover /        — the OVERLAY: surface, elevation, layer, positioning,
                    PopoverContent     dismissal, focus, roles. openDelay/closeDelay for
                                       hover-intent. Padding lives HERE.

demo/palettes/browser/card/
  SwatchMenu.vue                     — ~35 lines. props { color, ghost? }, emit { click },
                                       slots #actions, #overlay. ONE path. No open/canHover/
                                       floatingStyle/hover/leave/cancelLeave/update:open.
  PaletteCardSwatches.vue            — 3 props (colors, isLocal, displaySlug), 3 action emits.
  PaletteCard/PaletteCard.vue        — no useHoverPopover; card state only.
  composables/useSwatchActions.ts    — palette-domain verbs only (add/edit/copy/remove/keys).

DELETED: demo/ui/**            (19 alias dirs)
         useHoverPopover.ts    (67 lines)  useLeaveTimer.ts (17 lines)
         PANEL_LAYOUT, .floating-panel, the <Teleport> branch, swatchExtraClass
```

Four deliberate transpositions:

1. **Overlay behaviour is producer-owned, always.** Surface + layer + position + dismissal + focus
   are one concept; splitting them across a reka component and a demo `setTimeout` guarantees the
   halves drift (they did — L-1).
2. **The seat is a first-class primitive.** `Swatch` in glass-ui makes the paint/control distinction
   explicit and *typed*, which converts L-2's silent breakage into a compile error. This is the
   only cure that survives the next producer major.
3. **No alias layer.** Consumers name the producer directly. `demo/ui/` deleted; the import path
   itself then tells the truth about ownership.
4. **State lives with its owner, not in a relay.** With the producer owning open/close, the 8-prop /
   8-emit chain through `PaletteCard → PaletteCardSwatches → SwatchHoverMenu` collapses to a colour
   and three verbs — and the double `useHoverPopover()` instantiation stops existing.

---

## Where this seat is NOT the right home

- **The `positionPanel` `currentTarget` question.** During probing, `useHoverPopover.ts:18` threw
  `TypeError: Cannot read properties of null (reading 'getBoundingClientRect')` inside `nextTick`.
  I then tested it properly with a **real** mouse hover and an instrumented listener:
  `{ sync: "relative", micro: "relative" }` — `e.currentTarget` **is** still readable in the
  microtask for a trusted event. The throw reproduces only for `dispatchEvent`-synthesized events
  (which is what the two console entries in
  `.playwright-mcp/console-2026-07-29T04-47-38-341Z.log` are — my own probe, not a user path).
  **Not a defect. Recorded here so no later seat mistakes my probe noise for a finding.** It does
  mean the composable is brittle to programmatic dispatch, incl. some test harnesses — a robustness
  note for Challenge-C, not a claim.
- Icon-button `aria-label` template literals (`REPORT`-family `RAW-ARIA` rows at
  `om-14-formatting/FORMAT-AUDIT.md:119-120`) — formatting seat.
- Mounted-instance cost at high colour counts (`om-16` S4) — scalability seat. Note only that L-4's
  collapse removes one `Popover` + one `useLeaveTimer` per swatch, which helps that seat too.

---

## Summary table

| ID | Sev | Defect | Family |
|----|-----|--------|--------|
| L-1 | BLOCKER | `.floating-panel` — 0 rules in 42 sheets; panel `position: static`, transparent, renders 1440×40 at y=900, 593 px below anchor | untyped producer contract (CSS class) |
| L-2 | BLOCKER | `WatercolorDot` `tag`/`aria-label`/`@click` silently discarded (`inheritAttrs:!1`, no `tag` prop, no slot); swatch is an `aria-hidden`, `pointer-events:none` span | untyped producer contract (attr fall-through) |
| L-3 | MAJOR | `demo/ui/popover` alias shim → root barrel (43 chunks) while the same file uses a subpath; 19 such dirs; +969 B measured | dual path / alias layer |
| L-4 | MAJOR | Two parallel floating-menu implementations; 7 props + 5 emits of relay; `useHoverPopover` instantiated twice | dual path / god relay |
| L-5 | MAJOR | Hover path `aria-hidden` by design; with L-2, no keyboard route on either path | boundary decision in a leaf |
| L-6 | MAJOR | `tsconfig.demo.json#paths` ↔ `package.json#exports` drift; `/css` typechecks against a different `.d.ts` than it bundles (diff pasted) | published-surface drift |
| L-7 | MINOR | `swatchExtraClass` dead prop | dead surface |
| L-8 | MINOR | `floatingStyle` typed three ways across one hop, no owner | ownership duplication |
| L-9 | MINOR | Outside `card/index.ts` yet reached from two depths | ambiguous home |
| L-10 | MINOR | `PANEL_LAYOUT` — design contract as a JS utility string | producer concern in consumer |
| L-11 | INFO | `floating-panel-in` keyframe deleted by migration | animation deleted, not moved |
| L-12 | INFO | No visual-audit capture ever rendered this component | gate blind spot |
