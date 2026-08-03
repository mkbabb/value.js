# CHALLENGE-D — PaletteCardMenu: the design is flawed (PASS 4)

Seat: CHALLENGE-D (design axis) · pass 4 · 2026-07-28
Repository `/Users/mkbabb/Programming/value.js`, branch `tranche-u`, HEAD `c654824e`.
Subject: `demo/palettes/browser/card/PaletteCard/PaletteCardMenu.vue` (228 lines, area `palettes`).

Prior passes preserved verbatim:
`challenge-D-design.pass-1-2026-07-28.md` (D-1…D-25),
`challenge-D-design.pass-2-2026-07-28.md` (P2-1…P2-16),
`challenge-D-design.pass-3-2026-07-28.md` (P3-1…P3-13).
Those 54 findings stand. This pass went to the four places none of them went:

1. **the consequence of the action**, not its label — what actually happens when `Delete` is chosen;
2. **the position of that action as a function of which card you touched** — the side-flip;
3. **RTL rendered rather than reasoned** — pass 1 read the source; nobody had opened the real menu
   in a right-to-left document;
4. **motion**, which all three prior passes explicitly certified as the one clean axis.

All four produced defects. The motion axis is no longer clean.

---

## Model receipt

I observe myself to be **Opus 5** — exact model id `claude-opus-5[1m]`, the 1M-context arm, the
tier explicitly declared at spawn. The seat is declared, not inherited. **No defect on this axis.**

---

## Verdict

**DEFECTIVE — pass 4 adds 3 BLOCKER, 3 MAJOR, 1 MINOR on top of the prior 54, and corrects one
prior finding whose premise never occurs in the running app.**

The three that matter:

> **Choosing `Delete` from this menu destroys a palette immediately. No dialog, no undo, no
> announcement.** Measured end to end: 11 cards and 11 stored records before, 10 and 10 after,
> `[role="dialog"]` count 0 throughout, the string "undo" absent from the document, every
> `aria-live` region on the page still `off`, and focus dumped on `<body>`. **Forty pixels above,
> in the same pane, the app's own "Delete all" button opens a `role="dialog"` that says
> "This cannot be undone. Cancel / Delete all."** Destroying ten palettes asks. Destroying one
> does not.

> **Which row `Delete` is depends on where the card sits in the list.** On the first card the panel
> opens downward and `Delete` is 233.5 px *below* the trigger — the farthest row from the pointer.
> On the last card the panel flips upward and `Delete` is 51.5 px *above* it — the **nearest** row
> to the pointer, 4.5× closer. A 285 px swing, 2.85 card-heights, for the same command on the same
> screen. Photographed at `evidence/pass4-G-flip-top.png` and `evidence/pass4-G-flip-bottom.png`.

> **In an RTL document this panel is a hard-coded `dir="ltr"` island.** The portalled content node
> carries the literal attribute `dir="ltr"` while its parent, `<body>` and `<html>` all compute
> `rtl`. Consequence, measured and photographed: the *same palette name* renders in two opposite
> directions 40 px apart, and the two truncations keep **opposite halves** of it — the card keeps
> the head, the menu header keeps the tail.

The strongest single new defect is **P4-2** (irreversible destruction with no confirmation).
**P4-1** is what makes it probable. **P4-3** is the most categorical.

---

## Method and probe log

**Static.** Re-read the SFC and `PaletteCard.vue`; traced every destructive path to its terminus —
`PaletteCardMenu.vue:133-140` → `PaletteCard.vue:290-319` → `PalettesPane.vue:92` →
`usePaletteActions.ts:31-38`; read `PalettesPane.vue:59-120` (the app's own bulk-delete grammar);
`AdminUsersPanel.vue:158-177` (the app's other confirmation grammar); `PaletteRenameInput.vue`;
`demo/color-picker/index.html:11`; the glass-ui 7.0.0 `useLiquidPress` contract; the three canon
documents.

**Visual.** Read `shots/safari-desktop-light/palettes.png` and `shots/safari-desktop-dark/browse.png`
directly — both confirm the standing evidence gap (`No saved palettes yet.` / `The commons is
unreachable.`; not one palette card was photographed in any of the 60 mega-tranche captures) — then
captured and read five frames of my own.

**Live.** Chromium/Playwright against `http://localhost:9000`, `localStorage["color-palettes"]`
seeded with 11 local palettes. Arms: 1440×1000 and 1440×820 LTR; 1440×900 with
`document.documentElement.dir="rtl"` applied after boot; `reducedMotion: "reduce"` and
`"no-preference"`.

| artefact | contents |
|---|---|
| `probe-D17-pass4.mjs` / `-results.json` | press-drive leak; destructive-row side-flip; disabled-row affordance; reduced-motion |
| `probe-D18-pass4.mjs` / `-results.json` | RTL after boot; the delete consequence; the flip photographs |
| `probe-D19-pass4.mjs` / `-results.json` | the RTL mechanism — the `dir` ancestor chain and the two truncations |
| `evidence/pass4-G-flip-top.png` | `Delete` at the bottom of a downward panel |
| `evidence/pass4-G-flip-bottom.png` | `Delete` at the top of an upward panel, one row from the trigger |
| `evidence/pass4-C-rtl-arabic.png` | **the same name, two directions, opposite halves surviving** |
| `evidence/pass4-C-rtl-open.png`, `evidence/pass4-C-rtl-submenu.png` | the LTR island and its submenu |
| `evidence/pass4-A-press.png` | the card mid-press from the trigger |

One correction of method against pass 4's own first attempt is recorded at **P4-C1**: an
`addInitScript` RTL arm silently failed because `demo/color-picker/index.html:11` pins
`<html lang="en" dir="ltr">`; that arm was discarded and re-run post-boot. Its invalid output is not
cited anywhere in this report.

---

## The new findings

### P4-1 · BLOCKER · The destructive row's screen position is a function of the card's scroll position; on lower cards `Delete` becomes the row nearest the pointer

Same page, same seed, same 11 cards, two triggers (`probe-D17-pass4-results.json` `B_destructiveRowPosition`):

| | **card 1** | **card 11** |
|---|---|---|
| trigger centre y | 487.6 | 754.6 |
| panel `data-side` | `bottom` | **`top`** |
| panel rect | `y 510 … 750.1` | `y 492 … 732.1` |
| `Publish` centre y | 580.1 | 562.1 |
| `Rename` | 624.1 | 606.1 |
| `Export` | 677.1 | 659.1 |
| **`Delete`** | **721.1** | **703.1** |
| **`Delete` − trigger** | **+233.5 px (below)** | **−51.5 px (above)** |

```
swingPx: 285
```

The panel flips to stay on screen — correct producer behaviour. The design consequence is that the
**one irreversible command in the menu moves 285 px, from the row farthest from the pointer to the
row nearest it, as a function of nothing but how far the user has scrolled.** 233.5 / 51.5 = **4.5×
closer**. 285 px is **2.85 card heights** (a card is 100 px, `A_pressLeak.rest.h`).

`evidence/pass4-G-flip-top.png` and `evidence/pass4-G-flip-bottom.png` are the two witnesses, and the
second one is the whole argument in one frame: the `…` trigger sits at the bottom-right of
*Eleventh Palette*, and the row immediately above it — the first thing a downward flick or a
mis-aimed second tap lands on — is `Delete`.

Two aggravations already on the ledger compound here rather than being repeated: the destructive row
is rendered in **exactly the same ink** as `Rename` (D-2, re-confirmed at ΔRGB 0–1 in five arms by
pass 3), and **no separator** divides it from the row above (D-14). So in the flipped arm the nearest
row to the pointer is irreversible, unmarked, and visually identical to its reversible neighbour.

**Canon.** `PROPORTION-AUDIT.md §5` law 2 — one anatomy per repeated species; a species whose
geometry inverts between instances has no anatomy. `VISUAL-CONSTITUTION.md §5` — *"Commit uses one
glass-ui action set. Secondary verbs disclose within that same instrument"*; an instrument whose
commit geometry is scroll-dependent is not one action set. `§4.1` — *"Selected, failed, pending,
withdrawn and disabled states are never color-only"*; here even the *irreversible* state is neither
colour nor position, because both vary.

**Reproduction.** `node docs/tranches/V/megatranche/audit/components/PaletteCardMenu/probe-D17-pass4.mjs`
with the dev server up; read `B_destructiveRowPosition`.

---

### P4-2 · BLOCKER · Choosing `Delete` destroys the palette immediately — while the same pane's bulk delete opens a confirmation dialog

`probe-D18-pass4-results.json` `F_irreversible`, one uninterrupted sequence on `/#/palettes`:

```json
"before":            { "cards": 11, "dialogs": 0, "stored": 11 }
"afterSingleDelete": { "cards": 10, "dialogs": 0, "stored": 10,
                       "bodyMentionsUndo": false,
                       "liveRegions": [ {"live":"off","text":"92.0%"}, {"live":"off","text":"88.8"},
                                        {"live":"off","text":"20.0"},  {"live":"off","text":"82.7%"} ],
                       "focused": "BODY.relative" }
```

Open menu, click `Delete`: the card is gone and the persisted record is gone. `[role="dialog"]`
count is **0 before and 0 after**. The token "undo" does not appear anywhere in the document. The
only `aria-live` regions on the page are the colour picker's four channel readouts, all `off`
(correctly — `VISUAL-CONSTITUTION.md §7` requires exactly that of them), so **nothing announced the
destruction**. `usePaletteActions.ts:31-38` is the terminus and contains no guard:

```ts
function onDelete(palette: Palette) {
    if (palette.id == null) return;
    deps.deletePalette(palette.id);
}
```

Now the same pane, seconds later, same probe:

```json
"bulkDeleteGrammar": { "present": true, "role": "dialog",
  "text": "Delete all saved palettes? This will permanently delete 10 palettes from local storage.
           This cannot be undone. Cancel Delete all" }
```

`PalettesPane.vue:101-119` gives the **bulk** delete a `Dialog` with a named title, a stated
consequence, an explicit "This cannot be undone", a `Cancel`, and a `tone="destructive"` commit.
`AdminUsersPanel.vue:158-177` gives admin destruction the same treatment. **The confirmation grammar
exists, is glass-ui-native, and is already mounted in this very component's parent pane — and the
per-card `Delete` this menu owns is the one destructive path in the feature that does not use it.**

The asymmetry is exactly backwards from authority: the guarded action is the one a user performs
deliberately once, from a labelled header button; the unguarded action is the one that appears
**eleven times on this screen**, on a 36 px glyph, one row from the pointer in the flipped arm (P4-1),
in the same ink as `Rename` (D-2), with no separator above it (D-14).

**Canon.** `VISUAL-CONSTITUTION.md §5`: *"Persistent operation state stays with the entity/workspace.
A transient flourish may celebrate success but never carries the only truth."* Here there is no
truth at all — not even the transient flourish: `ActionFeedback` is driven by
`PalettesPane.vue:207` only for results that return a `{success, message}`, and `onDelete` returns
`void`. `PROPORTION-AUDIT.md` **PR-08** — *"Pending/failure/export/recovery truth only transient →
ADD-AFFORDANCE. Persistent entity status/recovery"* — names this row.
`§7 About and Admin`: *"dangerous confirmation"* is written into the canon as a required element of
the review grammar.

**Reproduction.** `node …/probe-D18-pass4.mjs`; read `F_irreversible`. (The probe runs in an
isolated browser context against a seeded store; no user data is touched.)

**Cure (gestalt).** Not "add a confirm dialog to the menu". Per D-1 the lifecycle actions belong in
the selected inspector, where a destructive commit has room for a named consequence, a `Cancel`, and
durable post-state — the same anatomy `PalettesPane.vue:101` already ships. A 192 px floating panel
cannot host a confirmation without becoming a second overlay on top of an overlay.

---

### P4-3 · BLOCKER · In an RTL document the panel is a hard `dir="ltr"` island — the same palette name renders in two opposite directions, 40 px apart, and the two truncations keep opposite halves of it

`document.documentElement.dir = "rtl"` applied to the live app after boot. The card row mirrors
correctly — this component's trigger moves from `x 1166` to `x 238`
(`probe-D18-pass4-results.json` `C_rtl.ltr` vs `.rowRtl`) — and reka's `align="end"` correctly
resolves to the physical **left** edge (`alignedEdge: "physical-left"`). Those are producer wins.

Then the panel opens. `probe-D19-pass4-results.json`, the `dir` ancestor chain from the menu node up:

```json
[ { "tag":"DIV", "cls":"dropdown-menu-content dropdown-menu__content gla", "dirAttr":"ltr", "computedDir":"ltr" },
  { "tag":"DIV", "cls":"",          "dirAttr":null, "computedDir":"rtl" },
  { "tag":"BODY","cls":"relative",  "dirAttr":null, "computedDir":"rtl" },
  { "tag":"HTML",                   "dirAttr":"rtl","computedDir":"rtl" } ]
```

The content node carries the literal attribute `dir="ltr"`. It is portalled to `<body>`, so it
inherits nothing; reka's `dir` prop defaults to `"ltr"` and this component passes none. There is no
`ConfigProvider` anywhere in the app to supply one:

```
$ grep -rn "ConfigProvider" demo
(no matches)
```

The measured consequence, one palette named `لوحة ألوان الغروب الدافئ فوق البحر الأبيض المتوسط`:

| | the card's own identity span | this menu's header, 40 px away |
|---|---|---|
| computed `direction` | **`rtl`** | **`ltr`** |
| rendered rect | `x 320.1 … 648` | `x 245 … 423` |
| clipped | — | **139 px of 317 (44 %)** |
| surviving substring | the **head** of the name | the **tail** of the name |

`evidence/pass4-C-rtl-arabic.png` is the witness and needs no arithmetic: the card row reads
`…لوحة ألوان الغروب الدافئ فوق البحر` and the menu header directly beneath it reads
`…وق البحر الأبيض المتوسط`. **Two truncations of one identity, keeping opposite halves, stacked
vertically.** A user cannot confirm from the screen that the menu belongs to the palette they
clicked — which is P3-1's assistive-technology finding arriving through the eye instead of the
accessibility tree.

Three further breaks ride on the same island, all in the same frame:

- **The glyph gutter mirrors the wrong way.** The row's leading icon sits at `svgX 253` inside a row
  starting at `rowX 245` — the **physical left**. The card's own leading affordance in the same
  document, the grip handle, is on the physical **right**. One screen, two gutters.
- **The submenu opens away from the reading direction.** Parent `x 238 … 430`, child `x 423 … 665`
  (`C_rtl.subRtl`) — it opens toward the physical right, i.e. *backwards* for an RTL reader, and
  toward the page interior rather than the free margin at `x < 238`.
- **The annotation lands at the LTR trailing edge**, `x 350.5 … 415` in a row `245 … 423` —
  `annotationSits: "at the physical RIGHT of the row"`, 8 px from the row's physical right edge and
  105.5 px from its physical left.

**Canon.** `VISUAL-CONSTITUTION.md §6.1`: *"chrome, navigation and layout — logical inline/block
direction follows the document."* This panel is chrome and does not follow the document.
`§5.2` governs direction for every mechanism in the app. `demo/color-picker/index.html:2` states the
intent in its own comment — *"U.W-A11Y · U-F58 (BR-10) — RTL mechanical readiness"* — and this
component is the counterexample to that readiness claim.

**This finding corrects pass 1's D-8.** D-8 measured `ml-auto` against synthetic markup inside an
RTL document and concluded the annotation "lands wrong in RTL". In the running app **that row never
becomes RTL**, so `margin-left: auto` and `margin-inline-start: auto` are indistinguishable there —
the annotation is at its box's inline end, correctly, because the box is LTR. D-8's *conclusion*
(the annotation is on the wrong side of the page's reading direction) survives; its *mechanism* does
not. The real mechanism is one hard-coded attribute on the portal, and fixing `ml-auto` alone would
change nothing. Recorded because it changes a prior finding's cure.

---

### P4-4 · MAJOR · Pressing this component's 36 px trigger runs the whole palette entity's activation press — the motion says "you pressed the card" while the code says "you did not"

All three prior passes certified motion as the one axis with no defect. Measured
(`probe-D17-pass4-results.json` `A_pressLeak`), pointer held on the trigger at `x 1166, y 496.6`,
`36 × 36`:

| moment | `--card-press-t` | card inline `scale` | card box |
|---|---|---|---|
| at rest | `0.0000` | *(none)* | 462 × 100 |
| hover | `0.0000` | *(none)* | 462 × 100 |
| +90 ms into the press | `0.1034` | `1.001 0.9948` | 462.46 × 99.48 |
| **+590 ms (settled)** | **`1.0000`** | **`1.0094 0.9515`** | **466.34 × 95.15** |
| after release | `0.0000` | *(none)* | 462 × 100 |

The palette entity — colour strip, name, badges, this component's own trigger — is **squashed 4.85 %
vertically and stretched 0.94 % horizontally** because the user touched a secondary icon button in
its corner. The control arm, pressing the card body itself (the legitimate activation seat), is
indistinguishable:

```json
"control": { "controlDown": { "pressT": "1.0125", "scale": "1.0091 0.9512" } }
```

`1.0094 0.9515` vs `1.0091 0.9512` — **the same press choreography, to three decimal places, for two
semantically opposite gestures.**

The mechanism is one event-name mismatch. `PaletteCard.vue:82` wraps the trigger in
`<div class="flex items-center gap-1" @click.stop>` — which stops `click`, so the card's
`@click="$emit('click')"` does not fire and the card does not expand. But the press register is
driven by `v-bind="press.handlers"` on the card root (`PaletteCard.vue:24`), and glass-ui's
`useLiquidPress` handlers are `onPointerdown / onPointerup / onPointercancel / onPointerleave` —
`pointerdown` is never stopped, so it bubbles from the trigger to the card root every time.
`menuOpenDuringHold: 0` in the same run confirms the trigger opens on `click`, not on `pointerdown`:
for the whole 590 ms hold there is no menu, only a deformed palette.

`VISUAL-CONSTITUTION.md §5` is explicit about what owns activation feedback on this species:
*"One native named `<button type="button">` spans its specimen/identity region and expresses
inspector selection… The card body owns no expand, inline rename, action menu, transient result or
hover-only swatch-action path."* `PROPORTION-AUDIT.md §5` law 12 repeats it: the Card root *"owns no
activation, focus or selection state."* Here the root owns a full activation animation, and this
component is what fires it.

**Cure.** Under D-1's transposition the question disappears — there is no trigger inside the card.
Short of that it is one line: the seat that owns activation owns the press; a control that cancels
activation must cancel the press drive too (`@pointerdown.stop` on the same wrapper that already
carries `@click.stop`). But note that the local patch re-affirms the wrong composition: the card is
carrying activation choreography it is constitutionally forbidden to own.

---

### P4-5 · MAJOR · Under `prefers-reduced-motion: reduce` that deformation becomes an instantaneous 4.85 % geometry snap

Same gesture, same 120 ms sample point, two contexts (`probe-D17-pass4-results.json` `E_*`):

| arm | `--motion-weight` | card at +120 ms |
|---|---|---|
| `no-preference` | `0.618` | `pressT 0.1034`, `scale 1.001 0.9948` (the spring is 10 % risen) |
| **`reduce`** | **`0`** | **`pressT 1.0000`, `scale 1.0094 0.9515`** (fully deformed) |

The producer is behaving exactly as designed — `motion-weight: 0` collapses the spring so it
"resolves directly to the final geometry", which is `VISUAL-CONSTITUTION.md §6`'s literal
requirement. The panel itself honours the arm correctly too, and that measurement is the negative
proof for the producer:

| arm | menu `transition-property` | duration |
|---|---|---|
| `no-preference` | `scale, translate, opacity, filter, display, overlay` | `0.35s` ×6 |
| `reduce` | **`opacity`** | **`0.15s`** |

But the *final geometry of a press is not a final state* — it is a transient the spring exists to
smooth. With the spring removed, a reduced-motion user pressing a 36 px menu button gets the entity
beneath it snapping 4.85 % shorter and 0.94 % wider instantly, then snapping back. The arm that
exists to remove motion delivers the **most abrupt** version of a motion this component should not be
triggering at all (P4-4). Reduced motion did not cause the defect; it removes the only thing that was
disguising it.

---

### P4-6 · MAJOR · Focus after the destructive action lands on `<body>`, because the action destroys its own opener

From the same delete sequence (`F_irreversible.afterSingleDelete`):

```json
"focused": "BODY.relative"
```

The producer's close contract returns focus to the trigger that opened the menu. That trigger lives
inside the card the action just removed from the DOM, so there is nothing to return to and focus
falls to the document body. A keyboard user who deletes the fourth of eleven palettes is returned to
the top of the document with no announcement (P4-2) and must re-traverse the field.

`VISUAL-CONSTITUTION.md §5.1`, Dialog/Drawer/Popover row, states the fallback exactly:
*"exact connected opener on close, **otherwise the nearest surviving owning action**."* `<body>` is
not the nearest surviving owning action; the adjacent card's seat is. The rule anticipates this case
precisely — and the component cannot satisfy it, because it has no knowledge of the field it sits in.
An inspector, whose heading survives the deletion of a row, does.

---

### P4-7 · MINOR · The open panel is backed by three other palette entities' colour data, visible in both flip frames

`evidence/pass4-G-flip-top.png`: the panel (`y 510 … 750.1`, `x 1010 … 1202`) crosses *Muted
Terracotta*, *Second Palette* and *Third Palette*. `evidence/pass4-G-flip-bottom.png`: it crosses
*Ninth*, *Tenth* and *Eleventh*. In both frames the neighbours' colour strips read through the
`alpha 0.808 / blur(11px)` surface as coloured bands behind the rows — green and blue behind
`Rename`, violet behind `Delete` in the bottom frame.

This is P3-5's contrast finding as a compositional statement rather than a photometric one. P2-8
measured 41.6 % of *the* adjacent card; the flip frames show that the count is three entities, not
one, and that which three depends on the flip. `VISUAL-CONSTITUTION.md §2`: *"Glass earns its blur
by revealing live content; otherwise it is a neutral well."* The live content revealed here belongs
to three bounded objects that are not the one the menu is about.

---

## Corrections and corroborations

**P4-C1 · correction of this pass's own method.** The first RTL arm used
`page.addInitScript` to set `dir="rtl"`. It reported `html dir: "ltr"` because
`demo/color-picker/index.html:11` ships `<html lang="en" dir="ltr">` and the init script runs against
a document whose root element does not yet exist. The arm was discarded and re-run post-boot
(`probe-D18`, `probe-D19`). No number from the failed arm is cited. Recorded under evidence law: a
probe that measures the wrong document is a hypothesis, not a measurement.

**D-8 · corrected, see P4-3.** The conclusion survives; the mechanism is not `ml-auto`.

**Corroborated with a new instrument:**

- **D-2 / D-14** — the flip frames show `Delete` in identical ink to `Rename`, with no separator
  above it, at the position nearest the pointer. Visual confirmation of two measured findings, and
  the reason P4-1 is a blocker rather than a curiosity.
- **P3-3 (modal barrier)** — `A_pressLeak.bodyPE` while the menu is open:
  `bodyPointerEvents: "none"`, `cardPointerEvents: "none"`,
  `elementAtCardCorner: "HTML."` — the card the menu belongs to is not hit-testable.
- **P3-5 (data-dependent surface)** — see P4-7, in two fresh frames.
- **D-24 / P2-16 / P3 (zero matrix coverage)** — re-confirmed with my own eyes on
  `shots/safari-desktop-light/palettes.png` (*"No saved palettes yet."*) and
  `shots/safari-desktop-dark/browse.png` (*"The commons is unreachable."*). Sixty captures, zero
  palette cards, zero instances of this component.

---

## What is sound — the negative proof, fourth pass

Checked this pass, and found to have no defect:

1. **The disabled row's affordance is producer-correct.** `D_disabledAffordance`: with
   `data-disabled` set, `cursor: not-allowed`, `pointer-events: none`, `opacity: 0.5`, and
   `hitTestIsTheRow: false`. The consumer's `cursor-pointer` class is inert (measured `cursor:
   default` even at rest, corroborating D-16) but it produces **no affordance lie** — the producer
   wins the cascade in both states. The disabled row's *legibility* is still defective (P3-4); its
   *pointer semantics* are not.
2. **The press is released cleanly.** The stuck-press hypothesis is false: `upEarly 0.0275`,
   `upSettled 0.0000`, `scale: none`. The modal layer taking `pointer-events` from the card does not
   strand the spring at 1. P4-4 is about the press happening at all, not about it hanging.
3. **`align="end"` is direction-aware.** In RTL the panel's aligned edge is `physical-left`
   (`alignedEdge: "physical-left"`); reka resolves `end` logically. The RTL defect is the `dir`
   attribute on the portal, not the alignment prop.
4. **The producer honours `prefers-reduced-motion` on the panel** — `scale, translate, opacity,
   filter, display, overlay @ 0.35s` collapses to `opacity @ 0.15s`, `animation-duration` to
   `1e-05s`. Every reduced-motion defect in this report is consumer-side wiring, not producer motion.
5. **The card row mirrors correctly in RTL.** The trigger moves `x 1166 → 238`, the card
   `754…1216 → 224…686`. The non-portalled part of this component's host is direction-clean.
6. **No layout-forcing property is animated.** The card press writes `scale` and a custom property
   (`--card-press-t`, `--flex-vel`); `transform` stays `none`; the panel transitions `scale /
   translate / opacity / filter`. Compositor-only on both sides. The motion defect is semantic, not
   performance.

---

## State coverage — pass 4's rows

| state | prior verdict | pass-4 verdict | evidence |
|---|---|---|---|
| RTL | MAJOR by source inference (D-8) | **BROKEN** — forced-LTR island; one name, two directions, opposite halves | P4-3 |
| destructive commit | "no confirmation anywhere" noted in passing (D-14) | **BROKEN** — measured 11→10, dialogs 0, no undo, no announcement, while the same pane confirms bulk | P4-2 |
| post-destruction focus | not enumerated | **BROKEN** — `<body>` | P4-6 |
| pressed (trigger) | "motion: no defect" ×3 passes | **BROKEN** — fires the entity's activation choreography | P4-4 |
| `prefers-reduced-motion` | "no defect" | **DEGRADED** — instantaneous 4.85 % entity deformation | P4-5 |
| scrolled-to-bottom card | not enumerated | **BROKEN** — destructive row 4.5× nearer the pointer | P4-1 |
| disabled (pointer semantics) | — | **SOUND** | negative proof 1 |

Added to the twenty-seven states the prior passes enumerated, **twenty of thirty-two enumerated
states are unhandled, broken or degraded.**

---

## Proportion and seat law — pass-4 judgment

| canon row | verdict |
|---|---|
| `VISUAL-CONSTITUTION.md:102` — the card body owns **no action menu** | **VIOLATED in whole** (D-1; unchanged) |
| `VISUAL-CONSTITUTION.md:102` / `PROPORTION-AUDIT.md §5` law 12 — the Card root owns **no activation state** | **VIOLATED** — this component's trigger drives the root's full press choreography (P4-4) |
| `VISUAL-CONSTITUTION.md §5` — one action set; commit grammar | **VIOLATED** — commit geometry swings 285 px by scroll position (P4-1) |
| `VISUAL-CONSTITUTION.md §5` / `PR-08` — persistent operation truth, dangerous confirmation | **VIOLATED** — irreversible deletion with no dialog, no undo, no announcement, beside a pane that confirms its bulk twin (P4-2) |
| `VISUAL-CONSTITUTION.md §5.1` — focus returns to the opener or the nearest surviving owning action | **VIOLATED** — `<body>` (P4-6) |
| `VISUAL-CONSTITUTION.md §6` — reduced motion resolves to a stable state | **VIOLATED in effect** — resolves instantly to a transient deformation (P4-5) |
| `VISUAL-CONSTITUTION.md §6.1` — chrome follows the document's logical direction | **VIOLATED** — hard `dir="ltr"` portal (P4-3) |
| `VISUAL-CONSTITUTION.md §2` — glass reveals *its own* live content | VIOLATED — three foreign entities behind one panel (P4-7) |
| `demo/color-picker/index.html:2` — the repo's own "RTL mechanical readiness" claim | **FALSIFIED at this component** (P4-3) |

---

## The cure, unchanged in direction and now load-bearing on data loss

> *"Full detail, rename/lifecycle/export actions and durable operation state live in the selected
> inspector."* — `VISUAL-CONSTITUTION.md:102`

**Delete `PaletteCardMenu.vue`. Move its seventeen actions into the selected inspector. Reduce the
card to the single named `<button type="button" aria-pressed>` seat of `PROPORTION-AUDIT.md §5`
law 12.**

Pass 1 showed a transient overlay cannot hold durable state. Pass 2 showed the card row cannot afford
the trigger. Pass 3 showed the overlay cannot be named, afforded or lit. Pass 4 shows the fourth
thing, which is the one with a user-visible cost:

- **It cannot be committed safely.** The destructive command has no guard, no undo and no
  announcement (P4-2), and its position relative to the pointer inverts with scroll (P4-1). An
  inspector has room for a named consequence and a `Cancel` — the exact anatomy
  `PalettesPane.vue:101-119` already ships for the bulk twin, and `AdminUsersPanel.vue:158-177` ships
  again for admin. Nothing new is invented; one existing grammar is extended to the path that skipped
  it.
- **It cannot be recovered from.** The action destroys its own opener, so focus has nowhere to go
  (P4-6). A region that survives its rows does not have this problem.
- **It cannot be mirrored.** The panel is a portal with a pinned direction; a region inside the
  document inherits `dir` for free (P4-3).
- **It cannot be pressed without lying.** The trigger deforms the entity it is not activating
  (P4-4), most abruptly for reduced-motion users (P4-5).

**Three repairs that should not wait for the transposition**, in addition to pass 1's D-2/D-3, pass
2's P2-2/P2-3 and pass 3's P3-2/P3-4/P3-8:

- **P4-2** — route the per-card `Delete` through the confirmation the same pane already mounts. This
  is the only finding in four passes whose failure mode is irreversible user data loss.
- **P4-3** — the portal must inherit the document direction (a reka `ConfigProvider` at the app root
  is the one-node fix, and it repairs every other portalled surface at the same time).
- **P4-4** — the wrapper at `PaletteCard.vue:82` that already stops `click` must stop `pointerdown`.

---

*No source files were edited by this seat. Every artefact written lives under*
`docs/tranches/V/megatranche/audit/components/PaletteCardMenu/`. *Passes 1–3 are preserved verbatim
at* `challenge-D-design.pass-1-2026-07-28.md`, `challenge-D-design.pass-2-2026-07-28.md` *and*
`challenge-D-design.pass-3-2026-07-28.md`.
