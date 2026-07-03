# CERT · kf1-grammar (Pass-3 certification)

**Critic**: Pass-3 · **Date**: 2026-07-02 · **Target**: `docs/tranches/R/audit/pass2/kf1-grammar.md`
**Ancestor critique**: `CRIT-kf1-grammar.md` (pass-2 score 89, 3 mustFix) + PASS2-VERDICT §3 rows M1/M2/M3
**Discharge lanes reviewed**: `L2-kf1-reverify.md` (also `L1-spec-v3.md`, `L3-doc-sweeps.md` — not kf1-targeted)

**convergencePct: 100** · **verdict: CERTIFIED**

---

## 1. Discharge audit — every prior mustFix, checked against the amended text (not the lane's word)

**CRIT-kf1 #1 ≡ PASS2-VERDICT M1 (kf1 half) — strike §6 and §8 point 3.** DISCHARGED.
- §6 header (`kf1-grammar.md:107`) now reads `~~…~~ — **STRUCK (M1: FALSE — stale-worktree artifact)**`; the body (`:109-115`) is a struck blockquote conceding `extractFunctions` is in source since 1.1.0.
- §8 point 3 (`:148`) is struck (`~~…~~`) with the "nothing to restore" note.
- Verified against the live tree at `e80b359`: `src/parsing/extract.ts:124` (`export const extractFunctions = (`, header comment `:99`); `src/index.ts:291` re-export; `src/subpaths/parsing.ts:47` re-export. `git log -S "export const extractFunctions" -- src/parsing/extract.ts` → landed at `23d1a91` (Tranche P, 1.1.0), exactly as the strike states.

**CRIT-kf1 #2 ≡ PASS2-VERDICT M2 (kf1 half) — correct the baseline.** DISCHARGED.
- Header (`:6`) now states the true worktree base `15b0382` (v1.0.2), "3 commits STALE", and flags the original "`e80b359` (1.2.0)" as aspirational.
- Status (`:7`) records the byte-identity carry argument (4 files identical across `15b0382..e80b359`, "verified twice").
- Verified: `git diff --stat 15b0382 e80b359 -- src/parsing/stylesheet.ts src/parsing/serialize.ts test/grammar-2026-atrules.test.ts test/round-trip.test.ts` → **empty**. The carry argument holds; the patch applies clean at head.

**CRIT-kf1 #3 ≡ PASS2-VERDICT M3 — re-measure at `e80b359` + add `src/subpaths/parsing.ts` to the rename sweep.** DISCHARGED.
- §4 (`:84-87`) and §9 (`:159`) restate counts head-measured: clean head **1934 / 51 files**; patched **1939 passed / 1 FAILED / 1940**; `grammar-2026-atrules.test.ts` **31 base → 37 patched (+6)**; targeted **69**; `tsc -p tsconfig.lib.json` exit 0. The stale "1877/1877 (46 files)" is flagged as the 1.0.2 base.
- §8 item 1 (`:146`) adds **both** the second barrel `src/subpaths/parsing.ts:40` and `test/parsing-extract-functions.test.ts:36` to the sweep. Verified: `grep` confirms `src/subpaths/parsing.ts:40` re-exports `CustomFunctionParameter`.

---

## 2. New-finding review — the M3 re-run surfaced a fact; it strengthens, does not defect

The re-measure was **not** the clean run M3 anticipated: `test/parsing-extract-functions.test.ts:36` fails under the patch. The amended text (`:86`, §8 item 1, §9) attributes this correctly, and I verified every element:
- The failing line reads `expect(desc!.parameters![0]!.type).toBe("<number>")` on input `@function --double(--x: <number>)` (confirmed `test/parsing-extract-functions.test.ts:27,36`).
- The rename `type→syntax` removes `.type` → undefined (correct).
- Under the corrected single-top-level-colon grammar, the colon-after-name form `--x: <number>` parses to `{name:"--x", default:"<number>"}` — the value lands on `.default`, not `.syntax` (the report's remediation options are both correct).
- Provenance: the test file was added at `23d1a91` (Tranche P), **absent** at the `15b0382` worktree base — which is precisely why the prototype's suite showed "zero stray consumers." Verified via `git log -S`.
- No other consumer: `grep` over `demo/` + `api/` source for `.defaultValue` / `param.type` hits only `node_modules` noise. The only real reader of the renamed field is this one test line.

This is a **completeness gain**: the discharge identified a 5th file the R.W1 implementer must sweep (one assertion line). It changes what an implementer builds — correctly, in the direction of a more complete work-order — and is fully documented in the spec-facing sections. It is not a defect in the parser fix (all 8 §4 vectors remain correct) and does not block.

---

## 3. Certification

Every pass-2 mustFix row targeting this item is discharged in the amended text — verified by reading the text and re-checking each load-bearing citation against the live tree at `e80b359`, not by trusting the lane report. No discharge introduced a new error; the one new fact (the P-era test failure) is accurately characterized and strengthens the R.W1 spec. The cosmetic residuals the pass-2 critic already ruled below-bar are untouched and remain below-bar.

No concrete, named, blocking defect remains that would change what an implementer builds. Per the certification rule, the score **is 100**.

### mustFix
(none)
