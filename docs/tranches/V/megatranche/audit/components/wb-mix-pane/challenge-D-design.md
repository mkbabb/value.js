# CHALLENGE-D — `demo/workbenches/mix/MixPane.vue` — design axis, **pass D**

## Model receipt

I observe myself to be **Opus 5 (1M context)**, model id `claude-opus-5[1m]` — the model this seat
was explicitly spawned with. The seat is declared, not inherited.

- **Axis:** design — visual truth · state coverage · motion · design-system boundary · proportion/seat law
- **Subject:** `demo/workbenches/mix/MixPane.vue` (123 L), composition root of route `/#/mix`
- **Base:** branch `tranche-u`, HEAD `c654824e`; `@mkbabb/glass-ui@7.0.0`
- **Write scope honoured:** only under
  `docs/tranches/V/megatranche/audit/components/wb-mix-pane/`. No source file was edited. New frames
  written to `./evidence/`.

---

## 0. Relationship to passes A, B and C — read this first

Three D seats preceded me:

- **pass A** — `./challenge-D-design-pass-a.md` (45 178 B), register D-1…D-27.
- **pass B** — `./challenge-D-design-pass-b.md` (25 447 B), register DB-1…DB-5 + DB-C1.
- **pass C** — was occupying `challenge-D-design.md`. I preserved it **verbatim, byte-identical**
  at `./challenge-D-design-pass-c.md` before writing this file:

```
$ shasum -a 256 challenge-D-design.md challenge-D-design-pass-c.md
08decb74a57cdb432cf11a9e780bcc807c96d1ea1c08b8319ee172e4bd81808e  challenge-D-design.md
08decb74a57cdb432cf11a9e780bcc807c96d1ea1c08b8319ee172e4bd81808e  challenge-D-design-pass-c.md
```

I completed an independent instrumented pass **before reading any of the three**. **None is
superseded.** This document carries only what a fourth, independently-instrumented pass changed:

| | count |
|---|---|
| **new BLOCKER** no prior pass found | 1 |
| **new MAJOR** | 3 |
| **sharpenings** — a prior negative proof or scope is narrowed by measurement | 2 |
| **independent cold confirmations** of prior rows | 8 |
| **negative proofs concurred with**, re-derived cold | 3 |

**Consolidated verdict: DEFECTIVE — 7 BLOCKER** (A's three, B's DB-1, C's DC-1 and DC-2, plus
**DD-1** below).

### Why pass D found anything: nobody had watched the pane *while the verb fired*

Passes A–C each measured **static frames**: boot, mid-mix (C), settled (B, C). Nobody sampled the
**scene geometry across the whole commit transition**. My advance is a four-point timeline —
`settled → reset → +250 ms → +2250 ms` — of the *container*, not the plate.

That is where DD-1 lives, and it partially reverses pass C's negative proof #2 ("motion is fully
tokenised; nothing layout-forcing animates"), which is correct about the CSS transitions and wrong
about the rendered result.

Two further gaps I closed: pass C probed forced-colors on `.dashed-well` only (I probed the
**disabled verb**), and every prior pass measured contrast by *token name* rather than by
**computed ratio**.

---

## 1. Method

Live dev server `http://localhost:9000`, read-only, Playwright/WebKit.

| arm | what it decided |
|---|---|
| 1440×900 LTR light | scene ratio, dead acreage, tab walk, computed type/contrast, nesting |
| **1440×900 timeline** — `settled → Reset → t+250 ms → t+2250 ms` | **DD-1** (the commit reflow) |
| 1200 / 1024 / 900 / 720 × 900 | **DD-3** — the band where `h-full` inverts meaning |
| 390×844 | mobile centring, tap-target census |
| `forcedColors: "active"` @1440 | **DD-4** — the disabled verb in HCM |
| `dir="rtl"` @1440 | RTL negative proof (concurs with C) |

Frames written under `./evidence/`:
`mix-palettes-result-1440.png` (populated/result state), `mix-forced-colors-1440.png`,
`mix-rtl-1440.png`, `mix-900x900.png`, `mix-colors-well-empty.png`.

Shipped capture read in full: `visual/shots/{safari-desktop,safari-mobile}-{light,dark}/mix.png`.

---

## 2. New BLOCKER

### DD-1 · BLOCKER · The primary verb reflows the entire two-pane scene, twice, the second jump landing on the settle frame

**No prior pass measured the container across the commit.** Pasted probe output, 1440×900,
Palettes mode, two operands (the only reachable operand path — the Colors path is inert per A D-5):

```
with-result          dual y=104.2  h=771.5    mix card y=104.0  h=771.5
click "Reset"
after-reset(empty)   dual y=147.6  h=684.8    mix card y=148.0  h=684.8
click "Mix"   (button disabled=false)
t+250 ms  mixing     dual y=138.2  h=703.5    mix card y=138.0  h=703.5
t+2250 ms settled    dual y=104.2  h=771.5    mix card y=104.0  h=771.5
```

Pressing Mix grows the shared `.pane-container--dual` by **+86.7 px in two discrete, uncushioned
jumps** — **+18.7 px** when the ghost plate mounts, **+68.0 px** when ghost→content swaps — and
translates the Mix card's top edge **−44 px** (148 → 138 → 104). The Picker beside it is re-centred
by the wrapper's `justify-center` in the same two frames.

`MixPane.vue:107-110` describes the plate as *"the **announced destination** the convergence lands
on"*. It is an announced destination that **moves 44 px upward while the drops are in flight**, and
whose second move coincides exactly with the settle frame — the one frame the whole choreography
exists to make legible.

**Why pass C's negative proof #2 needs sharpening, not discarding.** C is right that `vj-morph`'s
`max-height` channel interpolates nothing because `--vj-morph-collapse` / `--vj-morph-expanded` are
unset. C read that as *sound*. The correct reading is the inverse: those two custom properties
(`demo/styles/animations.css:122,131,134`) are **the family's own facility for exactly this swap**,
and leaving them unset does not mean "no height animation" — it means **the height change is
instantaneous and un-narrated**. Confirmed absent:

```
$ grep -rn -- "--vj-morph" demo/workbenches/mix/
(no matches)
```

`MixResultDisplay.vue:60` swaps a ~63 px ghost body for a ~170 px content body inside `vj-morph`
with no reserved height. The tokenised cure ships in the design system and is unused.

**It also degrades pass C's DC-2.** DC-2 established that `[data-mix-target]` never reaches the DOM,
so `mixStage.ts:121-124` always takes the fallback `{ x: root.clientWidth/2, y: root.scrollHeight *
0.7 }`. My timeline shows `scrollHeight` is **itself changing** across the window the animation
runs in (684.8 → 703.5 → 771.5). The invented target is computed against a mid-reflow extent, so it
is not merely wrong-by-construction — it is **non-deterministic**.

**Reproduction.** `/#/mix` at 1440×900 → Palettes tab → select two palettes → Mix → sample
`document.querySelector('.pane-container--dual').getBoundingClientRect()` at t+0, t+250 ms, t+2250 ms.
**Mechanism.** *A "one surface, new content" morph between two bodies of very different height, in a
`justify-center` container, with the family's height-morph geometry unset.*
**Cure.** Under the chassis cure (A D-1) the result becomes a permanently-present `#inspector` with
reserved geometry and the jump cannot occur. Independently of housing, `MixResultDisplay` must
declare `--vj-morph-collapse` / `--vj-morph-expanded` so the swap is narrated instead of snapped.
**This must be in the chassis cure's π** — a chassis built without reserved inspector geometry
reproduces DD-1 exactly.

---

## 3. New MAJORs

### DD-2 · MAJOR · Measured contrast failure on both in-plate captions — 3.19 : 1

Every prior pass identified the three label *registers* (B DB-3, confirmed by C). None measured the
**ratio**. Computed, 1440×900 light:

```
"Selected"  rgb(112, 89, 66)  on  --well-bg oklab(0.913295 0.00550478 0.0130424)  →  3.19 : 1
"Result"    rgb(112, 89, 66)  on  --well-bg (identical)                            →  3.19 : 1
```

Both are 14.4 px / 16.4 px non-large text; WCAG AA requires **4.5 : 1**. Both resolve from
`text-muted-foreground` (`MixSourceSelector.vue:119`, `MixResultDisplay.vue:58`).

The provenance makes this a *regression*, not an oversight. `demo/shared/ui/PaneHeader.vue:26-31`
records the AB-2 remediation verbatim:

> "the caption speaks the CERTIFIED de-emphasis rung `--ink-muted` … **never raw
> `--muted-foreground`, which measured 4.29:1** on the TRUE header ground".

The remediation landed on PaneHeader and never reached the two in-plate captions ~100 px below it,
which sit on a **darker** ground (`--well-bg` = `card 92% + foreground 8%`, `foundation.css:328`)
and therefore measure worse than the 4.29 that triggered the remediation in the first place.

`VISUAL-CONSTITUTION.md:82` (§4.1): *"Text, focus, boundaries and state meet their **rendered**
contrast on the actual material tier; **a token name is not evidence**."*

**Cure.** Both captions consume the boot-stamped `--ink-muted` rung the header already uses — a
token swap at the two sites, or (better) a producer label rung consumed by all three registers at
once, which discharges B DB-3 and this row together.

---

### DD-3 · MAJOR · `h-full` means two contradictory things across a 1 px breakpoint

Pass A D-4 measured the dead acreage at 1440 (43.0 %); I measure 37.0 % at 1440 in the boot state
(`253.1 px` void below the disabled verb, of a `684.8 px` card — the delta from A is state, not
disagreement: A's frame had the collapsible trigger absent). Neither A nor C established that the
defect is **band-conditional**. Measured across the desktop bands:

| viewport | `.pane-container--dual` computed columns | mix card height | void |
|---|---|---|---|
| 1440×900 | `512px 512px` | 684.8 | **253.1 px (37.0 %)** |
| 1200×900 | `512px 512px` | 680 | present |
| 1024×900 | `489.602px 489.602px` | 660 | present |
| **900×900** | **`868px`** (single column) | **433** | **none — content-hugs** |
| **720×900** | **`688px`** (single column) | **428** | **none — content-hugs** |

Below 1024 px `h-full` is a **no-op** and the composition is correct. At and above 1024 px the same
declaration manufactures the void. One class on `MixPane.vue:61-62`, two designs, no author
intent expressed for either.

Two further measured facts in the collapsed band: the class list still reads
`pane-container pane-container--dual` while the grid is a **single** column, and the mix Card is
capped at 512 px inside an 868 px column — **41 % of the column is empty gutter** with the pane
centred in it (`evidence/mix-900x900.png`).

`VISUAL-CONSTITUTION.md:28` (§3 law 2) caps empty secondary content at ≤ 15 %; `PROPORTION-AUDIT.md:48`
(PR-04) rules **REMOVE**.

**Cure.** The pane root sheds `h-full` entirely and the chassis owns reserved geometry per region.
This is the same cure as A D-1 / DC-1; DD-3's contribution is that **the π must sample the 1024
boundary**, or the fix will be verified in the band where the bug does not exist.

---

### DD-4 · MAJOR · In forced colors the disabled verb is **opacity-only** — the one channel HCM users opt out of

Pass C's forced-colors probe covered `.dashed-well` and correctly found it adapts. The **verb** does
not. Measured, Chromium-equivalent `emulateMedia({ forcedColors: 'active' })`, 1440×900:

```
Mix button:  disabled=true   aria-disabled=null   aria-describedby=null   title=null
             background rgb(255,255,255)   border rgb(0,0,0)   color rgb(96,0,0)
             opacity 0.5      ← forced-color-adjust does NOT reset opacity
```

`forced-colors` remaps colour but leaves `opacity` untouched, so in HCM the **only** surviving
disabled signal is a 50 % wash — precisely the perceptual channel a high-contrast user has asked the
system to stop relying on. Visible in `evidence/mix-forced-colors-1440.png`: a washed-out "Mix"
label on white, with the pane's lower third rendering as a blank white rectangle (independent visual
confirmation of DD-3).

`VISUAL-CONSTITUTION.md:83` (§4.1): *"Selected, failed, pending, withdrawn and **disabled** states
are never color-only. Role, accessible name, state/value and **associated error/status** are
explicit."* Opacity-only is strictly worse than colour-only.

Compounding, and independently measured: `canMix` needs `>= 2` (`useMixingState.ts:50-53`) while the
empty rack renders **exactly one** silhouette and `MixSourceSelector.vue:37` sets `MIN_COLORS = 1` —
the affordance teaches an arity of one for an operation requiring two, and no copy anywhere
corrects it (pane resting text total: 186 chars, `visual/REPORT.md:123`).

**Cure.** The disabled verb carries `aria-describedby` pointing at a persistent requirement line in
the action region ("Select 2 or more colors"), and the disabled register uses a real token step
rather than a wash. Under `PROPORTION-AUDIT.md:52` (PR-08, *"Pending/failure/export/recovery truth
only transient — ADD-AFFORDANCE"*) this is the Mix site of an already-owned family.

---

## 4. Sharpenings of prior rows

### DD-S1 · pass C negative proof #2 is correct about transitions and wrong about the rendered result

Recorded in full at **DD-1**. C: *"nothing layout-forcing animates … `max-height` … resolves to
`none` and interpolates nothing."* True of the CSS. But the commit produces **+86.7 px of container
growth and −44 px of scene translation in two un-narrated jumps**, measured. Disposition changes
from "sound, preserve" to "the unset `--vj-morph-collapse`/`-expanded` pair **is** the defect".

### DD-S2 · pass C's DC-1 desktop arm is state-dependent — at 1440×900 the card grows rather than clipping

DC-1 (and B's DB-1) report the settled plate 317 px below the card fold with `scrollTop 0`. In my
1440×900 palettes arm the plate was **fully visible**:

```
settled:  card y=104.0 h=771.5 (bottom 875.5)   plate y=687.8 h=170.7 (bottom 858.5)
          mixCard.scrollHeight 770 === clientHeight 770      ← no overflow at all
```

The pane did not clip; it **grew the whole scene** (DD-1). So `h-full` is not in fact capping the
Card — the grid row grows with content until `main` runs out. Whether a given commit clips (DC-1)
or jolts (DD-1) depends on whether the grown container still fits `main`'s 804 px.

This does **not** weaken DC-1 — its mobile and 720×450@2 arms have `document.scrollHeight ===
innerHeight` and are unrecoverable. It widens the family: **one missing region model, two rendered
symptoms**, and a cure verified against only one of them will look green while the other ships.

---

## 5. Independent cold confirmations

Measured before reading any prior report. All eight agree.

| prior row | pass-D independent measurement | verdict |
|---|---|---|
| A D-1 · housing declined | `MixPane.vue:62` uses `Card`. **New supporting evidence:** the required housing ships and has zero consumers — `grep -rn "InstrumentChassis\|instrument-chassis" demo/ \| wc -l` → **0**; `node_modules/@mkbabb/glass-ui/dist/instrument-chassis.d.ts` present at **7.0.0** | **CONFIRMED** |
| A · equal split | `getComputedStyle(.pane-container--dual).gridTemplateColumns` = `512px 512px` @1440/1200, `489.602px 489.602px` @1024 → protagonist share **49.14 %** at every dual band, against §3 law 1's admitted 61.8033989 % / 66.6666667 % | **CONFIRMED** |
| A D-4 · dead acreage | 253.1 px void below the disabled verb = **37.0 %** of a 684.8 px card, `scrollHeight === clientHeight` (reserved, not scrolled) | **CONFIRMED** (band-qualified — DD-3) |
| A D-5 / DC-2 · Colors mode is a dead end | `add-slot-ghost` renders `tag SPAN`, `aria-hidden "true"`, `aria-label null`, `tabIndex -1`, `focus()` does not take, computed `pointer-events "none"`, `<Plus>` glyph **not rendered** (`hasPlusSvg false`; children = `svg.watercolor-filter-host`, `span.watercolor-ghost-stroke`). Programmatic `.click()` → `[data-mix-source]` count **0 → 0** | **CONFIRMED** |
| A · no add path with an empty library | `MixSourceSelector.vue:181` gates the only other path behind `v-if="savedPalettes.length > 0"`; Palettes mode with 0 palettes renders `EmptyState` alone (`:239-244`) → **zero mix routes in both modes** for a first-time user | **CONFIRMED** |
| B DB-2 · nested `<button>` | `mixCard.querySelectorAll('button button')` → 2 hits: `"Palette menu"` ⊂ `"Deselect palette Audit Alpha"`, and ⊂ `"Deselect palette Audit Beta"` (`MixSourceSelector.vue:246-268` wrapping a `PaletteCard` that carries its own menu button) | **CONFIRMED** |
| B DB-3 · three label species | `Selected` = Fraunces 16.4 px w600 sentence-case; `.section-label` = Fira Code 14.384 px w400 uppercase ls 1.4384 px; `Result` = Fraunces 14.384 px **w700** uppercase ls 0.3596 px. §4's closed matrix (`text-small` / Plus Jakarta Sans / non-bold) used **zero** times | **CONFIRMED** — and now contrast-failing, DD-2 |
| B DB-5 · 28 px action seats | Settled plate `DockControl` rects `28×28 · 28×28 · 28×28`; names carried by `title` only, `aria-label null` on all three | **CONFIRMED** |

Two further structural confirmations:

- **Heading hierarchy.** Measured `h1 = 0`, `h2 = 0`, `h3 = ["92.0%,88.8,20.0", "Mix"]` — the pane
  title is an `<h3>` at computed `font-size: 41.888px` (display-1, `PaneHeader.vue:23` + its
  `.pane-header-title` rule), and the route's *other* `<h3>` is the Picker's numeric readout.
  §4.1 requires exactly one H1; `PROPORTION-AUDIT.md:76` (§5 law 11) forbids a display-sized readout
  being a document heading. Agrees with `REPORT.json` `counts.h1: 0` in all four matrices.
- **Dead import.** `computed` imported and never used, `MixPane.vue:2` (reconfirms A D-24 / DC-7).

---

## 6. Rows pass D adds at MINOR/INFO

| id | severity | finding | evidence |
|---|---|---|---|
| **DD-5** | MINOR | The per-chip **remove** control is nameless, hover-only and 16×16: contains only `<X class="w-2.5 h-2.5" />` with **no `aria-label`, no `title`, no text**; `opacity-0 group-hover:opacity-100` so it does not exist on touch; `w-4 h-4` = a **16 px** hit box against §5 law 7's floor. Every prior pass exhaustively covered the *add* path; the *remove* path is the same seat defect at the other end. PR-07 + PR-12. | `MixSourceSelector.vue:152-158` |
| **DD-6** | MINOR | Mobile is a centred fixed card, not the ratified sequence: at 390×844 the card measures `y=265.0 h=409.6` → **265 px above + 169 px below = 434 px (51.4 %) of the viewport is empty atmosphere**, with `document.scrollHeight − clientHeight = 0`. §3 law 6 requires *"one **document-scrolling** stage→inspector→action sequence"*. Corroborates DC-1's mobile arm from the resting state. | measured; both shipped mobile captures |
| **DD-7** | MINOR | Mobile tap-target census inside the pane, all below the 44 px floor: `Colors` 69.3×**27.5** · `Palettes` 69.3×**27.5** · `From palettes` 324×**26.3** · `Color space` 158×**36** · `Hue method` 158×**36** · `Mix` 324×**40**. Extends B DB-5 (which covered the 28 px plate seats) to the resting control set. | measured @390×844 |
| **DD-8** | MINOR | The result region states the same four colors twice, adjacently: four `WatercolorDot`s and a `linear-gradient` strip of the identical stops, 28 px apart (dots row, then strip `430×16` at y=786.5). PR-05's duplication mechanism. Pass C counted the strip's *area* in DC-4 but not the redundancy. | `MixResultDisplay.vue:97-116`; `evidence/mix-palettes-result-1440.png` |
| **DD-9** | INFO | The only centred element in a left-aligned column: `SegmentedTabs` measures `x=903.9 w=162.2` → centre **985**, against a content-column origin of **x=754** shared by "Selected", all three `.section-label`s, both selects and the verb. One optical axis broken by one element for no informational reason. | `MixSourceSelector.vue:104` (`justify-center`); measured |
| **DD-10** | INFO · HYPOTHESIS | In forced colors the selected `SegmentedTabs` item loses its producer filled indicator and is distinguished only by `border-width: 2px` (colour `rgba(5,0,73,0.8)` — **not** a system colour) versus `0px` unselected. If focus also renders as a rectangle outline, §4.1's *"focus remains visibly distinct from selection … forced colors"* fails. **Focus was not probed under forced colors — this is a hypothesis and needs one more frame.** | measured border deltas; `evidence/mix-forced-colors-1440.png` |
| **DD-11** | INFO · HYPOTHESIS | `useMixingAnimation.ts:135-143` sizes the canvas backing store to `parent.scrollHeight` while the CSS box is `h-full` (= client height, `MixAnimationCanvas.vue:30`). When the pane overflows, backing-store and CSS aspect diverge and the drops should render squashed by `scrollHeight/clientHeight`. **Not reproduced** — no probed configuration produced `scrollHeight > clientHeight`. Code read only. | code read |

---

## 7. Negative proofs — concurred with, re-derived cold

Recorded so no later seat re-litigates them. All three independently reproduced.

1. **`prefers-reduced-motion` is honoured, and the reasoning is exemplary.** Global CSS guard at
   `demo/styles/animations.css:184`; `useMixingAnimation.ts:120-125` fires `onSettled()`
   synchronously without arming the loop, so the plate inks with zero dead time rather than
   stranding the phase machine. Concurs with C's negative proof #1. **This must survive any cure.**
2. **RTL mirrors cleanly.** Measured @1440 with `dir="rtl"`: dual grid mirrors (mix card `x 729 →
   199`), `.section-label`s mirror with `text-align: start` (`Color space` x=459, `Hue method`
   x=224), the add slot flows to the well's **inline-start** (ghost right edge 672.5 against well
   inner start 674), and `document.scrollWidth === clientWidth` — **no horizontal overflow**.
   Concurs with C's negative proof #3. Frame: `evidence/mix-rtl-1440.png`.
3. **The animation canvas is correctly inert and its coordinate model is reflow-robust.**
   `aria-hidden="true"`, `pointer-events-none`, `z-controls` (`MixAnimationCanvas.vue:27-33`);
   backing store allocated only on `arm()`. And `mixStage.ts:111-130` measures
   `layoutCenter(el, root)` **relative to the Card**, so DD-1's whole-card translation does not
   invalidate the sampled drop origins — DD-1 is a visual-continuity defect, not a broken animation.

Also re-verified sound: **no horizontal overflow at any probed viewport in either direction**;
**one `<main>`** on the route; **the ONE-CLOCK law is implemented as documented**
(`useMixingState.ts` owns no timers, `:103-106` advances only on the canvas edge, `:83` re-entry
guard); **`PALETTE-CONTRACT` selection identity honoured** — mix selection keys on `slug`, never the
local-only `id` (`MixSourceSelector.vue:55-59`, `useMixingState.ts:63-72`), and the wrapper seat
uses `aria-pressed`, not `aria-selected`.

---

## 8. Consolidated register delta (pass D)

| id | severity | finding | disposition |
|---|---|---|---|
| **DD-1** | **BLOCKER** | The commit reflows the whole scene: `.pane-container--dual` +86.7 px in two jumps, mix card top −44 px, second jump on the settle frame; `--vj-morph-collapse`/`-expanded` unset | **new** — the chassis cure's π must assert scene geometry is invariant across `idle→mixing→done` |
| **DD-2** | MAJOR | "Selected" and "Result" both measure **3.19 : 1** on `--well-bg`; `text-muted-foreground` is the exact token the AB-2 remediation retired at 4.29 : 1 | **new** — swap both to `--ink-muted`; folds into B DB-3's cure |
| **DD-3** | MAJOR | `h-full` is a no-op below 1024 px and manufactures the 37 % void at and above it — one class, two designs | **new** — sharpens A D-4; π must sample the 1024 boundary |
| **DD-4** | MAJOR | The disabled verb is **opacity-only** under forced colors, with no reason, no `aria-describedby`, no status region | **new** — PR-08's Mix site |
| **DD-5** | MINOR | The remove control: nameless, hover-only, 16×16 | new — the other end of the seat defect |
| **DD-6** | MINOR | Mobile: 51.4 % empty atmosphere around a centred, non-scrolling card | new — corroborates DC-1 from rest |
| **DD-7** | MINOR | Six resting controls below the 44 px touch floor | extends B DB-5 |
| **DD-8** | MINOR | The four result colors are stated twice, adjacently | new |
| **DD-9** | INFO | The tab group is the only centred element in the column | new |
| **DD-10** | INFO | HYPOTHESIS — selection may collapse onto focus in forced colors | needs one frame |
| **DD-11** | INFO | HYPOTHESIS — canvas backing-store/CSS aspect divergence under overflow | not reproduced |
| **DD-S1** | — | C negative proof #2 **sharpened**: correct about transitions, wrong about the rendered result | the unset morph geometry **is** the defect |
| **DD-S2** | — | C DC-1 / B DB-1 **widened**: at 1440×900 the card grows rather than clipping | one missing region model, two rendered symptoms; verify both arms |

**Mechanism families — pass A's taxonomy holds:**

| family (pass A) | pass-D additions |
|---|---|
| **A · the housing was declined** | **DD-1**, DD-3, DD-6, DD-S2 |
| **B · states that were never designed** | **DD-4**, DD-5 |
| **C · one idea, two implementations** | DD-8, DD-9 |
| **D · the canon contract never wired** | (confirmations only) |
| **E · rendered truth vs token intent** | **DD-2**, DD-10 |

Family **E** is the one pass D moves. Passes A–C established that contracts are silently discarded;
pass D establishes that **where the contract *was* wired, the rendered result still fails its own
stated law** — a certified contrast rung named in a comment and not applied, a morph family with a
height facility left unset, a responsive declaration that inverts meaning at a breakpoint nobody
sampled. These do not need a missing wire to explain them. They need somebody to look at the pixels.

---

## 9. Strongest single defect (pass D's own)

**The pane's one verb moves the pane.**

`MixPane.vue:107-110` promises "the announced destination the convergence lands on". Measured, that
destination translates **−44 px in two jumps totalling +86.7 px of container growth**, the second
landing on the exact settle frame the choreography exists to make legible — while the fallback
target coordinate the animation is actually using (pass C's DC-2) is computed from a `scrollHeight`
that is changing underneath it.

The design system already ships the cure and the feature declines it: `--vj-morph-collapse` and
`--vj-morph-expanded` exist in the `vj-morph` family for precisely this swap and appear nowhere in
`demo/workbenches/mix/`. Pass C read their absence as "interpolates nothing, therefore sound". The
absence is the defect.

Consolidated across four passes, the single strongest defect on this component remains
**A D-5 / DC-2** — the workbench's default mode cannot be operated at all. DD-1 is what the user
sees *after* they find the one path that still works.

---

## 10. The gestalt cure (unchanged in shape from A; DD-rows attach to it)

1. **Compose Mix on `InstrumentChassis`** — shipped in glass-ui 7.0.0, **zero demo consumers**
   measured. Its π must assert: protagonist share ∈ [61.8 %, 66.7 %]; **scene geometry invariant
   across `idle → mixing → done`** (DD-1); **arms at 1440, 1024, 900 and 390** (DD-3, DD-6); and the
   result region present-and-reserved in every phase.
2. **Mint the named operand seat** — a real `<button type="button">` owning name, focus, 44 px hit
   box and activation, with `WatercolorDot` as its inert face. One seat, three sites: add slot,
   selected chip, remove control (A D-5, DC-2, B DB-2, DD-5, DD-7).
3. **Give the result region provenance and reserved height** — operands, space, arc, strategy, plus
   `--vj-morph-collapse`/`-expanded` (DD-1, DD-8, C's provenance row).
4. **Retire the three caption hand-rolls onto one producer label rung on `--ink-muted`** (B DB-3 +
   DD-2), and **state the operand minimum** beside the disabled verb with a real disabled register
   (DD-4).

**No source edits land from this formation.** This report is the finding of record for pass D;
passes A, B and C stand unmodified alongside it.
