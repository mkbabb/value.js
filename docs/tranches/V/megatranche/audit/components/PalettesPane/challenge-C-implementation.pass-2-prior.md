# CHALLENGE-C — `demo/palettes/PalettesPane.vue` · implementation is defective (pass 2)

## Model receipt

I observe myself to be **Opus 5** — exact model id `claude-opus-5[1m]`, the 1M-context
variant. The seat was spawned with an explicit Opus 5 declaration and the served tier
matches it. No inheritance, no undeclared tier, no silent downgrade.

---

## Subject · substrate · method

| | |
|---|---|
| Component | `/Users/mkbabb/Programming/value.js/demo/palettes/PalettesPane.vue` (212 lines) |
| Branch / HEAD | `tranche-u` @ `e79fcd43` (the task named `c654824e`; HEAD advanced — **no source touched by this seat**) |
| Prior pass | `challenge-C-implementation.pass-1-prior.md` (preserved verbatim; its D-1..D-15 are re-adjudicated in §"Prior-pass verification") |
| Composables read | `usePalettePorts.ts`, `usePaletteStore.ts`, `usePaletteActions.ts`, `useFilteredList.ts`, `usePaletteExport.ts`, `shell/usePaneRouter.ts`, `color-session/useColorPersistence.ts`, `browser/card/composables/useSwatchActions.ts` |
| Children read | `PaletteCardGrid.vue`, `PaletteCard/PaletteCard.vue`, `CurrentPaletteEditor.vue` |
| Library source read | `@vueuse/integrations@14.3.0` `dist/useSortable.js`, `sortablejs@1.15` `modular/sortable.esm.js`, `@vue/runtime-core` `runtime-core.cjs.js` |
| Live probes | 7 headless-Chromium Playwright runs + 1 jsdom/Vue-3.5.35 unit repro against `http://localhost:9000`; every number below is pasted stdout from a script in the session scratchpad (`PPC-probe1..7.mjs`, `emit-key.mjs`) |
| Screenshots read | `audit/visual/shots/safari-desktop-light/palettes.png`, plus 4 first-hand captures (populated + no-match, desktop + mobile) |

**Verdict: DEFECTIVE.** Two **new BLOCKERs** that the pass-1 seat did not find — one of
which pass-1 explicitly examined and mis-ruled **MINOR** — plus two new MAJORs, and
first-hand confirmation (with my own numbers) of five pass-1 findings. The pane's whole
test surface is **one** grep hit across `test/` + `e2e/` + `demo/test/`.

---

## C-1 · BLOCKER — the FIRST drag-reorder after every page load silently scrambles the entire library

This is the finding pass-1 got wrong. Pass-1 D-9 ruled the `useSortable` list argument a
detached snapshot whose mutation "can never be observed" and concluded "reordering happens
to work". **It is observed, and reordering does not work.** Measured below.

### Mechanism (four sources, all read)

**1. The list argument is the computed's *live cached array*, not a copy.**
`PalettesPane.vue:183`:

```ts
useSortable(sortableEl, pm.filteredSaved.value, { handle: ".drag-handle", … })
```

`pm.filteredSaved` is `ComputedRef<Palette[]>` (`useFilteredList.ts:7`). With an empty
query it returns `items.value` **by identity** (`useFilteredList.ts:10`: `if (!q) return
items.value`), and `items` is `savedPalettes`, itself a computed whose body is a
`.filter()` (`usePaletteStore.ts:51-55`). So at setup time `list` **is** the exact array
object the computed has cached and the template is rendering — an alias, not a snapshot.

**2. VueUse's default `onUpdate` is NOT displaced by the component's `onEnd`.**
`node_modules/@vueuse/integrations/dist/useSortable.js:14-16, 23-26`:

```js
const defaultOptions = { onUpdate: (e) => { moveArrayElement(list, e.oldIndex, e.newIndex, e); } };
…
sortable = new Sortable(target, { ...defaultOptions, ...resetOptions });
```

`resetOptions` carries `handle`/`animation`/`ghostClass`/**`onEnd`** — no `onUpdate`. The
default survives and runs on every reorder.

**3. `moveArrayElement` splices the array IN PLACE and defers the re-insert.**
Same file, `:82-90`:

```js
const _valueIsRef = isRef(list);
const array = _valueIsRef ? [...toValue(list)] : toValue(list);   // ← not a ref ⇒ NO copy
if (to >= 0 && to < array.length) {
    const element = array.splice(from, 1)[0];                     // ← synchronous removal
    nextTick(() => { array.splice(to, 0, element); … });           // ← re-insert one tick later
}
```

**4. SortableJS dispatches `update` BEFORE `end`, synchronously, in one function.**
`node_modules/sortablejs/modular/sortable.esm.js:2002-2008` (`name: 'update'`) then
`:2023-2027` (`name: 'end'`), both inside `_onDrop`.

**Therefore**: by the time `PalettesPane.vue:187`'s `onEnd` runs, the array it re-reads via
`pm.filteredSaved.value` has already had the dragged element **removed** and not yet
re-inserted. `onEnd` then splices *that* n−1 list by the *original* DOM indices:

```ts
const ids = pm.filteredSaved.value.map((p) => p.id);   // ← n−1 ids, dragged one missing
const [moved] = ids.splice(evt.oldIndex, 1);           // ← removes the WRONG palette
ids.splice(evt.newIndex, 0, moved);
pm.reorderPalettes(ids);                               // ← persisted to localStorage
```

and `reorderPalettes` (`usePaletteStore.ts:153-167`) treats the list as the complete new
order, appending the survivor at the tail.

### Reproduction — live, headless Chromium (`PPC-probe1.mjs`, `PPC-probe2.mjs`)

Seed four palettes, load `/#/palettes`, **no search query**, real
`mouse.down/move/up` on card 0's `.drag-handle`, drop on card 2:

```
P1 store BEFORE : Alpha Beta Gamma Delta
P1 render BEFORE: ["Palette: Alpha","Palette: Beta","Palette: Gamma","Palette: Delta"]
P1 handles/cards: 4 4
P1 store AFTER  : Gamma Delta Beta Alpha
P1 render AFTER : ["Palette: Gamma","Palette: Delta","Palette: Beta","Palette: Alpha"]
P1 EXPECTED (drag idx0 -> idx2): Beta Gamma Alpha Delta
P1 pageErrors: 0
```

**All four palettes end in the wrong position.** Hand-derivation from the mechanism
predicts exactly `Gamma Delta Beta Alpha`: `onUpdate` removes `Alpha` →
`[Beta,Gamma,Delta]`; `onEnd` splices index 0 (`Beta`) and re-inserts it at index 2 →
`[Gamma,Delta,Beta]`; `reorderPalettes` appends the unnamed `Alpha`. Measured = predicted.

Independent second instance, six palettes, drag 0→1 (`PPC-probe6.mjs`, probe I):

```
I after warm-up drag: Gamma Beta Delta Zed1 Zed2 Alpha      (from Alpha Beta Gamma Delta Zed1 Zed2)
```

Predicted by the same arithmetic: `[Gamma,Beta,Delta,Zed1,Zed2] + Alpha`. Exact match.

### The control that proves the aliasing is the cause

Break the alias — force one store write before the drag, so `savedPalettes` recomputes a
**new** array while `useSortable` keeps the dead one — and the identical gesture is
**correct** (`PPC-probe1.mjs`, probe 2):

```
P2 store BEFORE : Alpha Beta Gamma Delta Zeta
P2 store AFTER  : Beta Gamma Alpha Delta Zeta
P2 EXPECTED     : Beta Gamma Alpha Delta Zeta       ✔ CORRECT
```

And the same session, three consecutive drags (`PPC-probe2.mjs`, probe A):

```
A t0 : Alpha Beta Gamma Delta
A t1 (1st drag 0->2): Gamma Delta Beta Alpha   expected: Beta Gamma Alpha Delta   ✘ WRONG
A t2 (2nd drag 0->2): Delta Beta Gamma Alpha                                       ✔ correct
A t3 (3rd drag 0->2): Beta Gamma Delta Alpha                                       ✔ correct
```

**This is the heisenbug shape that lets it ship.** The bug fires on the first reorder of
each page load and never again in that session; a developer who drags twice while testing
sees it work. It is silent — 0 page errors, 0 console errors — and it writes through
`useStorage` to `localStorage` with no undo.

### Cure (gestalt, not patch)

`useSortable`'s list parameter is `MaybeRefOrGetter<T[]>` and its contract is *"I own this
list and will move elements in it."* A **derived, read-only projection** can never satisfy
that contract — neither as a value nor as a ref. The honest transposition is to stop
handing Sortable a list at all and own the move explicitly:

```ts
useSortable(sortableEl, [], {                        // no list: Sortable is a gesture source
    handle: ".drag-handle", animation: 150, ghostClass: "opacity-30",
    onUpdate(evt) { /* translate the DOM move into a base-order move; see C-2 */ },
});
```

`onUpdate` is the hook the library reserves for the reorder; `onEnd` is a lifecycle
notification. Doing the work in `onEnd` while leaving `onUpdate` at its default is what
produced two writers to one array.

---

## C-2 · BLOCKER — a drag under an active search filter hoists every match to the head of the persisted library

Same family, independent mechanism, and it survives the C-1 cure. `onEnd` passes
`reorderPalettes` the **filtered** id list; `reorderPalettes` interprets it as the complete
new order and appends every unnamed palette at the tail (`usePaletteStore.ts:157-166`).

**Measured first-hand** (`PPC-probe6.mjs`, probe I — the C-1 alias deliberately broken by a
warm-up drag first, so this isolates the filter bug):

```
I after warm-up drag        : Gamma Beta Delta Zed1 Zed2 Alpha
I visible under q='zed'     : ["Palette: Zed1","Palette: Zed2"]
I store AFTER filtered drag : Zed2 Zed1 Gamma Beta Delta Alpha
```

Swapping two adjacent visible cards moved **four untouched palettes** two places down the
persisted order. Nothing on screen reveals it until the search box is cleared.

**Cure.** A filter is a projection; a drag is a gesture on a total order. Either withdraw
the affordance while `pm.searchQuery.value` is non-empty (KISS, and the honest answer until
reorder-under-filter is a designed behaviour), or translate the projection move into a base
move: locate the dragged id and the target *neighbour* id in `pm.savedPalettes.value`,
splice there, and pass the FULL id list.

---

## C-3 · BLOCKER — `commitEdit` / `cancelEdit` are dead wires; the pane's Save-edit and Cancel-edit buttons do nothing

`PalettesPane.vue:158-161` declares the contract:

```ts
const emit = defineEmits<{ commitEdit: []; cancelEdit: [] }>();
```

fed at `:51-52` from `CurrentPaletteEditor`'s in-pane edit overlay. Its **only** call site
is `demo/shell/usePaneRouter.ts:153-158`, which builds the props in JavaScript with
**kebab-cased handler keys**:

```ts
if (name === "palettes") {
    return {
        savedColorStrings: deps.savedColorStrings(),
        "onCommit-edit": () => deps.colorPickerRef()?.commitEdit(),
        "onCancel-edit": () => deps.colorPickerRef()?.cancelEdit(),
    };
}
```

Vue's emit resolver (`node_modules/@vue/runtime-core/dist/runtime-core.cjs.js:4415-4418`)
tries **exactly two** keys and a third only for `update:*`:

```js
let handler = props[handlerName = toHandlerKey(event)] ||
              props[handlerName = toHandlerKey(camelize(event))];
if (!handler && isModelListener) {                       // isModelListener = event.startsWith("update:")
    handler = props[handlerName = toHandlerKey(hyphenate(event))];
}
```

`toHandlerKey("commitEdit") === toHandlerKey(camelize("commitEdit")) === "onCommitEdit"`.
The supplied key is `"onCommit-edit"`. `"commitEdit".startsWith("update:")` is false, so the
hyphenate fallback is never reached. **No handler is found. The emit is dropped.**

### Proof 1 — jsdom + the repo's own Vue (`emit-key.mjs`)

Subject = kebab key (as shipped); control = `onCommitEdit`. Everything else identical.

```
vue version: 3.5.35
child count: 2
SUBJECT  attrs seen by pane: ["savedColorStrings","onCommit-edit","onCancel-edit"]
CONTROL  attrs seen by pane: ["savedColorStrings"]
log after both clicks: ["HANDLER FIRED (camel key)"]
RESULT: kebab prop key IS DEAD — emit('commitEdit') found no handler
```

Note the subject's handler is visible in `$attrs` — Vue classed it as a **fallthrough
attribute**, not an emit listener.

### Proof 2 — the live app confirms the fallthrough (`PPC-probe3.mjs`)

Instrumented `EventTarget.prototype.addEventListener` before boot and recorded every
registration whose type mentions commit/cancel-edit:

```
E1 addEventListener('commit-edit'/'cancel-edit') registrations: [
 { "type": "commit-edit", "target": "div." },
 { "type": "cancel-edit", "target": "div." }
]
```

Vue attached **DOM listeners for custom events named `commit-edit` / `cancel-edit`** on the
pane's root `div`. Nothing in the codebase ever dispatches such events. Had the props been
resolved as emit handlers, no DOM listener would exist at all.

### Proof 3 — the user-visible failure, with a working control (`PPC-probe4.mjs`)

Seeded `localStorage["color-picker"]` with two saved colours, opened the current-palette
swatch popover, clicked **Edit color …** to enter the edit state, then clicked the pane's
own **Save edit** (`CurrentPaletteEditor.vue:75`, inside `.edit-overlay`):

```
F2 after Edit click:            {"overlays":1,"paneSave":1,"dockSave":1, …}
F3 pane Save-edit count: 1
F4 after PANE Save-edit click:  {"overlays":1,"paneSave":1,"dockSave":1, …}   ← NOTHING HAPPENED
F5 dock Save-edit visible count: 1
F6 after DOCK Save-edit click:  {"overlays":0,"paneSave":0,"dockSave":1, …}   ← edit committed
pageErrors: 0
```

The dock's identical control is wired through a **template** listener
(`demo/color-picker/App.vue:41-42` `@commit-edit="colorPickerRef?.commitEdit()"`, which the
compiler emits as `onCommitEdit`) and works. The pane's button is inert. `Cancel edit`
(`CurrentPaletteEditor.vue:78` → `PalettesPane.vue:52` → `usePaneRouter.ts:157`) is dead by
the identical mechanism.

**This is the repo's own named "dead-control root" failure class** — the phrase appears at
`demo/picker/ColorPicker.vue:240` for a different control. It recurred here undetected.

**Cure.** The composition root must speak the component's contract, not a hand-written
approximation of it. `rightProps` returns `Record<string, unknown>`
(`usePaneRouter.ts:120`) — the type erasure is what allows a listener key that no component
can ever receive. Either type the slot props against the pane's own emits
(`ComponentProps<typeof PalettesPane>`), so `onCommit-edit` fails to compile, or move these
two listeners into the template alongside the ones that already work in `App.vue`. A
`Record<string, unknown>` prop bag across a component boundary is the defect; the kebab keys
are its symptom.

---

## C-4 · MAJOR — `searchQuery` is one app-global ref, and the file's own comment says the opposite

`PalettesPane.vue:28-32`:

```
S.W5-7: the twin placeholder ("Search palettes..." in BOTH side-by-side panes) is
scoped — this one owns YOUR list.
```

It is not scoped. `usePalettePorts.ts:54` mints **one** `searchQuery = ref("")` and hands
the same ref to the library port (`:139`/`:112`), the browse port (`:183`), the admin port
(`:224`) and the colour-name queue (`:69`).

**Measured** (`PPC-probe2.mjs`, probe C) — type into the Palettes pane's SearchBar, then
navigate to `/#/browse`:

```
C /#/browse inputs after typing in Palettes:
[{"ph":"enter slug or token...","v":""},
 {"ph":"Search the commons...","v":"zzzzleak"},
 {"ph":"Search your palettes...","v":"zzzzleak"}]
```

The commons search is now filtering on a string the user typed into their private library,
and vice-versa. Two consequences beyond the confusion: the remote-browse query fires
network work driven by an unrelated pane's keystrokes, and — coupled with **C-2** — a
filter left behind by another pane silently arms the reorder corruption.

**Cure.** The port boundary already exists and is the right shape; the ref is simply shared
across it. Each port owns its own `searchQuery` (`libraryPort.searchQuery`,
`browsePort.searchQuery`, `adminPort.searchQuery` as three distinct refs). The
`searchPlaceholder` computed at `usePalettePorts.ts:104-110` — which switches placeholder
text on `currentView` — is the fossil of the single-search-box era and dies with it. Then
delete the comment: an in-file claim contradicted by the code it annotates is worse than no
comment.

---

## C-5 · MAJOR — a no-match search renders "No saved palettes yet." next to a badge reading "5", with a live Delete-all trigger

`PalettesPane.vue:75-81` conflates two distinct states into one:

```html
<PaletteCardGrid
    :empty="pm.filteredSaved.value.length === 0"
    empty-eyebrow="· empty plate ·"
    empty-text="No saved palettes yet."
    empty-hint="Add colors above, then save the set."
>
```

`filteredSaved.length === 0` is true both when the library is empty **and** when a search
matches nothing. Only the first is "No saved palettes yet."

**Measured** (`PPC-probe2.mjs`, probe B) — 3 palettes stored, `q = "zzzznomatch"`:

```
B no-match: {"gridText":"· EMPTY PLATE · | No saved palettes yet. | Add colors above, then save the set.",
             "deleteAllVisibleCount":1,
             "storeCount":3}
```

**Seen** — first-hand capture `PPC-desktop-nomatch.png`: the header badge reads **5** three
inches above the words **"No saved palettes yet."** The page contradicts itself on screen.

Two riders in the same frame:

- The **Delete all saved palettes** trigger stays live (`PalettesPane.vue:62-73`, gated on
  `pm.savedPalettes.value.length > 0`, not the filtered count) while the plate says there
  are none. Its handler `onDeleteAllSaved` (`usePaletteActions.ts:125-131`) iterates
  `savedPalettes`, not `filteredSaved` — so from a view showing zero cards it destroys all
  five. The dialog does disclose the true count (`PalettesPane.vue:107`), which is the only
  thing standing between this and data loss.
- The hint "Add colors above, then save the set" is actionable advice for the wrong state.

**Cure.** The grid already accepts the copy as props — pass the state's own copy:
`:empty-text='pm.searchQuery.value ? \`No palettes match "${pm.searchQuery.value}"\` : "No saved palettes yet."'`
with a "Clear search" action in the existing `#emptyAction` slot
(`PaletteCardGrid.vue:28-30` — already built, unused here). And gate the delete-all trigger
on the same predicate the grid uses, so a view showing nothing offers to delete nothing.

---

## C-6 · MAJOR — `cardRefs` never releases an unmounted card; growth is linear in palette churn

`PalettesPane.vue:84` and `:177`:

```ts
const cardRefs = reactive<Record<string, InstanceType<typeof PaletteCard>>>({});
// …
:ref="(el: any) => el && (cardRefs[palette.id] = el)"
```

Vue invokes a function ref with `null` on unmount; the `el &&` short-circuit discards it, so
no key is ever removed. Each retained value is a `PaletteCard` public instance proxy holding
`$el`, `setupState`, its effect scope and its `useLiquidPress` / `useHoverPopover` closures.

**Measured first-hand** (`PPC-probe5.mjs` G4, `PPC-probe6.mjs` H — the pane instance reached
through `__vue_app__` and `setupState.cardRefs` read directly):

```
G4 after filtering to 0 cards: {"cards":0,"cardRefKeys":[6]}

H cardRefs churn (only ever 2 cards rendered):
[{"round":0,"cards":2,"refs":2},{"round":1,"cards":2,"refs":4},{"round":2,"cards":2,"refs":6},
 {"round":3,"cards":2,"refs":8},{"round":4,"cards":2,"refs":10},{"round":5,"cards":2,"refs":12}]
```

Monotonic, released only by a page reload. `reactive()` on the map is additionally pointless
— nothing reads it in a render — so it also pays proxy cost for no reactivity.

**Cure.** The map is contrivance: the pane needs a handle to exactly one card at a time, the
one being published. Move the feedback into the port as
`feedbackFor: Ref<{ id, message, variant } | null>` in `usePaletteActions`, and let
`PaletteCard` render `ActionFeedback` from a prop. That deletes the map, both `any` casts,
`PaletteCard`'s imperative `defineExpose({ showFeedback })` (`PaletteCard.vue:244`) and C-7
in one move — data down, no instance-reaching.

---

## C-7 · MAJOR — publish feedback writes into a retained corpse; the `if (card)` guard is a rubber stamp

`PalettesPane.vue:199-209`:

```ts
async function onPublish(palette: Palette) {
    const result = await pm.onPublish(palette);   // network round trip
    const id = palette.id;
    if (id == null) return;
    const card = cardRefs[id];
    if (card) { card.showFeedback(result.message, result.success ? "success" : "error"); }
}
```

Nothing revalidates that the card is still mounted after the `await`, and **because of C-6
`cardRefs[id]` is always truthy** — the guard can never fail, so the code always takes the
"delivered" branch while calling `showFeedback` on a dead instance. If the user filters,
deletes, or reorders during the round trip, the "Published!" (or
`"Failed to publish: …"`) confirmation is lost with no trace. This is the guard whose whole
purpose is to detect that condition, defeated by the leak in C-6.

**Cure.** Subsumed by C-6: state that must survive an unmount belongs in the port, not in a
child instance the parent pokes.

---

## C-8 · MAJOR — one malformed colour string tears down the whole pane, and FOUR forms reach it, with zero console signal

Pass-1 found `oklch()`. It is a class, not an instance. **Measured** (`PPC-probe7.mjs`, one
fresh browser context per row, one palette, one click on the card to expand):

```
CONTROL_valid  before=1 after=1 grid=true  boundary=false pageErr=0 consoleErr=1
oklch_empty    before=1 after=0 grid=false boundary=true  pageErr=0 consoleErr=1
color_empty    before=1 after=0 grid=false boundary=true  pageErr=0 consoleErr=1
lab_empty      before=1 after=0 grid=false boundary=true  pageErr=0 consoleErr=1
rgb_empty      before=1 after=0 grid=false boundary=true  pageErr=0 consoleErr=1
zero_colors    before=1 after=1 grid=true  boundary=false pageErr=0 consoleErr=1
name_null      before=1 after=1 grid=true  boundary=false pageErr=0 consoleErr=1
```

Every empty-argument functional colour form kills the pane: `.palette-card-grid` becomes
`null`, the subtree collapses into `ErrorBoundary`. `consoleErr=1` on **every** row
including the control — that is the pre-existing dev-API error, so the crash contributes
**zero** additional console signal and **zero** page errors. It is invisible to every
automated observable the visual-audit harness collects.

**Ingress is not synthetic.** `useBrowsePalettes.ts` `onSaveRemote` → `addPublishedPalette`
(`usePaletteStore.ts:121-151`) spreads a server row straight into the store; the store's
deserializer (`usePaletteStore.ts:23-31`) validates **only** `typeof parsed.version ===
"number"`.

**Cure.** Two structural layers: validate at the serializer `read()` — the single choke
point for every store ingress — so `PaletteStore` becomes a real type rather than a cast;
and wrap the *card*, not the pane, in the `ErrorBoundary` the repo already owns, so one bad
palette costs one row. (Library-side `parseCssColor` hardening is the parser band's business
— mega-tranche R1 — but the pane must not be a single point of failure for it.)

---

## C-9 · MINOR — reorder is keyboard-inoperable; the handle is a 16 × 16 unnamed `<svg>`

**Measured** (`PPC-probe2.mjs`, probe D, 5 cards, 1600 × 1000):

```
D a11y: {
 "gridRole": "list",
 "childRoles": ["div[role=article]" ×5],
 "listitems": 0,
 "liveRegions": 0,
 "dragHandleFocusable": {"tag":"svg","tabindex":null,"role":null,"aria":null},
 "small": [{"tag":"svg","name":"(none)","w":16,"h":16} ×5],
 "nameless": []
}
```

`PaletteCard.vue:47-50` renders `GripVertical` as a bare `<svg class="drag-handle …">`.
Reordering — a real, persisted feature — is reachable only by mouse or touch drag; the card
menu offers no `Move up` / `Move down`. WCAG 2.2 **2.1.1 Keyboard (A)**, **2.5.7 Dragging
Movements (AA)**, **2.5.8 Target Size Minimum (AA)** (16 px against a 24 px floor).
**This component's entire contribution to the matrix's `smallTapTargets` column is these
five handles — and they never appear there, because the capture ran with an empty library.**

## C-10 · MINOR — `role="list"` owning `role="article"`: zero list items, and a live region owned by a list

Same measurement: `gridRole "list"` (`PaletteCardGrid.vue:3`), five `div[role=article]`
children (`PaletteCard.vue:22`), `listitems: 0`. WAI-ARIA 1.2 makes `listitem` a **required
owned element** of `list`; an AT announces a zero-item list and `listitem` navigation does
nothing. In the empty state the grid's only child is the EmptyState (`PaletteCardGrid.vue:21`),
so a status region becomes an owned child of a list.

**Cure.** The card is the wrong one: a saved palette is an item in a collection, not an
independently syndicable composition. `PaletteCard` → `role="listitem"` (keeping its
`aria-label`); EmptyState moves outside the list element.

## C-11 · MINOR — no live region anywhere in the pane

`liveRegions: 0` (measured above). Publishing is an async, network-backed action whose only
feedback is `ActionFeedback`'s plain `<div>`. A screen-reader user is told nothing on either
success or failure. WCAG 2.2 **4.1.3 Status Messages (AA)**.

## C-12 · MINOR — export failures are swallowed to `console.warn`

`usePaletteExport.ts:24`: `catch (e) { console.warn("Export failed:", e); }`. A user-initiated
action (card menu → Export PNG/SVG/CSS/…) that fails produces **no** user-visible signal —
and this pane has no live region (C-11) to carry one even if it wanted to. The pane already
owns a feedback channel (`showFeedback`, C-7); export does not use it.

## C-13 · MINOR — per-instance restyle of a design-system Button, refuted 49 lines later in the same file

`PalettesPane.vue:63-72`:

```html
<Button variant="ghost" icon-only size="xs"
    class="cursor-pointer text-muted-foreground hover:text-destructive
           focus-visible:text-destructive hover:bg-destructive/10"
```

versus `PalettesPane.vue:116` in the same dialog: `<Button tone="destructive">`. The file
demonstrates that glass-ui already owns a destructive tone, then hand-rolls a
quiet-destructive register in utilities on the other trigger. Owner edicts **4** (glass-ui
is the design system) and **5** (root-level styling, never per-instance) both violated;
`cursor-pointer` on a `<Button>` is a further sign the root recipe is being second-guessed.
Cure: `tone="destructive" emphasis="quiet"` in glass-ui — **BH relay item**.

## C-14 · MINOR — non-idiomatic template refs, three `any` escapes

`PalettesPane.vue:84, 180-181`:

```ts
const sortableGridRef = ref<InstanceType<typeof PaletteCardGrid> | null>(null);
const sortableEl = computed(() => (sortableGridRef.value as any)?.$el as HTMLElement | undefined);
:ref="(el: any) => el && (cardRefs[palette.id] = el)"
```

Owner edict **7** asks for Vue 3.5 idioms; `useTemplateRef` is the 3.5 idiom for exactly
this, and the repo already uses it (`demo/color-picker/ErrorBoundary.vue:39`). The `as any`
exists only because `$el` is off the `InstanceType` surface — the honest fix is for
`PaletteCardGrid` to `defineExpose` its root element, not a cast.

## C-15 · MINOR — three dead imports; both gates are configured not to see them

`PalettesPane.vue:128`. `watch`, `onMounted` and `nextTick` appear nowhere else:

```
$ grep -n "watch\|onMounted\|nextTick" demo/palettes/PalettesPane.vue
128:import { inject, reactive, ref, computed, watch, onMounted, nextTick } from "vue";

$ npx eslint demo/palettes/PalettesPane.vue
(no output — clean, exit 0)

$ grep -n "no-unused-vars" eslint.config.js
71:  "@typescript-eslint/no-unused-vars": "off"
81:  "no-unused-vars": "off"
118: "no-unused-vars": "off"
153: "vue/no-unused-vars": "off"
185: "@typescript-eslint/no-unused-vars": "off"
186: "no-unused-vars": "off"

$ grep -n "noUnusedLocals" tsconfig*.json
(no match)
```

Fossil of a removed lifecycle block — the residue owner edict **2** exists to prevent — and
a **vacuous-gate** finding in its own right: two gates, both switched off for this class.
`verbatimModuleSyntax` itself is satisfied (`import type { Palette }`, `:151`).

## C-16 · INFO — test truth: one grep hit, and six feature-deleting mutations stay green

```
$ grep -rn "reorderPalettes\|filteredSaved\|showFeedback\|Delete all saved\|Search your palettes\|drag-handle\|useSortable" test/ e2e/ demo/test/
e2e/smoke/walk.spec.ts:63:  .getByPlaceholder("Search your palettes...")
```

`walk.spec.ts:57-66` is the entire gate: a heading is visible, a placeholder is visible.
Mutations that keep the whole suite GREEN: delete `useSortable(…)` (`:183-197`) — drag
gone; `pm.reorderPalettes(ids)` → `pm.reorderPalettes([])` — library inverted;
`pm.filteredSaved.value` → `pm.savedPalettes.value` in the `v-for` — the SearchBar becomes
decorative; delete `card.showFeedback(…)` (`:207`) — publish silent forever; delete the
whole delete-all `<Dialog>` (`:102-122`); delete the `:ref` callback (`:84`).
**Six deletions, six silent survivals.** No test would have caught C-1, C-2, C-3, C-5, C-6
or C-7 — and C-1 and C-3 are both shipped-and-broken *today*.

## C-17 · INFO — the confirm dialog is `role="dialog"` with no `aria-modal`; focus handling is correct

**Measured** (`PPC-probe5.mjs`, G2):

```
G2 dialog: {"dialogs":1,"titles":["Delete all saved palettes?"],
            "ariaModal":[null],"roles":["dialog"],"active":"Cancel"}
```

Focus lands on **Cancel** (the safe choice) and Escape restores it to the trigger — correct.
But an irreversible bulk delete should be `role="alertdialog"`, and `aria-modal` is absent so
AT is not told to constrain review. glass-ui `DialogContent` behaviour, not this file's
markup — **BH relay item**, call site `PalettesPane.vue:103` (`surface="glass"`,
`:show-close="false"`).

## C-18 · INFO — `reorderPalettes` is O(n²); ~8 ms at n = 2000

`usePaletteStore.ts:164`: `!orderedIds.includes(p.id)` inside a `for` over all palettes.
Faithful in-page transcription (`PPC-probe6.mjs`, probe J):

```
J reorderPalettes ms by n: {"100":0.1,"500":0.8,"1000":3.7,"2000":8.4}
```

Not a present-tense hazard at realistic library sizes — booked for the OM-16 scalability
ledger, cured by one `new Set(orderedIds)`.

---

## Prior-pass verification (re-adjudication of `challenge-C-implementation.pass-1-prior.md`)

| prior | prior verdict | this pass |
|---|---|---|
| D-9 "`useSortable` list arg is a dead snapshot", **MINOR**, "the mutation … can never be observed", "reordering happens to work" | MINOR | **OVERTURNED → C-1 BLOCKER.** The array is an *alias* of the live computed cache on first drag, `onUpdate` fires *before* `onEnd`, and the corruption is measured (`Alpha Beta Gamma Delta` → `Gamma Delta Beta Alpha`) with a control proving the mechanism. |
| D-1 filtered drag reorders the library | BLOCKER | **CONFIRMED**, re-measured first-hand (C-2). |
| D-2 `oklch()` tears down the pane | BLOCKER | **CONFIRMED and WIDENED** — `color()`, `lab()`, `rgb()` do it too (C-8). |
| D-3 malformed store shapes crash at boot | BLOCKER | Not re-run (out of the drag/emit critical path this pass prioritised). Mechanism re-read and stands: `usePaletteStore.ts:51` is a module-level computed evaluated during setup, outside any boundary. |
| D-4 `cardRefs` unbounded | MAJOR | **CONFIRMED**, own numbers 2→12 (C-6). |
| D-5 publish feedback lost on unmount | MAJOR | **CONFIRMED** by code + C-6 (C-7). |
| D-6 no live region | MAJOR | **CONFIRMED**, `liveRegions: 0` (C-11). |
| D-7 keyboard-inoperable 16×16 handle | MAJOR | **CONFIRMED**, own measurement (C-9). |
| D-8 `list` owning `article` | MAJOR | **CONFIRMED**, own measurement (C-10). |
| D-10..D-15 | MINOR/INFO | **CONFIRMED** (C-13..C-17); D-12's lint blindness re-run and re-pasted. |
| — | — | **NEW**: C-3 (dead `commitEdit`/`cancelEdit`), C-4 (global `searchQuery`), C-5 (false empty state), C-12 (silent export failure), C-18 (O(n²) reorder). |

---

## Not defects (negative results — so no seat re-runs them)

- **`defineModel` staleness** — the component uses no `defineModel`. `v-model="pm.searchQuery.value"`
  writes a real `ref` through an injected port; no async parent round-trip. Clean.
- **`ValueUnit` nesting** — the pane wraps nothing; colours pass through as opaque CSS strings.
- **`stableHue` / oklch→HSV** — not in this pane's path.
- **Ungated `requestAnimationFrame`** — none in `PalettesPane.vue` or `PaletteCardGrid.vue`.
- **WebGL** — none in this pane. The `WebGL: context lost` row in REPORT.md is `/#/` only.
- **reka-ui pointer-capture leak** — no slider in this pane.
- **Double mount in both responsive slots** — hypothesised, **refuted**: `PPC-probe5.mjs` G1 at
  1600 × 1000 measured `{"grids":1,"visibleGrids":1,"searchYourPalettes":1,"deleteAllTriggers":1}`
  and G3 found exactly **1** `PalettesPane` component instance. No duplicate `<Dialog>`, no
  duplicate Sortable.
- **Horizontal overflow** — `docScrollW === clientW` at 1600 and at 390 with a deliberately
  over-long palette name (`PPC-shot.mjs`): `desktop {"docScrollW":1600,"clientW":1600}`,
  `mobile {"docScrollW":390,"clientW":390}`.
- **Zero-colour palette** — renders without incident (`zero_colors` row, C-8 table).
- **Heading accessible name with a populated badge** — measured `"My Palettes6\n(6 saved)"`;
  the Badge is `aria-hidden` so the computed name is `"My Palettes (6 saved)"` and
  `walk.spec.ts`'s substring match still passes. Not brittle.
- **Nameless buttons in this pane** — `nameless: []` measured with 5 cards; the matrix's one
  nameless button is the dock's `.send-btn`, not this component's.
- **`verbatimModuleSyntax`** — satisfied.
- **Focus restoration on the confirm dialog** — measured correct (C-17).

---

## Severity roll-up

| id | severity | one line |
|---|---|---|
| **C-1** | **BLOCKER** | the first drag-reorder after every page load scrambles the whole persisted library (`Alpha Beta Gamma Delta` → `Gamma Delta Beta Alpha`); correct on every later drag |
| **C-2** | **BLOCKER** | a drag under a search filter hoists every match to the head of the library |
| **C-3** | **BLOCKER** | `commitEdit`/`cancelEdit` never reach a handler — the pane's Save-edit and Cancel-edit buttons are inert (dock control proves the contrast) |
| C-4 | MAJOR | `searchQuery` is one app-global ref; the file's comment claims it is pane-scoped |
| C-5 | MAJOR | a no-match search renders "No saved palettes yet." beside a badge reading "5", with a live Delete-all |
| C-6 | MAJOR | `cardRefs` retains unmounted cards forever; 2 → 12 measured with 2 cards rendered |
| C-7 | MAJOR | publish feedback writes into a corpse; the `if (card)` guard can never fail |
| C-8 | MAJOR | four empty-argument colour forms each tear down the pane, with 0 added console/page signal |
| C-9 | MINOR | reorder is mouse-only; 5 × 16 × 16 unnamed handles (WCAG 2.1.1 / 2.5.7 / 2.5.8) |
| C-10 | MINOR | `role="list"` owning `role="article"` — 0 list items |
| C-11 | MINOR | no live region anywhere in the pane (WCAG 4.1.3) |
| C-12 | MINOR | export failures swallowed to `console.warn` |
| C-13 | MINOR | per-instance destructive restyle beside `tone="destructive"` in the same file |
| C-14 | MINOR | `ref()` + `as any` instead of `useTemplateRef`; three `any` escapes |
| C-15 | MINOR | three dead imports; eslint and tsc both configured blind |
| C-16 | INFO | one test grep hit; six feature-deleting mutations all stay green |
| C-17 | INFO | confirm dialog lacks `aria-modal` / `alertdialog` (glass-ui relay) |
| C-18 | INFO | `reorderPalettes` is O(n²) — 8.4 ms at n = 2000 |

**Strongest defect: C-1.** It corrupts persisted user data through the feature's ordinary
designed gesture; it is silent (0 page errors, 0 console errors); it survives manual QA
because it fires only on the *first* drag of each page load; no test can see it; and the one
prior audit that looked directly at the line ruled it harmless. Three of this pane's
features — reorder, reorder-under-filter, and in-pane edit commit — are broken in the
shipped tree right now.
