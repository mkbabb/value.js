# CHALLENGE-D — `SearchFilterBar.vue` · the design is flawed — **PASS 5**

## Model receipt

I observe myself to be **Opus 5**, exact model id `claude-opus-5[1m]` (the 1M-context arm), as
declared at spawn. The seat is **declared, not inherited, not defaulted**.

---

## 0. Standing of this document

Four CHALLENGE-D seats ran before me. I preserved pass 4 verbatim as
`challenge-D-design-pass4-e9cf0aa4.md` before writing this file; all five artifacts survive:

| file | pass |
|---|---|
| `challenge-D-design-pass1-c654824e.md` | 1 (D-1…D-19) |
| `challenge-D-design-pass2-c654824e.md` · `-pass2-hydrated-payload.md` | 2 (D2-B1…D2-m5) |
| `challenge-D-design-pass3-f36f780c.md` | 3 (P3-B1…P3-i1) |
| `challenge-D-design-pass4-e9cf0aa4.md` | 4 (P4-B1…P4-i2) — preserved by me at the head of this session |
| **this file** | **5 (P5-B1…P5-i2)** |

**Discipline followed.** I ran probes P5-1…P5-7 to completion and wrote every JSON and frame to
disk **before** opening any prior report beyond its finding-ID index. That index was read only to
label each of my results NEW / NEW-EXT / CORROBORATED honestly — this pass does not re-spend the
budget on settled ground, and it does not claim settled ground as new.

**What this pass adds.**

1. **The composition finding no prior pass made.** The binding topology decision names Browse's
   search/filter chrome by shape — *a shallow leading tray* — and this component is a 240 × 633
   floating overlay. §3.
2. **The first populated-wall arm.** Every prior pass measured this component over an empty or
   errored wall. I stubbed a 12-palette wall and a 10-tag catalogue at the network layer and
   measured **what the menu covers while you use it**: 37.9 % of the Browse pane on desktop,
   54.3 % on mobile, all six visible palette cards.
3. **Rendered contrast from composited pixels**, not token names — including the number that
   reframes the trigger: **1.01 : 1** against the field it sits in.
4. **Four unhandled data states** (0 tags, 10 tags, a wrapping tag, an unbroken tag) measured as
   geometry, not asserted.
5. **A control experiment that kills a finding I was about to file.** §6.1.

| | |
|---|---|
| Component | `demo/palettes/browser/search/SearchFilterBar.vue` — 249 lines (125 template), area `palettes` |
| Sole consumer | `demo/palettes/BrowsePane.vue:16-26`, slotted into the glass-ui `SearchBar` default slot (`BrowsePane.vue:10-14`) |
| Route | `/#/browse` only |
| Subject state | `git diff --stat c654824e HEAD -- demo/palettes/browser/search/ demo/palettes/BrowsePane.vue` → **empty**. Byte-identical to the declared `c654824e`. Working-tree HEAD at probe time `d19da6d3`. |
| Producer | `@mkbabb/glass-ui` **7.0.0** (`node_modules/@mkbabb/glass-ui/package.json`) |
| **Pass-5 verdict** | **DEFECTIVE.** 3 BLOCKER · 9 MAJOR · 3 MINOR · 2 INFO |

**Evidence base — every number below is reproducible from these files:**

```
docs/tranches/V/megatranche/audit/components/SearchFilterBar/
  probe-P5-1.mjs … probe-P5-7.mjs        ← the harnesses (playwright, read-only)
  analyze-P5-contrast.py, -contrast2.py  ← rendered-pixel contrast
  evidence-p5/p5-1.json … p5-7.json      ← the measurements
  evidence-p5/p5-contrast.json, p5-contrast2.json
  evidence-p5/*.png                      ← the frames and crops
```

All probes drive the **live** dev server at `http://localhost:9000` with the full local stack up
(`scripts/dev/dev.sh`, `VITE_API_URL=http://localhost:3000`, API health `{"status":"ok"…}` verified
by `curl`). `demo/`, `src/`, `test/` are untouched; the tag catalogue and the palette wall are
stubbed **at the Playwright network layer only**, because the live database is empty
(`curl -s http://localhost:3000/colors/tags` → `[]`;
`curl -s 'http://localhost:3000/palettes?limit=24'` → `{"data":[],…}`).

> **Harness note.** That empty database is why every capture in `audit/visual/shots/**/browse.png`
> shows this component with two-thirds of its body absent: no wall to filter and no Tags section at
> all. A pass that measures only the shipped screenshots measures a stub. The stub is why
> `REPORT.md:121,136,151,166` records `/#/browse` as clean.

---

## 1. Verdict in one paragraph

The binding composition for Browse says search/filter is **a shallow leading tray**
(`OPTICAL-BENCH-COMPOSITIONS.md:39`). What ships is a 240 × 632.84 px floating overlay that, while
open, covers **37.9 % of the Browse pane** and lies over **six of six visible palette cards** — you
cannot see the wall you are filtering, so the select→see→adjust loop the whole route exists to serve
is broken by the chrome that serves it. Under that composition error sit three independent
proportion errors that all have the same cause: **a producer form-control rhythm and a hand-rolled
list rhythm were stacked in one 240 px menu**, giving a 56.97 px pitch beside a 32.97 px pitch
(1.728×), a 44 × 44 radio beside a 16 × 16 checkbox (7.56× area), and hover targets from 61.14 px to
182 px (2.977×). The one control that must be found for any of this to be used — the `⋮` trigger —
renders at **1.01 : 1** against the field it sits inside; the only reason it is visible at all is
that it sticks 2.30 px out of the pill, top and bottom. And the whole surface has **no row in the
binding proportion register**, which is why none of it has a terminal verb, an accountable wave, or
a π frame.

---

## 2. Visual truth — the frames

### 2.1 The shipped Safari matrix, and what it could not see

`audit/visual/REPORT.md:121,136,151,166` — `/#/browse` in all four Safari matrices: 0 page errors,
0 console errors, 0 horizontal overflow, `main` = 1, **4 small tap targets**, `h1` = 0. Those rows
describe the **closed** trigger over an **errored** wall
(`shots/safari-desktop-light/browse.png`: "The commons is unreachable. / Failed to load palettes /
Retry"). The filter trigger sits directly above that error, fully enabled, offering to sort and tier
and colour-search a wall that does not exist. No state in this component reads `browseError`
(`SearchFilterBar.vue:147-152` — the prop list has four entries and none of them is request state).

### 2.2 The trigger against its own field — the measured number

`evidence-p5/p5-3-light-crop-trigger.png` · `p5-3-dark-crop-trigger.png` ·
`analyze-P5-contrast2.py` output, sampled from the closed frames at the measured rects:

| scheme | trigger fill (composited) | host field fill | **contrast** |
|---|---|---|---|
| light | `rgb(233,226,217)` | `rgb(233,225,217)` | **1.01 : 1** |
| dark | `rgb(77,66,59)` | `rgb(66,55,47)` | **1.19 : 1** |

WCAG 1.4.11 requires **3 : 1** for the visual boundary of a user-interface component against
adjacent colour. The trigger's declared fill is `oklab(0.915626 0.00551148 0.0130686 / 0.52)`
(`p5-1.json → trigger.cs`) — a 52 %-alpha glass wash **over the same glass wash**. Composited, it
is the field. The only separations that survive are the producer's 0.5 px specular ring and the
2.30 px of geometry it sticks out of the pill, top and bottom (`p5-1.json → triggerProudOfField:
{top: 2.3, bottom: 2.3}`).

It is also not a circle and not a square: rendered **32.48 × 40.60**, aspect **0.800**,
`border-radius: 9999px` — an ellipse. The cause is measured in §4 P5-M3.

### 2.3 The open menu over a populated wall — the frame no prior pass had

`evidence-p5/p5-3-light-wall-open.png` (desktop) · `p5-3-mobile-wall-open.png` (390 × 844, DPR 3) ·
`p5-3-dark-wall-open.png` · `p5-3-forced-wall-open.png`

Read the desktop frame and count what it does to the page:

- The menu lands **on top of the wall**, left of its own trigger, spanning y = 251…883.84 in a
  900 px viewport. Behind its 80.8 %-alpha ground (`background-color: oklab(0.936403 0.00557132
  0.0133027 / 0.808)`, `backdrop-filter: blur(11px) saturate(1.6)`) the card titles *Palette 0 …
  Palette 4* are still legible at the left edge — the veil is not opaque enough to establish
  figure/ground, and not transparent enough to let you read the wall.
- The tag list ends **mid-glyph**: `high-contrast-` is sliced horizontally by the 112 px scroller
  with no fade, no ellipsis, and no visible scrollbar (`scrollbar-width: thin`,
  `scrollbar-color: … rgba(0,0,0,0)` — the track is transparent). The sliced word is the only
  affordance that more tags exist. Crop: `evidence-p5/p5-6-tag-scroller.png`.
- The tag checkboxes are **circles**, the same shape as the Sort/Tier radios above them
  (`p5-4.json → marks.radioVsCheckboxRadius: ["50%","9999px"]`). Single-select and multi-select
  wear one mark.
- The colour field shows `#hex, …` — its own placeholder, truncated by the Search pill sitting on
  top of it.

The **forced-colors** frame (`p5-3-forced-wall-open.png`) is the cleanest indictment of the colour
sub-instrument: the swatch is a **white circle**. Measured: `background-color: rgb(255,255,255)`,
`box-shadow: none`, `border: 2px solid rgb(0,0,0)` (`p5-2.json → forcedColors.open.swatch.cs`). The
inline `:style="{ backgroundColor: pickerHex }"` (`:77`) is the only carrier of "which colour you
are searching for", and forced-colors deletes it. Nothing else on the surface names the colour.

The **mobile** frame is the composition failure at its worst: a 240 px menu floating in a 390 px
viewport (61.5 % of the width), running 19.99 px past the bottom of the screen, with slivers of
palette card visible either side. It is neither a sheet nor a tray.

---

## 3. The headline: the decided composition is a tray, and this is not a tray

`OPTICAL-BENCH-COMPOSITIONS.md:39` — the **binding** topology decision for Browse, verbatim:

> **Browse** | Public specimen field at 64%…66.6666667%; **search/filter is a shallow leading
> tray.** … | **search/filter; result field; selected inspector when present.** |

"Shallow" and "leading" are both shape words, and "tray" is a named species elsewhere in the same
canon (`VISUAL-CONSTITUTION.md:28` — "a narrow invitation tray (≤15% of the stage)";
`:186` — "A secondary empty shelf collapses to a tray or absence"). A tray is in flow, above the
field it governs, and shallow enough that the field remains visible. The mobile sequence
`search/filter; result field; …` is an ordered document sequence, which an overlay cannot be.

What shipped is the opposite species. Measured with a 12-palette wall stubbed in
(`probe-P5-3.mjs`, `evidence-p5/p5-3.json`):

| arm | popover | % of Browse pane covered | % of wall union covered | visible cards touched | visible cards > 50 % covered |
|---|---|---|---|---|---|
| desktop 1440 × 900 | 240 × 632.84 | **37.9 %** | 24.5 % | **6 of 6** | 5 |
| dark 1440 × 900 | 240 × 632.84 | 37.9 % | 24.5 % | 6 of 6 | 5 |
| forced-colors 1440 × 900 | 240 × 632.84 | 37.9 % | 24.5 % | 6 of 6 | 5 |
| mobile 390 × 844 DPR 3 | 240 × 620.66 | **54.3 %** | 27.8 % | **5 of 5** | 5 |

This is not an aesthetic complaint. Browse is a **discovery** route: the product loop is
*narrow the field → see what remains → narrow again*. Filtering is a continuous, iterative act, and
this chrome makes the result invisible for the entire duration of the act. On mobile more than half
the pane is gone. The tray shape was chosen precisely because a tray leaves the field legible while
you tune it.

The rest of this report is, in large part, downstream of this one decision: an overlay must be
self-contained, so it grew four sections, three dividers, its own scroller, its own colour
instrument and a count badge — a menu that has to be a whole panel because it cannot be a tray.

---

## 4. Findings

Severity ladder: **BLOCKER** = the surface asserts something the product does not hold, or a
sanctioned state is unreachable · **MAJOR** = a binding law is violated with rendered evidence ·
**MINOR** = a real defect that does not break a law outright · **INFO** = recorded so the next pass
does not re-spend the budget.

Provenance: **NEW** = no prior pass contains it · **NEW-EXT** = a prior finding extended by a
mechanism or an arm it did not have · **CORROBORATED** = independently reproduced, credit to the
prior pass.

---

### P5-B1 · BLOCKER · **NEW** · The decided composition is a shallow leading tray; a 240 × 633 overlay shipped, and it hides the wall it filters

**Evidence** · `OPTICAL-BENCH-COMPOSITIONS.md:39` (quoted §3) ·
`SearchFilterBar.vue:3,16` (`<Popover>` / `<PopoverContent align="end" class="w-60 p-0">`) ·
`evidence-p5/p5-3.json → light.occ`, `mobile.occ` · frames `p5-3-light-wall-open.png`,
`p5-3-mobile-wall-open.png`.

**Reproduction** · `node docs/tranches/V/megatranche/audit/components/SearchFilterBar/probe-P5-3.mjs`
→ `light | cards 12 inVP 6 | pop 240x632.84 | %wallUnion 24.5 | %browsePane 37.9 | cardsCovered 6 over50 5`.

**Mechanism** · the chrome was authored as a *menu* (`Popover` + `PopoverContent`) when the decided
species is an *in-flow tray*. Every subsequent defect in this report is a consequence: an overlay
must carry its own ground, its own boundaries, its own scroller and its own escape hatch, so it
accreted four sections, three dividers, a 112 px nested scroller and a count badge that a tray would
not need.

**Cure** · not "make the popover shorter". Transpose the species: a shallow in-flow tray beneath the
`SearchBar` inside `BrowsePane`'s existing `flex flex-col gap-3` column
(`BrowsePane.vue:4`) — sort and tier as one row of segmented/pill controls, tags as a horizontal
chip rail, colour as a single seated swatch+field. The wall stays visible; the tray costs one row of
height; the 240 px overlay, its dividers, its scroller, its badge and its two focus vocabularies all
die with it.

---

### P5-B2 · BLOCKER · **NEW-EXT** (extends D-2 / D2-B2 / P3-B2 / P4-B3 with the zoom arm and an unreachability proof) · At 200 % zoom, 65.3 % of the menu cannot be reached

**Evidence** · `evidence-p5/p5-6.json → zoom200`, frame `p5-6-zoom200-open.png`:

```
viewport      : 720 × 450   (the CSS viewport of 1440×900 at 200 % zoom)
popover       : top 238.00, bottom 849.05, height 611.05
visibleBlockPx: 212.00      →  visibleFraction 0.347
offscreenBelow: 399.05 px
popoverScrollable : false      popoverMaxHeight : "none"
docScrollHeight   : 450        docClientHeight  : 450     docScrollable : false
colourFieldTop    : 779.70  →  colourFieldOffscreen : true
```

**Reproduction** · `node …/probe-P5-6.mjs`.

**Why this is worse than "it overflows"** · prior passes established the overflow. What is new is
that **there is no path to the hidden 65.3 %**: the popover has `max-height: none` and is not
scrollable, and the *document* is not scrollable either (`scrollHeight === clientHeight === 450`).
The entire "Find by Color" instrument begins 329.7 px below the fold. The only thing that moves it
is scrolling the **underlying pane**, which drags the anchored popover with it
(`zoom200AfterScroll: {scrollY: 0, top: -253.00, bottom: 358.05}`) — i.e. to reach the bottom of the
filter menu you must scroll the wall you are filtering, and you then lose the top 253 px of the
menu. There is no viewport at 200 % zoom in which the whole menu is legible.

WCAG 1.4.4 (Resize text) and 1.4.10 (Reflow) both fail. `PROPORTION-AUDIT.md:16` names actual
400 %-zoom in-app browser observation as a binding arm for this tranche; this surface does not
survive 200 %.

---

### P5-B3 · BLOCKER · **NEW** · The one control that opens all of this has a 1.01 : 1 boundary against its own container

**Evidence** · §2.2 table; `analyze-P5-contrast2.py` → `evidence-p5/p5-contrast2.json → figureGround`;
crops `p5-3-light-crop-trigger.png`, `p5-3-dark-crop-trigger.png`; declared fill
`p5-1.json → chromium-desktop-light.open.trigger.cs.background-color =
oklab(0.915626 0.00551148 0.0130686 / 0.52)`.

**Reproduction** · `node …/probe-P5-3.mjs && python3 …/analyze-P5-contrast2.py`.

**Mechanism** · the trigger consumes `glass-wash glass-capsule` (`p5-4.json → marks.triggerBox.classes`)
— a translucent glass fill designed to sit on a *scene*. It is placed inside the glass search pill,
so the wash composites over its own value. The producer's 0.5 px specular ring is all that is left,
and it reads as a stray ellipse half in and half out of the pill because of the 2.30 px overhang.

**Why BLOCKER** · this is the sole affordance for sort, tier, tag and colour search on the route
whose entire job is discovery. `PROPORTION-AUDIT.md:60` (PR-16) already rules on this species for
the Dock: "`…` keeps a named menu purpose plus expanded state **or is removed**". Here the name and
the expanded state are present (§6.4) — what is missing is that anyone can see it. Four "small tap
targets" are what the Safari audit counted on this route (`REPORT.md:35,50,65,80`); this is one of
them, and its visibility problem is independent of its size.

**Cure** · a tray (P5-B1) deletes the trigger. If a trigger survives at all, it must leave the glass
family — an opaque or ink-outlined seat inside a glass host — and take the producer's `size` prop
rather than a per-instance `h-8 w-8` (P5-M3).

---

### P5-M1 · MAJOR · **NEW** · The component has no row in the binding proportion register

**Evidence** · `docs/tranches/V/research/proportion-register.md` — all 35 rows enumerated
(`grep -n "^| PR-" …` → PR-01…PR-35). The exhaustive-site lists that could own this surface name
these sites and not this one:

| row | its exhaustive site list | contains Browse search/filter chrome? |
|---|---|---|
| PR-07 (`:62`) | "Dock seal/edit, selector, eyedropper, Spectrum, channels, palette, Generate, Mix and Gradient hover-only/unlabeled actions" | **no** |
| PR-12 (`:47`) | "Dock/toolbar glyphs, swatch actions, tab faces, drag handles and compact row actions" | **no** |
| PR-31 (`:74`) | "`ALL18` corner glyphs, decorative controls, repeated dashes/dots, caster details and unexplained micro-marks" | generic only, no site |
| PR-16 (`:35`) | Browse/Library two-pane matrix — region ratios only | **no** |
| PR-27 (`:70`) | Browse/Library empty/loading/error states | wall states only, not the filter chrome |

**The law it breaks** · `PROPORTION-AUDIT.md:25`: "One row exists for every route-level region and
every repeated card/header/title/readout/space/padding/**divider/icon/button/ornament/status**/drag/focus
species." This component contributes at least six unregistered species: an unlabeled `⋮`
icon-button, a 240 px overlay region, three `divide-y` dividers, four section labels, two distinct
option-row species, a count-badge status mark and a colour swatch ornament.
`PROPORTION-AUDIT.md:83`: "W18 cannot complete while any register row lacks a terminal verb/owner."

**Reproduction** · `grep -rni "searchfilter\|filter bar\|filter menu\|EllipsisVertical" docs/tranches/V/research/ docs/tranches/V/OPTICAL-BENCH-COMPOSITIONS.md docs/tranches/V/PALETTE-CONTRACT.md` → **no hits**.

**Why this is the root cause and not a paperwork complaint** · an unregistered surface has no
terminal verb, no accountable wave, no π frame and no DELTA. That is precisely why this component
accumulated four dead declarations, two rhythms, three focus vocabularies and a species that
contradicts its own binding composition — nobody owned it. Pass 3's `P3-i1` observed that the
standing visual audit had never seen this component; this is the structural reason.

---

### P5-M2 · MAJOR · **NEW-EXT** (extends D2-M2 / P3-M3 / P4-B4 with the gap mechanism and the checkbox number) · Two rhythms and two control scales in one 240 px menu

**Evidence** · `p5-1.json → chromium-desktop-light.open.optionPitch, optionWidths` ·
`p5-7.json → controlVsRow`:

| quantity | producer `RadioGroup` rows | hand-rolled tag rows | fork |
|---|---|---|---|
| row height | 30.97 px | 30.97 px | 1.000× |
| **row pitch** | **56.97 px** | **32.97 px** | **1.728×** |
| **inter-row gap** | **26.00 px** | **2.00 px** (`gap-0.5`) | **13.0×** |
| **control box** | **44 × 44** (`[role=radio]`) | **16 × 16** (`[role=checkbox]`) | **7.56× area** |
| hover-target width | 61.14 … 165.41 px (shrink-to-fit) | 182 px (full) | — |

Across the whole menu the hover target varies **61.14 → 182 px = 2.977×**
(`p5-7.json → controlVsRow.widestOverNarrowest: 2.977`). Five different widths appear inside one
182 px column, because the `<label>` at `:22,:34,:38` is `display:flex` and shrinks to its content
for the radio rows while the tag rows fill.

**The mechanism, stated exactly** · glass-ui's `RadioGroup` is calibrated for a bare 44 × 44 seat in
a column with a 26 px gap — the producer has already solved the touch-target problem. This component
interposes a `<label class="filter-option">` (`:22,:34,:38,:50`) whose own height is 30.97 px, so
the 44 px producer control **overflows its own row by 6.52 px on each side**
(`p5-7.json → radioOverflowsRowBy: 6.52`) while the visible hover highlight is only 30.97 px tall.
The tag list then hand-rolls `flex flex-col gap-0.5` (`:49`) at 2 px. The result is one surface with
two unrelated vertical grammars and a hit area that does not match the painted area anywhere.

**The law** · `PROPORTION-AUDIT.md:72` (§5.7): "Visual glyph size, operable target size and layout
reservation are separate quantities. Accessibility floors do not require bloated visible chrome."
Here all three are conflated and inconsistently so — 45.7 % of the sort block is dead space
(26.00/56.97) while the tag marks are 16 px.

---

### P5-M3 · MAJOR · **NEW** (the `p-0` and PRM arms are new; the `h-8` loss extends P4-M2) · Three of the component's own declarations are dead

Measured, live:

| declaration | source | computed | verdict |
|---|---|---|---|
| `class="w-60 p-0"` on `PopoverContent` | `:16` | `padding: 20.352px 16px` | **`p-0` is dead** |
| `class="relative h-8 w-8"` on the trigger | `:5` | `height: 40px`, `min-height: 40px`, rendered `32.48 × 40.60` | **`h-8` is dead** → the ellipse |
| `.filter-option { transition: background-color var(--duration-fast) … }` | `:246` | under PRM: `transition-property: opacity, color, background-color, border-color, box-shadow`, `duration 0.1s` (token `--duration-fast` = `0.2s`) | **the scoped rule is overridden** |

**Evidence** · `p5-4.json → marks.popoverPadding`, `marks.triggerBox`, `reducedMotion` ·
`p5-2.json → desktopLight.open.motion.filterOption` (non-PRM: `background-color / 0.2s` — the scoped
rule wins) vs `reducedMotion.open.motion.filterOption` (5 properties / 0.1s — it loses).

**Mechanism for `p-0`** · the producer's own class string carries
`px-(--overlay-pad-inline) py-(--overlay-pad-block)`
(`p5-4.json → marks.popoverClassList`, full string:
`popover-content z-popover glass-floating [--overlay-pad-inline:1rem] [--overlay-pad-block:calc(var(--overlay-pad-inline)*1.272)] px-(--overlay-pad-inline) py-(--overlay-pad-block) glass-reveal w-60 p-0`).
Tailwind orders `p-*` before `px-*`/`py-*` in the generated sheet, so the producer's axis utilities
win regardless of the order in the attribute. The consumer asked for a flush menu and silently got a
16 px inset, which is why the `divide-y` rules float 16 px short of both edges instead of spanning
the surface.

**The law** · owner edict 5 (style at the root, never per-instance) and
`PROPORTION-AUDIT.md:73` (§5.8): "Real rendered relation wins over token intent. … token presence
alone cannot close a row." Three declarations here are token intent with no rendered effect. The
sibling in the same folder shows the correct move: `UserSortMenu.vue:11` uses `size="xs"` — the
producer's own API — and renders a clean **28 × 28** circle (`p5-4.json → sibling.rendered`).

---

### P5-M4 · MAJOR · **NEW** · The area budget is inverted: the only real instrument gets the least room

**Evidence** · `p5-1.json → chromium-desktop-light.open.sections`:

| section | content | height | share of the 632.84 px menu |
|---|---|---|---|
| Sort | 3 radio options | **197.48 px** | **31.2 %** |
| Tags | scrolling checkbox list | 164.58 px | 26.0 % |
| Tier | 2 radio options | 140.52 px | 22.2 % |
| **Find by Color** | swatch + nested picker + text field + submit + async state | **87.58 px** | **13.8 %** |

Sort — three mutually exclusive words — takes **2.25×** the room of the only sub-instrument on the
surface: a compound control with a nested colour picker, a free-text CSS parser, a submit action and
a pending state. And Sort's 197.48 px is not information, it is the 26 px producer gap repeated
three times (P5-M2).

**The law** · `PROPORTION-AUDIT.md:5` (§1 Ruling): "Every element earns its scale, interval, boundary
and material from its job relative to the local protagonist." Nothing here earned its scale; the
scale is an artifact of which list happened to use the producer component.

---

### P5-M5 · MAJOR · **NEW** · The tag list is an unhandled data surface — three failure modes, all live

Tag names are user- and admin-authored data (`demo/palettes/api/admin-colors.ts:61-79` — Admin Tags
CRUD). Measured against real name shapes:

| state | measurement | frame |
|---|---|---|
| 10 tags | scroller `clientHeight 112` / `scrollHeight 357` → **31.4 % visible**, 245 px hidden, `scrollbar-color` track transparent → **no visible scrollbar** | `p5-1.json → tagScroller` |
| a hyphenated long name (`high-contrast-accessible-ui`) | row height **53.94 px** vs 30.97 px = **1.742×**; the mark re-centres on the two-line block, so the mark rail has three vertical positions | `p5-6.json → longTag.rows`, crop `p5-6-tag-scroller.png` |
| an unbroken 34-char name (`supercalifragilisticexpialidocious`) | `scrollWidth 276` vs `clientWidth 182` → **94 px of horizontal overflow (51.6 % of the column)**; `overflow-x` computes to **`auto`** as a side effect of the authored `overflow-y: auto`; label CSS is `white-space: normal`, `overflow-wrap: normal`, `text-overflow: clip`, **no `truncate`** | `p5-7.json → scroller`, crop `p5-7-longtag-scroller.png` |

The third frame is the clearest: the tag is **sliced mid-glyph** at the column edge with no ellipsis
and no fade, and a horizontal scrollbar nobody authored now lives inside a vertical scrollbar inside
a popover, in a 240 px menu.

**The design defect** · `:50-57` renders `<span>{{ tag.name }}</span>` with no length contract at all.
There is no truncation rule, no title tooltip, no max-length, no wrap policy, and no chip form. Three
distinct overflow behaviours therefore emerge from three name shapes, none of them designed.

---

### P5-M6 · MAJOR · **NEW** · The menu has no designed height; it is a function of the tag catalogue, and the 0-tag state is a hole

**Evidence** · `p5-4.json → growth`, one browser per row (`probe-P5-4.mjs → menuHeightFor`):

| tags served | menu height | bottom edge (900 px viewport) |
|---|---|---|
| 0 | **468.27 px** | 719.27 |
| 3 | 617.75 px | 868.75 |
| 10 | **632.84 px** | 883.84 |
| 40 | 632.84 px | 883.84 (capped by `max-h-28`) |

**+164.57 px = +35.1 %** of height on data alone. At 0 tags the whole section disappears
(`v-if="availableTags.length > 0"`, `:47`) — so the menu **silently changes shape** depending on
whether the commons has been tagged, and a reader who saw it once cannot rely on where "Find by
Color" will be. There is no empty state, and — because `BrowsePane.vue:215-221` coerces any
non-array payload to `Object.values(...)` — **a failed tag fetch and an empty catalogue render
identically, as nothing**. `PROPORTION-AUDIT.md:52` (PR-08) rules the general case:
"Pending/failure/export/recovery truth only transient → **ADD-AFFORDANCE**".

---

### P5-M7 · MAJOR · **NEW-EXT** (extends D-6 / D2-M3 / P3-M14 with the forced-colors arm) · The two selection species paint no focus register — in any of the three colour arms

**Evidence** · `p5-3.json → {light,dark,forced}.focusReg`, one real `.focus()` per species:

| species | light | dark | forced-colors |
|---|---|---|---|
| `[role=radio]` | `outline: … **none** 3px` · `box-shadow: none` · ring `0 0 #0000` | identical | `outline: rgb(0,0,0) **none** 3px` · `box-shadow: none` |
| `[role=checkbox]` | `outline: none` · box-shadow = the **resting** glass wash | identical | `outline: none` · `box-shadow: none` |
| swatch | `outline: none` · box-shadow = the resting cartoon cast | identical | `outline: none` · `box-shadow: none` |
| colour `<input>` | UA/producer ring | UA/producer ring | `outline: rgba(5,0,73,0.8) **solid** 2px`, offset 2px |

`outline-style: none` is the measured value in every cell except the last row. **One of the menu's
five focusable species has a focus register in forced colors, and none of the two selection species
has one anywhere.**

**The law** · `VISUAL-CONSTITUTION.md:84`: "Focus remains visibly distinct from selection in both
schemes, forced colors and reduced transparency." `:83`: "Selected, failed, pending, withdrawn and
disabled states are never color-only." Also `proportion-register.md:73` (PR-30), which owns this
family across `ALL18` — and which, per P5-M1, does not list this site.

Compounding it: in forced-colors the checked radio and the unchecked tag checkbox are the same
open circle (`p5-3-forced-wall-open.png`), so selection *and* focus are simultaneously
unrepresented on the two lists that carry the surface's meaning.

---

### P5-M8 · MAJOR · **NEW-EXT** (extends D-4 / D2-M6 / P3-M7 with measured geometry) · One folder, two dialects of the same control

`demo/palettes/browser/search/` contains two components that do the same job — a sort/filter menu
behind an `EllipsisVertical` trigger. They agree on nothing:

| | `SearchFilterBar.vue` (249 lines) | `UserSortMenu.vue` (58 lines) |
|---|---|---|
| overlay primitive | `Popover` + `PopoverContent` (`:3,16`) | `DropdownMenu` + `DropdownMenuContent` (`:2,16`) |
| section heading | hand-rolled `<div class="section-label">` (`:20,32,48,63`) | producer `DropdownMenuLabel` (`:17`) |
| option row | hand-rolled `<label class="filter-option">` wrapping `RadioGroupItem` (`:22-26`) | producer `DropdownMenuRadioItem` (`:22-25`) |
| trigger size | per-instance `class="relative h-8 w-8"` (`:5`) | producer prop `size="xs"` (`:12`) |
| **rendered trigger** | **32.48 × 40.60**, aspect 0.800 — an ellipse | **28.00 × 28.00** — a circle |
| menu width | `w-60` = 240 px | `w-48` = 192 px |
| option family | `var(--font-serif)` in scoped CSS (`:243`) | `font-display` utility on the content (`:16`) |
| icon a11y | no `aria-hidden` (`:24,40`) | `aria-hidden="true"` (`:13`) |

**Evidence** · `p5-4.json → marks.triggerBox` and `→ sibling` (both measured live, the sibling on
`/#/admin/users`).

`UserSortMenu.vue:4-5` even carries the commit note that made it correct: *"S.W5-4: the triplicated
hand-rolled icon-trigger recipe dies onto the sanctioned glass-ui atom (+ the missing name)."* The
migration reached the file next door and stopped. Owner edict 4 (glass-ui is the design system;
reuse existing component-type names) and edict 5 (style at the root) both point at the same
one-line cure: `DropdownMenu` with `DropdownMenuLabel` / `DropdownMenuRadioGroup` /
`DropdownMenuRadioItem`, and `size="xs"` instead of `h-8 w-8`. That deletes the `.section-label` and
`.filter-option` rules, the double rhythm (P5-M2), the missing focus register (P5-M7) and the dead
`h-8` (P5-M3) in one move.

---

### P5-M9 · MAJOR · **NEW** · `WORKSPACE-2` does not present one search/filter family

`VISUAL-CONSTITUTION.md:186`, in the section that binds Browse **and** Library: "**Search/filter
chrome is one family.**"

| pane | search chrome | filter chrome |
|---|---|---|
| Browse (`BrowsePane.vue:10-27`) | glass-ui `SearchBar class="search-seated"` | `SearchFilterBar` in the default slot — 5 jobs (sort, tier, tags, colour search, clear) behind an unlabeled `⋮` |
| Library (`PalettesPane.vue:29-33`) | glass-ui `SearchBar class="search-seated"` — identical props, identical placeholder grammar | **nothing** |

The two members of `WORKSPACE-2` present the same field with, and without, a five-job menu attached.
A reader who learns the affordance on one pane does not find it on the other; a reader who never
opens Browse never learns it exists. Whatever the right answer is — a shared tray on both, or no
filter chrome on either — "one family" is not two.

This is visible in the shipped Safari capture without any probe:
`shots/safari-desktop-light/browse.png` — the left pill carries the `⋮`, the right pill does not.

---

### P5-m1 · MINOR · **CORROBORATED** (D-15 / D2-M5 / P3-m2), now with rendered values · The section headings speak the mono value voice; the type token's name lies

**Evidence** · `p5-1.json → chromium-desktop-light.open.labels[*].cs`, identical for all four labels:

```
font-family    : "Fira Code", "Fira Code Fallback", "Fira Mono", monospace
font-size      : 14.384px      letter-spacing : 1.4384px (0.1em)
text-transform : uppercase     color          : oklab(0.457941 0.0144455 0.0327382)
```

versus the option rows (`p5-2.json → desktopLight.open.optionCS`):

```
font-family : "Plus Jakarta Sans", … , sans-serif      font-size : 16.4px
```

`VISUAL-CONSTITUTION.md:68-78` — the closed matrix: **section heading → `text-heading` → Plus Jakarta
Sans**; Fira Code owns "value, code, or provenance" only. Four section headings are in the mono
value voice. Separately, `.filter-option` declares `font-family: var(--font-serif)` (`:243`) and
renders Plus Jakarta Sans — `demo/styles/foundation.css:95-101` records why: "`--font-serif` →
`--font-stack-text` → Jakarta, the body voice". The declaration is a no-op with a misleading name.

Rendered contrast is not the problem here — the labels measure **5.90 : 1** (light) and **5.28 : 1**
(dark) against the menu ground (`p5-contrast.json`). The problem is jurisdiction.

---

### P5-m2 · MINOR · **NEW** · The 240 px menu is the one quantity that does not scale

`w-60` (`:16`) is a hard literal. Across the viewport range it serves:

| viewport | menu width | share of viewport | option font-size |
|---|---|---|---|
| 1440 | 240 px | 16.7 % | 16.4 px |
| 720 (200 % zoom) | 240 px | 33.3 % | 14.6 px |
| 390 (mobile) | 240 px | **61.5 %** | 14.0 px |

**Evidence** · `p5-2.json → {desktopLight,zoom200,mobile}.open.{popover.rect, optionCS}`.

The type inside the box is fluid (−14.6 % from desktop to mobile); the box is not. The result is a
menu that is a discreet dropdown at 1440 and two-thirds of the screen at 390.
`VISUAL-CONSTITUTION.md:33` (§3.7): "Spacing is container-scaled from glass-ui tokens. No
desktop-tight/mobile-airy fork and no breakpoint pile." A literal `w-60` is neither container-scaled
nor a token. Related magic literals in the same file: `max-h-28` (`:49`), `h-7 w-7` (`:76`),
`pr-16` (`:94`), `h-6 px-2` (`:99`).

---

### P5-m3 · MINOR · **NEW** · Three sections, two keyboard models

**Evidence** · `p5-2.json → desktopLight.tabs` (Chromium, 16 successive `Tab` presses from the
trigger):

```
IN BUTTON[radio] · IN BUTTON[radio] · IN BUTTON[checkbox] × 7 …
```

Sort and Tier are producer `RadioGroup`s and use roving tabindex — **one tab stop each**
(`p5-1.json → focusables`: the group carries `tabindex 0`, the selected item `0`, the rest `-1`).
The tag list is hand-rolled, so every checkbox is its own stop: **10 stops for 10 tags, 40 for 40.**
The keyboard cost of the third section scales with the data while the first two are constant, and
a stop can land on a control inside the 112 px window that is scrolled out of view (P5-M5) inside a
popover that has no scroller of its own (P5-B2).

---

### P5-i1 · INFO · **CORROBORATED** (P3-M13) · In forced colors the swatch loses the only thing it says

`p5-2.json → forcedColors.open.swatch.cs`: `background-color: rgb(255,255,255)`, `box-shadow: none`,
`border: 2px solid rgb(0,0,0)`, `forced-color-adjust: auto`. Frame:
`p5-3-forced-wall-open.png`. The inline `:style="{ backgroundColor: pickerHex }"` (`:77`) is the sole
carrier of the searched colour and forced-colors deletes it; `aria-label` (`:78`) still says it, so
the information exists for AT and not for sighted forced-colors users. Recorded, not re-litigated.

### P5-i2 · INFO · **CORROBORATED and bounded** (P3-M9) · Only the click-outside close path drops focus

`p5-6.json`:

```
focusAfterEscape        : BUTTON:Filters      ✓
focusAfterTriggerToggle : BUTTON:Filters      ✓
focusAfterOutsideClick  : BODY:…              ✗
```

`VISUAL-CONSTITUTION.md:115` requires "exact connected opener on close". Two of three paths comply.
The prior MAJOR stands, narrowed to one path.

---

## 5. State matrix — every state this component can be in

| state | reachable? | designed? | measured verdict |
|---|---|---|---|
| **closed, 0 filters** | yes | partly | trigger at **1.01 : 1** vs its host field (P5-B3) |
| **closed, n filters** | yes | no | badge 16 × 16 at 11 px, 4 px outside the 32 px trigger on every side sampled; renders as a clipped crescent (`p5-3-light-badge-zoom.png`) — CORROBORATED P4-B2/D2-B3 |
| **open, empty catalogue (0 tags)** | yes | **no** | Tags section absent; menu 468.27 px; failed fetch and empty catalogue are indistinguishable (P5-M6) |
| **open, populated** | yes | partly | 240 × 632.84; covers 37.9 % of the pane / 6 of 6 cards (P5-B1) |
| **open, 40 tags** | yes | **no** | 31.4 % of the list visible, no visible scrollbar, sliced mid-glyph (P5-M5) |
| **open, long tag name** | yes | **no** | wraps to 53.94 px (1.742×) or overflows 94 px horizontally (P5-M5) |
| **loading (wall in flight)** | yes | **no** | the menu does not consult request state; every control is live over a `browseError` wall (§2.1) |
| **error (wall failed)** | yes | **no** | same — the shipped Safari frame *is* this state |
| **colour search pending** | **no** | yes | `searching` flips true→false inside one synchronous `try/finally` (`:213-225`); the spinner and every `disabled:` style at `:99` are unreachable — CORROBORATED D-12/P4-M1 |
| **disabled** | n/a | no | no control on the surface has a disabled state except the unreachable one above |
| **focused — radio** | yes | **no** | `outline-style: none`, `box-shadow: none`, all three colour arms (P5-M7) |
| **focused — checkbox** | yes | **no** | resting glass wash only; nothing in forced colors (P5-M7) |
| **focused — swatch / Search pill** | yes | partly | cartoon cast in light/dark; **nothing** in forced colors (P5-M7) |
| **hovered — sort row** | yes | partly | `color-mix(in srgb, var(--accent) 50%, transparent)` over a 61.14…165.41 px shrink-to-fit box (P5-M2) |
| **hovered — tag row** | yes | partly | same paint over a 182 px box — 2.977× the narrowest peer |
| **active / pressed** | yes | producer | `tap-squish` on the trigger only; the option rows have no pressed state |
| **selected — radio** | yes | yes | producer dot |
| **selected — checkbox** | **no** | — | `@update:checked` is not a glass-ui 7 event; the mark never changes — CORROBORATED D-1/D2-B1/P3-B1/P4-B1 |
| **dragging** | n/a | — | no drag surface |
| **overflowing (menu)** | yes | **no** | `max-height: none`, `overflow: visible`, 399.05 px off-screen at 200 % zoom with no scroll path (P5-B2) |
| **truncated** | yes | **no** | placeholder `#hex, …` truncated by its own submit pill; tag labels sliced mid-glyph (P5-M5) |
| **RTL** | yes | **no** | menu mirrors; the count chip flips into the field interior — CORROBORATED P4-M8 (`p5-2.json → rtl`) |
| **reduced motion** | yes | **producer-handled** | popover `0.35s` spring → `0.15s` opacity; `.animate-spin` → `1e-05s`, 1 iteration (§6.2) |
| **forced colors** | yes | **no** | swatch → white circle; 4 of 5 focus registers vanish (P5-M7, P5-i1) |
| **200 % zoom** | yes | **no** | 34.7 % of the menu reachable (P5-B2) |
| **mobile 390** | yes | **no** | menu = 61.5 % of viewport width, 54.3 % of the pane, 19.99 px past the fold |

**19 of 26 states are unhandled, unstyled, unreachable, or visually broken.**

---

## 6. Negative proofs — what I attacked and could not break

Recorded so pass 6 does not re-spend the budget.

### 6.1 The dock collapse is **not** this component's defect — control experiment

I observed that after opening this menu the top dock renders as an empty pill and never recovers
(`p5-4.json → dockOpen.dock.text: ""`, `dockAfterClose.dock.text: ""`, frames
`p5-4-dock-closed.png` → `p5-4-dock-after-close.png`). I was about to file it as a BLOCKER. The
control arms (`probe-P5-5.mjs`) disprove it:

| arm | interaction | dock text after settle |
|---|---|---|
| a | **none** | `→\|Browse\|Tools\|Login\|@mbabb` — **unchanged** |
| b | click blank pane area | `""` |
| c | click the search input | `""` |
| d | click the Filters trigger | `""` |
| e | Filters open then Escape | `""` |
| f | a palette-card menu | `""` |

**Any** pointer interaction anywhere on the route collapses the dock. This belongs to
`shell-dock-dock`, not here. Filed as a cross-reference only.

### 6.2 Reduced motion is honoured, by the producer and by the global guard

`p5-4.json → reducedMotion`: `prm: true`; popover transition `0.35s` spring → **`0.15s` opacity**;
a synthetic `.animate-spin` probe injected into the live popover computes
`animation-duration: 1e-05s`, `iteration-count: 1`. No motion in this component animates a
layout-forcing property: the only authored transition is `background-color` (`:246`), and the
producer's popover animates `scale`/`translate`/`opacity`/`filter` on the compositor. The scoped
transition **loses** to a broader rule under PRM (P5-M3), but the outcome is still correct.

### 6.3 The swatch's boundary does earn its 3 : 1

`analyze-P5-contrast2.py`: swatch border `rgb(130,117,106)` vs the menu ground `rgb(241,230,222)` =
**3.64 : 1**; the `#4488cc` fill vs the same ground = 3.03 : 1. The `border-2 border-border` at
`:76` is doing real work and must not be removed when the swatch is rebuilt. (Its *information*
still dies in forced colors — P5-i1 — but its *boundary* is sound.)

### 6.4 The trigger's ARIA is correct

`p5-1.json → trigger`: `aria-label="Filters"`, `aria-haspopup="dialog"`, `aria-expanded="true"` when
open. `PROPORTION-AUDIT.md:60` (PR-16) demands "a named menu purpose plus expanded state" of this
species; both are present. (The name under-describes — the menu also sorts, which is not a filter —
but the mechanism is right.)

### 6.5 The script block satisfies the standing edicts

- `import type { Tag } from "../../types";` (`:144`) — `verbatimModuleSyntax` clean; every other
  import is a value import.
- `const { sort, tier, selectedTags, availableTags } = defineProps<{…}>()` (`:147-152`) — the Vue 3.5
  reactive-props-destructure idiom, correctly used.
- No `useTemplateRef` is needed: the component holds no template ref.
- `colorText` / `pickerHex` are plain `ref`s driven by `v-model` on a producer `Input`, not by a
  `defineModel` round-trip, so the `shallowRef` cache pattern does not apply.
- No new `shared/` directory, no wrapper component, no legacy alias, no migration shim, no
  back-compat branch inside this file. Edicts 1, 2, 3, 7, 8 are **satisfied**.
- The `demo/ui/*` barrels are one-line re-exports (`demo/ui/button/index.ts`:
  `export { Button } from "@mkbabb/glass-ui";`) — a repo-wide family row (D-18), not this
  component's defect.

### 6.6 Clean runtime, every arm

Zero console errors and zero page errors across all eight probe matrices
(`p5-1.json`, `p5-2.json` → `errs: []` in every arm), and no document-level horizontal overflow in
any arm including the 94 px-overflow tag case (`p5-7.json → docOverflowX: false`). The defects in
this report are all design defects; none of them throws.

---

## 7. The cure, in the order it should be taken

1. **Register the surface.** Add its species to `docs/tranches/V/research/proportion-register.md`
   under their mechanism families (icon-button, overlay region, divider, status badge, option-row) so
   each gets a terminal verb and an accountable wave. Nothing below is safe to execute while the
   surface is unowned (P5-M1).
2. **Transpose the species, do not patch the popover.** A shallow in-flow tray beneath the
   `SearchBar` in `BrowsePane.vue`'s existing column, per `OPTICAL-BENCH-COMPOSITIONS.md:39`. This
   single move kills P5-B1, P5-B2, P5-B3, P5-M4, P5-M6, P5-m2 and the three dividers that
   `OPTICAL-BENCH-COMPOSITIONS.md:73` says Browse retains **none** of.
3. **If any menu survives the tray, consume the sibling's idiom.** `DropdownMenu` +
   `DropdownMenuLabel` + `DropdownMenuRadioGroup` + `DropdownMenuRadioItem`, `size="xs"` — exactly
   `UserSortMenu.vue`. Kills P5-M2, P5-M3, P5-M7, P5-M8 and the `.section-label` / `.filter-option`
   scoped block entirely.
4. **Give tags a contract**: chips or a producer list with a declared truncation rule, a real
   scrollbar or a fade, and one empty/failed state (P5-M5, P5-M6).
5. **Make the two `WORKSPACE-2` panes agree** (P5-M9), and take the pending state either to a real
   async boundary or delete the spinner and the `disabled:` classes that can never paint.

Steps 2 and 3 subtract roughly 130 of the 249 lines. This component is not under-built; it is
built as the wrong shape, and every proportion defect in it is a consequence of that shape.

---

## 8. Evidence index

| artifact | what it proves |
|---|---|
| `probe-P5-1.mjs` → `evidence-p5/p5-1.json` | geometry, computed styles, focusables, pitch/width forks, tag-scroller ratio; 4 engine/scheme arms |
| `probe-P5-2.mjs` → `p5-2.json` | 8 arms (light/dark/zoom200/mobile/forced-colors/reduced-motion/RTL/WebKit): motion, tab order, option CS, badge |
| `probe-P5-3.mjs` → `p5-3.json` + `p5-3-*.png` | **occlusion over a populated wall**, per-element crops, focus registers per species, badge geometry |
| `probe-P5-4.mjs` → `p5-4.json` | dock arms, mark geometry, `p-0`/`h-8` override losses, menu growth vs tag count, PRM, sibling trigger |
| `probe-P5-5.mjs` → `p5-5.json` | the dock control experiment (§6.1) |
| `probe-P5-6.mjs` → `p5-6.json` | close-path focus, 200 % zoom reachable fraction, wrapping tag |
| `probe-P5-7.mjs` → `p5-7.json` | unbroken-tag horizontal overflow, control-vs-row geometry |
| `analyze-P5-contrast.py`, `analyze-P5-contrast2.py` → `p5-contrast*.json` | rendered contrast from composited pixels, incl. the 1.01 : 1 trigger figure/ground |
| `evidence-p5/p5-3-light-wall-open.png` | the desktop menu over the wall it hides |
| `evidence-p5/p5-3-mobile-wall-open.png` | 61.5 % of the viewport, 54.3 % of the pane |
| `evidence-p5/p5-3-forced-wall-open.png` | the swatch as a white circle; two semantics, one mark |
| `evidence-p5/p5-6-tag-scroller.png`, `p5-7-longtag-scroller.png` | tags sliced mid-glyph; two overflow behaviours |
| `evidence-p5/p5-6-zoom200-open.png` | 34.7 % of the menu at 200 % zoom |
| `evidence-p5/p5-4-dock-closed.png` → `p5-4-dock-after-close.png` | the dock collapse — and §6.1 shows it is not ours |

---

## 9. Ledger

| ID | sev | provenance | one line |
|---|---|---|---|
| P5-B1 | BLOCKER | NEW | decided composition is a shallow leading tray; a 240 × 633 overlay ships and hides 37.9 % of the pane / 6 of 6 cards |
| P5-B2 | BLOCKER | NEW-EXT | 200 % zoom: 34.7 % reachable, 399.05 px off-screen, no scroll path exists |
| P5-B3 | BLOCKER | NEW | the trigger is 1.01 : 1 (light) / 1.19 : 1 (dark) against its own host field |
| P5-M1 | MAJOR | NEW | zero rows in the binding proportion register — no terminal verb, no owner, no π |
| P5-M2 | MAJOR | NEW-EXT | 1.728× pitch fork, 13× gap fork, 7.56× control-area fork, 2.977× hover-width fork, one menu |
| P5-M3 | MAJOR | NEW | `p-0`, `h-8` and (under PRM) the scoped transition are all dead declarations |
| P5-M4 | MAJOR | NEW | Sort 31.2 % of the menu, Find by Color 13.8 % — the only instrument gets the least |
| P5-M5 | MAJOR | NEW | tag list: 31.4 % visible, mid-glyph slicing, 94 px unauthored horizontal overflow |
| P5-M6 | MAJOR | NEW | menu height +35.1 % on data; 0-tag and failed-fetch states are indistinguishable holes |
| P5-M7 | MAJOR | NEW-EXT | radio and checkbox paint no focus register in light, dark **or** forced colors |
| P5-M8 | MAJOR | NEW-EXT | the sanctioned idiom is 58 lines away in the same folder; 28 × 28 circle vs 32.48 × 40.60 ellipse |
| P5-M9 | MAJOR | NEW | "Search/filter chrome is one family" — Browse has a 5-job menu, Library has none |
| P5-m1 | MINOR | CORROBORATED | four section headings in the Fira Code value voice; `--font-serif` resolves to Jakarta |
| P5-m2 | MINOR | NEW | `w-60` literal: 16.7 % of 1440, 61.5 % of 390, while the type inside it scales |
| P5-m3 | MINOR | NEW | roving tabindex for 2 sections, one stop per item for the third |
| P5-i1 | INFO | CORROBORATED | forced colors deletes the swatch's only information |
| P5-i2 | INFO | CORROBORATED | only the click-outside close path drops focus to `<body>` |

**Strongest defect:** P5-B1 — the surface is the wrong species. Its binding composition names a
shallow leading tray; a 240 × 632.84 px overlay ships and covers 37.9 % of the Browse pane and all
six visible palette cards on desktop, 54.3 % and all five on mobile, so the discovery route's
see-while-you-narrow loop cannot close. Every proportion, rhythm, boundary and state defect below it
is downstream of that one shape decision.
