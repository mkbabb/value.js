# CHALLENGE-C — `EasingSpecimenStrip.vue` · implementation · **pass 4 (r4)**

## Model receipt

I observe myself to be **Opus 5** — exact model id `claude-opus-5[1m]`, the 1M-context tier this seat
was explicitly spawned with. Declared, not inherited.

---

## What this pass is

The tree moved **again**. The prompt names `c654824e`; pass 3 measured at `f36f780c`; the working
tree is now **`d19da6d3`**. Every number below was re-derived at `d19da6d3`. Pass 3's ledger is
carried by id — nothing is renumbered — with three rows **sharpened**, one row **closed** (the single
"inherited, not re-probed" caveat pass 3 refused to launder), and one attribution **corrected**.

| | |
|---|---|
| **HEAD verified** | `d19da6d3` (pass 3: `f36f780c`; pass 2: `80fc5c40`; prompt: `c654824e`) |
| **Subject** | `demo/workbenches/gradient/GradientVisualizer/easing/EasingSpecimenStrip.vue` (216) |
| **Corpus** | `easing/easingCatalogue.ts` (231) · `easing/useSpecimenRows.ts` (74) · `easing/EasingAuthoringStage.vue` (117) · `GradientVisualizer/GradientEasingEditor.vue` (295) · `composables/useGradientCSS.ts` · `useGradientInterpolation.ts` · `useGradientModel.ts` |
| **Producer read** | `glass-ui@7.0.0` `dist/chip-DFZQr6rV.js` · `chipVariants.d.ts` · `types.d.ts` · `dist/fading-scroll-DhxXIhm2.js` · `dist/easing.js` · `dist/styles/index.css` · `dist/styles/glass/glass-chip.css` · `dist/styles/theme/radius.css` · `dist/styles/utilities/base-misc.css` |
| **Live probes** | **11 isolated headless-WebKit contexts** (`playwright.webkit`, 1440×900), one clean context per press |
| **Module probes** | 4 `vite-node` runs through the demo's own resolution graph |

**PROBE-HYGIENE NOTE — read this before trusting any pass-4 sibling that used the shared browser.**
I began on the shared Chrome-DevTools/Playwright MCP browser and abandoned it: other seats were
driving the same instance concurrently. `?probe=2` and then `?probe=4` appeared in the URL unbidden
and the route drifted `#/gradient → #/palettes → #/browse` mid-sequence, destroying three probes.
**That drift is cross-seat contention, not an app defect** — do not bank it. Every measurement in
this report comes from my own `webkit.launch()` contexts, one per press, and is therefore immune.

**VERDICT — DEFECTIVE.** Seventeen findings, ids carried from pass 3. **The BLOCKER still
reproduces at `d19da6d3`, three heads and four passes after it was first raised** — and this pass
proves it is materially worse than the ledger says.

### Re-verification ledger at `d19da6d3`

| id | sev | finding | status at `d19da6d3` | my evidence this pass |
|---|---|---|---|---|
| **C-01** | **BLOCKER** | overshooting curves tear down the Gradient pane | **STILL RED — and wider than recorded** | 3/3 back tiles + 2 clean controls; **producer-menu route**; **2-keypress route**; grid-dependence table |
| C-02 | MAJOR | MT-F030 — five radius registers; `--radius` clobbered by a producer layer collision | **STILL RED** | port `0px`, ramp/rail `6px`, buttons `4px`, tiles `9999px`, card `16px`; `components.css` `:root{--radius:.25rem}` located |
| C-03 | MAJOR | glass `Chip` cell recipe + pressed wash never paint — **FOLD-BANK (M3)** | **STILL RED** | `glassChipRuleCount: 0`; **lit and unlit tiles measured byte-identical** |
| C-04 | MAJOR | in-plate tile carries the *floating* glass elevation | **STILL RED — caveat CLOSED** | `… / 0.14) 0px 8px 24px 0px` measured on the resting tile |
| C-05 | MAJOR | zero-letterbox law is dead code — `svg[role='img']` matches nothing | **STILL RED** | `svgRoleImgCount: 0`; 31 svgs in the row, one `role` and it is `"group"` |
| C-06 | MAJOR | `FAMILY_ORDER` drops 6 of 30 library presets | **STILL RED** | module probe + **live preset-menu repro re-run at this HEAD** |
| C-07 | MAJOR | the lit `steps` tile misreports identity and is inert | **STILL RED** | independent A/B/C repro, pasted |
| C-08 | MAJOR | 27-way single-select as 27 toggles behind a nameless roleless tab stop | **STILL RED** | `tabindex="0"`, `role: null`, no name, 27 tabbable tiles |
| C-09 | MINOR | WCAG 2.5.3 Label in Name (`steps` / `n = 4`) | **STILL RED** | 1 of 27 fails, measured |
| C-10 | MINOR | per-instance override of the producer cell recipe (edict 5) | **STILL RED** | `:163-170` vs `chipVariants` `cell` |
| C-11 | MINOR | one 27-Chip strip mounted per interval, forever | **STILL RED** | **133 of 583 page elements (22.8%)** — page grew, strip mass unchanged |
| C-12 | MINOR | vacuous unit gate; both live oracles RED | **STILL RED** | mutation re-confirmed; O-17 premise still dead (C-05) |
| C-13 | INFO | `.specimen-strip` is a dead class hook | **STILL RED** | `specimenStripRuleCount: 0` |
| C-14 | INFO | exported minters carry no arity/domain guard | **STILL RED** | `easingCatalogue.ts:48-56` |
| C-15 | INFO | watch getter allocates a fresh tuple each evaluation | **STILL RED** | `:50-51` |
| C-16 | INFO | keep-in-view flake | **NEGATIVE PROOF, third clean pass** | `scrollW 1482 / clientW 436`, port is the sole scroll target |
| C-17 | MINOR | hovering the pressed tile destroys half its selection ink | **STILL RED** | computed-style triple, pasted |

---

## C-01 · BLOCKER — re-verified, and **three sharpenings that change the finding**

### (a) Still red at `d19da6d3`, with controls on both sides

One clean WebKit context per press; boundary detected by rendered text:

```
$ node scratchpad/verify-r4.mjs
=== A · back-family press, one clean context each (HEAD d19da6d3) ===
{"id":"ease-out-circ",    "clicked":true,"stripAlive":true, "pressed":["ease-out-circ"],
 "readout":"cubic-bezier(0.075, 0.82, 0.165, 1)","headName":"1 → 2ease-out-circ","boundary":null,"errors":[]}
{"id":"ease-in-back",     "clicked":true,"stripAlive":false,"pressed":[],"readout":null,
 "headName":null,"boundary":"… this panel hit an unexpected error.","errors":[]}
{"id":"ease-out-back",    "clicked":true,"stripAlive":false,"pressed":[],"readout":null,
 "headName":null,"boundary":"… this panel hit an unexpected error.","errors":[]}
{"id":"ease-in-out-back", "clicked":true,"stripAlive":false,"pressed":[],"readout":null,
 "headName":null,"boundary":"… this panel hit an unexpected error.","errors":[]}
{"id":"ease-in-out-expo", "clicked":true,"stripAlive":true, "pressed":["ease-in-out-expo"],
 "readout":"cubic-bezier(1, 0, 0, 1)","headName":"1 → 2ease-in-out-expo","boundary":null,"errors":[]}
```

Note `errors: []` on the fatal presses. **The boundary swallows it silently** — zero `pageerror`,
zero `console.error`. That is the measured reason C-01 is invisible to the visual matrix (which
records `0 consoleErrors` for `/#/gradient` in all four Safari matrices) and to every
console-noise assertion in the e2e suite. The instrument is not merely un-aimed; it is **deaf by
construction**.

`ease-in-out-expo` = `cubic-bezier(1, 0, 0, 1)`, the most violently-shaped preset in the catalogue,
presses clean. The trigger is not "extreme"; it is precisely "leaves [0,1]".

### (b) **NEW — the crash is not the strip's alone: the producer's own preset menu reaches it**

Zero tile presses. Disclose the authoring stage, open the picker's `Easing preset` select, choose the
curve:

```
$ node scratchpad/verify-r4c.mjs
=== D2 · producer preset menu route (getByRole) ===
{"via":"preset menu","preset":"ease-in-out-back","picked":true,"alive":false,"readout":null,
 "boundary":true,"pressedNow":[],"head":null,"errors":[]}
```

**This settles the cure argument with evidence.** Deleting the `back` tiles from the catalogue —
the tempting minimal patch — would leave the identical crash fully reachable through the producer
control seated three rows below, and would contradict the strip's own overshoot design
(`:172-179`, the deliberate `overflow: visible` headroom "*(the back family) draw past the box —
visible, never clipped*"). The cure must be at the ramp seam. Pass 3 argued this; it is now measured.

### (c) **NEW — two keypresses from the shipped default**

Focus control point 2 in the authoring canvas and press `Shift+ArrowUp` (the producer's own
documented coarse step, announced in its sr-only text: *"Up and Down change y from -0.6 to 1.6"*):

```
=== E2 · handle drag past the box, Shift steps (0.1) up to the clamp ===
{"log":[{"press":1,"readout":"cubic-bezier(0, 0, 1, 1.1)", "alive":true, "boundary":false},
        {"press":2,"readout":null,                          "alive":false,"boundary":true}]}
```

Two keystrokes from the seeded `linear`. The `back` family is not a family of three bad tiles; it is
**three preset points that happen to sit inside a live minefield covering the entire overshoot half
of the picker's declared authoring domain**. Every user who drags a handle above the box is one small
motion from destroying the workbench.

### (d) **NEW — the fatal set is a function of a private constant and the stop count**

Why does `1.1` survive and `1.2` die? The ramp seam samples on a fixed grid —
`useGradientCSS.ts:180-182`: `stepsPerInterval = max(2, round(COALESCE_RESOLUTION / (stops.length-1)))`,
`COALESCE_RESOLUTION = 32` (`:42`). The crash fires iff a *grid sample* leaves [0,1], not iff the
*curve* does:

```
$ npx vite-node scratchpad/probe-grid.ts
cubic-bezier(0, 0, 1, 1)    grid max = 1.000000 (k=32/32) | true max = 1.000000 | grid > 1? false
cubic-bezier(0, 0, 1, 1.1)  grid max = 1.000000 (k=32/32) | true max = 1.006427 | grid > 1? false ← survives, yet OUT of range
cubic-bezier(0, 0, 1, 1.2)  grid max = 1.019532 (k=31/32) | true max = 1.022485 | grid > 1? true  ← dies
cubic-bezier(0, 0, 1, 1.3)  grid max = 1.044924 (k=31/32) | true max = 1.044946 | grid > 1? true
```

And `stepsPerInterval` depends on **how many stops the user's gradient has**, so the same curve is
fatal or safe depending on an unrelated part of the document:

```
$ npx vite-node scratchpad/probe-grid2.ts        # cubic-bezier(0, 0, 1, 1.2)
stops=2 → stepsPerInterval=32: grid max = 1.019532  → PANE DIES
stops=3 → stepsPerInterval=16: grid max = 1.003158  → PANE DIES
stops=4 → stepsPerInterval=11: grid max = 1.000000  → survives
stops=5 → stepsPerInterval=8:  grid max = 1.000000  → survives
stops=9 → stepsPerInterval=4:  grid max = 1.000000  → survives
```

**Consequence for the fold**: any enumerate-the-bad-curves cure is unsound — the fatal set moves when
a tuning constant moves and when the user adds a stop. Only totality at the seam is sound.

### (e) **CORRECTION to pass 3's attribution — the specimen midpoint is not the (only) throwing seam**

Pass 3 attributes the throw to `useSpecimenRows.ts:53-59` (`fn(0.5)` → `interpolateStopColors` →
`useGradientInterpolation.ts:37`). That is right for two of the three tiles and **wrong for the
third**:

```
$ npx vite-node scratchpad/probe-back-domain.ts
ease-in-back       fn(0.5)= -0.063622  midInRange=false  #t-out-of-[0,1]=37/65
ease-out-back      fn(0.5)=  1.067553  midInRange=false  #t-out-of-[0,1]=39/65
ease-in-out-back   fn(0.5)=  0.606680  midInRange=TRUE   #t-out-of-[0,1]=44/65   ← midpoint is legal
ease-out-circ      fn(0.5)=  0.958586  midInRange=true   #t-out-of-[0,1]=0
ease-in-out-expo   fn(0.5)=  0.500000  midInRange=true   #t-out-of-[0,1]=0
```

`ease-in-out-back`'s midpoint is 0.6067 — perfectly legal — yet the pane still dies. Its throw comes
from the **second** seam: `useGradientCSS.ts:206-208`, inside `sampleCoalescedStops`'s loop over the
grid, which feeds `serializeIntervalRamp` (the open row's ramp strip, `GradientEasingEditor.vue:63-67`)
**and** `serializeCoalescedGradient` (the workbench's main CSS and hero swatch). Both are `computed`s
on the render path; both demote a `Result` into a bare `throw`.

So the seam inventory is:

| seam | file:line | reached by | throws for |
|---|---|---|---|
| specimen-row ink midpoint | `useSpecimenRows.ts:53-59` → `useGradientInterpolation.ts:37` | every row, always | curves whose `fn(0.5)` ∉ [0,1] |
| the ONE sampling law | `useGradientCSS.ts:197-208` | ramp strip + coalesced gradient + editing rail | curves with any **grid** sample ∉ [0,1] |

The library is blameless at both: `src/color/operations.ts` returns
`err({ code: "color_progress_out_of_range" })` and never throws.

**Cure (pass 3's, confirmed correct and now provably minimal).** A CSS gradient interval cannot
produce a color outside its endpoints, so an overshooting timing function *means* hold-at-endpoint.
Total the progress domain **once**, where an eased `t` becomes a mix progress — a `rampProgress(fn, t)`
beside `easingFnOf` in `useGradientCSS.ts` — so both seams inherit totality, then delete both `throw`
sites as unreachable. Gate it with C-12's total-domain invariant.

---

## C-04 · MAJOR — **the ledger's one inherited row is now closed: STILL RED, re-probed**

Pass 3 declined to launder this row ("*Pass 2's measurement stands unchallenged, not re-confirmed*").
Measured this pass at `d19da6d3`, resting tile, no hover, no press:

```
boxShadow: rgba(255,255,255,0.3) 0 1px 0 0 inset, rgba(255,255,255,0.18) -1px 0 0 0 inset,
           color(srgb 0.11 0.098 0.09 / 0.06) 0 -1px 0 0 inset,
           color(srgb 0.11 0.098 0.09 / 0.04) 1px 0 0 0 inset,
           color(srgb 0.11 0.098 0.09 / 0.14) 0px 8px 24px 0px,        ← the FLOATING drop
           color(srgb 0.11 0.098 0.09 / 0.05) 0 0 0 0.5px,
           rgba(255,255,255,0.25) 0 0.5px 0 0 inset
```

A 44×44 in-plate fixture carrying a 24px-blur floating drop plus a six-part specular stack, inside a
card whose own contract (`GradientEasingEditor.vue:108-110`) is *"flat on the plate, `--card-edge`
hairline, no shadow (DESIGN.md § Depth)"*. **Row closed: RED.**

**New corollary — C-03's missing wash proven by identity, not by absence.** The lit tile
(`data-state="on"`) and an unlit sibling measure **byte-identical** in every state-bearing property:

```
lit   : {"radius":"9999px","boxShadow":"…0 8px 24px…","border":"0px","bg":"oklab(0.925647 0.009411 0.029177 / 0.83872)"}
unlit : {"radius":"9999px","boxShadow":"…0 8px 24px…","border":"0px","bg":"oklab(0.925647 0.009411 0.029177 / 0.83872)"}
```

Selection carries **zero** surface signal. It is entirely borne by the strip's own two hand-inked
rules (`:204-211`) — one of which C-17 shows hover destroys.

---

## C-03 · MAJOR — re-verified: `glass-chip.css` is shipped and imported by nothing

```
$ grep -c "glass-chip" node_modules/@mkbabb/glass-ui/dist/glass-ui.css
0
$ for f in dist/styles/glass/*.css; do grep -q "$(basename $f)" dist/styles/{index,glass}.css || echo ORPHAN $f; done
ORPHAN  a11y-fallback.css
ORPHAN  glass-atom.css
ORPHAN  glass-chip.css          ← 18 siblings imported, these three are not
```

Live at `d19da6d3`: `glassChipRuleCount: 0` across every reachable stylesheet; the tile's class list
carries `glass-chip glass-capsule … glass-chip--cell` while `.glass-chip--cell {
border-radius: var(--radius-card) }` never lands, so `glass-capsule`'s `--radius-pill` wins →
**`9999px` on a 45.2 × 43.8 box = a perfect circle.** The Tailwind utilities in the `cell` variant
(`flex-col gap-1.5 px-2 py-2.5 text-micro`) *do* land — they are compiled by the demo's `@source`
scan of the producer's dist JS. Only the hand-authored `.glass-chip*` rules are gone: the cell
radius, the `[data-state="on"]` accent-band/edge/ink wash, the `::after` flood and `--chip-flood-t`
press punch, and the `@media (pointer: coarse)` `2.75rem` touch floor.

### What is visually wrong in the Safari captures — read off the pixels

`shots/safari-desktop-light/gradient.png`, `shots/safari-desktop-dark/gradient.png`, and the owner
witness `owner-marked/OM-4-easing-radius-incoherence.png`:

- The specimen row reads as **a row of eight coins**, not a specimen grid. Glyph and label are
  crammed into each circle's inscribed square, so the widest label (`in-out`) runs to the edge while
  the corners carry dead space — the exact inversion of a cell.
- **Selection is ink-only** (now proven by the identical-computed-style measurement above): the lit
  `linear` tile has the same fill, edge and elevation as its 26 siblings; only its sparkline and
  label go teal. In **dark** the tiles are near-invisible dim discs and selection collapses to "one
  cyan word among grey words".
- The family divider (`.strip-family + .strip-family` border-left) reads as a **floating tick between
  two coin clusters**; circles do not tile, so a rule between them has nothing to rule.
- The strip **clips the catalogue at `sine / in-out`**: 8 of 27 tiles visible, measured
  `scrollWidth 1482 / clientWidth 436` = 3.4× overflow, with a 16px (`--fade-scroll-width: 1rem`)
  fade as the only affordance. 19 existing specimens — plus the 6 that do not exist at all (C-06) —
  are undiscoverable at rest.
- Against the 16px card and the 6px ramp/rail, these circles are the **"too rounded"** pole of
  MT-F030 and the 0px strip port and 4px rail buttons are the **"not rounded enough"** pole.

**Disposition — FOLD-BANK ON GLASS (mark M3). NO LOCAL PATCH.** The producer fix is one line:
`glass.css` must `@import "./glass/glass-chip.css"` (and `glass-atom.css`, `a11y-fallback.css`,
orphaned by the same omission). A scoped `.specimen-tile { border-radius: … }` is the masking
fallback MT-F014 forbids, double-books a fix glass must ship, and still leaves the wash, the flood
and the coarse-pointer floor missing. So does a consumer `@import` reaching into the producer's
private tree. **Ours in this row**: `EasingSpecimenStrip.vue:160-162` asserts the recipe *"carries
press/hover semantics + the pressed wash"* — false in the shipped build; correct the comment when
glass lands.

---

## C-02 · MAJOR — MT-F030 re-measured at `d19da6d3`

| element | source | **computed** | box |
|---|---|---|---|
| interval row card | `GradientEasingEditor.vue:114` `rounded-card` | **16px** | 462 × 196 |
| live ramp strip | `:153` `rounded-md` | **6px** | 436 × 20 |
| **specimen strip port** | `EasingSpecimenStrip.vue:84` `.specimen-strip` | **0px** | 438 × 87 |
| specimen tile ×27 | producer `shape="cell"` + C-03 | **9999px** | 45.2 × 43.8 |
| endpoint dots | `:243` literal `9999px` | 9999px | 10 × 10 (legitimately round) |
| readout rail | `:176` `rounded-md` | **6px** | 436 × 32 |
| rail buttons ×2 | `:274` `var(--radius-input)` | **4px** | 24 × 24 |
| authoring card | producer `rounded-card` | **16px** nested in 16px | 436 × 226 |
| preset combobox | producer capsule | **9999px** full-width pill | 436 × 40 |

**0 / 4 / 6 / 16 / 9999** — five registers. Two independent defects:

**(a) `rounded-md` and the 0px port are off-register.** `demo/DESIGN.md §Radii` enumerates the
role-bearing tokens exhaustively — `rounded-card` 16px, `rounded-input` 8px, `rounded-pill`,
`rounded-panel` 12px — and closes *"Avoid hand-rolling … when the role-bearing token applies."*
`rounded-md` bears no role; the port bears none at all (C-13: `.specimen-strip` matches zero rules).
Glass already ships the exact token for an in-card strip: **`--radius-strip: 0.75rem`** (12px,
`dist/styles/theme/radius.css`). Nothing in the corpus uses it.

**(b) `--radius-input` is poisoned to 4px app-wide by the producer's own dist layering.** Measured:
`--radius-card: 1rem`, `--radius-pill: 9999px`, **`--radius-input: 0.25rem`**. Glass's
`theme/radius.css` declares `--radius: 0.625rem; --radius-input: var(--radius)` (10px);
`demo/DESIGN.md:195` documents 8px. The override:

```
node_modules/@mkbabb/glass-ui/dist/styles/components.css:1
  :root { … --radius: 0.25rem; --radius-lg: 0.5rem; --radius-sm: 0.25rem; … }
```

`dist/styles/index.css` declares `@layer theme, base, components, utilities;` then imports
`components.css` **into the later `components` layer** — so Tailwind's stock `--radius` outranks
glass's `@theme`, and every `--radius-input` / `--radius-button` / `--radius-lg` consumer in the app
silently drops to 4px. Three values for one token: doc 8, theme 10, served 4.

**Cure.** Ours: one declared ladder — card rung (16) for the card, **one** in-card rung
(`--radius-strip`, 12) for ramp + rail + port + tile, pill for genuinely round things. Five registers
→ three, each named. Glass, banked: the `components.css` `:root` block must not sit in a layer later
than `theme`.

---

## C-05 · MAJOR — re-verified: the zero-letterbox law matches nothing

```
svgRoleImgCount: 0
svgRoles: [null ×29, "group", null]      # 31 <svg> in the open row; the picker canvas is role="group"
```

`EasingAuthoringStage.vue:48` queries `svg[role='img']` and `:104` styles `:deep(svg[role="img"])`.
The producer's canvas is `role="group"`. `syncVbRatio()` therefore returns early on every call,
`--vb-ratio` stays pinned at its `1.2` literal (`:45`), and `onMounted` (`:62`), the `watch`
(`:63-67`) and **both** `requestAnimationFrame` calls (`:58`, `:65`) are dead code — as are all five
`:deep` declarations, `!important` included. Laws 1 and 2 of the file's stated three *do* hold, which
is what makes law 3's silence dangerous: the file reads as if all three are in force.

**Cure**: do not key a cross-package contract to an ARIA role. Ask glass for `data-easing-canvas` on
the svg (the root already carries `data-testid="easing-picker"`), and make sizing a producer prop
rather than five `!important` overrides. Until then delete the inert apparatus rather than ship it.

---

## C-06 · MAJOR — re-verified at this HEAD, module **and** live

```
$ npx vite-node scratchpad/probe-catalogue.ts
bezierPresets count      : 30      SPECIMEN_TILES count : 27
families rendered        : css, sine, quad, cubic, expo, circ, back, steps
presets WITH NO TILE     : ease-in-quart, ease-out-quart, ease-in-out-quart,
                           ease-in-quint, ease-out-quint, ease-in-out-quint
  ease-in-quart  css=cubic-bezier(0.895, 0.03, 0.685, 0.22)  tileIdFor=null  specimenNameFor=custom
  … (all six identical in shape)
duplicate literals       : (none)
```

`easingCatalogue.ts:191` uses the `:174` literal as a **filter**, not an order —
`FAMILY_ORDER.filter((f) => byFamily.has(f))`. `familyLabelFor` derives ten families from the preset
keys; `FAMILY_ORDER` names eight. `quart` and `quint` are built, then discarded — and because
`SPECIMEN_TILES` is `SPECIMEN_FAMILIES.flatMap(…)` (`:201`) the loss propagates into the identity
function `tileIdFor` (`:220`).

Live cross-surface repro re-run at `d19da6d3` (the producer's menu is `Object.keys(bezierPresets)` —
measured `optionCount: 30`, all six present):

```
{"via":"preset menu","preset":"ease-out-quart","picked":true,"alive":true,
 "readout":"cubic-bezier(0.165, 0.84, 0.44, 1)","pressedNow":[],"head":"1 → 2custom"}
```

The literal mints byte-perfectly (`bezierLiteral` `:48-51` matches `dist/easing.js`'s
`` `cubic-bezier(${e}, ${t}, ${r}, ${a})` `` over `+n.toFixed(3)`), the gallery goes **blank of
selection**, and the head labels a first-class value.js preset `custom` — while the module docstring
(`:15-17`) promises *"never a second mint"*. C-06 is a **coverage** break, not a mint break.

**Cure.** `FAMILY_ORDER` becomes a hint, never a gate:
`[...new Set([...FAMILY_HINT, ...byFamily.keys()])]`. `src/easing.ts:34-63` already authors `PRESETS`
in family order, so `byFamily.keys()` alone would do. Enforced by C-12's exact-equality gate.

---

## C-07 · MAJOR — re-verified independently: the lit `steps` tile is a trap

```
A after pressing generic 'steps' : {"lit":"steps(4, jump-end)","pressed":["steps"],"head":"1 → 2steps"}
B after bumping n on the producer slider :
                                   {"lit":"steps(5, jump-end)","pressed":["steps"],"aria-valuenow":"5"}
C after pressing the still-lit 'steps' :
                                   {"literalAfterPressingPressedStepsTile":"steps(5, jump-end)",
                                    "pressed":["steps"],"ariaPressed":"true","head":"1 → 2steps"}
```

At **B** the tile whose own literal is `steps(4, jump-end)` — and whose visible label reads **`n = 4`**
— renders pressed while the readout three pixels below says `steps(5, jump-end)`; the strip's stated
law (`:7-8`, *"pressed tile IS the interval's curve"*) is false. At **C** the one control in the
product that names `steps(4, jump-end)` refuses to emit it: `onTileToggle` (`:33-35`) drops
`on === false`, which is exactly what reka's `Toggle` reports for an already-pressed tile. There is no
path back to the default staircase through the selection surface.

Mechanism: a **surjective** identity function (`tileIdFor`, `:219-223` — many steps intervals map to
one tile) feeding a press handler that assumes **injectivity**. Cure: idempotent selection —
`function onTileToggle(tile) { emit("select", tile) }` — the radio semantics the control already
wants (C-08), at the cost of one boolean.

---

## C-17 · MINOR — re-verified: hovering the pressed tile destroys half its selection ink

`:208` and `:212` tie at (0,4,0) after scope-attribute injection; source order decides and `:212` is
later:

```
pressed, no hover  {"state":"on","labelColor":"oklch(0.438102 0.074812 205)","stroke":"oklch(0.438102 0.074812 205)"}
pressed, HOVERED   {"state":"on","labelColor":"rgb(28, 25, 23)",             "stroke":"oklch(0.438102 0.074812 205)"}
pressed, unhovered {"state":"on","labelColor":"oklch(0.438102 0.074812 205)","stroke":"oklch(0.438102 0.074812 205)"}
```

With C-03 in force there is no pressed wash and no pressed edge, so the accent label is **one of only
two** selection signals the control owns — and hover destroys one of the two. `:hover` is
unqualified, so on the two `safari-mobile-*` matrices the last tapped tile keeps the hover ink until
something else is tapped: sticky hover landing on the one element whose ink encodes state.

**Cure**: `.specimen-tile:not([data-state="on"]):hover .tile-label`, guarded by
`@media (hover: hover)`; delete both hand-inked label rules once C-03 lands.

---

## Negative proofs — re-verified independently this pass

| claim | evidence at `d19da6d3` |
|---|---|
| **No page-scroll yank** (the O-19 root cause is genuinely cured) | The reveal writes `scrollLeft` on exactly one element, and that element **is** the port: measured `.fading-scroll` `scrollWidth 1482 / clientWidth 436 / overflow-x: auto`. `scrollIntoView` is genuinely absent; no ancestor is touched. |
| **Nearest-edge keep-in-view works** (C-16, third clean pass) | `dx` arithmetic (`:65-70`) correct on both edges, no-op inside the port; pass-1's flake did not reproduce in pass 2, 3 or 4. |
| **`immediate: true` + `nextTick` is not a null-deref** | Resolves after the mount flush in both the synchronous-first-mount and in-flush cases; initial state measured clean (`pressed: ["linear"]`, zero errors). |
| **No ungated rAF — not a PRM-RAF site** | The strip owns no rAF; its one animation is PRM-gated (`:74`). `FadingScroll`'s is single-shot and coalesced (`u ||= requestAnimationFrame(…)`), torn down in `onBeforeUnmount`. The corpus's two rAF calls are in `EasingAuthoringStage` and are dead (C-05). |
| **No `defineModel`, no `ValueUnit`, no oklch→HSV, no WebGL, no pointer capture, no network, no timers** | Selection is a plain prop + emit; the only subscription is `useMediaQuery`, disposed by VueUse on unmount (one per instance — C-11's multiplier, not a leak). |
| **Nothing here parses** | `parseCssColor` is unreachable from this subtree. `glyphPath` output is `NaN`-free across all 27 tiles. |
| **No duplicate literals** | The identity-ambiguity class (two presets sharing a quad → `find` presses the wrong tile) is measured absent: `duplicate literals: (none)` across all 27. |
| **`resolvedEasingCache` is not a leak** | Unbounded module `Map` (`useGradientCSS.ts:69`), but `easingFnOf` returns `interval.fn` first (`:123`) and every tile/picker write supplies `fn` (`useGradientModel.ts:136-139`) — it does not grow with authoring. |
| **`glyphPath` non-finite output is a hypothesis, not a defect** | Measured `M 0.000 NaN`, `-Infinity`, `-1e+300` for pathological callables — but no reachable input produces one: the picker clamps y to [-0.6, 1.6] and steps to 1..12; `easingFnOf` short-circuits on the stored `fn`; `applyCSS` re-seeds every interval to `linear`, so a pasted gradient cannot inject a timing literal. Latent only. |
| **Tap targets pass; the strip contributes 0** | Tiles measured **45.2 × 43.8** / **44.0 × 43.8**. The route's 6 `smallTapTargets` are 3 dock buttons at 22×22, a 160×23 input, and two 20×20 `.rail-handle` stops — none ours. Rail buttons are exactly 24×24. *Caveat*: the 44px is held by the seat's own `min-width: 2.75rem` (`:169`), not by glass's coarse-pointer floor, which C-03 removed. |
| **Nameless buttons: 0 from this component** | Measured `namelessButtons: []` on `/#/gradient`; every tile and rail button carries `aria-label`. |
| **Perf is not a finding** | `glyphPath(fn, 48)` = **0.0175 ms** (1000 iters / 17.50 ms); catalogue module init = **12.98 ms incl. ESM resolve**; `tileIdFor`'s 27-tile scan = **0.00093 ms**. `useSpecimenRows` does recompute glyphs on stop-drag ticks where only colors changed — wasted, but 17 µs/row. Recorded so no seat spends a wave on it. |
| **Edicts 1, 2, 3, 4, 7, 8 clean** | No god module (4 focused files: 216/231/74/117). No shim, alias, dual path or back-compat. No new `shared/` dir or wrapper. `FadingScroll` + `Chip` consumed from glass-ui by their existing type names; nothing minted in `demo/ui/`. Reactive props destructure (`:18`) + `useTemplateRef` (`:48`). Every type-only import is `import type` (`:11-16`, `easingCatalogue.ts:22-36`). Animations: none deleted. |
| **Mint byte-identity holds** | `bezierLiteral`/`stepsLiteral` (`:48-56`) match `dist/easing.js` exactly; the readout after a tile press equals the readout after a picker press. |
| **`term as JumpPosition` is a no-op cast, not a live bug** | Glass's `JumpTerm = (typeof jumpTerms)[number]` re-exports value.js's own tuple; it is identical to `JumpPosition` (`src/easing.ts:13,66`). Recorded under C-14 as hygiene — it buys nothing and would mask a future narrowing into an import-time throw inside `buildFamilies()`. |

---

## C-12 — the gate, with the mutation named

`test/gradient-v4-consume.test.ts:55-58` is the entire data coverage:

```ts
expect(SPECIMEN_TILES.length).toBeGreaterThan(20);          // actual: 27
expect(SPECIMEN_TILES.every((tile) => !tile.glyph.includes("NaN"))).toBe(true);
```

A 7-tile slack that already conceals C-06's six dropped presets and all three pane-destroying tiles.
**Exact mutations that keep it green**, re-confirmed at this HEAD:

1. delete `"expo"` and `"circ"` from `FAMILY_ORDER` → 21 tiles, `21 > 20` holds, no `NaN`;
2. `glyphPath(fn, samples = 1)` → every portrait collapses to `"M 0.000 1.000 L 1.000 0.000"`;
3. every `payload()` returns the `linear` payload → ids, count and glyphs untouched.

There is **no component test at all**: no mount, no press, no assertion that `selectedId` maps to
`data-state="on"`, that a press emits, or that pressing a tile does not destroy its host. The e2e
oracle `o17-easing-composition.spec.ts` is RED on a **dead premise** — `discloseAuthoring` waits on
`#easing-authoring-0 svg[role='img']`, the selector C-05 proves matches nothing — so its two real
clauses never execute, **including the press of `[data-specimen='ease-out-back']` at `:117` and
`:189`, one of the three pane-destroying tiles**.

**Cure** — re-key O-17 off the dead role, then add two invariants that cannot pass vacuously:

```ts
// total domain — would have caught C-01 at authoring time, and is grid-independent
for (const tile of SPECIMEN_TILES)
    for (const stopCount of [2, 3, 4, 5, 9])
        expect(() => serializeCoalescedGradient(modelWith(tile, stopCount))).not.toThrow();

// total catalogue — would have caught C-06
expect(new Set(SPECIMEN_TILES.map((t) => t.id)))
    .toEqual(new Set([...Object.keys(bezierPresets), "steps", "step-start", "step-end"]));
```

Exact equality, not a floor; and the domain sweep must vary the stop count, because §C-01(d) proves
the fatal set moves with it. Both fail today.

---

## Mechanism families (for the fold)

| family | findings |
|---|---|
| **Domain contract violated across a module boundary, with a `Result`→`throw` demotion at the seam — and a failure set that depends on a private sampling constant** | C-01 |
| **A hand-maintained mirror of data the library already orders, used as a gate** | C-06 |
| **A many-to-one identity function feeding a one-way toggle** | C-07 |
| **Cross-package contract keyed to a volatile string (an ARIA role, an unimported sheet), unasserted** | C-03, C-05, C-12 |
| **Producer surface absent → consumer hand-inks what the recipe owns, then collides with itself** | C-03, C-04, C-10, C-17 |
| **Semantics authored on the wrong element** | C-08, C-09 |
| **Per-row instantiation of a surface that is per-selection** | C-11, and the `querySelector` scoping it forces at `:39-41` |
| **Named hooks and declarations that bind to nothing** | C-13, C-05's five dead declarations |

---

## Dispositions

| id | owner | disposition |
|---|---|---|
| **C-01** | **ours** | total the progress domain **once** at the ramp seam (`rampProgress(fn, t)` beside `easingFnOf`); delete both throw sites. **Not** by dropping the `back` tiles — §(b) proves the crash survives that. Gated by C-12's stop-count-varying sweep. **Blocks the wave.** |
| C-02 (a) | ours | one declared ladder: card 16 · in-card `--radius-strip` 12 for ramp + rail + port + tile · pill for round things. |
| C-02 (b) | **glass (BH)** | FOLD-BANK — `components.css` `:root --radius` outranks `@theme` from the later layer. No consumer re-declaration (MT-F014). |
| C-03 | **glass (BJ)** | FOLD-BANK — `glass.css` must `@import "./glass/glass-chip.css"` (+ `glass-atom`, `a11y-fallback`). No local patch. Correct `:160-162` when it lands. |
| C-04 | ours | in-plate fixtures take the in-plate elevation. **Row closed this pass: re-probed RED.** |
| C-05 | ours + glass hook ask | stable canvas hook (`data-easing-canvas`); delete the inert rAF/watch/`--vb-ratio` apparatus. |
| C-06 | ours | `FAMILY_ORDER` becomes a hint, never a filter. |
| C-07 | ours | idempotent selection — emit on press regardless of `on`. |
| C-08 | ours + glass ask | `aria-label` onto `<FadingScroll>` (its `ariaLabel` prop flips `role` to `region`); radiogroup + roving tabindex; drop the inner group. Blocked in part: `Chip` strips `role`/`aria-pressed`/`data-state` from `$attrs` (`chip-DFZQr6rV.js`), so the consumer cannot own the semantics — bank `mode="radio"`. |
| C-09 | ours | per-family `role="group"` + labelled eyebrow; compose the tile name from id + label. |
| C-10 | ours | re-judge after C-03; if the override survives it belongs in glass as a cell size variant. |
| C-11 | ours | **one** hoisted strip bound to the open row — 27 tiles total regardless of stop count. |
| C-12 | ours | re-key O-17; add the two total invariants above. |
| C-13 | ours | style the port through `.specimen-strip` (it is C-02's 0px band) or delete the class. |
| C-14, C-15 | ours | minor hygiene (incl. deleting the no-op `as JumpPosition`). |
| C-17 | ours | `:not([data-state="on"]):hover` + `@media (hover: hover)`; delete both hand-inked label rules once C-03 lands. |

---

## Strongest defect

**C-01, unrepaired across four heads — and this pass shows the ledger understated it.** It is not
"three tiles crash the pane". It is: **the entire overshoot half of the picker's own declared
authoring domain is fatal, reachable in two keystrokes from the shipped default, reachable without
touching this component at all (the producer's preset menu does it), and the exact set of fatal
curves is a function of a private sampling constant and of how many stops the user's gradient
happens to have** — `cubic-bezier(0, 0, 1, 1.2)` destroys the workbench at 2 or 3 stops and is
harmless at 4. The library returns a polite `Result`; two demo seams throw it away; two `computed`s
on the render path carry the throw to the boundary — which then swallows it so completely that
`pageerror` and `console.error` both measure **zero**. Every instrument this repo owns was pointed at
this route and not one of them can see it: the unit gate passes on `27 > 20`, the visual matrix never
presses a tile, and the one e2e oracle written to press exactly `ease-out-back` dies earlier on a
dead selector (C-05).
