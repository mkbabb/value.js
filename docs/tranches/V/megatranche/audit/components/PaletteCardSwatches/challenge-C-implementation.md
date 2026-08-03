# CHALLENGE-C — `PaletteCardSwatches.vue` — implementation is defective

## Model receipt

I observe myself to be **Opus 5** (`claude-opus-5[1m]`), spawned with an explicit Opus 5
declaration. Seat is declared, not inherited.

- Subject: `demo/palettes/browser/card/PaletteCard/PaletteCardSwatches.vue` (96 lines)
- Repo/branch/HEAD: `/Users/mkbabb/Programming/value.js`, `tranche-u`, `c654824e`
- Axis: implementation (the component is assumed defective; the seat's job is to find the bug)
- Verdict: **DEFECTIVE — 2 BLOCKERS, both live, both reproduced in a real browser.**

---

## TL;DR

**The entire swatch action surface of this component is dead in the shipping demo, on every
interaction path, for every user.**

- On **desktop**, hovering a swatch opens a floating action panel that renders as the last child of
  `<body>` with `position: static` (the `.floating-panel` class it names **does not exist** in
  `@mkbabb/glass-ui@7.0.0` or anywhere in this repo). Measured rect: `{x: -720, y: 900, w: 1440,
  h: 40}` in a 1440×900 viewport — entirely off-screen, transparent, borderless, `z-index: auto`.
  It also adds 40 px of dead scroll height to the document while open.
- On **touch**, tapping a swatch opens nothing at all (`popoverContent: 0`). The reka-ui
  `PopoverTrigger as-child` handlers are dropped on the floor.
- The swatch itself is not a control: `WatercolorDot` in glass 7 renders a hardcoded
  `<span aria-hidden="true" style="pointer-events:none">` with `inheritAttrs: false`, so this
  component's `tag="button"`, `:aria-label`, and `@click` are all silently discarded.
- The card still gives full press feedback when you press a swatch (`--card-press-t` 0 → 0.9741,
  card squashes 172 px → 164 px) and then does nothing. A textbook false affordance.
- Zero tests reference this component, its composables, its class names, or any of its aria-labels.
  Deleting the file keeps the suite green.

---

## Method / reproduction harness

All probes are read-only Playwright drives against the live dev server at `http://localhost:9000`.
Scripts are in the session scratchpad (`chalC-swatches-{1,4,5,6,7,8,9}.mjs`); they seed
`localStorage["color-palettes"]` (the store key, `demo/palettes/usePaletteStore.ts:6`) with one local
palette so a `PaletteCard` actually renders, expand the card, and then interrogate the DOM/CSSOM.

Why seeding was required is itself finding **C-13**.

---

## Findings

### C-1 · BLOCKER — every swatch is an inert, nameless, AT-hidden `<span>`; `tag`/`aria-label`/`@click` are silently dropped

**Mechanism.** `SwatchHoverMenu.vue:13-20` (touch branch) and `:29-36` (hover branch) both render:

```vue
<WatercolorDot
    :color="color"
    tag="button"
    :aria-label="`Color swatch ${color}`"
    :class="[sizeClass, 'shrink-0 cursor-pointer', swatchExtraClass]"
    @click.stop="$emit('click')"
/>
```

`@mkbabb/glass-ui@7.0.0`'s `WatercolorDot` accepts **no `tag` prop**, sets `inheritAttrs: false`, and
consumes only `attrs.class` / `attrs.style`:

`node_modules/@mkbabb/glass-ui/dist/watercolor-dot.js` —

```js
c({
  inheritAttrs: !1,
  __name: "WatercolorDot",
  props: { color:{}, variant:{default:"solid"}, animate:{...}, cycleDuration:{...}, range:{...}, seed:{...} },
  setup(e) {
    let t = e, n = h() /* useAttrs */, c = i(() => n.class), f = i(() => n.style);
    …
    return (t, n) => (d(), o("span", {
      "aria-hidden": "true",
      class: l([c.value, "watercolor-swatch", …]),
      "data-testid": "watercolor-swatch",
      style: u([f.value, { …, pointerEvents: "none", … }])
    }, …));
  }
})
```

`inheritAttrs:false` + only `class`/`style` read ⟹ `tag`, `aria-label`, `onClick`, and every
`PopoverTrigger as-child` attribute (`aria-expanded`, `aria-haspopup`, `id`, `data-state`, `onClick`)
are dropped. `pointer-events: none` then removes the element from hit-testing entirely.

**Measured** (`chalC-swatches-5.mjs`, expanded card on `/#/palettes`, all 5 dots identical):

```
DOTS [{"tag":"SPAN","ariaHidden":"true","ariaLabel":null,"pointerEvents":"none","w":40,"h":40,"parentCls":"relative"}, …×5]
```

`chalC-swatches-9.mjs` — hit test at the exact centre of a swatch:

```
HIT_TEST_AT_SWATCH_CENTER {"tag":"DIV","cls":"relative"}
```

The dot is never the event target. **Touch path proof** (`chalC-swatches-6.mjs`, 390×844,
`hasTouch`, `matchMedia("(hover: hover)") === false` ⟹ the reka-ui Popover branch is the live one):

```
HOVER_MQ false
DOTS [{"w":36,"h":36,…,"pe":"none","tag":"SPAN","ariaHidden":"true"}×3]
AFTER_TAP {"popoverContent":0,"floatingPanel":false,"cardH":185,"bodyTail":"<div><!--teleport start--><!--teleport end--></div>"}
```

Tapping a swatch on mobile produces **no popover, no panel, no state change**. The `Add to current
palette` / `Edit color` / `Copy color` actions are unreachable on every touch device.

**Registered, but unfixed.** This is the P051 abrogation:
`docs/tranches/V/coordination/CONSTELLATION.md:26` — *"WatercolorDot noninteractive face-only
boundary (T-28 outline and button/tag host abrogated in V)"* — and `:50` schedules the consumer
migration for *"W19–W22/W25–W27 … Spectrum, channel, **palette**, Generate, Mix and Gradient"*, with
the acceptance criterion *"Operable faces use named geometric seats"*. The producer cut has **already
shipped** in the installed `glass-ui@7.0.0`; the palette consumer has not migrated. The demo is
broken **now**, not at W19.

**Reproduction:** `node <scratchpad>/chalC-swatches-6.mjs` (touch) and `…-5.mjs` (desktop).

---

### C-2 · BLOCKER — the hover panel's `.floating-panel` class does not exist; the panel renders unpositioned, invisible, at the end of `<body>`

**Mechanism.** `SwatchHoverMenu.vue:37-51` teleports the action panel to `<body>` and relies
entirely on a class for its positioning context and its surface:

```vue
<Teleport to="body">
    <div v-if="open" class="floating-panel" :class="PANEL_LAYOUT" :style="floatingStyle" aria-hidden="true" …>
```

`floatingStyle` is `{top, left, transform: translateX(-50%)}` (`useHoverPopover.ts:17-24`,
`PaletteCardSwatches.vue:31`). Those inline offsets are **inert without `position: fixed`**, and
`.floating-panel` carries no rule anywhere in the running app.

**Measured — CSSOM walk over every loaded stylesheet** (`chalC-swatches-1.mjs`):

```
CSS_PROBE {"sheetCount": 40, "hits": []}
```

**Measured — the live element while hovering swatch #2** (`chalC-swatches-5.mjs`):

```
WRAPPER {"x":864,"y":579.625,"w":40,"h":46.90625}
PANEL {
 "present": true, "parentTag": "BODY", "isLastChildOfBody": true,
 "inlineStyle": "top: 537.625px; left: 884px; transform: translateX(-50%);",
 "position": "static",  "zIndex": "auto",
 "background": "rgba(0, 0, 0, 0)", "backdrop": "none",
 "borderWidth": "0px", "boxShadow": "none", "display": "flex",
 "rect": {"x": -720, "y": 900, "w": 1440, "h": 40},
 "ariaHidden": "true",
 "buttons": [{"label":"Edit color rgb(0 128 255 / 0.5)","w":28,"h":28,"x":-714,"y":906},
             {"label":"Copy color rgb(0 128 255 / 0.5)","w":28,"h":28,"x":-682,"y":906}],
 "docScrollW": 1440, "winW": 1440, "docScrollH": 940, "winH": 900
}
```

Read that rect: the panel is a **full-body-width (1440 px) static flex row** dumped at the bottom of
the document (`y: 900`, i.e. below a 900 px viewport), shoved to `x: -720` by the inherited
`translateX(-50%)`, with no background, no border, no shadow, no backdrop-filter and no stacking
context. Its two buttons sit at `x: -714` and `x: -682` — off the left edge of the world.
`docScrollH 940 > winH 900`: **hovering a swatch silently grows the page by 40 px of empty scroll.**

Screenshots: `<scratchpad>/chalC-hover.png` (viewport) and `chalC-hover-full.png` (full page) —
taken *while the panel is open*. The panel is nowhere visible in either.

**The class is gone from the producer, and nothing registered it.** Tranche A recorded
`.floating-panel` as a real glass-ui utility (`docs/tranches/A/research/Ad-interactive-states.md:135-136`
— *"use the glass-ui `.floating-panel` utility (already defined in
`glass-ui/src/styles/floating-panel.css` with `--glass-bg-resting`, `--glass-blur-resting`…)"*).
In the installed 7.0.0 it is absent:

```
$ grep -rn "floating-panel" node_modules/@mkbabb/glass-ui        # → 0 selector hits
                                                                 # (only --glass-*-floating TOKENS)
$ grep -rn "floating-panel" --exclude-dir=node_modules --exclude-dir=.git .
demo/palettes/browser/card/SwatchHoverMenu.vue:42:   class="floating-panel"     ← the sole consumer
demo/styles/animations.css:2:  * …(dialog, floating-panel, card-menu, shimmer, etc.)   ← stale prose
… (remaining hits are tranche-A/S prose)
```

Unlike C-1, this loss is **not** registered anywhere in `docs/tranches/V/`. It is unbooked debt from
the Glass 7 adoption (W44).

**Reproduction:** `node <scratchpad>/chalC-swatches-5.mjs`.

---

### C-3 · MAJOR — the swatch actions are keyboard- and AT-unreachable; the panel is `aria-hidden` with focusable children (axe `aria-hidden-focus`)

Three compounding defects, all measured:

1. **Nothing in the swatch row is focusable.** Full tabbable census of the expanded card
   (`chalC-swatches-4.mjs`, `a[href],button:not([disabled]),input,select,textarea,[tabindex]:not([tabindex='-1'])`):
   the only tabbable descendant of `[role="article"]` is `{"tag":"BUTTON","label":"Palette menu"}`.
   Zero swatch seats. Consequence of C-1 (`<span>`, no `tabindex`).
2. **The hover panel declares `aria-hidden="true"` while containing 2 focusable `<button>`s**
   (measured above). That is a direct ARIA violation — *"authors MUST NOT use `aria-hidden="true"` on
   … an element that contains focusable elements"* — and the exact condition axe's
   `aria-hidden-focus` rule fails. The source comment at `SwatchHoverMenu.vue:38-39` names the
   trade-off (*"hover-only panel is keyboard-inaccessible — hidden from AT. The reka-ui Popover
   (touch path) is the accessible route"*) — but the "accessible route" is `v-if`'d **off** on every
   desktop (`useHoverPopover.ts:11-14` ⟹ `canHover` true ⟹ `v-if="!canHover"` false). The escape
   hatch does not exist for the users who need it.
3. **Focus order break.** The panel is teleported to the end of `<body>`, so even if the buttons were
   reachable, tabbing from the card would jump to document end (WCAG 2.4.3). No focus trap, no focus
   restoration, no Escape handler anywhere in `SwatchHoverMenu.vue` / `useHoverPopover.ts`.

There is also no `aria-live` region for any swatch action result (see C-8).

---

### C-4 · MAJOR — 16 × 16 px tap target on the copy-slug button (WCAG 2.5.8 requires ≥ 24 × 24)

`PaletteCardSwatches.vue:13-19`:

```vue
<button class="p-0.5 rounded-sm hover:bg-accent …" :aria-label="`Copy slug ${displaySlug}`" …>
    <Copy class="w-3 h-3 …" aria-hidden="true" />
</button>
```

`p-0.5` (2 px) + `w-3 h-3` (12 px) = 16 px box. **Measured** on `/#/browse` with the palette list
API stubbed (`chalC-swatches-7.mjs`, `page.route("**/palettes**")` fulfilled — the dev server targets
`http://localhost:3000`, which is down):

```
OFFSITE_REQS ["GET http://localhost:3000/colors/approved","GET http://localhost:3000/palettes?limit=50&sort=newest", …]
BROWSE_CARD_COUNT 1
SLUG_COPY_BTN {"present":true,"label":"Copy slug aVeryLongUserSlugName","w":16,"h":16}
```

This row appears wherever `show-slug` is set — `demo/palettes/BrowsePane.vue:101` and
`demo/palettes/browser/admin/AdminUsersPanel.vue:147` — i.e. once per card on the browse wall and
once per row in admin users. It is **not** in the visual audit's `smallTapTargets: 60` tally, because
no card ever rendered in any capture (C-13). This component's true contribution to that count is
`1 × (number of visible palette cards)` on `/#/browse` plus the same on `/#/admin/users`, all
currently uncounted.

The sibling file already carries the ratified cure: `PaletteCard.vue:93-104` uses
`<Button icon-only variant="ghost" size="sm">` with the comment *"S.W5-4: 3rd copy of the
hand-rolled icon-trigger recipe dies onto the glass-ui atom; **the sm square also cures the ~24px
touch target**"* — measured at 36 × 36 in the same probe. This file never got that treatment.

---

### C-5 · MAJOR — false press affordance: the card animates a full press on a swatch, then nothing happens

`PaletteCardSwatches.vue:2` stops **click** only (`<div @click.stop …>`), while
`PaletteCard.vue:24` binds `v-bind="press.handlers"` (`useLiquidPress`, pointer-level). So a press
on a dead swatch drives the card's press spring to completion and releases with no effect at all.

**Measured** (`chalC-swatches-9.mjs`, pointer down/up over swatch #1):

```
IDLE                  {"pressT":"0.0000","h":172}
PRESS_ON_SWATCH       {"pressT":"0.9741","h":164}    ← card squashes 8px, full press register
AFTER_CLICK_ON_SWATCH {"pressT":"0.0000","h":172}    ← nothing opened, nothing collapsed
```

The interface promises a control with 97 % of a press animation and delivers a no-op. This is worse
than an obviously-dead element: it actively teaches the user the click *registered*.

---

### C-6 · MAJOR — four hand-rolled icon-button recipes (edicts 4 + 5), and they are the cause of C-4

The identical string is pasted at `PaletteCardSwatches.vue:14`, `:44`, `:51`, `:58`:

```
p-1.5 rounded-sm hover:bg-accent active:scale-95 active:bg-accent/70 transition-colors
cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40
```

(line 14 varies only by `p-0.5` + `shrink-0` — the variance that produces the 16 px target). Owner
edict 4 (*glass-ui is the design system*) and edict 5 (*root-level styling, never per-instance
overrides*) are both violated four times in a 96-line file, and the repo's own S.W5-4 precedent
(`PaletteCard.vue:96-104`) already retired exactly this recipe one directory up. This is not a style
nit: the per-instance fork is *why* one of the four is 16 px and the panel's two are 28 px.

---

### C-7 · MAJOR — a dual path (edict 2), and the branch that ships to desktop is the broken one

`SwatchHoverMenu.vue:8-25` (reka-ui `Popover`) and `:28-52` (hand-rolled `Teleport` + JS
positioning) are two implementations of one affordance, selected by
`v-if="!canHover"` / `v-else`. The file admits the hazard itself at `:64-66`:

```ts
/** Shared panel layout — applied to both PopoverContent and the hover Teleport
 *  panel so the two paths cannot drift. */
const PANEL_LAYOUT = "p-1.5 flex items-center gap-1";
```

A shared layout constant cannot stop the paths from drifting in **semantics**, and they did: one is
a focus-managed, collision-aware, AT-visible popover; the other is an `aria-hidden` div positioned by
hand. Because the accessible branch never renders on desktop, no a11y gate, no e2e spec and no
visual capture ever exercised it — which is precisely how C-2 shipped unnoticed. Owner edict 2
forbids dual paths for exactly this reason.

---

### C-8 · MINOR — copy actions are silent on success *and* on failure

`PaletteCardSwatches.vue:16` — `@click="writeClipboard(displaySlug)"` discards the result.
`PaletteCard.vue:333` — `void writeClipboard(css)` in `onPopoverCopy`, likewise.

glass-ui's `writeClipboard` never throws; it **returns** a discriminated result
(`node_modules/@mkbabb/glass-ui/dist/useClipboard-D36OTaeT.js`):

```js
async function r(e) {
  if (typeof navigator > "u" || !navigator.clipboard?.writeText) return { ok: !1, reason: "no-api" };
  try { return await navigator.clipboard.writeText(e), { ok: !0 }; }
  catch (e) { console.warn("[useClipboard] clipboard writeText rejected:", e); return { ok: !1, reason: "clipboard-api" }; }
}
```

So an insecure context, a denied permission, or Safari's non-gesture rejection produces **zero user
feedback** — the button just looks like it worked. The card already has the machinery: `ActionFeedback`
is mounted at `PaletteCard.vue:123-128` and `showFeedback` is exposed at `:244` (used by
`BrowsePane.vue:230,239,249,264` and `PalettesPane.vue:207` for save/publish). The swatch copy paths
were never wired to it. No `aria-live`/`role="status"` either (WCAG 4.1.3).

---

### C-9 · MINOR — `useLeaveTimer` leaks its pending timeout across unmount

`demo/palettes/browser/card/composables/useLeaveTimer.ts:1-17` — module has `schedule`/`cancel` and
**no** `onScopeDispose`/`onUnmounted`. `useHoverPopover.onLeave` schedules a 250 ms callback
(`useHoverPopover.ts:33-36`); if the card unmounts inside that window (route change, filter keystroke,
delete, `filteredSaved` re-render), the timer still fires against a disposed scope. The callback body
(`openIndex.value = null`) is benign today, so this is a latent leak, not a live crash — but it is the
kind that becomes a crash the moment the callback touches a DOM ref.

---

### C-10 · MINOR — the panel position is computed once and never corrected (no scroll/resize/collision handling)

`useHoverPopover.ts:20-31`:

```ts
function positionPanel(swatchEl: Element, offsetY = -42) {
    const rect = swatchEl.getBoundingClientRect();
    style.top  = `${rect.top + offsetY}px`;
    style.left = `${rect.left + rect.width / 2}px`;
}
function onHover(index, e) { …; nextTick(() => positionPanel(e.currentTarget as Element)); }
```

No `scroll`/`resize` listener, no `ResizeObserver`, no viewport clamp, no flip. A swatch within 42 px
of the viewport top gets `top: <negative>` and the panel leaves the screen; a swatch near either edge
overflows horizontally. The magic `-42` is a hardcoded guess at the panel's own height (measured
height: 40 px). Currently **masked** by C-2 (the offsets are inert), so this is a latent defect that
the C-2 cure must not resurrect. I could not reproduce the scroll divergence: the app scrolls in an
inner container, not the window (`chalC-swatches-7.mjs` → `scrollY: 0` after `window.scrollBy`).
**Label: hypothesis, with the code path as evidence.**

I did verify one thing the code made me suspicious of: `e.currentTarget` read inside `nextTick` is a
classic null-after-dispatch hazard. In Chromium with real (trusted) pointer input it survives — the
measured inline style `top: 537.625px; left: 884px` is exactly `rect.top - 42` / `rect.left + w/2`
for the measured wrapper `{x:864, y:579.625, w:40}`, and `ERRORS []`. No crash. Not a finding.

---

### C-11 · MINOR — one hover re-renders every swatch, and a constant is re-allocated per swatch per render

`PaletteCardSwatches.vue:31`:

```vue
:floating-style="{ ...floatingStyle, transform: 'translateX(-50%)' }"
```

Two defects in one line. (a) `transform: translateX(-50%)` is a **constant** — it belongs in the
panel's CSS, not in an object literal rebuilt N times per render. (b) The spread reads `.top`/`.left`
off the shared `reactive` cell (`useHoverPopover.ts:17`) **inside the `v-for`**, so positioning *one*
panel invalidates `PaletteCardSwatches`' render and re-renders **all N** `SwatchHoverMenu` children
with N fresh prop objects. Hovering across a 12-swatch palette is 12 full subtree re-renders where 12
`:style` writes on one element would do.

**Reproduction: NONE — hypothesis (static analysis).** I attempted to measure it and the measurement
refused: the dev server on :9000 serves a **production** Vue build, so `app.config.performance` is
inert. Evidence that the measurement was attempted and is unavailable (`chalC-swatches-8.mjs`):

```
APP_PRESENT { onBody: true, onApp: true, isDev: false }   ← __VUE_DEVTOOLS_GLOBAL_HOOK__ absent
SET ok perf=true
DOTS 12
PERF {"total": 0, "tally": {}, "marks": 0}                 ← startMeasure/endMeasure are __DEV__-only
```

---

### C-12 · INFO — vacuous gate: no test anywhere would fail if this component were deleted

```
$ grep -rln "PaletteCardSwatches\|SwatchHoverMenu\|useHoverPopover\|useLeaveTimer" . | grep -v node_modules
CHANGELOG.md
demo/palettes/browser/card/…            (5 source files)
docs/tranches/…                          (prose)
```

No file under `test/` or `e2e/`. Nor does anything test the rendered surface:

```
$ grep -rn "watercolor-swatch\|Color swatch\|floating-panel\|popoverEdit\|swatchClick" e2e/ test/
e2e/smoke/oracles/o15-dock-register.spec.ts:55:  const dot = page.locator("[data-mix-source] .watercolor-swatch").first();   ← Mix pane, not this
$ grep -rn "Edit color\|Copy color\|Copy slug" e2e/ test/
e2e/smoke/oracles/o10d-display-voice-census.spec.ts:356:  page.getByRole("button", { name: "Copy color" })   ← ActionButton in the dock, not this
$ ls -R test/demo/
palettes/api/admin-palettes.test.ts      ← the only demo test; API-level
```

The nearest gates assert card *material*, not card *function*:
`e2e/smoke/oracles/o7-card-census.spec.ts:183` — `paletteCard: fixture('[role="article"].bg-well')`;
`o16-computed-cascade.spec.ts:174` — `document.querySelectorAll("[role='article'].cartoon-surface")`.

**The exact mutation that keeps every gate green:** delete
`PaletteCardSwatches.vue` and the `<PaletteCardSwatches …/>` block at `PaletteCard.vue:139-157`.
Nothing turns red. Both BLOCKERS above are live in `master`-adjacent HEAD precisely because of this.

---

### C-13 · INFO — the visual audit is blind to this component; its REPORT rows contain zero of its output

`docs/tranches/V/megatranche/audit/visual/REPORT.json` — `safari-desktop-light /#/palettes` reports
`bodyTextLength: 237`, `button: 25`, and a `smallTapTargets` list containing only picker/slug-bar
elements (`"Switch to slug"`, `"Generate new slug"`, `"L channel"`, …). `/#/browse` shows
`bodyTextLength: 280`. The screenshots confirm why:
`shots/safari-desktop-light/browse.png` renders **"The commons is unreachable. / Failed to load
palettes"** and `shots/safari-desktop-light/palettes.png` renders **"EMPTY PLATE / No saved palettes
yet."** in all four matrices.

No `PaletteCard` — and therefore no `PaletteCardSwatches` — was ever rendered in any of the 60
captures. The audit's `smallTapTargets: 60` / `namelessButtons: 18` totals **exclude this component
entirely**; C-4's 16 px button and C-1's nameless spans are additive to those numbers, not part of
them. Any future capture pass must seed local palettes (as these probes do) or stub the palette API,
or the palette card family stays invisible to the visual gate forever.

---

## Edict compliance (the ones this component passes, for the record)

| Edict | Status |
|---|---|
| 1 · no god modules | **PASS** — 96 lines, one job, props-in/emits-out |
| 2 · no legacy/dual paths | **FAIL** → C-7 |
| 3 · KISS, no contrivance | **partial** — but `swatchClass`'s default is stated twice (`PaletteCard.vue:197` and `SwatchHoverMenu.vue:82`), two sources for one truth |
| 4 · glass-ui is the design system | **FAIL** → C-6 |
| 5 · root-level styling | **FAIL** → C-6 |
| 6 · animations never deleted | **PASS** — no keyframes here |
| 7 · idiomatic Vue 3.5 | **PASS** — no `defineModel` (so no stale-read hazard), no props needing destructure defaults, no template refs needed |
| 8 · `verbatimModuleSyntax` | **PASS** — `import type { PaletteColor }` at `:72`; `@lucide/vue` + `writeClipboard` are value imports, correctly untyped |

Local-hazard sweep, negatively confirmed: no `defineModel` (no stale round-trip), no oklch→HSV
roundtrip / `stableHue` involvement, no `ValueUnit` wrapping, no reka-ui slider pointer capture, no
`requestAnimationFrame` in this component or its two composables (`grep` clean), no WebGL. The one
`rAF` in the subtree is inside glass-ui's `WatercolorDot` and is gated
(`pauseWhenHidden: !0, respectReducedMotion: !0`) and off by default (`animate: {type: Boolean,
default: !1}`) — not a PRM-RAF site.

---

## Proposed cure — one architectural transposition, not eleven patches

**Collapse the two paths into the one that already works, and give the operable face a named
geometric seat.** This is not an invention: it is verbatim what P051 requires
(`CONSTELLATION.md:50` — *"Operable faces use named geometric seats; ornamental faces are
aria-hidden"*).

1. **Delete the hover branch entirely** — `SwatchHoverMenu.vue:27-52` (the `<template v-else>`,
   the `<Teleport>`, the `.floating-panel` div), plus `useHoverPopover.ts`, `useLeaveTimer.ts`, the
   `floatingStyle` / `canHover` / `openPopoverIndex` prop+emit chain through
   `PaletteCardSwatches.vue:29-37` and `PaletteCard.vue:246-255`.
2. **Keep exactly one reka-ui `Popover`** for both pointer classes. Wrap the trigger in a real
   seat — a `<button>` (or the glass-ui `Button` atom, `icon-only variant="ghost"`) carrying
   `:aria-label="`Color swatch ${color}`"`, sized ≥ 24 px, with the `WatercolorDot` **inside** it as
   the noninteractive face it now is. Add `<PopoverTrigger as-child>` on the seat, not on the dot.
3. This single move kills **C-1** (real focusable named control), **C-2** (`PopoverContent` is
   floating-ui-positioned by reka-ui — no class dependency, no hand-rolled coordinates), **C-3**
   (reka-ui gives focus management, Escape, `aria-expanded`, and dismissal for free), **C-5** (the
   seat consumes the pointer, so the card press no longer fires under it), **C-7** (one path),
   **C-9** and **C-10** (both composables cease to exist), and **C-11** (no per-swatch style object,
   no shared reactive read inside the `v-for`).
4. **Replace the four hand-rolled icon buttons** (`:13`, `:41`, `:49`, `:56`) with the glass-ui
   `Button` atom already used at `PaletteCard.vue:96-104` — cures **C-4** and **C-6** together, and
   the `p-0.5`/`p-1.5` fork disappears with them.
5. **Wire the copy results** — `const r = await writeClipboard(css); showFeedback(r.ok ? "Copied" :
   "Copy failed", r.ok ? "success" : "error")` through the existing `ActionFeedback`, and give that
   chip a `role="status"` — cures **C-8**.
6. **Arm the gate that would have caught all of this**: one e2e spec that seeds
   `localStorage["color-palettes"]`, expands a card, and asserts (a) `getByRole("button", {name:
   /^Color swatch/})` is focusable and activatable by keyboard, (b) activating it reveals
   `Copy color …` within the viewport (`toBeInViewport()`), (c) every button in the swatch row
   measures ≥ 24 × 24. That spec fails on today's HEAD at step (a) — cures **C-12**, and the same
   seeding cures **C-13** for the visual matrix.

Do **not** cure C-2 by re-adding a local `.floating-panel` CSS block: that would re-fork a producer
utility into the consumer (edict 4) and leave C-1/C-3/C-5/C-7 standing. The class's disappearance is
the symptom; the hand-rolled floating layer is the disease.

---

## Ledger

| ID | Severity | Defect | Reproduced |
|---|---|---|---|
| C-1 | BLOCKER | swatches are inert `aria-hidden` spans; `tag`/`aria-label`/`@click`/Popover trigger all dropped | yes |
| C-2 | BLOCKER | `.floating-panel` undefined ⟹ hover panel static, off-screen, unstyled, +40 px scroll | yes |
| C-3 | MAJOR | swatch actions keyboard/AT-unreachable; `aria-hidden` panel with focusable children | yes |
| C-4 | MAJOR | 16 × 16 copy-slug tap target (< 24 × 24) | yes |
| C-5 | MAJOR | false press affordance (`--card-press-t` 0 → 0.9741, then no-op) | yes |
| C-6 | MAJOR | 4× hand-rolled icon-button recipe instead of the glass-ui atom (edicts 4/5) | yes (grep + measure) |
| C-7 | MAJOR | dual hover/touch path (edict 2); the desktop branch is the broken one | yes |
| C-8 | MINOR | clipboard result discarded — silent success and silent failure, no `aria-live` | yes (source + producer API) |
| C-9 | MINOR | `useLeaveTimer` has no scope-dispose cleanup | source |
| C-10 | MINOR | position computed once; no scroll/resize/collision handling — **hypothesis** | no (masked by C-2) |
| C-11 | MINOR | hover re-renders all N swatches; constant re-allocated per swatch — **hypothesis** | no (prod build; perf marks unavailable) |
| C-12 | INFO | vacuous gate — deleting the component keeps every test green | yes (grep) |
| C-13 | INFO | visual audit never rendered this component; its REPORT rows are empty of it | yes |

**Strongest defect: C-2** — a component whose entire reason to exist is the swatch action menu ships
that menu to `x: -720, y: 900` with `position: static`, because it depends on a CSS class that
`@mkbabb/glass-ui@7.0.0` no longer defines and nothing in the repo ever checked.
