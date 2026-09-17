# Foundation G0 skeptic 1 — CSS semantic challenge

## Verdict

**H: REJECT · B: REJECT · S: REJECT · whole candidate set: REJECT.**

All three candidates pass the frozen public evaluator and the frozen Chromium
witness, but all three implement the pre-2026 blanket `>= U+0080` identifier
class rather than the exact non-ASCII identifier ranges in the pinned 10 June
2026 CSS Syntax Editor's Draft. That changes identifier maximality and numeric
token classification. Candidate B has a second independent defect: it applies
input preprocessing after decoding escapes, changing escape results that CSS
requires to remain U+000D or U+000C into U+000A.

No candidate, subject, fixture, evaluator, browser witness, accepted grammar,
or shared file was modified during this review.

## Frozen subject and binding replay

- Required subject:
  `docs/tranches/V/apotheosis/pi/mirror/prototypes/foundation-g0/SUBJECT.json`
- Required SHA-256:
  `22ec8f1270f3ffa5b75ed8be85c43069e62f71d383d43be12ba29821b8f4b207`
- Recomputed SHA-256:
  `22ec8f1270f3ffa5b75ed8be85c43069e62f71d383d43be12ba29821b8f4b207`

Every top-level binding recomputed exactly:

| artifact | recomputed SHA-256 |
|---|---|
| `BRIEF.md` | `c4b2a4996df7a5dd3df294422917c1bfed5004f2a0bcd5f05dc5ff4af8d93806` |
| `fixtures.json` | `6d76da0bedae64c38e57762683fe5df995a896958722705d45e8bd6c52eab204` |
| `evaluate.mts` | `b0f11f84b6ab1c8b8ed257e41d94910e920f315678c63439399b977acdab33d6` |
| `browser-witness.mts` | `6f2da23f51499ae9d6229a9843a476eaa97a960b713c220848569b8a05205026` |
| accepted `numeric.ts` | `8c3ac689f2e24635216ac0499f23166996ac0136e0b6876e82a8da4f75eb95aa` |
| H ledger | `3fdc829978e07e182b4b27772dc4a3d3661d84377494a949f5c753fc5bb63e20` |
| B ledger | `98cb225e5f12da35cde816ca0a919bd42f4dc2fb5adbf1db9119fd3d9f7304f8` |
| S ledger | `8642ca648aaf5c1efb1d75f7596a5651deb19953feb5dfac7431ac10e741ed58` |

I also recomputed every file row in all three ledgers against its candidate
tree; every row matched. Strict TypeScript compilation passed for H, B, and S.

Running the exact frozen evaluator independently against each exact candidate
reproduced `PASS`, with 128 success transactions, 56 failure transactions, and
62 classified units per candidate. Running the exact browser witness against
each candidate reproduced `PASS` under Headless Chromium 148.0.7778.96: all 62
declared unit spellings and escaped `px` were accepted, while the unknown typed
unit was rejected. These green results are real but incomplete.

## Normative basis

The subject claims the current 10 June 2026 CSS Syntax Editor's Draft. In that
draft:

1. [Input preprocessing](https://drafts.csswg.org/css-syntax/#input-preprocessing)
   converts raw CR, FF, CRLF, NUL, and surrogate input before tokenization.
2. A
   [non-ASCII ident code point](https://drafts.csswg.org/css-syntax/#non-ascii-ident-code-point)
   is no longer every code point at or above U+0080. It is the exact union
   `U+00B7`, `U+00C0–00D6`, `U+00D8–00F6`, `U+00F8–037D`,
   `U+037F–1FFF`, `U+200C`, `U+200D`, `U+203F`, `U+2040`,
   `U+2070–218F`, `U+2C00–2FEF`, `U+3001–D7FF`, `U+F900–FDCF`,
   `U+FDF0–FFFD`, and `>= U+10000`.
3. An identifier consumes the largest sequence of ident code points and valid
   escapes. See
   [consume an ident sequence](https://drafts.csswg.org/css-syntax/#consume-an-ident-sequence)
   and the
   [three-code-point start test](https://drafts.csswg.org/css-syntax/#check-if-three-code-points-would-start-an-ident-sequence).
4. After consuming a number, the numeric-token algorithm produces a dimension
   only if the remaining stream would start an ident sequence; otherwise it
   checks `%` and then returns a number. See
   [consume a numeric token](https://drafts.csswg.org/css-syntax/#consume-a-numeric-token).
5. [Consume an escaped code point](https://drafts.csswg.org/css-syntax/#consume-an-escaped-code-point)
   decodes one to six hex digits to the represented scalar (with only zero,
   surrogate, and out-of-range replacement). It does not run the decoded value
   through input preprocessing a second time.
6. CSS Values defines a literal
   [dimension](https://drafts.csswg.org/css-values-4/#dimensions) as a number
   immediately followed by an identifier and makes unit identifiers ASCII
   case-insensitive. The 62-unit declared table and the six container units in
   [CSS Conditional 5](https://drafts.csswg.org/css-conditional-5/#container-lengths)
   showed no separate discrepancy in this review.

The brief's phrase “ASCII letter/underscore/non-ASCII” is therefore itself
underspecified and, when read as every non-ASCII code point, contradicts its
named 10 June 2026 authority.

## Blocking common-mode defect S1 — the raw non-ASCII identifier class is too broad

The three exact implementations all admit every raw non-ASCII code point:

- H: `tokens/code-point.ts:36` uses
  `/[\u0080-\u{10ffff}]/u`.
- B: `tokens/code-point.ts:8` uses
  `[\0\u0080-\u{10FFFF}]`.
- S: `tokens/code-point.ts:34` uses
  `/\0|[^\0-\x7f]/u`.

That is not a cosmetic classification error. Independent direct probes over
the exact candidate bytes reproduced these false results for **H, B, and S**:

| source/parser | required result under the pinned draft | all three actual results |
|---|---|---|
| `U+0080` / `cssIdentifier` | fail at offset 0 | success, offset 1, value U+0080 |
| `a U+0080` / `cssIdentifier` | success through `a`, offset 1 | success through both, offset 2 |
| `1 U+0080` / `cssDimension` | fail: the remainder cannot start an ident | success, offset 2, unknown unit U+0080 |
| `1px U+0080` / `cssDimension` | known `px`, offset 3, leave U+0080 | unknown `px U+0080`, offset 4 |
| `U+037E` / `cssIdentifier` | fail at offset 0 | success, offset 1 |
| `U+200E` / `cssIdentifier` | fail at offset 0 | success, offset 1 |
| `U+FEFF` / `cssIdentifier` | fail at offset 0 | success, offset 1 |
| `U+FFFE` / `cssIdentifier` | fail at offset 0 | success, offset 1 |

These are representative, not exhaustive; the candidates also wrongly admit
the draft's other gaps such as U+00A0, U+E000, and U+FDD0. In contrast, raw
U+00B7, U+037F, U+200C, U+FDF0, and astral code points are valid range members.
Raw NUL and lone surrogates are correctly replaced with U+FFFD, which is a
valid range member.

An escaped excluded value is a deliberately different case: `\80 ` is a valid
escape and may contribute decoded U+0080 to an identifier. All three correctly
accept `\80 ` and `1\80 `. A repair must therefore fix the raw ident classes,
not reject decoded escape results by value.

### Why the public rail missed S1

The candidate-neutral fixtures exercise only `é` and `😀` as ordinary
non-ASCII identifiers; both are inside the new permitted ranges. There is no
excluded-range start, excluded continuation after a valid prefix, allowed and
excluded range-edge table, or numeric-token discriminator using an excluded
raw point. Consequently all three wrong implementations agree with the
fixture generator and receive a common-mode green result.

This is a subject/fixture defect as well as three candidate defects. It blocks
selecting any candidate from the set.

## Blocking B-only defect S2 — decoded escapes are preprocessed again

B's `decodeName()` and `decodeString()` perform replacement of escapes and
then call `preprocessCodePoints()` over the resulting decoded string:

- `candidates/b/tokens/code-point.ts:39-40`
- `candidates/b/tokens/string.ts:15-19`

Input preprocessing happens to raw input before tokenization. It must not be
reapplied after an ASCII hex escape has produced a scalar. Exact probes show
the semantic corruption:

| source/parser | required value | B value | H/S value |
|---|---|---|---|
| `\d ` / `cssIdentifier` | U+000D | U+000A | U+000D |
| `a\c ` / `cssIdentifier` | `a` + U+000C | `a` + U+000A | `a` + U+000C |
| `"\d "` / `cssString` | U+000D | U+000A | U+000D |
| `"\c "` / `cssString` | U+000C | U+000A | U+000C |
| `1\d ` / `cssDimension` | unit U+000D | unit U+000A | unit U+000D |

The public fixtures cover raw CR/FF preprocessing and escaped-newline removal,
but never a hex escape whose decoded scalar is CR or FF. That omission lets B
conflate two different stages of the CSS Syntax algorithm.

## Candidate dispositions

### H — REJECT

H is otherwise consistent with the exercised escape/string/dimension cases,
uses the accepted numeric parser, and recognizes the declared units. It is
nevertheless semantically ineligible because its blanket non-ASCII name class
reproduces every S1 counterexample.

### B — REJECT

B reproduces S1 and independently reproduces S2 in identifiers, strings, and
dimension units. Its fused regular-expression shape does not excuse changing
the preprocessing/escape order.

### S — REJECT

S is otherwise consistent with the exercised escape/string/dimension cases,
uses the accepted numeric parser, and recognizes the declared units. It is
nevertheless semantically ineligible because its blanket non-ASCII name class
reproduces every S1 counterexample.

## Required correction before a fresh five-skeptic cycle

1. Correct the frozen semantic brief to spell the exact June 2026 non-ASCII
   ident range union.
2. Give every candidate a raw ident-start/name production using that union,
   while retaining preprocessing of raw NUL/surrogates and accepting valid
   escapes regardless of their decoded value.
3. Add candidate-neutral cases for every allowed/excluded range boundary, for
   excluded raw points at identifier start and continuation, and for the
   resulting number/percentage/dimension discrimination.
4. In B or any fused successor, preprocess raw arms before escape decoding;
   add `\d ` and `\c ` observations across identifier, string, and dimension.
5. Reseal the changed brief, fixtures, evaluator, candidate ledgers, and
   subject. Because the semantic seam and candidate bytes change, the five
   skeptic passes must restart on the new exact subject.

## Truthful reviewer receipt

- Reviewer task: `/root/foundation_skeptic_semantic`
- Role: hostile skeptic 1, semantic/spec axis
- Agent/runtime surface: Codex desktop agent
- Model family exposed to reviewer: OpenAI GPT-5 family
- Exact provider checkpoint: not exposed to reviewer
- Reasoning-effort label: not exposed to reviewer
- Subagents used: none
- Other Foundation G0 skeptic reviews inspected: false
- Candidate/subject/harness/shared-file mutations: none
- Review artifact written: this file only

