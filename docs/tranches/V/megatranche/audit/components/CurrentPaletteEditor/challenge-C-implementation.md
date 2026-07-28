# CHALLENGE-C — `CurrentPaletteEditor.vue` is improperly implemented (pass 3)

## Model receipt

I observe myself to be **Opus 5** — exact model id `claude-opus-5[1m]`, the 1M-context variant,
the tier this seat was explicitly declared with. The declaration is honoured; this is not an
inherited or undeclared seat.

---

## Subject, substrate, method

| | |
|---|---|
| Component | `demo/palettes/browser/card/CurrentPaletteEditor.vue` (312 lines, area `palettes`) |
| Composables read | `card/composables/useSwatchActions.ts` (116), `useHoverPopover.ts` (67), `useLeaveTimer.ts` (17) |
| Child read | `card/SwatchHoverMenu.vue` (93), `browser/status/ApiOfflineChip.vue` |
| Parent chain read | `PalettesPane.vue:41-54` → `usePalettePorts.ts` → `usePaletteActions.ts` → `usePaletteStore.ts`; `color-session/useColorPipeline.ts`, `useColorPersistence.ts` |
| Producer | `@mkbabb/glass-ui@7.0.0` (`node_modules/@mkbabb/glass-ui/package.json`), `dist/watercolor-dot.{js,d.ts}` |
| Repo | branch `tranche-u`. Task cited HEAD `c654824e`; the working HEAD is `7775473b`. Verified docs-only delta — `git log --stat c654824e..7775473b` touches no `demo/`, `src/`, `api/`, `test/` or `e2e/` file. |
| Live substrate | `http://localhost:9000` (dev server) |

**Prior passes of this seat are preserved** at `challenge-C-implementation.2026-07-27-pass1.md`
and `challenge-C-implementation.2026-07-28-pass2-prior.md`. This is an **independent
re-derivation**: I read the source before reading either prior, and every number below was
measured by me in this session. My probe scripts and screenshots are kept beside this report at
`probe/probe-{A,B,C,D,E}.mjs`, `probe/*.png` — re-runnable with `node <path>`, all read-only.

A **convergence + delta table against the priors is at the end**; the short version is that the
two BLOCKER families reproduce exactly, and this pass adds one new BLOCKER-adjacent phantom-class
finding (C-5) that neither prior tested, plus a second destructive variant of the stale-latch bug
and two measured identity/metadata losses.

---

## Verdict

**DEFECTIVE — BLOCKER.**

The component does not work. Not "has rough edges" — **the two things it exists to do are inert
in the shipped tree.** You cannot add a colour to the current palette; you cannot edit, copy or
remove a colour already in it. The one path that still functions (type a name → Enter → save)
carries a latched-state bug that **silently overwrites an unrelated stored palette and discards
the name the user typed** — I did it through the shipped UI and diffed `localStorage`. Two of the
component's own CSS class names resolve to **zero rules** in the live document, which is why the
hover action menu renders off-screen and why three buttons have no hover, press or focus register
at all.

Every CI gate is green. `vue-tsc` exits 0. There is no unit test. CI runs **no Playwright**, and
the one e2e spec written for this exact flow is **RED on HEAD** — I ran it.

| id | severity | one line | new this pass |
|---|---|---|---|
| C-1 | BLOCKER | the add-current-colour control is a decorative `<span>` — `tag`/`aria-label`/`@click`/default-slot all silently discarded | — (re-confirmed) |
| C-2 | BLOCKER | every swatch is `aria-hidden` + `pointer-events:none`; keyboard AND touch action paths are dead | — (re-confirmed) |
| C-3 | BLOCKER | latched `duplicateTarget` → `Update` overwrites a *differently named* palette and drops the typed name (measured store diff) | **new variant** |
| C-4 | MAJOR | `.floating-panel` is a phantom class → hover menu renders `position:static` at `y=900` in a 900px viewport, transparent | — (re-confirmed) |
| C-5 | MAJOR | **`.btn-interactive` is also a phantom class** — T.W5 `2f4623e5` deleted working hover/press/focus utilities in favour of a class that has never existed | **NEW** |
| C-6 | MAJOR | 3 focusable buttons inside an `aria-hidden="true"` container (`axe` `aria-hidden-focus`) | — |
| C-7 | MAJOR | the Save button has no accessible name; the repo's own e2e spec documents it in prose instead of failing on it | — |
| C-8 | MAJOR | duplicate-name refusal is silent to AT — no live region, no focus move | — |
| C-9 | MAJOR | `swatchKeys` are index-derived → every key re-mints on any removal or reorder; `TransitionGroup` identity destroyed | — |
| C-10 | MAJOR | `colorsFromStrings` drops `PaletteColor.name` and `.weight`; the update path destroys extraction metadata | **new framing** |
| C-11 | MINOR | `addCurrentColor` identity is a raw string compare — measured `indexOf === -1` for the *same* physical colour across a space change | **new measurement** |
| C-12 | MINOR | `useLeaveTimer` has no `onScopeDispose` | — |
| C-13 | MINOR | three action buttons still carry the exact per-site strays the file's own comment declares retired, incl. a suppressed focus ring | **new framing** |
| C-14 | MINOR | redundant prop pair: `savedPaletteCount` is `savedPalettes.length`, both passed from one expression | — |
| C-15 | INFO | needless + asymmetric `TransitionGroup` import; unused `css` parameter | — |
| C-16 | BLOCKER (gate) | vacuous gate stack: 0 unit tests, `vue-tsc` blind by construction, CI runs no Playwright, `palette-save.spec.ts` RED and unobserved | — |

---

## Root mechanism — one producer contract, three findings

`WatercolorDot` in `@mkbabb/glass-ui@7.0.0` is a **decorative primitive by producer design.**
Its published type surface (`dist/components/watercolor-dot/WatercolorDot.vue.d.ts`) is exactly:

```ts
type __VLS_Props = { color: string; variant?: "solid" | "ghost"; animate?: boolean;
                     cycleDuration?: number; range?: [number, number]; seed?: string };
```

No `tag`. No `as`/`asChild`. The slots parameter of its `DefineComponent` is `{}` — **no default
slot**. The runtime (`dist/watercolor-dot.js`) declares `inheritAttrs: false`, re-applies **only**
`attrs.class` and `attrs.style`, hard-codes `aria-hidden="true"` on a hard-coded `<span>`, writes
`pointerEvents: "none"` into the inline style unconditionally, and renders children
`[filterSvg, ghostStrokeSpan]` — there is **no `renderSlot` call anywhere in the component**.

`CurrentPaletteEditor.vue:95-105` and `SwatchHoverMenu.vue:14-20,29-36` consume it as if it were
an interactive polymorphic element. Of the eight things they pass, glass-ui 7 honours two
(`color`, `class`).

`vue-tsc` cannot see this: an unknown prop is a legal fall-through attr, `aria-label` is a legal
attr, `@click` is a legal listener, and default-slot content against a `{}`-slots component is not
an error. **The typecheck gate is structurally blind to the entire family.**

---

## BLOCKER C-1 — the primary action is not a control

`CurrentPaletteEditor.vue:95-105` mounts the component's reason to exist as a `WatercolorDot` with
`tag="button"`, `:aria-label`, `@click="addCurrentColor"` and a `<Plus>` child.

**Measured live** (`probe/probe-A.mjs`, `/#/palettes`, 1440×900, verbatim stdout):

```json
"addSlot": { "found": true, "tagName": "SPAN", "ariaLabel": null, "ariaHidden": "true",
             "role": null, "tabIndex": -1, "pointerEvents": "none",
             "hasPlusSvg": false, "innerSvgClasses": ["watercolor-filter-host"],
             "rect": { "x": 767, "y": 347.65625, "width": 48, "height": 48 } },
"addButtonByRole": 0,
"anyElementWithAddLabel": [],
"swatchCount": { "before": 7, "after": 7 },
"bodyTextAfterClick": "… My Palettes … Start a new palette … No saved palettes yet. …"
```

`SPAN`, not `BUTTON`. `aria-label` → `null`. `tabIndex: -1`. `pointer-events: none`. No `<Plus>`
— visible in the shipped visual audit itself
(`docs/tranches/V/megatranche/audit/visual/shots/safari-desktop-light/palettes.png`: the add slot
is a bare dashed blob with no `+` glyph). A forced click changes nothing: 7 → 7 swatches, body
text unchanged.

**The repository's own e2e proves it.** `e2e/smoke/flows/palette-save.spec.ts:34-37` targets
exactly this control:

```
$ npx playwright test e2e/smoke/flows/palette-save.spec.ts --project=smoke --reporter=line --workers=1
Running 1 test using 1 worker
  1) [smoke] › e2e/smoke/flows/palette-save.spec.ts:20:1 › save current palette persists to localStorage 'color-palettes'
     Test timeout of 30000ms exceeded.
     Error: locator.click: Test timeout of 30000ms exceeded.
     Call log:
       - waiting for getByRole('main', { name: 'Color tool panes' }).getByRole('button', { name: /Add current color .* to palette/ }).filter({ visible: true })
     > 37 |         .click();
  1 failed
```

**Reproduction** — `node docs/tranches/V/megatranche/audit/components/CurrentPaletteEditor/probe/probe-A.mjs`,
or the playwright command above.

**Cure (transposition, not patch).** The interactive element owns semantics; the dot owns paint.
Stop asking a decorative primitive to be a button:

```vue
<button type="button" class="add-slot-ghost relative …"
        :aria-label="`Add current color ${cssColorOpaque} to palette`" @click="addCurrentColor">
    <WatercolorDot :color="cssColorOpaque" variant="ghost" seed="add-current-slot" class="absolute inset-0" />
    <Plus class="w-5 h-5 text-primary/60 relative" aria-hidden="true" />
</button>
```

No producer change is required — glass-ui's contract is already correct and explicitly documented
in its own `.d.ts` prose. `tag="button"` should be deleted from every `WatercolorDot` site in the
repo, not re-added to the producer.

---

## BLOCKER C-2 — every swatch is inert; edit/copy/remove unreachable by keyboard AND by touch

`SwatchHoverMenu.vue:14-20` (the touch `PopoverTrigger as-child` path) and `:29-36` (the hover
path) both render the swatch as a `WatercolorDot` with `tag="button"`, `:aria-label` and `@click`.

**Measured live with a populated palette** (`probe/probe-B.mjs`, four seeded colours):

```json
"swatches": [
  { "tag": "SPAN", "variant": "solid", "ariaHidden": "true", "ariaLabel": null,
    "tabIndex": -1, "pointerEvents": "none", "hasChildSlotContent": 1 },   // ×4
  { "tag": "SPAN", "variant": "ghost", "ariaHidden": "true", "ariaLabel": null,
    "tabIndex": -1, "pointerEvents": "none", "hasChildSlotContent": 2 }
]
```

**Keyboard reachability inside `.dashed-well` — two stops, total** (`probe/probe-C.mjs`):

```json
"keyboard": [ { "tag": "INPUT", "name": "Palette 2" }, { "tag": "BUTTON", "name": "" } ]
```

Zero swatches, zero of the twelve swatch-action buttons, zero add-slot. A keyboard-only user can
type a name and press a button with no name. That is the entire component.

**Touch matrix** — 390×844, `hasTouch: true`, `isMobile: true`, so `useHoverPopover`'s `canHover`
is `false` and the reka-ui `Popover` is the *only* route to the actions:

```json
"mobile": { "wellVisible": true, "text": "Current Palette\n3 colors\n…",
            "beforeTapPopovers": 0, "afterTapPopovers": 0,
            "swatchDom": { "tag": "SPAN", "ariaHidden": "true", "pointerEvents": "none", "w": 44, "h": 44 } }
```

Tapping opens nothing. `PopoverTrigger as-child` merges its trigger props into `WatercolorDot`'s
attrs, which `inheritAttrs: false` discards, so the trigger never binds. **On touch there is no
path at all to edit, copy or remove a colour from the current palette.**

**Reproduction** — `node .../probe/probe-B.mjs` and `node .../probe/probe-C.mjs`.

**Cure** — C-1's transposition applied to both renders in `SwatchHoverMenu.vue`, plus C-4's
collapse of the two-path fork into one `Popover`.

---

## BLOCKER C-3 — latched `duplicateTarget` overwrites a differently-named palette and discards the typed name

`CurrentPaletteEditor.vue:241` stores the collision as a `ref`; `:247-265` sets it; `:267-276`
acts on it; `:144-167` renders the banner. **Nothing watches `currentPaletteName`.** The latch is
cleared only by an explicit `Cancel` (`:163`) or a completed save/update.

**Measured** (`probe/probe-C.mjs`) — store seeded with one palette
`{ id: "seed-dup-id", name: "Dup", colors: ["#123456"] }`, current palette holding three colours:

| step | observed |
|---|---|
| type `Dup`, press Enter | banner `"Dup" already exists.` + `Update` / `Cancel` |
| `storeBeforeUpdate` | `[{ "id": "seed-dup-id", "name": "Dup", "colors": ["#123456"] }]` |
| rename field to `Brand New Name` | `bannerStillShownAfterRename`: `… "Dup" already exists. Update Cancel` — **unchanged**; `updateBtnVisible: true` |
| click `Update` | `storeAfterUpdate`: `[{ "id": "seed-dup-id", "name": "Dup", "colors": ["rgb(255 0 0)","rgb(0 255 0)","rgb(0 0 255)"] }]` |
| editor after | `"Start a new palette"` — the current buffer is cleared too |

The user asked to save a **new** palette called "Brand New Name". The application instead
overwrote a **different** palette's contents, threw the typed name away, and emptied the source
buffer. No confirmation, no undo. `usePaletteActions.ts:79-81` is
`deps.updatePalette(id, { colors })` — a wholesale array replacement.

(The pass-2 prior measured the *other* destructive outcome of the same latch — `Update` writing
`colors: []` over a stored palette. Same mechanism, two distinct data-loss shapes. Both are real.)

**Reproduction** — `node .../probe/probe-C.mjs`; see `probe/desktop-after-update.png`.

**Cure.** `duplicateTarget` is derived state pretending to be stored state. Delete the `ref`:

```ts
const confirmingSave = ref(false);
const duplicate = computed(() => {
    if (!confirmingSave.value) return null;
    const n = (currentPaletteName.value.trim() || `Palette ${savedPaletteCount + 1}`).toLowerCase();
    return savedPalettes.find(p => p.name.toLowerCase() === n) ?? null;
});
watch(() => currentPaletteName.value, () => { confirmingSave.value = false; });
```

Staleness becomes structurally impossible rather than merely unlikely, and
`confirmUpdatePalette` inherits every precondition (`length > 0`, name match, `id != null`) for
free.

---

## MAJOR C-4 — `.floating-panel` is a phantom class; the hover menu renders off-screen and unstyled

`SwatchHoverMenu.vue:37-51` teleports the action panel to `body` with `class="floating-panel"` and
an inline `top`/`left` computed once from `getBoundingClientRect()` (`useHoverPopover.ts:20-24`,
called inside a `nextTick` at `:30`).

**`.floating-panel` is defined nowhere** — not in `demo/styles/*.css`, not in
`@mkbabb/glass-ui@7.0.0`. Verified by walking every rule of every `document.styleSheets` on the
live page (`probe/probe-D.mjs`):

```json
"rulesFor": { "btn-interactive": { "count": 0, "sample": [] },
              "floating-panel":  { "count": 0, "sample": [] },
              "add-slot-ghost":  { "count": 1, "sample": [".add-slot-ghost[data-v-0ce6f2b0]"] },
              "edit-overlay":    { "count": 1 }, "dashed-well": { "count": 1 } }
```

With no `position`, the inline `top`/`left` are inert. Measured while hovering the first swatch:

```json
"panel": { "position": "static", "display": "flex",
           "rect": { "x": 0, "y": 900, "w": 1440, "h": 40 },
           "docHeight": 940, "viewportH": 900, "inViewport": false }
"floatingPanel": { "parentTag": "BODY", "zIndex": "auto",
                   "background": "rgba(0, 0, 0, 0)", "boxShadow": "none",
                   "inlineStyle": "top: 336.719px; left: 791px;" }
"firstSwatchRect": { "x": 767, "y": 379, "w": 48, "h": 55 }
```

**Anchor drift Δx = 767 px, Δy = 521 px.** The panel is a transparent, shadowless, unlayered
1440×40 full-bleed strip **below the fold** (`inViewport: false`).
`probe/hover-panel-fullpage.png` shows the pencil / copy / trash icons naked in the bottom-left
corner of the document, 900 px from the swatch that summoned them.

Even with `position: fixed` restored the mechanism would still be wrong: the coordinates are
computed once with no `scroll`/`resize` listener, and `left: rect.left + rect.width / 2` has no
viewport clamp, so the panel would detach on the first scroll of `.pane-scroll-fade` and could
overflow either edge.

**Reproduction** — `node .../probe/probe-D.mjs`; `probe/hover-panel-fullpage.png`.

**Cure (architectural).** Delete `useHoverPopover.ts`, `useLeaveTimer.ts`, the `Teleport` branch,
the `floatingStyle` prop and the `canHover` fork entirely. Both pointer classes get the one
glass-ui `Popover` already imported three lines above — it ships floating-ui positioning, the
`glass-floating` surface, focus management and dismissal. `demo/DESIGN.md:99` already names
popovers as a producer-owned CHROME rung. The two hand-rolled paths that "cannot drift"
(`SwatchHoverMenu.vue:64-66`) have drifted into one working and one broken.

---

## MAJOR C-5 — `.btn-interactive` is *also* a phantom class: T.W5 deleted working motion and focus, and replaced it with nothing  ⟵ NEW

`CurrentPaletteEditor.vue:68-74` states the intent in prose:

> the per-site spatial strays (`transition-all` + `hover:scale-110`/`active:scale-95` on the dead
> 150ms bare-utility default — F3) retire onto the producer's `btn-interactive` atom: the scale
> leg rides `--transition-liquid-spatial` @ `--spring-smooth-duration` (inherited, never
> re-implemented), press/hover magnitudes **+ the house focus register** come with it.

**`.btn-interactive` does not exist.**

```
$ grep -rl "btn-interactive" node_modules/@mkbabb/glass-ui/
(no output)
$ grep -rn "btn-interactive" demo/styles/
(no output)
```

Live stylesheet walk (`probe/probe-D.mjs`): `"btn-interactive": { "count": 0, "sample": [] }`.
Eight `.vue` sites use the class; all eight get nothing. The only computed transition on
`.add-slot-ghost` comes from glass-ui's own `.watercolor-swatch`:

```json
"addSlotComputed": { "transitionProperty": "transform, border-radius, filter, box-shadow",
                     "transitionDuration": "0.2s, 0.6s, 0.2s, 0.2s",
                     "transform": "none", "cursor": "pointer" }
```

Git archaeology identifies the exact regression. `git log -S"btn-interactive" -- demo/` yields
`2f4623e5` (`feat(T.W5 · R5+R11)`), whose body reads:

> CurrentPaletteEditor save/cancel/add-slot: `transition-all` + `hover:scale-110`/`active:scale-95`
> per-site utilities → the producer `btn-interactive` atom (scale @ `--spring-smooth-duration` on
> `--transition-liquid-spatial`; house hover/press magnitudes + focus register).

So the commit **deleted working hover, press and focus behaviour** from `:75` (Save edit), `:78`
(Cancel edit) and `:100` (the add slot) and moved it to a destination that was never built. Net
today: those buttons have no hover scale, no press response, and **no focus ring** — the "house
focus register" that "comes with it" measures `count: 0`.

This is a standing-edict-6 violation (*animations are never deleted, only moved or tokenized*)
executed as a move to nowhere, and it is the same `inv-N-7` "never-defined phantom class" failure
that `demo/styles/utils.css:86` records having already been fixed once for `.dashed-well`. The
repo has a name for this bug and shipped it again.

**Reproduction** — `node .../probe/probe-D.mjs`; the two greps above; `git show 2f4623e5`.

**Cure — one decision, not eight patches.** Either glass-ui ships `.btn-interactive` (in which
case the consumer is already correct and this is a producer BH-inbox relay under the standing
glass-ui relay edict), or the class is retired from all eight demo sites in favour of the
utilities it displaced. What must not ship is a class name no stylesheet defines. The
20-line "every template class resolves to ≥1 CSS rule" walk in `probe-D.mjs` kills C-4 and C-5
as a **family**, permanently.

---

## MAJOR C-6 — three focusable buttons inside an `aria-hidden="true"` container

`SwatchHoverMenu.vue:40-50` marks the Teleport panel `aria-hidden="true"` (its comment: *"hover-only
panel is keyboard-inaccessible — hidden from AT"*) while hosting the `#actions` slot's three
`<button>`s from `CurrentPaletteEditor.vue:46-54`. Measured (`probe/probe-B.mjs`):

```json
"floatingPanel": { "ariaHidden": "true", "buttonsInside": 3, "focusableInsideAriaHidden": 3 }
```

That is `axe-core` `aria-hidden-focus` (WCAG 4.1.2). Because the panel is teleported to `body`,
the three controls sit at the very end of the document tab order: a keyboard user tabbing past
the footer lands on three buttons the screen reader refuses to announce, acting on a swatch they
cannot see or identify. The `aria-hidden` is a fig leaf over C-4's broken path, not a fix.

**Cure** — subsumed by C-4. A real `Popover` needs neither the fig leaf nor a second render path.

---

## MAJOR C-7 — the Save button has no accessible name

`CurrentPaletteEditor.vue:134-142` — `<Button variant="outline" icon-only …>` wrapping a bare
`<Check class="w-4 h-4" />`. No `aria-label`, no `title`, no text. Every *other* icon-only button
in this file has one (`:46`, `:49`, `:52`, `:75`, `:78`, `:101`). Measured — the only `<button>`
inside `.dashed-well` once the save row renders (`probe/probe-C.mjs`):

```json
"editorButtons": [ { "name": "", "title": null, "rect": { "width": 32, "height": 40 } } ]
```

The repo already knows. `e2e/smoke/flows/palette-save.spec.ts:40-41`:

> *"the icon-only Save button next to the Input lacks an aria-label; Enter-on-Input commits via
> the `@keydown.enter` handler on the same field"*

The spec routes **around** the defect instead of failing on it. This is the component's
contribution to `audit/visual/REPORT.md:97` (`safari-desktop-light /#/palettes: 1` nameless
button; the same row appears for `safari-desktop-dark` at `:104`).

**Cure** — `aria-label="Save current palette"`. And treat the e2e comment as the smell it is: a
spec that documents a defect in prose has stopped being a gate.

---

## MAJOR C-8 — the duplicate-name refusal is silent to assistive tech

`CurrentPaletteEditor.vue:144-150`. Pressing Enter or Save with a colliding name produces no
announcement: the message is a plain `<span>`, there is no `aria-live`/`role="status"` ancestor,
and focus does not move. Measured (`probe/probe-C.mjs`):

```json
"dupBannerLive": { "found": true, "liveAncestor": null,
                   "focusedAfterSave": "<input … placeholder=\"Palette 2\" type=\"text\" …" }
```

`liveAncestor: null` — the walk from the message up to `<body>` finds no live region. To a screen
reader the save simply does nothing. (The single live region in the editor is `ApiOfflineChip`'s
`role="alert"` — unrelated, and being permanently mounted whenever the palette is non-empty, an
assertive-region anti-pattern in its own right.)

**Cure** — wrap the confirmation row in `role="status"`, and move focus to `Update` when it
appears. It is a decision point, not an aside.

---

## MAJOR C-9 — `swatchKeys` are index-derived, so every key re-mints on any mutation

`useSwatchActions.ts:43-59`. The map key is `` `${color}::${i}` `` — **the index is inside the
identity.** Faithful re-execution of exactly that code (deterministic, no browser):

```
$ node -e '<verbatim re-implementation of useSwatchActions.ts:43-59>'
initial       ["#f00","#0f0","#00f","#ff0"] -> [ 0, 1, 2, 3 ]
after remove0 ["#0f0","#00f","#ff0"]        -> [ 4, 5, 6 ]

initial       ["#f00","#0f0","#00f"]        -> [ 0, 1, 2 ]
after moveEnd ["#0f0","#00f","#f00"]        -> [ 3, 4, 5 ]

after 200 churn cycles: map.size= 5  counter= 1000
```

Removing the *first* of four swatches changes **all three** surviving keys. The move-to-end
reorder `addCurrentColor` performs (`useSwatchActions.ts:64-68`) changes **all three**. The
`<TransitionGroup name="vj-enter">` at `:24-28` therefore never observes a *move* — it observes a
total teardown and remount, so the `.swatch-row > *` FLIP transitions
(`demo/styles/utils.css:173-177`) never play and every survivor replays the enter animation.

Each remount also re-seeds glass-ui's `mulberry32` PRNG and mints a **fresh namespaced SVG
`<filter>` with `feTurbulence numOctaves="5"`** — the most expensive thing on the row, rebuilt N
times for a single-swatch edit, for nothing.

The pre-flush prune at `:54-59` cannot save it: it deletes precisely the entries whose index moved,
guaranteeing a fresh counter value on the next read.

**Cure** — identity must not contain position. Mint an id at *insert* time on the model: give
`ColorModel.savedColors` entries a `crypto.randomUUID()` where they are pushed
(`useColorPipeline.ts:220`) and key the `v-for` on it. That deletes `swatchKeys`, the `Map`, the
counter and the prune watcher — 17 lines of machinery replaced by the field that should have
existed.

---

## MAJOR C-10 — `colorsFromStrings` drops `name` and `weight`; the update path destroys them

`CurrentPaletteEditor.vue:243-245`:

```ts
function colorsFromStrings(colors: string[]): PaletteColor[] {
    return colors.map((css, i) => ({ css, position: i }));
}
```

`PaletteColor` (`demo/palettes/types.ts:1-11`) carries optional `name` and `weight`; the latter is
documented there as *"the quantizer's population share for this swatch … `PaletteColorStrip` sizes
its segments from it"*. `confirmUpdatePalette` (`:272`) feeds this projection straight into
`usePaletteActions.ts:79-81` → `updatePalette(id, { colors })`, a wholesale array replacement.

Updating an extracted palette therefore **erases every per-colour name and every extraction
weight**, silently collapsing its strip to uniform segments. Measured in C-3's store diff: the
target's entire `colors` array — metadata and all — was replaced.

**Cure** — the current buffer is `string[]` and structurally cannot carry metadata. Either merge
by position against the target's existing `colors` on update, or lift the current palette to
`PaletteColor[]` end to end so the lossy projection disappears.

---

## MINOR C-11 — raw-string colour identity: the same colour fails to match across a space change  ⟵ new measurement

`useSwatchActions.ts:63`: `savedColorStrings.value.indexOf(cssColorOpaque.value)`.
`savedColorStrings` serializes each saved colour **in its own space**
(`useColorPipeline.ts:166-168`); `cssColorOpaque` serializes the live colour in the **current**
space (`useColorPipeline.ts:104`). Measured (`probe/probe-E.mjs` — saved reds in rgb, live colour
seeded in oklch; physically the same pure red):

```json
{ "savedColorStrings": ["rgb(255 0 0)", "rgb(0 255 0)"],
  "cssColorOpaque": "oklch(62.8% 0.2577 29.23deg)",
  "indexOfResult": -1 }
```

So after any space switch, both the "already present → move to end" branch (`:64-68`) and the
"already present → no-op" guard (`:70-72`) are unreachable; control falls through to
`emit("addColor")`, which `useColorPipeline.ts:213-217` then silently swallows using a **different**
predicate (`toCSSColorString`, canonical). Two identity functions answer one question, and the
user-visible result of pressing add is "nothing happened, no explanation".

**Cure** — one canonical identity, exported from the pipeline and used in both places.

---

## MINOR C-12 — `useLeaveTimer` leaks its pending timeout across unmount

`useLeaveTimer.ts:1-17` — a closure-local `setTimeout` handle with `schedule`/`cancel` and **no
`onScopeDispose`**. `useHoverPopover.ts:33-36` schedules a 250 ms close on `onLeave`; navigating
away within that window fires the callback against a disposed scope.

**Reproduction — NONE. This is a hypothesis by inspection**; I found no observable symptom (the
callback writes a ref nobody reads). It is nonetheless an unowned timer in a composable that
advertises itself as shared.

**Cure** — `onScopeDispose(cancel)`, or delete the composable under C-4.

---

## MINOR C-13 — the three action buttons still carry the exact strays the file says were retired, including a suppressed focus ring

`CurrentPaletteEditor.vue:46`, `:49`, `:52` — three byte-identical class strings:

```
p-1.5 rounded-sm hover:bg-accent active:scale-95 active:bg-accent/70 transition-colors
cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40
```

`active:scale-95` + `transition-colors` is precisely the "per-site spatial stray" the comment at
`:68-74` declares retired; T.W5's retirement reached 3 of the 6 buttons in this file (and, per
C-5, retired them to nowhere). Worse, `focus-visible:outline-none` **suppresses the root focus
ring** and substitutes a bespoke one — the same regression this file's own S.W5-3 comment
(`:121-124`) calls out by name as *"SUPPRESSED focus ring — an a11y regression"* when describing
what was removed from the `Input`. Standing edict 5 (root-level styling, never per-instance
overrides) violated three times in seven lines. Separately these are raw `<button>` elements
while the design-system `Button` is imported and used 80 lines below.

**Cure** — one `<Button variant="ghost" size="icon">` per action; the focus register comes from
the root component; zero per-instance classes.

---

## MINOR C-14 — redundant prop pair

`CurrentPaletteEditor.vue:196-202` declares both `savedPaletteCount: number` and
`savedPalettes: Palette[]`. `PalettesPane.vue:44-45` passes both from the same expression:

```vue
:saved-palette-count="pm.savedPalettes.value.length"
:saved-palettes="pm.savedPalettes.value"
```

Two props, one truth, an invariant nothing enforces. Edict 3 (KISS, no contrivance).
**Cure** — delete `savedPaletteCount`; read `savedPalettes.length`.

---

## INFO C-15 — needless import, unused parameter

`CurrentPaletteEditor.vue:172` imports `TransitionGroup` from `vue`. Built-in components are
resolved by the SFC compiler, so the import is unnecessary — and asymmetric, since `Transition`
(used at `:57`) is not imported. `verbatimModuleSyntax` itself is **satisfied**: `:190` correctly
uses `import type` for `Palette`/`PaletteColor`, and no other type-only import exists.

`useSwatchActions.ts:90` — `onCurrentSwatchRemove(css: string, index: number)` never reads `css`;
the call site (`:52`) passes it anyway.

---

## BLOCKER C-16 (gate) — test truth: the gate stack is vacuous, and demonstrably so

| gate | status at HEAD | why it cannot see C-1 … C-11 |
|---|---|---|
| `vitest` (`npm test`) | GREEN | `vitest.config.ts:21` includes only `test/**/*.ts` + `demo/test/**/*.ts`. `grep -rn "CurrentPaletteEditor\|swatchKeys\|duplicateTarget\|saveCurrentPalette\|useSwatchActions" demo/test test` → **0 hits**. No test of this component or any of its three composables exists. |
| `vue-tsc -p tsconfig.demo.json --noEmit` | **exit 0, zero output** (I ran it at HEAD) | Unknown props (`tag`), extra attrs (`aria-label`) and listeners (`@click`) are legal fall-through by Vue's type contract; default-slot content against a `{}`-slots component is not an error. The whole C-1/C-2 family is invisible by construction. |
| `.github/workflows/ci.yml` | GREEN | `grep -rn "playwright" .github/workflows/*.yml` → **no hits**. CI runs `lint`, `vue-tsc` ×2, `build`, `npm test`, then api `tsc` + `test`. **Playwright is never invoked.** |
| `e2e/smoke/flows/palette-save.spec.ts` | **RED** | fails at `:37` on the C-1 blocker — and nothing runs it. |

**The exact mutation that keeps every gate green is: the shipped code.** That is the definition of
a vacuous gate. The tree is broken in precisely the flow a spec was written for; the spec is red;
no gate reports it.

**Cure.**
1. Wire the existing Playwright smoke suite into `ci.yml` as a **hard** step. It already catches
   C-1 today with zero new assertions.
2. Add a mount-level vitest for this component asserting the three role queries the flow depends
   on — `getByRole("button", { name: /Add current color/ })`,
   `getByRole("button", { name: /Save current palette/ })`, and a per-swatch
   `getByRole("button", { name: /Color swatch/ })`. Each fails on HEAD.
3. Add the "every template class resolves to ≥1 CSS rule" walk from `probe-D.mjs` (20 lines).
   It kills C-4 and C-5 as a family and would have caught `.dashed-well`'s `inv-N-7` ancestor.

---

## Checked and clean (the negative, proved)

- **`defineModel` stale-read hazard** — absent. The component uses `defineProps` + `defineEmits`
  and never `defineModel`; `currentPaletteName` is a plain local `ref` (`:240`). The Vue 3.5
  reactive props destructure at `:196-202` and the two `toRef(() => …)` getters at `:234-235` are
  correct and preserve reactivity into the composable.
- **PRM-RAF epidemic** — no `requestAnimationFrame` in the component or any of its three
  composables. `WatercolorDot` is mounted **without** `animate`, so glass-ui's `useRAFLoop` never
  starts; when enabled it is `pauseWhenHidden: true, respectReducedMotion: true`
  (`dist/watercolor-dot.js`).
- **`ValueUnit` nesting accumulation** — the component never touches `ValueUnit`; it handles
  pre-serialized CSS strings only.
- **oklch→HSV hue drift / `stableHue`** — no hue math on this path.
- **reka-ui slider pointer-capture leak** — no sliders.
- **WebGL** — none in this subtree.
- **`parseCssColor` crash class** — the component performs **no parsing**. Colours arrive as
  strings and are interpolated into `aria-label` and `background-color` only; malformed input
  degrades to an unpainted dot, never a throw. `savedColorStrings.length === 0`, a whitespace-only
  name (`:249-250`, `.trim() || default`) and `id == null` (`:270-271`) are all guarded.
  `/#/palettes` shows **0 pageErrors and 0 consoleErrors** across all four Safari matrices
  (`audit/visual/REPORT.json`); the only console error in my probes is the environmental
  `VITE_API_URL` dev-config notice.
- **Horizontal overflow** — `REPORT.md:120,135,150,165`: `overflowX = 0` on `/#/palettes` in all
  four matrices. The `flex-wrap` swatch row is correct.
- **`verbatimModuleSyntax`** — satisfied (`:190`).
- **`useBreakpoint` subscription** — glass-ui `dist/dom.js` registers `onScopeDispose`; not leaked.
- **`useLeaveTimer.schedule` cancels before re-arming** (`:5`), so rapid hover in/out cannot stack
  timers — only the unmount case (C-12) is unhandled.
- **Mobile edit-commit is NOT a gap.** The `hidden lg:flex` on `.edit-overlay` (`:58`) looked like
  a missing affordance below 1024 px, but `demo/shell/dock/Dock.vue:143-144` provides labelled
  `Save edit` / `Cancel edit` DockControls on the same emits. Duplicated affordance, not a hole.
- **The store layer is honest.** `usePaletteStore` is one lazy module singleton with a defensive
  `serializer.read` (`try` / `JSON.parse` / version check) and a type-predicate narrowing of `id`.
  All corruption in C-3/C-10 originates above it.
- **`writeClipboard` is correctly `void`-ed** (`useSwatchActions.ts:87`); no unhandled rejection.

---

## Defect families (for the ledger)

| family | findings | one cure |
|---|---|---|
| **F-a · producer-API drift, typecheck-invisible** | C-1, C-2 | the interactive element owns semantics, `WatercolorDot` owns paint; add role-query assertions so the class cannot recur silently. |
| **F-b · phantom CSS class** | C-4, **C-5** | "every template class resolves to ≥1 rule" walk (20 lines, already written in `probe-D.mjs`). |
| **F-c · latched state that outlives its premise** | C-3, C-11 | derive, do not latch. |
| **F-d · lossy projection at a layer boundary** | C-9, C-10 | carry identity and metadata on the model; never re-derive from position or from a display string. |
| **F-e · duplicated interaction paths** | C-2, C-4, C-6 | one `Popover`; delete `useHoverPopover` + `useLeaveTimer` + the `canHover` fork. |
| **F-f · per-instance override of a root register** | C-13, C-5 | design-system `Button`; never `focus-visible:outline-none`. |

## Convergence + delta against the prior passes

| prior finding | this pass |
|---|---|
| pass-1/2 C-1 (add control inert) | **independently reproduced** with my own DOM dump + the playwright run |
| pass-1/2 C-2 (swatches inert) | **independently reproduced**; extended with the measured 2-stop keyboard tab set and the 0-popover touch result |
| pass-2 C-3 (`.floating-panel` phantom) | **independently reproduced**; extended with the Δx/Δy anchor drift and the full-page screenshot |
| pass-2 C-4 (`Update` writes `colors: []`) | **same latch, second destructive shape measured** — a *non-empty* overwrite of a differently-named palette with the typed name discarded (my C-3) |
| pass-2 C-6 (`swatchKeys`) | reproduced with the deterministic simulation + the `feTurbulence` remount cost |
| pass-2 C-8 (nameless save) | reproduced |
| pass-2 C-14 (vacuous gates) | reproduced; extended with the exact `ci.yml` grep and the verbatim RED playwright run |
| — | **NEW C-5**: `.btn-interactive` is a second phantom class; `git show 2f4623e5` proves working motion + focus were deleted for it |
| — | **NEW C-10 framing**: `colorsFromStrings` metadata destruction on the update path |
| — | **NEW C-11 measurement**: `indexOf === -1` for the same physical colour across a space change |
| pass-2 C-5 (stale `colorIndex` phantom duplicate), C-7 (default-name collision), C-9 (dead code), C-12 (202 mutation records), C-13 (`role=alert` re-announce) | **not re-tested this pass** — carried forward from the prior, which remains at `challenge-C-implementation.2026-07-28-pass2-prior.md`. I neither confirm nor dispute them here. |

## Strongest single defect

**C-1.** Measured, reproducible in one command, and it has already turned the repository's own
`palette-save` smoke spec **red on HEAD** without anyone noticing, because CI runs no Playwright.
It is the entire reason the component exists, and it does not work.
