# CHALLENGE-C — PaletteCard: implementation interrogation · **PASS 2**

> Pass 1 (same day, earlier session) is preserved verbatim at
> `challenge-C-implementation.pass-1-2026-07-27.md`. This pass is an **independent
> re-run**, not an edit of it: I ran my own probe battery before reading pass 1. Where we
> converge I say so and add the second, independent measurement (convergence from two
> unrelated method paths is stronger evidence than either alone). Where I go past it, the
> finding is marked **NEW**. Where I contradict it, marked **CORRECTION**.

## Model receipt

I observe myself to be **Opus 5 (1M context)**, exact model ID `claude-opus-5[1m]`, spawned
with an explicit Opus 5 declaration. The seat is declared, not inherited, not downgraded.

---

## Verdict

**DEFECTIVE — five BLOCKER, ten MAJOR, four MINOR, one INFO.**

Pass 1's headline stands and I confirm it independently: **the expanded PaletteCard's entire
per-colour action surface is inert.** Two further blockers that pass 1 did not reach:

- **A single poisoned colour string on the PUBLIC browse wall destroys the wall for every
  visitor.** Pass 1 reproduced the `parseCssColor` throw from a locally-seeded palette. I
  reproduced it **through the remote browse feed** — the threat model that matters, because
  `api/src/modules/palette/schema.ts:28` accepts `css: z.string().min(1).max(200)` with no
  colour validation, so any authenticated user can publish `"oklch()"` and take down
  `/#/browse` for everyone. Measured: 2 cards → **0 cards**, pane replaced by
  *"This panel hit an unexpected error."*, taking an innocent neighbour palette with it.
- **The rename input is focus-stolen by reka's dropdown focus-restore**, so "Rename" opens a
  text field that never receives the caret, and the user's first <kbd>Enter</kbd> re-opens
  the menu they just used. Measured focus at 150 ms vs 800 ms.

And the gate is not merely absent — **it is present, it is aimed at exactly this surface, and
it passes green.** I ran it.

Environment: brief cites `c654824e`; HEAD is `7cae8bd0`; the six component files are
byte-identical at both. All six files last touched 2026-07-17.

---

## Evidence apparatus (pass 2)

The shared dev server on `:9000` runs `dev:web-only` with no `VITE_API_URL`, so
`demo/platform/transport/availability.ts:189` latches `misconfigured` and **throws before
issuing any fetch** — no palette can ever reach the wall there. (That is also why the
mega-tranche visual matrix captured zero PaletteCards; see C-19.) I stood up an isolated
read-only Vite with the API base set, and intercepted `GET /palettes` in Playwright:

```
VITE_API_URL=http://localhost:9123 npx vite --port 9123     # bound :9124
node <scratchpad>/pcard-probe{2,3,4,5,6,7,8,9}.mjs
```

Nothing under `src/`, `demo/`, `api/`, `test/`, `e2e/`, `docs/tranches/V/vnext/`,
`scripts/dev/dev.sh` or any `INBOX.md` was modified. Probes live in the session scratchpad;
this report is the only file written.

| # | Probe | Result |
|---|---|---|
| Q1 | 22 real `Tab` presses across the populated browse wall | card **never** enters the tab order |
| Q2 | `el.focus()` on `[role="article"]`, read `document.activeElement` | `cardFocusable: false`, active stays `body` |
| Q3 | click the palette **title** on a browse card | 0 expansions; click 20 px away → expands |
| Q4 | battery-shaped scan of `main`, collapsed / expanded / rename-open | 0 / 1 / 3 sub-24 px, 0 / 0 / 2 nameless |
| Q5 | hover a swatch, read the panel's **computed** style | `position: static`, transparent, `parent: BODY`, rect `{top:900, left:-720, w:1440}` |
| Q6 | iPhone 13 emulation (`hover: hover` → false), tap a swatch | `rekaPopover: 0`, `floatingPanel: false`, `addBtn: false` |
| Q7 | click a swatch while its panel is open (toggle-close path) | panel still open → `onSwatchClick` never ran |
| Q8 | context booted `reducedMotion: "reduce"`, expand a card | PRM `true`; inline `transition: height 350ms cubic-bezier(...)` written anyway |
| Q9 | Save twice, 2nd at t=2250 ms inside the 2500 ms window | 2nd chip lived **613 ms**; `role: null`, `aria-live: null` |
| Q10 | menu → Rename, sample `activeElement` at 150 ms and 800 ms | `input` → **`button "Palette menu"`** |
| Q11 | remote wall seeded with `colors[0].css = "oklch()"`, expand | 2 articles → **0**; pane = error boundary |
| Q12 | `npx playwright test a11y-authed-user.spec.ts --project=smoke-admin` | **2 passed (12.1s)** |
| Q13 | `grep -rn "floating-panel"` across `demo/ src/ node_modules/@mkbabb/glass-ui/` | 2 prose hits, 1 consumer, **0 rule declarations** |
| Q14 | read `glass-ui/dist/watercolor-dot.js` render fn | `inheritAttrs:!1`, forwards only `class`/`style`, hardcodes `aria-hidden` + `pointerEvents:"none"` |

---

## BLOCKER

### C-1 · BLOCKER — `WatercolorDot` discards `tag`, `aria-label` and every listener; the swatch is `aria-hidden` + `pointer-events: none`

*(Converges with pass 1 C-1, reached independently. New here: the **touch-device measurement**
and the **toggle-close proof**.)*

`SwatchHoverMenu.vue:14-20` (touch branch) and `:29-36` (hover branch) pass `tag="button"`,
`:aria-label="\`Color swatch ${color}\`"` and `@click.stop="$emit('click')"` to
`WatercolorDot`. The built producer component
(`node_modules/@mkbabb/glass-ui/dist/watercolor-dot.js`):

```js
inheritAttrs: !1,
props: { color:{}, variant:{default:"solid"}, animate:{...}, cycleDuration:{...},
         range:{...}, seed:{default:""} },
setup(e){ let ... c = i(() => n.class), f = i(() => n.style), ...
  return (t,n) => (d(), o("span", {
      "aria-hidden": "true",
      class: l([c.value, "watercolor-swatch", ...]),
      "data-testid": "watercolor-swatch", "data-variant": e.variant,
      style: u([f.value, { backgroundColor: ..., borderRadius: ...,
                           pointerEvents: "none", ... }]) }), ...
```

No `tag` prop exists; `inheritAttrs:false` plus a render that re-reads **only** `attrs.class`
and `attrs.style` means the `aria-label` and **every DOM listener** — including the ones
reka's `PopoverTrigger as-child` grafts on — are dropped. Live DOM of a swatch in an
expanded browse card:

```html
<div class="relative"><!-- Touch: native Popover click toggle -->
  <span aria-hidden="true" class="w-9 h-9 sm:w-10 sm:h-10 shrink-0 cursor-pointer watercolor-swatch"
        data-testid="watercolor-swatch" data-variant="solid"
        style="background-color: rgb(225,29,72); … pointer-events: none; …">
```

Three measured consequences:

1. **The touch path is entirely dead (NEW measurement).** iPhone 13 emulation,
   `matchMedia("(hover: hover)").matches === false` so the reka `Popover` branch mounts;
   expanded card; `page.touchscreen.tap()` on the swatch centre:
   ```json
   { "rekaPopover": 0, "floatingPanel": false, "addBtn": false }
   ```
   The rendered trigger DOM is the bare inert `<span>` — reka attached nothing.
   **On a phone, Add-to-palette / Edit colour / Copy colour cannot be reached at all.**
2. **`@click` never fires (NEW proof by toggle).** With the panel already open, clicking the
   swatch left it open (`desktop.panelAfterClickWhileOpen: true`). `onSwatchClick`
   (`useHoverPopover.ts:51-54`) toggles `openIndex` to `null`, so a live click would have
   closed it. It did not. Therefore
   `PaletteCard.vue:152 @swatch-click="onSwatchClick"` ← `PaletteCardSwatches.vue:36` ←
   `SwatchHoverMenu.vue:35` is **unreachable code**, and so is
   `@popover-touch="onPopoverUpdateTouch"` (its only driver is the popover that cannot open).
3. **Invisible to assistive tech.** `aria-hidden="true"` on the dot, `aria-hidden="true"` on
   the hover panel (`SwatchHoverMenu.vue:44`), `aria-hidden role="presentation"` on the strip
   (`PaletteColorStrip.vue:3-4`). A screen-reader user who expands a palette card perceives
   **nothing** — no colours, no per-colour actions. The comment at `SwatchHoverMenu.vue:38-39`
   ("the reka-ui Popover (touch path) is the accessible route") names a route that
   measurement (1) shows does not exist.

**Cure** — the swatch's semantics belong to the consumer, not the decoration.
`SwatchHoverMenu` renders its own `<button type="button" :aria-label>` and mounts
`<WatercolorDot>` inside it as pure decoration (its `aria-hidden` / `pointer-events:none`
then become *correct by construction*). One element, one file, no new prop. A polymorphic
`tag` belongs in glass-ui if it is ever genuinely wanted (edict 4) — but KISS says do not buy
back with a producer prop what a wrapping `<button>` gives for free.

---

### C-2 · BLOCKER — `.floating-panel` is declared nowhere; the hover popover renders unstyled, `position: static`, off-screen at the bottom of `<body>`

*(Converges with pass 1 C-2. New here: computed-style + screenshot from the desktop 1440×900
frame, and the `translateX(-50%)` interaction.)*

`SwatchHoverMenu.vue:40-50` teleports the action panel to `body` with `class="floating-panel"`
and inline `top`/`left` from `useHoverPopover.positionPanel` (`useHoverPopover.ts:20-24`).

```
$ grep -rn "floating-panel" demo/ src/ node_modules/@mkbabb/glass-ui/
demo/DESIGN.md:273                                       (prose)
demo/styles/animations.css:2                             (prose)
demo/palettes/browser/card/SwatchHoverMenu.vue:42        (the consumer)
demo/palettes/browser/card/composables/useHoverPopover.ts:7  (prose)
```

Zero rule declarations, in the demo or in the producer. Measured computed style of the live
panel while hovering a swatch (viewport 1440×900):

```json
"panelComputed": {
  "position": "static", "zIndex": "auto",
  "background": "rgba(0, 0, 0, 0)", "boxShadow": "none", "borderRadius": "0px",
  "parent": "BODY",
  "rect": { "top": 900, "left": -720, "w": 1440, "h": 40 },
  "inline": "top: 494.656px; left: 258px; transform: translateX(-50%);"
}
```

`position: static` makes the inline `top`/`left` **inert**. The panel becomes a normal-flow
block at the end of `<body>`: full viewport width (1440 px), at `top: 900` — exactly the
fold, i.e. off-screen — and `transform: translateX(-50%)` (`PaletteCardSwatches.vue:31`)
drags it to `left: -720`, half of it past the left edge. No background, no shadow, no radius,
no stacking context. Screenshot `<scratchpad>/pcard-hover-panel.png` shows the card expanded
with the cursor resting on swatch #1 and **no popover anywhere on screen**.

Pass 1 supplied the archaeology I did not: the rule existed as
`demo/@/styles/floating-panel.css` (`position: fixed; z-index: var(--z-overlay); …`) and was
deleted on 2026-03-25 in `c84504d3` under the claim *"now provided by
`@import "@mkbabb/glass-ui/styles"`"*. It is not provided. **Four months unstyled.** I confirm
the absence in the installed producer independently (Q13).

Corollary I can add: `positionPanel`'s viewport-coordinate math is *correct for a rule that
no longer exists*, and the panel scrolls with the document (measured: panel `top` 900 → 860
for a 40 px scroll while its swatch moved 536.7 → 496.7).

**Cure** — do **not** re-add a demo-local `floating-panel.css`; that re-forks what glass-ui
was meant to absorb, and a popover is a component-type glass-ui/reka already owns. Retire the
hand-rolled Teleport branch and render the reka `Popover` on **both** pointer classes,
driving `:open` from `useHoverPopover` on fine pointers. That deletes `positionPanel`,
`floatingStyle`, the `aria-hidden` panel, and the `e.currentTarget` defect — one removal,
five findings.

---

### C-3 · BLOCKER — one malformed colour on the PUBLIC wall destroys the whole Browse pane for every visitor

*(Pass 1 proved the throw from a **locally-seeded** palette and from node/module probes.
**NEW: reproduced end-to-end through the remote browse feed**, which is the reachable threat
model, plus the neighbour-casualty measurement and the input-class refinement.)*

`PaletteCard.vue:223-230`:

```ts
const EMPTY_PALETTE_SWATCH = "#888";
const firstColor = computed(() => props.palette.colors[0]?.css ?? props.cssColor ?? EMPTY_PALETTE_SWATCH);
const { safeCss } = useSafeAccentFn("well");
const safeFirstColor = computed(() => safeCss(firstColor.value));
```

`safeFirstColor` is consumed only by the expanded region (`PaletteCard.vue:144` →
`PaletteCardSwatches.vue:10`), so it evaluates the moment a card is expanded. `safeCss` →
`certifyAccentInk` → `parseOklch` → `parseCssColor`, which **throws** rather than returning
`{ok:false}` on the empty-argument colour-function class.

Measured, four one-palette walls, each with an innocent "Neighbour" palette alongside; click
to expand the first card:

| `colors[0].css` | articles before → after | pane text |
|---|---|---|
| `"oklch()"` | **2 → 0** | *"This panel hit an unexpected error. Cannot read properties of undefined (reading 'replace') Try again"* |
| `""` | 2 → 2 | wall intact; **card silently fails to expand**; strip band renders with no `background-color` |
| `"not-a-color"` | 2 → 2 | wall intact, card expands |
| `"#e11d48"` (control) | 2 → 2 | wall intact, card expands |

The `oklch()` row is the blocker. **The Neighbour palette dies with it** — an
error boundary swallows the entire pane, so one poisoned row takes the whole public wall
down for every visitor. `pageErrors` and `consoleErrors` are both **empty** (the boundary
absorbs the throw), which is precisely why no console-scraping gate — including the
mega-tranche visual matrix — could ever have caught it.

Reachability: `api/src/modules/palette/schema.ts:28` is `css: z.string().min(1).max(200)` —
no colour validation. `"oklch()"` is a storable, publishable palette colour.

**NEW sub-finding (C-3b, MAJOR):** the `""` row exposes a second, separate defect in the
*same* three lines. `??` is nullish-coalescing, so an **empty string is not nullish** and
sails straight past the designed `EMPTY_PALETTE_SWATCH` fallback that
`PaletteCard.vue:220-223` documents at length ("a palette with zero colors is a real,
reachable state … this neutral mid-gray is the designed empty-state swatch"). Measured strip
DOM for `[{css:""},{css:"#333"}]`:

```json
"stripSegments": [ "width: 50%;", "background-color: rgb(51, 51, 51); width: 50%;" ]
```

— the first band has **no `background-color` at all**: an invisible segment inside a strip
whose badge still reads "2". (The accompanying silent non-expansion in that row is measured
but its mechanism is **not isolated** — flagged as an observation, not a certified cause.)

**Cure** — two layers, both at the root, neither a shim.
*Library:* `parseCssColor` must return `{ok:false}` for the empty-args class — this is R1 from
the π gate, still live; `certifyAccentInk` already **has** the correct degenerate
(`if (!accent) return css`), the throw simply bypasses it.
*API:* the schema should validate a colour, not a 200-char string.
*Demo:* `??` → `||` with a `.trim()`, and `PaletteColorStrip` should fall back to the same
named token per segment. Nothing about PaletteCard's structure needs to change: the defect is
that a **total** function is advertised where a **partial** one ships.

---

### C-4 · BLOCKER — the card's primary action is keyboard-inoperable, and the press composable's keyboard leg is bound to an unfocusable host

*(Converges with pass 1 C-4, which filed it MAJOR. I raise it to BLOCKER: it is a WCAG 2.1.1
Level-A failure on the **only** route to every expanded-region affordance, and it has already
forced a malformed workaround in a second pane — see C-14.)*

`PaletteCard.vue:5-27` is a `<div role="article">` with `@click="$emit('click')"`,
`cursor-pointer`, and `v-bind="press.handlers"`. Both hosts wire that click to expansion
(`BrowsePane.vue:102`, `PalettesPane.vue:91`).

```json
"cardStructure": [{ "tag":"div", "role":"article", "tabindex": null,
                    "ariaExpanded": null, "cursor":"pointer",
                    "label":"Palette: Ember Rose" }, …]
"tabReachedArticle": false     // 22 real Tab presses: dock → search → vote → menu → next card
"keyboardEnter":     { "cardFocusable": false, "activeTag": "body" }   // el.focus() is a no-op
```

No `tabindex`, no `@keydown`, no `aria-expanded`, and no alternative expand affordance
anywhere in the card. **A keyboard or switch user cannot expand a palette** — every swatch
action sits behind a gate they cannot open, before C-1 and C-2 even apply. The tab walk shows
the card's *descendants* (vote, menu) are reachable while the card itself is not, so the
disclosure state is both unreachable and unannounced (C-15).

The header comment at `PaletteCard.vue:2-4` argues `article`+click is "the correct pattern for
a card container that also houses nested interactive elements". The premise is right (nested
controls forbid `role="button"` on the container); the conclusion does not follow. The
idiomatic resolution is the **named primary action**.

Compounding, and independently verified in the producer source: `useLiquidPress`
(`glass-ui/dist/useLiquidPress-BOxuDkKa.js`) returns
`{ onPointerdown, onPointerup, onPointercancel, onPointerleave, onPointerenter, onKeydown, onKeyup, onBlur }`
— it has an explicit `b = (e) => e.key === "Enter" || e.key === " " || e.key === "Spacebar"`
leg. `PaletteCard.vue:24` binds all eight to an element that can never be focused: **three of
the eight are structurally dead.** The composable's own API is telling the call site it
expects a focusable host.

**Cure** — the expand affordance is a *disclosure*. Put a real `<button aria-expanded>` on the
card's header row (title + count), keep `role="article"` on the container, delete the
container `@click`. That fixes 2.1.1, gives the press handlers a legitimate host, removes the
Mix wrapper-button hack (C-14), announces the state (C-15), and cures C-9 for free.

---

### C-5 · BLOCKER (NEW) — "Rename" opens an input that is immediately focus-stolen by the dropdown's focus-restore; the guard written to prevent this is dead code

Pass 1 found the dead guard (its C-11) and the lost focus on *cancel* (its C-8) but did not
connect them or measure the open path. They are one defect.

`PaletteCard.vue:290-319`:

```js
function handleMenuAction(action: string) {
    // `rename` opens an inline input — keep the menu open visually until the
    // input takes focus; all other actions close the menu immediately.
    const actions: Record<string, () => void> = { …, rename: () => startRenaming(), … };
    const fn = actions[action];
    if (!fn) return;
    if (action !== "rename") menuOpen.value = false;      // ← line 317
    fn();
}
```

`startRenaming()` (`:280-283`) **opens with `menuOpen.value = false`**. So the
`action !== "rename"` guard can never change an observable, the comment describes an intent
the code contradicts, and the menu closes on the rename path exactly like every other. reka's
`DropdownMenu` then runs its focus-restore-on-close onto the trigger — *after*
`PaletteRenameInput`'s `onMounted → inputRef.focus(); inputRef.select()`
(`PaletteRenameInput.vue:53-56`) has already run.

Measured (`/#/palettes`, local palette, menu → Rename):

```json
"menuRename_focusAt150":  { "tag": "input",  "ph": "Palette name..." },
"menuRename_focusAt800":  { "tag": "button", "label": "Palette menu" },
"menuRename_inputPresent": true,
"menuRename_menuItemsStillInDom": 0
```

The rename row is on screen and **not focused**; focus sits on the menu trigger. A user who
picks "Rename" and types types into nothing — and their first <kbd>Enter</kbd> or
<kbd>Space</kbd> **re-opens the dropdown they just used**. The title-click entry path is
unaffected (`focusAt150ms` and `focusAt800ms` both report the input), which is what makes
this a silent, path-dependent failure.

**Cure** — delete the dead guard and its false comment; drive the rename open from the menu's
own close completion (`@closeAutoFocus.prevent` on `DropdownMenuContent`, focusing the input
in that handler), which is the idiomatic reka seam. Not a `setTimeout`.

---

## MAJOR

### C-6 · MAJOR — `ActionFeedback`: silent to AT, second message truncated, timer never cleared

*(Converges with pass 1 C-5 + C-13. Pass 1 proved the timer bug in a **synthetic vitest
harness**; NEW here is the measurement **in the running application**.)*

`ActionFeedback.vue:39-47` watches `props.visible`. A Vue watcher fires only on *change*;
`PaletteCard.showFeedback` (`:238-242`) writes `feedbackVisible.value = true`, which is a
**no-op write** when the chip is already visible. The in-flight timer is therefore neither
cleared nor re-armed, and the new message inherits the old message's remaining countdown.

Live, on the real browse wall — Save at t=0, Save again at t=2250 ms while the chip was still
up:

```json
"chipAfterFirstSave": { "text": "Saved!", "role": null, "ariaLive": null },
"chipStillVisibleAt2s": true,
"secondSaveAtMs": 2250,
"secondChipLifetimeMs": 613          // promised 2500 ms
```

(A control run with the second Save at t=2523 ms — just *outside* the window — gave
`secondChipLifetimeMs: 2752`, confirming the mechanism is the missed edge, not scheduler
noise.)

`BrowsePane.vue:226-265` fires `showFeedback` from four independent async paths (`onSave`,
`onDeleteOwned`, `onSetVisibility`, `onForkError`) against the same card, so two actions
inside 2.5 s make the second verdict — **including error verdicts** — flash for a few frames.

Two further defects in the same 58 lines: `role: null, aria-live: null` — the sole surface
reporting four async outcomes is **announced to nobody**; and `let timer` (`:37`) is never
cleared on unmount, so a card filtered/paged away inside the window leaves a live timeout
emitting into a destroyed instance.

**Cure** — watch the *message identity* (`() => [props.visible, props.message]`) and key the
transition on it so a new message is a new node; add `role="status" aria-live="polite"`;
register `onScopeDispose(() => clearTimeout(timer))`. Better still, fold the dismissal into
the caller and let the chip be pure presentation, which also deletes the `update:visible`
round-trip and half of C-8.

### C-7 · MAJOR — `prefers-reduced-motion: reduce` is ignored by the expand/collapse itself, not merely by the scroll

*(Pass 1 filed only the `scrollIntoView` half, as MINOR. NEW: the height morph is ungated
too, measured under a real PRM context.)*

`useHeightTransition.ts:7-10` hardcodes 350 ms / 250 ms and `:30` / `:61` write them into
`style.transition` with no PRM read; `:48` calls
`scrollIntoView({ behavior: "smooth", block: "nearest" })` unconditionally.

Booted with `reducedMotion: "reduce"`:

```json
"prm": { "prm": true, "log": [
  { "style": "height: 111px; opacity: 1; transition: height 350ms cubic-bezier(0.16, 1, 0.3, 1), opacity 350ms;" }, … ] }
```

`matchMedia("(prefers-reduced-motion: reduce)")` is `true` and the animation runs at full
duration anyway, followed by a smooth page scroll. Pass 1 correctly notes the global guard
(`demo/styles/animations.css:184-192`, `scroll-behavior: auto !important`) cannot help,
because CSSOM-View consults `scroll-behavior` only when the author passes `behavior: "auto"`.
Nor can it help the inline `transition` string, which no stylesheet can override.

This is a hole in an otherwise scrupulous sweep — `PaletteCard.vue:29` ("PRM-zeroed"), `:62`
("PRM-gated"), `:264` ("PRM-instant by construction"), and glass-ui's own `useRAFLoop` called
with `respectReducedMotion: !0`. WCAG 2.3.3 and the constellation's own PRM law.

**Cure** — the height morph belongs in the `vj-*` transition family this very file already
uses for `rename-morph` and `feedback-chip` (custom properties + a PRM media query), not in
imperative JS. If it must stay JS, read glass-ui's `useReducedMotion` and zero both durations
and the scroll behaviour.

### C-8 · MAJOR — `defineExpose` + unpruned `cardRefs`: unbounded retention of dead component instances

*(Converges with pass 1 C-7.)*

`PaletteCard.vue:244` exposes `showFeedback`, so both hosts keep an instance map registered
identically — `BrowsePane.vue:94`, `PalettesPane.vue:84`:

```vue
:ref="(el: any) => el && (cardRefs[palette.slug] = el)"
```

Vue invokes a function ref with `null` on unmount; the `el &&` guard makes that call a
**no-op**, so nothing is ever removed from
`reactive<Record<string, InstanceType<typeof PaletteCard>>>` (`BrowsePane.vue:209`,
`PalettesPane.vue:177`). Every "More from the commons" page-in (`BrowsePane.vue:140`), every
filter change, every sort re-key permanently retains a component instance — and through it the
subtree, its `useLiquidPress` spring, its `useHoverPopover` closure and its `Palette` object.
`reactive()` on the map also means every insert re-triggers anything tracking it. The
`(el: any)` cast is what hides the `null` from the type checker.

Stated as a retention argument, not a heap measurement — absence of collection cannot be
photographed.

**Cure** — architectural transposition, not a delete-key fix. The imperative handle is the
root cause: it forces every host to build an identity map to reach one method. Make feedback
**data** — lift `{ slug, message, variant }` into the pane and pass it down
(`:feedback="feedback?.slug === palette.slug ? feedback : null"`). `defineExpose`, both
`cardRefs` maps, both `any` casts and the retention all disappear together.

### C-9 · MAJOR — clicking the palette **title** is a dead zone whenever `editableName` is falsy

*(Converges with pass 1 C-10, which filed it MINOR. I raise it to MAJOR on the measurement:
it silently kills the single most obvious target on every card of the public wall.)*

`PaletteCard.vue:53-59`:

```html
<span v-if="!renaming" class="font-display …"
      :class="editableName && 'cursor-text hover:underline …'"
      @click.stop="editableName && startRenaming()"
>{{ palette.name }}</span>
```

`.stop` is a compile-time modifier: `stopPropagation()` runs **before** the expression is
evaluated. `BrowsePane.vue:92-117` does not pass `editableName`, so on `/#/browse` the
handler is a no-op *and* swallows the click.

Measured: clicking the title → `afterTitleClick_expandedBodies: 0`; clicking card chrome
20 px away → expanded (the `Copy slug` control appears). The `cursor` there is `pointer`
(inherited from the root), so the affordance actively lies. Cross-check: on `/#/palettes`,
where `editableName` **is** passed, the same span reports `cursor: text` and does start a
rename — the divergence is real, not a probe artefact.

**Cure** — the patch is
`@click="editableName ? (($event.stopPropagation()), startRenaming()) : undefined"`; the
gestalt cure is C-4's — once the disclosure is a real header button, the title is inert text
and rename is a named control, not an undiscoverable click on a label.

### C-10 · MAJOR — `PaletteRenameInput`: two nameless 17.5 px buttons, an unnamed field, focus dropped

*(Converges with pass 1 C-8; my geometry is 17.5 px vs their 18 px — same sub-pixel box at a
different device-pixel-ratio rounding.)*

`PaletteRenameInput.vue:18-30` — submit (`Check`) and cancel (`XIcon`) carry no `aria-label`;
the `<input>` (`:11-17`) has no `aria-label` and no `<label for>`, leaving `placeholder` as
its only name (the weakest rung of accname). Measured with the row open:

```json
"renameButtons": [ { "type":"submit", "name":"", "w":17.5, "h":17.5 },
                   { "type":"button", "name":"", "w":17.5, "h":17.5 } ],
"renameInput":   { "ariaLabel": null, "id": null, "w": 275.5, "h": 23.9 }
```

Two WCAG 4.1.2 failures and three 2.5.8 (AA) failures in one 66-line file — 17.5 × 17.5
against a 24 × 24 floor is 53 % of the required area. Focus is also unrestored on teardown
(pass 1 measured `activeElement → BODY` on Escape from the title path; my menu path lands on
the menu trigger, see C-5).

The asymmetry proves oversight rather than decision: every icon button in the sibling
`PaletteCardSwatches.vue` (lines 15, 43, 50, 57) carries an explicit `:aria-label` under a
`W5-a11y` comment, and `PaletteCard.vue:96-104` already consumes the glass-ui atom with the
note *"S.W5-4: 3rd copy of the hand-rolled icon-trigger recipe dies onto the glass-ui atom;
the sm square also cures the ~24px touch target."* This is the **4th copy** — it never made
the trip.

**Cure** — consume `Button icon-only variant="ghost" size="sm"` (already imported in the
parent) and give the field an `aria-label`.

### C-11 · MAJOR (NEW) — the `Copy slug` button is 16 × 16 px

`PaletteCardSwatches.vue:13-19` — `p-0.5` around a `w-3 h-3` glyph. Measured on the expanded
browse card: `{ "label": "Copy slug gallery", "w": 16, "h": 16 }`. WCAG 2.5.8 AA. Pass 1
measured only the rename row and missed this one; it is the **only** sub-24 px control
present in the expanded state, and therefore the cheapest possible regression test for C-12.
Same cure as C-10.

### C-12 · MAJOR (NEW) — the gate is not missing; it exists, it is aimed here, and it passes green

Pass 1 concluded "no test would fail if PaletteCard were broken" from `grep`. That
under-states it. `e2e/smoke/admin/a11y-authed-user.spec.ts:19-44` is titled *"battery: the
populated browse wall passes accessible-name + target-size"* and asserts
`nameless === []` **and** `undersized === []` over exactly this surface. I ran it:

```
$ npx playwright test e2e/smoke/admin/a11y-authed-user.spec.ts --project=smoke-admin --reporter=line
Running 2 tests using 1 worker
  2 passed (12.1s)
```

Green — because it **never expands a card and never opens the rename row**. My
battery-shaped scan of the same `main`, same wall, three states:

| state | nameless | sub-24 px |
|---|---|---|
| collapsed wall — *what the spec measures* | 0 | 0 |
| one card expanded | 0 | **1** (`Copy slug` 16 × 16) |
| rename row open | **2** | **3** (2 × 17.5 px + the 23.9 px field) |

Two further structural blind spots in the same helper: its `OPERABLE` selector
(`e2e/smoke/admin/fixtures/a11y-battery.ts:66-67`) matches only native tags plus a role
allow-list, so the `role="article"` click host (C-4) and the clickable title `<span>` (C-9)
are **invisible to it by construction**; and `keyboardFacts()` (`:222`) — the one helper that
could catch C-4 — is never called against the card in any spec.

**The exact mutation that keeps this gate green:** delete every `aria-label` in
`PaletteCardSwatches.vue`, delete `role` and `aria-label` from the card root, and shrink every
expanded-state control to 1 × 1 px. Two tests, still green.

Pass 1's five green-keeping mutations on the vitest side all stand; I re-verified the
premises (`grep -rln "PaletteCard" test/` → no matches; no e2e anywhere expands a card).

**Cure** — the gate needs *states*, not the resting frame: expand a card, open the rename row,
open the menu, re-run the battery at each; add one `keyboardFacts` assertion on whatever owns
the expand click. Seeding needs no API — `localStorage["color-palettes"]` is a plain
`useStorage` singleton (`demo/palettes/usePaletteStore.ts:6`), as both passes demonstrate.

### C-13 · MAJOR — the decomposition: the god module was distributed, not dissolved

*(Converges with pass 1's decomposition section. NEW: the primary-source admission.)*

Two of the five children state their own reason for existing, and it is a line count:

- `PaletteCardMeta.vue:2-4` — *"T.W5 (**PP-8 cap cure**, the H.W3 PaletteCardSwatches lift
  precedent): the metadata chip cluster … colocated out of PaletteCard.vue's title row."*
- `PaletteCard.vue:76-77` — *"Metadata chips … colocated lift (**T.W5 PP-8 cap cure**; the
  H.W3 sub-component precedent)."*

A cap cure is a paste-extraction. The **state did not move with it**:

| file | lines | own state | own logic |
|---|---:|---|---|
| `PaletteCard.vue` | 364 | 4 refs + 4 composables | 17 emits, 20-entry action table, ink certification |
| `PaletteCardMenu.vue` | 228 | — | 2 computeds (`apiOffline`, `isPublic`), owns `useApiClient` |
| `PaletteCardSwatches.vue` | 96 | **none** | **none** |
| `PaletteCardMeta.vue` | 64 | — | — |
| `PaletteRenameInput.vue` | 66 | 1 ref | trim/compare, mount-focus |
| `ActionFeedback.vue` | 58 | 1 timer | the dismissal watcher |

Three splits are real seams and I would keep them: `PaletteCardMenu` (a 16-item permission
matrix over `paletteKind × isOwned × isAdmin`, holding its own dependency),
`PaletteRenameInput` (a mode with its own lifecycle), `ActionFeedback` (a timer — real seam,
badly implemented).

**`PaletteCardSwatches` is a wrapper that earns nothing** — the exact shape
`feedback_kiss_no_contrivance` forbids: 8 props in, 8 emits out, 96 lines, **zero** state and
**zero** logic. Every prop is a member of the `useHoverPopover()` destructure in its parent
(`PaletteCard.vue:246-255`); every emit routes straight back to a handler from that same
destructure (`:149-156`). It is a 16-link pass-through between a composable and its consumer
one component apart. The seam is drawn in the wrong place: `useHoverPopover` state is
*entirely local to the swatch row*, and the only reason the parent holds it is
`onBeforeCollapse: () => { openPopoverIndex.value = null; }` (`:277`) — one line, which an
`@collapse` emit or the child's own `watch(() => expanded)` covers. Move `useHoverPopover()`
into the child: **8 props → 4** (`colors`, `isLocal`, `displaySlug`, `swatchClass`),
**8 emits → 3** (`popoverAdd`, `popoverEdit`, `popoverCopy`). Then it is a component.

**`PaletteCardMeta` is a marginal split** — 64 lines of pure markup, one emit, and it is a
*fragment* (four sibling roots rendered into the parent's flex row), so it cannot be styled or
positioned as a unit and is not independently meaningful. Not harmful; not load-bearing.

**And the centre did not move.** `PaletteCard.vue` still declares **17 emit variants**
(`:200-218`) and a **20-entry string-keyed dispatch table** (`:293-313`) rebuilt on every menu
click, whose contract with its own child is an untyped `action: [action: string]`
(`PaletteCardMenu.vue:225`). `if (!fn) return;` (`:316`) **silently swallows** any verb the
child sends that the table does not know — a rename on either side of that seam fails at
runtime with no type error and no test. That is the god-module smell that survived the
six-file split intact.

**Cure** — type the seam (`action: [action: MenuAction]` with `MenuAction` a union), which
makes the `!fn` branch unreachable and deletable; move `useHoverPopover` into the swatch row;
fold `PaletteCardMeta` back or give it the vote mutation. Two of six files should not exist
in their current form, and the file that was supposed to shrink did not.

### C-14 · MAJOR (NEW) — consumer damage from C-4: `PaletteCard` nested inside a `<button>`

`demo/workbenches/mix/MixSourceSelector.vue:246-268`:

```html
<!-- W5-a11y: native <button> for keyboard reach + aria-pressed for selection state -->
<button v-for="palette in savedPalettes" type="button" :aria-pressed="…" :aria-label="…" …>
    <PaletteCard :palette="palette" :css-color="''" />
</button>
```

The card contributes `role="article"`, `<button aria-label="Palette menu">` and
`<button aria-label="N votes, click to vote">` as descendants. Interactive content is
forbidden inside `<button>` by the HTML content model, and `role=button` is
**children-presentational** — so in the Mix pane the card's own controls are *removed from the
accessibility tree*, and the outer `aria-label` replaces the whole card's name.

The comment shows the intent was a11y. This is not MixSourceSelector's invention; it is the
workaround a consumer reached for because the card offers no keyboard route of its own.
Fixing C-4 deletes the wrapper.

### C-15 · MAJOR — the disclosure never announces its state

`PaletteCard.vue:5-27` carries no `aria-expanded` (measured `ariaExpanded: null`), and nothing
else signals that content appeared. Even a sighted mouse user on a screen reader gets no
event. Folded into C-4's cure.

---

## MINOR

### C-16 · MINOR — `positionPanel(e.currentTarget)` is read after the handler returns

*(Pass 1 C-6. I add an independent corroboration of their honesty note.)*
`useHoverPopover.ts:26-31` defers `positionPanel(e.currentTarget as Element)` into `nextTick`;
`Event.currentTarget` is reset to `null` once dispatch completes. Pass 1 captured the live
`TypeError … reading 'getBoundingClientRect' at useHoverPopover.ts:18:25` and noted honestly
that under a *genuine* mouse hover the microtask checkpoint often fires while dispatch is
still in flight. My runs are the other half of that observation: across every real
`mouse.move` hover the inline style **was** written (`top: 494.656px; left: 258px`) and no
error appeared. So: an intermittent, timing-dependent unhandled `TypeError` — and
unconditionally pointless, since the coordinates are inert against `position: static` (C-2).
The `as Element` cast is what let a `null`-typed value through. Capture the target into a
local **inside** the synchronous body; moot once C-2 adopts a self-positioning popover.

### C-17 · MINOR — `aria-hidden="true"` on a container holding two tabbable buttons

*(Pass 1 C-9.)* `SwatchHoverMenu.vue:40-50`. WAI-ARIA 1.2: *"Authors MUST NOT use
`aria-hidden="true"` on … an element that contains focusable elements."* My measurement of the
same panel's contents: three 28 × 28 buttons with real names
(`Add #e11d48 to current palette`, `Edit color #e11d48`, `Copy color #e11d48`) inside an
`aria-hidden="true"` subtree. Cured by C-2's adoption of a managed popover.

### C-18 · MINOR — `useLeaveTimer` has no scope disposal; the transition has no cancel path

`composables/useLeaveTimer.ts:1-17` registers no `onScopeDispose`, so a card unmounted inside
the 250 ms window leaves a live timeout and retains its closure. One line: `onScopeDispose(cancel)`.

Adjacent, and a **hypothesis** (not observed in the wild): `useHeightTransition.ts:35-39,66-70`
attach a `transitionend` listener that removes itself only when the event arrives; Vue's
`enterCancelled`/`leaveCancelled` hooks are not supplied (`PaletteCard.vue:131-138` wires only
the six happy-path hooks) and `:css="false"` is not set, so Vue's own CSS end-detection races
the JS `done()`. If the transition never fires, `onAfterEnter` never clears the inline
`height: 0; opacity: 0`. The cure is C-7's move to the CSS `vj-*` family, which deletes the
class.

### C-19 · MINOR — idiom drift inside the folder, and a mixed reka event idiom

`PaletteCard.vue:182-198` uses `withDefaults(defineProps<…>())` + `props.x` while four of its
five siblings use Vue 3.5 reactive props destructure (`PaletteCardMenu.vue:206`,
`PaletteCardMeta.vue:61`, `PaletteRenameInput.vue:39`, `PaletteColorStrip.vue:31`) — edict 7.
`expanded?: boolean | undefined` and six siblings restate `| undefined` that `?` already
implies. `PaletteCardMenu` drives eleven items with `@click` and five with `@select`, and
works around the sub-trigger with `@click.prevent` (`:108`); `@select` is the primitive's own
semantic event (keyboard activation and typeahead included) — two idioms for one behaviour in
one file.

*(Edict 8, `verbatimModuleSyntax`: **PASS**, re-verified file by file — every type-only import
is `import type` or an inline `type` specifier.)*

---

## INFO

### C-20 · INFO — the mega-tranche visual matrix has **zero** coverage of this component

`docs/tranches/V/megatranche/audit/visual/REPORT.json`, rows `/#/browse` and `/#/palettes`
across all four matrices: `bodyTextLength` 124–280;
`consoleWarnings: ["Failed to load remote palettes: SyntaxError: …"]`; and every recorded
`smallTapTargets` entry is a dock or slug-bar control (`Switch to slug`, `Generate new slug`,
`Cancel`, the L/a/b/α channel spans) — **not one PaletteCard control appears**. The
screenshots (`shots/safari-desktop-light/{browse,palettes}.png`, read) show *"The commons is
unreachable."* and *"No saved palettes yet."*

So the REPORT's headline counters (smallTapTargets **60**, namelessButtons **18**) under-count
this component by **at least 3 per populated route** (C-10's two + C-11's one) and cannot see
C-1 through C-5 at all. The root cause is the same dev-config latch described in the
apparatus: any future capture must set `VITE_API_URL` or seed
`localStorage["color-palettes"]` before boot.

---

## Standing-edict compliance

| # | Edict | Verdict |
|---|---|---|
| 1 | No god modules | **VIOLATED** — 17 emits + a 20-branch untyped dispatch table survived the six-file split (C-13) |
| 2 | No legacy code | PASS — no shims, aliases, dual paths or masking fallbacks found |
| 3 | KISS, no contrivance | **VIOLATED** — `PaletteCardSwatches` is an 8-in/8-out pass-through with no state, split to satisfy a line-count cap (C-13) |
| 4 | glass-ui is the design system | **VIOLATED** — `.floating-panel` is a demo-local fork deleted without a producer replacement (C-2); `tag="button"` invents a producer prop that does not exist (C-1); the icon-trigger recipe is hand-rolled a 4th time (C-10) |
| 5 | Root-level styling | PASS — the two scoped rules (`PaletteCard.vue:343-354`) are token-level, not per-instance overrides |
| 6 | Animations never deleted | **VIOLATED in spirit** — the panel's entrance went with the deleted rule (C-2); it was removed, not moved |
| 7 | Idiomatic Vue 3.5 | PARTIAL — `useTemplateRef` correct; `PaletteCard` alone skips reactive props destructure (C-19); `defineExpose` is the wrong instrument (C-8) |
| 8 | `verbatimModuleSyntax` | **PASS** — verified file by file |

**Brief hazard sweep.** `defineModel` stale reads — N/A, none used. oklch→HSV drift /
`stableHue` — N/A, no HSV roundtrip. `ValueUnit` nesting — N/A, no construction. reka slider
pointer-capture — N/A, no sliders. Ungated rAF — none in the six files or three composables;
`useLiquidPress` is producer-owned and PRM-aware by declaration. WebGL — none. **The
`parseCssColor` crash class the brief names is LIVE and reachable from the public wall
(C-3).**

---

## Delta ledger vs pass 1

| pass-2 | status | vs pass 1 |
|---|---|---|
| C-1 swatch inert | BLOCKER | converge (their C-1) **+ touch-device measurement, + toggle-close proof** |
| C-2 `.floating-panel` | BLOCKER | converge (their C-2) **+ desktop computed style + screenshot** |
| C-3 malformed colour kills the pane | BLOCKER | converge (their C-3) **+ reproduced via the PUBLIC wall, + neighbour casualty, + input-class table, + C-3b `??` bypass (new)** |
| C-4 keyboard-inoperable | BLOCKER | **raised** from their MAJOR C-4; + tab walk, + consumer damage |
| C-5 rename focus stolen | BLOCKER | **NEW** — unifies their C-11 (dead guard) + C-8 (focus) and measures the open path |
| C-6 ActionFeedback | MAJOR | converge (their C-5 + C-13) **+ in-app measurement 613 ms, + control run** |
| C-7 PRM | MAJOR | **raised + widened** from their MINOR C-12 (scroll only) — the morph itself is ungated |
| C-8 `cardRefs` retention | MAJOR | converge (their C-7) |
| C-9 title dead zone | MAJOR | **raised** from their MINOR C-10; + measurement + `/#/palettes` cross-check |
| C-10 rename row a11y | MAJOR | converge (their C-8) |
| C-11 `Copy slug` 16 × 16 | MAJOR | **NEW** |
| C-12 the gate passes green | MAJOR | **NEW** — their §"Test truth" argued vacuity by grep; here is the run receipt + the 3-state table |
| C-13 decomposition | MAJOR | converge **+ the "PP-8 cap cure" primary-source admission** |
| C-14 card inside `<button>` | MAJOR | **NEW** |
| C-15 no `aria-expanded` | MAJOR | **NEW** |
| C-16 `e.currentTarget` | MINOR | converge (their C-6) **+ independent corroboration of the intermittency** |
| C-17 `aria-hidden` + tabbables | MINOR | converge (their C-9) |
| C-18 `useLeaveTimer` / transition cancel | MINOR | **raised** from their "noted, not filed" + new transition-cancel hypothesis |
| C-19 idiom drift | MINOR | converge (their C-14 + C-15) |
| C-20 visual matrix blind | INFO | converge, quantified |

No pass-1 finding is withdrawn. No correction was required.

---

## Files

- This report: `/Users/mkbabb/Programming/value.js/docs/tranches/V/megatranche/audit/components/PaletteCard/challenge-C-implementation.md`
- Pass 1, preserved: `/Users/mkbabb/Programming/value.js/docs/tranches/V/megatranche/audit/components/PaletteCard/challenge-C-implementation.pass-1-2026-07-27.md`
- Probes: `<scratchpad>/pcard-probe{2,3,4,5,6,7,8,9}.mjs`; screenshot `<scratchpad>/pcard-hover-panel.png`
