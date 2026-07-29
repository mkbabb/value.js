# CHALLENGE-D — `demo/palettes/PalettesPane.vue` — the design is flawed

## Model receipt

I observe myself to be **Opus 5 (1M context)**, exact model id `claude-opus-5[1m]`. This seat was
spawned with an explicit Opus 5 declaration and the served tier matches it. This is a declared
seat, not an inherited one.

> **Supersedes** the 2026-07-28 11:51 pass at this path. That pass is replaced, not merged: I
> re-derived every claim from the tree and the live app. Where I reached a different result I say
> so explicitly (§14, *Corrections to the superseded pass*). One of its headline claims — that
> reorder is lost on reload — is a **measurement artifact** and is retracted here.

---

## 0. Verdict

**DEFECTIVE.** Seven BLOCKER, nine MAJOR, six MINOR.

The single worst result is not a proportion or a colour. It is this:

> **The first drag-to-reorder of every session permutes the entire library.** Asked to move row 1
> to slot 3, the component produces `P3,P4,P2,P5,P1` instead of `P2,P3,P1,P4,P5` — all five rows
> move, and the dragged row lands at the **opposite end** from where it was dropped. Reproduced
> 3/3 in fresh browser contexts. It **persists to `localStorage`**. Drags 2 and 3 in the same
> session are correct, so the defect is invisible to any manual test that drags twice.

Behind it sits the architectural fault that generates most of the rest: **`PalettesPane` is a
route composed as a `Card`.** The binding composition (`VISUAL-CONSTITUTION.md §3.1`) gives Library
a *field* at 64–66.7% plus a *selected inspector* at 33.3–36%. What ships is a 50.00/50.00 split
with a **Picker** in the inspector's slot. With no inspector, every job the inspector owns —
rename, export, publish, delete, expand, operation state — was pushed into the card body, which is
the exact "seven-mode omnibus" the constitution forbids by name. And with no inspector there is no
seat that owns selection, so the card became a `cursor:pointer` `role="article"` with no focusable
control at all.

Subject: `demo/palettes/PalettesPane.vue`, 212 lines. Branch `tranche-u`, HEAD `c654824e`.

---

## 1. Evidence base

| Source | What it supplied |
|---|---|
| `audit/visual/shots/safari-{desktop,mobile}-{light,dark}/palettes.png` | the four tracked Safari captures, read as images |
| OKLab pixel sampling of those PNGs | the dark-mode ramp collapse (§4) |
| `audit/visual/REPORT.json` rows for `/#/palettes` | `h1: 0`, `namelessButtons: 1`, tap-target list, zero page/console errors |
| live WebKit + Chromium probes vs `http://localhost:9000` | every rect, computed style, token value, tab order below |
| real mouse drags against the live sortable, 3 fresh contexts + a filtered case | §3 |
| `PROPORTION-AUDIT.md`, `VISUAL-CONSTITUTION.md`, `PALETTE-CONTRACT.md` | the binding law, quoted verbatim per finding |

Re-runnable probe scripts, all under
`…/6614e90c-8bd6-434f-b017-5ad4277c6e5e/scratchpad/`: `pp2.mjs` (state matrix), `drag2.mjs`
(the reorder reproduction), `tab.mjs` / `tabc.mjs` (keyboard, WebKit vs Chromium), `fine.mjs`
(baselines, gaps, chrome), `ramp-chroma.py` (pixel OKLab).

Every number below is measured. Nothing is labelled a hypothesis because nothing needed to be.

**Environment note.** The dev server emits one console error on every load: `value.js dev is
MISCONFIGURED: … no VITE_API_URL … targeting the cross-origin production API`. This blocks *server*
palette calls only. Every finding below exercises the **local `localStorage`** path
(`usePaletteStore.ts:6`, key `color-palettes`), which is unaffected. The one finding that touches
the network — D-7, publish — is reported from source, not from a blocked request.

---

## 2. Visual truth first

### 2.1 Desktop, both schemes — `shots/safari-desktop-{light,dark}/palettes.png`

The route paints two plates. Measured live at 1440×900, empty store:

```
picker   card  x=199  y=147.5  512 × 684.7
palettes card  x=729  y=147.5  512 × 684.7
```

Identical to the pixel. The Library — the protagonist of its own route — is exactly the size of a
tool that is not part of its composition. In the tracked (empty) capture the right half of a
1440px viewport is occupied by the words *"No saved palettes yet."*

Seed five palettes and it gets worse, because the two plates stop agreeing on any edge:

```
picker   card  x=199  y=147.5  512 × 684.7      top 147.5   bottom 832.2
palettes card  x=729  y=103.0  512 × 774.0      top 103.0   bottom 877.0
```

They are centre-aligned (both centres land on y≈490), so **neither the top nor the bottom edge
lines up — each is off by 44.5px.** A side-by-side pair should share at least one edge. This one
shares none. It is the first thing the eye catches in `C.png`, and it is a pure optical failure,
not a rule violation.

Inside that 462px content column I counted **five shadow recipes with two opposed horizontal light
directions**, all read from computed style:

| element | box-shadow | direction |
|---|---|---|
| pane `Card` | `8px 8px 0` @ α.8 light / .5 dark | down-**right** |
| `.search-seated` | `-2px 2px 0 …` | down-**left** |
| `CurrentPaletteEditor` | `-2px 2px 0 …` | down-**left** |
| delete-all button | `inset 0 1px 0 rgba(255,255,255,.4), …` | inset specular |
| each palette card | `-3px 3px 0, -5px 5px 0, -7px 7px 0` | down-**left**, ×3 |

The pane's light source is up-left; everything inside it has a light source up-right.
`VISUAL-CONSTITUTION.md §7` says palettes are *"matte specimen slips inside a glass workspace, **not
cartoon casters stacked within casters**"*. Measured: three casters per card, inside a card that is
itself a caster. That is casters within casters, literally.

### 2.2 Mobile, both schemes — `shots/safari-mobile-{light,dark}/palettes.png`

The split collapses to one 358×732 plate (good). But the plate is a fixed-height inner scroller:
`scrollHeight − clientHeight = 154` at 390px, **278** at 320px. See D-10.

### 2.3 The dark-mode treatment

Crop the heading from both tracked desktop captures and the failure is unmistakable
(`scratchpad/hdr-safari-desktop-{light,dark}.png`): in light, *Palettes* is a saturated
purple→crimson→burnt-orange fan. In dark it is **white with a faint blush**. §4 measures it.

---

## 3. BLOCKER D-1 — the first drag of every session permutes the whole library

### Reproduction (deterministic, 3/3 fresh WebKit contexts, `scratchpad/drag2.mjs`)

Seed 5 palettes, load `/#/palettes`, drag row 1's handle down onto row 3, read `localStorage`:

```
=== TEST1 run 1: FIRST drag after load — move row1 down onto row3
  store before: P1,P2,P3,P4,P5
  store after : P3,P4,P2,P5,P1    (intended: P2,P3,P1,P4,P5)
=== TEST1 run 2 …  store after : P3,P4,P2,P5,P1    (intended: P2,P3,P1,P4,P5)
=== TEST1 run 3 …  store after : P3,P4,P2,P5,P1    (intended: P2,P3,P1,P4,P5)
```

Every one of the five rows moves. The dragged row lands at position **5** — the far end from the
slot it was dropped on.

Then, in one continuous session:

```
=== TEST2 same session, three consecutive drags (row1 -> row3 each time)
  drag#1: P1,P2,P3,P4,P5  ->  P3,P4,P2,P5,P1   intended P2,P3,P1,P4,P5   *** WRONG ***
  drag#2: P3,P4,P2,P5,P1  ->  P4,P2,P3,P5,P1   intended P4,P2,P3,P5,P1   OK
  drag#3: P4,P2,P3,P5,P1  ->  P2,P3,P4,P5,P1   intended P2,P3,P4,P5,P1   OK
```

**Only the first drag is wrong.** That is how it shipped: any hand-test that drags twice sees a
correct result the second time and moves on.

### Mechanism (derived from source, then confirmed against the measurement)

`PalettesPane.vue:183` —

```ts
useSortable(sortableEl, pm.filteredSaved.value, {
    handle: ".drag-handle", animation: 150, ghostClass: "opacity-30",
    onEnd(evt) { … }
});
```

`pm.filteredSaved` is a `ComputedRef`. Passing `.value` hands `useSortable` a **plain array**, not
the ref. Three facts then compose:

1. `useFilteredList.ts:9` returns `items.value` **unchanged** when the query is empty — so that
   plain array *is the very array object the `savedPalettes` computed currently caches*.
2. `@vueuse/integrations` supplies a `defaultOptions.onUpdate` and spreads it **before** the
   caller's options (`dist/useSortable.js:14-15,32-35`). The caller passes `onEnd`, never
   `onUpdate`, so the default survives. It calls `moveArrayElement(list, …)`, and because
   `isRef(list)` is false it takes the **no-copy** branch: `const array = toValue(list)` then
   `array.splice(from, 1)` **synchronously**, deferring the re-insert to `nextTick`.
3. SortableJS dispatches `update` → `sort` → `end` for a same-list move
   (`sortablejs/modular/sortable.esm.js:2002-2028`). So `onUpdate` runs **first**.

By the time `onEnd` executes, the array it is about to read has already had an element spliced out
of it, and the computed is still clean so it hands back that same mutilated array. Trace it:

```
A = [P1,P2,P3,P4,P5]              the cached computed array
onUpdate: A.splice(0,1)        →  A = [P2,P3,P4,P5]      (P1 removed, re-insert deferred)
onEnd:    ids = A.map(id)      →  ["2","3","4","5"]      four ids for a five-item library
          ids.splice(0,1)      →  moved = "2"; ids = ["3","4","5"]
          ids.splice(2,0,"2")  →  ["3","4","2","5"]
reorderPalettes(["3","4","2","5"])
    usePaletteStore.ts:157-160 → [P3,P4,P2,P5]
    usePaletteStore.ts:163-165 → append everything not named → [P3,P4,P2,P5,P1]
```

`[P3,P4,P2,P5,P1]` — **exactly the measured result.** From drag 2 onward the captured array is a
detached corpse (the store write minted a fresh one), `onUpdate`'s splice hits nothing that is
rendered, and `onEnd` reads a correct five-item array — which is why the defect vanishes after
first use.

### D-1b — reordering under a filter silently rewrites palettes the user cannot see

```
=== TEST4 reorder WHILE filtered (query 'zebra')
  store before: P1,P2,P3,zebra one,zebra two
  visible     : 2 rows
  store after : zebra two,zebra one,P1,P2,P3   (intended: P1,P2,P3,zebra two,zebra one)
```

`onEnd` maps only `filteredSaved` ids; `reorderPalettes` places those first and appends the rest
(`usePaletteStore.ts:163-165`). Swapping two visible rows **hoisted both to the top of the library
and pushed three hidden palettes to the bottom.** No confirmation, no undo, and no way for the user
to observe that it happened.

### Cure — architectural, not a patch

Delete the `useSortable`/SortableJS dependency from this component. Reorder is a *model* operation
on an *ordinal*, and the constitution already specifies it as one
(`VISUAL-CONSTITUTION.md §5.2`, row *vertical list/review reorder*: Space grabs, Up/Down move,
Space drops, Escape cancels, *"every move announces item and `position of total`"*). A named
`<button>` reorder control emitting `move(id, delta)` against the **store's own order** — never a
filtered projection, never a captured array — satisfies §5.2, kills D-1, D-1b and D-9 together,
and removes a library. Pointer drag then layers over the same model verb, which is what §5.2's
last line demands: *"Pointer drag, arrow movement, and numeric entry must resolve to the same model
value or ordinal."*

---

## 4. BLOCKER D-2 — the pastel-rainbow identity is chromatically dead in dark

### Law

`VISUAL-CONSTITUTION.md §2`, verbatim: *"The pastel-rainbow identity has exactly two textual
coordinates: the `Palettes` Dock destination and the `Palettes` substring in the Library heading
`My Palettes`. … **Both coordinates render in light and dark**."* This is one of exactly **two**
sanctioned colour-bearing text sites in the entire product.

### Measured — live computed root tokens, WebKit 1440, both schemes

```
LIGHT  --palettes-ramp-title-0  oklch(47.093%  0.188343  329.834)
       --palettes-ramp-title-1  oklch(47.093%  0.188343    9.834)
       --palettes-ramp-title-2  oklch(47.093%  0.124795   49.834)      mean C = 0.16716

DARK   --palettes-ramp-title-0  oklch(95.832%  0.033662  329.834)
       --palettes-ramp-title-1  oklch(95.832%  0.021053    9.834)
       --palettes-ramp-title-2  oklch(95.832%  0.023120   49.834)      mean C = 0.02594
```

- **dark chroma = 15.5% of light. A 6.44× collapse.**
- ramp arc, first→last stop: **ΔE(OKLab) 0.2071 light vs 0.0374 dark — 5.5× less.** The "3-stop
  analogous fan" is not a fan in dark; it is white carrying three imperceptible tints.
- the dark stops are also **non-monotonic**: C = 0.0337, 0.0211, 0.0231. The middle stop carries
  *less* chroma than either neighbour, so what little colour survives reads as a wobble, not a fan.

Independent confirmation by pixel-sampling the tracked Safari captures (`ramp-chroma.py`, ink
pixels of the *Palettes* glyphs): light mean C **0.1649**, dark mean C **0.0227**. Neutral `My`
ink measures C 0.0061 light / 0.0063 dark. **The dark "identity" carries 3.6× the chroma of the ink
that is supposed to be neutral** — and that is the entire distance between brand and no-brand.

### Why — and why it is a design fault, not an arithmetic one

`palettes-ramp.ts` composes `certifyAccentInk`, whose doc promises *"pastel in dark (light ink on
the dark card) … the near-black wreck cannot recur"*. It did not recur; the opposite one did.
Measured against the same composited dark plate the letters sit on (sampled rgb `(94,72,65)`,
relative luminance 0.0740):

```
shipped dark ramp ink rgb(255,236,240)               contrast 7.47:1
declared floor (RAMP_LARGE_TEXT_CONTRAST_FLOOR = 3)  contrast 3.00:1
overshoot                                            2.49×
Y required for exactly 3:1 = 0.3219        shipped ink Y = 0.8754
```

The walk does not stop at its floor; it runs to the end of its reach, arriving at OKLCH L 0.958
where the sRGB cusp allows almost no chroma at any hue. **It spends the entire chroma budget buying
contrast nobody asked for.**

That the pastel band is genuinely reachable at the declared floor is not opinion — I converted
candidates back to sRGB and measured them against the same plate:

```
oklch(0.72 0.150 329.8) → rgb(216,127,209)   3.19:1   in gamut
oklch(0.75 0.140   9.8) → rgb(248,134,154)   3.57:1   in gamut
oklch(0.70 0.130  49.8) → rgb(222,132, 79)   3.04:1   in gamut
```

**C ≈ 0.13–0.15 at the declared 3:1 floor — roughly 6× the shipped dark chroma, in gamut, on the
same plate.** The design is not gamut-limited. It is over-certified.

### D-2b — the "per-site floor split" buys ΔE 0.0138 in light and exactly 0 in dark

`PalettesPane.vue:171-175` binds an inline `:style` that aliases three `--palettes-ramp-title-*`
tokens into the shared recipe's slots, with duplicated literal fallbacks. Measured payoff against
the menu-site tokens:

| | stop 0 | stop 1 | stop 2 |
|---|---|---|---|
| light | byte-identical → ΔE 0 | byte-identical → ΔE 0 | **ΔE(OKLab) 0.0138** |
| dark | byte-identical → ΔE 0 | byte-identical → ΔE 0 | byte-identical → **ΔE 0** |

A second full resolver invocation, three extra root tokens, a per-instance `:style` override and
six duplicated OKLCH literals, to move **one of three stops by 0.0138 ΔE in one of two schemes** —
below the OKLab JND. This is simultaneously an owner-edict-3 contrivance and an owner-edict-5
per-instance override of a root recipe (`utils.css:192`), and `PROPORTION-AUDIT.md §5 law 8`
applies verbatim: *"Real rendered relation wins over token intent … token presence alone cannot
close a row."*

### Cure

Stop the walk **at** the floor (bisection) instead of running it to reach, and hold chroma at the
cusp for the L actually chosen. Then delete `rampTitleVars` and the whole `--palettes-ramp-title-*`
family: with a floor-stopping walk the two sites differ by the honest amount their two floors
imply, expressed once in `useViewAccents` and consumed through the one `.palettes-ramp-text`
recipe. Net: one resolver, three tokens, zero per-instance style, and an identity that survives
dark mode.

---

## 5. BLOCKER D-3 — the desktop composition is an exact 50/50 with a Picker in the inspector's slot

### Law

`VISUAL-CONSTITUTION.md §3` law 1: *"A two-part desktop scene is **earned**, not default. A P122
instrument chooses exactly `golden` (61.8033989% / 38.1966011%) or `preview-dominant`
(66.6666667% / 33.3333333%); the display-rounded protagonist law is 61.8–66.7%."*

`§3.1`, the binding row for this exact member:

| Distinct member | Protagonist | Support / collapse |
|---|---|---|
| Library / My Palettes | owned Device Draft, Workspace, Published and Trash field at **64%…66.6666667%** when selected | complementary **selected action/history inspector** at 33.3333333%…36% |

and three lines later: *"Picker cannot stand in for About, **Browse cannot stand in for
Library**…"*

### Measured (live, WebKit 1440×900)

```
picker 512px      palettes 512px      combined 1024px
protagonist share = 512 / 1024 = 50.00%
```

**50.00% against a legal band of 61.8–66.7% — short by 11.8 to 16.7 points.** Not "close to
golden"; the exact arithmetic midpoint, which is the one ratio the law names as *un*earned.

Three further clauses fail at the same site:

- The 33.3–36% slot must hold a **selected action/history inspector**. It holds a **Picker** — an
  unrelated instrument with its own protagonist, its own `<h3>`, and its own WebGL canvas.
  `REPORT.json` records `canvas: 2` on this route.
- `§3` law 2: *"Empty secondary content occupies at most a narrow invitation tray (≤15% of the
  stage) or disappears. **It never receives half the viewport.**"* In the tracked capture the
  library is empty and receives 50.00%.
- `PROPORTION-AUDIT.md §4` row **PR-04** — *"Empty/equal companion Cards and nested housing"* —
  already carries the terminal verb **REMOVE**, owner W18: *"Collapse absent support; … one earned
  tier."* The register row for this exact family is ruled, and the ruling is not implemented.

The `Card` wrapper is the fault's root. `§3.1`: *"`Card` remains semantic housing for a bounded
object or specimen and is **never the default page primitive**."* `PROPORTION-AUDIT §5` law 1: *"A
Card houses one bounded object/specimen. A page region … does not become a Card by default."*
`PalettesPane.vue:2` opens `<Card tier="resting" class="… overflow-y-auto … h-full">` — a page
region wearing a Card, with its own scrollbar.

### Cure

Retire the `Card` root and compose the route as the owner workspace chassis §3.1 already specifies:
field at 64–66.7%, selected-palette inspector at 33.3–36%, no filler when nothing is selected. That
one move also supplies the seat D-4 is missing and the home D-7 needs.

---

## 6. BLOCKER D-4 — the palette card is a pointer-only `role="article"`; no keyboard can open one

### Law

`VISUAL-CONSTITUTION.md §5`, verbatim: *"A palette card is a bounded entity article, **not a
clickable `role=article`**, `listbox`/`option` composite, or seven-mode omnibus. **One native named
`<button type="button">` spans its specimen/identity region** and expresses inspector selection only
through `aria-pressed`."* `§3.1` repeats it and `PROPORTION-AUDIT §5` law 12 repeats it again.

### Measured (live, 5 seeded palettes, both schemes, 1440 and 390)

```
tag             DIV
role            article
tabindex        null
aria-pressed    null
aria-selected   null
inert           false
cursor          pointer
```

There is no button. There is no `tabindex`. **The card is not focusable in any engine.**

Expansion exists and is pointer-only. Card heights, measured:

```
before                      [100, 100, 100]
after POINTER click         [172.17, 100, 100]
after 6×Tab then Enter      [100, 100, 100]
```

Chromium tab order inside the pane, starting from the search field (`tabc.mjs`):

```
+1: <BUTTON> "Delete all saved palettes"
+2: <BUTTON> "Palette menu"
+3: <BUTTON> "Palette menu"
+4: <BUTTON> "Palette menu"
   … then out of the pane
```

Four tab stops, none of which is a palette. WebKit with default settings is worse — buttons are not
in Safari's default tab set, so the *entire* library reduces to one stop (`tab.mjs`):

```
+1: <BODY>   +2: <BUTTON "Palettes"> (dock)   +3: <INPUT "Search your palettes...">   … cycle
```

**In Safari — the browser this audit's matrix targets — the only keyboard-reachable thing inside
the Palettes pane is the search field.** Not the palettes, not their menus, not Delete all.

### D-4b — there is no hover state either

Computed style of a card at rest and under a real pointer hover, compared field by field:

```
rest  : {backgroundColor, boxShadow, outlineWidth, transform, opacity, filter}
hover : {backgroundColor, boxShadow, outlineWidth, transform, opacity, filter}
rest === hover ?  true      (byte-identical)
```

A `cursor: pointer` is the **only** signal that a 462×100 region is activatable.
`VISUAL-CONSTITUTION §4.1`: *"Selected, failed, pending, withdrawn and disabled states are never
colour-only."* Here they are not even colour — they do not exist. `PROPORTION-AUDIT §5` law 5
forbids *"operable ornaments without names"*; this is an operable region with no name, no role
semantics for activation, no focus state and no hover state.

### D-4c — `role="list"` owning `role="article"` is structurally invalid

`PaletteCardGrid.vue:3` sets `role="list"`; every child is `role="article"`. ARIA 1.2 gives `list`
the required owned element `listitem`. A list that owns articles owns nothing, and AT reports an
empty list wrapping loose articles.

### Cure

The §3.1 tuple, exactly as written: a noninteractive `article` root with **one native
`<button type="button" aria-pressed>`** spanning specimen + identity, owning activation, visible
selection and focus, driving the selected inspector that D-3's cure restores. Grid children become
`role="listitem"`, or the list role goes.

---

## 7. BLOCKER D-5 — "no search results" renders the empty-library invitation, contradicting its own header

### Reproduction (live, 5 seeded palettes, query `zzzqqq`, screenshot `F.png`)

The pane simultaneously displays:

- header Badge: **5**
- header sr-only companion: **"(5 saved)"**
- body eyebrow: **"· EMPTY PLATE ·"**
- body message: **"No saved palettes yet."**
- body hint: **"Add colors above, then save the set."**

The user has five saved palettes. The component tells them they have none, and the recovery advice
is wrong — the fix is to clear the search, not to save more colours. The contradiction is **200px
apart inside one 512px card**.

Source: `PalettesPane.vue:75-81`.

```vue
<PaletteCardGrid
    :empty="pm.filteredSaved.value.length === 0"
    empty-eyebrow="· empty plate ·"
    empty-text="No saved palettes yet."
    empty-hint="Add colors above, then save the set."
>
```

One hard-coded copy set, keyed on the **projection** being empty, used to describe the
**collection** being empty. Two semantically opposite states share one string.

The delete-all trigger survives this state too — its `v-if` keys on `savedPalettes.length > 0`
(line 62), not on what is rendered. So at zero visible results the library's only two focusable
controls are a search box and **"Delete all saved palettes"**.

### D-5b — the empty region is a live region that re-announces on filter changes

`EmptyState.vue:29` puts `role="status"` (implicit `aria-live="polite"`) on the invitation. Every
transition from ≥1 result to 0 results mounts it and announces *"· empty plate · No saved palettes
yet. Add colors above, then save the set."* — a false statement, spoken, mid-typing.
`VISUAL-CONSTITUTION §7` on live regions: *"never a routine live region: ordinary text uses
`aria-live="off"`."*

### Cure

Two states, two copies, one honest status line. `EmptyState` already carries the machinery — a
second `variant="error"` arm with `role="alert"`, a `detail` slot and an action slot
(`EmptyState.vue:15-28`) that `PaletteCardGrid` never forwards. Give the grid a `filtered` arm:
*"No palettes match "zzzqqq"."* with a **Clear search** action, and let the changed-result count
ride the owning status region per `VISUAL-CONSTITUTION §5.1` row *in-route filter*.

---

## 8. BLOCKER D-6 — export failure is `console.warn`-only, which the palette contract forbids verbatim

`PalettesPane.vue:96` wires the export action; `PalettesPane.vue:211` mounts the composable:

```ts
@export="(p, fmt) => onExport(p, fmt)"
const { onExport } = usePaletteExport();
```

`usePaletteExport.ts:13-23`:

```ts
try { … case "png": downloadExport(await exportAsPNG(palette)); break; }
catch (e) { console.warn("Export failed:", e); }
```

`PALETTE-CONTRACT.md` **Appendix W51** — the byte authority that *"may not be prose-compressed"* —
line 172, verbatim:

> *"A serializer either yields the bytes below or a visible terminal/retryable operation state —
> **never a partial download or `console.warn`-only result**."*

The forbidden construct is present, by name, at the site this pane owns. The same appendix (§8)
specifies the whole state machine that is missing: `captured | ready | retryable-failure |
terminal-failure | handoff-initiated`, with `failureCode` drawn from a closed five-member union.
`PROPORTION-AUDIT §4` **PR-08** rules the family **ADD-AFFORDANCE**: *"Pending/failure/export/
recovery truth only transient → Persistent entity status/recovery."*

A user who exports a 50-colour PNG and hits a quota error sees **nothing at all**.

### Cure

`onExport` returns a typed result; the selected inspector (D-3's cure) renders the durable operation
state the appendix already specifies. No new component, no toast.

---

## 9. BLOCKER D-7 — the Library has no operation-state surface at all

`libraryPort` (`usePalettePorts.ts:145-161`) exposes sixteen members. **Not one is a pending, error
or status flag.** Compare `browsePort` directly beneath it, which exposes `browsing`, `browseError`,
`loadingMore`, `sortLoading`. The Library was built without the vocabulary.

Consequences, each traced to a line:

1. **Publish has no pending state.** `PalettesPane.vue:199-209`: `onPublish` `await`s a network
   round trip with the trigger left live — no `disabled`, no `aria-busy`, no spinner. Two clicks
   fire two publishes.
2. **The only result is a transient in-card flourish.** `card.showFeedback(result.message, …)`
   (line 206). `VISUAL-CONSTITUTION §5`: *"Persistent operation state stays with the
   entity/workspace. A transient flourish may celebrate success but **never carries the only
   truth**."* It carries the only truth.
3. **One outcome path drops silently.** Lines 202-204:
   ```ts
   const id = palette.id;
   if (id == null) return;      // ← publish result discarded, success or failure
   ```
   This is also **dead code**: `savedPalettes` is typed `Palette & { id: string }`
   (`usePaletteStore.ts:50-53`) and `useFilteredList` is generic and order-preserving, so every
   member of `filteredSaved` has an `id`. An unreachable branch that would swallow a real outcome
   if it were reachable — owner edict 2 (no masking fallbacks) at a site the type system already
   proved safe.
4. **No storage-recovery state exists.** `VISUAL-CONSTITUTION §7`: *"Unsupported/corrupt palette
   storage replaces the Library body inside its existing main with one content-hug recovery
   article: diagnosis, preservation/export, then separately confirmed reset. … It is **never**
   rendered as an empty library, silent reset, migration choice, overlay, or companion pane."*
   `usePaletteStore.ts:24-31` catches a corrupt parse and `return defaultStore` — which renders as
   an empty library, the first forbidden form, after which the user's bytes are overwritten on the
   next write.

### Cure

Add `pending: Set<id>`, `error: Map<id, OperationError>` and a durable `lastResult` to
`libraryPort`, and render them in the inspector. `PR-08`'s accountable primary (W23) already owns
this row.

---

## 10. MAJOR findings

### D-8 · Material: glass with no blur, over a live animated ground

Measured on the pane `Card` in both schemes:

```
light  background-color  oklab(0.928273 0.005506 0.013193 / 0.664)   backdrop-filter: none
dark   background-color  oklab(0.395241 0.009680 0.016528 / 0.7536)  backdrop-filter: none
```

`VISUAL-CONSTITUTION §2`: *"Glass earns its blur by revealing live content; otherwise it is a
neutral well."* This surface is 66–75% opaque with **zero blur** over the chromatic ambient field,
so the aurora's high-frequency structure passes through the text ground unmodulated — which is why
the composited plate behind *Palettes* is a gradient rather than a constant, and why the "certified
against the resting plate" claim in `palettes-ramp.ts` is certifying against a value that varies
across the word. It is neither glass (no blur) nor a well (not opaque). The `tier="resting"`
declaration at `PalettesPane.vue:2` buys nothing at render time.

Plus the five-shadow / two-light-source inventory of §2.1, against `PROPORTION-AUDIT §4` **PR-05**
(*"Dividers, caster shadows and corner marks repeat a boundary"* → **REMOVE**) and the §3.1 entity
tuple, which fixes **`shadow=false`** for every Library palette Card. Measured: three shadow layers
per card.

### D-9 · The reorder handle is an unnamed, unfocusable 16×16 `<svg>`

```
tag         svg
rect        16 × 16      (32 × 32 only under 2× type scale)
aria-label  null
role        null
tabindex    null
<title>     null
.focus()    → document.activeElement === handle : false
```

`VISUAL-CONSTITUTION §5`: *"An optional reorder handle remains a **separate named** control."*
`PROPORTION-AUDIT §5` law 5: *"A small icon/mark is either data, status, labeled action, drag
affordance, focus/selection register or removed. Decorative controls and **operable ornaments
without names are forbidden**."*

And the whole of `§5.2`'s *vertical list/review reorder* grammar — Space grabs, Up/Down move,
Home/End, Space drops, Escape cancels, *"every move announces item and `position of total`"* — is
**entirely absent**. There is no keyboard reorder path of any kind. On touch, a 16px handle also
competes directly with the page-scroll gesture.

### D-10 · The library is a fixed-height inner scroller at every viewport

`PalettesPane.vue:2` — `h-full overflow-y-auto`. Measured `scrollHeight − clientHeight`:

| viewport / condition | pane inner scroll | document scroll |
|---|---:|---:|
| 1440×900, 5 palettes | 113px | — |
| 1440×900, 40 palettes | **4033px** | — |
| 390×844, 5 palettes | 154px | — |
| 320×720, 5 palettes | 278px | — |
| **720×450 (= 200% browser zoom on 1440×900), 5 palettes** | **533px** | **0px** |

The last row is the serious one: at 200% zoom the plate is 512×338 and hides 533px — **61% of the
content is out of view inside a nested scroller on a page that cannot itself scroll.**

`VISUAL-CONSTITUTION §3` law 6: *"**Mobile uses one document-scrolling stage**→inspector→action
sequence beneath the same top dock."* Measured: not one viewport uses document scrolling.

At 40 palettes there is no virtualization, no pagination and no "load more" — all 40 cards and 68
focusables are in the DOM, and the sticky `PaneHeader` sticks inside the inner scroller rather than
the page.

### D-11 · There is no owner-state selector, and §3.1 makes one mandatory

`VISUAL-CONSTITUTION §7`: *"Device Drafts, unpublished Server Workspaces, Published lineages, and
Trash are **explicit, non-interchangeable owner states**."* `§3.1` puts the *"owner-state selector"*
first in the mobile sequence. What ships is one undifferentiated list of `filteredSaved`. Four
required states collapsed to one — with no route to Trash, and therefore no undo behind D-16's
Delete all.

### D-12 · The route has zero H1; the Library identity is an `<h3>` at 41.888px

`REPORT.json` records `"h1": 0` in all four Safari matrices; my live probe confirms it. The full
heading outline of `/#/palettes` is:

```
H3  "92.0%,88.8,20.0"      ← the Picker's numeric readout
H3  "My Palettes"          ← the Library identity, Fraunces 41.888px, weight 400
```

`VISUAL-CONSTITUTION §4.1`: *"**Each route has one H1** and exactly one stable main landmark."*
`§5.1` makes the H1 the focus target for every in-app route change — with none present, a Dock
navigation to Palettes has nowhere to land focus, which is why the search field sits at tab stop
**26 of 27** on its own route. `PROPORTION-AUDIT §5` law 11 supplies the mirror clause: *"A
display-sized readout is not therefore a document heading."* Here the Library's identity is a
document heading wearing display size, ranked peer to a number.

### D-13 · The search field has no accessible name

```
aria-label       null
aria-labelledby  null
id               ""            → no <label for> can exist
placeholder      "Search your palettes..."
```

A placeholder is not an accessible name; it disappears on input. Measured height: **24.6px** at
1440, **22px** at 390 and at 320 — under the 24px target floor on both mobile widths.

Partly a producer gap worth relaying: glass-ui 7.0.0's `SearchBar` exposes
`{modelValue, placeholder, icon, tag, size, surface, variant}` — **no label/aria-label/id prop** —
and an `aria-label` passed as a fall-through attribute lands on the wrapper, not the input.

### D-14 · `.search-seated` is a per-instance override of an axis the producer already has

`PalettesPane.vue:35` applies `class="search-seated"`, with a source comment that labels it
*"interim, booked onto the P3 seated rung / ASK-D"*. The recipe (`utils.css:132-138`):

```css
.search-seated { background: var(--well-bg); backdrop-filter: none;
                 border: 1.5px solid var(--card-edge);
                 box-shadow: var(--shadow-cartoon-sm); max-width: none; }
```

Three consumers apply it identically — `PalettesPane.vue:35`, `BrowsePane.vue:12`,
`admin/AdminPane.vue:14` — each carrying the same "interim" comment. glass-ui 7.0.0's `SearchBar`
already accepts `surface?: Surface` where `SURFACES = ["glass","veil","opaque"]`
(`_shared/axes.d.ts`), which is precisely the "well fill, no blur" this class hand-rolls. Owner
edict 4 (*variants belong in glass-ui*) and edict 5 (*style at the root, never per-instance*), with
a named producer alternative and three sites waiting on it. It also supplies shadow species #2 of
the five in §2.1.

### D-15 · Motion is one bare numeric literal — no token, no producer axis, no PRM branch

`PalettesPane.vue:185-186`:

```ts
animation: 150,
ghostClass: "opacity-30",
```

The only motion this component authors. Measured facts:

- `--animation-slide-sm/md/lg` do **not exist** in this tree — `grep -rn "animation-slide" demo src`
  returns nothing. The literal cannot be tokenized against the register the standing law names,
  because the register itself is missing.
- glass-ui 7.0.0 exposes a motion-weight axis `MOTIONS = ["full","reduced","off"]`
  (`_shared/axes.d.ts`). This JS animation bypasses it entirely.
- SortableJS's `animation` is a JS-driven transform loop; `prefers-reduced-motion` has **no effect**
  on it. Confirmed: the PRM run (`pp2.mjs 4`) produced geometry identical to the non-PRM run, and
  there is no PRM branch anywhere in the file. `VISUAL-CONSTITUTION §6`: *"Reduced motion resolves
  directly to the final geometry and stable chromatic state."*
- `ghostClass: "opacity-30"` is a Tailwind utility passed as a JS string — styling smuggled into a
  behaviour config, invisible to every CSS tool.

### D-16 · Delete all: a 94%-empty layout band, a chip that is not a ghost, first destructive tab stop

```
row rect         x=754  w=462
button rect      x=1188 w=28  h=28      → 434 of 462px (94%) of the row is empty
computed bg      oklab(0.414856 … / 0.6304)      border-radius 9999px
computed shadow  inset 0 1px 0 rgba(255,255,255,0.4), …
Chromium tab position inside the pane: +1 (immediately after the search field)
```

Three separate faults:

1. The source comment (lines 56-61) records that the "{n} palettes" line was excised because *"it
   existed only to left-balance this button"*. The balance was removed and the button kept, leaving
   an orphan glyph owning a full 462px band. Clearly visible in `C.png`, `D.png`, `F.png`.
2. The same comment claims the trigger was *"DEMOTED … to a quiet ghost"*. Measured, it renders as
   a **63%-opaque filled circular chip with an inset specular highlight** — a raised pill.
   `PROPORTION-AUDIT §5` law 8: *"Real rendered relation wins over token intent."* `variant="ghost"`
   is token intent; the rendered object is a chip.
3. Ordering. An irreversible bulk delete is the **first** control a keyboard user reaches after the
   search field, ahead of all five palettes — and with no Trash state (D-11) there is no undo behind
   the confirm dialog.

---

## 11. MINOR findings

### D-17 · Three dead imports

`PalettesPane.vue:128` imports `watch`, `onMounted`, `nextTick`. Each appears exactly **once** in
the whole file — in that import statement:

```
$ for s in watch onMounted nextTick; do echo "$s: $(grep -c "\b$s\b" demo/palettes/PalettesPane.vue)"; done
watch: 1     onMounted: 1     nextTick: 1
```

### D-18 · Pre-3.5 template-ref idioms, two escapes from the type system, an unpruned record

```ts
const cardRefs = reactive<Record<string, InstanceType<typeof PaletteCard>>>({});          // :177
const sortableGridRef = ref<InstanceType<typeof PaletteCardGrid> | null>(null);           // :180
const sortableEl = computed(() => (sortableGridRef.value as any)?.$el as HTMLElement …);  // :181
:ref="(el: any) => el && (cardRefs[palette.id] = el)"                                     // :84
```

`useTemplateRef` is the 3.5 idiom (owner edict 7). `cardRefs` is written on every mount and **never
deleted on unmount**, so it retains a component instance for every palette ever rendered, including
deleted ones. Two `any` escapes in 212 lines, both avoidable — `useTemplateRef<HTMLElement>` on the
grid's root removes the `$el` cast entirely.

### D-19 · Badge and title do not share an optical centre

```
title  y=141.0  h=45.1   centre 163.5
badge  y=160.1  h=26.0   centre 173.1        Δ = 9.6px (37% of the badge's own height)
```

A 16.4px Fira Code pill baseline-aligned against a 41.888px Fraunces display glyph. Baseline
alignment is conventional for inline badges; for a count pill beside a display identity, optical
centring is. Visible in every capture.

### D-20 · The editor is a dashed ghost that casts a physical shadow

```
border  dashed 1px      box-shadow  -2px 2px 0 …, …
```

A dashed outline says *placeholder, not yet real*; a cast shadow says *object above the plate*. The
surface asserts both. Shadow species #3 of the five.

### D-21 · Two import idioms for one design system in one file

`Card`/`Button`/`Badge` arrive via `../ui/*` (pure glass-ui re-exports — verified;
`demo/ui/card/index.ts` is one `export … from "@mkbabb/glass-ui"` line), while `Dialog*` and
`SearchBar` import from `@mkbabb/glass-ui/dialog` and `/search` directly. Two paths to one producer,
20 lines apart.

### D-22 · The empty state uses three type roles, two outside the closed matrix

`VISUAL-CONSTITUTION §4`: *"This matrix is closed across all eighteen compositions."* Measured
computed styles of the copy `PalettesPane.vue:78-80` supplies:

| text | rendered | matrix role for that content | verdict |
|---|---|---|---|
| "· empty plate ·" | Fira Code 14.384px, uppercase, ls 2.589px | `mono-caption` *"where the content is a caption"* | defensible |
| "No saved palettes yet." | **Fraunces 700**, 25.888px | prose/help → `text-prose`, Plus Jakarta Sans | **outside** |
| "Add colors above, then save the set." | **Fira Code** 16.4px | prose/help → `text-prose`, Plus Jakarta Sans | **outside** |

Mono is reserved for *"value, code, or provenance"*; Fraunces for display/identity. And the empty
message renders at **weight 700** while the pane's own identity renders at **weight 400** — the
placeholder is bolder than the protagonist, against `§3` law 8. (The rendering is
`EmptyState.vue`'s; the copy choice is this pane's.)

---

## 12. Negative proof — what I attacked and could not break

Recorded so the next seat does not re-spend the probes:

1. **No horizontal overflow anywhere.** `scrollWidth − clientWidth = 0` at 1440, 720, 390, 320,
   under RTL, at 2× type scale, with a 76-character palette name, and at 40 palettes. `REPORT.json`
   agrees: `overflowX: 0` in all four Safari matrices.
2. **RTL mirrors correctly.** Pane x 729 → 199; the `justify-end` delete row moves to the logical
   end (x 1188 → 224); grid, cards and handles all mirror (handles x 768 → 656). No LTR leakage.
3. **The count-badge a11y construction works.** `aria-hidden` on the Badge plus an `sr-only`
   companion (lines 19-25) gives the heading the accessible name *"My Palettes (5 saved)"*, not
   *"My Palettes5"*. The comment's claim is true.
4. **Vertical rhythm inside the content stack is exact.** Gaps between search → editor →
   delete-row → grid measure **12, 12, 12** px in both schemes at every viewport. `gap-3` holds.
5. **No design-system fork.** `demo/ui/{card,button,badge}/index.ts` are one-line glass-ui
   re-exports. Nothing is hand-rolled in `demo/ui/` for this pane.
6. **Clean console.** Zero page errors and zero console errors on `/#/palettes` across all four
   tracked Safari matrices (`REPORT.json`). The one error I saw live is the dev `VITE_API_URL`
   banner, not the component.
7. **The empty invitation's mark is §7-compliant.** Exactly three `WatercolorDot`s plus dashes,
   `aria-hidden="true"`, static (`EmptyState.vue:38-49`).
8. **The light-scheme ramp meets its declared floor.** 5.77:1 against the composited resting plate,
   above the 3:1 large-text floor. And `My` is genuinely neutral — C 0.0061 light, 0.0063 dark — so
   `§2`'s neutral-`My` clause holds in both schemes.
9. **Long names truncate rather than overflow.** A 76-character name renders as *"A quite long
   palette display nam…"* with no layout break at 1440, 390 or 320.
10. **Reorder persists.** With the seed guarded so reload does not re-write it:
    `before reload P2,P3,P4,P5,P1 → after reload P2,P3,P4,P5,P1 — PERSISTED OK`.
11. **The 200%-zoom breakpoint fires.** At 720×450 CSS the two-card split correctly collapses to one
    pane. The zoom defect is D-10's nested scroller, not the layout.

---

## 13. Ranked disposition

| ID | Severity | Defect | Site |
|---|---|---|---|
| D-1 | BLOCKER | first drag of every session permutes the whole library | `PalettesPane.vue:183-197` |
| D-1b | BLOCKER | reorder under a filter rewrites hidden palettes' positions | ibid + `usePaletteStore.ts:163-165` |
| D-2 | BLOCKER | pastel identity chromatically dead in dark (6.44× collapse) | `palettes-ramp.ts` + `:171-175` |
| D-3 | BLOCKER | exact 50/50 split, Picker in the inspector slot, Card-as-page | `PalettesPane.vue:2` |
| D-4 | BLOCKER | pointer-only `role="article"`, no focusable seat, no hover state | `PaletteCard` via `:82-97` |
| D-5 | BLOCKER | no-results renders the empty-library invitation | `PalettesPane.vue:75-81` |
| D-6 | BLOCKER | export failure `console.warn`-only (forbidden verbatim) | `usePaletteExport.ts:22` |
| D-7 | BLOCKER | no operation state: no pending, error, or durable result | `usePalettePorts.ts:145-161` |
| D-8 | MAJOR | glass with no blur; 5 shadow species, 2 light directions | `PalettesPane.vue:2` |
| D-9 | MAJOR | unnamed unfocusable 16px handle; no keyboard reorder grammar | `:185` |
| D-10 | MAJOR | fixed-height inner scroller at every viewport (533px hidden @200%) | `:2` |
| D-11 | MAJOR | no owner-state selector; four required states collapsed to one | whole file |
| D-12 | MAJOR | zero H1; identity is an `<h3>` peer to a numeric readout | `PaneHeader.vue:28` |
| D-13 | MAJOR | search field has no accessible name; 22px tall on mobile | `:33-37` |
| D-14 | MAJOR | `.search-seated` per-instance override of glass-ui's `surface` axis | `:35` |
| D-15 | MAJOR | `animation: 150` — no token, no producer axis, no PRM branch | `:185-186` |
| D-16 | MAJOR | delete-all: 94%-empty band, chip not ghost, first destructive stop | `:62-73` |
| D-17 | MINOR | three dead imports | `:128` |
| D-18 | MINOR | pre-3.5 refs, two `any`, unpruned `cardRefs` | `:84,177-181` |
| D-19 | MINOR | badge/title optical centres differ by 9.6px | `:19-24` |
| D-20 | MINOR | dashed ghost outline that casts a physical shadow | `CurrentPaletteEditor` |
| D-21 | MINOR | two import idioms for one design system | `:129-149` |
| D-22 | MINOR | empty-state copy lands two of three roles outside the closed matrix | `:78-80` |

---

## 14. Corrections to the superseded pass

- **Retracted: "the reorder result is lost on reload."** My own first drag run appeared to show
  this, and the superseded pass asserts it. It is an instrumentation artifact: a Playwright
  `addInitScript` re-seeds `localStorage` on *every* navigation, including reload. With the seed
  guarded, reorder **persists correctly** (§12 item 10). This makes D-1 *worse*, not better — the
  scramble is durable — but the reload claim itself is false and must not enter the ledger.
- **Refined: D-1 is a first-drag defect, not a permanent one.** The superseded pass describes the
  reorder as uniformly doubly-applied. Measured, drags 2..n in a session are correct (§3, TEST2).
  The distinction matters for triage: it explains how this shipped, and it means any regression test
  must reload between drags or it will pass.
- **Refined: the empty tray does not occupy "90.2% of the stage."** Measured, the empty invitation
  is 462×218.1 inside a 512×684.7 pane — 28.7% of the pane, 14.4% of the two-card stage. The honest
  §3-law-2 finding is that the *empty Library* receives **50.00%** of the stage, which is what the
  law's own sentence forbids.

---

## 15. The one transposition

Every blocker except D-1 and D-6 is downstream of a single decision: **`PalettesPane` was written as
a `Card`, and a `Card` has no inspector.**

`VISUAL-CONSTITUTION §3.1` describes the Library as a workspace with two regions — a 64–66.7% field
and a 33.3–36% selected inspector. Build it as one `Card` and the inspector has nowhere to live, so:

- the 33.3–36% slot gets backfilled with an unrelated Picker → **D-3**;
- rename, export, publish, delete, expand and transient results have no home, so they move into the
  card body → the forbidden seven-mode omnibus, and **D-6**, **D-7**;
- selection has no destination, so no seat owns it → the card becomes a `cursor:pointer`
  `role="article"` with no focus, no hover, no `aria-pressed` → **D-4**;
- the pane must scroll its own body because it is a fixed-height plate rather than a page region →
  **D-10**;
- the plate needs a Card's chrome, so it earns a caster shadow, and its children earn theirs →
  **D-8**;
- the route's identity becomes a *card title* rather than a *route heading*, so it is an `<h3>` and
  the route has no `<h1>` → **D-12**.

**Retire the `Card` root.** Compose the route as the owner workspace chassis §3.1 already ratifies:
an owner-state selector, a palette field at 64–66.7%, a selected-palette inspector at 33.3–36% that
collapses when nothing is selected, the shell's `<main>` and single `<h1>` above it, and document
scrolling throughout. Then give the entity card the §3.1 tuple exactly — quiet, opaque, `sm`,
`shadow=false`, one named `<button aria-pressed>` seat, one separately named reorder control — and
drive reorder from a model verb over the store's own order rather than from a snapshot of a filtered
projection.

That single transposition closes D-3, D-4, D-5, D-6, D-7, D-8, D-10, D-11, D-12 and D-16, and makes
D-1's cure a two-line consequence rather than a patch.

---

*Report path: `docs/tranches/V/megatranche/audit/components/PalettesPane/challenge-D-design.md`*
