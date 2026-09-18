# ARM-B SWEEP — parse-that ASSESSMENT (C19) — 2026-07-19 (Opus union pass)

Scope: repo-vs-published state · tranche-docs state · public-API adequacy for the
full-CSS-grammar program · minor-fix-only candidates (C1 bound: no novelty; C15:
never >1.1) · the `164343c1^` resurrection-recipe verification · bbnf-lang
module-facility inventory (C14).

METHOD: UNION of the archived Fable-r1 pass (`fable-era/sweep-parse-that.md`) with a
fresh independent verification. Every load-bearing r1 claim re-checked against the
live tree/git THIS pass; survivors adopted, divergences marked **FABLE-r1-vs-now**.
Independence firewall honored (value.js `vnext/`, `snapshot-vnext`, `armA` never
read). The untracked B/T/U Sol/Codex banks inside parse-that are INVENTORIED by
provenance header only — never ingested into this formation (C16).

**Verdict up front:** published `@mkbabb/parse-that@1.0.0` == repo HEAD code
byte-for-byte; the API surface is ADEQUATE AS-IS for the full-CSS-grammar
restoration with ZERO novelty; R-PARSER should pin registry `^1.0.0` and touch no
parse-that source. Every r1 claim I re-verified is CONFIRMED; none refuted.

---

## 1. Repo state vs published 1.0.0 — IDENTICAL IN CODE [CONFIRMED]

- Repo `/Users/mkbabb/Programming/parse-that`, branch `master`, HEAD
  `ef10d5b78236c4a30a7bb22a6113b60bdc4bdf42` (matches L1 §0 pin `ef10d5b`).
- Tag `v1.0.0` = `7eab78c89961001a689952c091fdbbf64af735da`. `npm view
  @mkbabb/parse-that`: version **1.0.0**, `dist-tags.latest=1.0.0` (live, verified).
- `git log v1.0.0..HEAD` = **exactly ONE commit**, docs-only: `ef10d5b`
  "docs(coordination): VALUEJS-PT-E". `git diff --stat v1.0.0..HEAD` = single file
  `docs/tranches/A/VALUEJS-PT-E-2026-07-05.md` +48. **ZERO unpublished code.**
  Published 1.0.0 IS repo HEAD's code, byte-for-byte; what value.js pulls from the
  registry is what is on disk.
- Package root = `typescript/` (repo root has no package.json; version 1.0.0;
  `sideEffects:false`). `rust/` is the legacy Rust arm, out of scope (carries a
  rustc-ICE txt + untracked `.cargo/`).
- Untracked working-tree rows (all docs/meta, NO source): `.gitmodules`,
  `docs/instructions/`, `docs/precepts/`, `docs/tranches/{B,T,U}/`, `rust/.cargo/`,
  one rustc-ICE txt (confirmed via `git status --short`).
- Release line (git): 0.9.1 → 0.10.0 (CSS-removal) → 0.11.0 (tranche-A close) →
  0.12.0 (git-"Tranche B": packrat cross-input + fusion + SpanParser KILL) → 0.13.0
  (git-"Tranche Q": packrat re-entrancy/large-key) → S.H1 packrat armed → S.H2
  `*Span` excision + chain() falsy-seed fix → S.H4 1.0.0 cut (`7eab78c`). Tags:
  v0.3.1/v0.9.0/v0.12.0/v0.13.0/v1.0.0 + parse-that-v1a/v1b/v1c-done +
  pre-modernization.

## 2. Tranche docs state [CONFIRMED]

- **Committed tranche tree = `docs/tranches/A/` ONLY** — A.md, PROGRESS.md, waves/,
  the PT-E letter. `PROGRESS.md:3`: opened 2026-06-18, **CLOSED + PUBLISHED
  2026-06-19 → `@mkbabb/parse-that@0.11.0`**; 108 tests; tsc 0; branch `tranche-a`.
- Doc/history asymmetry (unchanged from r1): git-"Tranche B (0.12.0)" and
  git-"Tranche Q (0.13.0)" were single-commit tranches with NO committed docs dir;
  only A has a doc tree. Letter-collision nit persists: the untracked
  `docs/tranches/B` re-uses the git-historical "Tranche B" letter.
- **PT-E letter** (`docs/tranches/A/VALUEJS-PT-E-2026-07-05.md`, committed `ef10d5b`)
  — the standing value→parse-that channel, verified intact this pass:
  - Header: "From the value.js Tranche S orchestrator (item W1-9) · To
    @mkbabb/parse-that"; "Written to STAND ALONE"; "**No defect asks.**"; dispatched
    as value.js published 3.0.0.
  - **PT-E1 (HIGH):** scoped per-parse diagnostics — cures value's structurally-dead
    `ParseDiagnostic.expected`; unlocks kf `ResolvedKeyframes.diagnostics` downstream.
    value KEEPS authoring messages + KEEPS the `expected` field as the forward seam.
  - **PT-E2 (MED):** `Parser<any>` combinator-inference leak tightening
    (`parse-that-audit §4.2`).
  - **PT-E3 (record, NOT an ask):** Pratt stays DORMANT; value will NOT pull the
    calc() 2-tier fold ("does not clear a KISS/DRY bar"); S.H3 consume-edge fires only
    if parse-that presents a sketch.
  - Good-news line: value's consumption verified clean; packrat arming = **82
    ns/parse** realized win; `^1.0.0` re-pin shipped as value 2.0.1 (`a7eabcc`).
- **Untracked B/T/U — Sol/Codex 2026-07-18/19 banks (PROVENANCE-ONLY, NOT ingested):**
  - `B/README.md`: "uncommitted research bank … 2026-07-18 **Sol** hostile-pair and
    adjudication work produced **while forming value.js V-next** … does not authorize
    implementation."
  - `T/README.md`: "invocation truth prototype bank"; status "THREE FALSIFIED
    PROTOTYPES; CLEAN-BREAK V4 AUTHORIZED IN ISOLATION"; waves W0–W7.
  - `U/U.md`: "checked kernel, canonical regex, real consumers"; status "FORMED; born
    RED"; T owns the JS/TS definition algebra, U begins from it (waves W0–W9,
    Rust-substrate scope).
  - **Ruling (unchanged):** these are the Codex-corpus arm INSIDE parse-that —
    uncommitted, self-declared zero source authority. Their subject matter (runtime
    rework, Rust kernel, regex canon) is BBNF-session territory per C1 — NOT this
    tranche. Route, never merge.

## 3. Public API surface — ADEQUATE for the CSS restoration, as published [CONFIRMED]

- **Exports map** (typescript/package.json): exactly `.` / `./core` / `./diagnostics`
  / `./packrat` / `./utils`, each types+import+require — matches P1.6 surface.
- **Combinator coverage** (`src/parse/parser.ts`, 711 LOC — line-anchored this pass):
  instance combinators `then`(:81) `or`(:105) `chain`(:124) `map`(:146)
  `mapState`(:162) `skip`(:189) `next`(:212) `opt`(:234) `not`(:251) `minus`(:309)
  `peek`(:339) `lookAhead`(:365) `wrap`(:392) `trim`(:480) `many(min,max)`(:523)
  `sepBy(sep,min,max)`(:569) `eof`(:638) `recover(sync,sentinel)`(:653) `debug`(:690)
  + `static lazy`(:702). Leaves (`src/parse/leaf.ts`, 399 LOC): `eof`(:11) `any`(:28,
  variadic) `dispatch`(:100, charCode first-byte table) `all`(:154) `string`(:276,
  charCodeAt fast path) `regex`(:317) `trimStateWhitespace`(:372). Balanced-split
  helpers in split.ts + json/csv domain parsers under `src/parse/parsers/`. **Strict
  superset of what the deposed value grammar (v3.1.0) used** — sequencing, alternation
  w/ furthest-error merge, repetition, separation, wrapping, recovery, lazy recursion
  all present. Sufficient for full-CSS restoration with zero novelty.
- **State architecture** (`src/parse/state.ts`, 189 LOC): zero-copy Span on mutable
  `ParserState`; `expected?: string[]` at state.ts:43 (furthest-offset model). The
  `*Span` builder variant is gone (excised at S.H2). Confirms P1.6 "spans are the
  core state architecture, not a variant."
- **Diagnostics** (`./diagnostics` = a 14-line barrel re-exporting from utils.ts):
  `mergeErrorState`, `enableDiagnostics`, `disableDiagnostics`, `collectDiagnostic`,
  `getCollectedDiagnostics`, `clearCollectedDiagnostics` + `Diagnostic/Suggestion/
  SecondarySpan` shapes. **CAVEAT (= the standing PT-E1 gap, re-confirmed at the
  definition site):** the toggle and buffer are MODULE-GLOBAL mutable state —
  `let diagnosticsEnabled = false` (utils.ts:6) and `let collectedDiagnostics:
  Diagnostic[] = []` (utils.ts:95), NOT per-parse-scoped. value's authored messages
  still have no scoped producer path to a consumer. Adequate for restoration (value
  shipped v1.0.0→v3.1.0 on exactly this); inadequate ONLY vs the PT-E1 ask, which is
  1.1-class evolution owned by the BBNF session (C1/C15).
- **Left-recursion / packrat** (`src/parse/packrat.ts`, 488 LOC): opt-in
  **Warth-Douglass-Millstein packrat-with-left-recursion** (PEPM '08), (id,offset)-
  keyed, self-documented packrat.ts:6-49 (setupLR/growLR seed-and-grow;
  strictly-monotonic seed advance bounds the grow). Armed lazily — costs nothing until
  first use. The SOTA base path "omits left-recursion / packrat entirely"
  (packrat.ts:12).
- **Pratt: ZERO code in the TS tree** — `grep -ril pratt typescript/src` = 0 hits
  (re-run this pass). Dormant by record (PT-E3). CSS grammar needs neither Pratt nor
  packrat-LR; both correctly out of this tranche's way.
- **Perf posture:** measured-in-service, gate-guarded. PT-E letter records packrat
  arming at 82 ns/parse in value's service. (r1 detailed the `proof:perf` born-RED
  gate over the built dist anchored to value's CSS function-name corpus + the
  `perf-baseline.json` +38.12% dispatch speedup, 10 `proof:*` gates under
  `proof:all`; adopted from r1, not re-run — no restoration-side risk either way.)

## 4. MINOR-FIX-ONLY candidates (C1: no novelty; C15: never >1.1)

Ranked; ALL optional — NONE blocks R-PARSER, which should pin published `^1.0.0`
untouched:
1. **NONE REQUIRED** is the headline. 1.0.0 as published is sufficient; the deposed
   value tree consumed strictly LESS surface than exists.
2. IF the restored grammar trips PT-E2 `Parser<any>` widening: a typing-only
   generic-flow tightening in parser.ts signatures is patch-class (1.0.x). Zero-motion
   fallback: consumer-side explicit annotations (value's historical practice).
3. IF re-entrant parsing (value parsing inside a `.map`) collides with the
   module-global collected-diagnostics buffer (utils.ts:6,95): a scoping guard is
   fix-class — but the FULL scoped design (PT-E1) is BBNF-session territory; do NOT
   smuggle it in as a "fix."
4. Nit (record-only): `whitespace` is initialized by a top-level init call at the tail
   of parser.ts — a module side effect under `sideEffects:false`. Correct in practice
   (every entry pulls parser.js); flag only if a bundler ever tree-shakes it wrong.
5. Doc nit (no publish): the PT-E letter invites re-homing into a coordination inbox
   if one opens; the untracked Sol banks already violate the A-dir convention. Any
   committed `docs/coordination/` decision row belongs to the BBNF session.

## 5. The `164343c1^` resurrection recipe — VERIFIED INTACT in value's git [CONFIRMED]

`164343c1^` = `a992b8e61084b3b2d9c9a7218bc6cec98ecb2b8a` (re-resolved this pass).
- `git ls-tree -r 164343c1^ -- src/parsing` → **19 files** (counted): CLAUDE.md,
  index.ts, animation-shorthand.ts, math.ts, syntax.ts, units.ts, utils.ts,
  color/{color-unit,color,index,relative-color}.ts,
  stylesheet/{extract,index,serialize,stylesheet-types,stylesheet}.ts,
  timeline/{easing,index,scroll-timeline}.ts. NOTE relative-color.ts AND the timeline
  grammar are IN the deposed tree — R-RELATIVE / R-SPRING-GRAMMAR have in-tree prior
  art.
- `git ls-tree -r 164343c1^ -- bench` → **11 files** incl. `bench/css-parse-perf.mjs`
  (+ color-alloc-hotpath, color-channel-access, color-dispatch, color-interp,
  color-soa-fold, color2-direct-paths, computed-endpoint, gamut-boundary, numeric-soa,
  parser-namelookup). Matches P1.1's "11 benches."
- Dependency pin at `164343c1^:package.json`: `"@mkbabb/parse-that": "^1.0.0"` —
  the historical pin convention L1 §2 cites, ready to re-add. Caveat (from r1): under
  the P4.2/P3.2 deps-block STRIP ruling, parse-that is a REAL runtime dep (unlike the
  glass/kf placeholder rows) — the manifest gate must WHITELIST it, not strip it.

## 6. bbnf-lang restart/ glance — the C14 module facilities EXIST (inventory only) [CONFIRMED + 1 divergence]

Repo `/Users/mkbabb/Programming/bbnf-lang`, master HEAD
`af15f63e0d2d3d719938c13b906a50acbb92ea3b` (sk-v25 "THE RE-ADJUDICATION packet set").
- **FABLE-r1-vs-now (minor):** HEAD is `af15f63e0` (sk-v25). Live `git log` confirms
  it sits ONE commit ahead of the L1 pin `b3cf48e3b` (= sk-v24 "SECOND PAUSE") — **the
  L1 bbnf pin is exactly one commit stale.** No motion since (last activity
  2026-07-18/19). r1's observation stands, restated precisely.
- **The C14 module facility is REAL and TWO-FORM**, live in grammar source:
  named-symbol imports `@import { value_expr, type_annotation } from "expressions" ;`
  (grammar/bbnf/bbnf.bbnf:4-5; expressions.bbnf:3) and whole-file imports
  `@import "properties.bbnf" ;` (grammar/css/l4/stylesheet.bbnf:1-3). The import
  production itself (`import_directive`) is in the bootstrap grammar (bbnf.bbnf:60).
- **A split CSS L4 sub-grammar suite ALREADY EXISTS**: `grammar/css/l4/` = **15
  modules** (color, easing, filters, func-body, gradients, keyframes, keywords, media,
  properties, selectors, stylesheet, tokens, transforms, value-unit, values), wired by
  `@import`. C14's "idiomatic BBNF using the bbnf repo's module facilities to split
  sub-grammars" has a working in-repo exemplar — the dual-definition prototype starts
  FROM it, not from scratch.
- Governance (inventory): sk-v25's `af15f63e0` message ranks "parse-that first" and
  tracks "VALUEJS-PT-E alive" — bbnf's OWN next campaign already prioritizes parse-that
  and carries PT-E, consistent with C1's separate BBNF session owning all evolution.

## 7. Union delta vs Fable-r1 + bottom line

**Every load-bearing r1 claim re-verified this pass is CONFIRMED** (repo/publish
delta, 5-key exports map, 19-combinator + leaf set with fresh line anchors, span
state, module-global diagnostics buffer, WDM packrat-LR, zero-Pratt, the 19+11-file
`a992b8e6` recipe with `^1.0.0` pin, bbnf `@import` + 15-module L4 split).

**Divergences / adds this pass (FABLE-r1-vs-now):**
- **D1 (line anchors — precision add):** r1's combinator/leaf list is now anchored to
  exact parser.ts/leaf.ts lines (§3); no correction, just tighter evidence.
- **D2 (bbnf pin staleness — restated & confirmed):** `af15f63e0` == `b3cf48e3b` + 1;
  the L1 bbnf pin is one commit stale (§6). Cosmetic.
- **D3 (diagnostics barrel — caveat hardened):** `diagnostics.ts` is a 14-line
  re-export barrel; the toggle/buffer state is module-global at the utils.ts
  definition sites (:6, :95) — verified at source, hardening r1's PT-E1 caveat.

No r1 claim was REFUTED. No gap large enough to move the verdict was found.

**BOTTOM LINE:** Published `@mkbabb/parse-that@1.0.0` = repo HEAD code exactly; the
whole delta is one docs commit (PT-E). The API surface — 5 subpaths, full combinator
set, span state, charCode leaves, opt-in WDM packrat-LR, measured perf gates anchored
to value's own CSS corpus — is ADEQUATE AS-IS for the full-CSS-grammar restoration.
**R-PARSER consumes registry `^1.0.0` with ZERO parse-that motion**; the minor-fix
list is contingency-only (all patch-class; the one HIGH item, PT-E1 scoped
diagnostics, is explicitly 1.1-class BBNF-session work, forbidden here by C1/C15).
The resurrection recipe (19-file `src/parsing` + 11-file `bench` + `^1.0.0` pin) is
fully intact at `164343c1^` = `a992b8e6`. The untracked B/T/U Sol banks are
Codex-corpus research with self-declared zero source authority — route their subject
matter to the BBNF session, never into this tranche. bbnf's `@import` facility + the
existing 15-module CSS L4 split satisfy C14's substrate premise.
