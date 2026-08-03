# CHALLENGE-D — `demo/workbenches/mix/MixPane.vue` — design axis, **pass B (consolidated)**

## Model receipt

I observe myself to be **Opus 5 (1M context)**, model id `claude-opus-5[1m]`, spawned with an
explicit Opus 5 declaration. The seat is declared, not inherited.

- **Axis:** design — visual truth · state coverage · motion · design-system boundary · proportion/seat law
- **Subject:** `demo/workbenches/mix/MixPane.vue` (123 L), composition root of route `/#/mix`
- **Base:** branch `tranche-u`, brief HEAD `c654824e`. glass-ui `7.0.0`.
- **Write scope honoured:** only files under
  `docs/tranches/V/megatranche/audit/components/wb-mix-pane/`. No source file was edited.

---

## 0. Relationship to pass A — read this first

**A prior D seat had already written this file** (45 178 bytes, 2026-07-28 18:40, verdict
DEFECTIVE / 3 BLOCKER · 13 MAJOR · 9 MINOR · 2 INFO, with a live probe harness at
`./evidence/challenge-D/` and 14 frames). I did not discover this until after completing an
independent pass.

**Pass A is preserved verbatim at `./challenge-D-design-pass-a.md`.** It is not superseded and
it is not restated here. Its register (D-1 … D-27) stands, and this document carries it forward.

I did not overwrite it because it is the stronger document on eleven of its rows — notably D-3
(the result is never invalidated), D-2 (error injection with a live throw), D-12 (unexposed
`weights`) and D-13 (composited 1.52 : 1 contrast on the add ghost) — findings my independent
pass did not reach.

This document is **pass B**. It contains only what an independent second measurement changed:

| | count |
|---|---|
| **corrections to pass A** (a pass-A row is falsified by measurement) | 1 |
| **new findings** (uncovered by pass A) | 5 |
| **independent confirmations** of pass-A rows | 6 |
| **negative proofs** (hypotheses I raised and disproved) | 2 |

**Consolidated verdict: DEFECTIVE — now 4 BLOCKER** (pass A's three, plus DB-1 below).

### Why pass B found anything at all: a probe-method gap

Pass A reached the populated states by walking `#app.__vue_app__` to the live component and
calling `useMixingState`'s `addColor` / `startMix` directly (its §1 documents this honestly).
That is a legitimate read-only probe, but it is **Colors-mode-only** — `addColor` mutates
`selectedColors`, and the Palettes-mode branch (`MixSourceSelector.vue:230-271`) is never
entered.

Pass B drove the route the way a user does. **Palettes mode works by pointer**: its seats are
native `<button>`s (`MixSourceSelector.vue:246`), not abrogated `WatercolorDot tag="button"`
hosts. So the Palettes branch is reachable, was never exercised by pass A, and is where DB-1,
DB-2, DB-3 and DB-5 live.

This is itself the finding behind the finding: **the route is not uniformly dead.** Colors mode
is (pass A D-5 / `wb-mix-sourceselector` D-1 — independently reconfirmed below); Palettes mode
ships and runs, and no seat had looked at it.

---

## 1. Method

Live dev server `http://localhost:9000`, WebKit via Playwright, 1440 × 900, DPR 1, settled.
Every measurement asserted `location.hash === "#/mix"` inside the same evaluation.

**Contention disclosure.** The dev browser was **shared with another agent** during this
session; the page was navigated away to `/#/extract` and `/#/palettes` three times mid-probe.
Every number below was captured in an evaluation that returned `hash: "#/mix"`, and the two
findings that carry BLOCKER/MAJOR weight (DB-1, DB-3) were **each reproduced twice**. One frame
captured during a contention window was discarded and re-taken.

**Card geometry varies between sessions** with dock state: pass A measured the card at
`y 148 · h 684.73`; pass B saw both `y 148 · h 684.8` (boot) and `y 103 · h 774` (after mode
interaction). Where a finding depends on card height I state which was used, and DB-1 holds under
both (it is *stronger* at the smaller height).

---

## 2. Correction to pass A

### DB-C1 · Pass A **D-25 is falsified** — the pane does scroll at desktop, in Palettes mode

Pass A D-25 ("The pane opts into a scroll grammar it can never exercise at desktop"):

> Measured: `scrollHeight === clientHeight === 683` **in every state including 12 operands +
> result**. The header's scroll choreography … cannot fire on this route at 1440 × 900.

The generalisation "in every state" does not hold. Measured in Palettes mode at 1440 × 900,
`hash: "#/mix"`:

```
state                                    scrollHeight   clientHeight   overflow
Colors mode, "From palettes" expanded          1156            772        384 px
Palettes mode, 2 operands, result settled      1106            772        334 px
```

Both states are pointer-reachable by an ordinary user; neither requires zoom, and neither was in
pass A's record because both live in branches its `addColor` probe cannot enter.

**Why the correction matters, and it is not a nitpick.** Pass A's D-25 disposition is
hygiene — retire a grammar the route cannot use. That cure is wrong: `pane-scroll-fade` +
`overflow-y-auto` (`MixPane.vue:62`) is *load-bearing on this route*, and removing it would turn
DB-1's off-screen result into clipped, unreachable content. D-25 should be re-scoped to "the
scroll grammar fires only in the Palettes branch, and the pane's design does not account for it"
— which is DB-1.

**Evidence.** Two live evaluations, both asserting `hash: "#/mix"`; reproduced.
**Reproduction.** `/#/mix` → Palettes tab → select two palettes → read
`card.scrollHeight` vs `card.clientHeight`.

---

## 3. New findings

### DB-1 · BLOCKER · The mix result settles 317 px below the scroll fold, and the pane does not scroll to it

**Defect.** `MixPane.vue:111-119` appends the result plate to the end of a scrolling column. In
Palettes mode the operand rack renders five `PaletteCard`s, so the column overflows — and nothing
scrolls the result into view. Measured 2.2 s after clicking Mix, reproduced twice:

```
cardRect               { x:729, y:103, w:512, h:774 }    → visible bottom  = 877
plateRect (.mix-plate) { x:754, y:1023, w:462, h:171 }   → plate bottom    = 1194
cardScrollTop          0
cardScrollH / clientH  1106 / 772
plateBottomBeyondFold  317 px
```

`scrollTop` is `0` both times. The user presses the page's one verb and **the viewport does not
change**: the operand list still fills the frame, the config bar is clipped at the bottom edge,
and the result is entirely off-screen. Frame:
`./frames/DB-01-palettes-result-below-fold.png` — the post-settle viewport, containing no result.

At pass A's card height (684.8 px, bottom 832.8) the same plate would sit **361 px** below the
fold, so the defect is not an artefact of the taller measurement.

**This voids the component's stated design thesis.** `MixPane.vue:107-110`:

> "Result plate — mounts GHOSTED the moment the mix starts (**the announced destination the
> convergence lands on**); inks in on the canvas clock's settle. **No spinner row: the animation
> IS the progress** (Q10)."

The animation is the only progress signal, and it converges on an off-screen target. With no
spinner, no status text (pass A D-6: `liveRegions: []`) and no scroll, **a successful mix is
indistinguishable from a no-op for a sighted pointer user.** Pass A recorded the same outcome for
screen-reader users at D-6 and used the phrase "below the fold-line of attention" rhetorically;
this is the measured, sighted-user instance, and it is a separate blocker.

**Evidence.** Live measurement above (×2); `MixPane.vue:62,107-119`;
`MixResultDisplay.vue:9-19` (the "announced destination" contract);
`./frames/DB-01-palettes-result-below-fold.png`.
**Reproduction.** `/#/mix` → Palettes tab → select "Sunset Ridge" and "Deep Ocean" → click Mix →
wait 2 s. `.mix-plate` is at `y = 1023`; the card's visible bottom is `877`; `scrollTop === 0`.
**Mechanism.** *No region model.* `Card` + one flex column has no notion of an action region or
an inspector, so "the place the result appears" is wherever the column happens to end. This is
pass A's family A (the housing was declined) producing a user-stranding outcome, not a
proportion outcome.
**Cure.** Do **not** add `scrollIntoView` — it fights `prefers-reduced-motion` and focus order and
still leaves the region unowned. Under pass A's D-1 cure the result is the chassis `#inspector`:
geometrically reserved, always in view, with the rack scrolling independently inside `#stage`.
DB-1 dissolves there.

---

### DB-2 · MAJOR · A `<button>` inside a `<button>`: the operand seat wraps a card whose own contract forbids it

**Defect.** `MixSourceSelector.vue:246-268` wraps `<PaletteCard>` in a native
`<button type="button" :aria-pressed="…">`. `PaletteCard` ships its own interactive controls.
Measured on a selected seat, live:

```
seatLabel:              "Deselect palette Sunset Ridge"
nestedInteractiveCount: 1
nested: [{ tag:"BUTTON", aria:"Palette menu",
           cls:"button tap-squish focus-ring glass-wash glass-capsule glass-capsule-ho…" }]
```

`<button>` inside `<button>` is invalid HTML — interactive content is forbidden in the button
content model — and the inner activation bubbles, so **opening the palette menu also toggles the
operand selection**. `PaletteCard`'s own first child carries the comment that forbids exactly
this construction; it is inside the seat, in the shipped DOM:

> `role="article"` provides a landmark for each palette; **button semantics on the card are
> omitted because inner interactive controls must be reachable** — using article + click is the
> correct pattern for a card container that also houses nested interactive elements.

Two components with contradictory contracts, and Mix is the one that broke it.

Beyond validity, the wrap imports the whole Library omnibus into an operand picker. Visible in
`./frames/DB-01-palettes-result-below-fold.png`: every Mix operand row renders a drag handle
(`⠿`), a fork count, a history count, three tag chips and a `…` action menu — none of which mean
anything when choosing what to mix. `VISUAL-CONSTITUTION.md:102` (§5):

> "A palette card is a bounded entity article, **not a clickable** `role=article`,
> `listbox`/`option` composite, or seven-mode omnibus… **The card body owns no expand, inline
> rename, action menu, transient result or hover-only swatch-action path.**"

**Evidence.** `MixSourceSelector.vue:246-268`; live nested-interactive query above;
`VISUAL-CONSTITUTION.md:102`, `:54`; `PROPORTION-AUDIT.md:77` (law 12).
**Reproduction.** `/#/mix` → Palettes tab →
`document.querySelector('button[aria-pressed]').querySelector('button')` returns the
"Palette menu" button.
**Mechanism.** *Reuse by wrapping instead of by composition.* The right primitive — a compact
operand slip — did not exist, so the richest existing card was wrapped. Owner edict 3 forbids
inventing wrapper components; it equally forbids wrapping the wrong one.
**Cure.** A **selectable palette slip** for the rack: strip, name, count, selection ring; no
menu, no handle, no tags. That is the `sm/content/quiet/opaque` tuple the canon already freezes
(`VISUAL-CONSTITUTION.md:54`) minus the Library-only actions, and it belongs beside `PaletteCard`
in glass-ui, not as a demo wrapper. It is also the seat that pass A's D-10 reorder contract needs
to attach to.

---

### DB-3 · MAJOR · Three section-label species in one pane for one job; none is the mandated role

**Defect.** `VISUAL-CONSTITUTION.md:75` (§4, closed type matrix):

> | control or label, including dropdown options | `text-small` | **Plus Jakarta Sans, non-bold** |

The pane renders three mutually exclusive treatments of that one role, two of them 63 vertical
pixels apart. Live `getComputedStyle`:

| label | source | family | size | weight | transform | tracking |
|---|---|---|---|---|---|---|
| `Selected` | `MixSourceSelector.vue:119` | **Fraunces** | 16.40 px | **600** | none | normal |
| `Color space` | `MixConfigBar.vue:98` (`.section-label`) | **Fira Code** | 14.38 px | 400 | **uppercase** | 1.44 px |
| `Hue method` | `MixConfigBar.vue:121` (`.section-label`) | Fira Code | 14.38 px | 400 | uppercase | 1.44 px |
| `Result` | `MixResultDisplay.vue:58` | **Fraunces** | `--type-caption` | **700** | **uppercase** | wide |

Three families across four labels; the constitution's answer (Plus Jakarta Sans, `text-small`,
non-bold) is used **zero** times. Fraunces is reserved for display/identity roles
(`VISUAL-CONSTITUTION.md:69-71`) — "Selected" and "Result" are neither. It is plainly visible in
`shots/safari-mobile-light/mix.png`: a bold serif "Selected" 63 px above a letterspaced mono
"COLOR SPACE", reading as two different documents stacked.

The producer's own recipe is itself outside the matrix:
`glass-ui/dist/styles/typography/utilities.css` — `.section-label { @apply text-mono-caption;
color: var(--muted-foreground); }` — Fira Code, uppercase, caption. So even the compliant-looking
rows are wrong; they are merely *consistently* wrong.

**Evidence.** Live computed-style table above; `demo/styles/utils.css`;
`node_modules/@mkbabb/glass-ui/dist/styles/typography/utilities.css`;
`VISUAL-CONSTITUTION.md:66-78`.
**Reproduction.** `/#/mix`; read computed `font-family` / `font-weight` / `text-transform` on the
four labels.
**Mechanism.** *Per-instance styling where a root vocabulary was required* — owner edict 5.
`MixSourceSelector.vue:119` and `MixResultDisplay.vue:58` are hand-rolled utility stacks
competing with the producer's `.section-label`.
**Relation to pass A.** Pass A D-21 measured control *heights* (39 / 36 / 40 px) as a rhythm
defect. This is the same mechanism one layer up, in type jurisdiction, and both close in the same
sweep.
**Cure.** One `.section-label` for every label in the pane, and correct `.section-label` at the
producer to the §4 role. Delete both hand-rolled stacks.

---

### DB-4 · MINOR · A zero-colour palette is offered as a mix operand

**Defect.** The seat list includes `aria-label="Select palette Empty"` for a palette whose count
renders `0` (visible in `./frames/DB-01-palettes-result-below-fold.png`). `canMix`
(`useMixingState.ts:50-53`) counts **palettes**, not colours:

```ts
const canMix = computed(() => {
    if (mode.value === "colors") return selectedColors.value.length >= 2;
    return selectedPalettes.value.length >= 2;       // ← counts containers, not material
});
```

So `Empty` + one real palette satisfies the gate and `mixPalettes` runs on a degenerate operand.
No guard, no disabled seat, no explanation.

**Evidence.** Live seat inventory (`"Select palette Empty"`, `aria-pressed:"false"`, selectable);
`useMixingState.ts:50-53`; the frame.
**Reproduction.** `/#/mix` → Palettes tab → the "Empty · 0" card is selectable and counts toward
`canMix`.
**Relation to pass A.** This is a second instance of pass A's family B (states never designed) and
shares D-2's cure surface: the operand gate is a property of the *material*, not the count.
**Cure.** `canMix` requires each selected palette to contribute ≥ 1 colour; the ineligible seat
carries a named disabled state (not colour alone, per `VISUAL-CONSTITUTION.md:83`).

---

### DB-5 · MINOR · Result-plate action seats are 28 × 28 px, below the stated target floor

**Defect.** Measured post-settle:

```
Copy color        { w:28, h:28 }
Save to palettes  { w:28, h:28 }
Reset             { w:28, h:28 }
```

`PROPORTION-AUDIT.md:56` (PR-12): "Touch padding bloats/misaligns visual glyphs → TIGHTEN.
**Invisible/seat geometry preserves target floor** while optics follow rung." And `:72` (law 7):
"Visual glyph size, operable target size and layout reservation are separate quantities." The
glyph may be 28; the *seat* may not.

These do not appear in the mega-tranche audit's `smallTapTargets` for `/#/mix` — that route's 8
rows are all Picker-owned (`Switch to slug`, `Generate new slug`, `Cancel`, four channel spans,
one input) — **because the plate never renders in any captured frame**. Pass A D-26 is the
general form of this blindness.

**Evidence.** Live rects above; `MixResultDisplay.vue:121-142` (`DockControl compact`);
`PROPORTION-AUDIT.md:56,72`; `audit/visual/REPORT.json` `/#/mix` `smallTapTargets` rows.
**Cure.** Keep the `compact` optical rung; expand the seat hit geometry to the 44 px floor via
producer padding, not by growing the glyph.

---

## 4. Independent confirmations of pass A

Re-measured from a cold start, without reading pass A first. All six agree.

| pass-A row | pass-B independent measurement | verdict |
|---|---|---|
| **D-1** — housing declined | `[data-slot*="chassis"], [class*="instrument-chassis"]` on `/#/mix` → **0**. `@mkbabb/glass-ui@7.0.0` exports `./instrument-chassis`; `dist/instrument-chassis.{js,d.ts}` present. `MixPane.vue:61-62` = `Card tier="resting"` + `h-full`. | **CONFIRMED** |
| **D-4** — dead acreage | 1440 × 900 boot: card `{y:148, h:684.8}`, content column `{y:237.7, h:358.1}` → **237.0 px dead = 34.6 %**. (Pass A measured 279.57 px / 40.8 % to the column bottom *excluding* `pb-4`; I measured to the padded column edge. Both far exceed the ≤15 % cap at `VISUAL-CONSTITUTION.md:28`.) | **CONFIRMED** |
| **D-1 / §2.2** — equal split | `.pane-wrapper--left {x:199, w:512}`, `.pane-wrapper--right {x:729, w:512}` → **512 / 512, exactly 50.0 %**. Canon admits only 61.8 % or 66.7 % (`VISUAL-CONSTITUTION.md:27`). | **CONFIRMED** |
| **D-5** — Colors mode is a keyboard/pointer dead end | Focusable inventory of the whole Mix card, "From palettes" **expanded** (36 swatches rendered): still exactly 6 — 2 `segmented-tab`, 1 `disclosure-trigger`, 2 selects, 1 `disabled` Mix. All 36 swatches are `<span aria-hidden="true">` with inline `pointer-events:none` and **null** `aria-label`. `elementFromPoint` at the add-ghost centre returns a `DIV`, not the ghost. Playwright refuses the click: `<div class="swatch-row …"> intercepts pointer events` ×13 → `TimeoutError`. | **CONFIRMED, and extended** — pass A observed the add slot; the *from-palettes* path (`MixSourceSelector.vue:211-221`, 36 dots) is dead by the identical mechanism. Both of Colors mode's two add paths are gone. |
| **D-8** — two Copy implementations | `MixPane.vue:12,54` `writeClipboard` (silent) vs `MixResultDisplay.vue:5,31` `useClipboard({resetMs:1500})` (confirms). Dock routes to the silent one (`usePaneRouter.ts:222`). | **CONFIRMED** |
| **D-24** — dead import | `grep -c computed MixPane.vue` → **1**; `grep -n` → line 2 only. Wrapper at `:61` restates `relative w-full h-full min-w-0` from its only child and adds a no-op `mx-auto`. | **CONFIRMED** |

Also independently confirmed, structural: **no failure arm** (`useMixingState.ts:32-36` —
`MixResult` has no error member; `:79-101` — no `try`), **no provenance** into the plate
(`MixPane.vue:112-118` passes `:result` and `:ghost` only), **silent Save**
(`MixPane.vue:38-47` — no emit, no status ref, no template node reacts), **no reorder**
(`useMixingState.ts:119-137` returns no reorder function). These are pass A D-2, D-11, D-7, D-10.

One addition to D-7's cure surface: `demo/styles/animations.css:75-77` defines a family for
exactly the missing beat —

> `vj-celebrate` — a ONE-SHOT feedback beat (**saved!**, error pop). Bouncy spring entrance,
> quick retire.

The pane uses `vj-morph` (`MixPane.vue:111`) and `vj-enter` (`MixResultDisplay.vue:92`) and never
the third. The confirmation register Save needs already exists in the house vocabulary and was
not consumed.

---

## 5. Negative proofs — hypotheses raised and disproved

Recorded so no later seat re-litigates them.

1. **The palette selection ring is *not* cascade-dead.** `MixSourceSelector.vue:139-145`
   documents a real prior bug at the operand-chip site — Tailwind `ring-*` utilities compose the
   box-shadow channel in `@layer utilities` and lose to the WatercolorDot's unlayered material
   shadow. I predicted `:259` (`ring-2 ring-primary ring-offset-2`) repeated it. **It does not.**
   Measured on a pressed seat:

   ```
   box-shadow: rgba(0,0,0,0) 0 0 0 0, rgba(0,0,0,0) 0 0 0 0,
               rgb(251,250,248) 0 0 0 2px,
               oklch(0.412026 0.0714897 188.61) 0 0 0 4px,
               rgba(0,0,0,0) 0 0 0 0
   opacity: 0.75 (unselected) → 1 (selected)
   ```

   The ring paints because it sits on the outer `<button>` while the cartoon shadow sits on the
   inner `<div>` (`childShadow: oklab(0.28 …/0.32) -3px 3px 0 0, …`) — they compose rather than
   collide. Selection carries two independent channels (ring + opacity). **Sound.**

2. **`vj-morph` does not force layout on this pane.** The family lists `max-height` in its
   transition (`animations.css:104-122`), which would reflow per frame — but
   `--vj-morph-collapse` / `--vj-morph-expanded` default to `none` and `MixPane.vue:111` sets
   neither, so no height interpolation occurs. The result-plate swap is opacity + transform only.
   **Sound.**

Also re-verified sound, agreeing with pass A's D-27: **reduced motion** is globally neutralised
(`demo/styles/animations.css:184-188`, plus `useMixingState.ts:13-15`'s immediate settle);
**motion is tokenized** — `MixResultDisplay.vue:152-157` uses `var(--duration-fast)
var(--ease-standard)`, both `Transition`s use named `vj-*` families, no ad-hoc durations or curves
in `MixPane.vue`; **`verbatimModuleSyntax`** is respected (`MixPane.vue:13` and all sibling type
imports use `import type`); **no horizontal overflow, no page errors, one `<main>`** on `/#/mix`
in all four Safari matrices (`REPORT.md:123,138,153,168`).

---

## 6. One more note on the convergence canvas

Pass A D-22 records that `MixAnimationCanvas` paints *above* the config bar (`z-controls`,
`z-index: 20`). A second, independent defect in the same element: in Palettes mode its **extent**
is short of its content.

```
canvasRect   { w:510, h:1038 }
cardScrollH  1106
→ canvasCoversScrollBox: false   (68 px of content lies outside the animation surface)
```

Source chips below `y = 1038` cannot originate a visible drop, and the `[data-mix-target]` well
can scroll out of the canvas entirely — DB-1's mechanism at the paint layer. This is a
consequence of the same missing region model, and resolves under pass A's D-1 cure by sizing the
animation surface to the rack region rather than to a scrolling page column. Filed as a rider on
D-22, not a new row.

---

## 7. Consolidated register delta

| id | severity | finding | disposition |
|---|---|---|---|
| **DB-1** | **BLOCKER** | Result settles 317 px below the fold; `scrollTop` stays 0 | new — dissolves under D-1's chassis `#inspector` |
| **DB-2** | MAJOR | `<button>` inside `<button>`; Library omnibus imported into the operand rack | new — needs the operand-slip primitive in glass-ui |
| **DB-3** | MAJOR | Three label species for one role; none is the §4 mandate | new — one `.section-label`, corrected at the producer |
| **DB-4** | MINOR | Zero-colour palette selectable as an operand | new — `canMix` gates on material, not count |
| **DB-5** | MINOR | Result-plate action seats 28 × 28 px | new — seat geometry to the 44 px floor |
| **DB-C1** | — | Pass A **D-25 falsified**: the pane *does* scroll in Palettes mode | re-scope D-25; do **not** retire `pane-scroll-fade` |

Pass A's D-1 … D-27 stand unchanged at `./challenge-D-design-pass-a.md`, with D-25 corrected as
above and D-22 extended by §6.

**Mechanism families — pass A's taxonomy holds; the new rows slot in:**

| family (pass A) | pass-B additions |
|---|---|
| **A · the housing was declined** | **DB-1**, DB-C1, §6 |
| **B · states that were never designed** | DB-4 |
| **C · one idea, two implementations** | DB-3 |
| **D · the canon contract never wired** | DB-2 |
| **E · rendered truth vs token intent** | DB-5 |

Family A remains causal, and DB-1 sharpens the argument: the missing housing is not only a
proportion failure, it is the reason a successful command produces no visible outcome.

---

## 8. Cure-order delta

Pass A's ten-step order is correct and I do not restate it. Two amendments:

1. **DB-1 joins step 1.** It is not a separate fix — the chassis `#inspector` is a reserved,
   always-visible region, so the result cannot land off-screen. But step 1 must now be justified
   as a **correctness** fix, not only a proportion fix: today the instrument's output is
   invisible in its pointer-reachable mode.
2. **DB-2 joins step 7**, ahead of reorder. The operand slip is the seat that D-10's grab/move/
   drop contract and D-12's per-operand weight both attach to, so it must exist before either
   lands. It is a glass-ui addition, not a demo wrapper — owner edict 4.

DB-3, DB-4 and DB-5 fold into pass A's steps 8 and 9 without reordering.

---

## 9. Evidence index (pass B)

| artefact | proves |
|---|---|
| `./frames/DB-01-palettes-result-below-fold.png` | the post-settle viewport in Palettes mode, containing no result |
| `./challenge-D-design-pass-a.md` | pass A preserved verbatim (45 178 bytes, unmodified) |
| live measurements, inline above | DB-1 (×2), DB-2, DB-3, DB-4, DB-5, DB-C1, and the six confirmations |

Pass A's harness at `./evidence/challenge-D/*.mjs` and its 14 `./frames/D-*.png` remain the
deeper record for its own rows and were not touched.

**No source edits land from this formation.** This report is the finding of record.
