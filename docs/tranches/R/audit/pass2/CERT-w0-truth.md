# CERT-w0-truth — Pass-3 certification critic

**Target:** `docs/tranches/R/audit/pass2/w0-truth.md` (pass-2 score 93) · **Pass:** 3 (certification) · **Date:** 2026-07-02
**Method:** verify the single binding mustFix (CRIT-w0 #1 ≡ PASS2-VERDICT §3 M7) is ACTUALLY discharged in the amended text; spot-check load-bearing citations against the live trees; confirm the discharge introduced no new error. Certification pass, not discovery.

---

## §1 — Verdict

**Convergence 100%. CERTIFIED.** The one binding mustFix (M7 / CRIT-w0 #1) is discharged in the amended text — not paraphrased. The discharge's new factual claims are independently reproduced to the digit against the live tree. No new defect that would change what an implementer builds. mustFix empty.

---

## §2 — mustFix discharge audit (the one row that binds this lane)

**PASS2-VERDICT §3 M7 ≡ CRIT-w0-truth.md §6 #1** — "Fix the w0-truth line-31 attribution: `sequence-C_DCiOIQ.js` imports only `@mkbabb/value.js/math`; the bare `@mkbabb/value.js` specifiers live in other keyframes dist chunks. Conclusion unchanged."

Amended text checked (not the lane report's word):
- **Line 35** now reads: "keyframes.js dist `sequence-C_DCiOIQ.js` imports **only** `@mkbabb/value.js/math` (verified this pass, both the direct `dist/sequence-C_DCiOIQ.js:1` line and a per-file recount: 0 bare-specifier hits, 1 `/math` hit)." The old "imports **both**" per-file mis-attribution (quoted in CRIT §4:51) is gone. **DISCHARGED, verbatim to the prescription.**
- **Line 29** (import-chain diagram) re-attributed the bare specifier to the other chunks, annotated `[pass-3: moved off sequence-C_DCiOIQ.js]`. Consistent with the fix.
- **Lines 1–3** carry an honest AMENDED-AT-PASS-3 banner naming L3-doc-sweeps / M7 and stating the conclusion (KEEP the keyframes devDep) is unchanged.
- **Conclusion preserved:** line 35 closes "the KEEP disposition is unaffected by which chunk carries which specifier"; the KEEP disposition (§ lines 47–49) is untouched. ✓

---

## §3 — Live re-verification of the discharge's NEW claims (no new error)

The amendment introduced specific new claims. All reproduced against the installed trees:

| New claim in amended text | Live check | Result |
|---|---|---|
| `sequence-C_DCiOIQ.js` = 0 bare, 1 `/math` (:35) | `grep` on the file | **EXACT** — 1× `/math`, 0× bare |
| Bare specifier lives in exactly these 12 named chunks (animation/compile/delegation/easing-registry/engine/format/grammar/group/morph-svg/parse-flatten/presets/validate) (:35) | enumerate files with bare specifier in top-level kf dist | **EXACT** — 12 files, names match all 12 verbatim, 1 bare apiece |
| `/math` lives exclusively in `sequence-C` (:35) | `grep -rho '/math'` dist-wide | **EXACT** — 1 `/math` hit, in sequence-C only |
| 12 per copy, 24 across both (top-level + nested `glass-ui/node_modules/@mkbabb/keyframes.js`) (:35) | grep both copies | **EXACT** — nested copy also 12 bare + 1 `/math` |
| 13 files carry any value.js specifier (12 bare + sequence-C) | grep | **EXACT** — 13 |

The amendment's transparent note that CRIT-w0-truth.md:34's dist-wide aggregate of **48** bare differs from this pass's live **24-across-both** is handled honestly as a count-drift disclosure ("a count drift against the critic's figure, not against the conclusion") and is explicitly non-load-bearing — the critic itself (CRIT §4) ruled the per-file attribution non-load-bearing. The characterization of the critic's figure ("48 bare + 1 `/math`") matches CRIT:34. No misstatement introduced.

---

## §4 — Spot-check of untouched load-bearing citations (no regression)

The amendment touched only lines 3, 29, 35. Independent re-check of load-bearing citations elsewhere (already scored EXACT at pass 2) confirms no regression:

- glass-ui peer `@mkbabb/keyframes.js: ^5.0.0`, dev `^5.1.0` (:42–43) → **EXACT**.
- value.js package.json parse-that `^0.13.0` vs CLAUDE.md:113 `^0.7.0` (W0-12, :168) → **EXACT** doc-drift catch stands.
- P/Q dirs absent — `docs/tranches/` = `A..O R`, no P/Q (:148, :180) → **EXACT**.
- Retro-tag gap — v0.13.0/v1.0.1/v1.0.2 untagged (:120–124) → **EXACT** (none tagged locally).
- `master..tranche-q` = 3 (:141) → **EXACT**.

---

## §5 — Precepts / staleness

- No legacy, no workaround, no contrivance. Dispositions idiomatic (`git rm`, retro-tag at publish commit, resolve-in-submodule, merge tranche-q→master, KEEP the peer-provisioning devDep). Clean.
- Current against glass-ui 4.2.0 (peer `^5.0.0` verified live), kf 5.1.0 (file: symlink), parse-that 0.13.0. D8-1 cascade cure correctly booked external.
- Cosmetic residuals already ruled below-bar by the pass-2 critic (the 48-vs-24 wording is now itself disclosed and non-blocking): none block.

---

## §6 — mustFix

*(none — certified)*
