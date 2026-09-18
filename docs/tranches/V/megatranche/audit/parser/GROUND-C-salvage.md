# GROUND-C — salvage and interdiction from the failed V·π attempt

## Model receipt

I observe myself to be **Opus 5** (`claude-opus-5[1m]`, 1M-context seat), running as a
subagent of the mega-tranche parser band. Every number in this report was produced by
running a command in this session. Nothing is quoted on trust from a V·π receipt — the
whole point of this seat is that V·π's receipts turned out not to be openable.

---

## §0 · Deliverables (running code, not a document about code)

| File | Lines | What it is |
| --- | --- | --- |
| `docs/tranches/V/megatranche/prototypes/css-parser/fixtures/salvaged.ts` | 645 | The salvaged corpus: 8 exported types, 15 exported consts, 158 typed cases with per-family provenance |
| `docs/tranches/V/megatranche/prototypes/css-parser/fixtures/salvaged.test.ts` | 287 | 30 corpus-integrity tests — recompute `end`, `value`, `sign`, `type` independently |
| `docs/tranches/V/megatranche/prototypes/css-parser/fixtures/g16-accepted.ts` | 17 | Byte-identical copy of the one accepted V·π operation, SHA-256 verified |
| `docs/tranches/V/megatranche/prototypes/css-parser/fixtures/g16-replay.test.ts` | 118 | 7 tests replaying G16 against the salvaged corpus |

**Gate — verbatim, from `docs/tranches/V/megatranche/prototypes/css-parser`:**

```
$ npm run check && npm test

> @value-js/mt-css-parser@0.0.0 check
> tsc --noEmit


> @value-js/mt-css-parser@0.0.0 test
> vitest run


 RUN  v3.2.7 /Users/mkbabb/Programming/value.js/docs/tranches/V/megatranche/prototypes/css-parser

 ✓ idiom/skip-caveat.test.ts (23 tests) 4ms
 ✓ fixtures/salvaged.test.ts (30 tests) 9ms
 ✓ idiom/antipatterns.test.ts (14 tests) 5ms
 ✓ idiom/example.test.ts (40 tests) 8ms
 ✓ fixtures/g16-replay.test.ts (7 tests) 9ms
 ✓ denominator/denominator.test.ts (104 tests) 41ms

 Test Files  6 passed (6)
      Tests  218 passed (218)
   Start at  16:46:04
   Duration  1.01s (transform 293ms, setup 0ms, collect 849ms, tests 76ms, environment 1ms, prepare 659ms)

EXIT=0
```

`tsc --noEmit` exits 0 under `strict` + `noUncheckedIndexedAccess` +
`verbatimModuleSyntax`. 37 of the 218 tests are mine; the other 181 belong to GROUND-A
and GROUND-B and were already green.

Environment: Darwin 25.4.0 (arm64), node v26.0.0, TypeScript 5.8.3, vitest 3.2.7.

---

## §1 · The mirror run — and the number the `--passWithNoTests` flag hides

Run from `docs/tranches/V/apotheosis/pi/mirror`, verbatim:

```
$ npm run check

> @value-js/pi-css-mirror@0.0.0 check
> tsc -p tsconfig.apotheosis.json --noEmit

CHECK_EXIT=0
```

```
$ npm test

> @value-js/pi-css-mirror@0.0.0 test
> vitest run --config apotheosis/vitest.config.ts --passWithNoTests


 RUN  v3.2.7 /Users/mkbabb/Programming/value.js/docs/tranches/V/apotheosis/pi/mirror

 ✓ apotheosis/test/value-unit/numeric.test.ts (4 tests) 6ms

 Test Files  1 passed (1)
      Tests  4 passed (4)
   Start at  16:33:58
   Duration  387ms
```

**How many tests ACTUALLY ran: four.** One file. All four are the G16 consume-number
tests. The `--passWithNoTests` flag was not load-bearing on this run — real tests were
found — but the brief was right to be suspicious, because the config makes it nearly
load-bearing:

`apotheosis/vitest.config.ts` includes `apotheosis/test/**/*.test.ts` **and**
`cells/**/test/**/*.test.ts`. I counted the second pattern's yield:

```
cells .ts count:       94
cells test dirs:        0
cells total files:     557
```

**557 files under `mirror/cells/`, 94 of them TypeScript, and not one `test/` directory
among them.** The second include pattern matches zero files and always has. So the green
tick above covers 17 lines of parser source, and `--passWithNoTests` is the safety net
under a config half of which is dead.

### The check is narrower than it looks

`npm run check` uses `tsconfig.apotheosis.json`, which *excludes* `grammar/`, `test/`,
`stylesheet/`, `deps/`, `harness/`, `support/`, `tools/`, `bench/` and all root `*.ts`.
That is the entire pre-reset parser — 10,073 lines of TypeScript. The green covers
`apotheosis/**` + `cells/**` only.

The pre-reset tree is still there, and it does not compile. Its own script says so:

```
$ npm run check:rejected-g0
… 19 errors …
cells/syntax-consume-number/g2/harness.ts(4,25): error TS2732: Cannot find module './fixtures/public-cases.json'.
cells/value-unit-known-dimensions/g0/candidates/s/index.ts(2,31): error TS5097: An import path can only end with a '.ts' extension when 'allowImportingTsExtensions' is enabled.
…
```

19 errors. All of them are config drift (missing `resolveJsonModule`,
`allowImportingTsExtensions`) rather than type errors — but the effect is that the
"runnable root" is runnable precisely because it was scoped down to the part that runs.

**Honest summary of the runnable-root evidence: 17 lines of source, 4 tests, one
`tsc` invocation scoped to exclude the other 10,073 lines.**

---

## §2 · The accepted G16 operation — is it good code?

Source, byte-identical, SHA-256 `8c3ac689f2e24635216ac0499f23166996ac0136e0b6876e82a8da4f75eb95aa`
(verified against `g16/acceptance.json`; the hash survives being copied into the
prototype workspace because `@mkbabb/parse-that/core` resolves there unmodified):

```ts
import { regex } from "@mkbabb/parse-that/core";

type CssNumber = {
    sign: "+" | "-" | null;
    type: "integer" | "number";
    value: number;
};

export const consumeNumber = regex(
    /[+-]?(?:[0-9]+(?:\.[0-9]+)?|\.[0-9]+)(?:[Ee][+-]?[0-9]+)?/,
).map((representation): CssNumber => ({
    sign: representation[0] === "+" ? "+" : representation[0] === "-" ? "-" : null,
    type: representation.includes(".") || representation.includes("e") || representation.includes("E")
        ? "number"
        : "integer",
    value: Number(representation),
}));
```

### 2.1 Is it genuinely idiomatic parse-that? — YES, against GROUND-B's own checklist

GROUND-B's §6 checklist is the band's standard. Scoring G16 against it:

| # | Rule | G16 |
| --- | --- | --- |
| 1 | Zero non-null assertions, zero `as` into the AST | **PASS** — 0 and 0 |
| 2 | No `source[i]` loop, no `depth`/`quote` locals, no `splitTopLevel` | **PASS** |
| 3 | Named `const`, typed `Parser<AstNode>` not `Parser<string>` | **PASS** on substance (`.map()` lands `Parser<CssNumber>`); the annotation is inferred, not explicit |
| 4 | Every regex is ONE token, no capture-group structure, no `.*` | **PASS** — all groups are `(?:…)`, nothing spans a delimiter |
| 5 | Optionality never inside `all()` | n/a — no `all()` |
| 7 | `Parser.lazy` once per back-edge | n/a — no recursion |
| 8 | No `memoize()`/`resetPackrat()` | **PASS** |
| 10 | Public entry: `parseState()` + `isError`, discriminated union, `.eof()`, never throws | **n/a — and this is the point.** G16 is an internal leaf, not a public door. It has no `.eof()` and returns no union. **G16 does not retire R1 and does not claim to.** |
| 12 | `check` + `test` green under the three strict flags | **PASS**, re-verified in this workspace |

Rule 4 is the one that matters and the one most likely to be contested. A single
`regex()` doing maximal-munch on a numeric literal is exactly what `parse-that`'s own
`json.ts` does for `jsonNumber`. It is a terminal. It is not a lexer. V·π's own
architectural law says the same thing ("a regex terminal is not itself a lexer; a second
runtime/tape/object layer is the rejected element"), and on this narrow point V·π was
right.

### 2.2 Is it CORRECT? — measured, not asserted

V·π's correctness claim was "180 of 180 sealed cases pass". **Those 180 cases are now
permanently undecryptable** (§3.1). So the headline claim is, on its own terms,
unreplayable. I re-established it independently.

`fixtures/g16-replay.test.ts` runs the byte-identical operation against the corpus I
transcribed in this session from the *public* fixtures, entering the parser at the
recorded non-zero offsets via `new ParserState(src, undefined, offset)`:

- **49 / 49 maximal-prefix cases pass** — including every stop-short case (`1.` → `1`,
  `1e+` → `1`, `1.2.3` → `1.2`, `1e++2` → `1`, `10-20` → `10`), both signed zeros,
  binary64 overflow to `±Infinity`, underflow to `-0`, `9007199254740993` → `…92`, and
  the astral-prefix UTF-16 offset case.
- **11 / 11 hostile inputs do not throw** — NUL, lone high/low surrogates, `∞`,
  `9e999999999999999999999999x`.
- **7 / 7 generated pathological inputs do not throw** — 32,768-digit mantissas and
  1,000,000-unit prefixes, ASCII, astral and CR.
- Parser identity is stable across 1,000 parses (no per-call construction).
- Failure is transactional: the predecessor value is returned untouched.

I make **no speed claim**. I recorded wall-clock on the 1M-unit inputs only to establish
the *absence* of catastrophic backtracking; single attempts with no warmup, no repetition
and no comparator are not a benchmark and the test says so in a comment.

### 2.3 What it does NOT decide — two inherited-by-silence contracts

Both are pinned as tests in `g16-replay.test.ts` §"the two decisions it does NOT make":

1. **It discards the source spelling.** `Object.keys(value)` is exactly
   `["sign","type","value"]`. `"1.0"` and `"1"` both yield `value: 1`, distinguished only
   by `type`. But `<dimension>` and `<percentage>` need the raw spelling for round-trip
   serialization, and `.map()` cannot see `state.offset`. V·π called the extent "a harness
   observation, not a lexical result layer" — a defensible call, but this band must make
   it **deliberately**, because every serializing parent inherits it.
2. **`value: number` can be `±Infinity`.** `1e309` → `Infinity`, `-1e-324` → `-0`. Neither
   is wrong (CSS clamps at used-value time), but a numeric leaf whose type says `number`
   and whose range includes infinities is a contract that should be stated, not
   discovered.

There is also one genuine simplification: the `type` derivation does three separate
`String.prototype.includes` scans over a string the regex has already matched. A skeptic
in V·π's own file flagged this as "a per-operation allocation asymmetry". `/[.eE]/.test()`
is one scan; a second regex arm would be zero.

### 2.4 Verdict: **ADAPT.** Not adopt-as-is, not start clean.

- **Not start clean.** These 17 lines are the single most expensive artifact in the
  tranche and they are *correct* — 49/49 against a corpus they were not written against.
  Discarding a measured-correct leaf to rewrite it repeats the waste this seat exists to
  interdict.
- **Not adopt-as-is.** "Adopting" 17 lines is not a meaningful act of inheritance, and
  adopting them silently imports both undecided contracts in §2.3.
- **Adapt**, meaning: inherit the **shape** — one `regex()` terminal plus one semantic
  projection, module-level `const`, maximal-prefix, transactional failure — and inherit
  the **five behavioural properties** its tests assert. Re-derive the bytes with the
  `type` redundancy removed and the extent question answered out loud. Keep
  `g16-accepted.ts` + its replay in the tree as the regression floor: any successor that
  fails 49/49 is worse than what already exists.

---

## §3 · Fixture salvage — the real treasure, and what burned with the keys

### 3.1 What could NOT be salvaged — the sealed corpora are gone

This is the single most important finding for the band, and it is not in any V·π summary.

The 180 G16 "sealed cases", the 172-case G13 corpus, and seven sibling holdouts exist
only as AES-256-GCM ciphertexts — nine `holdout-ciphertext.b64` files, 1.5 MiB. Their
keys are gone:

- `g14/holdout-recovery-reveal.json` states plainly:
  `"original_key_continuity": false`, reason `"original turn-local custodian key store
  expired"`.
- I searched the entire 2,349-file tree for key, escrow or PEM material. **Zero hits.**
  (The only `*key*` filename matches are `grammar/keyframe-selector.ts` and its `.d.ts`.)
- Several holdouts were *deliberately* destroyed:
  `g2/holdout-destruction.json` → `"PERMANENTLY_DESTROYED_AFTER_DUAL_CHALLENGE_AND_ROOT_REJECTION"`,
  `custodian_key_copies: 0`, `custodian_plaintext_copies: 0`.
- The "reveal" files are not reveals of content. `g13/holdout-reveal.json` is 6,884 bytes
  of family *counts* and hashes; the 247,210-byte plaintext it commits to is not in it.

**So V·π's headline correctness evidence — "180 of 180 sealed cases pass",
"65,024 independent oracle transactions" — is permanently unreplayable.** Not disputed:
*unopenable*. A future auditor cannot check it, and neither could I.

The one exception proves the rule: `value-percentage-literal/g0/holdout-reveal.json`
wrote its reveal as **literal case data** rather than as a hash commitment, and so its 15
cases survived. They are in the corpus (§3.2 item 4).

> **The rule this band takes from it:** *do not seal a corpus you cannot decrypt later.*
> A hash commitment proves you had bytes; it does not give anyone the bytes. If a corpus
> is worth generating, it is worth committing in plaintext.

### 3.2 What WAS salvaged — `fixtures/salvaged.ts`, 158 cases, 15 exports

Every export names its exact source path below `pi/`. The file header states in its first
paragraph that **fixtures carry no acceptance credit** — they are inputs, and a parser
that passes all of them "has earned exactly nothing except the right to be reviewed".

1. **`r1ShippingCrashInputs` (10)** — the live, user-reachable `TypeError`. I verified all
   ten against the real `src/css/grammar.ts` in this session:

   ```
   THROWS  "oklch()" -> TypeError: Cannot read properties of undefined (reading 'replace')
   THROWS  "rgb()"   -> …   THROWS  "hsl()"    -> …   THROWS  "lab()"  -> …
   THROWS  "lch()"   -> …   THROWS  "color()"  -> …   THROWS  "oklab()"-> …
   THROWS  "hwb()"   -> …   THROWS  "rgb( )"   -> …   THROWS  "hsl(  )"-> …
   ```

   The brief named eight; `hwb()` and `rgb( )` crash identically, so the corpus carries
   ten.

2. **`numberPrefixCases` (49)** + **`numberHostileNoThrow` (11)** +
   **`numberHostileGenerators` (7)** — from `g5/fixtures/public-cases.json`,
   `g13/public-corpus.json`, and `syntax-number-start/fixtures/cases.json`. Signed zeros,
   binary64 edges, UTF-16 astral offsets, lone surrogates, and 32K/1M-scale generated
   inputs built at test time so the file stays small.

3. **`identifierBoundaryCases` (6)** — *the most valuable single finding in the tree*,
   detailed in §3.3.

4. **`knownDimensionUnits` (62, six families)** + `dimensionBoundarySuccess` (5) +
   `dimensionBoundaryFailure` (12) + `dimensionHostile` (12) — the unit inventory
   reproduced correctly across three independent candidates and is worth inheriting;
   only the boundary logic was wrong. 49 lengths + 4 angle + 2 time + 2 frequency +
   4 resolution + 1 flex = 62, including the six CSS Conditional 5 `cq` spellings.

5. **`percentageSuccessCases` (8)** + `percentageFailureCases` (10) — the only surviving
   holdout plaintext. Includes the literal-domain case (`101%` is a valid `<percentage>`
   even where its context bounds it to 100) and the trivia cases (`1\n%`, `1\t%`,
   `1/*x*/%` all reject — a percentage is one token).

6. **`keyframeSelectorCases` (18)** + `keyframeSelectorListCases` (5) — §3.4.

7. **`liveDivergences` (37)** — the R-row ledger, §3.5.

8. **`parseThatSkipRewindCaveat`** — the `leaf.skip(suffix)` value-retention behaviour,
   carried as a *parent-integration test obligation*, explicitly not as an engine defect.
   GROUND-B has characterised this properly in `idiom/skip-caveat.test.ts`; I only carry
   the pointer.

### 3.3 The identifier-boundary case that killed the known-dimensions candidates

Three independently authored candidates (H, B, S) all passed a 1,131-transaction
evaluator. **All three were semantically wrong.** The evaluator's fixture bank tested a
valid non-EOF escape (`1px\78`) but tested *neither* the escape-to-EOF case *nor* the
backslash-newline case. Two omitted sides; three dead candidates; a green harness.

The rule (CSS Syntax 3, "check if two code points are a valid escape"): a backslash starts
a valid escape **unless** the next code point is a newline. EOF is therefore a valid
second code point, and "consume an escaped code point" turns escape-at-EOF into U+FFFD.

| input | required | H | B | S |
| --- | --- | --- | --- | --- |
| `1px\` at EOF | **fail at entry** (unit is `px�`, not `px`) | succeeds through `px` ✗ | fails ✓ | succeeds through `px` ✗ |
| `1px\` + LF / CRLF / CR / FF | **succeed through `px`** (backslash-newline is not an escape; the delimiter is the parent's) | ✓ | fails ✗ | ✓ |

H and S under-reject an identifier continuation; B over-rejects a delimiter boundary.
**There was no semantically correct candidate in the frozen set.** The reviewers' named
repair: *consume the canonical identifier production, never invent another boundary
regex.* That instruction is the decided fact worth inheriting, more than the cases are.

Source: `cells/value-unit-known-dimensions/g0/reviews/skeptic-1-semantic.md`;
independently replayed at `formation/session-audit/receiving/opus-skeptic-2-prototypes.md`
§4.2 (finding O2-18, "CONFIRMED BY EXECUTABLE REPLAY"; claim F13 → `REJECTED_CLAIM`).

### 3.4 The keyframe-selector asymmetry finding

The selector's **two percentage positions have different domains**, and the shipped
grammar collapses them:

```
keyframe-selector = from | to
                  | <percentage [0,100]>              <- BOUNDED
                  | <timeline-range-name> <percentage> <- UNBOUNDED, MANDATORY
timeline-range-name = cover | contain | entry | exit
                    | entry-crossing | exit-crossing | scroll   <- SEVEN
```

Three concrete defects in `pi/mirror/grammar/keyframe-selector.ts`, which I read:

1. it recognises **four** names (`entry`, `exit`, `cover`, `contain`) — missing
   `entry-crossing`, `exit-crossing`, `scroll`;
2. it makes the named-range percentage **optional** (`.opt()`) — it is mandatory;
3. it **clamps** the named-range percentage to `[0,100]` — it is unbounded.

The bare-percentage `[0,100]` bound (row R4) is the one part the live parser gets right
and must be **kept**.

The reason this is worth carrying: per `FEATURE-LEDGER.md` §2, **both the value.js mirror
and the current BBNF grammar are wrong on material parts of this boundary.** Two
independent implementations agreed on the same error, which means "the other one does it
this way" is not evidence here. `MODULE-DAG.md` (SHA-256 `291e5145…`) carries the
corrected grammar and has a terminal BBNF structural acknowledgement.

### 3.5 The R1–R12 divergence ledger, and its honest coverage

A **closed whitelist**. Its value is the inversion: a disagreement between a replacement
parser and the retired regex parser that is *not* on this list is a defect in the
**replacement**. That turns a differential from a noise generator into a gate.

I transcribed 37 concrete cases covering **R1, R3, R6, R8, R9, R10, R11** from
`mirror/test/{w1-values,w2-color,w3-easing-timeline}.test.ts`, plus R4 via the keyframe
cases. Stated honestly: **R2, R5, R7 and R12 have no executable fixtures**, because they
live in V·π waves W4/W5 and W5 was never authored. They are kept in the `RRow` union so
the set stays closed, but this band must derive their inputs from spec, not from V·π.

Two rows deserve singling out:

- **R6 is a value divergence, not an accept/reject divergence.** Both parsers accept
  `hsl(120 50 50)`; only the value differs (`50` vs `0.5`). **A differential harness that
  compares only `ok` misses it entirely.** The corpus records both sides as `accepts` so
  this cannot be forgotten.
- **R9 is bidirectional.** The live parser both over-accepts (`rgb(255, 0 0)` — mixed
  separators) *and* under-accepts (`rgba(1, 2, 3, 50%)` — valid all-comma legacy). A
  one-directional "we reject more than LIVE" test would score R9 green while half of it
  is broken.

### 3.6 The integrity tests earned their keep immediately

`salvaged.test.ts` recomputes every derived field rather than trusting my transcription:
`end === offset + representation.length`, `source.slice(offset,end) === representation`,
`Object.is(Number(representation), value)`, sign from the first character, `type` from
spelling via `/[.eE]/`.

**On first run it failed and caught a real error I had just introduced** — `-7x`
transcribed with `value: 7` instead of `-7`. The source JSON
(`g5/…/number_start_prefix_evidence`) carries only `representation`, so the value was
mine to supply and I supplied it wrong. One test, one line, caught in seconds.

That is the same failure class as §3.3 in miniature: a hand-maintained expectation that
nothing independently recomputes. V·π ran 1,131 green transactions past three wrong
candidates. Recompute your expectations; do not assert them.

---

## §4 · `FEATURE-LEDGER.md` and `MODULE-DAG.md` — what to inherit as decided fact

**Inherit these. They are the cheapest genuine value in the tranche** — a few hundred
lines that encode real CSS and real architecture decisions.

### Inherit as decided

| Fact | Source | Why it is durable |
| --- | --- | --- |
| The corrected module DAG: `stylesheet → properties → values → {color,easing,gradients,transforms,filters}` plus `stylesheet → keyframes` | `MODULE-DAG.md` | Repairs a measured defect: the registered root reached **9 of 15** families, leaving six committed siblings unreachable. Has a terminal BBNF acknowledgement at SHA-256 `291e5145…` |
| `timeline-range` is a single semantic owner **below** `values`; `keyframes` consumes it and never redeclares its names | `MODULE-DAG.md` | Kills a real duplication where `stylesheet` re-declared keyframe grammar |
| The keyframe-selector grammar of §3.4 (seven names, mandatory unbounded named percentage, bounded bare percentage) | both | Explicitly survives the G0 rejection; two implementations independently got it wrong |
| Comma-list composition sits **above** the singular selector production | both | Prevents the singular production absorbing commas |
| `SYNTAX-NUMBER-START` is **retired as a standalone feature** — the six §4.3.10 arms are subordinate branches inside consuming numeric productions, never an exported zero-width `Parser<boolean>` | `FEATURE-LEDGER.md` §2.1 | A whole generation line was spent proving this; inherit the conclusion, not the line |
| The dependency ordering: source-map → whitespace/comments/escape/ident/string → consume-number → percentage-literal → timeline-range-name → kf-selector-standard → kf-selector-list | `FEATURE-LEDGER.md` §2.1 | Each row names its owner module and its downstream consumers. This is a genuine plan |
| Singular selector, selector **list**, and **public compatibility** are three distinct operations with different inputs, results and doors | `FEATURE-LEDGER.md` §2 | The G0 rejection's core finding; conflating them is what made G0 unreviewable |
| Recursive parse-that productions for nested functions/blocks are **ordinary grammar and permitted**; imperative balanced scanners and broad `[^)]*` / `[^;{}]*` remainder capture are not | `MODULE-DAG.md` invariant 4 | The precise line between "combinator" and "the rejected architecture" |
| `tokens` exports productions returning **primitive/semantic leaves**, never `CssToken`/atom/component-value/CST aggregates | `MODULE-DAG.md` invariant 3 | Names the exact thing that must not be rebuilt |

### Do NOT inherit

- **`FEATURE-LEDGER.md`'s RED/GREEN status column.** Fifteen families are marked RED
  against `grammar/css/l4/*.ts` target paths that do not exist. It is a wish-list rendered
  as a status board.
- **The `ADDENDA-01..08` supersession lattice** (eight addenda, each with an `-AUDIT-A`,
  `-AUDIT-B` and sometimes a `-GESTALT` sibling; `HANDOFF-2026-07-24.md` §9 needs a
  nine-row table just to say which are still live). Read `MODULE-DAG.md`,
  `FEATURE-LEDGER.md` §2/§2.1, and `HANDOFF-2026-07-24.md` §8/§12. Skip the rest.
- **`PI.md`'s wave census** — superseded by the reset; only its §2d R-table survives, and
  that is now in `salvaged.ts`.

### One decided fact from the handoff worth quoting

`HANDOFF-2026-07-24.md` §12 is V·π's own do-not-repeat list, written by the party that
did it. It is short and it is right. §5 below is the quantified version.

---

## §5 · INTERDICTION — what this band must NOT do

### 5.1 Where the bytes actually went

Measured this session (`os.walk`, logical file sizes; the tree is untracked at HEAD
`c654824e`):

```
TOTAL                         2349 files      360.8 MiB
  denominator/                 157 files      243.6 MiB   67.5%
  mirror/node_modules/        1161 files       95.6 MiB   26.5%
  formation/                   115 files       13.7 MiB    3.8%
  mirror/cells/                557 files        5.6 MiB    1.5%
  mirror/.dts/                  35 files        0.0 MiB    0.0%
  (all other)                  324 files        2.3 MiB    0.6%

EXCLUDING node_modules        1188 files      265.2 MiB
  denominator share of that                     91.9%
```

(`du -sk` reports 327 MiB on disk; the gap is npm's hardlinked `node_modules`. Both
figures are honest; they measure different things.)

Against **560 bytes / 17 lines** of accepted parser source:

```
  ratio accepted : total            = 1 : 675,563
  ratio accepted : total-minus-deps = 1 : 496,648
```

**Excluding installed dependencies, V·π wrote roughly half a million bytes for every byte
of accepted parser.**

### 5.2 The named artifact classes, with their cost

| # | Do NOT build | What it cost in V·π | Evidence |
| --- | --- | --- | --- |
| **I-1** | **A corpus-analysis / occurrence-denominator pipeline.** No `source-universe` enumerator, no occurrence-owner formation, no complement-classification, no shard schemas. | **243.6 MiB across 157 files — 67.5% of the whole tranche, 91.9% of everything that is not `node_modules`.** Nine formation versions (`v1`…`v9`), each with a `.schema.json`, a `-rejection.json`, and for v4–v8 a `.shards/` directory. Two single files are 66 MiB each (`occurrence-owner-formation-v{2,3}.json`); one shard, `v8.shards/lexical-dispositions.json`, is 25 MiB. | Its own `denominator/README.md` opens: *"Status: BORN-RED formation tooling; no denominator or parser credit."* `ADDENDA-08` §3: *"zero normative denominator credit and must not remain the parser critical path."* It was the critical path. |
| **I-2** | **A gate-generator / admission-CLI / promotion-verifier per feature.** No `harness.ts` + `promotion-verifier.mjs` + `contract.ts` + `feature-public.json` + `promotion-protocol.json` + `benchmark-protocol.json` + `formation-receipt.json` template, replicated per generation. | **557 files / 5.6 MiB under `mirror/cells/` to produce 17 accepted lines.** `syntax-consume-number` alone ran **G1 through G16** — sixteen generations of gate scaffolding for one production. **157 `.mjs`/`.mts` harness and verifier files totalling 35,878 lines** across the tree: 2,110 lines of harness for every line of accepted parser. | `HANDOFF-2026-07-24.md` §12: *"Do not author another general-purpose admission CLI before grammar code."* `ADDENDA-08`: *"the artifact shape is not a template to replicate hundreds of times."* |
| **I-3** | **An encrypted holdout / sealed-corpus custody protocol.** No AES-GCM ciphertexts, no custodian key stores, no destruction receipts, no `holdout-receipt.schema.json`. | **9 ciphertext files, 1.5 MiB, ALL UNDECRYPTABLE** (§3.1). It bought exactly one thing — the claim of blindness — and V·π's own handoff §7.2 retracts even that: the G4 holdout *"lacks a pre-author custody chronology and must be described only as a revealed regression suite."* Net: the protocol destroyed the corpora and did not deliver blindness. | `g14/holdout-recovery-reveal.json`: `original_key_continuity: false`. `HANDOFF-2026-07-24.md` §12: *"Do not call a revealed suite blind."* |
| **I-4** | **A governance/addenda/audit-receipt corpus.** No numbered `ADDENDA-NN` with `-AUDIT-A`/`-AUDIT-B`/`-GESTALT` siblings; no `FINDINGS.md`/`AUDIT-BRIEF.md`/`SUBJECT.json` apparatus; no raw-prompt archives as a deliverable. | **238 Markdown files, 108,829 lines.** 47 at the tranche root alone (28,656 lines). **64 of them are review documents.** `formation/session-audit/` is 13.7 MiB / 115 files, including a 3.7 MiB JSONL envelope archive whose payloads V·π itself marks `ENCRYPTED_UNMATERIALIZED` — preserved, unreadable, uncredited. | `HANDOFF-2026-07-24.md` §8: *"The tranche produced far more process artifacts than accepted parser code."* Owner law 13: *"artifact count and gate sophistication are not progress."* |
| **I-5** | **Self-asserted JSON evidence.** No `*-evidence.json` / `*-receipt.json` / `*-rejection.json` whose only author is the party being evaluated. | **86 receipt/evidence/rejection JSON files and 47 `.schema.json` files.** A `PASS` string in a file you wrote is not a measurement. | `HANDOFF-2026-07-24.md` §8: *"A self-asserted JSON receipt is not independent evidence."* Use `npm test` output — it is produced by something that is not you. |
| **I-6** | **A second scanner / token tape / atom algebra / generic CST / feature-local cursor.** | **10,073 lines of TypeScript under `mirror/` (excluding `cells/` and `node_modules`), architecturally rejected in full and now not even compiled** — `tsconfig.apotheosis.json` excludes it, and `check:rejected-g0` reports 19 errors. It survives only as fixtures and counterexamples. | `apotheosis/README.md`; `ADDENDA-08` §4.2. GROUND-B's checklist rules 2 and 4 are the operational form. |
| **I-7** | **A benchmark before an equivalence.** No performance claim without identical operation, identical input bytes, identical semantics, raw retained attempts, and a stated environment. | The G16 peer win — `geometric_mean_ratio: 0.9293` — is scoped in its own `acceptance.json` to *"exact 64-row common-domain corpus and pinned local environment only"*, and a `correction/benchmark-erratum.json` was required to reach it. A skeptic reports **no document anywhere reconciles 1.6907 → 0.9293**. Meanwhile the parser-proof gate measured the **live regex as FASTEST (~1.8×)**. | The replacement is justified by correctness, hostility-safety and maintainability, **never by speed**. UTF-16 code units are not UTF-8 MB/s. |
| **I-8** | **Green harnesses over unrecomputed expectations.** | 1,131 green transactions across three candidates, **all three semantically wrong** (§3.3). The bank tested one escape case and omitted the two that discriminate. | Recompute derived expectations from the input (§3.6). A fixture whose expected value is hand-typed and never re-derived is an assertion wearing a test's clothes. |
| **I-9** | **Configs that are green because they are scoped down.** | `npm test` includes `cells/**/test/**` which matches **0 of 557 files**; `npm run check` excludes the 10,073 lines that do not compile; `--passWithNoTests` is the net under both. | If a gate excludes a directory, the exclusion belongs in the report next to the tick. |

### 5.3 The three rules that would have prevented all of it

1. **The deliverable is a parser production with tests. Everything else is overhead and
   must be justified as overhead.** V·π's ratio was 1 : 496,648. If an artifact is not a
   grammar production, a fixture, a test, or a browser/spec witness, the default is: do
   not write it.
2. **One evidence shape, reused.** `npm run check && npm test`, pasted verbatim, with the
   config's exclusions disclosed. Not a per-feature protocol, schema, verifier and
   receipt.
3. **Never seal what you cannot reopen; never assert what you can recompute.** Those two
   sentences cover I-3, I-5 and I-8, which between them are the reason V·π's correctness
   record cannot be audited today.

---

## §6 · Verification receipts

| Claim | How verified |
| --- | --- |
| G16 SHA-256 `8c3ac689…` | `shasum -a 256` on the pi original and on `fixtures/g16-accepted.ts` — identical |
| G16 passes 49/49 prefix + 11/11 hostile + 7/7 generated | `fixtures/g16-replay.test.ts`, 7 tests green |
| `salvaged.ts` typechecks | `npm run check` → `tsc --noEmit`, EXIT=0, under `strict` + `noUncheckedIndexedAccess` + `verbatimModuleSyntax` |
| `salvaged.ts` is internally consistent | `fixtures/salvaged.test.ts`, 30 tests green; caught one real transcription error on first run |
| All 10 R1 inputs crash the live parser | `tsx` script importing `src/css/grammar.ts` directly — 10/10 `TypeError` |
| mirror runs 4 tests, not more | `npm test` in `pi/mirror`, output pasted §1; `find cells -type d -name test` → 0 |
| Byte census | `os.walk` logical sizes, §5.1; cross-checked against `du -sk` |

### Scope compliance

Wrote only under `docs/tranches/V/megatranche/prototypes/css-parser/fixtures/` and
`docs/tranches/V/megatranche/audit/parser/`. The V·π tree was read-only throughout.

**One disclosed side effect:** running the mandated `npm test` in `pi/mirror` caused
vitest to write its cache at
`pi/mirror/node_modules/.vite/vitest/…/results.json` and create an empty
`node_modules/.vite-temp/`. `mirror/.gitignore` lists `node_modules/`, and the whole tree
is untracked. No V·π source, evidence or configuration file was modified.

---

## §7 · What this seat did NOT do

- **No new gate-generator, admission CLI, evidence schema, or governance treatise.** The
  only files I created are a fixture corpus, its integrity tests, a byte-identical copy of
  17 lines, and its replay test.
- **No second scanner, token tape, atom algebra, generic CST, or feature-local cursor.**
- **No benchmark claim.** The only timings I took establish the absence of catastrophic
  backtracking, and the test that takes them says so in a comment.
- **No acceptance credit claimed for anything.** `salvaged.ts` says so in its first
  paragraph, and the G16 replay says so in its header.
