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

### X.P.W6R.p
SERVED MODEL: claude-opus-5-5

- **Crash-recovery.** ⟨git status --porcelain⟩ in parse-that and value.js, read against `.p`'s writable set: `harness/**`, `experiments/w2/{contract,corpus,stage0}`, `typescript/CHANGELOG.md`, `CLAUDE.md`, `evidence/W6R/`, this record all clean (the evidence dir did not exist). No inherited work. parse-that's dirty `.cargo/config.toml`, `README.md`, `rust/**` (L-3) untouched throughout.
- **Anchors (measured).** parse-that `master` HEAD `92d8ea7`. ⟨git ls-files harness experiments/w2/{contract,corpus,stage0} | wc -l⟩ → `62`. ⟨git grep -n '\.claude/jobs'⟩ → 6 hits: `harness/equivalence/harness.ts:19,73,74,91` · `harness/equivalence/equivalence-results.json:68` · `harness/totality/lib/config.mjs:71`. The spec's `harness.ts:74` holds at the bytes (`:73` is the other import; `:91` a path string). ⟨git diff --quiet HEAD -- harness experiments/w2⟩ → exit 0 (worktree = HEAD, no untracked or ignored files under them).
- **Act 1 — evidence first (R-r-1, value.js).** Copied the 62 files (`git ls-files -z … | xargs cp -p`, paths preserved) to `docs/tranches/X/parse-that/evidence/W6R/` and wrote `MANIFEST.md` (line 1 SERVED MODEL; source `92d8ea7`; why: AC-1 research instruments of the retired surface, `harness.ts:73-74,91` absolute `~/.claude/jobs` imports; one sha256 row per file). ⟨grep -c '^| `' MANIFEST.md⟩ → `62`. Cross-check ⟨`git show 92d8ea7:<p> | shasum -a 256` vs the copy, all 62⟩ → 0 mismatches. ⟨git check-ignore⟩ → none ignored. **Commit `498a50fb`** (value.js, pathspec the evidence dir; ⟨git show --stat⟩ → `63 files changed, 30774 insertions(+)`).
- **Act 2 — removal (R-r-1, parse-that).** ⟨git rm -r -q harness experiments/w2/contract experiments/w2/corpus experiments/w2/stage0⟩ → 62 staged deletions, no other path. **Commit `d129a97`** (one ordinary commit, pathspec the four roots; `62 files changed, 30693 deletions(-)`). The 30774 − 30693 = 81 extra value.js lines are the MANIFEST.
- **Act 3 — R-r-2 (parse-that).** `typescript/CHANGELOG.md`: a dated `## Unreleased — the CSS surface retires … — 2026-09-23` entry above `## 2.0.0`. It records `92d8ea7` (`./css` export gone, algebra/lowerings/`ac1.wasm`/tests retired, `proof:no-css-surface` restored), the owner ruling (§0by), the grammar's new home (value.js BBNF), and the instruments' move (`d129a97`, value.js path). Claims verified at the bytes: ⟨grep -c '"\./css"' typescript/package.json⟩ → 0; ⟨ls typescript/src/css⟩ → absent; ⟨npm view @mkbabb/parse-that versions⟩ → newest `1.0.0` (2.0.0 never published, stated in the entry).
  - **P-4 read.** The baseline regex finds 0 seam lines, as recorded. My own read of `CLAUDE.md` found one stale TypeScript CSS line: `CLAUDE.md:18` `parsers/ Domain parsers (JSON, CSV, CSS)` under `typescript/src/parse/`, whereas ⟨ls typescript/src/parse/parsers⟩ → `csv.ts index.ts json.ts utils.ts`. Edited to `(JSON, CSV)`. The Rust lines (`:35`, `:40`, `:46`) describe `rust/parse_that/src/parsers/css` and `grammar/tests/css`, which exist, and are left alone.
  - **Self-inflicted P-1 hit, cured before close.** The first CHANGELOG draft quoted the literal `~/.claude/jobs`, so the gate read `1` (`typescript/CHANGELOG.md:26`). Reworded to "an absolute job-scratch path outside the repository", and the unpushed R-r-2 commit amended (pathspec `typescript/CHANGELOG.md CLAUDE.md`). **Commit `cb9c0d4`** (`2 files changed, 27 insertions(+), 1 deletion(-)`); the pre-amend hash `a74214f` is superseded and was never pushed.
- **Gates, BEFORE→AFTER (AFTER on the settled bytes, read twice):**
  - P-1: ⟨git grep -n '\.claude/jobs' | wc -l⟩ `6` → `0`, `0`. GREEN.
  - P-2: ⟨git ls-files harness experiments/w2/{contract,corpus,stage0} | wc -l⟩ `62` → `0`, `0`; value.js ⟨git ls-files evidence/W6R | grep -vc MANIFEST.md⟩ → `62`, `62`, plus `MANIFEST.md` (62 sha256 rows). GREEN.
  - P-3: ⟨grep -c '^## Unreleased' typescript/CHANGELOG.md⟩ `0` → `1`, `1` (line 5, dated 2026-09-23). GREEN.
  - P-4: baseline regex `0` → `0`; plus the `CLAUDE.md:18` stale TS-CSS line cured (above). GREEN.
  - P-5: ⟨cd typescript && npm test⟩ x2 → `Test Files 14 passed (14) · Tests 134 passed (134)`, exit 0, both runs. GREEN (stays GREEN). (Run on `d129a97`+R-r-2; the amend touched CHANGELOG prose only.)
  - P-6: ⟨npm run proof:all⟩ x2 → proofs 1–9 GREEN both runs (`manifest-gate GREEN`, `proof:subpath GREEN`, 6× `PASS` packrat-cross-input/reentrant/large-offset/armed/no-span-surface/no-dead-combinator, `proof:no-css-surface GREEN — 31 runtime exports, zero CSS surface`). `proof:perf` FAIL both runs: `(C) json-comprehensive regressed 42.9%` (2491 vs 1742 ns/parse, 1-min load 54.25) and `65.4%` (2883 ns, load 56.15). The regression tracks machine load (baseline 44.0% at load 23.6), and `.p` changed no source. This is **PT-PERF-LOAD, honest-RED under OC-1 (owner)**, unchanged from baseline.
  - Publish: none owed and none made (no `npm whoami` needed).
- **Adjacent edits:** none. `CLAUDE.md` is in the writable set.
- **Residuals:**
  - RES-p-1: parse-that root `package.json` (name `parse-that-css-totality-p2`, devDeps tsx/typescript/vitest) exists for the harness toolchain (its `why` key cites `harness/bench/package.json`). It is outside `.p`'s writable set and not named by the spec, so it stays. Its retirement belongs with X.P.W7's parse-that work.
  - RES-p-2: the two parse-that commits (`d129a97`, `cb9c0d4`) are local on `master` (⟨git status -sb⟩ → `ahead 2`); W6R prescribes no push. W7 `.p` branches from this tip (§0ck).
- **Escalations:** none. **Status:** DONE.

## Close

SERVED MODEL: claude-opus-5-5 — the CLOSE SEAT, VERIFY-ONLY (cured nothing). 2026-09-23 20:11–20:20 EDT; 1-min load 34–41 (5-min 54, 15-min 65).

- **Crash-recovery.** ⟨git status --porcelain⟩ in both trees: no dirty path in the close seat's writable set (this record, LEDGER row). value.js dirty rows (`demo/color-session/ColorSpaceSelector.vue`, `CARRY-LEDGER.md`, `scripts/dev/dev.sh`, W13R evidence, relay addendum, `e2e/smoke/w12-drag.spec.ts`) and parse-that dirty rows (`.cargo/config.toml`, `README.md`, `rust/**`) belong to other seats; untouched. The X-W7R `package.json` pin hunk named in lock L-1 is no longer in the working tree.
- **Spec shape.** `W6R.md` (36 lines, read whole) carries per-unit gates inside "Units, strictly serial" and has no §Verification Artefacts and no §State four-verb line; the close therefore re-runs every unit gate and moves the wave to IMPLEMENTED only.

### Commit roster (act 1: exist + writable set)
| Unit | Commit | Tree | Paths (⟨git show --name-only⟩) | In writable set |
|---|---|---|---|---|
| `.c` | `1d970c7c` | value.js | `.github/workflows/ci.yml` (+1, producer job line 70, after `npm test` line 69) · `package.json` (+1, `scripts."test:css-equivalence": "vitest run -c bench/vitest.config.ts"`) | yes |
| `.c` | `6ef57cc8` | value.js | this record (+12) | yes |
| `.l` | `a8f93163` | value.js | `docs/tranches/X/parse-that/DIVERGENCE-LEDGER.md` (+49 −0) | yes |
| `.l` | `afc8034a` | value.js | this record (+15) | yes |
| `.p` | `498a50fb` | value.js | 63 paths, all under `docs/tranches/X/parse-that/evidence/W6R/` (⟨grep -vc '^…/evidence/W6R/'⟩ → `0`) | yes |
| `.p` | `d129a97` | parse-that | 62 deletions, all under `harness/` or `experiments/w2/{contract,corpus,stage0}/` (outside-set count `0`) | yes |
| `.p` | `cb9c0d4` | parse-that | `CLAUDE.md` (1 line: `Domain parsers (JSON, CSV, CSS)` → `(JSON, CSV)` under `typescript/src/parse/`) · `typescript/CHANGELOG.md` (+26) | yes |
| `.p` | `88be2e4a` | value.js | this record (+24) | yes |

Order law held: evidence `498a50fb` precedes removal `d129a97`. **Landed-wrong: none.**

### Gate table (act 2: every gate re-run at this seat, on the settled bytes)
| Gate | BEFORE (baseline) | AFTER (this seat) | Verdict |
|---|---|---|---|
| C-1 CI names the script | `0` · `0` | ⟨grep -n 'css-equivalence' .github/workflows/ci.yml package.json⟩ → `ci.yml:70 - run: npm run test:css-equivalence` (producer job, `producer:` at :33, after `npm test` :69) · `package.json:69` | GREEN |
| C-2 differential 19/19 x2 | `19 passed` (bench config) | ⟨npm run test:css-equivalence⟩ x2 → `Test Files 2 passed (2) · Tests 19 passed (19)`, both runs | GREEN |
| L-1 §15 re-pointed | `0` | ⟨grep -c bench/css-equivalence DIVERGENCE-LEDGER.md⟩ → `10` | GREEN |
| L-2 SH-1 row (unmatched delimiter, 13, falsifier) | W3-era row :1038 only | `§15-A.2` rows: `:1467 class id SH-1 UNMATCHED DELIMITER` · `:1469 cells 13 of 32,021` · `:1475 falsifier` · `:1477 adjudication` | GREEN |
| L-3 badTerm row | `0` | ⟨grep -c badTerm⟩ → `4` | GREEN |
| E-3 append-only | — | ⟨git diff --numstat 812daa4b a8f93163 -- DIVERGENCE-LEDGER.md⟩ → `49 0`; working tree clean on the ledger | GREEN |
| P-1 no `.claude/jobs` | `6` | parse-that ⟨git grep -n '\.claude/jobs' \| wc -l⟩ → `0` | GREEN |
| P-2 instruments moved | `62` · absent | parse-that ⟨git ls-files harness experiments/w2/{contract,corpus,stage0} \| wc -l⟩ → `0`; value.js `evidence/W6R` files excl. MANIFEST → `62`; MANIFEST sha256 rows → `62` | GREEN |
| P-3 CHANGELOG Unreleased | `0` | `typescript/CHANGELOG.md:5 ## Unreleased — the CSS surface retires … — 2026-09-23` | GREEN |
| P-4 CLAUDE.md drops `./css` | `0` (GREEN before cure) | seam regex over `CLAUDE.md docs/CLAUDE.md typescript/CLAUDE.md` → `0`; ⟨ls typescript/src/parse/parsers⟩ → `csv.ts index.ts json.ts utils.ts` (the `:18` cure matches); remaining `CLAUDE.md:40` "CSS" names `rust/parse_that/src/parsers/` which holds `css` (accurate) | GREEN |
| P-5 npm test x2 | `134/134` | ⟨cd typescript && npm test⟩ x2 → `Test Files 14 passed (14) · Tests 134 passed (134)`, exit 0 both | GREEN |
| P-6 proof:all x2 | proofs 1–9 GREEN; perf FAIL +44.0% (load 23.6) | proofs 1–9 GREEN both runs (`manifest-gate` · `subpath` · 6× PASS · `no-css-surface GREEN — 31 runtime exports, zero CSS surface`); `proof:perf` FAIL both: `json-comprehensive regressed 54.6%` (2695 ns, load 41.22) and `62.9%` (2838 ns, load 40.80) vs baseline 1742 ns | proofs 1–9 GREEN; perf **honest-RED = PT-PERF-LOAD** (OC-1, owner) |
| Publish | none owed | none made | — |

A first background proof run was killed by the host mid-`proof:perf` (exit 144); it is discarded, and the two runs above are the reading. `.p` changed no `typescript/src` byte, so the perf reading is load noise under a standing owner item, not W6R's.

### Verification artefacts (act 3)
The spec names none. The artefacts that exist are `docs/tranches/X/parse-that/evidence/W6R/MANIFEST.md` (62 sha256 rows) and `DIVERGENCE-LEDGER.md §15-A`; both were read above.

### E13 (act 4)
⟨find <path> -type f -newer docs/tranches/V/coordination/INBOX.md⟩ (INBOX mtime 2026-09-23 20:05): value.js `docs/tranches/V` `0` · glass-ui `BK/coordination` `0` · glass-ui `BL` `7` (all `audit/captures/R5-01/probes/*.mjs`, glass-internal smoke probes, not mail addressed to value.js) · keyframes.js `V/coordination` `0` · atlas `P/coordination` `0`. Newest INBOX row I-47 plus its erratum. **0 UNREAD in scope.**

### Residuals (named owners)
- **BBNF-TS-TOOLCHAIN** (F-b-1..3): OWNER (toolchain home ruling; §0cg). Open, honest-RED.
- **PT-PERF-LOAD / RES-x-1**: OWNER under OC-1 (bench bar). `proof:perf` reads +54.6% / +62.9% at load ~41.
- **RES-p-1** parse-that root `package.json` (`parse-that-css-totality-p2`, harness toolchain): X.P.W7 `.p`.
- **RES-p-2** parse-that `master` ahead 2 (`d129a97`, `cb9c0d4`): discharged by this close's push (act 7).
- **RES-x-5** `real-corpus.json` generation note: whichever unit next regenerates that file (X.P.W7).

### Escalations
None.

### State
**X.P.W6R — IMPLEMENTED 2026-09-23.** VERIFIED is not stamped here; the spec designates no seat of this wave to stamp it. Every unit gate is GREEN except `proof:perf`, which is the standing owner item PT-PERF-LOAD.

## Check 1

SERVED MODEL: claude-opus-5-5 — FRESH ADVERSARIAL CHECK (L-20, pass 1), 2026-09-23 20:1x–20:4x EDT; 1-min load 45 (5-min 50, 15-min 62). Verify-only: this seat cured nothing.

- **Crash-recovery.** ⟨git status --porcelain⟩ in both trees: no dirty path in this seat's writable set (this record, the LEDGER row). parse-that's dirty `.cargo/config.toml`, `README.md`, `rust/**` and value.js's sibling rows (incl. `scripts/dev/dev.sh`) untouched.
- **Read.** Spec `W6R.md` whole (36 lines); this record's Open, Baseline, Unit plan, receipts and Close; every named commit by `git show`.

### Axes
| Axis | Reading (this seat) | Result |
|---|---|---|
| (1) claimed GREENs reproduce | C-1 ⟨grep -n css-equivalence ci.yml package.json⟩ → `ci.yml:70` · `package.json:69`. C-2 ⟨npm run test:css-equivalence⟩ x2 → `Test Files 2 passed (2) · Tests 19 passed (19)` both. L-1 `10` · L-3 `4` · L-2 `§15-A.2` at `:1461` (class id, 13 of 32,021, example, falsifier, adjudication rows). E-3 ⟨git diff --numstat 812daa4b HEAD -- DIVERGENCE-LEDGER.md⟩ → `49 0`. P-1 ⟨git grep -n '\.claude/jobs' \| wc -l⟩ → `0`. P-2 → `0` tracked in parse-that; value.js evidence `62` + MANIFEST; ⟨each MANIFEST row vs `shasum` of the copy AND of `git show 92d8ea7:<p>`⟩ → 62 rows, **0 mismatches**. P-3 `CHANGELOG.md:5 ## Unreleased … 2026-09-23`. P-4 `CLAUDE.md` CSS lines only `:35,:40,:46` (Rust, exist). P-5 ⟨npm test⟩ x2 → `14 passed (14) · 134 passed (134)`, EXIT 0 both. P-6 ⟨npm run proof:all⟩ x2 → proofs 1–9 GREEN both; `proof:perf` FAIL `+89.0%` (3294 ns) and `+94.3%` (3385 ns) vs 1742 ns at load ~45–50. | 12/12 local readings reproduce (P-6 perf RED as the close states) |
| (2) writes inside §File Bounds | ⟨git show --name-only⟩: `1d970c7c` ci.yml + package.json · `a8f93163` DIVERGENCE-LEDGER.md · `498a50fb` 63 paths all under `evidence/W6R/` · `6ef57cc8`/`afc8034a`/`88be2e4a` record · `3690d0b9` record + LEDGER; parse-that `d129a97` 62 deletions under the four roots · `cb9c0d4` CLAUDE.md + typescript/CHANGELOG.md. ⟨git log 1d970c7c~1..HEAD -- scripts/dev/dev.sh⟩ → empty. | GREEN |
| (3) no masking fallback | diffs read whole: one script line, one CI step (no `continue-on-error`), ledger prose, a byte copy, a `git rm`, prose. No skip/allowlist/try-catch. ⟨grep -rnE '\.skip\|\.todo\|skipIf' bench/css-equivalence⟩ → 0. | GREEN |
| (4) commit families | `.c` script + step in one commit (`1d970c7c`); `.p` evidence `498a50fb` precedes removal `d129a97` (one ordinary commit); R-r-2 one commit `cb9c0d4`; receipts separate. | GREEN |
| (5) E-3 | ⟨git diff --stat 1d970c7c~1..HEAD -- docs/tranches/X/parse-that/waves docs/tranches/V/megatranche/registry/adjudicated scripts/dev/dev.sh⟩ → empty. §15.x bytes untouched (0 deletions). | GREEN |
| (6) mail | ⟨find <5 paths> -type f -newer INBOX.md \| grep -v audit/⟩ → 0 in each (value V · glass BK/coordination · glass BL · keyframes V/coordination · atlas P/coordination). | 0 UNREAD |
| (7) four-verb line | Spec has no §State line; the close moved the row to IMPLEMENTED only and left VERIFIED unstamped. | lawful |
| (8) the spec's goal at the bytes | `.c`'s goal is "the equivalence proof returns to CI". The YAML names the step (gate C-1), but **the step cannot pass on a CI checkout**. Two receipts: (a) ⟨git clone --depth 1 --branch tranche-u file://…value.js shallow; symlink node_modules; npx vitest run -c bench/vitest.config.ts⟩ → `fatal: path 'src/css/grammar.ts' does not exist in '2155142b…'` · `FAIL equivalence.measure.test.ts` · `FAIL stylesheet.measure.test.ts` · `Test Files 2 failed (2) · Tests no tests`. `bench/retired.ts:36-37` reads `RETIRED_AT` from git history, and the producer job's `actions/checkout@v4` (ci.yml:43) has no `fetch-depth` (default 1; only ci.yml:314, another job, sets `0`). (b) ⟨the same over a FULL clone with no `../keyframes.js` sibling⟩ → `fatal: cannot change to '…/keyframes.js'` · `Test Files 1 failed \| 1 passed (2) · Tests 15 passed (15)`. `stylesheet.measure.test.ts:67` reads sheets from `path.resolve(REPO, "..", "keyframes.js")` at `real.provenance.keyframesJs`, and the producer job checks out no keyframes.js. The live CI run `35937388529` (head `3690d0b9`, the first run carrying the step to complete a producer job): both producer jobs `npm test` FAIL `2 failed \| 908 passed (910)` (C-5 `spectrum-luma`, NG-6 `reka-binding-idiom`, the foreign born-REDs), so `Run npm run test:css-equivalence` reads **`skipped`** on Node 22 and 24. The step has never executed in CI. When C-5/NG-6 are cured it will red the producer job. The local 19/19 (C-2) holds only because this host has full history and the sibling tree. | **NOT MET: HIGH (D-1)** |
| (9) published figures | 19/19 x2, 134/134 x2, 62/62 sha rows, `49 0`, L-1 `10`, L-3 `4`, P-1 `0`, P-2 `0`: all reproduce at this seat. The perf percentages differ by load, as the close says they would. | GREEN |
| (10) honest-RED | P-6 `proof:perf` (`+89.0%`/`+94.3%` here): the spec names it (W6R.md "PT-PERF-LOAD and RES-x-1 … stay under OC-1, the bench bar, which is an owner item"). ⟨git diff --stat 92d8ea7 cb9c0d4 -- typescript/src rust⟩ → empty, so W6R changed no measured byte. The Residuals register names the owner. **Relieved.** BBNF-TS-TOOLCHAIN (F-b-1..3): no W6R gate; the spec carries it to the owner by name. **Relieved.** D-1 has no relief: the spec routes no part of `.c` to another wave, and it is no producer's row. | P-6 relieved; D-1 unrelieved |

### Register
| # | Severity | Claim | Receipt | Cure |
|---|---|---|---|---|
| D-1 | **HIGH** | `.c`'s CI step `npm run test:css-equivalence` cannot pass on the producer job's checkout. The spec's goal "the equivalence proof returns to CI" is met in name only. | Axis (8): shallow-clone run `Test Files 2 failed (2)` (retired blob absent at depth 1); full clone without the sibling `1 failed \| 1 passed`; CI `35937388529` step `skipped` both Node versions (npm test red on foreign C-5/NG-6). | W6R **Repair 1** (`.c`): make the instrument self-sufficient on a CI checkout. Give the producer checkout the history `bench/retired.ts` pins (`fetch-depth: 0` on ci.yml:43). Stop reading an untracked sibling tree: freeze the keyframes.js sheets at `real.provenance.keyframesJs` into a tracked corpus file beside `real-corpus.json` (or check keyframes.js out at that sha inside the workspace and pass the path explicitly). The instrument edit is the same concern, so it is an ADJACENT-LINE edit. Gate: ⟨depth-1 clone plus the cure's checkout recipe → `npm run test:css-equivalence`⟩ reads 19/19 twice with no sibling present. No skip or `continue-on-error`. |
| D-2 | INFO | The value.js evidence copy carries the absolute `~/.claude/jobs` strings (`evidence/W6R/harness/equivalence/harness.ts`). | ⟨MANIFEST.md "Why"⟩ states they are kept byte-for-byte and are not expected to run. P-1 scopes parse-that only. | None. This is immutable evidence (E-3). |
| D-3 | INFO | RES-p-1 (parse-that root `package.json`, `parse-that-css-totality-p2`) is routed to X.P.W7 `.p` by this record only. | ⟨grep -n "RES-p-1\|parse-that-css-totality" W7.md⟩ → 0. | W7's opener adopts it in its unit plan, or the orchestrator rows it. |

### Successor conjuncts
- **X.P.W7** ("Opens after: X.P.W6R … follows its close"; W7.md:7 "cut from master after X.P.W6R `.p` lands"; W7.md:103 "after X.P.W6R `.c` has landed its `test:css-equivalence` step"). Two of the three are GREEN at the bytes: `.p` has landed and is pushed (parse-that `master…origin/master` level at `cb9c0d4`), and the `.c` step exists at ci.yml:70. **The close conjunct is NOT GREEN.** W7 G-suite (W7.md:185) also names "the W6R CI equivalence program", which D-1 shows cannot run in CI. W7 is **lawfully blocked** until W6R Repair 1 cures D-1 and a Check 2 reads CONFORMANT.

### Verdict
**NOT-CONFORMANT.** One HIGH (D-1) and no BLOCKER or CRITICAL. The honest-RED set, had the bar held, would be {P-6 `proof:perf` = PT-PERF-LOAD (OC-1, owner)}. The LEDGER status cell is left unchanged, and an event line is appended.
