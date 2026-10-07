SERVED MODEL: claude-opus-5-5

# X.P.W8 — execution record (CSS value conformance sweep, Track D)

Spec: `docs/tranches/X/parse-that/waves/W8.md` (minted 2026-09-25, COHESION §0ef). Authority: §0ef · §0eq · W7.md ADDENDA (g)–(k) · the X.P.W7 record's `.gap`/`.gap2` receipts (method). Owner law: CSS grammar only in BBNF (2026-09-23); bbnf-lang and parse-that READ-ONLY; emitter defects are producer rows.

## Open (2026-10-07, seat 0, `claude-opus-5-5`, Track D)

- **Mode:** fresh open. ⟨`grep -n "X.P.W8" LEDGER.md`⟩ → row 108 `MINTED 2026-09-25; opens after X.P.W7 CLOSED`; no prior record existed.
- **Opens after: X.P.W7 CLOSED — HOLDS.** ⟨LEDGER row 106⟩ → `CLOSED 2026-09-17 (honest-RED: L-G1 Firefox whole parseCssScalar UNREAD ×2 → X.P.W8 close; …)`, Check 1 of the RESUME 8 Close `9949dd63a` (HEAD). The carried cell (Firefox whole `parseCssScalar`, UNREAD ×2) is owed by THIS wave's close read (W7.md ADDENDUM (k) 2–3).
- **Rulings cited (never re-opened):** §0ef (W8 minted; W7 bytes frozen at `08331dfa`; L-G1 re-read at W8's close) · §0eq / ADDENDUM (k) (the close's L-G1 ×2 is an independent read in an owner+orchestrator window: AC power, lid open, sibling fleets idle; 1-min load < 8; checks AUDIT the banked read) · ADDENDUM (g) (equal-work `large-eq` cell of record; no noise band) · §0eo (nothing durable in /tmp: the WPT fetch cache, any worktree and bench records go under `.worktrees/` / `bench/records/` / `docs/tranches/X/evidence/**`) · owner 2026-09-23 (BBNF only) · Opus-only (2026-09-23). No owner-gated item in W8's scope is unruled. `npm publish` is not this wave's act.
- **Product bytes at open:** ⟨`git diff --stat 08331dfa HEAD -- src test/css bench/paired bench/corpus bench/css-equivalence package.json package-lock.json`⟩ → empty: the open inherits W7's frozen `08331dfa` (emission sha256 `96c3fa63…`). parse-that ⟨`git log --oneline -1`⟩ → `cb9c0d4` (unmoved).
- **Crash recovery:** ⟨`git status --porcelain src test bench scripts docs/tranches/X/execution/D docs/tranches/X/parse-that`⟩ → only ` M scripts/dev/dev.sh` (unowned, never touched). Nothing in the writable set is dirty; no inherited work.
- **Host at open:** ⟨`sysctl -n vm.loadavg`⟩ → `{ 366.92 399.26 373.27 }` then `{ 336.54 378.47 370.60 }`; ⟨`pmset -g batt`⟩ → battery, 37 %, discharging. No timing gate is read or claimed at this open.
- **Mail (E13 Step-0, four paths).** Newest glass tranche dir ⟨`ls -t glass-ui/docs/tranches | head -3`⟩ → `BL BK BJ` (BL has no `coordination/`; swept with BK/coordination). ⟨`find <path> -maxdepth 1 -type f -newer INBOX.md`⟩ → 0 on value `V/`, `V/coordination/`, glass `BK/coordination/`, keyframes `V/coordination/`, atlas `P/coordination/`; glass `BL/FORMATION-PROGRESS.md` only (glass's own formation log; its value.js lines are O-87/O-88/O-89 already rowed; nothing new addressed to value.js). ⟨`grep -cE "\| *UNREAD *\|" INBOX.md`⟩ → `0`. **0 UNREAD**; a dated sweep line appended to INBOX.md.

## Baseline (BEFORE, read-only, 2026-10-07; product bytes = `08331dfa`)

| Gate | Command | Read | Verdict |
|---|---|---|---|
| **V-C** (WPT conformance) | (instrument lands at `.c`) | no vendored value-module WPT corpus exists: `test/css/wpt/` holds only the 9 css-color files (`wpt-cases.ts`, WPT `5a5b2b59…`) | **RED by absence** (born-RED; `.c` builds it, families cure it) |
| Named miss 1 (grid) | ⟨`npx vite-node probe.ts` → `parseCssValue("[top]auto[stage]1fr[bottom]auto")`⟩ | `{"ok":false,…"code":"css_syntax","start":0,"end":31,…}` | **RED** → `.g` |
| Named miss 2 (attr) | `parseCssValue("attr(data-x type(<length>))")` | `{"ok":false,…"start":0,"end":27,…}` | **RED** → `.v` |
| Named miss 3 (images) | `parseCssValue("element(#a)")` | `{"ok":false,…"start":8,"end":10,"actual":"#a"}` | **RED** → `.i` |
| Named miss 4 (urange) | `parseCssValue("U+0025-00FF")` | `{"ok":false,…"start":0,"end":11,…}` | **RED** → `.f` |
| Named miss 5 (custom-ident) | `coerceToSyntax('"a"' / '*' / '[a]', "<custom-ident>")` | all three `{"ok":true,…"type":"keyword",…}` | **RED** (accepted; must refuse) → `.x` |
| test/css | ⟨`npx vitest run test/css`⟩ | `Test Files 9 passed (9) · Tests 111 passed (111)` | GREEN (stay-GREEN) |
| L-G3 | ⟨`grep -rln "instrument\|__prof\|PC\[\|NOW()" src/css/bbnf/generated \| wc -l`⟩ | `0` | GREEN (stay-GREEN) |
| test:css-equivalence | ⟨`npm run -s test:css-equivalence`⟩ | `Test Files 2 passed (2) · Tests 19 passed (19)`; `STYLESHEET DEFECTS 0` | GREEN (stay-GREEN) |
| L-G2 · prefix · E-4 `--check` · E-2 audit · size · vue-tsc · eslint · build | banked (bytes identical to `08331dfa`, diff empty above) | `.gap2` receipt: L-G2 396 ×2 (92 + §18 163 + §18-A 141, named) · prefix 0 ×2 · `--check` current `96c3fa63…` · audit violations 0 · 98,922 B / 13,786 B gz (ceilings 125,646 / 14,517) · vue-tsc 0/0 · eslint 0 · build OK | GREEN (cited, not re-run: host load ~370, bytes unchanged) |
| L-G1 ×2, four engines | (close, owner+orchestrator window) | not read | owed at close (§0eq); includes W7's carried Firefox whole `parseCssScalar` cell |

Probe (disposable, scratchpad): imports `src/css/index.ts`, prints each result's first 120 chars. **greenBeforeCure: none** — every born-RED form measured RED; the stay-GREEN gates are GREEN by design (not born-RED).

## Unit plan (2026-10-07)

Serial, one unit at a time (every grammar unit modifies `src/css/grammar/value.bbnf` + the re-emission, `CHANGELOG`, the DIVERGENCE-LEDGER and `test/css/**`, so no two may run concurrently). Order per W8.md §Units, with `.v`'s scope split into `.v` + `.t` by module family (W8.md: "the open seat may split them by module family"): **`.c` → `.g` → `.v` → `.t` → `.i` → `.f` → `.x`**, then the workflow's close seat (V-C GREEN ×2 + stay-GREEN), then L-G1 ×2 in the owner+orchestrator window (§0eq), then the check. Every seat Opus 5.5. An ESCALATED unit does not halt the wave.

**Common method (every grammar unit; the `.gap`/`.gap2` receipts):** emitter pinned — `node_modules/@mkbabb/bbnf-lang` (0.1.4) moved aside, the bbnf-lang worktree `typescript/` at `f0059db14` linked for the unit's life and restored after (`0.1.4` re-verified); `node scripts/gen-grammar.mjs --check` → current before any change; cure in BBNF (`src/css/grammar/*.bbnf`) with actions in `src/css/bbnf/**`, re-emit; falsifiers in `test/css/**` RED-before (on a `git archive` copy of the prior `src/`) → GREEN ×2; L-G2 ×2 re-read with every new delta row a named class (DIVERGENCE-LEDGER §19+, dated, beside) and a repair class in `bench/css-equivalence/w6-classes.ts` where a differential cell exists; prefix 0 ×2 (corpus never regenerated, E-3); L-G3 0; `--check` ×2; `bench/paired/audit.mjs` 0; size ≤ ceilings 125,646 / 14,517; css-equivalence 19/19 MIRROR-DEFECTS 0; vue-tsc 0 · eslint · build. No timing claim. Durable paths only (§0eo). Each family turns its module's V-C misses to 0 or rows each remaining miss as a ruled out-of-scope row with its spec reason; `src/css/serialize.ts` is touched only under the §0bt adjacent-line rule, else a named serialization-difference row.

| unit | spec sections | writable | gates | locks |
|---|---|---|---|---|
| `.c` | W8.md §Scope 1–2 (L13–16) | `test/css/wpt-values/**` (new: vendored WPT files + sha pins, extraction script, dated JSON), `bench/wpt-conformance/**` (new: V-C instrument + ruled-row file), `docs/tranches/X/parse-that/DIVERGENCE-LEDGER.md` | V-C instrument runs, born RED with per-module miss counts ×2; test/css 111 stays GREEN | E-3 (vendored bytes + dated JSON immutable once committed) |
| `.g` | §Scope 1 css-grid-2, §3 miss 1 | `src/css/grammar/*.bbnf`, `src/css/bbnf/**`, `test/css/**`, `bench/**`, DIVERGENCE-LEDGER, `CHANGELOG.md` | V-C grid misses 0 (or ruled); `[top]auto[stage]1fr[bottom]auto` GREEN; common stay-GREEN | grammar + re-emission + falsifiers one commit |
| `.v` | §Scope 1 css-values-4 (math/url/attr/units), css-variables-1, css-syntax-3; §3 miss 2 | same as `.g` | V-C values/variables/syntax misses 0; `attr(data-x type(<length>))` GREEN | same |
| `.t` | §Scope 1 css-transforms-2, css-easing-2, css-color-5 | same as `.g` | V-C transforms/easing/color misses 0 | same |
| `.i` | §Scope 1 css-images-4; §3 miss 3 | same as `.g` | V-C images misses 0; `element(#a)` GREEN | same |
| `.f` | §Scope 1 css-fonts-4 `<urange>`; §3 miss 4 | same as `.g` | V-C fonts misses 0; `U+0025-00FF` GREEN | same |
| `.x` | §Scope 3 miss 5 | `src/css/syntax.ts` (named by §Scope 3), `src/css/bbnf/**`, `src/css/grammar/*.bbnf`, `test/css/**`, `bench/**`, DIVERGENCE-LEDGER, `CHANGELOG.md` | `coerceToSyntax` refuses `"a"`, `*`, `[a]` as `<custom-ident>`; V-C total misses 0 or ruled; stay-GREEN | same |

**Close (workflow close seat, not a unit):** V-C GREEN ×2 (every case accepted+round-tripped or refused, or a ruled row), stay-GREEN set (§Scope 4), then L-G1 ×2 on all four engines (accepted · rejected · `large-eq`; whole `large` INFO) ONLY at 1-min load < 8 in an owner-provided window (AC, lid open, fleets idle), load per rep; never claim an unread cell; includes W7's carried Firefox whole `parseCssScalar` cell.

## Unit receipts


### .c (2026-10-07, `claude-opus-5-5`) — corpus + gate V-C, born RED ×2

- **Crash recovery:** ⟨`git status --porcelain test/css bench docs/tranches/X/execution/D docs/tranches/X/parse-that`⟩ → nothing dirty in the writable set; no inherited work.
- **Pin:** WPT `5a5b2b591b39c59d5bca77819db305474dcfd18a`, the commit `test/css/wpt/` already pins (cross-check: fetched `color-valid.html` sha `55f5c21f…`, `color-invalid-rgb.html` `1552dc83…` = `wpt-cases.ts` pins). Fetch cache durable (§0eo): `~/.cache/wpt/` (blobless tree listing `5a5b2b59/`, raw files `raw/`), 230 name-candidates (`*valid*`/`*invalid*` .html in the nine modules, minus crashtests/tentative), 0 fetch failures.
- **Act 1 — vendor** ⟨`node test/css/wpt-values/vendor.mjs ~/.cache/wpt/raw`⟩ → `vendored 159 files at WPT 5a5b2b59…` (+ `LICENSE.md`); per module: css-color 26 · css-easing 2 · css-fonts 54 · css-grid 22 · css-images 18 · css-transforms 17 · css-values 20 · **css-variables 0 · css-syntax 0** (their 5 name-matching files call neither harness function — recorded in LEDGER §19, not ruled). sha256 per file in `pins.json`.
- **Act 2 — extract** ⟨`node test/css/wpt-values/extract.mjs 2026-10-07`⟩ ×2 → `6267 cases from 159 files → cases-2026-10-07.json`, sha256 `5148910ca0d0144e…` both runs (deterministic). wpt-cases.ts idiom: inline scripts executed with the two recorders in scope, any other free identifier an inert stub; 0 files threw, 0 files yielded zero cases.
- **Commit** `16759408e` — test(X.P.W8.c): the vendored corpus (164 files).
- **Act 3 — V-C instrument** `bench/wpt-conformance/conformance.ts` (`npx vite-node bench/wpt-conformance/conformance.ts [--misses <module>|all]`): valid → `parseCssValue` accepts AND `serializeCssValue` equals one of WPT's expected forms; invalid → refused; misses classed refused / serialization / serialize-error / accepted; a miss clears only by a row in `ruled.json` (exact file+kind+property+input with class, reason, spec — HALT on a row missing any); a row naming no miss is STALE and fails; exit 1 on any unruled miss or stale row. `ruled.json` born EMPTY (no allowlist of owed misses). Not a `*.measure.test.ts`, so `test:css-equivalence` is unchanged. DIVERGENCE-LEDGER §19 (dated, beside) records the instrument and the ruled-row law.
- **Commit** `f1e753872` — bench(X.P.W8.c): instrument + ruled.json + LEDGER §19.
- **V-C read ×2** ⟨`npx vite-node bench/wpt-conformance/conformance.ts`⟩ → exit 1 both reads; the two outputs `diff` IDENTICAL:

| module | cases | pass | ruled | refused | serialization | serialize-error | accepted | MISS |
|---|---|---|---|---|---|---|---|---|
| css-color | 1810 | 546 | 0 | 143 | 716 | 0 | 405 | 1264 |
| css-easing | 35 | 17 | 0 | 0 | 5 | 0 | 13 | 18 |
| css-fonts | 897 | 262 | 0 | 0 | 403 | 0 | 232 | 635 |
| css-grid | 669 | 262 | 0 | 10 | 69 | 0 | 328 | 407 |
| css-images | 1829 | 41 | 0 | 1 | 1443 | 0 | 344 | 1788 |
| css-transforms | 231 | 78 | 0 | 0 | 80 | 0 | 73 | 153 |
| css-values | 796 | 282 | 0 | 10 | 2 | 0 | 502 | 514 |
| **TOTAL** | **6267** | **1488** | **0** | **164** | **2718** | **0** | **1897** | **4779** |

  `V-C RED: 4779 unruled misses, 0 stale ruled rows` — **born RED** (BEFORE: RED by absence → AFTER: RED measured, per module). Largest single file: `gradient-interpolation-method-valid.html` 1,398 serialization misses (e.g. `red` → product `rgb(255 0 0)`; `calc(0deg + 100%)` vs WPT's `calc(100% + 0deg)`).
- **Stay-GREEN:** ⟨`npx vitest run test/css`⟩ → `Test Files 9 passed (9) · Tests 111 passed (111)` (BEFORE 111 → AFTER 111). ⟨`npm run -s test:css-equivalence`⟩ → read 1: `19 passed (19)` but `Errors 1 error` = `[vitest-worker]: Timeout calling "onTaskUpdate"` (RPC timeout at host load ~240–350; my bytes touch no product/equivalence file); read 2: `Test Files 2 passed (2) · Tests 19 passed (19)`, MIRROR-DEFECTS 0, STYLESHEET DEFECTS 0, exit 0 → GREEN.
- **Adjacent edits:** none. **Escalations:** none.
- **Residuals (owed to families, not to `.c`):** all 4,779 misses (`.g` grid · `.v` values · `.t` transforms/easing/color · `.i` images · `.f` fonts · `.x`). Note for the families: a large share is serialization policy (named colours → `rgb()`, calc term order, colour-space forms) and property-grammar refusals a generic value parser cannot make (`accepted` 1,897) — each is a BBNF cure or a ruled row with its spec reason, per W8.md §Scope 2. css-variables-1 / css-syntax-3 yield 0 V-C cases at this pin; their coverage (if any) is `.v`'s to source.
