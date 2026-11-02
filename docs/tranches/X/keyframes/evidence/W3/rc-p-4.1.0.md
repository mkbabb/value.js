SERVED MODEL: claude-opus-5-5

# RC-P(4.1.0) — the evaluator's own readings, pasted (KF.W3 G-KF3-1 conjunct 3 · G-KF3-2)

Pasted by KF.W3 unit `.a` (2026-11-02) from the execution record `docs/tranches/X/execution/B/KF-W3.md` §Open → "OP-1 — RC-P(4.1.0)" (the body under the heading, lines 16-30 at paste time), byte-for-byte below the rule. The table is the open seat's transcript of the commands it ran ×2 against registry coordinate `4.1.0`; it is **not** a status word. The predicate is read from these command readings (spec KF-W3.md G-KF3-1 (3)), and conjunct 2's row is G-KF3-2's entry condition (`TOTAL 0 throws / 1548 calls` ×2 against the 4.1.0 registry tarball, probe unmodified, sha256 `77678a57…ad4ec`).

Form of record: `docs/tranches/X/parse-that/RELEASE-CONDITION.md` §6a + addendum `0eb6732e1` (conjunct 4 ADMITTED retired) → RC-P = 1 · 2 · 3 · 5 · 6.

---


Form of record: RELEASE-CONDITION.md + addendum `0eb6732e1` (conjunct 4 ADMITTED retired) → RC-P = 1 · 2 · 3 · 5 · 6. Commands are X-W11.e act 7's (X-W11.md:6079; FINAL.md §RC-P table). Scratch = session scratchpad `rcp/` (non-durable bytes; readings pasted here).

| # | conjunct | command (this seat, ×2) | reading |
| --- | --- | --- | --- |
| 1 | PUBLISHED(4.1.0) | ⟨`npm view @mkbabb/value.js@4.1.0 dist.shasum`⟩ · ⟨`npm pack @mkbabb/value.js@4.1.0`⟩ · ⟨`shasum -a 1 mkbabb-value.js-4.1.0.tgz`⟩ · ⟨`guarded --light -- node scripts/ci/verify-packed-surface.mjs <tgz>`⟩ | registry `d488535c9bfc747e318895417c28a753a3b7b3d6` = packed sha1 (byte identity); `dist-tags.latest` = `4.1.0`; verify exit 0 ×2, `"ok":true` 129 / `"ok":false` 0, `achromaticRows 132`, `runtime css 20` · `runtimeExports 83`; run 1 ≡ run 2 (`cmp` identical). **TRUE** |
| 2 | TOTALITY(4.1.0) | §2.2 scratch mirror: untar the registry tarball, **symlink** the unmodified probe (sha256 `77678a574d7c6b11448b19b6ab8fc0686dddf405a01cd7ea16757bc0837ad4ec`) at its six-deep path, ⟨`npm_config_ignore_scripts=true guarded --light -- node --preserve-symlinks-main --preserve-symlinks docs/tranches/V/megatranche/audit/probes/r1-published-totality.mjs`⟩ | `ok` ×9 parsers (`0/172 throw` each) · `TOTAL 0 throws / 1548 calls` · `DISTINCT FAILURE MODES: 0` · `GREEN — every public parser is total.` · exit 0 ×2, outputs identical. **TRUE** |
| 3 | EQUIVALENCE(4.1.0) | ⟨`guarded --timeout 30 -- npx vitest run -c bench/vitest.config.ts --maxWorkers=2`⟩ | `Test Files 2 passed (2)` · `Tests 19 passed (19)` ×2; `MIRROR-DEFECTS` lines 24 per run, **0 non-zero**; `STYLESHEET DEFECTS 0` (6 lines, all 0). **TRUE** |
| 5 | BAR-DISCHARGED | the one permitted document read: COHESION.md:1407 *"OC-1 (OP-3) — ADMISSION IS DECIDED ON CORRECTNESS; the bench table is RECORDED-NOT-GATING"* (§0j.E, 2026-09-17); ⟨`git ls-files bench/records \| wc -l`⟩ → 744; `evidence/W3/bench-three-leg.md` 16916 B | **TRUE** |
| 6 | ROUTED(4.1.0) | ⟨`ls -l docs/tranches/X/parse-that/RELEASE-PACKET.md`⟩ · ⟨`grep -c` RC-P / RELEASE-PACKET / SS-6 INBOX.md⟩ · ⟨`grep -c parse-that ../fourier-analysis/package.json ../fourier-analysis/web/package.json`⟩ | packet 30555 B; INBOX `RC-P` 6 (×2) · `RELEASE-PACKET` 4 · `SS-6` 41; forbidden edge `0` · `0`. **TRUE** |

**`RC-P(4.1.0)` = TRUE** (all five conjuncts measured in this process, ×2). **The wave opens.**

Instrument notes (stated, not substituted): (i) the first TOTALITY attempt, run **without** `npm_config_ignore_scripts`, failed at the probe's internal `npm pack` (the tarball's `prepare` = `rm -rf dist && npm run build` → `Could not resolve entry module "index.html"`) and its `rm -rf dist` emptied that mirror; the mirror was re-extracted fresh and the conjunct read with FINAL §8 (ii)'s exact command — the probe was never edited. (ii) conjunct 3's bench reads `src`: ⟨`git diff --stat 'v4.1.0^{commit}' HEAD -- src bench`⟩ → `bench/retired.ts` only (`5d8ff8c43`, the retired-parser oracle fixture's cache location, §0gz.5 R17-9); **`src` diff empty**, so the subject equals the tag `d25c4514b`.

