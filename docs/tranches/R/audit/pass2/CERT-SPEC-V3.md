# CERT-SPEC-V3 — Pass-3 certification of SYNTHESIS-v2 (as amended by L1-spec-v3)

**Critic**: Fable (pass-3 certification mandate) · **Date**: 2026-07-02 · **Target**: `docs/tranches/R/audit/pass2/SYNTHESIS-v2.md` (392 lines, read in full, post-amendment)
**Ancestor**: CRIT-SPEC-V2 scored 91% with 2 mustFix; PASS2-VERDICT §3 rows M1, M2, M4(mirror), + the §C fold row target this document.
**Method**: every mustFix row traced to its amended text (not the lane report's word); ~15 load-bearing citations re-checked against the live trees (`tranche-q` @ `e80b359`, glass-ui 4.2.0 manifest, fourier-analysis tree); the L1/L2 lane reports cross-read for discharge-introduced errors; the amended `kf1-grammar.md`, `dispatch-homes.md`, and the two hoisted reports inspected for mirror consistency.

---

## Verdict: **CERTIFIED — 100. Every prior mustFix is discharged in the text; no new blocking defect.**

---

## §1 — mustFix accountability (checked in the amended text, row by row)

### CRIT-SPEC-V2 #1 ≡ PASS2-VERDICT M1 — the `extractFunctions` correction, all six elevation sites

| Site | Amended text | Verified |
|---|---|---|
| §0.2 (`SYNTHESIS-v2.md:30`) | claim struck `~~…~~` + **REFUTED at pass 3 (M1)** rider: in source since 1.1.0 `23d1a91`, `extract.ts:124` / `index.ts:291` / `subpaths/parsing.ts:47`, "a fresh build **keeps** it" | ✔ text present; all four cites exact against head (below) |
| §3 R.W1 item 3 (`:122`) | rewritten to "fresh-build regression guard … **Nothing to restore**" | ✔ |
| §3 R.W1 gate (`:128`) | "a trivial regression assertion — the symbol is already in source since 1.1.0, M1" | ✔ |
| §4 slate (`:205`) | "fresh-build `.d.ts` regression guard (M1 — already in source since 1.1.0, no restore)" | ✔ |
| §9 KF-1b (`:268`) | demoted; "**NOT** blocking the KF-1 letter — the export already exists, so the kf re-pin resolves it today" — the false blocking dependency deleted | ✔ |
| §10 ledger (`:282`) | "extractFunctions fresh-build `.d.ts` guard (M1 — already in source, no restore)" | ✔ |
| §11 P0#1 (`:303`) | "Plus the load-bearing side-find" tail struck + REFUTED annotation | ✔ |

**Live-tree re-verification (this pass, independent)**: `grep -n extractFunctions` → `src/parsing/extract.ts:99` (banner) + `:124` (`export const extractFunctions = (`), `src/index.ts:291`, `src/subpaths/parsing.ts:47`; `git log -S "export const extractFunctions"` → sole hit `23d1a91` "Tranche P (1.1.0)". Every number in the amendment is exact.

### CRIT-SPEC-V2 #2 ≡ PASS2-VERDICT M2 — the staleness record + carries + 1877 annotation

- **§13 process lesson (`:389`)**: rewritten to the honest split — boot-blast (worktree-2) self-corrected; **worktrees 1 and 3 sat at `15b0382` and did NOT self-correct**, producing "the pass's only two integrity defects." Both carries recorded with their evidence (KF-1 byte-identity; gamut-bound base-equivalence, +61-line appended function, `GAMUT_ALPHA` untouched). ✔
- **§3 R.W1 item 2 (`:121`)**: the byte-identity carry argument added verbatim ("byte-identical across `15b0382..e80b359`, `git diff --stat` empty, re-verified twice"). ✔ — **re-verified this pass a third time**: `git diff --stat 15b0382 e80b359 -- stylesheet.ts serialize.ts grammar-2026-atrules.test.ts round-trip.test.ts` → empty (all 4 files, including the 4th L2 identified).
- **1877/1877 annotated as stale-base at all three sites**: §0.2 (`:30`), §3 R.W1.2 (`:121`), §11 P0#1 (`:303`) — each names `15b0382`/1.0.2 as the base and L2's M3 as the head re-run. ✔
- **§13's pass-3 parenthetical** ("worktree-3 since advanced to `e80b359`; worktree-1 remains at `15b0382`") — ✔ exact against `git worktree list` this pass (-1 `15b0382`, -2 `e80b359`, -3 `e80b359` detached).
- **Gamut-bound base-equivalence** — ✔ re-verified: `git diff --stat 15b0382 e80b359 -- src/units/color/gamut.ts` = 1 file, +61 insertions only; `GAMUT_ALPHA = 0.05` still at `gamut.ts:242`.

### PASS2-VERDICT M4 (SYNTHESIS-v2 mirror half) — CONSTELLATION.md-pointer ownership

All seven mirror sites carry the corrected disposition uniformly (fourier-tree write, booked to FN-7; in-tree contract-of-record note; gate value.js-tree-local; fixture = **inline rows** in `diff.test.ts`): §0.2 (`:34`), §3 R.W6 blockquote (`:164`) + gate (`:166`), §3.3 FN-7 book row (`:195`), §5 (`:222`), §6 FN-7 (`:241`), §10 (`:287`, `:289`), §12 Q9 (`:370`). A `grep` sweep for `unilateral` / `value.js-side` across the spec returns zero stale forms. **Premise re-verified**: `CONSTELLATION.md` exists at `fourier-analysis/docs/constellation/CONSTELLATION.md` and nowhere in value.js; `api/test/conformance/diff.test.ts:5-6` docstring cites `J-diff-shape.md §3/§4` verbatim. The primary (`dispatch-homes.md` `:4`, `:20`, `:31-40`, `:45-46`, `:107-108`) is consistent with the mirror — no cross-document contradiction. ✔

### The §C should-fix fold (PASS2-VERDICT §3 final row)

1. **GAP-3 verified enumeration (§8.3, `:255`)** — ✔ and **independently re-derived**: `grep -rhoE '@mkbabb/glass-ui[…]' demo/ vite.config.ts | sort -u` yields exactly the spec's 16 real specifiers (root + 15); `styles/animations.css` appears only as a CSS comment (`demo/@/styles/animations.css:3`) + prose (`demo/DESIGN.md:103`) — correctly struck; `/styles.css` is a real import at `demo/@/styles/style.css:53` (`/styles` at `:52`) — correctly added.
2. **§8.6 peer-floor (`:258`)** — "currently `^1.0.0` (verified …); `^1.1.1` is *planned* …" — ✔ exact: `glass-ui/package.json:1095/:1133` `"@mkbabb/value.js": "^1.0.0"`.
3. **Residual-risk-2 (§13, `:383`)** — recorded ALREADY DISCHARGED — ✔ exact: `conversions/index.ts` has 0 `export *`, all named re-exports.

### M1/M2/M3 report-side halves (context, not this item's score)

`kf1-grammar.md` (hoisted, `:1` provenance): baseline corrected to `15b0382`/1.0.2; §6 + §8.3 STRUCK; head counts restated (clean 1934/51; patched 1939/1-fail/1940; 31→37). `gamut-bound.md`/`boot-blast-radius.md` hoisted byte-faithful with provenance headers. W0-14's hoist is thereby already discharged in the tree.

---

## §2 — Discharge-introduced-error scan (the new-defect hunt)

1. **The "pending L2's M3 head re-run" phrasing** (`:30`, `:121`, `:303`) is a same-pass timing snapshot — L1 (23:36) and L2 (23:34) ran concurrently, and L2 has since produced the head numbers. **Not a false claim**: the spec defers to L2 by name, and the head record lives in the amended `kf1-grammar.md`, which the spec itself designates the R.W1 implementation seed (`:19`, `:121`). Checked for harm: L2's one material find — the head-only `test/parsing-extract-functions.test.ts:36` `.type` assertion (file added `23d1a91`, absent at the stale base; verified live this pass) making the R.W1 rename sweep a 5-file diff — is carried in the seed report the implementer must read, and the spec's own R.W1 gate ("full vitest green") + the rename work-order force that one-line sweep regardless. **No implementer builds differently.** Not blocking; noted for the R.W1 executor.
2. **"guarantees applies cleanly" (`:30`)** — TRUE: L2's `git apply --check` passed; applied clean; diff shape reproduced (+141/−30, 4 files).
3. **W0-14 (`:19`, `:109`) still phrased as future work** — the hoist landed with L2's same motion, so R.W0 finds it pre-discharged. Idempotent instruction, trivially-green gate clause; no harm.
4. **"7 adversarial vectors" (`:30`) vs the report's 8 §4 vectors** — pre-existing pass-2 wording of the same cosmetic class the pass-2 critic explicitly ruled below the bar (five-vs-six identifiers). Not blocking.

No amendment contradicts any other section; the strike-through spans carry REFUTED riders; the M4 disposition is uniform across both documents; no citation drifted.

---

## §3 — Certification

Every CRIT-SPEC-V2 mustFix row and every PASS2-VERDICT §3 row targeting this document is **discharged in the amended text itself**, verified against the text and independently against the live trees — not taken from the lane reports. Of the ~15 load-bearing citations re-spot-checked this pass (`extract.ts:99/:124`, `index.ts:291`, `subpaths/parsing.ts:40/:47`, `23d1a91`, the 4-file byte-identity, worktree HEADs, `gamut.ts:242` + the +61 delta, the 16-specifier enumeration, `animations.css:3`, `style.css:52-53`, glass-ui peer `^1.0.0`, `conversions/index.ts` barrel form, `CONSTELLATION.md` single-location, `diff.test.ts:5-6`, `parsing-extract-functions.test.ts:36`), **all 15 are exact**. No discharge introduced an error that would change what an implementer builds; the residuals named in §2 are timing snapshots and cosmetic wording below the certification bar by rule.

**Convergence: 100. CERTIFIED — ratification-ready on the spec's own §13 terms; the open rows (Q1/Q2/Q4/Q7/Q8/Q10/Q11/Q12) pass to the owner.**

### mustFix

*(empty)*
