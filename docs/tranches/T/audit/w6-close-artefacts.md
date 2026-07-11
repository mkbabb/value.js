# T.W6 — CLOSE ARTEFACTS (the round-4 gate, consolidated)

**Wave**: T.W6 — SURFACES & SHELL (W6-1..W6-8 across the four-lane single-writer map: Lane G
gradient · Lane E easing · Lane D dock+nav · Lane N generate; + the T-31 DOCK-ATOP LAYOUT LAW row
[OWNER-2026-07-10]).
**Closed (gate re-run)**: 2026-07-11, branch `tranche-t` (all four lanes merged — Lane G `6bd778c`,
Lane D PARTIAL `b4711d8` + REMAINDER `6c14e33`, Lane E `5a66dd6`, Lane N `d4e0032`; the round-4
CLOSE gate re-ran at HEAD after the Lane-G tail recovery `24802b0`).
**Verdict**: **`BLOCKED`** — the round-4 CLOSE gate re-ran the 9-row `T.W6.md §Hard gate` PLUS the
two carried rows (T-31 dock-atop, MOB-1) = **11 rows**, returning **4 PASS + 7 MISS-RECORDED, zero
FAIL**. The block is **not** a single env-class caveat (which would be `_with_misses`): the CLOSE
gate's own full-6-project playwright run (lane-unique `VJS_E2E_PORT=8390`/`VJS_E2E_PERF_PORT=8391`,
gh-pages rebuilt first) **did not complete before enforced output**, leaving SIX live-oracle legs
(O-19 · O-21 · O-17 · O-20 · O-15a/b · T-31) and the e2e-all-project leg of row 9 unconfirmed **by
this gate's own run** — too much unconfirmed live surface to certify `CLOSE_WITH_MISSES`.
**The substantive round-4 W6 work is LANDED and independently evidenced** (see §2): the round-4
integration drive at `d4e0032` already ran all 6 projects — **132 passed / 2 skipped / 3 failed**,
EVERY NAMED ORACLE GREEN (O-13/O-14/O-15a-b/O-16/O-17/O-20/O-22/T-31) — and the Lane-G tail was
subsequently **RECOVERED + committed** (`40f79a6` O-19 root cause · `921a325` the luma oracle ·
`ee7b1dc` O-21 rail/ruler + the T-46 pill-rounding oracle · `24802b0` `gradient.spec` re-authored,
curing the 3 stale reds). The BLOCK is the gate's own-run incompleteness, not a product regression.
**The formal re-run confirmation is routed to T.W6.5's VERIFY-AT-ROUND-4-GATE walk** (T.W6.5 re-runs
exactly T-36/T-37/T-40b/T-43/T-46/T-48 against the merged tree — the instrument that discharges these
MISS-RECORDED legs). **T.W6.5 flips DISPATCHABLE on the landed substantive ground; T.W8 stays PENDING
on T.W6.5** (the §0.6 addendum moved the barrier: `… → {W5 · W6} → W6.5 → W8 → W9`).
**GATE #4 RE-RUN (2026-07-11) — STRENGTHENED, still `BLOCKED`**: after the above, the round-4 CLOSE
gate was RE-RUN at HEAD `6bf8e6b` (gh-pages rebuilt fresh, playwright launched once on lane-unique
`VJS_E2E_PORT=8490`/`VJS_E2E_PERF_PORT=8491`) and returned **10 PASS + 1 MISS-RECORDED, zero FAIL** —
a strictly stronger partial than §1's 4 PASS + 7 MISS. The **smoke project (tests 1-123) ran to
COMPLETION** carrying EVERY named T.W6 oracle live leg GREEN (O-13/O-14/O-15a-b/O-17/O-19/O-20/O-21/
O-22/T-31), so the SEVEN §1 MISS-RECORDED live-oracle legs are now all CONFIRMED PASS. The block
NARROWS to row 9's static sweeps (`npm run lint` / `npm run typecheck` / `npm test` — HELD to keep CPU
off the WebGL-sensitive suite) + the full-6-project e2e COMPLETION (un-observed at forced output;
smoke-admin was at test 133). Verdict stays `BLOCKED` (≠ complete → round 4 NOT fully closed); T.W6.5
stays DISPATCHABLE. **The 11 gate-#4 rows + notes are transcribed verbatim in §7 (the certification run).**
**Governing law**: `RATIFICATION-2026-07-09.md §0` verbatim wins → `MANDATE-2026-07-06.md §0` +
addenda (§0.5 = T-30/T-31/T-32; §0.6 = the 2026-07-11 owner audit, T-36/T-37/T-40b/T-43/T-46/T-47/T-48
bind the in-flight W6 lanes as merge constraints) → `SYNTHESIS.md` as-hardened §3 (T.W6) + §6.1
(O-13/O-14/O-15a-b/O-17/O-19/O-20/O-21/O-22) + the R1/R5/R9/R10 retirement ledger (`T.md §4`) →
`waves/T.W6.md`, with every anchor re-derived against `audit/w1-move-map.md` (PP-11).
**This doc consolidates**: the 11 gate rows + verdict + evidence **verbatim from the round-4 close
gate** (§1) + the `BLOCKED` basis (§2) + the §0.6/MANDATE dispositions T-31/MOB-1/T-36/T-37/T-43/
T-46/T-47/T-48 + the cold-load residual → W8/Q14 (§3) + the booked swaps carried PKT-1..4 / P5-P6-P7
halves / R6-at-W7 (§4) + the four-lane commit/merge map (§5) + the grep captures + verification-
artefacts index (§6) + **the gate-#4 CERTIFICATION RE-RUN — 11 rows verbatim + notes (§7)**.

---

## §1 — The 11-row gate (verbatim: each row + verdict + evidence, from the round-4 close gate)

The rows are the `T.W6.md §Hard gate` (9) + the two carried rows (T-31 the dock-atop LAW,
MOB-1 the W1-deferred witness). Evidence is transcribed verbatim from the CLOSE gate's own run.

> **1 · O-13 slim SAME-COMMIT as the T-10 excise (+ the R1 survives-column)** — the census's one
> AT-RISK row: O-13 must slim in the SAME commit as the T-10 excise (else it certifies dead code or
> breaks on a deleted export); the R1 survives-column intact.

**PASS** — Commit `5833474` ("the T-10 excise + O-13 slim [ONE COMMIT]") is an ancestor of HEAD
(`git merge-base --is-ancestor` = YES; re-verified this run). ONE commit touches
`boot/view-accents.ts` + `boot/useViewAccents.ts` (the T-10 excise / M-19 EXCEPT-carve targets),
`test/view-accents.test.ts` (the O-13 oracle, slimmed), `DockViewSelect.vue`, and the NEW
`palettes-ramp.ts` — the same-commit invariant holds. Vitest `test/view-accents.test.ts` green 24/24
(run by name); the R1 survives set `resolveViewAccent`/`resolveSealInk` asserted live in that suite.
**Fully verified independent of e2e.**

> **2 · O-14 preview byte-identity** — chip stops ≡ the library function's live output, byte-identical
> (the truth law); the T-17 preview referent AND the RE-POINTED T-10 referent (the letterform ramp's
> rendered stops ≡ the guarded resolver's output at BOTH named sites — one resolver, two consumers).

**PASS** — The definitive byte-identity unit oracle `test/preview-chips.test.ts` green 5/5 (library ≡
sampler, strict equality). `o14-preview-truth.spec.ts` authored with the Q5-re-pointed T-10
letterform-ramp referent (one resolver, two consumers, `--palettes-ramp-0/1/2`) + the T-17 chip
referent; all test hooks present. The live DOM leg (sampler ≡ paint) was still executing in the fresh
suite (zero failures observed) when output was enforced — the **truth-level oracle is green**.

> **3 · O-19 netting luma-delta ≥59/255 light / ≥45/255 dark, desktop + 390** (REMEDIATED — FULL) —
> drift-back protection; judged on the post-W3 plate AND at 390.

**MISS-RECORDED** — The four live luma legs (desktop + 390 × light + dark against FLOORS light 59 /
dark 45) did NOT complete under the gate's own run — the suite was still in the smoke project at
enforced output. Cheap-tripwire leg verified statically (re-confirmed this run):
`style.css:289-297` carries `--gamut-hatch` **30%** + 4.75px, `--gamut-hatch-paper` **36%**,
`--gamut-edge` **45%**, `--gamut-edge-paper` **65%**, exactly matching the O-19 spec assertions;
`gamut-ink.ts` `WEBBING {period 6, weight 1.25, angleDeg 45}` in lockstep with the 4.75px+1.25px
tile. **NOTE**: the wave-doc §Scope prose says 22%/28% but the LANDED + spec value is **30%/36%**
(higher = MORE visible, aligned with T-6; the ratified gate is the ≥59/≥45 luma FLOOR, not the %).
The Lane-G tail RECOVERED this row: `40f79a6` (O-19 root cause — the specimen strip's mount reveal
yanked the pane scroll, burying the hero plate) + `921a325` (the luma oracle + paneSettled rest
fixture). Prior gate reported these green in targeted cold runs; **the full-run confirmation is
incomplete** (routed to the W6.5 verify-walk).

> **4 · O-21 rail silhouette/rung extents 4/4 incl. terminal cap < 1.5px** (REMEDIATED — FULL) — ramp
> ≡ border-box, no terminal bleed + rung-row grammar; the gradient interaction spec extended (§6.1).

**MISS-RECORDED** — The 4 live tests (terminal truth pixel-probe · owned paint stack border-box
origin+clip · pill silhouette radius ≥ h/2 · ruler grammar: 2 caps ≡ handle centers within < 1.5px +
every rung strictly interior) did NOT complete under the gate's run before enforced output. Test
hooks confirmed present in the moved tree: `gradient-ruler-cap` / `gradient-rung` / `gradient-stop-bar`
/ `data-stop-id` in `GradientVisualizer`/`GradientStopEditor.vue`. The Lane-G tail landed the oracle:
`ee7b1dc` (the rung-row `mx-px` cap alignment + the rail silhouette/ruler oracle + the T-46
pill-rounding leg). Prior gate reported 4/4 green; **the full-run confirmation is incomplete** (→ W6.5
verify-walk, T-46 leg).

> **5 · O-17 easing composition** — zero letterbox (drawn-plot box ≡ element content box ±1px both
> axes; element aspect ≡ 1/vb-ratio) · ≤1 cartoon stamp in-row · dot rest (never a doubled endpoint) ·
> the one-literal law.

**MISS-RECORDED** — `o17-easing-composition.spec.ts` authored to the T-47-escalated spec (getScreenCTM
letterbox across 3 curve regimes at desktop + 390, ≤1 cartoon stamp, 4-circle dot-rest, one-literal
law, cubic-bezier mint tripwire). The live legs did not complete under the gate's run before enforced
output; **zero failures observed** to that point. The round-4 integration drive at `d4e0032` reported
O-17 ×2 GREEN.

> **6 · O-20 Regenerate-inside-plate containment** — the plate-containment locator assert.

**MISS-RECORDED** — `o20-generate-plate.spec.ts` authored (verb + actions + seed inside
`[data-generate-plate]`, orphan dead, T-17 seed-exact strip byte-identity). Hooks
`data-generate-plate` / `generate-swatch` present in `GenerateControls.vue`. Live legs did not
complete under the gate's run before enforced output. The Lane N record + the round-4 integration
drive both report O-20 **2/2 GREEN**.

> **7 · O-22 status lamp** — the lamp shows the correct variant per precondition, first-paint,
> dev-gated; **the S.W0-1 seed-rider contract byte-preserved** (transport latch · synchronous throw ·
> loud console.error · misconfigured ≠ unavailable).

**PASS** — The S.W0-1 contract crux (synchronous `DevMisconfigError` · loud `console.error` ·
misconfigured ≠ unavailable · dev-gating · the misconfigured variant harness-bound part) is proven
closed-form in vitest `test/status-lamp.test.ts` green **14/14** over the SAME resolver the SFC
consumes — the byte-preservation is verified (`git diff a92f501..HEAD -- @lib/palette/api/` EMPTY).
The live band-chrome legs (healthy → no lamp, transport-fail → unavailable variant, band seat) were
still executing in the run (no red) when output was enforced; **the contract-preservation gate is
green** (the misconfigured face was also live-probed on a bare web-only server: role=alert + the loud
console.error, per the Lane D remainder record).

> **8 · O-15a/b seal abrogation + Tools clip release + zero native title + T-36 box-model** — seal
> computed `border-style: none` (negative watch) + the `ring-primary/50` cascade-dead sibling
> dispositioned (O-15a); settle-stamped clip release + whole-shadow assert + zero native `title` on the
> dock set (O-15b); the §0.6 T-36 true-button box-model.

**MISS-RECORDED** — `o15-dock-register.spec.ts` authored (seal border-style:none negative watch ·
ring-sibling disposition · settled `overflow:visible` + whole-shadow · T-36 8px/12px + 4px true-button
box-model · zero native title · separator fold). Live legs did not complete under the gate's run
before enforced output; **zero failures observed**. The Lane D remainder record reports O-15b 4/4 +
O-15a 2/2 green post-PP-8-lift; the round-4 integration drive reports O-15a/b ×6 GREEN.

> **9 · PP-8 sweep + PI-1 delta + lint 0 / typecheck 0 / test green / e2e all-project green (6) /
> no `demo/` file > 400 LoC** (REMEDIATED — FULL).

**MISS-RECORDED** — ALL non-e2e legs GREEN: `npm run lint` exit 0 · `npm run typecheck` exit 0 ·
`npm test` 2222/2222 (73 files) · **zero `demo` files > 400 LoC** (re-confirmed this run: `find` + `wc`,
`components/ui/` excluded) · PP-8 record present (`w6-laneD-remainder/RECORD.md` — Dock.vue 468→336) ·
PI-1 round-4 ledger row present (`pi1-delta-ledger.md` — the honest-RED gh-pages Lighthouse is the
W9/Q14 gate, explicitly NOT a named gate row for W6) · tool-artefact grep clean (0). The Lane-G tail's
`24802b0` re-authored `gradient.spec` to the LANDED W6-2/W6-3 UI (the two/three stale reds cured
honestly, coverage extended). **The ONE unconfirmed leg**: `e2e all-project green` — the fresh
6-project run (`VJS_E2E_PORT=8390` / `VJS_E2E_PERF_PORT=8391`, gh-pages rebuilt first) was still
mid-smoke-project of 6 with zero failures when StructuredOutput was enforced; **it did not finish**.
The round-4 integration drive at `d4e0032` DID complete all 6 (132/2/3, every named oracle green; the
3 reds forensically stale-spec, since cured by `24802b0`).

> **T-31 · dock-atop band occlusion probe** [OWNER-2026-07-10, MANDATE §0.5] — `elementFromPoint` over
> the dock band is NEVER a card surface; band structure verified (dock band + scene band); zero z-index
> arms minted.

**MISS-RECORDED** — `t31-dock-band.spec.ts` authored (two-band grid, in-flow static nav, zero z-index
arms, `elementFromPoint` probe over the dock band never a card, across views × scroll × schemes × 390
× short-viewport × ultra-wide). Live legs did not complete under the gate's run before enforced output;
**zero failures observed**. The LAW landed at `d8f1fb1` (two-band grid; the fixed overlay + `--dock-total`
+ `z-dock` trio retired together); the Lane D remainder record reports T-31 **8/8 green**; the round-4
integration drive reports T-31 ×6 GREEN.

> **MOB-1 · the `data-layout` witness in history** — the T.W1-deferred witness (the D6-03 aspect
> exception + D8-1 note).

**PASS** — Commit `a92f501` ("the data-layout witness lands [ONE COMMIT]") is an ancestor of HEAD
(re-verified this run) — the D6-03 aspect exception + the D8-1 note discharged. "MOB-1 in history"
satisfied; **fully verified independent of e2e** (this discharges the ONE T.W1 FAIL, folded into the
round-4 record).

---

## §2 — The `BLOCKED` basis (why not `CLOSE_WITH_MISSES`)

The gate returned 4 PASS + 7 MISS-RECORDED, zero FAIL. The seven MISS rows are NOT product
regressions — each is the **CLOSE gate's own full-6-project e2e run not completing before enforced
output**. `CLOSE_WITH_MISSES` is reserved for a bounded env-class caveat (one un-observed all-project
tally on otherwise-independently-green oracles — the W3/W4.5 precedent). Here SIX distinct live-oracle
legs plus the e2e-all-project leg are unconfirmed **by this gate's run**, which exceeds that bar — so
the honest verdict is **BLOCKED pending an unblocked full-e2e confirmation**, not a soft close.

**Why the block is a gate-run artefact, not a wave defect** — three independent bodies of evidence:

1. **The round-4 integration drive (`d4e0032`) already ran all 6 projects to completion**: 132 passed /
   2 skipped / 3 failed; EVERY NAMED ORACLE GREEN (O-13 · O-14 ×4 · O-15a/b ×6 · O-16 W5 census + the
   R1 born-RED · O-17 ×2 · O-20 ×2 · O-22 ×2 · T-31 ×6); the 2 skips = O-3 headed-GPU (`test.skip`,
   headless); born-RED-by-design intact (O-5 spike → RP-2/W7 · O-16 R1 → PKT-1 · O-26 headless → W9).
   The 3 reds were ALL in the pre-re-author `e2e/smoke/views/gradient.spec.ts`, forensically attributed
   stale-spec/timing against owner-ORDERED re-authored surfaces (NOT product, NOT fence breaches).
2. **The Lane-G tail was RECOVERED + committed** (the item "Open for the W6 close gate" at the
   integration event): `40f79a6` (O-19 root cause — T-6 desktop netting) · `921a325` (the O-19 luma
   oracle) · `ee7b1dc` (O-21 rail/ruler + T-46 pill-rounding) · `24802b0` (`gradient.spec` re-authored
   to the landed W6-2/W6-3 UI — the 3 stale reds cured honestly). So the item that genuinely blocked a
   clean close at the integration event is now **landed + oracle'd**.
3. **The lane self-close gates were all green** (per the lane records): O-13 24/24 · O-14 5/5 unit ·
   O-15a/b 6/6 · O-17 2/2 · O-20 2/2 · O-22 2/2 + 14/14 matrix · T-31 8/8; static lint 0 · typecheck 0
   · vitest 2222/2222 (73) · demo caps clean.

**The discharge instrument is T.W6.5** (not a W6 re-open): T.W6.5's §Hard gate is a
VERIFY-AT-ROUND-4-GATE walk over T-36/T-37/T-40b/T-43/T-46/T-48 against the merged tree — precisely the
live legs left MISS-RECORDED here. A miss there re-opens as a W6.5 row in the owning files (round 4 is
substantively closed, so single-writer holds). On that basis **T.W6.5 flips DISPATCHABLE**; **T.W8 stays
PENDING on T.W6.5**.

---

## §3 — The §0.6 / MANDATE dispositions (T-31 · MOB-1 · T-36 · T-37 · T-43 · T-46 · T-47 · T-48)

| Row | Source | Disposition at W6 close |
|---|---|---|
| **T-31** | MANDATE §0.5 [OWNER-2026-07-10] | **LANDED at W6 Lane D** (`d8f1fb1` — the two-band-grid shell; the fixed overlay + `--dock-total` + `z-dock` trio retired together; ZERO z-index arms; the P9 token-chain single-point-of-failure severed; the pass-B 0–1px worst case cured at 1100×430). Oracle 8/8 at the lane close; the round-4 close-gate leg MISS-RECORDED (§1). Verified-at-W6.5. |
| **MOB-1** | T.W1 deferred FAIL | **DISCHARGED** (`a92f501` in history — the `data-layout` witness; the D6-03 aspect exception + D8-1 producer-owned cascade note resolved). The ONE T.W1 miss is folded closed by the round-4 record. |
| **T-36** | MANDATE §0.6 (Tools box-model) | **LANDED at W6-8** (`c237d24` — the Tools trigger steps to a TRUE BUTTON through the producer's own `--dock-compact-control-padding` token hook; landed box `padding 8px 12px`, `margin-inline 4px`, oracle-pinned). Verified-at-W6.5 (verify-walk row). |
| **T-37** | MANDATE §0.6 (collapsed-dock swatch visibility) | **LANDED at W6-7** (`3408433` — "T-28 ABROGATE at the seal + T-37 swatch visibility"; the die-rim dies, the wax fills, the register law encoded). Verified-at-W6.5. |
| **T-43** | MANDATE §0.6 (owner CONFIRMS Q5) | **LANDED at W6-4** (`5833474` — the Q5-RULED guarded letterform ramp at exactly TWO sites: the "Palettes" dropdown entry + the Palettes title). An owner-CONFIRMS row, not a new ask; the chip arm stays DEAD for T-10. Verified-at-W6.5. |
| **T-46** | MANDATE §0.6 (gradient unusable + glass-ui rounding) | **LANDED at W6-2 + tail** (`5edd903` rail re-author + `ee7b1dc` the T-46 pill-rounding oracle in `o21-gradient-rail`). Bound Lane G's merge gate as a constraint. Verified-at-W6.5 (T-46 leg). |
| **T-47** | MANDATE §0.6 SPEC-ESCALATION (easing first-principles) | **LANDED at W6-3** (`a540dde` — the kf-assayed interval specimen bench; the keyframes.js easing-selector curve picker assayed DIRECTLY + more compact; O-17 the oracle). Consumed as the lane's new spec, not a rider. Verified-at-W6.5 (the T-47 conditional row). |
| **T-48** | MANDATE §0.6 (card transition motion frame-by-frame) | **T.W5 IS this wave** (T-14) — the O-16 computed-cascade census green both schemes (W5 close). The **frame-by-frame residual** (the `:206` pane-swap-spring settle-wait, live-probed decisive: transforms decay to `count=0` by 3000ms — the invariant HOLDS) → **W8 T-48 bracket**. |

**The cold-load dock-arrival stall residual → W8 / Q14**: the FIRST page load of a fresh SwiftShader
browser process can hold the W2 dock-arrival veil (`overture-dock-veiled`) unreleased 20–30s+
(observed ≥30s; the churning WatercolorDot radius transitions sit in the arrival fallback's await set).
**Live-bisected PRE-EXISTING** — reproduced identically at the pre-T-31 head `c237d24` (fixed-overlay
layout); T-31 is NOT the cause; the class pre-dates the band law and the boot chain (W2's, closed) is
untouched by W6. Routed to the **W8 slate** (it is also the **Q14/T-39** load-quality face); the t31
oracle carries a recorded warm-up navigation (harness-shaping, no gate weakened).

---

## §4 — Booked swaps carried (books, never gates — the interim→producer swap set)

| Book | Trigger | Disposition carried at W6 close |
|---|---|---|
| **PKT-1** (R1 dist-clobber) | the day the packet lands at the glass-ui root | **NOT landed** — the 150ms `:root --default-transition-duration` clobber is LIVE in `../glass-ui/dist/styles/components.css`; the `file:` pin unchanged (glass-ui npm **4.2.0**, re-probed this run). The O-16 R1 row stays EXPECTED-RED (`test.fail()`) with the PKT-1/P2 cite. Fires at W7 (or the day the `file:`-pin lands it). |
| **PKT-2** (~0.3s preset spring-clock) | producer preset lands | landed at W5 on arm (i) — `--spring-snappy` at its own clock; recorded on the book row. |
| **PKT-3** (Tranche B R6/R7 compositor recipe) | producer compositor recipe | R6/R7 left untouched, never retimed on layout properties. The book row SPLIT: **R7** (`Dock.vue`) fires in-round if PKT-3 lands (Lane D's file); **R6** (`animations.css` — W5's now-frozen file) fires at **W7-or-successor** (no conditional self-authority). PKT-3 NOT landed at W6 close. |
| **PKT-4 / L9** (skeleton stagger seams) | producer shimmer reads the seams | the W5 settle landed WITHOUT the stagger; the demo's `--skeleton-shimmer-delay/-tint` writes stay; the stagger goes live when the producer shimmer reads them (5th-carry class — verified at W7). |
| **P5** (solid-ring register) | any future WatercolorDot ring | the STANDING LAW opened by W6-7's Q12 ABROGATE (rings on WatercolorDots ride the dot's own silhouette or do not exist); the fitted-ring alternative consumes P5 at W7 only if Q12 rules that arm. |
| **P6** (blob interior-shading/halo rider) | producer blob refinement | the residual from the W4.5 T-30 cure (`af18e07` — the emerge-pose backing-store race fixed, ratio 1.998 full-res); the interior-shading/halo rider stands as a producer-side residual. |
| **P7** (EasingPicker v2 producer half) | producer v2 door | the demo composition landed at W6-3; the v2 consume fires at W7 (booked swap). W6-3's regex-driven autoplay → **booked DELETION** the day P7's declarative `autoplay`/`playing` door lands (T.md §7.2; re-verified at W7). |
| **R6-at-W7** | (see PKT-3 split) | Tranche B **R6** (`animations.css` compositor collapse) fires at **W7-or-successor** — W5 could not re-open its own closed file. |

**The two F7 design-call KEEP rows** (never retimed): `DockViewSelect` `--accent-view` 0.55s stately
sweep (W7-4's surviving voice) · `ImageEyedropper` tracked-canvas bezier (canon "tracked = bezier").

---

## §5 — The four-lane commit / merge map

| Lane | Item(s) | Commits (item-scoped) → merge |
|---|---|---|
| **G** (gradient) | W6-1 netting recal · W6-2 envelope plate + rail | `5eb5b08` (envelope plate) · `4009570` (W6-1 O-19 re-judge, ink 30%/paper 36%) · `5edd903` (rail re-author) → merge **`6bd778c`**; **tail**: `40f79a6` (O-19 root cause) · `921a325` (O-19 luma oracle) · `ee7b1dc` (O-21 + T-46) · `24802b0` (`gradient.spec` re-author) |
| **D** (dock+nav) | W6-4 nav voice + preview chips · W6-7 seal abrogation · W6-6 status lamp · W6-8 clip release + T-36 · T-31 | `5833474` (**T-10 excise + O-13 slim [ONE COMMIT]**) · `2ab5654` (T-17 chip module) · `3408433` (W6-7 T-28 abrogate + T-37) → PARTIAL merge **`b4711d8`**; `e4ddd32` (W6-6 lamp) · `c237d24` (W6-8 clip + T-36) · `d8f1fb1` (T-31 dock-atop) · `a9f5e88` (PP-8 lift, Dock.vue 468→336) → REMAINDER merge **`6c14e33`** |
| **E** (easing) | W6-3 composition (T-47 spec-escalation) | `a540dde` (kf-assayed specimen bench) → merge **`5a66dd6`** |
| **N** (generate) | W6-5 verb re-seat · T-17 consume | `5571f2b` (verb joins plate, O-20 mint) · `3372749` (T-17 GenerateControls consume) → merge **`d4e0032`** |

Cross-wave: `011918f` (W5's App.vue queue → W6-6 — the `DevMisconfigBanner` MOUNT leaves App.vue, the
ONE round-4 App.vue writer; the banner FORM then dies at W6-6 `e4ddd32`).

---

## §6 — Grep captures + verification-artefacts index

- **Tool-artefact grep** (`grep -rnE '</?(content|invoke|parameter|antml)'`) over the wave's touched
  docs (this doc + `w5-close-artefacts.md` + `PROGRESS.md`): **EMPTY** (the §Recovery seam class — M-1).
- **PP-8 caps**: 0 `demo/*.vue|ts` (excl `components/ui/`) > 400 LoC (re-confirmed this run) · 0
  `api/src` > 350.
- **as-cast ledger** (S baseline, unchanged by the W6 diff): `src/` 0 real `as any` + 8 `as unknown as`
  · `api/src` 0 / 1.
- **W7 trigger re-probe (2026-07-11, at the round-4 close)**: `git -C ../glass-ui tag --list 'v5*'` =
  EMPTY; `npm view @mkbabb/glass-ui version` = **4.2.0**; the BG F8 5.0.0 cut row is present at
  `c93a7f13` but **USER-GATED + untagged** ("[paint-pending]") — **T.W7 TRIGGER NOT FIRED** (it FLOATS
  into whatever round is current when the tag lands; NOT on the critical path).
- **PI-1 Q14** (`audit/pi1-delta-ledger.md`): the round-4 row is OPENED (CI run `29154102743` /
  `d4e0032`); the honest-RED gh-pages Lighthouse is the **W9/Q14** gate, explicitly NOT a named W6 gate
  row (only W2/W7/W9 adjudicate the budgets). Expected FLAT vs W4 (W6 moves no eager payload; CSS
  render-blocking 87.99 KiB gz ≤ 120, +1.2 KiB the lamp/bench/plate tokens).
- **Verification artefacts** (this close): the O-13 same-commit hash (`5833474`, ancestor-verified) ·
  the O-14 unit byte-identity (`test/preview-chips.test.ts` 5/5) · the O-22 closed-form matrix
  (`test/status-lamp.test.ts` 14/14 + the `@lib/palette/api/` EMPTY-diff byte-preservation) · the
  round-4 integration all-6-project tally (132/2/3, every named oracle green, at `d4e0032`) · the
  Lane-G tail recovery (`40f79a6`/`921a325`/`ee7b1dc`/`24802b0`) · the per-lane records
  (`w6-laneD-remainder/RECORD.md`, `w6-lane-n-record.md`) · the O-19 style.css/gamut-ink lockstep
  (30%/36%/45%/65% + WEBBING {6,1.25,45}) · the demo-cap sweep · MOB-1 (`a92f501`, ancestor-verified).

**Hand-off**: **T.W6.5** opens on the merged round-4 tree; its VERIFY-AT-ROUND-4-GATE walk re-runs
T-36/T-37/T-40b/T-43/T-46/T-48 against the live tree and the round-4 close artefacts — discharging the
seven MISS-RECORDED live-oracle legs here (a re-run confirmation, not a re-open). **T.W7** fires the
booked swaps (PKT-1/R1, PKT-3/R6-R7, PKT-4, P5 register, P7 v2 consume) at the 5.0.0 cut when the tag
lands. **T.W8** inherits the T-42 + T-48-frame-by-frame residual brackets + the cold-load stall
(Q14/T-39 face). **T.W9** re-runs the repo-wide sweeps these excisions must survive + the Q14
green-or-escalation close gate.

---

## §7 — THE CERTIFICATION RUN (gate #4 — the round-4 CLOSE re-run, 2026-07-11)

The round-4 CLOSE gate was RE-RUN at HEAD `6bf8e6b` (`tranche-t`, working tree clean; gh-pages rebuilt
fresh via `npm run gh-pages` exit 0; playwright launched ONCE on lane-unique
`VJS_E2E_PORT=8490`/`VJS_E2E_PERF_PORT=8491`, `--reporter=list`, all 6 projects). It returned **10 PASS
+ 1 MISS-RECORDED, zero FAIL** — a strictly stronger partial than §1's 4 PASS + 7 MISS: the **smoke
project (tests 1-123) ran to COMPLETION** carrying EVERY named T.W6 hard-gate oracle live leg GREEN, so
the SEVEN §1 MISS-RECORDED live-oracle legs are all CONFIRMED PASS here. The verdict remains **`BLOCKED`**
(≠ complete → round 4 NOT fully closed) on the single narrowed cause: row 9's static sweeps
(lint/typecheck/vitest) + the full-6-project e2e COMPLETION were un-observed at forced structured-output.
**T.W6.5 stays DISPATCHABLE** (either way). The 11 rows + gate notes below are transcribed VERBATIM from
the gate-#4 structured output.

### The 11 rows (verbatim)

> **Row 1 — O-13 slim SAME-COMMIT as the T-10 excise** — **PASS**

Closed-form/git-ancestry, complete. Commit 5833474 'feat(T.W6·W6-4): the T-10 excise + O-13 slim [ONE
COMMIT]' is an ancestor of HEAD 6bf8e6b; it touches DockViewSelect.vue (T-10 excise) AND
boot/view-accents.ts + boot/useViewAccents.ts (the O-13 slim targets) in ONE commit. Kill-set
(resolveViewAccentTokens / PRIMARY_VIEW_SHIFTS / PRIMARY_VIEW_IDS / entryAccent) survives ONLY in
death-documenting comments (grep-verified: zero live code). R1 survives-column live-consumed
(resolveViewAccent, resolveSealInk, --accent-view across boot + palettes-ramp + utils.css). Unit oracle
test/view-accents.test.ts present.

> **Row 2 — O-14 preview byte-identity (T-17 chips + re-pointed T-10 ramp)** — **PASS**

o14-preview-truth.spec.ts 4/4 GREEN in completed smoke run (tests 36-39): (a) dropdown 'Palettes' entry
+ Palettes title render the resolver's guarded stops byte-identical — one mint (--palettes-ramp-0/1/2),
two consumers; (b) excised legend dead (no --accent-view-* tokens, no dot column); (c) T-17 honest
absence with <2 operands; (d) every open-menu chip's painted gradient carries exactly its stamped stops
(≤1e-3). Unit oracle test/preview-chips.test.ts present.

> **Row 3 — O-19 netting luma-delta floors (both schemes, desktop+390)** — **PASS**

o19-netting-luma.spec.ts 5/5 GREEN (tests 67-71) at dpr2: desktop light ≥59/255, desktop dark ≥45/255,
390 light ≥59/255, 390 dark ≥45/255, plus computed-token tripwire (hatch 30%/4.75px, paper 36%, edge
45%/65%). This is the Lane-G-tail remediation confirmed at HEAD — the previously-RED desktop netting
(T-6 'more visible') now passes; root cause 40f79a6 (specimen-strip mount reveal yanking pane scroll)
cured.

> **Row 4 — O-21 rail silhouette/rung extents (4/4 incl. cap <1.5px)** — **PASS**

o21-gradient-rail.spec.ts 4/4 GREEN (tests 76-79): terminal truth (each edge paints its own stop, no
mirrored bleed), owned paint stack (linear-gradient(90deg) no-repeat, border-box origin+clip over
checker), pill silhouette T-46 (radius ≥ height/2), ruler grammar (exactly 2 terminal caps + every rung
strictly interior, cap-center↔handle-center Math.abs < 1.5px both terminals).

> **Row 5 — O-17 easing composition (zero letterbox, ≤1 stamp, dot rest, one-literal)** — **PASS**

o17-easing-composition.spec.ts 3/3 GREEN (tests 48-50): zero letterbox across curve regimes
(linear/overshoot back/steps) desktop AND 390 via getScreenCTM (drawn-plot box ≡ content box ±1px,
aspect≡1/vb-ratio); composition leg (≤1 cartoon stamp, flat well shadow none, 4 circles no r=0.03 travel
dot, one-literal-law exactly 1 leaf, mint-law byte-identical 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
head speaks NAME not literal).

> **Row 6 — O-20 Regenerate-inside-plate containment** — **PASS**

o20-generate-plate.spec.ts 2/2 GREEN (tests 74-75): verb + actions + bench-note seed live INSIDE
[data-generate-plate] (page Regenerate count ≡ plate count, orphan dead), regenerate re-stamps seed in
place; T-17 seed-exact strips (preset row's stamped data-stops ≡ the plate's live swatches after
selecting it).

> **Row 7 — O-22 status lamp + S.W0-1 seed-rider contract byte-preserved** — **PASS**

o22-status-lamp.spec.ts 2/2 GREEN (tests 80-81): healthy backend → no lamp + dead banner stays dead
(negative watch); transport failure (route abort) → 'unavailable' variant, role=status, first-paint band
chrome inside nav landmark, NOT in .dock-layers, no dock interaction. Closed-form contract
test/status-lamp.test.ts covers the R10 survives set: synchronous DevMisconfigError, loud console.error
at initApiEnvironment, misconfigured≠unavailable (distinct variants+roles), dev-gating.

> **Row 8 — O-15a/b seal abrogation + clip release** — **PASS**

o15-dock-register.spec.ts 6/6 GREEN (tests 40-45): O-15a seal computes border-style none + border-width
0px + padding 0px (resurrection guard), ring-2 sibling dispositioned (no geometric ring on mix
WatercolorDots); O-15b settled rest releases clip (.action-bar-toggle-inner overflow visible) + non-none
focus-visible box-shadow on unclipped box, T-36 true-button (padding 8px 12px, margin 4px), zero native
title on the dock set, separator folds into slot arrival.

> **Row 9 — PP-8 sweep + PI-1 delta + lint/typecheck/vitest + e2e all-project + LoC cap** — **MISS-RECORDED**

NOT a FAIL (zero honest reds). VERIFIED: demo LoC cap 0 files >400 (find+wc clean); PI-1 round-4
Lighthouse delta row recorded at abff923 (pi1-delta-ledger.md + PROGRESS.md — 'delta recorded' met, Q14
budgets honestly-RED by design); MOB-1 css-emission-probe PASS. UNCONFIRMED at forced output: (a) npm
run lint / npm run typecheck / npm test (vitest) were HELD to avoid CPU contention destabilizing the
WebGL-sensitive suite and had not run when structured-output was enforced; (b) the full 6-project e2e was
still executing (smoke 123/123 GREEN complete; smoke-admin in progress at test 133;
smoke-mobile/reactivity/perf/safari pending) — no PLAYWRIGHT_EXIT yet. The 2 red ✘ marks are born-RED
test.fail() legs (o16 R1 PKT-1 clobber, confirmed 150ms live at line 116; the other a born-RED leg),
ok:true, NOT genuine failures and NOT T.W6 gate rows.

> **Row T-31 — dock-atop layout law, occlusion 8/8** — **PASS**

t31-dock-band.spec.ts 8/8 GREEN (tests 96-103): two-band grid (display grid, 2 rows, rowGap≥7, nav
in-flow static/relative, navZ auto, wrapper static/auto, bandFloor≥40); retired trio dead (no
fixed/z-dock/top-dock-inset); occlusion probe elementFromPoint over dock band is NEVER a
.pane-container/.pane-wrapper/.pane-main across @1280 light+dark (+scroll+Mix), @390 light+dark,
short-viewport 1100x430 (gap≥7), ultra-wide 2560 (navTop≤20). Structural cure, zero z-index arms.

> **Row MOB-1 — data-layout witness** — **PASS**

Closed-form, complete. a92f501 'fix(MOB-1): data-layout witness lands [ONE COMMIT]' ancestor of HEAD (the
folded-closed T.W1 FAIL). scripts/ci/css-emission-probe.mjs PASS exit 0 — all 5 witnesses emitted
([data-layout=mobile] .pane-slot-mobile, [data-layout=desktop] .pane-wrapper--left/--right/.dock-mobile-panes,
.sm:max-w-lg). data-layout stamp live at App.vue:2 (:data-layout="isDesktop ? 'desktop' : 'mobile'").
Live-witness, stronger than gate #3's ancestry-only.

### Gate-#4 notes (verbatim)

1. gh-pages rebuilt fresh at 12:34 (npm run gh-pages, exit 0, '✓ built in 1.78s'; only warnings are
   @vueuse pure-annotation position, non-fatal). dist/gh-pages/ verified. Playwright launched ONCE with
   VJS_E2E_PORT=8490 VJS_E2E_PERF_PORT=8491 (never :9000), --reporter=list, all 6 projects.
2. BLOCKED = gate-run incompleteness at forced structured-output, NOT a product defect and NOT any gate
   weakened. This is a MUCH stronger partial than gate #3 (which had 4 PASS + 7 MISS): here 10 of 11 rows
   PASS with hard evidence, only row-9's static sweeps (lint/typecheck/vitest) + all-project e2e
   completion remain unconfirmed, zero FAIL.
3. DECISIVE: the smoke project (tests 1-123) ran to COMPLETION and carries EVERY named T.W6 hard-gate
   oracle live leg — O-14 4/4, O-15a/b 6/6, O-17 3/3, O-19 5/5, O-20 2/2, O-21 4/4 (incl. <1.5px cap),
   O-22 2/2, T-31 8/8 — ALL GREEN. The 7 legs gate #3 recorded as MISS-RECORDED are now all confirmed
   PASS.
4. The 2 red ✘ in the run are born-RED-by-design test.fail() legs (o16-computed-cascade R1: console shows
   '--default-transition-duration = 150ms' clobber live, the PKT-1 producer-root expected-red; plus one
   further born-RED leg). Under test.fail() these are ok:true, not counted as genuine failures. The o16
   W5-census companion leg (o16:106) passed. o5-boot-pacing (perf) and o26-aurora (smoke) are the other
   born-RED legs, all routed W7/W9 producer/headless.
5. The remediation 40f79a6..24802b0 is landed on HEAD and its effect confirmed live: O-19 desktop netting
   (T-6) now GREEN at desktop+390 both schemes (was the Lane-G-tail red at d4e0032); the re-authored
   gradient.spec.ts tests (66/106/127/174/205/233/253/287) all pass — the two stale reds (:34 H-range,
   :183 steps) cured; O-21 rung-row mx-px cap + rail silhouette oracle green.
6. TO CLOSE (recommended re-dispatch, no code change expected): (1) let the running suite reach
   PLAYWRIGHT_EXIT and read the final all-project summary; (2) run npm run lint (expect 0), npm run
   typecheck (expect 0), npm test / vitest (expect green — abff923 recorded 2222/2222 at d4e0032; only 2
   demo Vue files changed since, no vitest-covered source), after the suite finishes so CPU contention
   cannot destabilize either. On those completing green, row-9 flips PASS → 11/11 and the wave closes
   complete.
7. Working tree clean at HEAD 6bf8e6b (tranche-t). PP-8 pieces spot-verified: 0 demo files >400 LoC;
   casts/api-cap disciplines are documented and unchanged by the demo-only remediation.
