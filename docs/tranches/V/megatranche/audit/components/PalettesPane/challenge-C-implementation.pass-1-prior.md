# CHALLENGE-C — `demo/palettes/PalettesPane.vue` · implementation is defective

## Model receipt

I observe myself to be **Opus 5** (exact model id `claude-opus-5[1m]`, the 1M-context
variant). The seat was spawned with an explicit Opus 5 declaration and the served tier
matches it. No inheritance, no undeclared tier.

---

## Subject + substrate

| | |
|---|---|
| Component | `/Users/mkbabb/Programming/value.js/demo/palettes/PalettesPane.vue` (212 lines) |
| Branch / HEAD at audit | `tranche-u` @ `32b4040e` (the task named `c654824e`; HEAD advanced mid-session — no source touched by this seat) |
| Composables read | `usePalettePorts.ts`, `usePaletteStore.ts`, `usePaletteActions.ts`, `useFilteredList.ts`, `usePaletteExport.ts`, `useBrowsePalettes.ts` |
| Children read | `browser/card/PaletteCardGrid.vue`, `browser/card/PaletteCard/PaletteCard.vue`, `.../ActionFeedback.vue`, `.../PaletteCardSwatches.vue`, `shared/ui/PaneHeader.vue`, `color-picker/ErrorBoundary.vue` |
| Live probes | 9 headless-Chromium Playwright runs against `http://localhost:9000` (scripts in the session scratchpad; every number below is pasted from their stdout) |

**Verdict: DEFECTIVE.** Three BLOCKERs (one silent data-corruption, two crash classes),
five MAJORs, four MINORs, three INFOs. The pane's own e2e coverage is two visibility
assertions; every behaviour below is untested and would survive deletion.

---

## D-1 · BLOCKER — a drag inside a filtered view silently reorders the ENTIRE library

**Site.** `PalettesPane.vue:183-197` (the `useSortable` `onEnd`) feeding
`usePaletteStore.ts:153-167` (`reorderPalettes`).

```ts
// PalettesPane.vue:187
onEnd(evt) {
    if (evt.oldIndex == null || evt.newIndex == null) return;
    if (evt.oldIndex === evt.newIndex) return;
    const ids = pm.filteredSaved.value.map((p) => p.id);   // ← the FILTERED ids
    const [moved] = ids.splice(evt.oldIndex, 1);
    if (moved) { ids.splice(evt.newIndex, 0, moved); pm.reorderPalettes(ids); }
}
```

`reorderPalettes` treats `orderedIds` as **the complete new order**: it emits those ids
first, then appends every palette not named in the list (`usePaletteStore.ts:157-166`).
`onEnd` hands it the *search-filtered subset*. So any drag performed while
`pm.searchQuery` is non-empty **hoists every match to the head of the library and pushes
every non-match to the tail** — a total reordering of the user's persisted collection
produced by a gesture that visibly moved two adjacent cards.

**Reproduction — LIVE, headless Chromium against the dev server** (seeded
`localStorage["color-palettes"]`, typed `zed` into the pane's own SearchBar, real
`mouse.down/move/up` drag on the second card's `.drag-handle`):

```
C. store order BEFORE drag: Alpha Beta Gamma Delta Zed-one Zed-two
   visible under q='zed': ["Zed-one3","Zed-two3"]
   drag handles visible: 2
D. store order AFTER  drag: Zed-two Zed-one Alpha Beta Gamma Delta
E. rendered order with q cleared: ["Zed-two3","Zed-one3","Alpha3","Beta3","Gamma3","Delta3"]
```

Four palettes the user never touched moved from positions 1-4 to positions 3-6, and the
result was written through `useStorage` to `localStorage`. There is no undo.

**Pure-function corroboration** (faithful transcription of `reorderPalettes` + `onEnd`,
run under node — proves the mechanism independent of the browser):

```
BEFORE            : alpha beta gamma delta zed-one zed-two
filtered (q='zed'): zed-one zed-two
AFTER  (clear q)  : zed-two zed-one alpha beta gamma delta
```

**Cure (gestalt, not patch).** A drag is a gesture over a *total order*; a filtered list
is a *projection*. The two must not be silently conflated. Either

- the drag affordance is withdrawn while a filter is active (`:draggable="!pm.searchQuery.value"`
  on `PaletteCard`, and `option("disabled", …)` on the sortable) — the honest, KISS answer; or
- `onEnd` translates the projection move into a move in the base order: take the dragged
  id, find its index in `pm.savedPalettes.value`, find the target *neighbour's* index in
  `pm.savedPalettes.value`, splice there, and pass the FULL id list.

The second is the richer feature; the first is the one this codebase's KISS edict wants
until reorder-under-filter is a designed behaviour.

---

## D-2 · BLOCKER — one stored `oklch()` destroys the whole pane on card expand, with ZERO console signal

The pane renders whatever CSS strings are in the store, and expanding a card drives them
through the colour pipeline. The repo's known live `parseCssColor("oklch()")` crash class
(record: mega-tranche R1) is reachable from this pane.

**Reproduction — isolation table, one palette per browser context, click the card once:**

```
label          css                        cardsBefore cardsAfter CRASHED
CONTROL_valid  "#ff0055"                  1           1          false
empty          ""                         1           1          false
oklch_empty    "oklch()"                  1           0          TRUE
garbage        "not-a-color"              1           1          false
rgb_nan        "rgb(NaN,0,0)"             1           1          false
hsl_inf        "hsl(Infinity, 50%, 50%)"  1           1          false
hash           "#"                        1           1          false
zero_colors    []                         1           1          false
```

After the click on the `oklch()` row: `document.querySelector('.palette-card-grid')` is
`null`, `document.body.innerText` collapses from a full pane to

```
"dev misconfigured — run `npm run dev` This panel hit an unexpected error.
 Cannot read properties of undefined (reading 'replace') Try again"
```

…i.e. the entire pane subtree is torn down into `ErrorBoundary.vue`. **`pageerror` count: 0.
`console.error` count: 0** (measured — the boundary's `return false` at
`ErrorBoundary.vue:69` halts propagation before anything logs). The failure is invisible to
every automated signal the visual-audit harness collects.

**Ingress — this is not a synthetic input.** `useBrowsePalettes.ts:122-123`:

```ts
function onSaveRemote(palette: Palette) {
    addPublishedPalette(palette);      // remote server row → local store, unvalidated
}
```

`addPublishedPalette` (`usePaletteStore.ts:121-151`) spreads the remote object straight
into the store. Every colour string in it is server data — untrusted by definition — and
it lands in the exact array `PalettesPane` renders. The store's own deserializer
(`usePaletteStore.ts:21-32`) validates **only** `typeof parsed.version === "number"`.

**Cure.** Two layers, both structural:

1. **Validate at the store boundary, once.** `usePaletteStore`'s serializer `read()` is
   already the single choke point for every local-store ingress; it must reject/repair
   malformed palettes there (shape + per-colour `CSS.supports("color", css)`), not trust
   `typeof version`. `addPublishedPalette` routes through the same validator.
2. **Per-card error isolation.** One bad palette should cost one card, not the pane. The
   repo already owns `ErrorBoundary.vue`; wrapping the *card*, not the pane, converts a
   total loss into a single degraded row. (The library-side `parseCssColor` hardening is
   the parser band's business — R1 — and is out of this seat's scope, but the pane must not
   be a single point of failure for it.)

---

## D-3 · BLOCKER — malformed store shapes crash at boot or on the first keystroke

Same root as D-2 (no shape validation), but these do not even need a colour. Six shapes,
six failures — measured, one browser context each:

```
no_palettes_key    {"version":1}
   → PAGE ERROR "Cannot read properties of undefined (reading 'filter')" · grid never mounts
palettes_object    {"version":1,"palettes":{}}
   → PAGE ERROR "getStore(...).value.palettes.filter is not a function"
palettes_string    {"version":1,"palettes":"oops"}
   → PAGE ERROR "getStore(...).value.palettes.filter is not a function"
palette_no_colors  palette with no `colors` key
   → ErrorBoundary "Cannot read properties of undefined (reading 'length')"
colors_null        palette with `colors: null`
   → ErrorBoundary "Cannot read properties of null (reading 'length')"
name_null          palette with `name: null`
   → renders FINE; the pane dies on the FIRST KEYSTROKE in the SearchBar:
     ErrorBoundary "Cannot read properties of null (reading 'toLowerCase')"
```

The last one is the pane's own predicate, `usePalettePorts.ts:112-114`:

```ts
const filteredSaved = useFilteredList(savedPalettes, searchQuery, (p, q) =>
    p.name.toLowerCase().includes(q) || p.slug.includes(q),
);
```

Note the first three are **page errors**, not boundary catches: `savedPalettes`
(`usePaletteStore.ts:51`) is a module-level computed evaluated during the pane's setup —
outside any boundary's reach. The app does not boot.

**Cure.** Identical to D-2 §1 — the serializer `read()` is the one honest place to make
`PaletteStore` a real type rather than a cast. Validate once; every consumer downstream
then reads a guaranteed shape with no defensive `?.` sprinkled across nine call sites.

---

## D-4 · MAJOR — `cardRefs` retains unmounted component instances, forever, unboundedly

**Site.** `PalettesPane.vue:84` + `:177`.

```ts
const cardRefs = reactive<Record<string, InstanceType<typeof PaletteCard>>>({});
// …
:ref="(el: any) => el && (cardRefs[palette.id] = el)"
```

Vue calls a function ref with `null` on unmount — `node_modules/@vue/runtime-core/dist/runtime-core.cjs.js:1763`:

```js
const value = isUnmount ? null : refValue;
…
if (shared.isFunction(ref)) { callWithErrorHandling(ref, owner, 12, [value, refs]); }
```

The `el &&` short-circuit **discards the null**, so no key is ever deleted. Each retained
value is a `PaletteCard` public instance proxy — it holds `$el`, `setupState`, the
component's effect scope, and its `useLiquidPress` / `useHoverPopover` closures.

**Measured — filter to nothing:**

```
A. after mount, 6 seeded: {"keys":["id-1"…"id-6"],"n":6,"cards":6}
B. search 'zzzznomatch'  : {"keys":["id-1"…"id-6"],"n":6,"cards":0}
```

**Measured — unboundedness** (each round: `onDeleteAllSaved()` then create two palettes
with fresh `crypto.randomUUID()` ids; only ever 2 cards rendered):

```
G0 seeded 2 : {"n":2,"cards":2}
G1 round 1  : {"n":4,"cards":2}
G2 round 2  : {"n":6,"cards":2}
G3 round 3  : {"n":8,"cards":2}
G4 round 4  : {"n":10,"cards":2}
G5 round 5  : {"n":12,"cards":2}
```

Monotonic, linear in palette churn, released only by a page reload.

**Cure.** The whole map is contrivance. The pane needs a ref to exactly one card at a
time — the one being published. Replace the map with the port: move the feedback state
into `usePaletteActions` as `feedbackFor: Ref<{id, message, variant} | null>`, and let
`PaletteCard` render `ActionFeedback` from a prop. That deletes the map, the `as any`
casts, D-5 below, and the imperative `defineExpose({ showFeedback })` in one move — data
down, no instance reaching. If a map must survive, the guard is
`(el) => { if (el) cardRefs[palette.id] = el; else delete cardRefs[palette.id]; }`.

---

## D-5 · MAJOR — publish feedback is silently lost when the card unmounts mid-flight, and it writes to a corpse

**Site.** `PalettesPane.vue:199-209`.

```ts
async function onPublish(palette: Palette) {
    const result = await pm.onPublish(palette);   // network round trip
    const id = palette.id;
    if (id == null) return;
    const card = cardRefs[id];
    if (card) { card.showFeedback(result.message, result.success ? "success" : "error"); }
}
```

Nothing revalidates that `card` is still mounted after the await, and — because of D-4 —
`cardRefs[id]` is *always* truthy, so the `if (card)` guard is a rubber stamp that makes
the code take the "delivered" branch while writing into a dead instance.

**Reproduction, with control** (the port's `onPublish` replaced by a 1200 ms one to model
a real round trip; everything else is the shipped path):

```
CONTROL (card mounted, +1.6s):        ["Published!"]        ← chip renders
RACE  in-flight state: {"retained":true,"isUnmounted":true,…}
RACE  chips after remount (+0.5s):    []                    ← nothing, ever
```

The user filtered their list while a publish was in flight and the "Published!"
confirmation vanished. Same for `"Failed to publish: …"`.

**Cure.** Subsumed by D-4's cure: state that survives an unmount belongs in the port, not
in a child instance the parent pokes. If the imperative shape is kept, the guard must be
`if (card && !card.$.isUnmounted)` — but that is a patch on a design that should not
reach into instances at all.

---

## D-6 · MAJOR — async results are never announced; the pane has no live region

**Measured** (5 palettes seeded, 1440×900):

```
live: []           ← [aria-live], [role=status], [role=alert] inside the pane: NONE
```

`ActionFeedback.vue:4-15` renders the publish/failure chip as a plain `<div>` with no
`role="status"` and no `aria-live`. A screen-reader user publishes a palette and is told
nothing, in either the success or the failure case. WCAG 2.2 **4.1.3 Status Messages (AA)**.

Two supporting defects in the same file:

- `ActionFeedback.vue:37-47` — the 2500 ms auto-dismiss `setTimeout` is never cleared on
  unmount (no `onUnmounted` / `onScopeDispose`; the `watch` only clears on the *next*
  visibility change). A card unmounted while a chip is showing leaves a live timer that
  emits into a dead component.
- The chip is the pane's only feedback channel and it self-destructs in 2.5 s — shorter
  than the WCAG-recommended dismissible/persistent window for a status message.

**Cure.** `role="status"` on the chip (it is exactly a status message), the timer cleared
in `onScopeDispose`, and — once D-4's cure lands — one pane-level status region rather
than one per card.

---

## D-7 · MAJOR — reorder is keyboard-inoperable and its handle is a 16 × 16 target

**Measured** (5 cards rendered):

```
dragHandles: [ {tag:"svg", tabindex:null, role:null, aria:null, w:16, h:16}, ×5 ]
grid tabbables (a[href],button,input,[tabindex]): only the 5 "Palette menu" buttons
menu items: ["Publish","Rename","Export","Delete"]      ← no "Move up"/"Move down"
```

The `GripVertical` handle (`PaletteCard.vue:47-50`) is a bare `<svg>`: not focusable, no
role, no accessible name, driven only by SortableJS pointer events. Reordering — a real,
persisted feature — is therefore reachable **only by mouse or touch drag**:

- WCAG 2.2 **2.1.1 Keyboard (Level A)** — no keyboard operation path exists, and the card
  menu (measured above) offers no alternative.
- WCAG 2.2 **2.5.8 Target Size (Minimum, AA)** — 16 × 16 CSS px against a 24 × 24 floor,
  with no spacing exception (the handle sits 8 px from the card title's click target,
  which starts an inline rename).
- WCAG 2.2 **2.5.7 Dragging Movements (AA)** — a drag with no single-pointer alternative.

**Cure.** The handle becomes a real `<button aria-label="Reorder {name}">` with
`↑`/`↓` (or `Space`-to-lift) keyboard handling driving the same `pm.reorderPalettes`, and
its hit area grows to ≥24 px via padding while the glyph stays 16 px. Both belong in
glass-ui as a `DragHandle` primitive if this pattern recurs — not as a demo-local
one-off.

---

## D-8 · MAJOR — `role="list"` owning `role="article"` children is an invalid ARIA structure

**Measured** (5 cards):

```
gridRole: "list"
gridChildRoles: ["div[role=article]","div[role=article]","div[role=article]",
                 "div[role=article]","div[role=article]"]
cardCount(article): 5      listitem count: 0
```

WAI-ARIA 1.2, `list` role: *"Required Owned Elements: `listitem`."* A `list` whose owned
children are `article` has no items; the count an AT announces is 0, and `listitem`
navigation commands do not work. In the empty state it is worse — the grid's only child is
the EmptyState `div[role=status]` (measured), so a live region is an owned child of a list.

The composition is PalettesPane's: it chooses `PaletteCardGrid` (`role="list"`,
`PaletteCardGrid.vue:3`) as the host and `PaletteCard` (`role="article"`,
`PaletteCard.vue:22`) as the child.

**Cure.** One of the two roles is wrong, and the *card* is the one to change: a saved
palette is an item in a collection, not an independent syndicable composition. `PaletteCard`
becomes `role="listitem"` (keeping its `aria-label`); `PaletteCardGrid` keeps `role="list"`;
the EmptyState moves outside the list element. `article` survives only where a card is
rendered standalone.

---

## D-9 · MINOR — the `useSortable` list argument is a dead snapshot

`PalettesPane.vue:183`:

```ts
useSortable(sortableEl, pm.filteredSaved.value, { … })
```

`pm.filteredSaved` is a `ComputedRef` (`useFilteredList.ts:8`); `.value` is evaluated once
at setup. VueUse's implementation
(`node_modules/@vueuse/integrations/dist/useSortable.js`, v14.3.0):

```js
const defaultOptions = { onUpdate: (e) => { moveArrayElement(list, e.oldIndex, e.newIndex, e); } };
…
const _valueIsRef = isRef(list);
const array = _valueIsRef ? [...toValue(list)] : toValue(list);
```

`isRef` is false, so `moveArrayElement` splices **the computed's cached array in place**.
That array is a fresh `.filter()` result (`usePaletteStore.ts:51`, `useFilteredList.ts:11`)
and is replaced on the next store write, so the mutation is both untracked and detached —
it can never be observed. Reordering happens to work only because the custom `onEnd`
independently calls `pm.reorderPalettes`, and because VueUse's default `onUpdate` reverts
Sortable's DOM move before Vue re-renders.

This is a load-bearing-looking argument that does nothing — precisely the kind of thing
that reads as intentional to the next maintainer and hides D-1.

**Cure.** Pass the ref (`pm.filteredSaved`) or nothing at all, and own the move explicitly
in `onUpdate` (the hook the library actually reserves for it) rather than in `onEnd`.

---

## D-10 · MINOR — per-instance restyle of a design-system Button, contradicted 49 lines later in the same file

`PalettesPane.vue:63-72`:

```html
<Button variant="ghost" icon-only size="xs"
    class="cursor-pointer text-muted-foreground hover:text-destructive
           focus-visible:text-destructive hover:bg-destructive/10"
```

versus `PalettesPane.vue:116`, the confirm button in the same dialog:

```html
<Button tone="destructive">
```

The file demonstrates that the design system already owns a destructive tone, then
hand-rolls a quiet-destructive register in utilities on the other trigger. Owner edicts 4
(glass-ui is the design system) and 5 (style at the root component level, never
per-instance) are both violated by the first, and the second is the in-file proof that the
correct API exists. `cursor-pointer` on a `<Button>` is a further sign the root recipe is
being second-guessed per instance.

**Cure.** A `tone="destructive" emphasis="quiet"` (or equivalent) variant in glass-ui;
zero utilities on this trigger.

---

## D-11 · MINOR — non-idiomatic template refs and three `any` escapes

`PalettesPane.vue:84, 180-181`:

```ts
const sortableGridRef = ref<InstanceType<typeof PaletteCardGrid> | null>(null);
const sortableEl = computed(() => (sortableGridRef.value as any)?.$el as HTMLElement | undefined);
…
:ref="(el: any) => el && (cardRefs[palette.id] = el)"
```

Owner edict 7 asks for Vue 3.5 idioms; `useTemplateRef` is the 3.5 idiom for this exact
shape, and the repo already uses it (`demo/color-picker/ErrorBoundary.vue:39`:
`const alertRef = useTemplateRef<HTMLElement>("alertRef")`). The `as any` exists only
because `$el` is not on the `InstanceType` surface — the honest fix is for
`PaletteCardGrid` to `defineExpose` its root element (or for the pane to hold a plain
element ref on a wrapper), not to cast.

---

## D-12 · MINOR — three dead imports, structurally undetectable by this repo's gates

`PalettesPane.vue:128`:

```ts
import { inject, reactive, ref, computed, watch, onMounted, nextTick } from "vue";
```

`watch`, `onMounted` and `nextTick` appear nowhere else in the file:

```
$ grep -n "watch\|onMounted\|nextTick" demo/palettes/PalettesPane.vue
128:import { inject, reactive, ref, computed, watch, onMounted, nextTick } from "vue";
```

Both gates are blind to it — a **vacuous-gate** finding in its own right:

```
$ npx eslint demo/palettes/PalettesPane.vue
(no output — clean)

$ grep -n "no-unused-vars" eslint.config.js
71:            "@typescript-eslint/no-unused-vars": "off",
81:            "no-unused-vars": "off",
118:            "no-unused-vars": "off",
185:            "@typescript-eslint/no-unused-vars": "off",
186:            "no-unused-vars": "off",

$ grep -n "noUnusedLocals" tsconfig.base.json
(no match)
```

They are the fossil of a removed lifecycle block — exactly the residue owner edict 2
(no legacy) exists to prevent. Type-only imports elsewhere in the file are correctly
`import type` (`:151`), so `verbatimModuleSyntax` is satisfied.

---

## D-13 · INFO — test truth: the pane's coverage is two visibility assertions

Search across `test/` (41 vitest files) and `e2e/` (71 specs):

```
$ grep -rn "Search your palettes\|filteredSaved\|reorderPalettes\|Delete all saved\|showFeedback" test/ e2e/
e2e/smoke/walk.spec.ts:63:  .getByPlaceholder("Search your palettes...")
```

`walk.spec.ts:57-66` is the *entire* PalettesPane gate:

```ts
Palettes: async () => {
    await expect(main.getByRole("heading", { name: "My Palettes" })).toBeVisible();
    await expect(main.getByPlaceholder("Search your palettes...")
        .filter({ visible: true })).toBeVisible();
},
```

`flows/palette-save.spec.ts` exercises `CurrentPaletteEditor` only (asserts
`palettes.length >= 1`); `flows/palette-delete.spec.ts` is a **Browse**-pane spec for a
remote palette. No test drives the saved-card grid, the sortable, the delete-all dialog,
or the publish feedback.

**Mutations that keep the whole suite green** (each is a total feature deletion):

| # | Mutation | Consequence | Suite |
|---|---|---|---|
| M1 | delete `useSortable(...)`, lines 183-197 | drag-reorder gone entirely | GREEN |
| M2 | `pm.reorderPalettes(ids)` → `pm.reorderPalettes([])` | reorder inverts the library | GREEN |
| M3 | `v-for="palette in pm.filteredSaved.value"` → `pm.savedPalettes.value` | the SearchBar becomes decorative (the spec asserts only that it is *visible*) | GREEN |
| M4 | delete the `card.showFeedback(...)` call, line 207 | publish is silent forever | GREEN |
| M5 | delete the whole delete-all `<Dialog>` block, lines 102-122 | destructive confirm gone | GREEN |
| M6 | delete the `:ref` callback, line 84 | D-4 "fixed", D-5 becomes a no-op | GREEN |

Six mutations, six silent survivals. The gate certifies that a heading and a placeholder
render.

---

## D-14 · INFO — the destructive confirm is `role="dialog"` with no `aria-modal`

**Measured:**

```
H dialog open:   {"active":"BUTTON:Cancel","dialogRole":"dialog","ariaModal":null}
I after Escape:  {"active":"BUTTON:Delete all saved palettes","dialogOpen":false}
```

Focus management is **correct** — initial focus lands on Cancel (the safe choice) and
Escape restores focus to the trigger. But the surface is `role="dialog"` with no
`aria-modal="true"`, so AT is not told to constrain virtual-cursor review to it, and an
irreversible bulk delete should be `role="alertdialog"` (its content is exactly an alert +
confirm). This is glass-ui `DialogContent` behaviour, not this file's markup — **BH relay
item** under the standing glass-ui relay edict, with `surface="glass"` +
`:show-close="false"` as the exact call site (`PalettesPane.vue:103`).

---

## D-15 · INFO — the visual REPORT records ZERO contribution from this component, because the capture ran with an empty library

All four `/#/palettes` captures show `bodyTextLength` 237 (desktop) / 169 (mobile) — the
empty-plate state. I attributed every defect the matrix *did* record on that route by
re-running the same probe against a clean profile:

```
smallTapTargets on /#/palettes with an EMPTY library — all 8:
  input 160×23  name:""                 < form < div.dock-face-content < div.dock-crossfade   [DOCK]
  button 22×22  "Switch to slug"        < div.dock-face-content                               [DOCK]
  button 22×22  "Generate new slug"     < div.dock-face-content                               [DOCK]
  button 22×22  "Cancel"                < div.dock-face-content                               [DOCK]
  span   12×24  "L/A/B/ALPHA channel"   < span.glass-slider.channel-slider  ×4                [PICKER]
namelessButtons — the 1:
  button 24×24  .send-btn < div.dock-layer-grid                                               [DOCK]
```

**None of the 8 small targets and none of the 1 nameless button belong to PalettesPane.**
Its actual contribution — **5 × 16 × 16 drag handles, one per saved card** (D-7) — never
appears, because no card was ever rendered. Likewise D-8 (list/article), D-6 (no live
region) and both crash classes are structurally invisible to the matrix: D-2's crash emits
**0 pageErrors and 0 consoleErrors** because `ErrorBoundary` swallows the throw
(`ErrorBoundary.vue:69` `return false`), so a total pane teardown reads as a clean route.

**Cure for the harness, not the component:** the capture matrix must seed a populated
`localStorage["color-palettes"]` for the palettes/browse routes, and must additionally
probe for `.vj-error-boundary` presence — the boundary is the only observable a swallowed
crash leaves behind.

---

## Not defects (negative results, so the next seat does not re-run them)

- **`defineModel` staleness** — the component uses no `defineModel`. `v-model="pm.searchQuery.value"`
  writes a real `ref` through an injected port; no async parent round-trip exists. Clean.
- **`ValueUnit` nesting** — the pane wraps nothing; colours pass through as opaque CSS
  strings. Clean.
- **`stableHue` / oklch→HSV** — not in this pane's path. Clean.
- **Ungated `requestAnimationFrame`** — no rAF in `PalettesPane.vue`, none in
  `PaletteCardGrid.vue`. Clean.
- **WebGL** — none in this pane. The `WebGL: context lost` console error in the REPORT is on
  `/#/` only.
- **`reka-ui` pointer-capture leak** — no slider in this pane.
- **Horizontal overflow** — `overflowX: 0` on all four `/#/palettes` captures; independently
  re-measured at 1440 with 6 cards.
- **`verbatimModuleSyntax`** — satisfied (`import type { Palette }`, `PalettesPane.vue:151`).
- **Focus restoration on the confirm dialog** — measured correct (D-14).
- **Heading accessible name with a populated badge** — the `aria-hidden` badge + `sr-only`
  companion produce `"My Palettes (3 saved)"`; the walk spec's substring match still
  passes. Not brittle.
- **`empty` / zero-colour palette** — a palette with `colors: []` renders without incident
  (measured); `EMPTY_PALETTE_SWATCH` at `PaletteCard.vue:223` covers it.

---

## Severity roll-up

| id | severity | one line |
|---|---|---|
| D-1 | BLOCKER | drag under a search filter silently reorders the whole persisted library |
| D-2 | BLOCKER | one stored `oklch()` tears the pane down on expand, 0 console signal |
| D-3 | BLOCKER | 6 malformed store shapes → page error at boot or death on first keystroke |
| D-4 | MAJOR | `cardRefs` never releases; grows monotonically (2→12 measured) |
| D-5 | MAJOR | publish feedback lost on mid-flight unmount; writes into a retained corpse |
| D-6 | MAJOR | no live region anywhere in the pane (WCAG 4.1.3) |
| D-7 | MAJOR | reorder is mouse-only; 16×16 handle (WCAG 2.1.1 / 2.5.7 / 2.5.8) |
| D-8 | MAJOR | `role="list"` owning `role="article"` — 0 listitems (WAI-ARIA 1.2) |
| D-9 | MINOR | `useSortable` list arg is a detached, unobservable snapshot |
| D-10 | MINOR | per-instance destructive restyle beside `tone="destructive"` in the same file |
| D-11 | MINOR | `ref()`+`as any` instead of `useTemplateRef`; three `any` escapes |
| D-12 | MINOR | 3 dead imports; both lint and tsc are configured not to see them |
| D-13 | INFO | 6 feature-deleting mutations all keep the suite green |
| D-14 | INFO | confirm dialog lacks `aria-modal` / `alertdialog` (glass-ui relay) |
| D-15 | INFO | the visual matrix records zero of this component's defects — empty-library capture |

**Strongest defect: D-1.** It is the only one that silently and irreversibly corrupts user
data through an ordinary, designed gesture, and it is invisible in the UI at the moment it
happens — the user does not see the damage until they clear the search box.
