# V·π Codex-session finding assay

**Subject:** `SUBJECT.json` and `subject-ledger.tsv` in this directory.  
**Status:** pre-audit root claims queue; no requested Opus audit has run.  
**Vocabulary:** `ACCEPTED_FACT`, `REJECTED_CLAIM`, `RESEARCH_ONLY`,
`OPEN`, and `SUPERSEDED`.

This ledger records material findings stated or developed in the relevant Codex
sessions. The generated raw agent-message archives are the complete discovery
source. Messages containing no factual/design finding remain preserved there
and need no synthetic row here. A row’s disposition comes from current bytes,
executable replay, a pinned specification, browser witness, or an exact
cross-task receipt—not from repetition, eloquence, or an agent-authored
status field.

All labels below are the handoff author’s provisional classifications. The
receiving fresh-Opus audit must independently reproduce, amend, or reject every
row before any label earns audit credit.

## A. Scope, authority, and steering

| ID | finding | disposition | proof or consequence |
|---|---|---|---|
| A01 | V·π develops, perfects, and proves a prototype; the megatranche later performs production replacement and shipping | `ACCEPTED_FACT` | repeated direct owner prompts; `CHARTER.md`; no `src/` authority |
| A02 | “Not execution” does not defer greenfield parser implementation | `ACCEPTED_FACT` | owner’s first V·π prompt explicitly authorizes deep prototyping now |
| A03 | the target language is the full pinned July-2026 CSS corpus plus owner experiments | `ACCEPTED_FACT` | goal and owner prompt; 52 exports are not the denominator |
| A04 | the final implementation must be idiomatic, readable, non-contrived parse-that | `ACCEPTED_FACT` | owner steering of 2026-07-22; `ADDENDA-07` |
| A05 | every coherent feature receives ≥3 orthogonal prototypes, five hostile skeptics, and three adjudicators | `ACCEPTED_FACT` | owner steering and ratified `ADDENDA-07` |
| A06 | material scope/ownership/result/comparator changes receive an addendum | `ACCEPTED_FACT` | prior V steering and E-3 |
| A07 | spend little on contrived process and most effort on direct code, tests, benches, and visual verification | `ACCEPTED_FACT` | original V steering; E-4 |
| A08 | KISS/fewer LOC is a first-class design and review axis | `ACCEPTED_FACT` | original V steering; E-2 |
| A09 | no quick workaround, legacy dual path, alias, migration shim, or masking fallback | `ACCEPTED_FACT` | original V prompts; compatible public observations do not grandfather internals |
| A10 | the 48-hour mark was an arbitrary upper bound, not authority to narrow the language or evidence | `ACCEPTED_FACT` | direct owner clarification |
| A11 | BBNF is not owned or blocked by Claude | `ACCEPTED_FACT` | direct owner override; `bbnf-owner-unblock-2026-07-22.md` |
| A12 | requested fresh Opus audit occurred | `OPEN` | it has not run; this task prepares its subject and instructions only |
| A13 | historical Fable/Opus labels prove served model | `REJECTED_CLAIM` | rollout `turn_context` records actual Codex model; labels are intent only |
| A14 | raw prompts and Codex messages are fully discoverable for this audit | `ACCEPTED_FACT` | generated raw archives bind every canonical user-/assistant-role message occurrence |

## B. Current implementation truth

| ID | finding | disposition | proof or consequence |
|---|---|---|---|
| B01 | a working active CSS parser exists | `REJECTED_CLAIM` | active root has no public CSS/value/stylesheet barrel or root |
| B02 | active accepted parser code is one consume-number production | `ACCEPTED_FACT` | `mirror/apotheosis/grammar/css/l4/value-unit/numeric.ts`, SHA `8c3ac689…e95aa` |
| B03 | active strict TypeScript and tests are green | `ACCEPTED_FACT` | `npm run check`; one Vitest file, four tests |
| B04 | the narrow active green proves CSS correctness | `REJECTED_CLAIM` | it covers one internal numeric operation only |
| B05 | the pre-reset mirror is substantial runnable reference code | `ACCEPTED_FACT` | values/color/easing/timeline/analysis sources and tests remain present |
| B06 | the pre-reset mirror is accepted architecture | `REJECTED_CLAIM` | it depends on the owner-rejected scanner/atom/token-object/CST route |
| B07 | historical W0–W4 acceptance labels survive the reset | `REJECTED_CLAIM` | `ADDENDA-07 §0` explicitly removes grandfathered credit |
| B08 | full parser implementation is meaningfully complete | `REJECTED_CLAIM` | all higher families, public roots, denominator, integration, and close rails are absent |

## C. Direct-combinator architecture

| ID | finding | disposition | proof or consequence |
|---|---|---|---|
| C01 | parse-that requires a separate CSS lexer/token runtime | `REJECTED_CLAIM` | owner veto; direct numeric/foundation candidates demonstrate grammar composition |
| C02 | any use of a regex terminal is a lexer | `REJECTED_CLAIM` | a bounded terminal parser is permitted; the forbidden seam is a second runtime/tape/object architecture |
| C03 | imperative balanced scanning is permitted as general grammar infrastructure | `REJECTED_CLAIM` | terminal DAG ACK forbids source cursor/scanner and broad remainder capture |
| C04 | recursive combinator productions for nested blocks/functions are permitted | `ACCEPTED_FACT` | terminal BBNF boundary clarification |
| C05 | `tokens` is a primitive-production namespace | `ACCEPTED_FACT` | terminal DAG ACK; never authority for token objects/CST |
| C06 | module isomorphism means byte/file parity with BBNF | `REJECTED_CLAIM` | it means sound production ownership/import direction; subordinate modules are allowed |
| C07 | normative semantic productions need one owner | `ACCEPTED_FACT` | DAG ACK; spelling similarity alone does not merge contextually distinct productions |
| C08 | shared helpers should be invented before features | `REJECTED_CLAIM` | `ADDENDA-07` requires repeated accepted shapes before helper promotion |
| C09 | compatibility may distort the corrected grammar | `REJECTED_CLAIM` | adapters follow grammar adjudication and may not preserve a live bug inside grammar |
| C10 | direct candidate graphs may construct parsers per parse | `REJECTED_CLAIM` | static grammar is the idiomatic/performance requirement |

## D. BBNF and parse-that coordination

| ID | finding | disposition | proof or consequence |
|---|---|---|---|
| D01 | acknowledged BBNF CSS assay has fifteen modules and 276 declarations | `ACCEPTED_FACT` | content-addressed BBNF receipt at HEAD `af15f63e0…` |
| D02 | registered stylesheet reaches all fifteen | `REJECTED_CLAIM` | exact import closure reaches nine; six siblings are disconnected |
| D03 | committed BBNF has no duplicated owners | `REJECTED_CLAIM` | values/func-body math+substitution and stylesheet/keyframes duplicate families |
| D04 | the proposed corrected DAG is reachable and acyclic | `ACCEPTED_FACT` | terminal ACK of `MODULE-DAG.md` SHA `291e5145…daca8f` |
| D05 | that DAG ACK grants implementation or conformance credit | `REJECTED_CLAIM` | ACK explicitly covers structure/ownership only |
| D06 | published `@mkbabb/parse-that@1.0.0` is consumable authority | `ACCEPTED_FACT` | package integrity and source receipt |
| D07 | parse-that 1.0.0 contains a CSS-specific uplift | `REJECTED_CLAIM` | BBNF receipt says none is published |
| D08 | dirty/private BBNF generated/runtime work may be imported | `REJECTED_CLAIM` | no handback/publication/ack/local replay |
| D09 | Value must wait for an engine uplift | `REJECTED_CLAIM` | 1.0.0 supports the required direct grammar work |
| D10 | an uplift earns credit from a status report | `REJECTED_CLAIM` | requires same exact artifact ACK and local semantic/no-throw plus grammar×engine A/B |
| D11 | live BBNF worktree bytes are the acknowledged clean assay | `REJECTED_CLAIM` | current BBNF tree is heavily dirty; the exact acknowledged HEAD/tree remains the boundary |

## E. CSS semantic findings

Every accepted semantic row below is a required candidate fixture or ownership
law. It does not accept any historical implementation.

| ID | finding | disposition |
|---|---|---|
| E01 | empty functional color must return clean failure, not throw | `ACCEPTED_FACT` |
| E02 | animation substitution guard must defer `var`/`env` and respect typed math slotting | `ACCEPTED_FACT` |
| E03 | trailing color `/` without alpha is rejected | `ACCEPTED_FACT` |
| E04 | bare keyframe percentage is bounded `[0,100]` | `ACCEPTED_FACT` |
| E05 | a preceding comment is trivia and must not contaminate declaration name | `ACCEPTED_FACT` |
| E06 | HSL/HWB number saturation/lightness follows the specified normalization | `OPEN`; requires fresh normative replay |
| E07 | custom-property names preserve case | `ACCEPTED_FACT` |
| E08 | empty or trailing list items are rejected | `ACCEPTED_FACT` |
| E09 | legacy color syntax is comma-separated, modern syntax is space-separated, mixed form rejected | `ACCEPTED_FACT` |
| E10 | `scroll()`/`view()` commas are rejected | `ACCEPTED_FACT` |
| E11 | timeline offset needs a unit except zero | `ACCEPTED_FACT` |
| E12 | custom-property values need declared forward-compatible typed/raw policy, not silent loss | `ACCEPTED_FACT` |
| E13 | singular keyframe selector has exactly `from`, `to`, bounded bare percentage, or timeline-range-name plus mandatory unbounded percentage | `ACCEPTED_FACT` |
| E14 | timeline-range names are `cover`, `contain`, `entry`, `exit`, `entry-crossing`, `exit-crossing`, and `scroll` | `ACCEPTED_FACT` |
| E15 | comma-list composition sits above singular keyframe selector | `ACCEPTED_FACT` |
| E16 | values/timeline-range is the sole owner consumed by keyframes and properties | `ACCEPTED_FACT` |
| E17 | current BBNF keyframe owners already implement E13–E16 | `REJECTED_CLAIM` |

## F. Prototype findings

| ID | finding | disposition | proof or consequence |
|---|---|---|---|
| F01 | standalone number-start was a useful exported feature | `REJECTED_CLAIM` | retired as an unidiomatic zero-width lexical seam |
| F02 | consume-number G16/H2 is accepted within its exact operation | `ACCEPTED_FACT` | acceptance, five skeptic, three adjudicator, active integration evidence |
| F03 | G16 proves the full value-unit family | `REJECTED_CLAIM` | one numeric operation only |
| F04 | G13/G14 directional benches grant current acceptance | `REJECTED_CLAIM` | quintetti rejected their semantics/provenance/benchmark evidence |
| F05 | foundation G4 contains three candidate lineages for five operations | `ACCEPTED_FACT` | exact subject and bound source hashes |
| F06 | G4 H is a self-contained direct-combinator tree | `ACCEPTED_FACT` | only parse-that core and local imports; no scanner/CST path |
| F07 | G4 is already apotheosis-accepted | `REJECTED_CLAIM` | full persisted five-plus-three close absent |
| F08 | G4 holdout is proven blind | `REJECTED_CLAIM` | no pre-author custody/reveal chronology in subject |
| F09 | G4 revealed regression cases pass H/B/S | `ACCEPTED_FACT` | 25/25 replay and matching digest |
| F10 | G4 browser witness is green | `ACCEPTED_FACT` for exact subject | Chromium CSSOM/computed evidence; not full browser conformance |
| F11 | percentage G2 is direct composition over accepted numeric | `ACCEPTED_FACT` | `consumeNumber.skip(string("%")).map(...)` |
| F12 | percentage G2 is accepted/performance-green | `REJECTED_CLAIM` | exact benchmark beats public peers but loses prior internal lane |
| F13 | known-dimension G0 is accepted | `REJECTED_CLAIM` | three reviews find identifier-boundary defects |
| F14 | known dimensions should use the canonical identifier grammar as boundary assertion | `OPEN` | strong repair direction; needs new independent candidate generation |
| F15 | keyframe G0 authored parser candidates | `REJECTED_CLAIM` | boundary rejected before code |
| F16 | pre-reset color/easing/timeline implementations grant current feature credit | `REJECTED_CLAIM` | counterexamples survive; code does not |

## G. State, hostility, evidence, and benchmark findings

| ID | finding | disposition | proof or consequence |
|---|---|---|---|
| G01 | every public CSS entry must be no-throw on arbitrary input | `ACCEPTED_FACT` | owner hardening law |
| G02 | exact hashes prove semantic adequacy | `REJECTED_CLAIM` | identity and chronology are necessary but insufficient |
| G03 | self-authored JSON can prove independent review/custody | `REJECTED_CLAIM` | multiple consume-number generations reproduced forgery/admission seams |
| G04 | a hidden corpus is blind without pre-author seal/custody | `REJECTED_CLAIM` | chronology must bind candidate absence, custodian, seal, and reveal |
| G05 | a valid failed attempt may be erased by retry | `REJECTED_CLAIM` | append-only evidence law |
| G06 | copied comparator regex proves exact peer execution | `REJECTED_CLAIM` | comparator must resolve and run the pinned implementation |
| G07 | timing unlike operations supports a strict win | `REJECTED_CLAIM` | semantic and operation equivalence precede timing |
| G08 | candidate-relative timing supports a full-parser win | `REJECTED_CLAIM` | broad performance remains open |
| G09 | UTF-16 code units may be reported as UTF-8 MB/s | `REJECTED_CLAIM` | unit identities remain explicit |
| G10 | browser CSSOM is useful third-witness evidence | `ACCEPTED_FACT` | exact G4 witness; expand per resolving feature |
| G11 | `.skip` suffix failure in parse-that 1.0.0 was observed to restore offset while retaining the successful child value | `RESEARCH_ONLY` | reproduced across G4 candidates; parent-integration contract must be established before engine-defect claim |
| G12 | million-unit/large hostile inputs remained bounded for exact G4 H operations | `ACCEPTED_FACT` for exact subject | state skeptic measurements; does not generalize to full parser |
| G13 | grammar construction must be static and parser-ID bounded | `ACCEPTED_FACT` | G14 S demonstrated per-parse construction exhaustion |

## H. Denominator and corpus-analysis findings

| ID | finding | disposition | proof or consequence |
|---|---|---|---|
| H01 | exact source universe enumerates 168 top-level CSSWG source choices at commit `c7573530…` | `ACCEPTED_FACT` | `denominator/source-universe.json` mechanical census |
| H02 | the 76-root seed is owner-ratified full denominator | `REJECTED_CLAIM` | seed is proposed/not ratified; 92-source complement remains unclassified |
| H03 | source enumeration equals normative operation closure | `REJECTED_CLAIM` | occurrence/algorithm ownership and exclusions remain open |
| H04 | complement V3 grants neutral discovery routing only | `ACCEPTED_FACT` | its acceptance explicitly denies semantic ownership credit |
| H05 | occurrence-owner V1–V9 prove denominator ownership | `REJECTED_CLAIM` | all generations/repairs remain rejected or research-only |
| H06 | those tools exposed real failure classes | `RESEARCH_ONLY` | source-state, markup, reference, ownership, oracle, no-throw, collision, and work-accounting counterexamples |
| H07 | the automatic analyzer must close before grammar implementation | `REJECTED_CLAIM` | owner direct-work law; local feature boundaries can progress in parallel |
| H08 | full denominator may be claimed before exact occurrence-to-feature bijection | `REJECTED_CLAIM` | `ADDENDA-07 §2` close condition |

## I. Process and convergence findings

| ID | finding | disposition | proof or consequence |
|---|---|---|---|
| I01 | the session produced much more evidence machinery than accepted grammar | `ACCEPTED_FACT` | inherited subject has >1,100 files; active accepted parser is seventeen LOC |
| I02 | the many consume-number generations are the preferred template for every feature | `REJECTED_CLAIM` | process granularity was pathological |
| I03 | 3×5×3 should be ignored to accelerate | `REJECTED_CLAIM` | direct owner law remains binding |
| I04 | every terminal constant should become its own 3×5×3 feature | `REJECTED_CLAIM` | feature is the smallest coherent independent operation, not every named constant |
| I05 | one compact reusable evidence shape is preferable to repeated prose forests | `ACCEPTED_FACT` | `ADDENDA-07 §6.1`, subject to first-principles simplification |
| I06 | corpus analyzer and admission CLI are parser critical path | `REJECTED_CLAIM` | next work begins in grammar verticals |
| I07 | accepted grammar verticals, not artifact volume, measure convergence | `ACCEPTED_FACT` | owner status corrections and current audit |
| I08 | the current goal must be narrowed to achieve closure | `REJECTED_CLAIM` | full objective remains active |

## J. Addenda and cross-repository findings

| ID | finding | disposition |
|---|---|---|
| J01 | `ADDENDA-01` continues to define full-CSS/hardening/coordination scope | `ACCEPTED_FACT` |
| J02 | `ADDENDA-02` is ratified implementation authority | `REJECTED_CLAIM` |
| J03 | `ADDENDA-03..05` accept old W1–W3 code | `REJECTED_CLAIM` |
| J04 | `ADDENDA-03..05` counterexamples should be discarded | `REJECTED_CLAIM` |
| J05 | the entire `ADDENDA-06` lifecycle remains active | `REJECTED_CLAIM` |
| J06 | the small benchmark identity/paired/raw/no-retry laws extracted into `ADDENDA-07` remain active | `ACCEPTED_FACT` |
| J07 | `ADDENDA-07` is the owner-ratified architectural reset and prototype law | `ACCEPTED_FACT` |
| J08 | Glass receipts authorize Value parser/package/consumer edits | `REJECTED_CLAIM` |
| J09 | Glass/SCI/Atlas execution is part of this V·π prototype | `REJECTED_CLAIM` |
| J10 | exact external receipts may be recorded without performing their held action | `ACCEPTED_FACT` |

## K. Open completion obligations

1. Freeze and independently challenge the exact full normative/experimental
   denominator.
2. Accept the direct token/source foundation, including preprocessing and
   original-offset mapping.
3. Accept value-unit, substitution, typed math, function-body, and generic
   component-value grammar.
4. Accept color/images/gradients, transforms/motion/filters,
   easing/animation/timeline, selectors, conditions, declarations/properties,
   at-rules, recovery, and stylesheet roots.
5. Make every claimed family reachable through the adjudicated DAG.
6. Add explicit grammar-shaped results, diagnostics, source preservation, and
   canonical/source-preserving serialization where required.
7. Build the 52-export/37-consumer compatibility layer over accepted grammar
   without retaining a legacy parser path.
8. Run complete spec/live/browser/WPT-classified differentials, no-throw/fuzz,
   hostile limits, round trips, and integrated strict comparable benches.
9. Write `PI-CLOSE.md` only after every charter rail is proven.
10. Leave production replacement, consumer wiring, package release, and ship
    to the separately authorized megatranche.
