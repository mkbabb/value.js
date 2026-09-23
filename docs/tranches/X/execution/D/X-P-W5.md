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
