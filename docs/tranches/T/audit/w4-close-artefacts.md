# T.W4 — CLOSE ARTEFACTS (the round-3 gate, consolidated)

**Wave**: T.W4 — THE PICKER RECOMPOSITION (the C1 knot — ONE serial writer over the knot set in
the forced order W4-1 → W4-2a → W4-2b → W4-5 → W4-4+W4-3 → W4-7 → cap-cure; W4-6 the one
file-disjoint display-voice sweep).
**Closed**: 2026-07-10, branch `tranche-t` (knot merged at `26a08ce`; the W4-6 sweep at `388c4a9`;
close head `388c4a9`).
**Verdict**: **`complete_with_misses`** — the round-3 CLOSE gate re-ran the 9-row `T.W4.md §Hard
gate` and returned **8 PASS + 1 MISS-RECORDED, zero FAIL**. The lone MISS is row 9's PI-1
Lighthouse W4 delta row — NOT yet in `audit/pi1-delta-ledger.md` (only W0/W1/W2/W2-W3-CI rows
present); it is the integrator's honestly-deferred post-push CI stamp (the ledger's same-instrument
discipline is a CI run, and W4 is **not** a named Q14 gate row — only W2/W7/W9 are — so its absence
does not RED the wave). Every §Hard-gate row 1–8 CERTIFIED PASS by an independent re-run of every
oracle mint at lane-unique ports (`VJS_E2E_PORT=8494` / `VJS_E2E_PERF_PORT=8495` — distinct from the
integrator's 8490/8491, the owner's :9000 untouched).
**Governing law**: `RATIFICATION-2026-07-09.md §0` verbatim wins (Q11a ladder-authority ×φ = two
token steps · Q3 "Flush." `--blob-seat: 0` · Q4 "The well." · Q5 letterform ramp ×2 sites · Q6
"both." → T.W4.5) → `MANDATE-2026-07-06.md §0` + addenda, **§0.5 = the 2026-07-10 owner findings
T-30/T-31/T-32** → `SYNTHESIS.md` as-hardened §3 (T.W4) + §6.1/§6.2 → `waves/T.W4.md`, with EVERY
anchor re-derived against `audit/w1-move-map.md` (PP-11 — the knot set resolved to
`color-picker/ColorPicker.vue`, `display/ColorComponentDisplay/*`, `controls/ComponentSliders/*`,
`panes/PaneHeader.vue` [geometry only], `visual/HeroBlob.vue`, `display/ColorSpaceSelector.vue`, +
the `index.html` font hunk).
**This doc consolidates**: the 9 §Hard-gate rows + verdict + evidence **verbatim from the round-3
close gate** (§1) + the `_with_misses` basis (§2) + the gates INDEPENDENTLY re-run at round-3 (§3) +
the O-10 / O-12 census tables (§4) + the T-30 blur-forensic verdict + rider dispositions (§5) + the
forced-order commit map (§6) + the booked swaps P5/P6/P3/P10 carried (§7) + the CSS gz + PI-1 state
(§8) + the grep captures (§9) + the verification-artefacts index (§10). The lane record is
`audit/w4-knot-lane-record.md` (the 7 forced-order commits, the knot's own gate evidence, the T-30
dispositions, the books); **this doc is the round-3 gate adjudication over it.**

---

## §1 — The 9-row §Hard gate (verbatim: each gate row + verdict + evidence, from the round-3 close gate)

> **1. W4-1**: O-10a host-independence census — the trigger's computed family/style/size/WEIGHT
> identical across hosts (host-divergence itself is the red condition; the About-700 inheritance
> bug dead by construction); the height gate vs `--content-max-h` @900px; the mobile matrix (About =
> honest 2-line <sm; phones floor-pinned = deliberate no-op).

**PASS** — I RAN `o10-type-locks.spec.ts` **12/12 green** (`VJS_E2E_PORT=8494`). Host-independence:
picker `.space-trigger` & About trigger byte-identical family (Fraunces) / style (italic) / weight
(400); picker size ≡ `--type-display-3`, pane title ≡ `--type-display-1`, both weight 400. Tokens
are PRODUCER-owned (glass-ui `scale.css`: heading = 1.618rem φ, display-1 clamp cap 2.618rem φ²,
display-3 φ³) — the demo does NOT redefine them; no ×1.5 / calc mint. The ladder is ×φ = two token
steps (display-1 → display-3). `PaneHeader.vue:101` `font-size:var(--type-display-1)`, `:104`
weight `var(--type-weight-display)` = 400 (`:root` pin). The compositor shrink =
`tan(atan2(--type-heading,--type-display-1))` closed-form endpoints, NO font-size keyframe. Height
gate @900px green (no console scroll). Mobile @390: display-1 == heading floor-pin no-op, About
honest 2-line lock.

> **2. W4-2**: O-10b per-space line-count locks (all 17+hex @32rem + 390 — "every space inks its own
> locked line count", the re-authored gate text; Q11 levers 1+2, lever 3 for lab-class; lever 1
> REQUIRED at 390) + O-10c tnum equal digit-advance on the SHIPPED face (the self-host regression
> class); the reservation re-scope landed FIRST (phone band).

**PASS** — o10 tests 4/5/6 green. **O-10b**: the full shipped catalog driven through the app's OWN
selector at 1440 and 390 — every space rendered ≤ lock, min-height ≡ lock × line-height, zero
horizontal overflow. **O-10c**: rendered digit-advance equal at w300 AND w600 on the shipped face
(147.41px both weights) — the tnum MINTED via `scripts/fonts/build-fraunces-tnum.py` (the F5 no-op
premise REFUTED on the artifact: no shipped Fraunces build carries tabular figures), prose stays
proportional (> 2px delta). The forced order held: W4-2a reservation re-scope (`529bbbc`, per-cell
`ch` floors die → line-level lock) landed BEFORE W4-2b tuple + tnum (`79787ef`).

> **3. W4-3**: live meter present per row (from `COLOR_MODEL_KEY`, zero new state); static ranges
> retired to their two owners; the hover tooltip dead; the meter's ink at its O-18 rung.

**PASS** — `ComponentSliders.vue`: a `channel-meter` span per component bound to `meterText()`
reading `COLOR_MODEL_KEY` (the SAME formatted cell the header tuple consumes — zero new state,
injected `:96`). Static range captions retired to the rail tooltip + the About card (source comments
`:26-27`, `:120-121`); the hover-jailed thumb tooltip DEAD (`:28`, `:121`). Meter ink certified at
the O-18 rung (o18 W4 rows green, §1 row 4). No standalone live meter-presence e2e mint, but
structurally confirmed + the console-well renders live (O-18 `.channel-rail-item` drove it green) and
the live-value pipeline is proven by reactivity + O-10b's 17-space drive.

> **4. W4-4**: O-18 green over the console population (letters, meters, captions on the WELL ground —
> the W3-5 contract, fed the console's tier lightness); **ONE active indicator** (the WatercolorDot
> ring stays the ONE live-color voice); a11y roving-tabindex verbatim; touch rung ≥44px hits <lg;
> the interim ring is the seal recipe turned portrait (P5 swap booked).

**PASS** — `o18-contrast-census.spec.ts` **22/22 both schemes** incl. the 3 W4 rows (readout
fracs/units/commas, channel letters on the console well, ConfigSliderPane Atmosphere config-slider
rows) all ≥ 4.5:1. **ONE active indicator** = WatercolorDot (`ConsoleRail.vue:38`, `:245`; the
`aria-selected` neutral pill retired). Roving tabindex verbatim WAI-ARIA tablist (`:156`, `:30`
`aria-selected`, `:31` `railTabIndex`). Touch rung ≥44px via producer `--dock-touch-target` 2.75rem
(`:239-240`). The interim ring rides the SEAL recipe verbatim — `color-mix(in oklab,var(--accent-view)
60%,transparent)`, stadium, "NEVER a bespoke ring class" + the T-28 register law (`:199-206`).
ConsoleRail lifted to its own file (266 LoC, the P5 swap seam).

> **5. W4-5**: the **O-12 set** green — seat containment identity (orbit-reach ≤ 0.5 + `--blob-seat`
> resolve) · occlusion (`elementFromPoint` never dock) · hover-mood frame-diff floor · hover-active
> frame budget (the NEW state, ungated today) · mobile width bound COMPUTED from the seat formula ·
> ONE timing fixture replacing the three duplicating specs — **PI-4's same-commit law**; the ink
> floor **∈ [0.12, 0.20] OKLab L, default 0.15**, closed-form inside the 12ms drag headroom (PI-3,
> measured); the hover-mood floor ≥6/255 within 400ms + hover-active p50 ≤20ms.

**PASS** — `o12-blob-seat` **3/3** + `blob-presence-mobile` **1/1** green. Seat identity:
`--blob-seat` resolves 0 (Q3 Flush), the wrapper wholly ⊂ card, width ≡ `seatFootprintPx`. Occlusion:
`elementFromPoint` across the bead arc never the dock. Hover-mood: mean abs frame diff **12.16/255**
≥ 6 within 400ms (the lane's own re-run read 11.99/255 — both independently ≥ the floor). Mobile
bound COMPUTED from the formula: canvas 179.2px ≡ formula 179.2 exactly at 390, scrollWidth == 390,
parkΔ = 0. **PI-4 same-commit LAW VERIFIED in git** — `dfd76b1` carries the `--blob-fp` formula
(`ColorPicker.vue`) + `blob-presence-mobile.spec.ts` + the o12 mint + the ONE `blob-timing.ts` fixture
TOGETHER. Ink floor 0.15 ∈ [0.12,0.20] closed-form (`HeroBlob.vue:111-133` "iterative solve forbidden
… two branches zero iteration"), measured **0.28µs/derive** (PI-3, 42,857× inside the 12ms headroom).
NOTE: hover-active p50 & idle p50 ran under the SANCTIONED SwiftShader / SOFTWARE-GL hang-guard leg
(33.2ms / 16.6ms) — the ≤20ms / ≤13ms real-GPU assertions ride real hardware (the same headed-GPU env
class W2 sanctioned); the test itself green.

> **6. W4-6**: O-10d display-voice family census green over EVERY title surface (population, not the
> one card); rename-input/line-clamp re-verified under the serif.

**PASS** — `o10d-display-voice-census.spec.ts` **6/6** green. Every visible h1/h2/h3 across the
7-view walk + the picker title speaks Fraunces; user-data names (browse wall) Fraunces weight ≤500
font-style NORMAL; line-clamp re-verified under the serif (desktop `sm:line-clamp-1`, 390
`line-clamp-2`); gated surfaces (FlagReport dialog, VersionHistory drawer, hover-card titles)
censused OPEN; the rename-input morph round-trips serif → input → serif; the MigratePalettesDialog
source register row. W4-6 landed as merge `388c4a9` (the display-voice population sweep —
`text-subheading`-as-title sites → Fraunces).

> **7. W4-7**: O-11 gates 1+3 re-run green over the settled post-W2 field (rest floor re-judged in
> the Q9 EFFECT bracket — **27–39% added card material**; gate 3's ink-contrast floor referent = the
> D6/O-18 certified rung; no double-exposure against the taller band); the earn-range keyed to
> OCCLUSION, not the shrink.

**PASS** — `o11-header-gates.spec.ts` **22/22** green — all 6 gates × light + dark. Gate 1 rest veil
∈ [0.45,0.65] on every reachable pane both schemes (landed 0.52 → 33.8%L / 37.4%D added material,
inside the ratified [27%,39%] EFFECT bracket). Gate 3 swell completes ≤64px, ≥0.85 by 48px, no
double-exposure under the earliest colliders (About/Gradient). The earn-range keyed to OCCLUSION
(0–64px), the PaneHeader MATERIAL UNTOUCHED (geometry only — W3-4's settled surface). Gates 2/4/5/6
also green.

> **8. The CSS tripwire** [AMENDED-AT-PASS-2]: CSS gz re-measured at this gate; **>120 KiB REDS the
> wave** (the type recalibration is a named spender).

**PASS** — re-measured on the built gh-pages tree: `dist/gh-pages/assets/index-BSGyXtu5.css` raw
534,466 B, **gz = 88,840 B = 86.75 KiB ≤ 120 KiB** (33+ KiB headroom). Instrument-variance note (for
the record, immaterial): my local `gzip -9` reads 88,840 B; the knot record cites 89,490 B; the
integrator cites 89,581 B (post-sweep +91 B Fraunces edits) — the ~650 B spread is instrument only,
all three comfortably under the 120 KiB tripwire. The definitive CI-instrument number lands with the
deferred PI-1 W4 stamp (§8 / row 9). Growth vs the W3 close (86.6→86.75 KiB) = the type
recalibration + tnum face, a named controlled spender.

> **9. PP-8 repo-wide sweep · PI-1 Lighthouse delta recorded · `npm run lint` 0 · `npm run typecheck`
> 0 · `npm test` green · e2e green (incl. the O-10/O-12 mints + the centralized timing fixture) ·
> clean `git status`.**

**MISS-RECORDED** — all mechanical sweeps GREEN EXCEPT the PI-1 Lighthouse W4 ledger row (below):
**lint** exit 0 (`--max-warnings=0` clean); **typecheck** exit 0 (tsconfig.lib + tsconfig.demo,
vue-tsc); **vitest 2192/71** passed; **PP-8** clean (zero `demo/` non-`ui/` files > 400 LoC; the knot
files ConsoleRail 266 / ComponentSliders 274 / ColorPicker 378 / HeroBlob 297); `git status` clean;
the tool-artefact grep over the wave doc + knot record + this doc EMPTY. W4 oracle e2e mints ALL
directly green (O-10a-d / O-11 / O-12 / O-18 / blob-presence-mobile). **THE MISS**: the PI-1
Lighthouse W4 delta row is NOT in `audit/pi1-delta-ledger.md` (only W0 / W1 / W2 / W2-W3-CI rows) —
it is the integrator's honestly-deferred post-push CI stamp (`ci.yml` triggers on master-push / PR /
`workflow_dispatch`, NOT a `tranche-t` push, so the Lighthouse run needs a manual
`gh workflow run ci.yml --ref tranche-t`). **W4 is NOT a named Q14 gate row** (only W2/W7/W9 are), so
the absence does NOT RED the wave — it is an honestly-deferred recording obligation stamped post-push
from CI. Also recorded: the full 6-project e2e suite was not locally re-driven WHOLE (the W4 oracle
subset — which ARE gate rows 1–7 — was, all green); full-suite green rests on the knot record (101
pass / 2 O-3 skip / 1 standing gradient-drag flake) + the integrator (smoke 53/53).

---

## §2 — The `_with_misses` basis (the one MISS-RECORDED row + the recorded non-gate items)

The 9-row gate returned **8 PASS + 1 MISS-RECORDED, zero FAIL**. The `_with_misses` qualifier is the
lone honestly-deferred recording obligation, plus two recorded non-downgrading items:

- **THE MISS — the PI-1 Lighthouse W4 delta row (deferred, not lost)**. The ledger
  (`audit/pi1-delta-ledger.md`) carries W0 / W1 / W2 / W2-W3-CI rows; the W4 row is absent because
  the ledger's SAME-INSTRUMENT discipline is a CI run and `ci.yml` does not trigger on a `tranche-t`
  push (master-push / PR / `workflow_dispatch` only). This docs push carries the branch to origin
  (discharging the "12-ahead / unpushed" precondition), but the Lighthouse row still requires the
  integrator's manual `workflow_dispatch` (completion-brief step 3) → then the W4 row appends (LCP /
  TBT median + 3-sample spread, signed Δ vs the `28836873580` baseline). **Expectation: NOISE**
  (PP-10, <30%) — render-blocking CSS +267→+358 B, the eager JS chunk graph UNTOUCHED, the tnum face
  +124 B woff2 is LCP/TBT-neutral. **W4 is not a named Q14 gate row** (only W2/W7/W9 adjudicate the
  budgets), so the deferred stamp does not downgrade below CLOSE.

- **(non-gate) The full 6-project suite not locally re-driven WHOLE** in this verifier pass — the
  W4-specific oracle mints (which ARE gate rows 1–7) WERE directly re-run green
  (`VJS_E2E_PORT=8494` / `VJS_E2E_PERF_PORT=8495`); the full-suite green rests on the knot lane
  record (101 pass / 2 O-3 headed-GPU skip / 1 standing `views/gradient.spec.ts` drag flake) + the
  integrator's smoke 53/53.

- **(non-gate) The SwiftShader / SOFTWARE-GL hang-guard leg** — o12·4 hover-active p50 & the blob-390
  idle p50 ran under software GL, so the ≤20ms / ≤13ms real-GPU assertions ran under the sanctioned
  hang-guard leg (the headed-GPU env class W2 already recorded); the tests passed their applicable
  legs.

None downgrades below CLOSE — 8 hard-gate rows PASS, zero FAIL; the lone MISS is an honest deferred
record on a non-Q14-gate wave.

---

## §3 — Gates INDEPENDENTLY re-run at round-3 (not the lane's word)

The round-3 CLOSE gate re-RAN every W4 oracle mint at lane-unique ports (`VJS_E2E_PORT=8494` /
`VJS_E2E_PERF_PORT=8495` — distinct from the integrator's 8490/8491; the owner's :9000 untouched) and
re-measured the tripwire. Oracle tallies (independent, this pass):

| Oracle | Spec | Tally |
|---|---|---|
| O-10a/e | `oracles/o10-type-locks.spec.ts` | **12/12** |
| O-10d | `oracles/o10d-display-voice-census.spec.ts` | **6/6** |
| O-11 | `oracles/o11-header-gates.spec.ts` | **22/22** (6 gates × light+dark) |
| O-18 | `oracles/o18-contrast-census.spec.ts` | **22/22** (both schemes, incl. the 3 W4 rows) |
| O-12 | `oracles/o12-blob-seat.spec.ts` | **3/3** |
| blob-390 | `mobile/blob-presence-mobile.spec.ts` | **1/1** |

Static gates re-run: **lint 0** · **typecheck 0** (tsconfig.lib + tsconfig.demo, vue-tsc) · **vitest
2192/71** · CSS gz **88,840 B = 86.75 KiB ≤ 120**. The **PI-4 same-commit LAW** was verified in git
history (not on the lane's word): `dfd76b1` (W4-5) contains the `--blob-fp` seat formula, the
re-derived mobile gate (`blob-presence-mobile.spec.ts`), the o12 mint, AND the ONE `blob-timing.ts`
fixture in a SINGLE commit. The forced order was also verified in git: W4-2a re-scope (`529bbbc`)
precedes W4-2b tuple + tnum (`79787ef`); the full chain W4-1 (`b16eb07`) → W4-2a → W4-2b → W4-5
(`dfd76b1`) → W4-4+3 (`f991554`) → W4-7 (`3c79556`) → cap-cure (`be155e1`) holds.

---

## §4 — The O-10 / O-12 census tables (the wave's own certification records)

### O-10 (D2 · Q11a) — the ×φ type-lock census

| Leg | What it asserts | Result |
|---|---|---|
| **O-10a** host-independence | picker `.space-trigger` & About trigger byte-identical family (Fraunces) / style (italic) / weight (400); picker size ≡ `--type-display-3`, pane title ≡ `--type-display-1`; the About-700 inheritance bug dead by construction (weight 400 on each surface's OWN class list) | **PASS** (12/12) |
| **O-10a** height gate @900px | no console scroll at 1440×900 vs `--content-max-h`; never escalated | **PASS** |
| **O-10a** mobile matrix @390 | display-1 == heading floor-pin no-op (deliberate); About = honest 2-line lock <sm | **PASS** |
| **O-10b** per-space line locks | full shipped catalog (17 spaces + hex) driven through the app's OWN selector @1440 + @390 — every space rendered ≤ lock, min-height ≡ lock × line-height, zero horizontal overflow; reservation re-scope landed FIRST (`529bbbc`) | **PASS** (test 4/5) |
| **O-10c** tnum digit-advance | rendered digit-advance EQUAL at w300 AND w600 on the SHIPPED face (147.41px both), tnum MINTED via `scripts/fonts/build-fraunces-tnum.py` (the F5 no-op refuted on the artifact); prose stays proportional (>2px delta) | **PASS** (test 6) |
| **O-10d** display-voice family census | every visible h1/h2/h3 across the 7-view walk + picker title = Fraunces; user-data names Fraunces weight ≤500 style NORMAL; line-clamp under serif (sm:line-clamp-1 / 390 line-clamp-2); gated surfaces censused open; rename-input morph round-trips serif→input→serif | **PASS** (6/6) |

D2 exact-token discipline: the title landings CONSUME producer-owned glass-ui ladder tokens
(`--type-display-3` / `-1` / heading; weight via `--type-weight-display: 400` `:root` pin); ZERO
demo-minted font-sizes; no literal ×1.5 / ×φ multiply. The readout uses
`min(var(--type-display-4),max(11.65cqi,2.618rem)) × --readout-fit` — the ratified Q11b lever-2 fluid
display-4-class rung, judged by O-10b line-lock + O-10c digit-advance (both green), NOT the title
exact-token census.

### O-12 (D8 · Q3 · PI-3/PI-4) — the blob-seat census

| Leg | What it asserts | Result |
|---|---|---|
| **seat identity** | `--blob-seat` resolves 0 (Q3 Flush); the wrapper wholly ⊂ card; width ≡ `seatFootprintPx` | **PASS** |
| **occlusion** | `elementFromPoint` across the bead arc never the dock | **PASS** |
| **hover-mood** | mean abs frame diff **12.16/255 ≥ 6** within 400ms (lane re-run 11.99/255 — both ≥ floor) | **PASS** |
| **hover-active p50** | real-GPU ≤20ms assertion; ran under the sanctioned SwiftShader hang-guard leg (33.2ms) — applicable leg green | **PASS** (env-honest) |
| **mobile width bound** | COMPUTED from the formula: canvas 179.2px ≡ formula 179.2 exactly @390; scrollWidth == 390; parkΔ = 0 | **PASS** (1/1) |
| **ONE timing fixture** | `e2e/smoke/fixtures/blob-timing.ts` replaces the 3-file hand-sync — in the SAME commit as the formula (PI-4) | **PASS** |
| **ink floor** | 0.15 ∈ [0.12,0.20] OKLab L, closed-form (two branches, zero iteration); measured **0.28µs/derive** (PI-3, 42,857× inside the 12ms drag headroom; drag canary green) | **PASS** |

**PI-4 same-commit law**: VERIFIED in git — `dfd76b1` carries the `--blob-fp` seat formula
(`ColorPicker.vue`) + `blob-presence-mobile.spec.ts` + the o12 mint + the ONE `blob-timing.ts` fixture
together. A formula/gate split across two commits would be a partial-fire to re-drive; it held.

---

## §5 — The T-30 blur-forensic verdict + owner-rider dispositions (MANDATE §0.5, PRE-round-2 findings)

The 2026-07-10 owner findings (`MANDATE §0.5`, audited PRE-round-2 at the W1-close head `c63f9aa`)
route the seat rider through W4-5; **T.W4.5 re-judges all three against the landed round-2 state.**

- **T-30 CENTRE-WARD (delivered by containment)** — the bead moves from half-off-card (overlapping
  the About seam at the W1 head, "far too much in the top right corner") to WHOLLY INSIDE the plate's
  title band (edge 0.24·fp ≈ 27px inside both edges), contact-shadow seated, "more deftly and
  naturally integrated into the card." `--blob-seat` STAYS 0 (Q3 "Flush." verbatim — the ruling
  stands; the seat POSITION + card-integration is the new axis, NOT the seat-inset re-litigated). The
  knob's positive domain is the W4.5 taste axis. **Re-judged at T.W4.5.**

- **T-30 THE BLUR FORENSIC** (demo-root cures here, producer-root → the P6 packet rider) —
  **demo-root CLEARED by measurement**: the canvas backing store = gBCR × `resolveBudgetDpr` (ratio
  **1.99** at dpr2, full-res), ZERO CSS filter on the canvas chain, the demo quality rung `full` at
  lg. **Producer-root cites for the P6 packet rider**: the silhouette AA is ~1px fwidth-derived
  (`goo-blob/shaders/metaball.frag.ts:315-318` — NOT the cause); the softness is the engine's
  hero-scale INTERIOR shading (featureless at ⌀≥90px — the row-A legibility family) + the wrapper's
  resting drop-shadow halo (`0 4px 14px` + `0 1px 3px` reads as focus blur at hero scale). **Route**:
  append to P6 at the next letter touch (the letter is DISPATCHED; the rider rides W7's verify-at-cut
  walk).

- **T-31 / T-32 (not this wave's rows, recorded for the routing trace)** — T-31 (the dock-atop layout
  law) → T.W6 Lane D (Fable design lane, band layout, never z-index patching); T-32 (aurora zones
  configurable — YES) → the W2-5 calibration knob inside the T-26 bracket (landed at W2 close). Both
  are re-judged at T.W4.5 alongside T-30.

---

## §6 — The forced-order commit map (the C1 knot, single-writer + the W4-6 disjoint sweep)

**Knot lane** (`t-w4-picker`, cut from the round-2-closed head `2162122`; merged at `26a08ce`):

| Step | Commit | Item |
|---|---|---|
| W4-1 | `b16eb07` | Titles ×φ non-bold — picker display-3 · pane display-1 · weight-400 `:root` pin on each surface's OWN class list (About-700 bug dead); compositor shrink-ratio endpoints re-targeted CLOSED-FORM; em-relative caret/underline; O-10a/e minted + @900 height gate + 390 matrix |
| W4-2a | `529bbbc` | The reservation RE-SCOPE (the phone-band precondition) — per-cell `ch` floors DIE, cells intrinsic, line-level lock only; Q11b lever 1 (integer least-counts, lab 1-decimal) |
| W4-2b | `79787ef` | The contiguous tuple at ×φ (display-4-class cqi rung) + **THE TNUM MINT** (`scripts/fonts/build-fraunces-tnum.py`; equal advance 147.41px w300+w600); O-10b + O-10c census |
| W4-5 | `dfd76b1` | THE SEAT (PI-4 same-commit) — `--blob-fp: clamp(7rem,22cqi,11rem)` ONE formula; flush `--blob-seat: 0` (Q3); `--z-ornament` (Q3b); contact-shadow depth; ink floor 0.15 closed-form (0.28µs/derive, PI-3); the ONE `blob-timing.ts` fixture; blob-presence-mobile COMPUTED from the formula; O-12 minted |
| W4-4+3 | `f991554` | THE CONSOLE — rung-2 WELL (`.console-well`, Q4/C5), chassis-persistence, ink letters (TRUE glyphs `L a b α`), seal-recipe rail ring (P5 booked), WatercolorDot = the ONE active indicator, touch rung ≥44 <lg; W4-3 channel strip (live meter from the SAME formatted cell, zero new state; static ranges retired; thumb tooltip dead); readout-frac guard-then-alpha CURE; POPULATION CLAUSE → ConfigSliderPane; the 3 O-18 fixme rows FLIPPED LIVE (6/6) |
| W4-7 | `3c79556` | Veil geometry re-derived vs the ×φ band — earn-range keyed to OCCLUSION (0–64px HOLDS); MATERIAL untouched; O-11 gates 1+2(+both schemes)+3 re-run GREEN over the settled field |
| PP-8 | `be155e1` | Cap cure — ConsoleRail.vue lift (the P5 seam) + seat.css grammar sheet (the overture.css precedent); 521/453 → 274+266/378 |
| (docs) | `7d6c86a` | The knot lane record (`audit/w4-knot-lane-record.md`) |

**W4-6 disjoint sweep** (file-disjoint from the knot; merged at `388c4a9`):

| Commit | Item |
|---|---|
| `6705a52` | The display-voice population sweep (T-15/F7) — every `text-subheading`-as-title site joins Fraunces |
| `b7f927b` | The O-10d display-voice family census MINT — the population gate over every title surface |
| `388c4a9` | **merge(T.W4 · W4-6)** — the display-voice population sweep |

**Knot merge**: `26a08ce` (**merge(T.W4 · knot)** — W4-1..W4-5 + W4-7 forced order, PI-4 same-commit
held). Close head: `388c4a9`.

---

## §7 — The booked swaps carried (books, never gates)

- **P5 letter-rail swap** — the interim ring = the seal recipe VERBATIM
  (`color-mix(in oklab,var(--accent-view) 60%,transparent)`, stadium, T-28 register law), now
  ISOLATED in `ConsoleRail.vue` (the swap touches ONE file). Fires when P5 lands (S-3 upgraded to
  MANDATED by T-5; do not wait on the book).
- **P6 `settled` seam** — the park stays wall-clock (the ONE `blob-timing.ts` fixture carries the
  constants); **+ the NEW blur-forensic producer-root rider** (§5) rides P6 at the next letter touch
  / W7's verify-at-cut walk.
- **P3 `.glass-well`** — `.console-well` (style.css) is the one-home interim for BOTH slider
  populations (the picker channel strip + ConfigSliderPane).
- **P10 type stations** — `--type-weight-display: 400` pinned at `:root`; the trigger's display-3
  carried in its own scoped block (exact token). The token consume fires when P10 answers
  (verify-first — the rung may exist).
- **F9.R1 `lightnessFloor`** — the demo ink floor (0.15) is its sizing spec; swaps at W7.
- **α glyph face note (W4.5 eye item)** — Fraunces carries no Greek; the rail's `α` inks in the
  metric-tuned fallback face (deliberate, tuned; judged at the checkpoint).
- **About title at ≥1440 inks a balanced 2-line** — a W4.5 eye item, not a gate (no O-10 row asserts
  a 1-line About at desktop).
- **T-28 register law** — encoded here as the ring prohibition (any future ring rides the dot's own
  silhouette or does not exist); the abrogation itself is W6-7's.

---

## §8 — CSS gz + PI-1 state

- **CSS tripwire**: `dist/gh-pages/assets/index-BSGyXtu5.css` raw 534,466 B, **gz 88,840 B = 86.75
  KiB ≤ 120 KiB** (33+ KiB headroom). Instrument variance (immaterial): knot 89,490 B / integrator
  89,581 B / this pass 88,840 B — all far under the tripwire. The type recalibration + tnum face is
  the named controlled spender (86.6→86.75 KiB vs the W3 close).
- **PI-1 (the Q14 tracking instrument)** — the wave carries no LHCI binary (the ledger's
  SAME-INSTRUMENT discipline is the CI run; the W1/W3 precedent). The wave's measured payload delta:
  render-blocking CSS **+267 B gz** (89,223 → 89,490; the type recalibration spend); the eager JS
  chunk graph UNTOUCHED (zero new eager imports — ConsoleRail / seat.css are intra-chunk moves; the
  blob stays the deferred async chunk); the tnum face +124 B woff2 (a preloaded asset, LCP/TBT-neutral).
  **Expectation: NOISE** vs the `28836873580` baseline. **The W4 ledger row stamps from a manual
  `workflow_dispatch` CI run post-push** (§2 THE MISS; row 9) — deferred, not lost; W4 is not a named
  Q14 gate (only W2/W7/W9 adjudicate budgets).

---

## §9 — Grep captures (the gate's own predicates, re-run at round-3)

- **PP-8 caps** — no `demo/` non-`ui/` file > 400 LoC; the knot files ConsoleRail **266** /
  ComponentSliders **274** / ColorPicker **378** / HeroBlob **297** (PaletteCard at the W3-close 400
  state, untouched by this wave).
- **casts** — `src` **8**/0 · `api` **1**/0 (the standing ledger; no new demo casts).
- **tool-artefact grep** (`grep -rnE '</?(content|invoke|parameter|antml)'` over the W4 wave doc +
  the knot record + this doc) = **CLEAN**.
- **`git diff --check`** (whitespace/conflict-marker sweep on the staged close) = **CLEAN**.
- **`git status --porcelain`** — empty at close (the knot + W4-6 lanes merged).

---

## §10 — Verification-artefacts index (cited at close, per `T.W4.md §Verification artefacts`)

- **The knot lane record** (the 7 forced-order commits, the knot's own §Hard-gate evidence, the T-30
  dispositions, the books, the PI-1 payload delta): `audit/w4-knot-lane-record.md`.
- **The oracle mints**: `e2e/smoke/oracles/o10-type-locks.spec.ts` ·
  `e2e/smoke/oracles/o10d-display-voice-census.spec.ts` · `e2e/smoke/oracles/o11-header-gates.spec.ts`
  · `e2e/smoke/oracles/o18-contrast-census.spec.ts` · `e2e/smoke/oracles/o12-blob-seat.spec.ts` ·
  `e2e/smoke/mobile/blob-presence-mobile.spec.ts`; the ONE timing fixture
  `e2e/smoke/fixtures/blob-timing.ts`.
- **The tnum mint script**: `scripts/fonts/build-fraunces-tnum.py` (the F5-no-op refutation — the
  self-cut tabular face; O-10c depends on it).
- **The CSS tripwire measurement**: §1 row 8 / §8 (`index-BSGyXtu5.css` gz = 88,840 B = 86.75 KiB ≤
  120).
- **The PI-1 W4 delta row**: DEFERRED to the post-push `workflow_dispatch` CI stamp (`pi1-delta-ledger.md`
  — the W4 row appends signed Δ vs the `28836873580` baseline; expectation NOISE).
- **π frames** (the W8 hero-surface raw material):
  `docs/tranches/T/audit/pi/w4/w4-picker-{light,dark}-{1440,768,390}.png` (on-disk, `*.png`
  self-ignored — the S π convention).
- **Per-lane commit hashes**: §6 above.
