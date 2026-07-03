# CRIT-w0-truth — Pass-2 critic

**Target:** `docs/tranches/R/audit/pass2/w0-truth.md` · **Pass:** 2 · **Date:** 2026-07-02
**Method:** every load-bearing citation re-run against the LIVE tree (git porcelain/ls-files/tag, npm registry, installed `node_modules/@mkbabb/{glass-ui,keyframes.js}`, submodule). Ancestor scored 84–90%; question = did the amendment CLOSE the gap.

---

## §1 — Verdict

**Convergence 93%. The gap is closed; one non-load-bearing citation imprecision remains.** Every disposition, every gate, and every load-bearing fact is independently reproduced. The binding mustFix rows (PASS1-VERDICT §5-P1#6 retro-tags; §5-P2#18 P/Q-dirs; seed-10 keyframes-non-inert charter) are DISCHARGED to the digit — not paraphrased away. No precept violation, no staleness vs glass-ui 4.2.0 / kf 5.1.0.

---

## §2 — Load-bearing citations re-verified (all PASS)

| Claim (w0-truth) | Live check | Result |
|---|---|---|
| glass-ui peer `@mkbabb/keyframes.js: ^5.0.0`, dev `^5.1.0` (:38-39) | `node_modules/@mkbabb/glass-ui/package.json` | **EXACT** — peer `^5.0.0`, dev `^5.1.0` |
| value.js devDep `file:../keyframes.js` (:41, package.json:128) | `grep keyframes.js package.json` → `:128 "file:../keyframes.js"` | **EXACT** |
| No direct keyframes import in src/demo (grep=0, :32) | `grep -rn @mkbabb/keyframes src demo` | **0** |
| keyframes dist consumes `@mkbabb/value.js/math` (:31,:24) | `sequence-C_DCiOIQ.js` imports `/math` | **CONFIRMED** — live transitive consumer |
| CONTRIBUTING/VENDOR = **unstaged** `D`, in-index (:90) | porcelain ` D`×2; `ls-files -s` blobs `4ad5906`/`cd5896d` stage 0; `diff --cached` empty | **EXACT** (drift correction over R1's "staged" is right) |
| frontend-design sizes: color-picker 25113 B, hero-lab 32228 B (:60) | `ls -la docs/frontend-design/` | **EXACT** (R1's swap corrected correctly) |
| 5 `.w6a-audit*.mjs` + dataurls + `$OUT` 66726 B untracked (:69-77) | `ls -la` | **EXACT** sizes |
| Retro-tags = **10** untagged (0.11.2→1.0.2), pre-mod carve-out 11 (:103-124) | `git tag` vs `npm view versions`: registry has 0.11.2/0.12.0/0.13.0/0.13.1/0.14.0/0.15.0/0.16.0/1.0.0/1.0.1/1.0.2 all untagged; 0.1.0–0.5.1 = **11**; no registry 0.6–0.9 | **EXACT** — discharges P1#6 |
| 0.13.0=`9fce504`, 1.0.1=`f1d9bab`, 1.0.2=`15b0382`, 1.0.0=`dd9beb5`, 0.11.2=`0cb5dd2` | `git log -1 --format=%s` on each | **EXACT** subjects match table |
| `master..tranche-q` = 3 (`23d1a91`/`fd3c7ce`/`e80b359`) (:137) | `git rev-list` | **EXACT** |
| P/Q dirs absent; only N/,O/; no N/FINAL.md (:144) | `ls docs/tranches/{N,O,P,Q}` + FINAL | **EXACT** — discharges P2#18 |
| w6 shots = **80** PNGs, `*.png`-ignored via `.gitignore:17` (:128) | `ls|wc` = 80; `check-ignore -v` → `.gitignore:17:*.png` | **EXACT** |
| `docs/precepts` submodule ` m`, HEAD `63240e6`, 2 edits (LESSONS-LEARNED/tranche/SPEC) (:96-97) | inside submodule `git status` | **EXACT** |
| CLAUDE.md parse-that `^0.7.0` vs registry/pkg `^0.13.0` (W0-12, :164) | CLAUDE.md:113 `^0.7.0`; package.json:112 `^0.13.0` | **EXACT** — genuine net-new doc-drift catch |
| CRIT-SPEC #18 P/Q "do not exist" (:176) | CRIT-SPEC.md:84-85 | **CONFIRMED** |

The keyframes aggregate specifier claim (:31 parenthetical "the only two value.js specifiers keyframes emits") is correct: across keyframes dist, `grep` = 48× `@mkbabb/value.js` + 1× `/math`, exactly two specifiers.

---

## §3 — mustFix discharge audit (the rows that bind this lane)

- **PASS1-VERDICT §5-P1#6** (retro 7→10 + gate scope + carve-out): §b.5 + W0-9 nail it — 10 versions named, commits pinned, gate scoped "tags == registry ≥ v0.6.0", 11-version pre-mod carve-out recorded. **DISCHARGED.**
- **PASS1-VERDICT §5-P2#18** (P/Q "do not exist" not "empty"): §b.9 + drift-summary #4 use the corrected phrasing. **DISCHARGED.**
- **Seed-10 charter** (keyframes devDep is LIVE consumer, NOT inert; re-verify nothing else moved): §a delivers the full verify-then-disposition (KEEP; refutes N.W9′ phantom), §b re-verifies the entire sweep list, §b.7 folds the boot caution into R.W2 wording. **DISCHARGED.**

No paraphrase-away detected; each row is executed with live evidence, not restated.

---

## §4 — The one residual (P2, non-load-bearing)

**w0-truth:31** — the sentence attributes BOTH value.js specifiers to `sequence-C_DCiOIQ.js` specifically:
> "keyframes.js dist `sequence-C_DCiOIQ.js` imports **both** `@mkbabb/value.js` and `@mkbabb/value.js/math`"

Live: that file imports **only** `@mkbabb/value.js/math` (`grep` on the file = 1× `/math`, 0× bare). The 48 bare `@mkbabb/value.js` imports live in OTHER keyframes dist chunks, not sequence-C. The aggregate parenthetical is right; the per-file attribution is not.

This is **not load-bearing**: the KEEP disposition and the "live `/math` consumer" conclusion rest solely on sequence-C importing `/math`, which is confirmed. But this lane's product IS citation accuracy, so the mis-attribution should be corrected: either drop "both" (sequence-C imports `/math`) or re-attribute the bare import to "other keyframes dist chunks."

---

## §5 — Precepts / staleness

- **No legacy / no workaround / no contrivance:** dispositions are idiomatic (`git rm`, retro-tag at publish commit, resolve-in-submodule, merge tranche-q→master). Clean.
- **No over-scoping:** stays within the W0 inventory + the assigned keyframes disposition + a legitimate doc-truth catch. The W0-12 CLAUDE.md/RELEASE.md edits are prescribed as future R.W0 execution work, not performed here — correct for a spec/inventory doc.
- **Staleness:** current against glass-ui 4.2.0 (peer `^5.0.0` verified live), kf 5.1.0 (file: symlink resolves 5.1.0), parse-that 0.13.0. The D8-1 cascade cure is correctly booked as an external glass-ui-BG relay, not internalized.

---

## §6 — mustFix

1. **(P2, citation)** w0-truth:31 — correct the per-file attribution: `sequence-C_DCiOIQ.js` imports only `@mkbabb/value.js/math`; the bare `@mkbabb/value.js` specifier is emitted by other keyframes dist chunks. Conclusion unchanged.
