# T.W8 · critique pass — EASING (the selector / authoring stage) · p1 (round 1 of ≤3)

**Filed**: 2026-07-12 · Fable + frontend-design · **PROBE-ONLY coherence PRE-FILTER**
(no authoring; no taste certified — a pass verdict is "coherent with the doctrine" or a
filed row, NEVER "beautiful"; lesson 12. Taste is the OWNER's.)
**Branch/head**: `tranche-t` @ `95d806d` at filing. Every commit since the W6.5 close cure
(`69500b7`) is docs-only — verified `git log 69500b7..HEAD -- demo/ src/` is EMPTY — so the
**probed product tree ≡ `5e4f1f6`, the exact tree the owner audited at §0.6 AND §0.7**, and
the easing surface is FROZEN since Row E (`git log 1a8f06c..HEAD -- …/easing/` empty).
**Surface**: the gradient pane's easing bench (T-22 / T-47) — the T.W6.5 Row-E landed seat
(`1a8f06c`): `GradientEasingEditor.vue` closed-row specimen labels (dots + interval-true micro
glyph + name) + the open row {live ramp strip · specimen SELECTION strip · one readout rail ·
a disclosed `EasingAuthoringStage.vue` seating the ONE vendor `EasingPicker :playback="false"`
as a flat well}. The vendor primitive itself (`@mkbabb/glass-ui/easing`) is OUT OF BOUNDS
(producer tree); this pass judges the SEAT.
**Spec of record**: `waves/T.W8.md` §Scope-1 · `SYNTHESIS.md §2` D1–D10 (D5 plate/console,
D6 ink-on-tier, D7 liquid-easing, D10 colocation) · `MANDATE-2026-07-06.md` §0 (T-22, line 49)
+ §0.6 (T-47, t33-audit-15, lines 161-163) · `RATIFICATION-2026-07-09.md` §0/§1 · O-17
(`e2e/smoke/oracles/o17-easing-composition.spec.ts`).
**Owner verbatim (the lines this pass reads)**: T-22 (t-2009-51) "This area in easing is still
a mess." · T-47 (t33-audit-15) "Again, this entire easing selector area is broken, too small,
and should closer resemble the keyframes.js easing slector curve selector. Redesign this from
first principles with that assayed directly. And more compactly than it is now."
**Pass inputs**: `w65-close-artefacts.md` §1 HG6 (Row E EXECUTED `1a8f06c`; O-17 3/3 GREEN) +
`t33-research.md §3` (THE KEYFRAMES ASSAY: the owner's named reference IS our own producer
`EasingPicker` in a right-sized seat; §3.1 the kf BG-8 division — gallery selects, picker
authors; §3.3 what W6-3 did wrong — no container ancestor, 132px canvas, regex autoplay,
duplicated SegmentedTabs; §3.4 the SEAT+DELETION spec Lane E consumed) · `w45-checkpoint/ROWS.md`
(no easing row). §0.7 carries NO easing-named row (re-checked — T-55's verb-cluster is Generate,
not easing).
**Anchors re-derived via `w1-move-map.md`**: `custom/gradient/GradientVisualizer/
GradientEasingEditor.vue` (the SEAT — closed rows, readout rail, disclosure) ·
`GradientVisualizer/easing/{EasingAuthoringStage.vue,EasingSpecimenStrip.vue,easingCatalogue.ts,
usePickerSeeds.ts,useSpecimenRows.ts}` · oracle:
`e2e/smoke/oracles/o17-easing-composition.spec.ts`. The vendor `EasingPicker` (glass-ui) is the
producer boundary — a primitive want routes to the P7 EasingPicker-v2 letter, never a demo fork.

---

## §1 Method (the O-3 probe class — live drive, real engine, dpr 2)

- **Serve**: lane-unique ports, the owner's `:9000` untouched. The pane is pure SVG/DOM (no
  WebGL on this surface, so the O-3 headed-GPU clause is N/A here — headless real-engine is
  faithful). Two independent drives: (a) the **VJS_E2E_PORT=8670** dev probe of record
  (`w8-easing-probe.mjs`, 6 cells + interaction, 2026-07-11 at the frozen tree) and (b) a
  **PERF_PORT=8671 BUILT-bundle confirm re-drive** (`w8-easing-confirm.mjs`, this filing) against
  `dist/gh-pages` (stamp 18:02 > the `69500b7` close 16:52 — tree-true), authored precisely
  because the dev probe's `parseRgb` mis-parses `oklch()` color strings (its glyph / tile-label
  contrast numbers are UNRELIABLE — see §5). The confirm probe samples COMPOSITED pixels
  (modal ground vs max-luma-distance ink) so contrast is read from what the eye sees, no
  color-space parse.
- **Cells**: 1440×900 · 768×1024 · 390×844 × light+dark; dpr 2; deep-link
  `#/gradient?space=lab&color=lab(40.39% 52.94 47.26 / 82.7%)` (the owner's §0.6 reference
  color); settle = the easing head visible + 3.2–3.4s past the overture.
- **Drive**: open row 0 → disclose the authoring stage (the sliders "Author a custom curve"
  button) → bezier handle DRAG (write-through: literal + head name + strip deselect) → close +
  reopen the accordion (the ALIVENESS law — does the custom curve survive) → tile press
  (mint-law byte-identity + overshoot viewBox morph) → steps regime flip (native controls swap)
  → copy tick → PRM (reduced motion → aspect morph neutralized).
- **Measures**: canvas box vs the seat law (`inline-size: min(100%, 19rem)` × the live
  `--vb-ratio`), the O-17 letterbox re-run live via `getScreenCTM` (the viewBox→screen truth),
  the plate↔canvas GUTTER (the "too small" / fill axis), stamp census, dot-rest, one-literal,
  and COMPOSITED contrast on the readout literal / family eyebrow / a RESTING tile portrait.
- **Frames**: `docs/tranches/T/audit/pi/w8/easing/` (gitignored PNGs on-disk, the standing
  convention): `{1440,768,390}-{light,dark}-bench.png` · `1440-light-{drag,steps}.png`.
  Instruments + logs (committed): `w8-easing-probe.mjs` + `w8-easing-probe-log.txt` (dev probe of
  record) · `w8-easing-confirm.mjs` + `w8-easing-confirm-log.txt` (the corrected-contrast confirm).

## §2 Console attest

**ZERO real console errors** across all 6 dev cells + every interaction drive (raw = 0 on the
same-origin dev seam). The BUILT confirm cells raw = 1 each = the **designed** `misconfigured`
dev-honesty error (bare loopback `127.0.0.1:8671` + unset `VITE_API_URL`, the S.W0 W0-1 contract)
— classified, not a defect; REAL = 0. Identical to the gradient/pass-7 BUILT-cell finding.

## §3 COHERENCE VERDICT

**COHERENT WITH THE DOCTRINE, WITH FILED ROWS.** The owner's T-22 "still a mess" and the T-47
"broken, too small, redesign from first principles with keyframes.js assayed directly, more
compactly" **do not reproduce against the landed Row-E seat**:

- **"broken"** — the full authoring inventory drives end-to-end with zero real console errors:
  a bezier handle drag writes through to a custom literal (`cubic-bezier(0.181, 0.23, 1, 1)`),
  the head flips to `custom`, the gallery deselects, the PRESET dropdown resets to "Pick a
  curve"; a tile press mints byte-identically (`ease-out-back` → the exact
  `cubic-bezier(0.175, 0.885, 0.32, 1.275)`) and the overshoot morphs the live viewBox; the
  steps tile swaps in the picker's native `STEPS (N)` slider + `JUMP TERM` select; copy matches
  the clipboard. The **aliveness law holds live** — an authored custom curve SURVIVES a close +
  reopen of the accordion (handles byte-identical after, `canvas persisted=true`), never
  re-seeded away.
- **"too small"** — structurally cured. The §3.3 root (132px canvas in a container-less row)
  is gone: the seat sizes the canvas to **304px** at 1440/768 and **272px** at 390 (2.1–2.3×
  the complained-of size; and larger than §3.4's own 213px target). The §3.4 zero-letterbox law
  is live-GREEN at every cell (getScreenCTM corner deltas 0.0px all four edges) across all three
  curve regimes.
- **"resemble keyframes.js … assayed directly"** — the kf BG-8 division is faithfully realized:
  closed rows are the SELECTION gallery (endpoint dots + interval-true glyph + name), the open
  row's specimen strip is the kf tile gallery at interval scale, and the picker is the AUTHORING
  half — the owner's named reference decomposed (t33-research §3.1) into our own producer
  `EasingPicker` in a right-sized seat, exactly as ratified.
- **"more compactly"** — compactness-by-deletion landed (§3.4 pt 3): the demo SegmentedTabs are
  gone (the picker owns mode — witnessed: bezier↔steps swaps the native controls), the play
  pill + the regex autoplay drive are gone (live: 0 travel dots, 0 play pills, `:playback=false`),
  and the default open row (authoring NOT yet disclosed) is ~140px (ramp 20 + strip 72 + readout
  rail ~24); the tall 590–634px state is opt-in behind the sliders button.
- **O-17 all four clauses re-run live-GREEN** at the frozen tree: zero letterbox · 0 cartoon
  stamps (the canvas plate composites `box-shadow: none` — wells seated flat, the census CC-4
  inversion cured) · dot-rest · exactly one literal leaf.

The §5 ledger files **two contrast defects the corrected drive exposed** (the readout literal
under the AA floor in LIGHT; the resting tile portraits under the graphics floor in BOTH schemes)
and **one package-bracket axis** (the desktop authoring-canvas width/alignment — the "too small"
residual after the mechanism cure, both poles as value tuples). Nothing certifies taste; nothing
contradicts a §12 ruling or a §4 retirement; the primitive-level wants are producer-packet
riders on the existing P7 letter, never a demo re-author (§6).

## §4 The attested table (owner line / doctrine → live witness → read)

| Line | Live witness (probed, not assumed) | Read |
|---|---|---|
| **T-47 "too small"** (re-judged by MEASURE) | Canvas SVG **304×364.8** @1440/768 (`inline-size: min(100%, 19rem)` cap) · **272×326.4** @390 (`min(100%,…)` → 100% fills); vs the §3.3 pre-state's 132px. Letterbox 0.0px all edges, all cells | COHERENT — "too small" structurally dead; the residual is the desktop plate GUTTER (P8-B1), a fill/size taste axis, not a mechanism |
| **T-47 "resemble kf / assayed directly"** | The kf BG-8 division live: closed rows = selection labels; open-row specimen strip = 27 family-grouped portrait tiles (css/sine/quad/cubic/expo/circ/back/steps eyebrows) minted from value.js `bezierPresets`+`steppedEase` (`easingCatalogue.ts` — never a second catalogue); the disclosed picker = the AUTHORING half. Tile press mint-law byte-identity witnessed | COHERENT (mechanism) — the owner's reference IS our own primitive, right-sized (t33-research §3.1) |
| **T-47 "more compactly"** | SegmentedTabs absent (mode swap is the picker's own — bezier PRESET dropdown ↔ steps `STEPS (N)`/`JUMP TERM`); 0 play pills, 0 travel dots, `:playback=false`; the regex autoplay drive is a removal comment only (grep: zero querySelector-on-button-text). Default open row ~140px | COHERENT — §3.4 pt 3 compactness-by-deletion landed |
| **T-22 "still a mess"** (re-judged by DRIVE) | Drag → `cubic-bezier(0.181, 0.23, 1, 1)`, head=`custom`, strip pressed=0, preset="Pick a curve"; close+reopen → custom SURVIVES (handles byte-identical, `persisted=true`); tile → byte-identical mint + viewBox morph; steps → native controls; copy → clipboard match; raw console 0 | Does NOT reproduce as a mechanism; the residuals the drive exposed are §5 P8-R1/P8-R2 (contrast) + P8-B1 (bracket) |
| **O-17** (the easing composition oracle) | Live: letterbox `{dL,dT,dR,dB}=0` × 6 cells × 3 regimes (linear/overshoot/steps) · `stamps=0` + plate `box-shadow:none` (≤1 letter, 0 designed) · `travelDots=0` · `lits=1` | COHERENT — all four clauses GREEN independently of the committed spec run |
| **D5 / D7** (plate+console gestalt; liquid easing structural) | The picker seats as a flat WELL (`bg-well` opaque, `oklab(0.913…)` L / `oklab(0.345…)` D, shadow none, backdrop none — Law 2 witnessed); the aspect-ratio morph on a regime flip rides `var(--duration-normal) var(--ease-standard)` at its own clock (PRM neutralizes it — `transition-duration=0.1s`, ramp `animation:none`) | COHERENT with D5's flat-well cut + D7's effect-channel easing |
| **D6** (ink-on-tier certified contrast) | Head label muted-fg on the head ground = **5.1–6.5:1** (pass); BUT the readout literal muted-fg on the raw atmosphere wash = **2.69–2.86:1 LIGHT** / 5.0–5.8 dark (P8-R1); resting tile portrait stroke (45%-fg mix) = **~2.6:1 both schemes** (P8-R2) | PARTIAL — the head passes; the readout + resting portraits under-serve the referent (the "consumer feeds a lie" class) → §5 |
| **Primitive seams** (producer boundary) | `EasingPicker.modelValue` is EMIT-ONLY (no `initialPoints`) — the demo's swallow-echo workaround (`usePickerSeeds.ts`) is load-bearing; the aliveness drive proves within-session custom persistence HOLDS by v-show, so the gap is latent (a fresh mount from a persisted-custom interval, unreachable in the default gradient) | COHERENT consumption; the clean fix rides the P7 letter (§6), never a demo fork |

## §5 THE ROW LEDGER (typed; anchors; zero adjective-only poles)

### P8-R1 · **LAND** — the one-literal readout under-contrasts in LIGHT: the exported curve literal sits with NO backing on the saturated atmosphere wash at ~2.7:1 (fails AA), while the plate below it is a well
- **Defect (D6 ink-on-tier)**: the readout rail's `code` (the ONE literal the one-literal law
  permits — the value the user reads AND copies) is `text-muted-foreground` on the row's
  transparent open body → the translucent pane over the owner's saturated pink atmosphere.
  Composited-pixel contrast (confirm probe): **2.69 @1440-light · 2.86 @768-light · 2.71 @390-light**
  — below even the 3:1 large-text floor, well under 4.5:1 for a value string. Scheme-asymmetric:
  dark reads **5.83 @1440 / 5.04 @390** (fine). The head label above it passes (5.1–6.5:1) only
  because it sits higher, on a lighter wash — the SAME token lies differently at two heights of
  the same pane (the D6 "every consumer feeds it a lie" class). The canvas plate directly below
  the rail IS a well (`bg-well`, opaque) — the readout is the one un-backed literal on the surface.
- **Anchors**: `GradientEasingEditor.vue:196` (the readout `code`,
  `fira-code text-mono-small text-muted-foreground`) + `.readout-rail` style block (`:195`);
  the family eyebrows (`EasingSpecimenStrip.vue` `.family-eyebrow`, opacity 0.75) are a
  co-located weaker instance of the same wash class (visibly faint in light — a soft note, not a
  second row; the tile LABELS carry the names).
- **Failure scenario**: 1440/768/390 LIGHT — a user reading `cubic-bezier(0.175, 0.885, 0.32,
  1.275)` to copy it squints; the literal is the surface's export truth and it fails AA on the
  ambient it was never contrast-checked against.
- **Cure shape (lane's call, in-bounds)**: give the readout the reservation-law backing the
  gradient pass's condition chip already uses (`bg-well/90` → 5.08:1 there) — a well behind the
  rail also visually unifies it with the canvas plate below; OR thread certified ink (the D6
  `safeAccentColor`/live-composited-lightness path) so the literal floor-clamps to ≥4.5:1 on the
  live wash. Dark is fine — the cure must not regress it (a well backing satisfies both).
- **Oracle blind spot, named**: O-17 clause 4 counts the literal leaves (exactly 1), never their
  CONTRAST — no standing oracle sees this regression. The lane's re-verify records the composited
  ratio, not only the leaf count.

### P8-R2 · **LAND** — the resting specimen portraits sit under the 3:1 graphics floor in BOTH schemes (~2.6:1); the gallery's own recognition mechanism is faint until pressed
- **Defect (WCAG 1.4.11 non-text / graphics contrast)**: unselected tile portraits stroke at
  `color-mix(in oklab, var(--foreground) 45%, transparent)`. Composited-pixel contrast of a
  resting portrait (`ease`) vs its tile well: **2.65 @1440-light · 2.61 @1440-dark · 2.66
  @768/390-light · 2.61 @390-dark** — under 3:1 in every cell, both schemes (the prior probe's
  10.13-light / 1.13-dark were `parseRgb`-on-`oklch` artifacts — see §note). The portrait gallery
  IS the redesign's thesis (recognize a curve by its shape, kf-assayed); at ~2.6:1 the resting
  shapes are hard to read and users fall back to the labels. The SELECTED tile inks up to
  `--motion-accent` (bright, clear) — only the resting field is faint.
- **Anchors**: `EasingSpecimenStrip.vue:181` (`.tile-glyph path { stroke: color-mix(in oklab,
  var(--foreground) 45%, transparent) }`); the head micro-glyph
  (`GradientEasingEditor.vue:280` — `stroke: var(--motion-accent, var(--muted-foreground))`) is
  the interval-true portrait and reads fine (accent-inked), so this row is the STRIP's resting
  field only.
- **Failure scenario**: any scheme — scanning the strip to pick a curve, the ease/in/out/back
  portraits are near-ghosts; the gallery degrades to a text menu, defeating the assay's purpose.
- **Cure shape (lane's call, in-bounds)**: raise the resting mix from 45% → ~62–65% foreground
  (one line) to clear 3:1 while staying visibly de-emphasized under the pressed-accent state; a
  scheme-aware mix if one number can't serve both grounds. The text label is the fallback, so
  this is a quality row, not a blocker.
- **Oracle note**: O-17 asserts dot-rest / stamp / letterbox / one-literal — never portrait
  legibility. No standing oracle sees it.

### P8-B1 · **BRACKET** (package axis) — the desktop authoring-canvas width + alignment: the 19rem cap left-aligns a 304px canvas in a 436px plate (119px right gutter, 13px left) while 390 fills; the "too small" residual after the mechanism cure
- **The axis**: the seat law `inline-size: min(100%, 19rem)` + `margin-inline: 0` makes the canvas
  **304px inside a 436px plate at 1440/768 → gutterL 13px / gutterR 119px** (asymmetric dead
  well to the right — measured, both drives). At 390 the same law resolves to 100% → **272px in a
  298px plate, gutterL 13 / gutterR 13** (fills, symmetric). So the desktop canvas is both
  smaller than its plate AND left-biased. The owner's word was "too small"; the cure took the
  canvas to 304px (right-sized per §3.4) but the residual "how big / how placed on desktop" is a
  taste call, not a pass's.
- **Pole A (the landed default)**: `inline-size: min(100%, 19rem)` · `margin-inline: 0` →
  304px, left-aligned, 119px right gutter. Rationale: 19rem is §3.4's "right-sized" (exceeds its
  own 213px target) and caps the canvas from growing unbounded on a wide pane. Reproducible:
  `EasingAuthoringStage.vue:118,121` @ `5e4f1f6` + `pi/w8/easing/1440-light-bench.png`.
- **Pole B (centered, same size)**: `margin-inline: auto` → 304px centered, ~66px each side —
  kills the "looks-like-a-layout-bug" asymmetry with zero size change; one property.
- **Pole C (fill the plate)**: raise/drop the 19rem cap → canvas = plate content width (~410px
  @1440), zero gutter, matching the 390 fill behavior — the biggest canvas, most directly
  answering "too small". Cost: the canvas tracks pane width (no upper bound). One constant.
- **Indexed to**: T-47 "too small" / "more compactly" — the size/placement half after this
  pass's mechanism re-judge. Adjacent to O-17 (letterbox is settled and is NOT this axis — this
  axis is the canvas's SHARE of its plate, not its aspect).
- **No default change filed** — pole A stands; the package presents all three arms; the owner rules.

### §note — the prior probe's `oklch()` contrast artifacts (why the confirm re-drive was authored)
`w8-easing-probe.mjs` reads ink via `getComputedStyle(...).color`/`stroke` + `parseRgb` (a
number-extractor). For the glyph strokes and the SELECTED tile label, `getComputedStyle` returns
`oklch(0.785 0.134 205)` (not `rgb()`), so `parseRgb` yields `[0.785, 0.134, 205]` and the WCAG
math runs on garbage — its `headGlyph`/`tileLabel`/`tileGlyphResting` numbers (10.13-light,
1.13-dark, etc.) are void. The text-`color` inks that DO resolve to `rgb()` (headLabel, eyebrow,
railCode) are trustworthy in both logs and agree. The confirm probe (`w8-easing-confirm.mjs`)
avoids the class entirely by sampling composited pixels; §5's numbers are its.

## §6 Routing + loop state

- **Zero rows contradict a §12 ruling or a §4 retirement; nothing routes OWNER as a conflict**
  (P8-R1/R2 are additive contrast fixes to the ratified seat; P8-B1 PRESENTS — never re-cuts —
  the §3.4 seat law).
- **Zero producer rows in the demo queue.** The primitive-level wants the drive confirmed are the
  KNOWN P7 `EasingPicker-v2` riders and stay on that letter, NOT a demo re-author of the picker
  (§File-bounds — the vendor tree is out of bounds): (a) **`initialPoints` seed + write-through
  `modelValue`** — the emit-only seam forces the demo's `usePickerSeeds` swallow-echo workaround;
  the aliveness drive proves within-session persistence holds by v-show, so the gap is latent
  (unreachable in the default gradient) — a rider, not a demo defect; (b) the **`compact` density
  arm** (§3.4 pt 5) is **UNNEEDED** — measured: the 390 canvas is 272px with zero overflow, the
  seat fix alone sufficed exactly as §3.4 predicted; record it discharged, do NOT add the arm.
- **remediation_1 shared-file map** (single-writer keyed on the FILE): P8-R1 anchors
  `GradientEasingEditor.vue`; P8-R2 anchors `EasingSpecimenStrip.vue`; P8-B1 (a bracket, presented
  not landed) anchors `EasingAuthoringStage.vue` — three DISJOINT easing files, none shared with
  any other pass (pass 7/gradient scoped the easing accordion OUT; pass 6 owns `style.css`), so
  **ONE easing lane, one writer** lands R1+R2 safely. If R1's lane brushes a contrast leg into
  O-17, it tightens (a readout-contrast clause), never weakens.
- **Loop state**: pass_1 filed → remediation_1 (P8-R1 + P8-R2) → pass_2 re-judges the composited
  contrast + re-reads P8-B1's frames; ≤3 per surface, then route by class (taste → package
  bracket · defect → booked row · producer-rooted → the P7 letter — RF-8).
- **Console/oracle state carried**: O-17 4/4 clauses reproduce live at 6 cells × 3 regimes; no
  EXPECTED-RED touches this surface; the one BUILT-cell console line is the designed
  `misconfigured` dev-honesty error (S.W0 W0-1), classified.
