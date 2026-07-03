# PASS3-VERDICT — Tranche R, Pass-3 certification: **CONVERGED**

**Certifier**: Fable (pass-3 certification mandate) · **Date**: 2026-07-02 · **Branch**: `tranche-q` @ `e80b359` (value.js 1.2.0)
**Inputs**: `PASS2-VERDICT.md` (§3 M1–M7 backlog, §4 seeds, §5 verifications) + the 3 pass-3 discharge lanes (`L1-spec-v3.md`, `L2-kf1-reverify.md`, `L3-doc-sweeps.md`) + the 9 certification packets (`CERT-*.md`, each verified in the amended TEXT against the live trees, not the lane reports' word).
**Ancestors**: `pass1/PASS1-VERDICT.md` (mean 87.8, min 84) → `PASS2-VERDICT.md` (mean 93.2, min 88).

---

## §1 — Final certification scoreboard

| Item | Pass-3 | mustFix | Pass-2 | Discharged by | Certified by |
|---|---|---|---|---|---|
| SPEC-V3 (`SYNTHESIS-v2.md`, amended-at-pass-3) | **100** | — | 91 (2) | L1 (M1 ×7 sites, M2, M4 mirror, §C fold) | `CERT-SPEC-V3.md` |
| gamut-bound | **100** | — | 97 (0) | hoist-only (W0-14; base-equivalence per M2) | `CERT-gamut-bound.md` |
| boot-blast-radius | **100** | — | 98 (0) | hoist-only (W0-14) | `CERT-boot-blast-radius.md` |
| kf1-grammar (amended + hoisted) | **100** | — | 89 (3) | L2 (M1 kf1-half, M2 baseline, M3 head re-run) | `CERT-kf1-grammar.md` |
| w0-truth | **100** | — | 93 (1) | L3 (M7 line-31 attribution + diagram) | `CERT-w0-truth.md` |
| overlay-amendment | **100** | — | 93 (1) | L3 (M5 `:140` sweep + §7 ledger row + both nits) | `CERT-overlay-amendment.md` |
| boundary-api | **100** | — | 97 (0) | none owed (co-signable at pass 2) | `CERT-boundary-api.md` |
| easing-disposition | **100** | — | 93 (2) | L3 (M6 bbnf-buddy sweep + 1.3.0-branch conditioning) | `CERT-easing-disposition.md` |
| dispatch-homes (amended-at-pass-3) | **100** | — | **88 ← was the gate** (3) | L1 (M4 fix-shape 1: FN-7 pointer, in-tree note, gate rescope, inline-rows fixture) | `CERT-dispatch-homes.md` |
| **MEAN** | **100** | | 93.2 | +6.8 | |
| **MINIMUM** | **100** | | 88 | +12 — **the loop gate is met** | |

Every PASS2-VERDICT §3 row (M1–M7) is discharged **in the amended text** and independently certified; every certification re-verified the load-bearing citations against the live trees (`tranche-q` @ `e80b359`, glass-ui 4.2.0 manifest, fourier-analysis, bbnf-buddy, keyframes dist). No certification found a new blocking defect. The trajectory: 87.8/84 → 93.2/88 → **100/100** over three passes.

**Head-truth refinement surfaced by the M3 re-run and absorbed into the record** (L2 §2, amended `kf1-grammar.md` §4/§8/§9): the KF-1 re-run at `e80b359` is **not** a clean pass — clean head baseline **1934/51 files**; patched head **1939 passed / 1 failed / 1940**; `grammar-2026-atrules.test.ts` 31→37 (the fix adds 6). The 1 failure is `test/parsing-extract-functions.test.ts:36` (reads the renamed `.type`; asserts the pre-fix parse of `--x: <number>`), a **head-only P-era test added at `23d1a91`** that the stale worktree could not observe. It is a rename-sweep completeness gap, not a parser defect: **the R.W1 KF-1 change is a 5-file change** (the 4-file worktree diff, +141/−30, preserved as `kf1.patch` + a one-line assertion sweep of that 5th file). This is recorded, certified (CERT-kf1-grammar, CERT-SPEC-V3), and carried — it does not reopen the loop.

---

## §2 — Loop disposition: **CONVERGED. The audit is over; development begins.**

Minimum = 100. `SYNTHESIS-v2.md` (as amended at pass 3) is **the ratified-ready specification** — self-contained, live-tree-verified, with every data-armed question answered and only the eight pure-preference owner rows open (§3 below). Per its own §13: no prototype orders remain; no measurement changes any answer. **No pass-4 fleet. `nextPassSeeds` = [].**

The development phase now builds, in order:

1. **The owner ratification** (precedes wave execution; §3's Q-table is the instrument). Only **Q7** gates library *output*; Q11/Q12 gate R.W3/R.W4 details; the rest are posture/scheduling. A 4-minute pass over 8 rows unblocks everything.
2. **The tranche-R corpus in `docs/tranches/R/`** (value.js-tree, the development phase's first authored artifact):
   - **`R.md` charter** — distilled from SYNTHESIS-v2 §0 (verdict), §2 (design POV), §3 (the R.W0–R.W7 wave DAG + §3.2 graph + §3.3 BOOKS + §3.4 pin policy), §4 (library slate + defers), §5 (CRUD LEAVE verdict), §10 (zero-drop fold ledger), §12 (ratification outcomes once the owner answers).
   - **Wave docs + board** — R.W0 substrate (W0-1..W0-14, §3 R.W0; note W0-14's hoist half is ALREADY DONE at pass 3 — L2 §4 — leaving the seed-preservation half: `kf1.patch` + `vite.config.cured.ts` before worktree cleanup); R.W1 library 2.0.0 (§3 R.W1 items 1–7, with the KF-1 item carried as the **5-file** change per §1 above); R.W2 functional truth (§3 R.W2: exports-map boot fix, Tabs→SegmentedTabs, gate split INTERNAL/EXTERNAL); R.W3 the instrument (spec = `docs/frontend-design/color-picker.md` merged with the amended overlay packet P1–P10 incl. the pass-3 P8 `:140` clause); R.W4 suffusion; R.W5 hero-lab (slippable per Q1); R.W6 twin-tie (gate value.js-tree-local per M4); R.W7 wire+close.
3. **The fourier FN letter** — SYNTHESIS-v2 §6: the FN-1..FN-7 charter, paired-authored into `fourier-analysis/docs/tranches/N/` at R.W6 (FN-5 twin-currency invariant, FN-6 fourier-owned fixture reader, FN-7 doc-relocation + the CONSTELLATION.md pointer — both fourier-tree writes per M4).
4. **The glass-ui relay, two halves** — SYNTHESIS-v2 §8: (a) the **D8-1 NOW-relay is already dispatched** to the live BG agent (pass-2 time; §8.7, dispatch-homes B) — development *verifies at consume* (`vite.style-assets.ts:307/:366` `layer(components)`, then the 1440 no-shim probe retires the book); (b) the **R.W7 letter**, items 1–6: GAP-1 `uSatColor[]` (posture per Q8), GAP-2 `goo-blob→blob` MIGRATION row, GAP-3 the verified 16-specifier subpath table (+`/easing`, +`/tabs`), GAP-4 blob producer perf verify, GAP-5 ceremony carries, peer-floor `^1.0.0`→`^2.0.0` + the `/easing` 5-export contract.
5. **The kf KF-1 letter** — SYNTHESIS-v2 §9: dispatched at R.W1 inside the 2.0.0 cut — kf deletes `normalizeParam` + `NormalizedParam` + `VJS_PARAM_BUG_MAX`, reads `.name`/`.syntax`/`.default` directly, re-pins `^2.0.0`; the S7 lifecycle completes. (KF-2/KF-5/KF-6 are books; KF-3 is the R.W1 export guard; KF-4 is the R.W0 RELEASE.md `/math` line.)

**Standing evidence the waves consume**: the hoisted lane reports (`gamut-bound.md`, `boot-blast-radius.md`, `kf1-grammar.md` — now in this directory), `boundary-api.md` (the verbatim R.W1 API packet), `overlay-amendment.md` (the R.W3 merge packet), `easing-disposition.md` (the R.W4 consume packet), `dispatch-homes.md` (the R.W6 rescope + D8-1 record), `w0-truth.md` (the R.W0 inventory).

---

## §3 — THE OWNER Q-TABLE (8 rows, ~30 seconds each; extracted from SYNTHESIS-v2 §12)

| Q | The question | Recommended default | Cost of the alternative |
|---|---|---|---|
| **Q1** | Keep hero-lab in R as the slippable R.W5, or slip it to S now? | **Keep in-R, slippable** — nothing depends on it; it slips free at any point. | Slipping now merely re-letters the same work; no dependency breaks either way. |
| **Q2** | Retire the NCSU alias (X2, a maintainer on-host op) inside R.W7, or record it as a standing maintainer action? | **Standing maintainer action**; gate R.W7 only on X1/X3 — fire X2 inside W7 if you're at the keyboard. | Gating W7 on X2 makes the close wave wait on a human-at-host op. |
| **Q4** | Pin policy: keep `file:../glass-ui` + `file:../keyframes.js` deliberately (with adopt-event books + `boot-smoke` cold as the drift catch-all), recorded in CLAUDE.md? | **Keep `file:` deps** — registry pins during active co-development are theater; "3.13.0" and "BA 4.0.0" both went stale before mattering. | Registry-pin at 5.0.0 makes every glass-ui break an explicit version event, at the price of twice-disproven pin staleness. |
| **Q7** | Gamut α: **α=1.0** or **α=0.35**? (The only row gating library output — 2.0.0's `GAMUT_ALPHA`, `gamut.ts:242`.) | **α=1.0** — oracle-vivid pink `rgb(255,167,180)`, hue-exact (0.000°), free, 4.9× under full-cusp collateral; tiered bound ΔL 0.050 realistic-gamut / 0.083 authored-super-gamut. | α=0.35 is gate-strict (ΔL <0.05 everywhere) but under-cures: pink lands at 30% retention — weakly satisfying the U10 oracle. |
| **Q8** | `uSatColor[]` (three silent glass-ui slips): hard-ask "ride the 5.0.0 blob rebuild" or re-book with a named owner? | **Hard ask in the relay letter** — ride 5.0.0 as the natural rider, or name an owner explicitly. | A soft re-book invites the fourth silent slip; the U3 hero-blob residual stays open. |
| **Q10** | Parse-Lab: fuse into ColorInput (AST + gamut-verdict echo), or build a dedicated teaching pane? | **Fuse into ColorInput** — zero new library exports needed; KISS. | A detached pane is contrivance until arbitrary-`parseCSSValue` teaching demand is actually demonstrated. |
| **Q11** | Overlay default lens: **display-p3 with keyed override** (lens follows `selectedColorSpace` only when wide-RGB; caption always names the lens), or strict/keyed-only? | **B-with-override** — the shipped default space is `oklch`, so keyed-only would *never render the signature at first paint*. | Strict-B is a minor variant; keyed-only (Option A) demotes the one unforgettable thing to an easter egg and overrules the packet on the record. |
| **Q12** | Easing riders: (R-3) tighten the 15 approximated `bezierPresets` rows; (R-4) allow steps mode in gradient intervals? | **Ratify both** — R-3 makes the R.W4 migration sub-JND (worst 0.1923→0.0387); R-4: banded gradients are a design tool, pinnable via the picker's `mode` prop. | Declining R-3 leaves a recorded 2.9×-JND worst case on circ/expo; declining R-4 pins `mode` and loses a tool. |

Answered/resolved rows, closed on the record (no owner action): Q3 retro-tags ×10 · Q5 defect-fix · Q6 bundle-one-2.0.0 · Q9 fixture-inline/doc-stays/pointer→FN-7.

---

## §4 — Process lessons for R/FINAL.md

1. **Cut lane worktrees from the tranche head, and re-verify the base before trusting any tree-fact** (PASS2-VERDICT §5; SYNTHESIS-v2 §13). The pass-2 stale worktrees (`15b0382`, 3 commits behind) produced the pass's only two integrity defects — kf1's false "`extractFunctions` absent from source" finding and the SPEC's five-section amplification of it — and the contradiction was visible *inside the pass's own inputs* (boot-blast §1.2 had it right). When parallel lanes disagree on a tree fact, the synthesizer resolves it against the **live tree** before elevating either claim: cross-lane reconciliation is a synthesis obligation, not an optimization.
2. **Byte-identity of touched files does NOT imply suite-cleanliness at head** (pass-3 addition, from L2 §2/§6). The 4 KF-1 files were provably byte-identical across `15b0382..e80b359`, yet the head re-run failed 1 test — a *consumer of the changed surface* (`test/parsing-extract-functions.test.ts:36`) added at head-side `23d1a91` that the stale base could not contain. The carry argument covers the change; only a head re-run covers the change's *blast radius*. PASS2-VERDICT §5.1's stricter re-run ruling is vindicated: the "minutes of work" bought a real 5th-file finding that would otherwise have surfaced mid-R.W1.
3. **Record count drift; never silently reconcile it** (pass-3 addition, from L3 §3). The keyframes bare-specifier recount (12 per installed copy vs the critic's audit-time 48) was flagged as environment drift with both figures on the record — the qualitative fact the fix turns on was independently reproduced under either count. An unexplained delta silently "fixed" is a future integrity defect.
4. **Certify in the amended text, never the discharge lane's word.** All nine pass-3 certifications traced each mustFix to the amended text itself and re-verified the discharge's *new* citations against the live trees — which is exactly how lesson-2's residual was caught and canonized instead of laundered.
5. **Hoist worktree-authored reports before cleanup, with provenance lines** (W0-14, executed at pass 3): worktrees are ephemeral; evidence is not. Every amended document carries a datestamped `AMENDED AT PASS 3` provenance line so the corpus stays self-honest about what changed when.
6. **Unbounded safety claims never auto-ratify** (carried from pass 2, worth the FINAL.md ink): the gamut bound was measured *because bounded-beats-sampled*, and the measurement moved the disposition from auto-ratify to an armed two-option owner call. The model case.

---

**CONVERGED at 100/100. The convergence loop is closed. Hand §3 to the owner; open `docs/tranches/R/R.md`.**
