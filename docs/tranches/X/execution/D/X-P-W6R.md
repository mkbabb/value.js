SERVED MODEL: claude-opus-5-5

# X.P.W6R — the BBNF parser's riders: execution record (Track D)

**Spec:** `docs/tranches/X/parse-that/waves/W6R.md` (36 lines, read whole). **Authority:** COHESION §0cg (X.P.W6 CLOSED CONFORMANT-HONEST-RED; W6R minted; BBNF-TS-TOOLCHAIN to the owner). ADJACENT-LINE RULE = §0bt. **Trees:** value.js `tranche-u` (`.c`, `.l`), parse-that `master` (`.p`). **Every seat Opus 5.5** (spec Model line; owner edict 2026-09-23).

## Open

- **Date:** 2026-09-23 (execution under the owner's begin-word of 2026-09-17). Seat 0, `claude-opus-5-5`.
- **Mode:** fresh open. ⟨`grep -n "W6R" docs/tranches/X/execution/LEDGER.md`⟩ → `| X.P.W6R | §0cg (riders of X.P.W6) | QUEUED 2026-09-23 (Track D, .c → .l → .p) |`; no prior record existed.
- **Crash-recovery:** ⟨`git status --porcelain`⟩ in both trees, read against W6R's writable sets: no inherited partial work. value.js: `bench/`, `.github/workflows/ci.yml`, `docs/tranches/X/parse-that/` clean. **`package.json` + `package-lock.json` are DIRTY with a SIBLING hunk** (`"@mkbabb/glass-ui": "^7.0.0"` → `"10.0.1"`, the X-W7R glass repin per §0bs), not W6R's: see lock L-1 below. parse-that: `harness/**`, `experiments/w2/**`, `typescript/CHANGELOG.md`, `CLAUDE.md` clean; the dirty rows (`.cargo/config.toml`, `README.md`, `rust/**`) belong to another session and are never touched.

### Preconditions ("Opens after: X.P.W6, which CLOSED CONFORMANT-HONEST-RED")
- Ledger: ⟨`grep -n "| X.P.W6 |" LEDGER.md`⟩ → `CLOSED 2026-09-17 (honest-RED: G-r2 proof:perf = PT-PERF-LOAD · G-x2 2 foreign born-RED C-5/NG-6)`; the orchestrator's ERRATUM (LEDGER:683) re-dates it CLOSED 2026-09-23. COHESION §0cg records the close. **MET.**
- Bytes: ⟨`ls src/css/grammar/`⟩ → `color.bbnf math.bbnf stylesheet.bbnf tokens.bbnf value.bbnf` (the five modules); ⟨`ls bench/css-equivalence`⟩ → `differential.ts equivalence.measure.test.ts stylesheet.measure.test.ts lib … real-corpus.json`; `bench/vitest.config.ts` present (include `bench/**/*.measure.test.ts`); parse-that HEAD `92d8ea7` (the CSS surface retired, W6.r). **MET.**

### E13 Step-0 mail sweep
- Paths: value.js `docs/tranches/V/` + `V/coordination/` · glass-ui `docs/tranches/BK/coordination/` (BK is no longer the newest: ⟨`ls -d glass-ui/docs/tranches/B*`⟩ → `BI BJ BK BL`; BL swept too) · keyframes.js `docs/tranches/V/coordination/` · atlas `docs/tranches/P/coordination/`.
- ⟨`find <path> -type f -newer INBOX.md`⟩ (INBOX mtime 2026-09-23 16:42) → 0 files in five paths; glass BL → `audit/round-3/R3-01.md` only (glass-internal round-3 motion audit at glass HEAD `95068476`; not addressed to value.js; untracked). Newest INBOX row I-45 (+ its erratum), O-62.
- **Result: 0 UNREAD in scope.** Sweep line appended to INBOX.md.

## Baseline (BEFORE, read-only, 2026-09-23 17:04–17:05 EDT; 1-min load 23.6)

| Gate | Unit | Command | BEFORE | Reading |
|---|---|---|---|---|
| C-1 CI names the script | `.c` | `grep -c css-equivalence .github/workflows/ci.yml` · `grep -c css-equivalence package.json` | `0` · `0` | born-RED |
| C-2 differential 19/19 x2 | `.c` | `npx vitest run -c bench/vitest.config.ts` | `Test Files 2 passed (2) · Tests 19 passed (19) · exit 0` | GREEN (the instrument already passes; the gate is its return to CI, C-1 — not a greenBeforeCure of the cure) |
| L-1 §15 re-pointed | `.l` | `grep -c "bench/css-equivalence" docs/tranches/X/parse-that/DIVERGENCE-LEDGER.md` | `0` | born-RED (§15 cites `test/css/equivalence/`, lines 1379, 1422) |
| L-2 SH-1 13-case row | `.l` | `grep -n "SH-1" DIVERGENCE-LEDGER.md` | 1 hit, line 1038 (the W3-era UNADJUDICATED routing row; no §15 row, no 13 cases, no falsifier) | born-RED |
| L-3 badTerm row | `.l` | `grep -c badTerm DIVERGENCE-LEDGER.md` | `0` | born-RED |
| P-1 no `.claude/jobs` | `.p` | parse-that `git grep -n "\.claude/jobs" \| wc -l` | `6` (`harness/equivalence/harness.ts:19,73,74,91` · `equivalence-results.json:68` · `harness/totality/lib/config.mjs:71`) | born-RED |
| P-2 instruments moved | `.p` | parse-that `git ls-files harness experiments/w2/{contract,corpus,stage0} \| wc -l` · `ls value.js/docs/tranches/X/parse-that/evidence/W6R` | `62` · absent | born-RED |
| P-3 CHANGELOG Unreleased | `.p` | `grep -n Unreleased typescript/CHANGELOG.md` | 0 hits (top entry `## 2.0.0 — the CSS seam … 2026-09-23`) | born-RED |
| P-4 CLAUDE.md drops `./css` | `.p` | `grep -n -i "\./css\|css seam\|css surface\|/css\b\|ac1" CLAUDE.md docs/CLAUDE.md typescript/CLAUDE.md` | 0 hits | **GREEN BEFORE CURE (R.2 finding)** — W6.r (`92d8ea7`) already removed the seam's description; root `CLAUDE.md:18,40,46` "CSS" names the Rust domain parsers + test vectors, not the retired TS seam. `.p` verifies and records; no edit owed unless its own read finds a seam line |
| P-5 npm test | `.p` | parse-that `cd typescript && npm test` | `Test Files 14 passed (14) · Tests 134 passed (134) · exit 0` | GREEN (stay-GREEN gate) |
| P-6 proof:all | `.p` | parse-that `cd typescript && npm run proof:all` | proofs 1–9 pass (`manifest … no-css-surface`); **`proof:perf` FAIL** `(C) json-comprehensive regressed 44.0% vs baseline (threshold 15%) — current 2510ns vs 1742ns` · exit 1 | **RED at baseline = PT-PERF-LOAD** (the standing honest-RED under OC-1, §0cg; load 23.6/29.7/33.5). `.p` must read proof:all x2 and report perf against load; a proofs-1..9 regression is W6R's, perf alone is OC-1's |

Outputs: scratchpad `bench1.txt`, `pt-test.txt`, `pt-proof.txt` (excerpts quoted in the table verbatim).

## Unit plan

Three Opus 5.5 units, **strictly serial** (spec "Units, strictly serial"): `[.c] → [.l] → [.p]`, one concurrent. No unit shares a modify path with another. BBNF-TS-TOOLCHAIN (F-b-1..3), PT-PERF-LOAD and RES-x-1 are OWNER items (§0cg), not units: no seat patches `@mkbabb/bbnf-lang`, `node_modules`, or the bench bar. LW-1 is ratified (§0cg); no unit.

### Locks
- **L-1 (package.json, shared with X-W7R, Track A, OPEN):** the working tree carries X-W7R's uncommitted `@mkbabb/glass-ui` 10.0.1 pin (+ `package-lock.json`). A pathspec commit of `package.json` commits the whole working-tree file, so `.c` must NEVER commit while that hunk is uncommitted: re-read `git diff package.json` immediately before committing; if any hunk other than `.c`'s `scripts` line is present, poll (≤60 s steps, ≤10 min) for X-W7R's commit, then ESCALATE `ESC-W6Rc-PKG` with the measured diff. Never stage, revert or commit the pin; never touch `package-lock.json`.
- **L-2 (ci.yml):** last written by X-W7 `.z3` (`464ff743`, X-W7 CLOSED). `.c` edits the producer job only (add one step after `- run: npm test`, ci.yml:69).
- **L-3 (parse-that dirty rows):** `.cargo/config.toml`, `README.md`, `rust/**` are another session's uncommitted work — never staged, never restored.
- **Same-commit families:** `.c` = package.json script + ci.yml step in ONE commit. `.p` R-r-1 = the value.js evidence copy + MANIFEST (value.js commit) BEFORE the parse-that removal (one ordinary `git rm -r` commit); R-r-2 = CHANGELOG (+ CLAUDE.md if owed) one commit.

### `.c` — the equivalence proof returns to CI (W6R.md lines 12–16)
- **Writable:** `package.json` (`scripts` only) · `.github/workflows/ci.yml` · this record.
- **Gates:** C-1 `grep -n "test:css-equivalence" .github/workflows/ci.yml package.json` ≥1 each; C-2 `npm run test:css-equivalence` → `Tests 19 passed (19)` x2.

### `.l` — the ledger follows the files (W6R.md lines 17–21)
- **Writable:** `docs/tranches/X/parse-that/DIVERGENCE-LEDGER.md` (append-only: a new dated `## §15-A` addendum at file end; §15.x bytes unchanged) · this record.
- **Gates:** L-1 `bench/css-equivalence` cited; L-2 SH-1 row (unmatched delimiter, 13 cases, falsifier); L-3 `badTerm` row; `git diff` on the ledger = pure additions (`git diff --numstat` deletions 0).

### `.p` — parse-that's own residuals (W6R.md lines 22–26)
- **Writable:** parse-that `harness/**` · `experiments/w2/contract/**` · `experiments/w2/corpus/**` · `experiments/w2/stage0/**` · `typescript/CHANGELOG.md` · `CLAUDE.md` (+ `docs/CLAUDE.md`, `typescript/CLAUDE.md` only if a `./css` line is found) · value.js `docs/tranches/X/parse-that/evidence/W6R/**` · this record.
- **Gates:** P-1 `git grep -n "\.claude/jobs"` → 0; P-2 62 tracked files gone from parse-that, present under `evidence/W6R/` with MANIFEST; P-3 CHANGELOG `## Unreleased` dated entry; P-4 CLAUDE.md seam-free (GREEN before cure — verify); P-5 `npm test` 134/134 x2; P-6 `proof:all` x2 (proofs 1–9 GREEN; `proof:perf` read against load = PT-PERF-LOAD under OC-1); no publish (none owed; any publish needs `npm whoami` first).

## Unit receipts


### X.P.W6R.c
SERVED MODEL: claude-opus-5-5

- **Crash-recovery.** ⟨git status --porcelain -- package.json .github/workflows/ci.yml $record⟩ → ` M .github/workflows/ci.yml` only. Inherited hunk (killed predecessor seat): one line `- run: npm run test:css-equivalence` after `- run: npm test` in the producer job (ci.yml:69→70). Judged against W6R.md `.c`: conforms; kept whole. Inherited path: `.github/workflows/ci.yml`.
- **L-1.** ⟨git diff --stat package.json package-lock.json⟩ → empty before the edit (no X-W7R glass pin present in the working tree; package.json:88 reads `"@mkbabb/glass-ui": "^7.0.0"` committed). After the edit ⟨git diff package.json \| grep -c '^[+-] '⟩ → `1` (the `.c` hunk only). ⟨git diff --cached --name-only⟩ → empty. package-lock.json untouched.
- **Act 1.** package.json scripts: `"test:css-equivalence": "vitest run -c bench/vitest.config.ts",` after `"test"` (package.json:69). ⟨ls bench/vitest.config.ts⟩ → exists.
- **Act 2.** CI step (inherited, above), producer job only (L-2).
- **C-1** ⟨grep -c test:css-equivalence .github/workflows/ci.yml package.json⟩ BEFORE (baseline) 0/0 → AFTER `ci.yml:1` · `package.json:1`. GREEN.
- **C-2** ⟨npm run test:css-equivalence \| grep -E "Test Files\|Tests "⟩ run 1 → `Test Files 2 passed (2)` · `Tests 19 passed (19)`; run 2 → `Test Files 2 passed (2)` · `Tests 19 passed (19)`. GREEN x2.
- **Commit.** `1d970c7c` ci(X.P.W6R.c) — package.json + .github/workflows/ci.yml, one family, pathspec (⟨git log -1 --stat⟩ → 2 files, 2 insertions).
- Adjacent edits: none. Residuals: none. Escalations: none. Status: DONE.

### X.P.W6R.l
SERVED MODEL: claude-opus-5-5

- **Crash-recovery.** ⟨git status --porcelain -- DIVERGENCE-LEDGER.md X-P-W6R.md⟩ → empty. No inherited work.
- **Anchors (measured before the edit).** §15 runs 1373–1439 and is the file end (1439 lines); `test/css/equivalence` cited at 1379 and 1422, as the brief says. `value.bbnf:17` `valueTerm … | badTerm`, `:21` `badTerm = /[^\s(),\/:;"']+/`; `bbnf/value.ts:161` the `badTerm` action; `git log -- value.bbnf` → `7e60d700` (the swap) carries it. `bench/css-equivalence/stylesheet.measure.test.ts:78-121` is the SH-1 mechanism. No drift.
- **Measurement for the SH-1 figure.** ⟨npx vitest run -c bench/vitest.config.ts bench/css-equivalence/stylesheet.measure.test.ts⟩ → `parseStylesheet × 32021: {"AGREE":30252,"VALUE_GRAMMAR":1726,"BOTH_REFUSE":30,"DEFECT":0} · classes {"SH-1":13} · STYLESHEET DEFECTS 0` · `Tests 4 passed (4)`. This matches the `.x` receipt (X-P-W6.md:226). `.c` read the whole instrument at 19/19 x2.
- **Act 1.** Appended `## §15-A` at the file end (DIVERGENCE-LEDGER.md:1441–1489), dated and beside, with no §15.x byte touched. §15-A.1 is the re-point table from `test/css/equivalence/…` to `bench/css-equivalence/…`, with the run commands (`-c bench/vitest.config.ts` / `npm run test:css-equivalence`, 19 tests, 15→19 explained). §15-A.2 is the SH-1 row: 13 cases, the retired signed paren-depth reading against the BBNF stack reading, the governs-when repair, the falsifier (fail-closed class plus the planted `!important` defect, 3/3), NARROWS. §15-A.3 is the `badTerm` row: the grammar and action cure, the absolute-span divergence, LW-1 ratified by §0cg.
- **Commit.** `a8f93163` docs(X.P.W6R.l), pathspec DIVERGENCE-LEDGER.md only (⟨git log -1 --stat⟩ → 1 file, 49 insertions(+)).
- **Gates, BEFORE→AFTER (AFTER read twice on the settled bytes):**
  - L-1: ⟨grep -c bench/css-equivalence DIVERGENCE-LEDGER.md⟩ 0 → 10, 10. GREEN.
  - L-2: ⟨grep -n "^### §15-A.2" …⟩ 0 → 1 hit, `:1461 SH-1 · UNMATCHED DELIMITER — parseStylesheet, 13 cases`, with a falsifier field. GREEN.
  - L-3: ⟨grep -c badTerm⟩ 0 → 4, 4. GREEN.
  - E-3: ⟨git diff --numstat -- DIVERGENCE-LEDGER.md⟩ (pre-commit) → `49 0`, read twice. 0 deletions. GREEN.
- **Adjacent edits:** none. **Residuals:** RES-x-5 (the `real-corpus.json` generation note) stays with its next regeneration, as §15-A.1 records. **Escalations:** none. **Status:** DONE.
