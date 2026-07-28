# CHALLENGE-D — `demo/palettes/PalettesPane.vue` — the design is flawed

## Model receipt

I observe myself to be **Opus 5 (1M context)**, exact model id `claude-opus-5[1m]`. The seat was
spawned with an explicit Opus 5 declaration; this is a declared seat, not an inherited one.

---

## 0. Verdict

**DEFECTIVE.** Seven BLOCKER-grade design defects, ten MAJOR, three MINOR, one evidence gap.

The single most damning result is not a proportion or a colour: **drag-to-reorder — the one
gesture this component adds over a plain list — is doubly applied. One drag permutes every row in
the library, lands on a position the user never dropped on, and then loses the whole result on
reload.** It is deterministic and reproduced below four times.

Behind it sits the real architectural fault: `PalettesPane` is composed as a *page* wrapped in a
`Card`, holding a *filtered projection* it mistakes for the collection, hosting an *omnibus card*
that the tranche canon forbids by name, with **no operation-state surface at all** — no pending, no
error, no recovery. Every one of those is a named clause in `VISUAL-CONSTITUTION.md`,
`PROPORTION-AUDIT.md` or `PALETTE-CONTRACT.md` that this file violates in the shipped tree.

Subject: `demo/palettes/PalettesPane.vue` (212 lines), branch `tranche-u`, HEAD `c654824e`.

---

## 1. Method and evidence base

| Source | What it gave |
|---|---|
| `docs/tranches/V/megatranche/audit/visual/shots/safari-{desktop,mobile}-{light,dark}/palettes.png` | the four tracked Safari captures, read as images |
| pixel sampling of those PNGs (OKLab conversion) | the dark-mode ramp collapse, §4 |
| live WebKit probe vs `http://localhost:9000`, 1440/720/390/360/320, light+dark, PRM, forced-colors, RTL, seeded + empty store | every measured rect, computed style, token value, tab order, ARIA attribute |
| real mouse drag against the live sortable, seeded 5-palette store, ×4 runs incl. reload | §3, the reorder reproduction |
| `PROPORTION-AUDIT.md`, `VISUAL-CONSTITUTION.md`, `PALETTE-CONTRACT.md` | the binding law quoted verbatim per finding |

Probe scripts (re-runnable):
`/private/tmp/claude-504/-Users-mkbabb-Programming-value-js/6614e90c-8bd6-434f-b017-5ad4277c6e5e/scratchpad/pp-challenge-D-probe.mjs`,
`…/pp-D-drag.mjs`, `…/pp-D-drag2.mjs`, `…/pp-D-mat.mjs`.

Every number below is measured. Where I could not reach a reproduction I say **HYPOTHESIS**.

---

## 2. Visual truth first

### 2.1 Desktop, light and dark — `shots/safari-desktop-{light,dark}/palettes.png`

The route paints two equal cards side by side: a Picker on the left, `PalettesPane` on the right.
The Library — the protagonist of its own route — is exactly the same size as a tool that is not
part of its composition. In the empty state (the tracked capture) the right half of a 1440px
viewport is occupied by the words *"No saved palettes yet."*

Three shadow species stack inside that one 512px lane, and their light sources disagree. Crop
(`D-shadow-crop.png`, from the live 1440 light capture):

- the pane plate casts **right-and-down** (`8px 8px 0`, the dark bar on the right edge);
- every palette card casts **left-and-down** (`-3px 3px 0, -5px 5px 0, -7px 7px 0`);
- the "Start a new palette" `.dashed-well` casts **left-and-down** (`-2px 2px 0, -3px 3px 0, -4px 4px 0`).

That is seven zero-blur hard casts in one column, lit from two opposite directions, ~30 CSS px
apart. It is not a style choice; it is an unresolved collision between two shadow vocabularies.

The delete-all trash glyph floats alone in its own layout band above the first card, right-aligned,
with ~430px of empty gutter to its left. An entire row of the vertical rhythm exists to carry one
28px ghost icon.

### 2.2 Mobile, light and dark — `shots/safari-mobile-{light,dark}/palettes.png`

The empty tray dominates the pane: dot trio, a letterspaced mono eyebrow, a 25.9px Fraunces line
and a full-width monospace hint. The *hint* — help prose — is the widest ink on the pane and is set
in Fira Code. The state that means "you have nothing" is typographically the loudest thing on the
screen after the title.

### 2.3 The dark-mode treatment

The `Palettes` letterforms are the product's signature. **In dark they are white.** See §4.

---

## 3. BLOCKER D-1 — one drag permutes the entire library, and the result does not survive reload

### Law

`VISUAL-CONSTITUTION.md §5.2`, *vertical list/review reorder*: "after Space grabs, Down=next
ordinal, Up=previous … every move announces item and `position of total`; Space drops, Escape
cancels." And: "Pointer drag, arrow movement, and numeric entry must resolve to the same model
value or ordinal."

### Mechanism

`PalettesPane.vue:183-197`

```ts
useSortable(sortableEl, pm.filteredSaved.value, {
    handle: ".drag-handle",
    animation: 150,
    ghostClass: "opacity-30",
    onEnd(evt) {
        …
        const ids = pm.filteredSaved.value.map((p) => p.id);
        const [moved] = ids.splice(evt.oldIndex, 1);
        if (moved) { ids.splice(evt.newIndex, 0, moved); pm.reorderPalettes(ids); }
    },
});
```

`node_modules/@vueuse/integrations/dist/useSortable.js:14-16`

```js
const defaultOptions = { onUpdate: (e) => {
    moveArrayElement(list, e.oldIndex, e.newIndex, e);
} };
```

The component supplies `onEnd` but **not** `onUpdate`, so the vendor default survives. Two
authorities now apply the same gesture to the same data:

1. `moveArrayElement` splices the array it was handed. It was handed
   `pm.filteredSaved.value` — a **plain array evaluated once at setup**. With an empty query
   `useFilteredList` returns `items.value` unchanged (`useFilteredList.ts:10`), i.e. the very array
   instance the `savedPalettes` computed cached (`usePaletteStore.ts:51-55`). The vendor mutates a
   computed's cache in place.
2. `onEnd` then reads `pm.filteredSaved.value` — already mutated by (1) — and applies the move a
   **second** time before calling `reorderPalettes`.

### Reproduction (measured, deterministic, WebKit, 1440×1200, seeded 5 palettes)

Seed order: `Alpha, Bravo, Charlie, Zulu One, Zulu Two`.

| Gesture | DOM after | localStorage after | after reload |
|---|---|---|---|
| drag row 0 → row 1, run 1 | `Charlie, Bravo, Zulu One, Zulu Two, Alpha` | same | `Alpha, Bravo, Charlie, Zulu One, Zulu Two` |
| drag row 0 → row 1, run 2 | `Charlie, Bravo, Zulu One, Zulu Two, Alpha` | same | `Alpha, Bravo, Charlie, Zulu One, Zulu Two` |
| drag row 0 → row 2 | `Charlie, Zulu One, Bravo, Zulu Two, Alpha` | same | `Alpha, Bravo, Charlie, Zulu One, Zulu Two` |

The smallest possible move — swap the top two rows — sends `Alpha` from position 1 to position **5**
and pulls `Charlie` from 3 to **1**. Every row moves. The user's drop target is not where the item
lands. And the persisted order is then reverted on the next load, so the feature is simultaneously
wrong *and* ephemeral.

### D-1b — the same handler destroys hidden order when a filter is active

`PalettesPane.vue:190` builds `ids` from `pm.filteredSaved.value` — the **subset**.
`usePaletteStore.ts:153-167` `reorderPalettes` places `orderedIds` first, then appends everything
else.

Measured: seed `Alpha, Bravo, Charlie, Zulu One, Zulu Two`; type `Zulu` (2 of 5 visible); drag the
two visible rows past each other:

```
store before : Alpha, Bravo, Charlie, Zulu One, Zulu Two
DOM filtered : Zulu One, Zulu Two
store after  : Zulu Two, Zulu One, Alpha, Bravo, Charlie   ← 3 untouched, invisible palettes demoted
clear search : Zulu Two, Zulu One, Alpha, Bravo, Charlie
```

The user swapped two adjacent rows. Three palettes they could not see, did not touch and were never
told about were re-sorted. No announcement, no undo.

### Cure (gestalt, not patch)

Reorder is a **store transaction over identity**, not a DOM side effect over a projection. Move the
whole gesture behind one authority in `usePaletteStore`: expose `movePalette(id, beforeId | null)`
that resolves against the *full* ordered list by id, make the sortable a pure input to it
(`onUpdate` supplied so the vendor default is displaced, `onEnd` deleted), and **disable reorder
while `searchQuery` is non-empty** — a projection has no ordinals to move. Then implement the §5.2
keyboard grammar against the same `movePalette`, which is what makes pointer/keyboard "resolve to
the same ordinal".

---

## 4. BLOCKER D-3 — the pastel-rainbow identity is chromatically dead in dark

### Law

`VISUAL-CONSTITUTION.md §2`: "The pastel-rainbow identity has exactly two textual coordinates: the
`Palettes` Dock destination and the `Palettes` substring in the Library heading `My Palettes`. …
**Both coordinates render in light and dark.**"

`PalettesPane.vue:15` is the Library coordinate — one of exactly two in the entire product.

### Measured — live computed tokens, WebKit, 1440

| Scheme | `--palettes-ramp-title-0/1/2` (resolved) | chroma |
|---|---|---|
| light | `oklch(47.093% 0.188343 329.834)` · `oklch(47.093% 0.188343 9.834)` · `oklch(47.093% 0.124795 49.834)` | 0.188 / 0.188 / 0.125 |
| dark | `oklch(95.832% 0.033662 329.834)` · `oklch(95.832% 0.021053 9.834)` · `oklch(95.832% 0.023120 49.834)` | 0.034 / 0.021 / 0.023 |

- mean chroma light **0.1671**, dark **0.0260** → **6.4× collapse**
- OKLab ΔE between the outer stops: light **0.207**, dark **0.0221** → **9.4× less separation**.
  ΔE 0.022 at L 0.958 is at or under the just-noticeable threshold for text glyphs. The three
  "rainbow" stops are one colour.

Independently confirmed from the tracked Safari PNGs by sampling glyph ink per column across the
`Palettes` substring (2880×1800 captures):

```
safari-desktop-light : glyph-ink chroma min 0.0301 max 0.1879 mean 0.1502 ; hue 336.7° → 54.8°
safari-desktop-dark  : glyph-ink chroma min 0.0196 max 0.0324 mean 0.0239 ; hue 333.9° → 47.1°
```

Crops read side by side (`title-safari-desktop-light.png` / `…-dark.png`): light shows
purple → magenta → burnt orange; dark shows uniform near-white with a faint pink cast.

### The design fault, not the arithmetic fault

`demo/color-session/palettes-ramp.ts:104-120` certifies each stop to a WCAG floor by walking
lightness along the hue's gamut cusp. Against a dark plate the reachable direction is *up*, so all
three stops land at L 95.8% — where OKLCH chroma is arithmetically tiny for any hue. **The
certification succeeds by destroying the thing it certifies.** The module's own header admits the
open question ("the PASTEL REGISTER inside this honest guard is the owner's T-56 bracket").

### D-3b — the per-site floor split buys nothing

`palettes-ramp.ts:83-88` defines two floors (4.5 menu / 3.0 title) and `useViewAccents.ts:146-165`
mints two token triples so the two sites can "diverge honestly". Measured divergence:

- **dark**: `--palettes-ramp-*` and `--palettes-ramp-title-*` are **byte-identical**. Zero.
- **light**: identical on stops 0 and 1; stop 2 differs by ΔL 1.34 pp and ΔC 0.0035 — ΔE_ok ≈ 0.014,
  below JND.

An entire per-site resolver arm, a second token family, and a per-instance alias object
(`PalettesPane.vue:171-175`) exist to produce a difference no eye can see.

### Cure

Certify **hue-preserving chroma**, not lightness alone: hold the analogous fan's chroma at the
dark-plate cusp and take the contrast from the plate (darken the resting tier locally behind the
word) rather than from the ink. If the plate cannot be moved, the honest design answer is to accept
the large-text 3:1 floor at a *mid* lightness in dark (L ≈ 0.72–0.78) where C ≈ 0.10 is still
reachable — the word reads as pastel rainbow, which is the whole point of the coordinate. Then
delete the per-site split and the `rampTitleVars` alias: one resolver, one token triple, one recipe.

---

## 5. BLOCKER D-2 — the desktop composition is an exact 50/50 split

### Law

`VISUAL-CONSTITUTION.md §3` law 1: "A two-part desktop scene is **earned**, not default. A P122
instrument chooses exactly `golden` (61.8033989% / 38.1966011%) or `preview-dominant`
(66.6666667% / 33.3333333%); the display-rounded protagonist law is 61.8–66.7%."

`§3.1`, *Library / My Palettes*: "owned … field at **64%…66.6666667%** when selected; complementary
selected action/history inspector at 33.3333333%…36%".

### Measured (live, WebKit 1440×900)

```
.pane-container--dual  gridTemplateColumns = "512px 512px"
  lane 0 (Picker)        x=199  w=512
  lane 1 (PalettesPane)  x=729  w=512
```

**Exactly 50.000% / 50.000%.** Not `golden`. Not `preview-dominant`. **14.0 percentage points below
the Library field's 64% floor.**

Worse than the ratio: the companion lane is the **Picker**. `§3.1` requires the Library's companion
to be its own "selected action/history inspector". There is no inspector on this route at all —
`PalettesPane` has no selected-palette lane, which is exactly why every action had to be crammed
into the card body (see D-4). The proportion defect and the omnibus-card defect are one defect.

### D-2b — the empty invitation receives the whole stage

`§3` law 2: "Empty secondary content occupies at most a narrow invitation tray (**≤15% of the
stage**) or disappears. **It never receives half the viewport.**"
`§7`: "A true empty invitation **content-hugs** its text/action".

Measured (live, empty store, 1440×900): the `[role="status"]` empty block is **462 × 218.1 px**
inside a 512px pane — **90.2% of the stage, 32.1% of the viewport width**. **6.0× the ceiling**, and
it hugs nothing: `col-span-full` inside `min-h-[120px]`, `justify-center`, width pinned to the
column.

It also carries **no action**. `PaletteCardGrid` exposes an `#emptyAction` slot
(`PaletteCardGrid.vue:28-30`); `PalettesPane.vue:75-81` never fills it. The invitation's only
guidance is prose pointing at a different component ("Add colors above").

### Cure

Adopt the `§3.1` Library composition literally: owner-state field at 64–66.7%, selected inspector at
33.3–36%, inspector **absent** (not empty) when nothing is selected. The Picker does not belong in
the Library route's stage. On empty, collapse the field to a content-hugging invitation tray with a
real action in `#emptyAction` ("Save current colors"), and let the route reclaim the rest.

---

## 6. BLOCKER D-4 — the palette card is a clickable `role="article"` with no selection seat

### Law (quoted, `VISUAL-CONSTITUTION.md §5`)

> "A palette card is a bounded entity article, **not a clickable `role=article`**, `listbox`/`option`
> composite, or seven-mode omnibus. One native named `<button type="button">` spans its
> specimen/identity region and expresses inspector selection only through `aria-pressed` … **The card
> body owns no expand, inline rename, action menu, transient result or hover-only swatch-action
> path.** Full detail, rename/lifecycle/export actions and durable operation state live in the
> selected inspector."

`§3.1` adds the exact tuple: `size="sm" material="content" tier="quiet" surface="opaque"
shadow=false grain=false specular="off"`, "no cartoon, grid, or Card-level selected variant".

### Measured (live, 5 seeded palettes, 1440 and 390, light and dark)

```
card root  : tabindex = null   tabIndex = -1   onkeydown = false
             aria-pressed = null   aria-expanded = null   aria-selected = null
             cursor = "pointer"
             class = "group rounded-card cartoon-surface border-card-edge bg-well cursor-pointer"
             box-shadow = -3px 3px 0, -5px 5px 0, -7px 7px 0   (three hard casts)
tab order inside the pane:
  ["Search your palettes...", "Delete all saved palettes",
   "Palette menu", "Palette menu", "Palette menu", "Palette menu", "Palette menu"]
```

**Zero `<button aria-pressed>` seats exist. The card never enters the tab order.** Expand/collapse —
wired by `PalettesPane.vue:91` `@click="pm.toggleExpand(palette.id)"` onto `PaletteCard.vue:26`
`@click="$emit('click')"` — is **pointer-only**, with no keyboard path and no exposed state. A
keyboard or AT user cannot open a palette at all.

Everything `§5` forbids in the card body, `PalettesPane` opts into explicitly:

| Forbidden by §5 | Enabled at |
|---|---|
| expand | `PalettesPane.vue:87` `:expanded` + `:91` `@click` |
| inline rename | `PalettesPane.vue:89` `:editable-name="true"` → `PaletteCard.vue:58` |
| action menu in the body | `PaletteCard.vue:83-106` (`PaletteCardMenu`), fed by `PalettesPane.vue:92-96` |
| transient result | `PalettesPane.vue:206-208` `card.showFeedback(...)` → `ActionFeedback` |
| cartoon variant | `PaletteCard.vue:19` `cartoon-surface` + `:30` `cartoon-cast` |
| `shadow=false` | three hard casts, measured above |

`PaletteCard.vue:12-16` states in a comment that it deliberately is **not** a glass-ui `Card` — it is
a hand-rolled `div` wearing `cartoon-surface border-card-edge bg-well`. That is owner edict 4 (glass-ui
is the design system; do not hand-roll what it provides) failing in the same place as the constitution.

### D-4b — `role="list"` owning `role="article"` children is structurally invalid

`PaletteCardGrid.vue:3` `role="list"`; measured `gridChildRoles = ["article","article","article",
"article","article"]`. ARIA requires `list` to own `listitem`. With `article` children the list
semantics collapse — AT will not report "list, 5 items", and the `§5.2` "announce `position of
total`" contract has no substrate to announce against.

### Cure

Delete the omnibus. Card root becomes a non-interactive `<article>` with the exact `§3.1` tuple
(`Card size="sm" material="content" tier="quiet" surface="opaque" :shadow="false"`), grid children
become `role="listitem"` (or a real `<ul>/<li>`), and the specimen+identity region becomes one
native `<button type="button" :aria-pressed>` that selects into a **new inspector lane** (which D-2
already requires you to build). Rename, menu, export, publish and their operation state move there.
The reorder handle stays a separate named control.

---

## 7. BLOCKER D-5 — "no search results" renders the empty-library invitation, contradicting its own header

`PalettesPane.vue:77-80`

```
:empty="pm.filteredSaved.value.length === 0"
empty-eyebrow="· empty plate ·"
empty-text="No saved palettes yet."
empty-hint="Add colors above, then save the set."
```

`empty` is keyed to the **filtered** length; the copy speaks about the **unfiltered** collection.

### Reproduction (live, 5 seeded palettes, query `qqqzzz`, both schemes, 1440 and 390)

```
header badge      : "5"
header sr-only    : "(5 saved)"
body [role=status]: "· empty plate ·  No saved palettes yet.  Add colors above, then save the set."
cards rendered    : 0
delete-all present: true
```

One viewport asserts **"5 saved"** and **"No saved palettes yet."** simultaneously. The remedy
offered ("Add colors above, then save the set") is wrong — the cure is "clear your search". And the
`role="status"` region announces *that wrong sentence* to AT on every keystroke that empties the
result set.

`VISUAL-CONSTITUTION.md §5.1`, *in-route filter*: "announce changed result count/state through the
owning status region". When results come **back** (query `Zulu` → 2 cards, measured) the status
region unmounts entirely and nothing is announced at all.

### Cure

Three named states, not one: `empty-library` (0 saved) · `no-matches` (saved > 0, filtered = 0,
copy names the query and offers "Clear search") · `populated`. Give the field one persistent
`role="status"` count line so both transitions announce, instead of a status element that only
exists in one of the three states.

---

## 8. BLOCKER D-6 — export failure is `console.warn`-only, which the palette contract forbids verbatim

`PALETTE-CONTRACT.md` Appendix W51, opening paragraph:

> "A serializer either yields the bytes below or a **visible terminal/retryable operation state —
> never a partial download or `console.warn`-only result**."

`demo/palettes/usePaletteExport.ts:21-23`

```ts
} catch (e) {
    console.warn("Export failed:", e);
}
```

`PalettesPane.vue:96` `@export="(p, fmt) => onExport(p, fmt)"` is the wiring; `PalettesPane.vue:211`
`const { onExport } = usePaletteExport();` is the consume. A user who exports a PNG that throws
(quota, serializer contract, blob/anchor failure — all named failure codes in the appendix) sees
**nothing**. Not a toast, not a card state, not a disabled control.

Appendix W51 §8 further requires a durable `ExportOperation` record with states
`captured | ready | retryable-failure | terminal-failure | handoff-initiated`. `PalettesPane`
renders none of those and the Library port exposes no field to render them from (§9).

### Cure

Export is an operation on an entity, not a fire-and-forget call. Put the operation record in the
store, surface `Prepare FORMAT` → `Download FILENAME` on the selected inspector's action region
(D-4's cure gives you the lane), and render `retryable-failure` / `terminal-failure` as visible
persistent state with a real Retry. Delete the `try/catch → console.warn`.

---

## 9. BLOCKER D-7 — the Library has no operation-state surface at all

`PROPORTION-AUDIT.md` PR-08: "Pending/failure/export/recovery truth only transient → **ADD-AFFORDANCE**
… Persistent entity status/recovery."
`VISUAL-CONSTITUTION.md §5`: "Persistent operation state stays with the entity/workspace. A transient
flourish may celebrate success but never carries the only truth."

### The port has no state members

`usePalettePorts.ts:136-153`, `libraryPort` — 15 members, **all data or commands, zero operation
state**. Compare its sibling `browsePort` (`usePalettePorts.ts:155-190`), which carries `browsing`,
`browseError`, `loadingMore`, `sortLoading`.

### Consequences, measured / traced

- **Publish is a network round-trip with no pending state.** `usePaletteActions.ts:40-58` awaits
  `ensureUser()` → `ensureSession()` → `createAndSavePalette()`. During that await
  `PalettesPane.vue:199-209` shows nothing.
- **Publish failure can be silent.** `PalettesPane.vue:203-204`:
  ```ts
  const id = palette.id;
  if (id == null) return;          // ← the only channel for `result` is dropped here
  ```
  The awaited `{success:false, message:"Failed to publish: …"}` is discarded and never surfaced.
- **Success/failure truth is transient only** — `card.showFeedback(...)`, an auto-dismissing
  in-card banner. Exactly the "transient flourish carrying the only truth" §5 names.
- **No error plate.** `EmptyState.vue:17-29` ships a `variant="error"` with `role="alert"`, a
  destructive glyph, a machine-truth line and a Retry action slot. `PalettesPane` never uses it.
  `BrowsePane.vue:61-78` — the sibling pane in the same cluster — does.
- **No skeleton.** `PaletteCardSkeleton.vue` (124 lines) is exported from
  `browser/card/index.ts:6` and consumed by `BrowsePane.vue:49,130` and `ExtractWorkbench.vue:103`.
  `PalettesPane` imports it zero times (`grep -rn PaletteCardSkeleton demo/` — no hit in
  `PalettesPane.vue`).
- **No storage-recovery arm.** `VISUAL-CONSTITUTION.md §7`: "Unsupported/corrupt palette storage
  replaces the Library body inside its existing main with one content-hug recovery article … **It is
  never rendered as an empty library**, silent reset, migration choice, overlay, or companion pane."
  `usePaletteStore.ts:22-31` swallows a corrupt/unparseable store and returns `defaultStore`.
  `PalettesPane` therefore renders a cheerful "No saved palettes yet." over a user's destroyed
  library, with a Delete-all button still live beside it. **This is the single most dangerous
  unhandled state in the component.**

### Cure

Add the three missing members to `libraryPort` — `pending` (per-entity), `lastError`, `storageState`
— and render them where the constitution puts them: the selected inspector (persistent, per entity)
and one storage-recovery article that *replaces* the field body. Reuse `EmptyState variant="error"`
and `PaletteCardSkeleton`; both already exist and are already used one file over.

---

## 10. MAJOR findings

### D-8 · Material: glass without blur; three shadow species; forbidden cartoon tuple

`PalettesPane.vue:2` `<Card tier="resting" …>`. Measured on that element, both schemes:

```
class            : glass-resting card rounded-card … pane-scroll-fade …
backdrop-filter  : none          -webkit-backdrop-filter : none      filter : none
background-color : oklab(0.928 … / 0.664) light  ·  oklab(0.395 … / 0.7536) dark
box-shadow       : 8px 8px 0  (hard, zero blur, down-right)
```

`VISUAL-CONSTITUTION.md §2`: "Glass earns its blur by revealing live content; **otherwise it is a
neutral well.**" This surface claims the structural-glass tier and renders a flat translucent fill,
so the raw ambient gradient bleeds straight through the palette field — visible in all four Safari
captures as pink washing behind the cards.

`PROPORTION-AUDIT.md §5` law 1: "A Card houses one bounded object/specimen. **A page region, empty
column, inner stage or mere padding group does not become a Card by default.**"
`VISUAL-CONSTITUTION.md §3.1`: "every rendered bounded palette entity slip has exactly one Card
shell, and the **field/lane/empty/inspector have none**." `PalettesPane.vue:2` wraps the *field* in
a Card. Inverted: the container that must not be a Card is one; the entities that must be Cards are
hand-rolled divs (D-4).

Shadow inventory in one 512px lane (measured, dark and light): pane `8px 8px 0` down-right; card
`-3/-5/-7px` down-left ×3; `.dashed-well` `-2/-3/-4px` down-left ×3. **Seven hard casts, two
opposed light sources.** `§3` law 8: "Supporting fixtures do not compete with it through equal size
or equal shadow." `§7`: "not cartoon casters stacked within casters."

*Cure*: pane → not a Card (a plain landmark-neutral region on the workspace chassis); entities →
the §3.1 tuple with `shadow=false`; one shadow vocabulary, one light direction, owned in glass-ui.

### D-9 · `role="list"` / `role="article"` — covered in D-4b. `PaletteCardGrid.vue:3` + `PaletteCard.vue:22`.

### D-10 · Empty tray occupies 90.2% of the stage — covered in D-2b.

### D-11 · Empty-state typography breaks the closed type matrix

`VISUAL-CONSTITUTION.md §4`: "This matrix is closed across all eighteen compositions." Rows:
prose/help → `text-prose`, **Plus Jakarta Sans**; value/code/provenance → `text-mono-small`,
Fira Code.

Measured on the strings `PalettesPane.vue:78-80` supplies:

| String | Rendered | Matrix says |
|---|---|---|
| `Add colors above, then save the set.` (hint) | **Fira Code 16.4px** | help prose → Plus Jakarta Sans `text-prose` |
| `No saved palettes yet.` | **Fraunces 25.888px** | no matrix row grants display type to an empty tray |
| `· empty plate ·` | Fira Code 14.384px, tracking 2.589px, uppercase | no matrix row at all |

The help line is set in the code face, at a size larger than the eyebrow, and is the widest ink in
the tray. In the mobile captures it reads as the primary message.

`PROPORTION-AUDIT.md §5` law 5: "A small icon/mark is either data, status, labeled action, drag
affordance, focus/selection register or **removed**." `· empty plate ·` is an ornament carrying no
information; `PalettesPane.vue:78` is the site that chooses it.

### D-12 · The route has zero H1; the Library identity is an `<h3>` at 41.9px

`VISUAL-CONSTITUTION.md §4.1`: "**Each route has one H1** and exactly one stable main landmark,
owned by the shell."

Measured on `/#/palettes` (1440, light):

```
main count : 1     h1 : []          ← zero
headings   : ["H3:92.0%,88.8,20.0", "H3:My Palettes5 (5 saved)"]
title      : <h3>  41.888px  Fraunces  weight 400
```

Two sibling `<h3>`s at display scale, no `h1`/`h2` above either, and one of them is the Picker's
*numeric readout* — which `PROPORTION-AUDIT.md §5` law 11 forbids by name ("A display-sized readout
is not therefore a document heading or live status"). The tracked Safari matrix corroborates: the
`h1` column is `0` on **all 60 captures** (`visual/REPORT.md:119-178`).

`PaneHeader.vue:21` emits the `<h3>`; `PalettesPane.vue:10-26` is its Library consumer. The
component that owns the route's identity string cannot reach the route's heading level — that is a
composition defect, not a typo.

### D-13 · The reorder handle is an unnamed 16px `<svg>`; the keyboard reorder grammar is absent

Measured: `tag: "svg"`, `tabindex: null`, `role: null`, `aria-label: null`, rect `16×16`,
`cursor: grab`. `PaletteCard.vue:47-50`.

- `VISUAL-CONSTITUTION.md §3.1`: "An optional reorder handle remains a **separate named control**."
  It has no name and no role.
- WCAG 2.2 **2.5.8 Target Size (Minimum)** floor is 24×24. Measured 16×16.
- `§5.2` vertical reorder (Space grab · Up/Down · Home/End · "position of total" · Escape cancel):
  **zero of six implemented**. `PalettesPane.vue:183-197` has no keyboard path.
- `PROPORTION-AUDIT.md` PR-07 names this exact family: "Hover-only/unlabeled controls and
  **invisible drag state** → ADD-AFFORDANCE / REMOVE … every surviving action/drag seat has a
  name/state." Drag state is `ghostClass: "opacity-30"` and nothing else.

### D-14 · The search field has no accessible name; 22px tall on mobile

Measured: `{aria-label: null, aria-labelledby: null, type: "search", id: ""}` — placeholder only.
It is the **first** tab stop in the pane. WCAG 4.1.2 / 3.3.2.

Height 24.58px desktop, **22.0px mobile (390)** — the sole entry in the pane's `smallTargets` list at
mobile, below the 24×24 AA floor. `PalettesPane.vue:33-37`.

`PalettesPane.vue:35` also applies `class="search-seated"` — a consumer-side register override on a
producer component, which the comment at `:30-32` labels "interim, booked onto the P3 seated rung".
Owner edict 5 (style at the root, never per-instance).

### D-15 · Sortable motion is an untokenized literal and is not reduced-motion gated

`PalettesPane.vue:185` `animation: 150,`.

- `VISUAL-CONSTITUTION.md §6`: "Spatial continuity uses **one producer-owned glass-ui spring
  register**." A bare `150` is neither `--animation-slide-sm/md/lg` nor a glass-ui spring.
- `§6`: "**Reduced motion resolves directly to the final geometry** and stable chromatic state."
  Measured under `prefers-reduced-motion: reduce`: the pane's CSS transitions do collapse
  (`opacity 0.1s, color 0.1s, background-color 0.1s, border-color 0.1s, box-shadow 0.1s`), but the
  sortable options are constructed identically — there is no `matchMedia` guard anywhere in the
  file. sortablejs animates `transform` on every sibling row for 150ms per drag regardless.
- Owner-marked evidence `visual/owner-marked/OM-8-pane-transitions-unanimated.png` records the
  converse defect on the same surface: the pane swap itself has no motion while its list rows do.

*Cure*: read the register from a token (`--animation-slide-sm`) and pass `animation: 0` when
`prefers-reduced-motion` matches — or better, delete the vendor animation entirely once D-1's cure
makes the store the single authority and the list re-renders from model order.

### D-16 · `rampTitleVars` is a per-instance override with duplicated literal fallbacks, buying ΔE ≈ 0

`PalettesPane.vue:171-175`

```ts
const rampTitleVars = {
    "--palettes-ramp-0": "var(--palettes-ramp-title-0, oklch(0.632 0.214 333.5))",
    "--palettes-ramp-1": "var(--palettes-ramp-title-1, oklch(0.632 0.214 13.5))",
    "--palettes-ramp-2": "var(--palettes-ramp-title-2, oklch(0.632 0.214 53.5))",
} as const;
```

Three problems in five lines:

1. **Per-instance style override** (owner edict 5). The comment at `:169-170` is explicit about why —
   "utils.css stays LANE-5-OWNED + untouched" — i.e. the override exists to avoid touching the root.
   That is ownership friction encoded as a defect.
2. **Duplicated literal constants / masking fallback** (owner edict 2). The three `oklch(...)`
   literals are copies of `demo/styles/utils.css:195-197`. Two files now hold the same numbers with
   no link; the comment says they "mirror utils.css". A masking fallback that hides a missing token
   is precisely the "no masking fallbacks" prohibition.
3. **It buys nothing** — see D-3b: the title triple equals the menu triple exactly in dark and to
   ΔE_ok 0.014 in light.

*Cure*: one token triple on `:root`, one `.palettes-ramp-text` recipe, no inline alias, no per-site
split. Delete all three lines and the `RAMP_LARGE_TEXT_CONTRAST_FLOOR` arm.

### D-17 · Delete-all: an unnamed-shaped ghost glyph owning its own layout band, second in tab order, live at zero results

`PalettesPane.vue:62-73`. Measured: `28 × 28` px, `variant="ghost"`, `icon-only`, `size="xs"`,
14px `Trash2`, alone in a `flex items-center justify-end` row.

- It is the **second** focusable in the pane, before any palette. An irreversible bulk-destructive
  action is reached by one Tab from the search box.
- It **remains present when the filter shows zero cards** (measured: `deleteAllStillPresent: true`
  with `cardsRendered: 0`). A user looking at "No saved palettes yet." can still delete five.
- `PROPORTION-AUDIT.md §5` law 5 and PR-05: a whole boundary/band exists for one glyph. The comment
  at `:56-61` records that the row previously held a "{n} palettes" line "that existed only to
  left-balance this button" — the line was removed and the now-empty row was kept.
- 28×28 clears WCAG 2.2 AA (24) but not AAA (44); for a destructive bulk action that is the wrong
  side of the ladder.

*Cure*: the destructive bulk verb belongs in the library's own overflow menu or the inspector's
action region, gated on `savedPalettes.length > 0` **and** an unfiltered view, with a text label —
not a naked icon holding its own band.

---

## 11. MINOR findings

### D-18 · Three dead imports

`PalettesPane.vue:128`

```ts
import { inject, reactive, ref, computed, watch, onMounted, nextTick } from "vue";
```

`watch`, `onMounted`, `nextTick` each occur exactly once in the file — on this line.
(`grep -c` = 1 for each.) Dead surface implying lifecycle the component does not have.

### D-19 · Pre-3.5 template-ref idioms, two `as any`, and an unpruned reactive record

`PalettesPane.vue:177-181`

```ts
const cardRefs = reactive<Record<string, InstanceType<typeof PaletteCard>>>({});
const sortableGridRef = ref<InstanceType<typeof PaletteCardGrid> | null>(null);
const sortableEl = computed(() => (sortableGridRef.value as any)?.$el as HTMLElement | undefined);
```

with `PalettesPane.vue:84` `:ref="(el: any) => el && (cardRefs[palette.id] = el)"`.

- Owner edict 7 names `useTemplateRef` as the Vue 3.5 idiom; both refs predate it.
- Two `any` escapes (`el: any`, `as any`) in a `strict` project.
- `cardRefs` entries are **written and never deleted**. Deleting a palette leaves its component
  instance retained in a reactive record keyed by a dead id — an unbounded, monotonically growing
  retention over a session. **HYPOTHESIS** on the leak magnitude (not measured); the missing delete
  is plain from the code.

### D-20 · Sibling asymmetry with `BrowsePane`

Same route family, same `browser/card` cluster, same ports file. `BrowsePane.vue` has skeletons
(`:49,:130`), an error plate with Retry (`:61-78`) and four operation-state port members.
`PalettesPane.vue` has none. Two panes that a user reads as one product disagree on whether pending
and failure exist.

---

## 12. INFO — evidence gap

`/palettes` appears in **zero** of the six state matrices. Contents of
`docs/tranches/V/megatranche/audit/visual/shots/`:

```
forced-colors-desktop/  : adminusers blob browse gradient picker
keyboard-focus-desktop/ : adminusers blob browse gradient picker
reduced-motion-desktop/ : adminusers blob browse gradient picker
rtl-desktop/            : adminusers blob browse gradient picker(+postload)
rtl-mobile/             : adminusers blob browse gradient picker
zoom-200-desktop/       : adminusers blob browse gradient picker
```

The Library route — one of the eleven named `§3.1` members and the owner of one of the two
pastel-identity coordinates — has no RTL, no zoom, no forced-colors, no reduced-motion and no
keyboard-focus capture. That is why D-3 (the dark ramp collapse) and D-4 (no focusable seat) were
never seen: the states in which they are visible were never captured. Capturing `/palettes` across
the six matrices should be a precondition of any close on this component.

---

## 13. Negative proof — what I attacked and could not break

The premise says the design is wrong. These are the places I expected it to be wrong and it was not;
recording them keeps the report honest.

1. **Reflow.** Measured at 720 / 360 / 320 CSS px, seeded: `overflowX = 0` at every width, the dual
   grid collapses to one column (`gridTemplateColumns` `688px` → `328px` → `288px`), and **no control
   is pushed outside the viewport** — `Palette menu` and `Delete all` sit 33–143px *inside* the right
   edge at every width. My first zoom attempt (`document.documentElement.style.zoom = 2`) reported
   the delete-all at `x=1544` in a 1440 viewport; that was an artefact of CSS `zoom`, not browser
   zoom, and the honest narrow-viewport arm refutes it. **No reflow defect.**
2. **RTL.** `dir="rtl"` at 1440: the pane mirrors cleanly (`x` 729 → 199), the `justify-end`
   delete-all mirrors with it (`x` 1188 → 224), the search input reports `direction: rtl`,
   `overflowX = 0`, no card clipped. **No RTL defect found at this level.**
3. **The EmptyPaletteMark is compliant.** `§7` asks for "exactly three WatercolorDots plus the
   established dashes", `aria-hidden`. `EmptyState.vue:37-48` renders exactly three
   `WatercolorDot variant="ghost" tag="div"` inside `aria-hidden="true"`. Matches.
4. **The count badge does not poison the heading name.** `PalettesPane.vue:19-25` marks the Badge
   `aria-hidden="true"` and adds an `sr-only` companion; measured `sr-only` text `"(5 saved)"`. The
   heading's accessible name is `"My Palettes (5 saved)"`, not `"My Palettes5"`. The P4-R3 clause is
   honoured.
5. **`verbatimModuleSyntax` is clean.** The file's only type-only import is
   `PalettesPane.vue:151` `import type { Palette } from "./types";`. Correct.
6. **The tracked Safari matrix is clean on the gross axes for this route.** `visual/REPORT.md:120,135,
   150,165`: `/#/palettes` shows `overflowX 0`, `main 1`, `pageErr 0`, `consoleErr 0` in all four
   matrices. The defects above are not crashes; they are design.
7. **`onCurrentPaletteSaved` is correctly local-first.** `usePaletteActions.ts:65-77` runs
   `createPalette` unconditionally and defers the network act to publish, with the inversion bug
   documented as already cured. Save with the backend down loses nothing.

---

## 14. Ranked disposition

| # | Defect | Severity | Family |
|---|---|---|---|
| D-1 | drag doubly applied: one drag permutes the library; lost on reload | BLOCKER | two-authority reorder |
| D-7 | no operation-state surface (pending / error / storage-recovery) | BLOCKER | absent state model |
| D-4 | clickable `role="article"`, no `aria-pressed` seat, pointer-only expand | BLOCKER | card-as-omnibus |
| D-2 | exact 50/50 desktop split; no inspector lane | BLOCKER | un-earned composition |
| D-3 | pastel identity chromatically dead in dark (6.4× chroma loss) | BLOCKER | certify-by-lightness |
| D-5 | filtered no-results renders "No saved palettes yet." beside a "5" badge | BLOCKER | projection ≡ collection |
| D-6 | export failure is `console.warn`-only | BLOCKER | absent state model |
| D-8 | glass tier with `backdrop-filter: none`; 7 hard casts, 2 light sources; Card on a field | MAJOR | material inversion |
| D-13 | unnamed 16px drag handle; §5.2 keyboard reorder entirely absent | MAJOR | two-authority reorder |
| D-12 | zero H1 on the route; identity is an `<h3>` at 41.9px | MAJOR | heading/type drift |
| D-11 | help prose in Fira Code 16.4px; display type in an empty tray | MAJOR | heading/type drift |
| D-10 | empty tray = 90.2% of the stage (ceiling 15%), no action | MAJOR | un-earned composition |
| D-9 | `role="list"` owning `role="article"` | MAJOR | card-as-omnibus |
| D-14 | search input unnamed; 22px on mobile | MAJOR | heading/type drift |
| D-17 | 28px unlabeled destructive ghost owning a band, live at 0 results | MAJOR | ornament-owns-a-band |
| D-15 | `animation: 150` untokenized and not PRM-gated | MAJOR | motion |
| D-16 | per-instance ramp alias with duplicated literals, ΔE ≈ 0 benefit | MAJOR | certify-by-lightness |
| D-20 | sibling `BrowsePane` has skeleton+error plate; this pane has none | MINOR | absent state model |
| D-19 | pre-3.5 refs, 2× `as any`, `cardRefs` never pruned | MINOR | idiom drift |
| D-18 | three dead imports | MINOR | idiom drift |
| D-21 | `/palettes` absent from all six state matrices | INFO | evidence gap |

---

## 15. The one transposition

Every BLOCKER except D-3 dissolves under a single architectural move, and the canon already names it:

> `VISUAL-CONSTITUTION.md §3.1` — *Library / My Palettes*: "owner workspace chassis; every rendered
> bounded palette entity slip has exactly one Card shell, and the field/lane/empty/inspector have
> none." · *§5*: "Full detail, rename/lifecycle/export actions and durable operation state live in
> **the selected inspector**."

**Build the inspector.** Then:

- the 50/50 split becomes 64–66.7 / 33.3–36 (**D-2**);
- rename / menu / export / publish leave the card body, so the card can collapse to a
  non-interactive `<article>` + one `<button aria-pressed>` seat (**D-4**, **D-9**);
- publish/export pending, failure and retry have somewhere persistent to live (**D-6**, **D-7**);
- reorder becomes a store transaction over identity with one authority and a keyboard grammar
  (**D-1**, **D-13**, **D-15**);
- the empty tray content-hugs because it is no longer holding a half-viewport open (**D-10**);
- the field stops being a `Card`, so the glass-without-blur plate and one of the three shadow
  species disappear (**D-8**).

**D-3** is independent and is the cheaper fix: certify the dark ramp on chroma at a mid lightness
instead of walking L to 95.8%, and delete the per-site split and the inline alias with it.

Nothing above requires a source edit from this formation; no source was edited.
