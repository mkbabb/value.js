# CHALLENGE-C — `SwatchHoverMenu.vue` implementation audit

## Model receipt

I observe myself to be **Opus 5** (`claude-opus-5[1m]`, 1M-context variant), the model this seat
was explicitly spawned with. Declared, not inherited.

---

## Verdict

**DEFECTIVE — BLOCKER.**

`demo/palettes/browser/card/SwatchHoverMenu.vue` is **non-functional on every input modality it
claims to serve.** Both of its two branches are dead:

- the **hover** branch renders its action panel as an **unstyled, full-viewport-width,
  `position: static` block at the very bottom of `<body>`, below the fold** — because the
  `.floating-panel` class it depends on has **zero CSS rules anywhere in the shipped app**;
- the **touch** branch can **never open**, because `PopoverTrigger as-child` forwards the entire
  trigger contract (`onClick`, `id`, `aria-*`, `data-state`, `ref`) through `$attrs` into a
  glass-ui 7 `WatercolorDot` that declares `inheritAttrs: false` and forwards **only `class` and
  `style`** — and hard-codes `pointer-events: none` besides.

The swatch itself is not a button, has no accessible name, is not focusable, and cannot receive a
pointer event. `tag="button"` and `:aria-label` at lines 17–18 and 32–33 are passed to a component
that has no such props and drops them.

Three hard CI gates are green over all of it.

---

## Method / evidence base

| probe | what it decided |
|---|---|
| `grep -r floating-panel` across repo + `node_modules/@mkbabb/glass-ui/**` | the class is defined nowhere |
| live CSSOM scan over all 32 stylesheets at `localhost:9000` | zero rules match `.floating-panel` |
| live probe element with `class="floating-panel"` | `position: static`, no bg, no shadow, no z-index, no animation |
| trusted Playwright `hover()` on a real swatch + `getBoundingClientRect()` | panel at `[0, 900, 1440, 40]` vs anchor `[768, 349, 48, 54]` |
| element screenshot of the live panel | `evidence/floating-panel-orphan.png` |
| read of compiled `node_modules/@mkbabb/glass-ui/dist/watercolor-dot.js` | `inheritAttrs:!1`; hard-coded `span` + `aria-hidden:"true"` + `pointerEvents:"none"`; only `attrs.class`/`attrs.style` forwarded |
| read of `node_modules/reka-ui/dist/Popover/PopoverTrigger.js` + `Primitive.js` + `Slot.js` | the trigger contract travels as vnode props → `$attrs` |
| `npx vue-tsc -p tsconfig.demo.json --noEmit` | **exit 0** |
| `grep -rn SwatchHoverMenu test/ e2e/` | **zero tests** |
| live a11y query for the e2e's own locator | 0 matching elements |

Dev server: `http://localhost:9000`, HEAD `c654824e`, branch `tranche-u`.
Screenshots written to `docs/tranches/V/megatranche/audit/components/SwatchHoverMenu/evidence/`.

---

## C-1 — BLOCKER — `.floating-panel` has no CSS; the hover panel renders at the bottom of `<body>`

**File**: `demo/palettes/browser/card/SwatchHoverMenu.vue:42`

```
class="floating-panel"
```

The class was defined in `demo/@/styles/floating-panel.css` until commit **`c84504d3`**
(2026-03-25, *"refactor(demo): migrate dock, styles, and composables to glass-ui"*), whose message
claims the deleted stylesheets are *"now provided by `@import "@mkbabb/glass-ui/styles"`"*. They
are not. The deleted rule was:

```css
.floating-panel {
    position: fixed;
    z-index: var(--z-overlay);
    border-radius: var(--radius-xl);
    border: 1px solid hsl(var(--border) / 0.6);
    background: hsl(var(--card) / 0.75);
    backdrop-filter: blur(12px) saturate(1.3);
    box-shadow: var(--glass-shadow-elevated);
    pointer-events: auto;
    animation: floating-panel-in var(--duration-fast) var(--ease-decelerate);
}
```

**Proof the producer does not supply it:**

```
$ grep -rl "floating-panel" node_modules/@mkbabb/glass-ui/
                                     (no output)
$ grep -c "floating-panel" node_modules/@mkbabb/glass-ui/dist/glass-ui.css
0
```

**Proof in the live app** — CSSOM scan across all 32 loaded stylesheets plus a synthetic probe
element:

```json
{ "cssomHits": [], "sheets": 32,
  "probe": { "position": "static", "zIndex": "auto",
             "background": "rgba(0, 0, 0, 0)", "boxShadow": "none",
             "backdropFilter": "none", "animationName": "none",
             "borderRadius": "0px", "border": "0px solid" } }
```

**Proof of the shipped consequence** — a *trusted* `page.locator('[data-probe="s0"]').hover()` on a
real current-palette swatch, then measured:

```json
{ "panelFound": true, "parentIsBody": true,
  "inlineStyle": "top: 307.18px; left: 791.5px;",
  "computed": { "position": "static", "zIndex": "auto",
                "background": "rgba(0, 0, 0, 0)", "boxShadow": "none",
                "animationName": "none", "transform": "none" },
  "panelRect":  [0, 900, 1440, 40],
  "anchorRect": [768, 349, 48, 54],
  "docScrollHeight": 940, "viewportH": 900,
  "ariaHidden": "true" }
```

Read that carefully — every number is a separate defect:

1. `useHoverPopover.positionPanel` **does** compute a correct anchor (`top: 307.18px;
   left: 791.5px`) and writes it inline. Because the class supplies no `position`, the element is
   `static` and **both coordinates are inert**.
2. The panel lands at `y = 900` while the anchor is at `y = 349` — **551 px below its swatch**, and
   at `x = 0` while the anchor is at `x = 768`.
3. Its width is **1440 px** — the full viewport. It is a block-level element in `<body>`'s normal
   flow, not a floating panel.
4. `docScrollHeight` (940) now exceeds `viewportH` (900): **hovering a swatch grows the document
   and introduces a scrollbar.** Re-measured at a 1100 px viewport: panel at `y = 1100`,
   `scrollHeight` 1140. The panel always lands exactly one panel-height *past* the fold, at the
   end of the document, for every viewport size.
5. It is therefore **structurally unreachable**: scrolling toward it moves content under a
   stationary cursor, which fires `pointerleave` on the swatch, which fires the 250 ms
   `useLeaveTimer` and closes it.
6. `background: rgba(0,0,0,0)`, `boxShadow: none`, `zIndex: auto` — no surface, no elevation, no
   containment. The three action icons sit naked on the page's aurora gradient.

**Visual proof** — `evidence/floating-panel-orphan.png`, an element screenshot of the live panel:
a 1440×40 transparent strip carrying a pencil / copy / trash glyph on the raw page background.

```
Reproduction:
  1. open http://localhost:9000/#/palettes with a non-empty current palette
  2. hover any swatch in the "Current Palette" row
  3. scroll to the very bottom of the document
```

**Cure (gestalt, not patch)**: do not restore the orphaned demo-local CSS. The hand-rolled
`<Teleport to="body">` panel is a second, worse implementation of `PopoverContent`, which
glass-ui already ships and which already solves anchoring, collision, layering, dismissal and
focus. Delete the Teleport branch entirely (see C-14).

---

## C-2 — BLOCKER — `tag="button"` and `:aria-label` are not props of glass-ui 7 `WatercolorDot`; both are silently dropped

**File**: `demo/palettes/browser/card/SwatchHoverMenu.vue:14-20` (touch path) and `:29-36` (hover path)

```vue
<WatercolorDot
    :color="color"
    :variant="ghost ? 'ghost' : 'solid'"
    tag="button"
    :aria-label="`Color swatch ${color}`"
    :class="[sizeClass, 'shrink-0 cursor-pointer', swatchExtraClass]"
    @click.stop="$emit('click')"
/>
```

The producer's declared surface (`node_modules/@mkbabb/glass-ui/dist/components/watercolor-dot/WatercolorDot.vue.d.ts`)
is exactly `{ color, variant?, animate?, cycleDuration?, range?, seed? }`. **There is no `tag`
prop.** The compiled render function (`dist/watercolor-dot.js`) is:

```js
inheritAttrs: !1,
setup(e) {
  let t = e, n = h(),                    // h = useAttrs
      c = i(() => n.class),              // ONLY class
      f = i(() => n.style), …            // ONLY style
  return (t, n) => (d(), o("span", {     // ALWAYS a <span>
    "aria-hidden": "true",               // ALWAYS aria-hidden
    class: l([c.value, "watercolor-swatch", …]),
    "data-testid": "watercolor-swatch",
    "data-variant": e.variant,
    style: u([f.value, {
      backgroundColor: …, borderRadius: m(b),
      pointerEvents: "none",             // ALWAYS unclickable
      …}])
  }, [ … ]))
}
```

`inheritAttrs: false` + explicit forwarding of `attrs.class` / `attrs.style` **only** means
`tag`, `aria-label` and `onClick` never reach the DOM.

**Live proof** (`/#/palettes`, expanded card, the SwatchHoverMenu swatches):

```json
{ "totalWatercolorDots": 2,
  "dotsThatAreButtons": 0,
  "dotsAriaHidden": 2,
  "dotsPointerEventsNone": 2,
  "elementsLabelledColorSwatch": 0 }
```

and the rendered element itself:

```html
<span data-v-292b9032 aria-hidden="true"
      class="add-slot-ghost btn-interactive w-11 h-11 … watercolor-swatch"
      data-testid="watercolor-swatch" data-variant="ghost"
      style="border-radius: …; pointer-events: none; …"></span>
```

`tabIndex: -1`. So this component's swatch is:

- **not a button** (no role, no `type`, no activation behaviour),
- **nameless** — `elementsLabelledColorSwatch: 0` across the whole page,
- **removed from the a11y tree** (`aria-hidden="true"`),
- **not focusable** (`tabIndex -1`),
- **incapable of receiving any pointer event** (`pointer-events: none`; `elementFromPoint` at the
  swatch centre returns the wrapping `DIV`, not the swatch).

The glass-7 adoption commit `f2c8f565` (*"adopt @mkbabb/glass-ui 7.0.0 across the demo consumer
surface"*) **did not touch this file** (`git show f2c8f565 -- …/SwatchHoverMenu.vue` → empty). The
producer's contract changed underneath a call site that was never migrated.

**Cure**: `WatercolorDot` is *face-only* by producer design (its own docstring says so, and it
hard-codes `aria-hidden` + `pointer-events: none` to enforce it). The seat must be a real
`<button>` that *contains* the dot as its face — never the dot itself. This is verbatim the
already-recorded ruling **V-A142** (`docs/tranches/V/archive/ADDENDA.md:24`): *"Build one shared
geometric seat and pointer/keyboard/AT action path; WatercolorDot is face-only and hover-only
action panels are deleted. Born RED."* That addendum is still open.

---

## C-3 — BLOCKER — the touch `Popover` path can never open; the whole action surface is dead on every touch device

**File**: `demo/palettes/browser/card/SwatchHoverMenu.vue:13-21`

```vue
<PopoverTrigger as-child>
    <WatercolorDot … tag="button" :aria-label="…" />
</PopoverTrigger>
```

reka-ui's `PopoverTrigger` (`node_modules/reka-ui/dist/Popover/PopoverTrigger.js`) renders:

```js
createVNode(unref(Primitive), {
  id: unref(rootContext).triggerId,
  ref: unref(forwardRef),
  type: "button",
  "aria-haspopup": "dialog",
  "aria-expanded": unref(rootContext).open.value,
  "aria-controls": unref(rootContext).contentId,
  "data-state": …,
  as: _ctx.as, "as-child": props.asChild,
  onClick: unref(rootContext).onOpenToggle          // ← the entire open mechanism
}, { default: … })
```

`Primitive` with `as-child` renders `h(Slot, attrs, …)`; `Slot`
(`node_modules/reka-ui/dist/Primitive/Slot.js`) does
`cloneVNode({...child, props:{}}, mergeProps(attrs, childProps))` — i.e. it merges the trigger
contract onto the **`WatercolorDot` component vnode**, where it becomes `$attrs`.

`WatercolorDot` has `inheritAttrs: false` and forwards only `class`/`style` (C-2). Therefore
**every one of `onClick`, `id`, `type`, `aria-haspopup`, `aria-expanded`, `aria-controls`,
`data-state` is discarded**, and `rootContext.triggerElement` is never populated (so the
`PopperAnchor` also has no anchor to measure). On top of that the rendered `<span>` carries
`pointer-events: none`, so the tap cannot even reach it.

Consequence: on **every touch device** (`(hover: hover)` false → `canHover` false → this branch),
tapping a palette swatch does **nothing**. Edit / Copy / Remove (`CurrentPaletteEditor.vue:46,49,52`)
and Add / Edit / Copy (`PaletteCardSwatches.vue:41,49,56`) are unreachable. There is no other route
to those actions.

**Status**: CONFIRMED BY CONSTRUCTION from three independently verified premises — (a) the compiled
producer render function, (b) the compiled reka-ui trigger/Slot chain, (c) the live-measured
`pointer-events: none` on the identical element. A direct touch-device reproduction was **not** run
(the desktop matrix renders the `v-else` hover branch); labelled honestly.

---

## C-4 — MAJOR — the `click` emit is dead code in both consumers

**File**: `SwatchHoverMenu.vue:35` `@click.stop="$emit('click')"`, `:90` `click: []`

By C-2 the listener is dropped and the element is `pointer-events: none`, so the `click` emit can
never fire. Both consumers wire handlers to it that can never run:

- `CurrentPaletteEditor.vue:41` → `onCurrentSwatchClick(i)`
- `PaletteCardSwatches.vue:36` → `$emit('swatchClick', i)` → `PaletteCard.vue:154` → `onSwatchClick`

and the composable's `onSwatchClick` (`useHoverPopover.ts:51-54`) is therefore unreachable code.

---

## C-5 — MAJOR — `aria-hidden="true"` wraps three tabbable native buttons, and its stated justification is false

**File**: `SwatchHoverMenu.vue:38-48`

```vue
<!-- W5-a11y: hover-only panel is keyboard-inaccessible — hidden from
     AT. The reka-ui Popover (touch path) is the accessible route. -->
<div v-if="open" class="floating-panel" … aria-hidden="true">
    <slot name="actions" />
</div>
```

Two defects:

1. **The justification is falsified by C-3.** The reka-ui Popover path cannot open. There is no
   accessible route to these actions, on any device.
2. **`aria-hidden` on a subtree containing focusable content is itself an ARIA violation** —
   axe-core rule `aria-hidden-focus`, impact *serious*. The slotted content is three native
   `<button>` elements with no `tabindex` and no `disabled`
   (`CurrentPaletteEditor.vue:46,49,52`), so they are in the sequential focus order by HTML spec
   while being removed from the a11y tree. Measured live: the panel carries `aria-hidden: "true"`
   and contains buttons named `"Edit color rgb(255 0 0)"`, `"Copy color rgb(255 0 0)"`,
   `"Remove color rgb(255 0 0) from palette"`. A keyboard user tabs into three unnamed,
   unannounced, invisible controls at the bottom of the page.

**Regression provenance**: tranche A's W5 sweep added `role="toolbar"` +
`:aria-label="Actions for color ${color}"` here (`docs/tranches/A/audit/W5-a11y.md:51-56, 180`,
recorded as *"Done — toolbar role + aria-label added"*). Commit **`bda38b6c`** (B.W1) replaced both
with `aria-hidden="true"` on exactly the reasoning now shown to be false. The remediation is gone
and the ledger still records it as done.

---

## C-6 — MAJOR — the `floating-panel-in` entrance animation was deleted, not moved (edict 6)

Owner edict: *animations are never deleted, only moved or tokenized.*

`@keyframes floating-panel-in` lived in `demo/@/styles/animations.css` and was deleted in
`c84504d3` on the claim that the shared keyframes now come from
`@mkbabb/glass-ui/styles/animations.css`. They do not:

```
$ grep -o "floating-panel" node_modules/@mkbabb/glass-ui/dist/styles/animations.css | wc -l
0
```

Live measurement on the mounted panel: `"animationName": "none"`. The comment at
`demo/styles/animations.css:2` still asserts the producer supplies it.

---

## C-7 — MAJOR — the two consumers disagree about the panel's centering transform

Both consumers feed the *same* centre-anchor math from `useHoverPopover.positionPanel`
(`left = rect.left + rect.width / 2`, `useHoverPopover.ts:20-24`), which requires a
`translateX(-50%)` to actually centre. Only one supplies it:

| consumer | line | floating-style passed |
|---|---|---|
| `PaletteCardSwatches.vue` | 31 | `{ ...floatingStyle, transform: 'translateX(-50%)' }` |
| `CurrentPaletteEditor.vue` | 35 | `currentFloatingStyle` — **no transform** |

Measured live on the `CurrentPaletteEditor` path: `inlineStyle: "top: 307.18px; left: 791.5px;"`,
`computed.transform: "none"`. Once C-1 is cured, this panel will sit half its own width to the
right of every swatch it annotates, while the card path sits centred. The centering belongs inside
the component (or in the restored surface primitive), never at two call sites that can drift — and
have.

---

## C-8 — MAJOR — `swatchKeys` are index-coupled, so any removal remounts every `SwatchHoverMenu` in the row

**File**: `demo/palettes/browser/card/composables/useSwatchActions.ts:42-59`

```ts
// --- Stable keys for TransitionGroup ---
const swatchKeys = computed(() =>
    savedColorStrings.value.map((color, i) => {
        const mapKey = `${color}::${i}`;          // ← index is part of the identity
        …
    }),
);
```

The key is derived from `(color, index)`. Removing the swatch at index 0 re-indexes every
survivor, so **every** `mapKey` misses, **every** entry gets a fresh counter value, and
`TransitionGroup` (`CurrentPaletteEditor.vue:24-31`, keyed `swatchKeys[i] ?? i`) sees N deletions +
N insertions instead of one leave.

Worked example — `["red","green","blue"]` → map `{red::0→0, green::1→1, blue::2→2}`, keys
`[0,1,2]`. Remove `"red"` → `["green","blue"]` → mapKeys `green::0`, `blue::1` are absent → new
keys `[3,4]`. The two *unchanged* swatches are destroyed and recreated.

`addCurrentColor`'s reorder branch (`useSwatchActions.ts:63-69`, moves an existing colour to the
end) triggers the same full remount. The comment calling these "Stable keys" is false; the intent
is defeated exactly in the cases it exists for. Any open `SwatchHoverMenu` panel is torn down as a
side effect.

Secondary: the `computed` **mutates** `swatchKeyMap` and `swatchKeyCounter` — a side-effecting
computed, which is not a pure derivation and is not safe under re-evaluation.

---

## C-9 — MAJOR — vacuous gates: no test exercises this component, and the one e2e that touches its cluster cannot resolve its own locator

**(a) Zero tests.**

```
$ grep -rn "SwatchHoverMenu" test/ e2e/
                                     (no output)
$ grep -rn "floating-panel\|Color swatch" e2e/ test/
                                     (no output)
```

No unit test, no component test, no e2e. **Mutation that keeps the suite green**: delete the entire
`<template>` and render `<div/>`. Nothing fails.

**(b) The type gate is green over the dead props.**

```
$ npx vue-tsc -p tsconfig.demo.json --noEmit ; echo "exit=$?"
exit=0
```

`tag="button"` — a prop that does not exist on the glass-ui 7 `WatercolorDot` — passes the *hard*
CI typecheck (made hard in `ef57230b`) because Vue treats unknown component attributes as
fallthrough attrs and `vue-tsc` does not check whether the target actually inherits them. The gate
cannot see `inheritAttrs: false`.

**(c) The one e2e that touches this cluster queries an element that does not exist.**

`e2e/smoke/flows/palette-save.spec.ts:33-36`:

```ts
await main
    .getByRole("button", { name: /Add current color .* to palette/ })
    .filter({ visible: true })
    .click();
```

Live count of candidates on `/#/palettes`:

```json
{ "anyElementWithAddCurrentColorLabel": 0,
  "buttonsWithAddCurrentColorLabel": 0 }
```

The target (`CurrentPaletteEditor.vue:95-105`) is the same `WatercolorDot tag="button"
:aria-label="…"` pattern — it renders as an `aria-hidden` `<span>` with no name and no role. This
spec cannot pass against the current tree.

---

## C-10 — MINOR — `useLeaveTimer` never disposes its pending timeout

**File**: `demo/palettes/browser/card/composables/useLeaveTimer.ts:1-17`

```ts
export function useLeaveTimer(delay = 250) {
    let timer: ReturnType<typeof setTimeout> | null = null;
    function schedule(callback) { cancel(); timer = setTimeout(callback, delay); }
    function cancel() { if (timer) { clearTimeout(timer); timer = null; } }
    return { schedule, cancel };
}
```

No `onScopeDispose` / `onUnmounted`:

```
$ grep -rn "onScopeDispose\|onUnmounted" demo/palettes/browser/card/composables/
                                     (no output)
```

A pointer-leave scheduled 250 ms before a card unmounts (filter change, route change, palette
delete, `PaletteCardGrid` re-render) fires against a disposed scope. Harmless today only because
the callback writes a ref nobody reads; it is an uncleaned timer in a composable used by every card
in the grid. One line: `onScopeDispose(cancel)`.

---

## C-11 — MINOR — the panel is positioned once and never repositioned; `-42` is a magic constant

**File**: `useHoverPopover.ts:20-31`

```ts
function positionPanel(swatchEl: Element, offsetY = -42) {
    const rect = swatchEl.getBoundingClientRect();
    style.top  = `${rect.top + offsetY}px`;
    style.left = `${rect.left + rect.width / 2}px`;
}
```

- Viewport coordinates are captured **once**, at hover. No `scroll`, `resize`, `ResizeObserver` or
  Floating-UI `autoUpdate`. Once C-1 restores `position: fixed`, any scroll or resize while the
  panel is open detaches it from its swatch.
- `offsetY = -42` places the panel 42 px above the swatch's **top** irrespective of the panel's
  actual height. The measured panel is 40 px tall today; a two-row wrap (the panel is
  `flex items-center gap-1` with 1–3 children, `SwatchHoverMenu.vue:66`) overlaps the swatch.
- No collision handling at all: a swatch near the top of the viewport puts the panel off-screen.

All three are solved for free by `PopoverContent` (`side="top"`, `:side-offset`), which the touch
branch of this very file already uses (`SwatchHoverMenu.vue:22`).

---

## C-12 — MINOR — `e.currentTarget` is read after dispatch, inside `nextTick`

**File**: `useHoverPopover.ts:26-31`

```ts
function onHover(index: number, e: PointerEvent) {
    if (!canHover.value || e.pointerType === "touch") return;
    cancelLeave();
    openIndex.value = index;
    nextTick(() => positionPanel(e.currentTarget as Element));   // ← currentTarget outlives dispatch?
}
```

`currentTarget` is only defined for the duration of dispatch. Reproduced live — a
`dispatchEvent(new PointerEvent('pointerenter', …))` yields an uncaught:

```
TypeError: Cannot read properties of null (reading 'getBoundingClientRect')
    at positionPanel (…/useHoverPopover.ts:18:25)
    at            (…/useHoverPopover.ts:26:18)
```

**Honest scoping**: with a *trusted* Chromium hover the microtask checkpoint still runs inside
`dispatch`, so `currentTarget` survives and `positionPanel` succeeds (verified: the inline style
was correctly written to `top: 307.18px; left: 791.5px`). The crash is therefore **not** shipping
on the mouse path in Chromium today — but the code depends on an ordering guarantee it does not
state, it hard-crashes under any programmatic dispatch (which is what a component test would do),
and the `as Element` cast is precisely the assertion that suppresses the `EventTarget | null` the
compiler would otherwise force it to handle. The cure is to capture the element **synchronously**
(`const el = e.currentTarget as Element;` before `nextTick`), or better, hand the panel a
`useTemplateRef` anchor.

---

## C-13 — MINOR — `swatchExtraClass` is a dead prop

**File**: `SwatchHoverMenu.vue:75` (declared), `:19` and `:34` (consumed in template)

```
$ grep -rn "swatch-extra-class\|swatchExtraClass" demo/
demo/palettes/browser/card/SwatchHoverMenu.vue:19  …
demo/palettes/browser/card/SwatchHoverMenu.vue:34  …
demo/palettes/browser/card/SwatchHoverMenu.vue:75  …
```

Three hits, all inside the component itself. Neither consumer passes it. A per-instance styling
escape hatch that nothing uses — edict 3 (KISS, no contrivance) and edict 5 (style at the root
component level, never per-instance) both say delete it.

---

## C-14 — MINOR (architecturally MAJOR) — the dual hover/touch fork is a second implementation of `PopoverContent`

`SwatchHoverMenu.vue:8-25` (reka-ui `Popover`) and `:28-52` (hand-rolled `<Teleport to="body">`)
are two implementations of one affordance, branched on `canHover`. This violates:

- **edict 2** (no dual paths / no parallel implementations),
- **edict 3** (KISS — no wrapper that duplicates an existing component),
- **edict 4** (glass-ui is the design system — the floating surface belongs to the producer).

The `PANEL_LAYOUT` constant at `:66` is an acknowledgement of the problem ("*so the two paths
cannot drift*") that only dedupes the padding — the swatch markup is still duplicated verbatim at
`:14-20` and `:29-36`, and the centering transform *has already drifted* (C-7).

This is not new. Tranche A logged it as **Ad-9** — *"SwatchHoverMenu hand-rolls a teleported panel
parallel to PopoverContent"* (`docs/tranches/A/research/Ad-interactive-states.md:158-159`,
`docs/tranches/A/audit/W4-states-b.md:78`), with the recommendation *"collapse to one HoverCard"*.
The fork survived; only the padding was deduped. Deleting the hover branch is simultaneously the
cure for C-1, C-5, C-6, C-7, C-11 and C-14.

---

## C-15 — INFO — per-instance override on a glass root component

`SwatchHoverMenu.vue:22`: `<PopoverContent class="w-auto" :class="PANEL_LAYOUT" :side-offset="8">`.
`w-auto` + `p-1.5 flex items-center gap-1` is layout re-specification at the call site rather than
a producer variant (edict 5). A `PopoverContent` "toolbar"/compact variant in glass-ui is the
correct home.

---

## C-16 — MAJOR (collateral, identical mechanism, same cluster) — `WatercolorDot` renders no default slot, so the add-slot's `+` glyph is dropped

Not in `SwatchHoverMenu.vue`, but the same dead-prop mechanism in the file that owns half its
instances, and it is the clearest *visual* proof of C-2.

`CurrentPaletteEditor.vue:95-105` places a `<Plus>` in `WatercolorDot`'s default slot. The
compiled producer render function's children array is
`[svg.watercolor-filter-host, (variant==='ghost' ? span.watercolor-ghost-stroke : comment)]` —
**there is no `renderSlot` call anywhere in it.** The glyph is discarded.

Confirmed in the shipped visual-audit capture
`docs/tranches/V/megatranche/audit/visual/shots/safari-mobile-light/palettes.png`: the "Start a new
palette" affordance is an empty dashed blob with **no `+`**, and per C-2 it is also nameless,
`aria-hidden`, `tabIndex -1` and `pointer-events: none`. The primary "add a colour" affordance of
the palettes route is inert and unlabelled in production.

---

## Local-hazard checklist (the ones that do *not* apply)

Recorded for completeness, so the negative is proved rather than assumed:

| hazard | status here |
|---|---|
| `defineModel` stale round-trip | **N/A** — the component uses `:open` + `@update:open` explicitly (`:10-11`), not `defineModel`. Correct choice. |
| oklch→HSV hue drift / `stableHue` | **N/A** — no colour maths; `color` is passed through as an opaque CSS string. |
| `ValueUnit` nesting accumulation | **N/A** — no `ValueUnit` in this subtree. |
| reka-ui slider pointer-capture leak | **N/A** — no slider. |
| ungated rAF (PRM-RAF epidemic) | **clean** — `WatercolorDot`'s rAF loop is gated behind `animate` (default `false`), which no call site sets; the producer's `useRAFLoop` is additionally `pauseWhenHidden` + `respectReducedMotion`. |
| eager WebGL on the critical path | **N/A** — `WatercolorDot` is deliberately a CSS/SVG primitive, no drawing context. |
| `verbatimModuleSyntax` | **clean** — `import type { CSSProperties } from "vue"` (`:60`) is correctly type-only. |
| domain-boundary input (empty / NaN / malformed colour) | **clean-ish** — an empty `colors` array renders nothing; a malformed `color` string simply fails to paint `backgroundColor` (no `parseCssColor` on this path, so no crash-class exposure). The only leak would have been the raw string in `aria-label`, which is dropped anyway (C-2). |
| tap targets ≥ 24 px | **pass** — swatch 36–48 px measured; action buttons `p-1.5` + 16 px icon = 28 px. The route's 8 small-tap-target rows in `REPORT.md:34` are not this component's. |

---

## Summary table

| id | severity | defect |
|---|---|---|
| C-1 | BLOCKER | `.floating-panel` has zero CSS; hover panel renders `position: static`, 1440 px wide, at the bottom of `<body>`, below the fold, unstyled, and grows the document |
| C-2 | BLOCKER | `tag="button"` + `:aria-label` dropped by `inheritAttrs:false`; swatch is an `aria-hidden`, `pointer-events:none`, nameless, unfocusable `<span>` |
| C-3 | BLOCKER | touch `PopoverTrigger as-child` contract discarded → popover can never open → all per-colour actions dead on every touch device |
| C-4 | MAJOR | `click` emit unreachable; `onSwatchClick` dead code in both consumers |
| C-5 | MAJOR | `aria-hidden="true"` over three tabbable buttons (`aria-hidden-focus`); its stated justification is falsified by C-3; A.W5 `role="toolbar"` remediation reverted at `bda38b6c` |
| C-6 | MAJOR | `floating-panel-in` keyframe deleted, never re-homed (edict 6); measured `animationName: none` |
| C-7 | MAJOR | consumer drift — only `PaletteCardSwatches` supplies the required `translateX(-50%)` |
| C-8 | MAJOR | index-coupled `swatchKeys` remount the whole `TransitionGroup` row on any removal/reorder |
| C-9 | MAJOR | vacuous gates — 0 tests, `vue-tsc` exit 0 over the dead props, and `palette-save.spec.ts:34` targets an element with 0 live matches |
| C-10 | MINOR | `useLeaveTimer` has no `onScopeDispose` |
| C-11 | MINOR | position captured once; no scroll/resize/collision handling; magic `-42` |
| C-12 | MINOR | `e.currentTarget` read inside `nextTick` (crash reproduced under programmatic dispatch) |
| C-13 | MINOR | `swatchExtraClass` dead prop |
| C-14 | MINOR | dual hover/touch fork re-implements `PopoverContent` (tranche-A `Ad-9`, still open) |
| C-15 | INFO | per-instance `PopoverContent` layout override |
| C-16 | MAJOR | `WatercolorDot` renders no default slot → the add-slot `+` glyph is dropped (visible in the shipped mobile capture) |

---

## The single cure

Every BLOCKER above is one architectural mistake wearing three costumes: **the decorative face was
made the control, and a second floating-surface implementation was hand-rolled beside the
producer's.**

The transposition:

1. The seat is a native `<button>` carrying the accessible name and the click/keyboard contract.
   `WatercolorDot` goes *inside* it as the face — `aria-hidden`, `pointer-events: none`, exactly as
   the producer intends. This kills C-2, C-3, C-4 and C-16 at once.
2. **One** action surface for all modalities: glass-ui `Popover` (or `DropdownMenu`) on that button,
   opened by click *and* by hover-intent. Delete the `canHover` fork, the `<Teleport to="body">`,
   the `.floating-panel` class, `useHoverPopover.positionPanel`, `useLeaveTimer`, `floatingStyle`,
   `swatchExtraClass`, and the `click`/`hover`/`leave`/`cancelLeave` emits. This kills C-1, C-5,
   C-6, C-7, C-10, C-11, C-12, C-13, C-14, C-15.
3. Key swatches by identity, not by `(color, index)` — C-8.
4. Gate it: one component test that asserts the swatch exposes `role=button` with an accessible
   name and that activating it opens a panel whose actions are focus-reachable. Any of the sixteen
   findings above would have been caught by that single test.

Steps 1 and 2 are, word for word, the disposition already recorded at
`docs/tranches/V/archive/ADDENDA.md:24` as **V-A142 (born RED, W22/W23)**. This audit reached it
independently, and adds the measurements proving the component is not merely mis-designed but
currently **inoperative**.

---

## Artefacts

- `docs/tranches/V/megatranche/audit/components/SwatchHoverMenu/evidence/floating-panel-orphan.png`
  — element screenshot of the live hover panel: a 1440×40 transparent strip of naked icons at the
  end of `<body>`.
- `docs/tranches/V/megatranche/audit/components/SwatchHoverMenu/evidence/swatch-hover-panel-defect.png`
  — full-page `/#/palettes` capture showing the swatch row whose swatches are `aria-hidden` spans.
