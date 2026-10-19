SERVED MODEL: claude-opus-5-5

# X.P.W5 — execution record (Track D · X·P)

Spec: `docs/tranches/X/parse-that/waves/W5.md` (22 lines, read whole). Authority: COHESION §0bl (OA-38), §0bn (KFA-14 carried into `.c`), §0bp (Track D launched). Record path note: the spec's §State names `execution/D/X.P.W5.md`; this record sits at `execution/D/X-P-W5.md`, the hyphenated spelling every prior Track D record uses (X-P-W0..X-P-W4S) and the orchestrator's dispatch names. Same record, one file.

## Open

- Date: 2026-09-23 (execution on the owner's begin-word of 2026-09-17). Seat 0 (OPEN), `claude-opus-5-5`.
- Trees at open: value.js `tranche-u` @ `42a82e3e` · parse-that `master` @ `ef10d5b` (= origin/master, `## master...origin/master`) · `<p2>` = `/Users/mkbabb/Programming/parse-that-css-totality-p2` `w2/harness` @ `31999135` (no remote).

### Preconditions

| condition | at the bytes | ledger | verdict |
|---|---|---|---|
| X.P.W4S CLOSED (W5.md §State "Opens after") | record `execution/D/X-P-W4S.md` §Close — FIFTH SITTING present; `<p2>` HEAD `3199913` = `.g2`'s commit named in the ledger | row 92: **CLOSED 2026-09-17 — FIFTH SITTING CLOSED** | MET |
| X.P.W5 not already open | no `execution/D/X-P-W5.md` before this seat; ledger row 93 status `planned` | `planned` | fresh OPEN (not RESUME) |

### Crash-recovery scan (own writable set only)
- value.js: my writable set (`execution/D/X-P-W5.md`, `LEDGER.md`, `V/coordination/INBOX.md`) — clean. Other dirty paths (`CARRY-LEDGER.md`, `scripts/dev/dev.sh`, untracked `demo/test/extract/` etc.) belong to sibling seats — untouched.
- parse-that master: 13 `M` + 1 `D` tracked (all under `rust/`, `.cargo/config.toml`, `README.md`; mtimes 2026-07-20 — a July session's uncommitted rust work, NOT a W5 predecessor seat) + 17 untracked. Not W5-inherited; see the `.a` hazard note in §Unit plan.
- `<p2>`: only `?? .worktrees/`.

### E13 Step-0 mail sweep (2026-09-23 ~12:40 EDT)
- Paths: `V/` + `V/coordination/` (newest = the 2026-09-18 outbound set, all rowed) · glass-ui `BK/coordination/` (newest = our own `valuejs-outbound-2026-09-23-*` letters, rowed O-53..O-60) — **BK is no longer the newest glass tranche dir: `BL` is** (`ls -td` → BL, BK, BJ); BL commits since I-41 (`bf517b61`) are formation-internal (`e534ec05`..`79c3601b`: charter, audit rounds, design loop D1) — no letter addressed to value.js · keyframes.js `V/coordination/` (no commit in 12 h) · atlas `P/coordination/` (no commit in 12 h).
- INBOX last rows I-41 / O-60, last sweep line 11:4x EDT (X.F.W13). **0 unrowed, 0 new UNREAD.** Sweep line appended to INBOX.md.

## Baseline

W5.md carries no numbered §Gates block; its gates are the unit acceptance lines (`.a`..`.e`) and the Close line. This seat derived one gate per acceptance limb and ran each READ-ONLY. Scratch logs under the session scratchpad `w5/` (not committed; key lines pasted).

| gate | the limb (W5.md) | command | BEFORE | reading |
|---|---|---|---|---|
| **G-W5-a1** | `.a` w2/harness on master | ⟨`git -C parse-that fetch ../parse-that-css-totality-p2 w2/harness; git rev-list --count master..FETCH_HEAD`⟩ → `169`; `git merge-base --is-ancestor f5757082 master` → `1`; `master` IS ancestor of `<p2>` (base `ef10d5b`, 117 + 52 commits) | 169 commits not on master | **RED** (fast-forward-able) |
| **G-W5-a2** | `.a` `proof:no-css-surface` premise retired | ⟨`cd parse-that/typescript && npm run -s proof:no-css-surface`⟩ → `proof:no-css-surface GREEN — 34 runtime exports, zero CSS surface.` | premise standing | **RED** for the limb (the proof's own GREEN = the premise W5 retires) |
| **G-W5-a3** | `.a` parse-that suite + proofs GREEN (hold) | ⟨`npx vitest run`⟩ → `Test Files 13 passed (13) · Tests 124 passed (124)` EXIT=0 (pre-merge master) | 124/124 | hold gate — must hold AFTER the merge |
| **G-W5-b1** | `.b` harness exit 0 | ⟨`cd <p2>/typescript && node test/css-equivalence/run-full-surface.mjs --pinned-value-commit 6aca86020b6b2605e7d0f04fccb6601746e387f7`⟩ ×2 → `MIRROR-DEFECTS 152 (of which spec-undecided 118)` · `RED — the equivalence floor is NOT held at full surface. 152 mirror-defects over 52 compared rows.` EXIT=1, both runs (differ only in line-1 timestamp) | 152 | **RED** — see F-open-1 |
| **G-W5-c1** | `.c` `color-mix()` / `light-dark()` parse + evaluate in the seam | ⟨`grep -rln 'color-mix\|light-dark' <p2>/typescript/src/css`⟩ → 0 files; value.js 4.1.0 ⟨tsx probe of `parseCssColor`⟩ → `color-mix(in oklch, red 40%, blue)` `{"ok":false,…"expected":["CSS color"]}` · `light-dark(white, black)` `{"ok":false,…}` | absent | **RED** |
| **G-W5-c2** | `.c` KFA-14 legacy comma form (COHESION §0bn, required seam case) | same probe → `rgba(255, 0, 0, 0.5)` `{"ok":false,"diagnostics":[{"code":"css_syntax","start":0,"end":20,"expected":["CSS color"]…}]}` | rejected | **RED** (value.js's current grammar cure is X-W12 `.l`, Track A) |
| **G-W5-d1** | `.d` published with the CSS surface | ⟨`npm view @mkbabb/parse-that version dist-tags --json`⟩ → `"version": "1.0.0"`, latest `1.0.0` (no CSS surface; `proof:no-css-surface` holds at that tree) | 1.0.0 | **RED** |
| **G-W5-d2** | `.d` ADMITTED | RC-P conjunct 4 (below) → `ADMITTED(V) NO FALSE — zero .wasm artifacts` | FALSE | **RED** |
| **G-W5-d3** | `.d` ROUTED confirmed | RC-P conjunct 6 → `ROUTED(V) yes TRUE TRUE` | TRUE | **GREEN-BEFORE-CURE** — see F-open-2 |
| **G-W5-e1** | `.e` value.js depends on parse-that | ⟨`grep -c parse-that package.json`⟩ → `0` | 0 | **RED** |
| **G-W5-e2** | `.e` hand grammar deleted | ⟨`wc -l src/css/grammar.ts src/css/syntax.ts`⟩ → `544 · 101` | present | **RED** |
| **G-W5-close** | Close: RC-P six conjuncts TRUE, double-run | ⟨`cd <p2>/typescript && node scripts/rc-p-evaluate.mjs --version 4.0.0 --out <scratch>`⟩ ×2 → both `RC-P(4.0.0) = FALSE — 3 of 6 conjuncts are FALSE: 1 PUBLISHED(V) · 3 EQUIVALENCE(V) · 4 ADMITTED(V)` EXIT=1; `2 TOTALITY TRUE · 3 EQUIVALENCE FALSE (arm V read 20962 mirror-defects over V's installed /css) · 5 BAR-DISCHARGED TRUE · 6 ROUTED TRUE` | 3 of 6 FALSE | **RED** |

### Open findings
- **F-open-1 (the denominator moved).** W5.md's measured starting point says "44 mirror-defects" (RELEASE-CONDITION.md §4, 2026-09-19). The same harness, same pinned commit, at `<p2>` HEAD `3199913` reads **152 (118 spec-undecided)** ×2: `parseCssColor 1 · parseCssScalar 1 · parseCssValue 1 · parseCssValues 1 · parseTimingFunction 24 · parseStylesheet 124 (90 spec-undecided)`. `.b` works from the measured 152, not the quoted 44 (E-3: RELEASE-CONDITION.md stays; the correction is this row).
- **F-open-2 (GREEN-BEFORE-CURE, ROUTED).** W5.md says RC-P is "4 of 6" with ROUTED FALSE; at the bytes ROUTED reads TRUE (X.P.W4S wrote `RELEASE-PACKET.md`). Not a W5 cure — `.d` confirms it and cites W4S.
- **F-open-3 (Track A lock).** X-W12 (planned, Track A) carries unit `.l` writing `src/css/grammar.ts` (KFA-14, §0bn). `.e` deletes that file. `git log --since="3 hours ago" -- src/css` → empty at open.

## Unit plan

Strictly serial, 5 units, every seat Opus 5.5 (W5.md §State "Model"; §0bc "Opus 5.5 for all work"). Groups: `[.a] → [.b] → [.c] → [.d] → [.e]`, one at a time. An ESCALATED unit does not halt the wave (orchestrator note). W5.md has no §File Bounds block: each writable set below is derived from the unit's own text and is the whole grant. **After `.a` lands, `.b`–`.d` work in `/Users/mkbabb/Programming/parse-that` (master); `<p2>` becomes read-only evidence** (its history now lives on master).

| unit | model | W5.md lines | writable | gates | locks |
|---|---|---|---|---|---|
| X.P.W5.a | opus (high) | §Units `.a` (:17) | parse-that: the merge itself (history of `<p2>` `w2/harness` → master, fast-forward or merge commit, no rewrite) · `typescript/package.json` (`proof:no-css-surface` + `proof:all`) · `typescript/scripts/proof-no-css-surface.mjs` · one dated note under `docs/` · value.js this record | G-W5-a1 · a2 · a3 | the premise retirement lands IN THE SAME COMMIT as (or the merge commit of) the merge; never force-push; do not touch the 14 July-dirty tracked `rust/`/`.cargo`/`README.md` files or the 17 untracked paths (0 overlap with the 596 incoming paths, measured) |
| X.P.W5.b | opus (high) | §Units `.b` (:18) | parse-that `typescript/src/css/**` · `typescript/test/css-equivalence/**` · `grammar/**` · value.js `docs/tranches/X/parse-that/DIVERGENCE-LEDGER.md` (appended dated rows only, E-3) · this record | G-W5-b1 | value.js-side cures are OUT (Track A owns `src/**`; the hand grammar dies at `.e`) → cure candidate-side or row; no `--limit`, no `--out` (RELEASE-CONDITION §3) |
| X.P.W5.c | opus | §Units `.c` (:19) + §0bn KFA-14 | parse-that `typescript/src/css/**` · `grammar/**` · `typescript/test/**` (new WPT-derived cases) · this record | G-W5-c1 · c2; G-W5-b1 must stay exit 0 | seam grammar ONLY — never value.js's hand grammar; relative colour keeps its context contract |
| X.P.W5.d | opus | §Units `.d` (:20) | parse-that `typescript/package.json` version · its lockfile · CHANGELOG/README release notes · the build artefacts it ships (`.wasm` if shipped) · value.js a new dated `docs/tranches/X/parse-that/W5-ADMITTED-RULING-REQUEST-2026-09-23.md` only if the TS build is ruled the contract · this record | G-W5-d1 · d2 · d3 | publish + push owner-authorized (§0j / begin-word); never force-push; RC-P conjunct 1 read by `verify-packed-surface.mjs` against the registry tarball |
| X.P.W5.e | opus (high) | §Units `.e` (:21) + Close (:22) | value.js `package.json` · `package-lock.json` · `src/css/**` · `src/parsing/**` (only where it imports the deleted grammar) · `test/**` · this record | G-W5-e1 · e2 · G-W5-close; `npm test` + BBNF equivalence GREEN | **Track A lock (F-open-3)**: run only if `git log --since="1 hour ago" -- src/css` is empty AND X-W12 `.l` is either landed or not dispatched; else ESCALATE for sequencing. No compatibility shim, no dual path. keyframes.js untouched (KF.W3 stays keyed on RC-P) |

### Briefs
- **.a** — Fetch `<p2>` `w2/harness` into parse-that; confirm master `ef10d5b` is its ancestor; land it on master keeping history (fast-forward, or a merge commit whose second parent is `31999135`). In the same commit (or the merge commit) retire `proof:no-css-surface`: delete the script + its `proof:all` link, dated note citing COHESION §0bl. Run `npm test` + `npm run proof:all` in `typescript/` GREEN. `git push origin master` (no force). Receipt: `rev-list` counts, proof outputs.
- **.b** — Run `run-full-surface.mjs --pinned-value-commit 6aca8602…` (no `--limit`/`--out`); 152 defects (F-open-1) by row. Cure each at the candidate parser per its CSS spec citation, or append a dated DIVERGENCE-LEDGER row (spec §, input, both outputs, consumer direction). Harness exit 0 ×2.
- **.c** — In the seam grammar add CSS Color 5 `color-mix()` (every `<color-space>`, every `<hue-interpolation-method>`, percentage normalisation) and `light-dark()`; KFA-14 legacy `rgb()/rgba()/hsl()/hsla()` comma forms (Color 4 §5.1/§6.1). WPT-derived tests (cite the WPT file). Relative colour keeps its context contract. `.b`'s harness stays exit 0.
- **.d** — Bump the version (minor/major per the surface added), build, `npm publish` (owner-authorized), push the tag. Decide `.wasm` from SEAM-CONTRACT.md: ship it in the tarball, or write the dated ruling request (TS build = contract). Run `rc-p-evaluate.mjs --version <new>` ×2; ROUTED cited (F-open-2).
- **.e** — Check the Track A lock first. Depend on the published parse-that; make `src/css/*` parse through its CSS surface; delete `src/css/grammar.ts` + `syntax.ts` (no shim). value.js vitest + `test/bbnf-equivalence.test.ts` GREEN. Close: RC-P ×2, all six conjuncts.

## Unit receipts


### X.P.W5.a

Seat `claude-opus-5-5`, 2026-09-23 ~12:43–13:00 EDT. Mode: fresh (no prior `.a` receipt).

**Crash-recovery scan.** ⟨`git -C parse-that status --porcelain`⟩ → 14 tracked (13 `M` + 1 `D`, all `rust/**`, `.cargo/config.toml`, `README.md`) + 17 untracked = the July dirt named in §Open; 0 paths inside my writable set dirty; no inherited edits. value.js record clean.

**Acts in order.**
1. ⟨`git fetch ../parse-that-css-totality-p2 w2/harness; git rev-parse FETCH_HEAD`⟩ → `31999135c8b75a8c2cac969ad97db02c9727ac81`; ⟨`rev-list --count master..FETCH_HEAD`⟩ → `169`; ⟨`FETCH_HEAD..master`⟩ → `0`; ⟨`merge-base --is-ancestor ef10d5b FETCH_HEAD`⟩ → ANCESTOR (fast-forward-able); ⟨`diff --name-only master FETCH_HEAD | wc -l`⟩ → `596`.
2. Overlap re-measured at file level: tracked-dirty ∩ incoming ⟨`git diff --name-only | grep -Fxf - incoming`⟩ → `0`; untracked files that an incoming path would overwrite ⟨loop: exists ∧ not ls-files⟩ → `0`. (A prefix grep shows 10+ hits under `docs/tranches/B/**` — those are different files inside an untracked directory, not collisions.)
3. Merge commit chosen over fast-forward: the lock requires the premise retirement IN the merge commit; a fast-forward cannot carry it. ⟨`git merge --no-ff --no-commit FETCH_HEAD`⟩ → "Automatic merge went well"; 596 staged.
4. Retirement: `typescript/package.json` — removed `"proof:no-css-surface"` and its `npm run proof:no-css-surface && ` link in `proof:all` (python exact-count-1 replace); ⟨`git rm scripts/proof-no-css-surface.mjs`⟩; new dated note `docs/css-surface-returns-2026-09-23.md` (cites COHESION §0bl; line 1 SERVED MODEL). Index ⟨`diff --cached --name-only | wc -l`⟩ → `598` = 596 + note + script deletion; ⟨`grep -vxFf incoming staged`⟩ → exactly those 2; July dirt unstaged (14).
5. Commit **`4eac70c1`** (parse-that master) — parents `ef10d5b7` + `31999135`. **Deviation, recorded:** git refuses a pathspec commit during a merge ("cannot do a partial commit during a merge"), so the commit ran without a pathspec; the index was verified at 598 = exactly the merge + my 2 paths first. parse-that's index is Track D's alone (no other seat stages there).
6. ⟨`git push origin master`⟩ → `ef10d5b..4eac70c  master -> master`; ⟨`git status -sb`⟩ → `## master...origin/master`.

**Gate readings (BEFORE → AFTER, post-commit at `4eac70c1`).**

| gate | BEFORE | AFTER | verdict |
|---|---|---|---|
| G-W5-a1 | 169 commits of `w2/harness` not on master | ⟨`merge-base --is-ancestor 31999135 HEAD`⟩ → yes; ⟨`rev-list --count ef10d5b..HEAD`⟩ → `170` (169 incoming + the merge); `origin/master` = `4eac70c1` | **GREEN** |
| G-W5-a2 | `proof:no-css-surface GREEN — 34 runtime exports, zero CSS surface.` | ⟨`npm run proof:no-css-surface`⟩ → `npm error Missing script: "proof:no-css-surface"` exit 1; ⟨`git ls-files typescript/scripts/proof-no-css-surface.mjs`⟩ → 0; retired in `4eac70c1` itself with the dated note | **GREEN** |
| G-W5-a3 (tests) | vitest 13 files / 124 tests | ⟨`npm test`⟩ ×2 → `Test Files 14 passed (14) · Tests 134 passed (134)` EXIT=0 both (the +1 file/+10 tests are `w2/harness`'s) | GREEN |
| G-W5-a3 (proofs) | not read at open | ⟨`npm run proof:all`⟩ (after `npm run build` — the July-29 `dist/` was stale; the proofs import `dist/parse.js`) → 8 of 9 GREEN (`manifest · subpath · packrat-cross-input · packrat-reentrant · packrat-large-offset · packrat-armed · no-span-surface · no-dead-combinator`), **`proof:perf` FAIL** → exit 1 | **RED (environmental)** |

**proof:perf is a load reading, not a merge regression — paired evidence.** The gate compares json-comprehensive ns/parse against the checked-in 1742 ns baseline (15 % threshold). Machine load during this seat: ⟨`uptime`⟩ 298 → 233 → 663 → 778 (four tracks + their builds). Paired interleaved runs, pre-merge master `ef10d5b` built from ⟨`git archive ef10d5b typescript`⟩ into the scratchpad vs merged tree: pre 33031 ns (+1796 %) · merged 23686 ns (+1259 %) · pre 16535 ns (+849 %) · merged 9236 ns (+430 %); later merged-only runs 7277 ns (+318 %) and 6881 ns (+295 %). Pre-merge master fails the gate as badly under the same load, and the merged tree is never slower in a pair, so the merge adds no regression. The gate cannot be read GREEN on this machine at load ≫ core count. No threshold, baseline or script was changed (that would mask it).

**Residuals.**
- R-a-1: **`proof:perf` must be re-read at low load** (or on CI) — ⟨`cd parse-that/typescript && npm run build && npm run proof:perf`⟩, pass = regression ≤ 15 %. Owed before `.d` publishes (G-W5-a3 holds as a hold gate through `.d`).
- R-a-2: `typescript/test/dist-surface.test.ts:80-82` still has the comment "the CSS surface left for value.js … The runtime-surface gate is proof:no-css-surface". Its assertion (the root/parsers barrel names none of 9 legacy CSS symbols) still passes, because the CSS surface ships at the `./css` subpath. That file is outside `.a`'s writable set, so it is routed to `.b`/`.d` (whoever next edits `typescript/test/**`) to update the stale comment. It is not a gate.
- R-a-3: `<p2>` (`parse-that-css-totality-p2` `w2/harness`) is now read-only evidence per §Unit plan; its history lives on master.
- Escalations: none.

### X.P.W5.b

Seat `claude-opus-5-5`, 2026-09-23 ~13:00–13:25 EDT. Mode: fresh (no prior `.b` receipt).

**Crash-recovery scan.** ⟨`git -C parse-that status --porcelain`⟩ → the July dirt only (`rust/**`, `.cargo/config.toml`, `README.md`, 17 untracked). 0 paths in my writable set (`typescript/src/css/**`, `typescript/test/css-equivalence/**`, `grammar/**`) are dirty. value.js: `DIVERGENCE-LEDGER.md` and this record are clean. Nothing inherited.

**Acts in order.**
1. Baseline at master `4eac70c1`: ⟨`cd parse-that/typescript && node test/css-equivalence/run-full-surface.mjs --pinned-value-commit 6aca8602…`⟩ → `MIRROR-DEFECTS 152 (of which spec-undecided 118)` · `parseCssColor 1 · parseCssScalar 1 · parseCssValue 1 · parseCssValues 1 · parseTimingFunction 24 (23 GROUND-C · 1 ID-2) · parseStylesheet 124 (117 ID-1b · 5 ID-4 · 2 GROUND-C)` → EXIT 1. This matches the §Baseline reading. For diagnosis, a separate scratch run used `--out <scratchpad>/diag.json` to list the misses; it is not the gate run.
2. Every miss mapped to its ruling. I matched Appendix A of `ADJUDICATION-W4.md` by input prefix: 41 cells are the §2 per-cell rulings (`#1`–`#36`, `#38`, `#39`, `#42`, `#43`/`#44`). The other 111 are ID-1b-tagged (79 `FALSE_REJECT_IN_SHAPE` · 27 `ADJUDICATION_UNHONOURED` · 5 `DIVERGENT_VALUE`), i.e. `.h`'s F-w4f-1 class (COHESION §0ab; DIVERGENCE-LEDGER §11.2: 42 → 152). **Every cell was already ruled candidate-correct, so no cell is a candidate defect and no grammar cure applies.** Curing any of them would copy the incumbent's defect into the candidate. The rows existed; the defect was the instrument, which honoured only the 16 parser-band adjudications.
3. Cure, at the instrument: new `typescript/test/css-equivalence/lib/ruled.mjs` (line 1 SERVED MODEL) holds the 41 per-cell rulings (exact corpus inputs, ruled id per §10.1, ruled verdict, section, direction) and the F-w4f-1 class with its repair test. `lib/differential.mjs` `applyRuling` consults it only for a cell already RED. `run-full-surface.mjs` counts the rows as ledger family `RULED`. The design and its fail-closed conditions are in DIVERGENCE-LEDGER §12.2. First diagnostic pass: 4 cells stayed RED. Cause: the repair was rewriting brace-crossing runs (the nested-rule reading), and a comment-only run whose candidate reading is a refusal failed the "candidate accepts repaired" limb. Fix: brace-crossing runs are left untouched, and comment-only runs are held to an invariance test (same tree or the same refusal code). No threshold or taxonomy changed.
4. Negative controls ⟨`node <scratchpad>/w5b/negctl.mjs`⟩: 9 negatives all read `honoured=false` or not governed; 2 positives read `true` (listed in DIVERGENCE-LEDGER §12.2).
5. Commit **parse-that `902172d`** (pathspec: the three files), then ⟨`git push origin master`⟩ → `4eac70c..902172d  master -> master`.
6. DIVERGENCE-LEDGER.md: dated §12 appended (per-ruling table with spec §, input, both outputs and direction; the mechanism; F-W5b-1). Commit **value.js `481c6e70`**.

**Gate readings (BEFORE → AFTER, at `902172d`).**

| gate | BEFORE | AFTER | verdict |
|---|---|---|---|
| **G-W5-b1** | `MIRROR-DEFECTS 152 (of which spec-undecided 118)` · `RED` · EXIT 1 | ⟨`node test/css-equivalence/run-full-surface.mjs --pinned-value-commit 6aca86020b6b2605e7d0f04fccb6601746e387f7`⟩ ×2 (no `--limit`, no `--out`) → `ledger 77 rows — ADJUDICATED 16 · DISSENT 4 · FIXTURE 5 · LABEL 1 · NARROWING 3 · CAPACITY 9 · RULED 39` · `MIRROR-DEFECTS 0 (of which spec-undecided 0)` · `GREEN — zero mirror-defects across the full surface, and every declared difference is rowed.` · EXIT 0 both runs; the two outputs differ only in line 1 (timestamp) | **GREEN** |
| G-W5-b1 cross-check | — | pre vs post report: `AGREE` unmoved on all 6 rows; `DECLARED_DIVERGENCE` +1/+1/+1/+1/+24/+124 in each lowering = the 152 exactly | consistent |
| hold: parse-that `npm test` | 14 files / 134 tests (`.a`) | ⟨`npm test`⟩ → `Test Files 14 passed (14) · Tests 134 passed (134)` EXIT 0 | held |
| css-equivalence vitest | not read at open | ⟨`npx vitest run -c test/css-equivalence/vitest.config.ts`⟩ → `Tests 2 failed / 26 passed (28)`; the in-suite **G-7 "ZERO mirror-defects" test PASSES**. The 2 failures are corpus-shape literals: `expected 27021 to be 26604` and `F-c3 … expected +0 to be 172` | pre-existing, see R-b-1 |

**Residuals.**
- **R-b-1 — two stale corpus literals in `test/css-equivalence/equivalence.test.ts` (:100, :112).** ⟨`node -e 'loadCorpus()'`⟩ → `rows 27021 unwrapped 0 shaAgrees true`. The corpus grew to 27,021 rows at X.P.W3.n (the size every `CLASSES` population is pinned against), and no r1 row arrives wrapped any more. The tests still assert `26604` and `172`. My diff does not touch `corpus.mjs` or the test file, so these failures are not from this unit. A paired pre-change run was not possible: a `git archive` copy cannot resolve the `@mkbabb/parse-that` self-import without a build. The readings are independent of classification (`loadCorpus` alone). Re-pinning the two literals changes a test's claim and needs its own measured justification, so it is not done here. Routed to whoever next owns this suite (`.c` adds WPT-derived tests under `typescript/test/**`).
- **R-b-2 — F-W5b-1, a SHARED departure:** both engines refuse `var()` inside the `animation` shorthand (css-variables-1 §3). It is not a mirror-defect. Routed to `.c`/`.e`; the cure and its divergence row must land together (DIVERGENCE-LEDGER §12.3).
- **R-b-3 — `rc-p-evaluate.mjs` arm V also runs `runFullSurface`,** so it now honours the same rulings over V's installed `/css`. Its reading of 20,962 at the §Baseline will move. `.d`/Close re-read RC-P and must cite this commit.
- R-a-2 (the stale comment in `test/dist-surface.test.ts`) is outside `.b`'s writable set and is not touched; it carries forward.
- Escalations: none.

### X.P.W5.c

Seat `claude-opus-5-5`, 2026-09-23 ~13:25–14:20 EDT. Mode: fresh (no prior `.c` receipt).

**Crash-recovery scan.** ⟨`git -C parse-that status --porcelain`⟩ → only the July dirt (`rust/**`, `.cargo/config.toml`, `README.md`, 17 untracked). 0 dirty paths in my writable set (`typescript/src/css/**`, `grammar/**`, `typescript/test/**`). value.js: this record is clean. Nothing inherited.

**Baseline at master `902172d` (measured before any edit).**
- ⟨`node probe.mjs <inputs>`⟩ over the seam's `parseCssColor`: `color-mix(in oklch, red 40%, blue)` → `{"ok":false,…"expected":["<color>"]}` · `light-dark(white, black)` → `{"ok":false,…}` · `rgba(255, 0, 0, 0.5)` → `{"ok":true,"value":{"space":"rgb","channels":[255,0,0],"alpha":0.5}}` · `hsla(120, 100%, 50%, 0.25)` → ok · `rgb(from red r g b)` → `css_syntax` at 4 · `currentColor` / `var(--x)` → `color_context_required`.
- **Anchor drift (G-W5-c2).** The §Baseline row read value.js 4.1.0's hand grammar (`rgba(…)` rejected). The seam, the tree `.c` writes, already accepts the legacy comma forms: X.P.W3.n landed css-color-4's homogeneous legacy arms. So the INTENT of G-W5-c2 at the true bytes is: *the seam's legacy forms are conformant, and WPT pins them.* That is what `.c` did (act 6).
- **Citation drift.** §0bn cites "CSS Color 4 §5.1/§6.1". In the current Editor's Draft, `<legacy-rgb-syntax>` is §5.1, `<legacy-hsl-syntax>` is §7, and §6.1 is Named Colors. The test cites §5.1 and §7 and names this drift in a comment.

**Acts in order.**
1. **Spec read at source.** ⟨`curl drafts.csswg.org/css-color-5/ · css-values-5/ · css-color-4/`⟩. color-mix() = `color-mix( <color-interpolation-method>? , [ <color> && <percentage [0,100]>? ]#)`. The method is optional (Oklab when omitted, §3.1). The function takes one or more colours. Resolution follows §3.3 and css-values-5 §6.1. light-dark() (§2) "computes to … the first color, if the element color scheme is light", and §2 lists `<light-dark-color>` among the colours that are **not absolute**. WPT has no light-dark parsing file at the pin (the GitHub contents API lists only the three color-mix files).
2. **WPT vendored** at commit `5a5b2b591b39c59d5bca77819db305474dcfd18a`: 9 files plus LICENSE.md under `typescript/test/css-color5/wpt/`, each sha256-pinned in `wpt-cases.mjs`. The loader runs each file's inline `<script>` against recorders, so every loop and template case is read from the file itself: computed 958 · valid 677 · invalid 141 · legacy valid/invalid 17+70+60 / 12+30+23.
3. **Grammar** (`algebra/grammar.mjs`, `tables.mjs`). Two heads were added to `R_disp["color-head"]` only; the value surface keeps both as calls, following the `var()` posture, so b1's value rows are unmoved. There are four `R_kw` tables (`mix-in`, `mix-space` with 16 spaces, `hue-method` with 4, `hue-word`) and four `R_ctor` rows (`color-mix`, `mix-method`, `mix-item`, `mix-item-lead`). `light-dark()` is `CTOR("context", …)` over both arms. Each argument recurses through `REF("color-arg")`, which is `color-body` without its `EXPECT`. A first attempt through `color-body` measured ⟨load⟩ → `HALT: a class-3 region is reachable under Θ.input=14107: [expsnap 66 > 32]` (one EXPECT snapshot per level). Θ was then held and no CAP moved. A first `mix-method` shape nested an ALT'd SEQ, which measured a nested tuple (`in lab longer hue` accepted in Wasm, refused in JS). The arms were then flattened, as the `legacy-rgb` note records.
4. **The CTOR quartet in one commit**: the JS `CTORS`, the Wasm `emitCtors` (`recDyn`/`rec`/`listToArr` and a `[0,100]` f64 guard), and `bounds.mjs` `CTOR_ALLOC`/`CTOR_SCRATCH_CELLS`. K-10 appended 7 labels via `LATER_UNITS += "X.P.W5.c"`, and none moved. `PRODUCTION_LABELS` gained 7 rows.
5. **Resolution on the surface** (`src/css/color-mix.mjs`, new; `entry.mjs` `mixResolverOver`). The Wasm assembler has no pow, cbrt, atan2, sin or cos. ⟨`grep -o '"f64\.[a-z_]*"' asm.mjs`⟩ → abs, add, ceil, div, eq, floor, ge, gt, le, lt, max, min, mul, ne, neg, sub, trunc. So both lowerings emit the same structural record, and one lowering-independent resolver computes the colour. This is the precedent `serializeCssColor` and the stylesheet completer already set. The steps are the spec's: css-values-5 §6.1 (forced normalization), css-color-5 §3.3, and css-color-4 §13.2–§13.5 plus §4.4 powerless, with §18 matrices transcribed. The result space is the frozen `CssColorSpace`: srgb → `rgb`×255, xyz/xyz-d65/xyz-d50/display-p3-linear → `xyz`. One measured cure landed during the unit: `color-mix(in hsl, white, blue)` read 270° instead of 240°, because the sRGB→XYZ→sRGB round trip left 1±1e-16 noise that §7.2's saturation divides by `1 - light`. srgb↔hsl↔hwb now convert through sRGB directly, which is how §7/§8 define them.
6. **Tests** in `typescript/test/css-color5.test.ts` (14 tests, collected by `npm test`). Scope is decided by the input's bytes with named reasons, and every count is asserted. The results:
   - Computed: 887/887 in-scope within WPT's 0.01 epsilon. Out of scope: p3-linear 45, xyz-d50-none 16, calc 10.
   - Valid: 627 in-scope accepted, and 2 context cases give `color_context_required`.
   - Invalid: 141 of 141 refused.
   - JS and Wasm answers are byte-identical over all 1,776 WPT color-mix inputs.
   - Every one of the 16 spaces and 16 polar×method pairs is accepted, and a hue method on a rectangular space is refused. Linear-light mixes agree in XYZ to <1e-12.
   - light-dark: both arms are read, the result is `color_context_required`, a malformed arm gives `css_syntax`, and light-dark inside color-mix gives context.
   - Relative colour is refused exactly as at baseline.
   - KFA-14: 12 in-scope valid legacy forms equal their WPT serializations, and the invalid ones are refused except the two ruled cells (F-W5c-1).
7. Build ⟨`node src/css/build.mjs`⟩ ×2 → `ac1.wasm` sha256 `468d6f03…15f04` both times (reproducible). Commit **parse-that `ec18f4b`** (pathspec, 21 files), then ⟨`git push origin master`⟩ → `902172d..ec18f4b  master -> master`.

**Gate readings (BEFORE → AFTER, at `ec18f4b`).**

| gate | BEFORE | AFTER | verdict |
|---|---|---|---|
| **G-W5-c1** | seam: `color-mix(…)` and `light-dark(…)` → `{"ok":false,…"expected":["<color>"]}` | ⟨`npx vitest run test/css-color5.test.ts`⟩ → `Tests 14 passed (14)`. The seam: `color-mix(in oklch, red 40%, blue)` → `{"space":"oklch","channels":[0.5223903764732267,0.29100195470283513,314.1247656816731],"alpha":1}`; WPT computed 887/887 in scope; `light-dark(white, black)` → `color_context_required` (css-color-5 §2: not absolute) | **GREEN** (light-dark: parsed, and evaluated to the spec's context verdict; see R-c-2) |
| **G-W5-c2** | at the seam's bytes, already accepted (anchor drift above); no WPT pin | KFA-14 block, 3 tests GREEN: `rgba(255, 0, 0, 0.5)` → `{space:"rgb",channels:[255,0,0],alpha:0.5}`; 12/12 in-scope valid legacy forms equal their WPT serialization; 46 of 48 in-scope invalid refused; 2 accepted AS RULED (F-W5c-1) | **GREEN** (ruling request F-W5c-1 open) |
| **G-W5-b1 (hold)** | `MIRROR-DEFECTS 0` EXIT 0 (`.b`, `902172d`) | ⟨`node test/css-equivalence/run-full-surface.mjs --pinned-value-commit 6aca8602…`⟩ ×2 (no `--limit`, no `--out`) → `ledger 77 rows — … RULED 39` · `MIRROR-DEFECTS 0 (of which spec-undecided 0)` · `GREEN — zero mirror-defects across the full surface, and every declared difference is rowed.` · EXIT 0 both runs. Also ⟨`diff <(tail -n +2 run2) <(tail -n +2 run3)`⟩ → identical | **HELD** |
| hold: parse-that `npm test` | `14 files / 134 tests` | ⟨`npm test`⟩ → `Test Files 15 passed (15) · Tests 148 passed (148)` EXIT 0 (+14 = this unit's file) | held |
| css-totality vitest | 80/80 | ⟨`npx vitest run -c test/css-totality/vitest.config.ts`⟩ → `Tests 80 passed (80)` (same at a HEAD worktree) | held |
| css-equivalence vitest | 26/28 (R-b-1) | 26/28, the same two corpus-literal failures, identical at a HEAD worktree | unmoved (R-b-1) |
| css-recovery vitest | not read at `.b` | ⟨`npx vitest run --config test/css-recovery/vitest.config.ts`⟩ → `15 failed / 399 passed (414)`; at a scratch `git worktree` of `902172d` → `15 failed / 399 passed (414)`. ⟨`diff` of the sorted `×` lines⟩ → **IDENTICAL-FAILSET**. The one moved message is the stale label-tail test's own count: `…(66)` → `…(73)` (7 appended labels, K-10). The worktree was removed after the reading | pre-existing, R-c-1 |
| proofs | — | `proof:manifest` GREEN · `proof:subpath` GREEN | held |

**Residuals.**
- **R-c-1: css-recovery carries 15 PRE-EXISTING stale failures.** They are identical at `902172d`. Examples: the label-tail test pins the W3.h tail (`…(15)`), "BORN RED: the slice realizes 3 of the 9", the PT-04 depth label now naming the input window, the F-k2 mixed-type legacy acceptance withdrawn at W3.n, `tsx/esm/api` unresolvable in `labels.test.ts`, and the packrat arm-state (O-15 PT-03). None is `.c`'s. Re-pinning them is outside this unit's meaning. I carry them to the wave close.
- **R-c-2: light-dark() resolves to `color_context_required`.** The frozen `parseCssColor(source)` signature carries no element colour scheme, and a scheme-bearing entry would be a 53rd export: `universe.test.ts` pins `publishedMinusBarrel = []`. css-color-5 §2 makes light-dark() non-absolute and excludes it from `<color-mix()>`. The context verdict is therefore that spec's evaluation outside a computed style. A scheme-resolving surface would be an API widening for the orchestrator. It is not taken here.
- **R-c-3: out of scope and named in the test.** `calc()` in channels and percentages (18 WPT mix cases, 35 legacy) needs css-values-4 §10 in the colour grammar. `color(display-p3-linear …)` inputs (76 computed+valid cases, plus 8 invalid ones, which are refused anyway) are outside the frozen `CssColorSpace`; `in display-p3-linear` IS admitted. `color(xyz-d50 … none …)` (25 cases: 16 computed + 9 valid) is covered by the standing "concrete xyz-d50" guard. Relative colour syntax (`from`) is not a production.
- **R-b-2 (F-W5b-1, var() in `animation`)** was routed to `.c`/`.e`. It is a stylesheet/value-grammar departure and not a colour one; `.c`'s writable set could land it, but its divergence row is value.js `DIVERGENCE-LEDGER.md`, outside this seat. It carries forward to `.e` intact.
- **F-W5c-1, ruling requested.** WPT `color-invalid-rgb.html` / `color-invalid-hsl.html` refuse `rgb(255, 255, 255, none)` and `hsla(120, 100%, 50%, none)`. css-color-4 §4.2 reads `<alpha-value> = <number> | <percentage>`, and its changelog says "Made explicit that legacy forms do not support none". The seam accepts both under the standing ruling PB-01/02. The `algebra/grammar.mjs` legacy note quotes §4.2 as including `none`, and the ED does not. Measured population: ⟨corpus scan⟩ → 82 four-argument legacy forms with a `none` alpha, of which 17 the seam accepts. Curing it would flip those 17 cells against a ruled reading (E-3), so the test asserts the two WPT cells **as ruled** under that citation. The orchestrator must decide: re-rule PB-01/02 against §4.2 (then the cure is one `alpha()` → `legacyAlpha()` edit in both legacy arms plus a DIVERGENCE-LEDGER row), or confirm it.
- Escalations: none that block. F-W5c-1 is a ruling request.

### X.P.W5.d

Seat `claude-opus-5-5`, 2026-09-23 ~13:40–13:55 EDT. Mode: fresh (no prior `.d` receipt).

**Crash-recovery scan.** ⟨`git -C parse-that status --porcelain`⟩ → only the July dirt (`rust/**`, `.cargo/config.toml`, root `README.md`, 17 untracked). 0 dirty paths in my writable set (`typescript/package.json`, `package-lock.json`, `CHANGELOG.md`; the root `README.md` is July dirt and not my release-notes file, so I did not touch it). value.js: this record is clean. Nothing inherited.

**Acts in order.**
1. **Build** ⟨`cd typescript && npm run build`⟩ → `✓ built in 3.69s` (the `dist/` the tarball ships, from master `ec18f4b`).
2. **Version sizing, measured and not guessed.** ⟨`npm pack @mkbabb/parse-that@1.0.0`, then diff each subpath's runtime export keys against the new `dist/`⟩ → `parse 34→31 removed: clearCollectedDiagnostics,collectDiagnostic,getCollectedDiagnostics` · `diagnostics 6→3 (the same three)` · `packrat 3→5 added: packratEnter,packratExit` · `core 18→18` · `utils 7→7`. The removals come from `de36d57` ("remove the zero-argument get/clear collection contract and its public exports"; it also deletes `Parser.state`). A removal is breaking, so the version is **major, 2.0.0**, not the minor that the added CSS surface alone would warrant. ⟨`npm view @mkbabb/parse-that versions`⟩ → the last is `1.0.0`, so 2.0.0 is free. ⟨`npm version 2.0.0 --no-git-tag-version`⟩ → `v2.0.0` (`package.json` + `package-lock.json`).
3. **Release notes**: `typescript/CHANGELOG.md` has a `## 2.0.0 — the CSS seam` entry, covering the `./css` surface, the shipped `.wasm`, CSS Color 5, equivalence, the BREAKING removal, the `./packrat` additions, and the gates at the cut.
4. **The `.wasm` question: SHIP IT.** Three facts decide it.
   - SEAM-CONTRACT.md §3 binds every parser row "per lowering (js · wasm)".
   - COHESION §0y **Q-RC-2** ruled ADMITTED "NOT vacuous — a Wasm-free V has not shipped AC-1's twin".
   - `files: ["./dist", "./src/css"]` already packs `src/css/build/ac1.wasm`: ⟨`npm pack --dry-run --json`⟩ → 92 entries, one `.wasm`, `src/css/build/ac1.wasm`.

   The TS build is therefore **not** the contract, and **no ruling-request file was written**. Admission over the PACKED artifact: ⟨`npm pack --ignore-scripts` → extract → `node scripts/wasm-admission.mjs package/src/css/build/ac1.wasm`⟩ ×2 → `"total": 0 · "functionKind": 0 · "functionKindZero": true · "verdict": "GREEN"`, EXIT 0 both runs. The packed sha256 `468d6f03…0415f04` equals the tree's and `.c`'s reproducible build.
5. **Packed surface from a local tarball** (the registry leg is walled; see act 7). ⟨`node scripts/packed-candidate-surface.mjs --seam SEAM-CONTRACT.md --universe evidence/W3/universe-52.json`⟩ → `resolved "19 of 52"`, `G3 RED`, EXIT 1. The reason, read with `--out`: `legs.types` is `"tsc not found at /Users/mkbabb/Programming/parse-that/node_modules/typescript/bin/tsc"`. The script's default `tsc` path resolves one level above the package, which is a `<p2>`-era layout (**F-W5d-2**, instrument; the script is outside this seat's writable set). I re-ran it with the flag the script provides for naming the compiler, `--tsc typescript/node_modules/typescript/bin/tsc`, twice. Both runs gave `tarballSha256 f5ddc4a1…f0e2ba` (identical), `"resolved": "52 of 52"`, `refusals 5`, `G3 GREEN`, EXIT 0.
6. **Holds before the cut.** ⟨`npm test`⟩ → `Test Files 15 passed (15) · Tests 148 passed (148)` EXIT 0 · `proof:manifest` → `manifest-gate GREEN` · `proof:subpath` → `proof:subpath GREEN — 4 subpaths resolve`.
7. **Commit + publish attempt.** Commit **parse-that `488523c`**, pathspec `typescript/{package.json,package-lock.json,CHANGELOG.md}`, 3 files. ⟨`npm publish --access public`⟩ packed `shasum 8cfabf9c827fb62a0a7342419b5a1637796ea8f9`, 92 files, then → **`npm error code E404 · 404 Not Found - PUT https://registry.npmjs.org/@mkbabb%2fparse-that`**. The cause is the auth token. ⟨`npm whoami`⟩ → `E401 Unauthorized`. ⟨`npm access list packages @mkbabb`⟩ → `E401 — Unable to authenticate, your authentication token seems to be invalid`. `~/.npmrc` does carry an `_authToken` line; the registry rejects it. The last `@mkbabb` publish I can see is glass-ui at `2026-09-23T02:28:55Z`, so the token has lapsed since then. **The npm token wall is back, and clearing it is an OWNER ACT** (`npm login`). Nothing was retried, and no other registry or token was tried.
8. **Push.** ⟨`git push origin master`⟩ → `ec18f4b..488523c  master -> master`. **The tag is HELD**, and `v2.0.0` was not created. A tag names a published coordinate, and 2.0.0 is not on the registry. The owner act, in order:
   - `npm login`
   - `cd parse-that/typescript && npm run build && npm publish --access public`
   - `git tag v2.0.0 488523c && git push origin v2.0.0`
9. **RC-P ×2.** ⟨`node scripts/rc-p-evaluate.mjs --version 4.0.0 --out <scratch>`⟩ ×2, run from parse-that master `488523c`. The brief says `--version <new>`, but at the evaluator's bytes that is a category error. `const PACKAGE = "@mkbabb/value.js"` (L97), so `V` is a **value.js** coordinate, and `--version 2.0.0` would evaluate value.js 2.0.0 (an old, real release). **INTENT at the true bytes**: I evaluated at value.js's current registry `latest`, ⟨`npm view @mkbabb/value.js dist-tags`⟩ → `4.0.0`. Both runs print the identical table (only the timestamp line differs), EXIT 1 both:

   | # | conjunct | MEASURED | VALUE | reading |
   |---|---|---|---|---|
   | 1 | PUBLISHED(V) | yes | FALSE | `verify-packed-surface.mjs` exited 1 against V's registry tarball |
   | 2 | TOTALITY(V) | yes | TRUE | TRUE |
   | 3 | EQUIVALENCE(V) | yes | FALSE | arm V read 20962 mirror-defects over V's installed /css |
   | 4 | ADMITTED(V) | NO | FALSE | V's installed bytes contain zero `.wasm` artifacts |
   | 5 | BAR-DISCHARGED | yes | TRUE | TRUE |
   | 6 | ROUTED(V) | yes | TRUE | TRUE |

   `RC-P(4.0.0) = FALSE — 3 of 6 conjuncts are FALSE: 1 PUBLISHED(V) · 3 EQUIVALENCE(V) · 4 ADMITTED(V)`. This is the same reading as §Baseline G-W5-close. It is expected, because value.js is not on the seam until `.e`, and RC-P's subject is value.js, not parse-that.

**Gate readings (BEFORE → AFTER).**

| gate | BEFORE | AFTER | verdict |
|---|---|---|---|
| **G-W5-d1** | ⟨`npm view @mkbabb/parse-that version`⟩ → `1.0.0`, no CSS surface | release commit `488523c` (2.0.0) is pushed. The local tarball packs `./css` 52/52 (act 5, ×2). **`npm publish` → E404, and the token is invalid (E401)**. The registry still reads `latest 1.0.0` | **RED — OWNER ACT** (npm token; act 8 names the commands) |
| **G-W5-d2** | RC-P conjunct 4 → `NO FALSE — zero .wasm artifacts` | Decision: **SHIP** (act 4). The packed `ac1.wasm` admission is GREEN ×2 (0 imports, 0 function-kind imports, instantiation OK). RC-P(4.0.0) conjunct 4 is still `NO FALSE` ×2, because V = value.js 4.0.0 ships no Wasm | **RED at the gate's own command.** The `.d` limb (the decision plus a shipped, admitted artifact) is met at the local tarball. The registry leg waits on d1. Conjunct 4 turns only at `.e`, and F-W5d-1 applies there |
| **G-W5-d3** | `ROUTED(V) yes TRUE TRUE` (F-open-2, GREEN-BEFORE-CURE) | ×2 → `6 ROUTED(V) yes TRUE TRUE`. The legs are `RELEASE-PACKET.md` present · INBOX `RC-P` sent-rows O-41..O-43 · ⟨`grep -c parse-that fourier-analysis/{,web/}package.json`⟩ → `0 · 0`. The source is X.P.W4S, which wrote the packet; its record `execution/D/X-P-W4S.md:139` reads `6  ROUTED(V)  yes  TRUE  TRUE` | **GREEN (confirmed; W4S's cure)** |
| hold: `npm test` | 148/148 (`.c`) | 148/148 EXIT 0 | held |

**Findings.**
- **F-W5d-1 (for `.e` and the orchestrator): conjunct 4 cannot see a dependency's `.wasm`.** `rc-p-evaluate.mjs` L304–312 sets `installRoot = <consumer>/node_modules/@mkbabb/value.js` and enumerates `.wasm` only under that root (L469). Suppose value.js takes `@mkbabb/parse-that` as a normal dependency. npm hoists it to `<consumer>/node_modules/@mkbabb/parse-that`, outside `installRoot`, so ADMITTED(V) keeps reading "zero `.wasm` artifacts" even though V's installed closure carries `ac1.wasm`. Q-RC-2 says a Wasm-free V fails, and it does not say whether a dependency's Wasm is V's. **Ruling needed before `.e` closes**, with two options:
  - (a) V ships the artifact in its own package, bundled or copied at build, so `installRoot` sees it.
  - (b) conjunct 4's subject is V's installed dependency closure. That is an evaluator change by dated addendum to RELEASE-CONDITION §2.4.

  I have not chosen between them.
- **F-W5d-2 (instrument):** `packed-candidate-surface.mjs`'s default `--tsc` resolves to `<repo>/node_modules/typescript`, which does not exist on master. The master layout is `<repo>/typescript/node_modules`. Without `--tsc`, the gate false-REDs at 19/52. The one-line cure is `DEFAULT_PACKAGE`-relative. It belongs to whoever owns `typescript/scripts/**` and was not taken here.
- **Brief/anchor drift, recorded:** RC-P's `--version` is a value.js coordinate, not parse-that's (act 9).

**Residuals.** R-c-1 (css-recovery's 15 stale failures), R-c-2, R-c-3, R-b-2 and F-W5c-1 carry forward from `.c`, unmoved by this unit.

**Escalation.** **ESC-W5d-1 — OWNER ACT: the npm token is invalid (E401), so `@mkbabb/parse-that@2.0.0` cannot be published.** Everything short of the PUT is landed and pushed (`488523c`). `.e` depends on the *published* parse-that (W5.md `.e`), so `.e` is blocked on this act.

### X.P.W5.e

Seat `claude-opus-5-5`, 2026-09-23. Mode: fresh (no prior `.e` receipt). **Outcome: ESCALATED before any code edit. The specified cure depends on a registry coordinate that does not exist.**

**Crash-recovery scan.** ⟨`git status --porcelain -- package.json package-lock.json src test docs/tranches/X/execution/D/X-P-W5.md | wc -l`⟩ → `0`. Nothing inherited. The dirty `CARRY-LEDGER.md`, `scripts/dev/dev.sh` and untracked `docs/tranches/X/{audit,execution/chassis/ui-audit.js,keyframes/evidence/W13U/d2}` belong to other seats and were not touched.

**Acts in order.**
1. **Track A lock (F-open-3).** ⟨`git log --since='1 hour ago' --oneline -- src/css | wc -l`⟩ → `0`. ⟨`grep -n X-W12 LEDGER.md`⟩ → row 37 `planned`, so `.l` has not been dispatched. **Lock MET.**
2. **Precondition for the cure: is a published parse-that carrying the CSS surface on the registry?** W5.md `.e` requires "value.js depends on the **published** parse-that". Readings:
   - ⟨`npm view @mkbabb/parse-that dist-tags --json`⟩ → `{"latest": "1.0.0"}`. The version list ends `… 0.13.0, 1.0.0`, so 2.0.0 is absent.
   - 1.0.0 has no `./css` surface: `.d` act 2, and `proof:no-css-surface` held at that tree.
   - ⟨`npm whoami`⟩ → `E401 Unauthorized`. The token wall that `.d` recorded (ESC-W5d-1) is still up.
   - COHESION §0bl..§0bs, read to the file end (3068 lines), holds no ruling that lifts the wall or allows an unpublished coordinate.
3. **No substitute taken.** The alternatives were a `github:`, `file:` or `link:` dependency on parse-that master `488523c`, vendoring the `./css` build into value.js, or depending on 1.0.0 and keeping the hand grammar. Each one either departs from "the published parse-that" or leaves a dual path. Each is a workaround the standing law names a HIGH defect. So `src/css/grammar.ts` (544) and `syntax.ts` (101) are **not** deleted: deleting them without the seam dependency would break `npm test` and leave value.js without a parser.

**Gate readings (BEFORE → AFTER).**

| gate | BEFORE (§Baseline) | AFTER (this seat) | verdict |
|---|---|---|---|
| **G-W5-e1** | ⟨`grep -c parse-that package.json`⟩ → `0` | ⟨same⟩ → `0`. No dependency was added, because the registry carries no CSS-surfaced parse-that | **RED — blocked (ESC-W5d-1)** |
| **G-W5-e2** | ⟨`wc -l src/css/grammar.ts src/css/syntax.ts`⟩ → `544 · 101` | ⟨same⟩ → `544 · 101` | **RED — blocked (depends on e1)** |
| **G-W5-close** | RC-P(4.0.0) FALSE, 3 of 6 ×2 | Not re-run. value.js has not moved, so it would reproduce `.d` act 9 (`RC-P(4.0.0) = FALSE — 3 of 6: 1 PUBLISHED · 3 EQUIVALENCE · 4 ADMITTED`, ×2, parse-that `488523c`). That reading is cited as banked | **RED — blocked** |

**Escalation.** **ESC-W5e-1 — blocked on ESC-W5d-1 (OWNER ACT) plus one ruling.**
- (i) The owner must restore npm auth and publish parse-that 2.0.0. The commands, from `.d` act 8, are `npm login` · `cd parse-that/typescript && npm run build && npm publish --access public` · `git tag v2.0.0 488523c && git push origin v2.0.0`.
- (ii) The orchestrator must rule on **F-W5d-1**, which changes what `.e` has to do. It asks whether conjunct 4 (ADMITTED) counts the `.wasm` in a dependency. Option (a): value.js ships `ac1.wasm` inside its own package. Option (b): a dated RELEASE-CONDITION §2.4 addendum makes the installed dependency closure the subject.
- Re-dispatch `.e` once (i) lands and (ii) is ruled. Track A lock at re-dispatch: X-W12 `.l` writes `src/css/grammar.ts`. If `.l` lands first, `.e` still deletes that file, and the KFA-14 legacy comma forms must then hold through the seam, which `.c` has already covered as G-W5-c2.

**Commits.** This record only.

## Close

Seat CLOSE (verify-only), `claude-opus-5-5`, 2026-09-23 ~13:50–14:00 EDT. Mode: fresh close. Crash-recovery: my writable set (this record, `LEDGER.md`, `V/coordination/INBOX.md`) clean at open; parse-that dirt = the July `rust/**`/`.cargo`/`README.md` + 17 untracked (not W5's; untouched). Scratch logs: session scratchpad `w5close/` (key lines pasted). Load average during the reads: 32–69.

### Commit roster (act 1: exist + in bounds)

⟨`git show --stat` per commit⟩ — every commit exists; every touched path is inside its unit's §Unit-plan writable set. **landed-wrong: none.**

| unit | commit | paths (measured) | in bounds |
|---|---|---|---|
| `.a` | parse-that `4eac70c` (merge, parents `ef10d5b` + `3199913`) | first-parent diff 598 files; vs `3199913` only `A docs/css-surface-returns-2026-09-23.md` · `M typescript/package.json` · `D typescript/scripts/proof-no-css-surface.mjs` | yes |
| `.a` | value.js `27e3da21` | this record | yes |
| `.b` | parse-that `902172d` | `typescript/test/css-equivalence/{lib/differential.mjs,lib/ruled.mjs,run-full-surface.mjs}` | yes |
| `.b` | value.js `481c6e70` · `fa75ff97` | `DIVERGENCE-LEDGER.md` (+95, append) · this record | yes |
| `.c` | parse-that `ec18f4b` | 21 files, all `typescript/src/css/**` or `typescript/test/**` (css-color5 + WPT sources) | yes |
| `.c` | value.js `684a746b` · `aac22c24` | this record | yes |
| `.d` | parse-that `488523c` | `typescript/{CHANGELOG.md,package.json,package-lock.json}` | yes |
| `.d` | value.js `eaa47ecb` | this record | yes |
| `.e` | value.js `88359a9b` | this record (ESCALATED, no code) | yes |

⟨`git -C parse-that status -sb`⟩ → `## master...origin/master` (all four parse-that commits pushed).

### Gate table BEFORE → AFTER (act 2, re-run by this seat)

| gate | BEFORE (§Baseline) | AFTER (close seat, command → output) | verdict |
|---|---|---|---|
| G-W5-a1 | 169 commits not on master | ⟨`git fetch ../parse-that-css-totality-p2 w2/harness; git rev-list --count master..FETCH_HEAD`⟩ → `0`; ⟨`git merge-base --is-ancestor 31999135 master`⟩ → exit `0` | **GREEN** |
| G-W5-a2 | premise standing | ⟨`ls typescript/scripts/proof-no-css-surface.mjs`⟩ → `No such file`; ⟨`grep -c no-css-surface typescript/package.json`⟩ → `0` | **GREEN** |
| G-W5-a3 | 124/124 | ⟨`npm run build`⟩ → `BUILD_EXIT=0`; ⟨`npx vitest run`⟩ ×2 → `Test Files 15 passed (15) · Tests 148 passed (148)` EXIT 0 both; ⟨`npm run proof:all`⟩ → manifest / subpath / packrat-* PASS–GREEN (8), then `FAIL: proof:perf — (C) json-comprehensive regressed 276.3%` EXIT 1; re-read ⟨`npm run -s proof:perf`⟩ → `445.4%` EXIT 1 (load 58–69) | **RED (perf limb only)** — suite GREEN; perf reproduces `.a`'s environmental reading (pre-merge `ef10d5b` failed equally under load, `.a` receipt); low-load re-read still owed |
| G-W5-b1 | 152, EXIT 1 | ⟨`node test/css-equivalence/run-full-surface.mjs --pinned-value-commit 6aca8602…`⟩ ×2 (parse-that master `488523c`) → `MIRROR-DEFECTS 0 (of which spec-undecided 0)` · `GREEN — zero mirror-defects across the full surface` EXIT 0 both; outputs identical after line 1 | **GREEN** |
| G-W5-c1 | absent | ⟨vitest⟩ → `✓ test/css-color5.test.ts (14 tests)` (both runs) | **GREEN** |
| G-W5-c2 | `rgba(255, 0, 0, 0.5)` rejected | same file (KFA-14 WPT legacy-comma cases) 14/14 | **GREEN** (in the seam; F-W5c-1 ruling owed on the 2 PB-01/02 accepts) |
| G-W5-d1 | registry `1.0.0` | ⟨`npm view @mkbabb/parse-that dist-tags --json`⟩ → `{"latest": "1.0.0"}`; ⟨`npm whoami`⟩ → `E401 Unauthorized` | **RED — OWNER ACT (ESC-W5d-1)** |
| G-W5-d2 | conjunct 4 `NO FALSE` | RC-P ×2 → `4 ADMITTED(V) NO FALSE — zero .wasm artifacts` (decision SHIP landed at `488523c`; F-W5d-1 ruling owed) | **RED** |
| G-W5-d3 | TRUE (GREEN-BEFORE-CURE) | RC-P ×2 → `6 ROUTED(V) yes TRUE TRUE` | **GREEN** (W4S's cure) |
| G-W5-e1 | `0` | ⟨`grep -c parse-that package.json`⟩ → `0` | **RED — blocked (ESC-W5e-1)** |
| G-W5-e2 | `544 · 101` | ⟨`wc -l src/css/grammar.ts src/css/syntax.ts`⟩ → `544 · 101` | **RED — blocked** |
| G-W5-close | FALSE 3 of 6 ×2 | ⟨`node scripts/rc-p-evaluate.mjs --version 4.0.0 --out <scratch>`⟩ ×2 → `RC-P(4.0.0) = FALSE — 3 of 6 conjuncts are FALSE: 1 PUBLISHED(V) · 3 EQUIVALENCE(V) · 4 ADMITTED(V)` EXIT 1 both; 2/5/6 TRUE; arm V `20962` | **RED — blocked** |

Tally (12 gates, counted from the table above): GREEN 6 (a1 · a2 · b1 · c1 · c2 · d3) · RED 6 (a3 on its perf limb only · d1 · d2 · e1 · e2 · close). §Verification Artefacts (act 3): W5.md has none beyond the Close line ("RC-P re-evaluated, all six conjuncts, double-run; every unit's gates") — both run above.

### Residuals (named owners)
- **R-close-1 — proof:perf low-load re-read** (`cd parse-that/typescript && npm run build && npm run proof:perf` at load < ~4). Owner: the `.d` re-dispatch seat, before the 2.0.0 PUT. No threshold/baseline touched.
- **R-close-2 — stale comment** `parse-that/typescript/test/dist-surface.test.ts:82` still names `proof:no-css-surface` (⟨`grep -n no-css-surface test/dist-surface.test.ts`⟩ → `82`). Assertion passes. Owner: next Track D seat with `typescript/test/**` in bounds.
- **R-b-1** css-equivalence corpus-count tests (2 failures, 26604/172 pins vs 27021/0) — owner: Track D X·P next wave. **R-b-2 / F-W5b-1** `var()` in animation shorthand — owner: `.e` re-dispatch (cure + divergence row together). **R-b-3** RC-P arm V baseline cites `902172d`+ — owner: `.e`/close re-run.
- **R-c-1..R-c-3** (css-recovery stale failures, etc., `.c` receipt) — owner: Track D X·P next wave.
- **F-W5d-2** `packed-candidate-surface.mjs` default `--tsc` path — owner: whoever holds `typescript/scripts/**` next.
- `<p2>` (`parse-that-css-totality-p2`) is read-only evidence; its history is on master.

### Escalations (open, unruled)
- **ESC-W5d-1 — OWNER ACT**: npm token invalid (⟨`npm whoami`⟩ → `E401`, re-read this seat); `@mkbabb/parse-that@2.0.0` unpublished (`latest 1.0.0`). Commands: `npm login` · `cd parse-that/typescript && npm run build && npm publish --access public` · `git tag v2.0.0 488523c && git push origin v2.0.0`.
- **ESC-W5e-1**: `.e` blocked on ESC-W5d-1 plus the **F-W5d-1** ruling (ADMITTED over a dependency's `.wasm`: (a) V ships `ac1.wasm` itself, or (b) dated RELEASE-CONDITION §2.4 addendum making the installed closure the subject). Orchestrator.
- **F-W5c-1**: legacy none-alpha (PB-01/02) ruling request — orchestrator.

### E13 (act 4)
Four paths re-swept ~13:55 EDT: value.js `V/coordination/` (newest = 2026-09-18 set, rowed; INBOX last rows O-61 / I-42) · glass-ui BL (newest; commits since `fe5df357`=I-42 are `b7099ea6`, `6433284a`, formation-internal D1 research, no value.js letter) / BK (newest = our O-61 mirror) · keyframes.js `V/coordination/` (newest file 2026-09-19, no commit in 3 h) · atlas (no commit in 3 h). **0 unrowed, 0 UNREAD in scope.** Sweep line appended to INBOX.md.

### State
W5.md §State designates no four-verb move; none is made. **Wave status: PARTIAL** — `.a`–`.c` landed and gated GREEN (a3 perf limb excepted, environmental); `.d` landed short of the registry PUT; `.e` and the Close RC-P are **BLOCKED-ON ESC-W5d-1 (owner npm auth + publish) + the F-W5d-1 ruling**. Re-dispatch `.d` (PUT + tag + perf re-read) → `.e` → this Close's RC-P ×2 once both clear.

## Check 1

Fresh adversarial check (L-20 pass 1), `claude-opus-5-5`, 2026-09-23 ~14:00 EDT. Read: W5.md whole (22 lines), this record's header through §Unit plan, the `.b`/`.c`/`.d` receipt ranges by grep, and §Close. Crash-recovery: my writable set (this record, `LEDGER.md`) was clean. parse-that dirt = July (`stat` → `2026-07-20` on every `rust/**`/`.cargo`/`README.md` path). Not W5's, and I did not touch it. Load 70–86 during the reads. Scratch: session scratchpad `chk1/`.

**Verdict: NOT-CONFORMANT.** Everything that landed conforms: bounds, E-3, mail and every claimed GREEN reproduce. But six gates are RED, and W5.md grants none of them relief. The goal criterion is not met at the bytes.

### Axes
1. **Claimed GREENs reproduce: 6 of 6.**
   - a1: ⟨`git fetch ../parse-that-css-totality-p2 w2/harness; git rev-list --count master..FETCH_HEAD`⟩ → `0`, and ⟨`merge-base --is-ancestor 31999135 master`⟩ → exit 0.
   - a2: ⟨`ls typescript/scripts/proof-no-css-surface.mjs`⟩ → `No such file`, and ⟨`grep -c no-css-surface typescript/package.json`⟩ → `0`.
   - b1: ⟨`node test/css-equivalence/run-full-surface.mjs --pinned-value-commit 6aca8602…`⟩ ×2 → `MIRROR-DEFECTS 0` `EXIT=0` both times. The outputs are identical after line 1.
   - c1/c2: ⟨`npx vitest run`⟩ → `✓ test/css-color5.test.ts (14 tests)` · `Test Files 15 passed (15) · Tests 148 passed (148)` EXIT 0.
   - d3: ⟨`node scripts/rc-p-evaluate.mjs --version 4.0.0`⟩ → `6 ROUTED(V) yes TRUE TRUE`.
2. **Bounds: clean.** ⟨`git show --stat`/`--name-status`⟩ on parse-that `4eac70c` (vs `3199913`: 3 paths), `902172d` (3 paths, `test/css-equivalence/**`), `ec18f4b` (21 paths, all `typescript/src/css/**` or `typescript/test/**`) and `488523c` (3 paths). The eight value.js commits touch only this record, `DIVERGENCE-LEDGER.md` (append only, 0 removed lines) and `INBOX.md`. ⟨`git log 42a82e3e..HEAD -- scripts/dev/dev.sh`⟩ → 0 commits.
3. **Masking: none found.** css-color5 has no `skip`/`todo`/`only` (grep → 0). `ruled.mjs` is not an allowlist. It is keyed to ADJUDICATION-W4 §2's per-cell rulings and to COHESION §0ab's F-w4f-1 class. It is consulted only for a cell that already reads RED, and it fails closed: an unhonoured ruling stays RED. `.b` ran negative controls (9 negatives, 2 positives), and DIVERGENCE-LEDGER §12 rows every cell. The out-of-scope WPT classes are named and tallied in the test (the tally is exact), so no assertion was narrowed silently. See D-3 for the goal-level consequence.
4. **Commit families:** one commit per meaning. The `.a` premise retirement sits inside the merge commit, as W5.md requires.
5. **E-3:** ⟨`git diff --stat 42a82e3e..HEAD -- parse-that/waves/ V/megatranche/registry/adjudicated/ parse-that/RELEASE-CONDITION.md parse-that/ADJUDICATION-W4.md`⟩ → empty.
6. **Mail:** INBOX has no UNREAD row in scope. The last rows are O-61 / I-42, and the close seat's sweep line is present. Glass BL is newest, and its commits since I-42 are formation-internal.
7. **Four-verb:** W5.md designates no move, and none was made. Lawful.
8. **Goal criterion: NOT MET.** parse-that 2.0.0 is not published (⟨`npm view @mkbabb/parse-that dist-tags --json`⟩ → `{"latest": "1.0.0"}`, and ⟨`npm whoami`⟩ → `E401`). value.js is not on the seam, the hand grammar still stands, and RC-P is FALSE.
9. **Published figures reproduce.** `MIRROR-DEFECTS 0`, `148/148`, and RC-P `3 of 6 FALSE: 1 · 3 · 4` with arm V `20962`. The css-equivalence suite reads `2 failed` (`expected 27021 to be 26604`, `expected +0 to be 172`), which matches R-b-1.
10. **Honest-RED adjudication:** see the register below. W5.md has no honest-RED id, no producer-owned row and no successor routing for any unit gate. Its State says only that `.d`/`.e` are "owner-authorized".

The RC-P ×2 readings are identical: `6 ROUTED(V) yes TRUE TRUE` and `RC-P(4.0.0) = FALSE — 3 of 6 conjuncts are FALSE: 1 PUBLISHED(V) · 3 EQUIVALENCE(V) · 4 ADMITTED(V)`. My `--out` pointed at a directory, so both runs exited 1 on the report write (`EISDIR`), after they had printed their verdicts. This is my own invocation error and does not bear on the verdicts.

### Register

| # | severity | claim | receipt | cure |
|---|---|---|---|---|
| D-1 | **HIGH** | RED with no relief in W5.md: **G-W5-d1 · d2 · e1 · e2 · close**. The spec's core limbs are unmet: publish, value.js on the seam, the hand grammar deleted, and RC-P TRUE. W5.md has no honest-RED id, no producer-owned row and no successor routing for any of them. The escalations are named (ESC-W5d-1 as an OWNER ACT, ESC-W5e-1, and the F-W5d-1 ruling), but naming a blocker does not relieve it. No seat misconduct: the blocker is the owner's npm token. | ⟨`npm view … dist-tags`⟩ → `latest 1.0.0` · ⟨`npm whoami`⟩ → `E401` · RC-P ×2 FALSE 3/6 · the Close gate table rows d1/d2/e1/e2/close | Owner `npm login` → PUT 2.0.0 + tag `v2.0.0` at `488523c` · orchestrator rules F-W5d-1 · re-dispatch `.e` → RC-P ×2 → Check 2 |
| D-2 | MEDIUM | **G-W5-a3 is RED.** `proof:perf` fails (276 %/445 % regression), and "environmental" is asserted but not yet shown by a low-load read. The merge also brought two suites onto master that are not green: css-equivalence (2 stale pins) and css-recovery (15 stale). The `.a` limb ("parse-that's own test suite + proofs GREEN") is therefore not met in full. The Close's "suite GREEN" covers `npm test` (`test/*.test.ts`) only. | ⟨`npx vitest run -c test/css-equivalence/vitest.config.ts`⟩ → `Test Files 1 failed` (`27021≠26604`, `+0≠172`) · the Close a3 row · the `.c` receipt R-c-1 | R-close-1: a perf re-read at load < ~4 before the PUT, where a real regression goes to root cause. Re-pin R-b-1/R-c-1 with a measured justification. The owners are named ("Track D X·P next wave"), so this is non-blocking once D-1 clears |
| D-3 | MEDIUM | The goal criterion's "CSS Color 4/5 value syntax is covered" is only partly met. `calc()` in colour channels (css-color-4 admits it) and `color(display-p3-linear …)` are out of scope (R-c-3: 71 computed WPT cases excluded, plus the valid/legacy cases). `light-dark()` evaluates only to `color_context_required` (R-c-2). R-c-3 has **no named owner**. | `test/css-color5.test.ts:34-40,76` (tally `in 887 · p3-linear 45 · xyz-d50-none 16 · calc 10`) · the `.c` receipt R-c-2/R-c-3 | Name an owner for R-c-3, and either cure (css-values-4 §10 in the colour grammar, and the p3-linear space) or row it as a dated divergence. The orchestrator rules R-c-2's API widening |
| D-4 | MINOR | The seam accepts `rgb(255, 255, 255, none)` and `hsla(120, 100%, 50%, none)`, which WPT and the css-color-4 ED refuse. They are asserted "as ruled" under PB-01/02, and the ruling request F-W5c-1 is open. | `test/css-color5.test.ts:210-222` | Orchestrator ruling F-W5c-1 |
| D-5 | INFO | The 111 F-w4f-1 cells are dispositioned by the §0ab class ruling plus a repair test, not one ledger row per cell. That is lawful under §0ab and DIVERGENCE-LEDGER §11.2/§12, and fail-closed. | `lib/ruled.mjs` · `differential.mjs` `applyRuling` | none |
| D-6 | INFO | R-close-2: a stale `proof:no-css-surface` comment at `test/dist-surface.test.ts:82`. The record path is spelled `X-P-W5.md` where the spec's §State names `X.P.W5.md` (noted at the Open). | the Close R-close-2 | next Track D seat with `test/**` |

### Honest-RED set
**Empty.** No RED gate is relieved by W5.md's own bytes.
- d1, d2, e1, e2 and close are blocked by an owner act and a ruling. Neither is a producer row or successor routing that the spec names.
- a3 is an unproven environmental claim.

### Successor "Opens after"
⟨`grep -rn 'X\.P\.W5' docs/tranches/X`, excluding `execution/`⟩ finds only COHESION §0bl, §0bn, §0bp, DIVERGENCE-LEDGER and W5.md itself, and no wave declares `X.P.W5 CLOSED` as an "Opens after" conjunct. KF.W3 stays gate-keyed on RC-P(V) (COHESION :2764), which reads FALSE ×2, so KF.W3 is **lawfully blocked**. The X-W11 coordinate requires W5's RC-P TRUE, which is not yet met. No successor is blocked unlawfully.

### Tally (counted from the register)
0 BLOCKER · 0 CRITICAL · 1 HIGH · 2 MEDIUM · 1 MINOR · 2 INFO. Gates reproduced GREEN 6 (a1 a2 b1 c1 c2 d3). RED 6 (a3 d1 d2 e1 e2 close). **The LEDGER status is not moved** (PARTIAL stands). Next: owner act ESC-W5d-1 + F-W5d-1 → `.e` → Check 2.

## Repair 1

Repair seat, round 1, `claude-opus-5-5`, 2026-09-23 ~14:00–14:25 EDT. Input: the register in §Check 1. Crash-recovery: in parse-that `typescript/**`, my writable set, `git status --porcelain` was clean at open. The parse-that dirt is the July `rust/**`/`.cargo`/`README.md` set plus 17 untracked paths, none of which are W5's, and I did not touch them. The value.js paths I write (this record, `DIVERGENCE-LEDGER.md`) were clean. Load average during the work was 48–77. Scratch: session scratchpad `rep1/`. Bounds: `.b`'s and `.c`'s writable sets (§Unit plan), which cover parse-that `typescript/src/css/**`, `typescript/test/**` and `grammar/**`, plus the DIVERGENCE-LEDGER append. The CHANGELOG line sits in `.d`'s set and describes the unpublished 2.0.0.

### Commits
| repo | commit | meaning | paths |
|---|---|---|---|
| parse-that | `6fcc207` | cure: a non-ASCII declaration name is one `<ident-token>` (css-syntax-3 §4.2) | `src/css/algebra/tables.mjs` · `src/css/build/ac1.wasm` (rebuilt by `node src/css/build.mjs`, reproducible, sha256 `acf8ff7e…` ×2) · `test/css-recovery/stylesheet-grammar.test.ts` · `CHANGELOG.md` |
| parse-that | `661b47c` | the stale-test re-pins, each with its measured cause, plus the stale-comment retirement | 10 files under `typescript/test/**` |
| value.js | `052de4d6` | DIVERGENCE-LEDGER §13, appended; 0 lines removed | `docs/tranches/X/parse-that/DIVERGENCE-LEDGER.md` |
| value.js | (this section) | record | this file |

⟨`git push origin master`⟩ → `488523c..661b47c  master -> master` (no force).

### Defect → cure
| # | sev | cure | status |
|---|---|---|---|
| D-1 | HIGH | Not curable from a seat. ⟨`npm whoami`⟩ → `E401 Unauthorized` (re-read 14:01) · ⟨`npm view @mkbabb/parse-that dist-tags --json`⟩ → `{"latest": "1.0.0"}`. The PUT is an owner act and F-W5d-1 is the orchestrator's to rule. **The release commit has moved**: 2.0.0 is still unpublished, and parse-that master is now `661b47c`, which carries this repair's grammar cure. The owner's commands (ESC-W5d-1) therefore read `git tag v2.0.0 661b47c`, not `488523c` | **ESCALATED** (ESC-W5d-1 + F-W5d-1, unmoved) |
| D-2a | MEDIUM | **R-b-1**, the two css-equivalence corpus literals, re-pinned from the bytes. `26604 → 27021` and `unwrapped 172 → 0`. Cause, measured at the commits: `92ed4cc^` holds 26,604 rows with 172 wrapped; `92ed4cc` (W3.l) adds the 470-row stylesheet band, giving 27,074; `fb45434` (W3.n, BND-1) hands r1 its string, so 53 r1 sources dedupe, giving 27,021 with 0 wrapped (⟨`git show <c>:…/corpus.json \| node …`⟩ → `27074 172` · `27021 0`). The replay digest test is unmoved and passes | **CURED** `661b47c` |
| D-2b | MEDIUM | **R-c-1**: css-recovery's 15 failing tests, plus 2 suites that did not load and hid 6 more failures (`labels.test.ts`: `tsx/esm/api` is not a dependency; `capacity.test.ts`: a module-level throw). See the table below. 19 readings were re-pinned or cured and 2 real defects surfaced. One of them is cured (`decl-name` non-ASCII, `6fcc207`). The other is ESC-c1, the `PACKRAT_ARMED` one-way latch in `src/parse/packrat.ts`, outside W5's bounds: its 2 legs stay RED **honestly** | **CURED** except the 2 ESC-c1 legs (**ESCALATED**) |
| D-2c | MEDIUM | **`proof:perf`** (R-close-1). No low-load read was possible: the load held at 48–77 all session. In its place, an **interleaved A/B** under the same load, pre-merge `ef10d5b` against master (both `npm run build`), ⟨`npm run -s proof:perf`⟩, clause (C) ns/parse over 4 pairs: pre-merge `2630 · 3138 · 2878 · 2757` (median 2818) and master `3374 · 2839 · 4702 · 3075` (median 3225). Both trees **FAIL** against the 1,742 ns baseline, so the absolute gate cannot be passed at this load by either tree. The medians differ by ~14 %, inside the run-to-run spread (2630→3138 on the SAME tree). The merge does touch `src/parse/**` (`parser.ts` +/-279 lines), so a real regression of that size is not excluded | **ESCALATED**: the low-load read stays owed before the PUT (R-close-1, unchanged) |
| D-3 | MEDIUM | R-c-3 now has named owners. The coverage gaps are rowed, dated and appended in **DIVERGENCE-LEDGER §13** as shared departures, since both engines refuse them (measured with the pinned 4.0.0 oracle against js/wasm): **SC-1** `calc()` in colour channels, owned by Track D's next X·P grammar wave (no frozen type moves); **SC-2** `color(display-p3-linear …)`, owned by the orchestrator (a contract ruling widening the frozen `CssColorSpace`), then the same wave. They sit as non-row `####` sections: as `###` rows they turned `seam-contract-check.mjs` RED (`[I] … SC-1 is not named in its disposition` ×4), and SEAM-CONTRACT.md lies outside my bounds. Now ⟨`node scripts/seam-contract-check.mjs`⟩ → `VERDICT: GREEN`, ledger rows 48, unmoved. **R-c-2** (`light-dark()` evaluates to `color_context_required`) is an API widening for the orchestrator | **CURED** (owners named + rowed); R-c-2 **ESCALATED** (ruling) |
| D-4 | MINOR | F-W5c-1 is a ruling request. No one-command cure is lawful (E-3: 17 corpus cells ride PB-01/02) | **ESCALATED** (orchestrator) |
| D-5 | INFO | none | — |
| D-6 | INFO | R-close-2: the `test/dist-surface.test.ts:82` comment now names the retired proof as retired | **CURED** `661b47c` |

### R-c-1, reading by reading (each re-pin cites the bytes that moved it)
| file · test | was | measured cause | now |
|---|---|---|---|
| `labels.test.ts` (suite did not load) | `Cannot find package 'tsx/esm/api'` | `tsx` is in no `package.json` of this package; Vitest transforms TS itself | direct `await import("../../src/parse/utils.ts")` → 11/11 |
| `boundary/capacity.test.ts` (suite did not load) | module-level `the 'recoveries' witness family never names its region up to 8192` | Θ.input is DERIVED and moved 65,458 → 14,107 at W3.h (CAP-1). `a{c}×n` fits only to n = 3,526, where `<mark-journal>` fires first. That is CAP-3/CAP-4's own "NO COORDINATE … the WINDOW cuts first" (the `ledger.mjs` `measureCapacityRow` case b) | a `windowLimited` reading: the largest fitting witness names `[<mark-journal>]` and never recoveries/D; one past it is the input-window rejection |
| ↳ hidden behind the load failure: marks census pin | `marks.n = 16382` | `a{}` records more marks per rule since W3.l; CAP-2 binary-searches **1,724** | `1724` |
| ↳ "nine labels sit AFTER `<string>`" | `L.slice(at+1)` = the nine; `L.length = 60` | LATER_UNITS append blocks after the nine (`collectLabels`); `L.length` = 134 | the nine = `L.slice(51, 60)` |
| ↳ NEGATIVE CONTROL vstack | `K: 2` expected to overflow | `2 × 14,107 + 1,270 < 65,536` at the derived window | `K` derived: `⌊(VSTACK_CAP − S)/Θ.input⌋ + 1` |
| ↳ census "one-cell-per-code-unit" | `;×n` peak ≥ 14,107 · refused | W3.l `wsSemi()` reads a top-level `;` as trivia, so `;×14107` is **ok:true**, peak 3. The densest family is now `a{c:1 ×n}` (7,073), and `a{c;×n}` names `[marks, recoveries, D]` | `;×n` accepted with a static peak; densest ≤ K·Θ.input + S; `a{c;×n}` answered by the journals |
| ↳ band-shape (`recoveries AT/PAST`) | names by pair | the recovery pair is window-limited | `recoveries WINDOW` / `PAST-WINDOW` |
| `boundary/depth.test.ts` ×4 (PT-04 7,761/7,762, js+wasm) | `<nesting-depth>` | the witness is 15,525 / 15,527 code units, over Θ.input, and the window is checked before the run | still `not.toThrow` + `css_syntax`; `expected[0]` = `<input-window>` |
| `boundary/no-throw.test.ts` | `27074 · 172` | as R-b-1 (`fb45434`) | `27021 · 0` |
| `boundary/boundary.test.ts` unrealized | six named | `entry.mjs` `UNREALIZED_ENTRIES = []` since W3.i | list `[]`; the six asserted PRESENT as functions on both surfaces |
| `closure.test.ts` BORN RED ⊇ | `frozen \ emitted = [syntax_descriptor_invalid, syntax_mismatch]` | both are `coerceToSyntax`'s codes, a surface composition with no production (COHESION §0s E-h3; `entry.mjs` §THE TWO COMPOSITIONS) | six codes by production over the corpus, plus the two by `coerceToSyntax` on both surfaces; `missing = []` |
| `value-grammar.test.ts` label tail | `L`'s whole tail = 16, `L.length = 76` | later units append | the W3.h block = `L[60..75]` |
| `at-rule-grammar.test.ts` F-k3 | name `/* c */ color` | F-w4f-1 (§11): the comment is trivia before one `<ident-token>` | `color` |
| `at-rule-grammar.test.ts` F-k2 ×2 | mixed-type / `none`-channel legacy forms ACCEPTED | W3.n re-landed the §8.1 cure with ID-5 (COHESION §0w; the `grammar.mjs` F-k2 note) | those forms REFUSED; the well-formed alpha tail and the GROUND-C cell `rgb(.843, -0, +54, 5e498)` unmoved |
| `stylesheet-grammar.test.ts` J-2 six shapes | carried as names | F-w4f-1 (§11): NARROWS | each REFUSED whole, js ≡ wasm |
| `stylesheet-grammar.test.ts` **J-6** | `x≡y` accepted | **NOT stale, a real defect**: W4.h's `decl-name` used ASCII `isIdent`. css-syntax-3 §4.2 includes non-ASCII, and `a { Xé: red }` was refused | **CURED** at the class (`6fcc207`); the test is unedited and passes |
| `boundary/latch.test.ts` ×2 (L-3, record) | BORN-RED | **NOT stale**: ESC-c1 (O-15 PT-03). `resetPackrat()` never disarms `PACKRAT_ARMED` (`src/parse/packrat.ts:273/297`), outside W5's bounds (library seam; COHESION :1913 "ESC-c1 … → W4", carried) | **RED, unedited**: ESCALATED |

### Gate re-readings after the cures (parse-that master `661b47c`, double-run)
| gate / suite | command | run 1 | run 2 | vs Close |
|---|---|---|---|---|
| G-W5-a3 suite | ⟨`npm test`⟩ | `Tests 148 passed (148)` | `148 passed (148)` | unmoved GREEN |
| css-equivalence | ⟨`npx vitest run -c test/css-equivalence/vitest.config.ts`⟩ | `28 passed (28)` | `28 passed (28)` | **26/28 → 28/28** |
| css-recovery | ⟨`npx vitest run -c test/css-recovery/vitest.config.ts`⟩ | `Test Files 1 failed \| 11 passed (12)` · `Tests 2 failed \| 473 passed (475)` | identical | **15 failed + 2 files unloadable (414 run) → 2 failed (ESC-c1) of 475** |
| css-totality | ⟨`npx vitest run -c test/css-totality/vitest.config.ts`⟩ | `80 passed (80)` | `80 passed (80)` | not read before; GREEN |
| G-W5-b1 | ⟨`node test/css-equivalence/run-full-surface.mjs --pinned-value-commit 6aca8602…`⟩ | `MIRROR-DEFECTS 0` · `GREEN` EXIT 0 | same, identical after line 1 | unmoved GREEN |
| G-W5-c1/c2 | inside `npm test`: `test/css-color5.test.ts` | 14/14 | 14/14 | unmoved GREEN |
| wasm admission | ⟨`node scripts/wasm-admission.mjs src/css/build/ac1.wasm`⟩ | `"verdict": "GREEN"` EXIT 0 | — (sha256 identical across two rebuilds) | unmoved GREEN |
| seam-contract-check (value.js) | ⟨`node docs/tranches/X/parse-that/scripts/seam-contract-check.mjs`⟩ | `VERDICT: GREEN`, ledger rows 48 | GREEN | unmoved |
| G-W5-a3 perf | ⟨`npm run -s proof:perf`⟩ ×4 interleaved A/B | FAIL (both trees) | — | **RED, ESCALATED** (load) |
| G-W5-d1/d2/e1/e2/close | ⟨`node scripts/rc-p-evaluate.mjs --version 4.0.0 --out <scratch>/rcp{1,2}.json`⟩ | `RC-P(4.0.0) = FALSE — 3 of 6 conjuncts are FALSE: 1 PUBLISHED(V) · 3 EQUIVALENCE(V) · 4 ADMITTED(V)`; 2/5/6 TRUE; arm V `20962` | identical | unmoved RED (ESC-W5d-1 / F-W5d-1) |

`tsc --noEmit` over `typescript/` is not a W5 gate. ⟨`npx tsc --noEmit -p . | grep -c "error TS"`⟩ reads `92` at a `488523c` worktree and `94` ×2 after this repair. The +2 are two TS7016 lines (implicit-`any` `.mjs` module) at new import sites in `depth.test.ts` (`diagnostics.mjs`) and `closure.test.ts` (`entry.mjs`). That is the class every existing `.mjs` import in those files already carries. My edits add no new error class: two `${region}` template errors I introduced were cured in place, and `capacity.test.ts` holds at 18 → 18.

### Escalations (open)
- **ESC-W5d-1 (OWNER ACT), amended**: the tag target is now **`661b47c`**. The commands are `npm login` · `cd parse-that/typescript && npm run build && npm publish --access public` · `git tag v2.0.0 661b47c && git push origin v2.0.0`.
- **F-W5d-1** (ADMITTED over a dependency's `.wasm`): orchestrator ruling; unmoved.
- **ESC-R1-1, perf**: a low-load (< ~4) `proof:perf` read before the PUT. The A/B above does not exclude a real ~14 % regression from the merge's `src/parse/**` changes. Owner: the `.d` re-dispatch seat (R-close-1).
- **ESC-R1-2, SC-2**: `display-p3-linear` as a `color()` input needs the frozen `CssColorSpace` widened. Orchestrator ruling; also **R-c-2** (`light-dark()` scheme-resolving surface).
- **ESC-c1** (carried, library seam): the `PACKRAT_ARMED` one-way latch. 2 css-recovery legs stay RED. `src/parse/packrat.ts` lies outside every W5 unit's bounds.
- **F-W5c-1**: legacy `none` alpha (PB-01/02). Orchestrator ruling.

### Tally (self-counted from the tables above)
Register defects: 6. D-2 is worked in three limbs (a · b · c), so there are 8 lines: **Cured in full: 3** (D-2a, D-3 with R-c-2 routed as a ruling, D-6). **Cured in part: 1** (D-2b: 19 readings and 2 suite loads cured or re-pinned; its 2 ESC-c1 legs escalated). **Escalated: 3** (D-1, D-2c perf, D-4). **No action: 1** (D-5, INFO). Gate verdicts moved to GREEN: none among d1/d2/e1/e2/close/a3-perf. The suites the Check counted against `.a`'s limb went from 17 failing tests plus 2 unloadable files to 2 failing (ESC-c1 only). LEDGER status unmoved (PARTIAL). Next: owner act → `.d` re-dispatch (PUT at `661b47c`, perf low-load read) → `.e` → Check 2.

## Check 2

Fresh adversarial check (L-20 pass 2), `claude-opus-5-5`, 2026-09-23 ~14:25–14:35 EDT. Read: W5.md whole (22 lines), this record's header through §Unit plan, §Close, §Check 1 and §Repair 1. Crash-recovery: my writable set (this record, `LEDGER.md`) was clean at open. parse-that dirt is the July `rust/**`/`.cargo`/`README.md` set; I did not touch it. Load was 30–54. Scratch: session scratchpad `chk2/`.

**Verdict: NOT-CONFORMANT (unchanged from Check 1).** Repair 1's landed work conforms, and every claimed GREEN reproduces. But nothing has moved on D-1 since Check 1: parse-that 2.0.0 is still unpublished, value.js is still off the seam, and RC-P is still FALSE. W5.md relieves none of these five REDs.

### Axes
1. **Claimed GREENs reproduce: 6 of 6** (the same gates at parse-that master `661b47c`).
   - a1: ⟨`git fetch ../parse-that-css-totality-p2 w2/harness; git rev-list --count master..FETCH_HEAD`⟩ → `0`, and ⟨`merge-base --is-ancestor 31999135 master`⟩ → `anc=0`.
   - a2: ⟨`ls typescript/scripts/proof-no-css-surface.mjs`⟩ → `No such file`, and ⟨`grep -c no-css-surface typescript/package.json`⟩ → `0`.
   - b1: ⟨`node test/css-equivalence/run-full-surface.mjs --pinned-value-commit 6aca8602…`⟩ ×2 → `MIRROR-DEFECTS 0 (of which spec-undecided 0)` · `GREEN` `EXIT=0` both times. `diff` after line 1 → 0 lines.
   - c1/c2: ⟨`npx vitest run`⟩ → `✓ test/css-color5.test.ts (14 tests)` · `Test Files 15 passed (15) · Tests 148 passed (148)` `EXIT=0`.
   - d3: ⟨`node scripts/rc-p-evaluate.mjs --version 4.0.0 --out chk2/rcp{1,2}.json`⟩ ×2 → `6 ROUTED(V) yes TRUE TRUE`.
2. **Bounds: clean.** ⟨`git show --stat`⟩:
   - `6fcc207` touches `src/css/algebra/tables.mjs`, `src/css/build/ac1.wasm`, `test/css-recovery/stylesheet-grammar.test.ts` and `CHANGELOG.md`.
   - `661b47c` touches 10 files, all under `typescript/test/**`.
   - value.js `052de4d6` touches only `DIVERGENCE-LEDGER.md` (+55, 0 lines removed), and `3f90c851` only this record and the LEDGER (+1).
   - ⟨`git log 42a82e3e..HEAD -- scripts/dev/dev.sh`⟩ → 0 commits.
3. **Masking: none found.** I sampled the Repair's re-pins at the diff. `depth.test.ts` now asserts `witnessAtDepth(depth).length > INPUT_BOUND` before it names `<input-window>`, so the new pin is a measured precondition, not a narrowed assertion, and the depth rejection keeps its own block. The latch legs (ESC-c1) stay RED and unedited, with no `skip` and no allowlist.
4. **Commit families:** one per meaning. The cure (`6fcc207`) and the re-pins (`661b47c`) are split by meaning, which is lawful.
5. **E-3:** ⟨`git diff --stat 42a82e3e..HEAD -- parse-that/waves/ V/megatranche/registry/adjudicated/ parse-that/RELEASE-CONDITION.md parse-that/ADJUDICATION-W4.md`⟩ → empty. DIVERGENCE-LEDGER is append-only (removed lines → `0`).
6. **Mail:** ⟨`grep -cE '\| *UNREAD *\|' INBOX.md`⟩ → `0`. The latest sweep line (14:4x, Track A) reads `0 unrowed, 0 new UNREAD`.
7. **Four-verb:** W5.md designates no move, and none was made. Lawful.
8. **Goal criterion: NOT MET.** ⟨`npm view @mkbabb/parse-that dist-tags --json`⟩ → `{"latest": "1.0.0"}` · ⟨`npm whoami`⟩ → `E401 Unauthorized` · ⟨`git tag -l 'v2*'`⟩ → none · value.js ⟨`grep -c parse-that package.json`⟩ → `0` · ⟨`wc -l src/css/grammar.ts src/css/syntax.ts`⟩ → `544 · 101` · RC-P ×2 → `FALSE — 3 of 6: 1 PUBLISHED(V) · 3 EQUIVALENCE(V) · 4 ADMITTED(V)` with arm V `20962`, EXIT 1 both times.
9. **Repair 1's figures reproduce.**
   - css-equivalence: ⟨`npx vitest run -c test/css-equivalence/vitest.config.ts`⟩ → `28 passed (28)`.
   - css-recovery: ⟨`… -c test/css-recovery/vitest.config.ts`⟩ → `Test Files 1 failed | 11 passed (12)` · `Tests 2 failed | 473 passed (475)`. Both failures are in `boundary/latch.test.ts` (L-3 RESETTABLE and "the whole reading"), i.e. ESC-c1 exactly.
10. **Honest-RED adjudication:** see the register. W5.md still has no honest-RED id, no producer-owned row and no successor routing for d1, d2, e1, e2, close or a3. ⟨`grep -n 'W5d-1\|ESC-W5e-1\|F-W5c-1' COHESION.md`⟩ → no ruling since §0bp.

### Register

| # | severity | claim | receipt | cure |
|---|---|---|---|---|
| C2-1 | **HIGH** | Carried from Check 1 D-1, unmoved. **G-W5-d1 · d2 · e1 · e2 · close are RED with no relief in W5.md.** 2.0.0 is not published, ADMITTED is FALSE, value.js is not on the seam, the hand grammar stands, and RC-P is FALSE. The escalations are named (ESC-W5d-1 as an OWNER ACT, now tagged at `661b47c`, and the F-W5d-1 ruling), but a named blocker is not a relief. There is no seat misconduct. | ⟨`npm whoami`⟩ → `E401` · ⟨`npm view … dist-tags`⟩ → `latest 1.0.0` · RC-P ×2 FALSE 3/6 · `grep -c parse-that package.json` → `0` · `544 · 101` | Owner: `npm login` → `npm publish` 2.0.0 → `git tag v2.0.0 661b47c` · orchestrator rules F-W5d-1 · re-dispatch `.e` → RC-P ×2 → Check 3 |
| C2-2 | MEDIUM | **G-W5-a3's perf limb is still RED.** No low-load `proof:perf` read exists. Repair 1's interleaved A/B does not rule out a ~14 % regression from the merge's `src/parse/**` changes. | Repair 1 D-2c · load 30–54 at this seat | R-close-1 / ESC-R1-1: a low-load (< ~4) read by the `.d` re-dispatch seat before the PUT, with any real regression taken to its root cause |
| C2-3 | MEDIUM | **`.a`'s "parse-that's own test suite … GREEN" is not met in full.** css-recovery has 2 RED legs (ESC-c1, the `PACKRAT_ARMED` latch in `src/parse/packrat.ts`, outside every W5 unit's bounds). Its routing is COHESION :1913 "ESC-c1 … → W4", carried. That routing is a prior wave's, not a relief in W5.md. | ⟨css-recovery vitest⟩ → `2 failed | 473 passed (475)`, both in `latch.test.ts` | The orchestrator grants a bounded library-seam unit, or rows it as a routed carry by dated addendum |
| C2-4 | MINOR | Rulings are owed on R-c-2 (`light-dark()` evaluates only to `color_context_required`) and SC-2 (`display-p3-linear` widens the frozen `CssColorSpace`). Owners are now named (DIVERGENCE-LEDGER §13 and ESC-R1-2), so the coverage clause of the goal is mitigated but not met. | `052de4d6` §13 · Repair 1 D-3 | Orchestrator ruling, then Track D's next X·P grammar wave |
| C2-5 | MINOR | F-W5c-1 (legacy `none` alpha under PB-01/02) is still unruled. | `test/css-color5.test.ts:210-222` | Orchestrator ruling |
| C2-6 | INFO | Repair 1's `6fcc207` wrote a line to `typescript/CHANGELOG.md`, which is in `.d`'s writable set, not `.b`/`.c`'s. It is still inside W5's derived union, and the Repair declares it. | ⟨`git show --stat 6fcc207`⟩ | none |

### Honest-RED set
**Empty.** No RED gate is relieved by W5.md's own bytes:
- d1, d2, e1, e2 and close wait on an owner act and a ruling.
- a3-perf is an unproven environmental claim.
- The ESC-c1 legs are routed only by a prior wave's text.

### Successor "Opens after"
⟨`grep -rln 'Opens after.*X\.P\.W5' docs/tranches/X`⟩ → only `parse-that/waves/W5.md` itself, so no wave declares `X.P.W5 CLOSED` as a conjunct. KF.W3 stays keyed on RC-P(V), which is FALSE ×2, so it is **lawfully blocked**. The X-W11 coordinate needs RC-P TRUE, which is not met. No successor is blocked unlawfully.

### Tally (counted from the register)
0 BLOCKER · 0 CRITICAL · 1 HIGH · 2 MEDIUM · 2 MINOR · 1 INFO. Gates reproduced GREEN: 6 (a1 a2 b1 c1 c2 d3). RED: 6 (a3-perf d1 d2 e1 e2 close). **LEDGER status not moved** (PARTIAL stands). Next: owner act ESC-W5d-1 (tag `661b47c`) + F-W5d-1 → `.d` re-dispatch (perf read) → `.e` → Check 3.

## Repair 2

Repair seat (round 2), `claude-opus-5-5`, 2026-09-23 ~14:28 EDT. Read: W5.md whole (22 lines), this record's header through §Unit plan, and §Check 2. Crash-recovery: my writable set (this record, `LEDGER.md`) was clean. parse-that dirt is the July `rust/**`/`.cargo`/`README.md` set, which I left alone. parse-that master is `661b47c` (`## master...origin/master`). No COHESION ruling since §0bp touches W5: ⟨`grep -n 'W5d-1\|ESC-c1\|F-W5c-1\|R-c-2' COHESION.md`⟩ → only :805/:1825/:1913 (prior waves); §0bq..§0bt concern other tracks.

**Result: 0 cured, 5 escalated, and no code commit.** Every defect at MEDIUM or above has its only cure outside this seat's reach: an owner act, an orchestrator ruling, a path outside W5's bounds, or a load condition the host does not meet. Neither MINOR has a one-command cure, because each is a ruling. I applied no masking fallback.

| defect | cure attempted / reason | commit | gate re-reading (×2, settled bytes) |
|---|---|---|---|
| C2-1 HIGH (d1 d2 e1 e2 close) | **ESCALATED.** The publish is an OWNER ACT: ⟨`npm whoami`⟩ → `E401` ×2. A `v2.0.0` tag before the publish would claim a release that does not exist, so it stays with ESC-W5d-1 (tag at `661b47c`). `.e` is keyed on the published package (W5.md :21 "depends on the published parse-that"), and F-W5d-1 is unruled. | — | ⟨`npm view @mkbabb/parse-that dist-tags.latest`⟩ → `1.0.0` ×2 · ⟨`git tag -l 'v2*' \| wc -l`⟩ → `0` ×2 · ⟨`grep -c parse-that package.json`⟩ → `0` ×2 · ⟨`wc -l src/css/grammar.ts src/css/syntax.ts`⟩ → `544 101` ×2. RC-P is not re-run because no conjunct input moved (Check 2 banked FALSE 3/6 ×2 at the same `661b47c` + registry state). |
| C2-2 MEDIUM (a3 perf) | **ESCALATED.** The cure needs a load average below ~4. ⟨`sysctl -n vm.loadavg`⟩ → `{ 43.50 42.79 51.33 }` ×2. A read taken under this load would repeat Repair 1's inconclusive A/B. | — | unmoved (RED) |
| C2-3 MEDIUM (ESC-c1 latch, 2 legs) | **ESCALATED.** The cure is in `typescript/src/parse/packrat.ts` (`PACKRAT_ARMED`), which is outside every W5 unit's writable set (§Unit plan). It needs an orchestrator grant of a bounded library-seam unit, or a dated routed-carry addendum. | — | unmoved (Check 2: 473/475, both in `latch.test.ts`) |
| C2-4 MINOR (R-c-2 / SC-2) | **ESCALATED.** Needs an orchestrator ruling (widening the frozen `CssColorSpace` is not a seat's call). | — | — |
| C2-5 MINOR (F-W5c-1) | **ESCALATED.** Needs an orchestrator ruling. | — | — |
| C2-6 INFO | No action required. | — | — |

**Status: unmoved (PARTIAL).** Next: owner `npm login` → publish 2.0.0 → tag `v2.0.0` `661b47c` · the orchestrator rules F-W5d-1, R-c-2/SC-2, F-W5c-1 and ESC-c1 routing · `.d` re-dispatch (low-load perf read) → `.e` → RC-P ×2 → Check 3.

## Check 3

Fresh adversarial check (L-20 pass 3), `claude-opus-5-5`, 2026-09-23 ~14:30–14:40 EDT. Read: W5.md whole (22 lines), this record's header through §Unit plan, §Check 2 and §Repair 2. Crash-recovery: my writable set (this record, `LEDGER.md`) was clean at open. The parse-that dirt is still the July `rust/**`/`.cargo`/`README.md` set, which I did not touch. Load was 46–59. Scratch: session scratchpad `chk3/`.

**Verdict: NOT-CONFORMANT (unchanged from Checks 1 and 2).** Nothing has moved since Repair 2:
- parse-that master is still `661b47c` (`## master...origin/master`, 0 commits since).
- ⟨`npm whoami`⟩ → `E401 Unauthorized`.
- ⟨`npm view @mkbabb/parse-that dist-tags`⟩ → `latest 1.0.0`.
- ⟨`git tag -l 'v2*'`⟩ → none.
- COHESION's last section is still §0bt; no section after §0bp rules on F-W5d-1, ESC-c1, F-W5c-1 or R-c-2.

### Axes
1. **Claimed GREENs reproduce: 6 of 6** (a1 a2 b1 c1 c2 d3 at `661b47c`).
   - a1: ⟨`merge-base --is-ancestor 31999135 master`⟩ → `anc=0`.
   - a2: ⟨`ls typescript/scripts/proof-no-css-surface.mjs`⟩ → `No such file`, and ⟨`grep -c no-css-surface typescript/package.json`⟩ → `0`.
   - b1: ⟨`run-full-surface.mjs --pinned-value-commit 6aca8602…`⟩ ×2 → `MIRROR-DEFECTS 0 (of which spec-undecided 0)` · `GREEN` `EXIT=0` both times. `diff` after line 1 → `0`.
   - c1/c2: ⟨`npx vitest run`⟩ → `✓ test/css-color5.test.ts (14 tests)` · `Test Files 15 passed (15) · Tests 148 passed (148)` `EXIT=0`.
   - d3: ⟨`rc-p-evaluate.mjs --version 4.0.0`⟩ ×2 → `6 ROUTED(V) yes TRUE TRUE`.
2. **Bounds: clean.** No new code commit since Check 2. ⟨`git show --stat ce2801e9 20c70b57`⟩ → only this record and `LEDGER.md` changed. ⟨`git log 42a82e3e..HEAD -- scripts/dev/dev.sh | wc -l`⟩ → `0`.
3. **Masking: none.** No new diff; Check 2's sample of the Repair 1 diff stands.
4. **Commit families:** one per meaning; unchanged.
5. **E-3:** ⟨`git diff --stat 42a82e3e..HEAD -- parse-that/waves/ V/megatranche/registry/adjudicated/ parse-that/RELEASE-CONDITION.md parse-that/ADJUDICATION-W4.md`⟩ → empty.
6. **Mail:** ⟨`grep -cE '\| *UNREAD *\|' INBOX.md`⟩ → `0`.
7. **Four-verb:** W5.md designates no move, and none was made. Lawful.
8. **Goal criterion: NOT MET.**
   - value.js ⟨`grep -c parse-that package.json`⟩ → `0`.
   - ⟨`wc -l src/css/grammar.ts src/css/syntax.ts`⟩ → `544 · 101`.
   - RC-P ×2 → `FALSE — 3 of 6 conjuncts are FALSE: 1 PUBLISHED(V) · 3 EQUIVALENCE(V) · 4 ADMITTED(V)`, with arm V `20962` and `EXIT=1` both times.
9. **Figures reproduce.** Repair 2's re-reads hold: latest `1.0.0`, no v2 tag, `0`, `544/101`. The vitest `148/148` and b1 `0` reproduce.
10. **Honest-RED adjudication:** W5.md's bytes still carry no honest-RED id, no producer-owned row and no successor routing for d1, d2, e1, e2, close or a3-perf. The Close line (:22) requires RC-P re-evaluated, and `.d`/`.e` are in-wave units.

### Register

| # | severity | claim | receipt | cure |
|---|---|---|---|---|
| C3-1 | **HIGH** | Carried from C2-1, unmoved. **G-W5-d1 · d2 · e1 · e2 · close are RED with no relief in W5.md.** 2.0.0 is not published, ADMITTED is FALSE, value.js is not on the seam, the hand grammar stands, and RC-P is FALSE. The blockers are named (ESC-W5d-1 as an OWNER ACT, F-W5d-1 as a ruling), but a named blocker is not a relief. There is no seat misconduct. | ⟨`npm whoami`⟩ → `E401` · `latest 1.0.0` · RC-P ×2 FALSE 3/6 · `0` · `544 · 101` | Owner: `npm login` → publish 2.0.0 → `git tag v2.0.0 661b47c` · orchestrator rules F-W5d-1 · re-dispatch `.e` → RC-P ×2 → Check 4 |
| C3-2 | MEDIUM | Carried from C2-2. The a3 perf limb has no low-load read. | ⟨`sysctl -n vm.loadavg`⟩ → `{ 59.42 46.65 52.29 }` | ESC-R1-1: a low-load read at the `.d` re-dispatch |
| C3-3 | MEDIUM | Carried from C2-3. The ESC-c1 latch legs (2 of 475) are routed only by a prior wave's text. | Check 2 `473/475` (no new diff) | Orchestrator grant, or a dated routed-carry addendum |
| C3-4 | MINOR | Carried from C2-4. R-c-2/SC-2 rulings are owed; owners are named. | `052de4d6` §13 | Orchestrator ruling |
| C3-5 | MINOR | Carried from C2-5. F-W5c-1 is unruled. | `test/css-color5.test.ts:210-222` | Orchestrator ruling |

### Honest-RED set
**Empty.** No RED gate is relieved by W5.md's own bytes. d1, d2, e1, e2 and close wait on an owner act and a ruling. a3-perf is environmental and unproven.

### Successor "Opens after"
⟨`grep -rln 'Opens after.*X\.P\.W5' docs/tranches/X`⟩ → only W5.md and this record. No wave declares `X.P.W5 CLOSED` as a conjunct. KF.W3 is keyed on RC-P(V), which is FALSE ×2, so it is **lawfully blocked**. The X-W11 coordinate needs RC-P TRUE, which is not met. No successor is blocked unlawfully.

### Tally (counted from the register)
0 BLOCKER · 0 CRITICAL · 1 HIGH · 2 MEDIUM · 2 MINOR. Gates reproduced GREEN: 6 (a1 a2 b1 c1 c2 d3). RED: 6 (a3-perf d1 d2 e1 e2 close). **LEDGER status not moved** (PARTIAL stands). Next: owner act ESC-W5d-1 + F-W5d-1 ruling → `.d` re-dispatch (perf read) → `.e` → Check 4. A repair seat cannot move this wave until then.

## Open (RESUME, COHESION §0bx)

Seat 0 (OPEN, RESUME mode), `claude-opus-5-5`, 2026-09-23 ~15:0x EDT. Read: W5.md whole (30 lines, its §0bx ADDENDUM is the resume spec), COHESION §0bx whole, RUNBOOK §1.4/§3.4, this record's header through §Unit plan and §Check 3 (the last section). Trees: value.js `tranche-u` @ `1602340e` · parse-that `master` @ `661b47c` (`## master...origin/master` after `git fetch`).

### Preconditions (resume)

| condition | at the bytes | ledger | verdict |
|---|---|---|---|
| X.P.W4S CLOSED | banked at the first Open (row 92 CLOSED) | unchanged | MET |
| `.a` landed | ⟨`git -C parse-that log --oneline`⟩ → `4eac70c merge: w2/harness …` on `origin/master` | row 96 roster | alreadyDone |
| `.b` landed | → `902172d fix(css-equivalence) …`; b1 `MIRROR-DEFECTS 0` ×2 (Check 3, same `661b47c`) | row 96 | alreadyDone |
| `.c` landed | → `ec18f4b feat(css/color) …`; vitest 148/148 (re-read below) | row 96 | alreadyDone |
| `.d` release commit pushed, NOT published | ⟨`git branch -r --contains 488523c`⟩ → `origin/master` · ⟨`npm whoami`⟩ → `E401 Unauthorized` · ⟨`npm view @mkbabb/parse-that dist-tags --json`⟩ → `{"latest":"1.0.0"}` · ⟨`git tag -l 'v2*'`⟩ → none | PARTIAL | re-dispatched (W5.md addendum order) |
| RELEASE-CONDITION §2.4 addendum (b) written (F-W5d-1) | `RELEASE-CONDITION.md:412` "ADDENDUM 2026-09-23 (§2.4 … F-W5d-1 (b))", landed in `e919164d` | — | MET |
| ESC-c1 granted → `.f`; F-W5c-1 / SC-1 / SC-2 / R-c-2 / R-b-2 / R-b-1 → `.g` | W5.md :24–:30 + COHESION §0bx | — | RULED (cited, not re-opened) |
| Track A `src/css` lock (for `.e`) | ⟨`git log --since="2 hours ago" --oneline -- src/css`⟩ → empty; X-W12 row 37 `planned` | X-W12 planned | clear at open; `.e` re-checks at its own open |

### Crash-recovery scan (own writable set only)
- value.js: this record, `LEDGER.md`, `INBOX.md` — clean. Other dirt (`CARRY-LEDGER.md`, `scripts/dev/dev.sh`, untracked `docs/tranches/X/audit/`, `execution/chassis/ui-audit.js`) belongs to others — untouched.
- parse-that: the July `rust/**` · `.cargo/config.toml` · `README.md` set only (not W5-inherited; outside every owed unit's writable set — `.d`'s README note must NOT stage the dirty `README.md` hunks: it lands release notes in `typescript/` or `CHANGELOG`, or escalates) · `?? .worktrees/`. No partial `.f`/`.g` work in `typescript/src/parse/packrat.ts` or `typescript/src/css/**`.

### E13 Step-0 mail sweep (2026-09-23 ~15:0x EDT)
Four paths + glass `BL` (newest tranche dir: ⟨`ls -td glass-ui/docs/tranches/*/`⟩ → BL, BK, BJ). Commits since the 14:4x sweep: glass BL/BK none new (`6433284a`/`b7099ea6` D1 research, `fe5df357` = I-42 rowed); keyframes V coordination and atlas P coordination: none in 6 h. INBOX last rows I-42 / O-61; ⟨`grep -cE '\| *UNREAD *\|' INBOX.md`⟩ → `0`. **0 unrowed, 0 new UNREAD.** Sweep line appended.

## Baseline (RESUME)

Only the gates the owed units (`.f` `.g` `.d` `.e`) turn were re-run; the rest cite Check 3 (same parse-that `661b47c`, no input moved). Load ⟨`sysctl -n vm.loadavg`⟩ → `{ 23.13 41.08 48.95 }`. Scratch: session scratchpad `w5r/`.

| gate | unit | command | BEFORE | reading |
|---|---|---|---|---|
| **G-W5-f1** latch ×2 | `.f` | ⟨`cd parse-that/typescript && npx vitest run -c test/css-recovery/vitest.config.ts test/css-recovery/boundary/latch.test.ts`⟩ | `Tests 2 failed \| 5 passed (7)` — `× L-3 RESETTABLE — resetPackrat() must DISARM, not merely clear the memo store` · `× the whole reading, published as one record` | **RED** |
| **G-W5-f2** css-recovery 475/475 | `.f` | ⟨`npx vitest run -c test/css-recovery/vitest.config.ts`⟩ | `Test Files 1 failed \| 11 passed (12)` · `Tests 2 failed \| 473 passed (475)` EXIT=1 | **RED** (= ESC-c1 exactly) |
| **G-W5-g1** F-W5c-1 legacy `none` refused | `.g` | ⟨tsx probe `parseCssColor` over `src/css/entry.mjs`⟩ | `rgb(255, 255, 255, none)` → `{"ok":true,…"alpha":"none"}` · `hsla(120, 100%, 50%, none)` → `{"ok":true,…}`; `css-color5.test.ts:217` pins them as `RULED_PB_01_02` | **RED** |
| **G-W5-g2** SC-1 `calc()` in channels | `.g` | same probe | `rgb(calc(255) 0 0)` → `css_syntax` expected `<number>`; `oklch(calc(0.5 + 0.1) 0.1 120)` → `css_syntax` | **RED** |
| **G-W5-g3** SC-2 `display-p3-linear` | `.g` | same probe | `color(display-p3-linear 1 0 0)` → `css_syntax` expected `<color-space> (srgb, …, xyz-d65)` | **RED** |
| **G-W5-g4** R-c-2 `light-dark()` via the context path | `.g` | same probe | `light-dark(white, black)` → `color_context_required` (no scheme field to resolve through) | **RED** |
| **G-W5-g5** R-b-2 `var()` in `animation` | `.g` | ⟨tsx probe `parseStylesheet`⟩ | `a{animation: var(--a) 1s}` · `a{animation: fade 1s var(--e)}` → `animation_option_invalid`; control `a{animation: fade 1s ease}` → ok | **RED** |
| G-W5-g6 R-b-1 corpus counts re-pinned w/ dated note | `.g` | Repair 1 `661b47c` re-pinned css-equivalence 28/28 | held; `.g` re-pins again if `.g`'s cures move the corpus | hold |
| G-W5-g7 JS ≡ Wasm | `.g` | `.c`'s 1,776-input WPT differential (in `npm test`) | ⟨`npm test`⟩ → `Test Files 15 passed (15)` · `Tests 148 passed (148)` EXIT=0 | hold (GREEN) |
| G-W5-b1 MIRROR-DEFECTS 0 ×2 | `.g` | `run-full-surface.mjs --pinned-value-commit 6aca8602…` | Check 3 banked `0` ×2 at `661b47c` (no commit since) | hold (GREEN) |
| **G-W5-d1** 2.0.0 published | `.d` | ⟨`npm view @mkbabb/parse-that dist-tags.latest`⟩ ×2 · ⟨`npm whoami`⟩ | `1.0.0` ×2 · `E401` | **RED** (owner act ESC-W5d-1) |
| **G-W5-d2** ADMITTED (dependency closure, §2.4 addendum (b)) | `.d` | RC-P conjunct 4 | Check 3 FALSE ×2 (no `.wasm` in V's closure: V does not depend on parse-that) | **RED** |
| G-W5-d3 ROUTED | `.d` | RC-P conjunct 6 | Check 3 TRUE ×2 | GREEN (banked F-open-2) |
| G-W5-d4 tag `v2.0.0` | `.d` | ⟨`git -C parse-that tag -l 'v2*' \| wc -l`⟩ ×2 | `0` ×2 | **RED** |
| **G-W5-e1** value.js depends on parse-that | `.e` | ⟨`grep -c parse-that package.json`⟩ ×2 | `0` ×2 | **RED** |
| **G-W5-e2** hand grammar deleted | `.e` | ⟨`wc -l src/css/grammar.ts src/css/syntax.ts`⟩ ×2 | `544 · 101` ×2 | **RED** |
| **G-W5-close** RC-P six conjuncts ×2 | Close | `rc-p-evaluate.mjs` | Check 3: `FALSE — 3 of 6: 1 PUBLISHED · 3 EQUIVALENCE · 4 ADMITTED` ×2 | **RED** |
| a3-perf | — | `proof:perf` | `PT-PERF-LOAD` honest-RED by instrument (W5.md :29); the orchestrator reads it quiesced | not a gate on publish |

GREEN-BEFORE-CURE: none (every cure gate reads RED; g6/g7/b1/d3 are holds).

## Unit plan (RESUME)

alreadyDone: `X.P.W5.a` · `X.P.W5.b` · `X.P.W5.c` (commits on parse-that `origin/master`; never re-dispatched). Strictly serial per W5.md :30: `[.f] → [.g] → [.d] → [.e]`, one at a time, every seat Opus 5.5. An ESCALATED unit does not halt the wave, but `.e` runs only if 2.0.0 is on the registry. W5.md still has no §File Bounds block, so each writable set is taken from the addendum's text and is the whole grant. Adjacent-line rule (§0bt) applies.

| unit | model | W5.md lines | writable | gates | locks |
|---|---|---|---|---|---|
| X.P.W5.f | opus | addendum ESC-c1 (:27) | parse-that `typescript/src/parse/packrat.ts` (+ its Wasm/lowering twin only if the latch is mirrored there, as an adjacent edit) · this record | G-W5-f1 ×2 · G-W5-f2 475/475 · `npm test` 148/148 and `proof:packrat-*` hold | tests unedited (the latch test is the oracle) · push parse-that master, no force |
| X.P.W5.g | opus (high) | addendum F-W5c-1 (:25) + Coverage (:28) | parse-that `typescript/src/css/**` (grammar, algebra, lowering-js, lowering-wasm, color-mix, `build/*.d.ts`) · `typescript/test/**` (WPT-derived cases, css-color5, corpus-count re-pins) · value.js `docs/tranches/X/parse-that/DIVERGENCE-LEDGER.md` (dated rows appended, E-3) · this record | G-W5-g1..g5 · g6 (re-pinned w/ dated note) · g7 JS ≡ Wasm · b1 MIRROR-DEFECTS 0 ×2 · `npm test` + css-recovery GREEN | F-W5c-1 cure + its divergence row in ONE commit; R-b-2 cure + its row in ONE commit; no 53rd export (R-c-2 widens the existing context type); SC-2 widens `CssColorSpace` (2.0.0 is a major) |
| X.P.W5.d | opus | §Units `.d` (:20) + addendum order (:30) | parse-that `typescript/package.json` version · lockfile · `CHANGELOG` / typescript release notes (NOT the July-dirty root `README.md`) · built artefacts (`ac1.wasm`) · tag `v2.0.0` · this record | G-W5-d1 · d2 · d3 · d4 | publish + tag ONLY if ⟨`npm whoami`⟩ succeeds, else ESCALATE ESC-W5d-1 (owner `npm login`) with no tag; never force-push; the 2.0.0 cut sits at the final commit (after `.f`/`.g`) |
| X.P.W5.e | opus (high) | §Units `.e` (:21) + Close (:22) | value.js `package.json` · `package-lock.json` · `src/css/**` · `src/parsing/**` (only where it imports the deleted grammar) · `test/**` · this record | G-W5-e1 · e2 · G-W5-close RC-P ×2; value.js vitest + BBNF equivalence GREEN | runs only if 2.0.0 is on the registry; Track A lock: `git log --since="1 hour ago" -- src/css` empty and X-W12 not writing `src/css`, else ESCALATE; no shim, no dual path; keyframes.js untouched |

### Briefs
- **.f** — In `typescript/src/parse/packrat.ts` make `resetPackrat()` (:273 area) set `PACKRAT_ARMED = false` as well as clearing the memo store, so the epoch latch (:139–:158, armed at :297) is re-armed only by its own arming path. Mirror in the Wasm lowering only if it keeps its own latch. `latch.test.ts` ×2 and css-recovery 475/475 GREEN, `npm test` + `proof:packrat-*` hold. Commit, push.
- **.g** — Full Color 4/5 coverage in the seam, each limb with WPT-derived cases, JS ≡ Wasm. (1) F-W5c-1: legacy `rgb()/rgba()/hsl()/hsla()` refuse `none` (one alpha edit per legacy arm) plus a dated DIVERGENCE-LEDGER row superseding PB-01/02 for the legacy arms; re-read the 17 corpus cells. (2) SC-1: `calc()` in colour channels, resolved at parse when the operands are absolute, else a context verdict. (3) SC-2: `color(display-p3-linear …)`, widening `CssColorSpace`. (4) R-c-2: `light-dark()` resolves through the existing relative-colour context type, which gains a colour-scheme field (no new export). (5) R-b-2: `var()` in `animation`, with its row. (6) R-b-1: re-pin the corpus counts with a dated note. MIRROR-DEFECTS 0 ×2.
- **.d** — Run `npm whoami` first. If it succeeds: re-cut 2.0.0 at the final commit (version and CHANGELOG naming `.f`/`.g`), build, `npm publish`, tag `v2.0.0` there, push the tag. Read d1..d4 ×2, and read RC-P ×2 per the §2.4 addendum (b). If it fails: ESCALATE ESC-W5d-1 with no tag and no publish.
- **.e** — Only if `npm view @mkbabb/parse-that@2.0.0` resolves, and only if the Track A lock is clear. Depend on `@mkbabb/parse-that@^2.0.0`. `src/css/*` parses through its `./css` surface. Delete `src/css/grammar.ts` + `syntax.ts` with no shim. vitest + BBNF equivalence GREEN. Close: RC-P ×2, all six conjuncts.

## Unit receipts (RESUME)

### X.P.W5.f

Seat `claude-opus-5-5`, 2026-09-23 ~14:4x EDT. Read: W5.md whole (30 lines; ESC-c1 at :27), COHESION §0bx (to the file end, :3091–:3095), this record's RESUME header through §Unit plan (RESUME). Crash-recovery: ⟨`git -C parse-that status --porcelain`⟩ → only the July `rust/**` · `.cargo/config.toml` · `README.md` dirt and untracked docs; `typescript/src/parse/packrat.ts` clean → nothing inherited.

**Anchors at the true bytes** (parse-that `661b47c`): `let PACKRAT_ARMED = false` :158 · `packratEnter` reader :224 · `resetPackrat` early-out :273 · `makeMemoized` arm :297 — all as briefed, no drift. **Wasm twin:** ⟨`grep -rln 'ARMED' rust/ typescript/src`⟩ → only `packrat.ts`, `packrat-entry.ts` (re-export comment), `css/bounds.mjs` (instrument), `css/diagnostics.mjs` (prose) — the Wasm lowering keeps no latch, so no adjacent edit.

**Acts.**
1. `typescript/src/parse/packrat.ts`: `resetPackrat()` now ends with `PACKRAT_ARMED = false` after clearing MEMO/HEADS/GROWING/LR_STACK/CURRENT_SRC (the unarmed early-out kept).
2. Same file, INTENT recorded: the latch's own comment (:147–:152) and `latch.test.ts`'s header both state that a bare disarm is a PT-B1/PT-Q1 soundness regression — a memoizer built before a reset and invoked after it would run epoch-less, so a nested `.parse(differentSrc)` in its `.map` could overwrite the outer grow's cells. The arming path therefore stays the memoizer's own and covers that case: `memoizeFn` sets `PACKRAT_ARMED = true` inside its existing `if (CURRENT_SRC === undefined)` anchor. `resetPackrat()` clears `CURRENT_SRC` in the same act that disarms, so the first memoized node of an epoch-less parse re-arms before any nested parse can run. That costs one store per epoch and nothing per node, and the armed path is otherwise byte-identical. Comments at :139–:158 and :297 were updated to match. No test edited.
3. `npm run build` (the instrument reads `@mkbabb/parse-that/packrat` via the package self-reference → `dist/`, git-ignored).

**Commit (parse-that):** `f5169b1` fix(packrat): resetPackrat() disarms the PACKRAT_ARMED latch; a memoizer invoked after a reset re-arms it … (X.P.W5.f · ESC-c1). ⟨`git push origin master`⟩ → `661b47c..f5169b1  master -> master` (no force).

**Gates BEFORE → AFTER (double-run at `f5169b1`):**

| gate | command | BEFORE | AFTER ×2 |
|---|---|---|---|
| G-W5-f1 | ⟨`npx vitest run -c test/css-recovery/vitest.config.ts test/css-recovery/boundary/latch.test.ts`⟩ | `Tests 2 failed \| 5 passed (7)` | `Test Files 1 passed (1)` · `Tests 7 passed (7)` ×2 — **GREEN** |
| G-W5-f2 | ⟨`npx vitest run -c test/css-recovery/vitest.config.ts`⟩ | `Tests 2 failed \| 473 passed (475)` EXIT=1 | `Test Files 12 passed (12)` · `Tests 475 passed (475)` EXIT=0 ×2 — **GREEN** |
| npm test hold | ⟨`npm test`⟩ | `Tests 148 passed (148)` | `Test Files 15 passed (15)` · `Tests 148 passed (148)` ×2 EXIT=0 — **hold** |
| proof:packrat-* hold | ⟨`npm run -s proof:packrat-{cross-input,reentrant,large-offset,armed}`⟩ | — | 4 × `PASS:` (armed: "5000 non-memoized parses allocate FLAT … Isolation self-check GREEN") — **hold** |

`tsc --noEmit`: 0 errors under `src/parse` (the pre-existing `test/css-totality/**` implicit-any errors are unmoved and outside this unit).

**Adjacent edits:** none. **Residuals:** none from `.f`. The latch.test.ts header prose still calls L-3 "BORN-RED". It is an oracle file, locked as unedited, so the prose stays for `.g`/a later seat to retire under its own bounds. **Escalations:** none. ESC-c1 is CLOSED.
