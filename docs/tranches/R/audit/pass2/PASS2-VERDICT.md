# PASS2-VERDICT — Tranche R, Pass-2 agglomeration

**Synthesizer**: Fable (pass-2 final synthesis) · **Date**: 2026-07-02 · **Branch**: `tranche-q` @ `e80b359` (value.js 1.2.0)
**Inputs**: `SYNTHESIS-v2.md` (391 lines) + 8 burn-down lane reports (5 in `docs/tranches/R/audit/pass2/`, 3 inside their impl worktrees — see §1 note) + 9 critiques (`CRIT-*.md`) + independent spot-verifications performed by this synthesis (recorded in §5).
**Ancestor**: `docs/tranches/R/audit/pass1/PASS1-VERDICT.md` (mean 87.8%, min 84%).

---

## §1 — Convergence scoreboard

| Item | Pass-2 | mustFix | Pass-1 ancestor | Standing |
|---|---|---|---|---|
| SPEC-V2 (`SYNTHESIS-v2.md`) | 91% | 2 | SPEC 88% | All 20 §5 rows + both §6 dissents discharged; one refuted factual claim (`extractFunctions`) elevated across 5 sections — text-only remediation |
| gamut-bound (worktree-1) | 97% | 0 | proto-gamut-policy 84% | **Co-signable as the R.W1 head.** Bound measured honestly (0.083 > the 0.05 gate → headline revised, Q7 two-option); knee REFUTED; mislabel corrected |
| boot-blast-radius (worktree-2) | 98% | 0 | proto-boot-cascade 88% | **Co-signable.** All four vite modes proven; dev-config-only (71-file dist byte-parity); exports-map-generated aliases kill the bug class by construction |
| kf1-grammar (worktree-3) | 89% | 3 | (pass-1 diagnosis only) | Core fix prototyped GREEN and ports to head; ships one false side-finding + a misstated baseline (stale-worktree artifacts) |
| w0-truth | 93% | 1 | R1/R8 84–90% | Every disposition and gate reproduced to the digit; one per-file citation mis-attribution (line 31) |
| overlay-amendment | 93% | 1 | proto-gamut-overlay 88% | All 4 ancestor mustFixes discharged by real re-derivation; one residual old-semantics phrase (`color-picker.md:140`) falsifies its own §0 zero-orphan claim |
| boundary-api | 97% | 0 | proto-gamut-overlay 88% | **Co-signable.** §5 #10 fully discharged: exact surface, Into twin, matrix visibility resolved, R.W1 named |
| easing-disposition | 93% | 2 | proto-glassui-consume 90% | Central overturn (zero-drop) TRUE end-to-end; two record-completeness gaps (bbnf-buddy sweep; semver conditioning) |
| dispatch-homes | **88% ← MINIMUM (loop gate)** | 3 | proto-golden-vectors 89% | Fixture half + D8-1 relay airtight; the CONSTELLATION.md pointer mislabeled "value.js-side, unilateral" — it is a fourier-tree write |
| **MEAN** | **93.2%** | | 87.8% | +5.4 |
| **MINIMUM** | **88%** | | 84% | +4 — governs the loop; Pass 3 required, but see §4: **no fleet** |

> **Report-location note**: `gamut-bound.md`, `boot-blast-radius.md`, `kf1-grammar.md` live at `.claude/worktrees/wf_d9a4e4d9-899-{1,2,3}/docs/tranches/R/audit/pass2/` (read-only-main-tree discipline). Worktree HEADs verified this pass via `git worktree list`: **-1 @ `15b0382` (stale)**, **-2 @ `e80b359` (self-corrected)**, **-3 @ `15b0382` (stale)** — the staleness that produced kf1-grammar's false §6 finding. Hoisting is R.W0 item W0-14; the pass-3 edits to these two reports should hoist them in the same motion.

No lane's *verdict* was overturned by its critic. Three packets carry empty mustFix and are co-signable as-is. Every remaining deduction is a text edit — no measurement, no prototype, no design decision is outstanding except one mechanical test re-run (§3 M3).

---

## §2 — Deltas vs Pass 1

### 2.1 PROVED at Pass 2 (survived independent critic re-verification against the live trees)

1. **The α=1.0 mid/dark bound is now MEASURED, and it moved the answer** (closes PASS1 §4.1 / §5 P0#2): worst-case non-light ΔL = **0.0834** @ `oklch(0.30 0.40 210°)` on the extended 164-color corpus — the critic's `<0.05` auto-ratify gate **FAILS**, refuting PASS1-VERDICT §6.2's own ≈0.03 estimate. Tiered bound: 0.050 realistic-gamut / 0.083 authored-super-gamut. Hue held 0.000° mean AND max; MINDE stays rejected (~6–7× cost); the α-tune family still wins outright. The R.W1 head is a **two-option Q7 owner call** (α=1.0 recommended, oracle-vivid pink `rgb(255,167,180)`; α=0.35 gate-strict fallback, worst 0.0479). The knee claim is **REFUTED** — light-retention climbs monotonically to 51.3% at α=2.0; α=1.0 is a diminishing-returns elbow, not a plateau. (gamut-bound §2–§3; critic reproduced every number to the digit.)
2. **The boot cure is proven across ALL FOUR vite modes and is dev-config-only** (closes §4.2 / §5 P0#3 + P1#12): production dist byte-identical (71 files, sha-verified); dev cold-cache PASS with baseline FAIL on the exact `/math` "Not a directory" error; gh-pages/hero-lab advance past the LOAD phase where the bug lived. The stronger fork was taken: aliases **generated from `package.json#exports`** (8 anchored regexes), collapsing the regex↔exports-map drift axis to zero by construction. No dist change, no republish, decoupled from every publish gate.
3. **The KF-1 grammar fix is working code** (closes §4.5 / §5 P0#1): `topLevelColonIndex` + first-top-level-colon split + whitespace name/`syntax` split, spec-faithful to `<custom-property-name> <css-type>? [ : <default-value> ]?`; serializer mirrored; tests rewritten off the CORRECT grammar; targeted 69/69 + tsc exit 0 in the worktree. kf 5.1.0's `normalizeParam` deletion map verified accurate against `resolve-function.ts:35/:69-92/:122-135`. Q5 collapses to a defect fix (the record-as-canonical fallback stays struck); Q6 answered **bundle into one 2.0.0**. The fix **ports to head**: `git diff 15b0382 e80b359 -- src/parsing/stylesheet.ts src/parsing/serialize.ts test/grammar-2026-atrules.test.ts` is **empty** (re-verified by this synthesis).
4. **The easing "13-of-24 drop" premise was factually WRONG — zero names drop** (closes §4.6 / §5 P0#5, by verified overturn): `EasingPicker`'s preset catalogue IS value.js `bezierPresets` (23 of 24 `GRADIENT_EASING_NAMES` verbatim; `src/easing.ts:334-373`, glass-ui `useEasingPicker.ts:117`); the 24th, `smooth-step-3`, is **exactly** `cubic-bezier(⅓, 0, ⅔, 1)` (verified analytically by the critic, independent of the scripts). The residual is a quantified numeric substitution — worst deviation 0.1923 (`ease-out-circ`) driven to 0.0387 by the optional Rider-2 preset tightening (sub-JND: 0.0117 ΔE_ok vs 0.058). Disposition A (author-a-curve consume), no relay ask, no interim.
5. **Q9 resolved on a decisive verified fact** (closes §4.7 / §5 P1#9): value.js's api conformance suite has **zero cross-repo filesystem reads** (the only J-diff-shape mentions are docstrings — `api/test/envelope.test.ts:9`, `api/test/conformance/diff.test.ts:5-6`); the fixture lands in-tree in value.js, read locally. The doc-relocation half is booked to fourier FN-7. (The pointer mechanics carry the one defect — §3 M4.)
6. **The D8-1 producer site was corrected and the dispatch decided** (closes §4.8 / §5 P1#11): the unlayered `@import "./components.css"` is **build-emitted** at glass-ui `vite.style-assets.ts:307/:366` — NOT in `src/styles/index.css` (pass-1's `:258` cite was the dist artifact); the fix must layer ONLY `./components.css`, never the SFC-fold `../glass-ui.css` (`critical-partition.mjs:102`). Zero-collateral verified on the 53 KB dist file. Dispatch **NOW** to the live BG agent; the R.W2 no-shim gate splits internal/external accordingly.
7. **The `@mkbabb/keyframes.js` devDep is KEPT — a live transitive consumer** (closes §4.10-adjacent / seed 10): kf dist `sequence-C_DCiOIQ.js` imports `@mkbabb/value.js/math`; the devDep provisions glass-ui's `keyframes.js ^5.0.0` peer through the demo graph. N.W9′'s "phantom devDep" premise is REFUTED. Retro-tag count **10** verified commit-by-commit against the npm registry; P/Q tranche dirs confirmed nonexistent; the CLAUDE.md `parse-that ^0.7.0` vs live `^0.13.0` doc-drift is a genuine net-new W0 catch.
8. **The snap-resist beat is re-specced as corrected physics, and the default-lens question survives into the merged text** (closes §4.3, §4.4 / §5 P0#4): detent-not-wall at the ΔE>JND contour, outbound-only, model value held; Q11 (NEW) tables B-with-override vs strict-B with the F3 evidence — strengthened by a live-tree fact the ancestor lacked: the shipped default space is `oklch` (`color-picker/index.ts:37`), so Option A's signature would never render at first paint.
9. **`sampleGamutBoundary(hueDeg, target, {columns, mode})` + `sampleGamutBoundaryInto` committed to R.W1** (closes §4.9 / §5 P1#10): placed in `src/units/color/boundary.ts` beside `gamut.ts`; matrices resolved package-internal (`xyz-extended.ts:46/52/88/96/104/112` `const → export const`, absent from barrels — `conversions/index.ts` verified named-export, no leak); token-free; goldens sequenced AFTER the Q7 α ratification.
10. **NEW P0 discovered by exercising the modes** (net-new to the R slate): glass-ui 4.2.0 deleted compound `Tabs`/`TabsList`/`TabsTrigger`/`TabsContent`; `demo/@/components/ui/tabs/index.ts:1` dead-imports all four; **gh-pages and hero-lab cannot build** until the 10 consumers migrate to `SegmentedTabs` (or reka-ui-direct, proven fallback). New R.W2 item; the `abrogation-sweep.mjs` blind spot (specifier-liveness, not named-export existence — `scripts/abrogation-sweep.mjs:60-110`) is documented.

### 2.2 REFUTED at Pass 2 (strike-list additions — these claims appear in no forward document)

| Refuted claim | Where it lived | Killed by |
|---|---|---|
| "13 of 24 easings drop; ratify the drop or relay-ask" | PASS1-VERDICT §4.6/§5 P0#5 premise | easing-disposition (verified overturn on three independent axes) |
| PASS1-VERDICT §6.2's ≈0.03 worst-case estimate + the "ratify-as-specced-with-zero-text-changes" auto-path | PASS1-VERDICT §6.2 | gamut-bound §2.2 (measured 0.0834; the dissent compared a max to a mean) |
| "α=1.0 is the natural knee/plateau" | proto-gamut-policy assertion | gamut-bound §3 (monotonic to 51.3% at α=2.0) |
| "`extractFunctions` absent from source; a fresh build drops it" | kf1-grammar §6/§8.3 → SYNTHESIS-v2 §0.2/§3/§9/§10/§11 | CRIT-SPEC-V2 §A + CRIT-kf1 D1 — in source since 1.1.0 (`23d1a91`): `src/parsing/extract.ts:124`, `src/index.ts:291`, `src/subpaths/parsing.ts:47` (re-verified by this synthesis) |
| "The 1.0.2 self-install has nothing to resolve to" | proto-boot-cascade | boot-blast-radius (real dir @ 1.0.2; critic re-verified) |
| "The CONSTELLATION.md pointer is a value.js-side, unilateral, in-scope edit" | dispatch-homes A.3 + R.W6 gate row | CRIT-dispatch D1 — the file exists at exactly one location: `fourier-analysis/docs/constellation/CONSTELLATION.md` (re-verified by this synthesis) |
| J-diff-shape.md at `docs/tranches/B/coordination/` | pass-1 SYNTHESIS §5:140 | dispatch-homes (actual: `fourier-analysis/docs/tranches/J/design/J-diff-shape.md`) |
| "The demo's unlayered components.css import lives in glass-ui `src/styles/index.css:258`" | proto-boot-cascade/pass-1 | dispatch-homes B (build-emitted at `vite.style-assets.ts:307/:366`; `:258` is the dist artifact) |

### 2.3 OPEN after Pass 2

1. **The owner-ratification rows** — Q1, Q2, Q4, Q7, Q8, Q10, Q11, Q12 (SYNTHESIS-v2 §12): pure preference, each carrying a recommended default and full costing. **No pass can close these; they close at ratification.** Q7 (α=1.0 vs α=0.35) is the only one that gates library output.
2. **The 2.0.0-vs-1.3.0 scheduling contingency** inside the answered Q6 — the easing packet's Rider-2 "no extra semver event" claim must carry the 1.3.0-branch conditioning sentence (§3 M6); the SPEC's bundle answer already documents the split as contingency-only.
3. **Tabs migration shape** (R.W2): whether `SegmentedTabs` drop-in-covers the 10 consumers is decided at implementation; the reka-ui-direct fallback is build-proven, so the risk is bounded (SYNTHESIS-v2 §13 risk 1).
4. **The KF-1 head-measured suite count** — the "1877/1877" is a 1.0.2-base number; discharged by the mechanical re-run in §3 M3.

---

## §3 — Consolidated mustFix backlog (deduped; **every item is a text edit except M3's one test run**)

| # | Fix | Sources (deduped) | Target file(s) |
|---|---|---|---|
| **M1** | **Correct the `extractFunctions` claim everywhere**: in source since 1.1.0 (`23d1a91`) at `src/parsing/extract.ts:124`, exported `src/index.ts:291` + `src/subpaths/parsing.ts:47`; a fresh build keeps it. SPEC: fix §0.2, §3 R.W1 item 3 + its gate clause, §9 KF-1b, §10 ledger, §11 P0#1; demote KF-1b to a trivial fresh-build `.d.ts` assertion (or strike); delete "blocking the KF-1 letter". kf1 report: strike §6 + §8 point 3 (the phantom R.W1 sub-item) | CRIT-SPEC-V2 #1 ≡ CRIT-kf1 #1 | `SYNTHESIS-v2.md` (→v3), `kf1-grammar.md` |
| **M2** | **Record the worktree staleness honestly**: worktrees 1 (gamut-bound) and 3 (kf1-grammar) sat at `15b0382` (3 commits stale) and did NOT self-correct as boot-blast did — add to §13's process lesson (which currently names only the lane that self-corrected). Correct kf1's header/status baseline (`15b0382`/1.0.2, not `e80b359`/1.2.0); state the fix carries because the 4 touched files are byte-identical across `15b0382..e80b359` (verified empty diff, twice); note gamut-bound's base is measurement-equivalent (`gamut.ts` delta = one appended P-era function, `GAMUT_ALPHA` core untouched — nothing re-runs) | CRIT-SPEC-V2 #2 ≡ CRIT-kf1 #2 | `SYNTHESIS-v2.md` §13 + §3 R.W1 item 2, `kf1-grammar.md` header |
| **M3** | **Re-measure the KF-1 suite at `e80b359`** (the sole non-doc item — one mechanical run): re-apply the 4-file worktree diff (+141/−30) on the head (clean apply guaranteed by M2's byte-identity), run the full vitest suite, restate the counts (`grammar-2026-atrules.test.ts` is 31 at head vs 37 in the worktree — the fix adds 6). Add `src/subpaths/parsing.ts:40` to the `CustomFunctionParameter` rename-sweep note (the public type spans both barrels) | CRIT-kf1 #3 | worktree-3 reset (or head-side scratch apply) + `kf1-grammar.md` §4/§9 |
| **M4** | **Fix the CONSTELLATION.md pointer ownership** (adopt the critic's fix-shape 1 — this synthesis's recommendation, §5.2): book the pointer to fourier-N/FN-7 **alongside the relocation** (it lands where the doc lands — a fourier-tree write, honoring the read-only-main-trees precept and the doc's own asymmetry logic); make R.W6's value.js-side deliverable an artifact in value.js's OWN tree (the existing `diff.test.ts:5-6` docstring already names J-diff-shape §3/§4 as binding — a one-line contract-of-record note in R docs suffices); **rescope the R.W6 gate to depend only on value.js-tree state**; commit the fixture form to **inline rows in `diff.test.ts`** (or the co-located JSON — pick ONE and name it in the R.W6 wording) | CRIT-dispatch D1 + D1b + minor | `dispatch-homes.md` A.3 + gate row; `SYNTHESIS-v2.md` §5/§3-R.W6 mirror |
| **M5** | **Sweep `color-picker.md:140`**: extend P8 with a one-phrase REPLACE of "the sRGB gamut boundary" in the MATHEMATICS pillar clause → the wide-target JND-contour framing (e.g. "the wide-gamut truth line — display-p3 vs sRGB, ΔE>JND — + perceptual isostep graticule made beautifully visible"); add the row to the §7 zero-drop ledger, restoring the §0 zero-orphan claim to truth. (Optional same-motion nits: renumber the P4→P6 gap; note the `spectrumDotStyle` spans `:226-243` for the R.W3 merge pass) | CRIT-overlay #1 (+nits 2–3) | `overlay-amendment.md` P8 + §7 |
| **M6** | **Complete the easing record**: (a) add the bbnf-buddy consumer sweep — `bbnf-buddy/src/animation/easingGroups.ts:11` imports `bezierPresets`/`timingFunctionDescriptions`; usage is name-membership only (`isBezier: name in bezierPresets`, `:32`); dep pinned registry `^0.10.0` (`package.json:25`) — semver-fenced from Rider 2, and Rider 1's eventual `isBezier` flip is the correct classification (re-verified by this synthesis); (b) condition Rider 2's "costing no extra semver event" on the Q6 bundle: one sentence naming the 1.3.0 branch — R-3 defers to the eventual major or is itself major-forcing | CRIT-easing #1 + #2 | `easing-disposition.md` §2.2/§4 |
| **M7** | **Fix the w0-truth line-31 attribution**: `sequence-C_DCiOIQ.js` imports only `@mkbabb/value.js/math`; the 48 bare `@mkbabb/value.js` specifiers live in other keyframes dist chunks. Conclusion (live `/math` consumer → KEEP) unchanged | CRIT-w0 #1 | `w0-truth.md` :31 |
| — | *SPEC should-fixes, fold into the M1/M2 edit*: GAP-3 letter ships the *verified* specifier enumeration (`/styles/animations` is a comment-only mention at `animations.css:3`; `@mkbabb/glass-ui/styles.css` at `style.css:53` is real and unlisted); §8.6 peer-floor wording ("currently `^1.0.0`; `^1.1.1` planned at BH B2.1-swap"); record residual-risk-2 as already-discharged (`conversions/index.ts` named-export form verified) | CRIT-SPEC-V2 §C 1–3 | `SYNTHESIS-v2.md` §8.3/§8.6/§13 |

**Not in the backlog** (empty-mustFix, co-signable as-is): gamut-bound, boot-blast-radius, boundary-api. Their cosmetic residuals (MINDE band "~6–7×"; the hue-210 example mismatch; "five vs six identifiers") are recorded in their critiques and may ride any future edit; none blocks.

---

## §4 — NEXT-PASS SEEDS

**The residue is purely mechanical: six doc edits + one test re-run. NO FLEET IS NEEDED.** The orchestrator can discharge M1–M7 directly next pass — no prototype, no measurement (beyond M3's single `npm test`), and no design decision remains open at pass level (M4's two-option fork is resolved by this verdict's recommendation, §5.2). SYNTHESIS-v2 §13's "no prototype orders" disposition is CONFIRMED by all nine critiques: no critic requested new evidence, only corrections to the record of evidence already gathered.

Seeds, in dependency order (1–2 before 3, since SPEC-v3 must absorb the corrected lane reports; 4–7 independent):

1. **spec-v3-edit** (M1+M2+§C): amend `SYNTHESIS-v2.md` in place → the `extractFunctions` correction across §0.2/§3-R.W1(items 2,3 + gate)/§9-KF-1b/§10/§11-P0#1; the two-worktree staleness record in §13; the 1877/1877 stale-base annotation; the three §C should-fixes. Text-only.
2. **kf1-head-reverify** (M1+M2+M3): strike kf1-grammar §6/§8.3, correct the baseline header, add `subpaths/parsing.ts:40` to the rename sweep; re-apply the 4-file diff at `e80b359` and re-run the full suite; restate counts at head. One mechanical run; hoist the amended report to `docs/tranches/R/audit/pass2/` (W0-14) in the same motion, with `gamut-bound.md` and `boot-blast-radius.md`.
3. **dispatch-homes-rescope** (M4): apply fix-shape 1 — pointer booked to FN-7 with the relocation; R.W6's value.js deliverable in-tree; gate rescoped to value.js-tree state; fixture form committed to inline rows in `diff.test.ts`. Mirror the rescope in SPEC-v3 §5 + §3-R.W6. Text-only.
4. **overlay-140-sweep** (M5): the one-phrase P8 REPLACE + §7 ledger row. Text-only.
5. **easing-record-close** (M6): the bbnf-buddy paragraph + the 1.3.0-branch sentence. Text-only.
6. **w0-line31** (M7): the one-line attribution fix. Text-only.

After these, every packet's mustFix is empty and the specification is ratification-ready on its own §13 terms; the pass-3 verdict should be a short re-score confirming ≥95 minimum, then hand the Q-table (Q1/Q2/Q4/Q7/Q8/Q10/Q11/Q12) to the owner.

---

## §5 — Overrules, reconciliations, and this synthesis's own verifications

**No critic verdict is overruled.** All nine critiques stand; their mustFixes are absorbed in §3. Three reconciliations, recorded:

1. **CRIT-kf1 #3 vs CRIT-SPEC-V2 #2 timing tension** (re-run the suite *before SPEC-v2 lands it* vs *annotate now, re-run at R.W1*): this verdict adopts the **stricter** form — do the mechanical re-run next pass (seed 2). It is minutes of work, and it converts SPEC-v3's KF-1 row from an annotated stale number into a head-measured one; the weaker annotate-and-defer form would leave a conditionality alive into ratification for no savings.
2. **CRIT-dispatch D1's either/or is resolved in favor of fix-shape 1** (book the pointer to FN-7; do not declare CONSTELLATION.md a shared append-index). Grounds: (a) the read-only-main-trees precept binds R lanes *now*, and no evidence of a shared-index convention was produced by any lane across two passes; (b) the doc's own asymmetry logic (relocation = bilateral → FN-7) applies with identical force to a write into the same tree; (c) fix-shape 1 leaves the R.W6 gate purely value.js-local, which is the entire design intent of the fixture half (A.1). If fourier's owner later ratifies a shared-index convention, the pointer lands with FN-7 anyway — nothing is lost by booking it.
3. **The overlay critic's two nits (P5 numbering; `spectrumDotStyle` span) are folded into M5 as optional** — they are below the mustFix bar by the critic's own ruling and should not gate the sweep.

**Independent verifications performed by this synthesis** (none taken on faith from the critiques):
- `git worktree list`: worktree-1 and -3 at `15b0382`, worktree-2 at `e80b359` — the staleness record in M2 is fact.
- `extractFunctions`: `src/parsing/extract.ts:124` (`export const extractFunctions = (`), `src/index.ts:291`, `src/subpaths/parsing.ts:47`; `git log -S` pins the landing at `23d1a91` "Tranche P (1.1.0)". M1's correction is fact.
- `git diff --stat 15b0382 e80b359 -- src/parsing/stylesheet.ts src/parsing/serialize.ts test/grammar-2026-atrules.test.ts`: **empty** — the byte-identity carry argument holds.
- `CONSTELLATION.md`: exists at `fourier-analysis/docs/constellation/CONSTELLATION.md`; no such file anywhere in value.js. M4's premise is fact.
- `docs/frontend-design/color-picker.md:140`: the TEMPERED pillar bullet carries "MATHEMATICS (the sRGB gamut boundary + perceptual isostep graticule…)" verbatim — M5's orphan is live.
- bbnf-buddy: `easingGroups.ts:11` imports, `:32` `isBezier: name in bezierPresets` (membership only), `package.json:25` `"@mkbabb/value.js": "^0.10.0"` — M6(a)'s benign-outcome record is fact.

One process observation for R/FINAL.md, extending SYNTHESIS-v2 §13's lesson: **stale worktrees produced the only two integrity defects of the pass** (kf1's false §6; the SPEC's five-section amplification of it), and the contradiction was already visible *inside the pass's own inputs* (boot-blast §1.2 names `extractFunctions` as a P/Q-era source export). The general rule: when parallel lanes disagree on a tree fact, the synthesizer must resolve the disagreement against the live tree before elevating either claim — cross-lane reconciliation is a synthesis obligation, not an optimization.
