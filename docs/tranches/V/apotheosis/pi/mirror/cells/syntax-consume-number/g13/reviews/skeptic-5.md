# G13 skeptic 5 — gestalt, boundary, ownership, reuse, and integration

**Task:** `/root/g13_skeptic_e`  
**Role:** independent quintetto skeptic 5 (gestalt specialist)  
**Disposition:** **REJECT THE CANDIDATE SET; ACCEPT THE FEATURE BOUNDARY WITH
MANDATORY RESCOPING**  
**Authority:** prototype review only; zero feature credit, parser credit,
benchmark credit, integration authority, production authority, package
authority, or megatranche authority.

I did not read another skeptic's review. I began from the presumption that all
four candidates were wrong, unidiomatic, slow, and badly bounded.

## 1. Exact subject

The reviewed bytes match the assigned identities:

| subject | SHA-256 | bytes |
|---|---|---:|
| formation receipt | `51e8f1e46c62c2aae047179ac417fb763a10da4395602436b4793508d9549572` | 7,167 |
| H | `d1e98dfe1d3f818ad690137b17f076fd59f2e27b3418e48c0a60c08a3389c8a0` | 407 |
| B | `00d6bf2fba70a6e7600bec2d9d3b136eff41eb066de5d27918976ec8d7b333f1` | 957 |
| S | `f2f379b0bcd5248c0839145ebc6566a23078415b3f97c4927e7bf20e9ef8606d` | 1,004 |
| D | `552389f9c6212c274afad38b43130889f3f65f43c2bb9f3e091ed72ab0c3b4e1` | 625 |
| correctness evidence | `d22fc7c2609dbfa45f48d65341c9c6a915a4383d821147c12cfbfbf6afdeda2d` | 16,880 |
| benchmark evidence | `7676055df3e903076eb8f135feb65a07bd048daa0279db06a57b875b59ebfe37` | 42,991 |

The candidate evidence independently replayed to the identical
`d22fc7c…eda2d` bytes and reported 172/172 for each candidate. That evidence is
authentic but not exhaustive: an independent grammar differential below finds
a real S defect outside the sealed cases.

The historical public-formation validator now exits with `preauthor absence
failed: h`, because candidates correctly exist after the accepted preauthor
phase. That does not alter the frozen formation receipt, but it proves that the
cell still needs the one lifecycle-aware final validator required by
`ADDENDA-07 §6.1`; the preauthor validator cannot be presented as the final
replay door.

## 2. Total-tranche altitude

### 2.1 The boundary and sequence are basically right

CSS Syntax §4.3.13 is a coherent operation: from a source position already
known to start a number, consume the maximal numeric representation and return
numeric value, `integer|number`, and optional explicit sign. It is small enough
to specify and benchmark independently, but large enough to avoid the rejected
zero-width `starts-number` pseudo-feature. It is the correct first consuming
foundation for percentage, dimension, integer-only, math, color-channel,
timeline, and keyframe work.

The acknowledged module DAG assigns exact number/integer/percentage/unit/
dimension productions to `value-unit`. G13 therefore belongs beneath
`grammar/css/l4/value-unit`, preferably as one subordinate numeric module, not
in `tokens`, `values`, or a generic scanner. That placement preserves unique
ownership. Later percentage, dimension, and integer-only features must import
the accepted parser; they may not repeat any of these regexes.

The use of a specialized terminal regex in H, B, S, or D is legitimate. It is
a parse-that leaf operating at the current `ParserState` offset, not a lexer,
token tape, atom layer, CST, manual cursor, or remainder scanner.

### 2.2 This cell does not yet prove the public contract

`consumeNumber` is intentionally internal. It does not itself discharge any of
the 19 runtime exports, 33 type exports, or 37 consumer symbols. Its immediate
public path is through `parseCssScalar`, `parseCssValue(s)`, colors, timelines,
keyframes, properties, and stylesheet parsing. None is wired to these bytes in
`mirror/apotheosis`. Consequently, the 52/37 fit is architecturally plausible
but empirically **RED**. It becomes evidence only when accepted percentage,
dimension, integer, and parent grammars import one exact owner and the public
differential/consumer rails pass.

The feature can remain stable while `SYNTAX-SOURCE-MAP` and trivia are built in
parallel: numeric ASCII recognition is unaffected by CSS preprocessing. But
the eventual parent must capture the old/new UTF-16 offsets for lossless source
spelling and map those offsets back to original input. No second numeric
recognizer may be introduced to recover raw spelling.

### 2.3 The observation contract is over-specified in one place and
under-specified in another

Every candidate is forced to allocate and `Object.freeze()` a three-property
internal leaf. The charter's freeze-parity law says not to pay for frozenness
unless a consumer is shown to require it. No public consumer of this internal
leaf is identified. This is needless policy in the grammar contract and a
likely contributor to the loss against the deposed number parser.

Conversely, ordinary failure diagnostics are deliberately unscored. H/B/S/D
therefore expose topology-specific regex expectations rather than one stable
numeric expectation. `ADDENDA-07 §2` requires a diagnostic/recovery contract
for every row, and the public surface ultimately needs stable `ParseIssue`
classification. Preservation of a pre-existing *ahead* diagnostic is useful
but does not define this production's own failure category.

Before acceptance, the owner must either:

1. prove frozenness is required and retain it in every comparable peer, or
   remove it and reclose the changed candidates; and
2. define the internal failure expectation (for example, the semantic category
   `number`) and prove that parents translate it without leaking candidate
   regex topology.

Either change touches the observation seam and therefore requires a new exact
generation, not a mechanical edit during integration.

## 3. Feature/cell altitude

### 3.1 What the existing evidence proves

- All four exact candidates are direct `@mkbabb/parse-that/core` parsers.
- All four pass the frozen 172-case corpus, including maximal prefixes,
  nonzero UTF-16 offsets, parent composition, descriptors, signed zero,
  overflow/underflow, failure transactions, and bounded hostile strings.
- An independent deterministic differential of 100,000 strings against the
  frozen normative representation regex found no mismatch for H, B, or D.
- H, B, and D each consumed one-million-digit inputs without throwing and in
  observed linear-scale time. This is a useful sight check, not a formal
  complexity proof.

### 3.2 Confirmed semantic defect missed by the holdout

S defines a mantissa as either digits **or** a leading-dot fraction, then always
permits another fraction. It therefore accepts two decimal points:

```text
input     normative maximal prefix   H end   B end   S end/value   D end
.2.098    .2                         2       2       6 / NaN       2
```

The exact S bytes consume `.2.098`, return `type: "number"`, and produce
`NaN`. CSS Syntax §4.3.13 must consume only `.2`, leaving `.098` to the parent.
Randomized examples such as `.678.87x` and `.090.4` reproduce the same branch
interaction. Candidate evidence `d22fc7c…eda2d` remains an exact statement
about its 172 cases, but its global `PASS_ALL_FOUR` status must not be read as
semantic acceptance.

At minimum `.2.098`, `+.5.6`, and `-.0.1e2` belong in the born-RED corpus. An S
repair must separate `digits fraction?` from `leading-dot digits`; it cannot
append `fraction?` after both mantissa arms. Changed candidate bytes restart all
five skeptic passes for the feature set.

### 3.3 Benchmark evidence is not fit for the acceptance law

The benchmark is useful exploratory evidence, but it explicitly has
`performance_gate: null`, no predeclared one-sided paired confidence interval,
no allocation evidence, and no pre-timing immutable run manifest/raw-result
path. It times only 144 valid finite complete numbers; plus signs, leading-zero
variants, failure, maximal-prefix, nonzero-offset, hostile, and composed-parent
scenarios are absent.

More importantly, the timed operations have unequal result contracts:

- candidates allocate and freeze `{sign,type,value}`;
- the deposed lane returns only a number;
- C14 returns its own value/raw object; and
- LIVE invokes the much broader public `parseCssScalar` result path.

Normalizing all four to binary64 *after* those unequal operations proves a
common numeric value, not an equal operation. LIVE's apparent loss cannot be
claimed as a grammar-core win, while the deposed lane's missing sign/type/
freeze work makes its win over every candidate unsurprising.

Even on this favorable exploratory run, every candidate loses decisively to
the retained deposed parser. Candidate/deposed median ratios are H `1.4933`, B
`3.8924`, S `3.3216`, and D `1.3425`; every one of the eleven paired D/deposed
ratios is above 1 (`1.2221..1.4314`). Ratios against LIVE are H `0.3275`, B
`0.8536`, S `0.7284`, and D `0.2944`, but the public/internal mismatch prevents
a strict-win conclusion. Thus no candidate satisfies G-3 or
`ADDENDA-07 §6`.

The next benchmark must preseal its manifest and raw path, make peer adapters
return the exact same observable leaf (including or excluding freeze according
to the revised contract), compute the predeclared paired bound, and add
failure/maximal-prefix/composed scenarios. If no semantically equivalent LIVE
internal door exists, mark it `NON_COMPARABLE` here and prove LIVE parity/win at
the integrated `parseCssScalar` door instead.

## 4. Per-candidate altitude and common-axis verdicts

`ACCEPT` below means the exact candidate clears that one axis only. Overall
acceptance requires every axis.

| candidate | correctness | parse-that idiom | performance | hostile/bounds | KISS/LOC | overall |
|---|---|---|---|---|---|---|
| H | ACCEPT | ACCEPT | **REJECT** | ACCEPT | ACCEPT (7 lines) | **REJECT** |
| B | ACCEPT | ACCEPT, qualified | **REJECT** | ACCEPT | **REJECT** (26 lines) | **REJECT** |
| S | **REJECT** | **REJECT** | **REJECT** | **REJECT** | **REJECT** (30 lines) | **REJECT** |
| D | ACCEPT | ACCEPT | **REJECT** | ACCEPT | ACCEPT (15 lines) | **REJECT** |

### H — whole-prefix terminal

H is the clearest expression of this atomic operation. One exact terminal
regex plus a small semantic map is idiomatic parse-that, and the 407-byte source
is the KISS baseline. It passes the sealed corpus and the independent
differential. It is nevertheless 49.3% slower than the deposed median on the
recorded unequal-operation lane and has no qualifying strict-win proof.

### B — factorized `all`/`any`

B correctly distinguishes `digits fraction?` from `leading-dot digits`. Its
local transaction is expressly permitted and is needed to preserve predecessor
value identity because fused `all` rolls back offsets but not necessarily the
old value. The grammar is recognizable and direct, so it narrowly clears the
idiom axis. However, it constructs intermediate arrays/strings, needs a custom
wrapper, is 2.35 times H's bytes, and records 3.89 times the deposed median. It
fails KISS and performance.

### S — staged `then`

S's nested tuple shape is less readable than either H or B, and its branch
factorization is semantically invalid. The confirmed repeated-fraction bug is
both a correctness and hostility failure because malformed input is accepted
as `NaN`. No ranking or performance result can rehabilitate it.

### D — first-character dispatch

D is direct, bounded, and readable. Its three regex leaves duplicate a little
terminal text but make the leading branch explicit and exercise parse-that's
O(1) dispatch idiom. It is the fastest candidate at 112.52 ns/op median and
passes the sealed and independent semantic checks. It remains 34.2% slower
than the deposed lane and lacks a valid strict-win proof.

### Ranking

For synthesis research only: **D > H > B >>> S**. D is the best current
performance/clarity compromise; H is the parsimony reference; B is useful
construction evidence; S is rejected semantically. This ranking grants no
integration authority because every overall verdict is REJECT.

## 5. Mandatory downstream rescoping

1. Open a new exact G13 successor rather than mutate these frozen candidates.
   Add the repeated-fraction counterexamples and repair S before any fresh
   quintetto begins.
2. Decide the internal frozenness contract by evidence. Do not force
   `Object.freeze` merely to mimic a public implementation detail.
3. Define one stable numeric diagnostic category and a parent translation to
   public `ParseIssue` codes.
4. Rebuild the benchmark around equal observable operations, a presealed
   manifest/raw path, paired inference, and allocation reporting. Keep an
   integrated public-door lane separate from the grammar-core lane.
5. Experiment only within direct parse-that idiom: D/H are the useful bases;
   a leaf `regex` match mapping may test whether a separate `.map()` and forced
   freeze dominate cost. No scanner, lexical substrate, or benchmark-only fast
   path is permitted.
6. After exact acceptance, install one owner beneath
   `mirror/apotheosis/grammar/css/l4/value-unit/`; percentage, dimension,
   integer-only, calc/math, color, timeline, and keyframe rows must import it.
7. Capture spelling/extent in the importing source-preservation boundary using
   parse-state offsets/source maps, not by adding raw token objects or a second
   recognizer.
8. Add a lifecycle-aware final validator that authenticates the frozen
   preauthor receipt, candidate closures, reveal, five reviews, three
   adjudications, benchmark evidence, and accepted exact integration hash.
9. Coordinate the result with BBNF as a content-addressed owner decision: the
   current BBNF `number -> f64` production is useful grammar evidence but does
   not carry the required sign/type result and must not become a competing TS
   owner.

## 6. Final verdict

The **feature boundary, sequencing, and `value-unit` ownership are ACCEPTED as
the right direction**. The **exact G13 candidate set is REJECTED**: S is
materially wrong, the shared observation contract has unresolved freeze and
diagnostic defects, the benchmark is non-qualifying, and no candidate beats
the retained prior iteration. No candidate may be integrated from this review.

**ZERO PRODUCTION AUTHORITY.**
