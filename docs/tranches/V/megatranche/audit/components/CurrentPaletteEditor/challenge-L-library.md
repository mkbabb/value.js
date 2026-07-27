# CHALLENGE-L — library structure under `CurrentPaletteEditor.vue`

## Model receipt

I observe myself to be **Opus 5** (`claude-opus-5[1m]`, 1M-context variant) — the model this seat was
explicitly spawned with. Declared, not inherited.

## Seat, subject, substrate

| | |
|---|---|
| Axis | CHALLENGE-L — library structure: module boundaries, ownership, dependency direction, public surface |
| Subject | `demo/palettes/browser/card/CurrentPaletteEditor.vue` (312 lines, area `palettes`) |
| Repo | `/Users/mkbabb/Programming/value.js`, branch `tranche-u` |
| HEAD **as observed** | `041ca263d0e8711388ec52dc50b0f2005bbc9646` — *the task brief said `c654824e`; the tree has moved 1 commit ahead (`docs(V·megatranche): fold Phase D`). All evidence below is against `041ca263`.* |
| Producer | `@mkbabb/glass-ui@7.0.0` (`node_modules/@mkbabb/glass-ui`), sibling source at `/Users/mkbabb/Programming/glass-ui` |
| Live substrate | dev server `http://localhost:9000` (HTTP 200), probed read-only with Playwright |

**Verdict: DEFECTIVE.** Eleven findings, two of them BLOCKER. The strongest is not a smell — it is a
**dead primary CTA with a red e2e guard**, and the library boundary that was supposed to catch it is
provably green.

---

## The one-paragraph gestalt

This component's structural failure is a single mechanism wearing eleven masks: **the demo declares
contracts against the design system that nothing verifies.** It mounts a glass-ui primitive through
an API glass-ui deleted; it wears a CSS atom glass-ui never shipped; it reaches its own feature
siblings through a barrel law that lints to `undefined`; and it re-declares, as a 4-prop/8-emit
interface, state that is already sitting in two injection keys its own parent already injects. Every
one of these is invisible to `vue-tsc` (exit 0, measured), invisible to `eslint`
(`no-restricted-imports = undefined` for this file, measured), and — in the one place a test *does*
exist — the test is simply **red at HEAD and nobody looked** (measured, pasted below). The boundary
between `demo/` and `@mkbabb/glass-ui` is not a trust boundary. It is a wish.

---

## L-1 · BLOCKER — the "Add current color" CTA is dead; glass-ui 7 deleted the API it is written against

`CurrentPaletteEditor.vue:95-105` mounts the primary action of the component:

```vue
<WatercolorDot
    :color="cssColorOpaque"
    variant="ghost"
    tag="button"                                    <!-- ← prop -->
    seed="add-current-slot"
    class="add-slot-ghost btn-interactive w-11 h-11 …"
    :aria-label="`Add current color ${cssColorOpaque} to palette`"   <!-- ← attr -->
    @click="addCurrentColor"                        <!-- ← listener -->
>
    <Plus class="w-5 h-5 text-primary/60 pointer-events-none" aria-hidden="true" />  <!-- ← default slot -->
</WatercolorDot>
```

Four separate contracts: a `tag` prop, a fallthrough `aria-label`, a `click` listener, a default
slot. **glass-ui 7.0.0 honours none of them.**

### The producer removed them, deliberately, in one commit

`/Users/mkbabb/Programming/glass-ui`, commit `490cc46e` *(Thu Jul 16 2026, "feat(BI): land the Glass 7
component, motion, material, and public-surface cut")*, on `src/components/watercolor-dot/WatercolorDot.vue`:

```
-        /** Host tag — `div` (decorative) or `button` (interactive). */
-        tag?: "div" | "button";
-        tag: "div",
-    <component
-        :is="tag"
-        :type="tag === 'button' ? 'button' : undefined"
-        <slot />
-    </component>
+    <span
+       aria-hidden="true"
+                pointerEvents: 'none',
+    </span>
```

The polymorphic host, the `button` type, and the `<slot/>` were **deleted** and replaced with a hard
`<span aria-hidden="true">` carrying inline `pointer-events: none`. The shipped surface confirms it —
`node_modules/@mkbabb/glass-ui/dist/components/watercolor-dot/WatercolorDot.vue.d.ts` declares exactly
six props: `color`, `variant`, `animate`, `cycleDuration`, `range`, `seed`. No `tag`.

And the shipped runtime (`dist/watercolor-dot.js`) sets **`inheritAttrs: !1`**, forwarding only
`attrs.class` and `attrs.style`:

```js
inheritAttrs: !1,
__name: "WatercolorDot",
props: { color:{}, variant:{default:"solid"}, animate:{…}, cycleDuration:{…}, range:{…}, seed:{default:""} },
setup(e){ let t=e, n=h(), c=i(()=>n.class), f=i(()=>n.style), …
  return (t,n)=>(d(),o("span",{ "aria-hidden":"true", class:l([c.value,"watercolor-swatch",…]),
    style:u([f.value,{ …, pointerEvents:"none", … }]) }, [ …svg filter…,
    e.variant==="ghost"?…ghost stroke…:a("",!0) ], 14, C));
```

`inheritAttrs: false` + no `v-bind="$attrs"` means **the `click` listener is never attached** — in
Vue, listeners are attrs. There is no `<slot/>` in the render, so **`<Plus>` is never rendered**.

### Measured at runtime (Playwright, `http://localhost:9000/#/palettes`)

```
document.querySelector('.add-slot-ghost') →
{
  tagName: "SPAN",
  attrs: {
    "aria-hidden": "true",
    class: "add-slot-ghost btn-interactive w-11 h-11 … watercolor-swatch",
    "data-variant": "ghost",
    style: "…; pointer-events: none; …"
  },
  tabIndex: -1,
  isFocusable: false,
  role: null,
  matchesButtonSelector: false,           // 'button, [role=button], a[href], input, …'
  childTags: ["svg.watercolor-filter-host", "SPAN.watercolor-ghost-stroke"]   // ← no <Plus>
}
```

`aria-label` — **gone**. `tag` — **gone**. Role — **null**. Children — **glass-ui's own two nodes
only**. And `elementFromPoint` at the element's exact centre returns a plain `DIV`, not the ghost:
`pointer-events:none` means no pointer event ever reaches it.

### Reproduction (real mouse click, real dev server)

```js
const before = swatchCount();                        // 6
const box = await page.locator('.add-slot-ghost').boundingBox();
await page.mouse.click(box.x + box.width/2, box.y + box.height/2);
await page.waitForTimeout(600);
const after = swatchCount();                         // 6
```
```json
{"before":6,"after":6,"changed":false,
 "wellText":"Current Palette\n5 colors\ndev misconfigured — run `npm run dev`",
 "box":{"x":1057.5,"y":349.18,"width":48,"height":48}}
```

**The primary action of the component does nothing.** A user cannot add a colour to their palette
from this editor by clicking the add slot.

### The e2e guard for exactly this flow is RED at HEAD

`e2e/smoke/flows/palette-save.spec.ts:35` targets it by the very accessible name that was dropped:

```js
await main.getByRole("button", { name: /Add current color .* to palette/ })
          .filter({ visible: true })
          .click();
```

```
$ npx playwright test e2e/smoke/flows/palette-save.spec.ts --project=smoke --reporter=line

  1) [smoke] › e2e/smoke/flows/palette-save.spec.ts:20:1 › save current palette persists to localStorage 'color-palettes'
    Test timeout of 30000ms exceeded.
    Error: locator.click: Test timeout of 30000ms exceeded.
    Call log:
      - waiting for getByRole('main', …).getByRole('button', { name: /Add current color .* to palette/ }).filter({ visible: true })
  1 failed
```

The flagship "save a palette" user flow is broken and its guard has been failing since the Glass 7
adoption. Memory records W44 as *"Glass 7.0.0 ADOPTED WHOLE (D58, GREEN-WITH-RESIDUALS)"* — this is
one of the residuals, and it is not cosmetic.

### Blast radius beyond the add slot

The same broken contract is in `SwatchHoverMenu.vue:14-21` and `:27-33` — `tag="button"`,
`:aria-label`, and `@click.stop="$emit('click')"` on `WatercolorDot`. Live DOM for every swatch in
the current-palette row:

```json
{"tag":"SPAN","attrs":{"aria-hidden":"true","class":"w-11 h-11 … cursor-pointer watercolor-swatch",
 "data-variant":"solid","style":"background-color: rgb(228,87,46); …; pointer-events: none; …"},
 "pe":"none","parentTag":"DIV","parentClass":"relative"}
```

Consequences, all live:
- Every colour swatch in the current palette is **`aria-hidden="true"`** — invisible to assistive tech.
- The hover-path `@click` (which drives `onCurrentSwatchClick`) is **never attached**.
- The touch path wraps `WatercolorDot` in `<PopoverTrigger as-child>`; reka-ui delivers the trigger's
  `id` / `aria-expanded` / `data-state` / click handler as fallthrough attrs — **all dropped**. The
  live DOM carries none of them. The touch popover trigger is dead.
- Only `@pointerenter`/`@pointerleave` still work, because those sit on the wrapper `div.relative`
  (`SwatchHoverMenu.vue:2-6`) — which is why the component *looks* alive on a hover-capable desktop.

A sibling seat reached the same producer defect independently from the PaletteCard side
(`docs/tranches/V/megatranche/audit/components/PaletteCard/challenge-L-library.md`, L-17). This report
adds the three facts that seat did not have: the **slot is dropped too**, the **listener is dropped
too**, and the **e2e guard is already red**.

### Cure (transposition, not patch)

Do **not** re-add `tag` to glass-ui — the producer was right to make `WatercolorDot` a pure decoration
(`aria-hidden` + `pointer-events:none` is a correct declaration of "I am paint, not a control").
Invert the containment instead:

```vue
<button type="button" class="swatch-btn" :aria-label="…" @click="…">
    <WatercolorDot :color="color" variant="ghost" :seed="…" class="…" />
    <Plus class="…" aria-hidden="true" />
</button>
```

The control is the demo's `<button>`; the dot is its paint. But note the pattern recurs in
`SwatchHoverMenu`, `PaletteCardSwatches`, `MiniColorPicker`, and the add slot — four sites building
"interactive watercolor swatch + its popover" by hand. That is a **glass-ui component**, not four
demo assemblies: `@mkbabb/glass-ui/swatch` exporting a `Swatch` (real `<button>`, real
`aria-label`, real focus ring, the dot inside) and a `SwatchMenu`. Unique semantic ownership: the
design system owns "an interactive colour swatch," because it already owns the shape.

---

## L-2 · BLOCKER — the `.d.ts` trust boundary is a false proof; the typecheck is green while L-1 is live

`tsconfig.demo.json`'s header argues at length that dist-resolution buys a real boundary:

> "Dist-resolution gives a real `.d.ts` trust boundary: glass-ui's declaration files are skip-checked
> (`skipLibCheck`) … the demo typecheck sees ZERO foreign errors and needs no error-scoping filter."

Measured, at HEAD, with L-1 fully live:

```
$ timeout 420 npx vue-tsc -p tsconfig.demo.json --noEmit > tc.txt 2>&1; echo "EXIT=$?"; wc -l < tc.txt
EXIT=0
       0
```

**Zero diagnostics.** The `.d.ts` boundary catches nothing at a component seam, and it structurally
cannot: Vue's generated component types accept arbitrary extra attributes as fallthrough attrs, so
`tag="button"` on a component with no `tag` prop is *legal TypeScript*. The producer knows this trap
by name — glass-ui commit `f04f05d8`'s own message says the migrated tests *"passed only because Vue
drops unknown props (the stale-binding no-op trap)"*. The consumer is still living in it.

So the demo's proof stack at the glass-ui seam is:
- `vue-tsc` — **green, blind** (measured above).
- `eslint` — **absent** (see L-6: `no-restricted-imports = undefined` for this file).
- unit tests — **none** touching this component (`grep -rln "add-slot\|Add current color\|CurrentPaletteEditor" test/ demo/test/` → 0 hits).
- e2e — **red and unread** (L-1).

**Cure.** Two moves, both cheap:
1. Make the seam *nominal*, not structural: glass-ui exports a `defineProps`-typed wrapper or the
   demo declares `import type { WatercolorDotProps }` and spreads a checked object — either way an
   unknown key becomes an excess-property error, which TS *does* report.
2. Ship the producer-side contract test glass-ui already writes for other families
   (`labeled-field.contract.test.ts` is cited as precedent in `f04f05d8`) for `WatercolorDot`, and
   let value.js run its consumer smoke against the *published* surface.

---

## L-3 · MAJOR — ownership inversion: a decorative primitive mounted as an interactive control

The mechanism behind L-1, stated as structure rather than as a bug: `WatercolorDot` **declares itself
decoration** — `aria-hidden="true"` and `pointer-events:none` are hard-coded in its render, not
options. The demo mounts it as its primary control anyway. That is not a version-skew accident; it is
a boundary the demo never respected, and the Glass 7 cut merely stopped papering over it.

Evidence that the demo *knows* the primitive is decoration and reaches around it anyway: it hangs its
own `.add-slot-ghost { display:inline-flex; align-items:center; justify-content:center }` rule
(`CurrentPaletteEditor.vue:286-290`) purely to centre a slot child the component has no slot for. Nine
lines of scoped CSS whose entire job is to lay out a node that is never rendered.

The correct lattice is stated in L-1's cure. Recording it separately because the *rule* generalises:
**a primitive that sets `aria-hidden` or `pointer-events:none` on its own root is a paint, and a paint
may never be a consumer's interactive host.**

---

## L-4 · MAJOR — `demo/ui/` is a 19-module pure-alias layer, and 18 of 19 route through the root barrel

`CurrentPaletteEditor.vue:174-181`:

```ts
import { Input }  from "../../../ui/input";
import { Button } from "../../../ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../../../ui/tooltip";
```

Every one of those modules is a single re-export line:

```
demo/ui/button/index.ts   →  export { Button } from "@mkbabb/glass-ui";
demo/ui/tooltip/index.ts  →  export { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@mkbabb/glass-ui";
demo/ui/input/index.ts    →  export { Input } from "@mkbabb/glass-ui/forms";
```

All 19 directories under `demo/ui/` are the same shape — `alert · avatar · badge · button · card ·
checkbox · collapsible · dialog · dropdown-menu · input · label · popover · radio-group · select ·
separator · skeleton · slider · switch · tooltip`, zero logic between them. This is exactly the
"aliases / dual paths / back-compat shims" the standing edicts forbid, and exactly the
"glass-ui is the design system — consume it, do not wrap it" edict. `demo/ui/alert/index.ts` even
carries the tombstone of its own conversion ("This barrel previously held a local shadcn-vue
re-implementation … B.W2 converted it to a re-export"). The conversion stopped one step short: having
proved the wrapper had no content, it kept the wrapper.

**Measured cost.** Eighteen of the nineteen barrels import from the **root** `@mkbabb/glass-ui`
specifier even though glass-ui 7 ships a granular subpath for nearly all of them
(`./button ./badge ./card ./collapsible ./dialog ./dropdown-menu ./label ./popover ./select
./separator ./slider ./switch ./tooltip` all exist). Reachable ESM graph from each entry in
`node_modules/@mkbabb/glass-ui/dist` (transitive relative-import walk):

| entry | modules | KB |
|---|---:|---:|
| `glass-ui.js` (root barrel) | **66** | **218.9** |
| `button.js` | 11 | 16.8 |
| `tooltip.js` | 5 | 8.5 |
| `forms.js` | 9 | 19.5 |
| `dom.js` | 8 | 12.3 |
| `watercolor-dot.js` | 6 | 9.3 |

Root barrel = **6×** the modules and **13×** the bytes of `./button`. Rolldown tree-shakes the
production build, but the dev graph pays it on every cold start and every HMR invalidation, and
glass-ui declares `sideEffects: ["*.css"]` — a CSS-side-effect package is exactly the case where
barrel reach is not free.

**Four idioms for one design system, in this component's own tree:**

| site | idiom |
|---|---|
| `CurrentPaletteEditor.vue:191` | `@mkbabb/glass-ui/watercolor-dot` — direct subpath ✅ |
| `CurrentPaletteEditor.vue:174` | `../../../ui/input` → `@mkbabb/glass-ui/forms` — aliased subpath |
| `CurrentPaletteEditor.vue:175,176` | `../../../ui/{button,tooltip}` → `@mkbabb/glass-ui` — aliased **root** |
| `composables/useSwatchActions.ts:5` | `import { writeClipboard } from "@mkbabb/glass-ui"` — direct **root**, for one function that lives at `./dom` |
| parent `PalettesPane.vue:148,149` | `@mkbabb/glass-ui/dialog`, `/search` — direct subpath ✅ |

`writeClipboard` alone is imported from the root barrel at **26 demo sites**
(`grep -rn "writeClipboard" demo/`), every one of which pulls the 66-module graph for a function that
sits in the 8-module `./dom`.

**Cure.** Delete `demo/ui/` entirely (19 files, 0 lines of logic) and rewrite the ~200 consumer imports
to the granular glass-ui subpath. It is a mechanical codemod, it removes an entire directory from the
demo's module lattice, and it makes the design-system dependency *legible at every call site* — which
is the whole point of edict 4.

---

## L-5 · MAJOR — `btn-interactive` is a phantom class; the animation it replaced was deleted, not moved

`CurrentPaletteEditor.vue:68-74` documents a refactor that retired per-site hover/press transitions
onto a shared producer atom:

> "T.W5-R5 (T-14 / D7): the per-site spatial strays (`transition-all` + `hover:scale-110`/
> `active:scale-95` on the dead 150ms bare-utility default — F3) retire onto the producer's
> **`btn-interactive`** atom: the scale leg rides `--transition-liquid-spatial` @
> `--spring-smooth-duration` (inherited, never re-implemented), press/hover magnitudes + the house
> focus register come with it."

**`btn-interactive` does not exist.** Static search:

```
$ grep -rl "btn-interactive" node_modules/@mkbabb/glass-ui/     → (no output)
$ grep -rn "btn-interactive" demo/ --include='*.css'            → (no output)
$ grep -rl "btn-interactive" node_modules/@mkbabb/keyframes.js/ → (no output)
```

Runtime proof against the live app (all 49 stylesheets walked, **0 blocked** by CORS):

```json
{"sheetCount":49,"rulesScanned":5337,"blockedSheets":0,
 "btnInteractiveRules":[],            // ← ZERO rules define it
 "dashedWellRuleCount":1,             // ← control: a class that IS defined
 "elementFound":true,"elementClass":"send-btn btn-interactive",
 "computed":{"transition":"all / 0s","transform":"matrix(1,0,0,1,0,-12)"}}
```

Three sites in this component wear it — `add-slot-ghost btn-interactive` (line 100), the Save-edit
button (line 75), the Cancel-edit button (line 78) — plus two more in
`demo/shell/dock/ColorInput.vue:69,78`. Five live template sites, zero declarations, `transition:
all / 0s` on the element that carries it.

This is a **standing-edict-6 violation**: the working `hover:scale-110`/`active:scale-95` legs were
**deleted**, and what replaced them is nothing. The `.dashed-well` comment three files over
(`demo/styles/utils.css:86`) names this exact failure mode by its old case number — *"Both sites used
`.dashed-well` as a never-defined phantom (inv-N-7); this mints the intended affordance"* — so the
project has cured a phantom-utility once and grown a new one.

**Cure.** The atom is a *design-system* concern (press/hover magnitudes + the house focus register are
glass-ui's vocabulary): ship `btn-interactive` in glass-ui's `@utility` layer, where the comment
already claims it lives. If glass-ui declines, it is a `demo/styles/utils.css` recipe beside
`.dashed-well`. What it must not remain is a string.

---

## L-6 · MAJOR — the barrel-seam boundary law lints to `undefined`; the "standing" enforcement is dead config

`demo/palettes/browser/index.ts` states the invariant as enforced:

> "External consumers reach the feature through THIS seam (or a sub-barrel it re-exports), never a raw
> internal `.vue` file — the **G-DEMO-3b boundary (eslint.config.js) enforces it standing.**"

`CurrentPaletteEditor.vue:193` reaches a sibling sub-feature's raw internal file:

```ts
import ApiOfflineChip from "../status/ApiOfflineChip.vue";
```

…bypassing `demo/palettes/browser/status/index.ts`, which exists for exactly this and whose own
comment concedes the bypass: *"ApiOfflineChip's live consumer is CurrentPaletteEditor (internal,
direct relative import)."* A barrel with zero consumers reaching through it is not a seam.

It lints clean because **the rule is dead**:

```
$ npx eslint --print-config demo/palettes/browser/card/CurrentPaletteEditor.vue | jq .rules['no-restricted-imports']
no-restricted-imports = undefined

$ npx eslint --print-config demo/palettes/BrowsePane.vue   → undefined
$ npx eslint --print-config demo/color-picker/App.vue      → [2,{"patterns":[{"group":["@components/custom/palette-browser/**/*.vue"],…}]}]
$ npx eslint --print-config src/color/index.ts             → [2,{"patterns":[{"group":["@mkbabb/glass-ui","@mkbabb/glass-ui/*"],…}]}]   (inv-K-1 — alive and correct)
```

Two independent ways the three demo boundary rules (G-DEMO-1, G-DEMO-3a, G-DEMO-3b) are no-ops:

1. **Their file globs match nothing.** They glob `demo/@/components/**`, `demo/@/lib/**`,
   `demo/@/composables/**`. `ls -d demo/@` → *No such file or directory*. W43/RF-15 moved the feature
   trees to their physical homes (`vite.config.ts` says so in its own alias comment) and the eslint
   config was never followed.
2. **Their banned pattern matches nothing.** All three ban `@components/custom/palette-browser/**/*.vue`.
   `grep -rn '"@components' demo/ --include='*.ts' --include='*.vue' | wc -l` → **0**. The `@components`
   alias was killed at W43 too.

So the *entire* `demo/palettes/` tree — the mega-feature the rule names — has no import governance at
all, and the one file that still receives the rule (`demo/color-picker/App.vue`) receives a pattern
that can never fire. Note the config's own comment about flat-config last-match-wins is correct and
careful; the care was spent on a rule aimed at a directory that no longer exists.

This is dead config = legacy code (edict 2), and it is *why* L-1 through L-4 could accumulate.

**Cure.** Re-point the globs at the live tree and make the ban structural against real specifiers:

```js
{ files: ["demo/**/*.{ts,vue}"],
  rules: { "no-restricted-imports": ["error", { patterns: [
    { group: ["**/palettes/browser/*/*.vue", "**/palettes/browser/*/*/*.vue"],
      message: "G-DEMO-3b: reach a palette-browser sub-feature through its barrel, never a raw .vue." },
    { group: ["**/ui/*"],           message: "L-4: import glass-ui directly; demo/ui is an alias layer." },
    { group: ["@mkbabb/glass-ui"],  message: "L-4: use the granular subpath (./button, ./dom, …), not the root barrel." },
  ]}]}}
```

That third pattern would have failed the build on `useSwatchActions.ts:5` and on 25 other sites, and
the second would have failed this component's three `../../../ui/*` imports.

---

## L-7 · MAJOR — wrong direction of dependency: 12 declared seams for state already available by injection

The component declares **4 props + 8 emits** (`CurrentPaletteEditor.vue:196-213`). Every one of the
four props, and six of the eight emits, is a re-declaration of something the app already provides.

**`cssColorOpaque`** — `PalettesPane.vue:163` does `const cssColorOpaque = inject(CSS_COLOR_KEY)!`,
then re-drills it as a prop at `:43`. The child *already injects from the same module*:
`CurrentPaletteEditor.vue:215` `inject(SAFE_ACCENT_KEY)!` from `../../../color-session/keys` — the file
that also exports `CSS_COLOR_KEY`. And its own composable injects a third key from that module
(`useSwatchActions.ts:4` `EDIT_TARGET_KEY`). So the component uses **inject** for two facets of the
colour session and **prop-drill** for a third, from one keys module. Two homes, one concept. The
project's own memory records the intended rule: *"`cssColorOpaque` injected via `CSS_COLOR_KEY` (not
prop-drilled)"*. Nine other sites obey it (`GradientPane:8`, `MixPane:15`, `GeneratePane:10`,
`ColorNutritionLabel:188`, `Dock:34`, `BrowsePane:201`, `AdminPane:94`, `ExtractWorkbench:218`,
`PalettesPane:163`). This component is the exception.

**`savedColorStrings`** — lives in `demo/color-session/useColorPipeline.ts:166`, is returned at `:304`,
and is read **by injection** elsewhere: `demo/picker/visual/HeroBlob.vue:56`
`const { cssColorOpaque, cssColorOpaqueFrame, savedColorStrings } = inject(COLOR_MODEL_KEY)!`. It also
travels as a dep through `usePalettePorts.ts:36,47,94` and `usePaletteActions.ts:13`. Four live access
paths to one `computed`; this component takes the longest one (App → usePaneRouter → PalettesPane → here).

**`savedPalettes` + `savedPaletteCount`** — both are already on `LIBRARY_PORT_KEY`, which
`PalettesPane.vue:164` injects as `pm` and then reads back out to fill the props
(`:44` `pm.savedPalettes.value.length`, `:45` `pm.savedPalettes.value`).

**Six of eight emits are 1:1 relays** (`PalettesPane.vue:46-53`):

```
@apply         → colorTarget.emitApply(colors)
@add-color     → colorTarget.emitAddColor(css)
@start-edit    → colorTarget.emitStartEdit(target)
@saved         → pm.onCurrentPaletteSaved(name, colors)
@updated       → pm.onCurrentPaletteUpdated(id, colors)
@clear-current → colorTarget.emitApply([])
```

`COLOR_TARGET_PORT_KEY` exposes exactly `{emitApply, emitAddColor, emitStartEdit, emitSetCurrentColor,
commitColorEdit}` (`usePalettePorts.ts:235-240`); `LIBRARY_PORT_KEY` exposes exactly
`{savedPalettes, createPalette, onCurrentPaletteSaved, onCurrentPaletteUpdated, …}` (`:140-155`). The
ports were built for this. The component reaches none of them, and instead
`useSwatchActions.ts:13-17` **hand-writes a structural re-typing of `colorTargetPort`**:

```ts
emit: {
    (e: "apply", colors: string[]): void;
    (e: "addColor", css: string): void;
    (e: "startEdit", target: { paletteId: string; colorIndex: number; originalCss: string }): void;
};
```

A second declaration of a port that already has a type. When `emitStartEdit`'s shape changes, two
files must change and only one will fail to compile.

**Cure.** Inject, don't drill. `useSwatchActions` takes `inject(COLOR_TARGET_PORT_KEY)` directly (it
already injects `EDIT_TARGET_KEY` two lines up), the component injects `CSS_COLOR_KEY` and
`LIBRARY_PORT_KEY`, and the whole 4-prop/8-emit surface collapses to **zero props and two emits**
(`commitEdit`/`cancelEdit`, which genuinely travel two levels up to App). `PalettesPane.vue:41-54` —
fourteen lines of relay — becomes `<CurrentPaletteEditor @commit-edit="…" @cancel-edit="…" />`.

---

## L-8 · MAJOR — the palette-name collision rule has two homes, and they disagree

`CurrentPaletteEditor.vue:247-259`:

```ts
function saveCurrentPalette() {
    …
    const existing = savedPalettes.find(
        (p) => p.name.toLowerCase() === name.toLowerCase(),
    );
    if (existing) { duplicateTarget.value = existing; return; }
```

`demo/palettes/usePaletteStore.ts:66-74` — the store's own version of the same rule:

```ts
function createPalette(name: string, colors: PaletteColor[]): Palette {
    const existing = store.value.palettes.find(
        (p) => p.isLocal &&
               p.name.toLowerCase() === name.toLowerCase() &&
               colorsMatch(p.colors, colors),
    );
```

Two implementations, **three semantic divergences**: the store filters `isLocal`, the component does
not; the store also requires `colorsMatch`, the component does not; the store's resolution is
"move-to-front and reuse", the component's is "prompt the user to Update". A name that collides on
the component's rule but not the store's produces a confirm-dialog for a palette the store would
happily have created fresh.

And the cost of hosting the rule here is the `savedPalettes: Palette[]` prop — **the entire palette
array is drilled into a swatch editor for the sole purpose of running one `.find()`**. `Palette` is a
23-field type (`demo/palettes/types.ts`) carrying visibility, tier, votes, atomSetHash, version
history. None of it is used by this component except `.name` and `.id`.

**Cure.** The store owns identity. `usePaletteStore` grows `findByName(name): Palette | undefined`
(or `createPalette` returns a discriminated `{ ok } | { collision: Palette }`), the component asks
the port, and the `savedPalettes` prop dies with the duplicated predicate.

---

## L-9 · MINOR — the `string[] → PaletteColor[]` lift has no home; four copies

```
demo/palettes/browser/card/CurrentPaletteEditor.vue:244   return colors.map((css, i) => ({ css, position: i }));
demo/workbenches/generate/GenerateControls.vue:56         palette.value.map((css, i) => ({ css, position: i })),
demo/workbenches/generate/GeneratePane.vue:17             position: i,
demo/workbenches/mix/MixPane.vue:42                       const colors: PaletteColor[] = [{ css: mixResult.value.css, position: 0 }];
```

`PaletteColor` is defined in `demo/palettes/types.ts`; the canonical way to make one is defined
nowhere. **Cure:** `export function paletteColors(css: string[]): PaletteColor[]` beside the type it
constructs (`demo/palettes/types.ts` or `utils.ts` — both already exist; no new `shared/` dir, per
edict 3), and delete the four copies.

---

## L-10 · MAJOR (adjacent — the parent's lattice) — palette export has two live implementations, and the tested one is not the shipped one

`PalettesPane.vue:211` (this component's parent) and `BrowsePane.vue:324` both call
`usePaletteExport()`, which imports `from "./export"` → **`demo/palettes/export.ts`** (132 lines:
`exportAsJSON`, `exportAsCSSCustomProperties`, `exportAsTailwindConfig`, …).

Beside it sits **`demo/palettes/export/`** — 12 modules (`serializers · json · css · tailwind · svg ·
png · canonical · digest · bytes · rfc8785 · reload · types`) whose barrel is *deliberately not named
`index.ts`* so the two can coexist. `demo/palettes/export/serializers.ts:1-9` documents the dual path
in its own words:

> "This module is intentionally NOT named `index.ts`: the sibling **legacy** `../export.ts` (the
> pre-contract routed seat that W50 will replace) still resolves `./export`; the byte-exact set is
> addressed by its explicit paths here so the two never collide."

Consumer census:

```
demo/test/export/byte-exact.test.ts:23   } from "../../palettes/export/serializers";   ← the ONLY consumer of the contract set
demo/palettes/usePaletteExport.ts:9      } from "./export";                            ← the LIVE UI path
demo/palettes/PalettesPane.vue:152/211   usePaletteExport()
demo/palettes/BrowsePane.vue:198/324     usePaletteExport()
```

**The byte-exact suite proves an artifact the application never runs.** That is worse than an untested
path — it is a test that reports green about code no user can reach, while the code every user reaches
is labelled legacy and is untested. Direct edict-2 violation, self-documented.

Corollary: **two `slugify`s with different semantics** — `demo/palettes/utils.ts:3` (NFKD-normalizing,
combining-mark-stripping, used for the store's `createSlug`) and `demo/palettes/export.ts:9` (naive
`[^a-z0-9]+`, used for export filenames), plus a third naming authority at
`demo/palettes/export/canonical.ts:63` (`filenameStem`). A palette named `Café Noir` gets slug
`cafe-noir-…` from one and filename `caf-noir` from the other.

**Cure.** Finish W50: delete `demo/palettes/export.ts`, point `usePaletteExport` at
`./export/serializers`, and let the byte-exact suite guard the shipped path. Fold the naive `slugify`
into `utils.ts`'s.

---

## L-11 · MINOR — `tsconfig.demo.json` `paths` has drifted from `package.json#exports` and is entirely redundant

The published surface (`package.json#exports`) is a **7-key** set with **no bare root**:
`./color ./value ./css ./easing ./math ./transform ./quantize`.

`tsconfig.demo.json` declares an **8-key** `paths` block and its comment calls the exports map "a
CLOSED 8-key set". Reconciled:

| `paths` key | target | reality |
|---|---|---|
| `@mkbabb/value.js` | `./dist/index.d.ts` | **not an exports key**, and `dist/index.d.ts` is **MISSING** |
| `@mkbabb/value.js/parsing` | `./dist/subpaths/parsing.d.ts` | **MISSING** — no such export, no such file |
| `@mkbabb/value.js/units` | `./dist/subpaths/units.d.ts` | **MISSING** — no such export, no such file |
| `/color /math /easing /transform /quantize` | ✅ exist | redundant (see below) |
| `./value`, `./css` | — | **real exports with no `paths` entry** |

```
$ for f in dist/index.d.ts dist/subpaths/parsing.d.ts dist/subpaths/units.d.ts dist/subpaths/css.d.ts; do …
dist/index.d.ts                  MISSING
dist/subpaths/parsing.d.ts       MISSING
dist/subpaths/units.d.ts         MISSING
dist/subpaths/css.d.ts           EXISTS
```

The whole block is unnecessary. `--traceResolution` shows TypeScript's **self-name resolution** already
routes bare-specifier imports through the repo's own exports map, correctly, without `paths`:

```
======== Resolving module '@mkbabb/value.js/css' from '…/demo/color-session/picker-color.ts'. ========
'paths' option is specified, looking for a pattern to match module name '@mkbabb/value.js/css'.
Found 'package.json' at '/Users/mkbabb/Programming/value.js/package.json'.
Entering conditional exports.
Matched 'exports' condition 'types'.
Using 'exports' subpath './css' with target './dist/subpaths/css.d.ts'.
File '/Users/mkbabb/Programming/value.js/dist/subpaths/css.d.ts' exists - use it as a name resolution result.
======== Module name '@mkbabb/value.js/css' was successfully resolved to '…/dist/subpaths/css.d.ts' with Package ID '@mkbabb/value.js/dist/subpaths/css.d.ts@4.0.0'. ========
```

`/css` has no `paths` entry and resolves *perfectly* — through the same closed exports map Vite's
`valueJsSelfAlias` is generated from. So the demo's dogfood claim is honest at runtime and at
typecheck; the `paths` block adds nothing except three dead keys.

**Cure.** Delete the seven `@mkbabb/value.js*` entries from `tsconfig.demo.json#paths` (keep `vue` /
`@vue/*` dedupe) and let self-name resolution be the single authority — the same closed set Vite
generates from. One source, no drift possible. Fix the "8-key" comment to "7-key, no root".

---

## What is SOUND (the negatives, proven)

Recording these because a CHALLENGE seat that only accuses is not evidence.

- **Zero deep-`src/` reach.** `grep -rn '"@src' demo/ --include='*.ts' --include='*.vue' | wc -l` → **0**.
  The T.W1 demo-dogfood keystone holds: the demo touches no library internal.
- **Zero illegal public-surface imports.** Every `@mkbabb/value.js` specifier in `demo/` is a real
  exports key — `/color` (25), `/css` (10), `/math` (6), `/easing` (5), `/quantize` (4). No bare root
  (0), no `/parsing`, no `/units`. A real consumer could write every one of these imports verbatim.
  **This component imports the library not at all**, which is correct — it is a pure UI leaf.
- **`inv-K-1` is real enforcement.** `npx eslint --print-config src/color/index.ts` returns the live
  glass-ui ban. The library→producer edge is genuinely acyclic and genuinely guarded. (Contrast L-6:
  the demo-side rules are the dead ones.)
- **No god module here.** `CurrentPaletteEditor.vue` 312 lines, `useSwatchActions.ts` 116,
  `useHoverPopover.ts` 67, `useLeaveTimer.ts` 17, `SwatchHoverMenu.vue` 93. The decomposition is real.
- **No hover-popover dual path.** `useHoverPopover` has exactly two consumers —
  `useSwatchActions.ts:40` and `PaletteCard.vue:255` — and delegates its timer to `useLeaveTimer`.
  One home, one concept. This is the pattern the rest of the report wants everywhere.
- **`verbatimModuleSyntax` clean.** Every type-only import in the closure is `import type`:
  `CurrentPaletteEditor.vue:190` (`Palette, PaletteColor`), `useSwatchActions.ts:2,3`
  (`Ref, ShallowRef`; `EditTarget`), `SwatchHoverMenu.vue:57` (`CSSProperties`).
- **Vue 3.5 idiom correct.** Reactive props destructure at `:196-202` paired with
  `toRef(() => savedColorStrings)` / `toRef(() => cssColorOpaque)` at `:234-235` — the right way to
  hand destructured props to a composable. `shallowRef` is used where it matters
  (`EDIT_TARGET_KEY: InjectionKey<ShallowRef<EditTarget | null>>`).
- **Animations tokenized, not inlined.** `vj-enter` is global
  (`demo/styles/animations.css:67-83`); the two scoped rules that remain (`.add-slot-ghost`,
  `.edit-overlay`) are genuinely per-site geometry. The one animation *deleted* is L-5's, and that is
  a separate finding.

**Visual audit cross-check.** `docs/tranches/V/megatranche/audit/visual/REPORT.json`, matrix
`safari-desktop-light`, route `/#/palettes`: `pageErrors: []`, `consoleErrors: []`, `overflowX: 0`,
`main: 1`, `bodyTextLength: 237`, `smallTapTargets: 8`, `namelessButtons: 1`. None of the 8 small tap
targets belongs to this component (they are the dock slug bar's 22×22 trio and the picker's four 12×24
channel handles). The route-level capture is clean — **which is precisely the problem**: the
screenshot `shots/safari-desktop-light/palettes.png` shows the "Start a new palette" well rendering a
dashed silhouette with **no `+` glyph inside it**, and the audit had no oracle for "the primary CTA is
a `<span>`". A blank-page/console-error sweep cannot see a dead control. Read against L-1, that
missing plus sign in the screenshot is the visual signature of the deleted `<slot/>`.

---

## The greenfield lattice

Structuring this today, with no legacy, the module graph under the current-palette editor is:

```
@mkbabb/glass-ui                      ── the design system, reached ONLY by granular subpath
  ./swatch      Swatch, SwatchMenu    ── NEW. A real <button> hosting a WatercolorDot, with the
                                         aria-label, focus register and popover. Owns "an interactive
                                         colour swatch" because it already owns the shape.
                                         Kills: SwatchHoverMenu.vue, the 4 hand-built swatch hosts,
                                         and the L-1 class of defect permanently.
  ./watercolor-dot  WatercolorDot     ── stays pure decoration (aria-hidden, pointer-events:none) —
                                         correct as shipped; consumed only BY ./swatch.
  ./forms  ./button  ./tooltip  ./dom ── imported directly. `demo/ui/` DELETED (19 alias modules).
  @utility btn-interactive            ── minted here, where its comment already claims it lives.

demo/color-session/                   ── the colour session. ONE access idiom: injection.
  keys.ts   CSS_COLOR_KEY · SAFE_ACCENT_KEY · EDIT_TARGET_KEY · COLOR_MODEL_KEY
                                         No facet of this state is ever prop-drilled. (L-7)

demo/palettes/                        ── the palette domain.
  types.ts        Palette · PaletteColor · paletteColors(string[])        ← the lift, one home (L-9)
  utils.ts        slugify · createSlug · getPaletteKind                   ← ONE slugify (L-10)
  usePaletteStore.ts   createPalette · updatePalette · findByName         ← identity + collision,
                                                                            ONE home (L-8)
  export/         serializers.ts + the 11 byte-exact modules              ← the ONLY export impl;
                                                                            export.ts DELETED (L-10)
  usePalettePorts.ts   LIBRARY_PORT_KEY · COLOR_TARGET_PORT_KEY · …       ← the feature's injected API
  browser/
    index.ts + 6 sub-barrels                                              ← reached ONLY through the
                                                                            barrel, now lint-enforced
                                                                            against the LIVE tree (L-6)
    card/
      CurrentPaletteEditor.vue    ← 0 props, 2 emits (commitEdit/cancelEdit).
                                    Injects CSS_COLOR_KEY, COLOR_MODEL_KEY.savedColorStrings,
                                    LIBRARY_PORT_KEY, COLOR_TARGET_PORT_KEY.
                                    Renders <Swatch> / <SwatchMenu> from glass-ui.
                                    ~180 lines instead of 312.
      composables/useSwatchActions.ts  ← injects COLOR_TARGET_PORT_KEY; the hand-typed
                                          `emit` shim (L-7) is gone.
    status/ApiOfflineChip.vue     ← reached as `import { ApiOfflineChip } from "../status"`.
```

Net: **−19 alias modules** (`demo/ui/`), **−1 legacy export impl** (`export.ts`, 132 lines),
**−1 component** (`SwatchHoverMenu.vue`, absorbed by glass-ui `./swatch`), **−4 props / −6 emits** on
the subject, **−3 duplicated rules** (name collision, colour lift, slugify), **+1 glass-ui component**
that fixes the same defect for every swatch surface in the app at once. The dev-graph reach for this
component's design-system imports drops from 66 modules / 218.9 KB to roughly 25 / 45 KB.

---

## Findings table

| id | sev | finding | anchor |
|---|---|---|---|
| L-1 | **BLOCKER** | "Add current color" CTA is a dead `<span aria-hidden pointer-events:none>`; glass-ui 7 (`490cc46e`) deleted `tag`, `<component :is>` and `<slot/>`; `inheritAttrs:false` drops `@click` + `aria-label`; e2e `palette-save.spec.ts` RED at HEAD | `CurrentPaletteEditor.vue:95-105`, `SwatchHoverMenu.vue:14-33` |
| L-2 | **BLOCKER** | The `.d.ts` trust boundary is a false proof — `vue-tsc -p tsconfig.demo.json --noEmit` = EXIT 0 / 0 lines while L-1 is live; Vue fallthrough attrs make unknown props legal TS | `tsconfig.demo.json` header |
| L-3 | MAJOR | Ownership inversion — a producer-declared decoration mounted as the consumer's interactive host; 9 lines of scoped CSS centre a slot child that is never rendered | `CurrentPaletteEditor.vue:286-290` |
| L-4 | MAJOR | `demo/ui/` = 19 pure-alias barrels; 18/19 route through the root barrel (66 mods / 218.9 KB vs 11 / 16.8 for `./button`); 4 glass-ui import idioms in one tree; `writeClipboard` from root at 26 sites | `CurrentPaletteEditor.vue:174-181`, `useSwatchActions.ts:5` |
| L-5 | MAJOR | `btn-interactive` is a phantom — 0 rules in 5337 scanned across 49 sheets; the hover/press legs it replaced were deleted, not moved (edict 6) | `CurrentPaletteEditor.vue:75,78,100` |
| L-6 | MAJOR | G-DEMO-1/3a/3b are dead config — globs target the nonexistent `demo/@/**`, banned pattern `@components/**` has 0 usages; `no-restricted-imports = undefined` for this file; the "enforced standing" barrel seam is unenforced | `eslint.config.js:240-330`, `browser/index.ts:6` |
| L-7 | MAJOR | 4 props + 8 emits re-declare state already on `CSS_COLOR_KEY` / `COLOR_MODEL_KEY` / `LIBRARY_PORT_KEY` / `COLOR_TARGET_PORT_KEY`; 6/8 emits are 1:1 relays; `SwatchActionsDeps.emit` hand-retypes `colorTargetPort` | `CurrentPaletteEditor.vue:196-213`, `PalettesPane.vue:41-54,163-165` |
| L-8 | MAJOR | Name-collision rule has two homes that disagree (`isLocal` + `colorsMatch` present in the store, absent here); `savedPalettes: Palette[]` drilled into a swatch editor for one `.find()` | `CurrentPaletteEditor.vue:253-256` vs `usePaletteStore.ts:66-74` |
| L-9 | MINOR | `string[] → PaletteColor[]` lift reimplemented at 4 sites; no home beside the type | `CurrentPaletteEditor.vue:244` +3 |
| L-10 | MAJOR | Two live export implementations; the byte-exact suite tests the one the app never runs; self-documented dual path; 2–3 divergent `slugify`s | `export/serializers.ts:1-9`, `usePaletteExport.ts:9` |
| L-11 | MINOR | `tsconfig.demo.json#paths` drifted from `exports` — 3 of 8 keys target missing files, 2 real exports unmapped, whole block redundant under self-name resolution (traceResolution pasted) | `tsconfig.demo.json` |

**Strongest defect: L-1.** It is the only finding that a user can feel, it has a reproduction on the
live server *and* a red guard in the repo, and it is the direct product of L-2 (no proof at the seam)
and L-6 (no governance in the tree). Fixing L-1 alone patches a symptom; fixing L-2 + L-3 + L-6 makes
the whole class unrepeatable.

---
---

# Second pass — independent re-verification + three additional findings

## Model receipt (pass 2)

I observe myself to be **Opus 5** (`claude-opus-5[1m]`, the 1M-context variant) — the model this seat
was explicitly spawned with. Declared, not inherited.

This pass re-ran the seat from a cold read of the subject and re-measured every load-bearing claim
above **without consulting the pass-1 text first**. Substrate: same repo, HEAD `041ca263`, glass-ui
`7.0.0`, dev server `http://localhost:9000` (HTTP 200).

## Re-verification stamp

| claim | re-measured how | result |
|---|---|---|
| L-1 · `WatercolorDot` has no `tag` prop | `cat node_modules/@mkbabb/glass-ui/dist/components/watercolor-dot/WatercolorDot.vue.d.ts` | **CONFIRMED** — `__VLS_Props` declares exactly `color · variant · animate · cycleDuration · range · seed`. No `tag`. |
| L-1 · listeners + `aria-label` dropped | `grep -o 'inheritAttrs:[^,]*' dist/watercolor-dot.js` → `inheritAttrs: !1`; `grep -c 'renderSlot\|_renderSlot' dist/watercolor-dot.js` → `0`; `grep -o 'attrs\|\$attrs\|mergeProps\|useAttrs' … \| sort \| uniq -c` → `1 useAttrs` **only** | **CONFIRMED** — one `useAttrs()` (class/style), no `mergeProps`, no `$attrs` spread, no slot outlet. |
| L-1 · live DOM | fresh Playwright probe, `/#/palettes` @1440×900 (script in scratchpad, output pasted below) | **CONFIRMED** |
| L-5 · `btn-interactive` is a phantom | `grep -rl "btn-interactive" node_modules/@mkbabb/glass-ui/` → **no output**; live `document.styleSheets` walk → `{ n: 0, samples: [] }` | **CONFIRMED** — 0 rules in the running document, 0 occurrences anywhere in glass-ui 7.0.0. |
| L-6 · boundary lint is dead | `npx eslint --print-config demo/palettes/browser/card/CurrentPaletteEditor.vue` → `no-restricted-imports = undefined`; `ls -d demo/@` → *No such file or directory*; `grep -rn '"@components' demo \| wc -l` → `0` | **CONFIRMED** — and the one glob that still matches live files (`demo/color-picker/**`) bans a specifier prefix with zero usages, so it too is a no-op. |
| L-4 · `demo/ui/` is pure alias | dumped all 19 `demo/ui/*/index.ts` | **CONFIRMED** — 19 files, every one a single `export … from "@mkbabb/glass-ui"`; only `input` reaches a subpath (`/forms`). |
| L-8 · collision rule disagrees | `sed -n '60,80p' demo/palettes/usePaletteStore.ts` | **CONFIRMED** — store predicate is `p.isLocal && name-match && colorsMatch(...)`; the component's is name-match alone. |
| L-9 · lift duplicated | `grep -rn "position: i" demo` | **CONFIRMED** — `CurrentPaletteEditor.vue:244`, `GenerateControls.vue:56`, `GeneratePane.vue:17`, plus `mix.ts:142`. |
| L-10 · export dual path | `ls demo/palettes/export/` (12 modules, **no `index.ts`**) + `usePaletteExport.ts:9` `from "./export"` | **CONFIRMED** — with no `export/index.ts`, `./export` resolves to the sibling **file** `export.ts`; the 12-module directory is unreachable through that specifier. |
| negative · no deep `src/` reach | `grep -rEn 'from "(@mkbabb/value\.js[^"]*\|[^"]*\.\./src/[^"]*\|@/src[^"]*)"' demo` | **CONFIRMED** — 44 hits, every one a real `package.json#exports` key (`/color /css /math /easing /quantize`). Zero `src/` internals. This component imports the library not at all. |
| negative · `verbatimModuleSyntax` | read of the three closure files | **CONFIRMED** — `CurrentPaletteEditor.vue:190`, `useSwatchActions.ts:2-3`, `SwatchHoverMenu.vue:60` all `import type`. |

### Pass-2 probe output (pasted verbatim)

```
$ node scratchpad/probe.mjs        # playwright chromium, http://localhost:9000/#/palettes, 1440×900
{
  "addSlot": {
    "found": true,
    "tagName": "SPAN",
    "ariaHidden": "true",
    "ariaLabel": null,
    "tagAttr": null,
    "pointerEvents": "none",
    "tabIndex": -1,
    "matchesButton": false,
    "childTags": ["svg.watercolor-filter-host", "SPAN.watercolor-ghost-stroke"],
    "hasPlusSvg": false,
    "transition": "transform, border-radius, filter, box-shadow / 0.2s, 0.6s, 0.2s, 0.2s"
  },
  "btnInteractiveRules": { "n": 0, "samples": [] },
  "misc": { "swatches": 1, "editOverlay": 0 },
  "pageErrors": []
}
```

Note the `transition` line: the element *does* animate, but the four properties come from glass-ui's
own `.watercolor-swatch`. The `hover:scale-110 / active:scale-95` press-and-hover legs that
`CurrentPaletteEditor.vue:68-74` says were "retired onto the producer's `btn-interactive` atom" are
present in **neither** register. That is L-5, measured from the running page rather than from grep.

---

## L-12 · BLOCKER (escalation of L-1) — the dead-`tag="button"` defect is a 6-mount, 4-component, 3-route epidemic, not a 2-mount local bug

L-1 anchors the defect at `CurrentPaletteEditor.vue:95-105` and `SwatchHoverMenu.vue:14-33`. The
census is larger. Every `tag="button"` in the demo tree:

```
$ grep -rn 'tag="button"' demo
demo/workbenches/mix/MixSourceSelector.vue:168
demo/workbenches/mix/MixSourceSelector.vue:215
demo/workbenches/generate/GenerateControls.vue:203
demo/palettes/browser/card/CurrentPaletteEditor.vue:98
demo/palettes/browser/card/SwatchHoverMenu.vue:17
demo/palettes/browser/card/SwatchHoverMenu.vue:32
```

Six mounts, four components, and **every one of them is a `WatercolorDot`**. All six carry an
`aria-label`, five carry a `@click`, two carry a default slot, one carries `:disabled`. glass-ui 7
honours none of those. Measured across three routes in one pass:

```
$ node scratchpad/probe2.mjs
{
  "/#/mix":       { "count": 1, "first": { "tag": "SPAN", "ariaHidden": "true", "ariaLabel": null,
                                           "pe": "none", "tabIndex": -1, "children": ["svg","SPAN"] } },
  "/#/generate":  { "count": 5, "first": { "tag": "SPAN", "ariaHidden": "true", "ariaLabel": null,
                                           "pe": "none", "tabIndex": -1, "children": ["svg"] } },
  "/#/palettes":  { "count": 7, "first": { "tag": "SPAN", "ariaHidden": "true", "ariaLabel": null,
                                           "pe": "none", "tabIndex": -1, "children": ["svg"] } }
}
```

(`/#/mix` selector `.add-slot-ghost`, `/#/generate` selector `.generate-swatch`, `/#/palettes`
selector `.watercolor-swatch`.)

**What that costs, beyond this component:**

- `/#/mix` — the mix workbench's *only* way to add the live color is dead. Five e2e assertions query
  it by role: `e2e/smoke/views/mix.spec.ts:40`, `e2e/smoke/safari/mix-flow.spec.ts:30`,
  `e2e/smoke/oracles/o14-preview-truth.spec.ts:353` and `:412`,
  `e2e/smoke/oracles/o15-dock-register.spec.ts:53` — all
  `getByRole("button", { name: "Add current color to the mix" })`, all unmatchable against a
  `<span aria-hidden="true">`. Together with `e2e/smoke/flows/palette-save.spec.ts:35`
  (`/Add current color .* to palette/`) that is **six** red role-queries from one producer change.
- `/#/generate` — all five generated swatches are "Copy {css}" buttons. None copies. None is
  focusable. None has a name.
- `SwatchHoverMenu.vue:14-21` is the **touch** branch: `<PopoverTrigger as-child>` wrapping the dot.
  `as-child` works by merging the trigger's props (its click handler, `aria-expanded`, `id`,
  `data-state`) onto the child vnode as **attrs** — which `inheritAttrs: false` discards. So on a
  coarse-pointer device the saved-swatch popover cannot open at all; the hover branch
  (`SwatchHoverMenu.vue:29-36`) survives only because `@pointerenter` sits on the wrapping
  `<div class="relative">` at `:2-6`, not on the dot. **The desktop affordance limps; the mobile
  affordance is gone.**

**Mechanism (why this is a *library-structure* finding and not a bug report).** There is no seam in
the demo that names "an interactive color swatch". Six call sites each hand-assemble one out of a
decoration primitive plus a `tag` prop, and the prop was the only thing holding the assembly
together. When the producer withdrew it — legitimately; a component that hard-codes
`aria-hidden="true"` and `pointer-events: none` on its own root is *declaring itself paint* — six
consumers broke silently and simultaneously. A missing module became six defects.

**Cure (the transposition, not the patch).** glass-ui grows `./swatch` — a real `<button>` that hosts
a `WatercolorDot`, owning the accessible name, the focus register, the press/hover legs (i.e. the
home `btn-interactive` never got), and the popover attachment. `WatercolorDot` stays pure paint and
is consumed only by `./swatch`. `SwatchHoverMenu.vue` is absorbed into it. Six call sites become six
`<Swatch>`/`<SwatchMenu>` mounts, and the *class* of defect ends: a paint primitive can no longer be
promoted to a control by passing it a string.

---

## L-13 · MAJOR — the edit-commit control pair has two homes, and the command it sends has two wirings that disagree

`CurrentPaletteEditor.vue:56-84` renders an edit overlay: a FROM→TO `WatercolorDot` pair, then a
`Check` (Save edit) and an `Undo2` (Cancel edit).

`demo/shell/dock/Dock.vue:136-144` renders — inside the `mobile-edit` `DockLayer` — a FROM→TO
`WatercolorDot` pair, then a `Check` (`aria-label="Save edit"`) and an `Undo2`
(`aria-label="Cancel edit"`).

Side by side:

| | `CurrentPaletteEditor.vue` | `Dock.vue` |
|---|---|---|
| FROM dot | `:color="color"` `variant="ghost"` `:seed="'edit-from-' + i"` `class="w-11 h-11 sm:w-12 sm:h-12"` (`:62`) | `:color="editTarget.originalCss"` `seed="edit-original"` `class="w-7 h-7 … opacity-50"` (`:136`) |
| arrow | `<span class="text-muted-foreground text-caption">&rarr;</span>` (`:63`) | `<span class="text-muted-foreground text-caption">&rarr;</span>` (`:137`) |
| TO dot | `:color="cssColorOpaque"` `:seed="'edit-to-' + i"` (`:64`) | `:color="cssColorOpaque"` `seed="edit-new"` (`:138`) |
| Save | `<button class="btn-interactive …" aria-label="Save edit"><Check :style="{ color: safeAccent }" /></button>` (`:75-77`) | `<DockControl aria-label="Save edit"><Check :style="{ color: safeAccent }" /></DockControl>` (`:143`) |
| Cancel | `<button class="btn-interactive …" aria-label="Cancel edit"><Undo2 class="text-muted-foreground" /></button>` (`:78-80`) | `<DockControl aria-label="Cancel edit"><Undo2 /></DockControl>` (`:144`) |
| gate | `class="edit-overlay glass-floating hidden lg:flex"` (`:58`) | dock layer, active when `editTarget` is set |

One concept — "commit or abandon the in-flight color edit, showing what you are trading" — with two
implementations, two icon sizes, two seeds, two hosts (bare `<button>` vs `DockControl`), and one
shared per-instance `:style="{ color: safeAccent }"` copied verbatim between them. The
`hidden lg:flex` on the overlay and the mobile-only dock layer show the split was *meant* as
responsive routing; what actually shipped is a fork, because nothing holds the two in agreement.

**And the command diverges.** `commitEdit` reaches `ColorPicker` by two different wirings:

```
demo/color-picker/App.vue:41
  @commit-edit="colorPickerRef?.commitEdit(); viewManager.mobilePaneIndex.value = 1"     ← dock path

demo/shell/usePaneRouter.ts:156
  "onCommit-edit": () => deps.colorPickerRef()?.commitEdit(),                            ← pane path
```

The dock path resets the mobile pane index; the pane path does not. Same verb, same target ref, two
call sites, one extra side effect on one of them. That is the definition of a dual path: not two
copies of the same behaviour, but two copies that have already drifted.

**Cure.** One `EditCommitBar` owning the FROM→TO diff and the two verbs, living in
`demo/color-session/` (which already owns `EDIT_TARGET_KEY` and the `EditTarget` type), rendered by
whichever host is on screen and styled by the host's slot, never re-implemented by it. The command
itself belongs on `COLOR_TARGET_PORT_KEY` — `usePalettePorts.ts:235-240` already exposes
`commitColorEdit` — so both hosts call one port method and the pane-index reset lives inside it,
once. That deletes the `commitEdit`/`cancelEdit` emit pair from this component, from `PalettesPane`,
and from the `usePaneRouter` `rightProps` special case.

---

## L-14 · MINOR — `SAFE_ACCENT_KEY` is injected into a leaf card to power one inline style that a `:root` token already carries

`CurrentPaletteEditor.vue:173,215` imports and injects `SAFE_ACCENT_KEY`. Its **entire** use is one
attribute, `:76`:

```vue
<Check class="w-5 h-5" :style="{ color: safeAccent }" aria-hidden="true" />
```

The provider is `demo/color-picker/composables/boot/useAtmosphereBoot.ts:91` — **app-root boot**. Six
lines later, `:96`, the very same ref is mirrored onto a document token:

```ts
provide(SAFE_ACCENT_KEY, safeAccentCss);            // :91
watch(safeAccentCss, (css) => {
    document.documentElement.style.setProperty("--accent-live", css);   // :96
}, { immediate: true });
```

and `demo/styles/foundation.css:250-251` chains it:

```css
--accent-view: var(--accent-live);
--primary: var(--accent-view);
```

So `safeAccent` and `var(--primary)` are, by construction, the same string. The component pays a
hard runtime coupling to app-root boot — a non-null `inject(...)!` that throws on render if the
provider is absent — to obtain a value already sitting on `:root` as a cascading custom property,
and then spends it on a per-instance inline style, which edict 5 forbids on its face.

Two smaller things fall out of the same site:

- **Asymmetric inject contracts in one component's cone.** `CurrentPaletteEditor.vue:215` uses
  `inject(SAFE_ACCENT_KEY)!` — crash on missing. `useSwatchActions.ts:23` uses
  `inject(EDIT_TARGET_KEY, ref(null) as ShallowRef<EditTarget | null>)` — silently degrade on
  missing (the edit highlight just never appears). Both keys come from the same module, both are
  provided by the same app root. One of the two is a masking fallback (edict 2); they cannot both be
  right.
- **`TransitionGroup` is imported from `vue` at `:172`** although it is a built-in resolved
  globally by the compiler. Harmless, but it is one more import on a component whose import list is
  the subject of this seat.

**Cure.** `class="text-primary"` (or `color: var(--accent-live)`), and the `SAFE_ACCENT_KEY` import,
the inject, and the boot coupling all delete themselves. `Dock.vue:143` carries the identical inline
style and takes the identical cure. Then make the remaining injects one contract: if a key is
required, `inject(KEY)!`; if it is optional, the optionality is part of the *key's* documented
contract, not a per-call-site default.

---

## Supplement to the findings table

| id | sev | finding | anchor |
|---|---|---|---|
| L-12 | **BLOCKER** | The dead-`tag="button"` defect is 6 mounts / 4 components / 3 routes, all `WatercolorDot`; 6 e2e role-queries red; `SwatchHoverMenu`'s `PopoverTrigger as-child` path means the **touch** swatch menu cannot open at all. Root cause is a *missing module*: nothing owns "interactive color swatch". | `grep -rn 'tag="button"' demo` (6 hits); probe2 output |
| L-13 | MAJOR | The edit-commit control pair (FROM→TO dots + Check/Undo2) is implemented twice — here and `Dock.vue:136-144` — and `commitEdit` has two wirings that disagree (`App.vue:41` resets `mobilePaneIndex`, `usePaneRouter.ts:156` does not). | `CurrentPaletteEditor.vue:56-84` vs `Dock.vue:136-144`; `App.vue:41` vs `usePaneRouter.ts:156` |
| L-14 | MINOR | `SAFE_ACCENT_KEY` injected from app-root boot to feed one per-instance inline style whose value is already `var(--primary)` by construction; plus asymmetric `inject!` / `inject(k, default)` contracts on two keys from one module. | `CurrentPaletteEditor.vue:76,173,215`; `useAtmosphereBoot.ts:91,96`; `foundation.css:250-251`; `useSwatchActions.ts:23` |

**Pass-2 verdict: DEFECTIVE, unchanged, and the strongest defect is stronger than pass 1 recorded.**
L-1 stands exactly as written; L-12 shows its blast radius is six mounts and six red e2e role-queries
across three routes, not two mounts on one. The single greenfield move that retires the most —
glass-ui `./swatch`, a real button hosting the paint — closes L-1, L-3, L-5 (it is where
`btn-interactive` belongs) and L-12 at once.

### Visual confirmation (pass 2, read directly)

`docs/tranches/V/megatranche/audit/visual/shots/safari-desktop-light/palettes.png`, read as an image
this pass: the "Start a new palette" dashed well contains **one small dashed pink silhouette and
nothing else** — no `+` glyph inside it. That empty silhouette is the L-1 add-slot: the seeded ghost
outline paints (it is a `border-radius` + filter effect on the `<span>`, which survives), while the
`<Plus>` that was supposed to sit in the default slot does not, because glass-ui 7's `WatercolorDot`
renders no slot outlet. The screenshot is the defect's visual signature, and no route-level oracle in
`REPORT.json` (`pageErrors: []`, `consoleErrors: []`, `overflowX: 0`) could see it — a dead control
is neither an error nor a blank page.
