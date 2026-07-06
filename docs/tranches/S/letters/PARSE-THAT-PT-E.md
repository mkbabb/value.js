# PARSE-THAT-PT-E — the value.js 1.1.0+ ask letter

**To**: @mkbabb/parse-that. **From**: value.js Tranche S (item W1-9).
**Provenance**: `value.js docs/tranches/S/audit/SYNTHESIS.md §7.2` + `audit/lanes/parse-that-audit.md` §4.
**Status**: AUTHORED — **dispatched at S.W1 (W1-9)**, paired with the value.js-side decision on
the dead `expected` field.

**Standing context (the good news first)**: value.js's 1.0.0 consumption is verified clean
end-to-end (`parse-that-audit` §1) — packrat arming is a realized pure win at **82ns/parse**;
the 4 `.chain()` sites are provably falsy-seed-immune; the `^1.0.0` re-pin shipped as value.js
2.0.1 (`a7eabcc`) with `color2Into` currency green. No defect asks — everything below is 1.1.0+
surface.

---

## The asks (SYNTHESIS §7.2, transcribed)

| # | Ask | Priority |
|---|---|---|
| PT-E1 | **Scoped per-parse diagnostics** — cures the structurally-dead `ParseDiagnostic.expected` (value.js authors messages that today cannot reach any consumer; downstream, this unlocks real error messages for kf's `ResolvedKeyframes.diagnostics`). value.js pairs this with its own decision on the dead `expected` field (W1-9's value.js half) | **HIGH** |
| PT-E2 | **Combinator-inference tightening** — the `Parser<any>` inference leaks the audit named (parse-that-audit §4.2); tighter generic flow-through so consumer barrels stop widening | MED |
| PT-E3 | **Pratt stays dormant — on the record**: the calc() 2-tier fold transposition "does not clear a KISS/DRY bar" (parse-that-audit §4.3). value.js will NOT pull it forward; the S.H3 consume-edge book fires only when parse-that presents the sketch. This row is a record, not an ask | record |

## Non-motion (recorded)

No parse-that source is touched on value.js's account (SYNTHESIS §4). The value.js parse layer's
own P0s (`round()` crash, extract depth-walk, `fail()` message merge) are value.js-side fixes at
S.W1 — named here only so the diagnostics ask (PT-E1) is read against a consumer that already
routes its own authored messages correctly post-W1-4.
