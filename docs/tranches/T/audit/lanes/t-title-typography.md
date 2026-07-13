# T fleet · t-title-typography — the 1.5× golden recalibration (T-2 · T-7 · T-15)

**Lane**: design (Fable) · **Rows**: T-2 (titles → 1.5× golden, non-bold) · T-7 (readout
numbers → 1.5× golden, contiguous) · T-15 (the wrong font, t-2006-46)
**Substrate**: `tranche-t` = master @ `cc4f4fa` (the S close)
**Probe rig**: own vite on `:9123` (`VITE_API_URL=http://localhost:59999`), Playwright,
1440×900, light + dark (`.dark` forced; all cited sizes scheme-invariant), 32rem panes
(the 2026-07-05 owner-ruling clamp). Every size below is a **computed style read from the
live DOM**, not a token guess. Probe frames parked at
`scratchpad/t-lane-typography/t-lane-{picker-light,picker-dark,palettes-light}.png`
(session-ephemeral; the numbers are all inline here).

---

## §0 Shot ↔ finding re-derivation (the mandate map is best-effort; re-read from disk)

| Shot | What it actually shows | Row it evidences |
|---|---|---|
| `t-2002-09` (764×134) | The picker header readout, dark: `39.2%,  48.5,  42.2` with dead air ≈ 1.5 figure-widths between values, a sliver of the spectrum plate below | **T-7** (the mandate mapped this to T-6 netting — wrong; the netting shot is elsewhere) |
| `t-2002-52` (432×354) | The hero blob overlapping the card gutter + the About header: “Abo…” **bold** Fraunces sentence with the italic caption below | **T-2** (the bold-title half) + T-8 (blob, not this lane) |
| `t-2006-46` (964×308) | A dark palette card: color strip · “Generated Palette” in a **geometric sans semibold** · count badge “5” · `⋯` menu · expanded swatches | **T-15** — the surface is `PaletteCard.vue` (badge = `:66`, menu = PaletteCardMenu; confirmed by live seed, §F7) |

---

## §1 The golden rung math (the house quantization of “1.5×”)

The house ladder (glass-ui `dist/styles/typography/scale.css`, consumed verbatim per
DESIGN.md §Type) is φ-generated: **adjacent `--type-display-N` tokens are half-rungs apart
(×√φ ≈ 1.272); two token steps = one full golden rung (×φ ≈ 1.618)**. Verified against the
shipped values: `2.058 = 1.618·1.272`, `2.618 = 2.058·1.272`, `3.33 = 2.618·1.272`,
`4.236 = 2.618·1.618`, `5.382 = 3.33·1.618`.

The ladder has no 1.5 rung. In log-space, 1.5× sits between √φ and φ, **nearer φ**
(|ln 1.5 − ln 1.618| = 0.076 vs |ln 1.5 − ln 1.272| = 0.165). So the spec-grade reading of
the owner’s “1.5× bigger using our golden scale” is **one full golden rung: ×φ, i.e. two
token steps** — and the three moves below all land on exact shipped tokens, no new values
minted:

| Surface | Today’s rung | New rung | Exactness |
|---|---|---|---|
| Picker plate title (“Lab”) | `--type-display-1` `clamp(1.618rem, 1.2rem+1.6vw, 2.618rem)` | `--type-display-3` `clamp(2.618rem, 2rem+3vw, 4.236rem)` | both clamp ends exactly ×φ (1.618→2.618, 2.618→4.236) |
| Pane title (“About the color spaces,” — the ONE PaneHeader site, all 9 panes) | `--type-heading` = 1.618rem static | `--type-display-1` | at ≥1440 the clamp caps at 2.618rem = exactly ×φ; the floor holds phones at today’s 1.618rem (a long sentence must stay fluid — deliberate) |
| Readout numbers | `min(--type-display-2, max(7.2cqi, 1.618rem))` | `min(--type-display-4, max(11.65cqi, 2.618rem))` | every bound ×φ: 7.2·φ = 11.65; display-2→display-4 is ×φ at both clamp ends; 1.618→2.618 |

Computed anchors at 1440/32rem panes: title 41.888px → 67.78px; pane title 25.888px →
41.888px; readout 33.77px → 54.64px. The title:readout ratio (1.24 ≈ √φ) is preserved —
the header’s internal hierarchy is scale-invariant under the move.

---

## §2 Findings

### F1 — T-2 · the “Lab” plate title rung is producer-owned; ×φ needs a display-3 rung
- **Evidence**: `ColorSpaceSelector.vue:35` `size="audacious"`; glass-ui dist
  `SelectScrollDownButton-BrWm1XEG.js:76` maps `audacious → var(--type-display-1)`;
  computed 41.888px at 1440 (= display-1 at cap).
- **Root-cause**: W4-1 deliberately rode the producer size ladder — the ladder tops out at
  display-1. The demo must not shadow it with a local font-size (that re-opens the
  split-brain W4-1 closed).
- **Owner**: **joint** (producer rung + demo consume).
- **Cure direction**: E-2 request packet — extend the SelectTrigger size grammar one
  station: either a named rung above `audacious` mapping `--type-display-3`, or (better,
  future-proof) the trigger’s font-size resolves through a single consumer-settable token
  (`--select-trigger-font-size`, default per size rung) so the scale is a token, not an
  enum forever. Weight/style stay trigger-owned (F2). Verify against newest glass-ui +
  forthcoming BG/BH before authoring the packet — the rung may already exist.

### F2 — T-2 · the title’s weight is host-inherited: About inks BOLD, picker inks 400 (S-21 broken on the weight axis)
- **Evidence** (computed, same component, same viewport): picker-hosted `.space-trigger` =
  Fraunces italic 41.888px **400**; About-hosted = Fraunces italic 41.888px **700**. The
  class list (`ColorSpaceSelector.vue:37`) owns family + style + size — **no weight
  utility** — so About’s trigger inherits 700 from PaneHeader’s h3 (`text-heading`,
  weight 700), the picker’s inherits 400 from the body.
- **Root-cause**: W4-1’s “host-independent face” clause was implemented for family/style
  but the weight axis was omitted; host-dependence re-entered through inheritance.
- **Owner**: demo.
- **Cure direction**: the trigger’s own class list carries the full type voice including
  **weight 400** (the owner’s non-bold edict) — host-independent by construction, both
  hosts verbatim, zero per-instance overrides (the S-21 law, now covering all four axes:
  family, style, size, weight).

### F3 — T-2 · the About sentence is a bold 1.618rem dwarfed 1:φ by its own inline member
- **Evidence**: `PaneHeader.vue:12` `font-display text-heading` → computed Fraunces
  **700** @ 25.888px, while the inline selector inks 41.888px in the same line
  (`AboutPane.vue:17–25`); shot `t-2002-52` shows exactly this lopsided bold line. The
  scroll-shrink (`PaneHeader.vue:122–129`) animates ONLY the h3 font-size
  (heading→prose) — the inline trigger’s absolute rung does not follow: the sentence and
  its member **desync on scroll today**.
- **Root-cause**: two independent rungs composed into one sentence; weight from the
  producer’s `text-heading` (hardcoded 700).
- **Owner**: demo (rung + sync) / **joint** (weight tokenization, F8).
- **Cure direction**: PaneHeader’s title rung moves one golden rung, `--type-heading` →
  `--type-display-1`, weight 400 — the ONE site, all 9 panes inherit (no About fork;
  E-3). The inline selector **inherits the sentence’s size** in-line (`font-size: 1em`
  in the About host — the picker keeps its explicit plate rung as a prop): the sentence
  and its member become one homogeneous title line at every scroll position by
  construction — the shrink animates the h3, the member rides. Re-lock the shrink
  keyframes one rung up: `from display-1 → to heading` (÷φ, replacing heading→prose).

### F4 — T-7 · the spread is the per-cell worst-case reservation inking as dead air
- **Evidence** (computed, lab @ 1440/32rem): cells `min-width` 108.445 / 130.134 /
  130.134px vs rendered figure widths 66 / 63 / 68px — **39–51% of every cell is empty
  reservation**, pooling BETWEEN the values because cells are start-aligned (slack trails
  inside each cell) + `gap-x-3`. Shot `t-2002-09` verbatim.
- **Root-cause**: the card-lock law’s mechanism 2 (`ColorComponentDisplay.vue:21` binds
  `readoutReservation.ts` per-cell worst-case `ch` floors) renders the worst case as
  BLANK width on every non-worst value. Two stacked contributors, ≈ equal here:
  (a) digit-count slack — “100.0” reserved vs “92.0” rendered ≈ 21.7px; (b) the ch-unit
  over-advance — `1ch` = 21.69px is the “0” advance but the face renders digits
  proportionally (F5) ≈ 20.8px more.
- **Owner**: demo.
- **Cure direction**: the reservation table’s job **re-scopes from per-cell width floors
  to the line-level lock only** (the per-space `min-height` line-count derivation stays,
  recomputed at the new rung — §3). Cells go intrinsic and contiguous — the values read
  as a true tuple, `x, y, z` — with the card-lock held by (i) REAL tabular figures (F5)
  + the fixed per-space format ⇒ widths change only at digit-count boundaries, and
  (ii) the worst-case line-count lock ⇒ the card rect never moves. This **amends W4-2**:
  the S.W4 gate criterion “Lab inks ONE line at 1440” is superseded by “every space inks
  its OWN locked line count, contiguous, at every width of the pane band” — the T wave
  doc must re-author that gate text explicitly.

### F5 — T-7 · `tabular-nums` is a silent no-op on the loaded Fraunces: the card-lock’s mechanism 1 is fiction
- **Evidence** (in-page probe, Fraunces 33.77px, `font-variant-numeric: tabular-nums
  lining-nums` declared): `"1111"` = 59.19px, `"9999"` = 79.87px, `"0000"` = 86.76px —
  identical to the proportional control; `1ch` = 21.69px = the “0” advance. The digits
  are proportional; the declaration (`ColorComponentDisplay.vue:120`) does nothing.
- **Root-cause**: the Google-Fonts-served Fraunces instance (`index.html:19`, axes-only
  `ital,opsz,wght` request) does not carry a live `tnum` table. DESIGN.md §Type’s
  card-lock mechanism 1 (“Fraunces is NOT [tabular] — a Fraunces-set number MUST declare
  tabular-nums”) codifies a declaration the shipped face cannot honor; the S-audit’s own
  “declared tabular advance ≈ 0.635em” measure was measuring the `ch` unit, not the
  rendering.
- **Owner**: demo (font provisioning).
- **Cure direction**: **self-host a Fraunces build with a verified `tnum`** (the W4-6
  self-hosted-KaTeX-fonts precedent; upstream Fraunces ships the feature — verify on the
  artifact, not the docs), guarded by a boot/e2e probe asserting equal digit advances
  under `tabular-nums` (the Tabs-class named-drift catch-all pattern). Fallback register
  decision for the owner if self-hosting is refused: the readout digits re-voice to Fira
  Code (the readout voice, tabular by construction) — but Fraunces hero numbers were the
  deliberate TYPOGRAPHY-1 choice; the face cure is primary. **This finding gates F4/F6**:
  contiguous cells without real tabular digits jitter on every value change; with them,
  the whole reservation edifice becomes true arithmetic.

### F6 — T-7 · the ×φ readout rung and its per-space line consequences (all 17 catalog spaces + hex, 32rem cards)
- **Evidence**: computed from the LIVE `readoutReservation.ts` + `COLOR_SPACE_RANGES`
  (imported in-page via `/@fs`); capacity in `ch` is composition-constant under the cqi
  rung (`readoutReservation.ts:55–89`): ~20ch today → **~12.36ch at ×φ** (20/φ).
- Per-space worst-case line count at the new rung (reserved `ch` incl. 0.75ch gaps →
  lines at 12.36ch):

  | Locks ONE line | Σch | Locks TWO lines | Σch |
  |---|---|---|---|
  | kelvin | 7 | rgb · hsl · hsv · hwb · lch · xyz | 16.5 |
  | hex | 9 | lab | 18.5 |
  | srgb-linear · display-p3 · a98-rgb · prophoto-rgb · rec2020 | 10.5 | | |
  | ictcp · jzazbz | 12.5 — **a hair over 12.36**: needs lever (ii) or an honest 2 | |

- **Owner**: demo.
- **Cure direction** — three reconciling levers, ranked:
  1. **Per-space least-count formats**: the “fixed 1-decimal” law generalizes to a fixed
     per-space least count (a meter’s least count is per-quantity): integer-native spaces
     (rgb 0–255, hue °) ink integers → rgb/hsl/hsv/hwb/lch drop to ~10.5–11ch → **one
     line at ×φ**. Still value-independent (never a stripped `.0` — the format is a
     constant of the space).
  2. **A per-space fit-to-width clamp derived from the same table**
     (`font-size: min(rung, per-space-fit)` via a module-scope coefficient, no runtime
     measurement): ictcp/jzazbz shave ~1% to hold one line; lab either fits-down ~×1.08
     (rejects the owner’s size intent) or takes lever 3.
  3. **Honest 2-line locks** where the space is irreducibly wide (lab at 1-decimal): the
     lock derives 2, both lines packed worst-case — the owner’s “x, y, z (or more if
     needed)” reads as a vector continuing onto line two; never a value-dependent wrap,
     never a blanket.
- Recommended composition: 1 + 2, with 3 for lab-class spaces if the owner holds lab at
  1-decimal.

### F7 — T-15 · the wrong font is PaletteCard’s title: the body sans on a title surface
- **Evidence**: live-seeded a “Generated Palette” card (the shot’s exact composition:
  strip + name + count badge + `⋯` + swatches). Computed: **“Plus Jakarta Sans” 600 @
  20.352px** — `text-subheading` (`PaletteCard.vue:49`), the producer’s body-voice
  utility (`font-family: var(--font-text)`). Every sibling title surface speaks Fraunces:
  the 9 pane titles (25.888px), the empty-state “No saved palettes yet.” (Fraunces 700),
  CurrentPaletteEditor’s label (`font-display`, `CurrentPaletteEditor.vue:9`). The shot’s
  geometric sans against the house serif register is what the owner read as “not right.”
- **Root-cause**: the title reached for `text-subheading` as a SIZE rung and silently
  took the family with it — glass-ui’s `text-subheading` is body-voice by design; the
  three-voice law assigns titles to the display voice.
- **Owner**: demo.
- **Cure direction**: the palette-card name joins the **display voice at the same optical
  rung** — Fraunces, subheading scale, the T-2 non-bold register (≤500). **Non-italic**:
  reserve the italic for the instrument’s own titles (“Lab”); user-data names read as
  catalog entries, not controls. Re-verify the rename-input morph + `line-clamp-2`
  metrics under the serif (`PaletteCard.vue:150–157`), and sweep the sibling
  `text-subheading`-as-title sites (dialog headers, admin panels) in the same stroke —
  one register, no per-card fork.

### F8 — T-2 · “non-bold” collides with the producer’s hardcoded display weights
- **Evidence**: glass-ui `typography/semantic.css` hardcodes `font-weight: 600` on every
  `text-display-*` and `700` on `text-heading`/`text-title`; nothing in the demo can pin
  the display register non-bold without per-site weight utilities (patch-class).
- **Owner**: **producer** (glass-ui root, per the E-2 “component-level items at the
  ROOT” edict).
- **Cure direction**: request packet — the display/heading weights resolve through tokens
  (`font-weight: var(--type-weight-display, 600)` / `var(--type-weight-heading, 700)`),
  one knob each; the demo pins the house register (400 at display rungs) in `:root`
  exactly as it pins `--font-stack-display` today (style.css:191 — the same
  SOURCE-token cure shape as R.W3 A1).

---

## §3 The consequence table (what moves at ×φ, what must re-lock)

| # | Surface | Today (computed @1440/32rem) | At the new rung | Must re-lock |
|---|---|---|---|---|
| 1 | Picker “Lab” title | display-1 · 41.89px · it. 400 | display-3 · 67.78px · it. 400 | trigger owns weight (F2); caret `translate-y-[0.06em]` + underline em-metrics hold IF re-specified em-relative — the 1px/3px underline (`ColorSpaceSelector.vue:183–189`) reads hairline at 67.8px → thickness/offset move to em; focus ring radius rides `--radius-md` unchanged |
| 2 | Title row blob reservation | `pr-28 lg:pr-36` against a 41.89px line (`ColorPicker.vue:21`) | title band grows to ~72px tall | the bead’s corner-break geometry re-derives; **co-lands with T-8’s placement-law revision** — sequence the two in one wave item, not two |
| 3 | The 9 pane titles (PaneHeader:12) | heading · 25.89px · 700 | display-1 · 41.89px @1440 · 400 (phones hold 25.89 at the clamp floor) | `pane-title-shrink` from display-1 → to heading (÷φ); `pane-header-shrink`/veil `animation-range: 0 120px` re-derives from the taller natural header; description caption keeps the φ ladder rhythm |
| 4 | About inline selector | 41.89px, host-inherited 700, desyncs on scroll | `1em` inherit in-sentence → rides the h3 incl. shrink; picker passes the plate rung explicitly | S-21 restated: the affordance GRAMMAR (ink states) stays verbatim in both hosts; SIZE becomes the sanctioned host prop |
| 5 | Readout numbers | 33.77px · spread cells (108/130/130 minWidth vs 66/63/68 content) | 54.64px @32rem · contiguous intrinsic cells | capacity 20 → 12.36ch (derived, not nudged — the constant’s own formula ÷φ); per-space line locks per F6’s table; `fig-unit` 0.55em + comma register ride em-relative unchanged; tnum face cure (F5) is the gate |
| 6 | Header vertical budget | header ≈ 110px | ≈ 145px (1-line) / ≈ 200px (2-line lab-class) | verify vs `--content-max-h` `clamp(34rem, 86dvh, 52rem)` at 900px-tall desktops — the sliders must not fall into scroll; a layout probe row for the wave gate |
| 7 | Specimen dropdown rows | `text-title` names, correct | unchanged | proportion check only: catalog rows under a display-3 trigger |
| 8 | PaletteCard title | Jakarta 20.35px 600 | Fraunces, subheading scale, ≤500, non-italic | rename-input + `line-clamp` metrics under the serif; sweep sibling `text-subheading`-as-title sites |
| 9 | The W4-2 gate text | “Lab readout one line at 1440” | superseded | re-authored: “every space inks its own locked line count, contiguous, across the pane band” (F4) |

## §4 Producer request-packet seeds (E-2)

1. **SelectTrigger size ladder +1 station** (or token-indirect font-size) — F1.
2. **Display/heading weight tokenization** (`--type-weight-display` /
   `--type-weight-heading`) — F8.
3. (Verify-first against newest glass-ui + BG/BH before authoring either — the rung or
   the knob may already ship.)

## §5 Cross-lane notes

- **T-8**: consequence row 2 (blob reservation) must land WITH the title rung move.
- **T-23**: the header veil’s at-rest shading interacts with row 3’s taller band — the
  two PaneHeader edits are one re-composition, single-writer.
- **T-24**: the readout/title ink ladders (86%-alpha rest ink, fig-frac 0.55 opacity) are
  neutrals-buget inputs for the consistency audit; no change proposed here.
- **W4-2/W4-1 provenance**: T-2/T-7 are owner recalibrations of landed-good work (§1
  mandate note) — the specs above amend, never re-litigate, the S.W4 grammar.
