# CHALLENGE-C — `CurrentPaletteEditor.vue` is improperly implemented

## Model receipt

I observe myself to be **Opus 5** — exact model id `claude-opus-5[1m]` (1M-context variant), the
tier this seat was explicitly declared with. The declaration is honoured; this is not an inherited
or undeclared seat.

---

## Subject, substrate, method

| | |
|---|---|
| Component | `demo/palettes/browser/card/CurrentPaletteEditor.vue` (312 lines, area `palettes`) |
| Composables read | `card/composables/useSwatchActions.ts` (116), `useHoverPopover.ts` (67), `useLeaveTimer.ts` (17) |
| Child read | `card/SwatchHoverMenu.vue` (93) |
| Parent read | `demo/palettes/PalettesPane.vue:41-54` → `usePalettePorts.ts` → `usePaletteActions.ts` → `usePaletteStore.ts` |
| Producer | `@mkbabb/glass-ui@7.0.0` (`node_modules/@mkbabb/glass-ui/package.json` → `7.0.0`) |
| Repo | branch `tranche-u`, HEAD `c654824e` |
| Live substrate | `http://localhost:9000` (dev server, real user path via the dock view-select) |

**A prior pass of this seat is preserved at `challenge-C-implementation.2026-07-27-pass1.md`.**
This report is an independent re-derivation: every number below was measured by me in this
session, with the probe scripts kept in the session scratchpad
(`…/scratchpad/cpe-probe{1,2,3,4,5,6,7,8,9}.mjs`) and their stdout pasted verbatim.

Probe protocol for every run: fresh isolated Chromium context → `addInitScript` seeds
`localStorage["color-picker"]` with three saved colours → `goto("/")` → dock view-select →
`Palettes` → assert → measure. No source file was modified; the tree is unchanged apart from this
report.

---

## Verdict

**DEFECTIVE — four BLOCKERs.**

The component is not merely rough: **its interactive surface does not exist at runtime.** The
add-current-colour control, every palette swatch, and the entire touch action path render as
decorative `<span aria-hidden="true" style="pointer-events:none">` elements. The desktop
hover-menu — the one remaining route to edit/copy/remove — is positioned by a **CSS class that is
defined nowhere in the repository or in glass-ui**, so it lands off-screen at the bottom of
`<body>`, transparent and invisible, while being `aria-hidden` with three focusable buttons inside
it. And the duplicate-name `Update` affordance **irreversibly destroys a stored palette**: I
reduced a persisted 3-colour palette to `colors: 0` through the shipped UI.

The one automated test that touches this component is **RED on HEAD** (I ran it), and **CI never
runs Playwright at all** — so nothing in the gate stack can see any of this.

| id | severity | one line |
|---|---|---|
| C-1 | BLOCKER | the add-current-colour control is not a control — `tag`/`aria-label`/`@click`/slot all silently dropped |
| C-2 | BLOCKER | every swatch is `aria-hidden` + `pointer-events:none`; the touch action path is dead |
| C-3 | BLOCKER | `.floating-panel` is a phantom class → the hover menu renders `position:static` at `y=900` in a 900px viewport |
| C-4 | BLOCKER | `Update` writes `colors: []` over a stored palette — measured 3 → 0, no undo |
| C-5 | MAJOR | stale `colorIndex` → committing an edit after a removal appends a phantom duplicate (measured) |
| C-6 | MAJOR | `swatchKeys` defeat `TransitionGroup` identity: one removal remounts the whole remaining row |
| C-7 | MAJOR | the component's own default name collides with an existing palette |
| C-8 | MAJOR | the save button is nameless — the component's contribution to the visual REPORT's `namelessButtons` |
| C-9 | MINOR | dead code: unreachable `:disabled`, unreachable null-guard, a fully dead `TooltipProvider` block |
| C-10 | MINOR | two contradictory insert orders for one gesture (push-to-end vs unshift-to-front) + alpha-blind dedupe |
| C-11 | MINOR | uncancelled leave timer, unused media-query subscription, no reposition on scroll |
| C-12 | MINOR | 202 DOM mutation records in the swatch row for a drag that changed no saved colour |
| C-13 | MINOR | `role="alert"` backend annunciator gated on palette emptiness → re-announced on every 0↔1 transition |
| C-14 | INFO | no unit test; the one e2e spec is RED; CI runs no Playwright; `vue-tsc` exits 0 |

---

## BLOCKER C-1 — the primary action is not a control

`CurrentPaletteEditor.vue:95-105` mounts the component's reason to exist:

```vue
<WatercolorDot
    :color="cssColorOpaque"
    variant="ghost"
    tag="button"
    seed="add-current-slot"
    class="add-slot-ghost btn-interactive w-11 h-11 sm:w-12 sm:h-12 shrink-0 cursor-pointer"
    :aria-label="`Add current color ${cssColorOpaque} to palette`"
    @click="addCurrentColor"
>
    <Plus class="w-5 h-5 text-primary/60 pointer-events-none" aria-hidden="true" />
</WatercolorDot>
```

### What the producer actually is

`node_modules/@mkbabb/glass-ui/dist/watercolor-dot.js` — the shipped glass-ui 7.0.0 component:

```js
E = e(c({
  inheritAttrs: !1,
  __name: "WatercolorDot",
  props: { color:{}, variant:{default:"solid"}, animate:{...}, cycleDuration:{...}, range:{...}, seed:{default:""} },
  setup(e) {
    let t = e, n = h() /* useAttrs */, c = i(() => n.class), f = i(() => n.style);
    …
    return (t, n) => (d(), o("span", {
        "aria-hidden": "true",
        class: l([c.value, "watercolor-swatch", …]),
        "data-testid": "watercolor-swatch",
        "data-variant": e.variant,
        style: u([f.value, { …, pointerEvents: "none", … }])
    }, [ …svg filter…, e.variant === "ghost" ? … : a("", !0) ], 14, C));
  }
}), [["__scopeId","data-v-292b9032"]]);
```

Four facts follow mechanically:

1. **There is no `tag` prop** — and no `as`/`asChild`. The element is hard-coded `"span"`.
2. **`inheritAttrs: false`, and only `attrs.class` + `attrs.style` are re-applied.** `aria-label`,
   `onClick`, `tabindex`, `data-*` — every other attr and listener is **discarded**.
3. **`pointerEvents: "none"` is written into the inline style unconditionally.**
4. **The render function contains no `<slot/>`.** The `<Plus>` child is discarded.

So of the eight things the consumer passes, glass-ui 7 honours exactly two (`class`, `color`).

### Measured on the live app

Verbatim DOM dump of the well on `/#/palettes` (`cpe-probe3.mjs`):

```
dashed-well count: 1
… <div class="swatch-row flex items-center gap-2.5 flex-wrap"><div>
  <span data-v-292b9032 data-v-0ce6f2b0 aria-hidden="true"
        class="add-slot-ghost btn-interactive w-11 h-11 sm:w-12 sm:h-12 shrink-0 cursor-pointer watercolor-swatch"
        data-testid="watercolor-swatch" data-variant="ghost"
        style="border-radius: 28.1208% …; pointer-events: none; --watercolor-color: lab(92% 88.8 20); …">
    <svg class="watercolor-filter-host" aria-hidden="true" …>…</svg>
    <span class="watercolor-ghost-stroke" aria-hidden="true" …></span>
  </span> …

elements labelled 'Add current color': []
```

`<span>`, not `<button>`. No `aria-label`. No `<Plus>`. `pointer-events: none`.

Behavioural confirmation (`cpe-probe8.mjs`) — click it and hit-test it:

```
3 add-slot count: 1
3 tooltip after hovering add slot: {"tooltips":0,"tooltipText":[]}
4 savedColors length before/after clicking the add slot: 3 3
5 elementFromPoint at the add slot centre: {"tag":"DIV","cls":""}
```

`elementFromPoint` at the dot's centre returns the bare wrapper `<div>` — the dot is not in the hit
region at all. Clicking changes nothing. The screenshot (`scratchpad/cpe-pane.png`) shows the
dashed silhouette with **no `+` glyph** in it, exactly as the render function predicts.

**Reproduction:** open `http://localhost:9000/#/palettes` via the dock, click the dashed add slot,
observe `localStorage["color-picker"].savedColors` unchanged. Or `document.querySelectorAll('[aria-label^="Add current color"]').length === 0`.

**Blast radius beyond this seat.** `grep -rn -A6 "<WatercolorDot" demo | grep "tag="` returns six
`tag="button"` sites — `SwatchHoverMenu.vue:17,32`, `CurrentPaletteEditor.vue:98`,
`MixSourceSelector.vue:168,215`, `GenerateControls.vue:203`. Every one is a dead control by the
same mechanism. The `tag="div"` sites are harmless (they were always decorative).

**Cure (gestalt, not patch).** The producer's contract is *decorative pigment*, and that is the
right contract — a watercolour blob is not a button. The consumer must stop pretending otherwise:
the affordance is a real focusable control from the design system with the dot as its child —

```vue
<Button variant="ghost" icon-only class="add-slot-ghost …"
        :aria-label="`Add current color ${cssColorOpaque} to palette`"
        @click="addCurrentColor">
    <WatercolorDot :color="cssColorOpaque" variant="ghost" seed="add-current-slot" class="w-11 h-11" />
    <Plus class="w-5 h-5 text-primary/60" aria-hidden="true" />
</Button>
```

and the `tag` prop — which names an API that does not exist — is deleted at all six sites. That is
the no-legacy edict applied literally: a prop nobody implements is a shim for a version that is
gone. If the fleet wants dot-shaped buttons as a first-class thing, that variant belongs in
glass-ui (edict 4), not in a `tag=` string the producer ignores.

---

## BLOCKER C-2 — every swatch is decorative; the touch action path is dead

`SwatchHoverMenu.vue:13-21` (touch branch) and `:29-36` (hover branch) pass the same discarded
props to the same producer:

```vue
<PopoverTrigger as-child>
    <WatercolorDot :color="color" :variant="ghost ? 'ghost' : 'solid'" tag="button"
                   :aria-label="`Color swatch ${color}`" :class="[sizeClass, 'shrink-0 cursor-pointer', …]" />
</PopoverTrigger>
```

`as-child` merges the trigger's `id`/`aria-expanded`/`aria-haspopup`/`onClick` onto the child
vnode; `inheritAttrs:false` then throws all of them away. Measured on an **iPhone 14 context**
(`cpe-probe5.mjs`, `(hover:hover)` false → the Popover branch is the one that renders):

```
T (hover:hover) matches: false
T well info: {
 "wrappers": 3,
 "firstWrapperHTML": "<div class=\"relative\"><!-- Touch: native Popover click toggle -->
   <span aria-hidden=\"true\" class=\"w-11 h-11 sm:w-12 sm:h-12 shrink-0 cursor-pointer watercolor-swatch\"
         data-testid=\"watercolor-swatch\" data-variant=\"solid\"
         style=\"background-color: lab(50 20 -30); …; pointer-even…",
 "popoverTriggers": 0
}
T first swatch box: {"x":46,"y":298.578125,"width":44,"height":50}
T after tap on swatch: {"popoverContent":0,"floatingPanel":0,"anyEditBtn":0}
```

`popoverTriggers: 0` — no `aria-haspopup`, no `aria-expanded`, no reka anchor attribute survives.
A real `touchscreen.tap()` at the swatch centre opens nothing.

`SwatchHoverMenu.vue:38-39` states the design intent in a comment:

> *"hover-only panel is keyboard-inaccessible — hidden from AT. **The reka-ui Popover (touch path)
> is the accessible route.**"*

**The declared accessible route does not function.** On any touch device, the current-palette
swatches have zero available actions — no edit, no copy, no remove — and combined with C-1 the
whole swatch surface on mobile is a picture.

### The accessibility tree of the whole editor

`cpe-probe8.mjs`, aria snapshot of `.dashed-well` with three colours staged:

```
1 aria snapshot of .dashed-well:
- text: Current Palette 3 colors
- alert: "dev misconfigured — run `npm run dev`"
- textbox "Palette 1"
- button:
  - img

2 focusables inside .dashed-well: [{"tag":"INPUT","name":"Palette 1"},{"tag":"BUTTON","name":""}]
```

Three colours are on screen. **The accessibility tree contains none of them, and contains no way
to add, edit, copy, or remove one.** Two focusable elements exist in the entire component: a
textbox and one nameless button. This is not a missing-label defect; the interactive surface is
absent.

**Cure.** Same transposition as C-1 — the swatch is a `<button>` (or the glass-ui control atom)
whose *child* is the decorative dot. That single change simultaneously restores the accessible
name, the hit region, the Popover trigger wiring, and keyboard operability.

---

## BLOCKER C-3 — `.floating-panel` is a phantom class: the hover menu renders off-screen

`SwatchHoverMenu.vue:37-51` teleports the hover action panel to `<body>` and positions it with
inline `top`/`left` computed in `useHoverPopover.ts:20-24`:

```ts
function positionPanel(swatchEl: Element, offsetY = -42) {
    const rect = swatchEl.getBoundingClientRect();
    style.top = `${rect.top + offsetY}px`;
    style.left = `${rect.left + rect.width / 2}px`;
}
```

Those coordinates only mean anything under `position: fixed|absolute`. The panel's only positioning
hook is `class="floating-panel"`.

**`.floating-panel` is defined nowhere.**

```
$ /usr/bin/grep -rn "floating-panel" demo src api test e2e
demo/DESIGN.md:273:…(dialog, floating-panel, card-menu, shimmer) come from `@mkbabb/glass-ui/styles/animations.css`.
demo/styles/animations.css:2: * Shared keyframes (dialog, floating-panel, card-menu, shimmer, etc.)
demo/palettes/browser/card/composables/useHoverPopover.ts:7: * Shared hover-timer + floating-panel positioning pattern.
demo/palettes/browser/card/SwatchHoverMenu.vue:42:                    class="floating-panel"
```

One consumer, three prose mentions, **zero rules** — in demo/ *and* in the producer
(`grep -rc "floating-panel" node_modules/@mkbabb/glass-ui/dist/glass-ui.css` → `0`; the whole
`dist/styles/*.css` set → no hits).

Confirmed against the running document rather than the source tree (`cpe-probe1.mjs` walks every
`CSSStyleSheet`, recursing into `@media`/`@supports`):

```
P1 .floating-panel CSS rules: { "hits": [], "rulesScanned": 986, "sheetsBlocked": 0, "sheets": 32 }
```

### The measured consequence

`cpe-probe4.mjs`, three colours staged, hovering swatch 0 in a 1440×900 viewport:

```
C swatch wrapper rect: {"x":767,"y":347.640625,"width":48,"height":54.90625}
C .floating-panel: {
 "parentIsBody": true,
 "inlineStyle": "top: 305.641px; left: 791px;",
 "position": "static",
 "top": "305.641px",
 "left": "791px",
 "zIndex": "auto",
 "background": "rgba(0, 0, 0, 0)",
 "boxShadow": "none",
 "rect": { "x": 0, "y": 900, "w": 1440, "h": 40 },
 "ariaHidden": "true",
 "buttons": ["Edit color lab(50% 20 -30)", "Copy color lab(50% 20 -30)", "Remove color lab(50% 20 -30) from palette"],
 "docScrollH": 940,
 "winH": 900
}
```

Read that carefully:

- `position: "static"` — the computed `top: 305.641px; left: 791px` are **inert**.
- The panel lands at `y = 900` in a **900px viewport**: entirely below the fold. It should have
  been at `y ≈ 306`, next to a swatch at `y ≈ 348`. It is **594px off-station**.
- `w: 1440` — a full-viewport-width block, because a static `<div>` teleported to `<body>` fills
  the body.
- `background: rgba(0,0,0,0)`, `boxShadow: none`, `zIndex: auto` — no surface at all. It never had
  a glass plate; the class that was supposed to supply one does not exist.
- `docScrollH: 940` vs `winH: 900` — **the panel grows the document by 40px**, minting a spurious
  scrollbar on a viewport-locked shell every time the pointer crosses a swatch.
- `ariaHidden: "true"` with three focusable `<button>`s inside → the axe-core `aria-hidden-focus`
  violation ("ARIA hidden element must not contain focusable elements"), landed at the very end of
  the tab order.

The screenshot `scratchpad/cpe-hover.png` is the visual proof: the pointer is on the first swatch,
and **nothing appears anywhere near it**.

So, folding C-1 → C-3 together: **the only surviving route to edit, copy or remove a staged colour
is an invisible, transparent, aria-hidden strip 594px below the swatch it belongs to.** I could
click it only because Playwright scrolls elements into view; a human cannot find it.

The visual REPORT could not catch this — it never hovers. `REPORT.json` for
`safari-desktop-light /#/palettes` records `overflowX: 0`, `consoleErrors: []`, `pageErrors: []`
and a clean render, because the panel only exists during hover **and** the route was captured with
an empty palette (`text: 237`, no swatch row, no save row).

**Cure (architectural transposition).** Delete the hover branch and `useHoverPopover` +
`useLeaveTimer` entirely. `SwatchHoverMenu` **already imports the reka-ui `Popover`** for the touch
path; one `Popover` serves both pointer classes — floating-ui does the positioning (no manual
`getBoundingClientRect`, no phantom class, no scroll drift), reka does focus management and
`Escape`, and the panel is keyboard-operable and announced instead of `aria-hidden`. That removes
~100 lines, three defects (C-3, C-11, and the C-2 dual-path split), and one owner-edict violation
(a hand-rolled floating surface instead of the design-system primitive) in a single stroke.

---

## BLOCKER C-4 — `Update` destroys a stored palette

`CurrentPaletteEditor.vue:247-276`:

```ts
function saveCurrentPalette() {
    if (savedColorStrings.length === 0) return;          // ← guarded
    …
    if (existing) { duplicateTarget.value = existing; return; }
    …
}

function confirmUpdatePalette() {
    const id = duplicateTarget.value?.id;
    if (id == null) return;
    emit("updated", id, colorsFromStrings(savedColorStrings));   // ← NOT guarded
    …
}
```

`duplicateTarget` is set once and **never invalidated** — not when the name changes, not when the
colours change, not when the buffer empties. `confirmUpdatePalette` re-reads `savedColorStrings`
at click time and has no emptiness guard, while its sibling `saveCurrentPalette` does.

Downstream there is no guard either: `usePaletteActions.ts:79-82` →
`usePaletteStore.ts:96-107` writes `palette.colors = patch.colors` into a `useStorage`-backed
localStorage record. No undo, no history for a local palette.

### Measured (`cpe-probe9.mjs`) — a persisted 3-colour palette reduced to 0

```
1 store after save: [{"name":"Keeper","colors":3}] | swatches now: 0
2 swatches restored: 3
2 banner: "Current Palette 3 colors dev misconfigured — run `npm run dev` \"Keeper\" already exists. Update Cancel"
3 swatches after emptying: 0
3 banner still present? "Start a new palette \"Keeper\" already exists. Update Cancel"
4 Update visible: 1
4 store AFTER Update with an empty buffer: [{"name":"Keeper","colors":0}]
```

Note line 3: the header has already flipped back to **"Start a new palette"** — the component
itself knows the buffer is empty — while the stale banner beneath it still offers `Update`.
Clicking it overwrites `Keeper` with `colors: []`.

**Reproduction (pure UI):** save a palette named `X`; stage colours again; type `X` + Enter to
raise the duplicate banner; remove the staged swatches; click `Update`. `X` is now empty, forever.

### The same staleness also silently discards the typed name

`cpe-probe5.mjs`:

```
S well text after default-name save: "… \"Palette 2\" already exists. Update Cancel"
S well text after retyping a unique name (banner still there?): "… \"Palette 2\" already exists. Update Cancel"
S Update button visible: 1
S store after Update: [{"name":"Palette 2","n":3}]
```

The user typed `Totally different`, clicked the only live-looking affordance, and got `Palette 2`
overwritten. The name they typed evaporated with no message.

**Cure.** `duplicateTarget` is derived state pretending to be stored state. Replace the `ref` with
a `computed` over `(currentPaletteName, savedPalettes)` — then it self-invalidates on every
keystroke and can never outlive its premise — and let `confirmUpdatePalette` share the one
precondition its sibling already enforces. Concretely, hoist the guard:

```ts
const trimmedName = computed(() => currentPaletteName.value.trim() || `Palette ${savedPaletteCount + 1}`);
const duplicateTarget = computed(() =>
    savedColorStrings.length === 0 ? null
    : savedPalettes.find((p) => p.name.toLowerCase() === trimmedName.value.toLowerCase()) ?? null);
```

The `attempted` flag that decides whether to *show* the banner stays a `ref` — but the target
itself must never be a snapshot.

---

## MAJOR C-5 — a stale `colorIndex` appends a phantom colour

`useSwatchActions.ts` mints an index-identified edit target and then re-indexes the array behind
it — both in the same file, neither aware of the other:

```ts
function onCurrentSwatchEdit(css: string, index: number) {      // :76
    emit("startEdit", { paletteId: CURRENT_PALETTE_ID, colorIndex: index, originalCss: css });
}
function onCurrentSwatchRemove(css: string, index: number) {    // :90
    const updated = savedColorStrings.value.filter((_, i) => i !== index);
    emit("apply", updated);                                     // every later index shifts down
}
```

The consumer of that index is `usePaletteActions.ts:99-107`:

```ts
const oldCss = deps.savedColorStrings.value[colorIndex];   // undefined once the array shrank
if (oldCss === newCss) return;                             // undefined !== newCss → falls through
const updated = [...deps.savedColorStrings.value];
updated[colorIndex] = newCss;                              // writes PAST the end → array grows
```

### Measured end-to-end on desktop (`cpe-probe7.mjs`)

```
0 savedColors: ["lab(50% 20 -30)","lab(70% -40 10)","lab(30% 5 60)"] swatches: 3
1 after startEdit(2) — overlays: 1 savedColors: ["lab(50% 20 -30)","lab(70% -40 10)","lab(30% 5 60)"]
2 remove label: Remove color lab(50% 20 -30) from palette
3 after remove(0) — swatches: 2 savedColors: ["lab(70% -40 10)","lab(30% 5 60)"] overlays: 0
4 after Enter-commit — swatches: 3 savedColors: ["lab(70% -40 10)","lab(30% 5 60)","lab(30% 5 60)"]
4 count label: 3 colors
```

Start an edit on index 2, remove index 0, press `Enter` (the picker's global commit shortcut,
`ColorPicker.vue:377` `window.addEventListener("keydown", handleKeydown)` → `:258 commitEdit()`) —
and the palette gains a **duplicate third entry that no gesture asked for**, persisted to
`localStorage`.

Line 3 also records a second defect in the same trace: **`overlays: 0`.** `isSwatchEditing(2)` is
now false for every rendered swatch, so the edit overlay — the only commit/cancel affordance at
`≥1024px`, since `CurrentPaletteEditor.vue:58` is `hidden lg:flex` and the dock's mobile-edit layer
is gated `!isDesktop` (`Dock.vue:73`) — **vanishes while the edit stays live.** The user is stuck
in edit mode with no visible way out.

**Cure.** Identify the edit target by *identity*, not by ordinal. The current palette is a list of
CSS strings; the honest key is the value plus an occurrence ordinal, or a per-entry id minted where
the buffer is minted (`useColorPipeline.savedColors`). Anything index-shaped must be resolved at
the moment of mutation, not carried across mutations. Minimum viable hardening if the ordinal
stays: `commitColorEdit` must bail when `colorIndex >= savedColorStrings.length`, and `startEdit`
must be cleared by the same emit that re-indexes the array.

---

## MAJOR C-6 — `swatchKeys` defeats the very identity it claims to provide

`useSwatchActions.ts:42-59`:

```ts
let swatchKeyCounter = 0;
const swatchKeyMap = new Map<string, number>();
const swatchKeys = computed(() =>
    savedColorStrings.value.map((color, i) => {
        const mapKey = `${color}::${i}`;
        if (!swatchKeyMap.has(mapKey)) swatchKeyMap.set(mapKey, swatchKeyCounter++);
        return swatchKeyMap.get(mapKey)!;
    }),
);
watch(savedColorStrings, () => {
    const validKeys = new Set(savedColorStrings.value.map((c, i) => `${c}::${i}`));
    for (const key of swatchKeyMap.keys()) if (!validKeys.has(key)) swatchKeyMap.delete(key);
});
```

**Proof that the 18 lines are a no-op.** The map is a bijection `(color, index) → counter`, so the
emitted key is an injective relabelling of the string `${color}::${i}`. `:key="swatchKeys[i] ?? i"`
is therefore *behaviourally identical* to `:key="`${color}::${i}`"` — same equalities, same
inequalities, same Vue diff. The counter, the Map, and the cleanup watcher buy nothing.

They are also **strictly worse than the plain string**: the `pre`-flush watcher deletes every pair
whose index moved *before* the computed re-runs, so a colour that returns to a previously-held slot
gets a *fresh* counter — the machinery designed for stability actively manufactures instability.

### Measured (`cpe-probe4.mjs`) — one removal remounts the whole row

I tagged each swatch wrapper's DOM node with `dataset.probeTag` before removing index 0:

```
D remove button count: 1
D wrappers after removing index 0: [
 { "probeTag": "(NEW NODE)", "label": "lab(70% -40 10)" },
 { "probeTag": "(NEW NODE)", "label": "lab(30% 5 60)" }
]
```

Both survivors are **new DOM nodes**. Removing one colour from a 12-colour palette destroys and
recreates 11 untouched swatches — each one re-mounting a `WatercolorDot` with a fresh `useId()`
SVG `<filter>`/`feTurbulence` and playing a full `TransitionGroup` leave+enter on an element that
did not change. Index keys (`:key="i"`) would at least preserve node identity; the "stable key"
machinery is worse than the naïve fallback it shadows.

**Cure.** Delete the Map, the counter and the watcher. If per-entry identity matters — and C-5 says
it does — mint a real id in the buffer that owns the data (`useColorPipeline`), and key on that.
Otherwise `:key="color + '::' + i"` is the same thing in one line. This is the no-contrivance edict
in its purest form: 18 lines of ceremony implementing a string concatenation.

---

## MAJOR C-7 — the component's own default name collides with an existing palette

`CurrentPaletteEditor.vue:127-128, 249-259`: the placeholder and the fallback name are both
`Palette ${savedPaletteCount + 1}`, and the duplicate check runs against the same list.
`savedPaletteCount` is a *count*, not a high-water mark, so any prior palette whose name happens to
be `Palette N` for `N ≤ count + 1` collides.

Measured (`cpe-probe5.mjs`): save one palette explicitly named `Palette 2`, restage colours, press
Enter on the empty field —

```
S placeholder on 2nd save (default name): "Palette 2"
S well text after default-name save: "Current Palette 3 colors … \"Palette 2\" already exists. Update Cancel"
```

The component proposed a name, the user accepted it, and the component then refused it — with a
banner naming a string the user never typed, whose only forward affordance (`Update`) is the
data-destroying one from C-4.

**Cure.** Derive the default from the existing names, not from the cardinality: pick the smallest
`n` such that `Palette n` is unused (a single `while` over a `Set` of lowercased names), and compute
it as a `computed` so the placeholder and the fallback can never disagree.

---

## MAJOR C-8 — the save button has no accessible name

`CurrentPaletteEditor.vue:134-142` — `icon-only`, a `<Check>` glyph, no `aria-label`, no text:

```vue
<Button variant="outline" icon-only class="h-8 w-8 rounded-full …"
        :disabled="savedColorStrings.length === 0" @click="saveCurrentPalette">
    <Check class="w-4 h-4 text-foreground" />
</Button>
```

Measured with a colour staged (`cpe-probe4.mjs`, filter = visible buttons with no
`aria-label`/`title`/text):

```
B nameless visible buttons: [
 { "w": 24, "h": 24, "cls": "send-btn btn-interactive", "inWell": false, … },
 { "w": 32, "h": 40, "cls": "button tap-squish focus-ring glass-wash glass-capsule … h-8 w-", "inWell": true,
   "html": "<svg … viewBox=\"0 0 24 24 …" }
]
```

`inWell: true` — this is **this component's contribution to the visual REPORT's
`namelessButtons` tally**, and the reason the capture could not attribute it: `REPORT.json` records
`namelessButtons: 1` for `safari-desktop-light /#/palettes`, but the capture visits the route with
an **empty** palette, so the save row (`v-if="savedColorStrings.length > 0"`) never renders. The
route's true count in the working state is 2. The e2e spec already documents the gap in prose
(`e2e/smoke/flows/palette-save.spec.ts:39-41`: *"the icon-only Save button next to the Input lacks
an aria-label"*) and routes around it instead of failing on it.

**Cure.** `aria-label="Save current palette"`. The neighbouring swatch-action buttons at
`:46,49,52` already do exactly this; the save button is the one that was missed.

---

## MINOR findings

### C-9 — dead code (three sites)

1. `:disabled="savedColorStrings.length === 0"` (`:138`) sits **inside**
   `v-if="savedColorStrings.length > 0"` (`:118`). The condition is unreachable.
2. `if (id == null) return;` (`:271`). `savedPalettes` is typed `Palette[]` at the prop boundary
   (`:201`), but its producer narrows it: `usePaletteStore.ts:51-55` filters
   `(p): p is Palette & { id: string } => p.isLocal && p.id != null`. Widening the prop to
   `Palette[]` **threw away the store's proof** and then re-checked it at runtime. Type the prop as
   the store types it and the guard deletes itself.
3. The entire `TooltipProvider`/`Tooltip`/`TooltipTrigger`/`TooltipContent` block (`:88-111`, 24
   lines) is dead: measured `{"tooltips":0,"tooltipText":[]}` after a 900ms hover
   (`cpe-probe8.mjs`), because the trigger's attrs go to a `pointer-events:none` span (C-1). It
   also duplicates the `aria-label` it exists to substitute for.

### C-10 — one gesture, two contradictory insert orders

`useSwatchActions.ts:62-74` moves an already-present colour to the **end**
(`reordered.push(...)` → `emit("apply")`), while the wiring that services a *new* colour,
`usePaletteWiring.ts:84-100`, inserts at the **front** (`savedColors.unshift(parsed)`) and moves an
existing one to the **front** too. So "add the current colour" appends or prepends depending on a
branch the user cannot see, and the two dedupe implementations disagree about the resulting order.

The dedupe is also string-identity: `savedColorStrings.value.indexOf(cssColorOpaque.value)`, where
`cssColorOpaque = serializePickerColor(withAlpha(color, 1))` (`useColorPipeline.ts:104`) but
`savedColorStrings = savedColors.map(serializePickerColor)` (`:166`) — **alpha-preserving**. A
staged colour carrying alpha (which `commitColorEdit` can write, via
`toCSSColorString(model.value.color)`) can never match the opaque probe, so the dedupe silently
fails and the palette gains a visual duplicate.

**Cure.** One insert policy, in one place. The component should emit intent (`addColor`) and let
the buffer's owner apply the single ordering rule; the reorder branch in `addCurrentColor` is the
duplicate that should go.

### C-11 — timer, subscription, and positioning hygiene

- `useLeaveTimer.ts` has **no `onScopeDispose`**. `onLeave()` schedules a 250ms callback that
  survives unmount and then writes to a ref in a dead scope. One line
  (`onScopeDispose(cancel)`) fixes it.
- `useHoverPopover.ts:11-14` calls `useBreakpoint("(hover: hover)")` **unconditionally**, even when
  the caller passes an explicit `canHover` — registering a `matchMedia` change listener whose value
  is then discarded. (glass-ui's `useBreakpoint` *does* dispose correctly — verified in
  `dist/dom.js`: `c() && u(a)` — so this is waste, not a leak.)
- `positionPanel` writes **viewport** coordinates once, on `pointerenter`, with no `scroll`/`resize`
  listener and no floating-ui anchoring. Even after `.floating-panel` is given a `position`, the
  panel would drift off its swatch on the first scroll of the `overflow-y-auto` pane
  (`PalettesPane.vue:2`). Subsumed by the C-3 cure (use the Popover).

### C-12 — per-tick work in a row that did not change

`cpe-probe6.mjs` — a `MutationObserver` on `.swatch-row` (attributes + childList + subtree) during
a 40-step drag of the L slider, with three *unchanging* saved colours:

```
4 swatch-row DOM mutations during a 40-step slider drag: {"row":202,"addSlot":0}
```

**202 mutation records for a gesture that changed no saved colour** — ~5 per pointer move. The
driver is `:color="cssColorOpaque"` on the add-slot dot (`:96`): glass-ui's `useWatercolorBlob`
watches `color` and re-derives eight random border-radius percentages plus the `feTurbulence` seed
on every change, so the ghost silhouette reshapes on every frame of every drag.

Compounding it, `savedColorStrings` is `computed(() => model.value.savedColors.map(serializePickerColor))`
over a `shallowRef` that is **replaced wholesale** on each colour mutation — so the array identity
changes every tick, firing `useSwatchActions`'s cleanup `watch` (a fresh `Set` of N strings + a
full Map scan) and re-running the `swatchKeys` map, per frame, for a list that did not change.

**Cure.** Seed the add-slot from a coalesced source (the pipeline already exports
`cssColorOpaqueFrame`, `useColorPipeline.ts:279`) or from a static seed, and let the C-6 cure delete
the per-tick key machinery outright.

### C-13 — an assertive backend annunciator gated on palette emptiness

`CurrentPaletteEditor.vue:116`: `<ApiOfflineChip v-if="savedColorStrings.length > 0" …>`. The chip
renders `role="alert"` (`ApiOfflineChip.vue:13`) — an *assertive* live region. Gating it on
`savedColorStrings.length > 0` means it **mounts and re-announces every time the palette crosses
0↔1 colours**, interrupting the screen reader with "backend offline — saved locally" as though the
backend had just changed state, when the user merely added their first swatch. Backend health is
not a function of buffer emptiness. It showed up in my aria snapshot as the *second* node in the
component's entire accessible tree.

**Cure.** Let the chip self-gate (it already does: `v-if="misconfigured"` / `v-else-if="offline"`)
and drop the emptiness condition, or move it to the pane where backend state actually belongs.

---

## C-14 — test truth: the gate cannot see any of this

**Unit tests: none.** `test/` contains no component test at all —
`grep -rl "mount(" test/` returns nothing; the 21 files there are library-level (parsing, colour
math, transforms). Nothing imports `CurrentPaletteEditor`, `useSwatchActions`, `useHoverPopover`, or
`useLeaveTimer`.

**The one e2e spec is RED on HEAD.** `e2e/smoke/flows/palette-save.spec.ts:34-37` clicks
`getByRole("button", { name: /Add current color .* to palette/ })` — the control C-1 proves does not
exist. I ran it:

```
$ npx playwright test e2e/smoke/flows/palette-save.spec.ts --project=smoke --reporter=line
Running 1 test using 1 worker
  1) [smoke] › e2e/smoke/flows/palette-save.spec.ts:20:1 › save current palette persists to localStorage 'color-palettes'
    Test timeout of 30000ms exceeded.
    Error: locator.click: Test timeout of 30000ms exceeded.
    Call log:
      - waiting for getByRole('main', { name: 'Color tool panes' }).getByRole('button', { name: /Add current color .* to palette/ }).filter({ visible: true })
  1 failed
```

**CI never runs it.** `.github/workflows/` contains `ci.yml`, `deploy-pages.yml`, `release.yml`;
`grep -n "playwright\|e2e" .github/workflows/*.yml` returns **nothing**. `ci.yml` runs `lint`,
`vue-tsc` ×2, `build`, `npm test` (vitest), and a packed-surface check. A blocker-grade regression
sits in a spec no gate executes.

**The typecheck cannot see it either.** `tag="button"`, `:aria-label`, `@click` and a slot child
passed to a component that declares none of them are all legal Vue attribute fallthrough:

```
$ npx vue-tsc -p tsconfig.demo.json --noEmit ; echo EXIT=$?
EXIT=0
```

**The exact mutation that keeps the gates green.** Even if C-1 were fixed and the e2e spec went
green again, it asserts only

```ts
return stored.palettes?.length ?? 0;   // toBeGreaterThanOrEqual(1)
```

so replacing `colorsFromStrings` (`CurrentPaletteEditor.vue:243-245`) with `() => []` — saving every
palette **empty** — keeps it green, as does inverting `position: i` to `position: 0`, as does
deleting the entire duplicate-name path, `confirmUpdatePalette`, and all three swatch actions. That
is a vacuous gate: it proves a localStorage row appeared, not that the component works.

**Minimum honest coverage.** Three component-level tests that would each fail on a defect above:
(1) mount with `savedColorStrings: ["a","b"]` and assert two elements with role `button` and an
accessible name matching `/Color swatch/` — fails on C-2; (2) raise the duplicate banner, empty the
buffer, click `Update`, assert **no** `updated` emit — fails on C-4; (3) `startEdit(1)` then
`remove(0)`, assert the pending target is cleared — fails on C-5.

---

## Owner-edict compliance

| edict | verdict |
|---|---|
| 1 · no god modules | **PASS.** 312 / 116 / 67 / 17 lines across four cohesive files; the composable split is real. |
| 2 · no legacy code, no dual paths | **FAIL.** `tag="button"` names a producer API that does not exist (C-1) — a shim for a version that is gone. `SwatchHoverMenu` ships two full render paths for one behaviour (C-2/C-3), and `addCurrentColor` duplicates `usePaletteWiring`'s dedupe with the opposite ordering (C-10). |
| 3 · KISS, no contrivance | **FAIL.** 18 lines of Map/counter/watcher that provably equal one string concatenation, and are strictly worse than it (C-6). 24 dead tooltip lines (C-9). |
| 4 · glass-ui is the design system | **FAIL.** A hand-rolled teleported floating panel positioned by manual `getBoundingClientRect` and a phantom class, standing next to the reka-ui `Popover` the same file already imports (C-3). |
| 5 · root-level styling | **PASS with one qualifier.** The scoped block is layout-only and the S.W5-3 comment records the deliberate retirement of per-instance overrides; but `.floating-panel` has no root-level definition to inherit from — the styling is not *overridden* per-instance, it is *absent* (C-3). |
| 6 · animations never deleted | **PASS.** `vj-enter` is consumed, not redefined; `.edit-overlay` only re-parameterises the family's own custom properties (`--vj-enter-x/y/scale`). |
| 7 · idiomatic Vue 3.5 | **PARTIAL.** Reactive props destructure + `toRef(() => …)` at `:196-202,234-235` is correct, and there is no `defineModel` stale-read hazard here (`currentPaletteName` is a local `ref`). But no `useTemplateRef` is needed and none is used — fine — while `duplicateTarget` is snapshot state that should be `computed` (C-4), the anti-pattern the edict's spirit targets. |
| 8 · `verbatimModuleSyntax` | **PASS.** `import type { Palette, PaletteColor }` (`:190`); `useSwatchActions.ts:2-3` `import type { Ref, ShallowRef }` / `import type { EditTarget }`. No mixed imports; `TransitionGroup` at `:172` is a value import of a value. |

---

## What is sound (the negative proof)

Not everything I suspected held up; these are checked and clean, and a future seat should not
re-file them:

- **The `hidden lg:flex` edit overlay is NOT a mobile dead-end.** `CurrentPaletteEditor.vue:58`
  hides the Save/Cancel overlay below `1024px`, and `Dock.vue:73` computes
  `mobileEditActive = !isDesktop && !!editTarget` with `isDesktop = useMediaQuery("(min-width: 1024px)")`,
  raising a dock layer with `aria-label="Save edit"` / `"Cancel edit"` (`Dock.vue:143-144`). The two
  breakpoints are exactly complementary. Measured: at 800px the dock control is present
  (`Save edit affordances at 800px: [{"label":"Save edit","w":40}]`). The *orphaning* in C-5 is a
  stale-index consequence, not a breakpoint gap.
- **No `defineModel` stale-read hazard.** The component uses a plain local `ref` for the name field
  and props-in/emits-out for everything else; the known `WritableComputedRef` round-trip class does
  not apply.
- **No `ValueUnit` nesting risk.** Nothing here wraps a possibly-wrapped value;
  `colorsFromStrings` maps strings to `{ css, position }` records only.
- **No ungated `requestAnimationFrame`.** No rAF in the component or any of its three composables.
  glass-ui's `useWatercolorBlob` rAF loop is opt-in via `animate` (default `false`, and this
  component never sets it) and is `pauseWhenHidden` + `respectReducedMotion` when enabled.
- **No WebGL on this path**, no network I/O, no unguarded `await`: every action is a synchronous
  emit. `writeClipboard` is correctly `void`-ed (`useSwatchActions.ts:87`).
- **The composable's media-query subscription does dispose.** glass-ui `useBreakpoint`
  (`dist/dom.js`) registers `onScopeDispose` — the listener is not leaked.
- **`useLeaveTimer.schedule` cancels before re-arming**, so rapid hover in/out cannot stack timers
  (only the unmount case, C-11, is unhandled).
- **The store layer is honest.** `usePaletteStore` is a single lazy module singleton with a
  defensive `serializer.read` (`try/JSON.parse/version check`), and `savedPalettes` narrows
  `id` by type predicate. The corruption in C-4/C-5 originates entirely above it.
- **Zero console errors, zero page errors** on `/#/palettes` in all four visual-audit matrices
  (`REPORT.json`) and in every probe run of mine (the only console error is the dev-server
  `VITE_API_URL` misconfiguration notice, which is environmental).
- **No horizontal overflow** at rest (`overflowX: 0`, all four matrices). The 40px *vertical*
  overflow in C-3 exists only while hovering, which the capture never does.

---

## Recommended repair order

1. **C-1 + C-2 together** — one transposition (real control wrapping a decorative dot) restores the
   add action, the swatch actions, the accessible names, keyboard operability, and the Popover
   trigger wiring. Delete `tag=` from all six `tag="button"` sites repo-wide.
2. **C-3** — delete the hover branch, `useHoverPopover`, `useLeaveTimer` and the phantom class;
   the already-imported reka-ui `Popover` serves both pointer classes. Kills C-11 with it.
3. **C-4** — `duplicateTarget` becomes `computed`; `confirmUpdatePalette` inherits the emptiness
   precondition.
4. **C-5** — identity-keyed edit targets, and `commitColorEdit` bails on an out-of-range index.
5. **C-6** — delete the key machinery.
6. **C-7, C-8, C-9, C-10, C-12, C-13** — one-to-few-line repairs, each named above.
7. **C-14** — three component tests that fail on C-2, C-4, C-5; then wire Playwright into `ci.yml`,
   because `palette-save.spec.ts` has been red on a blocker that no gate reported.
