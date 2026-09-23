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

### X.P.W6.b

Seat `claude-opus-5-5`, 2026-09-23 ~15:05–15:32 EDT (load 8.6 → 88 → 34, shared host). Spec: W6.md §The law + §Units `.b` (read whole); COHESION §0bx/§0by/§0bz consumed (F-W5c-1 → spec; SC-1 calc; SC-2 p3-linear; R-c-2 light-dark via the context path; R-b-2 var() in animation).

**Crash-recovery.** ⟨`git status --porcelain`⟩ → no path inside `.b`'s writable set dirty at open (foreign rows only: `CARRY-LEDGER.md`, `X-W7.md`, `scripts/dev/dev.sh`, `docs/tranches/X/audit/`, `chassis/ui-audit.js`). Nothing inherited.

**Act 1 — the published idiomatic BBNF path, MEASURED and NAMED: `@mkbabb/bbnf-lang@0.1.4` `BBNFToParser` over `@mkbabb/parse-that@0.8.2`.**
- ⟨`git -C ../parse-that grep -l -i bbnf -- typescript/src`⟩ → only `typescript/src/parse/split.ts` (a helper generated code calls); ⟨`npm view @mkbabb/parse-that@1.0.0 exports`⟩ → `. ./core ./diagnostics ./packrat ./utils` — parse-that 1.0.0 ships NO BBNF loader.
- ⟨`npm view @mkbabb/bbnf-lang version dependencies`⟩ → `0.1.4`, `@mkbabb/parse-that ^0.8.2`; its `BBNFToParser(text)` compiles BBNF into parse-that `Parser`s. value.js pins `@mkbabb/parse-that` to the same exact `0.8.2` so ONE copy exists (⟨`npm ls @mkbabb/parse-that`⟩ → `0.8.2 deduped`) and the semantic actions attach to the very parsers the grammar yields.
- Three published-build facts measured and designed around (each documented at `src/css/bbnf/load.ts` / `tokens.bbnf`; none patched, none masked):
  - F-b-1: `BBNFToParserFromFile` (the `@import` path) throws for ANY reader — ⟨`node -e 'BBNFToParserFromFile("a.bbnf", () => "a = \"x\" ;")'`⟩ → `(void 0) is not a function` (the build replaced `node:path` with `undefined`, `bbnf.js:1788`). The four modules are concatenated in declared order and compiled as ONE grammar.
  - F-b-2: `Parser.parseState`/`parse` write every failed parse to `console.error` (`parse-that/dist/parse.js:699-713`). Entries drive the public `Parser.reset()` + `Parser.call(new ParserState(src))` pair instead.
  - F-b-3: alternation dispatch tables take a regex's FIRST set from `re.source` only (`regexFirstChars`, `bbnf.js:1069`, never reads `flags`) — measured: `keyframeSelector "FROM"` → err while `selectorKeyword "FROM"` → ok. Every case-insensitive regex spells the first letter of each alternative as a class (`/[nN]one/i`); pinned by the "ASCII case-insensitivity" describe.
  - Also measured: an ALIAS rule (`a = b ;`) binds to `b`'s parser at compile, so the grammar has no alias naming a rule that carries an action (the `mixLitPct = percentage` probe returned the raw `"60%"`; removed).
- Deps: ⟨`npm i --save-exact @mkbabb/bbnf-lang@0.1.4 @mkbabb/parse-that@0.8.2`⟩ → `package.json` gains `"dependencies"` (the first runtime deps; `vite.library.ts` `libraryExternal = []` so they bundle); lock +17.

**Act 2 — the grammar (`src/css/grammar/*.bbnf`, 4 modules, the single source).** Restored from `36f918d2^:src/parsing/grammars/{css-color,css-values}.bbnf` and bbnf-lang `grammar/css/l4/color.bbnf` as reference, re-authored to run on the published toolchain:
- `tokens.bbnf` — number · percentage · dimension · angle · `none` · ident · string · balanced run.
- `math.bbnf` — css-values-4 §10: `calc()` · `min()`/`max()` · `clamp()` · `sign()`/`abs()` · §10.7.1 constants · `var()`/`env()`; `+`/`-` need surrounding whitespace.
- `color.bbnf` — CSS Color 4: `rgb()/rgba()` modern + `<legacy-rgb-syntax>` (percentages-only or numbers-only arms, NO `none`, alpha without `none` — KFA-14 / F-W5c-1), `hsl()/hsla()` modern + legacy, `hwb()`, `lab()/lch()`, `oklab()/oklch()`, `color()` over all ten predefined spaces incl. `display-p3-linear`, a math function in every component (SC-1), relative colour `<fn>(from <color> …)` and `color(from …)`, hex, keyword colours; CSS Color 5 `color-mix()` (optional method, 1+ items, percentage before or after, hue method polar-only in the grammar) and `light-dark()`.
- `value.bbnf` — component values (comma › slash › space lists, generic calls with colour heads excluded by `callName - colorHead`, numeric/string/operator/ident terms), scalars, keyframe selectors, `<easing-function>`.
- Semantic actions (`src/css/bbnf/{math,color,value,mix}.ts`) attach to rules by name (`rules[name].map(action)`); they build values and never read source text beyond converting a matched token's digits/unit (⟨`grep -cE "splitTopLevel|indexOf\(|charAt|\.match\(|regex\(|string\(" src/css/bbnf/*.ts`⟩ → 0 in every file but `mix.ts:363`, an Array `indexOf` over channel categories). `mix.ts` ports X.P.W5.c's css-color-5 §3.3 resolver (evidence `retired-seam/typescript/src/css/color-mix.mjs`) to TypeScript whole. Channel scales/clamps per the seam's ruled posture (PB-03/PB-04), tabled in `color.ts`'s header.
- Context contract: `light-dark()` (R-c-2), relative colour, `currentcolor`/system colours, `var()`, and a font/viewport-relative length inside a calculation all answer `color_context_required` — the path value.js already carries; no new export, no colour-scheme field (the frozen `ParseIssue` union unmoved).
- `display-p3-linear` (SC-2) is written as the exact `xyz` it names (§18 matrix) — `CssColorSpace` NOT widened (frozen surface); a `none` channel in `color(display-p3-linear …)` is refused like the ruled "concrete xyz-d50" guard (named out-of-scope class `concrete` in the tests, 26+12 WPT cells).
- Wiring: `src/css/bbnf/index.ts` exports `parseCssColor · parseCssValue · parseCssValues · parseCssScalar · parseKeyframeSelector · parseTimingFunction` INTERNALLY (not re-exported by `src/css/index.ts`; ⟨`vite build --mode production`⟩ exit 0, `dist/subpaths/css.js` 45.54 kB — the BBNF path is not yet on the published surface; `.x` swaps). `grammar.ts` untouched. `raw.d.ts` declares `*.bbnf?raw` for the lib program (which does not carry `vite/client`), so `src/vite-env.d.ts` needed no edit.

**Act 3 — R-b-2 (`var()` in the animation family, css-variables-1 §3).** BEFORE ⟨probe `parseStylesheet("a { animation: var(--a) 1s }")`⟩ → `false animation_option_invalid` (10/10 var() probes refused). Cure `src/css/rules.ts`: `holdsVar(value)` — a declaration whose parsed value holds a `var()` at any depth is pushed without the property-grammar checks (the spec's "assumed valid at parse time"); the control (no `var()`) still checked; `collectAnimationOptions` reads no option from the call. This is semantics shared by both paths (lands now in the shipping path).

**Act 4 — tests ported into `test/css/**` (GREEN).** `wpt/` (the nine WPT files + LICENSE, byte-identical, sha256-pinned) · `wpt-cases.ts` (the recorder loader, TS) · `css-color5.test.ts` · `css-var-animation.test.ts` · `bbnf-value.test.ts`. Scope classes re-read for full coverage: seam's `calc` and `p3-linear` classes are now IN scope; `relative` answers its contract; `concrete` / `context` named and counted.
- WPT computed `color-mix()`: in 931 (seam: 887) · concrete 26 · context 1 — all 931 within WPT's 0.01 epsilon.
- WPT valid `color-mix()`: 677 = in:ok 661 · concrete:css_syntax 12 · context:color_context_required 4. Invalid: 141/141 refused.
- Legacy (KFA-14): valid legacy 46 = in 28 (seam: 12) + context 18, all 28 compute; invalid legacy 49/49 refused incl. both F-W5c-1 `none`-alpha cells. Whole valid files 147 = in:ok 105 · context 42, all 105 compute (a legacy serialization writes `none` as 0 — css-color-4 §15.2 — so the comparator reads `none` as 0 against one); whole invalid files 65/65 refused.
- Dropped from the port (no second lowering exists): the JS ≡ Wasm legs and the harness `deleteVarDeclarations` leg (`.h` owns the harness).

**Gates (BEFORE → AFTER, double-run).**
- **G-b1** GREEN. BEFORE RED (absent in value.js) → ⟨`npx vitest run test/css` ×2⟩ → `Test Files 3 passed (3)` · `Tests 34 passed (34)` both runs.
- **G-b2** GREEN (hold kept). BEFORE `0` → ⟨`npx vue-tsc -p tsconfig.lib.json --noEmit`⟩ exit 0, `0` errors ×2; ⟨`npx vue-tsc -p tsconfig.test.json --noEmit`⟩ exit 0, `0` errors ×2 (the program includes `test/css/**`). ⟨`npx eslint --max-warnings=0 src/css test/css`⟩ exit 0.
- **G-b3** GREEN on the baselined measure. BEFORE `No such file or directory` → ⟨`ls src/css/grammar/*.bbnf | wc -l`⟩ `4`; the BBNF path carries no grammar in TS (act 2's grep). Not yet the ONLY CSS reader in value.js — see RES-b-1.
- Whole suite (context, not a `.b` gate): ⟨`npx vitest run`⟩ → `Tests 3 failed | 899 passed (902)`: `spectrum-luma` C-5 BORN-RED and `reka-binding-idiom` NG-6 are F-W6-open-4's foreign pair; `generate-rail` EC-10 timed out at 5000 ms under load 88 and passes alone (⟨`npx vitest run demo/test/generate/generate-rail.test.ts`⟩ → `2 passed`) — foreign (Track A), a load flake, not a CSS failure.

**Commits (value.js, pathspec, not pushed).** `acb7dca7` (the grammar family: deps + 4 `.bbnf` + `src/css/bbnf/*` + `test/css/{wpt,wpt-cases.ts,css-color5.test.ts,bbnf-value.test.ts}`, 26 files) · `4da38d2b` (R-b-2: `src/css/rules.ts` + `test/css/css-var-animation.test.ts`). This receipt: the next commit.

**Adjacent edits.** None.

**Residuals (named for the orchestrator; not escalations — outside `.b`'s coverage list or owned by another seat).**
- RES-b-1 — THE STYLESHEET LAYER IS STILL HAND-SCANNED. `stylesheet.ts` (`blocks`, `parseScopePrelude`, `topLevelColon`, `parseFunctionPrelude`), `rules.ts` (`splitDeclarations`, `emptyComma`), `timeline.ts` and `syntax.ts` read CSS text with their own scanners over `grammar.ts`'s `splitTopLevel`. `.b`'s coverage list is met in BBNF; `.x`'s "value.js parses CSS only through the BBNF grammar" additionally needs a `stylesheet.bbnf` (blocks, declarations, at-rule preludes, timeline/range/syntax descriptors) — a path `.x`'s writable set does not carry (`src/css/grammar/*.bbnf`). Ruling wanted: grant `.x` that path, or mint `.b2` before `.x`.
- RES-b-2 — KFA-14 in the SHIPPING parser: discharged in the BBNF grammar (pinned by WPT); the shipping `grammar.ts` still refuses `rgba(255, 0, 0, 0.5)` until `.x` swaps (grammar.ts untouched until `.x`, per this unit's lock). keyframes' timeline cure therefore rides `.x` + a value.js release.
- RES-b-3 — producer rows for bbnf-lang / parse-that (library defects, sibling repos READ-ONLY here): F-b-1 (`BBNFToParserFromFile` stripped `node:path`), F-b-2 (`parseState` logs every failure to `console.error`), F-b-3 (`regexFirstChars` ignores regex flags → case-insensitive alternatives mis-dispatched). Each is designed around idiomatically and documented at its site; each wants a bbnf-lang/parse-that fix and a re-pin, after which the first-letter classes and the `reset()`+`call()` pair can simplify.
- RES-b-4 — divergences the BBNF path introduces vs the shipping parser, for `.h` to classify: channel clamps (PB-03/04 posture) where `grammar.ts` does not clamp; `hsl()/hwb()` bare-number saturation/lightness read as n% (spec) where `grammar.ts` reads `n`; `color-mix()` as a colour scalar in `parseCssScalar`; legacy forms accepted; `calc()` channels resolved; diagnostics `expected` labels differ in places (e.g. `steps(2, constructor)` → `["timing function"]` vs `[]`).
- RES-b-5 — the `concrete` class (a `none` channel in `color(xyz-d50 …)` / `color(display-p3-linear …)`, 38 WPT cells) stays refused because `CssColorSpace` has no member for either space; admitting them needs a widened `CssColorSpace` (a public-type change — an owner/orchestrator call, not `.b`'s).

### X.P.W6.h

Seat `claude-opus-5-5`, 2026-09-23 ~15:30–16:15 EDT. Spec: W6.md §The law + §Units `.h` (read whole). COHESION §0bx/§0by/§0bz and later read to the file end. Consumed: §0v GROUND-C, §0w id-set, §0ab F-w4f-1, §0bx SC-1/SC-2/F-W5c-1/R-b-2.

**Crash-recovery.** ⟨`git status --porcelain`⟩ → nothing inside `.h`'s writable set (`test/css/equivalence/` absent, DIVERGENCE-LEDGER and this record clean). Nothing was inherited. Foreign dirty rows were left untouched: Track A's `demo/**` (15 files), `package.json`/`package-lock.json`, `CARRY-LEDGER.md`, `KF-W13U.md` and `scripts/dev/dev.sh`. The corpus generator reads files AT HEAD so that those rows cannot leak into it.

**Acts, in order.**
1. **Port.** From `evidence/W6/retired-seam/typescript/test/`, VERBATIM into `test/css/equivalence/lib/`: `css-totality/lib/{adjudications,tokens}.mjs` and `css-equivalence/lib/ruled.mjs`. Each gets a header line naming its source and MANIFEST sha. One import path is re-pointed: `ruled.mjs` → `./adjudications.mjs`. Minimal `.d.mts` type files were added. `assay-corpus.json` is the 27,021-row union, byte-identical (`rowsSha256` `e119d81b…`, asserted in-test). Written new: `differential.ts` (the seam's `classifyCell` and RED triggers, incumbent = `src/css/grammar.ts`, candidate = `src/css/bbnf/index.ts`, six entries) and `equivalence.test.ts` (G-h1 plus a falsifier). Not ported: the 4.0.0 oracle tarball and pin (the incumbent is now HEAD's hand parser), `shape.mjs` (the AC-1 registry, so there is no COVERAGE_NARROWING leg), and the ledger emitter.
2. **Full corpus.** `build-corpus.mjs` → `real-corpus.json`, 3,049 distinct sources: value.js demo CSS (100 files → 637), keyframes.js CSS (90 → 578, its HEAD pinned in the file), and value.js tests plus WPT strings (22 → 1,983). It uses postcss. There are 2 `unreadable` sources, both malformed test sheets, and they are counted. ⟨`node test/css/equivalence/build-corpus.mjs --check`⟩ → `real-corpus AGREES … dc07022c… (3049 rows)`.
3. **BEFORE on the `.b` bytes** (`0b2b5d5f`, harness ported, no W6 classes). Assay colour: 140 RED (DIVERGENT_VALUE 93 · MIS_ACCEPT 47). Assay value: 942 RED (ADJUDICATION_UNHONOURED 784 · DV 93 · MA 47 · FALSE_REJECT 18). Real colour: 713 MA. Real value: 37 RED (MA 35 · AU 2). Timing and keyframe selector: 0.
4. **Five mirror-defects cured at the grammar root** → value.js **`c02179fa`**, rowed at DIVERGENCE-LEDGER §15.2 as MD-1..MD-5. MD-1: `number` backtracked to an integer prefix (`0` of `0.15450deg`). MD-2: `numeric` admitted `7.` (PB-12). MD-3: a `var()` fallback with a trailing comma was refused (css-variables-1). MD-4: hsl/hwb bare `n` was read as `n×0.01`, not `n/100`. MD-5: rad was `v×(180/π)`, not `(v×180)/π`.
   - **adjacent edits** (ADJACENT-LINE RULE; the brief's "mirror-defect cured at the .bbnf grammar root"; same concern, a cure `.h` owns): `src/css/grammar/tokens.bbnf:25-27` (`number`) · `src/css/grammar/value.bbnf:18-23,31-32` (`varCall`/`varBody`, `numeric`) · `src/css/bbnf/value.ts:154` (`on("varCall", callValue)`) · `src/css/bbnf/color.ts:61,74-77,89` (`numberIsPercent`) · `src/css/bbnf/math.ts:26-28,45` (`ANGLE` as conversion functions).
5. **Five classes rowed new as mechanism tests** (`w6-classes.ts`, DIVERGENCE-LEDGER §15.3). A class governs only when the repaired source reads not RED under every ruling and, for a widening, the candidate still accepts it. The classes: `ID-2` (17), `GROUND-C` hue face (43; it supersedes ADJ-3's hue reject arm per §0v, and WPT pins the hue to 0), `SC-1` (33), `C5-MIX` (678) and `SC-2` (2). The harness, the corpus and the classes are one commit → value.js **`e046fe43`**.
6. **Ledger** → DIVERGENCE-LEDGER §15, dated, appended (E-3) → value.js **`812daa4b`**.

**Gates (BEFORE → AFTER).**
- **G-h1 MIRROR-DEFECTS** GREEN. BEFORE RED (the harness was absent; once ported it read 140 / 942 / 713 / 37 on the `.b` bytes) → ⟨`npx vitest run test/css/equivalence`⟩ ×2 on `e046fe43` → `Tests 15 passed (15)` both runs. MIRROR-DEFECTS **0** on all 12 corpus × entry cells, both runs. The census lines are byte-identical (`diff` → IDENTICAL). Assay: colour/scalar AGREE 24,437 · DECLARED 2,584. Value/values 23,633 · 3,388. Timing 26,851 · 170. Keyframe 27,021 · 0. Real: colour/scalar 2,284 · 765. Value/values 2,927 · 122. Timing/keyframe 3,049 · 0. The falsifier reads RED on 3 of 3.
- Holds, not `.h` gates, read on the same bytes: ⟨`npx vitest run test/css`⟩ → `Test Files 4 passed (4)` · `Tests 49 passed (49)` (G-b1's 34 still pass, plus 15). ⟨`npx vue-tsc -p tsconfig.test.json --noEmit`⟩ → 0 `error TS`. ⟨`npx vue-tsc -p tsconfig.lib.json --noEmit`⟩ → 0. ⟨`npx eslint --max-warnings=0 src/css test/css`⟩ → exit 0.

**Residuals (not escalations).**
- R-h-1: `parseStylesheet` has no BBNF peer (RES-b-1). F-w4f-1 and R-b-2 carry, ported, but have no cell on the six-entry surface. `.x` re-opens them.
- R-h-3: `var(--a,)` (an empty fallback) is now accepted by the candidate, which is spec-correct, and the incumbent refuses it. No corpus cell carries it; it is rowed at §15.2.
- R-h-4: when files outside this repo change, `real-corpus.json` must be regenerated (`build-corpus.mjs`; `--check` names the drift). The test asserts the file's own `rowsSha256`, so it cannot drift silently.

**Escalations.** None.

Commits (value.js, pathspec, not pushed): `c02179fa` · `e046fe43` · `812daa4b`. This receipt is the next commit.
