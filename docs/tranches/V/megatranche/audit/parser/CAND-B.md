# CAND-B — dispatch-first, table-driven `<color>`

## Model receipt

I observe myself to be **Opus 5** — exact model id `claude-opus-5[1m]`, the 1M-context seat —
running as the Candidate B subagent of the mega-tranche parser band. Every number below was
produced by running a command in this session. I read GROUND-A, GROUND-B, GROUND-C, the
`idiom/example.ts` yardstick, the salvaged fixtures, `@mkbabb/parse-that@1.0.0`'s shipped bundle,
and `src/css/grammar.ts`. **I did not read the other candidates' directories.**

Subject: `value.js` @ `tranche-u` / HEAD `c654824e`. Measured 2026-07-24.

---

## §0 · What is here, and the gate

Four files of parser, three of tests. Nothing else — no gate generator, no admission CLI, no
evidence schema, no governance document.

| file | lines | what it is |
| --- | ---: | --- |
| `prototypes/css-parser/cand-b-dispatch/ast.ts` | 148 | the `<color>` tree + the outcome union + two total accessors |
| `prototypes/css-parser/cand-b-dispatch/table.ts` | 308 | **the table** — pure data, imports no `Parser` |
| `prototypes/css-parser/cand-b-dispatch/grammar.ts` | 622 | terminals, ONE generic production, the dispatch assembly, the entry |
| `prototypes/css-parser/cand-b-dispatch/coverage.test.ts` | 440 | 30 tests — GROUND-A §A scoreboard, R-rows, values, declared divergences |
| `prototypes/css-parser/cand-b-dispatch/hostility.test.ts` | 239 | 13 tests — MT-F001, the crash *language*, the salvaged corpus, fuzz, depth |
| `prototypes/css-parser/cand-b-dispatch/structure.test.ts` | 177 | 16 tests — the GROUND-B §6 checklist run against my own source |

Source is **714 effective lines** with comments and blanks stripped (`ast` 94 · `table` 202 ·
`grammar` 418), printed by `structure.test.ts` on every run so the figure cannot drift from the
report.

**The gate, verbatim, from `docs/tranches/V/megatranche/prototypes/css-parser`:**

```
$ npm run check && npx vitest run cand-b-dispatch

> @value-js/mt-css-parser@0.0.0 check
> tsc --noEmit


 RUN  v3.2.7 /Users/mkbabb/Programming/value.js/docs/tranches/V/megatranche/prototypes/css-parser

 ✓ cand-b-dispatch/coverage.test.ts (30 tests) 36ms
stdout | cand-b-dispatch/structure.test.ts > size > reports the candidate's line counts
CAND-B source: ast.ts 94/149  ·  table.ts 202/309  ·  grammar.ts 418/623 | total effective 714

 ✓ cand-b-dispatch/structure.test.ts (16 tests) 78ms
 ✓ cand-b-dispatch/hostility.test.ts (13 tests) 342ms

 Test Files  3 passed (3)
      Tests  59 passed (59)
   Start at  17:19:08
   Duration  1.36s (transform 177ms, setup 0ms, collect 432ms, tests 456ms, environment 2ms, prepare 588ms)

EXIT=0
```

The whole-workspace `npm test` is also green — **13 files, 325 tests, EXIT=0** — which includes
GROUND-A/B/C's 218 and another seat's files that vitest picked up by glob. I did not read those
files; I report only that the shared suite stayed green with mine added.

Environment: Darwin 25.4.0 (arm64), node v26.0.0, TypeScript 5.8.3, vitest 3.2.7,
`@mkbabb/parse-that@1.0.0` (the published package; no source-tree import anywhere).
`tsconfig.json` is `strict` + `noUncheckedIndexedAccess` + `verbatimModuleSyntax`. **No config
exclusion is doing any work here** — `include` is `**/*.ts` and nothing is skipped.

**Non-null assertions in my own code: 0. `as` casts: 0.** Both asserted mechanically against the
stripped source, not claimed.

---

## §1 · The formulation

**Every colour function is a row; one production reads the rows; `dispatch()` picks the row by the
first byte.**

`table.ts` is data — it imports no `Parser` and could be JSON. Each row answers four questions:
what is it spelled, what space does it name, what are its channels, does it have a legacy comma
form. Nine rows cover css-color-4's entire `<color-function>` set plus `device-cmyk()`.

```ts
{ names: ["hsl", "hsla"],
  space: { kind: "fixed", space: "hsl" },
  channels: positional(HUE, PERCENTAGE_OR_EQUIVALENT_NUMBER, PERCENTAGE_OR_EQUIVALENT_NUMBER),
  legacy: true,
  channelNames: ["h", "s", "l"] }
```

`grammar.ts` holds one channel fold, `sequence()`, and one function builder, `colorFunction(row)`.
Everything a colour function needs is derived: arity from the channel list, unit rules from the
per-channel `percentRef`/`numberScale`, the comma regime from `legacy`, the `none` prohibition from
`legacy`, relative-syntax channel keywords from `channelNames`. There is **no per-function code** for
rgb, hsl, hwb, lab, lch, oklab, oklch, color or device-cmyk. Adding `device-cmyk()` — a
four-channel function css-color-4 does not have — was one data row and zero grammar lines.

The top level is one `dispatch()` over the first byte, built programmatically from every arm:
9 function rows, 2 colour-call rows, `color-mix`, 148 `<named-color>` keywords, `transparent`,
`currentColor`, 19 `<system-color>`s, `var`/`env`, and `#`. Arms sharing a first byte become one
`any()` bucket ordered **longest spelling first**, which is what keeps `greenyellow` from being read
as `green` — pinned by a test that computes every prefix pair in the keyword table.

Two `Parser.lazy` calls, one per back-edge: `<color>` re-entering itself (color-mix, light-dark,
`from`), and the balanced `( … )` group used to *skip* an unmodelled call.

The entry is `parseState()` + `isError`, returning a discriminated union with a typed failure code.
`Parser.parse()` is never called anywhere — asserted.

---

## §2 · The bet, judged honestly

**The bet paid on the channel functions and lost on everything shaped differently.** Four costs,
each marked `TABLE COST n` in `table.ts` at the line where it bit:

**TABLE COST 1 — `color()`'s space is an argument, not a constant.** The row's `space` field had to
become a union (`fixed` | `head`), and the generic production needed one branch. Small, contained,
and arguably a strength: the head is data too (an authored-spelling → canonical-id map, which is
where `xyz` → `xyz-d65` aliasing lives). **Verdict: the table absorbed it.**

**TABLE COST 2 — `color()`'s *relative* channel keywords depend on the head value.** `color(from red
srgb r g b)` uses `r g b`; `color(from red xyz x y z)` uses `x y z`. A static row cannot express a
per-head keyword set, so the row carries the union of both and over-accepts
`color(from red srgb r y b)`. **Verdict: the table could not express it; the row lies slightly, and
says so in a comment.**

**TABLE COST 3 — `light-dark()` and `contrast-color()` are not channel functions at all.** They take
colours. They got a second, three-line table (`names`, `name`, `arity`) and — because a per-row
*builder closure* would stop the table being data — their AST node is the generic
`{ kind: "call", name, args }` instead of named fields (`{ light, dark }`). **Verdict: the table
forced a less specific AST.** A consumer must go through the `pair()` accessor instead of reading
`node.light`. That is a real ergonomic cost charged to the formulation.

**TABLE COST 4 — a custom `@color-profile` has profile-defined arity.** `color(--swop5c 0.1 0.2 0.3
0.4)` has four channels; no fixed channel list can say "as many as the profile defines". The channel
spec became a union (`positional` | `uniform`) and `color` became **two rows with the same
spelling**. **Verdict: absorbed, but it cost a type variant and a duplicate row.**

**And the outright disproof: `color-mix()` is not a row and cannot be made one.** It has no
channels; it has an interpolation-method head with its *own* colour-space list, split by geometry
because only a polar space may carry a hue-interpolation method; and it has two colour arguments
whose `<percentage>` may sit on either side (`&&`). It is 30 hand-written lines in `grammar.ts`
under a comment saying exactly that. Relative colour syntax is the same story one level down: it
reuses `channelNames` from the table, but its *values* are symbolic, so it needed its own element
parser and its own node variant.

**Summary of the thesis under test.** Nine of the eleven colour functions in css-color-4/5 are
genuinely regular and the table beats repetition for them decisively — the per-function code is
zero, and the R6/R3/R9/legacy-`none` corrections were each made **once** rather than nine times,
which is the strongest argument for the formulation. The two that are not regular
(`color-mix`, relative syntax) had to be written out longhand, and one production (`color()`) needed
three of the four widenings on its own. A reviewer who wants the table smaller should note that
`color()` is 3 of 4 costs: a formulation that treated `color()` as a hand-written production and
tabled only the eight fixed-space functions would be simpler, and would lose the `xyz` aliasing and
custom-profile handling that fall out of the head table.

---

## §3 · R1 is retired, and the fix is structural

All eight MT-F001 inputs return a failure value. So do the ten in `fixtures/salvaged.ts`. So do all
**250** members of the generated crash *language* (25 function heads × 10 blank bodies), which is
the right denominator because GROUND-A §3 established the fault is an unbounded input class, not
eight strings. Every failure carries an integer offset. The same heads with a non-blank body still
parse — the fix is not a blanket refusal.

The cure is not a guard. `rgb()` fails because the channel fold's first element is a `<number>` or
`none` terminal and `)` is neither: there is no array to index, therefore no index to assert on, and
`noUncheckedIndexedAccess` never had to be overridden. The subject's
`splitTopLevel(slash[0]!.replace(…))` has no counterpart in this candidate because there is no
`splitTopLevel`, no `depth`, no `quote`, no `for` loop and no `source[i]` — all asserted by
`structure.test.ts`.

Also proven, because "never throws" is easy to fake:

- the **salvaged hostile corpus** (number/dimension/percentage/ident-boundary families) plus 35
  colour-shaped hostile strings — no throw, and **no throw at the grammar level either**: the same
  corpus is re-run against the raw `colorRoot.parseState`, outside the entry point's guard, so the
  guard is provably not load-bearing;
- the **pathological-length generators** (32K mantissas, 1M-unit prefixes) — no throw;
- **3000 deterministic fuzz inputs** over a CSS-shaped alphabet, at both levels — no throw.

**The one honest limit, disclosed rather than hidden:** a recursive-descent grammar's nesting depth
is bounded by the JS call stack. Measured, `color-mix(in srgb, …` parses at 500 levels and exhausts
the stack near 1000. The entry point therefore carries **one `try`** — the only one in the candidate
— converting that engine limit into a failure value, and a test asserts that the *raw* root does
throw `RangeError` at 4000 levels, so the limit is visible rather than papered over.

---

## §4 · Coverage — 37 of GROUND-A's numbered §A productions

Scored by importing `denominator/productions.ts` and running **its** probe inputs, so the
denominator is GROUND-A's numbering and not one I chose. The scoreboard is pinned id-by-id in
`coverage.test.ts`; drift in either direction fails the build.

```
GROUND-A §A (entry parseCssColor) = 37 productions

CAND-B    SHIPS 33 · DEFERRED 3 · GAP 1 · UNSOUND 0 · CRASH 0
LIVE      SHIPS 22 · DEFERRED 3 · GAP 10 · UNSOUND 1 · CRASH 1
```

**Tier 1: 24 of 24 SHIPS.** That includes the two GROUND-A booked as broken:

| id | production | LIVE | CAND-B |
| --- | --- | --- | --- |
| P-036 | hostility floor for `parseCssColor` | **CRASH** | **SHIPS** |
| P-037 | malformed alpha must not be accepted | **UNSOUND** | **SHIPS** |

**Tier 2: 6 gaps closed, 3 deferrals held.** P-012 (`rgba(r,g,b,a)`) · P-015 (`hsla(h,s%,l%,a)`) ·
P-024 (`none` through xyz-d50) · P-028 (`color-mix()`) · P-029 (`light-dark()`) · P-032
(`<color-interpolation-method>`) all move GAP → SHIPS. P-007 (`currentColor`), P-008
(19 `<system-color>`s) and P-027 (relative syntax) stay **DEFERRED with the identical typed
`color_context_required`** the live parser uses — a context-free parser must not invent a
resolution, and matching the live contract here is deliberate, not an omission.

P-024 is worth a sentence because it is free rather than clever: the live parser cannot pass it
because it performs a Bradford D50→D65 adaptation *inside the parser*, and adaptation needs concrete
numbers. This candidate does no colour-space conversion at all, so `none` flows through untouched.

**Tier 3: 3 of 4 closed.** P-026 (custom `@color-profile`) · P-030 (`contrast-color()`) · P-031
(`device-cmyk()`). **P-033 (`<math-function>` as a colour component) is NOT closed** and is the
single GAP — see §7.

Supporting identity checks, not just probes: all **148** named colours parse in three spellings and
each agrees with its own `#rrggbb`, and the keyword set is cross-checked name-for-name against the
scraped `css-color-4-named-colors.json`; all **19** system colours are cross-checked against the
scraped table and each refuses with the typed code.

---

## §5 · Divergences, declared

GROUND-C §3.5 makes the R-ledger a closed whitelist: a live/replacement disagreement not on it is a
defect in the replacement. **Fourteen colour rows (R1 ×2, R3 ×3, R6 ×2, R9 ×7) are tested and all
land on `correct`**, including R6 as a *value* comparison (`hsl(120 50 50)` → s = 0.5, not 50) and
both directions of R9 (mixed separators rejected, all-comma legacy alpha accepted).

I found **four disagreements that are not on the ledger**. Rather than let them be discovered, they
are declared as executable claims — proposed new rows for the adjudication to accept or reject:

| id | input | LIVE | CAND-B | basis |
| --- | --- | --- | --- | --- |
| **B-1** | `hsl(50% 50% 50%)` | accepts (hue = 180deg) | rejects | css-values-4 §7.1: `<hue> = <number> \| <angle>`. No percentage arm. |
| **B-2** | `rgb(1. 2 3)` | accepts (1) | rejects | CSS Syntax §4.3.12: `1.` is `<number 1>` + `<delim .>`. |
| **B-3** | `rgb(none, 2, 3)` | accepts | rejects | css-color-4 §7.1: `none` exists only in the modern grammars. |
| **B-4** | `rgb(1-2 3)` | rejects | accepts (1, −2, 3) | CSS tokenisation: `1-2` is two number tokens. **Weakest of the four — derived from the tokeniser, not verified in a browser.** |

And two **value** divergences created by this candidate's design line — *unit normalisation is
parsing; colour-space conversion is the colour model's job*:

- **D-1** `color(srgb 1 0 0)` → `{ space: "srgb", channels: [1,0,0] }`. LIVE returns
  `{ space: "rgb", channels: [255,0,0] }`.
- **D-2** `color(xyz-d50 1 0 0)` keeps `xyz-d50`. LIVE Bradford-adapts to `xyz` inside the parser.

Both are ports' decisions to make, and both are pinned as tests. D-2 is the one I would defend
hardest: doing chromatic adaptation in a parser is what costs LIVE production P-024.

---

## §6 · GROUND-B §6, scored

| # | rule | CAND-B |
| --- | --- | --- |
| 1 | zero `!`, zero `as` into the AST | **PASS** — 0 and 0, asserted over stripped source |
| 2 | no `source[i]` cursor, no `depth`/`quote`, no `splitTopLevel` | **PASS** — no `for`/`while` at all |
| 3 | productions are named `const`s typed `Parser<AstNode>` | **PASS** — terminals are `Parser<string>`, every production is `Parser<ColorNode>` |
| 4 | every regex is one token; no capture-group structure; no `.*` | **PASS** — every regex literal is asserted group-free; **one** negated class, `[^()]`, discussed below |
| 5 | `.opt()` never inside `all()` | **PASS by construction** — `all()` is never called; `.then()` throughout |
| 6 | arity in `sepBy`/`many`, not post-hoc length checks | **PASS** — `sepBy(comma, arity, arity)` for colour calls; `many(min−1, max−1)` for uniform channels; the positional fold otherwise |
| 7 | `Parser.lazy` once per back-edge | **PASS** — exactly 2, asserted |
| 8 | no `memoize`/`mergeMemos`/`resetPackrat` | **PASS**, asserted |
| 9 | `chain` only where the value chooses the tail's grammar | **PASS** — `chain` is never called |
| 10 | entry via `parseState()` + `isError`, union, `.eof()`, never throws | **PASS** — proven against the corpus, not asserted |
| 11 | `recover()` only for list-shaped grammars | **PASS** — never called; a single-value production's right answer to bad input is one clean failure |
| 12 | `check` + `test` green under the three strict flags | **PASS**, §0 |

**The one place I touch an anti-pattern's shape, stated plainly.** `balancedGroup` contains
`regex(/[^()]+/)`. AP-3's tell is a production whose *value* is a `string` remainder that a second
pass must re-parse. This one's value is never read — it is the skip inside a recursive,
delimiter-balanced production, which `MODULE-DAG.md` invariant 4 explicitly permits as ordinary
grammar. It exists so `var(…)` and a relative-syntax `calc(…)` can be recognised and refused without
a hand-written depth counter. `structure.test.ts` asserts there is exactly **one** such class in the
whole candidate, so it cannot quietly become two.

---

## §7 · Known gaps — the honest list

1. **P-033 — `<math-function>` as a colour component is not supported.** `rgb(calc(1 + 1) 2 3)` is
   refused. It is the single GAP in my scoreboard and it is a GAP for the live parser too, so
   nothing regresses — but a candidate that wires a `<calc-sum>` grammar into the channel position
   beats me here, and the table would accept it cleanly (one more arm in the channel element).
   I did not import `idiom/example.ts`'s math grammar: it is the band's yardstick, not a parts bin.
2. **CSS comments are not trivia.** `rgb(/**/1 2 3)` is refused. So is it by the live parser, so this
   is not a regression; parse-that ships `skipBlockComments` and wiring it into a comment-aware
   `.trim()` is the fix. Untaken.
3. **Identifiers are plain ASCII.** No `\` escapes, no non-ASCII idents. Worse, my keyword boundary
   is `regex(/[\w-]/).not()` — *a hand-written boundary regex*, which is precisely what GROUND-C
   §3.3's identifier-boundary finding says not to invent. That finding killed three V·π candidates
   on `1px\` at EOF. My candidate is not exposed to the dimension case, but the criticism lands: the
   correct repair is to consume the canonical `<ident-token>` production. **This is the sharpest
   thing in the salvage aimed at my code and I have not fixed it.**
4. **Legacy forms are not type-homogeneous.** css-color-4 spells the legacy grammar as
   `rgb(<percentage>#{3})` **or** `rgb(<number>#{3})`; I accept `rgb(50%, 0, 0)`. Legacy `hsl()`
   likewise requires percentages for S/L and I accept bare numbers. Two over-accepts. The table can
   express the fix (two legacy arms per row) at the cost of a fifth widening.
5. **`color-mix()` value constraints are unenforced.** No `<percentage [0,100]>` range check, no
   "both weights zero is invalid" rule, and weights are kept as authored rather than normalised.
   Range checks cannot be expressed in a `.map`, and I judged `chain`/`mapState` too high a price;
   a port should enforce them at the resolution boundary.
6. **The stack-depth `try` is unconditional.** It would also swallow a hypothetical throw from a
   `.map` callback. Narrowing it to `RangeError` is a one-line change with a different trade — it
   would re-expose genuine internal defects, which is arguably correct for a library. I chose the
   literal reading of "never throws on every input" and disclosed it.
7. **148 keyword arms is trial, not lookup.** Each named colour is its own `regex()` arm, so a
   bucket costs O(bucket) attempts. One ident terminal plus a `Map` would be O(1) — but a total
   lookup needs a fallback value for a case the regex makes unreachable, and inventing a fabricated
   fallback is the shape of defect this band exists to remove. I took the total-but-linear route.
   **Unmeasured; no claim either way.**
8. **`color()` relative channel names over-accept** (TABLE COST 2).
9. **Relative colour syntax is recognised, not modelled.** `calc(…)` in a relative channel is kept as
   an opaque call *name* with its arguments dropped; the whole node is refused at the door anyway.
10. **Scope: this replaces `parseCssColor` only.** GROUND-A's other 46 productions — component
    values, easing, keyframe selectors, timelines, stylesheet, `<syntax>` — are untouched. The
    crash blast-radius through `parseCssScalar`/`parseCssValue`/`parseStylesheet`/`coerceToSyntax`
    (P-050/P-078/P-083) is *upstream* of this candidate: those entries stop crashing only when they
    call a colour parser that does not crash, which is what this is, but the wiring is not done.
11. **714 effective source lines** against roughly 130 lines of colour-specific code in
    `src/css/grammar.ts`. The language covered is much larger (color-mix, light-dark,
    contrast-color, device-cmyk, custom profiles, relative syntax, legacy alpha, 19 system colours)
    and the AST is explicit where the subject's is implicit — but a reviewer counting lines should
    count them, and I would rather state it than have it found.

---

## §8 · Performance

**No benchmark was run and no performance claim is made.** The prior parser-proof gate measured the
live regex parser as fastest (~1.8×), and nothing here contradicts it. The case for this candidate
is correctness under hostility, soundness, coverage and maintainability — the four things GROUND-A
§6 names — and nothing else. The only timings in this session were the vitest durations printed
above, which are not a benchmark of anything.

If a benchmark is ever wanted it needs identical operation, identical input bytes, identical
semantics, raw retained attempts and a stated environment. UTF-16 code units are not UTF-8 MB/s.

---

## §9 · What this seat did not do

- No gate generator, admission CLI, evidence schema, promotion protocol, or governance treatise.
- No second scanner, token tape, atom algebra, generic CST, or feature-local cursor. The only
  "scanner" is a set of regex *terminals*, each recognising one token.
- No sealed corpus, no encrypted holdout, no self-asserted JSON receipt. The only evidence is
  `npm run check && npx vitest run cand-b-dispatch`, produced by something that is not me.
- No files written outside `prototypes/css-parser/cand-b-dispatch/` and this report. `src/`,
  `demo/`, `api/`, `test/`, `vnext/`, `scripts/dev/dev.sh` and every `INBOX.md` were untouched;
  `src/css/named-colors.ts` and `src/css/grammar.ts` were **imported read-only** (the first as the
  148-keyword data table, by the same relative path GROUND-A's own `measure.ts` uses; the second in
  a scratch differential script that wrote nothing).
- No acceptance credit claimed for the fixtures. They are inputs.
