# CHALLENGE-C — PaletteCard: implementation interrogation

## Model receipt

I observe myself to be **Opus 5 (1M context)**, exact model id `claude-opus-5[1m]`, spawned with an
explicit Opus 5 declaration. The seat is declared, not inherited.

---

## Verdict

**DEFECTIVE.** Three BLOCKER-class defects, six MAJOR, six MINOR.

The headline is not a style quibble. **PaletteCard's entire per-colour action surface — the swatch
row's Add / Edit / Copy affordances, the whole reason the card expands — is inert and unstyled in
the shipping tree.** The swatch cannot be clicked (its host element carries `pointer-events: none`
and its `@click` listener is discarded by the child's `inheritAttrs: false`), it carries no
accessible name and is `aria-hidden="true"`, and the hover panel that is the sole surviving route
renders `position: static`, fully transparent, appended at the end of `<body>`, half of it off the
left edge of the viewport. The CSS class that made it a panel — `.floating-panel` — was deleted on
2026-03-25 in commit `c84504d3` under the claim "now provided by `@import @mkbabb/glass-ui/styles`".
It is not provided. It has not existed for four months.

Nothing caught this because **PaletteCard has zero unit tests and no e2e test ever expands a card.**

Environment note: HEAD at audit time is `9bcd5d91` (the brief cites `c654824e`); the six component
files are byte-identical at both commits. The live dev server at `:9000` is shared with other
concurrent seats in this formation — where a browser observation could have been contaminated by a
parallel writer I say so explicitly and back the claim with an uncontaminated node- or
module-level reproduction.

---

## Reproductions run

| # | Probe | Result |
|---|---|---|
| P1 | `npx vite-node` → `parseCssColor` over 18 malformed inputs | 13/18 **throw** `TypeError` |
| P2 | `npx vite-node` → `certifyAccentInk("oklch()", 0.45)` (the exact call `safeCss` makes) | **THREW** |
| P3 | live browser `import('/@fs/…/demo/color-session/ink.ts')` → same call | **THREW** |
| P4 | live browser: seed a local palette with `colors[0].css = "oklch()"`, load `/#/palettes` | pane replaced by *"This panel hit an unexpected error. Cannot read properties of undefined (reading 'replace')"* |
| P5 | live browser: seed 3 local palettes, measure `[role="article"]` | card `tabIndex: -1`, not focusable, **1** focusable descendant ("Palette menu") |
| P6 | live browser: expand card, read swatch DOM + computed style | `SPAN`, `aria-hidden="true"`, `aria-label: null`, `pointer-events: none`, `tabIndex: -1` |
| P7 | live browser: `elementFromPoint` at swatch centre + synthetic click | hits `DIV.relative`; popovers open: **0 → 0** |
| P8 | Playwright `hover()` actionability engine on the swatch | `<div class="relative"> intercepts pointer events` (5 s timeout) |
| P9 | live browser: open hover panel, read computed style | `position: static`, `background: rgba(0,0,0,0)`, `box-shadow: none`, `z-index: auto`; rect `{x:-195, y:844, w:390, h:40}` in a 390×844 viewport at `scrollY: 0` |
| P10 | live console after a swatch hover | `TypeError: Cannot read properties of null (reading 'getBoundingClientRect')` at `useHoverPopover.ts:18:25` |
| P11 | `npx vitest run` on an `ActionFeedback` mount probe (2 tests, both pass) | second message dismissed after **100 ms** instead of 2500 ms; timer count **1 before unmount, 1 after** |
| P12 | live browser: open rename row, enumerate buttons | 2 buttons, **both nameless**, both **18×18 px** |
| P13 | live browser: focus the rename input, dispatch `Escape` | `activeElement` → `BODY` (focus lost, not restored) |
| P14 | `grep -rln "floating-panel" node_modules/@mkbabb/glass-ui/` | **no matches** |
| P15 | `git show c84504d3^:demo/@/styles/floating-panel.css` | recovers the deleted rule: `position: fixed; z-index: var(--z-overlay); …` |

---

## BLOCKER

### C-1 — The swatch is not an interactive element: `tag`, `aria-label` and `@click` are all discarded

`SwatchHoverMenu.vue:14-20` and `:29-36` render the swatch as:

```vue
<WatercolorDot
    :color="color"
    tag="button"
    :aria-label="`Color swatch ${color}`"
    :class="[sizeClass, 'shrink-0 cursor-pointer', swatchExtraClass]"
    @click.stop="$emit('click')"
/>
```

glass-ui 7.0.0's `WatercolorDot` accepts **none of that**. Its declared props
(`node_modules/@mkbabb/glass-ui/dist/components/watercolor-dot/WatercolorDot.vue.d.ts`) are exactly
`{ color, variant, animate, cycleDuration, range, seed }` — there is no `tag` prop. And the
implementation (`node_modules/@mkbabb/glass-ui/dist/watercolor-dot.js:80`) opens with:

```js
inheritAttrs: !1,
```

then re-applies **only** `class` and `style` from `$attrs` and renders a hard-coded

```js
o("span", { "aria-hidden": "true", … style: { …, pointerEvents: "none" } }, …)
```

So `tag="button"`, `aria-label`, and the `onClick` listener are all swallowed. Measured live (P6):

```json
{ "tagName": "SPAN", "ariaHidden": "true", "ariaLabel": null, "tagAttr": null,
  "attrs": ["data-v-292b9032","aria-hidden","class","data-testid","data-variant","style"],
  "pointerEvents": "none", "tabIndex": -1, "parentTag": "DIV",
  "parentAttrs": ["class=relative"] }
```

Consequences, each measured:

1. **Click is dead.** `elementFromPoint` at the swatch centre resolves to `DIV.relative` — the bare
   wrapper, which has `@pointerenter`/`@pointerleave` and **no** `@click` (`SwatchHoverMenu.vue:2-6`).
   Synthetic click at the swatch centre: `.floating-panel` count `0 → 0` (P7). Playwright's own
   actionability engine independently reports `<div class="relative"> intercepts pointer events` (P8).
   The whole chain `PaletteCard.vue:151 @swatch-click="onSwatchClick"` ← `PaletteCardSwatches.vue:36
   @click="$emit('swatchClick', i)"` ← `SwatchHoverMenu.vue:35` is **unreachable code**, and with it
   `useHoverPopover.onSwatchClick` (`useHoverPopover.ts:51-54`).
2. **The touch path is dead too.** On a coarse pointer `canHover === false`, so the
   `PopoverTrigger as-child` branch (`SwatchHoverMenu.vue:13-21`) mounts. reka-ui's `as-child`
   delivers its trigger props to the child as fallthrough attrs — swallowed identically. A touch user
   tapping a swatch gets nothing at all. **Add-to-palette / Edit colour / Copy colour have no
   reachable route on any touch device.**
3. **The swatch is invisible to assistive technology**, both by `aria-hidden="true"` and by the
   discarded name. `cursor-pointer` (`SwatchHoverMenu.vue:19,34`) is a lie told to a sighted mouse
   user about an element that is not a hit target.

This is a Glass-7-adoption contract break the W44 adoption did not catch. The component *believes*
it renders `<button aria-label="Color swatch …">`; it renders `<span aria-hidden="true">`.

**Cure (gestalt, not patch).** The swatch's semantics belong to the *consumer*, not the dot:
`SwatchHoverMenu` should render its own `<button type="button" :aria-label>` and mount
`<WatercolorDot>` inside it as the pure decoration it is (`aria-hidden`, `pointer-events:none` are
then correct by construction). That is one element in one file, it removes the dependence on a
`tag` prop glass-ui never offered, and it makes the hover/touch split a matter of *panel* mechanism
only. If a polymorphic swatch is genuinely wanted, `tag` belongs in glass-ui (edict 4) — but KISS
says do not add a prop to buy back what a wrapping `<button>` gives for free.

---

### C-2 — `.floating-panel` does not exist: the hover popover renders unstyled, static, and off-screen

`SwatchHoverMenu.vue:40-50` teleports the action panel to `<body>` with `class="floating-panel"` and
inline `top`/`left` written by `useHoverPopover.positionPanel` (`useHoverPopover.ts:20-24`).

The class is defined **nowhere**:

```
$ grep -rln "floating-panel" node_modules/@mkbabb/glass-ui/
(no matches)
$ grep -rn "floating-panel" demo | grep -v '\.md:'
demo/palettes/browser/card/SwatchHoverMenu.vue:42:  class="floating-panel"
demo/palettes/browser/card/composables/useHoverPopover.ts:7: * Shared hover-timer + floating-panel positioning pattern.
```

Live computed style of the mounted panel (P9), viewport 390×844, `scrollY: 0`:

```json
{ "computed": { "position": "static", "top": "0px", "left": "0px", "zIndex": "auto",
                "background": "rgba(0, 0, 0, 0)", "boxShadow": "none", "borderRadius": "0px" },
  "panelRect": { "x": -195, "y": 844, "w": 390, "h": 40 },
  "parent": "BODY" }
```

`position: static` makes the inline `top`/`left` **inert**. The panel lays out as a body-width block
at the very end of the document flow (`y = 844` = exactly the fold), and `transform: translateX(-50%)`
(`PaletteCardSwatches.vue:31`) shifts half of its 390 px width off the left edge (`x = -195`). It has
no background, no shadow, no radius, no stacking context.

Archaeology names the regression precisely. `git show c84504d3^:demo/@/styles/floating-panel.css`:

```css
/* Floating panel — used by PaletteCard swatch popover & PaletteCardMenu (Teleported) */
@layer components {
    .floating-panel {
        position: fixed;
        z-index: var(--z-overlay);
        border-radius: var(--radius-xl);
        border: 1px solid hsl(var(--border) / 0.6);
        background: hsl(var(--card) / 0.75);
        backdrop-filter: blur(12px) saturate(1.3);
        …
```

Commit `c84504d3` ("refactor(demo): migrate dock, styles, and composables to glass-ui", 2026-03-25)
deleted that file with the message *"Delete dock.css, **floating-panel.css**, glass.css,
transitions.css; now provided by `@import "@mkbabb/glass-ui/styles"`"*. The other three are provided.
This one is not. The panel has been unstyled for four months.

Note the coupling to C-1: `position: fixed` is exactly why `positionPanel` writes
`getBoundingClientRect()` viewport coordinates. The positioning code is correct **for a rule that no
longer exists**.

**Cure.** Do not re-add a demo-local `floating-panel.css` — that reintroduces the fork glass-ui was
meant to absorb, and the panel is a *popover*, a component-type glass-ui already owns. Retire the
hand-rolled Teleport branch entirely and render the reka-ui `Popover` on **both** pointer classes,
driving `:open` from `useHoverPopover` on fine pointers. That deletes `positionPanel`, deletes
`floatingStyle` (and its type drift, C-11), deletes the `aria-hidden` panel (C-9), and cures C-6 —
one removal, five defects.

---

### C-3 — A malformed palette colour destroys the pane: `safeFirstColor` throws on the empty-args colour-function class

`PaletteCard.vue:226-230`:

```ts
const firstColor = computed(() => props.palette.colors[0]?.css ?? props.cssColor ?? EMPTY_PALETTE_SWATCH);
const { safeCss } = useSafeAccentFn("well");
const safeFirstColor = computed(() => safeCss(firstColor.value));
```

`safeCss` → `certifyAccentInk` (`demo/color-session/ink.ts:130-143`) → `parseOklch` →
`parseCssColor`. `certifyAccentInk` handles the `!parsed.ok` branch (`ink.ts:136`) but **not the
throw**.

`parseCssColor` throws — not returns `!ok` — on the whole empty-argument class (P1):

```
"oklch()"     => THREW: TypeError Cannot read properties of undefined (reading 'replace')
"rgb()"       => THREW  "hsl()"   => THREW  "lab()"  => THREW  "lch()"  => THREW
"oklab()"     => THREW  "hwb()"   => THREW  "color()"=> THREW  "rgba()" => THREW
"oklch( )"    => THREW  "OKLCH()" => THREW  "rgb(  )"=> THREW
threw: 13 / 18
```

The exact call PaletteCard makes, in node (P2) **and** in the real browser against the live module
graph (P3):

```
"#888"                => OK: oklch(91.31680227523% 0 none)
"oklch(0.72 0.16 47)" => OK: oklch(91.693078594282% 0.046499674879 47deg)
"oklch()"             => THREW: TypeError: Cannot read properties of undefined (reading 'replace')
"rgb()"               => THREW: TypeError: Cannot read properties of undefined (reading 'replace')
"not-a-color"         => OK: not-a-color
```

**This is reachable from persisted data.** The API's palette schema
(`api/src/modules/palette/schema.ts:28`) is:

```ts
css: z.string().min(1).max(200),
```

— no colour validation whatsoever. `"oklch()"` is an accepted, storable palette colour, and the
browse wall serves it to every visitor.

Live (P4): seeding one local palette with `colors[0].css = "oklch()"` and loading `/#/palettes`
replaces the entire pane with the error-boundary card:

> `This panel hit an unexpected error.` / `Cannot read properties of undefined (reading 'replace')`

(Contamination caveat: the shared dev browser had a parallel writer, so I cannot certify from that
observation alone *which* consumer of the parse path threw first — but P2/P3 certify that
`safeFirstColor`'s own call site throws on this input, unconditionally, in both runtimes. The card is
at minimum a guaranteed second casualty: `PaletteCard.vue:144` binds `:safe-first-color="safeFirstColor"`
so the computed evaluates the moment any such card is expanded.)

**Cure.** Two layers, both at the root, neither a shim.
Library: `parseCssColor` must return `{ok:false}` for the empty-args class — this is R1 from the
π gate and it is still live. Demo: `certifyAccentInk` already *has* the correct degenerate
(`if (!accent) return css`); the throw simply bypasses it. Nothing in PaletteCard should change —
the defect is that a total function is advertised where a partial one ships.

---

## MAJOR

### C-4 — The card's primary action is keyboard-inoperable, and the press composable's keyboard leg is bound to an unfocusable host

`PaletteCard.vue:5-27` is a `<div role="article">` with `@click="$emit('click')"`, `cursor-pointer`,
and `v-bind="press.handlers"`. Both hosts wire that click to expansion
(`PalettesPane.vue:91 @click="pm.toggleExpand(palette.id)"`, `BrowsePane.vue:102`).

Measured (P5) across all three seeded cards:

```json
{ "name": "Palette: Sunset Study", "tabIndex": -1, "cardIsFocusable": false,
  "focusableDescendants": 1, "focusableNames": ["Palette menu"] }
```

There is no `tabindex`, no `@keydown`, and no alternative expand affordance anywhere in the card.
**A keyboard or switch user cannot expand a palette.** Every swatch action therefore sits behind a
gate they cannot open — before C-1 and C-2 even apply.

The template comment at `PaletteCard.vue:2-4` asserts this is "the correct pattern for a card
container that also houses nested interactive elements." The premise is right (nested controls
forbid `role="button"` on the container); the conclusion does not follow. The idiomatic resolution
is the *named primary action*: make the title a real `<button>` that emits `click`, leaving the
container a plain `article` whose click is a mouse-only convenience.

Compounding: `useLiquidPress` returns `onKeydown`/`onKeyup` handlers that drive the press spring on
Enter/Space (`node_modules/@mkbabb/glass-ui/dist/useLiquidPress-BOxuDkKa.js`, the `b = (e) => e.key
=== "Enter" || e.key === " "` block), plus `onBlur`. `v-bind="press.handlers"` binds all of them to
an element that can never be focused. Three of the eight bound handlers are structurally dead.

---

### C-5 — `ActionFeedback` never re-arms its timer and never clears it on unmount

`ActionFeedback.vue:37-47`:

```ts
let timer: ReturnType<typeof setTimeout> | undefined;
watch(() => props.visible, (v) => {
    if (timer) clearTimeout(timer);
    if (v && props.autoDismissMs > 0) {
        timer = setTimeout(() => emit("update:visible", false), props.autoDismissMs);
    }
});
```

`PaletteCard.showFeedback` (`PaletteCard.vue:238-242`) sets `feedbackVisible.value = true`. When the
chip is already visible that is a **no-op write**, the watcher does not fire, and the new message
inherits the *old* message's remaining countdown.

Executable proof (P11, `@vue/test-utils` + fake timers, host reproducing `PaletteCard.vue:123-128`
verbatim), both tests pass:

```
DEFECT: a second showFeedback while visible does NOT re-arm the timer
  visible 100ms after 2nd message: false      ← promised 2500 ms, delivered 100 ms
DEFECT: the pending timer is not cleared on unmount
  timers pending before unmount: 1  after unmount: 1
```

This is not hypothetical traffic: `BrowsePane.vue:226-265` fires `showFeedback` from four
independent async paths (`onSave`, `onDeleteOwned`, `onSetVisibility`, `onForkError`) against the
same card. Two actions inside one 2.5 s window and the second verdict — including *error* verdicts —
flashes for a few frames.

The unmount leak is the second half: the pending `setTimeout` survives teardown and later calls
`emit("update:visible", false)`, whose handler (`PaletteCard.vue:127`) writes into a destroyed
card's state. `onUnmounted(() => clearTimeout(timer))` is missing.

**Cure.** The whole component is a timed toast; `watch` on a boolean is the wrong instrument. Watch
the *message identity* (`() => [props.visible, props.message]`) and register the cleanup —
or, better, hoist the dismissal to the caller and let `ActionFeedback` be pure presentation, which
also removes the `update:visible` round-trip.

---

### C-6 — `positionPanel(e.currentTarget)` is read after the handler returns

`useHoverPopover.ts:26-31`:

```ts
function onHover(index: number, e: PointerEvent) {
    if (!canHover.value || e.pointerType === "touch") return;
    cancelLeave();
    openIndex.value = index;
    nextTick(() => positionPanel(e.currentTarget as Element));
}
```

`Event.currentTarget` is reset to `null` once dispatch completes. Reading it from a deferred callback
is a live defect — captured from the running app's console (P10):

```
TypeError: Cannot read properties of null (reading 'getBoundingClientRect')
    at positionPanel (…/composables/useHoverPopover.ts:18:25)
    at …/composables/useHoverPopover.ts:26:18
```

Honesty about the reproduction: under a *genuine* mouse hover the microtask checkpoint fires while
dispatch is still in flight, so `currentTarget` is usually still live and the coordinates get
written (I measured `top: 484.812px; left: 153px` on one real hover). Under programmatic dispatch it
throws every time. So this is an **intermittent** unhandled `TypeError` that depends on
microtask-checkpoint timing — and it is unconditionally wrong regardless, because the values it
computes are inert against `position: static` (C-2). The `as Element` cast is what let a
`null`-typed value through the type system.

**Cure.** Capture `e.currentTarget` into a local **inside** the synchronous handler body; the cast
disappears with it. (Moot if C-2 is cured by adopting the reka-ui `Popover`, which positions itself.)

---

### C-7 — `defineExpose` + the consumers' `cardRefs` map: unbounded growth holding dead component instances

`PaletteCard.vue:244` exposes an imperative handle:

```ts
defineExpose({ showFeedback });
```

Both consumers therefore keep a ref map, and both register it the same way —
`BrowsePane.vue:94` / `PalettesPane.vue:84`:

```vue
:ref="(el: any) => el && (cardRefs[palette.slug] = el)"
```

Vue invokes a function ref with `null` on unmount. The `el &&` guard makes that call a **no-op**, so
nothing is ever deleted from `reactive<Record<string, InstanceType<typeof PaletteCard>>>`
(`BrowsePane.vue:209`, `PalettesPane.vue:177`). Every browse page-in
(`BrowsePane.vue:140 pm.loadMoreRemotePalettes()`), every filter change, every sort re-key leaves a
permanently-retained component instance — and through it the entire subtree, its `useLiquidPress`
spring, its `useHoverPopover` closure, and its `Palette` object. The map only grows for the lifetime
of the session.

The `as any` cast in the ref callback is what hides the `null` from the type checker.

**Cure.** This is an architectural transposition, not a delete-key fix. The imperative handle is the
root cause: it forces every host to build an identity map to reach one method. Make feedback data:
lift `{ slug, message, variant }` into the pane and pass it down as a prop
(`:feedback="feedback?.slug === palette.slug ? feedback : null"`). `defineExpose`, both `cardRefs`
maps, both `(el: any)` casts, and the leak all disappear together.

---

### C-8 — The rename row: two nameless 18×18 buttons, an unnamed input, and focus dropped to `<body>`

`PaletteRenameInput.vue:18-30` renders a submit and a cancel button carrying **only** an icon:

```vue
<button type="submit" class="p-0.5 rounded-sm …"><Check class="w-3.5 h-3.5 …" /></button>
<button type="button" class="p-0.5 rounded-sm …" @click="$emit('cancel')"><XIcon … /></button>
```

Measured live with the rename row open (P12):

```json
{ "buttons": [ { "name": "Palette menu", "w": 36, "h": 36 },
               { "name": "", "type": "submit", "w": 18, "h": 18 },
               { "name": "", "type": "button", "w": 18, "h": 18 } ],
  "nameless": 2,
  "smallTargets": [ 18×18 submit, 18×18 cancel ] }
```

**This is PaletteCard's contribution to the REPORT's counters: +2 nameless buttons and +2
sub-24 px tap targets per open rename row** — 18×18 against the 24×24 floor, 56 % of the required
area. The input itself has no `aria-label` and no `<label>`; its only name is the
`placeholder="Palette name..."` fallback, the weakest rung of the accname algorithm.

Focus management is also absent. `PaletteRenameInput.vue:53-56` correctly focuses and selects on
mount, but nothing restores focus on teardown. Measured (P13): with focus in the input, `Escape` →

```json
{ "focusedBefore": "INPUT.input-bar-field", "focusedAfterCancel": "BODY.relative", "focusIsBody": true }
```

The keyboard user is ejected to the top of the tab order. The same happens on submit
(`PaletteCard.vue:288 renaming.value = false`).

Note the asymmetry that proves this is an oversight rather than a decision: the three swatch-popover
buttons and the slug-copy button in `PaletteCardSwatches.vue` all carry explicit `:aria-label`
(lines 15, 43, 50, 57) under a `W5-a11y` comment. The rename row was simply missed by that sweep.

---

### C-9 — `aria-hidden="true"` on a container holding two tabbable buttons

`SwatchHoverMenu.vue:40-50` marks the hover panel `aria-hidden="true"` with the comment
*"hover-only panel is keyboard-inaccessible — hidden from AT."* Measured with the panel open:

```json
{ "panelAriaHidden": "true", "tabbableInPanel": 2,
  "panelButtons": [ { "name": "Edit color oklch(63.94…deg)", "w": 28, "h": 28, "tab": 0 },
                    { "name": "Copy color oklch(63.94…deg)", "w": 28, "h": 28, "tab": 0 } ] }
```

WAI-ARIA 1.2 §`aria-hidden`: *"Authors MUST NOT use `aria-hidden="true"` on … an element that
contains focusable elements."* Chromium enforces this at runtime (the "Blocked aria-hidden on an
element because its descendant retained focus" class). A user tabbing after a hover lands inside a
subtree the accessibility tree says does not exist.

The comment also documents the fallback that does not exist: *"The reka-ui Popover (touch path) is
the accessible route."* On a fine pointer `canHover === true`, so that branch never mounts (P9 was
taken on the hover branch). There is no accessible route.

**Cure.** Same as C-2: one `Popover` for both pointer classes. reka-ui manages `aria-hidden`,
focus, and dismissal correctly by construction.

---

## MINOR

### C-10 — `@click.stop` on the title swallows the expand click whenever `editableName` is false

`PaletteCard.vue:53-59`:

```vue
<span v-if="!renaming" … @click.stop="editableName && startRenaming()">{{ palette.name }}</span>
```

The `.stop` modifier is **unconditional** — Vue compiles it to a `stopPropagation()` call that runs
before the expression is evaluated. `editableName` is unset on the browse wall
(`BrowsePane.vue:92-117` does not pass it), so on `/#/browse` clicking a palette's **name** — the
most obvious target on the card — stops propagation and does nothing at all: no rename (correctly
gated), no expand (incorrectly suppressed). Cure: `@click="editableName && (startRenaming(), $event.stopPropagation())"`
is the contrivance; the honest form is `v-if`-splitting the editable title into its own `<button>`,
which C-4 wants anyway.

### C-11 — The `action !== "rename"` guard is provably dead and its comment is false

`PaletteCard.vue:290-318`:

```ts
// `rename` opens an inline input — keep the menu open visually until the
// input takes focus; all other actions close the menu immediately.
…
if (action !== "rename") menuOpen.value = false;
fn();
```

but `startRenaming` (`PaletteCard.vue:280-283`) opens with `menuOpen.value = false;`. Both branches
close the menu. The guard cannot change any observable behaviour, and the comment describes an
intent the code contradicts. Delete both.

### C-12 — `scrollIntoView({ behavior: "smooth" })` is ungated by `prefers-reduced-motion`

`useHeightTransition.ts:48`, in `onAfterEnter`:

```ts
htmlEl.scrollIntoView({ behavior: "smooth", block: "nearest" });
```

The global PRM guard (`demo/styles/animations.css:184-192`) sets `scroll-behavior: auto !important`,
but CSSOM-View is explicit that an author-supplied `behavior` **overrides** the computed
`scroll-behavior` — the property is consulted only when `behavior` is `"auto"`. So every card
expansion smooth-scrolls a reduced-motion user. The repo already knows this: `EasingSpecimenStrip.vue:40`
carries the comment *"Never `scrollIntoView`: even with…"*. `block: "nearest"` limits the blast
radius (no scroll when already in view) but does not remove it. Cure: read the media query and pass
`behavior: prefersReduced ? "auto" : "smooth"`.

### C-13 — `ActionFeedback` announces nothing

`ActionFeedback.vue:4-15` renders a bare `<div>` with no `role="status"`, no `aria-live`, no
`aria-atomic`. It is the sole surface reporting the outcome of four async operations
(`BrowsePane.vue:226-265`) — save, delete, visibility flip, fork error — and it is silent to screen
readers. A single `role="status"` on the chip fixes it.

### C-14 — Mixed reka-ui event idiom inside `PaletteCardMenu`

`PaletteCardMenu.vue` drives eleven items with `@click` (lines 18, 31, 52, 66, 76, 86, 96, 136, 146,
158, 165) and five with `@select` (lines 113–127), and works around the sub-trigger with
`@click.prevent` (line 108). `@select` is the primitive's own semantic event (it fires for keyboard
activation and typeahead as well as pointer); `@click` is the DOM leak-through. Two idioms for one
behaviour in one file is exactly the drift the barrel comment claims to prevent.

### C-15 — `PaletteCard` is the only file in its own folder that does not use reactive props destructure

`PaletteCard.vue:182-198` uses `withDefaults(defineProps<…>())` and then reads `props.palette`
eleven times, while `PaletteCardMenu.vue:206`, `PaletteCardMeta.vue:61` and
`PaletteRenameInput.vue:39` all use `const { … } = defineProps<…>()`. Standing edict 7 names reactive
props destructure as the idiom. Also: `expanded?: boolean | undefined` and its six siblings restate
`| undefined` that `?` already implies — noise, not typing.

*(`verbatimModuleSyntax` — edict 8 — is **satisfied** across all six files: every type-only import is
`import type` or an inline `type` specifier. Checked individually.)*

---

## The decomposition — judged directly

**The god module was distributed, not dissolved.**

| file | lines | own state | own logic |
|---|---:|---|---|
| `PaletteCard.vue` | 364 | 4 refs + 4 composables | 17 emits, 18-branch action table, ink certification |
| `PaletteCardMenu.vue` | 228 | — | 2 computeds (`apiOffline`, `isPublic`) |
| `PaletteCardSwatches.vue` | 96 | **none** | **none** |
| `PaletteCardMeta.vue` | 64 | — | — |
| `PaletteRenameInput.vue` | 66 | 1 ref | trim/compare |
| `ActionFeedback.vue` | 58 | 1 timer | the dismissal watcher |

Three of the six splits are along real seams and I would keep them:

- **`PaletteCardMenu`** owns a genuinely separable concern (the 16-item permission matrix over
  `paletteKind × isOwned × isAdmin`) and holds its own dependency (`useApiClient`). Real seam.
- **`PaletteRenameInput`** owns a mode with its own lifecycle (mount-focus, local draft, escape). Real
  seam — it is the one child that is not a pass-through.
- **`ActionFeedback`** owns a timer. Real seam, badly implemented (C-5).

**`PaletteCardSwatches` is a wrapper component that earns nothing** — the exact shape
`feedback_kiss_no_contrivance` forbids. It declares 8 props and 8 emits (96 lines) and contains
**zero** state and **zero** logic. Every one of its props is a member of the `useHoverPopover()`
destructure in its parent (`PaletteCard.vue:246-255`), and every one of its emits is routed straight
back to a handler from that same destructure (`PaletteCard.vue:149-156`). It is a 16-link pass-through
between a composable and its consumer, both of which live one component apart. The seam is drawn in
the wrong place: `useHoverPopover` state is *entirely local to the swatch row* — the only reason
`PaletteCard` holds it is `onBeforeCollapse: () => { openPopoverIndex.value = null; }`
(`PaletteCard.vue:277`), one line, which an `@collapse` emit or the child's own
`watch(() => expanded)` covers. Move `useHoverPopover()` into `PaletteCardSwatches`, and 8 props
collapse to 4 (`colors`, `isLocal`, `displaySlug`, `swatchClass`) and 8 emits collapse to 3
(`popoverAdd`, `popoverEdit`, `popoverCopy`). Then it is a real component.

**`PaletteCardMeta` is a marginal split.** 64 lines of pure markup with one emit, and it is a
*fragment* — it renders four sibling roots directly into the parent's flex row, so it cannot be
styled or positioned as a unit and is not independently meaningful. It reads as a paste-extraction
made to reduce a line count ("PP-8 cap cure" per its own header comment), which is the wrong reason.
It is not harmful; it is not load-bearing either.

**And the centre did not move.** `PaletteCard.vue` still declares **17 emit variants** (lines 200-218)
and an 18-entry string-keyed dispatch table (lines 293-313) whose contract with its own child is an
untyped `action: [action: string]` (`PaletteCardMenu.vue:225`). `if (!fn) return;` (line 316)
silently swallows any string the child sends that the table does not know — a rename on either side
of that seam fails silently at runtime, with no type error and no test. That is the god-module
smell that survived the six-file split intact. The table should be typed
(`emits: { action: [action: MenuAction] }` with `MenuAction` a union), which makes the `!fn` branch
unreachable and deletable.

Verdict on the split: **two of six files should not exist in their current form, and the file that
was supposed to shrink did not.** The 364-line parent is 172 lines of script coordinating four
composables, three ref-held modes, and seventeen outward events.

---

## Test truth — a vacuous gate

**There is no test that would fail if PaletteCard were broken. It is broken, and nothing failed.**

```
$ grep -rln "PaletteCard" test/ demo/test/
(no matches)
$ grep -rln "useHoverPopover\|useHeightTransition\|useLeaveTimer" test/ demo/test/
(no matches)
```

The vitest suite (`vitest.config.ts` includes `test/**/*.ts` + `demo/test/**/*.ts`) mounts none of
the six files and exercises none of the four composables. The e2e suite touches only two controls:

- `e2e/smoke/flows/palette-delete.spec.ts` — clicks `"Palette menu"`, then `Delete`.
- `e2e/smoke/flows/vote-toggle.spec.ts` — clicks the heart.
- `e2e/smoke/oracles/o7-card-census.spec.ts:183` — asserts `[role="article"].bg-well` resolves to the
  `--well-bg` token. A *material* census, not a behaviour test.

`grep -rn "expand" e2e/` returns dock and band tests only. **No test in the repository ever expands a
palette card**, which is why C-1, C-2, C-6 and C-9 — every defect in the expanded region — have
shipped unnoticed since March.

**Named mutations that keep the entire suite green:**

1. Delete `@click="$emit('click')"` from `PaletteCard.vue:26`. Expansion dies completely. **Green.**
2. Change `PaletteCard.vue:226` to `colors[1]?.css`. Every card's certified ink is wrong. **Green.**
3. Delete `PaletteCardSwatches.vue` and replace it with `<template />`. The expanded card renders
   empty. **Green.**
4. Change `ActionFeedback.vue:30` default `autoDismissMs` to `0`. Feedback never dismisses. **Green.**
5. Delete `defineExpose({ showFeedback })` (`PaletteCard.vue:244`). Four async verdict paths in
   `BrowsePane` throw `card.showFeedback is not a function`. **Green.**

The visual audit does not cover the gap either. `REPORT.json` records for
`safari-desktop-light /#/browse`:

```json
"consoleWarnings": ["Failed to load remote palettes: SyntaxError: The string did not match the expected pattern."]
```

and `/#/palettes` shows *"No saved palettes yet."* in `shots/safari-desktop-light/palettes.png`
(I read the image). **Both palette routes were captured with zero cards mounted**, so PaletteCard
contributes 0 to the REPORT's 60 small-tap-targets and 18 nameless-buttons. Its true contribution,
measured here, is **+2 nameless and +2 sub-24 px per open rename row**, plus a swatch row whose
controls the probe's `button` selector cannot even see because they are `<span aria-hidden="true">`.

**Cure for the gate.** Two files, no new infrastructure: a vitest mount test for the card that
expands it and asserts the swatch row renders *named, focusable* controls (which fails today on
C-1), and one e2e that expands a card and clicks a swatch (which fails today on C-1 and C-2). Seed
via `localStorage["color-palettes"]` before boot — the store is a plain `useStorage` singleton
(`demo/palettes/usePaletteStore.ts:6`), so no API is needed, as this audit demonstrated.

---

## Standing-edict compliance

| # | Edict | Verdict |
|---|---|---|
| 1 | No god modules | **VIOLATED** — 17 emits + 18-branch untyped dispatch table survived the six-file split |
| 2 | No legacy code | PASS — no shims, aliases, or dual paths found |
| 3 | KISS, no contrivance | **VIOLATED** — `PaletteCardSwatches` is an 8-in/8-out pass-through with no state |
| 4 | glass-ui is the design system | **VIOLATED** — `.floating-panel` is a demo-local fork that was deleted without a glass-ui replacement (C-2); `tag="button"` invents a glass-ui prop that does not exist (C-1) |
| 5 | Root-level styling | PASS — the two scoped rules (`PaletteCard.vue:343-354`) are token-level, not per-instance |
| 6 | Animations never deleted | **VIOLATED in spirit** — `floating-panel-in` (referenced by the deleted rule) was removed, not moved; the panel now has no entrance at all |
| 7 | Idiomatic Vue 3.5 | PARTIAL — `useTemplateRef` used correctly; `PaletteCard` alone skips reactive props destructure (C-15); `defineExpose` imperative handle is the wrong instrument (C-7) |
| 8 | `verbatimModuleSyntax` | **PASS** — verified file by file |

Hazard sweep from the brief: **`defineModel` stale reads** — not applicable, the component uses no
`defineModel`. **oklch→HSV hue drift / `stableHue`** — not applicable, no HSV roundtrip here.
**`ValueUnit` nesting** — not applicable, no `ValueUnit` construction. **reka-ui pointer-capture
leak** — no sliders in this component. **Ungated rAF** — none in the six files or four composables;
`useLiquidPress`'s spring is glass-ui-owned and PRM-aware by declaration. **WebGL** — none.
`useLeaveTimer` (`useLeaveTimer.ts:1-17`) has no unmount cleanup, but its callback only nulls a ref,
so it is inert on a dead component — noted, not filed.
