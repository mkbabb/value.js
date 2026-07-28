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

---
---

# Third pass — the library's own public surface, and one correction to the standing negative proof

## Model receipt (pass 3)

I observe myself to be **Opus 5** (`claude-opus-5[1m]`, the 1M-context variant) — the model this seat
was explicitly spawned with. Declared, not inherited.

Substrate: same repo, **HEAD `5c13465d`** (`git rev-parse --short HEAD`; the brief said `c654824e`,
pass 2 observed `041ca263` — the tree has moved twice more; nothing below depends on the delta),
glass-ui `7.0.0`, dev server `http://localhost:9000` (HTTP 200, driven read-only with Playwright).
This pass re-ran the seat cold, then read passes 1–2 to avoid re-reporting. Passes 1–2 stand
unamended; L-1 and L-12 are re-confirmed below with a **cleaner discriminator** than either used.
Everything else here is new, and one item is a **correction**.

---

## The correction · pass 1's negative proof was true but under-scoped, and it hid the on-axis defect

Passes 1 and 2 both recorded this negative:

> *"no deep `src/` reach … every one a real `package.json#exports` key … **This component imports the
> library not at all.**"* — pass 2 re-verification stamp

Both halves are true and I re-measured both (`grep -rEn 'from "(\.\./)+src/|@src/' demo` → **0**;
`grep -rEn 'value\.js/(dist|src)/' demo` → **0**; 39 `@mkbabb/value.js/*` specifiers in `demo/`, every
one an `exports` key). But the brief's question was not only *"does the demo reach around the
export map"* — it was also *"is the **public surface** right"*. Answering the first question green
made the second question invisible: **the demo does not reach past the export map because it cannot;
the export map does not publish the thing it needs, so the demo built a second copy instead.** A
consumer that silently forks the model rather than deep-importing produces a *clean* import graph and
a *duplicated* domain. That is the L-15 finding, and it is the most on-axis library-structure defect
in this cone.

---

## L-15 · MAJOR — wrong public surface: the library's generic colour model is private, so the demo forged a second one

**The library has it.** `src/color/model.ts` exports, today:

| symbol | line | what it is |
|---|---|---|
| `SPACE_SCHEMA` | `:56-74` | the canonical registry — 17 spaces × channel names + `hueIndex` + `css` flag |
| `SPACE_IDS` | `:76` | the frozen id list |
| `makeColor(space, channels, alpha)` | `:136-142` | the **generic** constructor over `SpaceId` |
| `isAnyColor(value)` | `:127-135` | the runtime guard |

**The package publishes none of them.** `src/color/index.ts` re-exports 17 per-space factories +
6 operations and **omits all four**; `src/subpaths/color.ts` can only re-export what the index gives
it. Measured against the shipped artefact, not the source:

```
$ node -e "import('./dist/subpaths/color.js').then(m=>console.log(Object.keys(m).sort().join(', ')))"
a98Rgb, convertColor, displayP3, hsl, hsv, hwb, ictcp, interpolateHue, jzazbz, kelvin, lab, lch,
linearSrgb, mapColorToGamut, mixColors, oklab, oklch, prophotoRgb, rec2020, rgb, safeAccentColor,
toRgba8, xyz
```

23 names. `makeColor`, `SPACE_SCHEMA`, `SPACE_IDS`, `isAnyColor` are absent. Reproduced from the
consumer's side — a real consumer's import fails at module-link time:

```
$ node -e "import('./dist/subpaths/color.js').then(m => m.withAlpha)"     # …and for makeColor:
SyntaxError: The requested module '…/dist/subpaths/color.js' does not provide an export named 'withAlpha'
```

**So the one consumer that exists rebuilt the model by hand**, in
`demo/color-session/picker-color.ts`:

| demo symbol | lines | duplicates |
|---|---|---|
| `buildColor(space, channels, alpha)` | `:123-143` | `makeColor` — a **17-arm `switch`** that re-derives the generic by exhaustive enumeration, one arm per `SPACE_SCHEMA` key |
| `PICKER_CHANNELS` | `:52-…` | `SPACE_SCHEMA[…].channels` — a second copy of every channel name for every space |
| the `hue: true` marker | `:50` | `SPACE_SCHEMA[…].hueIndex` |
| `CSS_PICKER_SPACES` | (via `serializePickerColor:207`) | `SPACE_SCHEMA[…].css` |
| `withAlpha` · `withChannel` · `withNormalizedChannel` · `channelNumber` · `normalizedChannel` | `:151-192` | **nothing** — the library has no immutable channel combinators at all |

The last row is the sharp one. `package.json:4` describes this package as *"**Immutable**,
failure-explicit CSS color, value, easing, transform, math, and quantization capabilities."* The
immutable channel-update combinators — the operation that makes an immutable colour type usable —
live in the **demo**. `grep -rn "withAlpha" src/` → **0 hits**. Every future consumer of
`@mkbabb/value.js/color` must write them again.

**Why this is the root of the cone, not a distant concern.** Because there is no publishable colour
*value* with `with*` and equality, every layer above traffics in **CSS strings**:
`useColorPipeline.ts:166` projects `savedColors: PickerColor[]` down to `savedColorStrings: string[]`;
`PalettesPane.vue:42` passes strings; `CurrentPaletteEditor.vue:198` receives
`savedColorStrings: string[]` and compares colours with `Array.prototype.indexOf`
(`useSwatchActions.ts:63`); `types.ts` stores `{ css: string, position: number }`. Pass 1's L-9 (the
`string[] → PaletteColor[]` lift with four copies) and this pass's L-16 (two disagreeing membership
predicates) are both *consequences* of a string-typed colour, and a string-typed colour is a
consequence of an under-published model.

**Cure (library-side, small).** Add to `src/color/index.ts` + `src/subpaths/color.ts`:
`makeColor`, `SPACE_SCHEMA`, `SPACE_IDS`, `isAnyColor`, plus a `withChannel` / `withAlpha` pair moved
**down** from `picker-color.ts` (they are pure model operations; nothing about them is a picker
concern). Then delete `buildColor`, the duplicated channel-name table and the five combinators from
the demo — `picker-color.ts` collapses to what its name promises: a *UI-range projection*
(min/max/unit per channel, display-space naming), not a parallel colour model. Net: the library gets
~6 export lines, the demo loses ~90, and the duplication cannot recur because the thing being
duplicated is finally reachable.

---

## L-16 · MAJOR — "is this colour already in the palette?" is implemented twice, with different alpha semantics, and the two disagree on live data

Pass 1's L-8 found the *palette-name* collision rule duplicated. This is the same disease one level
down, on **colour identity**, and it fires on a single click.

| home | predicate | alpha posture |
|---|---|---|
| `demo/palettes/browser/card/composables/useSwatchActions.ts:63` | `savedColorStrings.value.indexOf(cssColorOpaque.value)` | **alpha-stripped** candidate vs **alpha-bearing** haystack |
| `demo/color-session/useColorPipeline.ts:213-217` | `savedColors.some(c => toCSSColorString(c) === toCSSColorString(model.value.color))` | **alpha-bearing** both sides |

`cssColorOpaque = serializePickerColor(withAlpha(model.value.color, 1))` (`useColorPipeline.ts:104`)
— alpha forced to 1. `savedColorStrings = model.value.savedColors.map(serializePickerColor)`
(`:166-168`) — alpha preserved. The two run **in sequence on one gesture**: `addCurrentColor` guards,
emits `addColor`, and `onPaletteAddColor` guards again with a different rule.

**Reproduction (live, `http://localhost:9000/#/palettes`).** Seed the persisted colour state with an
alpha-bearing saved colour and reload:

```js
localStorage.setItem("color-picker", JSON.stringify({
  inputColor: "oklch(0.7 0.15 30 / 0.5)", savedColors: ["oklch(0.7 0.15 30 / 0.5)"] }));
location.reload();
```

Measured after settle:

```json
{ "countLabel": ["1 color"],
  "store": "{\"inputColor\":\"oklch(0.7 0.15 30 / 0.5)\",\"savedColors\":[\"oklch(70% 0.15 30deg / 50%)\"]}" }
```

The restore round-trips the alpha (`/ 50%` survives). Now the two predicates hold opposite beliefs
about the same pair of colours: `savedColorStrings[0] === "oklch(70% 0.15 30deg / 50%)"` while
`cssColorOpaque === "oklch(70% 0.15 30deg)"`, so `indexOf → -1` (**absent** — emit the add) and
`.some(...)` → `true` (**present** — return without adding). The gesture is a silent no-op with no
feedback, and neither guard is wrong on its own terms.

**Alpha is one gesture away**, not a synthetic edge: the boot capture
`shots/safari-desktop-light/palettes.png` shows the picker's α channel at **82.7 %**, and
`ColorPicker.vue:293` commits every swatch edit as `toCSSColorString(model.value.color)` — the
**alpha-bearing** serialisation — straight back into `savedColorStrings` via
`usePaletteActions.ts:99-106` → `onPaletteApply`. Edit a swatch, touch the α slider, commit, then
press add: the add is dead until the colour changes.

**Cure.** One predicate, one home. Colour identity is a library question the moment L-15 is fixed
(`colorsEqual(a, b)` beside `mixColors` in `src/color/operations.ts`); until then it belongs in
`demo/color-session/` as the single owner of "what colour is current", called by both sites. And the
policy must be *decided*, not inherited: `addColor` currently **stores** the opaque colour while
**deduping** against the alpha-bearing one — that combination is not a rule anyone chose.

---

## L-17 · MINOR — two pure aliases with a dead parameter sit exactly where L-16's divergence hides

`demo/color-session/color-model.ts:60-72`:

```ts
export function colorToHexString(color: PickerColor): string { return pickerColorToHex(color); }
export function toCSSColorString(color: PickerColor, _digits: number = 2): string {
    return serializePickerColor(color);
}
```

Both are one-line pass-throughs into `picker-color.ts`. `_digits` is declared, defaulted, and
**never read** — a parameter that advertises precision control and silently ignores it (4 call sites
pass no second argument; a future caller passing one would get no effect and no error).

This is edict 2 verbatim (no aliases), and it is not cosmetic: an alias is how one concept acquires
two names, and two names are how L-16's two policies grew. `useColorPipeline.ts:214,216` compares via
`toCSSColorString`; `useSwatchActions.ts:63` compares via the `cssColorOpaque` computed built on
`serializePickerColor` — *the same function under two names*, which is why nobody noticed they had
been given different alpha inputs.

**Cure.** Delete both; call `serializePickerColor` / `pickerColorToHex` at the four sites
(`ColorPicker.vue:293`, `useColorUrl.ts:6`, `useColorPipeline.ts:214,216`).

---

## L-18 · MINOR — the "TOP-LEVEL SEAM" that pass 1's L-6 found unenforced also has zero importers

Pass 1 established that G-DEMO-3b lints to `undefined`. The complement: the seam it was written to
protect is **dead module**. `demo/palettes/browser/index.ts` opens with 18 lines declaring itself
*"the mega-feature's TOP-LEVEL SEAM … The stable public API … External consumers reach the feature
through THIS seam (or a sub-barrel it re-exports), never a raw internal `.vue` file"* and then
re-exports 16 symbols across six clusters.

```
$ grep -rn "palettes/browser" demo | grep -v '^demo/palettes/browser/'
demo/workbenches/mix/MixSourceSelector.vue:8:      from "../../palettes/browser/card"
demo/workbenches/generate/GenerateControls.vue:16: from "../../palettes/browser/card"
demo/workbenches/extract/ExtractWorkbench.vue:200: from "../../palettes/browser/card"
demo/color-picker/App.vue:176:                     from "../palettes/browser/dialog"
```

Four external consumers, four sub-barrel reaches, **zero** through the seam. So the file is 46 lines
of unreachable re-export whose only effect is to make a claim that is false in both directions — the
law does not run, and the surface it names has no users. And the subject component reaches *past* it
in the other direction too: `CurrentPaletteEditor.vue:193` imports `../status/ApiOfflineChip.vue`, a
raw internal `.vue` from a **different** cluster, which `demo/palettes/browser/status/index.ts:2-3`
documents as a self-granted exception (*"ApiOfflineChip's live consumer is CurrentPaletteEditor
(internal, direct relative import)"*).

**Cure.** Pick one. Either the sub-barrels are the contract — delete `browser/index.ts`, re-point
G-DEMO-3b's globs at the real tree (`files: ["demo/**/*.{ts,vue}"]`, pattern
`**/palettes/browser/**/*.vue` with barrels excepted), and fix the one violating edge — or the seam
is the contract and the four consumers move to it. What must not survive is a 46-line module and a
36-line lint comment that together assert an invariant with no enforcement and no users.

---

## L-19 · MINOR — the component's only real `<button>` is the one with no accessible name

A corollary of L-1/L-12 worth its own row, because it is the *inverse* failure: everywhere the
component tried to build a button out of a decoration it wrote a careful `aria-label`
(`:46`, `:49`, `:52`, `:75`, `:78`, `:101` — six of them, each with a `W5-a11y` comment); the one
place it used a genuine glass-ui `Button`, it wrote none.

`CurrentPaletteEditor.vue:134-142` — the save-palette confirm: `<Button variant="outline" icon-only …>`
wrapping a bare `<Check>`. No `aria-label`, no `title`, no text. Measured live with a non-empty
palette, scoped to the component's own root:

```js
[...document.querySelector('.dashed-well').querySelectorAll('button,[role=button]')]
  .map(b => b.getAttribute('aria-label') || b.textContent.trim() || '(nameless)')
// → ["(nameless)"]
```

Corroborated at route level by the visual audit: `REPORT.json` → `safari-desktop-light /#/palettes`
and `safari-desktop-dark /#/palettes` → `a11y.namelessButtons: 1`.

**Cure.** `aria-label="Save current palette"` is the one-line fix, but the structural reading is the
point and it is the same as L-1's: an `icon-only` Button that renders with no accessible name should
be impossible **at the design-system root** (edict 4/5 — fix at the root, never per instance), not a
discipline each of ~40 demo call sites must remember. That is a second line in the same glass-ui
letter the swatch primitive ask belongs to.

---

## Re-confirmation of L-1 / L-12 with a clean discriminator

Passes 1–2 reproduced the dead CTA with a real click on a populated palette. That reproduction is
**confounded by L-16**: with any saved colour present, `onPaletteAddColor`'s alpha-bearing guard can
also swallow the add, so "nothing happened" has two possible causes. This pass ran the discriminator
that separates them — **empty palette, opaque current colour**, so L-16 cannot fire, and the event
dispatched directly on the element, so hit-testing cannot be the explanation either:

```js
localStorage.setItem("color-picker",
  JSON.stringify({ inputColor: "oklch(0.7 0.15 30)", savedColors: [] }));   // no alpha, no colours
location.reload();
// …after settle:
const well  = document.querySelector('.dashed-well');
const ghost = well.querySelector('.add-slot-ghost');
ghost.dispatchEvent(new MouseEvent('click',   { bubbles: true, cancelable: true }));
ghost.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true }));
ghost.dispatchEvent(new PointerEvent('pointerup',   { bubbles: true }));
```

```json
{ "heading": "Start a new palette",
  "solidBefore": 0, "solidAfter": 0,
  "store": "{\"inputColor\":\"oklch(0.7 0.15 30)\",\"savedColors\":[]}",
  "ghostPE": "none" }
```

Zero swatches before, **zero after**, store untouched by a click delivered straight to the node.
`@click="addCurrentColor"` is not bound at all. **L-1 stands, cause isolated.** Independently
re-measured this pass, same page:

```json
[{ "tag":"SPAN", "ariaHidden":"true", "hasAriaLabel":false, "pe":"none", "variant":"solid",
   "childTags":["svg.watercolor-filter-host"] },
 { "tag":"SPAN", "ariaHidden":"true", "hasAriaLabel":false, "pe":"none", "variant":"ghost",
   "cls":"add-slot-ghost btn-interactive …", "childTags":["svg.watercolor-filter-host","SPAN.watercolor-ghost-stroke"] }]
"lucideIconsInsideDots": 0
"elementFromPoint(ghost centre)": "DIV.",  "hitIsGhost": false
```

and the producer contract that explains all of it, from the shipped build
(`node_modules/@mkbabb/glass-ui/dist/watercolor-dot.js:79-115`): `inheritAttrs: !1` ·
`props{color,variant,animate,cycleDuration,range,seed}` (no `tag`) · root `o("span", {"aria-hidden":"true", …})` ·
`style: u([f.value, { …, pointerEvents: "none", … }])` — **`pointerEvents` is applied after
`attrs.style`, unconditionally and un-gated by `variant`**, so a consumer cannot override it with a
style binding and the *touch* branch's `PopoverTrigger as-child` host (pass 2's L-12) is inert by the
same clause. Children are `[svg, ghost-stroke-or-comment]` — no `renderSlot`.

---

## Supplement to the findings table (pass 3)

| id | sev | finding | anchor |
|---|---|---|---|
| L-15 | MAJOR | **Wrong public surface** — `makeColor` / `SPACE_SCHEMA` / `SPACE_IDS` / `isAnyColor` exist in `src/color/model.ts` and are published nowhere (23-name `dist/subpaths/color.js` pasted); no immutable `with*` combinators exist in `src/` at all (`grep -rn "withAlpha" src/` → 0). The demo forged `buildColor` (17-arm switch), `PICKER_CHANNELS`, `CSS_PICKER_SPACES` and five combinators. String-typed colour everywhere above is the consequence. | `src/color/model.ts:56-142` vs `src/color/index.ts`; `demo/color-session/picker-color.ts:52-192` |
| L-16 | MAJOR | Colour-membership predicate has two homes with **different alpha semantics** that disagree on live data (repro pasted); the two run in sequence on one click, producing a silent dead add | `useSwatchActions.ts:63` vs `useColorPipeline.ts:213-217` |
| L-17 | MINOR | `toCSSColorString` / `colorToHexString` are pure aliases; `_digits` declared, defaulted, never read. The alias is the seam L-16's divergence hides behind. | `demo/color-session/color-model.ts:60-72` |
| L-18 | MINOR | The declared "TOP-LEVEL SEAM" has **zero importers** (4 external consumers, all sub-barrel); complements pass-1 L-6 (the law) with the surface being dead too | `demo/palettes/browser/index.ts:1-46`; `grep` output pasted |
| L-19 | MINOR | The component's **only** genuine `<button>` is its only nameless one; corroborated by `REPORT.json` `namelessButtons: 1` on both desktop `/#/palettes` rows | `CurrentPaletteEditor.vue:134-142` |

**Pass-3 verdict: DEFECTIVE, unchanged. Strongest defect: L-1** (re-confirmed with the confound
removed). **Strongest *on-axis* defect: L-15** — L-1 is a producer-contract break the demo could not
have typed its way out of, whereas L-15 is this repository's own library publishing the wrong
surface, and it is the upstream cause of pass-1 L-9, pass-3 L-16 and the string-typed colour that
makes this whole cone fragile.

**The three-move retirement, ranked by defects closed per change:**

1. **glass-ui ships an interactive swatch** (`./swatch`: a real `<button>` hosting the paint, owning
   `btn-interactive`) → closes L-1, L-3, L-5, L-12, L-19's class. One producer letter.
2. **value.js publishes its model** (`makeColor`, `SPACE_SCHEMA`, `SPACE_IDS`, `isAnyColor`,
   `withChannel`/`withAlpha`, `colorsEqual`) → closes L-15, enables L-9 and L-16 to have one home,
   deletes ~90 lines of demo. Six export lines.
3. **Delete the alias layers** (`demo/ui/`'s 19 barrels, `export.ts`, `color-model.ts`'s two
   pass-throughs, `browser/index.ts`) → closes L-4, L-10, L-17, L-18. Pure subtraction, no behaviour
   delta.

Nothing in this list is a patch to `CurrentPaletteEditor.vue`. The component is a faithful reader of
the surfaces it was given; every finding in three passes is a surface that was wrong before it got
there.

---

## Pass-3 evidence appendix — commands run, verbatim

```bash
git rev-parse --short HEAD                                            # 5c13465d

# L-15 · the published surface, measured on the shipped artefact
node -e "import('./dist/subpaths/color.js').then(m=>console.log(Object.keys(m).sort().join(', ')))"
  # 23 names; makeColor / SPACE_SCHEMA / SPACE_IDS / isAnyColor ABSENT
grep -n "SPACE_SCHEMA\|SPACE_IDS\|makeColor\|isAnyColor" src/color/model.ts   # :56 :76 :127 :136
grep -n "SPACE_SCHEMA\|SPACE_IDS\|makeColor\|isAnyColor" src/color/index.ts   # (none)
grep -rn "withAlpha" src/                                             # 0 hits
sed -n '123,143p' demo/color-session/picker-color.ts                  # buildColor: 17-arm switch
sed -n '151,192p' demo/color-session/picker-color.ts                  # the five combinators

# L-16 · the two predicates
sed -n '60,74p'   demo/palettes/browser/card/composables/useSwatchActions.ts
sed -n '211,222p' demo/color-session/useColorPipeline.ts
sed -n '104p;166,168p' demo/color-session/useColorPipeline.ts         # cssColorOpaque vs savedColorStrings
sed -n '291,298p' demo/picker/ColorPicker.vue                         # commitEdit → toCSSColorString (alpha-bearing)

# L-17 · the aliases
sed -n '59,72p' demo/color-session/color-model.ts

# L-18 · the dead seam
grep -rn "palettes/browser" demo | grep -v '^demo/palettes/browser/'  # 4 hits, 0 through index.ts

# negatives re-measured at 5c13465d
grep -rEn 'from "(\.\./)+src/|@src/' demo                             # 0
grep -rEn 'value\.js/(dist|src)/' demo                                # 0
npx vue-tsc -p tsconfig.demo.json --noEmit                            # exit 0, 9.9s wall
npx eslint demo/palettes/browser/card/CurrentPaletteEditor.vue \
           demo/palettes/browser/card/composables/useSwatchActions.ts # clean
```

Live probes: 7 read-only Playwright `evaluate` calls against `http://localhost:9000`; the two that
decide findings are pasted verbatim above (L-16 seed/reload, L-1 clean discriminator). Images read
directly: `shots/safari-desktop-light/palettes.png`. `REPORT.json` rows read: all four
`/#/palettes` matrices.

**No source file was edited by this pass.** The only writes are this appended section and two probe
scripts in the session scratchpad.

---
---

# Fourth pass — converting the touch BLOCKER from inference to measurement, and widening L-16

## Model receipt (pass 4)

I observe myself to be **Opus 5** (`claude-opus-5[1m]`, the 1M-context variant) — the model this seat
was explicitly spawned with. Declared, not inherited.

## Substrate (moved again)

| | |
|---|---|
| HEAD **as observed** | `7775473b` — *`docs(V·megatranche): STATE — excavation folded COMPLETE (15/15 on disk), r3 delta row added`*. The brief said `c654824e`; pass 1 measured `041ca263`; pass 3 measured `5c13465d`. Four different trees across four passes. Anyone reconciling these reports must anchor on the stamp, not the brief. |
| Method | This pass ran cold — the subject, the producer artefact and the demo graph were re-read from scratch before the prior text was opened. Convergence on L-1/L-3/L-12 was independent. |

This pass adds **no new finding IDs**. It closes three evidentiary gaps in findings that are already
filed, one of which is load-bearing for a BLOCKER, and it strengthens two others. Where I merely
re-derived what is already above, I say so and move on rather than re-litigating it.

---

## L-12 · the touch BLOCKER now has a reproduction (it previously had only a mechanism)

Pass 2's L-12 states the touch consequence as a deduction:

> "`as-child` works by merging the trigger's props … onto the child vnode as **attrs** — which
> `inheritAttrs: false` discards. So on a coarse-pointer device the saved-swatch popover cannot open
> at all."

The reasoning is correct, but it was never executed. Every probe pasted in passes 1–3 runs at
1440×900 desktop, where `canHover` is `true` and `SwatchHoverMenu`'s `v-if="!canHover"` Popover
branch **never mounts**. A BLOCKER whose entire user-visible consequence lives on the branch no
probe entered is a hypothesis. Here it is measured.

**Reproduction.** Playwright, **`devices["iPhone 13"]`** (coarse pointer ⇒ `canHover === false` ⇒ the
Popover branch mounts), with `savedColors` seeded via `addInitScript` so `CurrentPaletteEditor`'s own
`.swatch-row` renders rather than some other component's dots. `pointerdown` + `click` are dispatched
**directly on the node**, which bypasses `pointer-events: none` and Playwright actionability
entirely — so a failure here cannot be blamed on hit-testing:

```js
await ctx.addInitScript(() => {
  localStorage.setItem("color-picker", JSON.stringify({
    inputColor: "rgb(255 0 0)",
    savedColors: ["rgb(255 0 0)", "rgb(0 128 255)", "rgb(0 200 120)"],
  }));
});
// … goto /#/palettes, settle 6s, then, scoped to .swatch-row:
el.dispatchEvent(new PointerEvent("pointerdown", { bubbles: true, cancelable: true }));
el.dispatchEvent(new MouseEvent("click",         { bubbles: true, cancelable: true }));
```

```json
{
  "swatchRowFound": true,
  "solidDots": 3,
  "rootTag": "SPAN",
  "ariaHidden": "true",
  "ariaLabel": null,
  "ariaExpanded": null,
  "dataState": null,
  "pointerEvents": "none",
  "editCopyRemoveVisible": false,
  "afterTap": { "editBtn": false, "copyBtn": false, "removeBtn": false }
}
```

Three swatches present in the component's own row. `aria-expanded: null` and `data-state: null` are
the decisive pair — those are reka-ui's own trigger attributes, and their absence proves the
`as-child` merge reached the DOM with nothing. Tapping produces no `[aria-label^="Edit color"]`,
no `Copy`, no `Remove`, before or after.

**Confirmed: on every touch device, `<template #actions>` (`CurrentPaletteEditor.vue:44-55`) is
unreachable. A user on a phone cannot edit, copy, or remove any colour in their current palette.**
L-12's severity is correct; it now rests on a measurement rather than on a reading of reka-ui.

The same probe re-confirms L-1 on the add slot with a stronger discriminator than pass 3's. The
rendered vnode's own prop keys, read off `__vnode`, are:

```json
"vnodePropKeys": ["aria-hidden", "class", "data-testid", "data-variant", "style"]
```

**No `onClick` exists on the element at all** — so the failure is not `pointer-events`, not
actionability, not a stale handler: there is no listener in the tree to fire. A synthetic click
dispatched straight at the node leaves the swatch count at `7 → 7`. Independently,
`waitForSelector('.add-slot-ghost')` at the default `state: 'visible'` **times out at 20 s**: the
control is not merely inert, it does not satisfy Playwright's definition of a visible element.

---

## L-16 · the divergence is not only alpha — it is **colour space**, and there is a third home

Pass 3 anchors L-16 on alpha. Alpha is the narrower axis. The same predicate fails on a far more
common gesture, and there is a third implementation pass 3 does not list.

**(a) `serializePickerColor` is space-preserving, so the string comparison is space-dependent.**
`demo/color-session/picker-color.ts:206-211` serializes a colour *in its own space* whenever that
space is one of the thirteen in `CSS_PICKER_SPACES` (`:92-95` — `rgb hsl hwb lab lch oklab oklch xyz
srgb-linear display-p3 a98-rgb prophoto-rgb rec2020`). `savedColors` retain the space they were
saved in; `cssColorOpaque` is minted in whatever space the picker is in *now*. Measured against the
shipped artefact, not the source:

```
$ node scratchpad/id2.mjs     # imports ./dist/subpaths/{color,css}.js
ONE physical colour (pure red), three picker spaces:
  rgb  : rgb(255 0 0)
  oklch: oklch(62.795536392143% 0.257683303805 29.233880279628deg)
  hsl  : hsl(0deg 100% 50%)

useSwatchActions.ts:63  savedColorStrings.indexOf(cssColorOpaque)
  -> -1  (-1 == 'not present' == duplicate WILL be added)
```

Save a colour, change the picker's space, press add: the identical physical colour is added a second
time. The picker exposes a space switcher as a primary control (`updateToColorSpace`,
`useColorPipeline.ts:170-173`) and the boot capture shows it sitting in **Lab** — so this is the
default gesture, not an edge. Alpha (pass 3) requires touching the α slider; **space divergence
requires only using the space selector the product is built around.**

**(b) There is a third home, and it disagrees on ordering rather than on membership.**

| # | site | predicate | placement on a hit |
|---|---|---|---|
| 1 | `useSwatchActions.ts:63` | `savedColorStrings.indexOf(cssColorOpaque)` — opaque candidate, space-dependent | `reordered.push(...)` → **END** (`:66`) |
| 2 | `usePaletteWiring.ts:85-89` | `serializePickerColor(c) === newStr` — alpha-bearing | `savedColors.unshift(...)` → **FRONT** (`:98`) |
| 3 | `useColorPipeline.ts:215-217` | `toCSSColorString(c) === toCSSColorString(model.value.color)` | `savedColors.push(...)` → **END** (`:220`) |

Home 2 is absent from pass 3's table, and it is the one the live click path actually reaches:
`addCurrentColor` handles a *hit* itself (move to END) but delegates a *miss* to
`emit("addColor")` → `emitAddColor` → `unshift` (FRONT). So **one button has two orderings**: adding
a new colour prepends it, re-adding an existing one appends it. Neither site can know, because
neither imports the other.

**(c) The guard in home 3 tests a different colour than it inserts.** `useColorPipeline.ts:212-220`:

```ts
function onPaletteAddColor(cssColor: string) {
    const savedColors = [...model.value.savedColors];
    const currentStr = toCSSColorString(model.value.color);      // ← the MODEL colour
    const alreadyExists = savedColors.some((c) => toCSSColorString(c) === currentStr);
    if (alreadyExists) return;
    savedColors.push(parseColor(cssColor));                      // ← the ARGUMENT
```

The parameter is ignored by the guard and is what gets pushed. Whenever a caller adds something
other than the live picker colour the guard answers a question nobody asked. **Reproduction: NONE —
this is a hypothesis**; the code defect is exact and the divergence condition is stated, but I did
not drive a UI path into this fallback (it is the `catch` arm of `usePaletteWiring.ts:101-103`).

**(d) The root cause is a public-surface gap, which strengthens L-15.** value.js exports no colour
equality primitive at all:

```
$ grep -rn "export .*\(equal\|Equal\|sameColor\|compareColor\|colorsEqual\)" src/   → no matches
$ grep -rn "export function \(deltaE\|distance\)" src/                              → no matches
```

The library owns colour semantics and publishes `convertColor`, `mixColors`, `toRgba8`,
`mapColorToGamut` — but not the one predicate its own demo needs three times. Three consumers each
invented a wrong one out of string comparison. That is the same mechanism L-15 names for the colour
*model*, recurring for colour *identity*: **the concept has no published home, so it grew private
ones that disagree.**

---

## L-4 · strengthened: `demo/ui/` is not merely redundant, it is actively forked

Pass 1 establishes that all 19 barrels are pure aliases. The sharper fact is that the alias layer has
already produced a **live dual path**. Programmatic scan of every `demo/**/*.{ts,vue}` import
(excluding `demo/ui/` itself), collecting each symbol's specifier shape:

```
SYMBOLS REACHED BOTH WAYS: ['Dialog','DialogContent','DialogDescription',
                            'DialogFooter','DialogHeader','DialogTitle']
  Dialog: barrel x3  e.g. demo/palettes/browser/dialog/FlagReportDialog.vue
          direct     demo/palettes/PalettesPane.vue           <- @mkbabb/glass-ui/dialog
          direct     demo/palettes/browser/admin/AdminUsersPanel.vue <- @mkbabb/glass-ui/dialog

total barrel import-symbol bindings: 189
distinct glass-ui subpaths reached directly: 17
```

Six symbols, two specifiers, and **both forks are inside `demo/palettes/`** — one of them in
`PalettesPane.vue`, this component's direct parent. Under edict 2 the alias layer was already
condemned as a shim; this promotes it from "redundant indirection" to "a live second path", which is
the thing the edict actually forbids. It also bounds the codemod: 189 bindings, mechanical.

---

## L-10 · strengthened: the orphaned export tree is 914 LoC and its 29 tests are GREEN

Pass 1 proves the dual path and the resolution mechanism (`./export` hits the sibling *file* because
`export/` has no `index.ts`). Two measurements finish it.

**Zero runtime consumers**, confirmed by exclusion rather than by inspection:

```
$ grep -rn "palettes/export/\|\./export/\|\.\./export/" demo --include='*.ts' --include='*.vue' \
    | grep -v "^demo/test/" | grep -v "^demo/palettes/export/"
(no output)

$ wc -l demo/palettes/export/*.ts | tail -1
     914 total
```

**And the suite that certifies it is green**, which is what makes it a false proof rather than
merely dead code:

```
$ npx vitest run demo/test/export/byte-exact.test.ts
 ✓ demo/test/export/byte-exact.test.ts (29 tests) 7519ms
 Test Files  1 passed (1) · Tests  29 passed (29)
```

The two formats are not variants. `export/json.ts` emits an RFC8785-canonicalised
`value.palette-export/v1` document with `contentDigest`, positional ids, per-colour oklch and a
trailing LF, against "Byte authority: Appendix W51 §3". `export.ts:13-23` emits
`JSON.stringify({name, slug, colors:[{css,position,name}]}, null, 2)`. **Twenty-nine green tests
certify bytes no user has ever received, while the bytes every user receives are untested and
unbound by the W51 authority.**

---

## Negatives independently re-verified at `7775473b`

Re-measured cold, not copied forward. All hold.

- **The value.js boundary is clean.** `grep -rn 'from "@src' demo` → 0. `grep -rn 'from
  "@mkbabb/value.js"' demo test src` → 0 (there is no `"."` key in `exports`, so the bare specifier
  would fail for a real consumer too — nothing writes it). Within `demo/palettes/`, the only library
  imports are `mix.ts:14` and `export/png.ts:11`, both `@mkbabb/value.js/color`. Every demo import of
  the library is one a real consumer could write verbatim. **This is why L-15/L-16 are surface *gaps*
  and not boundary violations: the demo consumes the published surface correctly; the surface is
  missing members.**
- **The "three parallel `useDark` stores" suspect named in the brief is cured.** All ten sites route
  to `@mkbabb/glass-ui/dark` (`useMarkdownColors.ts:1`, `ConsoleRail.vue:92`, `HeroBlob.vue:39`,
  `ProfileSection.vue:8`, `MobileMenuDropdown.vue:6`, `useContrastSafeColor.ts:9`, `App.vue:190`,
  `useViewAccents.ts:43`, `useAtmosphere.ts:34`). No local fork survives. The brief's
  `useMarkdownHighlighting.ts:76` pointer is stale.
- **`verbatimModuleSyntax` clean** across the closure (`CurrentPaletteEditor.vue:190`,
  `useSwatchActions.ts:2-3`, `SwatchHoverMenu.vue:60`).
- **`ActionBarLayer`'s local `useLayerTransition`** (`demo/shell/dock/layers/ActionBarLayer.vue:63`)
  is real but is **not** a fork — `:54` records that glass-ui 7 removed the standalone export. It is
  outside this component's subtree; out of scope here, flagged for the `shell/` seat.
- **Route-level capture is clean and that is the point.** All four Safari matrices report
  `/#/palettes` at `overflowX 0`, `pageErr 0`, `consoleErr 0`, `main 1`. Per `REPORT.json` the eight
  `smallTapTargets` belong to `PaletteSlugBar` (22×22 trio) and the picker's channel spans (12×24) —
  none to this component, whose swatches are `w-11 h-11` = 44 px. **The visual audit records zero
  defects here precisely because the broken controls are `aria-hidden` and `pointer-events: none`:
  they are invisible to the probe that would have flagged them.** L-1 and L-12 are structurally
  unreachable by that matrix, which is why they required DOM-level probing. Any future sweep wanting
  to catch this class needs an oracle for *"an element with a click intent that resolves to no
  listener"*, not for blankness or console noise.

---

## Pass-4 evidence appendix — commands run, verbatim

```bash
git rev-parse --short HEAD                                           # 7775473b

# producer contract, from the shipped artefact
node -e "s=require('fs').readFileSync('node_modules/@mkbabb/glass-ui/dist/watercolor-dot.js','utf8');
         for (const k of ['renderSlot','\$slots','slots.default','_ctx.\$slots']) console.log(k, s.includes(k))"
                                                                     # all four false
grep -o 'inheritAttrs:[^,]*' node_modules/@mkbabb/glass-ui/dist/watercolor-dot.js   # inheritAttrs: !1

# L-16(a) space divergence, against dist
node scratchpad/id2.mjs                                              # output pasted above

# L-16(b) the third home
sed -n '75,104p' demo/color-picker/composables/usePaletteWiring.ts    # findIndex + unshift
sed -n '60,74p'  demo/palettes/browser/card/composables/useSwatchActions.ts  # indexOf + push

# L-16(d) the surface gap
grep -rn "export .*\(equal\|Equal\|sameColor\|compareColor\|colorsEqual\)" src/   # 0
grep -rn "export function \(deltaE\|distance\)" src/                             # 0

# L-4 both-ways fork  (python: parse every import block in demo/, excluding demo/ui/)
python3 - <<'PY'   # full script in scratchpad; result pasted above
# … walks demo/**/*.{ts,vue}, classifies each imported symbol as barrel vs direct …
PY

# L-10
grep -rn "palettes/export/\|\./export/\|\.\./export/" demo --include='*.ts' --include='*.vue' \
  | grep -v "^demo/test/" | grep -v "^demo/palettes/export/"          # no output
wc -l demo/palettes/export/*.ts | tail -1                             # 914 total
npx vitest run demo/test/export/byte-exact.test.ts                    # 29 passed

# negatives
grep -rn 'from "@src' demo --include='*.ts' --include='*.vue'          # 0
grep -rn 'from "@mkbabb/value\.js"' demo test src                      # 0
grep -rn "useGlobalDark\|useDark" demo --include='*.ts' --include='*.vue'  # 10 sites, all glass-ui/dark
```

Live probes: 5 read-only Playwright runs against `http://localhost:9000` (2 desktop chromium,
1 iPhone-13 profile with seeded `localStorage`, 2 discarded to selector/settle timing). The two that
decide findings are pasted verbatim above. Images read: `shots/safari-desktop-light/palettes.png`.
`REPORT.json` rows read: all four `/#/palettes` matrices.

**No source file was edited by this pass.** The only writes are this appended section and four probe
scripts in the session scratchpad. Nothing above `# Fourth pass` was altered.

---
---

# Fifth pass — a second dead producer contract, a forked status concept, and the cost of a key's address

## Model receipt (pass 5)

I observe myself to be **Opus 5** (`claude-opus-5[1m]`, the 1M-context variant) — the model this seat
was explicitly spawned with. Declared, not inherited.

## Substrate

| | |
|---|---|
| HEAD **as observed** | `f36f780c` — `docs(V·mega): STATE — three OM censuses complete, findings at MT-F043`. The brief said `c654824e` (confirmed an ancestor: `git merge-base --is-ancestor c654824e HEAD` → YES). Five different trees across five passes: `041ca263` → `5c13465d` → `7775473b` → `f36f780c`. Anchor on the stamp. |
| Producer | `@mkbabb/glass-ui` **7.0.0** (`node -e "require('./node_modules/@mkbabb/glass-ui/package.json').version"`) |
| Live substrate | dev server `http://localhost:9000` (HTTP 200), driven read-only with Playwright |
| Method | Ran cold against the subject, the producer's `.d.ts` surface and the demo module graph, *then* read passes 1–4 to avoid re-reporting. Findings L-20…L-25 are new; L-22 **amends the cure of pass-1 L-7**. |

Passes 1–4 hunted `WatercolorDot`. This pass asks the question one level out: **which *other* producer
contracts does this component write against, and are any of them equally dead?** The answer is yes —
and the second one is not a leaf primitive, it is `Button`, at 51 sites.

---

## L-20 · MAJOR — `Button variant="…"` is a second dead producer contract: 51 sites address an axis glass-ui 7 replaced

`CurrentPaletteEditor.vue` mounts three glass-ui `Button`s and gives each a `variant`:

```
:134   <Button variant="outline" icon-only …>   ← the save-palette confirm
:151   <Button variant="outline" size="sm" …>   ← "Update" (duplicate-name branch)
:159   <Button variant="ghost"   size="sm" …>   ← "Cancel"
```

**Glass 7's `Button` has no `variant` prop.** The shipped declaration
(`node_modules/@mkbabb/glass-ui/dist/components/button/Button.vue.d.ts`) is exhaustive:

```ts
export type ButtonEmphasis = "primary" | "secondary" | "quiet" | "text";
export interface ButtonProps extends PrimitiveProps {
    emphasis?: ButtonEmphasis;   // "Visual priority. It does not change the command's semantics."
    tone?: Tone;                 // "Semantic intent, orthogonal to emphasis."
    size?: ButtonSize; iconOnly?: boolean; loading?: boolean;
    type?: …; disabled?: …; class?: …;
}
```

and the runtime carries no such prop either:

```
$ node -e "const s=fs.readFileSync('node_modules/@mkbabb/glass-ui/dist/button.js','utf8');
           console.log(s.match(/variant:\{[^}]*\}/g))"
NONE
```

The producer even documents the migration in the *sibling* component's declaration
(`Badge.vue.d.ts`), which kept `variant` as a style plate and added `tone`:

> "the semantic status register (the shared `tone` axis …). Orthogonal to the `variant` STYLE plate;
> a set tone overrides the plate colour. **Replaces the former `variant="destructive|success|warning|info"`
> (a tone is not a style).**"

### Measured live — the prop falls through to the DOM and the intent is lost

`http://localhost:9000/#/palettes`, 1440×900, `savedColors` seeded (scratchpad `cpe-L5-button.mjs`):

```json
{
  "domVariantAttrCount": 3,
  "domVariantAttrTags": ["BUTTON[variant=outline]", "BUTTON[variant=ghost]", "BUTTON[variant=outline]"],
  "buttonsWithVariantAttr": [
    { "label": "Login",      "attrVariant": "outline", "dataEmphasis": "secondary", "dataTone": "neutral" },
    { "label": "@mbabb",     "attrVariant": "ghost",   "dataEmphasis": "secondary", "dataTone": "neutral" },
    { "label": "(nameless)", "attrVariant": "outline", "dataEmphasis": "secondary", "dataTone": "neutral",
      "cls": "button tap-squish focus-ring glass-wash glass-capsule glass-capsule-hover h-8 w-8 rounded-full …" }
  ],
  "dataEmphasisNodes": 3
}
```

Three facts, each decisive:

1. **`variant` reached the DOM as a literal attribute** (`<button variant="outline">`). That is the
   signature of a prop the component does not declare: Vue passed it through as a fallthrough attr.
   It is also invalid HTML — no such attribute exists on `<button>`.
2. **`outline` and `ghost` render identically** — both `data-emphasis="secondary" data-tone="neutral"`,
   the component defaults. Two authored intents collapse to one plate. The third row is this
   component's own save button (`.dashed-well`'s only control, matching pass-3 L-19).
3. **`dataEmphasisNodes: 3`** — three glass-ui `Button`s are mounted on this route, and *all three*
   address the design system through the dead axis. **Zero** use `emphasis`/`tone`.

### The blast radius, censused

```
$ python3  # parse every <Button …> tag in demo/**/*.vue
Button variant values: {'outline': 28, 'ghost': 19, 'destructive': 1, 'default': 1, 'primary-audacious': 2}
                       total 51 across 22 files
Button emphasis: 2      Button tone: 2
```

**51 dead `variant` bindings against 4 live `emphasis`/`tone` bindings.** Seventeen of the 22 files are
inside `demo/palettes/`. The two live ones are in this component's own parent
(`PalettesPane.vue:113` `emphasis="text"`, `:116` `tone="destructive"`) — so **the same file uses both
vocabularies**: `:63` still writes `variant="ghost"`. The migration touched two lines of one dialog
footer and stopped.

And no authored value is even a member of the new vocabulary (`primary | secondary | quiet | text`):
`outline`, `ghost`, `default`, `destructive` are the shadcn-era plate names, and
**`primary-audacious`** (`MixConfigBar.vue:163`, `GenerateControls.vue:158`) is not a member of *any*
vocabulary the producer has ever shipped — it is a string invented for a plate that no longer exists.

### Why this is a library-structure finding, and why nothing caught it

This is pass-1 **L-2's mechanism reproduced on a second primitive**, which retires L-2 from
"a claim about one component" to "a property of the seam": Vue's fallthrough-attr rule makes an
unknown prop *legal TypeScript*, so `vue-tsc -p tsconfig.demo.json --noEmit` is green over all 51.
But there is a sharper structural cause here that L-2 does not name, and it is **L-4's alias layer**:

```
demo/ui/button/index.ts   →   export { Button } from "@mkbabb/glass-ui";
```

Because every consumer imports `Button` from `../../../ui/button`, the Glass 6 → 7 upgrade changed
**no import specifier anywhere in the demo**. A producer that renames a component's entire prop axis
normally announces itself at the import site; the alias layer swallowed the announcement. L-4 charged
`demo/ui/` with being redundant and, at pass 4, with hosting a live dual path. This is the third and
worst charge: **it is a signal absorber.** The demo pays a directory of zero-logic modules for the
privilege of not noticing that its design system changed.

**Cure (transposition).** Delete `demo/ui/` (L-4) so the specifier is `@mkbabb/glass-ui/button` at
every call site, then codemod the axis: `variant="outline"|"ghost"` → `emphasis="secondary"|"quiet"`
(the producer's stated equivalents), `variant="destructive"` → `tone="destructive"`,
`variant="default"` → nothing (it is the default), and `primary-audacious` → an
`emphasis="primary"` + a named glass-ui plate if the audacious register is wanted — in glass-ui,
per edict 4, not as a string the producer ignores. Then make the seam nominal (L-2's cure): with
`demo/ui/` gone and a `satisfies ButtonProps` object or an excess-property-checked spread, the 51st
site fails the build instead of the eye.

---

## L-21 · MAJOR — the status affordance this component imports is a fork of a tested resolver, and both render at once

`CurrentPaletteEditor.vue:116` mounts `<ApiOfflineChip>`, imported at `:193` from
`../status/ApiOfflineChip.vue`. Passes 1/3 charged that import with bypassing a barrel (L-6, L-18).
The larger fact is what is *inside* the file.

**One concept, two homes.**

| | `demo/palettes/browser/status/ApiOfflineChip.vue` | `demo/shell/dock/status-lamp.ts` + `DockStatusLamp.vue` |
|---|---|---|
| resolver | inline in the SFC: `availability.value === "unavailable"` / `=== "misconfigured"` (`:36-37`) | `resolveLampState(availability, isDev)` — **pure, total, exported** (`status-lamp.ts:46-65`) |
| tests | **none** (`grep -rln "ApiOfflineChip\|api-offline-chip" test/ demo/test/ e2e/` → no output) | **6** (`grep -c "it(" test/status-lamp.test.ts` → 6) + `e2e/smoke/oracles/o22-status-lamp.spec.ts` |
| dev gate | **none** — the chip ships in production | `if (!isDev) return null` — "the lamp ships dark in production" |
| labels | hard-coded in the template | returned by the resolver |
| roles | `alert` / `status`, hard-coded | `role: "alert" \| "status"` in `LampState` |

`status-lamp.ts`'s own header claims the two are one register — *"speaking the instrument register the
per-surface `ApiOfflineChip` already speaks … one status language, two seats"* — and
`DockStatusLamp.vue`'s style comment repeats it: *"in the ApiOfflineChip's exact register (small-caps
mono caption, hairline edge, pill radius)"*. **A comment is not a mechanism.** Measured:

```
$ python3  # normalize both <style scoped> blocks to (property, value) pairs
ApiOfflineChip declarations: 28 distinct: 24
DockStatusLamp declarations: 34 distinct: 33
IDENTICAL (property:value) pairs shared: 19
```

19 of the chip's 24 distinct declarations are byte-identical to the lamp's — `font-variant:
small-caps`, `letter-spacing: 0.06em`, `font-size: var(--type-mono-caption, 0.6875rem)`,
`border: 1px solid var(--card-edge)`, `color: color-mix(in oklab, var(--foreground) 72%, transparent)`,
`background: color-mix(in oklab, var(--background) 55%, transparent)`, the 0.4rem dot, the
destructive mixes. Of the 5 that differ, three differ only in whitespace and **two have already
drifted**:

| | chip | lamp |
|---|---|---|
| `padding` | `0.3rem 0.7rem` | `0.3rem 0.55rem` |
| `border-radius` | `var(--radius-pill)` | `var(--radius-pill, 9999px)` |

And the pulse is **two keyframes with identical bodies under two names** —
`@keyframes offline-dot-pulse` and `@keyframes lamp-dot-pulse`, both
`0%,100%{opacity:1} 50%{opacity:0.35}`, both `2.4s var(--ease-standard) infinite`, each locked inside
a scoped SFC. `demo/styles/animations.css` — the declared home for global keyframes (edict 6) —
contains no pulse at all (`grep -rn "pulse" demo/styles/*.css` → no output).

### Measured live: two `role="alert"` regions with byte-identical text

Prior evidence recorded this as unreproduced — `registry/harvest/area-shell.json:4518`:
*"**HYPOTHESIS (not reproduced)**: with ≥1 saved colour on /#/palettes both seats render
simultaneously as two `role="alert"` nodes with identical text — measured
`document.querySelectorAll('[role="alert"]').length === 1` on an empty session because
`CurrentPaletteEditor.vue:116`'s `v-if="savedColorStrings.length > 0"` gate was false."*

Seeding the gate open reproduces it (scratchpad `cpe-L5-probe.mjs`, `savedColors` = 3 colours):

```json
{
  "liveRegionCount": 3,
  "liveRegions": [
    { "role": "alert", "cls": "dock-status-lamp fira-code",
      "text": "dev misconfigured — run `npm run dev`", "owner": "dock band",
      "padding": "4.8px 8.8px",  "animName": "lamp-dot-pulse-45530b34" },
    { "role": "alert", "cls": "api-offline-chip api-misconfig-chip fira-code self-start",
      "text": "dev misconfigured — run `npm run dev`", "owner": "CurrentPaletteEditor(.dashed-well)",
      "padding": "4.8px 11.2px", "animName": "offline-dot-pulse-cb533f05" },
    { "role": "status", "text": "· empty plate ·No saved palettes yet.…" }
  ],
  "chipPresent": true, "lampPresent": true, "identicalText": true
}
```

**HYPOTHESIS → CONFIRMED.** Two `role="alert"` live regions, byte-identical text, 400 px apart, with
the measured padding drift visible (`8.8px` vs `11.2px`) and two separately-hashed copies of the same
animation. A screen reader announces the identical alert twice.

### The structural mechanism — and it is the interesting part

The resolver is *right*: pure, total, `(availability × dev-gate) → LampState | null`, six tests, a
matching e2e oracle. It is simply **at the wrong address**. It lives in `demo/shell/dock/`, so a
feature seat in `demo/palettes/browser/status/` cannot consume it without minting a
**feature → shell** import — precisely the boundary the brief names. Faced with that, the feature did
the locally-correct thing and re-derived the matrix in two computeds.

The concept's real owner is neither: `ApiAvailability` is defined in
`demo/platform/transport/availability.ts`, and both seats already inject `useApiClient()` from
`demo/platform/transport/useApiClient.ts`. **The resolver belongs beside the state it resolves.**
Measured cones make the misplacement concrete:

```
demo/shell/dock/status-lamp.ts                     modules= 2  LoC=  260
demo/palettes/browser/status/ApiOfflineChip.vue    modules= 5  LoC=  566
```

Two modules. Moving `resolveLampState` from `shell/dock/` to `platform/transport/` costs nothing and
converts an unreachable dependency into a shared one.

**Cure (transposition, not patch).**
1. `resolveLampState` + `LampState` move to `demo/platform/transport/status.ts`, beside
   `ApiAvailability` (no new `shared/` dir — `platform/transport/` already exists; edict 3). The six
   tests move with it unchanged.
2. Both seats become thin consumes of one resolver. The chip inherits the dev gate or explicitly
   declines it — **as a decision, not as an omission**, because today the chip will render the
   developer-facing string ``dev misconfigured — run `npm run dev` `` to an end user in a production
   build if the latch ever trips, and the lamp deliberately will not.
3. The shared *register* — small-caps mono caption, hairline edge, pill radius, status pulse — is one
   glass-ui atom (`Chip` already exists: `node_modules/@mkbabb/glass-ui/dist/chip.js`), not 19
   duplicated declarations across two scoped `<style>` blocks. That is edict 4 and edict 5 in one
   move, and it takes the keyframe with it into a place where it can be tokenized rather than cloned.
4. Only one of the two may be a live region on any given route. Two `role="alert"` nodes with the
   same text is not a design; it is the absence of one.

---

## L-22 · MAJOR (amends pass-1 L-7's cure) — the palette ports' injection keys are colocated with a 275-line provider, so the contract costs its implementation

Pass-1 L-7 is right that this component should inject `LIBRARY_PORT_KEY` / `COLOR_TARGET_PORT_KEY`
instead of taking 4 props and 8 emits. **Its cure as written cannot be executed cheaply**, because of
where those keys live.

```
$ grep -n "^export const .*_KEY" demo/palettes/usePalettePorts.ts
271: export const SESSION_PORT_KEY … 272: LIBRARY_PORT_KEY … 273: BROWSE_PORT_KEY …
274: ADMIN_PORT_KEY … 275: COLOR_TARGET_PORT_KEY
$ wc -l demo/palettes/usePalettePorts.ts      →  275
```

All five injection keys are declared in the same module as `providePalettePorts`, which **value-imports
16 composables** (`usePaletteStore`, `useBrowsePalettes`, `useAdminUsers`, `useAdminAudit`,
`useAdminFlagged`, `useAdminTags`, `useVersionHistory`, `useTagEdit`, `useSlugMigration`,
`useColorNameQueue`, `usePaletteActions`, `useFilteredList`, the three auth composables). An
injection key is a **contract**; a provider is an **implementation**. Colocating them makes every
consumer of the contract depend on the whole implementation cone.

Measured — transitive walk of relative imports, counting only value (non-type-only) edges:

| entry | runtime modules | runtime LoC |
|---|---:|---:|
| `demo/palettes/usePalettePorts.ts` | **26** | **2,971** |
| `demo/color-session/keys.ts` | **1** | **27** |

(Full graph including type-only edges: 92 modules / 9,482 LoC vs 18 / 2,035. `keys.ts`'s entire cone
is type-only and erases at build; `usePalettePorts`' is not.)

**The repo already contains the correct idiom, and this component already uses it.**
`demo/color-session/keys.ts` is keys-and-types only — five `InjectionKey` symbols, every import an
`import type`. `CurrentPaletteEditor.vue:173` reaches it for `SAFE_ACCENT_KEY` and pays 27 lines.
`useSwatchActions.ts:4` reaches it for `EDIT_TARGET_KEY` and pays the same 27. The palettes feature
does the opposite of its sibling.

The bill is already being paid elsewhere: **five shell/dock modules import `SESSION_PORT_KEY`** —
`Dock.vue:18`, `DockViewSelect.vue:8`, `SlugEditLayer.vue:5`, `MobileMenuDropdown.vue:13`,
`ProfileSection.vue:14` — each pulling a 26-module / ~3k-LoC cone including the entire admin API
surface to obtain one `Symbol()`. Following L-7's cure without this move would add
`CurrentPaletteEditor` to that list.

**Cure.** Split `demo/palettes/ports.ts` (keys + port interfaces, `import type` only, ~60 lines) from
`demo/palettes/usePalettePorts.ts` (the provider). Consumers import the former; only the app root
imports the latter. That is a mechanical file split with no behaviour delta, it makes L-7's cure free,
and it is the same shape `color-session/` already ships.

---

## L-23 · MINOR — `TooltipProvider` is mounted per call-site, so a house timing decision has four values

`CurrentPaletteEditor.vue:88` opens a provider **inside its `TransitionGroup`**, around a single
trigger:

```vue
<TooltipProvider :delay-duration="200">
    <Tooltip><TooltipTrigger as-child>…</TooltipTrigger><TooltipContent>…</TooltipContent></Tooltip>
</TooltipProvider>
```

Census of the whole demo:

```
$ grep -rn "<TooltipProvider" demo --include='*.vue'          → 4
demo/scenes/about/ColorNutritionLabel.vue:97                    delay-duration="100"
demo/picker/controls/ComponentSliders/ConsoleRail.vue:23        delay-duration="300"
demo/shell/dock/ColorInput.vue:30                               delay-duration="200"
demo/palettes/browser/card/CurrentPaletteEditor.vue:88          delay-duration="200"
$ grep -rn "TooltipProvider" demo/color-picker/App.vue demo/shell/*.vue   → (no output)
```

**Four providers, zero at app root, three different delays.** A `TooltipProvider` is a *scope*
primitive, not a decoration: reka-ui uses it to share open/close and skip-delay state across the
tooltips beneath it. Four isolated providers means the grouping behaviour never spans them — moving
between two tooltips in different providers re-incurs the full delay — and "how long before a tooltip
appears" becomes a per-instance decision with no house value, which is edict 5 (root-level styling,
never per-instance overrides) applied to motion timing.

**Cure.** One `<TooltipProvider>` at the app root with the house delay expressed as a token, and the
four local providers deleted. If a surface genuinely needs a different delay, that is a *named*
register in glass-ui, not a magic number at a call site.

---

## L-24 · MINOR — `demo/palettes` and `demo/shell` are mutually dependent; neither tree is extractable

```
$ grep -rn 'shell/' demo/palettes --include='*.ts' --include='*.vue'
demo/palettes/usePalettePorts.ts:19: import type { ViewId } from "../shell/useViewManager";

$ grep -rn 'palettes/' demo/shell --include='*.ts' --include='*.vue'
demo/shell/usePaneRouter.ts:70,71,76      → PalettesPane / BrowsePane / AdminPane (lazy)
demo/shell/dock/Dock.vue:18               → SESSION_PORT_KEY
demo/shell/dock/DockViewSelect.vue:8      → SESSION_PORT_KEY
demo/shell/dock/layers/SlugEditLayer.vue:5      → SESSION_PORT_KEY
demo/shell/dock/menus/MobileMenuDropdown.vue:13 → SESSION_PORT_KEY
demo/shell/dock/menus/ProfileSection.vue:14     → SESSION_PORT_KEY
```

The shell→feature edge is legitimate composition (a router mounts panes; a dock reads a session
port). The feature→shell edge is not: `PalettePortsDeps` is parameterised by the shell's **view
vocabulary** (`currentView: Ref<ViewId>`, `switchView: (id: ViewId) => void`), so the palette
feature's port *contract* cannot be stated without naming the shell's routes. The type import erases
at runtime, so this is not a load-time cycle — but it is a genuine cycle in the dependency lattice,
and it means neither directory can be lifted, tested, or reasoned about alone.

**Cure.** Invert it: the ports declare `onNavigate: (intent: "library" | "browse") => void` — a
*feature-owned* vocabulary — and the app root (which already owns both) adapts intents to `ViewId`.
The feature stops knowing the shell exists; the shell keeps knowing the feature does. One direction,
which is the whole point of a lattice.

---

## L-25 · MINOR — `EditTarget.paletteId` is a two-kind union flattened into `string`, discriminated by a sentinel

```ts
// demo/color-session/color-model.ts:19-23
export interface EditTarget { paletteId: string; colorIndex: number; originalCss: string; }
// demo/palettes/constants.ts:9
export const CURRENT_PALETTE_ID = "__current__";
```

Two consumers branch on the sentinel to decide which *store* they are editing:

```
useSwatchActions.ts:26   et.paletteId === CURRENT_PALETTE_ID && et.colorIndex === index
usePaletteActions.ts:100 if (paletteId === CURRENT_PALETTE_ID) { …write the draft buffer… }
                         else …resolve against the local palette store by id…
```

The field carries two disjoint kinds — "the in-memory draft buffer" and "a saved palette's local store
key" — in one `string`, and the two live in **one namespace by construction**: `Palette.id` is
documented (`types.ts:15-27`) as `crypto.randomUUID()` *or* a `gen-`/`mix-`/`__extracted__` temp
prefix, i.e. the same underscore-sentinel shape. Nothing prevents a future temp prefix from colliding,
and nothing tells a new consumer that the branch exists — `constants.ts`'s doc comment is the only
record, and it is in a third file.

This is the same disease as pass-3 L-16 one level up: a domain distinction with no type. **Cure:**
`type EditTarget = { kind: "draft"; colorIndex: number; originalCss: string } | { kind: "saved";
paletteId: string; colorIndex: number; originalCss: string }`. The sentinel and `constants.ts` both
delete themselves, and both branches become exhaustive rather than remembered.

---

## Re-verification of prior passes at `f36f780c`

Re-measured cold this pass. Everything load-bearing still holds.

| claim | re-measured | result |
|---|---|---|
| L-1 · the add slot has **no click listener at all** | live vnode read: `vnodePropKeys: ["aria-hidden","class","data-testid","data-variant","style"]`; `tag: "SPAN"`, `ariaHidden: "true"`, `ariaLabel: null`, `pointerEvents: "none"`, `hasSvgPlus: false` | **CONFIRMED** — no `onClick`, no `aria-label`, no `<Plus>` |
| L-1 · the e2e guard still targets the dropped name | `grep -n "Add current color" e2e/smoke/flows/palette-save.spec.ts` → `:35 getByRole("button", { name: /Add current color .* to palette/ })` | **CONFIRMED** — the selector is unchanged, so the guard is still red |
| L-19 · the only real button is nameless | live: `.dashed-well` controls = `[INPUT "Palette 1", BUTTON "(nameless)"]` | **CONFIRMED** |
| negative · no deep `src/` reach, no illegal specifier | `grep -rEn 'from "(\.\./)+src/\|@src/\|value\.js/(dist\|src)/' demo` → **0**; `exports` keys = `./color ./value ./css ./easing ./math ./transform ./quantize` | **CONFIRMED** |
| negative · this component imports the library not at all | `grep -rn "@mkbabb/value" demo/palettes/browser/card/ demo/palettes/types.ts demo/palettes/constants.ts` → no output | **CONFIRMED** — correct for a UI leaf |
| negative · the card composables are not forked | `useHoverPopover` → 2 consumers (`useSwatchActions.ts:40`, `PaletteCard.vue:255`); `useLeaveTimer` → 1 (`useHoverPopover.ts:18`); `useHeightTransition` → 1 (`PaletteCard.vue:276`) | **CONFIRMED** — one home each, no dead module |
| negative · `verbatimModuleSyntax` clean | `CurrentPaletteEditor.vue:190`, `useSwatchActions.ts:2-3` all `import type` | **CONFIRMED** |

### Visual cross-check (image read directly this pass)

`shots/safari-desktop-light/palettes.png`: the "Start a new palette" well shows a lone dashed pink
silhouette with **no `+` glyph** — pass 1/2's reading of the deleted `<slot/>` stands. Two further
things are visible now that L-20 and L-21 are on the table:

- The dock's **Login** pill renders as a filled glass capsule, not an outline — the live-measured
  `variant="outline"` → `data-emphasis="secondary"` collapse, visible in the capture.
- **No status chip appears in the well** — because the capture ran with zero saved colours, so
  `v-if="savedColorStrings.length > 0"` was false. That is exactly why the double-`role="alert"` of
  L-21 was recorded as an unreproduced hypothesis: the visual matrix photographs the one state in
  which the defect is invisible. Both L-20 and L-21 needed the DOM, not the picture, and L-1/L-12
  needed it before them. **Three passes of route-level capture have now missed four defects on this
  one route for the same reason: the oracles ask "did it paint and did it error", and every defect
  here is a control that paints beautifully and errors never.**

---

## Supplement to the findings table (pass 5)

| id | sev | finding | anchor |
|---|---|---|---|
| L-20 | MAJOR | **Second dead producer contract.** `Button variant=` is not a Glass 7 prop (`emphasis`+`tone` replaced it); **51 sites / 22 files** vs 4 live `emphasis`/`tone`; measured DOM fallthrough `<button variant="outline">` and all 3 mounted Buttons collapsing to `data-emphasis="secondary" data-tone="neutral"`; `primary-audacious` belongs to no vocabulary. `demo/ui/`'s alias layer is why the upgrade changed no import specifier and announced nothing. | `CurrentPaletteEditor.vue:134,151,159`; `Button.vue.d.ts`; probe output |
| L-21 | MAJOR | The `ApiOfflineChip` this component mounts **forks** `status-lamp.ts`'s pure, 6-test-covered `resolveLampState`; 19/24 identical CSS declarations, two identically-bodied keyframes, already drifted on padding + radius; chip is not dev-gated, lamp is. **Two `role="alert"` regions with byte-identical text render simultaneously (HYPOTHESIS → CONFIRMED).** Cause: the resolver is homed in `shell/`, unreachable from the feature. | `ApiOfflineChip.vue:36-37,116` vs `demo/shell/dock/status-lamp.ts:46-65`; probe output |
| L-22 | MAJOR | Injection keys colocated with a 275-line provider that value-imports 16 composables: the contract costs **26 runtime modules / 2,971 LoC**, against **1 / 27** for the correct in-repo idiom (`color-session/keys.ts`). 5 shell/dock files already pay it for one `Symbol`. **Amends L-7's cure.** | `usePalettePorts.ts:1-19,271-275` |
| L-23 | MINOR | `TooltipProvider` mounted per call-site — 4 providers, 0 at app root, 3 different `delay-duration` values (100/200/300). A scope primitive and a house timing token decided per instance (edict 5). | `CurrentPaletteEditor.vue:88` + 3 |
| L-24 | MINOR | `demo/palettes` ↔ `demo/shell` mutual dependency: the palette ports' contract is parameterised by the shell's `ViewId`; 5 shell files import the feature's `SESSION_PORT_KEY`. Neither tree is extractable. | `usePalettePorts.ts:19`; 5 shell sites |
| L-25 | MINOR | `EditTarget.paletteId: string` flattens two disjoint kinds (draft buffer vs saved-palette key) discriminated by the `"__current__"` sentinel, in a namespace shared with `__extracted__`-prefixed temp ids; 2 consumers branch on it. | `color-model.ts:19-23`; `constants.ts:9`; `useSwatchActions.ts:26`; `usePaletteActions.ts:100` |

**Pass-5 verdict: DEFECTIVE, unchanged.**

**Strongest defect overall: L-1** (re-confirmed here from the vnode props — there is no listener in
the tree). **Strongest *new* defect: L-20**, because it converts pass-1 L-2 from a claim into a law.
L-2 said "the `.d.ts` boundary catches nothing"; it had one instance. L-20 supplies the second
primitive, the 51-site census, and the *reason*: `demo/ui/`'s alias layer means a major producer
upgrade can change every prop axis in the design system without changing one character of any
consumer's import. `WatercolorDot` broke loudly (a control that does nothing). `Button` broke
silently (a design system rendering every command at one emphasis). The second is worse, because
nothing will ever report it.

**Amendment to the pass-3 three-move retirement.** Move 3 ("delete the alias layers") is not "pure
subtraction, no behaviour delta" — that was true of the deletion and false of what the deletion
*reveals*. Deleting `demo/ui/` exposes 51 dead `variant` bindings that must be migrated in the same
change. Sequencing it after moves 1–2 is right; costing it as free is not. The corrected ranking:

1. **glass-ui ships `./swatch`** (a real `<button>` hosting the paint, owning `btn-interactive`) →
   closes L-1, L-3, L-5, L-12, L-19's class.
2. **value.js publishes its model** (`makeColor`, `SPACE_SCHEMA`, `SPACE_IDS`, `isAnyColor`,
   `withChannel`/`withAlpha`, `colorsEqual`) → closes L-15, gives L-9/L-16/L-25 one home.
3. **Delete `demo/ui/` *and migrate the Button axis in the same commit*** → closes L-4, L-20, and
   makes L-2's seam nominal. This is the largest of the three and the only one with a behaviour delta.
4. **Re-home the two misplaced modules**: `resolveLampState` → `platform/transport/` (L-21), the port
   keys → `palettes/ports.ts` (L-22). Two file splits, no behaviour delta, and they unblock L-7.

Every one of these is a surface that was wrong before `CurrentPaletteEditor.vue` was written. Pass 3's
closing sentence stands verbatim and this pass adds nothing to contradict it: **the component is a
faithful reader of the surfaces it was given.**

---

## Pass-5 evidence appendix — commands run, verbatim

```bash
git rev-parse HEAD                                    # f36f780c…
git merge-base --is-ancestor c654824e HEAD && echo YES # YES
node -e "console.log(require('./node_modules/@mkbabb/glass-ui/package.json').version)"  # 7.0.0

# L-20 · the dead axis
cat node_modules/@mkbabb/glass-ui/dist/components/button/Button.vue.d.ts   # emphasis|tone, NO variant
node -e "s=fs.readFileSync('node_modules/@mkbabb/glass-ui/dist/button.js','utf8');
         console.log(s.match(/variant:\{[^}]*\}/g))"                        # NONE
python3  # parse every <Button|Badge|Input …> tag in demo/**/*.vue:
        # Button variant 51 (outline 28, ghost 19, destructive 1, default 1, primary-audacious 2)
        # Button emphasis 2 · Button tone 2 · Badge variant 7 (LEGAL — Badge kept it) · Input size 6
node scratchpad/cpe-L5-button.mjs                     # DOM fallthrough, output pasted above

# L-21 · the forked status concept
python3  # normalize both <style scoped> blocks → 19 identical (property,value) pairs of 24
grep -c "it(" test/status-lamp.test.ts                # 6
grep -rln "ApiOfflineChip\|api-offline-chip" test/ demo/test/ e2e/   # no output
grep -rn "pulse" demo/styles/*.css                    # no output (no global keyframe home)
node scratchpad/cpe-L5-probe.mjs                      # 2× role=alert, identical text — pasted above

# L-22 · the cost of a key's address
wc -l demo/palettes/usePalettePorts.ts                # 275
python3  # transitive relative-import walk, value edges only:
        # usePalettePorts.ts  26 modules / 2971 LoC   |   color-session/keys.ts  1 / 27

# L-23 / L-24 / L-25
grep -rn "<TooltipProvider" demo --include='*.vue'    # 4 mounts, delays 100/200/200/300
grep -rn 'shell/' demo/palettes --include='*.ts' --include='*.vue'   # 1 (ViewId, type-only)
grep -rn 'palettes/' demo/shell --include='*.ts' --include='*.vue'   # 8 (5× SESSION_PORT_KEY)
grep -rn "CURRENT_PALETTE_ID\|__current__" demo src test e2e        # 6 sites, 2 branching

# re-verification + negatives
node scratchpad/cpe-L5-final.mjs                      # add-slot vnode props, well roster — pasted
grep -n "Add current color" e2e/smoke/flows/palette-save.spec.ts    # :35 selector unchanged
grep -rEn 'from "(\.\./)+src/|@src/|value\.js/(dist|src)/' demo | wc -l   # 0
node -e "console.log(Object.keys(require('./package.json').exports).join(' '))"
                                                      # ./color ./value ./css ./easing ./math ./transform ./quantize
grep -rn "useHoverPopover\|useLeaveTimer\|useHeightTransition" demo   # 1–2 consumers each, no fork
```

Live probes: **3** read-only Playwright runs against `http://localhost:9000` (chromium, 1440×900,
`localStorage` seeded via `addInitScript`); all three are pasted verbatim above. Images read
directly: `shots/safari-desktop-light/palettes.png`. `REPORT.json` `/#/palettes` rows re-read.

**No source file was edited by this pass.** The only writes are this appended section and three probe
scripts in the session scratchpad. Nothing above `# Fifth pass` was altered.
