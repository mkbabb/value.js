# THRICE · PA-PARSE · SKEPTIC 2 — the program is mispriced, mis-ordered, and one wave deep in re-litigated tombstones

**Seat:** Skeptic 2 (assume-wrong), arm B thrice loop · 2026-07-19 · model claude-fable-5.
**Target:** `armB/program-PA-parse.md` (9 waves). **Inputs:** the three armB sweeps + independent probes into value.js git (`164343c1^` = `a992b8e6`), `src/css/`, and the tombstone/packet canon. Firewall honored (no vnext, no snapshot, no armA).
**Verdict up front:** the row-landing map is honest, but the program's SPINE is wrong: it prices the seat swap as a mechanical resurrection when the deposed tree's entire output model is a RIGHTLY-tombstoned corpse; it sequences two owner decisions AFTER the wave that needs them; it books formation-phase work as a tranche wave; one wave is paperwork; and its flagship new gate resurrects the exact grep-proof idiom the owner already condemned. Counter-program: **6 waves + 1 formation-phase pilot** (vs 9).

---

## §1 — INDICTMENTS (ranked, each with tree evidence)

### I-1 · CATEGORY ERROR: "mechanical resurrection" — the deposed tree's semantic layer is tombstoned-dead, and the program never says so

F-03 routes the swap as "Opus executes the mechanical resurrection/modernization sweep." Measured against `164343c1^` itself:

- **10 of the 18 deposed TS files import `../units`** (`git grep -l 'from "../units"' 164343c1^ -- src/parsing` → color-unit, color, relative-color, index, math, stylesheet-types, stylesheet, syntax, timeline/easing, units) — the `ValueUnit`/`ValueArray`/`FunctionValue` OO model. `src/units` was deleted at v4, and **the P2.2 tombstone list marks "the OO/ValueUnit model flip" RIGHTLY — never re-litigate**. Every production's `.map()` emits ValueUnit graphs.
- **Zero name overlap with the frozen surface**: `git grep -c parseCssColor 164343c1^ -- src/parsing` = **0**. The deposed exports are `parseCSSValue`/`parseCSSValues`/`CSSValueUnit`/`CSSParseError extends Error` (index.ts:518,:542,:600) — throw-based, not the v4 `ParseResult`/`ParseIssue` Result discipline.
- **5 `memoize()` sites** wrap the deposed entry parsers (index.ts:542 `parseCSSValue = memoize(…)`, :618 `parseCSSPercent`, …) — a module-global unbounded cache, the same genre as parse-that's module-global diagnostics buffer the program itself flags in F-09.

**Consequence:** what is actually reusable is the combinator GRAMMAR SKELETON (productions, sequencing, leaves). The whole semantic half — every output map, the error/Result layer, the memo policy, the surface names — is a REWRITE into the v4 typed model. That is Fable-grade design work, and it is exactly the work F-01's "output deep-equal to the extant parser" gate silently demands. The program's cost model (Opus-mechanical F-03, tiny Fable adjudication) is inverted; a wave priced this way is the setup for the "green-over-broken" close — an Opus sweep that transliterates ValueUnit code into `src/css/` and declares restoration. **The honest program name is REBUILD ON THE DEPOSED SKELETON, not restoration**, and the wave spec must say which half is reused and which half is rewritten.

### I-2 · DEPENDENCY INVERSION: the R-EVAL decision is a PREREQUISITE of the seat swap, sequenced after it

The deposed grammar EMBEDS the 536-LOC calc/math evaluator in its core alternation: `164343c1^:src/parsing/index.ts:7` imports `createMathFunctionParsers, evaluateMathFunction`; `:53` builds `MathFunction/CalcFunction`; `:503` wires `MathFunction` into `ValuesValue` — the root value production. Meanwhile the extant v4 `src/css/{grammar,stylesheet}.ts` has **zero `calc` hits** (grep = 0). So the resurrection MUST decide at cut time: excise the evaluator arm (surgery inside the "mechanical" wave) or restore it (a capability ADD on a frozen surface). The program parks that decision in **F-06/OD-PA-3 — two waves AFTER F-03**. The same inversion holds for R-HDR and spring: they are productions of the same grammar files F-03 rewrites. **Decisions that shape the grammar cut must precede the grammar cut.** As specced, F-03 either stalls on an undelivered docket or (worse) cuts the grammar twice.

### I-3 · F-04's declared dependency on F-03 is false, and the program admits it in its own parenthesis

The census is enumeration against TODAY'S tree — its RED examples (`color-mix` → `ok:false`, relative-`from` hard-fail, `contrast-color` absent, HDR dropped) are all true on the extant regex parser; nothing needs the restored parser to exist. Yet F-04 declares "Dependencies: F-PA-parse-03" and then contradicts itself: "(enumeration may start in parallel after 01)." This serializes the program's longest-lead evidence work behind its riskiest wave, and it starves I-2: the census + decision docket is precisely what must land FIRST so the rebuild is cut once. A wave spec that contradicts its own dependency line has the wrong shape, not a typo.

### I-4 · F-01 is formation work booked as a tranche wave — a §7-law-4 phase-label violation

C14: "Prototyped and benchmarked **NOW** (prototypes authorized; tranche EXECUTION is not)." F-01's own gate note concedes it: "authorized NOW per C14." If it is NOW work, it belongs to THIS formation and its outputs (transposition pattern, bench harness draft, numbers) enter the tranche as evidence — it is not a wave. If it is a tranche wave, "NOW" is violated. The program cannot have both. Worse, F-01's intent ("prove the restoration mechanics") over-derisks the wrong thing: the parse-that mechanics shipped in service for 26 months (v1.0.0→v3.1.0, sweep-parse-that §1) and need no proof; the genuinely novel risk — the ValueUnit→typed-node TRANSPOSITION of I-1 — is what the pilot should target, and the program never names it.

### I-5 · The ONCE-for-the-record law is broken by the program's own structure

F-01 delivers "measured numbers … prototype-vs-**extant-regex** on the same corpus." F-02 then promises "the retiring regex parser is measured **ONCE** for the record." Two waves measure the retiring parser. Either F-01's numbers are the record (then F-02's headline deliverable is duplicate) or they are throwaway (then F-01 spent bench effort the decree says not to spend — the bench "never re-contests the seat," yet prototype-vs-regex on a shared corpus IS a mini-contest). Fold: one regex measurement, taken in the formation pilot, inherited as the record. Rider: **the deposed parser memoizes (I-1) — any harness that does not defeat the memo caches produces cache-hit fiction**; no wave names this, so the witness can lie at birth.

### I-6 · F-08 re-litigates a RIGHTLY tombstone by silence and resurrects the condemned grep-gate genre

- The P2.2 tombstone list includes "**BBNF grammar files**" under *RIGHTLY — never re-litigate* (the in-repo grammars + equivalence test were excised at S.W0 `36f918d2`; born `22b1eee8`; **absent at `164343c1^`** — grep of that tree for bbnf/equivalence = 0). C14 legitimately re-opens the dual definition (addendum wins) — but P4.4's discipline is *name the superseded ruling explicitly; silence re-litigates it*. F-08 and OD-PA-4 instead cite the tombstoned corpse as SUPPORTING "prior art" ("pre-v4 in-repo grammars + an equivalence test") without ever naming the tombstone they overturn. That is the exact governance failure the canon forbids.
- The "machine-checkable production-per-production map TS↔BBNF, RED on any unmapped production" is a name-census gate over two heterogeneous representations — the same grep-based invariant-codification idiom the owner personally deleted as "overfit junk" (standing feedback: enforce structurally or behaviorally, never by grep ledger). "Production" has no stable machine identity inside combinator TS; the map will be a hand-maintained table wearing a gate costume — contrived process, C21's named enemy. The enforceable form is the one the excised prior art actually had: **behavioral equivalence testing** — run both definitions over the shared conformance corpus, diff outputs.
- Home recommendation ignores the standing exemplar: bbnf-lang ALREADY carries a 15-module `grammar/css/l4/` suite (sweep-parse-that §6). IN-VALUE creates a SECOND CSS BBNF corpus in a second repo — duplication the program should price, and doesn't; the OD-PA-4 brief must carry extend-in-bbnf as the default-lean, not a footnote route.

### I-7 · F-09 is a non-wave: its success criterion is that nothing happened

Expected outcome ZERO motion; deliverable "the recorded disposition set"; the version-ceiling gate is vacuous-green whenever no publish occurs (a gate that cannot fire is not a gate — the close-class-lie family). PT-E1/E2/E3 terminal dispositions are three REGISTRY rows; the PT-E2/diagnostics-collision contingency is a RIDER on the rebuild wave's spec ("if tripped: patch-class per C15, Fable adjudicates fix-vs-evolution"). Booking paperwork as 1/9th of the program is C21 spend on process.

### I-8 · F-07 exports the seat swap's consumer gate into a later wave — green-over-broken by construction

kf is the dominant consumer (29 sites/39 symbols). The packed-build kf-suite verification is F-03's acceptance criterion, not F-07 deliverable (c); as specced, F-03 closes "green" on value's own tests while the dominant consumer is unverified, backstopped only by a publish-time gate two waves later. The coordination LETTER (consume-vs-ratify brief, kf-leverage spec, census lock) is a fine thin wave; the seam verification must move inside the swap.

### I-9 · F-03 is the under-cut god-wave, and its re-cut rationale aims at a corpse

F-03 stacks: skeleton resurrection + full semantic rewrite (I-1) + "internally re-cut to goldilocks granularity" + manifest whitelist + family regression tests + CHANGELOG. Its stated re-cut justification — "the 899-LOC stylesheet god-module does not survive as one file" — indicts the **dying v4 regex file**; the deposed replacement is ALREADY cut (`stylesheet/` = 5 files, max 643L; whole tree 18 TS files, max 754L). Preserve the deposed cut; any further goldilocks pass is the structure program's — the boundary the program itself draws for the test-tree ("the isomorphism GATE itself is the structure program's") and then violates for src. Meanwhile F-09 (nothing) and F-02 (one bench) stand as peer waves: the grain is inverted — fattest risk, fattest wave.

### I-10 · Charter defects: a wrong census in the frozen-surface law, and an unreconciled collision with C12

- Charter line 2: "the **15** value exports" — then lists **19** names; the live `src/css/index.ts` exports **19** values (+ 33 types, that half is right). The program's single most load-bearing invariant carries a hand-count error — the freeze must be defined by a machine-derived export census, or the capability-diff gate has a wrong baseline on day one.
- Charter line 2 freezes all 33 type exports "byte-stable"; charter line 4 (C12) demands typed values "congruent/aligned **exactly** to their DOM equivalents." If ANY of the 33 types is not DOM-congruent today, the two laws collide — and the program never says which yields. The letter's actual law is narrower ("parseStylesheet/collect*/ParseIssue **signatures preserved**"). The program gold-plated a signature freeze into a byte freeze it cannot honor under its own spec target. F-04's "Fable adjudicates the DOM-congruence typing design" is a surface-reshaping design wave hiding inside a census wave.

### I-11 · Born-RED hygiene in F-02: red-by-absence is vacuous-red

"RED = the gate script exits nonzero because no restored parser exists yet" — a gate red because its subject is absent proves nothing (mirror of the vacuous-green lie). The letter's born-RED is *ratio unmet on a real measurement*. And no wave carries the failure path if the rebuild never meets the ratio — the decree bars re-contesting the seat, so the program needs the L1 §8 escalation row (≤3 tuning iterations → owner) named, or its headline gate has no exit.

**Conceded ground (what survives attack):** the §4 row-landing map is genuinely complete — I found no chartered P1/P2.2-parse/P3.4/C-row silently dropped; the WAAPI-engine ROUTE row, the manifest WHITELIST caveat, the ParseIssue-union-stays-closed policy, and OD-PA-6's RATIFY lean are all correct and keep-worthy. The defect is shape and order, not coverage.

---

## §2 — THE COUNTER-PROGRAM (CP-PARSE: 6 waves + 1 formation-phase pilot)

**CP-0 · (FORMATION-PHASE, not a wave) THE TRANSPOSITION PILOT + THE RECORD MEASUREMENT** — discharge C14's "NOW": pilot 2–3 productions through the REAL risk — deposed combinator skeleton → v4 typed-node output layer (one color fn, parseTimingFunction, one stylesheet rule), paired with their BBNF twins drafted FROM bbnf's `grammar/css/l4/`; take the ONE regex-parser record measurement with a memo-defeating harness. Outputs (transposition pattern, harness, record numbers, BBNF-home cost note) enter the tranche as evidence. Phase-labeled per §7-law-4.

**CP-1 · SPEC CENSUS + THE UPSTREAM DECISION DOCKET** — the July-2026 census on today's tree (no parser dependency; born-RED conformance vectors per GAP row; registry-stability close); PLUS the decision briefs the grammar cut needs BEFORE it is specced, delivered as ONE owner sheet: R-EVAL (the deposed evaluator arm lives or dies — I-2), R-HDR, spring-grammar ownership, BBNF home (default-lean: extend bbnf's existing l4 suite; if in-value, the "BBNF grammar files" tombstone is named and overturned), release vehicle. Separately: the DOM-congruence typing DESIGN is surfaced as its own decision — freeze-vs-C12 reconciled explicitly (signature-freeze, not byte-freeze). Kills F-06-as-grab-bag; ends the docket-after-the-cut inversion.

**CP-2 · BENCH WITNESS** — bench/ + the portable ratio gate on the producer surface; RED on real unmet-ratio measurement of the WIP rebuild (never red-by-absence); memo-defeat rule named; regex record inherited from CP-0 (measured once, ever); escalation row: 3 failed tuning iterations → owner.

**CP-3 · THE SEAT REBUILD (the honest name)** — parse-that `^1.0.0` from the registry; the deposed grammar skeleton resurrected with its module cut PRESERVED (no goldilocks re-cut — structure program's seam); the semantic layer transposed to the v4 typed model per CP-0's pattern (Fable designs per-domain, Opus sweeps per-production UNDER the pattern); calc arm per CP-1's R-EVAL verdict; regex parser retired; manifest WHITELIST rule; U-F29/U-F30 family tests; CHANGELOG. Gates: existing css corpus green UNCHANGED · producer+api green · ratio gate RED→GREEN · **kf suite green against the packed build (consumer gate INSIDE the swap — I-8)** · π pre/post pixel pair · anchors re-derived.

**CP-4 · GRAMMAR EXTENSION — every decided-YES row in one cut** — color-mix + relative-`from` + contrast-color (grammar half) + CP-1's decided-YES gated rows (HDR, spring-if-value); CP-1's vectors flip RED→GREEN; unchanged-green on the legacy corpus preserves swap-invisibility separately from new-capability RED→GREEN; tombstones authored for every decided-NO (the §7-1 discharge); ParseIssue union stays closed unless §D name-a-code fires; one DELTA capture.

**CP-5 · KF BOUNDARY LETTER + CENSUS LOCK** — thin coordination wave: the easing.ts:30/:38-39 consume-vs-ratify brief (RATIFY-lean, both priced), the kf-leverage spec from CP-1's census, the addendum-2 kf regex-census row, the zero-productions census-lock grep row, the `<SENDER>-INBOUND-*` dispatch. Seam verification already discharged inside CP-3.

**CP-6 · THE DUAL DEFINITION** — the full BBNF sub-grammar suite at CP-1's decided home, covering the CP-3+CP-4 grammar; congruence enforced by **behavioral equivalence tests** (both definitions over the shared conformance corpus, output-diffed; RED while any corpus family diverges) — no production-name-map gate; upstream-reconciliation ask letter to the BBNF session.

PT-E1/E2/E3 + the Sol banks: registry rows + a CP-3 contingency rider (C15 ceiling as a rider clause) — no wave.

**Zero-drop check:** every §4 row of the original program re-lands: F-01→CP-0 · F-02→CP-2 · F-03→CP-3 · F-04→CP-1 (census) + CP-1 docket (typing design surfaced) · F-05→CP-4 · F-06→CP-1 (decisions) + CP-4 (YES rows) + CP-4 tombstones (NO rows) · F-07→CP-5 (letter) + CP-3 (seam gate) · F-08→CP-6 + CP-0 (pilot) · F-09→registry rows + CP-3 rider. OD-PA-1/2/3/4/5 → the CP-1 single sheet; OD-PA-6 → CP-5.

---

## §3 — ONE-LINE SUMMARY FOR THE ADJUDICATOR

The program drops nothing but misunderstands its own hardest wave: the "mechanical restoration" is a semantic REWRITE on a reused skeleton (10/18 deposed files live in the RIGHTLY-tombstoned ValueUnit world; zero export-name overlap; a 536-LOC evaluator wired into the root production that v4 lacks entirely), and around that mispricing it hangs a false census dependency, two owner decisions sequenced after the wave that needs them, a formation-phase pilot booked as a wave, a duplicate regex measurement, a paperwork wave, an exported consumer gate, and a congruence gate in the owner-condemned grep genre. Six waves, correctly ordered and honestly named, cover the same rows.
