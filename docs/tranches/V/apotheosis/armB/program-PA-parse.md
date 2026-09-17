# PROGRAM PA-PARSE — the parse-that readoption + spec-completeness program (arm B, independent Fable formation)

**Formed:** 2026-07-19 · arm B of the apotheosis run · independent of the Codex corpus (firewall honored).
**Pins (G0′, re-derived this session):** value.js `tranche-u@c654824e` (src identical to canon pin `db77dbd8`; published 4.0.0 immutable) · parse-that `master@ef10d5b` == npm `1.0.0` byte-for-byte · keyframes-v-exec `master@81a56990` (+2 docs commits past the letters' `0dac636b`) · bbnf-lang `master@af15f63e0` (one commit past the letters' `b3cf48e3b`) · resurrection base `164343c1^` = `a992b8e6` (19-file `src/parsing/` + 11-file `bench/` + `"@mkbabb/parse-that": "^1.0.0"` pin, all verified intact).
**Evidence base:** L1 (charter letter) §2 · L2 (packets) P1/P2.2/P3.4/P4/P5 · addenda C1/C12/C14/C15/C17/C19/C20/C21 · armB sweeps (`sweep-value-lib.md` §§5,8; `sweep-parse-that.md` whole; `sweep-kf-lib.md` §§4,5).

---

## 1 — PROGRAM CHARTER

1. **The decree is input, not a question (P1.6):** `@mkbabb/parse-that` is READOPTED outright, consumed from the registry as published (`^1.0.0`); the v4 regex/char-split parser is retired unconditionally. The bench is a regression WITNESS that tunes the restoration — it never re-contests the seat.
2. **The `/css` public surface is FROZEN**: the 15 value exports (`parseCssColor, parseCssScalar, parseCssValue, parseCssValues, parseKeyframeSelector, parseTimingFunction, serializeCssColor, coerceToSyntax, parseAnimationRange, parseAnimationTimeline, serializeTimelineOptions, collectAnimationOptions, collectCustomFunctions, collectDeclarations, collectKeyframes, collectPropertyDescriptors, collectStyleRules, collectTimelineOptions, parseStylesheet`) + all 33 type exports + the closed 8-code `ParseIssue` union + `ParseResult` — signatures byte-stable; consumers never move (kf 29 sites/39 symbols · glass 3 · demo 10, live-HEAD census).
3. **parse-that itself: ZERO motion by default (C1/C19)**; a bounded minor-fix contingency lane only; semver ceiling **1.1 absolute** (C15). All tape/substrate/Pratt/diagnostics-redesign work belongs to the separate BBNF session (P1.3); needs route as PT-E-channel letters.
4. **Spec target: July 2026 (C12)** — full CSS incl. experimental, CSSOM, WAAPI, keyframes/animation/timeline/stylesheet, typed values congruent to their DOM equivalents; gaps become waves ON the restored parse-that grammar.
5. **The parser is DUALLY defined (C14)**: idiomatic BBNF sub-grammar modules (bbnf `@import` facilities; the in-repo 15-module `grammar/css/l4/` suite is the exemplar) + the parse-that TS implementation in `src/css/` — with a machine-checkable congruence map. Prototyped and benchmarked NOW; tranche execution gated.
6. **Standing laws bind every wave**: born-RED gates wherever the defect is live; the silent-drop tombstone law (§7-1); anchor re-derivation at execution (§7-3); KISS/parsimony (C21); thrice loop on every wave (C20); probe parsimony on all visual checks.
7. **Nine waves, no sand**: fewer, well-cut waves; every P1/P2.2-parse/P3.4-parse/PT-E/C-row lands below as a wave, gate, registry row, or owner-decision row — the §4 map proves zero silent drops.

---

## 2 — THE WAVE SET

### F-PA-parse-01 · value.js (+ bbnf-lang read-only) · THE DUAL-DEFINITION PROTOTYPE — benchmarked NOW, execution-gated
- **Intent:** Prove the restoration mechanics and the C14 dual form on a bounded slice BEFORE tranche execution: resurrect 2–3 representative productions from `164343c1^:src/parsing/` (the color function ladder, `parseTimingFunction`, one stylesheet rule path), modernize them to the v4 types, and author the congruent BBNF sub-grammar modules starting FROM bbnf's `grammar/css/l4/` 15-module split.
- **Deliverables:** an isolated prototype dir (never lands in `src/`); a draft bench harness derived from `164343c1^:bench/css-parse-perf.mjs`; measured numbers (MB/s, ns/call, alloc-per-parse) prototype-vs-extant-regex on the same corpus; a production-per-production BBNF↔TS congruence note; a ratification memo for waves 02–03 (tuning notes, NOT a seat contest).
- **Acceptance gates:** prototype parses the slice with output deep-equal to the extant parser on the shared corpus (divergences enumerated + adjudicated); bench numbers recorded for BOTH engines; thrice-loop convergence (two consecutive clean passes) on the prototype's architecture. No born-RED here — this wave is evidence manufacture, authorized NOW per C14.
- **Dependencies:** none (program opener).
- **π/DELTA:** none — no visual claim.
- **Model routing (C17):** Fable designs the grammar architecture + adjudicates the thrice loop; Opus runs the mechanical resurrection diffing and bench executions. File-scoped, tight seats.

### F-PA-parse-02 · value.js · BENCH-AS-REGRESSION-WITNESS — bench/ + the portable ratio gate, restored BEFORE the seat swap
- **Intent:** Resurrect the bench corpus and the perf gate the v4 cut deleted, so the retiring regex parser is measured ONCE for the record and the restoration is tuned against a live witness — the head-to-head that has never been run, run for history, not for the verdict.
- **Deliverables:** `bench/` restored — the parser benches (`css-parse-perf.mjs`, `parser-namelookup.mjs`) modernized to the v4 surface; the portable ratio gate per the recorded recipe (MB/s + ns/call + the co-scaling ratio) wired as a `proof-perf-target`-class CI step on the producer gate surface (P3.4-1: library gates stay producer+api); the ONE-TIME regex-parser measurement archived in the wave record; bench infra reusable by the color program (its 9 color benches resurrect under the color program's own waves — seam cited, not owned here).
- **Acceptance gates:** **born-RED** — the ratio gate is authored against the restored parser and FAILS at birth (RED = the gate script exits nonzero because no restored parser exists yet / the ratio target is unmet); it goes green only when F-PA-parse-03 meets the recipe's ratio. The regex-parser record row is complete (numbers + corpus hash) before 03 deletes the code.
- **Dependencies:** F-PA-parse-01 (harness draft ratified).
- **π/DELTA:** none.
- **Model routing:** Opus mechanical (resurrection + runs); one Fable seat rules the ratio-target derivation.

### F-PA-parse-03 · value.js · R-PARSER RESTORATION — the seat swap, /css signatures frozen
- **Intent:** Restore the deposed parse-that combinator parser (recipe `164343c1^:src/parsing/`, 19 files incl. `relative-color.ts` + the timeline grammar) INTO `src/css/` behind the frozen `index.ts` surface; re-add `@mkbabb/parse-that: ^1.0.0` from the registry as published; retire the regex parser unconditionally — `deepFreeze`-per-parse, the per-char `/\s/.test` split loops (grammar.ts:77,:80,:115; stylesheet.ts:530,:534), and the `parseFunctionalColor` 8-branch ladder die with it.
- **Deliverables:** the restored combinator core in `src/css/` (internally re-cut to goldilocks granularity — the 899-LOC stylesheet god-module does not survive as one file; `css/index.ts` byte-stable); `package.json` dep row `^1.0.0` per the historical pin convention; **the manifest-gate WHITELIST rule** — parse-that is a REAL runtime dep and the deps-STRIP gate (P3.2/P4.2) must whitelist it, never strip it (sweep-parse-that §5 caveat, load-bearing); the P1.5 defect-FAMILY regression pair authored as named tests (U-F29 `parseCssValues` loud-fail family + U-F30 color-mix serialization family) in the family register; CHANGELOG entry for the engine swap (no capability leaves — capability-diff gate green by construction, surface frozen).
- **Acceptance gates:** the entire existing css test corpus (`v4-css-public`, `v4-css-emerging`, behavior suites) green UNCHANGED under the restored parser; producer+api gates green; the F-PA-parse-02 ratio gate flips RED→GREEN (this is the wave's headline born-RED discharge); `grep -c charCodeAt src/css` may be >0 again (parse-that leaves), but zero regex-method parse paths remain on the value side (addendum-2 abrogation, value half); anchor re-derivation performed at execution (§7-3) — no stale line-cites in the wave spec survive to implementation.
- **Dependencies:** F-PA-parse-01, F-PA-parse-02.
- **π/DELTA:** ONE π capture pair (probe-parsimony): demo color-picker parse-driven surface (CSS color string input → rendered swatch) pre/post swap, pixel-stable — the swap is invisible or it is a defect.
- **Model routing:** Fable owns the module cut + adjudication; Opus executes the mechanical resurrection/modernization sweep under the Fable-authored spec. Release-vehicle question → OD-PA-5.

### F-PA-parse-04 · value.js · THE JULY-2026 SPEC-COMPLETENESS CENSUS (C12) — born-RED coverage ledger
- **Intent:** Census the restored surface against the full July-2026 spec set: CSS Values & Units L4/L5, Color 4/5 (color-mix, relative color, contrast-color, HDR ictcp/jzazbz), Easing L2, Animations L2, scroll-driven animations + timeline, `@property`/`@function`, stylesheet forms, CSSOM typed-value congruence (CSSStyleValue/CSSNumericValue/CSSUnitValue/CSSKeywordValue/CSSTransformValue equivalents), and the WAAPI keyframe formats (per-keyframe `composite`, `computedOffset`, `pseudoElement`, `KeyframeEffectOptions`). Every typed value congruent/aligned exactly to its DOM equivalent.
- **Deliverables:** the census ledger — one row per spec production/surface: SUPPORTED / GAP / DECISION, each with the DOM-equivalent type named and the congruence verdict; every GAP lands as a wave row (feeding 05/06) or an owner-decision row — no unowned gaps; the **kf-leverage map**: which new typed surfaces kf's keyframes/animation parsing consumes (C12's "value gains full keyframes/animation parsing that kf leverages") → input to F-PA-parse-07; an explicit ROUTE row: kf's full-WAAPI ENGINE support (the absent members measured in sweep-kf-lib §5 — `persist()`, `pseudoElement` targeting, `iterationComposite`, `getAnimations()`, `CSS.registerProperty`, `updatePlaybackRate`, per-keyframe composite, eligibility-gate liberalization) is NOT parse work — it routes by name to the kf program's WAAPI wave via the kf inbox (cited here so it is a route, never a drop).
- **Acceptance gates:** **born-RED by construction** — the census authors one named failing conformance test per GAP row on today's tree (RED = `parseCssColor("color-mix(in oklch, red, blue)")` returns `ok:false`; `"rgb(from red r g b)"` hard-fails; `contrast-color()` absent; `ictcp()`/`jzazbz()` dropped). The ledger is complete when a second independent pass surfaces zero new rows (registry-stability rule, L1 §0).
- **Dependencies:** F-PA-parse-03 (gap rows land ON the restored grammar; enumeration may start in parallel after 01).
- **π/DELTA:** none — ledger work.
- **Model routing:** Opus mechanical spec-enumeration sweep (MDN/spec tables → rows); Fable adjudicates the DOM-congruence typing design (the C12 hard part).

### F-PA-parse-05 · value.js · GRAMMAR RESTORES, TRANCHE 1 (decided rows) — color-mix() · relative-from · contrast-color()
- **Intent:** Land the three DECIDED grammar restores on the restored combinator substrate: **R-MIX-GRAMMAR** (`color-mix()` production + structural node — zero hits today), **R-RELATIVE** (relative color `from` syntax — hard-fails today; in-tree prior art at `164343c1^:src/parsing/color/relative-color.ts`), **R-CONTRAST** (`contrast-color()` grammar + parse node; the WCAG-metrics REPUBLISH half is the color program's — seam cited, grammar half owned here).
- **Deliverables:** the three productions + typed nodes in the restored `src/css/` grammar; serialization round-trips (`serializeCssColor` handles the new forms — the U-F30 family test extends); conformance vectors from the F-04 census rows; a registry row on the `ParseIssue` union policy: the 8-code union stays CLOSED unless a new grammar genuinely needs a named code — in which case the P5 §D name-a-code re-open path FIRES and the surface change is adjudicated explicitly, never smuggled.
- **Acceptance gates:** **born-RED** — the F-04 conformance tests for all three rows are RED on the pre-wave tree (named failing tests exist and are cited in the wave spec) and GREEN at close; kf/glass/demo consumer suites unchanged-green (surface additive only); bench ratio gate stays green (new productions may not regress the witness).
- **Dependencies:** F-PA-parse-03, F-PA-parse-04.
- **π/DELTA:** ONE DELTA capture: the demo color input accepting a `color-mix()`/relative-`from` string and rendering it (the first user-visible new capability of the program) — single capture, probe-parsimony.
- **Model routing:** Fable designs the node shapes (DOM-congruence per C12); Opus implements under spec; thrice loop per production cluster.

### F-PA-parse-06 · value.js · GRAMMAR RESTORES, TRANCHE 2 (decision-gated) — HDR · spring() · calc-eval disposition
- **Intent:** The execution lane for the three owner-gated rows: **R-HDR** (`ictcp()`/`jzazbz()` — the 11-day-old 3.1.0 surface dropped unpapered at v4), **R-SPRING-GRAMMAR** (CSS `spring()` easing grammar — existed pre-v4), **R-EVAL** (calc/math static evaluator — WEAK candidate). The wave exists so every decided-YES row has a landing and every decided-NO row gets its by-name tombstone — the §7-1 law discharge the v4 CHANGELOG never performed.
- **Deliverables:** per OD-PA-1/2/3 verdicts: either the production + typed node + conformance vectors (YES rows), or the by-name RIGHTLY/UNJUSTLY tombstone in the next cutting release's CHANGELOG + census-ledger closure (NO rows). For spring(): if value-owns lands the grammar here with the solver seam untouched (kf solver-LEAD, K F6.6 fence cited); if kf-owns, the production spec routes into the F-07 INBOUND letter instead.
- **Acceptance gates:** born-RED for any YES row (its F-04 census test is live-RED today); for NO rows the gate is the tombstone's existence + the capability-diff gate staying green with the declared removal row. No row may exit UNDECIDED — that is the disease-row rule (§7).
- **Dependencies:** F-PA-parse-05 (substrate), the owner docket (§3).
- **π/DELTA:** none unless R-HDR lands with a demo surface — then one capture, else exempt.
- **Model routing:** Fable adjudication seats present the decision briefs; Opus implements decided rows mechanically.

### F-PA-parse-07 · keyframes.js (spec-dispatch, value-authored per P4.5) · THE KF CONSUME SEAMS + BOUNDARY CENSUS LOCK
- **Intent:** Lock the two-repo parsing boundary at zero-grammar-productions-on-the-kf-side and hand kf its consumption spec: value DIRECTS, the kf successor implements — an `<SENDER>-INBOUND-*` letter into `keyframes.js/docs/tranches/V/coordination/`, never a direct cross-repo edit.
- **Deliverables:** (a) the **easing.ts:30/:38-39 consume-vs-ratify brief** — the ONE live boundary row (re-verified EXACT at kf `81a56990`): the two-regex CSS-keyword classifier under kf's documented value.js-free light-engine law; both dispositions specced (RATIFY as a documented classifier — recommended, it has zero productions — vs CONSUME a value-exported name table, pricing the new dep edge against the light-engine law) → OD-PA-6; doubles as the kf regex-census row for addendum-2; (b) the **kf-leverage spec** from F-04's map: the typed keyframes/animation/timeline surfaces kf's `compile/selector.ts:3` (`parseKeyframeSelector`) and `validate.ts:47` (`collectKeyframes, parseStylesheet`) seams gain; (c) the **seam re-verification protocol**: kf's suite run against a packed value build carrying the restored parser (link-level, pre-publish — the P4.2 co-land boundary is not crossed here); (d) the boundary census-lock statement: zero grammar productions on both sides, machine-checked by kf's depcruise leaf law + a grep census row.
- **Acceptance gates:** the INBOUND letter landed and rowed in kf's ledger; kf 29-site/39-symbol consumption compiles + kf suite green against the packed restored-parser build (RED today is vacuous — the build doesn't exist until 03; the gate is born at 03's close and must be green before any value publish); the census-lock grep row green on both trees.
- **Dependencies:** F-PA-parse-03, F-PA-parse-04.
- **π/DELTA:** none — library seams.
- **Model routing:** one Fable seat authors the brief + letter (coordination prose is design work); Opus runs the seam-verification matrix.

### F-PA-parse-08 · value.js (bbnf-lang read-only exemplar) · THE DUAL DEFINITION (C14) — the idiomatic BBNF sub-grammar suite + congruence gate
- **Intent:** Complete C14: the CSS parser defined BOTH as idiomatic BBNF sub-grammar modules (split via bbnf's `@import` facilities — named-symbol and whole-file forms both live in bbnf at `grammar/bbnf/bbnf.bbnf:4-5` / `grammar/css/l4/stylesheet.bbnf:1-3`) AND as the parse-that TS implementation in `src/css/`. Value has prior art: pre-v4 `src/parsing/grammars/*.bbnf` + an equivalence test.
- **Deliverables:** the BBNF module suite covering the FULL restored grammar (values, color incl. the T1 restores, easing/timing, timeline, stylesheet) living in value.js (default home per OD-PA-4), modeled on and reconciled against bbnf's 15-module `grammar/css/l4/` exemplar; the **congruence gate**: a machine-checkable production-per-production map TS↔BBNF (an equivalence-test revival — drift between the two definitions is detectable, RED on any unmapped production); an ask letter to the BBNF session on upstream reconciliation (BBNF-repo evolution is theirs per C1 — we author grammar FILES, never bbnf-lang runtime).
- **Acceptance gates:** **born-RED** — the congruence gate is authored first and fails while any restored production lacks its BBNF twin (RED = the map lists N unmapped productions, nonzero at birth); green = zero unmapped, both directions. Thrice loop over the module cut (sub-grammar boundaries are design).
- **Dependencies:** F-PA-parse-01 (the congruence method piloted), F-PA-parse-03, F-PA-parse-05.
- **π/DELTA:** none.
- **Model routing:** Fable owns the sub-grammar decomposition (idiom-heavy); Opus generates the mechanical map + test scaffolding.

### F-PA-parse-09 · parse-that · MINOR-FIX CONTINGENCY + CHANNEL DISCHARGE (C1/C15/C19)
- **Intent:** The bounded lane that keeps parse-that motion at ZERO by default and lawful if evidence forces a fix. Published 1.0.0 == repo HEAD code byte-for-byte; the API is ADEQUATE AS-IS (C19 answered, sweep-parse-that verdict) — the deposed value tree consumed strictly less surface than exists.
- **Deliverables:** the standing dispositions, recorded terminal: **PT-E1** (scoped diagnostics, HIGH) → ROUTED to the BBNF session with a note that value's restoration is now the live consumer (1.1-class, forbidden here); **PT-E2** (`Parser<any>` inference leak, MED) → contingency HERE: iff the restoration trips it, a typing-only patch (1.0.x); zero-motion fallback = consumer-side annotations (value's historical practice); **PT-E3** (Pratt) → stays DORMANT/RETIRED (S.H3 stands); the module-global diagnostics-buffer collision (utils.ts:6,:95) → iff re-entrant parsing collides, a scoping GUARD is fix-class — the full scoped design is never smuggled in as a "fix"; the untracked B/T/U Sol banks → provenance-only, routed to the BBNF session, never merged (C16).
- **Acceptance gates:** any parse-that publish out of this lane shows version ≤ 1.1.x (C15 ceiling — gate: a manifest check in the wave close) AND a diff limited to the named fix class; if zero motion (the expected outcome), the gate is the recorded disposition set — every PT-E row terminal, none silently dropped.
- **Dependencies:** F-PA-parse-03 (fires only from restoration evidence).
- **π/DELTA:** none.
- **Model routing:** Fable adjudicates whether a trip is genuinely fix-class vs smuggled evolution (the C1 boundary is a judgment call); Opus implements any patch mechanically.

---

## 3 — OWNER-DECISION ROWS SURFACED

| Row | Question | Program recommendation | Wave |
|---|---|---|---|
| OD-PA-1 | **R-HDR**: restore `ictcp()`/`jzazbz()` parse (the unpapered 11-day 3.1.0 drop) vs uphold the CSS-native-only law | Restore-lean if the census shows DOM/CSSOM congruence value; else tombstone by name (§7-1 discharge either way) | F-06 |
| OD-PA-2 | **R-SPRING-GRAMMAR ownership**: `spring()` easing grammar value-vs-kf (solver stays kf, K F6.6 settled) | VALUE — CSS-spec territory, per L1 §2's lean; grammar here, solver seam untouched | F-06 (or routes via F-07 if kf) |
| OD-PA-3 | **R-EVAL**: calc/math static evaluator | RETIRE with rationale — WEAK candidate; DOM resolution is the status quo and kf `resolve/` owns calc capability; terminal disposition required regardless | F-06 |
| OD-PA-4 | **BBNF canonical home**: dual-definition modules in value.js vs upstreamed to bbnf `grammar/css/l4/` | IN-VALUE now (prior art: pre-v4 in-repo grammars + equivalence test); upstream reconciliation routed to the BBNF session (C1) | F-08 |
| OD-PA-5 | **Release vehicle** for the parser swap: a 4.1.x minor (surface frozen; new runtime dep is minor-lawful) vs holding to the value-5 co-land boundary (P4.2) | 4.1.x-eligible on the frozen surface; owner picks the vehicle — the swap must never fork W56's 4.1.x SCI-1 vehicle, it may ride or follow it | F-03 |
| OD-PA-6 | **kf easing.ts:30/:38-39**: consume-vs-ratify the two-regex timing-name classifier | RATIFY — zero productions, documented light-engine law, F.W7 round-trip rationale on file; consume-variant priced in the brief | F-07 |

---

## 4 — ROW-LANDING MAP (zero silent drops in this program)

| Source row | Lands as |
|---|---|
| L1 §2 wave (1) R-PARSER restoration (recipe, frozen surface, pin convention, dep-edge pricing) | F-03 (+ F-01 prototype; pricing note → OD-PA-5) |
| L1 §2 wave (2) bench restore as regression witness (ratio recipe; regex measured once) | F-02 |
| L1 §2 wave (3) spec-completeness census + named restores + spring ownership row | F-04, F-05, F-06; OD-PA-1/2 |
| L1 §2 / P1.4 kf boundary census lock + easing.ts consume-vs-ratify | F-07; OD-PA-6 |
| P1.2 extant-parser indictment (regex sites, deepFreeze, /\s/ loops, charCodeAt=0) | RED definitions in F-02/F-03 (re-verified in sweep-value-lib §8) |
| P1.3 tape OUT OF SCOPE (and P1.6 parse-that-internal exclusion) | Charter line 3; no tape row exists anywhere in this program |
| P1.5 ad-hoc-fix FAMILY (U-F29/U-F30; track families not instances) | F-03 deliverable: named family regression tests + family register row; F-05 extends U-F30 to color-mix serialization |
| P1.6 the owner decree (readopted as published) | Charter line 1; F-03 |
| P2.2 row 4 R-PARSER | F-03 |
| P2.2 row 6 R-MIX-GRAMMAR · row 7 R-RELATIVE · row 8 R-CONTRAST (grammar half) | F-05 (WCAG-republish half seam-cited to the color program — explicit route, not owned) |
| P2.2 row 10 R-HDR · row 11 R-SPRING-GRAMMAR · row 12 R-EVAL | F-06 + OD-PA-1/2/3 |
| P3.4 row 1 (gates stay producer+api) | F-02 gate placement honors it |
| P3.4 row 5 (resurrect bench/ + ratio gate with R-PARSER) | F-02 (color benches seam-cited to the color program) |
| P3.4 row 4 / P4.2 (pre-publish manifest gate; deps STRIP) | F-03: the parse-that WHITELIST rule — the strip gate must not strip the real runtime dep (sweep-parse-that §5) |
| P3.4 row 6 / §7 law 1 (capability-diff + tombstone law) | F-03 (green by construction, surface frozen); F-06 (tombstones for decided-NO restores — the v4 unpapered-drop discharge) |
| §7 law 2 (G0′ pins) | Charter pins, re-derived (kf +2, bbnf +1 drift noted) |
| §7 law 3 (re-derive anchors at execution) | Standing gate step in every wave (named in F-03) |
| P5 PT-E (E1/E2/E3) | F-09 — all three terminal dispositions |
| P5 §D name-a-code re-open path | F-05 registry row (ParseIssue union policy) |
| C1 + C15 (parse-that minor-only; ≤1.1) | Charter line 3; F-09 gates |
| C12 (July-2026 full spec, DOM-congruent typed values; kf leverages) | F-04 (census + congruence) + F-07 (kf-leverage spec); kf WAAPI-ENGINE half routed by name to the kf program (F-04 ROUTE row — sweep-kf-lib §5 absent-member list attached) |
| C14 (dual BBNF + TS definition; prototyped/benchmarked NOW) | F-01 (now-authorized prototype) + F-08 (full suite + congruence gate) |
| C17 (Fable design / Opus mechanical; report model served) | Per-wave routing notes; program formed under it |
| C19 (parse-that adequacy assessment) | Answered (adequate as-is); recorded in F-09 |
| C20 (thrice method) | Method note on F-01/F-05/F-08 (design-heavy waves); binding on all |
| C21 (KISS/parsimony; probe parsimony) | 9 waves total; single-capture π/DELTA rows only |
| Addendum 2 (regex abrogation, both repos) | value half: F-03; kf half: F-07 regex-census row (easing classifiers = the adjudicated residue) |
| sweep-value-lib §5 (test/parsing ghost dir; isomorphism) | Registry note in F-03: the restored parser's tests land in the isomorphic tree (`test/css/`), the ghost `test/parsing/` dir dies — the from-scratch isomorphism GATE itself is the structure program's (seam cited) |
| sweep-value-lib §3 (`collectDeclarations` export-orphan) | Registry row: FROZEN by surface law here; any prune is the structure program's dissolution wave (seam cited) |
| sweep-parse-that §5 (recipe verified; relative-color + timeline prior art; ^1.0.0 pin) | F-03/F-05 recipe base |
| sweep-parse-that §6 (bbnf @import + 15-module l4 exemplar) | F-01/F-08 substrate |
| C16 (isolation; Sol B/T/U banks provenance-only) | Honored throughout; F-09 routes the banks to the BBNF session |

**Explicit non-ownership (routes, not drops):** kf full-WAAPI engine support → kf program (F-04 ROUTE row). Color benches + WCAG republish + all R-DELTAE/R-GAMUT/R-INTO/R-RAMP rows → the color program. The isomorphism/structure/capability-diff gate builds → the structure/gates program. The co-land boundary itself (value 5/kf 7) → the program-level co-land wave.

**Wave count: 9.**
