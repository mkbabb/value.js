# CHALLENGE-D · `CurrentPaletteEditor.vue` — the design is wrong

## Model receipt

I observe myself to be **Opus 5 (1M context)**, exact model id `claude-opus-5[1m]`. This seat was
spawned with an explicit Opus 5 declaration and runs as declared, not inherited. An undeclared or
inherited seat is a DEFECT; this one is neither.

---

## Seat, subject, substrate

| | |
|---|---|
| Axis | CHALLENGE-D — design: visual truth, state coverage, motion, design-system boundary, proportion/seat law |
| Subject | `demo/palettes/browser/card/CurrentPaletteEditor.vue` (312 lines), area `palettes` |
| Route | `/#/palettes` only — sole consumer `demo/palettes/PalettesPane.vue:41-54` |
| Repo | `/Users/mkbabb/Programming/value.js`, branch `tranche-u` |
| HEAD **as observed** | `f36f780c` (the brief named `c654824e`; the tree has advanced twice since). Subject file `git status --porcelain`: **clean** |
| Producer | `@mkbabb/glass-ui@7.0.0` |
| Run | **2026-07-28, pass 4.** Passes 1–3 preserved beside this file |
| This seat's probes | `probe-D10-pass4.mjs` · `probe-D11-pass4.mjs` · `probe-D12-pass4.mjs` · `probe-D13-pass4.mjs`; JSON beside each; frames in `frames-D10/` |
| Canon read | `PROPORTION-AUDIT.md`, `VISUAL-CONSTITUTION.md`, `PALETTE-CONTRACT.md`, `OPTICAL-BENCH-COMPOSITIONS.md` |

**Verdict: DEFECTIVE.** Five new findings (§B), one of them BLOCKER-class and not reachable by any
prior pass's instruments. Nothing banked is refuted; §D records the negative evidence, including one
claim a future seat would otherwise mis-file.

---

## What pass 4 is for

Passes 1–3 filed 31 findings between them. They exhaustively probed the component **at rest** —
empty, populated, hovered, RTL, forced-colors, dark, 390 px. What none of them did was **operate it
to completion and look at what the product does afterwards**, or check it against the *domain*
contract rather than the *visual* one. Both of those are design questions, and both were open.

So this pass drove the one live path the component still has — name it, commit it — and asked the
two questions nobody had asked:

1. **What does a successful save look like?** (§B · D4-01. It looks like a lie.)
2. **Does the editor know what a palette is?** (§B · D4-02. It does not — 1–50 is contractual and
   the editor accepts 80.)

Everything in §B is measured this session against the live dev server at `http://localhost:9000`.

---

## The one-sentence gestalt

**The component is materially indistinguishable from the artifact it produces, has no idea how big a
palette is allowed to be, and its single successful mutation ends in a frame where the header says
"2", the body says "none", the screen reader is told "No saved palettes yet", and the user's work is
nowhere on screen** — the file does not merely lack states, it *contradicts itself at the exact
moment it succeeds*.

---

# §B · New findings

## D4-01 · BLOCKER — the commit has no designed outcome; under an active filter it renders four contradictory truths in one frame, announces the opposite of what happened, and destroys focus

This is the headline. `frames-D10/p2b-after-save-under-filter.png` is a single live frame captured
immediately after a **successful** save. In it, simultaneously:

| where | what it says | truth |
|---|---|---|
| header badge, `PalettesPane.vue:21-26` | **`My Palettes  2`** | 2 palettes exist |
| the field | `· EMPTY PLATE ·` / **"No saved palettes yet."** | 0 palettes exist |
| the field's hint | **"Add colors above, then save the set."** | the user did exactly this, one second ago |
| the well header, `:11-16` | **"Start a new palette"** | the draft they built is gone |
| `localStorage["color-palettes"]` | `["Aurora Draft","Zebra"]` | the save **worked** |

Measured (`probe-D11-pass4.json` → `P2.after`):

```json
"storedNames": ["Aurora Draft", "Zebra"],
"cardCount": 0,
"emptyText": "· empty plate ·No saved palettes yet.Add colors above, then save the set.",
"headerBadge": "(2 saved)",
"wellHeader": "Start a new palette",
"activeElement": "BODY:",
"searchStillActive": "qqqzzz"
```

Three separate design failures compose here.

**(a) The success has no representation at all.** `saveCurrentPalette` at `:247-265` emits `saved`,
blanks the name field, and emits `clearCurrent`. There is no result state, no operation status, no
focus move, no scroll-to-artifact, nothing. `VISUAL-CONSTITUTION.md:116` fixes the contract for
exactly this event — *"successful command that deliberately navigates to a new resource | new
resource H1 | focused resource identity followed by **one durable operation result**; transient
celebration is silent."* There is neither the celebration nor the durable result. `:101` — *"Persistent
operation state stays with the entity/workspace."* Nothing persists.

**(b) The only live-region announcement the commit produces is false.** `EmptyState.vue:33` is
`role="status"`. When the save empties the draft and the new palette is filtered out, that status
region mounts and announces *"empty plate, No saved palettes yet, Add colors above, then save the
set."* A screen-reader user's sole feedback on a successful save is a statement that they own
nothing and an instruction to repeat the action. `VISUAL-CONSTITUTION.md:83` — *"Selected, failed,
pending, withdrawn and disabled states are never color-only. Role, accessible name, state/value and
**associated error/status are explicit**."* This one is explicit and wrong, which is worse than absent.

**(c) The commit destroys focus.** `activeElement: "BODY:"`. The commit button lives inside
`v-if="savedColorStrings.length > 0"` (`:118`). Saving clears `savedColorStrings`, so the button
**unmounts itself while focused**, and the browser falls back to `<body>`.
`VISUAL-CONSTITUTION.md:115` — *"exact connected opener on close, otherwise the nearest surviving
owning action"*; `:113` — *"no focus on removed content."* A keyboard user presses Enter and is
returned to the top of the document with no announcement and no visible change they can locate.

### Reproduction (exact)

```
localStorage["color-picker"]   = {inputColor, savedColors:[4 lab colors]}
localStorage["color-palettes"] = {version:1, palettes:[{id,slug,name:"Zebra",colors:[...],isLocal:true}]}
load /#/palettes
type "qqqzzz" into input[placeholder="Search your palettes..."]
type "Aurora Draft" into .dashed-well input
click .dashed-well button (last)
```
→ `probe-D11-pass4.mjs` § P2. Frames: `frames-D10/p2b-filter-no-results.png` (before),
`frames-D10/p2b-after-save-under-filter.png` (after).

**Note on the store schema.** Pass 4's first probe (`probe-D10-pass4.mjs`) seeded
`{palettes:[…]}` without `version`, which `usePaletteStore.ts:24-27` rejects in favour of
`defaultStore`. `probe-D11` re-ran with `{version:1, palettes:[…]}`. Both runs are preserved; the
D11 numbers are the ones quoted. I flag this because a future seat reusing the D10 seed will
silently probe an empty library.

**Cure (architectural, not a patch).** The commit's outcome is not this component's to invent
ad hoc — it belongs to the composition. `VISUAL-CONSTITUTION.md:45` gives the Library a *"selected
action/history inspector"*, and `:102` puts *"rename/lifecycle/export actions and durable operation
state"* there. Commit should land the new palette **as the selected inspector identity**, move focus
to it, clear the filter or say why the result is hidden, and leave one durable operation result on
the entity. That single relocation kills all three arms at once — and it is the same relocation
D3-04 already prescribes, which is why D4-01 is not a new owner but new *evidence* for that owner.

---

## D4-02 · MAJOR — the domain's contractual 1–50 palette cardinality has no representation anywhere in the editor, and the house already has the pattern

A palette's cardinality is not a preference. `PALETTE-CONTRACT.md:126` — *"A palette's content is
exactly **1–50** `CanonicalNamedColor` atoms."* The bound is enforced downstream in three places:

- `demo/palettes/export/reload.ts:191` — `if (parsed.orderedNamedColors.length < 1 || parsed.orderedNamedColors.length > 50)` → terminal reject
- `api/README.md:24` — *"Palettes are slug-addressed collections of 1–50 color stops."*
- `PALETTE-CONTRACT.md:192` (Appendix W51) — *"The color array is exactly 1–50 `CanonicalNamedColor` atoms from the Wire contract."*

The editor is where the number is *produced*, and it knows nothing about it. Measured
(`probe-D10-pass4.json`):

| draft size | count line | add slot present | save button `disabled` | any limit copy | well height @1440×900 |
|---:|---|---|---|---|---:|
| 12 | `12 colors` | yes | `false` | no | 274.6 px |
| 50 | `50 colors` | yes | `false` | no | 456.6 px |
| **51** | `51 colors` | yes | **`false`** | **no** | 650.8 px |
| **80** | `80 colors` | yes | **`false`** | **no** | **910.4 px** |

At 80 colours the scratch tray alone is **910.4 px tall in a 900 px viewport** — the draft surface
exceeds the stage, inside a `overflow-y-auto` pane Card, and the interface still offers to save it.
There is no counter approaching the bound, no cap on the add slot, no disabled commit, no message.
The failure is deferred past the commit to the far side of an export or a publish, where it surfaces
as `snapshot_corrupt` — a terminal failure code (`PALETTE-CONTRACT.md:319`) for something the user
was invited to do.

**This is not a missing feature; it is an inconsistency inside one product.** The same app already
ships the correct design for the identical problem, 60 lines of code away:

```ts
// demo/workbenches/mix/MixSourceSelector.vue:37-40
// Source guards: remove needs ≥ 1 remaining, add stops at a sensible upper bound.
const MIN_COLORS = 1;
const MAX_COLORS = 12;
const canRemoveColor = computed(() => selectedColors.length > MIN_COLORS);
const canAddColor    = computed(() => selectedColors.length < MAX_COLORS);
```

Mix bounds an operand rack whose limit is a **taste** judgement ("a sensible upper bound") and wires
it to its add affordance. The palette editor, whose limit is a **contract**, wires nothing.
`PROPORTION-AUDIT.md §5.5` — a control is *"either data, status, labeled action, drag affordance,
focus/selection register or removed"*; an add control that cannot know when it must stop is none of
those.

**Reproduction.** Seed `savedColors` with 51 and 80 entries; load `/#/palettes`; read the count
line and the commit button's `disabled`. `probe-D10-pass4.mjs` § P1; frames
`frames-D10/p1-n50-1440.png`, `p1-n80-1440.png`.

**Cure.** One bound, declared once where the domain declares it, consumed by the add slot (rests at
50), the count line (`50 / 50`), and the commit. The Mix guard is the shape; the number comes from
the palette contract, not from a second local opinion. Fixing this also caps D3-04's uncapped growth
at a knowable maximum, which is the only way that row can ever have a geometry budget.

---

## D4-03 · MAJOR — the draft well and the saved palette Card are the same material, byte-for-byte; the scratch surface and the durable artifact are indistinguishable, and the scratch specimen is the larger of the two

Measured in one frame with the same five colours in both surfaces (`probe-D13-pass4.mjs`):

| | draft well `.dashed-well` | saved palette Card |
|---|---|---|
| fill | `oklab(0.913295 0.00550478 0.0130424)` | `oklab(0.913295 0.00550478 0.0130424)` |
| radius | `16px` | `16px` |
| shadow | `-2px 2px 0`, `-3px 3px 0`, `-4px 4px 0` @ `oklab(0.28 … /.32 /.26 /.18)` | `-3px 3px 0`, `-5px 5px 0`, `-7px 7px 0` @ the same three alphas |
| edge | `1.5px dashed var(--card-edge)` (`utils.css:97`) | `2px solid` `--card-edge` |
| classes | `dashed-well` | `group rounded-card cartoon-surface border-card-edge bg-well` |

The fill token is **identical to the last digit**. The radius is identical. The shadow is not merely
similar — it is the same three-step cartoon ladder, the same colour, the same three alphas, one rung
apart. The **entire** material difference between a user's throwaway scratch tray and their saved,
durable, exportable, publishable palette is: `dashed` versus `solid`, and half a pixel of border
width.

`VISUAL-CONSTITUTION.md:34` — *"One pane may have one full-strength visual protagonist. Supporting
fixtures do not compete with it through equal size or **equal shadow**."* This is equal shadow,
measured, plus equal fill and equal radius.

And the competition is not even a draw — **the support wins on size**. Same probe, same frame:

| rendering of the same five colours | geometry | technology |
|---|---|---|
| draft well | 5 × **48 × 48** faces, seeded radius `59.17% 69.19% 31.62% 33.29% / 67.02% 75.03% 23.69% 75.73%` | `filter: url("#watercolor-filter-v-1-0")` |
| saved card | one **458 × 40** band, 5 segments of 91.6 × 40, `border-radius: 0px` | `filter: none`, raw `backgroundColor` |

The scratch draft's specimen is 20 % taller than the artifact's, drawn in the expensive organic
species, while the artifact gets flat rectangles. `VISUAL-CONSTITUTION.md:186` — saved palettes are
*"matte specimen slips inside a glass workspace"*; here the matte slip is out-dressed by the notepad
above it.

Two further facts fall out of the same measurement and belong to their own owners, recorded here as
evidence rather than filed as my rows:

- The saved palette Card carries a three-step cartoon shadow (`-3/-5/-7`). `VISUAL-CONSTITUTION.md:54`
  fixes every Library palette entity Card at exactly `{size:"sm", material:"content", tier:"quiet",
  surface:"opaque", **shadow:false**, grain:false, specular:"off"}`. → PaletteCard's seat.
- The whole pane root is `glass-resting card rounded-card …` with its own `8px 8px 0` stamp, so the
  route is Card → Card → Card, three nested bounded surfaces. `VISUAL-CONSTITUTION.md:45` gives the
  Library an *"owner workspace chassis"* in which *"the field/lane/empty/inspector have none"*.
  → the composition owner (D3-04).

**Reproduction.** `probe-D13-pass4.mjs`, seeded with five identical colours in both the draft and one
saved palette; frames `frames-D10/p3b-three-renderings.png`, `frames-D10/p6-material-comparison.png`.

**Cure.** Material must encode durability. The draft is *provisional* and belongs one tier **below**
the artifact — no cartoon stamp at all, the dashed edge alone carrying the in-progress semantics
(which is exactly what `utils.css:103` already claims in prose: *"The dashed edge ALONE carries the
in-progress semantics"* — and then the very next line adds `box-shadow: var(--shadow-cartoon-sm)`).
Delete the well's stamp; let the saved Card's quiet tuple be the only bounded object on the route.
This is `PR-05` verbatim — *"Dividers, caster shadows and corner marks repeat a boundary →
REMOVE"* — and it is a one-declaration cure, unlike most of this file's rows.

---

## D4-04 · MINOR — the field has one empty state for two incompatible meanings, and this component's commit is what routes users into the wrong one

`PalettesPane.vue:77-80`:

```
:empty="pm.filteredSaved.value.length === 0"
empty-eyebrow="· empty plate ·"
empty-text="No saved palettes yet."
empty-hint="Add colors above, then save the set."
```

The predicate is **filtered** length; the copy is about **owned** length. Measured
(`probe-D11-pass4.json` § P2): with one saved palette and the filter `qqqzzz`, `cardCount: 0` and
`emptyText: "· empty plate ·No saved palettes yet.…"` while `headerBadge: "(1 saved)"`.

`VISUAL-CONSTITUTION.md:186` reserves this mark precisely: *"A **true empty** invitation content-hugs
its text/action and may carry one static, aria-hidden `EmptyPaletteMark`."* `PaletteCardGrid.vue:16`
says the same thing in its own comment — *"TRUE EMPTY is the EmptyState invitation ALONE"*. A
filtered-to-zero field is not true empty; it is a query result, and
`VISUAL-CONSTITUTION.md:114` gives it its own contract — *"in-route filter … changed result
count/state through the owning status region"*, i.e. announce the **result**, not the inventory.

I file this on this axis because it is the second half of D4-01: the commit is the moment that
converts "I have one palette and a stale filter" into "the interface tells me I have none". The
locus is shared with `PalettesPane.vue`, and the co-owner is named.

**Reproduction.** As D4-01, but observable before the save: `probe-D11-pass4.mjs` § P2 `filtered`;
frame `frames-D10/p2b-filter-no-results.png`.

**Cure.** Two states, two copies. `empty` (no palettes owned) keeps the plate mark and the
invitation; `no-results` (filter excludes everything) names the query and offers to clear it. One
predicate each. No new component — `EmptyState.vue` already carries a `variant` union
(`:15`/`:32`); this is a third arm on an existing switch, not a new species.

---

## D4-05 · MINOR — at the constitution's own 200 % zoom arm the scratch tray takes 57.6 % of the stage

`VISUAL-CONSTITUTION.md:62` and `:78` make actual browser zoom a **named evidence arm**, not an
optional extra. Measured at 720 × 450 CSS px (= 1440 × 900 at 200 %), 12 colours
(`probe-D10-pass4.json` § P4):

```json
{ "wellH": 259, "vh": 450, "share": 57.6, "docOverflowX": 0 }
```

**57.6 % of the viewport for the draft tray.** Pass 3 measured 38 % at 390 px and called the tray
uncapped; the zoom arm is worse than the phone, and it is the arm the canon actually names.
`VISUAL-CONSTITUTION.md §3` law 2 caps *empty* secondary content at 15 %; law 8 forbids a supporting
fixture competing with the protagonist. At 200 % zoom the protagonist gets 42 % of what is left.

`docOverflowX: 0` — no horizontal overflow at this arm. That part is clean and I record it as such.

**Reproduction.** `probe-D10-pass4.mjs` § P4; frame `frames-D10/p4-zoom200-720x450.png`.

**Cure.** D4-02 gives the tray a maximum cardinality; D3-04 gives it a home that can scroll
independently of the stage. Neither alone is sufficient — an uncapped tray in a collapsing lane is
still unbounded.

---

# §C · State coverage — the rows pass 4 adds

Pass 3's §D matrix stands. These rows were absent or wrong in it:

| State | Prior verdict | Pass-4 verdict | Evidence |
|---|---|---|---|
| **commit succeeded** | not enumerated | **undesigned, and actively announces its opposite** | D4-01 |
| **commit succeeded, filter active** | not enumerated | **artifact invisible; four contradictory truths in one frame** | D4-01 |
| **focus after commit** | not enumerated | **destroyed — `activeElement: BODY`** | D4-01(c) |
| **at the contractual maximum (50)** | not enumerated | **no design; add slot open, commit enabled** | D4-02 |
| **over the contractual maximum (51–80)** | not enumerated | **no design; well exceeds the viewport at 80** | D4-02 |
| field filtered to zero | not enumerated | **rendered as "no palettes owned"** | D4-04 |
| zoomed to 200 % | not measured | **57.6 % of the stage; no overflow** | D4-05 |

Adding these to pass 3's nineteen: **twenty-six enumerated states, four designed and correct.**

---

# §D · Negative evidence — what is right, and one claim a future seat must not file

Pass 4 is an adversarial seat, so its negative findings are worth as much as its positive ones.

1. **The edit overlay's containing block is correct.** `.edit-overlay` is `position: absolute; top:0;
   left:0` (`:295-311`) and its comment claims it aligns over the original swatch. It does:
   `SwatchHoverMenu.vue:2-3` gives the slot host `class="relative"`, so the overlay anchors to the
   swatch wrapper, not to the pane. Pass 3 §E correctly limited its containing-block claim to the
   *leave transition* (`.swatch-row`, which is `static`). **A future seat must not extend that claim
   to the edit overlay.** The `-0.375rem` margin offsets are a legitimate padding correction.

2. **`PANEL_LAYOUT` is a real anti-drift device.** `SwatchHoverMenu.vue:63-65` shares one layout
   string across the touch `PopoverContent` and the hover panel so the two paths cannot diverge.
   That is the correct instinct and it should survive whatever cures D2-15.

3. **No horizontal overflow at any arm measured** — 360, 390, 720@200 %, 1440. Four for four.

4. **The reactive-props bridge is idiomatic.** `:234-235` uses `toRef(() => savedColorStrings)` to
   carry destructured props across the composable boundary — owner edict 7, satisfied, no stale
   `defineModel` round-trip.

5. **`verbatimModuleSyntax` is honoured.** `:190` `import type { Palette, PaletteColor }` is the
   file's only type-only import and it is correctly marked — owner edict 8, satisfied.

6. **The singular/plural count copy at `:21` is correct** and commented as deliberate. It is the one
   piece of copy in the file that was designed.

---

# §E · Ranked disposition

| ID | Severity | Mechanism | Owner |
|---|---|---|---|
| **D4-01** | **BLOCKER** | **the commit has no outcome; it announces its own negation and destroys focus** | **the composition owner (with D3-04) — the cure is the same relocation** |
| **D4-02** | **MAJOR** | **contractual cardinality unrepresented; the house pattern exists at `MixSourceSelector.vue:38-40`** | the palette-domain wave, with W45 |
| **D4-03** | **MAJOR** | **draft and artifact share one material byte-for-byte; support out-dresses protagonist** | `PR-05` family — W18 |
| **D4-04** | MINOR | one empty state for two meanings; shared locus `PalettesPane.vue:77-80` | W22, with D4-01 |
| **D4-05** | MINOR | 57.6 % of the stage at the canon's own zoom arm | as D3-04 |

**D4-01 is the row I would fix first**, and not because it is the loudest. Every other finding in
four passes describes a surface that is *wrong*; D4-01 describes a surface that is *dishonest* — it
tells the user, in text and to their screen reader, that the thing they just did did not happen.
A component may be ugly and still be trusted. This one cannot.

---

## Artefacts

| path | what |
|---|---|
| `challenge-D-design.md` | this report (pass 4) |
| `challenge-D-design.2026-07-28-pass3.md` | preserved pass 3 (4 findings; its §A replication stands) |
| `challenge-D-design.2026-07-28-pass2.md` | preserved pass 2 (27 findings) |
| `challenge-D-design.2026-07-27-pass1.md` | preserved pass 1 |
| `probe-D10-pass4.mjs` / `.json` | cardinality at 1/12/50/51/80 · 200 % zoom · first (schema-rejected) filter run |
| `probe-D11-pass4.mjs` / `.json` | commit-under-filter end to end · three-renderings · ghost-collision geometry |
| `probe-D12-pass4.mjs` / `.json` | material comparison, draft well vs saved artifact |
| `probe-D13-pass4.mjs` | the ancestor material chain: well → palette Card → grid → pane Card |
| `frames-D10/p2b-after-save-under-filter.png` | **the frame that carries D4-01** — badge "2", body "No saved palettes yet.", hint "Add colors above, then save the set." |
| `frames-D10/p2b-filter-no-results.png` | the same field before the save — D4-04 |
| `frames-D10/p1-n50-1440.png` · `p1-n80-1440.png` | the contractual bound and 30 colours past it — D4-02 |
| `frames-D10/p3b-three-renderings.png` · `p6-material-comparison.png` | the same five colours as 48 px organic faces and as a 40 px flat band — D4-03 |
| `frames-D10/p4-zoom200-720x450.png` | the 200 % arm — D4-05 |
| `frames-D10/p5-ghost-collision-1440.png` | add-slot ghost 48 px and empty-plate ghost 44 px, 63.9 px apart, one viewport (replicates pass-1 D-6 / pass-2 D2-09 with geometry) |

**No source file was edited by this seat.** Every write is confined to
`docs/tranches/V/megatranche/audit/components/CurrentPaletteEditor/`.
