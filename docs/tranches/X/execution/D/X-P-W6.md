SERVED MODEL: claude-opus-5-5

# X.P.W6 — execution record (Track D)

Spec: `docs/tranches/X/parse-that/waves/W6.md` (19 lines, read whole). Authority: the owner's ruling 2026-09-23, verbatim *"What you recommend. No custom grammar, unless it's BBNF."* — COHESION §0by. X.P.W5 STOPPED by that ruling (done-by-ruling; its `.a`–`.c` bytes stand as evidence; never resumed).

## Open

- Date: 2026-09-23 (execution opened by the owner's begin-word 2026-09-17, COHESION §0j). Seat 0, `claude-opus-5-5`.
- Precondition "Opens after X.P.W5 (STOPPED by the owner's ruling)": MET by ruling — COHESION §0by line 3097 ("X.P.W5 STOPPED → X.P.W6"); W5 bytes present: ⟨`git -C ../parse-that log --oneline -5`⟩ → `2382b30` · `98fbe48` · `f5169b1` · `661b47c` · `6fcc207` (parse-that master). X-W12 `.l` retired into `.b` (§0by).
- Crash-recovery: no uncommitted path in this wave's writable sets. parse-that has foreign dirty rows (`.cargo/config.toml`, `README.md`, `rust/**` — NOT this wave's; every `.r` commit is pathspec and never stages them). value.js dirty rows (`CARRY-LEDGER.md`, `X-W7.md`, `scripts/dev/dev.sh`, `docs/tranches/X/audit/`, `chassis/ui-audit.js`) are foreign.
- E13 Step-0 mail sweep (15:0x EDT): four paths + glass newest tranche (BL; BK newest file = our own outbound mirror); no commit to any coordination path since 14:00 (glass/keyframes/atlas `git log --since`) → 0 unrowed, 0 new UNREAD (INBOX last row I-42 READ).
- Findings at open (for the unit seats, not escalations):
  - F-W6-open-1: value.js has NO `bench/` directory (⟨`ls bench`⟩ → `No such file or directory`); `.x`'s "bench of record (`bench/`)" must be authored by `.x` (a BBNF-vs-hand bench) — in its writable set.
  - F-W6-open-2: value.js does not depend on parse-that (⟨`grep -c parse-that package-lock.json`⟩ → `0`); `.b` adds the published dependency.
  - F-W6-open-3: the published BBNF toolchain `@mkbabb/bbnf-lang@0.1.4` pins `@mkbabb/parse-that ^0.8.2` while parse-that latest is `1.0.0` (⟨`npm view`⟩); `.b` measures which path is published + idiomatic (bbnf-lang's loader vs parse-that's own) and names it, per W6.md.
  - F-W6-open-4: two foreign born-RED tests in value.js `npm test` (`test/spectrum-luma.test.ts` C-5 BORN-RED; `demo/test/shell/reka-binding-idiom.test.ts` NG-6) — owned by other tracks; `.x`'s "npm test GREEN" reads as no CSS-parser failure and those two unmoved-or-cured by their owners.

## Baseline (BEFORE, read-only, 2026-09-23 ~14:56, load 8.60 / 13.10 / 23.54)

| gate | unit | command | BEFORE |
|---|---|---|---|
| G-r1 | `.r` | parse-that `cd typescript && npm test` | RED — `Test Files 1 failed \| 15 passed (16)` · `Tests 1 failed \| 152 passed (153)`; the failure is `test/css-color5.test.ts` (color-mix() WPT deep-equal) — CSS surface, retires with `.r` |
| G-r2 | `.r` | parse-that `npm run proof:all` (each leg) | RED — manifest · subpath · packrat-cross-input · packrat-reentrant · packrat-large-offset · packrat-armed · no-span-surface · no-dead-combinator all exit 0; `proof:perf` FAIL (json-comprehensive +21.7% vs 1742ns baseline, load ~8.6 — PT-PERF-LOAD, §0bx); `proof:no-css-surface` → `npm error Missing script` |
| G-r3 | `.r` | parse-that `git ls-files typescript/src/css \| wc -l` | RED — `27` (plus `./css` export in `typescript/package.json:13`, 59 css test paths, 2 `.wasm` files tracked) |
| G-b1 | `.b` | value.js ported WPT/legacy-form cases (`css-color5`, legacy pins) | RED — absent in value.js |
| G-b2 | `.b` | value.js `npx vue-tsc -p tsconfig.lib.json --noEmit \| grep -c "error TS"` | GREEN hold — `0` |
| G-b3 | `.b` | value.js `ls src/css/grammar/*.bbnf` | RED — `No such file or directory` (BBNF excised at `36f918d2`) |
| G-h1 | `.h` | value.js differential harness MIRROR-DEFECTS ×2 | RED — harness absent in value.js |
| G-x1 | `.x` | value.js `wc -l src/css/grammar.ts` | RED — `544` (hand parser present) |
| G-x2 | `.x` | value.js `npx vitest run` | `Test Files 2 failed \| 62 passed (64)` · `Tests 2 failed \| 874 passed (876)` — both failures foreign (F-W6-open-4) |
| G-x3 | `.x` | value.js bench of record BBNF vs hand, quiesced | RED — no `bench/` (F-W6-open-1) |
| G-x4 | `.x` | keyframes.js suite linked against value.js HEAD | to be read by `.x` before and after the swap (same bytes, same command) |

GREEN-BEFORE-CURE: none (G-b2 is a hold, not a cure).

## Unit plan

Strictly serial (W6.md "Units (serial; the ADJACENT-LINE RULE binds)"): `[.r] → [.b] → [.h] → [.x]`. Every seat Opus 5.5. Locks: pathspec commits only; parse-that foreign dirty rows (`rust/**`, `.cargo/config.toml`, `README.md`) never staged; value.js `src/**` writes coordinate with Track A (A is in `demo/**`; X-W12 `.l` retired into `.b`); no publish without `npm whoami`; no force-push, no history rewrite; E-3 (DIVERGENCE-LEDGER / RELEASE-CONDITION corrections are dated addenda-beside). Law: NO intermediate algebra, NO bespoke DSL, NO hand-rolled scanner.

| unit | model | spec | writable | gates |
|---|---|---|---|---|
| `X.P.W6.r` | opus | W6.md §Units `.r` + §The law | parse-that `typescript/src/css/**`, `typescript/package.json`, `typescript/test/css*`, css-only `typescript/scripts/*.mjs` + `proof-no-css-surface.mjs`, the `ac1.wasm` build inputs; value.js `docs/tranches/X/parse-that/evidence/W6/retired-seam/**` | G-r1 G-r2 G-r3 |
| `X.P.W6.b` | opus (effort high) | W6.md §Units `.b` + §The law | value.js `src/css/grammar/*.bbnf`, `src/css/**` loader wiring (frozen `/css` surface unmoved), `package.json`/`package-lock.json` (published parse-that/BBNF dep), `src/vite-env.d.ts`, `test/css/**` | G-b1 G-b2 G-b3 |
| `X.P.W6.h` | opus | W6.md §Units `.h` | value.js `test/css/equivalence/**` (harness + corpus), DIVERGENCE-LEDGER dated addendum | G-h1 ×2 |
| `X.P.W6.x` | opus | W6.md §Units `.x` + RC-P line | value.js `src/css/grammar.ts` (delete) + its importers in `src/css/**`, `bench/**`, `test/**` hand-parser pins, RELEASE-CONDITION dated addendum | G-x1..G-x4 |

## Unit receipts

### X.P.W6.r

Seat `claude-opus-5-5`, 2026-09-23 ~14:58–15:03 EDT. Spec: W6.md §The law + §Units `.r` (read whole).

**Crash-recovery.** ⟨`git -C ../parse-that status --porcelain`⟩ → inside `.r`'s writable set, 11 MODIFIED tracked files under `typescript/src/css` (+58/−14, mtime 14:52, incl. `build/ac1.wasm` 701251→707021 B) and 2 UNTRACKED (`src/css/surface-widenings.mjs`, `src/css/build/css-surface.d.ts`) — the stopped X.P.W5.g seat's in-flight work (headers cite X.P.W5.g / SC-2), not a `.r` predecessor. Not finished (W5 is STOPPED by ruling; `.r` deletes the tree): captured whole as evidence before removal (acts 1–2). Foreign dirty rows (`.cargo/config.toml`, `README.md`, `rust/**`) untouched and never staged.

**Acts, in order.**
1. Evidence FIRST (value.js). ⟨`git archive HEAD typescript/src/css typescript/test/css* <8 css scripts> experiments/w2/ac1-tagless | tar -x -C …/evidence/W6/retired-seam`⟩ + ⟨`git diff -- typescript/src/css > uncommitted-x-p-w5-inflight.patch`⟩ → 115 files (27 src/css + 59 css tests + 8 scripts + 20 ac1-tagless + 1 patch) + `README.md` + `MANIFEST.sha256` (115 lines) → value.js **`822eadad`** (117 files).
2. The 2 untracked W5.g files → `retired-seam/untracked-x-p-w5-inflight/` → value.js **`3af7d88d`**.
3. parse-that master, ONE ordinary commit **`92d8ea7`** (117 files, +98/−39230): `git rm` `typescript/src/css/**` (27), `typescript/test/css*` (59: css-color5, css-equivalence, css-recovery, css-totality, css-var-animation), css-only scripts (`css-bench-three-leg`, `css-dual-target-identity`, `css-recovery-closure`, `css-universe`, `packed-candidate-surface`, `r1-anchor-candidate`, `rc-p-evaluate`, `wasm-admission`), `experiments/w2/ac1-tagless/**` (20, the second tracked `ac1.wasm` and its build inputs); `typescript/package.json` drops the `./css` export and the `./src/css` `files` entry, adds `proof:no-css-surface` and its `proof:all` leg; `scripts/proof-no-css-surface.mjs` restored from `4eac70c^1` with a dated note citing COHESION §0by + two added legs (no `src/css`; no css export/`files` entry). Kept (library, not CSS-surface): `runtime-kernel-probe.mjs`, `proof-perf.mjs` (a CSS function-name *token* corpus benchmarks `dispatch`), `f5169b1` packrat latch and every other library fix.
   - **adjacent edits**: `typescript/test/dist-surface.test.ts:80-82` — comment cited the retired `./css` seam and the retired proof; now names `proof:no-css-surface` as its twin (same concern, comment only, no assertion changed).
4. ⟨`git push origin master`⟩ → `2382b30..92d8ea7  master -> master`. No publish, no tag: ⟨`npm whoami`⟩ → `npm error` (E401 holds). `package.json` `version` left `2.0.0` (unpublished; superseded per W6.md — the next release is versioned by parse-that's own semver at publish time, library changes only).

**Gates (BEFORE → AFTER, double-run).**
- **G-r1** GREEN. BEFORE `1 failed | 152 passed (153)` (css-color5) → ⟨`npm run build && npm test` ×2⟩ → `Test Files 14 passed (14)` · `Tests 134 passed (134)` both runs (153 − 19 css tests; 16 − 2 css files).
- **G-r2** GREEN. BEFORE RED (perf +21.7%; no-css-surface missing) → ⟨`npm run proof:all` ×2⟩ exit 0 both, 10 GREEN/PASS lines each incl. `proof:no-css-surface GREEN — 31 runtime exports, zero CSS surface.`; `proof:perf` PASS, json-comprehensive 1920 ns (+10.2% vs 1742) / 1831 ns. Load NOT fully quiesced (⟨`uptime`⟩ 11.9 → 11.1 1-min) — PT-PERF-LOAD: PASS under load, so a quiesced read can only be faster.
- **G-r3** GREEN on the baselined measure. BEFORE `27` → ⟨`git ls-files typescript/src/css | wc -l`⟩ `0` ×2; tracked `.wasm` 2 → 0; `typescript/test/css*` 59 → 0; `"./css"` in package.json 1 → 0.

**Residuals (not escalations; outside `.r`'s writable set, named for the orchestrator).**
- R-r-1: parse-that `harness/**` (X.P.W1 instruments: bench/equivalence/totality/w2) and `experiments/w2/{contract,corpus,stage0}` remain — research instruments about the AC-1 seam, not the shipped library (no export, no `files` entry); `harness/equivalence/harness.ts:74` imports an absolute `~/.claude/jobs/…` path. ⟨`git grep -l -E 'parseStylesheet|collectKeyframes|AC-1|ac1\.wasm' HEAD -- ':!docs'`⟩ → 16 files there + `typescript/CHANGELOG.md` + `typescript/evidence` + the restored proof's own comment. Retiring them wants its own unit with those paths in its writable set.
- R-r-2: `typescript/CHANGELOG.md` / `typescript/CLAUDE.md` still describe the `./css` seam (docs, outside the set).
- R-r-3: `.b`/`.h` source the WPT cases, the differential harness and the corpus from `evidence/W6/retired-seam/typescript/test/`.

Commits: value.js `822eadad`, `3af7d88d`; parse-that `92d8ea7` (pushed). This receipt: the next value.js commit.
