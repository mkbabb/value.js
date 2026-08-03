# CHALLENGE-D — `SwatchHoverMenu.vue` — the design is flawed

## Model receipt

I observe myself to be **Opus 5 (1M context)** — exact model ID `claude-opus-5[1m]` — the tier
declared at spawn. Declaration honoured; no inherited or undeclared seat.

---

## Verdict

**DEFECTIVE — BLOCKER.**

This component is not "ugly" or "under-polished". **It does not work on any device class**, and the
design canon this tranche already ratified forbids the thing it is by name.

Measured, in the running app at `http://localhost:9000`, branch `tranche-u` @ `c654824e`:

| Pointer class | What the design promises | What actually happens | Proof |
|---|---|---|---|
| **Fine (mouse/desktop)** | hover a swatch → a floating Edit/Copy/Remove panel appears beside it | the panel is teleported to `<body>` with `position: static`, transparent, borderless, shadowless, unanimated, and lands at document `y = 900` — **below the 900 px viewport**. The user sees nothing. | `evidence/hover-viewport.png` vs `evidence/hover-fullpage.png`; live computed style below |
| **Coarse (touch/mobile)** | tap a swatch → a reka-ui `Popover` opens with the same actions | tapping does **nothing at all**. `popoverContent: 0`, `floatingPanel: false`, `anyEditBtn: []`. | mobile probe below |
| **Keyboard** | (component comment claims the touch Popover is "the accessible route") | there is no focusable element in the component. Swatch `tabIndex: -1`, `.focus()` is a no-op. The only focusable things are three `tabindex=0` buttons inside an `aria-hidden="true"` subtree. | probe below |
| **Assistive tech** | `aria-label="Color swatch #e05c78"` | the attribute is discarded before it reaches the DOM. The rendered node is `<span aria-hidden="true">`. The Playwright a11y snapshot of an expanded card exposes **zero** swatch nodes. | rendered-DOM dump below |

The strongest single defect: **`.floating-panel` has no CSS rule anywhere in the shipped tree.**
The 40-line stylesheet that gave it `position: fixed`, elevation, glass material and its entrance
animation was deleted on **2026-03-25** (`c84504d3`) on the stated premise that
`@mkbabb/glass-ui/styles` now provides it. It does not, and never has in the installed version.

```
$ grep -rn "floating-panel" node_modules/@mkbabb/glass-ui/dist/ | wc -l
       0
```

Live CSSOM walk over every stylesheet, including nested rules, in the running document:

```json
"cssRulesDefiningFloatingPanel": 0, "matched": []
```

---

## Probe log (what I actually ran)

1. Read the component, both consumers, all four composables, the installed glass-ui `WatercolorDot`
   and `Popover` compiled sources and `.d.ts`.
2. Read the Safari matrix (`audit/visual/REPORT.md`) and the desktop+mobile / light+dark shots for
   `/#/palettes` and `/#/browse`. **Every static capture shows the component in its zero-instance
   state** (empty current palette, offline commons) — the shipped screenshot set never exercises it.
   That is itself a coverage hole; I drove the live app instead.
3. Chromium (Playwright), 1440×900 fine-pointer: seeded `localStorage["color-palettes"]` with a
   6-colour local palette, expanded the card, performed a **real** `page.mouse.move` hover, measured
   the teleported panel, captured viewport + full-page screenshots.
4. Fresh browser context 390×844 `isMobile: true, hasTouch: true` (`(hover:hover)=false`,
   `(pointer:coarse)=true` — so the `canHover` branch flips), real `touchscreen.tap` on the swatch
   centre, measured the result.
5. `emulateMedia({reducedMotion:'reduce'})` and `({forcedColors:'active'})` probes.
6. `git log -S` / `git show c84504d3^:demo/@/styles/floating-panel.css` for provenance.

Screenshots are in `evidence/` (`hover-viewport.png`, `hover-fullpage.png`, `mobile-tap.png`).

---

## Findings

### D-1 · BLOCKER — the hover panel renders off-viewport, transparent and unstyled

`SwatchHoverMenu.vue:40-50` teleports the action panel to `<body>` with `class="floating-panel"` and
an inline `:style="floatingStyle"` carrying `top`/`left`. No rule defines `.floating-panel`, so the
element is `position: static` and **the inline `top`/`left` are inert**.

Live measurement while a real mouse hovers swatch #0 (viewport 1440×900):

```json
{
 "panel": true,
 "styleAttr": "top: 307.18px; left: 791.5px;",
 "position": "static",
 "zIndex": "auto",
 "bg": "rgba(0, 0, 0, 0)",
 "shadow": "none",
 "radius": "0px",
 "anim": "none",
 "ariaHidden": "true",
 "rect": { "x": 0, "y": 900, "w": 1440, "h": 40 },
 "viewport": { "w": 1440, "h": 900 },
 "visible": false,
 "buttons": [
  { "label": "Edit color rgb(255 0 0)",   "w": 28, "h": 28, "x":  6, "y": 906 },
  { "label": "Copy color rgb(255 0 0)",   "w": 28, "h": 28, "x": 38, "y": 906 },
  { "label": "Remove color rgb(255 0 0) from palette", "w": 28, "h": 28, "x": 70, "y": 906 }
 ]
}
```

The panel is a **full-body-width static block** (`w: 1440`) appended after `#app`, so it also grows
the document: `document.documentElement.scrollHeight` goes from 900 → **940** on hover — the page
gains a 40 px scroll range every time the pointer crosses a swatch.

`evidence/hover-viewport.png` is what the user sees while hovering: **nothing**.
`evidence/hover-fullpage.png` is the same moment full-page: three naked pencil/copy/trash glyphs
stranded in a bare strip at the bottom-left of the document, with no panel chrome whatsoever.

**Provenance.** `git show c84504d3 --stat -- demo/@/styles/floating-panel.css` →
`1 file changed, 40 deletions(-)`, commit message: *"Delete dock.css, floating-panel.css, glass.css,
transitions.css; now provided by `@import "@mkbabb/glass-ui/styles"`"*. The deleted file was:

```css
.floating-panel {
    position: fixed;
    z-index: var(--z-overlay);
    border-radius: var(--radius-xl);
    border: 1px solid hsl(var(--border) / 0.6);
    background: hsl(var(--card) / 0.75);
    backdrop-filter: blur(12px) saturate(1.3);
    color: hsl(var(--popover-foreground));
    box-shadow: var(--glass-shadow-elevated);
    pointer-events: auto;
    animation: floating-panel-in var(--duration-fast) var(--ease-decelerate);
}
```

Everything in that block — position, stacking, radius, boundary, material, blur, ink, elevation,
entrance — is gone. `glass.css` and `dock.css` had real successors in glass-ui; `floating-panel.css`
did not, and nothing checked.

**Mechanism:** silent design-system handoff. A missing CSS class produces no type error, no lint
error, no test failure, and no console warning — the only detector is looking at the screen, and the
capture matrix never populates this component (see the probe log).

**Cure:** do not re-add the class. See §Gestalt cure — the whole fork dies.

---

### D-2 · BLOCKER — the touch path is completely inert

`SwatchHoverMenu.vue:8-25` is the "accessible route" the component's own comment points at. It does
not work.

Mobile context (390×844, `hasTouch`), card expanded, six swatches mounted. The rendered
`SwatchHoverMenu` root:

```html
<div class="relative">
  <!-- Touch: native Popover click toggle -->
  <span data-v-292b9032 aria-hidden="true"
        class="w-9 h-9 sm:w-10 sm:h-10 shrink-0 cursor-pointer watercolor-swatch"
        data-testid="watercolor-swatch" data-variant="solid"
        style="background-color: rgb(224, 92, 120); border-radius: …; pointer-events: none; …">
```

The `PopoverTrigger` contributed **nothing**: no `type="button"`, no `aria-expanded`, no
`data-state`, no `id`, no listener. After `page.touchscreen.tap(cx, cy)` on the swatch centre:

```json
{ "popoverContent": 0, "floatingPanel": false, "anyEditBtn": [] }
```

**Mechanism.** `PopoverTrigger as-child` merges its bindings onto the `WatercolorDot` vnode. The
installed producer (`node_modules/@mkbabb/glass-ui/dist/watercolor-dot.js`) declares
`inheritAttrs: !1` and reads only two entries out of `useAttrs()`:

```js
let n = h(),                      // useAttrs()
    c = i(() => n.class),         // class  → forwarded
    f = i(() => n.style);         // style  → forwarded
…
return (d(), o("span", { "aria-hidden": "true", class: l([c.value, "watercolor-swatch", …]),
    style: u([f.value, { …, pointerEvents: "none", … }]) }, …
```

Every other attribute and every listener is discarded, and the root is additionally hard-coded
`pointer-events: none`. So even a surviving handler could never fire.

**Cure:** `PopoverTrigger` without `as-child` already renders `as: "button"` with `type: "button"`
(compiled source, `popover-BQGYXZyO.js`). Deleting one attribute restores a real, focusable,
producer-styled seat.

---

### D-3 · BLOCKER — the swatch is not a control; `tag="button"` and `aria-label` are silently dropped

`SwatchHoverMenu.vue:17,32` pass `tag="button"`; `:18,:33` pass `:aria-label`. Neither exists on
`WatercolorDot`'s prop surface (`dist/components/watercolor-dot/WatercolorDot.vue.d.ts:23-52` —
`{ color, variant, animate, cycleDuration, range, seed }`), and neither survives `inheritAttrs: false`.

Live attribute dump of a mounted expanded-card swatch:

```
data-v-292b9032= | aria-hidden=true | class=w-9 h-9 sm:w-10 sm:h-10 shrink-0 cursor-pointer watercolor-swatch
| data-testid=watercolor-swatch | data-variant=solid | style=…; pointer-events: none; …
```

No `tag`. No `aria-label`. No `role`. No `tabindex`. Focus probe:

```json
{ "swatchTabIndex": -1, "wrapperTabIndex": -1, "elFocused": false, "parFocused": false,
  "tag": "SPAN", "role": null }
```

Consequences the design never accounted for:

- **No accessible name, and `aria-hidden`.** The a11y snapshot of the expanded card exposes only
  `generic "Audit Seed"`, a count and `button "Palette menu"` — the six swatches are not in the tree
  at all.
- **`@click.stop="$emit('click')"` at `:35` is dead.** `useHoverPopover.ts:51 onSwatchClick` — the
  toggle-on-click behaviour — is unreachable from this component.
- **`cursor-pointer` at `:19,:34` is a lying affordance.** It is applied to an element with
  `pointer-events: none`, so it can never even take effect; the class is pure noise that documents
  an interactivity the element does not have.

This is `PROPORTION-AUDIT.md:74` §5.9 verbatim — *"A renderer specimen is not an unlabeled button"* —
and §5.5 — *"Decorative controls and operable ornaments without names are forbidden."*

---

### D-4 · MAJOR — three focusable buttons inside an `aria-hidden="true"` subtree, no `inert`

```json
{ "ariaHidden": "true", "focusableCount": 3, "inertAttr": false, "tabIndexes": [0, 0, 0] }
```

`aria-hidden` removes a node from the a11y tree; it does **not** remove it from the tab order. A
keyboard user whose mouse happens to rest on a swatch tabs into three invisible, off-viewport
buttons with no visible focus and no announced name. That is the canonical axe `aria-hidden-focus`
violation and WCAG 4.1.2.

The source comment at `:38-39` reads *"hover-only panel is keyboard-inaccessible — hidden from AT.
The reka-ui Popover (touch path) is the accessible route."* D-2 proves that route is dead. So the
comment documents a trade the mechanism never made: the component has **no** accessible route, and
the "hidden" panel is still reachable by Tab.

---

### D-5 · MAJOR — `PANEL_LAYOUT` stops class drift and lets everything else drift

`SwatchHoverMenu.vue:64-66` declares `PANEL_LAYOUT` as *"applied to both PopoverContent and the hover
Teleport panel so the two paths cannot drift."* The intent is right. The scope is three utilities
wide, and the two paths have already diverged on every other axis:

| Axis | Touch path (`PopoverContent`) | Hover path (`.floating-panel`) |
|---|---|---|
| positioning | producer floating engine, `avoidCollisions: true`, flip/shift | hand-rolled `getBoundingClientRect` + `top/left` — **inert** (D-1) |
| offset | `:side-offset="8"` (producer default is `4`) | `offsetY = -42` (`useHoverPopover.ts:20`) |
| material | `glass-floating`, `data-surface="glass"`, `data-material="overlay"` | none |
| elevation / stacking | `z-popover` | `z-index: auto` |
| radius | producer | `0px` |
| entrance | `glass-reveal` | none (D-8) |
| dismissal | Escape, pointer-down-outside, focus-outside | a 250 ms leave timer |
| a11y | `role="group"`, `aria-label` | `aria-hidden="true"` |

And the geometry drifts **between the two consumers of the same panel**:

- `PaletteCardSwatches.vue:31` — `:floating-style="{ ...floatingStyle, transform: 'translateX(-50%)' }"` → centre-anchored.
- `CurrentPaletteEditor.vue:35` — `:floating-style="currentFloatingStyle"` → no transform, so the
  panel's **left edge** sits at the swatch centre.

Both are fed the identical `left = rect.left + rect.width / 2` from `useHoverPopover.ts:23`. One
consumer corrects for it; the other does not. The anti-drift device covers the one axis that was
never going to drift and leaves the seven that did.

---

### D-6 · MAJOR — `p-1.5` is a per-instance override of a root-owned √φ pad ladder

Installed `PopoverContent` root classes (compiled, `popover-BQGYXZyO.js`):

```
popover-content z-popover w-72 glass-floating
  [--overlay-pad-inline:1rem]
  [--overlay-pad-block:calc(var(--overlay-pad-inline)*1.272)]
  px-(--overlay-pad-inline) py-(--overlay-pad-block)
  glass-reveal
```

The producer owns overlay padding as a **named, anisotropic, √φ-derived ladder**
(`1.272 ≈ √φ = 1.2720196`). `SwatchHoverMenu.vue:22` sends `class="w-auto"` plus `PANEL_LAYOUT`'s
`p-1.5`, flattening `1rem × 1.272rem` to an isotropic `0.375rem` and deleting `w-72`.

That is edict 5 (*"style at the root component level, never per-instance overrides"*) and
`PROPORTION-AUDIT.md:73` §5.8 (*"Real rendered relation wins over token intent. Adjacent rungs,
measured rects and ink gaps appear in DELTA"*) — the panel's inline/block relation is not an adjacent
rung of anything, it is an arbitrary flat number. `:side-offset="8"` (producer default `4`) and
`offsetY = -42` are two further untokenized magic constants for the same surface.

---

### D-7 · MAJOR — glass-ui 7 already ships this component; the fork hand-rolls one producer prop

`dist/components/popover/Popover.vue.d.ts`:

```ts
export interface PopoverProps {
    open?: boolean;
    defaultOpen?: boolean;
    /** Click command or pointer-adaptive hover preview. */
    trigger?: "click" | "hover";
    /** Delay before a fine-pointer hover preview opens, in milliseconds. */
    openDelay?: number;      // default 250
    /** Delay before a fine-pointer hover preview closes, in milliseconds. */
    closeDelay?: number;     // default 150
    keepDockOpen?: boolean;
}
```

`trigger="hover"` is **pointer-adaptive by contract** — it is the producer's answer to the exact
question `canHover` forks on. `PopoverContent` supplies `portal`, `side`, `sideOffset`, `align`,
`alignOffset`, `surface`, `ariaLabel` and `avoidCollisions: true`.

Against that, the demo maintains: a `canHover` template fork, a `Teleport to="body"`, a dead
`.floating-panel` class, `useHoverPopover.ts` (67 lines: media query, open index, manual placement,
leave scheduling), `useLeaveTimer.ts` (a `setTimeout` wrapper reimplementing `closeDelay`), and a
`floatingStyle` prop threaded through two consumers — to obtain a strictly worse result with no
collision avoidance, no flip, no dismissal, no focus management and no material.

Edict 4 violation with a named, installed, already-imported replacement (`SwatchHoverMenu.vue:61`
already imports `Popover`).

---

### D-8 · MAJOR — the entrance animation was deleted, not moved or tokenized

`c84504d3` removed **both** the `.floating-panel { animation: floating-panel-in … }` declaration and
the `@keyframes floating-panel-in` block (from `demo/@/styles/animations.css`), on the premise the
producer supplies them:

```
$ grep -c "floating-panel" node_modules/@mkbabb/glass-ui/dist/styles/animations.css
0
```

Live: `animationName: "none"`, `transitionProperty: "opacity, color, background-color, border-color,
box-shadow"` — the panel has **no motion at all**, entrance or exit, in either motion preference.
Meanwhile the touch path receives the producer's `glass-reveal`. This breaks edict 6
(*"Animations are never deleted, only moved or tokenized"*) and `VISUAL-CONSTITUTION.md:139`
(*"Spatial continuity uses one producer-owned glass-ui spring register"*).

Aggravating: the false attribution is still asserted in two places and has masked the regression for
four months —

- `demo/styles/animations.css:2` — *"Shared keyframes (dialog, floating-panel, card-menu, shimmer,
  etc.) are provided by `@mkbabb/glass-ui/styles/animations.css`."*
- `demo/DESIGN.md:273` — same claim.

Measured against the installed producer: `dialog` ✓, `shimmer` ✓, `card-menu` **0**,
`floating-panel` **0**. Two of the four named keyframes do not exist.

*(Reduced-motion is not separately defective here — there is nothing to reduce. Restoring motion via
the producer's `glass-reveal` inherits `prefers-reduced-motion` handling for free; a re-added local
keyframe would have to re-implement it, which is the wrong direction.)*

---

### D-9 · MINOR — every swatch reserves a 6 px phantom band it never paints

The component root is `<div class="relative">` (a block box) wrapping the producer's `<span>` (an
inline-block). The block therefore builds a line box, and the inline-block's baseline leaves a
descender gap under every swatch.

Measured (`CurrentPaletteEditor` site, `w-11 h-11 sm:w-12 sm:h-12`):

```json
{ "swatch": {"w":48,"h":48}, "wrapper": {"w":48,"h":54},
  "wrapperDisplay": "block", "swatchDisplay": "inline-block",
  "lineHeight": "27.912px", "fontSize": "18.608px" }
```

Expanded-card site (`w-9 h-9 sm:w-10 sm:h-10`): swatch `40×40`, wrapper `40×46`.

**12.5 %–15 % dead vertical reservation** under every swatch, inherited by the row's `items-start`
alignment (`PaletteCardSwatches.vue:22`) and by the `#overlay` slot's absolute anchor box. This is
`PROPORTION-AUDIT.md:72` §5.7 — *"Visual glyph size, operable target size and layout reservation are
separate quantities"* — failing in the direction nobody audits: reservation silently exceeds the
glyph, and it does so because of an un-designed inline/block seam, not a decision.

---

### D-10 · MINOR — a dead prop, an unreachable emit, and three declaration sites for one scale

- **`swatchExtraClass`** (`:75`, used `:19,:34`) — passed by **zero** consumers repo-wide
  (`grep -rn swatchExtraClass demo/` returns only the three declaration/use lines in this file).
  Dead API surface. Edict 3.
- **`click` emit** (`:90`) — its only source (`:35`) is discarded by D-3's mechanism. Declared,
  documented, unreachable.
- **`sizeClass`** — default `"w-9 h-9 sm:w-10 sm:h-10"` at `:82`, restated verbatim as a second
  default at `PaletteCard.vue:197`, and contradicted by `CurrentPaletteEditor.vue:36`'s
  `"w-11 h-11 sm:w-12 sm:h-12"`. One species, three authoring sites, no token, and the two live
  values (40 px / 48 px) are not adjacent rungs of any ladder — a 1.2× ratio chosen by hand.

---

### D-11 · MINOR — tap targets below the floor, and the panel makes it worse

Measured: swatch **40×40** at ≥640 px (`sm:w-10 sm:h-10`); each action button **28×28**.

`audit/visual/REPORT.md:34,64` records `smallTapTargets` for `/#/palettes` = **8** desktop / **4**
mobile — with the panel *closed*. Opening it adds three 28 px targets per hovered swatch. The
component supplies no `data-icon-only` / touch-hit-area hook, so glass-ui's coarse-pointer floor
cannot reach it (`PROPORTION-AUDIT.md:79` §5.12: *"Invisible/seat geometry preserves target floor
while optics follow rung"* — the seat geometry here is the optic geometry).

---

### D-12 · INFO (hypothesis for the real-user path) — `e.currentTarget` read after dispatch

`useHoverPopover.ts:30`:

```ts
nextTick(() => positionPanel(e.currentTarget as Element));
```

`currentTarget` is only non-null during dispatch (DOM §2.9); reading it from a deferred callback is
undefined behaviour. **Reproduced** with a programmatic `dispatchEvent`:

```
TypeError: Cannot read properties of null (reading 'getBoundingClientRect')
    at positionPanel (…/useHoverPopover.ts:18:25)
    at …/useHoverPopover.ts:26:18
```

**Not reproduced** under a real `page.mouse.move` hover — the microtask checkpoint fires while
`currentTarget` is still live. I am labelling this a **latent fragility / hypothesis** for the
real-user path rather than a shipped crash: any change to the flush timing (a parent `await`, a
Suspense boundary, a synthetic-event test harness) converts it into one. The `as Element` cast is
what suppresses the type error that would otherwise have caught it.

---

### D-13 · BLOCKER (canon) — the constitution forbids this component by name

`docs/tranches/V/VISUAL-CONSTITUTION.md:102`:

> *"The card body owns no expand, inline rename, action menu, transient result or **hover-only
> swatch-action path**. Full detail, rename/lifecycle/export actions and durable operation state
> live in the selected inspector; **the card's compact swatch strip remains noninteractive data with
> zero activation/focus/drag semantics**."*

`docs/tranches/V/PROPORTION-AUDIT.md:51`, row **PR-07**:

> *"Hover-only/unlabeled controls and invisible drag state — **REMOVE / ADD-AFFORDANCE** — Primary
> W23 … **palette hover paths retire into selected inspector**; every surviving action/drag seat has
> a name/state."*

Plus §5.5 (*"operable ornaments without names are forbidden"*), §5.9 (*"A renderer specimen is not
an unlabeled button"*), and §5.12 (*"Its one native named `<button type="button" aria-pressed>` child
… **alone** owns activation"* — SwatchHoverMenu introduces a second activation species inside the
same card body).

This is not a matter of taste. The component's *concept* — face-as-button + hover-only actions —
already carries a terminal `REMOVE` disposition in the ratified register. Everything above is the
receipt showing the concept did not even survive to a working implementation.

---

## State coverage

Enumerated exhaustively. **A state that was never designed is a design defect.**

| State | Designed? | Measured behaviour |
|---|---|---|
| empty (0 colours) | n/a | component not rendered; the `v-for` yields nothing |
| populated | partly | face renders; **actions unreachable** (D-1/D-2) |
| loading / pending | **no** | copy/remove are fire-and-forget; no in-flight state on the seat |
| error | **no** | `writeClipboard` rejection has no surface (`useSwatchActions.ts:87` `void writeClipboard(css)`) |
| disabled | **no** | no `disabled` prop, no `aria-disabled`, no visual register |
| focused | **no** | nothing focusable (D-3); no focus ring, no `:focus-visible` |
| hovered | broken | the only handled state, and it renders off-screen (D-1) |
| active / pressed | **no** | no `:active`, no `aria-pressed`, no press feedback |
| selected | **no** | a swatch cannot express "this is the one being edited" except via `ghost` |
| being-edited (`ghost`) | **yes** ✓ | works — `variant` is a real producer prop (`data-variant="ghost"` measured) |
| dragging | **no** | reorder is card-level only; swatches have no drag seat or keyboard move |
| overflowing / truncated | **no** | panel has no `max-width`; `PANEL_LAYOUT` is `flex` with no `flex-wrap`; long action sets clip |
| RTL | **no** | `left: rect.left + rect.width/2` is physical, and only one of two consumers applies the centring transform (D-5) |
| reduced-motion | vacuous | nothing animates (D-8) |
| forced-colors | **partly ✓** | swatch keeps its fill (`forced-color-adjust: none`, bg `rgb(255,0,0)` measured under `forcedColors: active`) — correct for a colour specimen per `VISUAL-CONSTITUTION.md:17`. But the panel has no border/background, so in forced-colors the action glyphs would sit directly on Canvas with no boundary |
| zoomed 200 % | **not measured** — the failure mode is zoom-invariant (a static block appended after `#app` lands below the fold at any scale), but I did not obtain a clean measurement and will not claim one |
| N large (100+ colours) | **no** | one `Popover` + one `WatercolorDot` (with its own SVG `<filter>`) mounted per colour; already booked at `audit/om-16-palette-scalability/SCALABILITY-AUDIT.md:271` row 7 (P2) |

**11 of 17 states are unhandled. One works. One is broken. One is vacuous.**

---

## Owner-edict compliance

| # | Edict | Verdict |
|---|---|---|
| 1 | No god modules | **PASS** — 93 lines, one job, real encapsulation |
| 2 | No legacy code / dual paths | **FAIL** — the `canHover` fork *is* a dual path (D-2/D-5); `.floating-panel` is a dead legacy class name kept alive by a stale comment (D-8) |
| 3 | KISS, no contrivance | **FAIL** — dead prop, unreachable emit, two magic offsets, a hand-rolled floating engine (D-6/D-7/D-10) |
| 4 | glass-ui is the design system | **FAIL** — reaches past `<Popover trigger="hover">`, which is installed and already imported (D-7) |
| 5 | Root-level styling | **FAIL** — `p-1.5` / `w-auto` override the producer's √φ overlay pad ladder and width (D-6) |
| 6 | Animations never deleted | **FAIL** — `floating-panel-in` deleted, not moved or tokenized (D-8) |
| 7 | Idiomatic Vue 3.5 | **PARTIAL** — `withDefaults(defineProps<…>(), …)` at `:68-84` is the pre-3.5 form; 3.5's reactive props destructure (`const { sizeClass = "…" } = defineProps<…>()`) is what the sibling `CurrentPaletteEditor.vue:196` already uses. `floatingStyle?: CSSProperties \| undefined` — the explicit `\| undefined` on an already-optional prop is redundant across all four optional props |
| 8 | `verbatimModuleSyntax` | **PASS** — `import type { CSSProperties } from "vue"` at `:60` is correct |

---

## The gestalt cure — architectural transposition, not a patch

Re-adding `.floating-panel { position: fixed; … }` would make the panel visible and leave every
other defect standing: the touch path still inert, the swatch still nameless, the panel still
`aria-hidden`, the two consumers still drifting, the constitution still violated. **Do not patch.**

**The whole component collapses to a seat and a producer surface.**

1. **Delete the fork.** `SwatchHoverMenu.vue:8-52` — the `v-if="!canHover"` / `v-else` pair, the
   `Teleport`, `.floating-panel`, `PANEL_LAYOUT`, and the `floatingStyle`, `canHover` and `open`
   plumbing — becomes **one** `<Popover trigger="hover">`. That prop is *"pointer-adaptive"* by
   contract: it *is* the fork, correctly implemented, upstream.
2. **Delete `useHoverPopover.ts` and `useLeaveTimer.ts`.** `openDelay` / `closeDelay` /
   `avoidCollisions` / portal / dismissal / focus management are all producer props. Delete
   `offsetY = -42` and `:side-offset="8"`; take the producer's `side`/`sideOffset` defaults.
3. **Give the swatch a real seat.** Drop `as-child` from `PopoverTrigger` — it then renders
   `as: "button"`, `type: "button"` with the producer's focus register — and put the `WatercolorDot`
   *inside* it as the face. The seat carries the name (`Color swatch <color>`), the focus ring, the
   pressed state and the keyboard activation; the dot stays what its own docstring says it is:
   `aria-hidden`, `pointer-events: none` paint. This is `AUDIT-HANDOFF-2026-07-28.md:8.3`'s
   `ColorSwatchButton` ask, and it retires all six `tag="button"` impostors at once.
4. **Delete `PANEL_LAYOUT`, `p-1.5` and `w-auto`.** Let `PopoverContent` own overlay padding and
   width at its root; if the action row needs to be denser than the default, that is a producer
   `surface`/size variant, not a consumer override.
5. **Then re-decide whether the component should exist at all.** `VISUAL-CONSTITUTION.md:102` and
   `PROPORTION-AUDIT.md:51` PR-07 both say the swatch strip is *noninteractive data* and the actions
   belong to the selected inspector. Steps 1–4 make the component correct; PR-07 says the correct
   component is still the wrong component. The transposition that satisfies both: **the strip becomes
   inert data, and Edit/Copy/Remove move to the inspector**, where they get names, durable state,
   keyboard reach and a place to report failure (D-13, and the missing loading/error states).

Line-count effect of steps 1–3 alone: `SwatchHoverMenu.vue` 93 → ≈25; `useHoverPopover.ts` 67 → 0;
`useLeaveTimer.ts` 20 → 0; two consumer prop-chains (`floatingStyle`, `canHover`, `cancelLeave`,
`hover`, `leave`) collapse.

---

## Negative proof — what is genuinely sound

Recorded so the next pass does not re-litigate settled ground:

- **`ghost` → `variant` works.** It is a declared producer prop, so it survives `inheritAttrs: false`.
  Measured `data-variant="ghost"` on the rendered add-slot span. The `A3/U18/U22` decision to consume
  the producer's seeded dashed silhouette instead of forking a dashed-outline class is correct and
  the comment at `:76-78` accurately describes shipped behaviour.
- **`class="relative"` at `:3`** is the right anchor for the `#overlay` slot; `CurrentPaletteEditor`'s
  `.edit-overlay { position: absolute; top: 0; left: 0 }` depends on it and it holds.
- **`PANEL_LAYOUT` as an intent** is the right instinct (one source for a shared surface); it is
  under-scoped, not wrong-headed. The cure keeps the instinct and moves it to the producer.
- **`import type { CSSProperties }`** — correct under `verbatimModuleSyntax`.
- **Forced-colors on the specimen** — keeping the swatch fill (`forced-color-adjust: none`) is
  correct per `VISUAL-CONSTITUTION.md:17`; a colour swatch that becomes `Canvas` in high contrast
  would be a worse defect.
- **The component is not a god module.** 93 lines, one responsibility, no store reach, no side
  effects. Its problems are architectural placement and a producer contract that changed underneath
  it — not sprawl.

---

## Coverage note for the capture matrix

`audit/visual/REPORT.md` has **zero** rows that exercise this component: every `/#/palettes` and
`/#/browse` capture (desktop+mobile × light+dark, plus the `zoom-200`, `forced-colors`,
`keyboard-focus`, `reduced-motion` and `rtl` matrices) shows an empty current palette and an
unreachable commons, so the swatch row never mounts and the panel is never opened. A component whose
only two failure modes are *"nothing appears"* and *"tapping does nothing"* is invisible to a
screenshot census that never populates it. **Recommend the state matrix seed `localStorage`
`color-palettes` and drive one hover + one tap before capture** — that single change would have
caught D-1 and D-2 four months ago.
