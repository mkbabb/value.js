# ARM-B SWEEP — parse-that ASSESSMENT (C19) — 2026-07-19

Scope: repo-vs-published state · tranche-docs state · public-API adequacy for the
full-CSS-grammar program · minor-fix-only candidates (C1 bound) · the `164343c1^`
resurrection-recipe verification · bbnf-lang module-facility inventory (C14).
Firewall honored: value.js `docs/tranches/V/vnext/`, `snapshot-vnext`, `armA` never
read; parse-that's untracked Sol banks INVENTORIED (provenance + headers only), not
ingested.

## 1. Repo state vs published 1.0.0 — IDENTICAL IN CODE

- Repo: `/Users/mkbabb/Programming/parse-that`, branch `master`, HEAD
  `ef10d5b78236c4a30a7bb22a6113b60bdc4bdf42` (matches the L1 §0 tree pin `ef10d5b`).
- Tag `v1.0.0` = `7eab78c` (2026-07-03 16:45 -0400); npm `@mkbabb/parse-that`
  latest = **1.0.0**, published 2026-07-03T20:47Z (`npm view` confirmed live).
- `git log v1.0.0..HEAD` = **exactly ONE commit**, docs-only: `ef10d5b`
  "docs(coordination): VALUEJS-PT-E" (+48 lines, the PT-E letter). Diffstat touches
  only `docs/tranches/A/VALUEJS-PT-E-2026-07-05.md`. **ZERO unpublished code work**
  — published 1.0.0 IS repo HEAD's code, byte-for-byte. What value.js consumes
  from the registry is what is on disk.
- Untracked (uncommitted) working-tree rows: `.gitmodules`, `docs/instructions/`,
  `docs/precepts/`, `docs/tranches/{B,T,U}/`, `rust/.cargo/`, one rustc-ICE txt.
  All docs/meta — no untracked `typescript/src` code.
- Package root: `typescript/` (the repo root has no package.json; `rust/` is the
  legacy Rust arm, out of scope). `typescript/package.json:2-4` =
  `@mkbabb/parse-that 1.0.0`.
- Release line in git: 0.9.1 (`7cb7a51`) → 0.10.0 CSS-removal (`c86a149`) → 0.11.0
  tranche-A close (`afea5c2`) → 0.12.0 "Tranche B" packrat cross-input + fusion +
  SpanParser KILL (`7901314`) → 0.13.0 "Tranche Q" packrat re-entrancy/large-key +
  subTable retract (`2c806fb`) → S.H1 packrat armed (`934b2fa`) → S.H2 `*Span`
  excision + chain() falsy-seed fix C-16 (`043c4d1`) → S.H4 1.0.0 cut (`7eab78c`).

## 2. Tranche docs state

**Committed:** `docs/tranches/A/` only — A.md, PROGRESS.md, waves/, PT-E letter.
`PROGRESS.md:3`: opened 2026-06-18, **CLOSED + PUBLISHED 2026-06-19 → 0.11.0**;
108 tests, tsc 0. NOTE a doc/history asymmetry: git-history "Tranche B (0.12.0)"
and "Tranche Q (0.13.0)" were single-commit tranches with NO docs/tranches dirs of
their own; only A has a committed doc tree.

**The PT-E letter** (`docs/tranches/A/VALUEJS-PT-E-2026-07-05.md`, committed
`ef10d5b`) — the standing value→parse-that channel, verified intact:
- PT-E1 (HIGH): scoped per-parse diagnostics — cures value's structurally-dead
  `ParseDiagnostic.expected`; value KEEPS authoring messages + KEEPS the field as
  the forward seam (letter lines 29, 33-41). No parse-that defect asks — value's
  consumption verified clean, packrat 82 ns/parse (line 20-23).
- PT-E2 (MED): `Parser<any>` combinator-inference leak tightening (line 30).
- PT-E3 (record): Pratt stays DORMANT; value will not pull the calc() fold (line 31).

**Untracked B/T/U — the Sol/Codex 2026-07-18/19 banks (PROVENANCE-FLAGGED, not
ingested):** all mtimes 2026-07-18 14:47–2026-07-19 03:44. `B/README.md:1-10`
self-describes as "uncommitted research bank … 2026-07-18 **Sol** hostile-pair and
adjudication work produced **while forming value.js V-next**; does not authorize
implementation" (+ `BANKED-VNEXT-SOL-RESEARCH-2026-07-18.md`, two pt-e-bbnf
handoff/coordination artifacts, 2 prototypes). `T/` = "invocation truth prototype
bank", status "THREE FALSIFIED PROTOTYPES; CLEAN-BREAK V4 AUTHORIZED IN ISOLATION"
(T/README.md:3-5), waves W0–W7, invocation-kernel v1–v4 prototypes,
`VALUE-VNEXT-COORDINATION.md`, `MAJOR-PORTFOLIO.md` (mtime 07-19 03:44 = latest
activity). `U/` = "checked kernel, canonical regex, real consumers", status
"FORMED; born RED" (U/U.md:3), waves W0–W9, Rust-substrate/PT-K scope. These are
the Codex-corpus arm inside parse-that: uncommitted, self-declared
no-source-authority, and per C1 their entire subject matter (runtime rework, Rust
kernel, regex canon) belongs to the separate BBNF session — NOT this tranche.
Letter-collision nit: untracked `docs/tranches/B` re-uses the letter of the
git-historical "Tranche B (0.12.0)".

## 3. Public API surface — ADEQUATE for the CSS restoration, as published

Exports map (`typescript/package.json:8-33`): exactly `.` / `./core` /
`./diagnostics` / `./packrat` / `./utils`, each with types+import+require —
matches P1.6's stated surface. Vite multi-entry confirms
(`typescript/vite.config.ts:14-20`); source entries live at
`typescript/src/parse/{index,core,diagnostics,packrat-entry,utils-entry}.ts`.

**Combinator coverage** (`src/parse/parser.ts`, 711 LOC): instance combinators
`then/or/chain/map/mapState/skip/next/opt/not/minus/peek/lookAhead/wrap/trim/
many(min,max)/sepBy(min,max)/eof/recover(sync,sentinel)/debug` + `static lazy`
(parser.ts:81-702). Leaves (`src/parse/leaf.ts`): `eof, any, dispatch, all,
string, regex, trimStateWhitespace, whitespace` — `dispatch()` charCode
first-byte tables (leaf.ts:100), `string()` charCodeAt fast paths (leaf.ts:276),
whitespace trim = charCode scan loop (leaf.ts:372-391). Balanced-split helpers
`containsDelimiter/splitBalanced` (split.ts) + json/csv domain parsers. This is a
superset of what the deposed value grammar used at v3.1.0 — sequencing,
alternation w/ furthest-error merge, repetition, separation, wrapping, recovery,
lazy recursion all present. **Sufficient for the full-CSS-grammar restoration
with zero novelty.**

**State architecture**: zero-copy `Span`/`SecondarySpan` on mutable `ParserState`
(`src/parse/state.ts`, 189 LOC; `expected?: string[]` at state.ts:43) — confirms
P1.6's "spans are the core state architecture, not a variant". The `*Span`
builder variant is gone (excised `043c4d1`; root barrel comment index.ts:10-12;
gate `proof:no-span-surface`).

**Diagnostics** (`./diagnostics` → src/parse/diagnostics.ts): furthest-offset
`mergeErrorState` + label/expected-set accumulation (utils.ts:22-44), `Diagnostic`
shape with `expected: string[]` (utils.ts:84-89), plus the opt-in collected buffer
(`enable/disableDiagnostics`, `collectDiagnostic`, `get/clearCollectedDiagnostics`).
CAVEAT (= the standing PT-E1 gap, unchanged): the enable toggle + collected buffer
are MODULE-GLOBAL, not per-parse-scoped; value's authored messages still have no
scoped producer path to a consumer. Adequate for restoration (value shipped
v1.0.0→v3.1.0 on exactly this); inadequate only vs the PT-E1 ask, which is
1.1-class evolution owned by the BBNF session (C1/C15).

**Left-recursion / Pratt**: opt-in packrat = Warth-Douglass-Millstein
packrat-with-left-recursion, (id,offset)-keyed (packrat.ts:6-45; soundness fix
`193854d`; re-entrancy + >1MB-key fixes 0.13.0), armed lazily via the
`PACKRAT_ARMED` epoch latch (packrat.ts:137-156 — `memoize()` costs nothing until
first use). **Pratt: zero code in the TS tree** (`grep -ri pratt` = 0 hits) —
dormant by record (PT-E3, S.H3 RETIRED), exactly as L1 §2 requires. CSS grammar
needs neither; both are correctly out of this tranche's way.

**Perf posture**: `proof:perf` born-RED gate over the BUILT dist
(scripts/proof-perf.mjs:1-31): (A) fusion zero-intermediate-tuple + retained-heap,
(B') dispatch ≥floor faster than `any()` on the REAL CSS function-name corpus —
the gate is literally anchored to value.js's application shape, (C) json
regression vs checked-in baseline (>15% reds). Baseline
`scripts/perf-baseline.json`: 1742.455 ns/parse json-comprehensive, dispatch
speedup +38.12%. 10 proof:* gates aggregate under `proof:all`
(package.json:41-52). PT-E letter line 21: packrat arming measured **82 ns/parse**
in value's service. Perf posture is measured-in-service, gate-guarded — no
restoration-side risk.

## 4. MINOR-FIX-ONLY candidates (C1: no novelty; C15: never >1.1)

Ranked; all optional — NONE blocks R-PARSER, which should pin published `^1.0.0`
untouched:
1. **NONE REQUIRED** is the headline: 1.0.0 as published is sufficient for the
   restoration; the deposed value tree consumed strictly less surface than exists.
2. IF the restored grammar trips the PT-E2 `Parser<any>` widening: a typing-only
   generic-flow tightening in parser.ts combinator signatures qualifies as a
   patch-class fix (1.0.x). Fallback needing zero parse-that motion: consumer-side
   explicit annotations, value's historical practice.
3. IF re-entrant parsing (value parsing inside a `.map`) trips the module-global
   collected-diagnostics buffer: a scoping guard is a fix-class change — but the
   FULL scoped-diagnostics design (PT-E1) is BBNF-session territory; do not smuggle
   it in as a "fix".
4. Nit (record-only, no motion): `export let whitespace` initialized by a
   top-level `_initWhitespace()` call at parser.ts:711 — a module side effect
   under `sideEffects:false` (package.json:6). Correct in practice (every entry
   pulls parser.js); flag only if a bundler ever tree-shakes it wrong.
5. Doc nit (no publish): the PT-E letter's placement note invites re-homing into a
   coordination inbox if one opens — the untracked Sol banks already violate the
   A-dir convention; a committed `docs/coordination/` decision row belongs to the
   BBNF session.

## 5. The `164343c1^` resurrection recipe — VERIFIED INTACT in value's git

`164343c1^` = `a992b8e61084b3b2d9c9a7218bc6cec98ecb2b8a` (2026-07-17 03:09 -0400,
"docs(V′ · formation): CONVERGED").
- `git ls-tree -r 164343c1^ -- src/parsing` → **19 files**: CLAUDE.md, index.ts,
  animation-shorthand.ts, math.ts, syntax.ts, units.ts, utils.ts,
  color/{color-unit,color,index,relative-color}.ts,
  stylesheet/{extract,index,serialize,stylesheet-types,stylesheet}.ts,
  timeline/{easing,index,scroll-timeline}.ts. (Note: relative-color.ts and the
  timeline grammar are IN the deposed tree — R-RELATIVE/R-SPRING-GRAMMAR have
  in-tree prior art.)
- `bench/` at `164343c1^` → **11 files** incl. `bench/css-parse-perf.mjs`
  (119 lines; header "O.W6 — CSS-parse throughput bench (MEASURE-FIRST)"; MB/s +
  ns/call structured baseline; consumed by the gate). Matches P1.1's "11 benches".
- The ratio gate exists at `164343c1^:scripts/gates/proof-perf-target.mjs`, wired
  as `proof:perf-target` in `test:dist` (pre-cut package.json:86,93).
- Dependency pin at `164343c1^:package.json`: `"@mkbabb/parse-that": "^1.0.0"` in
  `dependencies` — the historical pin convention L1 §2 cites, ready to re-add
  (subject to the P4.2/P3.2 deps-block STRIP ruling: parse-that is a REAL runtime
  dep, unlike the glass/kf bomb rows — the manifest gate must whitelist it).

## 6. bbnf-lang restart/ glance — the C14 module facilities EXIST (inventory only)

Repo `/Users/mkbabb/Programming/bbnf-lang`, master HEAD `af15f63e0` (sk-v25
re-adjudication packet; note it POSTDATES the L1 pin `b3cf48e3b` = sk-v24 second
pause — the pin is one commit stale). Last-3-days activity = `restart/skinny/
tranches/sk-v25/` (CAMPAIGN-STATE, TRANCHE-PORTFOLIO, APOTHEOSIS, LOCK-
CONSTITUTION, graph/P3.* seats) + sk-v24 research (R3/R4 = parse-that rust/ts).
- **The module facility C14 references is REAL and TWO-FORM**, live in grammar
  source: named imports `@import { type_name } from "types" ;`
  (grammar/bbnf/expressions.bbnf:3, grammar/bbnf/bbnf.bbnf:4-5) and whole-file
  imports `@import "value-unit.bbnf" ;` (grammar/css/l4/color.bbnf:1); the import
  production itself is in the bootstrap grammar (bbnf.bbnf:58 `import_path`).
- **A split CSS L4 sub-grammar suite ALREADY EXISTS**: `grammar/css/l4/` = 15
  modules (tokens, value-unit, values, func-body, color, easing, filters,
  gradients, keyframes, keywords, media, properties, selectors, stylesheet,
  transforms) wired by `@import` (stylesheet.bbnf:1-3 imports properties/
  selectors/media; gradients imports color). C14's "idiomatic BBNF using the bbnf
  repo's module facilities to split sub-grammars" has a working in-repo exemplar —
  the dual-definition prototype can start from it rather than invent structure.
- Governance context (inventory): restart/locks/LOCKS.md carries the standing
  lock set (tape-substrate reframe; no god directories; full grammar
  generalisation — zero grammar-specific code in generic crates incl.
  `parse-that`/`parse-that-regex`). sk-v25's `af15f63e0` message: "Codex/Sol-Luna
  transposition; parse-that first; VALUEJS-PT-E alive" — bbnf's own next campaign
  already ranks parse-that first and tracks PT-E, consistent with C1's separate
  BBNF session owning all evolution.

## 7. Bottom line

Published 1.0.0 = repo HEAD code exactly; one docs commit (PT-E) is the whole
delta. The API surface (5 subpaths; full combinator set; span state; charCode
leaves; opt-in WDM packrat-LR; measured perf gates anchored to value's own CSS
corpus) is ADEQUATE AS-IS for the full-CSS-grammar restoration — R-PARSER should
consume registry `^1.0.0` with zero parse-that motion; the minor-fix list is
contingency-only. The resurrection recipe (19-file src/parsing tree + 11-file
bench corpus + proof-perf-target gate + the ^1.0.0 pin) is fully intact at
`164343c1^` = `a992b8e6`. The untracked Sol banks (B/T/U) inside parse-that are
Codex-corpus research with self-declared zero source authority — route their
subject matter to the BBNF session, never into this tranche. BBNF's `@import`
module facility + an existing 15-module CSS L4 grammar split satisfy C14's
substrate premise.
