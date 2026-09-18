# Parser P4 full-CSS denominator

Date: 2026-07-29

Status: **ROOT P4 AUTHORITY ADDENDUM — ZERO EXECUTION CREDIT**

This addendum binds the minimum standards, consumer, correctness, and
performance denominator for the P4 novelty loop authorized by
`PARSER-P4-ROOT-NOVELTY-REOPEN-2026-07-29.md`.

It does not admit a parser candidate, reopen Value execution, authorize product
source changes, relax the scannerless or equal-product laws, or grant release,
consumer, visual, package, or BBNF credit.

## 1. Ruling

The recurring `753` count is only the current canonical Webref property count.
It is not a full-CSS denominator.

The exact current authority is `@webref/css@8.7.1`:

- git head:
  `d3c8b8167e3d550525f84b823b5e99e726c37369`;
- tarball shasum:
  `481d6fd53548a0248eab2785739835d4cb2fac10`.

| Scope | Raw authority rows | Active canonical rows | Binding disposition |
|---|---:|---:|---|
| Properties | 817 | 753 | 64 `legacyAliasOf` rows are explicit PRUNE/refusal rows |
| Functions | 162 scoped rows / 154 names | 162 | preserve `for` scope; name deduplication is false coverage |
| Types | 524 scoped rows / 523 names | 524 | preserve the scoped duplicate |
| Property/function/type subtotal | 1,503 | 1,439 | 1,330 grammar-bearing plus 109 prose/manual rows |
| At-rules | 56 | 56 | required for an unqualified full-CSS claim |
| Selectors | 158 | 158 | required for an unqualified full-CSS claim |
| All Webref categories | 1,717 | 1,653 | all 64 aliases retain terminal dispositions |

Therefore:

- `1,439` is the minimum active property/value/function/type implementation
  denominator;
- `1,653` is the minimum active Webref denominator for an unqualified
  “full CSS parser” claim;
- `1,717` remains the raw ledger denominator because silent omission of the 64
  aliases is forbidden;
- a parser that leaves at-rule-specific grammars and selectors opaque must call
  itself a **CSS Syntax plus full current property/value grammar parser**, not a
  full CSS parser.

## 2. CSS Syntax behavioral denominator

CSS Syntax defines preprocessing, tokenization-equivalent decisions, tree
construction, recovery, and parser entry points. It permits on-demand
tokenization and one-token lookahead. A source-direct fused implementation is
therefore admissible only when its observable behavior equals the specification
without materializing a token array, event tape, scanner facade, token public
API, generated table, bytecode, VM, alternate runtime, or raw-string fallback.

### 2.1 Preprocessing

- CR, FF, and CRLF normalize to LF.
- NULL and surrogate code points normalize to U+FFFD.
- The normalized reader retains an exact mapping to original JavaScript UTF-16
  offsets for spans and source projection.

### 2.2 Token-equivalent decisions

All 25 classifications remain observable branch obligations:

1. ident;
2. function;
3. at-keyword;
4. hash;
5. string;
6. bad-string;
7. URL;
8. bad-URL;
9. delimiter;
10. number;
11. percentage;
12. dimension;
13. unicode-range;
14. whitespace;
15. CDO;
16. CDC;
17. colon;
18. semicolon;
19. comma;
20. open square bracket;
21. close square bracket;
22. open parenthesis;
23. close parenthesis;
24. open brace;
25. close brace.

Values, units, signs, integer/number flags, hash flags, escapes, bad-URL
remainders, and original source ranges are equal-product obligations even when
no token object exists.

### 2.3 Entry points

All ten entry points are required:

1. parse according to a CSS grammar;
2. parse a comma-separated list according to a CSS grammar;
3. parse a stylesheet;
4. parse a stylesheet’s contents;
5. parse a block’s contents;
6. parse a rule;
7. parse a declaration;
8. parse a component value;
9. parse a list of component values;
10. parse a comma-separated list of component values.

### 2.4 Tree algorithms and microsyntax

The ledger must bind all eleven tree algorithms:

- stylesheet contents;
- at-rule;
- qualified rule;
- block;
- block contents;
- declaration;
- component-value list;
- component value;
- simple block;
- function;
- unicode-range value.

`An+B`, declaration/rule-list variants, `<declaration-value>`, and `<any-value>`
are separate obligations.

### 2.5 Recovery and fidelity

Required recovery includes:

- top-level CDO/CDC;
- unknown at-rules and qualified rules;
- declaration-versus-nested-rule mark/restore;
- bad declaration consumption;
- bad strings and bad URLs;
- stray closers;
- EOF auto-closing of strings, functions, and blocks;
- `!important`;
- nested declaration groups;
- parser-provenanced opaque unknown syntax;
- exact custom-property source;
- immutable diagnostics on successful recovery.

Recognized semantics require parse → canonical serialize → parse equivalence.
Opaque syntax retains its exact source slice and provenance. CSSOM and the
owning feature specification govern serialization; P4 may not invent a second
general serializer.

## 3. Webref row schema

Every raw row carries:

```text
category
name
for/scope
href/spec
syntax | prose/manual
legacyAliasOf
owner
entryPoint
positiveCorpus
negativeCorpus
recoveryCorpus
UTF16SpanCorpus
canonicalInverseCorpus
WPTManifestRows
consumerRefs
status
terminalDisposition
evidenceHash
```

The denominator fails closed on:

- missing or duplicate scoped rows;
- function/type name deduplication;
- missing `for` scope;
- a grammarless row without a prose/manual contract;
- legacy aliases counted as canonical coverage;
- unowned rows;
- empty positive, negative, recovery, span, or inverse obligations where
  applicable;
- Webref version, git-head, or tarball drift.

The 109 active no-syntax rows are not optional. Each needs an exact
prose/manual contract and source-bound tests.

## 4. CSS Values 5 overlay

The current CSS Values 5 overlay is 60 Webref rows:

- 22 function rows;
- one property row;
- 37 type rows.

These rows are already members of the Webref denominator. They are a signed
freshness/volatility overlay, not 60 additive coverage credits.

The overlay separately gates:

- free-form `{}` argument wrapping;
- URL modifiers;
- flow-relative positions;
- progress, mix, and interpolation families;
- `<whole-value>`;
- `first-valid()`, `if()`, `toggle()`, `var()`, `inherit()`, `attr()`, and
  `ident()`;
- `random()` and `random-item()`;
- sibling count/index;
- `calc-size()` and `interpolate-size`;
- boolean expressions;
- arbitrary substitution, invocation/spread, cycle detection, and depth
  safety;
- specified-time acceptance versus computed-time invalidity.

## 5. Value standards and extension split

Current Webref standardizes:

- `ictcp()`;
- `jzazbz()`;
- `jzczhz()`.

The exact verified Value additions are:

- `hsv()`;
- `kelvin()`.

The first three are standards-correction rows, not extension credit. The latter
two are explicit Value-owned extension grammar/inverse rows with typed
construction, finite/range/refusal semantics, collision-free spelling, and
non-Webref status.

## 6. Keyframes consumer denominator

The exact census is:

- 49 direct imports across 47 files;
- two `import.meta.resolve()` literals;
- two bench HTML import-map keys;
- 53 references across 51 files total.

Admission covers stylesheet, rule, declaration, keyframe selector, CSS value,
color, timing function, animation range/timeline, scroll/view timeline,
animation shorthand inverse, ordered-longhand projection, composition
longhand, typed `linear()` stops, transform list, motion-path properties, CSS
`path()`, SVG `d`, typed `PathGeometry`, collectors, and canonical serializers.

Ownership remains:

- `/css`: CSS grammar, values, transform/motion properties, and inverses;
- `/path`: SVG path grammar/inverse and typed geometry;
- `/transform`: numeric matrix/decompose/slerp only and zero parsing;
- Keyframes: computed-style resolution, scheduling/composition,
  timeline-to-progress, callable curve sampling, and DrawSVG browser geometry.

Keyframes-authored `spring()` remains a separately labeled consumer extension
unless a later explicit Value-extension ruling moves it.

## 7. KISS source-direct architecture

The only currently admissible shape is:

```text
original JavaScript string
  → normalized code-point reader with original UTF-16 map
  → parse-that cursor/state/mark/restore/recovery primitives
  → Value-owned CSS branch predicates and semantic combinators
  → typed Value result + exact spans + immutable diagnostics
```

A private scalar lookahead may transiently carry an equivalent kind, value, and
flags until immediately consumed. It may not become a token object array,
event tape, public token API, scanner facade, generated grammar/table, VM,
compiled alternate runtime, compatibility tier, or raw fallback.

## 8. Existing-mechanism dispositions

| Mechanism | Terminal direction |
|---|---|
| parse-that cursor, UTF-16 offsets, transactions, Result, diagnostics, recovery, recursion | KEEP |
| CSS grammar, typed results, opaque syntax, inverses | KEEP in Value |
| `splitTopLevel`, `splitValueTokens`, `splitDeclarations`, `emptyComma`, `blocks`, timeline regex splitters | FOLD into fused Value combinators, then PRUNE |
| Value SVG path regex scanner | MOVE into the sole Value `/path` grammar, then PRUNE |
| Keyframes CSS serializer/scanner/timeline grammar | MOVE/FOLD into Value, then PRUNE after exact migration |
| Webref data | KEEP as denominator/corpus authority only |
| generated product grammar/code | PRUNE |
| token/event tape, P5 token plane, public Token abstraction | PRUNE |
| 64 legacy aliases | PRUNE/refuse explicitly |
| grammarless Webref rows | SPLIT into prose/manual contracts |
| CSS Values 5 rows | SPLIT as a 60-row overlay |
| `ictcp`/`jzazbz` non-CSS classification and missing `jzczhz` | FOLD into standards correction |
| `hsv`/`kelvin` | KEEP as the two explicit Value extensions |

## 9. WPT authority

Admission uses immutable per-file manifests, not prose totals or selected
examples. The current root audit observed these official subtree coordinates:

| Subtree | Tree SHA prefix | Blobs / test-like files |
|---|---|---:|
| `css/css-syntax` | `7e685096` | 74 / 65 |
| `css/css-values` | `31ae610d` | 670 / 614 |
| `css/css-animations` | `124e7b8b` | 297 / 291 |
| `css/css-easing` | `42d240cc` | 17 / 15 |
| `css/css-transforms` | `a1046db0` | 1,314 / 1,251 |
| `css/css-shapes` | `20e19dee` | 580 / 531 |
| `scroll-animations` | `63070f1f` | 287 / 285 |
| `scroll-animations/animation-trigger` | `d3132389` | 54 / 54 |
| `svg/path` | `b94f6591` | 92 / 91 |
| `css/css-motion-path` | `4d8cfd30` | 1 / 1 |

These are file-roster counts, not test-case counts. Every applicable test ID
needs a disposition, and every exclusion needs an exact rationale. The former
83-production/325-probe corpus remains historical focused regression evidence
only.

## 10. Admission gates

P4 remains RED until all of the following are green:

1. exact Webref, CSSWG, and WPT identities;
2. preprocessing, 25 decisions, ten entry points, eleven algorithms, recovery,
   and source fidelity;
3. raw `1,503/1,503` and active `1,439/1,439` closure, or raw `1,717/1,717`
   and active `1,653/1,653` for the full-CSS claim;
4. `60/60` Values 5 overlay with no double credit;
5. exactly two Value extension rows and three corrected HDR standards rows;
6. all 53 Keyframes references across 51 files plus every deletion, inverse,
   package-tier, and evaluation-graph cell;
7. state, value, immutable result, success, failure, diagnostics-off/on,
   recovered success, recursion, overlap, UTF-16 span, and inverse equality;
8. accepted-M2 equal-product performance with:
   - fresh-process rotating AB/BA;
   - exact-bootstrap CI-low `>=10x` on every binding plane;
   - scales 4, 8, 16, 33, 96, 753, 1,439, and 1,653 for a full claim;
   - cold construction plus first parse;
   - hot steady state and alternating shapes;
   - ASCII, non-ASCII, escaped, and malformed UTF-16;
   - recovery and failure tails;
   - full Value stylesheet and named `jsonParser` receipts;
   - allocations, retained heap, GC, IC, and deopt evidence.

Median-only passes, plane aggregation, recognizer shortcuts, target waivers,
and `753`-only claims are forbidden.

## 11. P4 jury contract

### Sol architecture/research

- freeze the `1,503/1,439` or `1,717/1,653` claim;
- prove the CSS Syntax behavioral bijection;
- reproduce scoped duplicates, 109 manual rows, and 64 aliases;
- reproduce the 60-row Values 5 overlay;
- correct the HDR/extension split;
- bind 53 Keyframes references/51 files;
- prove source-direct equivalence with no forbidden plane;
- predeclare every correctness, performance, memory, and engine falsifier.

### Luna prototype

- build a fail-closed denominator validator;
- implement an isolated source-direct CSS Syntax vertical;
- exercise the complete Webref registry without generated product grammar;
- exercise all 60 Values 5 rows;
- prove the stylesheet → Keyframes/timing/transform/motion/path vertical;
- run equal-product performance through 1,439 and 1,653 scales;
- prove package/evaluation tiers and absence of forbidden artifacts.

### Fresh Sol adjudication

- independently rederive every identity and count;
- run omission, duplication, scope-erasure, alias-credit, no-syntax-vacuity,
  and Values-5-double-credit mutants;
- falsify preprocessing, branch decisions, recovery, spans, original-source
  fidelity, and inverses against CSSWG/WPT;
- recompute every exact-bootstrap CI-low from raw samples;
- audit for token/tape, scanner facade, generated grammar, VM, fallback,
  alternate runtime, compatibility alias, and raw-string escape;
- recount Keyframes adoption/deletion and package tiers;
- return CLEAN only when every row above is green.

Otherwise the adjudicator names the exact remaining row and authors the next
bounded iteration. It may not waive performance, ownership, standards, or KISS
laws.

