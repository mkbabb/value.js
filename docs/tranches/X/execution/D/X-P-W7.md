SERVED MODEL: claude-opus-5-5

# X.P.W7 — BBNF SPEED UPLIFT: execution record (Track D)

**Spec:** `docs/tranches/X/parse-that/waves/W7.md` (190 lines, read whole, INCLUDING its binding §0ck ADDENDUM, which supersedes conflicting lines). **Authority:** COHESION §0ch (OA-53, owner verbatim: *"We need to likely uplift and begin fixing both parse-that and bbnf--look into both of those repos and their megatranches thereof in another workflow to get the parsing speed to be FASTER than baseline"*) · §0ci R-1..R-3 (owner verbatim: *"npm login is done, the typescript compiler should be in BBNF-lang--then use your logic to ratify the rest"*) · §0ck (route ratified: staged emission ahead of time; decisions ruled). ADJACENT-LINE RULE (§0bt) binds every seat. Evidence: `evidence/W7-research/BRIEF.md` + `judge/` (banked-tmp is the rebuild source, never `$TMPDIR`).

## Open

- **Date:** 2026-09-23 (execution under the owner's begin-word of 2026-09-17). Seat 0, `claude-opus-5-5`.
- **Mode:** fresh open. ⟨`grep -n "X.P.W7" LEDGER.md`⟩ → `| X.P.W7 | §0ch (OA-53: BBNF faster than baseline) | RESEARCH RUNNING 2026-09-23 (\`wf_aabc0842-0cc\`); spec authored by the run |` (the §0ck event line, LEDGER:700, moved it to QUEUED after X.P.W6R); no prior record existed (`ls execution/D/` → W0..W6R only).
- **Crash-recovery:** ⟨`git status --porcelain`⟩ read against W7's writable sets: value.js dirty rows are `docs/tranches/V/reformation/CARRY-LEDGER.md`, `docs/tranches/X/execution/A/X-W12.md`, `scripts/dev/dev.sh` and untracked keyframes evidence dirs, none in W7's sets (siblings' work; untouched). parse-that master dirty rows (`.cargo/config.toml`, `README.md`, `rust/**`, untracked `docs/{instructions,precepts}`, `docs/tranches/B/**`) are another program's (L-3 below); no `x-p-w7` branch or `../parse-that-x-p-w7` worktree exists. bbnf-lang: no `x-p-w7-typescript` branch or worktree exists. **No inherited partial work.**

### Preconditions ("Opens after: X.P.W6R … this wave follows its close"; §0ck Order: "W7 `.p` branches from the parse-that master tip after W6R `.p`")
- **Ledger:** ⟨`grep -n "| X.P.W6R |" LEDGER.md`⟩ → `CLOSED 2026-09-17 (honest-RED: P-6 proof:perf = PT-PERF-LOAD)`; event line LEDGER:707 → `X.P.W6R Check 2 … CONFORMANT-HONEST-RED → CLOSED`. **MET.**
- **parse-that master tip after W6R `.p`:** ⟨`git -C ../parse-that log --oneline -2`⟩ → `cb9c0d4 docs(X.P.W6R.p): CHANGELOG Unreleased …` · `d129a97 chore(X.P.W6R.p): the AC-1 research instruments leave parse-that …`. `.p` cuts `x-p-w7` from `cb9c0d4` (not `92d8ea7`). ⟨`git merge-base --is-ancestor 90d4ec5 master`⟩ → ancestor (decision 6's revert target is on the line). **MET.**
- **bbnf-lang:** ⟨`git fetch origin; git log --oneline -1 origin/master`⟩ → `d2b32f6e3 chore(precepts): sync submodule …`; ⟨`git rev-list --count origin/master..master`⟩ → `71`; ⟨`git status --porcelain | wc -l`⟩ → `243` (the sk-v25 program; never touched, §0ck 5). ⟨`git cat-file -t e91428ce1` · `c14832a3a`⟩ → `commit` · `commit` (`.t`'s restore sources). **MET.**
- **Banked artifacts (§0ck addendum "Banked artifacts"; W7 "Before open"):** ⟨`cd judge/banked-tmp && shasum -a 256 -c ../banked-tmp.MANIFEST.sha256 | grep -c ": OK$"`⟩ → `79` of 79 lines. ⟨`shasum -a 256 banked-tmp/css-grammar.synth*.generated.js`⟩ → `ec272297…` synth · `c672d1f9…` synth-sa · `88f10df8…` synth-fb3, each equal to `judge/results/synth-build.json`. The spec's `judge/generated/` copy is superseded by the addendum's `banked-tmp/` (seats rebuild from there). **MET.**
- **Research inputs present:** `route-ts-compiler/src/{analysis,compile,emit,facade,kernel,regex}.ts` · `route-ts-compiler/shim/stylesheet-positional.ts` · `critic/split-rep.mjs` · `judge/harness/{bench,isolated,equiv,clean,depth,size}.mjs` · `V/apotheosis/parser-proof/PROFILE-ANALYSIS.md` (G-prior) · parse-that `docs/tranches/T/T.md` (G-T). **MET.**
- **npm (R-1):** ⟨`npm whoami`⟩ → `mkbabb`. ⟨`npm view @mkbabb/parse-that versions`⟩ tail → `0.12.0, 0.13.0, 1.0.0` (2.0.0 unpublished, so no re-cut); ⟨`npm view @mkbabb/bbnf-lang version`⟩ → `0.1.4`.

### E13 Step-0 mail sweep
- Paths: value.js `docs/tranches/V/` + `V/coordination/` · glass-ui `docs/tranches/BK/coordination/` (⟨`ls -t glass-ui/docs/tranches`⟩ → `BL BK BJ …`; BL has no `coordination/`, so BK stays the mail path; BL's root swept too) · keyframes.js `docs/tranches/V/coordination/` · atlas `docs/tranches/P/coordination/`.
- ⟨`find <path> -maxdepth 1 -type f -newer INBOX.md`⟩ → 0 files in all six. INBOX's last row is I-47 (+ erratum) and O-65; nothing unrowed is addressed to value.js.
- **Result: 0 UNREAD in scope.** A sweep line was appended to INBOX.md.

## Baseline (BEFORE, read-only, 2026-09-23 20:26–20:30 EDT)

The spec's timing gates are defined on `.o`'s instrument, which does not exist yet; `.o`'s own gate O-2 is the paired reproduction. The BEFORE below is (i) the byte-level born-RED gates read by grep, and (ii) one reading of the standing bench of record (`bench/css-parse.bench.ts`, vitest bench, NOT paired and NOT the gate instrument; one run, heavy load; it is context, not a gate reading).

| Gate | Unit | Command | BEFORE | Reading |
|---|---|---|---|---|
| V-9 runtime deps (§0ck 7) | `.v` | `node -e` over `package.json` deps/devDeps matching `parse-that\|bbnf` | deps `{"@mkbabb/bbnf-lang":"0.1.4","@mkbabb/parse-that":"0.8.2"}` · devDeps `{}` | born-RED |
| V-7a concatenation (F-b-1) | `.v` | `grep -rn GRAMMAR_MODULES src/css/bbnf` | `load.ts:36 export const GRAMMAR_MODULES = …` · `load.ts:42 BBNFToParser(Object.values(GRAMMAR_MODULES).join("\n"))` | born-RED |
| V-7b `reset()`/`new ParserState` (F-b-2) | `.v` | `grep -rnE "reset\(\)\|new ParserState" src/css/bbnf` | `load.ts:59 rule.reset();` · `load.ts:60 rule.call(new ParserState<T>(source))` (+ comment line 16) | born-RED |
| V-7c case-pair classes (F-b-3) | `.v`/`.t` | `grep -ohE "\[[a-zA-Z]{2}\]" src/css/grammar/*.bbnf` filtered to case pairs | `123` (literal `[xX]` alone: `6`; the spec's 117 counts the spellings inside `/…/i` literals only — `.t`/`.v` re-count by that definition) | born-RED |
| F-p-EOF `ws` | `.v` | `grep -n "ws *=" src/css/grammar/tokens.bbnf` | `19: ws = /\s*/ ? ;` (the `?` workaround) | born-RED |
| generated module / CI check | `.v` | `ls src/css/bbnf/generated` · `grep -n bbnf .github/workflows/ci.yml` | absent · 0 hits (W6R `.c` step at ci.yml:76 present) | born-RED |
| P-1/P-2 parse-that core | `.p` | `grep -rn "Object.create(state\|console.error" typescript/src/parse` (parse-that master `cb9c0d4`) | `parser.ts:193 const oldView = Object.create(state);` · `parser.ts:67 console.error(errorState.toString());` | born-RED |
| P-6 parse-that 2.0.0 published | `.p` | `npm view @mkbabb/parse-that versions` | `… 0.12.0, 0.13.0, 1.0.0` (no 2.0.0; `typescript/package.json` reads `2.0.0`) | born-RED |
| P-4 parse-that stay-GREEN | `.p` | banked, W6R Check 2 | `npm test` 134/134 x2; `proof:all` proofs 1–9 GREEN, `proof:perf` FAIL = PT-PERF-LOAD (retires into R-3's paired ratio, §0ci) | cited, not re-run |
| T-1/T-6 bbnf-lang TS package | `.t` | `git ls-tree --name-only origin/master` | no `typescript/` at `d2b32f6e3` | born-RED |
| E-8 bbnf-lang 0.2.0 | `.e` | `npm view @mkbabb/bbnf-lang version` | `0.1.4` | born-RED |
| V-2 value.js suite | `.v` | banked, W6R Check 2 | `test:css-equivalence` 19/19 x2 · `npm test` 908/910 (F-W6-open-4 pair) | cited stay-GREEN baseline |
| R-3 speed (context) | `.o`/`.v`/`.k`/`.z` | `uptime; npx vitest bench --run -c bench/vitest.config.ts; uptime` | load `55.66 44.34 49.23` → `49.56 45.55 49.35`; retired faster than BBNF: color 1.53× · scalar 1.42× · value 2.59× · values 4.75× · keyframe 2.20× · timing 1.47× · stylesheet 6.05× | RED (all 7 slower; the record `2026-09-23-x-p-w6-x.json` read 1.11–2.79×, the judge's fresh-process cells 1.34–2.42× and 6.06× sheet) |

**greenBeforeCure: none.** Every gate a unit turns reads RED at the bytes; the two cited stay-GREEN rows are regression guards, not cures.

Output: scratchpad `w7-bench-before.txt` (excerpt quoted verbatim above).

## Unit plan

Seven Opus 5.5 units (spec "Model: Opus 5.5, every seat"; §5.1 superseded for this wave by the owner's Opus-only order), **strictly ordered** per the spec heading "Units, strictly ordered: `.o` → `.p` → `.t` → `.e` → `.v` → `.k` → `.z`", one concurrent: `[.o] → [.p] → [.t] → [.e] → [.v] → [.k] → [.z]`. `.t` ports onto the published `.p` release (`.p`'s worktree may be linked until then), `.e` consumes `.t`'s analysis, `.v` consumes `.e`'s published 0.2.0, `.k` profiles `.v`'s adopted module, `.z` re-reads on the published pins. ESCALATED units do not halt the wave. Every timing gate uses `.o`'s instrument (fresh process per cell, retired parser in-process, ≥11 interleaved rounds, rotating/reversed arm order over ≥3 reps, gc before every pass, `uptime` before/after every cell, median of paired ratios + min/min, spread ≥1.6× re-run and every set-aside cell counted) and reads **accepted and rejected halves separately** (G-acc/rej; a half under 500 sources repeated until each timed pass ≥20 ms). Equivalence = `isDeepStrictEqual` on the whole result against `.o`'s frozen oracle; the only admitted divergences are the F-b-4 rows (4 corpus + 62 reader), rowed spec-correct in a dated DIVERGENCE-LEDGER section (§0ck 1; stock-ASCII routing never reproduced).

### Rulings cited (never re-opened)
§0ck 1 F-b-4 accepted · §0ck 2 positional semantics · §0ck 3 bbnf-lang 0.2.0 · §0ck 4 Rust `TsEmitter` untouched, TS README names the TS emitter · §0ck 5 bbnf-lang: branch from origin/master, own worktree, push the branch only, merge at `.z` by `gh pr merge --merge`, never touch local master · §0ck 6 revert `90d4ec5` on the release line unless `.p`'s paired gate reads HEAD-with-cures ≤ 0.8.2-with-cures on every entry; publish 2.0.0 · §0ck 7 value.js runtime carries no parse-that and no bbnf-lang · §0ci R-1 publishing unwalled (`npm whoami`, clean tree, the package's own release gate first) · R-2 the TS compiler lives in bbnf-lang · R-3 bar = faster than the retired hand parser on every entry, paired ratio, load recorded (PT-PERF-LOAD retires into it) · W7 decision 9 (the accepted-input cells bind R-3; ruled by the §0ck delegation and made a gate by G-acc/rej).

### Locks
- **L-1 (strict order):** no unit dispatches before its predecessor's commits exist; `.t` may link `.p`'s worktree only until `.p` publishes, then pins `^2`.
- **L-2 (value.js `ci.yml`):** W6R `.c` landed `- run: npm run test:css-equivalence` (ci.yml:76). `.v` appends ONE step (`bbnf gen --check`) after it and never edits W6R's step.
- **L-3 (parse-that dirty rows):** `.cargo/config.toml`, `README.md`, `rust/**`, untracked `docs/{instructions,precepts}`, `docs/tranches/B/**` on master are another program's; `.p` works only in `../parse-that-x-p-w7` on `x-p-w7` cut from `cb9c0d4`; the Codex worktrees are never touched.
- **L-4 (bbnf-lang master):** 243 dirty sk-v25 paths + 71 unpushed commits. `.t`/`.e`/`.k` work only in `../bbnf-lang-x-p-w7-typescript` on `x-p-w7-typescript` from `origin/master` (`d2b32f6e3`); `.z` preflights `git diff origin/master...x-p-w7-typescript --stat` (only `typescript/**` + the package's CI/release files) and merges by PR.
- **L-5 (value.js `package.json`):** re-read `git diff package.json` immediately before committing; a sibling track's hunk present = poll ≤10 min, then ESCALATE; never commit another seat's hunk.
- **Same-commit families:** `.v` F-b-1 (the `@import` headers + deleting the concatenation) ONE commit; `.v` dependency move (bbnf-lang to devDependencies, parse-that out, lockfile) ONE commit; `.p`'s `90d4ec5` revert is its own ordinary revert commit; bbnf-lang's close merge is the PR merge commit only.

### `.o` — value.js: the oracle and the instrument (W7.md 30–47; addendum G-acc/rej, G-large, G-prior)
- **Writable:** value.js `bench/**` (instrument, fixture, records) · `docs/tranches/X/parse-that/DIVERGENCE-LEDGER.md` (append-only dated F-b-4 section, §0ck 1) · this record. **Nothing under `src/`.**
- **Acts:** read PROFILE-ANALYSIS.md and fold its findings (G-prior); freeze the hash-pinned golden fixture (7 entries × 29,944 sources; 19 reader calls; the reader-shaped corpus harvested by recording reader inputs during `parseStylesheet` over the real corpus; `coerceToSyntax`, `parseAnimationRange`, `parseAnimationTimeline`, `collect*`; F-b-4 rows enumerated); promote `judge/harness/{bench,isolated,equiv,clean}.mjs` beside `bench/css-parse.bench.ts` (quiesceRule retires into recorded load, R-3); split accepted/rejected cells (`critic/split-rep.mjs` idiom); the 50–500 KB real-sheet cell (value.js + keyframes built CSS + a WPT sheet); mint the two 7/7 gates born-RED.
- **Gates:** O-1 fixture regenerates byte-identically (sha256 pinned) · O-2 on the product stock/retired ≥1.3 on all 7 entries and ≥4 on `parseStylesheet` · O-3 both 7/7 gates (whole-corpus, accepted-class) read RED · O-4 `git diff --stat -- src/` empty.

### `.p` — parse-that: general-library cures and the 2.0.0 release (W7.md 48–66; addendum parse-that, G-T; §0ck 6/7)
- **Writable:** parse-that, branch `x-p-w7` in `../parse-that-x-p-w7` cut from `cb9c0d4`: `typescript/src/parse/**`, `typescript/test/**`, `typescript/CHANGELOG.md`, `typescript/package.json` (+ `package-lock.json` beside it if the release gate regenerates it), one dated addendum file under parse-that `docs/` (NOT under `docs/tranches/{T,U}`) recording each cure against T's completion criteria and retiring U.W7 / the T/U value.js rows · this record. Nothing under `rust/`.
- **Acts:** read `docs/tranches/T/T.md` + README whole (G-T); (a) `mapState` → span-carrying `mapSpan` (no `Object.create(state)`); (b) diagnostics-off failure path silent and allocation-free; (c) F-p-EOF; (d) self-patching `lazy` only if parse-that's bench does not regress; (e) document `all()` positional as the 2.x contract; (f) measure `90d4ec5` → revert commit unless the paired gate clears it (§0ck 6); release gate incl. T's `VALUE-VNEXT-COORDINATION.md` checkpoints; push branch; publish 2.0.0.
- **Gates:** P-1 `%HaveSameMap(state,new ParserState)` after `mapSpan` on `badTerm`/`spanned` shapes · P-2 failing parse writes 0 console bytes and allocates no error arrays (spy test) · P-3 `/\s*/` matches `''` at EOF · P-4 `npm test` + `proof:all` GREEN x2 · P-5 Parser-core paired ratio 2.x/0.8.2 ≤ 1.00 (fresh-process cells, load recorded) · P-6 `npm whoami`=mkbabb, clean tree, release gate GREEN, `npm view @mkbabb/parse-that@2.0.0 version` → 2.0.0.

### `.t` — bbnf-lang: the TS front end, one analysis, the value-semantics spec (W7.md 67–81; §0ci R-2; §0ck 2)
- **Writable:** bbnf-lang `typescript/**` on `x-p-w7-typescript` in `../bbnf-lang-x-p-w7-typescript` (cut from `origin/master` `d2b32f6e3`) · this record.
- **Acts:** restore `typescript/` from `e91428ce1` with tests from `c14832a3a^`; port onto published parse-that 2.0.0; F-b-1 `@import` over a pure posix-path module + host-injected reader; the single analysis = route-ts-compiler `src/regex.ts` + `src/analysis.ts` (flag-aware FIRST sets, F-b-3/F-b-4 at the root); the value-semantics spec + conformance corpus (positional concatenation, `opt`→`undefined`, `many` no-progress stop, `minus` excluded-first, `>>`/`<<`, regex at EOF per `.p`); no console writes.
- **Gates:** T-1 restored TS tests pass on parse-that 2.x · T-2 value.js's five modules via `@import` deep-equal 0.1.4's AST on their concatenation (160 rules) · T-3 browser build 0 `node:` imports · T-4 FIRST-set brute force 0 misses over every grammar regex (110) · T-5 stripping the 117 `[xX]` spellings changes only the enumerated 8+62 F-b-4 rows · T-6 `git diff --stat origin/master...x-p-w7-typescript` touches only `typescript/`.

### `.e` — bbnf-lang: the staged emitter, run at build time (W7.md 82–100; addendum G-depth, G-audit, G-size; §0ck 3/4/5)
- **Writable:** bbnf-lang `typescript/**` on `x-p-w7-typescript` (same worktree as `.t`); the branch push; the package README (TS emitter = value.js's output of record, §0ck 4) · this record. The close merge itself is `.z`'s PR act (§0ck 5 supersedes "the close merge commit" here).
- **Acts:** route-ts-compiler `src/emit.ts` as the ONLY emitter (value + recognize modes, first-unit switch routing, class-run loops, leaf guards, direct calls, hoisted shared alternatives); deterministic ES module + `.d.ts` (interned constants, actions bound once at `createParser`, `RULE_NAMES`, `ACTION_KINDS`, typed `Actions`, `sha256(grammar ⊕ emitter)` header, per-entry functions returning value or FAIL with no result object); `bbnf gen` / `bbnf gen --check`; runtime `compile()` through the same emitter, `BBNFToParser` as a `toParser` façade; the depth fault as a counter on marked back-edges only, set below JSC's measured throw point; the actions contract doc; runner-up levers only if each regresses no entry; memoization off; publish `@mkbabb/bbnf-lang` 0.2.0 on parse-that ^2.
- **Gates:** E-1 emitted vs runtime `compile()` 0 diffs over conformance corpus + oracle · E-2 routing audit on the EMITTED module 0 violations + recognize-vs-value differential 0 (G-audit) · E-3 sound routing differs only in the F-b-4 rows (stock-ASCII switch kept only as a test; §0ck 1 forbids shipping it) · E-4 two emissions byte-identical; `--check` fails after a one-byte edit, passes after regen · E-5 module + `.d.ts` `tsc --strict`; `Actions` rejects missing/wrong-kind · E-6 size ≤125,646 B min / 14,517 B gz; interning measured before any tighter gate (G-size) · E-7 `calc(` ×10,000 refuses without throwing on V8 and WebKit; fault on/off paired ≤1.02 every entry, and every entry still below retired (G-depth) · E-8 `npm whoami`, clean tree, publish 0.2.0.

### `.v` — value.js: adoption (W7.md 101–122; addendum G-suite, G-browser, G-large; §0ck 7)
- **Writable:** value.js `src/css/grammar/*.bbnf`, `src/css/bbnf/**`, `scripts/gen-grammar.*`, `package.json`, `package-lock.json`, ONE appended step in `.github/workflows/ci.yml` (L-2), `test/css/**` · this record. Never `scripts/dev/dev.sh`.
- **Acts:** pin `@mkbabb/bbnf-lang` 0.2.0 exactly as a devDependency, drop both packages from runtime deps; `scripts/gen-grammar` → `src/css/bbnf/generated/` (DO-NOT-EDIT header, checked in); CI `bbnf gen --check` step; `load.ts` → `createParser(actions)` over a static typed action table; the four workarounds leave at their roots (F-b-1 `@import` headers, concatenation deleted; F-b-3 the `[xX]` spellings leave `/…/i`; F-b-2 `reset()` + `new ParserState` deleted; F-p-EOF `ws` = `/\s*/`); color/value/math/stylesheet actions → positional destructuring (template `route-ts-compiler/shim/stylesheet-positional.ts`); `tokenQuantity` leaf split only if faster.
- **Gates:** V-1 oracle 0 mismatches beyond the F-b-4 rows · V-2 `test:css-equivalence` 19/19 MIRROR-DEFECTS 0; `npm test` 908/910 (only F-W6-open-4); `vue-tsc` + `tsc` 0 · V-3 whole-corpus AND accepted/rejected-half cells (≥3 reps × 11 rounds) every entry <1.00 every cell, medians within ceilings color .90 · scalar .81 · value .57 · values .58 · keyframe .78 · timing .87 · stylesheet .85 · V-4 first use ≤0.55 of stock · V-5 Playwright Chromium+WebKit+Firefox paired same-page, no entry slower than retired on any engine (G-browser) · V-6 real 50–500 KB sheets paired below retired (G-large) · V-7 grep: no `GRAMMAR_MODULES` concatenation, no `[xX]` in `/…/i`, no `reset()`/`new ParserState` under `src/css/bbnf` · V-8 `calc(` ×10,000 refuses, never throws · V-9 runtime deps carry neither package.

### `.k` — value.js (+ emitter if needed): the per-call floor (W7.md 123–131; decision 9 bound by G-acc/rej)
- **Writable:** value.js `src/css/bbnf/index.ts`, `src/css/bbnf/generated/` (through `bbnf gen` only); bbnf-lang `typescript/**` on `x-p-w7-typescript` if the emitter changes (re-emit, re-check `.e`'s gates, patch release 0.2.x) · this record.
- **Acts:** profile the accepted-class cells first (`parseKeyframeSelector` accepted is the falsifier); bind emitted entry functions once at module load (no per-call `ruleOf(grammar())`, no `RunResult`, no generic `parseRule` wrapper at `index.ts:33`); `success`/`failure` layer stays, measured only.
- **Gates:** K-1 accepted-class cells ≥3 reps × 11 rounds, every entry <1.00 every cell · K-2 `.v`'s whole-corpus gates, browser/large cells and oracle still hold.

### `.z` — close (W7.md 132–140, 141–148; §0ck 5)
- **Writable:** value.js `bench/records/**`, `docs/tranches/X/COHESION.md` (append a dated addendum), `docs/tranches/X/relay/**` (+ mirrors per the relay idiom), `docs/tranches/V/coordination/INBOX.md`, LEDGER (row cells + append), this record; bbnf-lang: the GitHub PR and its server-side `gh pr merge --merge` (no local master act).
- **Acts:** fresh install on published pins; re-read whole-corpus + accepted/rejected cells with `uptime` lines, bank JSON; bbnf-lang preflight `git diff origin/master...x-p-w7-typescript --stat` (only `typescript/**` + package CI/release) then PR + merge; relays to parse-that T/U (VALUEJS-PT-E closes), bbnf-lang SK-V26 (E026/R3 stale, TsEmitter ruling, value-semantics spec), latex-paper (stays ^0.1.1), keyframes.js (receives at X-W11); COHESION: RES-x-1 + OC-1 speed half GREEN, BBNF-TS-TOOLCHAIN discharged, F-b-1..4 + F-p-EOF closed.
- **Gates:** Z-1 fresh install resolves one copy of each package (`npm ls`) · Z-2 on published pins every entry <1.00 in every whole-corpus and accepted-class cell, load recorded · Z-3 INBOX shows each relay acknowledged; COHESION rows committed · Z-4 PR merged, local bbnf-lang master untouched (`git -C ../bbnf-lang rev-parse master` unchanged from `af15f63e0`).

## Unit receipts


### .o

SERVED MODEL: claude-opus-5-5 · 2026-09-23 · value.js `tranche-u`. Spec W7.md §`.o` (30–47), §0ck ADDENDUM G-acc/rej · G-large · G-prior · Banked artifacts (165–190), Why (17–23); COHESION §0ch–§0ck read to the file end (3251 lines; §0ck is the last addendum).

**Crash-recovery.** ⟨`git status --porcelain`⟩ → no dirty or untracked path in `.o`'s writable set (`bench/**`, DIVERGENCE-LEDGER, this record); the dirty rows (`CARRY-LEDGER.md`, `X-W12.md`, `KF-W13V.md`, `scripts/dev/dev.sh`, keyframes evidence dirs, `e2e/smoke/w12-motion.spec.ts`) are sibling seats'. No inherited work.

**Acts, in order.**
1. **G-prior folded** (`docs/tranches/V/apotheosis/parser-proof/PROFILE-ANALYSIS.md`, 146 lines, read whole). Findings consumed: (i) its §1 LIVE profile names an unconditional `deepFreeze` (29.8% self) in the hand parser's `success()`. Measured at the bytes: ⟨`git show 2155142b:src/css/grammar.ts | grep -n deepFreeze`⟩ → `39: function deepFreeze` · `48: value: deepFreeze(value)`; ⟨`grep -n deepFreeze src/css/result.ts`⟩ → `13:` · `23: value: deepFreeze(value)`. **Both arms pay it**, so the paired ratio is fair on that axis (the §2 "fair-comparison caveat" is closed for R-3). (ii) T-1/T-2/T-3 (`mapState` `Object.create`, `mergeErrorState` on every benign failure, staging allocations) are the §0ck-measured cause; they bind `.p` (a)(b), not `.o`. (iii) O-6a (the PT-E `mapState`/benign-failure asks) is answered by `.p` and closed at `.z` (W7.md relays). No `.o` act changes on them; the instrument measures whatever arm it is given.
2. **Banked artifacts verified before any read.** ⟨`node bench/paired/build.mjs`⟩ → `"bankedManifestOk":"79/79"` (the build runs `shasum -a 256 -c ../banked-tmp.MANIFEST.sha256`). Banked arms are read from `judge/banked-tmp/` only; nothing is read from `$TMPDIR`. The instrument's own arms build into `bench/paired/_build/` (git-ignored by the root `_*`; ⟨`git check-ignore -v bench/paired/_build/product.mjs`⟩ → `.gitignore:12:_*`).
3. **(b) The instrument promoted**, commit `1c7b67f0`: `bench/paired/{common,build,bench,isolated,clean,sheets}.mjs` beside `bench/css-parse.bench.ts` (whose header now names `bench/paired/` the bench of record and itself context; the quiesced-load sentence retires, R-3). Rules as specified: one fresh process per cell (`isolated.mjs` → `bench.mjs`), the retired parser in the same process, ≥ 11 rounds (enforced: `isolated.mjs` throws below 3 reps × 11 rounds), gc before every pass, 2 warm-ups, `uptime` before/after every cell, ratio = median of per-round paired ratios with median/median and min/min beside it, the arm list reversed on odd reps and the entry order rotated per rep, a cell whose retired passes spread ≥ 1.6× set aside, re-run (≤ 3 re-runs per position), kept in the record and counted. Load is recorded, never gated (the `quiesceRule` retires). **One recorded deviation from the judge's text:** with two arms, the judge's "rotate every round, reverse on odd rounds" cancels (every round reads retired first); `bench.mjs` flips the order every full rotation instead, so the two arms alternate first/second (r0 R·P, r1 P·R, r2 P·R, r3 R·P …). The judge ran ≥ 5 arms, where the rule does not cancel.
4. **(c) Split cells** (critic `split-rep.mjs` idiom), in `bench.mjs`: `acc`/`rej` = the sources the retired parser accepts/refuses, per entry (parseStylesheet included); the repetition count k doubles until the retired pass takes ≥ 20 ms (G-acc/rej), applied to every class (e.g. the 56 accepted keyframe selectors ran at k = 1024–2048; parseTimingFunction's 509 at k = 32).
5. **(d) The G-large cell**, `sheets.mjs` → `bench/paired/sheets/` + `MANIFEST.json` (sha256): `value-js-index.css` 523,625 B (`a8d3a05e…`, value.js gh-pages build) · `keyframes-js-index.css` 573,524 B (`1c927be9…`, keyframes.js `e11db5a1`) · `keyframes-js-vendor-monaco.css` 74,442 B · `wpt-bulma-0.7.5.css` 225,289 B (WPT `tools/wave/www/css/bulma-0.7.5/bulma.css` at `84daed4a`). **Drift, recorded:** the two named built sheets exceed G-large's 500 KB by 5% and 15%; the source named by G-large ("value.js's and keyframes' built CSS") governs, so they stay whole. `glass-fonts-*.css` (4 base64 `@font-face` rules) is not a stylesheet workload and is left out. **Finding for `.v`:** both parsers REFUSE all four sheets (value.js at offset 199,077 `{.\@container\/aspect-ratio…`; the others at their first unsupported value), so the cell times the refusal path today; it is recorded, not gated.
6. **(a) The golden oracle frozen**, commit `1bd030b0`: `bench/paired/oracle.mjs` → `bench/paired/oracle/golden.ndjson.gz` (16.5 MB gz; 166,208,266 B NDJSON, 1,401,698 rows) + `golden.sha256` = `8f6ed13f564422c914caadb95ef5c145469bc3a2ae60b11111d769ee8aa1ad6e`. The canonical form is isDeepStrictEqual's relation written out (sorted own keys, prototype named, undefined / NaN / ±Infinity / −0 tagged, Map/Set in order, a throw as its message). Sections:
   - `entry:*` 7 × 29,944;
   - `reader:*` the 19 reader calls (15 exported `sheet.ts` readers, `timelineArgs` × scroll|view, `splitTopLevel` × `,` `;` `space`) over the 29,944 sources AND over the reader-shaped corpus;
   - `harvest`: the reader-shaped corpus, **25,167 distinct argument lists** recorded by the `recorder` arm (an esbuild resolve-plugin that wraps the reader imports of `src/css/*`, bench-side only, nothing in `src/` touched) while `parseStylesheet` + the `collect*` walks ran over the real corpus (3,049), keyframes.js's 65 frozen sheets and the 4 G-large sheets, and `parseAnimation{Timeline,Range}` ran over the real corpus (the timeline readers are reached from those entries, not from a sheet). Per reader: ruleList 3,301 · splitTopLevel `,` 4,038 · `;` 930 · `space` 2,884 · timelineArgs scroll 3,035 · view 3,034 · isDashedIdent 3,030 · isTimelineLength 2,653 · declaration 1,154 · atPrelude 1,050 · emptyListComma 40 · isPropertyName 7 · syntaxComponents 4 · syntaxText 4 · functionHead 1 · functionParam 1 · paramHead 1; **opensTimeline 0 and scopePrelude 0** (no real sheet reaches them; both stay covered by their 29,944 corpus rows);
   - `public:*` `coerceToSyntax` over the corpus × 19 syntaxes (16 fixed + the 3 harvested `syntaxComponents` arguments not already in the set; an answer equal to `parseCssValue`'s is written `{ $same }`, losslessly), `parseAnimationRange`, `parseAnimationTimeline`;
   - `collect:*` `parseStylesheet` on every real sheet, then `collect{Keyframes,PropertyDescriptors,CustomFunctions,StyleRules}` per accepted sheet and `collect{Declarations,AnimationOptions,TimelineOptions}` per declaration list.
   `bench/paired/equiv.mjs <arm>` compares an arm row by row with the frozen oracle over its frozen inputs (never re-harvested) and classes each mismatch by `nonAscii`.
   ⟨`node bench/paired/equiv.mjs product`⟩ → `compared 1376531/1376531 rows · mismatches 0`. ⟨`node bench/paired/equiv.mjs banked:stock`⟩ → `compared 786051/1358871 rows · mismatches 0` (the judge's banked stock bundle, entry + reader rows, on the first freeze): the product IS the judge's stock.
7. **(a) F-b-4 enumerated**, `bench/paired/fb4.mjs` → `bench/paired/oracle/F-b-4.json` (commit `1bd030b0`), then DIVERGENCE-LEDGER **§16** appended, dated, append-only (commit `9da28444`; ⟨`git diff -U0 -- DIVERGENCE-LEDGER.md | grep -c '^-[^-]'`⟩ → `0`). The class is defined by difference so it cannot absorb anything else: `banked:jx-aot-pos-sa` (the ASCII-only dispatch emulation) must reproduce the oracle (read: `mismatches 0`), and every `banked:jx-aot-pos` (sound routing) mismatch must be on a non-ASCII source (read: `ASCII-only sources 0`). ⟨`node bench/paired/fb4.mjs`⟩ → `F-b-4: 88 rows = 8 entry + 80 reader`. Over the 29,944 sources that is **exactly the spec's 8 + 62** (functionParam 11 · splitTopLevel `,` 11 · `;` 11 · `space` 29); the reader-shaped corpus adds 18 reader rows of the same class (splitTopLevel `,` 2 · `space` 16), each the trimmed/split form of an already-rowed source. On the 8 entry rows the retired parser names the same single component as the sound parser (rows 4, 8 agree whole: the spec's "one more source agrees with the retired parser"; rows 1–3, 5–7 differ only in the relative vs absolute span).
8. **(e) The two 7/7 gates minted and read on the product**, double-run, commit `2bf1b352` (`bench/records/2026-09-23-x-p-w7-o-product{,-r2}.json`, every cell with its `uptime` lines and raw passes). ⟨`node bench/paired/isolated.mjs o-product product 3 11`⟩ and ⟨`… o-product-r2 …`⟩ → clean-cell medians, product/retired (clean cells / set aside):

| class | run | Color | Scalar | Value | Values | KeyframeSel | Timing | Stylesheet |
|---|---|---|---|---|---|---|---|---|
| whole | 1 | 1.849 (3/3) | 1.563 (3/0) | 2.435 (3/0) | 2.341 (2/9) | 1.389 (3/2) | 1.428 (3/0) | 6.404 (2/5) |
| whole | 2 | 1.839 (3/1) | 1.461 (3/1) | 2.578 (2/5) | 2.350 (3/0) | 1.441 (3/2) | 1.326 (3/0) | 5.733 (3/1) |
| acc | 1 | 1.727 (2/5) | 1.703 (3/2) | 1.490 (1/10) | 1.550 (1/8) | 2.032 (2/7) | 1.424 (3/0) | 3.941 (2/5) |
| acc | 2 | 1.502 (3/1) | 1.516 (3/0) | 1.469 (3/4) | 1.485 (3/1) | 2.044 (3/0) | 1.325 (3/0) | 3.667 (3/0) |
| rej | 1 | 1.930 | 1.523 | 3.264 | 3.174 | 1.354 | 1.308 | 7.212 |
| rej | 2 | 2.004 | 1.594 | 2.667 | 2.804 | 1.442 | 1.413 | 7.040 |
| large | 1 / 2 | | | | | | | 2.360 / 2.144 |

Load: run 1 `37.05 38.75 40.50` → `40.04 39.13 39.97`; run 2 `30.99 36.21 38.75` → `29.50 34.54 37.09`. Set aside and counted: 70 of 126 cells (run 1), 46 of 106 (run 2). The accepted keyframe selectors read 2.03/2.04 (the critic's stock 2.13), the falsifier `.k` owns.

**Gates, BEFORE → AFTER.**
- **O-1** fixture regenerates byte-identically: absent → **GREEN** ×2. ⟨`node bench/paired/oracle.mjs check`⟩ ×2 → `O-1 GREEN regenerated 8f6ed13f… · stored 8f6ed13f… · pinned 8f6ed13f… · 1401698 rows`.
- **O-2** stock/retired ≥ 1.3 on all 7 and ≥ 4 on parseStylesheet: no instrument → **HOLDS** ×2 (whole medians min 1.389 / 1.326 on KeyframeSel / Timing; parseStylesheet 6.404 / 5.733). The instrument reproduces the record (`2026-09-23-x-p-w6-x.json` 1.11–2.79×, the judge's 1.34–2.42× and 6.06×).
- **O-3** both 7/7 gates RED on the product: unminted → **RED as required** ×2: whole-7/7 `0/7 RED`, accepted-7/7 `0/7 RED` (the rejected halves `RED`, recorded for G-acc/rej).
- **O-4** nothing under `src/`: ⟨`git show --stat --format= 1c7b67f0 1bd030b0 9da28444 2bf1b352 -- src/ | wc -l`⟩ → `0`; ⟨`git status --porcelain -- src/ | wc -l`⟩ → `0`. **GREEN.**

**Residuals (honest, for later seats).**
- **R-o-1 set-aside pressure.** At host load 30–40, the 1.6× spread rule set aside 37–56% of cells, and some positions used all 3 re-runs without a clean reading (run 1 acc Value/Values: 1 clean cell). A later gate reading "every cell below 1.00" reads over clean cells only and reports the count; a seat needing 3 clean cells per entry re-runs `isolated.mjs` (a new tag) rather than loosening the rule. `clean.mjs <record> <spread>` re-reads a record at another bound without rewriting it.
- **R-o-2 oracle-bound reader names.** `equiv.mjs` binds the 15 exported readers of `src/css/bbnf/sheet.ts` and `splitTopLevel` from `src/css/bbnf/index.ts` by name. `.v` keeps them callable, or maps them in `bench/paired/common.mjs`; a reader that moves is a `$throw` mismatch, never a silent pass.
- **R-o-3 the G-large cell reads refusals** (act 5): every sheet is refused by both parsers today.
- **R-o-4 harvest gaps:** `opensTimeline` and `scopePrelude` receive no argument from any real sheet (act 6); corpus rows only.

**Adjacent edits:** none. **Escalations:** none. **Commits:** `1c7b67f0` (instrument + sheets + bench header) · `1bd030b0` (oracle + equiv + F-b-4 rows) · `9da28444` (DIVERGENCE-LEDGER §16) · `2bf1b352` (bench records ×2) · this receipt.

### .p

**Seat:** `claude-opus-5-5`, 2026-09-23 21:00–21:14 EDT. **Status: PARTIAL** — every cure, law and measurement landed and pushed; P-6's publish is walled by npm `EOTP` (a one-time password), an owner act (ESC-W7p-1 below).

**Open.** ⟨`git -C ../parse-that worktree list`⟩ → no `x-p-w7` worktree; ⟨`git worktree add ../parse-that-x-p-w7 -b x-p-w7 cb9c0d4`⟩ → `HEAD is now at cb9c0d4`. Crash-recovery: fresh worktree, **no inherited partial work**. value.js record clean. G-T read: parse-that `docs/tranches/T/T.md` (89 lines) and `T/README.md` (73) whole; `VALUE-VNEXT-COORDINATION.md` §§"Two tracks", "Reconciliation checkpoints", "Required return packet"; `U/U.md` head + `U/waves/W7.md`. (T/U are untracked on master: read-only, never written.) Test data: `data/` is gitignored and absent from a fresh worktree (first `npm test` 4 files ENOENT); ⟨`cp -Rc ../parse-that/data ../parse-that-x-p-w7/data`⟩ (APFS clone, ignored, tree stays clean) → `14 passed`, `132 passed | 2 skipped`.

**Anchors at true bytes (cb9c0d4).** `parser.ts:193 const oldView = Object.create(state);` · `parser.ts:67 console.error(errorState.toString());` (gated by `isDiagnosticsEnabled`, but `parseStateInner` built an `errorState` on every failure regardless) · `utils.ts:34-35 state.suggestions = []; state.secondarySpans = [];` on every new-furthest failure (the diagnostics-off allocation) · `leaf.ts:245 if (state.offset >= state.src.length) { … isError = true }` before the pattern ran (F-p-EOF). All as the spec states; no drift.

**Acts, in order.**
1. `99d8f8e` bench — the Parser-core paired instrument `typescript/test/benchmarks/paired/{entries,cell,run}.mjs`: both arms (candidate `dist/parse.js`, published 0.8.2 `dist/parse.js` installed to scratchpad) in one fresh `node --expose-gc` process per cell; gc before every pass; pass sized ≥20 ms on 0.8.2; 11 rounds, order alternating and reversed between 3 reps; `loadavg` before/after each cell; median of per-round ratios + min/min; 0.8.2 spread ≥1.6× set aside (≤4 attempts) and counted; same-product check (verdict, and value on success). 7 entries: json · sequence · choice · reject · recursion · recovery · span (2.x `mapSpan` vs 0.8.2 `mapState`).
2. `41575eb` refactor! (a) `mapSpan((value, start, end) => …)` replaces `mapState`; no alias; `parserNames` `"mapState"`→`"mapSpan"`.
3. `1168bc2` fix! (b) `parseStateInner` no longer builds an error state nor calls `console.error`; `mergeErrorState` allocates the expected/suggestion/span arrays only while diagnostics are enabled.
4. `659d24d` fix (c) `regex()` runs its sticky pattern at EOF (the early-fail branch removed).
5. `8544424` docs (e) `all()` JSDoc = the 2.x positional contract + law test.
6. (d) built `selfPatchingLazy` (Parser.lazy + `@lazy` patch their own `parser` on first resolution, guard kept), measured paired against the cures: **regressed** json (1.037 · 1.046) → withdrawn before commit; recorded in CHANGELOG/addendum.
7. (f) measured, **kept** (P-5 below); no revert commit.
8. `4940e85` CHANGELOG 2.0.0 (first publication; the two old 2.0.0/Unreleased headings retitled "Pre-release history of 2.0.0"). `96e68e9` dated addendum `docs/x-p-w7-2026-09-23-addendum.md` (G-T mapping, P-5 tables, T checkpoints, U.W7 + VALUEJS-PT-E retired, T/U value.js rows, ten defect families).
9. ⟨`git push -u origin x-p-w7`⟩ → `* [new branch] x-p-w7 -> x-p-w7`.
10. ⟨`npm whoami`⟩ → `mkbabb`; ⟨`git status --porcelain | wc -l`⟩ → `0`; `tsc --noEmit` 0; build GREEN; ⟨`npm publish --access public`⟩ → `npm error code EOTP` / `This operation requires a one-time password.` ⟨`npm view @mkbabb/parse-that versions`⟩ tail → `0.13.0, 1.0.0` (2.0.0 NOT published).

Per-meaning commits were cut by re-applying each cure's hunks onto a clean working tree and running `tsc` + `npm test` before each commit (138 → 140 → 142 → 143 passed); ⟨`diff <(git diff cb9c0d4 HEAD -- typescript/src) <measured patch>`⟩ → identical; ⟨`cmp` of every rebuilt `dist/*.js` against the measured build⟩ → 0 differ.

**Gates, BEFORE → AFTER.**
- **P-1** GREEN. BEFORE: `cb9c0d4` has no `mapSpan` (the law file on `cb9c0d4`'s source → `TypeError: term.mapSpan is not a function`); the old `mapState` on published 0.8.2 ⟨`node --allow-natives-syntax falsify-p1.mjs`⟩ → `old mapState: HaveSameMap = false`. AFTER: `x-p-w7-cures.test.ts` "P-1" 4/4 (badTerm shape, spanned shape in a sequence, uncalled on failure, `mapState` absent), `%HaveSameMap(state, new ParserState("x"))` true (via `v8.setFlagsFromString("--allow-natives-syntax")`).
- **P-2** GREEN. BEFORE: identity law on `cb9c0d4` source → `× P-2 identity`. AFTER: diagnostics off: 0 console bytes (console.* + stdout/stderr `write` spied), `expected` undefined, `suggestions`/`secondarySpans`/`diagnostics` identities unchanged and empty; diagnostics on: 0 console bytes, `expected` `['","', '")"']` on the state.
- **P-3** GREEN. BEFORE: `× P-3 eof` on `cb9c0d4`. AFTER: `/\s*/` on `""` → ok, offset 0, value = the mid-input empty-match value (`undefined`); `all("abc", /\s*/)` on `"abc"` → ok offset 3; `whitespace` and `/a?/` at EOF ok; `/[a-z]+/` at EOF still fails `[true, 0, 0]`.
- **P-4** GREEN in the ruled reading (the baseline row's own reading). ⟨`npm test`⟩ ×2 → `Test Files 15 passed (15)` · `Tests 143 passed (143)` (BEFORE 134). ⟨`npm run proof:all`⟩ ×2 → manifest, subpath, 4 packrat, no-span, no-dead-combinator, no-css-surface GREEN; `proof:perf` (A) (B') pass, (C) unpaired ns/parse vs the checked-in 1,742 ns → `+104%`/`+70%`-class RED at load 25.6–28.0 (3,56x / 2,97x ns) — the same PT-PERF-LOAD RED as BEFORE (W6R, and at this seat's open: 2,623 ns at load 31). §0ci R-3 retires it into P-5. Rewriting clause (C) as a paired ratio is `typescript/scripts/**`, outside this unit's set and beyond the adjacent-line rule (it would retire an assertion): residual R-p-1.
- **P-5** GREEN ×2. HEAD `cb9c0d4` + cures vs 0.8.2, median / worst kept cell (3 cells each), run 1 · run 2: json .921/.933 · .904/.906; sequence .929/.941 · .936/.965; choice .651/.656 · .657/.659; reject .076/.077 · .074/.074 (2 kept); recursion .778/.781 · .790/.794; recovery .837/.845 · .838/.874; span .144/.149 · .144/.151. Set aside 3 · 6 (all on 0.8.2's spread; run 2's one `reject` cell spread in all 4 attempts). Load 1-min per cell 16.1–17.1. Mismatches 0. **§0ck 6: every entry ≤ 1.00 in every kept cell twice → `90d4ec5` KEPT** (no revert commit). (A preliminary 3-round smoke read json 1.53: a 3-round noise reading, superseded by the 11-round cells; a first 6-entry 3×11 reading also read all ≤1.00: json .900, recursion .794.)
- **P-6** RED at the publish step only: `npm whoami` = `mkbabb` ✓, clean tree ✓, release gate ✓ (package checklist: `tsc` 0, `npm test` 143/143, build; T checkpoints 1–5 in the addendum: re-pin, operation census, coordinates, packed crater `mkbabb-parse-that-2.0.0.tgz` sha256 `cbfc74e3…f926` 65 files → isolated install, ESM probe 5/5 value-shaped declarations + `/\s*/` at EOF + 0 console bytes + `mapState` undefined, declaration probe `tsc --strict` NodeNext GREEN; versioned return = the addendum); `npm publish` → **EOTP**.

**Adjacent edits:** none. **Out-of-set writes:** none (the `data/` clone is a gitignored fixture copy in the worktree; scratchpad holds the 0.8.2 install, the builds, the crater and the raw bench JSON `p5-A-run{1,2}.json`, `p5-DvA-run{1,2}.json`).

**Residuals.**
- **ESC-W7p-1 (owner act):** `npm publish` of `@mkbabb/parse-that@2.0.0` requires a one-time password (`EOTP`). The branch is pushed and clean at `96e68e9`; the next seat (or the owner) runs from `../parse-that-x-p-w7/typescript`: `npm whoami && git status --porcelain && npm run build && npm publish --access public --otp=<code>`. `.t` needs 2.0.0 on the registry to pin `^2` (L-1 lets it link `.p`'s worktree until then).
- **R-p-1:** `proof:perf` clause (C) is still an unpaired absolute; parse-that's own program should restate it on the paired instrument (`test/benchmarks/paired/`), per §0ci R-3.
- **For `.t` (value-semantics spec):** regex at EOF behaves exactly as mid-input; an empty match's value is `undefined` at every offset (not `''`).

### .t

**Seat:** `claude-opus-5-5`, 2026-09-23 21:14–21:42 EDT. **Status: DONE** (T-1..T-6 GREEN, double-run); one release-side residual rides `.e` (R-t-1: the lockfile regenerates once parse-that 2.0.0 is on the registry, ESC-W7p-1).

**Open.** Spec W7.md read whole (190 lines, incl. the binding §0ck addendum); this record's header through the Unit plan, and `.o`/`.p` receipts; COHESION §0ci and §0ck (the last addenda bearing on `.t`; §0cl is Track C). Crash-recovery: ⟨`git -C ../bbnf-lang worktree list`⟩ → no `x-p-w7-typescript` worktree or branch; **no inherited partial work**. ⟨`git -C ../bbnf-lang worktree add ../bbnf-lang-x-p-w7-typescript -b x-p-w7-typescript origin/master`⟩ → `HEAD is now at d2b32f6e3`. Local master untouched throughout: ⟨`git -C ../bbnf-lang rev-parse --short master`⟩ → `af15f63e0` at open and close. parse-that 2.0.0 is not on the registry (⟨`npm view @mkbabb/parse-that@2.0.0 version`⟩ → `404`, ESC-W7p-1), so per L-1 the package links `.p`'s worktree: `typescript/node_modules/@mkbabb/parse-that` → `../parse-that-x-p-w7/typescript` (`96e68e9`, version 2.0.0; node_modules is untracked). The gitignored `data/` was cloned from the main checkout (`cp -Rc`), as `.p` did.

**Anchors at true bytes.** ⟨`git ls-tree -r --name-only e91428ce1 typescript/`⟩ → 32 paths; the research vendor copy `route-ts-compiler/vendor/bbnf-0.1.4` is `cmp`-identical to all 19 source files (the survey's byte-identity to published 0.1.4 stands). ⟨`git diff e91428ce1 c14832a3a^ -- typescript/test/ | grep '^[-+]' | grep -v 'grammar/'`⟩ → only path lines: the `c14832a3a^` tests are `e91428ce1`'s with the grammar paths renamed to the per-language layout. **Drift (recorded, INTENT kept):** the repo's `grammar/` tree had already moved to the Rust dialect at `c14832a3a^` (`null = "null" -> 0u8`, `-> decode_json_string_to_arena(input) : String`), which the TS front end never parsed; ⟨`vitest run` on 0.8.2 against the repo's `grammar/`⟩ → `18 failed | 99 passed` (and `data/` is gitignored). The source's own dialect is `e91428ce1`'s tree (⟨grep of `-> `/`: String` over its 20 `.bbnf`⟩ → 0 each), so the tests read checked-in fixtures of it.

**Acts, in order (bbnf-lang `x-p-w7-typescript`, all under `typescript/`).**
1. `48d5fba61` chore — `typescript/` from `e91428ce1`, tests from `c14832a3a^`, verbatim (32 files).
2. `0999cb8c3` test — fixtures `test/fixtures/` (e91428ce1's `grammar/css`, `grammar/lang`, `grammar/tests/css`; `data/json/data.json`, 35,491 B); test paths repointed, bodies unchanged. On 0.8.2: `117 passed (117)`.
3. `da0c0b892` refactor! — port to parse-that 2.x: `mapState` → `mapSpan((value, start, end) => …)` (the AST range stamp); `memoize`/`mergeMemos` as functions; the excised `regexSpan` leaves with the dead `discarded` flag it served; recovery diagnostics read from `parseState(...).diagnostics` (the module-global get/clear is gone, CHANGELOG 2.0.0). One restored test was **vacuous on 0.8.2**: the BBNF self-parse loop rejoined tokens with `join("")`, yielding `@prettyrulegroup` (not BBNF); 0.8.2's `parse()` returned the partial value of the failed parse, 2.x returns none. The rejoin now uses a separator (assertion unchanged); ⟨probe⟩ → 10/10 iterations parse (`isError` false each). `package.json` dep `^0.8.2` → `^2.0.0`.
4. `763aa6534` fix! — **F-b-1**: `src/posix-path.ts` (resolve/dirname/extname, no cwd); `imports-loader.ts` imports it instead of `node:path`/`node:fs`; the host's reader is **required** (`loadModuleGraphSync`, `loadModuleGraph`, `BBNFToParserFromFile`); `grammarFromModules(files, entry)` in `imports.ts`; tests pass the node reader. `test/modules.test.ts` (posix-path cases, no `src/` module imports a node builtin, files-map merge, missing module = `FileNotFound`).
5. `1df11b11e` test — **T-2** fixtures `test/fixtures/value-js/`: value.js `3fcfe248c2` `src/css/grammar/*.bbnf` with the `@import` headers `.v` will add (math←tokens; color←tokens,math; value←tokens,math,color; stylesheet←tokens), an entry `css.bbnf`, and `ast-0.1.4.json` frozen from the **published** 0.1.4 dist over the concatenation by `freeze-ast-0.1.4.mjs` (sha256 of each source recorded; regenerated byte-identically, ⟨`cmp`⟩ → identical). `test/value-js-modules.test.ts`: deep-equal + each module's header alone makes every referenced rule visible (falsified by deleting math's header → `1 failed`).
6. `0b33396b3` test — `modules.test.ts` narrows `ImportError` before reading `path` (tsc 0).
7. `a7a48473a` fix! — **F-b-3 + F-b-4 at the root, one analysis.** `src/analysis/regex.ts` + `first.ts` = route-ts-compiler's `src/regex.ts` + `src/analysis.ts` (provenance lines kept), adapted at two bytes: a regex leaf's `eofOk` = its `nullable` (parse-that 2.x runs a regex at EOF, `.p` (c)); `?w` (`optionalWhitespace`, absent from the route's switch) read as parse-that `trim` (first ∪ {9–13, 32}, facts of the inner). The route's `stockNa` hook (stock-ASCII reproduction) is **not** carried: §0ck 1 forbids shipping it (`.e` builds its test variant). A rule the grammar leaves to the host (the left-recursion test supplies `integer`, `vibes`, …) is read as unknown (full set, nullable, eofOk) instead of the route's throw. 0.1.4's `charset.ts`/`regex-first.ts`/`first-sets.ts`/`dispatch.ts` are deleted; `generate.ts`'s perfect + partial dispatch becomes one `routes()` switch (ASCII table, non-ASCII route, EOF route; groups in original order). `CharSet` keeps the set algebra 0.1.4 exported (`intersection`, `len`, iterator …); `findFirstSetConflicts` is rebuilt on the analysis. The restored first-set/dispatch tests are **ported, count kept** (analysis 22→22, first-sets 17→17): same scenarios, sound expectations where 0.1.4's answer was the defect (`/./` → every unit but `\n`/`\r` + non-ASCII, not `null`; a nullable alternative routed in its ordered place, not a fallback; no 3-alternative minimum). `test/first.test.ts`: `/i` both cases, `/iu` K/ſ fold, `\u`/`\x`/`\u{…}` escapes, zero-width lookarounds and anchors, non-ASCII bit, nullability, EOF route, fixpoint, host-rule — and T-4.
8. `202dcf046` feat! — **the value-semantics spec** `typescript/VALUE-SEMANTICS.md` (one table of laws binding runtime `compile()`, the emitted module and the façade; "routing never changes an answer"; changes from 0.1.4) and **the conformance corpus** `test/conformance/`: `semantics.json` 29 hand-stated cases (positional concatenation ×4, `opt`→`undefined` ×2, `many` no-progress stop ×6, `minus` excluded-first ×3, `>>`/`<<` ×3, regex at EOF ×4, ordered choice + routing ×5, ε, `?w`); `grammars.json` 35 cases of bbnf-lang's own grammars (json incl. data.json, math, csv, regex, css color/value-unit/keyframes/selectors, google-sheets, the BBNF self-grammar), frozen by `freeze-grammars.ts` (⟨regenerate + `cmp`⟩ → identical); `test/conformance.test.ts` runs both through runtime compile. **Positional, decision 2:** `generate.ts`'s 2-element concatenation fast path still dropped `undefined` (0.1.4) while n ≥ 3 went positional through 2.x `all()`: now positional; the left-recursion test's host action destructures the positional tail. **Read against the pre-cure source** (0.1.4 on 0.8.2, via vite-node over `0999cb8c3`'s `src`): ok/end differ on **1 of 35** — `lang/math.bbnf expr "(1+2)*3"`: 0.1.4 routed `(` past the nullable `number` alternative (end 7); the ordered choice answers the empty `number` (end 0). Rowed as law case `alt-nullable-first`.
9. `08acb9575` test — the google-sheets bench's `console.error` silencing around failing parses leaves (parse-that 2.x never writes; ⟨`vitest bench --run test/benchmarks`⟩ → 3/3 ✓). (e): ⟨`grep -rn "console\.\|process\.stdout\|process\.stderr" src`⟩ → 0.
10. `b35836fec` docs — `typescript/CLAUDE.md` package map; the SERVED MODEL line on `posix-path.ts` and `modules.test.ts`.
11. ⟨`git push -u origin x-p-w7-typescript`⟩ → `* [new branch] x-p-w7-typescript -> x-p-w7-typescript`.

**Gates, BEFORE → AFTER (AFTER read twice on the settled bytes).**
- **T-1** restored tests on parse-that 2.x. BEFORE (restored, linked to 2.x, at `0999cb8c3`): `48 failed | 53 passed (101)` + 1 file failing to load (`mapState is not a function`, `regexSpan`/`getCollectedDiagnostics` absent). AFTER ⟨`npx vitest run`⟩ ×2 → `Test Files 12 passed (12)` · `Tests 201 passed (201)` (⟨`vitest run --reporter=verbose` per-file ✓ counts⟩: the 117 restored — analysis 22 · bbnf 17 · css-stylesheet 11 · first-sets 17 · google-sheets 16 · imports 13 · optimize 13 · recover 8 — + 84 added: conformance 64 · first 13 · modules 5 · value-js-modules 2); ⟨`npx tsc --noEmit -p .`⟩ → 0. **GREEN.**
- **T-2** five modules via `@import` = 0.1.4's AST on their concatenation. BEFORE: no `@import` path (0.1.4's loader is `node:path`-bound; the published dist's `BBNFToParserFromFile` throws `(void 0) is not a function` at `loadModuleGraphSync`). AFTER `value-js-modules.test.ts` ×2 → `160` rules, `toEqual` the frozen 0.1.4 AST. **GREEN.**
- **T-3** browser build 0 `node:` imports. BEFORE ⟨`esbuild src/index.ts --bundle --platform=browser --external:@mkbabb/parse-that`⟩ over `da0c0b892` → `Could not resolve "node:path"` · `Could not resolve "node:fs"` (2 errors). AFTER ×2 → 0 errors; ⟨`grep -cE "[\"']node:" dist/bbnf.js dist/bbnf.cjs <esbuild bundle>`⟩ → `0` each (a bare `grep -c node:` reads 1: the object key `node: atom` in `regex.ts`, not an import). **GREEN.**
- **T-4** FIRST-set brute force over every grammar regex. ⟨`first.test.ts` + scratch `t4-before.ts`⟩: `110` regex leaves; 139 probe units (128 ASCII + é — NBSP BOM U+2028/9 K ſ an astral lead ß ü) × 27 tails → `70,864` non-empty matches checked (+ every empty match against `nullable`, + EOF). BEFORE (0.1.4 `regexFirstChars`, `null` read as all-ASCII) → `12,799` misses on `25` regexes. AFTER ×2 → `0`. **GREEN.**
- **T-5** stripping the 117 spellings. Instrument: scratch `t5.ts` — the judge's `stripCaseWorkaround` verbatim (⟨count⟩ → `117` stripped, 6 case-pair classes remain, all in non-`/i` regexes), over the bench of record's `29,944` sources (value.js `bench/css-equivalence` assay ∪ real), whole-input (value.js `load.ts` `run()`), 17 rules (the 5 entry rules + `ruleList` + the 9 `sheet.ts` reader rules + `commaItems`/`semiItems`/`spaceItems`); **raw grammar values (no value.js actions: those are `.v`'s, on the positional semantics).** (A) this package, stripped vs original grammar: `0` differences in ok · value · furthest on all 17 × 29,944, ×2. (B) this package stripped vs the published 0.1.4 on 0.8.2, original grammar: verdict differences `67`, `0` on ASCII-only sources, ×2 identical; against `bench/paired/oracle/F-b-4.json`: functionParam 11 = 11, splitTopLevel `,` 11 = 11, `;` 11 = 11, space 29 = 29 (**the 62 reader rows, identical key sets**); valueTop differs on the **4 enumerated entry sources** (27664, 28730, 29015, 29943 → the 8 entry rows) **+ source 1064 `🎨ff0099cc`**, which is accepted raw only through `badTerm` (⟨override `badTerm` to refuse before first parse⟩ → refused), the arm value.js's action answers as a refusal — which is why `.o`'s entry-level enumeration (and the judge's `jx-aot-pos`) has no row for it. Furthest positions are not compared across parse-that 0.8.2 → 2.x (their bookkeeping differs on ASCII sources too; the entry-level diagnostics comparison is `.v`'s V-1 on the oracle). **GREEN** at the raw-grammar reading, with 1064 recorded.
- **T-6** ⟨`git diff --name-only origin/master...x-p-w7-typescript | grep -vc '^typescript/'`⟩ ×2 → `0`; ⟨`git diff --stat origin/master...x-p-w7-typescript | tail -1`⟩ → `68 files changed, 10221 insertions(+)`. **GREEN.**

**Adjacent edits:** none. **Out-of-set writes:** none (the `data/` clone and `node_modules` link are untracked/ignored in the worktree; scratchpad holds the probes, `t5.ts`, `t5-run{1,2}.json`, `t4-before.ts`, the 0.8.2 install and the pre-cure source copies).

**Residuals.**
- **R-t-1 (for `.e`, after ESC-W7p-1):** `typescript/package-lock.json` is still `e91428ce1`'s (it was already out of sync there: `@mkbabb/parse-that@0.6.0` against `^0.8.2`, so `npm ci` refused before this unit too). It regenerates with `npm install` once 2.0.0 is on the registry; until then the package runs on the L-1 link. Version stays `0.1.4` in `package.json` until `.e`'s 0.2.0 (E-8).
- **R-t-2 (for `.e`):** runtime `compile()` still resolves nonterminals lazily so a host may replace a rule after generation; routing uses the grammar's facts for the rule as written. §0ck/`.v` retire late `rules[name]` mutation; the emitted module binds actions instead.
- **R-t-3 (for `.v`):** `semantics.json`'s regex-at-EOF and empty-match cases fix an empty regex match's value as `undefined` (parse-that 2.x), not `''`.

**Commits (bbnf-lang, pushed):** `48d5fba61` · `0999cb8c3` · `da0c0b892` · `763aa6534` · `1df11b11e` · `0b33396b3` · `a7a48473a` · `202dcf046` · `08acb9575` · `b35836fec`; this receipt (value.js).

### .e

**Seat:** `claude-opus-5-5`, 2026-09-24 00:31–01:05 EDT (a RESUME of a killed predecessor seat). **Status: PARTIAL.** E-1..E-6 GREEN (double-run). E-7: the depth half is GREEN on V8 and WebKit; the fault-cost half is GREEN on per-entry medians, but per-cell ≤1.02 is below the instrument's noise floor at load 22–37; the "still below retired" half can only be read with value.js's positional actions, so it rides `.v` V-3. E-8 is ESCALATED: parse-that 2.0.0 is still not on the registry (ESC-W7p-1), so a 0.2.0 on `^2` cannot be installed.

**Open.** I read the spec whole (190 lines, incl. the §0ck addendum). From this record I read the header through the Unit plan, the `.t` receipt, and `.p`'s ESC-W7p-1 lines (by grep). I read COHESION §0ck, and §0cl by grep (Track C only, no W7 row).

**Crash recovery.** ⟨`git status --porcelain`⟩ in `../bbnf-lang-x-p-w7-typescript` → ` M typescript/src/emit.ts` · ` M typescript/test/conformance.test.ts`. ⟨`git log`⟩ → two unpushed commits from the killed `.e` seat: `79330801c` (the one emitter; compile/façade on it) and `a02e71936` (`bbnf gen` + `--check`). Its scratch was `scratchpad/e/` (e123.ts, depth probes, fault cells).
- The **inherited diff**: `DEFAULT_MAX_DEPTH` 1000 → 256, with a measured-throw-point comment, and an E-1 block in `conformance.test.ts`. I read both hunks whole and judged them against the spec. Both conform, and I committed them after re-measuring (acts 1–2).
- The **inherited commits**: I read both commit bodies and `src/emit.ts`, `gen.ts` and `gen.test.ts` whole. They carry spec (a)–(d): route-ts-compiler's `src/emit.ts` ported onto `.t`'s one analysis as the only emitter, `RULE_NAMES`/`ENTRY_NAMES`/`ACTION_KINDS`/`FAIL`, a typed `Actions`, entries returning value | FAIL, and `sha256(grammar ⊕ emitter)`.
- Inherited paths: `typescript/src/{emit,compile,facade,generate,gen,cli,index,raw.d}.ts`, `typescript/{package.json,vite.config.ts}`, `typescript/test/{bbnf,conformance,recover,gen,modules}.test.ts`, `typescript/test/conformance/grammars.addendum-2026-09-23.json`.
- Local bbnf-lang master was untouched: ⟨`git -C ../bbnf-lang rev-parse --short master`⟩ → `af15f63e0`.

**Anchors at true bytes.**
- (i) Spec (e) says to set the fixed depth *"below the smallest engine's measured throw point … JSC's stack is the smaller"*. **Drift:** measured, JSC is the larger (WebKit 26.4 throws at 4,970–5,047 back-edges; V8 at 881–934). I kept the INTENT, "below the smallest engine": the limit sits under V8's throw point.
- (ii) Spec (d) says `BBNFToParser` survives as a façade (`toParser`). It holds at the bytes (`src/facade.ts`, `src/generate.ts:50`).
- (iii) The spec's gate says the stock-ASCII switch "stays as a test", and §0ck 1 says it is never reproduced. The reading taken: the shipping emitter gains only an evidence-only `nonAsciiRoute` hook, the same kind of evidence-only option as the existing `audit`. 0.1.4's dispatch lives in `test/helpers/` alone.

**Acts, in order (bbnf-lang `x-p-w7-typescript`, all under `typescript/`).** The predecessor's `79330801c` and `a02e71936` are inherited; they are listed in Crash recovery above.
1. `68e1ea7ea` fix: the depth fault trips at 256 back-edges (inherited hunk). Depth probe (scratch `e2/depth-{node,browser,all}.mjs`: 13 nesting shapes, a probe build with a limit of 1e9 reading `D` at the throw):
   - run 1: node 26 → 881 · Chromium 148 → 911 · WebKit 26.4 → 5,047;
   - run 2: node 934 · Chromium 884 · WebKit 5,012.

   256 is under 0.3 of V8's smallest reading.
2. `7155abbb4` test **E-1** (inherited block): the module is written to a file and imported, and compared with runtime `compile()` over both conformance corpora (64 cases: value, end offset and FAIL identity).
3. `55995f00b` test **E-3**, the stock-ASCII proof:
   - `routes(infos, nonAscii?)` and `EmitOptions.nonAsciiRoute` are evidence-only.
   - `test/helpers/bbnf-0.1.4/` holds 0.1.4's `charset`/`regex-first`/`first-sets`/`dispatch`, verbatim from `e91428ce1` with two import paths repointed, plus `stockNonAsciiRoute`: perfect table → `[]`, partial → fallbacks, none → keep.
   - `fixtures/value-js/verdicts-0.1.4.json` is frozen by `freeze-verdicts-0.1.4.mjs` from the published 0.1.4 on parse-that 0.8.2, over the 134 non-ASCII-bearing sources of the 29,944 × 17 rules. ⟨re-freeze + `cmp`⟩ → `IDENTICAL`.
   - `fixtures/value-js/F-b-4.json` holds the enumerated rows, reconciled by source text against value.js `bench/paired/oracle/F-b-4.json`: every row appears there, plus valueTop `🎨ff0099cc` (`.t` T-5's badTerm row).
   - A small comment edit to the depth numbers rode in `emit.ts`.
4. `a3e64a564` feat **E-5**:
   - The emitted functions carry JSDoc (`@typedef Rule`, `@type {Rule}`, `@param {string} s`), and so do `let V` and `createParser`'s table. The action check loops over `Object.entries(ACTION_KINDS)`.
   - `test/types.test.ts` runs tsc (strict, `checkJs`, `skipLibCheck: false`) over value.js's grammar emitted with map, span and text actions, plus a consumer file with four bad lines.
   - **Erratum to that commit's message** ("the minified module is byte-for-byte what it was"): the rewritten action-check loop moves the minified size 93,122 → 93,119 B and the gzip size 12,715 → 12,728 B (17 entries; ⟨`size.mts` at `55995f00b` vs `a3e64a564`⟩). The comments themselves minify away.
5. `7f36e94c6` perf, **G-depth**:
   - An entry whose reachable rules hold no marked back-edge carries no `D = 0` and no `D <= max` (`ruleDeps` is shared by `backEdges` and the new `nests`). Ten of value.js's 17 entry rules now emit no counter, among them keyframeSelector and timingFunction.
   - Cause, measured: before this, the paired fault on/off read parseKeyframeSelector **1.0516 / 1.0531** in both reps, though its rules cannot nest.
   - `test/depth.test.ts` (new; no depth test existed) checks:
     - calc( ×10,000 and @media ×10,000 are refused and nothing throws;
     - the limit is exactly 256 (and `maxDepth: 4` is exactly 4);
     - a trip does not outlive its parse;
     - only back-edges count;
     - `maxDepth: 0` emits no `D`;
     - one edge is marked per cycle.

     Falsified: against `a3e64a564`'s emitter the "no counter" assertion fails on `e1 … keyframeSelector … D = 0`.
6. `5e1a9e3b4` docs: the package **README**.
   - It names the TS emitter as value.js's output of record; the Rust `TsEmitter` is the Rust program's (§0ck 4, untouched).
   - It also covers one emitter / three faces, `bbnf gen` + `--check`, the **Actions contract** (pure and total, since recognize mode skips them in discarded positions; the register is not re-entrant; an action never calls a parse entry) and nesting depth.
   - CLAUDE.md's package map was refreshed; ASTToParser, lazy refs and the combinator-pattern codegen are gone from it.
7. `d5ab15025` docs: README and `emit.ts` now carry every V8 throw point measured (881–934). I amended this unpushed commit of mine once to catch the README's wrapped line.
8. `373ca34a6` chore: `package.json` 0.2.0 (§0ck 3). The lockfile still waits on R-t-1.
9. ⟨`git push origin x-p-w7-typescript`⟩ → `b35836fec..373ca34a6`. Branch only, per L-4.

**Not landed (spec (g)):** none of the runner-up levers (F1, F7, F8, keyword heads). Each is admitted only on 2-rep paired isolated cells over the 7 entries with value.js's actions, which is `.v`'s adopted module. No lever was built, so none was admitted. Memoization is off (the emitter has none).

**Gates, BEFORE → AFTER (AFTER read twice on the settled bytes, `373ca34a6`).**
- **E-1** (emitted vs runtime `compile()`).
  - BEFORE (at the inherited `a02e71936`): the conformance-corpus comparison was uncommitted, and the oracle comparison existed only in the predecessor's scratch.
  - AFTER, ⟨`npx vitest run`⟩ ×2 → `Test Files 16 passed (16)` · `Tests 277 passed (277)`, including the 64 E-1 cases.
  - ⟨scratch `e2/e123.mts` ×2⟩ over the bench of record (29,944 sources × 17 rules) → `{"calls":509048,"diffs":0,"failIsShared":true}`.
  - ⟨`e2/e123h.mts` ×2⟩ over the oracle's reader-shaped corpus (the 6,749 distinct strings in `golden.ndjson.gz`'s `harvest` rows × 17) → `{"calls":114733,"diffs":0}`.
  - **GREEN.**
- **E-2** (the routing audit on the EMITTED module, G-audit). ⟨`e123.mts` ×2⟩:
  - audit build over 29,944 × 17: `checks 186113813` · `violations 0`;
  - recognize vs value on every rule (160 × 29,944): `modeCalls 4791040` · `modeDiffs 0`;
  - harvest corpus: `checks 66498670` · `violations 0` · `modeDiffs 0` of 1,079,840.
  - **GREEN.**
- **E-3** (stock-ASCII only as a test; sound differs only in F-b-4).
  - BEFORE: no stock-ASCII variant existed.
  - AFTER ⟨`vitest run test/stock-ascii.test.ts`⟩ ×2 → `2 passed`. Stock-ASCII vs 0.1.4 → 0 mismatches over 134 × 17. Sound vs 0.1.4 → exactly the fixture rows: valueTop 5, functionParam 11, commaItems 11, semiItems 11, spaceItems 29, i.e. 67 = the 4 enumerated entry sources + `🎨ff0099cc` + the 62 reader rows, the same set as `.t` T-5.
  - ⟨`e123.mts` ×2⟩, whole corpus → the same 67 rows (`sameRowsAsT5: true` on all 17 rules), `0` on ASCII-only sources.
  - Harvest corpus → 87 differing rows, all on non-ASCII sources (`onAsciiOnly 0`, the F-b-4 class definition of `bench/paired/fb4.mjs`).
  - **GREEN.**
- **E-4** (determinism + drift).
  - `gen.test.ts` ×2 → green.
  - CLI end to end on the built `dist/cli.js` (scratch `e2/cli/`, value.js's five modules, the 100 judge action kinds, 6 entries):
    - gen twice → `cmp` identical (`.js` + `.d.ts`), sha `9df92fe5…`;
    - `--check` → exit `0`;
    - a one-byte edit to `tokens.bbnf` (a space inserted) → `--check` exit `1` (`js, d.ts differ`);
    - regenerate → `--check` exit `0` (sha `4a85835f…`).
  - **GREEN.**
- **E-5** (`tsc --strict`; `Actions` rejects bad tables).
  - BEFORE ⟨scratch `e2/tscjs.ts`: tsc strict + `checkJs` over the emitted value.js module⟩ → `599` diagnostics (350 implicit-any parameters, 246 on `V`, 2 on the `ACTION_KINDS` index, 1 evolving `V`).
  - AFTER ⟨`types.test.ts`⟩ ×2 → module + `.d.ts` `[]`. The consumer is refused on exactly lines 6/7/8/9 (missing action · `map` for a `text` rule · `fn(t: number)` · a non-entry). ⟨`npx tsc --noEmit -p .`⟩ → 0.
  - **GREEN.**
- **E-6** (size ≤ 125,646 B min / 14,517 B gz, the judge's `synth`; esbuild `transform` minify + zlib gzip at the default level, the judge's own `gen.mjs` idiom). ⟨scratch `e2/size.mts`, value.js's grammar, the judge's 100 action kinds⟩:
  - **17 entries** (value.js's call surface: 5 entries + ruleList + 9 readers + 3 splitters): **92,583 / 12,691**. **GREEN.**
  - Recorded, not the ship shape — **all 160 rules as entries** (the judge's module exposed every rule, `rules` only): 108,904 / 15,529. Minified is under the ceiling; gzip is **over by 1,012 B**. The extra is the per-rule value | FAIL `entries` table the spec requires, plus the depth wrappers of the nesting entries.
  - **Interning** (329 → 197 constants), measured against a scratch no-intern copy of the emitter:
    - 17 entries: 124,232 / 13,953 → 93,122 / 12,715;
    - all rules: 145,496 / 17,213 → 114,401 / 15,917;
    - timing, paired interned vs not, 2 reps × 11 rounds: medians 0.94–1.03, within the A/A noise.

    Interning is **kept** (the size drops and no timing moves).
- **E-7** (depth + the fault's hot-path cost, G-depth).
  - **Depth, GREEN.** calc( ×10,000 → `FAIL (refused)` on node 26 (V8), Chromium 148 (V8) and WebKit 26.4 (JSC), in two runs each; `calc10` → accepted. `depth-all.mjs`: every one of the 13 shapes at ×10,000 is refused or accepted, none throws; the deepest calc( accepted is `256`. Firefox is not installed in the Playwright cache; it is not in the gate.
  - **Fault on/off cost.** Instrument: scratch `e2/bench-fault.mjs`. One fresh process per rep; the same emission with the fault ON (default) vs OFF (`maxDepth 0`); 2 warm-ups, then interleaved rounds with the arm order reversed each round and the entry order rotated per rep; gc before every pass; each pass repeats the 29,944 sources until it takes ≥20 ms; ratio = median of the per-round ON/OFF ratios. Raw grammar, no actions.
    - BEFORE (at `a3e64a564`; 2 reps × 11; load 21–23): keyframe 1.0516 / 1.0531 (consistent: the per-call reset); the other entries 0.94–1.04.
    - AFTER (at `7f36e94c6`; 5 reps × 21; load 22–37). Per-entry medians across the 5 reps: color 1.0037 · scalar 0.9997 · value 0.9916 · values 0.9973 · keyframe 1.0102 · timing 1.0032 · stylesheet 1.0069. **Every median ≤1.02.**
    - Per cell: 29 of 35 are ≤1.02. The 6 above it are keyframe 1.1589 and 1.0238, and timing 1.045, where ON and OFF are now byte-identical code for those rules, so the excess is pure noise; plus stylesheet 1.0228 and 1.0225, and values 1.0355.
    - The A/A control (two copies of the OFF build, 3 reps × 21) reads 0.963–1.0333 per cell, and an earlier A/A (2 × 11) read up to 1.5686. **At this load the instrument cannot resolve a 2% per-cell bar.** No cell was set aside; all 35 are counted above.
  - **"Every entry still below retired" is not readable in `.e`.** The emitted module is positional (§0ck 2), while value.js's color/value/math actions still take 0.1.4's shape; their positional rewrite is `.v`'s act. `.v` V-3 times the adopted module with the fault ON, which is this reading.
  - **E-7: RED as a whole** (depth GREEN · cost GREEN on medians, per-cell below the noise floor · the below-retired half carried to `.v`).
- **E-8** (publish). ⟨`npm whoami`⟩ → `mkbabb`. Worktree clean except ignored `dist/` and `node_modules/`. `package.json` reads `0.2.0`. ⟨`npm view @mkbabb/parse-that@2.0.0 version`⟩ → `404` (ESC-W7p-1 still open), so a `@mkbabb/bbnf-lang@0.2.0` depending on `^2.0.0` would not install, and `typescript/package-lock.json` cannot regenerate (R-t-1). **Not published: ESCALATED.**
- **Stay-green:**
  - `.t`'s gates re-read on the final bytes: the suite ×2 (above); ⟨`npx tsc --noEmit -p .`⟩ → 0.
  - T-6 ⟨`git diff --name-only origin/master...x-p-w7-typescript | grep -vc '^typescript/'`⟩ → `0` (`88 files changed, 12116 insertions(+)`).
  - `npm run build` → green; `dist/cli.js` is the bin.

**Adjacent edits:** none. **Out-of-set writes:** none. The scratch lives in `scratchpad/e2/`: the probes, `e123.mts`, `e123h.mts`, `size.mts`, `size2.mts`, `emit-nointern.ts`, the fault/A-A/intern cells as JSON, `cli/`.

**Residuals.**
- **R-e-1 (for `.v`):** E-7's "every entry still below retired" is `.v` V-3 on the adopted module (fault ON, the default).
- **R-e-2 (for `.v`/`.k`):** ship `bbnf gen --entries` with value.js's call surface. E-6 holds at that shape (92,583 / 12,691); emitting every rule as an entry is over the gzip ceiling by 1,012 B.
- **R-e-3 (instrument, for `.o`/`.z`):** at load 22–37 an A/A cell reads up to 1.03 (once 1.57). A 1.02 per-cell bar needs either quieter load or more reps than 2; the medians are the stable reading.
- **R-e-4:** R-t-2 is discharged. The façade now compiles through the emitter, host rules are bound at compile time (`host`/`fromParser`), and late `nonterminals[name]` mutation is ported to actions/host (`79330801c`).

**Escalation.**
- **ESC-W7e-1 (owner act, the same wall as ESC-W7p-1):** publish parse-that 2.0.0 first, from `../parse-that-x-p-w7/typescript`: `npm whoami && git status --porcelain && npm run build && npm publish --access public --otp=<code>`. Then, from `../bbnf-lang-x-p-w7-typescript/typescript`:
  1. `rm node_modules/@mkbabb/parse-that && npm install` (regenerates the lockfile, R-t-1);
  2. `npx vitest run && npx tsc --noEmit -p . && npm run build`;
  3. commit the lockfile on the branch;
  4. `npm publish --access public --otp=<code>` (0.2.0).

  `.v` needs 0.2.0 on the registry to pin it.

**Commits (bbnf-lang, pushed through `373ca34a6`):** inherited `79330801c` · `a02e71936`; this seat `68e1ea7ea` · `7155abbb4` · `55995f00b` · `a3e64a564` · `7f36e94c6` · `5e1a9e3b4` · `d5ab15025` · `373ca34a6`; this receipt (value.js).

### .v

**Seat:** `claude-opus-5-5`, 2026-09-24 (fresh open; no prior `.v` receipt). **Status: PARTIAL** — the adoption landed and every gate `.v` can read on the settled bytes is read; the dependency move (V-9) and the CI `bbnf gen --check` step are ESCALATED behind ESC-W7e-1 (`@mkbabb/bbnf-lang` 0.2.0 is not on the registry, so it cannot be pinned).

**Open.** Spec read whole (190 lines incl. the §0ck addendum). Of this record: the header through the Unit plan, the `.o` receipt and the `.e` receipt (the last section). COHESION §0ck and §0cl read (to the file end, 3,270 lines; no later addendum rules on W7).

**Crash recovery.** ⟨`git status --porcelain`⟩ → no dirty or untracked path in `.v`'s writable set (the dirty rows `demo/picker/**`, `e2e/smoke/oracles/readout-seam.spec.ts`, `test/readout-reservation.test.ts`, `CARRY-LEDGER.md`, `scripts/dev/dev.sh`, keyframes evidence dirs are sibling seats'). No inherited work.

**Registry at open.** ⟨`npm view @mkbabb/bbnf-lang versions`⟩ → `0.1.1 … 0.1.4`; ⟨`npm view @mkbabb/parse-that versions`⟩ tail → `0.13.0, 1.0.0` (no 2.0.0). ESC-W7p-1 / ESC-W7e-1 still open.

**The generator used before the pin (recorded, local only).** The worktree's `dist/` in `../bbnf-lang-x-p-w7-typescript/typescript` is STALE against its own HEAD (⟨`shasum -a 256 dist/gen.js`⟩ → `e50d9d99…` vs a fresh build of ⟨`git archive 373ca34a6`⟩ → `6ddc35b2…`; `dist/` predates `7f36e94c6`). So `373ca34a6` was archived into the scratchpad (`scratchpad/v/bbnf`, its `node_modules` linked to the worktree's) and built there (⟨`npx vite build`⟩ → green); the sibling worktree was not written. For local generation only, `node_modules/@mkbabb/bbnf-lang` (0.1.4, whose only importer was the deleted runtime compile) was moved aside to `node_modules/@mkbabb/.bbnf-lang-0.1.4-aside-w7v` and symlinked to that build. `node_modules` is untracked; nothing of it is committed, and the dependency move re-installs from the registry (ESC-W7e-1 below).

**Acts, in order.**
1. **F-b-3.** ⟨`node scratchpad/v/strip.mjs --dry`⟩ (the research shim's `stripCaseWorkaround` rule, applied to code lines only) → `tokens 6 · math 12 · color 49 · value 32 · stylesheet 17 · total 116`; applied. The spec's 117 = these 116 + the one spelling in `tokens.bbnf`'s header comment (`/[nN]one/i`), which the rewritten header drops. The case pairs left in the grammar are all outside `/…/i`: `[eE]` in the exponent of `number`/`percentage`/`dimension`/`numeric`, and `scopeLimit = /[tT][oO]/`.
2. **F-p-EOF.** `tokens.bbnf`: `ws = /\s*/ ? ;` → `ws = /\s*/ ;`; the header's concatenation and first-letter notes are replaced by the ahead-of-time note.
3. **F-b-1.** `math` `@import "tokens.bbnf"`; `color` tokens + math; `value` tokens + math + color; `stylesheet` tokens; new root `src/css/grammar/css.bbnf` (`@import "value.bbnf" ; @import "stylesheet.bbnf" ;`). `stylesheet.bbnf`'s header now describes text and positional actions, not tags.
4. **`scripts/gen-grammar.mjs`.** `bbnf gen` reads the action kinds by importing the consumer's table, and value.js's `actions.ts` imports extension-less TypeScript that node cannot resolve, so the script bundles it with esbuild into an OS temp dir, then runs the package's own `bbnf` bin: `bbnf gen src/css/grammar/css.bbnf --actions <bundle> --out src/css/bbnf/generated/grammar.js --entries <24> [--check]`. The 24 entries are the rules value.js calls: 8 from `index.ts` (5 parse entries + the 3 list splitters) and 16 from `sheet.ts`.
5. **Actions.** `math.ts` → `mathActions` (the tokens and calculations; `calcKeyword`/`varFn` are `text` actions); `color.ts` → `colorActions`: `build` takes the positional `[a, b, c, alpha | undefined]`; `relativeColor`, `lightDark`, `colorMix`, `mixLead`/`mixTrail` destructure; `collect`/`components`/`NODE_KINDS` and the walk in `asColorNode` are deleted. `value.ts` → `valueActions` (`badTerm` is a `span` action; `namedSelector`/`stepsFn`/`linearStop` destructure fixed tuples). `stylesheet.ts` → `stylesheetActions` from the template `route-ts-compiler/shim/stylesheet-positional.ts` (runs are `text` actions; `tagsOf`/`textOf`/`tag` are deleted). `actions.ts` = the four spread, `as const satisfies Actions` (the generated type).
6. **`load.ts`** = `export const parser = createParser(actions)` plus `FAIL`, bound once at module load: no `BBNFToParser`, no `GRAMMAR_MODULES`, no `reset()`/`new ParserState`, no `rules[name]` mutation. `raw.d.ts` (the `*.bbnf?raw` declaration) is deleted with the runtime compile. `index.ts` and `sheet.ts` call `parser.entries.<rule>(source)` → value | `FAIL`.
   - **Overlap with `.k`, recorded.** `.v`'s `load.ts` has no `run`, `ruleOf` or `RunResult` left to call, so `index.ts` binds `const { entries } = parser` at module load. That is the shape `.k` names ("no `ruleOf(grammar())` lookup per call, no `RunResult` allocation, no generic `parseRule` wrapper"). `.k` keeps the profile and the accepted-class floor. The `success`/`failure` layer is untouched.
7. ⟨`node scripts/gen-grammar.mjs`⟩ → `bbnf gen: wrote src/css/bbnf/generated/grammar.js (+ .d.ts), sha256 58b2438c…`; ⟨`… --check`⟩ → `is current`, exit 0 (read again after the lint fix: exit 0).
8. Commit `3cdd4888` (the adoption, one meaning; the F-b-1 family, headers + concatenation deletion, rides inside it, because the concatenation is deleted by the switch to the generated module and the stripped `[xX]` / bare `ws` are only correct under the new parser).
9. Commit `93aaea4e`: `test/css/bbnf-depth.test.ts` (V-8).

**Gates, BEFORE → AFTER** (AFTER read on the committed bytes `93aaea4e`, twice unless said otherwise).
- **V-1 oracle.** BEFORE (the stock product): `mismatches 0` (the `.o` freeze). AFTER ⟨`node bench/paired/build.mjs && node bench/paired/equiv.mjs product report.json`⟩ ×2 → `compared 1376531/1376531 rows · mismatches 88 (ASCII-only sources 0) · {"entry:parseCssValue":4,"entry:parseCssValues":4,"reader:functionParam":11,"reader:splitTopLevel(,)":13,"reader:splitTopLevel(;)":11,"reader:splitTopLevel(space)":45}`. Row identity against the enumerated class (scratch python over the report and `bench/paired/oracle/F-b-4.json`, keyed by section + key) → `88 88 True` · `arm!=sound 0`: the 88 are exactly the F-b-4 rows (8 entry + 80 reader) and every one equals the sound answer (§0ck 1). **GREEN.**
- **V-2 suite.**
  - ⟨`npm run test:css-equivalence`⟩ → `Test Files 2 passed (2)` · `Tests 19 passed (19)`; `MIRROR-DEFECTS 0` on all 26 printed lines. **GREEN.**
  - ⟨`npm test`⟩ (after `npm run build`) → `Tests 3 failed | 907 passed (910)`. The failures: `test/spectrum-luma.test.ts` C-5 and `demo/test/shell/reka-binding-idiom.test.ts` NG-6 (the F-W6-open-4 pair), plus `demo/test/color-session/format-color.test.ts` G16 A1 (`ColorSpaceSelector.vue reads through format-color`: `expected +0 to be 1`). That third one is **foreign**: `ColorSpaceSelector.vue` was changed by Track A's `X.W12.t` commits (`83d1c61f`, `b98faac1`, `d40b574c`), which landed after the W6 baseline; `.v` touches nothing under `demo/`. **No CSS-parser failure.** The letter "908/910" reads 907/910 because of that foreign regression.
  - Typecheck: ⟨`npx vue-tsc -p tsconfig.{lib,demo,test}.json --noEmit`⟩ → `0` each; ⟨`npx tsc -p tsconfig.e2e.json --noEmit`⟩ → 3 errors, all in the UNTRACKED sibling file `e2e/smoke/w12-picker-blob.spec.ts` (⟨`git status --porcelain e2e`⟩ → `?? e2e/smoke/w12-picker-blob.spec.ts`), 0 on the committed tree. The test program was read with `bench/paired/_build/` (git-ignored, `.o`'s arm build) moved aside, because its generated `product-entry.ts` imports `.ts` paths (TS5097). That is a workstation-only artifact: CI never has `_build/`.
  - ⟨`npx eslint src/css/bbnf scripts/gen-grammar.mjs test/css --max-warnings=0`⟩ → clean, after one fix: two `pair[0]!` became `pair[0] as string`.
  - **V-2 GREEN on the CSS-parser reading.** The foreign G16 A1 failure is recorded for its owner.
- **V-7 grep.** ⟨`grep -rn GRAMMAR_MODULES src/css/bbnf | wc -l`⟩ → `0`; ⟨`grep -rnE "reset\(\)|new ParserState" src/css/bbnf | wc -l`⟩ → `0`. Case pairs inside `/…/i`: in the `.bbnf` sources → `0`. In the generated module (a node scan of its 94 `new RegExp(src, flags)`) → `case-pair in /i: 0`; the 5 regexes that keep a pair carry flag `y` only (the four `[eE]` exponents and `[tT][oO]`). BEFORE: `load.ts:36/42`, `load.ts:59/60`, 123 pairs. **GREEN.**
- **V-8 depth.** ⟨`npx vitest run test/css/bbnf-depth.test.ts`⟩ → `Tests 2 passed (2)`: `calc(` ×10,000 is refused by `parseCssValue`, `parseCssScalar` and `parseCssColor` (and inside `rgb(… 0 0)`), none throws, and `calc(` ×10 still reads. **GREEN.**
- **V-4 first use.** Scratch `scratchpad/v/cold.mjs` follows the judge's `cold.mjs` idiom: every arm in its own fresh process per round, arms rotated per round, 21 rounds, `uptime` before and after. It compares retired `_build/retired.mjs`, stock (the judge's banked `stock.mjs`, which `.o` proved equal to the pre-W7 product), and the product `_build/product.mjs`. Median of import + first `parseCssColor`:
  - run 1: retired 2.28 · stock 23.47 · product **6.61 ms = 0.282 of stock** (2.90× retired);
  - run 2: retired 2.43 · stock 24.49 · product **6.80 = 0.278** (2.80×).
  - First `parseStylesheet`: product 2.73 / 2.60 ms vs retired 1.43 / 1.45 (recorded). Load 32.8 → 29.8.
  - **GREEN** (≤ 0.55). The open item "first use ~4× retired" now reads ~2.8–2.9×.
- **V-3 whole-corpus and split cells.** Instrument of record: ⟨`node bench/paired/isolated.mjs v-r1 product 3 11`⟩, then ⟨`… v-r2 …`⟩, after `build.mjs` on `93aaea4e` (`srcDirty ""`, banked manifest 79/79). Clean-cell paired medians, product/retired, with every clean cell's ratio:

| class | run | Color | Scalar | Value | Values | KeyframeSel | Timing | Stylesheet |
|---|---|---|---|---|---|---|---|---|
| whole | 1 | .708 (.708/.792/.702) | .650 | .464 | .454 | .677 | .726 | .706 |
| whole | 2 | .722 (.737/.722/.701) | .646 | .464 | .468 | .678 | .712 | .705 |
| ceiling (jx + .08) | | .90 | .81 | .57 | .58 | .78 | .87 | .85 |
| acc | 1 | .638 | .718 | .420 | .428 | **1.356** (1.358/1.356/1.325) | .924 | .870 |
| acc | 2 | .680 | .707 | .414 | .433 | **1.333** (1.318/1.356/1.333) | .890 | .858 |
| rej | 1 | .762 | .618 | .471 | .472 | .689 | .700 | .682 |
| rej | 2 | .740 | .653 (2 clean) | .490 | .479 | .658 | .719 | .713 |

  - Every whole-corpus clean cell reads below 1.00. The worst cell is color .792 (run 1); the largest per-entry max is under .80. Every entry's median is within its ceiling, so the positional rewrite of color/value/math crossed no ceiling and no semantic re-rule is needed (§0ck 2 holds as one semantic).
  - Instrument gates: run 1 → `whole-7/7 GREEN 7/7` · `accepted-7/7 RED 6/7` · `rejected-7/7 GREEN 7/7`; run 2 → the same.
  - Set aside and counted: 22 of 88 cells (run 1), 20 of 85 (run 2); rej Scalar in run 2 kept 2 clean cells after 3 re-runs. Load `27.87` → `26.57` (run 1), `26.87` → `35.47` (run 2).
  - Records: `scratchpad/v/2026-09-23-x-p-w7-v-r{1,2}.json` (sha256 `9549b68f…`, `2ecedd78…`). They were moved out of `bench/records/`, which is `.o`'s and `.z`'s write set; `.z` banks the bench of record.
  - **V-3: RED on one half-cell.** Whole GREEN 7/7 ×2 with every median inside its ceiling. Rejected GREEN 7/7 ×2. Accepted 6/7: **parseKeyframeSelector accepted reads 1.325–1.358 in all 6 cells**, the spec's named falsifier (the critic's 1.32–1.38 for `jx-aot-pos`), which W7.md assigns to `.k` (decision 9, G-acc/rej). The binding `.v` could do at the entry (act 6) did not move it, so the floor lies below `index.ts` (the emitted entry/`ws` leaves, or the `success` layer). `.k` profiles it.
- **V-5 G-browser (three engines, paired in the same page).** Scratch harness `scratchpad/v/browser/{entry.mjs,run.mjs}`. `_build/retired.mjs` and `_build/product.mjs` are bundled into one IIFE, and each cell gets a fresh page. Otherwise it follows `bench.mjs`: k doubles to a pass floor, 2 warm-ups, 11 interleaved rounds with the rotate/flip order, `rev` per rep, spread ≥ 1.6 set aside (kept, counted) and re-run up to 3×. There is no `gc()` in a page (recorded). Engines: Chromium (Playwright 1.60), WebKit 26.4, Firefox 150.0.2 (⟨`npx playwright install firefox`⟩: the v1522 build was missing from the user cache; `.e` had also recorded Firefox absent).
  - **Chromium** (20 ms floor, 2 reps; 92 cells, 5 set aside across Chromium+WebKit). Every whole/acc/rej/large clean cell is below 1.00 except **acc parseKeyframeSelector 1.278 / 1.238**. Whole: color .598/.606 · scalar .527/.544 · value .405/.420 · values .417/.428 · keyframe .611/.625 · timing .623/.627 · stylesheet .604/.619 · large .410/.446.
  - **WebKit.** 20 ms floor → whole all < 1 (color .864/.800 … stylesheet .809/.796); acc keyframe **1.207/1.167**; large **1.357/1.286**. Re-read at a **100 ms floor** (2 reps): whole color .800/.805 · scalar .609/.593 · value .503/.523 · values .506/.543 · keyframe .840/.837 · timing .750/.768 · stylesheet .814/.812; acc all < 1 except keyframe **1.215/1.187**; rej all < 1; large **1.290/1.276**.
  - **Firefox.** At the 20 ms floor Firefox's clock (1 ms in a non-isolated page) quantizes ratios to steps like 1.000 and 1.500 (27 of 69 cells set aside), so the gate is read from the **100 ms-floor** run (`browser-ffwk-100.json`, 148 cells, 71 set aside at load 60 → 111). **Not below 1:** whole color **1.034** · whole stylesheet **1.132/1.194** · acc color **0.982/1.038** · acc timing **1.034** · acc stylesheet **1.081/1.090** · rej color **1.016/1.037** · rej stylesheet **1.269/1.235**. acc keyframe and large had no clean cell (read 1.36–1.50 when set aside). Below 1: scalar, value, values, keyframe (whole/rej), timing (whole/rej).
  - **V-5: RED.** Three classes of miss: (a) acc parseKeyframeSelector on all three engines (`.k`'s floor, as in V-3); (b) SpiderMonkey is slower on parseStylesheet in every class (1.08–1.27) and near parity-or-over on parseCssColor (0.98–1.04); (c) WebKit large sheets (V-6).
  - (b) is not in `.v`'s writable bytes. The actions are already positional and allocation-light, and V8 and JSC read the same module at .40–.84. What differs by engine is the emitted code's per-leaf regex dispatch (sticky `RegExp#exec` per run leaf), which is the emitter's shape. W7.md (g)'s held levers (F8 recognizer loops, F1 terminal-choice fusion) are the named candidates, and they live in bbnf-lang's emitter. → ESC-W7v-2.
- **V-6 G-large.** Node (the bench of record, `large` class): run 1 `1.431/0.511/0.570`, run 2 `1.268/0.521/0.538`. The rep-0 cell reads > 1 in both runs. Raw passes (`_build/cells/v-r2/parseStylesheet-large-rep*-a0.json`): the product runs 7.5–13.5 ms per pass in all three reps, while the **retired** arm is bimodal, 5.7–8.3 ms in rep 0 and 16.3–23.3 ms in reps 1–2. The cell runs at k = 1 (the k-rule stops on the cold first pass ≥ 20 ms, so steady passes are 6–20 ms), so the rep-0 cells time a warmer retired arm against a still-tiering product. Chromium large .410/.446; WebKit large **1.290/1.276** (100 ms floor, k = 16); Firefox large no clean cell (1.43–1.50 set aside). All four sheets are refused by both parsers (R-o-3), so every large reading times the refusal path. **V-6: RED** (node rep-0 cells ×2, WebKit ×2). → ESC-W7v-2, and R-v-3 for the instrument.
- **V-9 runtime dependencies.** BEFORE ⟨`node -e` over `package.json`⟩ → deps `{"@mkbabb/bbnf-lang":"0.1.4","@mkbabb/parse-that":"0.8.2"}`. AFTER: unchanged, **RED (ESCALATED)**.
  - Since `3cdd4888`, nothing in value.js imports either package at runtime: ⟨`grep -rn "parse-that\|bbnf-lang" src --include=*.ts`⟩ lists comments only. The generated module imports nothing.
  - The dependency move is one commit by lock: bbnf-lang as an exact devDependency 0.2.0, parse-that out, and the lockfile. `@mkbabb/bbnf-lang@0.2.0` is not on the registry, so that commit cannot be made. Pinning 0.1.4 as a devDependency would pin a package with no `bbnf gen`, and a `file:`/`link:` pin to the worktree would be a workaround. Neither is substituted.
- **CI step (L-2), not landed, ESCALATED with V-9.** `- run: node scripts/gen-grammar.mjs --check` (which runs `bbnf gen --check`) is to be appended after `- run: npm run test:css-equivalence` (ci.yml:76). Under today's `npm ci` it would fail, because the installed 0.1.4 has no `bbnf` bin: `gen-grammar: … has no \`bbnf\` bin (bbnf gen needs @mkbabb/bbnf-lang >= 0.2.0)`. So it lands with the dependency move, in the seat that makes it. `ci.yml` is untouched: ⟨`git diff --stat .github/workflows/ci.yml`⟩ → empty.
- **Local state restored.** `node_modules/@mkbabb/bbnf-lang` is back to the installed 0.1.4 (symlink removed, aside dir moved back; ⟨`grep '"version"' node_modules/@mkbabb/bbnf-lang/package.json`⟩ → `0.1.4`). Consequence: until the pin, ⟨`node scripts/gen-grammar.mjs --check`⟩ on this workstation answers the no-bin error above. That is the true state of the tree.

**Adjacent edits:** none. **Out-of-set writes:** none in any repository. The Playwright Firefox browser (v1522) was installed into the user cache `~/Library/Caches/ms-playwright`, outside every repo.

**Residuals.**
- **R-v-1 (`.k`):** acc parseKeyframeSelector 1.325–1.358 (node, 6/6 cells), 1.24–1.28 (Chromium), 1.19–1.22 (WebKit), 1.36–1.40 (Firefox, set aside). Entry binding is already once-at-load (act 6), so the floor is in the generated entry or leaf shape or in the `success` layer.
- **R-v-2 (owner of `demo/color-session`, Track A X.W12.t):** `demo/test/color-session/format-color.test.ts` G16 A1 fails after `83d1c61f`/`b98faac1`/`d40b574c`. It is foreign to W7 and is recorded so V-2's "908/910" letter is read correctly.
- **R-v-3 (instrument, `.o`/`.z`, `bench/**`):** the `large` class runs at k = 1 because the k-rule reads the cold first pass. Steady passes are 6–20 ms, under the 20 ms floor, and the retired arm is bimodal between reps. In a browser, Firefox's 1 ms clock needs a ≥ 100 ms pass floor. The browser harness (scratch) is a candidate for promotion beside `bench/paired/` at `.z`.
- **R-v-4:** `scripts/gen-grammar.mjs` resolves the bin from `node_modules/@mkbabb/bbnf-lang/package.json`, because the package's `exports` map does not expose `./package.json`.

**Escalations.**
- **ESC-W7v-1 (owner act; the same wall as ESC-W7p-1 / ESC-W7e-1):** after parse-that 2.0.0 and `@mkbabb/bbnf-lang` 0.2.0 are published per ESC-W7e-1, one seat in value.js does the following:
  1. `npm uninstall @mkbabb/parse-that @mkbabb/bbnf-lang && npm install --save-dev --save-exact @mkbabb/bbnf-lang@0.2.0`.
  2. Re-read `git diff package.json` (L-5).
  3. `node scripts/gen-grammar.mjs --check`. If the published emitter differs from `373ca34a6`, regenerate and re-read V-1.
  4. Commit `package.json` + `package-lock.json` as ONE commit.
  5. Append the one CI step after ci.yml:76 and commit it.
  6. V-9 then reads deps `{}`.
- **ESC-W7v-2 (ruling):** G-browser (V-5) and G-large (V-6) are RED on engines and paths that `.v`'s writable bytes do not reach. Firefox is slower on parseStylesheet in every class (1.08–1.27) and on parseCssColor (0.98–1.04), while V8 and JSC read the same module well below 1. WebKit large sheets read 1.28–1.29. Accepted keyframe selectors are over 1 on all engines. The candidates are bbnf-lang emitter levers (W7.md (g): F8 recognizer loops / F1 fusion, admitted only by paired cells), which belong to `.k` ("the cure lands in bbnf-lang's emitter … patch release") or to a re-opened `.e`. `.v` does not substitute a grammar rewrite that hand-tunes rules per engine.

**Gate summary.** GREEN: V-1 · V-2 (CSS-parser reading; foreign G16 A1 recorded) · V-4 · V-7 · V-8. GREEN within V-3: whole-corpus 7/7 ×2 with every median inside its ceiling; rejected 7/7 ×2. RED: V-3 accepted parseKeyframeSelector (`.k`) · V-5 · V-6 (ESC-W7v-2) · V-9 and the CI step (ESC-W7v-1).

**Scratch evidence** (`scratchpad/v/`, sha256 prefix): bench records `2026-09-23-x-p-w7-v-r1.json` `9549b68f…` · `-r2.json` `2ecedd78…`; first use `cold-r1.json` `e57e6d0b…` · `cold-r2.json` `00081c8c…`; browser `browser-r1.txt` `c9586bf8…` (Chromium + WebKit, 20 ms) · `browser-ff.json` `91dffa67…` (Firefox, 20 ms) · `browser-ffwk-100.json` `7a747ab0…` (Firefox + WebKit, 100 ms).

**Commits (value.js):** `3cdd4888` (adoption) · `93aaea4e` (V-8 test) · this receipt.

### .k

**Seat:** `claude-opus-5-5`, 2026-09-24 (fresh open; no prior `.k` receipt). **Status: ESCALATED** — the specified cure (entries bound once at module load, no per-call rule lookup, no `RunResult`, no generic wrapper) is in place and measured neutral; the profile puts the accepted-`parseKeyframeSelector` floor in value.js's ACTION layer (`math.ts`'s `tokenQuantity`/`quantity`, `.v`'s bytes) and the shared `success` layer (measured only by spec), NOT in `index.ts` and NOT in the emitted entry shape. Neither of `.k`'s two cure sites reaches it; no substitute is made. → ESC-W7k-1.

**Open.** Spec read whole (190 lines incl. the §0ck addendum). Record: header through the Unit plan, the `.v` receipt (the last section). COHESION §0j head, §0ck, §0cl, §0cm (to the file end, 3,281 lines; no later addendum rules on W7).

**Crash recovery.** ⟨`git status --porcelain src/css/bbnf docs/tranches/X/execution/D/X-P-W7.md package.json`⟩ → empty; ⟨`git -C ../bbnf-lang-x-p-w7-typescript status --porcelain`⟩ → empty (HEAD `373ca34a6`). No inherited work.

**Anchor at the true bytes.** The spec's `index.ts:33` (`ruleOf(grammar())`, `RunResult`, generic `parseRule`) no longer exists: `.v`'s `3cdd4888` replaced it with `const { entries } = parser;` and per-call `entries.<rule>(source)`. The emitted entries (`generated/grammar.js:2913–2936`) are already `function e3(s) { const o = r88_keyframeSelector_v(s, 0); return o === s.length ? V : FAIL; }` — value or `FAIL`, no result object (`.e` (b)). INTENT kept at the true bytes: bind each entry function once, at module load.

**Acts, in order.**
1. **Profile first (the falsifier: accepted `parseKeyframeSelector`, 56 sources).** Scratch `scratchpad/k/{parts.ts,prof.mjs,pure.mjs,cpu.mjs}`: an esbuild bundle of `load.ts`/`value.ts`/`result.ts`/`math.ts`/`src/css/index.ts` at HEAD `07732e1d`, the retired arm from `bench/paired/_build/retired.mjs`, the 56 accepted sources (`INPUTS.filter(retired ok)`), 2,048 repetitions per pass, gc before every pass, 11 interleaved rounds (arm order reversed on odd rounds).
   - ⟨`node --expose-gc pure.mjs`⟩ (load 32.4) → ns/call: retired **164.3** · product **215.5** (1.311) · retired's logic WITHOUT `success` 54.6 · **the emitted parser with identity actions 30.1** (`createParser` over `ACTION_KINDS` with `v => v`) · the real entry with value.js's actions 105.6 · real entry + `keyframeSelector` + `success` 207.5.
   - Reading: the emitted code costs 30 ns (0.55 of the retired parse logic's 55 ns). value.js's actions add **~76 ns** on top. `success` (deep freeze) costs **~100–110 ns in both arms** (it is the same `../result` law the retired parser used), which is 2/3 of the retired call and dilutes every ratio. `index.ts` itself adds ~8 ns (215.5 vs 207.5).
   - ⟨`node --cpu-prof cpu.mjs`⟩ (product only, 40,000 × 56 calls), self time: `deepFreeze` **30.9%** · `tokenQuantity` **11.4%** · `quantity` (its `Object.freeze`) **8.4%** · `success` **7.3%** · `r88_keyframeSelector_v` 4.9% · `r26_percentage_v` 3.9% · `tokenQuantity`'s re-split regex `^([+-]?(?:\d*\.\d+|\d+)(?:[eE][+-]?\d+)?)(.*)$` **3.9%** · GC 3.7% · the `percentage` leaf regex 2.6% · `r46_ws_r` 2.1% · `r89_selectorNamed_v` 1.9%. Result layer 38%; the `percentage` action (`math.ts` `tokenQuantity` + `quantity` + its regex) ~24%; every emitted rule together ~15%.
   - ⟨`node --expose-gc tq.mjs`⟩ (`tokenQuantity` alone, 10 percentage tokens) → 88.7 ns as written · 64.1 without `Object.freeze` · 53.8 with `Number(t.slice(0,-1))` in place of the second regex · 30.0 with both. So the action re-splits, by a second regex, a token the leaf already delimited, and freezes an intermediate the entry discards (`keyframeSelector` builds a new object from it).
2. **The specified cure, at `index.ts`.** `const { colorTop, valueTop, scalarTop, keyframeSelector: selectorEntry, timingFunction, commaItems, semiItems, spaceItems } = parser.entries;` once at module load; each entry calls its function directly, and `splitTopLevel`'s `LISTS` maps the separator to the bound function (no dynamic `entries[name]` key). `success`/`failure` untouched. ⟨`npx vue-tsc -p tsconfig.lib.json --noEmit`⟩ → 0; ⟨`npx eslint src/css/bbnf/index.ts --max-warnings=0`⟩ → clean. Commit **`065ba11e`**.
   - Paired before/after (⟨`node --expose-gc ab.mjs`⟩ ×2, one process, retired + before + after): before 1.358 / 1.369 · after 1.389 / 1.294 → **neutral within noise**, as the profile predicts (the lookup was never the floor).
3. **Emitter branch not taken.** W7.md: "If the floor lives in the emitted entry shape, the cure lands in bbnf-lang's emitter". Measured: the emitted parser with identity actions is 30 ns/call, 0.18 of the retired call and 0.55 of its parse logic; the entry shape is `value | FAIL` with no object. The floor is not in the emitted shape, so bbnf-lang is not written (⟨`git -C ../bbnf-lang-x-p-w7-typescript status --porcelain`⟩ → empty; no patch release).

**Gates, BEFORE → AFTER** (AFTER read on the committed bytes `065ba11e`; ⟨`node bench/paired/build.mjs`⟩ → provenance `valuejsHead 065ba11e…`, `srcDirty ""`, banked manifest 79/79).
- **K-1 accepted-class cells** ⟨`node bench/paired/isolated.mjs k-r1 product 3 11 whole,acc,rej,large`⟩, then ⟨`… k-r2 …`⟩. Clean-cell paired medians, product/retired, every clean ratio listed:

| acc entry | BEFORE (`.v` r1 / r2 medians) | AFTER k-r1 | AFTER k-r2 |
|---|---|---|---|
| parseCssColor | .638 / .680 | .735/.706/.677 → .706 | .716/.716/.746 → .716 |
| parseCssScalar | .718 / .707 | .673/.778/.639 → .673 | .696/.652/.734 → .696 |
| parseCssValue | .420 / .414 | .415/.432 → .423 (2 clean) | .392/.395/.430 → .395 |
| parseCssValues | .428 / .433 | .448/.427/.458 → .448 | .514/.457/.450 → .457 |
| **parseKeyframeSelector** | **1.356 / 1.333** | **1.366/1.348/1.308 → 1.348** | **1.429/1.365/1.355 → 1.365** |
| parseTimingFunction | .924 / .890 | .965/.983/.822 → .965 | .969/.958/.876 → .958 |
| parseStylesheet | .870 / .858 | .790/.873/.955 → .873 | .907/.899/.915 → .907 |

  - Instrument verdicts, both runs: `accepted-7/7 RED 6/7` (BEFORE: RED 6/7 ×2). **K-1: RED** — unchanged by the specified cure, as the profile predicts. Note `acc parseTimingFunction` reads .82–.98 (every cell < 1, but the closest margin after the falsifier).
  - Set aside and counted: 16 of 81 cells (k-r1), 10 of 76 (k-r2). Load (`uptime`): k-r1 `35.63 64.93 69.99` → `35.75 55.01 65.34`; k-r2 `34.44 53.77 64.72` → `27.12 45.55 60.18`.
  - Records moved out of `bench/records/` (`.o`/`.z`'s write set) to `scratchpad/k/2026-09-23-x-p-w7-k-r1.json` (sha256 `1df6c9dadc11…`) · `-k-r2.json` (`02891ca97680…`).
- **K-2 `.v`'s gates still hold.**
  - **Whole-corpus** (same runs): `whole-7/7 GREEN 7/7` ×2. Medians k-r1 / k-r2: color .740/.681 · scalar .689/.670 · value .472/.461 · values .454/.481 · keyframe .660/.672 · timing .754/.727 · stylesheet .752/.737; every one inside its ceiling (.90 · .81 · .57 · .58 · .78 · .87 · .85); worst whole cell timing .843 (k-r1). Rejected halves `GREEN 7/7` ×2 (worst rej cell color .839). **HOLDS.**
  - **Oracle** ⟨`node bench/paired/equiv.mjs product <out>`⟩ ×2 → `compared 1376531/1376531 rows · mismatches 88 (ASCII-only sources 0)`, sections `{"entry:parseCssValue":4,"entry:parseCssValues":4,"reader:functionParam":11,"reader:splitTopLevel(,)":13,"reader:splitTopLevel(;)":11,"reader:splitTopLevel(space)":45}`; keyed against `bench/paired/oracle/F-b-4.json` (section + key) → `88 88 True · arm!=sound 0` both runs. The `splitTopLevel` rewiring (act 2) changed no reader row. **HOLDS.**
  - **`test:css-equivalence`** ×2 → `Tests 19 passed (19)`; `26 × MIRROR-DEFECTS 0`. **HOLDS.**
  - **Large sheets (node)**: k-r1 `1.275/0.544/0.597`, k-r2 `0.607/0.570/1.362` — the same shape as `.v`'s V-6 (one >1 cell per run, R-v-3's k = 1 instrument artefact against a bimodal retired arm). Unchanged: **still RED as `.v` left it** (ESC-W7v-2 / R-v-3).
  - **Browser (G-browser)** — scratch `scratchpad/k/browser/` (`.v`'s `run.mjs`/`entry.mjs` copied, bundle rebuilt from `_build/` at `065ba11e`); probe parsimony: Chromium + WebKit, 2 reps, 20 ms floor (`.v`'s `browser-r1` setting); Firefox not re-read (its REDs are ESC-W7v-2's, unreachable from `index.ts`). ⟨`node run.mjs chromium,webkit 2 ../browser-k.json 20`⟩ → 89 cells, 1 set aside; Chromium 148.0.7778.96, WebKit 26.4; load `22.92` → `22.83`. Over 1.00, and ONLY these: Chromium acc keyframe **1.254/1.269** (`.v`: 1.278/1.238) · WebKit acc keyframe **1.200/1.115** (`.v`: 1.207/1.167) · WebKit large **1.286/1.286** (`.v`: 1.357/1.286). Every other Chromium/WebKit cell < 1.00. Record `scratchpad/k/browser-k.json` (sha256 `5b01aa0e5466…`). **Unchanged from `.v`** (the same three misses; G-browser stays RED under ESC-W7v-2 + this unit's ESC-W7k-1).
  - `.v`'s grep, depth and first-use gates read bytes `.k` did not touch (`src/css/grammar/**`, `generated/**`, `load.ts`); not re-run.

**Where the floor is, and what would cure it (measured, scratch only, nothing committed).** ⟨`node --expose-gc proto.mjs`⟩ ×2: the same generated parser with ONE action replaced — `percentage: { kind: "map", fn: (t) => ({ kind: "quantity", type: "percentage", value: Number(t.slice(0, -1)) }) }` (the leaf has already proved `<number>%`, so no second regex and no `Object.freeze` on an intermediate that `keyframeSelector` discards), plus `keyframeSelector` + `success` exactly as `index.ts` calls them → accepted `parseKeyframeSelector` **0.978 (9/11 rounds < 1) and 0.980 (6/11)**, against the product's 1.361 / 1.396 in the same processes. So:
- the floor is the `percentage` action, `math.ts`'s `tokenQuantity` (`NUMERIC.exec` re-split + `toLowerCase` + `quantity`'s `Object.freeze`), ~60 ns of the ~75 ns gap;
- even that cure lands at ~0.98, a margin the gate's "every cell < 1.00" would not hold reliably under load; the remaining levers are (i) the number/unit split handed over by the leaf (W7.md `.v`: "`tokenQuantity` takes the number/unit split from the leaf, if it measures faster"), which is an emitter/action-contract change, and (ii) the shared `success` layer (`deepFreeze`, 31% of self time), which W7.md holds "shared with the retired parser … only measured".

**Why no cure is committed.** `.k`'s writable set is `index.ts`, `generated/` (via `bbnf gen`) and the bbnf-lang emitter "if the floor lives in the emitted entry shape". The floor is in `src/css/bbnf/math.ts` (the action layer), which is `.v`'s writable set (`src/css/bbnf/**`); §0bt's adjacent-line rule never extends to "anything another unit in the same group owns", and changing `quantity`'s freeze or `tokenQuantity`'s contract is a semantic change to a shared action module, not a few adjacent lines of `.k`'s own concern. The emitter branch is falsified by measurement (identity-action parse 30 ns). No substitute cure is made (METHOD; no masking, no per-entry fast path in `index.ts` that bypasses the grammar).

**Adjacent edits:** none. **Out-of-set writes:** none (bench records moved to the scratchpad; bbnf-lang untouched: ⟨`git -C ../bbnf-lang-x-p-w7-typescript status --porcelain`⟩ → empty, HEAD `373ca34a6`).

**Residuals.**
- **R-k-1:** accepted `parseKeyframeSelector` 1.308–1.429 (node, 6/6 cells), 1.25–1.27 (Chromium), 1.12–1.20 (WebKit). K-1 RED.
- **R-k-2:** accepted `parseTimingFunction` reads .82–.98 (every cell < 1): the next-closest accepted cell; any action-layer change should be re-read against it.
- **R-k-3:** the `success` layer (`deepFreeze` via `Object.values` recursion + `Object.freeze`) is ~100–110 ns/call in both arms, 2/3 of the retired call on accepted selectors; measured only, per W7.md.

**Escalations.**
- **ESC-W7k-1 (ruling):** the accepted-`parseKeyframeSelector` floor (decision 9, G-acc/rej) lives in the action layer (`src/css/bbnf/math.ts` `tokenQuantity`/`quantity` on the `percentage` action), outside `.k`'s writable set and inside `.v`'s. Ask: grant a unit (a re-opened `.v`, or `.k` extended by an addendum) `src/css/bbnf/math.ts` (+ `value.ts` if the selector action takes the split) and, if the leaf split is chosen, bbnf-lang's emitter (a `span`/split action kind on numeric leaves, re-emit, `.e` gates, 0.2.x). Measured target: the lean `percentage` action alone reads 0.978/0.980, so the ruling should also say whether the `success` layer stays measured-only (W7.md) or joins the cure (it is shared with the retired arm, so it only dilutes; it does not create the gap).

**Gate summary.** RED: K-1 (accepted `parseKeyframeSelector`; 6/7 ×2). K-2: HOLDS for whole-corpus 7/7 ×2 (every median inside its ceiling), rejected 7/7 ×2, oracle (88 = the F-b-4 rows, arm = sound, ×2), `test:css-equivalence` 19/19 ×2; browser and large cells unchanged from `.v` (still RED on the same cells, ESC-W7v-2).

**Scratch evidence** (`scratchpad/k/`): `2026-09-23-x-p-w7-k-r1.json` `1df6c9dadc11…` · `-k-r2.json` `02891ca97680…` · `browser-k.json` `5b01aa0e5466…` · `equiv-r{1,2}.json` · profile scripts `prof.mjs`, `pure.mjs`, `tq.mjs`, `cpu.mjs`, `ab.mjs`, `proto.mjs`.

**Commits (value.js):** `065ba11e` (entries bound once at module load) · this receipt.

### .z

**Seat:** `claude-opus-5-5`, 2026-09-24 (fresh open; no prior `.z` receipt). **Status: ESCALATED.** `.z`'s premise, "after a fresh install on the published pins", is unmet at the registry: neither parse-that 2.0.0 nor `@mkbabb/bbnf-lang` 0.2.0 is published (ESC-W7p-1 / ESC-W7e-1 / ESC-W7v-1, the npm `EOTP` owner act, are still open). Also, K-1 is RED under ESC-W7k-1, which has no ruling. So Z-2 cannot read GREEN, and the COHESION rows (RES-x-1 and OC-1 speed GREEN, BBNF-TS-TOOLCHAIN discharged, F-b-1..4 and F-p-EOF closed) cannot truthfully be written. The lawful acts were done: the bbnf-lang preflight passed and PR #1 is open. The merge is held because the branch still has writes owed (see Z-4).

**Open.** I read the spec whole (190 lines, incl. the §0ck addendum). From the record I read the header through the Unit plan, plus the `.k` receipt (the last section); I found the other units' statuses by grep. I read COHESION §0cg through §0cm, to the file end (3,281 lines). No addendum rules on ESC-W7p-1, ESC-W7e-1, ESC-W7v-1/2 or ESC-W7k-1.

**Crash recovery.** ⟨`git status --porcelain | grep -E 'bench/records|COHESION|relay/|INBOX|LEDGER|X-P-W7'`⟩ → empty (the only nearby dirty row is `docs/tranches/V/reformation/CARRY-LEDGER.md`, which is outside the set and a sibling's). No inherited work.

**Registry at open.** ⟨`npm view @mkbabb/parse-that versions --json | tail -3`⟩ → `"0.13.0", "1.0.0"` · ⟨`npm view @mkbabb/bbnf-lang versions --json | tail -3`⟩ → `"0.1.3", "0.1.4"`. **No published pin exists to install.**

**Acts, in order.**
1. **bbnf-lang preflight (§0ck 5, read-only).** ⟨`git -C ../bbnf-lang fetch origin`⟩, then ⟨`git rev-parse origin/master`⟩ → `d2b32f6e3` · ⟨`git rev-parse origin/x-p-w7-typescript`⟩ → `373ca34a6`, equal to the worktree HEAD · ⟨`git diff origin/master...origin/x-p-w7-typescript --stat | tail -1`⟩ → `88 files changed, 12116 insertions(+)` · ⟨`… --name-only | grep -v '^typescript/'`⟩ → empty. **Only `typescript/**`; no CI or release file outside it.**
2. **PR opened, not merged.** ⟨`gh pr create --base master --head x-p-w7-typescript …`⟩ → `https://github.com/mkbabb/bbnf-lang/pull/1`; ⟨`gh pr view 1 --json state,mergeable,headRefOid,changedFiles`⟩ → `OPEN MERGEABLE 373ca34a6… 88`. The merge is held for a measured reason. The branch still owes writes that must land before master receives the package:
   - R-t-1: `typescript/package-lock.json` regenerates only once parse-that 2.0.0 is on the registry. At `373ca34a6`, `package.json` depends on `^2.0.0`, which returns 404, so merging now would put an uninstallable package on master.
   - The 0.2.0 publish itself (E-8) runs from this branch's worktree.
   - ESC-W7k-1's ruling may choose the leaf-split lever: "a `span`/split action kind on numeric leaves, re-emit, `.e` gates, 0.2.x". That would be an emitter write on this same branch.
   Merging now would split the close across two PRs and publish a broken intermediate state. `gh pr merge 1 --merge` is the one remaining act once those land.
3. **Z-1 reading on the tree as it stands** (not on published pins). ⟨`npm ls @mkbabb/parse-that @mkbabb/bbnf-lang`⟩ → `@mkbabb/bbnf-lang@0.1.4` (→ `parse-that@0.8.2 deduped`) · `@mkbabb/parse-that@0.8.2`. That is one copy each, but of the pre-W7 runtime pins (V-9 is still escalated as ESC-W7v-1), so it is not the gate's reading.
4. **Bench of record not re-read.** ⟨`git log --oneline 065ba11e..HEAD -- src package.json`⟩ → empty. The product bytes are the ones `.k` read twice (`k-r1`/`k-r2`), and a re-read on the same unpublished-pin bytes cannot turn Z-2. Nothing was banked to `bench/records/`: a record labelled as the published-pin close reading would be false.
5. **Relays not sent.** The relay texts W7.md prescribes (141–148) assert facts that do not hold yet:
   - T/U: "value.js carries no parse-that at runtime", but V-9 is RED.
   - SK-V26: "value.js consumes the TS package at build time", but 0.2.0 is unpublished and `.v` generated from a local archive.
   - keyframes.js: "receives the parser at X-W11", but only after the publishes.
   Sending them now would relay false state, and Z-3's acknowledgement needs the recipient sessions. They are owed at the re-opened `.z`. latex-paper's row (it stays on ^0.1.1) holds either way and goes out with the rest, so recipients get one letter each.
6. **COHESION not written.** I did not write the addendum's claims (RES-x-1 and OC-1 speed half GREEN, etc.), because Z-2 is RED on accepted `parseKeyframeSelector` (1.31–1.43 node, `.k`), on G-browser and on G-large (ESC-W7v-2). Writing them would record a false GREEN.

**Gates.** The BEFORE readings are the baseline table. The AFTER readings are this seat's.
- **Z-1** fresh install, one copy of each package, on the published pins: **RED, unreadable.** No published pin exists. On the current tree it reads one copy each of 0.1.4/0.8.2 (act 3).
- **Z-2** every entry below 1.00 in every whole-corpus and accepted-class cell, on the published pins: **RED.** The pins are unpublished, and on the same bytes `.k` read accepted `parseKeyframeSelector` 1.348/1.365 (median of cells, 6/6 cells >1; load `35.63 64.93 69.99`→`35.75 55.01 65.34` and `34.44 53.77 64.72`→`27.12 45.55 60.18`). Whole-corpus 7/7 GREEN ×2 (`.k` K-2).
- **Z-3** each relay acknowledged in INBOX; COHESION rows committed: **RED.** No relay is sent, per act 5, and COHESION is not written, per act 6.
- **Z-4** PR merged; preflight is `typescript/**` only; local master unchanged: **preflight GREEN** (act 1). **Local master unchanged GREEN**: ⟨`git -C ../bbnf-lang rev-parse master`⟩ → `af15f63e0d2d…` before and after. **Merge HELD** (act 2).

**Adjacent edits:** none. **Out-of-set writes:** none. The only bbnf-lang act is the server-side PR creation; no local branch, worktree or master was written.

**Residuals.**
- **R-z-1:** bbnf-lang PR #1 is open and MERGEABLE at `373ca34a6`, and its merge is held (act 2).
- **R-z-2:** the relays in W7.md 141–148 and the COHESION addendum are owed, with texts as the spec prescribes, once the publishes land and ESC-W7k-1 (with ESC-W7v-2) is ruled.

**Escalations.**
- **ESC-W7z-1 (owner act, the same wall as ESC-W7p-1/-e-1/-v-1):** publish parse-that 2.0.0 with an npm OTP (`../parse-that-x-p-w7/typescript`: `npm whoami && git status --porcelain && npm run build && npm publish --access public --otp=<code>`). Then `.e`'s E-8 chain runs: regenerate the lockfile on `x-p-w7-typescript`, run `.e`'s gates, publish 0.2.0. Then `.v`'s ESC-W7v-1 seat runs: pin 0.2.0 as a devDependency, take parse-that out of runtime, add the CI `bbnf gen --check` step. Only after that can `.z` re-open.
- **ESC-W7z-2 (ruling, joins ESC-W7k-1 and ESC-W7v-2):** Z-2 binds accepted-class cells (decision 9), and accepted `parseKeyframeSelector` reads above 1 on every engine. `.z` cannot close GREEN until a unit is granted the action layer (`src/css/bbnf/math.ts`), and the emitter if the leaf split is chosen, per ESC-W7k-1.
- **Re-open recipe for `.z`:**
  1. Run `npm ci` in value.js, then `npm ls` (Z-1).
  2. Run `node bench/paired/build.mjs`, then `node bench/paired/isolated.mjs z-r{1,2} product 3 11 whole,acc,rej,large` and bank both JSONs in `bench/records/` (Z-2).
  3. Run the preflight again, then `gh pr merge 1 --merge` (Z-4).
  4. Send the relays and write the COHESION addendum (Z-3).

**Gate summary.**
- GREEN: Z-4 preflight and local master unchanged.
- HELD: Z-4 merge.
- RED: Z-1 and Z-2, since no published pins exist and accepted keyframe is above 1.
- RED: Z-3, since no relays are sent and no COHESION rows are written, to avoid false state.

**Commits (value.js):** this receipt, plus one LEDGER event line. **bbnf-lang:** none (PR #1 opened server-side).

## Close

**Seat:** `claude-opus-5-5`, 2026-09-24 (close seat, verify-only; cures nothing). **Verdict: PARTIAL.** `.o` and `.t` are DONE. `.p`, `.e` and `.v` landed every cure their writable bytes reach. What remains is (i) the npm `EOTP` owner act: parse-that 2.0.0 and `@mkbabb/bbnf-lang` 0.2.0 are not on the registry, so V-9, the CI `--check` step, E-8, P-6 and `.z`'s Z-1/Z-3/Z-4-merge wait (ESC-W7p-1 = ESC-W7e-1 = ESC-W7v-1 = ESC-W7z-1); and (ii) the ruling on accepted `parseKeyframeSelector`, which still reads above 1.00 (K-1 RED, ESC-W7k-1 with ESC-W7v-2 / ESC-W7z-2).

**Open.** I read the spec whole (190 lines, incl. the §0ck addendum). From this record I read the header through the Unit plan and each unit receipt's status, gates, residuals and escalations (by grep and sed ranges). There is no prior Close, Check or Repair section. **Crash recovery:** ⟨`git status --porcelain docs/tranches/X/execution/`⟩ → only `B/KF-W13V.md` (Track B's; untouched). ⟨`git -C ../parse-that-x-p-w7 status --porcelain`⟩ → empty. ⟨`git -C ../bbnf-lang-x-p-w7-typescript status --porcelain`⟩ → empty. parse-that master's dirty `rust/**` rows belong to another program and were untouched. **No inherited work.**

### Act 1: commit roster, and whether each unit stayed in its writable set
⟨`git show --name-only --format= <c>`⟩ for each commit:

| Unit | Commits | Paths touched | In set? |
|---|---|---|---|
| `.o` | value.js `1c7b67f0` · `1bd030b0` · `9da28444` · `2bf1b352` · `ae846e2e` | `bench/css-parse.bench.ts`, `bench/paired/**`, `bench/records/2026-09-23-x-p-w7-o-product{,-r2}.json`, `DIVERGENCE-LEDGER.md`, this record | yes |
| `.p` | parse-that `x-p-w7` `99d8f8e` · `41575eb` · `1168bc2` · `659d24d` · `8544424` · `4940e85` · `96e68e9` (= `origin/x-p-w7`); value.js `3c53b040` | `typescript/test/benchmarks/paired/*`, `typescript/src/parse/{parser,state,utils,leaf}.ts`, `typescript/test/x-p-w7-cures.test.ts`, `typescript/CHANGELOG.md`, `docs/x-p-w7-2026-09-23-addendum.md`, this record | yes |
| `.t` | bbnf-lang `48d5fba61`..`b35836fec` (10); value.js `64b54ee5` · `727625f5` | `typescript/**` only, per ⟨`git diff --name-only origin/master...origin/x-p-w7-typescript \| grep -vc '^typescript/'`⟩ → `0` | yes |
| `.e` | bbnf-lang `79330801c` · `a02e71936` (inherited) · `68e1ea7ea`..`373ca34a6` (8); value.js `78bced17` | `typescript/**` (same reading) | yes |
| `.v` | value.js `3cdd4888` · `93aaea4e` · `07732e1d` | `scripts/gen-grammar.mjs`, `src/css/bbnf/**` (incl. `generated/`), `src/css/grammar/*.bbnf` (incl. new `css.bbnf`), `test/css/bbnf-depth.test.ts`, this record | yes |
| `.k` | value.js `065ba11e` · `3d4029fa` | `src/css/bbnf/index.ts`, this record | yes |
| `.z` | value.js `07f048d1` · `113580e3`; bbnf-lang PR #1 opened on the server | this record, `LEDGER.md` | yes |

**Landed wrong: none.** Every commit is inside its unit's writable set. No `package.json`, `ci.yml` or `rust/**` path is touched, and neither is `scripts/dev/dev.sh`.

### Act 2: every gate re-read by this seat (value.js HEAD `5603b398`; ⟨`git log 065ba11e..HEAD -- src/css package.json package-lock.json`⟩ → empty, so the product bytes are `.k`'s)

**`.o`**
- **O-1** BEFORE absent → `.o` GREEN ×2. Re-read ⟨`node bench/paired/oracle.mjs check`⟩ ×2 → `O-1 RED regenerated fb55a501… · stored 8f6ed13f… · pinned 8f6ed13f… · 1401722 rows · harvest 25179`. Reading: the frozen fixture is intact, because stored = pinned = `8f6ed13f…`. `check` regenerates from `_build/product.mjs`, and that is the ADOPTED module now. By design it can no longer reproduce the pre-move freeze: the 88 F-b-4 rows now answer differently, and the reader-shaped harvest grew from 25,167 to 25,179 because readers that used to refuse now pass more argument lists on. O-1 was a pre-move gate ("before anything moves"), and it held when `.o` read it. The post-move reading of record is V-1 below. **Recorded, not a regression.**
- **O-2** and **O-3** were pre-move product readings. The product has since moved, and in this seat's run O-2 reads `DOES NOT HOLD` (the product is now faster). `.o`'s banked records `2bf1b352` stand for both.
- **O-4** ⟨`git show --stat --format= 1c7b67f0 1bd030b0 9da28444 2bf1b352 -- src/`⟩ → empty. **GREEN.**

**`.p`** (worktree `../parse-that-x-p-w7`, `96e68e9` = `origin/x-p-w7`)
- **P-1/P-2/P-3** ⟨`npx vitest run`⟩ ×2 → `Test Files 15 passed (15)` · `Tests 143 passed (143)`. The P-1..P-3 laws are in `x-p-w7-cures.test.ts`. ⟨`grep -rn "Object.create(state" src/parse`⟩ → 0. `console.error` appears only as the opt-in `debug.ts:355` logger default. **GREEN.**
- **P-4** ⟨`npm run proof:all`⟩ ×2 → 9 PASS/GREEN lines (manifest, subpath, 4 packrat, no-span, no-dead-combinator, no-css-surface) and `FAIL: proof:perf`. That is the ruled reading (clause (C) = PT-PERF-LOAD, retired into R-3 by §0ci; R-p-1). **GREEN in the ruled reading.**
- **P-5**: I cite `.p`'s ×2 readings (every entry ≤ 1.00 vs 0.8.2) and did not re-time them. The parse-that source is unchanged since `96e68e9`.
- **P-6** ⟨`npm view @mkbabb/parse-that versions --json | tail -3`⟩ → `"0.13.0", "1.0.0"`. **RED: 2.0.0 is unpublished (ESC-W7p-1).**

**`.t` / `.e`** (bbnf-lang `x-p-w7-typescript` = `373ca34a6` = `origin/x-p-w7-typescript`; the worktree is clean)
- **T-6 / preflight**: ⟨`git diff --name-only origin/master...origin/x-p-w7-typescript | grep -vc '^typescript/'`⟩ → `0`. **GREEN.**
- **T-1 and the E-gate suite**: ⟨`cd typescript && npx vitest run`⟩ ×2 → `Test Files 16 passed (16)` · `Tests 277 passed (277)`. **GREEN.**
- **T-2..T-5, E-1..E-7**: I cite the receipts' ×2 readings on `b35836fec` / `373ca34a6`. The branch has not moved since then, so a re-run reads the same bytes.
- **E-8** ⟨`npm view @mkbabb/bbnf-lang versions --json | tail -3`⟩ → `"0.1.3", "0.1.4"`. **RED: 0.2.0 is unpublished (ESC-W7e-1).**

**`.v` / `.k`** (value.js)
- **V-1** ⟨`node bench/paired/equiv.mjs product <out>`⟩ ×2 → `compared 1376531/1376531 rows · mismatches 88 (ASCII-only sources 0)`. By section: `entry:parseCssValue` 4, `entry:parseCssValues` 4, `reader:functionParam` 11, `reader:splitTopLevel(,)` 13, `(;)` 11, `(space)` 45. Keyed on (section, key) against `bench/paired/oracle/F-b-4.json` ×2 → `88 ∩ 88 = 88`, 0 missing rows, so the difference is exactly the §0ck 1 rows. **GREEN.**
- **V-2** ⟨`npm run test:css-equivalence`⟩ ×2 → `Tests 19 passed (19)`, and ⟨`grep -cE 'MIRROR-DEFECTS [1-9]'`⟩ → `0`. ⟨`npx vue-tsc -p tsconfig.lib.json --noEmit`⟩ → 0 errors. I did not re-run the whole `npm test`: `.v` read it at 908/910 with R-v-2 as the foreign G16 A1, and it is cited. **GREEN on the CSS reading.**
- **V-7** ⟨`grep -rn GRAMMAR_MODULES src/css/bbnf | wc -l`⟩ → `0` · ⟨`grep -rnE "reset\(\)|new ParserState" src/css/bbnf | wc -l`⟩ → `0`. **GREEN.**
- **V-8** ⟨`npx vitest run test/css/bbnf-depth.test.ts`⟩ → `Tests 2 passed (2)`. **GREEN.**
- **V-9** ⟨`node -e` over `package.json`⟩ → deps `{"@mkbabb/bbnf-lang":"0.1.4","@mkbabb/parse-that":"0.8.2"}` · devDeps `{}`. **RED (ESC-W7v-1).** CI: ⟨`grep -n 'bbnf\|gen-grammar' .github/workflows/ci.yml`⟩ → 0 hits. **The step is not landed (ESC-W7v-1).**
- **V-4, V-5, V-6**: I cite `.v` and `.k`. V-4 is GREEN. V-5 and V-6 are RED (Firefox parseStylesheet/color, WebKit large, and accepted keyframe on every engine; ESC-W7v-2). With probe parsimony, no browser was re-launched on the unchanged bytes.

- **V-3 / K-1 / Z-2 (timing, this seat, ×2).** ⟨`node bench/paired/build.mjs`⟩ → provenance `valuejsHead 5603b398…`, `srcDirty ""`, `bankedManifestOk 79/79`. Then ⟨`node --expose-gc bench/paired/isolated.mjs close-r{1,2} product 3 11 whole,acc`⟩. Load: r1 was about 53–59 during its cells; r2 ⟨`uptime`⟩ read `37.13 43.50 50.64` → `29.38 40.16 48.90`. Set aside and counted: r1 22 of 61 cells, r2 2 of 44. Clean-cell medians, product/retired, r1 · r2:
  - whole: color .730 · .708, scalar .678 · .671, value .456 · .455, values .451 · .451, keyframe .657 · .657, timing .706 · .739, stylesheet .725 · .711. Instrument verdict `whole-7/7 GREEN 7/7` ×2, every median inside its V-3 ceiling (.90/.81/.57/.58/.78/.87/.85). **V-3 whole: GREEN.**
  - accepted: color .653 · .690, scalar .696 · .689, value .407 · .405, values .440 · .437, **keyframe 1.300 (1.400/1.298/1.300) · 1.317 (1.325/1.317/1.297)**, timing .910 · .888, stylesheet .841 · .811. Verdict `accepted-7/7 RED 6/7` ×2. **K-1: RED (ESC-W7k-1). Z-2: RED.**
  - The records are in scratchpad `close/2026-09-23-x-p-w7-close-r1.json` (sha256 `58e0dd230e23…`) and `-r2.json` (`b33c10863c52…`). They are not banked, because this is not the published-pin reading `.z` owes.
- **Z-1 / Z-3**: RED as `.z` left them, since neither package is published (see P-6 and E-8). **Z-4**: the preflight is GREEN (T-6), PR #1 is ⟨`gh pr view 1 --json state,mergeable,headRefOid`⟩ → `OPEN MERGEABLE 373ca34a6…`, and local master is `af15f63e0`, unchanged. **The merge is HELD.**

### Acts 3 and 4: verification artefacts and E13
- The §Verification artefacts are the instrument, the oracle and the bench records. I ran them as written above: `oracle.mjs check` ×2, `equiv.mjs product` ×2, and `build.mjs` + `isolated.mjs close-r{1,2} product 3 11 whole,acc` (records in scratchpad `close/`, not banked to `bench/records/`, which is `.o`/`.z`'s set). The judge's banked MANIFEST was re-checked by `build.mjs` → `bankedManifestOk 79/79`, `srcDirty ""`.
- **E13** ⟨`find <path> -maxdepth 1 -type f -newer INBOX.md`⟩ over value.js `V/` + `V/coordination/`, glass-ui `BK/coordination/` + `BL/` (⟨`ls -t glass-ui/docs/tranches`⟩ → `BL BK BJ`), keyframes.js `V/coordination/` and atlas `P/coordination/` → `0` in all six. **0 UNREAD in scope.**

### Residuals (named owners)
- **ESC-W7p-1 = ESC-W7e-1 = ESC-W7v-1 = ESC-W7z-1 (owner act, npm `EOTP`).** Owner: the owner, then Track D. The chain runs in this order:
  1. parse-that 2.0.0 from `../parse-that-x-p-w7/typescript`: `npm publish --access public --otp=<code>`.
  2. bbnf-lang: the lockfile regenerates on `x-p-w7-typescript` (R-t-1), then `.e`'s gates, then 0.2.0 is published (E-8).
  3. value.js: the ESC-W7v-1 seat pins 0.2.0 as a devDependency, removes parse-that from runtime and appends the CI `--check` step (V-9).
  4. `.z` re-opens on its recipe.
- **ESC-W7k-1 + ESC-W7v-2 + ESC-W7z-2 (ruling).** Owner: the orchestrator/owner, via a COHESION addendum. Accepted `parseKeyframeSelector` is above 1.00 on every engine. `.k` measured the floor in `math.ts`'s `percentage` action (`tokenQuantity` + `quantity`'s freeze), which is `.v`'s set. The ruling needs to grant `math.ts` (and the emitter, if the leaf split is chosen). Firefox and WebKit-large (V-5/V-6) are candidates for emitter levers (W7.md (g)).
- **R-z-1.** bbnf-lang PR #1 is OPEN and MERGEABLE at `373ca34a6` (⟨`gh pr view 1`⟩ re-read), and its merge is held until the publishes. Owner: `.z` re-open. ⟨`git -C ../bbnf-lang rev-parse --short master`⟩ → `af15f63e0`, unchanged.
- **R-z-2.** The relays (W7.md 141–148) and the COHESION addendum (RES-x-1, OC-1 speed half, BBNF-TS-TOOLCHAIN, F-b-1..4, F-p-EOF) are owed at the `.z` re-open. Owner: `.z`.
- **R-p-1.** `proof:perf` clause (C) should be restated on the paired instrument. Owner: parse-that's own program.
- **R-v-2.** `demo/test/color-session` G16 A1 is foreign to this wave. Owner: Track A X.W12.t.
- **R-v-3 / R-e-3.** The instrument's `large` class runs at k = 1, and A/A noise reaches about 1.03 under load. Owner: `.z` re-open (instrument, `bench/**`).
- **R-k-2.** Accepted `parseTimingFunction` has the next-closest margin (.82–.98). Any change to the action layer must re-read it.
- **R-close-1.** `oracle.mjs check` regenerates from the moved product, so it reads RED by construction after `.v` (see O-1). A later seat may add a mode that reads it against the frozen pre-move arm, or read V-1 alone. Owner: `.z` / `bench/**`.

### Gate table, BEFORE → AFTER (AFTER = this seat's reading, or cited where marked)
| Gate | BEFORE | AFTER |
|---|---|---|
| O-1 / O-2 / O-3 / O-4 | absent / no instrument / unminted / — | GREEN / HOLDS / RED-as-required at `.o` (pre-move, banked); O-4 GREEN; O-1 `check` now RED by construction on the moved product (R-close-1) |
| P-1 / P-2 / P-3 | RED (`Object.create(state)`, `console.error`, EOF) | GREEN (143/143 ×2) |
| P-4 | 134/134; proof:all 1–9 | 143/143 ×2; proof:all 9 GREEN, `proof:perf` (C) = ruled PT-PERF-LOAD ×2 |
| P-5 | — | GREEN ×2 (cited, `.p`); `90d4ec5` kept |
| P-6 | 2.0.0 unpublished | **RED**: unpublished (EOTP) |
| T-1 / T-6 | no `typescript/` | GREEN (277/277 ×2; 0 non-`typescript/` paths) |
| T-2..T-5 · E-1..E-7 | RED at open | GREEN (cited ×2, bytes unmoved `373ca34a6`); E-7 per-cell ≤1.02 = medians (R-e-3) |
| E-8 | 0.1.4 | **RED**: 0.2.0 unpublished |
| V-1 | 0 (stock) | GREEN ×2: 88 = F-b-4 rows exactly |
| V-2 | 19/19; 908/910 | GREEN ×2 (19/19, MIRROR-DEFECTS 0; vue-tsc lib 0); npm test cited |
| V-3 whole · rejected | stock 1.33–2.58 | GREEN 7/7 ×2 inside ceilings · rejected cited GREEN (`.v`/`.k`) |
| V-3 accepted = K-1 | stock 0/7 | **RED 6/7 ×2** (keyframe 1.300 / 1.317) |
| V-4 · V-7 · V-8 | RED | GREEN (V-4 cited; V-7/V-8 re-read) |
| V-5 · V-6 | — | **RED** (cited; ESC-W7v-2) |
| V-9 + CI step | runtime deps both | **RED** (ESC-W7v-1) |
| Z-1 · Z-2 · Z-3 | — | **RED** (unpublished pins; accepted keyframe; relays/COHESION owed) |
| Z-4 | — | preflight GREEN · master unchanged GREEN · merge HELD |

### Escalations (carried open, none new)
ESC-W7p-1 / ESC-W7e-1 / ESC-W7v-1 / ESC-W7z-1 (owner act: npm OTP publish chain) · ESC-W7k-1 / ESC-W7v-2 / ESC-W7z-2 (ruling: grant the action layer `src/css/bbnf/math.ts` and the emitter levers for accepted keyframe, Firefox and WebKit-large). **This seat raises no new escalation. Adjacent edits: none. Out-of-set writes: none.** The bench records went to the scratchpad; `_build/` is git-ignored.

### Four-verb line
W7.md has no §State clause that designates this seat to stamp a verb. X.P.W7 is therefore **not IMPLEMENTED**: it stays **PARTIAL**, and VERIFIED is not stamped. It moves to IMPLEMENTED when the publish chain lands and the ESC-W7k-1 ruling is executed, and a re-opened `.z` then reads Z-1..Z-4 GREEN.

**Commits (this seat):** this Close, plus the LEDGER row cell.

## Check 1

**Seat:** `claude-opus-5-5`, 2026-09-24, fresh adversarial check (L-20 pass 1), verify-only. **Verdict: NOT-CONFORMANT.** Every GREEN I re-ran reproduces. The remaining RED gates have no relief in the spec: none is producer-owned, none is routed to a later wave, and none is an honest-RED named by id. They are this wave's own acts and its own goal. So the row stays PARTIAL.

**Open.** I read the spec whole (190 lines, incl. the §0ck addendum). From this record I read the header through the Unit plan, and the Close; everything else by grep. **Crash recovery:** ⟨`git status --porcelain docs/tranches/X/execution/`⟩ → empty. parse-that master's dirty `rust/**`, `README.md` and `.cargo/config.toml` rows are another program's (L-3), untouched. `../parse-that-x-p-w7` and `../bbnf-lang-x-p-w7-typescript` are clean. **No inherited work.**

### Axes
- **(1) Claimed GREENs, re-run by this seat, ×2 where the gate is a count:**
  - V-1: ⟨`node bench/paired/equiv.mjs product`⟩ ×2 → `compared 1376531/1376531 rows · mismatches 88 (ASCII-only sources 0)`. Keyed on (section, key) against `bench/paired/oracle/F-b-4.json` ×2 → `inter 88 onlyProduct 0 onlyFb4 0`.
  - V-2: ⟨`npm run test:css-equivalence`⟩ ×2 → `Test Files 2 passed (2)`, `Tests 19 passed (19)`, and `MIRROR-DEFECTS [1-9]` occurs 0 times. ⟨`npx vue-tsc -p tsconfig.lib.json --noEmit | grep -c "error TS"`⟩ → `0`.
  - V-7: `GRAMMAR_MODULES` 0 · `reset()|new ParserState` 0 · case-pair classes on `/i` lines 0. Only `6` bracket pairs remain in the grammar, none inside `/…/i`. `ws = /\s*/ ;` sits at `tokens.bbnf:14`, and the five modules carry `@import` headers.
  - V-8: ⟨`npx vitest run test/css/bbnf-depth.test.ts`⟩ ×2 → `Tests 2 passed (2)`.
  - V-3 whole: ⟨`node bench/paired/build.mjs`⟩ → `valuejsHead f7b71132`, `srcDirty ""`, `bankedManifestOk 79/79`. Then ⟨`node --expose-gc bench/paired/isolated.mjs check1-r{1,2} product 3 11 whole,acc`⟩. Load was `16.08 31.75 44.47` → `35.47 33.30 43.85` for r1 and `34.60 33.90 43.21` → `28.95 32.41 42.01` for r2. Set aside and counted: r1 7 cells, r2 1. Whole medians, r1 · r2:
    - color .755 · .718
    - scalar .654 · .667
    - value .450 · .458
    - values .463 · .453
    - keyframe .655 · .663
    - timing .677 · .713
    - stylesheet .742 · .710

    Verdict `whole-7/7 GREEN` ×2, with every median inside its ceiling. The records were moved from `bench/records/` to scratchpad `chk/` (sha256 `0269ab84541b…`, `c982e2f6f1e7…`). ⟨`git status --porcelain bench src`⟩ → empty.
  - P-1..P-3: ⟨`npx vitest run`⟩ in `../parse-that-x-p-w7/typescript` ×2 → `Test Files 15 passed (15)`, `Tests 143 passed (143)`.
  - P-4: ⟨`npm run proof:all`⟩ → manifest, subpath, 4 packrat, no-span, no-dead-combinator and no-css-surface are GREEN or PASS. `FAIL: proof:perf` is the ruled PT-PERF-LOAD (R-p-1).
  - T-1: ⟨`npx vitest run`⟩ in `../bbnf-lang-x-p-w7-typescript/typescript` ×2 → `Test Files 16 passed (16)`, `Tests 277 passed (277)`.
  - T-6 and the Z-4 preflight: ⟨`git diff --name-only origin/master...HEAD | grep -vc '^typescript/'`⟩ → `0`. HEAD = `origin/x-p-w7-typescript` = `373ca34a6`. Local master is `af15f63e0`, unchanged.
  - O-4: `.o`'s commits touch no `src/` path (see (2)).
  - **12 gate rows reproduced, 0 failed to reproduce.**
  - Cited by the Close and not re-run by me, on unmoved bytes: P-5, T-2..T-5, E-1..E-7, V-4, and `npm test` 908/910.
- **(2) File bounds.** I ran ⟨`git show --name-only`⟩ over all 18 value.js commits (`1c7b67f0` … `f7b71132`), ⟨`git diff --name-only cb9c0d4..96e68e9`⟩ in parse-that (10 paths: `typescript/src/parse/{leaf,parser,state,utils}.ts`, `typescript/test/**`, `typescript/CHANGELOG.md`, `docs/x-p-w7-2026-09-23-addendum.md`) and the bbnf-lang `typescript/**`-only reading above. Every path is inside its unit's set. ⟨`git diff --stat 0b64d20c..HEAD -- scripts/dev/dev.sh package.json package-lock.json .github`⟩ → empty. **GREEN.**
- **(3) Masking.** ⟨`git show 3cdd4888 93aaea4e 065ba11e -- src test scripts | grep -E '^\+.*(try|catch|\.skip|\.todo|allowlist|console\.)'`⟩ → one hit, `scripts/gen-grammar.mjs`'s `try { … } finally { rmSync(scratch) }`. That is scratch-directory cleanup, not a guard around a defect. The generated module contains 0 `try`/`catch`. In the parse-that diff the only `.skip(` hit is the combinator `jsonString.skip(colon)` in a bench entry. **None found.**
- **(4) Commit families.** F-b-1 (the `@import` headers plus deleting the concatenation) is one commit, `3cdd4888`. The dependency-move family never landed (V-9), so it is not split. No revert of `90d4ec5` was owed, because P-5 kept it. `3cdd4888` bundles the adoption, the four workaround removals and the positional rewrite. They are one meaning, since the generated module needs all of them. **GREEN (INFO).**
- **(5) E-3.** ⟨`git diff --stat 0b64d20c..HEAD -- docs/tranches/X/parse-that/waves docs/tranches/V/megatranche/registry/adjudicated docs/tranches/X/parse-that/evidence/W7-research`⟩ → empty. The DIVERGENCE-LEDGER change is an append only: ⟨`git diff … | grep -c '^-[^-]'`⟩ → `0`. **GREEN.**
- **(6) Mail.** ⟨`find <path> -maxdepth 1 -type f -newer INBOX.md`⟩ over value.js `V/` and `V/coordination/`, glass-ui `BK/coordination/` and `BL/` (⟨`ls -t`⟩ → `BL BK BJ`), keyframes.js `V/coordination/` and atlas `P/coordination/` → `0` in all six. **0 UNREAD.**
- **(7) Four-verb.** The Close lawfully left the row PARTIAL and stamped no verb. **GREEN.**
- **(8) Goal at the bytes.** The goal is R-3 as bound by decision 9 and G-acc/rej: "faster than the retired hand parser on every bench entry", on accepted and rejected halves alike, on every engine. **It is NOT MET.** Accepted `parseKeyframeSelector` reads **1.303 · 1.327** (cells 1.27/1.303/1.334 and 1.327/1.333/1.297), 0 of 6 cells below 1.00, which is `accepted-7/7 RED 6/7` ×2. Those are the selectors keyframes.js actually sends. Separately, §0ck 7's "value.js runtime carries no parse-that and no bbnf-lang" is also unmet at the bytes: `package.json` deps still read `{"@mkbabb/bbnf-lang":"0.1.4","@mkbabb/parse-that":"0.8.2"}`, even though `src/` imports neither.
- **(9) Published figures.** The Close's V-1 (88 = F-b-4, by section), css-equivalence 19/19, 143/143, 277/277, whole-7/7 GREEN inside the ceilings and accepted keyframe 1.300/1.317 all reproduce within noise (mine: 1.303/1.327). **GREEN.**
- **(10) Honest-RED adjudication, gate by gate at the spec bytes:**
  - **K-1 / V-3 accepted / Z-2** (accepted keyframe 1.30–1.33). The spec binds it: decision 9 plus the addendum's G-acc/rej ("must beat the retired parser on each half"). `.k` exists to meet it (W7.md 123–131), and no successor wave receives it. It is not producer-owned: the floor `.k` found is in value.js's own `math.ts` `percentage` action, which is `.v`'s writable set in this same wave. **No relief.** ESC-W7k-1 names the orchestrator/owner ruling as its owner, but no COHESION ruling exists (⟨`grep -n "W7k-1" COHESION.md`⟩ → 0).
  - **V-5 / V-6** (G-browser: Firefox parseStylesheet/color, WebKit-large, accepted keyframe on every engine; G-large: the WebKit large sheets). Addendum gates ("must not be slower … on any engine, per entry"). **No relief.** The owner is ESC-W7v-2, the same ruling. These readings are cited from `.v`/`.k`; the bytes are unmoved and, for probe parsimony, I did not re-launch a browser.
  - **P-6, E-8, V-9 + the CI `bbnf gen --check` step, Z-1, and Z-3's publish-dependent half.** These are this wave's own release acts (R-1: publishing unwalled; W7.md 64, 100, 102–104, 132–140). They are blocked by the npm `EOTP` second factor, which only the owner can supply. The spec has no clause that relieves them, so they are **not honest-RED** under (10). They are an owner-act blocker with a named owner (ESC-W7p-1 = e-1 = v-1 = z-1). One related fact: ⟨`scripts/gen-grammar.mjs`⟩ needs a `bbnf` bin, and the installed 0.1.4 has none (the script's own guard says so). So the checked-in `generated/grammar.js` cannot be regenerated or drift-checked from value.js's own tree until the 0.2.0 pin lands.
  - **Z-3's relay half and the COHESION addendum (R-z-2).** The spec assigns these to `.z` (W7.md 136–140) and they are not sent. The owner is `.z`'s re-open.
  - **O-1 `check`** reads RED by construction on the moved product (R-close-1). This is not a claimed GREEN: O-1 was a pre-move gate that held at `.o`, and V-1 is the post-move reading, 88 = F-b-4 exactly. Mitigated.
- **Successor "Opens after" conjuncts.** X-W11 opens after "X-W0 … X-W10 are IMPLEMENTED", and COHESION §0ck:3189 adds "value.js publishes at X-W11, after X.P.W7". The X.P.W7 conjunct is **RED** (PARTIAL), so X-W11 is lawfully BLOCKED on X.P.W7 (among its other conjuncts). keyframes.js receives the parser only at X-W11. No other wave spec names X.P.W7 in its Opens-after (⟨`grep -rn "Opens after" docs/tranches/X | grep "P.W7"`⟩ → 0).

### Register (severity · claim · receipt · cure)
| # | Severity | Claim | Receipt | Cure |
|---|---|---|---|---|
| C1-1 | HIGH | Accepted `parseKeyframeSelector` is slower than the retired parser, so the spec's goal (R-3 under decision 9 / G-acc/rej) is unmet. K-1, V-3 accepted and Z-2 are RED with no relief. | `isolated.mjs check1-r{1,2}` → acc keyframe median 1.303 · 1.327, `accepted-7/7 RED 6/7` ×2 | The ESC-W7k-1 COHESION ruling grants a repair unit `src/css/bbnf/math.ts` (the `percentage` action, `tokenQuantity`/`quantity` freeze), plus the emitter leaf split if needed (bbnf-lang `typescript/**`, re-check `.e`). Re-read K-1 and V-3 ×2. |
| C1-2 | HIGH | The release chain has not run: parse-that 2.0.0 and bbnf-lang 0.2.0 are unpublished, value.js still carries both in runtime `dependencies`, there is no CI `--check` step, and Z-1/Z-3 are RED. These are this wave's own acts, with no spec relief. | `npm view … versions` tails `0.13.0, 1.0.0` · `0.1.3, 0.1.4`; `package.json` deps as in (8); `grep -c 'bbnf' ci.yml` 0 | The owner supplies the npm OTP (ESC-W7p-1 chain, Residuals step 1–4). Then the ESC-W7v-1 seat pins devDep 0.2.0, drops both from runtime and appends the ci.yml step. `.z` re-opens. |
| C1-3 | HIGH | G-browser/G-large are RED: V-5 (Firefox parseStylesheet/color, accepted keyframe on every engine) and V-6 (WebKit large sheets). No relief. | `.v`/`.k` receipts (cited, bytes unmoved `065ba11e`) | Under the same ruling, ESC-W7v-2: the W7.md (g) emitter levers, each admitted only if it regresses no entry. Re-read V-5/V-6. |
| C1-4 | MINOR | The relays (W7.md 141–148) and the COHESION addendum are unsent (R-z-2). | Close §Residuals R-z-2; INBOX has no W7 relay row | `.z` re-open, after C1-2. |
| C1-5 | MINOR (mitigated) | `oracle.mjs check` cannot re-read O-1 on the moved product. | Close O-1 reading | V-1 stands (88 = F-b-4 exactly, ×2, this seat). R-close-1: add a frozen-arm mode in `bench/**`. |
| C1-6 | INFO | Some GREENs are cited, not re-run by this seat or the Close: P-5, T-2..T-5, E-1..E-7, V-4, `npm test` 908/910. | Close Act 2 | Re-read them at the `.z` re-open on the published pins. |

**Honest-RED set: none.** No remaining RED gate is relieved under axis (10). **gatesReproduced 12 · gatesFailed 0** (of those this seat re-ran). The LEDGER status is left **PARTIAL**, and an event line is appended. **Adjacent edits: none. Out-of-set writes: none.** The bench records went to the scratchpad; `bench/records/` is clean.

## Repair 1

**Seat:** `claude-opus-5-5`, 2026-09-24, repair round 1 against the Check 1 register. **Crash recovery:** ⟨`git status --porcelain src bench test/css …`⟩ → ` M src/css/bbnf/math.ts` and `?? bench/records/2026-09-23-x-p-w7-repair1-r1.json`: a killed predecessor repair seat's partial work on C1-1 (inherited paths). I read the diff whole: it gave the `number`/`percentage` actions their own constructors that skip `tokenQuantity`'s re-split and build the quantity unfrozen. I judged it against W7.md 111 ("`tokenQuantity` takes the number/unit split from the leaf, if it measures faster") and kept it after two checks (below). Its untracked record was superseded by this seat's own `repair1-r1` run (same tag, overwritten). parse-that and bbnf-lang worktrees: not written.

### Defect → cure → commit → gate re-reading
- **C1-1 (HIGH) accepted `parseKeyframeSelector` > 1.00 → CURED** in `.v`'s set (`src/css/bbnf/**`, W7.md 121) with the spec's own lever (W7.md 111), commit `8b08db4b`:
  - `math.ts`: `number` and `percentage` build `{kind, type, value}` straight from the token the leaf already proved (`Number(token)` / `parseFloat(token)`), with no `NUMERIC` re-split, no unit read and no per-node `Object.freeze`. `angle`/`dimension` keep `tokenQuantity`.
  - `value.ts`: `selectorKeyword` returns one shared frozen `FROM`/`TO` node (the leaf proved `from|to` in some case, so the token's length names it), as `NONE` already does.
  - Why the freeze moves: probe on the frozen variant (`quantity(…)` kept) → acc keyframe `1.091/1.041/1.167` (RED); unfrozen → `0.983/0.996/1.002` (borderline); plus shared `from`/`to` → `0.944/0.903/0.941`. Probe records kept in scratchpad, not banked.
  - Soundness of leaving the freeze to `success`'s `deepFreeze` (which stops at an already-frozen node): ⟨`npx vite-node scratchpad/frozen-audit.ts`⟩ (all 7 entries × the 29,944 sources, every object in every accepted result) → `objects 255496 unfrozen 0`. It is pinned by a new test, `test/css/bbnf-frozen.test.ts` (15 cases across the 7 entries: percentages, numbers, `calc`, `color-mix` percents, `from`/`TO`, a keyframes sheet) → `15 passed`.
- **Gate re-reading on `8b08db4b`'s bytes** (the runs used the identical working-tree bytes before the commit, so `provenance.srcDirty` names the two files):
  - **K-1 / V-3 accepted / V-3 whole.** ⟨`node bench/paired/build.mjs`⟩ → `bankedManifestOk 79/79`. ⟨`node --expose-gc bench/paired/isolated.mjs repair1-r{1,2} product 3 11 whole,acc`⟩. Load was `29.77 52.87 78.03` → `29.52 48.43 74.52` for r1 and `29.52 48.43 74.52` → `25.00 43.93 71.07` for r2. Set aside and counted: r1 3, r2 1. Gates: `whole-7/7 GREEN` ×2 and **`accepted-7/7 GREEN` ×2**. Medians, r1 · r2:
    - whole: color .642 · .662 · scalar .622 · .598 · value .464 · .442 · values .454 · .441 · keyframe .659 · .642 · timing .623 · .610 · stylesheet .718 · .710. Every one is inside its V-3 ceiling.
    - accepted: color .585 · .561 · scalar .609 · .590 · value .407 · .381 · values .426 · .406 · **keyframe .924 · .924** (cells .920/.924/.958 and .923/.963/.924) · timing .661 · .669 (R-k-2 re-read) · stylesheet .848 · .831.
    - Banked in commit `0ff2b6fd`: `bench/records/2026-09-23-x-p-w7-repair1-r1.json` (sha256 `14ab42b124c45d00…`) and `-r2.json` (`adf4f520b7c60564…`).
  - **V-1.** ⟨`node bench/paired/equiv.mjs product`⟩ ×2 → `compared 1376531/1376531 rows · mismatches 88 (ASCII-only sources 0)`. `bySection` equals `bench/paired/oracle/F-b-4.json`'s `bySection` on both runs (`True`, 88). **GREEN ×2.**
  - **V-2.** ⟨`npm run test:css-equivalence`⟩ ×2 → `Test Files 2 passed (2)` · `Tests 19 passed (19)`, and `MIRROR-DEFECTS [1-9]` occurs 0 times. ⟨`npx vue-tsc -p tsconfig.lib.json --noEmit | grep -c "error TS"`⟩ → `0`. ⟨`npx vitest run test/css/`⟩ ×2 → `Test Files 5 passed (5)` · `Tests 51 passed (51)` (includes V-8 depth and the new frozen test). ⟨`npm test`⟩ → `Tests 3 failed | 924 passed (927)`. The 3 failures are foreign to this wave and the CSS parser: `test/spectrum-luma.test.ts` C-5 (self-labelled BORN-RED, X·V w1.a), `demo/test/color-session/format-color.test.ts` G16 A1 (R-v-2, Track A), and `demo/test/shell/reka-binding-idiom.test.ts` NG-6 (X·V w1.a canary). None of the three failing assertions reads a parse result: C-5 is a contrast ratio, A1 an import census, NG-6 a checkbox binding.
- **C1-2 (HIGH) release chain → ESCALATED, not cured.** ⟨`npm view @mkbabb/parse-that versions --json | tail -3`⟩ → `"0.13.0", "1.0.0"` · ⟨`npm view @mkbabb/bbnf-lang versions --json | tail -3`⟩ → `"0.1.3", "0.1.4"`. Both are still unpublished. The publish needs the owner's npm OTP (`EOTP`), which no seat can supply. V-9 (drop both from runtime, pin devDep 0.2.0) and the `bbnf gen --check` CI step both need the published 0.2.0. Pinning an unpublished version would break `npm ci`, and `scripts/gen-grammar.mjs` needs the 0.2.0 `bbnf` bin. The cure lies outside every seat's reach: ESC-W7p-1 = e-1 = v-1 = z-1, unchanged.
- **C1-3 (HIGH) V-5 / V-6 → ESCALATED, not cured.** The Check's cure is "under the ESC-W7v-2 ruling", and ⟨`grep -n "W7v-2\|W7k-1" docs/tranches/X/COHESION.md`⟩ → 0 hits, so there is still no ruling. The named levers are W7.md (g)'s emitter levers in bbnf-lang `typescript/**`. They can only reach value.js through `bbnf gen`, which `.k`'s bounds require ("`src/css/bbnf/generated/` (through `bbnf gen` only)"), and that needs the unpublished 0.2.0 (C1-2). V-5(a), accepted keyframe on every engine, may have moved with C1-1, but the engine harness lived in an earlier session's scratchpad and is gone. Under probe parsimony it was not rebuilt, so V-5(a) is **not re-read**. V-5(b) (SpiderMonkey `parseStylesheet`/color) and V-6 (WebKit large) are untouched by `8b08db4b`, which changes only number/percentage/`from`/`to` actions.
- **C1-4 (MINOR) relays and COHESION addendum → deferred to `.z`.** The Check's own cure orders them "after C1-2". There is no one-command cure.
- **C1-5 (MINOR) frozen-arm `oracle.mjs` mode → deferred.** The cure needs a new build of the `.o`-era `src/` beside `build.mjs`'s HEAD build, which is not a one-command cure. It stays mitigated by V-1 (above, ×2, 88 = F-b-4 by section). Owner: `.z` / `bench/**` (R-close-1).
- **C1-6 (INFO).** `npm test` was re-read above. P-5, T-2..T-5, E-1..E-7 and V-4 sit on unmoved bytes (parse-that and bbnf-lang were not written, and V-4's first use is not moved by an action-body change). Re-read at `.z`.

**Tally:** cured 1 (C1-1). Escalated 2 (C1-2 owner OTP, C1-3 ruling plus downstream of C1-2). Deferred MINOR 2 (C1-4, C1-5). INFO 1. **Adjacent edits:** `test/css/bbnf-frozen.test.ts` (new, inside `.v`'s `test/css/**`). No out-of-set writes; `scripts/dev/dev.sh` untouched. **Commits:** `8b08db4b` (cure) · `0ff2b6fd` (bench records) · this section. The row stays **PARTIAL**: K-1 is now GREEN, while P-6 · E-8 · V-5 · V-6 · V-9 · Z-1..Z-3 remain RED on the two escalations.

## Check 2

**Seat:** `claude-opus-5-5`, 2026-09-24, fresh adversarial check (L-20 pass 2), verify-only. **Verdict: NOT-CONFORMANT.** Repair 1's cure of C1-1 reproduces: accepted `parseKeyframeSelector` now reads below 1.00 in every cell, ×2. Every GREEN I re-ran reproduces. But three sets of gates are still RED, and the spec gives none of them relief: the release chain (P-6 · E-8 · V-9 plus the CI `--check` step · Z-1 · Z-2 on published pins · Z-3), G-browser (V-5) and G-large (V-6). The row stays **PARTIAL**.

**Open.** I read the spec whole (190 lines, incl. the §0ck addendum). From this record I read the header through the Unit plan, the Close, Check 1 and Repair 1; everything else by grep. **Crash recovery:** ⟨`git status --porcelain docs/tranches/X/execution/D/X-P-W7.md docs/tranches/X/execution/LEDGER.md`⟩ → empty; `../parse-that-x-p-w7` and `../bbnf-lang-x-p-w7-typescript` are clean. **No inherited work.** COHESION has no ruling after Repair 1 on this wave: ⟨`grep -n "W7v-2\|W7k-1\|W7p-1\|EOTP" COHESION.md`⟩ → 0 hits. The last addendum is §0cn (host reboot).

### Axes
- **(1) Claimed GREENs, re-run by this seat on HEAD `7e65bc06` (product bytes = `8b08db4b`):**
  - **K-1 / V-3 accepted.** ⟨`node bench/paired/build.mjs`⟩ → `valuejsHead 7e65bc06`, `srcDirty ""`, `bankedManifestOk 79/79`. Then ⟨`node --expose-gc bench/paired/isolated.mjs check2-r{1,2} product 3 11 whole,acc`⟩. Load: r1 `15.83 33.65 62.56` → `15.16 29.80 58.82`; r2 → `13.72 26.40 55.10`. Set aside and counted: r1 5 cells, r2 7. Gates: `whole-7/7 GREEN 7/7` ×2 and **`accepted-7/7 GREEN 7/7` ×2**.
    - accepted medians, r1 · r2: color .586 · .571 · scalar .646 · .589 · value .387 · .409 · values .406 · .452 · **keyframe .955 · .911** (cells .955/.920/.955 and .898/.911/.956) · timing .675 · .670 · stylesheet .837 · .854.
    - whole medians, r1 · r2: color .681 · .661 · scalar .606 · .605 · value .446 · .449 · values .483 · .460 · keyframe .652 · .647 · timing .595 · .634 · stylesheet .717 · .709. Every one is inside its V-3 ceiling (.90/.81/.57/.58/.78/.87/.85).
    - Records were moved from `bench/records/` to scratchpad `chk2/`, not banked. ⟨`git status --porcelain bench src test`⟩ → empty.
  - **V-1.** ⟨`node bench/paired/equiv.mjs product`⟩ ×2 → `compared 1376531/1376531 rows · mismatches 88 (ASCII-only sources 0)`. Keyed on (section, key) against `bench/paired/oracle/F-b-4.json` ×2 → `inter 88 onlyP 0 onlyF 0`.
  - **V-2.** ⟨`npm run test:css-equivalence`⟩ ×2 → `Test Files 2 passed (2)`, `Tests 19 passed (19)`, and `MIRROR-DEFECTS [1-9]` occurs 0 times. ⟨`npx vue-tsc -p tsconfig.lib.json --noEmit | grep -c "error TS"`⟩ → `0`. ⟨`npm test`⟩ → `Tests 3 failed | 924 passed (927)`, which matches Repair 1. The three failures are C-5 (`spectrum-luma`, self-labelled BORN-RED), G16 A1 (`format-color`, Track A, R-v-2) and NG-6 (`reka-binding-idiom`). All three are foreign to the CSS parser.
  - **V-7.** `GRAMMAR_MODULES` 0 · `reset()|new ParserState` 0 · `tokens.bbnf:14 ws = /\s*/ ;`.
  - **V-8 plus the Repair 1 frozen pin.** ⟨`npx vitest run test/css/`⟩ ×2 → `Test Files 5 passed (5)`, `Tests 51 passed (51)`.
  - **P-1..P-3.** ⟨`npx vitest run`⟩ in `../parse-that-x-p-w7/typescript` ×2 → `Tests 143 passed (143)`. HEAD is `96e68e9`.
  - **T-1.** ⟨`npx vitest run`⟩ in `../bbnf-lang-x-p-w7-typescript/typescript` ×2 → `Tests 277 passed (277)`.
  - **T-6 and the Z-4 preflight.** ⟨`git diff --name-only origin/master...HEAD | grep -vc '^typescript/'`⟩ → `0`. HEAD = `origin/x-p-w7-typescript` = `373ca34a6`. ⟨`gh pr view 1`⟩ → `OPEN MERGEABLE 373ca34a6…`. Local master is `af15f63e0`, unchanged.
  - **12 gate rows reproduced, 0 failed to reproduce.** P-5, T-2..T-5, E-1..E-7 and V-4 are cited, on parse-that and bbnf-lang bytes that have not moved.
- **(2) File bounds.** Check 1 covered all 18 commits up to `f7b71132`. The three new commits are `8b08db4b` (`src/css/bbnf/{math,value}.ts` and the new `test/css/bbnf-frozen.test.ts`, all in `.v`'s set), `0ff2b6fd` (`bench/records/2026-09-23-x-p-w7-repair1-r{1,2}.json`, which is `bench/**` and inside the wave's §File Bounds as `.o`'s "records") and `7e65bc06` (this record plus one LEDGER line). ⟨`git diff --stat 0b64d20c..HEAD -- scripts/dev/dev.sh package.json package-lock.json .github`⟩ → empty. **GREEN.**
- **(3) Masking.** I read ⟨`git show 8b08db4b -- src`⟩ whole. It contains no try/catch, no skip and no allowlist. The freeze moves to the result layer, and that is proved, not assumed: Repair 1's audit found `255496` objects with `0` unfrozen, and the new test pins it (15 cases, GREEN in the 51/51 above). `selectorKeyword`'s `token.length === 4` relies on the grammar leaf having proved `from|to`, and V-1's 0 extra mismatches over 1,376,531 rows confirms it. **None found.**
- **(4) Commit families.** C1-1's cure is one commit, and the evidence is in a separate bench commit. The dependency-move family has still not landed, so it is not split. **GREEN.**
- **(5) E-3.** ⟨`git diff --stat 0b64d20c..HEAD -- docs/tranches/X/parse-that/waves docs/tranches/V/megatranche/registry/adjudicated docs/tranches/X/parse-that/evidence/W7-research`⟩ → empty. **GREEN.**
- **(6) Mail.** ⟨`find <path> -maxdepth 1 -type f -newer INBOX.md`⟩ over the six paths → 0, except glass-ui `BL/`, which has 1 file, `FORMATION-PROGRESS.md`. That is glass-ui BL's own resume cursor, not a letter, and it is not in this wave's scope. **0 UNREAD in scope.**
- **(7) Four-verb.** Repair 1 left the row PARTIAL and stamped no verb. **GREEN.**
- **(8) Goal at the bytes.** The steady-state half is now **MET on Node (V8)**: every entry is below 1.00 on whole and accepted cells, ×2. The goal as bound by the §0ck addendum is still **NOT MET**. G-browser says "must not be slower than the retired parser on any engine, per entry", and the last reading is SpiderMonkey parseStylesheet at 1.08–1.27 and parseCssColor at 0.98–1.04. G-large also reads over 1: WebKit large sheets at 1.28–1.29, and the Node `large` class has one cell over 1 per run. §0ck 7 ("value.js runtime carries no parse-that and no bbnf-lang") is also unmet: ⟨`package.json` deps⟩ → `{"@mkbabb/bbnf-lang":"0.1.4","@mkbabb/parse-that":"0.8.2"}` and ⟨`grep -c bbnf ci.yml`⟩ → `0`.
- **(9) Published figures.** Repair 1's figures reproduce within noise: accepted keyframe .924/.924 (mine .955/.911), whole-7/7 and accepted-7/7 GREEN ×2, 88 = F-b-4, 19/19, 51/51 and 924/927. **GREEN.**
- **(10) Honest-RED adjudication, gate by gate at the spec bytes:**
  - **K-1 / V-3 accepted.** Now **GREEN** ×2 (above), so it no longer needs relief. **Z-2**, however, is defined "on the published pins" (W7.md 138), so it cannot be read until C2-1 is cured.
  - **P-6, E-8, V-9 plus the CI `bbnf gen --check` step, Z-1, and Z-3's publish-dependent half.** R-1 and W7.md 64, 100, 102–104 and 132–140 make these this wave's own release acts. parse-that and bbnf-lang are *Written* here, not relayed (W7.md 143–146), so the acts are not producer-owned. No successor wave receives them, and the spec names no honest-RED id for them. They are walled by the npm `EOTP` second factor, which only the owner can supply. Precedent is §0bx, where npm E401 was ruled an OWNER ACT, but that ruling held the wave open; it did not close it honest-RED. **No relief.** The owner is named: ESC-W7p-1 = e-1 = v-1 = z-1, the owner OTP.
  - **V-5 (G-browser) and V-6 (G-large).** The §0ck addendum makes these binding gates and supersedes the "recorded, not gated" lines at W7.md 116 and 151. **No relief.** The owner is named: the ESC-W7v-2 ruling, which is still unwritten in COHESION. V-5(a), accepted keyframe on every engine, may have cleared with C1-1, but it has not been re-read: the engine harness was lost with the scratchpad wipe (§0cn), and I did not rebuild it under probe parsimony. V-5(b), SpiderMonkey parseStylesheet and color, and V-6 sit on bytes that C1-1 did not target.
  - **Z-3's relay half and the COHESION addendum (R-z-2).** The spec assigns these to `.z`, and `.z` re-opens after C2-1. This is not a defect of its own (MINOR).
  - **O-1 `check`.** It reads RED by construction on the moved product (R-close-1). V-1 mitigates it: 88 = F-b-4 exactly, ×2.
- **Successor "Opens after" conjuncts.** These are unchanged from Check 1. X-W11 opens after "X-W0 … X-W10 IMPLEMENTED", and §0ck:3189 adds "value.js publishes at X-W11, after X.P.W7". The X.P.W7 conjunct is **RED** (PARTIAL), so X-W11 is lawfully BLOCKED on it. ⟨`grep -rn "Opens after" docs/tranches/X | grep "P\.W7"`⟩ → no wave spec names X.P.W7. keyframes.js receives the parser only at X-W11.

### Register (severity · claim · receipt · cure)
| # | Severity | Claim | Receipt | Cure |
|---|---|---|---|---|
| C2-1 | HIGH | The release chain has not run: parse-that 2.0.0 and bbnf-lang 0.2.0 are unpublished; value.js runtime `dependencies` still carry both; there is no CI `--check` step; Z-1 and Z-2 (on published pins) cannot be read. These are this wave's own acts (R-1), with no spec relief. Carried from C1-2. | ⟨`npm view … versions --json \| tail -3`⟩ → `"0.13.0","1.0.0"` · `"0.1.3","0.1.4"`; deps as in (8); ci.yml `bbnf` 0 | The owner supplies the npm OTP (ESC-W7p-1 chain, Close Residuals steps 1–4). Then the ESC-W7v-1 seat pins devDependency 0.2.0, drops both packages from runtime and appends the ci.yml step. `.z` re-opens and reads Z-1..Z-4 on the published pins. |
| C2-2 | HIGH | G-browser and G-large are RED with no relief: V-5 (SpiderMonkey parseStylesheet 1.08–1.27, parseCssColor 0.98–1.04; V-5(a) not re-read since C1-1) and V-6 (WebKit large 1.28–1.29; Node `large` has one cell over 1 per run). Carried from C1-3. | `.v`/`.k` receipts (record lines 412–418, 489); COHESION has 0 hits for `W7v-2` | Write the ESC-W7v-2 COHESION ruling, which grants the W7.md (g) emitter levers (each admitted only if it regresses no entry) and the R-v-3 instrument fix for the k = 1 `large` class. Rebuild the engine harness, then re-read V-5 and V-6 ×2. |
| C2-3 | MINOR | The relays and the COHESION addendum are unsent (R-z-2). | INBOX has no W7 relay row | `.z` re-open, after C2-1. |
| C2-4 | MINOR (mitigated) | `oracle.mjs check` cannot re-read O-1 on the moved product (R-close-1). | Close O-1 | V-1 stands (88 = F-b-4 ×2). Add a frozen-arm mode in `bench/**` at `.z`. |
| C2-5 | INFO | Repair 1 cured C1-1 cleanly. `8b08db4b` follows W7.md 111's own lever, the freeze move is proved (255,496 objects, 0 unfrozen) and pinned by a test, and K-1 is GREEN ×2 at this seat. | (1) above | none |

**Honest-RED set: none.** No remaining RED gate is relieved under axis (10). Each one has a named owner: the owner OTP for C2-1, and the ESC-W7v-2 ruling for C2-2. **gatesReproduced 12 · gatesFailed 0.** The LEDGER status stays **PARTIAL**: I replaced its K-1 clause, which is now GREEN, and appended an event line. **Adjacent edits: none. Out-of-set writes: none.** The bench records went to the scratchpad, and `bench/records/` is clean.

## Repair 2

**Seat:** `claude-opus-5-5`, 2026-09-24, repair round 2 against the Check 2 register. **Verdict: nothing curable inside the wave's bounds; 2 HIGH escalated, 2 MINOR deferred, 0 cured.** I read the spec whole (190 lines, incl. the §0ck addendum). From the record I read the header through the Unit plan, Repair 1 and Check 2; the rest by grep.

**Crash recovery.** ⟨`git status --porcelain src bench test/css scripts/gen-grammar.mjs package.json package-lock.json .github docs/tranches/X/execution/D docs/tranches/X/COHESION.md docs/tranches/X/relay docs/tranches/V/coordination/INBOX.md`⟩ → empty. ⟨`git -C ../parse-that-x-p-w7 status --porcelain`⟩ → empty (HEAD `96e68e9`). ⟨`git -C ../bbnf-lang-x-p-w7-typescript status --porcelain`⟩ → empty (HEAD `373ca34a6`). **No inherited work.** parse-that master's dirty rows (`rust/**`, `README.md`, …) are L-3's other program and were not touched.

### Defect → cure → commit → gate re-reading
- **C2-1 (HIGH) release chain → ESCALATED (ESC-W7p-1 = e-1 = v-1 = z-1), not cured.** The wall has hardened since Check 2: ⟨`npm whoami`⟩ → `npm error code E401 · 401 Unauthorized - GET https://registry.npmjs.org/-/whoami`, so the npm session itself is gone, not only the `EOTP` second factor. ⟨`npm view @mkbabb/parse-that versions --json | tail -3`⟩ → `"0.13.0", "1.0.0"` · ⟨`npm view @mkbabb/bbnf-lang versions --json | tail -3`⟩ → `"0.1.3", "0.1.4"`. P-6/E-8 need `npm whoami` = `mkbabb` (W7.md 64, 100), and V-9 and the CI `--check` step need the published 0.2.0 (`scripts/gen-grammar.mjs` throws without the 0.2.0 `bbnf` bin; pinning an unpublished version breaks `npm ci`). Owner act: `npm login` again, then the OTP publish chain in Close Residuals steps 1–4. The bbnf-lang PR is ready: ⟨`gh pr view 1 --json state,mergeable`⟩ → `OPEN MERGEABLE`.
- **C2-2 (HIGH) V-5 / V-6 → ESCALATED (ESC-W7v-2), not cured.** ⟨`grep -n "W7v-2\|W7p-1\|EOTP\|OTP" docs/tranches/X/COHESION.md`⟩ → 0 hits. The last addenda are §0cn (reboot) and §0co (OA-56, keyframes), so there is still no ruling. The register's cure is a COHESION ruling, which this seat cannot write. It is not `.z`'s close addendum, and it is not in any unit's writable set. The levers themselves (W7.md (g) F8/F1) live in bbnf-lang's emitter. They reach value.js only through `bbnf gen` (`.k`: "`src/css/bbnf/generated/` (through `bbnf gen` only)") plus a patch release, and both sit behind C2-1. The R-v-3 `large`-class k = 1 fix would lie in `bench/**`, but it would move only the Node `large` cell. WebKit large (1.28–1.29) and SpiderMonkey parseStylesheet/color stay RED without the emitter levers, so landing it alone would cure nothing and would tune the instrument towards a GREEN. I did not land it. V-5(a) is still not re-read: the harness is gone (§0cn), and rebuilding it for bytes the ruling has not yet moved would break probe parsimony.
- **C2-3 (MINOR) relays and COHESION addendum → deferred to `.z`** after C2-1. The cure is not one command.
- **C2-4 (MINOR, mitigated) frozen-arm `oracle.mjs` → deferred to `.z`.** It needs a second build of the `.o`-era `src/`, which is not one command. V-1 stands (88 = F-b-4 ×2, Check 2).
- **C2-5 (INFO).** None.

**Gate re-reading.** No product, bench, parse-that or bbnf-lang byte moved in this round, so no gate could move. The readings of record stay Check 2's (whole-7/7 and accepted-7/7 GREEN ×2, V-1 88 = F-b-4, 19/19, 51/51, 924/927). The two walls above were re-read live.

**Tally:** cured 0 · escalated 2 (C2-1 owner `npm login` + OTP; C2-2 ESC-W7v-2 ruling) · deferred MINOR 2 · INFO 1. **Adjacent edits: none. Out-of-set writes: none.** `scripts/dev/dev.sh` was not touched. The row stays **PARTIAL**.

## Check 3

**Seat:** `claude-opus-5-5`, 2026-09-24, fresh adversarial check (L-20 pass 3), verify-only. **Verdict: NOT-CONFORMANT.** Every GREEN I re-ran reproduces, ×2 (12 gate rows, 0 failed). No product, bench, parse-that or bbnf-lang byte has moved since Check 2, and neither wall has moved: the npm session is still gone and COHESION still has no ESC-W7v-2 ruling. So the two HIGH rows carry over unrelieved. The row stays **PARTIAL**.

**Open.** I read the spec whole (190 lines, incl. the §0ck addendum). From this record I read the header through the Unit plan, the Close, Check 2 and Repair 2; everything else by grep. **Crash recovery:** ⟨`git status --porcelain docs/tranches/X/execution/D/X-P-W7.md docs/tranches/X/execution/LEDGER.md src bench test/css package.json package-lock.json .github`⟩ → empty. `../parse-that-x-p-w7` is clean at `96e68e9`; `../bbnf-lang-x-p-w7-typescript` is clean at `373ca34a6` = `origin/x-p-w7-typescript`. parse-that master's dirty `rust/**`, `README.md` and `.cargo/config.toml` rows belong to L-3's other program, untouched. **No inherited work.**
**What moved since Repair 2:** ⟨`git log --oneline 8b08db4b..HEAD -- src package.json package-lock.json bench test/css .github scripts/gen-grammar.mjs`⟩ → only `0ff2b6fd` (Repair 1's banked records). ⟨`grep -n "W7v-2\|W7p-1\|EOTP" COHESION.md`⟩ → 0 hits; the last addenda are §0cn and §0co. ⟨`npm whoami`⟩ → `E401 Unauthorized`. ⟨`npm view @mkbabb/parse-that versions --json | tail -3`⟩ → `"0.13.0", "1.0.0"` · ⟨`npm view @mkbabb/bbnf-lang versions --json | tail -3`⟩ → `"0.1.3", "0.1.4"`.

### Axes
- **(1) Claimed GREENs, re-run by this seat on HEAD `95d143b4` (product bytes = `8b08db4b`):**
  - **V-3 whole and K-1 / V-3 accepted.** ⟨`node bench/paired/build.mjs`⟩ → `valuejsHead 95d143b4…`, `srcDirty ""`, `bankedManifestOk 79/79`. Then ⟨`node --expose-gc bench/paired/isolated.mjs chk3-r{1,2} product 3 11 whole,acc`⟩. Load: r1 `18.22 22.82 45.51` → `29.63 25.68 44.12`; r2 → `23.06 24.17 42.28`. Set aside and counted: r1 17 cells, r2 4. Gates: `whole-7/7 GREEN 7/7` ×2 and `accepted-7/7 GREEN 7/7` ×2.
    - accepted medians, r1 · r2: color .566 · .595 · scalar .618 · .619 · value .406 · .399 · values .444 · .413 · **keyframe .927 · .919** (cells .927/.938/.918 and .919/.939/.915) · timing .648 · .678 · stylesheet .846 · .840.
    - whole medians, r1 · r2: color .677 · .650 · scalar .641 · .592 · value .463 · .437 · values .457 · .437 · keyframe .659 · .657 · timing .633 · .630 · stylesheet .713 · .700. Every one is inside its V-3 ceiling (.90/.81/.57/.58/.78/.87/.85).
    - The records were moved from `bench/records/` to scratchpad `chk3/`, not banked. ⟨`git status --porcelain bench src test`⟩ → empty.
  - **V-1.** ⟨`node bench/paired/equiv.mjs product`⟩ ×2 → `compared 1376531/1376531 rows · mismatches 88 (ASCII-only sources 0)`. Keyed on (section, key) against `bench/paired/oracle/F-b-4.json` ×2 → `inter 88 onlyP 0 onlyF 0`.
  - **V-2.** ⟨`npm run test:css-equivalence`⟩ ×2 → `Tests 19 passed (19)`, `MIRROR-DEFECTS [1-9]` 0 hits. ⟨`npx vue-tsc -p tsconfig.lib.json --noEmit | grep -c "error TS"`⟩ → `0`. ⟨`npm test`⟩ → `Tests 3 failed | 924 passed (927)`: C-5 `spectrum-luma` (self-labelled BORN-RED), G16 A1 `format-color` (Track A, R-v-2) and NG-6 `reka-binding-idiom`. All three are foreign to the CSS parser, and the list is identical to Check 2's.
  - **V-7.** `GRAMMAR_MODULES` 0 · `reset()|new ParserState` 0 · case-pair classes inside `/…/i` 0 · `tokens.bbnf:14 ws = /\s*/ ;`.
  - **V-8 plus the Repair 1 frozen pin.** ⟨`npx vitest run test/css/`⟩ ×2 → `Test Files 5 passed (5)`, `Tests 51 passed (51)`.
  - **P-1..P-3.** ⟨`npx vitest run`⟩ in `../parse-that-x-p-w7/typescript` ×2 → `Tests 143 passed (143)`. **P-4** ⟨`npm run proof:all`⟩ ×2 → the same 9 GREEN/PASS lines each time, plus `FAIL: proof:perf`, which is the ruled PT-PERF-LOAD reading (R-p-1, §0ci).
  - **T-1.** ⟨`npx vitest run`⟩ in `../bbnf-lang-x-p-w7-typescript/typescript` ×2 → `Tests 277 passed (277)`.
  - **T-6 and the Z-4 preflight.** ⟨`git diff --name-only origin/master...HEAD | grep -vc '^typescript/'`⟩ → `0`. ⟨`gh pr view 1 --json state,mergeable,headRefOid`⟩ → `OPEN MERGEABLE 373ca34a6…`. ⟨`git -C ../bbnf-lang rev-parse --short master`⟩ → `af15f63e0`, unchanged.
  - **12 gate rows reproduced, 0 failed to reproduce.** P-5, T-2..T-5, E-1..E-7 and V-4 are cited; their parse-that and bbnf-lang bytes have not moved.
- **(2) File bounds.** The two commits since Check 2 are `d17f8c7f` (Check 2) and `5c349459` (Repair 2). ⟨`git show --stat 5c349459`⟩ → this record plus `LEDGER.md` (4 lines). Both paths are the seats' own. But the LEDGER hunk carries two lines that are **not** W7's: it rewrote Track C's F.W14 row cell and appended Track C's `X.F.W14 RESUME 2 CLOSE 2` event line. These were a concurrent Track C seat's uncommitted edits in the shared working file, and the pathspec commit of the whole file took them in. Track C repaired it in `95d143b4` ("LEDGER row cells re-seated (5c349459 swept them into the wrong cells)"). No product path is involved. ⟨`git diff --stat 0b64d20c..HEAD -- scripts/dev/dev.sh package.json package-lock.json .github`⟩ → empty. **In bounds, with one MINOR (C3-3).**
- **(3) Masking.** No product byte moved since Check 2, which read `8b08db4b` whole and found none. **None found.**
- **(4) Commit families.** No family commit landed. The dependency-move family (§Unit plan "Same-commit families") has still not landed, so it is not split. `5c349459`'s swept sibling lines break "one commit per meaning" (C3-3). **GREEN otherwise.**
- **(5) E-3.** ⟨`git diff --stat 0b64d20c..HEAD -- docs/tranches/X/parse-that/waves docs/tranches/V/megatranche/registry/adjudicated docs/tranches/X/parse-that/evidence/W7-research`⟩ → empty. **GREEN.**
- **(6) Mail.** ⟨`find <path> -maxdepth 1 -type f -newer INBOX.md`⟩ over value.js `V/` + `V/coordination/`, glass-ui `BK/coordination/` + `BL/` (⟨`ls -t glass-ui/docs/tranches`⟩ → `BL BK BJ`), keyframes.js `V/coordination/` and atlas `P/coordination/` → 0, except glass-ui `BL/FORMATION-PROGRESS.md`, which is BL's own resume cursor, not a letter. **0 UNREAD in scope.**
- **(7) Four-verb.** Repair 2 left the row PARTIAL and stamped no verb. **GREEN.**
- **(8) Goal at the bytes.** The steady-state bar is **MET on Node (V8)**: every entry is below 1.00 on whole and accepted cells, ×2 (above). The goal as bound by the §0ck addendum is **NOT MET**. G-browser (V-5) and G-large (V-6) were last read over 1.00 (SpiderMonkey parseStylesheet 1.08–1.27, parseCssColor .98–1.04; WebKit large 1.28–1.29), and nothing has moved them. §0ck 7 is unmet: ⟨`package.json` deps⟩ → `{"@mkbabb/bbnf-lang":"0.1.4","@mkbabb/parse-that":"0.8.2"}`, devDeps `{}`, and ⟨`grep -c "bbnf\|gen-grammar" ci.yml`⟩ → `0`.
- **(9) Published figures.** Check 2's and Repair 1's figures reproduce within noise: accepted keyframe .955/.911 (Check 2) and .924/.924 (Repair 1), against mine .927/.919; whole-7/7 and accepted-7/7 GREEN ×2; 88 = F-b-4; 19/19; 51/51; 924/927; 143/143; 277/277. **GREEN.**
- **(10) Honest-RED adjudication, gate by gate at the spec bytes:**
  - **P-6, E-8, V-9 plus the CI `bbnf gen --check` step, Z-1, Z-2 on published pins, and Z-3's publish-dependent half.** These are this wave's own release acts: R-1 and W7.md 64, 100, 102–104 and 132–140. parse-that and bbnf-lang are *Written* here, not relayed (W7.md 143–146), so the acts are not producer-owned. No successor wave receives them, and the spec names no honest-RED id for them. The wall is the owner's npm login (E401) and then the OTP. That makes it an owner act, as §0bx ruled for E401, which holds a wave open; it does not close one. **No relief.** Owner named: ESC-W7p-1 = e-1 = v-1 = z-1.
  - **V-5 (G-browser) and V-6 (G-large).** The §0ck addendum makes these binding gates, and it supersedes the "recorded, not gated" lines at W7.md 116 and 151. **No relief.** Owner named: the ESC-W7v-2 COHESION ruling, still unwritten.
  - **Z-3's relay half and the COHESION addendum (R-z-2).** The spec assigns these to `.z`, and `.z` re-opens after C3-1. MINOR.
  - **O-1 `check`.** It reads RED by construction on the moved product (R-close-1). V-1 mitigates it: 88 = F-b-4 exactly, ×2.
- **Successor "Opens after" conjuncts.** These are unchanged from Checks 1 and 2. X-W11 opens after "X-W0 … X-W10 IMPLEMENTED", and §0ck:3189 adds "value.js publishes at X-W11, after X.P.W7". The X.P.W7 conjunct is **RED** (PARTIAL), so X-W11 is lawfully BLOCKED on it. ⟨`grep -rn "Opens after" docs/tranches/X | grep "P\.W7"`⟩ → no wave spec names X.P.W7. No Track D row follows X.P.W7 in the LEDGER. keyframes.js receives the parser only at X-W11.

### Register (severity · claim · receipt · cure)
| # | Severity | Claim | Receipt | Cure |
|---|---|---|---|---|
| C3-1 | HIGH | The release chain has not run: parse-that 2.0.0 and bbnf-lang 0.2.0 are unpublished; value.js runtime `dependencies` still carry both; there is no CI `--check` step; Z-1 and Z-2 (on published pins) cannot be read. These are this wave's own acts (R-1), with no spec relief. Carried from C1-2 and C2-1. | ⟨`npm whoami`⟩ → E401; ⟨`npm view … versions`⟩ → `1.0.0` · `0.1.4`; deps as in (8); ci.yml 0 hits | The owner runs `npm login`, then supplies the OTP for the chain in Close Residuals steps 1–4. The ESC-W7v-1 seat then pins devDependency 0.2.0, drops both packages from runtime and appends the ci.yml step. `.z` re-opens and reads Z-1..Z-4 on the published pins. |
| C3-2 | HIGH | G-browser and G-large are RED with no relief: V-5 (SpiderMonkey parseStylesheet 1.08–1.27, parseCssColor .98–1.04; V-5(a) not re-read since C1-1) and V-6 (WebKit large 1.28–1.29). Carried from C1-3 and C2-2. | `.v`/`.k` receipts; COHESION has 0 hits for `W7v-2` | Write the ESC-W7v-2 COHESION ruling, which grants the W7.md (g) emitter levers (each admitted only if it regresses no entry) and the R-v-3 `large`-class fix. Rebuild the engine harness, then re-read V-5 and V-6 ×2. |
| C3-3 | MINOR (mitigated) | Repair 2's commit `5c349459` took in a concurrent Track C seat's uncommitted LEDGER edits: the F.W14 row cell and a Track C event line. That breaks one commit per meaning. | ⟨`git show 5c349459 -- LEDGER.md`⟩ → the `\| F.W14 \|` cell rewritten and the `X.F.W14 RESUME 2 CLOSE 2` line added | Mitigated by Track C's `95d143b4`, which re-seated its cells. Before any LEDGER commit, a seat reads `git diff LEDGER.md`; if a sibling's hunk is present, the seat waits or commits only its own hunk. |
| C3-4 | MINOR | The relays and the COHESION addendum are unsent (R-z-2). Carried from C2-3. | INBOX has no W7 relay row | `.z` re-open, after C3-1. |
| C3-5 | MINOR (mitigated) | `oracle.mjs check` cannot re-read O-1 on the moved product (R-close-1). Carried from C2-4. | Close O-1 | V-1 stands (88 = F-b-4 ×2). Add a frozen-arm mode in `bench/**` at `.z`. |

**Honest-RED set: none.** No remaining RED gate is relieved under axis (10). Each one has a named owner: the owner's `npm login` and OTP for C3-1, and the ESC-W7v-2 ruling for C3-2. **gatesReproduced 12 · gatesFailed 0.** The LEDGER status stays **PARTIAL**. I appended one event line and did not change the row cell. **Adjacent edits: none. Out-of-set writes: none.** The bench records went to the scratchpad, `bench/records/` is clean, and `scripts/dev/dev.sh` was not touched.

## RESUME 2026-09-24 — Open (seat 0, `claude-opus-5-5`, Track D; §0cp + W7.md ADDENDUM 2026-09-24)

- **Mode:** RESUME. ⟨`grep -n "| X.P.W7 |" LEDGER.md`⟩ → status `PARTIAL — npm-OTP publish chain … + ESC-W7v-2 ruling …` (not CLOSED); this record exists. Governing text: W7.md's 2026-09-24 ADDENDUM (read whole with the spec, 214 lines) and COHESION §0cp (read to the file end, line 3319). Read from this record: header through `## Unit plan`, and `## Check 3` (the last section). No `.k2`/`.g` receipt exists (⟨`grep -n "k2\|W7\.g" X-P-W7.md`⟩ → 0 prior hits).
- **alreadyDone (§0cp: "alreadyDone: `.o .p .t .e .v .k`. Their commits stand"), verified at the bytes:** value.js ⟨`git log --oneline`⟩ → `.o`…`.v` `3cdd4888` · `.v` receipt `07732e1d` · `.k` `065ba11e` + receipt `3d4029fa` · `.z` receipt `07f048d1` · Repair 1 `8b08db4b`; parse-that ⟨`git -C ../parse-that-x-p-w7 log --oneline -1`⟩ → `96e68e9` (`.p`); bbnf-lang ⟨`git -C ../bbnf-lang-x-p-w7-typescript log --oneline -1`⟩ → `373ca34a6` (`.e`, branch `x-p-w7-typescript`). `.z` re-opens only in X.P.W7P (never here).
- **Crash-recovery:** ⟨`git status --porcelain -- src bench test package.json package-lock.json .github scripts/gen-grammar.mjs <record> LEDGER.md INBOX.md`⟩ → empty; `../parse-that-x-p-w7` clean; `../bbnf-lang-x-p-w7-typescript` clean at `373ca34a6`. **No inherited partial work.**
- **Preconditions:** the owed units open on §0cp's ruling (not on a predecessor wave): ⟨`grep -n "^## §0cp" COHESION.md`⟩ → `3303`; W7.md:192 ADDENDUM present; the linked worktrees exist at the commits above (L-1: engineering gates read on the linked worktrees). The release chain is X.P.W7P ⟨LEDGER:102⟩ → `GATE-KEYED 2026-09-24 on the owner's npm one-time password`. **MET.** No npm act in this wave.

### E13 Step-0 mail sweep (2026-09-24)
- ⟨`ls -t glass-ui/docs/tranches | head -3`⟩ → `BL BK BJ` (BL has no `coordination/`; BK stays the mail path, BL's root swept too).
- ⟨`find <path> -maxdepth 1 -type f -newer INBOX.md`⟩ over value.js `V/` + `V/coordination/` · glass `BK/coordination/` + `BL/` · keyframes.js `V/coordination/` · atlas `P/coordination/` → 0, except glass `BL/FORMATION-PROGRESS.md` (BL's own cursor, not a letter). INBOX last rows I-47 · O-69.
- **Result: 0 unrowed · 0 UNREAD in scope.** A sweep line was appended to INBOX.md.

## RESUME Baseline (BEFORE, read-only, 2026-09-24; product bytes `8b08db4b`, HEAD `8d916780`)

RESUME rule: only the gates `.k2`/`.g` turn are re-read; every other gate is cited from Check 3 (12 GREENs ×2: V-1 88 = F-b-4, css-equivalence 19/19, css 51/51, `npm test` 924/927 with 3 foreign, vue-tsc 0, whole-7/7 GREEN ×2, parse-that 143/143, bbnf-lang 277/277, T-6 0).

| Gate | Unit | Command | BEFORE | Reading |
|---|---|---|---|---|
| K2-a node acc/rej halves | `.k2` | ⟨`node bench/paired/build.mjs`⟩ → `srcDirty ""`, `bankedManifestOk 79/79`; ⟨`node --expose-gc bench/paired/isolated.mjs w7-resume-base product 3 11 acc,rej,large`⟩ (load `20.35` → `25.23`) | `accepted-7/7 RED 6/7`: acc keyframe cells **.950 / .898 / 1.007** (median .950); acc color .604 · scalar .658 · value .398 · values .430 · timing .665 · stylesheet .865. `rejected-7/7 GREEN 7/7` (color … stylesheet .698) | **born-RED** (accepted keyframe 1.007; the floor Repair 1 moved to ~.92 sits at noise distance from 1) |
| K2-a/G-1 browsers (V-5) | `.k2`/`.g` | cited: `.v` receipt (record:412–416), `.k` receipt (record:490); the scratch harness is gone (`find` over the scratchpads → none) | Chromium acc keyframe 1.254/1.269 · WebKit acc keyframe 1.200/1.115 · Firefox whole/acc/rej stylesheet 1.08–1.27, color .98–1.04 (read before Repair 1's `8b08db4b`; not re-read here, probe parsimony — no harness in the tree) | born-RED (cited) |
| G-2 large (V-6) node | `.g` | same run, `large` class | clean cells .588 / 1.507 / .527 — **3 set aside** (spread ≥1.6; one set-aside cell 1.228, one 1.507 at k = 1) | **born-RED** (the R-v-3 k = 1 artefact reproduces) |
| G-2 large WebKit | `.g` | cited `.k` receipt | 1.286 / 1.286 | born-RED (cited) |
| K2-b post-hoc walk | `.k2` | ⟨`grep -rn deepFreeze src`⟩ | `src/css/result.ts:13` def · `:23 value: deepFreeze(value)` | born-RED |
| K2-b re-split | `.k2` | ⟨`grep -n NUMERIC src/css/bbnf/math.ts`⟩ | `:37 const NUMERIC = …` · `:41 NUMERIC.exec(token)` (angle/dimension leaves) | born-RED |
| G-3 levers | `.g` | ⟨`grep -n "fus\|keyword" typescript/src/emit.ts`⟩ @ `373ca34a6` | 0 lever hits | born-RED |
| R-v-3 warm-up | `.g` | `bench/paired/bench.mjs:33-35` | k sized on the cold retired pass, warm-ups after it | born-RED |

**greenBeforeCure: none.** Record moved to scratchpad `w7-resume/2026-09-23-x-p-w7-w7-resume-base.json` (sha256 `7b683a023f26…`), log `w7-resume/base.log`; ⟨`git status --porcelain bench src`⟩ → empty.

## RESUME Unit plan (2026-09-24)

**alreadyDone:** `.o .p .t .e .v .k` (never re-dispatched; §0cp). **`.z`:** re-opens only in X.P.W7P (never here). **Owed, strictly serial** (W7.md:214 "Owed, strictly serial: `[X.P.W7.k2]`, then `[X.P.W7.g]`, then close"), one concurrent: `[.k2] → [.g]` → close. Every seat Opus 5.5 (owner's Opus-only order, 2026-09-23). ESCALATED units do not halt the wave.

### Rulings cited (never re-opened)
§0cp (release chain → X.P.W7P, GATE-KEYED on the owner's OTP; `.k2` + `.g` minted; LEDGER hunk hygiene) · §0ck 1–7 (as cited in the first Unit plan) · §0ci R-1..R-3 · §0bt ADJACENT-LINE RULE.

### Locks
- **L-1 (strict order):** `.g` dispatches only after `.k2`'s commits exist; `.g`'s lever admission is measured on `.k2`'s product bytes.
- **L-4 (bbnf-lang):** writes only in `../bbnf-lang-x-p-w7-typescript` on `x-p-w7-typescript`; push the branch only; never local master; PR #1 stays open (its merge is X.P.W7P's `.z`). Any re-emission of `src/css/bbnf/generated/` goes through `node scripts/gen-grammar.mjs` only, and `--check` must pass after.
- **L-6 (no npm):** no `npm publish`, no version bump, no `package.json`/lockfile dependency move in this wave (X.P.W7P).
- **L-7 (LEDGER, §0cp 4 / C3-3):** before any commit touching `LEDGER.md`, read `git diff` on it; if a sibling's hunk is present, stage only this seat's lines (`git apply --cached` of the own hunk) or wait.
- **Same-commit families:** `.k2` Cure 1 (the leaf's matched split in the emitter + `tokenQuantity` consuming it + the re-emitted module) is ONE meaning per repo (bbnf-lang emitter commit; value.js consumer + regenerated module commit); `.k2` Cure 2 (freeze at construction + removal of the `deepFreeze` walk + the pinning test) ONE value.js commit. `.g`: one commit per admitted lever in bbnf-lang, each with its value.js re-emission beside it; the R-v-3 instrument fix its own `bench/**` commit.

### `[X.P.W7.k2]` — the accepted-input floor (W7.md 192–214: ADDENDUM 2026-09-24 §2; §0cp)
- **Writable:** value.js `src/css/bbnf/**` (incl. `math.ts`, `generated/` through `node scripts/gen-grammar.mjs` only), `src/css/result.ts` (the success-freeze helper) and its callers under `src/css/**`, `test/css/**` (the immutability pin; §0bt adjacent) · bbnf-lang `typescript/**` on `x-p-w7-typescript` (the leaf split) · this record. `src/css/grammar/tokens.bbnf` only under §0bt if the leaf's groups strictly require it (list it as an adjacent edit).
- **Acts:** (1) re-profile the 56 accepted keyframe selectors (BEFORE: emitter ~30 ns, actions ~76 ns, `deepFreeze` 100–110 ns; `tokenQuantity` + its re-splitting `NUMERIC` regex ~24%); (2) Cure 1: the emitted regex leaf hands `tokenQuantity` its number/unit split as matched groups (emitter + action-kind contract in bbnf-lang; value.js consumes the groups; no second regex over the same text; `NUMERIC` leaves); (3) Cure 2: every node is built frozen at construction (`quantity`, `numberQuantity`, `percentageQuantity`, color/value/sheet nodes); `result.ts`'s `deepFreeze` walk is deleted; `success` freezes only its own envelope; (4) a test pins "results are immutable": `Object.isFrozen` deep on sampled results from all 7 entries (extend `test/css/bbnf-frozen.test.ts`); (5) re-emit, `--check`, V-1/V-2 stay GREEN; (6) read the gate.
- **Gates:** K2-a accepted AND rejected halves, every entry, < 1.00 paired, ×2, load recorded, on node (`bench/paired/isolated.mjs … acc,rej`) AND Chromium, WebKit, Firefox (browser harness in the scratchpad; the `.v`/`.k` scratch harness is gone — rebuild it from `.v`'s receipt, W7 record:412; Firefox at a 100 ms floor) · K2-b ⟨`grep -n deepFreeze src/css`⟩ → 0 and ⟨`grep -n NUMERIC src/css/bbnf/math.ts`⟩ → 0 · K2-c deep-frozen pin GREEN · stay-GREEN: V-1 88 = F-b-4 ×2, `test:css-equivalence` 19/19, `npm test` 924/927 (3 foreign), `vue-tsc` 0, `gen-grammar --check` 0, whole-7/7 inside ceilings, bbnf-lang TS 277+/277+.
- **Locks:** L-1, L-4, L-6, L-7; Cure 1 and Cure 2 families.

### `[X.P.W7.g]` — the engine gaps (W7.md 94 (g); ADDENDUM 2026-09-24 §3; §0cp)
- **Writable:** bbnf-lang `typescript/**` on `x-p-w7-typescript` (the emitter levers) · value.js `src/css/bbnf/generated/` (through `gen-grammar` only) · value.js `bench/**` (R-v-3 warm-up fix; the browser harness promoted beside `bench/paired/`) · this record.
- **Acts:** (1) R-v-3 first: in `bench/paired/bench.mjs` a declared warm-up pass, identical for both arms, runs BEFORE the k-rule (today `bench.mjs:33-34` sizes k on the cold retired pass), and every rep is reported; promote the browser harness (Chromium/WebKit/Firefox, same page, paired, Firefox ≥100 ms floor) into `bench/paired/`; (2) one lever at a time on the emitter — F1 exact terminal-choice fusion, F7 same-action leaf fusion, F8 recognizer loops, keyword heads for the colour group — each re-emitted, `.e`'s gates re-read (E-1 emitted = runtime `compile()`, E-2 routing audit on the emitted module, E-4 determinism/`--check`, E-5 tsc, E-6 size, E-7 depth), and admitted ONLY if its own paired numbers regress no entry on any engine (node + 3 browsers), else reverted; memoization stays off; (3) V-5 + V-6 ×2 on all three engines + node.
- **Gates:** G-1 V-5 every entry × {whole, acc, rej} < 1.00 on Chromium, WebKit, Firefox ×2 · G-2 V-6 50–500 KB sheets < 1.00 on node + 3 engines ×2 · G-3 each admitted lever's paired before/after table, no regression · G-4 `.e` E-1..E-7 re-read on the final emitter · stay-GREEN as `.k2`.
- **Locks:** L-1 (after `.k2`), L-4, L-6, L-7; one commit per lever.

### Close (after `.g`)
Engineering gates binding (accepted + rejected halves under the retired parser on every engine, large sheets). Release gates P-6 · E-8 · V-9 + the CI step · Z-1 · Z-3 (publish half) relieved by citing X.P.W7P (§0cp; GATE-KEYED on the owner's npm one-time password). No `npm publish` in this wave.

## RESUME Unit receipts

### X.P.W7.k2

Seat `claude-opus-5-5`, 2026-09-24, Track D. Governing text: W7.md ADDENDUM 2026-09-24 §2 + §4 (read whole with the spec, 214 lines) · COHESION §0cp (read to the file end, §0ct) · the RESUME Unit plan above.

**Crash-recovery (inherited partial work, judged hunk by hunk).** ⟨`git status --porcelain -- src/css test/css <record>`⟩ → ` M src/css/bbnf/generated/grammar.{d.ts,js}` · ` M src/css/bbnf/math.ts` · ` M src/css/grammar/tokens.bbnf` (a killed predecessor seat's Cure 1, value.js half). ⟨`git -C ../bbnf-lang-x-p-w7-typescript log --oneline -1`⟩ → `6d5a2b4a0 feat(X.P.W7.k2): the groups action kind …` (the bbnf-lang half, committed); ⟨`git status -sb`⟩ → `## x-p-w7-typescript...origin/x-p-w7-typescript` (pushed, branch only; worktree clean). The predecessor had linked `node_modules/@mkbabb/bbnf-lang` → `scratchpad/k2/bbnf/typescript` (an archive of `6d5a2b4a0`; ⟨`diff -r typescript/src scratchpad/k2/bbnf/typescript/src`⟩ → identical), 0.1.4 set aside as `node_modules/@mkbabb/.bbnf-lang-0.1.4-aside-k2` (`.v`'s method, record:366/423). Every inherited hunk conforms to Cure 1 (judged below) and was kept; the inherited paths are named in act 2.

**Acts, in order.**
1. **Re-profile, the 56 accepted keyframe selectors** (scratch `k2/prof.mjs`: entry alone · entry + `keyframeSelector` action · the public call, 20,000 × 56 calls, reps 2–4 kept; load 32 → 70, so read as shape, not gate). ⟨`node prof.mjs prof-before.mjs`⟩ (BEFORE, `8b08db4b` bytes) → entry 77–92 · entry+actions 79–85 · **full 212–249 ns/call**; after Cure 1 → full 212–217; after Cure 2 → **full 167 ns/call** (entry 71–89). The floor the ruling named is what moved: the call minus entry+actions (the `success` walk) fell from ~130 ns to ~55 ns. ⟨freeze census, `k2/fc.mjs` (Object.freeze counted by call site over the `acc`/`rej` classes)⟩ → keyframe acc 2.75 freezes/source (success 1.00 · quantity 0.84 · percent 0.75); value rej 18.56 (scalar 2 × 2.52 · refused 1.92 · badTerm 2 × 1.90 · quantity 1.61).
2. **Cure 1 — the split from the leaf.** bbnf-lang `6d5a2b4a0` (inherited, committed and pushed by the predecessor on `x-p-w7-typescript`; PR #1 stays open): a rule whose body is one regex leaf with capturing groups takes `{ kind: "groups", fn(...groups) }`; value mode runs `exec` once and hands each group; recognize mode unchanged; `bbnf gen` refuses a groups action on any other body; `.d.ts` types it `GroupsAction` (7 files, `test/groups.test.ts` + `types.test.ts`). value.js **`8850d74d`** (inherited hunks, judged and committed by this seat): `tokens.bbnf` `dimension`/`angle` capture `(number)(unit)` — **adjacent edit (§0bt): `src/css/grammar/tokens.bbnf:24-27`, the groups the cure consumes, strictly required**; `math.ts` `tokenQuantity(digits, rawUnit)` takes the groups, `angle`/`dimension` are `kind: "groups"`, and `NUMERIC` is deleted (its `''` and `%` branches were dead: `number`/`percentage` keep their own map actions); the generated module re-emitted through `node scripts/gen-grammar.mjs` (header `sha256(grammar ⊕ emitter) 49c9d7ef…`). ⟨`grep -n NUMERIC src/css/bbnf/math.ts`⟩ → 0. (`value.ts`'s own `NUMERIC` is `numericScalar`'s authored-unit reader on a different token; not in K2-b's scope.)
3. **Cure 2 — built frozen, the walk deleted.** value.js **`ccb1f7a3`** (one commit: freeze-at-construction + `deepFreeze` removal + the pin). `result.ts`: `deepFreeze` deleted; `success` freezes its own envelope (`value` as built). Construction sites frozen: `bbnf/value.ts` (a `scalar()` helper freezing node + payload; list, call — `NO_ARGS` shared frozen, a comma list's frozen items shared as the arguments —, percent/named selectors, timing keyword/steps/cubic-bezier/linear stop/linear-function); `bbnf/color.ts` `colorNode` (the one place a colour enters the parse: the colour and its channels); `bbnf/index.ts` `parseCssValues`' one-item list; `stylesheet.ts` (keyframe rules and their selectors, keyframes block, style-body, function parameters and prelude, scope root/limit, property/function/scroll-/view-timeline descriptors and items, unknown at-rules, style rules and their selectors, the sheet array); `rules.ts` (timeline-scope, trigger, each declaration and the declaration list); `timeline.ts` (timeline kinds, view inset, range boundaries and ranges). Before committing, ⟨corpus sweep `k2/uf.mjs` over the 29,944 sources × the 7 entries + `parseAnimationRange`/`parseAnimationTimeline`, `deepFreeze` already deleted⟩ → first `696` unfrozen shapes, then `79`, then **`accepted results 40408 unfrozen shapes 0`**.
4. **The pin (K2-c).** `test/css/bbnf-frozen.test.ts` (in `ccb1f7a3`): the 15 hand cases stay; a new block reads deep `Object.isFrozen` on every accepted result of the real corpus (`bench/css-equivalence/real-corpus.json`, 3,049 sources) through all seven entries, and requires each entry to accept ≥ 1. Falsified by sabotage: ⟨unfreeze the `percent` selector node⟩ → `Tests 3 failed | 19 passed (22)` (hand keyframe, hand stylesheet, corpus keyframe); restored → 22/22.
5. **Engine reading after Cure 2, and one correction to the plan's parenthetical.** The first browser read at `ccb1f7a3` (harness rebuilt, act 6) had Chromium and WebKit below 1 in every acc/rej cell, but Firefox above 1 on acc keyframe (1.030/1.053), rej value (1.015/1.062), rej values (1.088/1.104) and rej stylesheet (1.156/1.078). Instruments (scratch, Firefox 100 ms floor, paired with the retired parser in the same page):
   - ⟨`k2/freeze-micro.mjs`, 2 × 10⁶ ops per engine⟩ → Object.freeze on a 3-key literal: **Firefox 86.5 ns** (literal 3.5) · Chromium 16.7 (1.3) · WebKit 32.5 (1.5). SpiderMonkey's freeze is 5× V8's.
   - ⟨A/B, bundles `c1` = `8850d74d` (Cure 1 only, `deepFreeze` kept) vs `c2` = `ccb1f7a3`, 2 alternations⟩ → rej value c1 .911/.846 vs c2 1.031/1.109; rej values .871/.897 vs 1.023/1.094; rej stylesheet 1.272/1.230 vs 1.081/1.141; acc keyframe 1.030/1.020 vs 1.069/1.078. Freezing at construction pays on the refused path: a rejected value builds and freezes ~2.5 scalars (node + payload) before its refusal (census act 1), where the retired parser freezes nothing on failure.
   - ⟨A/B, `c2` vs `c2q` (= `c2` with the number/percentage quantity a plain literal) vs `c1`, acc keyframe, 3 alternations⟩ → **c2 1.160 / 1.134 / 1.145 · c2q 0.858 / 0.863 / 0.882 · c1 1.014 / 1.076 / 1.056**.
   - **Reading.** The plan's parenthetical listed `numberQuantity`/`percentageQuantity` among the nodes to build frozen. The ADDENDUM's words are about results ("Results are frozen once, at construction … The public contract stays 'results are immutable'"). A quantity is never a result: the actions read it and publish what they build from it. The pin reads every published node frozen over the whole corpus with the quantity plain, and the sabotage of act 4 showed it does catch a published node. So the per-token quantity is built as a plain literal, and the ~83 ns Firefox freeze leaves the accepted keyframe path. **Commit `baaec604`** (`math.ts` only; `quantity()` itself is unchanged and stays frozen, as it was before this unit). This is a correction to the plan's parenthetical made on these numbers, not a substitute cure: Cure 2 stands whole for every result node.
6. **The browser harness, rebuilt** (the `.v`/`.k` scratch was gone): `scratchpad/k2/browser/{entry.mjs,run.mjs}` per `.v`'s receipt (record:412). `_build/retired.mjs` + `_build/product.mjs` + the 29,944 sources (`inputs.json`, from `bench/paired/common.mjs` `INPUTS`) bundled into one IIFE; one fresh page per cell; the acc/rej classes split in the page by the retired arm's verdict (as `bench.mjs`); k doubles to the pass floor (Chromium/WebKit 20 ms, **Firefox 100 ms**); 2 warm-ups per arm; 11 interleaved rounds with the rotate/flip order; `rev` on odd reps; spread ≥ 1.6 set aside (kept, counted) and re-run ≤ 3×; `uptime` before/after every cell. No `gc()` in a page (recorded, as `.v`). Engines: Playwright's Chromium, WebKit, Firefox. Env `ENTRIES`/`BUNDLE` added for the A/B cells of act 5.
7. **No npm act** (L-6): ⟨`git diff 8b08db4b..HEAD -- package.json package-lock.json`⟩ → empty. The dev link of act 0 is local state, not a dependency move (restored at the end, act 9).
8. **Gate readings on the final product bytes** (`baaec604`; the run's HEAD was `5350a850`, a sibling's commit on top, and ⟨`git diff --stat baaec604 5350a850 -- src package.json package-lock.json`⟩ → empty). ⟨`node bench/paired/build.mjs`⟩ → `srcDirty ""`, `bankedManifestOk 79/79`. The bench records `isolated.mjs` wrote under `bench/records/` (outside this unit's writable set) were moved to `scratchpad/k2/` (sha256 `27f456914997…` / `3f3f27eccbe3…` final; `f1c0a6344ad6…` / `10e43d345a4f…` at `ccb1f7a3`); ⟨`git status --porcelain bench`⟩ → empty.
9. **Local state restored**: `node_modules/@mkbabb/bbnf-lang` is the installed 0.1.4 again (symlink removed, aside dir moved back; ⟨`grep '"version"'`⟩ → `0.1.4`). Until X.P.W7P's pin, `gen-grammar --check` on this workstation answers the no-bin error (as `.v` recorded, record:423); `.g` re-links as `.v` did.

**Gate table, BEFORE → AFTER** (BEFORE = the RESUME Baseline; AFTER = this seat, final bytes, twice unless marked).

| Gate | BEFORE | AFTER | Verdict |
|---|---|---|---|
| K2-a node acc (⟨`node --expose-gc bench/paired/isolated.mjs w7-k2-final-r{1,2} product 3 11 whole,acc,rej`⟩; load `27.73` → `24.67`, `24.67` → `17.84`) | acc keyframe .950/.898/1.007; accepted-7/7 RED 6/7 | medians r1 · r2: color .565 · .573 · scalar .544 · .521 · value .325 · .332 · values .328 · .331 · **keyframe .590 · .618** (cells .591/.590/.567 · .618/.620/.569) · timing .515 · .520 · stylesheet .695 · .709. `accepted-7/7 GREEN` ×2 | **GREEN** |
| K2-a node rej | rejected-7/7 GREEN | color .721 · .727 · scalar .591 · .595 · value .452 · .490 · values .475 · .493 · keyframe .671 · .651 · timing .659 · .666 · stylesheet .645 · .657. `rejected-7/7 GREEN` ×2 | **GREEN** |
| K2-a Chromium acc/rej (20 ms floor, 2 reps per read; 0 set aside) | acc keyframe 1.254/1.269 (cited) | every cell < 1 in both reads; acc keyframe .583/.582 · .564/.564; the highest cell anywhere rej keyframe .617 | **GREEN** |
| K2-a WebKit acc/rej (20 ms floor; 1 set aside in read 2) | acc keyframe 1.200/1.115 (cited) | every cell < 1 in both reads; acc keyframe .682/.630 · .682/.600; highest rej keyframe .867 | **GREEN** |
| K2-a Firefox acc (100 ms floor; set aside 3 · 5) | acc keyframe 1.36–1.40, acc color .98–1.04, acc stylesheet 1.08–1.09 (cited, `.v`) | every acc cell < 1 in both reads: keyframe .822/.821 · .812/.809 · color .800/.828 · .840/.815 · stylesheet .857/.809 · .788/.806 | **GREEN** |
| K2-a Firefox rej | rej stylesheet 1.235/1.269, rej color 1.016/1.037 (cited) | color .805/.822 · .874/.771 (GREEN) · **value 1.070/.906 · .911/.969** · values .992/.953 · .909/.948 · **stylesheet 1.112/1.109 · 1.078/1.025** · the rest < 1 | **RED** (2 entries) |
| K2-b | `result.ts:13` deepFreeze · `math.ts:37,41` NUMERIC | ⟨`grep -rn deepFreeze src/css`⟩ → 0 · ⟨`grep -n NUMERIC src/css/bbnf/math.ts`⟩ → 0 | **GREEN** |
| K2-c | absent (hand cases only, relying on the walk) | ⟨`npx vitest run test/css/bbnf-frozen.test.ts`⟩ → 22/22, with the whole-corpus block over all 7 entries; sabotage → 3 failed | **GREEN** |
| V-1 oracle | 88 = F-b-4 | ⟨`node bench/paired/equiv.mjs product <out>`⟩ ×2 at `ccb1f7a3` and ×2 at `baaec604` → `compared 1376531/1376531 rows · mismatches 88 (ASCII-only sources 0)` (value 4 · values 4 · functionParam 11 · splitTopLevel `,` 13 · `;` 11 · space 45) | **GREEN** ×4 |
| whole-7/7 in ceilings | GREEN ×2 (cited) | medians r1 · r2 (ceiling): color .627 · .668 (.90) · scalar .566 · .575 (.81) · value .431 · .426 (.57) · values .421 · .415 (.58) · keyframe .702 · .682 (.78) · timing .631 · .624 (.87) · stylesheet .621 · .634 (.85). `whole-7/7 GREEN` ×2 | **GREEN** |
| `test:css-equivalence` | 19/19 | ⟨`npm run -s test:css-equivalence`⟩ → `Tests 19 passed (19)`, MIRROR-DEFECTS 0 on every section (28 lines, 0 non-zero) | **GREEN** |
| `npm test` | 924/927 (3 foreign) | ⟨`npx vitest run`⟩ → `Tests 3 failed · 931 passed (934)` at the final bytes, and the same at the uncommitted Cure 2 bytes before its readonly-type edit; +7 = the new corpus block; the 3 failures are the foreign rows (`spectrum-luma` C-5 BORN-RED, `format-color` G16 A1, `reka-binding-idiom` NG-6) | **GREEN** |
| `vue-tsc` | 0 | ⟨`npx vue-tsc -p tsconfig.{lib,demo,test}.json --noEmit`⟩ → 0 · 0 · 0 errors (git-ignored `bench/paired/_build/` set aside for the read, as `.v`, record:385) | **GREEN** |
| `gen-grammar --check` | 0 (`58b2438c…`) | exit 0, `grammar.js is current (sha256 49c9d7ef…)` (on the linked `6d5a2b4a0` generator) | **GREEN** |
| bbnf-lang TS suite | 277/277 | ⟨`npx vitest run`⟩ in `../bbnf-lang-x-p-w7-typescript/typescript` at `6d5a2b4a0` → `Test Files 17 passed (17) · Tests 282 passed (282)` (+5 = `groups.test.ts` + `types.test.ts` cases) | **GREEN** |

**Commits.** bbnf-lang `6d5a2b4a0` (Cure 1, emitter; inherited, on `x-p-w7-typescript`, pushed; PR #1 open) · value.js `8850d74d` (Cure 1, consumer + regenerated module) · `ccb1f7a3` (Cure 2: freeze at construction + `deepFreeze` removal + the pin) · `baaec604` (the per-token quantity as a plain literal; act 5) · this receipt. **Adjacent edits (§0bt):** `src/css/grammar/tokens.bbnf:24-27` (the `dimension`/`angle` capturing groups Cure 1 consumes).

**Residuals (named owners).**
- **R-k2-1, Firefox rejected parseCssValue** (1.070 / .906 · .911 / .969; one cell of four over 1). The cause is measured: SpiderMonkey's `Object.freeze` (~83 ns, act 5), paid by nodes built on the refused path. A rejected value builds and freezes about 2.5 scalars before its refusal, where the retired parser freezes nothing on failure. Cure 1-only bytes read .846–.911 there. Values reads .909–.992, all below 1 but at noise distance. Owner: `.g`, which holds the Firefox engine gap under §0cp 3; its levers (F1/F7 fusion) reduce the work before a refusal. This seat does not relieve it by freezing at adoption (a parent freezing its children is a distributed walk, the thing Cure 2 removes). If `.g` cannot bring it below 1 on paired numbers, the choice between the ruling's "built frozen" and the Firefox rejected half goes to the orchestrator.
- **R-k2-2, Firefox rejected parseStylesheet** (1.112 / 1.109 · 1.078 / 1.025; `.v` read 1.235–1.269). This is the §0cp 3 engine gap, owned by `.g`. Cure 2 improved it (A/B 1.23–1.27 → 1.08–1.14) but did not close it.
- **R-k2-3, Firefox accepted color and stylesheet** (`.v`: .98–1.04 and 1.08–1.09) now read .800–.840 and .788–.857. That is part of §0cp 3's Firefox gap, closed here as a side effect. `.g` re-reads it.

**Escalations:** none new. R-k2-1's fork, if `.g` does not relieve it, is named above for the orchestrator.

**Verdict: PARTIAL.** Green: K2-a on node, Chromium and WebKit (accepted and rejected), and Firefox accepted, all twice; K2-b; K2-c; every stay-GREEN gate. Red: the K2-a Firefox rejected half on parseCssValue (one cell) and parseStylesheet (the `.g` gap).

### X.P.W7.g

Seat `claude-opus-5-5`, 2026-09-24, Track D. Governing text: W7.md (214 lines, read whole) — (g) at 94 and ADDENDUM 2026-09-24 §3 · COHESION §0cp (read to the file end, §0cv; no later ruling touches Track D beyond §0cq's roster line) · the RESUME Unit plan above · the `.k2` receipt (its residuals R-k2-1..3 are this unit's inputs).

**Crash-recovery.** ⟨`git -C ../bbnf-lang-x-p-w7-typescript status --porcelain`⟩ → empty at `6d5a2b4a0` (branch `x-p-w7-typescript`); ⟨`git status --porcelain -- bench src/css/bbnf/generated <record>`⟩ → empty. **No inherited partial work.** L-1 met: `.k2`'s commits exist (`8850d74d` · `ccb1f7a3` · `baaec604` · receipt `a2aec4cb`); every lever below is measured on `.k2`'s product bytes.

**Acts, in order.**
1. **R-v-3, the instrument fix — commit `6655c827`** (`bench/**` only, its own commit). `bench/paired/bench.mjs`: a declared warm-up (`WARMUP = 3` passes per arm at k = 1, in the cell's arm order, identical for every arm) runs BEFORE the k-rule; before it, `bench.mjs:33-34` sized k on the retired arm's cold first pass (its bimodal rep-0). `isolated.mjs`: every rep is reported — each summary row carries `every` (rep, attempt, k, spread, ratio, set-aside flag) beside the clean ratios, never averaged in. The browser harness is promoted from the `.k2` scratch into `bench/paired/browser.mjs` (runner: Playwright Chromium/WebKit/Firefox, one fresh page per cell, the retired parser in the same page, entry order rotated per rep, arms reversed on odd reps, spread ≥ 1.6 set aside and re-run ≤ 3×, `uptime` around every cell, floors 20 ms / **Firefox 100 ms**, classes whole/acc/rej/large, any `_build/<arm>.mjs` as an extra arm) + `bench/paired/browser-page.mjs` (the in-page cell, the same warm-up rule). No `gc()` exists in a page (recorded, as `.v`).
   - ⟨`node --expose-gc bench/paired/bench.mjs parseStylesheet large product 11 0`⟩ ×2 → `k=2 … product x0.429` · `k=2 … x0.443` (the baseline's large cells ran at k = 1).
   - ⟨`node bench/paired/isolated.mjs g-base-node product 3 11 large`⟩ → `clean 3 (set aside 0) · 0.379/0.422/0.395 · every r0a0 k2 x0.379 r1a0 k2 x0.422 r2a0 k2 x0.395` (RESUME Baseline: `.588 / 1.507 / .527`, **3 set aside**, one at k = 1). The k = 1 artefact is gone.
2. **Baseline on the promoted browser instrument** (`.k2`'s product bytes; ⟨`node bench/paired/browser.mjs g-base chromium,webkit,firefox 2 whole,acc,rej,large 11 product`⟩; Chromium 148.0.7778.96 · WebKit 26.4 · Firefox 150.0.2; load `19.38` → `18.26`). 66 rows × 2 reps:
   - Chromium 22/22 rows below 1 in both reps, 0 set aside.
   - WebKit 21/22; **RED: large parseStylesheet 1.182 / 1.200**.
   - Firefox 20/22 (6 cells set aside and re-run, all reported); **RED: rej parseStylesheet 1.159 (SA) / .980 (SA) / 1.110 / 1.076 · large parseStylesheet 1.209 / 1.162**. R-k2-1 (Firefox rej parseCssValue) reads **.971 / .906** (values .967 / .931): below 1, at noise distance.
   - So the engine gaps §0cp 3 names stand as: Firefox rejected + large sheets, WebKit large sheets. Colour on Firefox (.98–1.04 in `.v`) now reads .799–.839 (the `.k2` side effect holds).
3. **The lever method** (declared before the first lever; one lever at a time on the emitter, never two in one emission). Each lever: edit `typescript/src/emit.ts` in the bbnf-lang worktree → `npx vite build` there → value.js's `node_modules/@mkbabb/bbnf-lang` linked to the worktree (0.1.4 moved aside as `.bbnf-lang-0.1.4-aside-g`, `.v`/`.k2`'s method) → `node scripts/gen-grammar.mjs` → E-1/E-2 on the re-emission (scratch `g/e12.mts`: the emitted module vs runtime `compile()` over the 29,944 sources × the 24 emitted entries; the audit build over the same sources × all 160 rules, plus the recognize-vs-value differential) → `node bench/paired/build.mjs` → the paired cells with THREE arms in one process/page: `retired`, `g-base` (a copy of the `.k2` product bundle, the before-bytes) and `product` (the lever) — node ⟨`isolated.mjs <tag>-node g-base,product 3 11 whole,acc,rej,large`⟩ and Chromium/WebKit/Firefox ⟨`browser.mjs <tag> chromium,webkit,firefox 2 whole,acc,rej,large 11 g-base,product`⟩ (88 engine × class × entry rows). Before/after per clean cell = (product/retired) ÷ (g-base/retired). **Declared regression: every rep of a row reads after/before > 1.03** (the same-cell A/A spread at this load is ~±3%; a single-rep excursion is noise). Admission: 0 regressing rows on every engine. Scratch comparer `g/cmp.mjs`.
4. **Lever F1 — exact terminal-choice fusion. NOT ADMITTED (reverted).** Built: in each route group (and in an unrouted choice), a run of ≥ 2 adjacent terminal alternatives (non-empty literal; regex that cannot match empty and is not a single-class run; a reference to an action-free, non-`@recover`, grammar-defined rule whose body is one or an ordered choice of them) with equal flags becomes ONE sticky `(?:t1|t2|…)` (exact: a regex alternation with nothing after it answers its first alternative's own preferred match; back-references and named groups are never fused); the audit build re-runs a fused unrouted choice as the plain one. Emitted sites in value.js's grammar: **2** (`varFn`'s `-` route; `blockBody`'s quote route, `quoted | openQuote`); header `sha256 d6ea997b…`. E-1 `{"calls":718656,"diffs":0}` · E-2 `checks 167711718 · violations 0 · modeDiffs 0 of 4791040`.
   - Paired before/after (88 rows; record `g-f1`): **2 regressing rows** — **WebKit large parseStylesheet 1.158 / 1.184 → 1.684 / 1.600 (×1.454 / ×1.351)** · Firefox acc parseCssValues .442 / .451 → .472 / .476 (×1.068 / ×1.055); 1 improving (WebKit acc stylesheet ×.957 / ×.969). **Reverted** (⟨`git checkout -- src/emit.ts`⟩ in the worktree; the diff kept as scratch `g/emit/f1.diff`, sha256 `1904d4db34fa…`).
5. **Lever F8 — recognizer loops. NOT ADMITTED (reverted).** Built: in recognize mode, `( T1 | … | Tk | B … )*` / `+` whose leading alternatives are terminals (as F1, single-class runs included) runs its terminal steps as ONE sticky `(?:T1|…|Tk)*` per step, and the structural alternatives only where that stops (exact: the star takes step by step the first matching Tj and its preferred match and never backtracks, nothing following it; no Tj matches empty); the audit build re-runs every such loop as the plain loop (`loop F8` checks); the plain loop moved into a `plainMany` helper. Sites: **9** (⟨scratch `g/sites.mts` on the F8 emission⟩ → `commaRun` `semiRun` `spaceRun` `preludeRun` `colonRun` `argRun` (text-kind bodies) · `balanced` `blockBody` `textBody` (recognize functions); `ruleGap` is read in value mode, so it is not a site); header `5eb2c68e…`; test `loop-fusion.test.ts` written with it. E-1 `diffs 0 of 718656` · E-2 `checks 182069074 · violations 0 · modeDiffs 0`.
   - Paired (record `g-f8`): **5 regressing rows** — **WebKit large parseStylesheet 1.114 / 1.125 → 1.694 / 1.732 (×1.521 / ×1.540)** · Chromium rej parseStylesheet ×1.065 / ×1.104 · node rej parseCssValues ×1.043 / ×1.077 / ×1.080 · WebKit whole parseCssColor ×1.036 / ×1.041 · WebKit whole parseTimingFunction ×1.036 / ×1.032. Improving: **Firefox large parseStylesheet 1.143 / 1.207 → .958 / .963 (×.838 / ×.798 — the lever that closes Firefox's large-sheet gap)** · Chromium acc stylesheet ×.920 / ×.970; Firefox rej stylesheet 1.040 / 1.062 → .990 / 1.034 (×.952 / ×.974, not below 1 in both). **Reverted** by the admission rule (scratch `g/emit/f8.diff` `6f9fae4912d6…`, test `5dc59770b1f5…`).
   - Probe (scratch `g/yarr.mjs`, one page per engine, the 573 KB keyframes.js sheet scanned stop to stop ×40, median of 15): F8's blockBody star vs the plain loop's class run in JS — Chromium 19.8 vs 20.1 ms · **WebKit 16 vs 15** · Firefox 20 vs 26. The star itself is not slower on JSC; the large-sheet regression is not in the long scans, and its cause was not isolated further (the readers' short-string calls — `commaRun`, `colonRun`, `argRun` per declaration — now enter the regex engine where they entered a code-unit loop, is the untested candidate).
6. **Lever F7 — same-action leaf fusion. NO SITE (not built).** F7 needs two adjacent alternatives that are terminal-bodied rules carrying the SAME action function. Census over value.js's action table by identity (scratch `g/f7census.mts`, 37 ordered choices): same-function pairs are `angle`/`dimension` (`tokenQuantity`; never adjacent), `string`/`operator` (adjacent in `valueTerm` and `scalarTerm` at 4–5), `call`/`varCall` (not terminals), and text-kind families (not terminals) → `{"choices":37,"adjacentSameActionTerminalPairs":2,"routeGroupPairs":0}`. The emitter routes every choice by its first unit and `string` (`"`/`'`) and `operator` never share a route, so an F7 emitter would emit value.js's module byte-identically (bar the header): there is nothing to measure, and dead emitter code is not added.
7. **Lever: keyword heads for the colour group. NOT ADMITTED (reverted).** Built: where a route group holds ≥ 2 alternatives that can only begin with a `name(` keyword (read from the leading mandatory terminal through references, sequences, `>>`/`<<`, `-` and choices; from a regex only of the forms identifier units, `x?`, `(?:a|b)`, then `\(` or `(?=\()`; `u`/`v` regexes never read), the group scans the identifier once (bounded by the longest keyword) and switches on `name(` (lower-cased for `/i` heads) to the keyed members holding it plus every unkeyed member, in the choice's order; keywords that cannot begin in the route are dropped. Sites: **11** (`color` 5 routes, `colorCall` 5, `mathFn` 1); header `2581f8ba…`; test `keyword-heads.test.ts` written with it. E-1 `diffs 0` · E-2 `checks 166951586 · violations 0 · modeDiffs 0`.
   - Paired (record `g-kw`): **8 regressing rows** — WebKit whole parseCssColor ×1.082 / ×1.079 · WebKit acc parseCssColor ×1.104 / ×1.093 · WebKit whole/acc parseCssScalar ×1.049 / ×1.037 · ×1.058 / ×1.067 · Firefox rej parseCssColor ×1.048 / ×1.038 · Firefox rej parseCssValues ×1.034 / ×1.034 · Firefox acc parseTimingFunction ×1.051 / ×1.064 · node rej parseCssValue ×1.063 / ×1.091 / ×1.041; improving 1 (WebKit rej stylesheet ×.964 / ×.967). **Reverted** (scratch `g/emit/kw.diff` `874a32c3f97e…`, test `441c704395ec…`). The colour group is not where §0cp 3's gaps are (Firefox colour already reads .80–.84).
8. **Final emitter = `6d5a2b4a0` (no lever admitted).** ⟨`git -C ../bbnf-lang-x-p-w7-typescript status --porcelain`⟩ → empty; rebuilt dist, ⟨`node scripts/gen-grammar.mjs`⟩ → `sha256 49c9d7ef…` and ⟨`git status --porcelain -- src`⟩ → empty: the re-emission is byte-identical to the committed module (E-4's determinism, read again). No bbnf-lang commit and no value.js re-emission commit: a lever commit exists only for an admitted lever (Unit plan, Same-commit families).
9. **V-5 / V-6 on the final bytes, twice** (the product = `.k2`'s bytes; ⟨`cmp bench/paired/_build/product.mjs …/g-base.mjs`⟩ → identical). Read 1 = act 2's `g-base`; read 2 ⟨`node bench/paired/browser.mjs g-final-r2 chromium,webkit,firefox 2 whole,acc,rej,large 11 product`⟩ (load `9.57` → `24.55`):
   - Chromium 22/22 rows below 1 in both reps, 0 set aside (highest `whole keyframe .645`). **GREEN ×2.**
   - WebKit 21/22 (1 set aside); highest green row `rej keyframe .871`; **RED large parseStylesheet 1.174 / 1.150** (read 1: 1.182 / 1.200).
   - Firefox 18/22 (16 set aside and re-run, all reported in the record): **RED rej parseStylesheet 1.096 / 1.126** (read 1: 1.110 / 1.076) · **large 1.094 / 1.259 (SA) / 1.311** (read 1: 1.209 / 1.162) · whole parseStylesheet 1.026 / 1.096 (SA) / .941 (read 1: .951 / .950) · rej parseCssValues .920 / 1.017 (read 1: .967 / .931). R-k2-1's parseCssValue rej: .903 / .951 (read 1 .971 / .906) — below 1 in all four cells.
   - node large (V-6): ⟨`isolated.mjs g-base-node product 3 11 large`⟩ → .379 / .422 / .395 · ⟨`isolated.mjs g-final-node-r2 product 3 11 large`⟩ → .438 / .439 / .446; 0 set aside in either. **GREEN ×2.**
10. **G-4, `.e` E-1..E-7 re-read on the final emitter `6d5a2b4a0`** (built dist, linked as in act 3):
   - E-1 ⟨`g/e12.mts`⟩ → `{"calls":718656,"diffs":0,"sameFail":true}`; ⟨`npx vitest run`⟩ ×2 in `typescript/` → `Test Files 17 passed (17) · Tests 282 passed (282)` (the 64 conformance E-1 cases included). **GREEN.**
   - E-2 ⟨`g/e12.mts`⟩ → `checks 167711718 · violations 0 · modeCalls 4791040 · modeDiffs 0`. **GREEN.**
   - E-3 (stock-ASCII test) inside the suite above (`stock-ascii.test.ts` green). **GREEN.**
   - E-4 ⟨scratch `g/g4.sh`: the CLI on a copy of value.js's six `.bbnf` files, value.js's action table, the 24 entries⟩ → `two emissions identical` · `= the committed module` (js + d.ts) · `--check exit 0` · after a one-byte edit to the copy's `tokens.bbnf` `--check exit 1` (`js, d.ts differ`) · after regeneration `exit 0`. **GREEN.**
   - E-5 ⟨`npx tsc --noEmit -p .`⟩ in `typescript/` → exit 0; `types.test.ts` in the suite above. **GREEN.**
   - E-6 ⟨esbuild `transform` minify + zlib gzip of `src/css/bbnf/generated/grammar.js`⟩ → **93,999 B min / 12,916 B gz** (ceiling 125,646 / 14,517). **GREEN.**
   - E-7 ⟨scratch `g/depth.mjs` ×2: `calc(` ×10,000 through `parseCssValue`/`Scalar`/`Values`⟩ → node 26.0.0 `refused ×3` · WebKit 26.4 `refused ×3` · Chromium 148 `refused ×3`; `calc(`×10 accepted; nothing threw. The fault's cost half is unchanged code (`.e`'s reading stands; no lever touched the counter). **GREEN.**
11. **Stay-GREEN (as `.k2`)**: V-1 ⟨`node bench/paired/equiv.mjs product <out>`⟩ ×2 → `compared 1376531/1376531 rows · mismatches 88 (ASCII-only sources 0)` (= the F-b-4 rows) · ⟨`npm run -s test:css-equivalence`⟩ → `Tests 19 passed (19)`, every MIRROR-DEFECTS line `0` (26 of 26) · ⟨`node scripts/gen-grammar.mjs --check`⟩ → exit 0, `sha256 49c9d7ef…` · ⟨`npx vitest run`⟩ → `Tests 3 failed | 933 passed (936)`, the 3 = the foreign rows `.k2` named (`spectrum-luma` C-5 BORN-RED · `format-color` G16 A1 · `reka-binding-idiom` NG-6); +2 passing since `.k2` are siblings' tests · ⟨`npx vue-tsc -p tsconfig.{lib,demo,test}.json --noEmit`⟩ → 0 · 0 · 0 (the git-ignored `bench/paired/_build/` set aside for the read, as `.v`) · bbnf-lang TS 282/282 ×2.
12. **Local state restored**: `node_modules/@mkbabb/bbnf-lang` is the installed 0.1.4 again (link removed, aside dir moved back; ⟨`grep '"version"'`⟩ → `0.1.4`). No npm act (L-6): ⟨`git diff a2aec4cb..HEAD -- package.json package-lock.json`⟩ → empty for this unit's commits. bbnf-lang: nothing committed, nothing pushed (no lever admitted); PR #1 untouched (L-4).
13. **node whole/acc/rej on the R-v-3 instrument** (stay-GREEN whole-7/7; ⟨`node bench/paired/isolated.mjs g-final-node product 3 11 whole,acc,rej`⟩, load `~24` → `20.67`; 22 cells set aside and re-run, every one listed in the record's `every`): medians whole (ceiling) color .643 (.90) · scalar .568 (.81) · value .402 (.57) · values .414 (.58) · keyframe .690 (.78) · timing .637 (.87) · stylesheet .608 (.85); acc .575 · .605 · .334 · .324 · .586 · .500 · .660; rej .708 · .566 · .461 · .460 · .673 (2 clean) · .645 · .625 (2 clean). `whole-7/7 GREEN` · `accepted-7/7 GREEN` · `rejected-7/7 GREEN`.

**Commits.** value.js `6655c827` (R-v-3 + the browser instrument, `bench/**`) · `41532531` (the records: `g-base`, `g-final-r2`, `g-base-node`, `g-final-node-r2`, `g-final-node`, and the lever cells `g-f1`, `g-f8`, `g-kw`) · this receipt. bbnf-lang: none (no lever admitted). **Adjacent edits (§0bt):** none.

**Gate table, BEFORE → AFTER** (BEFORE = the RESUME Baseline and act 2; AFTER = the final bytes, reads 1 and 2).

| Gate | BEFORE | AFTER | Verdict |
|---|---|---|---|
| R-v-3 instrument | k sized on the cold retired pass; node large `.588 / 1.507 / .527`, 3 set aside, k = 1 | warm-up before the k-rule, every rep reported; node large k = 2, 0 set aside in 6 cells | **GREEN** |
| G-1 V-5 Chromium (whole/acc/rej × 7) | acc keyframe 1.254/1.269 (`.v`, cited) → all < 1 (`.k2`) | 21/21 rows < 1 in both reads × 2 reps, 0 set aside | **GREEN** ×2 |
| G-1 V-5 WebKit | acc keyframe 1.200/1.115 (cited) → all < 1 (`.k2`) | 21/21 rows < 1 in both reads (highest rej keyframe .871) | **GREEN** ×2 |
| G-1 V-5 Firefox | rej stylesheet 1.235/1.269 (`.v`), 1.112/1.109 · 1.078/1.025 (`.k2`) | **rej parseStylesheet 1.110 / 1.076 · 1.096 / 1.126**; whole parseStylesheet .951 / .950 · 1.026 / .941; rej parseCssValues .967 / .931 · .920 / 1.017; the other 18 rows < 1 in all cells | **RED** (1 entry firm, 2 at noise distance) |
| G-2 V-6 node | 1 clean cell 1.507 among 3 set aside | .379 / .422 / .395 · .438 / .439 / .446 | **GREEN** ×2 |
| G-2 V-6 Chromium | (not read on this instrument) | .316 / .330 · .340 / .346 | **GREEN** ×2 |
| G-2 V-6 WebKit | 1.286 / 1.286 (`.k`, cited) | **1.182 / 1.200 · 1.174 / 1.150** | **RED** |
| G-2 V-6 Firefox | (not read) | **1.209 / 1.162 · 1.094 / 1.311** (+1 set aside 1.259) | **RED** |
| G-3 lever tables | 0 levers (`grep -n "fus\|keyword" emit.ts` → 0) | F1: 2 sites, 2 regressing rows → reverted · F8: 9 sites, 5 regressing rows (WebKit large ×1.52) → reverted · keyword heads: 11 sites, 8 regressing rows → reverted · F7: 0 sites (census) → not built. Every table is in `41532531` | **GREEN as a procedure** (each lever measured alone; 0 admitted) |
| G-4 E-1..E-7 on the final emitter | `.e` / `.k2` readings | E-1 0 diffs · E-2 0 violations, 0 mode diffs · E-3 green · E-4 identical/check 0/1/0 · E-5 tsc 0 · E-6 93,999 / 12,916 · E-7 refused ×3 on node/WebKit/Chromium, ×2 | **GREEN** |
| stay-GREEN | as `.k2` | V-1 88 = F-b-4 ×2 · css-equivalence 19/19, MIRROR-DEFECTS 0 · `--check` 0 · `npm test` 933/936 (3 foreign) · vue-tsc 0/0/0 · whole-7/7 GREEN (and acc/rej 7/7) · bbnf-lang 282/282 ×2 | **GREEN** |

**Residuals (named owners).**
- **R-g-1, Firefox rejected parseStylesheet** (1.110 / 1.076 · 1.096 / 1.126), with whole parseStylesheet (.951 / .950 · 1.026 / .941) and rejected parseCssValues (.967 / .931 · .920 / 1.017) at noise distance. No granted lever moves it: F8 read it .990 / 1.034 (×.95–.97), not below 1 in both reps, and F8 is not admissible (R-g-3). Owner: the orchestrator (ESC-W7g-1).
- **R-g-2, large sheets on WebKit** (1.18 / 1.20 · 1.17 / 1.15) **and Firefox** (1.21 / 1.16 · 1.09 / 1.31). node and Chromium read .32–.45. Owner: the orchestrator (ESC-W7g-1).
- **R-g-3, F8 splits the engines.** F8 alone takes Firefox large from 1.14 / 1.21 to .958 / .963, below the retired parser, but WebKit large goes from 1.11 / 1.13 to 1.69 / 1.73, and Chromium rejected stylesheet goes from .51 to .54–.55. The probe (act 5) shows the long scans are not slower on JSC, so the regression's root is not isolated. The untested candidate is the per-declaration reader loops over short strings now entering the regex engine. F8's diff and test are banked in the scratch (`g/emit/f8.diff`, `loop-fusion.test.ts`).
- **R-k2-1 (Firefox rejected parseCssValue)** now reads .971 / .906 · .903 / .951, below 1 in all four cells, at noise distance. The `.k2` fork (built frozen versus the Firefox refused path) does not open on these numbers.
- The bench file names from `isolated.mjs` still carry the `2026-09-23-` prefix its `.o` author fixed. This is recorded, not changed: it is a record name, not a measurement.

**Escalations.**
- **ESC-W7g-1.** §0cp 3 grants four levers. Each was built, re-emitted, E-1/E-2-checked, and measured alone against the `.k2` bytes on node and the three engines. None qualifies under the grant's rule ("admitted only on its own paired numbers, with no entry regressing on any engine"):
  - F1 regresses WebKit large by ×1.40.
  - F8 regresses WebKit large by ×1.53.
  - Keyword heads regress WebKit colour by ×1.08–1.10.
  - F7 has no site in the routed module.
- G-1 (Firefox rejected stylesheet) and G-2 (WebKit and Firefox large sheets) therefore stay RED.
- The spec gives no lever beyond these four, and substituting one would be improvisation. The orchestrator must choose one of:
  - (a) re-scope G-1's Firefox stylesheet half and G-2's WebKit/Firefox large-sheet cells to *recorded, not gated*, as W7.md's own Open items first read engines ("Speed on JSC/SpiderMonkey is recorded by `.v`, not gated");
  - (b) mint a follow-up lever that isolates R-g-3's WebKit regression, for example F8 restricted by a measured rule, admitted on the same paired rule;
  - (c) accept an engine-split admission (F8 with its WebKit regression) by an explicit ruling. This seat does not make that ruling.

**Verdict: PARTIAL.**
- **Green:**
  - R-v-3.
  - G-1 on Chromium and WebKit, twice.
  - G-2 on node and Chromium, twice.
  - G-3 as a procedure: every lever measured alone, none admitted.
  - G-4 E-1..E-7 on the final emitter.
  - Every stay-GREEN gate.
- **Red:**
  - G-1 Firefox: rejected parseStylesheet (1 entry firm, 2 at noise distance).
  - G-2 WebKit and Firefox large sheets.
- Both red items are carried as ESC-W7g-1.

## RESUME Close (2026-09-24, close seat `claude-opus-5-5`, Track D; verify-only, cures nothing)

**Open.** Spec read whole (W7.md, 214 lines, incl. ADDENDUM 2026-09-24). From this record: header through `## RESUME Unit plan`, and the two RESUME receipts (`.k2`, `.g`). The first `## Close` (line 570) and Checks 1–3 stand unchanged (E-3); this section is written beside them. **Crash-recovery:** ⟨`git status --porcelain -- src bench test scripts/gen-grammar.mjs <record> LEDGER.md`⟩ → empty; ⟨`git -C ../bbnf-lang-x-p-w7-typescript status -sb`⟩ → clean, `x-p-w7-typescript...origin/x-p-w7-typescript` at `6d5a2b4a0`. No inherited partial work. Product bytes: ⟨`git log df9c6f7e..HEAD -- src/css package.json package-lock.json`⟩ → nothing under `src/css` (HEAD `f8fa42d4`, a sibling's `demo/shell` commit); ⟨`node bench/paired/build.mjs`⟩ → `srcDirty ""`, `bankedManifestOk 79/79`, `bbnf-lang` installed `0.1.4`.

### Act 1: commit roster, and whether each unit stayed in its writable set
⟨`git show --stat --format= <c>`⟩ per commit:

| Unit | Commits | Paths touched | In set? |
|---|---|---|---|
| `.k2` | bbnf-lang `6d5a2b4a0` (pushed; = `origin/x-p-w7-typescript`) | `typescript/{README.md,src/cli.ts,src/compile.ts,src/emit.ts,src/generate.ts,test/groups.test.ts,test/types.test.ts}` | yes (`typescript/**`) |
| `.k2` | value.js `8850d74d` (Cure 1) | `src/css/bbnf/generated/grammar.{js,d.ts}`, `src/css/bbnf/math.ts`, `src/css/grammar/tokens.bbnf` | yes; `tokens.bbnf` is the declared §0bt adjacent edit (`:24-27`, the capture groups Cure 1 consumes) |
| `.k2` | value.js `ccb1f7a3` (Cure 2) | `src/css/bbnf/{color,index,math,value}.ts`, `src/css/{result,rules,stylesheet,timeline}.ts`, `test/css/bbnf-frozen.test.ts` | yes (`src/css/bbnf/**`; `result.ts` = the success-freeze helper, `rules/stylesheet/timeline.ts` = its callers under `src/css/**`; `test/css/**`) |
| `.k2` | value.js `baaec604` · receipt `a2aec4cb` | `src/css/bbnf/math.ts` · this record | yes |
| `.g` | value.js `6655c827` | `bench/paired/{bench,browser,browser-page,isolated}.mjs` | yes (`bench/**`) |
| `.g` | value.js `41532531` | 11 files under `bench/records/` | yes |
| `.g` | value.js `df9c6f7e` | this record | yes |

**Landed wrong: none.** No `package.json`/lockfile, `ci.yml`, `rust/**` or `scripts/dev/dev.sh` path in any commit; no bbnf-lang lever commit (none admitted).

### Act 2: the gates re-read by this seat (product bytes = `.k2`'s; RESUME rule: the gates `.k2`/`.g` turn plus stay-GREEN; older unit gates cited from Check 3)

**Timing (records moved to scratchpad `w7close/`; `bench/` left clean).**
- **node, read 1** ⟨`node --expose-gc bench/paired/isolated.mjs close-node-r1 product 3 11 whole,acc,rej,large`⟩ (load `16.89` → `15.69`): whole medians color .622 · scalar .549 · value .382 · values .398 · keyframe .685 · timing .598 · stylesheet .573 (ceilings .90/.81/.57/.58/.78/.87/.85); acc .590 · .539 · .320 · .310 · **keyframe .591** · .492 · .615; rej .637 · .547 · .428 · .441 · .669 · .637 · .586; large .402 / .889 (2 clean, **4 set aside** at spread 1.80–5.04, all reported; every clean and set-aside cell < 1). `whole-7/7 GREEN` · `accepted-7/7 GREEN` · `rejected-7/7 GREEN`.
- **node, read 2** ⟨same, tag `close-node-r2`⟩ (→ load `24.29`): whole .602 · .548 · .387 · .405 · .691 · .603 · .597; acc .572 · .538 · .311 · .299 · **.585** · .496 · .620; rej .631 · .566 · .458 · .436 · .676 · .640 · .593; large .420 / .447 / .413 (0 set aside). All three 7/7 verdicts `GREEN`. (`O-2 … DOES NOT HOLD` = the product is faster than stock; `.o`'s banked O-2 stands, as at the first Close.)
- **browsers, read 1** ⟨`node bench/paired/browser.mjs close-r1 chromium,webkit,firefox 2 whole,acc,rej,large 11 product`⟩ (load `24.29` → `12.54`), 2 reps each:
  - Chromium 22/22 rows < 1 in both reps (highest acc keyframe .583; large .333 / .348).
  - WebKit 21/22; **RED large parseStylesheet 1.114 / 1.171**; highest green rej keyframe .870.
  - Firefox 20/22; **RED rej parseStylesheet 1.075 / 1.058 · large 1.140 / 1.228**; whole stylesheet .966 / .943; rej parseCssValue .920 / .899, parseCssValues .938 / .895 (R-k2-1 below 1); 7 cells set aside and re-run, all reported.
- **browsers, read 2** ⟨same, tag `close-r2`⟩ (load `12.01` → `10.74`): 63/66 rows < 1 in both reps. Chromium 22/22 (large .323 / .332). WebKit 21/22, **RED large 1.158 / 1.200**. Firefox 20/22, **RED rej parseStylesheet 1.037 / 1.031 · large 1.146 / 1.149**; whole stylesheet .981 / .929; rej parseCssValue .927 / .883, parseCssValues .909 / .914.
- The browser readings reproduce the `.g` receipt's RED set exactly, across both reads: WebKit large, Firefox rejected stylesheet and Firefox large. Every other cell on all four hosts is below 1, twice.

**Correctness, gates and size.**
- K2-b ⟨`grep -rn deepFreeze src/css | wc -l`⟩ → `0`; ⟨`grep -n NUMERIC src/css/bbnf/math.ts | wc -l`⟩ → `0`. **GREEN.**
- K2-c ⟨`npx vitest run test/css/bbnf-frozen.test.ts`⟩ → `Tests 22 passed (22)`. **GREEN.**
- V-8 grep ⟨`grep -rn 'GRAMMAR_MODULES\|new ParserState\|reset()' src/css/bbnf | grep -v generated/`⟩ → 0; ⟨`grep -rnE '/[^/]*\[xX\][^/]*/i' src/css/grammar`⟩ → 0. **GREEN.**
- V-1 ⟨`node bench/paired/equiv.mjs product <out>`⟩ ×2 → `compared 1376531/1376531 rows · mismatches 88 (ASCII-only sources 0)` both times, which are the F-b-4 rows. **GREEN ×2.**
- ⟨`npm run -s test:css-equivalence`⟩ → `Tests 19 passed (19)`, every MIRROR-DEFECTS line `0`. **GREEN.**
- E-4 `--check`: ⟨`node scripts/gen-grammar.mjs --check`⟩ on the installed 0.1.4 → exit 1, `has no bbnf bin (bbnf gen needs @mkbabb/bbnf-lang >= 0.2.0)`. That is the X.P.W7P dependency move (ESC-W7v-1), not drift. With `node_modules/@mkbabb/bbnf-lang` linked to the rebuilt `6d5a2b4a0` worktree, as `.g` did, it reads ×2 → `grammar.js is current (sha256 49c9d7ef…)`, exit 0. The link was then removed, and 0.1.4 is restored (⟨`grep '"version"'`⟩ → `0.1.4`). **GREEN on the linked emitter.**
- E-1/E-3/E-5 ⟨`npx vitest run`⟩ ×2 in `../bbnf-lang-x-p-w7-typescript/typescript` → `Test Files 17 passed (17) · Tests 282 passed (282)` both times; ⟨`npx tsc --noEmit -p .`⟩ → exit 0. **GREEN.** E-2's 167.7M-check audit is cited from the `.g` receipt: the emitter bytes are unchanged at `6d5a2b4a0`, and this seat did not re-run it.
- E-6 ⟨esbuild minify + gzip of `src/css/bbnf/generated/grammar.js`⟩ → `93999 12916` (ceiling 125,646 / 14,517). **GREEN.**
- E-7 is covered by `test/css/bbnf-depth.test.ts` (`calc(` ×10,000 refuses, never throws) inside the node suite below. The WebKit/Chromium depth readings are cited from `.g`.
- ⟨`npx vitest run`⟩ (value.js) → `Tests 3 failed | 940 passed (943)`. The 3 failures are the foreign rows `.k2`/`.g` named: `spectrum-luma` C-5 BORN-RED, `format-color` G16 A1 and `reka-binding-idiom` NG-6. None is under `src/css` or `test/css`. **GREEN** in that reading.
- vue-tsc: ⟨`npx vue-tsc -p tsconfig.{lib,demo,test}.json --noEmit`⟩ → lib 0 · demo 0 · test 2. The 2 errors are TS5097 in the git-ignored `bench/paired/_build/*-entry.ts` that `build.mjs` writes. With `_build` moved aside, test → 0, and `_build` was then restored. **GREEN (0/0/0)**, with the build-dir artefact recorded as `.g` did.
- `.p`: ⟨`npx vitest run`⟩ in `../parse-that-x-p-w7/typescript` @ `96e68e9` → `Tests 143 passed (143)`. **GREEN.** `.o`/`.t` gates are cited from Check 3.

### Acts 3 and 4: verification artefacts and E13
- The spec names no separate Verification Artefacts clause beyond its gates. The artefacts are the paired records, which this seat left in scratchpad `w7close/` (node `close-node-r{1,2}`, browser `close-r{1,2}`, plus logs). `.g`'s banked records `41532531` stand as the records of record. ⟨`git status --porcelain bench`⟩ → empty.
- E13 ⟨`find <p> -maxdepth 1 -type f -newer INBOX.md`⟩ over value.js `V/` + `V/coordination/`, glass `BK/coordination/` + `BL/` (⟨`ls -t glass-ui/docs/tranches | head -3`⟩ → `BL BK BJ`), keyframes.js `V/coordination/` and atlas `P/coordination/` → 0 files, except glass `BL/FORMATION-PROGRESS.md` (BL's own cursor, not a letter). ⟨`grep -nE '\| *UNREAD *\|' INBOX.md`⟩ → 0. **0 UNREAD in scope.** INBOX.md carries a sibling seat's uncommitted line, so this seat did not append to it.

### Gate table, BEFORE → AFTER (BEFORE = RESUME Baseline; AFTER = this seat's two reads)

| Gate | BEFORE | AFTER (this seat) | Verdict |
|---|---|---|---|
| K2-a node acc/rej | acc keyframe .950 / .898 / 1.007 (RED 6/7) | acc keyframe .591 · .585; acc 7/7 and rej 7/7 GREEN ×2 | **GREEN ×2** |
| K2-a / G-1 Chromium | acc keyframe 1.254 / 1.269 (cited) | 22/22 rows < 1, both reads | **GREEN ×2** |
| K2-a / G-1 WebKit | acc keyframe 1.200 / 1.115 (cited) | 21/21 whole/acc/rej rows < 1, both reads | **GREEN ×2** |
| K2-a / G-1 Firefox | rej stylesheet 1.235 / 1.269 (`.v`) | 20/21 rows < 1; **rej parseStylesheet 1.075 / 1.058 · 1.037 / 1.031** | **RED** (1 entry) |
| K2-b | `deepFreeze` 2 hits · `NUMERIC` 2 hits | 0 · 0 | **GREEN** |
| K2-c | pin absent | 22/22 | **GREEN** |
| R-v-3 | node large with 3 set aside, k = 1 | read 2: 0 set aside (.420/.447/.413); read 1: 4 set aside, every one reported, 2 clean (.402/.889) | **GREEN** (every rep reported) |
| G-2 V-6 node / Chromium | .588 / 1.507 / .527 · not read | node < 1 ×2; Chromium .333/.348 · .323/.332 | **GREEN ×2** |
| G-2 V-6 WebKit | 1.286 / 1.286 | **1.114 / 1.171 · 1.158 / 1.200** | **RED** |
| G-2 V-6 Firefox | not read | **1.140 / 1.228 · 1.146 / 1.149** | **RED** |
| G-3 levers | 0 levers | F1 / F8 / keyword heads measured alone and reverted; F7 has 0 sites (`.g`, cited; `41532531`) | **GREEN as a procedure** |
| G-4 E-1..E-7 | `.e` readings | bbnf-lang 282/282 ×2 · tsc 0 · `--check` 0 ×2 (linked) · size 93,999 / 12,916 · depth test green; E-2 cited | **GREEN** |
| whole-7/7 in ceilings | GREEN (Check 3) | node ×2, e.g. keyframe .685 / .691 (ceiling .78) | **GREEN ×2** |
| V-1 · css-equiv · npm test · vue-tsc | GREEN (Check 3) | 88 = F-b-4 ×2 · 19/19, 0 defects · 940/943 (3 foreign) · 0/0/0 | **GREEN** |
| P-6 · E-8 · V-9 + CI step · Z-1 · Z-3 publish half | RED (npm EOTP) | relieved by citation to X.P.W7P (§0cp 1), GATE-KEYED on the owner's OTP | **relieved → X.P.W7P** |

### Residuals (named owners)
- **R-g-1: Firefox rejected parseStylesheet**, 1.075 / 1.058 · 1.037 / 1.031. It reproduces, somewhat smaller than `.g`'s 1.08–1.13. Owner: the orchestrator, through ESC-W7g-1.
- **R-g-2: large sheets on WebKit** (1.11–1.20) **and on Firefox** (1.14–1.23). Owner: the orchestrator, through ESC-W7g-1.
- **R-g-3: F8 splits the engines.** Its diff is banked in `.g`'s scratch. Owner: the orchestrator, if ESC-W7g-1 takes branch (b) or (c).
- **R-k2-1: Firefox rejected parseCssValue** is below 1 in all four of this seat's cells (.920 / .899 · .927 / .883). No action is owed.
- **The release chain:** P-6, E-8, V-9 and its CI step, Z-1, Z-3's publish half, the `--check` on the installed pin, and the bbnf-lang PR #1 merge. Owner: X.P.W7P, GATE-KEYED on the owner's npm one-time password.
- **Build-dir artefact:** `vue-tsc -p tsconfig.test.json` reads 2 while the git-ignored `bench/paired/_build/*-entry.ts` exists. It is recorded, not cured here, because it is outside this seat's set and the paths are not tracked. Owner: Track D's next bench-touching unit. The fix is an exclude for `bench/paired/_build`.

### Escalations (carried open, none new)
- **ESC-W7g-1** (the `.g` receipt) is still unruled: ⟨`grep -n ESC-W7g-1 COHESION.md`⟩ → 0 hits. Its three branches are (a) re-scope Firefox rejected stylesheet and WebKit/Firefox large sheets to recorded, not gated; (b) mint a follow-up lever; (c) rule an engine-split admission of F8.
- **ESC-W7p-1 / e-1 / v-1 / z-1** move to X.P.W7P.
- This seat raises no new escalation. **Adjacent edits: none. Out-of-set writes: none.**

### Four-verb line
W7.md has no §State clause, and nothing in it designates this seat to stamp a verb. Every engineering gate stays binding here (§0cp 1), and G-1 on Firefox and G-2 on WebKit and Firefox read RED twice. So X.P.W7 is **not IMPLEMENTED**. It stays **PARTIAL**, and VERIFIED is not stamped. It moves to IMPLEMENTED once ESC-W7g-1 is ruled, and executed if the ruling is (b) or (c).

**Verdict: PARTIAL.** `.k2` is DONE: every gate GREEN on node, Chromium and WebKit, and its Firefox rejected parseCssValue cell is now below 1. `.g` delivered R-v-3, the browser instrument and the four measured levers, but G-1 (Firefox) and G-2 (WebKit/Firefox large) stay RED under ESC-W7g-1. The release gates are relieved to X.P.W7P.

**Commits (this seat):** this RESUME Close, plus the LEDGER row cell.

## RESUME Check 1 (2026-09-24, L-20 pass 1, `claude-opus-5-5`, Track D; verify-only, cures nothing)

**Open.** Spec read whole (W7.md, 214 lines, both addenda). From this record: header through `## RESUME Unit plan`, and `## RESUME Close` (the last section); the `.k2`/`.g` receipts by grep only. The first `## Close` and Checks 1–3 stand (E-3); this section is written beside them. **Crash-recovery:** ⟨`git status --porcelain docs/tranches/X/execution/`⟩ → only a sibling's `A/X-W12.md` (not mine, untouched); ⟨`git -C ../bbnf-lang-x-p-w7-typescript status -sb`⟩ → clean at `origin/x-p-w7-typescript`. parse-that master's dirty `rust/**`, `README.md`, `.cargo/config.toml` belong to other programs (not in any W7 set; untouched). **No inherited partial work.** Product bytes: ⟨`git log --oneline df9c6f7e..HEAD -- src/css package.json package-lock.json test/css bench`⟩ → empty (HEAD `f91d5ccd`); ⟨`node bench/paired/build.mjs`⟩ → `srcDirty ""`, `bankedManifestOk 79/79`.

### Axes
- **(2) Writes inside §File Bounds.** ⟨`git show --stat --format= <c>`⟩ for `8850d74d` `ccb1f7a3` `baaec604` `a2aec4cb` `6655c827` `41532531` `df9c6f7e` `ccf8d1b3` `c98600d9` → paths exactly as the RESUME Close's Act 1 table lists them: `src/css/bbnf/**` + `src/css/{result,rules,stylesheet,timeline}.ts` + `test/css/bbnf-frozen.test.ts` (`.k2` grant) · `src/css/grammar/tokens.bbnf` `:24-27` (declared §0bt adjacent edit: the two capture groups Cure 1 consumes) · `bench/paired/**` + `bench/records/**` (`.g` grant) · this record · LEDGER one row (`c98600d9`: ⟨`git show c98600d9 | grep -E '^[-+]\|'`⟩ → one `-`/`+` pair on the `X.P.W7` row). bbnf-lang ⟨`git show --stat 6d5a2b4a0`⟩ → 7 paths, all `typescript/**`; branch `x-p-w7-typescript...origin/x-p-w7-typescript` (pushed, not master). ⟨`git log --oneline 8d916780..HEAD -- scripts/dev/dev.sh package.json package-lock.json .github`⟩ → empty. **Held.**
- **(3) No masking fallback.** ⟨`git show <the four code commits> | grep -nE '^\+.*(try|catch|\.skip|\.only|as any|@ts-|eslint-disable)'`⟩ → hits only in `bench/paired/browser-page.mjs:27,31`: `accepts` and `pass` wrap the timed call in `try{}catch{}`. That is `.o`'s promoted instrument rule (`bench/paired/bench.mjs:13` "(try/catch) for every arm", `:28`, `:32`, landed `1c7b67f0`), identical for both arms; it is not around a product defect (throws are gated separately by `test/css/bbnf-depth.test.ts`). bbnf-lang `6d5a2b4a0` → 0 hits. The frozen pin is a strengthening (hand cases + the 3,049-source real corpus through all 7 entries, `expect(accepted).toBeGreaterThan(0)`), not a narrowing; the deleted `deepFreeze` is the cure the spec orders (ADDENDUM §2 Cure 2). **Held.**
- **(4) Commit families.** Cure 1 = bbnf-lang `6d5a2b4a0` (groups kind) + value.js `8850d74d` (consumer + leaf + re-emission) — one meaning per repo as L-4/Unit plan declare; Cure 2 = `ccb1f7a3` (freeze at construction + walk deleted + pin together); `baaec604` is a separate follow-up meaning (intermediate quantity as a plain literal), own commit; R-v-3 + instrument `6655c827`, records `41532531`; no lever admitted, so no lever commit. **Held.**
- **(5) E-3.** ⟨`git diff --stat 8d916780..HEAD -- docs/tranches/X/parse-that/waves/ docs/tranches/V/megatranche/registry/adjudicated/ docs/tranches/X/CONFORMANCE-2026-08-03.md`⟩ → prints nothing. The first `## Close` and Checks 1–3 are unchanged (only appends to this record). **Held.**
- **(6) Mail.** ⟨`grep -cE '\| *UNREAD *\|' docs/tranches/V/coordination/INBOX.md`⟩ → `0`; ⟨`find <p> -maxdepth 1 -type f -newer INBOX.md`⟩ over value.js `V/` + `V/coordination/`, glass `BK/coordination/` + `BL/` (⟨`ls -t glass-ui/docs/tranches | head -3`⟩ → `BL BK BJ`), keyframes.js `V/coordination/`, atlas `P/coordination/` → 0 files. **Clean.**
- **(7) Four-verb line.** The RESUME Close stamps nothing past PARTIAL (not IMPLEMENTED, not VERIFIED) because G-1/G-2 read RED; the LEDGER cell reads `PARTIAL — ESC-W7g-1 unruled …`. Lawful, and consistent with this check.
- **(1) Claimed GREENs, re-run by this seat** (records moved to scratchpad `chk/`; ⟨`git status --porcelain bench`⟩ → empty after each move):
  - K2-b ⟨`grep -rn deepFreeze src/css | wc -l`⟩ → `0`; ⟨`grep -n NUMERIC src/css/bbnf/math.ts | wc -l`⟩ → `0`. V-8 ⟨`grep -rn 'GRAMMAR_MODULES\|new ParserState\|reset()' src/css/bbnf | grep -v generated/ | wc -l`⟩ → `0`; ⟨`grep -rnE '/[^/]*\[xX\][^/]*/i' src/css/grammar | wc -l`⟩ → `0`. **Reproduces.** Cure 1 at the bytes: `tokens.bbnf` `dimension`/`angle` carry two capture groups; `math.ts` `tokenQuantity(digits, rawUnit)` bound as `{ kind: "groups" }`; no second regex.
  - K2-c + E-7 ⟨`npx vitest run test/css/bbnf-frozen.test.ts test/css/bbnf-depth.test.ts`⟩ → `Test Files 2 passed (2) · Tests 24 passed (24)`. **Reproduces.**
  - V-1 ⟨`node bench/paired/equiv.mjs product <out>`⟩ ×2 → `compared 1376531/1376531 rows · mismatches 88 (ASCII-only sources 0)` both times, split `parseCssValue 4 · parseCssValues 4 · functionParam 11 · splitTopLevel 13/11/45` (the F-b-4 set). **Reproduces ×2.**
  - ⟨`npm run -s test:css-equivalence`⟩ → `Tests 19 passed (19)`, every `MIRROR-DEFECTS 0`. **Reproduces.**
  - E-4 `--check` on the branch emitter without touching `node_modules`: ⟨`npx esbuild src/css/bbnf/actions.ts --bundle --platform=node --format=esm --outfile=<chk>/actions.mjs`⟩ then ⟨`node ../bbnf-lang-x-p-w7-typescript/typescript/dist/cli.js gen src/css/grammar/css.bbnf --actions <chk>/actions.mjs --out src/css/bbnf/generated/grammar.js --entries <gen-grammar.mjs ENTRIES> --check`⟩ ×2 → `grammar.js is current (sha256 49c9d7ef2843…)`, exit 0 both times; ⟨`git status --porcelain src`⟩ → empty. **Reproduces ×2.**
  - E-1/E-3/E-5 ⟨`npx vitest run`⟩ in `../bbnf-lang-x-p-w7-typescript/typescript` → `Test Files 17 passed (17) · Tests 282 passed (282)`; ⟨`npx tsc --noEmit -p .`⟩ → exit 0. **Reproduces.**
  - E-6 ⟨`npx esbuild src/css/bbnf/generated/grammar.js --minify | wc -c`⟩ → `94047`; `| gzip -9 | wc -c` → `12532` (the Close's `93999 / 12916` differ by measuring flags; both under 125,646 / 14,517). **Reproduces.**
  - **node K2-a / whole / G-2 node**, read 1 ⟨`node --expose-gc bench/paired/isolated.mjs chk1-node-r1 product 3 11 whole,acc,rej,large`⟩ (load `20.07` → `24.76`, peaks 46.9 recorded): whole color .653 · scalar .578 · value .402 · values .376 · keyframe .686 · timing .581 · stylesheet .607 (inside every ceiling); acc .587 · .578 · .314 · .324 · **keyframe .594** · .499 · .672; rej .659 · .578 · .466 · .481 · .670 · .642 · .672; large .426 (1 set aside, reported). `whole-7/7 GREEN` · `accepted-7/7 GREEN` · `rejected-7/7 GREEN`. Read 2 (tag `chk1-node-r2`, load `24.74` → `39.14`): whole .616 · .553 · .386 · .405 · .692 · .610 · .605; acc .571 · .575 · .336 · .347 · **.597** · .522 · .625; rej .706 · .570 · .469 · .473 · .679 · .639 · .620; large .431; all three 7/7 verdicts `GREEN`. **Reproduces ×2.**
  - **Browsers**, read 1 ⟨`node bench/paired/browser.mjs chk1-r1 chromium,webkit,firefox 2 whole,acc,rej,large 11 product`⟩ (load `28.29` → `39.05`): Chromium 22/22 summary rows `<1`, 44/44 clean cells < 1 (acc keyframe .600 / .578). WebKit 21/22: acc keyframe .667 / .615; **RED large 1.172 / 1.143** (the carried R-g-2). Firefox summary RED rows: **whole parseStylesheet 1.023 / .976 · rej parseCssValue 1.008 / .922 · rej parseCssValues 1.032 / 1.022 · rej parseStylesheet 1.084 / 1.128 · large 1.194 / 1.294** (3 large cells set aside, reported). Read 2, Firefox only (the engine in doubt) ⟨`node bench/paired/browser.mjs chk1-r2ff firefox 2 whole,rej 11 product`⟩ (→ load `22.07`): whole parseStylesheet .945 (4 cells set aside at .954–1.047); **rej parseCssValue 1.008 / 1.005 RED** (1 set aside 1.097); rej parseCssValues .912 (5 set aside at .977–1.041); **rej parseStylesheet 1.103 / 1.13 RED**.
  - **Does NOT reproduce:** the Close's Firefox rejected `parseCssValue` (.920 / .899 · .927 / .883) and rejected `parseCssValues` (.938 / .895 · .909 / .914) GREEN, and whole `parseStylesheet` (.966 / .943 · .981 / .929). This seat reads rej parseCssValue ≥ 1 in 3 of 4 clean cells over two reads, rej parseCssValues ≥ 1 in 2 of 3, whole parseStylesheet ≥ 1 in 1 of 3. The load here (22–39) is higher than the Close's (10.7–24.3); R-3 records load and never gates on it, so a cell at noise distance from 1.00 is not a stable GREEN. These rows sit on the same Firefox rejected-input path as the carried R-g-1.
  - ⟨`npx vitest run`⟩ → `Test Files 3 failed | 67 passed (70) · Tests 3 failed | 940 passed (943)`; the 3 are the foreign rows the Close names (`spectrum-luma` C-5 BORN-RED, `format-color` G16 A1, `reka-binding-idiom` NG-6), none under `src/css`/`test/css`. **Reproduces.** vue-tsc ⟨`-p tsconfig.lib.json`⟩ → 0; ⟨`-p tsconfig.test.json`⟩ → 5 errors, all TS5097 in the git-ignored `bench/paired/_build/{product,retired}-entry.ts` (⟨`… | grep -vc bench/paired/_build/`⟩ → `0`); the Close's recorded build-dir artefact, reproduces as recorded.
- **(8) Goal criterion at the bytes.** R-3 + G-browser + G-large (addendum 2026-09-23, binding): the emitted parser beats the retired parser on every entry, both halves, every engine, large sheets included. **NOT MET**: Firefox rejected parseStylesheet and large sheets on WebKit and Firefox read above 1.00 in every clean cell of this seat's reads, and Firefox rejected parseCssValue/parseCssValues sit at 1.00 ± noise. Met on node and Chromium in full, and on WebKit except large sheets. The correctness half (V-1, css-equivalence, frozen contract, depth, `--check`, size) is met.
- **(9) Published figures.** Node medians, the 88-row oracle split, 19/19, 940/943, 282/282, the WebKit large RED and the Firefox rej-stylesheet/large RED reproduce within noise. The Firefox rej parseCssValue/Values and whole parseStylesheet GREEN figures do not (axis 1). E-6's `93999 / 12916` re-reads `94047 / 12532` under this seat's flags (INFO; both under the ceiling).
- **(10) Honest-RED adjudication.**
  - **Relieved by the spec's own text:** P-6 · E-8 · V-9 + the CI `--check` step · Z-1 · Z-3 publish half (+ the installed-pin `--check` and bbnf-lang PR #1 merge). W7.md:196 "X.P.W7's close relieves P-6, E-8, V-9 plus the CI step, Z-1 and Z-3's publish half by citing X.P.W7P"; owner-named: X.P.W7P, GATE-KEYED on the owner's npm OTP (LEDGER:103). **Honest.**
  - **NOT relieved:** G-1 Firefox (rej parseStylesheet; and by this seat's reads rej parseCssValue/Values, whole parseStylesheet) and G-2 V-6 large on WebKit and Firefox. W7.md:196 "**Every engineering gate stays binding here**"; ADDENDUM §3 mints `.g` to cure exactly these gaps; the 09-23 addendum's G-browser ("must not be slower than the retired parser on any engine, per entry") and G-large supersede `.v`'s "recorded, not gated" line. They are not producer-owned (the emitter is this wave's own branch), not routed to a later wave (W7P.md:3 opens only after "X.P.W7 has CLOSED its engineering gates"), and not honest-RED by id in the spec. The record names them (R-g-1, R-g-2) and escalates them (ESC-W7g-1, three branches), but ⟨`grep -n ESC-W7g-1 docs/tranches/X/COHESION.md`⟩ → 0 hits: unruled. An escalation is not a relief.
- **Successor "Opens" conjuncts.** X.P.W7P (W7P.md:3): (a) the owner's npm OTP or step-1 publish → not supplied (LEDGER:103 `GATE-KEYED`); (b) "X.P.W7 has CLOSED its engineering gates" → RED (this check). **Both conjuncts RED; X.P.W7P is lawfully blocked.** No other wave names X.P.W7 in its Opens clause (⟨`grep -rn Opens docs/tranches/X/parse-that/waves docs/tranches/X/waves | grep W7`⟩ → only W7P names X.P.W7).

### Register (severity · claim · receipt · cure)
| # | Severity | Claim | Receipt | Cure |
|---|---|---|---|---|
| RC1-1 | HIGH | G-1 (G-browser, binding per W7.md:196) stays RED on Firefox rejected parseStylesheet, with no relief in the spec. | This seat: 1.084 / 1.128 · 1.103 / 1.13 (Close: 1.075 / 1.058 · 1.037 / 1.031); ESC-W7g-1 unruled (COHESION 0 hits). | The owner rules ESC-W7g-1: (a) a dated addendum re-scoping it to recorded, or (b) a follow-up lever that brings it < 1.00 ×2, or (c) the engine-split F8 admission; then re-read. |
| RC1-2 | HIGH | G-2 (V-6 / G-large) stays RED on WebKit and Firefox large sheets, with no relief in the spec. | WebKit 1.172 / 1.143; Firefox 1.194 / 1.294 (+3 set aside 1.19–1.33) (Close: WebKit 1.11–1.20, Firefox 1.14–1.23). | Same ruling as RC1-1 (ESC-W7g-1). |
| RC1-3 | HIGH | Close claims Firefox rejected parseCssValue and parseCssValues, and whole parseStylesheet, GREEN ×2 ("R-k2-1 … no action is owed"); this does not reproduce. | rej parseCssValue 1.008 / .922 · 1.008 / 1.005; rej parseCssValues 1.032 / 1.022 · .912; whole parseStylesheet 1.023 / .976 · .945 (load 22–39, recorded). | Name these rows in ESC-W7g-1's scope beside R-g-1 (the same Firefox rejected-input path) and re-open R-k2-1. Any GREEN claimed for them must hold at the loads the bench records, not only at quiet loads. |
| RC1-4 | MINOR | `vue-tsc -p tsconfig.test.json` is nonzero whenever `bench/paired/_build/*-entry.ts` exists (the git-ignored build dir the bench writes). | 5 × TS5097, all under `bench/paired/_build/`; 0 elsewhere. | The Close already names the owner: Track D's next bench-touching unit adds `bench/paired/_build` to the test tsconfig's exclude. It is mitigated, because the paths are untracked and CI never builds them. |
| RC1-5 | INFO | The E-6 size figure depends on the flags used to measure it. | `94047 / 12532` here vs `93999 / 12916` in the Close; both are under 125,646 / 14,517. | None needed. |

**Honest-RED set (relieved by W7.md:196 → X.P.W7P, owner-named, OTP-keyed):** P-6 · E-8 · V-9 + CI `--check` step · Z-1 · Z-3 publish half.
**Unrelieved RED:** G-1 Firefox (RC1-1, RC1-3) · G-2 WebKit/Firefox large (RC1-2).

**Verdict: NOT-CONFORMANT.** Nothing was written outside the File Bounds and no masking fallback was found. E-3 held, the mail is clean and the commit families are whole. Every correctness gate and every node, Chromium and WebKit (non-large) GREEN reproduces. Three things fail the bar. First, the engineering gates G-1 and G-2 are binding by the spec's own text and read RED, and ESC-W7g-1 is unruled. Second, three Firefox GREEN claims do not reproduce. Third, the RESUME Close's PARTIAL is honest, and this check agrees with it. The LEDGER status stays `PARTIAL`, and this seat appends an event line. X.P.W7P stays lawfully blocked on both of its conjuncts.

**Commits (this seat):** this section, plus one LEDGER event line.

## RESUME Repair 1 (2026-09-24, repair seat round 1, `claude-opus-5-5`, Track D; answers `## RESUME Check 1`)

**Open.** Spec read whole (W7.md, 214 lines, both addenda). From this record: header, `## RESUME Unit plan`, `## RESUME Check 1` (the last section), and the `.g` receipt's ESC-W7g-1 rows by grep only. **Crash-recovery:** ⟨`git status --porcelain docs/tranches/X/execution bench src tsconfig.test.json`⟩ → only a sibling's `A/X-W12.md` (not mine, untouched); parse-that master's dirty `rust/**`, `README.md`, `.cargo/config.toml` belong to other programs (untouched). **No inherited partial work.** ⟨`grep -n "ESC-W7g-1" COHESION.md`⟩ → 0 hits: the ruling is still owed.

| # | Defect | Cure | Commit | Gate re-read |
|---|---|---|---|---|
| RC1-1 | HIGH · G-1 Firefox rejected parseStylesheet RED | **Escalated, not cured.** The only cures Check 1 names are owner acts: ruling ESC-W7g-1 as (a) re-scope, (b) mint a follow-up lever, or (c) an engine-split F8 admission. §0cp 3 grants exactly four levers, and `.g` built and measured all four; none qualifies (`.g` receipt, ESC-W7g-1). A fifth lever or an engine split is a new grant, and granting it is outside this seat's bounds. | none | cited from Check 1 (1.084 / 1.128 · 1.103 / 1.13); no product byte moved, so no re-read |
| RC1-2 | HIGH · G-2 WebKit/Firefox large RED | **Escalated, not cured.** This needs the same ESC-W7g-1 ruling. | none | cited from Check 1 (WebKit 1.172 / 1.143; Firefox 1.194 / 1.294) |
| RC1-3 | HIGH · three Firefox GREEN claims do not reproduce | **Record correction, dated here (E-3: the RESUME Close stands unedited).** ESC-W7g-1's scope now includes, beside R-g-1: Firefox **rejected parseCssValue**, **rejected parseCssValues** and **whole parseStylesheet**. They sit at 1.00 ± noise, and at Check 1's loads (22–39) at least one clean cell of each reads ≥ 1. **R-k2-1 is re-opened.** The RESUME Close:1142 line "no action is owed" is withdrawn. Its owner is the orchestrator, through ESC-W7g-1. The `.k2` fork (built frozen versus SpiderMonkey's `Object.freeze` on the refused path, `.k2` receipt:969) is the named cause if branch (b) is ruled. No GREEN is claimed for these rows. | this section | Check 1's figures stand (1.008 / .922 · 1.008 / 1.005; 1.032 / 1.022 · .912; 1.023 / .976 · .945) |
| RC1-4 | MINOR · `vue-tsc -p tsconfig.test.json` nonzero while `bench/paired/_build/*.ts` exists | `tsconfig.test.json` gets `"exclude": ["bench/paired/_build/**"]`. Adjacent edit under §0bt: an ignore entry for the git-ignored generated bench entries (⟨`git check-ignore -v bench/paired/_build/product-entry.ts`⟩ → `.gitignore:12:_*`). | `ceab2066` | ⟨`ls bench/paired/_build/*.ts`⟩ → 2 files present; ⟨`npx vue-tsc --noEmit -p tsconfig.test.json \| grep -c "error TS"`⟩ ×2 → `0` / `0`, exit 0 (was 5 × TS5097). **GREEN ×2.** |
| RC1-5 | INFO · E-6 flags | none (both readings under the ceiling) | — | — |

**Adjacent edits (§0bt):** `tsconfig.test.json:40`. The `exclude` entry keeps the bench's git-ignored build output out of the typed test program. Its concern is the bench, which is `.g`'s grant.

**Gates a cure could move:** only the test-program typecheck (RC1-4), re-read ×2 above. No byte moved under `src/`, `bench/` or bbnf-lang, so the timing, oracle and size gates stand as Check 1 read them.

**Escalations:** ESC-W7g-1 is still open. Its scope now covers R-g-1 (Firefox rejected parseStylesheet), R-g-2 (WebKit/Firefox large), and the re-opened R-k2-1 rows (Firefox rejected parseCssValue/parseCssValues, whole parseStylesheet). The owner's ruling, (a), (b) or (c), is the only cure. X.P.W7 stays **PARTIAL**, and X.P.W7P stays blocked on both of its conjuncts.

**Commits (this seat):** `ceab2066` (RC1-4) · this section · one LEDGER event line.

## RESUME Check 2 (2026-09-24, L-20 pass 2, `claude-opus-5-5`, Track D; verify-only, cures nothing)

**Open.** Spec read whole (W7.md, 214 lines, both addenda). From this record: `## RESUME Open` through `## RESUME Unit plan`, `## RESUME Close`, `## RESUME Check 1`, `## RESUME Repair 1` (the last section). **Crash-recovery:** ⟨`git status --porcelain docs/tranches/X/execution/`⟩ → only siblings' `A/X-W12.md` and `B/KF-W13V.md` (not mine, untouched); `../bbnf-lang-x-p-w7-typescript` and `../parse-that-x-p-w7` clean at their origin branches; parse-that master's dirty `rust/**`, `README.md`, `.cargo/config.toml` belong to other programs (untouched). **No inherited partial work.** Product bytes: ⟨`git log --oneline a1f2513c..HEAD -- src bench test package.json package-lock.json tsconfig*.json scripts .github`⟩ → only `ceab2066` (`tsconfig.test.json`, +1 `exclude` line); ⟨`node bench/paired/build.mjs`⟩ → `srcDirty ""`, `bankedManifestOk 79/79`, HEAD `c7f2bef7`. **ESC-W7g-1:** ⟨`grep -n "ESC-W7g-1" docs/tranches/X/COHESION.md`⟩ → 0 hits (the only `ESC-W7g-*` rows at `:3015`/`:3075` are Track A's X-W7 `.g2`, a different wave); last COHESION section `§0cw` (Track B), none rules X.P.W7. **Still unruled.**

### Axes
- **(2) Writes inside §File Bounds.** The RESUME commits `8850d74d` `ccb1f7a3` `baaec604` `a2aec4cb` `6655c827` `41532531` `df9c6f7e` were verified by Check 1 (unchanged since). New since Check 1: ⟨`git show --stat ceab2066`⟩ → `tsconfig.test.json | 3 ++-` (the declared §0bt adjacent ignore entry for the git-ignored bench build dir, concern = `.g`'s bench grant; lawful under §0bt "an ignore entry for non-code paths"); ⟨`git show --stat c7f2bef7`⟩ → this record + LEDGER (+1 line). ⟨`git log --oneline 8d916780..HEAD -- scripts/dev/dev.sh`⟩ → empty. **Held.**
- **(3) No masking fallback.** `ceab2066` excludes only `bench/paired/_build/**` (⟨`git check-ignore`⟩ per Repair 1: `.gitignore:12:_*`, untracked generated entry files); no test, assertion or tracked source leaves the typed program. The rest as Check 1 read it. **Held.**
- **(4) Commit families.** `ceab2066` one meaning (RC1-4); record + ledger `c7f2bef7`. **Held.**
- **(5) E-3.** ⟨`git diff --stat 8d916780..HEAD -- docs/tranches/X/parse-that/waves/ docs/tranches/V/megatranche/registry/adjudicated/ docs/tranches/X/CONFORMANCE-2026-08-03.md`⟩ → prints nothing. Prior sections unedited (appends only). **Held.**
- **(6) Mail.** ⟨`grep -cE '\| *UNREAD *\|' docs/tranches/V/coordination/INBOX.md`⟩ → `0`. **Clean.**
- **(7) Four-verb line.** LEDGER row reads `PARTIAL — ESC-W7g-1 unruled …`; no verb stamped past PARTIAL. Lawful.
- **(1) Claimed GREENs, re-run by this seat** (records moved to the scratchpad; ⟨`git status --porcelain bench`⟩ → empty after):
  - K2-b ⟨`grep -rn deepFreeze src/css | wc -l`⟩ → `0`; ⟨`grep -n NUMERIC src/css/bbnf/math.ts | wc -l`⟩ → `0`. V-8 ⟨`grep -rn 'GRAMMAR_MODULES\|new ParserState\|reset()' src/css/bbnf | grep -v generated/ | wc -l`⟩ → `0`; ⟨`grep -rnE '/[^/]*\[xX\][^/]*/i' src/css/grammar | wc -l`⟩ → `0`. **Reproduces.**
  - K2-c + E-7 ⟨`npx vitest run test/css/bbnf-frozen.test.ts test/css/bbnf-depth.test.ts`⟩ → `Test Files 2 passed (2) · Tests 24 passed (24)`. **Reproduces.**
  - ⟨`npm run -s test:css-equivalence`⟩ → `Tests 19 passed (19)`, every `MIRROR-DEFECTS 0`. **Reproduces.**
  - V-1 ⟨`node bench/paired/equiv.mjs product <scratch>/eq{1,2}.json`⟩ ×2 → `compared 1376531/1376531 rows · mismatches 88 (ASCII-only sources 0)` both, split `parseCssValue 4 · parseCssValues 4 · functionParam 11 · splitTopLevel 13/11/45` (F-b-4). **Reproduces ×2.**
  - Repair 1's RC1-4: ⟨`npx vue-tsc --noEmit -p tsconfig.test.json | grep -c "error TS"`⟩ → `0` with `bench/paired/_build/*.ts` present (just rebuilt); `-p tsconfig.lib.json` → `0`. **Reproduces.**
  - bbnf-lang ⟨`npx vitest run`⟩ in `../bbnf-lang-x-p-w7-typescript/typescript` → `Test Files 17 passed (17) · Tests 282 passed (282)`; ⟨`npx tsc --noEmit -p .`⟩ → exit 0. parse-that ⟨`npx vitest run`⟩ in `../parse-that-x-p-w7/typescript` → `Tests 143 passed (143)`. **Reproduces.**
  - **node** ⟨`node --expose-gc bench/paired/isolated.mjs chk2-node-r1 product 3 11 whole,acc,rej,large`⟩ (load `46.26` → `38.99`, recorded; siblings' seats running): whole medians color .650 · scalar .530 · value .406 · values .399 · keyframe .684 · timing .618 · stylesheet .630 (all inside ceilings .90/.81/.57/.58/.78/.87/.85); acc .584 · .655 · .323 · .333 · **keyframe .620** · .504 · .627; rej .666 · .569 · .489 · .463 · .675 · .656 · .626; large .43 / .98 / .412 (0 set aside; every clean cell < 1, the .98 cell 8/11 rounds < 1). `whole-7/7 GREEN` · `accepted-7/7 GREEN` · `rejected-7/7 GREEN` (O-2 `DOES NOT HOLD` = product faster than stock, as before). With Check 1's two reads this is the third node read GREEN. **Reproduces.**
  - **Browsers, the contested rows** ⟨`node bench/paired/browser.mjs chk2-br1 webkit,firefox 2 whole,rej,large 11 product parseCssValue,parseCssValues,parseStylesheet`⟩ (load `39.12` → `40.77`, recorded), 2 reps:
    - WebKit whole parseCssValue .503/.497 · Values .507/.509 · parseStylesheet .707/.695; rej .633/.641 · .633/.657 · .750/.757 — **GREEN**; **large parseStylesheet 1.154 / 1.125 RED** (R-g-2 reproduces).
    - Firefox whole parseCssValue .724/.728 · Values .775/.699 — GREEN; **whole parseStylesheet .967 / 1.000 RED** · **rej parseCssValue 1.000 / 1.017 RED** · **rej parseCssValues 1.027 / .984 RED** · **rej parseStylesheet 1.055 / 1.098 RED** · **large 1.265 / 1.278 RED**.
    - The RED set is exactly Check 1's and Repair 1's ESC-W7g-1 scope (R-g-1, R-g-2, re-opened R-k2-1). Repair 1 claimed no GREEN for these rows; its record correction stands.
  - **Cited, not re-run** (product bytes unchanged since Check 1 except the tsconfig exclude): `npm test` 940/943 (3 foreign), `gen-grammar --check` on the branch emitter ×2, E-6 size 94,047/12,532, E-2 audit, Chromium 22/22 ×2 (Check 1).
- **(8) Goal criterion at the bytes.** R-3 + G-browser + G-large (ADDENDUM 2026-09-23, binding): faster than the retired parser on every entry, both halves, every engine, large sheets included. **NOT MET** on Firefox (rejected parseStylesheet/parseCssValue/parseCssValues, whole parseStylesheet, large) and WebKit large. Met on node and Chromium in full, WebKit except large. Correctness half met.
- **(9) Published figures.** Repair 1's figures (RC1-4 `0 ×2`; Check 1's Firefox numbers carried) reproduce; node medians, the 88-row split, 19/19, 282/282, 143/143 reproduce.
- **(10) Honest-RED adjudication.**
  - **Relieved by the spec:** P-6 · E-8 · V-9 + CI `--check` step · Z-1 · Z-3 publish half (+ the installed-pin `--check`, bbnf-lang PR #1 merge). W7.md:196 "X.P.W7's close relieves P-6, E-8, V-9 plus the CI step, Z-1 and Z-3's publish half by citing X.P.W7P"; owner X.P.W7P, GATE-KEYED on the owner's npm OTP (LEDGER:103). **Honest.**
  - **NOT relieved:** G-1 Firefox (rej parseStylesheet, rej parseCssValue, rej parseCssValues, whole parseStylesheet) and G-2 V-6 large on WebKit + Firefox. W7.md:196 "**Every engineering gate stays binding here**"; ADDENDUM §3 mints `.g` for exactly these gaps; not producer-owned (the emitter is this wave's own branch), not routed to a successor (W7P.md:3 opens only after "X.P.W7 has CLOSED its engineering gates"), not named honest-RED by id. Registered (R-g-1, R-g-2, R-k2-1) and escalated (ESC-W7g-1), but the escalation is unruled (COHESION 0 hits). An escalation is not a relief.
- **Successor "Opens" conjuncts.** X.P.W7P (W7P.md:3): (a) owner's npm OTP / step-1 publish → not supplied (LEDGER:103 `GATE-KEYED`); (b) "X.P.W7 has CLOSED its engineering gates" → RED. **X.P.W7P is lawfully blocked on both.** No other wave names X.P.W7 in an Opens clause (the `X-W7` hits in `waves/W7R.md`, `W8.md`, `W10.md`, `W12.md` are Track A's X-W7).

### Register (severity · claim · receipt · cure)
| # | Severity | Claim | Receipt | Cure |
|---|---|---|---|---|
| RC2-1 | HIGH | G-1 (G-browser, binding per W7.md:196) RED on Firefox rejected parseStylesheet, with no spec relief; ESC-W7g-1 unruled. | 1.055 / 1.098 (this seat); Check 1 1.084/1.128 · 1.103/1.13; COHESION `ESC-W7g-1` 0 hits. | Owner rules ESC-W7g-1 — (a) dated addendum re-scoping to recorded, (b) a follow-up lever to < 1.00 ×2, or (c) the engine-split F8 admission — then re-read. Not seat-curable (§0cp 3's four levers all measured and refused by `.g`). |
| RC2-2 | HIGH | G-2 (V-6 / G-large) RED on WebKit and Firefox large sheets, no spec relief. | WebKit 1.154 / 1.125; Firefox 1.265 / 1.278 (this seat); Check 1 WebKit 1.172/1.143, Firefox 1.194/1.294. | Same ruling (ESC-W7g-1). |
| RC2-3 | HIGH | G-1 Firefox rejected parseCssValue/parseCssValues and whole parseStylesheet sit at ≥ 1.00 in at least one clean rep (the re-opened R-k2-1, now in ESC-W7g-1's scope per Repair 1). | rej parseCssValue 1.000 / 1.017 · rej parseCssValues 1.027 / .984 · whole parseStylesheet .967 / 1.000. | Same ruling (ESC-W7g-1); any GREEN claimed must hold at the loads the bench records. |
| RC2-4 | INFO | Check 1's RC1-4 is cured and reproduces. | `vue-tsc -p tsconfig.test.json` → 0 with `_build` present. | None. |

**Honest-RED set (relieved by W7.md:196 → X.P.W7P, owner-named, OTP-keyed):** P-6 · E-8 · V-9 + CI `--check` step · Z-1 · Z-3 publish half.
**Unrelieved RED:** G-1 Firefox (RC2-1, RC2-3) · G-2 WebKit/Firefox large (RC2-2).

**Verdict: NOT-CONFORMANT.** No write outside the File Bounds, no masking fallback, E-3 held, mail clean, families whole, and every claimed GREEN reproduces (node ×1 here + Check 1's ×2, correctness, Repair 1's RC1-4). The bar fails on the binding engineering gates G-1 (Firefox) and G-2 (WebKit/Firefox large), which read RED again, with ESC-W7g-1 still unruled. No seat can cure this: it needs the owner's ruling. The LEDGER status stays `PARTIAL`, this seat appends one event line, and X.P.W7P stays lawfully blocked.

**Commits (this seat):** this section, plus one LEDGER event line.

## RESUME Repair 2 (2026-09-24, repair seat round 2, `claude-opus-5-5`, Track D; answers `## RESUME Check 2`)

**Open.** Spec read whole (W7.md, 214 lines, both addenda); record read from `## RESUME Check 2`. **Crash-recovery:** ⟨`git status --porcelain docs/tranches/X/execution/`⟩ → only siblings' `A/X-W12.md`, `B/KF-W13V.md` (untouched); dirty `../parse-that` paths are all under `rust/**`, `.cargo/`, `README.md` — outside this wave's writable set (W7.md:65 "Nothing under `rust/`"), a sibling's, untouched. No inherited partial work on this unit.

**Ruling probe.** ⟨`grep -c ESC-W7g-1 docs/tranches/X/COHESION.md`⟩ → `0`. No dated addendum beside W7.md after `ADDENDUM 2026-09-24` (⟨`grep -n '^## ADDENDUM' W7.md`⟩ → the two already read). ESC-W7g-1 stays **unruled**.

| # | Defect | Cure | Commit | Gate re-reading |
|---|---|---|---|---|
| RC2-1 | HIGH · G-1 Firefox rej parseStylesheet RED | **ESCALATED** — needs the owner's ESC-W7g-1 ruling ((a) re-scope addendum, (b) a new lever grant, (c) F8 engine-split admission). §0cp 3's four levers were each built and measured by `.g` and none qualified; any further emitter lever is ungranted, so building one is a write outside the grant. | — | Not re-run: no product byte moved (Check 2's 1.055 / 1.098 stands). |
| RC2-2 | HIGH · G-2 WebKit/Firefox large RED | **ESCALATED** — same ruling. | — | Check 2's WebKit 1.154 / 1.125, Firefox 1.265 / 1.278 stand. |
| RC2-3 | HIGH · Firefox rej parseCssValue/Values, whole parseStylesheet ≥ 1.00 | **ESCALATED** — same ruling (re-opened R-k2-1 inside ESC-W7g-1 scope). | — | Check 2's figures stand. |
| RC2-4 | INFO · RC1-4 cured | None owed. | — | — |

**Cured 0 · escalated 3 (one ruling: ESC-W7g-1).** Product bytes unchanged since `ceab2066`; no gate a cure could move exists, so none re-run (WRITE-THEN-MEASURE: the figures above are Check 2's, cited, not re-published). Row stays **PARTIAL**.

**Commits (this seat):** this section, plus one LEDGER event line.

## RESUME Check 3 (2026-09-24, L-20 pass 3, `claude-opus-5-5`, Track D; verify-only, cures nothing)

**Open.** Spec read whole (W7.md, 214 lines, both addenda). From this record: `## RESUME Open` through `## RESUME Unit plan`, the `## RESUME Close` gate table/residuals/four-verb line, `## RESUME Check 2`, `## RESUME Repair 2` (the last section). **Crash-recovery:** ⟨`git status --porcelain -- src bench test package.json package-lock.json docs/tranches/X/execution/`⟩ → only siblings' `A/X-W12.md`, `B/KF-W13V.md` (untouched); `../bbnf-lang-x-p-w7-typescript` clean at `6d5a2b4a0`, `../parse-that-x-p-w7` clean at `96e68e9`; parse-that master's dirty `rust/**`, `README.md`, `.cargo/config.toml` belong to other programs (W7.md:65 "Nothing under `rust/`"; untouched). **No inherited partial work.** **Ruling probe:** ⟨`grep -n ESC-W7g-1 docs/tranches/X/COHESION.md`⟩ → 0 hits; last COHESION section `§0cw` (Track B); ⟨`grep -n '^## ADDENDUM' W7.md`⟩ → `165`, `192` only. **ESC-W7g-1 still unruled.** Product bytes: ⟨`git log --oneline ceab2066..HEAD -- src bench test package.json package-lock.json tsconfig*.json scripts .github`⟩ → empty (unchanged since Repair 1).

### Axes
- **(2) Writes inside §File Bounds.** No commit since Check 2 touches product or bench paths (above); the RESUME commits were verified by Checks 1–2. ⟨`git log --oneline 8d916780..HEAD -- scripts/dev/dev.sh`⟩ → empty. **Held.**
- **(3) No masking fallback.** No diff since Check 2; nothing to re-read. **Held.**
- **(4) Commit families.** Unchanged. **Held.**
- **(5) E-3.** ⟨`git diff --stat 8d916780..HEAD -- docs/tranches/X/parse-that/waves/ docs/tranches/V/megatranche/registry/adjudicated/ docs/tranches/X/CONFORMANCE-2026-08-03.md`⟩ → prints nothing. **Held.**
- **(6) Mail.** ⟨`grep -cE '\| *UNREAD *\|' docs/tranches/V/coordination/INBOX.md`⟩ → `0`. **Clean.**
- **(7) Four-verb line.** LEDGER:102 reads `PARTIAL — ESC-W7g-1 unruled …`; nothing stamped past PARTIAL. **Lawful.**
- **(1) Claimed GREENs, re-run by this seat** (records moved to the scratchpad `chk3/`; ⟨`git status --porcelain bench`⟩ → empty after):
  - K2-b ⟨`grep -rn deepFreeze src/css | wc -l`⟩ → `0`; ⟨`grep -n NUMERIC src/css/bbnf/math.ts | wc -l`⟩ → `0`. V-8 ⟨`grep -rn 'GRAMMAR_MODULES\|new ParserState\|reset()' src/css/bbnf | grep -v generated/ | wc -l`⟩ → `0`; ⟨`grep -rnE '/[^/]*\[xX\][^/]*/i' src/css/grammar | wc -l`⟩ → `0`. **Reproduces.**
  - K2-c + E-7 ⟨`npx vitest run test/css/bbnf-frozen.test.ts test/css/bbnf-depth.test.ts`⟩ → `Test Files 2 passed (2) · Tests 24 passed (24)`. **Reproduces.**
  - ⟨`npm run -s test:css-equivalence`⟩ → `Tests 19 passed (19)`, 0 non-zero `MIRROR-DEFECTS`. **Reproduces.**
  - ⟨`node bench/paired/build.mjs`⟩ → `srcDirty ""`, `bankedManifestOk 79/79`.
  - V-1 ⟨`node bench/paired/equiv.mjs product <scratch>/eq{1,2}.json`⟩ ×2 → `compared 1376531/1376531 rows · mismatches 88 (ASCII-only sources 0)` both; split `parseCssValue 4 · parseCssValues 4 · functionParam 11 · splitTopLevel 13/11/45` (F-b-4). **Reproduces ×2.**
  - ⟨`npx vue-tsc --noEmit -p tsconfig.test.json | grep -c "error TS"`⟩ → `0` (with `_build` present). **Reproduces.**
  - bbnf-lang ⟨`npx vitest run`⟩ (branch worktree `typescript/`) → `Test Files 17 passed (17) · Tests 282 passed (282)`; ⟨`npx tsc --noEmit -p .`⟩ → exit 0. parse-that ⟨`npx vitest run`⟩ (`../parse-that-x-p-w7/typescript`) → `Test Files 15 passed (15) · Tests 143 passed (143)`. **Reproduces.**
  - **node** ⟨`node --expose-gc bench/paired/isolated.mjs chk3-node product 3 11 whole,acc,rej,large`⟩ (load `45.22` → `54.20`, recorded; sibling seats running): whole medians color .623 · scalar .597 · value .415 · values .406 · keyframe .689 · timing .629 · stylesheet .598 (all inside ceilings .90/.81/.57/.58/.78/.87/.85); acc .598 · .601 · .335 · .328 · **keyframe .603** · .504 · .626; rej .682 · .577 · .471 · .463 · .684 · .650 · .628; large clean .456 / .434 (4 set aside for spread ≥1.6, every one reported, all < 1: .373/.434/.435/.453). `whole-7/7 GREEN` · `accepted-7/7 GREEN` · `rejected-7/7 GREEN`. Fourth node read GREEN. **Reproduces.**
  - **Browsers, contested rows** ⟨`node bench/paired/browser.mjs chk3-br webkit,firefox 2 whole,rej,large 11 product parseCssValue,parseCssValues,parseStylesheet`⟩ (load `54.20` → `31.11`, recorded), 2 reps:
    - WebKit whole .497/.509 · .497/.505 · .703/.704; rej .645/.630 · .656/.642 · .758/.750 — **GREEN**; **large parseStylesheet 1.162 / 1.222 RED** (R-g-2).
    - Firefox whole parseCssValue .694/.708 · Values .663/.667 · parseStylesheet .951/.924 — GREEN this read; rej parseCssValue .944/.954 · rej parseCssValues .937/.906 (+ one set-aside .973) — GREEN this read; **rej parseStylesheet 1.070 / 1.137 RED** (R-g-1) · **large 1.158 / 1.226 RED** (R-g-2).
    - The Firefox whole-stylesheet and rej value/values cells (RC2-3) read < 1 here but ≥ 1.00 in Check 2 at similar load: they sit at noise distance from 1 and are not stable GREENs; they stay inside ESC-W7g-1's scope.
  - **Cited, not re-run** (product bytes unchanged since Check 1): `npm test` 940/943 (3 foreign), `gen-grammar --check` ×2, E-6 size, E-2 audit, Chromium 22/22 ×2.
- **(8) Goal criterion at the bytes.** R-3 + G-browser + G-large (ADDENDUM 2026-09-23, binding; W7.md:196 "Every engineering gate stays binding here"): **NOT MET** on Firefox rejected parseStylesheet and on WebKit/Firefox large sheets. Met on node and Chromium in full, WebKit except large. Correctness half met.
- **(9) Published figures.** The RESUME Close's node, correctness, and suite figures reproduce; its Firefox rej stylesheet (1.03–1.08) and WebKit/Firefox large (1.11–1.23) REDs reproduce in range (1.07–1.14; 1.16–1.23).
- **(10) Honest-RED adjudication.**
  - **Relieved by the spec:** P-6 · E-8 · V-9 + CI `--check` step · Z-1 · Z-3 publish half (+ installed-pin `--check`, bbnf-lang PR #1 merge). W7.md:196 "X.P.W7's close relieves P-6, E-8, V-9 plus the CI step, Z-1 and Z-3's publish half by citing X.P.W7P"; owner X.P.W7P, GATE-KEYED on the owner's npm OTP (LEDGER:103). **Honest.**
  - **NOT relieved:** G-1 Firefox rejected parseStylesheet and G-2 (V-6/G-large) WebKit + Firefox large sheets. W7.md:196 "**Every engineering gate stays binding here**"; ADDENDUM §3 mints `.g` for exactly these gaps; not producer-owned (the emitter is this wave's own branch), not routed to a successor (W7P.md:3 opens only after "X.P.W7 has CLOSED its engineering gates"), not named honest-RED by id. Registered (R-g-1, R-g-2) and escalated (ESC-W7g-1), but unruled (COHESION 0 hits). An escalation is not a relief.
- **Successor "Opens" conjuncts.** X.P.W7P (W7P.md:3): (a) owner's npm OTP or step-1 publish → not supplied (LEDGER:103 `GATE-KEYED`); (b) "X.P.W7 has CLOSED its engineering gates" → RED. **X.P.W7P is lawfully blocked on both.** No other wave names X.P.W7 in an Opens clause.

### Register (severity · claim · receipt · cure)
| # | Severity | Claim | Receipt | Cure |
|---|---|---|---|---|
| RC3-1 | HIGH | G-1 (G-browser, binding per W7.md:196) RED on Firefox rejected parseStylesheet, with no spec relief; ESC-W7g-1 unruled. | 1.070 / 1.137 (this seat, load 54→31); Check 2 1.055/1.098; Close 1.075/1.058 · 1.037/1.031. | Owner rules ESC-W7g-1: (a) a dated addendum re-scoping to recorded, (b) a new lever grant to < 1.00 ×2, or (c) the engine-split F8 admission; then re-read. No seat can cure it: §0cp 3's four levers were all measured and refused by `.g`. |
| RC3-2 | HIGH | G-2 (V-6 / G-large) RED on WebKit and Firefox large sheets, no spec relief. | WebKit 1.162 / 1.222; Firefox 1.158 / 1.226 (this seat); Check 2 WebKit 1.154/1.125, Firefox 1.265/1.278. | Same ruling (ESC-W7g-1). |
| RC3-3 | MINOR | Firefox rej parseCssValue/Values and whole parseStylesheet (RC2-3) read < 1 in this seat's cells but ≥ 1.00 in Check 2's at similar load. Noise distance from 1, not a stable GREEN. | This seat: .944/.954 · .937/.906 · .951/.924; Check 2: 1.000/1.017 · 1.027/.984 · .967/1.000. | Keep them inside ESC-W7g-1's scope. Any GREEN claimed on them must hold across reads at the loads the bench records. |

**Honest-RED set (relieved by W7.md:196 → X.P.W7P, owner-named, OTP-keyed):** P-6 · E-8 · V-9 + CI `--check` step · Z-1 · Z-3 publish half.
**Unrelieved RED:** G-1 Firefox rejected parseStylesheet (RC3-1) · G-2 WebKit/Firefox large (RC3-2).

**Verdict: NOT-CONFORMANT.** Nothing was written outside the File Bounds and there is no masking fallback. E-3 held, mail is clean, and the commit families are whole. Every claimed GREEN reproduces: node whole/acc/rej 7/7 GREEN, V-1 88 = F-b-4 ×2, css-equiv 19/19, frozen+depth 24/24, vue-tsc 0, bbnf-lang 282/282 + tsc 0, parse-that 143/143. The bar still fails on the binding engineering gates G-1 (Firefox rejected stylesheet) and G-2 (WebKit/Firefox large), which read RED for the third check running while ESC-W7g-1 stays unruled. That ruling belongs to the owner or orchestrator, and no seat can make it. The LEDGER status stays `PARTIAL`. This seat appends one event line. X.P.W7P stays lawfully blocked.

**Commits (this seat):** this section, plus one LEDGER event line.

## RESUME 3 — Open (2026-09-24, seat 0, `claude-opus-5-5`, Track D; COHESION §0cx + W7.md ADDENDUM (b))

- **Mode:** RESUME 3. ⟨`grep -n "| X.P.W7 |" LEDGER.md`⟩ → `:102` status `PARTIAL — ESC-W7g-1 unruled: …` (not CLOSED); this record exists. Governing text: W7.md read whole (230 lines, all three addenda; ADDENDUM (b) at `:216` binds) and COHESION §0cx (`:3386`, the file end). Read from this record: `## RESUME Open` through `## RESUME Unit plan` and `## RESUME Check 3` (the last section).
- **alreadyDone (ADDENDUM (b): "alreadyDone: `.o .p .t .e .v .k .k2 .g`"), verified at the bytes:** ⟨`git cat-file -e <sha>^{commit}`⟩ → value.js `8850d74d` `ccb1f7a3` `baaec604` (`.k2`) · `a2aec4cb` `6655c827` `41532531` `df9c6f7e` (`.g`) · `ccf8d1b3` (RESUME Close) · `8b08db4b` (Repair 1) all OK; bbnf-lang `6d5a2b4a0` (`.k2` groups action kind) OK = branch `x-p-w7-typescript` HEAD. `.o`…`.k` verified at the RESUME Open (record:867). `.z` re-opens only in X.P.W7P.
- **Crash-recovery:** ⟨`git status --porcelain | grep -E "src/|bench/|execution/D/|test/css|scripts/gen-grammar"`⟩ → empty; ⟨`git -C ../bbnf-lang-x-p-w7-typescript status --porcelain`⟩ → empty (HEAD `6d5a2b4a0`). **No inherited partial work.**
- **Preconditions:** `.l` opens on §0cx's ruling (not on a predecessor wave): ⟨`grep -n "^## §0cx" COHESION.md`⟩ → `3386` (commit `3a776571`); W7.md:216 ADDENDUM (b) present; `.k2` + `.g` commits exist (above); linked worktree present. Release chain stays X.P.W7P (LEDGER:103 `GATE-KEYED … npm one-time password`). **MET.** No npm act in this wave.

### E13 Step-0 mail sweep (2026-09-24)
- ⟨`ls -td glass-ui/docs/tranches/B*/ | head -3`⟩ → `BL BK BJ` (BL newest, no `coordination/`; BK stays the mail path, BL root swept).
- ⟨`find <path> -maxdepth 1 -type f -newer INBOX.md`⟩ over value.js `V/` + `V/coordination/` · glass `BK/coordination/` + `BL/` · keyframes.js `V/coordination/` · atlas `P/coordination/` → **0 files** on every path. ⟨`grep '^| I-' INBOX.md | grep -c '| UNREAD'`⟩ → `0`.
- **Result: 0 unrowed · 0 UNREAD in scope.** A dated sweep line was appended to INBOX.md.

## RESUME 3 Baseline (BEFORE, read-only, 2026-09-24; product bytes = `.k2`/Repair-1 bytes, unchanged)

Seat-0 note: this section was completed by a relaunched seat 0 (the first RESUME 3 seat 0 was killed after writing the Open, the sweep and the plan, before committing). Its uncommitted hunks (this record, the INBOX sweep line, `bench/records/2026-09-24-x-p-w7-browser-l-open.json`) were read whole, judged conforming, and are committed here as inherited.

- ⟨`git log --oneline 3ec883a3..HEAD -- src bench test/css scripts/gen-grammar.mjs`⟩ → empty: product bytes are the Check 3 bytes. bbnf-lang worktree `x-p-w7-typescript` HEAD `6d5a2b4a0`, clean.
- **RESUME rule:** `.l` turns L-G1 (the browser RED cells) and L-G3; every other gate is cited from RESUME Check 3 (record `## RESUME Check 3`: node whole/acc/rej 7/7 GREEN, acc keyframe .603 · V-1 88 = F-b-4 ×2 · css-equiv 19/19 · frozen+depth 24/24 · vue-tsc 0 · bbnf-lang 282/282 · parse-that 143/143).

| Gate | Command | BEFORE (2 reps, paired median) | Reading |
|---|---|---|---|
| L-G1 WebKit rej value/values/stylesheet | ⟨`node bench/paired/browser.mjs l-open webkit,firefox 2 rej,large 11 product parseCssValue,parseCssValues,parseStylesheet`⟩ → `bench/records/2026-09-24-x-p-w7-browser-l-open.json` (load 58.58 → 30.77, recorded; WebKit 26.4, Firefox 150.0.2) | .627/.635 · .643/.627 · .744/.750 | GREEN (stay-GREEN) |
| L-G1 WebKit large parseStylesheet | same | **1.111 / 1.192** | **born-RED** |
| L-G1 Firefox rej parseCssValue | same | 1 clean .904 (4 attempts set aside, spread 1.6–4.7, reads 1.092/1.075/.913/1.038) | noise-distance (RC3-3), in scope |
| L-G1 Firefox rej parseCssValues | same | .975 / .916 | noise-distance (RC3-3), in scope |
| L-G1 Firefox rej parseStylesheet | same | **1.042 / 1.050** | **born-RED** |
| L-G1 Firefox large parseStylesheet | same | **1.170 / 1.101** | **born-RED** |
| L-G3 instrument bytes in shipped `generated/` | ⟨`grep -rln "instrument\|__prof" src/css/bbnf/generated`⟩ | 0 (no instrument exists yet) | vacuous before the flag lands; not a GREEN-before-cure |
| K2-b post-hoc walk | ⟨`grep -rn deepFreeze src`⟩ | 0 | stay-GREEN |

**greenBeforeCure: none.**

## RESUME 3 Unit plan (2026-09-24)

**alreadyDone:** `.o .p .t .e .v .k .k2 .g` (never re-dispatched; ADDENDUM (b)). **`.z`:** re-opens only in X.P.W7P. **Owed:** `[X.P.W7.l]` alone, then close. One concurrent. Every seat Opus 5.5 (owner's Opus-only order, 2026-09-23). An ESCALATED `.l` does not halt the wave: the close runs on it.

### Rulings cited (never re-opened)
§0cx / W7.md ADDENDUM (b) (ESC-W7g-1 ruled (d): root cause, not relief; no per-engine path; measured impasse → ESCALATED with the per-rule profile) · §0cp (release chain → X.P.W7P, OTP-keyed; LEDGER hunk hygiene) · §0ck 1–7 (F-b-4 accepted; positional semantics; bbnf-lang choreography) · §0ci R-1..R-3 · §0bt ADJACENT-LINE RULE.

### Locks
- **L-4 (bbnf-lang):** writes only in `../bbnf-lang-x-p-w7-typescript` on `x-p-w7-typescript`; push the branch only; never local master; PR #1 stays open. Every re-emission of `src/css/bbnf/generated/` goes through `node scripts/gen-grammar.mjs` only; `--check` passes after.
- **L-6 (no npm):** no `npm publish`, no version bump, no dependency move (X.P.W7P).
- **L-7 (LEDGER, §0cp 4):** read `git diff` on LEDGER.md before any commit touching it; stage only this seat's hunk.
- **L-8 (instrument compiled out):** the per-rule counters/timers exist only behind an emitter build flag; the shipped `generated/` module carries 0 instrument bytes (grep after re-emission) and its sha changes only by the cure.
- **L-9 (one cure, every engine):** no engine sniffing, no per-engine branch in emitted or action code; no post-hoc freeze walk (K2-b stays 0); no try/catch around a defect.
- **Families:** the instrument flag = one bbnf-lang commit (+ its bench harness one value.js `bench/**` commit); each structural cure = one bbnf-lang emitter commit with its value.js re-emission (+ any action change) in one value.js commit.

### `[X.P.W7.l]` — root cause of the engine gaps (W7.md 216–230: ADDENDUM (b); COHESION §0cx)
- **Writable:** bbnf-lang `typescript/**` on `x-p-w7-typescript` (the instrument build flag + the structural emitter cure) · value.js `src/css/bbnf/**` (actions; `generated/` through `node scripts/gen-grammar.mjs` only) · `src/css/result.ts` and the node-construction helpers under `src/css/**` (the freeze-at-construction path) · `bench/**` (the per-rule profile harness beside `bench/paired/`, records) · `test/css/**` (pins; §0bt) · this record.
- **Acts:** (1) emitter flag `instrument` → per-rule entry/exit counters + cumulative time, compiled out of the shipped module; emit an instrumented variant into `bench/paired/_build/`; (2) profile by bisection the RED cells — Firefox rej parseStylesheet, WebKit + Firefox large sheets, Firefox rej parseCssValue(/Values) — on SpiderMonkey + JSC via Playwright pages, V8 control; bank the per-rule tables; name the dominating rules/operations (substring allocation, regex restarts, recursion depth, freezes on discarded speculative nodes); (3) cure structurally, ONE cure for every engine (e.g. actions run only on committed alternatives so speculative frozen nodes are never built); (4) re-read the gates.
- **Gates:** L-G1 every entry × {acc, rej} + large sheets < 1.00 paired on node, Chromium, WebKit, Firefox, ×2, load recorded (`bench/paired/isolated.mjs`, `bench/paired/browser.mjs`) · L-G2 V-1 equivalence 88 = F-b-4 exactly ×2 · stay-GREEN: `test:css-equivalence` 19/19, frozen+depth pins, `npm test` 940/943 (3 foreign), `vue-tsc` 0, `gen-grammar --check` 0, K2-b 0, whole-7/7 inside ceilings, `.e` E-1/E-2/E-4..E-7 on the final emitter, bbnf-lang TS 282+/282+ · L-G3 instrument bytes 0 in shipped `generated/`. Impasse → ESCALATED with the per-rule profile (never relief).
- **Locks:** L-4, L-6, L-7, L-8, L-9.

### Close (after `.l`)
Engineering gates binding (accepted + rejected halves and large sheets under the retired parser on every engine). Release gates P-6 · E-8 · V-9 + the CI step · Z-1 · Z-3 (publish half) relieved by citing X.P.W7P (§0cp; OTP-keyed). No `npm publish` in this wave.

## RESUME 3 Unit receipts

### X.P.W7.l

Seat `claude-opus-5-5`, 2026-09-24, Track D. Governing text: W7.md (230 lines, read whole; ADDENDUM (b) at 216–230 binds) · COHESION §0cx (read; §0cy after it touches no Track D row) · the RESUME 3 Unit plan above (Locks L-4, L-6..L-9).

**Crash-recovery.** ⟨`git -C ../bbnf-lang-x-p-w7-typescript status --porcelain`⟩ → empty at `6d5a2b4a0`; ⟨`git status --porcelain -- src/css bench test/css <record>`⟩ → empty. **No inherited partial work.** Tooling as `.g`: `node_modules/@mkbabb/bbnf-lang` linked to the worktree for the unit's life (0.1.4 moved aside as `.bbnf-lang-0.1.4-aside-l`), restored at the end (⟨`grep '"version"'`⟩ → `0.1.4`); ⟨`git diff HEAD -- package.json package-lock.json`⟩ → empty (L-6).

**Acts, in order.**
1. **The instrument flag (L-8) — bbnf-lang `dcf72b966`** (`emit.ts` `EmitOptions.instrument`, `gen.ts`, `cli.ts --instrument`, `test/instrument.test.ts`). With the flag every rule function (each mode) and every hoisted alternative is wrapped: calls, failures, inclusive time, and the action values a failing function discards (counted once, at the innermost failing function); every action counts calls and time; every entry counts calls, refusals and time; the parser gains `profile()`/`resetProfile()`. Without the flag the emitted text is unchanged: ⟨`node bench/paired/instrument.mjs`⟩ → `{"plainEqualsShipped":true,"shippedInstrumentTokens":[],"instrumentedTokens":6}` (at `dcf72b966` alone the shipped module differed only in its header sha line: `plainEqualsShippedBarHeaderSha:true`). ⟨`npx vitest run`⟩ in `typescript/` → `Tests 285 passed (285)`; `tsc --noEmit` 0.
2. **The harness — value.js `816ec3d1`** (`bench/paired/{instrument,profile,bisect}.mjs`): `instrument.mjs` emits the instrumented variant into `bench/paired/_build/instrument/` and bundles `_build/instrumented.mjs` (and `_build/probe.mjs`, the shipped module with the parser exposed); `profile.mjs` banks per-rule tables on node / Chromium / WebKit / Firefox; `bisect.mjs` times slices of a cell as whole passes (no per-call timer) paired with the retired parser in the same page.
3. **Profile + bisection (records in `5f7bd27e`).**
   - ⟨`profile.mjs l-p1 node,chromium,webkit,firefox parseStylesheet:large,parseStylesheet:rej 3`⟩: counts identical on every engine (large: 84,363 calls · 32,019 actions · **58 discarded**; rej: 518,848 calls · 185,657 actions · **54,565 discarded**, 25,143 at `ruleBlock` + 24,319 at `openBlock` — the prelude scanned twice per fault source). WebKit large: `quoted/r` **8.33 ms for 475 calls, 1 failing** (node 0.41) and `blockBody/r` 12.3 ms (node 3.9).
   - ⟨`bisect.mjs l-large`⟩ (ofRetired): WebKit product 1.138, **`ruleList` alone .741** (Chromium .163); Firefox product 1.30, `ruleList` .56, body declarations .52.
   - ⟨`yarr.mjs`⟩ (`2026-09-24-x-p-w7-yarr.json`): the grammar's string regex on the one unclosed `'` 178 KB from the end of `keyframes-js-index.css` — **JSC 11.85 ms** (V8 .47, SpiderMonkey .45); unrolled `'[^'\\]*(?:\\[\s\S][^'\\]*)*'` JSC 1.1. **Cause named (WebKit large): JavaScriptCore backtracking through `(?:\\[\s\S]|[^'\\])*` — a per-iteration alternation — when a quote is never closed.**
   - ⟨`bisect.mjs l-rej-2 / l-rej-3`⟩ (Firefox, rej split by the rule list's verdict): fault sources (25,167) product 21.5–29.5 ms vs retired 14–18.5; of it `ruleList` 9–13 ms, the shared `failure()` 10 ms on Firefox and WebKit (2.75 Chromium; the retired arm pays the same constructor); block sources product .58 of retired (green). **So Firefox's rej gap is the rule list's per-source scanning**, and ⟨`loops.mjs`⟩ (`2026-09-24-x-p-w7-loops.json`) names the operation: the emitted class-run loop (`charCodeAt` + `Uint8Array` table) over the sheet costs **SpiderMonkey 1.9 ms vs its own regex 0.9** (V8 .92 vs .82, JSC .80 vs .80); the retired parser (builtins: `indexOf`, `startsWith`, `slice`, regex) runs 1.9× faster on Firefox than on Chromium (`l-large-2`: retired 9 ms vs 16.9).
4. **Cure 1, one for every engine — escape runs unrolled. bbnf-lang `d81016e96` (pushed: `6d5a2b4a0..d81016e96 x-p-w7-typescript`; PR #1 untouched) + value.js `4ffbe7de`** (re-emission through `node scripts/gen-grammar.mjs` only + the probe `bench/paired/yarr.mjs`). `analysis/regex.ts` `unrollEscapeRuns`: `(?:\\[\s\S]|[^X\\])*` (either arm order, greedy `*` only, not after an escaping backslash) is emitted as `[^X\\]*(?:\\[\s\S][^X\\]*)*` — the same language and the same preferred match in every context (disjoint arms, each one iteration, the same stop boundaries given back in the same order); the audit build re-runs every unrolled leaf as spelt. `test/unroll.test.ts`: both orders; lazy/`+`/escaped-paren spellings untouched; exhaustive sticky equality over 3 spellings × every input ≤ 6 units of `" ' \ a \n` × every offset (> 50,000 comparisons); audit 0. ⟨`git diff -U0 -- src/css/bbnf/generated/grammar.js`⟩ → the header sha and ONE constant (`K13`, `quoted`/`string`). ⟨`bbnf-lang npx vitest run`⟩ ×2 → `Tests 288 passed (288)` ×2.
   - Paired before/after (⟨`browser.mjs l-unroll-probe webkit,firefox 1 large 11 l-base,product parseStylesheet`⟩): **WebKit large 1.133 → .552 (11/11 < 1)**; Firefox unmoved (1.2–1.4, all cells set aside at load 44–46). Per-rule (l-final vs l-p1, WebKit large): `quoted/r` 8.33 → 1.0 ms, `blockBody/r` 12.3 → 3.3.
5. **Levers measured and NOT admitted (each alone, before-arm = the cure-1 bytes; banked `bench/records/2026-09-24-x-p-w7-l-levers/*.diff`, tables in `5f7bd27e`).**
   - **Split leaf** (a top-level regex disjunction routed by first unit, one sticky regex per unit group; 8 sites incl. `quoted`, the operator set, `\s+|(?=[:;])|(?<=[:;])`): WebKit large 1.138 → 1.138 — the cost was the failing arm, not the disjunction. Reverted before cure 1 (`instrument+split-leaf.diff`, sha256 `4ae58856441e02b7…`).
   - **Negated class runs as one sticky regex** (`[^…]+` runs through the regex engine instead of the code-unit loop; the only lever that moves SpiderMonkey): ⟨`browser.mjs l-negrx … l-unroll,product`⟩ Firefox large 1.351 → .977 · 1.216 → .932 (set-aside cells, load 35–45), rej parseStylesheet 1.148 → 1.092 · 1.198 → 1.069 (SA); **but Chromium rej parseStylesheet .538 → .567 (×1.054), whole parseStylesheet .537 → .553, rej parseCssValues .455 → .469**, WebKit rej parseStylesheet .755 → .771 — it regresses the engines it does not cure. Not admitted (`negated-run-regex+defer.diff`, `e7e963c7ff6aafdb…`).
   - **Deferred text actions** (the ruling's example: in a value-mode sequence a `text`-action reference is recognized and its action runs on its span only once every part matched; 22 sites incl. `ruleBlock`/`openBlock`'s `preludeRun`; V-1 on it 88 = F-b-4): ⟨`browser.mjs l-defer … l-unroll,product parseStylesheet`⟩ Chromium rej .578 → .533 but **acc .566 → .615 (×1.087)**, WebKit acc .568 → .579, rej .741 → .750; Firefox rej 1.05–1.28 → 1.15–1.46 (all SA). Not admitted (`defer-text-actions.diff`, `c745538ccc7c9ae2…`).
6. **Final bytes** = bbnf-lang `d81016e96` / value.js `4ffbe7de` (⟨`node scripts/gen-grammar.mjs --check`⟩ → exit 0, `sha256 5dffabdc…`); arms rebuilt (⟨`node bench/paired/build.mjs`⟩; `K13` unrolled in `_build/product.mjs`).
7. **Gate reads on the final bytes (twice; load recorded; records in `5f7bd27e`).**
   - L-G1 browsers ⟨`node bench/paired/browser.mjs l-final-r1 chromium,webkit,firefox 2 whole,acc,rej,large 11 product`⟩ (load 31.54 → 21.47) and ⟨`… l-final-r2 …`⟩ (load 20.81 → 34.82): **Chromium 22/22 rows < 1 in both reads** (large .365/.343 · .347/.361) · **WebKit 22/22 in both reads** (large **.583/.593 · .560/.586**; highest row whole keyframe .882) · **Firefox 18/22 and 18/22**: RED **large parseStylesheet 1.308/1.284 · 1.333/1.343**, **rej parseStylesheet 1.084/1.125 · 1.097 (+4 SA 1.08–1.13)**, whole parseStylesheet 1.031/.991 · .982/1.000, rej parseCssValue 1.056/1.000 · 1.035/1.024 (noise distance), rej parseCssValues 1.050/.952 · .970 (green in r2).
   - node ⟨`node bench/paired/isolated.mjs l-final-node product 3 11 whole,acc,rej,large`⟩ (load ~41–50; record `2026-09-23-x-p-w7-l-final-node.json`, the `.o` prefix quirk): `whole-7/7 GREEN` · `accepted-7/7 GREEN` · `rejected-7/7 GREEN`; whole medians color .647 (.90) · scalar .552 (.81) · value .404 (.57) · values .425 (.58) · keyframe .688 (.78) · timing .612 (.87) · stylesheet .623 (.85); large .463/.412/.408 (7 set aside, all listed).
   - L-G2 ⟨`node bench/paired/equiv.mjs product <out>`⟩ ×2 → `compared 1376531/1376531 rows · mismatches 88 (ASCII-only sources 0)` ×2 (= F-b-4).
   - L-G3 ⟨`grep -rln "instrument\|__prof\|PC\[\|NOW()" src/css/bbnf/generated | wc -l`⟩ → `0`; `instrument.mjs` → `shippedInstrumentTokens: []`, `plainEqualsShipped: true`.
   - Stay-GREEN: ⟨`npm run -s test:css-equivalence`⟩ → `Tests 19 passed (19)`, MIRROR-DEFECTS lines 28, non-zero 0 · ⟨`gen-grammar --check`⟩ 0 · ⟨`npx vitest run`⟩ → `Tests 2 failed | 941 passed (943)`, the 2 = foreign (`spectrum-luma` C-5 BORN-RED · `reka-binding-idiom` NG-6; `format-color` G16 now passes, a sibling's) · ⟨`npx vue-tsc -p tsconfig.{lib,demo,test}.json --noEmit`⟩ → 0/0/0 (`_build/` set aside for the read) · K2-b ⟨`grep -rn deepFreeze src | wc -l`⟩ → 0 · E-1/E-2 ⟨scratch `g/e12.mts` on the final module⟩ → `E-1 {"calls":718656,"diffs":0,"sameFail":true}` · `E-2 {"checks":174011574,"violations":0,"modeCalls":4791040,"modeDiffs":0}` (checks +6.3 M = the unrolled-leaf audits) · E-3 in the suite (288/288) · E-4 `--check` 0 and the re-emission deterministic (two regenerations → `5dffabdc…` both) · E-5 `tsc --noEmit` 0 · E-6 ⟨esbuild minify + gzip⟩ → **94,017 B / 12,920 B** (ceiling 125,646 / 14,517) · E-7 ⟨scratch `g/depth.mjs`⟩ → node / WebKit 26.4 / Chromium 148 `refused ×3`, `calc10 accepted` · bbnf-lang TS 288/288 ×2 · parse-that untouched (no parse-that byte moved; 143/143 cited from RESUME Check 3).

**Commits.** bbnf-lang `dcf72b966` (instrument flag) · `d81016e96` (cure 1, pushed). value.js `816ec3d1` (profile harness) · `4ffbe7de` (cure-1 re-emission + `yarr.mjs`) · `5f7bd27e` (records, lever tables and diffs, `loops.mjs`, bisect/instrument probes) · this receipt. **Adjacent edits (§0bt):** none.

**Gate table, BEFORE → AFTER** (BEFORE = RESUME 3 Baseline; AFTER = act 7, reads 1 and 2).

| Gate | BEFORE | AFTER | Verdict |
|---|---|---|---|
| L-G1 WebKit large parseStylesheet | 1.111 / 1.192 | .583 / .593 · .560 / .586 | **GREEN ×2** |
| L-G1 WebKit, other 21 rows | GREEN | 21/21 < 1 in both reads | GREEN ×2 |
| L-G1 Chromium 22 rows | GREEN (`.g`) | 22/22 < 1 in both reads | GREEN ×2 |
| L-G1 node whole/acc/rej/large | GREEN (Check 3) | 7/7 · 7/7 · 7/7 · large .41–.46 | GREEN |
| L-G1 Firefox rej parseStylesheet | 1.042 / 1.050 | 1.084 / 1.125 · 1.097 | **RED** |
| L-G1 Firefox large parseStylesheet | 1.170 / 1.101 | 1.308 / 1.284 · 1.333 / 1.343 | **RED** |
| L-G1 Firefox rej parseCssValue / Values | .904 (1 clean) · .975 / .916 | 1.056 / 1.000 · 1.035 / 1.024 · 1.050 / .952 · .970 | RED at noise distance |
| L-G1 Firefox whole parseStylesheet | (not in baseline) | 1.031 / .991 · .982 / 1.000 | RED at noise distance |
| L-G2 V-1 | 88 = F-b-4 (Check 3) | 88 = F-b-4 ×2 | GREEN ×2 |
| L-G3 instrument bytes in shipped `generated/` | vacuous (no flag) | 0 (flag exists; compiled out) | **GREEN** |
| stay-GREEN | Check 3 | all above | GREEN |

**Residuals (named owners).**
- **R-l-1, Firefox (SpiderMonkey) large and rejected stylesheets** (1.28–1.34 · 1.08–1.13), with whole stylesheet and rej parseCssValue/Values at noise distance. Owner: the owner, via ESC-W7l-1.
- The Firefox baseline reads (1.04–1.17) were lower than this unit's (1.08–1.34) with no Firefox-path byte changed by cure 1 except `quoted`/`string`'s regex (which reads faster on SpiderMonkey for successes in `yarr.json`); the difference is load (21–50 this sitting vs 30–58 at the baseline, most cells set aside), recorded, not claimed.

**Escalations.**
- **ESC-W7l-1 (ADDENDUM (b): "a cause it cannot cure on some engine without regressing another … ESCALATED with the per-rule profile").** The per-rule profile and the bisections name two causes:
  1. **JavaScriptCore, large sheets: backtracking through the string literal's `(?:\\[\s\S]|[^q\\])*` on one unclosed quote (~12 ms).** Cured structurally for every engine (cure 1); WebKit large is GREEN twice.
  2. **SpiderMonkey, rej and large stylesheets: the emitted code-unit class-run loop** (`preludeRun`, `blockBody`, `textBody`, `ruleGap` scans; `loops.json`: 1.9 ms per sheet scan vs 0.9 through SpiderMonkey's own regex engine; V8 and JSC run the loop at regex speed). The retired parser's builtins are fast on SpiderMonkey (its large cell runs in 9 ms there vs 16.9 on Chromium), so the ratio opens only on Firefox.
- The one lever that moves SpiderMonkey (class runs through the regex engine) regresses Chromium (rej stylesheet ×1.054, rej values ×1.03) and WebKit (rej stylesheet ×1.02), because short runs (the corpus median source is 24–30 characters) pay the regex call. Deferring text actions (the ruling's own example) regresses Chromium's accepted stylesheet ×1.087. Neither is admitted, and no engine split is admitted (L-9). The owner's measured decision is between:
  - (a) accept a run-length-dependent emission (a loop that hands long runs to the regex engine), a heuristic that no engine split names;
  - (b) accept the negated-run lever's ×1.02–1.05 costs on Chromium and WebKit, which stay far below 1.00 (.47–.77);
  - (c) record Firefox's stylesheet cells, as W7.md's Open items first did for engines.
- This seat takes none of those rulings.

**Verdict: ESCALATED.**
- **Green:** WebKit and Chromium on every cell, twice; node 7/7 on every class; L-G2; L-G3; every stay-GREEN gate; the instrument flag and its harness.
- **Red:** Firefox rej and large parseStylesheet (ESC-W7l-1, with the per-rule profile in `bench/records/2026-09-24-x-p-w7-profile-l-{p1,final}.json`).

## RESUME 3 Close (2026-09-24, close seat `claude-opus-5-5`, Track D; verify-only, cures nothing)

**Open.** Spec read whole (W7.md, 230 lines, all three addenda; ADDENDUM (b) at `:216` binds). From this record: header, `## RESUME 3 — Open` through `## RESUME 3 Unit plan`, and the `.l` receipt (the last section). Every earlier section stands (E-3); this one is written beside them. **Crash-recovery:** ⟨`git status --porcelain -- src bench test scripts/gen-grammar.mjs docs/tranches/X/execution/D docs/tranches/X/execution/LEDGER.md`⟩ → empty; ⟨`git -C ../bbnf-lang-x-p-w7-typescript status -sb`⟩ → `## x-p-w7-typescript...origin/x-p-w7-typescript`, clean at `d81016e96`. parse-that master's dirty `rust/**`, `README.md`, `.cargo/config.toml` belong to other programs (untouched). **No inherited partial work.** Product bytes: HEAD `24f8d58d`; ⟨`git log 4ffbe7de..HEAD -- src/css package.json package-lock.json`⟩ → empty, so the product is `.l`'s final bytes (`generated/grammar.js` sha256 `5dffabdc…`).

### Act 1: commit roster, and whether `.l` stayed in its writable set
⟨`git show --stat --format= <c>`⟩ per commit:

| Commit | Paths touched | In set? |
|---|---|---|
| bbnf-lang `dcf72b966` (instrument flag) | `typescript/src/{cli,emit,gen}.ts`, `typescript/test/instrument.test.ts` | yes (`typescript/**`) |
| bbnf-lang `d81016e96` (cure 1, escape runs unrolled; ⟨`git branch -r --contains d81016e96`⟩ → `origin/x-p-w7-typescript`) | `typescript/src/analysis/regex.ts`, `typescript/src/emit.ts`, `typescript/test/unroll.test.ts` | yes |
| value.js `816ec3d1` (profile harness) | `bench/paired/{bisect,instrument,profile}.mjs` | yes (`bench/**`) |
| value.js `4ffbe7de` (re-emission + probe) | `src/css/bbnf/generated/grammar.{js,d.ts}`, `bench/paired/yarr.mjs` | yes (`generated/` via `gen-grammar.mjs`; `bench/**`) |
| value.js `5f7bd27e` (records, lever diffs) | 24 paths: `bench/paired/{bisect,instrument,loops}.mjs` + 21 under `bench/records/` | yes |
| value.js `24f8d58d` (receipt) | this record | yes |

**Landed wrong: none.** No `package.json`/lockfile, `ci.yml`, `rust/**`, bbnf-lang master or `scripts/dev/dev.sh` path in any commit; no lever commit (none admitted; the three lever diffs are banked as records only). PR #1 untouched.

### Act 2: the gates re-read by this seat (RESUME rule: the gates `.l` turns plus stay-GREEN; older unit gates cited from RESUME Check 3)

**Correctness, gates and size.**
- L-G2 / V-1 ⟨`node bench/paired/equiv.mjs product <scratch>`⟩ ×2 → `compared 1376531/1376531 rows · mismatches 88 (ASCII-only sources 0)` both times = the F-b-4 rows. **GREEN ×2.**
- L-G3 ⟨`grep -rln "instrument\|__prof\|PC\[\|NOW()" src/css/bbnf/generated | wc -l`⟩ → `0`; ⟨`node bench/paired/instrument.mjs`⟩ (emitter linked, below) → `{"plainEqualsShipped":true,"plainEqualsShippedBarHeaderSha":true,"shippedInstrumentTokens":[],"instrumentedTokens":6}`. **GREEN.**
- K2-b ⟨`grep -rn deepFreeze src | wc -l`⟩ → `0`. V-8 ⟨`grep -rn 'GRAMMAR_MODULES\|new ParserState\|reset()' src/css/bbnf | grep -v generated/`⟩ → 0; ⟨`grep -rnE '/[^/]*\[xX\][^/]*/i' src/css/grammar`⟩ → 0. **GREEN.**
- ⟨`npm run -s test:css-equivalence`⟩ → `Tests 19 passed (19)`; ⟨`… | grep -oE 'MIRROR-DEFECTS [0-9]+' | sort | uniq -c`⟩ → `28 MIRROR-DEFECTS 0`. **GREEN.**
- E-4 `--check`: on the installed 0.1.4 → exit 1, `has no bbnf bin (bbnf gen needs @mkbabb/bbnf-lang >= 0.2.0)` = the X.P.W7P dependency move, not drift. With `node_modules/@mkbabb/bbnf-lang` linked to the worktree (dist built 15:16, carries `unrollEscapeRuns`) ×2 → `grammar.js is current (sha256 5dffabdc…)`. Link removed, 0.1.4 restored (⟨`grep '"version"'`⟩ → `0.1.4`). **GREEN on the linked emitter.**
- E-1/E-3/E-5 ⟨`npx vitest run`⟩ ×2 in `../bbnf-lang-x-p-w7-typescript/typescript` → `Test Files 19 passed (19) · Tests 288 passed (288)` both; ⟨`npx tsc --noEmit -p .`⟩ → 0. **GREEN.** E-2 (174.0 M checks, 0 violations, 0 modeDiffs) is cited from the `.l` receipt: its scratch driver is not banked, and the emitter bytes are unchanged at `d81016e96`.
- E-6 ⟨`esbuild --minify` of `generated/grammar.js`⟩ → `94017` B; `| gzip | wc -c` → `12920` B (ceiling 125,646 / 14,517). **GREEN.**
- ⟨`npx vitest run`⟩ (value.js) → `Tests 3 failed | 940 passed (943)`: `spectrum-luma` C-5 BORN-RED and `reka-binding-idiom` NG-6 (the foreign pair `.l` named), plus `demo/test/generate/generate-rail.test.ts` EC-10 `Test timed out in 5000ms` at load 42–61; alone ⟨`npx vitest run demo/test/generate/generate-rail.test.ts`⟩ → `Tests 2 passed (2)` (a sibling's `26681172` test timing out under load; not under `src/css`/`test/css`). **GREEN** (941 css-relevant rows as `.l`; 0 css failures).
- ⟨`npx vue-tsc -p tsconfig.{lib,demo,test}.json --noEmit`⟩ → `0 · 0 · 0`. **GREEN.**

**Timing** (arms rebuilt ⟨`node bench/paired/build.mjs`⟩ → `valuejsHead 24f8d58d`, `srcDirty ""`, `bankedManifestOk 79/79`; records moved to scratchpad `w7lclose/`, `bench/` left clean; load was 30–116 throughout, sibling tracks busy, recorded).
- **browsers, read 1** ⟨`node bench/paired/browser.mjs lclose-r1 chromium,webkit,firefox 2 whole,acc,rej,large 11 product`⟩ (load `41.54` → `30.15`):
  - Chromium 22/22 rows < 1 in both reps (large .380 / .348; highest whole keyframe .619).
  - **WebKit 22/22** (large **.552 / .571**; highest whole keyframe .844 / .842).
  - Firefox: clean RED **rej parseStylesheet 1.226 / 1.141 (+1 SA 1.109)** · **large 1.264 / 1.250 (+1 SA 1.19)** · whole parseStylesheet 1.068 (+4 SA .87–1.09) · rej parseCssValue .986 / 1.071 · rej parseCssValues .993 / 1.12; acc parseStylesheet has no clean cell (8 SA, .81–1.23). The other 16 Firefox rows < 1.
- **browsers, read 2** ⟨same, tag `lclose-r2`⟩ (load `30.15` → `63.23`, peak 116): Chromium 22/22 (large .351 / .354) · **WebKit 22/22** (large **.579 / .579**; highest .842) · ⟨`grep -E '^product (chromium|webkit)' | grep -vc '<1'`⟩ → `0` of 44. Firefox: clean RED **rej parseStylesheet 1.113 / 1.122 (+1 SA 1.25)** · **large 1.216 (+4 SA 1.17–1.35)**; rows with no clean cell (every rep set aside at load 60–116): whole parseStylesheet (8 SA .86–1.23), acc parseCssColor (8 SA .82–1.31), acc parseStylesheet (8 SA .70–1.00), rej parseCssValue (8 SA .90–1.37), rej parseCssValues (8 SA .86–1.21), rej parseTimingFunction (8 SA .76–1.20). Every set-aside cell is in the records.
- **node, read 1** ⟨`node --expose-gc bench/paired/isolated.mjs lclose-node-r1 product 3 11 whole,acc,rej,large`⟩ (load `63.23` → `78.12`): whole medians color .672 · scalar .591 · value .439 · values .420 · keyframe .657 · timing .605 · stylesheet .617 (ceilings .90/.81/.57/.58/.78/.87/.85); acc keyframe .586; rej stylesheet .627; large .428 / .439 (4 SA, one 1.148 at spread 16.9, all reported). `whole-7/7 GREEN` · `accepted-7/7 GREEN` · `rejected-7/7 GREEN`.
- **node, read 2** ⟨same, tag `lclose-node-r2`⟩ (→ load `77.30`): whole .677 · .591 · .443 · .414 · .665 · .610 · .648; acc keyframe .648; rej stylesheet .614; large .428 / .429 / .455. All three 7/7 verdicts `GREEN`. (`O-2 … DOES NOT HOLD` = the product is faster than stock, as at every prior close.)
- The browser reads reproduce `.l`'s receipt: WebKit large is GREEN in both reads (1.11–1.20 at the RESUME Close → .55–.58), and Firefox rej and large parseStylesheet stay RED in both. Chromium, WebKit and node are below 1 on every cell, twice.

### Acts 3 and 4: verification artefacts and E13
- The spec names no Verification Artefacts clause beyond its gates. The paired records are in scratchpad `w7lclose/` (`lclose-r{1,2}`, `lclose-node-r{1,2}`, logs); `.l`'s banked records (`5f7bd27e`: profiles `profile-l-{p1,final}`, `loops`, `yarr`, `bisect-l-*`, `browser-l-final-r{1,2}`, lever diffs) stand as the records of record. ⟨`git status --porcelain bench`⟩ → empty.
- E13 ⟨`find <p> -maxdepth 1 -type f -newer INBOX.md`⟩ over value.js `V/` + `V/coordination/`, glass `BK/coordination/` + `BL/` (⟨`ls -td glass-ui/docs/tranches/B*/ | head -3`⟩ → `BL BK BJ`), keyframes.js `V/coordination/`, atlas `P/coordination/` → 0 files, except glass `BL/FORMATION-PROGRESS.md` (BL's own cursor, not a letter). ⟨`grep -nE '\| *UNREAD *\|' INBOX.md | wc -l`⟩ → 0. **0 UNREAD in scope.**

### Gate table, BEFORE → AFTER (BEFORE = RESUME 3 Baseline; AFTER = this seat's two reads)

| Gate | BEFORE | AFTER (this seat) | Verdict |
|---|---|---|---|
| L-G1 WebKit large parseStylesheet | 1.111 / 1.192 | .552 / .571 · .579 / .579 | **GREEN ×2** |
| L-G1 WebKit, other 21 rows | GREEN | 21/21 < 1, both reads | **GREEN ×2** |
| L-G1 Chromium 22 rows | GREEN (`.g`) | 22/22 < 1, both reads | **GREEN ×2** |
| L-G1 node whole/acc/rej/large | GREEN (Check 3) | 7/7 · 7/7 · 7/7 · large .43–.46, both reads | **GREEN ×2** |
| L-G1 Firefox rej parseStylesheet | 1.042 / 1.050 | **1.226 / 1.141 · 1.113 / 1.122** | **RED** |
| L-G1 Firefox large parseStylesheet | 1.170 / 1.101 | **1.264 / 1.250 · 1.216** | **RED** |
| L-G1 Firefox whole parseStylesheet, rej parseCssValue / Values | noise distance | r1 1.068 · .986 / 1.071 · .993 / 1.12; r2 no clean cell (all SA at load 60–116) | RED at noise distance |
| L-G1 Firefox, other 16 rows | GREEN (`.g`) | < 1 in read 1; read 2 adds acc parseCssColor, acc parseStylesheet, rej parseTimingFunction with no clean cell (all reps set aside, .70–1.31) | GREEN r1; load-voided r2 |
| L-G2 V-1 | 88 = F-b-4 | 88 = F-b-4 ×2 | **GREEN ×2** |
| L-G3 instrument bytes in shipped `generated/` | vacuous | 0; `plainEqualsShipped true` | **GREEN** |
| stay-GREEN: css-equiv · npm test · vue-tsc · `--check` · K2-b · V-8 | GREEN | 19/19, 28× MIRROR-DEFECTS 0 · 940/943 (0 css failures) · 0/0/0 · current ×2 (linked) · 0 · 0 | **GREEN** |
| E-1/E-3/E-5 · E-6 · E-2 · E-7 | GREEN | 288/288 ×2, tsc 0 · 94,017 / 12,920 B · cited (`.l`) · depth pin in the suite | **GREEN** |
| whole-7/7 inside ceilings | GREEN | node ×2, e.g. keyframe .657 / .665 (ceiling .78), stylesheet .617 / .648 (.85) | **GREEN ×2** |
| P-6 · E-8 · V-9 + CI step · Z-1 · Z-3 publish half | relieved | relieved by citation to X.P.W7P (§0cp 1), GATE-KEYED on the owner's OTP | **relieved → X.P.W7P** |

### Residuals (named owners)
- **R-l-1: Firefox (SpiderMonkey) rej and large parseStylesheet** (1.11–1.26 in this seat's clean cells), with whole parseStylesheet and rej parseCssValue/Values at noise distance. Cause named by `.l`'s profile: the emitted code-unit class-run loops (`loops.json`: 1.9 ms vs 0.9 ms through SpiderMonkey's regex engine). Owner: **the owner, via ESC-W7l-1**.
- **R-l-2: Firefox read-2 load voiding.** Six Firefox rows had no clean cell in read 2 (load 60–116, sibling tracks). They are not claimed GREEN or RED from that read; read 1 and `.l`'s two reads cover them. Owner: whichever seat re-reads Firefox after ESC-W7l-1 is ruled.
- **R-l-3: the lever diffs** (`instrument+split-leaf`, `negated-run-regex+defer`, `defer-text-actions`) are banked under `bench/records/2026-09-24-x-p-w7-l-levers/`. Owner: the unit that executes ESC-W7l-1's branch (a) or (b).
- **The release chain:** P-6, E-8, V-9 and its CI step, Z-1, Z-3's publish half, `--check` on the installed pin, the bbnf-lang PR #1 merge. Owner: X.P.W7P, GATE-KEYED on the owner's npm one-time password.
- **Foreign test rows** (not W7's): `spectrum-luma` C-5 BORN-RED, `reka-binding-idiom` NG-6, and `generate-rail` EC-10 timing out at 5 s under load (passes alone). Owners: their Track A/B units.

### Escalations (carried open, none new)
- **ESC-W7l-1** (the `.l` receipt) is unruled: ⟨`grep -n ESC-W7l-1 COHESION.md`⟩ → 0 hits. Branches: (a) a run-length-dependent emission; (b) accept the negated-run lever's ×1.02–1.05 costs on Chromium/WebKit; (c) record Firefox's stylesheet cells rather than gate them.
- **ESC-W7p-1 / e-1 / v-1 / z-1** stay with X.P.W7P.
- This seat raises no new escalation. **Adjacent edits: none. Out-of-set writes: none.**

### Four-verb line
W7.md has no §State clause and designates no seat to stamp a verb. ADDENDUM (b) binds L-G1 on every engine, and Firefox rej and large parseStylesheet read RED twice. So X.P.W7 is **not IMPLEMENTED**. It stays **PARTIAL**, and VERIFIED is not stamped. It moves to IMPLEMENTED once ESC-W7l-1 is ruled and its branch is executed (or, under (c), once the Firefox stylesheet cells are re-scoped to recorded).

**Verdict: PARTIAL.** `.l` delivered the instrument flag (compiled out), the per-rule profile, and cure 1 (escape runs unrolled), which turns WebKit large GREEN twice here. Chromium, WebKit and node are below the retired parser on every cell, twice. Firefox rej and large parseStylesheet stay RED under ESC-W7l-1. The release gates are relieved to X.P.W7P.

**Commits (this seat):** this RESUME 3 Close, plus the LEDGER row cell.

## Check 1 (2026-09-24, L-20 fresh adversarial pass 1 of the RESUME 3 Close, `claude-opus-5-5`, Track D; verify-only, cures nothing)

**Open.** Spec read whole (W7.md, 230 lines; ADDENDUM (b) at `:216` binds). From this record: `## RESUME 3 — Open` through `## RESUME 3 Unit plan`, the `.l` receipt, and `## RESUME 3 Close` (the last section before this one). **Crash-recovery:** ⟨`git status --porcelain docs/tranches/X/execution/D docs/tranches/X/execution/LEDGER.md src/css bench test/css`⟩ → empty (my writable set = this record + the LEDGER row); parse-that master's dirty `rust/**`, `README.md`, `.cargo/config.toml` are other programs' (untouched); ⟨`git -C ../bbnf-lang-x-p-w7-typescript status -sb`⟩ → `## x-p-w7-typescript...origin/x-p-w7-typescript`, clean. **No inherited partial work.** HEAD at open `bc8be115`; product bytes = `4ffbe7de` (`generated/grammar.js` header `sha256(grammar ⊕ emitter) 5dffabdc…`). Load 41–64 throughout (sibling tracks), recorded.

### Axes
- **(1) Claimed GREENs reproduce.**
  - L-G2 / V-1 ⟨`node bench/paired/equiv.mjs product <scratch>`⟩ ×2 → `compared 1376531/1376531 rows · mismatches 88 (ASCII-only sources 0)` both, split `parseCssValue 4 · parseCssValues 4 · functionParam 11 · splitTopLevel(,) 13 · (;) 11 · (space) 45` = the F-b-4 rows. **GREEN ×2.**
  - L-G3 ⟨`grep -rln "instrument\|__prof\|PC\[\|NOW()" src/css/bbnf/generated | wc -l`⟩ → `0`. K2-b ⟨`grep -rn deepFreeze src | wc -l`⟩ → `0`. V-8 ⟨`grep -rn 'GRAMMAR_MODULES\|new ParserState\|reset()' src/css/bbnf | grep -v generated/ | wc -l`⟩ → `0`; ⟨`grep -rnE '/[^/]*\[xX\][^/]*/i' src/css/grammar | wc -l`⟩ → `0`. **GREEN.**
  - ⟨`npm run -s test:css-equivalence`⟩ → `Tests 19 passed (19)`; ⟨`… | grep -oE 'MIRROR-DEFECTS [0-9]+' | sort | uniq -c`⟩ → `28 MIRROR-DEFECTS 0`. ⟨`npx vitest run test/css`⟩ → `Test Files 5 passed (5) · Tests 58 passed (58)`. ⟨`npx vue-tsc -p tsconfig.{lib,test}.json --noEmit | grep -c 'error TS'`⟩ → `0 · 0`. **GREEN.**
  - bbnf-lang ⟨`npx vitest run`⟩ in `../bbnf-lang-x-p-w7-typescript/typescript` → `Test Files 19 passed (19) · Tests 288 passed (288)`; ⟨`npx tsc --noEmit -p .`⟩ → exit 0. **GREEN.**
  - E-6 ⟨`npx esbuild --minify src/css/bbnf/generated/grammar.js | wc -c`⟩ → `94065`; `| gzip | wc -c` → `12895` (ceiling 125,646 / 14,517). **GREEN**; the close's 94,017 / 12,920 does not reproduce byte-exact (INFO below).
  - Arms rebuilt ⟨`node bench/paired/build.mjs`⟩ → `srcDirty ""`, `bankedManifestOk 79/79`. Browsers ⟨`node bench/paired/browser.mjs c1-r1 chromium,webkit,firefox 2 whole,acc,rej,large 11 product parseStylesheet,parseCssValue,parseCssValues,parseKeyframeSelector`⟩ (the stylesheet cells the close turns + three sentinels; record moved to scratchpad `w7c1/`): **Chromium 26/26 and WebKit 26/26 rows < 1, 0 set aside** (⟨`grep -E '^(chromium|webkit)' | grep -v SET-ASIDE | awk …≥1`⟩ → none of 52); **WebKit large parseStylesheet .607 / .563** (the `.l` cure holds); WebKit rej parseStylesheet .750 / .724; acc keyframe .654 / .625.
  - Firefox (rep 0 clean cells): **rej parseStylesheet 1.150 (1/11 < 1)** · **large parseStylesheet 1.205 (0/11 < 1)** · rej parseCssValue 1.013 · rej parseCssValues .992 · acc keyframe .814 · rej keyframe .896. Rep 1 at load 58–72: whole value/values .709/.689, whole stylesheet .987; every rej and large cell set aside (spread 2.4–10.9; reads 1.02–1.31 for rej/large parseStylesheet, all in the scratch record). **The close's Firefox RED reproduces; nothing it called GREEN reads RED here.**
- **(2) Writes inside §File Bounds.** ⟨`git show --stat --format= <c>`⟩: bbnf-lang `dcf72b966` (`typescript/src/{cli,emit,gen}.ts`, `test/instrument.test.ts`) · `d81016e96` (`typescript/src/analysis/regex.ts`, `emit.ts`, `test/unroll.test.ts`; on `origin/x-p-w7-typescript`) · value.js `816ec3d1` (3 × `bench/paired/`) · `4ffbe7de` (`src/css/bbnf/generated/grammar.{js,d.ts}` + `bench/paired/yarr.mjs`) · `5f7bd27e` (24 under `bench/`) · `24f8d58d` / `63d8197d` (this record) · `bc8be115` (LEDGER, 1+/1−). ⟨`git show --name-only … | grep -cE 'dev\.sh|registry/adjudicated|waves/|conformance|package(-lock)?\.json|ci\.yml'`⟩ → `0`. `scripts/dev/dev.sh` untouched by every commit. **Clean.**
- **(3) No masking fallback.** `d81016e96`'s `unrollEscapeRuns` is a language-preserving regex rewrite (disjoint arms; lookbehind refuses an escaped paren; greedy `*` only), pinned by `test/unroll.test.ts`'s exhaustive sticky equality and re-checked leaf-by-leaf in the audit build (`Ro … AUDIT.check`); no engine sniff, no try/catch, no skip, no allowlist, no narrowed assertion; the instrument is behind `EmitOptions.instrument` and absent from the shipped module (L-G3 0). The three levers that regress an engine were not admitted (diffs banked as records only). **Clean.**
- **(4) Commit families.** One instrument-flag commit + its harness commit; one cure commit (bbnf-lang) + its re-emission commit (value.js); records in one commit; receipt, close and LEDGER cell each their own meaning. Matches the RESUME 3 Unit plan's Families. **Clean.**
- **(5) E-3.** ⟨`git diff --stat 3ec883a3..HEAD -- docs/tranches/V/megatranche/registry/adjudicated docs/tranches/X/conformance`⟩ → empty; ⟨`git log 3ec883a3..HEAD -- docs/tranches/X/parse-that/waves/W7.md`⟩ → only `3a776571` (the orchestrator's §0cx ADDENDUM (b), a dated addendum-beside, not this wave's write). **Held.**
- **(6) Mail.** ⟨`grep -nE '\| *UNREAD *\|' docs/tranches/V/coordination/INBOX.md | wc -l`⟩ → `0`; ⟨`find <p> -maxdepth 1 -type f -newer INBOX.md`⟩ over value.js `V/` + `V/coordination/`, glass `BK/coordination/` + `BL/` (⟨`ls -td glass-ui/docs/tranches/B*/`⟩ → `BL BK`), keyframes.js `V/coordination/` → 0 files. **Clean.**
- **(7) Four-verb line.** The close stamps nothing and holds `PARTIAL` because L-G1 reads RED on Firefox; LEDGER:104 reads `PARTIAL — ESC-W7l-1 unruled`. **Lawful** (no verb moved on a RED gate).
- **(8) Goal criterion at the bytes.** W7.md's goal (R-3 as bound by ADDENDUM (b) §3: "every entry, accepted and rejected halves, large sheets, below the retired parser on node, Chromium, WebKit and Firefox, twice") is **NOT MET**: Firefox rej and large parseStylesheet read 1.15 / 1.205 in this seat's clean cells.
- **(9) Published figures.** Equivalence 88, css-equiv 19/19 + 28 × MIRROR-DEFECTS 0, bbnf-lang 288/288, L-G3 0, WebKit large .55–.61, Firefox RED band 1.11–1.26 all reproduce. E-6 reads 94,065 / 12,895 B here vs the close's 94,017 / 12,920 (Δ +48 / −25 B on identical grammar bytes; minifier-invocation variance; ceilings hold by 25%). INFO.
- **(1b) This seat's own re-run (a successor check seat inherited the uncommitted axes (1)–(9) above from a killed predecessor of the same unit; each claim was re-read, not trusted).** ⟨`node bench/paired/equiv.mjs product <out>`⟩ → `compared 1376531/1376531 rows · mismatches 88 (ASCII-only sources 0)`, the same F-b-4 split. ⟨`npm run -s test:css-equivalence`⟩ → `Tests 19 passed (19)`, every `MIRROR-DEFECTS` reading `0` (27 lines this run; the count of lines is log layout, the value is 0 on every one). ⟨`npx vitest run test/css`⟩ → `5 passed · 58 passed`. ⟨`vue-tsc -p tsconfig.{lib,test}.json --noEmit | grep -c 'error TS'`⟩ → `0 · 0`. bbnf-lang ⟨`npx vitest run`⟩ → `19 passed · 288 passed`. L-G3 / K2-b greps → `0 · 0`. ⟨`node bench/paired/browser.mjs c1b firefox,webkit 1 rej,large 11 product parseStylesheet`⟩ (load 105→58; record moved to scratchpad, and the predecessor's stray untracked `bench/records/2026-09-24-x-p-w7-browser-c1-r1.json` moved out with it; `git status --porcelain bench src test` → empty): **WebKit rej .765 (11/11 < 1) · large .536 (11/11 < 1), clean. Firefox rej 1.073–1.126 over 4 attempts, large 1.282–1.49 over 4 attempts**, all set aside on spread under load but every attempt above 1. The Firefox RED reproduces a third time; no claimed GREEN reads RED.
- **(10) Honest-RED adjudication at the spec bytes.**
  - **L-G1 Firefox (rej parseStylesheet, large parseStylesheet): RED, NOT relieved.** ADDENDUM (b) (W7.md:216–230) keeps the gate "unchanged" on Firefox and rules that it "is not relaxed to 'recorded'". Its escalation clause routes an uncurable cause "to the owner as a measured decision, never as a quiet relaxation". That clause makes `.l`'s ESCALATED return lawful. It does not relieve the gate. ESC-W7l-1 is **unruled** (⟨`grep -rn ESC-W7l-1 docs/tranches/X/COHESION.md`⟩ → nothing; LEDGER:104 `PARTIAL — ESC-W7l-1 unruled`). No producer owns it, since the cure is in this wave's own emitter/actions grant, and no successor wave takes it by spec routing. The residual register names the owner (the owner's ruling on ESC-W7l-1), but naming an owner is not a spec relief. So this is a real RED against the goal, and it blocks under the bar.
  - **P-6, E-8, V-9 + the CI step, Z-1, Z-3's publish half: relieved.** ADDENDUM 2026-09-24 §1 moves them to X.P.W7P (GATE-KEYED on the owner's npm OTP) and lets X.P.W7's close relieve them by citing it. The close cites it. These are honest-RED by the spec's own routing.
- **Successors' "Opens after" conjuncts.** X.P.W7P (`W7P.md:3`) opens when (i) the owner supplies an npm OTP or publishes step 1, **and** (ii) X.P.W7 has closed its engineering gates. (i) is not met (owner act, still outstanding) and (ii) is RED (L-G1 Firefox). X.P.W7P is **lawfully blocked** on both. No other wave file names X.P.W7 as an opens-after conjunct (⟨`grep -rln` over `X/*/waves`, `X/waves`⟩ → only W7.md and W7P.md).

### Register
| # | Severity | Claim | Receipt | Cure |
|---|---|---|---|---|
| C1-1 | **HIGH** | ADDENDUM (b)'s binding gate (every entry, both halves and large sheets, below the retired parser on Firefox, ×2) reads RED on Firefox rej parseStylesheet and large parseStylesheet. The goal criterion is not met at the bytes, and the gate has no spec relief. | Close ×2 1.11–1.26; predecessor seat rej 1.150 (1/11) and large 1.205 (0/11) clean; this seat rej 1.07–1.13, large 1.28–1.49 (axis 1b); ESC-W7l-1 unruled | The owner rules ESC-W7l-1 (the `.l` receipt's options: (a) run-length emission, (b) the negated-run lever, (c) record). Then a root-cause unit under that ruling re-reads L-G1 on all four engines ×2. The row stays PARTIAL until then. |
| C1-2 | INFO | E-6 size reads 94,065 / 12,895 B against the close's 94,017 / 12,920 on identical grammar bytes (minifier-invocation variance). Both are far inside the 125,646 / 14,517 ceilings. | axis (1) | none |
| C1-3 | INFO | The css-equivalence log carried 27 `MIRROR-DEFECTS` lines here against 28 for the predecessor. Every line reads 0. | axis (1b) | none |

**Honest-RED set (relieved):** P-6 · E-8 · V-9 + CI step · Z-1 · Z-3 publish half, each relieved to X.P.W7P by ADDENDUM 2026-09-24 §1.
**Unrelieved RED:** L-G1 Firefox (rej parseStylesheet, large parseStylesheet), which is C1-1.

**Verdict: NOT-CONFORMANT.** One HIGH (C1-1), an unrelieved RED that has been escalated to the owner and not yet ruled. All 10 claimed GREENs reproduce: V-1 88 = F-b-4 · css-equiv 19/19 · test/css 58/58 · vue-tsc 0/0 · bbnf-lang 288/288 · L-G3 0 · K2-b 0 · V-8 0 · E-6 inside ceilings · Chromium/WebKit/node cells < 1 incl. WebKit large. Writes are in set, nothing is masked, the families are whole, E-3 held, 0 UNREAD, and the four-verb line did not move. **The LEDGER row stays `PARTIAL`, with no status edit.** An event line is appended.

## Repair 1 (2026-09-24, repair seat round 1, `claude-opus-5-5`, Track D; answers `## Check 1`)
- **Crash recovery:** no dirty path inside this unit's writable set (the record is clean at open; parse-that master's dirty rust/docs paths belong to other programs and are not touched).
- **C1-1 (HIGH), L-G1 Firefox rej + large parseStylesheet RED → ESCALATED, not cured.** ADDENDUM (b) (W7.md:229) routes "a cause it cannot cure on some engine without regressing another" to the owner as a measured decision; `.l` already measured every admitted lever (the negated-run lever regresses Chromium ×1.054 / WebKit ×1.02; deferred text actions regress Chromium accepted ×1.087; engine splits barred by L-9). The remaining branches (a) run-length emission, (b) accept the negated-run costs, (c) record — are owner rulings, not a repair seat's. ⟨`grep -n ESC-W7l-1 docs/tranches/X/COHESION.md`⟩ → 0 hits (still unruled). No code change; no gate re-read owed (no bytes moved).
- **C1-2 (INFO)** E-6 size variance 94,065 / 12,895 B vs 94,017 / 12,920: inside ceilings 125,646 / 14,517; cure none.
- **C1-3 (INFO)** 27 vs 28 MIRROR-DEFECTS lines, every one 0; cure none.
- **Commits:** this section only. **Cured:** 0. **Escalated:** 1 (ESC-W7l-1, owner). Row stays **PARTIAL**.

## Check 2 (2026-09-24, L-20 fresh adversarial pass 2 of the RESUME 3 Close, `claude-opus-5-5`, Track D; verify-only, cures nothing)

**Open.** Spec read whole (W7.md, 230 lines; ADDENDUM (b) at `:216` binds). From this record: header + `## Open`, `## RESUME 3 — Open` through `## RESUME 3 Unit plan`, `## RESUME 3 Close`, `## Check 1`, `## Repair 1` (the last section). **Crash-recovery:** ⟨`git status --porcelain -- docs/tranches/X/execution src/css bench test/css`⟩ → empty; bbnf-lang worktree `## x-p-w7-typescript...origin/x-p-w7-typescript`, clean at `d81016e96`; parse-that master's dirty `rust/**`, `README.md`, `.cargo/config.toml` belong to other programs (untouched). **No inherited partial work.** ⟨`git log --oneline 4ffbe7de..HEAD -- src/css package.json package-lock.json bench test/css`⟩ → only `5f7bd27e` (bench records), so the product bytes are `.l`'s (`4ffbe7de`); Repair 1 (`5dbf8040`) moved no bytes. Load 57–117 at open (sibling tracks), recorded.
- **Ruling status:** ⟨`grep -n "ESC-W7l-1" docs/tranches/X/COHESION.md`⟩ → 0 hits (COHESION's last sections are §0db–§0df, glass/fourier rows); LEDGER:104 `PARTIAL — ESC-W7l-1 unruled`. W7.md carries no addendum after (b). **ESC-W7l-1 is still unruled.**

### Axes
- **(1) Claimed GREENs reproduce (this seat's reads).**
  - L-G2 / V-1 ⟨`node bench/paired/equiv.mjs product <scratch>`⟩ ×2 → `compared 1376531/1376531 rows · mismatches 88 (ASCII-only sources 0)` both, split `parseCssValue 4 · parseCssValues 4 · functionParam 11 · splitTopLevel(,) 13 · (;) 11 · (space) 45` = the F-b-4 rows. **GREEN ×2.**
  - ⟨`npm run -s test:css-equivalence`⟩ → `Tests 19 passed (19)`; every `MIRROR-DEFECTS` line reads 0 (⟨`… | sort | uniq -c`⟩ → `29 MIRROR-DEFECTS 0`; line count is log layout, as C1-3). ⟨`npx vitest run test/css`⟩ → `5 passed · 58 passed`. ⟨`npx vue-tsc -p tsconfig.{lib,test}.json --noEmit | grep -c 'error TS'`⟩ → `0 · 0`. **GREEN.**
  - bbnf-lang ⟨`npx vitest run`⟩ in the worktree → `19 passed · 288 passed`; ⟨`npx tsc --noEmit -p .`⟩ → exit 0. **GREEN.**
  - L-G3 ⟨`grep -rln "instrument\|__prof\|PC\[\|NOW()" src/css/bbnf/generated | wc -l`⟩ → `0`; K2-b ⟨`grep -rn deepFreeze src | wc -l`⟩ → `0`; V-8 greps → `0 · 0`. **GREEN.**
  - E-6 ⟨`npx esbuild --minify src/css/bbnf/generated/grammar.js | wc -c`⟩ → `94065`; `| gzip | wc -c` → `12895` (= Check 1; ceilings 125,646 / 14,517). **GREEN.**
  - Timing (bounded, the cells in dispute plus the WebKit cure): arms ⟨`node bench/paired/build.mjs`⟩ → `srcDirty ""`, `bankedManifestOk 79/79`; ⟨`node bench/paired/browser.mjs c2 firefox,webkit 1 rej,large 11 product parseStylesheet`⟩ (load 52 → 43; record moved to scratchpad `w7c2/`, ⟨`git status --porcelain bench src test | wc -l`⟩ → 0): **WebKit rej .74 · large .577 (<1, clean)**; **Firefox rej 1.109 (0/11 < 1, spread 1.14) · large 1.281 (0/11 < 1, spread 1.41)** — clean cells, RED. Chromium/node cells are cited from Check 1 and the Close (no product byte moved since).
- **(2) Writes in set.** Since Check 1 the wave added only `125d9a72` (Check 1: this record + LEDGER event) and `5dbf8040` (Repair 1: this record). `.l`'s roster (`dcf72b966`, `d81016e96`, `816ec3d1`, `4ffbe7de`, `5f7bd27e`, `24f8d58d`) was verified by Check 1 and is unchanged. `scripts/dev/dev.sh` untouched. **Clean.**
- **(3) No masking fallback.** No code moved since Check 1, whose reading stands (language-preserving unroll, instrument compiled out, rejected levers banked only). **Clean.**
- **(4) Families** whole (as Check 1). **(5) E-3** ⟨`git diff --stat 3ec883a3..HEAD -- registry/adjudicated X/conformance X/parse-that/waves`⟩ → only `W7.md | 16 +` = the orchestrator's §0cx ADDENDUM (b) (`3a776571`), not this wave's write. **Held.**
- **(6) Mail** ⟨`grep -nE '\| *UNREAD *\|' INBOX.md | wc -l`⟩ → `0` (I-55/I-56 since Check 1 are glass rows, folded). **Clean.**
- **(7) Four-verb line** stays `PARTIAL`; no verb moved on a RED gate. **Lawful.**
- **(8) Goal criterion** (ADDENDUM (b) §3: every entry, both halves and large sheets, below the retired parser on four engines, ×2): **NOT MET** — Firefox rej/large parseStylesheet read 1.109 / 1.281 here, clean.
- **(9) Published figures** reproduce (88, 19/19, 288/288, 94,065 / 12,895 = Check 1, WebKit large .55–.61 band, Firefox RED band).
- **(10) Honest-RED adjudication.** L-G1 Firefox rej + large parseStylesheet: **RED, unrelieved.** ADDENDUM (b) keeps the gate "unchanged" and "not relaxed to 'recorded'"; the impasse clause routes it to the owner "as a measured decision", which makes the ESCALATED return lawful but relieves nothing while ESC-W7l-1 is unruled. Not producer-owned (the cure sits in this wave's own emitter/actions grant), not routed to a successor. Release gates P-6 · E-8 · V-9 + CI step · Z-1 · Z-3 publish half: **relieved** to X.P.W7P by ADDENDUM 2026-09-24 §1, owner-named (the owner's npm OTP).
- **Successors.** X.P.W7P (`W7P.md:3`) opens on (i) the owner's OTP or step-1 publish — **not met** — **and** (ii) X.P.W7 CLOSED on its engineering gates — **RED** (L-G1 Firefox). **Lawfully blocked** on both. No other wave names X.P.W7 as an opens-after conjunct.

### Register
| # | Severity | Claim | Receipt | Cure |
|---|---|---|---|---|
| C2-1 | **HIGH** | ADDENDUM (b)'s binding L-G1 reads RED on Firefox rej parseStylesheet and large parseStylesheet a fourth time; no spec relief (ESC-W7l-1 unruled). Same defect as C1-1, unmoved by Repair 1 (no bytes). | this seat rej 1.109 (0/11), large 1.281 (0/11), clean; Check 1 1.07–1.49; Close 1.11–1.26 ×2; `grep ESC-W7l-1 COHESION.md` → 0 | The owner rules ESC-W7l-1 ((a) run-length emission · (b) negated-run lever · (c) record); a root-cause unit under the ruling re-reads L-G1 on four engines ×2. Row stays PARTIAL. |
| C2-2 | INFO | MIRROR-DEFECTS line count 29 here vs 27/28 before; every line 0. | axis (1) | none |

**Honest-RED set (relieved):** P-6 · E-8 · V-9 + CI step · Z-1 · Z-3 publish half → X.P.W7P (ADDENDUM 2026-09-24 §1; owner's npm OTP).
**Unrelieved RED:** L-G1 Firefox rej + large parseStylesheet (C2-1).

**Verdict: NOT-CONFORMANT.** One HIGH (C2-1). Every claimed GREEN reproduces (V-1 88 ×2 · css-equiv 19/19 · test/css 58/58 · vue-tsc 0/0 · bbnf-lang 288/288 + tsc 0 · L-G3 0 · K2-b 0 · V-8 0 · E-6 · WebKit rej/large < 1). **The LEDGER row stays `PARTIAL`; no status edit.** An event line is appended. **Adjacent edits: none. Out-of-set writes: none.**

## Repair 2 (2026-09-24, repair seat round 2, `claude-opus-5-5`, Track D; answers `## Check 2`)
- **Crash recovery:** ⟨`git status --porcelain -- docs/tranches/X/execution/D/`⟩ → empty at open; parse-that's dirty `rust/` + `.cargo` + `README.md` paths lie outside this unit's writable set and belong to other programs — not read, not touched.
- **Ruling status re-read:** ⟨`grep -rn ESC-W7l-1 docs/tranches/X/COHESION.md`⟩ → 0 hits; ⟨`grep -n ADDENDUM docs/tranches/X/parse-that/waves/W7.md`⟩ → last is `:216` (b) (no ruling after it); ⟨`git log -3 -- COHESION.md W7.md`⟩ → `2d8e6eef` §0dg, `6d75f1e0` §0df, `459a7251` §0de — glass/keyframes rows only. **ESC-W7l-1 is still unruled.**
- **C2-1 (HIGH), L-G1 Firefox rej + large parseStylesheet RED → ESCALATED, not cured.** The register's own cure is "the owner rules ESC-W7l-1 (a)/(b)/(c)". ADDENDUM (b) (W7.md:229) routes an engine-trade cause to the owner "as a measured decision, never as a quiet relaxation", and bars per-engine code paths and relaxation to "recorded". `.l` already measured every admitted lever against the four engines (Repair 1 lists them); each regresses another engine. No in-bounds idiomatic cure exists without the ruling; a repeat bench would move no bytes and so re-reads nothing new — Check 2's cells (Firefox rej 1.109, large 1.281, 0/11 each, clean; WebKit .74 / .577) stand as the measured reading.
- **C2-2 (INFO)** 29 vs 27/28 MIRROR-DEFECTS lines, every one 0 (log layout); cure none.
- **Gates re-read:** none — no product byte moved (this seat wrote only this section); Check 2's GREEN set (V-1 88 ×2 · css-equiv 19/19 · test/css 58/58 · vue-tsc 0/0 · bbnf-lang 288/288 · E-6 94,065 / 12,895) stands at HEAD `733a9207`.
- **Commits:** this section only. **Cured:** 0. **Escalated:** 1 (ESC-W7l-1, owner). **Adjacent edits:** none. Row stays **PARTIAL**.

## Check 3 (2026-09-24, L-20 fresh adversarial pass 3 of the RESUME 3 Close, `claude-opus-5-5`, Track D; verify-only, cures nothing)

**Open.** Spec read whole (W7.md, 230 lines; ADDENDUM (b) at `:216` binds). From this record: `## RESUME 3 — Open` through `## RESUME 3 Unit plan`, `## RESUME 3 Close`, `## Check 2`, `## Repair 2` (the last section). **Crash-recovery:** ⟨`git status --porcelain -- docs/tranches/X/execution src/css bench test/css`⟩ → empty; bbnf-lang worktree `## x-p-w7-typescript...origin/x-p-w7-typescript`, clean at `d81016e96`; parse-that master's dirty `rust/**`, `README.md`, `.cargo/config.toml` are other programs' (not touched). **No inherited partial work.** ⟨`git log --oneline 4ffbe7de..HEAD -- src/css package.json package-lock.json bench test/css`⟩ → only `5f7bd27e` (records): product bytes are `.l`'s. Since Check 2 the wave added only `32ecd200` (Repair 2, this record). Load 26–92 during this seat, recorded.
- **Ruling status:** ⟨`grep -n ESC-W7l-1 docs/tranches/X/COHESION.md`⟩ → 0 hits; ⟨`grep -n ADDENDUM W7.md`⟩ → last `:216` (b); ⟨`git log -3 -- COHESION.md W7.md`⟩ → `733a9207` §0dh, `2d8e6eef` §0dg, `6d75f1e0` §0df (fourier/glass/keyframes rows). **ESC-W7l-1 is still unruled.**

### Axes
- **(1) Claimed GREENs reproduce (this seat's reads).**
  - L-G2 / V-1 ⟨`node bench/paired/equiv.mjs product <scratch file>`⟩ ×2 → `compared 1376531/1376531 rows · mismatches 88 (ASCII-only sources 0)` both, split `parseCssValue 4 · parseCssValues 4 · functionParam 11 · splitTopLevel(,) 13 · (;) 11 · (space) 45` = the F-b-4 rows. **GREEN ×2.**
  - ⟨`npm run -s test:css-equivalence`⟩ → `Tests 19 passed (19)`; ⟨`grep -oE 'MIRROR-DEFECTS [0-9]+' | sort | uniq -c`⟩ → `27 MIRROR-DEFECTS 0`. ⟨`npx vitest run test/css`⟩ → `5 passed · 58 passed`. **GREEN.**
  - bbnf-lang ⟨`npx vitest run`⟩ in the worktree → `Test Files 19 passed (19) · Tests 288 passed (288)`; ⟨`npx tsc --noEmit -p .`⟩ → exit 0. **GREEN.**
  - L-G3 ⟨`grep -rln "instrument\|__prof\|PC\[\|NOW()" src/css/bbnf/generated | wc -l`⟩ → `0`; K2-b ⟨`grep -rn deepFreeze src | wc -l`⟩ → `0`; V-8 ⟨GRAMMAR_MODULES/new ParserState/reset() grep⟩ → `0`, ⟨`[xX]` inside `/…/i` grep⟩ → `0`. **GREEN.**
  - E-6 ⟨`npx esbuild --minify src/css/bbnf/generated/grammar.js | wc -c`⟩ → `94065`; `| gzip | wc -c` → `12895` (= Checks 1–2; ceilings 125,646 / 14,517). **GREEN.**
  - Timing, bounded to the disputed cells plus the WebKit cure: ⟨`node bench/paired/build.mjs`⟩ → `valuejsHead 32ecd200`, `srcDirty ""`, `bankedManifestOk 79/79`; ⟨`node bench/paired/browser.mjs c3 firefox,webkit 1 rej,large 11 product parseStylesheet`⟩ (load 26.6 → 26.4; record moved to scratchpad `w7c3/`, ⟨`git status --porcelain bench src test | wc -l`⟩ → 0): **WebKit rej .75 (11/11 < 1) · large .562 (11/11)**; **Firefox rej 1.104 (2/11 < 1, spread 1.49) · large 1.27 (0/11, spread 1.38)**, clean cells, RED. Chromium/node cells cited from Check 1 and the Close (no product byte moved).
- **(2) Writes in set.** Since Check 2 only `32ecd200` (this record). `.l`'s roster (`dcf72b966`, `d81016e96`, `816ec3d1`, `4ffbe7de`, `5f7bd27e`, `24f8d58d`) verified by Check 1, unchanged. ⟨`git log 3ec883a3..HEAD -- scripts/dev/dev.sh`⟩ → empty. **Clean.**
- **(3) No masking fallback.** No code moved since Check 1; its reading stands. **Clean.**
- **(4) Families** whole. **(5) E-3** ⟨`git diff --stat 3ec883a3..HEAD -- registry/adjudicated X/conformance X/parse-that/waves`⟩ → only `W7.md | 16 +` = the orchestrator's §0cx ADDENDUM (b) (`3a776571`), not this wave's write. **Held.**
- **(6) Mail** ⟨`grep -cE '\| *UNREAD *\|' INBOX.md`⟩ → `0`. **Clean.**
- **(7) Four-verb line** stays `PARTIAL`; no verb moved on a RED gate. **Lawful.**
- **(8) Goal criterion** (ADDENDUM (b) §3: every entry, both halves and large sheets, below the retired parser on four engines, ×2): **NOT MET.** Firefox rej/large parseStylesheet read 1.104 / 1.27 here, clean.
- **(9) Published figures** reproduce: 88, 19/19, 58/58, 288/288, 94,065 / 12,895, the WebKit .55–.75 band and the Firefox 1.10–1.28 RED band. The Close's phrase "`generated/grammar.js` sha256 `5dffabdc…`" is the file's `sha256(grammar ⊕ emitter)` header line (⟨`head -2`⟩), not the file digest (⟨`shasum -a 256`⟩ → `592dfab9…`): INFO.
- **(10) Honest-RED adjudication.** L-G1 Firefox rej + large parseStylesheet: **RED, unrelieved.** ADDENDUM (b) keeps the gate "unchanged" and "not relaxed to 'recorded'". Its impasse clause makes the ESCALATED return lawful, but it relieves nothing while ESC-W7l-1 is unruled. The gate is not producer-owned (the cure sits in this wave's own emitter/actions grant) and not routed to a successor. Release gates P-6 · E-8 · V-9 + CI step · Z-1 · Z-3 publish half: **relieved** to X.P.W7P by ADDENDUM 2026-09-24 §1, owner-named (the owner's npm OTP).
- **Successors.** X.P.W7P (`W7P.md:3`) opens when (i) the owner supplies an OTP or publishes step 1 (**not met**) **and** (ii) X.P.W7 has CLOSED its engineering gates (**RED**, L-G1 Firefox). **Lawfully blocked** on both. No other wave names X.P.W7 as an opens-after conjunct.

### Register
| # | Severity | Claim | Receipt | Cure |
|---|---|---|---|---|
| C3-1 | **HIGH** | ADDENDUM (b)'s binding L-G1 reads RED on Firefox rej parseStylesheet and large parseStylesheet a fifth time, with no spec relief (ESC-W7l-1 unruled). Same defect as C1-1/C2-1; Repair 2 moved no bytes. | this seat: rej 1.104 (2/11), large 1.27 (0/11), clean; Check 2 1.109 / 1.281; Close 1.11–1.26 ×2; `grep ESC-W7l-1 COHESION.md` → 0 | The owner rules ESC-W7l-1: (a) run-length emission · (b) negated-run lever · (c) record. A root-cause unit under the ruling re-reads L-G1 on four engines ×2. Row stays PARTIAL. |
| C3-2 | INFO | The Close calls the header's `sha256(grammar ⊕ emitter)` "`generated/grammar.js` sha256"; the file digest is `592dfab9…`. | axis (9) | none (wording only; `--check` compares the header) |
| C3-3 | INFO | 27 MIRROR-DEFECTS lines vs 28/29 before, every one 0 (log layout). | axis (1) | none |

**Honest-RED set (relieved):** P-6 · E-8 · V-9 + CI step · Z-1 · Z-3 publish half → X.P.W7P (ADDENDUM 2026-09-24 §1; owner's npm OTP).
**Unrelieved RED:** L-G1 Firefox rej + large parseStylesheet (C3-1).

**Verdict: NOT-CONFORMANT.** One HIGH (C3-1). Every claimed GREEN reproduces (V-1 88 ×2 · css-equiv 19/19 · test/css 58/58 · bbnf-lang 288/288 + tsc 0 · L-G3 0 · K2-b 0 · V-8 0/0 · E-6 · WebKit rej/large < 1). **The LEDGER row stays `PARTIAL`, with no status edit.** An event line is appended. **Adjacent edits: none. Out-of-set writes: none.**

## RESUME 4 — Open (2026-09-24, seat 0, `claude-opus-5-5`, Track D; COHESION §0di + W7.md ADDENDUM (c))

- **Mode:** RESUME 4. ⟨`grep -n "| X.P.W7 |" LEDGER.md`⟩ → `:104` status `PARTIAL — ESC-W7l-1 unruled (2026-09-24): …` (not CLOSED); this record exists (1659 lines before this section). Governing text: W7.md read whole (247 lines; ADDENDUM (c) at `:231` binds — ESC-W7l-1 RULED: (c) refused, (a) admitted STATIC, (b) measured fallback only) and COHESION §0di (`:3487`, the file end). Read from this record: `## RESUME 3 — Open` through `## RESUME 3 Unit receipts` (the `.l` receipt) and `## Check 3` (the last section).
- **alreadyDone (orchestrator note + ADDENDUM (c)): `.o .p .t .e .v .k .k2 .g .l`**, verified at the bytes: ⟨`git cat-file -e <sha>^{commit}`⟩ → value.js `816ec3d1` `4ffbe7de` `5f7bd27e` `24f8d58d` (`.l`) · `baaec604` (`.k2`) · `df9c6f7e` (`.g`) · `8b08db4b` (Repair 1) all OK; bbnf-lang `dcf72b966` (instrument flag) · `d81016e96` (cure 1) OK, `d81016e96` = branch `x-p-w7-typescript` HEAD = `origin/x-p-w7-typescript`. `.o`…`.k` verified at the RESUME Open (record:867). `.z` re-opens only in X.P.W7P.
- **Crash-recovery:** ⟨`git status --porcelain -- src/css bench test/css scripts/gen-grammar.mjs docs/tranches/X/execution`⟩ → empty; ⟨`git -C ../bbnf-lang-x-p-w7-typescript status --porcelain -b`⟩ → `## x-p-w7-typescript...origin/x-p-w7-typescript`, clean. `node_modules/@mkbabb/bbnf-lang` → `0.1.4` (restored by `.l`). ⟨`git log --oneline 4ffbe7de..HEAD -- src/css bench test/css scripts/gen-grammar.mjs package.json`⟩ → only `5f7bd27e` (records): product bytes = `.l`'s final bytes. **No inherited partial work.**
- **Preconditions:** `.l2` opens on §0di's ruling (not a predecessor wave): ⟨`grep -n "^## §0di" COHESION.md`⟩ → `3487`; W7.md:231 ADDENDUM (c) present; `.l` commits exist (above); the linked worktree present on the branch; the banked lever diffs ⟨`ls bench/records/2026-09-24-x-p-w7-l-levers/`⟩ present (the (b) starting point). Release chain stays X.P.W7P (LEDGER:105 `GATE-KEYED … one-time password`). **MET.** No npm act in this wave.

### E13 Step-0 mail sweep (2026-09-24)
- ⟨`ls -td glass-ui/docs/tranches/B*/ | head -3`⟩ → `BL BK BJ` (BL newest, no `coordination/`; BK stays the mail path, BL root swept).
- ⟨`find <path> -maxdepth 1 -type f -newer INBOX.md | wc -l`⟩ over value.js `V/` + `V/coordination/` · glass `BK/coordination/` + `BL/` · keyframes.js `V/coordination/` · atlas `P/coordination/` → **0** on every path. ⟨`grep -cE '\| *UNREAD *\|' INBOX.md`⟩ → `0` (last row I-57).
- **Result: 0 unrowed · 0 UNREAD in scope.** A dated sweep line was appended to INBOX.md.

## RESUME 4 Baseline (BEFORE, read-only, 2026-09-24; product bytes = `.l`'s final bytes `4ffbe7de`, unchanged)

- ⟨`git log --oneline 4ffbe7de..HEAD -- src bench test/css scripts/gen-grammar.mjs`⟩ → only `5f7bd27e` (records). ⟨`node bench/paired/build.mjs`⟩ → `srcDirty ""`, `bankedManifestOk 79/79`, `retiredAt 2155142b`.
- **RESUME rule:** `.l2` turns L-G1 (the Firefox RED cells, and every cell it could move) and the new classification test; every other gate is cited from `## Check 3` (V-1 88 = F-b-4 ×2 · css-equiv 19/19 · test/css 58/58 · bbnf-lang 288/288 + tsc 0 · L-G3 0 · K2-b 0 · E-6 94,065/12,895 · Chromium/node < 1) and `.l` act 7 (`gen-grammar --check` exit 0 on the linked emitter; not re-read here because `--check` needs the emitter linked, a `.l2` act: ⟨`node scripts/gen-grammar.mjs --check`⟩ on the 0.1.4 install → `has no \`bbnf\` bin (bbnf gen needs @mkbabb/bbnf-lang >= 0.2.0)`, the expected tooling state, not a drift reading).

| Gate | Command | BEFORE (2 reps, paired median) | Reading |
|---|---|---|---|
| L-G1 Firefox rej parseStylesheet | ⟨`node bench/paired/browser.mjs l2-open firefox,webkit,chromium 2 rej,large 11 product parseStylesheet`⟩ (load 43.15 → 41.75, recorded; Firefox 150.0.2 · WebKit 26.4 · Chromium 148.0.7778.96; record moved to the scratchpad, ⟨`git status --porcelain bench src test | wc -l`⟩ → 0) | **1.184 / 1.103** clean (+3 SA 1.158/1.26/1.22, spread 1.81–2.73) | **born-RED** |
| L-G1 Firefox large parseStylesheet | same | **1.316 / 1.279** | **born-RED** |
| L-G1 WebKit rej / large parseStylesheet | same | .75 / .74 · .571 / .581 | GREEN (stay-GREEN) |
| L-G1 Chromium rej / large parseStylesheet | same | .529 / .539 · .352 / .352 | GREEN (stay-GREEN; the (b) regression watch cell) |
| `.l2` classification property | ⟨`grep -rniE bulk ../bbnf-lang-x-p-w7-typescript/typescript/src | wc -l`⟩ | `0` (`analysis/` = deps, first, index, metadata, regex, scc) | **born-RED** |
| L-G3 instrument bytes in shipped `generated/` | ⟨`grep -rln "instrument\|__prof\|PC\[\|NOW()" src/css/bbnf/generated | wc -l`⟩ | 0 | stay-GREEN |
| K2-b post-hoc walk | ⟨`grep -rn deepFreeze src | wc -l`⟩ | 0 | stay-GREEN |
| emitted code-unit loops | ⟨`grep -c charCodeAt src/css/bbnf/generated/grammar.js`⟩ | 225 | recorded (the `.l2` scan-form surface) |

**greenBeforeCure: none.**

## RESUME 4 Unit plan (2026-09-24)

**alreadyDone:** `.o .p .t .e .v .k .k2 .g .l` (never re-dispatched; ADDENDUM (c) + orchestrator note). **`.z`:** re-opens only in X.P.W7P. **Owed:** `[X.P.W7.l2]` alone, then close. One concurrent. Every seat Opus 5.5 (owner's Opus-only order, 2026-09-23; ADDENDUM (c) "Opus, effort high"). An ESCALATED `.l2` does not halt the wave: the close runs on it.

### Rulings cited (never re-opened)
§0di / W7.md ADDENDUM (c) (ESC-W7l-1 RULED: (c) record-instead-of-gate REFUSED; (a) admitted STATIC — per-rule classification from the grammar's structure, no input length, no engine detection; (b) uniform negated-run lever = measured fallback only, stating which form shipped and why with lever tables) · §0cx / ADDENDUM (b) (root cause, no per-engine path; impasse → ESCALATED with the profile) · §0cp (release chain → X.P.W7P, OTP-keyed; LEDGER hunk hygiene) · §0ck 1–7 (F-b-4 accepted; positional semantics; bbnf-lang choreography) · §0bt ADJACENT-LINE RULE.

### Locks
- **L-4 (bbnf-lang):** writes only in `../bbnf-lang-x-p-w7-typescript` on `x-p-w7-typescript`; push the branch only; never local master; PR #1 stays open. Every re-emission of `src/css/bbnf/generated/` goes through `node scripts/gen-grammar.mjs` only (emitter linked from the worktree as `.l` did; restore 0.1.4 after, ⟨`grep '"version"'`⟩ → `0.1.4`); `--check` passes after.
- **L-6 (no npm):** no `npm publish`, no version bump, no dependency move (X.P.W7P); ⟨`git diff HEAD -- package.json package-lock.json`⟩ empty at the end.
- **L-7 (LEDGER, §0cp 4):** read `git diff` on LEDGER.md before any commit touching it; stage only this seat's hunk.
- **L-8 (instrument compiled out):** L-G3 stays 0 in shipped `generated/`.
- **L-9 (one module, every engine):** no engine sniffing, no input-length test, no per-engine branch in emitted or action code; K2-b stays 0; no try/catch around a defect.
- **L-10 (static classification, ADDENDUM (c)):** the bulk-text/token decision is a named, tested property of `typescript/src/analysis/**`, computed from grammar structure only; a unit test names each classified rule of value.js's grammar (at least `preludeRun`, `blockBody`, `textBody`, `ruleGap`).
- **Families:** the classification + emission = one bbnf-lang commit (analysis + `emit.ts` + tests), pushed; its value.js re-emission (+ any bench probe) = one value.js commit; records = one value.js `bench/**` commit; if (b) ships, it is its own bbnf-lang commit + re-emission commit.

### `[X.P.W7.l2]` — the static bulk-run emission (W7.md 231–247: ADDENDUM (c); COHESION §0di)
- **Writable:** bbnf-lang `typescript/**` on `x-p-w7-typescript` (`src/analysis/**`, `src/emit.ts`, tests) · value.js `src/css/bbnf/generated/**` (through `node scripts/gen-grammar.mjs` only) · `bench/**` (probes beside `bench/paired/`, records) · `test/css/**` (pins; §0bt) · this record.
- **Acts:** (1) analysis property `bulkRun` (name the seat's choice): a class run is bulk-text when its rule's run is unbounded and spans a block/prelude/body (structural: the run's repetition is `*`/`+` over a negated class whose terminators are block/statement delimiters, reached from block/prelude/body rules) — token runs keep the code-unit loop; unit test naming each classified rule; (2) emit bulk-text runs as a sticky regex scan (`lastIndex`/`y`), token runs unchanged; audit build re-runs as spelt; (3) re-emit value.js (`gen-grammar.mjs`), `--check` 0, deterministic ×2; (4) read the gates; (5) only if a cell stays RED by measurement: fallback (b) from `bench/records/2026-09-24-x-p-w7-l-levers/negated-run-regex+defer.diff` (the negated-run half only; the deferred-text half was refused on its own numbers), uniform, with lever tables; state which form shipped and why.
- **Gates:** L-G1 every entry × {acc, rej} + large sheets < 1.00 paired on node, Chromium, WebKit, Firefox, ×2, load recorded (`bench/paired/isolated.mjs`, `bench/paired/browser.mjs`); set-aside cells re-read quiesced, never a voided cell claimed · L-G2 V-1 88 = F-b-4 exactly ×2 (`bench/paired/equiv.mjs`) · L-G3 0 · stay-GREEN: `test:css-equivalence` 19/19 MIRROR-DEFECTS 0, `npx vitest run test/css`, `npm test` (foreign failures only), `vue-tsc` 0/0/0, `gen-grammar --check` 0, K2-b 0, E-1..E-7 on the final emitter (E-6 ≤ 125,646 / 14,517), bbnf-lang TS suite ×2 + `tsc --noEmit` 0, whole-7/7 inside ceilings. New born-RED: the classification test (0 `bulk` hits in `analysis/` at open).
- **Locks:** L-4, L-6, L-7, L-8, L-9, L-10.

### Close (after `.l2`)
Engineering gates binding (accepted + rejected halves and large sheets under the retired parser on every engine, ×2). Release gates P-6 · E-8 · V-9 + the CI step · Z-1 · Z-3 (publish half) relieved by citing X.P.W7P (§0cp; OTP-keyed). No `npm publish` in this wave.

## RESUME 4 Unit receipts

### X.P.W7.l2

Seat `claude-opus-5-5`, 2026-09-24, Track D. Governing text: W7.md (247 lines, read whole; ADDENDUM (c) at 231–247 under ADDENDUM (b) 216–230) · COHESION §0di (read to the file end, `:3487`–`:3496`) · the RESUME 4 Unit plan above (Locks L-4, L-6..L-10).

**Crash-recovery.** ⟨`git -C ../bbnf-lang-x-p-w7-typescript status --porcelain`⟩ → empty at `d81016e96`; ⟨`git status --porcelain -- src/css/bbnf/generated bench test/css <record> LEDGER.md`⟩ → empty. **No inherited partial work.** Tooling as `.l`: `node_modules/@mkbabb/bbnf-lang` (0.1.4) moved aside as `.bbnf-lang-0.1.4-aside-l2`, the worktree's `typescript/` linked in its place (built with `npm run build`) for the unit's life, restored at the end (act 9).

**Resumed seat (2026-09-24 ~22:10 ET, `claude-opus-5-5`; the first `.l2` seat died at the account session limit, COHESION §0dn).** Crash-recovery at resume: ⟨`git -C ../bbnf-lang-x-p-w7-typescript status --porcelain`⟩ → empty, HEAD `89fae4826` = ⟨`git rev-parse origin/x-p-w7-typescript`⟩ (pushed); ⟨`git status --porcelain -- src/css/bbnf/generated bench test/css <record>`⟩ → this record (the paragraph above, uncommitted) + 3 untracked records (`2026-09-24-x-p-w7-browser-l2-probe.json`, `…-browser-l2-static-r1.json`, `…-profile-l2-p1.json`). **Inherited, judged against the spec, kept:** the bbnf-lang commits `d08694061` (static form) and `89fae4826` (fallback (b)), the value.js re-emissions `9c1bf596` and `a2a50158`, the three records, the paragraph above. Each is read below; the gates are re-measured by this seat on the final bytes.

1. **Classification (L-10) — bbnf-lang `d08694061`** (inherited; read whole). `typescript/src/analysis/bulk.ts` `bulkTextRuns(rules)`: a single-class run is bulk text when its rule is a block's body (`"{" >> r << "}"`, `"(" , r , ")"`) or sits beside a block in a sequence — computed from the grammar AST only, no input, no engine. `emit.ts`: a run in `bulkLeaves` is one sticky scan `new RegExp(cls + "+", flags + "y")`; the audit build re-runs it as spelt (`AUDIT.check(..., "bulk /…/ in rule")`). Test `typescript/test/bulk.test.ts:38` names value.js's rules: ⟨`grep -n 'bulk.has\|toEqual(\["balanced' test/bulk.test.ts`⟩ → `blockBody` · `textBody` · `balanced` · `preludeRun` · `ruleGap`, and `[...bulk].sort()` = `["balanced","blockBody","preludeRun","ruleGap","textBody"]` (exactly five). Classification gate: ⟨`grep -rniE bulk ../bbnf-lang-x-p-w7-typescript/typescript/src | wc -l`⟩ → `0` BEFORE → `20` AFTER. **GREEN.**
2. **Re-emission — value.js `9c1bf596`** (inherited) through `node scripts/gen-grammar.mjs` on the linked emitter.
3. **The static form measured RED on SpiderMonkey (the (b) trigger), inherited records:**

| record (static form, product bytes of `9c1bf596`) | load | Firefox rej parseStylesheet | Firefox large | WebKit rej / large | Chromium rej / large |
|---|---|---|---|---|---|
| `2026-09-24-x-p-w7-browser-l2-probe.json` (1 rep, clean) | 36.4 | **1.084** | **1.022** | .759 / .562 | .592 / .360 |
| `2026-09-24-x-p-w7-browser-l2-static-r1.json` (2 reps, all classes) | 45 → 143 | all 8 attempts set aside (1.00–1.39) | **1.128** clean (+4 SA 1.09/1.024/1.00/.969) | .769,.719 / .567,.545 | .557,.538 / .370,.358 |

   The static form moves Firefox large from 1.316/1.279 (baseline) to 1.022–1.128 and leaves rej at 1.08 — still above the retired parser **by measurement**; static-r1 also reads Firefox rej `parseCssValue` 1.049 and `parseCssValues` .967/1.087 clean. `2026-09-24-x-p-w7-profile-l2-p1.json` (per-rule profile, Firefox + Chromium, rej/large) banks where the remainder sits. Per ADDENDUM (c) the fallback (b) therefore applies.
4. **Fallback (b), uniform — bbnf-lang `89fae4826`** (inherited; read whole): `emit.ts` scans a run by sticky regex when `bulkLeaves.has(e) || run.cls.source.startsWith("[^")` — every negated class run, wherever it stands; positive-class token runs keep the code-unit loop; the audit build re-runs each scan as spelt. It is the negated-run half of `bench/records/2026-09-24-x-p-w7-l-levers/negated-run-regex+defer.diff` only (no deferred-text half). The test pins it (`[^,\"]+` sticky; `/[a-z]+/` stays a loop). One module, every engine: no length test, no engine test (L-9). **Pushed** (branch = origin). Re-emission **value.js `a2a50158`**.
5. **Stay-GREEN on the final bytes (bbnf-lang `89fae4826`, value.js `a2a50158`), read by this seat.** Emitter rebuilt in the worktree (⟨`npm run build`⟩ → `✓ built`; tree clean after).
   - ⟨`node scripts/gen-grammar.mjs --check`⟩ → `grammar.js is current (sha256 777f0045…)`, exit 0; ⟨`node scripts/gen-grammar.mjs`⟩ ×2 → exit 0, `git status --porcelain src/css/bbnf/generated | wc -l` → `0` both, file sha256 `fb71e404…` both. **GREEN (deterministic ×2).**
   - L-G3 ⟨`grep -rln "instrument\|__prof\|PC\[\|NOW()" src/css/bbnf/generated | wc -l`⟩ → `0`; ⟨`node bench/paired/instrument.mjs`⟩ → `{"plainEqualsShipped":true,…,"shippedInstrumentTokens":[],"instrumentedTokens":6}`. **GREEN (L-8).** K2-b ⟨`grep -rn deepFreeze src | wc -l`⟩ → `0`. **GREEN.** Scan surface: ⟨`grep -c charCodeAt …/grammar.js`⟩ `225` → `208`; ⟨`grep -c '"y")' …/grammar.js`⟩ → `47`.
   - bbnf-lang ⟨`npx vitest run`⟩ ×2 → `Test Files 20 passed (20) · Tests 292 passed (292)` both; ⟨`npx tsc --noEmit`⟩ → 0. **GREEN (E-1/E-3/E-5).**
   - E-2 (G-audit) on the final emitter — banked driver `bench/paired/audit.mjs` (new; the audit build of value.js's grammar through the linked emitter, every rule at offset 0 over the 29,944 sources + the 4 large sheets, recognize-vs-value on every rule): ⟨`node bench/paired/audit.mjs`⟩ → `rules 160 · checks 200082572 · violations 0 · samples [] · modeCalls 4791680 · modeDiffs 0`. **GREEN.**
   - E-6 ⟨`npx esbuild --minify src/css/bbnf/generated/grammar.js | wc -c`⟩ → `89097`; `| gzip | wc -c` → `12617` (was 94,065 / 12,895; ceilings 125,646 / 14,517). **GREEN.**
   - L-G2 / V-1 ⟨`node bench/paired/build.mjs`⟩ (arms rebuilt at `a414d7d8`, `srcDirty ""`, banked 79/79) then ⟨`node bench/paired/equiv.mjs product <scratch>`⟩ ×2 → `compared 1376531/1376531 rows · mismatches 88 (ASCII-only sources 0)` both, split `parseCssValue 4 · parseCssValues 4 · functionParam 11 · splitTopLevel(,) 13 · (;) 11 · (space) 45` = F-b-4. **GREEN ×2.**
   - ⟨`npm run -s test:css-equivalence`⟩ → `Tests 19 passed (19)`; ⟨`grep -oE 'MIRROR-DEFECTS [0-9]+' | sort | uniq -c`⟩ → `31 MIRROR-DEFECTS 0`. ⟨`npx vitest run test/css`⟩ → `5 passed · 58 passed`. **GREEN.**
   - ⟨`npx vue-tsc -p tsconfig.{lib,demo,test}.json --noEmit`⟩ → 0/0/0. **GREEN.**
   - ⟨`npx vitest run`⟩ → `Tests 4 failed | 931 passed | 8 skipped (943)`; failures all foreign to `/css` and the parser: `spectrum-luma` C-5 BORN-RED · `reka-binding-idiom` NG-6 · `demo/test/export/byte-exact` · `demo/test/generate/generate-rail` EC-10 (+ 2 demo suites that fail to load: `palette-card-layout`, `plate-mass`) — sibling tracks' demo work, no CSS path. **GREEN (foreign only).**
   - L-6 ⟨`git diff HEAD --stat -- package.json package-lock.json`⟩ → empty. **Held.**
6. **L-G1 on the final bytes (fallback (b) shipped), load recorded** (`bench/paired/browser.mjs`: Firefox 150.0.2 · WebKit 26.4 · Chromium 148.0.7778.96; `bench/paired/isolated.mjs` for node). Sibling tracks' Playwright/e2e fleets held load at 47–211 through the whole sitting (⟨`ps -Ao pcpu,comm -r | head`⟩ at 22:22 → sibling `chrome-headless-shell`/`Google Chrome for Testing`/`WebKit.WebContent` processes on top); **no quiesced window came**, so the hygiene rule voided many cells, each counted below and none claimed.

| record | load start → end | Firefox | WebKit | Chromium |
|---|---|---|---|---|
| `…-browser-l2-final-r1.json` (all 7 × whole/acc/rej + large, 2 reps) | 172.4 → 182.0 | 12 GREEN · **2 RED clean** (whole `parseStylesheet` **1.069**, rej `parseCssValue` **1.03**) · 8 voided | **22/22 GREEN** | **22/22 GREEN** |
| `…-browser-l2-final-r2.json` (WebKit + Chromium, all cells) | 47.0 → 95.0 | — | **22/22 GREEN** | **22/22 GREEN** |
| `…-browser-l2-final-ff-r2.json` (Firefox re-read: 4 entries × whole/rej/large) | 136.3 → 49.7 | 3 GREEN · **2 RED clean** (rej `parseCssValue` **1.051**, large `parseStylesheet` **1.123**, 0/11 rounds below 1) · 4 voided | — | — |
| `…-browser-l2-final-ff-r3.json` (**quiesced** re-read: `parseStylesheet`, `parseCssValue` × whole/rej/large) | 23.4 → 21.0 | whole `parseStylesheet` .931/.939 · whole/rej `parseCssValue` GREEN · **RED clean: rej `parseStylesheet` 1.017/1.078, large 1.033/1.127** · 0 voided | — | — |
| `…-browser-l2-final-ff-r4.json` (**quiesced**, all 7 × whole/acc/rej + large) | 20.1 → 12.9 | **19/22 GREEN · RED clean: rej `parseStylesheet` 1.039/1.051, large 1.043 (.946 the other rep), rej `parseCssValue` 1.014 (.96 the other rep)** · 0 voided | — | — |

   Every Firefox cell voided under load in r1/ff-r2 is re-read quiesced in ff-r4 (0 voided). Under load, whole `parseStylesheet` (1.069) and rej `parseCssValue` (1.03/1.051) read RED; quiesced, whole `parseStylesheet` is GREEN (.931/.939) and rej `parseCssValue` sits at noise distance (.913/.985 · .96/1.014). **Quiesced, the RED that stands is exactly §0di's two cells: Firefox rej and large `parseStylesheet`.** The watch cells (b) was ruled to cost: Chromium rej / large `parseStylesheet` `.586/.563 · .599/.594` / `.355/.369 · .368/.350` (baseline `.529/.539` / `.352/.352`, i.e. ×1.06–1.11 on rej, flat on large); WebKit `.760/.741 · .759/.725` / `.567/.586 · .567/.567` (baseline `.75/.74` / `.571/.581`, flat) — all far below 1, as ADDENDUM (c) accepted.

   **node (V8), `isolated.mjs`, 3 reps × 11 rounds:** `2026-09-23-x-p-w7-l2-final-node-r1.json` (load 116.1 → 127.6) 17 cells GREEN, 0 RED, 5 voided (whole/rej `parseCssScalar`, acc/rej `parseCssValues`, acc `parseKeyframeSelector`; every set-aside reading ≤ .76) · `…-node-r2.json` (95.0 → 27.3) **22/22 GREEN, 0 voided**, whole-7/7 GREEN · `…-node-r3.json` (quiesced re-read of r1's 5 voided cells, 14.9 → 16.3) **9/9 GREEN** (`parseCssScalar` whole .558/.556/.576 · rej .574/.624/.586; `parseCssValues` acc .304/.305/.298 · rej .5/.476/.458; `parseKeyframeSelector` acc .583/.584/.591). **node GREEN ×2.** (The files carry `2026-09-23` in their name: `isolated.mjs`'s own naming, unchanged.)

   **L-G1 verdict:** node ×2 GREEN · Chromium 22/22 ×2 GREEN · WebKit 22/22 ×2 GREEN · **Firefox RED on rej and large `parseStylesheet` ×2 quiesced** (19/22 GREEN in ff-r4). **RED.**

**Lever table — Firefox `parseStylesheet`, clean paired medians (retired = 1.00):**

| form | bytes | rej | large | source |
|---|---|---|---|---|
| baseline (`.l`) | `d81016e96` / `4ffbe7de` | 1.184 / 1.103 | 1.316 / 1.279 | RESUME 4 Baseline |
| (a) static bulk-text | `d08694061` / `9c1bf596` | **1.084** | **1.022** · **1.128** | l2-probe · l2-static-r1 |
| (a) + (b) uniform negated runs — **shipped** | `89fae4826` / `a2a50158` | **1.017 / 1.078 · 1.039 / 1.051** | **1.123** · **1.033 / 1.127** · **.946 / 1.043** | l2-final-ff-r2 · ff-r3 · ff-r4 |

   **Which form shipped, and why:** (a) + (b). (a) alone left Firefox rej and large above 1 by measurement (act 3); ADDENDUM (c) makes (b) the fallback in that case, and (b) is kept because it removes the code-unit loops the ruling named (the class runs are no longer the cause: see the profile below) at the accepted ×1.06–1.11 on Chromium rej. It does not make Firefox GREEN.
7. **Per-rule profile of the shipped form** (`bench/paired/instrument.mjs` on `89fae4826` — `plainEqualsShipped: true` — then ⟨`node bench/paired/profile.mjs l2-b firefox,chromium parseStylesheet:large,parseStylesheet:rej,parseCssValue:rej 3`⟩ → `bench/records/2026-09-24-x-p-w7-profile-l2-b.json`; counts identical on both engines; times inclusive, rank-only, ms per pass):

| cell | engine | wall | actions | `ruleList` (the stylesheet layer, where the class runs live) | `valueTop` (declaration values) |
|---|---|---|---|---|---|
| large `parseStylesheet` | Firefox | 61 | **18.3** | 16.0 | **25.0** |
| | Chromium | 32.7 | 4.3 | 12.4 | 9.7 |
| rej `parseStylesheet` | Firefox | 194 | **42.3** | 85.3 | **49.3** |
| | Chromium | 178.5 | 24.4 | 103.1 | 37.6 |
| rej `parseCssValue` | Firefox | 328.7 | **109.3** | — | 310.7 |
| | Chromium | 200.4 | 31.7 | — | 196.5 |

   **Reading.** The cause §0di ruled on is gone: SpiderMonkey's stylesheet layer (`ruleList`, the bulk and negated class runs) is now at 1.3× Chromium on large sheets and *below* Chromium on the rejected corpus. What keeps Firefox above the retired parser is elsewhere: the value grammar under `valueTop` (2.6× Chromium on large sheets) and value.js's actions (4.2× on large, 3.4× on rej `parseCssValue`; top actions `identTerm` 34.7 ms · `badTerm` 20 · `operator` 11.7 · `commaList` 8.3 per pass on rej `parseCssValue`; `spaceList` · `hex` · `identTerm` on large sheets). The rej `parseCssValue` cell (1.03 / 1.051 clean) never involved the class runs, and was already 1.035/1.024/1.056 at `.l`'s close (`2026-09-24-x-p-w7-browser-l-final-r{1,2}.json`) — ADDENDUM (b)'s "at noise distance" row, not named in §0di's remaining-RED list.

**ESCALATION ESC-W7l2-1 (to the owner, via the orchestrator; ADDENDUM (b): "a cause it cannot cure … returns ESCALATED with the per-rule profile").** ADDENDUM (c)'s two admitted forms are both built, measured and shipped ((a) static classification + (b) uniform negated runs); quiesced, Firefox stays above the retired parser on clean cells in rej `parseStylesheet` (1.017/1.078 · 1.039/1.051) and large `parseStylesheet` (1.033/1.127 · .946/1.043), down from 1.184/1.103 and 1.316/1.279 at open; rej `parseCssValue` reads at noise distance (.913/.985 · .96/1.014; 1.03/1.051 under load). The remainder is SpiderMonkey's cost in the value grammar path and in value.js's action bodies (object construction on the success path; the profile above), a cause outside `.l2`'s grant (`analysis/**` + `emit.ts` class-run emission). No further lever is admitted to this unit; no engine split, no length test, no relief was applied. The owner's measured decision: a unit on the action/value-grammar cost under SpiderMonkey (the grant would be value.js `src/css/bbnf/actions*` + the emitter's value-mode construction), or a ruling on the Firefox cells.
8. **Tooling restored (L-4).** ⟨`rm node_modules/@mkbabb/bbnf-lang && mv node_modules/@mkbabb/.bbnf-lang-0.1.4-aside-l2 node_modules/@mkbabb/bbnf-lang`⟩ (the link only; the worktree intact, ⟨`git -C ../bbnf-lang-x-p-w7-typescript status --porcelain | wc -l`⟩ → `0`); ⟨`grep '"version"' node_modules/@mkbabb/bbnf-lang/package.json`⟩ → `0.1.4`. bbnf-lang: branch only (`89fae4826` = `origin/x-p-w7-typescript`), local master untouched, PR #1 open. No `npm publish`, no version bump (L-6).

**Commits.** bbnf-lang `d08694061` (classification + static emission + tests; pushed) · `89fae4826` (fallback (b), uniform; pushed) — value.js `9c1bf596` (re-emission on `d08694061`) · `a2a50158` (re-emission on `89fae4826`) · `94dc825b` (records + `bench/paired/audit.mjs`) · this record's commit. Families whole (L-10 family = one bbnf-lang commit + one re-emission; (b) = its own pair).

**Gate readings BEFORE → AFTER.** Classification test `0` → `20` `bulk` hits, test names the 5 rules — **GREEN** · L-G1 Firefox rej `parseStylesheet` 1.184/1.103 → 1.017/1.078 · 1.039/1.051 (quiesced) — **RED** · L-G1 Firefox large 1.316/1.279 → 1.033/1.127 · .946/1.043 — **RED** · L-G1 node / Chromium / WebKit — **GREEN ×2** · L-G2 88 = F-b-4 ×2 — **GREEN** · L-G3 0 — **GREEN** · css-equiv 19/19, MIRROR-DEFECTS 0 — **GREEN** · test/css 58/58 — **GREEN** · `npm test` foreign-only — **GREEN** · vue-tsc 0/0/0 — **GREEN** · `gen-grammar --check` 0 + deterministic ×2 — **GREEN** · K2-b 0 — **GREEN** · E-1/E-3/E-5 292/292 ×2 + tsc 0, E-2 0 violations, E-6 89,097 / 12,617 — **GREEN** · whole-7/7 (node r2) — **GREEN**.

**Residuals.** ESC-W7l2-1 (above): Firefox rej and large `parseStylesheet`, caused by SpiderMonkey's value-grammar and action cost, outside `.l2`'s grant. Firefox rej `parseCssValue` at noise distance (one rep 1.014 quiesced).

**Adjacent edits: none. Out-of-set writes: none.** Status: **ESCALATED** (every stay-GREEN gate GREEN; L-G1 RED on Firefox's two §0di cells only).

## RESUME 4 Close (2026-09-24, close seat `claude-opus-5-5`, Track D; verify-only, cures nothing)

**Open.** Spec read whole (W7.md, 253 lines; ADDENDUM (c) at `:231` and ADDENDUM (d) at `:249` bind). From this record: header, `## RESUME 4 — Open` through `## RESUME 4 Unit plan`, and the `.l2` receipt (the last section). Every earlier section stands (E-3). **Crash-recovery:** ⟨`git status --porcelain -- src bench test scripts/gen-grammar.mjs docs/tranches/X/execution/D docs/tranches/X/execution/LEDGER.md package.json package-lock.json`⟩ → empty; ⟨`git -C ../bbnf-lang-x-p-w7-typescript status -sb`⟩ → `## x-p-w7-typescript...origin/x-p-w7-typescript`, clean; ⟨`git rev-parse HEAD origin/x-p-w7-typescript`⟩ → `89fae4826…` both. parse-that master's dirty `rust/**`, `README.md`, `.cargo/config.toml` are outside every W7 set (siblings'; untouched). **No inherited partial work.**

### Act 1: commit roster, and whether `.l2` stayed in its writable set
⟨`git show --stat --format= <c>`⟩ per commit:

| Commit | Paths touched | In set? |
|---|---|---|
| bbnf-lang `d08694061` (static classification + emission) | `typescript/src/analysis/{bulk,index}.ts`, `typescript/src/emit.ts`, `typescript/test/bulk.test.ts` | yes (`typescript/**`; L-10 family whole) |
| bbnf-lang `89fae4826` (fallback (b), uniform; = origin) | `typescript/src/emit.ts`, `typescript/test/bulk.test.ts` | yes |
| value.js `9c1bf596` (re-emission on `d08694061`) | `src/css/bbnf/generated/grammar.{js,d.ts}` | yes (via `gen-grammar.mjs`) |
| value.js `a2a50158` (re-emission on `89fae4826`) | `src/css/bbnf/generated/grammar.{js,d.ts}` | yes |
| value.js `94dc825b` (records + `bench/paired/audit.mjs`) | 13 paths under `bench/` | yes (`bench/**`) |
| value.js `c418c907` (receipt) | this record | yes |

**Landed wrong: none.** No `package.json`/lockfile, `ci.yml`, `rust/**`, bbnf-lang master, PR #1 or `scripts/dev/dev.sh` path in any commit. ⟨`git log --oneline c418c907..HEAD`⟩ at open → empty (no later W7 commit).
**Receipt wording (not a landed-wrong):** the receipt's "0 → 20 `bulk` hits in `analysis/`" is the baseline command's count over `typescript/src` (⟨`grep -rniE bulk typescript/src | wc -l`⟩ → `20`); under `src/analysis` alone it is `10` (`bulk.ts`, `index.ts`; the other 10 are in `emit.ts`). The property and its test stand either way.

### Act 2: the gates re-read by this seat (RESUME rule: the gates `.l2` turns plus stay-GREEN; older unit gates cited from `## Check 3`)

**Correctness, gates and size** (final bytes: bbnf-lang `89fae4826`, value.js `a2a50158`).
- Classification (L-10) ⟨`grep -rniE bulk typescript/src | wc -l`⟩ → `20` (baseline `0`); ⟨`grep -n 'toEqual' test/bulk.test.ts`⟩ → `:48` `["balanced","blockBody","preludeRun","ruleGap","textBody"]`, `:51` token runs `["argRun","colonRun","commaRun","semiRun","spaceRun"]`. **GREEN.**
- L-G2 / V-1 ⟨`node bench/paired/build.mjs`⟩ → `valuejsHead c418c907`, `srcDirty ""`, `bankedManifestOk 79/79`; ⟨`node bench/paired/equiv.mjs product <scratch>`⟩ ×2 → `compared 1376531/1376531 rows · mismatches 88 (ASCII-only sources 0)` both (= F-b-4). **GREEN ×2.**
- L-G3 ⟨`grep -rln "instrument\|__prof\|PC\[\|NOW()" src/css/bbnf/generated | wc -l`⟩ → `0`; ⟨`node bench/paired/instrument.mjs`⟩ (emitter linked) → `"plainEqualsShipped":true`, `"shippedInstrumentTokens":[]`. **GREEN.**
- K2-b ⟨`grep -rn deepFreeze src | wc -l`⟩ → `0`; V-8 greps (`GRAMMAR_MODULES|new ParserState|reset()` outside `generated/`; `[xX]` inside `/…/i`) → `0` · `0`. **GREEN.**
- E-4 ⟨`node scripts/gen-grammar.mjs --check`⟩ ×2 with `node_modules/@mkbabb/bbnf-lang` linked to the worktree (rebuilt, `npm run build` exit 0, worktree clean after) → `grammar.js is current (sha256 777f0045…)` both; a regeneration leaves ⟨`git status --porcelain src/css/bbnf/generated | wc -l`⟩ → `0`. Link removed, 0.1.4 restored (⟨`grep '"version"'`⟩ → `0.1.4`). **GREEN.**
- E-2 ⟨`node bench/paired/audit.mjs`⟩ (the banked driver, linked emitter) → `rules 160 · checks 200082572 · violations 0 · modeCalls 4791680 · modeDiffs 0`. **GREEN.**
- E-1/E-3/E-5 ⟨`npx vitest run`⟩ ×2 in the worktree → `Test Files 20 passed (20) · Tests 292 passed (292)` both; ⟨`npx tsc --noEmit -p .`⟩ → 0. **GREEN.**
- E-6 ⟨`npx esbuild --minify src/css/bbnf/generated/grammar.js | wc -c`⟩ → `89097`; `| gzip | wc -c` → `12617` (ceilings 125,646 / 14,517). **GREEN.**
- ⟨`npm run -s test:css-equivalence`⟩ → `Tests 19 passed (19)`, `26× MIRROR-DEFECTS 0` (the line count varies with the suite's output; no non-zero line). ⟨`npx vitest run test/css`⟩ → `5 passed · 58 passed`. **GREEN.**
- ⟨`npx vue-tsc -p tsconfig.{lib,demo,test}.json --noEmit`⟩ → `0 · 0 · 0`. **GREEN.**
- ⟨`npx vitest run`⟩ → `Tests 2 failed | 941 passed (943)`: `spectrum-luma` C-5 BORN-RED and `reka-binding-idiom` NG-6, the foreign pair. **GREEN** (0 CSS failures).
- L-6 ⟨`git diff HEAD --stat -- package.json package-lock.json`⟩ → empty. **Held.**

**Timing.** Load was quiesced for the whole sitting (9–16; sibling fleets idle), recorded in every log. Records moved to scratchpad `w7l2close/` (`l2close-r{1,2}`, `l2close-node-r{1,2}`, logs); ⟨`git status --porcelain bench | wc -l`⟩ → `0`. Firefox 150.0.2 · WebKit 26.4 · Chromium 148.0.7778.96 (the `.l2` pins).
- **browsers, read 1** ⟨`node bench/paired/browser.mjs l2close-r1 firefox,webkit,chromium 2 whole,acc,rej,large 11 product`⟩ (load `11.68` → `9.39`; 5 set-aside cells, every one with a clean sibling rep, all < 1):
  - Chromium 22/22 rows < 1 in both reps (rej parseStylesheet **.529 / .523**; large .341 / .343). ⟨`grep -E '^product (webkit|chromium)' | grep -vc '<1'`⟩ → `0`.
  - WebKit 22/22 (rej parseStylesheet .75 / .75; large .568 / .564).
  - Firefox 19/22: clean RED **rej parseStylesheet 1.035 / 1.034** (3/11 rounds below 1) · rej parseCssValue **1.009** / .92 · rej parseCssValues **1.034** / .913. **large parseStylesheet .956 / .995** · whole parseStylesheet .946 / .914 · acc parseStylesheet .785 / .772.
- **browsers, read 2** ⟨same, tag `l2close-r2`⟩ (load `8.96` → `9.84`; 0 set aside): Chromium 22/22 (rej .522 / .533; large .329 / .335) · WebKit 22/22 (rej .771 / .758; large .571 / .611) · Firefox **21/22**: clean RED **rej parseStylesheet 1.029 / 1.01** only; large **.932 / .979**; whole parseStylesheet .96 / .925; rej parseCssValue .912 / .916; rej parseCssValues .905 / .893.
- **node, read 1** ⟨`node --expose-gc bench/paired/isolated.mjs l2close-node-r1 product 3 11 whole,acc,rej,large`⟩ (load `9.21` → `9.48`): whole medians color .613 · scalar .538 · value .374 · values .377 · keyframe .67 · timing .63 · stylesheet .588 (ceilings .90/.81/.57/.58/.78/.87/.85); acc keyframe .588; rej stylesheet .558; large .383. `whole-7/7`, `accepted-7/7`, `rejected-7/7` all `GREEN` (1 cell set aside, rej parseCssValue rep x0.476 at spread 1.687, reported; 3 clean reps .41–.45).
- **node, read 2** ⟨same, tag `l2close-node-r2`⟩ (load `9.36` → `8.83`): whole .605 · .531 · .362 · .368 · .683 · .609 · .547; acc keyframe .584; rej stylesheet .557; large .374. All three 7/7 verdicts `GREEN` (5 set-aside reps in rej parseCssValues / parseStylesheet, every one < 1, reported).
- **Reading.** On quiet load, the RED that stands on Firefox is **rej parseStylesheet** (1.01–1.035, four clean reps, two reads). **Firefox large parseStylesheet reads below 1 in all four of this seat's reps (.932–.995)**, but only by .005–.07, and the `.l2` receipt read it 1.033 / 1.127 (ff-r3) and 1.043 (ff-r4) quiesced; this seat does not call it closed (noise distance, R-l2-2). Firefox rej parseCssValue/Values read 1.009 / 1.034 in one rep of read 1 and .89–.92 in all others (noise distance, as at `.l`'s close). The Chromium cost the receipt charged to (b) (rej ×1.06–1.11) is not reproduced on quiet load: .522–.533 against the RESUME 4 baseline .529 / .539.

### Acts 3 and 4: verification artefacts and E13
- The spec names no Verification Artefacts clause beyond its gates. This seat's paired records are in scratchpad `w7l2close/`; `.l2`'s banked records (`94dc825b`: `browser-l2-{probe,static-r1,final-r1,final-r2,final-ff-r2..r4}`, `l2-final-node-r1..r3`, `profile-l2-{p1,b}`, `bench/paired/audit.mjs`) stand as the records of record.
- E13 ⟨`find <p> -maxdepth 1 -type f -newer INBOX.md`⟩ over value.js `V/` + `V/coordination/`, glass `BK/coordination/` + `BL/` (⟨`ls -td glass-ui/docs/tranches/B*/ | head -3`⟩ → `BL BK BJ`), keyframes.js `V/coordination/`, atlas `P/coordination/` → **0** files on every path. ⟨`grep -cE '\| *UNREAD *\|' INBOX.md`⟩ → `0`. **0 UNREAD in scope.**

### Gate table, BEFORE → AFTER (BEFORE = RESUME 4 Baseline; AFTER = this seat's two reads)

| Gate | BEFORE | AFTER (this seat) | Verdict |
|---|---|---|---|
| `.l2` classification property | 0 hits | 20 (src), test names the 5 bulk + 5 token rules | **GREEN** |
| L-G1 Firefox rej parseStylesheet | 1.184 / 1.103 | **1.035 / 1.034 · 1.029 / 1.01** | **RED ×2** (at 1.01–1.04) |
| L-G1 Firefox large parseStylesheet | 1.316 / 1.279 | .956 / .995 · .932 / .979 (receipt, quiesced: 1.033 / 1.127 · .946 / 1.043) | GREEN here ×2; noise distance across seats |
| L-G1 Firefox rej parseCssValue / Values | noise distance | 1.009 / .92 · 1.034 / .913 (r1); .912 / .916 · .905 / .893 (r2) | noise distance (one rep each > 1) |
| L-G1 Firefox, other 17 rows | GREEN (`.g`) | < 1 in both reads | **GREEN ×2** |
| L-G1 WebKit 22 rows | GREEN | 22/22 < 1, both reads (large .56–.61) | **GREEN ×2** |
| L-G1 Chromium 22 rows | GREEN (rej .529/.539) | 22/22 < 1, both reads (rej .52–.53, large .33–.34) | **GREEN ×2** |
| L-G1 node whole/acc/rej/large | GREEN | 7/7 · 7/7 · 7/7 · large .383 / .374, both reads | **GREEN ×2** |
| whole-7/7 inside ceilings | GREEN | keyframe .67 / .683 (.78) · stylesheet .588 / .547 (.85) | **GREEN ×2** |
| L-G2 V-1 | 88 = F-b-4 | 88 = F-b-4 ×2 | **GREEN ×2** |
| L-G3 | 0 | 0; `plainEqualsShipped true` | **GREEN** |
| stay-GREEN: css-equiv · test/css · npm test · vue-tsc · `--check` · K2-b · V-8 | GREEN | 19/19, MIRROR-DEFECTS 0 · 58/58 · 941/943 (foreign pair) · 0/0/0 · current ×2 (linked) · 0 · 0 | **GREEN** |
| E-1/E-3/E-5 · E-2 · E-6 | GREEN | 292/292 ×2, tsc 0 · 200,082,572 checks, 0 violations, 0 modeDiffs · 89,097 / 12,617 B | **GREEN** |
| P-6 · E-8 · V-9 + CI step · Z-1 · Z-3 publish half | relieved | relieved by citation to X.P.W7P (§0cp 1), GATE-KEYED on the owner's OTP | **relieved → X.P.W7P** |
| `.cp` (ADDENDUM (d): custom-property case, easing presets) | not in the RESUME 4 plan | not dispatched: ⟨`git log --all --grep='W7.cp'`⟩ → 0; no `.cp` receipt | **OWED** |

### Residuals (named owners)
- **R-l2-1: Firefox (SpiderMonkey) rej parseStylesheet** stays above the retired parser, 1.01–1.035 on quiet load in all four of this seat's reps (1.017–1.078 in the receipt). The per-rule profile (`profile-l2-b.json`) places the remainder in the value grammar under `valueTop` and in value.js's action bodies, not in the class runs §0di ruled on. Owner: **the owner, via ESC-W7l2-1**.
- **R-l2-2: Firefox large parseStylesheet and rej parseCssValue/Values sit at noise distance.** Large reads .93–.995 here and 1.03–1.13 in the receipt; rej parseCssValue/Values reads 1.009 / 1.034 in one rep and ≤ .92 in the rest. Neither is claimed closed. Owner: the unit that executes ESC-W7l2-1's ruling, which re-reads them.
- **R-l2-3: `.cp` owed** (ADDENDUM (d), COHESION §0dj): custom-property names lowercased (css-variables-1 §2), and easing presets' descriptions and bounce curves missing in 4.x. ADDENDUM (d) places it after `.l2`, but the RESUME 4 plan did not list it and no seat has run it. Owner: **the next Track D RESUME of X.P.W7 (`[X.P.W7.cp]`)**.
- **The release chain:** P-6, E-8, V-9 and its CI step, Z-1, Z-3's publish half, `--check` on the installed pin, the bbnf-lang PR #1 merge. Owner: X.P.W7P, GATE-KEYED on the owner's npm one-time password.
- **Foreign test rows** (not W7's): `spectrum-luma` C-5 BORN-RED, `reka-binding-idiom` NG-6. Owners: their Track A/B units.

### Escalations
- **ESC-W7l2-1** (the `.l2` receipt) is carried open, confirmed by this seat's reads: both forms that ADDENDUM (c) admits are shipped, and Firefox rej parseStylesheet stays RED. The owner's choice: open a unit on the action and value-mode construction cost under SpiderMonkey (value.js's `src/css/bbnf` actions plus the emitter's value-mode construction), or rule on the Firefox cells. ⟨`grep -n ESC-W7l2-1 COHESION.md`⟩ → 0 hits (unruled).
- **ESC-W7p-1 / e-1 / v-1 / z-1** stay with X.P.W7P.
- This seat raises no new escalation. **Adjacent edits: none. Out-of-set writes: none.** `scripts/dev/dev.sh` untouched.

### Four-verb line
W7.md has no §State clause and designates no seat to stamp a verb. ADDENDUM (c) binds L-G1 on every engine, and Firefox rej parseStylesheet reads RED twice here. ADDENDUM (d)'s `.cp` is also owed. X.P.W7 is therefore **not IMPLEMENTED**: it stays **PARTIAL**, and VERIFIED is not stamped. It moves to IMPLEMENTED once ESC-W7l2-1 is ruled and executed and `.cp` lands.

**Verdict: PARTIAL.** `.l2` delivered the static bulk-text classification and the uniform negated-run scan, both in set, with every stay-GREEN gate GREEN. Chromium, WebKit and node are below the retired parser on every cell, twice. Firefox is below it on 21 of 22 rows in read 2, and rej parseStylesheet stays RED at 1.01–1.04.

**Commits (this seat):** this RESUME 4 Close, plus the LEDGER row cell.

## Check 1 of the RESUME 4 Close (2026-09-24, L-20 fresh adversarial pass 1, `claude-opus-5-5`, Track D; verify-only, cures nothing)

**Read:** W7.md whole (253 lines; ADDENDA (b) `:216`, (c) `:231`, (d) `:249` bind); from this record the `## RESUME 4 — Open` through `## RESUME 4 Unit receipts` (`.l2`) and `## RESUME 4 Close`. **Crash-recovery:** ⟨`git status --porcelain -- src bench test docs/tranches/X/execution/D docs/tranches/X/execution/LEDGER.md package.json`⟩ → empty; bbnf-lang worktree clean, ⟨`git rev-parse HEAD origin/x-p-w7-typescript`⟩ → `89fae4826…` both. Load at open `8.56 10.64 23.12` (quiet).

### Axes
1. **Claimed GREENs reproduce (15 re-run by this seat):** ⟨`node bench/paired/build.mjs`⟩ → `srcDirty ""`, `bankedManifestOk 79/79`, HEAD `13106615`; ⟨`node bench/paired/equiv.mjs product <scratch>`⟩ ×2 → `1376531/1376531 rows · mismatches 88 (ASCII-only sources 0)` both, split = F-b-4 (4·4·11·13·11·45); ⟨`npm run -s test:css-equivalence`⟩ → `Tests 19 passed (19)`, `24× MIRROR-DEFECTS 0` (no non-zero line); ⟨`npx vitest run test/css`⟩ → `5 passed · 58 passed`; ⟨`npx vue-tsc -p tsconfig.{lib,demo,test}.json --noEmit`⟩ → `0 · 0 · 0`; bbnf-lang ⟨`npx vitest run`⟩ → `20 passed · 292 passed`, ⟨`npx tsc --noEmit -p .`⟩ → 0; classification ⟨`grep -rniE bulk typescript/src | wc -l`⟩ → `20`, `test/bulk.test.ts:48` names the 5 bulk rules, `:51` the 5 token rules; L-G3 ⟨`grep -rln "instrument\|__prof\|PC\[\|NOW()" src/css/bbnf/generated | wc -l`⟩ → `0`; K2-b `deepFreeze` → `0`; V-8 (`GRAMMAR_MODULES|new ParserState|reset()` outside `generated/`) → `0`; E-6 ⟨`npx esbuild --minify …/grammar.js | wc -c`⟩ → `89097`, gzip `12617`; L-6 `package.json` diff empty, installed bbnf-lang `0.1.4` (restored). Timing ⟨`node bench/paired/browser.mjs w7chk1 firefox,webkit,chromium 2 rej,large 11 product parseStylesheet`⟩ (load 7.89 → 7.63; record moved to scratchpad `w7chk/`, ⟨`git status --porcelain bench | wc -l`⟩ → 0): WebKit rej **.765 / .75**, large **.571 / .588**; Chromium rej **.529 / .532**, large **.325 / .32**; Firefox large **.918 / .932** (11/11, 9/11 rounds < 1); **Firefox rej `parseStylesheet` RED x1.009 / x1.01** (1/11, 2/11 rounds < 1) — the close's RED reproduces. Not re-run (cited from the close's two quiet reads): node isolated cells, the Firefox 17 other rows, E-2 audit, `gen-grammar --check` (needs the emitter linked).
2. **File bounds:** ⟨`git show --stat --format=`⟩ `9c1bf596` / `a2a50158` → `src/css/bbnf/generated/grammar.{js,d.ts}` only; `94dc825b` → 13 paths under `bench/`; `c418c907` → this record; `13106615` → this record + LEDGER (1 line). bbnf-lang `d08694061` → `typescript/src/analysis/{bulk,index}.ts`, `src/emit.ts`, `test/bulk.test.ts`; `89fae4826` → `src/emit.ts`, `test/bulk.test.ts`. All in set. ⟨`git log 4ffbe7de..HEAD -- scripts/dev/dev.sh`⟩ → empty (dirty by standing arrangement, never committed). **Held.**
3. **Masking:** the `89fae4826` diff adds `|| run.cls.source.startsWith("[^")` — a grammar-structural test, no length test, no engine test, no try/catch, no skip; audit build re-runs each scan as spelt (E-2 0 violations banked). **None.**
4. **Families:** L-10 family (bbnf-lang `d08694061` + re-emission `9c1bf596`), (b) its own pair (`89fae4826` + `a2a50158`), records one `bench/**` commit, receipt and close each one commit. **Whole.**
5. **E-3:** ⟨`git diff --stat 4ffbe7de..HEAD -- docs/tranches/X/parse-that/waves/ docs/tranches/V/megatranche/registry/adjudicated/`⟩ → only `W7.md | 23 +` (ADDENDUM (d), orchestrator commit `356a57e8` §0dj; 0 deleted lines). No wave seat touched them. **Held.**
6. **Mail:** ⟨`grep -cE '\| *UNREAD *\|' docs/tranches/V/coordination/INBOX.md`⟩ → `0`. **Clean.**
7. **Four-verb line:** the close holds PARTIAL and stamps nothing; LEDGER:104 reads `PARTIAL — ESC-W7l2-1 + .cp owed`. **Lawful.**
8. **Goal at the bytes:** the spec's goal is "faster than the retired hand parser on every bench entry" on every engine (ADDENDUM (b)/(c): "no relief; no engine split"). Firefox rej `parseStylesheet` reads 1.009–1.035 across six clean reps in two seats. **NOT MET.** ADDENDUM (d)'s `.cp` is not executed: ⟨`git log --all --grep='W7.cp' --oneline`⟩ → empty. **NOT MET.**
9. **Published figures:** 88 = F-b-4, 19/19, 58/58, 292/292, 89,097 / 12,617, the browser cells above — all reproduce at the stated values or within the close's stated range.
10. **Honest-RED adjudication:**
   - **Firefox rej `parseStylesheet`** (L-G1): no relief in the spec. ADDENDUM (c) refuses "record instead of gate" as relief; ADDENDUM (b) routes an uncurable cause to the owner "as a measured decision, never as a quiet relaxation". ESC-W7l2-1 is **unruled**: ⟨`grep -n ESC-W7l2-1 COHESION.md`⟩ → 0 hits. This is an escalation, not a relief the spec names. It is not producer-owned (the cure surface is value.js actions plus the bbnf-lang emitter, both Track D's) and no later wave is routed to it. **Unrelieved RED.**
   - **`.cp`** (ADDENDUM (d)): owed by this wave, "after `.l2`". **Unrelieved.**
   - **Release gates** P-6 · E-8 · V-9 + CI step · Z-1 · Z-3 publish half: relieved by ADDENDUM 2026-09-24 §1 to X.P.W7P (OTP-keyed). **Relieved.**
   - **Firefox large `parseStylesheet`, rej `parseCssValue(s)`:** GREEN in this seat's reads (.918 / .932); at noise distance across seats (R-l2-2). Not a gate failure here.

### Register (severity · claim · receipt · cure)
- **HIGH** · L-G1 (ADDENDA (b)/(c)) is RED on Firefox rej `parseStylesheet`, and the spec gives no relief · this seat x1.009 / x1.01; the close 1.029–1.035 ×4; ESC-W7l2-1 unruled in COHESION · owner rules ESC-W7l2-1 (a unit on SpiderMonkey's action-body and value-mode construction cost, per `profile-l2-b.json`), then a Track D RESUME executes it and re-reads L-G1 ×2 on every engine.
- **HIGH** · ADDENDUM (d) unit `.cp` (custom-property case per css-variables-1 §2; easing presets and bounce curves) is not executed · ⟨`git log --all --grep='W7.cp'`⟩ → empty; no receipt · the next Track D RESUME of X.P.W7 runs `[X.P.W7.cp]` with its pinned tests ×2.
- **INFO** · the close's counts, bounds, families, E-3, mail and four-verb line are accurate; it calls itself PARTIAL, and that matches the bytes.

**Successor conjuncts.** X.P.W7P "Opens when: the owner supplies an npm one-time password … **and** X.P.W7 has CLOSED its engineering gates": the OTP conjunct is not met, and the W7-closed conjunct is RED (the two HIGHs above). **X.P.W7P is lawfully blocked.**

**Verdict: NOT-CONFORMANT.** 15 claimed GREENs reproduce; the gate that fails is L-G1 on Firefox rej `parseStylesheet`, and `.cp` is owed. LEDGER:104 stays `PARTIAL`. **Adjacent edits: none. Out-of-set writes: none.**

## Repair 1 of the RESUME 4 Close (2026-09-24, repair seat round 1, `claude-opus-5-5`, Track D; answers `## Check 1 of the RESUME 4 Close`)

- **Crash recovery:** ⟨`git status --porcelain -- src test bench CHANGELOG.md docs/tranches/X/parse-that`⟩ → empty at open. No inherited partial work. parse-that master's dirty rust/docs paths belong to other programs and were not touched.
- **HIGH 1, L-G1 Firefox rej `parseStylesheet` RED → ESCALATED, not cured.** ⟨`grep -c ESC-W7l2-1 docs/tranches/X/COHESION.md`⟩ → `0`: the owner has not ruled. ADDENDUM (c) already spent both admitted forms: (a) static bulk-run shipped as measured, and (b) uniform negated runs is the shipped fallback. ADDENDUM (b) sends an uncured cause to the owner as a measured decision. The profile is `bench/records/2026-09-24-x-p-w7-profile-l2-b.json`. No repair-seat cure exists inside bounds. Re-read after `.cp` (below): Firefox rej `x0.98 / x1.037` and `x1.04 / x1.01`, the same band as the close. **Stays RED; ESC-W7l2-1 carried to the owner.**
- **HIGH 2, ADDENDUM (d) `.cp` owed → CURED (`[X.P.W7.cp]` executed).**
  1. *Custom-property case.* Reproduced at HEAD `911e08f3`: `parseStylesheet(".a{--MyVar:1;--myvar:2;Color:red}")` gave `--myvar`, `--myvar`, `color`. The one folding site is the `declName` action in `src/css/bbnf/stylesheet.ts` (⟨`grep -rn toLowerCase src/css/bbnf`⟩ gives three hits, and only `declName` touches a property name). **Cure at the root:** `declarationName` keeps a `--*` name as authored and ASCII-lowercases any other name. The grammar is unchanged and the emitted module is not re-emitted. `sheet.ts:70`'s doc comment now says the same. **Pinned test** `test/css/custom-property-case.test.ts` (4 cases): `--MyVar` survives; `--MyVar` ≠ `--myvar` in `collectDeclarations`; `COLOR` / `Animation-Name` fold; keyframe declarations keep `--Angle`. It was born RED (the reproduction above) and reads **4/4 ×2**. **Ruled divergence row:** the frozen oracle lowercased the name, so 4 golden rows move, all from one keyframes.js sheet (`--rotationX`): `reader:declaration` 1, `collect:parseStylesheet(sheet)` 1, `collectStyleRules` 1, `collectDeclarations` 1. Each is classed `cpCase` by `bench/paired/equiv.mjs` (folding only the `--*` strings makes it equal the golden row). In the sheet differential it is class **SH-2** (1 of 32,021). It is rowed as the oracle's defect in DIVERGENCE-LEDGER §17. Commit `eeed0116`.
  2. *Easing descriptions and bounce curves.* ⟨`git log -S easeOutBounce -- src`⟩ → `164343c1` (the v4 cut) removed `timingFunctionDescriptions` and `bounce-in-ease`, `bounce-in-ease-half`, `bounce-out-ease`, `bounce-out-ease-half` and `bounce-in-out-ease`. **That removal was ruled:** V-A64 (`docs/tranches/V/archive/ADDENDA.md:133`, "`timingFunctionDescriptions` remains absent from Value and moves once as rendered UI copy to bbnf-buddy and Keyframes"; `/easing` is exactly 16 runtime exports and nine named numeric functions, with `easeInBounce` the only bounce), and `docs/tranches/V/CONSUMER-CUT.md` §1 rows 60–61. So, per ADDENDUM (d) 2, the ruling is cited and a consumer migration note is written, and nothing is restored: CHANGELOG `[Unreleased]` → Migration, commit `628d23b6`.
- **INFO 3** (the close is accurate): no cure needed.
- **INFO 4** (Check 1's commit `4e613da6` swept in the Track C X.F.W14U REPAIR 1 line): no cure. The line is committed verbatim (⟨`grep -c "X.F.W14U REPAIR 1 of RESUME 1" LEDGER.md`⟩ → `1`), and Track C's own commit `911e08f3` followed. This notice is the relay. This seat does not touch LEDGER.md.

**Gate re-readings on the settled bytes (HEAD `a1eddca8`, every one run twice unless noted):**
- ⟨`node bench/paired/build.mjs`⟩ → `srcDirty ""`, `bankedManifestOk 79/79`, `retiredAt 2155142b`.
- **L-G2 / V-1** ⟨`node bench/paired/equiv.mjs product <scratch>`⟩ ×2 → `compared 1376531/1376531 rows · mismatches 92 (ASCII-only sources 1 · CP-CASE 4)` both. The 92 are 88 F-b-4 (non-ASCII, the §16 split 4·4·11·13·11·45) and 4 CP-CASE (§17). The single ASCII-only row is the CP-CASE `reader:declaration` row. **GREEN ×2 under the two ruled rows.**
- **`test:css-equivalence`** ×2 → `Tests 19 passed (19)`; `parseStylesheet × 32021 … DEFECT 0 · classes {"SH-2":1,"SH-1":13}`. ⟨`grep -cE "DEFECTS [1-9]"`⟩ → `0`. **MIRROR-DEFECTS 0.**
- **`npx vitest run test/css`** ×2 → `62 passed (62)` (58 + the 4 new pins).
- **`npx vitest run`** → `2 failed | 945 passed (947)`, the foreign pair (`spectrum-luma` C-5 BORN-RED, `reka-binding-idiom` NG-6), with 0 CSS failures.
- **vue-tsc** lib / demo / test → `0 / 0 / 0`. `npm run typecheck` still reports 16 `tsc -p tsconfig.e2e.json` errors in `e2e/smoke/w12-*.spec.ts`: sibling-track committed files, not in this unit's set.
- **L-G1 no-regression** (`parseStylesheet`, the only entry the `declName` action runs in). Node ⟨`node bench/paired/isolated.mjs cprep1 product 3 11 acc,rej,large parseStylesheet`⟩ (load 11.41 → 10.57) → acc .536/.562/.545, rej .561/.531/.581, large .379/.374/.335, 11/11 < 1 in each, 0 set aside. Browser ⟨`node bench/paired/browser.mjs cprep{1,2} firefox,webkit,chromium 2 acc,rej,large 11 product parseStylesheet`⟩ (load 9.56 → 9.05):
  - Chromium: acc .516/.504 · .504/.523; rej .523/.526 · .529/.544; large .33/.327 · .336/.338.
  - WebKit: acc .6/.583 · .591/.565; rej .781/.75 · .75/.75; large .588/.6 · .559/.588.
  - Firefox: acc .816/.803 · .813/.783; large .928/.94 · .94/.957; **rej .98/1.037 · 1.04/1.01, RED (HIGH 1, escalated)**.
  - No cell moved outside the close's band. Records are in commit `a1eddca8`.

**Commits:** `eeed0116` (the cure, test, CP-CASE/SH-2 classes and ledger §17) · `628d23b6` (CHANGELOG) · `a1eddca8` (records) · this section. **Adjacent edits (§0bt):** `bench/css-equivalence/stylesheet.measure.test.ts` (class SH-2) and `bench/paired/equiv.mjs` (the `cpCase` class): the oracle's assertion for the changed name, the same concern. `CHANGELOG.md` and `DIVERGENCE-LEDGER.md` §17 are ADDENDUM (d)'s own writes. **Out-of-set writes:** none. dev.sh was not touched.
**Cured:** 1 (HIGH 2, `.cp`). **Escalated:** 1 (HIGH 1, ESC-W7l2-1, owner). LEDGER:104 stays **PARTIAL** (ESC-W7l2-1 is unruled; `.cp` is now executed).

## Check 2 of the RESUME 4 Close (2026-09-24, L-20 fresh adversarial pass 2, `claude-opus-5-5`, Track D; verify-only, cures nothing)

**Read:** W7.md whole (253 lines; ADDENDA (b) `:216`, (c) `:231`, (d) `:249` bind); from this record `## RESUME 4 — Open` through `## RESUME 4 Unit plan`, `## RESUME 4 Close`, `## Check 1 of the RESUME 4 Close` and `## Repair 1 of the RESUME 4 Close`. **Crash-recovery:** ⟨`git status --porcelain -- src bench test docs/tranches/X/execution/D docs/tranches/X/execution/LEDGER.md package.json CHANGELOG.md`⟩ → empty. parse-that master's dirty `rust/**`, `README.md`, `.cargo/config.toml` are outside every W7 set (siblings'; untouched). Load at open `8.38 10.24 16.15`.

### Axes
1. **Claimed GREENs reproduce (10 re-run):** ⟨`node bench/paired/build.mjs`⟩ → `valuejsHead 1f7480ef`, `srcDirty ""`, `bankedManifestOk 79/79`; ⟨`node bench/paired/equiv.mjs product <scratch>`⟩ ×2 → `compared 1376531/1376531 rows · mismatches 92 (ASCII-only sources 1 · CP-CASE 4)` both (= 88 F-b-4 + 4 CP-CASE, §16 + §17); ⟨`npx vitest run test/css`⟩ ×2 → `6 passed · 62 passed` both; ⟨`npx vitest run test/css/custom-property-case.test.ts`⟩ → `4 passed`; ⟨`npm run -s test:css-equivalence`⟩ → exit 0, `Tests 19 passed (19)`, ⟨`grep -cE "DEFECTS? [1-9]"`⟩ → `0`; ⟨`npx vue-tsc -p tsconfig.{lib,demo,test}.json --noEmit | grep -c "error TS"`⟩ → `0 · 0 · 0`; a direct probe (tsx, scratchpad) `parseStylesheet(".a{--MyVar:1;--myvar:2;Color:var(--MyVar)} @keyframes k{from{--Angle:1deg}}")` → names `--MyVar`, `--myvar`, `color`, keyframe `--Angle` (ADDENDUM (d) 1 met at the bytes). Timing (records moved to scratchpad `c2/`, ⟨`git status --porcelain bench | wc -l`⟩ → `0`):
   - read 1 ⟨`node bench/paired/browser.mjs w7r4c2 firefox,chromium 2 rej,large 11 product parseStylesheet`⟩ (load 9.51 → 9.17): Chromium rej **.54 / .543**, large **.317 / .347**; Firefox rej **.983 / .975** (7/11 rounds < 1), large **.991 / .952**.
   - read 2 ⟨`… w7r4c2b firefox,webkit …`⟩ (load 8.10 → 8.14): WebKit rej **.781 / .75**, large **.559 / .576**; Firefox large **.934 / .935**; Firefox rej **.995 / 1.015 → `RED`** (3/11 rounds < 1 in rep 1).
2. **File bounds:** ⟨`git show --stat --format=`⟩ `eeed0116` → `src/css/bbnf/{sheet,stylesheet}.ts`, `test/css/custom-property-case.test.ts`, `docs/tranches/X/parse-that/DIVERGENCE-LEDGER.md` (+16/−0), and §0bt adjacent `bench/paired/equiv.mjs`, `bench/css-equivalence/stylesheet.measure.test.ts` (declared); `628d23b6` → `CHANGELOG.md`; `a1eddca8` → 3 `bench/records/` files; `e76be344` → this record; `1f7480ef` → LEDGER (1 line). All inside ADDENDUM (d)'s grant (`src/**`, pinned test, CHANGELOG, ruled divergence row) plus declared adjacent lines. ⟨`git log 13106615..HEAD -- scripts/dev/dev.sh`⟩ → empty. **Held.**
3. **Masking:** the `cpCase` class in `equiv.mjs` only counts; the exit code stays `mismatches === 0 ? 0 : 1` and all 92 rows are printed. SH-2 applies only when HEAD accepts, a `--*` name has an upper-case letter, and folding exactly those names gives deep-equality with the hybrid. It is a ruled-divergence class (ADDENDUM (d) 1 orders the row), not a narrowed assertion. No try/catch, skip or allowlist. **None.**
4. **Families:** cure + pin + class + ledger §17 = one commit (`eeed0116`); CHANGELOG, records, record and LEDGER one each. **Whole.**
5. **E-3:** ⟨`git diff --stat 13106615..HEAD -- docs/tranches/X/parse-that/waves/ docs/tranches/V/megatranche/registry/adjudicated/`⟩ → empty; DIVERGENCE-LEDGER gained a dated §17 section only (+16/−0, the addendum-beside form F-b-4's §16 uses). **Held.**
6. **Mail:** ⟨`grep -cE '\| *UNREAD *\|' docs/tranches/V/coordination/INBOX.md`⟩ → `0`. **Clean.**
7. **Four-verb line:** Repair 1 keeps PARTIAL; LEDGER:104 reads `PARTIAL — ESC-W7l2-1 unruled`. **Lawful.** (See MINOR C2-2 for the cell's stale tail.)
8. **Goal at the bytes:** `.cp` is met (probe above; the easing half is cited to V-A64, ⟨`sed -n 133p docs/tranches/V/archive/ADDENDA.md`⟩ → "`timingFunctionDescriptions` remains absent from Value", CHANGELOG migration note present). Faster than the retired parser on every engine is **NOT MET**: Firefox rej `parseStylesheet` reads .975–1.015 here. Across this seat, Check 1, Repair 1 and the Close, that is 14 clean reps at .975–1.04 (Close 1.035·1.034·1.029·1.01; Check 1 1.009·1.01; Repair 1 .98·1.037·1.04·1.01; here .983·.975·.995·1.015), 10 of them > 1: the cell is centred on 1.0, not below it.
9. **Published figures:** Repair 1's 92 (88 + 4 CP-CASE), 62/62, 4/4, 19/19, vue-tsc 0/0/0, Chromium/WebKit bands and Firefox large .93–.96 all reproduce. Its Firefox rej band (.98–1.04) reproduces (.975–1.015).
10. **Honest-RED adjudication:**
   - **Firefox rej `parseStylesheet` (L-G1, ADDENDA (b)/(c)):** no relief in the spec. (c) refuses record-instead-of-gate; (b) routes an uncurable cause to the owner "as a measured decision, never as a quiet relaxation". ⟨`grep -c ESC-W7l2-1 docs/tranches/X/COHESION.md`⟩ → `0` (last section §0dp): **unruled**. The cure surface (value.js actions plus the bbnf-lang emitter) is Track D's own, so it is not producer-owned, and no successor wave is routed to it. **Unrelieved RED.**
   - **Release gates** P-6 · E-8 · V-9 + CI step · Z-1 · Z-3 publish half: relieved to X.P.W7P by ADDENDUM 2026-09-24 §1 (OTP-keyed). **Relieved; owner X.P.W7P.**
   - **Firefox large `parseStylesheet`:** < 1 in all 4 reps here (.934–.991); R-l2-2 noise watch, not failing in this seat.

### Register (severity · claim · receipt · cure)
- **C2-1 HIGH** · L-G1 (ADDENDA (b)/(c): below the retired parser on every engine, ×2) stays RED on Firefox rej `parseStylesheet`, and the spec gives no relief for it · read 2 `x0.995 / x1.015 → RED`; 10 of 14 clean reps across four seats > 1; ESC-W7l2-1 has 0 hits in COHESION · the owner rules ESC-W7l2-1 (the SpiderMonkey action-body and value-mode construction cost, `bench/records/2026-09-24-x-p-w7-profile-l2-b.json`), then a Track D RESUME executes the ruling and re-reads L-G1 ×2 on every engine.
- **C2-2 MINOR** · LEDGER:104's status cell contradicts itself. It says "`.cp` executed at Repair 1 `eeed0116`/`628d23b6`" and ends "ADDENDUM (d) `.cp` (custom-property case, easing presets) not yet run" (a stale tail from the Close). · ⟨`grep -n "| X.P.W7 |" LEDGER.md`⟩ · the next seat that edits the row drops the stale tail clause (minimal in-place).
- **C2-3 INFO** · the node record `a1eddca8` banks as `bench/records/2026-09-23-x-p-w7-cprep1.json` although it was run on 2026-09-24 (a filename-date slip; the contents and load lines stand) · no cure is needed; a later seat may note it in an addendum.
- **C2-4 INFO** · `declarationName` folds with `String.prototype.toLowerCase` (Unicode), not a strict ASCII fold. It is the pre-existing fold, unchanged for standard names, and no row of the oracle moves by it · none.
- **C2-5 INFO** · `.cp` is correct at the bytes (case kept on `--*` in style and keyframe declarations and in `var()` args; standard names fold; the easing half is cited to its ruling) · none.

**Honest-RED set:** none admissible. The release gates are relieved to X.P.W7P. Firefox rej `parseStylesheet` is unrelieved.

**Successor conjuncts.** X.P.W7P "Opens when: the owner supplies an npm one-time password … **and** X.P.W7 has CLOSED its engineering gates". The OTP conjunct is not met (LEDGER:105 `GATE-KEYED`), and the W7-closed conjunct is RED (C2-1). **X.P.W7P is lawfully blocked.**

**Verdict: NOT-CONFORMANT.** 10 claimed GREENs reproduce, and `.cp` is cured and in set. The gate that fails is L-G1 Firefox rej `parseStylesheet`, held by the unruled ESC-W7l2-1. LEDGER:104 stays `PARTIAL`. **Adjacent edits: none. Out-of-set writes: none.** `scripts/dev/dev.sh` untouched.

## Repair 2 of the RESUME 4 Close (2026-09-24, repair seat round 2, `claude-opus-5-5`, Track D; answers `## Check 2 of the RESUME 4 Close`)

- **Crash recovery:** ⟨`git status --porcelain -- docs/tranches/X/execution/D docs/tranches/X/execution/LEDGER.md src bench test`⟩ → empty at open. No inherited partial work. parse-that master's dirty `rust/**`, `README.md` and `.cargo/config.toml` are outside every W7 set; they belong to siblings and were not touched.
- **C2-1 HIGH, L-G1 Firefox rej `parseStylesheet` → ESCALATED, not cured.** ⟨`grep -c ESC-W7l2-1 docs/tranches/X/COHESION.md`⟩ ×2 → `0 · 0`. The last section is still §0dp, so the owner has not ruled. ADDENDUM (c) has spent both admitted forms: (a) static bulk-run shipped, and (b) uniform negated runs is the shipped fallback. (c) refuses recording the cell instead of gating it. ADDENDUM (b) sends an uncured cause to the owner as a measured decision (`bench/records/2026-09-24-x-p-w7-profile-l2-b.json`: the SpiderMonkey action-body and value-mode construction cost). A repair seat has no lawful cure, since any engine split or relaxation is refused. No product byte changed in this seat, so the Check 2 reading (.975–1.015, 10 of 14 clean reps > 1) stands and was not re-measured. **Stays RED; ESC-W7l2-1 carried to the owner.**
- **C2-2 MINOR, LEDGER:104 stale tail → CURED.** A minimal in-place edit removed "; ADDENDUM (d) `.cp` (custom-property case, easing presets) not yet run" (C3-3 hygiene: `git diff --numstat` → `1 1`, this seat's line only). ⟨`grep -n "| X.P.W7 |" LEDGER.md | grep -c "not yet run"`⟩ ×2 → `0 · 0`. Commit `635959c7`.
- **C2-3 INFO** (the filename date on `bench/records/2026-09-23-x-p-w7-cprep1.json`): the file is not renamed (E-3; the record is immutable). This line is the note: that node run was taken on **2026-09-24**, and its contents and load lines stand.
- **C2-4 / C2-5 INFO:** no cure needed.

**Gate re-readings:** none are owed. The one cure is a ledger cell, which moves no product gate. `src/ bench/ test/` are unchanged since `a1eddca8` (⟨`git status --porcelain -- src bench test`⟩ → empty). Check 2's 10 GREENs stand on the same bytes.
**Commits:** `635959c7` (LEDGER) · this section. **Adjacent edits:** none. **Out-of-set writes:** none. dev.sh was not touched.
**Cured:** 1 (C2-2). **Escalated:** 1 (C2-1, ESC-W7l2-1, owner). LEDGER:104 stays **PARTIAL**.

## Check 3 of the RESUME 4 Close (2026-09-24, L-20 fresh adversarial pass 3, `claude-opus-5-5`, Track D; verify-only, cures nothing)

**Read:** W7.md whole (253 lines; ADDENDA (b), (c), (d) bind); from this record `## RESUME 4 — Open` through `## RESUME 4 Unit plan`, `## RESUME 4 Close`, `## Check 1`/`## Repair 1`/`## Check 2`/`## Repair 2 of the RESUME 4 Close`. **Crash-recovery:** ⟨`git status --porcelain -- src bench test docs/tranches/X/execution/D docs/tranches/X/execution/LEDGER.md package.json CHANGELOG.md`⟩ → empty; ⟨`git log --oneline 07a9042e..HEAD`⟩ → empty (HEAD = Repair 2's `07a9042e`); bbnf-lang worktree clean, HEAD = `origin/x-p-w7-typescript` = `89fae4826`. No inherited partial work.

### Axes
1. **Claimed GREENs reproduce (9 re-run):** ⟨`node bench/paired/build.mjs`⟩ → `valuejsHead 07a9042e`, `srcDirty ""`, `bankedManifestOk 79/79`; ⟨`node bench/paired/equiv.mjs product <scratch>/eq2.json`⟩ ×2 → `compared 1376531/1376531 rows · mismatches 92 (ASCII-only sources 1 · CP-CASE 4)` both (= 88 F-b-4 §16 + 4 CP-CASE §17); ⟨`npx vitest run test/css`⟩ → `6 passed · 62 passed`; ⟨`npm run -s test:css-equivalence`⟩ → exit 0, `Tests 19 passed (19)`, ⟨`grep -cE "DEFECTS? [1-9]"`⟩ → `0`; ⟨`npx vue-tsc -p tsconfig.lib.json --noEmit | grep -c "error TS"`⟩ → `0`; K2-b `deepFreeze` → `0`; L-G3 instrument grep → `0`. Timing ⟨`node bench/paired/browser.mjs w7r4c3 firefox,webkit,chromium 2 rej,large 11 product parseStylesheet`⟩ (load `7.84` → `12.41`, recorded; record moved to scratchpad `c3/`, ⟨`git status --porcelain bench | wc -l`⟩ → `0`): Chromium rej **.525 / .548**, large **.339 / .357**; WebKit rej **.763 / .75**, large **.571 / .571** (all 11/11 < 1); Firefox rej **x1.008 / x1.015 → `RED`** (4/11 rounds < 1 in each rep); Firefox large **x0.917 / x1 → `RED`** (5/11 < 1 in rep 2).
2. **File bounds:** no commit since Check 2 other than Repair 2 (`635959c7` LEDGER 1 line; `07a9042e` this record). Earlier commits verified in set by Checks 1/2. ⟨`git log 4ffbe7de..HEAD -- scripts/dev/dev.sh`⟩ → empty. **Held.**
3. **Masking:** no product byte moved since Check 2; none found. **None.**
4. **Families:** whole (unchanged since Check 2).
5. **E-3:** ⟨`git diff --stat 13106615..HEAD -- docs/tranches/X/parse-that/waves/ docs/tranches/V/megatranche/registry/adjudicated/`⟩ → empty. **Held.**
6. **Mail:** ⟨`grep -cE '\| *UNREAD *\|' docs/tranches/V/coordination/INBOX.md`⟩ → `0`. **Clean.**
7. **Four-verb line:** LEDGER:104 `PARTIAL — ESC-W7l2-1 unruled`; stale tail gone. **Lawful.**
8. **Goal at the bytes:** `.cp` met (Check 2 probe; bytes unchanged). "Faster than the retired parser on every engine" **NOT MET**: Firefox rej `parseStylesheet` x1.008 / x1.015 here; 12 of 16 clean reps across five seats > 1.
9. **Published figures:** 92 / 62 / 19 / 0 and the Chromium/WebKit bands reproduce; Firefox rej reproduces in Repair 1's and Check 2's band (.975–1.04).
10. **Honest-RED adjudication:**
   - **Firefox rej `parseStylesheet` (L-G1):** no relief in the spec — ADDENDUM (c) refuses record-instead-of-gate; ADDENDUM (b) routes an uncured cause to the owner "as a measured decision, never as a quiet relaxation". ⟨`grep -c ESC-W7l2-1 docs/tranches/X/COHESION.md`⟩ → `0` (last section still §0dp): **unruled**. Not producer-owned (cure surface = value.js actions + bbnf-lang emitter, Track D's own); no successor wave routed. **Unrelieved RED.**
   - **Firefox large `parseStylesheet`:** x1.000 in one rep here (R-l2-2 noise watch; receipt 1.03–1.13, Close/Checks .93–.995). Same relief status as above (none); it rides ESC-W7l2-1's ruling.
   - **Release gates** P-6 · E-8 · V-9 + CI step · Z-1 · Z-3 publish half: relieved to X.P.W7P by ADDENDUM 2026-09-24 §1 (OTP-keyed). **Relieved.**

### Register (severity · claim · receipt · cure)
- **C3-1 HIGH** · L-G1 (ADDENDA (b)/(c)) RED on Firefox rej `parseStylesheet`, no spec relief · `product firefox|rej|parseStylesheet RED x1.008 x1.015`; ESC-W7l2-1 0 hits in COHESION · the owner rules ESC-W7l2-1 (profile `bench/records/2026-09-24-x-p-w7-profile-l2-b.json`); a Track D RESUME executes it and re-reads L-G1 ×2 on every engine.
- **C3-2 MINOR** · Firefox large `parseStylesheet` read x1.000 in one rep (not < 1.00), the R-l2-2 noise-distance cell · `product firefox|large|parseStylesheet RED x0.917 x1` · re-read under the ESC-W7l2-1 execution unit; no separate cure.
- **C3-3 INFO** · Repair 2 is accurate; no product byte moved; LEDGER row consistent · none.

**Honest-RED set:** none admissible (release gates relieved to X.P.W7P; Firefox rej `parseStylesheet` unrelieved).

**Successor conjuncts.** X.P.W7P opens when the owner supplies an npm OTP (not met; LEDGER:105 `GATE-KEYED`) **and** X.P.W7 has CLOSED its engineering gates (RED, C3-1). **X.P.W7P lawfully blocked.**

**Verdict: NOT-CONFORMANT.** 9 claimed GREENs reproduce; L-G1 Firefox rej `parseStylesheet` fails, held by the unruled ESC-W7l2-1. LEDGER:104 stays `PARTIAL` (no status edit; one event line appended). **Adjacent edits: none. Out-of-set writes: none.** `scripts/dev/dev.sh` untouched.

## RESUME 5 — Open (2026-09-25, seat 0, `claude-opus-5-5`, Track D; COHESION §0dq + W7.md ADDENDUM (e))

- **Mode:** RESUME 5. ⟨`grep -n "| X.P.W7 |" LEDGER.md`⟩ → `:105` status `PARTIAL — ESC-W7l2-1 unruled …` (not CLOSED); this record exists (2014 lines before this section). Governing text: W7.md read whole (260 lines; ADDENDUM (e) at `:255` binds — ESC-W7l2-1 RULED: no relief, no engine split; unit `.l3` profiles and cures Firefox's refusal path, then `.cp`) and COHESION §0dq (`:3570`, the file end). Read from this record: `## RESUME 4 — Open` through `## RESUME 4 Unit plan`, `## Repair 1 of the RESUME 4 Close` (the `.cp` receipt) and `## Check 3 of the RESUME 4 Close` (the last section).
- **alreadyDone: `.o .p .t .e .v .k .k2 .g .l .l2 .cp`**, verified at the bytes: ⟨`git log --oneline --all | grep -E "^(eeed0116|628d23b6|a1eddca8|9c1bf596)"`⟩ → all four present (`.cp` = `eeed0116` cure + pinned test · `628d23b6` CHANGELOG migration note citing V-A64 · `a1eddca8` records; `.l2` re-emission `9c1bf596`); bbnf-lang ⟨`git -C ../bbnf-lang-x-p-w7-typescript log --oneline -3`⟩ → `89fae4826` (`.l2` (b)) · `d08694061` (`.l2` (a)) · `d81016e96` (`.l`); HEAD = `origin/x-p-w7-typescript` = `89fae4826`. **`.cp` is NOT re-dispatched although §0dq/ADDENDUM (e) sequence it "then `.cp`":** its commits exist (executed at `## Repair 1 of the RESUME 4 Close`, both ADDENDUM (d) halves: case cure + 4/4 pins; easing removal RULED by V-A64 and cited, migration note written) — its gates (pins 4/4 ×2, MIRROR-DEFECTS 0 + CP-CASE row, no L-G1 regression) are re-read by `.l3` as stay-GREEN and by the close. `.z` re-opens only in X.P.W7P.
- **Crash-recovery:** ⟨`git status --porcelain -- src bench test CHANGELOG.md package.json docs/tranches/X/execution/D docs/tranches/X/parse-that docs/tranches/X/execution/LEDGER.md docs/tranches/V/coordination`⟩ → empty; ⟨`git -C ../bbnf-lang-x-p-w7-typescript status --porcelain`⟩ → empty. HEAD `059ec6af` (§0dq). **No inherited partial work.**
- **Preconditions:** `.l3` opens on §0dq's ruling (not a predecessor wave): ⟨`grep -n "^## §0dq" COHESION.md`⟩ → `3570`; W7.md:255 ADDENDUM (e) present; `.l2` commits exist (above); the `.l` instrument present (`bench/paired/instrument.mjs`, `bench/paired/profile.mjs`); the `.l2` profile `bench/records/2026-09-24-x-p-w7-profile-l2-b.json` present. Release chain stays X.P.W7P (LEDGER:106 `GATE-KEYED … one-time password`). **MET.** No npm act in this wave.

### E13 Step-0 mail sweep (2026-09-25)
- ⟨`ls -td glass-ui/docs/tranches/*/ | head -2`⟩ → `BL BK` (BL newest, no `coordination/`; BK stays the mail path, BL root swept).
- ⟨`find <path> -maxdepth 1 -type f -newer INBOX.md`⟩ over value.js `V/` + `V/coordination/` · glass `BK/coordination/` + `BL/` · keyframes.js `V/coordination/` · atlas `P/coordination/` → 0 on every path except glass `BL/FORMATION-PROGRESS.md` (glass's internal resume cursor, not a letter). ⟨`grep -cE '\| *UNREAD *\|' INBOX.md`⟩ → `0` (last row I-61).
- **Result: 0 unrowed · 0 UNREAD in scope.** A dated sweep line was appended to INBOX.md.

## RESUME 5 Baseline (BEFORE, read-only, 2026-09-25; product bytes = `.cp`'s final bytes `eeed0116` on `.l2`'s emission `9c1bf596`, unchanged)

- ⟨`node bench/paired/build.mjs`⟩ → `valuejsHead 059ec6af`, `srcDirty ""`, `bankedManifestOk 79/79`, `retiredAt 2155142b`.
- **RESUME rule:** `.l3` turns L-G1 Firefox rej `parseStylesheet` (and every cell it could move); every other gate is cited from `## Check 3 of the RESUME 4 Close` (V-1 92 = 88 F-b-4 + 4 CP-CASE ×2 · test/css 62/62 · css-equiv 19/19 MIRROR-DEFECTS 0 · vue-tsc lib 0 · bbnf-lang suite + tsc 0 · node whole/acc/rej 7/7).
- **Load warning:** the shared host ran the other three tracks' redeploy; load rose 18.95 → 37.00 across the read, so Firefox large voided every cell (spread ≥ 1.6×). Recorded as-is, never claimed; `.l3` re-reads quiesced (R-l-2).

| Gate | Command | BEFORE (2 reps, paired median) | Reading |
|---|---|---|---|
| L-G1 Firefox rej parseStylesheet | ⟨`node bench/paired/browser.mjs w7r5open firefox,webkit,chromium 2 rej,large 11 product parseStylesheet`⟩ (load 18.95 → 37.00, recorded; record moved to the scratchpad, ⟨`git status --porcelain bench src test \| wc -l`⟩ → `0`) | **x1.038** clean (+4 SA 1.075/1.209/1.345/1.033, spread 2.4–8.2) | **born-RED** (the §0dq band 1.02–1.08) |
| L-G1 Firefox large parseStylesheet | same | 0 clean; 8 SA (.897–1.407, spread 1.9–6.8) | **VOID** (load); prior band .92–1.13 (R-l2-2 noise watch) |
| L-G1 WebKit rej / large parseStylesheet | same | .741 / .772 · .581 / .576 | GREEN (stay-GREEN) |
| L-G1 Chromium rej / large parseStylesheet | same | .562 / .55 · .376 / .368 | GREEN (stay-GREEN) |
| `.cp` pins (ADDENDUM (d)) | ⟨`npx vitest run test/css/custom-property-case.test.ts`⟩ | `Tests 4 passed (4)` | GREEN (stay-GREEN; cured at `eeed0116`) |
| K2-b post-hoc walk | ⟨`grep -rn deepFreeze src \| wc -l`⟩ | 0 | stay-GREEN |
| L-G3 instrument bytes in shipped `generated/` | ⟨`grep -rln "instrument\|__prof\|PC\[\|NOW()" src/css/bbnf/generated \| wc -l`⟩ | 0 | stay-GREEN |

**greenBeforeCure: none.**

## RESUME 5 Unit plan (2026-09-25)

**alreadyDone:** `.o .p .t .e .v .k .k2 .g .l .l2 .cp` (never re-dispatched; `.cp` executed at `## Repair 1 of the RESUME 4 Close`). **`.z`:** re-opens only in X.P.W7P. **Owed:** `[X.P.W7.l3]` alone, then close (which re-reads `.cp`'s ADDENDUM (d) gates). One concurrent. Every seat Opus 5.5 (owner's Opus-only order, 2026-09-23; ADDENDUM (e) "Opus, effort high"). An ESCALATED `.l3` does not halt the wave: the close runs on it.

### Rulings cited (never re-opened)
§0dq / W7.md ADDENDUM (e) (ESC-W7l2-1 RULED: no relief, no engine split; `.l3` profiles and cures the refusal path) · §0di / ADDENDUM (c) ((c) record-instead-of-gate REFUSED; (a) static + (b) uniform both shipped at `.l2`) · §0cx / ADDENDUM (b) (root cause, one cure every engine, never a post-hoc freeze walk; impasse → ESCALATED with the per-rule profile) · §0dj / ADDENDUM (d) (`.cp`; easing removal = V-A64) · §0cp (release chain → X.P.W7P, OTP-keyed; LEDGER hunk hygiene) · §0ck 1–7 (F-b-4 accepted; positional semantics; bbnf-lang choreography) · §0bt ADJACENT-LINE RULE.

### Locks
- **L-4 (bbnf-lang):** writes only in `../bbnf-lang-x-p-w7-typescript` on `x-p-w7-typescript`; push the branch only; never local master; PR #1 stays open. Every re-emission of `src/css/bbnf/generated/` goes through `node scripts/gen-grammar.mjs` only (emitter linked from the worktree as `.l`/`.l2` did; restore 0.1.4 after, ⟨`grep '"version"' node_modules/@mkbabb/bbnf-lang/package.json`⟩ → `0.1.4`); `--check` passes after.
- **L-6 (no npm):** no `npm publish`, no version bump, no dependency move (X.P.W7P); ⟨`git diff HEAD -- package.json package-lock.json`⟩ empty at the end.
- **L-7 (LEDGER, §0cp 4):** read `git diff` on LEDGER.md before any commit touching it; stage only this seat's hunk.
- **L-8 (instrument compiled out):** L-G3 stays 0 in shipped `generated/`.
- **L-9 (one module, every engine):** no engine sniffing, no input-length test, no per-engine branch in emitted or action code; K2-b stays 0 (no post-hoc freeze walk); no try/catch around a defect; the result layer shared with the retired arm (`src/css/result.ts`) moves only if the profile names it, and then for both arms identically (stated in the receipt).
- **L-11 (refusal discipline, ADDENDUM (e) 2):** a refusal builds no result it discards (no action/freeze on an alternative that has not committed), allocates its failure record lazily (only when read), and re-scans nothing already classified — each named with a test or an audit-build assertion.
- **Families:** an emitter cure = one bbnf-lang commit (`typescript/src/**` + tests), pushed, + its value.js re-emission commit; an action cure = one value.js `src/css/bbnf/**` commit with its tests; records = one value.js `bench/**` commit.

### `[X.P.W7.l3]` — Firefox's refusal cost, found and cured (W7.md 255–260: ADDENDUM (e); COHESION §0dq)
- **Writable:** bbnf-lang `typescript/**` on `x-p-w7-typescript` · value.js `src/css/bbnf/**` (`generated/` through `node scripts/gen-grammar.mjs` only) and the freeze helper and its callers under `src/css/**` (the `.k2` grant) · `bench/**` (probes beside `bench/paired/`, records) · `test/css/**` (pins) · this record.
- **Acts:** (1) profile: ⟨`node bench/paired/profile.mjs l3 node,firefox,chromium,webkit parseStylesheet:rej`⟩ with the `.l` instrument (per-rule counts + time, compiled out) on the rejected corpus, V8 the control; name what a refusal spends that the retired parser does not (speculative node build/freeze on a failing alternative, error/label/expected allocation, memo fills on dead branches, re-scans, `Error` creation); bisect with arms under `_build/`; (2) cure structurally once for every engine per L-11; (3) re-emit if the emitter moved; (4) read the gates quiesced (load recorded; SA cells re-read, never claimed); (5) impasse → ESCALATED with the per-rule profile.
- **Gates:** L-G1 every entry × {acc, rej} + large sheets < 1.00 paired on node, Chromium, WebKit, Firefox, ×2, re-read quiesced (`bench/paired/isolated.mjs`, `bench/paired/browser.mjs`) · L-G2 V-1 = 88 F-b-4 + 4 CP-CASE exactly ×2 (`bench/paired/equiv.mjs`) · L-G3 0 · stay-GREEN: `.cp` pins 4/4 ×2, `test:css-equivalence` 19/19 MIRROR-DEFECTS 0, `npx vitest run test/css`, `npm test` (foreign failures only), `vue-tsc` 0/0/0, `gen-grammar --check` 0, K2-b 0, E-1..E-7 on the final emitter (E-6 ≤ 125,646 / 14,517), bbnf-lang TS suite ×2 + `tsc --noEmit` 0, whole-7/7 inside ceilings.
- **Locks:** L-4, L-6, L-7, L-8, L-9, L-11.

### Close (after `.l3`)
Engineering gates binding (accepted + rejected halves and large sheets under the retired parser on every engine, ×2) plus `.cp`'s ADDENDUM (d) gates re-read. Release gates P-6 · E-8 · V-9 + the CI step · Z-1 · Z-3 (publish half) relieved by citing X.P.W7P (§0cp; OTP-keyed). No `npm publish` in this wave.

## RESUME 5 Unit receipts
