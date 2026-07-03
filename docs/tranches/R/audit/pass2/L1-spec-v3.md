# L1-spec-v3 — lane report (Tranche R, pass-3 convergence)

**Lane**: L1-spec-v3 · **Date**: 2026-07-02 · **Branch**: `tranche-q` @ `e80b359` (value.js 1.2.0)
**Charter**: discharge M1 + M2(spec half) + M4(both files) + the §C should-fix fold, per `PASS2-VERDICT.md` §3 rows M1/M2/M4 and §5.2.
**Writable surface honored**: only `docs/tranches/R/**` touched (`SYNTHESIS-v2.md`, `dispatch-homes.md`, this report). `src/`, `demo/`, `api/`, `package.json`, siblings — READ-ONLY, read-only.
**Files edited**: `docs/tranches/R/audit/pass2/SYNTHESIS-v2.md`, `docs/tranches/R/audit/pass2/dispatch-homes.md`. Each carries a datestamped **AMENDED AT PASS 3** provenance line at its top (`SYNTHESIS-v2.md:4`, `dispatch-homes.md:4`).

---

## §1 — Live-tree verifications (every amended claim, checked before writing)

| Claim | Command | Result |
|---|---|---|
| `extractFunctions` in source | `grep -n extractFunctions src/parsing/extract.ts src/index.ts src/subpaths/parsing.ts` | `extract.ts:124` (`export const extractFunctions`), `index.ts:291`, `subpaths/parsing.ts:47` — **present** |
| landed at 1.1.0 | `git log -S "export const extractFunctions" -- src/parsing/extract.ts` | `23d1a91` "Tranche P (1.1.0)" |
| KF-1 byte-identity carry | `git diff --stat 15b0382 e80b359 -- stylesheet.ts serialize.ts grammar-2026-atrules.test.ts` | **empty** (byte-identical) |
| gamut base-equivalence | `git diff --stat 15b0382 e80b359 -- src/units/color/gamut.ts` + `grep GAMUT_ALPHA` on the diff | +61 insertions, one appended function; `GAMUT_ALPHA` untouched |
| worktree HEADs | `git worktree list` | -1 `15b0382` (stale); -2 `e80b359`; -3 `e80b359` (detached — advanced at pass-3 for L2's M3 re-run). Pass-2 historical: -1 & -3 stale, -2 at head |
| CONSTELLATION.md location | `find` value.js + fourier | value.js: **none**; fourier: `docs/constellation/CONSTELLATION.md` (also `docs/tranches/A/coordination/`) |
| GAP-3 `/styles/animations` | `grep styles/animations demo/@/styles/*.css` | comment-only at `animations.css:3` — **not an import specifier** |
| GAP-3 `/styles.css` | `grep glass-ui/styles demo/@/styles/style.css` | `style.css:53` `@import "@mkbabb/glass-ui/styles.css";` — **real + was unlisted** (`:52` is `/styles`, listed) |
| conversions barrel form | `cat src/units/color/conversions/index.ts` | all `export { … } from "…"` (named); **no `export *`** — matrices cannot leak |
| glass-ui peer floor | `grep value.js glass-ui/package.json` | peerDependencies `"@mkbabb/value.js": "^1.0.0"` (lines 1095/1133) — **currently `^1.0.0`, not `^1.1.1`** |
| `diff.test.ts` docstring | `sed -n '1,10p' api/test/conformance/diff.test.ts` | `:5-6` cites `fourier-analysis/docs/tranches/J/design/J-diff-shape.md §3/§4` as its source of rules |

---

## §2 — M1: the `extractFunctions` correction (SYNTHESIS-v2.md)

The pass-2 "absent from source; a fresh build drops it" side-finding was a **stale-worktree artifact** (kf1-grammar's worktree sat at `15b0382`/1.0.2, before the walker landed in 1.1.0). Corrected everywhere it was elevated:

- **§0.2** (`SYNTHESIS-v2.md:30`) — the claim struck (`~~…~~`) + a **REFUTED at pass 3 (M1)** rider giving the in-source cites (`extract.ts:124`, `index.ts:291`, `subpaths/parsing.ts:47`), landing commit `23d1a91`, and "a fresh build keeps it".
- **§3 R.W1 item 3** (`:122`) — rewritten from "Restore `extractFunctions` to source" to a **fresh-build `.d.ts` regression guard** (nothing to restore; a trivial presence assertion survives).
- **§3 R.W1 gate clause** (`:127`) — the `extractFunctions` gate reframed as "a trivial regression assertion — the symbol is already in source since 1.1.0".
- **§9 KF-1b** (`:268`) — demoted to a **trivial fresh-build `.d.ts` presence** assertion; the false **"blocking the KF-1 letter"** dependency deleted and replaced with "**NOT** blocking the KF-1 letter — the export already exists, so the kf re-pin resolves it today".
- **§10 ledger** (`:282`) — "extractFunctions restore" → "extractFunctions fresh-build `.d.ts` guard (M1 — already in source, no restore)".
- **§11 P0#1** (`:303`) — the "extractFunctions dist-only → KF-1b" tail struck + REFUTED annotation.
- **§4 library slate** (`:205`) — "extractFunctions restore" → "fresh-build `.d.ts` regression guard".

## §3 — M2: worktree-staleness honesty + carries + 1877 annotation (SYNTHESIS-v2.md)

- **§13 process lesson** (`:389`) — rewritten from the single self-corrected lane (boot-blast) to the honest split: **boot-blast (worktree-2) self-corrected to head**; **worktrees 1 (gamut-bound) and 3 (kf1-grammar) sat at `15b0382` and did NOT self-correct**, producing the pass's only two integrity defects (kf1's false §6 finding + this SPEC's five-section amplification). Records both carries as sound: **KF-1 byte-identity** (touched files empty-diff across `15b0382..e80b359`) and **gamut-bound base-equivalence** (`gamut.ts` delta = one appended P-era function, +61 lines, `GAMUT_ALPHA`/cusp core untouched — nothing re-runs). Notes the pass-3 fact that worktree-3 has since been advanced for L2's M3 re-run while worktree-1 remains at `15b0382`.
- **§3 R.W1 item 2** (`:120`) — added the **byte-identity carry argument** (the three touched files, `git diff --stat` empty, re-verified twice; only L2's mechanical re-run is owed).
- **1877/1877 annotated as a stale-base number** pending L2's head re-run at three sites: **§0.2** (`:30`), **§3 R.W1 item 2** (`:120`), **§11 P0#1** (`:303`).

## §4 — M4: CONSTELLATION.md-pointer ownership (both files)

Adopted **fix-shape 1** (PASS2-VERDICT §5.2). The pointer is a **fourier-tree write** — `CONSTELLATION.md` exists only at `fourier-analysis/docs/constellation/CONSTELLATION.md`; value.js has no such file, so authoring it from an R lane would breach the read-only-main-trees precept. It **books to FN-7 alongside the relocation**. value.js's in-tree R.W6 deliverable is a **contract-of-record note** (the `diff.test.ts:5-6` docstring already binds `J-diff-shape.md` §3/§4). The R.W6 gate is **rescoped to value.js-tree state only**. The fixture form is committed to **inline rows in `diff.test.ts`** (named explicitly).

- **dispatch-homes.md**: A.1 (`:19` — fixture → inline rows), A.2 (header + Decision + reasoning + Net fully rewritten, `:31–40`), A.3 REPLACE wording + rescoped gate (`:45–46`), summary table rows (`:107–108`).
- **SYNTHESIS-v2.md** mirror: §3 R.W6 blockquote (`:164`) + rescoped gate (`:166`); §5 contract-doc bullet (`:222`). Consistency mirrors of the same disposition also updated so the doc carries no self-contradiction: §0.2 (`:33`), §3.3 booked table (`:195`), §6 FN-7 row (`:241`), §10 R.W6 fold + BOOKS row (`:283`, `:289`), §12 Q9 (`:370`).

## §5 — §C should-fixes folded (SYNTHESIS-v2.md)

- **GAP-3 verified specifier enumeration** (§8.3, `:255`): `/styles/animations` struck (comment-only at `animations.css:3`); `@mkbabb/glass-ui/styles.css` added (real, `style.css:53`, was unlisted). Count stays **16 real specifiers** (root + 15) — consistent with the §11 P2#18 ledger row.
- **§8.6 peer-floor wording** (`:257`): "currently `^1.0.0` (verified this pass); `^1.1.1` planned at BH B2.1-swap; must ride to `^2.0.0` at R.W1".
- **residual-risk-2 already-discharged** (§13, `:383`): recorded DISCHARGED — `conversions/index.ts` uses explicit named exports (no `export *`), so the internal-exported matrices cannot leak; no landing-time verification owed.

---

## §6 — Post-edit consistency sweep

`grep` for `unilateral` / `value.js-side edit` / `pointer present` / `absent from source` / `dist-only` / `extractFunctions.*restore` / `styles/animations` across both files returns **only** the corrected forms: provenance lines, explicitly-struck `~~…~~` spans with REFUTED riders, and the corrected specifier note. No stale contradiction survives. The M4 fixture-form is uniformly "inline rows"; the pointer is uniformly a fourier-tree write booked to FN-7; the R.W6 gate is uniformly value.js-tree-local in both files.

## §7 — Notes / carries for the pass-3 synthesizer

- The 1877/1877 head re-run itself is **L2's M3** (not this lane) — annotated here as stale-base, not restated.
- kf1-grammar.md's own §6/§8.3 strike (M1's report-side half) and gamut-bound's header are **L2's** targets — this lane touched only the two spec/dispatch docs named in the charter.
- worktree-3 is now at `e80b359` (detached) — the pass-2 §1-note in PASS2-VERDICT.md (which recorded -3 @ `15b0382`) is a pass-2 snapshot; the §13 amendment records both the historical pass-2 staleness and the current pass-3 advance.
