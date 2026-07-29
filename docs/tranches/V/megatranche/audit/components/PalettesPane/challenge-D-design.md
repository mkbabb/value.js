# CHALLENGE-D — `demo/palettes/PalettesPane.vue` — the design is flawed

## Model receipt

I observe myself to be **Opus 5 (1M context)**, exact model id `claude-opus-5[1m]`. This seat was
spawned with an explicit Opus 5 declaration and the served tier matches it. This is a declared
seat, not an inherited one.

> **Pass 3.** Supersedes the 2026-07-28 18:27 pass, preserved verbatim at
> `challenge-D-design.pass-2-prior.md`. I did **not** read pass 2 before measuring: I re-derived
> the component from the tree and the live app first, then read pass 2 to reconcile. That order is
> what makes §1 an independent replication rather than a paraphrase.
>
> This pass does three things: (1) **independently replicates** pass 2's load-bearing BLOCKERs from
> a cold start and records where the numbers agree to the byte; (2) **refutes one of pass 2's
> negative proofs** with a measurement it did not take; (3) lands **eight findings pass 2 does not
> contain**, three of which are BLOCKER-class because they are named, verbatim prohibitions in the
> binding canon.

Subject: `demo/palettes/PalettesPane.vue`, 212 lines. Repository `tranche-u`; the file is unchanged
since `c654824e` (HEAD advanced to `9268f054` mid-session on unrelated docs).

---

## 0. Verdict

**DEFECTIVE.** Twenty-eight findings survive verification: ten BLOCKER, thirteen MAJOR, five MINOR.

Pass 2's headline holds and is now **replicated by an independent seat**: the first drag-to-reorder
of every session permutes the entire library, deterministically, `P1,P2,P3,P4,P5 → P3,P4,P2,P5,P1`,
3/3 fresh WebKit contexts. Two seats, two probe harnesses, byte-identical output.

But the finding I would put in front of the owner first is not that one, because that one is a
*mechanism* fault with a known cure. It is this:

> **The pane tells the user, in its own words, that they own nothing — while its own header, four
> centimetres above, says they own six.** Type a query that matches nothing and `/#/palettes`
> renders `My Palettes ⟨6⟩` over the words *"No saved palettes yet. / Add colors above, then save
> the set."* The advice is not merely unhelpful; it is **wrong** — adding colours will not reveal
> the six palettes, clearing the filter will. And the one control still on screen is an unlabelled
> 28px trash circle whose scope is all six invisible palettes.
>
> The same screen renders for **corrupt storage**. `usePaletteStore.ts:26-31` catches a `JSON.parse`
> failure and returns `defaultStore`, so an unreadable library is presented as an empty one. The
> constitution forbids that arm by name — *"It is never rendered as an empty library, silent reset,
> migration choice, overlay, or companion pane"* (`VISUAL-CONSTITUTION.md §7`). Measured: with
> `localStorage["color-palettes"] = "{{{not json"`, the pane paints the empty invitation and no
> recovery article exists.

Three distinct truths — *empty library*, *filter matched nothing*, *your library is unreadable* —
are collapsed onto one screen with one wrong sentence on it. That is a design fault of the first
order: the component has one empty state where the domain has three, and the two it does not have
are the two where the user stands to lose data.

Behind everything sits the architectural fault pass 2 identified and I confirm: **`PalettesPane` is
a route composed as a `Card`.** `VISUAL-CONSTITUTION.md §3.1` gives *Library / My Palettes* an owner
workspace chassis, a field at 64–66.7%, a selected inspector at 33.3–36%, and — verbatim — *"the
field/lane/empty/inspector have none"* (no Card). What ships is `<Card tier="resting">` at
`PalettesPane.vue:2` wrapping the whole route in a measured **50.00 / 50.00** split with the Picker
in the inspector's slot.

---

## 1. Independent replication of pass 2 — what a second seat measured cold

Every row below was produced by my own harness
(`scratchpad/palpane-D/probe{,2,3,4,5}.mjs`, WebKit, `deviceScaleFactor: 2`, live
`http://localhost:9000`) before I opened pass 2.

| Pass-2 claim | My independent measurement | Verdict |
|---|---|---|
| D-1 first drag permutes library → `P3,P4,P2,P5,P1` | `TEST1 run1/2/3: before=P1,P2,P3,P4,P5 after=P3,P4,P2,P5,P1` — 3/3 | **CONFIRMED, byte-identical** |
| D-1 drags 2..n are correct | `drag#2: →P4,P2,P3,P5,P1 OK · drag#3: →P2,P3,P4,P5,P1 OK` | **CONFIRMED** |
| D-1 mechanism = surviving `defaultOptions.onUpdate` | `dist/useSortable.js:11-26` spread order, read directly | **CONFIRMED** (source pasted §3) |
| D-1b filtered reorder rewrites hidden palettes | 40-palette run, filter `palette 1` (11 visible): head `probe-0…probe-7` → `probe-9, probe-0, probe-10…probe-15` | **CONFIRMED, larger blast radius** |
| D-2 dark ramp collapse "6.44×" | computed tokens: light C̄ 0.1673 → dark C̄ 0.0260 = **6.44×** | **CONFIRMED to 3 s.f.** |
| D-3 exact 50/50, Card-as-page | `pane-container--dual` w=1042; two `.pane-wrapper` at **512.0 / 512.0** → shares `[50, 50]` | **CONFIRMED** |
| D-4 pointer-only `role="article"`, no seat | 6 `role="article"`, **0** `[aria-pressed]`, `cursor: pointer` on root | **CONFIRMED** |
| D-5 no-results paints the empty invitation | `emptyStatus: "· EMPTY PLATE · \| No saved palettes yet. \| Add colors above…"` with `storedCount: 6` | **CONFIRMED** |
| D-9 handle unfocusable | `dragHandles: 6`, `dragHandleTabbable: 0` | **CONFIRMED** |
| D-17 three dead imports | `watch` 0 uses · `onMounted` 0 · `nextTick` 0 after line 128 | **CONFIRMED** |
| D-21 two import idioms | `../ui/card` barrel (`:129-131`) vs `@mkbabb/glass-ui/dialog` (`:141-149`) | **CONFIRMED** |
| §12.2 *"RTL mirrors correctly"* | **REFUTED in detail** — see D-28 | **REFUTED** |

Nothing in pass 2 that I re-measured failed to replicate except negative-proof item 2.

---

## 2. Visual truth — the two states the tracked matrix never captured

`audit/visual/REPORT.md` captures `/#/palettes` in four matrices and **all four are the empty
store**. The route has never been photographed populated, filtered, or at 40 items. That is itself
a coverage defect (§19), and it is why three of my findings are new: they only exist once the pane
has content.

### 2.1 Populated, desktop light (`scratchpad/palpane-D/A-populated-1440.png`, 6 palettes)

Read the image and the pane's compositional argument falls apart in reading order:

1. `My Palettes ⟨6⟩` — display-1 Fraunces with the chromatic *Palettes*. Correct and handsome.
2. Search field.
3. *Start a new palette* — a 462 × 130px dashed tray containing one heading and **one 48px dashed
   ghost swatch at the far left**. Roughly **82% of the tray is empty.** The invitation's own
   affordance occupies an eighth of the box drawn around it.
4. **A single unlabelled 28px trash circle, floating alone, right-aligned, in its own band.** Not a
   toolbar — a toolbar of one. Comment `:56-61` records why: the `{n} palettes` line beside it was
   deleted because *"it existed only to left-balance this button"*. The balance was removed and the
   button was kept. What remains is an orphan.
5. Six palette cards, each a full-bleed 5-band saturated strip over a name row.

Items 3 and 4 are the failure. The reading path from *create a palette* to *your palettes* is
interrupted by the pane's single most destructive control, which has no visible name, no visible
scope, and no visible neighbour. `PROPORTION-AUDIT.md §5.5`: *"A small icon/mark is either data,
status, labeled action, drag affordance, focus/selection register or removed."*

At six cards the strips stack into a barcode: six equal-height, equal-width, full-bleed rainbow
bands at 12px pitch. Every card shouts at the same volume, so the field has no texture and no
scanning entry point. `VISUAL-CONSTITUTION.md §7` asks for *"matte specimen slips inside a glass
workspace"*; what renders is six equally-loud chromatic banners.

### 2.2 The filtered-empty state (`scratchpad/palpane-D/light-nomatch.png`)

The screenshot is the finding. Header badge `6`. Search field `zzzzz-no-match`. Body: *"No saved
palettes yet."* Hint: *"Add colors above, then save the set."* Trash circle still present.

Measured simultaneously:

```
{ "emptyStatus": "· EMPTY PLATE · |  | No saved palettes yet. |  | Add colors above, then save the set.",
  "deleteAllStillPresent": true,
  "cardsRendered": 0,
  "storedCount": 6 }
```

### 2.3 Dark mode

Both tracked dark captures show *Palettes* as **white with a blush**. Sampling the shipped Safari
PNG (`safari-desktop-dark/palettes.png`), glyph-core pixels by horizontal third:

```
stop0 rgb(255,235,246)  OKLCH L=0.959 C=0.0257 H=343.3
stop1 rgb(255,236,239)  OKLCH L=0.960 C=0.0206 H=  7.9
stop2 rgb(255,237,233)  OKLCH L=0.959 C=0.0205 H= 34.7
```

versus light: `C = 0.182 / 0.187 / 0.152`. See §4.

### 2.4 40 palettes (`scratchpad/palpane-D/F-40.png`)

```
{ "cards": 40, "gridCols": "462px", "gridH": 4468, "paneScrollH": 4805 }
```

A **4468px single column inside a 774px viewport** — 5.8× overflow — with no grouping, no density
control, no pagination, no virtualization, and one row per palette at 462 × 108px carrying one name
and five colour bands. `PaletteCardGrid.vue:4` hardcodes `grid-cols-1`; the only escape is the
`gridClass` per-instance override prop, which PalettesPane does not pass. See D-30.

---

## 3. BLOCKER D-1 (replicated) — the first drag of every session permutes the library

```
TEST1 run1: before=P1,P2,P3,P4,P5  after=P3,P4,P2,P5,P1   intended=P2,P3,P1,P4,P5  *** WRONG ***
TEST1 run2: before=P1,P2,P3,P4,P5  after=P3,P4,P2,P5,P1   intended=P2,P3,P1,P4,P5  *** WRONG ***
TEST1 run3: before=P1,P2,P3,P4,P5  after=P3,P4,P2,P5,P1   intended=P2,P3,P1,P4,P5  *** WRONG ***
TEST2 drag#1: P1,P2,P3,P4,P5  ->  P3,P4,P2,P5,P1
TEST2 drag#2: P3,P4,P2,P5,P1  ->  P4,P2,P3,P5,P1        (correct)
TEST2 drag#3: P4,P2,P3,P5,P1  ->  P2,P3,P4,P5,P1        (correct)
```

`scratchpad/palpane-D/probe4.mjs`, three fresh WebKit contexts, real mouse drags at 16 steps.

The mechanism, from `node_modules/@vueuse/integrations/dist/useSortable.js:11-26`, pasted:

```js
function useSortable(el, list, options = {}) {
	const { document = defaultDocument, watchElement = false, ...resetOptions } = options;
	const defaultOptions = { onUpdate: (e) => {
		moveArrayElement(list, e.oldIndex, e.newIndex, e);
	} };
	…
		sortable = new Sortable(target, { ...defaultOptions, ...resetOptions });
```

`PalettesPane.vue:183-197` passes `onEnd` and never `onUpdate`, so `defaultOptions.onUpdate`
**survives the spread** and fires first, against `list` = `pm.filteredSaved.value` — a plain array
captured once at setup (`:183`). `moveArrayElement` also calls `removeNode(e.item)` +
`insertNodeAt(...)` (`:64-82`), i.e. it physically re-parents a DOM node that Vue's `v-for` owns.

So one gesture runs two competing reorder authorities: one mutates the real DOM and a detached
array snapshot, the other mutates the store. That is a **dual path** in the exact sense owner
edict 2 forbids, and the visible defect is its interference pattern.

**Design cure (not a patch).** Delete SortableJS from this component. `VISUAL-CONSTITUTION.md §5.2`
already specifies reorder as a *model* verb — *vertical list/review reorder*: Space grabs, Up/Down
move ordinal, Space drops, Escape cancels, *"every move announces item and `position of total`"*.
A named `<button>` emitting `move(id, delta)` against **the store's own order** satisfies §5.2,
kills D-1, D-1b, D-9 and D-25 in one cut, and removes a dependency.

---

## 4. BLOCKER D-2 (replicated) — the pastel identity is chromatically dead in dark

### Law

`VISUAL-CONSTITUTION.md §2`: *"The pastel-rainbow identity has exactly two textual coordinates …
**Both coordinates render in light and dark**."* `palettes-ramp.ts` promises the same:
*"in dark both land on the pastel band."*

### Measured — live computed root tokens, WebKit 1440, both schemes

```
light   --palettes-ramp-title-0  oklch(47.093% 0.188343 329.834deg)
        --palettes-ramp-title-1  oklch(47.093% 0.188343   9.834deg)
        --palettes-ramp-title-2  oklch(47.093% 0.124795  49.834deg)     C̄ = 0.1673

dark    --palettes-ramp-title-0  oklch(95.832% 0.033662 329.834deg)
        --palettes-ramp-title-1  oklch(95.832% 0.021053   9.834deg)
        --palettes-ramp-title-2  oklch(95.832% 0.023120  49.834deg)     C̄ = 0.0260
```

**6.44× chroma collapse.** All three dark stops share L to eleven decimal places. Mean C 0.0260 at
L 0.958 sits at or below the chroma just-noticeable-difference; the shipped Safari pixels agree
(§2.3, C 0.0206–0.0257 measured off the PNG). The hue fan survives *numerically* — 329.8° / 9.8° /
49.8° — and is annihilated *perceptually*.

### Why this is a design fault, not an arithmetic one

The ramp's identity is **hue**. The certifier's only lever is **L**
(`palettes-ramp.ts` → `certifyAccentInk` → `walkToFloor`, *"riding the hue's gamut cusp and
choosing its direction by reach"*). On a dark plate the feasible direction is *lighter*; the walk
therefore drives all three stops to L≈0.958, and at L≈0.958 the sRGB cusp chroma for any hue is
≈0.02–0.03. **The guard cannot fail to destroy the thing it is guarding.** Contrast-first
certification of a hue-carrying identity is a category error committed at design time, not a
mis-tuned constant.

The per-site floor split makes it worse, not better: the title uses the 3:1 large-text carve-out
and the dock entry uses 4.5:1, yet in dark `--palettes-ramp-title-*` and `--palettes-ramp-*` resolve
to **identical strings** — the split buys exactly zero differentiation in dark.

### Cure

Certify on an axis the identity does not live on. Hold hue and chroma; satisfy the floor by
compositing the letterforms against a **local plate** the ramp owns, rather than by bleaching the
ink. Failing that, the honest design answer is that the dark coordinate is a *saturated* fan on a
dark plate — dark-scheme identity ink is normally more chromatic, not less — which means the walk
direction must be chosen by **chroma preservation**, with L free only inside a chroma floor.

---

## 5. BLOCKER D-23 — *new* — one search model behind two differently-scoped fields

Two panes each present a search field with a scope-declaring placeholder:

- `PalettesPane.vue:33-37` — `v-model="pm.searchQuery.value"`, `placeholder="Search your palettes..."`
- `BrowsePane.vue:11-13` — `v-model="pm.searchQuery.value"`, `placeholder="Search the commons..."`

There is exactly one `searchQuery` (`usePalettePorts.ts:54`), and it feeds **four** consumers:

```
usePalettePorts.ts:54   const searchQuery = ref("");
usePalettePorts.ts:65   const browse     = useBrowsePalettes({ searchQuery });
usePalettePorts.ts:68   const admin      = useAdminUsers({ searchQuery, … });
usePalettePorts.ts:69   const colorQueue = useColorNameQueue({ searchQuery });
usePalettePorts.ts:112  const filteredSaved = useFilteredList(savedPalettes, searchQuery, …)
```

### Reproduction (live, 6 seeded palettes, both schemes)

Type `commons-query-xyz` into Browse's *"Search the commons…"*, navigate to `/#/palettes`:

```
{ "myPalettesFieldValue": "commons-query-xyz",
  "cardsRendered": 0,
  "emptyStatus": "· EMPTY PLATE · | No saved palettes yet. | Add colors above, then save the set." }
```

A query the user typed about the public commons silently hides their entire private library, and
the pane reports the library as empty. The comment at `PalettesPane.vue:28-32` asserts the opposite
— *"the twin placeholder … is scoped — this one owns YOUR list"* — and is false at the model level.

`VISUAL-CONSTITUTION.md §7`: *"Search/filter chrome is one family."* One *family* of chrome; four
scopes sharing one *value* is the opposite reading. A placeholder is a scope contract; two contracts
over one variable is a designed lie.

**Cure.** Scope belongs to the surface that declares it. `useFilteredList` already takes its query
as a parameter — give the Library its own `libraryQuery` in the Library port and let Browse keep
`commonsQuery`. The shared ref buys nothing: no screen shows both fields at once.

---

## 6. BLOCKER D-24 — *new* — corrupt storage is rendered as an empty library

### Law, verbatim

`VISUAL-CONSTITUTION.md §7`: *"Unsupported/corrupt palette storage replaces the Library body inside
its existing main with one content-hug recovery article: diagnosis, preservation/export, then
separately confirmed reset. W15 owns detection/export/reset semantics and W22 owns the visible
composition. **It is never rendered as an empty library, silent reset, migration choice, overlay, or
companion pane.**"*

### Mechanism

`usePaletteStore.ts:23-33`:

```ts
read(raw: string): PaletteStore {
    try {
        const parsed = JSON.parse(raw);
        if (!parsed || typeof parsed.version !== "number") { return defaultStore; }
        return parsed;
    } catch { return defaultStore; }
}
```

Two masking fallbacks: a `catch` that swallows unparseable bytes, and a shape guard that swallows a
wrong-schema store. Both return `{version:1, palettes:[]}` — indistinguishable, downstream, from a
user who has saved nothing. `PalettesPane.vue` has no branch for either; there is no recovery arm
anywhere in the file's 212 lines.

### Reproduction (live, both schemes)

```
localStorage["color-palettes"] = "{{{not json";  reload
→ { "rawStillCorrupt": "{{{not json",
    "emptyStatus": "· EMPTY PLATE · | No saved palettes yet. | Add colors above, then save the set." }
```

The bytes survive on disk (good — nothing was destroyed), but the user is told their library is
empty and invited to start saving over the top of it. The first successful save writes
`{version:1,palettes:[one]}` and the original bytes are gone.

This is simultaneously an owner-edict-2 violation (*no masking fallbacks*) and the loss of the one
§7 composition that exists specifically to prevent data loss.

**Cure.** `read()` returns a discriminated `{ok:true,store} | {ok:false,reason:"unparseable"|"schema"}`
and keeps the raw bytes. `PalettesPane` renders the §7 recovery article — diagnosis, *download raw
backup*, then separately-confirmed reset — in place of the field. `EmptyState` already carries the
`variant="error"` register (`EmptyState.vue:16-27`) this arm needs; it is simply never reached from
this pane.

---

## 7. BLOCKER D-5 (replicated) + MAJOR D-25 — *new* — the destructive control's scope is invisible

D-5 is replicated in §2.2. The new half is the trash button's scope.

`PalettesPane.vue:62-73` gates the delete-all row on `pm.savedPalettes.value.length > 0` — the
**unfiltered** store — while the grid below renders `pm.filteredSaved` (`:83`). Measured:

```
{ "deleteAllStillPresent": true, "cardsRendered": 0, "storedCount": 6 }
```

So the screen shows zero palettes, the words *"No saved palettes yet."*, and one control whose
`aria-label` is *"Delete all saved palettes"* and whose effect is to delete six palettes the user
cannot see. The confirmation dialog does name the number — *"This will permanently delete 6
palettes"* (`:107-109`) — which is the only thing standing between this and silent destruction, and
it contradicts the body copy on the screen behind it.

`VISUAL-CONSTITUTION.md §4.1`: *"Selected, failed, pending, withdrawn and disabled states are never
color-only. Role, accessible name, state/value and associated error/status are explicit."* The
destructive action's *scope* is the state here, and it is not merely non-explicit — it is
contradicted by the surrounding copy.

**Cure.** Bind the destructive verb to the visible set, or name the divergence: *Delete all 6* when
unfiltered, *Delete 2 matching* when filtered, disabled when the visible set is empty. The deeper
cure is D-3's: lifecycle verbs belong to the selected inspector, not to a floating chip.

---

## 8. BLOCKER D-27 — *new* — the empty Library takes half the stage; the law caps it at 15%

### Law

`VISUAL-CONSTITUTION.md §3` law 2: *"Empty secondary content occupies at most a narrow invitation
tray (≤15% of the stage) or disappears. **It never receives half the viewport.**"*
`PROPORTION-AUDIT.md` PR-04 gives the family the terminal verb **REMOVE**: *"Empty/equal companion
Cards and nested housing."*

### Measured (live, empty store, 1440×900, both schemes — identical)

```
stage  .pane-container--dual   w = 1042.0
       .pane-wrapper--left     w = 512.0   x = 199
       .pane-wrapper--right    w = 512.0   x = 729       → shares [50.00, 50.00]

pane   512.0 × 684.7   top 147.5  bottom 832.2
ink ends at y = 662.3  →  dead tail 169.9px  =  24.8% of the pane
empty invitation block                       =  218.1px
```

An empty Library receives **exactly 50.00%** of the stage — the literal words of the prohibition —
and inside that half, a quarter of the pane's height is unpainted tail below the last ink. Neither
number is near the law: 50.00% against a ≤15% cap is 3.3× over.

The ratio is also neither of the two §3 law 1 permits (*"exactly `golden` 61.8033989% /
38.1966011% or `preview-dominant` 66.6666667% / 33.3333333%"*). 512 / 1440 = 35.56%; the golden
inspector would be 550.0px. The scene is 38px short of a ratio it was not trying to hit.

**Cure.** The empty Library is an invitation, not a plate: content-hug it (`VISUAL-CONSTITUTION.md
§7`: *"A true empty invitation content-hugs its text/action"*) and let the protagonist expand. This
is inseparable from D-3 — a Library that owns its route cannot be 50% of a Picker's scene.

---

## 9. MAJOR D-26 — *new* — the palette entity has no `Card` shell

`VISUAL-CONSTITUTION.md §3.1`, Library row: *"**every rendered bounded palette entity slip has
exactly one Card shell**, and the field/lane/empty/inspector have none."* §3.1 then fixes the tuple:
`size="sm", material="content", tier="quiet", surface="opaque", shadow=false, grain=false,
specular="off"`.

Measured, the polarity is **exactly inverted**:

- the field/empty/lane **does** have a Card — `PalettesPane.vue:2`, `<Card tier="resting">`;
- the entity **does not** — `PaletteCard.vue:14-27` is a hand-rolled
  `<div class="group rounded-card cartoon-surface border-card-edge bg-well cursor-pointer" role="article">`.

`shadow=false / specular="off"` is not merely unset — it is contradicted: `cartoon-surface` is a
decoration atom whose own comment (`PaletteCard.vue:11-19`) describes *"translate/scale on
--ease-cartoon-punch … shadow bezier md→lg, :active squash, 2px border"* plus a lagging
`.cartoon-cast` child. §7's prohibition is verbatim: *"not cartoon casters stacked within casters."*
Measured, three cast shadows per card inside a card that is itself cast.

This is the design-system boundary edict (4) failing in the harder direction: not a `demo/ui/` fork,
but a *bypass* — a producer primitive with a ratified tuple, replaced in-place by a utility-class
recipe that cannot express the tuple. `demo/ui/{card,button,badge}/index.ts` are clean one-line
re-exports; the fork is at the consumption site.

---

## 10. MAJOR D-30 — *new* — the field has no design at scale

Measured at 40 palettes (§2.4): 4468px of single column in a 774px viewport; `gridCols: "462px"`;
40 DOM cards, no virtualization; `paneScrollH 4805`.

Three separate design absences compound:

1. **No density.** One palette = 108px of vertical, of which ~55px is a colour strip and ~53px is a
   name row that consumes 462px of width to render ~20 characters. A library is a *scanning*
   surface; this is a reading surface.
2. **No grouping.** §3.1 requires four non-interchangeable owner states (Device Draft, Workspace,
   Published, Trash). With none of them, 40 items are one undifferentiated run.
3. **No column response.** `PaletteCardGrid.vue:4` hardcodes `grid-cols-1`; the shared grid's only
   escape is a `gridClass` per-instance override prop (`:5`, `:43`) — i.e. the producer's answer to
   "more than one column" is *let the consumer override my root*, which is edict 5 inverted into an
   API.

At 462px wide a 2-up grid is not available, and at 40 items a flat list is not usable. Neither
decision was made; both were inherited from the 0-item and 6-item cases.

---

## 11. MAJOR D-15 (replicated) — the motion register is three raw literals

`PalettesPane.vue:183-197` is the component's only motion:

```ts
useSortable(sortableEl, pm.filteredSaved.value, {
    handle: ".drag-handle",
    animation: 150,
    ghostClass: "opacity-30",
```

- `animation: 150` — a bare millisecond integer. `VISUAL-CONSTITUTION.md §6`: *"Spatial continuity
  uses one producer-owned glass-ui spring register."* Not a token, not a rung, not the register.
- `ghostClass: "opacity-30"` — the drag *state* is a Tailwind utility name passed as a JS string.
  The whole drag register (`PROPORTION-AUDIT.md` PR-07, *"invisible drag state"* →
  **ADD-AFFORDANCE**) is a 30%-alpha ghost and nothing else: no lift, no drop target, no ordinal
  announcement.
- **No reduced-motion branch.** `grep -rn "prefers-reduced-motion\|motion-reduce" demo/palettes/`
  returns exactly two files, neither of them this one (`ShadowPalette.vue:25`,
  `ApiOfflineChip.vue:81`). §6: *"Reduced motion resolves directly to the final geometry."*

I measured that the *card's own CSS* does honour PRM (`transition: … 0.1s` under
`reducedMotion: "reduce"`), so the producer's register is PRM-correct — which isolates the defect to
this component's hand-passed options. I could not catch SortableJS's inline FLIP transition inside
my sampling window during a PRM drag, so *"the FLIP animates under PRM"* is recorded as a
**hypothesis**; the un-tokenized literal and the absent branch are confirmed at source.

---

## 12. MINOR D-28 — *new* — the count badge's gap is a physical margin (refutes pass 2 §12.2)

Pass 2's negative proof item 2 states *"RTL mirrors correctly … No LTR leakage."* The pane's
*layout* does mirror. Its header rhythm does not.

`PalettesPane.vue:22` — `class="text-mono-small ml-2"`. Computed: `marginLeft: 8px`,
`marginRight: 0px`. Measured rendered geometry (`probe5.mjs`):

```
LTR   title-block 754.0…967.2   badge 975.2…1004.6   gap title→badge =  8.0px
RTL   title-block 472.8…686.0   badge 443.3… 472.8   gap title→badge =  0.0px
```

In RTL the badge is **flush** against the title block and the 8px lands on its far side, in dead
space. The designed 8px separation between a count and the noun it counts becomes 0px purely by
flipping `dir`. `VISUAL-CONSTITUTION.md §6.1`: *"chrome, navigation and layout — logical
inline/block direction follows the document."* `ml-2` → `ms-2` is the mechanical fix; the design
point is that the one asymmetric spacing decision in the header was authored physically.

Related, recorded honestly as **INFO**: under `dir="rtl"` the heading reorders to read *"Palettes
My"* (measured: the ramp span at 539.3…686.0 sits to the **right** of *My* at 472.8…539.3), so §2's
coordinate *"the `Palettes` substring in the Library heading `My Palettes`"* no longer describes
what renders. The app ships no i18n, so this is a state-coverage gap rather than a shipping break.

---

## 13. MINOR D-29 — *new* — the pane cannot honour a ratio law from its own file

`PalettesPane.vue:2` — `class="… w-full mx-auto …"`. `mx-auto` is inert on a `w-full` child; there
is no free inline space to distribute. Measured, the real width authority is the shell wrapper:
`pane-wrapper … max-w-md sm:max-w-lg` caps the pane at **512px at every viewport** — identical at
1440 (35.56% of viewport) and at 720 (71.11%).

So the component carries a centring utility that does nothing, while the ratio the constitution
assigns it is decided two levels up in a file it does not own. Any cure for D-3 / D-27 must move
that authority, not restyle this line. Small, but it is exactly the contrivance edict 3 names — a
utility that reads as intent and expresses none.

---

## 14. Carried-forward findings from pass 2

Verified by reading, not re-measured; kept in the ledger with pass 2's evidence:

| ID | Severity | Defect |
|---|---|---|
| D-4 | BLOCKER | pointer-only `role="article"`, no focusable seat, no hover state (I measured `aria-pressed` count = 0) |
| D-6 | BLOCKER | export failure is `console.warn`-only — `PALETTE-CONTRACT.md` Appendix W51 forbids it verbatim |
| D-7 | BLOCKER | no operation state: publish has no pending arm; the result reaches the user only as a transient card flourish via `cardRefs[id].showFeedback()` (`:199-209`) |
| D-8 | MAJOR | glass with no blur; five shadow recipes, two opposed light directions |
| D-9 | MAJOR | unnamed unfocusable handle; no §5.2 keyboard reorder grammar (measured: 6 handles, 0 tabbable) |
| D-10 | MAJOR | fixed-height inner scroller at every viewport |
| D-11 | MAJOR | no owner-state selector — §3.1's four states collapsed to one (absent from all 212 lines) |
| D-12 | MAJOR | route has zero H1; Library identity is an `<h3>` |
| D-13 | MAJOR | search field has no accessible name |
| D-14 | MAJOR | `.search-seated` per-instance override of an axis glass-ui already exposes |
| D-16 | MAJOR | delete-all band 94% empty; first destructive tab stop |
| D-18 | MINOR | pre-3.5 template refs (`ref()` + string `ref=`, not `useTemplateRef`), two `any` escapes (`:84`, `:181`), unpruned `cardRefs` |
| D-19 | MINOR | badge/title optical centres differ by 9.6px |
| D-20 | MINOR | dashed ghost outline casting a physical shadow |
| D-22 | MINOR | empty-state copy lands two of three roles outside §4's closed matrix — I measured the sizes: eyebrow Fira Code **14.384px**, display line Fraunces 25.888px, **hint Fira Code 16.400px**. The lowest-priority line is set 2.0px *larger* than the eyebrow and in the machine voice, so the empty plate's type hierarchy is inverted as well as off-matrix |

One structural note on D-4: `PaletteCardGrid.vue:3` declares `role="list"` and its children are
`role="article"` (measured: `gridChildren: ["article" × 6]`) plus, in the empty case, a
`role="status"` (`gridChildren: ["status"]`). A `role="list"` whose children are not `listitem` is
structurally invalid, and the empty state puts a live region inside a list.

---

## 15. Negative proof — what I attacked and could not break

1. **No horizontal overflow.** `scrollWidth − clientWidth = 0` at 1440, 720 and under `dir=rtl`,
   with 6 and with 40 palettes, and with an 88-character palette name. Matches `REPORT.md`
   (`overflowX: 0`, all four matrices).
2. **The count-badge accessible name is correct.** `aria-hidden` Badge + `sr-only` companion
   (`:19-25`) yields the heading name *"My Palettes (6 saved)"*, not *"My Palettes6"*. Measured
   `h3.textContent = "My Palettes6 (6 saved)"` with the badge `aria-hidden`; the comment's claim
   holds.
3. **Long names truncate, they do not break layout.** An 88-character name renders *"A palette with
   an extremely long…"* at 1440 and 720 with no reflow.
4. **The delete-all row mirrors correctly.** `justify-end` is logical: the button moves from the
   pane's inline-end at x 1188 (LTR) to x 224 (RTL). No physical-direction leak there.
5. **Producer PRM is honoured where the producer owns it.** Under `reducedMotion: "reduce"` the card
   and its cast both compute `transition: … 0.1s`. The PRM defect (D-15) is this component's
   hand-passed Sortable options, not the design system.
6. **The `EmptyState` mark is §7-compliant.** Exactly three `WatercolorDot`s plus dashes,
   `aria-hidden="true"`, static (`EmptyState.vue:38-49`).
7. **`demo/ui/` is not forked.** `card`, `button`, `badge` are one-line glass-ui re-exports. The
   design-system defect (D-26) is a bypass at the consumption site, not a local reimplementation.
8. **Reorder persists.** Store order survives reload once the probe stops re-seeding on navigation.
   Pass 2's retraction of the "lost on reload" claim is correct; I did not reproduce the loss either.
9. **Zero page errors, zero component console errors** on `/#/palettes` in every run. The only
   console error is the dev `VITE_API_URL` banner, which is environment, not component.
10. **Corrupt bytes are not destroyed on read.** After `{{{not json` + reload, `localStorage` still
    holds the original string. D-24 is a *presentation* and *overwrite-risk* defect, not an
    immediate data-loss one.

---

## 16. Ranked disposition — the full ledger

| ID | Sev | Defect | Site | Status |
|---|---|---|---|---|
| D-1 | BLOCKER | first drag of every session permutes the whole library | `PalettesPane.vue:183-197` | replicated 3/3 |
| D-1b | BLOCKER | reorder under a filter rewrites hidden palettes | ibid + `usePaletteStore.ts:163-165` | replicated @40 |
| D-2 | BLOCKER | pastel identity chromatically dead in dark, 6.44× | `palettes-ramp.ts`, `:171-175` | replicated |
| D-3 | BLOCKER | exact 50/50, Picker in the inspector slot, Card-as-page | `PalettesPane.vue:2` | replicated |
| D-4 | BLOCKER | pointer-only `role="article"`, 0 focusable seats | `:82-97` | replicated (0 `aria-pressed`) |
| D-5 | BLOCKER | no-results paints the empty-library invitation | `:75-81` | replicated |
| D-6 | BLOCKER | export failure `console.warn`-only (forbidden verbatim) | `usePaletteExport.ts:22` | carried |
| D-7 | BLOCKER | no operation state; publish result is a transient flourish | `:199-209` | carried |
| **D-23** | **BLOCKER** | **one `searchQuery` behind two scope-declaring fields; cross-route leak** | `:34` + `usePalettePorts.ts:54` | **new** |
| **D-24** | **BLOCKER** | **corrupt storage rendered as an empty library (masking `catch`)** | `usePaletteStore.ts:23-33` | **new** |
| **D-27** | **BLOCKER** | **empty Library takes 50.00% of the stage; law caps at ≤15%** | `PalettesPane.vue:2` | **new** |
| D-8 | MAJOR | glass with no blur; 5 shadow species, 2 light directions | `:2` | carried |
| D-9 | MAJOR | unnamed unfocusable handle; no §5.2 keyboard reorder | `:184` | replicated |
| D-10 | MAJOR | fixed-height inner scroller at every viewport | `:2` | carried |
| D-11 | MAJOR | no owner-state selector; four §3.1 states collapsed to one | whole file | carried |
| D-12 | MAJOR | zero H1; identity is an `<h3>` | `PaneHeader.vue:28` | carried |
| D-13 | MAJOR | search field has no accessible name | `:33-37` | carried |
| D-14 | MAJOR | `.search-seated` overrides an axis the producer exposes | `:35` | carried |
| D-15 | MAJOR | `animation: 150` + `ghostClass` string; no token, no PRM branch | `:185-186` | replicated |
| D-16 | MAJOR | delete-all: 94%-empty band, first destructive tab stop | `:62-73` | carried |
| **D-25** | **MAJOR** | **delete-all scope = whole store while visible scope = filtered (0 of 6)** | `:62` vs `:83` | **new** |
| **D-26** | **MAJOR** | **palette entity has no `Card` shell; §3.1 tuple unimplementable** | `PaletteCard.vue:14-27` | **new** |
| **D-30** | **MAJOR** | **no design at scale: 4468px single column, no density/grouping/columns** | `PaletteCardGrid.vue:4` | **new** |
| D-17 | MINOR | three dead imports (`watch`, `onMounted`, `nextTick`) | `:128` | replicated |
| D-18 | MINOR | pre-3.5 refs, two `any`, unpruned `cardRefs` | `:84,177-181` | carried |
| D-19 | MINOR | badge/title optical centres differ by 9.6px | `:19-24` | carried |
| D-20 | MINOR | dashed ghost outline casting a physical shadow | `CurrentPaletteEditor` | carried |
| D-21 | MINOR | two import idioms for one design system | `:129-149` | replicated |
| D-22 | MINOR | empty-state type off-matrix **and inverted** (hint 16.4px > eyebrow 14.4px) | `:78-80` | replicated + measured |
| **D-28** | **MINOR** | **`ml-2` physical margin: title→badge gap 8.0px LTR, 0.0px RTL** | `:22` | **new, refutes pass-2 §12.2** |
| **D-29** | **MINOR** | **`mx-auto` inert on `w-full`; the ratio authority is two levels up** | `:2` | **new** |

---

## 17. The one-paragraph gestalt cure

Every BLOCKER except D-2 dissolves in the same transposition, and it is the one the canon already
wrote down. **Stop composing the Library as a Card and compose it as the Library.** Give
`/#/palettes` the owner workspace chassis §3.1 names: an owner-state selector (Draft / Workspace /
Published / Trash) across the top, the palette field at 64–66.7%, and a **selected inspector** at
33.3–36%. The inspector then absorbs, by construction, every job that is currently mis-seated —
rename, export, publish, delete, expand, pending/failure/durable operation state (D-6, D-7, D-16,
D-25) — and the card collapses back to what §5 says it is: a bounded entity slip with exactly one
named `<button aria-pressed>` seat (D-4) inside exactly one `Card` shell carrying the ratified quiet
tuple (D-26). Reorder becomes a model verb on the store's own ordinal, keyboard-first, and
SortableJS leaves the tree (D-1, D-1b, D-9, D-15). The three empty truths separate into three
compositions — *invitation* (content-hugging, ≤15%, D-27), *no matches* (query echoed, clear
affordance, D-5), *recovery* (diagnosis → export → confirmed reset, D-24) — and the field's query
becomes the field's own (D-23). D-2 alone is orthogonal and needs its own ruling: certify the
identity ramp on an axis its identity does not live on, or accept that a contrast-first walk will
always bleach a hue-carrying mark to white on a dark plate.

---

## 18. Corrections to the superseded pass

- **Refuted: `§12` negative proof 2, "RTL mirrors correctly … No LTR leakage."** The layout mirrors;
  the header's count-badge gap does not. Measured 8.0px LTR → 0.0px RTL, computed
  `marginLeft: 8px / marginRight: 0px` at `:22`. Filed as D-28. Pass 2's other RTL observations
  (pane x, `justify-end` row) I independently reproduce and they are correct — the leak is one
  utility class, not the composition.
- **Refined: `§12` negative proof 5, "No design-system fork … nothing hand-rolled in `demo/ui/`."**
  True as stated and I confirm it, but it reads as absolution and should not. The design-system
  defect is a *bypass at the consumption site*: the entity §3.1 requires to be a `Card` is a
  utility-class `div` (D-26). A clean barrel does not mean a clean boundary.
- **Extended: D-1b.** Pass 2 demonstrated the filtered-reorder rewrite at 5 palettes / 2 visible. At
  40 palettes / 11 visible, one drag moved twenty-nine unseen palettes: store head
  `probe-0…probe-7` → `probe-9, probe-0, probe-10, probe-11, probe-12, probe-13, probe-14,
  probe-15`. The blast radius is the whole library, not the filter's neighbourhood.
- **Extended: D-22.** Pass 2 records the role-matrix breach. The measured sizes make it a hierarchy
  inversion as well: the empty plate's *hint* renders at 16.400px and its *eyebrow* at 14.384px, so
  the lowest-priority line is the largest small-text on the plate, and it is in the machine voice.
- **Endorsed: pass 2's own retraction** of "reorder is lost on reload." I did not reproduce the loss
  either; the seed-on-navigation artifact explanation is correct.

---

## 19. Evidence base

| Source | Supplied |
|---|---|
| `audit/visual/shots/safari-{desktop,mobile}-{light,dark}/palettes.png` | the four tracked captures, read as images; OKLab pixel sampling of the dark title |
| `audit/visual/REPORT.md` `/#/palettes` rows | 0 page errors, 0 console errors, `overflowX 0`, 8 small tap targets desktop / 4 mobile, 1 nameless button |
| `scratchpad/palpane-D/probe.mjs` | state matrix: empty / populated / no-match / cross-pane leak / corrupt storage, both schemes |
| `scratchpad/palpane-D/probe2.mjs` | stage geometry, PRM, RTL, forced-colors, 720px, 40 palettes, filtered-drag mutation |
| `scratchpad/palpane-D/probe3.mjs` | empty-state dead tail, wrapper shares, PRM computed transitions, RTL span geometry |
| `scratchpad/palpane-D/probe4.mjs` | the D-1 replication: 3 fresh contexts + 3 consecutive drags |
| `scratchpad/palpane-D/probe5.mjs` | LTR/RTL badge gap decomposition |
| `node_modules/@vueuse/integrations/dist/useSortable.js:11-26,64-82` | the surviving-`onUpdate` mechanism, source pasted |
| `PROPORTION-AUDIT.md`, `VISUAL-CONSTITUTION.md`, `PALETTE-CONTRACT.md` | binding law, quoted verbatim per finding |

**State coverage gap (INFO).** `/#/palettes` has **no** capture in the `forced-colors-desktop`,
`zoom-200-desktop`, `rtl-desktop`, `rtl-mobile`, `reduced-motion-desktop` or `keyboard-focus-desktop`
matrices — those directories carry only `picker`, `browse`, `gradient`, `blob`, `adminusers`. Six of
the states this challenge is required to interrogate have never been photographed for this route. I
drove them live instead; I record the matrix gap because a state nobody has looked at is a state
nobody has designed. One consequence I could not settle: the ramp relies on `color: transparent` +
`background-clip: text` (computed under `forcedColors: "active"`: `color rgba(0,0,0,0)`,
`backgroundClip: text`), and WebKit does not implement forced-colors, so whether the identity
survives a real Windows High Contrast UA is **untested** — recorded as a hypothesis, not a finding.

**Environment note.** Every run emits `[value.js] value.js dev is MISCONFIGURED: … no VITE_API_URL`.
This blocks *server* palette calls only. Every measured finding above exercises the local
`localStorage` path (`usePaletteStore.ts:6`, key `color-palettes`), which is unaffected. D-7's
publish arm is reported from source, not from a blocked request.
