# CHALLENGE-C — `CurrentPaletteEditor.vue` implementation audit

## Model receipt

I observe myself to be **Opus 5 (`claude-opus-5[1m]`, 1M context)** — the tier this seat was
declared with. Declaration honoured; no inherited or undeclared seat.

---

## Subject & substrate

| | |
|---|---|
| Component | `demo/palettes/browser/card/CurrentPaletteEditor.vue` (312 lines) |
| Composables | `card/composables/useSwatchActions.ts` (116), `useHoverPopover.ts` (67), `useLeaveTimer.ts` (17) |
| Child | `card/SwatchHoverMenu.vue` (93) |
| Parent | `demo/palettes/PalettesPane.vue:41-54` |
| Producer | `@mkbabb/glass-ui@7.0.0` (`WatercolorDot`, `Button`, `Input`, `Tooltip*`, `Popover*`) |
| Repo HEAD at audit | `041ca263` (branch `tranche-u`) |
| Dev server probed | `http://localhost:9000` (live) |

Probe scripts committed beside this report: `cpe-challenge-c-probe.mjs`, `…-probe2.mjs`,
`…-probe3.mjs`, `…-probe4.mjs`. Each launches its own isolated Chromium context, seeds
`localStorage`, reaches the pane by the real user path (dock view-select), and prints JSON.
All pasted output below is verbatim from those runs.

## Verdict

**DEFECTIVE — three BLOCKERs.** The component's primary action (*add the current colour to the
palette*) is **dead in the shipped app**: it is not a button, it cannot be clicked, it is not in
the accessibility tree, and its `+` glyph never renders. Every palette swatch is inert by the
same mechanism, and on touch devices the edit/copy/remove menu is unreachable by any means.
Separately, the duplicate-name "Update" affordance **destroys data**: it commits an unvalidated,
never-revalidated target — proven live by reducing a stored 3-colour palette to `colors: []`.

The one test that exercises this component is **RED on HEAD** and **CI never runs it**.

---

## BLOCKER findings

### C-1 · The "Add current color" control is inert — dead primary action

`CurrentPaletteEditor.vue:95-105` renders the add-slot as a `WatercolorDot` with `tag="button"`,
`:aria-label`, `@click="addCurrentColor"`, and a `<Plus>` child. **All four bindings are
discarded by the producer.**

Producer source, `node_modules/@mkbabb/glass-ui/dist/watercolor-dot.js` (glass-ui 7.0.0):

```js
inheritAttrs: !1,
__name: "WatercolorDot",
props: { color: {}, variant: { default: "solid" }, animate: {...}, cycleDuration: {...},
         range: {...}, seed: { default: "" } },          // ← no `tag` prop
setup(e) { … let n = h() /* useAttrs */, c = i(() => n.class), f = i(() => n.style); …
  return (t, n) => (d(), o("span", {                     // ← always a <span>
    "aria-hidden": "true",                               // ← hardcoded
    class: l([c.value, "watercolor-swatch", …]),
    "data-testid": "watercolor-swatch", "data-variant": e.variant,
    style: u([f.value, { …, pointerEvents: "none", … }]) // ← hardcoded
  }, [ /* filter host + optional ghost stroke — NO default slot */ ], 14, C));
}
```

Only `class` and `style` are read off `useAttrs()`. `aria-label`, `onClick`, `tag`, and the
default slot are dropped on the floor.

**Live DOM** (`cpe-challenge-c-probe.mjs`, isolated Chromium 1440×900, 3 seeded colours):

```json
"structure": {
  "dotCount": 4,
  "allSpans": true,
  "allAriaHidden": true,
  "allPointerEventsNone": true,
  "anyAriaLabel": false,
  "anyPlusGlyph": false,
  "focusableInsideWell": [
    { "tag": "INPUT",  "name": "Palette 1",  "rect": { "w": 397, "h": 50 } },
    { "tag": "BUTTON", "name": "<NO NAME>",  "rect": { "w": 33,  "h": 41 } }
  ]
}
```

**A real click cannot land** — Playwright actionability, same run:

```json
"addClick":  "CLICK FAILED: locator.click: Timeout 2500ms exceeded. ~ Call log: ~ waiting for locator('.add-slot-ghost')",
"addByRole": "ROLE LOCATOR FAILED: locator.click: Timeout 2000ms exceeded. ~ Call log:",
"afterAddCount": 4
```

`elementFromPoint` at the slot's visual centre returns the wrapper `DIV`, never the slot
(MCP probe against the live page): `"hitAtCentre": "DIV.", "hitIsGhost": false,
"pointerEvents": "none", "focusable": false, "hasPlusIcon": false`.

**The `+` glyph is absent on screen too** — see the shipped visual-audit captures
`audit/visual/shots/safari-desktop-light/palettes.png` and `…/safari-mobile-dark/palettes.png`:
the "Start a new palette" well shows a bare dashed blob with no plus, no label, no affordance
signal. It is not merely unclickable; it does not *look* like anything.

- **Mechanism**: a producer *decoration* (explicitly documented as "a CSS/SVG primitive",
  `aria-hidden`, `pointer-events:none`) is being used as a *control*. The consumer assumed a
  `tag`/slot/attr-forwarding contract that glass-ui 7.0.0 does not offer.
- **Reproduction**: `node cpe-challenge-c-probe.mjs` (`addClick`, `addByRole`, `structure`).
- **Cure (gestalt, not patch)**: the dot is a face, not a seat. Wrap it — `<Button icon-only
  :aria-label="…" @click="addCurrentColor"><WatercolorDot variant="ghost" … /><Plus/></Button>` —
  so the *control* is the design system's `Button` and the dot is its decoration. There are
  **7 `tag="button"` sites** across `demo/` (`MixSourceSelector.vue:168,215`,
  `GenerateControls.vue:203`, `SwatchHoverMenu.vue:17,32`, this file `:98`); the transposition
  that actually closes the class is a producer-side `WatercolorSwatchButton` primitive in
  glass-ui (edict 4 — variants/primitives belong in glass-ui), consumed everywhere, with the
  dead `tag` prop deleted from all 7 call sites.

### C-2 · Every palette swatch is inert; on touch the action menu is unreachable at all

`SwatchHoverMenu.vue:14-20` (touch/`Popover` path) and `:29-36` (hover path) make the same
mistake: the swatch itself is a `WatercolorDot` with `tag="button"`, `:aria-label`,
`@click.stop`. Same producer, same discard.

**Touch (iPhone 14 emulation, `cpe-challenge-c-probe2.mjs` / `…-probe3.mjs`):**

```json
"touch": { "dotCount": 4, "popoverTriggers": 0, "hitIsTheDot": false,
           "focusables": [ "INPUT:Palette 1", "BUTTON:<NO NAME>" ] },
"mobileTap": "TAP DISPATCHED (forced)",
"mobileAfterTap": { "popoverContent": 0, "floatingPanel": 0, "anyEditCopyRemoveButton": 0 }
```

`popoverTriggers: 0` — reka-ui's `PopoverTrigger as-child` emits *no* trigger attributes,
because `inheritAttrs:false` swallowed them. Even a `force:true` tap on the swatch opens
nothing. **On a touch device there is no route whatsoever to edit, copy, or remove a colour
from the current palette.**

Desktop survives only by accident: the `@pointerenter`/`@pointerleave` handlers sit on the
wrapping `div.relative` (`SwatchHoverMenu.vue:4-5`), which has normal pointer events. Every
handler that was placed *on the dot* is dead; the hover popover works because its handler was
placed *next to* the dot.

- **Mechanism**: identical to C-1 (decoration-as-control).
- **Reproduction**: `node cpe-challenge-c-probe3.mjs` → `mobileAfterTap`.
- **Cure**: as C-1. One producer primitive retires both.

### C-3 · Data loss — `confirmUpdatePalette` commits an unvalidated, never-revalidated target

```ts
// CurrentPaletteEditor.vue:247-249
function saveCurrentPalette() {
    if (savedColorStrings.length === 0) return;      // ← the guard
…
// CurrentPaletteEditor.vue:267-276
function confirmUpdatePalette() {
    const id = duplicateTarget.value?.id;
    if (id == null) return;                          // ← the ONLY guard
    emit("updated", id, colorsFromStrings(savedColorStrings));
```

`duplicateTarget` (`:241`) is set once, when a name collision is detected, and is **never
invalidated** — not when the name changes, not when the buffer empties. `confirmUpdatePalette`
re-reads neither. `updatePalette(id, { colors })` (`usePaletteStore.ts:106`) then assigns
whatever it is handed.

**Path (a) — rename-then-Update overwrites the palette matched by the OLD name.**
`cpe-challenge-c-probe2.mjs`: pre-seed `{id:"pre-existing-id", name:"Dup Test", colors:["#111111"]}`,
type `Dup Test`, Enter → banner. Then change the field to `A Completely Different Name` and press
**Update**:

```json
"bannerStillShown": true,
"afterUpdate": [ { "id": "pre-existing-id", "name": "Dup Test",
                   "colors": [ "oklch(50% 0.1 200deg)", "oklch(90% 0.05 100deg)" ] } ]
```

`#111111` is gone. The user asked for a *new* palette under a *new* name and silently
overwrote an unrelated one.

**Path (b) — empty-the-buffer-then-Update wipes a palette to zero colours.**
`cpe-challenge-c-probe4.mjs`: pre-seed `Victim` with three colours, buffer one colour, type
`Victim`, Enter → banner, then remove the buffered swatch via the hover menu, then **Update**:

```json
"before":  [ { "name": "Victim", "colors": [ "#111111", "#222222", "#333333" ] } ],
"afterRemoveAll": {
  "wellText": "Start a new palette | \"Victim\" already exists. | Update | Cancel",
  "bannerStillShown": true, "swatchCount": 1 },
"after":   [ { "name": "Victim", "colors": [] } ]
```

Note the incoherent state the well renders: the header has already flipped to *"Start a new
palette"* while the banner still offers *"Victim" already exists → Update*. No confirmation,
no undo, no announcement. **Three colours destroyed by two clicks.**

- **Mechanism**: a deferred mutation whose target is captured at detection time and committed
  at click time, with the intervening state never re-checked (a classic TOCTOU on a UI intent).
- **Reproduction**: `node cpe-challenge-c-probe4.mjs`.
- **Cure**: do not store the target. Make the collision a *derived* value —
  `const duplicate = computed(() => savedColorStrings.length ? savedPalettes.find(p => p.name.toLowerCase() === effectiveName.value.toLowerCase()) : undefined)` —
  and gate the confirm on `duplicate.value` at commit time. The banner then disappears the
  instant the name or the buffer stops justifying it, and "Update" is structurally incapable of
  addressing a palette the label does not name. That deletes the `duplicateTarget` ref, the
  manual `= null` resets at `:263`, `:274`, `:163`, and the whole class.

---

## MAJOR findings

### C-4 · `aria-hidden` focus trap — 3 tabbable buttons inside `aria-hidden="true"`

`SwatchHoverMenu.vue:40-48` teleports the hover panel to `<body>` with `aria-hidden="true"`,
and `CurrentPaletteEditor.vue:44-55` fills it with three real `<button>`s. Measured
(`cpe-challenge-c-probe3.mjs`):

```json
"hoverPanelAriaHiddenFocus": { "panelAriaHidden": "true", "focusableCount": 3,
  "labels": [ "Edit color oklch(72% 0.19 25deg)", "Copy color oklch(72% 0.19 25deg)",
              "Remove color oklch(72% 0.19 25deg) from palette" ] },
"tabSequenceFromNameInput": [
  "[in-well] BUTTON:<NO NAME>",
  "[outside] BUTTON:Edit color oklch(72% 0.19 25deg)",
  "[outside] BUTTON:Copy color oklch(72% 0.19 25deg)",
  "[outside] BUTTON:Remove color oklch(72% 0.19 25deg) from palette" ]
```

Focus **does** land inside the hidden subtree. This is axe `aria-hidden-focus` — WCAG 4.1.2
(Name, Role, Value) and 2.4.3 (Focus Order): a screen reader announces nothing while focus sits
on an activatable control. Because the panel is teleported to `<body>`, tabbing out of the
editor also jumps to the end of the document.

The in-file comment asserts the opposite invariant:

> `SwatchHoverMenu.vue:38-39` — *"W5-a11y: hover-only panel is keyboard-inaccessible — hidden
> from AT. The reka-ui Popover (touch path) is the accessible route."*

Both halves are false on HEAD: the panel **is** keyboard-reachable (measured above) and the
touch Popover route is **dead** (C-2). A comment that documents a property the code does not
have is worse than no comment.

- **Cure**: the panel must not exist as a second, invisible copy of the action set. Once C-1/C-2
  give the swatch a real `Button` seat, the *one* reka `Popover` serves hover and touch alike
  (reka `Popover` already supports `trigger="hover"` — `PaletteSlugBar.vue:47` uses exactly
  that in this repo). Delete the `Teleport`, the `floating-panel`, `useHoverPopover`'s manual
  `getBoundingClientRect` positioning, and `useLeaveTimer` with it.

### C-5 · TransitionGroup keys are position-derived → every survivor is destroyed on any mutation

```ts
// useSwatchActions.ts:43-59
let swatchKeyCounter = 0;
const swatchKeyMap = new Map<string, number>();
const swatchKeys = computed(() =>
    savedColorStrings.value.map((color, i) => {
        const mapKey = `${color}::${i}`;                       // ← index in the identity
        if (!swatchKeyMap.has(mapKey)) swatchKeyMap.set(mapKey, swatchKeyCounter++);
        return swatchKeyMap.get(mapKey)!;
    }));
watch(savedColorStrings, () => {
    const validKeys = new Set(savedColorStrings.value.map((c, i) => `${c}::${i}`));
    for (const key of swatchKeyMap.keys()) if (!validKeys.has(key)) swatchKeyMap.delete(key);
});
```

Remove index 0 of `[A,B,C]`: the prune invalidates `A::0`, `B::1`, `C::2` (all three), then the
computed mints **fresh** ids for `B::0`, `C::1`. Every survivor gets a new `:key`, so
`TransitionGroup` tears it down and remounts it.

Measured (`cpe-challenge-c-probe2.mjs` — DOM nodes tagged before the removal, re-read after):

```json
"keyChurn": {
  "before": [ {"tag":"wrap0","color":"oklch(72% 0.19 25deg)"},
              {"tag":"wrap1","color":"oklch(50% 0.1 200deg)"},
              {"tag":"wrap2","color":"oklch(90% 0.05 100deg)"},
              {"tag":"wrap3","color":"oklch(72% 0.19 25deg)"} ],
  "after":  [ {"tag":"<NEW NODE>","color":"oklch(50% 0.1 200deg)"},
              {"tag":"<NEW NODE>","color":"oklch(90% 0.05 100deg)"},
              {"tag":"wrap3","color":"oklch(72% 0.19 25deg)"} ] }
```

Both survivors are new DOM nodes. Only the add-slot (`:key="__add__"`, a literal) survived.
Consequences:

1. `.vj-enter-move` (`demo/styles/animations.css:99`) — the FLIP move transition this
   `TransitionGroup` exists for — **never runs**. Survivors leave-and-enter instead of sliding.
   The animation is authored and paid for, and it is unreachable.
2. Each `WatercolorDot` owns a per-instance SVG `<filter>` id minted with `useId()`, so a
   remount creates a *new* filter graph. Editor filter census (`cpe-challenge-c-probe3.mjs`):
   `"filterCensus": { "inEditor": 4, "pageWide": 10 }` — 4 five-octave `feTurbulence`
   graphs for 3 colours. Removing one colour from an N-swatch palette re-creates N−1 of them.
   The producer's own docblock names this hazard: *"a per-frame `border-radius` write under the
   SVG filter forces the filter graph to RE-RASTERIZE every frame, which flashes Safari"* — the
   consumer defeats the producer's static-filter fix by churning identity instead.
3. The `computed` is **impure**: it mutates `swatchKeyMap` and increments `swatchKeyCounter`
   during evaluation. A computed may be re-evaluated at any time; a key registry must not live
   inside one.

- **Reproduction**: `node cpe-challenge-c-probe2.mjs` → `keyChurn`.
- **Cure**: keys must come from identity, not position. The colour buffer's true home is
  `model.savedColors` (`useColorPipeline.ts:166`); mint a stable id there at insertion and let
  the list carry it. If that is out of reach for this wave, `${color}#${occurrenceIndex}` is
  position-free and survives shifts. Either way the Map, the counter, the prune watcher, and
  the `?? i` fallback at `:31` all disappear.

### C-6 · Nameless save button

```html
<!-- CurrentPaletteEditor.vue:134-142 -->
<Button variant="outline" icon-only class="h-8 w-8 rounded-full …"
        :disabled="savedColorStrings.length === 0" @click="saveCurrentPalette">
    <Check class="w-4 h-4 text-foreground" />
</Button>
```

Measured (`cpe-challenge-c-probe3.mjs`):

```json
"saveButtonAria": { "ariaLabel": null, "title": null, "text": "", "disabled": false },
"saveButtonAccessibleName": ""
```

The repo already knows: `e2e/smoke/flows/palette-save.spec.ts:39-41` — *"the icon-only Save
button next to the Input lacks an aria-label; Enter-on-Input commits via the @keydown.enter
handler"*. The test **routes around the defect instead of failing on it**. The sibling
icon-only `Button` in the same pane does it correctly (`PalettesPane.vue:68`,
`aria-label="Delete all saved palettes"`), so this is an omission at this call site, not a
producer gap.

Also note `:disabled="savedColorStrings.length === 0"` is dead: the whole row is `v-if`'d on
`savedColorStrings.length > 0` at `:118`. A disabled state that cannot be entered.

- **Cure**: `aria-label="Save current palette"` (and delete the dead `:disabled`).

### C-7 · Unlabeled palette-name field

`CurrentPaletteEditor.vue:125-133` — no `aria-label`, no `<label for>`, no wrapping `<label>`:

```json
"inputAccessibleName": { "ariaLabel": null, "labelFor": false,
                         "placeholder": "Palette 1", "wrappedInLabel": false }
```

The only accessible name is a placeholder — a fallback several AT stacks skip, that disappears
on first keystroke, and that here is **dynamic** (`'Palette ' + (savedPaletteCount + 1)`,
`:127-129`), so the field's announced name changes as the saved count changes. WCAG 3.3.2
(Labels or Instructions). The shipped visual audit's own row records this shape:
`REPORT.json`, `/#/palettes` → `smallTapTargets[0] = { "w": 160, "h": 23, "tag": "input",
"label": "" }`.

- **Cure**: `aria-label="Palette name"` (static), placeholder stays the numeric hint.

### C-8 · The duplicate-name refusal is announced to no one

The banner (`:144-167`) appears asynchronously in response to a save attempt and carries no
`role="status"`, no `aria-live`. Measured inside the well:

```json
"duplicate": { "wellText": "Current Palette | 2 colors | dev misconfigured — run `npm run dev` | \"Dup Test\" already exists. | Update | Cancel",
               "liveRegions": 1, "activeElement": "INPUT:Palette 2", "storedCount": 1 }
```

`liveRegions: 1` is `ApiOfflineChip`'s `role="alert"` (`ApiOfflineChip.vue:12`), not the
banner. Focus stays in the input; a screen-reader user presses Enter, hears nothing, and has no
signal that the save was refused. WCAG 4.1.3 (Status Messages).

- **Cure**: `role="status"` on the banner container. (`ApiOfflineChip` is the in-repo pattern to
  copy.)

### C-9 · Vacuous gate — the only test is RED and CI does not run it

- **No unit test exists.** `grep -rln CurrentPaletteEditor` across `test/`, `demo/test/` → zero
  hits; the only code reference outside `demo/` is documentation.
- **The one e2e that exercises it fails on HEAD:**

```
$ npx playwright test e2e/smoke/flows/palette-save.spec.ts --project=smoke --reporter=line
  1) [smoke] › e2e/smoke/flows/palette-save.spec.ts:20:1 › save current palette persists to localStorage 'color-palettes'
    Test timeout of 30000ms exceeded.
    Error: locator.click: Test timeout of 30000ms exceeded.
    Call log:
      - waiting for getByRole('main', { name: 'Color tool panes' }).getByRole('button', { name: /Add current color .* to palette/ }).filter({ visible: true })
      35 |         .getByRole("button", { name: /Add current color .* to palette/ })
      36 |         .filter({ visible: true })
    > 37 |         .click();
  1 failed
```

- **CI never runs Playwright.** `.github/workflows/ci.yml` steps are `npm ci` → `npm run lint`
  → `vue-tsc -p tsconfig.lib.json` → `vue-tsc -p tsconfig.demo.json` → `npm run build` →
  `npm test` → pack/verify; the api job is `tsc --noEmit` + `npm test`. No `playwright`
  reference anywhere in the file. So the single gate that would have caught C-1 has been
  failing, unobserved, since the glass-ui 7 adoption.
- **Typecheck cannot catch it either:**

```
$ npx vue-tsc -p tsconfig.demo.json --noEmit
$ echo $?
0
```

Green, while the file binds `tag`, `aria-label`, `@click`, and a default slot to a component
that has none of them — Vue templates admit unknown component attributes as fallthrough attrs,
so the four dead bindings are invisible to the type system.

**The exact mutation that keeps every gate green:** delete `@click="addCurrentColor"` from
`:102` outright — and, for good measure, delete the entire `addCurrentColor` function from
`useSwatchActions.ts:62-74`. Lint passes, both `vue-tsc` projects pass, `npm test` passes,
`npm run build` passes. Nothing in the repository observes the component's primary action.

- **Cure**: a component test (`@vue/test-utils` under `demo/test/`) that mounts the editor and
  asserts `emitted("addColor")` after activating the add control **by accessible role and
  name** — a test that binds to the contract, not to a CSS class — plus a CI step that runs the
  `smoke` project so the e2e stops being decorative.

### C-10 · The component's entire action set is keyboard-unreachable

From the name input, Tab reaches exactly **one** in-well control — the nameless save button —
and then leaves the editor (`tabSequenceFromNameInput`, C-4). There is no keyboard route to
add, remove, edit, or copy a colour: the swatches are `aria-hidden` spans with no `tabindex`
(`"focusable": false`, C-1), the add-slot likewise, and the action buttons exist only inside a
hover-summoned panel. WCAG 2.1.1 (Keyboard). This is the downstream sum of C-1/C-2/C-4 and is
listed separately because it is the user-visible loss.

---

## MINOR findings

### C-11 · `addCurrentColor` no-ops silently at the domain boundary — in currently-dead code

```ts
// useSwatchActions.ts:62-74
const existingIdx = savedColorStrings.value.indexOf(cssColorOpaque.value);
if (existingIdx !== -1 && savedColorStrings.value.length > 1) { …reorder…; return; }
if (existingIdx !== -1) { return; }                    // ← silent no-op
```

When the current colour is already the *only* entry, the function returns with no state change,
no message, no `aria-live`. The user activates the control and nothing happens — and since C-1
makes the control unactivatable, **the reorder branch (`:63-69`) has never executed in the
shipped app.** Equality is also exact-string (`indexOf`), so `#ff0000` and `rgb(255,0,0)` are
distinct entries; that is a defensible choice for a string buffer, but it is undocumented.

- **Cure**: after C-1 lands, return a discriminated result and surface it in the same
  `role="status"` region C-8 introduces ("already in palette", "moved to end").

### C-12 · `useLeaveTimer` never cancels on scope disposal

```ts
// useLeaveTimer.ts — the whole file
export function useLeaveTimer(delay = 250) {
    let timer = null;
    function schedule(cb) { cancel(); timer = setTimeout(cb, delay); }
    function cancel() { if (timer) { clearTimeout(timer); timer = null; } }
    return { schedule, cancel };
}
```

No `onScopeDispose`/`onUnmounted`. A scheduled 250 ms callback outlives unmount and writes
`openIndex.value = null` on a disposed scope (`useHoverPopover.ts:35`). **Labelled a latent
leak — I did not observe a user-visible break**; the write is harmless today. It is listed
because it is a fact of the source and because a composable that owns a timer owes a
disposal.

- **Cure**: `onScopeDispose(cancel)` inside `useLeaveTimer`, so every caller inherits it.
  (Or delete the composable entirely under C-4's cure.)

### C-13 · Hand-rolled buttons with per-instance style — edicts 4 and 5

Five raw `<button>` elements where the design system provides `Button`:

- `:46`, `:49`, `:52` — each carries the identical 130-character utility string
  `p-1.5 rounded-sm hover:bg-accent active:scale-95 active:bg-accent/70 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40`,
  triplicated verbatim.
- `:75`, `:78` — `btn-interactive p-2 rounded-full bg-foreground/5 hover:bg-accent/50 cursor-pointer`.

Edict 4: variants/primitives belong in glass-ui, and `Button` already exists (this very file
imports it at `:175`). Edict 5: style at the root component level, never per-instance
overrides. The triplication is also the mechanism by which the hover/press/focus register of
these three buttons can silently drift from the rest of the app.

- **Cure**: three `<Button icon-only size="xs">`s; if the swatch-action register genuinely
  differs from the house `Button`, it is a glass-ui variant, not three copies of a class string.

### C-14 · Dead `Tooltip` tree — four components mounted to render nothing

`:88-111` wraps the add-slot in `TooltipProvider` → `Tooltip` → `TooltipTrigger as-child` →
`TooltipContent`. The trigger's attributes are dropped by the same `inheritAttrs:false`
(C-1). Measured after a forced hover (`cpe-challenge-c-probe4.mjs`):

```json
"tooltipOpen": { "tooltipContent": 0,
  "addSlotAttrs": ["data-v-292b9032","data-v-0ce6f2b0","aria-hidden","class","data-testid","data-variant","style"] }
```

No `data-state`, no `id`, no `aria-describedby` — no reka wiring at all. The tooltip can never
open. Four component instances and a `:delay-duration` are pure overhead. (Repo-wide, four
components each instantiate their own `TooltipProvider` with divergent delays — 200 here, 300
at `ConsoleRail.vue:23`. That is a separate, app-level inconsistency.)

- **Cure**: dies with C-1 — once the trigger is a real `Button`, the tooltip works; or delete it,
  since the `aria-label` already carries the same sentence.

### C-15 · The edit-commit affordance is split across two files by an unshared magic number

`:58` gates the edit overlay `hidden lg:flex` — Tailwind `lg` = `min-width:1024px`.
`demo/shell/dock/Dock.vue:71-72` gates the *other* commit path with
`useMediaQuery("(min-width: 1024px)")` and `mobileEditActive = !isDesktop && !!editTarget`,
feeding the dock's `Save edit`/`Cancel edit` controls (`Dock.vue:143-144`) — the same
`commitEdit`/`cancelEdit` emits this component's overlay uses (`:75`, `:78`).

They agree today, so there is **no dead band on HEAD** (verified by reading both). But nothing
enforces the agreement: two literals, two files, no shared token. Move either and every
viewport in the gap strands the user in an edit with no commit and no cancel.

- **Cure**: one exported breakpoint constant/CSS custom media consumed by both, or — better —
  one commit affordance that both surfaces render.

---

## INFO

### C-16 · Import hygiene

`:172` explicitly imports `TransitionGroup` from `vue`, though `<script setup>` resolves
built-ins automatically — proven by the same file's use of `<Transition>` at `:57` **without**
an import. Harmless, but it is a false signal about what the file depends on.
`verbatimModuleSyntax` itself is satisfied throughout (`import type { Palette, PaletteColor }`
at `:190`; `import type { Ref, ShallowRef }` in `useSwatchActions.ts:2`; `import type
{ CSSProperties }` in `SwatchHoverMenu.vue:60`) — **no edict-8 violation found.** Minor
inconsistency: `Input`/`Button`/`Tooltip*` come through the `demo/ui/*` barrels while
`WatercolorDot` is imported directly from `@mkbabb/glass-ui/watercolor-dot` in the same file.

### C-17 · The visual audit structurally cannot see this component's a11y defects

`audit/visual/REPORT.md:97` reports `namelessButtons: 1` for `/#/palettes`. That capture is the
**empty** state — the screenshot shows "Start a new palette" / "No saved palettes yet." — and
the save button (`v-if` at `:118`), the name input, and the duplicate banner **do not render
when the buffer is empty**. So this component contributed **zero** to the audit's counts, while
in the populated state it adds one nameless button (C-6), one unlabeled input (C-7), and (on
hover) three tabbable controls inside `aria-hidden` (C-4). Any future route-level a11y sweep
must seed a non-empty current palette or it will keep certifying an empty well.

---

## Defect families (for the wave that consumes this)

| Family | Mechanism | Findings |
|---|---|---|
| **M1 — decoration used as control** | glass-ui 7 `WatercolorDot` is `inheritAttrs:false`, `aria-hidden`, `pointer-events:none`, slotless, `tag`-less; consumers bind `tag`/`aria-label`/`@click`/children to it | C-1, C-2, C-10, C-14 (and 4 further `tag="button"` sites outside this component) |
| **M2 — deferred mutation on an unrevalidated target** | intent captured at detection, committed at click, never re-checked | C-3, C-11 |
| **M3 — identity derived from position** | list keys computed from `(value, index)` and pruned each tick | C-5 |
| **M4 — accessible name/status omitted at the call site** | producer supports it; the consumer does not pass it | C-6, C-7, C-8 |
| **M5 — gates that do not run or cannot fail** | e2e absent from CI; fallthrough attrs invisible to `vue-tsc`; the spec documents the defect instead of failing on it | C-9, C-17 |

**Single highest-value transposition**: land the glass-ui swatch-*button* primitive (M1). It
converts C-1, C-2, C-10, C-14 and four out-of-scope call sites from four patches into one
producer change, and it turns the currently-decorative `palette-save.spec.ts` back into a live
gate.

---

## What I checked and did NOT find (negative results, recorded)

- **`defineModel` stale-read hazard** — not applicable: no `defineModel` in the component or its
  composables; the name field is a plain local `ref` (`:240`) with `v-model`, read synchronously.
- **`ValueUnit` nesting accumulation** — no `ValueUnit` construction anywhere in this subtree;
  colours are opaque CSS strings end to end.
- **oklch→HSV / `stableHue` drift** — this component never converts; it forwards strings.
- **Ungated `requestAnimationFrame`** — no rAF in the component or its three composables. The
  only rAF is the producer's `useRAFLoop` inside `WatercolorDot`, and `animate` is left at its
  `false` default here, so no loop is started (`"--watercolor-wobble": "none"` in the live DOM).
- **WebGL** — none in this subtree.
- **reka-ui slider pointer-capture leaks** — no sliders here.
- **`parseCssColor` crash class** — this component performs no parsing; malformed strings are
  painted as `background-color` and hashed for the blob seed, both total.
- **Horizontal overflow / dark-class** — `REPORT.md:120,135,150,165` records `overflowX: 0` and
  `darkClassMissing: 0` on `/#/palettes` in all four matrices.
- **`verbatimModuleSyntax`** — satisfied (C-16).
- **Singular/plural copy** — `:21` is correct: `length !== 1 ? "s" : ""`.
- **Breakpoint dead band** — none on HEAD (C-15 is a latent coupling, not a live break).
- **Duplicate DOM ids from the SVG filters** — none: `useId()` mints per-instance ids; live page
  census returned `dupIds: []` across 8 ids.

---

*Probes: `cpe-challenge-c-probe.mjs` (structure / actionability / save), `…-probe2.mjs` (key
churn / duplicate / rename-Update data loss / touch), `…-probe3.mjs` (mobile tap / accessible
names / tab order / filter census), `…-probe4.mjs` (tooltip / empty-Update data loss). All four
run against `http://localhost:9000` in isolated contexts and print the JSON quoted above.*
