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
