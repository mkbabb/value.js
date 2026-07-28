# M-14 clause 1 — glass-forward compliance ledger

**Seat.** E:glass-forward-compliance (Opus banausic band, M-14). **Date** 2026-07-27. **HEAD**
`c654824e`. **Model receipt:** `claude-opus-5[1m]` (Opus 5, 1M context) — as stated in this
session's runtime identity block; `$ANTHROPIC_MODEL` is unset in the environment (`echo
"${ANTHROPIC_MODEL:-<unset>}"` → `<unset>`), so the runtime block is the only observable.

**Clause under audit (M-14 clause 1).** *"ALL glass-ui-forward items delivered to that inbox and
marked accordingly."*

**Verdict up front: the clause is NOT met. 11 glass-forward arms are UNRELAYED**, every one of
them adjudicated BEFORE the last outbound packet was written, every one proven absent from all
six sent letters by a term sweep pasted below. The delivered surface is large and genuinely good
(26 arms landed across five packets); the debt is concentrated in three adjudications whose glass
riders never reached a letter at all (AdminUsersPanel, GenerateControls, Markdown), plus two arms
that were *partially* delivered — the letter carried the measurement but dropped the ask.

---

## 0. Method, and what "PROVEN zero" means here

**Corpus swept (the accusation side).** All 14 files in
`docs/tranches/V/megatranche/registry/adjudicated/` + `registry/ROOT-FINDINGS.md`, grepped for
`GLASS-OWNED`, `RELAY`, `BH`, `glass ask`, `I-20`, `producer-routed`, `producer change`,
`BH inbox`:

```
$ grep -rc "GLASS-OWNED" adjudicated/*.md ROOT-FINDINGS.md
AdminUsersPanel.md:6   App.md:1   ColorInput.md:3   ColorSpaceSelector.md:6
ColorPicker.md:4       ConfigSliderPane.md:0       Dock.md:2   GradientStopEditor.md:2
Markdown.md:2          GenerateControls.md:6       chassis-fitness.md:0
library-band.md:0      parser-band.md:0            layout-gestalt.md:0   ROOT-FINDINGS.md:0
```
(`ConfigSliderPane.md` carries its glass arms under `glass-owned` lower-case + `RELAY`: 9 `RELAY`
lines, 9 `I-20` lines. `layout-gestalt.md` carries them under `glass ask`: 3 lines.)

**Corpus swept (the delivery side).** Every value.js→glass letter that exists. `find
/Users/mkbabb/Programming/glass-ui/docs -iname "*valuejs*" -newermt 2026-07-01` returns exactly
six letters in the live BI/BJ mail paths:

| INBOX row | file | mtime |
|---|---|---|
| O-6  | `BI/coordination/valuejs-inbox-2026-07-17-glass7-adopted-plus-three-marks.md` | 2026-07-17 22:08 |
| O-7  | `BJ/coordination/valuejs-outbound-2026-07-24-parser-p0-prm-idiom-dockcrossfade.md` | 2026-07-24 16:46 |
| O-10 | `BJ/coordination/valuejs-outbound-2026-07-27-chassis-asks-and-dead-dock-rules.md` | 2026-07-27 11:28 |
| O-10a| `BJ/coordination/valuejs-outbound-2026-07-27-o10-amendment-census-g7-g9.md` | 2026-07-27 12:26 |
| O-13 | `BJ/coordination/valuejs-outbound-2026-07-27-parser-prototype-input-class.md` | 2026-07-27 12:28 |
| O-16 | `BJ/coordination/valuejs-outbound-2026-07-27-o16-adjudication-arms-s0-corroboration.md` | 2026-07-27 13:27 |

(INBOX rows O-8/O-9/O-11/O-12/O-14/O-15 are keyframes / atlas / fourier / parse-that — not
glass-forward, out of this seat's subject.) All six read in full.

**The zero-proof.** Each UNRELAYED row below carries a term sweep run over all six letters at
once. The command form is the glob form (zsh does not word-split an unquoted `$var`; a first
attempt using a `$P` variable produced spurious all-zero results and was discarded):

```
$ cd /Users/mkbabb/Programming/glass-ui/docs/tranches
$ grep -ic -- "<term>" BJ/coordination/valuejs-outbound-*.md \
      BI/coordination/valuejs-inbox-2026-07-17-glass7-adopted-plus-three-marks.md
```

Sanity control, same command, term `slider` — non-zero, so the sweep is live:
```
o16:9   chassis:1   o10a:0   o7:0   BI-O6:0   O-13:0
```

**Knowability.** Every adjudication file's mtime precedes the last packet (`stat -f "%Sm"`):
AdminUsersPanel 11:38 · ColorPicker 11:15 · ColorSpaceSelector 11:43 · GenerateControls 11:53 ·
GradientStopEditor 12:00 · Markdown 12:18 · ConfigSliderPane 12:35 · Dock 13:02 — all before O-16
at **13:27**. No unrelayed arm can be excused as "not yet ruled when the letter went out."

**Ledger size:** 44 rows — 26 DELIVERED · 11 UNRELAYED · 7 AMBIGUOUS.

---

## 1. DELIVERED (arm → packet §)

| # | Arm | Source | Packet § |
|---|---|---|---|
| D-1 | G-1 persistent-stage collapse arm on InstrumentChassis | layout-gestalt.md:379 §8 | O-10 §B G-1 |
| D-2 | G-2 scroll-confined inspector arm | layout-gestalt.md §8 | O-10 §B G-2 |
| D-3 | G-3 `--instrument-comfort-inline` token | layout-gestalt.md:190 | O-10 §B G-3 |
| D-4 | G-4 coarse-pointer ≥44×44 control rung | layout-gestalt.md §8 | O-10 §B G-4 |
| D-5 | G-5 chassis block-fill arm | layout-gestalt.md §8 | O-10 §B G-5 |
| D-6 | G-6 dead `@container dock` rules — DEFECT RELAY | layout-gestalt.md:394, :152 | O-10 §A (verbatim, with the `container-name` count 0) |
| D-7 | G-7 publish the 44.9375rem narrow threshold as contract | layout-gestalt.md §8 | O-10 §B G-7, **upgraded** O-10a §C |
| D-8 | G-8 `overflow: visible` arm (probe-gated candidate) | layout-gestalt.md §8 | O-10 §B G-8 (correctly labelled "do nothing yet") |
| D-9 | G-9 publish `61.8033989 / 38.1966011` as tokens | chassis-fitness.md:156 (§4.3) | O-10a §D |
| D-10 | Census correction: true 7.0.0 chassis population N=1 | chassis-fitness.md:167 §4.3 | O-10a §A |
| D-11 | stage+action-only hairline quirk (relay-if-materialises) | chassis-fitness.md:182 | O-10a §E — recorded, correctly not asked |
| D-12 | L-10 SelectTrigger title/display variant **+ the producer-state correction** (text-title IS tokenized) | ColorSpaceSelector.md:24, :43, :92 | O-16 §C-4 (correction carried in glass's favour — good) |
| D-13 | B-2 thumb/grab glyph geometry | ConfigSliderPane.md:138, :141 | O-16 §C-2 (joins O-10 G-4) |
| D-14 | B-3 **valuetext half** — Slider `valuetext` prop-through | ConfigSliderPane.md:48, :139 | O-16 §C-1 |
| D-15 | Slider forced-colors arm + O's control-element acceptance probe | ConfigSliderPane.md:60, :183 | O-16 §C-3 (7 blocks enumerated, probe attached) |
| D-16 | D-15 shader evidence request (Satellites=0) | ConfigSliderPane.md:74, :141 | O-16 §C-7 |
| D-17 | D-18 axis-direction / RTL decision | ConfigSliderPane.md:77, :141 | O-16 §C-8 |
| D-18 | In-chrome capsule elevation variant | Dock.md:51; ROOT-FINDINGS.md:1254, :1489 | O-7 §G.1 + O-16 §C-5 |
| D-19 | BANK-D1 chrome tint token (`--glass-tint-chrome` / `useDockSurfaceTint`) | Dock.md:77 | O-16 §C-6 (correctly marked banked, not blocking) |
| D-20 | D-10 thumb geometry `12×24` measurement | ColorPicker.md:34, :151 | O-16 §C-2 — **measurement only**; see U-10 for the two dropped arms |
| D-21 | MT-F026 `.glass-capsule` floating elevation on in-chrome controls | ROOT-FINDINGS.md:1254-1260 | O-7 §G.1 (with the one question posed) |
| D-22 | MT-F027 `--shadow-cartoon-md` three zero-blur layers facet | ROOT-FINDINGS.md:1330-1331 | O-7 §G.2 (nested-spread cure proposed, labelled unverified) |
| D-23 | Chip/Badge orphaned dist CSS residual (I-9 lineage) | ROOT-FINDINGS.md:1439 | O-7 §F (restated as banked, deliberately not patched) |
| D-24 | MT-F013 `useLayerTransition` successor ask (mark M2) | ROOT-FINDINGS.md:344-352; App.md:39 | O-6 §2 M2 → closed by O-7 §D (clean-break retirement) |
| D-25 | Parser prototype input class on `parseCssColor` (glass imports it at 4 sites) | library-band.md:400-402 | O-13 whole |
| D-26 | GenerateControls G-1 slider thumb hit-area | GenerateControls.md:104, :327 | O-16 §C-2 / O-10 §B G-4 — substance delivered; the "via pseudo-element" mechanism deliberately superseded (ConfigSliderPane.md:169: *"a wanted rung beyond 44px is a relay, never a `::before`"*) |

---

## 2. UNRELAYED — **THE DEBT LIST** (11 arms; each zero PROVEN)

> Every row: the exact arm, the source `file:line`, a verbatim quote, and the sweep output that
> proves the arm is absent from all six sent letters.

### U-1 · Button `inheritAttrs:false` + explicit prop allowlist — **GLASS-OWNED rider, never sent**
- **Source:** `registry/adjudicated/AdminUsersPanel.md:63` (restated :95, :116, :122)
- **Quote (:63):** *"**GLASS-OWNED rider** (cite INBOX I-20; masking-fallback ban — no local
  shim): Button `inheritAttrs:false` + explicit allowlist so an unrecognised design-token prop is
  a visible no-op; leaves as a BH-relay letter."*
- **Why it matters (from the same row):** 51 dead `variant` sites in 22 files fall through
  `$attrs` to the DOM; `vue-tsc` exits **0** over all 51 — *"the W44 hard typecheck is
  structurally blind to this class and may never be cited as its gate."*
- **Carry line (:116):** *"L-3 BUILD demo-half; producer half GLASS-OWNED → BH relay (I-20),
  banked on `glass-ui version > 7.0.0 && grep -c inheritAttrs dist/button-*.js ≥ 1`"* — a bank
  whose relay never left.
- **ZERO PROOF:** `inheritAttrs` **0** · `allowlist` **0** · `fallthrough` **0** · `attrs`
  **0** · `ButtonProps` **0** across all six letters. `Button` matches 4 lines, all unrelated
  (O-7:252/:270/:271 = `glass-capsule` / `DockIconButton` elevation; O-6:23 = DarkModeToggle's
  `<button @click=toggleDark>`).

### U-2 · ConfirmDialog preset over the Glass 7 Dialog family — **GLASS-OWNED rider, never sent**
- **Source:** `AdminUsersPanel.md:78` (restated :116, :122)
- **Quote:** *"a ConfirmDialog *preset* over the Glass 7 Dialog family is a **GLASS-OWNED rider**
  (INBOX I-20, BH relay)."* Cause named in-tree: *"(:280-282: Glass 7 folded ConfirmDialog onto
  the Dialog family)"*; consequence: AdminFlaggedPanel.vue:98 and AdminTagsPanel.vue:101 delete
  without confirmation — *"a safety row."*
- **ZERO PROOF:** `ConfirmDialog` **0**. `confirm` matches 5 lines, none of them this
  (O-10:1 title / O-10:40 "confirmation, not change" / O-10:45 "confirm or withdraw" /
  O-10a:36 / O-6:7 "Adoption confirmation"). `dialog` matches exactly 1 line — O-6:15,
  `Sheet→Dialog placement="right"`, a migration note.

### U-3 · Button `xs` height token for a dock-adjacent admin toolbar — **GLASS-OWNED rider, never sent**
- **Source:** `AdminUsersPanel.md:87` (restated :116, :122)
- **Quote:** *"**GLASS-OWNED rider** (INBOX I-20): if `xs` is the wrong height for a
  dock-adjacent admin toolbar, the token moves inside glass-ui — never back into eleven demo
  files."* Census: `h-7 px-2/2.5` hand-set on `<Button size="sm">` at **22 sites / 11 files**
  while `Button.vue.d.ts:5` ships `ButtonSize = "xs" | "sm" | "md" | "lg"`.
- **ZERO PROOF:** `ButtonSize` **0** · `h-7` **0** · `size=` **0** · `xs` **0**.

> U-1..U-3 are the three riders the AdminUsersPanel arbiter itself declared outbound
> (`:122`: *"Three riders are GLASS-OWNED (Button attr allowlist; the xs-height token question;
> the ConfirmDialog preset) and leave via the standing BH relay (INBOX I-20)"*). **None left.**
> AdminUsersPanel closed 11:38; O-16 went out 13:27.

### U-4 · G-2 first-class track-stops affordance — **GLASS RELAY declared, never sent**
- **Source:** `GenerateControls.md:204` and the relay roster `:328`
- **Quote (:204):** *"Cure = producer first-class track-stops → **relay G-2**"*; roster (:328):
  *"G-2 first-class track-stops affordance (collapses the twins)"*. Row 25 RAIL-4-COPIES,
  rescoped to 2 structural twins + 2 one-liners + 4 `--slider-track-bg` per-instance sites.
- **ZERO PROOF:** `track-stop` **0** · `stops` **0** · `multi-thumb` **0**. `track` matches 3
  lines, none this (O-10:35 "inspector track"; O-7:157 `glass-specular-track.css` in a filename
  list; O-6 unrelated).

### U-5 · G-3 ButtonProps closed to unknown attrs + dev-assert + axis-naming reconciliation — **GLASS RELAY declared, never sent**
- **Source:** `GenerateControls.md:328-329`
- **Quote:** *"G-3 ButtonProps closed to unknown attrs / dev-assert on `variant` reaching Button
  root + axis-naming reconciliation"*
- **Note:** this is the *second, independent* derivation of U-1's class from a different
  component seat — two adjudications converged on the same producer ask and neither reached a
  letter. The `axis-naming reconciliation` clause is a **distinct** arm from O-16 §C-8 (which is
  ConfigSliderPane D-18's *RTL axis-direction* decision).
- **ZERO PROOF:** `ButtonProps` **0** · `dev-assert` **0** · `axis-naming` **0** · `attrs` **0**.

### U-6 · The 6-site dead-`tag` consumer census, as v8 migration input — **GLASS RELAY declared, never sent**
- **Source:** `GenerateControls.md:32` (ruling R-D) and roster `:329`
- **Quote (:32):** *"The 6-site dead-`tag` census still rides the glass relay as *migration
  input* only."* Roster (:329): *"dead-`tag` consumer census as v8 migration input."*
  Basis: `WatercolorDot.vue.d.ts` props `{color, variant?, animate?, cycleDuration?, range?,
  seed?}` — *"no `tag` was ever in the contract"*.
- **ZERO PROOF:** `tag=` **0**; the 6 `tag` substring matches are inside `stage` (O-10:29/:30/:36,
  O-10a:53/:54) and `advantage`-class words — none is a `tag` prop census.

### U-7 · Row 13 DARK-CHROMA — the producer dark-arm `--card` token origin — **relay declared, never sent**
- **Source:** `GenerateControls.md:128-129`
- **Quote:** *"light `--card: hsl(30 85% 96%)` vs dark `--card: hsl(26 22% 17%)` in glass dist
  tokens (read this session) — origin is producer dark-arm → **relay**"* (the value-owned half,
  `--well-bg` at foundation.css:328, is correctly kept ours).
- **ZERO PROOF:** `--card` **0** · `dark-arm` **0** · `dark arm` **0**. The 7 `dark` matches are
  O-7:42/:46 (the SIGABRT light/dark probe rows) and O-6's DarkModeToggle M1 — neither is this
  token.

### U-8 · L-13 / D-14 — producer `variant="rail"` / SliderThumb slot for the multi-thumb rail species — **GLASS-ROUTED, never sent**
- **Source:** `GradientStopEditor.md:46` (L-13), `:61` (D-14), roster `:107`, boundary `:122`
- **Quote (:46):** *"its cure (a `variant="rail"`/SliderThumb slot) is a PRODUCER change —
  glass-ui is not ours, no local patch may be proposed … Disposition: relay to the standing glass
  BH inbox fond (owner edict 2026-07-12) + runnable bank."* (:107) *"**GLASS-ROUTED**: L-13 +
  D-14 → the standing glass-ui BH inbox fond."* (:122) *"the multi-thumb rail species (L-13/D-14)
  lands as a glass-ui variant via the standing BH relay, never as further hand-rolled mechanics."*
- **Weight:** this is the file's only two GLASS-ROUTED rows — its entire glass-forward surface.
- **ZERO PROOF:** `SliderThumb` **0** · `multi-thumb` **0** · `thumb slot` **0**. `rail` matches
  exactly **1** line — O-7:172, *"The controlled-no-rail 5-pane case"*, a quote from glass's own
  DockCrossfade docstring. Not this arm.

### U-9 · Markdown L-8's GLASS-OWNED arm — the Skeleton `var(--muted)` fill + shimmer/surface variant — **relay declared twice, never sent**
- **Source:** `Markdown.md:44` (the row), `:65` (the scope-out line); tallied at `:12` as *"1
  GLASS-OWNED arm (inside L-8, relayed — cites INBOX I-20)"*
- **Quote (:44):** *"GLASS-OWNED arm: the `var(--muted)` skeleton fill — the exact tone
  Markdown.vue:229-232's own AB-3 comment forbids for content chips — is the producer's recipe:
  **relayed to the glass BH inbox per the standing owner edict, cites INBOX I-20; no local patch,
  no demo override, no masking fallback**"*
- **Quote (:65):** *"the glass Skeleton `--muted` fill + any shimmer/surface variant desire →
  **glass BH inbox relay** (owner edict; INBOX I-20; masking-fallback ban)"*
- **ZERO PROOF:** `muted` **0**. `Skeleton` matches 3 lines, none this: O-16:39 lists `skeleton`
  among the seven components that *have* forced-colors arms; O-10a:30/:38 say "bespoke skeletons"
  meaning hand-built layout mockups.

### U-10 · ColorPicker D-10 — the two arms O-16 §C-2 dropped (partial delivery)
- **Source:** `ColorPicker.md:151` (the RELAY instruction), row at `:34`, tightening at `:65`
- **Quote (:151):** *"**RELAY, NO LOCAL PATCH — D-10** to the active glass-ui BH inbox (standing
  fond): the measured thumb geometry (… → 12×24) **+ the track-target counter-measurement
  (339.4×24 operable; aria-valuenow 0.5→0.048 on a track click) + PR-12's TIGHTEN disposition
  (invisible grab seat at the producer root)**."*
- **What was sent:** O-16 §C-2 in full — *"Slider thumb glyph geometry — thumbs measure 12×24
  live at 1440 AND 390; joins the O-10 G-4 coarse-pointer rung ask rather than duplicating it."*
  The 12×24 landed. The counter-measurement and the TIGHTEN disposition did not.
- **Why the drop is material:** the counter-measurement is precisely what *rescued* glass from the
  wrong accusation — `:111` records the WCAG SC 2.5.8 citation **overruled** because the full
  track qualifies as the pointer-accepting region. Glass received the accusation-shaped number
  (12×24) without the exonerating one (339.4×24 operable).
- **ZERO PROOF:** `339` **0** · `TIGHTEN` **0** · `grab` **0** across all six letters.

### U-11 · ConfigSliderPane B-3's second half — ConfiguratorRow `aria-labelledby` / label-id exposure (partial delivery)
- **Source:** `ConfigSliderPane.md:139` (bank B-3), `:141` (the relay-letter manifest), `:52` (C-6)
- **Quote (:141), the letter's own contents list:** *"**RELAY letter (ONE, standing BH invariant,
  owner edict 2026-07-12)**: B-2 + B-3 + the slider forced-colors arm (with O's control-element
  probe as acceptance test) + D-15's shader evidence request + D-18's axis-direction decision +
  **the ConfiguratorRow label-id exposure**. Every glass item cites INBOX I-20."*
  Five of six landed as O-16 §C-1/§C-2/§C-3/§C-7/§C-8. The sixth did not.
- **Quote (:139):** *"**B-3** a11y prop-through (glass) — re-trigger: `aria-labelledby` in
  ConfiguratorRow.vue.d.ts / `valuetext` in slider/types.d.ts — **both absent today (verified)**."*
  O-16 §C-1 carries only the `valuetext` limb.
- **Measured RED (:52):** live census `labels 31, labelsWithFor 0, role=group 0`;
  `ConfiguratorRow.vue.d.ts:44` ships the comment *"No a11y for/id wiring"*; `for` cannot bind
  against `span[role=slider]`, so **aria-labelledby is the only durable form** — and it is the
  half that was not asked for.
- **ZERO PROOF:** `labelledby` **0** · `aria-label` **0** · `label` **0**.

---

## 3. AMBIGUOUS (7) — recorded so nothing is lost, none is a debt today

| # | Item | Source | Why ambiguous |
|---|---|---|---|
| A-1 | Conditional GL-context-loss relay: *"if GL loss survives HMR-free capture, relay to the glass producer with the trace (HeroBlob wraps glass Blob; glass 7.0.0 ships a `webglcontextlost` handler) — no demo patch"* | ColorPicker.md:78 (C-19 bank) | Gated on a re-capture on the BUILT artifact that has not run. `webglcontextlost` = **0** hits in packets, correctly: nothing is owed until the probe fires. Becomes a debt the moment it does. |
| A-2 | G-8 chassis `overflow: clip` vs the HeroBlob corner-breaking ornament | layout-gestalt.md §8; O-10 §B G-8 | *Delivered as a candidate* with "do nothing yet". The **confirm-or-withdraw is owed by us** (the U-4 probe). Delivery is complete; the obligation is not. |
| A-3 | *"any WatercolorDot API question"* riding the relay | ColorSpaceSelector.md:92 | No concrete ask ever crystallised, and GradientStopEditor.md:53 rules the opposite way for the same component — `@mkbabb/glass-ui/watercolor-dot` is a PUBLISHED subpath, *"a CONSUME, not a producer change"*. Zero packet mentions (`WatercolorDot` **0**) is defensible; flagged because two adjudications point different directions. |
| A-4 | Row 29 NOT-A-DEFECT-TRACK — the transparent-track + underlay arrangement | GenerateControls.md:222-224 | **GLASS-OWNED / RETIRED** by design: *"producer-sanctioned and PINNED by §D … No seat may 'fix' it."* Correctly unrelayed — an inbound pin, not an outbound ask. |
| A-5 | The spectrum blur-over-ramp prefix seam (glass 07-25 §3, cured in 8.0.0) | ColorInput.md:59/:78/:115 · App.md:114/:152/:162 · ColorPicker.md:151 · ColorSpaceSelector.md:80/:92 · ConfigSliderPane.md:37 · Dock.md:77 · GradientStopEditor.md:103/:122 · GenerateControls.md:205 | Inbound glass-owned (I-20), *"Do not patch locally"*, cured in 8.0.0. Every one of the 13 sites correctly declines to re-book or patch it. O-16 §D restates the posture. **Zero debt — recorded because it is the single most-repeated glass string in the corpus and must not be mistaken for an unsent ask.** |
| A-6 | BANK B-1 (*"the fill is NOT reachable from the demo at glass-ui 7.0.0 at any specificity"*) | ConfigSliderPane.md:15, dissolved at :142 | Described as a *"glass-owned BANK"* at :15, then **dissolved** at :142 — *"its contents are this wave's G-PAINT cut"* (value-owned). No glass debt survives; the stale :15 phrasing is the only residue. |
| A-7 | G-4 `[data-color-surface]` relay | GenerateControls.md:31 (R-C), :327, :353 | **WITHDRAWN** by arbiter ruling: *"`[data-color-surface]` has zero producers repo-wide … a dead selector"* → *"worker-F's G-4 relay withdrawn."* Correctly unrelayed. |

---

## 4. What the shape of the debt says

1. **The debt is per-adjudication, not per-arm.** O-16 consolidated ConfigSliderPane (5 of 6),
   ColorSpaceSelector (1 of 1), Dock (2 of 2), ColorPicker (1 of 3 arms). It carries **nothing**
   from AdminUsersPanel, GenerateControls, GradientStopEditor, or Markdown — four adjudications
   whose glass riders were all ruled and written down before 13:27. The consolidation letter was
   built from a subset of the docket, and the subset boundary is invisible in the letter itself:
   O-16 §C reads as complete (*"the consolidated r1+r2 adjudication arms"*), which is exactly how
   a compliance claim gets made in good faith against an incomplete sweep.

2. **Two independent seats derived the same producer ask and neither shipped it.** U-1
   (AdminUsersPanel, Button `inheritAttrs` allowlist) and U-5 (GenerateControls, `ButtonProps`
   closed to unknown attrs + dev-assert). Convergent derivation is the strongest evidence in the
   corpus that the ask is real; it is also the strongest evidence that the relay step, not the
   analysis, is what failed.

3. **Partial delivery is the subtler failure.** U-10 and U-11 both landed in O-16 — with the
   measurement and without the ask (U-11), or with the accusation and without the exoneration
   (U-10). A ledger that counts letters rather than arms scores both as green.

4. **Nothing in the debt list blocks glass 8.0.0**, and nothing in it is a local patch. All 11
   are producer-side asks or evidence rows under the masking-fallback ban, which is exactly why
   they can sit unnoticed: no value.js gate goes RED when a relay does not leave.

**Discharge shape (not this seat's to execute):** one amendment letter to BJ carrying U-1..U-9 as
new asks and U-10/U-11 as amendments to the already-sent O-16 §C-2 / §C-1, marked as an amendment
the way O-10a amends O-10 — no ask withdrawn, no packet re-sent.

---

*Seat E:glass-forward-compliance, M-14 excavation swarm, 2026-07-27. Every claim above carries a
quote + `file:line` or a command + pasted output. No memory recall is used as evidence anywhere in
this document.*
