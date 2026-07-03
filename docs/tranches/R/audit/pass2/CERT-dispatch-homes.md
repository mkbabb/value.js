# CERT · pass3 dispatch-homes

**Critic**: Pass-3 certification · **Date**: 2026-07-02 · **Target**: `docs/tranches/R/audit/pass2/dispatch-homes.md`
**Ancestor critique**: `CRIT-dispatch-homes.md` (pass-2 score 88, 1 mustFix: D1) · **Backlog row**: PASS2-VERDICT §3 M4
**Verdict**: CERTIFY · **Convergence**: 100%

---

## (a) mustFix discharge — verified in the amended TEXT (not the lane report's word)

The single pass-2 defect (**D1** — CONSTELLATION.md pointer mislabeled "value.js-side, unilateral, in-scope") and its consolidated backlog row (**PASS2-VERDICT §3 M4**) are the only rows targeting this item. M4's four required sub-fixes are each present in the amended text:

1. **Pointer booked to FN-7 alongside the relocation (fourier-tree write).** `dispatch-homes.md:31` (A.2 heading) — "the CONSTELLATION.md pointer + relocation both BOOKED to FN-7". A.2 body `:33` — "The **CONSTELLATION.md pointer** … is a **fourier-tree write** and **books to FN-7 alongside the relocation**. Do **not** … treat the pointer as an R.W6 value.js deliverable." The old "value.js-side edit … in-scope, unilateral, cheap" framing is gone and explicitly retracted as the pass-2 error at `:35–36`. ✓
2. **R.W6 value.js deliverable is an in-tree artifact.** `:33` + `:40` (Net) — "R.W6's value.js work is **the in-tree contract-of-record note + the inline fixture rows + the recorded invariant** — all value.js-tree-local." Backed by the live `diff.test.ts:5-6` docstring. ✓
3. **R.W6 gate rescoped to value.js-tree state only.** `:46` — "**Gate (value.js-tree state only, M4)**: … The CONSTELLATION.md pointer and the fourier-N charter are fourier-tree paired-authoring work, **not** value.js-local gate conditions. **Gates on nothing outside this repo.**" ✓
4. **Fixture form committed to ONE option — inline rows** (pass-2 minor asked to pick one). Uniform across `:18` (A.1 heading), `:20`, `:45` (A.3 REPLACE wording), `:107` (summary table). No residual "co-located JSON **or** inline" ambiguity survives. ✓

The pass-2 critic's own discharge findings for **§5 #9**, **§5 #11**, and the **§6.1 dissent** were already marked DISCHARGED and are untouched by the amendment; PART B and the fixture half were declared airtight at pass 2 and are unchanged.

## (b) Load-bearing citations spot-checked against the live trees

| Claim (dispatch-homes) | Live-tree check | Result |
|---|---|---|
| `CONSTELLATION.md` exists only in fourier (`:33/:36`) | `find` value.js + fourier | value.js: **none**; fourier: `docs/constellation/CONSTELLATION.md` (+ `docs/tranches/A/coordination/`). ✓ Premise holds |
| `diff.test.ts:5-6` docstring names `J-diff-shape.md` §3/§4 as binding (A.0 `:14`; A.2 `:33`) | `sed -n '1,10p' api/test/conformance/diff.test.ts` | Docstring cites `fourier-analysis/docs/tranches/J/design/J-diff-shape.md §3/§4` as the source of rules. ✓ |
| Doc lives at `fourier .../J/design/J-diff-shape.md` (`:33`, summary `:108`) | `find` fourier | Exact match. ✓ |
| `vite.style-assets.ts:307` = `const compImport = '@import "./components.css";'` (B.0 `:56`, B.3 `:87`) | `sed -n '307p'` glass-ui | Exact. ✓ |
| `:308` idempotency guard (B.3 `:89`) | `sed -n '308p'` | `if (indexSrc.includes(compImport)) return;` ✓ |
| `:366` generic fold emitter (B.0 `:57`) | `sed -n '366p'` | `folds.map((f) => \`@import "${f}";\`)` ✓ |
| `DEFERRED_FOLDS` members `../glass-ui.css` + `./components.css` (B.0 `:57/:59`) | `critical-partition.mjs:102–104` | Array @ `:102`; `"../glass-ui.css"` `:103`, `"./components.css"` `:104`. The "layer components.css ONLY, never the SFC-fold" catch is real. ✓ |
| `dist/styles/deferred.css:33` unlayered import (B.0 `:57`, B.3 `:84`) | `sed -n '33p'` dist | `@import "./components.css";` ✓ |
| glass-ui live on `tranche/BG` — "dispatch NOW" premise (B.1 `:65`) | `git branch --show-current` | `tranche/BG` ✓ |

All spot-checks pass to the digit.

## (c) No new error introduced by the discharge

- The amendment is confined to PART A (contract-doc + fixture-form wording) + the header provenance line + the two summary-table rows; PART B is byte-unchanged and its citations re-verified live above — no regression.
- Internal consistency: `grep`-equivalent read of the file finds no surviving "unilateral" / "value.js-side edit" ownership claim for the pointer; the only occurrences are the corrective retraction (`:35–36`) that names it as the pass-2 error. The fixture form is uniformly "inline rows"; the pointer is uniformly a fourier-tree write booked to FN-7; the R.W6 gate is uniformly value.js-tree-local (A.3 `:46`, summary `:108`).
- The in-tree contract-of-record note (the new R.W6 value.js deliverable) is well-defined and value.js-tree-local (a one-line R-docs note leaning on the already-live `diff.test.ts:5-6` docstring) — no phantom cross-repo dependency reintroduced.

## Cosmetic residuals (explicitly below the certification bar)
None material to this item. The pass-2 minor (fixture JSON-vs-inline ambiguity) was itself resolved by M4. No blocking defect remains.

## Bottom line
D1 / §3 M4 fully discharged in the amended text; every load-bearing citation holds against the live trees; the discharge introduced no new error and no fresh cross-repo coupling. This is a certification pass and no NEW blocking defect exists that would change what an implementer builds. **Score 100; mustFix empty.**
